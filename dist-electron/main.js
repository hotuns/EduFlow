var Td = Object.defineProperty;
var Yc = (e) => {
  throw TypeError(e);
};
var kd = (e, r, t) => r in e ? Td(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var sn = (e, r, t) => kd(e, typeof r != "symbol" ? r + "" : r, t), Jc = (e, r, t) => r.has(e) || Yc("Cannot " + t);
var Me = (e, r, t) => (Jc(e, r, "read from private field"), t ? t.call(e) : r.get(e)), cn = (e, r, t) => r.has(e) ? Yc("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), on = (e, r, t, a) => (Jc(e, r, "write to private field"), a ? a.call(e, t) : r.set(e, t), t);
import hl, { app as Ha, ipcMain as js, BrowserWindow as dl, Menu as Sd } from "electron";
import { createRequire as Ad } from "node:module";
import { fileURLToPath as $d } from "node:url";
import ye from "node:path";
import Ct from "fs";
import er from "node:process";
import { promisify as pr, isDeepStrictEqual as Fd } from "node:util";
import Se from "node:fs";
import fn from "node:crypto";
import Cd from "node:assert";
import Vs from "node:os";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var pl = 1252, Rd = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], f0 = {
  /*::[*/
  0: 1252,
  /* ANSI */
  /*::[*/
  1: 65001,
  /* DEFAULT */
  /*::[*/
  2: 65001,
  /* SYMBOL */
  /*::[*/
  77: 1e4,
  /* MAC */
  /*::[*/
  128: 932,
  /* SHIFTJIS */
  /*::[*/
  129: 949,
  /* HANGUL */
  /*::[*/
  130: 1361,
  /* JOHAB */
  /*::[*/
  134: 936,
  /* GB2312 */
  /*::[*/
  136: 950,
  /* CHINESEBIG5 */
  /*::[*/
  161: 1253,
  /* GREEK */
  /*::[*/
  162: 1254,
  /* TURKISH */
  /*::[*/
  163: 1258,
  /* VIETNAMESE */
  /*::[*/
  177: 1255,
  /* HEBREW */
  /*::[*/
  178: 1256,
  /* ARABIC */
  /*::[*/
  186: 1257,
  /* BALTIC */
  /*::[*/
  204: 1251,
  /* RUSSIAN */
  /*::[*/
  222: 874,
  /* THAI */
  /*::[*/
  238: 1250,
  /* EASTEUROPE */
  /*::[*/
  255: 1252,
  /* OEM */
  /*::[*/
  69: 6969
  /* MISC */
}, l0 = function(e) {
  Rd.indexOf(e) != -1 && (pl = f0[0] = e);
};
function Od() {
  l0(1252);
}
var ct = function(e) {
  l0(e);
};
function ml() {
  ct(1200), Od();
}
function Zc(e) {
  for (var r = [], t = 0, a = e.length; t < a; ++t) r[t] = e.charCodeAt(t);
  return r;
}
function Id(e) {
  for (var r = [], t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8));
  return r.join("");
}
function xl(e) {
  for (var r = [], t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
  return r.join("");
}
var dn = function(e) {
  var r = e.charCodeAt(0), t = e.charCodeAt(1);
  return r == 255 && t == 254 ? Id(e.slice(2)) : r == 254 && t == 255 ? xl(e.slice(2)) : r == 65279 ? e.slice(1) : e;
}, Zn = function(r) {
  return String.fromCharCode(r);
}, Qc = function(r) {
  return String.fromCharCode(r);
}, Wt, Yt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function eo(e) {
  for (var r = "", t = 0, a = 0, n = 0, s = 0, i = 0, c = 0, o = 0, f = 0; f < e.length; )
    t = e.charCodeAt(f++), s = t >> 2, a = e.charCodeAt(f++), i = (t & 3) << 4 | a >> 4, n = e.charCodeAt(f++), c = (a & 15) << 2 | n >> 6, o = n & 63, isNaN(a) ? c = o = 64 : isNaN(n) && (o = 64), r += Yt.charAt(s) + Yt.charAt(i) + Yt.charAt(c) + Yt.charAt(o);
  return r;
}
function Gr(e) {
  var r = "", t = 0, a = 0, n = 0, s = 0, i = 0, c = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var f = 0; f < e.length; )
    s = Yt.indexOf(e.charAt(f++)), i = Yt.indexOf(e.charAt(f++)), t = s << 2 | i >> 4, r += String.fromCharCode(t), c = Yt.indexOf(e.charAt(f++)), a = (i & 15) << 4 | c >> 2, c !== 64 && (r += String.fromCharCode(a)), o = Yt.indexOf(e.charAt(f++)), n = (c & 3) << 6 | o, o !== 64 && (r += String.fromCharCode(n));
  return r;
}
var Fe = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), ya = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(r, t) {
      return t ? new Buffer(r, t) : new Buffer(r);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function ra(e) {
  return Fe ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function ro(e) {
  return Fe ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var st = function(r) {
  return Fe ? ya(r, "binary") : r.split("").map(function(t) {
    return t.charCodeAt(0) & 255;
  });
};
function wa(e) {
  if (Array.isArray(e)) return e.map(function(a) {
    return String.fromCharCode(a);
  }).join("");
  for (var r = [], t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
  return r.join("");
}
function u0(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return u0(new Uint8Array(e));
  for (var r = new Array(e.length), t = 0; t < e.length; ++t) r[t] = e[t];
  return r;
}
var Xt = Fe ? function(e) {
  return Buffer.concat(e.map(function(r) {
    return Buffer.isBuffer(r) ? r : ya(r);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var r = 0, t = 0;
    for (r = 0; r < e.length; ++r) t += e[r].length;
    var a = new Uint8Array(t), n = 0;
    for (r = 0, t = 0; r < e.length; t += n, ++r)
      if (n = e[r].length, e[r] instanceof Uint8Array) a.set(e[r], t);
      else {
        if (typeof e[r] == "string")
          throw "wtf";
        a.set(new Uint8Array(e[r]), t);
      }
    return a;
  }
  return [].concat.apply([], e.map(function(s) {
    return Array.isArray(s) ? s : [].slice.call(s);
  }));
};
function Pd(e) {
  for (var r = [], t = 0, a = e.length + 250, n = ra(e.length + 255), s = 0; s < e.length; ++s) {
    var i = e.charCodeAt(s);
    if (i < 128) n[t++] = i;
    else if (i < 2048)
      n[t++] = 192 | i >> 6 & 31, n[t++] = 128 | i & 63;
    else if (i >= 55296 && i < 57344) {
      i = (i & 1023) + 64;
      var c = e.charCodeAt(++s) & 1023;
      n[t++] = 240 | i >> 8 & 7, n[t++] = 128 | i >> 2 & 63, n[t++] = 128 | c >> 6 & 15 | (i & 3) << 4, n[t++] = 128 | c & 63;
    } else
      n[t++] = 224 | i >> 12 & 15, n[t++] = 128 | i >> 6 & 63, n[t++] = 128 | i & 63;
    t > a && (r.push(n.slice(0, t)), t = 0, n = ra(65535), a = 65530);
  }
  return r.push(n.slice(0, t)), Xt(r);
}
var Rr = /\u0000/g, pn = /[\u0001-\u0006]/g;
function Ma(e) {
  for (var r = "", t = e.length - 1; t >= 0; ) r += e.charAt(t--);
  return r;
}
function ot(e, r) {
  var t = "" + e;
  return t.length >= r ? t : He("0", r - t.length) + t;
}
function h0(e, r) {
  var t = "" + e;
  return t.length >= r ? t : He(" ", r - t.length) + t;
}
function Ss(e, r) {
  var t = "" + e;
  return t.length >= r ? t : t + He(" ", r - t.length);
}
function Nd(e, r) {
  var t = "" + Math.round(e);
  return t.length >= r ? t : He("0", r - t.length) + t;
}
function bd(e, r) {
  var t = "" + e;
  return t.length >= r ? t : He("0", r - t.length) + t;
}
var to = /* @__PURE__ */ Math.pow(2, 32);
function Fa(e, r) {
  if (e > to || e < -to) return Nd(e, r);
  var t = Math.round(e);
  return bd(t, r);
}
function As(e, r) {
  return r = r || 0, e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108;
}
var ao = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], di = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function Dd(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Ee = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, no = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, Ld = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function $s(e, r, t) {
  for (var a = e < 0 ? -1 : 1, n = e * a, s = 0, i = 1, c = 0, o = 1, f = 0, l = 0, u = Math.floor(n); f < r && (u = Math.floor(n), c = u * i + s, l = u * f + o, !(n - u < 5e-8)); )
    n = 1 / (n - u), s = i, i = c, o = f, f = l;
  if (l > r && (f > r ? (l = o, c = s) : (l = f, c = i)), !t) return [0, a * c, l];
  var p = Math.floor(a * c / l);
  return [p, a * c - p * l, l];
}
function ha(e, r, t) {
  if (e > 2958465 || e < 0) return null;
  var a = e | 0, n = Math.floor(86400 * (e - a)), s = 0, i = [], c = { D: a, T: n, u: 86400 * (e - a) - n, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(c.u) < 1e-6 && (c.u = 0), r && r.date1904 && (a += 1462), c.u > 0.9999 && (c.u = 0, ++n == 86400 && (c.T = n = 0, ++a, ++c.D)), a === 60)
    i = t ? [1317, 10, 29] : [1900, 2, 29], s = 3;
  else if (a === 0)
    i = t ? [1317, 8, 29] : [1900, 1, 0], s = 6;
  else {
    a > 60 && --a;
    var o = new Date(1900, 0, 1);
    o.setDate(o.getDate() + a - 1), i = [o.getFullYear(), o.getMonth() + 1, o.getDate()], s = o.getDay(), a < 60 && (s = (s + 6) % 7), t && (s = Hd(o, i));
  }
  return c.y = i[0], c.m = i[1], c.d = i[2], c.S = n % 60, n = Math.floor(n / 60), c.M = n % 60, n = Math.floor(n / 60), c.H = n, c.q = s, c;
}
var vl = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Md = /* @__PURE__ */ vl.getTime(), Bd = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function gl(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  return r ? t -= 1461 * 24 * 60 * 60 * 1e3 : e >= Bd && (t += 24 * 60 * 60 * 1e3), (t - (Md + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ vl.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function d0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Ud(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function jd(e) {
  var r = e < 0 ? 12 : 11, t = d0(e.toFixed(12));
  return t.length <= r || (t = e.toPrecision(10), t.length <= r) ? t : e.toExponential(5);
}
function Vd(e) {
  var r = d0(e.toFixed(11));
  return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r;
}
function Pn(e) {
  var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), t;
  return r >= -4 && r <= -1 ? t = e.toPrecision(10 + r) : Math.abs(r) <= 9 ? t = jd(e) : r === 10 ? t = e.toFixed(10).substr(0, 12) : t = Vd(e), d0(Ud(t.toUpperCase()));
}
function ma(e, r) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : Pn(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return Qr(14, gl(e, r && r.date1904), r);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Hd(e, r) {
  r[0] -= 581;
  var t = e.getDay();
  return e < 60 && (t = (t + 6) % 7), t;
}
function Gd(e, r, t, a) {
  var n = "", s = 0, i = 0, c = t.y, o, f = 0;
  switch (e) {
    case 98:
      c = t.y + 543;
    case 121:
      switch (r.length) {
        case 1:
        case 2:
          o = c % 100, f = 2;
          break;
        default:
          o = c % 1e4, f = 4;
          break;
      }
      break;
    case 109:
      switch (r.length) {
        case 1:
        case 2:
          o = t.m, f = r.length;
          break;
        case 3:
          return di[t.m - 1][1];
        case 5:
          return di[t.m - 1][0];
        default:
          return di[t.m - 1][2];
      }
      break;
    case 100:
      switch (r.length) {
        case 1:
        case 2:
          o = t.d, f = r.length;
          break;
        case 3:
          return ao[t.q][0];
        default:
          return ao[t.q][1];
      }
      break;
    case 104:
      switch (r.length) {
        case 1:
        case 2:
          o = 1 + (t.H + 11) % 12, f = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 72:
      switch (r.length) {
        case 1:
        case 2:
          o = t.H, f = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 77:
      switch (r.length) {
        case 1:
        case 2:
          o = t.M, f = r.length;
          break;
        default:
          throw "bad minute format: " + r;
      }
      break;
    case 115:
      if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
      return t.u === 0 && (r == "s" || r == "ss") ? ot(t.S, r.length) : (a >= 2 ? i = a === 3 ? 1e3 : 100 : i = a === 1 ? 10 : 1, s = Math.round(i * (t.S + t.u)), s >= 60 * i && (s = 0), r === "s" ? s === 0 ? "0" : "" + s / i : (n = ot(s, 2 + a), r === "ss" ? n.substr(0, 2) : "." + n.substr(2, r.length - 1)));
    case 90:
      switch (r) {
        case "[h]":
        case "[hh]":
          o = t.D * 24 + t.H;
          break;
        case "[m]":
        case "[mm]":
          o = (t.D * 24 + t.H) * 60 + t.M;
          break;
        case "[s]":
        case "[ss]":
          o = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
          break;
        default:
          throw "bad abstime format: " + r;
      }
      f = r.length === 3 ? 1 : 2;
      break;
    case 101:
      o = c, f = 1;
      break;
  }
  var l = f > 0 ? ot(o, f) : "";
  return l;
}
function Jt(e) {
  var r = 3;
  if (e.length <= r) return e;
  for (var t = e.length % r, a = e.substr(0, t); t != e.length; t += r) a += (a.length > 0 ? "," : "") + e.substr(t, r);
  return a;
}
var _l = /%/g;
function zd(e, r, t) {
  var a = r.replace(_l, ""), n = r.length - a.length;
  return Ot(e, a, t * Math.pow(10, 2 * n)) + He("%", n);
}
function Wd(e, r, t) {
  for (var a = r.length - 1; r.charCodeAt(a - 1) === 44; ) --a;
  return Ot(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)));
}
function El(e, r) {
  var t, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + El(e, -r);
    var n = e.indexOf(".");
    n === -1 && (n = e.indexOf("E"));
    var s = Math.floor(Math.log(r) * Math.LOG10E) % n;
    if (s < 0 && (s += n), t = (r / Math.pow(10, s)).toPrecision(a + 1 + (n + s) % n), t.indexOf("e") === -1) {
      var i = Math.floor(Math.log(r) * Math.LOG10E);
      for (t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (i - t.length + s) : t += "E+" + (i - s); t.substr(0, 2) === "0."; )
        t = t.charAt(0) + t.substr(2, n) + "." + t.substr(2 + n), t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(c, o, f, l) {
      return o + f + l.substr(0, (n + s) % n) + "." + l.substr(s) + "E";
    });
  } else t = r.toExponential(a);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
var yl = /# (\?+)( ?)\/( ?)(\d+)/;
function Xd(e, r, t) {
  var a = parseInt(e[4], 10), n = Math.round(r * a), s = Math.floor(n / a), i = n - s * a, c = a;
  return t + (s === 0 ? "" : "" + s) + " " + (i === 0 ? He(" ", e[1].length + 1 + e[4].length) : h0(i, e[1].length) + e[2] + "/" + e[3] + ot(c, e[4].length));
}
function Kd(e, r, t) {
  return t + (r === 0 ? "" : "" + r) + He(" ", e[1].length + 2 + e[4].length);
}
var wl = /^#*0*\.([0#]+)/, Tl = /\).*[0#]/, kl = /\(###\) ###\\?-####/;
function Ar(e) {
  for (var r = "", t, a = 0; a != e.length; ++a) switch (t = e.charCodeAt(a)) {
    case 35:
      break;
    case 63:
      r += " ";
      break;
    case 48:
      r += "0";
      break;
    default:
      r += String.fromCharCode(t);
  }
  return r;
}
function so(e, r) {
  var t = Math.pow(10, r);
  return "" + Math.round(e * t) / t;
}
function io(e, r) {
  var t = e - Math.floor(e), a = Math.pow(10, r);
  return r < ("" + Math.round(t * a)).length ? 0 : Math.round(t * a);
}
function qd(e, r) {
  return r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length ? 1 : 0;
}
function Yd(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function qr(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(Tl)) {
    var a = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? qr("n", a, t) : "(" + qr("n", a, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return Wd(e, r, t);
  if (r.indexOf("%") !== -1) return zd(e, r, t);
  if (r.indexOf("E") !== -1) return El(r, t);
  if (r.charCodeAt(0) === 36) return "$" + qr(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var n, s, i, c, o = Math.abs(t), f = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return f + Fa(o, r.length);
  if (r.match(/^[#?]+$/))
    return n = Fa(t, 0), n === "0" && (n = ""), n.length > r.length ? n : Ar(r.substr(0, r.length - n.length)) + n;
  if (s = r.match(yl)) return Xd(s, o, f);
  if (r.match(/^#+0+$/)) return f + Fa(o, r.length - r.indexOf("0"));
  if (s = r.match(wl))
    return n = so(t, s[1].length).replace(/^([^\.]+)$/, "$1." + Ar(s[1])).replace(/\.$/, "." + Ar(s[1])).replace(/\.(\d*)$/, function(d, m) {
      return "." + m + He("0", Ar(
        /*::(*/
        s[1]
      ).length - m.length);
    }), r.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), s = r.match(/^(0*)\.(#*)$/))
    return f + so(o, s[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, s[1].length ? "0." : ".");
  if (s = r.match(/^#{1,3},##0(\.?)$/)) return f + Jt(Fa(o, 0));
  if (s = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + qr(e, r, -t) : Jt("" + (Math.floor(t) + qd(t, s[1].length))) + "." + ot(io(t, s[1].length), s[1].length);
  if (s = r.match(/^#,#*,#0/)) return qr(e, r.replace(/^#,#*,/, ""), t);
  if (s = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Ma(qr(e, r.replace(/[\\-]/g, ""), t)), i = 0, Ma(Ma(r.replace(/\\/g, "")).replace(/[0#]/g, function(d) {
      return i < n.length ? n.charAt(i++) : d === "0" ? "0" : "";
    }));
  if (r.match(kl))
    return n = qr(e, "##########", t), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var l = "";
  if (s = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(
      /*::String(*/
      s[4].length,
      7
    ), c = $s(o, Math.pow(10, i) - 1, !1), n = "" + f, l = Ot(
      "n",
      /*::String(*/
      s[1],
      c[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), n += l + /*::String(*/
    s[2] + "/" + /*::String(*/
    s[3], l = Ss(c[2], i), l.length < s[4].length && (l = Ar(s[4].substr(s[4].length - l.length)) + l), n += l, n;
  if (s = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(Math.max(s[1].length, s[4].length), 7), c = $s(o, Math.pow(10, i) - 1, !0), f + (c[0] || (c[1] ? "" : "0")) + " " + (c[1] ? h0(c[1], i) + s[2] + "/" + s[3] + Ss(c[2], i) : He(" ", 2 * i + 1 + s[2].length + s[3].length));
  if (s = r.match(/^[#0?]+$/))
    return n = Fa(t, 0), r.length <= n.length ? n : Ar(r.substr(0, r.length - n.length)) + n;
  if (s = r.match(/^([#0?]+)\.([#0]+)$/)) {
    n = "" + t.toFixed(Math.min(s[2].length, 10)).replace(/([^0])0+$/, "$1"), i = n.indexOf(".");
    var u = r.indexOf(".") - i, p = r.length - n.length - u;
    return Ar(r.substr(0, u) + n + r.substr(r.length - p));
  }
  if (s = r.match(/^00,000\.([#0]*0)$/))
    return i = io(t, s[1].length), t < 0 ? "-" + qr(e, r, -t) : Jt(Yd(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(d) {
      return "00," + (d.length < 3 ? ot(0, 3 - d.length) : "") + d;
    }) + "." + ot(i, s[1].length);
  switch (r) {
    case "###,##0.00":
      return qr(e, "#,##0.00", t);
    case "###,###":
    case "##,###":
    case "#,###":
      var h = Jt(Fa(o, 0));
      return h !== "0" ? f + h : "";
    case "###,###.00":
      return qr(e, "###,##0.00", t).replace(/^0\./, ".");
    case "#,###.00":
      return qr(e, "#,##0.00", t).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + r + "|");
}
function Jd(e, r, t) {
  for (var a = r.length - 1; r.charCodeAt(a - 1) === 44; ) --a;
  return Ot(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)));
}
function Zd(e, r, t) {
  var a = r.replace(_l, ""), n = r.length - a.length;
  return Ot(e, a, t * Math.pow(10, 2 * n)) + He("%", n);
}
function Sl(e, r) {
  var t, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + Sl(e, -r);
    var n = e.indexOf(".");
    n === -1 && (n = e.indexOf("E"));
    var s = Math.floor(Math.log(r) * Math.LOG10E) % n;
    if (s < 0 && (s += n), t = (r / Math.pow(10, s)).toPrecision(a + 1 + (n + s) % n), !t.match(/[Ee]/)) {
      var i = Math.floor(Math.log(r) * Math.LOG10E);
      t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (i - t.length + s) : t += "E+" + (i - s), t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(c, o, f, l) {
      return o + f + l.substr(0, (n + s) % n) + "." + l.substr(s) + "E";
    });
  } else t = r.toExponential(a);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
function dt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(Tl)) {
    var a = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? dt("n", a, t) : "(" + dt("n", a, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return Jd(e, r, t);
  if (r.indexOf("%") !== -1) return Zd(e, r, t);
  if (r.indexOf("E") !== -1) return Sl(r, t);
  if (r.charCodeAt(0) === 36) return "$" + dt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var n, s, i, c, o = Math.abs(t), f = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return f + ot(o, r.length);
  if (r.match(/^[#?]+$/))
    return n = "" + t, t === 0 && (n = ""), n.length > r.length ? n : Ar(r.substr(0, r.length - n.length)) + n;
  if (s = r.match(yl)) return Kd(s, o, f);
  if (r.match(/^#+0+$/)) return f + ot(o, r.length - r.indexOf("0"));
  if (s = r.match(wl))
    return n = ("" + t).replace(/^([^\.]+)$/, "$1." + Ar(s[1])).replace(/\.$/, "." + Ar(s[1])), n = n.replace(/\.(\d*)$/, function(d, m) {
      return "." + m + He("0", Ar(s[1]).length - m.length);
    }), r.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), s = r.match(/^(0*)\.(#*)$/))
    return f + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, s[1].length ? "0." : ".");
  if (s = r.match(/^#{1,3},##0(\.?)$/)) return f + Jt("" + o);
  if (s = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + dt(e, r, -t) : Jt("" + t) + "." + He("0", s[1].length);
  if (s = r.match(/^#,#*,#0/)) return dt(e, r.replace(/^#,#*,/, ""), t);
  if (s = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Ma(dt(e, r.replace(/[\\-]/g, ""), t)), i = 0, Ma(Ma(r.replace(/\\/g, "")).replace(/[0#]/g, function(d) {
      return i < n.length ? n.charAt(i++) : d === "0" ? "0" : "";
    }));
  if (r.match(kl))
    return n = dt(e, "##########", t), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var l = "";
  if (s = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(
      /*::String(*/
      s[4].length,
      7
    ), c = $s(o, Math.pow(10, i) - 1, !1), n = "" + f, l = Ot(
      "n",
      /*::String(*/
      s[1],
      c[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), n += l + /*::String(*/
    s[2] + "/" + /*::String(*/
    s[3], l = Ss(c[2], i), l.length < s[4].length && (l = Ar(s[4].substr(s[4].length - l.length)) + l), n += l, n;
  if (s = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(Math.max(s[1].length, s[4].length), 7), c = $s(o, Math.pow(10, i) - 1, !0), f + (c[0] || (c[1] ? "" : "0")) + " " + (c[1] ? h0(c[1], i) + s[2] + "/" + s[3] + Ss(c[2], i) : He(" ", 2 * i + 1 + s[2].length + s[3].length));
  if (s = r.match(/^[#0?]+$/))
    return n = "" + t, r.length <= n.length ? n : Ar(r.substr(0, r.length - n.length)) + n;
  if (s = r.match(/^([#0]+)\.([#0]+)$/)) {
    n = "" + t.toFixed(Math.min(s[2].length, 10)).replace(/([^0])0+$/, "$1"), i = n.indexOf(".");
    var u = r.indexOf(".") - i, p = r.length - n.length - u;
    return Ar(r.substr(0, u) + n + r.substr(r.length - p));
  }
  if (s = r.match(/^00,000\.([#0]*0)$/))
    return t < 0 ? "-" + dt(e, r, -t) : Jt("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(d) {
      return "00," + (d.length < 3 ? ot(0, 3 - d.length) : "") + d;
    }) + "." + ot(0, s[1].length);
  switch (r) {
    case "###,###":
    case "##,###":
    case "#,###":
      var h = Jt("" + o);
      return h !== "0" ? f + h : "";
    default:
      if (r.match(/\.[0#?]*$/)) return dt(e, r.slice(0, r.lastIndexOf(".")), t) + Ar(r.slice(r.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + r + "|");
}
function Ot(e, r, t) {
  return (t | 0) === t ? dt(e, r, t) : qr(e, r, t);
}
function Qd(e) {
  for (var r = [], t = !1, a = 0, n = 0; a < e.length; ++a) switch (
    /*cc=*/
    e.charCodeAt(a)
  ) {
    case 34:
      t = !t;
      break;
    case 95:
    case 42:
    case 92:
      ++a;
      break;
    case 59:
      r[r.length] = e.substr(n, a - n), n = a + 1;
  }
  if (r[r.length] = e.substr(n), t === !0) throw new Error("Format |" + e + "| unterminated string ");
  return r;
}
var Al = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Xa(e) {
  for (var r = 0, t = "", a = ""; r < e.length; )
    switch (t = e.charAt(r)) {
      case "G":
        As(e, r) && (r += 6), r++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++r) !== 34 && r < e.length;
        )
          ;
        ++r;
        break;
      case "\\":
        r += 2;
        break;
      case "_":
        r += 2;
        break;
      case "@":
        ++r;
        break;
      case "B":
      case "b":
        if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return !0;
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "上":
        if (e.substr(r, 3).toUpperCase() === "A/P" || e.substr(r, 5).toUpperCase() === "AM/PM" || e.substr(r, 5).toUpperCase() === "上午/下午") return !0;
        ++r;
        break;
      case "[":
        for (a = t; e.charAt(r++) !== "]" && r < e.length; ) a += e.charAt(r);
        if (a.match(Al)) return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++r) === t; )
          ;
        break;
      case "*":
        ++r, (e.charAt(r) == " " || e.charAt(r) == "*") && ++r;
        break;
      case "(":
      case ")":
        ++r;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1; )
          ;
        break;
      case " ":
        ++r;
        break;
      default:
        ++r;
        break;
    }
  return !1;
}
function e1(e, r, t, a) {
  for (var n = [], s = "", i = 0, c = "", o = "t", f, l, u, p = "H"; i < e.length; )
    switch (c = e.charAt(i)) {
      case "G":
        if (!As(e, i)) throw new Error("unrecognized character " + c + " in " + e);
        n[n.length] = { t: "G", v: "General" }, i += 7;
        break;
      case '"':
        for (s = ""; (u = e.charCodeAt(++i)) !== 34 && i < e.length; ) s += String.fromCharCode(u);
        n[n.length] = { t: "t", v: s }, ++i;
        break;
      case "\\":
        var h = e.charAt(++i), d = h === "(" || h === ")" ? h : "t";
        n[n.length] = { t: d, v: h }, ++i;
        break;
      case "_":
        n[n.length] = { t: "t", v: " " }, i += 2;
        break;
      case "@":
        n[n.length] = { t: "T", v: r }, ++i;
        break;
      case "B":
      case "b":
        if (e.charAt(i + 1) === "1" || e.charAt(i + 1) === "2") {
          if (f == null && (f = ha(r, t, e.charAt(i + 1) === "2"), f == null))
            return "";
          n[n.length] = { t: "X", v: e.substr(i, 2) }, o = c, i += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        c = c.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (r < 0 || f == null && (f = ha(r, t), f == null))
          return "";
        for (s = c; ++i < e.length && e.charAt(i).toLowerCase() === c; ) s += c;
        c === "m" && o.toLowerCase() === "h" && (c = "M"), c === "h" && (c = p), n[n.length] = { t: c, v: s }, o = c;
        break;
      case "A":
      case "a":
      case "上":
        var m = { t: c, v: c };
        if (f == null && (f = ha(r, t)), e.substr(i, 3).toUpperCase() === "A/P" ? (f != null && (m.v = f.H >= 12 ? "P" : "A"), m.t = "T", p = "h", i += 3) : e.substr(i, 5).toUpperCase() === "AM/PM" ? (f != null && (m.v = f.H >= 12 ? "PM" : "AM"), m.t = "T", i += 5, p = "h") : e.substr(i, 5).toUpperCase() === "上午/下午" ? (f != null && (m.v = f.H >= 12 ? "下午" : "上午"), m.t = "T", i += 5, p = "h") : (m.t = "t", ++i), f == null && m.t === "T") return "";
        n[n.length] = m, o = c;
        break;
      case "[":
        for (s = c; e.charAt(i++) !== "]" && i < e.length; ) s += e.charAt(i);
        if (s.slice(-1) !== "]") throw 'unterminated "[" block: |' + s + "|";
        if (s.match(Al)) {
          if (f == null && (f = ha(r, t), f == null))
            return "";
          n[n.length] = { t: "Z", v: s.toLowerCase() }, o = s.charAt(1);
        } else s.indexOf("$") > -1 && (s = (s.match(/\$([^-\[\]]*)/) || [])[1] || "$", Xa(e) || (n[n.length] = { t: "t", v: s }));
        break;
      case ".":
        if (f != null) {
          for (s = c; ++i < e.length && (c = e.charAt(i)) === "0"; ) s += c;
          n[n.length] = { t: "s", v: s };
          break;
        }
      case "0":
      case "#":
        for (s = c; ++i < e.length && "0#?.,E+-%".indexOf(c = e.charAt(i)) > -1; ) s += c;
        n[n.length] = { t: "n", v: s };
        break;
      case "?":
        for (s = c; e.charAt(++i) === c; ) s += c;
        n[n.length] = { t: c, v: s }, o = c;
        break;
      case "*":
        ++i, (e.charAt(i) == " " || e.charAt(i) == "*") && ++i;
        break;
      case "(":
      case ")":
        n[n.length] = { t: a === 1 ? "t" : c, v: c }, ++i;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (s = c; i < e.length && "0123456789".indexOf(e.charAt(++i)) > -1; ) s += e.charAt(i);
        n[n.length] = { t: "D", v: s };
        break;
      case " ":
        n[n.length] = { t: c, v: c }, ++i;
        break;
      case "$":
        n[n.length] = { t: "t", v: "$" }, ++i;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(c) === -1) throw new Error("unrecognized character " + c + " in " + e);
        n[n.length] = { t: "t", v: c }, ++i;
        break;
    }
  var x = 0, g = 0, T;
  for (i = n.length - 1, o = "t"; i >= 0; --i)
    switch (n[i].t) {
      case "h":
      case "H":
        n[i].t = p, o = "h", x < 1 && (x = 1);
        break;
      case "s":
        (T = n[i].v.match(/\.0+$/)) && (g = Math.max(g, T[0].length - 1)), x < 3 && (x = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        o = n[i].t;
        break;
      case "m":
        o === "s" && (n[i].t = "M", x < 2 && (x = 2));
        break;
      case "X":
        break;
      case "Z":
        x < 1 && n[i].v.match(/[Hh]/) && (x = 1), x < 2 && n[i].v.match(/[Mm]/) && (x = 2), x < 3 && n[i].v.match(/[Ss]/) && (x = 3);
    }
  switch (x) {
    case 0:
      break;
    case 1:
      f.u >= 0.5 && (f.u = 0, ++f.S), f.S >= 60 && (f.S = 0, ++f.M), f.M >= 60 && (f.M = 0, ++f.H);
      break;
    case 2:
      f.u >= 0.5 && (f.u = 0, ++f.S), f.S >= 60 && (f.S = 0, ++f.M);
      break;
  }
  var E = "", I;
  for (i = 0; i < n.length; ++i)
    switch (n[i].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        n[i].v = "", n[i].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        n[i].v = Gd(n[i].t.charCodeAt(0), n[i].v, f, g), n[i].t = "t";
        break;
      case "n":
      case "?":
        for (I = i + 1; n[I] != null && ((c = n[I].t) === "?" || c === "D" || (c === " " || c === "t") && n[I + 1] != null && (n[I + 1].t === "?" || n[I + 1].t === "t" && n[I + 1].v === "/") || n[i].t === "(" && (c === " " || c === "n" || c === ")") || c === "t" && (n[I].v === "/" || n[I].v === " " && n[I + 1] != null && n[I + 1].t == "?")); )
          n[i].v += n[I].v, n[I] = { v: "", t: ";" }, ++I;
        E += n[i].v, i = I - 1;
        break;
      case "G":
        n[i].t = "t", n[i].v = ma(r, t);
        break;
    }
  var D = "", L, C;
  if (E.length > 0) {
    E.charCodeAt(0) == 40 ? (L = r < 0 && E.charCodeAt(0) === 45 ? -r : r, C = Ot("n", E, L)) : (L = r < 0 && a > 1 ? -r : r, C = Ot("n", E, L), L < 0 && n[0] && n[0].t == "t" && (C = C.substr(1), n[0].v = "-" + n[0].v)), I = C.length - 1;
    var z = n.length;
    for (i = 0; i < n.length; ++i) if (n[i] != null && n[i].t != "t" && n[i].v.indexOf(".") > -1) {
      z = i;
      break;
    }
    var U = n.length;
    if (z === n.length && C.indexOf("E") === -1) {
      for (i = n.length - 1; i >= 0; --i)
        n[i] == null || "n?".indexOf(n[i].t) === -1 || (I >= n[i].v.length - 1 ? (I -= n[i].v.length, n[i].v = C.substr(I + 1, n[i].v.length)) : I < 0 ? n[i].v = "" : (n[i].v = C.substr(0, I + 1), I = -1), n[i].t = "t", U = i);
      I >= 0 && U < n.length && (n[U].v = C.substr(0, I + 1) + n[U].v);
    } else if (z !== n.length && C.indexOf("E") === -1) {
      for (I = C.indexOf(".") - 1, i = z; i >= 0; --i)
        if (!(n[i] == null || "n?".indexOf(n[i].t) === -1)) {
          for (l = n[i].v.indexOf(".") > -1 && i === z ? n[i].v.indexOf(".") - 1 : n[i].v.length - 1, D = n[i].v.substr(l + 1); l >= 0; --l)
            I >= 0 && (n[i].v.charAt(l) === "0" || n[i].v.charAt(l) === "#") && (D = C.charAt(I--) + D);
          n[i].v = D, n[i].t = "t", U = i;
        }
      for (I >= 0 && U < n.length && (n[U].v = C.substr(0, I + 1) + n[U].v), I = C.indexOf(".") + 1, i = z; i < n.length; ++i)
        if (!(n[i] == null || "n?(".indexOf(n[i].t) === -1 && i !== z)) {
          for (l = n[i].v.indexOf(".") > -1 && i === z ? n[i].v.indexOf(".") + 1 : 0, D = n[i].v.substr(0, l); l < n[i].v.length; ++l)
            I < C.length && (D += C.charAt(I++));
          n[i].v = D, n[i].t = "t", U = i;
        }
    }
  }
  for (i = 0; i < n.length; ++i) n[i] != null && "n?".indexOf(n[i].t) > -1 && (L = a > 1 && r < 0 && i > 0 && n[i - 1].v === "-" ? -r : r, n[i].v = Ot(n[i].t, n[i].v, L), n[i].t = "t");
  var J = "";
  for (i = 0; i !== n.length; ++i) n[i] != null && (J += n[i].v);
  return J;
}
var co = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function oo(e, r) {
  if (r == null) return !1;
  var t = parseFloat(r[2]);
  switch (r[1]) {
    case "=":
      if (e == t) return !0;
      break;
    case ">":
      if (e > t) return !0;
      break;
    case "<":
      if (e < t) return !0;
      break;
    case "<>":
      if (e != t) return !0;
      break;
    case ">=":
      if (e >= t) return !0;
      break;
    case "<=":
      if (e <= t) return !0;
      break;
  }
  return !1;
}
function r1(e, r) {
  var t = Qd(e), a = t.length, n = t[a - 1].indexOf("@");
  if (a < 4 && n > -1 && --a, t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
  if (typeof r != "number") return [4, t.length === 4 || n > -1 ? t[t.length - 1] : "@"];
  switch (t.length) {
    case 1:
      t = n > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
      break;
    case 2:
      t = n > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
      break;
    case 3:
      t = n > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
      break;
  }
  var s = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
  if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [a, s];
  if (t[0].match(/\[[=<>]/) != null || t[1].match(/\[[=<>]/) != null) {
    var i = t[0].match(co), c = t[1].match(co);
    return oo(r, i) ? [a, t[0]] : oo(r, c) ? [a, t[1]] : [a, t[i != null && c != null ? 2 : 1]];
  }
  return [a, s];
}
function Qr(e, r, t) {
  t == null && (t = {});
  var a = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && t.dateNF ? a = t.dateNF : a = e;
      break;
    case "number":
      e == 14 && t.dateNF ? a = t.dateNF : a = (t.table != null ? t.table : Ee)[e], a == null && (a = t.table && t.table[no[e]] || Ee[no[e]]), a == null && (a = Ld[e] || "General");
      break;
  }
  if (As(a, 0)) return ma(r, t);
  r instanceof Date && (r = gl(r, t.date1904));
  var n = r1(a, r);
  if (As(n[1])) return ma(r, t);
  if (r === !0) r = "TRUE";
  else if (r === !1) r = "FALSE";
  else if (r === "" || r == null) return "";
  return e1(n[1], r, t, n[0]);
}
function da(e, r) {
  if (typeof r != "number") {
    r = +r || -1;
    for (var t = 0; t < 392; ++t) {
      if (Ee[t] == null) {
        r < 0 && (r = t);
        continue;
      }
      if (Ee[t] == e) {
        r = t;
        break;
      }
    }
    r < 0 && (r = 391);
  }
  return Ee[r] = e, r;
}
function $l() {
  Ee = Dd();
}
var t1 = {
  5: '"$"#,##0_);\\("$"#,##0\\)',
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  23: "General",
  24: "General",
  25: "General",
  26: "General",
  27: "m/d/yy",
  28: "m/d/yy",
  29: "m/d/yy",
  30: "m/d/yy",
  31: "m/d/yy",
  32: "h:mm:ss",
  33: "h:mm:ss",
  34: "h:mm:ss",
  35: "h:mm:ss",
  36: "m/d/yy",
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
  50: "m/d/yy",
  51: "m/d/yy",
  52: "m/d/yy",
  53: "m/d/yy",
  54: "m/d/yy",
  55: "m/d/yy",
  56: "m/d/yy",
  57: "m/d/yy",
  58: "m/d/yy",
  59: "0",
  60: "0.00",
  61: "#,##0",
  62: "#,##0.00",
  63: '"$"#,##0_);\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  67: "0%",
  68: "0.00%",
  69: "# ?/?",
  70: "# ??/??",
  71: "m/d/yy",
  72: "m/d/yy",
  73: "d-mmm-yy",
  74: "d-mmm",
  75: "mmm-yy",
  76: "h:mm",
  77: "h:mm:ss",
  78: "m/d/yy h:mm",
  79: "mm:ss",
  80: "[h]:mm:ss",
  81: "mmss.0"
}, Fl = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function a1(e) {
  var r = typeof e == "number" ? Ee[e] : e;
  return r = r.replace(Fl, "(\\d+)"), new RegExp("^" + r + "$");
}
function n1(e, r, t) {
  var a = -1, n = -1, s = -1, i = -1, c = -1, o = -1;
  (r.match(Fl) || []).forEach(function(u, p) {
    var h = parseInt(t[p + 1], 10);
    switch (u.toLowerCase().charAt(0)) {
      case "y":
        a = h;
        break;
      case "d":
        s = h;
        break;
      case "h":
        i = h;
        break;
      case "s":
        o = h;
        break;
      case "m":
        i >= 0 ? c = h : n = h;
        break;
    }
  }), o >= 0 && c == -1 && n >= 0 && (c = n, n = -1);
  var f = ("" + (a >= 0 ? a : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (s >= 1 ? s : 1)).slice(-2);
  f.length == 7 && (f = "0" + f), f.length == 8 && (f = "20" + f);
  var l = ("00" + (i >= 0 ? i : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
  return i == -1 && c == -1 && o == -1 ? f : a == -1 && n == -1 && s == -1 ? l : f + "T" + l;
}
var s1 = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function r() {
    for (var C = 0, z = new Array(256), U = 0; U != 256; ++U)
      C = U, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, C = C & 1 ? -306674912 ^ C >>> 1 : C >>> 1, z[U] = C;
    return typeof Int32Array < "u" ? new Int32Array(z) : z;
  }
  var t = r();
  function a(C) {
    var z = 0, U = 0, J = 0, j = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (J = 0; J != 256; ++J) j[J] = C[J];
    for (J = 0; J != 256; ++J)
      for (U = C[J], z = 256 + J; z < 4096; z += 256) U = j[z] = U >>> 8 ^ C[U & 255];
    var M = [];
    for (J = 1; J != 16; ++J) M[J - 1] = typeof Int32Array < "u" ? j.subarray(J * 256, J * 256 + 256) : j.slice(J * 256, J * 256 + 256);
    return M;
  }
  var n = a(t), s = n[0], i = n[1], c = n[2], o = n[3], f = n[4], l = n[5], u = n[6], p = n[7], h = n[8], d = n[9], m = n[10], x = n[11], g = n[12], T = n[13], E = n[14];
  function I(C, z) {
    for (var U = z ^ -1, J = 0, j = C.length; J < j; ) U = U >>> 8 ^ t[(U ^ C.charCodeAt(J++)) & 255];
    return ~U;
  }
  function D(C, z) {
    for (var U = z ^ -1, J = C.length - 15, j = 0; j < J; ) U = E[C[j++] ^ U & 255] ^ T[C[j++] ^ U >> 8 & 255] ^ g[C[j++] ^ U >> 16 & 255] ^ x[C[j++] ^ U >>> 24] ^ m[C[j++]] ^ d[C[j++]] ^ h[C[j++]] ^ p[C[j++]] ^ u[C[j++]] ^ l[C[j++]] ^ f[C[j++]] ^ o[C[j++]] ^ c[C[j++]] ^ i[C[j++]] ^ s[C[j++]] ^ t[C[j++]];
    for (J += 15; j < J; ) U = U >>> 8 ^ t[(U ^ C[j++]) & 255];
    return ~U;
  }
  function L(C, z) {
    for (var U = z ^ -1, J = 0, j = C.length, M = 0, ae = 0; J < j; )
      M = C.charCodeAt(J++), M < 128 ? U = U >>> 8 ^ t[(U ^ M) & 255] : M < 2048 ? (U = U >>> 8 ^ t[(U ^ (192 | M >> 6 & 31)) & 255], U = U >>> 8 ^ t[(U ^ (128 | M & 63)) & 255]) : M >= 55296 && M < 57344 ? (M = (M & 1023) + 64, ae = C.charCodeAt(J++) & 1023, U = U >>> 8 ^ t[(U ^ (240 | M >> 8 & 7)) & 255], U = U >>> 8 ^ t[(U ^ (128 | M >> 2 & 63)) & 255], U = U >>> 8 ^ t[(U ^ (128 | ae >> 6 & 15 | (M & 3) << 4)) & 255], U = U >>> 8 ^ t[(U ^ (128 | ae & 63)) & 255]) : (U = U >>> 8 ^ t[(U ^ (224 | M >> 12 & 15)) & 255], U = U >>> 8 ^ t[(U ^ (128 | M >> 6 & 63)) & 255], U = U >>> 8 ^ t[(U ^ (128 | M & 63)) & 255]);
    return ~U;
  }
  return e.table = t, e.bstr = I, e.buf = D, e.str = L, e;
}(), Ce = /* @__PURE__ */ function() {
  var r = {};
  r.version = "1.2.1";
  function t(w, F) {
    for (var S = w.split("/"), A = F.split("/"), R = 0, O = 0, X = Math.min(S.length, A.length); R < X; ++R) {
      if (O = S[R].length - A[R].length) return O;
      if (S[R] != A[R]) return S[R] < A[R] ? -1 : 1;
    }
    return S.length - A.length;
  }
  function a(w) {
    if (w.charAt(w.length - 1) == "/") return w.slice(0, -1).indexOf("/") === -1 ? w : a(w.slice(0, -1));
    var F = w.lastIndexOf("/");
    return F === -1 ? w : w.slice(0, F + 1);
  }
  function n(w) {
    if (w.charAt(w.length - 1) == "/") return n(w.slice(0, -1));
    var F = w.lastIndexOf("/");
    return F === -1 ? w : w.slice(F + 1);
  }
  function s(w, F) {
    typeof F == "string" && (F = new Date(F));
    var S = F.getHours();
    S = S << 6 | F.getMinutes(), S = S << 5 | F.getSeconds() >>> 1, w.write_shift(2, S);
    var A = F.getFullYear() - 1980;
    A = A << 4 | F.getMonth() + 1, A = A << 5 | F.getDate(), w.write_shift(2, A);
  }
  function i(w) {
    var F = w.read_shift(2) & 65535, S = w.read_shift(2) & 65535, A = /* @__PURE__ */ new Date(), R = S & 31;
    S >>>= 5;
    var O = S & 15;
    S >>>= 4, A.setMilliseconds(0), A.setFullYear(S + 1980), A.setMonth(O - 1), A.setDate(R);
    var X = F & 31;
    F >>>= 5;
    var re = F & 63;
    return F >>>= 6, A.setHours(F), A.setMinutes(re), A.setSeconds(X << 1), A;
  }
  function c(w) {
    or(w, 0);
    for (var F = (
      /*::(*/
      {}
    ), S = 0; w.l <= w.length - 4; ) {
      var A = w.read_shift(2), R = w.read_shift(2), O = w.l + R, X = {};
      switch (A) {
        case 21589:
          S = w.read_shift(1), S & 1 && (X.mtime = w.read_shift(4)), R > 5 && (S & 2 && (X.atime = w.read_shift(4)), S & 4 && (X.ctime = w.read_shift(4))), X.mtime && (X.mt = new Date(X.mtime * 1e3));
          break;
      }
      w.l = O, F[A] = X;
    }
    return F;
  }
  var o;
  function f() {
    return o || (o = {});
  }
  function l(w, F) {
    if (w[0] == 80 && w[1] == 75) return qc(w, F);
    if ((w[0] | 32) == 109 && (w[1] | 32) == 105) return vd(w, F);
    if (w.length < 512) throw new Error("CFB file size " + w.length + " < 512");
    var S = 3, A = 512, R = 0, O = 0, X = 0, re = 0, W = 0, K = [], q = (
      /*::(*/
      w.slice(0, 512)
    );
    or(q, 0);
    var se = u(q);
    switch (S = se[0], S) {
      case 3:
        A = 512;
        break;
      case 4:
        A = 4096;
        break;
      case 0:
        if (se[1] == 0) return qc(w, F);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + S);
    }
    A !== 512 && (q = /*::(*/
    w.slice(0, A), or(
      q,
      28
      /* blob.l */
    ));
    var fe = w.slice(0, A);
    p(q, S);
    var he = q.read_shift(4, "i");
    if (S === 3 && he !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + he);
    q.l += 4, X = q.read_shift(4, "i"), q.l += 4, q.chk("00100000", "Mini Stream Cutoff Size: "), re = q.read_shift(4, "i"), R = q.read_shift(4, "i"), W = q.read_shift(4, "i"), O = q.read_shift(4, "i");
    for (var ie = -1, ue = 0; ue < 109 && (ie = q.read_shift(4, "i"), !(ie < 0)); ++ue)
      K[ue] = ie;
    var _e = h(w, A);
    x(W, O, _e, A, K);
    var je = T(_e, X, K, A);
    je[X].name = "!Directory", R > 0 && re !== ae && (je[re].name = "!MiniFAT"), je[K[0]].name = "!FAT", je.fat_addrs = K, je.ssz = A;
    var Ve = {}, dr = [], tn = [], an = [];
    E(X, je, _e, dr, R, Ve, tn, re), d(tn, an, dr), dr.shift();
    var nn = {
      FileIndex: tn,
      FullPaths: an
    };
    return F && F.raw && (nn.raw = { header: fe, sectors: _e }), nn;
  }
  function u(w) {
    if (w[w.l] == 80 && w[w.l + 1] == 75) return [0, 0];
    w.chk(G, "Header Signature: "), w.l += 16;
    var F = w.read_shift(2, "u");
    return [w.read_shift(2, "u"), F];
  }
  function p(w, F) {
    var S = 9;
    switch (w.l += 2, S = w.read_shift(2)) {
      case 9:
        if (F != 3) throw new Error("Sector Shift: Expected 9 saw " + S);
        break;
      case 12:
        if (F != 4) throw new Error("Sector Shift: Expected 12 saw " + S);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + S);
    }
    w.chk("0600", "Mini Sector Shift: "), w.chk("000000000000", "Reserved: ");
  }
  function h(w, F) {
    for (var S = Math.ceil(w.length / F) - 1, A = [], R = 1; R < S; ++R) A[R - 1] = w.slice(R * F, (R + 1) * F);
    return A[S - 1] = w.slice(S * F), A;
  }
  function d(w, F, S) {
    for (var A = 0, R = 0, O = 0, X = 0, re = 0, W = S.length, K = [], q = []; A < W; ++A)
      K[A] = q[A] = A, F[A] = S[A];
    for (; re < q.length; ++re)
      A = q[re], R = w[A].L, O = w[A].R, X = w[A].C, K[A] === A && (R !== -1 && K[R] !== R && (K[A] = K[R]), O !== -1 && K[O] !== O && (K[A] = K[O])), X !== -1 && (K[X] = A), R !== -1 && A != K[A] && (K[R] = K[A], q.lastIndexOf(R) < re && q.push(R)), O !== -1 && A != K[A] && (K[O] = K[A], q.lastIndexOf(O) < re && q.push(O));
    for (A = 1; A < W; ++A) K[A] === A && (O !== -1 && K[O] !== O ? K[A] = K[O] : R !== -1 && K[R] !== R && (K[A] = K[R]));
    for (A = 1; A < W; ++A)
      if (w[A].type !== 0) {
        if (re = A, re != K[re]) do
          re = K[re], F[A] = F[re] + "/" + F[A];
        while (re !== 0 && K[re] !== -1 && re != K[re]);
        K[A] = -1;
      }
    for (F[0] += "/", A = 1; A < W; ++A)
      w[A].type !== 2 && (F[A] += "/");
  }
  function m(w, F, S) {
    for (var A = w.start, R = w.size, O = [], X = A; S && R > 0 && X >= 0; )
      O.push(F.slice(X * M, X * M + M)), R -= M, X = ca(S, X * 4);
    return O.length === 0 ? Ze(0) : Xt(O).slice(0, w.size);
  }
  function x(w, F, S, A, R) {
    var O = ae;
    if (w === ae) {
      if (F !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (w !== -1) {
      var X = S[w], re = (A >>> 2) - 1;
      if (!X) return;
      for (var W = 0; W < re && (O = ca(X, W * 4)) !== ae; ++W)
        R.push(O);
      x(ca(X, A - 4), F - 1, S, A, R);
    }
  }
  function g(w, F, S, A, R) {
    var O = [], X = [];
    R || (R = []);
    var re = A - 1, W = 0, K = 0;
    for (W = F; W >= 0; ) {
      R[W] = !0, O[O.length] = W, X.push(w[W]);
      var q = S[Math.floor(W * 4 / A)];
      if (K = W * 4 & re, A < 4 + K) throw new Error("FAT boundary crossed: " + W + " 4 " + A);
      if (!w[q]) break;
      W = ca(w[q], K);
    }
    return { nodes: O, data: _o([X]) };
  }
  function T(w, F, S, A) {
    var R = w.length, O = [], X = [], re = [], W = [], K = A - 1, q = 0, se = 0, fe = 0, he = 0;
    for (q = 0; q < R; ++q)
      if (re = [], fe = q + F, fe >= R && (fe -= R), !X[fe]) {
        W = [];
        var ie = [];
        for (se = fe; se >= 0; ) {
          ie[se] = !0, X[se] = !0, re[re.length] = se, W.push(w[se]);
          var ue = S[Math.floor(se * 4 / A)];
          if (he = se * 4 & K, A < 4 + he) throw new Error("FAT boundary crossed: " + se + " 4 " + A);
          if (!w[ue] || (se = ca(w[ue], he), ie[se])) break;
        }
        O[fe] = { nodes: re, data: _o([W]) };
      }
    return O;
  }
  function E(w, F, S, A, R, O, X, re) {
    for (var W = 0, K = A.length ? 2 : 0, q = F[w].data, se = 0, fe = 0, he; se < q.length; se += 128) {
      var ie = (
        /*::(*/
        q.slice(se, se + 128)
      );
      or(ie, 64), fe = ie.read_shift(2), he = g0(ie, 0, fe - K), A.push(he);
      var ue = {
        name: he,
        type: ie.read_shift(1),
        color: ie.read_shift(1),
        L: ie.read_shift(4, "i"),
        R: ie.read_shift(4, "i"),
        C: ie.read_shift(4, "i"),
        clsid: ie.read_shift(16),
        state: ie.read_shift(4, "i"),
        start: 0,
        size: 0
      }, _e = ie.read_shift(2) + ie.read_shift(2) + ie.read_shift(2) + ie.read_shift(2);
      _e !== 0 && (ue.ct = I(ie, ie.l - 8));
      var je = ie.read_shift(2) + ie.read_shift(2) + ie.read_shift(2) + ie.read_shift(2);
      je !== 0 && (ue.mt = I(ie, ie.l - 8)), ue.start = ie.read_shift(4, "i"), ue.size = ie.read_shift(4, "i"), ue.size < 0 && ue.start < 0 && (ue.size = ue.type = 0, ue.start = ae, ue.name = ""), ue.type === 5 ? (W = ue.start, R > 0 && W !== ae && (F[W].name = "!StreamData")) : ue.size >= 4096 ? (ue.storage = "fat", F[ue.start] === void 0 && (F[ue.start] = g(S, ue.start, F.fat_addrs, F.ssz)), F[ue.start].name = ue.name, ue.content = F[ue.start].data.slice(0, ue.size)) : (ue.storage = "minifat", ue.size < 0 ? ue.size = 0 : W !== ae && ue.start !== ae && F[W] && (ue.content = m(ue, F[W].data, (F[re] || {}).data))), ue.content && or(ue.content, 0), O[he] = ue, X.push(ue);
    }
  }
  function I(w, F) {
    return new Date((Vr(w, F + 4) / 1e7 * Math.pow(2, 32) + Vr(w, F) / 1e7 - 11644473600) * 1e3);
  }
  function D(w, F) {
    return f(), l(o.readFileSync(w), F);
  }
  function L(w, F) {
    var S = F && F.type;
    switch (S || Fe && Buffer.isBuffer(w) && (S = "buffer"), S || "base64") {
      case "file":
        return D(w, F);
      case "base64":
        return l(st(Gr(w)), F);
      case "binary":
        return l(st(w), F);
    }
    return l(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      w,
      F
    );
  }
  function C(w, F) {
    var S = F || {}, A = S.root || "Root Entry";
    if (w.FullPaths || (w.FullPaths = []), w.FileIndex || (w.FileIndex = []), w.FullPaths.length !== w.FileIndex.length) throw new Error("inconsistent CFB structure");
    w.FullPaths.length === 0 && (w.FullPaths[0] = A + "/", w.FileIndex[0] = { name: A, type: 5 }), S.CLSID && (w.FileIndex[0].clsid = S.CLSID), z(w);
  }
  function z(w) {
    var F = "Sh33tJ5";
    if (!Ce.find(w, "/" + F)) {
      var S = Ze(4);
      S[0] = 55, S[1] = S[3] = 50, S[2] = 54, w.FileIndex.push({ name: F, type: 2, content: S, size: 4, L: 69, R: 69, C: 69 }), w.FullPaths.push(w.FullPaths[0] + F), U(w);
    }
  }
  function U(w, F) {
    C(w);
    for (var S = !1, A = !1, R = w.FullPaths.length - 1; R >= 0; --R) {
      var O = w.FileIndex[R];
      switch (O.type) {
        case 0:
          A ? S = !0 : (w.FileIndex.pop(), w.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          A = !0, isNaN(O.R * O.L * O.C) && (S = !0), O.R > -1 && O.L > -1 && O.R == O.L && (S = !0);
          break;
        default:
          S = !0;
          break;
      }
    }
    if (!(!S && !F)) {
      var X = new Date(1987, 1, 19), re = 0, W = Object.create ? /* @__PURE__ */ Object.create(null) : {}, K = [];
      for (R = 0; R < w.FullPaths.length; ++R)
        W[w.FullPaths[R]] = !0, w.FileIndex[R].type !== 0 && K.push([w.FullPaths[R], w.FileIndex[R]]);
      for (R = 0; R < K.length; ++R) {
        var q = a(K[R][0]);
        A = W[q], A || (K.push([q, {
          name: n(q).replace("/", ""),
          type: 1,
          clsid: te,
          ct: X,
          mt: X,
          content: null
        }]), W[q] = !0);
      }
      for (K.sort(function(he, ie) {
        return t(he[0], ie[0]);
      }), w.FullPaths = [], w.FileIndex = [], R = 0; R < K.length; ++R)
        w.FullPaths[R] = K[R][0], w.FileIndex[R] = K[R][1];
      for (R = 0; R < K.length; ++R) {
        var se = w.FileIndex[R], fe = w.FullPaths[R];
        if (se.name = n(fe).replace("/", ""), se.L = se.R = se.C = -(se.color = 1), se.size = se.content ? se.content.length : 0, se.start = 0, se.clsid = se.clsid || te, R === 0)
          se.C = K.length > 1 ? 1 : -1, se.size = 0, se.type = 5;
        else if (fe.slice(-1) == "/") {
          for (re = R + 1; re < K.length && a(w.FullPaths[re]) != fe; ++re) ;
          for (se.C = re >= K.length ? -1 : re, re = R + 1; re < K.length && a(w.FullPaths[re]) != a(fe); ++re) ;
          se.R = re >= K.length ? -1 : re, se.type = 1;
        } else
          a(w.FullPaths[R + 1] || "") == a(fe) && (se.R = R + 1), se.type = 2;
      }
    }
  }
  function J(w, F) {
    var S = F || {};
    if (S.fileType == "mad") return gd(w, S);
    switch (U(w), S.fileType) {
      case "zip":
        return ud(w, S);
    }
    var A = function(he) {
      for (var ie = 0, ue = 0, _e = 0; _e < he.FileIndex.length; ++_e) {
        var je = he.FileIndex[_e];
        if (je.content) {
          var Ve = je.content.length;
          Ve > 0 && (Ve < 4096 ? ie += Ve + 63 >> 6 : ue += Ve + 511 >> 9);
        }
      }
      for (var dr = he.FullPaths.length + 3 >> 2, tn = ie + 7 >> 3, an = ie + 127 >> 7, nn = tn + ue + dr + an, sa = nn + 127 >> 7, hi = sa <= 109 ? 0 : Math.ceil((sa - 109) / 127); nn + sa + hi + 127 >> 7 > sa; ) hi = ++sa <= 109 ? 0 : Math.ceil((sa - 109) / 127);
      var kt = [1, hi, sa, an, dr, ue, ie, 0];
      return he.FileIndex[0].size = ie << 6, kt[7] = (he.FileIndex[0].start = kt[0] + kt[1] + kt[2] + kt[3] + kt[4] + kt[5]) + (kt[6] + 7 >> 3), kt;
    }(w), R = Ze(A[7] << 9), O = 0, X = 0;
    {
      for (O = 0; O < 8; ++O) R.write_shift(1, V[O]);
      for (O = 0; O < 8; ++O) R.write_shift(2, 0);
      for (R.write_shift(2, 62), R.write_shift(2, 3), R.write_shift(2, 65534), R.write_shift(2, 9), R.write_shift(2, 6), O = 0; O < 3; ++O) R.write_shift(2, 0);
      for (R.write_shift(4, 0), R.write_shift(4, A[2]), R.write_shift(4, A[0] + A[1] + A[2] + A[3] - 1), R.write_shift(4, 0), R.write_shift(4, 4096), R.write_shift(4, A[3] ? A[0] + A[1] + A[2] - 1 : ae), R.write_shift(4, A[3]), R.write_shift(-4, A[1] ? A[0] - 1 : ae), R.write_shift(4, A[1]), O = 0; O < 109; ++O) R.write_shift(-4, O < A[2] ? A[1] + O : -1);
    }
    if (A[1])
      for (X = 0; X < A[1]; ++X) {
        for (; O < 236 + X * 127; ++O) R.write_shift(-4, O < A[2] ? A[1] + O : -1);
        R.write_shift(-4, X === A[1] - 1 ? ae : X + 1);
      }
    var re = function(he) {
      for (X += he; O < X - 1; ++O) R.write_shift(-4, O + 1);
      he && (++O, R.write_shift(-4, ae));
    };
    for (X = O = 0, X += A[1]; O < X; ++O) R.write_shift(-4, Z.DIFSECT);
    for (X += A[2]; O < X; ++O) R.write_shift(-4, Z.FATSECT);
    re(A[3]), re(A[4]);
    for (var W = 0, K = 0, q = w.FileIndex[0]; W < w.FileIndex.length; ++W)
      q = w.FileIndex[W], q.content && (K = q.content.length, !(K < 4096) && (q.start = X, re(K + 511 >> 9)));
    for (re(A[6] + 7 >> 3); R.l & 511; ) R.write_shift(-4, Z.ENDOFCHAIN);
    for (X = O = 0, W = 0; W < w.FileIndex.length; ++W)
      q = w.FileIndex[W], q.content && (K = q.content.length, !(!K || K >= 4096) && (q.start = X, re(K + 63 >> 6)));
    for (; R.l & 511; ) R.write_shift(-4, Z.ENDOFCHAIN);
    for (O = 0; O < A[4] << 2; ++O) {
      var se = w.FullPaths[O];
      if (!se || se.length === 0) {
        for (W = 0; W < 17; ++W) R.write_shift(4, 0);
        for (W = 0; W < 3; ++W) R.write_shift(4, -1);
        for (W = 0; W < 12; ++W) R.write_shift(4, 0);
        continue;
      }
      q = w.FileIndex[O], O === 0 && (q.start = q.size ? q.start - 1 : ae);
      var fe = O === 0 && S.root || q.name;
      if (K = 2 * (fe.length + 1), R.write_shift(64, fe, "utf16le"), R.write_shift(2, K), R.write_shift(1, q.type), R.write_shift(1, q.color), R.write_shift(-4, q.L), R.write_shift(-4, q.R), R.write_shift(-4, q.C), q.clsid) R.write_shift(16, q.clsid, "hex");
      else for (W = 0; W < 4; ++W) R.write_shift(4, 0);
      R.write_shift(4, q.state || 0), R.write_shift(4, 0), R.write_shift(4, 0), R.write_shift(4, 0), R.write_shift(4, 0), R.write_shift(4, q.start), R.write_shift(4, q.size), R.write_shift(4, 0);
    }
    for (O = 1; O < w.FileIndex.length; ++O)
      if (q = w.FileIndex[O], q.size >= 4096)
        if (R.l = q.start + 1 << 9, Fe && Buffer.isBuffer(q.content))
          q.content.copy(R, R.l, 0, q.size), R.l += q.size + 511 & -512;
        else {
          for (W = 0; W < q.size; ++W) R.write_shift(1, q.content[W]);
          for (; W & 511; ++W) R.write_shift(1, 0);
        }
    for (O = 1; O < w.FileIndex.length; ++O)
      if (q = w.FileIndex[O], q.size > 0 && q.size < 4096)
        if (Fe && Buffer.isBuffer(q.content))
          q.content.copy(R, R.l, 0, q.size), R.l += q.size + 63 & -64;
        else {
          for (W = 0; W < q.size; ++W) R.write_shift(1, q.content[W]);
          for (; W & 63; ++W) R.write_shift(1, 0);
        }
    if (Fe)
      R.l = R.length;
    else
      for (; R.l < R.length; ) R.write_shift(1, 0);
    return R;
  }
  function j(w, F) {
    var S = w.FullPaths.map(function(W) {
      return W.toUpperCase();
    }), A = S.map(function(W) {
      var K = W.split("/");
      return K[K.length - (W.slice(-1) == "/" ? 2 : 1)];
    }), R = !1;
    F.charCodeAt(0) === 47 ? (R = !0, F = S[0].slice(0, -1) + F) : R = F.indexOf("/") !== -1;
    var O = F.toUpperCase(), X = R === !0 ? S.indexOf(O) : A.indexOf(O);
    if (X !== -1) return w.FileIndex[X];
    var re = !O.match(pn);
    for (O = O.replace(Rr, ""), re && (O = O.replace(pn, "!")), X = 0; X < S.length; ++X)
      if ((re ? S[X].replace(pn, "!") : S[X]).replace(Rr, "") == O || (re ? A[X].replace(pn, "!") : A[X]).replace(Rr, "") == O) return w.FileIndex[X];
    return null;
  }
  var M = 64, ae = -2, G = "d0cf11e0a1b11ae1", V = [208, 207, 17, 224, 161, 177, 26, 225], te = "00000000000000000000000000000000", Z = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ae,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: G,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: te,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function ce(w, F, S) {
    f();
    var A = J(w, S);
    o.writeFileSync(F, A);
  }
  function B(w) {
    for (var F = new Array(w.length), S = 0; S < w.length; ++S) F[S] = String.fromCharCode(w[S]);
    return F.join("");
  }
  function H(w, F) {
    var S = J(w, F);
    switch (F && F.type || "buffer") {
      case "file":
        return f(), o.writeFileSync(F.filename, S), S;
      case "binary":
        return typeof S == "string" ? S : B(S);
      case "base64":
        return eo(typeof S == "string" ? S : B(S));
      case "buffer":
        if (Fe) return Buffer.isBuffer(S) ? S : ya(S);
      case "array":
        return typeof S == "string" ? st(S) : S;
    }
    return S;
  }
  var b;
  function y(w) {
    try {
      var F = w.InflateRaw, S = new F();
      if (S._processChunk(new Uint8Array([3, 0]), S._finishFlushFlag), S.bytesRead) b = w;
      else throw new Error("zlib does not expose bytesRead");
    } catch (A) {
      console.error("cannot use native zlib: " + (A.message || A));
    }
  }
  function k(w, F) {
    if (!b) return Xc(w, F);
    var S = b.InflateRaw, A = new S(), R = A._processChunk(w.slice(w.l), A._finishFlushFlag);
    return w.l += A.bytesRead, R;
  }
  function v(w) {
    return b ? b.deflateRawSync(w) : ke(w);
  }
  var _ = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], N = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], Y = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function Q(w) {
    var F = (w << 1 | w << 11) & 139536 | (w << 5 | w << 15) & 558144;
    return (F >> 16 | F >> 8 | F) & 255;
  }
  for (var ne = typeof Uint8Array < "u", ee = ne ? new Uint8Array(256) : [], pe = 0; pe < 256; ++pe) ee[pe] = Q(pe);
  function P(w, F) {
    var S = ee[w & 255];
    return F <= 8 ? S >>> 8 - F : (S = S << 8 | ee[w >> 8 & 255], F <= 16 ? S >>> 16 - F : (S = S << 8 | ee[w >> 16 & 255], S >>> 24 - F));
  }
  function be(w, F) {
    var S = F & 7, A = F >>> 3;
    return (w[A] | (S <= 6 ? 0 : w[A + 1] << 8)) >>> S & 3;
  }
  function $e(w, F) {
    var S = F & 7, A = F >>> 3;
    return (w[A] | (S <= 5 ? 0 : w[A + 1] << 8)) >>> S & 7;
  }
  function Ie(w, F) {
    var S = F & 7, A = F >>> 3;
    return (w[A] | (S <= 4 ? 0 : w[A + 1] << 8)) >>> S & 15;
  }
  function we(w, F) {
    var S = F & 7, A = F >>> 3;
    return (w[A] | (S <= 3 ? 0 : w[A + 1] << 8)) >>> S & 31;
  }
  function oe(w, F) {
    var S = F & 7, A = F >>> 3;
    return (w[A] | (S <= 1 ? 0 : w[A + 1] << 8)) >>> S & 127;
  }
  function De(w, F, S) {
    var A = F & 7, R = F >>> 3, O = (1 << S) - 1, X = w[R] >>> A;
    return S < 8 - A || (X |= w[R + 1] << 8 - A, S < 16 - A) || (X |= w[R + 2] << 16 - A, S < 24 - A) || (X |= w[R + 3] << 24 - A), X & O;
  }
  function hr(w, F, S) {
    var A = F & 7, R = F >>> 3;
    return A <= 5 ? w[R] |= (S & 7) << A : (w[R] |= S << A & 255, w[R + 1] = (S & 7) >> 8 - A), F + 3;
  }
  function Pr(w, F, S) {
    var A = F & 7, R = F >>> 3;
    return S = (S & 1) << A, w[R] |= S, F + 1;
  }
  function Lr(w, F, S) {
    var A = F & 7, R = F >>> 3;
    return S <<= A, w[R] |= S & 255, S >>>= 8, w[R + 1] = S, F + 8;
  }
  function wt(w, F, S) {
    var A = F & 7, R = F >>> 3;
    return S <<= A, w[R] |= S & 255, S >>>= 8, w[R + 1] = S & 255, w[R + 2] = S >>> 8, F + 16;
  }
  function Wr(w, F) {
    var S = w.length, A = 2 * S > F ? 2 * S : F + 5, R = 0;
    if (S >= F) return w;
    if (Fe) {
      var O = ro(A);
      if (w.copy) w.copy(O);
      else for (; R < w.length; ++R) O[R] = w[R];
      return O;
    } else if (ne) {
      var X = new Uint8Array(A);
      if (X.set) X.set(w);
      else for (; R < S; ++R) X[R] = w[R];
      return X;
    }
    return w.length = A, w;
  }
  function ir(w) {
    for (var F = new Array(w), S = 0; S < w; ++S) F[S] = 0;
    return F;
  }
  function Mr(w, F, S) {
    var A = 1, R = 0, O = 0, X = 0, re = 0, W = w.length, K = ne ? new Uint16Array(32) : ir(32);
    for (O = 0; O < 32; ++O) K[O] = 0;
    for (O = W; O < S; ++O) w[O] = 0;
    W = w.length;
    var q = ne ? new Uint16Array(W) : ir(W);
    for (O = 0; O < W; ++O)
      K[R = w[O]]++, A < R && (A = R), q[O] = 0;
    for (K[0] = 0, O = 1; O <= A; ++O) K[O + 16] = re = re + K[O - 1] << 1;
    for (O = 0; O < W; ++O)
      re = w[O], re != 0 && (q[O] = K[re + 16]++);
    var se = 0;
    for (O = 0; O < W; ++O)
      if (se = w[O], se != 0)
        for (re = P(q[O], A) >> A - se, X = (1 << A + 4 - se) - 1; X >= 0; --X)
          F[re | X << se] = se & 15 | O << 4;
    return A;
  }
  var Nr = ne ? new Uint16Array(512) : ir(512), Tt = ne ? new Uint16Array(32) : ir(32);
  if (!ne) {
    for (var ar = 0; ar < 512; ++ar) Nr[ar] = 0;
    for (ar = 0; ar < 32; ++ar) Tt[ar] = 0;
  }
  (function() {
    for (var w = [], F = 0; F < 32; F++) w.push(5);
    Mr(w, Tt, 32);
    var S = [];
    for (F = 0; F <= 143; F++) S.push(8);
    for (; F <= 255; F++) S.push(9);
    for (; F <= 279; F++) S.push(7);
    for (; F <= 287; F++) S.push(8);
    Mr(S, Nr, 288);
  })();
  var Br = /* @__PURE__ */ function() {
    for (var F = ne ? new Uint8Array(32768) : [], S = 0, A = 0; S < Y.length - 1; ++S)
      for (; A < Y[S + 1]; ++A) F[A] = S;
    for (; A < 32768; ++A) F[A] = 29;
    var R = ne ? new Uint8Array(259) : [];
    for (S = 0, A = 0; S < N.length - 1; ++S)
      for (; A < N[S + 1]; ++A) R[A] = S;
    function O(re, W) {
      for (var K = 0; K < re.length; ) {
        var q = Math.min(65535, re.length - K), se = K + q == re.length;
        for (W.write_shift(1, +se), W.write_shift(2, q), W.write_shift(2, ~q & 65535); q-- > 0; ) W[W.l++] = re[K++];
      }
      return W.l;
    }
    function X(re, W) {
      for (var K = 0, q = 0, se = ne ? new Uint16Array(32768) : []; q < re.length; ) {
        var fe = (
          /* data.length - boff; */
          Math.min(65535, re.length - q)
        );
        if (fe < 10) {
          for (K = hr(W, K, +(q + fe == re.length)), K & 7 && (K += 8 - (K & 7)), W.l = K / 8 | 0, W.write_shift(2, fe), W.write_shift(2, ~fe & 65535); fe-- > 0; ) W[W.l++] = re[q++];
          K = W.l * 8;
          continue;
        }
        K = hr(W, K, +(q + fe == re.length) + 2);
        for (var he = 0; fe-- > 0; ) {
          var ie = re[q];
          he = (he << 5 ^ ie) & 32767;
          var ue = -1, _e = 0;
          if ((ue = se[he]) && (ue |= q & -32768, ue > q && (ue -= 32768), ue < q))
            for (; re[ue + _e] == re[q + _e] && _e < 250; ) ++_e;
          if (_e > 2) {
            ie = R[_e], ie <= 22 ? K = Lr(W, K, ee[ie + 1] >> 1) - 1 : (Lr(W, K, 3), K += 5, Lr(W, K, ee[ie - 23] >> 5), K += 3);
            var je = ie < 8 ? 0 : ie - 4 >> 2;
            je > 0 && (wt(W, K, _e - N[ie]), K += je), ie = F[q - ue], K = Lr(W, K, ee[ie] >> 3), K -= 3;
            var Ve = ie < 4 ? 0 : ie - 2 >> 1;
            Ve > 0 && (wt(W, K, q - ue - Y[ie]), K += Ve);
            for (var dr = 0; dr < _e; ++dr)
              se[he] = q & 32767, he = (he << 5 ^ re[q]) & 32767, ++q;
            fe -= _e - 1;
          } else
            ie <= 143 ? ie = ie + 48 : K = Pr(W, K, 1), K = Lr(W, K, ee[ie]), se[he] = q & 32767, ++q;
        }
        K = Lr(W, K, 0) - 1;
      }
      return W.l = (K + 7) / 8 | 0, W.l;
    }
    return function(W, K) {
      return W.length < 8 ? O(W, K) : X(W, K);
    };
  }();
  function ke(w) {
    var F = Ze(50 + Math.floor(w.length * 1.1)), S = Br(w, F);
    return F.slice(0, S);
  }
  var ze = ne ? new Uint16Array(32768) : ir(32768), Xr = ne ? new Uint16Array(32768) : ir(32768), Je = ne ? new Uint16Array(128) : ir(128), na = 1, Wc = 1;
  function od(w, F) {
    var S = we(w, F) + 257;
    F += 5;
    var A = we(w, F) + 1;
    F += 5;
    var R = Ie(w, F) + 4;
    F += 4;
    for (var O = 0, X = ne ? new Uint8Array(19) : ir(19), re = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], W = 1, K = ne ? new Uint8Array(8) : ir(8), q = ne ? new Uint8Array(8) : ir(8), se = X.length, fe = 0; fe < R; ++fe)
      X[_[fe]] = O = $e(w, F), W < O && (W = O), K[O]++, F += 3;
    var he = 0;
    for (K[0] = 0, fe = 1; fe <= W; ++fe) q[fe] = he = he + K[fe - 1] << 1;
    for (fe = 0; fe < se; ++fe) (he = X[fe]) != 0 && (re[fe] = q[he]++);
    var ie = 0;
    for (fe = 0; fe < se; ++fe)
      if (ie = X[fe], ie != 0) {
        he = ee[re[fe]] >> 8 - ie;
        for (var ue = (1 << 7 - ie) - 1; ue >= 0; --ue) Je[he | ue << ie] = ie & 7 | fe << 3;
      }
    var _e = [];
    for (W = 1; _e.length < S + A; )
      switch (he = Je[oe(w, F)], F += he & 7, he >>>= 3) {
        case 16:
          for (O = 3 + be(w, F), F += 2, he = _e[_e.length - 1]; O-- > 0; ) _e.push(he);
          break;
        case 17:
          for (O = 3 + $e(w, F), F += 3; O-- > 0; ) _e.push(0);
          break;
        case 18:
          for (O = 11 + oe(w, F), F += 7; O-- > 0; ) _e.push(0);
          break;
        default:
          _e.push(he), W < he && (W = he);
          break;
      }
    var je = _e.slice(0, S), Ve = _e.slice(S);
    for (fe = S; fe < 286; ++fe) je[fe] = 0;
    for (fe = A; fe < 30; ++fe) Ve[fe] = 0;
    return na = Mr(je, ze, 286), Wc = Mr(Ve, Xr, 30), F;
  }
  function fd(w, F) {
    if (w[0] == 3 && !(w[1] & 3))
      return [ra(F), 2];
    for (var S = 0, A = 0, R = ro(F || 1 << 18), O = 0, X = R.length >>> 0, re = 0, W = 0; !(A & 1); ) {
      if (A = $e(w, S), S += 3, A >>> 1)
        A >> 1 == 1 ? (re = 9, W = 5) : (S = od(w, S), re = na, W = Wc);
      else {
        S & 7 && (S += 8 - (S & 7));
        var K = w[S >>> 3] | w[(S >>> 3) + 1] << 8;
        if (S += 32, K > 0)
          for (!F && X < O + K && (R = Wr(R, O + K), X = R.length); K-- > 0; )
            R[O++] = w[S >>> 3], S += 8;
        continue;
      }
      for (; ; ) {
        !F && X < O + 32767 && (R = Wr(R, O + 32767), X = R.length);
        var q = De(w, S, re), se = A >>> 1 == 1 ? Nr[q] : ze[q];
        if (S += se & 15, se >>>= 4, !(se >>> 8 & 255)) R[O++] = se;
        else {
          if (se == 256) break;
          se -= 257;
          var fe = se < 8 ? 0 : se - 4 >> 2;
          fe > 5 && (fe = 0);
          var he = O + N[se];
          fe > 0 && (he += De(w, S, fe), S += fe), q = De(w, S, W), se = A >>> 1 == 1 ? Tt[q] : Xr[q], S += se & 15, se >>>= 4;
          var ie = se < 4 ? 0 : se - 2 >> 1, ue = Y[se];
          for (ie > 0 && (ue += De(w, S, ie), S += ie), !F && X < he && (R = Wr(R, he + 100), X = R.length); O < he; )
            R[O] = R[O - ue], ++O;
        }
      }
    }
    return F ? [R, S + 7 >>> 3] : [R.slice(0, O), S + 7 >>> 3];
  }
  function Xc(w, F) {
    var S = w.slice(w.l || 0), A = fd(S, F);
    return w.l += A[1], A[0];
  }
  function Kc(w, F) {
    if (w)
      typeof console < "u" && console.error(F);
    else throw new Error(F);
  }
  function qc(w, F) {
    var S = (
      /*::(*/
      w
    );
    or(S, 0);
    var A = [], R = [], O = {
      FileIndex: A,
      FullPaths: R
    };
    C(O, { root: F.root });
    for (var X = S.length - 4; (S[X] != 80 || S[X + 1] != 75 || S[X + 2] != 5 || S[X + 3] != 6) && X >= 0; ) --X;
    S.l = X + 4, S.l += 4;
    var re = S.read_shift(2);
    S.l += 6;
    var W = S.read_shift(4);
    for (S.l = W, X = 0; X < re; ++X) {
      S.l += 20;
      var K = S.read_shift(4), q = S.read_shift(4), se = S.read_shift(2), fe = S.read_shift(2), he = S.read_shift(2);
      S.l += 8;
      var ie = S.read_shift(4), ue = c(
        /*::(*/
        S.slice(S.l + se, S.l + se + fe)
        /*:: :any)*/
      );
      S.l += se + fe + he;
      var _e = S.l;
      S.l = ie + 4, ld(S, K, q, O, ue), S.l = _e;
    }
    return O;
  }
  function ld(w, F, S, A, R) {
    w.l += 2;
    var O = w.read_shift(2), X = w.read_shift(2), re = i(w);
    if (O & 8257) throw new Error("Unsupported ZIP encryption");
    for (var W = w.read_shift(4), K = w.read_shift(4), q = w.read_shift(4), se = w.read_shift(2), fe = w.read_shift(2), he = "", ie = 0; ie < se; ++ie) he += String.fromCharCode(w[w.l++]);
    if (fe) {
      var ue = c(
        /*::(*/
        w.slice(w.l, w.l + fe)
        /*:: :any)*/
      );
      (ue[21589] || {}).mt && (re = ue[21589].mt), ((R || {})[21589] || {}).mt && (re = R[21589].mt);
    }
    w.l += fe;
    var _e = w.slice(w.l, w.l + K);
    switch (X) {
      case 8:
        _e = k(w, q);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + X);
    }
    var je = !1;
    O & 8 && (W = w.read_shift(4), W == 134695760 && (W = w.read_shift(4), je = !0), K = w.read_shift(4), q = w.read_shift(4)), K != F && Kc(je, "Bad compressed size: " + F + " != " + K), q != S && Kc(je, "Bad uncompressed size: " + S + " != " + q), ui(A, he, _e, { unsafe: !0, mt: re });
  }
  function ud(w, F) {
    var S = F || {}, A = [], R = [], O = Ze(1), X = S.compression ? 8 : 0, re = 0, W = 0, K = 0, q = 0, se = 0, fe = w.FullPaths[0], he = fe, ie = w.FileIndex[0], ue = [], _e = 0;
    for (W = 1; W < w.FullPaths.length; ++W)
      if (he = w.FullPaths[W].slice(fe.length), ie = w.FileIndex[W], !(!ie.size || !ie.content || he == "Sh33tJ5")) {
        var je = q, Ve = Ze(he.length);
        for (K = 0; K < he.length; ++K) Ve.write_shift(1, he.charCodeAt(K) & 127);
        Ve = Ve.slice(0, Ve.l), ue[se] = s1.buf(
          /*::((*/
          ie.content,
          0
        );
        var dr = ie.content;
        X == 8 && (dr = v(dr)), O = Ze(30), O.write_shift(4, 67324752), O.write_shift(2, 20), O.write_shift(2, re), O.write_shift(2, X), ie.mt ? s(O, ie.mt) : O.write_shift(4, 0), O.write_shift(-4, ue[se]), O.write_shift(4, dr.length), O.write_shift(
          4,
          /*::(*/
          ie.content.length
        ), O.write_shift(2, Ve.length), O.write_shift(2, 0), q += O.length, A.push(O), q += Ve.length, A.push(Ve), q += dr.length, A.push(dr), O = Ze(46), O.write_shift(4, 33639248), O.write_shift(2, 0), O.write_shift(2, 20), O.write_shift(2, re), O.write_shift(2, X), O.write_shift(4, 0), O.write_shift(-4, ue[se]), O.write_shift(4, dr.length), O.write_shift(
          4,
          /*::(*/
          ie.content.length
        ), O.write_shift(2, Ve.length), O.write_shift(2, 0), O.write_shift(2, 0), O.write_shift(2, 0), O.write_shift(2, 0), O.write_shift(4, 0), O.write_shift(4, je), _e += O.l, R.push(O), _e += Ve.length, R.push(Ve), ++se;
      }
    return O = Ze(22), O.write_shift(4, 101010256), O.write_shift(2, 0), O.write_shift(2, 0), O.write_shift(2, se), O.write_shift(2, se), O.write_shift(4, _e), O.write_shift(4, q), O.write_shift(2, 0), Xt([Xt(A), Xt(R), O]);
  }
  var Jn = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function hd(w, F) {
    if (w.ctype) return w.ctype;
    var S = w.name || "", A = S.match(/\.([^\.]+)$/);
    return A && Jn[A[1]] || F && (A = (S = F).match(/[\.\\]([^\.\\])+$/), A && Jn[A[1]]) ? Jn[A[1]] : "application/octet-stream";
  }
  function dd(w) {
    for (var F = eo(w), S = [], A = 0; A < F.length; A += 76) S.push(F.slice(A, A + 76));
    return S.join(`\r
`) + `\r
`;
  }
  function pd(w) {
    var F = w.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(K) {
      var q = K.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (q.length == 1 ? "0" + q : q);
    });
    F = F.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), F.charAt(0) == `
` && (F = "=0D" + F.slice(1)), F = F.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var S = [], A = F.split(`\r
`), R = 0; R < A.length; ++R) {
      var O = A[R];
      if (O.length == 0) {
        S.push("");
        continue;
      }
      for (var X = 0; X < O.length; ) {
        var re = 76, W = O.slice(X, X + re);
        W.charAt(re - 1) == "=" ? re-- : W.charAt(re - 2) == "=" ? re -= 2 : W.charAt(re - 3) == "=" && (re -= 3), W = O.slice(X, X + re), X += re, X < O.length && (W += "="), S.push(W);
      }
    }
    return S.join(`\r
`);
  }
  function md(w) {
    for (var F = [], S = 0; S < w.length; ++S) {
      for (var A = w[S]; S <= w.length && A.charAt(A.length - 1) == "="; ) A = A.slice(0, A.length - 1) + w[++S];
      F.push(A);
    }
    for (var R = 0; R < F.length; ++R) F[R] = F[R].replace(/[=][0-9A-Fa-f]{2}/g, function(O) {
      return String.fromCharCode(parseInt(O.slice(1), 16));
    });
    return st(F.join(`\r
`));
  }
  function xd(w, F, S) {
    for (var A = "", R = "", O = "", X, re = 0; re < 10; ++re) {
      var W = F[re];
      if (!W || W.match(/^\s*$/)) break;
      var K = W.match(/^(.*?):\s*([^\s].*)$/);
      if (K) switch (K[1].toLowerCase()) {
        case "content-location":
          A = K[2].trim();
          break;
        case "content-type":
          O = K[2].trim();
          break;
        case "content-transfer-encoding":
          R = K[2].trim();
          break;
      }
    }
    switch (++re, R.toLowerCase()) {
      case "base64":
        X = st(Gr(F.slice(re).join("")));
        break;
      case "quoted-printable":
        X = md(F.slice(re));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + R);
    }
    var q = ui(w, A.slice(S.length), X, { unsafe: !0 });
    O && (q.ctype = O);
  }
  function vd(w, F) {
    if (B(w.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var S = F && F.root || "", A = (Fe && Buffer.isBuffer(w) ? w.toString("binary") : B(w)).split(`\r
`), R = 0, O = "";
    for (R = 0; R < A.length; ++R)
      if (O = A[R], !!/^Content-Location:/i.test(O) && (O = O.slice(O.indexOf("file")), S || (S = O.slice(0, O.lastIndexOf("/") + 1)), O.slice(0, S.length) != S))
        for (; S.length > 0 && (S = S.slice(0, S.length - 1), S = S.slice(0, S.lastIndexOf("/") + 1), O.slice(0, S.length) != S); )
          ;
    var X = (A[1] || "").match(/boundary="(.*?)"/);
    if (!X) throw new Error("MAD cannot find boundary");
    var re = "--" + (X[1] || ""), W = [], K = [], q = {
      FileIndex: W,
      FullPaths: K
    };
    C(q);
    var se, fe = 0;
    for (R = 0; R < A.length; ++R) {
      var he = A[R];
      he !== re && he !== re + "--" || (fe++ && xd(q, A.slice(se, R), S), se = R);
    }
    return q;
  }
  function gd(w, F) {
    var S = F || {}, A = S.boundary || "SheetJS";
    A = "------=" + A;
    for (var R = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + A.slice(2) + '"',
      "",
      "",
      ""
    ], O = w.FullPaths[0], X = O, re = w.FileIndex[0], W = 1; W < w.FullPaths.length; ++W)
      if (X = w.FullPaths[W].slice(O.length), re = w.FileIndex[W], !(!re.size || !re.content || X == "Sh33tJ5")) {
        X = X.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(_e) {
          return "_x" + _e.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(_e) {
          return "_u" + _e.charCodeAt(0).toString(16) + "_";
        });
        for (var K = re.content, q = Fe && Buffer.isBuffer(K) ? K.toString("binary") : B(K), se = 0, fe = Math.min(1024, q.length), he = 0, ie = 0; ie <= fe; ++ie) (he = q.charCodeAt(ie)) >= 32 && he < 128 && ++se;
        var ue = se >= fe * 4 / 5;
        R.push(A), R.push("Content-Location: " + (S.root || "file:///C:/SheetJS/") + X), R.push("Content-Transfer-Encoding: " + (ue ? "quoted-printable" : "base64")), R.push("Content-Type: " + hd(re, X)), R.push(""), R.push(ue ? pd(q) : dd(q));
      }
    return R.push(A + `--\r
`), R.join(`\r
`);
  }
  function _d(w) {
    var F = {};
    return C(F, w), F;
  }
  function ui(w, F, S, A) {
    var R = A && A.unsafe;
    R || C(w);
    var O = !R && Ce.find(w, F);
    if (!O) {
      var X = w.FullPaths[0];
      F.slice(0, X.length) == X ? X = F : (X.slice(-1) != "/" && (X += "/"), X = (X + F).replace("//", "/")), O = { name: n(F), type: 2 }, w.FileIndex.push(O), w.FullPaths.push(X), R || Ce.utils.cfb_gc(w);
    }
    return O.content = S, O.size = S ? S.length : 0, A && (A.CLSID && (O.clsid = A.CLSID), A.mt && (O.mt = A.mt), A.ct && (O.ct = A.ct)), O;
  }
  function Ed(w, F) {
    C(w);
    var S = Ce.find(w, F);
    if (S) {
      for (var A = 0; A < w.FileIndex.length; ++A) if (w.FileIndex[A] == S)
        return w.FileIndex.splice(A, 1), w.FullPaths.splice(A, 1), !0;
    }
    return !1;
  }
  function yd(w, F, S) {
    C(w);
    var A = Ce.find(w, F);
    if (A) {
      for (var R = 0; R < w.FileIndex.length; ++R) if (w.FileIndex[R] == A)
        return w.FileIndex[R].name = n(S), w.FullPaths[R] = S, !0;
    }
    return !1;
  }
  function wd(w) {
    U(w, !0);
  }
  return r.find = j, r.read = L, r.parse = l, r.write = H, r.writeFile = ce, r.utils = {
    cfb_new: _d,
    cfb_add: ui,
    cfb_del: Ed,
    cfb_mov: yd,
    cfb_gc: wd,
    ReadShift: _n,
    CheckField: Yl,
    prep_blob: or,
    bconcat: Xt,
    use_zlib: y,
    _deflateRaw: ke,
    _inflateRaw: Xc,
    consts: Z
  }, r;
}();
function i1(e) {
  if (typeof Deno < "u") return Deno.readFileSync(e);
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var r = File(e);
    r.open("r"), r.encoding = "binary";
    var t = r.read();
    return r.close(), t;
  } catch (a) {
    if (!a.message || !a.message.match(/onstruct/)) throw a;
  }
  throw new Error("Cannot access file " + e);
}
function _t(e) {
  for (var r = Object.keys(e), t = [], a = 0; a < r.length; ++a) Object.prototype.hasOwnProperty.call(e, r[a]) && t.push(r[a]);
  return t;
}
function p0(e) {
  for (var r = [], t = _t(e), a = 0; a !== t.length; ++a) r[e[t[a]]] = t[a];
  return r;
}
var Fs = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Or(e, r) {
  var t = /* @__PURE__ */ e.getTime(), a = /* @__PURE__ */ Fs.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Fs.getTimezoneOffset()) * 6e4;
  return (t - a) / (24 * 60 * 60 * 1e3);
}
var Cl = /* @__PURE__ */ new Date(), c1 = /* @__PURE__ */ Fs.getTime() + (/* @__PURE__ */ Cl.getTimezoneOffset() - /* @__PURE__ */ Fs.getTimezoneOffset()) * 6e4, fo = /* @__PURE__ */ Cl.getTimezoneOffset();
function Hs(e) {
  var r = /* @__PURE__ */ new Date();
  return r.setTime(e * 24 * 60 * 60 * 1e3 + c1), r.getTimezoneOffset() !== fo && r.setTime(r.getTime() + (r.getTimezoneOffset() - fo) * 6e4), r;
}
function o1(e) {
  var r = 0, t = 0, a = !1, n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
  if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
  for (var s = 1; s != n.length; ++s)
    if (n[s]) {
      switch (t = 1, s > 3 && (a = !0), n[s].slice(n[s].length - 1)) {
        case "Y":
          throw new Error("Unsupported ISO Duration Field: " + n[s].slice(n[s].length - 1));
        case "D":
          t *= 24;
        case "H":
          t *= 60;
        case "M":
          if (a) t *= 60;
          else throw new Error("Unsupported ISO Duration Field: M");
      }
      r += t * parseInt(n[s], 10);
    }
  return r;
}
var lo = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Rl = /* @__PURE__ */ isNaN(/* @__PURE__ */ lo.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : lo, f1 = /* @__PURE__ */ Rl.getFullYear() == 2017;
function sr(e, r) {
  var t = new Date(e);
  if (f1)
    return r > 0 ? t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3) : r < 0 && t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3), t;
  if (e instanceof Date) return e;
  if (Rl.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
    var a = t.getFullYear();
    return e.indexOf("" + a) > -1 || t.setFullYear(t.getFullYear() + 100), t;
  }
  var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], s = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
  return e.indexOf("Z") > -1 && (s = new Date(s.getTime() - s.getTimezoneOffset() * 60 * 1e3)), s;
}
function xa(e, r) {
  if (Fe && Buffer.isBuffer(e)) {
    if (r) {
      if (e[0] == 255 && e[1] == 254) return xn(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return xn(xl(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (r) {
      if (e[0] == 255 && e[1] == 254) return xn(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return xn(new TextDecoder("utf-16be").decode(e.slice(2)));
    }
    var t = {
      "€": "",
      "‚": "",
      ƒ: "",
      "„": "",
      "…": "",
      "†": "",
      "‡": "",
      "ˆ": "",
      "‰": "",
      Š: "",
      "‹": "",
      Œ: "",
      Ž: "",
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      "•": "",
      "–": "",
      "—": "",
      "˜": "",
      "™": "",
      š: "",
      "›": "",
      œ: "",
      ž: "",
      Ÿ: ""
    };
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(s) {
      return t[s] || s;
    });
  } catch {
  }
  for (var a = [], n = 0; n != e.length; ++n) a.push(String.fromCharCode(e[n]));
  return a.join("");
}
function lr(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var r = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = lr(e[t]));
  return r;
}
function He(e, r) {
  for (var t = ""; t.length < r; ) t += e;
  return t;
}
function ft(e) {
  var r = Number(e);
  if (!isNaN(r)) return isFinite(r) ? r : NaN;
  if (!/\d/.test(e)) return r;
  var t = 1, a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return t *= 100, "";
  });
  return !isNaN(r = Number(a)) || (a = a.replace(/[(](.*)[)]/, function(n, s) {
    return t = -t, s;
  }), !isNaN(r = Number(a))) ? r / t : r;
}
var l1 = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Ga(e) {
  var r = new Date(e), t = /* @__PURE__ */ new Date(NaN), a = r.getYear(), n = r.getMonth(), s = r.getDate();
  if (isNaN(s)) return t;
  var i = e.toLowerCase();
  if (i.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (i = i.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), i.length > 3 && l1.indexOf(i) == -1) return t;
  } else if (i.match(/[a-z]/)) return t;
  return a < 0 || a > 8099 ? t : (n > 0 || s > 1) && a != 101 ? r : e.match(/[^-0-9:,\/\\]/) ? t : r;
}
var u1 = /* @__PURE__ */ function() {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function(t, a, n) {
    if (e || typeof a == "string") return t.split(a);
    for (var s = t.split(a), i = [s[0]], c = 1; c < s.length; ++c)
      i.push(n), i.push(s[c]);
    return i;
  };
}();
function Ol(e) {
  return e ? e.content && e.type ? xa(e.content, !0) : e.data ? dn(e.data) : e.asNodeBuffer && Fe ? dn(e.asNodeBuffer().toString("binary")) : e.asBinary ? dn(e.asBinary()) : e._data && e._data.getContent ? dn(xa(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function Il(e) {
  if (!e) return null;
  if (e.data) return Zc(e.data);
  if (e.asNodeBuffer && Fe) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var r = e._data.getContent();
    return typeof r == "string" ? Zc(r) : Array.prototype.slice.call(r);
  }
  return e.content && e.type ? e.content : null;
}
function h1(e) {
  return e && e.name.slice(-4) === ".bin" ? Il(e) : Ol(e);
}
function Yr(e, r) {
  for (var t = e.FullPaths || _t(e.files), a = r.toLowerCase().replace(/[\/]/g, "\\"), n = a.replace(/\\/g, "/"), s = 0; s < t.length; ++s) {
    var i = t[s].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (a == i || n == i) return e.files ? e.files[t[s]] : e.FileIndex[s];
  }
  return null;
}
function m0(e, r) {
  var t = Yr(e, r);
  if (t == null) throw new Error("Cannot find file " + r + " in zip");
  return t;
}
function qe(e, r, t) {
  if (!t) return h1(m0(e, r));
  if (!r) return null;
  try {
    return qe(e, r);
  } catch {
    return null;
  }
}
function Hr(e, r, t) {
  if (!t) return Ol(m0(e, r));
  if (!r) return null;
  try {
    return Hr(e, r);
  } catch {
    return null;
  }
}
function d1(e, r, t) {
  return Il(m0(e, r));
}
function uo(e) {
  for (var r = e.FullPaths || _t(e.files), t = [], a = 0; a < r.length; ++a) r[a].slice(-1) != "/" && t.push(r[a].replace(/^Root Entry[\/]/, ""));
  return t.sort();
}
function p1(e, r, t) {
  if (e.FullPaths) {
    if (typeof t == "string") {
      var a;
      return Fe ? a = ya(t) : a = Pd(t), Ce.utils.cfb_add(e, r, a);
    }
    Ce.utils.cfb_add(e, r, t);
  } else e.file(r, t);
}
function Pl(e, r) {
  switch (r.type) {
    case "base64":
      return Ce.read(e, { type: "base64" });
    case "binary":
      return Ce.read(e, { type: "binary" });
    case "buffer":
    case "array":
      return Ce.read(e, { type: "buffer" });
  }
  throw new Error("Unrecognized type " + r.type);
}
function mn(e, r) {
  if (e.charAt(0) == "/") return e.slice(1);
  var t = r.split("/");
  r.slice(-1) != "/" && t.pop();
  for (var a = e.split("/"); a.length !== 0; ) {
    var n = a.shift();
    n === ".." ? t.pop() : n !== "." && t.push(n);
  }
  return t.join("/");
}
var Nl = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, m1 = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, ho = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/mg, x1 = /<[^>]*>/g, kr = /* @__PURE__ */ Nl.match(ho) ? ho : x1, v1 = /<\w*:/, g1 = /<(\/?)\w+:/;
function me(e, r, t) {
  for (var a = {}, n = 0, s = 0; n !== e.length && !((s = e.charCodeAt(n)) === 32 || s === 10 || s === 13); ++n) ;
  if (r || (a[0] = e.slice(0, n)), n === e.length) return a;
  var i = e.match(m1), c = 0, o = "", f = 0, l = "", u = "", p = 1;
  if (i) for (f = 0; f != i.length; ++f) {
    for (u = i[f], s = 0; s != u.length && u.charCodeAt(s) !== 61; ++s) ;
    for (l = u.slice(0, s).trim(); u.charCodeAt(s + 1) == 32; ) ++s;
    for (p = (n = u.charCodeAt(s + 1)) == 34 || n == 39 ? 1 : 0, o = u.slice(s + 1 + p, u.length - p), c = 0; c != l.length && l.charCodeAt(c) !== 58; ++c) ;
    if (c === l.length)
      l.indexOf("_") > 0 && (l = l.slice(0, l.indexOf("_"))), a[l] = o, a[l.toLowerCase()] = o;
    else {
      var h = (c === 5 && l.slice(0, 5) === "xmlns" ? "xmlns" : "") + l.slice(c + 1);
      if (a[h] && l.slice(c - 3, c) == "ext") continue;
      a[h] = o, a[h.toLowerCase()] = o;
    }
  }
  return a;
}
function Et(e) {
  return e.replace(g1, "<$1");
}
var bl = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, _1 = /* @__PURE__ */ p0(bl), Oe = /* @__PURE__ */ function() {
  var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig, r = /_x([\da-fA-F]{4})_/ig;
  return function t(a) {
    var n = a + "", s = n.indexOf("<![CDATA[");
    if (s == -1) return n.replace(e, function(c, o) {
      return bl[c] || String.fromCharCode(parseInt(o, c.indexOf("x") > -1 ? 16 : 10)) || c;
    }).replace(r, function(c, o) {
      return String.fromCharCode(parseInt(o, 16));
    });
    var i = n.indexOf("]]>");
    return t(n.slice(0, s)) + n.slice(s + 9, i) + t(n.slice(i + 3));
  };
}(), E1 = /[&<>'"]/g, y1 = /[\u0000-\u001f]/g;
function x0(e) {
  var r = e + "";
  return r.replace(E1, function(t) {
    return _1[t];
  }).replace(/\n/g, "<br/>").replace(y1, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
var po = /* @__PURE__ */ function() {
  var e = /&#(\d+);/g;
  function r(t, a) {
    return String.fromCharCode(parseInt(a, 10));
  }
  return function(a) {
    return a.replace(e, r);
  };
}();
function Ue(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1;
  }
}
function pi(e) {
  for (var r = "", t = 0, a = 0, n = 0, s = 0, i = 0, c = 0; t < e.length; ) {
    if (a = e.charCodeAt(t++), a < 128) {
      r += String.fromCharCode(a);
      continue;
    }
    if (n = e.charCodeAt(t++), a > 191 && a < 224) {
      i = (a & 31) << 6, i |= n & 63, r += String.fromCharCode(i);
      continue;
    }
    if (s = e.charCodeAt(t++), a < 240) {
      r += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | s & 63);
      continue;
    }
    i = e.charCodeAt(t++), c = ((a & 7) << 18 | (n & 63) << 12 | (s & 63) << 6 | i & 63) - 65536, r += String.fromCharCode(55296 + (c >>> 10 & 1023)), r += String.fromCharCode(56320 + (c & 1023));
  }
  return r;
}
function mo(e) {
  var r = ra(2 * e.length), t, a, n = 1, s = 0, i = 0, c;
  for (a = 0; a < e.length; a += n)
    n = 1, (c = e.charCodeAt(a)) < 128 ? t = c : c < 224 ? (t = (c & 31) * 64 + (e.charCodeAt(a + 1) & 63), n = 2) : c < 240 ? (t = (c & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63), n = 3) : (n = 4, t = (c & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63), t -= 65536, i = 55296 + (t >>> 10 & 1023), t = 56320 + (t & 1023)), i !== 0 && (r[s++] = i & 255, r[s++] = i >>> 8, i = 0), r[s++] = t % 256, r[s++] = t >>> 8;
  return r.slice(0, s).toString("ucs2");
}
function xo(e) {
  return ya(e, "binary").toString("utf8");
}
var Qn = "foo bar bazâð£", Ne = Fe && (/* @__PURE__ */ xo(Qn) == /* @__PURE__ */ pi(Qn) && xo || /* @__PURE__ */ mo(Qn) == /* @__PURE__ */ pi(Qn) && mo) || pi, xn = Fe ? function(e) {
  return ya(e, "utf8").toString("binary");
} : function(e) {
  for (var r = [], t = 0, a = 0, n = 0; t < e.length; )
    switch (a = e.charCodeAt(t++), !0) {
      case a < 128:
        r.push(String.fromCharCode(a));
        break;
      case a < 2048:
        r.push(String.fromCharCode(192 + (a >> 6))), r.push(String.fromCharCode(128 + (a & 63)));
        break;
      case (a >= 55296 && a < 57344):
        a -= 55296, n = e.charCodeAt(t++) - 56320 + (a << 10), r.push(String.fromCharCode(240 + (n >> 18 & 7))), r.push(String.fromCharCode(144 + (n >> 12 & 63))), r.push(String.fromCharCode(128 + (n >> 6 & 63))), r.push(String.fromCharCode(128 + (n & 63)));
        break;
      default:
        r.push(String.fromCharCode(224 + (a >> 12))), r.push(String.fromCharCode(128 + (a >> 6 & 63))), r.push(String.fromCharCode(128 + (a & 63)));
    }
  return r.join("");
}, Nn = /* @__PURE__ */ function() {
  var e = {};
  return function(t, a) {
    var n = t + "|" + (a || "");
    return e[n] ? e[n] : e[n] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", a || "");
  };
}(), Dl = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(r) {
    return [new RegExp("&" + r[0] + ";", "ig"), r[1]];
  });
  return function(t) {
    for (var a = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
    return a;
  };
}(), w1 = /* @__PURE__ */ function() {
  var e = {};
  return function(t) {
    return e[t] !== void 0 ? e[t] : e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g");
  };
}(), T1 = /<\/?(?:vt:)?variant>/g, k1 = /<(?:vt:)([^>]*)>([\s\S]*)</;
function vo(e, r) {
  var t = me(e), a = e.match(w1(t.baseType)) || [], n = [];
  if (a.length != t.size) {
    if (r.WTF) throw new Error("unexpected vector length " + a.length + " != " + t.size);
    return n;
  }
  return a.forEach(function(s) {
    var i = s.replace(T1, "").match(k1);
    i && n.push({ v: Ne(i[2]), t: i[1] });
  }), n;
}
var S1 = /(^\s|\s$|\n)/;
function A1(e) {
  return _t(e).map(function(r) {
    return " " + r + '="' + e[r] + '"';
  }).join("");
}
function $1(e, r, t) {
  return "<" + e + (t != null ? A1(t) : "") + (r != null ? (r.match(S1) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">";
}
function v0(e) {
  if (Fe && /*::typeof Buffer !== "undefined" && d != null && d instanceof Buffer &&*/
  Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return Ne(wa(u0(e)));
  throw new Error("Bad input format: expected Buffer or string");
}
var bn = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/mg, F1 = {
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  CT: "http://schemas.openxmlformats.org/package/2006/content-types",
  RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
  TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  xsd: "http://www.w3.org/2001/XMLSchema"
}, C1 = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
];
function R1(e, r) {
  for (var t = 1 - 2 * (e[r + 7] >>> 7), a = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15), n = e[r + 6] & 15, s = 5; s >= 0; --s) n = n * 256 + e[r + s];
  return a == 2047 ? n == 0 ? t * (1 / 0) : NaN : (a == 0 ? a = -1022 : (a -= 1023, n += Math.pow(2, 52)), t * Math.pow(2, a - 52) * n);
}
function O1(e, r, t) {
  var a = (r < 0 || 1 / r == -1 / 0 ? 1 : 0) << 7, n = 0, s = 0, i = a ? -r : r;
  isFinite(i) ? i == 0 ? n = s = 0 : (n = Math.floor(Math.log(i) / Math.LN2), s = i * Math.pow(2, 52 - n), n <= -1023 && (!isFinite(s) || s < Math.pow(2, 52)) ? n = -1022 : (s -= Math.pow(2, 52), n += 1023)) : (n = 2047, s = isNaN(r) ? 26985 : 0);
  for (var c = 0; c <= 5; ++c, s /= 256) e[t + c] = s & 255;
  e[t + 6] = (n & 15) << 4 | s & 15, e[t + 7] = n >> 4 | a;
}
var go = function(e) {
  for (var r = [], t = 10240, a = 0; a < e[0].length; ++a) if (e[0][a]) for (var n = 0, s = e[0][a].length; n < s; n += t) r.push.apply(r, e[0][a].slice(n, n + t));
  return r;
}, _o = Fe ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(r) {
    return Buffer.isBuffer(r) ? r : ya(r);
  })) : go(e);
} : go, Eo = function(e, r, t) {
  for (var a = [], n = r; n < t; n += 2) a.push(String.fromCharCode(Rt(e, n)));
  return a.join("").replace(Rr, "");
}, g0 = Fe ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", r, t).replace(Rr, "") : Eo(e, r, t);
} : Eo, yo = function(e, r, t) {
  for (var a = [], n = r; n < r + t; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
  return a.join("");
}, Ll = Fe ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : yo(e, r, t);
} : yo, wo = function(e, r, t) {
  for (var a = [], n = r; n < t; n++) a.push(String.fromCharCode(Na(e, n)));
  return a.join("");
}, Vn = Fe ? function(r, t, a) {
  return Buffer.isBuffer(r) ? r.toString("utf8", t, a) : wo(r, t, a);
} : wo, Ml = function(e, r) {
  var t = Vr(e, r);
  return t > 0 ? Vn(e, r + 4, r + 4 + t - 1) : "";
}, Bl = Ml, Ul = function(e, r) {
  var t = Vr(e, r);
  return t > 0 ? Vn(e, r + 4, r + 4 + t - 1) : "";
}, jl = Ul, Vl = function(e, r) {
  var t = 2 * Vr(e, r);
  return t > 0 ? Vn(e, r + 4, r + 4 + t - 1) : "";
}, Hl = Vl, Gl = function(r, t) {
  var a = Vr(r, t);
  return a > 0 ? g0(r, t + 4, t + 4 + a) : "";
}, zl = Gl, Wl = function(e, r) {
  var t = Vr(e, r);
  return t > 0 ? Vn(e, r + 4, r + 4 + t) : "";
}, Xl = Wl, Kl = function(e, r) {
  return R1(e, r);
}, Cs = Kl, ql = function(r) {
  return Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
};
Fe && (Bl = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ml(r, t);
  var a = r.readUInt32LE(t);
  return a > 0 ? r.toString("utf8", t + 4, t + 4 + a - 1) : "";
}, jl = function(r, t) {
  if (!Buffer.isBuffer(r)) return Ul(r, t);
  var a = r.readUInt32LE(t);
  return a > 0 ? r.toString("utf8", t + 4, t + 4 + a - 1) : "";
}, Hl = function(r, t) {
  if (!Buffer.isBuffer(r)) return Vl(r, t);
  var a = 2 * r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + a - 1);
}, zl = function(r, t) {
  if (!Buffer.isBuffer(r)) return Gl(r, t);
  var a = r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + a);
}, Xl = function(r, t) {
  if (!Buffer.isBuffer(r)) return Wl(r, t);
  var a = r.readUInt32LE(t);
  return r.toString("utf8", t + 4, t + 4 + a);
}, Cs = function(r, t) {
  return Buffer.isBuffer(r) ? r.readDoubleLE(t) : Kl(r, t);
}, ql = function(r) {
  return Buffer.isBuffer(r) || Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
});
var Na = function(e, r) {
  return e[r];
}, Rt = function(e, r) {
  return e[r + 1] * 256 + e[r];
}, I1 = function(e, r) {
  var t = e[r + 1] * 256 + e[r];
  return t < 32768 ? t : (65535 - t + 1) * -1;
}, Vr = function(e, r) {
  return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r];
}, ca = function(e, r) {
  return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r];
}, P1 = function(e, r) {
  return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3];
};
function _n(e, r) {
  var t = "", a, n, s = [], i, c, o, f;
  switch (r) {
    case "dbcs":
      if (f = this.l, Fe && Buffer.isBuffer(this)) t = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (o = 0; o < e; ++o)
        t += String.fromCharCode(Rt(this, f)), f += 2;
      e *= 2;
      break;
    case "utf8":
      t = Vn(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, t = g0(this, this.l, this.l + e);
      break;
    case "wstr":
      return _n.call(this, e, "dbcs");
    case "lpstr-ansi":
      t = Bl(this, this.l), e = 4 + Vr(this, this.l);
      break;
    case "lpstr-cp":
      t = jl(this, this.l), e = 4 + Vr(this, this.l);
      break;
    case "lpwstr":
      t = Hl(this, this.l), e = 4 + 2 * Vr(this, this.l);
      break;
    case "lpp4":
      e = 4 + Vr(this, this.l), t = zl(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + Vr(this, this.l), t = Xl(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, t = ""; (i = Na(this, this.l + e++)) !== 0; ) s.push(Zn(i));
      t = s.join("");
      break;
    case "_wstr":
      for (e = 0, t = ""; (i = Rt(this, this.l + e)) !== 0; )
        s.push(Zn(i)), e += 2;
      e += 2, t = s.join("");
      break;
    case "dbcs-cont":
      for (t = "", f = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(f) !== -1)
          return i = Na(this, f), this.l = f + 1, c = _n.call(this, e - o, i ? "dbcs-cont" : "sbcs-cont"), s.join("") + c;
        s.push(Zn(Rt(this, f))), f += 2;
      }
      t = s.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (t = "", f = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(f) !== -1)
          return i = Na(this, f), this.l = f + 1, c = _n.call(this, e - o, i ? "dbcs-cont" : "sbcs-cont"), s.join("") + c;
        s.push(Zn(Na(this, f))), f += 1;
      }
      t = s.join("");
      break;
    default:
      switch (e) {
        case 1:
          return a = Na(this, this.l), this.l++, a;
        case 2:
          return a = (r === "i" ? I1 : Rt)(this, this.l), this.l += 2, a;
        case 4:
        case -4:
          return r === "i" || !(this[this.l + 3] & 128) ? (a = (e > 0 ? ca : P1)(this, this.l), this.l += 4, a) : (n = Vr(this, this.l), this.l += 4, n);
        case 8:
        case -8:
          if (r === "f")
            return e == 8 ? n = Cs(this, this.l) : n = Cs([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, n;
          e = 8;
        case 16:
          t = Ll(this, this.l, e);
          break;
      }
  }
  return this.l += e, t;
}
var N1 = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24 & 255;
}, b1 = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255;
}, D1 = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255;
};
function L1(e, r, t) {
  var a = 0, n = 0;
  if (t === "dbcs") {
    for (n = 0; n != r.length; ++n) D1(this, r.charCodeAt(n), this.l + 2 * n);
    a = 2 * r.length;
  } else if (t === "sbcs") {
    for (r = r.replace(/[^\x00-\x7F]/g, "_"), n = 0; n != r.length; ++n) this[this.l + n] = r.charCodeAt(n) & 255;
    a = r.length;
  } else if (t === "hex") {
    for (; n < e; ++n)
      this[this.l++] = parseInt(r.slice(2 * n, 2 * n + 2), 16) || 0;
    return this;
  } else if (t === "utf16le") {
    var s = Math.min(this.l + e, this.length);
    for (n = 0; n < Math.min(r.length, e); ++n) {
      var i = r.charCodeAt(n);
      this[this.l++] = i & 255, this[this.l++] = i >> 8;
    }
    for (; this.l < s; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      a = 1, this[this.l] = r & 255;
      break;
    case 2:
      a = 2, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255;
      break;
    case 3:
      a = 3, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255, r >>>= 8, this[this.l + 2] = r & 255;
      break;
    case 4:
      a = 4, N1(this, r, this.l);
      break;
    case 8:
      if (a = 8, t === "f") {
        O1(this, r, this.l);
        break;
      }
    case 16:
      break;
    case -4:
      a = 4, b1(this, r, this.l);
      break;
  }
  return this.l += a, this;
}
function Yl(e, r) {
  var t = Ll(this, this.l, e.length >> 1);
  if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
  this.l += e.length >> 1;
}
function or(e, r) {
  e.l = r, e.read_shift = /*::(*/
  _n, e.chk = Yl, e.write_shift = L1;
}
function Tr(e, r) {
  e.l += r;
}
function Ze(e) {
  var r = ra(e);
  return or(r, 0), r;
}
function Mt(e, r, t) {
  if (e) {
    var a, n, s;
    or(e, e.l || 0);
    for (var i = e.length, c = 0, o = 0; e.l < i; ) {
      c = e.read_shift(1), c & 128 && (c = (c & 127) + ((e.read_shift(1) & 127) << 7));
      var f = bs[c] || bs[65535];
      for (a = e.read_shift(1), s = a & 127, n = 1; n < 4 && a & 128; ++n) s += ((a = e.read_shift(1)) & 127) << 7 * n;
      o = e.l + s;
      var l = f.f && f.f(e, s, t);
      if (e.l = o, r(l, f, c)) return;
    }
  }
}
function Mi() {
  var e = [], r = Fe ? 256 : 2048, t = function(f) {
    var l = Ze(f);
    return or(l, 0), l;
  }, a = t(r), n = function() {
    a && (a.length > a.l && (a = a.slice(0, a.l), a.l = a.length), a.length > 0 && e.push(a), a = null);
  }, s = function(f) {
    return a && f < a.length - a.l ? a : (n(), a = t(Math.max(f + 1, r)));
  }, i = function() {
    return n(), Xt(e);
  }, c = function(f) {
    n(), a = f, a.l == null && (a.l = a.length), s(r);
  };
  return { next: s, push: c, end: i, _bufs: e };
}
function En(e, r, t) {
  var a = lr(e);
  if (r.s ? (a.cRel && (a.c += r.s.c), a.rRel && (a.r += r.s.r)) : (a.cRel && (a.c += r.c), a.rRel && (a.r += r.r)), !t || t.biff < 12) {
    for (; a.c >= 256; ) a.c -= 256;
    for (; a.r >= 65536; ) a.r -= 65536;
  }
  return a;
}
function To(e, r, t) {
  var a = lr(e);
  return a.s = En(a.s, r.s, t), a.e = En(a.e, r.s, t), a;
}
function yn(e, r) {
  if (e.cRel && e.c < 0)
    for (e = lr(e); e.c < 0; ) e.c += r > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = lr(e); e.r < 0; ) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384;
  var t = ge(e);
  return !e.cRel && e.cRel != null && (t = U1(t)), !e.rRel && e.rRel != null && (t = M1(t)), t;
}
function mi(e, r) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + rr(e.s.c) + ":" + (e.e.cRel ? "" : "$") + rr(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + ur(e.s.r) + ":" + (e.e.rRel ? "" : "$") + ur(e.e.r) : yn(e.s, r.biff) + ":" + yn(e.e, r.biff);
}
function _0(e) {
  return parseInt(B1(e), 10) - 1;
}
function ur(e) {
  return "" + (e + 1);
}
function M1(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function B1(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function E0(e) {
  for (var r = j1(e), t = 0, a = 0; a !== r.length; ++a) t = 26 * t + r.charCodeAt(a) - 64;
  return t - 1;
}
function rr(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var r = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
  return r;
}
function U1(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function j1(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function V1(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Cr(e) {
  for (var r = 0, t = 0, a = 0; a < e.length; ++a) {
    var n = e.charCodeAt(a);
    n >= 48 && n <= 57 ? r = 10 * r + (n - 48) : n >= 65 && n <= 90 && (t = 26 * t + (n - 64));
  }
  return { c: t - 1, r: r - 1 };
}
function ge(e) {
  for (var r = e.c + 1, t = ""; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
  return t + (e.r + 1);
}
function Ka(e) {
  var r = e.indexOf(":");
  return r == -1 ? { s: Cr(e), e: Cr(e) } : { s: Cr(e.slice(0, r)), e: Cr(e.slice(r + 1)) };
}
function Re(e, r) {
  return typeof r > "u" || typeof r == "number" ? Re(e.s, e.e) : (typeof e != "string" && (e = ge(e)), typeof r != "string" && (r = ge(r)), e == r ? e : e + ":" + r);
}
function Ge(e) {
  var r = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, t = 0, a = 0, n = 0, s = e.length;
  for (t = 0; a < s && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a)
    t = 26 * t + n;
  for (r.s.c = --t, t = 0; a < s && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a)
    t = 10 * t + n;
  if (r.s.r = --t, a === s || n != 10)
    return r.e.c = r.s.c, r.e.r = r.s.r, r;
  for (++a, t = 0; a != s && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a)
    t = 26 * t + n;
  for (r.e.c = --t, t = 0; a != s && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a)
    t = 10 * t + n;
  return r.e.r = --t, r;
}
function ko(e, r) {
  var t = e.t == "d" && r instanceof Date;
  if (e.z != null) try {
    return e.w = Qr(e.z, t ? Or(r) : r);
  } catch {
  }
  try {
    return e.w = Qr((e.XF || {}).numFmtId || (t ? 14 : 0), t ? Or(r) : r);
  } catch {
    return "" + r;
  }
}
function bt(e, r, t) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && t && t.dateNF && (e.z = t.dateNF), e.t == "e" ? Sa[e.v] || e.v : r == null ? ko(e, e.v) : ko(e, r));
}
function aa(e, r) {
  var t = r && r.sheet ? r.sheet : "Sheet1", a = {};
  return a[t] = e, { SheetNames: [t], Sheets: a };
}
function Jl(e, r, t) {
  var a = t || {}, n = e ? Array.isArray(e) : a.dense, s = e || (n ? [] : {}), i = 0, c = 0;
  if (s && a.origin != null) {
    if (typeof a.origin == "number") i = a.origin;
    else {
      var o = typeof a.origin == "string" ? Cr(a.origin) : a.origin;
      i = o.r, c = o.c;
    }
    s["!ref"] || (s["!ref"] = "A1:A1");
  }
  var f = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (s["!ref"]) {
    var l = Ge(s["!ref"]);
    f.s.c = l.s.c, f.s.r = l.s.r, f.e.c = Math.max(f.e.c, l.e.c), f.e.r = Math.max(f.e.r, l.e.r), i == -1 && (f.e.r = i = l.e.r + 1);
  }
  for (var u = 0; u != r.length; ++u)
    if (r[u]) {
      if (!Array.isArray(r[u])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var p = 0; p != r[u].length; ++p)
        if (!(typeof r[u][p] > "u")) {
          var h = { v: r[u][p] }, d = i + u, m = c + p;
          if (f.s.r > d && (f.s.r = d), f.s.c > m && (f.s.c = m), f.e.r < d && (f.e.r = d), f.e.c < m && (f.e.c = m), r[u][p] && typeof r[u][p] == "object" && !Array.isArray(r[u][p]) && !(r[u][p] instanceof Date)) h = r[u][p];
          else if (Array.isArray(h.v) && (h.f = r[u][p][1], h.v = h.v[0]), h.v === null)
            if (h.f) h.t = "n";
            else if (a.nullError)
              h.t = "e", h.v = 0;
            else if (a.sheetStubs) h.t = "z";
            else continue;
          else typeof h.v == "number" ? h.t = "n" : typeof h.v == "boolean" ? h.t = "b" : h.v instanceof Date ? (h.z = a.dateNF || Ee[14], a.cellDates ? (h.t = "d", h.w = Qr(h.z, Or(h.v))) : (h.t = "n", h.v = Or(h.v), h.w = Qr(h.z, h.v))) : h.t = "s";
          if (n)
            s[d] || (s[d] = []), s[d][m] && s[d][m].z && (h.z = s[d][m].z), s[d][m] = h;
          else {
            var x = ge({ c: m, r: d });
            s[x] && s[x].z && (h.z = s[x].z), s[x] = h;
          }
        }
    }
  return f.s.c < 1e7 && (s["!ref"] = Re(f)), s;
}
function qa(e, r) {
  return Jl(null, e, r);
}
function H1(e) {
  return e.read_shift(4, "i");
}
function wr(e) {
  var r = e.read_shift(4);
  return r === 0 ? "" : e.read_shift(r, "dbcs");
}
function G1(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function y0(e, r) {
  var t = e.l, a = e.read_shift(1), n = wr(e), s = [], i = { t: n, h: n };
  if (a & 1) {
    for (var c = e.read_shift(4), o = 0; o != c; ++o) s.push(G1(e));
    i.r = s;
  } else i.r = [{ ich: 0, ifnt: 0 }];
  return e.l = t + r, i;
}
var z1 = y0;
function et(e) {
  var r = e.read_shift(4), t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: r, iStyleRef: t };
}
function Ta(e) {
  var r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: r };
}
var W1 = wr;
function w0(e) {
  var r = e.read_shift(4);
  return r === 0 || r === 4294967295 ? "" : e.read_shift(r, "dbcs");
}
var X1 = wr, Bi = w0;
function T0(e) {
  var r = e.slice(e.l, e.l + 4), t = r[0] & 1, a = r[0] & 2;
  e.l += 4;
  var n = a === 0 ? Cs([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : ca(r, 0) >> 2;
  return t ? n / 100 : n;
}
function Zl(e) {
  var r = { s: {}, e: {} };
  return r.s.r = e.read_shift(4), r.e.r = e.read_shift(4), r.s.c = e.read_shift(4), r.e.c = e.read_shift(4), r;
}
var ka = Zl;
function Er(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function K1(e) {
  var r = {}, t = e.read_shift(1), a = t >>> 1, n = e.read_shift(1), s = e.read_shift(2, "i"), i = e.read_shift(1), c = e.read_shift(1), o = e.read_shift(1);
  switch (e.l++, a) {
    case 0:
      r.auto = 1;
      break;
    case 1:
      r.index = n;
      var f = pa[n];
      f && (r.rgb = Ln(f));
      break;
    case 2:
      r.rgb = Ln([i, c, o]);
      break;
    case 3:
      r.theme = n;
      break;
  }
  return s != 0 && (r.tint = s > 0 ? s / 32767 : s / 32768), r;
}
function q1(e) {
  var r = e.read_shift(1);
  e.l++;
  var t = {
    fBold: r & 1,
    fItalic: r & 2,
    fUnderline: r & 4,
    fStrikeout: r & 8,
    fOutline: r & 16,
    fShadow: r & 32,
    fCondense: r & 64,
    fExtend: r & 128
  };
  return t;
}
function Ql(e, r) {
  var t = { 2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE" }, a = e.read_shift(4);
  switch (a) {
    case 0:
      return "";
    case 4294967295:
    case 4294967294:
      return t[e.read_shift(4)] || "";
  }
  if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
  return e.l -= 4, e.read_shift(0, r == 1 ? "lpstr" : "lpwstr");
}
function Y1(e) {
  return Ql(e, 1);
}
function J1(e) {
  return Ql(e, 2);
}
var k0 = 2, Dr = 3, es = 11, So = 12, Rs = 19, rs = 64, Z1 = 65, Q1 = 71, ep = 4108, rp = 4126, nr = 80, eu = 81, tp = [nr, eu], ap = {
  /*::[*/
  1: { n: "CodePage", t: k0 },
  /*::[*/
  2: { n: "Category", t: nr },
  /*::[*/
  3: { n: "PresentationFormat", t: nr },
  /*::[*/
  4: { n: "ByteCount", t: Dr },
  /*::[*/
  5: { n: "LineCount", t: Dr },
  /*::[*/
  6: { n: "ParagraphCount", t: Dr },
  /*::[*/
  7: { n: "SlideCount", t: Dr },
  /*::[*/
  8: { n: "NoteCount", t: Dr },
  /*::[*/
  9: { n: "HiddenCount", t: Dr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: Dr },
  /*::[*/
  11: { n: "ScaleCrop", t: es },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: ep
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: rp
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: nr },
  /*::[*/
  15: { n: "Company", t: nr },
  /*::[*/
  16: { n: "LinksUpToDate", t: es },
  /*::[*/
  17: { n: "CharacterCount", t: Dr },
  /*::[*/
  19: { n: "SharedDoc", t: es },
  /*::[*/
  22: { n: "HyperlinksChanged", t: es },
  /*::[*/
  23: { n: "AppVersion", t: Dr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Z1 },
  /*::[*/
  26: { n: "ContentType", t: nr },
  /*::[*/
  27: { n: "ContentStatus", t: nr },
  /*::[*/
  28: { n: "Language", t: nr },
  /*::[*/
  29: { n: "Version", t: nr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Rs },
  /*::[*/
  2147483651: { n: "Behavior", t: Rs },
  /*::[*/
  1919054434: {}
}, np = {
  /*::[*/
  1: { n: "CodePage", t: k0 },
  /*::[*/
  2: { n: "Title", t: nr },
  /*::[*/
  3: { n: "Subject", t: nr },
  /*::[*/
  4: { n: "Author", t: nr },
  /*::[*/
  5: { n: "Keywords", t: nr },
  /*::[*/
  6: { n: "Comments", t: nr },
  /*::[*/
  7: { n: "Template", t: nr },
  /*::[*/
  8: { n: "LastAuthor", t: nr },
  /*::[*/
  9: { n: "RevNumber", t: nr },
  /*::[*/
  10: { n: "EditTime", t: rs },
  /*::[*/
  11: { n: "LastPrinted", t: rs },
  /*::[*/
  12: { n: "CreatedDate", t: rs },
  /*::[*/
  13: { n: "ModifiedDate", t: rs },
  /*::[*/
  14: { n: "PageCount", t: Dr },
  /*::[*/
  15: { n: "WordCount", t: Dr },
  /*::[*/
  16: { n: "CharCount", t: Dr },
  /*::[*/
  17: { n: "Thumbnail", t: Q1 },
  /*::[*/
  18: { n: "Application", t: nr },
  /*::[*/
  19: { n: "DocSecurity", t: Dr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: Rs },
  /*::[*/
  2147483651: { n: "Behavior", t: Rs },
  /*::[*/
  1919054434: {}
}, Ao = {
  /*::[*/
  1: "US",
  // United States
  /*::[*/
  2: "CA",
  // Canada
  /*::[*/
  3: "",
  // Latin America (except Brazil)
  /*::[*/
  7: "RU",
  // Russia
  /*::[*/
  20: "EG",
  // Egypt
  /*::[*/
  30: "GR",
  // Greece
  /*::[*/
  31: "NL",
  // Netherlands
  /*::[*/
  32: "BE",
  // Belgium
  /*::[*/
  33: "FR",
  // France
  /*::[*/
  34: "ES",
  // Spain
  /*::[*/
  36: "HU",
  // Hungary
  /*::[*/
  39: "IT",
  // Italy
  /*::[*/
  41: "CH",
  // Switzerland
  /*::[*/
  43: "AT",
  // Austria
  /*::[*/
  44: "GB",
  // United Kingdom
  /*::[*/
  45: "DK",
  // Denmark
  /*::[*/
  46: "SE",
  // Sweden
  /*::[*/
  47: "NO",
  // Norway
  /*::[*/
  48: "PL",
  // Poland
  /*::[*/
  49: "DE",
  // Germany
  /*::[*/
  52: "MX",
  // Mexico
  /*::[*/
  55: "BR",
  // Brazil
  /*::[*/
  61: "AU",
  // Australia
  /*::[*/
  64: "NZ",
  // New Zealand
  /*::[*/
  66: "TH",
  // Thailand
  /*::[*/
  81: "JP",
  // Japan
  /*::[*/
  82: "KR",
  // Korea
  /*::[*/
  84: "VN",
  // Viet Nam
  /*::[*/
  86: "CN",
  // China
  /*::[*/
  90: "TR",
  // Turkey
  /*::[*/
  105: "JS",
  // Ramastan
  /*::[*/
  213: "DZ",
  // Algeria
  /*::[*/
  216: "MA",
  // Morocco
  /*::[*/
  218: "LY",
  // Libya
  /*::[*/
  351: "PT",
  // Portugal
  /*::[*/
  354: "IS",
  // Iceland
  /*::[*/
  358: "FI",
  // Finland
  /*::[*/
  420: "CZ",
  // Czech Republic
  /*::[*/
  886: "TW",
  // Taiwan
  /*::[*/
  961: "LB",
  // Lebanon
  /*::[*/
  962: "JO",
  // Jordan
  /*::[*/
  963: "SY",
  // Syria
  /*::[*/
  964: "IQ",
  // Iraq
  /*::[*/
  965: "KW",
  // Kuwait
  /*::[*/
  966: "SA",
  // Saudi Arabia
  /*::[*/
  971: "AE",
  // United Arab Emirates
  /*::[*/
  972: "IL",
  // Israel
  /*::[*/
  974: "QA",
  // Qatar
  /*::[*/
  981: "IR",
  // Iran
  /*::[*/
  65535: "US"
  // United States
}, sp = [
  null,
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
];
function ip(e) {
  return e.map(function(r) {
    return [r >> 16 & 255, r >> 8 & 255, r & 255];
  });
}
var cp = /* @__PURE__ */ ip([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  /* Other entries to appease BIFF8/12 */
  16777215,
  /* 0x40 icvForeground ?? */
  0,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), pa = /* @__PURE__ */ lr(cp), Sa = {
  /*::[*/
  0: "#NULL!",
  /*::[*/
  7: "#DIV/0!",
  /*::[*/
  15: "#VALUE!",
  /*::[*/
  23: "#REF!",
  /*::[*/
  29: "#NAME?",
  /*::[*/
  36: "#NUM!",
  /*::[*/
  42: "#N/A",
  /*::[*/
  43: "#GETTING_DATA",
  /*::[*/
  255: "#WTF?"
}, ru = {
  "#NULL!": 0,
  "#DIV/0!": 7,
  "#VALUE!": 15,
  "#REF!": 23,
  "#NAME?": 29,
  "#NUM!": 36,
  "#N/A": 42,
  "#GETTING_DATA": 43,
  "#WTF?": 255
}, $o = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
};
function op() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function fp(e) {
  var r = op();
  if (!e || !e.match) return r;
  var t = {};
  if ((e.match(kr) || []).forEach(function(a) {
    var n = me(a);
    switch (n[0].replace(v1, "<")) {
      case "<?xml":
        break;
      case "<Types":
        r.xmlns = n["xmlns" + (n[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        t[n.Extension] = n.ContentType;
        break;
      case "<Override":
        r[$o[n.ContentType]] !== void 0 && r[$o[n.ContentType]].push(n.PartName);
        break;
    }
  }), r.xmlns !== F1.CT) throw new Error("Unknown Namespace: " + r.xmlns);
  return r.calcchain = r.calcchains.length > 0 ? r.calcchains[0] : "", r.sst = r.strs.length > 0 ? r.strs[0] : "", r.style = r.styles.length > 0 ? r.styles[0] : "", r.defaults = t, delete r.calcchains, r;
}
var Da = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Ui(e) {
  var r = e.lastIndexOf("/");
  return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels";
}
function wn(e, r) {
  var t = { "!id": {} };
  if (!e) return t;
  r.charAt(0) !== "/" && (r = "/" + r);
  var a = {};
  return (e.match(kr) || []).forEach(function(n) {
    var s = me(n);
    if (s[0] === "<Relationship") {
      var i = {};
      i.Type = s.Type, i.Target = s.Target, i.Id = s.Id, s.TargetMode && (i.TargetMode = s.TargetMode);
      var c = s.TargetMode === "External" ? s.Target : mn(s.Target, r);
      t[c] = i, a[s.Id] = i;
    }
  }), t["!id"] = a, t;
}
var lp = "application/vnd.oasis.opendocument.spreadsheet";
function up(e, r) {
  for (var t = v0(e), a, n; a = bn.exec(t); ) switch (a[3]) {
    case "manifest":
      break;
    case "file-entry":
      if (n = me(a[0], !1), n.path == "/" && n.type !== lp) throw new Error("This OpenDocument is not a spreadsheet");
      break;
    case "encryption-data":
    case "algorithm":
    case "start-key-generation":
    case "key-derivation":
      throw new Error("Unsupported ODS Encryption");
    default:
      if (r && r.WTF) throw a;
  }
}
var Tn = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
], hp = /* @__PURE__ */ function() {
  for (var e = new Array(Tn.length), r = 0; r < Tn.length; ++r) {
    var t = Tn[r], a = "(?:" + t[0].slice(0, t[0].indexOf(":")) + ":)" + t[0].slice(t[0].indexOf(":") + 1);
    e[r] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">");
  }
  return e;
}();
function tu(e) {
  var r = {};
  e = Ne(e);
  for (var t = 0; t < Tn.length; ++t) {
    var a = Tn[t], n = e.match(hp[t]);
    n != null && n.length > 0 && (r[a[1]] = Oe(n[1])), a[2] === "date" && r[a[1]] && (r[a[1]] = sr(r[a[1]]));
  }
  return r;
}
var dp = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
];
function au(e, r, t, a) {
  var n = [];
  if (typeof e == "string") n = vo(e, a);
  else for (var s = 0; s < e.length; ++s) n = n.concat(e[s].map(function(l) {
    return { v: l };
  }));
  var i = typeof r == "string" ? vo(r, a).map(function(l) {
    return l.v;
  }) : r, c = 0, o = 0;
  if (i.length > 0) for (var f = 0; f !== n.length; f += 2) {
    switch (o = +n[f + 1].v, n[f].v) {
      case "Worksheets":
      case "工作表":
      case "Листы":
      case "أوراق العمل":
      case "ワークシート":
      case "גליונות עבודה":
      case "Arbeitsblätter":
      case "Çalışma Sayfaları":
      case "Feuilles de calcul":
      case "Fogli di lavoro":
      case "Folhas de cálculo":
      case "Planilhas":
      case "Regneark":
      case "Hojas de cálculo":
      case "Werkbladen":
        t.Worksheets = o, t.SheetNames = i.slice(c, c + o);
        break;
      case "Named Ranges":
      case "Rangos con nombre":
      case "名前付き一覧":
      case "Benannte Bereiche":
      case "Navngivne områder":
        t.NamedRanges = o, t.DefinedNames = i.slice(c, c + o);
        break;
      case "Charts":
      case "Diagramme":
        t.Chartsheets = o, t.ChartNames = i.slice(c, c + o);
        break;
    }
    c += o;
  }
}
function pp(e, r, t) {
  var a = {};
  return r || (r = {}), e = Ne(e), dp.forEach(function(n) {
    var s = (e.match(Nn(n[0])) || [])[1];
    switch (n[2]) {
      case "string":
        s && (r[n[1]] = Oe(s));
        break;
      case "bool":
        r[n[1]] = s === "true";
        break;
      case "raw":
        var i = e.match(new RegExp("<" + n[0] + "[^>]*>([\\s\\S]*?)</" + n[0] + ">"));
        i && i.length > 0 && (a[n[1]] = i[1]);
        break;
    }
  }), a.HeadingPairs && a.TitlesOfParts && au(a.HeadingPairs, a.TitlesOfParts, r, t), r;
}
var mp = /<[^>]+>[^<]*/g;
function xp(e, r) {
  var t = {}, a = "", n = e.match(mp);
  if (n) for (var s = 0; s != n.length; ++s) {
    var i = n[s], c = me(i);
    switch (c[0]) {
      case "<?xml":
        break;
      case "<Properties":
        break;
      case "<property":
        a = Oe(c.name);
        break;
      case "</property>":
        a = null;
        break;
      default:
        if (i.indexOf("<vt:") === 0) {
          var o = i.split(">"), f = o[0].slice(4), l = o[1];
          switch (f) {
            case "lpstr":
            case "bstr":
            case "lpwstr":
              t[a] = Oe(l);
              break;
            case "bool":
              t[a] = Ue(l);
              break;
            case "i1":
            case "i2":
            case "i4":
            case "i8":
            case "int":
            case "uint":
              t[a] = parseInt(l, 10);
              break;
            case "r4":
            case "r8":
            case "decimal":
              t[a] = parseFloat(l);
              break;
            case "filetime":
            case "date":
              t[a] = sr(l);
              break;
            case "cy":
            case "error":
              t[a] = Oe(l);
              break;
            default:
              if (f.slice(-1) == "/") break;
              r.WTF && typeof console < "u" && console.warn("Unexpected", i, f, o);
          }
        } else if (i.slice(0, 2) !== "</") {
          if (r.WTF) throw new Error(i);
        }
    }
  }
  return t;
}
var vp = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
}, xi;
function gp(e, r, t) {
  xi || (xi = p0(vp)), r = xi[r] || r, e[r] = t;
}
function S0(e) {
  var r = e.read_shift(4), t = e.read_shift(4);
  return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}
function nu(e, r, t) {
  var a = e.l, n = e.read_shift(0, "lpstr-cp");
  if (t) for (; e.l - a & 3; ) ++e.l;
  return n;
}
function su(e, r, t) {
  var a = e.read_shift(0, "lpwstr");
  return a;
}
function iu(e, r, t) {
  return r === 31 ? su(e) : nu(e, r, t);
}
function ji(e, r, t) {
  return iu(e, r, t === !1 ? 0 : 4);
}
function _p(e, r) {
  if (!r) throw new Error("VtUnalignedString must have positive length");
  return iu(e, r, 0);
}
function Ep(e) {
  for (var r = e.read_shift(4), t = [], a = 0; a != r; ++a) {
    var n = e.l;
    t[a] = e.read_shift(0, "lpwstr").replace(Rr, ""), e.l - n & 2 && (e.l += 2);
  }
  return t;
}
function yp(e) {
  for (var r = e.read_shift(4), t = [], a = 0; a != r; ++a) t[a] = e.read_shift(0, "lpstr-cp").replace(Rr, "");
  return t;
}
function wp(e) {
  var r = e.l, t = Os(e, eu);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - r & 2 && (e.l += 2);
  var a = Os(e, Dr);
  return [t, a];
}
function Tp(e) {
  for (var r = e.read_shift(4), t = [], a = 0; a < r / 2; ++a) t.push(wp(e));
  return t;
}
function Fo(e, r) {
  for (var t = e.read_shift(4), a = {}, n = 0; n != t; ++n) {
    var s = e.read_shift(4), i = e.read_shift(4);
    a[s] = e.read_shift(i, r === 1200 ? "utf16le" : "utf8").replace(Rr, "").replace(pn, "!"), r === 1200 && i % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), a;
}
function cu(e) {
  var r = e.read_shift(4), t = e.slice(e.l, e.l + r);
  return e.l += r, (r & 3) > 0 && (e.l += 4 - (r & 3) & 3), t;
}
function kp(e) {
  var r = {};
  return r.Size = e.read_shift(4), e.l += r.Size + 3 - (r.Size - 1) % 4, r;
}
function Os(e, r, t) {
  var a = e.read_shift(2), n, s = t || {};
  if (e.l += 2, r !== So && a !== r && tp.indexOf(r) === -1 && !((r & 65534) == 4126 && (a & 65534) == 4126))
    throw new Error("Expected type " + r + " saw " + a);
  switch (r === So ? a : r) {
    case 2:
      return n = e.read_shift(2, "i"), s.raw || (e.l += 2), n;
    case 3:
      return n = e.read_shift(4, "i"), n;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return n = e.read_shift(4), n;
    case 30:
      return nu(e, a, 4).replace(Rr, "");
    case 31:
      return su(e);
    case 64:
      return S0(e);
    case 65:
      return cu(e);
    case 71:
      return kp(e);
    case 80:
      return ji(e, a, !s.raw).replace(Rr, "");
    case 81:
      return _p(
        e,
        a
        /*, 4*/
      ).replace(Rr, "");
    case 4108:
      return Tp(e);
    case 4126:
    case 4127:
      return a == 4127 ? Ep(e) : yp(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + r + " " + a);
  }
}
function Co(e, r) {
  var t = e.l, a = e.read_shift(4), n = e.read_shift(4), s = [], i = 0, c = 0, o = -1, f = {};
  for (i = 0; i != n; ++i) {
    var l = e.read_shift(4), u = e.read_shift(4);
    s[i] = [l, u + t];
  }
  s.sort(function(T, E) {
    return T[1] - E[1];
  });
  var p = {};
  for (i = 0; i != n; ++i) {
    if (e.l !== s[i][1]) {
      var h = !0;
      if (i > 0 && r) switch (r[s[i - 1][0]].t) {
        case 2:
          e.l + 2 === s[i][1] && (e.l += 2, h = !1);
          break;
        case 80:
          e.l <= s[i][1] && (e.l = s[i][1], h = !1);
          break;
        case 4108:
          e.l <= s[i][1] && (e.l = s[i][1], h = !1);
          break;
      }
      if ((!r || i == 0) && e.l <= s[i][1] && (h = !1, e.l = s[i][1]), h) throw new Error("Read Error: Expected address " + s[i][1] + " at " + e.l + " :" + i);
    }
    if (r) {
      var d = r[s[i][0]];
      if (p[d.n] = Os(e, d.t, { raw: !0 }), d.p === "version" && (p[d.n] = String(p[d.n] >> 16) + "." + ("0000" + String(p[d.n] & 65535)).slice(-4)), d.n == "CodePage") switch (p[d.n]) {
        case 0:
          p[d.n] = 1252;
        case 874:
        case 932:
        case 936:
        case 949:
        case 950:
        case 1250:
        case 1251:
        case 1253:
        case 1254:
        case 1255:
        case 1256:
        case 1257:
        case 1258:
        case 1e4:
        case 1200:
        case 1201:
        case 1252:
        case 65e3:
        case -536:
        case 65001:
        case -535:
          ct(c = p[d.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + p[d.n]);
      }
    } else if (s[i][0] === 1) {
      if (c = p.CodePage = Os(e, k0), ct(c), o !== -1) {
        var m = e.l;
        e.l = s[o][1], f = Fo(e, c), e.l = m;
      }
    } else if (s[i][0] === 0) {
      if (c === 0) {
        o = i, e.l = s[i + 1][1];
        continue;
      }
      f = Fo(e, c);
    } else {
      var x = f[s[i][0]], g;
      switch (e[e.l]) {
        case 65:
          e.l += 4, g = cu(e);
          break;
        case 30:
          e.l += 4, g = ji(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 31:
          e.l += 4, g = ji(e, e[e.l - 4]).replace(/\u0000+$/, "");
          break;
        case 3:
          e.l += 4, g = e.read_shift(4, "i");
          break;
        case 19:
          e.l += 4, g = e.read_shift(4);
          break;
        case 5:
          e.l += 4, g = e.read_shift(8, "f");
          break;
        case 11:
          e.l += 4, g = We(e, 4);
          break;
        case 64:
          e.l += 4, g = sr(S0(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      p[x] = g;
    }
  }
  return e.l = t + a, p;
}
function Ro(e, r, t) {
  var a = e.content;
  if (!a) return {};
  or(a, 0);
  var n, s, i, c, o = 0;
  a.chk("feff", "Byte Order: "), a.read_shift(2);
  var f = a.read_shift(4), l = a.read_shift(16);
  if (l !== Ce.utils.consts.HEADER_CLSID && l !== t) throw new Error("Bad PropertySet CLSID " + l);
  if (n = a.read_shift(4), n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
  if (s = a.read_shift(16), c = a.read_shift(4), n === 1 && c !== a.l) throw new Error("Length mismatch: " + c + " !== " + a.l);
  n === 2 && (i = a.read_shift(16), o = a.read_shift(4));
  var u = Co(a, r), p = { SystemIdentifier: f };
  for (var h in u) p[h] = u[h];
  if (p.FMTID = s, n === 1) return p;
  if (o - a.l == 2 && (a.l += 2), a.l !== o) throw new Error("Length mismatch 2: " + a.l + " !== " + o);
  var d;
  try {
    d = Co(a, null);
  } catch {
  }
  for (h in d) p[h] = d[h];
  return p.FMTID = [s, i], p;
}
function Bt(e, r) {
  return e.read_shift(r), null;
}
function Sp(e, r, t) {
  for (var a = [], n = e.l + r; e.l < n; ) a.push(t(e, n - e.l));
  if (n !== e.l) throw new Error("Slurp error");
  return a;
}
function We(e, r) {
  return e.read_shift(r) === 1;
}
function Ye(e) {
  return e.read_shift(2, "u");
}
function ou(e, r) {
  return Sp(e, r, Ye);
}
function Ap(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return t === 1 ? r : r === 1;
}
function Hn(e, r, t) {
  var a = e.read_shift(t && t.biff >= 12 ? 2 : 1), n = "sbcs-cont";
  if (t && t.biff >= 8, !t || t.biff == 8) {
    var s = e.read_shift(1);
    s && (n = "dbcs-cont");
  } else t.biff == 12 && (n = "wstr");
  t.biff >= 2 && t.biff <= 5 && (n = "cpstr");
  var i = a ? e.read_shift(a, n) : "";
  return i;
}
function $p(e) {
  var r = e.read_shift(2), t = e.read_shift(1), a = t & 4, n = t & 8, s = 1 + (t & 1), i = 0, c, o = {};
  n && (i = e.read_shift(2)), a && (c = e.read_shift(4));
  var f = s == 2 ? "dbcs-cont" : "sbcs-cont", l = r === 0 ? "" : e.read_shift(r, f);
  return n && (e.l += 4 * i), a && (e.l += c), o.t = l, n || (o.raw = "<t>" + o.t + "</t>", o.r = o.t), o;
}
function va(e, r, t) {
  var a;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return e.read_shift(r, "cpstr");
    if (t.biff >= 12) return e.read_shift(r, "dbcs-cont");
  }
  var n = e.read_shift(1);
  return n === 0 ? a = e.read_shift(r, "sbcs-cont") : a = e.read_shift(r, "dbcs-cont"), a;
}
function Gn(e, r, t) {
  var a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return a === 0 ? (e.l++, "") : va(e, a, t);
}
function Aa(e, r, t) {
  if (t.biff > 5) return Gn(e, r, t);
  var a = e.read_shift(1);
  return a === 0 ? (e.l++, "") : e.read_shift(a, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Fp(e) {
  var r = e.read_shift(1);
  e.l++;
  var t = e.read_shift(2);
  return e.l += 2, [r, t];
}
function Cp(e) {
  var r = e.read_shift(4), t = e.l, a = !1;
  r > 24 && (e.l += r - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (a = !0), e.l = t);
  var n = e.read_shift((a ? r - 24 : r) >> 1, "utf16le").replace(Rr, "");
  return a && (e.l += 24), n;
}
function Rp(e) {
  for (var r = e.read_shift(2), t = ""; r-- > 0; ) t += "../";
  var a = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var n = e.read_shift(4);
  if (n === 0) return t + a.replace(/\\/g, "/");
  var s = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var i = e.read_shift(s >> 1, "utf16le").replace(Rr, "");
  return t + i;
}
function Op(e, r) {
  var t = e.read_shift(16);
  switch (t) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return Cp(e);
    case "0303000000000000c000000000000046":
      return Rp(e);
    default:
      throw new Error("Unsupported Moniker " + t);
  }
}
function ts(e) {
  var r = e.read_shift(4), t = r > 0 ? e.read_shift(r, "utf16le").replace(Rr, "") : "";
  return t;
}
function Ip(e, r) {
  var t = e.l + r, a = e.read_shift(4);
  if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
  var n = e.read_shift(2);
  e.l += 2;
  var s, i, c, o, f = "", l, u;
  n & 16 && (s = ts(e, t - e.l)), n & 128 && (i = ts(e, t - e.l)), (n & 257) === 257 && (c = ts(e, t - e.l)), (n & 257) === 1 && (o = Op(e, t - e.l)), n & 8 && (f = ts(e, t - e.l)), n & 32 && (l = e.read_shift(16)), n & 64 && (u = S0(
    e
    /*, 8*/
  )), e.l = t;
  var p = i || c || o || "";
  p && f && (p += "#" + f), p || (p = "#" + f), n & 2 && p.charAt(0) == "/" && p.charAt(1) != "/" && (p = "file://" + p);
  var h = { Target: p };
  return l && (h.guid = l), u && (h.time = u), s && (h.Tooltip = s), h;
}
function fu(e) {
  var r = e.read_shift(1), t = e.read_shift(1), a = e.read_shift(1), n = e.read_shift(1);
  return [r, t, a, n];
}
function lu(e, r) {
  var t = fu(e);
  return t[3] = 0, t;
}
function yt(e) {
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(2);
  return { r, c: t, ixfe: a };
}
function Pp(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return e.l += 8, { type: r, flags: t };
}
function Np(e, r, t) {
  return r === 0 ? "" : Aa(e, r, t);
}
function bp(e, r, t) {
  var a = t.biff > 8 ? 4 : 2, n = e.read_shift(a), s = e.read_shift(a, "i"), i = e.read_shift(a, "i");
  return [n, s, i];
}
function uu(e) {
  var r = e.read_shift(2), t = T0(e);
  return [r, t];
}
function Dp(e, r, t) {
  e.l += 4, r -= 4;
  var a = e.l + r, n = Hn(e, r, t), s = e.read_shift(2);
  if (a -= e.l, s !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + s);
  return e.l += s, n;
}
function Gs(e) {
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2);
  return { s: { c: a, r }, e: { c: n, r: t } };
}
function hu(e) {
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { c: a, r }, e: { c: n, r: t } };
}
var Lp = hu;
function du(e) {
  e.l += 4;
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(2);
  return e.l += 12, [t, r, a];
}
function Mp(e) {
  var r = {};
  return e.l += 4, e.l += 16, r.fSharedNote = e.read_shift(2), e.l += 4, r;
}
function Bp(e) {
  var r = {};
  return e.l += 4, e.cf = e.read_shift(2), r;
}
function mr(e) {
  e.l += 2, e.l += e.read_shift(2);
}
var Up = {
  /*::[*/
  0: mr,
  /* FtEnd */
  /*::[*/
  4: mr,
  /* FtMacro */
  /*::[*/
  5: mr,
  /* FtButton */
  /*::[*/
  6: mr,
  /* FtGmo */
  /*::[*/
  7: Bp,
  /* FtCf */
  /*::[*/
  8: mr,
  /* FtPioGrbit */
  /*::[*/
  9: mr,
  /* FtPictFmla */
  /*::[*/
  10: mr,
  /* FtCbls */
  /*::[*/
  11: mr,
  /* FtRbo */
  /*::[*/
  12: mr,
  /* FtSbs */
  /*::[*/
  13: Mp,
  /* FtNts */
  /*::[*/
  14: mr,
  /* FtSbsFmla */
  /*::[*/
  15: mr,
  /* FtGboData */
  /*::[*/
  16: mr,
  /* FtEdoData */
  /*::[*/
  17: mr,
  /* FtRboData */
  /*::[*/
  18: mr,
  /* FtCblsData */
  /*::[*/
  19: mr,
  /* FtLbsData */
  /*::[*/
  20: mr,
  /* FtCblsFmla */
  /*::[*/
  21: du
};
function jp(e, r) {
  for (var t = e.l + r, a = []; e.l < t; ) {
    var n = e.read_shift(2);
    e.l -= 2;
    try {
      a.push(Up[n](e, t - e.l));
    } catch {
      return e.l = t, a;
    }
  }
  return e.l != t && (e.l = t), a;
}
function as(e, r) {
  var t = { BIFFVer: 0, dt: 0 };
  switch (t.BIFFVer = e.read_shift(2), r -= 2, r >= 2 && (t.dt = e.read_shift(2), e.l -= 2), t.BIFFVer) {
    case 1536:
    case 1280:
    case 1024:
    case 768:
    case 512:
    case 2:
    case 7:
      break;
    default:
      if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer);
  }
  return e.read_shift(r), t;
}
function Vp(e, r) {
  return r === 0 || e.read_shift(2), 1200;
}
function Hp(e, r, t) {
  if (t.enc)
    return e.l += r, "";
  var a = e.l, n = Aa(e, 0, t);
  return e.read_shift(r + a - e.l), n;
}
function Gp(e, r, t) {
  var a = t && t.biff == 8 || r == 2 ? e.read_shift(2) : (e.l += r, 0);
  return { fDialog: a & 16, fBelow: a & 64, fRight: a & 128 };
}
function zp(e, r, t) {
  var a = e.read_shift(4), n = e.read_shift(1) & 3, s = e.read_shift(1);
  switch (s) {
    case 0:
      s = "Worksheet";
      break;
    case 1:
      s = "Macrosheet";
      break;
    case 2:
      s = "Chartsheet";
      break;
    case 6:
      s = "VBAModule";
      break;
  }
  var i = Hn(e, 0, t);
  return i.length === 0 && (i = "Sheet1"), { pos: a, hs: n, dt: s, name: i };
}
function Wp(e, r) {
  for (var t = e.l + r, a = e.read_shift(4), n = e.read_shift(4), s = [], i = 0; i != n && e.l < t; ++i)
    s.push($p(e));
  return s.Count = a, s.Unique = n, s;
}
function Xp(e, r) {
  var t = {};
  return t.dsst = e.read_shift(2), e.l += r - 2, t;
}
function Kp(e) {
  var r = {};
  r.r = e.read_shift(2), r.c = e.read_shift(2), r.cnt = e.read_shift(2) - r.c;
  var t = e.read_shift(2);
  e.l += 4;
  var a = e.read_shift(1);
  return e.l += 3, a & 7 && (r.level = a & 7), a & 32 && (r.hidden = !0), a & 64 && (r.hpt = t / 20), r;
}
function qp(e) {
  var r = Pp(e);
  if (r.type != 2211) throw new Error("Invalid Future Record " + r.type);
  var t = e.read_shift(4);
  return t !== 0;
}
function Yp(e) {
  return e.read_shift(2), e.read_shift(4);
}
function Oo(e, r, t) {
  var a = 0;
  t && t.biff == 2 || (a = e.read_shift(2));
  var n = e.read_shift(2);
  t && t.biff == 2 && (a = 1 - (n >> 15), n &= 32767);
  var s = { Unsynced: a & 1, DyZero: (a & 2) >> 1, ExAsc: (a & 4) >> 2, ExDsc: (a & 8) >> 3 };
  return [s, n];
}
function Jp(e) {
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2), s = e.read_shift(2), i = e.read_shift(2), c = e.read_shift(2), o = e.read_shift(2), f = e.read_shift(2);
  return {
    Pos: [r, t],
    Dim: [a, n],
    Flags: s,
    CurTab: i,
    FirstTab: c,
    Selected: o,
    TabRatio: f
  };
}
function Zp(e, r, t) {
  if (t && t.biff >= 2 && t.biff < 5) return {};
  var a = e.read_shift(2);
  return { RTL: a & 64 };
}
function Qp() {
}
function em(e, r, t) {
  var a = {
    dyHeight: e.read_shift(2),
    fl: e.read_shift(2)
  };
  switch (t && t.biff || 8) {
    case 2:
      break;
    case 3:
    case 4:
      e.l += 2;
      break;
    default:
      e.l += 10;
      break;
  }
  return a.name = Hn(e, 0, t), a;
}
function rm(e) {
  var r = yt(e);
  return r.isst = e.read_shift(4), r;
}
function tm(e, r, t) {
  t.biffguess && t.biff == 2 && (t.biff = 5);
  var a = e.l + r, n = yt(e);
  t.biff == 2 && e.l++;
  var s = Gn(e, a - e.l, t);
  return n.val = s, n;
}
function am(e, r, t) {
  var a = e.read_shift(2), n = Aa(e, 0, t);
  return [a, n];
}
var nm = Aa;
function Io(e, r, t) {
  var a = e.l + r, n = t.biff == 8 || !t.biff ? 4 : 2, s = e.read_shift(n), i = e.read_shift(n), c = e.read_shift(2), o = e.read_shift(2);
  return e.l = a, { s: { r: s, c }, e: { r: i, c: o } };
}
function sm(e) {
  var r = e.read_shift(2), t = e.read_shift(2), a = uu(e);
  return { r, c: t, ixfe: a[0], rknum: a[1] };
}
function im(e, r) {
  for (var t = e.l + r - 2, a = e.read_shift(2), n = e.read_shift(2), s = []; e.l < t; ) s.push(uu(e));
  if (e.l !== t) throw new Error("MulRK read error");
  var i = e.read_shift(2);
  if (s.length != i - n + 1) throw new Error("MulRK length mismatch");
  return { r: a, c: n, C: i, rkrec: s };
}
function cm(e, r) {
  for (var t = e.l + r - 2, a = e.read_shift(2), n = e.read_shift(2), s = []; e.l < t; ) s.push(e.read_shift(2));
  if (e.l !== t) throw new Error("MulBlank read error");
  var i = e.read_shift(2);
  if (s.length != i - n + 1) throw new Error("MulBlank length mismatch");
  return { r: a, c: n, C: i, ixfe: s };
}
function om(e, r, t, a) {
  var n = {}, s = e.read_shift(4), i = e.read_shift(4), c = e.read_shift(4), o = e.read_shift(2);
  return n.patternType = sp[c >> 26], a.cellStyles && (n.alc = s & 7, n.fWrap = s >> 3 & 1, n.alcV = s >> 4 & 7, n.fJustLast = s >> 7 & 1, n.trot = s >> 8 & 255, n.cIndent = s >> 16 & 15, n.fShrinkToFit = s >> 20 & 1, n.iReadOrder = s >> 22 & 2, n.fAtrNum = s >> 26 & 1, n.fAtrFnt = s >> 27 & 1, n.fAtrAlc = s >> 28 & 1, n.fAtrBdr = s >> 29 & 1, n.fAtrPat = s >> 30 & 1, n.fAtrProt = s >> 31 & 1, n.dgLeft = i & 15, n.dgRight = i >> 4 & 15, n.dgTop = i >> 8 & 15, n.dgBottom = i >> 12 & 15, n.icvLeft = i >> 16 & 127, n.icvRight = i >> 23 & 127, n.grbitDiag = i >> 30 & 3, n.icvTop = c & 127, n.icvBottom = c >> 7 & 127, n.icvDiag = c >> 14 & 127, n.dgDiag = c >> 21 & 15, n.icvFore = o & 127, n.icvBack = o >> 7 & 127, n.fsxButton = o >> 14 & 1), n;
}
function fm(e, r, t) {
  var a = {};
  return a.ifnt = e.read_shift(2), a.numFmtId = e.read_shift(2), a.flags = e.read_shift(2), a.fStyle = a.flags >> 2 & 1, r -= 6, a.data = om(e, r, a.fStyle, t), a;
}
function lm(e) {
  e.l += 4;
  var r = [e.read_shift(2), e.read_shift(2)];
  if (r[0] !== 0 && r[0]--, r[1] !== 0 && r[1]--, r[0] > 7 || r[1] > 7) throw new Error("Bad Gutters: " + r.join("|"));
  return r;
}
function Po(e, r, t) {
  var a = yt(e);
  (t.biff == 2 || r == 9) && ++e.l;
  var n = Ap(e);
  return a.val = n, a.t = n === !0 || n === !1 ? "b" : "e", a;
}
function um(e, r, t) {
  t.biffguess && t.biff == 2 && (t.biff = 5);
  var a = yt(e), n = Er(e);
  return a.val = n, a;
}
var No = Np;
function hm(e, r, t) {
  var a = e.l + r, n = e.read_shift(2), s = e.read_shift(2);
  if (t.sbcch = s, s == 1025 || s == 14849) return [s, n];
  if (s < 1 || s > 255) throw new Error("Unexpected SupBook type: " + s);
  for (var i = va(e, s), c = []; a > e.l; ) c.push(Gn(e));
  return [s, n, i, c];
}
function bo(e, r, t) {
  var a = e.read_shift(2), n, s = {
    fBuiltIn: a & 1,
    fWantAdvise: a >>> 1 & 1,
    fWantPict: a >>> 2 & 1,
    fOle: a >>> 3 & 1,
    fOleLink: a >>> 4 & 1,
    cf: a >>> 5 & 1023,
    fIcon: a >>> 15 & 1
  };
  return t.sbcch === 14849 && (n = Dp(e, r - 2, t)), s.body = n || e.read_shift(r - 2), typeof n == "string" && (s.Name = n), s;
}
var dm = [
  "_xlnm.Consolidate_Area",
  "_xlnm.Auto_Open",
  "_xlnm.Auto_Close",
  "_xlnm.Extract",
  "_xlnm.Database",
  "_xlnm.Criteria",
  "_xlnm.Print_Area",
  "_xlnm.Print_Titles",
  "_xlnm.Recorder",
  "_xlnm.Data_Form",
  "_xlnm.Auto_Activate",
  "_xlnm.Auto_Deactivate",
  "_xlnm.Sheet_Title",
  "_xlnm._FilterDatabase"
];
function Do(e, r, t) {
  var a = e.l + r, n = e.read_shift(2), s = e.read_shift(1), i = e.read_shift(1), c = e.read_shift(t && t.biff == 2 ? 1 : 2), o = 0;
  (!t || t.biff >= 5) && (t.biff != 5 && (e.l += 2), o = e.read_shift(2), t.biff == 5 && (e.l += 2), e.l += 4);
  var f = va(e, i, t);
  n & 32 && (f = dm[f.charCodeAt(0)]);
  var l = a - e.l;
  t && t.biff == 2 && --l;
  var u = a == e.l || c === 0 || !(l > 0) ? [] : Kg(e, l, t, c);
  return {
    chKey: s,
    Name: f,
    itab: o,
    rgce: u
  };
}
function pu(e, r, t) {
  if (t.biff < 8) return pm(e, r, t);
  for (var a = [], n = e.l + r, s = e.read_shift(t.biff > 8 ? 4 : 2); s-- !== 0; ) a.push(bp(e, t.biff > 8 ? 12 : 6, t));
  if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
  return a;
}
function pm(e, r, t) {
  e[e.l + 1] == 3 && e[e.l]++;
  var a = Hn(e, r, t);
  return a.charCodeAt(0) == 3 ? a.slice(1) : a;
}
function mm(e, r, t) {
  if (t.biff < 8) {
    e.l += r;
    return;
  }
  var a = e.read_shift(2), n = e.read_shift(2), s = va(e, a, t), i = va(e, n, t);
  return [s, i];
}
function xm(e, r, t) {
  var a = hu(e);
  e.l++;
  var n = e.read_shift(1);
  return r -= 8, [qg(e, r, t), n, a];
}
function Lo(e, r, t) {
  var a = Lp(e);
  switch (t.biff) {
    case 2:
      e.l++, r -= 7;
      break;
    case 3:
    case 4:
      e.l += 2, r -= 8;
      break;
    default:
      e.l += 6, r -= 12;
  }
  return [a, Wg(e, r, t)];
}
function vm(e) {
  var r = e.read_shift(4) !== 0, t = e.read_shift(4) !== 0, a = e.read_shift(4);
  return [r, t, a];
}
function gm(e, r, t) {
  if (!(t.biff < 8)) {
    var a = e.read_shift(2), n = e.read_shift(2), s = e.read_shift(2), i = e.read_shift(2), c = Aa(e, 0, t);
    return t.biff < 8 && e.read_shift(1), [{ r: a, c: n }, c, i, s];
  }
}
function _m(e, r, t) {
  return gm(e, r, t);
}
function Em(e, r) {
  for (var t = [], a = e.read_shift(2); a--; ) t.push(Gs(e));
  return t;
}
function ym(e, r, t) {
  if (t && t.biff < 8) return Tm(e, r, t);
  var a = du(e), n = jp(e, r - 22, a[1]);
  return { cmo: a, ft: n };
}
var wm = {
  8: function(e, r) {
    var t = e.l + r;
    e.l += 10;
    var a = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var n = e.read_shift(1);
    return e.l += n, e.l = t, { fmt: a };
  }
};
function Tm(e, r, t) {
  e.l += 4;
  var a = e.read_shift(2), n = e.read_shift(2), s = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, r -= 36;
  var i = [];
  return i.push((wm[a] || Tr)(e, r, t)), { cmo: [n, a, s], ft: i };
}
function km(e, r, t) {
  var a = e.l, n = "";
  try {
    e.l += 4;
    var s = (t.lastobj || { cmo: [0, 0] }).cmo[1], i;
    [0, 5, 7, 11, 12, 14].indexOf(s) == -1 ? e.l += 6 : i = Fp(e, 6, t);
    var c = e.read_shift(2);
    e.read_shift(2), Ye(e, 2);
    var o = e.read_shift(2);
    e.l += o;
    for (var f = 1; f < e.lens.length - 1; ++f) {
      if (e.l - a != e.lens[f]) throw new Error("TxO: bad continue record");
      var l = e[e.l], u = va(e, e.lens[f + 1] - e.lens[f] - 1);
      if (n += u, n.length >= (l ? c : 2 * c)) break;
    }
    if (n.length !== c && n.length !== c * 2)
      throw new Error("cchText: " + c + " != " + n.length);
    return e.l = a + r, { t: n };
  } catch {
    return e.l = a + r, { t: n };
  }
}
function Sm(e, r) {
  var t = Gs(e);
  e.l += 16;
  var a = Ip(e, r - 24);
  return [t, a];
}
function Am(e, r) {
  e.read_shift(2);
  var t = Gs(e), a = e.read_shift((r - 10) / 2, "dbcs-cont");
  return a = a.replace(Rr, ""), [t, a];
}
function $m(e) {
  var r = [0, 0], t;
  return t = e.read_shift(2), r[0] = Ao[t] || t, t = e.read_shift(2), r[1] = Ao[t] || t, r;
}
function Fm(e) {
  for (var r = e.read_shift(2), t = []; r-- > 0; ) t.push(lu(e));
  return t;
}
function Cm(e) {
  for (var r = e.read_shift(2), t = []; r-- > 0; ) t.push(lu(e));
  return t;
}
function Rm(e) {
  e.l += 2;
  var r = { cxfs: 0, crc: 0 };
  return r.cxfs = e.read_shift(2), r.crc = e.read_shift(4), r;
}
function mu(e, r, t) {
  if (!t.cellStyles) return Tr(e, r);
  var a = t && t.biff >= 12 ? 4 : 2, n = e.read_shift(a), s = e.read_shift(a), i = e.read_shift(a), c = e.read_shift(a), o = e.read_shift(2);
  a == 2 && (e.l += 2);
  var f = { s: n, e: s, w: i, ixfe: c, flags: o };
  return (t.biff >= 5 || !t.biff) && (f.level = o >> 8 & 7), f;
}
function Om(e, r) {
  var t = {};
  return r < 32 || (e.l += 16, t.header = Er(e), t.footer = Er(e), e.l += 2), t;
}
function Im(e, r, t) {
  var a = { area: !1 };
  if (t.biff != 5)
    return e.l += r, a;
  var n = e.read_shift(1);
  return e.l += 3, n & 16 && (a.area = !0), a;
}
var Pm = yt, Nm = ou, bm = Gn;
function Dm(e) {
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(4), n = { fmt: r, env: t, len: a, data: e.slice(e.l, e.l + a) };
  return e.l += a, n;
}
function Lm(e, r, t) {
  t.biffguess && t.biff == 5 && (t.biff = 2);
  var a = yt(e);
  ++e.l;
  var n = Aa(e, r - 7, t);
  return a.t = "str", a.val = n, a;
}
function Mm(e) {
  var r = yt(e);
  ++e.l;
  var t = Er(e);
  return r.t = "n", r.val = t, r;
}
function Bm(e) {
  var r = yt(e);
  ++e.l;
  var t = e.read_shift(2);
  return r.t = "n", r.val = t, r;
}
function Um(e) {
  var r = e.read_shift(1);
  return r === 0 ? (e.l++, "") : e.read_shift(r, "sbcs-cont");
}
function jm(e, r) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += r - 13;
}
function Vm(e, r, t) {
  var a = e.l + r, n = yt(e), s = e.read_shift(2), i = va(e, s, t);
  return e.l = a, n.t = "str", n.val = i, n;
}
var Hm = [2, 3, 48, 49, 131, 139, 140, 245], Mo = /* @__PURE__ */ function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /* shapefile DBF extension */
    /*::[*/
    0: 20127,
    /*::[*/
    8: 865,
    /*::[*/
    9: 437,
    /*::[*/
    10: 850,
    /*::[*/
    11: 437,
    /*::[*/
    13: 437,
    /*::[*/
    14: 850,
    /*::[*/
    15: 437,
    /*::[*/
    16: 850,
    /*::[*/
    17: 437,
    /*::[*/
    18: 850,
    /*::[*/
    19: 932,
    /*::[*/
    20: 850,
    /*::[*/
    21: 437,
    /*::[*/
    22: 850,
    /*::[*/
    23: 865,
    /*::[*/
    24: 437,
    /*::[*/
    25: 437,
    /*::[*/
    26: 850,
    /*::[*/
    27: 437,
    /*::[*/
    28: 863,
    /*::[*/
    29: 850,
    /*::[*/
    31: 852,
    /*::[*/
    34: 852,
    /*::[*/
    35: 852,
    /*::[*/
    36: 860,
    /*::[*/
    37: 850,
    /*::[*/
    38: 866,
    /*::[*/
    55: 850,
    /*::[*/
    64: 852,
    /*::[*/
    77: 936,
    /*::[*/
    78: 949,
    /*::[*/
    79: 950,
    /*::[*/
    80: 874,
    /*::[*/
    87: 1252,
    /*::[*/
    88: 1252,
    /*::[*/
    89: 1252,
    /*::[*/
    108: 863,
    /*::[*/
    134: 737,
    /*::[*/
    135: 852,
    /*::[*/
    136: 857,
    /*::[*/
    204: 1257,
    /*::[*/
    255: 16969
  }, r = p0({
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /*::[*/
    0: 20127
  });
  function t(c, o) {
    var f = [], l = ra(1);
    switch (o.type) {
      case "base64":
        l = st(Gr(c));
        break;
      case "binary":
        l = st(c);
        break;
      case "buffer":
      case "array":
        l = c;
        break;
    }
    or(l, 0);
    var u = l.read_shift(1), p = !!(u & 136), h = !1, d = !1;
    switch (u) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        h = !0, p = !0;
        break;
      case 49:
        h = !0, p = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        d = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + u.toString(16));
    }
    var m = 0, x = 521;
    u == 2 && (m = l.read_shift(2)), l.l += 3, u != 2 && (m = l.read_shift(4)), m > 1048576 && (m = 1e6), u != 2 && (x = l.read_shift(2));
    var g = l.read_shift(2), T = o.codepage || 1252;
    u != 2 && (l.l += 16, l.read_shift(1), l[l.l] !== 0 && (T = e[l[l.l]]), l.l += 1, l.l += 2), d && (l.l += 36);
    for (var E = [], I = {}, D = Math.min(l.length, u == 2 ? 521 : x - 10 - (h ? 264 : 0)), L = d ? 32 : 11; l.l < D && l[l.l] != 13; )
      switch (I = {}, I.name = Wt.utils.decode(T, l.slice(l.l, l.l + L)).replace(/[\u0000\r\n].*$/g, ""), l.l += L, I.type = String.fromCharCode(l.read_shift(1)), u != 2 && !d && (I.offset = l.read_shift(4)), I.len = l.read_shift(1), u == 2 && (I.offset = l.read_shift(2)), I.dec = l.read_shift(1), I.name.length && E.push(I), u != 2 && (l.l += d ? 13 : 14), I.type) {
        case "B":
          (!h || I.len != 8) && o.WTF && console.log("Skipping " + I.name + ":" + I.type);
          break;
        case "G":
        case "P":
          o.WTF && console.log("Skipping " + I.name + ":" + I.type);
          break;
        case "+":
        case "0":
        case "@":
        case "C":
        case "D":
        case "F":
        case "I":
        case "L":
        case "M":
        case "N":
        case "O":
        case "T":
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + I.type);
      }
    if (l[l.l] !== 13 && (l.l = x - 1), l.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + l.l + " " + l[l.l]);
    l.l = x;
    var C = 0, z = 0;
    for (f[0] = [], z = 0; z != E.length; ++z) f[0][z] = E[z].name;
    for (; m-- > 0; ) {
      if (l[l.l] === 42) {
        l.l += g;
        continue;
      }
      for (++l.l, f[++C] = [], z = 0, z = 0; z != E.length; ++z) {
        var U = l.slice(l.l, l.l + E[z].len);
        l.l += E[z].len, or(U, 0);
        var J = Wt.utils.decode(T, U);
        switch (E[z].type) {
          case "C":
            J.trim().length && (f[C][z] = J.replace(/\s+$/, ""));
            break;
          case "D":
            J.length === 8 ? f[C][z] = new Date(+J.slice(0, 4), +J.slice(4, 6) - 1, +J.slice(6, 8)) : f[C][z] = J;
            break;
          case "F":
            f[C][z] = parseFloat(J.trim());
            break;
          case "+":
          case "I":
            f[C][z] = d ? U.read_shift(-4, "i") ^ 2147483648 : U.read_shift(4, "i");
            break;
          case "L":
            switch (J.trim().toUpperCase()) {
              case "Y":
              case "T":
                f[C][z] = !0;
                break;
              case "N":
              case "F":
                f[C][z] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + J + "|");
            }
            break;
          case "M":
            if (!p) throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            f[C][z] = "##MEMO##" + (d ? parseInt(J.trim(), 10) : U.read_shift(4));
            break;
          case "N":
            J = J.replace(/\u0000/g, "").trim(), J && J != "." && (f[C][z] = +J || 0);
            break;
          case "@":
            f[C][z] = new Date(U.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            f[C][z] = new Date((U.read_shift(4) - 2440588) * 864e5 + U.read_shift(4));
            break;
          case "Y":
            f[C][z] = U.read_shift(4, "i") / 1e4 + U.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            f[C][z] = -U.read_shift(-8, "f");
            break;
          case "B":
            if (h && E[z].len == 8) {
              f[C][z] = U.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            U.l += E[z].len;
            break;
          case "0":
            if (E[z].name === "_NullFlags") break;
          default:
            throw new Error("DBF Unsupported data type " + E[z].type);
        }
      }
    }
    if (u != 2 && l.l < l.length && l[l.l++] != 26) throw new Error("DBF EOF Marker missing " + (l.l - 1) + " of " + l.length + " " + l[l.l - 1].toString(16));
    return o && o.sheetRows && (f = f.slice(0, o.sheetRows)), o.DBF = E, f;
  }
  function a(c, o) {
    var f = o || {};
    f.dateNF || (f.dateNF = "yyyymmdd");
    var l = qa(t(c, f), f);
    return l["!cols"] = f.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete f.DBF, l;
  }
  function n(c, o) {
    try {
      return aa(a(c, o), o);
    } catch (f) {
      if (o && o.WTF) throw f;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var s = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function i(c, o) {
    var f = o || {};
    if (+f.codepage >= 0 && ct(+f.codepage), f.type == "string") throw new Error("Cannot write DBF to JS string");
    var l = Mi(), u = Ki(c, { header: 1, raw: !0, cellDates: !0 }), p = u[0], h = u.slice(1), d = c["!cols"] || [], m = 0, x = 0, g = 0, T = 1;
    for (m = 0; m < p.length; ++m) {
      if (((d[m] || {}).DBF || {}).name) {
        p[m] = d[m].DBF.name, ++g;
        continue;
      }
      if (p[m] != null) {
        if (++g, typeof p[m] == "number" && (p[m] = p[m].toString(10)), typeof p[m] != "string") throw new Error("DBF Invalid column name " + p[m] + " |" + typeof p[m] + "|");
        if (p.indexOf(p[m]) !== m) {
          for (x = 0; x < 1024; ++x)
            if (p.indexOf(p[m] + "_" + x) == -1) {
              p[m] += "_" + x;
              break;
            }
        }
      }
    }
    var E = Ge(c["!ref"]), I = [], D = [], L = [];
    for (m = 0; m <= E.e.c - E.s.c; ++m) {
      var C = "", z = "", U = 0, J = [];
      for (x = 0; x < h.length; ++x)
        h[x][m] != null && J.push(h[x][m]);
      if (J.length == 0 || p[m] == null) {
        I[m] = "?";
        continue;
      }
      for (x = 0; x < J.length; ++x) {
        switch (typeof J[x]) {
          case "number":
            z = "B";
            break;
          case "string":
            z = "C";
            break;
          case "boolean":
            z = "L";
            break;
          case "object":
            z = J[x] instanceof Date ? "D" : "C";
            break;
          default:
            z = "C";
        }
        U = Math.max(U, String(J[x]).length), C = C && C != z ? "C" : z;
      }
      U > 250 && (U = 250), z = ((d[m] || {}).DBF || {}).type, z == "C" && d[m].DBF.len > U && (U = d[m].DBF.len), C == "B" && z == "N" && (C = "N", L[m] = d[m].DBF.dec, U = d[m].DBF.len), D[m] = C == "C" || z == "N" ? U : s[C] || 0, T += D[m], I[m] = C;
    }
    var j = l.next(32);
    for (j.write_shift(4, 318902576), j.write_shift(4, h.length), j.write_shift(2, 296 + 32 * g), j.write_shift(2, T), m = 0; m < 4; ++m) j.write_shift(4, 0);
    for (j.write_shift(4, 0 | (+r[
      /*::String(*/
      pl
      /*::)*/
    ] || 3) << 8), m = 0, x = 0; m < p.length; ++m)
      if (p[m] != null) {
        var M = l.next(32), ae = (p[m].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        M.write_shift(1, ae, "sbcs"), M.write_shift(1, I[m] == "?" ? "C" : I[m], "sbcs"), M.write_shift(4, x), M.write_shift(1, D[m] || s[I[m]] || 0), M.write_shift(1, L[m] || 0), M.write_shift(1, 2), M.write_shift(4, 0), M.write_shift(1, 0), M.write_shift(4, 0), M.write_shift(4, 0), x += D[m] || s[I[m]] || 0;
      }
    var G = l.next(264);
    for (G.write_shift(4, 13), m = 0; m < 65; ++m) G.write_shift(4, 0);
    for (m = 0; m < h.length; ++m) {
      var V = l.next(T);
      for (V.write_shift(1, 0), x = 0; x < p.length; ++x)
        if (p[x] != null)
          switch (I[x]) {
            case "L":
              V.write_shift(1, h[m][x] == null ? 63 : h[m][x] ? 84 : 70);
              break;
            case "B":
              V.write_shift(8, h[m][x] || 0, "f");
              break;
            case "N":
              var te = "0";
              for (typeof h[m][x] == "number" && (te = h[m][x].toFixed(L[x] || 0)), g = 0; g < D[x] - te.length; ++g) V.write_shift(1, 32);
              V.write_shift(1, te, "sbcs");
              break;
            case "D":
              h[m][x] ? (V.write_shift(4, ("0000" + h[m][x].getFullYear()).slice(-4), "sbcs"), V.write_shift(2, ("00" + (h[m][x].getMonth() + 1)).slice(-2), "sbcs"), V.write_shift(2, ("00" + h[m][x].getDate()).slice(-2), "sbcs")) : V.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var Z = String(h[m][x] != null ? h[m][x] : "").slice(0, D[x]);
              for (V.write_shift(1, Z, "sbcs"), g = 0; g < D[x] - Z.length; ++g) V.write_shift(1, 32);
              break;
          }
    }
    return l.next(1).write_shift(1, 26), l.end();
  }
  return {
    to_workbook: n,
    to_sheet: a,
    from_sheet: i
  };
}(), Gm = /* @__PURE__ */ function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    /*::[*/
    0: 176,
    /*::[*/
    1: 177,
    /*::[*/
    2: 178,
    /*::[*/
    3: 179,
    /*::[*/
    5: 181,
    /*::[*/
    6: 182,
    /*::[*/
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, r = new RegExp("\x1BN(" + _t(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), t = function(p, h) {
    var d = e[h];
    return typeof d == "number" ? Qc(d) : d;
  }, a = function(p, h, d) {
    var m = h.charCodeAt(0) - 32 << 4 | d.charCodeAt(0) - 48;
    return m == 59 ? p : Qc(m);
  };
  e["|"] = 254;
  function n(p, h) {
    switch (h.type) {
      case "base64":
        return s(Gr(p), h);
      case "binary":
        return s(p, h);
      case "buffer":
        return s(Fe && Buffer.isBuffer(p) ? p.toString("binary") : wa(p), h);
      case "array":
        return s(xa(p), h);
    }
    throw new Error("Unrecognized type " + h.type);
  }
  function s(p, h) {
    var d = p.split(/[\n\r]+/), m = -1, x = -1, g = 0, T = 0, E = [], I = [], D = null, L = {}, C = [], z = [], U = [], J = 0, j;
    for (+h.codepage >= 0 && ct(+h.codepage); g !== d.length; ++g) {
      J = 0;
      var M = d[g].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, a).replace(r, t), ae = M.replace(/;;/g, "\0").split(";").map(function(_) {
        return _.replace(/\u0000/g, ";");
      }), G = ae[0], V;
      if (M.length > 0) switch (G) {
        case "ID":
          break;
        case "E":
          break;
        case "B":
          break;
        case "O":
          break;
        case "W":
          break;
        case "P":
          ae[1].charAt(0) == "P" && I.push(M.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var te = !1, Z = !1, ce = !1, B = !1, H = -1, b = -1;
          for (T = 1; T < ae.length; ++T) switch (ae[T].charAt(0)) {
            case "A":
              break;
            case "X":
              x = parseInt(ae[T].slice(1)) - 1, Z = !0;
              break;
            case "Y":
              for (m = parseInt(ae[T].slice(1)) - 1, Z || (x = 0), j = E.length; j <= m; ++j) E[j] = [];
              break;
            case "K":
              V = ae[T].slice(1), V.charAt(0) === '"' ? V = V.slice(1, V.length - 1) : V === "TRUE" ? V = !0 : V === "FALSE" ? V = !1 : isNaN(ft(V)) ? isNaN(Ga(V).getDate()) || (V = sr(V)) : (V = ft(V), D !== null && Xa(D) && (V = Hs(V))), te = !0;
              break;
            case "E":
              B = !0;
              var y = Ba(ae[T].slice(1), { r: m, c: x });
              E[m][x] = [E[m][x], y];
              break;
            case "S":
              ce = !0, E[m][x] = [E[m][x], "S5S"];
              break;
            case "G":
              break;
            case "R":
              H = parseInt(ae[T].slice(1)) - 1;
              break;
            case "C":
              b = parseInt(ae[T].slice(1)) - 1;
              break;
            default:
              if (h && h.WTF) throw new Error("SYLK bad record " + M);
          }
          if (te && (E[m][x] && E[m][x].length == 2 ? E[m][x][0] = V : E[m][x] = V, D = null), ce) {
            if (B) throw new Error("SYLK shared formula cannot have own formula");
            var k = H > -1 && E[H][b];
            if (!k || !k[1]) throw new Error("SYLK shared formula cannot find base");
            E[m][x][1] = Su(k[1], { r: m - H, c: x - b });
          }
          break;
        case "F":
          var v = 0;
          for (T = 1; T < ae.length; ++T) switch (ae[T].charAt(0)) {
            case "X":
              x = parseInt(ae[T].slice(1)) - 1, ++v;
              break;
            case "Y":
              for (m = parseInt(ae[T].slice(1)) - 1, j = E.length; j <= m; ++j) E[j] = [];
              break;
            case "M":
              J = parseInt(ae[T].slice(1)) / 20;
              break;
            case "F":
              break;
            case "G":
              break;
            case "P":
              D = I[parseInt(ae[T].slice(1))];
              break;
            case "S":
              break;
            case "D":
              break;
            case "N":
              break;
            case "W":
              for (U = ae[T].slice(1).split(" "), j = parseInt(U[0], 10); j <= parseInt(U[1], 10); ++j)
                J = parseInt(U[2], 10), z[j - 1] = J === 0 ? { hidden: !0 } : { wch: J }, za(z[j - 1]);
              break;
            case "C":
              x = parseInt(ae[T].slice(1)) - 1, z[x] || (z[x] = {});
              break;
            case "R":
              m = parseInt(ae[T].slice(1)) - 1, C[m] || (C[m] = {}), J > 0 ? (C[m].hpt = J, C[m].hpx = Mn(J)) : J === 0 && (C[m].hidden = !0);
              break;
            default:
              if (h && h.WTF) throw new Error("SYLK bad record " + M);
          }
          v < 1 && (D = null);
          break;
        default:
          if (h && h.WTF) throw new Error("SYLK bad record " + M);
      }
    }
    return C.length > 0 && (L["!rows"] = C), z.length > 0 && (L["!cols"] = z), h && h.sheetRows && (E = E.slice(0, h.sheetRows)), [E, L];
  }
  function i(p, h) {
    var d = n(p, h), m = d[0], x = d[1], g = qa(m, h);
    return _t(x).forEach(function(T) {
      g[T] = x[T];
    }), g;
  }
  function c(p, h) {
    return aa(i(p, h), h);
  }
  function o(p, h, d, m) {
    var x = "C;Y" + (d + 1) + ";X" + (m + 1) + ";K";
    switch (p.t) {
      case "n":
        x += p.v || 0, p.f && !p.F && (x += ";E" + Rv(p.f, { r: d, c: m }));
        break;
      case "b":
        x += p.v ? "TRUE" : "FALSE";
        break;
      case "e":
        x += p.w || p.v;
        break;
      case "d":
        x += '"' + (p.w || p.v) + '"';
        break;
      case "s":
        x += '"' + p.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return x;
  }
  function f(p, h) {
    h.forEach(function(d, m) {
      var x = "F;W" + (m + 1) + " " + (m + 1) + " ";
      d.hidden ? x += "0" : (typeof d.width == "number" && !d.wpx && (d.wpx = Ps(d.width)), typeof d.wpx == "number" && !d.wch && (d.wch = Ns(d.wpx)), typeof d.wch == "number" && (x += Math.round(d.wch))), x.charAt(x.length - 1) != " " && p.push(x);
    });
  }
  function l(p, h) {
    h.forEach(function(d, m) {
      var x = "F;";
      d.hidden ? x += "M0;" : d.hpt ? x += "M" + 20 * d.hpt + ";" : d.hpx && (x += "M" + 20 * wu(d.hpx) + ";"), x.length > 2 && p.push(x + "R" + (m + 1));
    });
  }
  function u(p, h) {
    var d = ["ID;PWXL;N;E"], m = [], x = Ge(p["!ref"]), g, T = Array.isArray(p), E = `\r
`;
    d.push("P;PGeneral"), d.push("F;P0;DG0G8;M255"), p["!cols"] && f(d, p["!cols"]), p["!rows"] && l(d, p["!rows"]), d.push("B;Y" + (x.e.r - x.s.r + 1) + ";X" + (x.e.c - x.s.c + 1) + ";D" + [x.s.c, x.s.r, x.e.c, x.e.r].join(" "));
    for (var I = x.s.r; I <= x.e.r; ++I)
      for (var D = x.s.c; D <= x.e.c; ++D) {
        var L = ge({ r: I, c: D });
        g = T ? (p[I] || [])[D] : p[L], !(!g || g.v == null && (!g.f || g.F)) && m.push(o(g, p, I, D));
      }
    return d.join(E) + E + m.join(E) + E + "E" + E;
  }
  return {
    to_workbook: c,
    to_sheet: i,
    from_sheet: u
  };
}(), zm = /* @__PURE__ */ function() {
  function e(s, i) {
    switch (i.type) {
      case "base64":
        return r(Gr(s), i);
      case "binary":
        return r(s, i);
      case "buffer":
        return r(Fe && Buffer.isBuffer(s) ? s.toString("binary") : wa(s), i);
      case "array":
        return r(xa(s), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function r(s, i) {
    for (var c = s.split(`
`), o = -1, f = -1, l = 0, u = []; l !== c.length; ++l) {
      if (c[l].trim() === "BOT") {
        u[++o] = [], f = 0;
        continue;
      }
      if (!(o < 0)) {
        var p = c[l].trim().split(","), h = p[0], d = p[1];
        ++l;
        for (var m = c[l] || ""; (m.match(/["]/g) || []).length & 1 && l < c.length - 1; ) m += `
` + c[++l];
        switch (m = m.trim(), +h) {
          case -1:
            if (m === "BOT") {
              u[++o] = [], f = 0;
              continue;
            } else if (m !== "EOD") throw new Error("Unrecognized DIF special command " + m);
            break;
          case 0:
            m === "TRUE" ? u[o][f] = !0 : m === "FALSE" ? u[o][f] = !1 : isNaN(ft(d)) ? isNaN(Ga(d).getDate()) ? u[o][f] = d : u[o][f] = sr(d) : u[o][f] = ft(d), ++f;
            break;
          case 1:
            m = m.slice(1, m.length - 1), m = m.replace(/""/g, '"'), m && m.match(/^=".*"$/) && (m = m.slice(2, -1)), u[o][f++] = m !== "" ? m : null;
            break;
        }
        if (m === "EOD") break;
      }
    }
    return i && i.sheetRows && (u = u.slice(0, i.sheetRows)), u;
  }
  function t(s, i) {
    return qa(e(s, i), i);
  }
  function a(s, i) {
    return aa(t(s, i), i);
  }
  var n = /* @__PURE__ */ function() {
    var s = function(o, f, l, u, p) {
      o.push(f), o.push(l + "," + u), o.push('"' + p.replace(/"/g, '""') + '"');
    }, i = function(o, f, l, u) {
      o.push(f + "," + l), o.push(f == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(o) {
      var f = [], l = Ge(o["!ref"]), u, p = Array.isArray(o);
      s(f, "TABLE", 0, 1, "sheetjs"), s(f, "VECTORS", 0, l.e.r - l.s.r + 1, ""), s(f, "TUPLES", 0, l.e.c - l.s.c + 1, ""), s(f, "DATA", 0, 0, "");
      for (var h = l.s.r; h <= l.e.r; ++h) {
        i(f, -1, 0, "BOT");
        for (var d = l.s.c; d <= l.e.c; ++d) {
          var m = ge({ r: h, c: d });
          if (u = p ? (o[h] || [])[d] : o[m], !u) {
            i(f, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var x = u.w;
              !x && u.v != null && (x = u.v), x == null ? u.f && !u.F ? i(f, 1, 0, "=" + u.f) : i(f, 1, 0, "") : i(f, 0, x, "V");
              break;
            case "b":
              i(f, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              i(f, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = Qr(u.z || Ee[14], Or(sr(u.v)))), i(f, 0, u.w, "V");
              break;
            default:
              i(f, 1, 0, "");
          }
        }
      }
      i(f, -1, 0, "EOD");
      var g = `\r
`, T = f.join(g);
      return T;
    };
  }();
  return {
    to_workbook: a,
    to_sheet: t,
    from_sheet: n
  };
}(), Wm = /* @__PURE__ */ function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function r(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function t(u, p) {
    for (var h = u.split(`
`), d = -1, m = -1, x = 0, g = []; x !== h.length; ++x) {
      var T = h[x].trim().split(":");
      if (T[0] === "cell") {
        var E = Cr(T[1]);
        if (g.length <= E.r) for (d = g.length; d <= E.r; ++d) g[d] || (g[d] = []);
        switch (d = E.r, m = E.c, T[2]) {
          case "t":
            g[d][m] = e(T[3]);
            break;
          case "v":
            g[d][m] = +T[3];
            break;
          case "vtf":
            var I = T[T.length - 1];
          case "vtc":
            switch (T[3]) {
              case "nl":
                g[d][m] = !!+T[4];
                break;
              default:
                g[d][m] = +T[4];
                break;
            }
            T[2] == "vtf" && (g[d][m] = [g[d][m], I]);
        }
      }
    }
    return p && p.sheetRows && (g = g.slice(0, p.sheetRows)), g;
  }
  function a(u, p) {
    return qa(t(u, p), p);
  }
  function n(u, p) {
    return aa(a(u, p), p);
  }
  var s = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), i = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, c = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), o = "--SocialCalcSpreadsheetControlSave--";
  function f(u) {
    if (!u || !u["!ref"]) return "";
    for (var p = [], h = [], d, m = "", x = Ka(u["!ref"]), g = Array.isArray(u), T = x.s.r; T <= x.e.r; ++T)
      for (var E = x.s.c; E <= x.e.c; ++E)
        if (m = ge({ r: T, c: E }), d = g ? (u[T] || [])[E] : u[m], !(!d || d.v == null || d.t === "z")) {
          switch (h = ["cell", m, "t"], d.t) {
            case "s":
            case "str":
              h.push(r(d.v));
              break;
            case "n":
              d.f ? (h[2] = "vtf", h[3] = "n", h[4] = d.v, h[5] = r(d.f)) : (h[2] = "v", h[3] = d.v);
              break;
            case "b":
              h[2] = "vt" + (d.f ? "f" : "c"), h[3] = "nl", h[4] = d.v ? "1" : "0", h[5] = r(d.f || (d.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var I = Or(sr(d.v));
              h[2] = "vtc", h[3] = "nd", h[4] = "" + I, h[5] = d.w || Qr(d.z || Ee[14], I);
              break;
            case "e":
              continue;
          }
          p.push(h.join(":"));
        }
    return p.push("sheet:c:" + (x.e.c - x.s.c + 1) + ":r:" + (x.e.r - x.s.r + 1) + ":tvf:1"), p.push("valueformat:1:text-wiki"), p.join(`
`);
  }
  function l(u) {
    return [s, i, c, i, f(u), o].join(`
`);
  }
  return {
    to_workbook: n,
    to_sheet: a,
    from_sheet: l
  };
}(), Dn = /* @__PURE__ */ function() {
  function e(l, u, p, h, d) {
    d.raw ? u[p][h] = l : l === "" || (l === "TRUE" ? u[p][h] = !0 : l === "FALSE" ? u[p][h] = !1 : isNaN(ft(l)) ? isNaN(Ga(l).getDate()) ? u[p][h] = l : u[p][h] = sr(l) : u[p][h] = ft(l));
  }
  function r(l, u) {
    var p = u || {}, h = [];
    if (!l || l.length === 0) return h;
    for (var d = l.split(/[\r\n]/), m = d.length - 1; m >= 0 && d[m].length === 0; ) --m;
    for (var x = 10, g = 0, T = 0; T <= m; ++T)
      g = d[T].indexOf(" "), g == -1 ? g = d[T].length : g++, x = Math.max(x, g);
    for (T = 0; T <= m; ++T) {
      h[T] = [];
      var E = 0;
      for (e(d[T].slice(0, x).trim(), h, T, E, p), E = 1; E <= (d[T].length - x) / 10 + 1; ++E)
        e(d[T].slice(x + (E - 1) * 10, x + E * 10).trim(), h, T, E, p);
    }
    return p.sheetRows && (h = h.slice(0, p.sheetRows)), h;
  }
  var t = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, a = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function n(l) {
    for (var u = {}, p = !1, h = 0, d = 0; h < l.length; ++h)
      (d = l.charCodeAt(h)) == 34 ? p = !p : !p && d in t && (u[d] = (u[d] || 0) + 1);
    d = [];
    for (h in u) Object.prototype.hasOwnProperty.call(u, h) && d.push([u[h], h]);
    if (!d.length) {
      u = a;
      for (h in u) Object.prototype.hasOwnProperty.call(u, h) && d.push([u[h], h]);
    }
    return d.sort(function(m, x) {
      return m[0] - x[0] || a[m[1]] - a[x[1]];
    }), t[d.pop()[1]] || 44;
  }
  function s(l, u) {
    var p = u || {}, h = "", d = p.dense ? [] : {}, m = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    l.slice(0, 4) == "sep=" ? l.charCodeAt(5) == 13 && l.charCodeAt(6) == 10 ? (h = l.charAt(4), l = l.slice(7)) : l.charCodeAt(5) == 13 || l.charCodeAt(5) == 10 ? (h = l.charAt(4), l = l.slice(6)) : h = n(l.slice(0, 1024)) : p && p.FS ? h = p.FS : h = n(l.slice(0, 1024));
    var x = 0, g = 0, T = 0, E = 0, I = 0, D = h.charCodeAt(0), L = !1, C = 0, z = l.charCodeAt(0);
    l = l.replace(/\r\n/mg, `
`);
    var U = p.dateNF != null ? a1(p.dateNF) : null;
    function J() {
      var j = l.slice(E, I), M = {};
      if (j.charAt(0) == '"' && j.charAt(j.length - 1) == '"' && (j = j.slice(1, -1).replace(/""/g, '"')), j.length === 0) M.t = "z";
      else if (p.raw)
        M.t = "s", M.v = j;
      else if (j.trim().length === 0)
        M.t = "s", M.v = j;
      else if (j.charCodeAt(0) == 61)
        j.charCodeAt(1) == 34 && j.charCodeAt(j.length - 1) == 34 ? (M.t = "s", M.v = j.slice(2, -1).replace(/""/g, '"')) : Iv(j) ? (M.t = "n", M.f = j.slice(1)) : (M.t = "s", M.v = j);
      else if (j == "TRUE")
        M.t = "b", M.v = !0;
      else if (j == "FALSE")
        M.t = "b", M.v = !1;
      else if (!isNaN(T = ft(j)))
        M.t = "n", p.cellText !== !1 && (M.w = j), M.v = T;
      else if (!isNaN(Ga(j).getDate()) || U && j.match(U)) {
        M.z = p.dateNF || Ee[14];
        var ae = 0;
        U && j.match(U) && (j = n1(j, p.dateNF, j.match(U) || []), ae = 1), p.cellDates ? (M.t = "d", M.v = sr(j, ae)) : (M.t = "n", M.v = Or(sr(j, ae))), p.cellText !== !1 && (M.w = Qr(M.z, M.v instanceof Date ? Or(M.v) : M.v)), p.cellNF || delete M.z;
      } else
        M.t = "s", M.v = j;
      if (M.t == "z" || (p.dense ? (d[x] || (d[x] = []), d[x][g] = M) : d[ge({ c: g, r: x })] = M), E = I + 1, z = l.charCodeAt(E), m.e.c < g && (m.e.c = g), m.e.r < x && (m.e.r = x), C == D) ++g;
      else if (g = 0, ++x, p.sheetRows && p.sheetRows <= x) return !0;
    }
    e: for (; I < l.length; ++I) switch (C = l.charCodeAt(I)) {
      case 34:
        z === 34 && (L = !L);
        break;
      case D:
      case 10:
      case 13:
        if (!L && J()) break e;
        break;
    }
    return I - E > 0 && J(), d["!ref"] = Re(m), d;
  }
  function i(l, u) {
    return !(u && u.PRN) || u.FS || l.slice(0, 4) == "sep=" || l.indexOf("	") >= 0 || l.indexOf(",") >= 0 || l.indexOf(";") >= 0 ? s(l, u) : qa(r(l, u), u);
  }
  function c(l, u) {
    var p = "", h = u.type == "string" ? [0, 0, 0, 0] : P0(l, u);
    switch (u.type) {
      case "base64":
        p = Gr(l);
        break;
      case "binary":
        p = l;
        break;
      case "buffer":
        u.codepage == 65001 ? p = l.toString("utf8") : u.codepage && typeof Wt < "u" ? p = Wt.utils.decode(u.codepage, l) : p = Fe && Buffer.isBuffer(l) ? l.toString("binary") : wa(l);
        break;
      case "array":
        p = xa(l);
        break;
      case "string":
        p = l;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return h[0] == 239 && h[1] == 187 && h[2] == 191 ? p = Ne(p.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? p = Ne(p) : u.type == "binary" && typeof Wt < "u" && u.codepage && (p = Wt.utils.decode(u.codepage, Wt.utils.encode(28591, p))), p.slice(0, 19) == "socialcalc:version:" ? Wm.to_sheet(u.type == "string" ? p : Ne(p), u) : i(p, u);
  }
  function o(l, u) {
    return aa(c(l, u), u);
  }
  function f(l) {
    for (var u = [], p = Ge(l["!ref"]), h, d = Array.isArray(l), m = p.s.r; m <= p.e.r; ++m) {
      for (var x = [], g = p.s.c; g <= p.e.c; ++g) {
        var T = ge({ r: m, c: g });
        if (h = d ? (l[m] || [])[g] : l[T], !h || h.v == null) {
          x.push("          ");
          continue;
        }
        for (var E = (h.w || (bt(h), h.w) || "").slice(0, 10); E.length < 10; ) E += " ";
        x.push(E + (g === 0 ? " " : ""));
      }
      u.push(x.join(""));
    }
    return u.join(`
`);
  }
  return {
    to_workbook: o,
    to_sheet: c,
    from_sheet: f
  };
}();
function Xm(e, r) {
  var t = r || {}, a = !!t.WTF;
  t.WTF = !0;
  try {
    var n = Gm.to_workbook(e, t);
    return t.WTF = a, n;
  } catch (s) {
    if (t.WTF = a, !s.message.match(/SYLK bad record ID/) && a) throw s;
    return Dn.to_workbook(e, r);
  }
}
var kn = /* @__PURE__ */ function() {
  function e(y, k, v) {
    if (y) {
      or(y, y.l || 0);
      for (var _ = v.Enum || H; y.l < y.length; ) {
        var N = y.read_shift(2), Y = _[N] || _[65535], Q = y.read_shift(2), ne = y.l + Q, ee = Y.f && Y.f(y, Q, v);
        if (y.l = ne, k(ee, Y, N)) return;
      }
    }
  }
  function r(y, k) {
    switch (k.type) {
      case "base64":
        return t(st(Gr(y)), k);
      case "binary":
        return t(st(y), k);
      case "buffer":
      case "array":
        return t(y, k);
    }
    throw "Unsupported type " + k.type;
  }
  function t(y, k) {
    if (!y) return y;
    var v = k || {}, _ = v.dense ? [] : {}, N = "Sheet1", Y = "", Q = 0, ne = {}, ee = [], pe = [], P = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, be = v.sheetRows || 0;
    if (y[2] == 0 && (y[3] == 8 || y[3] == 9) && y.length >= 16 && y[14] == 5 && y[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (y[2] == 2)
      v.Enum = H, e(y, function(oe, De, hr) {
        switch (hr) {
          case 0:
            v.vers = oe, oe >= 4096 && (v.qpro = !0);
            break;
          case 6:
            P = oe;
            break;
          case 204:
            oe && (Y = oe);
            break;
          case 222:
            Y = oe;
            break;
          case 15:
          case 51:
            v.qpro || (oe[1].v = oe[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            hr == 14 && (oe[2] & 112) == 112 && (oe[2] & 15) > 1 && (oe[2] & 15) < 15 && (oe[1].z = v.dateNF || Ee[14], v.cellDates && (oe[1].t = "d", oe[1].v = Hs(oe[1].v))), v.qpro && oe[3] > Q && (_["!ref"] = Re(P), ne[N] = _, ee.push(N), _ = v.dense ? [] : {}, P = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Q = oe[3], N = Y || "Sheet" + (Q + 1), Y = "");
            var Pr = v.dense ? (_[oe[0].r] || [])[oe[0].c] : _[ge(oe[0])];
            if (Pr) {
              Pr.t = oe[1].t, Pr.v = oe[1].v, oe[1].z != null && (Pr.z = oe[1].z), oe[1].f != null && (Pr.f = oe[1].f);
              break;
            }
            v.dense ? (_[oe[0].r] || (_[oe[0].r] = []), _[oe[0].r][oe[0].c] = oe[1]) : _[ge(oe[0])] = oe[1];
            break;
        }
      }, v);
    else if (y[2] == 26 || y[2] == 14)
      v.Enum = b, y[2] == 14 && (v.qpro = !0, y.l = 0), e(y, function(oe, De, hr) {
        switch (hr) {
          case 204:
            N = oe;
            break;
          case 22:
            oe[1].v = oe[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (oe[3] > Q && (_["!ref"] = Re(P), ne[N] = _, ee.push(N), _ = v.dense ? [] : {}, P = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Q = oe[3], N = "Sheet" + (Q + 1)), be > 0 && oe[0].r >= be) break;
            v.dense ? (_[oe[0].r] || (_[oe[0].r] = []), _[oe[0].r][oe[0].c] = oe[1]) : _[ge(oe[0])] = oe[1], P.e.c < oe[0].c && (P.e.c = oe[0].c), P.e.r < oe[0].r && (P.e.r = oe[0].r);
            break;
          case 27:
            oe[14e3] && (pe[oe[14e3][0]] = oe[14e3][1]);
            break;
          case 1537:
            pe[oe[0]] = oe[1], oe[0] == Q && (N = oe[1]);
            break;
        }
      }, v);
    else throw new Error("Unrecognized LOTUS BOF " + y[2]);
    if (_["!ref"] = Re(P), ne[Y || N] = _, ee.push(Y || N), !pe.length) return { SheetNames: ee, Sheets: ne };
    for (var $e = {}, Ie = [], we = 0; we < pe.length; ++we) ne[ee[we]] ? (Ie.push(pe[we] || ee[we]), $e[pe[we]] = ne[pe[we]] || ne[ee[we]]) : (Ie.push(pe[we]), $e[pe[we]] = { "!ref": "A1" });
    return { SheetNames: Ie, Sheets: $e };
  }
  function a(y, k) {
    var v = k || {};
    if (+v.codepage >= 0 && ct(+v.codepage), v.type == "string") throw new Error("Cannot write WK1 to JS string");
    var _ = Mi(), N = Ge(y["!ref"]), Y = Array.isArray(y), Q = [];
    tt(_, 0, s(1030)), tt(_, 6, o(N));
    for (var ne = Math.min(N.e.r, 8191), ee = N.s.r; ee <= ne; ++ee)
      for (var pe = ur(ee), P = N.s.c; P <= N.e.c; ++P) {
        ee === N.s.r && (Q[P] = rr(P));
        var be = Q[P] + pe, $e = Y ? (y[ee] || [])[P] : y[be];
        if (!(!$e || $e.t == "z"))
          if ($e.t == "n")
            ($e.v | 0) == $e.v && $e.v >= -32768 && $e.v <= 32767 ? tt(_, 13, h(ee, P, $e.v)) : tt(_, 14, m(ee, P, $e.v));
          else {
            var Ie = bt($e);
            tt(_, 15, u(ee, P, Ie.slice(0, 239)));
          }
      }
    return tt(_, 1), _.end();
  }
  function n(y, k) {
    var v = k || {};
    if (+v.codepage >= 0 && ct(+v.codepage), v.type == "string") throw new Error("Cannot write WK3 to JS string");
    var _ = Mi();
    tt(_, 0, i(y));
    for (var N = 0, Y = 0; N < y.SheetNames.length; ++N) (y.Sheets[y.SheetNames[N]] || {})["!ref"] && tt(_, 27, B(y.SheetNames[N], Y++));
    var Q = 0;
    for (N = 0; N < y.SheetNames.length; ++N) {
      var ne = y.Sheets[y.SheetNames[N]];
      if (!(!ne || !ne["!ref"])) {
        for (var ee = Ge(ne["!ref"]), pe = Array.isArray(ne), P = [], be = Math.min(ee.e.r, 8191), $e = ee.s.r; $e <= be; ++$e)
          for (var Ie = ur($e), we = ee.s.c; we <= ee.e.c; ++we) {
            $e === ee.s.r && (P[we] = rr(we));
            var oe = P[we] + Ie, De = pe ? (ne[$e] || [])[we] : ne[oe];
            if (!(!De || De.t == "z"))
              if (De.t == "n")
                tt(_, 23, J($e, we, Q, De.v));
              else {
                var hr = bt(De);
                tt(_, 22, C($e, we, Q, hr.slice(0, 239)));
              }
          }
        ++Q;
      }
    }
    return tt(_, 1), _.end();
  }
  function s(y) {
    var k = Ze(2);
    return k.write_shift(2, y), k;
  }
  function i(y) {
    var k = Ze(26);
    k.write_shift(2, 4096), k.write_shift(2, 4), k.write_shift(4, 0);
    for (var v = 0, _ = 0, N = 0, Y = 0; Y < y.SheetNames.length; ++Y) {
      var Q = y.SheetNames[Y], ne = y.Sheets[Q];
      if (!(!ne || !ne["!ref"])) {
        ++N;
        var ee = Ka(ne["!ref"]);
        v < ee.e.r && (v = ee.e.r), _ < ee.e.c && (_ = ee.e.c);
      }
    }
    return v > 8191 && (v = 8191), k.write_shift(2, v), k.write_shift(1, N), k.write_shift(1, _), k.write_shift(2, 0), k.write_shift(2, 0), k.write_shift(1, 1), k.write_shift(1, 2), k.write_shift(4, 0), k.write_shift(4, 0), k;
  }
  function c(y, k, v) {
    var _ = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return k == 8 && v.qpro ? (_.s.c = y.read_shift(1), y.l++, _.s.r = y.read_shift(2), _.e.c = y.read_shift(1), y.l++, _.e.r = y.read_shift(2), _) : (_.s.c = y.read_shift(2), _.s.r = y.read_shift(2), k == 12 && v.qpro && (y.l += 2), _.e.c = y.read_shift(2), _.e.r = y.read_shift(2), k == 12 && v.qpro && (y.l += 2), _.s.c == 65535 && (_.s.c = _.e.c = _.s.r = _.e.r = 0), _);
  }
  function o(y) {
    var k = Ze(8);
    return k.write_shift(2, y.s.c), k.write_shift(2, y.s.r), k.write_shift(2, y.e.c), k.write_shift(2, y.e.r), k;
  }
  function f(y, k, v) {
    var _ = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return v.qpro && v.vers != 20768 ? (_[0].c = y.read_shift(1), _[3] = y.read_shift(1), _[0].r = y.read_shift(2), y.l += 2) : (_[2] = y.read_shift(1), _[0].c = y.read_shift(2), _[0].r = y.read_shift(2)), _;
  }
  function l(y, k, v) {
    var _ = y.l + k, N = f(y, k, v);
    if (N[1].t = "s", v.vers == 20768) {
      y.l++;
      var Y = y.read_shift(1);
      return N[1].v = y.read_shift(Y, "utf8"), N;
    }
    return v.qpro && y.l++, N[1].v = y.read_shift(_ - y.l, "cstr"), N;
  }
  function u(y, k, v) {
    var _ = Ze(7 + v.length);
    _.write_shift(1, 255), _.write_shift(2, k), _.write_shift(2, y), _.write_shift(1, 39);
    for (var N = 0; N < _.length; ++N) {
      var Y = v.charCodeAt(N);
      _.write_shift(1, Y >= 128 ? 95 : Y);
    }
    return _.write_shift(1, 0), _;
  }
  function p(y, k, v) {
    var _ = f(y, k, v);
    return _[1].v = y.read_shift(2, "i"), _;
  }
  function h(y, k, v) {
    var _ = Ze(7);
    return _.write_shift(1, 255), _.write_shift(2, k), _.write_shift(2, y), _.write_shift(2, v, "i"), _;
  }
  function d(y, k, v) {
    var _ = f(y, k, v);
    return _[1].v = y.read_shift(8, "f"), _;
  }
  function m(y, k, v) {
    var _ = Ze(13);
    return _.write_shift(1, 255), _.write_shift(2, k), _.write_shift(2, y), _.write_shift(8, v, "f"), _;
  }
  function x(y, k, v) {
    var _ = y.l + k, N = f(y, k, v);
    if (N[1].v = y.read_shift(8, "f"), v.qpro) y.l = _;
    else {
      var Y = y.read_shift(2);
      I(y.slice(y.l, y.l + Y), N), y.l += Y;
    }
    return N;
  }
  function g(y, k, v) {
    var _ = k & 32768;
    return k &= -32769, k = (_ ? y : 0) + (k >= 8192 ? k - 16384 : k), (_ ? "" : "$") + (v ? rr(k) : ur(k));
  }
  var T = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, E = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function I(y, k) {
    or(y, 0);
    for (var v = [], _ = 0, N = "", Y = "", Q = "", ne = ""; y.l < y.length; ) {
      var ee = y[y.l++];
      switch (ee) {
        case 0:
          v.push(y.read_shift(8, "f"));
          break;
        case 1:
          Y = g(k[0].c, y.read_shift(2), !0), N = g(k[0].r, y.read_shift(2), !1), v.push(Y + N);
          break;
        case 2:
          {
            var pe = g(k[0].c, y.read_shift(2), !0), P = g(k[0].r, y.read_shift(2), !1);
            Y = g(k[0].c, y.read_shift(2), !0), N = g(k[0].r, y.read_shift(2), !1), v.push(pe + P + ":" + Y + N);
          }
          break;
        case 3:
          if (y.l < y.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          v.push("(" + v.pop() + ")");
          break;
        case 5:
          v.push(y.read_shift(2));
          break;
        case 6:
          {
            for (var be = ""; ee = y[y.l++]; ) be += String.fromCharCode(ee);
            v.push('"' + be.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          v.push("-" + v.pop());
          break;
        case 23:
          v.push("+" + v.pop());
          break;
        case 22:
          v.push("NOT(" + v.pop() + ")");
          break;
        case 20:
        case 21:
          ne = v.pop(), Q = v.pop(), v.push(["AND", "OR"][ee - 20] + "(" + Q + "," + ne + ")");
          break;
        default:
          if (ee < 32 && E[ee])
            ne = v.pop(), Q = v.pop(), v.push(Q + E[ee] + ne);
          else if (T[ee]) {
            if (_ = T[ee][1], _ == 69 && (_ = y[y.l++]), _ > v.length) {
              console.error("WK1 bad formula parse 0x" + ee.toString(16) + ":|" + v.join("|") + "|");
              return;
            }
            var $e = v.slice(-_);
            v.length -= _, v.push(T[ee][0] + "(" + $e.join(",") + ")");
          } else return ee <= 7 ? console.error("WK1 invalid opcode " + ee.toString(16)) : ee <= 24 ? console.error("WK1 unsupported op " + ee.toString(16)) : ee <= 30 ? console.error("WK1 invalid opcode " + ee.toString(16)) : ee <= 115 ? console.error("WK1 unsupported function opcode " + ee.toString(16)) : console.error("WK1 unrecognized opcode " + ee.toString(16));
      }
    }
    v.length == 1 ? k[1].f = "" + v[0] : console.error("WK1 bad formula parse |" + v.join("|") + "|");
  }
  function D(y) {
    var k = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return k[0].r = y.read_shift(2), k[3] = y[y.l++], k[0].c = y[y.l++], k;
  }
  function L(y, k) {
    var v = D(y);
    return v[1].t = "s", v[1].v = y.read_shift(k - 4, "cstr"), v;
  }
  function C(y, k, v, _) {
    var N = Ze(6 + _.length);
    N.write_shift(2, y), N.write_shift(1, v), N.write_shift(1, k), N.write_shift(1, 39);
    for (var Y = 0; Y < _.length; ++Y) {
      var Q = _.charCodeAt(Y);
      N.write_shift(1, Q >= 128 ? 95 : Q);
    }
    return N.write_shift(1, 0), N;
  }
  function z(y, k) {
    var v = D(y);
    v[1].v = y.read_shift(2);
    var _ = v[1].v >> 1;
    if (v[1].v & 1)
      switch (_ & 7) {
        case 0:
          _ = (_ >> 3) * 5e3;
          break;
        case 1:
          _ = (_ >> 3) * 500;
          break;
        case 2:
          _ = (_ >> 3) / 20;
          break;
        case 3:
          _ = (_ >> 3) / 200;
          break;
        case 4:
          _ = (_ >> 3) / 2e3;
          break;
        case 5:
          _ = (_ >> 3) / 2e4;
          break;
        case 6:
          _ = (_ >> 3) / 16;
          break;
        case 7:
          _ = (_ >> 3) / 64;
          break;
      }
    return v[1].v = _, v;
  }
  function U(y, k) {
    var v = D(y), _ = y.read_shift(4), N = y.read_shift(4), Y = y.read_shift(2);
    if (Y == 65535)
      return _ === 0 && N === 3221225472 ? (v[1].t = "e", v[1].v = 15) : _ === 0 && N === 3489660928 ? (v[1].t = "e", v[1].v = 42) : v[1].v = 0, v;
    var Q = Y & 32768;
    return Y = (Y & 32767) - 16446, v[1].v = (1 - Q * 2) * (N * Math.pow(2, Y + 32) + _ * Math.pow(2, Y)), v;
  }
  function J(y, k, v, _) {
    var N = Ze(14);
    if (N.write_shift(2, y), N.write_shift(1, v), N.write_shift(1, k), _ == 0)
      return N.write_shift(4, 0), N.write_shift(4, 0), N.write_shift(2, 65535), N;
    var Y = 0, Q = 0, ne = 0, ee = 0;
    return _ < 0 && (Y = 1, _ = -_), Q = Math.log2(_) | 0, _ /= Math.pow(2, Q - 31), ee = _ >>> 0, ee & 2147483648 || (_ /= 2, ++Q, ee = _ >>> 0), _ -= ee, ee |= 2147483648, ee >>>= 0, _ *= Math.pow(2, 32), ne = _ >>> 0, N.write_shift(4, ne), N.write_shift(4, ee), Q += 16383 + (Y ? 32768 : 0), N.write_shift(2, Q), N;
  }
  function j(y, k) {
    var v = U(y);
    return y.l += k - 14, v;
  }
  function M(y, k) {
    var v = D(y), _ = y.read_shift(4);
    return v[1].v = _ >> 6, v;
  }
  function ae(y, k) {
    var v = D(y), _ = y.read_shift(8, "f");
    return v[1].v = _, v;
  }
  function G(y, k) {
    var v = ae(y);
    return y.l += k - 10, v;
  }
  function V(y, k) {
    return y[y.l + k - 1] == 0 ? y.read_shift(k, "cstr") : "";
  }
  function te(y, k) {
    var v = y[y.l++];
    v > k - 1 && (v = k - 1);
    for (var _ = ""; _.length < v; ) _ += String.fromCharCode(y[y.l++]);
    return _;
  }
  function Z(y, k, v) {
    if (!(!v.qpro || k < 21)) {
      var _ = y.read_shift(1);
      y.l += 17, y.l += 1, y.l += 2;
      var N = y.read_shift(k - 21, "cstr");
      return [_, N];
    }
  }
  function ce(y, k) {
    for (var v = {}, _ = y.l + k; y.l < _; ) {
      var N = y.read_shift(2);
      if (N == 14e3) {
        for (v[N] = [0, ""], v[N][0] = y.read_shift(2); y[y.l]; )
          v[N][1] += String.fromCharCode(y[y.l]), y.l++;
        y.l++;
      }
    }
    return v;
  }
  function B(y, k) {
    var v = Ze(5 + y.length);
    v.write_shift(2, 14e3), v.write_shift(2, k);
    for (var _ = 0; _ < y.length; ++_) {
      var N = y.charCodeAt(_);
      v[v.l++] = N > 127 ? 95 : N;
    }
    return v[v.l++] = 0, v;
  }
  var H = {
    /*::[*/
    0: { n: "BOF", f: Ye },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "CALCMODE" },
    /*::[*/
    3: { n: "CALCORDER" },
    /*::[*/
    4: { n: "SPLIT" },
    /*::[*/
    5: { n: "SYNC" },
    /*::[*/
    6: { n: "RANGE", f: c },
    /*::[*/
    7: { n: "WINDOW1" },
    /*::[*/
    8: { n: "COLW1" },
    /*::[*/
    9: { n: "WINTWO" },
    /*::[*/
    10: { n: "COLW2" },
    /*::[*/
    11: { n: "NAME" },
    /*::[*/
    12: { n: "BLANK" },
    /*::[*/
    13: { n: "INTEGER", f: p },
    /*::[*/
    14: { n: "NUMBER", f: d },
    /*::[*/
    15: { n: "LABEL", f: l },
    /*::[*/
    16: { n: "FORMULA", f: x },
    /*::[*/
    24: { n: "TABLE" },
    /*::[*/
    25: { n: "ORANGE" },
    /*::[*/
    26: { n: "PRANGE" },
    /*::[*/
    27: { n: "SRANGE" },
    /*::[*/
    28: { n: "FRANGE" },
    /*::[*/
    29: { n: "KRANGE1" },
    /*::[*/
    32: { n: "HRANGE" },
    /*::[*/
    35: { n: "KRANGE2" },
    /*::[*/
    36: { n: "PROTEC" },
    /*::[*/
    37: { n: "FOOTER" },
    /*::[*/
    38: { n: "HEADER" },
    /*::[*/
    39: { n: "SETUP" },
    /*::[*/
    40: { n: "MARGINS" },
    /*::[*/
    41: { n: "LABELFMT" },
    /*::[*/
    42: { n: "TITLES" },
    /*::[*/
    43: { n: "SHEETJS" },
    /*::[*/
    45: { n: "GRAPH" },
    /*::[*/
    46: { n: "NGRAPH" },
    /*::[*/
    47: { n: "CALCCOUNT" },
    /*::[*/
    48: { n: "UNFORMATTED" },
    /*::[*/
    49: { n: "CURSORW12" },
    /*::[*/
    50: { n: "WINDOW" },
    /*::[*/
    51: { n: "STRING", f: l },
    /*::[*/
    55: { n: "PASSWORD" },
    /*::[*/
    56: { n: "LOCKED" },
    /*::[*/
    60: { n: "QUERY" },
    /*::[*/
    61: { n: "QUERYNAME" },
    /*::[*/
    62: { n: "PRINT" },
    /*::[*/
    63: { n: "PRINTNAME" },
    /*::[*/
    64: { n: "GRAPH2" },
    /*::[*/
    65: { n: "GRAPHNAME" },
    /*::[*/
    66: { n: "ZOOM" },
    /*::[*/
    67: { n: "SYMSPLIT" },
    /*::[*/
    68: { n: "NSROWS" },
    /*::[*/
    69: { n: "NSCOLS" },
    /*::[*/
    70: { n: "RULER" },
    /*::[*/
    71: { n: "NNAME" },
    /*::[*/
    72: { n: "ACOMM" },
    /*::[*/
    73: { n: "AMACRO" },
    /*::[*/
    74: { n: "PARSE" },
    /*::[*/
    102: { n: "PRANGES??" },
    /*::[*/
    103: { n: "RRANGES??" },
    /*::[*/
    104: { n: "FNAME??" },
    /*::[*/
    105: { n: "MRANGES??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: V },
    /*::[*/
    222: { n: "SHEETNAMELP", f: te },
    /*::[*/
    65535: { n: "" }
  }, b = {
    /*::[*/
    0: { n: "BOF" },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "PASSWORD" },
    /*::[*/
    3: { n: "CALCSET" },
    /*::[*/
    4: { n: "WINDOWSET" },
    /*::[*/
    5: { n: "SHEETCELLPTR" },
    /*::[*/
    6: { n: "SHEETLAYOUT" },
    /*::[*/
    7: { n: "COLUMNWIDTH" },
    /*::[*/
    8: { n: "HIDDENCOLUMN" },
    /*::[*/
    9: { n: "USERRANGE" },
    /*::[*/
    10: { n: "SYSTEMRANGE" },
    /*::[*/
    11: { n: "ZEROFORCE" },
    /*::[*/
    12: { n: "SORTKEYDIR" },
    /*::[*/
    13: { n: "FILESEAL" },
    /*::[*/
    14: { n: "DATAFILLNUMS" },
    /*::[*/
    15: { n: "PRINTMAIN" },
    /*::[*/
    16: { n: "PRINTSTRING" },
    /*::[*/
    17: { n: "GRAPHMAIN" },
    /*::[*/
    18: { n: "GRAPHSTRING" },
    /*::[*/
    19: { n: "??" },
    /*::[*/
    20: { n: "ERRCELL" },
    /*::[*/
    21: { n: "NACELL" },
    /*::[*/
    22: { n: "LABEL16", f: L },
    /*::[*/
    23: { n: "NUMBER17", f: U },
    /*::[*/
    24: { n: "NUMBER18", f: z },
    /*::[*/
    25: { n: "FORMULA19", f: j },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: ce },
    /*::[*/
    28: { n: "DTLABELMISC" },
    /*::[*/
    29: { n: "DTLABELCELL" },
    /*::[*/
    30: { n: "GRAPHWINDOW" },
    /*::[*/
    31: { n: "CPA" },
    /*::[*/
    32: { n: "LPLAUTO" },
    /*::[*/
    33: { n: "QUERY" },
    /*::[*/
    34: { n: "HIDDENSHEET" },
    /*::[*/
    35: { n: "??" },
    /*::[*/
    37: { n: "NUMBER25", f: M },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: ae },
    /*::[*/
    40: { n: "FORMULA28", f: G },
    /*::[*/
    142: { n: "??" },
    /*::[*/
    147: { n: "??" },
    /*::[*/
    150: { n: "??" },
    /*::[*/
    151: { n: "??" },
    /*::[*/
    152: { n: "??" },
    /*::[*/
    153: { n: "??" },
    /*::[*/
    154: { n: "??" },
    /*::[*/
    155: { n: "??" },
    /*::[*/
    156: { n: "??" },
    /*::[*/
    163: { n: "??" },
    /*::[*/
    174: { n: "??" },
    /*::[*/
    175: { n: "??" },
    /*::[*/
    176: { n: "??" },
    /*::[*/
    177: { n: "??" },
    /*::[*/
    184: { n: "??" },
    /*::[*/
    185: { n: "??" },
    /*::[*/
    186: { n: "??" },
    /*::[*/
    187: { n: "??" },
    /*::[*/
    188: { n: "??" },
    /*::[*/
    195: { n: "??" },
    /*::[*/
    201: { n: "??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: V },
    /*::[*/
    205: { n: "??" },
    /*::[*/
    206: { n: "??" },
    /*::[*/
    207: { n: "??" },
    /*::[*/
    208: { n: "??" },
    /*::[*/
    256: { n: "??" },
    /*::[*/
    259: { n: "??" },
    /*::[*/
    260: { n: "??" },
    /*::[*/
    261: { n: "??" },
    /*::[*/
    262: { n: "??" },
    /*::[*/
    263: { n: "??" },
    /*::[*/
    265: { n: "??" },
    /*::[*/
    266: { n: "??" },
    /*::[*/
    267: { n: "??" },
    /*::[*/
    268: { n: "??" },
    /*::[*/
    270: { n: "??" },
    /*::[*/
    271: { n: "??" },
    /*::[*/
    384: { n: "??" },
    /*::[*/
    389: { n: "??" },
    /*::[*/
    390: { n: "??" },
    /*::[*/
    393: { n: "??" },
    /*::[*/
    396: { n: "??" },
    /*::[*/
    512: { n: "??" },
    /*::[*/
    514: { n: "??" },
    /*::[*/
    513: { n: "??" },
    /*::[*/
    516: { n: "??" },
    /*::[*/
    517: { n: "??" },
    /*::[*/
    640: { n: "??" },
    /*::[*/
    641: { n: "??" },
    /*::[*/
    642: { n: "??" },
    /*::[*/
    643: { n: "??" },
    /*::[*/
    644: { n: "??" },
    /*::[*/
    645: { n: "??" },
    /*::[*/
    646: { n: "??" },
    /*::[*/
    647: { n: "??" },
    /*::[*/
    648: { n: "??" },
    /*::[*/
    658: { n: "??" },
    /*::[*/
    659: { n: "??" },
    /*::[*/
    660: { n: "??" },
    /*::[*/
    661: { n: "??" },
    /*::[*/
    662: { n: "??" },
    /*::[*/
    665: { n: "??" },
    /*::[*/
    666: { n: "??" },
    /*::[*/
    768: { n: "??" },
    /*::[*/
    772: { n: "??" },
    /*::[*/
    1537: { n: "SHEETINFOQP", f: Z },
    /*::[*/
    1600: { n: "??" },
    /*::[*/
    1602: { n: "??" },
    /*::[*/
    1793: { n: "??" },
    /*::[*/
    1794: { n: "??" },
    /*::[*/
    1795: { n: "??" },
    /*::[*/
    1796: { n: "??" },
    /*::[*/
    1920: { n: "??" },
    /*::[*/
    2048: { n: "??" },
    /*::[*/
    2049: { n: "??" },
    /*::[*/
    2052: { n: "??" },
    /*::[*/
    2688: { n: "??" },
    /*::[*/
    10998: { n: "??" },
    /*::[*/
    12849: { n: "??" },
    /*::[*/
    28233: { n: "??" },
    /*::[*/
    28484: { n: "??" },
    /*::[*/
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: a,
    book_to_wk3: n,
    to_workbook: r
  };
}();
function Km(e) {
  var r = {}, t = e.match(kr), a = 0, n = !1;
  if (t) for (; a != t.length; ++a) {
    var s = me(t[a]);
    switch (s[0].replace(/\w*:/g, "")) {
      case "<condense":
        break;
      case "<extend":
        break;
      case "<shadow":
        if (!s.val) break;
      case "<shadow>":
      case "<shadow/>":
        r.shadow = 1;
        break;
      case "</shadow>":
        break;
      case "<charset":
        if (s.val == "1") break;
        r.cp = f0[parseInt(s.val, 10)];
        break;
      case "<outline":
        if (!s.val) break;
      case "<outline>":
      case "<outline/>":
        r.outline = 1;
        break;
      case "</outline>":
        break;
      case "<rFont":
        r.name = s.val;
        break;
      case "<sz":
        r.sz = s.val;
        break;
      case "<strike":
        if (!s.val) break;
      case "<strike>":
      case "<strike/>":
        r.strike = 1;
        break;
      case "</strike>":
        break;
      case "<u":
        if (!s.val) break;
        switch (s.val) {
          case "double":
            r.uval = "double";
            break;
          case "singleAccounting":
            r.uval = "single-accounting";
            break;
          case "doubleAccounting":
            r.uval = "double-accounting";
            break;
        }
      case "<u>":
      case "<u/>":
        r.u = 1;
        break;
      case "</u>":
        break;
      case "<b":
        if (s.val == "0") break;
      case "<b>":
      case "<b/>":
        r.b = 1;
        break;
      case "</b>":
        break;
      case "<i":
        if (s.val == "0") break;
      case "<i>":
      case "<i/>":
        r.i = 1;
        break;
      case "</i>":
        break;
      case "<color":
        s.rgb && (r.color = s.rgb.slice(2, 8));
        break;
      case "<color>":
      case "<color/>":
      case "</color>":
        break;
      case "<family":
        r.family = s.val;
        break;
      case "<family>":
      case "<family/>":
      case "</family>":
        break;
      case "<vertAlign":
        r.valign = s.val;
        break;
      case "<vertAlign>":
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<scheme":
        break;
      case "<scheme>":
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (s[0].charCodeAt(1) !== 47 && !n) throw new Error("Unrecognized rich format " + s[0]);
    }
  }
  return r;
}
var qm = /* @__PURE__ */ function() {
  var e = Nn("t"), r = Nn("rPr");
  function t(s) {
    var i = s.match(e);
    if (!i) return { t: "s", v: "" };
    var c = { t: "s", v: Oe(i[1]) }, o = s.match(r);
    return o && (c.s = Km(o[1])), c;
  }
  var a = /<(?:\w+:)?r>/g, n = /<\/(?:\w+:)?r>/;
  return function(i) {
    return i.replace(a, "").split(n).map(t).filter(function(c) {
      return c.v;
    });
  };
}(), Ym = /* @__PURE__ */ function() {
  var r = /(\r\n|\n)/g;
  function t(n, s, i) {
    var c = [];
    n.u && c.push("text-decoration: underline;"), n.uval && c.push("text-underline-style:" + n.uval + ";"), n.sz && c.push("font-size:" + n.sz + "pt;"), n.outline && c.push("text-effect: outline;"), n.shadow && c.push("text-shadow: auto;"), s.push('<span style="' + c.join("") + '">'), n.b && (s.push("<b>"), i.push("</b>")), n.i && (s.push("<i>"), i.push("</i>")), n.strike && (s.push("<s>"), i.push("</s>"));
    var o = n.valign || "";
    return o == "superscript" || o == "super" ? o = "sup" : o == "subscript" && (o = "sub"), o != "" && (s.push("<" + o + ">"), i.push("</" + o + ">")), i.push("</span>"), n;
  }
  function a(n) {
    var s = [[], n.v, []];
    return n.v ? (n.s && t(n.s, s[0], s[2]), s[0].join("") + s[1].replace(r, "<br/>") + s[2].join("")) : "";
  }
  return function(s) {
    return s.map(a).join("");
  };
}(), Jm = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g, Zm = /<(?:\w+:)?r>/, Qm = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
function A0(e, r) {
  var t = r ? r.cellHTML : !0, a = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (a.t = Oe(Ne(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), a.r = Ne(e), t && (a.h = x0(a.t))) : (
    /*y = */
    e.match(Zm) && (a.r = Ne(e), a.t = Oe(Ne((e.replace(Qm, "").match(Jm) || []).join("").replace(kr, ""))), t && (a.h = Ym(qm(a.r))))
  ), a) : { t: "" };
}
var ex = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/, rx = /<(?:\w+:)?(?:si|sstItem)>/g, tx = /<\/(?:\w+:)?(?:si|sstItem)>/;
function ax(e, r) {
  var t = [], a = "";
  if (!e) return t;
  var n = e.match(ex);
  if (n) {
    a = n[2].replace(rx, "").split(tx);
    for (var s = 0; s != a.length; ++s) {
      var i = A0(a[s].trim(), r);
      i != null && (t[t.length] = i);
    }
    n = me(n[1]), t.Count = n.count, t.Unique = n.uniqueCount;
  }
  return t;
}
function nx(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function sx(e, r) {
  var t = [], a = !1;
  return Mt(e, function(s, i, c) {
    switch (c) {
      case 159:
        t.Count = s[0], t.Unique = s[1];
        break;
      case 19:
        t.push(s);
        break;
      case 160:
        return !0;
      case 35:
        a = !0;
        break;
      case 36:
        a = !1;
        break;
      default:
        if (i.T, !a || r.WTF) throw new Error("Unexpected record 0x" + c.toString(16));
    }
  }), t;
}
function xu(e) {
  for (var r = [], t = e.split(""), a = 0; a < t.length; ++a) r[a] = t[a].charCodeAt(0);
  return r;
}
function It(e, r) {
  var t = {};
  return t.Major = e.read_shift(2), t.Minor = e.read_shift(2), r >= 4 && (e.l += r - 4), t;
}
function ix(e) {
  var r = {};
  return r.id = e.read_shift(0, "lpp4"), r.R = It(e, 4), r.U = It(e, 4), r.W = It(e, 4), r;
}
function cx(e) {
  for (var r = e.read_shift(4), t = e.l + r - 4, a = {}, n = e.read_shift(4), s = []; n-- > 0; ) s.push({ t: e.read_shift(4), v: e.read_shift(0, "lpp4") });
  if (a.name = e.read_shift(0, "lpp4"), a.comps = s, e.l != t) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + t);
  return a;
}
function ox(e) {
  var r = [];
  e.l += 4;
  for (var t = e.read_shift(4); t-- > 0; ) r.push(cx(e));
  return r;
}
function fx(e) {
  var r = [];
  e.l += 4;
  for (var t = e.read_shift(4); t-- > 0; ) r.push(e.read_shift(0, "lpp4"));
  return r;
}
function lx(e) {
  var r = {};
  return e.read_shift(4), e.l += 4, r.id = e.read_shift(0, "lpp4"), r.name = e.read_shift(0, "lpp4"), r.R = It(e, 4), r.U = It(e, 4), r.W = It(e, 4), r;
}
function ux(e) {
  var r = lx(e);
  if (r.ename = e.read_shift(0, "8lpp4"), r.blksz = e.read_shift(4), r.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return r;
}
function vu(e, r) {
  var t = e.l + r, a = {};
  a.Flags = e.read_shift(4) & 63, e.l += 4, a.AlgID = e.read_shift(4);
  var n = !1;
  switch (a.AlgID) {
    case 26126:
    case 26127:
    case 26128:
      n = a.Flags == 36;
      break;
    case 26625:
      n = a.Flags == 4;
      break;
    case 0:
      n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
      break;
    default:
      throw "Unrecognized encryption algorithm: " + a.AlgID;
  }
  if (!n) throw new Error("Encryption Flags/AlgID mismatch");
  return a.AlgIDHash = e.read_shift(4), a.KeySize = e.read_shift(4), a.ProviderType = e.read_shift(4), e.l += 8, a.CSPName = e.read_shift(t - e.l >> 1, "utf16le"), e.l = t, a;
}
function gu(e, r) {
  var t = {}, a = e.l + r;
  return e.l += 4, t.Salt = e.slice(e.l, e.l + 16), e.l += 16, t.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), t.VerifierHash = e.slice(e.l, a), e.l = a, t;
}
function hx(e) {
  var r = It(e);
  switch (r.Minor) {
    case 2:
      return [r.Minor, dx(e)];
    case 3:
      return [r.Minor, px()];
    case 4:
      return [r.Minor, mx(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + r.Minor);
}
function dx(e) {
  var r = e.read_shift(4);
  if ((r & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var t = e.read_shift(4), a = vu(e, t), n = gu(e, e.length - e.l);
  return { t: "Std", h: a, v: n };
}
function px() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}
function mx(e) {
  var r = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var t = e.read_shift(e.length - e.l, "utf8"), a = {};
  return t.replace(kr, function(s) {
    var i = me(s);
    switch (Et(i[0])) {
      case "<?xml":
        break;
      case "<encryption":
      case "</encryption>":
        break;
      case "<keyData":
        r.forEach(function(c) {
          a[c] = i[c];
        });
        break;
      case "<dataIntegrity":
        a.encryptedHmacKey = i.encryptedHmacKey, a.encryptedHmacValue = i.encryptedHmacValue;
        break;
      case "<keyEncryptors>":
      case "<keyEncryptors":
        a.encs = [];
        break;
      case "</keyEncryptors>":
        break;
      case "<keyEncryptor":
        a.uri = i.uri;
        break;
      case "</keyEncryptor>":
        break;
      case "<encryptedKey":
        a.encs.push(i);
        break;
      default:
        throw i[0];
    }
  }), a;
}
function xx(e, r) {
  var t = {}, a = t.EncryptionVersionInfo = It(e, 4);
  if (r -= 4, a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
  if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
  t.Flags = e.read_shift(4), r -= 4;
  var n = e.read_shift(4);
  return r -= 4, t.EncryptionHeader = vu(e, n), r -= n, t.EncryptionVerifier = gu(e, r), t;
}
function vx(e) {
  var r = {}, t = r.EncryptionVersionInfo = It(e, 4);
  if (t.Major != 1 || t.Minor != 1) throw "unrecognized version code " + t.Major + " : " + t.Minor;
  return r.Salt = e.read_shift(16), r.EncryptedVerifier = e.read_shift(16), r.EncryptedVerifierHash = e.read_shift(16), r;
}
function gx(e) {
  var r = 0, t, a = xu(e), n = a.length + 1, s, i, c, o, f;
  for (t = ra(n), t[0] = a.length, s = 1; s != n; ++s) t[s] = a[s - 1];
  for (s = n - 1; s >= 0; --s)
    i = t[s], c = r & 16384 ? 1 : 0, o = r << 1 & 32767, f = c | o, r = f ^ i;
  return r ^ 52811;
}
var _u = /* @__PURE__ */ function() {
  var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0], r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163], t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628], a = function(i) {
    return (i / 2 | i * 128) & 255;
  }, n = function(i, c) {
    return a(i ^ c);
  }, s = function(i) {
    for (var c = r[i.length - 1], o = 104, f = i.length - 1; f >= 0; --f)
      for (var l = i[f], u = 0; u != 7; ++u)
        l & 64 && (c ^= t[o]), l *= 2, --o;
    return c;
  };
  return function(i) {
    for (var c = xu(i), o = s(c), f = c.length, l = ra(16), u = 0; u != 16; ++u) l[u] = 0;
    var p, h, d;
    for ((f & 1) === 1 && (p = o >> 8, l[f] = n(e[0], p), --f, p = o & 255, h = c[c.length - 1], l[f] = n(h, p)); f > 0; )
      --f, p = o >> 8, l[f] = n(c[f], p), --f, p = o & 255, l[f] = n(c[f], p);
    for (f = 15, d = 15 - c.length; d > 0; )
      p = o >> 8, l[f] = n(e[d], p), --f, --d, p = o & 255, l[f] = n(c[f], p), --f, --d;
    return l;
  };
}(), _x = function(e, r, t, a, n) {
  n || (n = r), a || (a = _u(e));
  var s, i;
  for (s = 0; s != r.length; ++s)
    i = r[s], i ^= a[t], i = (i >> 5 | i << 3) & 255, n[s] = i, ++t;
  return [n, t, a];
}, Ex = function(e) {
  var r = 0, t = _u(e);
  return function(a) {
    var n = _x("", a, r, t);
    return r = n[1], n[0];
  };
};
function yx(e, r, t, a) {
  var n = { key: Ye(e), verificationBytes: Ye(e) };
  return t.password && (n.verifier = gx(t.password)), a.valid = n.verificationBytes === n.verifier, a.valid && (a.insitu = Ex(t.password)), n;
}
function wx(e, r, t) {
  var a = t || {};
  return a.Info = e.read_shift(2), e.l -= 2, a.Info === 1 ? a.Data = vx(e) : a.Data = xx(e, r), a;
}
function Tx(e, r, t) {
  var a = { Type: t.biff >= 8 ? e.read_shift(2) : 0 };
  return a.Type ? wx(e, r - 2, a) : yx(e, t.biff >= 8 ? r : r - 2, t, a), a;
}
var kx = /* @__PURE__ */ function() {
  function e(n, s) {
    switch (s.type) {
      case "base64":
        return r(Gr(n), s);
      case "binary":
        return r(n, s);
      case "buffer":
        return r(Fe && Buffer.isBuffer(n) ? n.toString("binary") : wa(n), s);
      case "array":
        return r(xa(n), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function r(n, s) {
    var i = s || {}, c = i.dense ? [] : {}, o = n.match(/\\trowd.*?\\row\b/g);
    if (!o.length) throw new Error("RTF missing table");
    var f = { s: { c: 0, r: 0 }, e: { c: 0, r: o.length - 1 } };
    return o.forEach(function(l, u) {
      Array.isArray(c) && (c[u] = []);
      for (var p = /\\\w+\b/g, h = 0, d, m = -1; d = p.exec(l); ) {
        switch (d[0]) {
          case "\\cell":
            var x = l.slice(h, p.lastIndex - d[0].length);
            if (x[0] == " " && (x = x.slice(1)), ++m, x.length) {
              var g = { v: x, t: "s" };
              Array.isArray(c) ? c[u][m] = g : c[ge({ r: u, c: m })] = g;
            }
            break;
        }
        h = p.lastIndex;
      }
      m > f.e.c && (f.e.c = m);
    }), c["!ref"] = Re(f), c;
  }
  function t(n, s) {
    return aa(e(n, s), s);
  }
  function a(n) {
    for (var s = ["{\\rtf1\\ansi"], i = Ge(n["!ref"]), c, o = Array.isArray(n), f = i.s.r; f <= i.e.r; ++f) {
      s.push("\\trowd\\trautofit1");
      for (var l = i.s.c; l <= i.e.c; ++l) s.push("\\cellx" + (l + 1));
      for (s.push("\\pard\\intbl"), l = i.s.c; l <= i.e.c; ++l) {
        var u = ge({ r: f, c: l });
        c = o ? (n[f] || [])[l] : n[u], !(!c || c.v == null && (!c.f || c.F)) && (s.push(" " + (c.w || (bt(c), c.w))), s.push("\\cell"));
      }
      s.push("\\pard\\intbl\\row");
    }
    return s.join("") + "}";
  }
  return {
    to_workbook: t,
    to_sheet: e,
    from_sheet: a
  };
}();
function Sx(e) {
  var r = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(r.slice(0, 2), 16), parseInt(r.slice(2, 4), 16), parseInt(r.slice(4, 6), 16)];
}
function Ln(e) {
  for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
  return t.toString(16).toUpperCase().slice(1);
}
function Ax(e) {
  var r = e[0] / 255, t = e[1] / 255, a = e[2] / 255, n = Math.max(r, t, a), s = Math.min(r, t, a), i = n - s;
  if (i === 0) return [0, 0, r];
  var c = 0, o = 0, f = n + s;
  switch (o = i / (f > 1 ? 2 - f : f), n) {
    case r:
      c = ((t - a) / i + 6) % 6;
      break;
    case t:
      c = (a - r) / i + 2;
      break;
    case a:
      c = (r - t) / i + 4;
      break;
  }
  return [c / 6, o, f / 2];
}
function $x(e) {
  var r = e[0], t = e[1], a = e[2], n = t * 2 * (a < 0.5 ? a : 1 - a), s = a - n / 2, i = [s, s, s], c = 6 * r, o;
  if (t !== 0) switch (c | 0) {
    case 0:
    case 6:
      o = n * c, i[0] += n, i[1] += o;
      break;
    case 1:
      o = n * (2 - c), i[0] += o, i[1] += n;
      break;
    case 2:
      o = n * (c - 2), i[1] += n, i[2] += o;
      break;
    case 3:
      o = n * (4 - c), i[1] += o, i[2] += n;
      break;
    case 4:
      o = n * (c - 4), i[2] += n, i[0] += o;
      break;
    case 5:
      o = n * (6 - c), i[2] += o, i[0] += n;
      break;
  }
  for (var f = 0; f != 3; ++f) i[f] = Math.round(i[f] * 255);
  return i;
}
function Is(e, r) {
  if (r === 0) return e;
  var t = Ax(Sx(e));
  return r < 0 ? t[2] = t[2] * (1 + r) : t[2] = 1 - (1 - t[2]) * (1 - r), Ln($x(t));
}
var Eu = 6, Fx = 15, Cx = 1, $r = Eu;
function Ps(e) {
  return Math.floor((e + Math.round(128 / $r) / 256) * $r);
}
function Ns(e) {
  return Math.floor((e - 5) / $r * 100 + 0.5) / 100;
}
function Vi(e) {
  return Math.round((e * $r + 5) / $r * 256) / 256;
}
function vi(e) {
  return Vi(Ns(Ps(e)));
}
function $0(e) {
  var r = Math.abs(e - vi(e)), t = $r;
  if (r > 5e-3) for ($r = Cx; $r < Fx; ++$r) Math.abs(e - vi(e)) <= r && (r = Math.abs(e - vi(e)), t = $r);
  $r = t;
}
function za(e) {
  e.width ? (e.wpx = Ps(e.width), e.wch = Ns(e.wpx), e.MDW = $r) : e.wpx ? (e.wch = Ns(e.wpx), e.width = Vi(e.wch), e.MDW = $r) : typeof e.wch == "number" && (e.width = Vi(e.wch), e.wpx = Ps(e.width), e.MDW = $r), e.customWidth && delete e.customWidth;
}
var Rx = 96, yu = Rx;
function wu(e) {
  return e * 96 / yu;
}
function Mn(e) {
  return e * yu / 96;
}
var Ox = {
  None: "none",
  Solid: "solid",
  Gray50: "mediumGray",
  Gray75: "darkGray",
  Gray25: "lightGray",
  HorzStripe: "darkHorizontal",
  VertStripe: "darkVertical",
  ReverseDiagStripe: "darkDown",
  DiagStripe: "darkUp",
  DiagCross: "darkGrid",
  ThickDiagCross: "darkTrellis",
  ThinHorzStripe: "lightHorizontal",
  ThinVertStripe: "lightVertical",
  ThinReverseDiagStripe: "lightDown",
  ThinHorzCross: "lightGrid"
};
function Ix(e, r, t, a) {
  r.Borders = [];
  var n = {}, s = !1;
  (e[0].match(kr) || []).forEach(function(i) {
    var c = me(i);
    switch (Et(c[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      case "<border":
      case "<border>":
      case "<border/>":
        n = /*::(*/
        {}, c.diagonalUp && (n.diagonalUp = Ue(c.diagonalUp)), c.diagonalDown && (n.diagonalDown = Ue(c.diagonalDown)), r.Borders.push(n);
        break;
      case "</border>":
        break;
      case "<left/>":
        break;
      case "<left":
      case "<left>":
        break;
      case "</left>":
        break;
      case "<right/>":
        break;
      case "<right":
      case "<right>":
        break;
      case "</right>":
        break;
      case "<top/>":
        break;
      case "<top":
      case "<top>":
        break;
      case "</top>":
        break;
      case "<bottom/>":
        break;
      case "<bottom":
      case "<bottom>":
        break;
      case "</bottom>":
        break;
      case "<diagonal":
      case "<diagonal>":
      case "<diagonal/>":
        break;
      case "</diagonal>":
        break;
      case "<horizontal":
      case "<horizontal>":
      case "<horizontal/>":
        break;
      case "</horizontal>":
        break;
      case "<vertical":
      case "<vertical>":
      case "<vertical/>":
        break;
      case "</vertical>":
        break;
      case "<start":
      case "<start>":
      case "<start/>":
        break;
      case "</start>":
        break;
      case "<end":
      case "<end>":
      case "<end/>":
        break;
      case "</end>":
        break;
      case "<color":
      case "<color>":
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        s = !0;
        break;
      case "</ext>":
        s = !1;
        break;
      default:
        if (a && a.WTF && !s)
          throw new Error("unrecognized " + c[0] + " in borders");
    }
  });
}
function Px(e, r, t, a) {
  r.Fills = [];
  var n = {}, s = !1;
  (e[0].match(kr) || []).forEach(function(i) {
    var c = me(i);
    switch (Et(c[0])) {
      case "<fills":
      case "<fills>":
      case "</fills>":
        break;
      case "<fill>":
      case "<fill":
      case "<fill/>":
        n = {}, r.Fills.push(n);
        break;
      case "</fill>":
        break;
      case "<gradientFill>":
        break;
      case "<gradientFill":
      case "</gradientFill>":
        r.Fills.push(n), n = {};
        break;
      case "<patternFill":
      case "<patternFill>":
        c.patternType && (n.patternType = c.patternType);
        break;
      case "<patternFill/>":
      case "</patternFill>":
        break;
      case "<bgColor":
        n.bgColor || (n.bgColor = {}), c.indexed && (n.bgColor.indexed = parseInt(c.indexed, 10)), c.theme && (n.bgColor.theme = parseInt(c.theme, 10)), c.tint && (n.bgColor.tint = parseFloat(c.tint)), c.rgb && (n.bgColor.rgb = c.rgb.slice(-6));
        break;
      case "<bgColor/>":
      case "</bgColor>":
        break;
      case "<fgColor":
        n.fgColor || (n.fgColor = {}), c.theme && (n.fgColor.theme = parseInt(c.theme, 10)), c.tint && (n.fgColor.tint = parseFloat(c.tint)), c.rgb != null && (n.fgColor.rgb = c.rgb.slice(-6));
        break;
      case "<fgColor/>":
      case "</fgColor>":
        break;
      case "<stop":
      case "<stop/>":
        break;
      case "</stop>":
        break;
      case "<color":
      case "<color/>":
        break;
      case "</color>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        s = !0;
        break;
      case "</ext>":
        s = !1;
        break;
      default:
        if (a && a.WTF && !s)
          throw new Error("unrecognized " + c[0] + " in fills");
    }
  });
}
function Nx(e, r, t, a) {
  r.Fonts = [];
  var n = {}, s = !1;
  (e[0].match(kr) || []).forEach(function(i) {
    var c = me(i);
    switch (Et(c[0])) {
      case "<fonts":
      case "<fonts>":
      case "</fonts>":
        break;
      case "<font":
      case "<font>":
        break;
      case "</font>":
      case "<font/>":
        r.Fonts.push(n), n = {};
        break;
      case "<name":
        c.val && (n.name = Ne(c.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      case "<b":
        n.bold = c.val ? Ue(c.val) : 1;
        break;
      case "<b/>":
        n.bold = 1;
        break;
      case "<i":
        n.italic = c.val ? Ue(c.val) : 1;
        break;
      case "<i/>":
        n.italic = 1;
        break;
      case "<u":
        switch (c.val) {
          case "none":
            n.underline = 0;
            break;
          case "single":
            n.underline = 1;
            break;
          case "double":
            n.underline = 2;
            break;
          case "singleAccounting":
            n.underline = 33;
            break;
          case "doubleAccounting":
            n.underline = 34;
            break;
        }
        break;
      case "<u/>":
        n.underline = 1;
        break;
      case "<strike":
        n.strike = c.val ? Ue(c.val) : 1;
        break;
      case "<strike/>":
        n.strike = 1;
        break;
      case "<outline":
        n.outline = c.val ? Ue(c.val) : 1;
        break;
      case "<outline/>":
        n.outline = 1;
        break;
      case "<shadow":
        n.shadow = c.val ? Ue(c.val) : 1;
        break;
      case "<shadow/>":
        n.shadow = 1;
        break;
      case "<condense":
        n.condense = c.val ? Ue(c.val) : 1;
        break;
      case "<condense/>":
        n.condense = 1;
        break;
      case "<extend":
        n.extend = c.val ? Ue(c.val) : 1;
        break;
      case "<extend/>":
        n.extend = 1;
        break;
      case "<sz":
        c.val && (n.sz = +c.val);
        break;
      case "<sz/>":
      case "</sz>":
        break;
      case "<vertAlign":
        c.val && (n.vertAlign = c.val);
        break;
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      case "<family":
        c.val && (n.family = parseInt(c.val, 10));
        break;
      case "<family/>":
      case "</family>":
        break;
      case "<scheme":
        c.val && (n.scheme = c.val);
        break;
      case "<scheme/>":
      case "</scheme>":
        break;
      case "<charset":
        if (c.val == "1") break;
        c.codepage = f0[parseInt(c.val, 10)];
        break;
      case "<color":
        if (n.color || (n.color = {}), c.auto && (n.color.auto = Ue(c.auto)), c.rgb) n.color.rgb = c.rgb.slice(-6);
        else if (c.indexed) {
          n.color.index = parseInt(c.indexed, 10);
          var o = pa[n.color.index];
          n.color.index == 81 && (o = pa[1]), o || (o = pa[1]), n.color.rgb = o[0].toString(16) + o[1].toString(16) + o[2].toString(16);
        } else c.theme && (n.color.theme = parseInt(c.theme, 10), c.tint && (n.color.tint = parseFloat(c.tint)), c.theme && t.themeElements && t.themeElements.clrScheme && (n.color.rgb = Is(t.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)));
        break;
      case "<color/>":
      case "</color>":
        break;
      case "<AlternateContent":
        s = !0;
        break;
      case "</AlternateContent>":
        s = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        s = !0;
        break;
      case "</ext>":
        s = !1;
        break;
      default:
        if (a && a.WTF && !s)
          throw new Error("unrecognized " + c[0] + " in fonts");
    }
  });
}
function bx(e, r, t) {
  r.NumberFmt = [];
  for (var a = _t(Ee), n = 0; n < a.length; ++n) r.NumberFmt[a[n]] = Ee[a[n]];
  var s = e[0].match(kr);
  if (s)
    for (n = 0; n < s.length; ++n) {
      var i = me(s[n]);
      switch (Et(i[0])) {
        case "<numFmts":
        case "</numFmts>":
        case "<numFmts/>":
        case "<numFmts>":
          break;
        case "<numFmt":
          {
            var c = Oe(Ne(i.formatCode)), o = parseInt(i.numFmtId, 10);
            if (r.NumberFmt[o] = c, o > 0) {
              if (o > 392) {
                for (o = 392; o > 60 && r.NumberFmt[o] != null; --o) ;
                r.NumberFmt[o] = c;
              }
              da(c, o);
            }
          }
          break;
        case "</numFmt>":
          break;
        default:
          if (t.WTF) throw new Error("unrecognized " + i[0] + " in numFmts");
      }
    }
}
var ns = ["numFmtId", "fillId", "fontId", "borderId", "xfId"], ss = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
function Dx(e, r, t) {
  r.CellXf = [];
  var a, n = !1;
  (e[0].match(kr) || []).forEach(function(s) {
    var i = me(s), c = 0;
    switch (Et(i[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      case "<xf":
      case "<xf/>":
        for (a = i, delete a[0], c = 0; c < ns.length; ++c) a[ns[c]] && (a[ns[c]] = parseInt(a[ns[c]], 10));
        for (c = 0; c < ss.length; ++c) a[ss[c]] && (a[ss[c]] = Ue(a[ss[c]]));
        if (r.NumberFmt && a.numFmtId > 392) {
          for (c = 392; c > 60; --c) if (r.NumberFmt[a.numFmtId] == r.NumberFmt[c]) {
            a.numFmtId = c;
            break;
          }
        }
        r.CellXf.push(a);
        break;
      case "</xf>":
        break;
      case "<alignment":
      case "<alignment/>":
        var o = {};
        i.vertical && (o.vertical = i.vertical), i.horizontal && (o.horizontal = i.horizontal), i.textRotation != null && (o.textRotation = i.textRotation), i.indent && (o.indent = i.indent), i.wrapText && (o.wrapText = Ue(i.wrapText)), a.alignment = o;
        break;
      case "</alignment>":
        break;
      case "<protection":
        break;
      case "</protection>":
      case "<protection/>":
        break;
      case "<AlternateContent":
        n = !0;
        break;
      case "</AlternateContent>":
        n = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (t && t.WTF && !n)
          throw new Error("unrecognized " + i[0] + " in cellXfs");
    }
  });
}
var Lx = /* @__PURE__ */ function() {
  var r = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/, t = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/, a = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/, n = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/, s = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
  return function(c, o, f) {
    var l = {};
    if (!c) return l;
    c = c.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
    var u;
    return (u = c.match(r)) && bx(u, l, f), (u = c.match(n)) && Nx(u, l, o, f), (u = c.match(a)) && Px(u, l, o, f), (u = c.match(s)) && Ix(u, l, o, f), (u = c.match(t)) && Dx(u, l, f), l;
  };
}();
function Mx(e, r) {
  var t = e.read_shift(2), a = wr(e);
  return [t, a];
}
function Bx(e, r, t) {
  var a = {};
  a.sz = e.read_shift(2) / 20;
  var n = q1(e);
  n.fItalic && (a.italic = 1), n.fCondense && (a.condense = 1), n.fExtend && (a.extend = 1), n.fShadow && (a.shadow = 1), n.fOutline && (a.outline = 1), n.fStrikeout && (a.strike = 1);
  var s = e.read_shift(2);
  switch (s === 700 && (a.bold = 1), e.read_shift(2)) {
    case 1:
      a.vertAlign = "superscript";
      break;
    case 2:
      a.vertAlign = "subscript";
      break;
  }
  var i = e.read_shift(1);
  i != 0 && (a.underline = i);
  var c = e.read_shift(1);
  c > 0 && (a.family = c);
  var o = e.read_shift(1);
  switch (o > 0 && (a.charset = o), e.l++, a.color = K1(e), e.read_shift(1)) {
    case 1:
      a.scheme = "major";
      break;
    case 2:
      a.scheme = "minor";
      break;
  }
  return a.name = wr(e), a;
}
var Ux = Tr;
function jx(e, r) {
  var t = e.l + r, a = e.read_shift(2), n = e.read_shift(2);
  return e.l = t, { ixfe: a, numFmtId: n };
}
var Vx = Tr;
function Hx(e, r, t) {
  var a = {};
  a.NumberFmt = [];
  for (var n in Ee) a.NumberFmt[n] = Ee[n];
  a.CellXf = [], a.Fonts = [];
  var s = [], i = !1;
  return Mt(e, function(o, f, l) {
    switch (l) {
      case 44:
        a.NumberFmt[o[0]] = o[1], da(o[1], o[0]);
        break;
      case 43:
        a.Fonts.push(o), o.color.theme != null && r && r.themeElements && r.themeElements.clrScheme && (o.color.rgb = Is(r.themeElements.clrScheme[o.color.theme].rgb, o.color.tint || 0));
        break;
      case 1025:
        break;
      case 45:
        break;
      case 46:
        break;
      case 47:
        s[s.length - 1] == 617 && a.CellXf.push(o);
        break;
      case 48:
      case 507:
      case 572:
      case 475:
        break;
      case 1171:
      case 2102:
      case 1130:
      case 512:
      case 2095:
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        s.push(l), i = !0;
        break;
      case 38:
        s.pop(), i = !1;
        break;
      default:
        if (f.T > 0) s.push(l);
        else if (f.T < 0) s.pop();
        else if (!i || t.WTF && s[s.length - 1] != 37) throw new Error("Unexpected record 0x" + l.toString(16));
    }
  }), a;
}
var Gx = [
  "</a:lt1>",
  "</a:dk1>",
  "</a:lt2>",
  "</a:dk2>",
  "</a:accent1>",
  "</a:accent2>",
  "</a:accent3>",
  "</a:accent4>",
  "</a:accent5>",
  "</a:accent6>",
  "</a:hlink>",
  "</a:folHlink>"
];
function zx(e, r, t) {
  r.themeElements.clrScheme = [];
  var a = {};
  (e[0].match(kr) || []).forEach(function(n) {
    var s = me(n);
    switch (s[0]) {
      case "<a:clrScheme":
      case "</a:clrScheme>":
        break;
      case "<a:srgbClr":
        a.rgb = s.val;
        break;
      case "<a:sysClr":
        a.rgb = s.lastClr;
        break;
      case "<a:dk1>":
      case "</a:dk1>":
      case "<a:lt1>":
      case "</a:lt1>":
      case "<a:dk2>":
      case "</a:dk2>":
      case "<a:lt2>":
      case "</a:lt2>":
      case "<a:accent1>":
      case "</a:accent1>":
      case "<a:accent2>":
      case "</a:accent2>":
      case "<a:accent3>":
      case "</a:accent3>":
      case "<a:accent4>":
      case "</a:accent4>":
      case "<a:accent5>":
      case "</a:accent5>":
      case "<a:accent6>":
      case "</a:accent6>":
      case "<a:hlink>":
      case "</a:hlink>":
      case "<a:folHlink>":
      case "</a:folHlink>":
        s[0].charAt(1) === "/" ? (r.themeElements.clrScheme[Gx.indexOf(s[0])] = a, a = {}) : a.name = s[0].slice(3, s[0].length - 1);
        break;
      default:
        if (t && t.WTF) throw new Error("Unrecognized " + s[0] + " in clrScheme");
    }
  });
}
function Wx() {
}
function Xx() {
}
var Kx = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/, qx = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/, Yx = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
function Jx(e, r, t) {
  r.themeElements = {};
  var a;
  [
    /* clrScheme CT_ColorScheme */
    ["clrScheme", Kx, zx],
    /* fontScheme CT_FontScheme */
    ["fontScheme", qx, Wx],
    /* fmtScheme CT_StyleMatrix */
    ["fmtScheme", Yx, Xx]
  ].forEach(function(n) {
    if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
    n[2](a, r, t);
  });
}
var Zx = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
function Tu(e, r) {
  (!e || e.length === 0) && (e = Qx());
  var t, a = {};
  if (!(t = e.match(Zx))) throw new Error("themeElements not found in theme");
  return Jx(t[0], a, r), a.raw = e, a;
}
function Qx(e, r) {
  var t = [Nl];
  return t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', t[t.length] = "<a:themeElements>", t[t.length] = '<a:clrScheme name="Office">', t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', t[t.length] = "</a:clrScheme>", t[t.length] = '<a:fontScheme name="Office">', t[t.length] = "<a:majorFont>", t[t.length] = '<a:latin typeface="Cambria"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:majorFont>", t[t.length] = "<a:minorFont>", t[t.length] = '<a:latin typeface="Calibri"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Arial"/>', t[t.length] = '<a:font script="Hebr" typeface="Arial"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Arial"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:minorFont>", t[t.length] = "</a:fontScheme>", t[t.length] = '<a:fmtScheme name="Office">', t[t.length] = "<a:fillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="1"/>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="0"/>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:fillStyleLst>", t[t.length] = "<a:lnStyleLst>", t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = "</a:lnStyleLst>", t[t.length] = "<a:effectStyleLst>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', t[t.length] = "</a:effectStyle>", t[t.length] = "</a:effectStyleLst>", t[t.length] = "<a:bgFillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:bgFillStyleLst>", t[t.length] = "</a:fmtScheme>", t[t.length] = "</a:themeElements>", t[t.length] = "<a:objectDefaults>", t[t.length] = "<a:spDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', t[t.length] = "</a:spDef>", t[t.length] = "<a:lnDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', t[t.length] = "</a:lnDef>", t[t.length] = "</a:objectDefaults>", t[t.length] = "<a:extraClrSchemeLst/>", t[t.length] = "</a:theme>", t.join("");
}
function ev(e, r, t) {
  var a = e.l + r, n = e.read_shift(4);
  if (n !== 124226) {
    if (!t.cellStyles) {
      e.l = a;
      return;
    }
    var s = e.slice(e.l);
    e.l = a;
    var i;
    try {
      i = Pl(s, { type: "array" });
    } catch {
      return;
    }
    var c = Hr(i, "theme/theme/theme1.xml", !0);
    if (c)
      return Tu(c, t);
  }
}
function rv(e) {
  return e.read_shift(4);
}
function tv(e) {
  var r = {};
  switch (r.xclrType = e.read_shift(2), r.nTintShade = e.read_shift(2), r.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      r.xclrValue = av(e, 4);
      break;
    case 2:
      r.xclrValue = fu(e);
      break;
    case 3:
      r.xclrValue = rv(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, r;
}
function av(e, r) {
  return Tr(e, r);
}
function nv(e, r) {
  return Tr(e, r);
}
function sv(e) {
  var r = e.read_shift(2), t = e.read_shift(2) - 4, a = [r];
  switch (r) {
    case 4:
    case 5:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
      a[1] = tv(e);
      break;
    case 6:
      a[1] = nv(e, t);
      break;
    case 14:
    case 15:
      a[1] = e.read_shift(t === 1 ? 1 : 2);
      break;
    default:
      throw new Error("Unrecognized ExtProp type: " + r + " " + t);
  }
  return a;
}
function iv(e, r) {
  var t = e.l + r;
  e.l += 2;
  var a = e.read_shift(2);
  e.l += 2;
  for (var n = e.read_shift(2), s = []; n-- > 0; ) s.push(sv(e, t - e.l));
  return { ixfe: a, ext: s };
}
function cv(e, r) {
  r.forEach(function(t) {
    switch (t[0]) {
    }
  });
}
function ov(e, r) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: wr(e)
  };
}
function fv(e) {
  for (var r = [], t = e.read_shift(4); t-- > 0; )
    r.push([e.read_shift(4), e.read_shift(4)]);
  return r;
}
function lv(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function uv(e, r, t) {
  var a = { Types: [], Cell: [], Value: [] }, n = t || {}, s = [], i = !1, c = 2;
  return Mt(e, function(o, f, l) {
    switch (l) {
      case 335:
        a.Types.push({ name: o.name });
        break;
      case 51:
        o.forEach(function(u) {
          c == 1 ? a.Cell.push({ type: a.Types[u[0] - 1].name, index: u[1] }) : c == 0 && a.Value.push({ type: a.Types[u[0] - 1].name, index: u[1] });
        });
        break;
      case 337:
        c = o ? 1 : 0;
        break;
      case 338:
        c = 2;
        break;
      case 35:
        s.push(l), i = !0;
        break;
      case 36:
        s.pop(), i = !1;
        break;
      default:
        if (!f.T) {
          if (!i || n.WTF && s[s.length - 1] != 35)
            throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }), a;
}
function hv(e, r, t) {
  var a = { Types: [], Cell: [], Value: [] };
  if (!e)
    return a;
  var n = !1, s = 2, i;
  return e.replace(kr, function(c) {
    var o = me(c);
    switch (Et(o[0])) {
      case "<?xml":
        break;
      case "<metadata":
      case "</metadata>":
        break;
      case "<metadataTypes":
      case "</metadataTypes>":
        break;
      case "<metadataType":
        a.Types.push({ name: o.name });
        break;
      case "</metadataType>":
        break;
      case "<futureMetadata":
        for (var f = 0; f < a.Types.length; ++f)
          a.Types[f].name == o.name && (i = a.Types[f]);
        break;
      case "</futureMetadata>":
        break;
      case "<bk>":
        break;
      case "</bk>":
        break;
      case "<rc":
        s == 1 ? a.Cell.push({ type: a.Types[o.t - 1].name, index: +o.v }) : s == 0 && a.Value.push({ type: a.Types[o.t - 1].name, index: +o.v });
        break;
      case "</rc>":
        break;
      case "<cellMetadata":
        s = 1;
        break;
      case "</cellMetadata>":
        s = 2;
        break;
      case "<valueMetadata":
        s = 0;
        break;
      case "</valueMetadata>":
        s = 2;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      case "<rvb":
        if (!i)
          break;
        i.offsets || (i.offsets = []), i.offsets.push(+o.i);
        break;
      default:
        if (!n && t.WTF)
          throw new Error("unrecognized " + o[0] + " in metadata");
    }
    return c;
  }), a;
}
function dv(e) {
  var r = [];
  if (!e) return r;
  var t = 1;
  return (e.match(kr) || []).forEach(function(a) {
    var n = me(a);
    switch (n[0]) {
      case "<?xml":
        break;
      case "<calcChain":
      case "<calcChain>":
      case "</calcChain>":
        break;
      case "<c":
        delete n[0], n.i ? t = n.i : n.i = t, r.push(n);
        break;
    }
  }), r;
}
function pv(e) {
  var r = {};
  r.i = e.read_shift(4);
  var t = {};
  t.r = e.read_shift(4), t.c = e.read_shift(4), r.r = ge(t);
  var a = e.read_shift(1);
  return a & 2 && (r.l = "1"), a & 8 && (r.a = "1"), r;
}
function mv(e, r, t) {
  var a = [];
  return Mt(e, function(s, i, c) {
    switch (c) {
      case 63:
        a.push(s);
        break;
      default:
        if (!i.T) throw new Error("Unexpected record 0x" + c.toString(16));
    }
  }), a;
}
function xv(e, r, t, a) {
  if (!e) return e;
  var n = a || {}, s = !1;
  Mt(e, function(c, o, f) {
    switch (f) {
      case 359:
      case 363:
      case 364:
      case 366:
      case 367:
      case 368:
      case 369:
      case 370:
      case 371:
      case 472:
      case 577:
      case 578:
      case 579:
      case 580:
      case 581:
      case 582:
      case 583:
      case 584:
      case 585:
      case 586:
      case 587:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      default:
        if (!o.T) {
          if (!s || n.WTF) throw new Error("Unexpected record 0x" + f.toString(16));
        }
    }
  }, n);
}
function vv(e, r) {
  if (!e) return "??";
  var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
  return r["!id"][t].Target;
}
function Bo(e, r, t, a) {
  var n = Array.isArray(e), s;
  r.forEach(function(i) {
    var c = Cr(i.ref);
    if (n ? (e[c.r] || (e[c.r] = []), s = e[c.r][c.c]) : s = e[i.ref], !s) {
      s = { t: "z" }, n ? e[c.r][c.c] = s : e[i.ref] = s;
      var o = Ge(e["!ref"] || "BDWGO1000001:A1");
      o.s.r > c.r && (o.s.r = c.r), o.e.r < c.r && (o.e.r = c.r), o.s.c > c.c && (o.s.c = c.c), o.e.c < c.c && (o.e.c = c.c);
      var f = Re(o);
      f !== e["!ref"] && (e["!ref"] = f);
    }
    s.c || (s.c = []);
    var l = { a: i.author, t: i.t, r: i.r, T: t };
    i.h && (l.h = i.h);
    for (var u = s.c.length - 1; u >= 0; --u) {
      if (!t && s.c[u].T) return;
      t && !s.c[u].T && s.c.splice(u, 1);
    }
    if (t && a) {
      for (u = 0; u < a.length; ++u)
        if (l.a == a[u].id) {
          l.a = a[u].name || l.a;
          break;
        }
    }
    s.c.push(l);
  });
}
function gv(e, r) {
  if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
  var t = [], a = [], n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
  n && n[1] && n[1].split(/<\/\w*:?author>/).forEach(function(i) {
    if (!(i === "" || i.trim() === "")) {
      var c = i.match(/<(?:\w+:)?author[^>]*>(.*)/);
      c && t.push(c[1]);
    }
  });
  var s = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
  return s && s[1] && s[1].split(/<\/\w*:?comment>/).forEach(function(i) {
    if (!(i === "" || i.trim() === "")) {
      var c = i.match(/<(?:\w+:)?comment[^>]*>/);
      if (c) {
        var o = me(c[0]), f = { author: o.authorId && t[o.authorId] || "sheetjsghost", ref: o.ref, guid: o.guid }, l = Cr(o.ref);
        if (!(r.sheetRows && r.sheetRows <= l.r)) {
          var u = i.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/), p = !!u && !!u[1] && A0(u[1]) || { r: "", t: "", h: "" };
          f.r = p.r, p.r == "<t></t>" && (p.t = p.h = ""), f.t = (p.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), r.cellHTML && (f.h = p.h), a.push(f);
        }
      }
    }
  }), a;
}
function _v(e, r) {
  var t = [], a = !1, n = {}, s = 0;
  return e.replace(kr, function(c, o) {
    var f = me(c);
    switch (Et(f[0])) {
      case "<?xml":
        break;
      case "<ThreadedComments":
        break;
      case "</ThreadedComments>":
        break;
      case "<threadedComment":
        n = { author: f.personId, guid: f.id, ref: f.ref, T: 1 };
        break;
      case "</threadedComment>":
        n.t != null && t.push(n);
        break;
      case "<text>":
      case "<text":
        s = o + c.length;
        break;
      case "</text>":
        n.t = e.slice(s, o).replace(/\r\n/g, `
`).replace(/\r/g, `
`);
        break;
      case "<mentions":
      case "<mentions>":
        a = !0;
        break;
      case "</mentions>":
        a = !1;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (!a && r.WTF) throw new Error("unrecognized " + f[0] + " in threaded comments");
    }
    return c;
  }), t;
}
function Ev(e, r) {
  var t = [], a = !1;
  return e.replace(kr, function(s) {
    var i = me(s);
    switch (Et(i[0])) {
      case "<?xml":
        break;
      case "<personList":
        break;
      case "</personList>":
        break;
      case "<person":
        t.push({ name: i.displayname, id: i.id });
        break;
      case "</person>":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (!a && r.WTF) throw new Error("unrecognized " + i[0] + " in threaded comments");
    }
    return s;
  }), t;
}
function yv(e) {
  var r = {};
  r.iauthor = e.read_shift(4);
  var t = ka(e);
  return r.rfx = t.s, r.ref = ge(t.s), e.l += 16, r;
}
var wv = wr;
function Tv(e, r) {
  var t = [], a = [], n = {}, s = !1;
  return Mt(e, function(c, o, f) {
    switch (f) {
      case 632:
        a.push(c);
        break;
      case 635:
        n = c;
        break;
      case 637:
        n.t = c.t, n.h = c.h, n.r = c.r;
        break;
      case 636:
        if (n.author = a[n.iauthor], delete n.iauthor, r.sheetRows && n.rfx && r.sheetRows <= n.rfx.r) break;
        n.t || (n.t = ""), delete n.rfx, t.push(n);
        break;
      case 3072:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!o.T) {
          if (!s || r.WTF) throw new Error("Unexpected record 0x" + f.toString(16));
        }
    }
  }), t;
}
var kv = "application/vnd.ms-office.vbaProject";
function Sv(e) {
  var r = Ce.utils.cfb_new({ root: "R" });
  return e.FullPaths.forEach(function(t, a) {
    if (!(t.slice(-1) === "/" || !t.match(/_VBA_PROJECT_CUR/))) {
      var n = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      Ce.utils.cfb_add(r, n, e.FileIndex[a].content);
    }
  }), Ce.write(r);
}
function Av() {
  return { "!type": "dialog" };
}
function $v() {
  return { "!type": "dialog" };
}
function Fv() {
  return { "!type": "macro" };
}
function Cv() {
  return { "!type": "macro" };
}
var Ba = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, r = { r: 0, c: 0 };
  function t(a, n, s, i) {
    var c = !1, o = !1;
    s.length == 0 ? o = !0 : s.charAt(0) == "[" && (o = !0, s = s.slice(1, -1)), i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1));
    var f = s.length > 0 ? parseInt(s, 10) | 0 : 0, l = i.length > 0 ? parseInt(i, 10) | 0 : 0;
    return c ? l += r.c : --l, o ? f += r.r : --f, n + (c ? "" : "$") + rr(l) + (o ? "" : "$") + ur(f);
  }
  return function(n, s) {
    return r = s, n.replace(e, t);
  };
}(), ku = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Rv = /* @__PURE__ */ function() {
  return function(r, t) {
    return r.replace(ku, function(a, n, s, i, c, o) {
      var f = E0(i) - (s ? 0 : t.c), l = _0(o) - (c ? 0 : t.r), u = l == 0 ? "" : c ? l + 1 : "[" + l + "]", p = f == 0 ? "" : s ? f + 1 : "[" + f + "]";
      return n + "R" + u + "C" + p;
    });
  };
}();
function Su(e, r) {
  return e.replace(ku, function(t, a, n, s, i, c) {
    return a + (n == "$" ? n + s : rr(E0(s) + r.c)) + (i == "$" ? i + c : ur(_0(c) + r.r));
  });
}
function Ov(e, r, t) {
  var a = Ka(r), n = a.s, s = Cr(t), i = { r: s.r - n.r, c: s.c - n.c };
  return Su(e, i);
}
function Iv(e) {
  return e.length != 1;
}
function Uo(e) {
  return e.replace(/_xlfn\./g, "");
}
function Ke(e) {
  e.l += 1;
}
function ta(e, r) {
  var t = e.read_shift(2);
  return [t & 16383, t >> 14 & 1, t >> 15 & 1];
}
function Au(e, r, t) {
  var a = 2;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return $u(e);
    t.biff == 12 && (a = 4);
  }
  var n = e.read_shift(a), s = e.read_shift(a), i = ta(e), c = ta(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: s, c: c[0], cRel: c[1], rRel: c[2] } };
}
function $u(e) {
  var r = ta(e), t = ta(e), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { r: r[0], c: a, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: n, cRel: t[1], rRel: t[2] } };
}
function Pv(e, r, t) {
  if (t.biff < 8) return $u(e);
  var a = e.read_shift(t.biff == 12 ? 4 : 2), n = e.read_shift(t.biff == 12 ? 4 : 2), s = ta(e), i = ta(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: n, c: i[0], cRel: i[1], rRel: i[2] } };
}
function Fu(e, r, t) {
  if (t && t.biff >= 2 && t.biff <= 5) return Nv(e);
  var a = e.read_shift(t && t.biff == 12 ? 4 : 2), n = ta(e);
  return { r: a, c: n[0], cRel: n[1], rRel: n[2] };
}
function Nv(e) {
  var r = ta(e), t = e.read_shift(1);
  return { r: r[0], c: t, cRel: r[1], rRel: r[2] };
}
function bv(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return { r, c: t & 255, fQuoted: !!(t & 16384), cRel: t >> 15, rRel: t >> 15 };
}
function Dv(e, r, t) {
  var a = t && t.biff ? t.biff : 8;
  if (a >= 2 && a <= 5) return Lv(e);
  var n = e.read_shift(a >= 12 ? 4 : 2), s = e.read_shift(2), i = (s & 16384) >> 14, c = (s & 32768) >> 15;
  if (s &= 16383, c == 1) for (; n > 524287; ) n -= 1048576;
  if (i == 1) for (; s > 8191; ) s = s - 16384;
  return { r: n, c: s, cRel: i, rRel: c };
}
function Lv(e) {
  var r = e.read_shift(2), t = e.read_shift(1), a = (r & 32768) >> 15, n = (r & 16384) >> 14;
  return r &= 16383, a == 1 && r >= 8192 && (r = r - 16384), n == 1 && t >= 128 && (t = t - 256), { r, c: t, cRel: n, rRel: a };
}
function Mv(e, r, t) {
  var a = (e[e.l++] & 96) >> 5, n = Au(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
  return [a, n];
}
function Bv(e, r, t) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2, "i"), s = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, s = 6;
      break;
    case 12:
      s = 12;
      break;
  }
  var i = Au(e, s, t);
  return [a, n, i];
}
function Uv(e, r, t) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8, [a];
}
function jv(e, r, t) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2), s = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, s = 6;
      break;
    case 12:
      s = 12;
      break;
  }
  return e.l += s, [a, n];
}
function Vv(e, r, t) {
  var a = (e[e.l++] & 96) >> 5, n = Pv(e, r - 1, t);
  return [a, n];
}
function Hv(e, r, t) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7, [a];
}
function jo(e) {
  var r = e[e.l + 1] & 1, t = 1;
  return e.l += 4, [r, t];
}
function Gv(e, r, t) {
  e.l += 2;
  for (var a = e.read_shift(t && t.biff == 2 ? 1 : 2), n = [], s = 0; s <= a; ++s) n.push(e.read_shift(t && t.biff == 2 ? 1 : 2));
  return n;
}
function zv(e, r, t) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function Wv(e, r, t) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function Xv(e) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(2)];
}
function Kv(e, r, t) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += t && t.biff == 2 ? 3 : 4, [a];
}
function Cu(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return [r, t];
}
function qv(e) {
  return e.read_shift(2), Cu(e);
}
function Yv(e) {
  return e.read_shift(2), Cu(e);
}
function Jv(e, r, t) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = Fu(e, 0, t);
  return [a, n];
}
function Zv(e, r, t) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = Dv(e, 0, t);
  return [a, n];
}
function Qv(e, r, t) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(2);
  t && t.biff == 5 && (e.l += 12);
  var s = Fu(e, 0, t);
  return [a, n, s];
}
function eg(e, r, t) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(t && t.biff <= 3 ? 1 : 2);
  return [r_[n], Iu[n], a];
}
function rg(e, r, t) {
  var a = e[e.l++], n = e.read_shift(1), s = t && t.biff <= 3 ? [a == 88 ? -1 : 0, e.read_shift(1)] : tg(e);
  return [n, (s[0] === 0 ? Iu : e_)[s[1]]];
}
function tg(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function ag(e, r, t) {
  e.l += t && t.biff == 2 ? 3 : 4;
}
function ng(e, r, t) {
  if (e.l++, t && t.biff == 12) return [e.read_shift(4, "i"), 0];
  var a = e.read_shift(2), n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [a, n];
}
function sg(e) {
  return e.l++, Sa[e.read_shift(1)];
}
function ig(e) {
  return e.l++, e.read_shift(2);
}
function cg(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function og(e) {
  return e.l++, Er(e);
}
function fg(e, r, t) {
  return e.l++, Hn(e, r - 1, t);
}
function lg(e, r) {
  var t = [e.read_shift(1)];
  if (r == 12) switch (t[0]) {
    case 2:
      t[0] = 4;
      break;
    case 4:
      t[0] = 16;
      break;
    case 0:
      t[0] = 1;
      break;
    case 1:
      t[0] = 2;
      break;
  }
  switch (t[0]) {
    case 4:
      t[1] = We(e, 1) ? "TRUE" : "FALSE", r != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      t[1] = Sa[e[e.l]], e.l += r == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      t[1] = Er(e);
      break;
    case 2:
      t[1] = Aa(e, 0, { biff: r > 0 && r < 8 ? 2 : r });
      break;
    default:
      throw new Error("Bad SerAr: " + t[0]);
  }
  return t;
}
function ug(e, r, t) {
  for (var a = e.read_shift(t.biff == 12 ? 4 : 2), n = [], s = 0; s != a; ++s) n.push((t.biff == 12 ? ka : Gs)(e));
  return n;
}
function hg(e, r, t) {
  var a = 0, n = 0;
  t.biff == 12 ? (a = e.read_shift(4), n = e.read_shift(4)) : (n = 1 + e.read_shift(1), a = 1 + e.read_shift(2)), t.biff >= 2 && t.biff < 8 && (--a, --n == 0 && (n = 256));
  for (var s = 0, i = []; s != a && (i[s] = []); ++s)
    for (var c = 0; c != n; ++c) i[s][c] = lg(e, t.biff);
  return i;
}
function dg(e, r, t) {
  var a = e.read_shift(1) >>> 5 & 3, n = !t || t.biff >= 8 ? 4 : 2, s = e.read_shift(n);
  switch (t.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [a, 0, s];
}
function pg(e, r, t) {
  if (t.biff == 5) return mg(e);
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2), s = e.read_shift(4);
  return [a, n, s];
}
function mg(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2, "i");
  e.l += 8;
  var a = e.read_shift(2);
  return e.l += 12, [r, t, a];
}
function xg(e, r, t) {
  var a = e.read_shift(1) >>> 5 & 3;
  e.l += t && t.biff == 2 ? 3 : 4;
  var n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [a, n];
}
function vg(e, r, t) {
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [a, n];
}
function gg(e, r, t) {
  var a = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, t.biff < 8 && e.l--, t.biff == 12 && (e.l += 2), [a];
}
function _g(e, r, t) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2), s = 4;
  if (t) switch (t.biff) {
    case 5:
      s = 15;
      break;
    case 12:
      s = 6;
      break;
  }
  return e.l += s, [a, n];
}
var Eg = Tr, yg = Tr, wg = Tr;
function zn(e, r, t) {
  return e.l += 2, [bv(e)];
}
function F0(e) {
  return e.l += 6, [];
}
var Tg = zn, kg = F0, Sg = F0, Ag = zn;
function Ru(e) {
  return e.l += 2, [Ye(e), e.read_shift(2) & 1];
}
var $g = zn, Fg = Ru, Cg = F0, Rg = zn, Og = zn, Ig = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function Pg(e) {
  e.l += 2;
  var r = e.read_shift(2), t = e.read_shift(2), a = e.read_shift(4), n = e.read_shift(2), s = e.read_shift(2), i = Ig[t >> 2 & 31];
  return { ixti: r, coltype: t & 3, rt: i, idx: a, c: n, C: s };
}
function Ng(e) {
  return e.l += 2, [e.read_shift(4)];
}
function bg(e, r, t) {
  return e.l += 5, e.l += 2, e.l += t.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Dg(e, r, t) {
  return e.l += t.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Lg(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function Mg(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function Bg(e) {
  return e.l += 4, [0, 0];
}
var Vo = {
  /*::[*/
  1: { n: "PtgExp", f: ng },
  /*::[*/
  2: { n: "PtgTbl", f: wg },
  /*::[*/
  3: { n: "PtgAdd", f: Ke },
  /*::[*/
  4: { n: "PtgSub", f: Ke },
  /*::[*/
  5: { n: "PtgMul", f: Ke },
  /*::[*/
  6: { n: "PtgDiv", f: Ke },
  /*::[*/
  7: { n: "PtgPower", f: Ke },
  /*::[*/
  8: { n: "PtgConcat", f: Ke },
  /*::[*/
  9: { n: "PtgLt", f: Ke },
  /*::[*/
  10: { n: "PtgLe", f: Ke },
  /*::[*/
  11: { n: "PtgEq", f: Ke },
  /*::[*/
  12: { n: "PtgGe", f: Ke },
  /*::[*/
  13: { n: "PtgGt", f: Ke },
  /*::[*/
  14: { n: "PtgNe", f: Ke },
  /*::[*/
  15: { n: "PtgIsect", f: Ke },
  /*::[*/
  16: { n: "PtgUnion", f: Ke },
  /*::[*/
  17: { n: "PtgRange", f: Ke },
  /*::[*/
  18: { n: "PtgUplus", f: Ke },
  /*::[*/
  19: { n: "PtgUminus", f: Ke },
  /*::[*/
  20: { n: "PtgPercent", f: Ke },
  /*::[*/
  21: { n: "PtgParen", f: Ke },
  /*::[*/
  22: { n: "PtgMissArg", f: Ke },
  /*::[*/
  23: { n: "PtgStr", f: fg },
  /*::[*/
  26: { n: "PtgSheet", f: bg },
  /*::[*/
  27: { n: "PtgEndSheet", f: Dg },
  /*::[*/
  28: { n: "PtgErr", f: sg },
  /*::[*/
  29: { n: "PtgBool", f: cg },
  /*::[*/
  30: { n: "PtgInt", f: ig },
  /*::[*/
  31: { n: "PtgNum", f: og },
  /*::[*/
  32: { n: "PtgArray", f: Hv },
  /*::[*/
  33: { n: "PtgFunc", f: eg },
  /*::[*/
  34: { n: "PtgFuncVar", f: rg },
  /*::[*/
  35: { n: "PtgName", f: dg },
  /*::[*/
  36: { n: "PtgRef", f: Jv },
  /*::[*/
  37: { n: "PtgArea", f: Mv },
  /*::[*/
  38: { n: "PtgMemArea", f: xg },
  /*::[*/
  39: { n: "PtgMemErr", f: Eg },
  /*::[*/
  40: { n: "PtgMemNoMem", f: yg },
  /*::[*/
  41: { n: "PtgMemFunc", f: vg },
  /*::[*/
  42: { n: "PtgRefErr", f: gg },
  /*::[*/
  43: { n: "PtgAreaErr", f: Uv },
  /*::[*/
  44: { n: "PtgRefN", f: Zv },
  /*::[*/
  45: { n: "PtgAreaN", f: Vv },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Lg },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Mg },
  /*::[*/
  57: { n: "PtgNameX", f: pg },
  /*::[*/
  58: { n: "PtgRef3d", f: Qv },
  /*::[*/
  59: { n: "PtgArea3d", f: Bv },
  /*::[*/
  60: { n: "PtgRefErr3d", f: _g },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: jv },
  /*::[*/
  255: {}
}, Ug = {
  /*::[*/
  64: 32,
  /*::[*/
  96: 32,
  /*::[*/
  65: 33,
  /*::[*/
  97: 33,
  /*::[*/
  66: 34,
  /*::[*/
  98: 34,
  /*::[*/
  67: 35,
  /*::[*/
  99: 35,
  /*::[*/
  68: 36,
  /*::[*/
  100: 36,
  /*::[*/
  69: 37,
  /*::[*/
  101: 37,
  /*::[*/
  70: 38,
  /*::[*/
  102: 38,
  /*::[*/
  71: 39,
  /*::[*/
  103: 39,
  /*::[*/
  72: 40,
  /*::[*/
  104: 40,
  /*::[*/
  73: 41,
  /*::[*/
  105: 41,
  /*::[*/
  74: 42,
  /*::[*/
  106: 42,
  /*::[*/
  75: 43,
  /*::[*/
  107: 43,
  /*::[*/
  76: 44,
  /*::[*/
  108: 44,
  /*::[*/
  77: 45,
  /*::[*/
  109: 45,
  /*::[*/
  78: 46,
  /*::[*/
  110: 46,
  /*::[*/
  79: 47,
  /*::[*/
  111: 47,
  /*::[*/
  88: 34,
  /*::[*/
  120: 34,
  /*::[*/
  89: 57,
  /*::[*/
  121: 57,
  /*::[*/
  90: 58,
  /*::[*/
  122: 58,
  /*::[*/
  91: 59,
  /*::[*/
  123: 59,
  /*::[*/
  92: 60,
  /*::[*/
  124: 60,
  /*::[*/
  93: 61,
  /*::[*/
  125: 61
}, jg = {
  /*::[*/
  1: { n: "PtgElfLel", f: Ru },
  /*::[*/
  2: { n: "PtgElfRw", f: Rg },
  /*::[*/
  3: { n: "PtgElfCol", f: Tg },
  /*::[*/
  6: { n: "PtgElfRwV", f: Og },
  /*::[*/
  7: { n: "PtgElfColV", f: Ag },
  /*::[*/
  10: { n: "PtgElfRadical", f: $g },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Cg },
  /*::[*/
  13: { n: "PtgElfColS", f: kg },
  /*::[*/
  15: { n: "PtgElfColSV", f: Sg },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Fg },
  /*::[*/
  25: { n: "PtgList", f: Pg },
  /*::[*/
  29: { n: "PtgSxName", f: Ng },
  /*::[*/
  255: {}
}, Vg = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Bg },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Kv },
  /*::[*/
  2: { n: "PtgAttrIf", f: Wv },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Gv },
  /*::[*/
  8: { n: "PtgAttrGoto", f: zv },
  /*::[*/
  16: { n: "PtgAttrSum", f: ag },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: jo },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: jo },
  /*::[*/
  64: { n: "PtgAttrSpace", f: qv },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: Yv },
  /*::[*/
  128: { n: "PtgAttrIfError", f: Xv },
  /*::[*/
  255: {}
};
function Wn(e, r, t, a) {
  if (a.biff < 8) return Tr(e, r);
  for (var n = e.l + r, s = [], i = 0; i !== t.length; ++i)
    switch (t[i][0]) {
      case "PtgArray":
        t[i][1] = hg(e, 0, a), s.push(t[i][1]);
        break;
      case "PtgMemArea":
        t[i][2] = ug(e, t[i][1], a), s.push(t[i][2]);
        break;
      case "PtgExp":
        a && a.biff == 12 && (t[i][1][1] = e.read_shift(4), s.push(t[i][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + t[i][0];
    }
  return r = n - e.l, r !== 0 && s.push(Tr(e, r)), s;
}
function Xn(e, r, t) {
  for (var a = e.l + r, n, s, i = []; a != e.l; )
    r = a - e.l, s = e[e.l], n = Vo[s] || Vo[Ug[s]], (s === 24 || s === 25) && (n = (s === 24 ? jg : Vg)[e[e.l + 1]]), !n || !n.f ? Tr(e, r) : i.push([n.n, n.f(e, r, t)]);
  return i;
}
function Hg(e) {
  for (var r = [], t = 0; t < e.length; ++t) {
    for (var a = e[t], n = [], s = 0; s < a.length; ++s) {
      var i = a[s];
      if (i) switch (i[0]) {
        case 2:
          n.push('"' + i[1].replace(/"/g, '""') + '"');
          break;
        default:
          n.push(i[1]);
      }
      else n.push("");
    }
    r.push(n.join(","));
  }
  return r.join(";");
}
var Gg = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function zg(e, r) {
  if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Ou(e, r, t) {
  if (!e) return "SH33TJSERR0";
  if (t.biff > 8 && (!e.XTI || !e.XTI[r])) return e.SheetNames[r];
  if (!e.XTI) return "SH33TJSERR6";
  var a = e.XTI[r];
  if (t.biff < 8)
    return r > 1e4 && (r -= 65536), r < 0 && (r = -r), r == 0 ? "" : e.XTI[r - 1];
  if (!a) return "SH33TJSERR1";
  var n = "";
  if (t.biff > 8) switch (e[a[0]][0]) {
    case 357:
      return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]], a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
    case 358:
      return t.SID != null ? e.SheetNames[t.SID] : "SH33TJSSAME" + e[a[0]][0];
    case 355:
    default:
      return "SH33TJSSRC" + e[a[0]][0];
  }
  switch (e[a[0]][0][0]) {
    case 1025:
      return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3", a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
    case 14849:
      return e[a[0]].slice(1).map(function(s) {
        return s.Name;
      }).join(";;");
    default:
      return e[a[0]][0][3] ? (n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4", a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]]) : "SH33TJSERR2";
  }
}
function Ho(e, r, t) {
  var a = Ou(e, r, t);
  return a == "#REF" ? a : zg(a, t);
}
function _r(e, r, t, a, n) {
  var s = n && n.biff || 8, i = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }
  ), c = [], o, f, l, u = 0, p = 0, h, d = "";
  if (!e[0] || !e[0][0]) return "";
  for (var m = -1, x = "", g = 0, T = e[0].length; g < T; ++g) {
    var E = e[0][g];
    switch (E[0]) {
      case "PtgUminus":
        c.push("-" + c.pop());
        break;
      case "PtgUplus":
        c.push("+" + c.pop());
        break;
      case "PtgPercent":
        c.push(c.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (o = c.pop(), f = c.pop(), m >= 0) {
          switch (e[0][m][1][0]) {
            case 0:
              x = He(" ", e[0][m][1][1]);
              break;
            case 1:
              x = He("\r", e[0][m][1][1]);
              break;
            default:
              if (x = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][m][1][0]);
          }
          f = f + x, m = -1;
        }
        c.push(f + Gg[E[0]] + o);
        break;
      case "PtgIsect":
        o = c.pop(), f = c.pop(), c.push(f + " " + o);
        break;
      case "PtgUnion":
        o = c.pop(), f = c.pop(), c.push(f + "," + o);
        break;
      case "PtgRange":
        o = c.pop(), f = c.pop(), c.push(f + ":" + o);
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        l = En(E[1][1], i, n), c.push(yn(l, s));
        break;
      case "PtgRefN":
        l = t ? En(E[1][1], t, n) : E[1][1], c.push(yn(l, s));
        break;
      case "PtgRef3d":
        u = /*::Number(*/
        E[1][1], l = En(E[1][2], i, n), d = Ho(a, u, n), c.push(d + "!" + yn(l, s));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var I = E[1][0], D = E[1][1];
        I || (I = 0), I &= 127;
        var L = I == 0 ? [] : c.slice(-I);
        c.length -= I, D === "User" && (D = L.shift()), c.push(D + "(" + L.join(",") + ")");
        break;
      case "PtgBool":
        c.push(E[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        c.push(
          /*::String(*/
          E[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        c.push(String(E[1]));
        break;
      case "PtgStr":
        c.push('"' + E[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        c.push(
          /*::String(*/
          E[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        h = To(E[1][1], t ? { s: t } : i, n), c.push(mi(h, n));
        break;
      case "PtgArea":
        h = To(E[1][1], i, n), c.push(mi(h, n));
        break;
      case "PtgArea3d":
        u = /*::Number(*/
        E[1][1], h = E[1][2], d = Ho(a, u, n), c.push(d + "!" + mi(h, n));
        break;
      case "PtgAttrSum":
        c.push("SUM(" + c.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        p = E[1][2];
        var C = (a.names || [])[p - 1] || (a[0] || [])[p], z = C ? C.Name : "SH33TJSNAME" + String(p);
        z && z.slice(0, 6) == "_xlfn." && !n.xlfn && (z = z.slice(6)), c.push(z);
        break;
      case "PtgNameX":
        var U = E[1][1];
        p = E[1][2];
        var J;
        if (n.biff <= 5)
          U < 0 && (U = -U), a[U] && (J = a[U][p]);
        else {
          var j = "";
          if (((a[U] || [])[0] || [])[0] == 14849 || (((a[U] || [])[0] || [])[0] == 1025 ? a[U][p] && a[U][p].itab > 0 && (j = a.SheetNames[a[U][p].itab - 1] + "!") : j = a.SheetNames[p - 1] + "!"), a[U] && a[U][p]) j += a[U][p].Name;
          else if (a[0] && a[0][p]) j += a[0][p].Name;
          else {
            var M = (Ou(a, U, n) || "").split(";;");
            M[p - 1] ? j = M[p - 1] : j += "SH33TJSERRX";
          }
          c.push(j);
          break;
        }
        J || (J = { Name: "SH33TJSERRY" }), c.push(J.Name);
        break;
      case "PtgParen":
        var ae = "(", G = ")";
        if (m >= 0) {
          switch (x = "", e[0][m][1][0]) {
            case 2:
              ae = He(" ", e[0][m][1][1]) + ae;
              break;
            case 3:
              ae = He("\r", e[0][m][1][1]) + ae;
              break;
            case 4:
              G = He(" ", e[0][m][1][1]) + G;
              break;
            case 5:
              G = He("\r", e[0][m][1][1]) + G;
              break;
            default:
              if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][m][1][0]);
          }
          m = -1;
        }
        c.push(ae + c.pop() + G);
        break;
      case "PtgRefErr":
        c.push("#REF!");
        break;
      case "PtgRefErr3d":
        c.push("#REF!");
        break;
      case "PtgExp":
        l = { c: E[1][1], r: E[1][0] };
        var V = { c: t.c, r: t.r };
        if (a.sharedf[ge(l)]) {
          var te = a.sharedf[ge(l)];
          c.push(_r(te, i, V, a, n));
        } else {
          var Z = !1;
          for (o = 0; o != a.arrayf.length; ++o)
            if (f = a.arrayf[o], !(l.c < f[0].s.c || l.c > f[0].e.c) && !(l.r < f[0].s.r || l.r > f[0].e.r)) {
              c.push(_r(f[1], i, V, a, n)), Z = !0;
              break;
            }
          Z || c.push(
            /*::String(*/
            E[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        c.push("{" + Hg(
          /*::(*/
          E[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        m = g;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        c.push("");
        break;
      case "PtgAreaErr":
        c.push("#REF!");
        break;
      case "PtgAreaErr3d":
        c.push("#REF!");
        break;
      case "PtgList":
        c.push("Table" + E[1].idx + "[#" + E[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(E));
      default:
        throw new Error("Unrecognized Formula Token: " + String(E));
    }
    var ce = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (n.biff != 3 && m >= 0 && ce.indexOf(e[0][g][0]) == -1) {
      E = e[0][m];
      var B = !0;
      switch (E[1][0]) {
        case 4:
          B = !1;
        case 0:
          x = He(" ", E[1][1]);
          break;
        case 5:
          B = !1;
        case 1:
          x = He("\r", E[1][1]);
          break;
        default:
          if (x = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + E[1][0]);
      }
      c.push((B ? x : "") + c.pop() + (B ? "" : x)), m = -1;
    }
  }
  if (c.length > 1 && n.WTF) throw new Error("bad formula stack");
  return c[0];
}
function Wg(e, r, t) {
  var a = e.l + r, n = t.biff == 2 ? 1 : 2, s, i = e.read_shift(n);
  if (i == 65535) return [[], Tr(e, r - 2)];
  var c = Xn(e, i, t);
  return r !== i + n && (s = Wn(e, r - i - n, c, t)), e.l = a, [c, s];
}
function Xg(e, r, t) {
  var a = e.l + r, n = t.biff == 2 ? 1 : 2, s, i = e.read_shift(n);
  if (i == 65535) return [[], Tr(e, r - 2)];
  var c = Xn(e, i, t);
  return r !== i + n && (s = Wn(e, r - i - n, c, t)), e.l = a, [c, s];
}
function Kg(e, r, t, a) {
  var n = e.l + r, s = Xn(e, a, t), i;
  return n !== e.l && (i = Wn(e, n - e.l, s, t)), [s, i];
}
function qg(e, r, t) {
  var a = e.l + r, n, s = e.read_shift(2), i = Xn(e, s, t);
  return s == 65535 ? [[], Tr(e, r - 2)] : (r !== s + 2 && (n = Wn(e, a - s - 2, i, t)), [i, n]);
}
function Yg(e) {
  var r;
  if (Rt(e, e.l + 6) !== 65535) return [Er(e), "n"];
  switch (e[e.l]) {
    case 0:
      return e.l += 8, ["String", "s"];
    case 1:
      return r = e[e.l + 2] === 1, e.l += 8, [r, "b"];
    case 2:
      return r = e[e.l + 2], e.l += 8, [r, "e"];
    case 3:
      return e.l += 8, ["", "s"];
  }
  return [];
}
function gi(e, r, t) {
  var a = e.l + r, n = yt(e);
  t.biff == 2 && ++e.l;
  var s = Yg(e), i = e.read_shift(1);
  t.biff != 2 && (e.read_shift(1), t.biff >= 5 && e.read_shift(4));
  var c = Xg(e, a - e.l, t);
  return { cell: n, val: s[0], formula: c, shared: i >> 3 & 1, tt: s[1] };
}
function zs(e, r, t) {
  var a = e.read_shift(4), n = Xn(e, a, t), s = e.read_shift(4), i = s > 0 ? Wn(e, s, n, t) : null;
  return [n, i];
}
var Jg = zs, Ws = zs, Zg = zs, Qg = zs, e_ = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, Iu = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, r_ = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function Go(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(r, t) {
    return t.replace(/\./g, "");
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function _i(e) {
  var r = e.split(":"), t = r[0].split(".")[0];
  return [t, r[0].split(".")[1] + (r.length > 1 ? ":" + (r[1].split(".")[1] || r[1].split(".")[0]) : "")];
}
var Sn = {}, Ua = {};
function An(e, r) {
  if (e) {
    var t = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    r == "xlml" && (t = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = t[0]), e.right == null && (e.right = t[1]), e.top == null && (e.top = t[2]), e.bottom == null && (e.bottom = t[3]), e.header == null && (e.header = t[4]), e.footer == null && (e.footer = t[5]);
  }
}
function Pu(e, r, t, a, n, s) {
  try {
    a.cellNF && (e.z = Ee[r]);
  } catch (c) {
    if (a.WTF) throw c;
  }
  if (!(e.t === "z" && !a.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = sr(e.v)), (!a || a.cellText !== !1) && e.t !== "z") try {
      if (Ee[r] == null && da(t1[r] || "General", r), e.t === "e") e.w = e.w || Sa[e.v];
      else if (r === 0)
        if (e.t === "n")
          (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Pn(e.v);
        else if (e.t === "d") {
          var i = Or(e.v);
          (i | 0) === i ? e.w = i.toString(10) : e.w = Pn(i);
        } else {
          if (e.v === void 0) return "";
          e.w = ma(e.v, Ua);
        }
      else e.t === "d" ? e.w = Qr(r, Or(e.v), Ua) : e.w = Qr(r, e.v, Ua);
    } catch (c) {
      if (a.WTF) throw c;
    }
    if (a.cellStyles && t != null)
      try {
        e.s = s.Fills[t], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = Is(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), a.WTF && (e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = Is(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), a.WTF && (e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb));
      } catch (c) {
        if (a.WTF && s.Fills) throw c;
      }
  }
}
function t_(e, r) {
  var t = Ge(r);
  t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0 && (e["!ref"] = Re(t));
}
var a_ = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g, n_ = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/, s_ = /<(?:\w:)?hyperlink [^>]*>/mg, i_ = /"(\w*:\w*)"/, c_ = /<(?:\w:)?col\b[^>]*[\/]?>/g, o_ = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g, f_ = /<(?:\w:)?pageMargins[^>]*\/>/g, Nu = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/, l_ = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/, u_ = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;
function h_(e, r, t, a, n, s, i) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var c = r.dense ? [] : {}, o = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, f = "", l = "", u = e.match(n_);
  u ? (f = e.slice(0, u.index), l = e.slice(u.index + u[0].length)) : f = l = e;
  var p = f.match(Nu);
  p ? C0(p[0], c, n, t) : (p = f.match(l_)) && d_(p[0], p[1] || "", c, n, t);
  var h = (f.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
  if (h > 0) {
    var d = f.slice(h, h + 50).match(i_);
    d && t_(c, d[1]);
  }
  var m = f.match(u_);
  m && m[1] && __(m[1], n);
  var x = [];
  if (r.cellStyles) {
    var g = f.match(c_);
    g && x_(x, g);
  }
  u && E_(u[1], c, r, o, s, i);
  var T = l.match(o_);
  T && (c["!autofilter"] = v_(T[0]));
  var E = [], I = l.match(a_);
  if (I) for (h = 0; h != I.length; ++h)
    E[h] = Ge(I[h].slice(I[h].indexOf('"') + 1));
  var D = l.match(s_);
  D && p_(c, D, a);
  var L = l.match(f_);
  if (L && (c["!margins"] = m_(me(L[0]))), !c["!ref"] && o.e.c >= o.s.c && o.e.r >= o.s.r && (c["!ref"] = Re(o)), r.sheetRows > 0 && c["!ref"]) {
    var C = Ge(c["!ref"]);
    r.sheetRows <= +C.e.r && (C.e.r = r.sheetRows - 1, C.e.r > o.e.r && (C.e.r = o.e.r), C.e.r < C.s.r && (C.s.r = C.e.r), C.e.c > o.e.c && (C.e.c = o.e.c), C.e.c < C.s.c && (C.s.c = C.e.c), c["!fullref"] = c["!ref"], c["!ref"] = Re(C));
  }
  return x.length > 0 && (c["!cols"] = x), E.length > 0 && (c["!merges"] = E), c;
}
function C0(e, r, t, a) {
  var n = me(e);
  t.Sheets[a] || (t.Sheets[a] = {}), n.codeName && (t.Sheets[a].CodeName = Oe(Ne(n.codeName)));
}
function d_(e, r, t, a, n) {
  C0(e.slice(0, e.indexOf(">")), t, a, n);
}
function p_(e, r, t) {
  for (var a = Array.isArray(e), n = 0; n != r.length; ++n) {
    var s = me(Ne(r[n]), !0);
    if (!s.ref) return;
    var i = ((t || {})["!id"] || [])[s.id];
    i ? (s.Target = i.Target, s.location && (s.Target += "#" + Oe(s.location))) : (s.Target = "#" + Oe(s.location), i = { Target: s.Target, TargetMode: "Internal" }), s.Rel = i, s.tooltip && (s.Tooltip = s.tooltip, delete s.tooltip);
    for (var c = Ge(s.ref), o = c.s.r; o <= c.e.r; ++o) for (var f = c.s.c; f <= c.e.c; ++f) {
      var l = ge({ c: f, r: o });
      a ? (e[o] || (e[o] = []), e[o][f] || (e[o][f] = { t: "z", v: void 0 }), e[o][f].l = s) : (e[l] || (e[l] = { t: "z", v: void 0 }), e[l].l = s);
    }
  }
}
function m_(e) {
  var r = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(t) {
    e[t] && (r[t] = parseFloat(e[t]));
  }), r;
}
function x_(e, r) {
  for (var t = !1, a = 0; a != r.length; ++a) {
    var n = me(r[a], !0);
    n.hidden && (n.hidden = Ue(n.hidden));
    var s = parseInt(n.min, 10) - 1, i = parseInt(n.max, 10) - 1;
    for (n.outlineLevel && (n.level = +n.outlineLevel || 0), delete n.min, delete n.max, n.width = +n.width, !t && n.width && (t = !0, $0(n.width)), za(n); s <= i; ) e[s++] = lr(n);
  }
}
function v_(e) {
  var r = { ref: (e.match(/ref="([^"]*)"/) || [])[1] };
  return r;
}
var g_ = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;
function __(e, r) {
  r.Views || (r.Views = [{}]), (e.match(g_) || []).forEach(function(t, a) {
    var n = me(t);
    r.Views[a] || (r.Views[a] = {}), +n.zoomScale && (r.Views[a].zoom = +n.zoomScale), Ue(n.rightToLeft) && (r.Views[a].RTL = !0);
  });
}
var E_ = /* @__PURE__ */ function() {
  var e = /<(?:\w+:)?c[ \/>]/, r = /<\/(?:\w+:)?row>/, t = /r=["']([^"']*)["']/, a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/, n = /ref=["']([^"']*)["']/, s = Nn("v"), i = Nn("f");
  return function(o, f, l, u, p, h) {
    for (var d = 0, m = "", x = [], g = [], T = 0, E = 0, I = 0, D = "", L, C, z = 0, U = 0, J, j, M = 0, ae = 0, G = Array.isArray(h.CellXf), V, te = [], Z = [], ce = Array.isArray(f), B = [], H = {}, b = !1, y = !!l.sheetStubs, k = o.split(r), v = 0, _ = k.length; v != _; ++v) {
      m = k[v].trim();
      var N = m.length;
      if (N !== 0) {
        var Y = 0;
        e: for (d = 0; d < N; ++d) switch (
          /*x.charCodeAt(ri)*/
          m[d]
        ) {
          case ">":
            if (
              /*x.charCodeAt(ri-1) != 47*/
              m[d - 1] != "/"
            ) {
              ++d;
              break e;
            }
            if (l && l.cellStyles) {
              if (C = me(m.slice(Y, d), !0), z = C.r != null ? parseInt(C.r, 10) : z + 1, U = -1, l.sheetRows && l.sheetRows < z) continue;
              H = {}, b = !1, C.ht && (b = !0, H.hpt = parseFloat(C.ht), H.hpx = Mn(H.hpt)), C.hidden == "1" && (b = !0, H.hidden = !0), C.outlineLevel != null && (b = !0, H.level = +C.outlineLevel), b && (B[z - 1] = H);
            }
            break;
          case "<":
            Y = d;
            break;
        }
        if (Y >= d) break;
        if (C = me(m.slice(Y, d), !0), z = C.r != null ? parseInt(C.r, 10) : z + 1, U = -1, !(l.sheetRows && l.sheetRows < z)) {
          u.s.r > z - 1 && (u.s.r = z - 1), u.e.r < z - 1 && (u.e.r = z - 1), l && l.cellStyles && (H = {}, b = !1, C.ht && (b = !0, H.hpt = parseFloat(C.ht), H.hpx = Mn(H.hpt)), C.hidden == "1" && (b = !0, H.hidden = !0), C.outlineLevel != null && (b = !0, H.level = +C.outlineLevel), b && (B[z - 1] = H)), x = m.slice(d).split(e);
          for (var Q = 0; Q != x.length && x[Q].trim().charAt(0) == "<"; ++Q) ;
          for (x = x.slice(Q), d = 0; d != x.length; ++d)
            if (m = x[d].trim(), m.length !== 0) {
              if (g = m.match(t), T = d, E = 0, I = 0, m = "<c " + (m.slice(0, 1) == "<" ? ">" : "") + m, g != null && g.length === 2) {
                for (T = 0, D = g[1], E = 0; E != D.length && !((I = D.charCodeAt(E) - 64) < 1 || I > 26); ++E)
                  T = 26 * T + I;
                --T, U = T;
              } else ++U;
              for (E = 0; E != m.length && m.charCodeAt(E) !== 62; ++E) ;
              if (++E, C = me(m.slice(0, E), !0), C.r || (C.r = ge({ r: z - 1, c: U })), D = m.slice(E), L = { t: "" }, (g = D.match(s)) != null && /*::cref != null && */
              g[1] !== "" && (L.v = Oe(g[1])), l.cellFormula) {
                if ((g = D.match(i)) != null && /*::cref != null && */
                g[1] !== "") {
                  if (L.f = Oe(Ne(g[1])).replace(/\r\n/g, `
`), l.xlfn || (L.f = Uo(L.f)), /*::cref != null && cref[0] != null && */
                  g[0].indexOf('t="array"') > -1)
                    L.F = (D.match(n) || [])[1], L.F.indexOf(":") > -1 && te.push([Ge(L.F), L.F]);
                  else if (
                    /*::cref != null && cref[0] != null && */
                    g[0].indexOf('t="shared"') > -1
                  ) {
                    j = me(g[0]);
                    var ne = Oe(Ne(g[1]));
                    l.xlfn || (ne = Uo(ne)), Z[parseInt(j.si, 10)] = [j, ne, C.r];
                  }
                } else (g = D.match(/<f[^>]*\/>/)) && (j = me(g[0]), Z[j.si] && (L.f = Ov(Z[j.si][1], Z[j.si][2], C.r)));
                var ee = Cr(C.r);
                for (E = 0; E < te.length; ++E)
                  ee.r >= te[E][0].s.r && ee.r <= te[E][0].e.r && ee.c >= te[E][0].s.c && ee.c <= te[E][0].e.c && (L.F = te[E][1]);
              }
              if (C.t == null && L.v === void 0)
                if (L.f || L.F)
                  L.v = 0, L.t = "n";
                else if (y) L.t = "z";
                else continue;
              else L.t = C.t || "n";
              switch (u.s.c > U && (u.s.c = U), u.e.c < U && (u.e.c = U), L.t) {
                case "n":
                  if (L.v == "" || L.v == null) {
                    if (!y) continue;
                    L.t = "z";
                  } else L.v = parseFloat(L.v);
                  break;
                case "s":
                  if (typeof L.v > "u") {
                    if (!y) continue;
                    L.t = "z";
                  } else
                    J = Sn[parseInt(L.v, 10)], L.v = J.t, L.r = J.r, l.cellHTML && (L.h = J.h);
                  break;
                case "str":
                  L.t = "s", L.v = L.v != null ? Ne(L.v) : "", l.cellHTML && (L.h = x0(L.v));
                  break;
                case "inlineStr":
                  g = D.match(a), L.t = "s", g != null && (J = A0(g[1])) ? (L.v = J.t, l.cellHTML && (L.h = J.h)) : L.v = "";
                  break;
                case "b":
                  L.v = Ue(L.v);
                  break;
                case "d":
                  l.cellDates ? L.v = sr(L.v, 1) : (L.v = Or(sr(L.v, 1)), L.t = "n");
                  break;
                case "e":
                  (!l || l.cellText !== !1) && (L.w = L.v), L.v = ru[L.v];
                  break;
              }
              if (M = ae = 0, V = null, G && C.s !== void 0 && (V = h.CellXf[C.s], V != null && (V.numFmtId != null && (M = V.numFmtId), l.cellStyles && V.fillId != null && (ae = V.fillId))), Pu(L, M, ae, l, p, h), l.cellDates && G && L.t == "n" && Xa(Ee[M]) && (L.t = "d", L.v = Hs(L.v)), C.cm && l.xlmeta) {
                var pe = (l.xlmeta.Cell || [])[+C.cm - 1];
                pe && pe.type == "XLDAPR" && (L.D = !0);
              }
              if (ce) {
                var P = Cr(C.r);
                f[P.r] || (f[P.r] = []), f[P.r][P.c] = L;
              } else f[C.r] = L;
            }
        }
      }
    }
    B.length > 0 && (f["!rows"] = B);
  };
}();
function y_(e, r) {
  var t = {}, a = e.l + r;
  t.r = e.read_shift(4), e.l += 4;
  var n = e.read_shift(2);
  e.l += 1;
  var s = e.read_shift(1);
  return e.l = a, s & 7 && (t.level = s & 7), s & 16 && (t.hidden = !0), s & 32 && (t.hpt = n / 20), t;
}
var w_ = ka;
function T_() {
}
function k_(e, r) {
  var t = {}, a = e[e.l];
  return ++e.l, t.above = !(a & 64), t.left = !(a & 128), e.l += 18, t.name = W1(e), t;
}
function S_(e) {
  var r = et(e);
  return [r];
}
function A_(e) {
  var r = Ta(e);
  return [r];
}
function $_(e) {
  var r = et(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function F_(e) {
  var r = Ta(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function C_(e) {
  var r = et(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function R_(e) {
  var r = Ta(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function O_(e) {
  var r = et(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function I_(e) {
  var r = Ta(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function P_(e) {
  var r = et(e), t = Er(e);
  return [r, t, "n"];
}
function bu(e) {
  var r = Ta(e), t = Er(e);
  return [r, t, "n"];
}
function N_(e) {
  var r = et(e), t = T0(e);
  return [r, t, "n"];
}
function b_(e) {
  var r = Ta(e), t = T0(e);
  return [r, t, "n"];
}
function D_(e) {
  var r = et(e), t = y0(e);
  return [r, t, "is"];
}
function L_(e) {
  var r = et(e), t = wr(e);
  return [r, t, "str"];
}
function M_(e) {
  var r = Ta(e), t = wr(e);
  return [r, t, "str"];
}
function B_(e, r, t) {
  var a = e.l + r, n = et(e);
  n.r = t["!row"];
  var s = e.read_shift(1), i = [n, s, "b"];
  if (t.cellFormula) {
    e.l += 2;
    var c = Ws(e, a - e.l, t);
    i[3] = _r(c, null, n, t.supbooks, t);
  } else e.l = a;
  return i;
}
function U_(e, r, t) {
  var a = e.l + r, n = et(e);
  n.r = t["!row"];
  var s = e.read_shift(1), i = [n, s, "e"];
  if (t.cellFormula) {
    e.l += 2;
    var c = Ws(e, a - e.l, t);
    i[3] = _r(c, null, n, t.supbooks, t);
  } else e.l = a;
  return i;
}
function j_(e, r, t) {
  var a = e.l + r, n = et(e);
  n.r = t["!row"];
  var s = Er(e), i = [n, s, "n"];
  if (t.cellFormula) {
    e.l += 2;
    var c = Ws(e, a - e.l, t);
    i[3] = _r(c, null, n, t.supbooks, t);
  } else e.l = a;
  return i;
}
function V_(e, r, t) {
  var a = e.l + r, n = et(e);
  n.r = t["!row"];
  var s = wr(e), i = [n, s, "str"];
  if (t.cellFormula) {
    e.l += 2;
    var c = Ws(e, a - e.l, t);
    i[3] = _r(c, null, n, t.supbooks, t);
  } else e.l = a;
  return i;
}
var H_ = ka;
function G_(e, r) {
  var t = e.l + r, a = ka(e), n = w0(e), s = wr(e), i = wr(e), c = wr(e);
  e.l = t;
  var o = { rfx: a, relId: n, loc: s, display: c };
  return i && (o.Tooltip = i), o;
}
function z_() {
}
function W_(e, r, t) {
  var a = e.l + r, n = Zl(e), s = e.read_shift(1), i = [n];
  if (i[2] = s, t.cellFormula) {
    var c = Jg(e, a - e.l, t);
    i[1] = c;
  } else e.l = a;
  return i;
}
function X_(e, r, t) {
  var a = e.l + r, n = ka(e), s = [n];
  if (t.cellFormula) {
    var i = Qg(e, a - e.l, t);
    s[1] = i, e.l = a;
  } else e.l = a;
  return s;
}
var K_ = ["left", "right", "top", "bottom", "header", "footer"];
function q_(e) {
  var r = {};
  return K_.forEach(function(t) {
    r[t] = Er(e);
  }), r;
}
function Y_(e) {
  var r = e.read_shift(2);
  return e.l += 28, { RTL: r & 32 };
}
function J_() {
}
function Z_() {
}
function Q_(e, r, t, a, n, s, i) {
  if (!e) return e;
  var c = r || {};
  a || (a = { "!id": {} });
  var o = c.dense ? [] : {}, f, l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, u = !1, p = !1, h, d, m, x, g, T, E, I, D, L = [];
  c.biff = 12, c["!row"] = 0;
  var C = 0, z = !1, U = [], J = {}, j = c.supbooks || /*::(*/
  n.supbooks || [[]];
  if (j.sharedf = J, j.arrayf = U, j.SheetNames = n.SheetNames || n.Sheets.map(function(ce) {
    return ce.name;
  }), !c.supbooks && (c.supbooks = j, n.Names))
    for (var M = 0; M < n.Names.length; ++M) j[0][M + 1] = n.Names[M];
  var ae = [], G = [], V = !1;
  bs[16] = { n: "BrtShortReal", f: bu };
  var te;
  if (Mt(e, function(B, H, b) {
    if (!p)
      switch (b) {
        case 148:
          f = B;
          break;
        case 0:
          h = B, c.sheetRows && c.sheetRows <= h.r && (p = !0), I = ur(x = h.r), c["!row"] = h.r, (B.hidden || B.hpt || B.level != null) && (B.hpt && (B.hpx = Mn(B.hpt)), G[B.r] = B);
          break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 62:
          switch (d = { t: B[2] }, B[2]) {
            case "n":
              d.v = B[1];
              break;
            case "s":
              E = Sn[B[1]], d.v = E.t, d.r = E.r;
              break;
            case "b":
              d.v = !!B[1];
              break;
            case "e":
              d.v = B[1], c.cellText !== !1 && (d.w = Sa[d.v]);
              break;
            case "str":
              d.t = "s", d.v = B[1];
              break;
            case "is":
              d.t = "s", d.v = B[1].t;
              break;
          }
          if ((m = i.CellXf[B[0].iStyleRef]) && Pu(d, m.numFmtId, null, c, s, i), g = B[0].c == -1 ? g + 1 : B[0].c, c.dense ? (o[x] || (o[x] = []), o[x][g] = d) : o[rr(g) + I] = d, c.cellFormula) {
            for (z = !1, C = 0; C < U.length; ++C) {
              var y = U[C];
              h.r >= y[0].s.r && h.r <= y[0].e.r && g >= y[0].s.c && g <= y[0].e.c && (d.F = Re(y[0]), z = !0);
            }
            !z && B.length > 3 && (d.f = B[3]);
          }
          if (l.s.r > h.r && (l.s.r = h.r), l.s.c > g && (l.s.c = g), l.e.r < h.r && (l.e.r = h.r), l.e.c < g && (l.e.c = g), c.cellDates && m && d.t == "n" && Xa(Ee[m.numFmtId])) {
            var k = ha(d.v);
            k && (d.t = "d", d.v = new Date(k.y, k.m - 1, k.d, k.H, k.M, k.S, k.u));
          }
          te && (te.type == "XLDAPR" && (d.D = !0), te = void 0);
          break;
        case 1:
        case 12:
          if (!c.sheetStubs || u) break;
          d = { t: "z", v: void 0 }, g = B[0].c == -1 ? g + 1 : B[0].c, c.dense ? (o[x] || (o[x] = []), o[x][g] = d) : o[rr(g) + I] = d, l.s.r > h.r && (l.s.r = h.r), l.s.c > g && (l.s.c = g), l.e.r < h.r && (l.e.r = h.r), l.e.c < g && (l.e.c = g), te && (te.type == "XLDAPR" && (d.D = !0), te = void 0);
          break;
        case 176:
          L.push(B);
          break;
        case 49:
          te = ((c.xlmeta || {}).Cell || [])[B - 1];
          break;
        case 494:
          var v = a["!id"][B.relId];
          for (v ? (B.Target = v.Target, B.loc && (B.Target += "#" + B.loc), B.Rel = v) : B.relId == "" && (B.Target = "#" + B.loc), x = B.rfx.s.r; x <= B.rfx.e.r; ++x) for (g = B.rfx.s.c; g <= B.rfx.e.c; ++g)
            c.dense ? (o[x] || (o[x] = []), o[x][g] || (o[x][g] = { t: "z", v: void 0 }), o[x][g].l = B) : (T = ge({ c: g, r: x }), o[T] || (o[T] = { t: "z", v: void 0 }), o[T].l = B);
          break;
        case 426:
          if (!c.cellFormula) break;
          U.push(B), D = c.dense ? o[x][g] : o[rr(g) + I], D.f = _r(B[1], l, { r: h.r, c: g }, j, c), D.F = Re(B[0]);
          break;
        case 427:
          if (!c.cellFormula) break;
          J[ge(B[0].s)] = B[1], D = c.dense ? o[x][g] : o[rr(g) + I], D.f = _r(B[1], l, { r: h.r, c: g }, j, c);
          break;
        case 60:
          if (!c.cellStyles) break;
          for (; B.e >= B.s; )
            ae[B.e--] = { width: B.w / 256, hidden: !!(B.flags & 1), level: B.level }, V || (V = !0, $0(B.w / 256)), za(ae[B.e + 1]);
          break;
        case 161:
          o["!autofilter"] = { ref: Re(B) };
          break;
        case 476:
          o["!margins"] = B;
          break;
        case 147:
          n.Sheets[t] || (n.Sheets[t] = {}), B.name && (n.Sheets[t].CodeName = B.name), (B.above || B.left) && (o["!outline"] = { above: B.above, left: B.left });
          break;
        case 137:
          n.Views || (n.Views = [{}]), n.Views[0] || (n.Views[0] = {}), B.RTL && (n.Views[0].RTL = !0);
          break;
        case 485:
          break;
        case 64:
        case 1053:
          break;
        case 151:
          break;
        case 152:
        case 175:
        case 644:
        case 625:
        case 562:
        case 396:
        case 1112:
        case 1146:
        case 471:
        case 1050:
        case 649:
        case 1105:
        case 589:
        case 607:
        case 564:
        case 1055:
        case 168:
        case 174:
        case 1180:
        case 499:
        case 507:
        case 550:
        case 171:
        case 167:
        case 1177:
        case 169:
        case 1181:
        case 551:
        case 552:
        case 661:
        case 639:
        case 478:
        case 537:
        case 477:
        case 536:
        case 1103:
        case 680:
        case 1104:
        case 1024:
        case 663:
        case 535:
        case 678:
        case 504:
        case 1043:
        case 428:
        case 170:
        case 3072:
        case 50:
        case 2070:
        case 1045:
          break;
        case 35:
          u = !0;
          break;
        case 36:
          u = !1;
          break;
        case 37:
          u = !0;
          break;
        case 38:
          u = !1;
          break;
        default:
          if (!H.T) {
            if (!u || c.WTF) throw new Error("Unexpected record 0x" + b.toString(16));
          }
      }
  }, c), delete c.supbooks, delete c["!row"], !o["!ref"] && (l.s.r < 2e6 || f && (f.e.r > 0 || f.e.c > 0 || f.s.r > 0 || f.s.c > 0)) && (o["!ref"] = Re(f || l)), c.sheetRows && o["!ref"]) {
    var Z = Ge(o["!ref"]);
    c.sheetRows <= +Z.e.r && (Z.e.r = c.sheetRows - 1, Z.e.r > l.e.r && (Z.e.r = l.e.r), Z.e.r < Z.s.r && (Z.s.r = Z.e.r), Z.e.c > l.e.c && (Z.e.c = l.e.c), Z.e.c < Z.s.c && (Z.s.c = Z.e.c), o["!fullref"] = o["!ref"], o["!ref"] = Re(Z));
  }
  return L.length > 0 && (o["!merges"] = L), ae.length > 0 && (o["!cols"] = ae), G.length > 0 && (o["!rows"] = G), o;
}
function e2(e) {
  var r = [], t = e.match(/^<c:numCache>/), a;
  (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/mg) || []).forEach(function(s) {
    var i = s.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
    i && (r[+i[1]] = t ? +i[2] : i[2]);
  });
  var n = Oe((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
  return (e.match(/<c:f>(.*?)<\/c:f>/mg) || []).forEach(function(s) {
    a = s.replace(/<.*?>/g, "");
  }), [r, n, a];
}
function r2(e, r, t, a, n, s) {
  var i = s || { "!type": "chart" };
  if (!e) return s;
  var c = 0, o = 0, f = "A", l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
  return (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(u) {
    var p = e2(u);
    l.s.r = l.s.c = 0, l.e.c = c, f = rr(c), p[0].forEach(function(h, d) {
      i[f + ur(d)] = { t: "n", v: h, z: p[1] }, o = d;
    }), l.e.r < o && (l.e.r = o), ++c;
  }), c > 0 && (i["!ref"] = Re(l)), i;
}
function t2(e, r, t, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var s = { "!type": "chart", "!drawel": null, "!rel": "" }, i, c = e.match(Nu);
  return c && C0(c[0], s, n, t), (i = e.match(/drawing r:id="(.*?)"/)) && (s["!rel"] = i[1]), a["!id"][s["!rel"]] && (s["!drawel"] = a["!id"][s["!rel"]]), s;
}
function a2(e, r) {
  e.l += 10;
  var t = wr(e);
  return { name: t };
}
function n2(e, r, t, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var s = { "!type": "chart", "!drawel": null, "!rel": "" }, i = !1;
  return Mt(e, function(o, f, l) {
    switch (l) {
      case 550:
        s["!rel"] = o;
        break;
      case 651:
        n.Sheets[t] || (n.Sheets[t] = {}), o.name && (n.Sheets[t].CodeName = o.name);
        break;
      case 562:
      case 652:
      case 669:
      case 679:
      case 551:
      case 552:
      case 476:
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!(f.T > 0)) {
          if (!(f.T < 0)) {
            if (!i || r.WTF) throw new Error("Unexpected record 0x" + l.toString(16));
          }
        }
    }
  }, r), a["!id"][s["!rel"]] && (s["!drawel"] = a["!id"][s["!rel"]]), s;
}
var Du = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
], s2 = [
  ["activeTab", 0, "int"],
  ["autoFilterDateGrouping", !0, "bool"],
  ["firstSheet", 0, "int"],
  ["minimized", !1, "bool"],
  ["showHorizontalScroll", !0, "bool"],
  ["showSheetTabs", !0, "bool"],
  ["showVerticalScroll", !0, "bool"],
  ["tabRatio", 600, "int"],
  ["visibility", "visible"]
  //window{Height,Width}, {x,y}Window
], i2 = [
  //['state', 'visible']
], c2 = [
  ["calcCompleted", "true"],
  ["calcMode", "auto"],
  ["calcOnSave", "true"],
  ["concurrentCalc", "true"],
  ["fullCalcOnLoad", "false"],
  ["fullPrecision", "true"],
  ["iterate", "false"],
  ["iterateCount", "100"],
  ["iterateDelta", "0.001"],
  ["refMode", "A1"]
];
function zo(e, r) {
  for (var t = 0; t != e.length; ++t)
    for (var a = e[t], n = 0; n != r.length; ++n) {
      var s = r[n];
      if (a[s[0]] == null) a[s[0]] = s[1];
      else switch (s[2]) {
        case "bool":
          typeof a[s[0]] == "string" && (a[s[0]] = Ue(a[s[0]]));
          break;
        case "int":
          typeof a[s[0]] == "string" && (a[s[0]] = parseInt(a[s[0]], 10));
          break;
      }
    }
}
function Wo(e, r) {
  for (var t = 0; t != r.length; ++t) {
    var a = r[t];
    if (e[a[0]] == null) e[a[0]] = a[1];
    else switch (a[2]) {
      case "bool":
        typeof e[a[0]] == "string" && (e[a[0]] = Ue(e[a[0]]));
        break;
      case "int":
        typeof e[a[0]] == "string" && (e[a[0]] = parseInt(e[a[0]], 10));
        break;
    }
  }
}
function Lu(e) {
  Wo(e.WBProps, Du), Wo(e.CalcPr, c2), zo(e.WBView, s2), zo(e.Sheets, i2), Ua.date1904 = Ue(e.WBProps.date1904);
}
var o2 = /* @__PURE__ */ "][*?/\\".split("");
function f2(e, r) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var t = !0;
  return o2.forEach(function(a) {
    if (e.indexOf(a) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), t;
}
var l2 = /<\w+:workbook/;
function u2(e, r) {
  if (!e) throw new Error("Could not find file");
  var t = (
    /*::(*/
    { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }
  ), a = !1, n = "xmlns", s = {}, i = 0;
  if (e.replace(kr, function(o, f) {
    var l = me(o);
    switch (Et(l[0])) {
      case "<?xml":
        break;
      case "<workbook":
        o.match(l2) && (n = "xmlns" + o.match(/<(\w+):/)[1]), t.xmlns = l[n];
        break;
      case "</workbook>":
        break;
      case "<fileVersion":
        delete l[0], t.AppVersion = l;
        break;
      case "<fileVersion/>":
      case "</fileVersion>":
        break;
      case "<fileSharing":
        break;
      case "<fileSharing/>":
        break;
      case "<workbookPr":
      case "<workbookPr/>":
        Du.forEach(function(u) {
          if (l[u[0]] != null)
            switch (u[2]) {
              case "bool":
                t.WBProps[u[0]] = Ue(l[u[0]]);
                break;
              case "int":
                t.WBProps[u[0]] = parseInt(l[u[0]], 10);
                break;
              default:
                t.WBProps[u[0]] = l[u[0]];
            }
        }), l.codeName && (t.WBProps.CodeName = Ne(l.codeName));
        break;
      case "</workbookPr>":
        break;
      case "<workbookProtection":
        break;
      case "<workbookProtection/>":
        break;
      case "<bookViews":
      case "<bookViews>":
      case "</bookViews>":
        break;
      case "<workbookView":
      case "<workbookView/>":
        delete l[0], t.WBView.push(l);
        break;
      case "</workbookView>":
        break;
      case "<sheets":
      case "<sheets>":
      case "</sheets>":
        break;
      case "<sheet":
        switch (l.state) {
          case "hidden":
            l.Hidden = 1;
            break;
          case "veryHidden":
            l.Hidden = 2;
            break;
          default:
            l.Hidden = 0;
        }
        delete l.state, l.name = Oe(Ne(l.name)), delete l[0], t.Sheets.push(l);
        break;
      case "</sheet>":
        break;
      case "<functionGroups":
      case "<functionGroups/>":
        break;
      case "<functionGroup":
        break;
      case "<externalReferences":
      case "</externalReferences>":
      case "<externalReferences>":
        break;
      case "<externalReference":
        break;
      case "<definedNames/>":
        break;
      case "<definedNames>":
      case "<definedNames":
        a = !0;
        break;
      case "</definedNames>":
        a = !1;
        break;
      case "<definedName":
        s = {}, s.Name = Ne(l.name), l.comment && (s.Comment = l.comment), l.localSheetId && (s.Sheet = +l.localSheetId), Ue(l.hidden || "0") && (s.Hidden = !0), i = f + o.length;
        break;
      case "</definedName>":
        s.Ref = Oe(Ne(e.slice(i, f))), t.Names.push(s);
        break;
      case "<definedName/>":
        break;
      case "<calcPr":
        delete l[0], t.CalcPr = l;
        break;
      case "<calcPr/>":
        delete l[0], t.CalcPr = l;
        break;
      case "</calcPr>":
        break;
      case "<oleSize":
        break;
      case "<customWorkbookViews>":
      case "</customWorkbookViews>":
      case "<customWorkbookViews":
        break;
      case "<customWorkbookView":
      case "</customWorkbookView>":
        break;
      case "<pivotCaches>":
      case "</pivotCaches>":
      case "<pivotCaches":
        break;
      case "<pivotCache":
        break;
      case "<smartTagPr":
      case "<smartTagPr/>":
        break;
      case "<smartTagTypes":
      case "<smartTagTypes>":
      case "</smartTagTypes>":
        break;
      case "<smartTagType":
        break;
      case "<webPublishing":
      case "<webPublishing/>":
        break;
      case "<fileRecoveryPr":
      case "<fileRecoveryPr/>":
        break;
      case "<webPublishObjects>":
      case "<webPublishObjects":
      case "</webPublishObjects>":
        break;
      case "<webPublishObject":
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      case "<ArchID":
        break;
      case "<AlternateContent":
      case "<AlternateContent>":
        a = !0;
        break;
      case "</AlternateContent>":
        a = !1;
        break;
      case "<revisionPtr":
        break;
      default:
        if (!a && r.WTF) throw new Error("unrecognized " + l[0] + " in workbook");
    }
    return o;
  }), C1.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
  return Lu(t), t;
}
function h2(e, r) {
  var t = {};
  return t.Hidden = e.read_shift(4), t.iTabID = e.read_shift(4), t.strRelID = Bi(e), t.name = wr(e), t;
}
function d2(e, r) {
  var t = {}, a = e.read_shift(4);
  t.defaultThemeVersion = e.read_shift(4);
  var n = r > 8 ? wr(e) : "";
  return n.length > 0 && (t.CodeName = n), t.autoCompressPictures = !!(a & 65536), t.backupFile = !!(a & 64), t.checkCompatibility = !!(a & 4096), t.date1904 = !!(a & 1), t.filterPrivacy = !!(a & 8), t.hidePivotFieldList = !!(a & 1024), t.promptedSolutions = !!(a & 16), t.publishItems = !!(a & 2048), t.refreshAllConnections = !!(a & 262144), t.saveExternalLinkValues = !!(a & 128), t.showBorderUnselectedTables = !!(a & 4), t.showInkAnnotation = !!(a & 32), t.showObjects = ["all", "placeholders", "none"][a >> 13 & 3], t.showPivotChartFilter = !!(a & 32768), t.updateLinks = ["userSet", "never", "always"][a >> 8 & 3], t;
}
function p2(e, r) {
  var t = {};
  return e.read_shift(4), t.ArchID = e.read_shift(4), e.l += r - 8, t;
}
function m2(e, r, t) {
  var a = e.l + r;
  e.l += 4, e.l += 1;
  var n = e.read_shift(4), s = X1(e), i = Zg(e, 0, t), c = w0(e);
  e.l = a;
  var o = { Name: s, Ptg: i };
  return n < 268435455 && (o.Sheet = n), c && (o.Comment = c), o;
}
function x2(e, r) {
  var t = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }, a = [], n = !1;
  r || (r = {}), r.biff = 12;
  var s = [], i = [[]];
  return i.SheetNames = [], i.XTI = [], bs[16] = { n: "BrtFRTArchID$", f: p2 }, Mt(e, function(o, f, l) {
    switch (l) {
      case 156:
        i.SheetNames.push(o.name), t.Sheets.push(o);
        break;
      case 153:
        t.WBProps = o;
        break;
      case 39:
        o.Sheet != null && (r.SID = o.Sheet), o.Ref = _r(o.Ptg, null, null, i, r), delete r.SID, delete o.Ptg, s.push(o);
        break;
      case 1036:
        break;
      case 357:
      case 358:
      case 355:
      case 667:
        i[0].length ? i.push([l, o]) : i[0] = [l, o], i[i.length - 1].XTI = [];
        break;
      case 362:
        i.length === 0 && (i[0] = [], i[0].XTI = []), i[i.length - 1].XTI = i[i.length - 1].XTI.concat(o), i.XTI = i.XTI.concat(o);
        break;
      case 361:
        break;
      case 2071:
      case 158:
      case 143:
      case 664:
      case 353:
        break;
      case 3072:
      case 3073:
      case 534:
      case 677:
      case 157:
      case 610:
      case 2050:
      case 155:
      case 548:
      case 676:
      case 128:
      case 665:
      case 2128:
      case 2125:
      case 549:
      case 2053:
      case 596:
      case 2076:
      case 2075:
      case 2082:
      case 397:
      case 154:
      case 1117:
      case 553:
      case 2091:
        break;
      case 35:
        a.push(l), n = !0;
        break;
      case 36:
        a.pop(), n = !1;
        break;
      case 37:
        a.push(l), n = !0;
        break;
      case 38:
        a.pop(), n = !1;
        break;
      case 16:
        break;
      default:
        if (!f.T) {
          if (!n || r.WTF && a[a.length - 1] != 37 && a[a.length - 1] != 35) throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }, r), Lu(t), t.Names = s, t.supbooks = i, t;
}
function v2(e, r, t) {
  return r.slice(-4) === ".bin" ? x2(e, t) : u2(e, t);
}
function g2(e, r, t, a, n, s, i, c) {
  return r.slice(-4) === ".bin" ? Q_(e, a, t, n, s, i, c) : h_(e, a, t, n, s, i, c);
}
function _2(e, r, t, a, n, s, i, c) {
  return r.slice(-4) === ".bin" ? n2(e, a, t, n, s) : t2(e, a, t, n, s);
}
function E2(e, r, t, a, n, s, i, c) {
  return r.slice(-4) === ".bin" ? Fv() : Cv();
}
function y2(e, r, t, a, n, s, i, c) {
  return r.slice(-4) === ".bin" ? Av() : $v();
}
function w2(e, r, t, a) {
  return r.slice(-4) === ".bin" ? Hx(e, t, a) : Lx(e, t, a);
}
function T2(e, r, t) {
  return Tu(e, t);
}
function k2(e, r, t) {
  return r.slice(-4) === ".bin" ? sx(e, t) : ax(e, t);
}
function S2(e, r, t) {
  return r.slice(-4) === ".bin" ? Tv(e, t) : gv(e, t);
}
function A2(e, r, t) {
  return r.slice(-4) === ".bin" ? mv(e) : dv(e);
}
function $2(e, r, t, a) {
  return t.slice(-4) === ".bin" ? xv(e, r, t, a) : void 0;
}
function F2(e, r, t) {
  return r.slice(-4) === ".bin" ? uv(e, r, t) : hv(e, r, t);
}
var Mu = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, Bu = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function rt(e, r) {
  var t = e.split(/\s+/), a = [];
  if (a[0] = t[0], t.length === 1) return a;
  var n = e.match(Mu), s, i, c, o;
  if (n) for (o = 0; o != n.length; ++o)
    s = n[o].match(Bu), (i = s[1].indexOf(":")) === -1 ? a[s[1]] = s[2].slice(1, s[2].length - 1) : (s[1].slice(0, 6) === "xmlns:" ? c = "xmlns" + s[1].slice(6) : c = s[1].slice(i + 1), a[c] = s[2].slice(1, s[2].length - 1));
  return a;
}
function C2(e) {
  var r = e.split(/\s+/), t = {};
  if (r.length === 1) return t;
  var a = e.match(Mu), n, s, i, c;
  if (a) for (c = 0; c != a.length; ++c)
    n = a[c].match(Bu), (s = n[1].indexOf(":")) === -1 ? t[n[1]] = n[2].slice(1, n[2].length - 1) : (n[1].slice(0, 6) === "xmlns:" ? i = "xmlns" + n[1].slice(6) : i = n[1].slice(s + 1), t[i] = n[2].slice(1, n[2].length - 1));
  return t;
}
var $n;
function R2(e, r) {
  var t = $n[e] || Oe(e);
  return t === "General" ? ma(r) : Qr(t, r);
}
function O2(e, r, t, a) {
  var n = a;
  switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      n = Ue(a);
      break;
    case "i2":
    case "int":
      n = parseInt(a, 10);
      break;
    case "r4":
    case "float":
      n = parseFloat(a);
      break;
    case "date":
    case "dateTime.tz":
      n = sr(a);
      break;
    case "i8":
    case "string":
    case "fixed":
    case "uuid":
    case "bin.base64":
      break;
    default:
      throw new Error("bad custprop:" + t[0]);
  }
  e[Oe(r)] = n;
}
function I2(e, r, t) {
  if (e.t !== "z") {
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Sa[e.v] : r === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Pn(e.v) : e.w = ma(e.v) : e.w = R2(r || "General", e.v);
    } catch (s) {
      if (t.WTF) throw s;
    }
    try {
      var a = $n[r] || r || "General";
      if (t.cellNF && (e.z = a), t.cellDates && e.t == "n" && Xa(a)) {
        var n = ha(e.v);
        n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u));
      }
    } catch (s) {
      if (t.WTF) throw s;
    }
  }
}
function P2(e, r, t) {
  if (t.cellStyles && r.Interior) {
    var a = r.Interior;
    a.Pattern && (a.patternType = Ox[a.Pattern] || a.Pattern);
  }
  e[r.ID] = r;
}
function N2(e, r, t, a, n, s, i, c, o, f) {
  var l = "General", u = a.StyleID, p = {};
  f = f || {};
  var h = [], d = 0;
  for (u === void 0 && c && (u = c.StyleID), u === void 0 && i && (u = i.StyleID); s[u] !== void 0 && (s[u].nf && (l = s[u].nf), s[u].Interior && h.push(s[u].Interior), !!s[u].Parent); )
    u = s[u].Parent;
  switch (t.Type) {
    case "Boolean":
      a.t = "b", a.v = Ue(e);
      break;
    case "String":
      a.t = "s", a.r = po(Oe(e)), a.v = e.indexOf("<") > -1 ? Oe(r || e).replace(/<.*?>/g, "") : a.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), a.v = (sr(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3), a.v !== a.v ? a.v = Oe(e) : a.v < 60 && (a.v = a.v - 1), (!l || l == "General") && (l = "yyyy-mm-dd");
    case "Number":
      a.v === void 0 && (a.v = +e), a.t || (a.t = "n");
      break;
    case "Error":
      a.t = "e", a.v = ru[e], f.cellText !== !1 && (a.w = e);
      break;
    default:
      e == "" && r == "" ? a.t = "z" : (a.t = "s", a.v = po(r || e));
      break;
  }
  if (I2(a, l, f), f.cellFormula !== !1)
    if (a.Formula) {
      var m = Oe(a.Formula);
      m.charCodeAt(0) == 61 && (m = m.slice(1)), a.f = Ba(m, n), delete a.Formula, a.ArrayRange == "RC" ? a.F = Ba("RC:RC", n) : a.ArrayRange && (a.F = Ba(a.ArrayRange, n), o.push([Ge(a.F), a.F]));
    } else
      for (d = 0; d < o.length; ++d)
        n.r >= o[d][0].s.r && n.r <= o[d][0].e.r && n.c >= o[d][0].s.c && n.c <= o[d][0].e.c && (a.F = o[d][1]);
  f.cellStyles && (h.forEach(function(x) {
    !p.patternType && x.patternType && (p.patternType = x.patternType);
  }), a.s = p), a.StyleID !== void 0 && (a.ixfe = a.StyleID);
}
function b2(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}
function Ei(e, r) {
  var t = r || {};
  $l();
  var a = dn(v0(e));
  (t.type == "binary" || t.type == "array" || t.type == "base64") && (a = Ne(a));
  var n = a.slice(0, 1024).toLowerCase(), s = !1;
  if (n = n.replace(/".*?"/g, ""), (n.indexOf(">") & 1023) > Math.min(n.indexOf(",") & 1023, n.indexOf(";") & 1023)) {
    var i = lr(t);
    return i.type = "string", Dn.to_workbook(a, i);
  }
  if (n.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(De) {
    n.indexOf("<" + De) >= 0 && (s = !0);
  }), s) return G2(a, t);
  $n = {
    "General Number": "General",
    "General Date": Ee[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": Ee[15],
    "Short Date": Ee[14],
    "Long Time": Ee[19],
    "Medium Time": Ee[18],
    "Short Time": Ee[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: Ee[2],
    Standard: Ee[4],
    Percent: Ee[10],
    Scientific: Ee[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var c, o = [], f, l = {}, u = [], p = t.dense ? [] : {}, h = "", d = {}, m = {}, x = rt('<Data ss:Type="String">'), g = 0, T = 0, E = 0, I = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, D = {}, L = {}, C = "", z = 0, U = [], J = {}, j = {}, M = 0, ae = [], G = [], V = {}, te = [], Z, ce = !1, B = [], H = [], b = {}, y = 0, k = 0, v = { Sheets: [], WBProps: { date1904: !1 } }, _ = {};
  bn.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "");
  for (var N = ""; c = bn.exec(a); ) switch (c[3] = (N = c[3]).toLowerCase()) {
    case "data":
      if (N == "data") {
        if (c[1] === "/") {
          if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
        } else c[0].charAt(c[0].length - 2) !== "/" && o.push([c[3], !0]);
        break;
      }
      if (o[o.length - 1][1]) break;
      c[1] === "/" ? N2(a.slice(g, c.index), C, x, o[o.length - 1][0] == /*"Comment"*/
      "comment" ? V : d, { c: T, r: E }, D, te[T], m, B, t) : (C = "", x = rt(c[0]), g = c.index + c[0].length);
      break;
    case "cell":
      if (c[1] === "/")
        if (G.length > 0 && (d.c = G), (!t.sheetRows || t.sheetRows > E) && d.v !== void 0 && (t.dense ? (p[E] || (p[E] = []), p[E][T] = d) : p[rr(T) + ur(E)] = d), d.HRef && (d.l = { Target: Oe(d.HRef) }, d.HRefScreenTip && (d.l.Tooltip = d.HRefScreenTip), delete d.HRef, delete d.HRefScreenTip), (d.MergeAcross || d.MergeDown) && (y = T + (parseInt(d.MergeAcross, 10) | 0), k = E + (parseInt(d.MergeDown, 10) | 0), U.push({ s: { c: T, r: E }, e: { c: y, r: k } })), !t.sheetStubs)
          d.MergeAcross ? T = y + 1 : ++T;
        else if (d.MergeAcross || d.MergeDown) {
          for (var Y = T; Y <= y; ++Y)
            for (var Q = E; Q <= k; ++Q)
              (Y > T || Q > E) && (t.dense ? (p[Q] || (p[Q] = []), p[Q][Y] = { t: "z" }) : p[rr(Y) + ur(Q)] = { t: "z" });
          T = y + 1;
        } else ++T;
      else
        d = C2(c[0]), d.Index && (T = +d.Index - 1), T < I.s.c && (I.s.c = T), T > I.e.c && (I.e.c = T), c[0].slice(-2) === "/>" && ++T, G = [];
      break;
    case "row":
      c[1] === "/" || c[0].slice(-2) === "/>" ? (E < I.s.r && (I.s.r = E), E > I.e.r && (I.e.r = E), c[0].slice(-2) === "/>" && (m = rt(c[0]), m.Index && (E = +m.Index - 1)), T = 0, ++E) : (m = rt(c[0]), m.Index && (E = +m.Index - 1), b = {}, (m.AutoFitHeight == "0" || m.Height) && (b.hpx = parseInt(m.Height, 10), b.hpt = wu(b.hpx), H[E] = b), m.Hidden == "1" && (b.hidden = !0, H[E] = b));
      break;
    case "worksheet":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
        u.push(h), I.s.r <= I.e.r && I.s.c <= I.e.c && (p["!ref"] = Re(I), t.sheetRows && t.sheetRows <= I.e.r && (p["!fullref"] = p["!ref"], I.e.r = t.sheetRows - 1, p["!ref"] = Re(I))), U.length && (p["!merges"] = U), te.length > 0 && (p["!cols"] = te), H.length > 0 && (p["!rows"] = H), l[h] = p;
      } else
        I = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, E = T = 0, o.push([c[3], !1]), f = rt(c[0]), h = Oe(f.Name), p = t.dense ? [] : {}, U = [], B = [], H = [], _ = { name: h, Hidden: 0 }, v.Sheets.push(_);
      break;
    case "table":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
      } else {
        if (c[0].slice(-2) == "/>") break;
        o.push([c[3], !1]), te = [], ce = !1;
      }
      break;
    case "style":
      c[1] === "/" ? P2(D, L, t) : L = rt(c[0]);
      break;
    case "numberformat":
      L.nf = Oe(rt(c[0]).Format || "General"), $n[L.nf] && (L.nf = $n[L.nf]);
      for (var ne = 0; ne != 392 && Ee[ne] != L.nf; ++ne) ;
      if (ne == 392) {
        for (ne = 57; ne != 392; ++ne) if (Ee[ne] == null) {
          da(L.nf, ne);
          break;
        }
      }
      break;
    case "column":
      if (o[o.length - 1][0] !== /*'Table'*/
      "table") break;
      if (Z = rt(c[0]), Z.Hidden && (Z.hidden = !0, delete Z.Hidden), Z.Width && (Z.wpx = parseInt(Z.Width, 10)), !ce && Z.wpx > 10) {
        ce = !0, $r = Eu;
        for (var ee = 0; ee < te.length; ++ee) te[ee] && za(te[ee]);
      }
      ce && za(Z), te[Z.Index - 1 || te.length] = Z;
      for (var pe = 0; pe < +Z.Span; ++pe) te[te.length] = lr(Z);
      break;
    case "namedrange":
      if (c[1] === "/") break;
      v.Names || (v.Names = []);
      var P = me(c[0]), be = {
        Name: P.Name,
        Ref: Ba(P.RefersTo.slice(1), { r: 0, c: 0 })
      };
      v.Sheets.length > 0 && (be.Sheet = v.Sheets.length - 1), v.Names.push(be);
      break;
    case "namedcell":
      break;
    case "b":
      break;
    case "i":
      break;
    case "u":
      break;
    case "s":
      break;
    case "em":
      break;
    case "h2":
      break;
    case "h3":
      break;
    case "sub":
      break;
    case "sup":
      break;
    case "span":
      break;
    case "alignment":
      break;
    case "borders":
      break;
    case "border":
      break;
    case "font":
      if (c[0].slice(-2) === "/>") break;
      c[1] === "/" ? C += a.slice(z, c.index) : z = c.index + c[0].length;
      break;
    case "interior":
      if (!t.cellStyles) break;
      L.Interior = rt(c[0]);
      break;
    case "protection":
      break;
    case "author":
    case "title":
    case "description":
    case "created":
    case "keywords":
    case "subject":
    case "category":
    case "company":
    case "lastauthor":
    case "lastsaved":
    case "lastprinted":
    case "version":
    case "revision":
    case "totaltime":
    case "hyperlinkbase":
    case "manager":
    case "contentstatus":
    case "identifier":
    case "language":
    case "appname":
      if (c[0].slice(-2) === "/>") break;
      c[1] === "/" ? gp(J, N, a.slice(M, c.index)) : M = c.index + c[0].length;
      break;
    case "paragraphs":
      break;
    case "styles":
    case "workbook":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
      } else o.push([c[3], !1]);
      break;
    case "comment":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
        b2(V), G.push(V);
      } else
        o.push([c[3], !1]), f = rt(c[0]), V = { a: f.Author };
      break;
    case "autofilter":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
      } else if (c[0].charAt(c[0].length - 2) !== "/") {
        var $e = rt(c[0]);
        p["!autofilter"] = { ref: Ba($e.Range).replace(/\$/g, "") }, o.push([c[3], !0]);
      }
      break;
    case "name":
      break;
    case "datavalidation":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
      } else
        c[0].charAt(c[0].length - 2) !== "/" && o.push([c[3], !0]);
      break;
    case "pixelsperinch":
      break;
    case "componentoptions":
    case "documentproperties":
    case "customdocumentproperties":
    case "officedocumentsettings":
    case "pivottable":
    case "pivotcache":
    case "names":
    case "mapinfo":
    case "pagebreaks":
    case "querytable":
    case "sorting":
    case "schema":
    case "conditionalformatting":
    case "smarttagtype":
    case "smarttags":
    case "excelworkbook":
    case "workbookoptions":
    case "worksheetoptions":
      if (c[1] === "/") {
        if ((f = o.pop())[0] !== c[3]) throw new Error("Bad state: " + f.join("|"));
      } else c[0].charAt(c[0].length - 2) !== "/" && o.push([c[3], !0]);
      break;
    case "null":
      break;
    default:
      if (o.length == 0 && c[3] == "document" || o.length == 0 && c[3] == "uof") return Zo(a, t);
      var Ie = !0;
      switch (o[o.length - 1][0]) {
        case "officedocumentsettings":
          switch (c[3]) {
            case "allowpng":
              break;
            case "removepersonalinformation":
              break;
            case "downloadcomponents":
              break;
            case "locationofcomponents":
              break;
            case "colors":
              break;
            case "color":
              break;
            case "index":
              break;
            case "rgb":
              break;
            case "targetscreensize":
              break;
            case "readonlyrecommended":
              break;
            default:
              Ie = !1;
          }
          break;
        case "componentoptions":
          switch (c[3]) {
            case "toolbar":
              break;
            case "hideofficelogo":
              break;
            case "spreadsheetautofit":
              break;
            case "label":
              break;
            case "caption":
              break;
            case "maxheight":
              break;
            case "maxwidth":
              break;
            case "nextsheetnumber":
              break;
            default:
              Ie = !1;
          }
          break;
        case "excelworkbook":
          switch (c[3]) {
            case "date1904":
              v.WBProps.date1904 = !0;
              break;
            case "windowheight":
              break;
            case "windowwidth":
              break;
            case "windowtopx":
              break;
            case "windowtopy":
              break;
            case "tabratio":
              break;
            case "protectstructure":
              break;
            case "protectwindow":
              break;
            case "protectwindows":
              break;
            case "activesheet":
              break;
            case "displayinknotes":
              break;
            case "firstvisiblesheet":
              break;
            case "supbook":
              break;
            case "sheetname":
              break;
            case "sheetindex":
              break;
            case "sheetindexfirst":
              break;
            case "sheetindexlast":
              break;
            case "dll":
              break;
            case "acceptlabelsinformulas":
              break;
            case "donotsavelinkvalues":
              break;
            case "iteration":
              break;
            case "maxiterations":
              break;
            case "maxchange":
              break;
            case "path":
              break;
            case "xct":
              break;
            case "count":
              break;
            case "selectedsheets":
              break;
            case "calculation":
              break;
            case "uncalced":
              break;
            case "startupprompt":
              break;
            case "crn":
              break;
            case "externname":
              break;
            case "formula":
              break;
            case "colfirst":
              break;
            case "collast":
              break;
            case "wantadvise":
              break;
            case "boolean":
              break;
            case "error":
              break;
            case "text":
              break;
            case "ole":
              break;
            case "noautorecover":
              break;
            case "publishobjects":
              break;
            case "donotcalculatebeforesave":
              break;
            case "number":
              break;
            case "refmoder1c1":
              break;
            case "embedsavesmarttags":
              break;
            default:
              Ie = !1;
          }
          break;
        case "workbookoptions":
          switch (c[3]) {
            case "owcversion":
              break;
            case "height":
              break;
            case "width":
              break;
            default:
              Ie = !1;
          }
          break;
        case "worksheetoptions":
          switch (c[3]) {
            case "visible":
              if (c[0].slice(-2) !== "/>") if (c[1] === "/") switch (a.slice(M, c.index)) {
                case "SheetHidden":
                  _.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  _.Hidden = 2;
                  break;
              }
              else M = c.index + c[0].length;
              break;
            case "header":
              p["!margins"] || An(p["!margins"] = {}, "xlml"), isNaN(+me(c[0]).Margin) || (p["!margins"].header = +me(c[0]).Margin);
              break;
            case "footer":
              p["!margins"] || An(p["!margins"] = {}, "xlml"), isNaN(+me(c[0]).Margin) || (p["!margins"].footer = +me(c[0]).Margin);
              break;
            case "pagemargins":
              var we = me(c[0]);
              p["!margins"] || An(p["!margins"] = {}, "xlml"), isNaN(+we.Top) || (p["!margins"].top = +we.Top), isNaN(+we.Left) || (p["!margins"].left = +we.Left), isNaN(+we.Right) || (p["!margins"].right = +we.Right), isNaN(+we.Bottom) || (p["!margins"].bottom = +we.Bottom);
              break;
            case "displayrighttoleft":
              v.Views || (v.Views = []), v.Views[0] || (v.Views[0] = {}), v.Views[0].RTL = !0;
              break;
            case "freezepanes":
              break;
            case "frozennosplit":
              break;
            case "splithorizontal":
            case "splitvertical":
              break;
            case "donotdisplaygridlines":
              break;
            case "activerow":
              break;
            case "activecol":
              break;
            case "toprowbottompane":
              break;
            case "leftcolumnrightpane":
              break;
            case "unsynced":
              break;
            case "print":
              break;
            case "printerrors":
              break;
            case "panes":
              break;
            case "scale":
              break;
            case "pane":
              break;
            case "number":
              break;
            case "layout":
              break;
            case "pagesetup":
              break;
            case "selected":
              break;
            case "protectobjects":
              break;
            case "enableselection":
              break;
            case "protectscenarios":
              break;
            case "validprinterinfo":
              break;
            case "horizontalresolution":
              break;
            case "verticalresolution":
              break;
            case "numberofcopies":
              break;
            case "activepane":
              break;
            case "toprowvisible":
              break;
            case "leftcolumnvisible":
              break;
            case "fittopage":
              break;
            case "rangeselection":
              break;
            case "papersizeindex":
              break;
            case "pagelayoutzoom":
              break;
            case "pagebreakzoom":
              break;
            case "filteron":
              break;
            case "fitwidth":
              break;
            case "fitheight":
              break;
            case "commentslayout":
              break;
            case "zoom":
              break;
            case "lefttoright":
              break;
            case "gridlines":
              break;
            case "allowsort":
              break;
            case "allowfilter":
              break;
            case "allowinsertrows":
              break;
            case "allowdeleterows":
              break;
            case "allowinsertcols":
              break;
            case "allowdeletecols":
              break;
            case "allowinserthyperlinks":
              break;
            case "allowformatcells":
              break;
            case "allowsizecols":
              break;
            case "allowsizerows":
              break;
            case "nosummaryrowsbelowdetail":
              p["!outline"] || (p["!outline"] = {}), p["!outline"].above = !0;
              break;
            case "tabcolorindex":
              break;
            case "donotdisplayheadings":
              break;
            case "showpagelayoutzoom":
              break;
            case "nosummarycolumnsrightdetail":
              p["!outline"] || (p["!outline"] = {}), p["!outline"].left = !0;
              break;
            case "blackandwhite":
              break;
            case "donotdisplayzeros":
              break;
            case "displaypagebreak":
              break;
            case "rowcolheadings":
              break;
            case "donotdisplayoutline":
              break;
            case "noorientation":
              break;
            case "allowusepivottables":
              break;
            case "zeroheight":
              break;
            case "viewablerange":
              break;
            case "selection":
              break;
            case "protectcontents":
              break;
            default:
              Ie = !1;
          }
          break;
        case "pivottable":
        case "pivotcache":
          switch (c[3]) {
            case "immediateitemsondrop":
              break;
            case "showpagemultipleitemlabel":
              break;
            case "compactrowindent":
              break;
            case "location":
              break;
            case "pivotfield":
              break;
            case "orientation":
              break;
            case "layoutform":
              break;
            case "layoutsubtotallocation":
              break;
            case "layoutcompactrow":
              break;
            case "position":
              break;
            case "pivotitem":
              break;
            case "datatype":
              break;
            case "datafield":
              break;
            case "sourcename":
              break;
            case "parentfield":
              break;
            case "ptlineitems":
              break;
            case "ptlineitem":
              break;
            case "countofsameitems":
              break;
            case "item":
              break;
            case "itemtype":
              break;
            case "ptsource":
              break;
            case "cacheindex":
              break;
            case "consolidationreference":
              break;
            case "filename":
              break;
            case "reference":
              break;
            case "nocolumngrand":
              break;
            case "norowgrand":
              break;
            case "blanklineafteritems":
              break;
            case "hidden":
              break;
            case "subtotal":
              break;
            case "basefield":
              break;
            case "mapchilditems":
              break;
            case "function":
              break;
            case "refreshonfileopen":
              break;
            case "printsettitles":
              break;
            case "mergelabels":
              break;
            case "defaultversion":
              break;
            case "refreshname":
              break;
            case "refreshdate":
              break;
            case "refreshdatecopy":
              break;
            case "versionlastrefresh":
              break;
            case "versionlastupdate":
              break;
            case "versionupdateablemin":
              break;
            case "versionrefreshablemin":
              break;
            case "calculation":
              break;
            default:
              Ie = !1;
          }
          break;
        case "pagebreaks":
          switch (c[3]) {
            case "colbreaks":
              break;
            case "colbreak":
              break;
            case "rowbreaks":
              break;
            case "rowbreak":
              break;
            case "colstart":
              break;
            case "colend":
              break;
            case "rowend":
              break;
            default:
              Ie = !1;
          }
          break;
        case "autofilter":
          switch (c[3]) {
            case "autofiltercolumn":
              break;
            case "autofiltercondition":
              break;
            case "autofilterand":
              break;
            case "autofilteror":
              break;
            default:
              Ie = !1;
          }
          break;
        case "querytable":
          switch (c[3]) {
            case "id":
              break;
            case "autoformatfont":
              break;
            case "autoformatpattern":
              break;
            case "querysource":
              break;
            case "querytype":
              break;
            case "enableredirections":
              break;
            case "refreshedinxl9":
              break;
            case "urlstring":
              break;
            case "htmltables":
              break;
            case "connection":
              break;
            case "commandtext":
              break;
            case "refreshinfo":
              break;
            case "notitles":
              break;
            case "nextid":
              break;
            case "columninfo":
              break;
            case "overwritecells":
              break;
            case "donotpromptforfile":
              break;
            case "textwizardsettings":
              break;
            case "source":
              break;
            case "number":
              break;
            case "decimal":
              break;
            case "thousandseparator":
              break;
            case "trailingminusnumbers":
              break;
            case "formatsettings":
              break;
            case "fieldtype":
              break;
            case "delimiters":
              break;
            case "tab":
              break;
            case "comma":
              break;
            case "autoformatname":
              break;
            case "versionlastedit":
              break;
            case "versionlastrefresh":
              break;
            default:
              Ie = !1;
          }
          break;
        case "datavalidation":
          switch (c[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            case "cellrangelist":
              break;
            default:
              Ie = !1;
          }
          break;
        case "sorting":
        case "conditionalformatting":
          switch (c[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "cellrangelist":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            default:
              Ie = !1;
          }
          break;
        case "mapinfo":
        case "schema":
        case "data":
          switch (c[3]) {
            case "map":
              break;
            case "entry":
              break;
            case "range":
              break;
            case "xpath":
              break;
            case "field":
              break;
            case "xsdtype":
              break;
            case "filteron":
              break;
            case "aggregate":
              break;
            case "elementtype":
              break;
            case "attributetype":
              break;
            case "schema":
            case "element":
            case "complextype":
            case "datatype":
            case "all":
            case "attribute":
            case "extends":
              break;
            case "row":
              break;
            default:
              Ie = !1;
          }
          break;
        case "smarttags":
          break;
        default:
          Ie = !1;
          break;
      }
      if (Ie || c[3].match(/!\[CDATA/)) break;
      if (!o[o.length - 1][1]) throw "Unrecognized tag: " + c[3] + "|" + o.join("|");
      if (o[o.length - 1][0] === /*'CustomDocumentProperties'*/
      "customdocumentproperties") {
        if (c[0].slice(-2) === "/>") break;
        c[1] === "/" ? O2(j, N, ae, a.slice(M, c.index)) : (ae = c, M = c.index + c[0].length);
        break;
      }
      if (t.WTF) throw "Unrecognized tag: " + c[3] + "|" + o.join("|");
  }
  var oe = {};
  return !t.bookSheets && !t.bookProps && (oe.Sheets = l), oe.SheetNames = u, oe.Workbook = v, oe.SSF = lr(Ee), oe.Props = J, oe.Custprops = j, oe;
}
function Hi(e, r) {
  switch (I0(r = r || {}), r.type || "base64") {
    case "base64":
      return Ei(Gr(e), r);
    case "binary":
    case "buffer":
    case "file":
      return Ei(e, r);
    case "array":
      return Ei(wa(e), r);
  }
}
function D2(e) {
  var r = {}, t = e.content;
  if (t.l = 28, r.AnsiUserType = t.read_shift(0, "lpstr-ansi"), r.AnsiClipboardFormat = Y1(t), t.length - t.l <= 4) return r;
  var a = t.read_shift(4);
  if (a == 0 || a > 40 || (t.l -= 4, r.Reserved1 = t.read_shift(0, "lpstr-ansi"), t.length - t.l <= 4) || (a = t.read_shift(4), a !== 1907505652) || (r.UnicodeClipboardFormat = J1(t), a = t.read_shift(4), a == 0 || a > 40)) return r;
  t.l -= 4, r.Reserved2 = t.read_shift(0, "lpwstr");
}
var L2 = [60, 1084, 2066, 2165, 2175];
function M2(e, r, t, a, n) {
  var s = a, i = [], c = t.slice(t.l, t.l + s);
  if (n && n.enc && n.enc.insitu && c.length > 0) switch (e) {
    case 9:
    case 521:
    case 1033:
    case 2057:
    case 47:
    case 405:
    case 225:
    case 406:
    case 312:
    case 404:
    case 10:
      break;
    case 133:
      break;
    default:
      n.enc.insitu(c);
  }
  i.push(c), t.l += s;
  for (var o = Rt(t, t.l), f = Gi[o], l = 0; f != null && L2.indexOf(o) > -1; )
    s = Rt(t, t.l + 2), l = t.l + 4, o == 2066 ? l += 4 : (o == 2165 || o == 2175) && (l += 12), c = t.slice(l, t.l + 4 + s), i.push(c), t.l += 4 + s, f = Gi[o = Rt(t, t.l)];
  var u = Xt(i);
  or(u, 0);
  var p = 0;
  u.lens = [];
  for (var h = 0; h < i.length; ++h)
    u.lens.push(p), p += i[h].length;
  if (u.length < a) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + u.length + " < " + a;
  return r.f(u, u.length, n);
}
function ht(e, r, t) {
  if (e.t !== "z" && e.XF) {
    var a = 0;
    try {
      a = e.z || e.XF.numFmtId || 0, r.cellNF && (e.z = Ee[a]);
    } catch (s) {
      if (r.WTF) throw s;
    }
    if (!r || r.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Sa[e.v] : a === 0 || a == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = Pn(e.v) : e.w = ma(e.v) : e.w = Qr(a, e.v, { date1904: !!t, dateNF: r && r.dateNF });
    } catch (s) {
      if (r.WTF) throw s;
    }
    if (r.cellDates && a && e.t == "n" && Xa(Ee[a] || String(a))) {
      var n = ha(e.v);
      n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u));
    }
  }
}
function is(e, r, t) {
  return { v: e, ixfe: r, t };
}
function B2(e, r) {
  var t = { opts: {} }, a = {}, n = r.dense ? [] : {}, s = {}, i = {}, c = null, o = [], f = "", l = {}, u, p = "", h, d, m, x, g = {}, T = [], E, I, D = [], L = [], C = { Sheets: [], WBProps: { date1904: !1 }, Views: [{}] }, z = {}, U = function(ke) {
    return ke < 8 ? pa[ke] : ke < 64 && L[ke - 8] || pa[ke];
  }, J = function(ke, ze, Xr) {
    var Je = ze.XF.data;
    if (!(!Je || !Je.patternType || !Xr || !Xr.cellStyles)) {
      ze.s = {}, ze.s.patternType = Je.patternType;
      var na;
      (na = Ln(U(Je.icvFore))) && (ze.s.fgColor = { rgb: na }), (na = Ln(U(Je.icvBack))) && (ze.s.bgColor = { rgb: na });
    }
  }, j = function(ke, ze, Xr) {
    if (!(b > 1) && !(Xr.sheetRows && ke.r >= Xr.sheetRows)) {
      if (Xr.cellStyles && ze.XF && ze.XF.data && J(ke, ze, Xr), delete ze.ixfe, delete ze.XF, u = ke, p = ge(ke), (!i || !i.s || !i.e) && (i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }), ke.r < i.s.r && (i.s.r = ke.r), ke.c < i.s.c && (i.s.c = ke.c), ke.r + 1 > i.e.r && (i.e.r = ke.r + 1), ke.c + 1 > i.e.c && (i.e.c = ke.c + 1), Xr.cellFormula && ze.f) {
        for (var Je = 0; Je < T.length; ++Je)
          if (!(T[Je][0].s.c > ke.c || T[Je][0].s.r > ke.r) && !(T[Je][0].e.c < ke.c || T[Je][0].e.r < ke.r)) {
            ze.F = Re(T[Je][0]), (T[Je][0].s.c != ke.c || T[Je][0].s.r != ke.r) && delete ze.f, ze.f && (ze.f = "" + _r(T[Je][1], i, ke, B, M));
            break;
          }
      }
      Xr.dense ? (n[ke.r] || (n[ke.r] = []), n[ke.r][ke.c] = ze) : n[p] = ze;
    }
  }, M = {
    enc: !1,
    // encrypted
    sbcch: 0,
    // cch in the preceding SupBook
    snames: [],
    // sheetnames
    sharedf: g,
    // shared formulae by address
    arrayf: T,
    // array formulae array
    rrtabid: [],
    // RRTabId
    lastuser: "",
    // Last User from WriteAccess
    biff: 8,
    // BIFF version
    codepage: 0,
    // CP from CodePage record
    winlocked: 0,
    // fLockWn from WinProtect
    cellStyles: !!r && !!r.cellStyles,
    WTF: !!r && !!r.wtf
  };
  r.password && (M.password = r.password);
  var ae, G = [], V = [], te = [], Z = [], ce = !1, B = [];
  B.SheetNames = M.snames, B.sharedf = M.sharedf, B.arrayf = M.arrayf, B.names = [], B.XTI = [];
  var H = 0, b = 0, y = 0, k = [], v = [], _;
  M.codepage = 1200, ct(1200);
  for (var N = !1; e.l < e.length - 1; ) {
    var Y = e.l, Q = e.read_shift(2);
    if (Q === 0 && H === 10) break;
    var ne = e.l === e.length ? 0 : e.read_shift(2), ee = Gi[Q];
    if (ee && ee.f) {
      if (r.bookSheets && H === 133 && Q !== 133)
        break;
      if (H = Q, ee.r === 2 || ee.r == 12) {
        var pe = e.read_shift(2);
        if (ne -= 2, !M.enc && pe !== Q && ((pe & 255) << 8 | pe >> 8) !== Q) throw new Error("rt mismatch: " + pe + "!=" + Q);
        ee.r == 12 && (e.l += 10, ne -= 10);
      }
      var P = {};
      if (Q === 10 ? P = /*::(*/
      ee.f(e, ne, M) : P = /*::(*/
      M2(Q, ee, e, ne, M), b == 0 && [9, 521, 1033, 2057].indexOf(H) === -1) continue;
      switch (Q) {
        case 34:
          t.opts.Date1904 = C.WBProps.date1904 = P;
          break;
        case 134:
          t.opts.WriteProtect = !0;
          break;
        case 47:
          if (M.enc || (e.l = 0), M.enc = P, !r.password) throw new Error("File is password-protected");
          if (P.valid == null) throw new Error("Encryption scheme unsupported");
          if (!P.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          M.lastuser = P;
          break;
        case 66:
          var be = Number(P);
          switch (be) {
            case 21010:
              be = 1200;
              break;
            case 32768:
              be = 1e4;
              break;
            case 32769:
              be = 1252;
              break;
          }
          ct(M.codepage = be), N = !0;
          break;
        case 317:
          M.rrtabid = P;
          break;
        case 25:
          M.winlocked = P;
          break;
        case 439:
          t.opts.RefreshAll = P;
          break;
        case 12:
          t.opts.CalcCount = P;
          break;
        case 16:
          t.opts.CalcDelta = P;
          break;
        case 17:
          t.opts.CalcIter = P;
          break;
        case 13:
          t.opts.CalcMode = P;
          break;
        case 14:
          t.opts.CalcPrecision = P;
          break;
        case 95:
          t.opts.CalcSaveRecalc = P;
          break;
        case 15:
          M.CalcRefMode = P;
          break;
        case 2211:
          t.opts.FullCalc = P;
          break;
        case 129:
          P.fDialog && (n["!type"] = "dialog"), P.fBelow || ((n["!outline"] || (n["!outline"] = {})).above = !0), P.fRight || ((n["!outline"] || (n["!outline"] = {})).left = !0);
          break;
        case 224:
          D.push(P);
          break;
        case 430:
          B.push([P]), B[B.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          B[B.length - 1].push(P);
          break;
        case 24:
        case 536:
          _ = {
            Name: P.Name,
            Ref: _r(P.rgce, i, null, B, M)
          }, P.itab > 0 && (_.Sheet = P.itab - 1), B.names.push(_), B[0] || (B[0] = [], B[0].XTI = []), B[B.length - 1].push(P), P.Name == "_xlnm._FilterDatabase" && P.itab > 0 && P.rgce && P.rgce[0] && P.rgce[0][0] && P.rgce[0][0][0] == "PtgArea3d" && (v[P.itab - 1] = { ref: Re(P.rgce[0][0][1][2]) });
          break;
        case 22:
          M.ExternCount = P;
          break;
        case 23:
          B.length == 0 && (B[0] = [], B[0].XTI = []), B[B.length - 1].XTI = B[B.length - 1].XTI.concat(P), B.XTI = B.XTI.concat(P);
          break;
        case 2196:
          if (M.biff < 8) break;
          _ != null && (_.Comment = P[1]);
          break;
        case 18:
          n["!protect"] = P;
          break;
        case 19:
          P !== 0 && M.WTF && console.error("Password verifier: " + P);
          break;
        case 133:
          s[P.pos] = P, M.snames.push(P.name);
          break;
        case 10:
          {
            if (--b) break;
            if (i.e) {
              if (i.e.r > 0 && i.e.c > 0) {
                if (i.e.r--, i.e.c--, n["!ref"] = Re(i), r.sheetRows && r.sheetRows <= i.e.r) {
                  var $e = i.e.r;
                  i.e.r = r.sheetRows - 1, n["!fullref"] = n["!ref"], n["!ref"] = Re(i), i.e.r = $e;
                }
                i.e.r++, i.e.c++;
              }
              G.length > 0 && (n["!merges"] = G), V.length > 0 && (n["!objects"] = V), te.length > 0 && (n["!cols"] = te), Z.length > 0 && (n["!rows"] = Z), C.Sheets.push(z);
            }
            f === "" ? l = n : a[f] = n, n = r.dense ? [] : {};
          }
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          {
            if (M.biff === 8 && (M.biff = {
              /*::[*/
              9: 2,
              /*::[*/
              521: 3,
              /*::[*/
              1033: 4
            }[Q] || {
              /*::[*/
              512: 2,
              /*::[*/
              768: 3,
              /*::[*/
              1024: 4,
              /*::[*/
              1280: 5,
              /*::[*/
              1536: 8,
              /*::[*/
              2: 2,
              /*::[*/
              7: 2
            }[P.BIFFVer] || 8), M.biffguess = P.BIFFVer == 0, P.BIFFVer == 0 && P.dt == 4096 && (M.biff = 5, N = !0, ct(M.codepage = 28591)), M.biff == 8 && P.BIFFVer == 0 && P.dt == 16 && (M.biff = 2), b++) break;
            if (n = r.dense ? [] : {}, M.biff < 8 && !N && (N = !0, ct(M.codepage = r.codepage || 1252)), M.biff < 5 || P.BIFFVer == 0 && P.dt == 4096) {
              f === "" && (f = "Sheet1"), i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
              var Ie = { pos: e.l - ne, name: f };
              s[Ie.pos] = Ie, M.snames.push(f);
            } else f = (s[Y] || { name: "" }).name;
            P.dt == 32 && (n["!type"] = "chart"), P.dt == 64 && (n["!type"] = "macro"), G = [], V = [], M.arrayf = T = [], te = [], Z = [], ce = !1, z = { Hidden: (s[Y] || { hs: 0 }).hs, name: f };
          }
          break;
        case 515:
        case 3:
        case 2:
          n["!type"] == "chart" && (r.dense ? (n[P.r] || [])[P.c] : n[ge({ c: P.c, r: P.r })]) && ++P.c, E = { ixfe: P.ixfe, XF: D[P.ixfe] || {}, v: P.val, t: "n" }, y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: P.c, r: P.r }, E, r);
          break;
        case 5:
        case 517:
          E = { ixfe: P.ixfe, XF: D[P.ixfe], v: P.val, t: P.t }, y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: P.c, r: P.r }, E, r);
          break;
        case 638:
          E = { ixfe: P.ixfe, XF: D[P.ixfe], v: P.rknum, t: "n" }, y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: P.c, r: P.r }, E, r);
          break;
        case 189:
          for (var we = P.c; we <= P.C; ++we) {
            var oe = P.rkrec[we - P.c][0];
            E = { ixfe: oe, XF: D[oe], v: P.rkrec[we - P.c][1], t: "n" }, y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: we, r: P.r }, E, r);
          }
          break;
        case 6:
        case 518:
        case 1030:
          {
            if (P.val == "String") {
              c = P;
              break;
            }
            if (E = is(P.val, P.cell.ixfe, P.tt), E.XF = D[E.ixfe], r.cellFormula) {
              var De = P.formula;
              if (De && De[0] && De[0][0] && De[0][0][0] == "PtgExp") {
                var hr = De[0][0][1][0], Pr = De[0][0][1][1], Lr = ge({ r: hr, c: Pr });
                g[Lr] ? E.f = "" + _r(P.formula, i, P.cell, B, M) : E.F = ((r.dense ? (n[hr] || [])[Pr] : n[Lr]) || {}).F;
              } else E.f = "" + _r(P.formula, i, P.cell, B, M);
            }
            y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j(P.cell, E, r), c = P;
          }
          break;
        case 7:
        case 519:
          if (c)
            c.val = P, E = is(P, c.cell.ixfe, "s"), E.XF = D[E.ixfe], r.cellFormula && (E.f = "" + _r(c.formula, i, c.cell, B, M)), y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j(c.cell, E, r), c = null;
          else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            T.push(P);
            var wt = ge(P[0].s);
            if (h = r.dense ? (n[P[0].s.r] || [])[P[0].s.c] : n[wt], r.cellFormula && h) {
              if (!c || !wt || !h) break;
              h.f = "" + _r(P[1], i, P[0], B, M), h.F = Re(P[0]);
            }
          }
          break;
        case 1212:
          {
            if (!r.cellFormula) break;
            if (p) {
              if (!c) break;
              g[ge(c.cell)] = P[0], h = r.dense ? (n[c.cell.r] || [])[c.cell.c] : n[ge(c.cell)], (h || {}).f = "" + _r(P[0], i, u, B, M);
            }
          }
          break;
        case 253:
          E = is(o[P.isst].t, P.ixfe, "s"), o[P.isst].h && (E.h = o[P.isst].h), E.XF = D[E.ixfe], y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: P.c, r: P.r }, E, r);
          break;
        case 513:
          r.sheetStubs && (E = { ixfe: P.ixfe, XF: D[P.ixfe], t: "z" }, y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: P.c, r: P.r }, E, r));
          break;
        case 190:
          if (r.sheetStubs)
            for (var Wr = P.c; Wr <= P.C; ++Wr) {
              var ir = P.ixfe[Wr - P.c];
              E = { ixfe: ir, XF: D[ir], t: "z" }, y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: Wr, r: P.r }, E, r);
            }
          break;
        case 214:
        case 516:
        case 4:
          E = is(P.val, P.ixfe, "s"), E.XF = D[E.ixfe], y > 0 && (E.z = k[E.ixfe >> 8 & 63]), ht(E, r, t.opts.Date1904), j({ c: P.c, r: P.r }, E, r);
          break;
        case 0:
        case 512:
          b === 1 && (i = P);
          break;
        case 252:
          o = P;
          break;
        case 1054:
          if (M.biff == 4) {
            k[y++] = P[1];
            for (var Mr = 0; Mr < y + 163 && Ee[Mr] != P[1]; ++Mr) ;
            Mr >= 163 && da(P[1], y + 163);
          } else da(P[1], P[0]);
          break;
        case 30:
          {
            k[y++] = P;
            for (var Nr = 0; Nr < y + 163 && Ee[Nr] != P; ++Nr) ;
            Nr >= 163 && da(P, y + 163);
          }
          break;
        case 229:
          G = G.concat(P);
          break;
        case 93:
          V[P.cmo[0]] = M.lastobj = P;
          break;
        case 438:
          M.lastobj.TxO = P;
          break;
        case 127:
          M.lastobj.ImData = P;
          break;
        case 440:
          for (x = P[0].s.r; x <= P[0].e.r; ++x)
            for (m = P[0].s.c; m <= P[0].e.c; ++m)
              h = r.dense ? (n[x] || [])[m] : n[ge({ c: m, r: x })], h && (h.l = P[1]);
          break;
        case 2048:
          for (x = P[0].s.r; x <= P[0].e.r; ++x)
            for (m = P[0].s.c; m <= P[0].e.c; ++m)
              h = r.dense ? (n[x] || [])[m] : n[ge({ c: m, r: x })], h && h.l && (h.l.Tooltip = P[1]);
          break;
        case 28:
          {
            if (M.biff <= 5 && M.biff >= 2) break;
            h = r.dense ? (n[P[0].r] || [])[P[0].c] : n[ge(P[0])];
            var Tt = V[P[2]];
            h || (r.dense ? (n[P[0].r] || (n[P[0].r] = []), h = n[P[0].r][P[0].c] = { t: "z" }) : h = n[ge(P[0])] = { t: "z" }, i.e.r = Math.max(i.e.r, P[0].r), i.s.r = Math.min(i.s.r, P[0].r), i.e.c = Math.max(i.e.c, P[0].c), i.s.c = Math.min(i.s.c, P[0].c)), h.c || (h.c = []), d = { a: P[1], t: Tt.TxO.t }, h.c.push(d);
          }
          break;
        case 2173:
          cv(D[P.ixfe], P.ext);
          break;
        case 125:
          {
            if (!M.cellStyles) break;
            for (; P.e >= P.s; )
              te[P.e--] = { width: P.w / 256, level: P.level || 0, hidden: !!(P.flags & 1) }, ce || (ce = !0, $0(P.w / 256)), za(te[P.e + 1]);
          }
          break;
        case 520:
          {
            var ar = {};
            P.level != null && (Z[P.r] = ar, ar.level = P.level), P.hidden && (Z[P.r] = ar, ar.hidden = !0), P.hpt && (Z[P.r] = ar, ar.hpt = P.hpt, ar.hpx = Mn(P.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          n["!margins"] || An(n["!margins"] = {}), n["!margins"][{ 38: "left", 39: "right", 40: "top", 41: "bottom" }[Q]] = P;
          break;
        case 161:
          n["!margins"] || An(n["!margins"] = {}), n["!margins"].header = P.header, n["!margins"].footer = P.footer;
          break;
        case 574:
          P.RTL && (C.Views[0].RTL = !0);
          break;
        case 146:
          L = P;
          break;
        case 2198:
          ae = P;
          break;
        case 140:
          I = P;
          break;
        case 442:
          f ? z.CodeName = P || z.name : C.WBProps.CodeName = P || "ThisWorkbook";
          break;
      }
    } else
      ee || console.error("Missing Info for XLS Record 0x" + Q.toString(16)), e.l += ne;
  }
  return t.SheetNames = _t(s).sort(function(Br, ke) {
    return Number(Br) - Number(ke);
  }).map(function(Br) {
    return s[Br].name;
  }), r.bookSheets || (t.Sheets = a), !t.SheetNames.length && l["!ref"] ? (t.SheetNames.push("Sheet1"), t.Sheets && (t.Sheets.Sheet1 = l)) : t.Preamble = l, t.Sheets && v.forEach(function(Br, ke) {
    t.Sheets[t.SheetNames[ke]]["!autofilter"] = Br;
  }), t.Strings = o, t.SSF = lr(Ee), M.enc && (t.Encryption = M.enc), ae && (t.Themes = ae), t.Metadata = {}, I !== void 0 && (t.Metadata.Country = I), B.names.length > 0 && (C.Names = B.names), t.Workbook = C, t;
}
var Xo = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function U2(e, r, t) {
  var a = Ce.find(e, "/!DocumentSummaryInformation");
  if (a && a.size > 0) try {
    var n = Ro(a, ap, Xo.DSI);
    for (var s in n) r[s] = n[s];
  } catch (f) {
    if (t.WTF) throw f;
  }
  var i = Ce.find(e, "/!SummaryInformation");
  if (i && i.size > 0) try {
    var c = Ro(i, np, Xo.SI);
    for (var o in c) r[o] == null && (r[o] = c[o]);
  } catch (f) {
    if (t.WTF) throw f;
  }
  r.HeadingPairs && r.TitlesOfParts && (au(r.HeadingPairs, r.TitlesOfParts, r, t), delete r.HeadingPairs, delete r.TitlesOfParts);
}
function Uu(e, r) {
  r || (r = {}), I0(r), ml(), r.codepage && l0(r.codepage);
  var t, a;
  if (e.FullPaths) {
    if (Ce.find(e, "/encryption")) throw new Error("File is password-protected");
    t = Ce.find(e, "!CompObj"), a = Ce.find(e, "/Workbook") || Ce.find(e, "/Book");
  } else {
    switch (r.type) {
      case "base64":
        e = st(Gr(e));
        break;
      case "binary":
        e = st(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    or(e, 0), a = { content: e };
  }
  var n, s;
  if (t && D2(t), r.bookProps && !r.bookSheets) n = {};
  else {
    var i = Fe ? "buffer" : "array";
    if (a && a.content) n = B2(a.content, r);
    else if ((s = Ce.find(e, "PerfectOffice_MAIN")) && s.content) n = kn.to_workbook(s.content, (r.type = i, r));
    else if ((s = Ce.find(e, "NativeContent_MAIN")) && s.content) n = kn.to_workbook(s.content, (r.type = i, r));
    else throw (s = Ce.find(e, "MN0")) && s.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    r.bookVBA && e.FullPaths && Ce.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (n.vbaraw = Sv(e));
  }
  var c = {};
  return e.FullPaths && U2(
    /*::((*/
    e,
    c,
    r
  ), n.Props = n.Custprops = c, r.bookFiles && (n.cfb = e), n;
}
var bs = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: y_
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: S_
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: N_
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: C_
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: $_
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: P_
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: L_
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: O_
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: V_
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: j_
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: B_
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: U_
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: A_
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: b_
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: R_
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: F_
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: bu
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: M_
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: I_
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: y0
  },
  /*::[*/
  20: {
    /* n:"BrtPCDIMissing" */
  },
  /*::[*/
  21: {
    /* n:"BrtPCDINumber" */
  },
  /*::[*/
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  /*::[*/
  23: {
    /* n:"BrtPCDIError" */
  },
  /*::[*/
  24: {
    /* n:"BrtPCDIString" */
  },
  /*::[*/
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  /*::[*/
  26: {
    /* n:"BrtPCDIIndex" */
  },
  /*::[*/
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  /*::[*/
  28: {
    /* n:"BrtPCDIANumber" */
  },
  /*::[*/
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  /*::[*/
  30: {
    /* n:"BrtPCDIAError" */
  },
  /*::[*/
  31: {
    /* n:"BrtPCDIAString" */
  },
  /*::[*/
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  /*::[*/
  33: {
    /* n:"BrtPCRRecord" */
  },
  /*::[*/
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  /*::[*/
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  /*::[*/
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  /*::[*/
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  /*::[*/
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  /*::[*/
  39: {
    /* n:"BrtName", */
    f: m2
  },
  /*::[*/
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  /*::[*/
  42: {
    /* n:"BrtIndexBlock" */
  },
  /*::[*/
  43: {
    /* n:"BrtFont", */
    f: Bx
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Mx
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: Ux
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Vx
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: jx
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: H1
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: fv
  },
  /*::[*/
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  /*::[*/
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  /*::[*/
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  /*::[*/
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  /*::[*/
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  /*::[*/
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  /*::[*/
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  /*::[*/
  59: {
    /* n:"BrtStr" */
  },
  /*::[*/
  60: {
    /* n:"BrtColInfo", */
    f: mu
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: D_
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: pv
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: J_
  },
  /*::[*/
  65: {
    /* n:"BrtSxvcellNum" */
  },
  /*::[*/
  66: {
    /* n:"BrtSxvcellStr" */
  },
  /*::[*/
  67: {
    /* n:"BrtSxvcellBool" */
  },
  /*::[*/
  68: {
    /* n:"BrtSxvcellErr" */
  },
  /*::[*/
  69: {
    /* n:"BrtSxvcellDate" */
  },
  /*::[*/
  70: {
    /* n:"BrtSxvcellNil" */
  },
  /*::[*/
  128: {
    /* n:"BrtFileVersion" */
  },
  /*::[*/
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  /*::[*/
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  /*::[*/
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: Tr,
    p: 0
  },
  /*::[*/
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  /*::[*/
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  /*::[*/
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  /*::[*/
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  /*::[*/
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  /*::[*/
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: Y_
  },
  /*::[*/
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  /*::[*/
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  /*::[*/
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  /*::[*/
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  /*::[*/
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  /*::[*/
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  /*::[*/
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  /*::[*/
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  /*::[*/
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  /*::[*/
  147: {
    /* n:"BrtWsProp", */
    f: k_
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: w_,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: z_
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: d2
  },
  /*::[*/
  154: {
    /* n:"BrtWbFactoid" */
  },
  /*::[*/
  155: {
    /* n:"BrtFileRecover" */
  },
  /*::[*/
  156: {
    /* n:"BrtBundleSh", */
    f: h2
  },
  /*::[*/
  157: {
    /* n:"BrtCalcProp" */
  },
  /*::[*/
  158: {
    /* n:"BrtBookView" */
  },
  /*::[*/
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: nx
  },
  /*::[*/
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  /*::[*/
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: ka
  },
  /*::[*/
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  /*::[*/
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  /*::[*/
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  /*::[*/
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  /*::[*/
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  /*::[*/
  167: {
    /* n:"BrtFilter" */
  },
  /*::[*/
  168: {
    /* n:"BrtColorFilter" */
  },
  /*::[*/
  169: {
    /* n:"BrtIconFilter" */
  },
  /*::[*/
  170: {
    /* n:"BrtTop10Filter" */
  },
  /*::[*/
  171: {
    /* n:"BrtDynamicFilter" */
  },
  /*::[*/
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  /*::[*/
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  /*::[*/
  174: {
    /* n:"BrtCustomFilter" */
  },
  /*::[*/
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  /*::[*/
  176: {
    /* n:"BrtMergeCell", */
    f: H_
  },
  /*::[*/
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  /*::[*/
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  /*::[*/
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  /*::[*/
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  /*::[*/
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  /*::[*/
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  /*::[*/
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  /*::[*/
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  /*::[*/
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  /*::[*/
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  /*::[*/
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  /*::[*/
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  /*::[*/
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  /*::[*/
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  /*::[*/
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  /*::[*/
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  /*::[*/
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  /*::[*/
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  /*::[*/
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  /*::[*/
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  /*::[*/
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  /*::[*/
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  /*::[*/
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  /*::[*/
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  /*::[*/
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  /*::[*/
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  /*::[*/
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  /*::[*/
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  /*::[*/
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  /*::[*/
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  /*::[*/
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  /*::[*/
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  /*::[*/
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  /*::[*/
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  /*::[*/
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  /*::[*/
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  /*::[*/
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  /*::[*/
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  /*::[*/
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  /*::[*/
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  /*::[*/
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  /*::[*/
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  /*::[*/
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  /*::[*/
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  /*::[*/
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  /*::[*/
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  /*::[*/
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  /*::[*/
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  /*::[*/
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  /*::[*/
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  /*::[*/
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  /*::[*/
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  /*::[*/
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  /*::[*/
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  /*::[*/
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  /*::[*/
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  /*::[*/
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  /*::[*/
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  /*::[*/
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  /*::[*/
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  /*::[*/
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  /*::[*/
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  /*::[*/
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  /*::[*/
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  /*::[*/
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  /*::[*/
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  /*::[*/
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  /*::[*/
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  /*::[*/
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  /*::[*/
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  /*::[*/
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  /*::[*/
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  /*::[*/
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  /*::[*/
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  /*::[*/
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  /*::[*/
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  /*::[*/
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  /*::[*/
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  /*::[*/
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  /*::[*/
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  /*::[*/
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  /*::[*/
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  /*::[*/
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  /*::[*/
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  /*::[*/
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  /*::[*/
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  /*::[*/
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  /*::[*/
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  /*::[*/
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  /*::[*/
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  /*::[*/
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  /*::[*/
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  /*::[*/
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  /*::[*/
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  /*::[*/
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  /*::[*/
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  /*::[*/
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  /*::[*/
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  /*::[*/
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  /*::[*/
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  /*::[*/
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  /*::[*/
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  /*::[*/
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  /*::[*/
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  /*::[*/
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  /*::[*/
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  /*::[*/
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  /*::[*/
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  /*::[*/
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  /*::[*/
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  /*::[*/
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  /*::[*/
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  /*::[*/
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  /*::[*/
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  /*::[*/
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  /*::[*/
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  /*::[*/
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  /*::[*/
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  /*::[*/
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  /*::[*/
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  /*::[*/
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  /*::[*/
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  /*::[*/
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  /*::[*/
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  /*::[*/
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  /*::[*/
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  /*::[*/
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  /*::[*/
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  /*::[*/
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  /*::[*/
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  /*::[*/
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  /*::[*/
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  /*::[*/
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  /*::[*/
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  /*::[*/
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  /*::[*/
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  /*::[*/
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  /*::[*/
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  /*::[*/
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  /*::[*/
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  /*::[*/
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  /*::[*/
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  /*::[*/
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  /*::[*/
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  /*::[*/
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  /*::[*/
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  /*::[*/
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  /*::[*/
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  /*::[*/
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  /*::[*/
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  /*::[*/
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  /*::[*/
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  /*::[*/
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  /*::[*/
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  /*::[*/
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  /*::[*/
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  /*::[*/
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  /*::[*/
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  /*::[*/
  335: {
    /* n:"BrtMdtinfo", */
    f: ov
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: lv,
    T: 1
  },
  /*::[*/
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  /*::[*/
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  /*::[*/
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  /*::[*/
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  /*::[*/
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  /*::[*/
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  /*::[*/
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  /*::[*/
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  /*::[*/
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  /*::[*/
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  /*::[*/
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  /*::[*/
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  /*::[*/
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  /*::[*/
  351: {
    /* n:"BrtListCCFmla" */
  },
  /*::[*/
  352: {
    /* n:"BrtListTrFmla" */
  },
  /*::[*/
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  /*::[*/
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  /*::[*/
  355: {
    /* n:"BrtSupBookSrc", */
    f: Bi
  },
  /*::[*/
  357: {
    /* n:"BrtSupSelf" */
  },
  /*::[*/
  358: {
    /* n:"BrtSupSame" */
  },
  /*::[*/
  359: {
    /* n:"BrtSupTabs" */
  },
  /*::[*/
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  /*::[*/
  361: {
    /* n:"BrtPlaceholderName" */
  },
  /*::[*/
  362: {
    /* n:"BrtExternSheet", */
    f: pu
  },
  /*::[*/
  363: {
    /* n:"BrtExternTableStart" */
  },
  /*::[*/
  364: {
    /* n:"BrtExternTableEnd" */
  },
  /*::[*/
  366: {
    /* n:"BrtExternRowHdr" */
  },
  /*::[*/
  367: {
    /* n:"BrtExternCellBlank" */
  },
  /*::[*/
  368: {
    /* n:"BrtExternCellReal" */
  },
  /*::[*/
  369: {
    /* n:"BrtExternCellBool" */
  },
  /*::[*/
  370: {
    /* n:"BrtExternCellError" */
  },
  /*::[*/
  371: {
    /* n:"BrtExternCellString" */
  },
  /*::[*/
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  /*::[*/
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  /*::[*/
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  /*::[*/
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  /*::[*/
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  /*::[*/
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  /*::[*/
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  /*::[*/
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  /*::[*/
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  /*::[*/
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  /*::[*/
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  /*::[*/
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  /*::[*/
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  /*::[*/
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  /*::[*/
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  /*::[*/
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  /*::[*/
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  /*::[*/
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  /*::[*/
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  /*::[*/
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  /*::[*/
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  /*::[*/
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  /*::[*/
  396: {
    /* n:"BrtBrk" */
  },
  /*::[*/
  397: {
    /* n:"BrtUserBookView" */
  },
  /*::[*/
  398: {
    /* n:"BrtInfo" */
  },
  /*::[*/
  399: {
    /* n:"BrtCUsr" */
  },
  /*::[*/
  400: {
    /* n:"BrtUsr" */
  },
  /*::[*/
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  /*::[*/
  403: {
    /* n:"BrtEOF" */
  },
  /*::[*/
  404: {
    /* n:"BrtUCR" */
  },
  /*::[*/
  405: {
    /* n:"BrtRRInsDel" */
  },
  /*::[*/
  406: {
    /* n:"BrtRREndInsDel" */
  },
  /*::[*/
  407: {
    /* n:"BrtRRMove" */
  },
  /*::[*/
  408: {
    /* n:"BrtRREndMove" */
  },
  /*::[*/
  409: {
    /* n:"BrtRRChgCell" */
  },
  /*::[*/
  410: {
    /* n:"BrtRREndChgCell" */
  },
  /*::[*/
  411: {
    /* n:"BrtRRHeader" */
  },
  /*::[*/
  412: {
    /* n:"BrtRRUserView" */
  },
  /*::[*/
  413: {
    /* n:"BrtRRRenSheet" */
  },
  /*::[*/
  414: {
    /* n:"BrtRRInsertSh" */
  },
  /*::[*/
  415: {
    /* n:"BrtRRDefName" */
  },
  /*::[*/
  416: {
    /* n:"BrtRRNote" */
  },
  /*::[*/
  417: {
    /* n:"BrtRRConflict" */
  },
  /*::[*/
  418: {
    /* n:"BrtRRTQSIF" */
  },
  /*::[*/
  419: {
    /* n:"BrtRRFormat" */
  },
  /*::[*/
  420: {
    /* n:"BrtRREndFormat" */
  },
  /*::[*/
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  /*::[*/
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  /*::[*/
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  /*::[*/
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  /*::[*/
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  /*::[*/
  426: {
    /* n:"BrtArrFmla", */
    f: W_
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: X_
  },
  /*::[*/
  428: {
    /* n:"BrtTable" */
  },
  /*::[*/
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  /*::[*/
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  /*::[*/
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  /*::[*/
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  /*::[*/
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  /*::[*/
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  /*::[*/
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  /*::[*/
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  /*::[*/
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  /*::[*/
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  /*::[*/
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  /*::[*/
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  /*::[*/
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  /*::[*/
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  /*::[*/
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  /*::[*/
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  /*::[*/
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  /*::[*/
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  /*::[*/
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  /*::[*/
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  /*::[*/
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  /*::[*/
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  /*::[*/
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  /*::[*/
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  /*::[*/
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  /*::[*/
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  /*::[*/
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  /*::[*/
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  /*::[*/
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  /*::[*/
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  /*::[*/
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  /*::[*/
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  /*::[*/
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  /*::[*/
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  /*::[*/
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  /*::[*/
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  /*::[*/
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  /*::[*/
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  /*::[*/
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  /*::[*/
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  /*::[*/
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  /*::[*/
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  /*::[*/
  471: {
    /* n:"BrtCFVO" */
  },
  /*::[*/
  472: {
    /* n:"BrtExternValueMeta" */
  },
  /*::[*/
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  /*::[*/
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  /*::[*/
  475: {
    /* n:"BrtIndexedColor" */
  },
  /*::[*/
  476: {
    /* n:"BrtMargins", */
    f: q_
  },
  /*::[*/
  477: {
    /* n:"BrtPrintOptions" */
  },
  /*::[*/
  478: {
    /* n:"BrtPageSetup" */
  },
  /*::[*/
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  /*::[*/
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  /*::[*/
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  /*::[*/
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  /*::[*/
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  /*::[*/
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  /*::[*/
  485: {
    /* n:"BrtWsFmtInfo", */
    f: T_
  },
  /*::[*/
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  /*::[*/
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  /*::[*/
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  /*::[*/
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  /*::[*/
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  /*::[*/
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  /*::[*/
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  /*::[*/
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  /*::[*/
  494: {
    /* n:"BrtHLink", */
    f: G_
  },
  /*::[*/
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  /*::[*/
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  /*::[*/
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  /*::[*/
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  /*::[*/
  499: {
    /* n:"BrtDRef" */
  },
  /*::[*/
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  /*::[*/
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  /*::[*/
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  /*::[*/
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  /*::[*/
  504: {
    /* n:"BrtSlc" */
  },
  /*::[*/
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  /*::[*/
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  /*::[*/
  507: {
    /* n:"BrtDXF" */
  },
  /*::[*/
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  /*::[*/
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  /*::[*/
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  /*::[*/
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  /*::[*/
  512: {
    /* n:"BrtTableStyleElement" */
  },
  /*::[*/
  513: {
    /* n:"BrtTableStyleClient" */
  },
  /*::[*/
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  /*::[*/
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  /*::[*/
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  /*::[*/
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  /*::[*/
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  /*::[*/
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  /*::[*/
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  /*::[*/
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  /*::[*/
  522: {
    /* n:"BrtVolSubtopic" */
  },
  /*::[*/
  523: {
    /* n:"BrtVolRef" */
  },
  /*::[*/
  524: {
    /* n:"BrtVolNum" */
  },
  /*::[*/
  525: {
    /* n:"BrtVolErr" */
  },
  /*::[*/
  526: {
    /* n:"BrtVolStr" */
  },
  /*::[*/
  527: {
    /* n:"BrtVolBool" */
  },
  /*::[*/
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  /*::[*/
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  /*::[*/
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  /*::[*/
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  /*::[*/
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  /*::[*/
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  /*::[*/
  534: {
    /* n:"BrtBookProtection" */
  },
  /*::[*/
  535: {
    /* n:"BrtSheetProtection" */
  },
  /*::[*/
  536: {
    /* n:"BrtRangeProtection" */
  },
  /*::[*/
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  /*::[*/
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  /*::[*/
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  /*::[*/
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  /*::[*/
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  /*::[*/
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  /*::[*/
  548: {
    /* n:"BrtFileSharing" */
  },
  /*::[*/
  549: {
    /* n:"BrtOleSize" */
  },
  /*::[*/
  550: {
    /* n:"BrtDrawing", */
    f: Bi
  },
  /*::[*/
  551: {
    /* n:"BrtLegacyDrawing" */
  },
  /*::[*/
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  /*::[*/
  553: {
    /* n:"BrtWebOpt" */
  },
  /*::[*/
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  /*::[*/
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  /*::[*/
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  /*::[*/
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  /*::[*/
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  /*::[*/
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  /*::[*/
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  /*::[*/
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  /*::[*/
  562: {
    /* n:"BrtBkHim" */
  },
  /*::[*/
  564: {
    /* n:"BrtColor" */
  },
  /*::[*/
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  /*::[*/
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  /*::[*/
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  /*::[*/
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  /*::[*/
  572: {
    /* n:"BrtMRUColor" */
  },
  /*::[*/
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  /*::[*/
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  /*::[*/
  577: {
    /* n:"BrtSupNameStart" */
  },
  /*::[*/
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  /*::[*/
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  /*::[*/
  580: {
    /* n:"BrtSupNameNum" */
  },
  /*::[*/
  581: {
    /* n:"BrtSupNameErr" */
  },
  /*::[*/
  582: {
    /* n:"BrtSupNameSt" */
  },
  /*::[*/
  583: {
    /* n:"BrtSupNameNil" */
  },
  /*::[*/
  584: {
    /* n:"BrtSupNameBool" */
  },
  /*::[*/
  585: {
    /* n:"BrtSupNameFmla" */
  },
  /*::[*/
  586: {
    /* n:"BrtSupNameBits" */
  },
  /*::[*/
  587: {
    /* n:"BrtSupNameEnd" */
  },
  /*::[*/
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  /*::[*/
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  /*::[*/
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  /*::[*/
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  /*::[*/
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  /*::[*/
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  /*::[*/
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  /*::[*/
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  /*::[*/
  596: {
    /* n:"BrtSmartTagType" */
  },
  /*::[*/
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  /*::[*/
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  /*::[*/
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  /*::[*/
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  /*::[*/
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  /*::[*/
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  /*::[*/
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  /*::[*/
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  /*::[*/
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  /*::[*/
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  /*::[*/
  607: {
    /* n:"BrtCellWatch" */
  },
  /*::[*/
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  /*::[*/
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  /*::[*/
  610: {
    /* n:"BrtCrashRecErr" */
  },
  /*::[*/
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  /*::[*/
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  /*::[*/
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  /*::[*/
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  /*::[*/
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  /*::[*/
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  /*::[*/
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  /*::[*/
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  /*::[*/
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  /*::[*/
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  /*::[*/
  625: {
    /* n:"BrtBigName" */
  },
  /*::[*/
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  /*::[*/
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  /*::[*/
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  /*::[*/
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  /*::[*/
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  /*::[*/
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  /*::[*/
  632: {
    /* n:"BrtCommentAuthor", */
    f: wv
  },
  /*::[*/
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  /*::[*/
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  /*::[*/
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: yv
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: z1
  },
  /*::[*/
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  /*::[*/
  639: {
    /* n:"BrtOleObject" */
  },
  /*::[*/
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  /*::[*/
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  /*::[*/
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  /*::[*/
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  /*::[*/
  644: {
    /* n:"BrtActiveX" */
  },
  /*::[*/
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  /*::[*/
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  /*::[*/
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  /*::[*/
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  /*::[*/
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  /*::[*/
  651: {
    /* n:"BrtCsProp", */
    f: a2
  },
  /*::[*/
  652: {
    /* n:"BrtCsPageSetup" */
  },
  /*::[*/
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  /*::[*/
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  /*::[*/
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  /*::[*/
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  /*::[*/
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  /*::[*/
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  /*::[*/
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  /*::[*/
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  /*::[*/
  661: {
    /* n:"BrtListPart" */
  },
  /*::[*/
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  /*::[*/
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  /*::[*/
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  /*::[*/
  665: {
    /* n:"BrtFnGroup" */
  },
  /*::[*/
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  /*::[*/
  667: {
    /* n:"BrtSupAddin" */
  },
  /*::[*/
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  /*::[*/
  669: {
    /* n:"BrtCsProtection" */
  },
  /*::[*/
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  /*::[*/
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  /*::[*/
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  /*::[*/
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  /*::[*/
  675: {
    /* n:"BrtRRSortItem" */
  },
  /*::[*/
  676: {
    /* n:"BrtFileSharingIso" */
  },
  /*::[*/
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  /*::[*/
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  /*::[*/
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  /*::[*/
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  /*::[*/
  681: {
    /* n:"BrtDValList" */
  },
  /*::[*/
  1024: {
    /* n:"BrtRwDescent" */
  },
  /*::[*/
  1025: {
    /* n:"BrtKnownFonts" */
  },
  /*::[*/
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  /*::[*/
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  /*::[*/
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  /*::[*/
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  /*::[*/
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  /*::[*/
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  /*::[*/
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  /*::[*/
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  /*::[*/
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  /*::[*/
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  /*::[*/
  1036: {
    /* n:"BrtNameExt" */
  },
  /*::[*/
  1037: {
    /* n:"BrtPCDH14" */
  },
  /*::[*/
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  /*::[*/
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  /*::[*/
  1040: {
    /* n:"BrtSXTH14" */
  },
  /*::[*/
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  /*::[*/
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  /*::[*/
  1043: {
    /* n:"BrtSparkline" */
  },
  /*::[*/
  1044: {
    /* n:"BrtSXDI14" */
  },
  /*::[*/
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  /*::[*/
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  /*::[*/
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  /*::[*/
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  /*::[*/
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  /*::[*/
  1050: {
    /* n:"BrtCFVO14" */
  },
  /*::[*/
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  /*::[*/
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  /*::[*/
  1053: {
    /* n:"BrtDVal14", */
    f: Z_
  },
  /*::[*/
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  /*::[*/
  1055: {
    /* n:"BrtColor14" */
  },
  /*::[*/
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  /*::[*/
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  /*::[*/
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  /*::[*/
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  /*::[*/
  1061: {
    /* n:"BrtSXVD14" */
  },
  /*::[*/
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  /*::[*/
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  /*::[*/
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  /*::[*/
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  /*::[*/
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  /*::[*/
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  /*::[*/
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  /*::[*/
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  /*::[*/
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  /*::[*/
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  /*::[*/
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  /*::[*/
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  /*::[*/
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  /*::[*/
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  /*::[*/
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  /*::[*/
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  /*::[*/
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  /*::[*/
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  /*::[*/
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  /*::[*/
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  /*::[*/
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  /*::[*/
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  /*::[*/
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  /*::[*/
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  /*::[*/
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  /*::[*/
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  /*::[*/
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  /*::[*/
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  /*::[*/
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  /*::[*/
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  /*::[*/
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  /*::[*/
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  /*::[*/
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  /*::[*/
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  /*::[*/
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  /*::[*/
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  /*::[*/
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  /*::[*/
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  /*::[*/
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  /*::[*/
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  /*::[*/
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  /*::[*/
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  /*::[*/
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  /*::[*/
  1111: {
    /* n:"BrtList14" */
  },
  /*::[*/
  1112: {
    /* n:"BrtCFIcon" */
  },
  /*::[*/
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  /*::[*/
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  /*::[*/
  1117: {
    /* n:"BrtWbProp14" */
  },
  /*::[*/
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  /*::[*/
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  /*::[*/
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  /*::[*/
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  /*::[*/
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  /*::[*/
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  /*::[*/
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  /*::[*/
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  /*::[*/
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  /*::[*/
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  /*::[*/
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  /*::[*/
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  /*::[*/
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  /*::[*/
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  /*::[*/
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  /*::[*/
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  /*::[*/
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  /*::[*/
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  /*::[*/
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  /*::[*/
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  /*::[*/
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  /*::[*/
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  /*::[*/
  1141: {
    /* n:"BrtPCDField14" */
  },
  /*::[*/
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  /*::[*/
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  /*::[*/
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  /*::[*/
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  /*::[*/
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  /*::[*/
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  /*::[*/
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  /*::[*/
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  /*::[*/
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  /*::[*/
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  /*::[*/
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  /*::[*/
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  /*::[*/
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  /*::[*/
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  /*::[*/
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  /*::[*/
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  /*::[*/
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  /*::[*/
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  /*::[*/
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  /*::[*/
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  /*::[*/
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  /*::[*/
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  /*::[*/
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  /*::[*/
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  /*::[*/
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  /*::[*/
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  /*::[*/
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  /*::[*/
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  /*::[*/
  1171: {
    /* n:"BrtDxf14" */
  },
  /*::[*/
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  /*::[*/
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  /*::[*/
  1177: {
    /* n:"BrtFilter14" */
  },
  /*::[*/
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  /*::[*/
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  /*::[*/
  1181: {
    /* n:"BrtIconFilter14" */
  },
  /*::[*/
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  /*::[*/
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  /*::[*/
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  /*::[*/
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  /*::[*/
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  /*::[*/
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  /*::[*/
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  /*::[*/
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  /*::[*/
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  /*::[*/
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  /*::[*/
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  /*::[*/
  2067: {
    /* n:"BrtQsi15" */
  },
  /*::[*/
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  /*::[*/
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  /*::[*/
  2070: {
    /* n:"BrtWebExtension" */
  },
  /*::[*/
  2071: {
    /* n:"BrtAbsPath15" */
  },
  /*::[*/
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  /*::[*/
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  /*::[*/
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  /*::[*/
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  /*::[*/
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  /*::[*/
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  /*::[*/
  2079: {
    /* n:"BrtSxFilter15" */
  },
  /*::[*/
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  /*::[*/
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  /*::[*/
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  /*::[*/
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  /*::[*/
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  /*::[*/
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  /*::[*/
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  /*::[*/
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  /*::[*/
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  /*::[*/
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  /*::[*/
  2092: {
    /* n:"BrtPCDH15" */
  },
  /*::[*/
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  /*::[*/
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  /*::[*/
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  /*::[*/
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  /*::[*/
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  /*::[*/
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  /*::[*/
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  /*::[*/
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  /*::[*/
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  /*::[*/
  2102: {
    /* n:"BrtDxf15" */
  },
  /*::[*/
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  /*::[*/
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  /*::[*/
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  /*::[*/
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  /*::[*/
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  /*::[*/
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  /*::[*/
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  /*::[*/
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  /*::[*/
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  /*::[*/
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  /*::[*/
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  /*::[*/
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  /*::[*/
  2115: {
    /* n:"BrtTextPr15" */
  },
  /*::[*/
  2116: {
    /* n:"BrtRangePr15" */
  },
  /*::[*/
  2117: {
    /* n:"BrtDbCommand15" */
  },
  /*::[*/
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  /*::[*/
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  /*::[*/
  2120: {
    /* n:"BrtDbTable15" */
  },
  /*::[*/
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  /*::[*/
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  /*::[*/
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  /*::[*/
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  /*::[*/
  2125: {
    /* n:"BrtModelTable" */
  },
  /*::[*/
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  /*::[*/
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  /*::[*/
  2128: {
    /* n:"BrtModelRelationship" */
  },
  /*::[*/
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  /*::[*/
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  /*::[*/
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  /*::[*/
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  /*::[*/
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  /*::[*/
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  /*::[*/
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  /*::[*/
  2136: {
    /* n:"BrtSXDI15" */
  },
  /*::[*/
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  /*::[*/
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  /*::[*/
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  /*::[*/
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  /*::[*/
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  /*::[*/
  3072: {
    /* n:"BrtUid" */
  },
  /*::[*/
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  /*::[*/
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  /*::[*/
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  /*::[*/
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  /*::[*/
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  /*::[*/
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  /*::[*/
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  /*::[*/
  5083: {
    /* n:"BrtRichFilter" */
  },
  /*::[*/
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  /*::[*/
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  /*::[*/
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  /*::[*/
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  /*::[*/
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  /*::[*/
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  /*::[*/
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  /*::[*/
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  /*::[*/
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  /*::[*/
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  /*::[*/
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  /*::[*/
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  /*::[*/
  5097: {
    /* n:"BrtCalcFeature" */
  },
  /*::[*/
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  /*::[*/
  65535: { n: "" }
}, Gi = {
  /* [MS-XLS] 2.3 Record Enumeration 2021-08-17 */
  /*::[*/
  6: {
    /* n:"Formula", */
    f: gi
  },
  /*::[*/
  10: {
    /* n:"EOF", */
    f: Bt
  },
  /*::[*/
  12: {
    /* n:"CalcCount", */
    f: Ye
  },
  //
  /*::[*/
  13: {
    /* n:"CalcMode", */
    f: Ye
  },
  //
  /*::[*/
  14: {
    /* n:"CalcPrecision", */
    f: We
  },
  //
  /*::[*/
  15: {
    /* n:"CalcRefMode", */
    f: We
  },
  //
  /*::[*/
  16: {
    /* n:"CalcDelta", */
    f: Er
  },
  //
  /*::[*/
  17: {
    /* n:"CalcIter", */
    f: We
  },
  //
  /*::[*/
  18: {
    /* n:"Protect", */
    f: We
  },
  /*::[*/
  19: {
    /* n:"Password", */
    f: Ye
  },
  /*::[*/
  20: {
    /* n:"Header", */
    f: No
  },
  /*::[*/
  21: {
    /* n:"Footer", */
    f: No
  },
  /*::[*/
  23: {
    /* n:"ExternSheet", */
    f: pu
  },
  /*::[*/
  24: {
    /* n:"Lbl", */
    f: Do
  },
  /*::[*/
  25: {
    /* n:"WinProtect", */
    f: We
  },
  /*::[*/
  26: {
    /* n:"VerticalPageBreaks", */
  },
  /*::[*/
  27: {
    /* n:"HorizontalPageBreaks", */
  },
  /*::[*/
  28: {
    /* n:"Note", */
    f: _m
  },
  /*::[*/
  29: {
    /* n:"Selection", */
  },
  /*::[*/
  34: {
    /* n:"Date1904", */
    f: We
  },
  /*::[*/
  35: {
    /* n:"ExternName", */
    f: bo
  },
  /*::[*/
  38: {
    /* n:"LeftMargin", */
    f: Er
  },
  // *
  /*::[*/
  39: {
    /* n:"RightMargin", */
    f: Er
  },
  // *
  /*::[*/
  40: {
    /* n:"TopMargin", */
    f: Er
  },
  // *
  /*::[*/
  41: {
    /* n:"BottomMargin", */
    f: Er
  },
  // *
  /*::[*/
  42: {
    /* n:"PrintRowCol", */
    f: We
  },
  /*::[*/
  43: {
    /* n:"PrintGrid", */
    f: We
  },
  /*::[*/
  47: {
    /* n:"FilePass", */
    f: Tx
  },
  /*::[*/
  49: {
    /* n:"Font", */
    f: em
  },
  /*::[*/
  51: {
    /* n:"PrintSize", */
    f: Ye
  },
  /*::[*/
  60: {
    /* n:"Continue", */
  },
  /*::[*/
  61: {
    /* n:"Window1", */
    f: Jp
  },
  /*::[*/
  64: {
    /* n:"Backup", */
    f: We
  },
  /*::[*/
  65: {
    /* n:"Pane", */
    f: Qp
  },
  /*::[*/
  66: {
    /* n:"CodePage", */
    f: Ye
  },
  /*::[*/
  77: {
    /* n:"Pls", */
  },
  /*::[*/
  80: {
    /* n:"DCon", */
  },
  /*::[*/
  81: {
    /* n:"DConRef", */
  },
  /*::[*/
  82: {
    /* n:"DConName", */
  },
  /*::[*/
  85: {
    /* n:"DefColWidth", */
    f: Ye
  },
  /*::[*/
  89: {
    /* n:"XCT", */
  },
  /*::[*/
  90: {
    /* n:"CRN", */
  },
  /*::[*/
  91: {
    /* n:"FileSharing", */
  },
  /*::[*/
  92: {
    /* n:"WriteAccess", */
    f: Hp
  },
  /*::[*/
  93: {
    /* n:"Obj", */
    f: ym
  },
  /*::[*/
  94: {
    /* n:"Uncalced", */
  },
  /*::[*/
  95: {
    /* n:"CalcSaveRecalc", */
    f: We
  },
  //
  /*::[*/
  96: {
    /* n:"Template", */
  },
  /*::[*/
  97: {
    /* n:"Intl", */
  },
  /*::[*/
  99: {
    /* n:"ObjProtect", */
    f: We
  },
  /*::[*/
  125: {
    /* n:"ColInfo", */
    f: mu
  },
  /*::[*/
  128: {
    /* n:"Guts", */
    f: lm
  },
  /*::[*/
  129: {
    /* n:"WsBool", */
    f: Gp
  },
  /*::[*/
  130: {
    /* n:"GridSet", */
    f: Ye
  },
  /*::[*/
  131: {
    /* n:"HCenter", */
    f: We
  },
  /*::[*/
  132: {
    /* n:"VCenter", */
    f: We
  },
  /*::[*/
  133: {
    /* n:"BoundSheet8", */
    f: zp
  },
  /*::[*/
  134: {
    /* n:"WriteProtect", */
  },
  /*::[*/
  140: {
    /* n:"Country", */
    f: $m
  },
  /*::[*/
  141: {
    /* n:"HideObj", */
    f: Ye
  },
  /*::[*/
  144: {
    /* n:"Sort", */
  },
  /*::[*/
  146: {
    /* n:"Palette", */
    f: Cm
  },
  /*::[*/
  151: {
    /* n:"Sync", */
  },
  /*::[*/
  152: {
    /* n:"LPr", */
  },
  /*::[*/
  153: {
    /* n:"DxGCol", */
  },
  /*::[*/
  154: {
    /* n:"FnGroupName", */
  },
  /*::[*/
  155: {
    /* n:"FilterMode", */
  },
  /*::[*/
  156: {
    /* n:"BuiltInFnGroupCount", */
    f: Ye
  },
  /*::[*/
  157: {
    /* n:"AutoFilterInfo", */
  },
  /*::[*/
  158: {
    /* n:"AutoFilter", */
  },
  /*::[*/
  160: {
    /* n:"Scl", */
    f: Nm
  },
  /*::[*/
  161: {
    /* n:"Setup", */
    f: Om
  },
  /*::[*/
  174: {
    /* n:"ScenMan", */
  },
  /*::[*/
  175: {
    /* n:"SCENARIO", */
  },
  /*::[*/
  176: {
    /* n:"SxView", */
  },
  /*::[*/
  177: {
    /* n:"Sxvd", */
  },
  /*::[*/
  178: {
    /* n:"SXVI", */
  },
  /*::[*/
  180: {
    /* n:"SxIvd", */
  },
  /*::[*/
  181: {
    /* n:"SXLI", */
  },
  /*::[*/
  182: {
    /* n:"SXPI", */
  },
  /*::[*/
  184: {
    /* n:"DocRoute", */
  },
  /*::[*/
  185: {
    /* n:"RecipName", */
  },
  /*::[*/
  189: {
    /* n:"MulRk", */
    f: im
  },
  /*::[*/
  190: {
    /* n:"MulBlank", */
    f: cm
  },
  /*::[*/
  193: {
    /* n:"Mms", */
    f: Bt
  },
  /*::[*/
  197: {
    /* n:"SXDI", */
  },
  /*::[*/
  198: {
    /* n:"SXDB", */
  },
  /*::[*/
  199: {
    /* n:"SXFDB", */
  },
  /*::[*/
  200: {
    /* n:"SXDBB", */
  },
  /*::[*/
  201: {
    /* n:"SXNum", */
  },
  /*::[*/
  202: {
    /* n:"SxBool", */
    f: We
  },
  /*::[*/
  203: {
    /* n:"SxErr", */
  },
  /*::[*/
  204: {
    /* n:"SXInt", */
  },
  /*::[*/
  205: {
    /* n:"SXString", */
  },
  /*::[*/
  206: {
    /* n:"SXDtr", */
  },
  /*::[*/
  207: {
    /* n:"SxNil", */
  },
  /*::[*/
  208: {
    /* n:"SXTbl", */
  },
  /*::[*/
  209: {
    /* n:"SXTBRGIITM", */
  },
  /*::[*/
  210: {
    /* n:"SxTbpg", */
  },
  /*::[*/
  211: {
    /* n:"ObProj", */
  },
  /*::[*/
  213: {
    /* n:"SXStreamID", */
  },
  /*::[*/
  215: {
    /* n:"DBCell", */
  },
  /*::[*/
  216: {
    /* n:"SXRng", */
  },
  /*::[*/
  217: {
    /* n:"SxIsxoper", */
  },
  /*::[*/
  218: {
    /* n:"BookBool", */
    f: Ye
  },
  /*::[*/
  220: {
    /* n:"DbOrParamQry", */
  },
  /*::[*/
  221: {
    /* n:"ScenarioProtect", */
    f: We
  },
  /*::[*/
  222: {
    /* n:"OleObjectSize", */
  },
  /*::[*/
  224: {
    /* n:"XF", */
    f: fm
  },
  /*::[*/
  225: {
    /* n:"InterfaceHdr", */
    f: Vp
  },
  /*::[*/
  226: {
    /* n:"InterfaceEnd", */
    f: Bt
  },
  /*::[*/
  227: {
    /* n:"SXVS", */
  },
  /*::[*/
  229: {
    /* n:"MergeCells", */
    f: Em
  },
  /*::[*/
  233: {
    /* n:"BkHim", */
  },
  /*::[*/
  235: {
    /* n:"MsoDrawingGroup", */
  },
  /*::[*/
  236: {
    /* n:"MsoDrawing", */
  },
  /*::[*/
  237: {
    /* n:"MsoDrawingSelection", */
  },
  /*::[*/
  239: {
    /* n:"PhoneticInfo", */
  },
  /*::[*/
  240: {
    /* n:"SxRule", */
  },
  /*::[*/
  241: {
    /* n:"SXEx", */
  },
  /*::[*/
  242: {
    /* n:"SxFilt", */
  },
  /*::[*/
  244: {
    /* n:"SxDXF", */
  },
  /*::[*/
  245: {
    /* n:"SxItm", */
  },
  /*::[*/
  246: {
    /* n:"SxName", */
  },
  /*::[*/
  247: {
    /* n:"SxSelect", */
  },
  /*::[*/
  248: {
    /* n:"SXPair", */
  },
  /*::[*/
  249: {
    /* n:"SxFmla", */
  },
  /*::[*/
  251: {
    /* n:"SxFormat", */
  },
  /*::[*/
  252: {
    /* n:"SST", */
    f: Wp
  },
  /*::[*/
  253: {
    /* n:"LabelSst", */
    f: rm
  },
  /*::[*/
  255: {
    /* n:"ExtSST", */
    f: Xp
  },
  /*::[*/
  256: {
    /* n:"SXVDEx", */
  },
  /*::[*/
  259: {
    /* n:"SXFormula", */
  },
  /*::[*/
  290: {
    /* n:"SXDBEx", */
  },
  /*::[*/
  311: {
    /* n:"RRDInsDel", */
  },
  /*::[*/
  312: {
    /* n:"RRDHead", */
  },
  /*::[*/
  315: {
    /* n:"RRDChgCell", */
  },
  /*::[*/
  317: {
    /* n:"RRTabId", */
    f: ou
  },
  /*::[*/
  318: {
    /* n:"RRDRenSheet", */
  },
  /*::[*/
  319: {
    /* n:"RRSort", */
  },
  /*::[*/
  320: {
    /* n:"RRDMove", */
  },
  /*::[*/
  330: {
    /* n:"RRFormat", */
  },
  /*::[*/
  331: {
    /* n:"RRAutoFmt", */
  },
  /*::[*/
  333: {
    /* n:"RRInsertSh", */
  },
  /*::[*/
  334: {
    /* n:"RRDMoveBegin", */
  },
  /*::[*/
  335: {
    /* n:"RRDMoveEnd", */
  },
  /*::[*/
  336: {
    /* n:"RRDInsDelBegin", */
  },
  /*::[*/
  337: {
    /* n:"RRDInsDelEnd", */
  },
  /*::[*/
  338: {
    /* n:"RRDConflict", */
  },
  /*::[*/
  339: {
    /* n:"RRDDefName", */
  },
  /*::[*/
  340: {
    /* n:"RRDRstEtxp", */
  },
  /*::[*/
  351: {
    /* n:"LRng", */
  },
  /*::[*/
  352: {
    /* n:"UsesELFs", */
    f: We
  },
  /*::[*/
  353: {
    /* n:"DSF", */
    f: Bt
  },
  /*::[*/
  401: {
    /* n:"CUsr", */
  },
  /*::[*/
  402: {
    /* n:"CbUsr", */
  },
  /*::[*/
  403: {
    /* n:"UsrInfo", */
  },
  /*::[*/
  404: {
    /* n:"UsrExcl", */
  },
  /*::[*/
  405: {
    /* n:"FileLock", */
  },
  /*::[*/
  406: {
    /* n:"RRDInfo", */
  },
  /*::[*/
  407: {
    /* n:"BCUsrs", */
  },
  /*::[*/
  408: {
    /* n:"UsrChk", */
  },
  /*::[*/
  425: {
    /* n:"UserBView", */
  },
  /*::[*/
  426: {
    /* n:"UserSViewBegin", */
  },
  /*::[*/
  427: {
    /* n:"UserSViewEnd", */
  },
  /*::[*/
  428: {
    /* n:"RRDUserView", */
  },
  /*::[*/
  429: {
    /* n:"Qsi", */
  },
  /*::[*/
  430: {
    /* n:"SupBook", */
    f: hm
  },
  /*::[*/
  431: {
    /* n:"Prot4Rev", */
    f: We
  },
  /*::[*/
  432: {
    /* n:"CondFmt", */
  },
  /*::[*/
  433: {
    /* n:"CF", */
  },
  /*::[*/
  434: {
    /* n:"DVal", */
  },
  /*::[*/
  437: {
    /* n:"DConBin", */
  },
  /*::[*/
  438: {
    /* n:"TxO", */
    f: km
  },
  /*::[*/
  439: {
    /* n:"RefreshAll", */
    f: We
  },
  //
  /*::[*/
  440: {
    /* n:"HLink", */
    f: Sm
  },
  /*::[*/
  441: {
    /* n:"Lel", */
  },
  /*::[*/
  442: {
    /* n:"CodeName", */
    f: Gn
  },
  /*::[*/
  443: {
    /* n:"SXFDBType", */
  },
  /*::[*/
  444: {
    /* n:"Prot4RevPass", */
    f: Ye
  },
  /*::[*/
  445: {
    /* n:"ObNoMacros", */
  },
  /*::[*/
  446: {
    /* n:"Dv", */
  },
  /*::[*/
  448: {
    /* n:"Excel9File", */
    f: Bt
  },
  /*::[*/
  449: {
    /* n:"RecalcId", */
    f: Yp,
    r: 2
  },
  /*::[*/
  450: {
    /* n:"EntExU2", */
    f: Bt
  },
  /*::[*/
  512: {
    /* n:"Dimensions", */
    f: Io
  },
  /*::[*/
  513: {
    /* n:"Blank", */
    f: Pm
  },
  /*::[*/
  515: {
    /* n:"Number", */
    f: um
  },
  /*::[*/
  516: {
    /* n:"Label", */
    f: tm
  },
  /*::[*/
  517: {
    /* n:"BoolErr", */
    f: Po
  },
  /*::[*/
  519: {
    /* n:"String", */
    f: bm
  },
  /*::[*/
  520: {
    /* n:"Row", */
    f: Kp
  },
  /*::[*/
  523: {
    /* n:"Index", */
  },
  /*::[*/
  545: {
    /* n:"Array", */
    f: Lo
  },
  /*::[*/
  549: {
    /* n:"DefaultRowHeight", */
    f: Oo
  },
  /*::[*/
  566: {
    /* n:"Table", */
  },
  /*::[*/
  574: {
    /* n:"Window2", */
    f: Zp
  },
  /*::[*/
  638: {
    /* n:"RK", */
    f: sm
  },
  /*::[*/
  659: {
    /* n:"Style", */
  },
  /*::[*/
  1048: {
    /* n:"BigName", */
  },
  /*::[*/
  1054: {
    /* n:"Format", */
    f: am
  },
  /*::[*/
  1084: {
    /* n:"ContinueBigName", */
  },
  /*::[*/
  1212: {
    /* n:"ShrFmla", */
    f: xm
  },
  /*::[*/
  2048: {
    /* n:"HLinkTooltip", */
    f: Am
  },
  /*::[*/
  2049: {
    /* n:"WebPub", */
  },
  /*::[*/
  2050: {
    /* n:"QsiSXTag", */
  },
  /*::[*/
  2051: {
    /* n:"DBQueryExt", */
  },
  /*::[*/
  2052: {
    /* n:"ExtString", */
  },
  /*::[*/
  2053: {
    /* n:"TxtQry", */
  },
  /*::[*/
  2054: {
    /* n:"Qsir", */
  },
  /*::[*/
  2055: {
    /* n:"Qsif", */
  },
  /*::[*/
  2056: {
    /* n:"RRDTQSIF", */
  },
  /*::[*/
  2057: {
    /* n:"BOF", */
    f: as
  },
  /*::[*/
  2058: {
    /* n:"OleDbConn", */
  },
  /*::[*/
  2059: {
    /* n:"WOpt", */
  },
  /*::[*/
  2060: {
    /* n:"SXViewEx", */
  },
  /*::[*/
  2061: {
    /* n:"SXTH", */
  },
  /*::[*/
  2062: {
    /* n:"SXPIEx", */
  },
  /*::[*/
  2063: {
    /* n:"SXVDTEx", */
  },
  /*::[*/
  2064: {
    /* n:"SXViewEx9", */
  },
  /*::[*/
  2066: {
    /* n:"ContinueFrt", */
  },
  /*::[*/
  2067: {
    /* n:"RealTimeData", */
  },
  /*::[*/
  2128: {
    /* n:"ChartFrtInfo", */
  },
  /*::[*/
  2129: {
    /* n:"FrtWrapper", */
  },
  /*::[*/
  2130: {
    /* n:"StartBlock", */
  },
  /*::[*/
  2131: {
    /* n:"EndBlock", */
  },
  /*::[*/
  2132: {
    /* n:"StartObject", */
  },
  /*::[*/
  2133: {
    /* n:"EndObject", */
  },
  /*::[*/
  2134: {
    /* n:"CatLab", */
  },
  /*::[*/
  2135: {
    /* n:"YMult", */
  },
  /*::[*/
  2136: {
    /* n:"SXViewLink", */
  },
  /*::[*/
  2137: {
    /* n:"PivotChartBits", */
  },
  /*::[*/
  2138: {
    /* n:"FrtFontList", */
  },
  /*::[*/
  2146: {
    /* n:"SheetExt", */
  },
  /*::[*/
  2147: {
    /* n:"BookExt", */
    r: 12
  },
  /*::[*/
  2148: {
    /* n:"SXAddl", */
  },
  /*::[*/
  2149: {
    /* n:"CrErr", */
  },
  /*::[*/
  2150: {
    /* n:"HFPicture", */
  },
  /*::[*/
  2151: {
    /* n:"FeatHdr", */
    f: Bt
  },
  /*::[*/
  2152: {
    /* n:"Feat", */
  },
  /*::[*/
  2154: {
    /* n:"DataLabExt", */
  },
  /*::[*/
  2155: {
    /* n:"DataLabExtContents", */
  },
  /*::[*/
  2156: {
    /* n:"CellWatch", */
  },
  /*::[*/
  2161: {
    /* n:"FeatHdr11", */
  },
  /*::[*/
  2162: {
    /* n:"Feature11", */
  },
  /*::[*/
  2164: {
    /* n:"DropDownObjIds", */
  },
  /*::[*/
  2165: {
    /* n:"ContinueFrt11", */
  },
  /*::[*/
  2166: {
    /* n:"DConn", */
  },
  /*::[*/
  2167: {
    /* n:"List12", */
  },
  /*::[*/
  2168: {
    /* n:"Feature12", */
  },
  /*::[*/
  2169: {
    /* n:"CondFmt12", */
  },
  /*::[*/
  2170: {
    /* n:"CF12", */
  },
  /*::[*/
  2171: {
    /* n:"CFEx", */
  },
  /*::[*/
  2172: {
    /* n:"XFCRC", */
    f: Rm,
    r: 12
  },
  /*::[*/
  2173: {
    /* n:"XFExt", */
    f: iv,
    r: 12
  },
  /*::[*/
  2174: {
    /* n:"AutoFilter12", */
  },
  /*::[*/
  2175: {
    /* n:"ContinueFrt12", */
  },
  /*::[*/
  2180: {
    /* n:"MDTInfo", */
  },
  /*::[*/
  2181: {
    /* n:"MDXStr", */
  },
  /*::[*/
  2182: {
    /* n:"MDXTuple", */
  },
  /*::[*/
  2183: {
    /* n:"MDXSet", */
  },
  /*::[*/
  2184: {
    /* n:"MDXProp", */
  },
  /*::[*/
  2185: {
    /* n:"MDXKPI", */
  },
  /*::[*/
  2186: {
    /* n:"MDB", */
  },
  /*::[*/
  2187: {
    /* n:"PLV", */
  },
  /*::[*/
  2188: {
    /* n:"Compat12", */
    f: We,
    r: 12
  },
  /*::[*/
  2189: {
    /* n:"DXF", */
  },
  /*::[*/
  2190: {
    /* n:"TableStyles", */
    r: 12
  },
  /*::[*/
  2191: {
    /* n:"TableStyle", */
  },
  /*::[*/
  2192: {
    /* n:"TableStyleElement", */
  },
  /*::[*/
  2194: {
    /* n:"StyleExt", */
  },
  /*::[*/
  2195: {
    /* n:"NamePublish", */
  },
  /*::[*/
  2196: {
    /* n:"NameCmt", */
    f: mm,
    r: 12
  },
  /*::[*/
  2197: {
    /* n:"SortData", */
  },
  /*::[*/
  2198: {
    /* n:"Theme", */
    f: ev,
    r: 12
  },
  /*::[*/
  2199: {
    /* n:"GUIDTypeLib", */
  },
  /*::[*/
  2200: {
    /* n:"FnGrp12", */
  },
  /*::[*/
  2201: {
    /* n:"NameFnGrp12", */
  },
  /*::[*/
  2202: {
    /* n:"MTRSettings", */
    f: vm,
    r: 12
  },
  /*::[*/
  2203: {
    /* n:"CompressPictures", */
    f: Bt
  },
  /*::[*/
  2204: {
    /* n:"HeaderFooter", */
  },
  /*::[*/
  2205: {
    /* n:"CrtLayout12", */
  },
  /*::[*/
  2206: {
    /* n:"CrtMlFrt", */
  },
  /*::[*/
  2207: {
    /* n:"CrtMlFrtContinue", */
  },
  /*::[*/
  2211: {
    /* n:"ForceFullCalculation", */
    f: qp
  },
  /*::[*/
  2212: {
    /* n:"ShapePropsStream", */
  },
  /*::[*/
  2213: {
    /* n:"TextPropsStream", */
  },
  /*::[*/
  2214: {
    /* n:"RichTextStream", */
  },
  /*::[*/
  2215: {
    /* n:"CrtLayout12A", */
  },
  /*::[*/
  4097: {
    /* n:"Units", */
  },
  /*::[*/
  4098: {
    /* n:"Chart", */
  },
  /*::[*/
  4099: {
    /* n:"Series", */
  },
  /*::[*/
  4102: {
    /* n:"DataFormat", */
  },
  /*::[*/
  4103: {
    /* n:"LineFormat", */
  },
  /*::[*/
  4105: {
    /* n:"MarkerFormat", */
  },
  /*::[*/
  4106: {
    /* n:"AreaFormat", */
  },
  /*::[*/
  4107: {
    /* n:"PieFormat", */
  },
  /*::[*/
  4108: {
    /* n:"AttachedLabel", */
  },
  /*::[*/
  4109: {
    /* n:"SeriesText", */
  },
  /*::[*/
  4116: {
    /* n:"ChartFormat", */
  },
  /*::[*/
  4117: {
    /* n:"Legend", */
  },
  /*::[*/
  4118: {
    /* n:"SeriesList", */
  },
  /*::[*/
  4119: {
    /* n:"Bar", */
  },
  /*::[*/
  4120: {
    /* n:"Line", */
  },
  /*::[*/
  4121: {
    /* n:"Pie", */
  },
  /*::[*/
  4122: {
    /* n:"Area", */
  },
  /*::[*/
  4123: {
    /* n:"Scatter", */
  },
  /*::[*/
  4124: {
    /* n:"CrtLine", */
  },
  /*::[*/
  4125: {
    /* n:"Axis", */
  },
  /*::[*/
  4126: {
    /* n:"Tick", */
  },
  /*::[*/
  4127: {
    /* n:"ValueRange", */
  },
  /*::[*/
  4128: {
    /* n:"CatSerRange", */
  },
  /*::[*/
  4129: {
    /* n:"AxisLine", */
  },
  /*::[*/
  4130: {
    /* n:"CrtLink", */
  },
  /*::[*/
  4132: {
    /* n:"DefaultText", */
  },
  /*::[*/
  4133: {
    /* n:"Text", */
  },
  /*::[*/
  4134: {
    /* n:"FontX", */
    f: Ye
  },
  /*::[*/
  4135: {
    /* n:"ObjectLink", */
  },
  /*::[*/
  4146: {
    /* n:"Frame", */
  },
  /*::[*/
  4147: {
    /* n:"Begin", */
  },
  /*::[*/
  4148: {
    /* n:"End", */
  },
  /*::[*/
  4149: {
    /* n:"PlotArea", */
  },
  /*::[*/
  4154: {
    /* n:"Chart3d", */
  },
  /*::[*/
  4156: {
    /* n:"PicF", */
  },
  /*::[*/
  4157: {
    /* n:"DropBar", */
  },
  /*::[*/
  4158: {
    /* n:"Radar", */
  },
  /*::[*/
  4159: {
    /* n:"Surf", */
  },
  /*::[*/
  4160: {
    /* n:"RadarArea", */
  },
  /*::[*/
  4161: {
    /* n:"AxisParent", */
  },
  /*::[*/
  4163: {
    /* n:"LegendException", */
  },
  /*::[*/
  4164: {
    /* n:"ShtProps", */
    f: Im
  },
  /*::[*/
  4165: {
    /* n:"SerToCrt", */
  },
  /*::[*/
  4166: {
    /* n:"AxesUsed", */
  },
  /*::[*/
  4168: {
    /* n:"SBaseRef", */
  },
  /*::[*/
  4170: {
    /* n:"SerParent", */
  },
  /*::[*/
  4171: {
    /* n:"SerAuxTrend", */
  },
  /*::[*/
  4174: {
    /* n:"IFmtRecord", */
  },
  /*::[*/
  4175: {
    /* n:"Pos", */
  },
  /*::[*/
  4176: {
    /* n:"AlRuns", */
  },
  /*::[*/
  4177: {
    /* n:"BRAI", */
  },
  /*::[*/
  4187: {
    /* n:"SerAuxErrBar", */
  },
  /*::[*/
  4188: {
    /* n:"ClrtClient", */
    f: Fm
  },
  /*::[*/
  4189: {
    /* n:"SerFmt", */
  },
  /*::[*/
  4191: {
    /* n:"Chart3DBarShape", */
  },
  /*::[*/
  4192: {
    /* n:"Fbi", */
  },
  /*::[*/
  4193: {
    /* n:"BopPop", */
  },
  /*::[*/
  4194: {
    /* n:"AxcExt", */
  },
  /*::[*/
  4195: {
    /* n:"Dat", */
  },
  /*::[*/
  4196: {
    /* n:"PlotGrowth", */
  },
  /*::[*/
  4197: {
    /* n:"SIIndex", */
  },
  /*::[*/
  4198: {
    /* n:"GelFrame", */
  },
  /*::[*/
  4199: {
    /* n:"BopPopCustom", */
  },
  /*::[*/
  4200: {
    /* n:"Fbi2", */
  },
  /*::[*/
  0: {
    /* n:"Dimensions", */
    f: Io
  },
  /*::[*/
  1: {
    /* n:"BIFF2BLANK", */
  },
  /*::[*/
  2: {
    /* n:"BIFF2INT", */
    f: Bm
  },
  /*::[*/
  3: {
    /* n:"BIFF2NUM", */
    f: Mm
  },
  /*::[*/
  4: {
    /* n:"BIFF2STR", */
    f: Lm
  },
  /*::[*/
  5: {
    /* n:"BoolErr", */
    f: Po
  },
  /*::[*/
  7: {
    /* n:"String", */
    f: Um
  },
  /*::[*/
  8: {
    /* n:"BIFF2ROW", */
  },
  /*::[*/
  9: {
    /* n:"BOF", */
    f: as
  },
  /*::[*/
  11: {
    /* n:"Index", */
  },
  /*::[*/
  22: {
    /* n:"ExternCount", */
    f: Ye
  },
  /*::[*/
  30: {
    /* n:"BIFF2FORMAT", */
    f: nm
  },
  /*::[*/
  31: {
    /* n:"BIFF2FMTCNT", */
  },
  /* 16-bit cnt of BIFF2FORMAT records */
  /*::[*/
  32: {
    /* n:"BIFF2COLINFO", */
  },
  /*::[*/
  33: {
    /* n:"Array", */
    f: Lo
  },
  /*::[*/
  36: {
    /* n:"COLWIDTH", */
  },
  /*::[*/
  37: {
    /* n:"DefaultRowHeight", */
    f: Oo
  },
  // 0x2c ??
  // 0x2d ??
  // 0x2e ??
  // 0x30 FONTCOUNT: number of fonts
  /*::[*/
  50: {
    /* n:"BIFF2FONTXTRA", */
    f: jm
  },
  // 0x35: INFOOPTS
  // 0x36: TABLE (BIFF2 only)
  // 0x37: TABLE2 (BIFF2 only)
  // 0x38: WNDESK
  // 0x39 ??
  // 0x3a: BEGINPREF
  // 0x3b: ENDPREF
  /*::[*/
  62: {
    /* n:"BIFF2WINDOW2", */
  },
  // 0x3f ??
  // 0x46: SHOWSCROLL
  // 0x47: SHOWFORMULA
  // 0x48: STATUSBAR
  // 0x49: SHORTMENUS
  // 0x4A:
  // 0x4B:
  // 0x4C:
  // 0x4E:
  // 0x4F:
  // 0x58: TOOLBAR (BIFF3)
  /* - - - */
  /*::[*/
  52: {
    /* n:"DDEObjName", */
  },
  /*::[*/
  67: {
    /* n:"BIFF2XF", */
  },
  /*::[*/
  68: {
    /* n:"BIFF2XFINDEX", */
    f: Ye
  },
  /*::[*/
  69: {
    /* n:"BIFF2FONTCLR", */
  },
  /*::[*/
  86: {
    /* n:"BIFF4FMTCNT", */
  },
  /* 16-bit cnt, similar to BIFF2 */
  /*::[*/
  126: {
    /* n:"RK", */
  },
  /* Not necessarily same as 0x027e */
  /*::[*/
  127: {
    /* n:"ImData", */
    f: Dm
  },
  /*::[*/
  135: {
    /* n:"Addin", */
  },
  /*::[*/
  136: {
    /* n:"Edg", */
  },
  /*::[*/
  137: {
    /* n:"Pub", */
  },
  // 0x8A
  // 0x8B LH: alternate menu key flag (BIFF3/4)
  // 0x8E
  // 0x8F
  /*::[*/
  145: {
    /* n:"Sub", */
  },
  // 0x93 STYLE
  /*::[*/
  148: {
    /* n:"LHRecord", */
  },
  /*::[*/
  149: {
    /* n:"LHNGraph", */
  },
  /*::[*/
  150: {
    /* n:"Sound", */
  },
  // 0xA2 FNPROTO: function prototypes (BIFF4)
  // 0xA3
  // 0xA8
  /*::[*/
  169: {
    /* n:"CoordList", */
  },
  /*::[*/
  171: {
    /* n:"GCW", */
  },
  /*::[*/
  188: {
    /* n:"ShrFmla", */
  },
  /* Not necessarily same as 0x04bc */
  /*::[*/
  191: {
    /* n:"ToolbarHdr", */
  },
  /*::[*/
  192: {
    /* n:"ToolbarEnd", */
  },
  /*::[*/
  194: {
    /* n:"AddMenu", */
  },
  /*::[*/
  195: {
    /* n:"DelMenu", */
  },
  /*::[*/
  214: {
    /* n:"RString", */
    f: Vm
  },
  /*::[*/
  223: {
    /* n:"UDDesc", */
  },
  /*::[*/
  234: {
    /* n:"TabIdConf", */
  },
  /*::[*/
  354: {
    /* n:"XL5Modify", */
  },
  /*::[*/
  421: {
    /* n:"FileSharing2", */
  },
  /*::[*/
  518: {
    /* n:"Formula", */
    f: gi
  },
  /*::[*/
  521: {
    /* n:"BOF", */
    f: as
  },
  /*::[*/
  536: {
    /* n:"Lbl", */
    f: Do
  },
  /*::[*/
  547: {
    /* n:"ExternName", */
    f: bo
  },
  /*::[*/
  561: {
    /* n:"Font", */
  },
  /*::[*/
  579: {
    /* n:"BIFF3XF", */
  },
  /*::[*/
  1030: {
    /* n:"Formula", */
    f: gi
  },
  /*::[*/
  1033: {
    /* n:"BOF", */
    f: as
  },
  /*::[*/
  1091: {
    /* n:"BIFF4XF", */
  },
  /*::[*/
  2157: {
    /* n:"FeatInfo", */
  },
  /*::[*/
  2163: {
    /* n:"FeatInfo11", */
  },
  /*::[*/
  2177: {
    /* n:"SXAddl12", */
  },
  /*::[*/
  2240: {
    /* n:"AutoWebPub", */
  },
  /*::[*/
  2241: {
    /* n:"ListObj", */
  },
  /*::[*/
  2242: {
    /* n:"ListField", */
  },
  /*::[*/
  2243: {
    /* n:"ListDV", */
  },
  /*::[*/
  2244: {
    /* n:"ListCondFmt", */
  },
  /*::[*/
  2245: {
    /* n:"ListCF", */
  },
  /*::[*/
  2246: {
    /* n:"FMQry", */
  },
  /*::[*/
  2247: {
    /* n:"FMSQry", */
  },
  /*::[*/
  2248: {
    /* n:"PLV", */
  },
  /*::[*/
  2249: {
    /* n:"LnExt", */
  },
  /*::[*/
  2250: {
    /* n:"MkrExt", */
  },
  /*::[*/
  2251: {
    /* n:"CrtCoopt", */
  },
  /*::[*/
  2262: {
    /* n:"FRTArchId$", */
    r: 12
  },
  /*::[*/
  29282: {}
};
function tt(e, r, t, a) {
  var n = r;
  if (!isNaN(n)) {
    var s = (t || []).length || 0, i = e.next(4);
    i.write_shift(2, n), i.write_shift(2, s), /*:: len != null &&*/
    s > 0 && ql(t) && e.push(t);
  }
}
function Ko(e, r) {
  var t = r || {}, a = t.dense ? [] : {};
  e = e.replace(/<!--.*?-->/g, "");
  var n = e.match(/<table/i);
  if (!n) throw new Error("Invalid HTML: could not find <table>");
  var s = e.match(/<\/table/i), i = n.index, c = s && s.index || e.length, o = u1(e.slice(i, c), /(:?<tr[^>]*>)/i, "<tr>"), f = -1, l = 0, u = 0, p = 0, h = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }, d = [];
  for (i = 0; i < o.length; ++i) {
    var m = o[i].trim(), x = m.slice(0, 3).toLowerCase();
    if (x == "<tr") {
      if (++f, t.sheetRows && t.sheetRows <= f) {
        --f;
        break;
      }
      l = 0;
      continue;
    }
    if (!(x != "<td" && x != "<th")) {
      var g = m.split(/<\/t[dh]>/i);
      for (c = 0; c < g.length; ++c) {
        var T = g[c].trim();
        if (T.match(/<t[dh]/i)) {
          for (var E = T, I = 0; E.charAt(0) == "<" && (I = E.indexOf(">")) > -1; ) E = E.slice(I + 1);
          for (var D = 0; D < d.length; ++D) {
            var L = d[D];
            L.s.c == l && L.s.r < f && f <= L.e.r && (l = L.e.c + 1, D = -1);
          }
          var C = me(T.slice(0, T.indexOf(">")));
          p = C.colspan ? +C.colspan : 1, ((u = +C.rowspan) > 1 || p > 1) && d.push({ s: { r: f, c: l }, e: { r: f + (u || 1) - 1, c: l + p - 1 } });
          var z = C.t || C["data-t"] || "";
          if (!E.length) {
            l += p;
            continue;
          }
          if (E = Dl(E), h.s.r > f && (h.s.r = f), h.e.r < f && (h.e.r = f), h.s.c > l && (h.s.c = l), h.e.c < l && (h.e.c = l), !E.length) {
            l += p;
            continue;
          }
          var U = { t: "s", v: E };
          t.raw || !E.trim().length || z == "s" || (E === "TRUE" ? U = { t: "b", v: !0 } : E === "FALSE" ? U = { t: "b", v: !1 } : isNaN(ft(E)) ? isNaN(Ga(E).getDate()) || (U = { t: "d", v: sr(E) }, t.cellDates || (U = { t: "n", v: Or(U.v) }), U.z = t.dateNF || Ee[14]) : U = { t: "n", v: ft(E) }), t.dense ? (a[f] || (a[f] = []), a[f][l] = U) : a[ge({ r: f, c: l })] = U, l += p;
        }
      }
    }
  }
  return a["!ref"] = Re(h), d.length && (a["!merges"] = d), a;
}
function j2(e, r, t, a) {
  for (var n = e["!merges"] || [], s = [], i = r.s.c; i <= r.e.c; ++i) {
    for (var c = 0, o = 0, f = 0; f < n.length; ++f)
      if (!(n[f].s.r > t || n[f].s.c > i) && !(n[f].e.r < t || n[f].e.c < i)) {
        if (n[f].s.r < t || n[f].s.c < i) {
          c = -1;
          break;
        }
        c = n[f].e.r - n[f].s.r + 1, o = n[f].e.c - n[f].s.c + 1;
        break;
      }
    if (!(c < 0)) {
      var l = ge({ r: t, c: i }), u = a.dense ? (e[t] || [])[i] : e[l], p = u && u.v != null && (u.h || x0(u.w || (bt(u), u.w) || "")) || "", h = {};
      c > 1 && (h.rowspan = c), o > 1 && (h.colspan = o), a.editable ? p = '<span contenteditable="true">' + p + "</span>" : u && (h["data-t"] = u && u.t || "z", u.v != null && (h["data-v"] = u.v), u.z != null && (h["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (p = '<a href="' + u.l.Target + '">' + p + "</a>")), h.id = (a.id || "sjs") + "-" + l, s.push($1("td", p, h));
    }
  }
  var d = "<tr>";
  return d + s.join("") + "</tr>";
}
var V2 = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', H2 = "</body></html>";
function G2(e, r) {
  var t = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
  if (!t || t.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (t.length == 1) return aa(Ko(t[0], r), r);
  var a = N0();
  return t.forEach(function(n, s) {
    b0(a, Ko(n, r), "Sheet" + (s + 1));
  }), a;
}
function z2(e, r, t) {
  var a = [];
  return a.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">";
}
function W2(e, r) {
  var t = r || {}, a = t.header != null ? t.header : V2, n = t.footer != null ? t.footer : H2, s = [a], i = Ka(e["!ref"]);
  t.dense = Array.isArray(e), s.push(z2(e, i, t));
  for (var c = i.s.r; c <= i.e.r; ++c) s.push(j2(e, i, c, t));
  return s.push("</table>" + n), s.join("");
}
function ju(e, r, t) {
  var a = t || {}, n = 0, s = 0;
  if (a.origin != null)
    if (typeof a.origin == "number") n = a.origin;
    else {
      var i = typeof a.origin == "string" ? Cr(a.origin) : a.origin;
      n = i.r, s = i.c;
    }
  var c = r.getElementsByTagName("tr"), o = Math.min(a.sheetRows || 1e7, c.length), f = { s: { r: 0, c: 0 }, e: { r: n, c: s } };
  if (e["!ref"]) {
    var l = Ka(e["!ref"]);
    f.s.r = Math.min(f.s.r, l.s.r), f.s.c = Math.min(f.s.c, l.s.c), f.e.r = Math.max(f.e.r, l.e.r), f.e.c = Math.max(f.e.c, l.e.c), n == -1 && (f.e.r = n = l.e.r + 1);
  }
  var u = [], p = 0, h = e["!rows"] || (e["!rows"] = []), d = 0, m = 0, x = 0, g = 0, T = 0, E = 0;
  for (e["!cols"] || (e["!cols"] = []); d < c.length && m < o; ++d) {
    var I = c[d];
    if (qo(I)) {
      if (a.display) continue;
      h[m] = { hidden: !0 };
    }
    var D = I.children;
    for (x = g = 0; x < D.length; ++x) {
      var L = D[x];
      if (!(a.display && qo(L))) {
        var C = L.hasAttribute("data-v") ? L.getAttribute("data-v") : L.hasAttribute("v") ? L.getAttribute("v") : Dl(L.innerHTML), z = L.getAttribute("data-z") || L.getAttribute("z");
        for (p = 0; p < u.length; ++p) {
          var U = u[p];
          U.s.c == g + s && U.s.r < m + n && m + n <= U.e.r && (g = U.e.c + 1 - s, p = -1);
        }
        E = +L.getAttribute("colspan") || 1, ((T = +L.getAttribute("rowspan") || 1) > 1 || E > 1) && u.push({ s: { r: m + n, c: g + s }, e: { r: m + n + (T || 1) - 1, c: g + s + (E || 1) - 1 } });
        var J = { t: "s", v: C }, j = L.getAttribute("data-t") || L.getAttribute("t") || "";
        C != null && (C.length == 0 ? J.t = j || "z" : a.raw || C.trim().length == 0 || j == "s" || (C === "TRUE" ? J = { t: "b", v: !0 } : C === "FALSE" ? J = { t: "b", v: !1 } : isNaN(ft(C)) ? isNaN(Ga(C).getDate()) || (J = { t: "d", v: sr(C) }, a.cellDates || (J = { t: "n", v: Or(J.v) }), J.z = a.dateNF || Ee[14]) : J = { t: "n", v: ft(C) })), J.z === void 0 && z != null && (J.z = z);
        var M = "", ae = L.getElementsByTagName("A");
        if (ae && ae.length) for (var G = 0; G < ae.length && !(ae[G].hasAttribute("href") && (M = ae[G].getAttribute("href"), M.charAt(0) != "#")); ++G) ;
        M && M.charAt(0) != "#" && (J.l = { Target: M }), a.dense ? (e[m + n] || (e[m + n] = []), e[m + n][g + s] = J) : e[ge({ c: g + s, r: m + n })] = J, f.e.c < g + s && (f.e.c = g + s), g += E;
      }
    }
    ++m;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), f.e.r = Math.max(f.e.r, m - 1 + n), e["!ref"] = Re(f), m >= o && (e["!fullref"] = Re((f.e.r = c.length - d + m - 1 + n, f))), e;
}
function Vu(e, r) {
  var t = r || {}, a = t.dense ? [] : {};
  return ju(a, e, r);
}
function X2(e, r) {
  return aa(Vu(e, r), r);
}
function qo(e) {
  var r = "", t = K2(e);
  return t && (r = t(e).getPropertyValue("display")), r || (r = e.style && e.style.display), r === "none";
}
function K2(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function q2(e) {
  var r = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(a, n) {
    return Array(parseInt(n, 10) + 1).join(" ");
  }).replace(/<text:tab[^>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`), t = Oe(r.replace(/<[^>]*>/g, ""));
  return [t];
}
var Yo = {
  /* ods name: [short ssf fmt, long ssf fmt] */
  day: ["d", "dd"],
  month: ["m", "mm"],
  year: ["y", "yy"],
  hours: ["h", "hh"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  "am-pm": ["A/P", "AM/PM"],
  "day-of-week": ["ddd", "dddd"],
  era: ["e", "ee"],
  /* there is no native representation of LO "Q" format */
  quarter: ["\\Qm", 'm\\"th quarter"']
};
function Hu(e, r) {
  var t = r || {}, a = v0(e), n = [], s, i, c = { name: "" }, o = "", f = 0, l, u, p = {}, h = [], d = t.dense ? [] : {}, m, x, g = { value: "" }, T = "", E = 0, I = [], D = -1, L = -1, C = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }, z = 0, U = {}, J = [], j = {}, M = 0, ae = 0, G = [], V = 1, te = 1, Z = [], ce = { Names: [] }, B = {}, H = ["", ""], b = [], y = {}, k = "", v = 0, _ = !1, N = !1, Y = 0;
  for (bn.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); m = bn.exec(a); ) switch (m[3] = m[3].replace(/_.*$/, "")) {
    case "table":
    case "工作表":
      m[1] === "/" ? (C.e.c >= C.s.c && C.e.r >= C.s.r ? d["!ref"] = Re(C) : d["!ref"] = "A1:A1", t.sheetRows > 0 && t.sheetRows <= C.e.r && (d["!fullref"] = d["!ref"], C.e.r = t.sheetRows - 1, d["!ref"] = Re(C)), J.length && (d["!merges"] = J), G.length && (d["!rows"] = G), l.name = l.名称 || l.name, typeof JSON < "u" && JSON.stringify(l), h.push(l.name), p[l.name] = d, N = !1) : m[0].charAt(m[0].length - 2) !== "/" && (l = me(m[0], !1), D = L = -1, C.s.r = C.s.c = 1e7, C.e.r = C.e.c = 0, d = t.dense ? [] : {}, J = [], G = [], N = !0);
      break;
    case "table-row-group":
      m[1] === "/" ? --z : ++z;
      break;
    case "table-row":
    case "行":
      if (m[1] === "/") {
        D += V, V = 1;
        break;
      }
      if (u = me(m[0], !1), u.行号 ? D = u.行号 - 1 : D == -1 && (D = 0), V = +u["number-rows-repeated"] || 1, V < 10) for (Y = 0; Y < V; ++Y) z > 0 && (G[D + Y] = { level: z });
      L = -1;
      break;
    case "covered-table-cell":
      m[1] !== "/" && ++L, t.sheetStubs && (t.dense ? (d[D] || (d[D] = []), d[D][L] = { t: "z" }) : d[ge({ r: D, c: L })] = { t: "z" }), T = "", I = [];
      break;
    case "table-cell":
    case "数据":
      if (m[0].charAt(m[0].length - 2) === "/")
        ++L, g = me(m[0], !1), te = parseInt(g["number-columns-repeated"] || "1", 10), x = {
          t: "z",
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, g.formula && t.cellFormula != !1 && (x.f = Go(Oe(g.formula))), (g.数据类型 || g["value-type"]) == "string" && (x.t = "s", x.v = Oe(g["string-value"] || ""), t.dense ? (d[D] || (d[D] = []), d[D][L] = x) : d[ge({ r: D, c: L })] = x), L += te - 1;
      else if (m[1] !== "/") {
        ++L, T = "", E = 0, I = [], te = 1;
        var Q = V ? D + V - 1 : D;
        if (L > C.e.c && (C.e.c = L), L < C.s.c && (C.s.c = L), D < C.s.r && (C.s.r = D), Q > C.e.r && (C.e.r = Q), g = me(m[0], !1), b = [], y = {}, x = {
          t: g.数据类型 || g["value-type"],
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, t.cellFormula)
          if (g.formula && (g.formula = Oe(g.formula)), g["number-matrix-columns-spanned"] && g["number-matrix-rows-spanned"] && (M = parseInt(g["number-matrix-rows-spanned"], 10) || 0, ae = parseInt(g["number-matrix-columns-spanned"], 10) || 0, j = { s: { r: D, c: L }, e: { r: D + M - 1, c: L + ae - 1 } }, x.F = Re(j), Z.push([j, x.F])), g.formula) x.f = Go(g.formula);
          else for (Y = 0; Y < Z.length; ++Y)
            D >= Z[Y][0].s.r && D <= Z[Y][0].e.r && L >= Z[Y][0].s.c && L <= Z[Y][0].e.c && (x.F = Z[Y][1]);
        switch ((g["number-columns-spanned"] || g["number-rows-spanned"]) && (M = parseInt(g["number-rows-spanned"], 10) || 0, ae = parseInt(g["number-columns-spanned"], 10) || 0, j = { s: { r: D, c: L }, e: { r: D + M - 1, c: L + ae - 1 } }, J.push(j)), g["number-columns-repeated"] && (te = parseInt(g["number-columns-repeated"], 10)), x.t) {
          case "boolean":
            x.t = "b", x.v = Ue(g["boolean-value"]);
            break;
          case "float":
            x.t = "n", x.v = parseFloat(g.value);
            break;
          case "percentage":
            x.t = "n", x.v = parseFloat(g.value);
            break;
          case "currency":
            x.t = "n", x.v = parseFloat(g.value);
            break;
          case "date":
            x.t = "d", x.v = sr(g["date-value"]), t.cellDates || (x.t = "n", x.v = Or(x.v)), x.z = "m/d/yy";
            break;
          case "time":
            x.t = "n", x.v = o1(g["time-value"]) / 86400, t.cellDates && (x.t = "d", x.v = Hs(x.v)), x.z = "HH:MM:SS";
            break;
          case "number":
            x.t = "n", x.v = parseFloat(g.数据数值);
            break;
          default:
            if (x.t === "string" || x.t === "text" || !x.t)
              x.t = "s", g["string-value"] != null && (T = Oe(g["string-value"]), I = []);
            else throw new Error("Unsupported value type " + x.t);
        }
      } else {
        if (_ = !1, x.t === "s" && (x.v = T || "", I.length && (x.R = I), _ = E == 0), B.Target && (x.l = B), b.length > 0 && (x.c = b, b = []), T && t.cellText !== !1 && (x.w = T), _ && (x.t = "z", delete x.v), (!_ || t.sheetStubs) && !(t.sheetRows && t.sheetRows <= D))
          for (var ne = 0; ne < V; ++ne) {
            if (te = parseInt(g["number-columns-repeated"] || "1", 10), t.dense)
              for (d[D + ne] || (d[D + ne] = []), d[D + ne][L] = ne == 0 ? x : lr(x); --te > 0; ) d[D + ne][L + te] = lr(x);
            else
              for (d[ge({ r: D + ne, c: L })] = x; --te > 0; ) d[ge({ r: D + ne, c: L + te })] = lr(x);
            C.e.c <= L && (C.e.c = L);
          }
        te = parseInt(g["number-columns-repeated"] || "1", 10), L += te - 1, te = 0, x = {
          /*:: t:"", v:null, z:null, w:"",c:[]*/
        }, T = "", I = [];
      }
      B = {};
      break;
    case "document":
    case "document-content":
    case "电子表格文档":
    case "spreadsheet":
    case "主体":
    case "scripts":
    case "styles":
    case "font-face-decls":
    case "master-styles":
      if (m[1] === "/") {
        if ((s = n.pop())[0] !== m[3]) throw "Bad state: " + s;
      } else m[0].charAt(m[0].length - 2) !== "/" && n.push([m[3], !0]);
      break;
    case "annotation":
      if (m[1] === "/") {
        if ((s = n.pop())[0] !== m[3]) throw "Bad state: " + s;
        y.t = T, I.length && (y.R = I), y.a = k, b.push(y);
      } else m[0].charAt(m[0].length - 2) !== "/" && n.push([m[3], !1]);
      k = "", v = 0, T = "", E = 0, I = [];
      break;
    case "creator":
      m[1] === "/" ? k = a.slice(v, m.index) : v = m.index + m[0].length;
      break;
    case "meta":
    case "元数据":
    case "settings":
    case "config-item-set":
    case "config-item-map-indexed":
    case "config-item-map-entry":
    case "config-item-map-named":
    case "shapes":
    case "frame":
    case "text-box":
    case "image":
    case "data-pilot-tables":
    case "list-style":
    case "form":
    case "dde-links":
    case "event-listeners":
    case "chart":
      if (m[1] === "/") {
        if ((s = n.pop())[0] !== m[3]) throw "Bad state: " + s;
      } else m[0].charAt(m[0].length - 2) !== "/" && n.push([m[3], !1]);
      T = "", E = 0, I = [];
      break;
    case "scientific-number":
      break;
    case "currency-symbol":
      break;
    case "currency-style":
      break;
    case "number-style":
    case "percentage-style":
    case "date-style":
    case "time-style":
      if (m[1] === "/") {
        if (U[c.name] = o, (s = n.pop())[0] !== m[3]) throw "Bad state: " + s;
      } else m[0].charAt(m[0].length - 2) !== "/" && (o = "", c = me(m[0], !1), n.push([m[3], !0]));
      break;
    case "script":
      break;
    case "libraries":
      break;
    case "automatic-styles":
      break;
    case "default-style":
    case "page-layout":
      break;
    case "style":
      break;
    case "map":
      break;
    case "font-face":
      break;
    case "paragraph-properties":
      break;
    case "table-properties":
      break;
    case "table-column-properties":
      break;
    case "table-row-properties":
      break;
    case "table-cell-properties":
      break;
    case "number":
      switch (n[n.length - 1][0]) {
        case "time-style":
        case "date-style":
          i = me(m[0], !1), o += Yo[m[3]][i.style === "long" ? 1 : 0];
          break;
      }
      break;
    case "fraction":
      break;
    case "day":
    case "month":
    case "year":
    case "era":
    case "day-of-week":
    case "week-of-year":
    case "quarter":
    case "hours":
    case "minutes":
    case "seconds":
    case "am-pm":
      switch (n[n.length - 1][0]) {
        case "time-style":
        case "date-style":
          i = me(m[0], !1), o += Yo[m[3]][i.style === "long" ? 1 : 0];
          break;
      }
      break;
    case "boolean-style":
      break;
    case "boolean":
      break;
    case "text-style":
      break;
    case "text":
      if (m[0].slice(-2) === "/>") break;
      if (m[1] === "/") switch (n[n.length - 1][0]) {
        case "number-style":
        case "date-style":
        case "time-style":
          o += a.slice(f, m.index);
          break;
      }
      else f = m.index + m[0].length;
      break;
    case "named-range":
      i = me(m[0], !1), H = _i(i["cell-range-address"]);
      var ee = { Name: i.name, Ref: H[0] + "!" + H[1] };
      N && (ee.Sheet = h.length), ce.Names.push(ee);
      break;
    case "text-content":
      break;
    case "text-properties":
      break;
    case "embedded-text":
      break;
    case "body":
    case "电子表格":
      break;
    case "forms":
      break;
    case "table-column":
      break;
    case "table-header-rows":
      break;
    case "table-rows":
      break;
    case "table-column-group":
      break;
    case "table-header-columns":
      break;
    case "table-columns":
      break;
    case "null-date":
      break;
    case "graphic-properties":
      break;
    case "calculation-settings":
      break;
    case "named-expressions":
      break;
    case "label-range":
      break;
    case "label-ranges":
      break;
    case "named-expression":
      break;
    case "sort":
      break;
    case "sort-by":
      break;
    case "sort-groups":
      break;
    case "tab":
      break;
    case "line-break":
      break;
    case "span":
      break;
    case "p":
    case "文本串":
      if (["master-styles"].indexOf(n[n.length - 1][0]) > -1) break;
      if (m[1] === "/" && (!g || !g["string-value"])) {
        var pe = q2(a.slice(E, m.index));
        T = (T.length > 0 ? T + `
` : "") + pe[0];
      } else
        me(m[0], !1), E = m.index + m[0].length;
      break;
    case "s":
      break;
    case "database-range":
      if (m[1] === "/") break;
      try {
        H = _i(me(m[0])["target-range-address"]), p[H[0]]["!autofilter"] = { ref: H[1] };
      } catch {
      }
      break;
    case "date":
      break;
    case "object":
      break;
    case "title":
    case "标题":
      break;
    case "desc":
      break;
    case "binary-data":
      break;
    case "table-source":
      break;
    case "scenario":
      break;
    case "iteration":
      break;
    case "content-validations":
      break;
    case "content-validation":
      break;
    case "help-message":
      break;
    case "error-message":
      break;
    case "database-ranges":
      break;
    case "filter":
      break;
    case "filter-and":
      break;
    case "filter-or":
      break;
    case "filter-condition":
      break;
    case "list-level-style-bullet":
      break;
    case "list-level-style-number":
      break;
    case "list-level-properties":
      break;
    case "sender-firstname":
    case "sender-lastname":
    case "sender-initials":
    case "sender-title":
    case "sender-position":
    case "sender-email":
    case "sender-phone-private":
    case "sender-fax":
    case "sender-company":
    case "sender-phone-work":
    case "sender-street":
    case "sender-city":
    case "sender-postal-code":
    case "sender-country":
    case "sender-state-or-province":
    case "author-name":
    case "author-initials":
    case "chapter":
    case "file-name":
    case "template-name":
    case "sheet-name":
      break;
    case "event-listener":
      break;
    case "initial-creator":
    case "creation-date":
    case "print-date":
    case "generator":
    case "document-statistic":
    case "user-defined":
    case "editing-duration":
    case "editing-cycles":
      break;
    case "config-item":
      break;
    case "page-number":
      break;
    case "page-count":
      break;
    case "time":
      break;
    case "cell-range-source":
      break;
    case "detective":
      break;
    case "operation":
      break;
    case "highlighted-range":
      break;
    case "data-pilot-table":
    case "source-cell-range":
    case "source-service":
    case "data-pilot-field":
    case "data-pilot-level":
    case "data-pilot-subtotals":
    case "data-pilot-subtotal":
    case "data-pilot-members":
    case "data-pilot-member":
    case "data-pilot-display-info":
    case "data-pilot-sort-info":
    case "data-pilot-layout-info":
    case "data-pilot-field-reference":
    case "data-pilot-groups":
    case "data-pilot-group":
    case "data-pilot-group-member":
      break;
    case "rect":
      break;
    case "dde-connection-decls":
    case "dde-connection-decl":
    case "dde-link":
    case "dde-source":
      break;
    case "properties":
      break;
    case "property":
      break;
    case "a":
      if (m[1] !== "/") {
        if (B = me(m[0], !1), !B.href) break;
        B.Target = Oe(B.href), delete B.href, B.Target.charAt(0) == "#" && B.Target.indexOf(".") > -1 ? (H = _i(B.Target.slice(1)), B.Target = "#" + H[0] + "!" + H[1]) : B.Target.match(/^\.\.[\\\/]/) && (B.Target = B.Target.slice(3));
      }
      break;
    case "table-protection":
      break;
    case "data-pilot-grand-total":
      break;
    case "office-document-common-attrs":
      break;
    default:
      switch (m[2]) {
        case "dc:":
        case "calcext:":
        case "loext:":
        case "ooo:":
        case "chartooo:":
        case "draw:":
        case "style:":
        case "chart:":
        case "form:":
        case "uof:":
        case "表:":
        case "字:":
          break;
        default:
          if (t.WTF) throw new Error(m);
      }
  }
  var P = {
    Sheets: p,
    SheetNames: h,
    Workbook: ce
  };
  return t.bookSheets && delete /*::(*/
  P.Sheets, P;
}
function Jo(e, r) {
  r = r || {}, Yr(e, "META-INF/manifest.xml") && up(qe(e, "META-INF/manifest.xml"), r);
  var t = Hr(e, "content.xml");
  if (!t) throw new Error("Missing content.xml in ODS / UOF file");
  var a = Hu(Ne(t), r);
  return Yr(e, "meta.xml") && (a.Props = tu(qe(e, "meta.xml"))), a;
}
function Zo(e, r) {
  return Hu(e, r);
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function R0(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function zi(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : Ne(wa(e));
}
function Wi(e) {
  var r = e.reduce(function(n, s) {
    return n + s.length;
  }, 0), t = new Uint8Array(r), a = 0;
  return e.forEach(function(n) {
    t.set(n, a), a += n.length;
  }), t;
}
function Qo(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function Y2(e, r) {
  for (var t = (e[r + 15] & 127) << 7 | e[r + 14] >> 1, a = e[r + 14] & 1, n = r + 13; n >= r; --n)
    a = a * 256 + e[n];
  return (e[r + 15] & 128 ? -a : a) * Math.pow(10, t - 6176);
}
function Bn(e, r) {
  var t = r ? r[0] : 0, a = e[t] & 127;
  e:
    if (e[t++] >= 128 && (a |= (e[t] & 127) << 7, e[t++] < 128 || (a |= (e[t] & 127) << 14, e[t++] < 128) || (a |= (e[t] & 127) << 21, e[t++] < 128) || (a += (e[t] & 127) * Math.pow(2, 28), ++t, e[t++] < 128) || (a += (e[t] & 127) * Math.pow(2, 35), ++t, e[t++] < 128) || (a += (e[t] & 127) * Math.pow(2, 42), ++t, e[t++] < 128)))
      break e;
  return r && (r[0] = t), a;
}
function tr(e) {
  var r = 0, t = e[r] & 127;
  e:
    if (e[r++] >= 128) {
      if (t |= (e[r] & 127) << 7, e[r++] < 128 || (t |= (e[r] & 127) << 14, e[r++] < 128) || (t |= (e[r] & 127) << 21, e[r++] < 128))
        break e;
      t |= (e[r] & 127) << 28;
    }
  return t;
}
function yr(e) {
  for (var r = [], t = [0]; t[0] < e.length; ) {
    var a = t[0], n = Bn(e, t), s = n & 7;
    n = Math.floor(n / 8);
    var i = 0, c;
    if (n == 0)
      break;
    switch (s) {
      case 0:
        {
          for (var o = t[0]; e[t[0]++] >= 128; )
            ;
          c = e.slice(o, t[0]);
        }
        break;
      case 5:
        i = 4, c = e.slice(t[0], t[0] + i), t[0] += i;
        break;
      case 1:
        i = 8, c = e.slice(t[0], t[0] + i), t[0] += i;
        break;
      case 2:
        i = Bn(e, t), c = e.slice(t[0], t[0] + i), t[0] += i;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(s, " for Field ").concat(n, " at offset ").concat(a));
    }
    var f = { data: c, type: s };
    r[n] == null ? r[n] = [f] : r[n].push(f);
  }
  return r;
}
function O0(e, r) {
  return (e == null ? void 0 : e.map(function(t) {
    return r(t.data);
  })) || [];
}
function J2(e) {
  for (var r, t = [], a = [0]; a[0] < e.length; ) {
    var n = Bn(e, a), s = yr(e.slice(a[0], a[0] + n));
    a[0] += n;
    var i = {
      id: tr(s[1][0].data),
      messages: []
    };
    s[2].forEach(function(c) {
      var o = yr(c.data), f = tr(o[3][0].data);
      i.messages.push({
        meta: o,
        data: e.slice(a[0], a[0] + f)
      }), a[0] += f;
    }), (r = s[3]) != null && r[0] && (i.merge = tr(s[3][0].data) >>> 0 > 0), t.push(i);
  }
  return t;
}
function Z2(e, r) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var t = [0], a = Bn(r, t), n = []; t[0] < r.length; ) {
    var s = r[t[0]] & 3;
    if (s == 0) {
      var i = r[t[0]++] >> 2;
      if (i < 60)
        ++i;
      else {
        var c = i - 59;
        i = r[t[0]], c > 1 && (i |= r[t[0] + 1] << 8), c > 2 && (i |= r[t[0] + 2] << 16), c > 3 && (i |= r[t[0] + 3] << 24), i >>>= 0, i++, t[0] += c;
      }
      n.push(r.slice(t[0], t[0] + i)), t[0] += i;
      continue;
    } else {
      var o = 0, f = 0;
      if (s == 1 ? (f = (r[t[0]] >> 2 & 7) + 4, o = (r[t[0]++] & 224) << 3, o |= r[t[0]++]) : (f = (r[t[0]++] >> 2) + 1, s == 2 ? (o = r[t[0]] | r[t[0] + 1] << 8, t[0] += 2) : (o = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0, t[0] += 4)), n = [Wi(n)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > n[0].length)
        throw new Error("Invalid offset beyond length");
      if (f >= o)
        for (n.push(n[0].slice(-o)), f -= o; f >= n[n.length - 1].length; )
          n.push(n[n.length - 1]), f -= n[n.length - 1].length;
      n.push(n[0].slice(-o, -o + f));
    }
  }
  var l = Wi(n);
  if (l.length != a)
    throw new Error("Unexpected length: ".concat(l.length, " != ").concat(a));
  return l;
}
function Q2(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var a = e[t++], n = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
    t += 3, r.push(Z2(a, e.slice(t, t + n))), t += n;
  }
  if (t !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Wi(r);
}
function eE(e, r, t, a) {
  var n = R0(e), s = n.getUint32(4, !0), i = (a > 1 ? 12 : 8) + Qo(s & (a > 1 ? 3470 : 398)) * 4, c = -1, o = -1, f = NaN, l = new Date(2001, 0, 1);
  s & 512 && (c = n.getUint32(i, !0), i += 4), i += Qo(s & (a > 1 ? 12288 : 4096)) * 4, s & 16 && (o = n.getUint32(i, !0), i += 4), s & 32 && (f = n.getFloat64(i, !0), i += 8), s & 64 && (l.setTime(l.getTime() + n.getFloat64(i, !0) * 1e3), i += 8);
  var u;
  switch (e[2]) {
    case 0:
      break;
    case 2:
      u = { t: "n", v: f };
      break;
    case 3:
      u = { t: "s", v: r[o] };
      break;
    case 5:
      u = { t: "d", v: l };
      break;
    case 6:
      u = { t: "b", v: f > 0 };
      break;
    case 7:
      u = { t: "n", v: f / 86400 };
      break;
    case 8:
      u = { t: "e", v: 0 };
      break;
    case 9:
      if (c > -1)
        u = { t: "s", v: t[c] };
      else if (o > -1)
        u = { t: "s", v: r[o] };
      else if (!isNaN(f))
        u = { t: "n", v: f };
      else
        throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
  }
  return u;
}
function rE(e, r, t) {
  var a = R0(e), n = a.getUint32(8, !0), s = 12, i = -1, c = -1, o = NaN, f = NaN, l = new Date(2001, 0, 1);
  n & 1 && (o = Y2(e, s), s += 16), n & 2 && (f = a.getFloat64(s, !0), s += 8), n & 4 && (l.setTime(l.getTime() + a.getFloat64(s, !0) * 1e3), s += 8), n & 8 && (c = a.getUint32(s, !0), s += 4), n & 16 && (i = a.getUint32(s, !0), s += 4);
  var u;
  switch (e[1]) {
    case 0:
      break;
    case 2:
      u = { t: "n", v: o };
      break;
    case 3:
      u = { t: "s", v: r[c] };
      break;
    case 5:
      u = { t: "d", v: l };
      break;
    case 6:
      u = { t: "b", v: f > 0 };
      break;
    case 7:
      u = { t: "n", v: f / 86400 };
      break;
    case 8:
      u = { t: "e", v: 0 };
      break;
    case 9:
      if (i > -1)
        u = { t: "s", v: t[i] };
      else
        throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)));
      break;
    case 10:
      u = { t: "n", v: o };
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)));
  }
  return u;
}
function tE(e, r, t) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
      return eE(e, r, t, e[0]);
    case 5:
      return rE(e, r, t);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}
function Qt(e) {
  var r = yr(e);
  return Bn(r[1][0].data);
}
function ef(e, r) {
  var t = yr(r.data), a = tr(t[1][0].data), n = t[3], s = [];
  return (n || []).forEach(function(i) {
    var c = yr(i.data), o = tr(c[1][0].data) >>> 0;
    switch (a) {
      case 1:
        s[o] = zi(c[3][0].data);
        break;
      case 8:
        {
          var f = e[Qt(c[9][0].data)][0], l = yr(f.data), u = e[Qt(l[1][0].data)][0], p = tr(u.meta[1][0].data);
          if (p != 2001)
            throw new Error("2000 unexpected reference to ".concat(p));
          var h = yr(u.data);
          s[o] = h[3].map(function(d) {
            return zi(d.data);
          }).join("");
        }
        break;
    }
  }), s;
}
function aE(e, r) {
  var t, a, n, s, i, c, o, f, l, u, p, h, d, m, x = yr(e), g = tr(x[1][0].data) >>> 0, T = tr(x[2][0].data) >>> 0, E = ((a = (t = x[8]) == null ? void 0 : t[0]) == null ? void 0 : a.data) && tr(x[8][0].data) > 0 || !1, I, D;
  if ((s = (n = x[7]) == null ? void 0 : n[0]) != null && s.data && r != 0)
    I = (c = (i = x[7]) == null ? void 0 : i[0]) == null ? void 0 : c.data, D = (f = (o = x[6]) == null ? void 0 : o[0]) == null ? void 0 : f.data;
  else if ((u = (l = x[4]) == null ? void 0 : l[0]) != null && u.data && r != 1)
    I = (h = (p = x[4]) == null ? void 0 : p[0]) == null ? void 0 : h.data, D = (m = (d = x[3]) == null ? void 0 : d[0]) == null ? void 0 : m.data;
  else
    throw "NUMBERS Tile missing ".concat(r, " cell storage");
  for (var L = E ? 4 : 1, C = R0(I), z = [], U = 0; U < I.length / 2; ++U) {
    var J = C.getUint16(U * 2, !0);
    J < 65535 && z.push([U, J]);
  }
  if (z.length != T)
    throw "Expected ".concat(T, " cells, found ").concat(z.length);
  var j = [];
  for (U = 0; U < z.length - 1; ++U)
    j[z[U][0]] = D.subarray(z[U][1] * L, z[U + 1][1] * L);
  return z.length >= 1 && (j[z[z.length - 1][0]] = D.subarray(z[z.length - 1][1] * L)), { R: g, cells: j };
}
function nE(e, r) {
  var t, a = yr(r.data), n = (t = a == null ? void 0 : a[7]) != null && t[0] ? tr(a[7][0].data) >>> 0 > 0 ? 1 : 0 : -1, s = O0(a[5], function(i) {
    return aE(i, n);
  });
  return {
    nrows: tr(a[4][0].data) >>> 0,
    data: s.reduce(function(i, c) {
      return i[c.R] || (i[c.R] = []), c.cells.forEach(function(o, f) {
        if (i[c.R][f])
          throw new Error("Duplicate cell r=".concat(c.R, " c=").concat(f));
        i[c.R][f] = o;
      }), i;
    }, [])
  };
}
function sE(e, r, t) {
  var a, n = yr(r.data), s = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (s.e.r = (tr(n[6][0].data) >>> 0) - 1, s.e.r < 0)
    throw new Error("Invalid row varint ".concat(n[6][0].data));
  if (s.e.c = (tr(n[7][0].data) >>> 0) - 1, s.e.c < 0)
    throw new Error("Invalid col varint ".concat(n[7][0].data));
  t["!ref"] = Re(s);
  var i = yr(n[4][0].data), c = ef(e, e[Qt(i[4][0].data)][0]), o = (a = i[17]) != null && a[0] ? ef(e, e[Qt(i[17][0].data)][0]) : [], f = yr(i[3][0].data), l = 0;
  f[1].forEach(function(u) {
    var p = yr(u.data), h = e[Qt(p[2][0].data)][0], d = tr(h.meta[1][0].data);
    if (d != 6002)
      throw new Error("6001 unexpected reference to ".concat(d));
    var m = nE(e, h);
    m.data.forEach(function(x, g) {
      x.forEach(function(T, E) {
        var I = ge({ r: l + g, c: E }), D = tE(T, c, o);
        D && (t[I] = D);
      });
    }), l += m.nrows;
  });
}
function iE(e, r) {
  var t = yr(r.data), a = { "!ref": "A1" }, n = e[Qt(t[2][0].data)], s = tr(n[0].meta[1][0].data);
  if (s != 6001)
    throw new Error("6000 unexpected reference to ".concat(s));
  return sE(e, n[0], a), a;
}
function cE(e, r) {
  var t, a = yr(r.data), n = {
    name: (t = a[1]) != null && t[0] ? zi(a[1][0].data) : "",
    sheets: []
  }, s = O0(a[2], Qt);
  return s.forEach(function(i) {
    e[i].forEach(function(c) {
      var o = tr(c.meta[1][0].data);
      o == 6e3 && n.sheets.push(iE(e, c));
    });
  }), n;
}
function oE(e, r) {
  var t = N0(), a = yr(r.data), n = O0(a[1], Qt);
  if (n.forEach(function(s) {
    e[s].forEach(function(i) {
      var c = tr(i.meta[1][0].data);
      if (c == 2) {
        var o = cE(e, i);
        o.sheets.forEach(function(f, l) {
          b0(t, f, l == 0 ? o.name : o.name + "_" + l, !0);
        });
      }
    });
  }), t.SheetNames.length == 0)
    throw new Error("Empty NUMBERS file");
  return t;
}
function yi(e) {
  var r, t, a, n, s = {}, i = [];
  if (e.FullPaths.forEach(function(o) {
    if (o.match(/\.iwpv2/))
      throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function(o) {
    if (o.name.match(/\.iwa$/)) {
      var f;
      try {
        f = Q2(o.content);
      } catch (u) {
        return console.log("?? " + o.content.length + " " + (u.message || u));
      }
      var l;
      try {
        l = J2(f);
      } catch (u) {
        return console.log("## " + (u.message || u));
      }
      l.forEach(function(u) {
        s[u.id] = u.messages, i.push(u.id);
      });
    }
  }), !i.length)
    throw new Error("File has no messages");
  var c = ((n = (a = (t = (r = s == null ? void 0 : s[1]) == null ? void 0 : r[0]) == null ? void 0 : t.meta) == null ? void 0 : a[1]) == null ? void 0 : n[0].data) && tr(s[1][0].meta[1][0].data) == 1 && s[1][0];
  if (c || i.forEach(function(o) {
    s[o].forEach(function(f) {
      var l = tr(f.meta[1][0].data) >>> 0;
      if (l == 1)
        if (!c)
          c = f;
        else
          throw new Error("Document has multiple roots");
    });
  }), !c)
    throw new Error("Cannot find Document root");
  return oE(s, c);
}
function fE(e) {
  return function(t) {
    for (var a = 0; a != e.length; ++a) {
      var n = e[a];
      t[n[0]] === void 0 && (t[n[0]] = n[1]), n[2] === "n" && (t[n[0]] = Number(t[n[0]]));
    }
  };
}
function I0(e) {
  fE([
    ["cellNF", !1],
    /* emit cell number format string as .z */
    ["cellHTML", !0],
    /* emit html string as .h */
    ["cellFormula", !0],
    /* emit formulae as .f */
    ["cellStyles", !1],
    /* emits style/theme as .s */
    ["cellText", !0],
    /* emit formatted text as .w */
    ["cellDates", !1],
    /* emit date cells with type `d` */
    ["sheetStubs", !1],
    /* emit empty cells */
    ["sheetRows", 0, "n"],
    /* read n rows (0 = read all rows) */
    ["bookDeps", !1],
    /* parse calculation chains */
    ["bookSheets", !1],
    /* only try to get sheet names (no Sheets) */
    ["bookProps", !1],
    /* only try to get properties (no Sheets) */
    ["bookFiles", !1],
    /* include raw file structure (keys, files, cfb) */
    ["bookVBA", !1],
    /* include vba raw data (vbaraw) */
    ["password", ""],
    /* password */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function lE(e) {
  return Da.WS.indexOf(e) > -1 ? "sheet" : e == Da.CS ? "chart" : e == Da.DS ? "dialog" : e == Da.MS ? "macro" : e && e.length ? e : "sheet";
}
function uE(e, r) {
  if (!e) return 0;
  try {
    e = r.map(function(a) {
      return a.id || (a.id = a.strRelID), [a.name, e["!id"][a.id].Target, lE(e["!id"][a.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}
function hE(e, r, t, a, n, s, i, c, o, f, l, u) {
  try {
    s[a] = wn(Hr(e, t, !0), r);
    var p = qe(e, r), h;
    switch (c) {
      case "sheet":
        h = g2(p, r, n, o, s[a], f, l, u);
        break;
      case "chart":
        if (h = _2(p, r, n, o, s[a], f, l, u), !h || !h["!drawel"]) break;
        var d = mn(h["!drawel"].Target, r), m = Ui(d), x = vv(Hr(e, d, !0), wn(Hr(e, m, !0), d)), g = mn(x, d), T = Ui(g);
        h = r2(Hr(e, g, !0), g, o, wn(Hr(e, T, !0), g), f, h);
        break;
      case "macro":
        h = E2(p, r, n, o, s[a], f, l, u);
        break;
      case "dialog":
        h = y2(p, r, n, o, s[a], f, l, u);
        break;
      default:
        throw new Error("Unrecognized sheet type " + c);
    }
    i[a] = h;
    var E = [];
    s && s[a] && _t(s[a]).forEach(function(I) {
      var D = "";
      if (s[a][I].Type == Da.CMNT) {
        D = mn(s[a][I].Target, r);
        var L = S2(qe(e, D, !0), D, o);
        if (!L || !L.length) return;
        Bo(h, L, !1);
      }
      s[a][I].Type == Da.TCMNT && (D = mn(s[a][I].Target, r), E = E.concat(_v(qe(e, D, !0), o)));
    }), E && E.length && Bo(h, E, !0, o.people || []);
  } catch (I) {
    if (o.WTF) throw I;
  }
}
function Kr(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}
function dE(e, r) {
  if ($l(), r = r || {}, I0(r), Yr(e, "META-INF/manifest.xml") || Yr(e, "objectdata.xml")) return Jo(e, r);
  if (Yr(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof yi < "u") {
      if (e.FileIndex) return yi(e);
      var t = Ce.utils.cfb_new();
      return uo(e).forEach(function(G) {
        p1(t, G, d1(e, G));
      }), yi(t);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!Yr(e, "[Content_Types].xml"))
    throw Yr(e, "index.xml.gz") ? new Error("Unsupported NUMBERS 08 file") : Yr(e, "index.xml") ? new Error("Unsupported NUMBERS 09 file") : new Error("Unsupported ZIP file");
  var a = uo(e), n = fp(Hr(e, "[Content_Types].xml")), s = !1, i, c;
  if (n.workbooks.length === 0 && (c = "xl/workbook.xml", qe(e, c, !0) && n.workbooks.push(c)), n.workbooks.length === 0) {
    if (c = "xl/workbook.bin", !qe(e, c, !0)) throw new Error("Could not find workbook");
    n.workbooks.push(c), s = !0;
  }
  n.workbooks[0].slice(-3) == "bin" && (s = !0);
  var o = {}, f = {};
  if (!r.bookSheets && !r.bookProps) {
    if (Sn = [], n.sst) try {
      Sn = k2(qe(e, Kr(n.sst)), n.sst, r);
    } catch (G) {
      if (r.WTF) throw G;
    }
    r.cellStyles && n.themes.length && (o = T2(Hr(e, n.themes[0].replace(/^\//, ""), !0) || "", n.themes[0], r)), n.style && (f = w2(qe(e, Kr(n.style)), n.style, o, r));
  }
  n.links.map(function(G) {
    try {
      var V = wn(Hr(e, Ui(Kr(G))), G);
      return $2(qe(e, Kr(G)), V, G, r);
    } catch {
    }
  });
  var l = v2(qe(e, Kr(n.workbooks[0])), n.workbooks[0], r), u = {}, p = "";
  n.coreprops.length && (p = qe(e, Kr(n.coreprops[0]), !0), p && (u = tu(p)), n.extprops.length !== 0 && (p = qe(e, Kr(n.extprops[0]), !0), p && pp(p, u, r)));
  var h = {};
  (!r.bookSheets || r.bookProps) && n.custprops.length !== 0 && (p = Hr(e, Kr(n.custprops[0]), !0), p && (h = xp(p, r)));
  var d = {};
  if ((r.bookSheets || r.bookProps) && (l.Sheets ? i = l.Sheets.map(function(V) {
    return V.name;
  }) : u.Worksheets && u.SheetNames.length > 0 && (i = u.SheetNames), r.bookProps && (d.Props = u, d.Custprops = h), r.bookSheets && typeof i < "u" && (d.SheetNames = i), r.bookSheets ? d.SheetNames : r.bookProps))
    return d;
  i = {};
  var m = {};
  r.bookDeps && n.calcchain && (m = A2(qe(e, Kr(n.calcchain)), n.calcchain));
  var x = 0, g = {}, T, E;
  {
    var I = l.Sheets;
    u.Worksheets = I.length, u.SheetNames = [];
    for (var D = 0; D != I.length; ++D)
      u.SheetNames[D] = I[D].name;
  }
  var L = s ? "bin" : "xml", C = n.workbooks[0].lastIndexOf("/"), z = (n.workbooks[0].slice(0, C + 1) + "_rels/" + n.workbooks[0].slice(C + 1) + ".rels").replace(/^\//, "");
  Yr(e, z) || (z = "xl/_rels/workbook." + L + ".rels");
  var U = wn(Hr(e, z, !0), z.replace(/_rels.*/, "s5s"));
  (n.metadata || []).length >= 1 && (r.xlmeta = F2(qe(e, Kr(n.metadata[0])), n.metadata[0], r)), (n.people || []).length >= 1 && (r.people = Ev(qe(e, Kr(n.people[0])), r)), U && (U = uE(U, l.Sheets));
  var J = qe(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (x = 0; x != u.Worksheets; ++x) {
    var j = "sheet";
    if (U && U[x] ? (T = "xl/" + U[x][1].replace(/[\/]?xl\//, ""), Yr(e, T) || (T = U[x][1]), Yr(e, T) || (T = z.replace(/_rels\/.*$/, "") + U[x][1]), j = U[x][2]) : (T = "xl/worksheets/sheet" + (x + 1 - J) + "." + L, T = T.replace(/sheet0\./, "sheet.")), E = T.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), r && r.sheets != null) switch (typeof r.sheets) {
      case "number":
        if (x != r.sheets) continue e;
        break;
      case "string":
        if (u.SheetNames[x].toLowerCase() != r.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(r.sheets)) {
          for (var M = !1, ae = 0; ae != r.sheets.length; ++ae)
            typeof r.sheets[ae] == "number" && r.sheets[ae] == x && (M = 1), typeof r.sheets[ae] == "string" && r.sheets[ae].toLowerCase() == u.SheetNames[x].toLowerCase() && (M = 1);
          if (!M) continue e;
        }
    }
    hE(e, T, E, u.SheetNames[x], x, g, i, j, r, l, o, f);
  }
  return d = {
    Directory: n,
    Workbook: l,
    Props: u,
    Custprops: h,
    Deps: m,
    Sheets: i,
    SheetNames: u.SheetNames,
    Strings: Sn,
    Styles: f,
    Themes: o,
    SSF: lr(Ee)
  }, r && r.bookFiles && (e.files ? (d.keys = a, d.files = e.files) : (d.keys = [], d.files = {}, e.FullPaths.forEach(function(G, V) {
    G = G.replace(/^Root Entry[\/]/, ""), d.keys.push(G), d.files[G] = e.FileIndex[V];
  }))), r && r.bookVBA && (n.vba.length > 0 ? d.vbaraw = qe(e, Kr(n.vba[0]), !0) : n.defaults && n.defaults.bin === kv && (d.vbaraw = qe(e, "xl/vbaProject.bin", !0))), d;
}
function pE(e, r) {
  var t = r || {}, a = "Workbook", n = Ce.find(e, a);
  try {
    if (a = "/!DataSpaces/Version", n = Ce.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    if (ix(n.content), a = "/!DataSpaces/DataSpaceMap", n = Ce.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var s = ox(n.content);
    if (s.length !== 1 || s[0].comps.length !== 1 || s[0].comps[0].t !== 0 || s[0].name !== "StrongEncryptionDataSpace" || s[0].comps[0].v !== "EncryptedPackage")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", n = Ce.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var i = fx(n.content);
    if (i.length != 1 || i[0] != "StrongEncryptionTransform")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", n = Ce.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    ux(n.content);
  } catch {
  }
  if (a = "/EncryptionInfo", n = Ce.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  var c = hx(n.content);
  if (a = "/EncryptedPackage", n = Ce.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  if (c[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(c[1], n.content, t.password || "", t);
  if (c[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(c[1], n.content, t.password || "", t);
  throw new Error("File is password-protected");
}
function P0(e, r) {
  var t = "";
  switch ((r || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      t = Gr(e.slice(0, 12));
      break;
    case "binary":
      t = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (r && r.type || "undefined"));
  }
  return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3), t.charCodeAt(4), t.charCodeAt(5), t.charCodeAt(6), t.charCodeAt(7)];
}
function mE(e, r) {
  return Ce.find(e, "EncryptedPackage") ? pE(e, r) : Uu(e, r);
}
function xE(e, r) {
  var t, a = e, n = r || {};
  return n.type || (n.type = Fe && Buffer.isBuffer(e) ? "buffer" : "base64"), t = Pl(a, n), dE(t, n);
}
function Gu(e, r) {
  var t = 0;
  e: for (; t < e.length; ) switch (e.charCodeAt(t)) {
    case 10:
    case 13:
    case 32:
      ++t;
      break;
    case 60:
      return Hi(e.slice(t), r);
    default:
      break e;
  }
  return Dn.to_workbook(e, r);
}
function vE(e, r) {
  var t = "", a = P0(e, r);
  switch (r.type) {
    case "base64":
      t = Gr(e);
      break;
    case "binary":
      t = e;
      break;
    case "buffer":
      t = e.toString("binary");
      break;
    case "array":
      t = xa(e);
      break;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  return a[0] == 239 && a[1] == 187 && a[2] == 191 && (t = Ne(t)), r.type = "binary", Gu(t, r);
}
function gE(e, r) {
  var t = e;
  return r.type == "base64" && (t = Gr(t)), t = Wt.utils.decode(1200, t.slice(2), "str"), r.type = "binary", Gu(t, r);
}
function _E(e) {
  return e.match(/[^\x00-\x7F]/) ? xn(e) : e;
}
function wi(e, r, t, a) {
  return a ? (t.type = "string", Dn.to_workbook(e, t)) : Dn.to_workbook(r, t);
}
function Xi(e, r) {
  ml();
  var t = r || {};
  if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return Xi(new Uint8Array(e), (t = lr(t), t.type = "array", t));
  typeof Uint8Array < "u" && e instanceof Uint8Array && !t.type && (t.type = typeof Deno < "u" ? "buffer" : "array");
  var a = e, n = [0, 0, 0, 0], s = !1;
  if (t.cellStyles && (t.cellNF = !0, t.sheetStubs = !0), Ua = {}, t.dateNF && (Ua.dateNF = t.dateNF), t.type || (t.type = Fe && Buffer.isBuffer(e) ? "buffer" : "base64"), t.type == "file" && (t.type = Fe ? "buffer" : "binary", a = i1(e), typeof Uint8Array < "u" && !Fe && (t.type = "array")), t.type == "string" && (s = !0, t.type = "binary", t.codepage = 65001, a = _E(e)), t.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var i = new ArrayBuffer(3), c = new Uint8Array(i);
    if (c.foo = "bar", !c.foo)
      return t = lr(t), t.type = "array", Xi(u0(a), t);
  }
  switch ((n = P0(a, t))[0]) {
    case 208:
      if (n[1] === 207 && n[2] === 17 && n[3] === 224 && n[4] === 161 && n[5] === 177 && n[6] === 26 && n[7] === 225) return mE(Ce.read(a, t), t);
      break;
    case 9:
      if (n[1] <= 8) return Uu(a, t);
      break;
    case 60:
      return Hi(a, t);
    case 73:
      if (n[1] === 73 && n[2] === 42 && n[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (n[1] === 68) return Xm(a, t);
      break;
    case 84:
      if (n[1] === 65 && n[2] === 66 && n[3] === 76) return zm.to_workbook(a, t);
      break;
    case 80:
      return n[1] === 75 && n[2] < 9 && n[3] < 9 ? xE(a, t) : wi(e, a, t, s);
    case 239:
      return n[3] === 60 ? Hi(a, t) : wi(e, a, t, s);
    case 255:
      if (n[1] === 254)
        return gE(a, t);
      if (n[1] === 0 && n[2] === 2 && n[3] === 0) return kn.to_workbook(a, t);
      break;
    case 0:
      if (n[1] === 0 && (n[2] >= 2 && n[3] === 0 || n[2] === 0 && (n[3] === 8 || n[3] === 9)))
        return kn.to_workbook(a, t);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return Mo.to_workbook(a, t);
    case 123:
      if (n[1] === 92 && n[2] === 114 && n[3] === 116) return kx.to_workbook(a, t);
      break;
    case 10:
    case 13:
    case 32:
      return vE(a, t);
    case 137:
      if (n[1] === 80 && n[2] === 78 && n[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
  }
  return Hm.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31 ? Mo.to_workbook(a, t) : wi(e, a, t, s);
}
function EE(e, r, t, a, n, s, i, c) {
  var o = ur(t), f = c.defval, l = c.raw || !Object.prototype.hasOwnProperty.call(c, "raw"), u = !0, p = n === 1 ? [] : {};
  if (n !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(p, "__rowNum__", { value: t, enumerable: !1 });
    } catch {
      p.__rowNum__ = t;
    }
    else p.__rowNum__ = t;
  if (!i || e[t]) for (var h = r.s.c; h <= r.e.c; ++h) {
    var d = i ? e[t][h] : e[a[h] + o];
    if (d === void 0 || d.t === void 0) {
      if (f === void 0) continue;
      s[h] != null && (p[s[h]] = f);
      continue;
    }
    var m = d.v;
    switch (d.t) {
      case "z":
        if (m == null) break;
        continue;
      case "e":
        m = m == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + d.t);
    }
    if (s[h] != null) {
      if (m == null)
        if (d.t == "e" && m === null) p[s[h]] = null;
        else if (f !== void 0) p[s[h]] = f;
        else if (l && m === null) p[s[h]] = null;
        else continue;
      else
        p[s[h]] = l && (d.t !== "n" || d.t === "n" && c.rawNumbers !== !1) ? m : bt(d, m, c);
      m != null && (u = !1);
    }
  }
  return { row: p, isempty: u };
}
function Ki(e, r) {
  if (e == null || e["!ref"] == null) return [];
  var t = { t: "n", v: 0 }, a = 0, n = 1, s = [], i = 0, c = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, f = r || {}, l = f.range != null ? f.range : e["!ref"];
  switch (f.header === 1 ? a = 1 : f.header === "A" ? a = 2 : Array.isArray(f.header) ? a = 3 : f.header == null && (a = 0), typeof l) {
    case "string":
      o = Ge(l);
      break;
    case "number":
      o = Ge(e["!ref"]), o.s.r = l;
      break;
    default:
      o = l;
  }
  a > 0 && (n = 0);
  var u = ur(o.s.r), p = [], h = [], d = 0, m = 0, x = Array.isArray(e), g = o.s.r, T = 0, E = {};
  x && !e[g] && (e[g] = []);
  var I = f.skipHidden && e["!cols"] || [], D = f.skipHidden && e["!rows"] || [];
  for (T = o.s.c; T <= o.e.c; ++T)
    if (!(I[T] || {}).hidden)
      switch (p[T] = rr(T), t = x ? e[g][T] : e[p[T] + u], a) {
        case 1:
          s[T] = T - o.s.c;
          break;
        case 2:
          s[T] = p[T];
          break;
        case 3:
          s[T] = f.header[T - o.s.c];
          break;
        default:
          if (t == null && (t = { w: "__EMPTY", t: "s" }), c = i = bt(t, null, f), m = E[i] || 0, !m) E[i] = 1;
          else {
            do
              c = i + "_" + m++;
            while (E[c]);
            E[i] = m, E[c] = 1;
          }
          s[T] = c;
      }
  for (g = o.s.r + n; g <= o.e.r; ++g)
    if (!(D[g] || {}).hidden) {
      var L = EE(e, o, g, p, a, s, x, f);
      (L.isempty === !1 || (a === 1 ? f.blankrows !== !1 : f.blankrows)) && (h[d++] = L.row);
    }
  return h.length = d, h;
}
var rf = /"/g;
function yE(e, r, t, a, n, s, i, c) {
  for (var o = !0, f = [], l = "", u = ur(t), p = r.s.c; p <= r.e.c; ++p)
    if (a[p]) {
      var h = c.dense ? (e[t] || [])[p] : e[a[p] + u];
      if (h == null) l = "";
      else if (h.v != null) {
        o = !1, l = "" + (c.rawNumbers && h.t == "n" ? h.v : bt(h, null, c));
        for (var d = 0, m = 0; d !== l.length; ++d) if ((m = l.charCodeAt(d)) === n || m === s || m === 34 || c.forceQuotes) {
          l = '"' + l.replace(rf, '""') + '"';
          break;
        }
        l == "ID" && (l = '"ID"');
      } else h.f != null && !h.F ? (o = !1, l = "=" + h.f, l.indexOf(",") >= 0 && (l = '"' + l.replace(rf, '""') + '"')) : l = "";
      f.push(l);
    }
  return c.blankrows === !1 && o ? null : f.join(i);
}
function zu(e, r) {
  var t = [], a = r ?? {};
  if (e == null || e["!ref"] == null) return "";
  var n = Ge(e["!ref"]), s = a.FS !== void 0 ? a.FS : ",", i = s.charCodeAt(0), c = a.RS !== void 0 ? a.RS : `
`, o = c.charCodeAt(0), f = new RegExp((s == "|" ? "\\|" : s) + "+$"), l = "", u = [];
  a.dense = Array.isArray(e);
  for (var p = a.skipHidden && e["!cols"] || [], h = a.skipHidden && e["!rows"] || [], d = n.s.c; d <= n.e.c; ++d) (p[d] || {}).hidden || (u[d] = rr(d));
  for (var m = 0, x = n.s.r; x <= n.e.r; ++x)
    (h[x] || {}).hidden || (l = yE(e, n, x, u, i, o, s, a), l != null && (a.strip && (l = l.replace(f, "")), (l || a.blankrows !== !1) && t.push((m++ ? c : "") + l)));
  return delete a.dense, t.join("");
}
function wE(e, r) {
  r || (r = {}), r.FS = "	", r.RS = `
`;
  var t = zu(e, r);
  return t;
}
function TE(e) {
  var r = "", t, a = "";
  if (e == null || e["!ref"] == null) return [];
  var n = Ge(e["!ref"]), s = "", i = [], c, o = [], f = Array.isArray(e);
  for (c = n.s.c; c <= n.e.c; ++c) i[c] = rr(c);
  for (var l = n.s.r; l <= n.e.r; ++l)
    for (s = ur(l), c = n.s.c; c <= n.e.c; ++c)
      if (r = i[c] + s, t = f ? (e[l] || [])[c] : e[r], a = "", t !== void 0) {
        if (t.F != null) {
          if (r = t.F, !t.f) continue;
          a = t.f, r.indexOf(":") == -1 && (r = r + ":" + r);
        }
        if (t.f != null) a = t.f;
        else {
          if (t.t == "z") continue;
          if (t.t == "n" && t.v != null) a = "" + t.v;
          else if (t.t == "b") a = t.v ? "TRUE" : "FALSE";
          else if (t.w !== void 0) a = "'" + t.w;
          else {
            if (t.v === void 0) continue;
            t.t == "s" ? a = "'" + t.v : a = "" + t.v;
          }
        }
        o[o.length] = r + "=" + a;
      }
  return o;
}
function Wu(e, r, t) {
  var a = t || {}, n = +!a.skipHeader, s = e || {}, i = 0, c = 0;
  if (s && a.origin != null)
    if (typeof a.origin == "number") i = a.origin;
    else {
      var o = typeof a.origin == "string" ? Cr(a.origin) : a.origin;
      i = o.r, c = o.c;
    }
  var f, l = { s: { c: 0, r: 0 }, e: { c, r: i + r.length - 1 + n } };
  if (s["!ref"]) {
    var u = Ge(s["!ref"]);
    l.e.c = Math.max(l.e.c, u.e.c), l.e.r = Math.max(l.e.r, u.e.r), i == -1 && (i = u.e.r + 1, l.e.r = i + r.length - 1 + n);
  } else
    i == -1 && (i = 0, l.e.r = r.length - 1 + n);
  var p = a.header || [], h = 0;
  r.forEach(function(m, x) {
    _t(m).forEach(function(g) {
      (h = p.indexOf(g)) == -1 && (p[h = p.length] = g);
      var T = m[g], E = "z", I = "", D = ge({ c: c + h, r: i + x + n });
      f = Un(s, D), T && typeof T == "object" && !(T instanceof Date) ? s[D] = T : (typeof T == "number" ? E = "n" : typeof T == "boolean" ? E = "b" : typeof T == "string" ? E = "s" : T instanceof Date ? (E = "d", a.cellDates || (E = "n", T = Or(T)), I = a.dateNF || Ee[14]) : T === null && a.nullError && (E = "e", T = 0), f ? (f.t = E, f.v = T, delete f.w, delete f.R, I && (f.z = I)) : s[D] = f = { t: E, v: T }, I && (f.z = I));
    });
  }), l.e.c = Math.max(l.e.c, c + p.length - 1);
  var d = ur(i);
  if (n) for (h = 0; h < p.length; ++h) s[rr(h + c) + d] = { t: "s", v: p[h] };
  return s["!ref"] = Re(l), s;
}
function kE(e, r) {
  return Wu(null, e, r);
}
function Un(e, r, t) {
  if (typeof r == "string") {
    if (Array.isArray(e)) {
      var a = Cr(r);
      return e[a.r] || (e[a.r] = []), e[a.r][a.c] || (e[a.r][a.c] = { t: "z" });
    }
    return e[r] || (e[r] = { t: "z" });
  }
  return typeof r != "number" ? Un(e, ge(r)) : Un(e, ge({ r, c: t || 0 }));
}
function SE(e, r) {
  if (typeof r == "number") {
    if (r >= 0 && e.SheetNames.length > r) return r;
    throw new Error("Cannot find sheet # " + r);
  } else if (typeof r == "string") {
    var t = e.SheetNames.indexOf(r);
    if (t > -1) return t;
    throw new Error("Cannot find sheet name |" + r + "|");
  } else throw new Error("Cannot find sheet |" + r + "|");
}
function N0() {
  return { SheetNames: [], Sheets: {} };
}
function b0(e, r, t, a) {
  var n = 1;
  if (!t) for (; n <= 65535 && e.SheetNames.indexOf(t = "Sheet" + n) != -1; ++n, t = void 0) ;
  if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (a && e.SheetNames.indexOf(t) >= 0) {
    var s = t.match(/(^.*?)(\d+)$/);
    n = s && +s[2] || 0;
    var i = s && s[1] || t;
    for (++n; n <= 65535 && e.SheetNames.indexOf(t = i + n) != -1; ++n) ;
  }
  if (f2(t), e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
  return e.SheetNames.push(t), e.Sheets[t] = r, t;
}
function AE(e, r, t) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var a = SE(e, r);
  switch (e.Workbook.Sheets[a] || (e.Workbook.Sheets[a] = {}), t) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + t);
  }
  e.Workbook.Sheets[a].Hidden = t;
}
function $E(e, r) {
  return e.z = r, e;
}
function Xu(e, r, t) {
  return r ? (e.l = { Target: r }, t && (e.l.Tooltip = t)) : delete e.l, e;
}
function FE(e, r, t) {
  return Xu(e, "#" + r, t);
}
function CE(e, r, t) {
  e.c || (e.c = []), e.c.push({ t: r, a: t || "SheetJS" });
}
function RE(e, r, t, a) {
  for (var n = typeof r != "string" ? r : Ge(r), s = typeof r == "string" ? r : Re(r), i = n.s.r; i <= n.e.r; ++i) for (var c = n.s.c; c <= n.e.c; ++c) {
    var o = Un(e, i, c);
    o.t = "n", o.F = s, delete o.v, i == n.s.r && c == n.s.c && (o.f = t, a && (o.D = !0));
  }
  return e;
}
var OE = {
  encode_col: rr,
  encode_row: ur,
  encode_cell: ge,
  encode_range: Re,
  decode_col: E0,
  decode_row: _0,
  split_cell: V1,
  decode_cell: Cr,
  decode_range: Ka,
  format_cell: bt,
  sheet_add_aoa: Jl,
  sheet_add_json: Wu,
  sheet_add_dom: ju,
  aoa_to_sheet: qa,
  json_to_sheet: kE,
  table_to_sheet: Vu,
  table_to_book: X2,
  sheet_to_csv: zu,
  sheet_to_txt: wE,
  sheet_to_json: Ki,
  sheet_to_html: W2,
  sheet_to_formulae: TE,
  sheet_to_row_object_array: Ki,
  sheet_get_cell: Un,
  book_new: N0,
  book_append_sheet: b0,
  book_set_sheet_visibility: AE,
  cell_set_number_format: $E,
  cell_set_hyperlink: Xu,
  cell_set_internal_link: FE,
  cell_add_comment: CE,
  sheet_set_array_formula: RE,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
const ga = (e) => {
  const r = typeof e;
  return e !== null && (r === "object" || r === "function");
}, Ti = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), IE = new Set("0123456789");
function Xs(e) {
  const r = [];
  let t = "", a = "start", n = !1;
  for (const s of e)
    switch (s) {
      case "\\": {
        if (a === "index")
          throw new Error("Invalid character in an index");
        if (a === "indexEnd")
          throw new Error("Invalid character after an index");
        n && (t += s), a = "property", n = !n;
        break;
      }
      case ".": {
        if (a === "index")
          throw new Error("Invalid character in an index");
        if (a === "indexEnd") {
          a = "property";
          break;
        }
        if (n) {
          n = !1, t += s;
          break;
        }
        if (Ti.has(t))
          return [];
        r.push(t), t = "", a = "property";
        break;
      }
      case "[": {
        if (a === "index")
          throw new Error("Invalid character in an index");
        if (a === "indexEnd") {
          a = "index";
          break;
        }
        if (n) {
          n = !1, t += s;
          break;
        }
        if (a === "property") {
          if (Ti.has(t))
            return [];
          r.push(t), t = "";
        }
        a = "index";
        break;
      }
      case "]": {
        if (a === "index") {
          r.push(Number.parseInt(t, 10)), t = "", a = "indexEnd";
          break;
        }
        if (a === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (a === "index" && !IE.has(s))
          throw new Error("Invalid character in an index");
        if (a === "indexEnd")
          throw new Error("Invalid character after an index");
        a === "start" && (a = "property"), n && (n = !1, t += "\\"), t += s;
      }
    }
  switch (n && (t += "\\"), a) {
    case "property": {
      if (Ti.has(t))
        return [];
      r.push(t);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      r.push("");
      break;
    }
  }
  return r;
}
function D0(e, r) {
  if (typeof r != "number" && Array.isArray(e)) {
    const t = Number.parseInt(r, 10);
    return Number.isInteger(t) && e[t] === e[r];
  }
  return !1;
}
function Ku(e, r) {
  if (D0(e, r))
    throw new Error("Cannot use string index");
}
function PE(e, r, t) {
  if (!ga(e) || typeof r != "string")
    return t === void 0 ? e : t;
  const a = Xs(r);
  if (a.length === 0)
    return t;
  for (let n = 0; n < a.length; n++) {
    const s = a[n];
    if (D0(e, s) ? e = n === a.length - 1 ? void 0 : null : e = e[s], e == null) {
      if (n !== a.length - 1)
        return t;
      break;
    }
  }
  return e === void 0 ? t : e;
}
function tf(e, r, t) {
  if (!ga(e) || typeof r != "string")
    return e;
  const a = e, n = Xs(r);
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    Ku(e, i), s === n.length - 1 ? e[i] = t : ga(e[i]) || (e[i] = typeof n[s + 1] == "number" ? [] : {}), e = e[i];
  }
  return a;
}
function NE(e, r) {
  if (!ga(e) || typeof r != "string")
    return !1;
  const t = Xs(r);
  for (let a = 0; a < t.length; a++) {
    const n = t[a];
    if (Ku(e, n), a === t.length - 1)
      return delete e[n], !0;
    if (e = e[n], !ga(e))
      return !1;
  }
}
function bE(e, r) {
  if (!ga(e) || typeof r != "string")
    return !1;
  const t = Xs(r);
  if (t.length === 0)
    return !1;
  for (const a of t) {
    if (!ga(e) || !(a in e) || D0(e, a))
      return !1;
    e = e[a];
  }
  return !0;
}
const Kt = Vs.homedir(), L0 = Vs.tmpdir(), { env: La } = er, DE = (e) => {
  const r = ye.join(Kt, "Library");
  return {
    data: ye.join(r, "Application Support", e),
    config: ye.join(r, "Preferences", e),
    cache: ye.join(r, "Caches", e),
    log: ye.join(r, "Logs", e),
    temp: ye.join(L0, e)
  };
}, LE = (e) => {
  const r = La.APPDATA || ye.join(Kt, "AppData", "Roaming"), t = La.LOCALAPPDATA || ye.join(Kt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: ye.join(t, e, "Data"),
    config: ye.join(r, e, "Config"),
    cache: ye.join(t, e, "Cache"),
    log: ye.join(t, e, "Log"),
    temp: ye.join(L0, e)
  };
}, ME = (e) => {
  const r = ye.basename(Kt);
  return {
    data: ye.join(La.XDG_DATA_HOME || ye.join(Kt, ".local", "share"), e),
    config: ye.join(La.XDG_CONFIG_HOME || ye.join(Kt, ".config"), e),
    cache: ye.join(La.XDG_CACHE_HOME || ye.join(Kt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: ye.join(La.XDG_STATE_HOME || ye.join(Kt, ".local", "state"), e),
    temp: ye.join(L0, r, e)
  };
};
function BE(e, { suffix: r = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return r && (e += `-${r}`), er.platform === "darwin" ? DE(e) : er.platform === "win32" ? LE(e) : ME(e);
}
const Ut = (e, r) => function(...a) {
  return e.apply(void 0, a).catch(r);
}, St = (e, r) => function(...a) {
  try {
    return e.apply(void 0, a);
  } catch (n) {
    return r(n);
  }
}, UE = er.getuid ? !er.getuid() : !1, jE = 1e4, Ur = () => {
}, Be = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Be.isNodeError(e))
      return !1;
    const { code: r } = e;
    return r === "ENOSYS" || !UE && (r === "EINVAL" || r === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Be.isNodeError(e))
      return !1;
    const { code: r } = e;
    return r === "EMFILE" || r === "ENFILE" || r === "EAGAIN" || r === "EBUSY" || r === "EACCESS" || r === "EACCES" || r === "EACCS" || r === "EPERM";
  },
  onChangeError: (e) => {
    if (!Be.isNodeError(e))
      throw e;
    if (!Be.isChangeErrorOk(e))
      throw e;
  }
};
class VE {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = jE, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (r) => {
      this.queueWaiting.add(r), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (r) => {
      this.queueWaiting.delete(r), this.queueActive.delete(r);
    }, this.schedule = () => new Promise((r) => {
      const t = () => this.remove(a), a = () => r(t);
      this.add(a);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const r of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(r), this.queueActive.add(r), r();
        }
      }
    };
  }
}
const HE = new VE(), jt = (e, r) => function(a) {
  return function n(...s) {
    return HE.schedule().then((i) => {
      const c = (f) => (i(), f), o = (f) => {
        if (i(), Date.now() >= a)
          throw f;
        if (r(f)) {
          const l = Math.round(100 * Math.random());
          return new Promise((p) => setTimeout(p, l)).then(() => n.apply(void 0, s));
        }
        throw f;
      };
      return e.apply(void 0, s).then(c, o);
    });
  };
}, Vt = (e, r) => function(a) {
  return function n(...s) {
    try {
      return e.apply(void 0, s);
    } catch (i) {
      if (Date.now() > a)
        throw i;
      if (r(i))
        return n.apply(void 0, s);
      throw i;
    }
  };
}, vr = {
  attempt: {
    /* ASYNC */
    chmod: Ut(pr(Se.chmod), Be.onChangeError),
    chown: Ut(pr(Se.chown), Be.onChangeError),
    close: Ut(pr(Se.close), Ur),
    fsync: Ut(pr(Se.fsync), Ur),
    mkdir: Ut(pr(Se.mkdir), Ur),
    realpath: Ut(pr(Se.realpath), Ur),
    stat: Ut(pr(Se.stat), Ur),
    unlink: Ut(pr(Se.unlink), Ur),
    /* SYNC */
    chmodSync: St(Se.chmodSync, Be.onChangeError),
    chownSync: St(Se.chownSync, Be.onChangeError),
    closeSync: St(Se.closeSync, Ur),
    existsSync: St(Se.existsSync, Ur),
    fsyncSync: St(Se.fsync, Ur),
    mkdirSync: St(Se.mkdirSync, Ur),
    realpathSync: St(Se.realpathSync, Ur),
    statSync: St(Se.statSync, Ur),
    unlinkSync: St(Se.unlinkSync, Ur)
  },
  retry: {
    /* ASYNC */
    close: jt(pr(Se.close), Be.isRetriableError),
    fsync: jt(pr(Se.fsync), Be.isRetriableError),
    open: jt(pr(Se.open), Be.isRetriableError),
    readFile: jt(pr(Se.readFile), Be.isRetriableError),
    rename: jt(pr(Se.rename), Be.isRetriableError),
    stat: jt(pr(Se.stat), Be.isRetriableError),
    write: jt(pr(Se.write), Be.isRetriableError),
    writeFile: jt(pr(Se.writeFile), Be.isRetriableError),
    /* SYNC */
    closeSync: Vt(Se.closeSync, Be.isRetriableError),
    fsyncSync: Vt(Se.fsyncSync, Be.isRetriableError),
    openSync: Vt(Se.openSync, Be.isRetriableError),
    readFileSync: Vt(Se.readFileSync, Be.isRetriableError),
    renameSync: Vt(Se.renameSync, Be.isRetriableError),
    statSync: Vt(Se.statSync, Be.isRetriableError),
    writeSync: Vt(Se.writeSync, Be.isRetriableError),
    writeFileSync: Vt(Se.writeFileSync, Be.isRetriableError)
  }
}, GE = "utf8", af = 438, zE = 511, WE = {}, XE = Vs.userInfo().uid, KE = Vs.userInfo().gid, qE = 1e3, YE = !!er.getuid;
er.getuid && er.getuid();
const nf = 128, JE = (e) => e instanceof Error && "code" in e, sf = (e) => typeof e == "string", ki = (e) => e === void 0, ZE = er.platform === "linux", qu = er.platform === "win32", M0 = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
qu || M0.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
ZE && M0.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class QE {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (r) => {
      if (!this.exited) {
        this.exited = !0;
        for (const t of this.callbacks)
          t();
        r && (qu && r !== "SIGINT" && r !== "SIGTERM" && r !== "SIGKILL" ? er.kill(er.pid, "SIGTERM") : er.kill(er.pid, r));
      }
    }, this.hook = () => {
      er.once("exit", () => this.exit());
      for (const r of M0)
        try {
          er.once(r, () => this.exit(r));
        } catch {
        }
    }, this.register = (r) => (this.callbacks.add(r), () => {
      this.callbacks.delete(r);
    }), this.hook();
  }
}
const ey = new QE(), ry = ey.register, gr = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const r = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), n = `.tmp-${Date.now().toString().slice(-10)}${r}`;
    return `${e}${n}`;
  },
  get: (e, r, t = !0) => {
    const a = gr.truncate(r(e));
    return a in gr.store ? gr.get(e, r, t) : (gr.store[a] = t, [a, () => delete gr.store[a]]);
  },
  purge: (e) => {
    gr.store[e] && (delete gr.store[e], vr.attempt.unlink(e));
  },
  purgeSync: (e) => {
    gr.store[e] && (delete gr.store[e], vr.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in gr.store)
      gr.purgeSync(e);
  },
  truncate: (e) => {
    const r = ye.basename(e);
    if (r.length <= nf)
      return e;
    const t = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(r);
    if (!t)
      return e;
    const a = r.length - nf;
    return `${e.slice(0, -r.length)}${t[1]}${t[2].slice(0, -a)}${t[3]}`;
  }
};
ry(gr.purgeSyncAll);
function Yu(e, r, t = WE) {
  if (sf(t))
    return Yu(e, r, { encoding: t });
  const a = Date.now() + ((t.timeout ?? qE) || -1);
  let n = null, s = null, i = null;
  try {
    const c = vr.attempt.realpathSync(e), o = !!c;
    e = c || e, [s, n] = gr.get(e, t.tmpCreate || gr.create, t.tmpPurge !== !1);
    const f = YE && ki(t.chown), l = ki(t.mode);
    if (o && (f || l)) {
      const u = vr.attempt.statSync(e);
      u && (t = { ...t }, f && (t.chown = { uid: u.uid, gid: u.gid }), l && (t.mode = u.mode));
    }
    if (!o) {
      const u = ye.dirname(e);
      vr.attempt.mkdirSync(u, {
        mode: zE,
        recursive: !0
      });
    }
    i = vr.retry.openSync(a)(s, "w", t.mode || af), t.tmpCreated && t.tmpCreated(s), sf(r) ? vr.retry.writeSync(a)(i, r, 0, t.encoding || GE) : ki(r) || vr.retry.writeSync(a)(i, r, 0, r.length, 0), t.fsync !== !1 && (t.fsyncWait !== !1 ? vr.retry.fsyncSync(a)(i) : vr.attempt.fsync(i)), vr.retry.closeSync(a)(i), i = null, t.chown && (t.chown.uid !== XE || t.chown.gid !== KE) && vr.attempt.chownSync(s, t.chown.uid, t.chown.gid), t.mode && t.mode !== af && vr.attempt.chmodSync(s, t.mode);
    try {
      vr.retry.renameSync(a)(s, e);
    } catch (u) {
      if (!JE(u) || u.code !== "ENAMETOOLONG")
        throw u;
      vr.retry.renameSync(a)(s, gr.truncate(e));
    }
    n(), s = null;
  } finally {
    i && vr.attempt.closeSync(i), s && gr.purge(s);
  }
}
function Ju(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qi = { exports: {} }, B0 = {}, Zr = {}, Wa = {}, Kn = {}, ve = {}, jn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class r {
  }
  e._CodeOrName = r, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class t extends r {
    constructor(T) {
      if (super(), !e.IDENTIFIER.test(T))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = T;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = t;
  class a extends r {
    constructor(T) {
      super(), this._items = typeof T == "string" ? [T] : T;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const T = this._items[0];
      return T === "" || T === '""';
    }
    get str() {
      var T;
      return (T = this._str) !== null && T !== void 0 ? T : this._str = this._items.reduce((E, I) => `${E}${I}`, "");
    }
    get names() {
      var T;
      return (T = this._names) !== null && T !== void 0 ? T : this._names = this._items.reduce((E, I) => (I instanceof t && (E[I.str] = (E[I.str] || 0) + 1), E), {});
    }
  }
  e._Code = a, e.nil = new a("");
  function n(g, ...T) {
    const E = [g[0]];
    let I = 0;
    for (; I < T.length; )
      c(E, T[I]), E.push(g[++I]);
    return new a(E);
  }
  e._ = n;
  const s = new a("+");
  function i(g, ...T) {
    const E = [h(g[0])];
    let I = 0;
    for (; I < T.length; )
      E.push(s), c(E, T[I]), E.push(s, h(g[++I]));
    return o(E), new a(E);
  }
  e.str = i;
  function c(g, T) {
    T instanceof a ? g.push(...T._items) : T instanceof t ? g.push(T) : g.push(u(T));
  }
  e.addCodeArg = c;
  function o(g) {
    let T = 1;
    for (; T < g.length - 1; ) {
      if (g[T] === s) {
        const E = f(g[T - 1], g[T + 1]);
        if (E !== void 0) {
          g.splice(T - 1, 3, E);
          continue;
        }
        g[T++] = "+";
      }
      T++;
    }
  }
  function f(g, T) {
    if (T === '""')
      return g;
    if (g === '""')
      return T;
    if (typeof g == "string")
      return T instanceof t || g[g.length - 1] !== '"' ? void 0 : typeof T != "string" ? `${g.slice(0, -1)}${T}"` : T[0] === '"' ? g.slice(0, -1) + T.slice(1) : void 0;
    if (typeof T == "string" && T[0] === '"' && !(g instanceof t))
      return `"${g}${T.slice(1)}`;
  }
  function l(g, T) {
    return T.emptyStr() ? g : g.emptyStr() ? T : i`${g}${T}`;
  }
  e.strConcat = l;
  function u(g) {
    return typeof g == "number" || typeof g == "boolean" || g === null ? g : h(Array.isArray(g) ? g.join(",") : g);
  }
  function p(g) {
    return new a(h(g));
  }
  e.stringify = p;
  function h(g) {
    return JSON.stringify(g).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function d(g) {
    return typeof g == "string" && e.IDENTIFIER.test(g) ? new a(`.${g}`) : n`[${g}]`;
  }
  e.getProperty = d;
  function m(g) {
    if (typeof g == "string" && e.IDENTIFIER.test(g))
      return new a(`${g}`);
    throw new Error(`CodeGen: invalid export name: ${g}, use explicit $id name mapping`);
  }
  e.getEsmExportName = m;
  function x(g) {
    return new a(g.toString());
  }
  e.regexpCode = x;
})(jn);
var Yi = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const r = jn;
  class t extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var a;
  (function(o) {
    o[o.Started = 0] = "Started", o[o.Completed = 1] = "Completed";
  })(a || (e.UsedValueState = a = {})), e.varKinds = {
    const: new r.Name("const"),
    let: new r.Name("let"),
    var: new r.Name("var")
  };
  class n {
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof r.Name ? f : this.name(f);
    }
    name(f) {
      return new r.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = n;
  class s extends r.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, r._)`.${new r.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = s;
  const i = (0, r._)`\n`;
  class c extends n {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? i : r.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new s(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const p = this.toName(f), { prefix: h } = p, d = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let m = this._values[h];
      if (m) {
        const T = m.get(d);
        if (T)
          return T;
      } else
        m = this._values[h] = /* @__PURE__ */ new Map();
      m.set(d, p);
      const x = this._scope[h] || (this._scope[h] = []), g = x.length;
      return x[g] = l.ref, p.setValue(l, { property: h, itemIndex: g }), p;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, r._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (p) => {
        if (p.value === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return p.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, p) {
      let h = r.nil;
      for (const d in f) {
        const m = f[d];
        if (!m)
          continue;
        const x = u[d] = u[d] || /* @__PURE__ */ new Map();
        m.forEach((g) => {
          if (x.has(g))
            return;
          x.set(g, a.Started);
          let T = l(g);
          if (T) {
            const E = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, r._)`${h}${E} ${g} = ${T};${this.opts._n}`;
          } else if (T = p == null ? void 0 : p(g))
            h = (0, r._)`${h}${T}${this.opts._n}`;
          else
            throw new t(g);
          x.set(g, a.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = c;
})(Yi);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const r = jn, t = Yi;
  var a = jn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return a._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return a.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return a.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return a.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return a.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return a.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return a.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return a.Name;
  } });
  var n = Yi;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return n.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return n.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return n.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return n.varKinds;
  } }), e.operators = {
    GT: new r._Code(">"),
    GTE: new r._Code(">="),
    LT: new r._Code("<"),
    LTE: new r._Code("<="),
    EQ: new r._Code("==="),
    NEQ: new r._Code("!=="),
    NOT: new r._Code("!"),
    OR: new r._Code("||"),
    AND: new r._Code("&&"),
    ADD: new r._Code("+")
  };
  class s {
    optimizeNodes() {
      return this;
    }
    optimizeNames(v, _) {
      return this;
    }
  }
  class i extends s {
    constructor(v, _, N) {
      super(), this.varKind = v, this.name = _, this.rhs = N;
    }
    render({ es5: v, _n: _ }) {
      const N = v ? t.varKinds.var : this.varKind, Y = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${N} ${this.name}${Y};` + _;
    }
    optimizeNames(v, _) {
      if (v[this.name.str])
        return this.rhs && (this.rhs = G(this.rhs, v, _)), this;
    }
    get names() {
      return this.rhs instanceof r._CodeOrName ? this.rhs.names : {};
    }
  }
  class c extends s {
    constructor(v, _, N) {
      super(), this.lhs = v, this.rhs = _, this.sideEffects = N;
    }
    render({ _n: v }) {
      return `${this.lhs} = ${this.rhs};` + v;
    }
    optimizeNames(v, _) {
      if (!(this.lhs instanceof r.Name && !v[this.lhs.str] && !this.sideEffects))
        return this.rhs = G(this.rhs, v, _), this;
    }
    get names() {
      const v = this.lhs instanceof r.Name ? {} : { ...this.lhs.names };
      return ae(v, this.rhs);
    }
  }
  class o extends c {
    constructor(v, _, N, Y) {
      super(v, N, Y), this.op = _;
    }
    render({ _n: v }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + v;
    }
  }
  class f extends s {
    constructor(v) {
      super(), this.label = v, this.names = {};
    }
    render({ _n: v }) {
      return `${this.label}:` + v;
    }
  }
  class l extends s {
    constructor(v) {
      super(), this.label = v, this.names = {};
    }
    render({ _n: v }) {
      return `break${this.label ? ` ${this.label}` : ""};` + v;
    }
  }
  class u extends s {
    constructor(v) {
      super(), this.error = v;
    }
    render({ _n: v }) {
      return `throw ${this.error};` + v;
    }
    get names() {
      return this.error.names;
    }
  }
  class p extends s {
    constructor(v) {
      super(), this.code = v;
    }
    render({ _n: v }) {
      return `${this.code};` + v;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(v, _) {
      return this.code = G(this.code, v, _), this;
    }
    get names() {
      return this.code instanceof r._CodeOrName ? this.code.names : {};
    }
  }
  class h extends s {
    constructor(v = []) {
      super(), this.nodes = v;
    }
    render(v) {
      return this.nodes.reduce((_, N) => _ + N.render(v), "");
    }
    optimizeNodes() {
      const { nodes: v } = this;
      let _ = v.length;
      for (; _--; ) {
        const N = v[_].optimizeNodes();
        Array.isArray(N) ? v.splice(_, 1, ...N) : N ? v[_] = N : v.splice(_, 1);
      }
      return v.length > 0 ? this : void 0;
    }
    optimizeNames(v, _) {
      const { nodes: N } = this;
      let Y = N.length;
      for (; Y--; ) {
        const Q = N[Y];
        Q.optimizeNames(v, _) || (V(v, Q.names), N.splice(Y, 1));
      }
      return N.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((v, _) => M(v, _.names), {});
    }
  }
  class d extends h {
    render(v) {
      return "{" + v._n + super.render(v) + "}" + v._n;
    }
  }
  class m extends h {
  }
  class x extends d {
  }
  x.kind = "else";
  class g extends d {
    constructor(v, _) {
      super(_), this.condition = v;
    }
    render(v) {
      let _ = `if(${this.condition})` + super.render(v);
      return this.else && (_ += "else " + this.else.render(v)), _;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const v = this.condition;
      if (v === !0)
        return this.nodes;
      let _ = this.else;
      if (_) {
        const N = _.optimizeNodes();
        _ = this.else = Array.isArray(N) ? new x(N) : N;
      }
      if (_)
        return v === !1 ? _ instanceof g ? _ : _.nodes : this.nodes.length ? this : new g(te(v), _ instanceof g ? [_] : _.nodes);
      if (!(v === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(v, _) {
      var N;
      if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames(v, _), !!(super.optimizeNames(v, _) || this.else))
        return this.condition = G(this.condition, v, _), this;
    }
    get names() {
      const v = super.names;
      return ae(v, this.condition), this.else && M(v, this.else.names), v;
    }
  }
  g.kind = "if";
  class T extends d {
  }
  T.kind = "for";
  class E extends T {
    constructor(v) {
      super(), this.iteration = v;
    }
    render(v) {
      return `for(${this.iteration})` + super.render(v);
    }
    optimizeNames(v, _) {
      if (super.optimizeNames(v, _))
        return this.iteration = G(this.iteration, v, _), this;
    }
    get names() {
      return M(super.names, this.iteration.names);
    }
  }
  class I extends T {
    constructor(v, _, N, Y) {
      super(), this.varKind = v, this.name = _, this.from = N, this.to = Y;
    }
    render(v) {
      const _ = v.es5 ? t.varKinds.var : this.varKind, { name: N, from: Y, to: Q } = this;
      return `for(${_} ${N}=${Y}; ${N}<${Q}; ${N}++)` + super.render(v);
    }
    get names() {
      const v = ae(super.names, this.from);
      return ae(v, this.to);
    }
  }
  class D extends T {
    constructor(v, _, N, Y) {
      super(), this.loop = v, this.varKind = _, this.name = N, this.iterable = Y;
    }
    render(v) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(v);
    }
    optimizeNames(v, _) {
      if (super.optimizeNames(v, _))
        return this.iterable = G(this.iterable, v, _), this;
    }
    get names() {
      return M(super.names, this.iterable.names);
    }
  }
  class L extends d {
    constructor(v, _, N) {
      super(), this.name = v, this.args = _, this.async = N;
    }
    render(v) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(v);
    }
  }
  L.kind = "func";
  class C extends h {
    render(v) {
      return "return " + super.render(v);
    }
  }
  C.kind = "return";
  class z extends d {
    render(v) {
      let _ = "try" + super.render(v);
      return this.catch && (_ += this.catch.render(v)), this.finally && (_ += this.finally.render(v)), _;
    }
    optimizeNodes() {
      var v, _;
      return super.optimizeNodes(), (v = this.catch) === null || v === void 0 || v.optimizeNodes(), (_ = this.finally) === null || _ === void 0 || _.optimizeNodes(), this;
    }
    optimizeNames(v, _) {
      var N, Y;
      return super.optimizeNames(v, _), (N = this.catch) === null || N === void 0 || N.optimizeNames(v, _), (Y = this.finally) === null || Y === void 0 || Y.optimizeNames(v, _), this;
    }
    get names() {
      const v = super.names;
      return this.catch && M(v, this.catch.names), this.finally && M(v, this.finally.names), v;
    }
  }
  class U extends d {
    constructor(v) {
      super(), this.error = v;
    }
    render(v) {
      return `catch(${this.error})` + super.render(v);
    }
  }
  U.kind = "catch";
  class J extends d {
    render(v) {
      return "finally" + super.render(v);
    }
  }
  J.kind = "finally";
  class j {
    constructor(v, _ = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ..._, _n: _.lines ? `
` : "" }, this._extScope = v, this._scope = new t.Scope({ parent: v }), this._nodes = [new m()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(v) {
      return this._scope.name(v);
    }
    // reserves unique name in the external scope
    scopeName(v) {
      return this._extScope.name(v);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(v, _) {
      const N = this._extScope.value(v, _);
      return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
    }
    getScopeValue(v, _) {
      return this._extScope.getValue(v, _);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(v) {
      return this._extScope.scopeRefs(v, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(v, _, N, Y) {
      const Q = this._scope.toName(_);
      return N !== void 0 && Y && (this._constants[Q.str] = N), this._leafNode(new i(v, Q, N)), Q;
    }
    // `const` declaration (`var` in es5 mode)
    const(v, _, N) {
      return this._def(t.varKinds.const, v, _, N);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(v, _, N) {
      return this._def(t.varKinds.let, v, _, N);
    }
    // `var` declaration with optional assignment
    var(v, _, N) {
      return this._def(t.varKinds.var, v, _, N);
    }
    // assignment code
    assign(v, _, N) {
      return this._leafNode(new c(v, _, N));
    }
    // `+=` code
    add(v, _) {
      return this._leafNode(new o(v, e.operators.ADD, _));
    }
    // appends passed SafeExpr to code or executes Block
    code(v) {
      return typeof v == "function" ? v() : v !== r.nil && this._leafNode(new p(v)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...v) {
      const _ = ["{"];
      for (const [N, Y] of v)
        _.length > 1 && _.push(","), _.push(N), (N !== Y || this.opts.es5) && (_.push(":"), (0, r.addCodeArg)(_, Y));
      return _.push("}"), new r._Code(_);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(v, _, N) {
      if (this._blockNode(new g(v)), _ && N)
        this.code(_).else().code(N).endIf();
      else if (_)
        this.code(_).endIf();
      else if (N)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(v) {
      return this._elseNode(new g(v));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new x());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(g, x);
    }
    _for(v, _) {
      return this._blockNode(v), _ && this.code(_).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(v, _) {
      return this._for(new E(v), _);
    }
    // `for` statement for a range of values
    forRange(v, _, N, Y, Q = this.opts.es5 ? t.varKinds.var : t.varKinds.let) {
      const ne = this._scope.toName(v);
      return this._for(new I(Q, ne, _, N), () => Y(ne));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(v, _, N, Y = t.varKinds.const) {
      const Q = this._scope.toName(v);
      if (this.opts.es5) {
        const ne = _ instanceof r.Name ? _ : this.var("_arr", _);
        return this.forRange("_i", 0, (0, r._)`${ne}.length`, (ee) => {
          this.var(Q, (0, r._)`${ne}[${ee}]`), N(Q);
        });
      }
      return this._for(new D("of", Y, Q, _), () => N(Q));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(v, _, N, Y = this.opts.es5 ? t.varKinds.var : t.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(v, (0, r._)`Object.keys(${_})`, N);
      const Q = this._scope.toName(v);
      return this._for(new D("in", Y, Q, _), () => N(Q));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(T);
    }
    // `label` statement
    label(v) {
      return this._leafNode(new f(v));
    }
    // `break` statement
    break(v) {
      return this._leafNode(new l(v));
    }
    // `return` statement
    return(v) {
      const _ = new C();
      if (this._blockNode(_), this.code(v), _.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(C);
    }
    // `try` statement
    try(v, _, N) {
      if (!_ && !N)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const Y = new z();
      if (this._blockNode(Y), this.code(v), _) {
        const Q = this.name("e");
        this._currNode = Y.catch = new U(Q), _(Q);
      }
      return N && (this._currNode = Y.finally = new J(), this.code(N)), this._endBlockNode(U, J);
    }
    // `throw` statement
    throw(v) {
      return this._leafNode(new u(v));
    }
    // start self-balancing block
    block(v, _) {
      return this._blockStarts.push(this._nodes.length), v && this.code(v).endBlock(_), this;
    }
    // end the current self-balancing block
    endBlock(v) {
      const _ = this._blockStarts.pop();
      if (_ === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const N = this._nodes.length - _;
      if (N < 0 || v !== void 0 && N !== v)
        throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${v} expected`);
      return this._nodes.length = _, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(v, _ = r.nil, N, Y) {
      return this._blockNode(new L(v, _, N)), Y && this.code(Y).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(L);
    }
    optimize(v = 1) {
      for (; v-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(v) {
      return this._currNode.nodes.push(v), this;
    }
    _blockNode(v) {
      this._currNode.nodes.push(v), this._nodes.push(v);
    }
    _endBlockNode(v, _) {
      const N = this._currNode;
      if (N instanceof v || _ && N instanceof _)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${_ ? `${v.kind}/${_.kind}` : v.kind}"`);
    }
    _elseNode(v) {
      const _ = this._currNode;
      if (!(_ instanceof g))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = _.else = v, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const v = this._nodes;
      return v[v.length - 1];
    }
    set _currNode(v) {
      const _ = this._nodes;
      _[_.length - 1] = v;
    }
  }
  e.CodeGen = j;
  function M(k, v) {
    for (const _ in v)
      k[_] = (k[_] || 0) + (v[_] || 0);
    return k;
  }
  function ae(k, v) {
    return v instanceof r._CodeOrName ? M(k, v.names) : k;
  }
  function G(k, v, _) {
    if (k instanceof r.Name)
      return N(k);
    if (!Y(k))
      return k;
    return new r._Code(k._items.reduce((Q, ne) => (ne instanceof r.Name && (ne = N(ne)), ne instanceof r._Code ? Q.push(...ne._items) : Q.push(ne), Q), []));
    function N(Q) {
      const ne = _[Q.str];
      return ne === void 0 || v[Q.str] !== 1 ? Q : (delete v[Q.str], ne);
    }
    function Y(Q) {
      return Q instanceof r._Code && Q._items.some((ne) => ne instanceof r.Name && v[ne.str] === 1 && _[ne.str] !== void 0);
    }
  }
  function V(k, v) {
    for (const _ in v)
      k[_] = (k[_] || 0) - (v[_] || 0);
  }
  function te(k) {
    return typeof k == "boolean" || typeof k == "number" || k === null ? !k : (0, r._)`!${y(k)}`;
  }
  e.not = te;
  const Z = b(e.operators.AND);
  function ce(...k) {
    return k.reduce(Z);
  }
  e.and = ce;
  const B = b(e.operators.OR);
  function H(...k) {
    return k.reduce(B);
  }
  e.or = H;
  function b(k) {
    return (v, _) => v === r.nil ? _ : _ === r.nil ? v : (0, r._)`${y(v)} ${k} ${y(_)}`;
  }
  function y(k) {
    return k instanceof r.Name ? k : (0, r._)`(${k})`;
  }
})(ve);
var le = {};
Object.defineProperty(le, "__esModule", { value: !0 });
le.checkStrictMode = le.getErrorPath = le.Type = le.useFunc = le.setEvaluated = le.evaluatedPropsToName = le.mergeEvaluated = le.eachItem = le.unescapeJsonPointer = le.escapeJsonPointer = le.escapeFragment = le.unescapeFragment = le.schemaRefOrVal = le.schemaHasRulesButRef = le.schemaHasRules = le.checkUnknownRules = le.alwaysValidSchema = le.toHash = void 0;
const Pe = ve, ty = jn;
function ay(e) {
  const r = {};
  for (const t of e)
    r[t] = !0;
  return r;
}
le.toHash = ay;
function ny(e, r) {
  return typeof r == "boolean" ? r : Object.keys(r).length === 0 ? !0 : (Zu(e, r), !Qu(r, e.self.RULES.all));
}
le.alwaysValidSchema = ny;
function Zu(e, r = e.schema) {
  const { opts: t, self: a } = e;
  if (!t.strictSchema || typeof r == "boolean")
    return;
  const n = a.RULES.keywords;
  for (const s in r)
    n[s] || th(e, `unknown keyword: "${s}"`);
}
le.checkUnknownRules = Zu;
function Qu(e, r) {
  if (typeof e == "boolean")
    return !e;
  for (const t in e)
    if (r[t])
      return !0;
  return !1;
}
le.schemaHasRules = Qu;
function sy(e, r) {
  if (typeof e == "boolean")
    return !e;
  for (const t in e)
    if (t !== "$ref" && r.all[t])
      return !0;
  return !1;
}
le.schemaHasRulesButRef = sy;
function iy({ topSchemaRef: e, schemaPath: r }, t, a, n) {
  if (!n) {
    if (typeof t == "number" || typeof t == "boolean")
      return t;
    if (typeof t == "string")
      return (0, Pe._)`${t}`;
  }
  return (0, Pe._)`${e}${r}${(0, Pe.getProperty)(a)}`;
}
le.schemaRefOrVal = iy;
function cy(e) {
  return eh(decodeURIComponent(e));
}
le.unescapeFragment = cy;
function oy(e) {
  return encodeURIComponent(U0(e));
}
le.escapeFragment = oy;
function U0(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
le.escapeJsonPointer = U0;
function eh(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
le.unescapeJsonPointer = eh;
function fy(e, r) {
  if (Array.isArray(e))
    for (const t of e)
      r(t);
  else
    r(e);
}
le.eachItem = fy;
function cf({ mergeNames: e, mergeToName: r, mergeValues: t, resultToName: a }) {
  return (n, s, i, c) => {
    const o = i === void 0 ? s : i instanceof Pe.Name ? (s instanceof Pe.Name ? e(n, s, i) : r(n, s, i), i) : s instanceof Pe.Name ? (r(n, i, s), s) : t(s, i);
    return c === Pe.Name && !(o instanceof Pe.Name) ? a(n, o) : o;
  };
}
le.mergeEvaluated = {
  props: cf({
    mergeNames: (e, r, t) => e.if((0, Pe._)`${t} !== true && ${r} !== undefined`, () => {
      e.if((0, Pe._)`${r} === true`, () => e.assign(t, !0), () => e.assign(t, (0, Pe._)`${t} || {}`).code((0, Pe._)`Object.assign(${t}, ${r})`));
    }),
    mergeToName: (e, r, t) => e.if((0, Pe._)`${t} !== true`, () => {
      r === !0 ? e.assign(t, !0) : (e.assign(t, (0, Pe._)`${t} || {}`), j0(e, t, r));
    }),
    mergeValues: (e, r) => e === !0 ? !0 : { ...e, ...r },
    resultToName: rh
  }),
  items: cf({
    mergeNames: (e, r, t) => e.if((0, Pe._)`${t} !== true && ${r} !== undefined`, () => e.assign(t, (0, Pe._)`${r} === true ? true : ${t} > ${r} ? ${t} : ${r}`)),
    mergeToName: (e, r, t) => e.if((0, Pe._)`${t} !== true`, () => e.assign(t, r === !0 ? !0 : (0, Pe._)`${t} > ${r} ? ${t} : ${r}`)),
    mergeValues: (e, r) => e === !0 ? !0 : Math.max(e, r),
    resultToName: (e, r) => e.var("items", r)
  })
};
function rh(e, r) {
  if (r === !0)
    return e.var("props", !0);
  const t = e.var("props", (0, Pe._)`{}`);
  return r !== void 0 && j0(e, t, r), t;
}
le.evaluatedPropsToName = rh;
function j0(e, r, t) {
  Object.keys(t).forEach((a) => e.assign((0, Pe._)`${r}${(0, Pe.getProperty)(a)}`, !0));
}
le.setEvaluated = j0;
const of = {};
function ly(e, r) {
  return e.scopeValue("func", {
    ref: r,
    code: of[r.code] || (of[r.code] = new ty._Code(r.code))
  });
}
le.useFunc = ly;
var Ji;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Ji || (le.Type = Ji = {}));
function uy(e, r, t) {
  if (e instanceof Pe.Name) {
    const a = r === Ji.Num;
    return t ? a ? (0, Pe._)`"[" + ${e} + "]"` : (0, Pe._)`"['" + ${e} + "']"` : a ? (0, Pe._)`"/" + ${e}` : (0, Pe._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return t ? (0, Pe.getProperty)(e).toString() : "/" + U0(e);
}
le.getErrorPath = uy;
function th(e, r, t = e.opts.strictSchema) {
  if (t) {
    if (r = `strict mode: ${r}`, t === !0)
      throw new Error(r);
    e.self.logger.warn(r);
  }
}
le.checkStrictMode = th;
var zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
const xr = ve, hy = {
  // validation function arguments
  data: new xr.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new xr.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new xr.Name("instancePath"),
  parentData: new xr.Name("parentData"),
  parentDataProperty: new xr.Name("parentDataProperty"),
  rootData: new xr.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new xr.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new xr.Name("vErrors"),
  // null or array of validation errors
  errors: new xr.Name("errors"),
  // counter of validation errors
  this: new xr.Name("this"),
  // "globals"
  self: new xr.Name("self"),
  scope: new xr.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new xr.Name("json"),
  jsonPos: new xr.Name("jsonPos"),
  jsonLen: new xr.Name("jsonLen"),
  jsonPart: new xr.Name("jsonPart")
};
zr.default = hy;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const r = ve, t = le, a = zr;
  e.keywordError = {
    message: ({ keyword: x }) => (0, r.str)`must pass "${x}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: x, schemaType: g }) => g ? (0, r.str)`"${x}" keyword must be ${g} ($data)` : (0, r.str)`"${x}" keyword is invalid ($data)`
  };
  function n(x, g = e.keywordError, T, E) {
    const { it: I } = x, { gen: D, compositeRule: L, allErrors: C } = I, z = u(x, g, T);
    E ?? (L || C) ? o(D, z) : f(I, (0, r._)`[${z}]`);
  }
  e.reportError = n;
  function s(x, g = e.keywordError, T) {
    const { it: E } = x, { gen: I, compositeRule: D, allErrors: L } = E, C = u(x, g, T);
    o(I, C), D || L || f(E, a.default.vErrors);
  }
  e.reportExtraError = s;
  function i(x, g) {
    x.assign(a.default.errors, g), x.if((0, r._)`${a.default.vErrors} !== null`, () => x.if(g, () => x.assign((0, r._)`${a.default.vErrors}.length`, g), () => x.assign(a.default.vErrors, null)));
  }
  e.resetErrorsCount = i;
  function c({ gen: x, keyword: g, schemaValue: T, data: E, errsCount: I, it: D }) {
    if (I === void 0)
      throw new Error("ajv implementation error");
    const L = x.name("err");
    x.forRange("i", I, a.default.errors, (C) => {
      x.const(L, (0, r._)`${a.default.vErrors}[${C}]`), x.if((0, r._)`${L}.instancePath === undefined`, () => x.assign((0, r._)`${L}.instancePath`, (0, r.strConcat)(a.default.instancePath, D.errorPath))), x.assign((0, r._)`${L}.schemaPath`, (0, r.str)`${D.errSchemaPath}/${g}`), D.opts.verbose && (x.assign((0, r._)`${L}.schema`, T), x.assign((0, r._)`${L}.data`, E));
    });
  }
  e.extendErrors = c;
  function o(x, g) {
    const T = x.const("err", g);
    x.if((0, r._)`${a.default.vErrors} === null`, () => x.assign(a.default.vErrors, (0, r._)`[${T}]`), (0, r._)`${a.default.vErrors}.push(${T})`), x.code((0, r._)`${a.default.errors}++`);
  }
  function f(x, g) {
    const { gen: T, validateName: E, schemaEnv: I } = x;
    I.$async ? T.throw((0, r._)`new ${x.ValidationError}(${g})`) : (T.assign((0, r._)`${E}.errors`, g), T.return(!1));
  }
  const l = {
    keyword: new r.Name("keyword"),
    schemaPath: new r.Name("schemaPath"),
    // also used in JTD errors
    params: new r.Name("params"),
    propertyName: new r.Name("propertyName"),
    message: new r.Name("message"),
    schema: new r.Name("schema"),
    parentSchema: new r.Name("parentSchema")
  };
  function u(x, g, T) {
    const { createErrors: E } = x.it;
    return E === !1 ? (0, r._)`{}` : p(x, g, T);
  }
  function p(x, g, T = {}) {
    const { gen: E, it: I } = x, D = [
      h(I, T),
      d(x, T)
    ];
    return m(x, g, D), E.object(...D);
  }
  function h({ errorPath: x }, { instancePath: g }) {
    const T = g ? (0, r.str)`${x}${(0, t.getErrorPath)(g, t.Type.Str)}` : x;
    return [a.default.instancePath, (0, r.strConcat)(a.default.instancePath, T)];
  }
  function d({ keyword: x, it: { errSchemaPath: g } }, { schemaPath: T, parentSchema: E }) {
    let I = E ? g : (0, r.str)`${g}/${x}`;
    return T && (I = (0, r.str)`${I}${(0, t.getErrorPath)(T, t.Type.Str)}`), [l.schemaPath, I];
  }
  function m(x, { params: g, message: T }, E) {
    const { keyword: I, data: D, schemaValue: L, it: C } = x, { opts: z, propertyName: U, topSchemaRef: J, schemaPath: j } = C;
    E.push([l.keyword, I], [l.params, typeof g == "function" ? g(x) : g || (0, r._)`{}`]), z.messages && E.push([l.message, typeof T == "function" ? T(x) : T]), z.verbose && E.push([l.schema, L], [l.parentSchema, (0, r._)`${J}${j}`], [a.default.data, D]), U && E.push([l.propertyName, U]);
  }
})(Kn);
Object.defineProperty(Wa, "__esModule", { value: !0 });
Wa.boolOrEmptySchema = Wa.topBoolOrEmptySchema = void 0;
const dy = Kn, py = ve, my = zr, xy = {
  message: "boolean schema is false"
};
function vy(e) {
  const { gen: r, schema: t, validateName: a } = e;
  t === !1 ? ah(e, !1) : typeof t == "object" && t.$async === !0 ? r.return(my.default.data) : (r.assign((0, py._)`${a}.errors`, null), r.return(!0));
}
Wa.topBoolOrEmptySchema = vy;
function gy(e, r) {
  const { gen: t, schema: a } = e;
  a === !1 ? (t.var(r, !1), ah(e)) : t.var(r, !0);
}
Wa.boolOrEmptySchema = gy;
function ah(e, r) {
  const { gen: t, data: a } = e, n = {
    gen: t,
    keyword: "false schema",
    data: a,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, dy.reportError)(n, xy, void 0, r);
}
var Qe = {}, _a = {};
Object.defineProperty(_a, "__esModule", { value: !0 });
_a.getRules = _a.isJSONType = void 0;
const _y = ["string", "number", "integer", "boolean", "null", "object", "array"], Ey = new Set(_y);
function yy(e) {
  return typeof e == "string" && Ey.has(e);
}
_a.isJSONType = yy;
function wy() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
_a.getRules = wy;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.shouldUseRule = Pt.shouldUseGroup = Pt.schemaHasRulesForType = void 0;
function Ty({ schema: e, self: r }, t) {
  const a = r.RULES.types[t];
  return a && a !== !0 && nh(e, a);
}
Pt.schemaHasRulesForType = Ty;
function nh(e, r) {
  return r.rules.some((t) => sh(e, t));
}
Pt.shouldUseGroup = nh;
function sh(e, r) {
  var t;
  return e[r.keyword] !== void 0 || ((t = r.definition.implements) === null || t === void 0 ? void 0 : t.some((a) => e[a] !== void 0));
}
Pt.shouldUseRule = sh;
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.reportTypeError = Qe.checkDataTypes = Qe.checkDataType = Qe.coerceAndCheckDataType = Qe.getJSONTypes = Qe.getSchemaTypes = Qe.DataType = void 0;
const ky = _a, Sy = Pt, Ay = Kn, Te = ve, ih = le;
var ja;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(ja || (Qe.DataType = ja = {}));
function $y(e) {
  const r = ch(e.type);
  if (r.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!r.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && r.push("null");
  }
  return r;
}
Qe.getSchemaTypes = $y;
function ch(e) {
  const r = Array.isArray(e) ? e : e ? [e] : [];
  if (r.every(ky.isJSONType))
    return r;
  throw new Error("type must be JSONType or JSONType[]: " + r.join(","));
}
Qe.getJSONTypes = ch;
function Fy(e, r) {
  const { gen: t, data: a, opts: n } = e, s = Cy(r, n.coerceTypes), i = r.length > 0 && !(s.length === 0 && r.length === 1 && (0, Sy.schemaHasRulesForType)(e, r[0]));
  if (i) {
    const c = V0(r, a, n.strictNumbers, ja.Wrong);
    t.if(c, () => {
      s.length ? Ry(e, r, s) : H0(e);
    });
  }
  return i;
}
Qe.coerceAndCheckDataType = Fy;
const oh = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function Cy(e, r) {
  return r ? e.filter((t) => oh.has(t) || r === "array" && t === "array") : [];
}
function Ry(e, r, t) {
  const { gen: a, data: n, opts: s } = e, i = a.let("dataType", (0, Te._)`typeof ${n}`), c = a.let("coerced", (0, Te._)`undefined`);
  s.coerceTypes === "array" && a.if((0, Te._)`${i} == 'object' && Array.isArray(${n}) && ${n}.length == 1`, () => a.assign(n, (0, Te._)`${n}[0]`).assign(i, (0, Te._)`typeof ${n}`).if(V0(r, n, s.strictNumbers), () => a.assign(c, n))), a.if((0, Te._)`${c} !== undefined`);
  for (const f of t)
    (oh.has(f) || f === "array" && s.coerceTypes === "array") && o(f);
  a.else(), H0(e), a.endIf(), a.if((0, Te._)`${c} !== undefined`, () => {
    a.assign(n, c), Oy(e, c);
  });
  function o(f) {
    switch (f) {
      case "string":
        a.elseIf((0, Te._)`${i} == "number" || ${i} == "boolean"`).assign(c, (0, Te._)`"" + ${n}`).elseIf((0, Te._)`${n} === null`).assign(c, (0, Te._)`""`);
        return;
      case "number":
        a.elseIf((0, Te._)`${i} == "boolean" || ${n} === null
              || (${i} == "string" && ${n} && ${n} == +${n})`).assign(c, (0, Te._)`+${n}`);
        return;
      case "integer":
        a.elseIf((0, Te._)`${i} === "boolean" || ${n} === null
              || (${i} === "string" && ${n} && ${n} == +${n} && !(${n} % 1))`).assign(c, (0, Te._)`+${n}`);
        return;
      case "boolean":
        a.elseIf((0, Te._)`${n} === "false" || ${n} === 0 || ${n} === null`).assign(c, !1).elseIf((0, Te._)`${n} === "true" || ${n} === 1`).assign(c, !0);
        return;
      case "null":
        a.elseIf((0, Te._)`${n} === "" || ${n} === 0 || ${n} === false`), a.assign(c, null);
        return;
      case "array":
        a.elseIf((0, Te._)`${i} === "string" || ${i} === "number"
              || ${i} === "boolean" || ${n} === null`).assign(c, (0, Te._)`[${n}]`);
    }
  }
}
function Oy({ gen: e, parentData: r, parentDataProperty: t }, a) {
  e.if((0, Te._)`${r} !== undefined`, () => e.assign((0, Te._)`${r}[${t}]`, a));
}
function Zi(e, r, t, a = ja.Correct) {
  const n = a === ja.Correct ? Te.operators.EQ : Te.operators.NEQ;
  let s;
  switch (e) {
    case "null":
      return (0, Te._)`${r} ${n} null`;
    case "array":
      s = (0, Te._)`Array.isArray(${r})`;
      break;
    case "object":
      s = (0, Te._)`${r} && typeof ${r} == "object" && !Array.isArray(${r})`;
      break;
    case "integer":
      s = i((0, Te._)`!(${r} % 1) && !isNaN(${r})`);
      break;
    case "number":
      s = i();
      break;
    default:
      return (0, Te._)`typeof ${r} ${n} ${e}`;
  }
  return a === ja.Correct ? s : (0, Te.not)(s);
  function i(c = Te.nil) {
    return (0, Te.and)((0, Te._)`typeof ${r} == "number"`, c, t ? (0, Te._)`isFinite(${r})` : Te.nil);
  }
}
Qe.checkDataType = Zi;
function V0(e, r, t, a) {
  if (e.length === 1)
    return Zi(e[0], r, t, a);
  let n;
  const s = (0, ih.toHash)(e);
  if (s.array && s.object) {
    const i = (0, Te._)`typeof ${r} != "object"`;
    n = s.null ? i : (0, Te._)`!${r} || ${i}`, delete s.null, delete s.array, delete s.object;
  } else
    n = Te.nil;
  s.number && delete s.integer;
  for (const i in s)
    n = (0, Te.and)(n, Zi(i, r, t, a));
  return n;
}
Qe.checkDataTypes = V0;
const Iy = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: r }) => typeof e == "string" ? (0, Te._)`{type: ${e}}` : (0, Te._)`{type: ${r}}`
};
function H0(e) {
  const r = Py(e);
  (0, Ay.reportError)(r, Iy);
}
Qe.reportTypeError = H0;
function Py(e) {
  const { gen: r, data: t, schema: a } = e, n = (0, ih.schemaRefOrVal)(e, a, "type");
  return {
    gen: r,
    keyword: "type",
    data: t,
    schema: a.type,
    schemaCode: n,
    schemaValue: n,
    parentSchema: a,
    params: {},
    it: e
  };
}
var Ks = {};
Object.defineProperty(Ks, "__esModule", { value: !0 });
Ks.assignDefaults = void 0;
const Ca = ve, Ny = le;
function by(e, r) {
  const { properties: t, items: a } = e.schema;
  if (r === "object" && t)
    for (const n in t)
      ff(e, n, t[n].default);
  else r === "array" && Array.isArray(a) && a.forEach((n, s) => ff(e, s, n.default));
}
Ks.assignDefaults = by;
function ff(e, r, t) {
  const { gen: a, compositeRule: n, data: s, opts: i } = e;
  if (t === void 0)
    return;
  const c = (0, Ca._)`${s}${(0, Ca.getProperty)(r)}`;
  if (n) {
    (0, Ny.checkStrictMode)(e, `default is ignored for: ${c}`);
    return;
  }
  let o = (0, Ca._)`${c} === undefined`;
  i.useDefaults === "empty" && (o = (0, Ca._)`${o} || ${c} === null || ${c} === ""`), a.if(o, (0, Ca._)`${c} = ${(0, Ca.stringify)(t)}`);
}
var xt = {}, Ae = {};
Object.defineProperty(Ae, "__esModule", { value: !0 });
Ae.validateUnion = Ae.validateArray = Ae.usePattern = Ae.callValidateCode = Ae.schemaProperties = Ae.allSchemaProperties = Ae.noPropertyInData = Ae.propertyInData = Ae.isOwnProperty = Ae.hasPropFunc = Ae.reportMissingProp = Ae.checkMissingProp = Ae.checkReportMissingProp = void 0;
const Le = ve, G0 = le, Ht = zr, Dy = le;
function Ly(e, r) {
  const { gen: t, data: a, it: n } = e;
  t.if(W0(t, a, r, n.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Le._)`${r}` }, !0), e.error();
  });
}
Ae.checkReportMissingProp = Ly;
function My({ gen: e, data: r, it: { opts: t } }, a, n) {
  return (0, Le.or)(...a.map((s) => (0, Le.and)(W0(e, r, s, t.ownProperties), (0, Le._)`${n} = ${s}`)));
}
Ae.checkMissingProp = My;
function By(e, r) {
  e.setParams({ missingProperty: r }, !0), e.error();
}
Ae.reportMissingProp = By;
function fh(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Le._)`Object.prototype.hasOwnProperty`
  });
}
Ae.hasPropFunc = fh;
function z0(e, r, t) {
  return (0, Le._)`${fh(e)}.call(${r}, ${t})`;
}
Ae.isOwnProperty = z0;
function Uy(e, r, t, a) {
  const n = (0, Le._)`${r}${(0, Le.getProperty)(t)} !== undefined`;
  return a ? (0, Le._)`${n} && ${z0(e, r, t)}` : n;
}
Ae.propertyInData = Uy;
function W0(e, r, t, a) {
  const n = (0, Le._)`${r}${(0, Le.getProperty)(t)} === undefined`;
  return a ? (0, Le.or)(n, (0, Le.not)(z0(e, r, t))) : n;
}
Ae.noPropertyInData = W0;
function lh(e) {
  return e ? Object.keys(e).filter((r) => r !== "__proto__") : [];
}
Ae.allSchemaProperties = lh;
function jy(e, r) {
  return lh(r).filter((t) => !(0, G0.alwaysValidSchema)(e, r[t]));
}
Ae.schemaProperties = jy;
function Vy({ schemaCode: e, data: r, it: { gen: t, topSchemaRef: a, schemaPath: n, errorPath: s }, it: i }, c, o, f) {
  const l = f ? (0, Le._)`${e}, ${r}, ${a}${n}` : r, u = [
    [Ht.default.instancePath, (0, Le.strConcat)(Ht.default.instancePath, s)],
    [Ht.default.parentData, i.parentData],
    [Ht.default.parentDataProperty, i.parentDataProperty],
    [Ht.default.rootData, Ht.default.rootData]
  ];
  i.opts.dynamicRef && u.push([Ht.default.dynamicAnchors, Ht.default.dynamicAnchors]);
  const p = (0, Le._)`${l}, ${t.object(...u)}`;
  return o !== Le.nil ? (0, Le._)`${c}.call(${o}, ${p})` : (0, Le._)`${c}(${p})`;
}
Ae.callValidateCode = Vy;
const Hy = (0, Le._)`new RegExp`;
function Gy({ gen: e, it: { opts: r } }, t) {
  const a = r.unicodeRegExp ? "u" : "", { regExp: n } = r.code, s = n(t, a);
  return e.scopeValue("pattern", {
    key: s.toString(),
    ref: s,
    code: (0, Le._)`${n.code === "new RegExp" ? Hy : (0, Dy.useFunc)(e, n)}(${t}, ${a})`
  });
}
Ae.usePattern = Gy;
function zy(e) {
  const { gen: r, data: t, keyword: a, it: n } = e, s = r.name("valid");
  if (n.allErrors) {
    const c = r.let("valid", !0);
    return i(() => r.assign(c, !1)), c;
  }
  return r.var(s, !0), i(() => r.break()), s;
  function i(c) {
    const o = r.const("len", (0, Le._)`${t}.length`);
    r.forRange("i", 0, o, (f) => {
      e.subschema({
        keyword: a,
        dataProp: f,
        dataPropType: G0.Type.Num
      }, s), r.if((0, Le.not)(s), c);
    });
  }
}
Ae.validateArray = zy;
function Wy(e) {
  const { gen: r, schema: t, keyword: a, it: n } = e;
  if (!Array.isArray(t))
    throw new Error("ajv implementation error");
  if (t.some((o) => (0, G0.alwaysValidSchema)(n, o)) && !n.opts.unevaluated)
    return;
  const i = r.let("valid", !1), c = r.name("_valid");
  r.block(() => t.forEach((o, f) => {
    const l = e.subschema({
      keyword: a,
      schemaProp: f,
      compositeRule: !0
    }, c);
    r.assign(i, (0, Le._)`${i} || ${c}`), e.mergeValidEvaluated(l, c) || r.if((0, Le.not)(i));
  })), e.result(i, () => e.reset(), () => e.error(!0));
}
Ae.validateUnion = Wy;
Object.defineProperty(xt, "__esModule", { value: !0 });
xt.validateKeywordUsage = xt.validSchemaType = xt.funcKeywordCode = xt.macroKeywordCode = void 0;
const Sr = ve, oa = zr, Xy = Ae, Ky = Kn;
function qy(e, r) {
  const { gen: t, keyword: a, schema: n, parentSchema: s, it: i } = e, c = r.macro.call(i.self, n, s, i), o = uh(t, a, c);
  i.opts.validateSchema !== !1 && i.self.validateSchema(c, !0);
  const f = t.name("valid");
  e.subschema({
    schema: c,
    schemaPath: Sr.nil,
    errSchemaPath: `${i.errSchemaPath}/${a}`,
    topSchemaRef: o,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
xt.macroKeywordCode = qy;
function Yy(e, r) {
  var t;
  const { gen: a, keyword: n, schema: s, parentSchema: i, $data: c, it: o } = e;
  Zy(o, r);
  const f = !c && r.compile ? r.compile.call(o.self, s, i, o) : r.validate, l = uh(a, n, f), u = a.let("valid");
  e.block$data(u, p), e.ok((t = r.valid) !== null && t !== void 0 ? t : u);
  function p() {
    if (r.errors === !1)
      m(), r.modifying && lf(e), x(() => e.error());
    else {
      const g = r.async ? h() : d();
      r.modifying && lf(e), x(() => Jy(e, g));
    }
  }
  function h() {
    const g = a.let("ruleErrs", null);
    return a.try(() => m((0, Sr._)`await `), (T) => a.assign(u, !1).if((0, Sr._)`${T} instanceof ${o.ValidationError}`, () => a.assign(g, (0, Sr._)`${T}.errors`), () => a.throw(T))), g;
  }
  function d() {
    const g = (0, Sr._)`${l}.errors`;
    return a.assign(g, null), m(Sr.nil), g;
  }
  function m(g = r.async ? (0, Sr._)`await ` : Sr.nil) {
    const T = o.opts.passContext ? oa.default.this : oa.default.self, E = !("compile" in r && !c || r.schema === !1);
    a.assign(u, (0, Sr._)`${g}${(0, Xy.callValidateCode)(e, l, T, E)}`, r.modifying);
  }
  function x(g) {
    var T;
    a.if((0, Sr.not)((T = r.valid) !== null && T !== void 0 ? T : u), g);
  }
}
xt.funcKeywordCode = Yy;
function lf(e) {
  const { gen: r, data: t, it: a } = e;
  r.if(a.parentData, () => r.assign(t, (0, Sr._)`${a.parentData}[${a.parentDataProperty}]`));
}
function Jy(e, r) {
  const { gen: t } = e;
  t.if((0, Sr._)`Array.isArray(${r})`, () => {
    t.assign(oa.default.vErrors, (0, Sr._)`${oa.default.vErrors} === null ? ${r} : ${oa.default.vErrors}.concat(${r})`).assign(oa.default.errors, (0, Sr._)`${oa.default.vErrors}.length`), (0, Ky.extendErrors)(e);
  }, () => e.error());
}
function Zy({ schemaEnv: e }, r) {
  if (r.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function uh(e, r, t) {
  if (t === void 0)
    throw new Error(`keyword "${r}" failed to compile`);
  return e.scopeValue("keyword", typeof t == "function" ? { ref: t } : { ref: t, code: (0, Sr.stringify)(t) });
}
function Qy(e, r, t = !1) {
  return !r.length || r.some((a) => a === "array" ? Array.isArray(e) : a === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == a || t && typeof e > "u");
}
xt.validSchemaType = Qy;
function ew({ schema: e, opts: r, self: t, errSchemaPath: a }, n, s) {
  if (Array.isArray(n.keyword) ? !n.keyword.includes(s) : n.keyword !== s)
    throw new Error("ajv implementation error");
  const i = n.dependencies;
  if (i != null && i.some((c) => !Object.prototype.hasOwnProperty.call(e, c)))
    throw new Error(`parent schema must have dependencies of ${s}: ${i.join(",")}`);
  if (n.validateSchema && !n.validateSchema(e[s])) {
    const o = `keyword "${s}" value is invalid at path "${a}": ` + t.errorsText(n.validateSchema.errors);
    if (r.validateSchema === "log")
      t.logger.error(o);
    else
      throw new Error(o);
  }
}
xt.validateKeywordUsage = ew;
var ea = {};
Object.defineProperty(ea, "__esModule", { value: !0 });
ea.extendSubschemaMode = ea.extendSubschemaData = ea.getSubschema = void 0;
const mt = ve, hh = le;
function rw(e, { keyword: r, schemaProp: t, schema: a, schemaPath: n, errSchemaPath: s, topSchemaRef: i }) {
  if (r !== void 0 && a !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (r !== void 0) {
    const c = e.schema[r];
    return t === void 0 ? {
      schema: c,
      schemaPath: (0, mt._)`${e.schemaPath}${(0, mt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${r}`
    } : {
      schema: c[t],
      schemaPath: (0, mt._)`${e.schemaPath}${(0, mt.getProperty)(r)}${(0, mt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${r}/${(0, hh.escapeFragment)(t)}`
    };
  }
  if (a !== void 0) {
    if (n === void 0 || s === void 0 || i === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: a,
      schemaPath: n,
      topSchemaRef: i,
      errSchemaPath: s
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
ea.getSubschema = rw;
function tw(e, r, { dataProp: t, dataPropType: a, data: n, dataTypes: s, propertyName: i }) {
  if (n !== void 0 && t !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: c } = r;
  if (t !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = r, p = c.let("data", (0, mt._)`${r.data}${(0, mt.getProperty)(t)}`, !0);
    o(p), e.errorPath = (0, mt.str)`${f}${(0, hh.getErrorPath)(t, a, u.jsPropertySyntax)}`, e.parentDataProperty = (0, mt._)`${t}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (n !== void 0) {
    const f = n instanceof mt.Name ? n : c.let("data", n, !0);
    o(f), i !== void 0 && (e.propertyName = i);
  }
  s && (e.dataTypes = s);
  function o(f) {
    e.data = f, e.dataLevel = r.dataLevel + 1, e.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), e.parentData = r.data, e.dataNames = [...r.dataNames, f];
  }
}
ea.extendSubschemaData = tw;
function aw(e, { jtdDiscriminator: r, jtdMetadata: t, compositeRule: a, createErrors: n, allErrors: s }) {
  a !== void 0 && (e.compositeRule = a), n !== void 0 && (e.createErrors = n), s !== void 0 && (e.allErrors = s), e.jtdDiscriminator = r, e.jtdMetadata = t;
}
ea.extendSubschemaMode = aw;
var fr = {}, dh = function e(r, t) {
  if (r === t) return !0;
  if (r && t && typeof r == "object" && typeof t == "object") {
    if (r.constructor !== t.constructor) return !1;
    var a, n, s;
    if (Array.isArray(r)) {
      if (a = r.length, a != t.length) return !1;
      for (n = a; n-- !== 0; )
        if (!e(r[n], t[n])) return !1;
      return !0;
    }
    if (r.constructor === RegExp) return r.source === t.source && r.flags === t.flags;
    if (r.valueOf !== Object.prototype.valueOf) return r.valueOf() === t.valueOf();
    if (r.toString !== Object.prototype.toString) return r.toString() === t.toString();
    if (s = Object.keys(r), a = s.length, a !== Object.keys(t).length) return !1;
    for (n = a; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(t, s[n])) return !1;
    for (n = a; n-- !== 0; ) {
      var i = s[n];
      if (!e(r[i], t[i])) return !1;
    }
    return !0;
  }
  return r !== r && t !== t;
}, ph = { exports: {} }, Zt = ph.exports = function(e, r, t) {
  typeof r == "function" && (t = r, r = {}), t = r.cb || t;
  var a = typeof t == "function" ? t : t.pre || function() {
  }, n = t.post || function() {
  };
  gs(r, a, n, e, "", e);
};
Zt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Zt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Zt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Zt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function gs(e, r, t, a, n, s, i, c, o, f) {
  if (a && typeof a == "object" && !Array.isArray(a)) {
    r(a, n, s, i, c, o, f);
    for (var l in a) {
      var u = a[l];
      if (Array.isArray(u)) {
        if (l in Zt.arrayKeywords)
          for (var p = 0; p < u.length; p++)
            gs(e, r, t, u[p], n + "/" + l + "/" + p, s, n, l, a, p);
      } else if (l in Zt.propsKeywords) {
        if (u && typeof u == "object")
          for (var h in u)
            gs(e, r, t, u[h], n + "/" + l + "/" + nw(h), s, n, l, a, h);
      } else (l in Zt.keywords || e.allKeys && !(l in Zt.skipKeywords)) && gs(e, r, t, u, n + "/" + l, s, n, l, a);
    }
    t(a, n, s, i, c, o, f);
  }
}
function nw(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var sw = ph.exports;
Object.defineProperty(fr, "__esModule", { value: !0 });
fr.getSchemaRefs = fr.resolveUrl = fr.normalizeId = fr._getFullPath = fr.getFullPath = fr.inlineRef = void 0;
const iw = le, cw = dh, ow = sw, fw = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function lw(e, r = !0) {
  return typeof e == "boolean" ? !0 : r === !0 ? !Qi(e) : r ? mh(e) <= r : !1;
}
fr.inlineRef = lw;
const uw = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Qi(e) {
  for (const r in e) {
    if (uw.has(r))
      return !0;
    const t = e[r];
    if (Array.isArray(t) && t.some(Qi) || typeof t == "object" && Qi(t))
      return !0;
  }
  return !1;
}
function mh(e) {
  let r = 0;
  for (const t in e) {
    if (t === "$ref")
      return 1 / 0;
    if (r++, !fw.has(t) && (typeof e[t] == "object" && (0, iw.eachItem)(e[t], (a) => r += mh(a)), r === 1 / 0))
      return 1 / 0;
  }
  return r;
}
function xh(e, r = "", t) {
  t !== !1 && (r = Va(r));
  const a = e.parse(r);
  return vh(e, a);
}
fr.getFullPath = xh;
function vh(e, r) {
  return e.serialize(r).split("#")[0] + "#";
}
fr._getFullPath = vh;
const hw = /#\/?$/;
function Va(e) {
  return e ? e.replace(hw, "") : "";
}
fr.normalizeId = Va;
function dw(e, r, t) {
  return t = Va(t), e.resolve(r, t);
}
fr.resolveUrl = dw;
const pw = /^[a-z_][-a-z0-9._]*$/i;
function mw(e, r) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: t, uriResolver: a } = this.opts, n = Va(e[t] || r), s = { "": n }, i = xh(a, n, !1), c = {}, o = /* @__PURE__ */ new Set();
  return ow(e, { allKeys: !0 }, (u, p, h, d) => {
    if (d === void 0)
      return;
    const m = i + p;
    let x = s[d];
    typeof u[t] == "string" && (x = g.call(this, u[t])), T.call(this, u.$anchor), T.call(this, u.$dynamicAnchor), s[p] = x;
    function g(E) {
      const I = this.opts.uriResolver.resolve;
      if (E = Va(x ? I(x, E) : E), o.has(E))
        throw l(E);
      o.add(E);
      let D = this.refs[E];
      return typeof D == "string" && (D = this.refs[D]), typeof D == "object" ? f(u, D.schema, E) : E !== Va(m) && (E[0] === "#" ? (f(u, c[E], E), c[E] = u) : this.refs[E] = m), E;
    }
    function T(E) {
      if (typeof E == "string") {
        if (!pw.test(E))
          throw new Error(`invalid anchor "${E}"`);
        g.call(this, `#${E}`);
      }
    }
  }), c;
  function f(u, p, h) {
    if (p !== void 0 && !cw(u, p))
      throw l(h);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
fr.getSchemaRefs = mw;
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.getData = Zr.KeywordCxt = Zr.validateFunctionCode = void 0;
const gh = Wa, uf = Qe, X0 = Pt, Ds = Qe, xw = Ks, Fn = xt, Si = ea, de = ve, xe = zr, vw = fr, Nt = le, ln = Kn;
function gw(e) {
  if (yh(e) && (wh(e), Eh(e))) {
    yw(e);
    return;
  }
  _h(e, () => (0, gh.topBoolOrEmptySchema)(e));
}
Zr.validateFunctionCode = gw;
function _h({ gen: e, validateName: r, schema: t, schemaEnv: a, opts: n }, s) {
  n.code.es5 ? e.func(r, (0, de._)`${xe.default.data}, ${xe.default.valCxt}`, a.$async, () => {
    e.code((0, de._)`"use strict"; ${hf(t, n)}`), Ew(e, n), e.code(s);
  }) : e.func(r, (0, de._)`${xe.default.data}, ${_w(n)}`, a.$async, () => e.code(hf(t, n)).code(s));
}
function _w(e) {
  return (0, de._)`{${xe.default.instancePath}="", ${xe.default.parentData}, ${xe.default.parentDataProperty}, ${xe.default.rootData}=${xe.default.data}${e.dynamicRef ? (0, de._)`, ${xe.default.dynamicAnchors}={}` : de.nil}}={}`;
}
function Ew(e, r) {
  e.if(xe.default.valCxt, () => {
    e.var(xe.default.instancePath, (0, de._)`${xe.default.valCxt}.${xe.default.instancePath}`), e.var(xe.default.parentData, (0, de._)`${xe.default.valCxt}.${xe.default.parentData}`), e.var(xe.default.parentDataProperty, (0, de._)`${xe.default.valCxt}.${xe.default.parentDataProperty}`), e.var(xe.default.rootData, (0, de._)`${xe.default.valCxt}.${xe.default.rootData}`), r.dynamicRef && e.var(xe.default.dynamicAnchors, (0, de._)`${xe.default.valCxt}.${xe.default.dynamicAnchors}`);
  }, () => {
    e.var(xe.default.instancePath, (0, de._)`""`), e.var(xe.default.parentData, (0, de._)`undefined`), e.var(xe.default.parentDataProperty, (0, de._)`undefined`), e.var(xe.default.rootData, xe.default.data), r.dynamicRef && e.var(xe.default.dynamicAnchors, (0, de._)`{}`);
  });
}
function yw(e) {
  const { schema: r, opts: t, gen: a } = e;
  _h(e, () => {
    t.$comment && r.$comment && kh(e), Aw(e), a.let(xe.default.vErrors, null), a.let(xe.default.errors, 0), t.unevaluated && ww(e), Th(e), Cw(e);
  });
}
function ww(e) {
  const { gen: r, validateName: t } = e;
  e.evaluated = r.const("evaluated", (0, de._)`${t}.evaluated`), r.if((0, de._)`${e.evaluated}.dynamicProps`, () => r.assign((0, de._)`${e.evaluated}.props`, (0, de._)`undefined`)), r.if((0, de._)`${e.evaluated}.dynamicItems`, () => r.assign((0, de._)`${e.evaluated}.items`, (0, de._)`undefined`));
}
function hf(e, r) {
  const t = typeof e == "object" && e[r.schemaId];
  return t && (r.code.source || r.code.process) ? (0, de._)`/*# sourceURL=${t} */` : de.nil;
}
function Tw(e, r) {
  if (yh(e) && (wh(e), Eh(e))) {
    kw(e, r);
    return;
  }
  (0, gh.boolOrEmptySchema)(e, r);
}
function Eh({ schema: e, self: r }) {
  if (typeof e == "boolean")
    return !e;
  for (const t in e)
    if (r.RULES.all[t])
      return !0;
  return !1;
}
function yh(e) {
  return typeof e.schema != "boolean";
}
function kw(e, r) {
  const { schema: t, gen: a, opts: n } = e;
  n.$comment && t.$comment && kh(e), $w(e), Fw(e);
  const s = a.const("_errs", xe.default.errors);
  Th(e, s), a.var(r, (0, de._)`${s} === ${xe.default.errors}`);
}
function wh(e) {
  (0, Nt.checkUnknownRules)(e), Sw(e);
}
function Th(e, r) {
  if (e.opts.jtd)
    return df(e, [], !1, r);
  const t = (0, uf.getSchemaTypes)(e.schema), a = (0, uf.coerceAndCheckDataType)(e, t);
  df(e, t, !a, r);
}
function Sw(e) {
  const { schema: r, errSchemaPath: t, opts: a, self: n } = e;
  r.$ref && a.ignoreKeywordsWithRef && (0, Nt.schemaHasRulesButRef)(r, n.RULES) && n.logger.warn(`$ref: keywords ignored in schema at path "${t}"`);
}
function Aw(e) {
  const { schema: r, opts: t } = e;
  r.default !== void 0 && t.useDefaults && t.strictSchema && (0, Nt.checkStrictMode)(e, "default is ignored in the schema root");
}
function $w(e) {
  const r = e.schema[e.opts.schemaId];
  r && (e.baseId = (0, vw.resolveUrl)(e.opts.uriResolver, e.baseId, r));
}
function Fw(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function kh({ gen: e, schemaEnv: r, schema: t, errSchemaPath: a, opts: n }) {
  const s = t.$comment;
  if (n.$comment === !0)
    e.code((0, de._)`${xe.default.self}.logger.log(${s})`);
  else if (typeof n.$comment == "function") {
    const i = (0, de.str)`${a}/$comment`, c = e.scopeValue("root", { ref: r.root });
    e.code((0, de._)`${xe.default.self}.opts.$comment(${s}, ${i}, ${c}.schema)`);
  }
}
function Cw(e) {
  const { gen: r, schemaEnv: t, validateName: a, ValidationError: n, opts: s } = e;
  t.$async ? r.if((0, de._)`${xe.default.errors} === 0`, () => r.return(xe.default.data), () => r.throw((0, de._)`new ${n}(${xe.default.vErrors})`)) : (r.assign((0, de._)`${a}.errors`, xe.default.vErrors), s.unevaluated && Rw(e), r.return((0, de._)`${xe.default.errors} === 0`));
}
function Rw({ gen: e, evaluated: r, props: t, items: a }) {
  t instanceof de.Name && e.assign((0, de._)`${r}.props`, t), a instanceof de.Name && e.assign((0, de._)`${r}.items`, a);
}
function df(e, r, t, a) {
  const { gen: n, schema: s, data: i, allErrors: c, opts: o, self: f } = e, { RULES: l } = f;
  if (s.$ref && (o.ignoreKeywordsWithRef || !(0, Nt.schemaHasRulesButRef)(s, l))) {
    n.block(() => $h(e, "$ref", l.all.$ref.definition));
    return;
  }
  o.jtd || Ow(e, r), n.block(() => {
    for (const p of l.rules)
      u(p);
    u(l.post);
  });
  function u(p) {
    (0, X0.shouldUseGroup)(s, p) && (p.type ? (n.if((0, Ds.checkDataType)(p.type, i, o.strictNumbers)), pf(e, p), r.length === 1 && r[0] === p.type && t && (n.else(), (0, Ds.reportTypeError)(e)), n.endIf()) : pf(e, p), c || n.if((0, de._)`${xe.default.errors} === ${a || 0}`));
  }
}
function pf(e, r) {
  const { gen: t, schema: a, opts: { useDefaults: n } } = e;
  n && (0, xw.assignDefaults)(e, r.type), t.block(() => {
    for (const s of r.rules)
      (0, X0.shouldUseRule)(a, s) && $h(e, s.keyword, s.definition, r.type);
  });
}
function Ow(e, r) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Iw(e, r), e.opts.allowUnionTypes || Pw(e, r), Nw(e, e.dataTypes));
}
function Iw(e, r) {
  if (r.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = r;
      return;
    }
    r.forEach((t) => {
      Sh(e.dataTypes, t) || K0(e, `type "${t}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Dw(e, r);
  }
}
function Pw(e, r) {
  r.length > 1 && !(r.length === 2 && r.includes("null")) && K0(e, "use allowUnionTypes to allow union type keyword");
}
function Nw(e, r) {
  const t = e.self.RULES.all;
  for (const a in t) {
    const n = t[a];
    if (typeof n == "object" && (0, X0.shouldUseRule)(e.schema, n)) {
      const { type: s } = n.definition;
      s.length && !s.some((i) => bw(r, i)) && K0(e, `missing type "${s.join(",")}" for keyword "${a}"`);
    }
  }
}
function bw(e, r) {
  return e.includes(r) || r === "number" && e.includes("integer");
}
function Sh(e, r) {
  return e.includes(r) || r === "integer" && e.includes("number");
}
function Dw(e, r) {
  const t = [];
  for (const a of e.dataTypes)
    Sh(r, a) ? t.push(a) : r.includes("integer") && a === "number" && t.push("integer");
  e.dataTypes = t;
}
function K0(e, r) {
  const t = e.schemaEnv.baseId + e.errSchemaPath;
  r += ` at "${t}" (strictTypes)`, (0, Nt.checkStrictMode)(e, r, e.opts.strictTypes);
}
class Ah {
  constructor(r, t, a) {
    if ((0, Fn.validateKeywordUsage)(r, t, a), this.gen = r.gen, this.allErrors = r.allErrors, this.keyword = a, this.data = r.data, this.schema = r.schema[a], this.$data = t.$data && r.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Nt.schemaRefOrVal)(r, this.schema, a, this.$data), this.schemaType = t.schemaType, this.parentSchema = r.schema, this.params = {}, this.it = r, this.def = t, this.$data)
      this.schemaCode = r.gen.const("vSchema", Fh(this.$data, r));
    else if (this.schemaCode = this.schemaValue, !(0, Fn.validSchemaType)(this.schema, t.schemaType, t.allowUndefined))
      throw new Error(`${a} value must be ${JSON.stringify(t.schemaType)}`);
    ("code" in t ? t.trackErrors : t.errors !== !1) && (this.errsCount = r.gen.const("_errs", xe.default.errors));
  }
  result(r, t, a) {
    this.failResult((0, de.not)(r), t, a);
  }
  failResult(r, t, a) {
    this.gen.if(r), a ? a() : this.error(), t ? (this.gen.else(), t(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(r, t) {
    this.failResult((0, de.not)(r), void 0, t);
  }
  fail(r) {
    if (r === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(r), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(r) {
    if (!this.$data)
      return this.fail(r);
    const { schemaCode: t } = this;
    this.fail((0, de._)`${t} !== undefined && (${(0, de.or)(this.invalid$data(), r)})`);
  }
  error(r, t, a) {
    if (t) {
      this.setParams(t), this._error(r, a), this.setParams({});
      return;
    }
    this._error(r, a);
  }
  _error(r, t) {
    (r ? ln.reportExtraError : ln.reportError)(this, this.def.error, t);
  }
  $dataError() {
    (0, ln.reportError)(this, this.def.$dataError || ln.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, ln.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(r) {
    this.allErrors || this.gen.if(r);
  }
  setParams(r, t) {
    t ? Object.assign(this.params, r) : this.params = r;
  }
  block$data(r, t, a = de.nil) {
    this.gen.block(() => {
      this.check$data(r, a), t();
    });
  }
  check$data(r = de.nil, t = de.nil) {
    if (!this.$data)
      return;
    const { gen: a, schemaCode: n, schemaType: s, def: i } = this;
    a.if((0, de.or)((0, de._)`${n} === undefined`, t)), r !== de.nil && a.assign(r, !0), (s.length || i.validateSchema) && (a.elseIf(this.invalid$data()), this.$dataError(), r !== de.nil && a.assign(r, !1)), a.else();
  }
  invalid$data() {
    const { gen: r, schemaCode: t, schemaType: a, def: n, it: s } = this;
    return (0, de.or)(i(), c());
    function i() {
      if (a.length) {
        if (!(t instanceof de.Name))
          throw new Error("ajv implementation error");
        const o = Array.isArray(a) ? a : [a];
        return (0, de._)`${(0, Ds.checkDataTypes)(o, t, s.opts.strictNumbers, Ds.DataType.Wrong)}`;
      }
      return de.nil;
    }
    function c() {
      if (n.validateSchema) {
        const o = r.scopeValue("validate$data", { ref: n.validateSchema });
        return (0, de._)`!${o}(${t})`;
      }
      return de.nil;
    }
  }
  subschema(r, t) {
    const a = (0, Si.getSubschema)(this.it, r);
    (0, Si.extendSubschemaData)(a, this.it, r), (0, Si.extendSubschemaMode)(a, r);
    const n = { ...this.it, ...a, items: void 0, props: void 0 };
    return Tw(n, t), n;
  }
  mergeEvaluated(r, t) {
    const { it: a, gen: n } = this;
    a.opts.unevaluated && (a.props !== !0 && r.props !== void 0 && (a.props = Nt.mergeEvaluated.props(n, r.props, a.props, t)), a.items !== !0 && r.items !== void 0 && (a.items = Nt.mergeEvaluated.items(n, r.items, a.items, t)));
  }
  mergeValidEvaluated(r, t) {
    const { it: a, gen: n } = this;
    if (a.opts.unevaluated && (a.props !== !0 || a.items !== !0))
      return n.if(t, () => this.mergeEvaluated(r, de.Name)), !0;
  }
}
Zr.KeywordCxt = Ah;
function $h(e, r, t, a) {
  const n = new Ah(e, t, r);
  "code" in t ? t.code(n, a) : n.$data && t.validate ? (0, Fn.funcKeywordCode)(n, t) : "macro" in t ? (0, Fn.macroKeywordCode)(n, t) : (t.compile || t.validate) && (0, Fn.funcKeywordCode)(n, t);
}
const Lw = /^\/(?:[^~]|~0|~1)*$/, Mw = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Fh(e, { dataLevel: r, dataNames: t, dataPathArr: a }) {
  let n, s;
  if (e === "")
    return xe.default.rootData;
  if (e[0] === "/") {
    if (!Lw.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    n = e, s = xe.default.rootData;
  } else {
    const f = Mw.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +f[1];
    if (n = f[2], n === "#") {
      if (l >= r)
        throw new Error(o("property/index", l));
      return a[r - l];
    }
    if (l > r)
      throw new Error(o("data", l));
    if (s = t[r - l], !n)
      return s;
  }
  let i = s;
  const c = n.split("/");
  for (const f of c)
    f && (s = (0, de._)`${s}${(0, de.getProperty)((0, Nt.unescapeJsonPointer)(f))}`, i = (0, de._)`${i} && ${s}`);
  return i;
  function o(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${r}`;
  }
}
Zr.getData = Fh;
var Ya = {};
Object.defineProperty(Ya, "__esModule", { value: !0 });
class Bw extends Error {
  constructor(r) {
    super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
  }
}
Ya.default = Bw;
var $a = {};
Object.defineProperty($a, "__esModule", { value: !0 });
const Ai = fr;
class Uw extends Error {
  constructor(r, t, a, n) {
    super(n || `can't resolve reference ${a} from id ${t}`), this.missingRef = (0, Ai.resolveUrl)(r, t, a), this.missingSchema = (0, Ai.normalizeId)((0, Ai.getFullPath)(r, this.missingRef));
  }
}
$a.default = Uw;
var Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.resolveSchema = Fr.getCompilingSchema = Fr.resolveRef = Fr.compileSchema = Fr.SchemaEnv = void 0;
const at = ve, jw = Ya, ia = zr, it = fr, mf = le, Vw = Zr;
class qs {
  constructor(r) {
    var t;
    this.refs = {}, this.dynamicAnchors = {};
    let a;
    typeof r.schema == "object" && (a = r.schema), this.schema = r.schema, this.schemaId = r.schemaId, this.root = r.root || this, this.baseId = (t = r.baseId) !== null && t !== void 0 ? t : (0, it.normalizeId)(a == null ? void 0 : a[r.schemaId || "$id"]), this.schemaPath = r.schemaPath, this.localRefs = r.localRefs, this.meta = r.meta, this.$async = a == null ? void 0 : a.$async, this.refs = {};
  }
}
Fr.SchemaEnv = qs;
function q0(e) {
  const r = Ch.call(this, e);
  if (r)
    return r;
  const t = (0, it.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: a, lines: n } = this.opts.code, { ownProperties: s } = this.opts, i = new at.CodeGen(this.scope, { es5: a, lines: n, ownProperties: s });
  let c;
  e.$async && (c = i.scopeValue("Error", {
    ref: jw.default,
    code: (0, at._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const o = i.scopeName("validate");
  e.validateName = o;
  const f = {
    gen: i,
    allErrors: this.opts.allErrors,
    data: ia.default.data,
    parentData: ia.default.parentData,
    parentDataProperty: ia.default.parentDataProperty,
    dataNames: [ia.default.data],
    dataPathArr: [at.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: i.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, at.stringify)(e.schema) } : { ref: e.schema }),
    validateName: o,
    ValidationError: c,
    schema: e.schema,
    schemaEnv: e,
    rootId: t,
    baseId: e.baseId || t,
    schemaPath: at.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, at._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, Vw.validateFunctionCode)(f), i.optimize(this.opts.code.optimize);
    const u = i.toString();
    l = `${i.scopeRefs(ia.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${ia.default.self}`, `${ia.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(o, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: o, validateCode: u, scopeValues: i._values }), this.opts.unevaluated) {
      const { props: d, items: m } = f;
      h.evaluated = {
        props: d instanceof at.Name ? void 0 : d,
        items: m instanceof at.Name ? void 0 : m,
        dynamicProps: d instanceof at.Name,
        dynamicItems: m instanceof at.Name
      }, h.source && (h.source.evaluated = (0, at.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
Fr.compileSchema = q0;
function Hw(e, r, t) {
  var a;
  t = (0, it.resolveUrl)(this.opts.uriResolver, r, t);
  const n = e.refs[t];
  if (n)
    return n;
  let s = Ww.call(this, e, t);
  if (s === void 0) {
    const i = (a = e.localRefs) === null || a === void 0 ? void 0 : a[t], { schemaId: c } = this.opts;
    i && (s = new qs({ schema: i, schemaId: c, root: e, baseId: r }));
  }
  if (s !== void 0)
    return e.refs[t] = Gw.call(this, s);
}
Fr.resolveRef = Hw;
function Gw(e) {
  return (0, it.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : q0.call(this, e);
}
function Ch(e) {
  for (const r of this._compilations)
    if (zw(r, e))
      return r;
}
Fr.getCompilingSchema = Ch;
function zw(e, r) {
  return e.schema === r.schema && e.root === r.root && e.baseId === r.baseId;
}
function Ww(e, r) {
  let t;
  for (; typeof (t = this.refs[r]) == "string"; )
    r = t;
  return t || this.schemas[r] || Ys.call(this, e, r);
}
function Ys(e, r) {
  const t = this.opts.uriResolver.parse(r), a = (0, it._getFullPath)(this.opts.uriResolver, t);
  let n = (0, it.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && a === n)
    return $i.call(this, t, e);
  const s = (0, it.normalizeId)(a), i = this.refs[s] || this.schemas[s];
  if (typeof i == "string") {
    const c = Ys.call(this, e, i);
    return typeof (c == null ? void 0 : c.schema) != "object" ? void 0 : $i.call(this, t, c);
  }
  if (typeof (i == null ? void 0 : i.schema) == "object") {
    if (i.validate || q0.call(this, i), s === (0, it.normalizeId)(r)) {
      const { schema: c } = i, { schemaId: o } = this.opts, f = c[o];
      return f && (n = (0, it.resolveUrl)(this.opts.uriResolver, n, f)), new qs({ schema: c, schemaId: o, root: e, baseId: n });
    }
    return $i.call(this, t, i);
  }
}
Fr.resolveSchema = Ys;
const Xw = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function $i(e, { baseId: r, schema: t, root: a }) {
  var n;
  if (((n = e.fragment) === null || n === void 0 ? void 0 : n[0]) !== "/")
    return;
  for (const c of e.fragment.slice(1).split("/")) {
    if (typeof t == "boolean")
      return;
    const o = t[(0, mf.unescapeFragment)(c)];
    if (o === void 0)
      return;
    t = o;
    const f = typeof t == "object" && t[this.opts.schemaId];
    !Xw.has(c) && f && (r = (0, it.resolveUrl)(this.opts.uriResolver, r, f));
  }
  let s;
  if (typeof t != "boolean" && t.$ref && !(0, mf.schemaHasRulesButRef)(t, this.RULES)) {
    const c = (0, it.resolveUrl)(this.opts.uriResolver, r, t.$ref);
    s = Ys.call(this, a, c);
  }
  const { schemaId: i } = this.opts;
  if (s = s || new qs({ schema: t, schemaId: i, root: a, baseId: r }), s.schema !== s.root.schema)
    return s;
}
const Kw = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", qw = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Yw = "object", Jw = [
  "$data"
], Zw = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Qw = !1, eT = {
  $id: Kw,
  description: qw,
  type: Yw,
  required: Jw,
  properties: Zw,
  additionalProperties: Qw
};
var Y0 = {}, Js = { exports: {} };
const rT = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var tT = {
  HEX: rT
};
const { HEX: aT } = tT, nT = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function Rh(e) {
  if (Ih(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const r = e.match(nT) || [], [t] = r;
  return t ? { host: iT(t, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function e0(e, r = !1) {
  let t = "", a = !0;
  for (const n of e) {
    if (aT[n] === void 0) return;
    n !== "0" && a === !0 && (a = !1), a || (t += n);
  }
  return r && t.length === 0 && (t = "0"), t;
}
function sT(e) {
  let r = 0;
  const t = { error: !1, address: "", zone: "" }, a = [], n = [];
  let s = !1, i = !1, c = !1;
  function o() {
    if (n.length) {
      if (s === !1) {
        const f = e0(n);
        if (f !== void 0)
          a.push(f);
        else
          return t.error = !0, !1;
      }
      n.length = 0;
    }
    return !0;
  }
  for (let f = 0; f < e.length; f++) {
    const l = e[f];
    if (!(l === "[" || l === "]"))
      if (l === ":") {
        if (i === !0 && (c = !0), !o())
          break;
        if (r++, a.push(":"), r > 7) {
          t.error = !0;
          break;
        }
        f - 1 >= 0 && e[f - 1] === ":" && (i = !0);
        continue;
      } else if (l === "%") {
        if (!o())
          break;
        s = !0;
      } else {
        n.push(l);
        continue;
      }
  }
  return n.length && (s ? t.zone = n.join("") : c ? a.push(n.join("")) : a.push(e0(n))), t.address = a.join(""), t;
}
function Oh(e) {
  if (Ih(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const r = sT(e);
  if (r.error)
    return { host: e, isIPV6: !1 };
  {
    let t = r.address, a = r.address;
    return r.zone && (t += "%" + r.zone, a += "%25" + r.zone), { host: t, escapedHost: a, isIPV6: !0 };
  }
}
function iT(e, r) {
  let t = "", a = !0;
  const n = e.length;
  for (let s = 0; s < n; s++) {
    const i = e[s];
    i === "0" && a ? (s + 1 <= n && e[s + 1] === r || s + 1 === n) && (t += i, a = !1) : (i === r ? a = !0 : a = !1, t += i);
  }
  return t;
}
function Ih(e, r) {
  let t = 0;
  for (let a = 0; a < e.length; a++)
    e[a] === r && t++;
  return t;
}
const xf = /^\.\.?\//u, vf = /^\/\.(?:\/|$)/u, gf = /^\/\.\.(?:\/|$)/u, cT = /^\/?(?:.|\n)*?(?=\/|$)/u;
function oT(e) {
  const r = [];
  for (; e.length; )
    if (e.match(xf))
      e = e.replace(xf, "");
    else if (e.match(vf))
      e = e.replace(vf, "/");
    else if (e.match(gf))
      e = e.replace(gf, "/"), r.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const t = e.match(cT);
      if (t) {
        const a = t[0];
        e = e.slice(a.length), r.push(a);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return r.join("");
}
function fT(e, r) {
  const t = r !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = t(e.scheme)), e.userinfo !== void 0 && (e.userinfo = t(e.userinfo)), e.host !== void 0 && (e.host = t(e.host)), e.path !== void 0 && (e.path = t(e.path)), e.query !== void 0 && (e.query = t(e.query)), e.fragment !== void 0 && (e.fragment = t(e.fragment)), e;
}
function lT(e) {
  const r = [];
  if (e.userinfo !== void 0 && (r.push(e.userinfo), r.push("@")), e.host !== void 0) {
    let t = unescape(e.host);
    const a = Rh(t);
    if (a.isIPV4)
      t = a.host;
    else {
      const n = Oh(a.host);
      n.isIPV6 === !0 ? t = `[${n.escapedHost}]` : t = e.host;
    }
    r.push(t);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (r.push(":"), r.push(String(e.port))), r.length ? r.join("") : void 0;
}
var uT = {
  recomposeAuthority: lT,
  normalizeComponentEncoding: fT,
  removeDotSegments: oT,
  normalizeIPv4: Rh,
  normalizeIPv6: Oh,
  stringArrayToHexStripped: e0
};
const hT = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, dT = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Ph(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function Nh(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function bh(e) {
  const r = String(e.scheme).toLowerCase() === "https";
  return (e.port === (r ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function pT(e) {
  return e.secure = Ph(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function mT(e) {
  if ((e.port === (Ph(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [r, t] = e.resourceName.split("?");
    e.path = r && r !== "/" ? r : void 0, e.query = t, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function xT(e, r) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const t = e.path.match(dT);
  if (t) {
    const a = r.scheme || e.scheme || "urn";
    e.nid = t[1].toLowerCase(), e.nss = t[2];
    const n = `${a}:${r.nid || e.nid}`, s = J0[n];
    e.path = void 0, s && (e = s.parse(e, r));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function vT(e, r) {
  const t = r.scheme || e.scheme || "urn", a = e.nid.toLowerCase(), n = `${t}:${r.nid || a}`, s = J0[n];
  s && (e = s.serialize(e, r));
  const i = e, c = e.nss;
  return i.path = `${a || r.nid}:${c}`, r.skipEscape = !0, i;
}
function gT(e, r) {
  const t = e;
  return t.uuid = t.nss, t.nss = void 0, !r.tolerant && (!t.uuid || !hT.test(t.uuid)) && (t.error = t.error || "UUID is not valid."), t;
}
function _T(e) {
  const r = e;
  return r.nss = (e.uuid || "").toLowerCase(), r;
}
const Dh = {
  scheme: "http",
  domainHost: !0,
  parse: Nh,
  serialize: bh
}, ET = {
  scheme: "https",
  domainHost: Dh.domainHost,
  parse: Nh,
  serialize: bh
}, _s = {
  scheme: "ws",
  domainHost: !0,
  parse: pT,
  serialize: mT
}, yT = {
  scheme: "wss",
  domainHost: _s.domainHost,
  parse: _s.parse,
  serialize: _s.serialize
}, wT = {
  scheme: "urn",
  parse: xT,
  serialize: vT,
  skipNormalize: !0
}, TT = {
  scheme: "urn:uuid",
  parse: gT,
  serialize: _T,
  skipNormalize: !0
}, J0 = {
  http: Dh,
  https: ET,
  ws: _s,
  wss: yT,
  urn: wT,
  "urn:uuid": TT
};
var kT = J0;
const { normalizeIPv6: ST, normalizeIPv4: AT, removeDotSegments: vn, recomposeAuthority: $T, normalizeComponentEncoding: cs } = uT, Z0 = kT;
function FT(e, r) {
  return typeof e == "string" ? e = vt(Dt(e, r), r) : typeof e == "object" && (e = Dt(vt(e, r), r)), e;
}
function CT(e, r, t) {
  const a = Object.assign({ scheme: "null" }, t), n = Lh(Dt(e, a), Dt(r, a), a, !0);
  return vt(n, { ...a, skipEscape: !0 });
}
function Lh(e, r, t, a) {
  const n = {};
  return a || (e = Dt(vt(e, t), t), r = Dt(vt(r, t), t)), t = t || {}, !t.tolerant && r.scheme ? (n.scheme = r.scheme, n.userinfo = r.userinfo, n.host = r.host, n.port = r.port, n.path = vn(r.path || ""), n.query = r.query) : (r.userinfo !== void 0 || r.host !== void 0 || r.port !== void 0 ? (n.userinfo = r.userinfo, n.host = r.host, n.port = r.port, n.path = vn(r.path || ""), n.query = r.query) : (r.path ? (r.path.charAt(0) === "/" ? n.path = vn(r.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? n.path = "/" + r.path : e.path ? n.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + r.path : n.path = r.path, n.path = vn(n.path)), n.query = r.query) : (n.path = e.path, r.query !== void 0 ? n.query = r.query : n.query = e.query), n.userinfo = e.userinfo, n.host = e.host, n.port = e.port), n.scheme = e.scheme), n.fragment = r.fragment, n;
}
function RT(e, r, t) {
  return typeof e == "string" ? (e = unescape(e), e = vt(cs(Dt(e, t), !0), { ...t, skipEscape: !0 })) : typeof e == "object" && (e = vt(cs(e, !0), { ...t, skipEscape: !0 })), typeof r == "string" ? (r = unescape(r), r = vt(cs(Dt(r, t), !0), { ...t, skipEscape: !0 })) : typeof r == "object" && (r = vt(cs(r, !0), { ...t, skipEscape: !0 })), e.toLowerCase() === r.toLowerCase();
}
function vt(e, r) {
  const t = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, a = Object.assign({}, r), n = [], s = Z0[(a.scheme || t.scheme || "").toLowerCase()];
  s && s.serialize && s.serialize(t, a), t.path !== void 0 && (a.skipEscape ? t.path = unescape(t.path) : (t.path = escape(t.path), t.scheme !== void 0 && (t.path = t.path.split("%3A").join(":")))), a.reference !== "suffix" && t.scheme && n.push(t.scheme, ":");
  const i = $T(t);
  if (i !== void 0 && (a.reference !== "suffix" && n.push("//"), n.push(i), t.path && t.path.charAt(0) !== "/" && n.push("/")), t.path !== void 0) {
    let c = t.path;
    !a.absolutePath && (!s || !s.absolutePath) && (c = vn(c)), i === void 0 && (c = c.replace(/^\/\//u, "/%2F")), n.push(c);
  }
  return t.query !== void 0 && n.push("?", t.query), t.fragment !== void 0 && n.push("#", t.fragment), n.join("");
}
const OT = Array.from({ length: 127 }, (e, r) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(r)));
function IT(e) {
  let r = 0;
  for (let t = 0, a = e.length; t < a; ++t)
    if (r = e.charCodeAt(t), r > 126 || OT[r])
      return !0;
  return !1;
}
const PT = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Dt(e, r) {
  const t = Object.assign({}, r), a = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, n = e.indexOf("%") !== -1;
  let s = !1;
  t.reference === "suffix" && (e = (t.scheme ? t.scheme + ":" : "") + "//" + e);
  const i = e.match(PT);
  if (i) {
    if (a.scheme = i[1], a.userinfo = i[3], a.host = i[4], a.port = parseInt(i[5], 10), a.path = i[6] || "", a.query = i[7], a.fragment = i[8], isNaN(a.port) && (a.port = i[5]), a.host) {
      const o = AT(a.host);
      if (o.isIPV4 === !1) {
        const f = ST(o.host);
        a.host = f.host.toLowerCase(), s = f.isIPV6;
      } else
        a.host = o.host, s = !0;
    }
    a.scheme === void 0 && a.userinfo === void 0 && a.host === void 0 && a.port === void 0 && a.query === void 0 && !a.path ? a.reference = "same-document" : a.scheme === void 0 ? a.reference = "relative" : a.fragment === void 0 ? a.reference = "absolute" : a.reference = "uri", t.reference && t.reference !== "suffix" && t.reference !== a.reference && (a.error = a.error || "URI is not a " + t.reference + " reference.");
    const c = Z0[(t.scheme || a.scheme || "").toLowerCase()];
    if (!t.unicodeSupport && (!c || !c.unicodeSupport) && a.host && (t.domainHost || c && c.domainHost) && s === !1 && IT(a.host))
      try {
        a.host = URL.domainToASCII(a.host.toLowerCase());
      } catch (o) {
        a.error = a.error || "Host's domain name can not be converted to ASCII: " + o;
      }
    (!c || c && !c.skipNormalize) && (n && a.scheme !== void 0 && (a.scheme = unescape(a.scheme)), n && a.host !== void 0 && (a.host = unescape(a.host)), a.path && (a.path = escape(unescape(a.path))), a.fragment && (a.fragment = encodeURI(decodeURIComponent(a.fragment)))), c && c.parse && c.parse(a, t);
  } else
    a.error = a.error || "URI can not be parsed.";
  return a;
}
const Q0 = {
  SCHEMES: Z0,
  normalize: FT,
  resolve: CT,
  resolveComponents: Lh,
  equal: RT,
  serialize: vt,
  parse: Dt
};
Js.exports = Q0;
Js.exports.default = Q0;
Js.exports.fastUri = Q0;
var NT = Js.exports;
Object.defineProperty(Y0, "__esModule", { value: !0 });
const Mh = NT;
Mh.code = 'require("ajv/dist/runtime/uri").default';
Y0.default = Mh;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var r = Zr;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return r.KeywordCxt;
  } });
  var t = ve;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return t._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return t.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return t.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return t.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return t.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return t.CodeGen;
  } });
  const a = Ya, n = $a, s = _a, i = Fr, c = ve, o = fr, f = Qe, l = le, u = eT, p = Y0, h = (H, b) => new RegExp(H, b);
  h.code = "new RegExp";
  const d = ["removeAdditional", "useDefaults", "coerceTypes"], m = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), x = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, g = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, T = 200;
  function E(H) {
    var b, y, k, v, _, N, Y, Q, ne, ee, pe, P, be, $e, Ie, we, oe, De, hr, Pr, Lr, wt, Wr, ir, Mr;
    const Nr = H.strict, Tt = (b = H.code) === null || b === void 0 ? void 0 : b.optimize, ar = Tt === !0 || Tt === void 0 ? 1 : Tt || 0, Br = (k = (y = H.code) === null || y === void 0 ? void 0 : y.regExp) !== null && k !== void 0 ? k : h, ke = (v = H.uriResolver) !== null && v !== void 0 ? v : p.default;
    return {
      strictSchema: (N = (_ = H.strictSchema) !== null && _ !== void 0 ? _ : Nr) !== null && N !== void 0 ? N : !0,
      strictNumbers: (Q = (Y = H.strictNumbers) !== null && Y !== void 0 ? Y : Nr) !== null && Q !== void 0 ? Q : !0,
      strictTypes: (ee = (ne = H.strictTypes) !== null && ne !== void 0 ? ne : Nr) !== null && ee !== void 0 ? ee : "log",
      strictTuples: (P = (pe = H.strictTuples) !== null && pe !== void 0 ? pe : Nr) !== null && P !== void 0 ? P : "log",
      strictRequired: ($e = (be = H.strictRequired) !== null && be !== void 0 ? be : Nr) !== null && $e !== void 0 ? $e : !1,
      code: H.code ? { ...H.code, optimize: ar, regExp: Br } : { optimize: ar, regExp: Br },
      loopRequired: (Ie = H.loopRequired) !== null && Ie !== void 0 ? Ie : T,
      loopEnum: (we = H.loopEnum) !== null && we !== void 0 ? we : T,
      meta: (oe = H.meta) !== null && oe !== void 0 ? oe : !0,
      messages: (De = H.messages) !== null && De !== void 0 ? De : !0,
      inlineRefs: (hr = H.inlineRefs) !== null && hr !== void 0 ? hr : !0,
      schemaId: (Pr = H.schemaId) !== null && Pr !== void 0 ? Pr : "$id",
      addUsedSchema: (Lr = H.addUsedSchema) !== null && Lr !== void 0 ? Lr : !0,
      validateSchema: (wt = H.validateSchema) !== null && wt !== void 0 ? wt : !0,
      validateFormats: (Wr = H.validateFormats) !== null && Wr !== void 0 ? Wr : !0,
      unicodeRegExp: (ir = H.unicodeRegExp) !== null && ir !== void 0 ? ir : !0,
      int32range: (Mr = H.int32range) !== null && Mr !== void 0 ? Mr : !0,
      uriResolver: ke
    };
  }
  class I {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...E(b) };
      const { es5: y, lines: k } = this.opts.code;
      this.scope = new c.ValueScope({ scope: {}, prefixes: m, es5: y, lines: k }), this.logger = M(b.logger);
      const v = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, s.getRules)(), D.call(this, x, b, "NOT SUPPORTED"), D.call(this, g, b, "DEPRECATED", "warn"), this._metaOpts = J.call(this), b.formats && z.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && U.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), C.call(this), b.validateFormats = v;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: y, schemaId: k } = this.opts;
      let v = u;
      k === "id" && (v = { ...u }, v.id = v.$id, delete v.$id), y && b && this.addMetaSchema(v, v[k], !1);
    }
    defaultMeta() {
      const { meta: b, schemaId: y } = this.opts;
      return this.opts.defaultMeta = typeof b == "object" ? b[y] || b : void 0;
    }
    validate(b, y) {
      let k;
      if (typeof b == "string") {
        if (k = this.getSchema(b), !k)
          throw new Error(`no schema with key or ref "${b}"`);
      } else
        k = this.compile(b);
      const v = k(y);
      return "$async" in k || (this.errors = k.errors), v;
    }
    compile(b, y) {
      const k = this._addSchema(b, y);
      return k.validate || this._compileSchemaEnv(k);
    }
    compileAsync(b, y) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: k } = this.opts;
      return v.call(this, b, y);
      async function v(ee, pe) {
        await _.call(this, ee.$schema);
        const P = this._addSchema(ee, pe);
        return P.validate || N.call(this, P);
      }
      async function _(ee) {
        ee && !this.getSchema(ee) && await v.call(this, { $ref: ee }, !0);
      }
      async function N(ee) {
        try {
          return this._compileSchemaEnv(ee);
        } catch (pe) {
          if (!(pe instanceof n.default))
            throw pe;
          return Y.call(this, pe), await Q.call(this, pe.missingSchema), N.call(this, ee);
        }
      }
      function Y({ missingSchema: ee, missingRef: pe }) {
        if (this.refs[ee])
          throw new Error(`AnySchema ${ee} is loaded but ${pe} cannot be resolved`);
      }
      async function Q(ee) {
        const pe = await ne.call(this, ee);
        this.refs[ee] || await _.call(this, pe.$schema), this.refs[ee] || this.addSchema(pe, ee, y);
      }
      async function ne(ee) {
        const pe = this._loading[ee];
        if (pe)
          return pe;
        try {
          return await (this._loading[ee] = k(ee));
        } finally {
          delete this._loading[ee];
        }
      }
    }
    // Adds schema to the instance
    addSchema(b, y, k, v = this.opts.validateSchema) {
      if (Array.isArray(b)) {
        for (const N of b)
          this.addSchema(N, void 0, k, v);
        return this;
      }
      let _;
      if (typeof b == "object") {
        const { schemaId: N } = this.opts;
        if (_ = b[N], _ !== void 0 && typeof _ != "string")
          throw new Error(`schema ${N} must be string`);
      }
      return y = (0, o.normalizeId)(y || _), this._checkUnique(y), this.schemas[y] = this._addSchema(b, k, y, v, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(b, y, k = this.opts.validateSchema) {
      return this.addSchema(b, y, !0, k), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(b, y) {
      if (typeof b == "boolean")
        return !0;
      let k;
      if (k = b.$schema, k !== void 0 && typeof k != "string")
        throw new Error("$schema must be a string");
      if (k = k || this.opts.defaultMeta || this.defaultMeta(), !k)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const v = this.validate(k, b);
      if (!v && y) {
        const _ = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(_);
        else
          throw new Error(_);
      }
      return v;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(b) {
      let y;
      for (; typeof (y = L.call(this, b)) == "string"; )
        b = y;
      if (y === void 0) {
        const { schemaId: k } = this.opts, v = new i.SchemaEnv({ schema: {}, schemaId: k });
        if (y = i.resolveSchema.call(this, v, b), !y)
          return;
        this.refs[b] = y;
      }
      return y.validate || this._compileSchemaEnv(y);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(b) {
      if (b instanceof RegExp)
        return this._removeAllSchemas(this.schemas, b), this._removeAllSchemas(this.refs, b), this;
      switch (typeof b) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const y = L.call(this, b);
          return typeof y == "object" && this._cache.delete(y.schema), delete this.schemas[b], delete this.refs[b], this;
        }
        case "object": {
          const y = b;
          this._cache.delete(y);
          let k = b[this.opts.schemaId];
          return k && (k = (0, o.normalizeId)(k), delete this.schemas[k], delete this.refs[k]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(b) {
      for (const y of b)
        this.addKeyword(y);
      return this;
    }
    addKeyword(b, y) {
      let k;
      if (typeof b == "string")
        k = b, typeof y == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), y.keyword = k);
      else if (typeof b == "object" && y === void 0) {
        if (y = b, k = y.keyword, Array.isArray(k) && !k.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (G.call(this, k, y), !y)
        return (0, l.eachItem)(k, (_) => V.call(this, _)), this;
      Z.call(this, y);
      const v = {
        ...y,
        type: (0, f.getJSONTypes)(y.type),
        schemaType: (0, f.getJSONTypes)(y.schemaType)
      };
      return (0, l.eachItem)(k, v.type.length === 0 ? (_) => V.call(this, _, v) : (_) => v.type.forEach((N) => V.call(this, _, v, N))), this;
    }
    getKeyword(b) {
      const y = this.RULES.all[b];
      return typeof y == "object" ? y.definition : !!y;
    }
    // Remove keyword
    removeKeyword(b) {
      const { RULES: y } = this;
      delete y.keywords[b], delete y.all[b];
      for (const k of y.rules) {
        const v = k.rules.findIndex((_) => _.keyword === b);
        v >= 0 && k.rules.splice(v, 1);
      }
      return this;
    }
    // Add format
    addFormat(b, y) {
      return typeof y == "string" && (y = new RegExp(y)), this.formats[b] = y, this;
    }
    errorsText(b = this.errors, { separator: y = ", ", dataVar: k = "data" } = {}) {
      return !b || b.length === 0 ? "No errors" : b.map((v) => `${k}${v.instancePath} ${v.message}`).reduce((v, _) => v + y + _);
    }
    $dataMetaSchema(b, y) {
      const k = this.RULES.all;
      b = JSON.parse(JSON.stringify(b));
      for (const v of y) {
        const _ = v.split("/").slice(1);
        let N = b;
        for (const Y of _)
          N = N[Y];
        for (const Y in k) {
          const Q = k[Y];
          if (typeof Q != "object")
            continue;
          const { $data: ne } = Q.definition, ee = N[Y];
          ne && ee && (N[Y] = B(ee));
        }
      }
      return b;
    }
    _removeAllSchemas(b, y) {
      for (const k in b) {
        const v = b[k];
        (!y || y.test(k)) && (typeof v == "string" ? delete b[k] : v && !v.meta && (this._cache.delete(v.schema), delete b[k]));
      }
    }
    _addSchema(b, y, k, v = this.opts.validateSchema, _ = this.opts.addUsedSchema) {
      let N;
      const { schemaId: Y } = this.opts;
      if (typeof b == "object")
        N = b[Y];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof b != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let Q = this._cache.get(b);
      if (Q !== void 0)
        return Q;
      k = (0, o.normalizeId)(N || k);
      const ne = o.getSchemaRefs.call(this, b, k);
      return Q = new i.SchemaEnv({ schema: b, schemaId: Y, meta: y, baseId: k, localRefs: ne }), this._cache.set(Q.schema, Q), _ && !k.startsWith("#") && (k && this._checkUnique(k), this.refs[k] = Q), v && this.validateSchema(b, !0), Q;
    }
    _checkUnique(b) {
      if (this.schemas[b] || this.refs[b])
        throw new Error(`schema with key or id "${b}" already exists`);
    }
    _compileSchemaEnv(b) {
      if (b.meta ? this._compileMetaSchema(b) : i.compileSchema.call(this, b), !b.validate)
        throw new Error("ajv implementation error");
      return b.validate;
    }
    _compileMetaSchema(b) {
      const y = this.opts;
      this.opts = this._metaOpts;
      try {
        i.compileSchema.call(this, b);
      } finally {
        this.opts = y;
      }
    }
  }
  I.ValidationError = a.default, I.MissingRefError = n.default, e.default = I;
  function D(H, b, y, k = "error") {
    for (const v in H) {
      const _ = v;
      _ in b && this.logger[k](`${y}: option ${v}. ${H[_]}`);
    }
  }
  function L(H) {
    return H = (0, o.normalizeId)(H), this.schemas[H] || this.refs[H];
  }
  function C() {
    const H = this.opts.schemas;
    if (H)
      if (Array.isArray(H))
        this.addSchema(H);
      else
        for (const b in H)
          this.addSchema(H[b], b);
  }
  function z() {
    for (const H in this.opts.formats) {
      const b = this.opts.formats[H];
      b && this.addFormat(H, b);
    }
  }
  function U(H) {
    if (Array.isArray(H)) {
      this.addVocabulary(H);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const b in H) {
      const y = H[b];
      y.keyword || (y.keyword = b), this.addKeyword(y);
    }
  }
  function J() {
    const H = { ...this.opts };
    for (const b of d)
      delete H[b];
    return H;
  }
  const j = { log() {
  }, warn() {
  }, error() {
  } };
  function M(H) {
    if (H === !1)
      return j;
    if (H === void 0)
      return console;
    if (H.log && H.warn && H.error)
      return H;
    throw new Error("logger must implement log, warn and error methods");
  }
  const ae = /^[a-z_$][a-z0-9_$:-]*$/i;
  function G(H, b) {
    const { RULES: y } = this;
    if ((0, l.eachItem)(H, (k) => {
      if (y.keywords[k])
        throw new Error(`Keyword ${k} is already defined`);
      if (!ae.test(k))
        throw new Error(`Keyword ${k} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function V(H, b, y) {
    var k;
    const v = b == null ? void 0 : b.post;
    if (y && v)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: _ } = this;
    let N = v ? _.post : _.rules.find(({ type: Q }) => Q === y);
    if (N || (N = { type: y, rules: [] }, _.rules.push(N)), _.keywords[H] = !0, !b)
      return;
    const Y = {
      keyword: H,
      definition: {
        ...b,
        type: (0, f.getJSONTypes)(b.type),
        schemaType: (0, f.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? te.call(this, N, Y, b.before) : N.rules.push(Y), _.all[H] = Y, (k = b.implements) === null || k === void 0 || k.forEach((Q) => this.addKeyword(Q));
  }
  function te(H, b, y) {
    const k = H.rules.findIndex((v) => v.keyword === y);
    k >= 0 ? H.rules.splice(k, 0, b) : (H.rules.push(b), this.logger.warn(`rule ${y} is not defined`));
  }
  function Z(H) {
    let { metaSchema: b } = H;
    b !== void 0 && (H.$data && this.opts.$data && (b = B(b)), H.validateSchema = this.compile(b, !0));
  }
  const ce = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function B(H) {
    return { anyOf: [H, ce] };
  }
})(B0);
var ec = {}, Zs = {}, rc = {};
Object.defineProperty(rc, "__esModule", { value: !0 });
const bT = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
rc.default = bT;
var Lt = {};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.callRef = Lt.getValidate = void 0;
const DT = $a, _f = Ae, br = ve, Ra = zr, Ef = Fr, os = le, LT = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: r, schema: t, it: a } = e, { baseId: n, schemaEnv: s, validateName: i, opts: c, self: o } = a, { root: f } = s;
    if ((t === "#" || t === "#/") && n === f.baseId)
      return u();
    const l = Ef.resolveRef.call(o, f, n, t);
    if (l === void 0)
      throw new DT.default(a.opts.uriResolver, n, t);
    if (l instanceof Ef.SchemaEnv)
      return p(l);
    return h(l);
    function u() {
      if (s === f)
        return Es(e, i, s, s.$async);
      const d = r.scopeValue("root", { ref: f });
      return Es(e, (0, br._)`${d}.validate`, f, f.$async);
    }
    function p(d) {
      const m = Bh(e, d);
      Es(e, m, d, d.$async);
    }
    function h(d) {
      const m = r.scopeValue("schema", c.code.source === !0 ? { ref: d, code: (0, br.stringify)(d) } : { ref: d }), x = r.name("valid"), g = e.subschema({
        schema: d,
        dataTypes: [],
        schemaPath: br.nil,
        topSchemaRef: m,
        errSchemaPath: t
      }, x);
      e.mergeEvaluated(g), e.ok(x);
    }
  }
};
function Bh(e, r) {
  const { gen: t } = e;
  return r.validate ? t.scopeValue("validate", { ref: r.validate }) : (0, br._)`${t.scopeValue("wrapper", { ref: r })}.validate`;
}
Lt.getValidate = Bh;
function Es(e, r, t, a) {
  const { gen: n, it: s } = e, { allErrors: i, schemaEnv: c, opts: o } = s, f = o.passContext ? Ra.default.this : br.nil;
  a ? l() : u();
  function l() {
    if (!c.$async)
      throw new Error("async schema referenced by sync schema");
    const d = n.let("valid");
    n.try(() => {
      n.code((0, br._)`await ${(0, _f.callValidateCode)(e, r, f)}`), h(r), i || n.assign(d, !0);
    }, (m) => {
      n.if((0, br._)`!(${m} instanceof ${s.ValidationError})`, () => n.throw(m)), p(m), i || n.assign(d, !1);
    }), e.ok(d);
  }
  function u() {
    e.result((0, _f.callValidateCode)(e, r, f), () => h(r), () => p(r));
  }
  function p(d) {
    const m = (0, br._)`${d}.errors`;
    n.assign(Ra.default.vErrors, (0, br._)`${Ra.default.vErrors} === null ? ${m} : ${Ra.default.vErrors}.concat(${m})`), n.assign(Ra.default.errors, (0, br._)`${Ra.default.vErrors}.length`);
  }
  function h(d) {
    var m;
    if (!s.opts.unevaluated)
      return;
    const x = (m = t == null ? void 0 : t.validate) === null || m === void 0 ? void 0 : m.evaluated;
    if (s.props !== !0)
      if (x && !x.dynamicProps)
        x.props !== void 0 && (s.props = os.mergeEvaluated.props(n, x.props, s.props));
      else {
        const g = n.var("props", (0, br._)`${d}.evaluated.props`);
        s.props = os.mergeEvaluated.props(n, g, s.props, br.Name);
      }
    if (s.items !== !0)
      if (x && !x.dynamicItems)
        x.items !== void 0 && (s.items = os.mergeEvaluated.items(n, x.items, s.items));
      else {
        const g = n.var("items", (0, br._)`${d}.evaluated.items`);
        s.items = os.mergeEvaluated.items(n, g, s.items, br.Name);
      }
  }
}
Lt.callRef = Es;
Lt.default = LT;
Object.defineProperty(Zs, "__esModule", { value: !0 });
const MT = rc, BT = Lt, UT = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  MT.default,
  BT.default
];
Zs.default = UT;
var Qs = {}, tc = {};
Object.defineProperty(tc, "__esModule", { value: !0 });
const Ls = ve, Gt = Ls.operators, Ms = {
  maximum: { okStr: "<=", ok: Gt.LTE, fail: Gt.GT },
  minimum: { okStr: ">=", ok: Gt.GTE, fail: Gt.LT },
  exclusiveMaximum: { okStr: "<", ok: Gt.LT, fail: Gt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Gt.GT, fail: Gt.LTE }
}, jT = {
  message: ({ keyword: e, schemaCode: r }) => (0, Ls.str)`must be ${Ms[e].okStr} ${r}`,
  params: ({ keyword: e, schemaCode: r }) => (0, Ls._)`{comparison: ${Ms[e].okStr}, limit: ${r}}`
}, VT = {
  keyword: Object.keys(Ms),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: jT,
  code(e) {
    const { keyword: r, data: t, schemaCode: a } = e;
    e.fail$data((0, Ls._)`${t} ${Ms[r].fail} ${a} || isNaN(${t})`);
  }
};
tc.default = VT;
var ac = {};
Object.defineProperty(ac, "__esModule", { value: !0 });
const Cn = ve, HT = {
  message: ({ schemaCode: e }) => (0, Cn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Cn._)`{multipleOf: ${e}}`
}, GT = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: HT,
  code(e) {
    const { gen: r, data: t, schemaCode: a, it: n } = e, s = n.opts.multipleOfPrecision, i = r.let("res"), c = s ? (0, Cn._)`Math.abs(Math.round(${i}) - ${i}) > 1e-${s}` : (0, Cn._)`${i} !== parseInt(${i})`;
    e.fail$data((0, Cn._)`(${a} === 0 || (${i} = ${t}/${a}, ${c}))`);
  }
};
ac.default = GT;
var nc = {}, sc = {};
Object.defineProperty(sc, "__esModule", { value: !0 });
function Uh(e) {
  const r = e.length;
  let t = 0, a = 0, n;
  for (; a < r; )
    t++, n = e.charCodeAt(a++), n >= 55296 && n <= 56319 && a < r && (n = e.charCodeAt(a), (n & 64512) === 56320 && a++);
  return t;
}
sc.default = Uh;
Uh.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(nc, "__esModule", { value: !0 });
const fa = ve, zT = le, WT = sc, XT = {
  message({ keyword: e, schemaCode: r }) {
    const t = e === "maxLength" ? "more" : "fewer";
    return (0, fa.str)`must NOT have ${t} than ${r} characters`;
  },
  params: ({ schemaCode: e }) => (0, fa._)`{limit: ${e}}`
}, KT = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: XT,
  code(e) {
    const { keyword: r, data: t, schemaCode: a, it: n } = e, s = r === "maxLength" ? fa.operators.GT : fa.operators.LT, i = n.opts.unicode === !1 ? (0, fa._)`${t}.length` : (0, fa._)`${(0, zT.useFunc)(e.gen, WT.default)}(${t})`;
    e.fail$data((0, fa._)`${i} ${s} ${a}`);
  }
};
nc.default = KT;
var ic = {};
Object.defineProperty(ic, "__esModule", { value: !0 });
const qT = Ae, Bs = ve, YT = {
  message: ({ schemaCode: e }) => (0, Bs.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, Bs._)`{pattern: ${e}}`
}, JT = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: YT,
  code(e) {
    const { data: r, $data: t, schema: a, schemaCode: n, it: s } = e, i = s.opts.unicodeRegExp ? "u" : "", c = t ? (0, Bs._)`(new RegExp(${n}, ${i}))` : (0, qT.usePattern)(e, a);
    e.fail$data((0, Bs._)`!${c}.test(${r})`);
  }
};
ic.default = JT;
var cc = {};
Object.defineProperty(cc, "__esModule", { value: !0 });
const Rn = ve, ZT = {
  message({ keyword: e, schemaCode: r }) {
    const t = e === "maxProperties" ? "more" : "fewer";
    return (0, Rn.str)`must NOT have ${t} than ${r} properties`;
  },
  params: ({ schemaCode: e }) => (0, Rn._)`{limit: ${e}}`
}, QT = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: ZT,
  code(e) {
    const { keyword: r, data: t, schemaCode: a } = e, n = r === "maxProperties" ? Rn.operators.GT : Rn.operators.LT;
    e.fail$data((0, Rn._)`Object.keys(${t}).length ${n} ${a}`);
  }
};
cc.default = QT;
var oc = {};
Object.defineProperty(oc, "__esModule", { value: !0 });
const un = Ae, On = ve, ek = le, rk = {
  message: ({ params: { missingProperty: e } }) => (0, On.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, On._)`{missingProperty: ${e}}`
}, tk = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: rk,
  code(e) {
    const { gen: r, schema: t, schemaCode: a, data: n, $data: s, it: i } = e, { opts: c } = i;
    if (!s && t.length === 0)
      return;
    const o = t.length >= c.loopRequired;
    if (i.allErrors ? f() : l(), c.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: d } = e.it;
      for (const m of t)
        if ((h == null ? void 0 : h[m]) === void 0 && !d.has(m)) {
          const x = i.schemaEnv.baseId + i.errSchemaPath, g = `required property "${m}" is not defined at "${x}" (strictRequired)`;
          (0, ek.checkStrictMode)(i, g, i.opts.strictRequired);
        }
    }
    function f() {
      if (o || s)
        e.block$data(On.nil, u);
      else
        for (const h of t)
          (0, un.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = r.let("missing");
      if (o || s) {
        const d = r.let("valid", !0);
        e.block$data(d, () => p(h, d)), e.ok(d);
      } else
        r.if((0, un.checkMissingProp)(e, t, h)), (0, un.reportMissingProp)(e, h), r.else();
    }
    function u() {
      r.forOf("prop", a, (h) => {
        e.setParams({ missingProperty: h }), r.if((0, un.noPropertyInData)(r, n, h, c.ownProperties), () => e.error());
      });
    }
    function p(h, d) {
      e.setParams({ missingProperty: h }), r.forOf(h, a, () => {
        r.assign(d, (0, un.propertyInData)(r, n, h, c.ownProperties)), r.if((0, On.not)(d), () => {
          e.error(), r.break();
        });
      }, On.nil);
    }
  }
};
oc.default = tk;
var fc = {};
Object.defineProperty(fc, "__esModule", { value: !0 });
const In = ve, ak = {
  message({ keyword: e, schemaCode: r }) {
    const t = e === "maxItems" ? "more" : "fewer";
    return (0, In.str)`must NOT have ${t} than ${r} items`;
  },
  params: ({ schemaCode: e }) => (0, In._)`{limit: ${e}}`
}, nk = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: ak,
  code(e) {
    const { keyword: r, data: t, schemaCode: a } = e, n = r === "maxItems" ? In.operators.GT : In.operators.LT;
    e.fail$data((0, In._)`${t}.length ${n} ${a}`);
  }
};
fc.default = nk;
var lc = {}, qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
const jh = dh;
jh.code = 'require("ajv/dist/runtime/equal").default';
qn.default = jh;
Object.defineProperty(lc, "__esModule", { value: !0 });
const Fi = Qe, cr = ve, sk = le, ik = qn, ck = {
  message: ({ params: { i: e, j: r } }) => (0, cr.str)`must NOT have duplicate items (items ## ${r} and ${e} are identical)`,
  params: ({ params: { i: e, j: r } }) => (0, cr._)`{i: ${e}, j: ${r}}`
}, ok = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: ck,
  code(e) {
    const { gen: r, data: t, $data: a, schema: n, parentSchema: s, schemaCode: i, it: c } = e;
    if (!a && !n)
      return;
    const o = r.let("valid"), f = s.items ? (0, Fi.getSchemaTypes)(s.items) : [];
    e.block$data(o, l, (0, cr._)`${i} === false`), e.ok(o);
    function l() {
      const d = r.let("i", (0, cr._)`${t}.length`), m = r.let("j");
      e.setParams({ i: d, j: m }), r.assign(o, !0), r.if((0, cr._)`${d} > 1`, () => (u() ? p : h)(d, m));
    }
    function u() {
      return f.length > 0 && !f.some((d) => d === "object" || d === "array");
    }
    function p(d, m) {
      const x = r.name("item"), g = (0, Fi.checkDataTypes)(f, x, c.opts.strictNumbers, Fi.DataType.Wrong), T = r.const("indices", (0, cr._)`{}`);
      r.for((0, cr._)`;${d}--;`, () => {
        r.let(x, (0, cr._)`${t}[${d}]`), r.if(g, (0, cr._)`continue`), f.length > 1 && r.if((0, cr._)`typeof ${x} == "string"`, (0, cr._)`${x} += "_"`), r.if((0, cr._)`typeof ${T}[${x}] == "number"`, () => {
          r.assign(m, (0, cr._)`${T}[${x}]`), e.error(), r.assign(o, !1).break();
        }).code((0, cr._)`${T}[${x}] = ${d}`);
      });
    }
    function h(d, m) {
      const x = (0, sk.useFunc)(r, ik.default), g = r.name("outer");
      r.label(g).for((0, cr._)`;${d}--;`, () => r.for((0, cr._)`${m} = ${d}; ${m}--;`, () => r.if((0, cr._)`${x}(${t}[${d}], ${t}[${m}])`, () => {
        e.error(), r.assign(o, !1).break(g);
      })));
    }
  }
};
lc.default = ok;
var uc = {};
Object.defineProperty(uc, "__esModule", { value: !0 });
const r0 = ve, fk = le, lk = qn, uk = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, r0._)`{allowedValue: ${e}}`
}, hk = {
  keyword: "const",
  $data: !0,
  error: uk,
  code(e) {
    const { gen: r, data: t, $data: a, schemaCode: n, schema: s } = e;
    a || s && typeof s == "object" ? e.fail$data((0, r0._)`!${(0, fk.useFunc)(r, lk.default)}(${t}, ${n})`) : e.fail((0, r0._)`${s} !== ${t}`);
  }
};
uc.default = hk;
var hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
const gn = ve, dk = le, pk = qn, mk = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, gn._)`{allowedValues: ${e}}`
}, xk = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: mk,
  code(e) {
    const { gen: r, data: t, $data: a, schema: n, schemaCode: s, it: i } = e;
    if (!a && n.length === 0)
      throw new Error("enum must have non-empty array");
    const c = n.length >= i.opts.loopEnum;
    let o;
    const f = () => o ?? (o = (0, dk.useFunc)(r, pk.default));
    let l;
    if (c || a)
      l = r.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(n))
        throw new Error("ajv implementation error");
      const h = r.const("vSchema", s);
      l = (0, gn.or)(...n.map((d, m) => p(h, m)));
    }
    e.pass(l);
    function u() {
      r.assign(l, !1), r.forOf("v", s, (h) => r.if((0, gn._)`${f()}(${t}, ${h})`, () => r.assign(l, !0).break()));
    }
    function p(h, d) {
      const m = n[d];
      return typeof m == "object" && m !== null ? (0, gn._)`${f()}(${t}, ${h}[${d}])` : (0, gn._)`${t} === ${m}`;
    }
  }
};
hc.default = xk;
Object.defineProperty(Qs, "__esModule", { value: !0 });
const vk = tc, gk = ac, _k = nc, Ek = ic, yk = cc, wk = oc, Tk = fc, kk = lc, Sk = uc, Ak = hc, $k = [
  // number
  vk.default,
  gk.default,
  // string
  _k.default,
  Ek.default,
  // object
  yk.default,
  wk.default,
  // array
  Tk.default,
  kk.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  Sk.default,
  Ak.default
];
Qs.default = $k;
var ei = {}, Ja = {};
Object.defineProperty(Ja, "__esModule", { value: !0 });
Ja.validateAdditionalItems = void 0;
const la = ve, t0 = le, Fk = {
  message: ({ params: { len: e } }) => (0, la.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, la._)`{limit: ${e}}`
}, Ck = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: Fk,
  code(e) {
    const { parentSchema: r, it: t } = e, { items: a } = r;
    if (!Array.isArray(a)) {
      (0, t0.checkStrictMode)(t, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Vh(e, a);
  }
};
function Vh(e, r) {
  const { gen: t, schema: a, data: n, keyword: s, it: i } = e;
  i.items = !0;
  const c = t.const("len", (0, la._)`${n}.length`);
  if (a === !1)
    e.setParams({ len: r.length }), e.pass((0, la._)`${c} <= ${r.length}`);
  else if (typeof a == "object" && !(0, t0.alwaysValidSchema)(i, a)) {
    const f = t.var("valid", (0, la._)`${c} <= ${r.length}`);
    t.if((0, la.not)(f), () => o(f)), e.ok(f);
  }
  function o(f) {
    t.forRange("i", r.length, c, (l) => {
      e.subschema({ keyword: s, dataProp: l, dataPropType: t0.Type.Num }, f), i.allErrors || t.if((0, la.not)(f), () => t.break());
    });
  }
}
Ja.validateAdditionalItems = Vh;
Ja.default = Ck;
var dc = {}, Za = {};
Object.defineProperty(Za, "__esModule", { value: !0 });
Za.validateTuple = void 0;
const yf = ve, ys = le, Rk = Ae, Ok = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: r, it: t } = e;
    if (Array.isArray(r))
      return Hh(e, "additionalItems", r);
    t.items = !0, !(0, ys.alwaysValidSchema)(t, r) && e.ok((0, Rk.validateArray)(e));
  }
};
function Hh(e, r, t = e.schema) {
  const { gen: a, parentSchema: n, data: s, keyword: i, it: c } = e;
  l(n), c.opts.unevaluated && t.length && c.items !== !0 && (c.items = ys.mergeEvaluated.items(a, t.length, c.items));
  const o = a.name("valid"), f = a.const("len", (0, yf._)`${s}.length`);
  t.forEach((u, p) => {
    (0, ys.alwaysValidSchema)(c, u) || (a.if((0, yf._)`${f} > ${p}`, () => e.subschema({
      keyword: i,
      schemaProp: p,
      dataProp: p
    }, o)), e.ok(o));
  });
  function l(u) {
    const { opts: p, errSchemaPath: h } = c, d = t.length, m = d === u.minItems && (d === u.maxItems || u[r] === !1);
    if (p.strictTuples && !m) {
      const x = `"${i}" is ${d}-tuple, but minItems or maxItems/${r} are not specified or different at path "${h}"`;
      (0, ys.checkStrictMode)(c, x, p.strictTuples);
    }
  }
}
Za.validateTuple = Hh;
Za.default = Ok;
Object.defineProperty(dc, "__esModule", { value: !0 });
const Ik = Za, Pk = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Ik.validateTuple)(e, "items")
};
dc.default = Pk;
var pc = {};
Object.defineProperty(pc, "__esModule", { value: !0 });
const wf = ve, Nk = le, bk = Ae, Dk = Ja, Lk = {
  message: ({ params: { len: e } }) => (0, wf.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, wf._)`{limit: ${e}}`
}, Mk = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Lk,
  code(e) {
    const { schema: r, parentSchema: t, it: a } = e, { prefixItems: n } = t;
    a.items = !0, !(0, Nk.alwaysValidSchema)(a, r) && (n ? (0, Dk.validateAdditionalItems)(e, n) : e.ok((0, bk.validateArray)(e)));
  }
};
pc.default = Mk;
var mc = {};
Object.defineProperty(mc, "__esModule", { value: !0 });
const Jr = ve, fs = le, Bk = {
  message: ({ params: { min: e, max: r } }) => r === void 0 ? (0, Jr.str)`must contain at least ${e} valid item(s)` : (0, Jr.str)`must contain at least ${e} and no more than ${r} valid item(s)`,
  params: ({ params: { min: e, max: r } }) => r === void 0 ? (0, Jr._)`{minContains: ${e}}` : (0, Jr._)`{minContains: ${e}, maxContains: ${r}}`
}, Uk = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Bk,
  code(e) {
    const { gen: r, schema: t, parentSchema: a, data: n, it: s } = e;
    let i, c;
    const { minContains: o, maxContains: f } = a;
    s.opts.next ? (i = o === void 0 ? 1 : o, c = f) : i = 1;
    const l = r.const("len", (0, Jr._)`${n}.length`);
    if (e.setParams({ min: i, max: c }), c === void 0 && i === 0) {
      (0, fs.checkStrictMode)(s, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (c !== void 0 && i > c) {
      (0, fs.checkStrictMode)(s, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, fs.alwaysValidSchema)(s, t)) {
      let m = (0, Jr._)`${l} >= ${i}`;
      c !== void 0 && (m = (0, Jr._)`${m} && ${l} <= ${c}`), e.pass(m);
      return;
    }
    s.items = !0;
    const u = r.name("valid");
    c === void 0 && i === 1 ? h(u, () => r.if(u, () => r.break())) : i === 0 ? (r.let(u, !0), c !== void 0 && r.if((0, Jr._)`${n}.length > 0`, p)) : (r.let(u, !1), p()), e.result(u, () => e.reset());
    function p() {
      const m = r.name("_valid"), x = r.let("count", 0);
      h(m, () => r.if(m, () => d(x)));
    }
    function h(m, x) {
      r.forRange("i", 0, l, (g) => {
        e.subschema({
          keyword: "contains",
          dataProp: g,
          dataPropType: fs.Type.Num,
          compositeRule: !0
        }, m), x();
      });
    }
    function d(m) {
      r.code((0, Jr._)`${m}++`), c === void 0 ? r.if((0, Jr._)`${m} >= ${i}`, () => r.assign(u, !0).break()) : (r.if((0, Jr._)`${m} > ${c}`, () => r.assign(u, !1).break()), i === 1 ? r.assign(u, !0) : r.if((0, Jr._)`${m} >= ${i}`, () => r.assign(u, !0)));
    }
  }
};
mc.default = Uk;
var ri = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const r = ve, t = le, a = Ae;
  e.error = {
    message: ({ params: { property: o, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, r.str)`must have ${u} ${l} when property ${o} is present`;
    },
    params: ({ params: { property: o, depsCount: f, deps: l, missingProperty: u } }) => (0, r._)`{property: ${o},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const n = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(o) {
      const [f, l] = s(o);
      i(o, f), c(o, l);
    }
  };
  function s({ schema: o }) {
    const f = {}, l = {};
    for (const u in o) {
      if (u === "__proto__")
        continue;
      const p = Array.isArray(o[u]) ? f : l;
      p[u] = o[u];
    }
    return [f, l];
  }
  function i(o, f = o.schema) {
    const { gen: l, data: u, it: p } = o;
    if (Object.keys(f).length === 0)
      return;
    const h = l.let("missing");
    for (const d in f) {
      const m = f[d];
      if (m.length === 0)
        continue;
      const x = (0, a.propertyInData)(l, u, d, p.opts.ownProperties);
      o.setParams({
        property: d,
        depsCount: m.length,
        deps: m.join(", ")
      }), p.allErrors ? l.if(x, () => {
        for (const g of m)
          (0, a.checkReportMissingProp)(o, g);
      }) : (l.if((0, r._)`${x} && (${(0, a.checkMissingProp)(o, m, h)})`), (0, a.reportMissingProp)(o, h), l.else());
    }
  }
  e.validatePropertyDeps = i;
  function c(o, f = o.schema) {
    const { gen: l, data: u, keyword: p, it: h } = o, d = l.name("valid");
    for (const m in f)
      (0, t.alwaysValidSchema)(h, f[m]) || (l.if(
        (0, a.propertyInData)(l, u, m, h.opts.ownProperties),
        () => {
          const x = o.subschema({ keyword: p, schemaProp: m }, d);
          o.mergeValidEvaluated(x, d);
        },
        () => l.var(d, !0)
        // TODO var
      ), o.ok(d));
  }
  e.validateSchemaDeps = c, e.default = n;
})(ri);
var xc = {};
Object.defineProperty(xc, "__esModule", { value: !0 });
const Gh = ve, jk = le, Vk = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Gh._)`{propertyName: ${e.propertyName}}`
}, Hk = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Vk,
  code(e) {
    const { gen: r, schema: t, data: a, it: n } = e;
    if ((0, jk.alwaysValidSchema)(n, t))
      return;
    const s = r.name("valid");
    r.forIn("key", a, (i) => {
      e.setParams({ propertyName: i }), e.subschema({
        keyword: "propertyNames",
        data: i,
        dataTypes: ["string"],
        propertyName: i,
        compositeRule: !0
      }, s), r.if((0, Gh.not)(s), () => {
        e.error(!0), n.allErrors || r.break();
      });
    }), e.ok(s);
  }
};
xc.default = Hk;
var ti = {};
Object.defineProperty(ti, "__esModule", { value: !0 });
const ls = Ae, nt = ve, Gk = zr, us = le, zk = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, nt._)`{additionalProperty: ${e.additionalProperty}}`
}, Wk = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: zk,
  code(e) {
    const { gen: r, schema: t, parentSchema: a, data: n, errsCount: s, it: i } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: c, opts: o } = i;
    if (i.props = !0, o.removeAdditional !== "all" && (0, us.alwaysValidSchema)(i, t))
      return;
    const f = (0, ls.allSchemaProperties)(a.properties), l = (0, ls.allSchemaProperties)(a.patternProperties);
    u(), e.ok((0, nt._)`${s} === ${Gk.default.errors}`);
    function u() {
      r.forIn("key", n, (x) => {
        !f.length && !l.length ? d(x) : r.if(p(x), () => d(x));
      });
    }
    function p(x) {
      let g;
      if (f.length > 8) {
        const T = (0, us.schemaRefOrVal)(i, a.properties, "properties");
        g = (0, ls.isOwnProperty)(r, T, x);
      } else f.length ? g = (0, nt.or)(...f.map((T) => (0, nt._)`${x} === ${T}`)) : g = nt.nil;
      return l.length && (g = (0, nt.or)(g, ...l.map((T) => (0, nt._)`${(0, ls.usePattern)(e, T)}.test(${x})`))), (0, nt.not)(g);
    }
    function h(x) {
      r.code((0, nt._)`delete ${n}[${x}]`);
    }
    function d(x) {
      if (o.removeAdditional === "all" || o.removeAdditional && t === !1) {
        h(x);
        return;
      }
      if (t === !1) {
        e.setParams({ additionalProperty: x }), e.error(), c || r.break();
        return;
      }
      if (typeof t == "object" && !(0, us.alwaysValidSchema)(i, t)) {
        const g = r.name("valid");
        o.removeAdditional === "failing" ? (m(x, g, !1), r.if((0, nt.not)(g), () => {
          e.reset(), h(x);
        })) : (m(x, g), c || r.if((0, nt.not)(g), () => r.break()));
      }
    }
    function m(x, g, T) {
      const E = {
        keyword: "additionalProperties",
        dataProp: x,
        dataPropType: us.Type.Str
      };
      T === !1 && Object.assign(E, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(E, g);
    }
  }
};
ti.default = Wk;
var vc = {};
Object.defineProperty(vc, "__esModule", { value: !0 });
const Xk = Zr, Tf = Ae, Ci = le, kf = ti, Kk = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: r, schema: t, parentSchema: a, data: n, it: s } = e;
    s.opts.removeAdditional === "all" && a.additionalProperties === void 0 && kf.default.code(new Xk.KeywordCxt(s, kf.default, "additionalProperties"));
    const i = (0, Tf.allSchemaProperties)(t);
    for (const u of i)
      s.definedProperties.add(u);
    s.opts.unevaluated && i.length && s.props !== !0 && (s.props = Ci.mergeEvaluated.props(r, (0, Ci.toHash)(i), s.props));
    const c = i.filter((u) => !(0, Ci.alwaysValidSchema)(s, t[u]));
    if (c.length === 0)
      return;
    const o = r.name("valid");
    for (const u of c)
      f(u) ? l(u) : (r.if((0, Tf.propertyInData)(r, n, u, s.opts.ownProperties)), l(u), s.allErrors || r.else().var(o, !0), r.endIf()), e.it.definedProperties.add(u), e.ok(o);
    function f(u) {
      return s.opts.useDefaults && !s.compositeRule && t[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, o);
    }
  }
};
vc.default = Kk;
var gc = {};
Object.defineProperty(gc, "__esModule", { value: !0 });
const Sf = Ae, hs = ve, Af = le, $f = le, qk = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: r, schema: t, data: a, parentSchema: n, it: s } = e, { opts: i } = s, c = (0, Sf.allSchemaProperties)(t), o = c.filter((m) => (0, Af.alwaysValidSchema)(s, t[m]));
    if (c.length === 0 || o.length === c.length && (!s.opts.unevaluated || s.props === !0))
      return;
    const f = i.strictSchema && !i.allowMatchingProperties && n.properties, l = r.name("valid");
    s.props !== !0 && !(s.props instanceof hs.Name) && (s.props = (0, $f.evaluatedPropsToName)(r, s.props));
    const { props: u } = s;
    p();
    function p() {
      for (const m of c)
        f && h(m), s.allErrors ? d(m) : (r.var(l, !0), d(m), r.if(l));
    }
    function h(m) {
      for (const x in f)
        new RegExp(m).test(x) && (0, Af.checkStrictMode)(s, `property ${x} matches pattern ${m} (use allowMatchingProperties)`);
    }
    function d(m) {
      r.forIn("key", a, (x) => {
        r.if((0, hs._)`${(0, Sf.usePattern)(e, m)}.test(${x})`, () => {
          const g = o.includes(m);
          g || e.subschema({
            keyword: "patternProperties",
            schemaProp: m,
            dataProp: x,
            dataPropType: $f.Type.Str
          }, l), s.opts.unevaluated && u !== !0 ? r.assign((0, hs._)`${u}[${x}]`, !0) : !g && !s.allErrors && r.if((0, hs.not)(l), () => r.break());
        });
      });
    }
  }
};
gc.default = qk;
var _c = {};
Object.defineProperty(_c, "__esModule", { value: !0 });
const Yk = le, Jk = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: r, schema: t, it: a } = e;
    if ((0, Yk.alwaysValidSchema)(a, t)) {
      e.fail();
      return;
    }
    const n = r.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, n), e.failResult(n, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
_c.default = Jk;
var Ec = {};
Object.defineProperty(Ec, "__esModule", { value: !0 });
const Zk = Ae, Qk = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Zk.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Ec.default = Qk;
var yc = {};
Object.defineProperty(yc, "__esModule", { value: !0 });
const ws = ve, eS = le, rS = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ws._)`{passingSchemas: ${e.passing}}`
}, tS = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: rS,
  code(e) {
    const { gen: r, schema: t, parentSchema: a, it: n } = e;
    if (!Array.isArray(t))
      throw new Error("ajv implementation error");
    if (n.opts.discriminator && a.discriminator)
      return;
    const s = t, i = r.let("valid", !1), c = r.let("passing", null), o = r.name("_valid");
    e.setParams({ passing: c }), r.block(f), e.result(i, () => e.reset(), () => e.error(!0));
    function f() {
      s.forEach((l, u) => {
        let p;
        (0, eS.alwaysValidSchema)(n, l) ? r.var(o, !0) : p = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, o), u > 0 && r.if((0, ws._)`${o} && ${i}`).assign(i, !1).assign(c, (0, ws._)`[${c}, ${u}]`).else(), r.if(o, () => {
          r.assign(i, !0), r.assign(c, u), p && e.mergeEvaluated(p, ws.Name);
        });
      });
    }
  }
};
yc.default = tS;
var wc = {};
Object.defineProperty(wc, "__esModule", { value: !0 });
const aS = le, nS = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: r, schema: t, it: a } = e;
    if (!Array.isArray(t))
      throw new Error("ajv implementation error");
    const n = r.name("valid");
    t.forEach((s, i) => {
      if ((0, aS.alwaysValidSchema)(a, s))
        return;
      const c = e.subschema({ keyword: "allOf", schemaProp: i }, n);
      e.ok(n), e.mergeEvaluated(c);
    });
  }
};
wc.default = nS;
var Tc = {};
Object.defineProperty(Tc, "__esModule", { value: !0 });
const Us = ve, zh = le, sS = {
  message: ({ params: e }) => (0, Us.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, Us._)`{failingKeyword: ${e.ifClause}}`
}, iS = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: sS,
  code(e) {
    const { gen: r, parentSchema: t, it: a } = e;
    t.then === void 0 && t.else === void 0 && (0, zh.checkStrictMode)(a, '"if" without "then" and "else" is ignored');
    const n = Ff(a, "then"), s = Ff(a, "else");
    if (!n && !s)
      return;
    const i = r.let("valid", !0), c = r.name("_valid");
    if (o(), e.reset(), n && s) {
      const l = r.let("ifClause");
      e.setParams({ ifClause: l }), r.if(c, f("then", l), f("else", l));
    } else n ? r.if(c, f("then")) : r.if((0, Us.not)(c), f("else"));
    e.pass(i, () => e.error(!0));
    function o() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, c);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const p = e.subschema({ keyword: l }, c);
        r.assign(i, c), e.mergeValidEvaluated(p, i), u ? r.assign(u, (0, Us._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Ff(e, r) {
  const t = e.schema[r];
  return t !== void 0 && !(0, zh.alwaysValidSchema)(e, t);
}
Tc.default = iS;
var kc = {};
Object.defineProperty(kc, "__esModule", { value: !0 });
const cS = le, oS = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: r, it: t }) {
    r.if === void 0 && (0, cS.checkStrictMode)(t, `"${e}" without "if" is ignored`);
  }
};
kc.default = oS;
Object.defineProperty(ei, "__esModule", { value: !0 });
const fS = Ja, lS = dc, uS = Za, hS = pc, dS = mc, pS = ri, mS = xc, xS = ti, vS = vc, gS = gc, _S = _c, ES = Ec, yS = yc, wS = wc, TS = Tc, kS = kc;
function SS(e = !1) {
  const r = [
    // any
    _S.default,
    ES.default,
    yS.default,
    wS.default,
    TS.default,
    kS.default,
    // object
    mS.default,
    xS.default,
    pS.default,
    vS.default,
    gS.default
  ];
  return e ? r.push(lS.default, hS.default) : r.push(fS.default, uS.default), r.push(dS.default), r;
}
ei.default = SS;
var Sc = {}, Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
Qa.dynamicAnchor = void 0;
const Ri = ve, AS = zr, Cf = Fr, $S = Lt, FS = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => Wh(e, e.schema)
};
function Wh(e, r) {
  const { gen: t, it: a } = e;
  a.schemaEnv.root.dynamicAnchors[r] = !0;
  const n = (0, Ri._)`${AS.default.dynamicAnchors}${(0, Ri.getProperty)(r)}`, s = a.errSchemaPath === "#" ? a.validateName : CS(e);
  t.if((0, Ri._)`!${n}`, () => t.assign(n, s));
}
Qa.dynamicAnchor = Wh;
function CS(e) {
  const { schemaEnv: r, schema: t, self: a } = e.it, { root: n, baseId: s, localRefs: i, meta: c } = r.root, { schemaId: o } = a.opts, f = new Cf.SchemaEnv({ schema: t, schemaId: o, root: n, baseId: s, localRefs: i, meta: c });
  return Cf.compileSchema.call(a, f), (0, $S.getValidate)(e, f);
}
Qa.default = FS;
var en = {};
Object.defineProperty(en, "__esModule", { value: !0 });
en.dynamicRef = void 0;
const Rf = ve, RS = zr, Of = Lt, OS = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Xh(e, e.schema)
};
function Xh(e, r) {
  const { gen: t, keyword: a, it: n } = e;
  if (r[0] !== "#")
    throw new Error(`"${a}" only supports hash fragment reference`);
  const s = r.slice(1);
  if (n.allErrors)
    i();
  else {
    const o = t.let("valid", !1);
    i(o), e.ok(o);
  }
  function i(o) {
    if (n.schemaEnv.root.dynamicAnchors[s]) {
      const f = t.let("_v", (0, Rf._)`${RS.default.dynamicAnchors}${(0, Rf.getProperty)(s)}`);
      t.if(f, c(f, o), c(n.validateName, o));
    } else
      c(n.validateName, o)();
  }
  function c(o, f) {
    return f ? () => t.block(() => {
      (0, Of.callRef)(e, o), t.let(f, !0);
    }) : () => (0, Of.callRef)(e, o);
  }
}
en.dynamicRef = Xh;
en.default = OS;
var Ac = {};
Object.defineProperty(Ac, "__esModule", { value: !0 });
const IS = Qa, PS = le, NS = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, IS.dynamicAnchor)(e, "") : (0, PS.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
Ac.default = NS;
var $c = {};
Object.defineProperty($c, "__esModule", { value: !0 });
const bS = en, DS = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, bS.dynamicRef)(e, e.schema)
};
$c.default = DS;
Object.defineProperty(Sc, "__esModule", { value: !0 });
const LS = Qa, MS = en, BS = Ac, US = $c, jS = [LS.default, MS.default, BS.default, US.default];
Sc.default = jS;
var Fc = {}, Cc = {};
Object.defineProperty(Cc, "__esModule", { value: !0 });
const If = ri, VS = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: If.error,
  code: (e) => (0, If.validatePropertyDeps)(e)
};
Cc.default = VS;
var Rc = {};
Object.defineProperty(Rc, "__esModule", { value: !0 });
const HS = ri, GS = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, HS.validateSchemaDeps)(e)
};
Rc.default = GS;
var Oc = {};
Object.defineProperty(Oc, "__esModule", { value: !0 });
const zS = le, WS = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: r, it: t }) {
    r.contains === void 0 && (0, zS.checkStrictMode)(t, `"${e}" without "contains" is ignored`);
  }
};
Oc.default = WS;
Object.defineProperty(Fc, "__esModule", { value: !0 });
const XS = Cc, KS = Rc, qS = Oc, YS = [XS.default, KS.default, qS.default];
Fc.default = YS;
var Ic = {}, Pc = {};
Object.defineProperty(Pc, "__esModule", { value: !0 });
const zt = ve, Pf = le, JS = zr, ZS = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, zt._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, QS = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: ZS,
  code(e) {
    const { gen: r, schema: t, data: a, errsCount: n, it: s } = e;
    if (!n)
      throw new Error("ajv implementation error");
    const { allErrors: i, props: c } = s;
    c instanceof zt.Name ? r.if((0, zt._)`${c} !== true`, () => r.forIn("key", a, (u) => r.if(f(c, u), () => o(u)))) : c !== !0 && r.forIn("key", a, (u) => c === void 0 ? o(u) : r.if(l(c, u), () => o(u))), s.props = !0, e.ok((0, zt._)`${n} === ${JS.default.errors}`);
    function o(u) {
      if (t === !1) {
        e.setParams({ unevaluatedProperty: u }), e.error(), i || r.break();
        return;
      }
      if (!(0, Pf.alwaysValidSchema)(s, t)) {
        const p = r.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: u,
          dataPropType: Pf.Type.Str
        }, p), i || r.if((0, zt.not)(p), () => r.break());
      }
    }
    function f(u, p) {
      return (0, zt._)`!${u} || !${u}[${p}]`;
    }
    function l(u, p) {
      const h = [];
      for (const d in u)
        u[d] === !0 && h.push((0, zt._)`${p} !== ${d}`);
      return (0, zt.and)(...h);
    }
  }
};
Pc.default = QS;
var Nc = {};
Object.defineProperty(Nc, "__esModule", { value: !0 });
const ua = ve, Nf = le, e4 = {
  message: ({ params: { len: e } }) => (0, ua.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, ua._)`{limit: ${e}}`
}, r4 = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: e4,
  code(e) {
    const { gen: r, schema: t, data: a, it: n } = e, s = n.items || 0;
    if (s === !0)
      return;
    const i = r.const("len", (0, ua._)`${a}.length`);
    if (t === !1)
      e.setParams({ len: s }), e.fail((0, ua._)`${i} > ${s}`);
    else if (typeof t == "object" && !(0, Nf.alwaysValidSchema)(n, t)) {
      const o = r.var("valid", (0, ua._)`${i} <= ${s}`);
      r.if((0, ua.not)(o), () => c(o, s)), e.ok(o);
    }
    n.items = !0;
    function c(o, f) {
      r.forRange("i", f, i, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: Nf.Type.Num }, o), n.allErrors || r.if((0, ua.not)(o), () => r.break());
      });
    }
  }
};
Nc.default = r4;
Object.defineProperty(Ic, "__esModule", { value: !0 });
const t4 = Pc, a4 = Nc, n4 = [t4.default, a4.default];
Ic.default = n4;
var ai = {}, bc = {};
Object.defineProperty(bc, "__esModule", { value: !0 });
const Xe = ve, s4 = {
  message: ({ schemaCode: e }) => (0, Xe.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Xe._)`{format: ${e}}`
}, i4 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: s4,
  code(e, r) {
    const { gen: t, data: a, $data: n, schema: s, schemaCode: i, it: c } = e, { opts: o, errSchemaPath: f, schemaEnv: l, self: u } = c;
    if (!o.validateFormats)
      return;
    n ? p() : h();
    function p() {
      const d = t.scopeValue("formats", {
        ref: u.formats,
        code: o.code.formats
      }), m = t.const("fDef", (0, Xe._)`${d}[${i}]`), x = t.let("fType"), g = t.let("format");
      t.if((0, Xe._)`typeof ${m} == "object" && !(${m} instanceof RegExp)`, () => t.assign(x, (0, Xe._)`${m}.type || "string"`).assign(g, (0, Xe._)`${m}.validate`), () => t.assign(x, (0, Xe._)`"string"`).assign(g, m)), e.fail$data((0, Xe.or)(T(), E()));
      function T() {
        return o.strictSchema === !1 ? Xe.nil : (0, Xe._)`${i} && !${g}`;
      }
      function E() {
        const I = l.$async ? (0, Xe._)`(${m}.async ? await ${g}(${a}) : ${g}(${a}))` : (0, Xe._)`${g}(${a})`, D = (0, Xe._)`(typeof ${g} == "function" ? ${I} : ${g}.test(${a}))`;
        return (0, Xe._)`${g} && ${g} !== true && ${x} === ${r} && !${D}`;
      }
    }
    function h() {
      const d = u.formats[s];
      if (!d) {
        T();
        return;
      }
      if (d === !0)
        return;
      const [m, x, g] = E(d);
      m === r && e.pass(I());
      function T() {
        if (o.strictSchema === !1) {
          u.logger.warn(D());
          return;
        }
        throw new Error(D());
        function D() {
          return `unknown format "${s}" ignored in schema at path "${f}"`;
        }
      }
      function E(D) {
        const L = D instanceof RegExp ? (0, Xe.regexpCode)(D) : o.code.formats ? (0, Xe._)`${o.code.formats}${(0, Xe.getProperty)(s)}` : void 0, C = t.scopeValue("formats", { key: s, ref: D, code: L });
        return typeof D == "object" && !(D instanceof RegExp) ? [D.type || "string", D.validate, (0, Xe._)`${C}.validate`] : ["string", D, C];
      }
      function I() {
        if (typeof d == "object" && !(d instanceof RegExp) && d.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Xe._)`await ${g}(${a})`;
        }
        return typeof x == "function" ? (0, Xe._)`${g}(${a})` : (0, Xe._)`${g}.test(${a})`;
      }
    }
  }
};
bc.default = i4;
Object.defineProperty(ai, "__esModule", { value: !0 });
const c4 = bc, o4 = [c4.default];
ai.default = o4;
var Ea = {};
Object.defineProperty(Ea, "__esModule", { value: !0 });
Ea.contentVocabulary = Ea.metadataVocabulary = void 0;
Ea.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Ea.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(ec, "__esModule", { value: !0 });
const f4 = Zs, l4 = Qs, u4 = ei, h4 = Sc, d4 = Fc, p4 = Ic, m4 = ai, bf = Ea, x4 = [
  h4.default,
  f4.default,
  l4.default,
  (0, u4.default)(!0),
  m4.default,
  bf.metadataVocabulary,
  bf.contentVocabulary,
  d4.default,
  p4.default
];
ec.default = x4;
var ni = {}, si = {};
Object.defineProperty(si, "__esModule", { value: !0 });
si.DiscrError = void 0;
var Df;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Df || (si.DiscrError = Df = {}));
Object.defineProperty(ni, "__esModule", { value: !0 });
const ba = ve, a0 = si, Lf = Fr, v4 = $a, g4 = le, _4 = {
  message: ({ params: { discrError: e, tagName: r } }) => e === a0.DiscrError.Tag ? `tag "${r}" must be string` : `value of tag "${r}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: r, tagName: t } }) => (0, ba._)`{error: ${e}, tag: ${t}, tagValue: ${r}}`
}, E4 = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: _4,
  code(e) {
    const { gen: r, data: t, schema: a, parentSchema: n, it: s } = e, { oneOf: i } = n;
    if (!s.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const c = a.propertyName;
    if (typeof c != "string")
      throw new Error("discriminator: requires propertyName");
    if (a.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!i)
      throw new Error("discriminator: requires oneOf keyword");
    const o = r.let("valid", !1), f = r.const("tag", (0, ba._)`${t}${(0, ba.getProperty)(c)}`);
    r.if((0, ba._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: a0.DiscrError.Tag, tag: f, tagName: c })), e.ok(o);
    function l() {
      const h = p();
      r.if(!1);
      for (const d in h)
        r.elseIf((0, ba._)`${f} === ${d}`), r.assign(o, u(h[d]));
      r.else(), e.error(!1, { discrError: a0.DiscrError.Mapping, tag: f, tagName: c }), r.endIf();
    }
    function u(h) {
      const d = r.name("valid"), m = e.subschema({ keyword: "oneOf", schemaProp: h }, d);
      return e.mergeEvaluated(m, ba.Name), d;
    }
    function p() {
      var h;
      const d = {}, m = g(n);
      let x = !0;
      for (let I = 0; I < i.length; I++) {
        let D = i[I];
        if (D != null && D.$ref && !(0, g4.schemaHasRulesButRef)(D, s.self.RULES)) {
          const C = D.$ref;
          if (D = Lf.resolveRef.call(s.self, s.schemaEnv.root, s.baseId, C), D instanceof Lf.SchemaEnv && (D = D.schema), D === void 0)
            throw new v4.default(s.opts.uriResolver, s.baseId, C);
        }
        const L = (h = D == null ? void 0 : D.properties) === null || h === void 0 ? void 0 : h[c];
        if (typeof L != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${c}"`);
        x = x && (m || g(D)), T(L, I);
      }
      if (!x)
        throw new Error(`discriminator: "${c}" must be required`);
      return d;
      function g({ required: I }) {
        return Array.isArray(I) && I.includes(c);
      }
      function T(I, D) {
        if (I.const)
          E(I.const, D);
        else if (I.enum)
          for (const L of I.enum)
            E(L, D);
        else
          throw new Error(`discriminator: "properties/${c}" must have "const" or "enum"`);
      }
      function E(I, D) {
        if (typeof I != "string" || I in d)
          throw new Error(`discriminator: "${c}" values must be unique strings`);
        d[I] = D;
      }
    }
  }
};
ni.default = E4;
var Dc = {};
const y4 = "https://json-schema.org/draft/2020-12/schema", w4 = "https://json-schema.org/draft/2020-12/schema", T4 = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, k4 = "meta", S4 = "Core and Validation specifications meta-schema", A4 = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], $4 = [
  "object",
  "boolean"
], F4 = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", C4 = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, R4 = {
  $schema: y4,
  $id: w4,
  $vocabulary: T4,
  $dynamicAnchor: k4,
  title: S4,
  allOf: A4,
  type: $4,
  $comment: F4,
  properties: C4
}, O4 = "https://json-schema.org/draft/2020-12/schema", I4 = "https://json-schema.org/draft/2020-12/meta/applicator", P4 = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, N4 = "meta", b4 = "Applicator vocabulary meta-schema", D4 = [
  "object",
  "boolean"
], L4 = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, M4 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, B4 = {
  $schema: O4,
  $id: I4,
  $vocabulary: P4,
  $dynamicAnchor: N4,
  title: b4,
  type: D4,
  properties: L4,
  $defs: M4
}, U4 = "https://json-schema.org/draft/2020-12/schema", j4 = "https://json-schema.org/draft/2020-12/meta/unevaluated", V4 = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, H4 = "meta", G4 = "Unevaluated applicator vocabulary meta-schema", z4 = [
  "object",
  "boolean"
], W4 = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, X4 = {
  $schema: U4,
  $id: j4,
  $vocabulary: V4,
  $dynamicAnchor: H4,
  title: G4,
  type: z4,
  properties: W4
}, K4 = "https://json-schema.org/draft/2020-12/schema", q4 = "https://json-schema.org/draft/2020-12/meta/content", Y4 = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, J4 = "meta", Z4 = "Content vocabulary meta-schema", Q4 = [
  "object",
  "boolean"
], eA = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, rA = {
  $schema: K4,
  $id: q4,
  $vocabulary: Y4,
  $dynamicAnchor: J4,
  title: Z4,
  type: Q4,
  properties: eA
}, tA = "https://json-schema.org/draft/2020-12/schema", aA = "https://json-schema.org/draft/2020-12/meta/core", nA = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, sA = "meta", iA = "Core vocabulary meta-schema", cA = [
  "object",
  "boolean"
], oA = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, fA = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, lA = {
  $schema: tA,
  $id: aA,
  $vocabulary: nA,
  $dynamicAnchor: sA,
  title: iA,
  type: cA,
  properties: oA,
  $defs: fA
}, uA = "https://json-schema.org/draft/2020-12/schema", hA = "https://json-schema.org/draft/2020-12/meta/format-annotation", dA = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, pA = "meta", mA = "Format vocabulary meta-schema for annotation results", xA = [
  "object",
  "boolean"
], vA = {
  format: {
    type: "string"
  }
}, gA = {
  $schema: uA,
  $id: hA,
  $vocabulary: dA,
  $dynamicAnchor: pA,
  title: mA,
  type: xA,
  properties: vA
}, _A = "https://json-schema.org/draft/2020-12/schema", EA = "https://json-schema.org/draft/2020-12/meta/meta-data", yA = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, wA = "meta", TA = "Meta-data vocabulary meta-schema", kA = [
  "object",
  "boolean"
], SA = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, AA = {
  $schema: _A,
  $id: EA,
  $vocabulary: yA,
  $dynamicAnchor: wA,
  title: TA,
  type: kA,
  properties: SA
}, $A = "https://json-schema.org/draft/2020-12/schema", FA = "https://json-schema.org/draft/2020-12/meta/validation", CA = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, RA = "meta", OA = "Validation vocabulary meta-schema", IA = [
  "object",
  "boolean"
], PA = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, NA = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, bA = {
  $schema: $A,
  $id: FA,
  $vocabulary: CA,
  $dynamicAnchor: RA,
  title: OA,
  type: IA,
  properties: PA,
  $defs: NA
};
Object.defineProperty(Dc, "__esModule", { value: !0 });
const DA = R4, LA = B4, MA = X4, BA = rA, UA = lA, jA = gA, VA = AA, HA = bA, GA = ["/properties"];
function zA(e) {
  return [
    DA,
    LA,
    MA,
    BA,
    UA,
    r(this, jA),
    VA,
    r(this, HA)
  ].forEach((t) => this.addMetaSchema(t, void 0, !1)), this;
  function r(t, a) {
    return e ? t.$dataMetaSchema(a, GA) : a;
  }
}
Dc.default = zA;
(function(e, r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.MissingRefError = r.ValidationError = r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = r.Ajv2020 = void 0;
  const t = B0, a = ec, n = ni, s = Dc, i = "https://json-schema.org/draft/2020-12/schema";
  class c extends t.default {
    constructor(h = {}) {
      super({
        ...h,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), a.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(n.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: h, meta: d } = this.opts;
      d && (s.default.call(this, h), this.refs["http://json-schema.org/schema"] = i);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(i) ? i : void 0);
    }
  }
  r.Ajv2020 = c, e.exports = r = c, e.exports.Ajv2020 = c, Object.defineProperty(r, "__esModule", { value: !0 }), r.default = c;
  var o = Zr;
  Object.defineProperty(r, "KeywordCxt", { enumerable: !0, get: function() {
    return o.KeywordCxt;
  } });
  var f = ve;
  Object.defineProperty(r, "_", { enumerable: !0, get: function() {
    return f._;
  } }), Object.defineProperty(r, "str", { enumerable: !0, get: function() {
    return f.str;
  } }), Object.defineProperty(r, "stringify", { enumerable: !0, get: function() {
    return f.stringify;
  } }), Object.defineProperty(r, "nil", { enumerable: !0, get: function() {
    return f.nil;
  } }), Object.defineProperty(r, "Name", { enumerable: !0, get: function() {
    return f.Name;
  } }), Object.defineProperty(r, "CodeGen", { enumerable: !0, get: function() {
    return f.CodeGen;
  } });
  var l = Ya;
  Object.defineProperty(r, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var u = $a;
  Object.defineProperty(r, "MissingRefError", { enumerable: !0, get: function() {
    return u.default;
  } });
})(qi, qi.exports);
var WA = qi.exports, n0 = { exports: {} }, Kh = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function r(j, M) {
    return { validate: j, compare: M };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: r(s, i),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: r(o(!0), f),
    "date-time": r(p(!0), h),
    "iso-time": r(o(), l),
    "iso-date-time": r(p(), d),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: g,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: J,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: E,
    // signed 32 bit integer
    int32: { type: "number", validate: L },
    // signed 64 bit integer
    int64: { type: "number", validate: C },
    // C-type float
    float: { type: "number", validate: z },
    // C-type double
    double: { type: "number", validate: z },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: r(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
    time: r(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    "date-time": r(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": r(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": r(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function t(j) {
    return j % 4 === 0 && (j % 100 !== 0 || j % 400 === 0);
  }
  const a = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, n = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function s(j) {
    const M = a.exec(j);
    if (!M)
      return !1;
    const ae = +M[1], G = +M[2], V = +M[3];
    return G >= 1 && G <= 12 && V >= 1 && V <= (G === 2 && t(ae) ? 29 : n[G]);
  }
  function i(j, M) {
    if (j && M)
      return j > M ? 1 : j < M ? -1 : 0;
  }
  const c = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function o(j) {
    return function(ae) {
      const G = c.exec(ae);
      if (!G)
        return !1;
      const V = +G[1], te = +G[2], Z = +G[3], ce = G[4], B = G[5] === "-" ? -1 : 1, H = +(G[6] || 0), b = +(G[7] || 0);
      if (H > 23 || b > 59 || j && !ce)
        return !1;
      if (V <= 23 && te <= 59 && Z < 60)
        return !0;
      const y = te - b * B, k = V - H * B - (y < 0 ? 1 : 0);
      return (k === 23 || k === -1) && (y === 59 || y === -1) && Z < 61;
    };
  }
  function f(j, M) {
    if (!(j && M))
      return;
    const ae = (/* @__PURE__ */ new Date("2020-01-01T" + j)).valueOf(), G = (/* @__PURE__ */ new Date("2020-01-01T" + M)).valueOf();
    if (ae && G)
      return ae - G;
  }
  function l(j, M) {
    if (!(j && M))
      return;
    const ae = c.exec(j), G = c.exec(M);
    if (ae && G)
      return j = ae[1] + ae[2] + ae[3], M = G[1] + G[2] + G[3], j > M ? 1 : j < M ? -1 : 0;
  }
  const u = /t|\s/i;
  function p(j) {
    const M = o(j);
    return function(G) {
      const V = G.split(u);
      return V.length === 2 && s(V[0]) && M(V[1]);
    };
  }
  function h(j, M) {
    if (!(j && M))
      return;
    const ae = new Date(j).valueOf(), G = new Date(M).valueOf();
    if (ae && G)
      return ae - G;
  }
  function d(j, M) {
    if (!(j && M))
      return;
    const [ae, G] = j.split(u), [V, te] = M.split(u), Z = i(ae, V);
    if (Z !== void 0)
      return Z || f(G, te);
  }
  const m = /\/|:/, x = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function g(j) {
    return m.test(j) && x.test(j);
  }
  const T = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function E(j) {
    return T.lastIndex = 0, T.test(j);
  }
  const I = -(2 ** 31), D = 2 ** 31 - 1;
  function L(j) {
    return Number.isInteger(j) && j <= D && j >= I;
  }
  function C(j) {
    return Number.isInteger(j);
  }
  function z() {
    return !0;
  }
  const U = /[^\\]\\Z/;
  function J(j) {
    if (U.test(j))
      return !1;
    try {
      return new RegExp(j), !0;
    } catch {
      return !1;
    }
  }
})(Kh);
var qh = {}, s0 = { exports: {} }, Lc = {};
Object.defineProperty(Lc, "__esModule", { value: !0 });
const XA = Zs, KA = Qs, qA = ei, YA = ai, Mf = Ea, JA = [
  XA.default,
  KA.default,
  (0, qA.default)(),
  YA.default,
  Mf.metadataVocabulary,
  Mf.contentVocabulary
];
Lc.default = JA;
const ZA = "http://json-schema.org/draft-07/schema#", QA = "http://json-schema.org/draft-07/schema#", e$ = "Core schema meta-schema", r$ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, t$ = [
  "object",
  "boolean"
], a$ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, n$ = {
  $schema: ZA,
  $id: QA,
  title: e$,
  definitions: r$,
  type: t$,
  properties: a$,
  default: !0
};
(function(e, r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.MissingRefError = r.ValidationError = r.CodeGen = r.Name = r.nil = r.stringify = r.str = r._ = r.KeywordCxt = r.Ajv = void 0;
  const t = B0, a = Lc, n = ni, s = n$, i = ["/properties"], c = "http://json-schema.org/draft-07/schema";
  class o extends t.default {
    _addVocabularies() {
      super._addVocabularies(), a.default.forEach((d) => this.addVocabulary(d)), this.opts.discriminator && this.addKeyword(n.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const d = this.opts.$data ? this.$dataMetaSchema(s, i) : s;
      this.addMetaSchema(d, c, !1), this.refs["http://json-schema.org/schema"] = c;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(c) ? c : void 0);
    }
  }
  r.Ajv = o, e.exports = r = o, e.exports.Ajv = o, Object.defineProperty(r, "__esModule", { value: !0 }), r.default = o;
  var f = Zr;
  Object.defineProperty(r, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var l = ve;
  Object.defineProperty(r, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(r, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(r, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(r, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(r, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(r, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var u = Ya;
  Object.defineProperty(r, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var p = $a;
  Object.defineProperty(r, "MissingRefError", { enumerable: !0, get: function() {
    return p.default;
  } });
})(s0, s0.exports);
var s$ = s0.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const r = s$, t = ve, a = t.operators, n = {
    formatMaximum: { okStr: "<=", ok: a.LTE, fail: a.GT },
    formatMinimum: { okStr: ">=", ok: a.GTE, fail: a.LT },
    formatExclusiveMaximum: { okStr: "<", ok: a.LT, fail: a.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: a.GT, fail: a.LTE }
  }, s = {
    message: ({ keyword: c, schemaCode: o }) => (0, t.str)`should be ${n[c].okStr} ${o}`,
    params: ({ keyword: c, schemaCode: o }) => (0, t._)`{comparison: ${n[c].okStr}, limit: ${o}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(n),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: s,
    code(c) {
      const { gen: o, data: f, schemaCode: l, keyword: u, it: p } = c, { opts: h, self: d } = p;
      if (!h.validateFormats)
        return;
      const m = new r.KeywordCxt(p, d.RULES.all.format.definition, "format");
      m.$data ? x() : g();
      function x() {
        const E = o.scopeValue("formats", {
          ref: d.formats,
          code: h.code.formats
        }), I = o.const("fmt", (0, t._)`${E}[${m.schemaCode}]`);
        c.fail$data((0, t.or)((0, t._)`typeof ${I} != "object"`, (0, t._)`${I} instanceof RegExp`, (0, t._)`typeof ${I}.compare != "function"`, T(I)));
      }
      function g() {
        const E = m.schema, I = d.formats[E];
        if (!I || I === !0)
          return;
        if (typeof I != "object" || I instanceof RegExp || typeof I.compare != "function")
          throw new Error(`"${u}": format "${E}" does not define "compare" function`);
        const D = o.scopeValue("formats", {
          key: E,
          ref: I,
          code: h.code.formats ? (0, t._)`${h.code.formats}${(0, t.getProperty)(E)}` : void 0
        });
        c.fail$data(T(D));
      }
      function T(E) {
        return (0, t._)`${E}.compare(${f}, ${l}) ${n[u].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const i = (c) => (c.addKeyword(e.formatLimitDefinition), c);
  e.default = i;
})(qh);
(function(e, r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  const t = Kh, a = qh, n = ve, s = new n.Name("fullFormats"), i = new n.Name("fastFormats"), c = (f, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return o(f, l, t.fullFormats, s), f;
    const [u, p] = l.mode === "fast" ? [t.fastFormats, i] : [t.fullFormats, s], h = l.formats || t.formatNames;
    return o(f, h, u, p), l.keywords && (0, a.default)(f), f;
  };
  c.get = (f, l = "full") => {
    const p = (l === "fast" ? t.fastFormats : t.fullFormats)[f];
    if (!p)
      throw new Error(`Unknown format "${f}"`);
    return p;
  };
  function o(f, l, u, p) {
    var h, d;
    (h = (d = f.opts.code).formats) !== null && h !== void 0 || (d.formats = (0, n._)`require("ajv-formats/dist/formats").${p}`);
    for (const m of l)
      f.addFormat(m, u[m]);
  }
  e.exports = r = c, Object.defineProperty(r, "__esModule", { value: !0 }), r.default = c;
})(n0, n0.exports);
var i$ = n0.exports;
const c$ = /* @__PURE__ */ Ju(i$), o$ = (e, r, t, a) => {
  if (t === "length" || t === "prototype" || t === "arguments" || t === "caller")
    return;
  const n = Object.getOwnPropertyDescriptor(e, t), s = Object.getOwnPropertyDescriptor(r, t);
  !f$(n, s) && a || Object.defineProperty(e, t, s);
}, f$ = function(e, r) {
  return e === void 0 || e.configurable || e.writable === r.writable && e.enumerable === r.enumerable && e.configurable === r.configurable && (e.writable || e.value === r.value);
}, l$ = (e, r) => {
  const t = Object.getPrototypeOf(r);
  t !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, t);
}, u$ = (e, r) => `/* Wrapped ${e}*/
${r}`, h$ = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), d$ = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), p$ = (e, r, t) => {
  const a = t === "" ? "" : `with ${t.trim()}() `, n = u$.bind(null, a, r.toString());
  Object.defineProperty(n, "name", d$);
  const { writable: s, enumerable: i, configurable: c } = h$;
  Object.defineProperty(e, "toString", { value: n, writable: s, enumerable: i, configurable: c });
};
function m$(e, r, { ignoreNonConfigurable: t = !1 } = {}) {
  const { name: a } = e;
  for (const n of Reflect.ownKeys(r))
    o$(e, r, n, t);
  return l$(e, r), p$(e, r, a), e;
}
const Bf = (e, r = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: t = 0,
    maxWait: a = Number.POSITIVE_INFINITY,
    before: n = !1,
    after: s = !0
  } = r;
  if (t < 0 || a < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!n && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let i, c, o;
  const f = function(...l) {
    const u = this, p = () => {
      i = void 0, c && (clearTimeout(c), c = void 0), s && (o = e.apply(u, l));
    }, h = () => {
      c = void 0, i && (clearTimeout(i), i = void 0), s && (o = e.apply(u, l));
    }, d = n && !i;
    return clearTimeout(i), i = setTimeout(p, t), a > 0 && a !== Number.POSITIVE_INFINITY && !c && (c = setTimeout(h, a)), d && (o = e.apply(u, l)), o;
  };
  return m$(f, e), f.cancel = () => {
    i && (clearTimeout(i), i = void 0), c && (clearTimeout(c), c = void 0);
  }, f;
};
var i0 = { exports: {} };
const x$ = "2.0.0", Yh = 256, v$ = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, g$ = 16, _$ = Yh - 6, E$ = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var ii = {
  MAX_LENGTH: Yh,
  MAX_SAFE_COMPONENT_LENGTH: g$,
  MAX_SAFE_BUILD_LENGTH: _$,
  MAX_SAFE_INTEGER: v$,
  RELEASE_TYPES: E$,
  SEMVER_SPEC_VERSION: x$,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const y$ = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var ci = y$;
(function(e, r) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: t,
    MAX_SAFE_BUILD_LENGTH: a,
    MAX_LENGTH: n
  } = ii, s = ci;
  r = e.exports = {};
  const i = r.re = [], c = r.safeRe = [], o = r.src = [], f = r.t = {};
  let l = 0;
  const u = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", n],
    [u, a]
  ], h = (m) => {
    for (const [x, g] of p)
      m = m.split(`${x}*`).join(`${x}{0,${g}}`).split(`${x}+`).join(`${x}{1,${g}}`);
    return m;
  }, d = (m, x, g) => {
    const T = h(x), E = l++;
    s(m, E, x), f[m] = E, o[E] = x, i[E] = new RegExp(x, g ? "g" : void 0), c[E] = new RegExp(T, g ? "g" : void 0);
  };
  d("NUMERICIDENTIFIER", "0|[1-9]\\d*"), d("NUMERICIDENTIFIERLOOSE", "\\d+"), d("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${u}*`), d("MAINVERSION", `(${o[f.NUMERICIDENTIFIER]})\\.(${o[f.NUMERICIDENTIFIER]})\\.(${o[f.NUMERICIDENTIFIER]})`), d("MAINVERSIONLOOSE", `(${o[f.NUMERICIDENTIFIERLOOSE]})\\.(${o[f.NUMERICIDENTIFIERLOOSE]})\\.(${o[f.NUMERICIDENTIFIERLOOSE]})`), d("PRERELEASEIDENTIFIER", `(?:${o[f.NUMERICIDENTIFIER]}|${o[f.NONNUMERICIDENTIFIER]})`), d("PRERELEASEIDENTIFIERLOOSE", `(?:${o[f.NUMERICIDENTIFIERLOOSE]}|${o[f.NONNUMERICIDENTIFIER]})`), d("PRERELEASE", `(?:-(${o[f.PRERELEASEIDENTIFIER]}(?:\\.${o[f.PRERELEASEIDENTIFIER]})*))`), d("PRERELEASELOOSE", `(?:-?(${o[f.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[f.PRERELEASEIDENTIFIERLOOSE]})*))`), d("BUILDIDENTIFIER", `${u}+`), d("BUILD", `(?:\\+(${o[f.BUILDIDENTIFIER]}(?:\\.${o[f.BUILDIDENTIFIER]})*))`), d("FULLPLAIN", `v?${o[f.MAINVERSION]}${o[f.PRERELEASE]}?${o[f.BUILD]}?`), d("FULL", `^${o[f.FULLPLAIN]}$`), d("LOOSEPLAIN", `[v=\\s]*${o[f.MAINVERSIONLOOSE]}${o[f.PRERELEASELOOSE]}?${o[f.BUILD]}?`), d("LOOSE", `^${o[f.LOOSEPLAIN]}$`), d("GTLT", "((?:<|>)?=?)"), d("XRANGEIDENTIFIERLOOSE", `${o[f.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), d("XRANGEIDENTIFIER", `${o[f.NUMERICIDENTIFIER]}|x|X|\\*`), d("XRANGEPLAIN", `[v=\\s]*(${o[f.XRANGEIDENTIFIER]})(?:\\.(${o[f.XRANGEIDENTIFIER]})(?:\\.(${o[f.XRANGEIDENTIFIER]})(?:${o[f.PRERELEASE]})?${o[f.BUILD]}?)?)?`), d("XRANGEPLAINLOOSE", `[v=\\s]*(${o[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[f.XRANGEIDENTIFIERLOOSE]})(?:${o[f.PRERELEASELOOSE]})?${o[f.BUILD]}?)?)?`), d("XRANGE", `^${o[f.GTLT]}\\s*${o[f.XRANGEPLAIN]}$`), d("XRANGELOOSE", `^${o[f.GTLT]}\\s*${o[f.XRANGEPLAINLOOSE]}$`), d("COERCEPLAIN", `(^|[^\\d])(\\d{1,${t}})(?:\\.(\\d{1,${t}}))?(?:\\.(\\d{1,${t}}))?`), d("COERCE", `${o[f.COERCEPLAIN]}(?:$|[^\\d])`), d("COERCEFULL", o[f.COERCEPLAIN] + `(?:${o[f.PRERELEASE]})?(?:${o[f.BUILD]})?(?:$|[^\\d])`), d("COERCERTL", o[f.COERCE], !0), d("COERCERTLFULL", o[f.COERCEFULL], !0), d("LONETILDE", "(?:~>?)"), d("TILDETRIM", `(\\s*)${o[f.LONETILDE]}\\s+`, !0), r.tildeTrimReplace = "$1~", d("TILDE", `^${o[f.LONETILDE]}${o[f.XRANGEPLAIN]}$`), d("TILDELOOSE", `^${o[f.LONETILDE]}${o[f.XRANGEPLAINLOOSE]}$`), d("LONECARET", "(?:\\^)"), d("CARETTRIM", `(\\s*)${o[f.LONECARET]}\\s+`, !0), r.caretTrimReplace = "$1^", d("CARET", `^${o[f.LONECARET]}${o[f.XRANGEPLAIN]}$`), d("CARETLOOSE", `^${o[f.LONECARET]}${o[f.XRANGEPLAINLOOSE]}$`), d("COMPARATORLOOSE", `^${o[f.GTLT]}\\s*(${o[f.LOOSEPLAIN]})$|^$`), d("COMPARATOR", `^${o[f.GTLT]}\\s*(${o[f.FULLPLAIN]})$|^$`), d("COMPARATORTRIM", `(\\s*)${o[f.GTLT]}\\s*(${o[f.LOOSEPLAIN]}|${o[f.XRANGEPLAIN]})`, !0), r.comparatorTrimReplace = "$1$2$3", d("HYPHENRANGE", `^\\s*(${o[f.XRANGEPLAIN]})\\s+-\\s+(${o[f.XRANGEPLAIN]})\\s*$`), d("HYPHENRANGELOOSE", `^\\s*(${o[f.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[f.XRANGEPLAINLOOSE]})\\s*$`), d("STAR", "(<|>)?=?\\s*\\*"), d("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), d("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(i0, i0.exports);
var Yn = i0.exports;
const w$ = Object.freeze({ loose: !0 }), T$ = Object.freeze({}), k$ = (e) => e ? typeof e != "object" ? w$ : e : T$;
var Mc = k$;
const Uf = /^[0-9]+$/, Jh = (e, r) => {
  const t = Uf.test(e), a = Uf.test(r);
  return t && a && (e = +e, r = +r), e === r ? 0 : t && !a ? -1 : a && !t ? 1 : e < r ? -1 : 1;
}, S$ = (e, r) => Jh(r, e);
var Zh = {
  compareIdentifiers: Jh,
  rcompareIdentifiers: S$
};
const ds = ci, { MAX_LENGTH: jf, MAX_SAFE_INTEGER: ps } = ii, { safeRe: Vf, t: Hf } = Yn, A$ = Mc, { compareIdentifiers: Oa } = Zh;
let $$ = class pt {
  constructor(r, t) {
    if (t = A$(t), r instanceof pt) {
      if (r.loose === !!t.loose && r.includePrerelease === !!t.includePrerelease)
        return r;
      r = r.version;
    } else if (typeof r != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof r}".`);
    if (r.length > jf)
      throw new TypeError(
        `version is longer than ${jf} characters`
      );
    ds("SemVer", r, t), this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease;
    const a = r.trim().match(t.loose ? Vf[Hf.LOOSE] : Vf[Hf.FULL]);
    if (!a)
      throw new TypeError(`Invalid Version: ${r}`);
    if (this.raw = r, this.major = +a[1], this.minor = +a[2], this.patch = +a[3], this.major > ps || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > ps || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > ps || this.patch < 0)
      throw new TypeError("Invalid patch version");
    a[4] ? this.prerelease = a[4].split(".").map((n) => {
      if (/^[0-9]+$/.test(n)) {
        const s = +n;
        if (s >= 0 && s < ps)
          return s;
      }
      return n;
    }) : this.prerelease = [], this.build = a[5] ? a[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(r) {
    if (ds("SemVer.compare", this.version, this.options, r), !(r instanceof pt)) {
      if (typeof r == "string" && r === this.version)
        return 0;
      r = new pt(r, this.options);
    }
    return r.version === this.version ? 0 : this.compareMain(r) || this.comparePre(r);
  }
  compareMain(r) {
    return r instanceof pt || (r = new pt(r, this.options)), Oa(this.major, r.major) || Oa(this.minor, r.minor) || Oa(this.patch, r.patch);
  }
  comparePre(r) {
    if (r instanceof pt || (r = new pt(r, this.options)), this.prerelease.length && !r.prerelease.length)
      return -1;
    if (!this.prerelease.length && r.prerelease.length)
      return 1;
    if (!this.prerelease.length && !r.prerelease.length)
      return 0;
    let t = 0;
    do {
      const a = this.prerelease[t], n = r.prerelease[t];
      if (ds("prerelease compare", t, a, n), a === void 0 && n === void 0)
        return 0;
      if (n === void 0)
        return 1;
      if (a === void 0)
        return -1;
      if (a === n)
        continue;
      return Oa(a, n);
    } while (++t);
  }
  compareBuild(r) {
    r instanceof pt || (r = new pt(r, this.options));
    let t = 0;
    do {
      const a = this.build[t], n = r.build[t];
      if (ds("build compare", t, a, n), a === void 0 && n === void 0)
        return 0;
      if (n === void 0)
        return 1;
      if (a === void 0)
        return -1;
      if (a === n)
        continue;
      return Oa(a, n);
    } while (++t);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(r, t, a) {
    switch (r) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, a);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, a);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", t, a), this.inc("pre", t, a);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", t, a), this.inc("pre", t, a);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const n = Number(a) ? 1 : 0;
        if (!t && a === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [n];
        else {
          let s = this.prerelease.length;
          for (; --s >= 0; )
            typeof this.prerelease[s] == "number" && (this.prerelease[s]++, s = -2);
          if (s === -1) {
            if (t === this.prerelease.join(".") && a === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(n);
          }
        }
        if (t) {
          let s = [t, n];
          a === !1 && (s = [t]), Oa(this.prerelease[0], t) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = s) : this.prerelease = s;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${r}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ir = $$;
const Gf = Ir, F$ = (e, r, t = !1) => {
  if (e instanceof Gf)
    return e;
  try {
    return new Gf(e, r);
  } catch (a) {
    if (!t)
      return null;
    throw a;
  }
};
var rn = F$;
const C$ = rn, R$ = (e, r) => {
  const t = C$(e, r);
  return t ? t.version : null;
};
var O$ = R$;
const I$ = rn, P$ = (e, r) => {
  const t = I$(e.trim().replace(/^[=v]+/, ""), r);
  return t ? t.version : null;
};
var N$ = P$;
const zf = Ir, b$ = (e, r, t, a, n) => {
  typeof t == "string" && (n = a, a = t, t = void 0);
  try {
    return new zf(
      e instanceof zf ? e.version : e,
      t
    ).inc(r, a, n).version;
  } catch {
    return null;
  }
};
var D$ = b$;
const Wf = rn, L$ = (e, r) => {
  const t = Wf(e, null, !0), a = Wf(r, null, !0), n = t.compare(a);
  if (n === 0)
    return null;
  const s = n > 0, i = s ? t : a, c = s ? a : t, o = !!i.prerelease.length;
  if (!!c.prerelease.length && !o)
    return !c.patch && !c.minor ? "major" : i.patch ? "patch" : i.minor ? "minor" : "major";
  const l = o ? "pre" : "";
  return t.major !== a.major ? l + "major" : t.minor !== a.minor ? l + "minor" : t.patch !== a.patch ? l + "patch" : "prerelease";
};
var M$ = L$;
const B$ = Ir, U$ = (e, r) => new B$(e, r).major;
var j$ = U$;
const V$ = Ir, H$ = (e, r) => new V$(e, r).minor;
var G$ = H$;
const z$ = Ir, W$ = (e, r) => new z$(e, r).patch;
var X$ = W$;
const K$ = rn, q$ = (e, r) => {
  const t = K$(e, r);
  return t && t.prerelease.length ? t.prerelease : null;
};
var Y$ = q$;
const Xf = Ir, J$ = (e, r, t) => new Xf(e, t).compare(new Xf(r, t));
var lt = J$;
const Z$ = lt, Q$ = (e, r, t) => Z$(r, e, t);
var e3 = Q$;
const r3 = lt, t3 = (e, r) => r3(e, r, !0);
var a3 = t3;
const Kf = Ir, n3 = (e, r, t) => {
  const a = new Kf(e, t), n = new Kf(r, t);
  return a.compare(n) || a.compareBuild(n);
};
var Bc = n3;
const s3 = Bc, i3 = (e, r) => e.sort((t, a) => s3(t, a, r));
var c3 = i3;
const o3 = Bc, f3 = (e, r) => e.sort((t, a) => o3(a, t, r));
var l3 = f3;
const u3 = lt, h3 = (e, r, t) => u3(e, r, t) > 0;
var oi = h3;
const d3 = lt, p3 = (e, r, t) => d3(e, r, t) < 0;
var Uc = p3;
const m3 = lt, x3 = (e, r, t) => m3(e, r, t) === 0;
var Qh = x3;
const v3 = lt, g3 = (e, r, t) => v3(e, r, t) !== 0;
var ed = g3;
const _3 = lt, E3 = (e, r, t) => _3(e, r, t) >= 0;
var jc = E3;
const y3 = lt, w3 = (e, r, t) => y3(e, r, t) <= 0;
var Vc = w3;
const T3 = Qh, k3 = ed, S3 = oi, A3 = jc, $3 = Uc, F3 = Vc, C3 = (e, r, t, a) => {
  switch (r) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof t == "object" && (t = t.version), e === t;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof t == "object" && (t = t.version), e !== t;
    case "":
    case "=":
    case "==":
      return T3(e, t, a);
    case "!=":
      return k3(e, t, a);
    case ">":
      return S3(e, t, a);
    case ">=":
      return A3(e, t, a);
    case "<":
      return $3(e, t, a);
    case "<=":
      return F3(e, t, a);
    default:
      throw new TypeError(`Invalid operator: ${r}`);
  }
};
var rd = C3;
const R3 = Ir, O3 = rn, { safeRe: ms, t: xs } = Yn, I3 = (e, r) => {
  if (e instanceof R3)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  r = r || {};
  let t = null;
  if (!r.rtl)
    t = e.match(r.includePrerelease ? ms[xs.COERCEFULL] : ms[xs.COERCE]);
  else {
    const o = r.includePrerelease ? ms[xs.COERCERTLFULL] : ms[xs.COERCERTL];
    let f;
    for (; (f = o.exec(e)) && (!t || t.index + t[0].length !== e.length); )
      (!t || f.index + f[0].length !== t.index + t[0].length) && (t = f), o.lastIndex = f.index + f[1].length + f[2].length;
    o.lastIndex = -1;
  }
  if (t === null)
    return null;
  const a = t[2], n = t[3] || "0", s = t[4] || "0", i = r.includePrerelease && t[5] ? `-${t[5]}` : "", c = r.includePrerelease && t[6] ? `+${t[6]}` : "";
  return O3(`${a}.${n}.${s}${i}${c}`, r);
};
var P3 = I3;
class N3 {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(r) {
    const t = this.map.get(r);
    if (t !== void 0)
      return this.map.delete(r), this.map.set(r, t), t;
  }
  delete(r) {
    return this.map.delete(r);
  }
  set(r, t) {
    if (!this.delete(r) && t !== void 0) {
      if (this.map.size >= this.max) {
        const n = this.map.keys().next().value;
        this.delete(n);
      }
      this.map.set(r, t);
    }
    return this;
  }
}
var b3 = N3, Oi, qf;
function ut() {
  if (qf) return Oi;
  qf = 1;
  const e = /\s+/g;
  class r {
    constructor(V, te) {
      if (te = n(te), V instanceof r)
        return V.loose === !!te.loose && V.includePrerelease === !!te.includePrerelease ? V : new r(V.raw, te);
      if (V instanceof s)
        return this.raw = V.value, this.set = [[V]], this.formatted = void 0, this;
      if (this.options = te, this.loose = !!te.loose, this.includePrerelease = !!te.includePrerelease, this.raw = V.trim().replace(e, " "), this.set = this.raw.split("||").map((Z) => this.parseRange(Z.trim())).filter((Z) => Z.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const Z = this.set[0];
        if (this.set = this.set.filter((ce) => !m(ce[0])), this.set.length === 0)
          this.set = [Z];
        else if (this.set.length > 1) {
          for (const ce of this.set)
            if (ce.length === 1 && x(ce[0])) {
              this.set = [ce];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let V = 0; V < this.set.length; V++) {
          V > 0 && (this.formatted += "||");
          const te = this.set[V];
          for (let Z = 0; Z < te.length; Z++)
            Z > 0 && (this.formatted += " "), this.formatted += te[Z].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(V) {
      const Z = ((this.options.includePrerelease && h) | (this.options.loose && d)) + ":" + V, ce = a.get(Z);
      if (ce)
        return ce;
      const B = this.options.loose, H = B ? o[f.HYPHENRANGELOOSE] : o[f.HYPHENRANGE];
      V = V.replace(H, M(this.options.includePrerelease)), i("hyphen replace", V), V = V.replace(o[f.COMPARATORTRIM], l), i("comparator trim", V), V = V.replace(o[f.TILDETRIM], u), i("tilde trim", V), V = V.replace(o[f.CARETTRIM], p), i("caret trim", V);
      let b = V.split(" ").map((_) => T(_, this.options)).join(" ").split(/\s+/).map((_) => j(_, this.options));
      B && (b = b.filter((_) => (i("loose invalid filter", _, this.options), !!_.match(o[f.COMPARATORLOOSE])))), i("range list", b);
      const y = /* @__PURE__ */ new Map(), k = b.map((_) => new s(_, this.options));
      for (const _ of k) {
        if (m(_))
          return [_];
        y.set(_.value, _);
      }
      y.size > 1 && y.has("") && y.delete("");
      const v = [...y.values()];
      return a.set(Z, v), v;
    }
    intersects(V, te) {
      if (!(V instanceof r))
        throw new TypeError("a Range is required");
      return this.set.some((Z) => g(Z, te) && V.set.some((ce) => g(ce, te) && Z.every((B) => ce.every((H) => B.intersects(H, te)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(V) {
      if (!V)
        return !1;
      if (typeof V == "string")
        try {
          V = new c(V, this.options);
        } catch {
          return !1;
        }
      for (let te = 0; te < this.set.length; te++)
        if (ae(this.set[te], V, this.options))
          return !0;
      return !1;
    }
  }
  Oi = r;
  const t = b3, a = new t(), n = Mc, s = fi(), i = ci, c = Ir, {
    safeRe: o,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: p
  } = Yn, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: d } = ii, m = (G) => G.value === "<0.0.0-0", x = (G) => G.value === "", g = (G, V) => {
    let te = !0;
    const Z = G.slice();
    let ce = Z.pop();
    for (; te && Z.length; )
      te = Z.every((B) => ce.intersects(B, V)), ce = Z.pop();
    return te;
  }, T = (G, V) => (i("comp", G, V), G = L(G, V), i("caret", G), G = I(G, V), i("tildes", G), G = z(G, V), i("xrange", G), G = J(G, V), i("stars", G), G), E = (G) => !G || G.toLowerCase() === "x" || G === "*", I = (G, V) => G.trim().split(/\s+/).map((te) => D(te, V)).join(" "), D = (G, V) => {
    const te = V.loose ? o[f.TILDELOOSE] : o[f.TILDE];
    return G.replace(te, (Z, ce, B, H, b) => {
      i("tilde", G, Z, ce, B, H, b);
      let y;
      return E(ce) ? y = "" : E(B) ? y = `>=${ce}.0.0 <${+ce + 1}.0.0-0` : E(H) ? y = `>=${ce}.${B}.0 <${ce}.${+B + 1}.0-0` : b ? (i("replaceTilde pr", b), y = `>=${ce}.${B}.${H}-${b} <${ce}.${+B + 1}.0-0`) : y = `>=${ce}.${B}.${H} <${ce}.${+B + 1}.0-0`, i("tilde return", y), y;
    });
  }, L = (G, V) => G.trim().split(/\s+/).map((te) => C(te, V)).join(" "), C = (G, V) => {
    i("caret", G, V);
    const te = V.loose ? o[f.CARETLOOSE] : o[f.CARET], Z = V.includePrerelease ? "-0" : "";
    return G.replace(te, (ce, B, H, b, y) => {
      i("caret", G, ce, B, H, b, y);
      let k;
      return E(B) ? k = "" : E(H) ? k = `>=${B}.0.0${Z} <${+B + 1}.0.0-0` : E(b) ? B === "0" ? k = `>=${B}.${H}.0${Z} <${B}.${+H + 1}.0-0` : k = `>=${B}.${H}.0${Z} <${+B + 1}.0.0-0` : y ? (i("replaceCaret pr", y), B === "0" ? H === "0" ? k = `>=${B}.${H}.${b}-${y} <${B}.${H}.${+b + 1}-0` : k = `>=${B}.${H}.${b}-${y} <${B}.${+H + 1}.0-0` : k = `>=${B}.${H}.${b}-${y} <${+B + 1}.0.0-0`) : (i("no pr"), B === "0" ? H === "0" ? k = `>=${B}.${H}.${b}${Z} <${B}.${H}.${+b + 1}-0` : k = `>=${B}.${H}.${b}${Z} <${B}.${+H + 1}.0-0` : k = `>=${B}.${H}.${b} <${+B + 1}.0.0-0`), i("caret return", k), k;
    });
  }, z = (G, V) => (i("replaceXRanges", G, V), G.split(/\s+/).map((te) => U(te, V)).join(" ")), U = (G, V) => {
    G = G.trim();
    const te = V.loose ? o[f.XRANGELOOSE] : o[f.XRANGE];
    return G.replace(te, (Z, ce, B, H, b, y) => {
      i("xRange", G, Z, ce, B, H, b, y);
      const k = E(B), v = k || E(H), _ = v || E(b), N = _;
      return ce === "=" && N && (ce = ""), y = V.includePrerelease ? "-0" : "", k ? ce === ">" || ce === "<" ? Z = "<0.0.0-0" : Z = "*" : ce && N ? (v && (H = 0), b = 0, ce === ">" ? (ce = ">=", v ? (B = +B + 1, H = 0, b = 0) : (H = +H + 1, b = 0)) : ce === "<=" && (ce = "<", v ? B = +B + 1 : H = +H + 1), ce === "<" && (y = "-0"), Z = `${ce + B}.${H}.${b}${y}`) : v ? Z = `>=${B}.0.0${y} <${+B + 1}.0.0-0` : _ && (Z = `>=${B}.${H}.0${y} <${B}.${+H + 1}.0-0`), i("xRange return", Z), Z;
    });
  }, J = (G, V) => (i("replaceStars", G, V), G.trim().replace(o[f.STAR], "")), j = (G, V) => (i("replaceGTE0", G, V), G.trim().replace(o[V.includePrerelease ? f.GTE0PRE : f.GTE0], "")), M = (G) => (V, te, Z, ce, B, H, b, y, k, v, _, N) => (E(Z) ? te = "" : E(ce) ? te = `>=${Z}.0.0${G ? "-0" : ""}` : E(B) ? te = `>=${Z}.${ce}.0${G ? "-0" : ""}` : H ? te = `>=${te}` : te = `>=${te}${G ? "-0" : ""}`, E(k) ? y = "" : E(v) ? y = `<${+k + 1}.0.0-0` : E(_) ? y = `<${k}.${+v + 1}.0-0` : N ? y = `<=${k}.${v}.${_}-${N}` : G ? y = `<${k}.${v}.${+_ + 1}-0` : y = `<=${y}`, `${te} ${y}`.trim()), ae = (G, V, te) => {
    for (let Z = 0; Z < G.length; Z++)
      if (!G[Z].test(V))
        return !1;
    if (V.prerelease.length && !te.includePrerelease) {
      for (let Z = 0; Z < G.length; Z++)
        if (i(G[Z].semver), G[Z].semver !== s.ANY && G[Z].semver.prerelease.length > 0) {
          const ce = G[Z].semver;
          if (ce.major === V.major && ce.minor === V.minor && ce.patch === V.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Oi;
}
var Ii, Yf;
function fi() {
  if (Yf) return Ii;
  Yf = 1;
  const e = Symbol("SemVer ANY");
  class r {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = t(u), l instanceof r) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), i("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? a[n.COMPARATORLOOSE] : a[n.COMPARATOR], p = l.match(u);
      if (!p)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = p[1] !== void 0 ? p[1] : "", this.operator === "=" && (this.operator = ""), p[2] ? this.semver = new c(p[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (i("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new c(l, this.options);
        } catch {
          return !1;
        }
      return s(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof r))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new o(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new o(this.value, u).test(l.semver) : (u = t(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || s(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || s(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Ii = r;
  const t = Mc, { safeRe: a, t: n } = Yn, s = rd, i = ci, c = Ir, o = ut();
  return Ii;
}
const D3 = ut(), L3 = (e, r, t) => {
  try {
    r = new D3(r, t);
  } catch {
    return !1;
  }
  return r.test(e);
};
var li = L3;
const M3 = ut(), B3 = (e, r) => new M3(e, r).set.map((t) => t.map((a) => a.value).join(" ").trim().split(" "));
var U3 = B3;
const j3 = Ir, V3 = ut(), H3 = (e, r, t) => {
  let a = null, n = null, s = null;
  try {
    s = new V3(r, t);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    s.test(i) && (!a || n.compare(i) === -1) && (a = i, n = new j3(a, t));
  }), a;
};
var G3 = H3;
const z3 = Ir, W3 = ut(), X3 = (e, r, t) => {
  let a = null, n = null, s = null;
  try {
    s = new W3(r, t);
  } catch {
    return null;
  }
  return e.forEach((i) => {
    s.test(i) && (!a || n.compare(i) === 1) && (a = i, n = new z3(a, t));
  }), a;
};
var K3 = X3;
const Pi = Ir, q3 = ut(), Jf = oi, Y3 = (e, r) => {
  e = new q3(e, r);
  let t = new Pi("0.0.0");
  if (e.test(t) || (t = new Pi("0.0.0-0"), e.test(t)))
    return t;
  t = null;
  for (let a = 0; a < e.set.length; ++a) {
    const n = e.set[a];
    let s = null;
    n.forEach((i) => {
      const c = new Pi(i.semver.version);
      switch (i.operator) {
        case ">":
          c.prerelease.length === 0 ? c.patch++ : c.prerelease.push(0), c.raw = c.format();
        case "":
        case ">=":
          (!s || Jf(c, s)) && (s = c);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${i.operator}`);
      }
    }), s && (!t || Jf(t, s)) && (t = s);
  }
  return t && e.test(t) ? t : null;
};
var J3 = Y3;
const Z3 = ut(), Q3 = (e, r) => {
  try {
    return new Z3(e, r).range || "*";
  } catch {
    return null;
  }
};
var eF = Q3;
const rF = Ir, td = fi(), { ANY: tF } = td, aF = ut(), nF = li, Zf = oi, Qf = Uc, sF = Vc, iF = jc, cF = (e, r, t, a) => {
  e = new rF(e, a), r = new aF(r, a);
  let n, s, i, c, o;
  switch (t) {
    case ">":
      n = Zf, s = sF, i = Qf, c = ">", o = ">=";
      break;
    case "<":
      n = Qf, s = iF, i = Zf, c = "<", o = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (nF(e, r, a))
    return !1;
  for (let f = 0; f < r.set.length; ++f) {
    const l = r.set[f];
    let u = null, p = null;
    if (l.forEach((h) => {
      h.semver === tF && (h = new td(">=0.0.0")), u = u || h, p = p || h, n(h.semver, u.semver, a) ? u = h : i(h.semver, p.semver, a) && (p = h);
    }), u.operator === c || u.operator === o || (!p.operator || p.operator === c) && s(e, p.semver))
      return !1;
    if (p.operator === o && i(e, p.semver))
      return !1;
  }
  return !0;
};
var Hc = cF;
const oF = Hc, fF = (e, r, t) => oF(e, r, ">", t);
var lF = fF;
const uF = Hc, hF = (e, r, t) => uF(e, r, "<", t);
var dF = hF;
const el = ut(), pF = (e, r, t) => (e = new el(e, t), r = new el(r, t), e.intersects(r, t));
var mF = pF;
const xF = li, vF = lt;
var gF = (e, r, t) => {
  const a = [];
  let n = null, s = null;
  const i = e.sort((l, u) => vF(l, u, t));
  for (const l of i)
    xF(l, r, t) ? (s = l, n || (n = l)) : (s && a.push([n, s]), s = null, n = null);
  n && a.push([n, null]);
  const c = [];
  for (const [l, u] of a)
    l === u ? c.push(l) : !u && l === i[0] ? c.push("*") : u ? l === i[0] ? c.push(`<=${u}`) : c.push(`${l} - ${u}`) : c.push(`>=${l}`);
  const o = c.join(" || "), f = typeof r.raw == "string" ? r.raw : String(r);
  return o.length < f.length ? o : r;
};
const rl = ut(), Gc = fi(), { ANY: Ni } = Gc, hn = li, zc = lt, _F = (e, r, t = {}) => {
  if (e === r)
    return !0;
  e = new rl(e, t), r = new rl(r, t);
  let a = !1;
  e: for (const n of e.set) {
    for (const s of r.set) {
      const i = yF(n, s, t);
      if (a = a || i !== null, i)
        continue e;
    }
    if (a)
      return !1;
  }
  return !0;
}, EF = [new Gc(">=0.0.0-0")], tl = [new Gc(">=0.0.0")], yF = (e, r, t) => {
  if (e === r)
    return !0;
  if (e.length === 1 && e[0].semver === Ni) {
    if (r.length === 1 && r[0].semver === Ni)
      return !0;
    t.includePrerelease ? e = EF : e = tl;
  }
  if (r.length === 1 && r[0].semver === Ni) {
    if (t.includePrerelease)
      return !0;
    r = tl;
  }
  const a = /* @__PURE__ */ new Set();
  let n, s;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? n = al(n, h, t) : h.operator === "<" || h.operator === "<=" ? s = nl(s, h, t) : a.add(h.semver);
  if (a.size > 1)
    return null;
  let i;
  if (n && s) {
    if (i = zc(n.semver, s.semver, t), i > 0)
      return null;
    if (i === 0 && (n.operator !== ">=" || s.operator !== "<="))
      return null;
  }
  for (const h of a) {
    if (n && !hn(h, String(n), t) || s && !hn(h, String(s), t))
      return null;
    for (const d of r)
      if (!hn(h, String(d), t))
        return !1;
    return !0;
  }
  let c, o, f, l, u = s && !t.includePrerelease && s.semver.prerelease.length ? s.semver : !1, p = n && !t.includePrerelease && n.semver.prerelease.length ? n.semver : !1;
  u && u.prerelease.length === 1 && s.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of r) {
    if (l = l || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", n) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === ">" || h.operator === ">=") {
        if (c = al(n, h, t), c === h && c !== n)
          return !1;
      } else if (n.operator === ">=" && !hn(n.semver, String(h), t))
        return !1;
    }
    if (s) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (o = nl(s, h, t), o === h && o !== s)
          return !1;
      } else if (s.operator === "<=" && !hn(s.semver, String(h), t))
        return !1;
    }
    if (!h.operator && (s || n) && i !== 0)
      return !1;
  }
  return !(n && f && !s && i !== 0 || s && l && !n && i !== 0 || p || u);
}, al = (e, r, t) => {
  if (!e)
    return r;
  const a = zc(e.semver, r.semver, t);
  return a > 0 ? e : a < 0 || r.operator === ">" && e.operator === ">=" ? r : e;
}, nl = (e, r, t) => {
  if (!e)
    return r;
  const a = zc(e.semver, r.semver, t);
  return a < 0 ? e : a > 0 || r.operator === "<" && e.operator === "<=" ? r : e;
};
var wF = _F;
const bi = Yn, sl = ii, TF = Ir, il = Zh, kF = rn, SF = O$, AF = N$, $F = D$, FF = M$, CF = j$, RF = G$, OF = X$, IF = Y$, PF = lt, NF = e3, bF = a3, DF = Bc, LF = c3, MF = l3, BF = oi, UF = Uc, jF = Qh, VF = ed, HF = jc, GF = Vc, zF = rd, WF = P3, XF = fi(), KF = ut(), qF = li, YF = U3, JF = G3, ZF = K3, QF = J3, eC = eF, rC = Hc, tC = lF, aC = dF, nC = mF, sC = gF, iC = wF;
var cC = {
  parse: kF,
  valid: SF,
  clean: AF,
  inc: $F,
  diff: FF,
  major: CF,
  minor: RF,
  patch: OF,
  prerelease: IF,
  compare: PF,
  rcompare: NF,
  compareLoose: bF,
  compareBuild: DF,
  sort: LF,
  rsort: MF,
  gt: BF,
  lt: UF,
  eq: jF,
  neq: VF,
  gte: HF,
  lte: GF,
  cmp: zF,
  coerce: WF,
  Comparator: XF,
  Range: KF,
  satisfies: qF,
  toComparators: YF,
  maxSatisfying: JF,
  minSatisfying: ZF,
  minVersion: QF,
  validRange: eC,
  outside: rC,
  gtr: tC,
  ltr: aC,
  intersects: nC,
  simplifyRange: sC,
  subset: iC,
  SemVer: TF,
  re: bi.re,
  src: bi.src,
  tokens: bi.t,
  SEMVER_SPEC_VERSION: sl.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: sl.RELEASE_TYPES,
  compareIdentifiers: il.compareIdentifiers,
  rcompareIdentifiers: il.rcompareIdentifiers
};
const Ia = /* @__PURE__ */ Ju(cC), oC = Object.prototype.toString, fC = "[object Uint8Array]", lC = "[object ArrayBuffer]";
function ad(e, r, t) {
  return e ? e.constructor === r ? !0 : oC.call(e) === t : !1;
}
function nd(e) {
  return ad(e, Uint8Array, fC);
}
function uC(e) {
  return ad(e, ArrayBuffer, lC);
}
function hC(e) {
  return nd(e) || uC(e);
}
function dC(e) {
  if (!nd(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function pC(e) {
  if (!hC(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function cl(e, r) {
  if (e.length === 0)
    return new Uint8Array(0);
  r ?? (r = e.reduce((n, s) => n + s.length, 0));
  const t = new Uint8Array(r);
  let a = 0;
  for (const n of e)
    dC(n), t.set(n, a), a += n.length;
  return t;
}
const vs = {
  utf8: new globalThis.TextDecoder("utf8")
};
function ol(e, r = "utf8") {
  return pC(e), vs[r] ?? (vs[r] = new globalThis.TextDecoder(r)), vs[r].decode(e);
}
function mC(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const xC = new globalThis.TextEncoder();
function Di(e) {
  return mC(e), xC.encode(e);
}
Array.from({ length: 256 }, (e, r) => r.toString(16).padStart(2, "0"));
const vC = c$.default, fl = "aes-256-cbc", Pa = () => /* @__PURE__ */ Object.create(null), gC = (e) => e != null, _C = (e, r) => {
  const t = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), a = typeof r;
  if (t.has(a))
    throw new TypeError(`Setting a value of type \`${a}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, Ts = "__internal__", Li = `${Ts}.migrations.version`;
var qt, $t, jr, Ft;
class EC {
  constructor(r = {}) {
    sn(this, "path");
    sn(this, "events");
    cn(this, qt);
    cn(this, $t);
    cn(this, jr);
    cn(this, Ft, {});
    sn(this, "_deserialize", (r) => JSON.parse(r));
    sn(this, "_serialize", (r) => JSON.stringify(r, void 0, "	"));
    const t = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...r
    };
    if (!t.cwd) {
      if (!t.projectName)
        throw new Error("Please specify the `projectName` option.");
      t.cwd = BE(t.projectName, { suffix: t.projectSuffix }).config;
    }
    if (on(this, jr, t), t.schema ?? t.ajvOptions ?? t.rootSchema) {
      if (t.schema && typeof t.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const i = new WA.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...t.ajvOptions
      });
      vC(i);
      const c = {
        ...t.rootSchema,
        type: "object",
        properties: t.schema
      };
      on(this, qt, i.compile(c));
      for (const [o, f] of Object.entries(t.schema ?? {}))
        f != null && f.default && (Me(this, Ft)[o] = f.default);
    }
    t.defaults && on(this, Ft, {
      ...Me(this, Ft),
      ...t.defaults
    }), t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize), this.events = new EventTarget(), on(this, $t, t.encryptionKey);
    const a = t.fileExtension ? `.${t.fileExtension}` : "";
    this.path = ye.resolve(t.cwd, `${t.configName ?? "config"}${a}`);
    const n = this.store, s = Object.assign(Pa(), t.defaults, n);
    if (t.migrations) {
      if (!t.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(t.migrations, t.projectVersion, t.beforeEachMigration);
    }
    this._validate(s);
    try {
      Cd.deepEqual(n, s);
    } catch {
      this.store = s;
    }
    t.watch && this._watch();
  }
  get(r, t) {
    if (Me(this, jr).accessPropertiesByDotNotation)
      return this._get(r, t);
    const { store: a } = this;
    return r in a ? a[r] : t;
  }
  set(r, t) {
    if (typeof r != "string" && typeof r != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof r}`);
    if (typeof r != "object" && t === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(r))
      throw new TypeError(`Please don't use the ${Ts} key, as it's used to manage this module internal operations.`);
    const { store: a } = this, n = (s, i) => {
      _C(s, i), Me(this, jr).accessPropertiesByDotNotation ? tf(a, s, i) : a[s] = i;
    };
    if (typeof r == "object") {
      const s = r;
      for (const [i, c] of Object.entries(s))
        n(i, c);
    } else
      n(r, t);
    this.store = a;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(r) {
    return Me(this, jr).accessPropertiesByDotNotation ? bE(this.store, r) : r in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...r) {
    for (const t of r)
      gC(Me(this, Ft)[t]) && this.set(t, Me(this, Ft)[t]);
  }
  delete(r) {
    const { store: t } = this;
    Me(this, jr).accessPropertiesByDotNotation ? NE(t, r) : delete t[r], this.store = t;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = Pa();
    for (const r of Object.keys(Me(this, Ft)))
      this.reset(r);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(r, t) {
    if (typeof r != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof r}`);
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.get(r), t);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(r) {
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.store, r);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const r = Se.readFileSync(this.path, Me(this, $t) ? null : "utf8"), t = this._encryptData(r), a = this._deserialize(t);
      return this._validate(a), Object.assign(Pa(), a);
    } catch (r) {
      if ((r == null ? void 0 : r.code) === "ENOENT")
        return this._ensureDirectory(), Pa();
      if (Me(this, jr).clearInvalidConfig && r.name === "SyntaxError")
        return Pa();
      throw r;
    }
  }
  set store(r) {
    this._ensureDirectory(), this._validate(r), this._write(r), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [r, t] of Object.entries(this.store))
      yield [r, t];
  }
  _encryptData(r) {
    if (!Me(this, $t))
      return typeof r == "string" ? r : ol(r);
    try {
      const t = r.slice(0, 16), a = fn.pbkdf2Sync(Me(this, $t), t.toString(), 1e4, 32, "sha512"), n = fn.createDecipheriv(fl, a, t), s = r.slice(17), i = typeof s == "string" ? Di(s) : s;
      return ol(cl([n.update(i), n.final()]));
    } catch {
    }
    return r.toString();
  }
  _handleChange(r, t) {
    let a = r();
    const n = () => {
      const s = a, i = r();
      Fd(i, s) || (a = i, t.call(this, i, s));
    };
    return this.events.addEventListener("change", n), () => {
      this.events.removeEventListener("change", n);
    };
  }
  _validate(r) {
    if (!Me(this, qt) || Me(this, qt).call(this, r) || !Me(this, qt).errors)
      return;
    const a = Me(this, qt).errors.map(({ instancePath: n, message: s = "" }) => `\`${n.slice(1)}\` ${s}`);
    throw new Error("Config schema violation: " + a.join("; "));
  }
  _ensureDirectory() {
    Se.mkdirSync(ye.dirname(this.path), { recursive: !0 });
  }
  _write(r) {
    let t = this._serialize(r);
    if (Me(this, $t)) {
      const a = fn.randomBytes(16), n = fn.pbkdf2Sync(Me(this, $t), a.toString(), 1e4, 32, "sha512"), s = fn.createCipheriv(fl, n, a);
      t = cl([a, Di(":"), s.update(Di(t)), s.final()]);
    }
    if (er.env.SNAP)
      Se.writeFileSync(this.path, t, { mode: Me(this, jr).configFileMode });
    else
      try {
        Yu(this.path, t, { mode: Me(this, jr).configFileMode });
      } catch (a) {
        if ((a == null ? void 0 : a.code) === "EXDEV") {
          Se.writeFileSync(this.path, t, { mode: Me(this, jr).configFileMode });
          return;
        }
        throw a;
      }
  }
  _watch() {
    this._ensureDirectory(), Se.existsSync(this.path) || this._write(Pa()), er.platform === "win32" ? Se.watch(this.path, { persistent: !1 }, Bf(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : Se.watchFile(this.path, { persistent: !1 }, Bf(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(r, t, a) {
    let n = this._get(Li, "0.0.0");
    const s = Object.keys(r).filter((c) => this._shouldPerformMigration(c, n, t));
    let i = { ...this.store };
    for (const c of s)
      try {
        a && a(this, {
          fromVersion: n,
          toVersion: c,
          finalVersion: t,
          versions: s
        });
        const o = r[c];
        o == null || o(this), this._set(Li, c), n = c, i = { ...this.store };
      } catch (o) {
        throw this.store = i, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${o}`);
      }
    (this._isVersionInRangeFormat(n) || !Ia.eq(n, t)) && this._set(Li, t);
  }
  _containsReservedKey(r) {
    return typeof r == "object" && Object.keys(r)[0] === Ts ? !0 : typeof r != "string" ? !1 : Me(this, jr).accessPropertiesByDotNotation ? !!r.startsWith(`${Ts}.`) : !1;
  }
  _isVersionInRangeFormat(r) {
    return Ia.clean(r) === null;
  }
  _shouldPerformMigration(r, t, a) {
    return this._isVersionInRangeFormat(r) ? t !== "0.0.0" && Ia.satisfies(t, r) ? !1 : Ia.satisfies(a, r) : !(Ia.lte(r, t) || Ia.gt(r, a));
  }
  _get(r, t) {
    return PE(this.store, r, t);
  }
  _set(r, t) {
    const { store: a } = this;
    tf(a, r, t), this.store = a;
  }
}
qt = new WeakMap(), $t = new WeakMap(), jr = new WeakMap(), Ft = new WeakMap();
const { app: ks, ipcMain: c0, shell: yC } = hl;
let ll = !1;
const ul = () => {
  if (!c0 || !ks)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: ks.getPath("userData"),
    appVersion: ks.getVersion()
  };
  return ll || (c0.on("electron-store-get-data", (r) => {
    r.returnValue = e;
  }), ll = !0), e;
};
class wC extends EC {
  constructor(r) {
    let t, a;
    if (er.type === "renderer") {
      const n = hl.ipcRenderer.sendSync("electron-store-get-data");
      if (!n)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: t, appVersion: a } = n);
    } else c0 && ks && ({ defaultCwd: t, appVersion: a } = ul());
    r = {
      name: "config",
      ...r
    }, r.projectVersion || (r.projectVersion = a), r.cwd ? r.cwd = ye.isAbsolute(r.cwd) ? r.cwd : ye.join(t, r.cwd) : r.cwd = t, r.configName = r.name, delete r.name, super(r);
  }
  static initRenderer() {
    ul();
  }
  async openInEditor() {
    const r = await yC.openPath(this.path);
    if (r)
      throw new Error(r);
  }
}
console.log("main.ts");
Ad(import.meta.url);
const sd = ye.dirname($d(import.meta.url));
wC.initRenderer();
process.env.APP_ROOT = ye.join(sd, "..");
const o0 = process.env.VITE_DEV_SERVER_URL, bC = ye.join(process.env.APP_ROOT, "dist-electron"), id = ye.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = o0 ? ye.join(process.env.APP_ROOT, "public") : id;
let At;
const gt = Ha.isPackaged ? ye.join(process.resourcesPath, "data") : ye.join(process.env.APP_ROOT, "data");
console.log("App is packaged:", Ha.isPackaged);
console.log("Resource path:", process.resourcesPath);
console.log("APP_ROOT:", process.env.APP_ROOT);
console.log("Data directory:", gt);
js.handle("get-data-path", () => gt);
js.handle("load-json", async (e, r) => {
  const t = ye.join(gt, r);
  try {
    Ct.existsSync(gt) || Ct.mkdirSync(gt, { recursive: !0 });
    const a = await Ct.promises.readFile(t, "utf-8");
    return JSON.parse(a);
  } catch (a) {
    return console.error(`Error loading ${r}:`, a), [];
  }
});
js.handle("check-file-exists", async (e, r) => {
  const t = ye.join(gt, r);
  return Ct.existsSync(t);
});
js.handle("load-excel", async (e, r) => {
  const t = ye.join(gt, r);
  console.log("Trying to load Excel file:", t);
  try {
    Ct.existsSync(gt) || (console.log("Creating data directory:", gt), Ct.mkdirSync(gt, { recursive: !0 }));
    try {
      await Ct.promises.access(t, Ct.constants.R_OK), console.log("File is readable");
    } catch (l) {
      throw console.error("File access error:", l), new Error(`Cannot access file: ${l.message}`);
    }
    const a = await Ct.promises.readFile(t);
    console.log("File read successfully, size:", a.length);
    const n = Xi(a, {
      type: "buffer",
      cellDates: !0,
      cellNF: !0,
      cellText: !1,
      cellStyles: !0,
      codepage: 0,
      dateNF: "yyyy-mm-dd"
    }), s = n.SheetNames[0];
    if (!s)
      return console.error(`No sheets found in ${r}`), [];
    const i = n.Sheets[s], c = OE.sheet_to_json(i, {
      raw: !1,
      // 返回格式化的字符串
      defval: "",
      // 空单元格的默认值
      header: 1,
      // 使用第一行作为标题
      blankrows: !1
      // 忽略空行
    }), o = c[0];
    return c.slice(1).map((l) => {
      const u = {};
      return o.forEach((p, h) => {
        u[p.trim()] = l[h] || "";
      }), u;
    });
  } catch (a) {
    return console.error(`Detailed error loading ${r}:`, a), [];
  }
});
function cd() {
  Sd.setApplicationMenu(null), At = new dl({
    icon: ye.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: ye.join(sd, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !1,
      webSecurity: !1
    },
    width: 1300,
    height: 900
  }), At.webContents.on("did-finish-load", () => {
    At == null || At.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), o0 ? (At.loadURL(o0), At.webContents.openDevTools()) : At.loadFile(ye.join(id, "index.html"));
}
Ha.on("window-all-closed", () => {
  process.platform !== "darwin" && (Ha.quit(), At = null);
});
Ha.on("activate", () => {
  dl.getAllWindows().length === 0 && cd();
});
Ha.whenReady().then(cd);
export {
  bC as MAIN_DIST,
  id as RENDERER_DIST,
  o0 as VITE_DEV_SERVER_URL
};
