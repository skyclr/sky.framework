/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return"function"==typeof t&&"number"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement("script");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var b="3.3.1",w=function(e,t){return new w.fn.init(e,t)},T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn=w.prototype={jquery:"3.3.1",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==c.call(e))&&(!(t=i(e))||"function"==typeof(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function C(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I="\\["+M+"*("+R+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+M+"*\\]",W=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+I+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),F=new RegExp("^"+M+"*,"+M+"*"),_=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),z=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),X=new RegExp(W),U=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if("object"!==t.nodeName.toLowerCase()){(c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=b),s=(h=a(e)).length;while(s--)h[s]="#"+c+" "+ve(h[s]);v=h.join(","),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute("id")}}}return u(e.replace(B,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function de(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",re,!1):i.attachEvent&&i.attachEvent("onunload",re)),n.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),v.push("!=",W)}),y=y.length&&new RegExp(y.join("|")),v=v.length&&new RegExp(v.join("|")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+"").replace(te,ne)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&E(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace($," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,"$1"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||"*",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(B,"$1"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p="function"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&"ID"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):"string"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,"iframe")?e.contentDocument:(N(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\x20\t\r\n\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e="string"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError("Thenable self-resolution");l=e&&("object"==typeof e||"function"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),"pending"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)["catch"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener("DOMContentLoaded",_),e.removeEventListener("load",_),w.ready()}"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener("DOMContentLoaded",_),e.addEventListener("load",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,"ms-").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks("once memory").add(function(){J.remove(e,[t+"queue",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=J.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&w.contains(e.ownerDocument,e)&&"none"===w.css(e,"display")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,"")},u=s(),l=n&&n[3]||(w.cssNumber[t]?"":"px"),c=(w.cssNumber[t]||"px"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=J.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ae(r)&&(i[o]=ce(r))):"none"!==n&&(i[o]="none",J.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return"undefined"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(M)||[""]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(M)||[""]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,"handle events")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,"events")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&N(this,"input"))return this.click(),!1},_default:function(e){return N(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ae=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")?w(e).children("tbody")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Oe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();"input"===n&&pe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&"string"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,"script"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,"script"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||"")&&!J.access(l,"globalEval")&&w.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,""),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,"script")).length>0&&ve(a,!u&&ye(e,"script")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join("|"),"i");!function(){function t(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i="1%"!==t.top,u=12===n(t.marginLeft),c.style.right="60%",s=36===n(t.right),o=36===n(t.width),c.style.position="absolute",a=36===c.offsetWidth||"absolute",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement("div"),c=r.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:"absolute",visibility:"hidden",display:"block"},Ve={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","Moz","ms"],Ye=r.createElement("div").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ze(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?("content"===n&&(u-=w.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(u-=w.css(e,"border"+oe[a]+"Width",!0,i))):(u+=w.css(e,"padding"+oe[a],!0,i),"padding"!==n?u+=w.css(e,"border"+oe[a]+"Width",!0,i):s+=w.css(e,"border"+oe[a]+"Width",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o="border-box"===w.css(e,"boxSizing",!1,r),a=o;if(We.test(i)){if(!n)return i;i="auto"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),("auto"===i||!parseFloat(i)&&"inline"===w.css(e,"display",!1,r))&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?"border":"content"),a,r,i)+"px"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(w.cssNumber[s]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),"normal"===i&&t in Ve&&(i=Ve[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each(["height","width"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a="border-box"===w.css(e,"boxSizing",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,"border",!1,o)-.5)),s&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),w.each({margin:"",padding:"",border:"Width"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?"":"px")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,"fxshow");n.queue||(null==(a=w._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,"display")),"none"===(c=w.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===w.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?"hidden"in y&&(g=y.hidden):y=J.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,"fxshow");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=["*"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&"object"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=J.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each(["toggle","show","hide"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut("show"),slideUp:ut("hide"),slideToggle:ut("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement("input"),t=r.createElement("select").appendChild(r.createElement("option"));e.type="checkbox",h.checkOn=""!==e.value,h.optSelected=t.selected,(e=r.createElement("input")).value="t",e.type="radio",h.radioValue="t"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(" ")}function mt(e){return e.getAttribute&&e.getAttribute("class")||""}function xt(e){return Array.isArray(e)?e:"string"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr("class","");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])while(r.indexOf(" "+o+" ")>-1)r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&"boolean"!==n||((t=mt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+vt(mt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?"":e+""})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(bt,""):null==n?"":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each(["radio","checkbox"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),h.focusin="onfocusin"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,"type")?t.type:t,x=f.call(t,"namespace")?t.namespace.split("."):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(".")>-1&&(m=(x=m.split(".")).shift(),x.sort()),c=m.indexOf(":")<0&&"on"+m,t=t[w.expando]?t:new w.Event(m,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,"events")||{})[t.type]&&J.get(s,"handle"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\?/;w.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||w.error("Invalid XML: "+t),n};var St=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==x(t))r(e,t);else for(i in t)jt(e+"["+i+"]",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=r.createElement("a");Bt.href=Ct.href;function Ft(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i["*"]&&a("*")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks("once memory"),x=h.statusCode||{},b={},T={},C="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(M)||[""],null==h.crossDomain){l=r.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(d=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(kt.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,"$1"),d=(kt.test(o)?"&":"?")+"_="+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader("If-Modified-Since",w.lastModified[o]),w.etag[o]&&E.setRequestHeader("If-None-Match",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader("Content-Type",h.contentType),E.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C="abort",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger("ajaxSend",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort("timeout")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,"No Transport");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader("Last-Modified"))&&(w.lastModified[o]=T),(T=E.getResponseHeader("etag"))&&(w.etag[o]=T)),204===t||"HEAD"===h.type?C="nocontent":304===t?C="notmodified":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C="error",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+"",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?"ajaxSuccess":"ajaxError",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger("ajaxComplete",[E,h]),--w.active||w.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&"withCredentials"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),w.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||w.expando+"_"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,"$1"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||w.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),"script"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument("")).createElement("base")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&w.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?w("<div>").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,"position"),f=w(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=w.css(e,"top"),u=w.css(e,"left"),(l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===w.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===w.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),i.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-w.css(r,"marginTop",!0),left:t.left-i.left-w.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===w.css(e,"position"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each(["top","left"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+"px":n})}),w.each({Height:"height",Width:"width"},function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),w.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return w});var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});
//! moment.js
//! version : 2.12.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Zc.apply(null,arguments)}function b(a){Zc=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ia(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),$c.length>0)for(c in $c)d=$c[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),_c===!1&&(_c=!0,a.updateOffset(this),_c=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(a,b){var c=!0;return g(function(){return c&&(t(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function v(a,b){ad[a]||(t(b),ad[a]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!cd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=bd._abbr,require("./locale/"+a),E(b)}catch(c){}return cd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(bd=c)),bd._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=cd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(cd[a]._config,b)):null!=b.parentLocale&&(null!=cd[b.parentLocale]?b=z(cd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),cd[a]=new A(b),E(a),cd[a]):(delete cd[a],null)}function G(a,b){if(null!=b){var c;null!=cd[a]&&(b=z(cd[a]._config,b)),c=new A(b),c.parentLocale=cd[a],cd[a]=c,E(a)}else null!=cd[a]&&(null!=cd[a].parentLocale?cd[a]=cd[a].parentLocale:null!=cd[a]&&delete cd[a]);return cd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return bd;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return Object.keys(cd)}function J(a,b){var c=a.toLowerCase();dd[c]=dd[c+"s"]=dd[b]=a}function K(a){return"string"==typeof a?dd[a]||dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(hd[a]=e),b&&(hd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(hd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(ed);for(b=0,c=d.length;c>b;b++)hd[d[b]]?d[b]=hd[d[b]]:d[b]=S(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),gd[b]=gd[b]||T(b),gd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(fd.lastIndex=0;d>=0&&fd.test(a);)a=a.replace(fd,c),fd.lastIndex=0,d-=1;return a}function W(a,b,c){zd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(zd,a)?zd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ad[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ad,a)&&Ad[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Kd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Kd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function fa(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ga(b){return null!=b?(fa(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ha(){return ba(this.year(),this.month())}function ia(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function ka(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")$","i")}function la(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Cd]<0||c[Cd]>11?Cd:c[Dd]<1||c[Dd]>ba(c[Bd],c[Cd])?Dd:c[Ed]<0||c[Ed]>24||24===c[Ed]&&(0!==c[Fd]||0!==c[Gd]||0!==c[Hd])?Ed:c[Fd]<0||c[Fd]>59?Fd:c[Gd]<0||c[Gd]>59?Gd:c[Hd]<0||c[Hd]>999?Hd:-1,j(a)._overflowDayOfYear&&(Bd>b||b>Dd)&&(b=Dd),j(a)._overflowWeeks&&-1===b&&(b=Id),j(a)._overflowWeekday&&-1===b&&(b=Jd),j(a).overflow=b),a}function ma(a){var b,c,d,e,f,g,h=a._i,i=Pd.exec(h)||Qd.exec(h);if(i){for(j(a).iso=!0,b=0,c=Sd.length;c>b;b++)if(Sd[b][1].exec(i[1])){e=Sd[b][0],d=Sd[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Td.length;c>b;b++)if(Td[b][1].exec(i[3])){f=(i[2]||" ")+Td[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Rd.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ba(a)}else a._isValid=!1}function na(b){var c=Ud.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ma(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function oa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function pa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function qa(a){return ra(a)?366:365}function ra(a){return a%4===0&&a%100!==0||a%400===0}function sa(){return ra(this.year())}function ta(a,b,c){var d=7+b-c,e=(7+pa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function ua(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ta(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=qa(f)+j):j>qa(a)?(f=a+1,g=j-qa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function va(a,b,c){var d,e,f=ta(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+wa(e,b,c)):g>wa(a.year(),b,c)?(d=g-wa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function wa(a,b,c){var d=ta(a,b,c),e=ta(a+1,b,c);return(qa(a)-d+e)/7}function xa(a,b,c){return null!=a?a:null!=b?b:c}function ya(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function za(a){var b,c,d,e,f=[];if(!a._d){for(d=ya(a),a._w&&null==a._a[Dd]&&null==a._a[Cd]&&Aa(a),a._dayOfYear&&(e=xa(a._a[Bd],d[Bd]),a._dayOfYear>qa(e)&&(j(a)._overflowDayOfYear=!0),c=pa(e,0,a._dayOfYear),a._a[Cd]=c.getUTCMonth(),a._a[Dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Ed]&&0===a._a[Fd]&&0===a._a[Gd]&&0===a._a[Hd]&&(a._nextDay=!0,a._a[Ed]=0),a._d=(a._useUTC?pa:oa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Ed]=24)}}function Aa(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=xa(b.GG,a._a[Bd],va(Ja(),1,4).year),d=xa(b.W,1),e=xa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=xa(b.gg,a._a[Bd],va(Ja(),f,g).year),d=xa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>wa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=ua(c,d,e,f,g),a._a[Bd]=h.year,a._dayOfYear=h.dayOfYear)}function Ba(b){if(b._f===a.ISO_8601)return void ma(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(ed)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),hd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Ed]<=12&&b._a[Ed]>0&&(j(b).bigHour=void 0),b._a[Ed]=Ca(b._locale,b._a[Ed],b._meridiem),za(b),la(b)}function Ca(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Da(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ba(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Ea(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),za(a)}}function Fa(a){var b=new o(la(Ga(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ga(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(la(b)):(c(e)?Da(a):e?Ba(a):d(b)?a._d=b:Ha(a),k(a)||(a._d=null),a))}function Ha(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?na(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),za(b)):"object"==typeof f?Ea(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ia(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Fa(f)}function Ja(a,b,c,d){return Ia(a,b,c,d,!1)}function Ka(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ja();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function La(){var a=[].slice.call(arguments,0);return Ka("isBefore",a)}function Ma(){var a=[].slice.call(arguments,0);return Ka("isAfter",a)}function Na(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Oa(a){return a instanceof Na}function Pa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Qa(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Zd)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ra(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Ja(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Ja(b).local()}function Sa(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ta(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Qa(wd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Sa(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?ib(this,cb(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Sa(this):null!=b?this:NaN}function Ua(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Va(a){return this.utcOffset(0,a)}function Wa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Sa(this),"m")),this}function Xa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Qa(vd,this._i)),this}function Ya(a){return this.isValid()?(a=a?Ja(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Za(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function $a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ga(a),a._a){var b=a._isUTC?h(a._a):Ja(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function _a(){return this.isValid()?!this._isUTC:!1}function ab(){return this.isValid()?this._isUTC:!1}function bb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function cb(a,b){var c,d,e,g=a,h=null;return Oa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=$d.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Dd])*c,h:r(h[Ed])*c,m:r(h[Fd])*c,s:r(h[Gd])*c,ms:r(h[Hd])*c}):(h=_d.exec(a))?(c="-"===h[1]?-1:1,g={y:db(h[2],c),M:db(h[3],c),w:db(h[4],c),d:db(h[5],c),h:db(h[6],c),m:db(h[7],c),s:db(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=fb(Ja(g.from),Ja(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Na(g),Oa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function db(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function eb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function fb(a,b){var c;return a.isValid()&&b.isValid()?(b=Ra(b,a),a.isBefore(b)?c=eb(a,b):(c=eb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function gb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function hb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=cb(c,d),ib(this,e,a),this}}function ib(b,c,d,e){var f=c._milliseconds,g=gb(c._days),h=gb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&fa(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function jb(a,b){var c=a||Ja(),d=Ra(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ja(c)))}function kb(){return new o(this)}function lb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function mb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function nb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function ob(a,b){var c,d=p(a)?a:Ja(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function pb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function qb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function rb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ra(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=sb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function sb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function tb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ub(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function vb(b){var c=U(this,b||a.defaultFormat);return this.localeData().postformat(c)}function wb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function xb(a){return this.from(Ja(),a)}function yb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function zb(a){return this.to(Ja(),a)}function Ab(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Bb(){return this._locale}function Cb(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Db(a){return a=K(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function Eb(){return+this._d-6e4*(this._offset||0)}function Fb(){return Math.floor(+this/1e3)}function Gb(){return this._offset?new Date(+this):this._d}function Hb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Ib(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Jb(){return this.isValid()?this.toISOString():null}function Kb(){return k(this)}function Lb(){return g({},j(this))}function Mb(){return j(this).overflow}function Nb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ob(a,b){R(0,[a,a.length],0,b)}function Pb(a){return Tb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Qb(a){return Tb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Rb(){return wa(this.year(),1,4)}function Sb(){var a=this.localeData()._week;return wa(this.year(),a.dow,a.doy)}function Tb(a,b,c,d,e){var f;return null==a?va(this,d,e).year:(f=wa(a,d,e),b>f&&(b=f),Ub.call(this,a,b,c,d,e))}function Ub(a,b,c,d,e){var f=ua(a,b,c,d,e),g=pa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Vb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Wb(a){return va(a,this._week.dow,this._week.doy).week}function Xb(){return this._week.dow}function Yb(){return this._week.doy}function Zb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function $b(a){var b=va(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function _b(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function ac(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function bc(a){return this._weekdaysShort[a.day()]}function cc(a){return this._weekdaysMin[a.day()]}function dc(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Ja([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function ec(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=_b(a,this.localeData()),this.add(a-b,"d")):b}function fc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function gc(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function ic(){return this.hours()%12||12}function jc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function kc(a,b){return b._meridiemParse}function lc(a){return"p"===(a+"").toLowerCase().charAt(0)}function mc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function nc(a,b){b[Hd]=r(1e3*("0."+a))}function oc(){return this._isUTC?"UTC":""}function pc(){return this._isUTC?"Coordinated Universal Time":""}function qc(a){return Ja(1e3*a)}function rc(){return Ja.apply(null,arguments).parseZone()}function sc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function tc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function uc(){return this._invalidDate}function vc(a){return this._ordinal.replace("%d",a)}function wc(a){return a}function xc(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function yc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function zc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Ac(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return zc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=zc(a,f,c,e);return g}function Bc(a,b){return Ac(a,b,"months",12,"month")}function Cc(a,b){return Ac(a,b,"monthsShort",12,"month")}function Dc(a,b){return Ac(a,b,"weekdays",7,"day")}function Ec(a,b){return Ac(a,b,"weekdaysShort",7,"day")}function Fc(a,b){return Ac(a,b,"weekdaysMin",7,"day")}function Gc(){var a=this._data;return this._milliseconds=xe(this._milliseconds),this._days=xe(this._days),this._months=xe(this._months),a.milliseconds=xe(a.milliseconds),a.seconds=xe(a.seconds),a.minutes=xe(a.minutes),a.hours=xe(a.hours),a.months=xe(a.months),a.years=xe(a.years),this}function Hc(a,b,c,d){var e=cb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Ic(a,b){return Hc(this,a,b,1)}function Jc(a,b){return Hc(this,a,b,-1)}function Kc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Lc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Kc(Nc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Mc(g)),h+=e,g-=Kc(Nc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Mc(a){return 4800*a/146097}function Nc(a){return 146097*a/4800}function Oc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Mc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Nc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Pc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Qc(a){return function(){return this.as(a)}}function Rc(a){return a=K(a),this[a+"s"]()}function Sc(a){return function(){return this._data[a]}}function Tc(){return q(this.days()/7)}function Uc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Vc(a,b,c){var d=cb(a).abs(),e=Ne(d.as("s")),f=Ne(d.as("m")),g=Ne(d.as("h")),h=Ne(d.as("d")),i=Ne(d.as("M")),j=Ne(d.as("y")),k=e<Oe.s&&["s",e]||1>=f&&["m"]||f<Oe.m&&["mm",f]||1>=g&&["h"]||g<Oe.h&&["hh",g]||1>=h&&["d"]||h<Oe.d&&["dd",h]||1>=i&&["M"]||i<Oe.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Uc.apply(null,k)}function Wc(a,b){return void 0===Oe[a]?!1:void 0===b?Oe[a]:(Oe[a]=b,!0)}function Xc(a){var b=this.localeData(),c=Vc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Yc(){var a,b,c,d=Pe(this._milliseconds)/1e3,e=Pe(this._days),f=Pe(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Zc,$c=a.momentProperties=[],_c=!1,ad={};a.suppressDeprecationWarnings=!1;var bd,cd={},dd={},ed=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,fd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,gd={},hd={},id=/\d/,jd=/\d\d/,kd=/\d{3}/,ld=/\d{4}/,md=/[+-]?\d{6}/,nd=/\d\d?/,od=/\d\d\d\d?/,pd=/\d\d\d\d\d\d?/,qd=/\d{1,3}/,rd=/\d{1,4}/,sd=/[+-]?\d{1,6}/,td=/\d+/,ud=/[+-]?\d+/,vd=/Z|[+-]\d\d:?\d\d/gi,wd=/Z|[+-]\d\d(?::?\d\d)?/gi,xd=/[+-]?\d+(\.\d{1,3})?/,yd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,zd={},Ad={},Bd=0,Cd=1,Dd=2,Ed=3,Fd=4,Gd=5,Hd=6,Id=7,Jd=8;R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",nd),W("MM",nd,jd),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Cd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Cd]=e:j(c).invalidMonth=a});var Kd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Ld="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Md="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Nd=yd,Od=yd,Pd=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Qd=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Rd=/Z|[+-]\d\d(?::?\d\d)?/,Sd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Td=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ud=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",ud),W("YY",nd,jd),W("YYYY",rd,ld),W("YYYYY",sd,md),W("YYYYYY",sd,md),$(["YYYYY","YYYYYY"],Bd),$("YYYY",function(b,c){c[Bd]=2===b.length?a.parseTwoDigitYear(b):r(b);
}),$("YY",function(b,c){c[Bd]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Bd]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Vd=M("FullYear",!1);a.ISO_8601=function(){};var Wd=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Xd=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Yd=function(){return Date.now?Date.now():+new Date};Pa("Z",":"),Pa("ZZ",""),W("Z",wd),W("ZZ",wd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Qa(wd,a)});var Zd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var $d=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,_d=/^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;cb.fn=Na.prototype;var ae=hb(1,"add"),be=hb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var ce=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ob("gggg","weekYear"),Ob("ggggg","weekYear"),Ob("GGGG","isoWeekYear"),Ob("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",ud),W("g",ud),W("GG",nd,jd),W("gg",nd,jd),W("GGGG",rd,ld),W("gggg",rd,ld),W("GGGGG",sd,md),W("ggggg",sd,md),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",id),$("Q",function(a,b){b[Cd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",nd),W("ww",nd,jd),W("W",nd),W("WW",nd,jd),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var de={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",nd),W("DD",nd,jd),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Dd),$("Do",function(a,b){b[Dd]=r(a.match(nd)[0],10)});var ee=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",nd),W("e",nd),W("E",nd),W("dd",yd),W("ddd",yd),W("dddd",yd),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var fe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),ge="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),he="Su_Mo_Tu_We_Th_Fr_Sa".split("_");R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",qd),W("DDDD",kd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,ic),R("hmm",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),jc("a",!0),jc("A",!1),J("hour","h"),W("a",kc),W("A",kc),W("H",nd),W("h",nd),W("HH",nd,jd),W("hh",nd,jd),W("hmm",od),W("hmmss",pd),W("Hmm",od),W("Hmmss",pd),$(["H","HH"],Ed),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Ed]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e))});var ie=/[ap]\.?m?\.?/i,je=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",nd),W("mm",nd,jd),$(["m","mm"],Fd);var ke=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",nd),W("ss",nd,jd),$(["s","ss"],Gd);var le=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",qd,id),W("SS",qd,jd),W("SSS",qd,kd);var me;for(me="SSSS";me.length<=9;me+="S")W(me,td);for(me="S";me.length<=9;me+="S")$(me,nc);var ne=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var oe=o.prototype;oe.add=ae,oe.calendar=jb,oe.clone=kb,oe.diff=rb,oe.endOf=Db,oe.format=vb,oe.from=wb,oe.fromNow=xb,oe.to=yb,oe.toNow=zb,oe.get=P,oe.invalidAt=Mb,oe.isAfter=lb,oe.isBefore=mb,oe.isBetween=nb,oe.isSame=ob,oe.isSameOrAfter=pb,oe.isSameOrBefore=qb,oe.isValid=Kb,oe.lang=ce,oe.locale=Ab,oe.localeData=Bb,oe.max=Xd,oe.min=Wd,oe.parsingFlags=Lb,oe.set=P,oe.startOf=Cb,oe.subtract=be,oe.toArray=Hb,oe.toObject=Ib,oe.toDate=Gb,oe.toISOString=ub,oe.toJSON=Jb,oe.toString=tb,oe.unix=Fb,oe.valueOf=Eb,oe.creationData=Nb,oe.year=Vd,oe.isLeapYear=sa,oe.weekYear=Pb,oe.isoWeekYear=Qb,oe.quarter=oe.quarters=Vb,oe.month=ga,oe.daysInMonth=ha,oe.week=oe.weeks=Zb,oe.isoWeek=oe.isoWeeks=$b,oe.weeksInYear=Sb,oe.isoWeeksInYear=Rb,oe.date=ee,oe.day=oe.days=ec,oe.weekday=fc,oe.isoWeekday=gc,oe.dayOfYear=hc,oe.hour=oe.hours=je,oe.minute=oe.minutes=ke,oe.second=oe.seconds=le,oe.millisecond=oe.milliseconds=ne,oe.utcOffset=Ta,oe.utc=Va,oe.local=Wa,oe.parseZone=Xa,oe.hasAlignedHourOffset=Ya,oe.isDST=Za,oe.isDSTShifted=$a,oe.isLocal=_a,oe.isUtcOffset=ab,oe.isUtc=bb,oe.isUTC=bb,oe.zoneAbbr=oc,oe.zoneName=pc,oe.dates=u("dates accessor is deprecated. Use date instead.",ee),oe.months=u("months accessor is deprecated. Use month instead",ga),oe.years=u("years accessor is deprecated. Use year instead",Vd),oe.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ua);var pe=oe,qe={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},re={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},se="Invalid date",te="%d",ue=/\d{1,2}/,ve={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},we=A.prototype;we._calendar=qe,we.calendar=sc,we._longDateFormat=re,we.longDateFormat=tc,we._invalidDate=se,we.invalidDate=uc,we._ordinal=te,we.ordinal=vc,we._ordinalParse=ue,we.preparse=wc,we.postformat=wc,we._relativeTime=ve,we.relativeTime=xc,we.pastFuture=yc,we.set=y,we.months=ca,we._months=Ld,we.monthsShort=da,we._monthsShort=Md,we.monthsParse=ea,we._monthsRegex=Od,we.monthsRegex=ja,we._monthsShortRegex=Nd,we.monthsShortRegex=ia,we.week=Wb,we._week=de,we.firstDayOfYear=Yb,we.firstDayOfWeek=Xb,we.weekdays=ac,we._weekdays=fe,we.weekdaysMin=cc,we._weekdaysMin=he,we.weekdaysShort=bc,we._weekdaysShort=ge,we.weekdaysParse=dc,we.isPM=lc,we._meridiemParse=ie,we.meridiem=mc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var xe=Math.abs,ye=Qc("ms"),ze=Qc("s"),Ae=Qc("m"),Be=Qc("h"),Ce=Qc("d"),De=Qc("w"),Ee=Qc("M"),Fe=Qc("y"),Ge=Sc("milliseconds"),He=Sc("seconds"),Ie=Sc("minutes"),Je=Sc("hours"),Ke=Sc("days"),Le=Sc("months"),Me=Sc("years"),Ne=Math.round,Oe={s:45,m:45,h:22,d:26,M:11},Pe=Math.abs,Qe=Na.prototype;Qe.abs=Gc,Qe.add=Ic,Qe.subtract=Jc,Qe.as=Oc,Qe.asMilliseconds=ye,Qe.asSeconds=ze,Qe.asMinutes=Ae,Qe.asHours=Be,Qe.asDays=Ce,Qe.asWeeks=De,Qe.asMonths=Ee,Qe.asYears=Fe,Qe.valueOf=Pc,Qe._bubble=Lc,Qe.get=Rc,Qe.milliseconds=Ge,Qe.seconds=He,Qe.minutes=Ie,Qe.hours=Je,Qe.days=Ke,Qe.weeks=Tc,Qe.months=Le,Qe.years=Me,Qe.humanize=Xc,Qe.toISOString=Yc,Qe.toString=Yc,Qe.toJSON=Yc,Qe.locale=Ab,Qe.localeData=Bb,Qe.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Yc),Qe.lang=ce,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",ud),W("X",xd),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.12.0",b(Ja),a.fn=pe,a.min=La,a.max=Ma,a.now=Yd,a.utc=h,a.unix=qc,a.months=Bc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=cb,a.isMoment=p,a.weekdays=Dc,a.parseZone=rc,a.localeData=H,a.isDuration=Oa,a.monthsShort=Cc,a.weekdaysMin=Fc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Ec,a.normalizeUnits=K,a.relativeTimeThreshold=Wc,a.prototype=pe;var Re=a;return Re});
"use strict";

