/*
 @repo https://github.com/tomaslangkaas/Q.js
 @license MIT
 @author Tomas Langkaas
*/
function Q(c,h,k){function l(a){h(e[b],a);b++;d[b]?f=d[b]():(g(),c("end"))}function m(a){k(e[b],a)}function n(){f(l,m)}function g(){a&&(clearInterval(a),a=0,c("pause"))}var d=[],e=[],b=0,a,f;return{run:function(){a||(a=setInterval(n,1),c("run"))},pause:g,reset:function(){g();b=0;f=d[b]();c("reset")},task:function(a,b){d.push(b);e.push(a);this.reset()}}};
