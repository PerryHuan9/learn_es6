!function(n){var r={};function e(o){if(r[o])return r[o].exports;var t=r[o]={i:o,l:!1,exports:{}};return n[o].call(t.exports,t,t.exports,e),t.l=!0,t.exports}e.m=n,e.c=r,e.d=function(n,r,o){e.o(n,r)||Object.defineProperty(n,r,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,r){if(1&r&&(n=e(n)),8&r)return n;if(4&r&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&r&&"string"!=typeof n)for(var t in n)e.d(o,t,function(r){return n[r]}.bind(null,t));return o},e.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(r,"a",r),r},e.o=function(n,r){return Object.prototype.hasOwnProperty.call(n,r)},e.p="",e(e.s=1)}([,function(n,r,e){"use strict";var o=[12,23,34,54,65,67],t=o.map(function(n){return n+1}),u=o.map(function(n,r){return n+r}),i=[];o.forEach(function(n){n%5==0&&i.push(n)}),console.info(o),console.info(t),console.info(u),console.info(i),{name:"perry",age:20,printInfo:function(){var n=this;return function(){console.info("name:"+n.name+",age:"+n.age)}}}.printInfo()(),console.log(function(){var n=arguments;return function(){var r=[],e=!0,o=!1,t=void 0;try{for(var u,i=n[Symbol.iterator]();!(e=(u=i.next()).done);e=!0){var l=u.value;r.push(l*l)}}catch(n){o=!0,t=n}finally{try{!e&&i.return&&i.return()}finally{if(o)throw t}}return r}}(2,4,5,56,34,3,2)());var l={msg:"American is destryed",print:function(){return(void 0).msg}};console.log(l.print());function c(n){return n<=2?1:c(n-1)+c(n-2)}function f(n){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return n<=2?r:c(n--)}console.log(l.print()),console.log("排序："+function(){return Array.prototype.slice.call(arguments).sort(function(n,r){return n-r})}(10,12,25,4,5,67,87234,34)),console.log("排序2："+function(){for(var n=arguments.length,r=Array(n),e=0;e<n;e++)r[e]=arguments[e];return r.sort(function(n,r){return n-r})}(10,34,121,23,43,2,344,54,56)),console.log(c(10)),console.log(f(10)),console.log(f(100))}]);