Function.prototype.safe = function(services = false) {
	return sky.func(this, services);
};
Function.prototype.exec = function() {
	return sky.exec(this);
};

/**
 * Main module
 */
$.extend(sky, {

	/**
	 * Main init function
	 * Resolve add depended modules and code
	 */
	init: function() {
		sky.func(() => { sky.execDeferred.resolve(); })();
	},

	/**
	 * Return function with try catch wrapper
	 * @param {function} func Function
	 * @param {boolean} [services] If true arguments would be filled with services
	 * @param {*} context Context
	 * @returns {Function}
	 */
	func: function(func, services, context = false) {
		return function() {
			try {
				return services ? sky.services.callWithServices(func, context || this) : func.apply(context || this, arguments);
			} catch(e) {
				return sky.exceptionHandler(e);
			}
		}
	},

	/**
	 * Main system exception handler function
	 * @param e
	 */
	exceptionHandler: function(e) {

		/* Log error */
		if(console && console.error)
			console.error(e.message, e);

		/* User fault error */
		if(sky.exceptions && e instanceof sky.exceptions.Exception)
			return e.handle();

		/* Show error */
		alert("Во время работы произошла ошибка, пожалуйста сообщите администрации");

	}

});

(function() {
	let Exception = class extends Error {
		handle() {
			alert("Error | " + this.message);
		}
	};
	sky.exceptions = {
		Exception: Exception,
		user:{
			Error: class extends Exception {}
		},
		system: {
			Error: class extends Exception {}
		}
	};
})();
/**
 * Library main part to work with services
 */
(function() {

	/**
	 * Services list
	 */
	let base = function(service, name) {

			this.name = name;

			/** Init flag */
			this.initialise = sky.Promise();

			/** Options */
			this.options = {};

			/** Service interface */
			this.service = service || {};

			/**
			 * Set or call init function
			 * @param func
			 */
			this.init = func => {
				if(typeof func === "function") this.initialise.done(sky.func(func, true, this));
				else this.initialise.resolve();
				return this;
			};

		};
	let list = { exceptions: new base(sky.exceptions) };

		/**
	 * Init service
	 * @type {{add: add}}
	 */
	sky.services = {

		/**
		 * Get function arguments list
		 * @param {function} func Function to get arguments list from
		 * @returns {Array|{index: number, input: string}}
		 */
		functionServices: function(func) {

			/* Get arguments list */
			let str = func.toString();

			/* Check if first is services list */
			if(str.indexOf('({') < 0) return [];

			/* Get services */
			let names = str.slice(str.indexOf('({') + 2, str.indexOf('}')).match(/[^\s,]+/g);

			/* Return */
			return names ? names : [];

		},

		/**
		 * Calls function with services as params
		 * @param func Function to call
		 * @param {*} [context] Context to call
		 */
		callWithServices: function(func, context) {

			/* Get services */
			let servicesList = {}, services = this.functionServices(func);

			/* Go through */
			$.each(services, function(_, name) { servicesList[name] = sky.services.get(name) });

			return func.call(context || window, servicesList);

		},

		/**
		 * Return service and init it if none
		 * @param {string} name Service name
		 * @returns {{add: add}}
		 */
		get: function(name) {

			/* If no such thing */
			if(!list[name])
				throw new sky.exceptions.system.Error("Can't load service '" + name + "'");

			/* Return */
			return list[name].init().service;

		},

		/**
		 * Adds new services
		 * @param {string} name
		 * @param {*} [service]
		 */
		add: function(name, service = {}) {

			/* Check */
			if(typeof service !== "object" && typeof service !== "function")
				throw new sky.exceptions.system.Error("Service " + name + " have wrong type");

			/* Create base service */
			list[name] = new base(typeof service === "object" ? service : {}, name);

			/* If services declared with function for local scope and etc */
			if(typeof service === "function")
				list[name].init(service);

			return list[name];

		}

	};

	// Shortcut
	sky.service = (name, service) => service ? sky.services.add(name, service) : sky.services.get(name)

})();

