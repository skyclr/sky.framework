"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (e, t) {
  "use strict";
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");return t(e);
  } : t(e);
}("undefined" != typeof window ? window : undefined, function (e, t) {
  "use strict";
  var n = [],
      r = e.document,
      i = Object.getPrototypeOf,
      o = n.slice,
      a = n.concat,
      s = n.push,
      u = n.indexOf,
      l = {},
      c = l.toString,
      f = l.hasOwnProperty,
      p = f.toString,
      d = p.call(Object),
      h = {},
      g = function e(t) {
    return "function" == typeof t && "number" != typeof t.nodeType;
  },
      y = function e(t) {
    return null != t && t === t.window;
  },
      v = { type: !0, src: !0, noModule: !0 };function m(e, t, n) {
    var i,
        o = (t = t || r).createElement("script");if (o.text = e, n) for (i in v) {
      n[i] && (o[i] = n[i]);
    }t.head.appendChild(o).parentNode.removeChild(o);
  }function x(e) {
    return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? l[c.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
  }var b = "3.3.1",
      w = function w(e, t) {
    return new w.fn.init(e, t);
  },
      T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn = w.prototype = { jquery: "3.3.1", constructor: w, length: 0, toArray: function toArray() {
      return o.call(this);
    }, get: function get(e) {
      return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e];
    }, pushStack: function pushStack(e) {
      var t = w.merge(this.constructor(), e);return t.prevObject = this, t;
    }, each: function each(e) {
      return w.each(this, e);
    }, map: function map(e) {
      return this.pushStack(w.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    }, slice: function slice() {
      return this.pushStack(o.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
    }, end: function end() {
      return this.prevObject || this.constructor();
    }, push: s, sort: n.sort, splice: n.splice }, w.extend = w.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
      if (null != (e = arguments[s])) for (t in e) {
        n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r));
      }
    }return a;
  }, w.extend({ expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(e) {
      throw new Error(e);
    }, noop: function noop() {}, isPlainObject: function isPlainObject(e) {
      var t, n;return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof (n = f.call(t, "constructor") && t.constructor) && p.call(n) === d);
    }, isEmptyObject: function isEmptyObject(e) {
      var t;for (t in e) {
        return !1;
      }return !0;
    }, globalEval: function globalEval(e) {
      m(e);
    }, each: function each(e, t) {
      var n,
          r = 0;if (C(e)) {
        for (n = e.length; r < n; r++) {
          if (!1 === t.call(e[r], r, e[r])) break;
        }
      } else for (r in e) {
        if (!1 === t.call(e[r], r, e[r])) break;
      }return e;
    }, trim: function trim(e) {
      return null == e ? "" : (e + "").replace(T, "");
    }, makeArray: function makeArray(e, t) {
      var n = t || [];return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n;
    }, inArray: function inArray(e, t, n) {
      return null == t ? -1 : u.call(t, e, n);
    }, merge: function merge(e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
        e[i++] = t[r];
      }return e.length = i, e;
    }, grep: function grep(e, t, n) {
      for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) {
        (r = !t(e[o], o)) !== s && i.push(e[o]);
      }return i;
    }, map: function map(e, t, n) {
      var r,
          i,
          o = 0,
          s = [];if (C(e)) for (r = e.length; o < r; o++) {
        null != (i = t(e[o], o, n)) && s.push(i);
      } else for (o in e) {
        null != (i = t(e[o], o, n)) && s.push(i);
      }return a.apply([], s);
    }, guid: 1, support: h }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    l["[object " + t + "]"] = t.toLowerCase();
  });function C(e) {
    var t = !!e && "length" in e && e.length,
        n = x(e);return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
  }var E = function (e) {
    var t,
        n,
        r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        p,
        d,
        h,
        g,
        y,
        v,
        m,
        x,
        b = "sizzle" + 1 * new Date(),
        w = e.document,
        T = 0,
        C = 0,
        E = ae(),
        k = ae(),
        S = ae(),
        D = function D(e, t) {
      return e === t && (f = !0), 0;
    },
        N = {}.hasOwnProperty,
        A = [],
        j = A.pop,
        q = A.push,
        L = A.push,
        H = A.slice,
        O = function O(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) return n;
      }return -1;
    },
        P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]",
        W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
        $ = new RegExp(M + "+", "g"),
        B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        F = new RegExp("^" + M + "*," + M + "*"),
        _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
        X = new RegExp(W),
        U = new RegExp("^" + R + "$"),
        V = { ID: new RegExp("^#(" + R + ")"), CLASS: new RegExp("^\\.(" + R + ")"), TAG: new RegExp("^(" + R + "|[*])"), ATTR: new RegExp("^" + I), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + P + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") },
        G = /^(?:input|select|textarea|button)$/i,
        Y = /^h\d$/i,
        Q = /^[^{]+\{\s*\[native \w/,
        J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        K = /[+~]/,
        Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
        ee = function ee(e, t, n) {
      var r = "0x" + t - 65536;return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
    },
        te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ne = function ne(e, t) {
      return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
    },
        re = function re() {
      p();
    },
        ie = me(function (e) {
      return !0 === e.disabled && ("form" in e || "label" in e);
    }, { dir: "parentNode", next: "legend" });try {
      L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType;
    } catch (e) {
      L = { apply: A.length ? function (e, t) {
          q.apply(e, H.call(t));
        } : function (e, t) {
          var n = e.length,
              r = 0;while (e[n++] = t[r++]) {}e.length = n - 1;
        } };
    }function oe(e, t, r, i) {
      var o,
          s,
          l,
          c,
          f,
          h,
          v,
          m = t && t.ownerDocument,
          T = t ? t.nodeType : 9;if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
        if (11 !== T && (f = J.exec(e))) if (o = f[1]) {
          if (9 === T) {
            if (!(l = t.getElementById(o))) return r;if (l.id === o) return r.push(l), r;
          } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r;
        } else {
          if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r;if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r;
        }if (n.qsa && !S[e + " "] && (!y || !y.test(e))) {
          if (1 !== T) m = t, v = e;else if ("object" !== t.nodeName.toLowerCase()) {
            (c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), s = (h = a(e)).length;while (s--) {
              h[s] = "#" + c + " " + ve(h[s]);
            }v = h.join(","), m = K.test(e) && ge(t.parentNode) || t;
          }if (v) try {
            return L.apply(r, m.querySelectorAll(v)), r;
          } catch (e) {} finally {
            c === b && t.removeAttribute("id");
          }
        }
      }return u(e.replace(B, "$1"), t, r, i);
    }function ae() {
      var e = [];function t(n, i) {
        return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i;
      }return t;
    }function se(e) {
      return e[b] = !0, e;
    }function ue(e) {
      var t = d.createElement("fieldset");try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }function le(e, t) {
      var n = e.split("|"),
          i = n.length;while (i--) {
        r.attrHandle[n[i]] = t;
      }
    }function ce(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;if (r) return r;if (n) while (n = n.nextSibling) {
        if (n === t) return -1;
      }return e ? 1 : -1;
    }function fe(e) {
      return function (t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e;
      };
    }function pe(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();return ("input" === n || "button" === n) && t.type === e;
      };
    }function de(e) {
      return function (t) {
        return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e;
      };
    }function he(e) {
      return se(function (t) {
        return t = +t, se(function (n, r) {
          var i,
              o = e([], n.length, t),
              a = o.length;while (a--) {
            n[i = o[a]] && (n[i] = !(r[i] = n[i]));
          }
        });
      });
    }function ge(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }n = oe.support = {}, o = oe.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;return !!t && "HTML" !== t.nodeName;
    }, p = oe.setDocument = function (e) {
      var t,
          i,
          a = e ? e.ownerDocument || e : w;return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, h = d.documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), n.getElementsByTagName = ue(function (e) {
        return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length;
      }), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function (e) {
        return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length;
      }), n.getById ? (r.filter.ID = function (e) {
        var t = e.replace(Z, ee);return function (e) {
          return e.getAttribute("id") === t;
        };
      }, r.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && g) {
          var n = t.getElementById(e);return n ? [n] : [];
        }
      }) : (r.filter.ID = function (e) {
        var t = e.replace(Z, ee);return function (e) {
          var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");return n && n.value === t;
        };
      }, r.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && g) {
          var n,
              r,
              i,
              o = t.getElementById(e);if (o) {
            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];i = t.getElementsByName(e), r = 0;while (o = i[r++]) {
              if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            }
          }return [];
        }
      }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);if ("*" === e) {
          while (n = o[i++]) {
            1 === n.nodeType && r.push(n);
          }return r;
        }return o;
      }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
        if ("undefined" != typeof t.getElementsByClassName && g) return t.getElementsByClassName(e);
      }, v = [], y = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function (e) {
        h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]");
      }), ue(function (e) {
        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t = d.createElement("input");t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:");
      })), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function (e) {
        n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), v.push("!=", W);
      }), y = y.length && new RegExp(y.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) while (t = t.parentNode) {
          if (t === e) return !0;
        }return !1;
      }, D = t ? function (e, t) {
        if (e === t) return f = !0, 0;var r = !e.compareDocumentPosition - !t.compareDocumentPosition;return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1);
      } : function (e, t) {
        if (e === t) return f = !0, 0;var n,
            r = 0,
            i = e.parentNode,
            o = t.parentNode,
            a = [e],
            s = [t];if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0;if (i === o) return ce(e, t);n = e;while (n = n.parentNode) {
          a.unshift(n);
        }n = t;while (n = n.parentNode) {
          s.unshift(n);
        }while (a[r] === s[r]) {
          r++;
        }return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0;
      }, d) : d;
    }, oe.matches = function (e, t) {
      return oe(e, null, null, t);
    }, oe.matchesSelector = function (e, t) {
      if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!y || !y.test(t))) try {
        var r = m.call(e, t);if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
      } catch (e) {}return oe(t, d, null, [e]).length > 0;
    }, oe.contains = function (e, t) {
      return (e.ownerDocument || e) !== d && p(e), x(e, t);
    }, oe.attr = function (e, t) {
      (e.ownerDocument || e) !== d && p(e);var i = r.attrHandle[t.toLowerCase()],
          o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
    }, oe.escape = function (e) {
      return (e + "").replace(te, ne);
    }, oe.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, oe.uniqueSort = function (e) {
      var t,
          r = [],
          i = 0,
          o = 0;if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) {
        while (t = e[o++]) {
          t === e[o] && (i = r.push(o));
        }while (i--) {
          e.splice(r[i], 1);
        }
      }return c = null, e;
    }, i = oe.getText = function (e) {
      var t,
          n = "",
          r = 0,
          o = e.nodeType;if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
            n += i(e);
          }
        } else if (3 === o || 4 === o) return e.nodeValue;
      } else while (t = e[r++]) {
        n += i(t);
      }return n;
    }, (r = oe.selectors = { cacheLength: 50, createPseudo: se, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
          return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        }, CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e;
        }, PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        } }, filter: { TAG: function TAG(e) {
          var t = e.replace(Z, ee).toLowerCase();return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        }, CLASS: function CLASS(e) {
          var t = E[e + " "];return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(e, t, n) {
          return function (r) {
            var i = oe.attr(r, e);return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"));
          };
        }, CHILD: function CHILD(e, t, n, r, i) {
          var o = "nth" !== e.slice(0, 3),
              a = "last" !== e.slice(-4),
              s = "of-type" === t;return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode;
          } : function (t, n, u) {
            var l,
                c,
                f,
                p,
                d,
                h,
                g = o !== a ? "nextSibling" : "previousSibling",
                y = t.parentNode,
                v = s && t.nodeName.toLowerCase(),
                m = !u && !s,
                x = !1;if (y) {
              if (o) {
                while (g) {
                  p = t;while (p = p[g]) {
                    if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                  }h = g = "only" === e && !h && "nextSibling";
                }return !0;
              }if (h = [a ? y.firstChild : y.lastChild], a && m) {
                x = (d = (l = (c = (f = (p = y)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && y.childNodes[d];while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
                  if (1 === p.nodeType && ++x && p === t) {
                    c[e] = [T, d, x];break;
                  }
                }
              } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x) while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
                if ((s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) && ++x && (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p === t)) break;
              }return (x -= i) === r || x % r == 0 && x / r >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(e, t) {
          var n,
              i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function (e, n) {
            var r,
                o = i(e, t),
                a = o.length;while (a--) {
              e[r = O(e, o[a])] = !(n[r] = o[a]);
            }
          }) : function (e) {
            return i(e, 0, n);
          }) : i;
        } }, pseudos: { not: se(function (e) {
          var t = [],
              n = [],
              r = s(e.replace(B, "$1"));return r[b] ? se(function (e, t, n, i) {
            var o,
                a = r(e, null, i, []),
                s = e.length;while (s--) {
              (o = a[s]) && (e[s] = !(t[s] = o));
            }
          }) : function (e, i, o) {
            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop();
          };
        }), has: se(function (e) {
          return function (t) {
            return oe(e, t).length > 0;
          };
        }), contains: se(function (e) {
          return e = e.replace(Z, ee), function (t) {
            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1;
          };
        }), lang: se(function (e) {
          return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(), function (t) {
            var n;do {
              if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
            } while ((t = t.parentNode) && 1 === t.nodeType);return !1;
          };
        }), target: function target(t) {
          var n = e.location && e.location.hash;return n && n.slice(1) === t.id;
        }, root: function root(e) {
          return e === h;
        }, focus: function focus(e) {
          return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        }, enabled: de(!1), disabled: de(!0), checked: function checked(e) {
          var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
        }, selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        }, empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }return !0;
        }, parent: function parent(e) {
          return !r.pseudos.empty(e);
        }, header: function header(e) {
          return Y.test(e.nodeName);
        }, input: function input(e) {
          return G.test(e.nodeName);
        }, button: function button(e) {
          var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
        }, text: function text(e) {
          var t;return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        }, first: he(function () {
          return [0];
        }), last: he(function (e, t) {
          return [t - 1];
        }), eq: he(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }), even: he(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }return e;
        }), odd: he(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }return e;
        }), lt: he(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; --r >= 0;) {
            e.push(r);
          }return e;
        }), gt: he(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {
            e.push(r);
          }return e;
        }) } }).pseudos.nth = r.pseudos.eq;for (t in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      r.pseudos[t] = fe(t);
    }for (t in { submit: !0, reset: !0 }) {
      r.pseudos[t] = pe(t);
    }function ye() {}ye.prototype = r.filters = r.pseudos, r.setFilters = new ye(), a = oe.tokenize = function (e, t) {
      var n,
          i,
          o,
          a,
          s,
          u,
          l,
          c = k[e + " "];if (c) return t ? 0 : c.slice(0);s = e, u = [], l = r.preFilter;while (s) {
        n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({ value: n, type: i[0].replace(B, " ") }), s = s.slice(n.length));for (a in r.filter) {
          !(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({ value: n, type: a, matches: i }), s = s.slice(n.length));
        }if (!n) break;
      }return t ? s.length : s ? oe.error(e) : k(e, u).slice(0);
    };function ve(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) {
        r += e[t].value;
      }return r;
    }function me(e, t, n) {
      var r = t.dir,
          i = t.next,
          o = i || r,
          a = n && "parentNode" === o,
          s = C++;return t.first ? function (t, n, i) {
        while (t = t[r]) {
          if (1 === t.nodeType || a) return e(t, n, i);
        }return !1;
      } : function (t, n, u) {
        var l,
            c,
            f,
            p = [T, s];if (u) {
          while (t = t[r]) {
            if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
          }
        } else while (t = t[r]) {
          if (1 === t.nodeType || a) if (f = t[b] || (t[b] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;else {
            if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2];if (c[o] = p, p[2] = e(t, n, u)) return !0;
          }
        }return !1;
      };
    }function xe(e) {
      return e.length > 1 ? function (t, n, r) {
        var i = e.length;while (i--) {
          if (!e[i](t, n, r)) return !1;
        }return !0;
      } : e[0];
    }function be(e, t, n) {
      for (var r = 0, i = t.length; r < i; r++) {
        oe(e, t[r], n);
      }return n;
    }function we(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
        (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      }return a;
    }function Te(e, t, n, r, i, o) {
      return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), se(function (o, a, s, u) {
        var l,
            c,
            f,
            p = [],
            d = [],
            h = a.length,
            g = o || be(t || "*", s.nodeType ? [s] : s, []),
            y = !e || !o && t ? g : we(g, p, e, s, u),
            v = n ? i || (o ? e : h || r) ? [] : a : y;if (n && n(y, v, s, u), r) {
          l = we(v, d), r(l, [], s, u), c = l.length;while (c--) {
            (f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
          }
        }if (o) {
          if (i || e) {
            if (i) {
              l = [], c = v.length;while (c--) {
                (f = v[c]) && l.push(y[c] = f);
              }i(null, v = [], l, u);
            }c = v.length;while (c--) {
              (f = v[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f));
            }
          }
        } else v = we(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : L.apply(a, v);
      });
    }function Ce(e) {
      for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function (e) {
        return e === t;
      }, s, !0), f = me(function (e) {
        return O(t, e) > -1;
      }, s, !0), p = [function (e, n, r) {
        var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));return t = null, i;
      }]; u < o; u++) {
        if (n = r.relative[e[u].type]) p = [me(xe(p), n)];else {
          if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
            for (i = ++u; i < o; i++) {
              if (r.relative[e[i].type]) break;
            }return Te(u > 1 && xe(p), u > 1 && ve(e.slice(0, u - 1).concat({ value: " " === e[u - 2].type ? "*" : "" })).replace(B, "$1"), n, u < i && Ce(e.slice(u, i)), i < o && Ce(e = e.slice(i)), i < o && ve(e));
          }p.push(n);
        }
      }return xe(p);
    }function Ee(e, t) {
      var n = t.length > 0,
          i = e.length > 0,
          o = function o(_o, a, s, u, c) {
        var f,
            h,
            y,
            v = 0,
            m = "0",
            x = _o && [],
            b = [],
            w = l,
            C = _o || i && r.find.TAG("*", c),
            E = T += null == w ? 1 : Math.random() || .1,
            k = C.length;for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) {
          if (i && f) {
            h = 0, a || f.ownerDocument === d || (p(f), s = !g);while (y = e[h++]) {
              if (y(f, a || d, s)) {
                u.push(f);break;
              }
            }c && (T = E);
          }n && ((f = !y && f) && v--, _o && x.push(f));
        }if (v += m, n && m !== v) {
          h = 0;while (y = t[h++]) {
            y(x, b, a, s);
          }if (_o) {
            if (v > 0) while (m--) {
              x[m] || b[m] || (b[m] = j.call(u));
            }b = we(b);
          }L.apply(u, b), c && !_o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u);
        }return c && (T = E, l = w), x;
      };return n ? se(o) : o;
    }return s = oe.compile = function (e, t) {
      var n,
          r = [],
          i = [],
          o = S[e + " "];if (!o) {
        t || (t = a(e)), n = t.length;while (n--) {
          (o = Ce(t[n]))[b] ? r.push(o) : i.push(o);
        }(o = S(e, Ee(i, r))).selector = e;
      }return o;
    }, u = oe.select = function (e, t, n, i) {
      var o,
          u,
          l,
          c,
          f,
          p = "function" == typeof e && e,
          d = !i && a(e = p.selector || e);if (n = n || [], 1 === d.length) {
        if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
          if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;p && (t = t.parentNode), e = e.slice(u.shift().value.length);
        }o = V.needsContext.test(e) ? 0 : u.length;while (o--) {
          if (l = u[o], r.relative[c = l.type]) break;if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) {
            if (u.splice(o, 1), !(e = i.length && ve(u))) return L.apply(n, i), n;break;
          }
        }
      }return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n;
    }, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function (e) {
      return 1 & e.compareDocumentPosition(d.createElement("fieldset"));
    }), ue(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || le("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), n.attributes && ue(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || le("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), ue(function (e) {
      return null == e.getAttribute("disabled");
    }) || le(P, function (e, t, n) {
      var r;if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }), oe;
  }(e);w.find = E, w.expr = E.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = E.uniqueSort, w.text = E.getText, w.isXMLDoc = E.isXML, w.contains = E.contains, w.escapeSelector = E.escape;var k = function k(e, t, n) {
    var r = [],
        i = void 0 !== n;while ((e = e[t]) && 9 !== e.nodeType) {
      if (1 === e.nodeType) {
        if (i && w(e).is(n)) break;r.push(e);
      }
    }return r;
  },
      S = function S(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }return n;
  },
      D = w.expr.match.needsContext;function N(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e, t, n) {
    return g(t) ? w.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n;
    }) : t.nodeType ? w.grep(e, function (e) {
      return e === t !== n;
    }) : "string" != typeof t ? w.grep(e, function (e) {
      return u.call(t, e) > -1 !== n;
    }) : w.filter(t, e, n);
  }w.filter = function (e, t, n) {
    var r = t[0];return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, w.fn.extend({ find: function find(e) {
      var t,
          n,
          r = this.length,
          i = this;if ("string" != typeof e) return this.pushStack(w(e).filter(function () {
        for (t = 0; t < r; t++) {
          if (w.contains(i[t], this)) return !0;
        }
      }));for (n = this.pushStack([]), t = 0; t < r; t++) {
        w.find(e, i[t], n);
      }return r > 1 ? w.uniqueSort(n) : n;
    }, filter: function filter(e) {
      return this.pushStack(j(this, e || [], !1));
    }, not: function not(e) {
      return this.pushStack(j(this, e || [], !0));
    }, is: function is(e) {
      return !!j(this, "string" == typeof e && D.test(e) ? w(e) : e || [], !1).length;
    } });var q,
      L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init = function (e, t, n) {
    var i, o;if (!e) return this;if (n = n || q, "string" == typeof e) {
      if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);if (i[1]) {
        if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), A.test(i[1]) && w.isPlainObject(t)) for (i in t) {
          g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
        }return this;
      }return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this;
    }return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this);
  }).prototype = w.fn, q = w(r);var H = /^(?:parents|prev(?:Until|All))/,
      O = { children: !0, contents: !0, next: !0, prev: !0 };w.fn.extend({ has: function has(e) {
      var t = w(e, this),
          n = t.length;return this.filter(function () {
        for (var e = 0; e < n; e++) {
          if (w.contains(this, t[e])) return !0;
        }
      });
    }, closest: function closest(e, t) {
      var n,
          r = 0,
          i = this.length,
          o = [],
          a = "string" != typeof e && w(e);if (!D.test(e)) for (; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
            o.push(n);break;
          }
        }
      }return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o);
    }, index: function index(e) {
      return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(e, t) {
      return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
    }, addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    } });function P(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType) {}return e;
  }w.each({ parent: function parent(e) {
      var t = e.parentNode;return t && 11 !== t.nodeType ? t : null;
    }, parents: function parents(e) {
      return k(e, "parentNode");
    }, parentsUntil: function parentsUntil(e, t, n) {
      return k(e, "parentNode", n);
    }, next: function next(e) {
      return P(e, "nextSibling");
    }, prev: function prev(e) {
      return P(e, "previousSibling");
    }, nextAll: function nextAll(e) {
      return k(e, "nextSibling");
    }, prevAll: function prevAll(e) {
      return k(e, "previousSibling");
    }, nextUntil: function nextUntil(e, t, n) {
      return k(e, "nextSibling", n);
    }, prevUntil: function prevUntil(e, t, n) {
      return k(e, "previousSibling", n);
    }, siblings: function siblings(e) {
      return S((e.parentNode || {}).firstChild, e);
    }, children: function children(e) {
      return S(e.firstChild);
    }, contents: function contents(e) {
      return N(e, "iframe") ? e.contentDocument : (N(e, "template") && (e = e.content || e), w.merge([], e.childNodes));
    } }, function (e, t) {
    w.fn[e] = function (n, r) {
      var i = w.map(this, t, n);return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (O[e] || w.uniqueSort(i), H.test(e) && i.reverse()), this.pushStack(i);
    };
  });var M = /[^\x20\t\r\n\f]+/g;function R(e) {
    var t = {};return w.each(e.match(M) || [], function (e, n) {
      t[n] = !0;
    }), t;
  }w.Callbacks = function (e) {
    e = "string" == typeof e ? R(e) : w.extend({}, e);var t,
        n,
        r,
        i,
        o = [],
        a = [],
        s = -1,
        u = function u() {
      for (i = i || e.once, r = t = !0; a.length; s = -1) {
        n = a.shift();while (++s < o.length) {
          !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
        }
      }e.memory || (n = !1), t = !1, i && (o = n ? [] : "");
    },
        l = { add: function add() {
        return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
          w.each(n, function (n, r) {
            g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r);
          });
        }(arguments), n && !t && u()), this;
      }, remove: function remove() {
        return w.each(arguments, function (e, t) {
          var n;while ((n = w.inArray(t, o, n)) > -1) {
            o.splice(n, 1), n <= s && s--;
          }
        }), this;
      }, has: function has(e) {
        return e ? w.inArray(e, o) > -1 : o.length > 0;
      }, empty: function empty() {
        return o && (o = []), this;
      }, disable: function disable() {
        return i = a = [], o = n = "", this;
      }, disabled: function disabled() {
        return !o;
      }, lock: function lock() {
        return i = a = [], n || t || (o = n = ""), this;
      }, locked: function locked() {
        return !!i;
      }, fireWith: function fireWith(e, n) {
        return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this;
      }, fire: function fire() {
        return l.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!r;
      } };return l;
  };function I(e) {
    return e;
  }function W(e) {
    throw e;
  }function $(e, t, n, r) {
    var i;try {
      e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }w.extend({ Deferred: function Deferred(t) {
      var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]],
          r = "pending",
          i = { state: function state() {
          return r;
        }, always: function always() {
          return o.done(arguments).fail(arguments), this;
        }, "catch": function _catch(e) {
          return i.then(null, e);
        }, pipe: function pipe() {
          var e = arguments;return w.Deferred(function (t) {
            w.each(n, function (n, r) {
              var i = g(e[r[4]]) && e[r[4]];o[r[1]](function () {
                var e = i && i.apply(this, arguments);e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments);
              });
            }), e = null;
          }).promise();
        }, then: function then(t, r, i) {
          var o = 0;function a(t, n, r, i) {
            return function () {
              var s = this,
                  u = arguments,
                  l = function l() {
                var e, l;if (!(t < o)) {
                  if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution");l = e && ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, I, i), a(o, n, W, i)) : (o++, l.call(e, a(o, n, I, i), a(o, n, W, i), a(o, n, I, n.notifyWith))) : (r !== I && (s = void 0, u = [e]), (i || n.resolveWith)(s, u));
                }
              },
                  c = i ? l : function () {
                try {
                  l();
                } catch (e) {
                  w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== W && (s = void 0, u = [e]), n.rejectWith(s, u));
                }
              };t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), e.setTimeout(c));
            };
          }return w.Deferred(function (e) {
            n[0][3].add(a(0, e, g(i) ? i : I, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : I)), n[2][3].add(a(0, e, g(r) ? r : W));
          }).promise();
        }, promise: function promise(e) {
          return null != e ? w.extend(e, i) : i;
        } },
          o = {};return w.each(n, function (e, t) {
        var a = t[2],
            s = t[5];i[t[1]] = a.add, s && a.add(function () {
          r = s;
        }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function () {
          return o[t[0] + "With"](this === o ? void 0 : this, arguments), this;
        }, o[t[0] + "With"] = a.fireWith;
      }), i.promise(o), t && t.call(o, o), o;
    }, when: function when(e) {
      var t = arguments.length,
          n = t,
          r = Array(n),
          i = o.call(arguments),
          a = w.Deferred(),
          s = function s(e) {
        return function (n) {
          r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i);
        };
      };if (t <= 1 && ($(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then();while (n--) {
        $(i[n], s(n), a.reject);
      }return a.promise();
    } });var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook = function (t, n) {
    e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
  }, w.readyException = function (t) {
    e.setTimeout(function () {
      throw t;
    });
  };var F = w.Deferred();w.fn.ready = function (e) {
    return F.then(e)["catch"](function (e) {
      w.readyException(e);
    }), this;
  }, w.extend({ isReady: !1, readyWait: 1, ready: function ready(e) {
      (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || F.resolveWith(r, [w]));
    } }), w.ready.then = F.then;function _() {
    r.removeEventListener("DOMContentLoaded", _), e.removeEventListener("load", _), w.ready();
  }"complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", _), e.addEventListener("load", _));var z = function z(e, t, n, r, i, o, a) {
    var s = 0,
        u = e.length,
        l = null == n;if ("object" === x(n)) {
      i = !0;for (s in n) {
        z(e, t, s, n[s], !0, o, a);
      }
    } else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
      return l.call(w(e), n);
    })), t)) for (; s < u; s++) {
      t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    }return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
  },
      X = /^-ms-/,
      U = /-([a-z])/g;function V(e, t) {
    return t.toUpperCase();
  }function G(e) {
    return e.replace(X, "ms-").replace(U, V);
  }var Y = function Y(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };function Q() {
    this.expando = w.expando + Q.uid++;
  }Q.uid = 1, Q.prototype = { cache: function cache(e) {
      var t = e[this.expando];return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
    }, set: function set(e, t, n) {
      var r,
          i = this.cache(e);if ("string" == typeof t) i[G(t)] = n;else for (r in t) {
        i[G(r)] = t[r];
      }return i;
    }, get: function get(e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)];
    }, access: function access(e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    }, remove: function remove(e, t) {
      var n,
          r = e[this.expando];if (void 0 !== r) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(M) || []).length;while (n--) {
            delete r[t[n]];
          }
        }(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    }, hasData: function hasData(e) {
      var t = e[this.expando];return void 0 !== t && !w.isEmptyObject(t);
    } };var J = new Q(),
      K = new Q(),
      Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      ee = /[A-Z]/g;function te(e) {
    return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Z.test(e) ? JSON.parse(e) : e);
  }function ne(e, t, n) {
    var r;if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
      try {
        n = te(n);
      } catch (e) {}K.set(e, t, n);
    } else n = void 0;return n;
  }w.extend({ hasData: function hasData(e) {
      return K.hasData(e) || J.hasData(e);
    }, data: function data(e, t, n) {
      return K.access(e, t, n);
    }, removeData: function removeData(e, t) {
      K.remove(e, t);
    }, _data: function _data(e, t, n) {
      return J.access(e, t, n);
    }, _removeData: function _removeData(e, t) {
      J.remove(e, t);
    } }), w.fn.extend({ data: function data(e, t) {
      var n,
          r,
          i,
          o = this[0],
          a = o && o.attributes;if (void 0 === e) {
        if (this.length && (i = K.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) {
          n = a.length;while (n--) {
            a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = G(r.slice(5)), ne(o, r, i[r]));
          }J.set(o, "hasDataAttrs", !0);
        }return i;
      }return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? this.each(function () {
        K.set(this, e);
      }) : z(this, function (t) {
        var n;if (o && void 0 === t) {
          if (void 0 !== (n = K.get(o, e))) return n;if (void 0 !== (n = ne(o, e))) return n;
        } else this.each(function () {
          K.set(this, e, t);
        });
      }, null, t, arguments.length > 1, null, !0);
    }, removeData: function removeData(e) {
      return this.each(function () {
        K.remove(this, e);
      });
    } }), w.extend({ queue: function queue(e, t, n) {
      var r;if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || Array.isArray(n) ? r = J.access(e, t, w.makeArray(n)) : r.push(n)), r || [];
    }, dequeue: function dequeue(e, t) {
      t = t || "fx";var n = w.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = w._queueHooks(e, t),
          a = function a() {
        w.dequeue(e, t);
      };"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
    }, _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";return J.get(e, n) || J.access(e, n, { empty: w.Callbacks("once memory").add(function () {
          J.remove(e, [t + "queue", n]);
        }) });
    } }), w.fn.extend({ queue: function queue(e, t) {
      var n = 2;return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = w.queue(this, e, t);w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e);
      });
    }, dequeue: function dequeue(e) {
      return this.each(function () {
        w.dequeue(this, e);
      });
    }, clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    }, promise: function promise(e, t) {
      var n,
          r = 1,
          i = w.Deferred(),
          o = this,
          a = this.length,
          s = function s() {
        --r || i.resolveWith(o, [o]);
      };"string" != typeof e && (t = e, e = void 0), e = e || "fx";while (a--) {
        (n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      }return s(), i.promise(t);
    } });var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
      oe = ["Top", "Right", "Bottom", "Left"],
      ae = function ae(e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display");
  },
      se = function se(e, t, n, r) {
    var i,
        o,
        a = {};for (o in t) {
      a[o] = e.style[o], e.style[o] = t[o];
    }i = n.apply(e, r || []);for (o in t) {
      e.style[o] = a[o];
    }return i;
  };function ue(e, t, n, r) {
    var i,
        o,
        a = 20,
        s = r ? function () {
      return r.cur();
    } : function () {
      return w.css(e, t, "");
    },
        u = s(),
        l = n && n[3] || (w.cssNumber[t] ? "" : "px"),
        c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t));if (c && c[3] !== l) {
      u /= 2, l = l || c[3], c = +u || 1;while (a--) {
        w.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
      }c *= 2, w.style(e, t, c + l), n = n || [];
    }return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }var le = {};function ce(e) {
    var t,
        n = e.ownerDocument,
        r = e.nodeName,
        i = le[r];return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i);
  }function fe(e, t) {
    for (var n, r, i = [], o = 0, a = e.length; o < a; o++) {
      (r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = J.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && ae(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", J.set(r, "display", n)));
    }for (o = 0; o < a; o++) {
      null != i[o] && (e[o].style.display = i[o]);
    }return e;
  }w.fn.extend({ show: function show() {
      return fe(this, !0);
    }, hide: function hide() {
      return fe(this);
    }, toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ae(this) ? w(this).show() : w(this).hide();
      });
    } });var pe = /^(?:checkbox|radio)$/i,
      de = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      he = /^$|^module$|\/(?:java|ecma)script/i,
      ge = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;function ye(e, t) {
    var n;return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && N(e, t) ? w.merge([e], n) : n;
  }function ve(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval"));
    }
  }var me = /<|&#?\w+;/;function xe(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
      if ((o = e[d]) || 0 === o) if ("object" === x(o)) w.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
        a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0];while (c--) {
          a = a.lastChild;
        }w.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
      } else p.push(t.createTextNode(o));
    }f.textContent = "", d = 0;while (o = p[d++]) {
      if (r && w.inArray(o, r) > -1) i && i.push(o);else if (l = w.contains(o.ownerDocument, o), a = ye(f.appendChild(o), "script"), l && ve(a), n) {
        c = 0;while (o = a[c++]) {
          he.test(o.type || "") && n.push(o);
        }
      }
    }return f;
  }!function () {
    var e = r.createDocumentFragment().appendChild(r.createElement("div")),
        t = r.createElement("input");t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue;
  }();var be = r.documentElement,
      we = /^key/,
      Te = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Ce = /^([^.]*)(?:\.(.+)|)/;function Ee() {
    return !0;
  }function ke() {
    return !1;
  }function Se() {
    try {
      return r.activeElement;
    } catch (e) {}
  }function De(e, t, n, r, i, o) {
    var a, s;if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
      "string" != typeof n && (r = r || n, n = void 0);for (s in t) {
        De(e, s, n, r, t[s], o);
      }return e;
    }if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke;else if (!i) return e;return 1 === o && (a = i, (i = function i(e) {
      return w().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = w.guid++)), e.each(function () {
      w.event.add(this, t, i, r, n);
    });
  }w.event = { global: {}, add: function add(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          y = J.get(e);if (y) {
        n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(be, i), n.guid || (n.guid = w.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function (t) {
          return "undefined" != typeof w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0;
        }), l = (t = (t || "").match(M) || [""]).length;while (l--) {
          d = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, c = w.extend({ type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && w.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), w.event.global[d] = !0);
        }
      }
    }, remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          y = J.hasData(e) && J.get(e);if (y && (u = y.events)) {
        l = (t = (t || "").match(M) || [""]).length;while (l--) {
          if (s = Ce.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
            f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;while (o--) {
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            }a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || w.removeEvent(e, d, y.handle), delete u[d]);
          } else for (d in u) {
            w.event.remove(e, d + t[l], n, r, !0);
          }
        }w.isEmptyObject(u) && J.remove(e, "handle events");
      }
    }, dispatch: function dispatch(e) {
      var t = w.event.fix(e),
          n,
          r,
          i,
          o,
          a,
          s,
          u = new Array(arguments.length),
          l = (J.get(this, "events") || {})[t.type] || [],
          c = w.event.special[t.type] || {};for (u[0] = t, n = 1; n < arguments.length; n++) {
        u[n] = arguments[n];
      }if (t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
        s = w.event.handlers.call(this, t, l), n = 0;while ((o = s[n++]) && !t.isPropagationStopped()) {
          t.currentTarget = o.elem, r = 0;while ((a = o.handlers[r++]) && !t.isImmediatePropagationStopped()) {
            t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, void 0 !== (i = ((w.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
          }
        }return c.postDispatch && c.postDispatch.call(this, t), t.result;
      }
    }, handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          a,
          s = [],
          u = t.delegateCount,
          l = e.target;if (u && l.nodeType && !("click" === e.type && e.button >= 1)) for (; l !== this; l = l.parentNode || this) {
        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
          for (o = [], a = {}, n = 0; n < u; n++) {
            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), a[i] && o.push(r);
          }o.length && s.push({ elem: l, handlers: o });
        }
      }return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s;
    }, addProp: function addProp(e, t) {
      Object.defineProperty(w.Event.prototype, e, { enumerable: !0, configurable: !0, get: g(t) ? function () {
          if (this.originalEvent) return t(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[e];
        }, set: function set(t) {
          Object.defineProperty(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t });
        } });
    }, fix: function fix(e) {
      return e[w.expando] ? e : new w.Event(e);
    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          if (this !== Se() && this.focus) return this.focus(), !1;
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          if (this === Se() && this.blur) return this.blur(), !1;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1;
        }, _default: function _default(e) {
          return N(e.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        } } } }, w.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, w.Event = function (e, t) {
    if (!(this instanceof w.Event)) return new w.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0;
  }, w.Event.prototype = { constructor: w.Event, isDefaultPrevented: ke, isPropagationStopped: ke, isImmediatePropagationStopped: ke, isSimulated: !1, preventDefault: function preventDefault() {
      var e = this.originalEvent;this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var e = this.originalEvent;this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    } }, w.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(e) {
      var t = e.button;return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Te.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
    } }, w.event.addProp), w.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
    w.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
        var n,
            r = this,
            i = e.relatedTarget,
            o = e.handleObj;return i && (i === r || w.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
      } };
  }), w.fn.extend({ on: function on(e, t, n, r) {
      return De(this, e, t, n, r);
    }, one: function one(e, t, n, r) {
      return De(this, e, t, n, r, 1);
    }, off: function off(e, t, n) {
      var r, i;if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
        for (i in e) {
          this.off(i, t, e[i]);
        }return this;
      }return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function () {
        w.event.remove(this, e, n, t);
      });
    } });var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Ae = /<script|<style|<link/i,
      je = /checked\s*(?:[^=]|=\s*.checked.)/i,
      qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e, t) {
    return N(e, "table") && N(11 !== t.nodeType ? t : t.firstChild, "tr") ? w(e).children("tbody")[0] || e : e;
  }function He(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }function Oe(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }function Pe(e, t) {
    var n, r, i, o, a, s, u, l;if (1 === t.nodeType) {
      if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), l = o.events)) {
        delete a.handle, a.events = {};for (i in l) {
          for (n = 0, r = l[i].length; n < r; n++) {
            w.event.add(t, i, l[i][n]);
          }
        }
      }K.hasData(e) && (s = K.access(e), u = w.extend({}, s), K.set(t, u));
    }
  }function Me(e, t) {
    var n = t.nodeName.toLowerCase();"input" === n && pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
  }function Re(e, t, n, r) {
    t = a.apply([], t);var i,
        o,
        s,
        u,
        l,
        c,
        f = 0,
        p = e.length,
        d = p - 1,
        y = t[0],
        v = g(y);if (v || p > 1 && "string" == typeof y && !h.checkClone && je.test(y)) return e.each(function (i) {
      var o = e.eq(i);v && (t[0] = y.call(this, i, o.html())), Re(o, t, n, r);
    });if (p && (i = xe(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
      for (u = (s = w.map(ye(i, "script"), He)).length; f < p; f++) {
        l = i, f !== d && (l = w.clone(l, !0, !0), u && w.merge(s, ye(l, "script"))), n.call(e[f], l, f);
      }if (u) for (c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0; f < u; f++) {
        l = s[f], he.test(l.type || "") && !J.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(l.src) : m(l.textContent.replace(qe, ""), c, l));
      }
    }return e;
  }function Ie(e, t, n) {
    for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
      n || 1 !== r.nodeType || w.cleanData(ye(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ye(r, "script")), r.parentNode.removeChild(r));
    }return e;
  }w.extend({ htmlPrefilter: function htmlPrefilter(e) {
      return e.replace(Ne, "<$1></$2>");
    }, clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s = e.cloneNode(!0),
          u = w.contains(e.ownerDocument, e);if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e))) for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++) {
        Me(o[r], a[r]);
      }if (t) if (n) for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++) {
        Pe(o[r], a[r]);
      } else Pe(e, s);return (a = ye(s, "script")).length > 0 && ve(a, !u && ye(e, "script")), s;
    }, cleanData: function cleanData(e) {
      for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++) {
        if (Y(n)) {
          if (t = n[J.expando]) {
            if (t.events) for (r in t.events) {
              i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
            }n[J.expando] = void 0;
          }n[K.expando] && (n[K.expando] = void 0);
        }
      }
    } }), w.fn.extend({ detach: function detach(e) {
      return Ie(this, e, !0);
    }, remove: function remove(e) {
      return Ie(this, e);
    }, text: function text(e) {
      return z(this, function (e) {
        return void 0 === e ? w.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    }, append: function append() {
      return Re(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e);
      });
    }, prepend: function prepend() {
      return Re(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = Le(this, e);t.insertBefore(e, t.firstChild);
        }
      });
    }, before: function before() {
      return Re(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    }, after: function after() {
      return Re(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    }, empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        1 === e.nodeType && (w.cleanData(ye(e, !1)), e.textContent = "");
      }return this;
    }, clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return w.clone(this, e, t);
      });
    }, html: function html(e) {
      return z(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;if (void 0 === e && 1 === t.nodeType) return t.innerHTML;if ("string" == typeof e && !Ae.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = w.htmlPrefilter(e);try {
            for (; n < r; n++) {
              1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)), t.innerHTML = e);
            }t = 0;
          } catch (e) {}
        }t && this.empty().append(e);
      }, null, e, arguments.length);
    }, replaceWith: function replaceWith() {
      var e = [];return Re(this, arguments, function (t) {
        var n = this.parentNode;w.inArray(this, e) < 0 && (w.cleanData(ye(this)), n && n.replaceChild(t, this));
      }, e);
    } }), w.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
    w.fn[e] = function (e) {
      for (var n, r = [], i = w(e), o = i.length - 1, a = 0; a <= o; a++) {
        n = a === o ? this : this.clone(!0), w(i[a])[t](n), s.apply(r, n.get());
      }return this.pushStack(r);
    };
  });var We = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
      $e = function $e(t) {
    var n = t.ownerDocument.defaultView;return n && n.opener || (n = e), n.getComputedStyle(t);
  },
      Be = new RegExp(oe.join("|"), "i");!function () {
    function t() {
      if (c) {
        l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", be.appendChild(l).appendChild(c);var t = e.getComputedStyle(c);i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", be.removeChild(l), c = null;
      }
    }function n(e) {
      return Math.round(parseFloat(e));
    }var i,
        o,
        a,
        s,
        u,
        l = r.createElement("div"),
        c = r.createElement("div");c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(h, { boxSizingReliable: function boxSizingReliable() {
        return t(), o;
      }, pixelBoxStyles: function pixelBoxStyles() {
        return t(), s;
      }, pixelPosition: function pixelPosition() {
        return t(), i;
      }, reliableMarginLeft: function reliableMarginLeft() {
        return t(), u;
      }, scrollboxSize: function scrollboxSize() {
        return t(), a;
      } }));
  }();function Fe(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (a = w.style(e, t)), !h.pixelBoxStyles() && We.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
  }function _e(e, t) {
    return { get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);delete this.get;
      } };
  }var ze = /^(none|table(?!-c[ea]).+)/,
      Xe = /^--/,
      Ue = { position: "absolute", visibility: "hidden", display: "block" },
      Ve = { letterSpacing: "0", fontWeight: "400" },
      Ge = ["Webkit", "Moz", "ms"],
      Ye = r.createElement("div").style;function Qe(e) {
    if (e in Ye) return e;var t = e[0].toUpperCase() + e.slice(1),
        n = Ge.length;while (n--) {
      if ((e = Ge[n] + t) in Ye) return e;
    }
  }function Je(e) {
    var t = w.cssProps[e];return t || (t = w.cssProps[e] = Qe(e) || e), t;
  }function Ke(e, t, n) {
    var r = ie.exec(t);return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }function Ze(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
        s = 0,
        u = 0;if (n === (r ? "border" : "content")) return 0;for (; a < 4; a += 2) {
      "margin" === n && (u += w.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[a] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[a] + "Width", !0, i) : s += w.css(e, "border" + oe[a] + "Width", !0, i));
    }return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u;
  }function et(e, t, n) {
    var r = $e(e),
        i = Fe(e, t, r),
        o = "border-box" === w.css(e, "boxSizing", !1, r),
        a = o;if (We.test(i)) {
      if (!n) return i;i = "auto";
    }return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), a, r, i) + "px";
  }w.extend({ cssHooks: { opacity: { get: function get(e, t) {
          if (t) {
            var n = Fe(e, "opacity");return "" === n ? "1" : n;
          }
        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            a,
            s = G(t),
            u = Xe.test(t),
            l = e.style;if (u || (t = Je(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];"string" == (o = typeof n === "undefined" ? "undefined" : _typeof(n)) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
      }
    }, css: function css(e, t, n, r) {
      var i,
          o,
          a,
          s = G(t);return Xe.test(t) || (t = Je(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Fe(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
    } }), w.each(["height", "width"], function (e, t) {
    w.cssHooks[t] = { get: function get(e, n, r) {
        if (n) return !ze.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : se(e, Ue, function () {
          return et(e, t, r);
        });
      }, set: function set(e, n, r) {
        var i,
            o = $e(e),
            a = "border-box" === w.css(e, "boxSizing", !1, o),
            s = r && Ze(e, t, r, a, o);return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ke(e, n, s);
      } };
  }), w.cssHooks.marginLeft = _e(h.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(Fe(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, { marginLeft: 0 }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), w.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
    w.cssHooks[e + t] = { expand: function expand(n) {
        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) {
          i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
        }return i;
      } }, "margin" !== e && (w.cssHooks[e + t].set = Ke);
  }), w.fn.extend({ css: function css(e, t) {
      return z(this, function (e, t, n) {
        var r,
            i,
            o = {},
            a = 0;if (Array.isArray(t)) {
          for (r = $e(e), i = t.length; a < i; a++) {
            o[t[a]] = w.css(e, t[a], !1, r);
          }return o;
        }return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
      }, e, t, arguments.length > 1);
    } });function tt(e, t, n, r, i) {
    return new tt.prototype.init(e, t, n, r, i);
  }w.Tween = tt, tt.prototype = { constructor: tt, init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px");
    }, cur: function cur() {
      var e = tt.propHooks[this.prop];return e && e.get ? e.get(this) : tt.propHooks._default.get(this);
    }, run: function run(e) {
      var t,
          n = tt.propHooks[this.prop];return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this;
    } }, tt.prototype.init.prototype = tt.prototype, tt.propHooks = { _default: { get: function get(e) {
        var t;return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      }, set: function set(e) {
        w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit);
      } } }, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = { set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    } }, w.easing = { linear: function linear(e) {
      return e;
    }, swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    }, _default: "swing" }, w.fx = tt.prototype.init, w.fx.step = {};var nt,
      rt,
      it = /^(?:toggle|show|hide)$/,
      ot = /queueHooks$/;function at() {
    rt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(at) : e.setTimeout(at, w.fx.interval), w.fx.tick());
  }function st() {
    return e.setTimeout(function () {
      nt = void 0;
    }), nt = Date.now();
  }function ut(e, t) {
    var n,
        r = 0,
        i = { height: e };for (t = t ? 1 : 0; r < 4; r += 2 - t) {
      i["margin" + (n = oe[r])] = i["padding" + n] = e;
    }return t && (i.opacity = i.width = e), i;
  }function lt(e, t, n) {
    for (var r, i = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }function ct(e, t, n) {
    var r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        f = "width" in t || "height" in t,
        p = this,
        d = {},
        h = e.style,
        g = e.nodeType && ae(e),
        y = J.get(e, "fxshow");n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
      a.unqueued || s();
    }), a.unqueued++, p.always(function () {
      p.always(function () {
        a.unqueued--, w.queue(e, "fx").length || a.empty.fire();
      });
    }));for (r in t) {
      if (i = t[r], it.test(i)) {
        if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
          if ("show" !== i || !y || void 0 === y[r]) continue;g = !0;
        }d[r] = y && y[r] || w.style(e, r);
      }
    }if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d)) {
      f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = J.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = w.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1;for (r in d) {
        u || (y ? "hidden" in y && (g = y.hidden) : y = J.access(e, "fxshow", { display: l }), o && (y.hidden = !g), g && fe([e], !0), p.done(function () {
          g || fe([e]), J.remove(e, "fxshow");for (r in d) {
            w.style(e, r, d[r]);
          }
        })), u = lt(g ? y[r] : 0, r, p), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0));
      }
    }
  }function ft(e, t) {
    var n, r, i, o, a;for (n in e) {
      if (r = G(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = w.cssHooks[r]) && "expand" in a) {
        o = a.expand(o), delete e[r];for (n in o) {
          n in e || (e[n] = o[n], t[n] = i);
        }
      } else t[r] = i;
    }
  }function pt(e, t, n) {
    var r,
        i,
        o = 0,
        a = pt.prefilters.length,
        s = w.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (i) return !1;for (var t = nt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) {
        l.tweens[o].run(r);
      }return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1);
    },
        l = s.promise({ elem: e, props: w.extend({}, t), opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, n), originalProperties: t, originalOptions: n, startTime: nt || st(), duration: n.duration, tweens: [], createTween: function createTween(t, n) {
        var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);return l.tweens.push(r), r;
      }, stop: function stop(t) {
        var n = 0,
            r = t ? l.tweens.length : 0;if (i) return this;for (i = !0; n < r; n++) {
          l.tweens[n].run(1);
        }return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this;
      } }),
        c = l.props;for (ft(c, l.opts.specialEasing); o < a; o++) {
      if (r = pt.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
    }return w.map(c, lt, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l;
  }w.Animation = w.extend(pt, { tweeners: { "*": [function (e, t) {
        var n = this.createTween(e, t);return ue(n.elem, e, ie.exec(t), n), n;
      }] }, tweener: function tweener(e, t) {
      g(e) ? (t = e, e = ["*"]) : e = e.match(M);for (var n, r = 0, i = e.length; r < i; r++) {
        n = e[r], pt.tweeners[n] = pt.tweeners[n] || [], pt.tweeners[n].unshift(t);
      }
    }, prefilters: [ct], prefilter: function prefilter(e, t) {
      t ? pt.prefilters.unshift(e) : pt.prefilters.push(e);
    } }), w.speed = function (e, t, n) {
    var r = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? w.extend({}, e) : { complete: n || !n && t || g(e) && e, duration: e, easing: n && t || t && !g(t) && t };return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue);
    }, r;
  }, w.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
    }, animate: function animate(e, t, n, r) {
      var i = w.isEmptyObject(e),
          o = w.speed(t, n, r),
          a = function a() {
        var t = pt(this, w.extend({}, e), o);(i || J.get(this, "finish")) && t.stop(!0);
      };return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    }, stop: function stop(e, t, n) {
      var r = function r(e) {
        var t = e.stop;delete e.stop, t(n);
      };return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
        var t = !0,
            i = null != e && e + "queueHooks",
            o = w.timers,
            a = J.get(this);if (i) a[i] && a[i].stop && r(a[i]);else for (i in a) {
          a[i] && a[i].stop && ot.test(i) && r(a[i]);
        }for (i = o.length; i--;) {
          o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        }!t && n || w.dequeue(this, e);
      });
    }, finish: function finish(e) {
      return !1 !== e && (e = e || "fx"), this.each(function () {
        var t,
            n = J.get(this),
            r = n[e + "queue"],
            i = n[e + "queueHooks"],
            o = w.timers,
            a = r ? r.length : 0;for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
          o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        }for (t = 0; t < a; t++) {
          r[t] && r[t].finish && r[t].finish.call(this);
        }delete n.finish;
      });
    } }), w.each(["toggle", "show", "hide"], function (e, t) {
    var n = w.fn[t];w.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i);
    };
  }), w.each({ slideDown: ut("show"), slideUp: ut("hide"), slideToggle: ut("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
    w.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), w.timers = [], w.fx.tick = function () {
    var e,
        t = 0,
        n = w.timers;for (nt = Date.now(); t < n.length; t++) {
      (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    }n.length || w.fx.stop(), nt = void 0;
  }, w.fx.timer = function (e) {
    w.timers.push(e), w.fx.start();
  }, w.fx.interval = 13, w.fx.start = function () {
    rt || (rt = !0, at());
  }, w.fx.stop = function () {
    rt = null;
  }, w.fx.speeds = { slow: 600, fast: 200, _default: 400 }, w.fn.delay = function (t, n) {
    return t = w.fx ? w.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
      var i = e.setTimeout(n, t);r.stop = function () {
        e.clearTimeout(i);
      };
    });
  }, function () {
    var e = r.createElement("input"),
        t = r.createElement("select").appendChild(r.createElement("option"));e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value;
  }();var dt,
      ht = w.expr.attrHandle;w.fn.extend({ attr: function attr(e, t) {
      return z(this, w.attr, e, t, arguments.length > 1);
    }, removeAttr: function removeAttr(e) {
      return this.each(function () {
        w.removeAttr(this, e);
      });
    } }), w.extend({ attr: function attr(e, t, n) {
      var r,
          i,
          o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r);
    }, attrHooks: { type: { set: function set(e, t) {
          if (!h.radioValue && "radio" === t && N(e, "input")) {
            var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
          }
        } } }, removeAttr: function removeAttr(e, t) {
      var n,
          r = 0,
          i = t && t.match(M);if (i && 1 === e.nodeType) while (n = i[r++]) {
        e.removeAttribute(n);
      }
    } }), dt = { set: function set(e, t, n) {
      return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
    } }, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = ht[t] || w.find.attr;ht[t] = function (e, t, r) {
      var i,
          o,
          a = t.toLowerCase();return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i;
    };
  });var gt = /^(?:input|select|textarea|button)$/i,
      yt = /^(?:a|area)$/i;w.fn.extend({ prop: function prop(e, t) {
      return z(this, w.prop, e, t, arguments.length > 1);
    }, removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[w.propFix[e] || e];
      });
    } }), w.extend({ prop: function prop(e, t, n) {
      var r,
          i,
          o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    }, propHooks: { tabIndex: { get: function get(e) {
          var t = w.find.attr(e, "tabindex");return t ? parseInt(t, 10) : gt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1;
        } } }, propFix: { "for": "htmlFor", "class": "className" } }), h.optSelected || (w.propHooks.selected = { get: function get(e) {
      var t = e.parentNode;return t && t.parentNode && t.parentNode.selectedIndex, null;
    }, set: function set(e) {
      var t = e.parentNode;t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    } }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    w.propFix[this.toLowerCase()] = this;
  });function vt(e) {
    return (e.match(M) || []).join(" ");
  }function mt(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }function xt(e) {
    return Array.isArray(e) ? e : "string" == typeof e ? e.match(M) || [] : [];
  }w.fn.extend({ addClass: function addClass(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;if (g(e)) return this.each(function (t) {
        w(this).addClass(e.call(this, t, mt(this)));
      });if ((t = xt(e)).length) while (n = this[u++]) {
        if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
          a = 0;while (o = t[a++]) {
            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
          }i !== (s = vt(r)) && n.setAttribute("class", s);
        }
      }return this;
    }, removeClass: function removeClass(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;if (g(e)) return this.each(function (t) {
        w(this).removeClass(e.call(this, t, mt(this)));
      });if (!arguments.length) return this.attr("class", "");if ((t = xt(e)).length) while (n = this[u++]) {
        if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
          a = 0;while (o = t[a++]) {
            while (r.indexOf(" " + o + " ") > -1) {
              r = r.replace(" " + o + " ", " ");
            }
          }i !== (s = vt(r)) && n.setAttribute("class", s);
        }
      }return this;
    }, toggleClass: function toggleClass(e, t) {
      var n = typeof e === "undefined" ? "undefined" : _typeof(e),
          r = "string" === n || Array.isArray(e);return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function (n) {
        w(this).toggleClass(e.call(this, n, mt(this), t), t);
      }) : this.each(function () {
        var t, i, o, a;if (r) {
          i = 0, o = w(this), a = xt(e);while (t = a[i++]) {
            o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
          }
        } else void 0 !== e && "boolean" !== n || ((t = mt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""));
      });
    }, hasClass: function hasClass(e) {
      var t,
          n,
          r = 0;t = " " + e + " ";while (n = this[r++]) {
        if (1 === n.nodeType && (" " + vt(mt(n)) + " ").indexOf(t) > -1) return !0;
      }return !1;
    } });var bt = /\r/g;w.fn.extend({ val: function val(e) {
      var t,
          n,
          r,
          i = this[0];{
        if (arguments.length) return r = g(e), this.each(function (n) {
          var i;1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function (e) {
            return null == e ? "" : e + "";
          })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i));
        });if (i) return (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(bt, "") : null == n ? "" : n;
      }
    } }), w.extend({ valHooks: { option: { get: function get(e) {
          var t = w.find.attr(e, "value");return null != t ? t : vt(w.text(e));
        } }, select: { get: function get(e) {
          var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) {
              if (t = w(n).val(), a) return t;s.push(t);
            }
          }return s;
        }, set: function set(e, t) {
          var n,
              r,
              i = e.options,
              o = w.makeArray(t),
              a = i.length;while (a--) {
            ((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
          }return n || (e.selectedIndex = -1), o;
        } } } }), w.each(["radio", "checkbox"], function () {
    w.valHooks[this] = { set: function set(e, t) {
        if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1;
      } }, h.checkOn || (w.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  }), h.focusin = "onfocusin" in e;var wt = /^(?:focusinfocus|focusoutblur)$/,
      Tt = function Tt(e) {
    e.stopPropagation();
  };w.extend(w.event, { trigger: function trigger(t, n, i, o) {
      var a,
          s,
          u,
          l,
          c,
          p,
          d,
          h,
          v = [i || r],
          m = f.call(t, "type") ? t.type : t,
          x = f.call(t, "namespace") ? t.namespace.split(".") : [];if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !wt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[w.expando] ? t : new w.Event(m, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
        if (!o && !d.noBubble && !y(i)) {
          for (l = d.delegateType || m, wt.test(l + m) || (s = s.parentNode); s; s = s.parentNode) {
            v.push(s), u = s;
          }u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e);
        }a = 0;while ((s = v[a++]) && !t.isPropagationStopped()) {
          h = s, t.type = a > 1 ? l : d.bindType || m, (p = (J.get(s, "events") || {})[t.type] && J.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && Y(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault());
        }return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !Y(i) || c && g(i[m]) && !y(i) && ((u = i[c]) && (i[c] = null), w.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, Tt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, Tt), w.event.triggered = void 0, u && (i[c] = u)), t.result;
      }
    }, simulate: function simulate(e, t, n) {
      var r = w.extend(new w.Event(), n, { type: e, isSimulated: !0 });w.event.trigger(r, null, t);
    } }), w.fn.extend({ trigger: function trigger(e, t) {
      return this.each(function () {
        w.event.trigger(e, t, this);
      });
    }, triggerHandler: function triggerHandler(e, t) {
      var n = this[0];if (n) return w.event.trigger(e, t, n, !0);
    } }), h.focusin || w.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
    var n = function n(e) {
      w.event.simulate(t, e.target, w.event.fix(e));
    };w.event.special[t] = { setup: function setup() {
        var r = this.ownerDocument || this,
            i = J.access(r, t);i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1);
      }, teardown: function teardown() {
        var r = this.ownerDocument || this,
            i = J.access(r, t) - 1;i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t));
      } };
  });var Ct = e.location,
      Et = Date.now(),
      kt = /\?/;w.parseXML = function (t) {
    var n;if (!t || "string" != typeof t) return null;try {
      n = new e.DOMParser().parseFromString(t, "text/xml");
    } catch (e) {
      n = void 0;
    }return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n;
  };var St = /\[\]$/,
      Dt = /\r?\n/g,
      Nt = /^(?:submit|button|image|reset|file)$/i,
      At = /^(?:input|select|textarea|keygen)/i;function jt(e, t, n, r) {
    var i;if (Array.isArray(t)) w.each(t, function (t, i) {
      n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && null != i ? t : "") + "]", i, n, r);
    });else if (n || "object" !== x(t)) r(e, t);else for (i in t) {
      jt(e + "[" + i + "]", t[i], n, r);
    }
  }w.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      var n = g(t) ? t() : t;r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
    };if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      jt(n, e[n], t, i);
    }return r.join("&");
  }, w.fn.extend({ serialize: function serialize() {
      return w.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var e = w.prop(this, "elements");return e ? w.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;return this.name && !w(this).is(":disabled") && At.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e));
      }).map(function (e, t) {
        var n = w(this).val();return null == n ? null : Array.isArray(n) ? w.map(n, function (e) {
          return { name: t.name, value: e.replace(Dt, "\r\n") };
        }) : { name: t.name, value: n.replace(Dt, "\r\n") };
      }).get();
    } });var qt = /%20/g,
      Lt = /#.*$/,
      Ht = /([?&])_=[^&]*/,
      Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Mt = /^(?:GET|HEAD)$/,
      Rt = /^\/\//,
      It = {},
      Wt = {},
      $t = "*/".concat("*"),
      Bt = r.createElement("a");Bt.href = Ct.href;function Ft(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");var r,
          i = 0,
          o = t.toLowerCase().match(M) || [];if (g(n)) while (r = o[i++]) {
        "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
      }
    };
  }function _t(e, t, n, r) {
    var i = {},
        o = e === Wt;function a(s) {
      var u;return i[s] = !0, w.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1);
      }), u;
    }return a(t.dataTypes[0]) || !i["*"] && a("*");
  }function zt(e, t) {
    var n,
        r,
        i = w.ajaxSettings.flatOptions || {};for (n in t) {
      void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    }return r && w.extend(!0, e, r), e;
  }function Xt(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.contents,
        u = e.dataTypes;while ("*" === u[0]) {
      u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
    }if (r) for (i in s) {
      if (s[i] && s[i].test(r)) {
        u.unshift(i);break;
      }
    }if (u[0] in n) o = u[0];else {
      for (i in n) {
        if (!u[0] || e.converters[i + " " + u[0]]) {
          o = i;break;
        }a || (a = i);
      }o = o || a;
    }if (o) return o !== u[0] && u.unshift(o), n[o];
  }function Ut(e, t, n, r) {
    var i,
        o,
        a,
        s,
        u,
        l = {},
        c = e.dataTypes.slice();if (c[1]) for (a in e.converters) {
      l[a.toLowerCase()] = e.converters[a];
    }o = c.shift();while (o) {
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
        if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
          if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));break;
          }
        }if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
          t = a(t);
        } catch (e) {
          return { state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o };
        }
      }
    }return { state: "success", data: t };
  }w.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ct.href, type: "GET", isLocal: Pt.test(Ct.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": $t, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": w.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
      return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e);
    }, ajaxPrefilter: Ft(It), ajaxTransport: Ft(Wt), ajax: function ajax(t, n) {
      "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (n = t, t = void 0), n = n || {};var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h = w.ajaxSetup({}, n),
          g = h.context || h,
          y = h.context && (g.nodeType || g.jquery) ? w(g) : w.event,
          v = w.Deferred(),
          m = w.Callbacks("once memory"),
          x = h.statusCode || {},
          b = {},
          T = {},
          C = "canceled",
          E = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
          var t;if (c) {
            if (!s) {
              s = {};while (t = Ot.exec(a)) {
                s[t[1].toLowerCase()] = t[2];
              }
            }t = s[e.toLowerCase()];
          }return null == t ? null : t;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return c ? a : null;
        }, setRequestHeader: function setRequestHeader(e, t) {
          return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this;
        }, overrideMimeType: function overrideMimeType(e) {
          return null == c && (h.mimeType = e), this;
        }, statusCode: function statusCode(e) {
          var t;if (e) if (c) E.always(e[E.status]);else for (t in e) {
            x[t] = [x[t], e[t]];
          }return this;
        }, abort: function abort(e) {
          var t = e || C;return i && i.abort(t), k(0, t), this;
        } };if (v.promise(E), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) {
        l = r.createElement("a");try {
          l.href = h.url, l.href = l.href, h.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host;
        } catch (e) {
          h.crossDomain = !0;
        }
      }if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), _t(It, h, n, E), c) return E;(f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ht, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et++ + d), h.url = o + d), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : h.accepts["*"]);for (p in h.headers) {
        E.setRequestHeader(p, h.headers[p]);
      }if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort();if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = _t(Wt, h, n, E)) {
        if (E.readyState = 1, f && y.trigger("ajaxSend", [E, h]), c) return E;h.async && h.timeout > 0 && (u = e.setTimeout(function () {
          E.abort("timeout");
        }, h.timeout));try {
          c = !1, i.send(b, k);
        } catch (e) {
          if (c) throw e;k(-1, e);
        }
      } else k(-1, "No Transport");function k(t, n, r, s) {
        var l,
            p,
            d,
            b,
            T,
            C = n;c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = Xt(h, E, r)), b = Ut(h, b, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (w.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, p = b.data, l = !(d = b.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? v.resolveWith(g, [p, C, E]) : v.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (y.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop")));
      }return E;
    }, getJSON: function getJSON(e, t, n) {
      return w.get(e, t, n, "json");
    }, getScript: function getScript(e, t) {
      return w.get(e, void 0, t, "script");
    } }), w.each(["get", "post"], function (e, t) {
    w[t] = function (e, n, r, i) {
      return g(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({ url: e, type: t, dataType: i, data: n, success: r }, w.isPlainObject(e) && e));
    };
  }), w._evalUrl = function (e) {
    return w.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
  }, w.fn.extend({ wrapAll: function wrapAll(e) {
      var t;return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;while (e.firstElementChild) {
          e = e.firstElementChild;
        }return e;
      }).append(this)), this;
    }, wrapInner: function wrapInner(e) {
      return g(e) ? this.each(function (t) {
        w(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = w(this),
            n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
      });
    }, wrap: function wrap(e) {
      var t = g(e);return this.each(function (n) {
        w(this).wrapAll(t ? e.call(this, n) : e);
      });
    }, unwrap: function unwrap(e) {
      return this.parent(e).not("body").each(function () {
        w(this).replaceWith(this.childNodes);
      }), this;
    } }), w.expr.pseudos.hidden = function (e) {
    return !w.expr.pseudos.visible(e);
  }, w.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, w.ajaxSettings.xhr = function () {
    try {
      return new e.XMLHttpRequest();
    } catch (e) {}
  };var Vt = { 0: 200, 1223: 204 },
      Gt = w.ajaxSettings.xhr();h.cors = !!Gt && "withCredentials" in Gt, h.ajax = Gt = !!Gt, w.ajaxTransport(function (t) {
    var _n, r;if (h.cors || Gt && !t.crossDomain) return { send: function send(i, o) {
        var a,
            s = t.xhr();if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) {
          s[a] = t.xhrFields[a];
        }t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");for (a in i) {
          s.setRequestHeader(a, i[a]);
        }_n = function n(e) {
          return function () {
            _n && (_n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders()));
          };
        }, s.onload = _n(), r = s.onerror = s.ontimeout = _n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
          4 === s.readyState && e.setTimeout(function () {
            _n && r();
          });
        }, _n = _n("abort");try {
          s.send(t.hasContent && t.data || null);
        } catch (e) {
          if (_n) throw e;
        }
      }, abort: function abort() {
        _n && _n();
      } };
  }), w.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), w.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(e) {
        return w.globalEval(e), e;
      } } }), w.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), w.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, _n2;return { send: function send(i, o) {
          t = w("<script>").prop({ charset: e.scriptCharset, src: e.url }).on("load error", _n2 = function n(e) {
            t.remove(), _n2 = null, e && o("error" === e.type ? 404 : 200, e.type);
          }), r.head.appendChild(t[0]);
        }, abort: function abort() {
          _n2 && _n2();
        } };
    }
  });var Yt = [],
      Qt = /(=)\?(?=&|$)|\?\?/;w.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var e = Yt.pop() || w.expando + "_" + Et++;return this[e] = !0, e;
    } }), w.ajaxPrefilter("json jsonp", function (t, n, r) {
    var i,
        o,
        a,
        s = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data");if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Qt, "$1" + i) : !1 !== t.jsonp && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
      return a || w.error(i + " was not called"), a[0];
    }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
      a = arguments;
    }, r.always(function () {
      void 0 === o ? w(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Yt.push(i)), a && g(o) && o(a[0]), a = o = void 0;
    }), "script";
  }), h.createHTMLDocument = function () {
    var e = r.implementation.createHTMLDocument("").body;return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length;
  }(), w.parseHTML = function (e, t, n) {
    if ("string" != typeof e) return [];"boolean" == typeof t && (n = t, t = !1);var i, o, a;return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = A.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = xe([e], t, a), a && a.length && w(a).remove(), w.merge([], o.childNodes));
  }, w.fn.load = function (e, t, n) {
    var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");return s > -1 && (r = vt(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (i = "POST"), a.length > 0 && w.ajax({ url: e, type: i || "GET", dataType: "html", data: t }).done(function (e) {
      o = arguments, a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    w.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), w.expr.pseudos.animated = function (e) {
    return w.grep(w.timers, function (t) {
      return e === t.elem;
    }).length;
  }, w.offset = { setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = w.css(e, "position"),
          f = w(e),
          p = {};"static" === c && (e.style.position = "relative"), s = f.offset(), o = w.css(e, "top"), u = w.css(e, "left"), (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p);
    } }, w.fn.extend({ offset: function offset(e) {
      if (arguments.length) return void 0 === e ? this : this.each(function (t) {
        w.offset.setOffset(this, e, t);
      });var t,
          n,
          r = this[0];if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset }) : { top: 0, left: 0 };
    }, position: function position() {
      if (this[0]) {
        var e,
            t,
            n,
            r = this[0],
            i = { top: 0, left: 0 };if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();else {
          t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;while (e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position")) {
            e = e.parentNode;
          }e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0));
        }return { top: t.top - i.top - w.css(r, "marginTop", !0), left: t.left - i.left - w.css(r, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent;while (e && "static" === w.css(e, "position")) {
          e = e.offsetParent;
        }return e || be;
      });
    } }), w.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
    var n = "pageYOffset" === t;w.fn[e] = function (r) {
      return z(this, function (e, r, i) {
        var o;if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i;
      }, e, r, arguments.length);
    };
  }), w.each(["top", "left"], function (e, t) {
    w.cssHooks[t] = _e(h.pixelPosition, function (e, n) {
      if (n) return n = Fe(e, t), We.test(n) ? w(e).position()[t] + "px" : n;
    });
  }), w.each({ Height: "height", Width: "width" }, function (e, t) {
    w.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
      w.fn[r] = function (i, o) {
        var a = arguments.length && (n || "boolean" != typeof i),
            s = n || (!0 === i || !0 === o ? "margin" : "border");return z(this, function (t, n, i) {
          var o;return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s);
        }, t, a ? i : void 0, a);
      };
    });
  }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
    w.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
    };
  }), w.fn.extend({ hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    } }), w.fn.extend({ bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    }, unbind: function unbind(e, t) {
      return this.off(e, null, t);
    }, delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    }, undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    } }), w.proxy = function (e, t) {
    var n, r, i;if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), i = function i() {
      return e.apply(t || this, r.concat(o.call(arguments)));
    }, i.guid = e.guid = e.guid || w.guid++, i;
  }, w.holdReady = function (e) {
    e ? w.readyWait++ : w.ready(!0);
  }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = N, w.isFunction = g, w.isWindow = y, w.camelCase = G, w.type = x, w.now = Date.now, w.isNumeric = function (e) {
    var t = w.type(e);return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, "function" == typeof define && define.amd && define("jquery", [], function () {
    return w;
  });var Jt = e.jQuery,
      Kt = e.$;return w.noConflict = function (t) {
    return e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Jt), w;
  }, t || (e.jQuery = e.$ = w), w;
});
'use strict';

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
})(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
		} catch (e) {
			return;
		}

		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch (e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires,
				    t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};
});
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Twig.js 0.8.3
 *
 * @copyright 2011-2015 John Roepke and the Twig.js Contributors
 * @license   Available under the BSD 2-Clause License
 * @link      https://github.com/justjohn/twig.js
 */
