(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"15b8":function(e,t,n){},"34d4":function(e,t,n){"use strict";n.r(t);var o=n("598b");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("92e2");var c,u,a,l,i=n("f0c5"),f=Object(i["a"])(o["default"],c,u,!1,null,null,null,!1,a,l);t["default"]=f.exports},"598b":function(e,t,n){"use strict";n.r(t);var o=n("e340"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},"92e2":function(e,t,n){"use strict";var o=n("15b8"),r=n.n(o);r.a},e340:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("66fd"));function r(e){return e&&e.__esModule?e:{default:e}}var c={onLaunch:function(){e.getSystemInfo({success:function(e){o.default.prototype.StatusBar=e.statusBarHeight;var t=wx.getMenuButtonBoundingClientRect();o.default.prototype.Custom=t,o.default.prototype.CustomBar=t.bottom+t.top-e.statusBarHeight}}),o.default.prototype.ColorList=[{title:"嫣红",name:"red",color:"#e54d42"},{title:"桔橙",name:"orange",color:"#f37b1d"},{title:"明黄",name:"yellow",color:"#fbbd08"},{title:"橄榄",name:"olive",color:"#8dc63f"},{title:"森绿",name:"green",color:"#39b54a"},{title:"天青",name:"cyan",color:"#1cbbb4"},{title:"海蓝",name:"blue",color:"#0081ff"},{title:"姹紫",name:"purple",color:"#6739b6"},{title:"木槿",name:"mauve",color:"#9c26b0"},{title:"桃粉",name:"pink",color:"#e03997"},{title:"棕褐",name:"brown",color:"#a5673f"},{title:"玄灰",name:"grey",color:"#8799a3"},{title:"草灰",name:"gray",color:"#aaaaaa"},{title:"墨黑",name:"black",color:"#333333"},{title:"雅白",name:"white",color:"#ffffff"}]},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=c}).call(this,n("543d")["default"])},fd67:function(e,t,n){"use strict";(function(e){n("29f0");var t=r(n("66fd")),o=r(n("34d4"));function r(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n;var l=function(){n.e("pages/basics/home").then(function(){return resolve(n("db06"))}.bind(null,n)).catch(n.oe)};t.default.component("basics",l);var i=function(){n.e("pages/component/home").then(function(){return resolve(n("9a48"))}.bind(null,n)).catch(n.oe)};t.default.component("components",i);var f=function(){n.e("pages/plugin/home").then(function(){return resolve(n("8247"))}.bind(null,n)).catch(n.oe)};t.default.component("plugin",f);var p=function(){n.e("colorui/components/cu-custom").then(function(){return resolve(n("1246"))}.bind(null,n)).catch(n.oe)};t.default.component("cu-custom",p),t.default.config.productionTip=!1,o.default.mpType="app";var s=new t.default(u({},o.default));e(s).$mount()}).call(this,n("543d")["createApp"])}},[["fd67","common/runtime","common/vendor"]]]);