(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/worker/add"],{"0b40":function(e,t,n){},"23ac":function(e,t,n){"use strict";var i=n("0b40"),a=n.n(i);a.a},"263d":function(e,t,n){"use strict";(function(e){n("29f0");i(n("66fd"));var t=i(n("e01e"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"5df7":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("9ac1"),a={data:function(){return{title:"",index:0,picker:["场所码","地铁站","办公楼"],imgList:[]}},methods:{PickerChange:function(e){this.index=e.detail.value},inputChange:function(e){this.title=e.detail.value},ChooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths}})},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},DelImg:function(e){this.imgList.splice(e.currentTarget.dataset.index,1)},submit:function(){var t=this;(0,i.translate)(this.imgList[0],.5,"base64",(function(n){try{var i=["red","orange","green","cyan","olive","blue","grey","black"],a=i[Math.floor(Math.random()*i.length)],r=e.getStorageSync("siam_worker_scan_list"),c=r;c||(c=[]),c.push({name:t.title,type:t.picker[t.index],img:n,color:a}),e.setStorageSync("siam_worker_scan_list",c),e.navigateTo({url:"/pages/worker/worker"})}catch(u){console.log(u)}}))}}};t.default=a}).call(this,n("543d")["default"])},"98c8":function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var a=function(){var e=this,t=e.$createElement;e._self._c},r=[]},b4b4:function(e,t,n){"use strict";n.r(t);var i=n("5df7"),a=n.n(i);for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},e01e:function(e,t,n){"use strict";n.r(t);var i=n("98c8"),a=n("b4b4");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("23ac");var c,u=n("f0c5"),o=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);t["default"]=o.exports}},[["263d","common/runtime","common/vendor"]]]);