sky.service("actions", function ({exceptions}) {

	let list = {},
		actions = this.service = {

			/**
			 * Performs action
			 * @param element
			 * @param event
			 * @param action
			 * @param {Array} [options]
			 */
			perform: function (element, event, action, options) {

				/* Get parameters */
				let params = action.match(/(.+)\((.*)\)/);

				/* Parse */
				if (params) {

					/* Get function */
					action = params[1];

					/* Parse params */
					params = params[2].split(",");
					$.each(params, function (i, val) {
						params[i] = eval(val.trim());
					})
				}

				/* Options */
				if (options)
					params = $.extend(params || [], options);

				/* Get */
				let self = element ? $(element) : false,
					path = action.split("."),
					current = list,
					name = action;

				/* If disabled */
				if (self && self.isDisabled && self.isDisabled())
					return;

				$.each(path, function (i, elem) {

					/* Search */
					if (i + 1 < path.length && !current[elem])
						throw new exceptions.system.Error("No action - " + action + ", because can't find '" + elem + "'");

					/* Get new elem */
					if (i + 1 < path.length)
						current = current[elem];

					/* Save name */
					name = elem;

				});

				/* If no */
				if (!current[name])
					throw new exceptions.system.Error("No action - " + action);

				/* Call */
				current[name].apply(current, [self, event].concat(params || []));

			},

			/**
			 * Adds actions to list
			 * @param name Group name
			 * @param events List
			 */
			add: function (name, events) {

				if (typeof events === "function")
					events = events.safe(true)();

				// Check
				if (!events || typeof events !== 'object')
					throw new exceptions.system.Error("No event object for events '" + name + "' provided");

				// Save
				list[name] = $.extend(list[name] || {}, events);

			}

		};


	/**
	 * Adds special bind function
	 * @param {string} name Event name
	 * @param {*} selector Selector string
	 * @param {function} [action] Action function
	 * @returns {jQuery}
	 */
	$.fn.action = function(name, selector, action) {

		/* Parameters skip */
		if(typeof action === "undefined") { action = selector; selector = null; }

		/* Bind */
		return this.on(name, selector, function(event, data) {
			action.call(this, event, $(this), data);
		}.safe());
	};

	/*
	 * Bind declarative events
	 */
	$(document).action("click submit keyup keydown dblclick mouseover mouseout mouseleave mouseenter change mousedown mouseup touchstart", '[data-event]', function (event, self, data) {

		/* Get string */
		let skyEvent = this.getAttribute("data-event");

		/* If no such string */
		if (skyEvent.indexOf(event.type) === -1)
			return;

		/* If disabled */
		if (self.isDisabled && self.isDisabled()) {
			event.preventDefault();
			return;
		}

		/* Split */
		let list = skyEvent.split(";"), i;

		/* Go through */
		for (i = 0; i < list.length; i++) {

			/* Get elements */
			let parts = list[i].match(/(\w+):(.*)/);

			/* Wrong */
			if (parts.length !== 3)
				throw new exceptions.system.Error("Wrong action format in data-event: " + list[i]);

			/* Get elements */
			let name = parts[1].trim(),
				action = parts[2].trim();

			/* Another event */
			if (name !== event.type)
				continue;

			/* No default go */
			if (event.target === self.get(0))
				event.preventDefault();

			/* Passed data */
			if (data)
				event.data = data;

			/* Get action data */
			let actionData = self.data("skyActionData");

			/* Save */
			if (actionData)
				event.data = actionData;

			/* Dump action */
			if (action === "false")
				continue;

			/* Perform action */
			actions.perform(this, event, action);

		}

	});

});
sky.service("ajax", function({ callbacks }) {

	/**
	 * Advanced ajax execution
	 * To abort call stop() method instead of abort() because it's used for abort callback set, or .ajax.abort()
	 * You may skip type, don't skip it if lock is string set false in object and data
	 * @param {string} url				Requested url
	 * @param {object} [data]			Holds request parameters
	 * @param {jQuery} [object]			Object which performs request, to disable it during request
	 * @param {object} [ajaxExtend]		Additional ajax options, see http://api.jquery.com/jQuery.ajaxSetup/
	 * @param {object} [callbackData]	Additional params that passed to any callback
	 */
	this.service = function(url, data, { object = null, callbackData = {}, ajaxExtend = {} }) {

		/* Lock button */
		if(object)
			object = $(object).filter(":not(.disabled)").disable();

		/* New object to store callbacks */
		let ajaxCallbacks = new callbacks();
		ajaxCallbacks.stop = function() { ajaxCallbacks.ajax.abort(); };

		/* Perform ajax request */
		ajaxCallbacks.ajax = $.ajax($.extend(true, {

			/* Set base options */
			url     	: url,
			data    	: data,
			dataType	: "json",
			type    	: "post",
			timeout		: 480 * 1000,
			success: function(response, textStatus, jqXHR) {

				/* Possible params list */
				let params = $.extend({ jqXHR: jqXHR, textStatus: textStatus, object: object }, callbackData);

				/* If empty response */
				if(response === null) {
					params.error = "Данные небыли переданы";
					params.type = "noData";
				}

				/* If response returned with error */
				if(response.error) {
					params.error = response.text;
					params.type = "php";
				}

				/* If error type set */
				if(params.type)
					return ajaxCallbacks.fire("notSuccess, error", params); // No data

				/* Set response in possible params */
				params.response = params.data = response;

				/* User success function */
				return ajaxCallbacks.fire("preSuccess, success, notAbort", params);

			}.safe(),
			error: function(jqXHR, textStatus, errorThrown) {

				/* Defaults */
				let type        = "Unknown",
					errorText   = "Во время выполнения запроса произошла ошибка, пожалуйста попробуйте позже";

				/* Get error text according to response data */
				if(textStatus === "abort") {
					type 	  = "abort";
					errorText = 'Выполнение запроса прервано';
				} else if(textStatus === 'parsererror') {
					type 	  = "parse";
					errorText = "Ответ пришел в неверном формате, пожалуйста попробуйте позже, текст:<br/>" + jqXHR.responseText;
				} else if(textStatus === 'timeout') {
					type 	  = "timeout";
					errorText = 'Время ожидания ответа истекло';
				} else if(jqXHR.status === 0) {
					type 	  = "stopped";
					errorText = 'Загрузка остановлена, проверьте свои настройки сети';
				} else if(codes[jqXHR.status]) {
					type = jqXHR.status;
					errorText = 'Ошибка во времы выполнения запроса <br/> ' + codes[jqXHR.status];
				}

				/* Possible params list */
				let params = $.extend({
					error      : errorText,
					type       : type,
					code	   : type,
					jqXHR      : jqXHR,
					textStatus : textStatus,
					status     : textStatus,
					errorThrown: errorThrown,
					object     : object
				}, callbackData);

				/* Execute callback */
				ajaxCallbacks.fire("notSuccess", params);

				/* Execute special ajaxCallbacks */
				ajaxCallbacks.fire(textStatus === "abort" ? "abort" : "error, notAbort", params);

			}.safe()

		}, ajaxExtend));

		/* On always set */
		ajaxCallbacks.ajax.promise().always(function(jqXHR, textStatus, errorThrown) {

			/* Unlock objects */
			if(object)
				object.enable();

			/* Always callback */
			ajaxCallbacks.fire("always", { errorThrown: errorThrown, textStatus: textStatus, jqXHR: jqXHR, object: object});

		}.safe());

		return ajaxCallbacks;

	};

	/**
	 * Contains http codes
	 */
	let codes = {

		/* Request errors */
		400: "Неверный запрос",
		401: "Для выполнеия запроса нужня авторизация",
		402: "Для доступа к ресурсу необходима оплата",
		403: "Доступ к ресурсу запрещен",
		404: "Сервер для выполнения запроса не найден или запрос выполнялся слишком долго",
		405: "Не поддерживаемый метод HTTP",
		406: "Не приемлемо",
		407: "Необходима аутентификация прокси",
		408: "Истекло время ожидания",
		409: "Конфликт",
		410: "Ресурс удален",
		411: "В запросе не указана длинна",
		412: "Условие ложно",
		413: "Размер запроса слишком велик",
		414: "Запрашиваемый URI слишком длинный",
		415: "Неподдерживаемый тип данных",
		416: "Запрашиваемый диапазон не достижим",
		417: "Ожидаемое неприемлемо",
		422: "Необрабатываемый экземпляр",
		423: "Ресурс заблокирован",
		424: "Невыполненная зависимость",
		425: "Неупорядоченный набор",
		426: "Необходимо обновление",
		428: "Необходимо предусловие",
		429: "Слишком много запросов",
		431: "Поля заголовка запроса слишком большие",
		451: "Недоступно по юридическим причинам",
		456: "Некорректируемая ошибка",
		499: "Используется Nginx, соединение закрыто до получения ответа",

		/* Server error */
		500: "Внутренняя ошибка сервера",
		501: "Не реализовано",
		502: "Плохой или ошибочный шлюз",
		503: "Сервис недоступен",
		504: "Шлюз не отвечает",
		505: "Версия HTTP не поддерживается",
		506: "Вариант тоже проводит согласование",
		507: "Переполнение хранилища",
		508: "Запрос зациклен",
		509: "Исчерпана пропускная ширина канала",
		510: "Не расширено",
		511: "Требуется сетевая аутентификация"

	};

});
/** Class to work with drop zone for File api */
sky.service("ajaxFilesDropZone", function({ supported, callbacks }) {
	this.service = class {
		constructor({ zone, data, url, options }) {

			/* Save options */
			this.options   = options;
			this.zone      = zone;
			this.callbacks = callbacks();
			this.data      = data;
			this.url       = url;
			this.files     = [];

			/* If no XHR supported, no file drip needed */
			if(!supported.XHRIsSupported) {
				this.callbacks.fire("nonSupported");
				return this;
			}

			/* Bind events */
			this.attachEvents();

		}

		attachEvents() {

			/* While over event */
			this.zone.on({

				dragenter: (event) => { this.callbacks.fire("dragenter", this, [event]); },
				dragleave: (event) => { this.callbacks.fire("dragleave", this, [event]); },
				dragend  : (event) => { this.callbacks.fire("dragend", this, [event]); 	 },
				drop     : (event) => { this.callbacks.fire("drop", this, [event]);		 },
				dragover : (event) => {

					/* Get event */
					event = event.originalEvent;

					/* Check if drag is valid */
					if(!this.isValidFileDrag(event))
						return;

					/* Get effect */
					let effect = event.dataTransfer.effectAllowed;

					/* Set proper */
					if(effect === 'move' || effect === 'linkMove') {
						event.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)
					} else {
						event.dataTransfer.dropEffect = 'copy'; // for Chrome
					}

					/* Prevent */
					event.preventDefault();

				}
			});

			/* Stop file opening when drop on browser window */
			$(document).bind({
				dragover : function(e) {
					e = e.originalEvent;
					if(e.dataTransfer) {
						e.dataTransfer.dropEffect = 'none';
						e.preventDefault();
					}
				},
				dragenter: function(e) {
					if(typeof self.options.onStart !== "undefined")
						self.options.onStart.apply(self, [e]);
				}
			});
		}

		static isValidFileDrag(event) {

			let dt = event.dataTransfer,
			// do not check dt.types.contains in webkit, because it crashes safari 4
				isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;

			// dt.effectAllowed is none in Safari 5
			// dt.types.contains check is for firefox
			return dt && dt.effectAllowed !== 'none' &&
				(dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));

		}

	};

});
sky.service("ajaxFilesIFrame", function() {

	let AjaxFilesIFrame = function(options) {

		/* Save options */
		this.options 	= options;
		this.files    	= options.files;
		this.input   	= options.input;
		this.url  	 	= options.url;
		this.data 	 	= options.data;
		this.callbacks 	= options.callbacks;

	};

	AjaxFilesIFrame.prototype = {

		getName: function(name){

			// get input value and remove path to normalize
			return name.replace(/.*(\/|\\)/, "");

		},

		cancel: function(id){

			this.options.onAbort(id, this.getName(this.input.value));

			this.IFrame.setAttribute('src', 'javascript:false;').remove();

		},

		/**
		 * Upload file function
		 */
		send: function() {

			/* letiables */
			let self 	 = this;
			let input 	 = this.input;
			let fileName = this.getName(input.value);

			/* Create new input */
			$(input).clone().val("").insertBefore(input);

			/* Create elements */
			this.IFrame = this.createIframe();
			this.form = this.createForm(this.IFrame, this.options.data).append(input);

			this.attachLoadEvent(this.IFrame, function() {

				let response = self.getIframeContentJSON(self.IFrame);

				if(response) self.options.onSuccess(response);

				// timeout added to fix busy state in FF3.6
				setTimeout(function(){ self.IFrame.remove(); }, 1);

			});

			this.form.trigger("submit");

		},

		/**
		 * Attach load event to IFrame
		 */
		attachLoadEvent: function(iframe, callback){

			iframe.load(function(){

				if (!this.parentNode) return;

				// fixing Opera 10.53
				if (this.contentDocument &&
					this.contentDocument.body &&
					this.contentDocument.body.innerHTML === "false") return;

				callback();

			});

		},

		/**
		 * Returns json object received by IFrame from server.
		 */
		getIframeContentJSON: function(iframe){

			/* IFrame.contentWindow.document - for IE<7 */
			let doc = iframe.get(0).contentDocument ? iframe.get(0).contentDocument: iframe.get(0).contentWindow.document;

			let response = doc.body.innerHTML

			/* Check for empty response */
			if(response === "") {
				if(self.callbacks) self.callbacks.onError("Данные небыли переданы"); // No data
				return false;
			}


			/* Try to get json data */
			try {
				response = jQuery.parseJSON(response);
			} catch(e) {
				if(self.callbacks) {
					self.callbacks.onError("Неверный формат данных"); // No data
					console.log(response);
				}
				return false;
			}

			/* If response returned with error */
			if(response.error) {
				if(self.callbacks) self.callbacks.onError(response.text); // Execute user error handler
				return false;
			}

			return response;
		},

		/**
		 * Creates IFrame with unique name
		 */
		createIframe: function() {

			return $('<IFrame/>', { src: "javascript:false;", name: "uploadIFrame" + Math.floor(Math.random()*1000000) }).css("display", "none").appendTo('body');

		},

		/**
		 * Creates form, that will be submitted to IFrame
		 */
		createForm: function(iframe, params) {

			let queryString = this.url + "?" + jQuery.param(params);

			return $('<form/>', {
				method: "post", enctype: "multipart/form-data", action: queryString, target: iframe.attr("name")
			}).css("display", "none").appendTo('body');

		}

	};

});
/**
 * Module to work with ajax file upload
 */
