(self.webpackChunkcovid19_gallery=self.webpackChunkcovid19_gallery||[]).push([[9],{751:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});var o=n(643),l=n(627),r=n(799);class a extends o.Z{static getConfig(){return{className:"Neo.main.addon.DragDrop",alwaysFireDragMove:!1,boundaryContainerRect:null,clientX:0,clientY:0,dragElementRootId:null,dragProxyCls:"neo-dragproxy",dragProxyElement:null,dragProxyRect:null,dragZoneId:null,dropZoneIdentifier:null,initialScrollLeft:0,initialScrollTop:0,moveHorizontal:!0,moveVertical:!0,offsetX:0,offsetY:0,remote:{app:["setConfigs","setDragProxyElement"]},scrollContainerElement:null,scrollContainerRect:null,scrollFactorLeft:1,scrollFactorTop:1,singleton:!0}}constructor(e){super(e);let t=this,o=[];r.Z.on({mouseEnter:t.onMouseEnter,mouseLeave:t.onMouseLeave,scope:t}),t.addGlobalEventListeners(),Neo.config.hasTouchEvents?o.push(n.e(636).then(n.bind(n,147))):o.push(n.e(294).then(n.bind(n,970))),Promise.all(o).then((e=>{Neo.create({module:e[0].default})}))}addGlobalEventListeners(){let e=this;document.addEventListener("drag:end",e.onDragEnd.bind(e),!0),document.addEventListener("drag:move",e.onDragMove.bind(e),!0),document.addEventListener("drag:start",e.onDragStart.bind(e),!0)}getEventData(e){const t=e.path||e.composedPath(),n={...r.Z.getEventData(e.detail.originalEvent),clientX:e.detail.clientX,clientY:e.detail.clientY};return e.detail.eventPath?n.targetPath=e.detail.eventPath.map((e=>r.Z.getTargetData(e))):n.targetPath=n.path||n.composedPath(),n.path=t.map((e=>r.Z.getTargetData(e))),n}onDragEnd(e){let t=this,n=t.getEventData(e),o=t.pathIncludesDropZone(n.targetPath);l.Z.setBodyCls({remove:["neo-unselectable"]}),r.Z.sendMessageToApp({...n,isDrop:o,type:"drag:end"}),o&&r.Z.sendMessageToApp({...r.Z.getMouseEventData(e.detail.originalEvent),dragZoneId:t.dragZoneId,type:"drop"}),Object.assign(t,{alwaysFireDragMove:!1,boundaryContainerRect:null,dragElementRootId:null,dragElementRootRect:null,dragProxyCls:"neo-dragproxy",dragProxyElement:null,dragZoneId:null,dropZoneIdentifier:null,initialScrollLeft:0,initialScrollTop:0,moveHorizontal:!0,moveVertical:!0,scrollContainerElement:null,scrollContainerRect:null,setScrollFactorLeft:1,scrollFactorTop:1})}onDragMove(e){let t,n,o,l=this,a=l.dragProxyRect,i=l.boundaryContainerRect;l.scrollContainerElement&&(t=l.scrollContainer({clientX:e.detail.clientX,clientY:e.detail.clientY}),e.detail.clientX=t.clientX,e.detail.clientY=t.clientY),l.dragProxyElement&&(n=e.detail.clientX-l.offsetX,o=e.detail.clientY-l.offsetY,i&&(n<i.left?n=i.left:n>i.right-a.width&&(n=i.right-a.width),o<i.top?o=i.top:o>i.bottom-a.height&&(o=i.bottom-a.height)),l.moveHorizontal||(n=l.dragProxyRect.x),l.dragProxyElement.style.left=`${n}px`,l.moveVertical||(o=l.dragProxyRect.y),l.dragProxyElement.style.top=`${o}px`),l.dragProxyElement&&!l.alwaysFireDragMove||r.Z.sendMessageToApp({...l.getEventData(e),type:"drag:move"})}onDragStart(e){let t=e.target.getBoundingClientRect();l.Z.setBodyCls({add:["neo-unselectable"]}),Object.assign(this,{dragProxyRect:t,offsetX:e.detail.clientX-t.left,offsetY:e.detail.clientY-t.top}),r.Z.sendMessageToApp({...this.getEventData(e),type:"drag:start"})}onMouseEnter(e){this.pathIncludesDropZone(e.path)&&r.Z.sendMessageToApp({...e,dragZoneId:this.dragZoneId,type:"drop:enter"})}onMouseLeave(e){this.pathIncludesDropZone(e.path)&&r.Z.sendMessageToApp({...e,dragZoneId:this.dragZoneId,type:"drop:leave"})}pathIncludesDropZone(e){let t,n,o=!0,l=this.dropZoneIdentifier;if(l){t=l.cls,n=l.ids;for(const l of e){if(t){o=!1;for(const e of l.cls)if(t.includes(e)){o=!0;break}}if(o&&n&&!n.includes(l.id)&&(o=!1),o)return!0}}return!1}scrollContainer(e){let t=this,n=e.clientX-t.clientX,o=e.clientY-t.clientY,l=t.scrollContainerElement,r=250,a=t.scrollContainerRect;return t.clientX=e.clientX,t.clientY=e.clientY,(n<0&&e.clientX<a.left+r||n>0&&e.clientX>a.right-r)&&(l.scrollLeft+=n*t.scrollFactorLeft),(o<0&&e.clientY<a.top+r||o>0&&e.clientY>a.bottom-r)&&(l.scrollTop+=o*t.scrollFactorTop),{clientX:t.clientX+l.scrollLeft-t.initialScrollLeft,clientY:t.clientY+l.scrollTop-t.initialScrollTop}}setConfigs(e){let t,n=this;e.boundaryContainerId&&(t=l.Z.getElementOrBody(e.boundaryContainerId),n.boundaryContainerRect=t.getBoundingClientRect()),delete e.boundaryContainerId,e.scrollContainerId&&(t=l.Z.getElementOrBody(e.scrollContainerId),Object.assign(n,{scrollContainerElement:t,scrollContainerRect:t.getBoundingClientRect(),initialScrollLeft:t.scrollLeft,initialScrollTop:t.scrollTop})),delete e.scrollContainerId,Object.entries(e).forEach((([e,t])=>{n.hasOwnProperty(e)?n[e]=t:console.error("unknown key passed inside setConfigs()",e)}))}setDragProxyElement(e){this.dragProxyElement=document.getElementById(e.id)}}Neo.applyClassConfig(a);let i=Neo.create(a);Neo.applyToGlobalNs(i);const s=i}}]);