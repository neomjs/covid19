(self.webpackChunkcovid19_gallery=self.webpackChunkcovid19_gallery||[]).push([[387,488,861],{110:(e,t,o)=>{"use strict";o.d(t,{Z:()=>s});var r=o(643),a=o(249);class n extends a.Z{static getConfig(){return{className:"Neo.draggable.DragProxyComponent",ntype:"dragproxy",autoMount:!0,autoRender:!0,cls:["neo-dragproxy"],moveInMainThread:!0}}constructor(e){super(e);let t=this;t.on("mounted",t.onMounted,t)}onMounted(e){this.moveInMainThread&&Neo.main.addon.DragDrop.setDragProxyElement({id:e})}}Neo.applyClassConfig(n);var d=o(926),l=o(939);class s extends r.Z{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.draggable.DragZone",ntype:"dragzone",addDragProxyCls:!0,alwaysFireDragMove:!1,appName:null,boundaryContainerId:null,data:null,dragElement:null,dragElementRect:null,dragProxy:null,dragProxyConfig_:null,dragProxyCls:"neo-dragproxy",dropZoneIdentifier:null,moveHorizontal:!0,moveInMainThread:!0,moveVertical:!0,offsetX:0,offsetY:0,owner:null,proxyParentId_:"document.body",scrollContainerId:null,scrollFactorLeft:1,scrollFactorTop:1,useProxyWrapper:!0}}constructor(e){super(e),Neo.main.addon.DragDrop||console.error("You can not use Neo.draggable.DragZone without adding Neo.main.addon.DragDrop to the main thread addons",this.id)}beforeGetDragProxyConfig(e){return Neo.clone(e,!0,!0)}createDragProxy(e){let t=this,o=Neo.getComponent(t.getDragElementRoot().id)||t.owner,r=l.Z.clone(t.dragElement),a=t.dragElementRect;const s={module:n,appName:t.appName,moveInMainThread:t.moveInMainThread,parentId:t.proxyParentId,vdom:t.useProxyWrapper?{cn:[r]}:r,style:{height:`${e.height}px`,left:`${t.moveHorizontal?e.x:a.x}px`,top:`${t.moveVertical?e.y:a.y}px`,width:`${e.width}px`},...t.dragProxyConfig||{}};s.cls=s.cls||[],o&&s.cls.push(o.getTheme()),t.useProxyWrapper||s.cls.push(...r.cls),t.addDragProxyCls&&s.cls&&d.Z.add(s.cls,t.dragProxyCls),t.dragProxy=Neo.create(s)}destroyDragProxy(){let e=this,t=e.dragProxy.id;setTimeout((()=>{Neo.currentWorker.promiseMessage("main",{action:"updateDom",deltas:[{action:"removeNode",id:t}]})}),e.moveInMainThread?0:30),e.dragProxy.destroy()}dragEnd(){let e=this,t=e.owner,o=t.cls;d.Z.remove(o,"neo-is-dragging"),t.cls=o,e.dragProxy&&(e.destroyDragProxy(),e.dragProxy=null),Object.assign(e,{dragElementRect:null,offsetX:0,offsetY:0,scrollContainerId:null}),e.resetData()}dragMove(e){let t,o=this;!o.moveInMainThread&&o.dragProxy&&(t=o.dragProxy.style,o.moveHorizontal&&(t.left=e.clientX-o.offsetX+"px"),o.moveVertical&&(t.top=e.clientY-o.offsetY+"px"),o.dragProxy.style=t)}dragStart(e){let t=this,o=t.owner,r=o.cls;t.setData(),d.Z.add(r,"neo-is-dragging"),o.cls=r,Neo.main.addon.DragDrop.setConfigs(t.getMainThreadConfigs()),Neo.main.DomAccess.getBoundingClientRect({id:t.getDragElementRoot().id}).then((o=>{Object.assign(t,{dragElementRect:o,offsetX:e.clientX-o.left,offsetY:e.clientY-o.top}),t.createDragProxy(o)}))}getDragElementRoot(){return this.dragElement}getMainThreadConfigs(){let e=this;return{alwaysFireDragMove:e.alwaysFireDragMove,boundaryContainerId:e.boundaryContainerId,dragElementRootId:e.getDragElementRoot().id,dragProxyCls:e.dragProxyCls,dragZoneId:e.id,dropZoneIdentifier:e.dropZoneIdentifier,moveHorizontal:e.moveHorizontal,moveVertical:e.moveVertical,scrollContainerId:e.scrollContainerId,scrollFactorLeft:e.scrollFactorLeft,scrollFactorTop:e.scrollFactorTop}}onDrop(e){this.fire("drop",e)}onDropEnter(e){this.fire("drop:enter",e)}onDropLeave(e){this.fire("drop:leave",e)}resetData(){setTimeout((()=>{this.data=null}),30)}setData(e={}){let t=this;t.data={dragElement:t.getDragElementRoot(),dragZoneId:t.id,...e}}}Neo.applyClassConfig(s)},804:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>d});var r=o(110),a=o(926),n=o(939);class d extends r.Z{static getConfig(){return{className:"Neo.draggable.list.DragZone",ntype:"list-dragzone",dragProxyConfig:{cls:["neo-list"]}}}constructor(e){super(e);let t=this,o=t.owner,r=o.domListeners,a={delegate:".neo-draggable",scope:t},n=o.store;r.push({"drag:end":t.onDragEnd,...a},{"drag:start":t.onDragStart,...a}),o.domListeners=r,n.on({load:t.onStoreLoad,scope:t}),n.getCount()>0&&t.onStoreLoad()}adjustListItemCls(e){let t,o=this,r=o.owner,n=r.store,d=r.vdom;n.items.forEach(((r,n)=>{t=o.getItemVdom(r,n),t&&(t.cls=t.cls||[],a.Z[e?"add":"remove"](t.cls,"neo-draggable"))})),r.vdom=d}getItemVdom(e,t){return this.owner.vdom.cn[t]}onDragEnd(e){if(this.owner.draggable){let e=this,t=e.dragProxy,o=t.cls||{},r=e.dragElementRect,n=t.wrapperStyle||{};a.Z.add(o,"neo-animate"),t.cls=o,setTimeout((()=>{n.left=`${r.left}px`,n.top=`${r.top}px`,t.wrapperStyle=n,setTimeout((()=>{e.dragEnd()}),300)}),30)}}onDragStart(e){let t=this;t.owner.draggable&&(t.dragElement=n.Z.findVdomChild(t.owner.vdom,e.path[0].id).vdom,t.dragStart(e))}onStoreLoad(){this.adjustListItemCls(!0)}setData(e={}){let t=this.owner,o=t.getItemRecordId(this.getDragElementRoot().id);e.record=t.store.get(o),super.setData(e)}}Neo.applyClassConfig(d)},124:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>d});var r=o(804),a=o(926),n=o(939);class d extends r.default{static getConfig(){return{className:"Neo.draggable.tree.DragZone",ntype:"tree-dragzone",dragProxyConfig:{cls:["neo-tree-list"]},leafNodesOnly_:!1}}afterSetLeafNodesOnly(e,t){if(void 0!==t){let t,o=this.owner,r=o.store,n=o.vdom;r.items.forEach((r=>{r.isLeaf||(t=o.getVdomChild(o.getItemId(r.id),o.vdom),t.cls=t.cls||[],a.Z[e?"remove":"add"](t.cls,"neo-draggable"))})),o.vdom=n}}getDragElementRoot(){return this.dragElement.cn[0]}getItemVdom(e,t){let o=this.owner;return!this.leafNodesOnly||e.isLeaf?o.getVdomChild(o.getItemId(e.id),o.vdom):null}onDragStart(e){let t=this;t.owner.draggable&&(t.dragElement={tag:"ul",cls:["neo-list-container","neo-list"],cn:[n.Z.findVdomChild(t.owner.vdom,e.path[0].id).vdom]},t.dragStart(e))}}Neo.applyClassConfig(d)},860:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>a});var r=o(124);class a extends r.default{static getConfig(){return{className:"Neo.draggable.tree.SortZone",ntype:"tree-sortzone"}}}Neo.applyClassConfig(a)}}]);