sky.service("ajaxFiles", function({ callbacks, supported, ajaxFilesXHR, ajaxFilesIFrame }) {

	/**
	 * Class to work with dynamic file upload
	 * @param {html|string} input Input to be used to upload
	 * @param {string} url Url to upload
	 * @param {object} data Data to be send with request
	 */
	let AjaxFiles = this.service = function(input, url, data) {

		/* Self construct */
		if(!(this instanceof AjaxFiles))
			return new AjaxFiles(input, url, data);

		/* Save items */
		this.inputs 	= $(input);
		this.url   		= url;
		this.data  		= data;
		this.callbacks 	= callbacks();
		this.files		= [];

		/**
		 * Function to handle file input change
		 */
		this.saveFiles = function(input) {

			/* Get files list */
			if(supported.XHRUpload) {

				/* Get files from event */
				let files = input.get(0).files;

				/* Save them to this */
				for(let file of files)
					this.files.push({ file: file, input: input, inputName: input.attr("name") });

			} else this.files.push(input.get(0));

		};

		/**
		 * Sends ajax files
		 * @param {bool} parallel If try files would be send in parallel
		 * @returns {*}
		 */
		this.send = function(parallel) {

			/* Clear */
			this.files = [];

			/* Get files list */
			this.inputs.each((_, input) => { this.saveFiles($(input)); });

			/* If no files */
			if(!this.files.length)
				return false;

			/* Create supported handler */
			let handler;
			if(supported.XHRUpload)
				handler = new ajaxFilesXHR(this);
			else
				handler = new ajaxFilesIFrame(this);

			/* Send files */
			if(parallel)
				this.sendParallel(handler);
			else
				this.sendConsequentially(handler);

			/* return send handler */
			return handler;

		};

		/**
		 * Sends files consequentially
		 * @param handler
		 */
		this.sendConsequentially = function(handler) {

			/* First id */
			let id = 0;

			/* Set sending next after this one */
			this.callbacks.on("always", () => {
				id++;
				if(this.files[id])
					handler.send(this.files[id]);
			});

			/* Send first */
			handler.send(self.files[id]);

		};

		/**
		 * Sends files parallel
		 * @param handler
		 */
		this.sendParallel = function(handler) {

			/* Send files through them */
			for(let file of this.files)
				handler.send(file);

		};

		/* Self return */
		return this;

	};

	/**
	 * Performs default file send
	 * @param {string} url
	 * @param element
	 * @param data
	 */
	AjaxFiles.defaultSend = function(url, element, data) {

		// Get input
		let input = element.is("input[type=file]") ? element : element.closest("label, .label").find("input[type=file]"),
			exceptions = sky.service("exceptions"),
			templates = sky.service("templates"),
			notifications = sky.service("notifications"),
			windows = sky.service.windows("windows");

		// Check
		if(!input.length)
			throw new exceptions.system.Error("No proper input provided for file send");

		// Init
		let filesAjax = AjaxFiles(input, url, data),
			modal = windows.getLast(),
			currentFile;

		/*  Bind events */
		filesAjax.callbacks
			.on("begin", function (file) {
				if(modal) {
					modal.holder.find(".preview").remove();
					modal.lock();
				}
				currentFile = templates.render("files-single-upload", file).insertAfter(element.parent());
			})
			.on("always", function () {
				currentFile.remove();
				if(modal)
					modal.unlock();
			})
			.on("notSuccess", function (error) {
				modal.clearExceptTemplate();
				notifications.message({text: error}).appendToModal(modal);
			})
			.on("progress", function (totalPercent, percent) {
				currentFile.find(".total").html(percent + "%");
				currentFile.find(".progressBar div").css("width", percent + "%");

				// If loaded
				if (percent === 100)
					currentFile.find(".total").html("100%, обработка");


			})
			.on("start", function () {

			});

		/* Send */
		filesAjax.send();
		return filesAjax;

	};

});
/** Sends file data via HttpRequest */
sky.service("ajaxFilesXHR", function({supported, ajax, stackList}) {
	this.service = class {
		constructor(options) {

			/* Save options */
			this.options 		= options;
			this.files 			= options.files;
			this.input 			= options.input;
			this.url 			= options.url;
			this.data 			= options.data;
			this.callbacks 		= options.callbacks;
			this.toProceed 		= options.files.length;
			this.inProgress 	= 0;
			this.total 			= options.files.length;
			this.totalLoaded 	= 0;
			this.totalSize 		= 0;
			this.totalPercent 	= 0;
			this.current 		= 0;
			this.fileRequests 	= stackList();

			/* Go through */
			for(file of options.files)
				this.totalSize += file.size;

		}

		/**
		 * Get file name
		 * @param {*} file File
		 * @returns {string}
		 */
		static getName(file) {
			return file.name.replace(/.*(\/|\\)/, "");
		}

		/**
		 * Uploads file
		 * @param {*} file File name in files stack
		 */
		send(file) {

			/* This obj will store data associated with XHR */
			$.extend(file, {
				id     : Math.random(),
				name   : this.getName(file.file),
				size   : file.file.size,
				ajax   : false,
				percent: false,
				loaded : 0
			});

			/* Prepare params */
			let self        = this,
				params      = this.data || {},
				queryString = this.url + "?ajaxFile=" + file.name + "&" + jQuery.param(params);

			/**
			 * Params extend
			 * @param {object} args Object to be extended
			 * @returns {*}
			 */
			this.extend = function(args) {
				return jQuery.extend(args, {
					totalLoaded : self.totalLoaded,
					totalSize   : self.totalSize,
					totalPercent: self.totalPercent,
					file        : file,
					loaded      : file.loaded,
					size        : file.size,
					percent     : file.percent,
					toProceed   : self.toProceed,
					current     : self.current,
					total       : self.total
				});
			};

			/* Send */
			if(supported.formData) {

				/* Create form data sender */
				let form = new FormData();
				form.append(file.inputName, file.file);

				/* Send start */
				file.ajax = ajax(queryString, form, { ajaxExtend: {
						processData: false,
						contentType: false,
						type       : "POST",
						xhr        : (() => {
							try {

								/* Create XHR */
								let xhr = new XMLHttpRequest();

								/* Set special upload api handlers */
								xhr.upload["onloadstart"] = function() {
									this.inProgress++;
									this.callbacks.fire("begin", this.extend({}));
								};
								xhr.upload["onprogress"] = function(event) {
									this.totalLoaded += event.loaded - file.loaded;
									this.totalPercent = (this.totalLoaded / this.totalSize * 100).toFixed(0);
									this.onProgress(event, file);
								};

								/* Return create XHR */
								return xhr;

							} catch(e) {
								return undefined;
							}
						}).safe()
					}
				});

			} else {

				/* Send start */
				file.ajax = ajax(queryString, file.file, {
					processData: false,
					contentType: false,
					type       : "POST",
					beforeSend : sky.func(function(jqXHR) {
						jqXHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						jqXHR.setRequestHeader("X-File-Name", encodeURI(file.name));
						jqXHR.setRequestHeader("Content-Type", "multipart/form-data");
						jqXHR.setRequestHeader("Content-Disposition", 'attachment; filename="' + encodeURI(file.name) + '"');
						jqXHR.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9");
					})
				});

			}

			/* Set ajax callbacks */
			file.ajax.on({
				success:	(all) => { this.callbacks.fire("success", this.extend(all)); },
				error: 		(all) => { this.callbacks.fire("error", this.extend(all)); },
				notSuccess: (all) => { this.callbacks.fire("notSuccess", this.extend(all)); },
				always: 	(all) => {

					/* Counters */
					this.inProgress--;
					this.toProceed--;

					/* Call always method */
					this.callbacks.fire("always", this.extend(all));

					/* Delete connection */
					this.fileRequests.delete(file);

				}
			});

			/* Save */
			this.fileRequests.add(file);

		}

		/**
		 * Fores on progress change
		 * @param event
		 * @param fileRequestData
		 */
		onProgress(event, fileRequestData) {

			/* Count percentage */
			let percent = (event.loaded / event["total"] * 100).toFixed(0);
			fileRequestData.loaded = event.loaded;

			/* If percent changed */
			if(percent !== fileRequestData.percent && event["lengthComputable"]) {
				fileRequestData.percent = percent;
				this.callbacks.fire("progress", this.extend({}));
			}

		}

		/**
		 * Aborts current download
		 */
		abort() {

			/* Stop each request */
			this.fileRequests.each(request => { request.ajax.stop() });

			/* Call always method */
			this.callbacks.fire("abort", this.extend({}));

		}

	};

});
sky.service("callback", function() {

	/**
	 * Creates callback object that holds functions list
	 * @param {string} [flags]
	 * @returns {*}
	 * @constructor
	 */
	let Callback = function(flags) {

		/* Self construct */
		if(!(this instanceof Callback))
			return new Callback(flags);

		/**
		 * Functions list holder
		 * @type {Array}
		 */
		this.functions = [];
		this.toRun =  0;
		this.context = this;

		/* Self return for next usage */
		return this;

	};

	/**
	 * Base
	 * @type {{functions: Array, toRun: number, context: *, add: add, removeByContext: removeByContext, fire: fire, fireNext: fireNext}}
	 */
	Callback.prototype = {

		/**
		 * Adds new function to stack
		 * @param {Function} func Function to add
		 * @param {Object} context Function context
		 * @param {Object} options Call options
		 */
		add: function(func, context, options) {
			this.functions.push({
				func: func,
				context: context || false,
				once: options && options.once
			});
			return this;
		},

		/**
		 * Removes function from list by context
		 * @param context
		 */
		removeByContext: function(context) {

			/* Find listener */
			$.each(this.functions, function(i, current) {
				if(current.context === context)
					this.functions.splice(i, 1);
			}.bind(this));

			/* Self return */
			return this;

		},

		/**
		 * Fires all functions
		 * @param {Object} context Function context
		 * @param {Array} args Arguments
		 */
		fire: function(context, args) {
			$.each(this.functions, function(_, func) {
				func.func.apply(func.context || context, args);
			});
		},

		/**
		 * Fires next function
		 * @param {Array|Object} args Arguments
		 * @param {Object} context Function context
		 */
		fireNext: function(args, context) {

			/* If no more to run */
			if(this.functions.length <= this.toRun)
				return false;

			/* Set next to run */
			this.toRun++;

			/* Function to run */
			let current = this.functions[this.toRun - 1],
				result,
				func = current.func;

			/* Set context */
			context = current.context || context || window;

			/* Get function in string */
			if(typeof func === "string")
				func = context[func];

			/* If no function found */
			if(!func)
				return true;

			/* Call function */
			result =  func.apply(current.context || context, args) !== false;

			/* If call once */
			if(current.once) {
				this.functions.splice(this.toRun - 2, 1);
				this.toRun--;
			}

			/* Return function result */
			return result;
		}

	};

	this.service = Callback;

});
sky.service("callbacks", function({ callback }) {

	/**
	 *
	 * Callbacks prepared object
	 * @param {*} [flags] Flags list for jQuery.Callbacks
	 * @constructor
	 */
	let Callbacks = function(flags) {

		/* Self construction */
		if(!(this instanceof Callbacks))
			return new Callbacks(flags);

		/* Add properties */
		$.extend(true, this, Callbacks.extend);

		/* Callbacks list */
		this.advancedCallbacks = {};

		/* Set default flags and self context */
		return this.flags(flags);

	};

	/**
	 * Prototype
	 * @type {{on: on, fire: fire, off: off, flags: flags, setContext: setContext}}
	 */
	Callbacks.prototype = {

			/**
			 * Flags for sky.Callback
			 * @param {object} flags Flags list
			 * @returns {*}
			 */
			flags: function(flags) {
				this.callbacksFlags = flags;
				return this;
			},

			/**
			 * Remove by listener
			 * @param {string} name Event name
			 * @param {string} listener Listener object
			 */
			removeListener: function(name, listener) {
				if(this.advancedCallbacks[name]) {
					this.advancedCallbacks[name].removeByContext(listener);
				}
			},

			/**
			 * Adds new event handler
			 * @param {string} 	 name 			Name of event
			 * @param {function|string} func 	Function be called on event fires
			 * @param {object}   [context]		Function options
			 * @param {object}   [options]		Function options
			 */
			on:  function(name, func, context, options) {


				if(name instanceof Object)
					$.each(name, (event, func) => { this.on(event, func) });

				else $.each(this.getEventsNames(name), (_, name) => {

					/* Create callbacks */
					if(!this.advancedCallbacks[name])
						this.advancedCallbacks[name] = callback(this.callbacksFlags);

					/* Add function */
					this.advancedCallbacks[name].add(func, context ? context : self.context, options || {});

				});

				return this;
			},

			/**
			 * Fires callbacks for specified event
			 * @param {string} name Name of event
			 * @param {object} args Arguments to be passed
			 * @param {object} [options] Additional options
			 */
			fire: function(name, args, options) {

				/* Success last */
				let events = this.getEventsNames(name),
					self = this,
					next = false;
					options = options || {};

				/* Remove global if need */
				if(options["noGlobal"])
					events = events.slice(1);

				/* Fire events */
				$.each(events, function(_, event) {

					/* If no callback */
					if(!self.advancedCallbacks[event])
						return;

					/* Run */
					do {
						next = self.advancedCallbacks[event].fireNext(jQuery.extend({ event: event }, args || []), self.context, options.possible);
					} while(next);

					/* Reset */
					if(!options.once)
						self.advancedCallbacks[event].toRun = 0;

				});

			},

			/**
			 * Get all event names from global name
			 * @param {String} name Global event name
			 * @returns {Array}
			 */
			getEventsNames: function(name) {

				/* Get events names */
				let names = name.split(","), events = [];

				/* Go through */
				$.each(names, function(i, name) {

					/* Remove spaces */
					name = name.replace(" ", "");

					/* Get elements */
					let elements = name.split(".");
					events.push(elements[0]);

					/* Go through */
					for(let j = 1; j < elements.length; j++)
						events.push(elements[0] + "." + elements[j]);

					/* Global event */
					if(elements.length > 2)
						events.push(elements.join("."));

				});

				/* Return */
				return events;

			},

			/**
			 * Removes event handlers and functions
			 * @param {string} name Event name
			 */
			off: function(name) {
				delete this.advancedCallbacks[name];
			}

		};

		this.service = Callbacks;

});
sky.service("directives", function ({exceptions}) {

	let list = {},
		directives = this.service = {

			/**
			 * Adds new directive
			 * @param {string} name Directive name
			 * @param {*} options Directive options
			 * @param {function} directive How to parse directive
			 */
			add: function (name, options, directive) {

				/* Reset */
				if (!directive && typeof options === "function") {
					directive = options;
					options = {};
				}
				options.directive = directive;
				options.selector = name;

				/* Save */
				list[name] = options;

				/* Self return*/
				return this;

			},

			/**
			 * Get element attributes
			 * @param element
			 * @returns {{}}
			 */
			getAttributes: function (element) {

				/* Holds attributes */
				let attributes = {};

				/* Copy them to list */
				$.each(element.get(0).attributes, function (_, attr) {
					attributes[attr.nodeName] = attr.nodeValue;
				});

				/* Return */
				return attributes;

			},

			/**
			 * Applies directive convert to element
			 * @param element
			 * @param options
			 */
			parseElement: function (element, options) {

				/* Get element */
				element = $(element);

				/* Get element attributes */
				let attributes = this.getAttributes(element);

				/* Parse body for jason data */
				if (options["json"] || options["jsonToData"]) {

					/* Get child */
					let jsonScript = element.children('script[type="application/json"]');

					/* If we have json encoded data */
					if (jsonScript.length) {

						try {

							/* Parse json */
							let json = JSON.parse(jsonScript.text());

							/* Extend */
							$.extend(attributes, json);

							/* Save to data */
							if (options["jsonToData"])
								element.data("json", json);

						} catch (e) {
							throw new exceptions.system.Error("Element " + options.selector + " should have json stored content, but error on parse appears");
						}
					}
				}

				/* Call parse function */
				if (typeof options.directive === "function")
					options.directive(element, attributes);
			},

			/**
			 * Searches and replaces directives in element
			 * @param element
			 */
			parse: function (element) {
				$.each(list, function (tag, options) {
					$(tag, element).each(function () {
						directives.parseElement(this, options);
					});
					if (element.is(tag))
						directives.parseElement(element, options);
				});
			}


		};

	/* Add jQuery fn */
	jQuery.fn.parseDirectives = function () {

		/* Parse */
		directives.parse(this);

		/* Return */
		return this;

	};

	/* Parse body for directives when all ready */
	sky.onReady(function () {
		$("body").parseDirectives();
	});

});
sky.service("history", function ({ callbacks, supported }) {


	/**
	 * Get difference fields in objects
	 * @param {object} first  Object to compare
	 * @param {object} second Object to compare
	 */
    let getObjectsDifference = function (first, second) {

		let difference = {},
		    localDiff = false;

        /* If both arrays or objects */
		if ((first instanceof Array && second instanceof Array) || (first instanceof Object && second instanceof Object)) {

            /* Find what was changed or deleted in second */
			$.each(first, function (key, value) {

                /* If no such elements in second */
				if (typeof second[key] === "undefined")
					difference[key] = null; // Set to null

                /* Check if different */
				else if (localDiff = getObjectsDifference(value, second[key])) {
					difference[key] = localDiff;
				}

			});

            /* If was added */
			$.each(second, function (key, value) {
				if (typeof first[key] === "undefined")
					difference[key] = value;
			});

            /* Convert object to array */
			if (first instanceof Array) {
				let returnArray = [];
				$.each(difference, function (key) {
					returnArray.push(difference[key]);
				});
				difference = returnArray;
			}

		} else {
			if (first !== second) return second;
			else return false;
		}

        /* No array difference */
		if (difference.length === 0) return false;
		else return difference;

	};

    /**
     * History constructor
     * @param [options]
     * @returns {sky.History}
     * @constructor
     */
    sky.History = function (options) {

		/* Self creation */
        if (!(this instanceof sky.History))
            return new sky.History(options);

		/* Reset */
        this.options = options || {};

		/* Set events */
        this.events = this.options.events || new callbacks();
        this.options.events = this.events;

		/* Self return */
        return this;

    };

    /**
     * Extending
     */
    $.extend(sky.History.prototype, {

        /**
         * Stores last saved hash
         */
        hashString: "",

        /**
         * Stores last saved search
         */
        searchString: "",

        /**
         * Stores last saved path
         */
        pathString: "",

        /**
         * Stores object with hash params key/value pairs
         */
        hashObject: {},

        /**
         * Stores object with page search params key/value pairs
         */
        searchObject: {},

        /**
         * Stores events
         */
        events: undefined,

        /**
         * Holds hash check function interval id
         */
        intervalId: 0,

        /**
         * This page base url
         */
        base: "",

        /**
         * Changes current path to specified
         * @param {string} path PAth to navigate
         */
        navigate: function (path) {

            // Get path
            path = path.replace("~", this.base);

            // Get current
            let current = (window.location.pathname + window.location.search).substr(this.base.length);

            // If changes
            if (current !== path) {

                // Set new state
                history.pushState({ oldPath: this.pathString, newPath: path, search: this.searchObject}, path, path);

                // Get new
                this.pathString = window.location.pathname.substr(this.base.length);

                // Get search string
                this.searchString = this.getWindowSearch();

                // Fire event
                this.events.fire("navigate.path, always", {hash: this.hashObject, path: this.pathString, search: this.searchObject});

            }
        },

        /**
         * Fires on path change
         */
        change: function () {

			/* Hash difference holder */
            let hashDifference = {},
                searchDifference = {},
                old = this.pathString,
                hashChanged = false,
                searchChanged = false;

			/* If api supported */
            if (this.supported)
                this.pathString = window.location.pathname.substr(this.base.length);

			/* Check if hash changed */
            if (this.hashString !== this.getWindowHash()) {

				/* Get difference */
                hashDifference = this.getDifference(this.getWindowHash(), this.hashObject);

				/* Hash change flag */
                hashChanged = true;

            }

			/* Check if params changed */
            if (this.searchString !== this.getWindowSearch()) {

				/* Get difference */
                searchDifference = this.getDifference(this.getWindowSearch(), this.searchObject);

				/* Hash change flag */
                searchChanged = true;

            }

			/* If nothing changed */
            if (this.pathString === old && !hashChanged && !searchChanged)
                return;

			/* Rebuild hash object on new hash str */
            this.rebuild();

			/* Fire */
            this.events.fire("change, always", {
                hash: this.hashObject,
                hashDifference: hashDifference,
                searchDifference: searchDifference,
                path: this.pathString,
                oldPath: old,
                searchChanged: searchChanged,
                hashChanged: hashChanged,
                pathChanged: old !== this.pathString
            });

        },

        /**
         * Navigates to specified path
         * @param path
         */
        setHash: function (path) {

			/* To not jump top */
            if (path === "" && window.location.hash !== "")
                path = "none";

			/* Save */
            this.hashString = path;

			/* Set hash */
            window.location.hash = encodeURI(path);//encodeURI(path);

        },

        /**
         * Navigates to specified path
         * @param path
         */
        setSearch: function (path) {

			/* Set path */
            this.navigate(window.location.pathname + encodeURI(path !== "" ? "?" + path : ""));

        },

        /**
         * Sets hash letiable
         * @param {object}    elements Fields to be set
         * @param {boolean}    [force]     Replace all stored fields with elements object
         */
        set: function (elements, force) {

            let changed = false;

			/* Force rewrite */
            if (force)
                this.hashObject = elements;

			/* Go through elements and add or change them */
            $.each(elements, (key, value) => {

				/* If we need delete */
                if (value === null)
                    delete this.hashObject[key];
                else
                    this.hashObject[key] = value;

				/* Set as changed */
                changed = true;

            });

			/* If any changes we rebuild hash */
            if (changed || force)
                this.setHash(decodeURIComponent(jQuery.param(this.hashObject).replace(/\+/g, " ")));

			/* Fire */
            this.events.fire("set, always", {elements: elements, hash: this.hashObject, path: this.pathString});

        },


        /**
         * Sets hash letiable
         * @param {object}    elements Fields to be set
         * @param {boolean}    [force]     Replace all stored fields with elements object
         */
        search: function (elements, force) {

            let changed = false;

			/* Force rewrite */
            if (force)
                this.searchObject = elements;

			/* Go through elements and add or change them */
            $.each(elements, $.proxy(function (key, value) {

				/* If we need delete */
                if (value === null)
                    delete this.searchObject[key];
                else
                    this.searchObject[key] = value;

				/* Set as changed */
                changed = true;

            }, this));

			/* If any changes we rebuild hash */
            if (changed || force)
                this.setSearch(decodeURIComponent(jQuery.param(this.searchObject).replace(/\+/g, " ")));

			/* Fire */
			this.events.fire("set, always", {elements: elements, hash: this.hashObject, path: this.pathString});

        },

        /**
         * Makes hash from object
         * @param obj
         * @returns {*|void|string|XML}
         */
        stringFromObject: function (obj) {
            return jQuery.param(obj).replace(/\+/g, " ");
        },

        /**
         * Get objects according to hash string
         * @param {string} paramsString String which contains key=value pairs, would be parsed to object
         */
        getObjects: function (paramsString) {

            let objects = {};

			/* Remove sharp */
            if (paramsString.substr(0, 1) === '#' || paramsString.substr(0, 1) === '?')
                paramsString = paramsString.slice(1, paramsString.length);

			/* Split parameters */
            let subStrings = paramsString.split("&");

			/* Get params */
            $.each(subStrings, function (i, str) {

                let keyAndValue = str.split("=", 2);

				/* If no assign */
                if (keyAndValue.length < 2)
                    return;

                let name = keyAndValue[0];

				/* Truncate brackets */
                if (name.substr(-2) === "[]")
                    name = name.substr(0, name.length - 2);

				/* Special hash for "=" in value  */
                keyAndValue[1] = str.substr(keyAndValue[0].length + 1);

				/* If object repeats we create array */
                if (typeof objects[name] === "undefined") objects[name] = keyAndValue[1];
                else {
                    if (!(objects[name] instanceof Array)) objects[name] = [objects[name]];
                    objects[name].push(keyAndValue[1]);
                }
            });

            return objects;

        },

        /**
         * Finds difference between current stored hash and parameter
         * @returns {*}
         */
        getDifference: function (string, stored) {

			/* Init */
            let objects = this.getObjects(decodeURI(string));
            return getObjectsDifference(stored, objects);

        },

        /**
         * Rebuilds stored hash parameters according to current one
         */
        rebuild: function () {
            this.hashString = this.getWindowHash();
            this.hashObject = this.getObjects(this.hashString);
            this.searchString = this.getWindowSearch();
            this.searchObject = this.getObjects(this.searchString);
            this.pathString = window.location.pathname;
            return this;

        },

        /**
         * Gets current window hash without "#"
         * @returns {string}
         */
        getWindowHash: function () {

			/* Get decoded hash */
            let hash = decodeURI(window.location.hash);

			/* Remove sharp */
            if (hash.substr(0, 1) === '#')
                hash = hash.slice(1);

			/* Return */
            return hash;

        },

        /**
         * Gets current window parameters without "?"
         * @returns {string}
         */
        getWindowSearch: function () {

			/* Get decoded hash */
            let search = decodeURI(window.location.search);

			/* Remove question */
            if (search.substr(0, 1) === '?')
                search = search.slice(1);

			/* Return */
            return search;

        },

        /**
         * Set interval execution
         */
        start: function () {

            /* Set base if any */
			if (this.options.base)
				this.base = this.options.base;

			/* If supported history */
            if (window.history)
                window.onpopstate = this.change.bind(this);

            /* Timeout */
            if (!this.intervalId)
                this.intervalId = setInterval(this.change.bind(this), this.options.time || 500);

			/* Immediately event */
            this.change();
            return this;
        }

    });

});
sky.service("localStorage", function({ callbacks }) {

	/**
	 * Local storage class
	 * @param {Object} options Creation options
	 * @param {sky.Callbacks} [events] Events handler
	 * @returns {*}
	 * @constructor
	 */
	let LocalStorage = this.service = function(options, events) {

		/* If already */
		if(options instanceof LocalStorage)
			return options;

		/* Self creating if not in constructor */
		if(!(this instanceof LocalStorage))
			return new LocalStorage(options, events);

		/* Options */
		options = options || {};

		/* Set default name */
		if(!options.name)
			options.name = "global";

		/* Set prefix */
		if(!options.prefix)
			options.prefix = options.name;

		/* Set full name */
		this.fullName = ["sky", options.name].join("-");

		/* Stored item prefix */
		this.itemPrefix = ["sky", options.prefix].join("-");

		/* Get events */
		this.events = events || new callbacks();

		/* Ids list */
		this.ids = false;

		/* Return */
		return this;

	};

	/**
	 * Extending
	 */
	$.extend(LocalStorage.prototype, {

		/**
		 * Loads item form database
		 * @param {*} id Unique id
		 * @param {function} [onLoad] Calls when load complete
		 */
		load: function(id, onLoad) {

			/* Try to get item from storage */
			let item = localStorage.getItem([this.itemPrefix, id].join("-"));

			/* Trigger error */
			if(item === null)
				this.events.fire("load.error", { id: id, storage: this });

			/* Call function */
			if(onLoad)
				onLoad(item ? $.parseJSON(item) : undefined);

			/* Return */
			return item ? $.parseJSON(item) : undefined;

		},

		/**
		 * Get all ids from database
		 * @returns {*}
		 */
		getIds: function() {

			/* If already stored */
			if(this.ids instanceof Array)
				return this.ids;

			/* Gets ids list by key */
			let itemsIds = localStorage.getItem(this.fullName), self = this;

			/* SAve and return */
			itemsIds = itemsIds ? itemsIds.split(", ") : [];
			this.ids = [];

			/* remove duplicates */
			$.each(itemsIds, function(_, id) {
				if(self.ids.indexOf(id) < 0)
					self.ids.push(id);
			});

			/* return */
			return this.ids;

		},

		/**
		 * Loads all element from storage
		 * @param onLoad
		 */
		loadAll: function(onLoad) {

			/* Item holder */
			let self = this, items = {};

			/* Go through items */
			$.each(this.getIds(), function(_, id) {

				/* Get item */
				self.load(id, function(item) {

					/* Add parsed */
					if(item) items[id] = item;
					else delete self.ids[id];

				});

			});

			/* Trigger error */
			if(!self.ids.length)
				this.events.fire("empty", { storage: this });

			/* Return */
			onLoad.call(this, items);

		},

		/**
		 * Save data to storage
		 * @param id
		 * @param data
		 * @returns {*}
		 */
		save: function(id, data) {

			try {

				/* Save item */
				localStorage.setItem([this.itemPrefix, id].join("-"), JSON.stringify(data));

				/* Get ids */
				let ids = this.getIds();

				/* Save id */
				if(ids.indexOf(id) < 0)
					ids.push(id);

				/* Save keys */
				localStorage.setItem(this.fullName, ids.join(", "));

				/* Trigger event */
				this.events.fire("save.success", { storage: this, data: data, id: id });

			} catch(e) {
				console.log(e);
			}

			/* Self return */
			return this;

		},

		/**
		 * Saves all
		 * @param index
		 * @param models
		 * @returns {*}
		 */
		saveAll: function(index, models) {
			let self = this;

			/* Go through */
			$.each(models, function() {
				self.save(this.attr(index), this.attributes);
			});

			return this;
		},

		/**
		 * Removes from storage
		 * @param id
		 * @returns {*}
		 */
		remove: function(id) {

			/* Init */
			let index,
				ids = this.getIds(); // Get ids

			/* Remove item */
			localStorage.removeItem([this.itemPrefix, id].join("-"));

			/* Remove from list */
			if((index = ids.indexOf(id)) > -1) {

				/* Remove id */
				ids.splice(index, 1);

				/* Save keys */
				localStorage.setItem(this.fullName, ids.join(", "));

				/* Trigger event */
				this.events.fire("success.remove", { storage: this, id: id });

			}
			/* If no id */
			else
				this.events.fire("remove.error", { storage: this, id: id });


			/* Self return */
			return this;

		}
	});

});
sky.service("stackList", function() {
	let List = this.service = function() {

		if(!(this instanceof List))
			return new List();

		let elements = {};
		let lastId = 0;
		let total = 0;

		this.last = function() {

			/* Holder */
			let last = false;

			/* Apply for windows */
			$.each(elements, function (_, element) { last = element });

			/* Return */
			return last;

		};

		this.add = function(element) {
			lastId++;
			total++;
			element[lastId] = element;
		};

		this.remove = function(element) {
			/* Apply for windows */
			$.each(elements, function (index, current) {
				if(element === current) {
					delete elements[index];
					total--;
				}
			});
		};

		this.total = function() {
			return total;
		};

		this.elements = function() {
			return elements;
		};

		this.each = function(callback) {
			for(let single of elements)
				callback.apply(single, single);
		};

	}
});
/**
 * Module to work with user services
 */