var Twig = function (Twig) {
  Twig.VERSION = "0.8.4";return Twig;
}(Twig || {});var Twig = function (Twig) {
  "use strict";
  Twig.trace = false;Twig.debug = false;Twig.cache = true;Twig.placeholders = { parent: "{{|PARENT|}}" };Twig.indexOf = function (arr, searchElement) {
    if (Array.prototype.hasOwnProperty("indexOf")) {
      return arr.indexOf(searchElement);
    }if (arr === void 0 || arr === null) {
      throw new TypeError();
    }var t = Object(arr);var len = t.length >>> 0;if (len === 0) {
      return -1;
    }var n = 0;if (arguments.length > 0) {
      n = Number(arguments[1]);if (n !== n) {
        n = 0;
      } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }if (n >= len) {
      return -1;
    }var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }if (arr == searchElement) {
      return 0;
    }return -1;
  };Twig.forEach = function (arr, callback, thisArg) {
    if (Array.prototype.forEach) {
      return arr.forEach(callback, thisArg);
    }var T, k;if (arr == null) {
      throw new TypeError(" this is null or not defined");
    }var O = Object(arr);var len = O.length >>> 0;if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }if (thisArg) {
      T = thisArg;
    }k = 0;while (k < len) {
      var kValue;if (k in O) {
        kValue = O[k];callback.call(T, kValue, k, O);
      }k++;
    }
  };Twig.merge = function (target, source, onlyChanged) {
    Twig.forEach(Object.keys(source), function (key) {
      if (onlyChanged && !(key in target)) {
        return;
      }target[key] = source[key];
    });return target;
  };Twig.Error = function (message) {
    this.message = message;this.name = "TwigException";this.type = "TwigException";
  };Twig.Error.prototype.toString = function () {
    var output = this.name + ": " + this.message;return output;
  };Twig.log = { trace: function trace() {
      if (Twig.trace && console) {
        console.log(Array.prototype.slice.call(arguments));
      }
    }, debug: function debug() {
      if (Twig.debug && console) {
        console.log(Array.prototype.slice.call(arguments));
      }
    } };if (typeof console !== "undefined") {
    if (typeof console.error !== "undefined") {
      Twig.log.error = function () {
        console.error.apply(console, arguments);
      };
    } else if (typeof console.log !== "undefined") {
      Twig.log.error = function () {
        console.log.apply(console, arguments);
      };
    }
  } else {
    Twig.log.error = function () {};
  }Twig.ChildContext = function (context) {
    var ChildContext = function ChildContext() {};ChildContext.prototype = context;return new ChildContext();
  };Twig.token = {};Twig.token.type = { output: "output", logic: "logic", comment: "comment", raw: "raw" };Twig.token.definitions = [{ type: Twig.token.type.raw, open: "{% raw %}", close: "{% endraw %}" }, { type: Twig.token.type.raw, open: "{% verbatim %}", close: "{% endverbatim %}" }, { type: Twig.token.type.output, open: "{{", close: "}}" }, { type: Twig.token.type.logic, open: "{%", close: "%}" }, { type: Twig.token.type.comment, open: "{#", close: "#}" }];Twig.token.strings = ['"', "'"];Twig.token.findStart = function (template) {
    var output = { position: null, def: null },
        i,
        token_template,
        first_key_position;for (i = 0; i < Twig.token.definitions.length; i++) {
      token_template = Twig.token.definitions[i];first_key_position = template.indexOf(token_template.open);Twig.log.trace("Twig.token.findStart: ", "Searching for ", token_template.open, " found at ", first_key_position);if (first_key_position >= 0 && (output.position === null || first_key_position < output.position)) {
        output.position = first_key_position;output.def = token_template;
      }
    }return output;
  };Twig.token.findEnd = function (template, token_def, start) {
    var end = null,
        found = false,
        offset = 0,
        str_pos = null,
        str_found = null,
        pos = null,
        end_offset = null,
        this_str_pos = null,
        end_str_pos = null,
        i,
        l;while (!found) {
      str_pos = null;str_found = null;pos = template.indexOf(token_def.close, offset);if (pos >= 0) {
        end = pos;found = true;
      } else {
        throw new Twig.Error("Unable to find closing bracket '" + token_def.close + "'" + " opened near template position " + start);
      }if (token_def.type === Twig.token.type.comment) {
        break;
      }l = Twig.token.strings.length;for (i = 0; i < l; i += 1) {
        this_str_pos = template.indexOf(Twig.token.strings[i], offset);if (this_str_pos > 0 && this_str_pos < pos && (str_pos === null || this_str_pos < str_pos)) {
          str_pos = this_str_pos;str_found = Twig.token.strings[i];
        }
      }if (str_pos !== null) {
        end_offset = str_pos + 1;end = null;found = false;while (true) {
          end_str_pos = template.indexOf(str_found, end_offset);if (end_str_pos < 0) {
            throw "Unclosed string in template";
          }if (template.substr(end_str_pos - 1, 1) !== "\\") {
            offset = end_str_pos + 1;break;
          } else {
            end_offset = end_str_pos + 1;
          }
        }
      }
    }return end;
  };Twig.tokenize = function (template) {
    var tokens = [],
        error_offset = 0,
        found_token = null,
        end = null;while (template.length > 0) {
      found_token = Twig.token.findStart(template);Twig.log.trace("Twig.tokenize: ", "Found token: ", found_token);if (found_token.position !== null) {
        if (found_token.position > 0) {
          tokens.push({ type: Twig.token.type.raw, value: template.substring(0, found_token.position) });
        }template = template.substr(found_token.position + found_token.def.open.length);error_offset += found_token.position + found_token.def.open.length;end = Twig.token.findEnd(template, found_token.def, error_offset);Twig.log.trace("Twig.tokenize: ", "Token ends at ", end);tokens.push({ type: found_token.def.type, value: template.substring(0, end).trim() });if (found_token.def.type === "logic" && template.substr(end + found_token.def.close.length, 1) === "\n") {
          end += 1;
        }template = template.substr(end + found_token.def.close.length);error_offset += end + found_token.def.close.length;
      } else {
        tokens.push({ type: Twig.token.type.raw, value: template });template = "";
      }
    }return tokens;
  };Twig.compile = function (tokens) {
    try {
      var output = [],
          stack = [],
          intermediate_output = [],
          token = null,
          logic_token = null,
          unclosed_token = null,
          prev_token = null,
          prev_template = null,
          tok_output = null,
          type = null,
          open = null,
          next = null;while (tokens.length > 0) {
        token = tokens.shift();Twig.log.trace("Compiling token ", token);switch (token.type) {case Twig.token.type.raw:
            if (stack.length > 0) {
              intermediate_output.push(token);
            } else {
              output.push(token);
            }break;case Twig.token.type.logic:
            logic_token = Twig.logic.compile.apply(this, [token]);type = logic_token.type;open = Twig.logic.handler[type].open;next = Twig.logic.handler[type].next;Twig.log.trace("Twig.compile: ", "Compiled logic token to ", logic_token, " next is: ", next, " open is : ", open);if (open !== undefined && !open) {
              prev_token = stack.pop();prev_template = Twig.logic.handler[prev_token.type];if (Twig.indexOf(prev_template.next, type) < 0) {
                throw new Error(type + " not expected after a " + prev_token.type);
              }prev_token.output = prev_token.output || [];prev_token.output = prev_token.output.concat(intermediate_output);intermediate_output = [];tok_output = { type: Twig.token.type.logic, token: prev_token };if (stack.length > 0) {
                intermediate_output.push(tok_output);
              } else {
                output.push(tok_output);
              }
            }if (next !== undefined && next.length > 0) {
              Twig.log.trace("Twig.compile: ", "Pushing ", logic_token, " to logic stack.");if (stack.length > 0) {
                prev_token = stack.pop();prev_token.output = prev_token.output || [];prev_token.output = prev_token.output.concat(intermediate_output);stack.push(prev_token);intermediate_output = [];
              }stack.push(logic_token);
            } else if (open !== undefined && open) {
              tok_output = { type: Twig.token.type.logic, token: logic_token };if (stack.length > 0) {
                intermediate_output.push(tok_output);
              } else {
                output.push(tok_output);
              }
            }break;case Twig.token.type.comment:
            break;case Twig.token.type.output:
            Twig.expression.compile.apply(this, [token]);if (stack.length > 0) {
              intermediate_output.push(token);
            } else {
              output.push(token);
            }break;}Twig.log.trace("Twig.compile: ", " Output: ", output, " Logic Stack: ", stack, " Pending Output: ", intermediate_output);
      }if (stack.length > 0) {
        unclosed_token = stack.pop();throw new Error("Unable to find an end tag for " + unclosed_token.type + ", expecting one of " + unclosed_token.next);
      }return output;
    } catch (ex) {
      Twig.log.error("Error compiling twig template " + this.id + ": " + ex.message);if (ex.stack) {
        Twig.log.error(ex.stack);
      } else {
        Twig.log.error(ex.toString());
      }if (this.options.rethrow) throw ex;
    }
  };Twig.parse = function (tokens, context) {
    try {
      var output = [],
          chain = true,
          that = this;Twig.forEach(tokens, function parseToken(token) {
        Twig.log.debug("Twig.parse: ", "Parsing token: ", token);switch (token.type) {case Twig.token.type.raw:
            output.push(Twig.filters.raw(token.value));break;case Twig.token.type.logic:
            var logic_token = token.token,
                logic = Twig.logic.parse.apply(that, [logic_token, context, chain]);if (logic.chain !== undefined) {
              chain = logic.chain;
            }if (logic.context !== undefined) {
              context = logic.context;
            }if (logic.output !== undefined) {
              output.push(logic.output);
            }break;case Twig.token.type.comment:
            break;case Twig.token.type.output:
            Twig.log.debug("Twig.parse: ", "Output token: ", token.stack);output.push(Twig.expression.parse.apply(that, [token.stack, context]));break;}
      });return Twig.output.apply(this, [output]);
    } catch (ex) {
      Twig.log.error("Error parsing twig template " + this.id + ": " + ex.message);if (ex.stack) {
        Twig.log.error(ex.stack);
      } else {
        Twig.log.error(ex.toString());
      }if (this.options.rethrow) throw ex;if (Twig.debug) {
        return ex.toString();
      }
    }
  };Twig.prepare = function (data) {
    var tokens, raw_tokens;Twig.log.debug("Twig.prepare: ", "Tokenizing ", data);raw_tokens = Twig.tokenize.apply(this, [data]);Twig.log.debug("Twig.prepare: ", "Compiling ", raw_tokens);tokens = Twig.compile.apply(this, [raw_tokens]);Twig.log.debug("Twig.prepare: ", "Compiled ", tokens);return tokens;
  };Twig.output = function (output) {
    if (!this.options.autoescape) {
      return output.join("");
    }var escaped_output = [];Twig.forEach(output, function (str) {
      if (str && !str.twig_markup) {
        str = Twig.filters.escape(str);
      }escaped_output.push(str);
    });return Twig.Markup(escaped_output.join(""));
  };Twig.Templates = { registry: {} };Twig.validateId = function (id) {
    if (id === "prototype") {
      throw new Twig.Error(id + " is not a valid twig identifier");
    } else if (Twig.Templates.registry.hasOwnProperty(id)) {
      throw new Twig.Error("There is already a template with the ID " + id);
    }return true;
  };Twig.Templates.save = function (template) {
    if (template.id === undefined) {
      throw new Twig.Error("Unable to save template with no id");
    }Twig.Templates.registry[template.id] = template;
  };Twig.Templates.load = function (id) {
    if (!Twig.Templates.registry.hasOwnProperty(id)) {
      return null;
    }return Twig.Templates.registry[id];
  };Twig.Templates.loadRemote = function (location, params, callback, error_callback) {
    var id = params.id,
        method = params.method,
        async = params.async,
        precompiled = params.precompiled,
        template = null;if (async === undefined) async = true;if (id === undefined) {
      id = location;
    }params.id = id;if (Twig.cache && Twig.Templates.registry.hasOwnProperty(id)) {
      if (callback) {
        callback(Twig.Templates.registry[id]);
      }return Twig.Templates.registry[id];
    }if (method == "ajax") {
      if (typeof XMLHttpRequest == "undefined") {
        throw new Twig.Error("Unsupported platform: Unable to do remote requests " + "because there is no XMLHTTPRequest implementation");
      }var xmlhttp = new XMLHttpRequest();xmlhttp.onreadystatechange = function () {
        var data = null;if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            Twig.log.debug("Got template ", xmlhttp.responseText);if (precompiled === true) {
              data = JSON.parse(xmlhttp.responseText);
            } else {
              data = xmlhttp.responseText;
            }params.url = location;params.data = data;template = new Twig.Template(params);if (callback) {
              callback(template);
            }
          } else {
            if (error_callback) {
              error_callback(xmlhttp);
            }
          }
        }
      };xmlhttp.open("GET", location, async);xmlhttp.send();
    } else {
      (function () {
        var fs = require("fs"),
            path = require("path"),
            data = null,
            loadTemplateFn = function loadTemplateFn(err, data) {
          if (err) {
            if (error_callback) {
              error_callback(err);
            }return;
          }if (precompiled === true) {
            data = JSON.parse(data);
          }params.data = data;params.path = location;template = new Twig.Template(params);if (callback) {
            callback(template);
          }
        };if (async === true) {
          fs.stat(location, function (err, stats) {
            if (err || !stats.isFile()) throw new Twig.Error("Unable to find template file " + location);fs.readFile(location, "utf8", loadTemplateFn);
          });
        } else {
          if (!fs.statSync(location).isFile()) throw new Twig.Error("Unable to find template file " + location);data = fs.readFileSync(location, "utf8");loadTemplateFn(undefined, data);
        }
      })();
    }if (async === false) {
      return template;
    } else {
      return true;
    }
  };function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);return obj !== undefined && obj !== null && clas === type;
  }Twig.Template = function (params) {
    var data = params.data,
        id = params.id,
        blocks = params.blocks,
        macros = params.macros || {},
        base = params.base,
        path = params.path,
        url = params.url,
        options = params.options;this.id = id;this.base = base;this.path = path;this.url = url;this.macros = macros;this.options = options;this.reset(blocks);if (is("String", data)) {
      this.tokens = Twig.prepare.apply(this, [data]);
    } else {
      this.tokens = data;
    }if (id !== undefined) {
      Twig.Templates.save(this);
    }
  };Twig.Template.prototype.reset = function (blocks) {
    Twig.log.debug("Twig.Template.reset", "Reseting template " + this.id);this.blocks = {};this.importedBlocks = [];this.originalBlockTokens = {};this.child = { blocks: blocks || {} };this.extend = null;
  };Twig.Template.prototype.render = function (context, params) {
    params = params || {};var output, url;this.context = context || {};this.reset();if (params.blocks) {
      this.blocks = params.blocks;
    }if (params.macros) {
      this.macros = params.macros;
    }output = Twig.parse.apply(this, [this.tokens, this.context]);if (this.extend) {
      var ext_template;if (this.options.allowInlineIncludes) {
        ext_template = Twig.Templates.load(this.extend);if (ext_template) {
          ext_template.options = this.options;
        }
      }if (!ext_template) {
        url = relativePath(this, this.extend);ext_template = Twig.Templates.loadRemote(url, { method: this.url ? "ajax" : "fs", base: this.base, async: false, id: url, options: this.options });
      }this.parent = ext_template;return this.parent.render(this.context, { blocks: this.blocks });
    }if (params.output == "blocks") {
      return this.blocks;
    } else if (params.output == "macros") {
      return this.macros;
    } else {
      return output;
    }
  };Twig.Template.prototype.importFile = function (file) {
    var url, sub_template;if (!this.url && !this.path && this.options.allowInlineIncludes) {
      sub_template = Twig.Templates.load(file);sub_template.options = this.options;if (sub_template) {
        return sub_template;
      }throw new Twig.Error("Didn't find the inline template by id");
    }url = relativePath(this, file);sub_template = Twig.Templates.loadRemote(url, { method: this.url ? "ajax" : "fs", base: this.base, async: false, options: this.options, id: url });return sub_template;
  };Twig.Template.prototype.importBlocks = function (file, override) {
    var sub_template = this.importFile(file),
        context = this.context,
        that = this,
        key;override = override || false;sub_template.render(context);Twig.forEach(Object.keys(sub_template.blocks), function (key) {
      if (override || that.blocks[key] === undefined) {
        that.blocks[key] = sub_template.blocks[key];that.importedBlocks.push(key);
      }
    });
  };Twig.Template.prototype.compile = function (options) {
    return Twig.compiler.compile(this, options);
  };Twig.Markup = function (content) {
    if (typeof content === "string" && content.length > 0) {
      content = new String(content);content.twig_markup = true;
    }return content;
  };function relativePath(template, file) {
    var base,
        base_path,
        sep_chr = "/",
        new_path = [],
        val;if (template.url) {
      if (typeof template.base !== "undefined") {
        base = template.base + (template.base.charAt(template.base.length - 1) === "/" ? "" : "/");
      } else {
        base = template.url;
      }
    } else if (template.path) {
      var path = require("path"),
          sep = path.sep || sep_chr,
          relative = new RegExp("^\\.{1,2}" + sep.replace("\\", "\\\\"));file = file.replace(/\//g, sep);if (template.base !== undefined && file.match(relative) == null) {
        file = file.replace(template.base, "");base = template.base + sep;
      } else {
        base = template.path;
      }base = base.replace(sep + sep, sep);sep_chr = sep;
    } else {
      throw new Twig.Error("Cannot extend an inline template.");
    }base_path = base.split(sep_chr);base_path.pop();base_path = base_path.concat(file.split(sep_chr));while (base_path.length > 0) {
      val = base_path.shift();if (val == ".") {} else if (val == ".." && new_path.length > 0 && new_path[new_path.length - 1] != "..") {
        new_path.pop();
      } else {
        new_path.push(val);
      }
    }return new_path.join(sep_chr);
  }return Twig;
}(Twig || {});(function () {
  "use strict";
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }if (!Object.keys) Object.keys = function (o) {
    if (o !== Object(o)) {
      throw new TypeError("Object.keys called on non-object");
    }var ret = [],
        p;for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) ret.push(p);
    }return ret;
  };
})();var Twig = function (Twig) {
  Twig.lib = {};var sprintfLib = function () {
    var re = { not_string: /[^s]/, number: /[diefg]/, json: /[j]/, not_json: /[^j]/, text: /^[^\x25]+/, modulo: /^\x25{2}/, placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/, key: /^([a-z_][a-z_\d]*)/i, key_access: /^\.([a-z_][a-z_\d]*)/i, index_access: /^\[(\d+)\]/, sign: /^[\+\-]/ };function sprintf() {
      var key = arguments[0],
          cache = sprintf.cache;if (!(cache[key] && cache.hasOwnProperty(key))) {
        cache[key] = sprintf.parse(key);
      }return sprintf.format.call(null, cache[key], arguments);
    }sprintf.format = function (parse_tree, argv) {
      var cursor = 1,
          tree_length = parse_tree.length,
          node_type = "",
          arg,
          output = [],
          i,
          k,
          match,
          pad,
          pad_character,
          pad_length,
          is_positive = true,
          sign = "";for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);if (node_type === "string") {
          output[output.length] = parse_tree[i];
        } else if (node_type === "array") {
          match = parse_tree[i];if (match[2]) {
            arg = argv[cursor];for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]));
              }arg = arg[match[2][k]];
            }
          } else if (match[1]) {
            arg = argv[match[1]];
          } else {
            arg = argv[cursor++];
          }if (get_type(arg) == "function") {
            arg = arg();
          }if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && get_type(arg) != "number" && isNaN(arg)) {
            throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)));
          }if (re.number.test(match[8])) {
            is_positive = arg >= 0;
          }switch (match[8]) {case "b":
              arg = arg.toString(2);break;case "c":
              arg = String.fromCharCode(arg);break;case "d":case "i":
              arg = parseInt(arg, 10);break;case "j":
              arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0);break;case "e":
              arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();break;case "f":
              arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);break;case "g":
              arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg);break;case "o":
              arg = arg.toString(8);break;case "s":
              arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;break;case "u":
              arg = arg >>> 0;break;case "x":
              arg = arg.toString(16);break;case "X":
              arg = arg.toString(16).toUpperCase();break;}if (re.json.test(match[8])) {
            output[output.length] = arg;
          } else {
            if (re.number.test(match[8]) && (!is_positive || match[3])) {
              sign = is_positive ? "+" : "-";arg = arg.toString().replace(re.sign, "");
            } else {
              sign = "";
            }pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " ";pad_length = match[6] - (sign + arg).length;pad = match[6] ? pad_length > 0 ? str_repeat(pad_character, pad_length) : "" : "";output[output.length] = match[5] ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
          }
        }
      }return output.join("");
    };sprintf.cache = {};sprintf.parse = function (fmt) {
      var _fmt = fmt,
          match = [],
          parse_tree = [],
          arg_names = 0;while (_fmt) {
        if ((match = re.text.exec(_fmt)) !== null) {
          parse_tree[parse_tree.length] = match[0];
        } else if ((match = re.modulo.exec(_fmt)) !== null) {
          parse_tree[parse_tree.length] = "%";
        } else if ((match = re.placeholder.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;var field_list = [],
                replacement_field = match[2],
                field_match = [];if ((field_match = re.key.exec(replacement_field)) !== null) {
              field_list[field_list.length] = field_match[1];while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                  field_list[field_list.length] = field_match[1];
                } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                  field_list[field_list.length] = field_match[1];
                } else {
                  throw new SyntaxError("[sprintf] failed to parse named argument key");
                }
              }
            } else {
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            }match[2] = field_list;
          } else {
            arg_names |= 2;
          }if (arg_names === 3) {
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          }parse_tree[parse_tree.length] = match;
        } else {
          throw new SyntaxError("[sprintf] unexpected placeholder");
        }_fmt = _fmt.substring(match[0].length);
      }return parse_tree;
    };var vsprintf = function vsprintf(fmt, argv, _argv) {
      _argv = (argv || []).slice(0);_argv.splice(0, 0, fmt);return sprintf.apply(null, _argv);
    };function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }function str_repeat(input, multiplier) {
      return Array(multiplier + 1).join(input);
    }return { sprintf: sprintf, vsprintf: vsprintf };
  }();var sprintf = sprintfLib.sprintf;var vsprintf = sprintfLib.vsprintf;Twig.lib.sprintf = sprintf;Twig.lib.vsprintf = vsprintf;(function () {
    var shortDays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");var fullDays = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(",");var shortMonths = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");var fullMonths = "January,February,March,April,May,June,July,August,September,October,November,December".split(",");function getOrdinalFor(intNum) {
      return (intNum = Math.abs(intNum) % 100) % 10 == 1 && intNum != 11 ? "st" : intNum % 10 == 2 && intNum != 12 ? "nd" : intNum % 10 == 3 && intNum != 13 ? "rd" : "th";
    }function getISO8601Year(aDate) {
      var d = new Date(aDate.getFullYear() + 1, 0, 4);if ((d - aDate) / 864e5 < 7 && (aDate.getDay() + 6) % 7 < (d.getDay() + 6) % 7) return d.getFullYear();if (aDate.getMonth() > 0 || aDate.getDate() >= 4) return aDate.getFullYear();return aDate.getFullYear() - ((aDate.getDay() + 6) % 7 - aDate.getDate() > 2 ? 1 : 0);
    }function getISO8601Week(aDate) {
      var d = new Date(getISO8601Year(aDate), 0, 4);d.setDate(d.getDate() - (d.getDay() + 6) % 7);return parseInt((aDate - d) / 6048e5) + 1;
    }Twig.lib.formatDate = function (date, format) {
      if (typeof format !== "string" || /^\s*$/.test(format)) return date + "";var jan1st = new Date(date.getFullYear(), 0, 1);var me = date;return format.replace(/[dDjlNSwzWFmMntLoYyaABgGhHisuU]/g, function (option) {
        switch (option) {case "d":
            return ("0" + me.getDate()).replace(/^.+(..)$/, "$1");case "D":
            return shortDays[me.getDay()];case "j":
            return me.getDate();case "l":
            return fullDays[me.getDay()];case "N":
            return (me.getDay() + 6) % 7 + 1;case "S":
            return getOrdinalFor(me.getDate());case "w":
            return me.getDay();case "z":
            return Math.ceil((jan1st - me) / 864e5);case "W":
            return ("0" + getISO8601Week(me)).replace(/^.(..)$/, "$1");case "F":
            return fullMonths[me.getMonth()];case "m":
            return ("0" + (me.getMonth() + 1)).replace(/^.+(..)$/, "$1");case "M":
            return shortMonths[me.getMonth()];case "n":
            return me.getMonth() + 1;case "t":
            return new Date(me.getFullYear(), me.getMonth() + 1, -1).getDate();case "L":
            return new Date(me.getFullYear(), 1, 29).getDate() == 29 ? 1 : 0;case "o":
            return getISO8601Year(me);case "Y":
            return me.getFullYear();case "y":
            return (me.getFullYear() + "").replace(/^.+(..)$/, "$1");case "a":
            return me.getHours() < 12 ? "am" : "pm";case "A":
            return me.getHours() < 12 ? "AM" : "PM";case "B":
            return Math.floor(((me.getUTCHours() + 1) % 24 + me.getUTCMinutes() / 60 + me.getUTCSeconds() / 3600) * 1e3 / 24);case "g":
            return me.getHours() % 12 != 0 ? me.getHours() % 12 : 12;case "G":
            return me.getHours();case "h":
            return ("0" + (me.getHours() % 12 != 0 ? me.getHours() % 12 : 12)).replace(/^.+(..)$/, "$1");case "H":
            return ("0" + me.getHours()).replace(/^.+(..)$/, "$1");case "i":
            return ("0" + me.getMinutes()).replace(/^.+(..)$/, "$1");case "s":
            return ("0" + me.getSeconds()).replace(/^.+(..)$/, "$1");case "u":
            return me.getMilliseconds();case "U":
            return me.getTime() / 1e3;}
      });
    };
  })();Twig.lib.strip_tags = function (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags, "").replace(tags, function ($0, $1) {
      return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
    });
  };Twig.lib.parseISO8601Date = function (s) {
    var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;var d = [];d = s.match(re);if (!d) {
      throw "Couldn't parse ISO 8601 date string '" + s + "'";
    }var a = [1, 2, 3, 4, 5, 6, 10, 11];for (var i in a) {
      d[a[i]] = parseInt(d[a[i]], 10);
    }d[7] = parseFloat(d[7]);var ms = Date.UTC(d[1], d[2] - 1, d[3], d[4], d[5], d[6]);if (d[7] > 0) {
      ms += Math.round(d[7] * 1e3);
    }if (d[8] != "Z" && d[10]) {
      var offset = d[10] * 60 * 60 * 1e3;if (d[11]) {
        offset += d[11] * 60 * 1e3;
      }if (d[9] == "-") {
        ms -= offset;
      } else {
        ms += offset;
      }
    }return new Date(ms);
  };Twig.lib.strtotime = function (text, now) {
    var parsed,
        match,
        today,
        year,
        date,
        days,
        ranges,
        len,
        times,
        regex,
        i,
        fail = false;if (!text) {
      return fail;
    }text = text.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").replace(/[\t\r\n]/g, "").toLowerCase();match = text.match(/^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);if (match && match[2] === match[4]) {
      if (match[1] > 1901) {
        switch (match[2]) {case "-":
            {
              if (match[3] > 12 || match[5] > 31) {
                return fail;
              }return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }case ".":
            {
              return fail;
            }case "/":
            {
              if (match[3] > 12 || match[5] > 31) {
                return fail;
              }return new Date(match[1], parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }}
      } else if (match[5] > 1901) {
        switch (match[2]) {case "-":
            {
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }case ".":
            {
              if (match[3] > 12 || match[1] > 31) {
                return fail;
              }return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }case "/":
            {
              if (match[1] > 12 || match[3] > 31) {
                return fail;
              }return new Date(match[5], parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }}
      } else {
        switch (match[2]) {case "-":
            {
              if (match[3] > 12 || match[5] > 31 || match[1] < 70 && match[1] > 38) {
                return fail;
              }year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2e3 : match[1];return new Date(year, parseInt(match[3], 10) - 1, match[5], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }case ".":
            {
              if (match[5] >= 70) {
                if (match[3] > 12 || match[1] > 31) {
                  return fail;
                }return new Date(match[5], parseInt(match[3], 10) - 1, match[1], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
              }if (match[5] < 60 && !match[6]) {
                if (match[1] > 23 || match[3] > 59) {
                  return fail;
                }today = new Date();return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1e3;
              }return fail;
            }case "/":
            {
              if (match[1] > 12 || match[3] > 31 || match[5] < 70 && match[5] > 38) {
                return fail;
              }year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2e3 : match[5];return new Date(year, parseInt(match[1], 10) - 1, match[3], match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1e3;
            }case ":":
            {
              if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                return fail;
              }today = new Date();return new Date(today.getFullYear(), today.getMonth(), today.getDate(), match[1] || 0, match[3] || 0, match[5] || 0) / 1e3;
            }}
      }
    }if (text === "now") {
      return now === null || isNaN(now) ? new Date().getTime() / 1e3 | 0 : now | 0;
    }if (!isNaN(parsed = Date.parse(text))) {
      return parsed / 1e3 | 0;
    }date = now ? new Date(now * 1e3) : new Date();days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };ranges = { yea: "FullYear", mon: "Month", day: "Date", hou: "Hours", min: "Minutes", sec: "Seconds" };function lastNext(type, range, modifier) {
      var diff,
          day = days[range];if (typeof day !== "undefined") {
        diff = day - date.getDay();if (diff === 0) {
          diff = 7 * modifier;
        } else if (diff > 0 && type === "last") {
          diff -= 7;
        } else if (diff < 0 && type === "next") {
          diff += 7;
        }date.setDate(date.getDate() + diff);
      }
    }function process(val) {
      var splt = val.split(" "),
          type = splt[0],
          range = splt[1].substring(0, 3),
          typeIsNumber = /\d+/.test(type),
          ago = splt[2] === "ago",
          num = (type === "last" ? -1 : 1) * (ago ? -1 : 1);if (typeIsNumber) {
        num *= parseInt(type, 10);
      }if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
        return date["set" + ranges[range]](date["get" + ranges[range]]() + num);
      }if (range === "wee") {
        return date.setDate(date.getDate() + num * 7);
      }if (type === "next" || type === "last") {
        lastNext(type, range, num);
      } else if (!typeIsNumber) {
        return false;
      }return true;
    }times = "(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec" + "|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?" + "|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)";regex = "([+-]?\\d+\\s" + times + "|" + "(last|next)\\s" + times + ")(\\sago)?";match = text.match(new RegExp(regex, "gi"));if (!match) {
      return fail;
    }for (i = 0, len = match.length; i < len; i++) {
      if (!process(match[i])) {
        return fail;
      }
    }return date.getTime() / 1e3;
  };Twig.lib.is = function (type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);return obj !== undefined && obj !== null && clas === type;
  };Twig.lib.copy = function (src) {
    var target = {},
        key;for (key in src) {
      target[key] = src[key];
    }return target;
  };Twig.lib.replaceAll = function (string, search, replace) {
    return string.split(search).join(replace);
  };Twig.lib.chunkArray = function (arr, size) {
    var returnVal = [],
        x = 0,
        len = arr.length;if (size < 1 || !Twig.lib.is("Array", arr)) {
      return [];
    }while (x < len) {
      returnVal.push(arr.slice(x, x += size));
    }return returnVal;
  };Twig.lib.round = function round(value, precision, mode) {
    var m, f, isHalf, sgn;precision |= 0;m = Math.pow(10, precision);value *= m;sgn = value > 0 | -(value < 0);isHalf = value % 1 === .5 * sgn;f = Math.floor(value);if (isHalf) {
      switch (mode) {case "PHP_ROUND_HALF_DOWN":
          value = f + (sgn < 0);break;case "PHP_ROUND_HALF_EVEN":
          value = f + f % 2 * sgn;break;case "PHP_ROUND_HALF_ODD":
          value = f + !(f % 2);break;default:
          value = f + (sgn > 0);}
    }return (isHalf ? value : Math.round(value)) / m;
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  "use strict";
  Twig.logic = {};Twig.logic.type = { if_: "Twig.logic.type.if", endif: "Twig.logic.type.endif", for_: "Twig.logic.type.for", endfor: "Twig.logic.type.endfor", else_: "Twig.logic.type.else", elseif: "Twig.logic.type.elseif", set: "Twig.logic.type.set", setcapture: "Twig.logic.type.setcapture", endset: "Twig.logic.type.endset", filter: "Twig.logic.type.filter", endfilter: "Twig.logic.type.endfilter", block: "Twig.logic.type.block", endblock: "Twig.logic.type.endblock", extends_: "Twig.logic.type.extends", use: "Twig.logic.type.use", include: "Twig.logic.type.include", spaceless: "Twig.logic.type.spaceless", endspaceless: "Twig.logic.type.endspaceless", macro: "Twig.logic.type.macro", endmacro: "Twig.logic.type.endmacro", import_: "Twig.logic.type.import", from: "Twig.logic.type.from", embed: "Twig.logic.type.embed", endembed: "Twig.logic.type.endembed" };Twig.logic.definitions = [{ type: Twig.logic.type.if_, regex: /^if\s+([\s\S]+)$/, next: [Twig.logic.type.else_, Twig.logic.type.elseif, Twig.logic.type.endif], open: true, compile: function compile(token) {
      var expression = token.match[1];token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;delete token.match;return token;
    }, parse: function parse(token, context, chain) {
      var output = "",
          result = Twig.expression.parse.apply(this, [token.stack, context]);chain = true;if (result) {
        chain = false;output = Twig.parse.apply(this, [token.output, context]);
      }return { chain: chain, output: output };
    } }, { type: Twig.logic.type.elseif, regex: /^elseif\s+([^\s].*)$/, next: [Twig.logic.type.else_, Twig.logic.type.elseif, Twig.logic.type.endif], open: false, compile: function compile(token) {
      var expression = token.match[1];token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;delete token.match;return token;
    }, parse: function parse(token, context, chain) {
      var output = "";if (chain && Twig.expression.parse.apply(this, [token.stack, context]) === true) {
        chain = false;output = Twig.parse.apply(this, [token.output, context]);
      }return { chain: chain, output: output };
    } }, { type: Twig.logic.type.else_, regex: /^else$/, next: [Twig.logic.type.endif, Twig.logic.type.endfor], open: false, parse: function parse(token, context, chain) {
      var output = "";if (chain) {
        output = Twig.parse.apply(this, [token.output, context]);
      }return { chain: chain, output: output };
    } }, { type: Twig.logic.type.endif, regex: /^endif$/, next: [], open: false }, { type: Twig.logic.type.for_, regex: /^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([^\s].*?)(?:\s+if\s+([^\s].*))?$/, next: [Twig.logic.type.else_, Twig.logic.type.endfor], open: true, compile: function compile(token) {
      var key_value = token.match[1],
          expression = token.match[2],
          conditional = token.match[3],
          kv_split = null;token.key_var = null;token.value_var = null;if (key_value.indexOf(",") >= 0) {
        kv_split = key_value.split(",");if (kv_split.length === 2) {
          token.key_var = kv_split[0].trim();token.value_var = kv_split[1].trim();
        } else {
          throw new Twig.Error("Invalid expression in for loop: " + key_value);
        }
      } else {
        token.value_var = key_value;
      }token.expression = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;if (conditional) {
        token.conditional = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: conditional }]).stack;
      }delete token.match;return token;
    }, parse: function parse(token, context, continue_chain) {
      var result = Twig.expression.parse.apply(this, [token.expression, context]),
          output = [],
          len,
          index = 0,
          keyset,
          that = this,
          conditional = token.conditional,
          buildLoop = function buildLoop(index, len) {
        var isConditional = conditional !== undefined;return { index: index + 1, index0: index, revindex: isConditional ? undefined : len - index, revindex0: isConditional ? undefined : len - index - 1, first: index === 0, last: isConditional ? undefined : index === len - 1, length: isConditional ? undefined : len, parent: context };
      },
          loop = function loop(key, value) {
        var inner_context = Twig.ChildContext(context);inner_context[token.value_var] = value;if (token.key_var) {
          inner_context[token.key_var] = key;
        }inner_context.loop = buildLoop(index, len);if (conditional === undefined || Twig.expression.parse.apply(that, [conditional, inner_context])) {
          output.push(Twig.parse.apply(that, [token.output, inner_context]));
          index += 1;
        }delete inner_context["loop"];delete inner_context[token.value_var];delete inner_context[token.key_var];Twig.merge(context, inner_context, true);
      };if (Twig.lib.is("Array", result)) {
        len = result.length;Twig.forEach(result, function (value) {
          var key = index;loop(key, value);
        });
      } else if (Twig.lib.is("Object", result)) {
        if (result._keys !== undefined) {
          keyset = result._keys;
        } else {
          keyset = Object.keys(result);
        }len = keyset.length;Twig.forEach(keyset, function (key) {
          if (key === "_keys") return;loop(key, result[key]);
        });
      }continue_chain = output.length === 0;return { chain: continue_chain, output: Twig.output.apply(this, [output]) };
    } }, { type: Twig.logic.type.endfor, regex: /^endfor$/, next: [], open: false }, { type: Twig.logic.type.set, regex: /^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*([\s\S]+)$/, next: [], open: true, compile: function compile(token) {
      var key = token.match[1].trim(),
          expression = token.match[2],
          expression_stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;token.key = key;token.expression = expression_stack;delete token.match;return token;
    }, parse: function parse(token, context, continue_chain) {
      var value = Twig.expression.parse.apply(this, [token.expression, context]),
          key = token.key;context[key] = value;return { chain: continue_chain, context: context };
    } }, { type: Twig.logic.type.setcapture, regex: /^set\s+([a-zA-Z0-9_,\s]+)$/, next: [Twig.logic.type.endset], open: true, compile: function compile(token) {
      var key = token.match[1].trim();token.key = key;delete token.match;return token;
    }, parse: function parse(token, context, continue_chain) {
      var value = Twig.parse.apply(this, [token.output, context]),
          key = token.key;this.context[key] = value;context[key] = value;return { chain: continue_chain, context: context };
    } }, { type: Twig.logic.type.endset, regex: /^endset$/, next: [], open: false }, { type: Twig.logic.type.filter, regex: /^filter\s+(.+)$/, next: [Twig.logic.type.endfilter], open: true, compile: function compile(token) {
      var expression = "|" + token.match[1].trim();token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;delete token.match;return token;
    }, parse: function parse(token, context, chain) {
      var unfiltered = Twig.parse.apply(this, [token.output, context]),
          stack = [{ type: Twig.expression.type.string, value: unfiltered }].concat(token.stack);var output = Twig.expression.parse.apply(this, [stack, context]);return { chain: chain, output: output };
    } }, { type: Twig.logic.type.endfilter, regex: /^endfilter$/, next: [], open: false }, { type: Twig.logic.type.block, regex: /^block\s+([a-zA-Z0-9_]+)$/, next: [Twig.logic.type.endblock], open: true, compile: function compile(token) {
      token.block = token.match[1].trim();delete token.match;return token;
    }, parse: function parse(token, context, chain) {
      var block_output = "",
          output = "",
          isImported = this.importedBlocks.indexOf(token.block) > -1,
          hasParent = this.blocks[token.block] && this.blocks[token.block].indexOf(Twig.placeholders.parent) > -1;if (this.blocks[token.block] === undefined || isImported || hasParent || context.loop || token.overwrite) {
        block_output = Twig.expression.parse.apply(this, [{ type: Twig.expression.type.string, value: Twig.parse.apply(this, [token.output, context]) }, context]);if (isImported) {
          this.importedBlocks.splice(this.importedBlocks.indexOf(token.block), 1);
        }if (hasParent) {
          this.blocks[token.block] = Twig.Markup(this.blocks[token.block].replace(Twig.placeholders.parent, block_output));
        } else {
          this.blocks[token.block] = block_output;
        }this.originalBlockTokens[token.block] = { type: token.type, block: token.block, output: token.output, overwrite: true };
      }if (this.child.blocks[token.block]) {
        output = this.child.blocks[token.block];
      } else {
        output = this.blocks[token.block];
      }return { chain: chain, output: output };
    } }, { type: Twig.logic.type.endblock, regex: /^endblock(?:\s+([a-zA-Z0-9_]+))?$/, next: [], open: false }, { type: Twig.logic.type.extends_, regex: /^extends\s+(.+)$/, next: [], open: true, compile: function compile(token) {
      var expression = token.match[1].trim();delete token.match;token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;return token;
    }, parse: function parse(token, context, chain) {
      var file = Twig.expression.parse.apply(this, [token.stack, context]);this.extend = file;return { chain: chain, output: "" };
    } }, { type: Twig.logic.type.use, regex: /^use\s+(.+)$/, next: [], open: true, compile: function compile(token) {
      var expression = token.match[1].trim();delete token.match;token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;return token;
    }, parse: function parse(token, context, chain) {
      var file = Twig.expression.parse.apply(this, [token.stack, context]);this.importBlocks(file);return { chain: chain, output: "" };
    } }, { type: Twig.logic.type.include, regex: /^include\s+(ignore missing\s+)?(.+?)\s*(?:with\s+([\S\s]+?))?\s*(only)?$/, next: [], open: true, compile: function compile(token) {
      var match = token.match,
          includeMissing = match[1] !== undefined,
          expression = match[2].trim(),
          withContext = match[3],
          only = match[4] !== undefined && match[4].length;delete token.match;token.only = only;token.includeMissing = includeMissing;token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;if (withContext !== undefined) {
        token.withStack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: withContext.trim() }]).stack;
      }return token;
    }, parse: function parse(token, context, chain) {
      var innerContext = {},
          withContext,
          i,
          template;if (!token.only) {
        innerContext = Twig.ChildContext(context);
      }if (token.withStack !== undefined) {
        withContext = Twig.expression.parse.apply(this, [token.withStack, context]);for (i in withContext) {
          if (withContext.hasOwnProperty(i)) innerContext[i] = withContext[i];
        }
      }var file = Twig.expression.parse.apply(this, [token.stack, innerContext]);if (file instanceof Twig.Template) {
        template = file;
      } else {
        template = this.importFile(file);
      }return { chain: chain, output: template.render(innerContext) };
    } }, { type: Twig.logic.type.spaceless, regex: /^spaceless$/, next: [Twig.logic.type.endspaceless], open: true, parse: function parse(token, context, chain) {
      var unfiltered = Twig.parse.apply(this, [token.output, context]),
          rBetweenTagSpaces = />\s+</g,
          output = unfiltered.replace(rBetweenTagSpaces, "><").trim();return { chain: chain, output: output };
    } }, { type: Twig.logic.type.endspaceless, regex: /^endspaceless$/, next: [], open: false }, { type: Twig.logic.type.macro, regex: /^macro\s+([a-zA-Z0-9_]+)\s*\(\s*((?:[a-zA-Z0-9_]+(?:,\s*)?)*)\s*\)$/, next: [Twig.logic.type.endmacro], open: true, compile: function compile(token) {
      var macroName = token.match[1],
          parameters = token.match[2].split(/[\s,]+/);for (var i = 0; i < parameters.length; i++) {
        for (var j = 0; j < parameters.length; j++) {
          if (parameters[i] === parameters[j] && i !== j) {
            throw new Twig.Error("Duplicate arguments for parameter: " + parameters[i]);
          }
        }
      }token.macroName = macroName;token.parameters = parameters;delete token.match;return token;
    }, parse: function parse(token, context, chain) {
      var template = this;this.macros[token.macroName] = function () {
        var macroContext = { _self: template.macros };for (var i = 0; i < token.parameters.length; i++) {
          var prop = token.parameters[i];if (typeof arguments[i] !== "undefined") {
            macroContext[prop] = arguments[i];
          } else {
            macroContext[prop] = undefined;
          }
        }return Twig.parse.apply(template, [token.output, macroContext]);
      };return { chain: chain, output: "" };
    } }, { type: Twig.logic.type.endmacro, regex: /^endmacro$/, next: [], open: false }, { type: Twig.logic.type.import_, regex: /^import\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/, next: [], open: true, compile: function compile(token) {
      var expression = token.match[1].trim(),
          contextName = token.match[2].trim();delete token.match;token.expression = expression;token.contextName = contextName;token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;return token;
    }, parse: function parse(token, context, chain) {
      if (token.expression !== "_self") {
        var file = Twig.expression.parse.apply(this, [token.stack, context]);var template = this.importFile(file || token.expression);context[token.contextName] = template.render({}, { output: "macros" });
      } else {
        context[token.contextName] = this.macros;
      }return { chain: chain, output: "" };
    } }, { type: Twig.logic.type.from, regex: /^from\s+(.+)\s+import\s+([a-zA-Z0-9_, ]+)$/, next: [], open: true, compile: function compile(token) {
      var expression = token.match[1].trim(),
          macroExpressions = token.match[2].trim().split(/[ ,]+/),
          macroNames = {};for (var i = 0; i < macroExpressions.length; i++) {
        var res = macroExpressions[i];var macroMatch = res.match(/^([a-zA-Z0-9_]+)\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/);if (macroMatch) {
          macroNames[macroMatch[1].trim()] = macroMatch[2].trim();
        } else if (res.match(/^([a-zA-Z0-9_]+)$/)) {
          macroNames[res] = res;
        } else {}
      }delete token.match;token.expression = expression;token.macroNames = macroNames;token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;return token;
    }, parse: function parse(token, context, chain) {
      var macros;if (token.expression !== "_self") {
        var file = Twig.expression.parse.apply(this, [token.stack, context]);var template = this.importFile(file || token.expression);macros = template.render({}, { output: "macros" });
      } else {
        macros = this.macros;
      }for (var macroName in token.macroNames) {
        if (macros.hasOwnProperty(macroName)) {
          context[token.macroNames[macroName]] = macros[macroName];
        }
      }return { chain: chain, output: "" };
    } }, { type: Twig.logic.type.embed, regex: /^embed\s+(ignore missing\s+)?(.+?)\s*(?:with\s+(.+?))?\s*(only)?$/, next: [Twig.logic.type.endembed], open: true, compile: function compile(token) {
      var match = token.match,
          includeMissing = match[1] !== undefined,
          expression = match[2].trim(),
          withContext = match[3],
          only = match[4] !== undefined && match[4].length;delete token.match;token.only = only;token.includeMissing = includeMissing;token.stack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: expression }]).stack;if (withContext !== undefined) {
        token.withStack = Twig.expression.compile.apply(this, [{ type: Twig.expression.type.expression, value: withContext.trim() }]).stack;
      }return token;
    }, parse: function parse(token, context, chain) {
      var innerContext = {},
          withContext,
          i,
          template;if (!token.only) {
        for (i in context) {
          if (context.hasOwnProperty(i)) innerContext[i] = context[i];
        }
      }if (token.withStack !== undefined) {
        withContext = Twig.expression.parse.apply(this, [token.withStack, context]);for (i in withContext) {
          if (withContext.hasOwnProperty(i)) innerContext[i] = withContext[i];
        }
      }var file = Twig.expression.parse.apply(this, [token.stack, innerContext]);if (file instanceof Twig.Template) {
        template = file;
      } else {
        template = this.importFile(file);
      }this.blocks = {};var output = Twig.parse.apply(this, [token.output, innerContext]);return { chain: chain, output: template.render(innerContext, { blocks: this.blocks }) };
    } }, { type: Twig.logic.type.endembed, regex: /^endembed$/, next: [], open: false }];Twig.logic.handler = {};Twig.logic.extendType = function (type, value) {
    value = value || "Twig.logic.type" + type;Twig.logic.type[type] = value;
  };Twig.logic.extend = function (definition) {
    if (!definition.type) {
      throw new Twig.Error("Unable to extend logic definition. No type provided for " + definition);
    } else {
      Twig.logic.extendType(definition.type);
    }Twig.logic.handler[definition.type] = definition;
  };while (Twig.logic.definitions.length > 0) {
    Twig.logic.extend(Twig.logic.definitions.shift());
  }Twig.logic.compile = function (raw_token) {
    var expression = raw_token.value.trim(),
        token = Twig.logic.tokenize.apply(this, [expression]),
        token_template = Twig.logic.handler[token.type];if (token_template.compile) {
      token = token_template.compile.apply(this, [token]);Twig.log.trace("Twig.logic.compile: ", "Compiled logic token to ", token);
    }return token;
  };Twig.logic.tokenize = function (expression) {
    var token = {},
        token_template_type = null,
        token_type = null,
        token_regex = null,
        regex_array = null,
        regex = null,
        match = null;expression = expression.trim();for (token_template_type in Twig.logic.handler) {
      if (Twig.logic.handler.hasOwnProperty(token_template_type)) {
        token_type = Twig.logic.handler[token_template_type].type;token_regex = Twig.logic.handler[token_template_type].regex;regex_array = [];if (token_regex instanceof Array) {
          regex_array = token_regex;
        } else {
          regex_array.push(token_regex);
        }while (regex_array.length > 0) {
          regex = regex_array.shift();match = regex.exec(expression.trim());if (match !== null) {
            token.type = token_type;token.match = match;Twig.log.trace("Twig.logic.tokenize: ", "Matched a ", token_type, " regular expression of ", match);return token;
          }
        }
      }
    }throw new Twig.Error("Unable to parse '" + expression.trim() + "'");
  };Twig.logic.parse = function (token, context, chain) {
    var output = "",
        token_template;context = context || {};Twig.log.debug("Twig.logic.parse: ", "Parsing logic token ", token);token_template = Twig.logic.handler[token.type];if (token_template.parse) {
      output = token_template.parse.apply(this, [token, context, chain]);
    }return output;
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  "use strict";
  Twig.expression = {};Twig.expression.reservedWords = ["true", "false", "null", "TRUE", "FALSE", "NULL", "_context"];Twig.expression.type = { comma: "Twig.expression.type.comma", operator: { unary: "Twig.expression.type.operator.unary", binary: "Twig.expression.type.operator.binary" }, string: "Twig.expression.type.string", bool: "Twig.expression.type.bool", array: { start: "Twig.expression.type.array.start", end: "Twig.expression.type.array.end" }, object: { start: "Twig.expression.type.object.start", end: "Twig.expression.type.object.end" }, parameter: { start: "Twig.expression.type.parameter.start", end: "Twig.expression.type.parameter.end" }, key: { period: "Twig.expression.type.key.period", brackets: "Twig.expression.type.key.brackets" }, filter: "Twig.expression.type.filter", _function: "Twig.expression.type._function", variable: "Twig.expression.type.variable", number: "Twig.expression.type.number", _null: "Twig.expression.type.null", context: "Twig.expression.type.context", test: "Twig.expression.type.test" };Twig.expression.set = { operations: [Twig.expression.type.filter, Twig.expression.type.operator.unary, Twig.expression.type.operator.binary, Twig.expression.type.array.end, Twig.expression.type.object.end, Twig.expression.type.parameter.end, Twig.expression.type.comma, Twig.expression.type.test], expressions: [Twig.expression.type._function, Twig.expression.type.bool, Twig.expression.type.string, Twig.expression.type.variable, Twig.expression.type.number, Twig.expression.type._null, Twig.expression.type.context, Twig.expression.type.parameter.start, Twig.expression.type.array.start, Twig.expression.type.object.start] };Twig.expression.set.operations_extended = Twig.expression.set.operations.concat([Twig.expression.type.key.period, Twig.expression.type.key.brackets]);Twig.expression.fn = { compile: { push: function push(token, stack, output) {
        output.push(token);
      }, push_both: function push_both(token, stack, output) {
        output.push(token);stack.push(token);
      } }, parse: { push: function push(token, stack, context) {
        stack.push(token);
      }, push_value: function push_value(token, stack, context) {
        stack.push(token.value);
      } } };Twig.expression.definitions = [{ type: Twig.expression.type.test, regex: /^is\s+(not)?\s*([a-zA-Z_][a-zA-Z0-9_]*)/, next: Twig.expression.set.operations.concat([Twig.expression.type.parameter.start]), compile: function compile(token, stack, output) {
      token.filter = token.match[2];token.modifier = token.match[1];delete token.match;delete token.value;output.push(token);
    }, parse: function parse(token, stack, context) {
      var value = stack.pop(),
          params = token.params && Twig.expression.parse.apply(this, [token.params, context]),
          result = Twig.test(token.filter, value, params);if (token.modifier == "not") {
        stack.push(!result);
      } else {
        stack.push(result);
      }
    } }, { type: Twig.expression.type.comma, regex: /^,/, next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end, Twig.expression.type.object.end]), compile: function compile(token, stack, output) {
      var i = stack.length - 1,
          stack_token;delete token.match;delete token.value;for (; i >= 0; i--) {
        stack_token = stack.pop();if (stack_token.type === Twig.expression.type.object.start || stack_token.type === Twig.expression.type.parameter.start || stack_token.type === Twig.expression.type.array.start) {
          stack.push(stack_token);break;
        }output.push(stack_token);
      }output.push(token);
    } }, { type: Twig.expression.type.operator.binary, regex: /(^[\+\-~%\?\:]|^[!=]==?|^[!<>]=?|^\*\*?|^\/\/?|^and\s+|^or\s+|^in\s+|^not in\s+|^\.\.)/, next: Twig.expression.set.expressions.concat([Twig.expression.type.operator.unary]), compile: function compile(token, stack, output) {
      delete token.match;token.value = token.value.trim();var value = token.value,
          operator = Twig.expression.operator.lookup(value, token);Twig.log.trace("Twig.expression.compile: ", "Operator: ", operator, " from ", value);while (stack.length > 0 && (stack[stack.length - 1].type == Twig.expression.type.operator.unary || stack[stack.length - 1].type == Twig.expression.type.operator.binary) && (operator.associativity === Twig.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
        var temp = stack.pop();output.push(temp);
      }if (value === ":") {
        if (stack[stack.length - 1] && stack[stack.length - 1].value === "?") {} else {
          var key_token = output.pop();if (key_token.type === Twig.expression.type.string || key_token.type === Twig.expression.type.variable || key_token.type === Twig.expression.type.number) {
            token.key = key_token.value;
          } else {
            throw new Twig.Error("Unexpected value before ':' of " + key_token.type + " = " + key_token.value);
          }output.push(token);return;
        }
      } else {
        stack.push(operator);
      }
    }, parse: function parse(token, stack, context) {
      if (token.key) {
        stack.push(token);
      } else {
        Twig.expression.operator.parse(token.value, stack);
      }
    } }, { type: Twig.expression.type.operator.unary, regex: /(^not\s+)/, next: Twig.expression.set.expressions, compile: function compile(token, stack, output) {
      delete token.match;token.value = token.value.trim();var value = token.value,
          operator = Twig.expression.operator.lookup(value, token);Twig.log.trace("Twig.expression.compile: ", "Operator: ", operator, " from ", value);while (stack.length > 0 && (stack[stack.length - 1].type == Twig.expression.type.operator.unary || stack[stack.length - 1].type == Twig.expression.type.operator.binary) && (operator.associativity === Twig.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
        var temp = stack.pop();output.push(temp);
      }stack.push(operator);
    }, parse: function parse(token, stack, context) {
      Twig.expression.operator.parse(token.value, stack);
    } }, { type: Twig.expression.type.string, regex: /^(["'])(?:(?=(\\?))\2[\s\S])*?\1/, next: Twig.expression.set.operations, compile: function compile(token, stack, output) {
      var value = token.value;delete token.match;if (value.substring(0, 1) === '"') {
        value = value.replace('\\"', '"');
      } else {
        value = value.replace("\\'", "'");
      }token.value = value.substring(1, value.length - 1).replace(/\\n/g, "\n").replace(/\\r/g, "\r");Twig.log.trace("Twig.expression.compile: ", "String value: ", token.value);output.push(token);
    }, parse: Twig.expression.fn.parse.push_value }, { type: Twig.expression.type.parameter.start, regex: /^\(/, next: Twig.expression.set.expressions.concat([Twig.expression.type.parameter.end]), compile: Twig.expression.fn.compile.push_both, parse: Twig.expression.fn.parse.push }, { type: Twig.expression.type.parameter.end, regex: /^\)/, next: Twig.expression.set.operations_extended, compile: function compile(token, stack, output) {
      var stack_token,
          end_token = token;stack_token = stack.pop();while (stack.length > 0 && stack_token.type != Twig.expression.type.parameter.start) {
        output.push(stack_token);stack_token = stack.pop();
      }var param_stack = [];while (token.type !== Twig.expression.type.parameter.start) {
        param_stack.unshift(token);token = output.pop();
      }param_stack.unshift(token);var is_expression = false;token = output[output.length - 1];if (token === undefined || token.type !== Twig.expression.type._function && token.type !== Twig.expression.type.filter && token.type !== Twig.expression.type.test && token.type !== Twig.expression.type.key.brackets && token.type !== Twig.expression.type.key.period) {
        end_token.expression = true;param_stack.pop();param_stack.shift();end_token.params = param_stack;output.push(end_token);
      } else {
        end_token.expression = false;token.params = param_stack;
      }
    }, parse: function parse(token, stack, context) {
      var new_array = [],
          array_ended = false,
          value = null;if (token.expression) {
        value = Twig.expression.parse.apply(this, [token.params, context]);stack.push(value);
      } else {
        while (stack.length > 0) {
          value = stack.pop();if (value && value.type && value.type == Twig.expression.type.parameter.start) {
            array_ended = true;break;
          }new_array.unshift(value);
        }if (!array_ended) {
          throw new Twig.Error("Expected end of parameter set.");
        }stack.push(new_array);
      }
    } }, { type: Twig.expression.type.array.start, regex: /^\[/, next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end]), compile: Twig.expression.fn.compile.push_both, parse: Twig.expression.fn.parse.push }, { type: Twig.expression.type.array.end, regex: /^\]/, next: Twig.expression.set.operations_extended, compile: function compile(token, stack, output) {
      var i = stack.length - 1,
          stack_token;for (; i >= 0; i--) {
        stack_token = stack.pop();if (stack_token.type === Twig.expression.type.array.start) {
          break;
        }output.push(stack_token);
      }output.push(token);
    }, parse: function parse(token, stack, context) {
      var new_array = [],
          array_ended = false,
          value = null;while (stack.length > 0) {
        value = stack.pop();if (value.type && value.type == Twig.expression.type.array.start) {
          array_ended = true;break;
        }new_array.unshift(value);
      }if (!array_ended) {
        throw new Twig.Error("Expected end of array.");
      }stack.push(new_array);
    } }, { type: Twig.expression.type.object.start, regex: /^\{/, next: Twig.expression.set.expressions.concat([Twig.expression.type.object.end]), compile: Twig.expression.fn.compile.push_both, parse: Twig.expression.fn.parse.push }, { type: Twig.expression.type.object.end, regex: /^\}/, next: Twig.expression.set.operations_extended, compile: function compile(token, stack, output) {
      var i = stack.length - 1,
          stack_token;for (; i >= 0; i--) {
        stack_token = stack.pop();if (stack_token && stack_token.type === Twig.expression.type.object.start) {
          break;
        }output.push(stack_token);
      }output.push(token);
    }, parse: function parse(end_token, stack, context) {
      var new_object = {},
          object_ended = false,
          token = null,
          token_key = null,
          has_value = false,
          value = null;while (stack.length > 0) {
        token = stack.pop();if (token && token.type && token.type === Twig.expression.type.object.start) {
          object_ended = true;break;
        }if (token && token.type && (token.type === Twig.expression.type.operator.binary || token.type === Twig.expression.type.operator.unary) && token.key) {
          if (!has_value) {
            throw new Twig.Error("Missing value for key '" + token.key + "' in object definition.");
          }new_object[token.key] = value;if (new_object._keys === undefined) new_object._keys = [];new_object._keys.unshift(token.key);value = null;has_value = false;
        } else {
          has_value = true;value = token;
        }
      }if (!object_ended) {
        throw new Twig.Error("Unexpected end of object.");
      }stack.push(new_object);
    } }, { type: Twig.expression.type.filter, regex: /^\|\s?([a-zA-Z_][a-zA-Z0-9_\-]*)/, next: Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]), compile: function compile(token, stack, output) {
      token.value = token.match[1];output.push(token);
    }, parse: function parse(token, stack, context) {
      var input = stack.pop(),
          params = token.params && Twig.expression.parse.apply(this, [token.params, context]);stack.push(Twig.filter.apply(this, [token.value, input, params]));
    } }, { type: Twig.expression.type._function, regex: /^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/, next: Twig.expression.type.parameter.start, transform: function transform(match, tokens) {
      return "(";
    }, compile: function compile(token, stack, output) {
      var fn = token.match[1];token.fn = fn;delete token.match;delete token.value;output.push(token);
    }, parse: function parse(token, stack, context) {
      var params = token.params && Twig.expression.parse.apply(this, [token.params, context]),
          fn = token.fn,
          value;if (Twig.functions[fn]) {
        value = Twig.functions[fn].apply(this, params);
      } else if (typeof context[fn] == "function") {
        value = context[fn].apply(context, params);
      } else {
        throw new Twig.Error(fn + " function does not exist and is not defined in the context");
      }stack.push(value);
    } }, { type: Twig.expression.type.variable, regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, next: Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]), compile: Twig.expression.fn.compile.push, validate: function validate(match, tokens) {
      return Twig.indexOf(Twig.expression.reservedWords, match[0]) < 0;
    }, parse: function parse(token, stack, context) {
      var value = Twig.expression.resolve(context[token.value], context);stack.push(value);
    } }, { type: Twig.expression.type.key.period, regex: /^\.([a-zA-Z0-9_]+)/, next: Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]), compile: function compile(token, stack, output) {
      token.key = token.match[1];delete token.match;delete token.value;output.push(token);
    }, parse: function parse(token, stack, context) {
      var params = token.params && Twig.expression.parse.apply(this, [token.params, context]),
          key = token.key,
          object = stack.pop(),
          value;if (object === null || object === undefined) {
        if (this.options.strict_variables) {
          throw new Twig.Error("Can't access a key " + key + " on an null or undefined object.");
        } else {
          return null;
        }
      }var capitalize = function capitalize(value) {
        return value.substr(0, 1).toUpperCase() + value.substr(1);
      };if ((typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && key in object) {
        value = object[key];
      } else if (object["get" + capitalize(key)] !== undefined) {
        value = object["get" + capitalize(key)];
      } else if (object["is" + capitalize(key)] !== undefined) {
        value = object["is" + capitalize(key)];
      } else {
        value = null;
      }stack.push(Twig.expression.resolve(value, object, params));
    } }, { type: Twig.expression.type.key.brackets, regex: /^\[([^\]]*)\]/, next: Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]), compile: function compile(token, stack, output) {
      var match = token.match[1];delete token.value;delete token.match;token.stack = Twig.expression.compile({ value: match }).stack;output.push(token);
    }, parse: function parse(token, stack, context) {
      var params = token.params && Twig.expression.parse.apply(this, [token.params, context]),
          key = Twig.expression.parse.apply(this, [token.stack, context]),
          object = stack.pop(),
          value;if (object === null || object === undefined) {
        if (this.options.strict_variables) {
          throw new Twig.Error("Can't access a key " + key + " on an null or undefined object.");
        } else {
          return null;
        }
      }if ((typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && key in object) {
        value = object[key];
      } else {
        value = null;
      }stack.push(Twig.expression.resolve(value, object, params));
    } }, { type: Twig.expression.type._null, regex: /^(null|NULL|none|NONE)/, next: Twig.expression.set.operations, compile: function compile(token, stack, output) {
      delete token.match;token.value = null;output.push(token);
    }, parse: Twig.expression.fn.parse.push_value }, { type: Twig.expression.type.context, regex: /^_context/, next: Twig.expression.set.operations_extended.concat([Twig.expression.type.parameter.start]), compile: Twig.expression.fn.compile.push, parse: function parse(token, stack, context) {
      stack.push(context);
    } }, { type: Twig.expression.type.number, regex: /^\-?\d+(\.\d+)?/, next: Twig.expression.set.operations, compile: function compile(token, stack, output) {
      token.value = Number(token.value);output.push(token);
    }, parse: Twig.expression.fn.parse.push_value }, { type: Twig.expression.type.bool, regex: /^(true|TRUE|false|FALSE)/, next: Twig.expression.set.operations, compile: function compile(token, stack, output) {
      token.value = token.match[0].toLowerCase() === "true";delete token.match;output.push(token);
    }, parse: Twig.expression.fn.parse.push_value }];Twig.expression.resolve = function (value, context, params) {
    if (typeof value == "function") {
      return value.apply(context, params || []);
    } else {
      return value;
    }
  };Twig.expression.handler = {};Twig.expression.extendType = function (type) {
    Twig.expression.type[type] = "Twig.expression.type." + type;
  };Twig.expression.extend = function (definition) {
    if (!definition.type) {
      throw new Twig.Error("Unable to extend logic definition. No type provided for " + definition);
    }Twig.expression.handler[definition.type] = definition;
  };while (Twig.expression.definitions.length > 0) {
    Twig.expression.extend(Twig.expression.definitions.shift());
  }Twig.expression.tokenize = function (expression) {
    var tokens = [],
        exp_offset = 0,
        next = null,
        type,
        regex,
        regex_array,
        token_next,
        match_found,
        invalid_matches = [],
        match_function;match_function = function match_function() {
      var match = Array.prototype.slice.apply(arguments),
          string = match.pop(),
          offset = match.pop();Twig.log.trace("Twig.expression.tokenize", "Matched a ", type, " regular expression of ", match);if (next && Twig.indexOf(next, type) < 0) {
        invalid_matches.push(type + " cannot follow a " + tokens[tokens.length - 1].type + " at template:" + exp_offset + " near '" + match[0].substring(0, 20) + "...'");return match[0];
      }if (Twig.expression.handler[type].validate && !Twig.expression.handler[type].validate(match, tokens)) {
        return match[0];
      }invalid_matches = [];tokens.push({ type: type, value: match[0], match: match });match_found = true;next = token_next;exp_offset += match[0].length;if (Twig.expression.handler[type].transform) {
        return Twig.expression.handler[type].transform(match, tokens);
      }return "";
    };Twig.log.debug("Twig.expression.tokenize", "Tokenizing expression ", expression);while (expression.length > 0) {
      expression = expression.trim();for (type in Twig.expression.handler) {
        if (Twig.expression.handler.hasOwnProperty(type)) {
          token_next = Twig.expression.handler[type].next;regex = Twig.expression.handler[type].regex;if (regex instanceof Array) {
            regex_array = regex;
          } else {
            regex_array = [regex];
          }match_found = false;while (regex_array.length > 0) {
            regex = regex_array.pop();expression = expression.replace(regex, match_function);
          }if (match_found) {
            break;
          }
        }
      }if (!match_found) {
        if (invalid_matches.length > 0) {
          throw new Twig.Error(invalid_matches.join(" OR "));
        } else {
          throw new Twig.Error("Unable to parse '" + expression + "' at template position" + exp_offset);
        }
      }
    }Twig.log.trace("Twig.expression.tokenize", "Tokenized to ", tokens);return tokens;
  };Twig.expression.compile = function (raw_token) {
    var expression = raw_token.value,
        tokens = Twig.expression.tokenize(expression),
        token = null,
        output = [],
        stack = [],
        token_template = null;Twig.log.trace("Twig.expression.compile: ", "Compiling ", expression);while (tokens.length > 0) {
      token = tokens.shift();token_template = Twig.expression.handler[token.type];Twig.log.trace("Twig.expression.compile: ", "Compiling ", token);token_template.compile && token_template.compile(token, stack, output);Twig.log.trace("Twig.expression.compile: ", "Stack is", stack);Twig.log.trace("Twig.expression.compile: ", "Output is", output);
    }while (stack.length > 0) {
      output.push(stack.pop());
    }Twig.log.trace("Twig.expression.compile: ", "Final output is", output);raw_token.stack = output;delete raw_token.value;return raw_token;
  };Twig.expression.parse = function (tokens, context) {
    var that = this;if (!(tokens instanceof Array)) {
      tokens = [tokens];
    }var stack = [],
        token_template = null;Twig.forEach(tokens, function (token) {
      token_template = Twig.expression.handler[token.type];token_template.parse && token_template.parse.apply(that, [token, stack, context]);
    });return stack.pop();
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  "use strict";
  Twig.expression.operator = { leftToRight: "leftToRight", rightToLeft: "rightToLeft" };var containment = function containment(a, b) {
    if (b.indexOf !== undefined) {
      return a === b || a !== "" && b.indexOf(a) > -1;
    } else {
      var el;for (el in b) {
        if (b.hasOwnProperty(el) && b[el] === a) {
          return true;
        }
      }return false;
    }
  };Twig.expression.operator.lookup = function (operator, token) {
    switch (operator) {case "..":case "not in":case "in":
        token.precidence = 20;token.associativity = Twig.expression.operator.leftToRight;break;case ",":
        token.precidence = 18;token.associativity = Twig.expression.operator.leftToRight;break;case "?":case ":":
        token.precidence = 16;token.associativity = Twig.expression.operator.rightToLeft;break;case "or":
        token.precidence = 14;token.associativity = Twig.expression.operator.leftToRight;break;case "and":
        token.precidence = 13;token.associativity = Twig.expression.operator.leftToRight;break;case "==":case "!=":
        token.precidence = 9;token.associativity = Twig.expression.operator.leftToRight;break;case "<":case "<=":case ">":case ">=":
        token.precidence = 8;token.associativity = Twig.expression.operator.leftToRight;break;case "~":case "+":case "-":
        token.precidence = 6;token.associativity = Twig.expression.operator.leftToRight;break;case "//":case "**":case "*":case "/":case "%":
        token.precidence = 5;token.associativity = Twig.expression.operator.leftToRight;break;case "not":
        token.precidence = 3;token.associativity = Twig.expression.operator.rightToLeft;break;default:
        throw new Twig.Error(operator + " is an unknown operator.");}token.operator = operator;return token;
  };Twig.expression.operator.parse = function (operator, stack) {
    Twig.log.trace("Twig.expression.operator.parse: ", "Handling ", operator);var a, b, c;switch (operator) {case ":":
        break;case "?":
        c = stack.pop();b = stack.pop();a = stack.pop();if (a) {
          stack.push(b);
        } else {
          stack.push(c);
        }break;case "+":
        b = parseFloat(stack.pop());a = parseFloat(stack.pop());stack.push(a + b);break;case "-":
        b = parseFloat(stack.pop());a = parseFloat(stack.pop());stack.push(a - b);break;case "*":
        b = parseFloat(stack.pop());a = parseFloat(stack.pop());stack.push(a * b);break;case "/":
        b = parseFloat(stack.pop());a = parseFloat(stack.pop());stack.push(a / b);break;case "//":
        b = parseFloat(stack.pop());a = parseFloat(stack.pop());
        stack.push(parseInt(a / b));break;case "%":
        b = parseFloat(stack.pop());a = parseFloat(stack.pop());stack.push(a % b);break;case "~":
        b = stack.pop();a = stack.pop();stack.push((a != null ? a.toString() : "") + (b != null ? b.toString() : ""));break;case "not":case "!":
        stack.push(!stack.pop());break;case "<":
        b = stack.pop();a = stack.pop();stack.push(a < b);break;case "<=":
        b = stack.pop();a = stack.pop();stack.push(a <= b);break;case ">":
        b = stack.pop();a = stack.pop();stack.push(a > b);break;case ">=":
        b = stack.pop();a = stack.pop();stack.push(a >= b);break;case "===":
        b = stack.pop();a = stack.pop();stack.push(a === b);break;case "==":
        b = stack.pop();a = stack.pop();stack.push(a == b);break;case "!==":
        b = stack.pop();a = stack.pop();stack.push(a !== b);break;case "!=":
        b = stack.pop();a = stack.pop();stack.push(a != b);break;case "or":
        b = stack.pop();a = stack.pop();stack.push(a || b);break;case "and":
        b = stack.pop();a = stack.pop();stack.push(a && b);break;case "**":
        b = stack.pop();a = stack.pop();stack.push(Math.pow(a, b));break;case "not in":
        b = stack.pop();a = stack.pop();stack.push(!containment(a, b));break;case "in":
        b = stack.pop();a = stack.pop();stack.push(containment(a, b));break;case "..":
        b = stack.pop();a = stack.pop();stack.push(Twig.functions.range(a, b));break;default:
        throw new Twig.Error(operator + " is an unknown operator.");}
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);return obj !== undefined && obj !== null && clas === type;
  }Twig.filters = { upper: function upper(value) {
      if (typeof value !== "string") {
        return value;
      }return value.toUpperCase();
    }, lower: function lower(value) {
      if (typeof value !== "string") {
        return value;
      }return value.toLowerCase();
    }, capitalize: function capitalize(value) {
      if (typeof value !== "string") {
        return value;
      }return value.substr(0, 1).toUpperCase() + value.toLowerCase().substr(1);
    }, title: function title(value) {
      if (typeof value !== "string") {
        return value;
      }return value.toLowerCase().replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
        return p1 + p2.toUpperCase();
      });
    }, length: function length(value) {
      if (Twig.lib.is("Array", value) || typeof value === "string") {
        return value.length;
      } else if (Twig.lib.is("Object", value)) {
        if (value._keys === undefined) {
          return Object.keys(value).length;
        } else {
          return value._keys.length;
        }
      } else {
        return 0;
      }
    }, reverse: function reverse(value) {
      if (is("Array", value)) {
        return value.reverse();
      } else if (is("String", value)) {
        return value.split("").reverse().join("");
      } else if (is("Object", value)) {
        var keys = value._keys || Object.keys(value).reverse();value._keys = keys;return value;
      }
    }, sort: function sort(value) {
      if (is("Array", value)) {
        return value.sort();
      } else if (is("Object", value)) {
        delete value._keys;var keys = Object.keys(value),
            sorted_keys = keys.sort(function (a, b) {
          return value[a] > value[b];
        });value._keys = sorted_keys;return value;
      }
    }, keys: function keys(value) {
      if (value === undefined || value === null) {
        return;
      }var keyset = value._keys || Object.keys(value),
          output = [];Twig.forEach(keyset, function (key) {
        if (key === "_keys") return;if (value.hasOwnProperty(key)) {
          output.push(key);
        }
      });return output;
    }, url_encode: function url_encode(value) {
      if (value === undefined || value === null) {
        return;
      }return encodeURIComponent(value);
    }, join: function join(value, params) {
      if (value === undefined || value === null) {
        return;
      }var join_str = "",
          output = [],
          keyset = null;if (params && params[0]) {
        join_str = params[0];
      }if (is("Array", value)) {
        output = value;
      } else {
        keyset = value._keys || Object.keys(value);Twig.forEach(keyset, function (key) {
          if (key === "_keys") return;if (value.hasOwnProperty(key)) {
            output.push(value[key]);
          }
        });
      }return output.join(join_str);
    }, "default": function _default(value, params) {
      if (params === undefined || params.length !== 1) {
        throw new Twig.Error("default filter expects one argument");
      }if (value === undefined || value === null || value === "") {
        return params[0];
      } else {
        return value;
      }
    }, json_encode: function json_encode(value) {
      if (value && value.hasOwnProperty("_keys")) {
        delete value._keys;
      }if (value === undefined || value === null) {
        return "null";
      }return JSON.stringify(value);
    }, merge: function merge(value, params) {
      var obj = [],
          arr_index = 0,
          keyset = [];if (!is("Array", value)) {
        obj = {};
      } else {
        Twig.forEach(params, function (param) {
          if (!is("Array", param)) {
            obj = {};
          }
        });
      }if (!is("Array", obj)) {
        obj._keys = [];
      }if (is("Array", value)) {
        Twig.forEach(value, function (val) {
          if (obj._keys) obj._keys.push(arr_index);obj[arr_index] = val;arr_index++;
        });
      } else {
        keyset = value._keys || Object.keys(value);Twig.forEach(keyset, function (key) {
          obj[key] = value[key];obj._keys.push(key);var int_key = parseInt(key, 10);if (!isNaN(int_key) && int_key >= arr_index) {
            arr_index = int_key + 1;
          }
        });
      }Twig.forEach(params, function (param) {
        if (is("Array", param)) {
          Twig.forEach(param, function (val) {
            if (obj._keys) obj._keys.push(arr_index);obj[arr_index] = val;arr_index++;
          });
        } else {
          keyset = param._keys || Object.keys(param);Twig.forEach(keyset, function (key) {
            if (!obj[key]) obj._keys.push(key);obj[key] = param[key];var int_key = parseInt(key, 10);if (!isNaN(int_key) && int_key >= arr_index) {
              arr_index = int_key + 1;
            }
          });
        }
      });if (params.length === 0) {
        throw new Twig.Error("Filter merge expects at least one parameter");
      }return obj;
    }, date: function date(value, params) {
      var date = Twig.functions.date(value);var format = params && params.length ? params[0] : "F j, Y H:i";return Twig.lib.formatDate(date, format);
    }, date_modify: function date_modify(value, params) {
      if (value === undefined || value === null) {
        return;
      }if (params === undefined || params.length !== 1) {
        throw new Twig.Error("date_modify filter expects 1 argument");
      }var modifyText = params[0],
          time;if (Twig.lib.is("Date", value)) {
        time = Twig.lib.strtotime(modifyText, value.getTime() / 1e3);
      }if (Twig.lib.is("String", value)) {
        time = Twig.lib.strtotime(modifyText, Twig.lib.strtotime(value));
      }if (Twig.lib.is("Number", value)) {
        time = Twig.lib.strtotime(modifyText, value);
      }return new Date(time * 1e3);
    }, replace: function replace(value, params) {
      if (value === undefined || value === null) {
        return;
      }var pairs = params[0],
          tag;for (tag in pairs) {
        if (pairs.hasOwnProperty(tag) && tag !== "_keys") {
          value = Twig.lib.replaceAll(value, tag, pairs[tag]);
        }
      }return value;
    }, format: function format(value, params) {
      if (value === undefined || value === null) {
        return;
      }return Twig.lib.vsprintf(value, params);
    }, striptags: function striptags(value) {
      if (value === undefined || value === null) {
        return;
      }return Twig.lib.strip_tags(value);
    }, escape: function escape(value) {
      if (value === undefined || value === null) {
        return;
      }var raw_value = value.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");return Twig.Markup(raw_value);
    }, e: function e(value) {
      return Twig.filters.escape(value);
    }, nl2br: function nl2br(value) {
      if (value === undefined || value === null) {
        return;
      }var linebreak_tag = "BACKSLASH_n_replace",
          br = "<br />" + linebreak_tag;value = Twig.filters.escape(value).replace(/\r\n/g, br).replace(/\r/g, br).replace(/\n/g, br);value = Twig.lib.replaceAll(value, linebreak_tag, "\n");return Twig.Markup(value);
    }, number_format: function number_format(value, params) {
      var number = value,
          decimals = params && params[0] ? params[0] : undefined,
          dec = params && params[1] !== undefined ? params[1] : ".",
          sep = params && params[2] !== undefined ? params[2] : ",";number = (number + "").replace(/[^0-9+\-Ee.]/g, "");var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          s = "",
          toFixedFix = function toFixedFix(n, prec) {
        var k = Math.pow(10, prec);return "" + Math.round(n * k) / k;
      };s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";s[1] += new Array(prec - s[1].length + 1).join("0");
      }return s.join(dec);
    }, trim: function trim(value, params) {
      if (value === undefined || value === null) {
        return;
      }var str = Twig.filters.escape("" + value),
          whitespace;if (params && params[0]) {
        whitespace = "" + params[0];
      } else {
        whitespace = " \n\r\t\f\x0B \u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u3000";
      }for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
          str = str.substring(i);break;
        }
      }for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
          str = str.substring(0, i + 1);break;
        }
      }return whitespace.indexOf(str.charAt(0)) === -1 ? str : "";
    }, truncate: function truncate(value, params) {
      var length = 30,
          preserve = false,
          separator = "...";value = value + "";if (params) {
        if (params[0]) {
          length = params[0];
        }if (params[1]) {
          preserve = params[1];
        }if (params[2]) {
          separator = params[2];
        }
      }if (value.length > length) {
        if (preserve) {
          length = value.indexOf(" ", length);if (length === -1) {
            return value;
          }
        }value = value.substr(0, length) + separator;
      }return value;
    }, slice: function slice(value, params) {
      if (value === undefined || value === null) {
        return;
      }if (params === undefined || params.length < 1) {
        throw new Twig.Error("slice filter expects at least 1 argument");
      }var start = params[0] || 0;var length = params.length > 1 ? params[1] : value.length;var startIndex = start >= 0 ? start : Math.max(value.length + start, 0);if (Twig.lib.is("Array", value)) {
        var output = [];for (var i = startIndex; i < startIndex + length && i < value.length; i++) {
          output.push(value[i]);
        }return output;
      } else if (Twig.lib.is("String", value)) {
        return value.substr(startIndex, length);
      } else {
        throw new Twig.Error("slice filter expects value to be an array or string");
      }
    }, abs: function abs(value) {
      if (value === undefined || value === null) {
        return;
      }return Math.abs(value);
    }, first: function first(value) {
      if (is("Array", value)) {
        return value[0];
      } else if (is("Object", value)) {
        if ("_keys" in value) {
          return value[value._keys[0]];
        }
      } else if (typeof value === "string") {
        return value.substr(0, 1);
      }return;
    }, split: function split(value, params) {
      if (value === undefined || value === null) {
        return;
      }if (params === undefined || params.length < 1 || params.length > 2) {
        throw new Twig.Error("split filter expects 1 or 2 argument");
      }if (Twig.lib.is("String", value)) {
        var delimiter = params[0],
            limit = params[1],
            split = value.split(delimiter);if (limit === undefined) {
          return split;
        } else if (limit < 0) {
          return value.split(delimiter, split.length + limit);
        } else {
          var limitedSplit = [];if (delimiter == "") {
            while (split.length > 0) {
              var temp = "";for (var i = 0; i < limit && split.length > 0; i++) {
                temp += split.shift();
              }limitedSplit.push(temp);
            }
          } else {
            for (var i = 0; i < limit - 1 && split.length > 0; i++) {
              limitedSplit.push(split.shift());
            }if (split.length > 0) {
              limitedSplit.push(split.join(delimiter));
            }
          }return limitedSplit;
        }
      } else {
        throw new Twig.Error("split filter expects value to be a string");
      }
    }, last: function last(value) {
      if (Twig.lib.is("Object", value)) {
        var keys;if (value._keys === undefined) {
          keys = Object.keys(value);
        } else {
          keys = value._keys;
        }return value[keys[keys.length - 1]];
      }return value[value.length - 1];
    }, raw: function raw(value) {
      return Twig.Markup(value);
    }, batch: function batch(items, params) {
      var size = params.shift(),
          fill = params.shift(),
          result,
          last,
          missing;if (!Twig.lib.is("Array", items)) {
        throw new Twig.Error("batch filter expects items to be an array");
      }if (!Twig.lib.is("Number", size)) {
        throw new Twig.Error("batch filter expects size to be a number");
      }size = Math.ceil(size);result = Twig.lib.chunkArray(items, size);if (fill && items.length % size != 0) {
        last = result.pop();missing = size - last.length;while (missing--) {
          last.push(fill);
        }result.push(last);
      }return result;
    }, round: function round(value, params) {
      params = params || [];var precision = params.length > 0 ? params[0] : 0,
          method = params.length > 1 ? params[1] : "common";value = parseFloat(value);if (precision && !Twig.lib.is("Number", precision)) {
        throw new Twig.Error("round filter expects precision to be a number");
      }if (method === "common") {
        return Twig.lib.round(value, precision);
      }if (!Twig.lib.is("Function", Math[method])) {
        throw new Twig.Error("round filter expects method to be 'floor', 'ceil', or 'common'");
      }return Math[method](value * Math.pow(10, precision)) / Math.pow(10, precision);
    } };Twig.filter = function (filter, value, params) {
    if (!Twig.filters[filter]) {
      throw "Unable to find filter " + filter;
    }return Twig.filters[filter].apply(this, [value, params]);
  };Twig.filter.extend = function (filter, definition) {
    Twig.filters[filter] = definition;
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);return obj !== undefined && obj !== null && clas === type;
  }Twig.functions = { range: function range(low, high, step) {
      var matrix = [];var inival, endval, plus;var walker = step || 1;var chars = false;if (!isNaN(low) && !isNaN(high)) {
        inival = parseInt(low, 10);endval = parseInt(high, 10);
      } else if (isNaN(low) && isNaN(high)) {
        chars = true;inival = low.charCodeAt(0);endval = high.charCodeAt(0);
      } else {
        inival = isNaN(low) ? 0 : low;endval = isNaN(high) ? 0 : high;
      }plus = inival > endval ? false : true;if (plus) {
        while (inival <= endval) {
          matrix.push(chars ? String.fromCharCode(inival) : inival);inival += walker;
        }
      } else {
        while (inival >= endval) {
          matrix.push(chars ? String.fromCharCode(inival) : inival);inival -= walker;
        }
      }return matrix;
    }, cycle: function cycle(arr, i) {
      var pos = i % arr.length;return arr[pos];
    }, dump: function dump() {
      var EOL = "\n",
          indentChar = "  ",
          indentTimes = 0,
          out = "",
          args = Array.prototype.slice.call(arguments),
          indent = function indent(times) {
        var ind = "";while (times > 0) {
          times--;ind += indentChar;
        }return ind;
      },
          displayVar = function displayVar(variable) {
        out += indent(indentTimes);if ((typeof variable === "undefined" ? "undefined" : _typeof(variable)) === "object") {
          dumpVar(variable);
        } else if (typeof variable === "function") {
          out += "function()" + EOL;
        } else if (typeof variable === "string") {
          out += "string(" + variable.length + ') "' + variable + '"' + EOL;
        } else if (typeof variable === "number") {
          out += "number(" + variable + ")" + EOL;
        } else if (typeof variable === "boolean") {
          out += "bool(" + variable + ")" + EOL;
        }
      },
          dumpVar = function dumpVar(variable) {
        var i;if (variable === null) {
          out += "NULL" + EOL;
        } else if (variable === undefined) {
          out += "undefined" + EOL;
        } else if ((typeof variable === "undefined" ? "undefined" : _typeof(variable)) === "object") {
          out += indent(indentTimes) + (typeof variable === "undefined" ? "undefined" : _typeof(variable));indentTimes++;out += "(" + function (obj) {
            var size = 0,
                key;for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                size++;
              }
            }return size;
          }(variable) + ") {" + EOL;for (i in variable) {
            out += indent(indentTimes) + "[" + i + "]=> " + EOL;displayVar(variable[i]);
          }indentTimes--;out += indent(indentTimes) + "}" + EOL;
        } else {
          displayVar(variable);
        }
      };if (args.length == 0) args.push(this.context);Twig.forEach(args, function (variable) {
        dumpVar(variable);
      });return out;
    }, date: function date(_date, time) {
      var dateObj;if (_date === undefined) {
        dateObj = new Date();
      } else if (Twig.lib.is("Date", _date)) {
        dateObj = _date;
      } else if (Twig.lib.is("String", _date)) {
        dateObj = new Date(Twig.lib.strtotime(_date) * 1e3);
      } else if (Twig.lib.is("Number", _date)) {
        dateObj = new Date(_date * 1e3);
      } else {
        throw new Twig.Error("Unable to parse date " + _date);
      }return dateObj;
    }, block: function block(_block) {
      if (this.originalBlockTokens[_block]) {
        return Twig.logic.parse.apply(this, [this.originalBlockTokens[_block], this.context]).output;
      } else {
        return this.blocks[_block];
      }
    }, parent: function parent() {
      return Twig.placeholders.parent;
    }, attribute: function attribute(object, method, params) {
      if (Twig.lib.is("Object", object)) {
        if (object.hasOwnProperty(method)) {
          if (typeof object[method] === "function") {
            return object[method].apply(undefined, params);
          } else {
            return object[method];
          }
        }
      }return object[method] || undefined;
    }, template_from_string: function template_from_string(template) {
      if (template === undefined) {
        template = "";
      }return new Twig.Template({ options: this.options, data: template });
    }, random: function random(value) {
      var LIMIT_INT31 = 2147483648;function getRandomNumber(n) {
        var random = Math.floor(Math.random() * LIMIT_INT31);var limits = [0, n];var min = Math.min.apply(null, limits),
            max = Math.max.apply(null, limits);return min + Math.floor((max - min + 1) * random / LIMIT_INT31);
      }if (Twig.lib.is("Number", value)) {
        return getRandomNumber(value);
      }if (Twig.lib.is("String", value)) {
        return value.charAt(getRandomNumber(value.length - 1));
      }if (Twig.lib.is("Array", value)) {
        return value[getRandomNumber(value.length - 1)];
      }if (Twig.lib.is("Object", value)) {
        var keys = Object.keys(value);return value[keys[getRandomNumber(keys.length - 1)]];
      }return getRandomNumber(LIMIT_INT31 - 1);
    } };Twig._function = function (_function, value, params) {
    if (!Twig.functions[_function]) {
      throw "Unable to find function " + _function;
    }return Twig.functions[_function](value, params);
  };Twig._function.extend = function (_function, definition) {
    Twig.functions[_function] = definition;
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  "use strict";
  Twig.tests = { empty: function empty(value) {
      if (value === null || value === undefined) return true;if (typeof value === "number") return false;if (value.length && value.length > 0) return false;for (var key in value) {
        if (value.hasOwnProperty(key)) return false;
      }return true;
    }, odd: function odd(value) {
      return value % 2 === 1;
    }, even: function even(value) {
      return value % 2 === 0;
    }, divisibleby: function divisibleby(value, params) {
      return value % params[0] === 0;
    }, defined: function defined(value) {
      return value !== undefined;
    }, none: function none(value) {
      return value === null;
    }, "null": function _null(value) {
      return this.none(value);
    }, sameas: function sameas(value, params) {
      return value === params[0];
    }, iterable: function iterable(value) {
      return value && (Twig.lib.is("Array", value) || Twig.lib.is("Object", value));
    } };Twig.test = function (test, value, params) {
    if (!Twig.tests[test]) {
      throw "Test " + test + " is not defined.";
    }return Twig.tests[test](value, params);
  };Twig.test.extend = function (test, definition) {
    Twig.tests[test] = definition;
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  "use strict";
  Twig.exports = { VERSION: Twig.VERSION };Twig.exports.twig = function twig(params) {
    "use strict";
    var id = params.id,
        options = { strict_variables: params.strict_variables || false, autoescape: params.autoescape != null && params.autoescape || false, allowInlineIncludes: params.allowInlineIncludes || false, rethrow: params.rethrow || false };if (id) {
      Twig.validateId(id);
    }if (params.debug !== undefined) {
      Twig.debug = params.debug;
    }if (params.trace !== undefined) {
      Twig.trace = params.trace;
    }if (params.data !== undefined) {
      return new Twig.Template({ data: params.data, module: params.module, id: id, options: options });
    } else if (params.ref !== undefined) {
      if (params.id !== undefined) {
        throw new Twig.Error("Both ref and id cannot be set on a twig.js template.");
      }return Twig.Templates.load(params.ref);
    } else if (params.href !== undefined) {
      return Twig.Templates.loadRemote(params.href, { id: id, method: "ajax", base: params.base, module: params.module, precompiled: params.precompiled, async: params.async, options: options }, params.load, params.error);
    } else if (params.path !== undefined) {
      return Twig.Templates.loadRemote(params.path, { id: id, method: "fs", base: params.base, module: params.module, precompiled: params.precompiled, async: params.async, options: options }, params.load, params.error);
    }
  };Twig.exports.extendFilter = function (filter, definition) {
    Twig.filter.extend(filter, definition);
  };Twig.exports.extendFunction = function (fn, definition) {
    Twig._function.extend(fn, definition);
  };Twig.exports.extendTest = function (test, definition) {
    Twig.test.extend(test, definition);
  };Twig.exports.extendTag = function (definition) {
    Twig.logic.extend(definition);
  };Twig.exports.extend = function (fn) {
    fn(Twig);
  };Twig.exports.compile = function (markup, options) {
    var id = options.filename,
        path = options.filename,
        template;template = new Twig.Template({ data: markup, path: path, id: id, options: options.settings["twig options"] });return function (context) {
      return template.render(context);
    };
  };Twig.exports.renderFile = function (path, options, fn) {
    if ("function" == typeof options) {
      fn = options;options = {};
    }options = options || {};var params = { path: path, base: options.settings["views"], load: function load(template) {
        fn(null, template.render(options));
      } };var view_options = options.settings["twig options"];if (view_options) {
      for (var option in view_options) {
        if (view_options.hasOwnProperty(option)) {
          params[option] = view_options[option];
        }
      }
    }Twig.exports.twig(params);
  };Twig.exports.__express = Twig.exports.renderFile;Twig.exports.cache = function (cache) {
    Twig.cache = cache;
  };return Twig;
}(Twig || {});var Twig = function (Twig) {
  Twig.compiler = { module: {} };Twig.compiler.compile = function (template, options) {
    var tokens = JSON.stringify(template.tokens),
        id = template.id,
        output;if (options.module) {
      if (Twig.compiler.module[options.module] === undefined) {
        throw new Twig.Error("Unable to find module type " + options.module);
      }output = Twig.compiler.module[options.module](id, tokens, options.twig);
    } else {
      output = Twig.compiler.wrap(id, tokens);
    }return output;
  };Twig.compiler.module = { amd: function amd(id, tokens, pathToTwig) {
      return 'define(["' + pathToTwig + '"], function (Twig) {\n	var twig, templates;\ntwig = Twig.twig;\ntemplates = ' + Twig.compiler.wrap(id, tokens) + "\n	return templates;\n});";
    }, node: function node(id, tokens) {
      return 'var twig = require("twig").twig;\n' + "exports.template = " + Twig.compiler.wrap(id, tokens);
    }, cjs2: function cjs2(id, tokens, pathToTwig) {
      return 'module.declare([{ twig: "' + pathToTwig + '" }], function (require, exports, module) {\n' + '	var twig = require("twig").twig;\n' + "	exports.template = " + Twig.compiler.wrap(id, tokens) + "\n});";
    } };Twig.compiler.wrap = function (id, tokens) {
    return 'twig({id:"' + id.replace('"', '\\"') + '", data:' + tokens + ", precompiled: true});\n";
  };return Twig;
}(Twig || {});if (typeof module !== "undefined" && module.declare) {
  module.declare([], function (require, exports, module) {
    for (key in Twig.exports) {
      if (Twig.exports.hasOwnProperty(key)) {
        exports[key] = Twig.exports[key];
      }
    }
  });
} else if (typeof define == "function" && define.amd) {
  define(function () {
    return Twig.exports;
  });
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = Twig.exports;
} else {
  window.twig = Twig.exports.twig;window.Twig = Twig.exports;
}
//! moment.js
//! version : 2.12.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Zc.apply(null,arguments)}function b(a){Zc=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ia(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),$c.length>0)for(c in $c)d=$c[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),_c===!1&&(_c=!0,a.updateOffset(this),_c=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(a,b){var c=!0;return g(function(){return c&&(t(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function v(a,b){ad[a]||(t(b),ad[a]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!cd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=bd._abbr,require("./locale/"+a),E(b)}catch(c){}return cd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(bd=c)),bd._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=cd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(cd[a]._config,b)):null!=b.parentLocale&&(null!=cd[b.parentLocale]?b=z(cd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),cd[a]=new A(b),E(a),cd[a]):(delete cd[a],null)}function G(a,b){if(null!=b){var c;null!=cd[a]&&(b=z(cd[a]._config,b)),c=new A(b),c.parentLocale=cd[a],cd[a]=c,E(a)}else null!=cd[a]&&(null!=cd[a].parentLocale?cd[a]=cd[a].parentLocale:null!=cd[a]&&delete cd[a]);return cd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return bd;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return Object.keys(cd)}function J(a,b){var c=a.toLowerCase();dd[c]=dd[c+"s"]=dd[b]=a}function K(a){return"string"==typeof a?dd[a]||dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(hd[a]=e),b&&(hd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(hd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(ed);for(b=0,c=d.length;c>b;b++)hd[d[b]]?d[b]=hd[d[b]]:d[b]=S(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),gd[b]=gd[b]||T(b),gd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(fd.lastIndex=0;d>=0&&fd.test(a);)a=a.replace(fd,c),fd.lastIndex=0,d-=1;return a}function W(a,b,c){zd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(zd,a)?zd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ad[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ad,a)&&Ad[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Kd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Kd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function fa(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ga(b){return null!=b?(fa(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ha(){return ba(this.year(),this.month())}function ia(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function ka(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")$","i")}function la(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Cd]<0||c[Cd]>11?Cd:c[Dd]<1||c[Dd]>ba(c[Bd],c[Cd])?Dd:c[Ed]<0||c[Ed]>24||24===c[Ed]&&(0!==c[Fd]||0!==c[Gd]||0!==c[Hd])?Ed:c[Fd]<0||c[Fd]>59?Fd:c[Gd]<0||c[Gd]>59?Gd:c[Hd]<0||c[Hd]>999?Hd:-1,j(a)._overflowDayOfYear&&(Bd>b||b>Dd)&&(b=Dd),j(a)._overflowWeeks&&-1===b&&(b=Id),j(a)._overflowWeekday&&-1===b&&(b=Jd),j(a).overflow=b),a}function ma(a){var b,c,d,e,f,g,h=a._i,i=Pd.exec(h)||Qd.exec(h);if(i){for(j(a).iso=!0,b=0,c=Sd.length;c>b;b++)if(Sd[b][1].exec(i[1])){e=Sd[b][0],d=Sd[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Td.length;c>b;b++)if(Td[b][1].exec(i[3])){f=(i[2]||" ")+Td[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Rd.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ba(a)}else a._isValid=!1}function na(b){var c=Ud.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ma(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function oa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function pa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function qa(a){return ra(a)?366:365}function ra(a){return a%4===0&&a%100!==0||a%400===0}function sa(){return ra(this.year())}function ta(a,b,c){var d=7+b-c,e=(7+pa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function ua(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ta(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=qa(f)+j):j>qa(a)?(f=a+1,g=j-qa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function va(a,b,c){var d,e,f=ta(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+wa(e,b,c)):g>wa(a.year(),b,c)?(d=g-wa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function wa(a,b,c){var d=ta(a,b,c),e=ta(a+1,b,c);return(qa(a)-d+e)/7}function xa(a,b,c){return null!=a?a:null!=b?b:c}function ya(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function za(a){var b,c,d,e,f=[];if(!a._d){for(d=ya(a),a._w&&null==a._a[Dd]&&null==a._a[Cd]&&Aa(a),a._dayOfYear&&(e=xa(a._a[Bd],d[Bd]),a._dayOfYear>qa(e)&&(j(a)._overflowDayOfYear=!0),c=pa(e,0,a._dayOfYear),a._a[Cd]=c.getUTCMonth(),a._a[Dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Ed]&&0===a._a[Fd]&&0===a._a[Gd]&&0===a._a[Hd]&&(a._nextDay=!0,a._a[Ed]=0),a._d=(a._useUTC?pa:oa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Ed]=24)}}function Aa(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=xa(b.GG,a._a[Bd],va(Ja(),1,4).year),d=xa(b.W,1),e=xa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=xa(b.gg,a._a[Bd],va(Ja(),f,g).year),d=xa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>wa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=ua(c,d,e,f,g),a._a[Bd]=h.year,a._dayOfYear=h.dayOfYear)}function Ba(b){if(b._f===a.ISO_8601)return void ma(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(ed)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),hd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Ed]<=12&&b._a[Ed]>0&&(j(b).bigHour=void 0),b._a[Ed]=Ca(b._locale,b._a[Ed],b._meridiem),za(b),la(b)}function Ca(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Da(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ba(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Ea(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),za(a)}}function Fa(a){var b=new o(la(Ga(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ga(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(la(b)):(c(e)?Da(a):e?Ba(a):d(b)?a._d=b:Ha(a),k(a)||(a._d=null),a))}function Ha(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?na(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),za(b)):"object"==typeof f?Ea(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ia(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Fa(f)}function Ja(a,b,c,d){return Ia(a,b,c,d,!1)}function Ka(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ja();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function La(){var a=[].slice.call(arguments,0);return Ka("isBefore",a)}function Ma(){var a=[].slice.call(arguments,0);return Ka("isAfter",a)}function Na(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Oa(a){return a instanceof Na}function Pa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Qa(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Zd)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ra(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Ja(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Ja(b).local()}function Sa(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ta(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Qa(wd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Sa(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?ib(this,cb(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Sa(this):null!=b?this:NaN}function Ua(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Va(a){return this.utcOffset(0,a)}function Wa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Sa(this),"m")),this}function Xa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Qa(vd,this._i)),this}function Ya(a){return this.isValid()?(a=a?Ja(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Za(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function $a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ga(a),a._a){var b=a._isUTC?h(a._a):Ja(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function _a(){return this.isValid()?!this._isUTC:!1}function ab(){return this.isValid()?this._isUTC:!1}function bb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function cb(a,b){var c,d,e,g=a,h=null;return Oa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=$d.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Dd])*c,h:r(h[Ed])*c,m:r(h[Fd])*c,s:r(h[Gd])*c,ms:r(h[Hd])*c}):(h=_d.exec(a))?(c="-"===h[1]?-1:1,g={y:db(h[2],c),M:db(h[3],c),w:db(h[4],c),d:db(h[5],c),h:db(h[6],c),m:db(h[7],c),s:db(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=fb(Ja(g.from),Ja(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Na(g),Oa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function db(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function eb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function fb(a,b){var c;return a.isValid()&&b.isValid()?(b=Ra(b,a),a.isBefore(b)?c=eb(a,b):(c=eb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function gb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function hb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=cb(c,d),ib(this,e,a),this}}function ib(b,c,d,e){var f=c._milliseconds,g=gb(c._days),h=gb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&fa(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function jb(a,b){var c=a||Ja(),d=Ra(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ja(c)))}function kb(){return new o(this)}function lb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function mb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function nb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function ob(a,b){var c,d=p(a)?a:Ja(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function pb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function qb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function rb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ra(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=sb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function sb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function tb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ub(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function vb(b){var c=U(this,b||a.defaultFormat);return this.localeData().postformat(c)}function wb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function xb(a){return this.from(Ja(),a)}function yb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function zb(a){return this.to(Ja(),a)}function Ab(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Bb(){return this._locale}function Cb(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Db(a){return a=K(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function Eb(){return+this._d-6e4*(this._offset||0)}function Fb(){return Math.floor(+this/1e3)}function Gb(){return this._offset?new Date(+this):this._d}function Hb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Ib(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Jb(){return this.isValid()?this.toISOString():null}function Kb(){return k(this)}function Lb(){return g({},j(this))}function Mb(){return j(this).overflow}function Nb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ob(a,b){R(0,[a,a.length],0,b)}function Pb(a){return Tb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Qb(a){return Tb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Rb(){return wa(this.year(),1,4)}function Sb(){var a=this.localeData()._week;return wa(this.year(),a.dow,a.doy)}function Tb(a,b,c,d,e){var f;return null==a?va(this,d,e).year:(f=wa(a,d,e),b>f&&(b=f),Ub.call(this,a,b,c,d,e))}function Ub(a,b,c,d,e){var f=ua(a,b,c,d,e),g=pa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Vb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Wb(a){return va(a,this._week.dow,this._week.doy).week}function Xb(){return this._week.dow}function Yb(){return this._week.doy}function Zb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function $b(a){var b=va(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function _b(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function ac(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function bc(a){return this._weekdaysShort[a.day()]}function cc(a){return this._weekdaysMin[a.day()]}function dc(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Ja([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function ec(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=_b(a,this.localeData()),this.add(a-b,"d")):b}function fc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function gc(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function ic(){return this.hours()%12||12}function jc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function kc(a,b){return b._meridiemParse}function lc(a){return"p"===(a+"").toLowerCase().charAt(0)}function mc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function nc(a,b){b[Hd]=r(1e3*("0."+a))}function oc(){return this._isUTC?"UTC":""}function pc(){return this._isUTC?"Coordinated Universal Time":""}function qc(a){return Ja(1e3*a)}function rc(){return Ja.apply(null,arguments).parseZone()}function sc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function tc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function uc(){return this._invalidDate}function vc(a){return this._ordinal.replace("%d",a)}function wc(a){return a}function xc(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function yc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function zc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Ac(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return zc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=zc(a,f,c,e);return g}function Bc(a,b){return Ac(a,b,"months",12,"month")}function Cc(a,b){return Ac(a,b,"monthsShort",12,"month")}function Dc(a,b){return Ac(a,b,"weekdays",7,"day")}function Ec(a,b){return Ac(a,b,"weekdaysShort",7,"day")}function Fc(a,b){return Ac(a,b,"weekdaysMin",7,"day")}function Gc(){var a=this._data;return this._milliseconds=xe(this._milliseconds),this._days=xe(this._days),this._months=xe(this._months),a.milliseconds=xe(a.milliseconds),a.seconds=xe(a.seconds),a.minutes=xe(a.minutes),a.hours=xe(a.hours),a.months=xe(a.months),a.years=xe(a.years),this}function Hc(a,b,c,d){var e=cb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Ic(a,b){return Hc(this,a,b,1)}function Jc(a,b){return Hc(this,a,b,-1)}function Kc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Lc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Kc(Nc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Mc(g)),h+=e,g-=Kc(Nc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Mc(a){return 4800*a/146097}function Nc(a){return 146097*a/4800}function Oc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Mc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Nc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Pc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Qc(a){return function(){return this.as(a)}}function Rc(a){return a=K(a),this[a+"s"]()}function Sc(a){return function(){return this._data[a]}}function Tc(){return q(this.days()/7)}function Uc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Vc(a,b,c){var d=cb(a).abs(),e=Ne(d.as("s")),f=Ne(d.as("m")),g=Ne(d.as("h")),h=Ne(d.as("d")),i=Ne(d.as("M")),j=Ne(d.as("y")),k=e<Oe.s&&["s",e]||1>=f&&["m"]||f<Oe.m&&["mm",f]||1>=g&&["h"]||g<Oe.h&&["hh",g]||1>=h&&["d"]||h<Oe.d&&["dd",h]||1>=i&&["M"]||i<Oe.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Uc.apply(null,k)}function Wc(a,b){return void 0===Oe[a]?!1:void 0===b?Oe[a]:(Oe[a]=b,!0)}function Xc(a){var b=this.localeData(),c=Vc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Yc(){var a,b,c,d=Pe(this._milliseconds)/1e3,e=Pe(this._days),f=Pe(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Zc,$c=a.momentProperties=[],_c=!1,ad={};a.suppressDeprecationWarnings=!1;var bd,cd={},dd={},ed=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,fd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,gd={},hd={},id=/\d/,jd=/\d\d/,kd=/\d{3}/,ld=/\d{4}/,md=/[+-]?\d{6}/,nd=/\d\d?/,od=/\d\d\d\d?/,pd=/\d\d\d\d\d\d?/,qd=/\d{1,3}/,rd=/\d{1,4}/,sd=/[+-]?\d{1,6}/,td=/\d+/,ud=/[+-]?\d+/,vd=/Z|[+-]\d\d:?\d\d/gi,wd=/Z|[+-]\d\d(?::?\d\d)?/gi,xd=/[+-]?\d+(\.\d{1,3})?/,yd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,zd={},Ad={},Bd=0,Cd=1,Dd=2,Ed=3,Fd=4,Gd=5,Hd=6,Id=7,Jd=8;R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",nd),W("MM",nd,jd),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Cd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Cd]=e:j(c).invalidMonth=a});var Kd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Ld="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Md="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Nd=yd,Od=yd,Pd=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Qd=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Rd=/Z|[+-]\d\d(?::?\d\d)?/,Sd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Td=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ud=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",ud),W("YY",nd,jd),W("YYYY",rd,ld),W("YYYYY",sd,md),W("YYYYYY",sd,md),$(["YYYYY","YYYYYY"],Bd),$("YYYY",function(b,c){c[Bd]=2===b.length?a.parseTwoDigitYear(b):r(b);
}),$("YY",function(b,c){c[Bd]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Bd]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Vd=M("FullYear",!1);a.ISO_8601=function(){};var Wd=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Xd=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Yd=function(){return Date.now?Date.now():+new Date};Pa("Z",":"),Pa("ZZ",""),W("Z",wd),W("ZZ",wd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Qa(wd,a)});var Zd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var $d=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,_d=/^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;cb.fn=Na.prototype;var ae=hb(1,"add"),be=hb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var ce=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ob("gggg","weekYear"),Ob("ggggg","weekYear"),Ob("GGGG","isoWeekYear"),Ob("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",ud),W("g",ud),W("GG",nd,jd),W("gg",nd,jd),W("GGGG",rd,ld),W("gggg",rd,ld),W("GGGGG",sd,md),W("ggggg",sd,md),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",id),$("Q",function(a,b){b[Cd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",nd),W("ww",nd,jd),W("W",nd),W("WW",nd,jd),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var de={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",nd),W("DD",nd,jd),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Dd),$("Do",function(a,b){b[Dd]=r(a.match(nd)[0],10)});var ee=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",nd),W("e",nd),W("E",nd),W("dd",yd),W("ddd",yd),W("dddd",yd),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var fe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),ge="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),he="Su_Mo_Tu_We_Th_Fr_Sa".split("_");R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",qd),W("DDDD",kd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,ic),R("hmm",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),jc("a",!0),jc("A",!1),J("hour","h"),W("a",kc),W("A",kc),W("H",nd),W("h",nd),W("HH",nd,jd),W("hh",nd,jd),W("hmm",od),W("hmmss",pd),W("Hmm",od),W("Hmmss",pd),$(["H","HH"],Ed),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Ed]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e))});var ie=/[ap]\.?m?\.?/i,je=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",nd),W("mm",nd,jd),$(["m","mm"],Fd);var ke=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",nd),W("ss",nd,jd),$(["s","ss"],Gd);var le=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",qd,id),W("SS",qd,jd),W("SSS",qd,kd);var me;for(me="SSSS";me.length<=9;me+="S")W(me,td);for(me="S";me.length<=9;me+="S")$(me,nc);var ne=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var oe=o.prototype;oe.add=ae,oe.calendar=jb,oe.clone=kb,oe.diff=rb,oe.endOf=Db,oe.format=vb,oe.from=wb,oe.fromNow=xb,oe.to=yb,oe.toNow=zb,oe.get=P,oe.invalidAt=Mb,oe.isAfter=lb,oe.isBefore=mb,oe.isBetween=nb,oe.isSame=ob,oe.isSameOrAfter=pb,oe.isSameOrBefore=qb,oe.isValid=Kb,oe.lang=ce,oe.locale=Ab,oe.localeData=Bb,oe.max=Xd,oe.min=Wd,oe.parsingFlags=Lb,oe.set=P,oe.startOf=Cb,oe.subtract=be,oe.toArray=Hb,oe.toObject=Ib,oe.toDate=Gb,oe.toISOString=ub,oe.toJSON=Jb,oe.toString=tb,oe.unix=Fb,oe.valueOf=Eb,oe.creationData=Nb,oe.year=Vd,oe.isLeapYear=sa,oe.weekYear=Pb,oe.isoWeekYear=Qb,oe.quarter=oe.quarters=Vb,oe.month=ga,oe.daysInMonth=ha,oe.week=oe.weeks=Zb,oe.isoWeek=oe.isoWeeks=$b,oe.weeksInYear=Sb,oe.isoWeeksInYear=Rb,oe.date=ee,oe.day=oe.days=ec,oe.weekday=fc,oe.isoWeekday=gc,oe.dayOfYear=hc,oe.hour=oe.hours=je,oe.minute=oe.minutes=ke,oe.second=oe.seconds=le,oe.millisecond=oe.milliseconds=ne,oe.utcOffset=Ta,oe.utc=Va,oe.local=Wa,oe.parseZone=Xa,oe.hasAlignedHourOffset=Ya,oe.isDST=Za,oe.isDSTShifted=$a,oe.isLocal=_a,oe.isUtcOffset=ab,oe.isUtc=bb,oe.isUTC=bb,oe.zoneAbbr=oc,oe.zoneName=pc,oe.dates=u("dates accessor is deprecated. Use date instead.",ee),oe.months=u("months accessor is deprecated. Use month instead",ga),oe.years=u("years accessor is deprecated. Use year instead",Vd),oe.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ua);var pe=oe,qe={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},re={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},se="Invalid date",te="%d",ue=/\d{1,2}/,ve={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},we=A.prototype;we._calendar=qe,we.calendar=sc,we._longDateFormat=re,we.longDateFormat=tc,we._invalidDate=se,we.invalidDate=uc,we._ordinal=te,we.ordinal=vc,we._ordinalParse=ue,we.preparse=wc,we.postformat=wc,we._relativeTime=ve,we.relativeTime=xc,we.pastFuture=yc,we.set=y,we.months=ca,we._months=Ld,we.monthsShort=da,we._monthsShort=Md,we.monthsParse=ea,we._monthsRegex=Od,we.monthsRegex=ja,we._monthsShortRegex=Nd,we.monthsShortRegex=ia,we.week=Wb,we._week=de,we.firstDayOfYear=Yb,we.firstDayOfWeek=Xb,we.weekdays=ac,we._weekdays=fe,we.weekdaysMin=cc,we._weekdaysMin=he,we.weekdaysShort=bc,we._weekdaysShort=ge,we.weekdaysParse=dc,we.isPM=lc,we._meridiemParse=ie,we.meridiem=mc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var xe=Math.abs,ye=Qc("ms"),ze=Qc("s"),Ae=Qc("m"),Be=Qc("h"),Ce=Qc("d"),De=Qc("w"),Ee=Qc("M"),Fe=Qc("y"),Ge=Sc("milliseconds"),He=Sc("seconds"),Ie=Sc("minutes"),Je=Sc("hours"),Ke=Sc("days"),Le=Sc("months"),Me=Sc("years"),Ne=Math.round,Oe={s:45,m:45,h:22,d:26,M:11},Pe=Math.abs,Qe=Na.prototype;Qe.abs=Gc,Qe.add=Ic,Qe.subtract=Jc,Qe.as=Oc,Qe.asMilliseconds=ye,Qe.asSeconds=ze,Qe.asMinutes=Ae,Qe.asHours=Be,Qe.asDays=Ce,Qe.asWeeks=De,Qe.asMonths=Ee,Qe.asYears=Fe,Qe.valueOf=Pc,Qe._bubble=Lc,Qe.get=Rc,Qe.milliseconds=Ge,Qe.seconds=He,Qe.minutes=Ie,Qe.hours=Je,Qe.days=Ke,Qe.weeks=Tc,Qe.months=Le,Qe.years=Me,Qe.humanize=Xc,Qe.toISOString=Yc,Qe.toString=Yc,Qe.toJSON=Yc,Qe.locale=Ab,Qe.localeData=Bb,Qe.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Yc),Qe.lang=ce,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",ud),W("X",xd),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.12.0",b(Ja),a.fn=pe,a.min=La,a.max=Ma,a.now=Yd,a.utc=h,a.unix=qc,a.months=Bc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=cb,a.isMoment=p,a.weekdays=Dc,a.parseZone=rc,a.localeData=H,a.isDuration=Oa,a.monthsShort=Cc,a.weekdaysMin=Fc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Ec,a.normalizeUnits=K,a.relativeTimeThreshold=Wc,a.prototype=pe;var Re=a;return Re});
"use strict";

