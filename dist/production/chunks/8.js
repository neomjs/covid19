self.webpackChunk([8,5],{19:function(e,t,o){"use strict";o.d(t,"a",(function(){return l}));var r=o(0),a=o(18);class n extends a.a{static getConfig(){return{className:"Neo.draggable.DragProxyComponent",ntype:"dragproxy",autoMount:!0,autoRender:!0,cls:["neo-dragproxy"],moveInMainThread:!0}}constructor(e){super(e);this.on("mounted",this.onMounted,this)}onMounted(e){this.moveInMainThread&&Neo.main.addon.DragDrop.setDragProxyElement({id:e})}}Neo.applyClassConfig(n);var d=o(3),s=o(8);class l extends r.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.draggable.DragZone",ntype:"dragzone",addDragProxyCls:!0,alwaysFireDragMove:!1,appName:null,boundaryContainerId:null,data:null,dragElement:null,dragElementRect:null,dragProxy:null,dragProxyConfig_:null,dragProxyCls:"neo-dragproxy",dropZoneIdentifier:null,moveHorizontal:!0,moveInMainThread:!0,moveVertical:!0,offsetX:0,offsetY:0,owner:null,proxyParentId_:"document.body",scrollContainerId:null,scrollFactorLeft:1,scrollFactorTop:1,useProxyWrapper:!0}}constructor(e){super(e),Neo.main.addon.DragDrop||console.error("You can not use Neo.draggable.DragZone without adding Neo.main.addon.DragDrop to the main thread addons",this.id)}beforeGetDragProxyConfig(e){return Neo.clone(e,!0,!0)}createDragProxy(e){let t=this,o=Neo.getComponent(t.getDragElementRoot().id)||t.owner,r=s.a.clone(t.dragElement);const a={module:n,appName:t.appName,moveInMainThread:t.moveInMainThread,parentId:t.proxyParentId,vdom:t.useProxyWrapper?{cn:[r]}:r,style:{height:e.height+"px",left:(t.moveHorizontal?e.left:0)+"px",top:(t.moveVertical?e.top:0)+"px",width:e.width+"px"},...t.dragProxyConfig||{}};a.cls=a.cls||[],o&&a.cls.push(o.getTheme()),t.useProxyWrapper||a.cls.push(...r.cls),t.addDragProxyCls&&a.cls&&d.a.add(a.cls,t.dragProxyCls),t.dragProxy=Neo.create(a)}destroyDragProxy(){let e=this.dragProxy.id;setTimeout(()=>{Neo.currentWorker.promiseMessage("main",{action:"updateDom",deltas:[{action:"removeNode",id:e}]})},this.moveInMainThread?0:30),this.dragProxy.destroy()}dragEnd(){let e=this,t=e.owner,o=t.cls;d.a.remove(o,"neo-is-dragging"),t.cls=o,e.dragProxy&&(e.destroyDragProxy(),e.dragProxy=null),Object.assign(e,{dragElementRect:null,offsetX:0,offsetY:0,scrollContainerId:null}),e.resetData()}dragMove(e){let t,o=this;!o.moveInMainThread&&o.dragProxy&&(t=o.dragProxy.style,o.moveHorizontal&&(t.left=e.clientX-o.offsetX+"px"),o.moveVertical&&(t.top=e.clientY-o.offsetY+"px"),o.dragProxy.style=t)}dragStart(e){let t=this,o=t.owner,r=o.cls;t.setData(),d.a.add(r,"neo-is-dragging"),o.cls=r,Neo.main.addon.DragDrop.setConfigs(t.getMainThreadConfigs()),Neo.main.DomAccess.getBoundingClientRect({id:t.getDragElementRoot().id}).then(o=>{Object.assign(t,{dragElementRect:o,offsetX:e.clientX-o.left,offsetY:e.clientY-o.top}),t.createDragProxy(o)})}getDragElementRoot(){return this.dragElement}getMainThreadConfigs(){let e=this;return{alwaysFireDragMove:e.alwaysFireDragMove,boundaryContainerId:e.boundaryContainerId,dragProxyCls:e.dragProxyCls,dragZoneId:e.id,dropZoneIdentifier:e.dropZoneIdentifier,scrollContainerId:e.scrollContainerId,scrollFactorLeft:e.scrollFactorLeft,scrollFactorTop:e.scrollFactorTop}}onDrop(e){this.fire("drop",e)}onDropEnter(e){this.fire("drop:enter",e)}onDropLeave(e){this.fire("drop:leave",e)}resetData(){setTimeout(()=>{this.data=null},30)}setData(e={}){this.data={dragElement:this.getDragElementRoot(),dragZoneId:this.id,...e}}}Neo.applyClassConfig(l)},26:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return d}));var r=o(19),a=o(3),n=o(8);class d extends r.a{static getConfig(){return{className:"Neo.draggable.list.DragZone",ntype:"list-dragzone",dragProxyConfig:{cls:["neo-list"]}}}constructor(e){super(e);let t=this,o=t.owner,r=o.domListeners,a={delegate:".neo-draggable",scope:t},n=o.store;r.push({"drag:end":t.onDragEnd,...a},{"drag:start":t.onDragStart,...a}),o.domListeners=r,n.on({load:t.onStoreLoad,scope:t}),n.getCount()>0&&t.onStoreLoad()}adjustListItemCls(e){let t,o=this,r=o.owner,n=r.store,d=r.vdom;n.items.forEach((r,n)=>{t=o.getItemVdom(r,n),t&&(t.cls=t.cls||[],a.a[e?"add":"remove"](t.cls,"neo-draggable"))}),r.vdom=d}getItemVdom(e,t){return this.owner.vdom.cn[t]}onDragEnd(e){if(this.owner.draggable){let e=this,t=e.dragProxy,o=t.cls||{},r=e.dragElementRect,n=t.wrapperStyle||{};a.a.add(o,"neo-animate"),t.cls=o,setTimeout(()=>{n.left=r.left+"px",n.top=r.top+"px",t.wrapperStyle=n,setTimeout(()=>{e.dragEnd()},300)},30)}}onDragStart(e){let t=this;t.owner.draggable&&(t.dragElement=n.a.findVdomChild(t.owner.vdom,e.path[0].id).vdom,t.dragStart(e))}onStoreLoad(){this.adjustListItemCls(!0)}setData(e={}){let t=this.owner,o=t.getItemRecordId(this.getDragElementRoot().id);e.record=t.store.get(o),super.setData(e)}}Neo.applyClassConfig(d)},28:function(e,t,o){"use strict";o.r(t),o.d(t,"default",(function(){return d}));var r=o(26),a=o(3),n=o(8);class d extends r.default{static getConfig(){return{className:"Neo.draggable.tree.DragZone",ntype:"tree-dragzone",dragProxyConfig:{cls:["neo-tree-list"]},leafNodesOnly_:!1}}afterSetLeafNodesOnly(e,t){if(void 0!==t){let t,o=this.owner,r=o.store,n=o.vdom;r.items.forEach(r=>{r.isLeaf||(t=o.getVdomChild(o.getItemId(r.id),o.vdom),t.cls=t.cls||[],a.a[e?"remove":"add"](t.cls,"neo-draggable"))}),o.vdom=n}}getDragElementRoot(){return this.dragElement.cn[0]}getItemVdom(e,t){let o=this.owner;return!this.leafNodesOnly||e.isLeaf?o.getVdomChild(o.getItemId(e.id),o.vdom):null}onDragStart(e){let t=this;t.owner.draggable&&(t.dragElement={tag:"ul",cls:["neo-list-container","neo-list"],cn:[n.a.findVdomChild(t.owner.vdom,e.path[0].id).vdom]},t.dragStart(e))}}Neo.applyClassConfig(d)}});