sky.service("supported", function () {
	try {
		this.service.fullScreen = typeof document["webkitIsFullScreen"] !== "undefined";
		this.service.formData = window.FormData && true;
		this.service.XHRIsSupported = XHRIsSupported;
		this.service.XHRUpload = (typeof new XMLHttpRequest().upload !== "undefined");
		this.service.localStorage = !!window.localStorage;
	} catch (e) {}
});
sky.service("templates", function({ localStorage, supported, directives, exceptions }) {

	
	let templatesList = {},
		templatesCompiled = {},
		Templates = this.service = {

		/** Globals list */
		globals : {},

		/** Local storage support */
		storage: supported.storage ? localStorage({ name: "jsTemplates" }) : false,

		/**
		 * Adds new template to list
		 * @param options
		 */
		add: function(options) {
			templatesList[options.name] = options.template;
			if(this.storage) {
				this.storage.save(options.name, templatesList[options.name]);
				//$.cookie("storedTemplates-" + options.name, options.date);
			}
		},

		/**
		 * Renders specified template
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		renderWithHolder: function(name, data, noDirectives) {

			/* Compile template */
			this.compile(name);

			/* Add globals */
			data = jQuery.extend(true, {}, data, { globals: this.globals });

			/* Render */
			let temp = $('<div/>').append(templatesCompiled[name].render(data));

			/* Parse directives */
			if(!noDirectives)
				directives.parse(temp);

			/* Return */
			return temp;

		},

		/**
		 * Renders specified template
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		render: function(name, data, noDirectives) {

			/* Compile template */
			return this.renderWithHolder(name, data, noDirectives).children();

		},

		/**
		 * Renders specified template and returns text
		 * @param {String} name Template name
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {*}
		 */
		renderToText: function(name, data, noDirectives) {

			/* Compile template */
			return this.renderWithHolder(name, data, noDirectives).html();

		},

		/**
		 * Renders template by its text as parameter
		 * @param {string} text Template text
		 * @param {Object} data Inner data
		 * @param {bool} [noDirectives]
		 * @returns {XMLList|*}
		 */
		renderByText: function(text, data, noDirectives) {

			/* Add globals */
			data = jQuery.extend(true, data, { globals: this.globals });

			/* Render */
			let temp = $('<div/>').append(twig({ data: text }).render(data));

			/* Parse directives */
			if(!noDirectives)
				directives.parse(temp);

			/* Return */
			return temp.children();

		},

		/**
		 * Renders template by its text as parameter
		 * @param {string} text Template text
		 * @param {Object} data Inner data
		 * @param noDirectives
		 * @returns {XMLList|*}
		 */
		renderByTextToText: function(text, data, noDirectives)  {
			return $('<div/>').append(this.renderByText(text, data, noDirectives)).html();
		},

		/**
		 * Compiles specified template
		 * @param {string} name Template name
		 */
		compile: function(name) {

			/* If already compiled */
			if(templatesCompiled[name])
				return;

			/* Load */
			this.load(name);

			/* Compile */
			let compiled = twig({ id: name, data: templatesList[name] });

			/* Check */
			if(!compiled)
				throw new exceptions.system.Error('Error during compiling template "' + name + '"');

			/* Save */
			templatesCompiled[name] = compiled;

		},

		/**
		 * Loads specified template
		 * @param {string} name Template name
		 */
		load: function(name) {

			/* Loaded */
			let fromLS;

			/* Try to load from storage */
			if(!templatesList[name] && this.storage && (fromLS = this.storage.load(name)))
				return templatesList[name] = fromLS;

			/* If already compiled */
			if(templatesList[name])
				return templatesList[name];

			/* Load template */
			if(!(templatesList[name] = $('script[type="text/template"][id='+ name +']').html()))
				throw new exceptions.system.Error("Can't find template – "  + name);

			/* Save to LS */
			if(this.storage)
				this.storage.save(name, { template: templatesList[name] });

			/* Return */
			return templatesList[name]

		}

	};

	/**
	 * Load templates on ready
	 */
	$(document).on("ready", sky.func(function() {

		/* Find templates and save them */
		$('script[type="text/template"]').each(function() {
			let self = $(this);
			Templates.add({
				name        : self.attr('id'),
				template    : self.html()
				//dependencies: self.attr('dependencies') ? self.attr('dependencies').replace(" ", "").split(",") : false
			});
		});

		/* Save templates files data */
		if(window.page.data["templates"] && Templates.storage) {
			$.each(window.page.data["templates"], function() {
				$.cookie("storedTemplates-" + this.path, this.date);
			});
		}

	}));

});

sky.service("tips", function({ stackList, callbacks }) {

    /** Class to work with tips */
    let list = stackList(),
        tips = this.service = {

        /**
         * Hides all visible tips
         * @param withoutAutoHide
         */
        hideAll: function(withoutAutoHide) {

            /* Hide all tips */
            $.each(list.elements(), function(_, tip) {
                if(withoutAutoHide || tip.autoHide)
                    this.hide();
            });

        },

        /**
         * Returns last open window if any
         * @returns {tips.Tip|boolean}
         */
        getLast: function() {
            list.last();
        },

        /**
         * Add show/hide functions
         * @param {string}            selector            Object to bind tips for
         * @param {string}            align                Align of tip
         * @param options
         * @see tips.tip
         */
        bind: function(selector, align, options) {

            /* Create binds */
            $(selector).on({
                "mouseenter": function() {
                    let tip = $(this).data("tip") || tips.Tip(this, options).show(align);
                },
                "mouseleave": function() {
                    let tip = $(this).data("tip");
                    if(tip) tip.hide(align);
                }
            });

        },

        /**
         * Creates new tip object
         * @param {object}            object                Object to show tip for
         * @param autoHide
         * @param create
         * @param close
         * @param ajax
         * @param highlight
         * @constructor
         */
        Tip: function(object, { autoHide = true, create = false, close = false, ajax = false, highlight = false } = {}) {

            /* Auto construct */
            if(!(this instanceof tips.Tip))
                return new tips.Tip(object, { autoHide, create, close, ajax, highlight });

            /* Manual create tip by create function */
            if(typeof create === "function") {

                /* Create tip */
                this.tip = create(object);

                /* If no tip */
                if(!this.tip) return this;

            }

            /* Object set */
            this.object = $(object).data("tip", this);

            /* Save callbacks */
            this.callbacks = callbacks();

            /* Auto hide */
            this.autoHide = autoHide;

            /* Manual create tip by create function */
            if(typeof create !== "function") {

                /* Create tip */
                this.tip = $("<div/>").addClass("tip").append('<div class="tipContent"></div>').insertBefore(object);

                /* Title using */
                if(!create && this.object.attr('title'))
					create = this.object.attr('title');
                else if(!create)
					create = "Пожалуйста подождите";

                this.tip.find(".tipContent").append(create);

            }

            if(highlight)
                this.shadow = $('<div/>').css({ opacity: 0, position:"absolute", width: "100%", height: "100%", left:0 ,top:0, background: "rgba(0,0,0,0.5)" }).appendTo("body");

            /* If count down */
            if(typeof close === "number")
                this.closeTimeout = setTimeout(() => this.hide(), close);

            /* If close button */
            else if(close)
                $('<div/>').addClass('close').appendTo(this.tip).on("click", () => this.hide());

            /* If stop possible */
            if(ajax)  ajax.on("always", () => this.hide());

            /* Add to list */
            this.tip.css("display", "none");
			list.add(this);
            return this;

        }

    };

    /**
     * Extends tip
     */
    $.extend(tips.Tip.prototype, /** @lends tips.tip */ {

        /**
         * Shows tip according to type
         * @param {string} [align] Way it would be shown
         */
        show: function(align) {

            /* Back link */
            let self   = this;
            let offset = this.tip.css({left: "", top: "", marginLeft: "", marginTop: "", display: ""}).offset();

            /* Stop animation and shows */
            this.tip.stop();

            /* Save way to show */
            if(align) this.align = align;

            /* If shadow */
            if(this.shadow)
                this.shadow.stop().show().animate({opacity: 1}, 100);

            /* Different actions according to tip position */
            switch(this.align) {

                /* If show righter than input */
                case "right":
                {
                    this.tip.addClass("right").css({
                        marginLeft: this.object.offset().left + this.object.outerWidth() - offset.left,
                        marginTop : this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                        opacity   : 0
                    });
                    this.tip.animate({opacity: 1, marginLeft: "+=10"}, 100);
                    break;
                }
                /* If show righter than input */
                case "left":
                {
                    this.tip.addClass("left").css({
                        marginLeft: this.object.offset().left - offset.left - this.tip.outerWidth(),
                        marginTop : this.object.offset().top - offset.top + parseInt((this.object.outerHeight() - this.tip.outerHeight()) / 2),
                        opacity   : 0
                    });
                    this.tip.animate({opacity: 1, marginLeft: "-=10"}, 300);
                    break;
                }
                /* If show topper */
                case "top":
                {

                    // Count left offset
                    let left = this.object.offset().left - offset.left;

                    /* Reposition */
                    if(offset.left + left + this.tip.outerWidth() > $(window).outerWidth())
                        left = left - this.tip.outerWidth() + this.object.outerWidth();

                    /* Position */
                    this.tip.addClass("top").css({
                        marginLeft: left,
                        marginTop : this.object.offset().top - this.tip.outerHeight() - offset.top,
                        opacity   : 0
                    });

                    this.tip.animate({opacity: 1, marginTop: "-=10"}, 300);
                    break;
                }
                /* If show topper */
                case "bottom":
                {

                    let left = this.object.offset().left - offset.left;

                    /* Reposition */
                    if(offset.left + left + this.tip.outerWidth() > $(window).outerWidth())
                        left = left - this.tip.outerWidth() + this.object.outerWidth();

                    /* Position */
                    this.tip.addClass("bottom").css({
                        marginLeft: left,
                        marginTop : this.object.offset().top + this.object.outerHeight() - offset.top,
                        opacity   : 0
                    });

                    this.tip.animate({opacity: 1, marginTop: "+=10"}, 300);
                    break;
                }
                /* If we replace input with tip */
                case "instead":
                {
                    this.tip.css({
                        width  : this.object.outerWidth(),
                        height : this.object.outerHeight(),
                        display: "none"
                    });
                    this.object.fadeOut(100, function() {
                        self.tip.fadeIn(100);
                    }).get(0).blur();
                    break;
                }
                case "inside":
                {
                    this.tip.css({
                        width  : this.object.outerWidth(),
                        height : this.object.outerHeight(),
                        display: "none"
                    });
                    this.tip.css("opacity", 0).animate({opacity: 1}, 100);
                    break;
                }
                default:
                    break;
            }

            this.tip.css({left: "", top: ""});

            /* Self return */
            return this;

        },

        /**
         * Hides current tip
         */
        hide: function() {

            /* Remove count down if needed */
            if(this.closeTimeout)
                clearTimeout(this.closeTimeout);

            /* Stop animation */
            this.tip.stop();

            /* Get know how tip was shown */
            let align = this.align;

            /* Create end animation callback */
            let callback = () => {

                /* Delete record from global list */
                list.remove(this);

                /* Remove data */
                this.object.removeData("tip");

                /* Remove tip */
                this.tip.remove();

                /* Callback */
                this.callbacks.fire("hide", this);

            };

            /* If just shown */
            if(!align)
                callback();

            /* If shadow */
            if(this.shadow)
                this.shadow.animate({opacity: 0}, 100, () => { this.shadow.remove() });

            /* Right way hide */
            if(align === "right")
                this.tip.animate({opacity: 0, marginLeft: "+=10"}, 100, callback);

            /* Left way hide */
            if(align === "left")
                this.tip.animate({opacity: 0, marginLeft: "-=10"}, 100, callback);

            /* Instead way hide */
            if(align === "instead")
                this.tip.fadeOut({opacity: 0}, 200, callback);

            /* Top way hide */
            if(align === "top")
                this.tip.animate({opacity: 0, marginTop: "-=5"}, 200, callback);

            /* Bottom way hide */
            if(align === "bottom")
                this.tip.animate({opacity: 0, marginTop: "+=5"}, 200, callback);

            /* Inside way hide */
            if(align === "inside")
                this.tip.animate({opacity: 0}, 200, callback);

            /* Self return */
            return this;

        },

        /**
         * Gets tips dom
         * @returns {*}
         */
        get: function() {
            return this.tip;
        },

        /**
         * Sets tip text
         * @param {string|jQuery} text What to insert to tip body
         */
        set: function(text) {
            this.tip.children(".tipContent").html(text);
            return this;
        },

        /**
         * Adds something to tip
         * @param {string|jQuery} what What to append to tip body
         */
        add: function(what) {
            this.tip.children(".tipContent").append(what);
            return this;
        }

    });

});
sky.service("utils", function() {
	$.extend(sky, this.service = {

		/**
		 * Checks if object has same data
		 * @param first
		 * @param second
		 */
		isObjectsEqual: function(first, second) {

			/* Different types */
			if(typeof first !== typeof second)
				return false;

			/* If object or array we will compare each element */
			if(first instanceof Array || first instanceof Object) {
				let key;
				/* Check first */
				for(key in first) {
					if(!first.hasOwnProperty(key)) continue;
					if(typeof second[key] === "undefined") return false;
					else if(!this.isObjectsEqual(first[key], second[key])) return false;
				}

				/* Check second */
				for(key in second) {
					if(!second.hasOwnProperty(key)) continue;
					if(typeof first[key] === "undefined") return false;
				}

			} else if(first !== second) return false;    // For simple types

			/* All tests success */
			return true;

		},

		/**
		 * Adds zero
		 * @param value
		 * @returns {Number}
		 */
		addLeadingZero: function(value) {

			/* Parse */
			value = parseInt(value);

			/* Ad zero */
			if(value < 10)
				value = "0" + value;

			/* Val */
			return value;

		},

		encode: function(rawStr) {
			return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				return '&#'+i.charCodeAt(0)+';';
			});
		},

		/**
		 * Makes data to JSON past
		 * @param data
		 * @param [inputName]
		 * @returns {string}
		 */
		jsonData: function(data, inputName) {
			return '<script type="application/json"' + (inputName ? (' input-name="' + inputName + '"') : "") + '>' + sky.encode(JSON.stringify(data)) + '</script>';
		},

		prepareSelectData: function(items, func, { columnSplitOn = 6, maxColumns = 4 }) {

			let index = 0,
				groupHolder,
				compiled,
				columns = [],
				columnsCount = items.length / columnSplitOn;

			if(columnsCount < 1)
				columnsCount = 1;
			if(columnsCount > maxColumns)
				columnsCount = maxColumns;

			let perColumn = Math.ceil(items.length / columnsCount);

			$.each(items, function(_, item) {
				if(compiled = func({ item, index, column: columns.length })) {

					if (index % perColumn === 0) {
						groupHolder = [];
						columns.push(groupHolder);
					}

					groupHolder.push(compiled);
					index++;
				}
			});

			return index === 0 ? [] : {groups: columns}

		}
	});
});
sky.onReady(function({ validator }) {
	jQuery.fn.validForm = function() {
		return validator.validateForm(this);
	}.safe();
	jQuery.fn.validationRule = function(name, options) {
		return validator.addRule(this, name, options);
	}.safe();
	$(document).on("change keyup", "[data-validate]", function() {
		validator.validateElement($(this));
	});
});