(function ($) {
	/**
  * Extends base jquery functionality
  */
	$.extend($.fn,
	/** @lends jQuery */
	{

		/**
   * Puts current set instead of "what"
   * @param what
   */
		replaceElement: function replaceElement(what) {
			$(what).replaceWith(this);
			return this;
		},

		/**
            * Reload this image
   */
		reloadImage: function reloadImage() {
			if (this.is("img")) {
				var url = this.attr("src"),
				    hashPos = url.indexOf("#");
				if (hashPos > -1) url = url.substr(0, hashPos);
				this.attr("src", url + "#rand= " + Math.random());
			}
			return this;
		},

		/**
   * Removes old content and append this
   * @param what
   */
		setAsContentOf: function setAsContentOf(what) {
			$(what).html('').append(this);
			return this;
		},

		/**
   * Enables element
   */
		enable: function enable() {
			this.removeClass("disabled").prop("disabled", false).css("opacity", 1).css("filter", "");
			return this;
		},

		/**
   * Disables controls, if param true then return true if already disabled
   * @param {boolean} [check] If we should check before disable
   */
		disable: function disable(check) {

			/* If objetc already disabled */
			if (check && this.isDisabled()) return false;

			/* Disable form elements */
			this.filter(":input").prop("disabled", "disabled");

			/* Add classes */
			this.addClass("disabled");

			/* Add opacity */
			this.not("form").not(".button").not("label").css("opacity", 0.3).css("filter", "blur(10px)");

			/* Return true if check */
			return check ? true : this;
		},

		/**
   * Checks first of matched elements if control disabled
   */
		isDisabled: function isDisabled() {
			return this.hasClass("disabled") || this.prop("disabled") === true;
		},

		/**
   * Convert form inputs to object
   */
		readForm: function readForm() {

			/* Read object */
			var read = this.serializeArray(),
			    readed = {},
			    parse = function parse(input) {

				/* If array */
				if (input.name.match(/\[\]$/)) {

					/* Remove brackets */
					input.name = input.name.substr(0, input.name.length - 2);

					/* Make array if none */
					if (!readed[input.name]) readed[input.name] = [];

					/* Add value */
					readed[input.name].push(input.value);

					/* If single */
				} else readed[input.name] = input.value;
			};

			/* Compile */
			$.each(read, function (_, input) {
				parse(input);
			});

			/* Parse json data */
			$('script[type="application/json"]').each(function () {

				/* Init */
				var self = $(this),
				    name = self.attr("input-name");

				/* If no name */
				if (!name) return;

				parse({ name: name, value: JSON.parse(self.html()) });
			});

			return readed;
		},

		/**
   * Formats elements on form or same
   */
		formatForm: function formatForm() {

			var maxWidth = 0;
			var items = $();

			/* Get span with names */
			$("span.name:not(.notFormatForm)", this).filter(":visible").width('auto').each(function () {

				var item = $(this);

				if (item.closest(".notFormatForm, .small").length) return;

				if (item.width() > maxWidth) maxWidth = $(this).width();

				items = items.add(item);
			});

			items.css('width', maxWidth + 1);

			/* Get inputs */
			/* removed: input.date, input.datetime, input.datehour,  */
			//$("input:radio, input[type=file]", this).filter(":visible").each(function() {
			//	var self = $(this);
			//	if(self.outerHeight() < self.parent().innerHeight()) {
			//		var margin = Math.floor((self.parent().innerHeight() - self.outerHeight()) / 2);
			//		self.css("margin-top", margin);
			//	}
			//});

			/* To resize modal windows */
			$(window).trigger("resize");

			/* Return objects */
			return this;
		},

		/**
   * Convert form inputs to object
   */
		readFormAlternative: function readFormAlternative() {

			/* Read object */
			var readed = this.serializeObject();

			/* Parse json data */
			$('script[type="application/json"]').each(function () {

				/* Init */
				var self = $(this),
				    name = self.attr("input-name");

				/* If no name */
				if (!name) return;

				parse({ name: name, value: JSON.parse(self.html()) });
			});

			return readed;
		}

	});
})(jQuery);

