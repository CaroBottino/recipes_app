import{d as B,c as t,a as e,F as f,r as g,o as s,t as _,b as T,e as k,p as N,f as A,_ as F,u as P,g as j,h as q,i as L,j as V,k as u,w as z,l as I,v as w,m as C,R as G}from"./index-1071b04f.js";const v=o=>(N("data-v-ec18cb94"),o=o(),A(),o),J={class:"table"},K=v(()=>e("th",{scope:"col"},"#",-1)),O=v(()=>e("th",null,"actions",-1)),Q={scope:"row"},W=["src"],X={key:0},Y=["onClick"],Z=v(()=>e("i",{class:"bi bi-search-heart"},null,-1)),ee=[Z],te=["onClick"],se=v(()=>e("i",{class:"bi bi-pencil"},null,-1)),oe=[se],ae=["onClick"],ie=v(()=>e("i",{class:"bi bi-trash"},null,-1)),ne=[ie],le=B({__name:"CustomTable",props:{headers:{type:Array,required:!0},items:{type:Array,required:!0},actions:{type:Array}},emits:["editItem","deleteItem","viewItem"],setup(o,{emit:i}){const p=a=>{i("editItem",a)},y=a=>{i("deleteItem",a)},h=a=>{i("viewItem",a)};return(a,$)=>(s(),t("table",J,[e("thead",null,[e("tr",null,[K,(s(!0),t(f,null,g(o.headers,(l,b)=>(s(),t("th",{key:b},_(l),1))),128)),O])]),e("tbody",null,[(s(!0),t(f,null,g(o.items,(l,b)=>(s(),t("tr",{key:l.id},[e("th",Q,_(b+1),1),(s(!0),t(f,null,g(o.headers,(r,U)=>(s(),t("td",{key:U},[r==="img"?(s(),t("img",{key:0,src:l[r],class:"img-fluid rounded-start",alt:"..."},null,8,W)):r==="tags"?(s(!0),t(f,{key:1},g(l[r],(R,x)=>(s(),t("span",{key:x,class:"badge rounded-pill bg-primary tag"},_(R),1))),128)):(s(),t(f,{key:2},[T(_(l[r]),1)],64))]))),128)),o.actions?(s(),t("td",X,[o.actions.includes("view")?(s(),t("button",{key:0,type:"button",class:"btn btn-primary",onClick:r=>h(l.id),"data-bs-toggle":"modal","data-bs-target":"#infoRecipe"},ee,8,Y)):k("",!0),o.actions.includes("edit")?(s(),t("button",{key:1,type:"button",class:"btn btn-primary",onClick:r=>p(l.id)},oe,8,te)):k("",!0),o.actions.includes("delete")?(s(),t("button",{key:2,type:"button",class:"btn btn-primary",onClick:r=>y(l.id)},ne,8,ae)):k("",!0)])):k("",!0)]))),128))])]))}});const S=F(le,[["__scopeId","data-v-ec18cb94"]]),c=o=>(N("data-v-d6574bfe"),o=o(),A(),o),ce={class:"body"},re=c(()=>e("h1",{class:"user-header"},"Información de usuario",-1)),de={class:"col d-flex justify-content-center"},ue={class:"card mb-3"},me={class:"row g-0"},_e={class:"col-md-6 card-photo"},pe=["src"],he={class:"col-md-6"},be={class:"card-body"},fe={class:"card-title"},ve={key:0},ye=["onSubmit"],ge={class:"mb-3"},ke=c(()=>e("label",{for:"fullname",class:"form-label col-form-label-sm"},"Fullname",-1)),Ie={class:"mb-3"},we=c(()=>e("label",{for:"email",class:"form-label col-form-label-sm"},"Email",-1)),$e={class:"mb-3"},Ue=c(()=>e("label",{for:"email",class:"form-label col-form-label-sm"},"Password",-1)),Re={class:"mb-3"},xe=c(()=>e("label",{for:"email",class:"form-label col-form-label-sm"},"Avatar",-1)),Ce=c(()=>e("button",{type:"submit",class:"btn btn-primary"},[e("i",{class:"bi bi-check"})],-1)),Ve={key:1},Se={class:"card-text"},Be={class:"card-text"},Te=c(()=>e("i",{class:"bi bi-pencil"},null,-1)),Ne=[Te],Ae=c(()=>e("h3",null,"Tus recetas",-1)),Fe=c(()=>e("i",{class:"bi bi-file-earmark-plus"},null,-1)),De=c(()=>e("h3",null,"Tus recetas compradas",-1)),Ee={key:0},He={key:1},Me=c(()=>e("h6",null,"No compraste recetas aún",-1)),Pe=[Me],je=B({__name:"UserView",setup(o){const i=P(),p=j(),y=q(),h=L(!1),a=V({user:{...i.getUser}}),$=V({recipe:{id:"",name:"",img:"",ingredients:[],steps:[],price:0,time:0,servings:0,tags:[],user:""}}),l=["id","name","img","time","servings","tags","price"],b=["view","edit","delete"],r=["delete"],U=()=>{i.editUserInfo(a.user),alert("usuario editado correctamente"),h.value=!1},R=()=>{h.value=!h.value},x=()=>{y.push({name:"edit-recipe",params:{id:"new"}})},D=d=>{const n=p.getRecipeById(d);n&&($.recipe=n)},E=d=>{y.push({name:"edit-recipe",params:{id:d}})},H=d=>{p.deleteRecipe(d).then(()=>{alert("Receta eliminada"),p.getRecipesFromApi()}).catch(n=>{alert("error al eliminar receta"),console.log("err: ",n)})},M=d=>{i.deleteItemFromBought(d)};return(d,n)=>(s(),t("div",ce,[re,e("div",de,[e("div",ue,[e("div",me,[e("div",_e,[e("img",{src:u(i).getUser.avatar,class:"img-fluid rounded-start",alt:"..."},null,8,pe)]),e("div",he,[e("div",be,[e("h4",fe,_(u(i).getUser.fullname),1),h.value?(s(),t("div",ve,[e("form",{onSubmit:z(U,["prevent"])},[e("div",ge,[ke,I(e("input",{type:"text",class:"form-control form-control-sm",id:"fullname","onUpdate:modelValue":n[0]||(n[0]=m=>a.user.fullname=m),name:"fullname"},null,512),[[w,a.user.fullname]])]),e("div",Ie,[we,I(e("input",{type:"email",class:"form-control form-control-sm",id:"email","onUpdate:modelValue":n[1]||(n[1]=m=>a.user.email=m),name:"email"},null,512),[[w,a.user.email]])]),e("div",$e,[Ue,I(e("input",{type:"text",class:"form-control form-control-sm",id:"pass","onUpdate:modelValue":n[2]||(n[2]=m=>a.user.pass=m),name:"pass"},null,512),[[w,a.user.pass]])]),e("div",Re,[xe,I(e("input",{type:"text",class:"form-control form-control-sm",id:"avatar","onUpdate:modelValue":n[3]||(n[3]=m=>a.user.avatar=m),name:"avatar"},null,512),[[w,a.user.avatar]])]),Ce],40,ye)])):(s(),t("div",Ve,[e("p",Se,"email: "+_(u(i).getUser.email),1),e("p",Be,"Password: "+_(u(i).getUser.pass),1),e("button",{type:"button",class:"btn btn-primary",onClick:R},Ne)]))])])])])]),Ae,e("div",{class:"new-item"},[e("button",{type:"button",class:"btn btn-primary",onClick:x},[Fe,T(" Nueva Receta ")])]),C(S,{headers:l,items:u(p).getRecipesByUser(u(i).getUser.id),actions:b,onViewItem:D,onEditItem:E,onDeleteItem:H},null,8,["items"]),De,u(i).getRecipesBought.length>0?(s(),t("div",Ee,[C(S,{headers:l,items:u(i).getRecipesBought,actions:r,onDeleteItem:M},null,8,["items"])])):(s(),t("div",He,Pe)),C(G,{recipe:$.recipe},null,8,["recipe"])]))}});const Le=F(je,[["__scopeId","data-v-d6574bfe"]]);export{Le as default};