sky.service("validator", function() {

	/**
	 * Main validation object
	 */
	let validator = this.service = {

		/**
		 * Validates specified form, or dom element
		 * @param form
		 */
		validateForm: function(form) {

			let pass = true,
				self = this;

			/* Go through all elements that need to be validate */
			form.find("input, select, textarea, .selectReplace, [data-validate]").filter(":visible").each(function() {

				/* Get element */
				let element = $(this);

				/* validate if needed to */
				if(self.shouldBeValidated(element) && !self.validateElement(element, form))
					pass = false;

			});

			/* Return result */
			return pass;

		},

		/**
		 * Add rule to specified element
		 * @param element
		 * @param name
		 * @param [options]
		 */
		addRule: function(element, name, options) {

			/* Get or make options and add rule */
			this.Options(element).addRule(name, options || {});

			/* Self return */
			return this;

		},

		/**
		 *
		 * Validates specified element
		 * @param {*} element Element to validate
		 * @param {*} [form] Form to validate
		 * @returns {boolean}
		 */
		validateElement: function(element, form) {

			let self = this,
				options = this.Options(element),
				totalPass = true,
				value = element.val(),
				lastError = false,
				firstError = false,
				lastSuccess = false,
				firstSuccess = false;

			/* Select replace */
			if(element.is(".selectReplace")) {
				let inputs = element.next().find("input:checked");
				if(!inputs.length)
					value = "";
				else if(element.is(".single"))
					value = element.next().find("input:checked").val();
				else
					value = element.next().find("input:checked").length ? "true" : "";
			}

			/* Go through rules */
			$.each(options.rules, function(name, ruleOverload) {

				/* Make compiled rule */
				let compiledRule = jQuery.extend(true, {}, self.rules[name] || self.Rule({}), ruleOverload || {});

				/* Execute message is needed */
				if(typeof compiledRule.message === "function")
					compiledRule.message = compiledRule.message.call(this);

				/* Check if element pass validation */
				let pass = self.validate(value, compiledRule, element, form);

				/* Perform action according to result */
				if(pass) {
					compiledRule.onSuccess(element, compiledRule);
					lastSuccess = compiledRule;
					if(!firstSuccess)
						firstSuccess = compiledRule;
				} else {
					compiledRule.onError(element, compiledRule);
					lastError = compiledRule;
					if(!firstError)
						firstError = compiledRule;
					totalPass = false;
				}

			});

			/* Total callbacks */
			if(totalPass)
				options.onSuccess(element, lastSuccess);
			else
				options.onError(element, firstError);

			/* Return true of element passed all validations */
			return totalPass;

		},

		/**
		 * Return true if element should be validated
		 * @param {*} element Element to validate
		 * @returns {boolean}
		 */
		shouldBeValidated: function(element) {
			return element.attr("data-validate") || element.data("validationOptions");
		},

		/**
		 * Return true if element passed validation
		 * @param element
		 * @param compiledRule
		 * @param form
		 * @returns {*}
		 * @param value
		 */
		validate: function(value, compiledRule, element, form) {
			return compiledRule.rule.call(compiledRule, value, element, form);
		}

	};

	/**
	 * Defaults
	 */
	validator.ruleDefaults = {

	};

	/**
	 * Defaults
	 * @type {{onSuccess: onSuccess, onError: onError}}
	 */
	validator.optionsDefaults = {

		/* Fires on success */
		onSuccess: function(element) {

			/* Remove error */
			element.removeClass(this.errorClass);

			/* Add success */
			if(this.successClass)
				element.addClass(this.successClass);

		},

		/* Fires on error */
		onError: function(element) {

			/* Add error */
			element.addClass(this.errorClass);

			/* Remove success */
			if(this.successClass)
				element.removeClass(this.successClass);

		}
	};

	/**
	 * Base rule object
	 * @param overload
	 * @returns {validator.Rule}
	 * @constructor
	 */
	validator.Rule = function(overload) {

		/* Self creation if needed */
		if(!(this instanceof validator.Rule))
			return new validator.Rule(overload);

		/* Dump rule to check validation */
		this.rule = function() { return true; };

		/* Dump message */
		this.message = "Это поле заполнено не верно";

		/* List of options to make validation according to */
		this.options = [];

		/* Fires on success */
		this.onSuccess = function(element) {};

		/* Fires on error */
		this.onError = function(element) {};

		/* Self extend with overload */
		jQuery.extend(this, overload);

		/* Return */
		return this;

	};

	/**
	 * List of default rules
	 * @type {{required: validator.Rule}}
	 */
	validator.rules = {
		required: validator.Rule({
			rule: function(value) {
				return !!value.length;
			},
			message: "Это поле необходимо заполнить"
		}),
		requiredIfFilled: validator.Rule({
			rule: function(value) {
				let item = $(this.options[0]);
				return item.is(":radio, :checkbox") ? !item.is(":checked") || value : item.val() === "" || value;
			},
			message: "Это поле необходимо заполнить"
		}),
		date: validator.Rule({
			rule: function(value) {
				return !value || (
					value.match(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}( \d{2}:\d{2}(:\d{2})?)?$/)
					);
			},
			message: "Дата указана неверно"
		}),
		period: validator.Rule({
			rule: function(value) {
				return !value || (
					value.match(/^\d{4}-\d{2}-\d{2}$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}$/) ||
					value.match(/^\d{2}.\d{2}.\d{4}\s*-\s*\d{2}.\d{2}.\d{4}$/) ||
					value.match(/^\d{4}-\d{2}-\d{2}\s*-\s*\d{4}-\d{2}-\d{2}$/)
					);
			},
			message: "Период указан неверно"
		}),
		email: validator.Rule({
			rule: function(value) {
				return value && value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
			},
			message: "Почтовый адрес указан неверно"
		}),
		same: validator.Rule({
			rule: function(value) {
				return value === $('[name="' + this.options[0] + '"]').val();
			},
			message: "Поля не совпадают"
		}),
		url: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^(https?:\/\/.+)$/);
			},
			message: "Не корректный адрес URI"
		}),
		regexp: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(new RegExp(this.options[0]));
			},
			message: "Введите корректное значение"
		}),
		numeric: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^-?[0-9]+(\.[0-9]+)?$/);
			},
			message: "Введите число"
		}),
		positive: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) > 0;
			},
			message: "Введите положительное число"
		}),
		max: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) <= parseFloat(this.options[0] || 0);
			},
			message: function() {
				return "Введите число, не обльше чем " + (this.options[0] || 0)
			}
		}),
		min: validator.Rule({
			rule: function(value) {
				return value === "" || value.match(/^[0-9]+(\.[0-9]+)?$/) && parseFloat(value) >= parseFloat(this.options[0] || 0);
			},
			message: function() {
				return "Введите число, не меньше чем " + (this.options[0] || 0);
			}
		}),
		minLength: validator.Rule({
			rule: function(value) {
				return value === "" || value.length >= (this.options[0] || 0)
			},
			message: "В этом поле нехватает символов"
		}),
		maxLength: validator.Rule({
			rule: function(value) {
				return value === "" || value.length <= (this.options[0] || 0)
			},
			message: "В этом поле слишком много символов"
		})
	};

	/**
	 * Holds element validation options
	 * @param element
	 * @constructor
	 */
	validator.Options = function(element) {

		/* Create or return */
		if(!(this instanceof validator.Options))
			return element.data("validationOptions") || new validator.Options(element);

		/* Callbacks after all checks */
		this.onSuccess = function() {};
		this.onError = function() {};

		/* Adds to element on success */
		this.successClass = false;

		/* Adds to element on error */
		this.errorClass   = "error";

		/* Overlay defaults */
		jQuery.extend(true, this, validator.optionsDefaults);

		/* Holds list of validating rules */
		this.rules = {};

		/* Save element */
		this.element = element;

		/* Get rules that declared in element definition */
		this.getDeclaredRules();

		/* Save option */
		this.element.data("validationOptions", this);

		/* Self return */
		return this;

	};

	validator.Options.prototype = {

		/**
		 * Gets list of rules that are set in declared way
		 */
		getDeclaredRules: function() {

			/* Get attribute value */
			let attr = this.element.attr("data-validate"),
				self = this;

			/* If none */
			if(!attr)
				return;

			/* Get list */
			$.each(attr.split(";"), function(_, name) {

				/* Get parameters */
				let params = name.match(/(\w+)\((.*)\)/);

				/* Parse */
				if(params) {

					/* Get function */
					name = params[1];

					/* Parse params */
					params = params[2].match(/(('[^']+')|([\d\w]+))/g);
					$.each(params, function(i, val) {
						params[i] = eval(val.trim());
					});
				}

				/* Add rule to options */
				self.addRule(name.trim(), { options: params || [] });

			});


		},

		/**
		 * Adds new rule for element
		 * @param {string} name Rule name
		 * @param {object} options Rule options
		 * @returns {validator.Options}
		 */
		addRule: function(name, options) {

			/* Create and save new rule */
			this.rules[name] = jQuery.extend({}, validator.ruleDefaults, options);

			/* Mark for auto validation */
			if(!this.element.attr("data-validate"))
				this.element.attr("data-validate", "true");

			/* Self returning */
			return this;
		}

	}

});
/**
 * Holds classes to work with modal/new windows
 */