Function.prototype.proxy = function (context) {
	var self = this;
	return function () {
		self.apply(context, arguments);
	};
};

/* Twig extensions */
Twig.extendFilter("selected", function (value) {
	return value ? 'selected="selected"' : "";
});

/* Twig extensions */
Twig.extendFilter("checked", function (value) {
	return value ? 'checked="checked"' : "";
});

/* Twig extensions */
Twig.extendFilter("addClass", function (value, options) {
	return value ? 'class="' + options + '"' : "";
});

/* Twig extensions */
Twig.extendFilter("else", function (value, options) {
	return value ? value : options[0];
});

/* Twig extensions */
Twig.extendFilter("onTrue", function (value, options) {
	return value ? options[0] : '';
});

/* Twig extensions */
Twig.extendFilter("richText", function (value) {
	if (value) {
		value = value.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
		value = value.replace(/\[b\](.*)\[\/b\]/g, '<b>$1</b>');
		value = value.replace(/\[i\](.*)\[\/i\]/g, '<i>$1</i>');
		value = value.replace(/\n/g, "<br/>");
	}
	return value;
});

/* Nl2br filter */
Twig.extendFilter("nl2br", function (value) {
	if (!value) console.log(value);
	return value ? value.replace(/\n/g, "<br/>") : "";
});

