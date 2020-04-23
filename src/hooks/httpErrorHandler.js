import { useState, useEffect } from "react";

export default (httpClient) => {
   const [error, setError] = useState(null);

   const requestInterceptor = httpClient.interceptors.request.use((request) => {
      setError(null);
      return request;
   });

   const responseInterceptor = httpClient.interceptors.response.use(
      (response) => response,
      (err) => {
         setError(err);
         return Promise.reject(err);
      }
   );

   useEffect(() => {
      return () => {
         httpClient.interceptors.request.eject(requestInterceptor);
         httpClient.interceptors.response.eject(responseInterceptor);
      };
   }, [requestInterceptor, responseInterceptor, httpClient.interceptors]);

   const errorConfirmedHandler = () => {
      setError(null);
   };

   return [error, errorConfirmedHandler];
};