sky.service('windows', function ({templates, callbacks, stackList}) {

	let tips = false,
		list = stackList(),
		windows = this.service = {

			/**
			 * Returns last open window if any
			 * @returns {windows.Modal|boolean}
			 */
			getLast: function () {
				return list.last()
			},

			/**
			 * Creates new modal window
			 * @param {*} name Window name
			 * @param {*} [data] Data to send with request
			 */
			Modal: function (name, data) {

				/* Self construct */
				if (!(this instanceof windows.Modal))
					return new windows.Modal(name, data);

				/* Create window */
				this.locked 		= false;
				this.background 	= templates.render("windows-modal", {}).appendTo("#pageContentHolder").data("modalWindow", this);
				this.dataContainer 	= this.background.children();
				this.holder 		= this.dataContainer.children(".windowData");
				this.closeButton 	= this.dataContainer.children(".close");

				/* Make body un scrollable */
				$(document.body).css("overflow", "hidden");

				/* Callbacks */
				this.callbacks = callbacks();

				/* Render content */
				try {
					this.reRender(name, data);
				} catch (e) {
					this.close(false);
					throw e;
				}

				/* Return */
				return this;

			}

		};

	/**
	 * Modal window prototype
	 */
	windows.Modal.prototype = {

		/**
		 * Renders window content
		 * @param {*} name Window name
		 * @param {*} [data] Data to send with request
		 */
		reRender: function (name, data) {

			/* Close all tips */
			if(tips) tips.hideAll(true);

			/* Clear */
			this.holder.html('');

			/* Render content */
			if (name instanceof jQuery)
				this.template = name.appendTo(this.holder);
			else if (typeof name === "string")
				this.template = templates.render(name, data).appendTo(this.holder);

			/* Self return */
			return this;
		},

		/**
		 * Removes all except that was rendered
		 */
		clearExceptTemplate: function () {
			this.holder.children().detach();
			this.holder.append(this.template);
		},

		/**
		 * Removes all except that was rendered
		 */
		removeMessages: function () {
			this.holder.find(".notificationMessage").remove();
			return this;
		},

		/**
		 * Locks window so it can't be closed
		 * @returns {windows.Modal}
		 */
		lock: function (ajax) {
			this.locked = true;
			this.closeButton.hide();
			if (ajax) ajax
				.on("preSuccess", function () {
					this.dataContainer.css("height", this.dataContainer.innerHeight());
				}, this)
				.on("notAbort", function () {
					let self = this;
					this.unlock();
					this.dataContainer.css("height", this.holder.outerHeight());
					setTimeout(function () {
						self.dataContainer.css("height", "");
					}, 500)
				}, this)
				.on("abort", function () {
					this.unlock().close();
				}, this);
			return this;
		},

		/**
		 * Unlocks window so it can be closed
		 * @returns {windows.Modal}
		 */
		unlock: function () {
			this.locked = false;
			this.closeButton.show();
			return this;
		},

		/**
		 * Closes current window
		 * @param {boolean} [byUser] Indicates that window was closed not by user
		 */
		close: function (byUser = false) {

			/* If windows is locked */
			if (this.locked)
				return;

			/* Remove elements */
			this.background.fadeOut("fast", function () {
				$(this).remove()
			});

			/* Delete from list */
			list.remove(this);

			/* Call close callback */
			this.callbacks.fire("close", {byUser: byUser});

			/* Close all tips */
			if(tips) tips.hideAll(true);

			/* Make body scrollable */
			if (list.total() < 1)
				$(document.body).css("overflow", "");

			return this;

		}

	};

	try {
		tips = sky.service("tips");
	} catch (e) {}

	/* Add handler to black area click */
	$(document)
		.on("keyup", sky.func(function (event) {
			let last;

			/* If slide show was disabled */
			if (document["webkitIsFullScreen"] || document["mozIsFullScreen"] || document["isFullScreen"])
				return;

			/* Close current window */
			if (event.keyCode === 27 && (last = windows.getLast()))
				last.close(true);

		}));

});
sky.service("calendar", function ({ templates }) {

	/* This class is for showing calendar to pick date on page */
	let calendar = {

		/* Days set */
		monthsNames: window.page.data.monthsNames || ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],

		renderDays: function () {

			/* Clone */
			let current = moment(this.date),
				weeks = [],
				currentWeek = false;

			/* From first */
			current.date(1);

			/* Go through */
			while (current.month() === this.date.month()) {

				/* Make week if new */
				if (!currentWeek || current.day() === 1) {
					currentWeek = {number: current.isoWeek(), days: []};
					weeks.push(currentWeek);
				}

				/* Push */
				currentWeek.days.push({date: current.clone(), dateStr: current.format("YYYY.MM.DD"), day: current.day() === 0 ? 6 : current.day() - 1});

				/* Go next day */
				current.add(1, "d");

			}

			/* Render */
			this.dates.html('').append(templates.render("calendar-dates", {
				weeks: weeks,
				dateStr: this.date.format("YYYY.MM.DD"),
				current: this.date,
				period: this.period,
				since: this.since,
				till: this.till
			}));

			/* Render */
			this.setTime();

		},

		/**
		 * When user picks date
		 * @param {*} dayDiv Div that user clicked, if he did
		 * @param notClose
		 */
		dayPick: function (dayDiv, notClose) {

			/* Set date */
			if (dayDiv)
				this.date.date(parseInt(dayDiv.html()));

			this.field.val(this.getInputValue()).trigger("change").trigger("keyup");
			if (!notClose) this.close();

		},

		getInputValue: function () {

			/* Get field new value */
			if (this.useTime)
				return this.date.format("DD.MM.YYYY HH:mm");
			else if (this.period && this.since.isSame(this.till))
				return this.since.format("DD.MM.YYYY");
			else if (this.period)
				return this.since.format("DD.MM.YYYY") + ' - ' + this.till.format("DD.MM.YYYY");

			/* Default */
			return this.date.format("DD.MM.YYYY");

		},

		setDayPick: function () {
			this.pickedDateView.html(this.getInputValue());
		},

		/**
		 * Position date picker
		 * @param {*} field Item that we should position under
		 */
		position: function (field) {

			this.holder.insertAfter(field.parent()).css({
				marginTop: 0,
				marginLeft: 0,
				position: "absolute"
			}).css({
				marginTop: field.offset().top - this.holder.offset().top + field.outerHeight() + 1,
				marginLeft: field.offset().left - this.holder.offset().left + 1
			});

		},

		/**
		 * Sets time inputs in calendar values
		 */
		setTime: function () {

			/* Set time */
			this.holder.find(".time .hour").val(this.date.format("HH"));
			this.holder.find(".time .minute").val(this.date.format("mm"));

		},

		periodChangeDay: function () {

			let reset = function () {
				calendar.since = calendar.date.clone();
				calendar.till = calendar.date.clone();
				calendar.lastModified = "none"
			};

			if (this.date.isBefore(this.since)) {
				if (this.lastModified !== "since") {
					this.since = this.date.clone();
					this.lastModified = "since"
				}
				else reset();
			} else if (this.date.isAfter(this.till)) {
				if (this.lastModified !== "till") {
					this.till = this.date.clone();
					this.lastModified = "till"
				}
				else reset();
			} else if (this.date.isSame(this.till) || this.date.isSame(this.since))
				reset();
			else {
				if (this.lastModified === "since") {
					this.till = this.date.clone();
					this.lastModified = "till"
				}
				else {
					this.since = this.date.clone();
					this.lastModified = "since"
				}
			}

			calendar.markSelected();

		},

		markSelected: function () {

			this.dates.find(".day").removeClass("selected").removeClass("subSelected").each(function () {


				let element = $(this),
					date = calendar.date.clone().date(parseInt(element.html()));

				if (!calendar.period) {
					if (date.format("DD.MM.YYYY") === calendar.date.format("DD.MM.YYYY"))
						element.addClass("subSelected");
					return;
				}

				if (date.isAfter(calendar.since) && date.isBefore(calendar.till))
					element.addClass("subSelected");
				else if (date.isSame(calendar.since) || date.isSame(calendar.till))
					element.addClass("selected");

			});

		},

		/**
		 * Changes day
		 * @param {*} element Day picker
		 * @returns {undefined}
		 */
		changeDay: function (element) {

			/* If pick today */
			this.date.date(parseInt(element.html()));

			/* No more for period */
			if (this.period) {
				this.periodChangeDay();
				return;
			}

			calendar.markSelected();

			/* Set time */
			if (this.field.attr("name") === "since")
				this.date.hour(0).minute(0);
			else if (this.date.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY"))
				this.date.hour(moment().hour()).minute(moment().minute());
			else
				this.date.hour(23).minute(59);

			/* Pick */
			if (!this.useTime)
				this.dayPick(element);
			else
				this.setTime();

		},

		/**
		 * Sets specified year
		 * @param {int} year Year that need to be set
		 */
		changeYear: function (year) {

			/* Set year */
			this.date.year(year);

			/* Update */
			this.yearView.html(year);

			/* Dates redraw */
			this.renderDays();

		},

		/**
		 * Sets specified month
		 * @param {int} month Month to be set
		 */
		changeMonth: function (month) {

			/* Set year */
			this.date.month(month);

			/* Updates */
			this.monthView.html(this.monthsNames[this.date.month()] + ' ' + this.date.year());

			/* Reload year */
			this.changeYear(this.date.year());

		},

		getDatePeriod: function (dateString) {

			// Split and get since
			let parts = dateString.split('-'),
				till,
				since = this.getDate(parts[0].trim());

			// Get till
			if (parts.length > 1)
				till = this.getDate(parts[1].trim());
			else
				till = this.getDate(parts[0].trim());

			// Set inner lets
			this.since = since;
			this.till = till;
			this.date = since.clone();

		},

		/**
		 * Creates today date
		 */
		getDate: function (dateString) {

			/* Set calendar date */
			let date = false;

			/* If input has datetime format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}$/))
				date = moment(dateString, "YYYY-MM-DD HH:mm");

			/* Id input has date format value */
			if (dateString.match(/^\d{4}-\d{2}-\d{2}$/))
				date = moment(dateString, "YYYY-MM-DD");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4}$/))
				date = moment(dateString, "DD.MM.YYYY");

			/* Id input has date format value */
			if (dateString.match(/^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/))
				date = moment(dateString, "DD.MM.YYYY HH:mm");

			/*  If still no */
			if (!date) {
				date = moment();

				/* Set time */
				if (this.field.attr("name") === "since")
					date.hour(0).minute(0);
			}

			/* Reset time */
			if (!this.useTime)
				date.hour(0).minute(0);

			/* Additional check */
			return this.date = date;

		},

		/**
		 * Closes windows
		 */
		close: function () {

			/* Remove calendar */
			if (this.holder)
				this.holder.remove();

			/* Unset */
			if (this.field) {
				this.field.off("keyup.calendar");
				this.field = false;
			}
		}
	};

	let show = function (field, showTime) {

		/* Remove old calendars */
		this.close();

		/* Begins from current date */
		this.field = field;
		this.period = false;
		this.useTime = showTime ? showTime : false;
		this.lastPicked = "none";

		if (field.is("input.datePeriod")) {
			this.period = true;
			this.getDatePeriod(field.val());
		} else
			this.getDate(field.val());

		/* Render */
		this.holder = templates.render("calendar", this);

		/* Actions */
		this.holder

		/* Months changer */
			.action("click", ".month .next", function (event) {
				event.preventDefault();
				calendar.changeMonth(calendar.date.month() + 1);
			})
			.action("click", ".month .prev", function (event) {
				event.preventDefault();
				calendar.changeMonth(calendar.date.month() - 1);
			})

			/* Years */
			.action("click", ".year .next", function (event) {
				event.preventDefault();
				calendar.changeYear(calendar.date.year() + 1);
			})
			.action("click", ".year .prev", function (event) {
				event.preventDefault();
				calendar.changeYear(calendar.date.year() - 1);
			})
			.action("click", ".setNow", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.renderDays();
				calendar.setTime();
			})
			.action("click", ".setToday", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.date.hour(0);
				calendar.date.minute(0);
				calendar.renderDays();
				calendar.setTime();
			})
			.action("click", ".setWeek", function (event) {
				event.preventDefault();
				calendar.date = moment();
				calendar.date.subtract(7, "d");
				calendar.renderDays();
				calendar.setTime();
			})

			/* Day */
			.action("click", ".dates .day", function (event) {
				event.preventDefault();
				let self = $(this);

				if (self.is(".selected") && !calendar.period)
					calendar.dayPick($(this));
				else {
					calendar.changeDay($(this));
					calendar.dayPick(false, true);
				}
			})

			/* Apply button */
			.action("click", ".apply", function (event) {
				event.preventDefault();
				calendar.dayPick();
			})

			/* Time */
			.action("click", ".time a", function (event) {
				event.preventDefault();
				calendar.date.hour(moment().hour());
				calendar.date.minute(moment().minute());
				calendar.setTime();
			})
			.action("keyup", ".time .hour", function () {
				calendar.date.hour(this.value);
			})
			.action("keyup", ".time .minute", function () {
				calendar.date.minute(this.value);
			});


		/* Close and containers */
		this.dates = this.holder.find(".dates");
		this.yearView = this.holder.find(".year .value");
		this.monthView = this.holder.find(".month .value");
		this.pickedDateView = this.holder.find(".pickedDate");

		/* Refresh days */
		this.renderDays();

		/* Reposition */
		this.position(field);
		this.setDayPick();

		/* Auto change */
		this.field.on("keyup.calendar", function () {
			show(field, showTime);
		});

		let dateOriginal;
		this.dates.on("touchstart", function (event) {

			let element = $(event.target);
			if (!element.is(".day")) return;
			dateOriginal = calendar.date.clone().date(parseInt(element.html()));

		}).on("touchmove", function (event) {

			/* No original event */
			event.preventDefault();

			let element = document.elementFromPoint((event.clientX || event.originalEvent.touches[0].clientX), (event.clientY || event.originalEvent.touches[0].clientY));
			element = $(element);

			if (!element.is(".day")) return;

			let date = dateOriginal.clone().date(parseInt(element.html()));

			if (date.isBefore(dateOriginal)) {
				calendar.since = date.clone();
				calendar.till = dateOriginal.clone();
			} else {
				calendar.since = dateOriginal.clone();
				calendar.till = date.clone();
			}
			calendar.lastModified = "none";
			calendar.markSelected();
			// $(this).trigger("click");

		});

	}.bind(calendar);

	/* Return */
	this.service = show;

});

sky.onReady(({calendar}) => {

	/* Calendar show */
	$(document).action("click.calendar", function (event) {

		/* Get element */
		let element = $(event.target || event.srcElement);

		/* Remove calendar */
		if (!element.is(".calendar") && !element.parents(".calendar").length)
			$(".calendar").remove();

		/* Calendar show */
		if (element.is("input.date"))
			calendar(element);

		/* Calendar show */
		if (element.is("input.datePeriod"))
			calendar(element, false, true);

		/* Calendar show */
		if (element.is("input.datetime"))
			calendar(element, true);

		/* Calendar show */
		if (element.is("input.datehour"))
			calendar(element, true);

	}).action("keydown.calendar", function (event) {
		if (event.keyCode === 13) {
			let calendars = $(".calendar");
			if (calendars.length) {
				calendars.find(".day.selected").trigger("click");
				event.preventDefault();
			}
		}
	});
});
sky.service("dataOperator", function ({ inputsIO, notifications, templates, utils, ajax, actions }) {

	class searchField {
		constructor(name, virtual) {
			this.name = name;
			this.inputName = name;
			this.virtual = virtual || false;
			this.default = null;
			this.input = false;
			this.value = null;
		}
		valueOrNullOnDefault() {
			if ((this.default instanceof Array) && (this.value instanceof Array))
				return utils.isObjectsEqual(this.value, this.default) ? null : this.value;

			return this.value === this.default ? null : this.value;
		}
		read() {
			if (this.virtual === "search")
				return this.searchRead();
			else if (this.virtual)
				return this.hashRead();
			else if (this.input)
				this.value = inputsIO.readInputsValues(this.input);

			return this.value;
		}
		write() {
			if (this.input)
				inputsIO.writeInputsValue(this.value === null ? this.default : this.value, this.input);
			return this.value;
		}
		hashRead() {
			let hashValue = page.history.hashObject[this.name];
			return this.value = (typeof hashValue === "undefined") ? this.default : hashValue;
		}
		searchRead () {
			let searchValue = page.history.searchObject[this.name];
			return this.value = (typeof searchValue === "undefined") ? this.default : searchValue;
		}
	}

	/**
	 * Default options
	 * @type {{}}
	 */
	let baseOptions = {
		fields: {},
		historyType: "hash"
	};

	/* Creates new data operator */
	class DataOperator {
		constructor(options) {

			/* Stores last request object */
			this.lastRequestData = false;

			/* Func that calls before request */
			this.beforeRequest = false;
			
			/* Fields list */
			this.fields = {};

			/* Add base options, but only not set, that's why so fun construction */
			this.options = $.extend({}, baseOptions, true);

			/* Options init */
			this.setOptions(options);

		}

		/** Saves to options */
		setOptions(options) {

			/* Back link */
			let self = this;

			/* Set submit handler */
			if (options.form)
				$(options.form).action("submit", this.onFormSubmit.bind(this));

			/* Add to options */
			$.extend(this.options, options, true);

			/* Self return */
			return this;
		}

		/**
		 * On form submit
		 * @param event
		 */
		onFormSubmit(event) {

			/* Prevent */
			event.preventDefault();

			/* If form not valid */
			if (!$(this.options.form).validForm())
				return;

			let options = {force: true};

			if (this.fields["page"])
				options[this.options.historyType === "search" ? "search" : "hash"] = {page: 1};

			/* Update */
			this.reload(options);

		}

		prepareRequest(options) {

			/* On empty */
			options = options || {};

			/* Hash fields */
			if (options["hash"])
				page.history.set(options["hash"]);

			/* Hash fields */
			if (options["search"])
				page.history.search(options["search"]);

			/* Hash fields */
			if (options["virtual"]) {
				if (this.options.historyType === "search")
					page.history.search(options["virtual"]);
				else
					page.history.set(options["virtual"]);
			}

			/* Write to form from hash */
			if (options.fromUrl) {
				if (this.options.historyType === "search")
					this.readSearch().writeForm();
				else
					this.readHash().writeForm();
			}

			/* jQuery wrap */
			if (this.options.form && !$(this.options.form).validForm())
				return false;

			/* Read */
			let data = this.read();

			/* Add additional data */
			if (this.options["requestData"])
				data = $.extend(data, this.options["requestData"]);

			/* Check is same and no force requested */
			if (this.lastRequestData !== false && utils.isObjectsEqual(this.lastRequestData, data) && !options["force"])
				return false;

			/* Set hash data */
			if (!options.fromUrl && this.options.historyType === "search")
				this.writeSearch();
			else if (!options.fromUrl)
				this.writeHash();

			/* Before request call */
			if (this.beforeRequest)
				if (this.beforeRequest(data, options) === false)
					return false;

			/* Return data */
			return data;

		}

		/**
		 * Reloads data according to params
		 * @param options
		 * @returns {DataOperator}
		 */
		reload(options) {

			/* Prepare */
			let data = this.prepareRequest(options);

			/* Reload */
			if (data)
				this.request(data);

			/* Self return */
			return this;

		}

		/**
		 * Performs request to reload data
		 * @param data
		 */
		request(data) {

			/* Back link */
			let self = this;

			/* Save last data */
			self.lastRequestData = data;

			/* Stop old request */
			if (this.ajax)
				this.ajax.stop();

			/* Request */
			this.ajax = ajax(this.options.url, data)
				.on("success", function (response) {
					self.lastResponse = response;
					self.render(response, data);
				})
				.on("error", function (error) {
					self.error(error)
				})
				.on("always", function () {
					self.ajax = false;
				});

			/* Create loading, auto remove when ajax finishes */
			notifications.loading(this.ajax).reloadContent(this.options.holder);

		}

		/**
		 * On success, have to be overloaded
		 * @param data
		 * @param request
		 */
		render(data, request) {}

		/**
		 * On error, have to be overloaded
		 * @param error
		 */
		error(error) {}

		/**
		 * Adds list of fields to current list
		 * @param {Array} list List of names
		 * @param {Boolean} [virtual] Virtual fields flag
		 */
		fieldsList(list, virtual) {

			/* Back link */
			let self = this;

			/* Go through and push */
			$.each(list, function (_, item) {
				self.options.fields[item] = virtual;
			});

			/* Self return */
			return this;
			
		}

		/**
		 * Sets form fields
		 * @param list
		 * @returns {*}
		 */
		realFieldsList(list) {
			return this.fieldsList(list);
		}

		/**
		 * Set none forms fields
		 * @param list
		 * @returns {*}
		 */
		virtualFieldsList(list) {
			return this.fieldsList(list, true);
		}

		/**
		 * Reads real fields
		 * @returns {{}}
		 */
		readReal() {

			/* Data holder */
			let data = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */

				if (field.virtual)
					return;

				/* Read */
				field.read();

				/* Get non default or null */
				let val = field.valueOrNullOnDefault();

				/* If value not same as default */
				if (val !== null)
					data[field.name] = val;

			});

			/* Self return */
			return data;

		}

		/** Reads form to fields */
		read() {

			/* Data holder */
			let data = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */

				/* Read */
				field.read();

				/* Get non default or null */
				let val = field.valueOrNullOnDefault();

				/* If value not same as default */
				if (val !== null)
					data[field.name] = val;

			});

			/* Self return */
			return data;
		}

		/** Write current field to form */
		writeForm() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.write();
			});

			/* Self return */
			return this;
		}

		/** Reads hash to fields */
		readHash() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.hashRead();
			});

			/* Self return */
			return this;
		}

		/** Reads hash to fields */
		readSearch() {
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				field.searchRead();
			});

			/* Self return */
			return this;
		}

		/** Writes current fields to hash */
		writeHash() {

			/* To write */
			let write = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				write[field.name] = field.valueOrNullOnDefault();
			});

			/* Write to hash */
			page.history.set(write);

			/* Self return */
			return this;
		}

		/** Writes current fields to hash */
		writeSearch() {

			/* To write */
			let write = {};

			/* Go through */
			$.each(this.fields, function (i, field) {
				/** @let field searchField */
				write[field.name] = field.valueOrNullOnDefault();
			});

			/* Write to hash */
			page.history.search(write);

			/* Self return */
			return this;

		}

		/** Finds inputs associated with fields */
		initInputs() {

			/* Back link */
			let self = this;

			$.each(this.options.fields, function (fieldName, virtual) {

				// Create search field
				let field = new searchField(fieldName, virtual ? self.options.historyType : false);

				/** @let field searchField */
				if (!field.virtual) {

					/* Find input */
					if (field.name[0] === "*") {
						field.name = field.name.substring(1);
						field.input = $(self.options.form).find(".selectReplaceChoose[input=" + field.name + "]");
					}
					else
						field.input = $(self.options.form).find('[name="' + field.name + '"]');

					/* Remove fields without input */
					if (!field.input || !field.input.length) {
						delete self.fields[fieldName];
						return;
					}

					/* Save */
					self.fields[fieldName] = field;

					/* Read default */
					field.default = field.read();
					field.value = null;
				} else {
					if (self.options.historyType === "search")
						field.virtual = "search";
					self.fields[fieldName] = field;
				}
			});

			/* Self return */
			return this;
		}
	};

	/* Interface */
	this.service = {
		initOperator: options => new DataOperator(options),
		searchField: searchField,
		initLoader: function (loader, notifications, pagination, { reload = true, history = true }) {

			/* Add count */
			loader.beforeRequest = function (data, options) {
				if (!this.lastRequestData || options.force)
					data["count"] = true;
			};

			/* Render function */
			loader.render = function (response) {

				// Re render
				$(this.options.holder).html('').append(
					templates.render("page-result-render", response)
				);

				// Remove old
				if (this.pagination)
					this.pagination = this.pagination.remove();

				if (typeof response.pages !== "undefined") {

					// Pages holder
					let holder = $("#pages").html('');

					// Create new
					if (response.pages > 1 && pagination) {
						this.pagination = pagination.add({
							pages: response.pages,
							current: response.page,
							holder: holder
						});
						this.pagination.onPageChange = function (pageNum) {
							loader.reload({virtual: {page: pageNum}});
						}
					}
				}

			};

			/* On loading error */
			loader.error = function (error) {

				// Remove pagination on error
				if (this.pagination)
					this.pagination = this.pagination.remove();

				// Clear
				$(this.options.holder).html('').append(notifications.message({text: error}).render);
			};

			/* Reload */
			if (reload)
				loader.reload({fromUrl: true});

			/* Set handler */
			if (history)
				page.history.on("change", function (searchChanged, hashChanged) {
					if (searchChanged || hashChanged)
						loader.reload({fromUrl: true});
				});

		}
	}

});
sky.service("inputsIO", function () {

	this.service = {

		/**
		 * Get value of single input
		 * @param input
		 * @returns {*}
		 */
		readInputValue: function (input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				let inputs = input.find("input");

				// Read
				let data = this.readInputsValues(inputs);

				// If all checked
				if (data.length === inputs.length)
					return true;

				// Return data
				return data;

			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.is(":checked") ? input.val() : false;
			} else
				return input.val() === "" ? false : input.val();


		},

		/**
		 * Get value of multiple inputs
		 * @param inputs
		 * @returns {*}
		 */
		readInputsValues: function (inputs) {

			/* If single input */
			if (inputs.length === 1)
				return this.readInputValue(inputs);

			/* Values holder */
			let valuesNamed = [],
				valuesLined = [],
				self = this;

			/* Go through */
			inputs.each(function () {

				/* Get value */
				let input = $(this),
					value = self.readInputValue(input);

				/* If we get values */
				if (value !== false) {
					valuesNamed.push({name: input.attr("name"), value: value});
					valuesLined.push(value);
				}

			});

			/* Single */
			if (valuesLined.length === 1) {
				return valuesLined[0];
			}

			/* Return */
			return valuesLined.length ? valuesLined : false;

		},

		/**
		 * Write single input value
		 * @param value
		 * @param input
		 * @returns {*}
		 */
		writeInputValue: function (value, input) {

			if (input.is(".selectReplaceChoose")) {

				// Get inputs
				let inputs = input.find("input");

				// If all checked
				if (value === true)
					inputs.prop("checked", true);
				else
					this.writeInputsValue(value, inputs);

				if (inputs.length)
					inputs.first().trigger("change", {notByUser: true});

			} else if (input.is(":checkbox") || input.is(":radio")) {
				return input.prop("checked", value !== false);
			} else
				return input.val(value === false ? "" : value);
		},

		/**
		 * Write multiple inputs value
		 * @param values
		 * @param inputs
		 * @returns {*}
		 */
		writeInputsValue: function (values, inputs) {

			/* Write single */
			if (inputs.length < 2)
				return this.writeInputValue(values, inputs);

			/* Multiple */
			if (inputs.is(":checkbox") || inputs.is(":radio")) {
				inputs.prop("checked", false);
				if (values instanceof Array) {
					$.each(values, function (_, val) {
						inputs.filter('[value="' + val + '"]').prop("checked", true);
					});
					inputs.first().trigger("change", {notByUser: true});
				} else {
					if (values === false || values === true)
						inputs.prop("checked", values).first().trigger("change", {notByUser: true});
					else
						inputs.filter('[value="' + values + '"]').prop("checked", true).trigger("change", {notByUser: true});
				}
			} else {
				inputs.val(values);
			}
		}

	}

});
/**
 * For work with different type of notifications
 */