/* Special JSON filter */
Twig.extendFilter("json", function (value, inputName) {
	return sky.jsonData(value, inputName);
});

/* Special JSON filter */
Twig.extendFilter("json_pure", function (value, inputName) {
	return sky.encode(JSON.stringify(value, null, 4));
});

/* Special JSON filter */
Twig.extendFilter("anyIn", function (value, fields) {
	var found = false;
	$.each(value, function (_, val) {
		if ($.inArray(val, fields[0]) > -1) {
			found = true;
			return false;
		}
	});
	return found;
});

/* Special JSON filter */
Twig.extendFilter("countIn", function (value, fields) {
	var count = 0;
	$.each(value, function (_, val) {
		if ($.inArray(val, fields[0]) > -1) count++;
	});
	return count;
});

/* Special truncate filter */
Twig.extendFilter("truncate", function (value, max) {
	if (value.length > max) value = value.substr(0, max) + "…";
	return value;
});

/* Special truncate filter */
Twig.extendFilter("subRender", function (name, options) {
	return $("<div/>").append(sky.templates.render(name, options[0])).html();
});

/* Special string filter */
Twig.extendFilter("isString", function (name) {
	return typeof name == "string";
});

/* Moment filter */
Twig.extendFilter("moment", function (time, format) {
	return moment(time);
});

