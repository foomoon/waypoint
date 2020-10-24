(function(t){function e(e){for(var i,a,r=e[0],l=e[1],p=e[2],u=0,c=[];u<r.length;u++)a=r[u],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&c.push(n[a][0]),n[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);h&&h(e);while(c.length)c.shift()();return s.push.apply(s,p||[]),o()}function o(){for(var t,e=0;e<s.length;e++){for(var o=s[e],i=!0,r=1;r<o.length;r++){var l=o[r];0!==n[l]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=o[0]))}return t}var i={},n={app:0},s=[];function a(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=i,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(o,i,function(e){return t[e]}.bind(null,i));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/waypoint/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var p=0;p<r.length;p++)e(r[p]);var h=l;s.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"034f":function(t,e,o){"use strict";var i=o("85ec"),n=o.n(i);n.a},"0a07":function(t,e,o){"use strict";var i=o("3be1"),n=o.n(i);n.a},"3be1":function(t,e,o){},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var i=o("2b0e"),n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",[o("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[o("div",{staticClass:"d-flex align-center"},[o("v-icon",{staticClass:"wp-slant",attrs:{color:"blue lighten-2",large:""}},[t._v(" mdi-map-marker-outline ")]),o("v-icon",{staticClass:"wpt-shift wpt-slant",attrs:{color:"blue lighten-3",large:""}},[t._v(" mdi-map-marker-outline ")]),o("h2",{staticClass:"font-italic font-weight-light",attrs:{color:"blue lighten-2"}},[t._v(" Waypoint ")])],1),o("v-spacer"),o("v-btn",{attrs:{href:"#/#step1",text:""}},[o("span",{staticClass:"mr-2"},[t._v("Start Tour")]),o("v-icon",[t._v("mdi-open-in-new")])],1)],1),o("v-main",[o("Skeleton"),o("Waypoint",{attrs:{steps:t.steps}})],1)],1)},s=[],a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",[o("v-skeleton-loader",t._b({attrs:{id:"step0",type:"list-item-two-line"}},"v-skeleton-loader",t.attrs,!1)),o("v-row",[o("v-col",{attrs:{cols:"12",md:"4"}},[o("v-skeleton-loader",t._b({attrs:{id:"step1",type:"card-avatar, article, actions"}},"v-skeleton-loader",t.attrs,!1)),o("v-skeleton-loader",t._b({attrs:{id:"step2",type:"date-picker"}},"v-skeleton-loader",t.attrs,!1))],1),o("v-col",{attrs:{cols:"12",md:"4"}},[o("v-skeleton-loader",t._b({attrs:{id:"step3",type:"article, actions"}},"v-skeleton-loader",t.attrs,!1)),o("v-skeleton-loader",t._b({attrs:{id:"step5",type:"table-heading, list-item-two-line, image, table-tfoot"}},"v-skeleton-loader",t.attrs,!1))],1),o("v-col",{attrs:{cols:"12",md:"4"}},[o("v-skeleton-loader",t._b({attrs:{type:"list-item-avatar, divider, list-item-three-line, card-heading, image, actions"}},"v-skeleton-loader",t.attrs,!1)),o("v-skeleton-loader",t._b({attrs:{id:"step4",type:"list-item-avatar-three-line, image, article"}},"v-skeleton-loader",t.attrs,!1))],1)],1)],1)},r=[],l={name:"Skeleton",data:function(){return{attrs:{class:"mb-6",boilerplate:!0,elevation:2}}}},p=l,h=o("2877"),u=o("6544"),c=o.n(u),d=o("62ad"),f=o("a523"),v=o("0fd9"),g=o("3129"),w=Object(h["a"])(p,a,r,!1,null,null,null),m=w.exports;c()(w,{VCol:d["a"],VContainer:f["a"],VRow:v["a"],VSkeletonLoader:g["a"]});var y=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",[o("v-card",{directives:[{name:"show",rawName:"v-show",value:t.showTooltip,expression:"showTooltip"}],staticClass:"mx-auto mt-5 elevation-20 wpt-tooltip v-fade ",staticStyle:{"margin-top":"0px !important"},attrs:{id:"wpt-tooltip",width:"400"}},[o("v-card-title",{domProps:{innerHTML:t._s(t.wpTooltipTitle)}}),o("v-card-text",{domProps:{innerHTML:t._s(t.wpTooltipText)}}),o("v-card-text",[o("v-alert",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"200px","font-size":"8px","line-height":"10px"},attrs:{border:"left","close-text":"Close Alert",color:"deep-purple accent-4",dark:"",dismissible:"",transition:"scale-transition"},domProps:{innerHTML:t._s(t.alertText)},model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}})],1),o("v-divider"),o("v-card-actions",[o("v-spacer"),o("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.stepCount>0,expression:"stepCount > 0"}],attrs:{color:"info"},on:{click:function(e){return t.prev()}}},[t._v(" prev ")]),o("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.stepCount<t.steps.length-1,expression:"stepCount < steps.length-1"}],attrs:{color:"info"},on:{click:function(e){return t.next()}}},[t._v(" next ")]),o("v-btn",{directives:[{name:"show",rawName:"v-show",value:!t.steps[t.boundedStep].modal,expression:"!(steps[boundedStep].modal || false)"}],attrs:{color:"error"},on:{click:function(e){return t.quit()}}},[t._v(" quit ")])],1),o("div",{attrs:{id:"arrow","data-popper-arrow":""}})],1)],1),o("div",{directives:[{name:"show",rawName:"v-show",value:t.showHighlight,expression:"showHighlight"}],staticClass:"wpt-highlight ",style:{top:t.wptTop,left:t.wptLeft,width:t.wptWidth,height:t.wptHeight},attrs:{id:"tourOverlay"},domProps:{innerHTML:t._s(t.wpHighlightText)}})])},b=[],k=(o("c740"),o("ac1f"),o("5319"),o("39c3")),T={name:"Waypoint",props:{steps:{default:function(){return[{target:"body",tooltip:{title:"Default",content:"Oops, you forgot to provide a valid steps property"}}]},type:Array}},data:function(){return{step:{},stepCount:-1,tooltip:null,showTooltip:!1,showHighlight:!1,alert:!1,alertText:"",wptTop:0,wptLeft:0,wptWidth:0,wptHeight:0}},watch:{stepCount:{handler:function(){-1==this.stepCount||this.stepCount>=this.steps.length?this.quit():(this.step=this.steps[this.stepCount],this.showTooltip=!1,setTimeout(function(){this.tour(this.step)}.bind(this),300))}}},computed:{tourInSession:function(){return this.stepCount>=0&&this.stepCount<this.steps.length},wpTooltipText:function(){var t=this.step.tooltip||{};return t.content||"Default Text"},wpTooltipTitle:function(){var t=this.step.tooltip||{};return t.title||"Default Title"},wpHighlightText:function(){return this.step.content||""},boundedStep:function(){var t=this.stepCount;return t=t>-1?t:0,t=t<this.steps.length?t:0,t},theme:function(){return this.$vuetify.theme.isDark?"Light":"Dark"}},methods:{highlightTarget:function(t){var e=t.getBoundingClientRect(),o=window.pageYOffset,i=4;this.wptTop=o+e.top-i+"px",this.wptLeft=e.left-i+"px",this.wptWidth=e.width+2*i+"px",this.wptHeight=e.height+2*i+"px"},isValidTarget:function(t){return null!==t},createHighlight:function(){var t=document.querySelector(".wpt-highlight"),e=document.querySelector("main");e.appendChild(t)},createTooltip:function(){var t=document.querySelector(".wpt-highlight"),e=document.querySelector(".wpt-tooltip");this.tooltip=Object(k["a"])(t,e,{modifiers:[{name:"offset",options:{offset:[0,15]}}]}),t.addEventListener(V(),j.bind(this),{once:!0})},destroyTooltip:function(){this.tooltip&&(this.tooltip.destroy(),this.tooltip=null)},next:function(){this.stepCount++},prev:function(){this.stepCount--},init:function(){this.stepCount=0,this.showHighlight=!0,this.showTooltip=!0},quit:function(){this.steps[this.boundedStep].modal&&this.stepCount!=this.steps.length-1||(this.stepCount=-1,this.destroyTooltip(),this.showHighlight=!1,this.showTooltip=!1)},tour:function(t){if("undefined"!==typeof t&&this.isValidTarget(t.target)){var e=document.querySelector(t.target);null===this.tooltip&&(this.createTooltip(),this.showTooltip=!0),this.showHighlight=!0,this.$vuetify.goTo(e,{duration:500,offset:10,easing:"easeInOutCubic"}),this.highlightTarget(e);var o=t.handler;"function"===typeof o&&(o=o.bind(this),o())}},toggleTheme:function(){this.$vuetify.theme.isDark=!this.$vuetify.theme.isDark}},mounted:function(){window.addEventListener("hashchange",x.bind(this)),window.addEventListener("mouseup",_.bind(this)),window.addEventListener("keydown",C.bind(this)),window.addEventListener("resize",S.bind(this)),this.createHighlight(),this.init()}};function x(){var t=window.location.hash.replace(/#\/?/,""),e=function(e){return e.target===t},o=this.steps.findIndex(e);o>=0&&(this.stepCount=o),window.location.hash=""}function C(t){if(t=t||window.event,this.tourInSession)switch(console.warn("Propegation of some keys prevented while waypoint is active"),t.key){case"ArrowUp":case"ArrowLeft":t.preventDefault(),this.prev();break;case"ArrowDown":case"ArrowRight":t.preventDefault(),this.next();break;case"Escape":t.preventDefault(),this.quit();break;default:}}function _(t){var e=t.target.closest(".wpt-tooltip"),o=t.target.closest(".wpt-highlight");e||o||!this.tourInSession||this.quit()}function S(){if(this.tourInSession){var t=this.steps[this.stepCount];this.tour(t)}}function j(t){setTimeout(function(){console.log(t.propertyName),this.stepCount>=0&&"undefined"!==typeof this.steps[this.stepCount].tooltip&&(this.showTooltip=!0,this.tooltip.update()),t.target.addEventListener(V(),j.bind(this),{once:!0})}.bind(this),500)}function V(){var t={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},e=document.body.style;for(var o in t)if(void 0!=e[o])return t[o]}var O=T,H=(o("0a07"),o("0798")),W=o("8336"),L=o("b0af"),A=o("99d9"),q=o("ce7e"),D=o("2fa4"),E=Object(h["a"])(O,y,b,!1,null,null,null),M=E.exports;c()(E,{VAlert:H["a"],VBtn:W["a"],VCard:L["a"],VCardActions:A["a"],VCardText:A["b"],VCardTitle:A["c"],VDivider:q["a"],VSpacer:D["a"]});var P={name:"App",components:{Skeleton:m,Waypoint:M},data:function(){return{steps:I}}},I=[{target:"#step1",tooltip:{title:"Welcome to Waypoint!",content:"This is an early development <b>tour</b> component for <a href='https://vuejs.org'>Vue.js</a> and themed with <a href='https://vuetifyjs.com/en/'>Vuetify.js</a>. Waypoint is designed to be beautiful, performant, lightweight and declarative.  It should be flexible enough to cover a wide variety of needs."},modal:!1},{target:"#step2",tooltip:{title:"Arrowed",content:"Navigation can be acheived through the buttons below, as you have no doubt already determined.  Did you know you can alternatively use your arrow keys?"},modal:!0},{target:"#step3",tooltip:{title:"Target Acquired",content:"This tooltip takes advantage of the popular 'popper.js' library for positioning and can be easily be customized in an html template. Targets are defined using html selector syntax"},modal:!0},{target:"#step0",content:"You can also asign content to the highlighted target if you prefer. (Right arrow for 'Next')",modal:!0},{target:".v-skeleton-loader__table-tfoot",tooltip:{title:"Works with Themes",content:"Yep, Waypoint looks great in both light and dark themes!"},modal:!0,handler:function(){this.toggleTheme()}},{target:".v-skeleton-loader__avatar",tooltip:{title:"Supports HTML",content:"<img src='https://upload.wikimedia.org/wikipedia/en/8/89/GordonShumway.png'  style='display: block; margin-left: auto; margin-right: auto; width: 70%; box-shadow:0 0 3px 3px rgb(255, 255, 255, 0.2)' /img><br>A keen eye may have noticed tooltips support HTML, but did you know they also support life on other planets? "},modal:!0},{target:".v-skeleton-loader__list-item-avatar",tooltip:{title:"Events",content:"Waypoint has a custom event hook.  It was used to trigger the theme change two steps ago.  The event hook is bound to the Waypoint component instance which is very convenient when you need to call Waypoint's <b><i>this</i></b> object."},modal:!0,handler:function(){this.alert=!1}},{target:".v-skeleton-loader__button",tooltip:{title:"Steps",content:"So how do you steer this thing?  A javascript object defines each of the steps in Waypoint.  Here is the beautiful mess used to script this tour:"},modal:!0,handler:function(){alert("A Waypoint custom event hook triggered this alert"),this.alertText="<pre> "+JSON.stringify(this.steps,null," ")+"</pre>",this.alert=!0}},{target:"#step1",tooltip:{title:"Modal",content:"All of the previous steps were set to 'modal' which has prevented you from exiting Waypoint.  You could click the 'quit' button now or press the 'escape' key to exit. But you know you want to find out more..."},handler:function(){this.alert=!1}},{target:"#step4",tooltip:{title:"Routes",content:"You can programatically start/end waypoint but you can also use simple html href links that point to a target and Waypoint knows what to do!"}},{target:"#step5",tooltip:{title:"Impressed Yet?",content:"This was all acheived with less than 200 lines of javascript and just a few lines of html.  Sure there are dependencies and others have implimented similar libraries, but this one is mine and I happen to think it's easier to use and looks better than anything else out there"}}],N=P,$=(o("034f"),o("7496")),Y=o("40dc"),B=o("132d"),R=o("f6c4"),z=Object(h["a"])(N,n,s,!1,null,null,null),J=z.exports;c()(z,{VApp:$["a"],VAppBar:Y["a"],VBtn:W["a"],VIcon:B["a"],VMain:R["a"],VSpacer:D["a"]});var G=o("f309");i["a"].use(G["a"]);var U=new G["a"]({});i["a"].config.productionTip=!1;var F=new i["a"]({vuetify:U,render:function(t){return t(J)}});F.$mount("#app")},"85ec":function(t,e,o){}});
//# sourceMappingURL=app.a442c3af.js.map