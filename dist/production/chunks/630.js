(self.webpackChunkcovid19_gallery=self.webpackChunkcovid19_gallery||[]).push([[630],{192:(e,t,o)=>{"use strict";o.d(t,{Z:()=>c});var n=o(300),s=o(971),i=o(249),r=o(982),a=o(926);class l extends r.Z{static getConfig(){return{className:"Neo.selection.GalleryModel",ntype:"selection-gallerymodel",stayInRow:!1}}addDomListener(){}onContainerClick(){let e=this,t=e.view,o=[...e.items],n=[];e.items.forEach((e=>{n.push({id:t.getItemVnodeId(e),cls:{add:[],remove:["neo-selected"]}})})),e.items.splice(0,e.items.length),Neo.currentWorker.promiseMessage("main",{action:"updateDom",appName:t.appName,deltas:n}).then((()=>{e.fire("selectionChange",e.items,o)}))}onItemClick(e){let t,o=0,n=e.path.length,s=this.view;for(;o<n;o++)if(e.path[o].cls.includes("neo-gallery-item")){t=s.getItemId(e.path[o].id),this.select(t),s.fire("select",{record:s.store.get(t)});break}}onKeyDownDown(e){this[this.view.orderByRow?"onNavKeyRow":"onNavKeyColumn"](1)}onKeyDownLeft(e){this[this.view.orderByRow?"onNavKeyColumn":"onNavKeyRow"](-1)}onKeyDownRight(e){this[this.view.orderByRow?"onNavKeyColumn":"onNavKeyRow"](1)}onKeyDownUp(e){this[this.view.orderByRow?"onNavKeyRow":"onNavKeyColumn"](-1)}onNavKeyColumn(e=1){let t,o,n=this,s=n.view,i=s.store,r=n.items[0],a=i.getCount();t=r?i.indexOf(r)+e:0,t<0?t=a-1:t>=a&&(t=0),o=i.getAt(t),n.select(o[i.keyProperty]),s.fire("select",{record:o})}onNavKeyRow(e=1){let t,o,n=this,s=n.view,i=s.store,r=n.items[0],a=i.getCount(),l=s.amountRows,m=n.stayInRow;if(s.orderByRow&&(l=Math.ceil(s.store.getCount()/l)),e*=l,t=r?i.indexOf(r)+e:0,t<0)for(m||t++;t<a-l;)t+=l;else if(t>=a)for(m||t--;t>=l;)t-=l;o=i.getAt(t),n.select(o[i.keyProperty]),s.fire("select",{record:o})}register(e){super.register(e);let t=this,o=t.id,n=t.view;n.on({containerClick:t.onContainerClick,itemClick:t.onItemClick,scope:t}),n.keys&&n.keys._keys.push({fn:"onKeyDownDown",key:"Down",scope:o},{fn:"onKeyDownLeft",key:"Left",scope:o},{fn:"onKeyDownRight",key:"Right",scope:o},{fn:"onKeyDownUp",key:"Up",scope:o})}select(e){let t=this,o=t.view,n=[...t.items],s=[],i=o.getItemVnodeId(e);t.singleSelect&&(t.items.forEach((t=>{t!==e&&s.push({id:o.getItemVnodeId(t),cls:{add:[],remove:["neo-selected"]}})})),t.items.splice(0,t.items.length)),s.push({id:i,cls:{add:["neo-selected"]}}),a.Z.add(t.items,e),s.length>0&&o.mounted?Neo.currentWorker.promiseMessage("main",{action:"updateDom",appName:o.appName,deltas:s}).then((()=>{t.fire("selectionChange",t.items,n)})):o.mounted&&t.fire("selectionChange",t.items,n)}unregister(){let e=this.id,t=this.view;t.keys&&t.keys.removeKeys([{fn:"onKeyDownDown",key:"Down",scope:e},{fn:"onKeyDownLeft",key:"Left",scope:e},{fn:"onKeyDownRight",key:"Right",scope:e},{fn:"onKeyDownUp",key:"Up",scope:e}]),super.unregister()}}Neo.applyClassConfig(l);var m=o(471);const d=Symbol.for("itemsMounted");class c extends i.Z{static getConfig(){return{className:"Neo.component.Gallery",ntype:"gallery",amountRows_:3,backgroundColor_:"#000000",cls:["neo-gallery","page","view"],disableSelection:!1,imageHeight:160,imageWidth:120,itemTpl_:{cls:["neo-gallery-item","image-wrap","view","neo-transition-1000"],tabIndex:"-1",cn:[{cls:["neo-item-wrapper"],cn:[{tag:"img",cls:[],style:{}}]}]},keyProperty:"id",keys:{},maxItems_:300,mouseWheelDeltaX:10,mouseWheelDeltaY:10,mouseWheelEnabled_:!0,offsetHeight:null,offsetWidth:null,orderByRow_:!1,selectedItemCls:"neo-selected",selectionModel_:null,selectOnMount:!0,store_:null,transitionTimeouts:[],translateX_:0,translateY_:0,translateZ_:0,_vdom:{cls:["page","view"],style:{},tabIndex:"-1",cn:[{cls:["origin","view"],style:{},cn:[{cls:["camera","view"],style:{},cn:[{cls:["dolly","view"],style:{},cn:[{cls:["view"],style:{},cn:[]}]}]}]}]}}}constructor(e){super(e);let t=this,o=Neo.clone(t.domListeners,!0),n=t.vdom,s=n.cn[0],i=s.cn[0],r=i.cn[0],a=r.cn[0],l=t.id+"__";t[d]=!1,i.id=l+"camera",r.id=l+"dolly",s.id=l+"origin",a.id=l+"view",t.vdom=n,o.push({click:t.onClick,wheel:t.onMouseWheel,scope:t}),t.domListeners=o}onConstructed(){super.onConstructed();let e=this;e.selectionModel&&e.selectionModel.register(e),e.store instanceof m.Z||Neo.Xhr.promiseJson({insideNeo:!0,url:"../../resources/examples/data/ai_contacts.json"}).then((t=>{e.store.items=t.json.data,setTimeout((()=>{e.createItems(),e.selectOnMount&&e.afterSetMounted(!0,!1)}),100)})).catch((t=>{console.log("Error for Neo.Xhr.request",t,e.id)}))}afterSetAmountRows(e,t){if(Neo.isNumber(t)){let e=this;e.afterSetOrderByRow(e.orderByRow,!e.orderByRow)}}afterSetMaxItems(e,t){let o=this;e&&o.rendered&&(t>e?o.destroyItems(e,t-e):o.createItems(t))}afterSetMounted(e,t){let o=this;e?setTimeout((()=>{Neo.currentWorker.promiseMessage("main",{action:"readDom",appName:o.appName,vnodeId:o.id,attributes:["offsetHeight","offsetWidth"]}).then((e=>{if(o.offsetHeight=e.attributes.offsetHeight,o.offsetWidth=e.attributes.offsetWidth,o.selectOnMount||o.selectionModel.hasSelection()){let e=o.selectionModel.getSelection(),t=e.length>0&&e[0];if(!t){let e=parseInt(Math.min(o.maxItems,o.store.getCount())/o.amountRows);t=o.store.getKeyAt(e)}o.selectionModel.select(t)}}))}),300):o.selectionModel.items=[]}afterSetOrderByRow(e,t){if(Neo.isBoolean(t)){let e=this,t=0,o=Math.min(e.maxItems,e.store.items.length),n=e.vdom,s=e.getItemsRoot();e.rendered&&(e.refreshImageReflection(),setTimeout((()=>{for(;t<o;t++)s.cn[t].style.transform=e.getItemTransform(t);e.vdom=n,setTimeout((()=>{let t=e.selectionModel;t.hasSelection()&&e.onSelectionChange(t.items)}),500)}),50))}}afterSetSelectionModel(e,t){this.rendered&&(e.register(this),t&&t.destroy())}beforeSetStore(e,t){let o=this;return t&&t.destroy(),e?n.Z.beforeSetInstance(e,m.Z,{listeners:{load:o.onStoreLoad,sort:o.onSort,scope:o}}):Neo.create(s.Z,{keyProperty:"id",listeners:{sort:o.onSort,scope:o}})}afterSetTranslateX(){this.moveOrigin()}afterSetTranslateY(){this.moveOrigin()}afterSetTranslateZ(){this.moveOrigin()}beforeGetItemTpl(){return Neo.clone(this._itemTpl,!0)}beforeSetSelectionModel(e,t){return t&&t.destroy(),n.Z.beforeSetInstance(e,l,{listeners:{selectionChange:this.onSelectionChange,scope:this}})}createItem(e,t,o){let n=this,s=e.cn[0].cn[0];return e.id=n.getItemVnodeId(t[n.keyProperty]),s.src=Neo.config.resourcesPath+"examples/"+t.image,s.style.height=n.imageHeight+"px",s.style.width=n.imageWidth+"px",e}createItems(e){let t,o,n,s=this,i=s.amountRows,r=s.orderByRow,l=i-1,m=s.vdom,c=s.getItemsRoot(),u=e||0,p=Math.min(s.maxItems,s.store.items.length);for(r&&(t=Math.ceil(s.store.getCount()/i));u<p;u++)o=s.store.items[u],n=s.createItem(s.itemTpl,o,u),n.style=n.style||{},n.style.transform=s.getItemTransform(u),r?u>=l*t&&a.Z.add(n.cls,"neo-reflection"):u%i===l&&a.Z.add(n.cls,"neo-reflection"),c.cn.push(n);s.promiseVdomUpdate(m).then((()=>{s[d]=!0}))}destroyItems(e,t){let o=this,n=o.vdom,s=t||o.store.getCount(),i=o.selectionModel.items[0];o.getItemsRoot().cn.splice(e||0,s),o.vdom=n,o.selectionModel.hasSelection()&&i>e&&i<e+s&&o.afterSetMounted(!0,!1)}getCameraTransformForCell(e){let t=this,o=t.amountRows,n=t.imageWidth,s=t.offsetHeight/(o+2)+10,i=Math.floor(e/o),r=e-i*o;if(t.orderByRow){let n=Math.ceil(Math.min(t.maxItems,t.store.getCount())/o);i=e%n,r=Math.floor(e/n)}return[-i*(n+10),-((r+.5)*s*1.1+50),0]}getItemId(e){return parseInt(e.split("__")[1])}getItemsRoot(){return this.vdom.cn[0].cn[0].cn[0].cn[0]}getItemTransform(e){let t,o,n=this,s=n.amountRows;return n.orderByRow?(s=Math.ceil(Math.min(n.maxItems,n.store.getCount())/s),t=e%s,o=Math.floor(e/s)):(t=Math.floor(e/s),o=e%s),this.translate3d(t*(n.imageWidth+10),o*(n.imageHeight+10)+100,0)}getItemVnodeId(e){return this.id+"__"+e}moveOrigin(){let e=this,t=e.vdom;t.cn[0].style.transform=e.translate3d(e.translateX,e.translateY,e.translateZ),e.vdom=t}onClick(e){this.fire(e.id===this.id?"containerClick":"itemClick",e)}onMouseWheel(e){let t=this,o=e.deltaX,n=e.deltaY,s=t.translateX,i=t.translateZ;t.mouseWheelEnabled&&(t._translateX=s-o*t.mouseWheelDeltaX,t._translateZ=i+n*t.mouseWheelDeltaY,t.moveOrigin(),t.fire("changeTranslateX",t._translateX),t.fire("changeTranslateZ",t._translateZ))}onSelectionChange(e){let t,o=this,n=o.store.indexOf(e&&e[0]||0),s=o.imageHeight,i=o.imageWidth,r=o.vdom,l=r.cn[0].cn[0],m=o.getCameraTransformForCell(n),d=o.offsetHeight/(o.amountRows+2),c=Math.round(d*i/s)+10;o.transitionTimeouts.forEach((e=>{clearTimeout(e)})),o.transitionTimeouts.splice(0,o.transitionTimeouts.length),Neo.currentWorker.promiseMessage("main",{action:"updateDom",appName:o.appName,deltas:{id:o.id+"__dolly",style:{transform:o.translate3d(...m)}}}).then((()=>{Neo.currentWorker.promiseMessage("main",{action:"readDom",appName:o.appName,vnodeId:o.id,functions:[{fn:"getComputedStyle",params:[o.id+"__dolly",null],paramIsDomNode:[!0,!1],scope:"defaultView",returnFnName:"transform",returnValue:"transform"}]}).then((e=>{let n,s,i=e.functions.transform;0===i.indexOf("matrix3d")?(i=i.substring(9,i.length-1),i=i.split(",").map((e=>parseFloat(e))),n=i[12]):(i=i.substring(7,i.length-1),i=i.split(",").map((e=>parseFloat(e))),n=i[4]),n-=m[0],s=45*Math.min(Math.max(n/(3*c),-1),1),l.style.transform="rotateY("+s+"deg)",l.style.transitionDuration="330ms",o.vdom=r,t=setTimeout((()=>{a.Z.remove(o.transitionTimeouts,t),r=o.vdom,l.style.transform="rotateY(0deg)",l.style.transitionDuration="5000ms",o.vdom=r}),330),o.transitionTimeouts.push(t)}))}))}onSort(){if(!0===this[d]){let e,t,o=this,n=!1,s=[...o.store.items||[]],i=[],r=o.vdom,a=o.getItemsRoot(),l=a.cn.map((e=>e.id));s.length=Math.min(o.maxItems,o.store.getCount()),s.length>0&&(s.forEach(((s,r)=>{t=o.getItemVnodeId(s[o.keyProperty]),e=l.indexOf(t),i.push(a.cn[e]),r!==e&&(n=!0)})),n&&(a.cn=i,o.vdom=r,setTimeout((()=>{o.afterSetOrderByRow(o.orderByRow,!o.orderByRow)}),50)))}}onStoreLoad(e){this.getItemsRoot().cn=[],this.createItems()}refreshImageReflection(){let e,t=this,o=t.amountRows,n=t.orderByRow,s=o-1,i=t.vdom,r=t.getItemsRoot();n&&(e=Math.ceil(Math.min(t.maxItems,t.store.getCount())/o)),r.cn.forEach(((t,i)=>{n?a.Z[i>=s*e?"add":"remove"](t.cls,"neo-reflection"):a.Z[i%o===s?"add":"remove"](t.cls,"neo-reflection")})),t.vdom=i}translate3d(e,t,o){return"translate3d("+e+"px, "+t+"px, "+o+"px)"}}Neo.applyClassConfig(c)},309:(e,t,o)=>{"use strict";var n=o(632);class s extends n.Z{static getConfig(){return{className:"Neo.form.field.trigger.SpinDown",ntype:"trigger-spindown",align:"start",iconCls:"fa fa-chevron-left",type:"spindown"}}onTriggerClick(e){this.field.onSpinButtonDownClick()}}Neo.applyClassConfig(s);class i extends n.Z{static getConfig(){return{className:"Neo.form.field.trigger.SpinUp",ntype:"trigger-spinup",iconCls:"fa fa-chevron-right",type:"spinup"}}onTriggerClick(e){this.field.onSpinButtonUpClick()}}Neo.applyClassConfig(i);class r extends n.Z{static getConfig(){return{className:"Neo.form.field.trigger.SpinUpDown",ntype:"trigger-spinupdown",cls:["neo-field-trigger","neo-spin-buttons"],spinButtonDownIconCls:"fa fa-chevron-down",spinButtonUpIconCls:"fa fa-chevron-up",type:"spinupdown"}}onConstructed(){let e=this,t=e.vdom;t.cn=[{cls:["neo-spin-button","neo-up",e.spinButtonUpIconCls]},{cls:["neo-spin-button","neo-down",e.spinButtonDownIconCls]}],e.vdom=t,super.onConstructed()}onTriggerClick(e){let t=e.path[0].cls.join(" ");t.includes("neo-down")?this.field.onSpinButtonDownClick():t.includes("neo-up")&&this.field.onSpinButtonUpClick()}}Neo.applyClassConfig(r);var a=o(968);class l extends a.Z{static getStaticConfig(){return{triggerPositions:["right","sides"]}}static getConfig(){return{className:"Neo.form.field.Number",ntype:"numberfield",cls:["neo-numberfield","neo-textfield"],excludedValues:null,inputEditable_:!0,inputType:"number",maxValue_:100,minValue_:0,stepSize_:1,triggerPosition_:"right",useSpinButtons_:!0}}onConstructed(){this.updateTriggers(),super.onConstructed()}afterSetInputEditable(e,t){let o=this,n=o.vdom,s=o.getInputEl().style||{};e?delete s.pointerEvents:s.pointerEvents="none",o.vdom=n}afterSetMaxValue(e,t){this.changeInputElKey("max",e)}afterSetMinValue(e,t){this.changeInputElKey("min",e)}afterSetStepSize(e,t){let o,n=this,s=n.value;n.changeInputElKey("step",e),null!==s&&(o=(s-n.minValue)%e,0!==o&&(o/e>.5?s+e-o<n.maxValue?n.value=s+e-o:s-o>n.minValue&&(n.value=s-o):s-o>n.minValue?n.value=s-o:s+e-o<n.maxValue&&(n.value=s+e-o)))}afterSetTriggerPosition(e,t){t&&this.updateTriggers()}afterSetUseSpinButtons(e,t){"boolean"==typeof t&&this.updateTriggers()}beforeSetTriggerPosition(e,t){return this.beforeSetEnumValue(e,t,"triggerPosition")}onInputValueChange(e){let t=this,o=e.value,n=t.value;o||t.required?(o=parseInt(o),Neo.isNumber(o)?(o-=o%t.stepSize,o=Math.max(t.minValue,o),o=Math.min(t.maxValue,o),e.value=o,super.onInputValueChange(e)):t._value=n):super.onInputValueChange(e)}onSpinButtonDownClick(){let e=this,t=e.value||e.maxValue+e.stepSize,o=Math.max(e.minValue,t-e.stepSize);if(e.excludedValues)for(;e.excludedValues.includes(o);)o=Math.max(e.minValue,o-e.stepSize);t!==o&&(e.value=o)}onSpinButtonUpClick(){let e=this,t=e.value||e.minValue-e.stepSize,o=Math.min(e.maxValue,t+e.stepSize);if(e.excludedValues)for(;e.excludedValues.includes(o);)o=Math.min(e.maxValue,o+e.stepSize);t!==o&&(e.value=o)}updateTriggers(){let e=this,t=e.triggers||[];e.useSpinButtons?"right"===e.triggerPosition?(e.hasTrigger("spinupdown")||t.push(r),e.removeTrigger("spindown",!0,t),e.removeTrigger("spinup",!0,t)):(e.hasTrigger("spindown")||t.push(s),e.hasTrigger("spinup")||t.push(i),e.removeTrigger("spinupdown",!0,t)):(e.removeTrigger("spindown",!0,t),e.removeTrigger("spinup",!0,t),e.removeTrigger("spinupdown",!0,t)),e.triggers=t}}Neo.applyClassConfig(l),Neo.applyClassConfig(class extends l{static getConfig(){return{className:"Neo.form.field.Range",ntype:"rangefield",clearable:!1,cls:["neo-rangefield","neo-textfield"],inputType:"range",tickmarks_:[],useInputEvent:!1,useSpinButtons:!1}}constructor(e){super(e);let t=this,o=t.domListeners,n=t.vdom.cn[1];t.useInputEvent&&(o.push({input:{fn:t.onInputValueChange,id:t.vdom.cn[1].id,scope:t}}),t.domListeners=o),n.cls=["neo-rangefield-input"]}afterSetTickmarks(e,t){}})}}]);