/* Special truncate filter */
Twig.extendFilter("subRenderModel", function (name, options) {
	return $("<div/>").append(sky.templates.renderModel(name, options[0])).html();
});

/* Special truncate filter */
Twig.extendFilter("dataToModel", function (data, options) {
	return sky.model.fromData(options[0], data);
});

/* Special truncate filter */
Twig.extendFilter("pretty_phone", function (data, options) {
	var parts = data.match(/(\d)(\d{3})(\d{3})(\d+)/);
	return "" + parts[1] + " (" + parts[2] + ") " + parts[3] + "-" + parts[4];
});

/* Expose the internal Twig object for extension */
Twig.extend(function (Twig) {

	/* Exceptions remake */
	Twig.log.error = function (text) {
		throw new sky.exceptions.system.Error(text);
	};

	/* Special import tag */
	Twig.exports.extendTag({

		/* Unique name for tag type */
		type: "skyImport",

		/* Regex match for tag (flag white-space anything) */
		regex: /^skyImport\s+(.+)\s+as(.+)$/,

		/* This is a standalone tag and doesn't require a following tag */
		next: [],
		open: true,

		/* Runs on matched tokens when the template is loaded. (once per template) */
		compile: function compile(token) {

			var expression = token.match[1].trim(),
			    contextName = token.match[2].trim();

			delete token.match;

			token.expression = expression;
			token.contextName = contextName;

			console.log("compile");

			return token;
		},
		parse: function parse(token, context, chain) {

			var template = sky.service("templates").load(token.expression),
			    compiled = new Twig.Template({ data: template });

			compiled.options = {};
			context[token.contextName] = compiled.render({ globals: sky.service("templates").globals }, { output: 'macros' });

			return {
				chain: false,
				output: ''
			};
		}
	});
});