sky.service("notifications", function({ stackList, callbacks, visibleCalculator, templates, windows, tips }) {

	let notification = function(options) {
		/* Self creation */
		if(!(this instanceof notification))
			return new notification(options);

		this.render = templates.render("forms-notification", options);
	};
	let message = function(options) {

		/* Self creation */
		if(!(this instanceof message))
			return new message(options);

		this.render = templates.render("forms-message", options);
	};

	message.prototype = {
		modal: function() {
			return windows.Modal(this.render);
		},

		/**
		 * Append to holder of modal window
		 * @param {object} modal
		 */
		appendToModal: function(modal) {
			modal.holder.append(this.render);
		},

		tip: function(object, align) {
			tips.Tip(object, { create: this.render, close: 5 }).show(align || "top",);
		}
	};

	let loadings = stackList();

	/**
	 * Loading
	 */
	let loading = function(ajax, global = true) {

		/* Self creation */
        if(!(this instanceof loading))
            return new loading(ajax, global);

		/* Back link */
		this.global = global;

		/* Render */
		this.render = $('<div><div></div></div>').addClass("ajaxLoading");

		/* Global insert */
		if(this.global)
			this.render.addClass("fixed").appendTo("body");

		/* If stop possible */
		if(ajax) {
			$("<span/>").appendTo(this.render.addClass("cancelable")).click(function() { ajax.stop(); });
			ajax.on("always", () => { this.hide(); });
		}

		/* Callbacks */
		this.callbacks = callbacks();

		/* List save */
		loadings.add(this);

	};

	/**
	 * Prototype
	 * @type {{render: null, hide: hide}}
	 */
	loading.prototype = {

		/**
		 * Loads loading in modal window
		 * @param {object} modal Window
		 */
		inModalWindow: function(modal) {

			/* Hide */
			let content = modal.holder.children().hide();

			/* Insert */
			this.render.appendTo(modal.holder);

			/* Restore on hide */
			this.callbacks.on("hide", () => content.show());

		},

		/**
		 *
		 * @param contentHolder
		 */
		reloadContent: function(contentHolder) {

			/* If no holder */
			if(!this.holder.length)
				return;

			/* Safe */
			this.holder = contentHolder = $(contentHolder).addClass("withLoading");

			/* Get children */
			let content = contentHolder.children();

			/* Different content disable */
			if(this.global) {

				content.disable();

				/* Make sizes calculator */
				this.calc = visibleCalculator(contentHolder, this.render.outerHeight(), "body");

				/* Set position func */
				this.setPosition = function() {
					let position = this.calc.calculate();
					this.render.css({
						left: position.left + (position.width) / 2,
						top: position.top + (position.height) / 2
					})
				};
				this.setPosition();

				/* Re enable */
				this.callbacks.on("hide", () => {
					content.enable();
					$(window).off("scroll.notification");
				});

				$(window).on("scroll.notification", () => { this.setPosition();	});

			} else {

				/*  Hide */
				content.hide();

				/* Insert */
				this.render.appendTo(this.holder);

				/* Re enable */
				this.callbacks.on("hide", function() {
					content.show();
				});
			}

			return this;

		},

		setHolder: function(holder) {

			/* Append and save */
			this.holder = $(holder).addClass("withLoading").append(this.render);

			/* Self return */
			return this;

		},

		/**
		 * Hides current loading
		 */
		hide: function() {

			if(this.holder)
				this.holder.removeClass("withLoading");

			this.render.remove();
			this.callbacks.fire("hide");

			/* Remove from list */
			loadings.remove(this);

		}
	};

	return {
		loading: loading,
		message: message,
		reCalculate: function() {
			loadings.each(function(instance) {
				instance.calc.init();
				instance.setPosition();
			})
		}
	}

});
sky.services.add("pagination", function({ templates, stackList }) {

	let list = stackList();

	class Pagination {
		constructor({ pages, holder, current = 1, }) {

			/* Self creation */
			if(!(this instanceof Pagination))
				return new Pagination({ pages, holder, current });

			/* Save */
			list.add(this);

			/* Set total pages */
			this.pages 		= pages;
			this.current 	= current;
			this.pageWidth	= 50;
			this.id 		= last;

			/* No pages needed */
			if(this.pages < 2)
				return this;

			/* Counted params */
			this.dimensions = {
				startPage      : 1,
				lastStartPage  : 0,
				pagesVisible   : 0,
				pagesInvisible : 0,
				scrollAvailable: 0,
				scrollStart	   : 0,
				tumbler		   : 10
			};

			/* Render */
			this.dom = {};
			this.dom.holder  = templates.render("pagination", {}).data("pagination", this);
			this.dom.slider  = this.dom.holder.find(".pages");
			this.dom.pages   = this.dom.slider.children();
			this.dom.back 	 = this.dom.holder.children(".left");
			this.dom.forward = this.dom.holder.children(".right");

			/* Insert */
			if(holder)
				this.dom.holder.appendTo(holder);

			/* If bigger than 10000 */
			if(this.pages > 9999) {
				this.dom.slider.addClass("tenthousand");
				this.pageWidth = 80;
			}
			/* If bigger than 1000 */
			else if(this.pages > 999) {
				this.dom.slider.addClass("thousand");
				this.pageWidth = 70;
			}
			/* If bigger 100 */
			else if(this.pages > 99 ) {
				this.dom.slider.addClass("hundred");
				this.pageWidth = 60;
			}

			/* Make all */
			this.redraw();

			/* Mark page */
			this.goToPage(this.current);

			/* Self return */
			return this;

		}

		/** */
		onPageChange(newPage) {}

		/** Removes navigator */
		remove() {
			this.dom.holder.remove();
			list.remove(this);
		}

		/**
		 * Redraws pagination
		 */
		redraw() {

            /* No action on invisible */
            if(!this.dom.holder.is(":visible"))
                return;

			/* Reset width */
			this.dom.slider.css("width", "auto");

			/* Count visible sizes */
			this.dimensions.pagesVisible = Math.floor((this.dom.holder.innerWidth() - 100) / this.pageWidth);

			/* Count invisible */
			this.dimensions.pagesInvisible = (this.pages - this.dimensions.pagesVisible) > 0 ? this.pages - this.dimensions.pagesVisible : 0;

			/* Count last start */
			this.dimensions.lastStartPage = this.dimensions.pagesInvisible + 1;

			/* Get max pages */
			let toShow = this.dimensions.pagesVisible > this.pages ? this.pages : this.dimensions.pagesVisible;

			/* Crop */
			this.dom.slider.css("width", toShow * this.pageWidth);

			/* Redraw pages */
			this.drawPages(this.dimensions.startPage);

			/* Try to create scroll */
			this.createScroll();

			/* Set scroll position */
			if(this.dom.scrollLine)
				this.dom.runner.css("left", this.calculate().scroll);

		}

		/**
		 * Create scroll line if needed
		 */
		createScroll() {

			/* If no scroll needed */
			if(this.pages <= this.dimensions.pagesVisible) {
				if(this.dom.scrollLine) {
					this.dom.scrollLine.remove();
					this.dom.scrollLine = false;
				}
				return;
			} else if(!this.dom.scrollLine) {

				/* Create scroll */
				this.dom.scrollLine = templates.render("pagination-scroll", {}).appendTo(this.dom.slider);
				this.dom.runner = this.dom.scrollLine.children();
			}

			/* Count left */
			this.dimensions.scrollStart = this.dom.scrollLine.position().left + 2;

			/* Count scroll line width */
			this.dimensions.scrollAvailable = this.dom.scrollLine.outerWidth() - this.dom.scrollLine.children().outerWidth() - 4;
		
		}

		/**
		 * Calculates related coordinates between scroll and move part
		 */
		calculate(position) {

			/* Get position */
			if(position === undefined)
				position = this.dom.runner.offset().left  - this.dimensions.scrollStart;

			/* Remove start */
			position = position - this.dimensions.scrollStart;

			/* Correct */
			position = position > 0 ? position : 0;

			/* Count pages */
			return {
				pages : Math.floor(this.dimensions.pagesInvisible * (position / this.dimensions.scrollAvailable)) + 1,
				scroll: Math.floor(this.dimensions.scrollAvailable * (this.dimensions.startPage - 1)/ this.dimensions.pagesInvisible + this.dimensions.scrollStart)
			}

		}

		/**
		 * Draws pages according to start
		 * @param {int} start Page to start from
		 */
		drawPages(start) {

			/* Remove old pages */
			this.dom.pages.html("");

			/* Correct */
			if(start > this.dimensions.pagesInvisible)
				start = this.dimensions.pagesInvisible + 1;

			/* Correct */
			if(start < 1)
				start = 1;

			/* Start position */
			let i = start;

			/* Draw pages */
			while(i <= this.pages && i < start + this.dimensions.pagesVisible) {
				templates.render("pagination-page", { page: i, current: this.current }).appendTo(this.dom.pages);
				i++;
			}

			/* Reset start page */
			this.dimensions.startPage = start;


		}

		/**
		 * Sets page as active
		 * @param {int} page Page number
		 * @returns {Pagination}
		 */
		goToPage(page) {

			/* If no pages */
			if(this.pages < 2)
				return this;

			/* Parse */
			page = parseInt(page);

			/* Correct */
			if(page < 1)
				page = 1;
			else if(page > this.pages)
				page = this.pages;

			/* Checks if page is visible */
			let isVisible = this.dimensions.startPage <= page && page < this.dimensions.startPage + this.dimensions.pagesVisible;

			/* Redraws if needed */
			if(!isVisible) {
				this.drawPages(page);
				if(this.dom.scrollLine)
					this.dom.runner.css("left", this.calculate().scroll);
			}

			/* Make active */
			this.dom.pages.children().removeClass("active").filter("[page=" + page +"]").addClass("active");

			/* Forward buttons disable */
			if(page > 1) this.dom.back.enable();
			else this.dom.back.disable();

			/* Backward button disable */
			if(page === this.pages) this.dom.forward.disable();
			else this.dom.forward.enable();

			/* Callback */
			if(this.current !== page)
				this.onPageChange(page);

			/* Save page state */
			this.current = page;

			/* Self return */
			return this;

		}

		/** Set scroll */
		scroll(event) {

			let pos = event.pageX - 10;
			if(this.dimensions.scrollStart > pos)
				pos = this.dimensions.scrollStart;
			if(this.dimensions.scrollStart + this.dimensions.scrollAvailable < pos)
				pos = this.dimensions.scrollStart + this.dimensions.scrollAvailable;

			this.dom.runner.css({left: pos});
			this.drawPages(this.calculate(pos).pages);

		}

	}

	/* Bind windows events */
	$(window).on("resize", function() {
		list.each(() => { this.redraw(); });
	});

	/* Return */
	this.service = {
		add: function(options) {
			return new Pagination(options);
		}
	}

});
sky.onReady(({suggester}) => {
	$(document).on("click", function(event) {

		/* Get element */
		let element = $(event.target || event.srcElement);

		/* If click in replace we should not hide it */
		if(element.is("[type=submit]") || element.closest(".suggester").length || element.data("suggester"))
			return;

		/* Hide all */
		suggester.hide();

	});
});

sky.service("suggester", function({templates}) {

	let render,
		object,
		lastList,
		suggester = this.service = {
			hide: function() {

				if(render) {
					render.remove();
					render = false;
				}
				if(object) {
					object.removeData("suggester");
					object = false;
				}
				$(document).off("keyup.suggester, keydown.suggester");
			},
			show: function(input, list) {

				/* Hide previous */
				suggester.hide();

				/* Save */
				lastList = list;
				render = templates.render("suggester", {items: list}).insertAfter(input.closest("label, .label"));
				object = input.data("suggester", render);

				/* Get positions */
				let elementPosition = input.offset(),
					renderPosition = render.offset();

				/* Show */
				render.css({
					"margin-left": elementPosition.left - renderPosition.left,
					"margin-top": elementPosition.top - renderPosition.top + input.outerHeight()
				});

				/* Add handlers */
				let children = render.children().on("click", function() {
					input.val($(this).html());
					suggester.hide();
					if(lastList[$(this).attr("data-index")].callback)
						lastList[$(this).attr("data-index")].callback();
				});

				$(document).on("keyup.suggester", function(event) {

					if(event.keyCode === 38 || event.keyCode === 40) {

						let selected = children.filter(".selected");
						children.removeClass("selected");

						// Up
						if(event.keyCode === 38) {
							if(!selected.length || !selected.prev().length)
								children.last().addClass("selected");
							else
								selected.prev().addClass("selected");
						}
						// Down
						if(event.keyCode === 40) {
							children.removeClass("selected");
							if(!selected.length || !selected.next().length) {
								children.first().addClass("selected")
							} else {
								selected.next().addClass("selected");
							}
						}
					}
					// Esc
					if(event.keyCode === 27) suggester.hide();


				}).on("keydown.suggester", function(event) {

					// Enter
					if(event.keyCode !== 13) return;

					let selected = children.filter(".selected");
					if(selected.length) {
						selected.trigger("click");
						event.preventDefault();
					} else {
						suggester.hide();
					}

				});
			}
		};
});
sky.service("visibleCalculator", function() {

	let Calculator = this.service = class {
		
		constructor(holder, minHeight, scrollable) {

			/* Check if class */
			if(!(this instanceof Calculator))
				return new Calculator(holder, minHeight, scrollable);

			/* Re get holder */
			this.holder = $(holder);
			this.scrollable = scrollable;
			this.minHeight = minHeight;

			/* Init */
			this.init();

		}

		/* Init func */
		init() {

			/* Count offset */
			let offset = this.holder.offset();

			/* Get holder rect */
			this.holderRect = {
				left	: offset.left,
				top		: offset.top,
				width	: this.holder.outerWidth(),
				height	: this.holder.outerHeight()
			};

		}

		/* Calculating function */
		calculate() {

			/* How much is scrolled */
			let scrollTop = $(this.scrollable).scrollTop(),
				windowHeight = $(window).height(),
				sizes = {
					left      : this.holderRect.left,	// In window
					top       : this.holderRect.top - scrollTop, //
					width     : this.holderRect.width,
					height    : this.holderRect.height,
					scrollTop : scrollTop,
					scrollLeft: 0
				};

			/* Min height */
			if(sizes.height < this.minHeight)
				sizes.height = this.minHeight;

			/* Count bottom */
			sizes.bottom = sizes.top + sizes.height;

			/* If top border near than holder */
			if(sizes.top < 0) {
				// If visible less than min
				if(sizes.bottom < this.minHeight) {
					sizes.bottom = sizes.bottom < 0 ? 0 : sizes.bottom;
					sizes.top = sizes.bottom - this.minHeight;
					sizes.height = this.minHeight;
				}
				// If visible more than min
				else {
					sizes.height = sizes.bottom;
					sizes.top = 0;
				}
			}

			/* Get visible bottom */
			if(windowHeight < sizes.bottom) {
				// If visible less than min
				if(windowHeight - sizes.top < this.minHeight) {
					sizes.height = this.minHeight;
					sizes.top = windowHeight - sizes.top < 0 ? 0 : sizes.top;
					sizes.bottom = sizes.top + this.minHeight;
				}
				// If visible more than min
				else {
					sizes.height = windowHeight - sizes.top;
					sizes.bottom = 0;
				}
			}

			/* Return */
			return sizes;

		}
		
	}

});
/**
 * Main init
 */
sky.init();