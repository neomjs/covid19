self.webpackChunk([2],{17:function(e,t,n){"use strict";n.r(t),n.d(t,"onStart",(function(){return d}));var a=n(23);class o extends a.a{static getConfig(){return{className:"Covid19.model.Country",fields:[{name:"cases",type:"int"},{name:"country",type:"string"},{name:"critical",type:"int"},{name:"deaths",type:"int"},{name:"recovered",type:"int"},{name:"todayCases",type:"int"},{name:"todayDeaths",type:"int"}]}}}Neo.applyClassConfig(o);var i=n(25);class r extends i.a{static getConfig(){return{className:"Covid19.store.Countries",keyProperty:"country",model:o}}}Neo.applyClassConfig(r);var s=n(38);class l extends s.a{static getStaticConfig(){return{flagRegEx:/ /gi}}static getConfig(){return{className:"Covid19.view.CountryGallery",cls:["neo-country-gallery","neo-gallery","page","view"],imageHeight:280,imageWidth:340,itemTpl:{cls:["neo-gallery-item","image-wrap","view","neo-transition-1000"],tabIndex:"-1",cn:[{cls:["neo-item-wrapper"],style:{},cn:[{tag:"div",cls:["neo-country-gallery-item"],style:{},cn:[{cls:["neo-item-header"],cn:[{tag:"img",cls:["neo-flag"]},{}]},{tag:"table",cls:["neo-content-table"],cn:[{tag:"tr",cn:[{tag:"td",html:"Cases"},{tag:"td",cls:["neo-align-right"]},{tag:"td",style:{width:"100%"}},{tag:"td",html:"Cases today"},{tag:"td",cls:["neo-align-right"]}]},{tag:"tr",cn:[{tag:"td",html:"Deaths"},{tag:"td",cls:["neo-align-right","neo-content-deaths"]},{tag:"td",style:{width:"100%"}},{tag:"td",html:"Deaths today"},{tag:"td",cls:["neo-align-right","neo-content-deaths"]}]},{tag:"tr",cn:[{tag:"td",html:"Recovered"},{tag:"td",cls:["neo-align-right","neo-content-recovered"]},{tag:"td",style:{width:"100%"}},{tag:"td",html:"Critical"},{tag:"td",cls:["neo-align-right","neo-content-critical"]}]}]}]}]}]},keyProperty:"country",selectOnMount:!1,store:r}}createItem(e,t,n){let a=this,o=e.cn[0].cn[0],i=o.cn[1];return e.id=a.getItemVnodeId(t[a.keyProperty]),e.cn[0].style.height=a.imageHeight+"px",o.style.height=a.imageHeight-70+"px",o.style.width=a.imageWidth+"px",o.cn[0].cn[0].src=a.getCountryFlagUrl(t.country),o.cn[0].cn[1].html=t.country,i.cn[0].cn[1].html=t.cases,i.cn[1].cn[1].html=t.deaths,i.cn[2].cn[1].html=t.recovered,i.cn[0].cn[4].html=t.todayCases,i.cn[1].cn[4].html=t.todayDeaths,i.cn[2].cn[4].html=t.critical,e}getCountryFlagUrl(e){let t=e.toLowerCase().replace(l.flagRegEx,"-");if(t={bosnia:"bosnia-and-herzegovina","cabo-verde":"cape-verde",car:"central-african-republic","caribbean-netherlands":"netherlands","channel-islands":"jersey","côte-d'ivoire":"ivory-coast",congo:"republic-of-the-congo","congo,-the-democratic-republic-of-the":"democratic-republic-of-congo","curaçao":"curacao",czechia:"czech-republic","diamond-princess":"japan",drc:"democratic-republic-of-congo","el-salvador":"salvador",eswatini:"swaziland","faeroe-islands":"faroe-islands","falkland-islands-(malvinas)":"falkland-islands","french-guiana":"france",guadeloupe:"france","holy-see-(vatican-city-state)":"vatican-city","iran,-islamic-republic-of":"iran","lao-people's-democratic-republic":"laos","libyan-arab-jamahiriya":"libya",macedonia:"republic-of-macedonia",mayotte:"france","moldova,-republic-of":"moldova","ms-zaandam":"netherlands","new-caledonia":"france","palestinian-territory,-occupied":"palestine",poland:"republic-of-poland","réunion":"france","s.-korea":"south-korea","st.-barth":"st-barts","saint-lucia":"st-lucia","saint-martin":"sint-maarten","saint-pierre-miquelon":"france","saint-vincent-and-the-grenadines":"st-vincent-and-the-grenadines","syrian-arab-republic":"syria","tanzania,-united-republic-of":"tanzania","timor-leste":"east-timor","turks-and-caicos-islands":"turks-and-caicos","u.s.-virgin-islands":"virgin-islands",uae:"united-arab-emirates",uk:"united-kingdom",usa:"united-states-of-america",uzbekistan:"uzbekistn","venezuela,-bolivarian-republic-of":"venezuela","viet-nam":"vietnam"}[t]||t,Neo.config.isGitHubPages){let e="../../../../resources/images/flaticon/country_flags/png/"+t+".png";return Neo.config.isExperimental||(e="../../"+e),e}return"https://raw.githubusercontent.com/neomjs/pages/master/resources/images/flaticon/country_flags/png/"+t+".png"}getItemId(e){return e.split("__")[1]}onStoreLoad(e){super.onStoreLoad(e),setTimeout(()=>{this.selectOnMount=!0,this.afterSetMounted(!0,!1)},"development"===Neo.config.environment?200:500)}}Neo.applyClassConfig(l);n(27),n(36);var c=n(30);class g extends c.a{static getConfig(){return{className:"Covid19.view.MainContainer",ntype:"main-container",autoMount:!0,cls:["neo-gallery-maincontainer","neo-viewport"],gallery:null,galleryConfig:null,layout:{ntype:"hbox",align:"stretch"},items:[{ntype:"container",flex:1,layout:"fit",items:[]},{ntype:"panel",cls:["neo-controls-panel","neo-panel","neo-container"],layout:{ntype:"vbox",align:"stretch"},style:{backgroundColor:"#2b2b2b"},width:260,containerConfig:{style:{overflowY:"scroll"}},itemDefaults:{ntype:"rangefield",flex:"0 1 auto",labelWidth:"110px",style:{padding:"10px"},useInputEvent:!0,listeners:{change:function(e){"opacity"===this.name&&(e.value/=100),Neo.get("neo-gallery-1")[this.name]=e.value}}},headers:[{dock:"top",items:[{ntype:"button",text:"X",handler:function(){const e=this.up("panel"),t=40===e.width;e.width=t?250:40,this.text=t?"X":"+"}},{ntype:"label",text:"Gallery Controls"}]}],items:[{labelText:"Translate X",maxValue:5e3,minValue:0,name:"translateX",value:0,listeners:{change:function(e){Neo.get("neo-gallery-1")[this.name]=e.value},mounted:function(e){let t=Neo.get(e);Neo.get("neo-gallery-1").on("changeTranslateX",(function(e){e=Math.min(Math.max(e,this.minValue),this.maxValue),this.value=e}),t)}}},{labelText:"Translate Y",maxValue:1500,minValue:-1500,name:"translateY",value:0},{labelText:"Translate Z",maxValue:550,minValue:-4500,name:"translateZ",value:0,listeners:{change:function(e){Neo.get("neo-gallery-1")[this.name]=e.value},mounted:function(e){let t=Neo.get(e);Neo.get("neo-gallery-1").on("changeTranslateZ",(function(e){e=Math.min(Math.max(e,this.minValue),this.maxValue),this.value=e}),t)}}},{labelText:"Amount Rows",maxValue:15,minValue:1,name:"amountRows",value:3},{ntype:"button",text:"Order by Row",listeners:{},style:{margin:"20px"},domListeners:{click:function(){const e=Neo.get("neo-gallery-1"),t=!e.orderByRow;this.text=!0===t?"Order By Column":"Order by Row",e.orderByRow=t}}},{ntype:"label",text:"Sort By:"},{ntype:"container",layout:{ntype:"hbox",align:"stretch"},style:{padding:"0"},items:[{ntype:"container",layout:{ntype:"vbox",align:"stretch"},items:[{ntype:"button",text:"Cases",listeners:{},style:{margin:"10px",marginTop:"0"},domListeners:{click:function(){Neo.get("neo-gallery-1").store.sorters=[{property:"cases",direction:"DESC"}]}}},{ntype:"button",text:"Deaths",listeners:{},style:{margin:"10px",marginBottom:"10px",marginTop:0},domListeners:{click:function(){Neo.get("neo-gallery-1").store.sorters=[{property:"deaths",direction:"DESC"}]}}},{ntype:"button",text:"Country",listeners:{},style:{margin:"10px",marginTop:0},domListeners:{click:function(){Neo.get("neo-gallery-1").store.sorters=[{property:"country",direction:"ASC"}]}}}]},{ntype:"container",layout:{ntype:"vbox",align:"stretch"},items:[{ntype:"button",text:"Cases today",listeners:{},style:{margin:"10px",marginTop:"0"},domListeners:{click:function(){Neo.get("neo-gallery-1").store.sorters=[{property:"todayCases",direction:"DESC"}]}}},{ntype:"button",text:"Deaths today",listeners:{},style:{margin:"10px",marginBottom:"10px",marginTop:0},domListeners:{click:function(){Neo.get("neo-gallery-1").store.sorters=[{property:"todayDeaths",direction:"DESC"}]}}},{ntype:"button",text:"Critical",listeners:{},style:{margin:"10px",marginTop:0},domListeners:{click:function(){Neo.get("neo-gallery-1").store.sorters=[{property:"critical",direction:"DESC"}]}}}]}]},{ntype:"label",text:["<b>Navigation Concept</b>","<p>You can use the Arrow Keys to walk through the items.</p>"].join(""),style:{backgroundColor:"#323232",color:"#ddd",fontSize:"13px",margin:"10px",padding:"10px",whiteSpace:"normal"}},{ntype:"label",cls:["neo-link-color"],text:["<b>Attribution</b>",'<p>App created with <a href="https://github.com/neomjs/neo">neo.mjs</a>.</p>','<p>Data provided by <a href="https://github.com/disease-sh/API">disease-sh/API</a>.</p>','<p>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>.</p>'].join(""),style:{backgroundColor:"#323232",color:"#ddd",fontSize:"13px",margin:"10px",padding:"10px",whiteSpace:"normal"}}]}]}}constructor(e){super(e);const t=this,n="https://corona.lmao.ninja/v2/countries";t.gallery=Neo.create({module:l,id:"neo-gallery-1",...t.galleryConfig||{}}),t.items[0].items.push(t.gallery),fetch(n).then(e=>e.json()).then(e=>t.addStoreItems(e)).catch(e=>console.log("Can’t access "+n,e))}addStoreItems(e){this.getStore().data=e,setTimeout(()=>{Neo.main.DomAccess.focus({id:this.gallery.id})},200)}getStore(){return this.items[0].items[0].store}}Neo.applyClassConfig(g);const d=()=>Neo.app({appPath:"apps/covid19/",mainView:g,name:"Covid19"})}});