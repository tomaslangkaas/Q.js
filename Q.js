/*
 @repo https://github.com/tomaslangkaas/Q.js
 @license MIT
 @author Tomas Langkaas
*/
function Q(c,k,l){function m(a){k(e[b],a);b++;d[b]?(f=d[b](),setTimeout(g)):(h(),c("end"))}function n(a){l(e[b],a);setTimeout(g)}function g(){a&&f(m,n)}function h(){a&&(a=0,c("pause"))}var d=[],e=[],b=0,a=0,f;return{run:function(){a||(a=1,g(),c("run"))},pause:h,reset:function(){h();b=0;f=d[b]();c("reset")},task:function(a,b){d.push(b);e.push(a);this.reset()}}};
