(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[5],{100:function(e,r,n){e.exports={Order:"Order_Order__3QVAe"}},104:function(e,r,n){"use strict";n.r(r),n.d(r,"Orders",(function(){return g}));var t=n(4),a=n(5),i=n(6),o=n(7),u=n(0),s=n.n(u),c=n(19),d=n(14),p=n(43),l=n(100),m=n.n(l),b=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map((function(e){return s.a.createElement("span",{key:e.name,style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid #eee",padding:"5px"}},e.name," (",e.amount,")")}));return s.a.createElement("div",{className:m.a.Order},s.a.createElement("p",null,"Ingredients : ",t),s.a.createElement("p",null,"Price : ",s.a.createElement("strong",null,"$ ",Number.parseFloat(e.price).toFixed(2))))},f=n(15),h=n(42),g=function(e){Object(o.a)(n,e);var r=Object(i.a)(n);function n(){return Object(t.a)(this,n),r.apply(this,arguments)}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=s.a.createElement(h.a,null);return this.props.loading||(e=s.a.createElement("div",null,this.props.orders.map((function(e){return s.a.createElement(b,{key:e.id,ingredients:e.ingredients,price:e.price})})))),e}}]),n}(u.Component);r.default=Object(d.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,n){return e(f.d(r,n))}}}))(Object(p.a)(g,c.a))}}]);
//# sourceMappingURL=5.70f4e3e3.chunk.js.map