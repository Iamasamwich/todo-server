(this["webpackJsonptodo-client"]=this["webpackJsonptodo-client"]||[]).push([[0],{137:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n(32),c=n.n(r),o=n(16),i=n(57),s=n(94),u=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0;return"LOGIN"===e.type?e.payload:t},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home",e=arguments.length>1?arguments[1]:void 0;return"CHANGE_PAGE"===e.type?e.payload:t},l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1?arguments[1]:void 0;return"STATUS"===e.type?e.payload:t},p=n(19),j=n(15),b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_TODOS":var n=e.payload,a=n.sort((function(t,e){return t.done===e.done?0:t.done?1:-1}));return a;case"ADD_TODO":var r=[].concat(Object(j.a)(t),[e.payload]);return r.sort((function(t,e){return t.done===e.done?0:t.done?1:-1}));case"UPDATE_TODO":var c=e.payload,o=t.map((function(t){return t.id!==c.id?t:e.payload}));return o.sort((function(t,e){return t.done===e.done?0:t.done?1:-1}));case"REMOVE_TODO":var i=Object(j.a)(t),s=e.payload;return i.filter((function(t){return t.id!==s.todoId}));case"ADD_STEP":var u=e.payload;return t.map((function(t){return u.todoId===t.id?Object(p.a)(Object(p.a)({},t),{},{steps:[].concat(Object(j.a)(t.steps),[u])}):t}));case"UPDATE_STEP":var d=e.payload;return t.map((function(t){if(d.todoId===t.id){var e=t.steps.map((function(t){return t.id===d.id?d:t}));return Object(p.a)(Object(p.a)({},t),{},{steps:e})}return t}));case"REMOVE_STEP":var l=e.payload,b=Object(j.a)(t);return b.map((function(t){if(t.id!==l.todoId)return t;var e=t.steps.filter((function(t){return t.id!==l.stepId}));return Object(p.a)(Object(p.a)({},t),{},{steps:e})}));default:return t}},O=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0;return"TODOS_FETCHED"===e.type?e.payload:t},f=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"active",e=arguments.length>1?arguments[1]:void 0;return"SHOW_TODOS"===e.type?e.payload:t},h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1?arguments[1]:void 0;return"TODO_TO_EDIT"===e.type?e.payload:t},x=Object(i.b)({page:d,login:u,appStatus:l,todos:b,showTodos:f,todosFetched:O,todoToUpdate:h}),y=n(14),g=n.n(y),m=n(21),v=function(t,e,n){return fetch(function(){switch(window.location.host){case"localhost:3001":return"http://localhost:3000";case"192.168.43.5:3001":return"http://192.168.43.5:3000";default:return""}}()+t,{method:e,headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)}).then((function(t){return t.json()}))},S=function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"TODO_TO_EDIT",payload:null}),n({type:"CHANGE_PAGE",payload:t}),e.abrupt("return");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},T=function(){return function(t){t({type:"STATUS",payload:"loading"}),v("/login","PUT").then((function(e){return 200===e.status?(t({type:"LOGIN",payload:!1}),t({type:"SET_TODOS",payload:[]}),t({type:"TODOS_FETCHED",payload:!1}),t({type:"STATUS",payload:null}),void t({type:"CHANGE_PAGE",payload:"home"})):(t({type:"LOGIN",payload:!1}),void t({type:"STATUS",payload:e.status}))}))}},w=n(210),A=n(203),E=n(211),D=n(204),C=n(5),U=n(201),k=n(205),P=n(206),I=n(207),G=n(208),z=n(209),N=n(101),_=n.n(N),L=n(71),F=n.n(L),H=n(102),M=n.n(H),R=n(103),W=n.n(R),Y=n(1),B={changePage:S,logout:T},V=Object(o.b)((function(t){return{page:t.page,login:t.login}}),B)((function(t){var e=t.page,n=t.login,r=t.changePage,c=t.logout,o=Object(a.useState)(!1),i=Object(C.a)(o,2),s=i[0],u=i[1],d=Object(a.useRef)();return Object(a.useEffect)((function(){var t=function(t){d.current&&d.current.contains(t.target)||u(!1)};return document.addEventListener("click",t),function(){return document.removeEventListener("click",t)}}),[]),Object(Y.jsxs)(U.a,{ref:d,position:"fixed",children:[Object(Y.jsxs)(A.a,{sx:{display:"flex",justifyContent:"flex-end"},children:[n&&Object(Y.jsx)(D.a,{variant:"h6",sx:{flexGrow:1},children:"Welcome back!"}),"home"!==e&&Object(Y.jsx)(k.a,{size:"large",color:"inherit",onClick:function(){return r("home")},children:Object(Y.jsx)(_.a,{})}),n&&Object(Y.jsx)(k.a,{size:"large",color:"inherit",onClick:function(){return u(!s)},children:Object(Y.jsx)(F.a,{})})]}),n&&s&&Object(Y.jsxs)(P.a,{sx:{border:"1px solid black",position:"absolute",backgroundColor:"rgba(255, 255, 255, 1)",right:"30px",top:"80px",color:"black"},children:[Object(Y.jsxs)(I.a,{onClick:c,children:[Object(Y.jsx)(G.a,{children:Object(Y.jsx)(M.a,{})}),Object(Y.jsx)(z.a,{children:"Logout"})]}),Object(Y.jsxs)(I.a,{onClick:function(){return r("editUser")},children:[Object(Y.jsx)(G.a,{children:Object(Y.jsx)(W.a,{})}),Object(Y.jsx)(z.a,{children:"Profile"})]})]})]})})),J=n.p+"static/media/icon.f34a995a.png",Z={root:{minWidth:"360px"},main:{display:"flex",alignItems:"center",flexDirection:"column"},icon:{"@media (max-width: 900px)":{height:"120px"},"@media (max-width: 767px)":{height:"100px"},"@media (max-width: 500px)":{height:"80px"}},form:{display:"flex",flexGrow:1,flexDirection:"column",width:"50%","@media (max-width: 767px)":{width:"90%"}},centered:{display:"flex",alignItems:"center",justifyContent:"center"},todoIcon:{fontSize:35,p:1},popup:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"500px",bgcolor:"background.paper",boxShadow:20,p:4},textFlash:{opacity:"1",animation:"flash 1s infinite","@keyframes flash":{"0%":{opacity:1},"50%":{opacity:0},"100%":{opacity:1}}},spinner:{height:"50px",width:"50px",backgroundColor:"black",animation:"spin 1s linear infinite","@keyframes spin":{"100%":{transform:"rotate(89deg)"}}},padding:{paddingBottom:"24px","@media (max-width: 767px)":{paddingBottom:"16px"},"@media (max-width: 500px)":{paddingBottom:"8px"}}},$={logout:T,changePage:S},q=Object(o.b)((function(t){return{login:t.login,page:t.page}}),$)((function(t){var e=t.children;t.login,t.page,t.logout,t.changePage;return Object(Y.jsxs)(w.a,{sx:Z.root,children:[Object(Y.jsx)(V,{}),Object(Y.jsx)(A.a,{}),Object(Y.jsx)(E.a,{sx:Z.main,children:Object(Y.jsx)(E.a,{sx:Z.icon,children:Object(Y.jsx)("img",{style:{objectFit:"contain",height:"100%",width:"100%"},src:J,alt:"icon"})})}),Object(Y.jsx)(D.a,{variant:"h1",align:"center",sx:Z.padding,children:"Things To Do"}),Object(Y.jsx)("hr",{}),e]})})),K=n(193),Q=n(189),X=n(197),tt={login:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("/login","POST",t).then((function(t){return 200===t.status?n({type:"LOGIN",payload:!0}):(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:t.status}))})).catch((function(t){return n({type:"LOGIN",payload:!1})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},changePage:S},et=Object(o.b)(null,tt)((function(t){var e=t.login,n=t.changePage,r=Object(a.useState)(""),c=Object(C.a)(r,2),o=c[0],i=c[1],s=Object(a.useState)(!1),u=Object(C.a)(s,2),d=u[0],l=u[1],p=Object(a.useState)(""),j=Object(C.a)(p,2),b=j[0],O=j[1],f=Object(a.useState)(!1),h=Object(C.a)(f,2),x=h[0],y=h[1],g=Object(a.useState)(!1),m=Object(C.a)(g,2),v=m[0],S=m[1];Object(a.useEffect)((function(){l(!/^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/.test(o))}),[o]),Object(a.useEffect)((function(){y(!b)}),[b]),Object(a.useEffect)((function(){S(!(!d&&!x))}),[d,x]);return Object(Y.jsxs)(E.a,{sx:Z.main,children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Login"}),Object(Y.jsxs)(E.a,{component:"form",onSubmit:function(t){t.preventDefault(),v||e({email:o,pword:b})},sx:Z.form,children:[Object(Y.jsx)(K.a,{variant:"standard",label:"Email",value:o,onChange:function(t){return i(t.target.value)},error:d,autoFocus:!0}),Object(Y.jsx)(K.a,{variant:"standard",type:"password",label:"Password",value:b,onChange:function(t){return O(t.target.value)},error:x}),Object(Y.jsxs)(Q.a,{pt:2,spacing:2,children:[v?null:Object(Y.jsx)(X.a,{variant:"contained",type:"submit",color:"success",children:"Login"}),Object(Y.jsx)(X.a,{variant:"text",onClick:function(){return n("createAccount")},children:"Create An Account"})]})]})]})})),nt={createAccount:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("/user","POST",t).then((function(t){return 201===t.status?void n({type:"LOGIN",payload:!0}):(n({type:"LOGIN",payload:!1}),n({type:"STATUS",payload:t.status}),void n({type:"CHANGE_PAGE",payload:"home"}))})).catch((function(t){}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},changePage:S},at=Object(o.b)(null,nt)((function(t){var e=t.createAccount,n=t.changePage,r=Object(a.useState)(""),c=Object(C.a)(r,2),o=c[0],i=c[1],s=Object(a.useState)(""),u=Object(C.a)(s,2),d=u[0],l=u[1],p=Object(a.useState)(""),j=Object(C.a)(p,2),b=j[0],O=j[1],f=Object(a.useState)(""),h=Object(C.a)(f,2),x=h[0],y=h[1],g=Object(a.useState)(!1),m=Object(C.a)(g,2),v=m[0],S=m[1],T=Object(a.useState)(!1),w=Object(C.a)(T,2),A=w[0],U=w[1],k=Object(a.useState)(!1),P=Object(C.a)(k,2),I=P[0],G=P[1],z=Object(a.useState)(!1),N=Object(C.a)(z,2),_=N[0],L=N[1],F=Object(a.useState)(!1),H=Object(C.a)(F,2),M=H[0],R=H[1];Object(a.useEffect)((function(){S(!o)}),[o]),Object(a.useEffect)((function(){/^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/.test(d)?U(!1):U(!0)}),[d]),Object(a.useEffect)((function(){G(!b)}),[b]),Object(a.useEffect)((function(){L(!x||b!==x)}),[b,x]),Object(a.useEffect)((function(){R(!!(v||A||I||_))}),[v,A,I,_]);return Object(Y.jsxs)(E.a,{sx:Z.main,children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Create Account"}),Object(Y.jsxs)(E.a,{component:"form",onSubmit:function(t){t.preventDefault(),M||e({name:o,email:d,pword:b})},sx:Z.form,children:[Object(Y.jsx)(K.a,{variant:"standard",label:"Name",value:o,onChange:function(t){return i(t.target.value)},error:v,autoFocus:!0}),Object(Y.jsx)(K.a,{variant:"standard",label:"Email",value:d,onChange:function(t){return l(t.target.value)},error:A}),Object(Y.jsx)(K.a,{variant:"standard",label:"Password",value:b,onChange:function(t){return O(t.target.value)},error:I,type:"password"}),Object(Y.jsx)(K.a,{variant:"standard",label:"Confirm Password",value:x,onChange:function(t){return y(t.target.value)},error:_,type:"password"}),Object(Y.jsxs)(Q.a,{pt:2,spacing:2,children:[M?null:Object(Y.jsx)(X.a,{variant:"contained",type:"submit",color:"success",children:"Sign Up!"}),Object(Y.jsx)(X.a,{variant:"contained",color:"warning",onClick:function(){return n("home")},children:"Cancel"})]})]})]})})),rt=n(195),ct=Object(o.b)((function(t){return{appStatus:t.appStatus}}))((function(t){var e=t.appStatus,n=Object(a.useState)(!1),r=Object(C.a)(n,2),c=r[0],o=r[1];Object(a.useEffect)((function(){o(!!e)}),[e]);var i=function(){switch(e){case 401:return"Not Authorised";case 406:return"Invalid inputs";case 404:return"Not found";case 409:return"Duplication";default:return"There was a problem with your request"}},s=function(){return"loading"===e?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(D.a,{variant:"h4",children:"Loading"}),Object(Y.jsx)(E.a,{marginTop:2,sx:Z.spinner})]}):Object(Y.jsxs)(Q.a,{alignItems:"center",spacing:2,children:[Object(Y.jsx)(D.a,{variant:"h4",children:"Warning!"}),Object(Y.jsx)(D.a,{variant:"h5",children:i()}),Object(Y.jsx)(D.a,{sx:Z.textFlash,color:"blue",variant:"h6",children:"Click to dismiss"})]})};return Object(Y.jsx)(rt.a,{open:c,children:Object(Y.jsx)(E.a,{sx:Object(p.a)(Object(p.a)({},Z.popup),{},{border:"2px solid red"}),children:Object(Y.jsx)(E.a,{sx:Z.main,onClick:function(){"loading"!==e&&o(!1)},children:Object(Y.jsx)(s,{})})})})})),ot=n(106),it=n.n(ot),st=n(47),ut=n.n(st),dt=function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"STATUS",payload:"loading"}),n({type:"TODO_TO_EDIT",payload:null}),a={todo:t.todo,done:!!t.done,dueDate:t.dueDate},e.next=5,v("/todo/".concat(t.id),"PUT",a).then((function(t){return 202===t.status?(n({type:"CHANGE_PAGE",payload:"home"}),n({type:"STATUS",payload:null}),void n({type:"UPDATE_TODO",payload:t.todo})):401===t.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):void n({type:"STATUS",payload:t.status})})).catch((function(t){}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},lt=n(198),pt=n(75),jt=n.n(pt),bt=n(104),Ot=n.n(bt),ft=n(105),ht=n.n(ft),xt=n(76),yt=n.n(xt),gt={addStep:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"STATUS",payload:"loading"}),e.next=3,v("/todo/".concat(t.todoId,"/step"),"POST",t).then((function(t){return 201===t.status?(n({type:"STATUS",payload:null}),void n({type:"ADD_STEP",payload:t.step})):401===t.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):n({type:"STATUS",payload:t.status})}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},updateStep:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"STATUS",payload:"loading"}),e.next=3,v("/todo/".concat(t.todoId,"/step/").concat(t.stepId),"PUT",t.body).then((function(t){return 202===t.status?(n({type:"STATUS",payload:null}),void n({type:"UPDATE_STEP",payload:t.step})):401===t.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):n({type:"STATUS",payload:t.status})})).catch((function(t){}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},deleteStep:function(t,e){return function(){var n=Object(m.a)(g.a.mark((function n(a){return g.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a({type:"STATUS",payload:"loading"}),n.next=3,v("/todo/".concat(e,"/step/").concat(t),"DELETE").then((function(n){return 202===n.status?(a({type:"STATUS",payload:null}),void a({type:"REMOVE_STEP",payload:{stepId:t,todoId:e}})):401===n.status?(a({type:"LOGIN",payload:!1}),void a({type:"STATUS",payload:401})):void a({type:"STATUS",payload:n.status})}));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}},mt=Object(o.b)(null,gt)((function(t){var e=t.steps,n=t.todoId,r=t.addStep,c=t.updateStep,o=t.deleteStep,i=Object(a.useState)(""),s=Object(C.a)(i,2),u=s[0],d=s[1];return Object(Y.jsxs)(lt.a,{container:!0,direction:"column",children:[e.map((function(t){return Object(Y.jsxs)(lt.a,{container:!0,children:[Object(Y.jsx)(lt.a,{item:!0,xs:0,md:1}),Object(Y.jsx)(lt.a,{item:!0,xs:12,md:10,sx:{borderTop:1},children:Object(Y.jsxs)(lt.a,{container:!0,children:[Object(Y.jsx)(lt.a,{item:!0,xs:1,sx:Z.centered,children:t.done?Object(Y.jsx)(ut.a,{onClick:function(){return c({stepId:t.id,todoId:t.todoId,body:{step:t.step,done:!t.done}})}}):Object(Y.jsx)(jt.a,{color:"success",onClick:function(){return c({stepId:t.id,todoId:t.todoId,body:{step:t.step,done:!t.done}})}})}),Object(Y.jsx)(lt.a,{item:!0,xs:10,sx:{overflow:"hidden"},children:Object(Y.jsx)(D.a,{variant:"body1",fontSize:"1.3em",marginLeft:6,children:t.step})}),Object(Y.jsx)(lt.a,{item:!0,xs:1,sx:Z.centered,children:Object(Y.jsx)(yt.a,{color:"warning",onClick:function(){return o(t.id,t.todoId)}})})]})})]})})),Object(Y.jsxs)(lt.a,{container:!0,component:"form",onSubmit:function(t){return t.preventDefault(),u?(r({todoId:n,step:u,done:!1}),void d("")):void 0},sx:{alignItems:"end"},children:[Object(Y.jsx)(lt.a,{item:!0,xs:0,md:2}),Object(Y.jsx)(lt.a,{item:!0,xs:9,md:6,children:Object(Y.jsx)(K.a,{variant:"standard",label:"Enter new step...",value:u,onChange:function(t){var e=t.target.value.replace(/[^a-zA-Z0-9 .,]/,"");d(e)},sx:{width:"100%",marginLeft:"10px"},autoFocus:!0})}),Object(Y.jsx)(lt.a,{item:!0,xs:3,md:2,sx:Z.centered,children:Object(Y.jsx)(X.a,{variant:"contained",color:"success",type:"submit",sx:{flexGrow:1},children:"Add Step"})})]})]})})),vt={updateTodo:dt,deleteTodo:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"STATUS",payload:"loading"}),e.next=3,v("/todo/".concat(t),"DELETE").then((function(e){return 202===e.status?(n({type:"STATUS",payload:null}),void n({type:"REMOVE_TODO",payload:{todoId:t}})):401===e.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):void n({type:"STATUS",payload:e.status})})).catch((function(t){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},editTodo:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:"TODO_TO_EDIT",payload:t});case 2:return n({type:"CHANGE_PAGE",payload:"editTodo"}),e.abrupt("return");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},St=Object(o.b)(null,vt)((function(t){var e=t.todo,n=t.updateTodo,r=t.deleteTodo,c=t.editTodo,o=Object(a.useState)(!1),i=Object(C.a)(o,2),s=i[0],u=i[1],d=Object(a.useState)(!1),l=Object(C.a)(d,2),j=l[0],b=l[1],O=function(t){n(Object(p.a)(Object(p.a)({},t),{},{done:!t.done}))};return Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(rt.a,{open:j,onClose:function(){return b(!1)},children:Object(Y.jsxs)(E.a,{sx:Z.popup,children:[Object(Y.jsx)(D.a,{align:"center",color:"error",variant:"h3",sx:Z.textFlash,children:"Warning!"}),Object(Y.jsx)(D.a,{align:"center",color:"error",variant:"h5",children:"This will permanantly delete the Todo!"}),Object(Y.jsx)(D.a,{align:"center",variant:"h5",children:"Consider clicking the green tick to mark it as done instead..."}),Object(Y.jsxs)(Q.a,{direction:"row",spacing:2,padding:2,justifyContent:"center",children:[Object(Y.jsx)(X.a,{color:"error",variant:"contained",onClick:function(){return r(e.id)},children:"Delete it!"}),Object(Y.jsx)(X.a,{color:"success",variant:"contained",onClick:function(){return b(!1)},children:"Keep it!"})]})]})}),Object(Y.jsxs)(lt.a,{container:!0,children:[Object(Y.jsx)(lt.a,{item:!0,xs:1,children:Object(Y.jsxs)(Q.a,{direction:"column",alignItems:"center",spacing:2,padding:2,children:[e.done?Object(Y.jsx)(ut.a,{fontSize:"large",onClick:function(){return O(e)}}):Object(Y.jsx)(jt.a,{fontSize:"large",color:"success",onClick:function(){return O(e)}}),s?Object(Y.jsx)(Ot.a,{fontSize:"large",onClick:function(){return u(!s)}}):Object(Y.jsx)(F.a,{fontSize:"large",onClick:function(){return u(!s)}})]})}),Object(Y.jsx)(lt.a,{item:!0,xs:10,children:Object(Y.jsxs)(lt.a,{container:!0,direction:"column",children:[Object(Y.jsxs)(lt.a,{container:!0,padding:1,children:[Object(Y.jsx)(lt.a,{item:!0,xs:8,sx:{display:"flex",alignItems:"center",paddingLeft:1,overflow:"hidden"},children:Object(Y.jsx)(D.a,{variant:"h4",children:e.todo})}),Object(Y.jsx)(lt.a,{item:!0,xs:4,children:Object(Y.jsxs)(lt.a,{container:!0,direction:"column",children:[Object(Y.jsx)(lt.a,{item:!0,sx:{display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:1,textAlign:"right"},children:function(){var t,n=e.steps.length;if(0===n)t="No Steps";else{var a=e.steps.filter((function(t){return t.done}));t="".concat(a.length,"/").concat(n," steps completed")}return Object(Y.jsx)(D.a,{variant:"h5",children:t})}()}),Object(Y.jsx)(lt.a,{item:!0,sx:{display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:1,textAlign:"right"},children:function(){var t,n=new Date,a=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate(),r=Math.floor(new Date(a).getTime()/864e5),c=Math.floor(new Date(e.dueDate).getTime()/864e5)-r;return t=c<0?"".concat(Math.abs(c)," days overdue!"):0===c?"Due today!":"".concat(c," days until due."),Object(Y.jsx)(D.a,{variant:"h5",children:t})}()})]})})]}),s?Object(Y.jsx)(mt,{steps:e.steps,todoId:e.id}):null]})}),Object(Y.jsx)(lt.a,{item:!0,xs:1,children:Object(Y.jsxs)(Q.a,{direction:"column",alignItems:"center",spacing:2,padding:2,children:[Object(Y.jsx)(ht.a,{fontSize:"large",onClick:function(){return c(e)}}),Object(Y.jsx)(yt.a,{fontSize:"large",color:"error",onClick:function(){return b(!0)}})]})})]}),Object(Y.jsx)("hr",{})]})})),Tt={getTodos:function(){return function(){var t=Object(m.a)(g.a.mark((function t(e,n){var a;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a="active"===n().showTodos?"/todo":"/todo/all",e({type:"STATUS",payload:"loading"}),t.next=4,v(a,"GET").then((function(t){return 200===t.status?(e({type:"TODOS_FETCHED",payload:!0}),e({type:"SET_TODOS",payload:t.todos}),void e({type:"STATUS",payload:null})):401===t.status?(e({type:"LOGIN",payload:!1}),void e({type:"STATUS",payload:401})):void e({type:"STATUS",payload:t.status})})).catch((function(t){}));case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},changePage:S},wt=Object(o.b)((function(t){return{todos:t.todos,todosFetched:t.todosFetched}}),Tt)((function(t){var e=t.todos,n=t.todosFetched,r=t.getTodos,c=t.changePage,o=Object(a.useState)("active"),i=Object(C.a)(o,2),s=i[0],u=i[1];Object(a.useEffect)((function(){n||r()}),[r,n]);var d=function(){var t=e.sort((function(t,e){return t.dueDate===e.dueDate?0:t.dueDate<e.dueDate?-1:1}));return"active"===s?t.filter((function(t){return t.done?null:t})):t};return Object(Y.jsxs)(E.a,{sx:{display:"flex",alignItems:"center",flexDirection:"column"},children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Your Todos"}),Object(Y.jsxs)(Q.a,{direction:"row",spacing:2,children:[Object(Y.jsx)(X.a,{variant:"contained",onClick:function(){return c("addTodo")},color:"success",startIcon:Object(Y.jsx)(it.a,{}),children:"Add A Todo"}),Object(Y.jsx)(X.a,{variant:"contained",onClick:function(){return u("active"===s?"all":"active")},startIcon:Object(Y.jsx)(ut.a,{}),children:"all"===s?"Show Active Todos":"Show All Todos"})]}),Object(Y.jsxs)(w.a,{sx:{padding:2},children:[0!==d().length?null:Object(Y.jsxs)(Q.a,{direction:"column",alignItems:"center",p:2,spacing:3,children:[Object(Y.jsx)(D.a,{variant:"h4",children:"Whoops, it looks like there's nothing here"}),Object(Y.jsx)(D.a,{variant:"h4",children:'Click "ADD A TODO" to add a new todo'}),"all"===s?null:Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(D.a,{align:"center",variant:"h6",children:"...or..."}),Object(Y.jsx)(D.a,{align:"center",variant:"h4",children:'Click "SHOW ALL TODOS" to show the ones you have marked as done.'})]})]}),d().map((function(t){return Object(Y.jsx)(St,{todo:t},t.id)}))]})]})})),At=n(191),Et=n(190),Dt=n(192),Ct={addTodo:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){var a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"STATUS",payload:"loading"}),a=Object(p.a)(Object(p.a)({},t),{},{done:!1}),e.next=4,v("/todo","POST",a).then((function(t){return 201===t.status?(n({type:"STATUS",payload:null}),n({type:"ADD_TODO",payload:t.todo}),void n({type:"CHANGE_PAGE",payload:"home"})):401===t.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):n({type:"STATUS",payload:[t.status]})})).catch((function(t){}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},changePage:S},Ut=Object(o.b)(null,Ct)((function(t){var e=t.addTodo,n=t.changePage,r=Object(a.useState)(""),c=Object(C.a)(r,2),o=c[0],i=c[1],s=Object(a.useState)(new Date),u=Object(C.a)(s,2),d=u[0],l=u[1],j=Object(a.useState)(!1),b=Object(C.a)(j,2),O=b[0],f=b[1],h=Object(a.useState)(!1),x=Object(C.a)(h,2),y=x[0],g=x[1],m=Object(a.useState)(!1),v=Object(C.a)(m,2),S=v[0],T=v[1];Object(a.useEffect)((function(){f(!o)}),[o]),Object(a.useEffect)((function(){d&&"function"===typeof d.getMonth?g(!1):g(!0)}),[d]),Object(a.useEffect)((function(){T(!(!O&&!y))}),[O,y]);return Object(Y.jsxs)(E.a,{sx:Z.main,children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Add A Todo"}),Object(Y.jsxs)(E.a,{component:"form",onSubmit:function(t){if(t.preventDefault(),!S){var n,a=(n=d).getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate();e({todo:o,dueDate:a})}},sx:Z.form,children:[Object(Y.jsx)(K.a,{sx:{marginBottom:2},variant:"standard",label:"Enter Todo Text",value:o,onChange:function(t){var e=t.target.value.replace(/[^a-zA-Z0-9 .,]/,"");i(e)},error:O,autoFocus:!0}),Object(Y.jsx)(Et.b,{dateAdapter:Dt.a,children:Object(Y.jsx)(At.a,{label:"Due Date",value:d,openTo:"day",inputFormat:"dd/MM/yyyy",onChange:function(t){return l(t)},renderInput:function(t){return Object(Y.jsx)(K.a,Object(p.a)({},t))}})}),Object(Y.jsxs)(Q.a,{pt:2,spacing:2,children:[S?null:Object(Y.jsx)(X.a,{variant:"contained",type:"submit",color:"success",children:"Add Todo"}),Object(Y.jsx)(X.a,{variant:"contained",color:"warning",onClick:function(){return n("home")},children:"Cancel"})]})]})]})})),kt={changePage:S,updateTodo:dt},Pt=Object(o.b)((function(t){return{todoToUpdate:t.todoToUpdate}}),kt)((function(t){var e=t.todoToUpdate,n=t.updateTodo,r=t.changePage,c=Object(a.useState)(""),o=Object(C.a)(c,2),i=o[0],s=o[1],u=Object(a.useState)(new Date),d=Object(C.a)(u,2),l=d[0],j=d[1],b=Object(a.useState)(!1),O=Object(C.a)(b,2),f=O[0],h=O[1],x=Object(a.useState)(!1),y=Object(C.a)(x,2),g=y[0],m=y[1];Object(a.useEffect)((function(){null!==e&&(s(e.todo),j(new Date(e.dueDate)))}),[e]),Object(a.useEffect)((function(){h(!i)}),[i]),Object(a.useEffect)((function(){m(!!f)}),[f]);return Object(Y.jsxs)(E.a,{sx:Z.main,children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Update A Todo"}),Object(Y.jsxs)(E.a,{component:"form",onSubmit:function(t){if(t.preventDefault(),console.log(i,l),!g&&l){var a,r=(a=l).getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();console.log(l,r),n(Object(p.a)(Object(p.a)({},e),{},{todo:i,dueDate:r}))}},sx:Z.form,children:[Object(Y.jsx)(K.a,{sx:{marginBottom:2},variant:"standard",label:"Enter Todo Text",value:i,onChange:function(t){var e=t.target.value.replace(/[^a-zA-Z0-9 .,]/,"");s(e)},error:f,autoFocus:!0}),Object(Y.jsx)(Et.b,{dateAdapter:Dt.a,children:Object(Y.jsx)(At.a,{label:"Due Date",value:l,openTo:"day",inputFormat:"dd/MM/yyyy",onChange:function(t){return j(t)},renderInput:function(t){return Object(Y.jsx)(K.a,Object(p.a)({},t))}})}),Object(Y.jsxs)(Q.a,{pt:2,spacing:2,children:[g?null:Object(Y.jsx)(X.a,{variant:"contained",type:"submit",color:"success",children:"Update Todo"}),Object(Y.jsx)(X.a,{variant:"contained",color:"warning",onClick:function(){return r("home")},children:"Cancel"})]})]})]})})),It={updateUser:function(t){return function(){var e=Object(m.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n({type:"STATUS",payload:"loading"}),e.next=3,v("/user","PUT",t).then((function(t){return 401===t.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:t.status})):202===t.status?(n({type:"STATUS",payload:null}),void n({type:"CHANGE_PAGE",payload:"home"})):void n({type:"STATUS",payload:t.status})}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},setStatus:function(t){return function(e){return e({type:"STATUS",payload:t})}},changePage:S},Gt=Object(o.b)(null,It)((function(t){var e=t.updateUser,n=t.setStatus,r=t.changePage,c=Object(a.useState)(!1),o=Object(C.a)(c,2),i=o[0],s=o[1],u=Object(a.useState)({name:"",email:""}),d=Object(C.a)(u,2),l=d[0],p=d[1],j=Object(a.useState)(""),b=Object(C.a)(j,2),O=b[0],f=b[1],h=Object(a.useState)(""),x=Object(C.a)(h,2),y=x[0],S=x[1],T=Object(a.useState)(""),w=Object(C.a)(T,2),A=w[0],U=w[1],k=Object(a.useState)(!1),P=Object(C.a)(k,2),I=P[0],G=P[1],z=Object(a.useState)(!1),N=Object(C.a)(z,2),_=N[0],L=N[1],F=Object(a.useState)(!1),H=Object(C.a)(F,2),M=H[0],R=H[1],W=Object(a.useState)(!1),B=Object(C.a)(W,2),V=B[0],J=B[1];Object(a.useEffect)((function(){var t=function(){var t=Object(m.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s(!0),t.next=3,v("/user","GET").then((function(t){if(200===t.status)return s(!1),p(t.user),f(t.user.name),void S(t.user.email);n(t.status)})).catch((function(t){}));case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[n]),Object(a.useEffect)((function(){G(!O)}),[O]),Object(a.useEffect)((function(){/^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/.test(y)?L(!1):L(!0)}),[y]),Object(a.useEffect)((function(){R(!A)}),[A]),Object(a.useEffect)((function(){J(!!(I||_||M))}),[I,_,M]);return Object(Y.jsxs)(E.a,{sx:Z.main,children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Update Your Details"}),i?Object(Y.jsx)("div",{className:"spinner"}):Object(Y.jsxs)(E.a,{component:"form",onSubmit:function(t){t.preventDefault(),V||O===l.name&&y===l.email||e({name:O,email:y,pword:A})},sx:Z.form,children:[Object(Y.jsx)(K.a,{variant:"standard",label:"Name",value:O,onChange:function(t){return f(t.target.value)},error:I,autoFocus:!0}),Object(Y.jsx)(K.a,{variant:"standard",label:"Email",value:y,onChange:function(t){return S(t.target.value)},error:_}),Object(Y.jsx)(K.a,{variant:"standard",label:"Password",type:"password",value:A,onChange:function(t){return U(t.target.value)},error:M}),Object(Y.jsxs)(Q.a,{pt:2,spacing:2,children:[V?null:Object(Y.jsx)(X.a,{variant:"contained",color:"success",type:"submit",children:"Update Details"}),Object(Y.jsx)(X.a,{variant:"contained",onClick:function(){return r("updatePassword")},children:"Update Password"}),Object(Y.jsx)(X.a,{variant:"contained",color:"warning",onClick:function(){return r("home")},children:"Cancel"})]})]})]})})),zt={changePage:S,updatePassword:function(t){return function(e){return v("/user/password","PUT",t).then((function(t){return 401===t.status?(e({type:"LOGIN",payload:!1}),e({type:"STATUS",payload:t.status}),void e({type:"CHANGE_PAGE",payload:"home"})):202===t.status?(e({type:"STATUS",payload:null}),void e({type:"CHANGE_PAGE",payload:"home"})):void e({type:"STATUS",payload:t.status})}))}}},Nt=Object(o.b)(null,zt)((function(t){var e=t.changePage,n=t.updatePassword,r=Object(a.useState)(""),c=Object(C.a)(r,2),o=c[0],i=c[1],s=Object(a.useState)(""),u=Object(C.a)(s,2),d=u[0],l=u[1],p=Object(a.useState)(""),j=Object(C.a)(p,2),b=j[0],O=j[1],f=Object(a.useState)(!1),h=Object(C.a)(f,2),x=h[0],y=h[1],g=Object(a.useState)(!1),m=Object(C.a)(g,2),v=m[0],S=m[1],T=Object(a.useState)(!1),w=Object(C.a)(T,2),A=w[0],U=w[1],k=Object(a.useState)(!1),P=Object(C.a)(k,2),I=P[0],G=P[1];Object(a.useEffect)((function(){y(!o)}),[o]),Object(a.useEffect)((function(){S(!d)}),[d]),Object(a.useEffect)((function(){U(!b||b!==d)}),[b,d]),Object(a.useEffect)((function(){G(!!(x||v||A))}),[x,v,A]);return Object(Y.jsxs)(E.a,{sx:Z.main,children:[Object(Y.jsx)(D.a,{variant:"h2",align:"center",children:"Update Your Password"}),Object(Y.jsxs)(E.a,{component:"form",onSubmit:function(t){t.preventDefault(),I||o===d||n({pword:o,newPword:d})},sx:Z.form,children:[Object(Y.jsx)(K.a,{variant:"standard",label:"Old Password",type:"password",value:o,onChange:function(t){return i(t.target.value)},error:x,autoFocus:!0}),Object(Y.jsx)(K.a,{variant:"standard",label:"New Password",type:"password",value:d,onChange:function(t){return l(t.target.value)},error:v}),v?null:Object(Y.jsx)(K.a,{variant:"standard",label:"Confirm New Password",type:"password",value:b,onChange:function(t){return O(t.target.value)},error:A}),Object(Y.jsxs)(Q.a,{pt:2,spacing:2,children:[I?null:Object(Y.jsx)(X.a,{variant:"contained",color:"success",type:"submit",children:"Update"}),Object(Y.jsx)(X.a,{variant:"contained",color:"warning",onClick:function(){return e("home")},children:"Cancel"})]})]})]})})),_t=n(108),Lt=n(199),Ft={palette:{success:{main:"#9ee99e"}},typography:{h1:{"@media (max-width: 900px)":{fontSize:"4rem"},"@media (max-width: 767px)":{fontSize:"3rem"},"@media (max-width: 500px)":{fontSize:"2.5rem"}},h2:{"@media (max-width: 900px)":{fontSize:"3rem"},"@media (max-width: 767px)":{fontSize:"2.5rem"},"@media (max-width: 500px)":{fontSize:"2rem"}},h4:{"@media (max-width: 900px)":{fontSize:"1.8rem"},"@media (max-width: 767px)":{fontSize:"1.4rem"},"@media (max-width: 500px)":{fontSize:"1.2rem"}},h5:{"@media (max-width: 900px)":{fontSize:"1.2rem"},"@media (max-width: 767px)":{fontSize:"1rem"},"@media (max-width: 500px)":{fontSize:"0.8rem"}},button:{"@media (max-width: 767px)":{fontSize:"0.6rem"},"@media (max-width: 500px)":{fontSize:"0.38rem"}}}},Ht=Object(_t.a)(Ft),Mt=Object(o.b)((function(t){return{login:t.login,page:t.page}}),{ping:function(){return function(){var t=Object(m.a)(g.a.mark((function t(e){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v("/ping","GET").then((function(t){return 200===t.status&&"ok"===t.message?e({type:"LOGIN",payload:!0}):e({type:"LOGIN",payload:!1})})).catch((function(t){}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}})((function(t){var e=t.login,n=t.page,r=t.ping;Object(a.useEffect)((function(){r()}),[r]);var c=function(){if(!e)return"createAccount"===n?Object(Y.jsx)(at,{}):Object(Y.jsx)(et,{});switch(n){default:return Object(Y.jsx)(wt,{});case"addTodo":return Object(Y.jsx)(Ut,{});case"editTodo":return Object(Y.jsx)(Pt,{});case"editUser":return Object(Y.jsx)(Gt,{});case"updatePassword":return Object(Y.jsx)(Nt,{})}};return Object(Y.jsx)(Lt.a,{theme:Ht,children:Object(Y.jsxs)(q,{children:[Object(Y.jsx)(ct,{}),Object(Y.jsx)(c,{})]})})})),Rt=Object(i.c)(x,Object(i.a)(s.a));c.a.render(Object(Y.jsx)(o.a,{store:Rt,children:Object(Y.jsx)(Mt,{})}),document.querySelector("#root"))}},[[137,1,2]]]);
//# sourceMappingURL=main.b57299dc.chunk.js.map