/**
 * Changes tab
 * @param tabs
 * @param _
 * @param tabName
 */

page.changeTab = function (tabs, _, tabName) {

	/* Saved by default */
	if (!tabName) tabName = tabs.find(".active").attr("data-tab");else {
		$("h1 > .tabs [data-tab=" + tabName + "]").trigger("click");
		return;
	}

	/* Hide other tab bodies and show current */
	$(".tabData").addClass("hidden").filter("[tab=" + tabName + "]").removeClass("hidden");

	/* Save */
	page.currentLoader = page[tabName + "Loader"];

	/* redraw pagination */
	if (page.currentLoader.pagination) page.currentLoader.pagination.redraw();

	/* If we should get current hash and use it for loading current tab */
	if (page.first) {
		page.currentLoader.reload({ fromHash: true });
		page.first = false;

		/* If we should replace hash with current tab data */
	} else {

		/* Set tab */
		page.history.set({ tab: tabName }, true);

		/* Write hash data and reload if not loaded already */
		if (!page.currentLoader.writeHash().lastRequestData) page.currentLoader.reload({});
	}
};

page.changeOrder = function (button, _, order) {
	var desc = button.hasClass("desc");
	button.closest("tr").find("a").removeClass("asc desc");
	if (desc) {
		button.removeClass("desc").addClass("asc");
		page.history.set({ order_asc: order, order_desc: null });
	} else {
		button.removeClass("asc").addClass("desc");
		page.history.set({ order_desc: order, order_asc: null });
	}

	page.currentLoader.reload();
};

