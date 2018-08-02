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

window.global = window;
!function (e, t) {
	"object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Twig = t() : e.Twig = t();
}(window, function () {
	return function (e) {
		var t = {};function r(n) {
			if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
		}return r.m = e, r.c = t, r.d = function (e, t, n) {
			r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
		}, r.r = function (e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
		}, r.t = function (e, t) {
			if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var n = Object.create(null);if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {
				r.d(n, o, function (t) {
					return e[t];
				}.bind(null, o));
			}return n;
		}, r.n = function (e) {
			var t = e && e.__esModule ? function () {
				return e.default;
			} : function () {
				return e;
			};return r.d(t, "a", t), t;
		}, r.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}, r.p = "", r(r.s = 28);
	}([function (e, t, r) {
		(function (e) {
			function r(e, t) {
				for (var r = 0, n = e.length - 1; n >= 0; n--) {
					var o = e[n];"." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--);
				}if (t) for (; r--; r) {
					e.unshift("..");
				}return e;
			}var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
			    o = function o(e) {
				return n.exec(e).slice(1);
			};function i(e, t) {
				if (e.filter) return e.filter(t);for (var r = [], n = 0; n < e.length; n++) {
					t(e[n], n, e) && r.push(e[n]);
				}return r;
			}t.resolve = function () {
				for (var t = "", n = !1, o = arguments.length - 1; o >= -1 && !n; o--) {
					var s = o >= 0 ? arguments[o] : e.cwd();if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");s && (t = s + "/" + t, n = "/" === s.charAt(0));
				}return t = r(i(t.split("/"), function (e) {
					return !!e;
				}), !n).join("/"), (n ? "/" : "") + t || ".";
			}, t.normalize = function (e) {
				var n = t.isAbsolute(e),
				    o = "/" === s(e, -1);return (e = r(i(e.split("/"), function (e) {
					return !!e;
				}), !n).join("/")) || n || (e = "."), e && o && (e += "/"), (n ? "/" : "") + e;
			}, t.isAbsolute = function (e) {
				return "/" === e.charAt(0);
			}, t.join = function () {
				var e = Array.prototype.slice.call(arguments, 0);return t.normalize(i(e, function (e, t) {
					if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");return e;
				}).join("/"));
			}, t.relative = function (e, r) {
				function n(e) {
					for (var t = 0; t < e.length && "" === e[t]; t++) {}for (var r = e.length - 1; r >= 0 && "" === e[r]; r--) {}return t > r ? [] : e.slice(t, r - t + 1);
				}e = t.resolve(e).substr(1), r = t.resolve(r).substr(1);for (var o = n(e.split("/")), i = n(r.split("/")), s = Math.min(o.length, i.length), a = s, p = 0; p < s; p++) {
					if (o[p] !== i[p]) {
						a = p;break;
					}
				}var c = [];for (p = a; p < o.length; p++) {
					c.push("..");
				}return (c = c.concat(i.slice(a))).join("/");
			}, t.sep = "/", t.delimiter = ":", t.dirname = function (e) {
				var t = o(e),
				    r = t[0],
				    n = t[1];return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : ".";
			}, t.basename = function (e, t) {
				var r = o(e)[2];return t && r.substr(-1 * t.length) === t && (r = r.substr(0, r.length - t.length)), r;
			}, t.extname = function (e) {
				return o(e)[3];
			};var s = "b" === "ab".substr(-1) ? function (e, t, r) {
				return e.substr(t, r);
			} : function (e, t, r) {
				return t < 0 && (t = e.length + t), e.substr(t, r);
			};
		}).call(this, r(9));
	}, function (e, t, r) {
		"use strict";
		e.exports = function () {
			var e = arguments,
			    t = 0,
			    r = function r(e, t, _r, n) {
				_r || (_r = " ");var o = e.length >= t ? "" : new Array(1 + t - e.length >>> 0).join(_r);return n ? e + o : o + e;
			},
			    n = function n(e, t, _n, o, i, s) {
				var a = o - e.length;return a > 0 && (e = _n || !i ? r(e, o, s, _n) : [e.slice(0, t.length), r("", a, "0", !0), e.slice(t.length)].join("")), e;
			},
			    o = function o(e, t, _o, i, s, a, p) {
				var c = e >>> 0;return e = (_o = _o && c && { 2: "0b", 8: "0", 16: "0x" }[t] || "") + r(c.toString(t), a || 0, "0", !1), n(e, _o, i, s, p);
			},
			    i = function i(e, t, r, o, _i, s) {
				return null !== o && void 0 !== o && (e = e.slice(0, o)), n(e, "", t, r, _i, s);
			};return e[t++].replace(/%%|%(\d+\$)?([-+'#0 ]*)(\*\d+\$|\*|\d+)?(?:\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g, function (s, a, p, c, l, u) {
				var f, h, y, d, g;if ("%%" === s) return "%";var m,
				    x = !1,
				    v = "",
				    b = !1,
				    w = !1,
				    k = " ",
				    _ = p.length;for (m = 0; m < _; m++) {
					switch (p.charAt(m)) {case " ":
							v = " ";break;case "+":
							v = "+";break;case "-":
							x = !0;break;case "'":
							k = p.charAt(m + 1);break;case "0":
							b = !0, k = "0";break;case "#":
							w = !0;}
				}if ((c = c ? "*" === c ? +e[t++] : "*" === c.charAt(0) ? +e[c.slice(1, -1)] : +c : 0) < 0 && (c = -c, x = !0), !isFinite(c)) throw new Error("sprintf: (minimum-)width must be finite");switch (l = l ? "*" === l ? +e[t++] : "*" === l.charAt(0) ? +e[l.slice(1, -1)] : +l : "fFeE".indexOf(u) > -1 ? 6 : "d" === u ? 0 : void 0, g = a ? e[a.slice(0, -1)] : e[t++], u) {case "s":
						return i(g + "", x, c, l, b, k);case "c":
						return i(String.fromCharCode(+g), x, c, l, b);case "b":
						return o(g, 2, w, x, c, l, b);case "o":
						return o(g, 8, w, x, c, l, b);case "x":
						return o(g, 16, w, x, c, l, b);case "X":
						return o(g, 16, w, x, c, l, b).toUpperCase();case "u":
						return o(g, 10, w, x, c, l, b);case "i":case "d":
						return f = +g || 0, g = (h = (f = Math.round(f - f % 1)) < 0 ? "-" : v) + r(String(Math.abs(f)), l, "0", !1), n(g, h, x, c, b);case "e":case "E":case "f":case "F":case "g":case "G":
						return h = (f = +g) < 0 ? "-" : v, y = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(u.toLowerCase())], d = ["toString", "toUpperCase"]["eEfFgG".indexOf(u) % 2], g = h + Math.abs(f)[y](l), n(g, h, x, c, b)[d]();default:
						return s;}
			});
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			return e.exports = { VERSION: e.VERSION }, e.exports.twig = function (t) {
				var r = t.id,
				    n = { strict_variables: t.strict_variables || !1, autoescape: null != t.autoescape && t.autoescape || !1, allowInlineIncludes: t.allowInlineIncludes || !1, rethrow: t.rethrow || !1, namespaces: t.namespaces };if (e.cache && r && e.validateId(r), void 0 !== t.debug && (e.debug = t.debug), void 0 !== t.trace && (e.trace = t.trace), void 0 !== t.data) return e.Templates.parsers.twig({ data: t.data, path: t.hasOwnProperty("path") ? t.path : void 0, module: t.module, id: r, options: n });if (void 0 !== t.ref) {
					if (void 0 !== t.id) throw new e.Error("Both ref and id cannot be set on a twig.js template.");return e.Templates.load(t.ref);
				}if (void 0 !== t.method) {
					if (!e.Templates.isRegisteredLoader(t.method)) throw new e.Error('Loader for "' + t.method + '" is not defined.');return e.Templates.loadRemote(t.name || t.href || t.path || r || void 0, { id: r, method: t.method, parser: t.parser || "twig", base: t.base, module: t.module, precompiled: t.precompiled, async: t.async, options: n }, t.load, t.error);
				}return void 0 !== t.href ? e.Templates.loadRemote(t.href, { id: r, method: "ajax", parser: t.parser || "twig", base: t.base, module: t.module, precompiled: t.precompiled, async: t.async, options: n }, t.load, t.error) : void 0 !== t.path ? e.Templates.loadRemote(t.path, { id: r, method: "fs", parser: t.parser || "twig", base: t.base, module: t.module, precompiled: t.precompiled, async: t.async, options: n }, t.load, t.error) : void 0;
			}, e.exports.extendFilter = function (t, r) {
				e.filter.extend(t, r);
			}, e.exports.extendFunction = function (t, r) {
				e._function.extend(t, r);
			}, e.exports.extendTest = function (t, r) {
				e.test.extend(t, r);
			}, e.exports.extendTag = function (t) {
				e.logic.extend(t);
			}, e.exports.extend = function (t) {
				t(e);
			}, e.exports.compile = function (t, r) {
				var n,
				    o = r.filename,
				    i = r.filename;return n = new e.Template({ data: t, path: i, id: o, options: r.settings["twig options"] }), function (e) {
					return n.render(e);
				};
			}, e.exports.renderFile = function (t, r, n) {
				"function" == typeof r && (n = r, r = {});var o = (r = r || {}).settings || {},
				    i = o["twig options"],
				    s = { path: t, base: o.views, load: function load(e) {
						i && i.allow_async ? e.renderAsync(r).then(function (e) {
							n(null, e);
						}, n) : n(null, "" + e.render(r));
					} };if (i) for (var a in i) {
					i.hasOwnProperty(a) && (s[a] = i[a]);
				}e.exports.twig(s);
			}, e.exports.__express = e.exports.renderFile, e.exports.cache = function (t) {
				e.cache = t;
			}, e.exports.path = e.path, e.exports.filters = e.filters, e.exports.Promise = e.Promise, e;
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			var t = 1;return e.parseAsync = function (t, r) {
				return e.parse.call(this, t, r, !0);
			}, e.expression.parseAsync = function (t, r, n) {
				return e.expression.parse.call(this, t, r, n, !0);
			}, e.logic.parseAsync = function (t, r, n) {
				return e.logic.parse.call(this, t, r, n, !0);
			}, e.Template.prototype.renderAsync = function (e, t) {
				return this.render(e, t, !0);
			}, e.async = {}, e.isPromise = function (e) {
				return e && e.then && "function" == typeof e.then;
			}, e.async.potentiallyAsync = function (t, r, n) {
				return r ? e.Promise.resolve(n.call(t)) : function (t, r, n) {
					var o = n.call(t),
					    i = null,
					    s = !0;if (!e.isPromise(o)) return o;if (o.then(function (e) {
						o = e, s = !1;
					}).catch(function (e) {
						i = e;
					}), null !== i) throw i;if (s) throw new e.Error("You are using Twig.js in sync mode in combination with async extensions.");return o;
				}(t, 0, n);
			}, e.Thenable = function (e, t, r) {
				this.then = e, this._value = r ? t : null, this._state = r || 0;
			}, e.Thenable.prototype.catch = function (e) {
				return this._state == t ? this : this.then(null, e);
			}, e.Thenable.resolvedThen = function (t) {
				try {
					return e.Promise.resolve(t(this._value));
				} catch (t) {
					return e.Promise.reject(t);
				}
			}, e.Thenable.rejectedThen = function (t, r) {
				if (!r || "function" != typeof r) return this;var n = this._value,
				    o = e.attempt(function () {
					return r(n);
				}, e.Promise.reject);return e.Promise.resolve(o);
			}, e.Promise = function (r) {
				var n = 0,
				    o = null,
				    i = function i(e, t) {
					n = e, o = t;
				};return function (e, t, r) {
					try {
						e(t, r);
					} catch (e) {
						r(e);
					}
				}(r, function (e) {
					i(t, e);
				}, function (e) {
					i(2, e);
				}), n === t ? e.Promise.resolve(o) : 2 === n ? e.Promise.reject(o) : (i = e.FullPromise()).promise;
			}, e.FullPromise = function () {
				var r = null;function n(e) {
					e(a._value);
				}function o(e, t) {
					t(a._value);
				}var i = function i(e, t) {
					r = function (e, t, r) {
						var n = [t, r, -2];return e ? -2 == e[2] ? e = [e, n] : e.push(n) : e = n, e;
					}(r, e, t);
				};function s(s, p) {
					a._state || (a._value = p, a._state = s, i = s == t ? n : o, r && (-2 === r[2] && (i(r[0], r[1]), r = null), e.forEach(r, function (e) {
						i(e[0], e[1]);
					}), r = null));
				}var a = new e.Thenable(function (r, n) {
					var o = "function" == typeof r;if (a._state == t && !o) return e.Promise.resolve(a._value);if (a._state === t) return e.attempt(function () {
						return e.Promise.resolve(r(a._value));
					}, e.Promise.reject);var s = "function" == typeof n;return e.Promise(function (t, a) {
						i(o ? function (n) {
							e.attempt(function () {
								t(r(n));
							}, a);
						} : t, s ? function (r) {
							e.attempt(function () {
								t(n(r));
							}, a);
						} : a);
					});
				});return s.promise = a, s;
			}, e.Promise.defaultResolved = new e.Thenable(e.Thenable.resolvedThen, void 0, t), e.Promise.emptyStringResolved = new e.Thenable(e.Thenable.resolvedThen, "", t), e.Promise.resolve = function (r) {
				return arguments.length < 1 || void 0 === r ? e.Promise.defaultResolved : e.isPromise(r) ? r : "" === r ? e.Promise.emptyStringResolved : new e.Thenable(e.Thenable.resolvedThen, r, t);
			}, e.Promise.reject = function (t) {
				return new e.Thenable(e.Thenable.rejectedThen, t, 2);
			}, e.Promise.all = function (r) {
				var n = new Array(r.length);return e.async.forEach(r, function (r, o) {
					if (e.isPromise(r)) {
						if (r._state != t) return r.then(function (e) {
							n[o] = e;
						});n[o] = r._value;
					} else n[o] = r;
				}).then(function () {
					return n;
				});
			}, e.async.forEach = function (r, n) {
				var o = r.length,
				    i = 0;return function s() {
					var a = null;do {
						if (i == o) return e.Promise.resolve();a = n(r[i], i), i++;
					} while (!a || !e.isPromise(a) || a._state == t);return a.then(s);
				}();
			}, e;
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			return e.tests = { empty: function empty(e) {
					if (null === e || void 0 === e) return !0;if ("number" == typeof e) return !1;if (e.length && e.length > 0) return !1;for (var t in e) {
						if (e.hasOwnProperty(t)) return !1;
					}return !0;
				}, odd: function odd(e) {
					return e % 2 == 1;
				}, even: function even(e) {
					return e % 2 == 0;
				}, divisibleby: function divisibleby(e, t) {
					return e % t[0] == 0;
				}, defined: function defined(e) {
					return void 0 !== e;
				}, none: function none(e) {
					return null === e;
				}, null: function _null(e) {
					return this.none(e);
				}, "same as": function sameAs(e, t) {
					return e === t[0];
				}, sameas: function sameas(t, r) {
					return console.warn("`sameas` is deprecated use `same as`"), e.tests["same as"](t, r);
				}, iterable: function iterable(t) {
					return t && (e.lib.is("Array", t) || e.lib.is("Object", t));
				} }, e.test = function (t, r, n) {
				if (!e.tests[t]) throw "Test " + t + " is not defined.";return e.tests[t](r, n);
			}, e.test.extend = function (t, r) {
				e.tests[t] = r;
			}, e;
		};
	}, function (e, t, r) {
		e.exports = function (e) {
			"use strict";
			e.path = {};var t = /.::/,
			    n = /@/;return e.path.parsePath = function (r, o) {
				var i = null,
				    s = r.options.namespaces,
				    a = o || "";if (s && "object" == (typeof s === "undefined" ? "undefined" : _typeof(s))) for (i in s) {
					if (t.test(a)) return a.replace(i + "::", s[i]);if (n.test(a)) return a.replace("@" + i, s[i]);
				}return e.path.relativePath(r, a);
			}, e.path.relativePath = function (t, n) {
				var o,
				    i,
				    s,
				    a = "/",
				    p = [];if (n = n || "", t.url) o = void 0 !== t.base ? t.base + ("/" === t.base.charAt(t.base.length - 1) ? "" : "/") : t.url;else if (t.path) {
					var c = r(0),
					    l = c.sep || a,
					    u = new RegExp("^\\.{1,2}" + l.replace("\\", "\\\\"));n = n.replace(/\//g, l), void 0 !== t.base && null == n.match(u) ? (n = n.replace(t.base, ""), o = t.base + l) : o = c.normalize(t.path), o = o.replace(l + l, l), a = l;
				} else {
					if (!t.name && !t.id || !t.method || "fs" === t.method || "ajax" === t.method) throw new e.Error("Cannot extend an inline template.");o = t.base || t.name || t.id;
				}for ((i = o.split(a)).pop(), i = i.concat(n.split(a)); i.length > 0;) {
					"." == (s = i.shift()) || (".." == s && p.length > 0 && ".." != p[p.length - 1] ? p.pop() : p.push(s));
				}return p.join(a);
			}, e;
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			e.Templates.registerParser("twig", function (t) {
				return new e.Template(t);
			});
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			e.Templates.registerParser("source", function (e) {
				return e.data || "";
			});
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			for (e.logic = {}, e.logic.type = { if_: "Twig.logic.type.if", endif: "Twig.logic.type.endif", for_: "Twig.logic.type.for", endfor: "Twig.logic.type.endfor", else_: "Twig.logic.type.else", elseif: "Twig.logic.type.elseif", set: "Twig.logic.type.set", setcapture: "Twig.logic.type.setcapture", endset: "Twig.logic.type.endset", filter: "Twig.logic.type.filter", endfilter: "Twig.logic.type.endfilter", shortblock: "Twig.logic.type.shortblock", block: "Twig.logic.type.block", endblock: "Twig.logic.type.endblock", extends_: "Twig.logic.type.extends", use: "Twig.logic.type.use", include: "Twig.logic.type.include", spaceless: "Twig.logic.type.spaceless", endspaceless: "Twig.logic.type.endspaceless", macro: "Twig.logic.type.macro", endmacro: "Twig.logic.type.endmacro", import_: "Twig.logic.type.import", from: "Twig.logic.type.from", embed: "Twig.logic.type.embed", endembed: "Twig.logic.type.endembed", with: "Twig.logic.type.with", endwith: "Twig.logic.type.endwith" }, e.logic.definitions = [{ type: e.logic.type.if_, regex: /^if\s+([\s\S]+)$/, next: [e.logic.type.else_, e.logic.type.elseif, e.logic.type.endif], open: !0, compile: function compile(t) {
					var r = t.match[1];return t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, delete t.match, t;
				}, parse: function parse(t, r, n) {
					var o = this;return e.expression.parseAsync.call(this, t.stack, r).then(function (i) {
						return n = !0, e.lib.boolval(i) ? (n = !1, e.parseAsync.call(o, t.output, r)) : "";
					}).then(function (e) {
						return { chain: n, output: e };
					});
				} }, { type: e.logic.type.elseif, regex: /^elseif\s+([^\s].*)$/, next: [e.logic.type.else_, e.logic.type.elseif, e.logic.type.endif], open: !1, compile: function compile(t) {
					var r = t.match[1];return t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, delete t.match, t;
				}, parse: function parse(t, r, n) {
					var o = this;return e.expression.parseAsync.call(this, t.stack, r).then(function (i) {
						return n && e.lib.boolval(i) ? (n = !1, e.parseAsync.call(o, t.output, r)) : "";
					}).then(function (e) {
						return { chain: n, output: e };
					});
				} }, { type: e.logic.type.else_, regex: /^else$/, next: [e.logic.type.endif, e.logic.type.endfor], open: !1, parse: function parse(t, r, n) {
					var o = e.Promise.resolve("");return n && (o = e.parseAsync.call(this, t.output, r)), o.then(function (e) {
						return { chain: n, output: e };
					});
				} }, { type: e.logic.type.endif, regex: /^endif$/, next: [], open: !1 }, { type: e.logic.type.for_, regex: /^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([\S\s]+?)(?:\s+if\s+([^\s].*))?$/, next: [e.logic.type.else_, e.logic.type.endfor], open: !0, compile: function compile(t) {
					var r = t.match[1],
					    n = t.match[2],
					    o = t.match[3],
					    i = null;if (t.key_var = null, t.value_var = null, r.indexOf(",") >= 0) {
						if (2 !== (i = r.split(",")).length) throw new e.Error("Invalid expression in for loop: " + r);t.key_var = i[0].trim(), t.value_var = i[1].trim();
					} else t.value_var = r;return t.expression = e.expression.compile.call(this, { type: e.expression.type.expression, value: n }).stack, o && (t.conditional = e.expression.compile.call(this, { type: e.expression.type.expression, value: o }).stack), delete t.match, t;
				}, parse: function parse(t, r, n) {
					var o,
					    i,
					    s = [],
					    a = 0,
					    p = this,
					    c = t.conditional,
					    l = function l(n, i) {
						var l = e.ChildContext(r);return l[t.value_var] = i, t.key_var && (l[t.key_var] = n), l.loop = function (e, t) {
							var n = void 0 !== c;return { index: a + 1, index0: a, revindex: n ? void 0 : o - a, revindex0: n ? void 0 : o - a - 1, first: 0 === a, last: n ? void 0 : a === o - 1, length: n ? void 0 : o, parent: r };
						}(), (void 0 === c ? e.Promise.resolve(!0) : e.expression.parseAsync.call(p, c, l)).then(function (r) {
							if (r) return e.parseAsync.call(p, t.output, l).then(function (e) {
								s.push(e), a += 1;
							});
						}).then(function () {
							delete l.loop, delete l[t.value_var], delete l[t.key_var], e.merge(r, l, !0);
						});
					};return e.expression.parseAsync.call(this, t.expression, r).then(function (t) {
						return e.lib.isArray(t) ? (o = t.length, e.async.forEach(t, function (e) {
							return l(a, e);
						})) : e.lib.is("Object", t) ? (i = void 0 !== t._keys ? t._keys : Object.keys(t), o = i.length, e.async.forEach(i, function (e) {
							if ("_keys" !== e) return l(e, t[e]);
						})) : void 0;
					}).then(function () {
						return { chain: 0 === s.length, output: e.output.call(p, s) };
					});
				} }, { type: e.logic.type.endfor, regex: /^endfor$/, next: [], open: !1 }, { type: e.logic.type.set, regex: /^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*([\s\S]+)$/, next: [], open: !0, compile: function compile(t) {
					var r = t.match[1].trim(),
					    n = t.match[2],
					    o = e.expression.compile.call(this, { type: e.expression.type.expression, value: n }).stack;return t.key = r, t.expression = o, delete t.match, t;
				}, parse: function parse(t, r, n) {
					var o = t.key;return e.expression.parseAsync.call(this, t.expression, r).then(function (t) {
						return t === r && (t = e.lib.copy(t)), r[o] = t, { chain: n, context: r };
					});
				} }, { type: e.logic.type.setcapture, regex: /^set\s+([a-zA-Z0-9_,\s]+)$/, next: [e.logic.type.endset], open: !0, compile: function compile(e) {
					var t = e.match[1].trim();return e.key = t, delete e.match, e;
				}, parse: function parse(t, r, n) {
					var o = this,
					    i = t.key;return e.parseAsync.call(this, t.output, r).then(function (e) {
						return o.context[i] = e, r[i] = e, { chain: n, context: r };
					});
				} }, { type: e.logic.type.endset, regex: /^endset$/, next: [], open: !1 }, { type: e.logic.type.filter, regex: /^filter\s+(.+)$/, next: [e.logic.type.endfilter], open: !0, compile: function compile(t) {
					var r = "|" + t.match[1].trim();return t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, delete t.match, t;
				}, parse: function parse(t, r, n) {
					var o = this;return e.parseAsync.call(this, t.output, r).then(function (n) {
						var i = [{ type: e.expression.type.string, value: n }].concat(t.stack);return e.expression.parseAsync.call(o, i, r);
					}).then(function (e) {
						return { chain: n, output: e };
					});
				} }, { type: e.logic.type.endfilter, regex: /^endfilter$/, next: [], open: !1 }, { type: e.logic.type.block, regex: /^block\s+([a-zA-Z0-9_]+)$/, next: [e.logic.type.endblock], open: !0, compile: function compile(e) {
					return e.block = e.match[1].trim(), delete e.match, e;
				}, parse: function parse(t, r, n) {
					var o,
					    i = this,
					    s = e.Promise.resolve(),
					    a = e.indexOf(this.importedBlocks, t.block) > -1,
					    p = this.blocks[t.block] && e.indexOf(this.blocks[t.block], e.placeholders.parent) > -1;return e.forEach(this.parseStack, function (r) {
						r.type == e.logic.type.for_ && (t.overwrite = !0);
					}), (void 0 === this.blocks[t.block] || a || p || t.overwrite) && (s = (s = t.expression ? e.expression.parseAsync.call(this, t.output, r).then(function (t) {
						return e.expression.parseAsync.call(i, { type: e.expression.type.string, value: t }, r);
					}) : e.parseAsync.call(this, t.output, r).then(function (t) {
						return e.expression.parseAsync.call(i, { type: e.expression.type.string, value: t }, r);
					})).then(function (r) {
						a && i.importedBlocks.splice(i.importedBlocks.indexOf(t.block), 1), i.blocks[t.block] = p ? e.Markup(i.blocks[t.block].replace(e.placeholders.parent, r)) : r, i.originalBlockTokens[t.block] = { type: t.type, block: t.block, output: t.output, overwrite: !0 };
					})), s.then(function () {
						return o = i.child.blocks[t.block] ? i.child.blocks[t.block] : i.blocks[t.block], { chain: n, output: o };
					});
				} }, { type: e.logic.type.shortblock, regex: /^block\s+([a-zA-Z0-9_]+)\s+(.+)$/, next: [], open: !0, compile: function compile(t) {
					return t.expression = t.match[2].trim(), t.output = e.expression.compile({ type: e.expression.type.expression, value: t.expression }).stack, t.block = t.match[1].trim(), delete t.match, t;
				}, parse: function parse(t, r, n) {
					for (var o = new Array(arguments.length), i = arguments.length; i-- > 0;) {
						o[i] = arguments[i];
					}return e.logic.handler[e.logic.type.block].parse.apply(this, o);
				} }, { type: e.logic.type.endblock, regex: /^endblock(?:\s+([a-zA-Z0-9_]+))?$/, next: [], open: !1 }, { type: e.logic.type.extends_, regex: /^extends\s+(.+)$/, next: [], open: !0, compile: function compile(t) {
					var r = t.match[1].trim();return delete t.match, t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, t;
				}, parse: function parse(t, r, n) {
					var o = this,
					    i = e.ChildContext(r);return e.expression.parseAsync.call(this, t.stack, r).then(function (t) {
						return o.extend = t, (t instanceof e.Template ? t : o.importFile(t)).renderAsync(i);
					}).then(function () {
						return e.lib.extend(r, i), { chain: n, output: "" };
					});
				} }, { type: e.logic.type.use, regex: /^use\s+(.+)$/, next: [], open: !0, compile: function compile(t) {
					var r = t.match[1].trim();return delete t.match, t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, t;
				}, parse: function parse(t, r, n) {
					var o = this;return e.expression.parseAsync.call(this, t.stack, r).then(function (e) {
						return o.importBlocks(e), { chain: n, output: "" };
					});
				} }, { type: e.logic.type.include, regex: /^include\s+(.+?)(?:\s|$)(ignore missing(?:\s|$))?(?:with\s+([\S\s]+?))?(?:\s|$)(only)?$/, next: [], open: !0, compile: function compile(t) {
					var r = t.match,
					    n = r[1].trim(),
					    o = void 0 !== r[2],
					    i = r[3],
					    s = void 0 !== r[4] && r[4].length;return delete t.match, t.only = s, t.ignoreMissing = o, t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: n }).stack, void 0 !== i && (t.withStack = e.expression.compile.call(this, { type: e.expression.type.expression, value: i.trim() }).stack), t;
				}, parse: function parse(t, r, n) {
					var o = t.only ? {} : e.ChildContext(r),
					    i = t.ignoreMissing,
					    s = this,
					    a = { chain: n, output: "" };return (void 0 !== t.withStack ? e.expression.parseAsync.call(this, t.withStack, r).then(function (t) {
						e.lib.extend(o, t);
					}) : e.Promise.resolve()).then(function () {
						return e.expression.parseAsync.call(s, t.stack, r);
					}).then(function (t) {
						if (t instanceof e.Template) return t.renderAsync(o);try {
							return s.importFile(t).renderAsync(o);
						} catch (e) {
							if (i) return "";throw e;
						}
					}).then(function (e) {
						return "" !== e && (a.output = e), a;
					});
				} }, { type: e.logic.type.spaceless, regex: /^spaceless$/, next: [e.logic.type.endspaceless], open: !0, parse: function parse(t, r, n) {
					return e.parseAsync.call(this, t.output, r).then(function (t) {
						var r = t.replace(/>\s+</g, "><").trim();return r = e.Markup(r), { chain: n, output: r };
					});
				} }, { type: e.logic.type.endspaceless, regex: /^endspaceless$/, next: [], open: !1 }, { type: e.logic.type.macro, regex: /^macro\s+([a-zA-Z0-9_]+)\s*\(\s*((?:[a-zA-Z0-9_]+(?:\s*=\s*([\s\S]+))?(?:,\s*)?)*)\s*\)$/, next: [e.logic.type.endmacro], open: !0, compile: function compile(t) {
					var r = t.match[1],
					    n = t.match[2].split(/\s*,\s*/),
					    o = n.map(function (e) {
						return e.split(/\s*=\s*/)[0];
					}),
					    i = o.length;if (i > 1) for (var s = {}, a = 0; a < i; a++) {
						var p = o[a];if (s[p]) throw new e.Error("Duplicate arguments for parameter: " + p);s[p] = 1;
					}return t.macroName = r, t.parameters = o, t.defaults = n.reduce(function (t, r) {
						var n = r.split(/\s*=\s*/),
						    o = n[0],
						    i = n[1];return t[o] = i ? e.expression.compile.call(this, { type: e.expression.type.expression, value: i }).stack : void 0, t;
					}, {}), delete t.match, t;
				}, parse: function parse(t, r, n) {
					var o = this;return this.macros[t.macroName] = function () {
						var n = { _self: o.macros },
						    i = Array.prototype.slice.call(arguments);return e.async.forEach(t.parameters, function (o, s) {
							return void 0 !== i[s] ? (n[o] = i[s], !0) : void 0 !== t.defaults[o] ? e.expression.parseAsync.call(this, t.defaults[o], r).then(function (t) {
								return n[o] = t, e.Promise.resolve();
							}) : (n[o] = void 0, !0);
						}).then(function () {
							return e.parseAsync.call(o, t.output, n);
						});
					}, { chain: n, output: "" };
				} }, { type: e.logic.type.endmacro, regex: /^endmacro$/, next: [], open: !1 }, { type: e.logic.type.import_, regex: /^import\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/, next: [], open: !0, compile: function compile(t) {
					var r = t.match[1].trim(),
					    n = t.match[2].trim();return delete t.match, t.expression = r, t.contextName = n, t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, t;
				}, parse: function parse(t, r, n) {
					var o = this,
					    i = { chain: n, output: "" };return "_self" === t.expression ? (r[t.contextName] = this.macros, e.Promise.resolve(i)) : e.expression.parseAsync.call(this, t.stack, r).then(function (e) {
						return o.importFile(e || t.expression);
					}).then(function (e) {
						return r[t.contextName] = e.renderAsync({}, { output: "macros" }), i;
					});
				} }, { type: e.logic.type.from, regex: /^from\s+(.+)\s+import\s+([a-zA-Z0-9_, ]+)$/, next: [], open: !0, compile: function compile(t) {
					for (var r = t.match[1].trim(), n = t.match[2].trim().split(/\s*,\s*/), o = {}, i = 0; i < n.length; i++) {
						var s = n[i],
						    a = s.match(/^([a-zA-Z0-9_]+)\s+as\s+([a-zA-Z0-9_]+)$/);a ? o[a[1].trim()] = a[2].trim() : s.match(/^([a-zA-Z0-9_]+)$/) && (o[s] = s);
					}return delete t.match, t.expression = r, t.macroNames = o, t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: r }).stack, t;
				}, parse: function parse(t, r, n) {
					var o = this,
					    i = e.Promise.resolve(this.macros);return "_self" !== t.expression && (i = e.expression.parseAsync.call(this, t.stack, r).then(function (e) {
						return o.importFile(e || t.expression);
					}).then(function (e) {
						return e.renderAsync({}, { output: "macros" });
					})), i.then(function (e) {
						for (var o in t.macroNames) {
							e.hasOwnProperty(o) && (r[t.macroNames[o]] = e[o]);
						}return { chain: n, output: "" };
					});
				} }, { type: e.logic.type.embed, regex: /^embed\s+(.+?)(?:\s+(ignore missing))?(?:\s+with\s+([\S\s]+?))?(?:\s+(only))?$/, next: [e.logic.type.endembed], open: !0, compile: function compile(t) {
					var r = t.match,
					    n = r[1].trim(),
					    o = void 0 !== r[2],
					    i = r[3],
					    s = void 0 !== r[4] && r[4].length;return delete t.match, t.only = s, t.ignoreMissing = o, t.stack = e.expression.compile.call(this, { type: e.expression.type.expression, value: n }).stack, void 0 !== i && (t.withStack = e.expression.compile.call(this, { type: e.expression.type.expression, value: i.trim() }).stack), t;
				}, parse: function parse(t, r, n) {
					var o,
					    i,
					    s = {},
					    a = this,
					    p = e.Promise.resolve();if (!t.only) for (o in r) {
						r.hasOwnProperty(o) && (s[o] = r[o]);
					}return void 0 !== t.withStack && (p = e.expression.parseAsync.call(this, t.withStack, r).then(function (e) {
						for (o in e) {
							e.hasOwnProperty(o) && (s[o] = e[o]);
						}
					})), p.then(function () {
						return p = null, e.expression.parseAsync.call(a, t.stack, s);
					}).then(function (r) {
						if (r instanceof e.Template) i = r;else try {
							i = a.importFile(r);
						} catch (e) {
							if (t.ignoreMissing) return "";throw a = null, e;
						}return a._blocks = e.lib.copy(a.blocks), a.blocks = {}, e.parseAsync.call(a, t.output, s).then(function () {
							return i.renderAsync(s, { blocks: a.blocks });
						});
					}).then(function (t) {
						return a.blocks = e.lib.copy(a._blocks), { chain: n, output: t };
					});
				} }, { type: e.logic.type.endembed, regex: /^endembed$/, next: [], open: !1 }, { type: e.logic.type.with, regex: /^(?:with\s+([\S\s]+?))(?:\s|$)(only)?$/, next: [e.logic.type.endwith], open: !0, compile: function compile(t) {
					var r = t.match,
					    n = r[1],
					    o = void 0 !== r[2] && r[2].length;return delete t.match, t.only = o, void 0 !== n && (t.withStack = e.expression.compile.call(this, { type: e.expression.type.expression, value: n.trim() }).stack), t;
				}, parse: function parse(t, r, n) {
					var o,
					    i = {},
					    s = this,
					    a = e.Promise.resolve();return t.only || (i = e.ChildContext(r)), void 0 !== t.withStack && (a = e.expression.parseAsync.call(this, t.withStack, r).then(function (e) {
						for (o in e) {
							e.hasOwnProperty(o) && (i[o] = e[o]);
						}
					})), a.then(function () {
						return e.parseAsync.call(s, t.output, i);
					}).then(function (e) {
						return { chain: n, output: e };
					});
				} }, { type: e.logic.type.endwith, regex: /^endwith$/, next: [], open: !1 }], e.logic.handler = {}, e.logic.extendType = function (t, r) {
				r = r || "Twig.logic.type" + t, e.logic.type[t] = r;
			}, e.logic.extend = function (t) {
				if (!t.type) throw new e.Error("Unable to extend logic definition. No type provided for " + t);e.logic.extendType(t.type), e.logic.handler[t.type] = t;
			}; e.logic.definitions.length > 0;) {
				e.logic.extend(e.logic.definitions.shift());
			}return e.logic.compile = function (t) {
				var r = t.value.trim(),
				    n = e.logic.tokenize.call(this, r),
				    o = e.logic.handler[n.type];return o.compile && (n = o.compile.call(this, n), e.log.trace("Twig.logic.compile: ", "Compiled logic token to ", n)), n;
			}, e.logic.tokenize = function (t) {
				var r = null,
				    n = null,
				    o = null,
				    i = null,
				    s = null,
				    a = null,
				    p = null;for (r in t = t.trim(), e.logic.handler) {
					for (n = e.logic.handler[r].type, i = o = e.logic.handler[r].regex, e.lib.isArray(o) || (i = [o]), s = i.length, a = 0; a < s; a++) {
						if (null !== (p = i[a].exec(t))) return e.log.trace("Twig.logic.tokenize: ", "Matched a ", n, " regular expression of ", p), { type: n, match: p };
					}
				}throw new e.Error("Unable to parse '" + t.trim() + "'");
			}, e.logic.parse = function (t, r, n, o) {
				return e.async.potentiallyAsync(this, o, function () {
					e.log.debug("Twig.logic.parse: ", "Parsing logic token ", t);var o,
					    i = e.logic.handler[t.type],
					    s = this;return i.parse ? (s.parseStack.unshift(t), o = i.parse.call(s, t, r || {}, n), e.isPromise(o) ? o = o.then(function (e) {
						return s.parseStack.shift(), e;
					}) : s.parseStack.shift(), o) : "";
				});
			}, e;
		};
	}, function (e, t) {
		var r,
		    n,
		    o = e.exports = {};function i() {
			throw new Error("setTimeout has not been defined");
		}function s() {
			throw new Error("clearTimeout has not been defined");
		}function a(e) {
			if (r === setTimeout) return setTimeout(e, 0);if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);try {
				return r(e, 0);
			} catch (t) {
				try {
					return r.call(null, e, 0);
				} catch (t) {
					return r.call(this, e, 0);
				}
			}
		}!function () {
			try {
				r = "function" == typeof setTimeout ? setTimeout : i;
			} catch (e) {
				r = i;
			}try {
				n = "function" == typeof clearTimeout ? clearTimeout : s;
			} catch (e) {
				n = s;
			}
		}();var p,
		    c = [],
		    l = !1,
		    u = -1;function f() {
			l && p && (l = !1, p.length ? c = p.concat(c) : u = -1, c.length && h());
		}function h() {
			if (!l) {
				var e = a(f);l = !0;for (var t = c.length; t;) {
					for (p = c, c = []; ++u < t;) {
						p && p[u].run();
					}u = -1, t = c.length;
				}p = null, l = !1, function (e) {
					if (n === clearTimeout) return clearTimeout(e);if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);try {
						n(e);
					} catch (t) {
						try {
							return n.call(null, e);
						} catch (t) {
							return n.call(this, e);
						}
					}
				}(e);
			}
		}function y(e, t) {
			this.fun = e, this.array = t;
		}function d() {}o.nextTick = function (e) {
			var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
				t[r - 1] = arguments[r];
			}c.push(new y(e, t)), 1 !== c.length || l || a(h);
		}, y.prototype.run = function () {
			this.fun.apply(null, this.array);
		}, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = d, o.addListener = d, o.once = d, o.off = d, o.removeListener = d, o.removeAllListeners = d, o.emit = d, o.prependListener = d, o.prependOnceListener = d, o.listeners = function (e) {
			return [];
		}, o.binding = function (e) {
			throw new Error("process.binding is not supported");
		}, o.cwd = function () {
			return "/";
		}, o.chdir = function (e) {
			throw new Error("process.chdir is not supported");
		}, o.umask = function () {
			return 0;
		};
	}, function (e, t) {}, function (e, t, r) {
		e.exports = function (e) {
			"use strict";
			var t, n;try {
				t = r(10), n = r(0);
			} catch (e) {}e.Templates.registerLoader("fs", function (r, o, i, s) {
				var a,
				    p,
				    c = o.precompiled,
				    l = this.parsers[o.parser] || this.parser.twig;if (!t || !n) throw new e.Error('Unsupported platform: Unable to load from file because there is no "fs" or "path" implementation');var u = function u(e, t) {
					e ? "function" == typeof s && s(e) : (!0 === c && (t = JSON.parse(t)), o.data = t, o.path = o.path || r, a = l.call(this, o), "function" == typeof i && i(a));
				};if (o.path = o.path || r, o.async) return t.stat(o.path, function (r, n) {
					!r && n.isFile() ? t.readFile(o.path, "utf8", u) : "function" == typeof s && s(new e.Error("Unable to find template file " + o.path));
				}), !0;try {
					if (!t.statSync(o.path).isFile()) throw new e.Error("Unable to find template file " + o.path);
				} catch (t) {
					throw new e.Error("Unable to find template file " + o.path);
				}return p = t.readFileSync(o.path, "utf8"), u(void 0, p), a;
			});
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			e.Templates.registerLoader("ajax", function (t, r, n, o) {
				var i,
				    s,
				    a = r.precompiled,
				    p = this.parsers[r.parser] || this.parser.twig;if ("undefined" == typeof XMLHttpRequest) throw new e.Error('Unsupported platform: Unable to do ajax requests because there is no "XMLHTTPRequest" implementation');return (s = new XMLHttpRequest()).onreadystatechange = function () {
					var c = null;4 === s.readyState && (200 === s.status || window.cordova && 0 == s.status ? (e.log.debug("Got template ", s.responseText), c = !0 === a ? JSON.parse(s.responseText) : s.responseText, r.url = t, r.data = c, i = p.call(this, r), "function" == typeof n && n(i)) : "function" == typeof o && o(s));
				}, s.open("GET", t, !!r.async), s.send(), !!r.async || i;
			});
		};
	}, function (e, t, r) {
		"use strict";
		e.exports = function (e) {
			return !1 !== e && 0 !== e && 0 !== e && "" !== e && "0" !== e && (!Array.isArray(e) || 0 !== e.length) && null !== e && void 0 !== e;
		};
	}, function (e, t, r) {
		"use strict";
		e.exports = function (e, t) {
			var r,
			    n,
			    o = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			    i = /\\?(.?)/gi,
			    s = function s(e, t) {
				return n[e] ? n[e]() : t;
			},
			    a = function a(e, t) {
				for (e = String(e); e.length < t;) {
					e = "0" + e;
				}return e;
			};return n = { d: function d() {
					return a(n.j(), 2);
				}, D: function D() {
					return n.l().slice(0, 3);
				}, j: function j() {
					return r.getDate();
				}, l: function l() {
					return o[n.w()] + "day";
				}, N: function N() {
					return n.w() || 7;
				}, S: function S() {
					var e = n.j(),
					    t = e % 10;return t <= 3 && 1 === parseInt(e % 100 / 10, 10) && (t = 0), ["st", "nd", "rd"][t - 1] || "th";
				}, w: function w() {
					return r.getDay();
				}, z: function z() {
					var e = new Date(n.Y(), n.n() - 1, n.j()),
					    t = new Date(n.Y(), 0, 1);return Math.round((e - t) / 864e5);
				}, W: function W() {
					var e = new Date(n.Y(), n.n() - 1, n.j() - n.N() + 3),
					    t = new Date(e.getFullYear(), 0, 4);return a(1 + Math.round((e - t) / 864e5 / 7), 2);
				}, F: function F() {
					return o[6 + n.n()];
				}, m: function m() {
					return a(n.n(), 2);
				}, M: function M() {
					return n.F().slice(0, 3);
				}, n: function n() {
					return r.getMonth() + 1;
				}, t: function t() {
					return new Date(n.Y(), n.n(), 0).getDate();
				}, L: function L() {
					var e = n.Y();return e % 4 == 0 & e % 100 != 0 | e % 400 == 0;
				}, o: function o() {
					var e = n.n(),
					    t = n.W();return n.Y() + (12 === e && t < 9 ? 1 : 1 === e && t > 9 ? -1 : 0);
				}, Y: function Y() {
					return r.getFullYear();
				}, y: function y() {
					return n.Y().toString().slice(-2);
				}, a: function a() {
					return r.getHours() > 11 ? "pm" : "am";
				}, A: function A() {
					return n.a().toUpperCase();
				}, B: function B() {
					var e = 3600 * r.getUTCHours(),
					    t = 60 * r.getUTCMinutes(),
					    n = r.getUTCSeconds();return a(Math.floor((e + t + n + 3600) / 86.4) % 1e3, 3);
				}, g: function g() {
					return n.G() % 12 || 12;
				}, G: function G() {
					return r.getHours();
				}, h: function h() {
					return a(n.g(), 2);
				}, H: function H() {
					return a(n.G(), 2);
				}, i: function i() {
					return a(r.getMinutes(), 2);
				}, s: function s() {
					return a(r.getSeconds(), 2);
				}, u: function u() {
					return a(1e3 * r.getMilliseconds(), 6);
				}, e: function e() {
					throw new Error("Not supported (see source code of date() for timezone on how to add support)");
				}, I: function I() {
					return new Date(n.Y(), 0) - Date.UTC(n.Y(), 0) != new Date(n.Y(), 6) - Date.UTC(n.Y(), 6) ? 1 : 0;
				}, O: function O() {
					var e = r.getTimezoneOffset(),
					    t = Math.abs(e);return (e > 0 ? "-" : "+") + a(100 * Math.floor(t / 60) + t % 60, 4);
				}, P: function P() {
					var e = n.O();return e.substr(0, 3) + ":" + e.substr(3, 2);
				}, T: function T() {
					return "UTC";
				}, Z: function Z() {
					return 60 * -r.getTimezoneOffset();
				}, c: function c() {
					return "Y-m-d\\TH:i:sP".replace(i, s);
				}, r: function r() {
					return "D, d M Y H:i:s O".replace(i, s);
				}, U: function U() {
					return r / 1e3 | 0;
				} }, function (e, t) {
				return r = void 0 === t ? new Date() : t instanceof Date ? new Date(t) : new Date(1e3 * t), e.replace(i, s);
			}(e, t);
		};
	}, function (e, t, r) {
		"use strict";
		e.exports = function (e, t) {
			var r, n, o, i, s, a, p, c, l, u, f;if (!e) return !1;e = e.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").replace(/[\t\r\n]/g, "").toLowerCase();var h = new RegExp(["^(\\d{1,4})", "([\\-\\.\\/:])", "(\\d{1,2})", "([\\-\\.\\/:])", "(\\d{1,4})", "(?:\\s(\\d{1,2}):(\\d{2})?:?(\\d{2})?)?", "(?:\\s([A-Z]+)?)?$"].join(""));if ((n = e.match(h)) && n[2] === n[4]) if (n[1] > 1901) switch (n[2]) {case "-":
					return !(n[3] > 12 || n[5] > 31) && new Date(n[1], parseInt(n[3], 10) - 1, n[5], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3;case ".":
					return !1;case "/":
					return !(n[3] > 12 || n[5] > 31) && new Date(n[1], parseInt(n[3], 10) - 1, n[5], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3;} else if (n[5] > 1901) switch (n[2]) {case "-":case ".":
					return !(n[3] > 12 || n[1] > 31) && new Date(n[5], parseInt(n[3], 10) - 1, n[1], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3;case "/":
					return !(n[1] > 12 || n[3] > 31) && new Date(n[5], parseInt(n[1], 10) - 1, n[3], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3;} else switch (n[2]) {case "-":
					return !(n[3] > 12 || n[5] > 31 || n[1] < 70 && n[1] > 38) && (i = n[1] >= 0 && n[1] <= 38 ? +n[1] + 2e3 : n[1], new Date(i, parseInt(n[3], 10) - 1, n[5], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3);case ".":
					return n[5] >= 70 ? !(n[3] > 12 || n[1] > 31) && new Date(n[5], parseInt(n[3], 10) - 1, n[1], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3 : n[5] < 60 && !n[6] && !(n[1] > 23 || n[3] > 59) && (o = new Date(), new Date(o.getFullYear(), o.getMonth(), o.getDate(), n[1] || 0, n[3] || 0, n[5] || 0, n[9] || 0) / 1e3);case "/":
					return !(n[1] > 12 || n[3] > 31 || n[5] < 70 && n[5] > 38) && (i = n[5] >= 0 && n[5] <= 38 ? +n[5] + 2e3 : n[5], new Date(i, parseInt(n[1], 10) - 1, n[3], n[6] || 0, n[7] || 0, n[8] || 0, n[9] || 0) / 1e3);case ":":
					return !(n[1] > 23 || n[3] > 59 || n[5] > 59) && (o = new Date(), new Date(o.getFullYear(), o.getMonth(), o.getDate(), n[1] || 0, n[3] || 0, n[5] || 0) / 1e3);}if ("now" === e) return null === t || isNaN(t) ? new Date().getTime() / 1e3 | 0 : 0 | t;if (!isNaN(r = Date.parse(e))) return r / 1e3 | 0;if (h = new RegExp(["^([0-9]{4}-[0-9]{2}-[0-9]{2})", "[ t]", "([0-9]{2}:[0-9]{2}:[0-9]{2}(\\.[0-9]+)?)", "([\\+-][0-9]{2}(:[0-9]{2})?|z)"].join("")), (n = e.match(h)) && ("z" === n[4] ? n[4] = "Z" : n[4].match(/^([+-][0-9]{2})$/) && (n[4] = n[4] + ":00"), !isNaN(r = Date.parse(n[1] + "T" + n[2] + n[4])))) return r / 1e3 | 0;function y(e) {
				var t = e.split(" "),
				    r = t[0],
				    n = t[1].substring(0, 3),
				    o = /\d+/.test(r),
				    i = "ago" === t[2],
				    c = ("last" === r ? -1 : 1) * (i ? -1 : 1);if (o && (c *= parseInt(r, 10)), p.hasOwnProperty(n) && !t[1].match(/^mon(day|\.)?$/i)) return s["set" + p[n]](s["get" + p[n]]() + c);if ("wee" === n) return s.setDate(s.getDate() + 7 * c);if ("next" === r || "last" === r) !function (e, t, r) {
					var n,
					    o = a[t];void 0 !== o && (0 == (n = o - s.getDay()) ? n = 7 * r : n > 0 && "last" === e ? n -= 7 : n < 0 && "next" === e && (n += 7), s.setDate(s.getDate() + n));
				}(r, n, c);else if (!o) return !1;return !0;
			}if (s = t ? new Date(1e3 * t) : new Date(), a = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }, p = { yea: "FullYear", mon: "Month", day: "Date", hou: "Hours", min: "Minutes", sec: "Seconds" }, u = "([+-]?\\d+\\s" + (l = "(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)") + "|(last|next)\\s" + l + ")(\\sago)?", !(n = e.match(new RegExp(u, "gi")))) return !1;for (f = 0, c = n.length; f < c; f++) {
				if (!y(n[f])) return !1;
			}return s.getTime() / 1e3;
		};
	}, function (e, t, r) {
		"use strict";
		e.exports = function (e, t) {
			return t = (((t || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(""), e.replace(/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, "").replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, function (e, r) {
				return t.indexOf("<" + r.toLowerCase() + ">") > -1 ? e : "";
			});
		};
	}, function (e, t, r) {
		"use strict";
		var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
			return typeof e === "undefined" ? "undefined" : _typeof(e);
		} : function (e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
		};e.exports = function () {
			var e,
			    t,
			    r,
			    o = 0,
			    i = arguments,
			    s = i.length,
			    a = function a(e) {
				if ("[object Array]" === Object.prototype.toString.call(e)) return e;var t = [];for (var r in e) {
					e.hasOwnProperty(r) && t.push(e[r]);
				}return t;
			},
			    p = function e(t, r) {
				var o = 0,
				    i = 0,
				    s = 0,
				    p = 0,
				    c = 0;if (t === r) return 0;if ("object" === (void 0 === t ? "undefined" : n(t))) {
					if ("object" === (void 0 === r ? "undefined" : n(r))) {
						if (t = a(t), r = a(r), c = t.length, (p = r.length) > c) return 1;if (p < c) return -1;for (o = 0, i = c; o < i; ++o) {
							if (1 === (s = e(t[o], r[o]))) return 1;if (-1 === s) return -1;
						}return 0;
					}return -1;
				}return "object" === (void 0 === r ? "undefined" : n(r)) ? 1 : isNaN(r) && !isNaN(t) ? 0 === t ? 0 : t < 0 ? 1 : -1 : isNaN(t) && !isNaN(r) ? 0 === r ? 0 : r > 0 ? 1 : -1 : r === t ? 0 : r > t ? 1 : -1;
			};if (0 === s) throw new Error("At least one value should be passed to min()");if (1 === s) {
				if ("object" !== n(i[0])) throw new Error("Wrong parameter count for min()");if (0 === (e = a(i[0])).length) throw new Error("Array must contain at least one element for min()");
			} else e = i;for (t = e[0], o = 1, r = e.length; o < r; ++o) {
				-1 === p(t, e[o]) && (t = e[o]);
			}return t;
		};
	}, function (e, t, r) {
		"use strict";
		var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
			return typeof e === "undefined" ? "undefined" : _typeof(e);
		} : function (e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
		};e.exports = function () {
			var e,
			    t,
			    r,
			    o = 0,
			    i = arguments,
			    s = i.length,
			    a = function a(e) {
				if ("[object Array]" === Object.prototype.toString.call(e)) return e;var t = [];for (var r in e) {
					e.hasOwnProperty(r) && t.push(e[r]);
				}return t;
			},
			    p = function e(t, r) {
				var o = 0,
				    i = 0,
				    s = 0,
				    p = 0,
				    c = 0;if (t === r) return 0;if ("object" === (void 0 === t ? "undefined" : n(t))) {
					if ("object" === (void 0 === r ? "undefined" : n(r))) {
						if (t = a(t), r = a(r), c = t.length, (p = r.length) > c) return 1;if (p < c) return -1;for (o = 0, i = c; o < i; ++o) {
							if (1 === (s = e(t[o], r[o]))) return 1;if (-1 === s) return -1;
						}return 0;
					}return -1;
				}return "object" === (void 0 === r ? "undefined" : n(r)) ? 1 : isNaN(r) && !isNaN(t) ? 0 === t ? 0 : t < 0 ? 1 : -1 : isNaN(t) && !isNaN(r) ? 0 === r ? 0 : r > 0 ? 1 : -1 : r === t ? 0 : r > t ? 1 : -1;
			};if (0 === s) throw new Error("At least one value should be passed to max()");if (1 === s) {
				if ("object" !== n(i[0])) throw new Error("Wrong parameter count for max()");if (0 === (e = a(i[0])).length) throw new Error("Array must contain at least one element for max()");
			} else e = i;for (t = e[0], o = 1, r = e.length; o < r; ++o) {
				1 === p(t, e[o]) && (t = e[o]);
			}return t;
		};
	}, function (e, t, r) {
		"use strict";
		e.exports = function (e, t, r) {
			var n, o, i, s;if (t |= 0, i = (e *= n = Math.pow(10, t)) % 1 == .5 * (s = e > 0 | -(e < 0)), o = Math.floor(e), i) switch (r) {case "PHP_ROUND_HALF_DOWN":
					e = o + (s < 0);break;case "PHP_ROUND_HALF_EVEN":
					e = o + o % 2 * s;break;case "PHP_ROUND_HALF_ODD":
					e = o + !(o % 2);break;default:
					e = o + (s > 0);}return (i ? e : Math.round(e)) / n;
		};
	}, function (e, t, r) {
		"use strict";
		e.exports = function (e, t) {
			return r(1).apply(this, [e].concat(t));
		};
	}, function (e, t, r) {
		e.exports = function (e) {
			e.lib = {}, e.lib.sprintf = r(1), e.lib.vsprintf = r(20), e.lib.round = r(19), e.lib.max = r(18), e.lib.min = r(17), e.lib.strip_tags = r(16), e.lib.strtotime = r(15), e.lib.date = r(14), e.lib.boolval = r(13);var t = Object.prototype.toString;return e.lib.is = function (e, r) {
				return void 0 !== r && null !== r && ("Array" === e && Array.isArray ? Array.isArray(r) : t.call(r).slice(8, -1) === e);
			}, e.lib.isArray = Array.isArray || function (e) {
				return "Array" === t.call(e).slice(8, -1);
			}, e.lib.copy = function (e) {
				var t,
				    r = {};for (t in e) {
					r[t] = e[t];
				}return r;
			}, e.lib.extend = function (e, t) {
				var r,
				    n = Object.keys(t || {});for (r = n.length; r--;) {
					e[n[r]] = t[n[r]];
				}return e;
			}, e.lib.replaceAll = function (e, t, r) {
				return e.split(t).join(r);
			}, e.lib.chunkArray = function (t, r) {
				var n = [],
				    o = 0,
				    i = t.length;if (r < 1 || !e.lib.is("Array", t)) return [];for (; o < i;) {
					n.push(t.slice(o, o += r));
				}return n;
			}, e;
		};
	}, function (e, t) {
		e.exports = function (t) {
			return t.functions = { range: function range(e, t, r) {
					var n,
					    o,
					    i = [],
					    s = r || 1,
					    a = !1;if (isNaN(e) || isNaN(t) ? isNaN(e) && isNaN(t) ? (a = !0, n = e.charCodeAt(0), o = t.charCodeAt(0)) : (n = isNaN(e) ? 0 : e, o = isNaN(t) ? 0 : t) : (n = parseInt(e, 10), o = parseInt(t, 10)), n > o) for (; n >= o;) {
						i.push(a ? String.fromCharCode(n) : n), n -= s;
					} else for (; n <= o;) {
						i.push(a ? String.fromCharCode(n) : n), n += s;
					}return i;
				}, cycle: function cycle(e, t) {
					return e[t % e.length];
				}, dump: function dump() {
					var e = arguments.length;for (args = new Array(e); e-- > 0;) {
						args[e] = arguments[e];
					}var r = 0,
					    n = "",
					    o = function o(e) {
						for (var t = ""; e > 0;) {
							e--, t += "  ";
						}return t;
					},
					    i = function i(e) {
						n += o(r), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? s(e) : "function" == typeof e ? n += "function()\n" : "string" == typeof e ? n += "string(" + e.length + ') "' + e + '"\n' : "number" == typeof e ? n += "number(" + e + ")\n" : "boolean" == typeof e && (n += "bool(" + e + ")\n");
					},
					    s = function s(e) {
						var t;if (null === e) n += "NULL\n";else if (void 0 === e) n += "undefined\n";else if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
							for (t in n += o(r) + (typeof e === "undefined" ? "undefined" : _typeof(e)), r++, n += "(" + function (e) {
								var t,
								    r = 0;for (t in e) {
									e.hasOwnProperty(t) && r++;
								}return r;
							}(e) + ") {\n", e) {
								n += o(r) + "[" + t + "]=> \n", i(e[t]);
							}n += o(--r) + "}\n";
						} else i(e);
					};return 0 == args.length && args.push(this.context), t.forEach(args, function (e) {
						s(e);
					}), n;
				}, date: function date(e, r) {
					var n;if (void 0 === e || null === e || "" === e) n = new Date();else if (t.lib.is("Date", e)) n = e;else if (t.lib.is("String", e)) n = e.match(/^[0-9]+$/) ? new Date(1e3 * e) : new Date(1e3 * t.lib.strtotime(e));else {
						if (!t.lib.is("Number", e)) throw new t.Error("Unable to parse date " + e);n = new Date(1e3 * e);
					}return n;
				}, block: function block(e) {
					return this.originalBlockTokens[e] ? t.logic.parse.call(this, this.originalBlockTokens[e], this.context).output : this.blocks[e];
				}, parent: function parent() {
					return t.placeholders.parent;
				}, attribute: function attribute(e, r, n) {
					return t.lib.is("Object", e) && e.hasOwnProperty(r) ? "function" == typeof e[r] ? e[r].apply(void 0, n) : e[r] : e[r] || void 0;
				}, max: function max(e) {
					return t.lib.is("Object", e) ? (delete e._keys, t.lib.max(e)) : t.lib.max.apply(null, arguments);
				}, min: function min(e) {
					return t.lib.is("Object", e) ? (delete e._keys, t.lib.min(e)) : t.lib.min.apply(null, arguments);
				}, template_from_string: function template_from_string(e) {
					return void 0 === e && (e = ""), t.Templates.parsers.twig({ options: this.options, data: e });
				}, random: function random(e) {
					var r = 2147483648;function n(e) {
						var t = Math.floor(Math.random() * r),
						    n = Math.min.call(null, 0, e),
						    o = Math.max.call(null, 0, e);return n + Math.floor((o - n + 1) * t / r);
					}if (t.lib.is("Number", e)) return n(e);if (t.lib.is("String", e)) return e.charAt(n(e.length - 1));if (t.lib.is("Array", e)) return e[n(e.length - 1)];if (t.lib.is("Object", e)) {
						var o = Object.keys(e);return e[o[n(o.length - 1)]];
					}return n(r - 1);
				}, source: function source(r, n) {
					var o,
					    i,
					    s,
					    a = !1;void 0 !== e && void 0 !== e.exports && "undefined" == typeof window ? (i = "fs", s = __dirname + "/" + r) : (i = "ajax", s = r);var p = { id: r, path: s, method: i, parser: "source", async: !1, fetchTemplateSource: !0 };void 0 === n && (n = !1);try {
						void 0 === (o = t.Templates.loadRemote(r, p)) || null === o ? o = "" : a = !0;
					} catch (e) {
						t.log.debug("Twig.functions.source: ", "Problem loading template  ", e);
					}return a || n ? o : 'Template "{name}" is not defined.'.replace("{name}", r);
				} }, t._function = function (e, r, n) {
				if (!t.functions[e]) throw "Unable to find function " + e;return t.functions[e](r, n);
			}, t._function.extend = function (e, r) {
				t.functions[e] = r;
			}, t;
		};
	}, function (e, t) {
		e.exports = function (_e) {
			function t(e, t) {
				var r = Object.prototype.toString.call(t).slice(8, -1);return void 0 !== t && null !== t && r === e;
			}return _e.filters = { upper: function upper(e) {
					return "string" != typeof e ? e : e.toUpperCase();
				}, lower: function lower(e) {
					return "string" != typeof e ? e : e.toLowerCase();
				}, capitalize: function capitalize(e) {
					return "string" != typeof e ? e : e.substr(0, 1).toUpperCase() + e.toLowerCase().substr(1);
				}, title: function title(e) {
					return "string" != typeof e ? e : e.toLowerCase().replace(/(^|\s)([a-z])/g, function (e, t, r) {
						return t + r.toUpperCase();
					});
				}, length: function length(t) {
					return _e.lib.is("Array", t) || "string" == typeof t ? t.length : _e.lib.is("Object", t) ? void 0 === t._keys ? Object.keys(t).length : t._keys.length : 0;
				}, reverse: function reverse(e) {
					if (t("Array", e)) return e.reverse();if (t("String", e)) return e.split("").reverse().join("");if (t("Object", e)) {
						var r = e._keys || Object.keys(e).reverse();return e._keys = r, e;
					}
				}, sort: function sort(e) {
					if (t("Array", e)) return e.sort();if (t("Object", e)) {
						delete e._keys;var r = Object.keys(e).sort(function (t, r) {
							var n;return e[t] > e[r] == !(e[t] <= e[r]) ? e[t] > e[r] ? 1 : e[t] < e[r] ? -1 : 0 : isNaN(n = parseFloat(e[t])) || isNaN(b1 = parseFloat(e[r])) ? "string" == typeof e[t] ? e[t] > e[r].toString() ? 1 : e[t] < e[r].toString() ? -1 : 0 : "string" == typeof e[r] ? e[t].toString() > e[r] ? 1 : e[t].toString() < e[r] ? -1 : 0 : null : n > b1 ? 1 : n < b1 ? -1 : 0;
						});return e._keys = r, e;
					}
				}, keys: function keys(t) {
					if (void 0 !== t && null !== t) {
						var r = t._keys || Object.keys(t),
						    n = [];return _e.forEach(r, function (e) {
							"_keys" !== e && t.hasOwnProperty(e) && n.push(e);
						}), n;
					}
				}, url_encode: function url_encode(e) {
					if (void 0 !== e && null !== e) {
						var t = encodeURIComponent(e);return t.replace("'", "%27");
					}
				}, join: function join(r, n) {
					if (void 0 !== r && null !== r) {
						var o = "",
						    i = [],
						    s = null;return n && n[0] && (o = n[0]), t("Array", r) ? i = r : (s = r._keys || Object.keys(r), _e.forEach(s, function (e) {
							"_keys" !== e && r.hasOwnProperty(e) && i.push(r[e]);
						})), i.join(o);
					}
				}, default: function _default(t, r) {
					if (void 0 !== r && r.length > 1) throw new _e.Error("default filter expects one argument");return void 0 === t || null === t || "" === t ? void 0 === r ? "" : r[0] : t;
				}, json_encode: function json_encode(r) {
					if (void 0 === r || null === r) return "null";if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && t("Array", r)) return o = [], _e.forEach(r, function (t) {
						o.push(_e.filters.json_encode(t));
					}), "[" + o.join(",") + "]";if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && t("Date", r)) return '"' + r.toISOString() + '"';if ("object" == (typeof r === "undefined" ? "undefined" : _typeof(r))) {
						var n = r._keys || Object.keys(r),
						    o = [];return _e.forEach(n, function (t) {
							o.push(JSON.stringify(t) + ":" + _e.filters.json_encode(r[t]));
						}), "{" + o.join(",") + "}";
					}return JSON.stringify(r);
				}, merge: function merge(r, n) {
					var o = [],
					    i = 0,
					    s = [];if (t("Array", r) ? _e.forEach(n, function (e) {
						t("Array", e) || (o = {});
					}) : o = {}, t("Array", o) || (o._keys = []), t("Array", r) ? _e.forEach(r, function (e) {
						o._keys && o._keys.push(i), o[i] = e, i++;
					}) : (s = r._keys || Object.keys(r), _e.forEach(s, function (e) {
						o[e] = r[e], o._keys.push(e);var t = parseInt(e, 10);!isNaN(t) && t >= i && (i = t + 1);
					})), _e.forEach(n, function (r) {
						t("Array", r) ? _e.forEach(r, function (e) {
							o._keys && o._keys.push(i), o[i] = e, i++;
						}) : (s = r._keys || Object.keys(r), _e.forEach(s, function (e) {
							o[e] || o._keys.push(e), o[e] = r[e];var t = parseInt(e, 10);!isNaN(t) && t >= i && (i = t + 1);
						}));
					}), 0 === n.length) throw new _e.Error("Filter merge expects at least one parameter");return o;
				}, date: function date(t, r) {
					var n = _e.functions.date(t),
					    o = r && r.length ? r[0] : "F j, Y H:i";return _e.lib.date(o, n);
				}, date_modify: function date_modify(t, r) {
					if (void 0 !== t && null !== t) {
						if (void 0 === r || 1 !== r.length) throw new _e.Error("date_modify filter expects 1 argument");var n,
						    o = r[0];return _e.lib.is("Date", t) && (n = _e.lib.strtotime(o, t.getTime() / 1e3)), _e.lib.is("String", t) && (n = _e.lib.strtotime(o, _e.lib.strtotime(t))), _e.lib.is("Number", t) && (n = _e.lib.strtotime(o, t)), new Date(1e3 * n);
					}
				}, replace: function replace(t, r) {
					if (void 0 !== t && null !== t) {
						var n,
						    o = r[0];for (n in o) {
							o.hasOwnProperty(n) && "_keys" !== n && (t = _e.lib.replaceAll(t, n, o[n]));
						}return t;
					}
				}, format: function format(t, r) {
					if (void 0 !== t && null !== t) return _e.lib.vsprintf(t, r);
				}, striptags: function striptags(t, r) {
					if (void 0 !== t && null !== t) return _e.lib.strip_tags(t, r);
				}, escape: function escape(t, r) {
					if (void 0 !== t && null !== t) {
						var n = "html";if (r && r.length && !0 !== r[0] && (n = r[0]), "html" == n) {
							var o = t.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");return _e.Markup(o, "html");
						}if ("js" == n) {
							o = t.toString();for (var i = "", s = 0; s < o.length; s++) {
								o[s].match(/^[a-zA-Z0-9,\._]$/) ? i += o[s] : i += (a = o.charCodeAt(s)) < 128 ? "\\x" + a.toString(16).toUpperCase() : _e.lib.sprintf("\\u%04s", a.toString(16).toUpperCase());
							}return _e.Markup(i, "js");
						}if ("css" == n) {
							for (o = t.toString(), i = "", s = 0; s < o.length; s++) {
								o[s].match(/^[a-zA-Z0-9]$/) ? i += o[s] : i += "\\" + (a = o.charCodeAt(s)).toString(16).toUpperCase() + " ";
							}return _e.Markup(i, "css");
						}if ("url" == n) return i = _e.filters.url_encode(t), _e.Markup(i, "url");if ("html_attr" == n) {
							for (o = t.toString(), i = "", s = 0; s < o.length; s++) {
								if (o[s].match(/^[a-zA-Z0-9,\.\-_]$/)) i += o[s];else if (o[s].match(/^[&<>"]$/)) i += o[s].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");else {
									var a;i += (a = o.charCodeAt(s)) <= 31 && 9 != a && 10 != a && 13 != a ? "&#xFFFD;" : a < 128 ? _e.lib.sprintf("&#x%02s;", a.toString(16).toUpperCase()) : _e.lib.sprintf("&#x%04s;", a.toString(16).toUpperCase());
								}
							}return _e.Markup(i, "html_attr");
						}throw new _e.Error("escape strategy unsupported");
					}
				}, e: function e(t, r) {
					return _e.filters.escape(t, r);
				}, nl2br: function nl2br(t) {
					if (void 0 !== t && null !== t) {
						var r = "<br />BACKSLASH_n_replace";return t = _e.filters.escape(t).replace(/\r\n/g, r).replace(/\r/g, r).replace(/\n/g, r), t = _e.lib.replaceAll(t, "BACKSLASH_n_replace", "\n"), _e.Markup(t);
					}
				}, number_format: function number_format(e, t) {
					var r = e,
					    n = t && t[0] ? t[0] : void 0,
					    o = t && void 0 !== t[1] ? t[1] : ".",
					    i = t && void 0 !== t[2] ? t[2] : ",";r = (r + "").replace(/[^0-9+\-Ee.]/g, "");var s = isFinite(+r) ? +r : 0,
					    a = isFinite(+n) ? Math.abs(n) : 0,
					    p = "";return (p = (a ? function (e, t) {
						var r = Math.pow(10, t);return "" + Math.round(e * r) / r;
					}(s, a) : "" + Math.round(s)).split("."))[0].length > 3 && (p[0] = p[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, i)), (p[1] || "").length < a && (p[1] = p[1] || "", p[1] += new Array(a - p[1].length + 1).join("0")), p.join(o);
				}, trim: function trim(e, t) {
					if (void 0 !== e && null !== e) {
						var r,
						    n = "" + e;r = t && t[0] ? "" + t[0] : " \n\r\t\f\x0B\xA0\u2002\u2003\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u3000";for (var o = 0; o < n.length; o++) {
							if (-1 === r.indexOf(n.charAt(o))) {
								n = n.substring(o);break;
							}
						}for (o = n.length - 1; o >= 0; o--) {
							if (-1 === r.indexOf(n.charAt(o))) {
								n = n.substring(0, o + 1);break;
							}
						}return -1 === r.indexOf(n.charAt(0)) ? n : "";
					}
				}, truncate: function truncate(e, t) {
					var r = 30,
					    n = !1,
					    o = "...";if (e += "", t && (t[0] && (r = t[0]), t[1] && (n = t[1]), t[2] && (o = t[2])), e.length > r) {
						if (n && -1 === (r = e.indexOf(" ", r))) return e;e = e.substr(0, r) + o;
					}return e;
				}, slice: function slice(t, r) {
					if (void 0 !== t && null !== t) {
						if (void 0 === r || r.length < 1) throw new _e.Error("slice filter expects at least 1 argument");var n = r[0] || 0,
						    o = r.length > 1 ? r[1] : t.length,
						    i = n >= 0 ? n : Math.max(t.length + n, 0);if (_e.lib.is("Array", t)) {
							for (var s = [], a = i; a < i + o && a < t.length; a++) {
								s.push(t[a]);
							}return s;
						}if (_e.lib.is("String", t)) return t.substr(i, o);throw new _e.Error("slice filter expects value to be an array or string");
					}
				}, abs: function abs(e) {
					if (void 0 !== e && null !== e) return Math.abs(e);
				}, first: function first(e) {
					if (t("Array", e)) return e[0];if (t("Object", e)) {
						if ("_keys" in e) return e[e._keys[0]];
					} else if ("string" == typeof e) return e.substr(0, 1);
				}, split: function split(t, r) {
					if (void 0 !== t && null !== t) {
						if (void 0 === r || r.length < 1 || r.length > 2) throw new _e.Error("split filter expects 1 or 2 argument");if (_e.lib.is("String", t)) {
							var n = r[0],
							    o = r[1],
							    i = t.split(n);if (void 0 === o) return i;if (o < 0) return t.split(n, i.length + o);var s = [];if ("" == n) for (; i.length > 0;) {
								for (var a = "", p = 0; p < o && i.length > 0; p++) {
									a += i.shift();
								}s.push(a);
							} else {
								for (p = 0; p < o - 1 && i.length > 0; p++) {
									s.push(i.shift());
								}i.length > 0 && s.push(i.join(n));
							}return s;
						}throw new _e.Error("split filter expects value to be a string");
					}
				}, last: function last(t) {
					var r;return _e.lib.is("Object", t) ? t[(r = void 0 === t._keys ? Object.keys(t) : t._keys)[r.length - 1]] : t[t.length - 1];
				}, raw: function raw(t) {
					return _e.Markup(t);
				}, batch: function batch(t, r) {
					var n,
					    o,
					    i,
					    s = r.shift(),
					    a = r.shift();if (!_e.lib.is("Array", t)) throw new _e.Error("batch filter expects items to be an array");if (!_e.lib.is("Number", s)) throw new _e.Error("batch filter expects size to be a number");if (s = Math.ceil(s), n = _e.lib.chunkArray(t, s), a && t.length % s != 0) {
						for (i = s - (o = n.pop()).length; i--;) {
							o.push(a);
						}n.push(o);
					}return n;
				}, round: function round(t, r) {
					var n = (r = r || []).length > 0 ? r[0] : 0,
					    o = r.length > 1 ? r[1] : "common";if (t = parseFloat(t), n && !_e.lib.is("Number", n)) throw new _e.Error("round filter expects precision to be a number");if ("common" === o) return _e.lib.round(t, n);if (!_e.lib.is("Function", Math[o])) throw new _e.Error("round filter expects method to be 'floor', 'ceil', or 'common'");return Math[o](t * Math.pow(10, n)) / Math.pow(10, n);
				} }, _e.filter = function (t, r, n) {
				if (!_e.filters[t]) throw "Unable to find filter " + t;return _e.filters[t].call(this, r, n);
			}, _e.filter.extend = function (t, r) {
				_e.filters[t] = r;
			}, _e;
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			e.expression.operator = { leftToRight: "leftToRight", rightToLeft: "rightToLeft" };var t = function t(e, _t) {
				if (void 0 === _t || null === _t) return null;if (void 0 !== _t.indexOf) return e === _t || "" !== e && _t.indexOf(e) > -1;var r;for (r in _t) {
					if (_t.hasOwnProperty(r) && _t[r] === e) return !0;
				}return !1;
			};return e.expression.operator.lookup = function (t, r) {
				switch (t) {case "..":
						r.precidence = 20, r.associativity = e.expression.operator.leftToRight;break;case ",":
						r.precidence = 18, r.associativity = e.expression.operator.leftToRight;break;case "?:":case "?":case ":":
						r.precidence = 16, r.associativity = e.expression.operator.rightToLeft;break;case "or":
						r.precidence = 14, r.associativity = e.expression.operator.leftToRight;break;case "and":
						r.precidence = 13, r.associativity = e.expression.operator.leftToRight;break;case "b-or":
						r.precidence = 12, r.associativity = e.expression.operator.leftToRight;break;case "b-xor":
						r.precidence = 11, r.associativity = e.expression.operator.leftToRight;break;case "b-and":
						r.precidence = 10, r.associativity = e.expression.operator.leftToRight;break;case "==":case "!=":
						r.precidence = 9, r.associativity = e.expression.operator.leftToRight;break;case "<":case "<=":case ">":case ">=":case "not in":case "in":
						r.precidence = 8, r.associativity = e.expression.operator.leftToRight;break;case "~":case "+":case "-":
						r.precidence = 6, r.associativity = e.expression.operator.leftToRight;break;case "//":case "**":case "*":case "/":case "%":
						r.precidence = 5, r.associativity = e.expression.operator.leftToRight;break;case "not":
						r.precidence = 3, r.associativity = e.expression.operator.rightToLeft;break;default:
						throw new e.Error("Failed to lookup operator: " + t + " is an unknown operator.");}return r.operator = t, r;
			}, e.expression.operator.parse = function (r, n) {
				var o, i, s;switch (e.log.trace("Twig.expression.operator.parse: ", "Handling ", r), "?" === r && (s = n.pop()), i = n.pop(), "not" !== r && (o = n.pop()), "in" !== r && "not in" !== r && (o && Array.isArray(o) && (o = o.length), i && Array.isArray(i) && (i = i.length)), r) {case ":":
						break;case "?:":
						e.lib.boolval(o) ? n.push(o) : n.push(i);break;case "?":
						void 0 === o && (o = i, i = s, s = void 0), e.lib.boolval(o) ? n.push(i) : n.push(s);break;case "+":
						i = parseFloat(i), o = parseFloat(o), n.push(o + i);break;case "-":
						i = parseFloat(i), o = parseFloat(o), n.push(o - i);break;case "*":
						i = parseFloat(i), o = parseFloat(o), n.push(o * i);break;case "/":
						i = parseFloat(i), o = parseFloat(o), n.push(o / i);break;case "//":
						i = parseFloat(i), o = parseFloat(o), n.push(Math.floor(o / i));break;case "%":
						i = parseFloat(i), o = parseFloat(o), n.push(o % i);break;case "~":
						n.push((null != o ? o.toString() : "") + (null != i ? i.toString() : ""));break;case "not":case "!":
						n.push(!e.lib.boolval(i));break;case "<":
						n.push(o < i);break;case "<=":
						n.push(o <= i);break;case ">":
						n.push(o > i);break;case ">=":
						n.push(o >= i);break;case "===":
						n.push(o === i);break;case "==":
						n.push(o == i);break;case "!==":
						n.push(o !== i);break;case "!=":
						n.push(o != i);break;case "or":
						n.push(e.lib.boolval(o) || e.lib.boolval(i));break;case "b-or":
						n.push(o | i);break;case "b-xor":
						n.push(o ^ i);break;case "and":
						n.push(e.lib.boolval(o) && e.lib.boolval(i));break;case "b-and":
						n.push(o & i);break;case "**":
						n.push(Math.pow(o, i));break;case "not in":
						n.push(!t(o, i));break;case "in":
						n.push(t(o, i));break;case "..":
						n.push(e.functions.range(o, i));break;default:
						throw new e.Error("Failed to parse operator: " + r + " is an unknown operator.");}
			}, e;
		};
	}, function (e, t, r) {
		e.exports = function (e) {
			"use strict";
			function t(t, r, n) {
				return r ? e.expression.parseAsync.call(t, r, n) : e.Promise.resolve(!1);
			}for (e.expression = {}, r(24)(e), e.expression.reservedWords = ["true", "false", "null", "TRUE", "FALSE", "NULL", "_context", "and", "b-and", "or", "b-or", "b-xor", "in", "not in", "if"], e.expression.type = { comma: "Twig.expression.type.comma", operator: { unary: "Twig.expression.type.operator.unary", binary: "Twig.expression.type.operator.binary" }, string: "Twig.expression.type.string", bool: "Twig.expression.type.bool", slice: "Twig.expression.type.slice", array: { start: "Twig.expression.type.array.start", end: "Twig.expression.type.array.end" }, object: { start: "Twig.expression.type.object.start", end: "Twig.expression.type.object.end" }, parameter: { start: "Twig.expression.type.parameter.start", end: "Twig.expression.type.parameter.end" }, subexpression: { start: "Twig.expression.type.subexpression.start", end: "Twig.expression.type.subexpression.end" }, key: { period: "Twig.expression.type.key.period", brackets: "Twig.expression.type.key.brackets" }, filter: "Twig.expression.type.filter", _function: "Twig.expression.type._function", variable: "Twig.expression.type.variable", number: "Twig.expression.type.number", _null: "Twig.expression.type.null", context: "Twig.expression.type.context", test: "Twig.expression.type.test" }, e.expression.set = { operations: [e.expression.type.filter, e.expression.type.operator.unary, e.expression.type.operator.binary, e.expression.type.array.end, e.expression.type.object.end, e.expression.type.parameter.end, e.expression.type.subexpression.end, e.expression.type.comma, e.expression.type.test], expressions: [e.expression.type._function, e.expression.type.bool, e.expression.type.string, e.expression.type.variable, e.expression.type.number, e.expression.type._null, e.expression.type.context, e.expression.type.parameter.start, e.expression.type.array.start, e.expression.type.object.start, e.expression.type.subexpression.start, e.expression.type.operator.unary] }, e.expression.set.operations_extended = e.expression.set.operations.concat([e.expression.type.key.period, e.expression.type.key.brackets, e.expression.type.slice]), e.expression.fn = { compile: { push: function push(e, t, r) {
						r.push(e);
					}, push_both: function push_both(e, t, r) {
						r.push(e), t.push(e);
					} }, parse: { push: function push(e, t, r) {
						t.push(e);
					}, push_value: function push_value(e, t, r) {
						t.push(e.value);
					} } }, e.expression.definitions = [{ type: e.expression.type.test, regex: /^is\s+(not)?\s*([a-zA-Z_][a-zA-Z0-9_]*(\s?as)?)/, next: e.expression.set.operations.concat([e.expression.type.parameter.start]), compile: function compile(e, t, r) {
					e.filter = e.match[2], e.modifier = e.match[1], delete e.match, delete e.value, r.push(e);
				}, parse: function parse(r, n, o) {
					var i = n.pop();return t(this, r.params, o).then(function (t) {
						var o = e.test(r.filter, i, t);"not" == r.modifier ? n.push(!o) : n.push(o);
					});
				} }, { type: e.expression.type.comma, regex: /^,/, next: e.expression.set.expressions.concat([e.expression.type.array.end, e.expression.type.object.end]), compile: function compile(t, r, n) {
					var o,
					    i = r.length - 1;for (delete t.match, delete t.value; i >= 0; i--) {
						if ((o = r.pop()).type === e.expression.type.object.start || o.type === e.expression.type.parameter.start || o.type === e.expression.type.array.start) {
							r.push(o);break;
						}n.push(o);
					}n.push(t);
				} }, { type: e.expression.type.number, regex: /^\-?\d+(\.\d+)?/, next: e.expression.set.operations, compile: function compile(e, t, r) {
					e.value = Number(e.value), r.push(e);
				}, parse: e.expression.fn.parse.push_value }, { type: e.expression.type.operator.binary, regex: /(^\?\:|^(b\-and)|^(b\-or)|^(b\-xor)|^[\+\-~%\?]|^[\:](?!\d\])|^[!=]==?|^[!<>]=?|^\*\*?|^\/\/?|^(and)[\(|\s+]|^(or)[\(|\s+]|^(in)[\(|\s+]|^(not in)[\(|\s+]|^\.\.)/, next: e.expression.set.expressions, transform: function transform(e, t) {
					switch (e[0]) {case "and(":case "or(":case "in(":case "not in(":
							return t[t.length - 1].value = e[2], e[0];default:
							return "";}
				}, compile: function compile(t, r, n) {
					delete t.match, t.value = t.value.trim();var o = t.value,
					    i = e.expression.operator.lookup(o, t);for (e.log.trace("Twig.expression.compile: ", "Operator: ", i, " from ", o); r.length > 0 && (r[r.length - 1].type == e.expression.type.operator.unary || r[r.length - 1].type == e.expression.type.operator.binary) && (i.associativity === e.expression.operator.leftToRight && i.precidence >= r[r.length - 1].precidence || i.associativity === e.expression.operator.rightToLeft && i.precidence > r[r.length - 1].precidence);) {
						var s = r.pop();n.push(s);
					}if (":" === o) {
						if (!r[r.length - 1] || "?" !== r[r.length - 1].value) {
							var a = n.pop();if (a.type === e.expression.type.string || a.type === e.expression.type.variable) t.key = a.value;else if (a.type === e.expression.type.number) t.key = a.value.toString();else {
								if (!a.expression || a.type !== e.expression.type.parameter.end && a.type != e.expression.type.subexpression.end) throw new e.Error("Unexpected value before ':' of " + a.type + " = " + a.value);t.params = a.params;
							}return void n.push(t);
						}
					} else r.push(i);
				}, parse: function parse(t, r, n) {
					if (t.key) r.push(t);else {
						if (t.params) return e.expression.parseAsync.call(this, t.params, n).then(function (e) {
							t.key = e, r.push(t), n.loop || delete t.params;
						});e.expression.operator.parse(t.value, r);
					}
				} }, { type: e.expression.type.operator.unary, regex: /(^not\s+)/, next: e.expression.set.expressions, compile: function compile(t, r, n) {
					delete t.match, t.value = t.value.trim();var o = t.value,
					    i = e.expression.operator.lookup(o, t);for (e.log.trace("Twig.expression.compile: ", "Operator: ", i, " from ", o); r.length > 0 && (r[r.length - 1].type == e.expression.type.operator.unary || r[r.length - 1].type == e.expression.type.operator.binary) && (i.associativity === e.expression.operator.leftToRight && i.precidence >= r[r.length - 1].precidence || i.associativity === e.expression.operator.rightToLeft && i.precidence > r[r.length - 1].precidence);) {
						var s = r.pop();n.push(s);
					}r.push(i);
				}, parse: function parse(t, r, n) {
					e.expression.operator.parse(t.value, r);
				} }, { type: e.expression.type.string, regex: /^(["'])(?:(?=(\\?))\2[\s\S])*?\1/, next: e.expression.set.operations_extended, compile: function compile(t, r, n) {
					var o = t.value;delete t.match, o = '"' === o.substring(0, 1) ? o.replace('\\"', '"') : o.replace("\\'", "'"), t.value = o.substring(1, o.length - 1).replace(/\\n/g, "\n").replace(/\\r/g, "\r"), e.log.trace("Twig.expression.compile: ", "String value: ", t.value), n.push(t);
				}, parse: e.expression.fn.parse.push_value }, { type: e.expression.type.subexpression.start, regex: /^\(/, next: e.expression.set.expressions.concat([e.expression.type.subexpression.end]), compile: function compile(e, t, r) {
					e.value = "(", r.push(e), t.push(e);
				}, parse: e.expression.fn.parse.push }, { type: e.expression.type.subexpression.end, regex: /^\)/, next: e.expression.set.operations_extended, validate: function validate(t, r) {
					for (var n = r.length - 1, o = !1, i = !1, s = 0; !o && n >= 0;) {
						var a = r[n];(o = a.type === e.expression.type.subexpression.start) && i && (i = !1, o = !1), a.type === e.expression.type.parameter.start ? s++ : a.type === e.expression.type.parameter.end ? s-- : a.type === e.expression.type.subexpression.end && (i = !0), n--;
					}return o && 0 === s;
				}, compile: function compile(t, r, n) {
					var o,
					    i = t;for (o = r.pop(); r.length > 0 && o.type != e.expression.type.subexpression.start;) {
						n.push(o), o = r.pop();
					}for (var s = []; t.type !== e.expression.type.subexpression.start;) {
						s.unshift(t), t = n.pop();
					}s.unshift(t), void 0 === (o = r[r.length - 1]) || o.type !== e.expression.type._function && o.type !== e.expression.type.filter && o.type !== e.expression.type.test && o.type !== e.expression.type.key.brackets ? (i.expression = !0, s.pop(), s.shift(), i.params = s, n.push(i)) : (i.expression = !1, o.params = s);
				}, parse: function parse(t, r, n) {
					if (t.expression) return e.expression.parseAsync.call(this, t.params, n).then(function (e) {
						r.push(e);
					});throw new e.Error("Unexpected subexpression end when token is not marked as an expression");
				} }, { type: e.expression.type.parameter.start, regex: /^\(/, next: e.expression.set.expressions.concat([e.expression.type.parameter.end]), validate: function validate(t, r) {
					var n = r[r.length - 1];return n && e.indexOf(e.expression.reservedWords, n.value.trim()) < 0;
				}, compile: e.expression.fn.compile.push_both, parse: e.expression.fn.parse.push }, { type: e.expression.type.parameter.end, regex: /^\)/, next: e.expression.set.operations_extended, compile: function compile(t, r, n) {
					var o,
					    i = t;for (o = r.pop(); r.length > 0 && o.type != e.expression.type.parameter.start;) {
						n.push(o), o = r.pop();
					}for (var s = []; t.type !== e.expression.type.parameter.start;) {
						s.unshift(t), t = n.pop();
					}s.unshift(t), void 0 === (t = n[n.length - 1]) || t.type !== e.expression.type._function && t.type !== e.expression.type.filter && t.type !== e.expression.type.test && t.type !== e.expression.type.key.brackets ? (i.expression = !0, s.pop(), s.shift(), i.params = s, n.push(i)) : (i.expression = !1, t.params = s);
				}, parse: function parse(t, r, n) {
					var o = [],
					    i = !1,
					    s = null;if (t.expression) return e.expression.parseAsync.call(this, t.params, n).then(function (e) {
						r.push(e);
					});for (; r.length > 0;) {
						if ((s = r.pop()) && s.type && s.type == e.expression.type.parameter.start) {
							i = !0;break;
						}o.unshift(s);
					}if (!i) throw new e.Error("Expected end of parameter set.");r.push(o);
				} }, { type: e.expression.type.slice, regex: /^\[(\d*\:\d*)\]/, next: e.expression.set.operations_extended, compile: function compile(e, t, r) {
					var n = e.match[1].split(":"),
					    o = n[0] ? parseInt(n[0]) : void 0,
					    i = n[1] ? parseInt(n[1]) : void 0;e.value = "slice", e.params = [o, i], i || (e.params = [o]), r.push(e);
				}, parse: function parse(t, r, n) {
					var o = r.pop(),
					    i = t.params;r.push(e.filter.call(this, t.value, o, i));
				} }, { type: e.expression.type.array.start, regex: /^\[/, next: e.expression.set.expressions.concat([e.expression.type.array.end]), compile: e.expression.fn.compile.push_both, parse: e.expression.fn.parse.push }, { type: e.expression.type.array.end, regex: /^\]/, next: e.expression.set.operations_extended, compile: function compile(t, r, n) {
					for (var o, i = r.length - 1; i >= 0 && (o = r.pop()).type !== e.expression.type.array.start; i--) {
						n.push(o);
					}n.push(t);
				}, parse: function parse(t, r, n) {
					for (var o = [], i = !1, s = null; r.length > 0;) {
						if ((s = r.pop()).type && s.type == e.expression.type.array.start) {
							i = !0;break;
						}o.unshift(s);
					}if (!i) throw new e.Error("Expected end of array.");r.push(o);
				} }, { type: e.expression.type.object.start, regex: /^\{/, next: e.expression.set.expressions.concat([e.expression.type.object.end]), compile: e.expression.fn.compile.push_both, parse: e.expression.fn.parse.push }, { type: e.expression.type.object.end, regex: /^\}/, next: e.expression.set.operations_extended, compile: function compile(t, r, n) {
					for (var o, i = r.length - 1; i >= 0 && (!(o = r.pop()) || o.type !== e.expression.type.object.start); i--) {
						n.push(o);
					}n.push(t);
				}, parse: function parse(t, r, n) {
					for (var o = {}, i = !1, s = null, a = !1, p = null; r.length > 0;) {
						if ((s = r.pop()) && s.type && s.type === e.expression.type.object.start) {
							i = !0;break;
						}if (s && s.type && (s.type === e.expression.type.operator.binary || s.type === e.expression.type.operator.unary) && s.key) {
							if (!a) throw new e.Error("Missing value for key '" + s.key + "' in object definition.");o[s.key] = p, void 0 === o._keys && (o._keys = []), o._keys.unshift(s.key), p = null, a = !1;
						} else a = !0, p = s;
					}if (!i) throw new e.Error("Unexpected end of object.");r.push(o);
				} }, { type: e.expression.type.filter, regex: /^\|\s?([a-zA-Z_][a-zA-Z0-9_\-]*)/, next: e.expression.set.operations_extended.concat([e.expression.type.parameter.start]), compile: function compile(e, t, r) {
					e.value = e.match[1], r.push(e);
				}, parse: function parse(r, n, o) {
					var i = this,
					    s = n.pop();return t(this, r.params, o).then(function (t) {
						return e.filter.call(i, r.value, s, t);
					}).then(function (e) {
						n.push(e);
					});
				} }, { type: e.expression.type._function, regex: /^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/, next: e.expression.type.parameter.start, validate: function validate(t, r) {
					return t[1] && e.indexOf(e.expression.reservedWords, t[1]) < 0;
				}, transform: function transform(e, t) {
					return "(";
				}, compile: function compile(e, t, r) {
					var n = e.match[1];e.fn = n, delete e.match, delete e.value, r.push(e);
				}, parse: function parse(r, n, o) {
					var i,
					    s = this,
					    a = r.fn;return t(this, r.params, o).then(function (t) {
						if (e.functions[a]) i = e.functions[a].apply(s, t);else {
							if ("function" != typeof o[a]) throw new e.Error(a + " function does not exist and is not defined in the context");i = o[a].apply(o, t);
						}return i;
					}).then(function (e) {
						n.push(e);
					});
				} }, { type: e.expression.type.variable, regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, next: e.expression.set.operations_extended.concat([e.expression.type.parameter.start]), compile: e.expression.fn.compile.push, validate: function validate(t, r) {
					return e.indexOf(e.expression.reservedWords, t[0]) < 0;
				}, parse: function parse(t, r, n) {
					return e.expression.resolveAsync.call(this, n[t.value], n).then(function (e) {
						r.push(e);
					});
				} }, { type: e.expression.type.key.period, regex: /^\.([a-zA-Z0-9_]+)/, next: e.expression.set.operations_extended.concat([e.expression.type.parameter.start]), compile: function compile(e, t, r) {
					e.key = e.match[1], delete e.match, delete e.value, r.push(e);
				}, parse: function parse(r, n, o, i) {
					var s,
					    a = this,
					    p = r.key,
					    c = n.pop();return t(this, r.params, o).then(function (t) {
						if (null === c || void 0 === c) {
							if (a.options.strict_variables) throw new e.Error("Can't access a key " + p + " on an null or undefined object.");s = void 0;
						} else {
							var r = function r(e) {
								return e.substr(0, 1).toUpperCase() + e.substr(1);
							};s = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && (p in c) ? c[p] : void 0 !== c["get" + r(p)] ? c["get" + r(p)] : void 0 !== c["is" + r(p)] ? c["is" + r(p)] : void 0;
						}return e.expression.resolveAsync.call(a, s, o, t, i, c);
					}).then(function (e) {
						n.push(e);
					});
				} }, { type: e.expression.type.key.brackets, regex: /^\[([^\]\:]*)\]/, next: e.expression.set.operations_extended.concat([e.expression.type.parameter.start]), compile: function compile(t, r, n) {
					var o = t.match[1];delete t.value, delete t.match, t.stack = e.expression.compile({ value: o }).stack, n.push(t);
				}, parse: function parse(r, n, o, i) {
					var s,
					    a,
					    p = this,
					    c = null;return t(this, r.params, o).then(function (t) {
						return c = t, e.expression.parseAsync.call(p, r.stack, o);
					}).then(function (t) {
						if (null === (s = n.pop()) || void 0 === s) {
							if (p.options.strict_variables) throw new e.Error("Can't access a key " + t + " on an null or undefined object.");return null;
						}return a = "object" == (typeof s === "undefined" ? "undefined" : _typeof(s)) && (t in s) ? s[t] : null, e.expression.resolveAsync.call(p, a, s, c, i);
					}).then(function (e) {
						n.push(e);
					});
				} }, { type: e.expression.type._null, regex: /^(null|NULL|none|NONE)/, next: e.expression.set.operations, compile: function compile(e, t, r) {
					delete e.match, e.value = null, r.push(e);
				}, parse: e.expression.fn.parse.push_value }, { type: e.expression.type.context, regex: /^_context/, next: e.expression.set.operations_extended.concat([e.expression.type.parameter.start]), compile: e.expression.fn.compile.push, parse: function parse(e, t, r) {
					t.push(r);
				} }, { type: e.expression.type.bool, regex: /^(true|TRUE|false|FALSE)/, next: e.expression.set.operations, compile: function compile(e, t, r) {
					e.value = "true" === e.match[0].toLowerCase(), delete e.match, r.push(e);
				}, parse: e.expression.fn.parse.push_value }], e.expression.resolveAsync = function (t, r, n, o, i) {
				if ("function" != typeof t) return e.Promise.resolve(t);var s = e.Promise.resolve(n);return o && o.type === e.expression.type.parameter.end && (s = s.then(function () {
					return o.params && e.expression.parseAsync.call(this, o.params, r, !0);
				}).then(function (e) {
					return o.cleanup = !0, e;
				})), s.then(function (e) {
					return t.apply(i || r, e || []);
				});
			}, e.expression.resolve = function (t, r, n, o, i) {
				return e.async.potentiallyAsync(this, !1, function () {
					return e.expression.resolveAsync.call(this, t, r, n, o, i);
				});
			}, e.expression.handler = {}, e.expression.extendType = function (t) {
				e.expression.type[t] = "Twig.expression.type." + t;
			}, e.expression.extend = function (t) {
				if (!t.type) throw new e.Error("Unable to extend logic definition. No type provided for " + t);e.expression.handler[t.type] = t;
			}; e.expression.definitions.length > 0;) {
				e.expression.extend(e.expression.definitions.shift());
			}return e.expression.tokenize = function (t) {
				var r,
				    n,
				    o,
				    i,
				    s,
				    a,
				    p = [],
				    c = 0,
				    l = null,
				    u = [];for (a = function a() {
					for (var t = arguments.length - 2, n = new Array(t); t-- > 0;) {
						n[t] = arguments[t];
					}if (e.log.trace("Twig.expression.tokenize", "Matched a ", r, " regular expression of ", n), l && e.indexOf(l, r) < 0) return u.push(r + " cannot follow a " + p[p.length - 1].type + " at template:" + c + " near '" + n[0].substring(0, 20) + "...'"), n[0];var o = e.expression.handler[r];return o.validate && !o.validate(n, p) ? n[0] : (u = [], p.push({ type: r, value: n[0], match: n }), s = !0, l = i, c += n[0].length, o.transform ? o.transform(n, p) : "");
				}, e.log.debug("Twig.expression.tokenize", "Tokenizing expression ", t); t.length > 0;) {
					for (r in t = t.trim(), e.expression.handler) {
						if (i = e.expression.handler[r].next, n = e.expression.handler[r].regex, e.log.trace("Checking type ", r, " on ", t), s = !1, e.lib.isArray(n)) for (o = n.length; o-- > 0;) {
							t = t.replace(n[o], a);
						} else t = t.replace(n, a);if (s) break;
					}if (!s) throw u.length > 0 ? new e.Error(u.join(" OR ")) : new e.Error("Unable to parse '" + t + "' at template position" + c);
				}return e.log.trace("Twig.expression.tokenize", "Tokenized to ", p), p;
			}, e.expression.compile = function (t) {
				var r = t.value,
				    n = e.expression.tokenize(r),
				    o = null,
				    i = [],
				    s = [],
				    a = null;for (e.log.trace("Twig.expression.compile: ", "Compiling ", r); n.length > 0;) {
					o = n.shift(), a = e.expression.handler[o.type], e.log.trace("Twig.expression.compile: ", "Compiling ", o), a.compile && a.compile(o, s, i), e.log.trace("Twig.expression.compile: ", "Stack is", s), e.log.trace("Twig.expression.compile: ", "Output is", i);
				}for (; s.length > 0;) {
					i.push(s.pop());
				}return e.log.trace("Twig.expression.compile: ", "Final output is", i), t.stack = i, delete t.value, t;
			}, e.expression.parse = function (t, r, n, o) {
				var i = this;e.lib.isArray(t) || (t = [t]);var s = [],
				    a = [],
				    p = e.expression.type.operator.binary;return e.async.potentiallyAsync(this, o, function () {
					return e.async.forEach(t, function (n, o) {
						var c,
						    l = null,
						    u = null;if (!n.cleanup) return t.length > o + 1 && (u = t[o + 1]), (l = e.expression.handler[n.type]).parse && (c = l.parse.call(i, n, s, r, u)), n.type === p && r.loop && a.push(n), c;
					}).then(function () {
						for (var e = a.length, t = null; e-- > 0;) {
							(t = a[e]).params && t.key && delete t.key;
						}if (n) {
							var r = s.splice(0);s.push(r);
						}return s.pop();
					});
				});
			}, e;
		};
	}, function (e, t) {
		e.exports = function (e) {
			return e.compiler = { module: {} }, e.compiler.compile = function (t, r) {
				var n,
				    o = JSON.stringify(t.tokens),
				    i = t.id;if (r.module) {
					if (void 0 === e.compiler.module[r.module]) throw new e.Error("Unable to find module type " + r.module);n = e.compiler.module[r.module](i, o, r.twig);
				} else n = e.compiler.wrap(i, o);return n;
			}, e.compiler.module = { amd: function amd(t, r, n) {
					return 'define(["' + n + '"], function (Twig) {\n\tvar twig, templates;\ntwig = Twig.twig;\ntemplates = ' + e.compiler.wrap(t, r) + "\n\treturn templates;\n});";
				}, node: function node(t, r) {
					return 'var twig = require("twig").twig;\nexports.template = ' + e.compiler.wrap(t, r);
				}, cjs2: function cjs2(t, r, n) {
					return 'module.declare([{ twig: "' + n + '" }], function (require, exports, module) {\n\tvar twig = require("twig").twig;\n\texports.template = ' + e.compiler.wrap(t, r) + "\n});";
				} }, e.compiler.wrap = function (e, t) {
				return 'twig({id:"' + e.replace('"', '\\"') + '", data:' + t + ", precompiled: true});\n";
			}, e;
		};
	}, function (e, t) {
		e.exports = function (e) {
			"use strict";
			function t(t, r) {
				if (t.options.rethrow) throw "string" == typeof r && (r = new e.Error(r)), "TwigException" != r.type || r.file || (r.file = t.id), r;if (e.log.error("Error parsing twig template " + t.id + ": "), r.stack ? e.log.error(r.stack) : e.log.error(r.toString()), e.debug) return r.toString();
			}return e.trace = !1, e.debug = !1, e.cache = !0, e.noop = function () {}, e.placeholders = { parent: "{{|PARENT|}}" }, e.hasIndexOf = Array.prototype.hasOwnProperty("indexOf"), e.indexOf = function (t, r) {
				if (e.hasIndexOf) return t.indexOf(r);if (void 0 === t || null === t) throw new TypeError();var n = Object(t),
				    o = n.length >>> 0;if (0 === o) return -1;var i = 0;if (arguments.length > 0 && ((i = Number(arguments[1])) != i ? i = 0 : 0 !== i && i !== 1 / 0 && i !== -1 / 0 && (i = (i > 0 || -1) * Math.floor(Math.abs(i)))), i >= o) return -1;for (var s = i >= 0 ? i : Math.max(o - Math.abs(i), 0); s < o; s++) {
					if (s in n && n[s] === r) return s;
				}return t == r ? 0 : -1;
			}, e.forEach = function (e, t, r) {
				if (Array.prototype.forEach) return e.forEach(t, r);var n, o;if (null == e) throw new TypeError(" this is null or not defined");var i = Object(e),
				    s = i.length >>> 0;if ("[object Function]" != {}.toString.call(t)) throw new TypeError(t + " is not a function");for (r && (n = r), o = 0; o < s;) {
					var a;o in i && (a = i[o], t.call(n, a, o, i)), o++;
				}
			}, e.merge = function (t, r, n) {
				return e.forEach(Object.keys(r), function (e) {
					(!n || e in t) && (t[e] = r[e]);
				}), t;
			}, e.attempt = function (e, t) {
				try {
					return e();
				} catch (e) {
					return t(e);
				}
			}, e.Error = function (e, t) {
				this.message = e, this.name = "TwigException", this.type = "TwigException", this.file = t;
			}, e.Error.prototype.toString = function () {
				return this.name + ": " + this.message;
			}, e.log = { trace: function trace() {
					e.trace && console && console.log(Array.prototype.slice.call(arguments));
				}, debug: function debug() {
					e.debug && console && console.log(Array.prototype.slice.call(arguments));
				} }, "undefined" != typeof console ? void 0 !== console.error ? e.log.error = function () {
				console.error.apply(console, arguments);
			} : void 0 !== console.log && (e.log.error = function () {
				console.log.apply(console, arguments);
			}) : e.log.error = function () {}, e.ChildContext = function (t) {
				return e.lib.copy(t);
			}, e.token = {}, e.token.type = { output: "output", logic: "logic", comment: "comment", raw: "raw", output_whitespace_pre: "output_whitespace_pre", output_whitespace_post: "output_whitespace_post", output_whitespace_both: "output_whitespace_both", logic_whitespace_pre: "logic_whitespace_pre", logic_whitespace_post: "logic_whitespace_post", logic_whitespace_both: "logic_whitespace_both" }, e.token.definitions = [{ type: e.token.type.raw, open: "{% raw %}", close: "{% endraw %}" }, { type: e.token.type.raw, open: "{% verbatim %}", close: "{% endverbatim %}" }, { type: e.token.type.output_whitespace_pre, open: "{{-", close: "}}" }, { type: e.token.type.output_whitespace_post, open: "{{", close: "-}}" }, { type: e.token.type.output_whitespace_both, open: "{{-", close: "-}}" }, { type: e.token.type.logic_whitespace_pre, open: "{%-", close: "%}" }, { type: e.token.type.logic_whitespace_post, open: "{%", close: "-%}" }, { type: e.token.type.logic_whitespace_both, open: "{%-", close: "-%}" }, { type: e.token.type.output, open: "{{", close: "}}" }, { type: e.token.type.logic, open: "{%", close: "%}" }, { type: e.token.type.comment, open: "{#", close: "#}" }], e.token.strings = ['"', "'"], e.token.findStart = function (t) {
				var r,
				    n,
				    o,
				    i,
				    s = { position: null, def: null },
				    a = null,
				    p = e.token.definitions.length;for (r = 0; r < p; r++) {
					n = e.token.definitions[r], o = t.indexOf(n.open), i = t.indexOf(n.close), e.log.trace("Twig.token.findStart: ", "Searching for ", n.open, " found at ", o), o >= 0 && n.open.length !== n.close.length && i < 0 || (o >= 0 && (null === s.position || o < s.position) ? (s.position = o, s.def = n, a = i) : o >= 0 && null !== s.position && o === s.position && (n.open.length > s.def.open.length ? (s.position = o, s.def = n, a = i) : n.open.length === s.def.open.length && (n.close.length, s.def.close.length, i >= 0 && i < a && (s.position = o, s.def = n, a = i))));
				}return s;
			}, e.token.findEnd = function (t, r, n) {
				for (var o, i, s = null, a = !1, p = 0, c = null, l = null, u = null, f = null, h = null, y = null; !a;) {
					if (c = null, l = null, !((u = t.indexOf(r.close, p)) >= 0)) throw new e.Error("Unable to find closing bracket '" + r.close + "' opened near template position " + n);if (s = u, a = !0, r.type === e.token.type.comment) break;if (r.type === e.token.type.raw) break;for (i = e.token.strings.length, o = 0; o < i; o += 1) {
						(h = t.indexOf(e.token.strings[o], p)) > 0 && h < u && (null === c || h < c) && (c = h, l = e.token.strings[o]);
					}if (null !== c) for (f = c + 1, s = null, a = !1;;) {
						if ((y = t.indexOf(l, f)) < 0) throw "Unclosed string in template";if ("\\" !== t.substr(y - 1, 1)) {
							p = y + 1;break;
						}f = y + 1;
					}
				}return s;
			}, e.tokenize = function (t) {
				for (var r = [], n = 0, o = null, i = null; t.length > 0;) {
					if (o = e.token.findStart(t), e.log.trace("Twig.tokenize: ", "Found token: ", o), null !== o.position) {
						if (o.position > 0 && r.push({ type: e.token.type.raw, value: t.substring(0, o.position) }), t = t.substr(o.position + o.def.open.length), n += o.position + o.def.open.length, i = e.token.findEnd(t, o.def, n), e.log.trace("Twig.tokenize: ", "Token ends at ", i), r.push({ type: o.def.type, value: t.substring(0, i).trim() }), "\n" === t.substr(i + o.def.close.length, 1)) switch (o.def.type) {case "logic_whitespace_pre":case "logic_whitespace_post":case "logic_whitespace_both":case "logic":
								i += 1;}t = t.substr(i + o.def.close.length), n += i + o.def.close.length;
					} else r.push({ type: e.token.type.raw, value: t }), t = "";
				}return r;
			}, e.compile = function (t) {
				var r = this;return e.attempt(function () {
					for (var n = [], o = [], i = [], s = null, a = null, p = null, c = null, l = null, u = null, f = null, h = null, y = null, d = null, g = null, m = null, x = function x(t) {
						e.expression.compile.call(r, t), o.length > 0 ? i.push(t) : n.push(t);
					}, v = function v(t) {
						if (a = e.logic.compile.call(r, t), d = a.type, g = e.logic.handler[d].open, m = e.logic.handler[d].next, e.log.trace("Twig.compile: ", "Compiled logic token to ", a, " next is: ", m, " open is : ", g), void 0 !== g && !g) {
							if (c = o.pop(), f = e.logic.handler[c.type], e.indexOf(f.next, d) < 0) throw new Error(d + " not expected after a " + c.type);c.output = c.output || [], c.output = c.output.concat(i), i = [], y = { type: e.token.type.logic, token: c }, o.length > 0 ? i.push(y) : n.push(y);
						}void 0 !== m && m.length > 0 ? (e.log.trace("Twig.compile: ", "Pushing ", a, " to logic stack."), o.length > 0 && ((c = o.pop()).output = c.output || [], c.output = c.output.concat(i), o.push(c), i = []), o.push(a)) : void 0 !== g && g && (y = { type: e.token.type.logic, token: a }, o.length > 0 ? i.push(y) : n.push(y));
					}; t.length > 0;) {
						switch (s = t.shift(), l = n[n.length - 1], u = i[i.length - 1], h = t[0], e.log.trace("Compiling token ", s), s.type) {case e.token.type.raw:
								o.length > 0 ? i.push(s) : n.push(s);break;case e.token.type.logic:
								v.call(r, s);break;case e.token.type.comment:
								break;case e.token.type.output:
								x.call(r, s);break;case e.token.type.logic_whitespace_pre:case e.token.type.logic_whitespace_post:case e.token.type.logic_whitespace_both:case e.token.type.output_whitespace_pre:case e.token.type.output_whitespace_post:case e.token.type.output_whitespace_both:
								switch (s.type !== e.token.type.output_whitespace_post && s.type !== e.token.type.logic_whitespace_post && (l && l.type === e.token.type.raw && (n.pop(), null === l.value.match(/^\s*$/) && (l.value = l.value.trim(), n.push(l))), u && u.type === e.token.type.raw && (i.pop(), null === u.value.match(/^\s*$/) && (u.value = u.value.trim(), i.push(u)))), s.type) {case e.token.type.output_whitespace_pre:case e.token.type.output_whitespace_post:case e.token.type.output_whitespace_both:
										x.call(r, s);break;case e.token.type.logic_whitespace_pre:case e.token.type.logic_whitespace_post:case e.token.type.logic_whitespace_both:
										v.call(r, s);}s.type !== e.token.type.output_whitespace_pre && s.type !== e.token.type.logic_whitespace_pre && h && h.type === e.token.type.raw && (t.shift(), null === h.value.match(/^\s*$/) && (h.value = h.value.trim(), t.unshift(h)));}e.log.trace("Twig.compile: ", " Output: ", n, " Logic Stack: ", o, " Pending Output: ", i);
					}if (o.length > 0) throw p = o.pop(), new Error("Unable to find an end tag for " + p.type + ", expecting one of " + p.next);return n;
				}, function (t) {
					if (r.options.rethrow) throw "TwigException" != t.type || t.file || (t.file = r.id), t;e.log.error("Error compiling twig template " + r.id + ": "), t.stack ? e.log.error(t.stack) : e.log.error(t.toString());
				});
			}, e.parse = function (r, n, o) {
				var i,
				    s = this,
				    a = [],
				    p = null,
				    c = !0,
				    l = !0;function u(e) {
					a.push(e);
				}function f(e) {
					void 0 !== e.chain && (l = e.chain), void 0 !== e.context && (n = e.context), void 0 !== e.output && a.push(e.output);
				}if (i = e.async.forEach(r, function (t) {
					switch (e.log.debug("Twig.parse: ", "Parsing token: ", t), t.type) {case e.token.type.raw:
							a.push(e.filters.raw(t.value));break;case e.token.type.logic:
							return e.logic.parseAsync.call(s, t.token, n, l).then(f);case e.token.type.comment:
							break;case e.token.type.output_whitespace_pre:case e.token.type.output_whitespace_post:case e.token.type.output_whitespace_both:case e.token.type.output:
							return e.log.debug("Twig.parse: ", "Output token: ", t.stack), e.expression.parseAsync.call(s, t.stack, n).then(u);}
				}).then(function () {
					return a = e.output.call(s, a), c = !1, a;
				}).catch(function (e) {
					o && t(s, e), p = e;
				}), o) return i;if (null !== p) return t(this, p);if (c) throw new e.Error("You are using Twig.js in sync mode in combination with async extensions.");return a;
			}, e.prepare = function (t) {
				var r, n;return e.log.debug("Twig.prepare: ", "Tokenizing ", t), n = e.tokenize.call(this, t), e.log.debug("Twig.prepare: ", "Compiling ", n), r = e.compile.call(this, n), e.log.debug("Twig.prepare: ", "Compiled ", r), r;
			}, e.output = function (t) {
				var r = this.options.autoescape;if (!r) return t.join("");var n = "string" == typeof r ? r : "html",
				    o = 0,
				    i = t.length,
				    s = "",
				    a = new Array(i);for (o = 0; o < i; o++) {
					(s = t[o]) && !0 !== s.twig_markup && s.twig_markup != n && (s = e.filters.escape(s, [n])), a[o] = s;
				}return a.length < 1 ? "" : e.Markup(a.join(""), !0);
			}, e.Templates = { loaders: {}, parsers: {}, registry: {} }, e.validateId = function (t) {
				if ("prototype" === t) throw new e.Error(t + " is not a valid twig identifier");if (e.cache && e.Templates.registry.hasOwnProperty(t)) throw new e.Error("There is already a template with the ID " + t);return !0;
			}, e.Templates.registerLoader = function (t, r, n) {
				if ("function" != typeof r) throw new e.Error("Unable to add loader for " + t + ": Invalid function reference given.");n && (r = r.bind(n)), this.loaders[t] = r;
			}, e.Templates.unRegisterLoader = function (e) {
				this.isRegisteredLoader(e) && delete this.loaders[e];
			}, e.Templates.isRegisteredLoader = function (e) {
				return this.loaders.hasOwnProperty(e);
			}, e.Templates.registerParser = function (t, r, n) {
				if ("function" != typeof r) throw new e.Error("Unable to add parser for " + t + ": Invalid function regerence given.");n && (r = r.bind(n)), this.parsers[t] = r;
			}, e.Templates.unRegisterParser = function (e) {
				this.isRegisteredParser(e) && delete this.parsers[e];
			}, e.Templates.isRegisteredParser = function (e) {
				return this.parsers.hasOwnProperty(e);
			}, e.Templates.save = function (t) {
				if (void 0 === t.id) throw new e.Error("Unable to save template with no id");e.Templates.registry[t.id] = t;
			}, e.Templates.load = function (t) {
				return e.Templates.registry.hasOwnProperty(t) ? e.Templates.registry[t] : null;
			}, e.Templates.loadRemote = function (t, r, n, o) {
				var i = void 0 === r.id ? t : r.id,
				    s = e.Templates.registry[i];return e.cache && void 0 !== s ? ("function" == typeof n && n(s), s) : (r.parser = r.parser || "twig", r.id = i, void 0 === r.async && (r.async = !0), (this.loaders[r.method] || this.loaders.fs).call(this, t, r, n, o));
			}, e.Template = function (t) {
				var r,
				    n,
				    o,
				    i = t.data,
				    s = t.id,
				    a = t.blocks,
				    p = t.macros || {},
				    c = t.base,
				    l = t.path,
				    u = t.url,
				    f = t.name,
				    h = t.method,
				    y = t.options;this.id = s, this.method = h, this.base = c, this.path = l, this.url = u, this.name = f, this.macros = p, this.options = y, this.reset(a), r = "String", n = i, o = Object.prototype.toString.call(n).slice(8, -1), this.tokens = void 0 !== n && null !== n && o === r ? e.prepare.call(this, i) : i, void 0 !== s && e.Templates.save(this);
			}, e.Template.prototype.reset = function (t) {
				e.log.debug("Twig.Template.reset", "Reseting template " + this.id), this.blocks = {}, this.importedBlocks = [], this.originalBlockTokens = {}, this.child = { blocks: t || {} }, this.extend = null, this.parseStack = [];
			}, e.Template.prototype.render = function (t, r, n) {
				var o = this;return this.context = t || {}, this.reset(), r && r.blocks && (this.blocks = r.blocks), r && r.macros && (this.macros = r.macros), e.async.potentiallyAsync(this, n, function () {
					return e.parseAsync.call(this, this.tokens, this.context).then(function (t) {
						var n, i;return o.extend ? (o.options.allowInlineIncludes && (n = e.Templates.load(o.extend)) && (n.options = o.options), n || (i = e.path.parsePath(o, o.extend), n = e.Templates.loadRemote(i, { method: o.getLoaderMethod(), base: o.base, async: !1, id: i, options: o.options })), o.parent = n, o.parent.renderAsync(o.context, { blocks: o.blocks })) : r ? "blocks" == r.output ? o.blocks : "macros" == r.output ? o.macros : t : t;
					});
				});
			}, e.Template.prototype.importFile = function (t) {
				var r, n;if (!this.url && this.options.allowInlineIncludes) {
					if (t = this.path ? e.path.parsePath(this, t) : t, !(n = e.Templates.load(t)) && !(n = e.Templates.loadRemote(r, { id: t, method: this.getLoaderMethod(), async: !1, path: t, options: this.options }))) throw new e.Error("Unable to find the template " + t);return n.options = this.options, n;
				}return r = e.path.parsePath(this, t), e.Templates.loadRemote(r, { method: this.getLoaderMethod(), base: this.base, async: !1, options: this.options, id: r });
			}, e.Template.prototype.importBlocks = function (t, r) {
				var n = this.importFile(t),
				    o = this.context,
				    i = this;r = r || !1, n.render(o), e.forEach(Object.keys(n.blocks), function (e) {
					(r || void 0 === i.blocks[e]) && (i.blocks[e] = n.blocks[e], i.importedBlocks.push(e));
				});
			}, e.Template.prototype.importMacros = function (t) {
				var r = e.path.parsePath(this, t);return e.Templates.loadRemote(r, { method: this.getLoaderMethod(), async: !1, id: r });
			}, e.Template.prototype.getLoaderMethod = function () {
				return this.path ? "fs" : this.url ? "ajax" : this.method || "fs";
			}, e.Template.prototype.compile = function (t) {
				return e.compiler.compile(this, t);
			}, e.Markup = function (e, t) {
				if ("string" != typeof e || e.length < 1) return e;var r = new String(e);return r.twig_markup = void 0 === t || t, r;
			}, e;
		};
	}, function (e, t, r) {
		/**
   * Twig.js
   *
   * @copyright 2011-2016 John Roepke and the Twig.js Contributors
   * @license   Available under the BSD 2-Clause License
   * @link      https://github.com/twigjs/twig.js
   */
		var n = { VERSION: "1.12.0" };r(27)(n), r(26)(n), r(25)(n), r(23)(n), r(22)(n), r(21)(n), r(12)(n), r(11)(n), r(8)(n), r(7)(n), r(6)(n), r(5)(n), r(4)(n), r(3)(n), r(2)(n), e.exports = n.exports;
	}]);
});
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

	sky.Twig = Twig;
	Twig.options = Twig.options || {};
	Twig.options.rethrow = true;
	//
	// /* Exceptions remake */
	// Twig.log.error = function(text) {
	// 	throw new sky.exceptions.system.Error(text);
	// };

	/* Special import tag */
	Twig.exports.extendTag({

		type: Twig.logic.type.import_,
		regex: /^import\s+(.+)\s+as\s+([a-zA-Z0-9_]+)$/,
		next: [],
		open: true,
		compile: function compile(token) {
			var expression = token.match[1].trim(),
			    contextName = token.match[2].trim();
			delete token.match;

			token.expression = expression;
			token.contextName = contextName;

			token.stack = Twig.expression.compile.call(this, {
				type: Twig.expression.type.expression,
				value: expression
			}).stack;

			return token;
		},
		parse: function parse(token, context, chain) {

			if (token.expression === '_self') {
				context[token.contextName] = this.macros;
				return Twig.Promise.resolve({ chain: chain, output: '' });
			}

			var template = sky.service("templates").load(token.expression),
			    compiled = new Twig.Template({ data: template });

			compiled.options = {};
			context[token.contextName] = compiled.render({ globals: sky.service("templates").globals }, { output: 'macros' });

			return { chain: chain, output: '' };
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
