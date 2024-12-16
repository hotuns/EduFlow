var oi = Object.defineProperty;
var As = (e) => {
  throw TypeError(e);
};
var ii = (e, t, r) => t in e ? oi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Pt = (e, t, r) => ii(e, typeof t != "symbol" ? t + "" : t, r), ks = (e, t, r) => t.has(e) || As("Cannot " + r);
var Q = (e, t, r) => (ks(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Rt = (e, t, r) => t.has(e) ? As("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), It = (e, t, r, n) => (ks(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import ci, { ipcMain as an, app as Ye, shell as li, BrowserWindow as Ga } from "electron";
import { createRequire as ui } from "node:module";
import { fileURLToPath as di } from "node:url";
import X from "node:path";
import se from "node:process";
import { promisify as ce, isDeepStrictEqual as fi } from "node:util";
import K from "node:fs";
import Nt from "node:crypto";
import hi from "node:assert";
import dr from "node:os";
const nt = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Kr = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), mi = new Set("0123456789");
function fr(e) {
  const t = [];
  let r = "", n = "start", s = !1;
  for (const a of e)
    switch (a) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        s && (r += a), n = "property", s = !s;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (s) {
          s = !1, r += a;
          break;
        }
        if (Kr.has(r))
          return [];
        t.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (s) {
          s = !1, r += a;
          break;
        }
        if (n === "property") {
          if (Kr.has(r))
            return [];
          t.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          t.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !mi.has(a))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), s && (s = !1, r += "\\"), r += a;
      }
    }
  switch (s && (r += "\\"), n) {
    case "property": {
      if (Kr.has(r))
        return [];
      t.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function _n(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function Ka(e, t) {
  if (_n(e, t))
    throw new Error("Cannot use string index");
}
function pi(e, t, r) {
  if (!nt(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = fr(t);
  if (n.length === 0)
    return r;
  for (let s = 0; s < n.length; s++) {
    const a = n[s];
    if (_n(e, a) ? e = s === n.length - 1 ? void 0 : null : e = e[a], e == null) {
      if (s !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Cs(e, t, r) {
  if (!nt(e) || typeof t != "string")
    return e;
  const n = e, s = fr(t);
  for (let a = 0; a < s.length; a++) {
    const o = s[a];
    Ka(e, o), a === s.length - 1 ? e[o] = r : nt(e[o]) || (e[o] = typeof s[a + 1] == "number" ? [] : {}), e = e[o];
  }
  return n;
}
function $i(e, t) {
  if (!nt(e) || typeof t != "string")
    return !1;
  const r = fr(t);
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (Ka(e, s), n === r.length - 1)
      return delete e[s], !0;
    if (e = e[s], !nt(e))
      return !1;
  }
}
function yi(e, t) {
  if (!nt(e) || typeof t != "string")
    return !1;
  const r = fr(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!nt(e) || !(n in e) || _n(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const We = dr.homedir(), En = dr.tmpdir(), { env: mt } = se, gi = (e) => {
  const t = X.join(We, "Library");
  return {
    data: X.join(t, "Application Support", e),
    config: X.join(t, "Preferences", e),
    cache: X.join(t, "Caches", e),
    log: X.join(t, "Logs", e),
    temp: X.join(En, e)
  };
}, vi = (e) => {
  const t = mt.APPDATA || X.join(We, "AppData", "Roaming"), r = mt.LOCALAPPDATA || X.join(We, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: X.join(r, e, "Data"),
    config: X.join(t, e, "Config"),
    cache: X.join(r, e, "Cache"),
    log: X.join(r, e, "Log"),
    temp: X.join(En, e)
  };
}, _i = (e) => {
  const t = X.basename(We);
  return {
    data: X.join(mt.XDG_DATA_HOME || X.join(We, ".local", "share"), e),
    config: X.join(mt.XDG_CONFIG_HOME || X.join(We, ".config"), e),
    cache: X.join(mt.XDG_CACHE_HOME || X.join(We, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: X.join(mt.XDG_STATE_HOME || X.join(We, ".local", "state"), e),
    temp: X.join(En, t, e)
  };
};
function Ei(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), se.platform === "darwin" ? gi(e) : se.platform === "win32" ? vi(e) : _i(e);
}
const Fe = (e, t) => function(...n) {
  return e.apply(void 0, n).catch(t);
}, ke = (e, t) => function(...n) {
  try {
    return e.apply(void 0, n);
  } catch (s) {
    return t(s);
  }
}, wi = se.getuid ? !se.getuid() : !1, Si = 1e4, ye = () => {
}, ee = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!ee.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !wi && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!ee.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!ee.isNodeError(e))
      throw e;
    if (!ee.isChangeErrorOk(e))
      throw e;
  }
};
class bi {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = Si, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (t) => {
      this.queueWaiting.add(t), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (t) => {
      this.queueWaiting.delete(t), this.queueActive.delete(t);
    }, this.schedule = () => new Promise((t) => {
      const r = () => this.remove(n), n = () => t(r);
      this.add(n);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const t of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(t), this.queueActive.add(t), t();
        }
      }
    };
  }
}
const Pi = new bi(), Ue = (e, t) => function(n) {
  return function s(...a) {
    return Pi.schedule().then((o) => {
      const l = (i) => (o(), i), c = (i) => {
        if (o(), Date.now() >= n)
          throw i;
        if (t(i)) {
          const d = Math.round(100 * Math.random());
          return new Promise((_) => setTimeout(_, d)).then(() => s.apply(void 0, a));
        }
        throw i;
      };
      return e.apply(void 0, a).then(l, c);
    });
  };
}, qe = (e, t) => function(n) {
  return function s(...a) {
    try {
      return e.apply(void 0, a);
    } catch (o) {
      if (Date.now() > n)
        throw o;
      if (t(o))
        return s.apply(void 0, a);
      throw o;
    }
  };
}, ue = {
  attempt: {
    /* ASYNC */
    chmod: Fe(ce(K.chmod), ee.onChangeError),
    chown: Fe(ce(K.chown), ee.onChangeError),
    close: Fe(ce(K.close), ye),
    fsync: Fe(ce(K.fsync), ye),
    mkdir: Fe(ce(K.mkdir), ye),
    realpath: Fe(ce(K.realpath), ye),
    stat: Fe(ce(K.stat), ye),
    unlink: Fe(ce(K.unlink), ye),
    /* SYNC */
    chmodSync: ke(K.chmodSync, ee.onChangeError),
    chownSync: ke(K.chownSync, ee.onChangeError),
    closeSync: ke(K.closeSync, ye),
    existsSync: ke(K.existsSync, ye),
    fsyncSync: ke(K.fsync, ye),
    mkdirSync: ke(K.mkdirSync, ye),
    realpathSync: ke(K.realpathSync, ye),
    statSync: ke(K.statSync, ye),
    unlinkSync: ke(K.unlinkSync, ye)
  },
  retry: {
    /* ASYNC */
    close: Ue(ce(K.close), ee.isRetriableError),
    fsync: Ue(ce(K.fsync), ee.isRetriableError),
    open: Ue(ce(K.open), ee.isRetriableError),
    readFile: Ue(ce(K.readFile), ee.isRetriableError),
    rename: Ue(ce(K.rename), ee.isRetriableError),
    stat: Ue(ce(K.stat), ee.isRetriableError),
    write: Ue(ce(K.write), ee.isRetriableError),
    writeFile: Ue(ce(K.writeFile), ee.isRetriableError),
    /* SYNC */
    closeSync: qe(K.closeSync, ee.isRetriableError),
    fsyncSync: qe(K.fsyncSync, ee.isRetriableError),
    openSync: qe(K.openSync, ee.isRetriableError),
    readFileSync: qe(K.readFileSync, ee.isRetriableError),
    renameSync: qe(K.renameSync, ee.isRetriableError),
    statSync: qe(K.statSync, ee.isRetriableError),
    writeSync: qe(K.writeSync, ee.isRetriableError),
    writeFileSync: qe(K.writeFileSync, ee.isRetriableError)
  }
}, Ri = "utf8", Ds = 438, Ii = 511, Ni = {}, Oi = dr.userInfo().uid, Ti = dr.userInfo().gid, ji = 1e3, Ai = !!se.getuid;
se.getuid && se.getuid();
const Ls = 128, ki = (e) => e instanceof Error && "code" in e, Ms = (e) => typeof e == "string", Hr = (e) => e === void 0, Ci = se.platform === "linux", Ha = se.platform === "win32", wn = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
Ha || wn.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
Ci && wn.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class Di {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (Ha && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? se.kill(se.pid, "SIGTERM") : se.kill(se.pid, t));
      }
    }, this.hook = () => {
      se.once("exit", () => this.exit());
      for (const t of wn)
        try {
          se.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const Li = new Di(), Mi = Li.register, de = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), s = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, r = !0) => {
    const n = de.truncate(t(e));
    return n in de.store ? de.get(e, t, r) : (de.store[n] = r, [n, () => delete de.store[n]]);
  },
  purge: (e) => {
    de.store[e] && (delete de.store[e], ue.attempt.unlink(e));
  },
  purgeSync: (e) => {
    de.store[e] && (delete de.store[e], ue.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in de.store)
      de.purgeSync(e);
  },
  truncate: (e) => {
    const t = X.basename(e);
    if (t.length <= Ls)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Ls;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
Mi(de.purgeSyncAll);
function Xa(e, t, r = Ni) {
  if (Ms(r))
    return Xa(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? ji) || -1);
  let s = null, a = null, o = null;
  try {
    const l = ue.attempt.realpathSync(e), c = !!l;
    e = l || e, [a, s] = de.get(e, r.tmpCreate || de.create, r.tmpPurge !== !1);
    const i = Ai && Hr(r.chown), d = Hr(r.mode);
    if (c && (i || d)) {
      const f = ue.attempt.statSync(e);
      f && (r = { ...r }, i && (r.chown = { uid: f.uid, gid: f.gid }), d && (r.mode = f.mode));
    }
    if (!c) {
      const f = X.dirname(e);
      ue.attempt.mkdirSync(f, {
        mode: Ii,
        recursive: !0
      });
    }
    o = ue.retry.openSync(n)(a, "w", r.mode || Ds), r.tmpCreated && r.tmpCreated(a), Ms(t) ? ue.retry.writeSync(n)(o, t, 0, r.encoding || Ri) : Hr(t) || ue.retry.writeSync(n)(o, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? ue.retry.fsyncSync(n)(o) : ue.attempt.fsync(o)), ue.retry.closeSync(n)(o), o = null, r.chown && (r.chown.uid !== Oi || r.chown.gid !== Ti) && ue.attempt.chownSync(a, r.chown.uid, r.chown.gid), r.mode && r.mode !== Ds && ue.attempt.chmodSync(a, r.mode);
    try {
      ue.retry.renameSync(n)(a, e);
    } catch (f) {
      if (!ki(f) || f.code !== "ENAMETOOLONG")
        throw f;
      ue.retry.renameSync(n)(a, de.truncate(e));
    }
    s(), a = null;
  } finally {
    o && ue.attempt.closeSync(o), a && de.purge(a);
  }
}
function Wa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var on = { exports: {} }, Sn = {}, we = {}, yt = {}, Ft = {}, U = {}, zt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(w) {
      if (super(), !e.IDENTIFIER.test(w))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = w;
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
  e.Name = r;
  class n extends t {
    constructor(w) {
      super(), this._items = typeof w == "string" ? [w] : w;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const w = this._items[0];
      return w === "" || w === '""';
    }
    get str() {
      var w;
      return (w = this._str) !== null && w !== void 0 ? w : this._str = this._items.reduce((R, O) => `${R}${O}`, "");
    }
    get names() {
      var w;
      return (w = this._names) !== null && w !== void 0 ? w : this._names = this._items.reduce((R, O) => (O instanceof r && (R[O.str] = (R[O.str] || 0) + 1), R), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function s(m, ...w) {
    const R = [m[0]];
    let O = 0;
    for (; O < w.length; )
      l(R, w[O]), R.push(m[++O]);
    return new n(R);
  }
  e._ = s;
  const a = new n("+");
  function o(m, ...w) {
    const R = [y(m[0])];
    let O = 0;
    for (; O < w.length; )
      R.push(a), l(R, w[O]), R.push(a, y(m[++O]));
    return c(R), new n(R);
  }
  e.str = o;
  function l(m, w) {
    w instanceof n ? m.push(...w._items) : w instanceof r ? m.push(w) : m.push(f(w));
  }
  e.addCodeArg = l;
  function c(m) {
    let w = 1;
    for (; w < m.length - 1; ) {
      if (m[w] === a) {
        const R = i(m[w - 1], m[w + 1]);
        if (R !== void 0) {
          m.splice(w - 1, 3, R);
          continue;
        }
        m[w++] = "+";
      }
      w++;
    }
  }
  function i(m, w) {
    if (w === '""')
      return m;
    if (m === '""')
      return w;
    if (typeof m == "string")
      return w instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof w != "string" ? `${m.slice(0, -1)}${w}"` : w[0] === '"' ? m.slice(0, -1) + w.slice(1) : void 0;
    if (typeof w == "string" && w[0] === '"' && !(m instanceof r))
      return `"${m}${w.slice(1)}`;
  }
  function d(m, w) {
    return w.emptyStr() ? m : m.emptyStr() ? w : o`${m}${w}`;
  }
  e.strConcat = d;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : y(Array.isArray(m) ? m.join(",") : m);
  }
  function _(m) {
    return new n(y(m));
  }
  e.stringify = _;
  function y(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = y;
  function p(m) {
    return typeof m == "string" && e.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  e.getProperty = p;
  function S(m) {
    if (typeof m == "string" && e.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  e.getEsmExportName = S;
  function v(m) {
    return new n(m.toString());
  }
  e.regexpCode = v;
})(zt);
var cn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = zt;
  class r extends Error {
    constructor(i) {
      super(`CodeGen: "code" for ${i} not defined`), this.value = i.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: i, parent: d } = {}) {
      this._names = {}, this._prefixes = i, this._parent = d;
    }
    toName(i) {
      return i instanceof t.Name ? i : this.name(i);
    }
    name(i) {
      return new t.Name(this._newName(i));
    }
    _newName(i) {
      const d = this._names[i] || this._nameGroup(i);
      return `${i}${d.index++}`;
    }
    _nameGroup(i) {
      var d, f;
      if (!((f = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || f === void 0) && f.has(i) || this._prefixes && !this._prefixes.has(i))
        throw new Error(`CodeGen: prefix "${i}" is not allowed in this scope`);
      return this._names[i] = { prefix: i, index: 0 };
    }
  }
  e.Scope = s;
  class a extends t.Name {
    constructor(i, d) {
      super(d), this.prefix = i;
    }
    setValue(i, { property: d, itemIndex: f }) {
      this.value = i, this.scopePath = (0, t._)`.${new t.Name(d)}[${f}]`;
    }
  }
  e.ValueScopeName = a;
  const o = (0, t._)`\n`;
  class l extends s {
    constructor(i) {
      super(i), this._values = {}, this._scope = i.scope, this.opts = { ...i, _n: i.lines ? o : t.nil };
    }
    get() {
      return this._scope;
    }
    name(i) {
      return new a(i, this._newName(i));
    }
    value(i, d) {
      var f;
      if (d.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const _ = this.toName(i), { prefix: y } = _, p = (f = d.key) !== null && f !== void 0 ? f : d.ref;
      let S = this._values[y];
      if (S) {
        const w = S.get(p);
        if (w)
          return w;
      } else
        S = this._values[y] = /* @__PURE__ */ new Map();
      S.set(p, _);
      const v = this._scope[y] || (this._scope[y] = []), m = v.length;
      return v[m] = d.ref, _.setValue(d, { property: y, itemIndex: m }), _;
    }
    getValue(i, d) {
      const f = this._values[i];
      if (f)
        return f.get(d);
    }
    scopeRefs(i, d = this._values) {
      return this._reduceValues(d, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, t._)`${i}${f.scopePath}`;
      });
    }
    scopeCode(i = this._values, d, f) {
      return this._reduceValues(i, (_) => {
        if (_.value === void 0)
          throw new Error(`CodeGen: name "${_}" has no value`);
        return _.value.code;
      }, d, f);
    }
    _reduceValues(i, d, f = {}, _) {
      let y = t.nil;
      for (const p in i) {
        const S = i[p];
        if (!S)
          continue;
        const v = f[p] = f[p] || /* @__PURE__ */ new Map();
        S.forEach((m) => {
          if (v.has(m))
            return;
          v.set(m, n.Started);
          let w = d(m);
          if (w) {
            const R = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            y = (0, t._)`${y}${R} ${m} = ${w};${this.opts._n}`;
          } else if (w = _ == null ? void 0 : _(m))
            y = (0, t._)`${y}${w}${this.opts._n}`;
          else
            throw new r(m);
          v.set(m, n.Completed);
        });
      }
      return y;
    }
  }
  e.ValueScope = l;
})(cn);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = zt, r = cn;
  var n = zt;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = cn;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(u, h) {
      return this;
    }
  }
  class o extends a {
    constructor(u, h, b) {
      super(), this.varKind = u, this.name = h, this.rhs = b;
    }
    render({ es5: u, _n: h }) {
      const b = u ? r.varKinds.var : this.varKind, L = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${L};` + h;
    }
    optimizeNames(u, h) {
      if (u[this.name.str])
        return this.rhs && (this.rhs = I(this.rhs, u, h)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends a {
    constructor(u, h, b) {
      super(), this.lhs = u, this.rhs = h, this.sideEffects = b;
    }
    render({ _n: u }) {
      return `${this.lhs} = ${this.rhs};` + u;
    }
    optimizeNames(u, h) {
      if (!(this.lhs instanceof t.Name && !u[this.lhs.str] && !this.sideEffects))
        return this.rhs = I(this.rhs, u, h), this;
    }
    get names() {
      const u = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return x(u, this.rhs);
    }
  }
  class c extends l {
    constructor(u, h, b, L) {
      super(u, b, L), this.op = h;
    }
    render({ _n: u }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + u;
    }
  }
  class i extends a {
    constructor(u) {
      super(), this.label = u, this.names = {};
    }
    render({ _n: u }) {
      return `${this.label}:` + u;
    }
  }
  class d extends a {
    constructor(u) {
      super(), this.label = u, this.names = {};
    }
    render({ _n: u }) {
      return `break${this.label ? ` ${this.label}` : ""};` + u;
    }
  }
  class f extends a {
    constructor(u) {
      super(), this.error = u;
    }
    render({ _n: u }) {
      return `throw ${this.error};` + u;
    }
    get names() {
      return this.error.names;
    }
  }
  class _ extends a {
    constructor(u) {
      super(), this.code = u;
    }
    render({ _n: u }) {
      return `${this.code};` + u;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(u, h) {
      return this.code = I(this.code, u, h), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class y extends a {
    constructor(u = []) {
      super(), this.nodes = u;
    }
    render(u) {
      return this.nodes.reduce((h, b) => h + b.render(u), "");
    }
    optimizeNodes() {
      const { nodes: u } = this;
      let h = u.length;
      for (; h--; ) {
        const b = u[h].optimizeNodes();
        Array.isArray(b) ? u.splice(h, 1, ...b) : b ? u[h] = b : u.splice(h, 1);
      }
      return u.length > 0 ? this : void 0;
    }
    optimizeNames(u, h) {
      const { nodes: b } = this;
      let L = b.length;
      for (; L--; ) {
        const M = b[L];
        M.optimizeNames(u, h) || (N(u, M.names), b.splice(L, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((u, h) => q(u, h.names), {});
    }
  }
  class p extends y {
    render(u) {
      return "{" + u._n + super.render(u) + "}" + u._n;
    }
  }
  class S extends y {
  }
  class v extends p {
  }
  v.kind = "else";
  class m extends p {
    constructor(u, h) {
      super(h), this.condition = u;
    }
    render(u) {
      let h = `if(${this.condition})` + super.render(u);
      return this.else && (h += "else " + this.else.render(u)), h;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const u = this.condition;
      if (u === !0)
        return this.nodes;
      let h = this.else;
      if (h) {
        const b = h.optimizeNodes();
        h = this.else = Array.isArray(b) ? new v(b) : b;
      }
      if (h)
        return u === !1 ? h instanceof m ? h : h.nodes : this.nodes.length ? this : new m(C(u), h instanceof m ? [h] : h.nodes);
      if (!(u === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(u, h) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(u, h), !!(super.optimizeNames(u, h) || this.else))
        return this.condition = I(this.condition, u, h), this;
    }
    get names() {
      const u = super.names;
      return x(u, this.condition), this.else && q(u, this.else.names), u;
    }
  }
  m.kind = "if";
  class w extends p {
  }
  w.kind = "for";
  class R extends w {
    constructor(u) {
      super(), this.iteration = u;
    }
    render(u) {
      return `for(${this.iteration})` + super.render(u);
    }
    optimizeNames(u, h) {
      if (super.optimizeNames(u, h))
        return this.iteration = I(this.iteration, u, h), this;
    }
    get names() {
      return q(super.names, this.iteration.names);
    }
  }
  class O extends w {
    constructor(u, h, b, L) {
      super(), this.varKind = u, this.name = h, this.from = b, this.to = L;
    }
    render(u) {
      const h = u.es5 ? r.varKinds.var : this.varKind, { name: b, from: L, to: M } = this;
      return `for(${h} ${b}=${L}; ${b}<${M}; ${b}++)` + super.render(u);
    }
    get names() {
      const u = x(super.names, this.from);
      return x(u, this.to);
    }
  }
  class j extends w {
    constructor(u, h, b, L) {
      super(), this.loop = u, this.varKind = h, this.name = b, this.iterable = L;
    }
    render(u) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(u);
    }
    optimizeNames(u, h) {
      if (super.optimizeNames(u, h))
        return this.iterable = I(this.iterable, u, h), this;
    }
    get names() {
      return q(super.names, this.iterable.names);
    }
  }
  class B extends p {
    constructor(u, h, b) {
      super(), this.name = u, this.args = h, this.async = b;
    }
    render(u) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(u);
    }
  }
  B.kind = "func";
  class te extends y {
    render(u) {
      return "return " + super.render(u);
    }
  }
  te.kind = "return";
  class pe extends p {
    render(u) {
      let h = "try" + super.render(u);
      return this.catch && (h += this.catch.render(u)), this.finally && (h += this.finally.render(u)), h;
    }
    optimizeNodes() {
      var u, h;
      return super.optimizeNodes(), (u = this.catch) === null || u === void 0 || u.optimizeNodes(), (h = this.finally) === null || h === void 0 || h.optimizeNodes(), this;
    }
    optimizeNames(u, h) {
      var b, L;
      return super.optimizeNames(u, h), (b = this.catch) === null || b === void 0 || b.optimizeNames(u, h), (L = this.finally) === null || L === void 0 || L.optimizeNames(u, h), this;
    }
    get names() {
      const u = super.names;
      return this.catch && q(u, this.catch.names), this.finally && q(u, this.finally.names), u;
    }
  }
  class _e extends p {
    constructor(u) {
      super(), this.error = u;
    }
    render(u) {
      return `catch(${this.error})` + super.render(u);
    }
  }
  _e.kind = "catch";
  class Se extends p {
    render(u) {
      return "finally" + super.render(u);
    }
  }
  Se.kind = "finally";
  class z {
    constructor(u, h = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...h, _n: h.lines ? `
` : "" }, this._extScope = u, this._scope = new r.Scope({ parent: u }), this._nodes = [new S()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(u) {
      return this._scope.name(u);
    }
    // reserves unique name in the external scope
    scopeName(u) {
      return this._extScope.name(u);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(u, h) {
      const b = this._extScope.value(u, h);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(u, h) {
      return this._extScope.getValue(u, h);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(u) {
      return this._extScope.scopeRefs(u, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(u, h, b, L) {
      const M = this._scope.toName(h);
      return b !== void 0 && L && (this._constants[M.str] = b), this._leafNode(new o(u, M, b)), M;
    }
    // `const` declaration (`var` in es5 mode)
    const(u, h, b) {
      return this._def(r.varKinds.const, u, h, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(u, h, b) {
      return this._def(r.varKinds.let, u, h, b);
    }
    // `var` declaration with optional assignment
    var(u, h, b) {
      return this._def(r.varKinds.var, u, h, b);
    }
    // assignment code
    assign(u, h, b) {
      return this._leafNode(new l(u, h, b));
    }
    // `+=` code
    add(u, h) {
      return this._leafNode(new c(u, e.operators.ADD, h));
    }
    // appends passed SafeExpr to code or executes Block
    code(u) {
      return typeof u == "function" ? u() : u !== t.nil && this._leafNode(new _(u)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...u) {
      const h = ["{"];
      for (const [b, L] of u)
        h.length > 1 && h.push(","), h.push(b), (b !== L || this.opts.es5) && (h.push(":"), (0, t.addCodeArg)(h, L));
      return h.push("}"), new t._Code(h);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(u, h, b) {
      if (this._blockNode(new m(u)), h && b)
        this.code(h).else().code(b).endIf();
      else if (h)
        this.code(h).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(u) {
      return this._elseNode(new m(u));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new v());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, v);
    }
    _for(u, h) {
      return this._blockNode(u), h && this.code(h).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(u, h) {
      return this._for(new R(u), h);
    }
    // `for` statement for a range of values
    forRange(u, h, b, L, M = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const J = this._scope.toName(u);
      return this._for(new O(M, J, h, b), () => L(J));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(u, h, b, L = r.varKinds.const) {
      const M = this._scope.toName(u);
      if (this.opts.es5) {
        const J = h instanceof t.Name ? h : this.var("_arr", h);
        return this.forRange("_i", 0, (0, t._)`${J}.length`, (W) => {
          this.var(M, (0, t._)`${J}[${W}]`), b(M);
        });
      }
      return this._for(new j("of", L, M, h), () => b(M));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(u, h, b, L = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(u, (0, t._)`Object.keys(${h})`, b);
      const M = this._scope.toName(u);
      return this._for(new j("in", L, M, h), () => b(M));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(w);
    }
    // `label` statement
    label(u) {
      return this._leafNode(new i(u));
    }
    // `break` statement
    break(u) {
      return this._leafNode(new d(u));
    }
    // `return` statement
    return(u) {
      const h = new te();
      if (this._blockNode(h), this.code(u), h.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(te);
    }
    // `try` statement
    try(u, h, b) {
      if (!h && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const L = new pe();
      if (this._blockNode(L), this.code(u), h) {
        const M = this.name("e");
        this._currNode = L.catch = new _e(M), h(M);
      }
      return b && (this._currNode = L.finally = new Se(), this.code(b)), this._endBlockNode(_e, Se);
    }
    // `throw` statement
    throw(u) {
      return this._leafNode(new f(u));
    }
    // start self-balancing block
    block(u, h) {
      return this._blockStarts.push(this._nodes.length), u && this.code(u).endBlock(h), this;
    }
    // end the current self-balancing block
    endBlock(u) {
      const h = this._blockStarts.pop();
      if (h === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - h;
      if (b < 0 || u !== void 0 && b !== u)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${u} expected`);
      return this._nodes.length = h, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(u, h = t.nil, b, L) {
      return this._blockNode(new B(u, h, b)), L && this.code(L).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(B);
    }
    optimize(u = 1) {
      for (; u-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(u) {
      return this._currNode.nodes.push(u), this;
    }
    _blockNode(u) {
      this._currNode.nodes.push(u), this._nodes.push(u);
    }
    _endBlockNode(u, h) {
      const b = this._currNode;
      if (b instanceof u || h && b instanceof h)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${h ? `${u.kind}/${h.kind}` : u.kind}"`);
    }
    _elseNode(u) {
      const h = this._currNode;
      if (!(h instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = h.else = u, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const u = this._nodes;
      return u[u.length - 1];
    }
    set _currNode(u) {
      const h = this._nodes;
      h[h.length - 1] = u;
    }
  }
  e.CodeGen = z;
  function q(g, u) {
    for (const h in u)
      g[h] = (g[h] || 0) + (u[h] || 0);
    return g;
  }
  function x(g, u) {
    return u instanceof t._CodeOrName ? q(g, u.names) : g;
  }
  function I(g, u, h) {
    if (g instanceof t.Name)
      return b(g);
    if (!L(g))
      return g;
    return new t._Code(g._items.reduce((M, J) => (J instanceof t.Name && (J = b(J)), J instanceof t._Code ? M.push(...J._items) : M.push(J), M), []));
    function b(M) {
      const J = h[M.str];
      return J === void 0 || u[M.str] !== 1 ? M : (delete u[M.str], J);
    }
    function L(M) {
      return M instanceof t._Code && M._items.some((J) => J instanceof t.Name && u[J.str] === 1 && h[J.str] !== void 0);
    }
  }
  function N(g, u) {
    for (const h in u)
      g[h] = (g[h] || 0) - (u[h] || 0);
  }
  function C(g) {
    return typeof g == "boolean" || typeof g == "number" || g === null ? !g : (0, t._)`!${E(g)}`;
  }
  e.not = C;
  const A = $(e.operators.AND);
  function V(...g) {
    return g.reduce(A);
  }
  e.and = V;
  const k = $(e.operators.OR);
  function P(...g) {
    return g.reduce(k);
  }
  e.or = P;
  function $(g) {
    return (u, h) => u === t.nil ? h : h === t.nil ? u : (0, t._)`${E(u)} ${g} ${E(h)}`;
  }
  function E(g) {
    return g instanceof t.Name ? g : (0, t._)`(${g})`;
  }
})(U);
var T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
T.checkStrictMode = T.getErrorPath = T.Type = T.useFunc = T.setEvaluated = T.evaluatedPropsToName = T.mergeEvaluated = T.eachItem = T.unescapeJsonPointer = T.escapeJsonPointer = T.escapeFragment = T.unescapeFragment = T.schemaRefOrVal = T.schemaHasRulesButRef = T.schemaHasRules = T.checkUnknownRules = T.alwaysValidSchema = T.toHash = void 0;
const Y = U, Vi = zt;
function zi(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
T.toHash = zi;
function Fi(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Ba(e, t), !Ja(t, e.self.RULES.all));
}
T.alwaysValidSchema = Fi;
function Ba(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in t)
    s[a] || Za(e, `unknown keyword: "${a}"`);
}
T.checkUnknownRules = Ba;
function Ja(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
T.schemaHasRules = Ja;
function Ui(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
T.schemaHasRulesButRef = Ui;
function qi({ topSchemaRef: e, schemaPath: t }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, Y._)`${r}`;
  }
  return (0, Y._)`${e}${t}${(0, Y.getProperty)(n)}`;
}
T.schemaRefOrVal = qi;
function Gi(e) {
  return Ya(decodeURIComponent(e));
}
T.unescapeFragment = Gi;
function Ki(e) {
  return encodeURIComponent(bn(e));
}
T.escapeFragment = Ki;
function bn(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
T.escapeJsonPointer = bn;
function Ya(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
T.unescapeJsonPointer = Ya;
function Hi(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
T.eachItem = Hi;
function Vs({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (s, a, o, l) => {
    const c = o === void 0 ? a : o instanceof Y.Name ? (a instanceof Y.Name ? e(s, a, o) : t(s, a, o), o) : a instanceof Y.Name ? (t(s, o, a), a) : r(a, o);
    return l === Y.Name && !(c instanceof Y.Name) ? n(s, c) : c;
  };
}
T.mergeEvaluated = {
  props: Vs({
    mergeNames: (e, t, r) => e.if((0, Y._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, Y._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, Y._)`${r} || {}`).code((0, Y._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, Y._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, Y._)`${r} || {}`), Pn(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: xa
  }),
  items: Vs({
    mergeNames: (e, t, r) => e.if((0, Y._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, Y._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, Y._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, Y._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function xa(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, Y._)`{}`);
  return t !== void 0 && Pn(e, r, t), r;
}
T.evaluatedPropsToName = xa;
function Pn(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, Y._)`${t}${(0, Y.getProperty)(n)}`, !0));
}
T.setEvaluated = Pn;
const zs = {};
function Xi(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: zs[t.code] || (zs[t.code] = new Vi._Code(t.code))
  });
}
T.useFunc = Xi;
var ln;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(ln || (T.Type = ln = {}));
function Wi(e, t, r) {
  if (e instanceof Y.Name) {
    const n = t === ln.Num;
    return r ? n ? (0, Y._)`"[" + ${e} + "]"` : (0, Y._)`"['" + ${e} + "']"` : n ? (0, Y._)`"/" + ${e}` : (0, Y._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, Y.getProperty)(e).toString() : "/" + bn(e);
}
T.getErrorPath = Wi;
function Za(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
T.checkStrictMode = Za;
var ve = {};
Object.defineProperty(ve, "__esModule", { value: !0 });
const le = U, Bi = {
  // validation function arguments
  data: new le.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new le.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new le.Name("instancePath"),
  parentData: new le.Name("parentData"),
  parentDataProperty: new le.Name("parentDataProperty"),
  rootData: new le.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new le.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new le.Name("vErrors"),
  // null or array of validation errors
  errors: new le.Name("errors"),
  // counter of validation errors
  this: new le.Name("this"),
  // "globals"
  self: new le.Name("self"),
  scope: new le.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new le.Name("json"),
  jsonPos: new le.Name("jsonPos"),
  jsonLen: new le.Name("jsonLen"),
  jsonPart: new le.Name("jsonPart")
};
ve.default = Bi;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = U, r = T, n = ve;
  e.keywordError = {
    message: ({ keyword: v }) => (0, t.str)`must pass "${v}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: v, schemaType: m }) => m ? (0, t.str)`"${v}" keyword must be ${m} ($data)` : (0, t.str)`"${v}" keyword is invalid ($data)`
  };
  function s(v, m = e.keywordError, w, R) {
    const { it: O } = v, { gen: j, compositeRule: B, allErrors: te } = O, pe = f(v, m, w);
    R ?? (B || te) ? c(j, pe) : i(O, (0, t._)`[${pe}]`);
  }
  e.reportError = s;
  function a(v, m = e.keywordError, w) {
    const { it: R } = v, { gen: O, compositeRule: j, allErrors: B } = R, te = f(v, m, w);
    c(O, te), j || B || i(R, n.default.vErrors);
  }
  e.reportExtraError = a;
  function o(v, m) {
    v.assign(n.default.errors, m), v.if((0, t._)`${n.default.vErrors} !== null`, () => v.if(m, () => v.assign((0, t._)`${n.default.vErrors}.length`, m), () => v.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = o;
  function l({ gen: v, keyword: m, schemaValue: w, data: R, errsCount: O, it: j }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const B = v.name("err");
    v.forRange("i", O, n.default.errors, (te) => {
      v.const(B, (0, t._)`${n.default.vErrors}[${te}]`), v.if((0, t._)`${B}.instancePath === undefined`, () => v.assign((0, t._)`${B}.instancePath`, (0, t.strConcat)(n.default.instancePath, j.errorPath))), v.assign((0, t._)`${B}.schemaPath`, (0, t.str)`${j.errSchemaPath}/${m}`), j.opts.verbose && (v.assign((0, t._)`${B}.schema`, w), v.assign((0, t._)`${B}.data`, R));
    });
  }
  e.extendErrors = l;
  function c(v, m) {
    const w = v.const("err", m);
    v.if((0, t._)`${n.default.vErrors} === null`, () => v.assign(n.default.vErrors, (0, t._)`[${w}]`), (0, t._)`${n.default.vErrors}.push(${w})`), v.code((0, t._)`${n.default.errors}++`);
  }
  function i(v, m) {
    const { gen: w, validateName: R, schemaEnv: O } = v;
    O.$async ? w.throw((0, t._)`new ${v.ValidationError}(${m})`) : (w.assign((0, t._)`${R}.errors`, m), w.return(!1));
  }
  const d = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function f(v, m, w) {
    const { createErrors: R } = v.it;
    return R === !1 ? (0, t._)`{}` : _(v, m, w);
  }
  function _(v, m, w = {}) {
    const { gen: R, it: O } = v, j = [
      y(O, w),
      p(v, w)
    ];
    return S(v, m, j), R.object(...j);
  }
  function y({ errorPath: v }, { instancePath: m }) {
    const w = m ? (0, t.str)`${v}${(0, r.getErrorPath)(m, r.Type.Str)}` : v;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, w)];
  }
  function p({ keyword: v, it: { errSchemaPath: m } }, { schemaPath: w, parentSchema: R }) {
    let O = R ? m : (0, t.str)`${m}/${v}`;
    return w && (O = (0, t.str)`${O}${(0, r.getErrorPath)(w, r.Type.Str)}`), [d.schemaPath, O];
  }
  function S(v, { params: m, message: w }, R) {
    const { keyword: O, data: j, schemaValue: B, it: te } = v, { opts: pe, propertyName: _e, topSchemaRef: Se, schemaPath: z } = te;
    R.push([d.keyword, O], [d.params, typeof m == "function" ? m(v) : m || (0, t._)`{}`]), pe.messages && R.push([d.message, typeof w == "function" ? w(v) : w]), pe.verbose && R.push([d.schema, B], [d.parentSchema, (0, t._)`${Se}${z}`], [n.default.data, j]), _e && R.push([d.propertyName, _e]);
  }
})(Ft);
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.boolOrEmptySchema = yt.topBoolOrEmptySchema = void 0;
const Ji = Ft, Yi = U, xi = ve, Zi = {
  message: "boolean schema is false"
};
function Qi(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Qa(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(xi.default.data) : (t.assign((0, Yi._)`${n}.errors`, null), t.return(!0));
}
yt.topBoolOrEmptySchema = Qi;
function ec(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Qa(e)) : r.var(t, !0);
}
yt.boolOrEmptySchema = ec;
function Qa(e, t) {
  const { gen: r, data: n } = e, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, Ji.reportError)(s, Zi, void 0, t);
}
var ne = {}, st = {};
Object.defineProperty(st, "__esModule", { value: !0 });
st.getRules = st.isJSONType = void 0;
const tc = ["string", "number", "integer", "boolean", "null", "object", "array"], rc = new Set(tc);
function nc(e) {
  return typeof e == "string" && rc.has(e);
}
st.isJSONType = nc;
function sc() {
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
st.getRules = sc;
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.shouldUseRule = Le.shouldUseGroup = Le.schemaHasRulesForType = void 0;
function ac({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && eo(e, n);
}
Le.schemaHasRulesForType = ac;
function eo(e, t) {
  return t.rules.some((r) => to(e, r));
}
Le.shouldUseGroup = eo;
function to(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Le.shouldUseRule = to;
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.reportTypeError = ne.checkDataTypes = ne.checkDataType = ne.coerceAndCheckDataType = ne.getJSONTypes = ne.getSchemaTypes = ne.DataType = void 0;
const oc = st, ic = Le, cc = Ft, G = U, ro = T;
var pt;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(pt || (ne.DataType = pt = {}));
function lc(e) {
  const t = no(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
ne.getSchemaTypes = lc;
function no(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(oc.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
ne.getJSONTypes = no;
function uc(e, t) {
  const { gen: r, data: n, opts: s } = e, a = dc(t, s.coerceTypes), o = t.length > 0 && !(a.length === 0 && t.length === 1 && (0, ic.schemaHasRulesForType)(e, t[0]));
  if (o) {
    const l = Rn(t, n, s.strictNumbers, pt.Wrong);
    r.if(l, () => {
      a.length ? fc(e, t, a) : In(e);
    });
  }
  return o;
}
ne.coerceAndCheckDataType = uc;
const so = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function dc(e, t) {
  return t ? e.filter((r) => so.has(r) || t === "array" && r === "array") : [];
}
function fc(e, t, r) {
  const { gen: n, data: s, opts: a } = e, o = n.let("dataType", (0, G._)`typeof ${s}`), l = n.let("coerced", (0, G._)`undefined`);
  a.coerceTypes === "array" && n.if((0, G._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, G._)`${s}[0]`).assign(o, (0, G._)`typeof ${s}`).if(Rn(t, s, a.strictNumbers), () => n.assign(l, s))), n.if((0, G._)`${l} !== undefined`);
  for (const i of r)
    (so.has(i) || i === "array" && a.coerceTypes === "array") && c(i);
  n.else(), In(e), n.endIf(), n.if((0, G._)`${l} !== undefined`, () => {
    n.assign(s, l), hc(e, l);
  });
  function c(i) {
    switch (i) {
      case "string":
        n.elseIf((0, G._)`${o} == "number" || ${o} == "boolean"`).assign(l, (0, G._)`"" + ${s}`).elseIf((0, G._)`${s} === null`).assign(l, (0, G._)`""`);
        return;
      case "number":
        n.elseIf((0, G._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, G._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, G._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, G._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, G._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, G._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        n.elseIf((0, G._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(l, null);
        return;
      case "array":
        n.elseIf((0, G._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(l, (0, G._)`[${s}]`);
    }
  }
}
function hc({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, G._)`${t} !== undefined`, () => e.assign((0, G._)`${t}[${r}]`, n));
}
function un(e, t, r, n = pt.Correct) {
  const s = n === pt.Correct ? G.operators.EQ : G.operators.NEQ;
  let a;
  switch (e) {
    case "null":
      return (0, G._)`${t} ${s} null`;
    case "array":
      a = (0, G._)`Array.isArray(${t})`;
      break;
    case "object":
      a = (0, G._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      a = o((0, G._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, G._)`typeof ${t} ${s} ${e}`;
  }
  return n === pt.Correct ? a : (0, G.not)(a);
  function o(l = G.nil) {
    return (0, G.and)((0, G._)`typeof ${t} == "number"`, l, r ? (0, G._)`isFinite(${t})` : G.nil);
  }
}
ne.checkDataType = un;
function Rn(e, t, r, n) {
  if (e.length === 1)
    return un(e[0], t, r, n);
  let s;
  const a = (0, ro.toHash)(e);
  if (a.array && a.object) {
    const o = (0, G._)`typeof ${t} != "object"`;
    s = a.null ? o : (0, G._)`!${t} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = G.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, G.and)(s, un(o, t, r, n));
  return s;
}
ne.checkDataTypes = Rn;
const mc = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, G._)`{type: ${e}}` : (0, G._)`{type: ${t}}`
};
function In(e) {
  const t = pc(e);
  (0, cc.reportError)(t, mc);
}
ne.reportTypeError = In;
function pc(e) {
  const { gen: t, data: r, schema: n } = e, s = (0, ro.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: e
  };
}
var hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.assignDefaults = void 0;
const ct = U, $c = T;
function yc(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const s in r)
      Fs(e, s, r[s].default);
  else t === "array" && Array.isArray(n) && n.forEach((s, a) => Fs(e, a, s.default));
}
hr.assignDefaults = yc;
function Fs(e, t, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = e;
  if (r === void 0)
    return;
  const l = (0, ct._)`${a}${(0, ct.getProperty)(t)}`;
  if (s) {
    (0, $c.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, ct._)`${l} === undefined`;
  o.useDefaults === "empty" && (c = (0, ct._)`${c} || ${l} === null || ${l} === ""`), n.if(c, (0, ct._)`${l} = ${(0, ct.stringify)(r)}`);
}
var je = {}, H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.validateUnion = H.validateArray = H.usePattern = H.callValidateCode = H.schemaProperties = H.allSchemaProperties = H.noPropertyInData = H.propertyInData = H.isOwnProperty = H.hasPropFunc = H.reportMissingProp = H.checkMissingProp = H.checkReportMissingProp = void 0;
const Z = U, Nn = T, Ge = ve, gc = T;
function vc(e, t) {
  const { gen: r, data: n, it: s } = e;
  r.if(Tn(r, n, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, Z._)`${t}` }, !0), e.error();
  });
}
H.checkReportMissingProp = vc;
function _c({ gen: e, data: t, it: { opts: r } }, n, s) {
  return (0, Z.or)(...n.map((a) => (0, Z.and)(Tn(e, t, a, r.ownProperties), (0, Z._)`${s} = ${a}`)));
}
H.checkMissingProp = _c;
function Ec(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
H.reportMissingProp = Ec;
function ao(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, Z._)`Object.prototype.hasOwnProperty`
  });
}
H.hasPropFunc = ao;
function On(e, t, r) {
  return (0, Z._)`${ao(e)}.call(${t}, ${r})`;
}
H.isOwnProperty = On;
function wc(e, t, r, n) {
  const s = (0, Z._)`${t}${(0, Z.getProperty)(r)} !== undefined`;
  return n ? (0, Z._)`${s} && ${On(e, t, r)}` : s;
}
H.propertyInData = wc;
function Tn(e, t, r, n) {
  const s = (0, Z._)`${t}${(0, Z.getProperty)(r)} === undefined`;
  return n ? (0, Z.or)(s, (0, Z.not)(On(e, t, r))) : s;
}
H.noPropertyInData = Tn;
function oo(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
H.allSchemaProperties = oo;
function Sc(e, t) {
  return oo(t).filter((r) => !(0, Nn.alwaysValidSchema)(e, t[r]));
}
H.schemaProperties = Sc;
function bc({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, l, c, i) {
  const d = i ? (0, Z._)`${e}, ${t}, ${n}${s}` : t, f = [
    [Ge.default.instancePath, (0, Z.strConcat)(Ge.default.instancePath, a)],
    [Ge.default.parentData, o.parentData],
    [Ge.default.parentDataProperty, o.parentDataProperty],
    [Ge.default.rootData, Ge.default.rootData]
  ];
  o.opts.dynamicRef && f.push([Ge.default.dynamicAnchors, Ge.default.dynamicAnchors]);
  const _ = (0, Z._)`${d}, ${r.object(...f)}`;
  return c !== Z.nil ? (0, Z._)`${l}.call(${c}, ${_})` : (0, Z._)`${l}(${_})`;
}
H.callValidateCode = bc;
const Pc = (0, Z._)`new RegExp`;
function Rc({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, a = s(r, n);
  return e.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, Z._)`${s.code === "new RegExp" ? Pc : (0, gc.useFunc)(e, s)}(${r}, ${n})`
  });
}
H.usePattern = Rc;
function Ic(e) {
  const { gen: t, data: r, keyword: n, it: s } = e, a = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return o(() => t.assign(l, !1)), l;
  }
  return t.var(a, !0), o(() => t.break()), a;
  function o(l) {
    const c = t.const("len", (0, Z._)`${r}.length`);
    t.forRange("i", 0, c, (i) => {
      e.subschema({
        keyword: n,
        dataProp: i,
        dataPropType: Nn.Type.Num
      }, a), t.if((0, Z.not)(a), l);
    });
  }
}
H.validateArray = Ic;
function Nc(e) {
  const { gen: t, schema: r, keyword: n, it: s } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, Nn.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = t.let("valid", !1), l = t.name("_valid");
  t.block(() => r.forEach((c, i) => {
    const d = e.subschema({
      keyword: n,
      schemaProp: i,
      compositeRule: !0
    }, l);
    t.assign(o, (0, Z._)`${o} || ${l}`), e.mergeValidEvaluated(d, l) || t.if((0, Z.not)(o));
  })), e.result(o, () => e.reset(), () => e.error(!0));
}
H.validateUnion = Nc;
Object.defineProperty(je, "__esModule", { value: !0 });
je.validateKeywordUsage = je.validSchemaType = je.funcKeywordCode = je.macroKeywordCode = void 0;
const fe = U, Qe = ve, Oc = H, Tc = Ft;
function jc(e, t) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = e, l = t.macro.call(o.self, s, a, o), c = io(r, n, l);
  o.opts.validateSchema !== !1 && o.self.validateSchema(l, !0);
  const i = r.name("valid");
  e.subschema({
    schema: l,
    schemaPath: fe.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, i), e.pass(i, () => e.error(!0));
}
je.macroKeywordCode = jc;
function Ac(e, t) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: l, it: c } = e;
  Cc(c, t);
  const i = !l && t.compile ? t.compile.call(c.self, a, o, c) : t.validate, d = io(n, s, i), f = n.let("valid");
  e.block$data(f, _), e.ok((r = t.valid) !== null && r !== void 0 ? r : f);
  function _() {
    if (t.errors === !1)
      S(), t.modifying && Us(e), v(() => e.error());
    else {
      const m = t.async ? y() : p();
      t.modifying && Us(e), v(() => kc(e, m));
    }
  }
  function y() {
    const m = n.let("ruleErrs", null);
    return n.try(() => S((0, fe._)`await `), (w) => n.assign(f, !1).if((0, fe._)`${w} instanceof ${c.ValidationError}`, () => n.assign(m, (0, fe._)`${w}.errors`), () => n.throw(w))), m;
  }
  function p() {
    const m = (0, fe._)`${d}.errors`;
    return n.assign(m, null), S(fe.nil), m;
  }
  function S(m = t.async ? (0, fe._)`await ` : fe.nil) {
    const w = c.opts.passContext ? Qe.default.this : Qe.default.self, R = !("compile" in t && !l || t.schema === !1);
    n.assign(f, (0, fe._)`${m}${(0, Oc.callValidateCode)(e, d, w, R)}`, t.modifying);
  }
  function v(m) {
    var w;
    n.if((0, fe.not)((w = t.valid) !== null && w !== void 0 ? w : f), m);
  }
}
je.funcKeywordCode = Ac;
function Us(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, fe._)`${n.parentData}[${n.parentDataProperty}]`));
}
function kc(e, t) {
  const { gen: r } = e;
  r.if((0, fe._)`Array.isArray(${t})`, () => {
    r.assign(Qe.default.vErrors, (0, fe._)`${Qe.default.vErrors} === null ? ${t} : ${Qe.default.vErrors}.concat(${t})`).assign(Qe.default.errors, (0, fe._)`${Qe.default.vErrors}.length`), (0, Tc.extendErrors)(e);
  }, () => e.error());
}
function Cc({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function io(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, fe.stringify)(r) });
}
function Dc(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
je.validSchemaType = Dc;
function Lc({ schema: e, opts: t, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
je.validateKeywordUsage = Lc;
var xe = {};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.extendSubschemaMode = xe.extendSubschemaData = xe.getSubschema = void 0;
const Te = U, co = T;
function Mc(e, { keyword: t, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return r === void 0 ? {
      schema: l,
      schemaPath: (0, Te._)`${e.schemaPath}${(0, Te.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[r],
      schemaPath: (0, Te._)`${e.schemaPath}${(0, Te.getProperty)(t)}${(0, Te.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, co.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
xe.getSubschema = Mc;
function Vc(e, t, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (r !== void 0) {
    const { errorPath: i, dataPathArr: d, opts: f } = t, _ = l.let("data", (0, Te._)`${t.data}${(0, Te.getProperty)(r)}`, !0);
    c(_), e.errorPath = (0, Te.str)`${i}${(0, co.getErrorPath)(r, n, f.jsPropertySyntax)}`, e.parentDataProperty = (0, Te._)`${r}`, e.dataPathArr = [...d, e.parentDataProperty];
  }
  if (s !== void 0) {
    const i = s instanceof Te.Name ? s : l.let("data", s, !0);
    c(i), o !== void 0 && (e.propertyName = o);
  }
  a && (e.dataTypes = a);
  function c(i) {
    e.data = i, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, i];
  }
}
xe.extendSubschemaData = Vc;
function zc(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (e.compositeRule = n), s !== void 0 && (e.createErrors = s), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
xe.extendSubschemaMode = zc;
var ie = {}, lo = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!e(t[s], r[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (a = Object.keys(t), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var o = a[s];
      if (!e(t[o], r[o])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, uo = { exports: {} }, Je = uo.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  er(t, n, s, e, "", e);
};
Je.keywords = {
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
Je.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Je.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Je.skipKeywords = {
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
function er(e, t, r, n, s, a, o, l, c, i) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, s, a, o, l, c, i);
    for (var d in n) {
      var f = n[d];
      if (Array.isArray(f)) {
        if (d in Je.arrayKeywords)
          for (var _ = 0; _ < f.length; _++)
            er(e, t, r, f[_], s + "/" + d + "/" + _, a, s, d, n, _);
      } else if (d in Je.propsKeywords) {
        if (f && typeof f == "object")
          for (var y in f)
            er(e, t, r, f[y], s + "/" + d + "/" + Fc(y), a, s, d, n, y);
      } else (d in Je.keywords || e.allKeys && !(d in Je.skipKeywords)) && er(e, t, r, f, s + "/" + d, a, s, d, n);
    }
    r(n, s, a, o, l, c, i);
  }
}
function Fc(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Uc = uo.exports;
Object.defineProperty(ie, "__esModule", { value: !0 });
ie.getSchemaRefs = ie.resolveUrl = ie.normalizeId = ie._getFullPath = ie.getFullPath = ie.inlineRef = void 0;
const qc = T, Gc = lo, Kc = Uc, Hc = /* @__PURE__ */ new Set([
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
function Xc(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !dn(e) : t ? fo(e) <= t : !1;
}
ie.inlineRef = Xc;
const Wc = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function dn(e) {
  for (const t in e) {
    if (Wc.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(dn) || typeof r == "object" && dn(r))
      return !0;
  }
  return !1;
}
function fo(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !Hc.has(r) && (typeof e[r] == "object" && (0, qc.eachItem)(e[r], (n) => t += fo(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function ho(e, t = "", r) {
  r !== !1 && (t = $t(t));
  const n = e.parse(t);
  return mo(e, n);
}
ie.getFullPath = ho;
function mo(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
ie._getFullPath = mo;
const Bc = /#\/?$/;
function $t(e) {
  return e ? e.replace(Bc, "") : "";
}
ie.normalizeId = $t;
function Jc(e, t, r) {
  return r = $t(r), e.resolve(t, r);
}
ie.resolveUrl = Jc;
const Yc = /^[a-z_][-a-z0-9._]*$/i;
function xc(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = $t(e[r] || t), a = { "": s }, o = ho(n, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return Kc(e, { allKeys: !0 }, (f, _, y, p) => {
    if (p === void 0)
      return;
    const S = o + _;
    let v = a[p];
    typeof f[r] == "string" && (v = m.call(this, f[r])), w.call(this, f.$anchor), w.call(this, f.$dynamicAnchor), a[_] = v;
    function m(R) {
      const O = this.opts.uriResolver.resolve;
      if (R = $t(v ? O(v, R) : R), c.has(R))
        throw d(R);
      c.add(R);
      let j = this.refs[R];
      return typeof j == "string" && (j = this.refs[j]), typeof j == "object" ? i(f, j.schema, R) : R !== $t(S) && (R[0] === "#" ? (i(f, l[R], R), l[R] = f) : this.refs[R] = S), R;
    }
    function w(R) {
      if (typeof R == "string") {
        if (!Yc.test(R))
          throw new Error(`invalid anchor "${R}"`);
        m.call(this, `#${R}`);
      }
    }
  }), l;
  function i(f, _, y) {
    if (_ !== void 0 && !Gc(f, _))
      throw d(y);
  }
  function d(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
ie.getSchemaRefs = xc;
Object.defineProperty(we, "__esModule", { value: !0 });
we.getData = we.KeywordCxt = we.validateFunctionCode = void 0;
const po = yt, qs = ne, jn = Le, or = ne, Zc = hr, Ct = je, Xr = xe, D = U, F = ve, Qc = ie, Me = T, Ot = Ft;
function el(e) {
  if (go(e) && (vo(e), yo(e))) {
    nl(e);
    return;
  }
  $o(e, () => (0, po.topBoolOrEmptySchema)(e));
}
we.validateFunctionCode = el;
function $o({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? e.func(t, (0, D._)`${F.default.data}, ${F.default.valCxt}`, n.$async, () => {
    e.code((0, D._)`"use strict"; ${Gs(r, s)}`), rl(e, s), e.code(a);
  }) : e.func(t, (0, D._)`${F.default.data}, ${tl(s)}`, n.$async, () => e.code(Gs(r, s)).code(a));
}
function tl(e) {
  return (0, D._)`{${F.default.instancePath}="", ${F.default.parentData}, ${F.default.parentDataProperty}, ${F.default.rootData}=${F.default.data}${e.dynamicRef ? (0, D._)`, ${F.default.dynamicAnchors}={}` : D.nil}}={}`;
}
function rl(e, t) {
  e.if(F.default.valCxt, () => {
    e.var(F.default.instancePath, (0, D._)`${F.default.valCxt}.${F.default.instancePath}`), e.var(F.default.parentData, (0, D._)`${F.default.valCxt}.${F.default.parentData}`), e.var(F.default.parentDataProperty, (0, D._)`${F.default.valCxt}.${F.default.parentDataProperty}`), e.var(F.default.rootData, (0, D._)`${F.default.valCxt}.${F.default.rootData}`), t.dynamicRef && e.var(F.default.dynamicAnchors, (0, D._)`${F.default.valCxt}.${F.default.dynamicAnchors}`);
  }, () => {
    e.var(F.default.instancePath, (0, D._)`""`), e.var(F.default.parentData, (0, D._)`undefined`), e.var(F.default.parentDataProperty, (0, D._)`undefined`), e.var(F.default.rootData, F.default.data), t.dynamicRef && e.var(F.default.dynamicAnchors, (0, D._)`{}`);
  });
}
function nl(e) {
  const { schema: t, opts: r, gen: n } = e;
  $o(e, () => {
    r.$comment && t.$comment && Eo(e), cl(e), n.let(F.default.vErrors, null), n.let(F.default.errors, 0), r.unevaluated && sl(e), _o(e), dl(e);
  });
}
function sl(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, D._)`${r}.evaluated`), t.if((0, D._)`${e.evaluated}.dynamicProps`, () => t.assign((0, D._)`${e.evaluated}.props`, (0, D._)`undefined`)), t.if((0, D._)`${e.evaluated}.dynamicItems`, () => t.assign((0, D._)`${e.evaluated}.items`, (0, D._)`undefined`));
}
function Gs(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, D._)`/*# sourceURL=${r} */` : D.nil;
}
function al(e, t) {
  if (go(e) && (vo(e), yo(e))) {
    ol(e, t);
    return;
  }
  (0, po.boolOrEmptySchema)(e, t);
}
function yo({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function go(e) {
  return typeof e.schema != "boolean";
}
function ol(e, t) {
  const { schema: r, gen: n, opts: s } = e;
  s.$comment && r.$comment && Eo(e), ll(e), ul(e);
  const a = n.const("_errs", F.default.errors);
  _o(e, a), n.var(t, (0, D._)`${a} === ${F.default.errors}`);
}
function vo(e) {
  (0, Me.checkUnknownRules)(e), il(e);
}
function _o(e, t) {
  if (e.opts.jtd)
    return Ks(e, [], !1, t);
  const r = (0, qs.getSchemaTypes)(e.schema), n = (0, qs.coerceAndCheckDataType)(e, r);
  Ks(e, r, !n, t);
}
function il(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: s } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Me.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function cl(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Me.checkStrictMode)(e, "default is ignored in the schema root");
}
function ll(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, Qc.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function ul(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Eo({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    e.code((0, D._)`${F.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, D.str)`${n}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, D._)`${F.default.self}.opts.$comment(${a}, ${o}, ${l}.schema)`);
  }
}
function dl(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = e;
  r.$async ? t.if((0, D._)`${F.default.errors} === 0`, () => t.return(F.default.data), () => t.throw((0, D._)`new ${s}(${F.default.vErrors})`)) : (t.assign((0, D._)`${n}.errors`, F.default.vErrors), a.unevaluated && fl(e), t.return((0, D._)`${F.default.errors} === 0`));
}
function fl({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof D.Name && e.assign((0, D._)`${t}.props`, r), n instanceof D.Name && e.assign((0, D._)`${t}.items`, n);
}
function Ks(e, t, r, n) {
  const { gen: s, schema: a, data: o, allErrors: l, opts: c, self: i } = e, { RULES: d } = i;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, Me.schemaHasRulesButRef)(a, d))) {
    s.block(() => bo(e, "$ref", d.all.$ref.definition));
    return;
  }
  c.jtd || hl(e, t), s.block(() => {
    for (const _ of d.rules)
      f(_);
    f(d.post);
  });
  function f(_) {
    (0, jn.shouldUseGroup)(a, _) && (_.type ? (s.if((0, or.checkDataType)(_.type, o, c.strictNumbers)), Hs(e, _), t.length === 1 && t[0] === _.type && r && (s.else(), (0, or.reportTypeError)(e)), s.endIf()) : Hs(e, _), l || s.if((0, D._)`${F.default.errors} === ${n || 0}`));
  }
}
function Hs(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = e;
  s && (0, Zc.assignDefaults)(e, t.type), r.block(() => {
    for (const a of t.rules)
      (0, jn.shouldUseRule)(n, a) && bo(e, a.keyword, a.definition, t.type);
  });
}
function hl(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (ml(e, t), e.opts.allowUnionTypes || pl(e, t), $l(e, e.dataTypes));
}
function ml(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      wo(e.dataTypes, r) || An(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), gl(e, t);
  }
}
function pl(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && An(e, "use allowUnionTypes to allow union type keyword");
}
function $l(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, jn.shouldUseRule)(e.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => yl(t, o)) && An(e, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function yl(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function wo(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function gl(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    wo(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function An(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Me.checkStrictMode)(e, t, e.opts.strictTypes);
}
class So {
  constructor(t, r, n) {
    if ((0, Ct.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Me.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", Po(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, Ct.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", F.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, D.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, D.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, D._)`${r} !== undefined && (${(0, D.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Ot.reportExtraError : Ot.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Ot.reportError)(this, this.def.$dataError || Ot.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Ot.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = D.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = D.nil, r = D.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, D.or)((0, D._)`${s} === undefined`, r)), t !== D.nil && n.assign(t, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== D.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, D.or)(o(), l());
    function o() {
      if (n.length) {
        if (!(r instanceof D.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, D._)`${(0, or.checkDataTypes)(c, r, a.opts.strictNumbers, or.DataType.Wrong)}`;
      }
      return D.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, D._)`!${c}(${r})`;
      }
      return D.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Xr.getSubschema)(this.it, t);
    (0, Xr.extendSubschemaData)(n, this.it, t), (0, Xr.extendSubschemaMode)(n, t);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return al(s, r), s;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Me.mergeEvaluated.props(s, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Me.mergeEvaluated.items(s, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(t, D.Name)), !0;
  }
}
we.KeywordCxt = So;
function bo(e, t, r, n) {
  const s = new So(e, r, t);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Ct.funcKeywordCode)(s, r) : "macro" in r ? (0, Ct.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Ct.funcKeywordCode)(s, r);
}
const vl = /^\/(?:[^~]|~0|~1)*$/, _l = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Po(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (e === "")
    return F.default.rootData;
  if (e[0] === "/") {
    if (!vl.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, a = F.default.rootData;
  } else {
    const i = _l.exec(e);
    if (!i)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const d = +i[1];
    if (s = i[2], s === "#") {
      if (d >= t)
        throw new Error(c("property/index", d));
      return n[t - d];
    }
    if (d > t)
      throw new Error(c("data", d));
    if (a = r[t - d], !s)
      return a;
  }
  let o = a;
  const l = s.split("/");
  for (const i of l)
    i && (a = (0, D._)`${a}${(0, D.getProperty)((0, Me.unescapeJsonPointer)(i))}`, o = (0, D._)`${o} && ${a}`);
  return o;
  function c(i, d) {
    return `Cannot access ${i} ${d} levels up, current level is ${t}`;
  }
}
we.getData = Po;
var gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
class El extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
gt.default = El;
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
const Wr = ie;
class wl extends Error {
  constructor(t, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Wr.resolveUrl)(t, r, n), this.missingSchema = (0, Wr.normalizeId)((0, Wr.getFullPath)(t, this.missingRef));
  }
}
ot.default = wl;
var he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.resolveSchema = he.getCompilingSchema = he.resolveRef = he.compileSchema = he.SchemaEnv = void 0;
const be = U, Sl = gt, Ze = ve, Re = ie, Xs = T, bl = we;
class mr {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Re.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
he.SchemaEnv = mr;
function kn(e) {
  const t = Ro.call(this, e);
  if (t)
    return t;
  const r = (0, Re.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new be.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let l;
  e.$async && (l = o.scopeValue("Error", {
    ref: Sl.default,
    code: (0, be._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  e.validateName = c;
  const i = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Ze.default.data,
    parentData: Ze.default.parentData,
    parentDataProperty: Ze.default.parentDataProperty,
    dataNames: [Ze.default.data],
    dataPathArr: [be.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, be.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: be.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, be._)`""`,
    opts: this.opts,
    self: this
  };
  let d;
  try {
    this._compilations.add(e), (0, bl.validateFunctionCode)(i), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    d = `${o.scopeRefs(Ze.default.scope)}return ${f}`, this.opts.code.process && (d = this.opts.code.process(d, e));
    const y = new Function(`${Ze.default.self}`, `${Ze.default.scope}`, d)(this, this.scope.get());
    if (this.scope.value(c, { ref: y }), y.errors = null, y.schema = e.schema, y.schemaEnv = e, e.$async && (y.$async = !0), this.opts.code.source === !0 && (y.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: p, items: S } = i;
      y.evaluated = {
        props: p instanceof be.Name ? void 0 : p,
        items: S instanceof be.Name ? void 0 : S,
        dynamicProps: p instanceof be.Name,
        dynamicItems: S instanceof be.Name
      }, y.source && (y.source.evaluated = (0, be.stringify)(y.evaluated));
    }
    return e.validate = y, e;
  } catch (f) {
    throw delete e.validate, delete e.validateName, d && this.logger.error("Error compiling schema, function code:", d), f;
  } finally {
    this._compilations.delete(e);
  }
}
he.compileSchema = kn;
function Pl(e, t, r) {
  var n;
  r = (0, Re.resolveUrl)(this.opts.uriResolver, t, r);
  const s = e.refs[r];
  if (s)
    return s;
  let a = Nl.call(this, e, r);
  if (a === void 0) {
    const o = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: l } = this.opts;
    o && (a = new mr({ schema: o, schemaId: l, root: e, baseId: t }));
  }
  if (a !== void 0)
    return e.refs[r] = Rl.call(this, a);
}
he.resolveRef = Pl;
function Rl(e) {
  return (0, Re.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : kn.call(this, e);
}
function Ro(e) {
  for (const t of this._compilations)
    if (Il(t, e))
      return t;
}
he.getCompilingSchema = Ro;
function Il(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Nl(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || pr.call(this, e, t);
}
function pr(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Re._getFullPath)(this.opts.uriResolver, r);
  let s = (0, Re.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === s)
    return Br.call(this, r, e);
  const a = (0, Re.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const l = pr.call(this, e, o);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : Br.call(this, r, l);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || kn.call(this, o), a === (0, Re.normalizeId)(t)) {
      const { schema: l } = o, { schemaId: c } = this.opts, i = l[c];
      return i && (s = (0, Re.resolveUrl)(this.opts.uriResolver, s, i)), new mr({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return Br.call(this, r, o);
  }
}
he.resolveSchema = pr;
const Ol = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Br(e, { baseId: t, schema: r, root: n }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Xs.unescapeFragment)(l)];
    if (c === void 0)
      return;
    r = c;
    const i = typeof r == "object" && r[this.opts.schemaId];
    !Ol.has(l) && i && (t = (0, Re.resolveUrl)(this.opts.uriResolver, t, i));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Xs.schemaHasRulesButRef)(r, this.RULES)) {
    const l = (0, Re.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    a = pr.call(this, n, l);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new mr({ schema: r, schemaId: o, root: n, baseId: t }), a.schema !== a.root.schema)
    return a;
}
const Tl = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", jl = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Al = "object", kl = [
  "$data"
], Cl = {
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
}, Dl = !1, Ll = {
  $id: Tl,
  description: jl,
  type: Al,
  required: kl,
  properties: Cl,
  additionalProperties: Dl
};
var Cn = {}, $r = { exports: {} };
const Ml = {
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
var Vl = {
  HEX: Ml
};
const { HEX: zl } = Vl;
function Io(e) {
  if (Oo(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [r] = t;
  return r ? { host: Ul(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function fn(e, t = !1) {
  let r = "", n = !0;
  for (const s of e) {
    if (zl[s] === void 0) return;
    s !== "0" && n === !0 && (n = !1), n || (r += s);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function Fl(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, o = !1, l = !1;
  function c() {
    if (s.length) {
      if (a === !1) {
        const i = fn(s);
        if (i !== void 0)
          n.push(i);
        else
          return r.error = !0, !1;
      }
      s.length = 0;
    }
    return !0;
  }
  for (let i = 0; i < e.length; i++) {
    const d = e[i];
    if (!(d === "[" || d === "]"))
      if (d === ":") {
        if (o === !0 && (l = !0), !c())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        i - 1 >= 0 && e[i - 1] === ":" && (o = !0);
        continue;
      } else if (d === "%") {
        if (!c())
          break;
        a = !0;
      } else {
        s.push(d);
        continue;
      }
  }
  return s.length && (a ? r.zone = s.join("") : l ? n.push(s.join("")) : n.push(fn(s))), r.address = n.join(""), r;
}
function No(e, t = {}) {
  if (Oo(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const r = Fl(e);
  if (r.error)
    return { host: e, isIPV6: !1 };
  {
    let n = r.address, s = r.address;
    return r.zone && (n += "%" + r.zone, s += "%25" + r.zone), { host: n, escapedHost: s, isIPV6: !0 };
  }
}
function Ul(e, t) {
  let r = "", n = !0;
  const s = e.length;
  for (let a = 0; a < s; a++) {
    const o = e[a];
    o === "0" && n ? (a + 1 <= s && e[a + 1] === t || a + 1 === s) && (r += o, n = !1) : (o === t ? n = !0 : n = !1, r += o);
  }
  return r;
}
function Oo(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const Ws = /^\.\.?\//u, Bs = /^\/\.(?:\/|$)/u, Js = /^\/\.\.(?:\/|$)/u, ql = /^\/?(?:.|\n)*?(?=\/|$)/u;
function Gl(e) {
  const t = [];
  for (; e.length; )
    if (e.match(Ws))
      e = e.replace(Ws, "");
    else if (e.match(Bs))
      e = e.replace(Bs, "/");
    else if (e.match(Js))
      e = e.replace(Js, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(ql);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function Kl(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function Hl(e, t) {
  const r = [];
  if (e.userinfo !== void 0 && (r.push(e.userinfo), r.push("@")), e.host !== void 0) {
    let n = unescape(e.host);
    const s = Io(n);
    if (s.isIPV4)
      n = s.host;
    else {
      const a = No(s.host, { isIPV4: !1 });
      a.isIPV6 === !0 ? n = `[${a.escapedHost}]` : n = e.host;
    }
    r.push(n);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (r.push(":"), r.push(String(e.port))), r.length ? r.join("") : void 0;
}
var Xl = {
  recomposeAuthority: Hl,
  normalizeComponentEncoding: Kl,
  removeDotSegments: Gl,
  normalizeIPv4: Io,
  normalizeIPv6: No,
  stringArrayToHexStripped: fn
};
const Wl = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, Bl = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function To(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function jo(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function Ao(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function Jl(e) {
  return e.secure = To(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function Yl(e) {
  if ((e.port === (To(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function xl(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(Bl);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const s = `${n}:${t.nid || e.nid}`, a = Dn[s];
    e.path = void 0, a && (e = a.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function Zl(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), s = `${r}:${t.nid || n}`, a = Dn[s];
  a && (e = a.serialize(e, t));
  const o = e, l = e.nss;
  return o.path = `${n || t.nid}:${l}`, t.skipEscape = !0, o;
}
function Ql(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !Wl.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function eu(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const ko = {
  scheme: "http",
  domainHost: !0,
  parse: jo,
  serialize: Ao
}, tu = {
  scheme: "https",
  domainHost: ko.domainHost,
  parse: jo,
  serialize: Ao
}, tr = {
  scheme: "ws",
  domainHost: !0,
  parse: Jl,
  serialize: Yl
}, ru = {
  scheme: "wss",
  domainHost: tr.domainHost,
  parse: tr.parse,
  serialize: tr.serialize
}, nu = {
  scheme: "urn",
  parse: xl,
  serialize: Zl,
  skipNormalize: !0
}, su = {
  scheme: "urn:uuid",
  parse: Ql,
  serialize: eu,
  skipNormalize: !0
}, Dn = {
  http: ko,
  https: tu,
  ws: tr,
  wss: ru,
  urn: nu,
  "urn:uuid": su
};
var au = Dn;
const { normalizeIPv6: ou, normalizeIPv4: iu, removeDotSegments: At, recomposeAuthority: cu, normalizeComponentEncoding: Gt } = Xl, Ln = au;
function lu(e, t) {
  return typeof e == "string" ? e = Ae(Ve(e, t), t) : typeof e == "object" && (e = Ve(Ae(e, t), t)), e;
}
function uu(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), s = Co(Ve(e, n), Ve(t, n), n, !0);
  return Ae(s, { ...n, skipEscape: !0 });
}
function Co(e, t, r, n) {
  const s = {};
  return n || (e = Ve(Ae(e, r), r), t = Ve(Ae(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = At(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = At(t.path || ""), s.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? s.path = At(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = At(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function du(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = Ae(Gt(Ve(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = Ae(Gt(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = Ae(Gt(Ve(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = Ae(Gt(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function Ae(e, t) {
  const r = {
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
  }, n = Object.assign({}, t), s = [], a = Ln[(n.scheme || r.scheme || "").toLowerCase()];
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const o = cu(r, n);
  if (o !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(o), r.path && r.path.charAt(0) !== "/" && s.push("/")), r.path !== void 0) {
    let l = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (l = At(l)), o === void 0 && (l = l.replace(/^\/\//u, "/%2F")), s.push(l);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const fu = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function hu(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || fu[t])
      return !0;
  return !1;
}
const mu = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Ve(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, s = e.indexOf("%") !== -1;
  let a = !1;
  r.reference === "suffix" && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
  const o = e.match(mu);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host) {
      const c = iu(n.host);
      if (c.isIPV4 === !1) {
        const i = ou(c.host, { isIPV4: !1 });
        n.host = i.host.toLowerCase(), a = i.isIPV6;
      } else
        n.host = c.host, a = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && !n.path && n.query === void 0 ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const l = Ln[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!l || !l.unicodeSupport) && n.host && (r.domainHost || l && l.domainHost) && a === !1 && hu(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!l || l && !l.skipNormalize) && (s && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), s && n.host !== void 0 && (n.host = unescape(n.host)), n.path !== void 0 && n.path.length && (n.path = escape(unescape(n.path))), n.fragment !== void 0 && n.fragment.length && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), l && l.parse && l.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Mn = {
  SCHEMES: Ln,
  normalize: lu,
  resolve: uu,
  resolveComponents: Co,
  equal: du,
  serialize: Ae,
  parse: Ve
};
$r.exports = Mn;
$r.exports.default = Mn;
$r.exports.fastUri = Mn;
var pu = $r.exports;
Object.defineProperty(Cn, "__esModule", { value: !0 });
const Do = pu;
Do.code = 'require("ajv/dist/runtime/uri").default';
Cn.default = Do;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = we;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = U;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = gt, s = ot, a = st, o = he, l = U, c = ie, i = ne, d = T, f = Ll, _ = Cn, y = (P, $) => new RegExp(P, $);
  y.code = "new RegExp";
  const p = ["removeAdditional", "useDefaults", "coerceTypes"], S = /* @__PURE__ */ new Set([
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
  ]), v = {
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
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, w = 200;
  function R(P) {
    var $, E, g, u, h, b, L, M, J, W, ae, it, Tr, jr, Ar, kr, Cr, Dr, Lr, Mr, Vr, zr, Fr, Ur, qr;
    const bt = P.strict, Gr = ($ = P.code) === null || $ === void 0 ? void 0 : $.optimize, Ts = Gr === !0 || Gr === void 0 ? 1 : Gr || 0, js = (g = (E = P.code) === null || E === void 0 ? void 0 : E.regExp) !== null && g !== void 0 ? g : y, ai = (u = P.uriResolver) !== null && u !== void 0 ? u : _.default;
    return {
      strictSchema: (b = (h = P.strictSchema) !== null && h !== void 0 ? h : bt) !== null && b !== void 0 ? b : !0,
      strictNumbers: (M = (L = P.strictNumbers) !== null && L !== void 0 ? L : bt) !== null && M !== void 0 ? M : !0,
      strictTypes: (W = (J = P.strictTypes) !== null && J !== void 0 ? J : bt) !== null && W !== void 0 ? W : "log",
      strictTuples: (it = (ae = P.strictTuples) !== null && ae !== void 0 ? ae : bt) !== null && it !== void 0 ? it : "log",
      strictRequired: (jr = (Tr = P.strictRequired) !== null && Tr !== void 0 ? Tr : bt) !== null && jr !== void 0 ? jr : !1,
      code: P.code ? { ...P.code, optimize: Ts, regExp: js } : { optimize: Ts, regExp: js },
      loopRequired: (Ar = P.loopRequired) !== null && Ar !== void 0 ? Ar : w,
      loopEnum: (kr = P.loopEnum) !== null && kr !== void 0 ? kr : w,
      meta: (Cr = P.meta) !== null && Cr !== void 0 ? Cr : !0,
      messages: (Dr = P.messages) !== null && Dr !== void 0 ? Dr : !0,
      inlineRefs: (Lr = P.inlineRefs) !== null && Lr !== void 0 ? Lr : !0,
      schemaId: (Mr = P.schemaId) !== null && Mr !== void 0 ? Mr : "$id",
      addUsedSchema: (Vr = P.addUsedSchema) !== null && Vr !== void 0 ? Vr : !0,
      validateSchema: (zr = P.validateSchema) !== null && zr !== void 0 ? zr : !0,
      validateFormats: (Fr = P.validateFormats) !== null && Fr !== void 0 ? Fr : !0,
      unicodeRegExp: (Ur = P.unicodeRegExp) !== null && Ur !== void 0 ? Ur : !0,
      int32range: (qr = P.int32range) !== null && qr !== void 0 ? qr : !0,
      uriResolver: ai
    };
  }
  class O {
    constructor($ = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), $ = this.opts = { ...$, ...R($) };
      const { es5: E, lines: g } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: S, es5: E, lines: g }), this.logger = q($.logger);
      const u = $.validateFormats;
      $.validateFormats = !1, this.RULES = (0, a.getRules)(), j.call(this, v, $, "NOT SUPPORTED"), j.call(this, m, $, "DEPRECATED", "warn"), this._metaOpts = Se.call(this), $.formats && pe.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), $.keywords && _e.call(this, $.keywords), typeof $.meta == "object" && this.addMetaSchema($.meta), te.call(this), $.validateFormats = u;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: $, meta: E, schemaId: g } = this.opts;
      let u = f;
      g === "id" && (u = { ...f }, u.id = u.$id, delete u.$id), E && $ && this.addMetaSchema(u, u[g], !1);
    }
    defaultMeta() {
      const { meta: $, schemaId: E } = this.opts;
      return this.opts.defaultMeta = typeof $ == "object" ? $[E] || $ : void 0;
    }
    validate($, E) {
      let g;
      if (typeof $ == "string") {
        if (g = this.getSchema($), !g)
          throw new Error(`no schema with key or ref "${$}"`);
      } else
        g = this.compile($);
      const u = g(E);
      return "$async" in g || (this.errors = g.errors), u;
    }
    compile($, E) {
      const g = this._addSchema($, E);
      return g.validate || this._compileSchemaEnv(g);
    }
    compileAsync($, E) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: g } = this.opts;
      return u.call(this, $, E);
      async function u(W, ae) {
        await h.call(this, W.$schema);
        const it = this._addSchema(W, ae);
        return it.validate || b.call(this, it);
      }
      async function h(W) {
        W && !this.getSchema(W) && await u.call(this, { $ref: W }, !0);
      }
      async function b(W) {
        try {
          return this._compileSchemaEnv(W);
        } catch (ae) {
          if (!(ae instanceof s.default))
            throw ae;
          return L.call(this, ae), await M.call(this, ae.missingSchema), b.call(this, W);
        }
      }
      function L({ missingSchema: W, missingRef: ae }) {
        if (this.refs[W])
          throw new Error(`AnySchema ${W} is loaded but ${ae} cannot be resolved`);
      }
      async function M(W) {
        const ae = await J.call(this, W);
        this.refs[W] || await h.call(this, ae.$schema), this.refs[W] || this.addSchema(ae, W, E);
      }
      async function J(W) {
        const ae = this._loading[W];
        if (ae)
          return ae;
        try {
          return await (this._loading[W] = g(W));
        } finally {
          delete this._loading[W];
        }
      }
    }
    // Adds schema to the instance
    addSchema($, E, g, u = this.opts.validateSchema) {
      if (Array.isArray($)) {
        for (const b of $)
          this.addSchema(b, void 0, g, u);
        return this;
      }
      let h;
      if (typeof $ == "object") {
        const { schemaId: b } = this.opts;
        if (h = $[b], h !== void 0 && typeof h != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return E = (0, c.normalizeId)(E || h), this._checkUnique(E), this.schemas[E] = this._addSchema($, g, E, u, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema($, E, g = this.opts.validateSchema) {
      return this.addSchema($, E, !0, g), this;
    }
    //  Validate schema against its meta-schema
    validateSchema($, E) {
      if (typeof $ == "boolean")
        return !0;
      let g;
      if (g = $.$schema, g !== void 0 && typeof g != "string")
        throw new Error("$schema must be a string");
      if (g = g || this.opts.defaultMeta || this.defaultMeta(), !g)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const u = this.validate(g, $);
      if (!u && E) {
        const h = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(h);
        else
          throw new Error(h);
      }
      return u;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema($) {
      let E;
      for (; typeof (E = B.call(this, $)) == "string"; )
        $ = E;
      if (E === void 0) {
        const { schemaId: g } = this.opts, u = new o.SchemaEnv({ schema: {}, schemaId: g });
        if (E = o.resolveSchema.call(this, u, $), !E)
          return;
        this.refs[$] = E;
      }
      return E.validate || this._compileSchemaEnv(E);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema($) {
      if ($ instanceof RegExp)
        return this._removeAllSchemas(this.schemas, $), this._removeAllSchemas(this.refs, $), this;
      switch (typeof $) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const E = B.call(this, $);
          return typeof E == "object" && this._cache.delete(E.schema), delete this.schemas[$], delete this.refs[$], this;
        }
        case "object": {
          const E = $;
          this._cache.delete(E);
          let g = $[this.opts.schemaId];
          return g && (g = (0, c.normalizeId)(g), delete this.schemas[g], delete this.refs[g]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary($) {
      for (const E of $)
        this.addKeyword(E);
      return this;
    }
    addKeyword($, E) {
      let g;
      if (typeof $ == "string")
        g = $, typeof E == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), E.keyword = g);
      else if (typeof $ == "object" && E === void 0) {
        if (E = $, g = E.keyword, Array.isArray(g) && !g.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (I.call(this, g, E), !E)
        return (0, d.eachItem)(g, (h) => N.call(this, h)), this;
      A.call(this, E);
      const u = {
        ...E,
        type: (0, i.getJSONTypes)(E.type),
        schemaType: (0, i.getJSONTypes)(E.schemaType)
      };
      return (0, d.eachItem)(g, u.type.length === 0 ? (h) => N.call(this, h, u) : (h) => u.type.forEach((b) => N.call(this, h, u, b))), this;
    }
    getKeyword($) {
      const E = this.RULES.all[$];
      return typeof E == "object" ? E.definition : !!E;
    }
    // Remove keyword
    removeKeyword($) {
      const { RULES: E } = this;
      delete E.keywords[$], delete E.all[$];
      for (const g of E.rules) {
        const u = g.rules.findIndex((h) => h.keyword === $);
        u >= 0 && g.rules.splice(u, 1);
      }
      return this;
    }
    // Add format
    addFormat($, E) {
      return typeof E == "string" && (E = new RegExp(E)), this.formats[$] = E, this;
    }
    errorsText($ = this.errors, { separator: E = ", ", dataVar: g = "data" } = {}) {
      return !$ || $.length === 0 ? "No errors" : $.map((u) => `${g}${u.instancePath} ${u.message}`).reduce((u, h) => u + E + h);
    }
    $dataMetaSchema($, E) {
      const g = this.RULES.all;
      $ = JSON.parse(JSON.stringify($));
      for (const u of E) {
        const h = u.split("/").slice(1);
        let b = $;
        for (const L of h)
          b = b[L];
        for (const L in g) {
          const M = g[L];
          if (typeof M != "object")
            continue;
          const { $data: J } = M.definition, W = b[L];
          J && W && (b[L] = k(W));
        }
      }
      return $;
    }
    _removeAllSchemas($, E) {
      for (const g in $) {
        const u = $[g];
        (!E || E.test(g)) && (typeof u == "string" ? delete $[g] : u && !u.meta && (this._cache.delete(u.schema), delete $[g]));
      }
    }
    _addSchema($, E, g, u = this.opts.validateSchema, h = this.opts.addUsedSchema) {
      let b;
      const { schemaId: L } = this.opts;
      if (typeof $ == "object")
        b = $[L];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof $ != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let M = this._cache.get($);
      if (M !== void 0)
        return M;
      g = (0, c.normalizeId)(b || g);
      const J = c.getSchemaRefs.call(this, $, g);
      return M = new o.SchemaEnv({ schema: $, schemaId: L, meta: E, baseId: g, localRefs: J }), this._cache.set(M.schema, M), h && !g.startsWith("#") && (g && this._checkUnique(g), this.refs[g] = M), u && this.validateSchema($, !0), M;
    }
    _checkUnique($) {
      if (this.schemas[$] || this.refs[$])
        throw new Error(`schema with key or id "${$}" already exists`);
    }
    _compileSchemaEnv($) {
      if ($.meta ? this._compileMetaSchema($) : o.compileSchema.call(this, $), !$.validate)
        throw new Error("ajv implementation error");
      return $.validate;
    }
    _compileMetaSchema($) {
      const E = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, $);
      } finally {
        this.opts = E;
      }
    }
  }
  O.ValidationError = n.default, O.MissingRefError = s.default, e.default = O;
  function j(P, $, E, g = "error") {
    for (const u in P) {
      const h = u;
      h in $ && this.logger[g](`${E}: option ${u}. ${P[h]}`);
    }
  }
  function B(P) {
    return P = (0, c.normalizeId)(P), this.schemas[P] || this.refs[P];
  }
  function te() {
    const P = this.opts.schemas;
    if (P)
      if (Array.isArray(P))
        this.addSchema(P);
      else
        for (const $ in P)
          this.addSchema(P[$], $);
  }
  function pe() {
    for (const P in this.opts.formats) {
      const $ = this.opts.formats[P];
      $ && this.addFormat(P, $);
    }
  }
  function _e(P) {
    if (Array.isArray(P)) {
      this.addVocabulary(P);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const $ in P) {
      const E = P[$];
      E.keyword || (E.keyword = $), this.addKeyword(E);
    }
  }
  function Se() {
    const P = { ...this.opts };
    for (const $ of p)
      delete P[$];
    return P;
  }
  const z = { log() {
  }, warn() {
  }, error() {
  } };
  function q(P) {
    if (P === !1)
      return z;
    if (P === void 0)
      return console;
    if (P.log && P.warn && P.error)
      return P;
    throw new Error("logger must implement log, warn and error methods");
  }
  const x = /^[a-z_$][a-z0-9_$:-]*$/i;
  function I(P, $) {
    const { RULES: E } = this;
    if ((0, d.eachItem)(P, (g) => {
      if (E.keywords[g])
        throw new Error(`Keyword ${g} is already defined`);
      if (!x.test(g))
        throw new Error(`Keyword ${g} has invalid name`);
    }), !!$ && $.$data && !("code" in $ || "validate" in $))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function N(P, $, E) {
    var g;
    const u = $ == null ? void 0 : $.post;
    if (E && u)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: h } = this;
    let b = u ? h.post : h.rules.find(({ type: M }) => M === E);
    if (b || (b = { type: E, rules: [] }, h.rules.push(b)), h.keywords[P] = !0, !$)
      return;
    const L = {
      keyword: P,
      definition: {
        ...$,
        type: (0, i.getJSONTypes)($.type),
        schemaType: (0, i.getJSONTypes)($.schemaType)
      }
    };
    $.before ? C.call(this, b, L, $.before) : b.rules.push(L), h.all[P] = L, (g = $.implements) === null || g === void 0 || g.forEach((M) => this.addKeyword(M));
  }
  function C(P, $, E) {
    const g = P.rules.findIndex((u) => u.keyword === E);
    g >= 0 ? P.rules.splice(g, 0, $) : (P.rules.push($), this.logger.warn(`rule ${E} is not defined`));
  }
  function A(P) {
    let { metaSchema: $ } = P;
    $ !== void 0 && (P.$data && this.opts.$data && ($ = k($)), P.validateSchema = this.compile($, !0));
  }
  const V = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function k(P) {
    return { anyOf: [P, V] };
  }
})(Sn);
var Vn = {}, yr = {}, zn = {};
Object.defineProperty(zn, "__esModule", { value: !0 });
const $u = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
zn.default = $u;
var ze = {};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.callRef = ze.getValidate = void 0;
const yu = ot, Ys = H, $e = U, lt = ve, xs = he, Kt = T, gu = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: s, schemaEnv: a, validateName: o, opts: l, self: c } = n, { root: i } = a;
    if ((r === "#" || r === "#/") && s === i.baseId)
      return f();
    const d = xs.resolveRef.call(c, i, s, r);
    if (d === void 0)
      throw new yu.default(n.opts.uriResolver, s, r);
    if (d instanceof xs.SchemaEnv)
      return _(d);
    return y(d);
    function f() {
      if (a === i)
        return rr(e, o, a, a.$async);
      const p = t.scopeValue("root", { ref: i });
      return rr(e, (0, $e._)`${p}.validate`, i, i.$async);
    }
    function _(p) {
      const S = Lo(e, p);
      rr(e, S, p, p.$async);
    }
    function y(p) {
      const S = t.scopeValue("schema", l.code.source === !0 ? { ref: p, code: (0, $e.stringify)(p) } : { ref: p }), v = t.name("valid"), m = e.subschema({
        schema: p,
        dataTypes: [],
        schemaPath: $e.nil,
        topSchemaRef: S,
        errSchemaPath: r
      }, v);
      e.mergeEvaluated(m), e.ok(v);
    }
  }
};
function Lo(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, $e._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
ze.getValidate = Lo;
function rr(e, t, r, n) {
  const { gen: s, it: a } = e, { allErrors: o, schemaEnv: l, opts: c } = a, i = c.passContext ? lt.default.this : $e.nil;
  n ? d() : f();
  function d() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const p = s.let("valid");
    s.try(() => {
      s.code((0, $e._)`await ${(0, Ys.callValidateCode)(e, t, i)}`), y(t), o || s.assign(p, !0);
    }, (S) => {
      s.if((0, $e._)`!(${S} instanceof ${a.ValidationError})`, () => s.throw(S)), _(S), o || s.assign(p, !1);
    }), e.ok(p);
  }
  function f() {
    e.result((0, Ys.callValidateCode)(e, t, i), () => y(t), () => _(t));
  }
  function _(p) {
    const S = (0, $e._)`${p}.errors`;
    s.assign(lt.default.vErrors, (0, $e._)`${lt.default.vErrors} === null ? ${S} : ${lt.default.vErrors}.concat(${S})`), s.assign(lt.default.errors, (0, $e._)`${lt.default.vErrors}.length`);
  }
  function y(p) {
    var S;
    if (!a.opts.unevaluated)
      return;
    const v = (S = r == null ? void 0 : r.validate) === null || S === void 0 ? void 0 : S.evaluated;
    if (a.props !== !0)
      if (v && !v.dynamicProps)
        v.props !== void 0 && (a.props = Kt.mergeEvaluated.props(s, v.props, a.props));
      else {
        const m = s.var("props", (0, $e._)`${p}.evaluated.props`);
        a.props = Kt.mergeEvaluated.props(s, m, a.props, $e.Name);
      }
    if (a.items !== !0)
      if (v && !v.dynamicItems)
        v.items !== void 0 && (a.items = Kt.mergeEvaluated.items(s, v.items, a.items));
      else {
        const m = s.var("items", (0, $e._)`${p}.evaluated.items`);
        a.items = Kt.mergeEvaluated.items(s, m, a.items, $e.Name);
      }
  }
}
ze.callRef = rr;
ze.default = gu;
Object.defineProperty(yr, "__esModule", { value: !0 });
const vu = zn, _u = ze, Eu = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  vu.default,
  _u.default
];
yr.default = Eu;
var gr = {}, Fn = {};
Object.defineProperty(Fn, "__esModule", { value: !0 });
const ir = U, Ke = ir.operators, cr = {
  maximum: { okStr: "<=", ok: Ke.LTE, fail: Ke.GT },
  minimum: { okStr: ">=", ok: Ke.GTE, fail: Ke.LT },
  exclusiveMaximum: { okStr: "<", ok: Ke.LT, fail: Ke.GTE },
  exclusiveMinimum: { okStr: ">", ok: Ke.GT, fail: Ke.LTE }
}, wu = {
  message: ({ keyword: e, schemaCode: t }) => (0, ir.str)`must be ${cr[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, ir._)`{comparison: ${cr[e].okStr}, limit: ${t}}`
}, Su = {
  keyword: Object.keys(cr),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: wu,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, ir._)`${r} ${cr[t].fail} ${n} || isNaN(${r})`);
  }
};
Fn.default = Su;
var Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
const Dt = U, bu = {
  message: ({ schemaCode: e }) => (0, Dt.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Dt._)`{multipleOf: ${e}}`
}, Pu = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: bu,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: s } = e, a = s.opts.multipleOfPrecision, o = t.let("res"), l = a ? (0, Dt._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Dt._)`${o} !== parseInt(${o})`;
    e.fail$data((0, Dt._)`(${n} === 0 || (${o} = ${r}/${n}, ${l}))`);
  }
};
Un.default = Pu;
var qn = {}, Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
function Mo(e) {
  const t = e.length;
  let r = 0, n = 0, s;
  for (; n < t; )
    r++, s = e.charCodeAt(n++), s >= 55296 && s <= 56319 && n < t && (s = e.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Gn.default = Mo;
Mo.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(qn, "__esModule", { value: !0 });
const et = U, Ru = T, Iu = Gn, Nu = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, et.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, et._)`{limit: ${e}}`
}, Ou = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Nu,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: s } = e, a = t === "maxLength" ? et.operators.GT : et.operators.LT, o = s.opts.unicode === !1 ? (0, et._)`${r}.length` : (0, et._)`${(0, Ru.useFunc)(e.gen, Iu.default)}(${r})`;
    e.fail$data((0, et._)`${o} ${a} ${n}`);
  }
};
qn.default = Ou;
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
const Tu = H, lr = U, ju = {
  message: ({ schemaCode: e }) => (0, lr.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, lr._)`{pattern: ${e}}`
}, Au = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: ju,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: s, it: a } = e, o = a.opts.unicodeRegExp ? "u" : "", l = r ? (0, lr._)`(new RegExp(${s}, ${o}))` : (0, Tu.usePattern)(e, n);
    e.fail$data((0, lr._)`!${l}.test(${t})`);
  }
};
Kn.default = Au;
var Hn = {};
Object.defineProperty(Hn, "__esModule", { value: !0 });
const Lt = U, ku = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Lt.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Lt._)`{limit: ${e}}`
}, Cu = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: ku,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxProperties" ? Lt.operators.GT : Lt.operators.LT;
    e.fail$data((0, Lt._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Hn.default = Cu;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
const Tt = H, Mt = U, Du = T, Lu = {
  message: ({ params: { missingProperty: e } }) => (0, Mt.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, Mt._)`{missingProperty: ${e}}`
}, Mu = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Lu,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: s, $data: a, it: o } = e, { opts: l } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= l.loopRequired;
    if (o.allErrors ? i() : d(), l.strictRequired) {
      const y = e.parentSchema.properties, { definedProperties: p } = e.it;
      for (const S of r)
        if ((y == null ? void 0 : y[S]) === void 0 && !p.has(S)) {
          const v = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${S}" is not defined at "${v}" (strictRequired)`;
          (0, Du.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function i() {
      if (c || a)
        e.block$data(Mt.nil, f);
      else
        for (const y of r)
          (0, Tt.checkReportMissingProp)(e, y);
    }
    function d() {
      const y = t.let("missing");
      if (c || a) {
        const p = t.let("valid", !0);
        e.block$data(p, () => _(y, p)), e.ok(p);
      } else
        t.if((0, Tt.checkMissingProp)(e, r, y)), (0, Tt.reportMissingProp)(e, y), t.else();
    }
    function f() {
      t.forOf("prop", n, (y) => {
        e.setParams({ missingProperty: y }), t.if((0, Tt.noPropertyInData)(t, s, y, l.ownProperties), () => e.error());
      });
    }
    function _(y, p) {
      e.setParams({ missingProperty: y }), t.forOf(y, n, () => {
        t.assign(p, (0, Tt.propertyInData)(t, s, y, l.ownProperties)), t.if((0, Mt.not)(p), () => {
          e.error(), t.break();
        });
      }, Mt.nil);
    }
  }
};
Xn.default = Mu;
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
const Vt = U, Vu = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Vt.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Vt._)`{limit: ${e}}`
}, zu = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Vu,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, s = t === "maxItems" ? Vt.operators.GT : Vt.operators.LT;
    e.fail$data((0, Vt._)`${r}.length ${s} ${n}`);
  }
};
Wn.default = zu;
var Bn = {}, Ut = {};
Object.defineProperty(Ut, "__esModule", { value: !0 });
const Vo = lo;
Vo.code = 'require("ajv/dist/runtime/equal").default';
Ut.default = Vo;
Object.defineProperty(Bn, "__esModule", { value: !0 });
const Jr = ne, oe = U, Fu = T, Uu = Ut, qu = {
  message: ({ params: { i: e, j: t } }) => (0, oe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, oe._)`{i: ${e}, j: ${t}}`
}, Gu = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: qu,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: l } = e;
    if (!n && !s)
      return;
    const c = t.let("valid"), i = a.items ? (0, Jr.getSchemaTypes)(a.items) : [];
    e.block$data(c, d, (0, oe._)`${o} === false`), e.ok(c);
    function d() {
      const p = t.let("i", (0, oe._)`${r}.length`), S = t.let("j");
      e.setParams({ i: p, j: S }), t.assign(c, !0), t.if((0, oe._)`${p} > 1`, () => (f() ? _ : y)(p, S));
    }
    function f() {
      return i.length > 0 && !i.some((p) => p === "object" || p === "array");
    }
    function _(p, S) {
      const v = t.name("item"), m = (0, Jr.checkDataTypes)(i, v, l.opts.strictNumbers, Jr.DataType.Wrong), w = t.const("indices", (0, oe._)`{}`);
      t.for((0, oe._)`;${p}--;`, () => {
        t.let(v, (0, oe._)`${r}[${p}]`), t.if(m, (0, oe._)`continue`), i.length > 1 && t.if((0, oe._)`typeof ${v} == "string"`, (0, oe._)`${v} += "_"`), t.if((0, oe._)`typeof ${w}[${v}] == "number"`, () => {
          t.assign(S, (0, oe._)`${w}[${v}]`), e.error(), t.assign(c, !1).break();
        }).code((0, oe._)`${w}[${v}] = ${p}`);
      });
    }
    function y(p, S) {
      const v = (0, Fu.useFunc)(t, Uu.default), m = t.name("outer");
      t.label(m).for((0, oe._)`;${p}--;`, () => t.for((0, oe._)`${S} = ${p}; ${S}--;`, () => t.if((0, oe._)`${v}(${r}[${p}], ${r}[${S}])`, () => {
        e.error(), t.assign(c, !1).break(m);
      })));
    }
  }
};
Bn.default = Gu;
var Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
const hn = U, Ku = T, Hu = Ut, Xu = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, hn._)`{allowedValue: ${e}}`
}, Wu = {
  keyword: "const",
  $data: !0,
  error: Xu,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: s, schema: a } = e;
    n || a && typeof a == "object" ? e.fail$data((0, hn._)`!${(0, Ku.useFunc)(t, Hu.default)}(${r}, ${s})`) : e.fail((0, hn._)`${a} !== ${r}`);
  }
};
Jn.default = Wu;
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
const kt = U, Bu = T, Ju = Ut, Yu = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, kt._)`{allowedValues: ${e}}`
}, xu = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: Yu,
  code(e) {
    const { gen: t, data: r, $data: n, schema: s, schemaCode: a, it: o } = e;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= o.opts.loopEnum;
    let c;
    const i = () => c ?? (c = (0, Bu.useFunc)(t, Ju.default));
    let d;
    if (l || n)
      d = t.let("valid"), e.block$data(d, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const y = t.const("vSchema", a);
      d = (0, kt.or)(...s.map((p, S) => _(y, S)));
    }
    e.pass(d);
    function f() {
      t.assign(d, !1), t.forOf("v", a, (y) => t.if((0, kt._)`${i()}(${r}, ${y})`, () => t.assign(d, !0).break()));
    }
    function _(y, p) {
      const S = s[p];
      return typeof S == "object" && S !== null ? (0, kt._)`${i()}(${r}, ${y}[${p}])` : (0, kt._)`${r} === ${S}`;
    }
  }
};
Yn.default = xu;
Object.defineProperty(gr, "__esModule", { value: !0 });
const Zu = Fn, Qu = Un, ed = qn, td = Kn, rd = Hn, nd = Xn, sd = Wn, ad = Bn, od = Jn, id = Yn, cd = [
  // number
  Zu.default,
  Qu.default,
  // string
  ed.default,
  td.default,
  // object
  rd.default,
  nd.default,
  // array
  sd.default,
  ad.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  od.default,
  id.default
];
gr.default = cd;
var vr = {}, vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.validateAdditionalItems = void 0;
const tt = U, mn = T, ld = {
  message: ({ params: { len: e } }) => (0, tt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, tt._)`{limit: ${e}}`
}, ud = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: ld,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, mn.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    zo(e, n);
  }
};
function zo(e, t) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = e;
  o.items = !0;
  const l = r.const("len", (0, tt._)`${s}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, tt._)`${l} <= ${t.length}`);
  else if (typeof n == "object" && !(0, mn.alwaysValidSchema)(o, n)) {
    const i = r.var("valid", (0, tt._)`${l} <= ${t.length}`);
    r.if((0, tt.not)(i), () => c(i)), e.ok(i);
  }
  function c(i) {
    r.forRange("i", t.length, l, (d) => {
      e.subschema({ keyword: a, dataProp: d, dataPropType: mn.Type.Num }, i), o.allErrors || r.if((0, tt.not)(i), () => r.break());
    });
  }
}
vt.validateAdditionalItems = zo;
vt.default = ud;
var xn = {}, _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.validateTuple = void 0;
const Zs = U, nr = T, dd = H, fd = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return Fo(e, "additionalItems", t);
    r.items = !0, !(0, nr.alwaysValidSchema)(r, t) && e.ok((0, dd.validateArray)(e));
  }
};
function Fo(e, t, r = e.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: l } = e;
  d(s), l.opts.unevaluated && r.length && l.items !== !0 && (l.items = nr.mergeEvaluated.items(n, r.length, l.items));
  const c = n.name("valid"), i = n.const("len", (0, Zs._)`${a}.length`);
  r.forEach((f, _) => {
    (0, nr.alwaysValidSchema)(l, f) || (n.if((0, Zs._)`${i} > ${_}`, () => e.subschema({
      keyword: o,
      schemaProp: _,
      dataProp: _
    }, c)), e.ok(c));
  });
  function d(f) {
    const { opts: _, errSchemaPath: y } = l, p = r.length, S = p === f.minItems && (p === f.maxItems || f[t] === !1);
    if (_.strictTuples && !S) {
      const v = `"${o}" is ${p}-tuple, but minItems or maxItems/${t} are not specified or different at path "${y}"`;
      (0, nr.checkStrictMode)(l, v, _.strictTuples);
    }
  }
}
_t.validateTuple = Fo;
_t.default = fd;
Object.defineProperty(xn, "__esModule", { value: !0 });
const hd = _t, md = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, hd.validateTuple)(e, "items")
};
xn.default = md;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
const Qs = U, pd = T, $d = H, yd = vt, gd = {
  message: ({ params: { len: e } }) => (0, Qs.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Qs._)`{limit: ${e}}`
}, vd = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: gd,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: s } = r;
    n.items = !0, !(0, pd.alwaysValidSchema)(n, t) && (s ? (0, yd.validateAdditionalItems)(e, s) : e.ok((0, $d.validateArray)(e)));
  }
};
Zn.default = vd;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
const Ee = U, Ht = T, _d = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ee.str)`must contain at least ${e} valid item(s)` : (0, Ee.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ee._)`{minContains: ${e}}` : (0, Ee._)`{minContains: ${e}, maxContains: ${t}}`
}, Ed = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: _d,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    let o, l;
    const { minContains: c, maxContains: i } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, l = i) : o = 1;
    const d = t.const("len", (0, Ee._)`${s}.length`);
    if (e.setParams({ min: o, max: l }), l === void 0 && o === 0) {
      (0, Ht.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && o > l) {
      (0, Ht.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Ht.alwaysValidSchema)(a, r)) {
      let S = (0, Ee._)`${d} >= ${o}`;
      l !== void 0 && (S = (0, Ee._)`${S} && ${d} <= ${l}`), e.pass(S);
      return;
    }
    a.items = !0;
    const f = t.name("valid");
    l === void 0 && o === 1 ? y(f, () => t.if(f, () => t.break())) : o === 0 ? (t.let(f, !0), l !== void 0 && t.if((0, Ee._)`${s}.length > 0`, _)) : (t.let(f, !1), _()), e.result(f, () => e.reset());
    function _() {
      const S = t.name("_valid"), v = t.let("count", 0);
      y(S, () => t.if(S, () => p(v)));
    }
    function y(S, v) {
      t.forRange("i", 0, d, (m) => {
        e.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Ht.Type.Num,
          compositeRule: !0
        }, S), v();
      });
    }
    function p(S) {
      t.code((0, Ee._)`${S}++`), l === void 0 ? t.if((0, Ee._)`${S} >= ${o}`, () => t.assign(f, !0).break()) : (t.if((0, Ee._)`${S} > ${l}`, () => t.assign(f, !1).break()), o === 1 ? t.assign(f, !0) : t.if((0, Ee._)`${S} >= ${o}`, () => t.assign(f, !0)));
    }
  }
};
Qn.default = Ed;
var _r = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = U, r = T, n = H;
  e.error = {
    message: ({ params: { property: c, depsCount: i, deps: d } }) => {
      const f = i === 1 ? "property" : "properties";
      return (0, t.str)`must have ${f} ${d} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: i, deps: d, missingProperty: f } }) => (0, t._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${i},
    deps: ${d}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [i, d] = a(c);
      o(c, i), l(c, d);
    }
  };
  function a({ schema: c }) {
    const i = {}, d = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const _ = Array.isArray(c[f]) ? i : d;
      _[f] = c[f];
    }
    return [i, d];
  }
  function o(c, i = c.schema) {
    const { gen: d, data: f, it: _ } = c;
    if (Object.keys(i).length === 0)
      return;
    const y = d.let("missing");
    for (const p in i) {
      const S = i[p];
      if (S.length === 0)
        continue;
      const v = (0, n.propertyInData)(d, f, p, _.opts.ownProperties);
      c.setParams({
        property: p,
        depsCount: S.length,
        deps: S.join(", ")
      }), _.allErrors ? d.if(v, () => {
        for (const m of S)
          (0, n.checkReportMissingProp)(c, m);
      }) : (d.if((0, t._)`${v} && (${(0, n.checkMissingProp)(c, S, y)})`), (0, n.reportMissingProp)(c, y), d.else());
    }
  }
  e.validatePropertyDeps = o;
  function l(c, i = c.schema) {
    const { gen: d, data: f, keyword: _, it: y } = c, p = d.name("valid");
    for (const S in i)
      (0, r.alwaysValidSchema)(y, i[S]) || (d.if(
        (0, n.propertyInData)(d, f, S, y.opts.ownProperties),
        () => {
          const v = c.subschema({ keyword: _, schemaProp: S }, p);
          c.mergeValidEvaluated(v, p);
        },
        () => d.var(p, !0)
        // TODO var
      ), c.ok(p));
  }
  e.validateSchemaDeps = l, e.default = s;
})(_r);
var es = {};
Object.defineProperty(es, "__esModule", { value: !0 });
const Uo = U, wd = T, Sd = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Uo._)`{propertyName: ${e.propertyName}}`
}, bd = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Sd,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e;
    if ((0, wd.alwaysValidSchema)(s, r))
      return;
    const a = t.name("valid");
    t.forIn("key", n, (o) => {
      e.setParams({ propertyName: o }), e.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), t.if((0, Uo.not)(a), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(a);
  }
};
es.default = bd;
var Er = {};
Object.defineProperty(Er, "__esModule", { value: !0 });
const Xt = H, Pe = U, Pd = ve, Wt = T, Rd = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, Pe._)`{additionalProperty: ${e.additionalProperty}}`
}, Id = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Rd,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = e;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, Wt.alwaysValidSchema)(o, r))
      return;
    const i = (0, Xt.allSchemaProperties)(n.properties), d = (0, Xt.allSchemaProperties)(n.patternProperties);
    f(), e.ok((0, Pe._)`${a} === ${Pd.default.errors}`);
    function f() {
      t.forIn("key", s, (v) => {
        !i.length && !d.length ? p(v) : t.if(_(v), () => p(v));
      });
    }
    function _(v) {
      let m;
      if (i.length > 8) {
        const w = (0, Wt.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, Xt.isOwnProperty)(t, w, v);
      } else i.length ? m = (0, Pe.or)(...i.map((w) => (0, Pe._)`${v} === ${w}`)) : m = Pe.nil;
      return d.length && (m = (0, Pe.or)(m, ...d.map((w) => (0, Pe._)`${(0, Xt.usePattern)(e, w)}.test(${v})`))), (0, Pe.not)(m);
    }
    function y(v) {
      t.code((0, Pe._)`delete ${s}[${v}]`);
    }
    function p(v) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        y(v);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: v }), e.error(), l || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Wt.alwaysValidSchema)(o, r)) {
        const m = t.name("valid");
        c.removeAdditional === "failing" ? (S(v, m, !1), t.if((0, Pe.not)(m), () => {
          e.reset(), y(v);
        })) : (S(v, m), l || t.if((0, Pe.not)(m), () => t.break()));
      }
    }
    function S(v, m, w) {
      const R = {
        keyword: "additionalProperties",
        dataProp: v,
        dataPropType: Wt.Type.Str
      };
      w === !1 && Object.assign(R, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(R, m);
    }
  }
};
Er.default = Id;
var ts = {};
Object.defineProperty(ts, "__esModule", { value: !0 });
const Nd = we, ea = H, Yr = T, ta = Er, Od = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: s, it: a } = e;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ta.default.code(new Nd.KeywordCxt(a, ta.default, "additionalProperties"));
    const o = (0, ea.allSchemaProperties)(r);
    for (const f of o)
      a.definedProperties.add(f);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = Yr.mergeEvaluated.props(t, (0, Yr.toHash)(o), a.props));
    const l = o.filter((f) => !(0, Yr.alwaysValidSchema)(a, r[f]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const f of l)
      i(f) ? d(f) : (t.if((0, ea.propertyInData)(t, s, f, a.opts.ownProperties)), d(f), a.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(f), e.ok(c);
    function i(f) {
      return a.opts.useDefaults && !a.compositeRule && r[f].default !== void 0;
    }
    function d(f) {
      e.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
ts.default = Od;
var rs = {};
Object.defineProperty(rs, "__esModule", { value: !0 });
const ra = H, Bt = U, na = T, sa = T, Td = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: s, it: a } = e, { opts: o } = a, l = (0, ra.allSchemaProperties)(r), c = l.filter((S) => (0, na.alwaysValidSchema)(a, r[S]));
    if (l.length === 0 || c.length === l.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const i = o.strictSchema && !o.allowMatchingProperties && s.properties, d = t.name("valid");
    a.props !== !0 && !(a.props instanceof Bt.Name) && (a.props = (0, sa.evaluatedPropsToName)(t, a.props));
    const { props: f } = a;
    _();
    function _() {
      for (const S of l)
        i && y(S), a.allErrors ? p(S) : (t.var(d, !0), p(S), t.if(d));
    }
    function y(S) {
      for (const v in i)
        new RegExp(S).test(v) && (0, na.checkStrictMode)(a, `property ${v} matches pattern ${S} (use allowMatchingProperties)`);
    }
    function p(S) {
      t.forIn("key", n, (v) => {
        t.if((0, Bt._)`${(0, ra.usePattern)(e, S)}.test(${v})`, () => {
          const m = c.includes(S);
          m || e.subschema({
            keyword: "patternProperties",
            schemaProp: S,
            dataProp: v,
            dataPropType: sa.Type.Str
          }, d), a.opts.unevaluated && f !== !0 ? t.assign((0, Bt._)`${f}[${v}]`, !0) : !m && !a.allErrors && t.if((0, Bt.not)(d), () => t.break());
        });
      });
    }
  }
};
rs.default = Td;
var ns = {};
Object.defineProperty(ns, "__esModule", { value: !0 });
const jd = T, Ad = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, jd.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
ns.default = Ad;
var ss = {};
Object.defineProperty(ss, "__esModule", { value: !0 });
const kd = H, Cd = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: kd.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
ss.default = Cd;
var as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
const sr = U, Dd = T, Ld = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, sr._)`{passingSchemas: ${e.passing}}`
}, Md = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Ld,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: s } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(i), e.result(o, () => e.reset(), () => e.error(!0));
    function i() {
      a.forEach((d, f) => {
        let _;
        (0, Dd.alwaysValidSchema)(s, d) ? t.var(c, !0) : _ = e.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && t.if((0, sr._)`${c} && ${o}`).assign(o, !1).assign(l, (0, sr._)`[${l}, ${f}]`).else(), t.if(c, () => {
          t.assign(o, !0), t.assign(l, f), _ && e.mergeEvaluated(_, sr.Name);
        });
      });
    }
  }
};
as.default = Md;
var os = {};
Object.defineProperty(os, "__esModule", { value: !0 });
const Vd = T, zd = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    r.forEach((a, o) => {
      if ((0, Vd.alwaysValidSchema)(n, a))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: o }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
os.default = zd;
var is = {};
Object.defineProperty(is, "__esModule", { value: !0 });
const ur = U, qo = T, Fd = {
  message: ({ params: e }) => (0, ur.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ur._)`{failingKeyword: ${e.ifClause}}`
}, Ud = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Fd,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, qo.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = aa(n, "then"), a = aa(n, "else");
    if (!s && !a)
      return;
    const o = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && a) {
      const d = t.let("ifClause");
      e.setParams({ ifClause: d }), t.if(l, i("then", d), i("else", d));
    } else s ? t.if(l, i("then")) : t.if((0, ur.not)(l), i("else"));
    e.pass(o, () => e.error(!0));
    function c() {
      const d = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(d);
    }
    function i(d, f) {
      return () => {
        const _ = e.subschema({ keyword: d }, l);
        t.assign(o, l), e.mergeValidEvaluated(_, o), f ? t.assign(f, (0, ur._)`${d}`) : e.setParams({ ifClause: d });
      };
    }
  }
};
function aa(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, qo.alwaysValidSchema)(e, r);
}
is.default = Ud;
var cs = {};
Object.defineProperty(cs, "__esModule", { value: !0 });
const qd = T, Gd = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, qd.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
cs.default = Gd;
Object.defineProperty(vr, "__esModule", { value: !0 });
const Kd = vt, Hd = xn, Xd = _t, Wd = Zn, Bd = Qn, Jd = _r, Yd = es, xd = Er, Zd = ts, Qd = rs, ef = ns, tf = ss, rf = as, nf = os, sf = is, af = cs;
function of(e = !1) {
  const t = [
    // any
    ef.default,
    tf.default,
    rf.default,
    nf.default,
    sf.default,
    af.default,
    // object
    Yd.default,
    xd.default,
    Jd.default,
    Zd.default,
    Qd.default
  ];
  return e ? t.push(Hd.default, Wd.default) : t.push(Kd.default, Xd.default), t.push(Bd.default), t;
}
vr.default = of;
var ls = {}, Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.dynamicAnchor = void 0;
const xr = U, cf = ve, oa = he, lf = ze, uf = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => Go(e, e.schema)
};
function Go(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const s = (0, xr._)`${cf.default.dynamicAnchors}${(0, xr.getProperty)(t)}`, a = n.errSchemaPath === "#" ? n.validateName : df(e);
  r.if((0, xr._)`!${s}`, () => r.assign(s, a));
}
Et.dynamicAnchor = Go;
function df(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: s, baseId: a, localRefs: o, meta: l } = t.root, { schemaId: c } = n.opts, i = new oa.SchemaEnv({ schema: r, schemaId: c, root: s, baseId: a, localRefs: o, meta: l });
  return oa.compileSchema.call(n, i), (0, lf.getValidate)(e, i);
}
Et.default = uf;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
wt.dynamicRef = void 0;
const ia = U, ff = ve, ca = ze, hf = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Ko(e, e.schema)
};
function Ko(e, t) {
  const { gen: r, keyword: n, it: s } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const a = t.slice(1);
  if (s.allErrors)
    o();
  else {
    const c = r.let("valid", !1);
    o(c), e.ok(c);
  }
  function o(c) {
    if (s.schemaEnv.root.dynamicAnchors[a]) {
      const i = r.let("_v", (0, ia._)`${ff.default.dynamicAnchors}${(0, ia.getProperty)(a)}`);
      r.if(i, l(i, c), l(s.validateName, c));
    } else
      l(s.validateName, c)();
  }
  function l(c, i) {
    return i ? () => r.block(() => {
      (0, ca.callRef)(e, c), r.let(i, !0);
    }) : () => (0, ca.callRef)(e, c);
  }
}
wt.dynamicRef = Ko;
wt.default = hf;
var us = {};
Object.defineProperty(us, "__esModule", { value: !0 });
const mf = Et, pf = T, $f = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, mf.dynamicAnchor)(e, "") : (0, pf.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
us.default = $f;
var ds = {};
Object.defineProperty(ds, "__esModule", { value: !0 });
const yf = wt, gf = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, yf.dynamicRef)(e, e.schema)
};
ds.default = gf;
Object.defineProperty(ls, "__esModule", { value: !0 });
const vf = Et, _f = wt, Ef = us, wf = ds, Sf = [vf.default, _f.default, Ef.default, wf.default];
ls.default = Sf;
var fs = {}, hs = {};
Object.defineProperty(hs, "__esModule", { value: !0 });
const la = _r, bf = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: la.error,
  code: (e) => (0, la.validatePropertyDeps)(e)
};
hs.default = bf;
var ms = {};
Object.defineProperty(ms, "__esModule", { value: !0 });
const Pf = _r, Rf = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Pf.validateSchemaDeps)(e)
};
ms.default = Rf;
var ps = {};
Object.defineProperty(ps, "__esModule", { value: !0 });
const If = T, Nf = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, If.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
ps.default = Nf;
Object.defineProperty(fs, "__esModule", { value: !0 });
const Of = hs, Tf = ms, jf = ps, Af = [Of.default, Tf.default, jf.default];
fs.default = Af;
var $s = {}, ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
const He = U, ua = T, kf = ve, Cf = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, He._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, Df = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: Cf,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: s, it: a } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, props: l } = a;
    l instanceof He.Name ? t.if((0, He._)`${l} !== true`, () => t.forIn("key", n, (f) => t.if(i(l, f), () => c(f)))) : l !== !0 && t.forIn("key", n, (f) => l === void 0 ? c(f) : t.if(d(l, f), () => c(f))), a.props = !0, e.ok((0, He._)`${s} === ${kf.default.errors}`);
    function c(f) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: f }), e.error(), o || t.break();
        return;
      }
      if (!(0, ua.alwaysValidSchema)(a, r)) {
        const _ = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: f,
          dataPropType: ua.Type.Str
        }, _), o || t.if((0, He.not)(_), () => t.break());
      }
    }
    function i(f, _) {
      return (0, He._)`!${f} || !${f}[${_}]`;
    }
    function d(f, _) {
      const y = [];
      for (const p in f)
        f[p] === !0 && y.push((0, He._)`${_} !== ${p}`);
      return (0, He.and)(...y);
    }
  }
};
ys.default = Df;
var gs = {};
Object.defineProperty(gs, "__esModule", { value: !0 });
const rt = U, da = T, Lf = {
  message: ({ params: { len: e } }) => (0, rt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, rt._)`{limit: ${e}}`
}, Mf = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: Lf,
  code(e) {
    const { gen: t, schema: r, data: n, it: s } = e, a = s.items || 0;
    if (a === !0)
      return;
    const o = t.const("len", (0, rt._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: a }), e.fail((0, rt._)`${o} > ${a}`);
    else if (typeof r == "object" && !(0, da.alwaysValidSchema)(s, r)) {
      const c = t.var("valid", (0, rt._)`${o} <= ${a}`);
      t.if((0, rt.not)(c), () => l(c, a)), e.ok(c);
    }
    s.items = !0;
    function l(c, i) {
      t.forRange("i", i, o, (d) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: d, dataPropType: da.Type.Num }, c), s.allErrors || t.if((0, rt.not)(c), () => t.break());
      });
    }
  }
};
gs.default = Mf;
Object.defineProperty($s, "__esModule", { value: !0 });
const Vf = ys, zf = gs, Ff = [Vf.default, zf.default];
$s.default = Ff;
var wr = {}, vs = {};
Object.defineProperty(vs, "__esModule", { value: !0 });
const re = U, Uf = {
  message: ({ schemaCode: e }) => (0, re.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, re._)`{format: ${e}}`
}, qf = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Uf,
  code(e, t) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: l } = e, { opts: c, errSchemaPath: i, schemaEnv: d, self: f } = l;
    if (!c.validateFormats)
      return;
    s ? _() : y();
    function _() {
      const p = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), S = r.const("fDef", (0, re._)`${p}[${o}]`), v = r.let("fType"), m = r.let("format");
      r.if((0, re._)`typeof ${S} == "object" && !(${S} instanceof RegExp)`, () => r.assign(v, (0, re._)`${S}.type || "string"`).assign(m, (0, re._)`${S}.validate`), () => r.assign(v, (0, re._)`"string"`).assign(m, S)), e.fail$data((0, re.or)(w(), R()));
      function w() {
        return c.strictSchema === !1 ? re.nil : (0, re._)`${o} && !${m}`;
      }
      function R() {
        const O = d.$async ? (0, re._)`(${S}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, re._)`${m}(${n})`, j = (0, re._)`(typeof ${m} == "function" ? ${O} : ${m}.test(${n}))`;
        return (0, re._)`${m} && ${m} !== true && ${v} === ${t} && !${j}`;
      }
    }
    function y() {
      const p = f.formats[a];
      if (!p) {
        w();
        return;
      }
      if (p === !0)
        return;
      const [S, v, m] = R(p);
      S === t && e.pass(O());
      function w() {
        if (c.strictSchema === !1) {
          f.logger.warn(j());
          return;
        }
        throw new Error(j());
        function j() {
          return `unknown format "${a}" ignored in schema at path "${i}"`;
        }
      }
      function R(j) {
        const B = j instanceof RegExp ? (0, re.regexpCode)(j) : c.code.formats ? (0, re._)`${c.code.formats}${(0, re.getProperty)(a)}` : void 0, te = r.scopeValue("formats", { key: a, ref: j, code: B });
        return typeof j == "object" && !(j instanceof RegExp) ? [j.type || "string", j.validate, (0, re._)`${te}.validate`] : ["string", j, te];
      }
      function O() {
        if (typeof p == "object" && !(p instanceof RegExp) && p.async) {
          if (!d.$async)
            throw new Error("async format in sync schema");
          return (0, re._)`await ${m}(${n})`;
        }
        return typeof v == "function" ? (0, re._)`${m}(${n})` : (0, re._)`${m}.test(${n})`;
      }
    }
  }
};
vs.default = qf;
Object.defineProperty(wr, "__esModule", { value: !0 });
const Gf = vs, Kf = [Gf.default];
wr.default = Kf;
var at = {};
Object.defineProperty(at, "__esModule", { value: !0 });
at.contentVocabulary = at.metadataVocabulary = void 0;
at.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
at.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Vn, "__esModule", { value: !0 });
const Hf = yr, Xf = gr, Wf = vr, Bf = ls, Jf = fs, Yf = $s, xf = wr, fa = at, Zf = [
  Bf.default,
  Hf.default,
  Xf.default,
  (0, Wf.default)(!0),
  xf.default,
  fa.metadataVocabulary,
  fa.contentVocabulary,
  Jf.default,
  Yf.default
];
Vn.default = Zf;
var Sr = {}, br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.DiscrError = void 0;
var ha;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(ha || (br.DiscrError = ha = {}));
Object.defineProperty(Sr, "__esModule", { value: !0 });
const ht = U, pn = br, ma = he, Qf = ot, eh = T, th = {
  message: ({ params: { discrError: e, tagName: t } }) => e === pn.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, ht._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, rh = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: th,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: s, it: a } = e, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = n.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), i = t.const("tag", (0, ht._)`${r}${(0, ht.getProperty)(l)}`);
    t.if((0, ht._)`typeof ${i} == "string"`, () => d(), () => e.error(!1, { discrError: pn.DiscrError.Tag, tag: i, tagName: l })), e.ok(c);
    function d() {
      const y = _();
      t.if(!1);
      for (const p in y)
        t.elseIf((0, ht._)`${i} === ${p}`), t.assign(c, f(y[p]));
      t.else(), e.error(!1, { discrError: pn.DiscrError.Mapping, tag: i, tagName: l }), t.endIf();
    }
    function f(y) {
      const p = t.name("valid"), S = e.subschema({ keyword: "oneOf", schemaProp: y }, p);
      return e.mergeEvaluated(S, ht.Name), p;
    }
    function _() {
      var y;
      const p = {}, S = m(s);
      let v = !0;
      for (let O = 0; O < o.length; O++) {
        let j = o[O];
        if (j != null && j.$ref && !(0, eh.schemaHasRulesButRef)(j, a.self.RULES)) {
          const te = j.$ref;
          if (j = ma.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, te), j instanceof ma.SchemaEnv && (j = j.schema), j === void 0)
            throw new Qf.default(a.opts.uriResolver, a.baseId, te);
        }
        const B = (y = j == null ? void 0 : j.properties) === null || y === void 0 ? void 0 : y[l];
        if (typeof B != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        v = v && (S || m(j)), w(B, O);
      }
      if (!v)
        throw new Error(`discriminator: "${l}" must be required`);
      return p;
      function m({ required: O }) {
        return Array.isArray(O) && O.includes(l);
      }
      function w(O, j) {
        if (O.const)
          R(O.const, j);
        else if (O.enum)
          for (const B of O.enum)
            R(B, j);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function R(O, j) {
        if (typeof O != "string" || O in p)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        p[O] = j;
      }
    }
  }
};
Sr.default = rh;
var _s = {};
const nh = "https://json-schema.org/draft/2020-12/schema", sh = "https://json-schema.org/draft/2020-12/schema", ah = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, oh = "meta", ih = "Core and Validation specifications meta-schema", ch = [
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
], lh = [
  "object",
  "boolean"
], uh = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", dh = {
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
}, fh = {
  $schema: nh,
  $id: sh,
  $vocabulary: ah,
  $dynamicAnchor: oh,
  title: ih,
  allOf: ch,
  type: lh,
  $comment: uh,
  properties: dh
}, hh = "https://json-schema.org/draft/2020-12/schema", mh = "https://json-schema.org/draft/2020-12/meta/applicator", ph = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, $h = "meta", yh = "Applicator vocabulary meta-schema", gh = [
  "object",
  "boolean"
], vh = {
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
}, _h = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, Eh = {
  $schema: hh,
  $id: mh,
  $vocabulary: ph,
  $dynamicAnchor: $h,
  title: yh,
  type: gh,
  properties: vh,
  $defs: _h
}, wh = "https://json-schema.org/draft/2020-12/schema", Sh = "https://json-schema.org/draft/2020-12/meta/unevaluated", bh = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, Ph = "meta", Rh = "Unevaluated applicator vocabulary meta-schema", Ih = [
  "object",
  "boolean"
], Nh = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, Oh = {
  $schema: wh,
  $id: Sh,
  $vocabulary: bh,
  $dynamicAnchor: Ph,
  title: Rh,
  type: Ih,
  properties: Nh
}, Th = "https://json-schema.org/draft/2020-12/schema", jh = "https://json-schema.org/draft/2020-12/meta/content", Ah = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, kh = "meta", Ch = "Content vocabulary meta-schema", Dh = [
  "object",
  "boolean"
], Lh = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, Mh = {
  $schema: Th,
  $id: jh,
  $vocabulary: Ah,
  $dynamicAnchor: kh,
  title: Ch,
  type: Dh,
  properties: Lh
}, Vh = "https://json-schema.org/draft/2020-12/schema", zh = "https://json-schema.org/draft/2020-12/meta/core", Fh = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, Uh = "meta", qh = "Core vocabulary meta-schema", Gh = [
  "object",
  "boolean"
], Kh = {
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
}, Hh = {
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
}, Xh = {
  $schema: Vh,
  $id: zh,
  $vocabulary: Fh,
  $dynamicAnchor: Uh,
  title: qh,
  type: Gh,
  properties: Kh,
  $defs: Hh
}, Wh = "https://json-schema.org/draft/2020-12/schema", Bh = "https://json-schema.org/draft/2020-12/meta/format-annotation", Jh = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, Yh = "meta", xh = "Format vocabulary meta-schema for annotation results", Zh = [
  "object",
  "boolean"
], Qh = {
  format: {
    type: "string"
  }
}, em = {
  $schema: Wh,
  $id: Bh,
  $vocabulary: Jh,
  $dynamicAnchor: Yh,
  title: xh,
  type: Zh,
  properties: Qh
}, tm = "https://json-schema.org/draft/2020-12/schema", rm = "https://json-schema.org/draft/2020-12/meta/meta-data", nm = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, sm = "meta", am = "Meta-data vocabulary meta-schema", om = [
  "object",
  "boolean"
], im = {
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
}, cm = {
  $schema: tm,
  $id: rm,
  $vocabulary: nm,
  $dynamicAnchor: sm,
  title: am,
  type: om,
  properties: im
}, lm = "https://json-schema.org/draft/2020-12/schema", um = "https://json-schema.org/draft/2020-12/meta/validation", dm = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, fm = "meta", hm = "Validation vocabulary meta-schema", mm = [
  "object",
  "boolean"
], pm = {
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
}, $m = {
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
}, ym = {
  $schema: lm,
  $id: um,
  $vocabulary: dm,
  $dynamicAnchor: fm,
  title: hm,
  type: mm,
  properties: pm,
  $defs: $m
};
Object.defineProperty(_s, "__esModule", { value: !0 });
const gm = fh, vm = Eh, _m = Oh, Em = Mh, wm = Xh, Sm = em, bm = cm, Pm = ym, Rm = ["/properties"];
function Im(e) {
  return [
    gm,
    vm,
    _m,
    Em,
    wm,
    t(this, Sm),
    bm,
    t(this, Pm)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, Rm) : n;
  }
}
_s.default = Im;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = Sn, n = Vn, s = Sr, a = _s, o = "https://json-schema.org/draft/2020-12/schema";
  class l extends r.default {
    constructor(y = {}) {
      super({
        ...y,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: y, meta: p } = this.opts;
      p && (a.default.call(this, y), this.refs["http://json-schema.org/schema"] = o);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  t.Ajv2020 = l, e.exports = t = l, e.exports.Ajv2020 = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var c = we;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var i = U;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return i._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return i.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return i.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return i.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return i.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return i.CodeGen;
  } });
  var d = gt;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return d.default;
  } });
  var f = ot;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(on, on.exports);
var Nm = on.exports, $n = { exports: {} }, Ho = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(z, q) {
    return { validate: z, compare: q };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(a, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), i),
    "date-time": t(_(!0), y),
    "iso-time": t(c(), d),
    "iso-date-time": t(_(), p),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: m,
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
    regex: Se,
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
    byte: R,
    // signed 32 bit integer
    int32: { type: "number", validate: B },
    // signed 64 bit integer
    int64: { type: "number", validate: te },
    // C-type float
    float: { type: "number", validate: pe },
    // C-type double
    double: { type: "number", validate: pe },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, i),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, y),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, p),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(z) {
    return z % 4 === 0 && (z % 100 !== 0 || z % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(z) {
    const q = n.exec(z);
    if (!q)
      return !1;
    const x = +q[1], I = +q[2], N = +q[3];
    return I >= 1 && I <= 12 && N >= 1 && N <= (I === 2 && r(x) ? 29 : s[I]);
  }
  function o(z, q) {
    if (z && q)
      return z > q ? 1 : z < q ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(z) {
    return function(x) {
      const I = l.exec(x);
      if (!I)
        return !1;
      const N = +I[1], C = +I[2], A = +I[3], V = I[4], k = I[5] === "-" ? -1 : 1, P = +(I[6] || 0), $ = +(I[7] || 0);
      if (P > 23 || $ > 59 || z && !V)
        return !1;
      if (N <= 23 && C <= 59 && A < 60)
        return !0;
      const E = C - $ * k, g = N - P * k - (E < 0 ? 1 : 0);
      return (g === 23 || g === -1) && (E === 59 || E === -1) && A < 61;
    };
  }
  function i(z, q) {
    if (!(z && q))
      return;
    const x = (/* @__PURE__ */ new Date("2020-01-01T" + z)).valueOf(), I = (/* @__PURE__ */ new Date("2020-01-01T" + q)).valueOf();
    if (x && I)
      return x - I;
  }
  function d(z, q) {
    if (!(z && q))
      return;
    const x = l.exec(z), I = l.exec(q);
    if (x && I)
      return z = x[1] + x[2] + x[3], q = I[1] + I[2] + I[3], z > q ? 1 : z < q ? -1 : 0;
  }
  const f = /t|\s/i;
  function _(z) {
    const q = c(z);
    return function(I) {
      const N = I.split(f);
      return N.length === 2 && a(N[0]) && q(N[1]);
    };
  }
  function y(z, q) {
    if (!(z && q))
      return;
    const x = new Date(z).valueOf(), I = new Date(q).valueOf();
    if (x && I)
      return x - I;
  }
  function p(z, q) {
    if (!(z && q))
      return;
    const [x, I] = z.split(f), [N, C] = q.split(f), A = o(x, N);
    if (A !== void 0)
      return A || i(I, C);
  }
  const S = /\/|:/, v = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(z) {
    return S.test(z) && v.test(z);
  }
  const w = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function R(z) {
    return w.lastIndex = 0, w.test(z);
  }
  const O = -(2 ** 31), j = 2 ** 31 - 1;
  function B(z) {
    return Number.isInteger(z) && z <= j && z >= O;
  }
  function te(z) {
    return Number.isInteger(z);
  }
  function pe() {
    return !0;
  }
  const _e = /[^\\]\\Z/;
  function Se(z) {
    if (_e.test(z))
      return !1;
    try {
      return new RegExp(z), !0;
    } catch {
      return !1;
    }
  }
})(Ho);
var Xo = {}, yn = { exports: {} }, Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
const Om = yr, Tm = gr, jm = vr, Am = wr, pa = at, km = [
  Om.default,
  Tm.default,
  (0, jm.default)(),
  Am.default,
  pa.metadataVocabulary,
  pa.contentVocabulary
];
Es.default = km;
const Cm = "http://json-schema.org/draft-07/schema#", Dm = "http://json-schema.org/draft-07/schema#", Lm = "Core schema meta-schema", Mm = {
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
}, Vm = [
  "object",
  "boolean"
], zm = {
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
}, Fm = {
  $schema: Cm,
  $id: Dm,
  title: Lm,
  definitions: Mm,
  type: Vm,
  properties: zm,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = Sn, n = Es, s = Sr, a = Fm, o = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((p) => this.addVocabulary(p)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const p = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(p, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var i = we;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return i.KeywordCxt;
  } });
  var d = U;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return d._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return d.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return d.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return d.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return d.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return d.CodeGen;
  } });
  var f = gt;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var _ = ot;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return _.default;
  } });
})(yn, yn.exports);
var Um = yn.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Um, r = U, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: l, schemaCode: c }) => (0, r.str)`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => (0, r._)`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(l) {
      const { gen: c, data: i, schemaCode: d, keyword: f, it: _ } = l, { opts: y, self: p } = _;
      if (!y.validateFormats)
        return;
      const S = new t.KeywordCxt(_, p.RULES.all.format.definition, "format");
      S.$data ? v() : m();
      function v() {
        const R = c.scopeValue("formats", {
          ref: p.formats,
          code: y.code.formats
        }), O = c.const("fmt", (0, r._)`${R}[${S.schemaCode}]`);
        l.fail$data((0, r.or)((0, r._)`typeof ${O} != "object"`, (0, r._)`${O} instanceof RegExp`, (0, r._)`typeof ${O}.compare != "function"`, w(O)));
      }
      function m() {
        const R = S.schema, O = p.formats[R];
        if (!O || O === !0)
          return;
        if (typeof O != "object" || O instanceof RegExp || typeof O.compare != "function")
          throw new Error(`"${f}": format "${R}" does not define "compare" function`);
        const j = c.scopeValue("formats", {
          key: R,
          ref: O,
          code: y.code.formats ? (0, r._)`${y.code.formats}${(0, r.getProperty)(R)}` : void 0
        });
        l.fail$data(w(j));
      }
      function w(R) {
        return (0, r._)`${R}.compare(${i}, ${d}) ${s[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = o;
})(Xo);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Ho, n = Xo, s = U, a = new s.Name("fullFormats"), o = new s.Name("fastFormats"), l = (i, d = { keywords: !0 }) => {
    if (Array.isArray(d))
      return c(i, d, r.fullFormats, a), i;
    const [f, _] = d.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], y = d.formats || r.formatNames;
    return c(i, y, f, _), d.keywords && (0, n.default)(i), i;
  };
  l.get = (i, d = "full") => {
    const _ = (d === "fast" ? r.fastFormats : r.fullFormats)[i];
    if (!_)
      throw new Error(`Unknown format "${i}"`);
    return _;
  };
  function c(i, d, f, _) {
    var y, p;
    (y = (p = i.opts.code).formats) !== null && y !== void 0 || (p.formats = (0, s._)`require("ajv-formats/dist/formats").${_}`);
    for (const S of d)
      i.addFormat(S, f[S]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})($n, $n.exports);
