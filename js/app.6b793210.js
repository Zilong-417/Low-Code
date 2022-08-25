(function(){"use strict";var e={2667:function(e,t,l){var o=l(9242),a=(l(2834),l(3396));const r={class:"app"};function n(e,t,l,o,n,i){const s=(0,a.up)("Editor");return(0,a.wg)(),(0,a.iD)("div",r,[(0,a.Wm)(s,{modelValue:o.state,"onUpdate:modelValue":t[0]||(t[0]=e=>o.state=e),formData:o.formData},null,8,["modelValue","formData"])])}var i=l(4870),s=JSON.parse('{"container":{"width":900,"height":650},"blocks":[]}'),u=(0,a.aZ)({props:{block:{type:Object},component:{type:Object}},setup(e,t){const{width:l,height:o}=e.component.resize||{};let r={};const n=t=>{let{clientX:l,clientY:o}=t,{startX:a,startY:n,startWidth:i,startHeight:s,startLeft:u,startTop:c,direction:d}=r;"center"==d.horizontal&&(l=a),"center"==d.vertical&&(o=n);let p=l-a,v=o-n;"start"==d.vertical&&(v=-v,e.block.top=c-v),"start"==d.horizontal&&(p=-p,e.block.left=u-p);const m=i+p,b=s+v;e.block.width=m,e.block.height=b,e.block.hasResize=!0},i=()=>{console.log("mouseup"),document.body.removeEventListener("mousemove",n),document.body.removeEventListener("mouseup",i)},s=(t,l)=>{t.stopPropagation(),r={startX:t.clientX,startY:t.clientY,startWidth:e.block.width,startHeight:e.block.height,startLeft:e.block.left,startTop:e.block.top,direction:l},document.body.addEventListener("mousemove",n),document.body.addEventListener("mouseup",i)};return()=>(0,a.Wm)(a.HY,null,[l&&(0,a.Wm)(a.HY,null,[(0,a.Wm)("div",{class:"block-resize block-resize-left",onMousedown:e=>s(e,{horizontal:"start",vertical:"center"})},null),(0,a.Wm)("div",{class:"block-resize block-resize-right",onMousedown:e=>s(e,{horizontal:"end",vertical:"center"})},null)]),o&&(0,a.Wm)(a.HY,null,[(0,a.Wm)("div",{class:"block-resize block-resize-top",onMousedown:e=>s(e,{horizontal:"center",vertical:"start"})},null),(0,a.Wm)("div",{class:"block-resize block-resize-bottom",onMousedown:e=>s(e,{horizontal:"center",vertical:"end"})},null)]),l&&o&&(0,a.Wm)(a.HY,null,[(0,a.Wm)("div",{class:"block-resize block-resize-top-left",onMousedown:e=>s(e,{horizontal:"start",vertical:"start"})},null),(0,a.Wm)("div",{class:"block-resize block-resize-top-right",onMousedown:e=>s(e,{horizontal:"end",vertical:"start"})},null),(0,a.Wm)("div",{class:"block-resize block-resize-bottom-left",onMousedown:e=>s(e,{horizontal:"start",vertical:"end"})},null),(0,a.Wm)("div",{class:"block-resize block-resize-bottom-right",onMousedown:e=>s(e,{horizontal:"end",vertical:"end"})},null)])])}}),c=l(1373);const d=(0,c.Z)();var p=(0,a.aZ)({props:{block:{type:Object},formData:{type:Object}},setup(e){const t=(0,a.Fl)((()=>({top:`${e.block.top}px`,left:`${e.block.left}px`,zIndex:`${e.block.zIndex}`}))),l=(0,a.f3)("config"),o=(0,i.iH)(null);return(0,a.bv)((()=>{console.log(e);let{offsetWidth:t,offsetHeight:l}=o.value;if(e.block.alignCenter)e.block.left=e.block.left-t/2,e.block.top=e.block.top-l/2,e.block.alignCenter=!1,e.block.width=t,e.block.height=l;else{const t=new Promise(((e,t)=>{d.on("blocksize",(t=>{e(t),console.log(t)}))}));t.then((t=>{let l=Number(String(t.props.width).split("p",1)),o=Number(String(t.props.height).split("p",1));e.block.width=l||t.width,e.block.height=o||t.height}))}})),()=>{const r=l.componentMap[e.block.key],n=r.render({size:e.block.hasResize?{width:e.block.width,height:e.block.height}:{},props:e.block.props,events:e.block.events,model:Object.keys(r.model||{}).reduce(((t,l)=>{let o=e.block.model[l];return t[l]={modelValue:e.formData[o],"onUpdate:modelValue":t=>e.formData[o]=t},t}),{})}),{width:i,height:s}=r.resize||{};return(0,a.Wm)("div",{class:"editor-block",style:t.value,ref:o},[n,e.block.focus&&(i||s)&&(0,a.Wm)(u,{block:e.block,component:r},null)])}}}),v=l(2177),m=l.n(v);function b(e,t){let l=null;const o=e=>{e.dataTransfer.dropEffect="move"},a=e=>{e.preventDefault()},r=e=>{e.dataTransfer.dropEffect="none"},n=e=>{let o=t.value.blocks;t.value={...t.value,blocks:[...o,{top:e.offsetY,left:e.offsetX,zIndex:1,key:l.key,alignCenter:!0,props:{},model:{},events:{}}]},l=null},i=(t,i)=>{e.value.addEventListener("dragenter",o),e.value.addEventListener("dragover",a),e.value.addEventListener("dragleave",r),e.value.addEventListener("drop",n),l=i,d.emit("start")};console.log(t.value);const s=t=>{e.value.removeEventListener("dragenter",o),e.value.removeEventListener("dragover",a),e.value.removeEventListener("dragleave",r),e.value.removeEventListener("drop",n),d.emit("end")};return{dragstart:i,dragend:s}}function h(e,t,l){const o=(0,i.iH)(-1),r=(0,a.Fl)((()=>e.value.blocks[o.value]));console.log(r);const n=(0,a.Fl)((()=>{let t=[],l=[];return e.value.blocks.forEach((e=>(e.focus?t:l).push(e))),{focus:t,unfocused:l}})),s=()=>{e.value.blocks.forEach((e=>e.focus=!1))},u=()=>{t.value||(s(),o.value=-1)},c=(e,a,r)=>{t.value||(e.preventDefault(),e.stopPropagation(),e.shiftKey?n.value.focus.length<=1?a.focus=!0:a.focus=!a.focus:a.focus||(s(),a.focus=!0),o.value=r,l(e))};return{blockMousedown:c,containerMousedown:u,focusData:n,lastSelectBlock:r,clearBlockFocus:s}}function f(e,t,l){let o={startX:0,startY:0,dragging:!1},a=(0,i.qj)({x:null,y:null});const r=a=>{const{width:r,height:i}=t.value;o={startX:a.clientX,startY:a.clientY,startLeft:t.value.left,startTop:t.value.top,dragging:!1,startPos:e.value.focus.map((({top:e,left:t})=>({top:e,left:t}))),lines:(()=>{const{unfocused:t}=e.value;let o={x:[],y:[]};return[...t,{top:0,left:0,width:l.value.container.width,height:l.value.container.height}].forEach((e=>{const{top:t,left:l,width:a,height:n}=e;o.y.push({showTop:t,top:t}),o.y.push({showTop:t,top:t-i}),o.y.push({showTop:t+n/2,top:t+n/2-i/2}),o.y.push({showTop:t+n,top:t+n}),o.y.push({showTop:t+n,top:t+n-i}),o.x.push({showLeft:l,left:l}),o.x.push({showLeft:l+a,left:l+a}),o.x.push({showLeft:l+a/2,left:l+a/2-r/2}),o.x.push({showLeft:l+a,left:l+a-r}),o.x.push({showLeft:l,left:l-r})})),o})()},document.addEventListener("mousemove",n),document.addEventListener("mouseup",s)},n=t=>{let{clientX:l,clientY:r}=t;o.dragging||(o.dragging=!0,d.emit("start"));let n=l-o.startX+o.startLeft,i=r-o.startY+o.startTop,s=null,u=null;for(let e=0;e<o.lines.y.length;e++){const{top:t,showTop:l}=o.lines.y[e];if(Math.abs(t-i)<5){s=l,r=o.startY-o.startTop+t;break}}for(let e=0;e<o.lines.x.length;e++){const{left:t,showLeft:a}=o.lines.x[e];if(Math.abs(t-n)<5){u=a,l=o.startX-o.startLeft+t;break}}a.x=u,a.y=s;let c=l-o.startX,p=r-o.startY;e.value.focus.forEach(((e,t)=>{e.top=o.startPos[t].top+p,e.left=o.startPos[t].left+c}))},s=e=>{document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",s),a.x=null,a.y=null,o.dragging&&d.emit("end")};return{mousedown:r,markLine:a}}var k=l(1565);function g(e,t){const l={current:-1,queue:[],commands:{},commandArray:[],destroyArray:[]},o=e=>{l.commandArray.push(e),l.commands[e.name]=(...t)=>{const{redo:o,undo:a}=e.execute(...t);if(o(),!e.pushQueue)return;let{queue:r,current:n}=l;r.length>0&&(r=r.slice(0,n+1),l.queue=r),r.push({redo:o,undo:a}),l.current=n+1,console.log(r)}};o({name:"redo",keyboard:"ctrl+y",execute(){return{redo(){if(console.log(l.current),console.log(l.queue.length),-1==l.current||l.current==l.queue.length-1)return void(0,k.z8)({showClose:!0,message:"没有可以还原的内容了!",type:"warning"});let e=l.queue[l.current+1];e&&(e.redo&&e.redo(),l.current++)}}}}),o({name:"undo",keyboard:"ctrl+z",execute(){return{redo(){if(-1==l.current)return void(0,k.z8)({showClose:!0,message:"没有可以撤销的内容了!",type:"warning"});let e=l.queue[l.current];e&&(e.undo&&e.undo(),l.current--)}}}}),o({name:"drag",pushQueue:!0,init(){this.before=null;const t=()=>{this.before=m()(e.value.blocks)},o=()=>{l.commands.drag()};return d.on("start",t),d.on("end",o),()=>{d.off("start",t),d.off("end",o)}},execute(){let t=this.before,l=e.value.blocks;return{redo(){e.value={...e.value,blocks:l}},undo(){e.value={...e.value,blocks:t}}}}}),o({name:"delete",pushQueue:!0,execute(){let l={before:m()(e.value.blocks),after:t.value.unfocused};return{redo:()=>{0!=t.value.focus.length||0!=t.value.unfocused.length?0!=t.value.focus.length?e.value={...e.value,blocks:l.after}:(0,k.z8)({showClose:!0,message:"还没选中需要删除的内容呢!",type:"warning"}):(0,k.z8)({showClose:!0,message:"没有可以删除的内容了!",type:"warning"})},undo:()=>{e.value={...e.value,blocks:l.before}}}}}),o({name:"deleteAll",pushQueue:!0,execute(){let l={before:m()(e.value.blocks),after:[]};return{redo:()=>{0!=t.value.focus.length||0!=t.value.unfocused.length?e.value={...e.value,blocks:l.after}:(0,k.z8)({showClose:!0,message:"没有可以清空的内容了!",type:"warning"})},undo:()=>{e.value={...e.value,blocks:l.before}}}}}),o({name:"updateContainer",pushQueue:!0,execute(t){let l={before:e.value,after:t};return{redo:()=>{e.value=l.after},undo:()=>{e.value=l.before}}}}),o({name:"updateBlock",pushQueue:!0,execute(t,l){let o={before:e.value.blocks,after:(()=>{let o=[...e.value.blocks];const a=e.value.blocks.indexOf(l);return a>-1&&o.splice(a,1,t),o})()};return{redo:()=>{e.value={...e.value,blocks:o.after},console.log(e.value)},undo:()=>{e.value={...e.value,blocks:o.before},console.log(e.value)}}}});const r=(()=>{const e={90:"z",89:"y"},t=t=>{const{ctrlKey:o,keyCode:a}=t;let r=[];o&&r.push("ctrl"),r.push(e[a]),r=r.join("+"),l.commandArray.forEach((({keyboard:e,name:o})=>{e&&e===r&&(l.commands[o](),t.preventDefault())}))},o=()=>(window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)});return o})();return(()=>{l.destroyArray.push(r()),l.commandArray.forEach((e=>e.init&&l.destroyArray.push(e.init())))})(),(0,a.Ah)((()=>{l.destroyArray.forEach((e=>e&&e()))})),l}var y=l(5298),w=l(3417),x=l(6605);const W=(0,a.aZ)({props:{option:{type:Object}},setup(e,t){const l=(0,i.qj)({option:e.option,isShow:!1});t.expose({showDialog(e){l.option=e,l.isShow=!0}});const o=()=>{l.isShow=!1},r=()=>{l.isShow=!1,l.option.onConfirm&&l.option.onConfirm(l.option.content)};return()=>(0,a.Wm)(y.d0,{modelValue:l.isShow,"onUpdate:modelValue":e=>l.isShow=e,title:l.option.title},{default:()=>(0,a.Wm)(w.EZ,{type:"textarea",modelValue:l.option.content,"onUpdate:modelValue":e=>l.option.content=e,rows:10},null),footer:()=>l.option.footer&&(0,a.Wm)("div",null,[(0,a.Wm)(x.mi,{onClick:o},{default:()=>[(0,a.Uk)("取消")]}),(0,a.Wm)(x.mi,{type:"primary",onClick:r},{default:()=>[(0,a.Uk)("确定")]})])})}});let D;function z(e){if(!D){let t=document.createElement("div");D=(0,a.Wm)(W,{option:e}),document.body.appendChild(((0,o.sY)(D,t),t))}let{showDialog:t}=D.component.exposed;t(e)}var E=l(4143),C=l(236),O=l(1015),j=l(1853),L=l(7188),B=l(5097),U=l(3234),V=l(5078),F=l(8532),S=l(6983);function M(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!(0,a.lA)(e)}var A=(0,a.aZ)({props:{block:{type:Object},data:{type:Object},updateContainer:{type:Function},updateBlock:{type:Function}},setup(e,t){const l=(0,a.f3)("config"),r=(0,i.qj)({editData:{}});let n="";const s=e=>{const t=e.target.files[0]||e.dataTransfer.files[0];let l=window.URL||window.webkitURL;n=l.createObjectURL(t),r.editData.props.filePath=n,console.log(r.editData.props,"地址")},u=()=>{e.block?r.editData=m()(e.block):r.editData=m()(e.data.container)},c=()=>{e.block?(e.updateBlock(r.editData,e.block),d.emit("blocksize",{...r.editData})):e.updateContainer({...e.data,container:r.editData}),console.log(r.editData)},p=(e,t)=>{r.editData.props["picture"]=URL.createObjectURL(t.raw)},v=e=>{const t="image/jpeg"===e.type,l=e.size/1024/1024<2;return t||this.$message.error("上传图片只能是 JPG 格式!"),l||this.$message.error("上传图片大小不能超过 2MB!"),t&&l},b=t=>{var l=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;l.test("https://"+t)?e.block.props.correct=!0:e.block.props.correct=!1},h=t=>{var l=/^\d+(\.\d+)?$/,o=/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;l.test(Number(t))||o.test(Number(t))?e.block.props.correctNum=!0:e.block.props.correctNum=!1};return(0,a.YP)((()=>e.block),u,{immediate:!0}),()=>{let t=[];if(e.block){let n=l.componentMap[e.block.key];n&&n.props&&t.push(Object.entries(n.props).map((([t,l])=>{let n;return(0,a.Wm)(L.nH,{label:l.label},M(n={input:()=>(0,a.Wm)("div",null,[(0,a.Wm)(w.EZ,{style:"width:230px",modelValue:r.editData.props[t],"onUpdate:modelValue":e=>r.editData.props[t]=e,clearable:!0},null)]),inputNum:()=>(0,a.Wm)("div",null,[(0,a.Wm)(w.EZ,{style:"width:230px",modelValue:r.editData.props[t],"onUpdate:modelValue":e=>r.editData.props[t]=e,clearable:!0,onblur:()=>h(r.editData.props[t])},null),(0,a.wy)((0,a.Wm)("div",{class:"showtip"},[(0,a.Uk)("请输入数字")]),[[o.F8,!e.block.props.correctNum&&void 0!=e.block.props.correctNum]])]),color:()=>(0,a.Wm)(U.$,{modelValue:r.editData.props[t],"onUpdate:modelValue":e=>r.editData.props[t]=e},null),select:()=>{let e;return(0,a.Wm)(V.km,{style:"width:400px",modelValue:r.editData.props[t],"onUpdate:modelValue":e=>r.editData.props[t]=e},M(e=l.options.map((e=>(0,a.Wm)(V.BT,{label:e.label,value:e.value},null))))?e:{default:()=>[e]})},link:()=>(0,a.Wm)("div",null,[(0,a.Wm)("div",{id:"prepend"},[(0,a.Wm)("div",null,[(0,a.Uk)("Https://")]),(0,a.Wm)(w.EZ,{modelValue:r.editData.props[t],"onUpdate:modelValue":e=>r.editData.props[t]=e,style:"width:180px",clearable:!0,onblur:()=>b(r.editData.props[t])},null)]),(0,a.wy)((0,a.Wm)("div",{class:"showtip"},[(0,a.Uk)("请输入正确的url地址")]),[[o.F8,!e.block.props.correct&&void 0!=e.block.props.correct]])]),picture:()=>(0,a.Wm)(F.LW,{action:"/dev-api/admin/product/fileUpload","show-file-list":!1,"on-success":p,"before-upload":v,modelValue:r.editData.props[t],"onUpdate:modelValue":e=>r.editData.props[t]=e,limit:1},{default:()=>[(0,a.Wm)("div",{class:"uploader-box"},[(0,a.wy)((0,a.Wm)(S.F8,{src:r.editData.props["picture"],class:"avatar"},null),[[o.F8,r.editData.props["picture"]]]),(0,a.Wm)(x.mi,{type:"success"},{default:()=>[r.editData.props["picture"]?"点击替换":"点击上传"]})])]}),file:()=>(0,a.Wm)("div",null,[(0,a.Wm)("input",{class:"file",type:"file",accept:"video/*",onchange:s},null)])}[l.type]())?n:{default:()=>[n]})}))),n&&n.model&&t.push(Object.entries(n.model).map((([e,t])=>(0,a.Wm)(L.nH,{label:t},{default:()=>[(0,a.Wm)(w.EZ,{modelValue:r.editData.model[e],"onUpdate:modelValue":t=>r.editData.model[e]=t},null)]}))))}else t.push((0,a.Wm)(a.HY,null,[(0,a.Wm)(L.nH,{label:"容器宽度"},{default:()=>[(0,a.Wm)(B.d6,{"controls-position":"right",style:"width:400px",modelValue:r.editData.width,"onUpdate:modelValue":e=>r.editData.width=e},null)]}),(0,a.Wm)(L.nH,{label:"容器高度"},{default:()=>[(0,a.Wm)(B.d6,{"controls-position":"right",style:"width:400px",modelValue:r.editData.height,"onUpdate:modelValue":e=>r.editData.height=e},null)]})]));return(0,a.Wm)(L.ly,{labelPosition:"top",style:"padding:30px"},{default:()=>[t,(0,a.Wm)(L.nH,null,{default:()=>[(0,a.Wm)(x.mi,{type:"primary",onClick:()=>c()},{default:()=>[(0,a.Uk)("应用")]}),(0,a.Wm)(x.mi,{onClick:u},{default:()=>[(0,a.Uk)("重置")]})]})]})}}}),P=l(5114);function H(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!(0,a.lA)(e)}var Y=(0,a.aZ)({props:{block:{type:Object},data:{type:Object},updateContainer:{type:Function},updateBlock:{type:Function}},setup(e,t){console.log(e);const l=(0,a.f3)("config"),o=(0,i.qj)({editData:{}}),r=()=>{e.block&&(o.editData=m()(e.block))},n=()=>{e.block&&e.updateBlock(o.editData,e.block),console.log(o.editData)};return(0,a.YP)((()=>e.block),r,{immediate:!0}),()=>{let t=[];if(e.block){let i=l.componentMap[e.block.key];i&&i.events&&t.push(Object.entries(i.events).map((([e,t])=>(0,a.Wm)("div",{class:"collapsebox"},[(0,a.Wm)(P.PH,null,{default:()=>[(0,a.Wm)(P.aE,{title:t.label},{default:()=>[(0,a.Wm)("div",null,[(0,a.Wm)("div",{class:"dialog-font"},[t.title]),(0,a.Wm)(w.EZ,{type:"textarea",placeholder:t.hint,modelValue:o.editData.events[t.key],"onUpdate:modelValue":e=>o.editData.events[t.key]=e,onblur:()=>checkUrl(o.editData.props[e]),disabled:"输入框"==i.lable||"链接"==i.lable||"音频播放器"==i.lable},null),(0,a.Wm)(L.nH,{style:"padding-top:15px; float: left;"},{default:()=>[(0,a.Wm)(x.mi,{type:"primary",disabled:"输入框"==i.lable||"链接"==i.lable||"音频播放器"==i.lable,onClick:()=>n()},{default:()=>[(0,a.Uk)("添加")]}),(0,a.Wm)(x.mi,{disabled:"输入框"==i.lable||"链接"==i.lable||"音频播放器"==i.lable,onClick:r},{default:()=>[(0,a.Uk)("重置")]})]})])]})]})]))))}return(0,a.Wm)(L.ly,{labelPosition:"top",style:"padding:30px"},H(t)?t:{default:()=>[t]})}}}),T=(0,a.aZ)({props:{modelValue:{type:Object},formData:{type:Object}},components:{editorBlock:p,ElButton:x.mi,ElCard:E.Kf,EditorOperator:A},emits:["update:modelValue"],setup(e,t){console.log(e);const l=(0,i.iH)(!1),r=(0,a.Fl)({get(){return e.modelValue},set(e){t.emit("update:modelValue",m()(e))}}),n=(0,a.Fl)((()=>({width:r.value.container.width+"px",height:r.value.container.height+"px"}))),s=(0,a.f3)("config"),u=(0,i.iH)(null),{dragstart:c,dragend:d}=b(u,r);let{blockMousedown:v,focusData:k,containerMousedown:y,lastSelectBlock:w,clearBlockFocus:x}=h(r,l,(e=>{W(e)})),{mousedown:W,markLine:D}=f(k,w,r);const{commands:E}=g(r,k),L=[{label:"撤销",handler:()=>E.undo()},{label:"还原",handler:()=>E.redo()},{label:"导出",handler:()=>{z({title:"导出json使用",content:JSON.stringify(r.value)})}},{label:"删除选中",handler:()=>E.delete()},{label:"清空画布",handler:()=>E.deleteAll()},{label:"预览",handler:()=>{l.value=!l.value,x()}}],B=[{label:"机器",value:["#061D75","#E2E4E7","#878584"]},{label:"反常",value:["#4C5C40","#727989","#D8AE4B"]},{label:"孤独",value:["#1D3851","#4A6683","#D7941D"]},{label:"母亲",value:["#AB9281","#717588","#C1962E"]},{label:"特立独行",value:["#154599","#918081","#E5CAB9"]},{label:"存活",value:["#925235","#BCBAB0","#D8AE4B"]},{label:"作者",value:["#58666B","#5E7B8E","#B74325"]},{label:"可燃",value:["#7B7066","#617995","#B15B17"]},{label:"无题",value:["#A69D9C","#5D6E7F","#D8AE48"]},{label:"反重力",value:["#4B5365","#7C6866","#CD8921"]},{label:"素衣化缁",value:["#111","#636363","#858586"]},{label:"白蔷薇",value:["#151E17","#CAE0E5","#656E59"]},{label:"绿水青山",value:["#2E3A35","#948947","#244140"]},{label:"日暮",value:["#3A454B","#FF5100","#AC6D46"]},{label:"彤云密布",value:["#FEEDE3","#EDCBB8","#025E7D"]},{label:"仙鹤",value:["#FEFCFC","#C77C83","#252D27"]}],U=function(){let e=document.getElementById("sel"),t=e.selectedOptions[0]._value;console.dir(e.selectedOptions[0]._value);const l=document.querySelector(":root");l.style.setProperty("--darkColor",t[0]),l.style.setProperty("--lightColor",t[1]),l.style.setProperty("--midColor",t[2])};return()=>(0,a.Wm)("div",{class:"editor"},[(0,a.Wm)("div",{class:"editor-left"},[s.componentList.map((e=>(0,a.Wm)("div",{class:"editor-left-item",draggable:!0,onDragstart:t=>c(t,e),onDragend:d},[(0,a.Wm)("span",null,[e.lable]),(0,a.Wm)("div",null,[e.preview()])])))]),(0,a.Wm)(C.Q0,{class:"box-item",effect:"dark",content:"ctrl+y 还原/  ctrl+z 撤销/  shift+左键 多选",placement:"left"},{default:()=>[(0,a.Wm)(O.gn,{size:30,class:"editor-icon"},{default:()=>[(0,a.Wm)((0,a.up)("InfoFilled"),null,null)]})]}),(0,a.Wm)("div",{class:"editor-top"},[L.map(((e,t)=>{const l="function"==typeof e.label?e.label():e.label;return(0,a.Wm)((0,a.up)("el-button"),{plain:!0,class:"editor-top-button",onClick:e.handler},{default:()=>[(0,a.Wm)("span",null,[l])]})})),(0,a.Wm)("div",{class:"changeColor-select"},[(0,a.Wm)("span",null,[(0,a.Uk)("主题色：")]),(0,a.Wm)("select",{id:"sel",onChange:U},[B.map(((e,t)=>(0,a.Wm)("option",{key:t,value:e.value},[e.label])))])])]),(0,a.Wm)("div",{class:"editor-right"},[(0,a.Wm)("div",{class:"editor-right-title"},[(0,a.wy)((0,a.Wm)(j.Ub,{type:"border-card",stretch:!0},{default:()=>[(0,a.Wm)(j.p8,{label:"画布属性",class:"editor-right-title-box"},{default:()=>[(0,a.Wm)(A,{block:w.value,data:r.value,updateContainer:E.updateContainer,updateBlock:E.updateBlock,style:"padding:0px;"},null)]})]}),[[o.F8,void 0==w.value]]),(0,a.wy)((0,a.Wm)(j.Ub,{type:"border-card",stretch:!0},{default:()=>[(0,a.Wm)(j.p8,{label:"属性",class:"editor-right-title-box"},{default:()=>[(0,a.Wm)(A,{block:w.value,data:r.value,updateContainer:E.updateContainer,updateBlock:E.updateBlock,style:"padding:0px;"},null)]}),(0,a.Wm)(j.p8,{label:"事件",class:"editor-right-title-box"},{default:()=>[(0,a.Wm)(Y,{block:w.value,data:r.value,updateBlock:E.updateBlock,style:"padding:0px;"},null)]})]}),[[o.F8,void 0!=w.value]])])]),(0,a.Wm)("div",{class:"editor-container"},[(0,a.Wm)("div",{class:"editor-container-canvas"},[(0,a.Wm)("div",{class:"editor-container-canvas_content",style:n.value,ref:u,onMousedown:y},[r.value.blocks.map(((t,o)=>(0,a.Wm)(p,{class:[t.focus?"editor-block-focus":"",l.value?"editor-block-preview":""],block:t,onMousedown:e=>v(e,t,o),formData:e.formData},null))),null!==D.x&&(0,a.Wm)("div",{class:"line-x",style:{left:D.x+"px"}},null),null!==D.y&&(0,a.Wm)("div",{class:"line-y",style:{top:D.y+"px"}},null)])])]),(0,a.Wm)("div",{class:l.value?"bg":"editor-block-preview-bg"},[(0,a.Wm)("div",{class:"canvas-container"},[L.map(((e,t)=>(0,a.Wm)((0,a.up)("el-button"),{class:"close",type:"danger",round:!0,onClick:e.handler},{default:()=>[(0,a.Uk)("关闭")]}))),(0,a.Wm)("div",{class:"canvas",style:n.value,onMousedown:y},[r.value.blocks.map(((t,o)=>(0,a.Wm)(p,{class:[t.focus?"editor-block-focus":"",l.value?"editor-block-preview":""],onMousedown:e=>v(e,t,o),block:t,formData:e.formData},null)))])])])])}}),Z=l(5065);const _=l(5917);function q(){const e=[],t={};return{componentList:e,componentMap:t,register:l=>{e.push(l),t[l.key]=l}}}const N={redirect(e){e&&window.open("https://"+e,"_blank")},alert(e){e&&alert(e)}},X=[{key:"redirect",label:"url事件",title:"url地址",hint:"请输入完整url地址",event:N.redirect},{key:"alert",label:"alert 事件",title:"弹窗内容",hint:"请输入内容",event:N.alert}];let $=q();const Q=e=>({type:"input",label:e}),R=e=>({type:"inputNum",label:e}),I=e=>({type:"color",label:e}),J=(e,t)=>({type:"select",label:e,options:t}),K=e=>({type:"link",label:e}),G=e=>({type:"picture",label:e}),ee=e=>({type:"file",accept:"video/*",label:e});$.register({lable:"文本",preview:()=>"预览文本",render({props:e,events:t}){return void 0!=t.redirect&&void 0!=t.alert||void 0!=t.redirect&&void 0==t.alert||void 0==t.redirect&&void 0!=t.alert?(0,a.Wm)("span",{style:{color:e.color,fontSize:e.size+"px"},onClick:()=>this.handleClick(t.alert,t.redirect)},[e.text||"文本"]):(0,a.Wm)("span",{style:{color:e.color,fontSize:e.size+"px"}},[e.text||"文本"])},key:"text",props:{text:Q("文本内容"),color:I("字体颜色"),size:R("字体大小/px")},events:{...X},handleClick(e,t){Object.keys(N).forEach((l=>{"alert"==l&&N["alert"](e),"redirect"==l&&N["redirect"](t)}))}}),$.register({lable:"按钮",preview:()=>(0,a.Wm)(x.mi,null,{default:()=>[(0,a.Uk)("预览按钮")]}),resize:{width:!0,height:!0},render({props:e,events:t,size:l}){return void 0!=t.redirect&&void 0!=t.alert||void 0!=t.redirect&&void 0==t.alert||void 0==t.redirect&&void 0!=t.alert?(0,a.Wm)(x.mi,{style:{height:l.height+"px",width:l.width+"px",fontSize:e.fontsize+"px"},type:e.type,onClick:()=>this.handleClick(t.alert,t.redirect),size:e.size},{default:()=>[e.text||"按钮"]}):(0,a.Wm)(x.mi,{style:{height:l.height+"px",width:l.width+"px",fontSize:e.fontsize+"px"},type:e.type,size:e.size},{default:()=>[e.text||"按钮"]})},key:"button",props:{text:Q("按钮内容"),fontsize:R("字体大小/px"),type:J("按钮类型",[{label:"基础",value:"primary"},{label:"成功",value:"success"},{label:"警告",value:"warning"},{label:"危险",value:"danger"},{label:"文本",value:"text"}]),size:J("按钮尺寸",[{label:"默认",value:"default"},{label:"大",value:"large"},{label:"小",value:"small"}])},events:{...X},handleClick(e,t){Object.keys(N).forEach((l=>{"alert"==l&&N["alert"](e),"redirect"==l&&N["redirect"](t)}))}}),$.register({lable:"输入框",resize:{width:!0},preview:()=>(0,a.Wm)(w.EZ,{placeholder:"预览输入框"},null),render:({model:e,props:t,size:l})=>(0,a.Wm)(w.EZ,(0,a.dG)({placeholder:null==t.text?"请输入内容":t.text},e.default,{style:{width:l.width+"px"}}),null),key:"input",model:{default:"绑定字段"},props:{text:Q("提示信息")},events:{...X},handleClick(e,t){Object.keys(N).forEach((l=>{"alert"==l&&N["alert"](e),"redirect"==l&&N["redirect"](t)}))}}),$.register({lable:"链接",preview:()=>(0,a.Wm)(Z.E2,null,{default:()=>[(0,a.Uk)("预览链接")]}),render:({props:e})=>(0,a.Wm)(Z.E2,{type:e.type,underline:e.underline,disabled:e.disabled,href:"https:"+e.link,target:"_blank",style:{fontSize:e.fontSize+"px"}},{default:()=>[e.text||"链接"]}),key:"link",props:{text:Q("链接名字"),link:K("链接地址"),fontSize:R("字体大小/px"),type:J("链接类型",[{label:"默认",value:"default"},{label:"基础",value:"primary"},{label:"成功",value:"success"},{label:"警告",value:"warning"},{label:"危险",value:"danger"},{label:"文本",value:"info"}]),underline:J("是否下划线",[{label:"是",value:!0},{label:"否",value:!1}]),disabled:J("是否禁用",[{label:"是",value:!0},{label:"否",value:!1}])},events:{...X},handleClick(e,t){Object.keys(N).forEach((l=>{"alert"==l&&N["alert"](e),"redirect"==l&&N["redirect"](t)}))}}),$.register({lable:"图片",resize:{width:!0,height:!0},preview:()=>(0,a.Wm)(O.gn,{size:30},{default:()=>[(0,a.Uk)(" "),(0,a.Wm)((0,a.up)("PictureFilled"),null,null)]}),render({props:e,events:t,size:l}){return void 0!=t.redirect&&void 0!=t.alert||void 0!=t.redirect&&void 0==t.alert||void 0==t.redirect&&void 0!=t.alert?(0,a.Wm)("img",{src:e.picture?e.picture:_,class:"avatar",onClick:()=>this.handleClick(t.alert,t.redirect),style:{width:void 0==l.width?e.width:l.width+"px",height:void 0==l.height?e.height:l.height+"px"}},null):(0,a.Wm)("img",{src:e.picture?e.picture:_,class:"avatar",style:{width:void 0==l.width?e.width:l.width+"px",height:void 0==l.height?e.height:l.height+"px"}},null)},key:"picture",props:{height:J("图片高度",[{label:"50px",value:"50px"},{label:"100px",value:"100px"},{label:"150px",value:"150px"},{label:"200px",value:"200px"},{label:"250px",value:"250px"}]),width:J("图片宽度",[{label:"50px",value:"50px"},{label:"100px",value:"100px"},{label:"150px",value:"150px"},{label:"200px",value:"200px"},{label:"250px",value:"250px"}]),picture:G("图片导入")},events:{...X},handleClick(e,t){Object.keys(N).forEach((l=>{"alert"==l&&N["alert"](e),"redirect"==l&&N["redirect"](t)}))}}),$.register({lable:"音频播放器",resize:{width:!0,height:!0},preview:()=>(0,a.Wm)(O.gn,{size:30},{default:()=>[(0,a.Wm)((0,a.up)("VideoCameraFilled"),null,null)]}),render:({props:e,size:t})=>(0,a.Wm)("video",{video:!0,controls:!0,src:e.filePath,style:{width:void 0==t.width?e.width:t.width+"px",height:void 0==t.height?e.height:t.height+"px"}},[e.filePath||"视频渲染"]),key:"video",props:{height:J("视频高度",[{label:"50px",value:"50px"},{label:"100px",value:"100px"},{label:"150px",value:"150px"},{label:"200px",value:"200px"},{label:"250px",value:"250px"}]),width:J("视频宽度",[{label:"50px",value:"50px"},{label:"100px",value:"100px"},{label:"150px",value:"150px"},{label:"200px",value:"200px"},{label:"250px",value:"250px"}]),filePath:ee("视频导入")},events:{...X},handleClick(e,t){Object.keys(N).forEach((l=>{"alert"==l&&N["alert"](e),"redirect"==l&&N["redirect"](t)}))}});var te={components:{Editor:T},setup(){const e=(0,i.iH)(s);(0,a.JJ)("config",$);const t=(0,i.iH)({username:"hahaha",password:123456});return{state:e,formData:t}}},le=l(89);const oe=(0,le.Z)(te,[["render",n]]);var ae=oe,re=l(2748);const ne=(0,o.ri)(ae);for(const[ie,se]of Object.entries(re))ne.component(ie,se);ne.mount("#app")},5917:function(e,t,l){e.exports=l.p+"img/bg.64629ad5.jpg"}},t={};function l(o){var a=t[o];if(void 0!==a)return a.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,l),r.exports}l.m=e,function(){var e=[];l.O=function(t,o,a,r){if(!o){var n=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],r=e[c][2];for(var i=!0,s=0;s<o.length;s++)(!1&r||n>=r)&&Object.keys(l.O).every((function(e){return l.O[e](o[s])}))?o.splice(s--,1):(i=!1,r<n&&(n=r));if(i){e.splice(c--,1);var u=a();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,a,r]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var o in t)l.o(t,o)&&!l.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){l.p=""}(),function(){var e={143:0};l.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,n=o[0],i=o[1],s=o[2],u=0;if(n.some((function(t){return 0!==e[t]}))){for(a in i)l.o(i,a)&&(l.m[a]=i[a]);if(s)var c=s(l)}for(t&&t(o);u<n.length;u++)r=n[u],l.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return l.O(c)},o=self["webpackChunklow_code"]=self["webpackChunklow_code"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=l.O(void 0,[998],(function(){return l(2667)}));o=l.O(o)})();
//# sourceMappingURL=app.6b793210.js.map