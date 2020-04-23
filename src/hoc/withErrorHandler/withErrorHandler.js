import React, { useEffect, useState } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
   return (props) => {
      const [error, setError] = useState(null);

      const requestInterceptor = axios.interceptors.request.use((request) => {
         setError(null);
         return request;
      });

      const responseInterceptor = axios.interceptors.response.use(
         (response) => response,
         (err) => {
            setError(err);
            return Promise.reject(err);
         }
      );

      useEffect(() => {
         return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
         };
      }, [requestInterceptor, responseInterceptor]);

      const errorConfirmedHandler = () => {
         setError(null);
      };

      return (
         <Aux>
            <Modal
               show={error ? true : false}
               modalClosed={errorConfirmedHandler}
            >
               {error ? error.message : null}
            </Modal>
            <WrappedComponent {...props} />
         </Aux>
      );
   };
};

export default withErrorHandler;