var qm = $n.exports;
const Gm = /* @__PURE__ */ Wa(qm), Km = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, r), a = Object.getOwnPropertyDescriptor(t, r);
  !Hm(s, a) && n || Object.defineProperty(e, r, a);
}, Hm = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, Xm = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Wm = (e, t) => `/* Wrapped ${e}*/
${t}`, Bm = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Jm = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), Ym = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = Wm.bind(null, n, t.toString());
  Object.defineProperty(s, "name", Jm);
  const { writable: a, enumerable: o, configurable: l } = Bm;
  Object.defineProperty(e, "toString", { value: s, writable: a, enumerable: o, configurable: l });
};
function xm(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const s of Reflect.ownKeys(t))
    Km(e, t, s, r);
  return Xm(e, t), Ym(e, t, n), e;
}
const $a = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: s = !1,
    after: a = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!s && !a)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, l, c;
  const i = function(...d) {
    const f = this, _ = () => {
      o = void 0, l && (clearTimeout(l), l = void 0), a && (c = e.apply(f, d));
    }, y = () => {
      l = void 0, o && (clearTimeout(o), o = void 0), a && (c = e.apply(f, d));
    }, p = s && !o;
    return clearTimeout(o), o = setTimeout(_, r), n > 0 && n !== Number.POSITIVE_INFINITY && !l && (l = setTimeout(y, n)), p && (c = e.apply(f, d)), c;
  };
  return xm(i, e), i.cancel = () => {
    o && (clearTimeout(o), o = void 0), l && (clearTimeout(l), l = void 0);
  }, i;
};
var gn = { exports: {} };
const Zm = "2.0.0", Wo = 256, Qm = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, ep = 16, tp = Wo - 6, rp = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Pr = {
  MAX_LENGTH: Wo,
  MAX_SAFE_COMPONENT_LENGTH: ep,
  MAX_SAFE_BUILD_LENGTH: tp,
  MAX_SAFE_INTEGER: Qm,
  RELEASE_TYPES: rp,
  SEMVER_SPEC_VERSION: Zm,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const np = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Rr = np;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = Pr, a = Rr;
  t = e.exports = {};
  const o = t.re = [], l = t.safeRe = [], c = t.src = [], i = t.t = {};
  let d = 0;
  const f = "[a-zA-Z0-9-]", _ = [
    ["\\s", 1],
    ["\\d", s],
    [f, n]
  ], y = (S) => {
    for (const [v, m] of _)
      S = S.split(`${v}*`).join(`${v}{0,${m}}`).split(`${v}+`).join(`${v}{1,${m}}`);
    return S;
  }, p = (S, v, m) => {
    const w = y(v), R = d++;
    a(S, R, v), i[S] = R, c[R] = v, o[R] = new RegExp(v, m ? "g" : void 0), l[R] = new RegExp(w, m ? "g" : void 0);
  };
  p("NUMERICIDENTIFIER", "0|[1-9]\\d*"), p("NUMERICIDENTIFIERLOOSE", "\\d+"), p("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), p("MAINVERSION", `(${c[i.NUMERICIDENTIFIER]})\\.(${c[i.NUMERICIDENTIFIER]})\\.(${c[i.NUMERICIDENTIFIER]})`), p("MAINVERSIONLOOSE", `(${c[i.NUMERICIDENTIFIERLOOSE]})\\.(${c[i.NUMERICIDENTIFIERLOOSE]})\\.(${c[i.NUMERICIDENTIFIERLOOSE]})`), p("PRERELEASEIDENTIFIER", `(?:${c[i.NUMERICIDENTIFIER]}|${c[i.NONNUMERICIDENTIFIER]})`), p("PRERELEASEIDENTIFIERLOOSE", `(?:${c[i.NUMERICIDENTIFIERLOOSE]}|${c[i.NONNUMERICIDENTIFIER]})`), p("PRERELEASE", `(?:-(${c[i.PRERELEASEIDENTIFIER]}(?:\\.${c[i.PRERELEASEIDENTIFIER]})*))`), p("PRERELEASELOOSE", `(?:-?(${c[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[i.PRERELEASEIDENTIFIERLOOSE]})*))`), p("BUILDIDENTIFIER", `${f}+`), p("BUILD", `(?:\\+(${c[i.BUILDIDENTIFIER]}(?:\\.${c[i.BUILDIDENTIFIER]})*))`), p("FULLPLAIN", `v?${c[i.MAINVERSION]}${c[i.PRERELEASE]}?${c[i.BUILD]}?`), p("FULL", `^${c[i.FULLPLAIN]}$`), p("LOOSEPLAIN", `[v=\\s]*${c[i.MAINVERSIONLOOSE]}${c[i.PRERELEASELOOSE]}?${c[i.BUILD]}?`), p("LOOSE", `^${c[i.LOOSEPLAIN]}$`), p("GTLT", "((?:<|>)?=?)"), p("XRANGEIDENTIFIERLOOSE", `${c[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), p("XRANGEIDENTIFIER", `${c[i.NUMERICIDENTIFIER]}|x|X|\\*`), p("XRANGEPLAIN", `[v=\\s]*(${c[i.XRANGEIDENTIFIER]})(?:\\.(${c[i.XRANGEIDENTIFIER]})(?:\\.(${c[i.XRANGEIDENTIFIER]})(?:${c[i.PRERELEASE]})?${c[i.BUILD]}?)?)?`), p("XRANGEPLAINLOOSE", `[v=\\s]*(${c[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[i.XRANGEIDENTIFIERLOOSE]})(?:${c[i.PRERELEASELOOSE]})?${c[i.BUILD]}?)?)?`), p("XRANGE", `^${c[i.GTLT]}\\s*${c[i.XRANGEPLAIN]}$`), p("XRANGELOOSE", `^${c[i.GTLT]}\\s*${c[i.XRANGEPLAINLOOSE]}$`), p("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), p("COERCE", `${c[i.COERCEPLAIN]}(?:$|[^\\d])`), p("COERCEFULL", c[i.COERCEPLAIN] + `(?:${c[i.PRERELEASE]})?(?:${c[i.BUILD]})?(?:$|[^\\d])`), p("COERCERTL", c[i.COERCE], !0), p("COERCERTLFULL", c[i.COERCEFULL], !0), p("LONETILDE", "(?:~>?)"), p("TILDETRIM", `(\\s*)${c[i.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", p("TILDE", `^${c[i.LONETILDE]}${c[i.XRANGEPLAIN]}$`), p("TILDELOOSE", `^${c[i.LONETILDE]}${c[i.XRANGEPLAINLOOSE]}$`), p("LONECARET", "(?:\\^)"), p("CARETTRIM", `(\\s*)${c[i.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", p("CARET", `^${c[i.LONECARET]}${c[i.XRANGEPLAIN]}$`), p("CARETLOOSE", `^${c[i.LONECARET]}${c[i.XRANGEPLAINLOOSE]}$`), p("COMPARATORLOOSE", `^${c[i.GTLT]}\\s*(${c[i.LOOSEPLAIN]})$|^$`), p("COMPARATOR", `^${c[i.GTLT]}\\s*(${c[i.FULLPLAIN]})$|^$`), p("COMPARATORTRIM", `(\\s*)${c[i.GTLT]}\\s*(${c[i.LOOSEPLAIN]}|${c[i.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", p("HYPHENRANGE", `^\\s*(${c[i.XRANGEPLAIN]})\\s+-\\s+(${c[i.XRANGEPLAIN]})\\s*$`), p("HYPHENRANGELOOSE", `^\\s*(${c[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[i.XRANGEPLAINLOOSE]})\\s*$`), p("STAR", "(<|>)?=?\\s*\\*"), p("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), p("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(gn, gn.exports);
var qt = gn.exports;
const sp = Object.freeze({ loose: !0 }), ap = Object.freeze({}), op = (e) => e ? typeof e != "object" ? sp : e : ap;
var ws = op;
const ya = /^[0-9]+$/, Bo = (e, t) => {
  const r = ya.test(e), n = ya.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, ip = (e, t) => Bo(t, e);
var Jo = {
  compareIdentifiers: Bo,
  rcompareIdentifiers: ip
};
const Jt = Rr, { MAX_LENGTH: ga, MAX_SAFE_INTEGER: Yt } = Pr, { safeRe: va, t: _a } = qt, cp = ws, { compareIdentifiers: ut } = Jo;
let lp = class Oe {
  constructor(t, r) {
    if (r = cp(r), t instanceof Oe) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > ga)
      throw new TypeError(
        `version is longer than ${ga} characters`
      );
    Jt("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? va[_a.LOOSE] : va[_a.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Yt || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Yt || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Yt || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < Yt)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Jt("SemVer.compare", this.version, this.options, t), !(t instanceof Oe)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Oe(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Oe || (t = new Oe(t, this.options)), ut(this.major, t.major) || ut(this.minor, t.minor) || ut(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof Oe || (t = new Oe(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = t.prerelease[r];
      if (Jt("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return ut(n, s);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Oe || (t = new Oe(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = t.build[r];
      if (Jt("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return ut(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
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
        const s = Number(n) ? 1 : 0;
        if (!r && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), ut(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var me = lp;
const Ea = me, up = (e, t, r = !1) => {
  if (e instanceof Ea)
    return e;
  try {
    return new Ea(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var St = up;
const dp = St, fp = (e, t) => {
  const r = dp(e, t);
  return r ? r.version : null;
};
var hp = fp;
const mp = St, pp = (e, t) => {
  const r = mp(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var $p = pp;
const wa = me, yp = (e, t, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new wa(
      e instanceof wa ? e.version : e,
      r
    ).inc(t, n, s).version;
  } catch {
    return null;
  }
};
var gp = yp;
const Sa = St, vp = (e, t) => {
  const r = Sa(e, null, !0), n = Sa(t, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, o = a ? r : n, l = a ? n : r, c = !!o.prerelease.length;
  if (!!l.prerelease.length && !c)
    return !l.patch && !l.minor ? "major" : o.patch ? "patch" : o.minor ? "minor" : "major";
  const d = c ? "pre" : "";
  return r.major !== n.major ? d + "major" : r.minor !== n.minor ? d + "minor" : r.patch !== n.patch ? d + "patch" : "prerelease";
};
var _p = vp;
const Ep = me, wp = (e, t) => new Ep(e, t).major;
var Sp = wp;
const bp = me, Pp = (e, t) => new bp(e, t).minor;
var Rp = Pp;
const Ip = me, Np = (e, t) => new Ip(e, t).patch;
var Op = Np;
const Tp = St, jp = (e, t) => {
  const r = Tp(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Ap = jp;
const ba = me, kp = (e, t, r) => new ba(e, r).compare(new ba(t, r));
var Ie = kp;
const Cp = Ie, Dp = (e, t, r) => Cp(t, e, r);
var Lp = Dp;
const Mp = Ie, Vp = (e, t) => Mp(e, t, !0);
var zp = Vp;
const Pa = me, Fp = (e, t, r) => {
  const n = new Pa(e, r), s = new Pa(t, r);
  return n.compare(s) || n.compareBuild(s);
};
var Ss = Fp;
const Up = Ss, qp = (e, t) => e.sort((r, n) => Up(r, n, t));
var Gp = qp;
const Kp = Ss, Hp = (e, t) => e.sort((r, n) => Kp(n, r, t));
var Xp = Hp;
const Wp = Ie, Bp = (e, t, r) => Wp(e, t, r) > 0;
var Ir = Bp;
const Jp = Ie, Yp = (e, t, r) => Jp(e, t, r) < 0;
var bs = Yp;
const xp = Ie, Zp = (e, t, r) => xp(e, t, r) === 0;
var Yo = Zp;
const Qp = Ie, e$ = (e, t, r) => Qp(e, t, r) !== 0;
var xo = e$;
const t$ = Ie, r$ = (e, t, r) => t$(e, t, r) >= 0;
var Ps = r$;
const n$ = Ie, s$ = (e, t, r) => n$(e, t, r) <= 0;
var Rs = s$;
const a$ = Yo, o$ = xo, i$ = Ir, c$ = Ps, l$ = bs, u$ = Rs, d$ = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return a$(e, r, n);
    case "!=":
      return o$(e, r, n);
    case ">":
      return i$(e, r, n);
    case ">=":
      return c$(e, r, n);
    case "<":
      return l$(e, r, n);
    case "<=":
      return u$(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Zo = d$;
const f$ = me, h$ = St, { safeRe: xt, t: Zt } = qt, m$ = (e, t) => {
  if (e instanceof f$)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? xt[Zt.COERCEFULL] : xt[Zt.COERCE]);
  else {
    const c = t.includePrerelease ? xt[Zt.COERCERTLFULL] : xt[Zt.COERCERTL];
    let i;
    for (; (i = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || i.index + i[0].length !== r.index + r[0].length) && (r = i), c.lastIndex = i.index + i[1].length + i[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", l = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return h$(`${n}.${s}.${a}${o}${l}`, t);
};
var p$ = m$;
class $$ {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var y$ = $$, Zr, Ra;
function Ne() {
  if (Ra) return Zr;
  Ra = 1;
  const e = /\s+/g;
  class t {
    constructor(N, C) {
      if (C = s(C), N instanceof t)
        return N.loose === !!C.loose && N.includePrerelease === !!C.includePrerelease ? N : new t(N.raw, C);
      if (N instanceof a)
        return this.raw = N.value, this.set = [[N]], this.formatted = void 0, this;
      if (this.options = C, this.loose = !!C.loose, this.includePrerelease = !!C.includePrerelease, this.raw = N.trim().replace(e, " "), this.set = this.raw.split("||").map((A) => this.parseRange(A.trim())).filter((A) => A.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const A = this.set[0];
        if (this.set = this.set.filter((V) => !S(V[0])), this.set.length === 0)
          this.set = [A];
        else if (this.set.length > 1) {
          for (const V of this.set)
            if (V.length === 1 && v(V[0])) {
              this.set = [V];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let N = 0; N < this.set.length; N++) {
          N > 0 && (this.formatted += "||");
          const C = this.set[N];
          for (let A = 0; A < C.length; A++)
            A > 0 && (this.formatted += " "), this.formatted += C[A].toString().trim();
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
    parseRange(N) {
      const A = ((this.options.includePrerelease && y) | (this.options.loose && p)) + ":" + N, V = n.get(A);
      if (V)
        return V;
      const k = this.options.loose, P = k ? c[i.HYPHENRANGELOOSE] : c[i.HYPHENRANGE];
      N = N.replace(P, q(this.options.includePrerelease)), o("hyphen replace", N), N = N.replace(c[i.COMPARATORTRIM], d), o("comparator trim", N), N = N.replace(c[i.TILDETRIM], f), o("tilde trim", N), N = N.replace(c[i.CARETTRIM], _), o("caret trim", N);
      let $ = N.split(" ").map((h) => w(h, this.options)).join(" ").split(/\s+/).map((h) => z(h, this.options));
      k && ($ = $.filter((h) => (o("loose invalid filter", h, this.options), !!h.match(c[i.COMPARATORLOOSE])))), o("range list", $);
      const E = /* @__PURE__ */ new Map(), g = $.map((h) => new a(h, this.options));
      for (const h of g) {
        if (S(h))
          return [h];
        E.set(h.value, h);
      }
      E.size > 1 && E.has("") && E.delete("");
      const u = [...E.values()];
      return n.set(A, u), u;
    }
    intersects(N, C) {
      if (!(N instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((A) => m(A, C) && N.set.some((V) => m(V, C) && A.every((k) => V.every((P) => k.intersects(P, C)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(N) {
      if (!N)
        return !1;
      if (typeof N == "string")
        try {
          N = new l(N, this.options);
        } catch {
          return !1;
        }
      for (let C = 0; C < this.set.length; C++)
        if (x(this.set[C], N, this.options))
          return !0;
      return !1;
    }
  }
  Zr = t;
  const r = y$, n = new r(), s = ws, a = Nr(), o = Rr, l = me, {
    safeRe: c,
    t: i,
    comparatorTrimReplace: d,
    tildeTrimReplace: f,
    caretTrimReplace: _
  } = qt, { FLAG_INCLUDE_PRERELEASE: y, FLAG_LOOSE: p } = Pr, S = (I) => I.value === "<0.0.0-0", v = (I) => I.value === "", m = (I, N) => {
    let C = !0;
    const A = I.slice();
    let V = A.pop();
    for (; C && A.length; )
      C = A.every((k) => V.intersects(k, N)), V = A.pop();
    return C;
  }, w = (I, N) => (o("comp", I, N), I = B(I, N), o("caret", I), I = O(I, N), o("tildes", I), I = pe(I, N), o("xrange", I), I = Se(I, N), o("stars", I), I), R = (I) => !I || I.toLowerCase() === "x" || I === "*", O = (I, N) => I.trim().split(/\s+/).map((C) => j(C, N)).join(" "), j = (I, N) => {
    const C = N.loose ? c[i.TILDELOOSE] : c[i.TILDE];
    return I.replace(C, (A, V, k, P, $) => {
      o("tilde", I, A, V, k, P, $);
      let E;
      return R(V) ? E = "" : R(k) ? E = `>=${V}.0.0 <${+V + 1}.0.0-0` : R(P) ? E = `>=${V}.${k}.0 <${V}.${+k + 1}.0-0` : $ ? (o("replaceTilde pr", $), E = `>=${V}.${k}.${P}-${$} <${V}.${+k + 1}.0-0`) : E = `>=${V}.${k}.${P} <${V}.${+k + 1}.0-0`, o("tilde return", E), E;
    });
  }, B = (I, N) => I.trim().split(/\s+/).map((C) => te(C, N)).join(" "), te = (I, N) => {
    o("caret", I, N);
    const C = N.loose ? c[i.CARETLOOSE] : c[i.CARET], A = N.includePrerelease ? "-0" : "";
    return I.replace(C, (V, k, P, $, E) => {
      o("caret", I, V, k, P, $, E);
      let g;
      return R(k) ? g = "" : R(P) ? g = `>=${k}.0.0${A} <${+k + 1}.0.0-0` : R($) ? k === "0" ? g = `>=${k}.${P}.0${A} <${k}.${+P + 1}.0-0` : g = `>=${k}.${P}.0${A} <${+k + 1}.0.0-0` : E ? (o("replaceCaret pr", E), k === "0" ? P === "0" ? g = `>=${k}.${P}.${$}-${E} <${k}.${P}.${+$ + 1}-0` : g = `>=${k}.${P}.${$}-${E} <${k}.${+P + 1}.0-0` : g = `>=${k}.${P}.${$}-${E} <${+k + 1}.0.0-0`) : (o("no pr"), k === "0" ? P === "0" ? g = `>=${k}.${P}.${$}${A} <${k}.${P}.${+$ + 1}-0` : g = `>=${k}.${P}.${$}${A} <${k}.${+P + 1}.0-0` : g = `>=${k}.${P}.${$} <${+k + 1}.0.0-0`), o("caret return", g), g;
    });
  }, pe = (I, N) => (o("replaceXRanges", I, N), I.split(/\s+/).map((C) => _e(C, N)).join(" ")), _e = (I, N) => {
    I = I.trim();
    const C = N.loose ? c[i.XRANGELOOSE] : c[i.XRANGE];
    return I.replace(C, (A, V, k, P, $, E) => {
      o("xRange", I, A, V, k, P, $, E);
      const g = R(k), u = g || R(P), h = u || R($), b = h;
      return V === "=" && b && (V = ""), E = N.includePrerelease ? "-0" : "", g ? V === ">" || V === "<" ? A = "<0.0.0-0" : A = "*" : V && b ? (u && (P = 0), $ = 0, V === ">" ? (V = ">=", u ? (k = +k + 1, P = 0, $ = 0) : (P = +P + 1, $ = 0)) : V === "<=" && (V = "<", u ? k = +k + 1 : P = +P + 1), V === "<" && (E = "-0"), A = `${V + k}.${P}.${$}${E}`) : u ? A = `>=${k}.0.0${E} <${+k + 1}.0.0-0` : h && (A = `>=${k}.${P}.0${E} <${k}.${+P + 1}.0-0`), o("xRange return", A), A;
    });
  }, Se = (I, N) => (o("replaceStars", I, N), I.trim().replace(c[i.STAR], "")), z = (I, N) => (o("replaceGTE0", I, N), I.trim().replace(c[N.includePrerelease ? i.GTE0PRE : i.GTE0], "")), q = (I) => (N, C, A, V, k, P, $, E, g, u, h, b) => (R(A) ? C = "" : R(V) ? C = `>=${A}.0.0${I ? "-0" : ""}` : R(k) ? C = `>=${A}.${V}.0${I ? "-0" : ""}` : P ? C = `>=${C}` : C = `>=${C}${I ? "-0" : ""}`, R(g) ? E = "" : R(u) ? E = `<${+g + 1}.0.0-0` : R(h) ? E = `<${g}.${+u + 1}.0-0` : b ? E = `<=${g}.${u}.${h}-${b}` : I ? E = `<${g}.${u}.${+h + 1}-0` : E = `<=${E}`, `${C} ${E}`.trim()), x = (I, N, C) => {
    for (let A = 0; A < I.length; A++)
      if (!I[A].test(N))
        return !1;
    if (N.prerelease.length && !C.includePrerelease) {
      for (let A = 0; A < I.length; A++)
        if (o(I[A].semver), I[A].semver !== a.ANY && I[A].semver.prerelease.length > 0) {
          const V = I[A].semver;
          if (V.major === N.major && V.minor === N.minor && V.patch === N.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Zr;
}
var Qr, Ia;
function Nr() {
  if (Ia) return Qr;
  Ia = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(d, f) {
      if (f = r(f), d instanceof t) {
        if (d.loose === !!f.loose)
          return d;
        d = d.value;
      }
      d = d.trim().split(/\s+/).join(" "), o("comparator", d, f), this.options = f, this.loose = !!f.loose, this.parse(d), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(d) {
      const f = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], _ = d.match(f);
      if (!_)
        throw new TypeError(`Invalid comparator: ${d}`);
      this.operator = _[1] !== void 0 ? _[1] : "", this.operator === "=" && (this.operator = ""), _[2] ? this.semver = new l(_[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(d) {
      if (o("Comparator.test", d, this.options.loose), this.semver === e || d === e)
        return !0;
      if (typeof d == "string")
        try {
          d = new l(d, this.options);
        } catch {
          return !1;
        }
      return a(d, this.operator, this.semver, this.options);
    }
    intersects(d, f) {
      if (!(d instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(d.value, f).test(this.value) : d.operator === "" ? d.value === "" ? !0 : new c(this.value, f).test(d.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || d.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || d.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && d.operator.startsWith(">") || this.operator.startsWith("<") && d.operator.startsWith("<") || this.semver.version === d.semver.version && this.operator.includes("=") && d.operator.includes("=") || a(this.semver, "<", d.semver, f) && this.operator.startsWith(">") && d.operator.startsWith("<") || a(this.semver, ">", d.semver, f) && this.operator.startsWith("<") && d.operator.startsWith(">")));
    }
  }
  Qr = t;
  const r = ws, { safeRe: n, t: s } = qt, a = Zo, o = Rr, l = me, c = Ne();
  return Qr;
}
const g$ = Ne(), v$ = (e, t, r) => {
  try {
    t = new g$(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Or = v$;
const _$ = Ne(), E$ = (e, t) => new _$(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var w$ = E$;
const S$ = me, b$ = Ne(), P$ = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new b$(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === -1) && (n = o, s = new S$(n, r));
  }), n;
};
var R$ = P$;
const I$ = me, N$ = Ne(), O$ = (e, t, r) => {
  let n = null, s = null, a = null;
  try {
    a = new N$(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === 1) && (n = o, s = new I$(n, r));
  }), n;
};
var T$ = O$;
const en = me, j$ = Ne(), Na = Ir, A$ = (e, t) => {
  e = new j$(e, t);
  let r = new en("0.0.0");
  if (e.test(r) || (r = new en("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const s = e.set[n];
    let a = null;
    s.forEach((o) => {
      const l = new en(o.semver.version);
      switch (o.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!a || Na(l, a)) && (a = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || Na(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var k$ = A$;
const C$ = Ne(), D$ = (e, t) => {
  try {
    return new C$(e, t).range || "*";
  } catch {
    return null;
  }
};
var L$ = D$;
const M$ = me, Qo = Nr(), { ANY: V$ } = Qo, z$ = Ne(), F$ = Or, Oa = Ir, Ta = bs, U$ = Rs, q$ = Ps, G$ = (e, t, r, n) => {
  e = new M$(e, n), t = new z$(t, n);
  let s, a, o, l, c;
  switch (r) {
    case ">":
      s = Oa, a = U$, o = Ta, l = ">", c = ">=";
      break;
    case "<":
      s = Ta, a = q$, o = Oa, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (F$(e, t, n))
    return !1;
  for (let i = 0; i < t.set.length; ++i) {
    const d = t.set[i];
    let f = null, _ = null;
    if (d.forEach((y) => {
      y.semver === V$ && (y = new Qo(">=0.0.0")), f = f || y, _ = _ || y, s(y.semver, f.semver, n) ? f = y : o(y.semver, _.semver, n) && (_ = y);
    }), f.operator === l || f.operator === c || (!_.operator || _.operator === l) && a(e, _.semver))
      return !1;
    if (_.operator === c && o(e, _.semver))
      return !1;
  }
  return !0;
};
var Is = G$;
const K$ = Is, H$ = (e, t, r) => K$(e, t, ">", r);
var X$ = H$;
const W$ = Is, B$ = (e, t, r) => W$(e, t, "<", r);
var J$ = B$;
const ja = Ne(), Y$ = (e, t, r) => (e = new ja(e, r), t = new ja(t, r), e.intersects(t, r));
var x$ = Y$;
const Z$ = Or, Q$ = Ie;
var ey = (e, t, r) => {
  const n = [];
  let s = null, a = null;
  const o = e.sort((d, f) => Q$(d, f, r));
  for (const d of o)
    Z$(d, t, r) ? (a = d, s || (s = d)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const l = [];
  for (const [d, f] of n)
    d === f ? l.push(d) : !f && d === o[0] ? l.push("*") : f ? d === o[0] ? l.push(`<=${f}`) : l.push(`${d} - ${f}`) : l.push(`>=${d}`);
  const c = l.join(" || "), i = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < i.length ? c : t;
};
const Aa = Ne(), Ns = Nr(), { ANY: tn } = Ns, jt = Or, Os = Ie, ty = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Aa(e, r), t = new Aa(t, r);
  let n = !1;
  e: for (const s of e.set) {
    for (const a of t.set) {
      const o = ny(s, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, ry = [new Ns(">=0.0.0-0")], ka = [new Ns(">=0.0.0")], ny = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === tn) {
    if (t.length === 1 && t[0].semver === tn)
      return !0;
    r.includePrerelease ? e = ry : e = ka;
  }
  if (t.length === 1 && t[0].semver === tn) {
    if (r.includePrerelease)
      return !0;
    t = ka;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const y of e)
    y.operator === ">" || y.operator === ">=" ? s = Ca(s, y, r) : y.operator === "<" || y.operator === "<=" ? a = Da(a, y, r) : n.add(y.semver);
  if (n.size > 1)
    return null;
  let o;
  if (s && a) {
    if (o = Os(s.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const y of n) {
    if (s && !jt(y, String(s), r) || a && !jt(y, String(a), r))
      return null;
    for (const p of t)
      if (!jt(y, String(p), r))
        return !1;
    return !0;
  }
  let l, c, i, d, f = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, _ = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  f && f.prerelease.length === 1 && a.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const y of t) {
    if (d = d || y.operator === ">" || y.operator === ">=", i = i || y.operator === "<" || y.operator === "<=", s) {
      if (_ && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === _.major && y.semver.minor === _.minor && y.semver.patch === _.patch && (_ = !1), y.operator === ">" || y.operator === ">=") {
        if (l = Ca(s, y, r), l === y && l !== s)
          return !1;
      } else if (s.operator === ">=" && !jt(s.semver, String(y), r))
        return !1;
    }
    if (a) {
      if (f && y.semver.prerelease && y.semver.prerelease.length && y.semver.major === f.major && y.semver.minor === f.minor && y.semver.patch === f.patch && (f = !1), y.operator === "<" || y.operator === "<=") {
        if (c = Da(a, y, r), c === y && c !== a)
          return !1;
      } else if (a.operator === "<=" && !jt(a.semver, String(y), r))
        return !1;
    }
    if (!y.operator && (a || s) && o !== 0)
      return !1;
  }
  return !(s && i && !a && o !== 0 || a && d && !s && o !== 0 || _ || f);
}, Ca = (e, t, r) => {
  if (!e)
    return t;
  const n = Os(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Da = (e, t, r) => {
  if (!e)
    return t;
  const n = Os(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var sy = ty;
const rn = qt, La = Pr, ay = me, Ma = Jo, oy = St, iy = hp, cy = $p, ly = gp, uy = _p, dy = Sp, fy = Rp, hy = Op, my = Ap, py = Ie, $y = Lp, yy = zp, gy = Ss, vy = Gp, _y = Xp, Ey = Ir, wy = bs, Sy = Yo, by = xo, Py = Ps, Ry = Rs, Iy = Zo, Ny = p$, Oy = Nr(), Ty = Ne(), jy = Or, Ay = w$, ky = R$, Cy = T$, Dy = k$, Ly = L$, My = Is, Vy = X$, zy = J$, Fy = x$, Uy = ey, qy = sy;
var Gy = {
  parse: oy,
  valid: iy,
  clean: cy,
  inc: ly,
  diff: uy,
  major: dy,
  minor: fy,
  patch: hy,
  prerelease: my,
  compare: py,
  rcompare: $y,
  compareLoose: yy,
  compareBuild: gy,
  sort: vy,
  rsort: _y,
  gt: Ey,
  lt: wy,
  eq: Sy,
  neq: by,
  gte: Py,
  lte: Ry,
  cmp: Iy,
  coerce: Ny,
  Comparator: Oy,
  Range: Ty,
  satisfies: jy,
  toComparators: Ay,
  maxSatisfying: ky,
  minSatisfying: Cy,
  minVersion: Dy,
  validRange: Ly,
  outside: My,
  gtr: Vy,
  ltr: zy,
  intersects: Fy,
  simplifyRange: Uy,
  subset: qy,
  SemVer: ay,
  re: rn.re,
  src: rn.src,
  tokens: rn.t,
  SEMVER_SPEC_VERSION: La.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: La.RELEASE_TYPES,
  compareIdentifiers: Ma.compareIdentifiers,
  rcompareIdentifiers: Ma.rcompareIdentifiers
};
const dt = /* @__PURE__ */ Wa(Gy), Ky = Object.prototype.toString, Hy = "[object Uint8Array]", Xy = "[object ArrayBuffer]";
function ei(e, t, r) {
  return e ? e.constructor === t ? !0 : Ky.call(e) === r : !1;
}
function ti(e) {
  return ei(e, Uint8Array, Hy);
}
function Wy(e) {
  return ei(e, ArrayBuffer, Xy);
}
function By(e) {
  return ti(e) || Wy(e);
}
function Jy(e) {
  if (!ti(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function Yy(e) {
  if (!By(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Va(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((s, a) => s + a.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const s of e)
    Jy(s), r.set(s, n), n += s.length;
  return r;
}
const Qt = {
  utf8: new globalThis.TextDecoder("utf8")
};
function za(e, t = "utf8") {
  return Yy(e), Qt[t] ?? (Qt[t] = new globalThis.TextDecoder(t)), Qt[t].decode(e);
}
function xy(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const Zy = new globalThis.TextEncoder();
function nn(e) {
  return xy(e), Zy.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const Qy = Gm.default, Fa = "aes-256-cbc", ft = () => /* @__PURE__ */ Object.create(null), e0 = (e) => e != null, t0 = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, ar = "__internal__", sn = `${ar}.migrations.version`;
var Be, Ce, ge, De;
class r0 {
  constructor(t = {}) {
    Pt(this, "path");
    Pt(this, "events");
    Rt(this, Be);
    Rt(this, Ce);
    Rt(this, ge);
    Rt(this, De, {});
    Pt(this, "_deserialize", (t) => JSON.parse(t));
    Pt(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!r.cwd) {
      if (!r.projectName)
        throw new Error("Please specify the `projectName` option.");
      r.cwd = Ei(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (It(this, ge, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const o = new Nm.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      Qy(o);
      const l = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      It(this, Be, o.compile(l));
      for (const [c, i] of Object.entries(r.schema ?? {}))
        i != null && i.default && (Q(this, De)[c] = i.default);
    }
    r.defaults && It(this, De, {
      ...Q(this, De),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), It(this, Ce, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = X.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const s = this.store, a = Object.assign(ft(), r.defaults, s);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(a);
    try {
      hi.deepEqual(s, a);
    } catch {
      this.store = a;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if (Q(this, ge).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${ar} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, s = (a, o) => {
      t0(a, o), Q(this, ge).accessPropertiesByDotNotation ? Cs(n, a, o) : n[a] = o;
    };
    if (typeof t == "object") {
      const a = t;
      for (const [o, l] of Object.entries(a))
        s(o, l);
    } else
      s(t, r);
    this.store = n;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(t) {
    return Q(this, ge).accessPropertiesByDotNotation ? yi(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      e0(Q(this, De)[r]) && this.set(r, Q(this, De)[r]);
  }
  delete(t) {
    const { store: r } = this;
    Q(this, ge).accessPropertiesByDotNotation ? $i(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = ft();
    for (const t of Object.keys(Q(this, De)))
      this.reset(t);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const t = K.readFileSync(this.path, Q(this, Ce) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(ft(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), ft();
      if (Q(this, ge).clearInvalidConfig && t.name === "SyntaxError")
        return ft();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      yield [t, r];
  }
  _encryptData(t) {
    if (!Q(this, Ce))
      return typeof t == "string" ? t : za(t);
    try {
      const r = t.slice(0, 16), n = Nt.pbkdf2Sync(Q(this, Ce), r.toString(), 1e4, 32, "sha512"), s = Nt.createDecipheriv(Fa, n, r), a = t.slice(17), o = typeof a == "string" ? nn(a) : a;
      return za(Va([s.update(o), s.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const s = () => {
      const a = n, o = t();
      fi(o, a) || (n = o, r.call(this, o, a));
    };
    return this.events.addEventListener("change", s), () => {
      this.events.removeEventListener("change", s);
    };
  }
  _validate(t) {
    if (!Q(this, Be) || Q(this, Be).call(this, t) || !Q(this, Be).errors)
      return;
    const n = Q(this, Be).errors.map(({ instancePath: s, message: a = "" }) => `\`${s.slice(1)}\` ${a}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    K.mkdirSync(X.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (Q(this, Ce)) {
      const n = Nt.randomBytes(16), s = Nt.pbkdf2Sync(Q(this, Ce), n.toString(), 1e4, 32, "sha512"), a = Nt.createCipheriv(Fa, s, n);
      r = Va([n, nn(":"), a.update(nn(r)), a.final()]);
    }
    if (se.env.SNAP)
      K.writeFileSync(this.path, r, { mode: Q(this, ge).configFileMode });
    else
      try {
        Xa(this.path, r, { mode: Q(this, ge).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          K.writeFileSync(this.path, r, { mode: Q(this, ge).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), K.existsSync(this.path) || this._write(ft()), se.platform === "win32" ? K.watch(this.path, { persistent: !1 }, $a(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : K.watchFile(this.path, { persistent: !1 }, $a(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let s = this._get(sn, "0.0.0");
    const a = Object.keys(t).filter((l) => this._shouldPerformMigration(l, s, r));
    let o = { ...this.store };
    for (const l of a)
      try {
        n && n(this, {
          fromVersion: s,
          toVersion: l,
          finalVersion: r,
          versions: a
        });
        const c = t[l];
        c == null || c(this), this._set(sn, l), s = l, o = { ...this.store };
      } catch (c) {
        throw this.store = o, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(s) || !dt.eq(s, r)) && this._set(sn, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === ar ? !0 : typeof t != "string" ? !1 : Q(this, ge).accessPropertiesByDotNotation ? !!t.startsWith(`${ar}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return dt.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && dt.satisfies(r, t) ? !1 : dt.satisfies(n, t) : !(dt.lte(t, r) || dt.gt(t, n));
  }
  _get(t, r) {
    return pi(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Cs(n, t, r), this.store = n;
  }
}
Be = new WeakMap(), Ce = new WeakMap(), ge = new WeakMap(), De = new WeakMap();
let Ua = !1;
const qa = () => {
  if (!an || !Ye)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Ye.getPath("userData"),
    appVersion: Ye.getVersion()
  };
  return Ua || (an.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Ua = !0), e;
};
class n0 extends r0 {
  constructor(t) {
    let r, n;
    if (se.type === "renderer") {
      const s = ci.ipcRenderer.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else an && Ye && ({ defaultCwd: r, appVersion: n } = qa());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = X.isAbsolute(t.cwd) ? t.cwd : X.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    qa();
  }
  async openInEditor() {
    const t = await li.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
console.log("main.ts");
ui(import.meta.url);
const ri = X.dirname(di(import.meta.url));
n0.initRenderer();
process.env.APP_ROOT = X.join(ri, "..");
const vn = process.env.VITE_DEV_SERVER_URL, p0 = X.join(process.env.APP_ROOT, "dist-electron"), ni = X.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = vn ? X.join(process.env.APP_ROOT, "public") : ni;
let Xe;
function si() {
  Xe = new Ga({
    icon: X.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: X.join(ri, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !1
    },
    width: 1200,
    height: 800
  }), Xe.webContents.on("did-finish-load", () => {
    Xe == null || Xe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), vn ? Xe.loadURL(vn) : Xe.loadFile(X.join(ni, "index.html"));
}
Ye.on("window-all-closed", () => {
  process.platform !== "darwin" && (Ye.quit(), Xe = null);
});
Ye.on("activate", () => {
  Ga.getAllWindows().length === 0 && si();
});
Ye.whenReady().then(si);
export {
  p0 as MAIN_DIST,
  ni as RENDERER_DIST,
  vn as VITE_DEV_SERVER_URL
};