/**
 * Generates chart, replace base settings with specified
 * @param {object} settings Chart settings
 */
page.makeChart = function (settings) {

	var options = {
		chart: {
			renderTo: settings.holderId,
			zoomType: 'x',
			spacingRight: 20,
			defaultSeriesType: settings.type ? settings.type : "area"
		},
		title: {
			text: "",
			style: { color: '#333' }
		},
		subtitle: {
			text: 'Для увеличения графика выделите прямоугольную область',
			style: { color: '#888' }
		},
		xAxis: {
			type: 'linear',
			//title		: null,
			categories: false
		},
		yAxis: {
			title: { text: null, style: { color: '#888' } },
			min: 0
			//startOnTick		: false,
			//showFirstLabel	: false
		},
		tooltip: {
			shared: true,
			formatter: settings.formatter ? settings.formatter : false
		},
		legend: {
			enabled: settings.legend ? settings.legend : false
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: [0, 0, 0, 300],
					stops: [[0, "#DF662E"], [1, 'rgba(255,205,41,0)']]
				},
				lineWidth: 1,
				marker: {
					enabled: false,
					states: {
						hover: { enabled: true, radius: 5 }
					}
				},
				shadow: false,
				states: {
					hover: { lineWidth: 1 }
				}
			}
		},
		colors: ["#FF9900", "#C40000", "#666666", "#0094ff", "#00b01b", "#a500ff"],
		series: [],
		credits: {
			enabled: false
		}
	};

	/* Prepares title */
	if (settings.title) {
		if (typeof settings.title == "string") options.title.text = settings.title;else $.extend(true, options.title, settings.title);
	}

	/* Prepares subtitle */
	if (settings.subtitle) {
		if (typeof settings.subtitle == "string") options.subtitle.text = settings.subtitle;else $.extend(true, options.subtitle, settings.subtitle);
	}

	/* Prepares xAxis */
	if (settings.xAxis) {
		if (typeof settings.xAxis == "string") options.xAxis.title = settings.xAxis;else $.extend(true, options.xAxis, settings.xAxis);
	}

	/* Prepares yAxis */
	if (settings.yAxis) {
		if (typeof settings.yAxis == "string") options.yAxis.title.text = settings.yAxis;else options.yAxis = settings.yAxis;
	}

	/* Prepares tooltip */
	if (settings.tooltip) {
		if (typeof settings.tooltip == "function") options.tooltip.formatter = settings.tooltip;else $.extend(true, options.tooltip, settings.tooltip);
	}

	/* Prepares legend */
	if (settings.legend) {
		if (typeof settings.legend == "boolean") options.legend.enabled = settings.legend;else $.extend(true, options.legend, settings.legend);
	}

	/* Prepares legend */
	if (settings.plotOptions) $.extend(true, options.plotOptions, settings.plotOptions);

	/* Prepares chart */
	if (settings.chart) $.extend(true, options.chart, settings.chart);

	/* Prepares colors */
	if (settings.colors) {
		if (typeof settings.colors == "string") options.colors = [settings.colors];else options.colors = settings.colors;
	}

	/* Prepares series */
	if (settings.series) {
		if (!(settings.series instanceof Array)) settings.series = [settings.series];
		options.series = settings.series;
	}

	/* Create chart */
	var chart = new Highcharts.Chart(options);

	/* To move all */
	$(window).trigger("resize");

	return chart;
};

/**
 * Add special function
 * @param {string} pointStart String to be converted to start point
 */
page.makeChart.startPoint = function (dateString) {

	var date = new Date();

	/* If input has datetime format value */
	if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{1,2}:\d{1,2}$/)) date = moment(dateString, "YYYY-MM-DD HH:mm");

	/* Id input has date format value */
	if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) date = moment(dateString, "YYYY-MM-DD");

	/* Id input has date format value */
	if (dateString.match(/^\d{2}.\d{2}.\d{4}$/)) date = moment(dateString, "DD.MM.YYYY");

	/* Id input has date format value */
	if (dateString.match(/^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/)) date = moment(dateString, "DD.MM.YYYY HH:mm");

	return parseInt(date.add(3, "hours").format("x"));
};
"use strict";

Function.prototype.safe = function () {
	var services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	return sky.func(this, services);
};
Function.prototype.exec = function () {
	return sky.exec(this);
};

/**
 * Main module
 */
$.extend(sky, {

	/**
  * Return function with try catch wrapper
  * @param {function} func Function
  * @param {boolean|Array} [services] If true arguments would be filled with services
  * @param {*} context Context
  * @returns {Function}
  */
	func: function func(_func) {
		var services = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		return function () {
			try {
				return services ? sky.services.callWithServices(_func, context || this, services) : _func.apply(context || this, arguments);
			} catch (e) {
				return sky.exceptionHandler(e);
			}
		};
	},

	/**
  * Main system exception handler function
  * @param e
  */
	exceptionHandler: function exceptionHandler(e) {

		/* Log error */
		if (console && console.error) console.error(e.message, e);

		/* User fault error */
		if (sky.exceptions && e instanceof sky.exceptions.Exception) return e.handle();

		/* Show error */
		alert("Во время работы произошла ошибка, пожалуйста сообщите администрации");
	}

});
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
	var Exception = function (_Error) {
		_inherits(Exception, _Error);

		function Exception() {
			_classCallCheck(this, Exception);

			return _possibleConstructorReturn(this, (Exception.__proto__ || Object.getPrototypeOf(Exception)).apply(this, arguments));
		}

		_createClass(Exception, [{
			key: "handle",
			value: function handle() {
				alert("Error | " + this.message);
			}
		}]);

		return Exception;
	}(Error);
	sky.exceptions = {
		Exception: Exception,
		user: {
			Error: function (_Exception) {
				_inherits(Error, _Exception);

				function Error() {
					_classCallCheck(this, Error);

					return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
				}

				return Error;
			}(Exception)
		},
		system: {
			Error: function (_Exception2) {
				_inherits(Error, _Exception2);

				function Error() {
					_classCallCheck(this, Error);

					return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
				}

				return Error;
			}(Exception)
		}
	};
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Library main part to work with services
 */
(function () {

	/**
  * Services list
  */
	var base = function base(service, name) {
		var _this = this;

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
   * @param {Array} [dependencies]
   */
		this.init = function (func, dependencies) {
			if (typeof func === "function") _this.initialise.done(sky.func(func, dependencies, _this));else _this.initialise.resolve();
			return _this;
		};
	};
	var list = { exceptions: new base(sky.exceptions) };

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
		functionServices: function functionServices(func) {

			/* Get arguments list */
			var str = func.toString(),
			    start = str.indexOf('({');

			/* Check if first is services list */
			if (start < 0 || start > str.indexOf('(')) return Object.keys(list);

			/* Get services */
			var names = str.slice(str.indexOf('({') + 2, str.indexOf('}')).match(/[^\s,]+/g);

			/* Return */
			return names ? names : [];
		},

		/**
   * Calls function with services as params
   * @param func Function to call
   * @param {*} [context] Context to call
   * @param {Array} services Services list
   */
		callWithServices: function callWithServices(func, context, services) {

			/* Get services */
			var servicesList = {};

			/* Get from params if none */
			services = services && services instanceof Array ? services : this.functionServices(func);

			/* Go through */
			services.map(function (name) {
				servicesList[name] = sky.services.get(name);
			});

			/* Return */
			return func.call(context || window, servicesList);
		},

		/**
   * Return service and init it if none
   * @param {string} name Service name
   * @returns {{add: add}}
   */
		get: function get(name) {

			/* If no such thing */
			if (!list[name]) throw new sky.exceptions.system.Error("Can't load service '" + name + "'");

			/* Return */
			return list[name].init().service;
		},

		/**
   * Adds new services
   * @param {string} name
   * @param {*} [service]
   * @param {Array} dependencies
   */
		add: function add(name) {
			var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var dependencies = arguments[2];


			/* Change order */
			if (service instanceof Array && dependencies) {
				var tmp = dependencies;
				dependencies = service;
				service = tmp;
			}

			/* Check */
			if ((typeof service === 'undefined' ? 'undefined' : _typeof(service)) !== "object" && typeof service !== "function") throw new sky.exceptions.system.Error("Service " + name + " have wrong type");

			/* Create base service */
			list[name] = new base((typeof service === 'undefined' ? 'undefined' : _typeof(service)) === "object" ? service : {}, name);

			/* If services declared with function for local scope and etc */
			if (typeof service === "function") list[name].init(service, dependencies);

			return list[name];
		}

	};
})();
"use strict";

sky.func(function () {
	sky.libraryDeferred.resolve();
})();
//# sourceMappingURL=library.js.map
