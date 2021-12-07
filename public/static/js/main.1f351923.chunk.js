(this["webpackJsonptodo-client"]=this["webpackJsonptodo-client"]||[]).push([[0],{141:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(32),r=n.n(c),i=n(16),o=n(60),s=n(98),d=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;return"LOGIN"===t.type?t.payload:e},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"home",t=arguments.length>1?arguments[1]:void 0;return"CHANGE_PAGE"===t.type?t.payload:e},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"STATUS"===t.type?t.payload:e},j=n(20),p=n(15),b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TODOS":var n=t.payload,a=n.sort((function(e,t){return e.done===t.done?0:e.done?1:-1}));return a;case"ADD_TODO":var c=[].concat(Object(p.a)(e),[t.payload]);return c.sort((function(e,t){return e.done===t.done?0:e.done?1:-1}));case"UPDATE_TODO":var r=t.payload,i=e.map((function(e){return e.id!==r.id?e:t.payload}));return i.sort((function(e,t){return e.done===t.done?0:e.done?1:-1}));case"REMOVE_TODO":var o=Object(p.a)(e),s=t.payload;return o.filter((function(e){return e.id!==s.todoId}));case"ADD_STEP":var d=t.payload;return e.map((function(e){return d.todoId===e.id?Object(j.a)(Object(j.a)({},e),{},{steps:[].concat(Object(p.a)(e.steps),[d])}):e}));case"UPDATE_STEP":var u=t.payload;return e.map((function(e){if(u.todoId===e.id){var t=e.steps.map((function(e){return e.id===u.id?u:e}));return Object(j.a)(Object(j.a)({},e),{},{steps:t})}return e}));case"REMOVE_STEP":var l=t.payload,b=Object(p.a)(e);return b.map((function(e){if(e.id!==l.todoId)return e;var t=e.steps.filter((function(e){return e.id!==l.stepId}));return Object(j.a)(Object(j.a)({},e),{},{steps:t})}));default:return e}},O=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;return"TODOS_FETCHED"===t.type?t.payload:e},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"active",t=arguments.length>1?arguments[1]:void 0;return"SHOW_TODOS"===t.type?t.payload:e},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;return"TODO_TO_EDIT"===t.type?t.payload:e},f=Object(o.b)({page:u,login:d,appStatus:l,todos:b,showTodos:h,todosFetched:O,todoToUpdate:x}),m=n(14),y=n.n(m),g=n(19),v=function(e,t,n){return fetch(function(){switch(window.location.host){case"localhost:3001":return"http://localhost:3000";case"192.168.43.5:3001":return"http://192.168.43.5:3000";default:return""}}()+e,{method:t,headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)}).then((function(e){return e.json()}))},S=n(209),T=n(207),w=n(208),A=n(210),E=function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"TODO_TO_EDIT",payload:null}),n({type:"CHANGE_PAGE",payload:e}),t.abrupt("return");case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},D=function(){return function(e){e({type:"STATUS",payload:"loading"}),v("/login","PUT").then((function(t){return 200===t.status?(e({type:"LOGIN",payload:!1}),e({type:"SET_TODOS",payload:[]}),e({type:"TODOS_FETCHED",payload:!1}),e({type:"STATUS",payload:null}),void e({type:"CHANGE_PAGE",payload:"home"})):(e({type:"LOGIN",payload:!1}),void e({type:"STATUS",payload:t.status}))}))}},C=n(5),U=n(211),k=n(212),P=n(213),I=n(214),G=n(215),W=n(216),_=n(102),z=n.n(_),N=n(73),L=n.n(N),F=n(103),H=n.n(F),M=n(104),R=n.n(M),Y=n(0),B={changePage:E,logout:D},V=Object(i.b)((function(e){return{page:e.page,login:e.login}}),B)((function(e){var t=e.page,n=e.login,c=e.changePage,r=e.logout,i=Object(a.useState)(!1),o=Object(C.a)(i,2),s=o[0],d=o[1],u=Object(a.useRef)();return Object(a.useEffect)((function(){var e=function(e){u.current&&u.current.contains(e.target)||d(!1)};return document.addEventListener("click",e),function(){return document.removeEventListener("click",e)}}),[]),Object(Y.jsxs)(U.a,{ref:u,position:"fixed",children:[Object(Y.jsxs)(T.a,{sx:{display:"flex",justifyContent:"flex-end"},children:[Object(Y.jsx)(w.a,{variant:"h6",sx:{flexGrow:1},children:n?"Welcome back!":"Log in or create an account"}),"home"!==t&&Object(Y.jsx)(k.a,{size:"large",color:"inherit",onClick:function(){return c("home")},children:Object(Y.jsx)(z.a,{})}),n&&Object(Y.jsx)(k.a,{size:"large",color:"inherit",onClick:function(){return d(!s)},children:Object(Y.jsx)(L.a,{})})]}),n&&s&&Object(Y.jsxs)(P.a,{sx:{border:"1px solid black",position:"absolute",backgroundColor:"rgba(255, 255, 255, 1)",right:"30px",top:"80px",color:"black"},children:[Object(Y.jsxs)(I.a,{onClick:r,children:[Object(Y.jsx)(G.a,{children:Object(Y.jsx)(H.a,{})}),Object(Y.jsx)(W.a,{children:"Logout"})]}),Object(Y.jsxs)(I.a,{onClick:function(){return c("editUser")},children:[Object(Y.jsx)(G.a,{children:Object(Y.jsx)(R.a,{})}),Object(Y.jsx)(W.a,{children:"Profile"})]})]})]})})),J=n.p+"static/media/icon.f34a995a.png",Z={root:{minWidth:"350px"},main:{display:"flex",alignItems:"center",flexDirection:"column"},icon:{"@media (max-width: 900px)":{height:"120px"},"@media (max-width: 767px)":{height:"100px"},"@media (max-width: 500px)":{height:"80px"}},form:{display:"flex",flexGrow:1,flexDirection:"column",width:"50%","@media (max-width: 767px)":{width:"90%"}},centered:{display:"flex",alignItems:"center",justifyContent:"center"},todoIcon:{fontSize:35,p:1},popup:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"500px",bgcolor:"background.paper",boxShadow:20,p:4},textFlash:{opacity:"1",animation:"flash 1s infinite","@keyframes flash":{"0%":{opacity:1},"50%":{opacity:0},"100%":{opacity:1}}},spinner:{height:"50px",width:"50px",backgroundColor:"black",animation:"spin 1s linear infinite","@keyframes spin":{"100%":{transform:"rotate(89deg)"}}},padding:{paddingBottom:"24px","@media (max-width: 767px)":{paddingBottom:"16px"},"@media (max-width: 500px)":{paddingBottom:"8px"}}},$={logout:D,changePage:E},q=Object(i.b)((function(e){return{login:e.login,page:e.page}}),$)((function(e){var t=e.children;e.login,e.page,e.logout,e.changePage;return Object(Y.jsxs)(S.a,{sx:Z.root,children:[Object(Y.jsx)(V,{}),Object(Y.jsx)(T.a,{}),Object(Y.jsx)(A.a,{sx:Z.main,children:Object(Y.jsx)(A.a,{sx:Z.icon,children:Object(Y.jsx)("img",{style:{objectFit:"contain",height:"100%",width:"100%"},src:J,alt:"icon"})})}),Object(Y.jsx)(w.a,{variant:"h1",align:"center",sx:Z.padding,children:"Things To Do"}),Object(Y.jsx)("hr",{}),t]})})),K=n(199),Q=n(203),X=n(202),ee={login:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v("/login","POST",e).then((function(e){return 200===e.status?n({type:"LOGIN",payload:!0}):(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:e.status}))})).catch((function(e){return n({type:"LOGIN",payload:!1})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},changePage:E},te=Object(i.b)(null,ee)((function(e){var t=e.login,n=e.changePage,c=Object(a.useState)(""),r=Object(C.a)(c,2),i=r[0],o=r[1],s=Object(a.useState)(!1),d=Object(C.a)(s,2),u=d[0],l=d[1],j=Object(a.useState)(""),p=Object(C.a)(j,2),b=p[0],O=p[1],h=Object(a.useState)(!1),x=Object(C.a)(h,2),f=x[0],m=x[1],y=Object(a.useState)(!1),g=Object(C.a)(y,2),v=g[0],S=g[1];Object(a.useEffect)((function(){l(!/^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/.test(i))}),[i]),Object(a.useEffect)((function(){m(!b)}),[b]),Object(a.useEffect)((function(){S(!(!u&&!f))}),[u,f]);return Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsx)(X.a,{container:!0,direction:"column",children:Object(Y.jsxs)(X.a,{container:!0,spacing:1,padding:1,direction:"column",component:"form",onSubmit:function(e){e.preventDefault(),v||t({email:i,pword:b})},children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Login"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Email",value:i,onChange:function(e){return o(e.target.value)},error:u,autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",type:"password",label:"Password",value:b,onChange:function(e){return O(e.target.value)},error:f})}),Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",pt:2,spacing:2,children:[v?null:Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",type:"submit",color:"success",children:"Login"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"text",onClick:function(){return n("createAccount")},children:"Create An Account"})})]})})]})]})})})]})})),ne={createAccount:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v("/user","POST",e).then((function(e){return 201===e.status?void n({type:"LOGIN",payload:!0}):(n({type:"LOGIN",payload:!1}),n({type:"STATUS",payload:e.status}),void n({type:"CHANGE_PAGE",payload:"home"}))})).catch((function(e){}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},changePage:E},ae=Object(i.b)(null,ne)((function(e){var t=e.createAccount,n=e.changePage,c=Object(a.useState)(""),r=Object(C.a)(c,2),i=r[0],o=r[1],s=Object(a.useState)(""),d=Object(C.a)(s,2),u=d[0],l=d[1],j=Object(a.useState)(""),p=Object(C.a)(j,2),b=p[0],O=p[1],h=Object(a.useState)(""),x=Object(C.a)(h,2),f=x[0],m=x[1],y=Object(a.useState)(!1),g=Object(C.a)(y,2),v=g[0],S=g[1],T=Object(a.useState)(!1),A=Object(C.a)(T,2),E=A[0],D=A[1],U=Object(a.useState)(!1),k=Object(C.a)(U,2),P=k[0],I=k[1],G=Object(a.useState)(!1),W=Object(C.a)(G,2),_=W[0],z=W[1],N=Object(a.useState)(!1),L=Object(C.a)(N,2),F=L[0],H=L[1];Object(a.useEffect)((function(){S(!i)}),[i]),Object(a.useEffect)((function(){/^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/.test(u)?D(!1):D(!0)}),[u]),Object(a.useEffect)((function(){I(!b)}),[b]),Object(a.useEffect)((function(){z(!f||b!==f)}),[b,f]),Object(a.useEffect)((function(){H(!!(v||E||P||_))}),[v,E,P,_]);return Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Create Account"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",spacing:1,padding:1,component:"form",onSubmit:function(e){e.preventDefault(),F||t({name:i,email:u,pword:b})},children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Name",value:i,onChange:function(e){return o(e.target.value)},error:v,autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Email",value:u,onChange:function(e){return l(e.target.value)},error:E})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Password",value:b,onChange:function(e){return O(e.target.value)},error:P,type:"password"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Confirm Password",value:f,onChange:function(e){return m(e.target.value)},error:_,type:"password"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",padding:2,spacing:2,children:[F?null:Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",type:"submit",color:"success",children:"Sign Up!"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"warning",onClick:function(){return n("home")},children:"Cancel"})})]})})]})})]})})]})})]})})),ce=n(201),re=n(195),ie=Object(i.b)((function(e){return{appStatus:e.appStatus}}))((function(e){var t=e.appStatus,n=Object(a.useState)(!1),c=Object(C.a)(n,2),r=c[0],i=c[1];Object(a.useEffect)((function(){i(!!t)}),[t]);var o=function(){switch(t){case 401:return"Not Authorised";case 406:return"Invalid inputs";case 404:return"Not found";case 409:return"Duplication";default:return"There was a problem with your request"}},s=function(){return"loading"===t?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(w.a,{variant:"h4",children:"Loading"}),Object(Y.jsx)(A.a,{marginTop:2,sx:Z.spinner})]}):Object(Y.jsxs)(re.a,{alignItems:"center",spacing:2,children:[Object(Y.jsx)(w.a,{variant:"h4",children:"Warning!"}),Object(Y.jsx)(w.a,{variant:"h5",children:o()}),Object(Y.jsx)(w.a,{sx:Z.textFlash,color:"blue",variant:"h6",children:"Click to dismiss"})]})};return Object(Y.jsx)(ce.a,{open:r,children:Object(Y.jsx)(A.a,{sx:Object(j.a)(Object(j.a)({},Z.popup),{},{border:"2px solid red"}),children:Object(Y.jsx)(A.a,{sx:Z.main,onClick:function(){"loading"!==t&&i(!1)},children:Object(Y.jsx)(s,{})})})})})),oe=n(108),se=n.n(oe),de=n(49),ue=n.n(de),le=function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){var a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),n({type:"TODO_TO_EDIT",payload:null}),a={todo:e.todo,done:!!e.done,dueDate:e.dueDate},t.next=5,v("/todo/".concat(e.id),"PUT",a).then((function(e){return 202===e.status?(n({type:"CHANGE_PAGE",payload:"home"}),n({type:"STATUS",payload:null}),void n({type:"UPDATE_TODO",payload:e.todo})):401===e.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):void n({type:"STATUS",payload:e.status})})).catch((function(e){}));case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},je=n(77),pe=n.n(je),be=n(105),Oe=n.n(be),he=n(106),xe=n.n(he),fe=n(78),me=n.n(fe),ye=n(107),ge=n.n(ye),ve={addStep:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),t.next=3,v("/todo/".concat(e.todoId,"/step"),"POST",e).then((function(e){return 201===e.status?(n({type:"STATUS",payload:null}),void n({type:"ADD_STEP",payload:e.step})):401===e.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):n({type:"STATUS",payload:e.status})}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},updateStep:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),t.next=3,v("/todo/".concat(e.todoId,"/step/").concat(e.stepId),"PUT",e.body).then((function(e){return 202===e.status?(n({type:"STATUS",payload:null}),void n({type:"UPDATE_STEP",payload:e.step})):401===e.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):n({type:"STATUS",payload:e.status})})).catch((function(e){}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},deleteStep:function(e,t){return function(){var n=Object(g.a)(y.a.mark((function n(a){return y.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a({type:"STATUS",payload:"loading"}),n.next=3,v("/todo/".concat(t,"/step/").concat(e),"DELETE").then((function(n){return 202===n.status?(a({type:"STATUS",payload:null}),void a({type:"REMOVE_STEP",payload:{stepId:e,todoId:t}})):401===n.status?(a({type:"LOGIN",payload:!1}),void a({type:"STATUS",payload:401})):void a({type:"STATUS",payload:n.status})}));case 3:return n.abrupt("return",n.sent);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()}},Se=Object(i.b)(null,ve)((function(e){var t=e.steps,n=e.todoId,c=e.addStep,r=e.updateStep,i=e.deleteStep,o=Object(a.useState)(""),s=Object(C.a)(o,2),d=s[0],u=s[1];return Object(Y.jsxs)(X.a,{container:!0,direction:"column",children:[t.map((function(e){return Object(Y.jsx)(X.a,{container:!0,children:Object(Y.jsx)(X.a,{item:!0,xs:12,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:1,children:e.done?Object(Y.jsx)(ue.a,{onClick:function(){return r({stepId:e.id,todoId:e.todoId,body:{step:e.step,done:!e.done}})}}):Object(Y.jsx)(pe.a,{color:"success",onClick:function(){return r({stepId:e.id,todoId:e.todoId,body:{step:e.step,done:!e.done}})}})}),Object(Y.jsx)(X.a,{item:!0,xs:10,pl:2,sx:{overflow:"hidden"},children:Object(Y.jsx)(w.a,{variant:"body1",children:e.step})}),Object(Y.jsx)(X.a,{item:!0,xs:1,children:Object(Y.jsx)(me.a,{color:"warning",onClick:function(){return i(e.id,e.todoId)}})})]})})},e.id)})),Object(Y.jsxs)(X.a,{container:!0,component:"form",onSubmit:function(e){return e.preventDefault(),d?(c({todoId:n,step:d,done:!1}),void u("")):void 0},spacing:1,children:[Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,children:Object(Y.jsx)(K.a,{variant:"standard",label:"Enter new step...",value:d,onChange:function(e){var t=e.target.value.replace(/[^a-zA-Z0-9 .,]/,"");u(t)},sx:{marginRight:"10px",width:"100%"},autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:4,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:"Add Step"})})]})]})})),Te={updateTodo:le,deleteTodo:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),t.next=3,v("/todo/".concat(e),"DELETE").then((function(t){return 202===t.status?(n({type:"STATUS",payload:null}),void n({type:"REMOVE_TODO",payload:{todoId:e}})):401===t.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):void n({type:"STATUS",payload:t.status})})).catch((function(e){}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},editTodo:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n({type:"TODO_TO_EDIT",payload:e});case 2:return n({type:"CHANGE_PAGE",payload:"editTodo"}),t.abrupt("return");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},resetTodo:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),t.next=3,v("/todo/".concat(e,"/reset"),"PUT").then((function(e){return 202===e.status?(n({type:"STATUS",payload:null}),void n({type:"UPDATE_TODO",payload:e.todo})):n({type:"STATUS",payload:e.status})}));case 3:return t.abrupt("return");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},we=Object(i.b)(null,Te)((function(e){var t=e.todo,n=e.updateTodo,c=e.deleteTodo,r=e.editTodo,i=e.resetTodo,o=Object(a.useState)(!1),s=Object(C.a)(o,2),d=s[0],u=s[1],l=Object(a.useState)(!1),p=Object(C.a)(l,2),b=p[0],O=p[1],h=function(e){n(Object(j.a)(Object(j.a)({},e),{},{done:!e.done}))};return Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(ce.a,{open:b,onClose:function(){return O(!1)},children:Object(Y.jsxs)(A.a,{sx:Z.popup,children:[Object(Y.jsx)(w.a,{align:"center",color:"error",variant:"h3",sx:Z.textFlash,children:"Warning!"}),Object(Y.jsx)(w.a,{align:"center",color:"error",variant:"h5",children:"This will permanantly delete the Todo!"}),Object(Y.jsx)(w.a,{align:"center",variant:"h5",children:"Consider clicking the green tick to mark it as done instead..."}),Object(Y.jsxs)(re.a,{direction:"row",spacing:2,padding:2,justifyContent:"center",children:[Object(Y.jsx)(Q.a,{color:"error",variant:"contained",onClick:function(){return c(t.id)},children:"Delete it!"}),Object(Y.jsx)(Q.a,{color:"success",variant:"contained",onClick:function(){return O(!1)},children:"Keep it!"})]})]})}),Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:1,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",alignItems:"center",children:[Object(Y.jsx)(X.a,{item:!0,children:t.done?Object(Y.jsx)(ue.a,{fontSize:"large",onClick:function(){return h(t)}}):Object(Y.jsx)(pe.a,{fontSize:"large",color:"success",onClick:function(){return h(t)}})}),Object(Y.jsx)(X.a,{item:!0,children:d?Object(Y.jsx)(Oe.a,{fontSize:"large",onClick:function(){return u(!d)}}):Object(Y.jsx)(L.a,{fontSize:"large",onClick:function(){return u(!d)}})})]})}),Object(Y.jsx)(X.a,{item:!0,xs:10,pl:1,pr:1,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",children:[Object(Y.jsxs)(X.a,{container:!0,padding:1,children:[Object(Y.jsx)(X.a,{item:!0,xs:12,sx:{display:"flex",alignItems:"center",paddingLeft:1,overflow:"hidden"},children:Object(Y.jsx)(w.a,{variant:"h4",children:t.todo})}),Object(Y.jsx)(X.a,{item:!0,xs:12,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:6,children:function(){var e,n=t.steps.length;if(0===n)e="No Steps";else{var a=t.steps.filter((function(e){return e.done}));e="".concat(a.length,"/").concat(n," steps completed")}return Object(Y.jsx)(w.a,{variant:"h5",sx:{textAlign:"center"},children:e})}()}),Object(Y.jsx)(X.a,{item:!0,xs:6,children:function(){var e,n=new Date,a=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate(),c=Math.floor(new Date("".concat(a," 00:00")).getTime()/864e5),r=Math.floor(new Date("".concat(t.dueDate," 00:00")).getTime()/864e5)-c;return e=r<0?"".concat(Math.abs(r)," days overdue!"):0===r?"Due today!":"".concat(r," days until due."),Object(Y.jsx)(w.a,{variant:"h5",sx:{textAlign:"center"},children:e})}()})]})})]}),d?Object(Y.jsx)(Se,{steps:t.steps,todoId:t.id}):null]})}),Object(Y.jsx)(X.a,{item:!0,xs:1,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",alignItems:"center",children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(xe.a,{fontSize:"large",onClick:function(){return r(t)}})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(ge.a,{onClick:function(){return i(String(t.id))}})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(me.a,{fontSize:"large",color:"error",onClick:function(){return O(!0)}})})]})})]}),Object(Y.jsx)("hr",{})]})})),Ae={getTodos:function(){return function(){var e=Object(g.a)(y.a.mark((function e(t,n){var a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="active"===n().showTodos?"/todo":"/todo/all",t({type:"STATUS",payload:"loading"}),e.next=4,v(a,"GET").then((function(e){return 200===e.status?(t({type:"TODOS_FETCHED",payload:!0}),t({type:"SET_TODOS",payload:e.todos}),void t({type:"STATUS",payload:null})):401===e.status?(t({type:"LOGIN",payload:!1}),void t({type:"STATUS",payload:401})):void t({type:"STATUS",payload:e.status})})).catch((function(e){}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},changePage:E},Ee=Object(i.b)((function(e){return{todos:e.todos,todosFetched:e.todosFetched}}),Ae)((function(e){var t=e.todos,n=e.todosFetched,c=e.getTodos,r=e.changePage,i=Object(a.useState)("active"),o=Object(C.a)(i,2),s=o[0],d=o[1];Object(a.useEffect)((function(){n||c()}),[c,n]);var u=function(){var e=t.sort((function(e,t){return e.dueDate===t.dueDate?0:e.dueDate<t.dueDate?-1:1}));return"active"===s?e.filter((function(e){return e.done?null:e})):e};return Object(Y.jsxs)(X.a,{container:!0,direction:"column",alignItems:"center",children:[Object(Y.jsx)(X.a,{item:!0,xs:12,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Your Todos"})}),Object(Y.jsxs)(X.a,{container:!0,spacing:1,padding:1,justifyContent:"center",children:[Object(Y.jsx)(X.a,{item:!0,xs:12,sm:6,md:4,lg:3,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",onClick:function(){return r("addTodo")},color:"success",startIcon:Object(Y.jsx)(se.a,{}),children:"Add A Todo"})}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:6,md:4,lg:3,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",onClick:function(){return d("active"===s?"all":"active")},startIcon:Object(Y.jsx)(ue.a,{}),children:"all"===s?"Show Active Todos":"Show All Todos"})})]}),Object(Y.jsxs)(X.a,{container:!0,direction:"row",children:[Object(Y.jsx)(X.a,{item:!0,xs:0,md:1}),Object(Y.jsxs)(X.a,{item:!0,xs:12,md:10,children:[0!==u().length?null:Object(Y.jsxs)(X.a,{container:!0,direction:"column",alignItems:"center",p:1,spacing:2,children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h4",children:"Whoops, it looks like there's nothing here"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h4",children:'Click "ADD A TODO" to add a new todo'})}),"all"===s?null:Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{align:"center",variant:"h6",children:"...or..."})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{align:"center",variant:"h4",children:'Click "SHOW ALL TODOS" to show the ones you have marked as done.'})})]})]}),u().map((function(e){return Object(Y.jsx)(we,{todo:e},e.id)}))]})]})]})})),De=n(197),Ce=n(196),Ue=n(198),ke={addTodo:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){var a;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),a=Object(j.a)(Object(j.a)({},e),{},{done:!1}),t.next=4,v("/todo","POST",a).then((function(e){return 201===e.status?(n({type:"STATUS",payload:null}),n({type:"ADD_TODO",payload:e.todo}),void n({type:"CHANGE_PAGE",payload:"home"})):401===e.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:401})):n({type:"STATUS",payload:[e.status]})})).catch((function(e){}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},changePage:E},Pe=Object(i.b)(null,ke)((function(e){var t=e.addTodo,n=e.changePage,c=Object(a.useState)(""),r=Object(C.a)(c,2),i=r[0],o=r[1],s=Object(a.useState)(new Date),d=Object(C.a)(s,2),u=d[0],l=d[1],p=Object(a.useState)(!1),b=Object(C.a)(p,2),O=b[0],h=b[1],x=Object(a.useState)(!1),f=Object(C.a)(x,2),m=f[0],y=f[1],g=Object(a.useState)(!1),v=Object(C.a)(g,2),S=v[0],T=v[1];Object(a.useEffect)((function(){h(!i)}),[i]),Object(a.useEffect)((function(){u&&"function"===typeof u.getMonth?y(!1):y(!0)}),[u]),Object(a.useEffect)((function(){T(!(!O&&!m))}),[O,m]);return Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Add A Todo"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",component:"form",spacing:1,padding:1,onSubmit:function(e){if(e.preventDefault(),!S){var n,a=(n=u).getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate();t({todo:i,dueDate:a})}},children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,sx:{marginBottom:2},variant:"standard",label:"Enter Todo Text",value:i,onChange:function(e){var t=e.target.value.replace(/[^a-zA-Z0-9 .,]/,"");o(t)},error:O,autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Ce.b,{dateAdapter:Ue.a,children:Object(Y.jsx)(De.a,{label:"Due Date",value:u,openTo:"day",inputFormat:"dd/MM/yyyy",onChange:function(e){return l(e)},renderInput:function(e){return Object(Y.jsx)(K.a,Object(j.a)({fullWidth:!0},e))}})})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",padding:2,spacing:2,children:[S?null:Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",type:"submit",color:"success",children:"Add Todo"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"warning",onClick:function(){return n("home")},children:"Cancel"})})]})})]})})]})})]})})]})})),Ie={changePage:E,updateTodo:le},Ge=Object(i.b)((function(e){return{todoToUpdate:e.todoToUpdate}}),Ie)((function(e){var t=e.todoToUpdate,n=e.updateTodo,c=e.changePage,r=Object(a.useState)(""),i=Object(C.a)(r,2),o=i[0],s=i[1],d=Object(a.useState)(new Date),u=Object(C.a)(d,2),l=u[0],p=u[1],b=Object(a.useState)(!1),O=Object(C.a)(b,2),h=O[0],x=O[1],f=Object(a.useState)(!1),m=Object(C.a)(f,2),y=m[0],g=m[1];Object(a.useEffect)((function(){null!==t&&(s(t.todo),p(new Date(t.dueDate)))}),[t]),Object(a.useEffect)((function(){x(!o)}),[o]),Object(a.useEffect)((function(){g(!!h)}),[h]);return Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",component:"form",onSubmit:function(e){if(e.preventDefault(),!y&&l){var a,c=(a=l).getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();n(Object(j.a)(Object(j.a)({},t),{},{todo:o,dueDate:c}))}},children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Update A Todo"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,sx:{marginBottom:2},variant:"standard",label:"Enter Todo Text",value:o,onChange:function(e){var t=e.target.value.replace(/[^a-zA-Z0-9 .,]/,"");s(t)},error:h,autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Ce.b,{dateAdapter:Ue.a,children:Object(Y.jsx)(De.a,{label:"Due Date",value:l,openTo:"day",inputFormat:"dd/MM/yyyy",onChange:function(e){return p(e)},renderInput:function(e){return Object(Y.jsx)(K.a,Object(j.a)({fullWidth:!0},e))}})})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",padding:2,spacing:2,children:[y?null:Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",type:"submit",color:"success",children:"Update Todo"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"warning",onClick:function(){return c("home")},children:"Cancel"})})]})})]})})]})})]})})),We={updateUser:function(e){return function(){var t=Object(g.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"STATUS",payload:"loading"}),t.next=3,v("/user","PUT",e).then((function(e){return 401===e.status?(n({type:"LOGIN",payload:!1}),void n({type:"STATUS",payload:e.status})):202===e.status?(n({type:"STATUS",payload:null}),void n({type:"CHANGE_PAGE",payload:"home"})):void n({type:"STATUS",payload:e.status})}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setStatus:function(e){return function(t){return t({type:"STATUS",payload:e})}},changePage:E},_e=Object(i.b)(null,We)((function(e){var t=e.updateUser,n=e.setStatus,c=e.changePage,r=Object(a.useState)(!1),i=Object(C.a)(r,2),o=i[0],s=i[1],d=Object(a.useState)({name:"",email:""}),u=Object(C.a)(d,2),l=u[0],j=u[1],p=Object(a.useState)(""),b=Object(C.a)(p,2),O=b[0],h=b[1],x=Object(a.useState)(""),f=Object(C.a)(x,2),m=f[0],S=f[1],T=Object(a.useState)(""),E=Object(C.a)(T,2),D=E[0],U=E[1],k=Object(a.useState)(!1),P=Object(C.a)(k,2),I=P[0],G=P[1],W=Object(a.useState)(!1),_=Object(C.a)(W,2),z=_[0],N=_[1],L=Object(a.useState)(!1),F=Object(C.a)(L,2),H=F[0],M=F[1],R=Object(a.useState)(!1),B=Object(C.a)(R,2),V=B[0],J=B[1];Object(a.useEffect)((function(){var e=function(){var e=Object(g.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),e.next=3,v("/user","GET").then((function(e){if(200===e.status)return s(!1),j(e.user),h(e.user.name),void S(e.user.email);n(e.status)})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n]),Object(a.useEffect)((function(){G(!O)}),[O]),Object(a.useEffect)((function(){/^[a-z0-9.]+@[a-z0-9]+.[a-z0-9]+.[a-z0-9]{1,3}$/.test(m)?N(!1):N(!0)}),[m]),Object(a.useEffect)((function(){M(!D)}),[D]),Object(a.useEffect)((function(){J(!!(I||z||H))}),[I,z,H]);return Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsxs)(X.a,{item:!0,xs:12,sm:8,md:6,children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Update Your Details"})}),o?Object(Y.jsx)(A.a,{sx:Z.spinner}):Object(Y.jsxs)(X.a,{container:!0,component:"form",direction:"column",onSubmit:function(e){e.preventDefault(),V||O===l.name&&m===l.email||t({name:O,email:m,pword:D})},children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Name",value:O,onChange:function(e){return h(e.target.value)},error:I,autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Email",value:m,onChange:function(e){return S(e.target.value)},error:z})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Password",type:"password",value:D,onChange:function(e){return U(e.target.value)},error:H})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,lg:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,lg:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",padding:2,spacing:2,children:[!V&&Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:"Update Details"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",onClick:function(){return c("updatePassword")},children:"Update Password"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"warning",onClick:function(){return c("home")},children:"Cancel"})})]})})]})})]})]})]})})),ze={changePage:E,updatePassword:function(e){return function(t){return v("/user/password","PUT",e).then((function(e){return 401===e.status?(t({type:"LOGIN",payload:!1}),t({type:"STATUS",payload:e.status}),void t({type:"CHANGE_PAGE",payload:"home"})):202===e.status?(t({type:"STATUS",payload:null}),void t({type:"CHANGE_PAGE",payload:"home"})):void t({type:"STATUS",payload:e.status})}))}}},Ne=Object(i.b)(null,ze)((function(e){var t=e.changePage,n=e.updatePassword,c=Object(a.useState)(""),r=Object(C.a)(c,2),i=r[0],o=r[1],s=Object(a.useState)(""),d=Object(C.a)(s,2),u=d[0],l=d[1],j=Object(a.useState)(""),p=Object(C.a)(j,2),b=p[0],O=p[1],h=Object(a.useState)(!1),x=Object(C.a)(h,2),f=x[0],m=x[1],y=Object(a.useState)(!1),g=Object(C.a)(y,2),v=g[0],S=g[1],T=Object(a.useState)(!1),A=Object(C.a)(T,2),E=A[0],D=A[1],U=Object(a.useState)(!1),k=Object(C.a)(U,2),P=k[0],I=k[1];Object(a.useEffect)((function(){m(!i)}),[i]),Object(a.useEffect)((function(){S(!u)}),[u]),Object(a.useEffect)((function(){D(!b||b!==u)}),[b,u]),Object(a.useEffect)((function(){I(!!(f||v||E))}),[f,v,E]);return Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:8,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",component:"form",onSubmit:function(e){e.preventDefault(),P||i===u||n({pword:i,newPword:u})},padding:2,spacing:2,children:[Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(w.a,{variant:"h2",align:"center",children:"Update Your Password"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Old Password",type:"password",value:i,onChange:function(e){return o(e.target.value)},error:f,autoFocus:!0})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"New Password",type:"password",value:u,onChange:function(e){return l(e.target.value)},error:v})}),!v&&Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(K.a,{fullWidth:!0,variant:"standard",label:"Confirm New Password",type:"password",value:b,onChange:function(e){return O(e.target.value)},error:E})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsxs)(X.a,{container:!0,children:[Object(Y.jsx)(X.a,{item:!0,xs:0,sm:2,md:3}),Object(Y.jsx)(X.a,{item:!0,xs:12,sm:9,md:6,children:Object(Y.jsxs)(X.a,{container:!0,direction:"column",p:2,spacing:2,children:[!P&&Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"success",type:"submit",children:"Update"})}),Object(Y.jsx)(X.a,{item:!0,children:Object(Y.jsx)(Q.a,{fullWidth:!0,variant:"contained",color:"warning",onClick:function(){return t("home")},children:"Cancel"})})]})})]})})]})})]})})),Le=n(110),Fe=n(204),He={palette:{success:{main:"#9ee99e"}},typography:{h1:{"@media (max-width: 900px)":{fontSize:"4rem"},"@media (max-width: 767px)":{fontSize:"3rem"},"@media (max-width: 500px)":{fontSize:"2.5rem"}},h2:{"@media (max-width: 900px)":{fontSize:"3rem"},"@media (max-width: 767px)":{fontSize:"2.5rem"},"@media (max-width: 500px)":{fontSize:"2rem"}},h4:{"@media (max-width: 900px)":{fontSize:"1.8rem"},"@media (max-width: 767px)":{fontSize:"1.4rem"},"@media (max-width: 500px)":{fontSize:"1.2rem"}},h5:{"@media (max-width: 900px)":{fontSize:"1.2rem"},"@media (max-width: 767px)":{fontSize:"1rem"},"@media (max-width: 500px)":{fontSize:"0.8rem"}},body1:{"@media (max-width: 900px)":{},"@media (max-width: 767px)":{fontSize:"0.7rem"},"@media (max-width: 500px)":{}}}},Me=Object(Le.a)(He),Re=Object(i.b)((function(e){return{login:e.login,page:e.page}}),{ping:function(){return function(){var e=Object(g.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("/ping","GET").then((function(e){return 200===e.status&&"ok"===e.message?t({type:"LOGIN",payload:!0}):t({type:"LOGIN",payload:!1})})).catch((function(e){}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}})((function(e){var t=e.login,n=e.page,c=e.ping;Object(a.useEffect)((function(){c()}),[c]);var r=function(){if(!t)return"createAccount"===n?Object(Y.jsx)(ae,{}):Object(Y.jsx)(te,{});switch(n){default:return Object(Y.jsx)(Ee,{});case"addTodo":return Object(Y.jsx)(Pe,{});case"editTodo":return Object(Y.jsx)(Ge,{});case"editUser":return Object(Y.jsx)(_e,{});case"updatePassword":return Object(Y.jsx)(Ne,{})}};return Object(Y.jsx)(Fe.a,{theme:Me,children:Object(Y.jsxs)(q,{children:[Object(Y.jsx)(ie,{}),Object(Y.jsx)(r,{})]})})})),Ye=Object(o.c)(f,Object(o.a)(s.a));r.a.render(Object(Y.jsx)(i.a,{store:Ye,children:Object(Y.jsx)(Re,{})}),document.querySelector("#root"))}},[[141,1,2]]]);
//# sourceMappingURL=main.1f351923.chunk.js.map