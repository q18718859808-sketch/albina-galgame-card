// @__NO_SIDE_EFFECTS__
function Ko(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const i of e.split(",")) t[i] = 1;
  return (i) => i in t;
}
const ye = {}, bi = [], It = () => {
}, Mn = () => !1, qa = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), za = (e) => e.startsWith("onUpdate:"), Me = Object.assign, Go = (e, t) => {
  const i = e.indexOf(t);
  i > -1 && e.splice(i, 1);
}, cd = Object.prototype.hasOwnProperty, fe = (e, t) => cd.call(e, t), K = Array.isArray, hi = (e) => ta(e) === "[object Map]", Fa = (e) => ta(e) === "[object Set]", Is = (e) => ta(e) === "[object Date]", te = (e) => typeof e == "function", $e = (e) => typeof e == "string", dt = (e) => typeof e == "symbol", ve = (e) => e !== null && typeof e == "object", Nn = (e) => (ve(e) || te(e)) && te(e.then) && te(e.catch), Ln = Object.prototype.toString, ta = (e) => Ln.call(e), dd = (e) => ta(e).slice(8, -1), Hn = (e) => ta(e) === "[object Object]", Ma = (e) => $e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ri = /* @__PURE__ */ Ko(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Na = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((i) => t[i] || (t[i] = e(i)));
}, ud = /-\w/g, ft = Na(
  (e) => e.replace(ud, (t) => t.slice(1).toUpperCase())
), ld = /\B([A-Z])/g, Jt = Na(
  (e) => e.replace(ld, "-$1").toLowerCase()
), Jn = Na((e) => e.charAt(0).toUpperCase() + e.slice(1)), co = Na(
  (e) => e ? `on${Jn(e)}` : ""
), kt = (e, t) => !Object.is(e, t), ya = (e, ...t) => {
  for (let i = 0; i < e.length; i++)
    e[i](...t);
}, Dn = (e, t, i, a = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: i
  });
}, Wo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let As;
const La = () => As || (As = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ha(e) {
  if (K(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const a = e[i], o = $e(a) ? hd(a) : Ha(a);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else if ($e(e) || ve(e))
    return e;
}
const pd = /;(?![^(]*\))/g, fd = /:([^]+)/, bd = /\/\*[^]*?\*\//g;
function hd(e) {
  const t = {};
  return e.replace(bd, "").split(pd).forEach((i) => {
    if (i) {
      const a = i.split(fd);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function pt(e) {
  let t = "";
  if ($e(e))
    t = e;
  else if (K(e))
    for (let i = 0; i < e.length; i++) {
      const a = pt(e[i]);
      a && (t += a + " ");
    }
  else if (ve(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
const md = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gd = /* @__PURE__ */ Ko(md);
function Bn(e) {
  return !!e || e === "";
}
function vd(e, t) {
  if (e.length !== t.length) return !1;
  let i = !0;
  for (let a = 0; i && a < e.length; a++)
    i = ia(e[a], t[a]);
  return i;
}
function ia(e, t) {
  if (e === t) return !0;
  let i = Is(e), a = Is(t);
  if (i || a)
    return i && a ? e.getTime() === t.getTime() : !1;
  if (i = dt(e), a = dt(t), i || a)
    return e === t;
  if (i = K(e), a = K(t), i || a)
    return i && a ? vd(e, t) : !1;
  if (i = ve(e), a = ve(t), i || a) {
    if (!i || !a)
      return !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const n in e) {
      const r = e.hasOwnProperty(n), c = t.hasOwnProperty(n);
      if (r && !c || !r && c || !ia(e[n], t[n]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Kn(e, t) {
  return e.findIndex((i) => ia(i, t));
}
const Gn = (e) => !!(e && e.__v_isRef === !0), $ = (e) => $e(e) ? e : e == null ? "" : K(e) || ve(e) && (e.toString === Ln || !te(e.toString)) ? Gn(e) ? $(e.value) : JSON.stringify(e, Wn, 2) : String(e), Wn = (e, t) => Gn(t) ? Wn(e, t.value) : hi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (i, [a, o], s) => (i[uo(a, s) + " =>"] = o, i),
    {}
  )
} : Fa(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((i) => uo(i))
} : dt(t) ? uo(t) : ve(t) && !K(t) && !Hn(t) ? String(t) : t, uo = (e, t = "") => {
  var i;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    dt(e) ? `Symbol(${(i = e.description) != null ? i : t})` : e
  );
};
let qe;
class Yn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && qe && (qe.active ? (this.parent = qe, this.index = (qe.scopes || (qe.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, i;
      if (this.scopes)
        for (t = 0, i = this.scopes.length; t < i; t++)
          this.scopes[t].pause();
      for (t = 0, i = this.effects.length; t < i; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, i;
      if (this.scopes)
        for (t = 0, i = this.scopes.length; t < i; t++)
          this.scopes[t].resume();
      for (t = 0, i = this.effects.length; t < i; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const i = qe;
      try {
        return qe = this, t();
      } finally {
        qe = i;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = qe, qe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (qe === this)
        qe = this.prevScope;
      else {
        let t = qe;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let i, a;
      for (i = 0, a = this.effects.length; i < a; i++)
        this.effects[i].stop();
      for (this.effects.length = 0, i = 0, a = this.cleanups.length; i < a; i++)
        this.cleanups[i]();
      if (this.cleanups.length = 0, this.scopes) {
        for (i = 0, a = this.scopes.length; i < a; i++)
          this.scopes[i].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Xn(e) {
  return new Yn(e);
}
function Qn() {
  return qe;
}
function _d(e, t = !1) {
  qe && qe.cleanups.push(e);
}
let we;
const lo = /* @__PURE__ */ new WeakSet();
class er {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, qe && (qe.active ? qe.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, lo.has(this) && (lo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ir(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ts(this), ar(this);
    const t = we, i = bt;
    we = this, bt = !0;
    try {
      return this.fn();
    } finally {
      or(this), we = t, bt = i, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qo(t);
      this.deps = this.depsTail = void 0, Ts(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? lo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    So(this) && this.run();
  }
  get dirty() {
    return So(this);
  }
}
let tr = 0, Ui, Zi;
function ir(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zi, Zi = e;
    return;
  }
  e.next = Ui, Ui = e;
}
function Yo() {
  tr++;
}
function Xo() {
  if (--tr > 0)
    return;
  if (Zi) {
    let t = Zi;
    for (Zi = void 0; t; ) {
      const i = t.next;
      t.next = void 0, t.flags &= -9, t = i;
    }
  }
  let e;
  for (; Ui; ) {
    let t = Ui;
    for (Ui = void 0; t; ) {
      const i = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (a) {
          e || (e = a);
        }
      t = i;
    }
  }
  if (e) throw e;
}
function ar(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function or(e) {
  let t, i = e.depsTail, a = i;
  for (; a; ) {
    const o = a.prevDep;
    a.version === -1 ? (a === i && (i = o), Qo(a), yd(a)) : t = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = o;
  }
  e.deps = t, e.depsTail = i;
}
function So(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (sr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function sr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Di) || (e.globalVersion = Di, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !So(e))))
    return;
  e.flags |= 2;
  const t = e.dep, i = we, a = bt;
  we = e, bt = !0;
  try {
    ar(e);
    const o = e.fn(e._value);
    (t.version === 0 || kt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    we = i, bt = a, or(e), e.flags &= -3;
  }
}
function Qo(e, t = !1) {
  const { dep: i, prevSub: a, nextSub: o } = e;
  if (a && (a.nextSub = o, e.prevSub = void 0), o && (o.prevSub = a, e.nextSub = void 0), i.subs === e && (i.subs = a, !a && i.computed)) {
    i.computed.flags &= -5;
    for (let s = i.computed.deps; s; s = s.nextDep)
      Qo(s, !0);
  }
  !t && !--i.sc && i.map && i.map.delete(i.key);
}
function yd(e) {
  const { prevDep: t, nextDep: i } = e;
  t && (t.nextDep = i, e.prevDep = void 0), i && (i.prevDep = t, e.nextDep = void 0);
}
let bt = !0;
const nr = [];
function Tt() {
  nr.push(bt), bt = !1;
}
function xt() {
  const e = nr.pop();
  bt = e === void 0 ? !0 : e;
}
function Ts(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const i = we;
    we = void 0;
    try {
      t();
    } finally {
      we = i;
    }
  }
}
let Di = 0;
class wd {
  constructor(t, i) {
    this.sub = t, this.dep = i, this.version = i.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class es {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!we || !bt || we === this.computed)
      return;
    let i = this.activeLink;
    if (i === void 0 || i.sub !== we)
      i = this.activeLink = new wd(we, this), we.deps ? (i.prevDep = we.depsTail, we.depsTail.nextDep = i, we.depsTail = i) : we.deps = we.depsTail = i, rr(i);
    else if (i.version === -1 && (i.version = this.version, i.nextDep)) {
      const a = i.nextDep;
      a.prevDep = i.prevDep, i.prevDep && (i.prevDep.nextDep = a), i.prevDep = we.depsTail, i.nextDep = void 0, we.depsTail.nextDep = i, we.depsTail = i, we.deps === i && (we.deps = a);
    }
    return i;
  }
  trigger(t) {
    this.version++, Di++, this.notify(t);
  }
  notify(t) {
    Yo();
    try {
      for (let i = this.subs; i; i = i.prevSub)
        i.sub.notify() && i.sub.dep.notify();
    } finally {
      Xo();
    }
  }
}
function rr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let a = t.deps; a; a = a.nextDep)
        rr(a);
    }
    const i = e.dep.subs;
    i !== e && (e.prevSub = i, i && (i.nextSub = e)), e.dep.subs = e;
  }
}
const ka = /* @__PURE__ */ new WeakMap(), oi = /* @__PURE__ */ Symbol(
  ""
), Vo = /* @__PURE__ */ Symbol(
  ""
), Bi = /* @__PURE__ */ Symbol(
  ""
);
function Ne(e, t, i) {
  if (bt && we) {
    let a = ka.get(e);
    a || ka.set(e, a = /* @__PURE__ */ new Map());
    let o = a.get(i);
    o || (a.set(i, o = new es()), o.map = a, o.key = i), o.track();
  }
}
function Et(e, t, i, a, o, s) {
  const n = ka.get(e);
  if (!n) {
    Di++;
    return;
  }
  const r = (c) => {
    c && c.trigger();
  };
  if (Yo(), t === "clear")
    n.forEach(r);
  else {
    const c = K(e), d = c && Ma(i);
    if (c && i === "length") {
      const u = Number(a);
      n.forEach((f, p) => {
        (p === "length" || p === Bi || !dt(p) && p >= u) && r(f);
      });
    } else
      switch ((i !== void 0 || n.has(void 0)) && r(n.get(i)), d && r(n.get(Bi)), t) {
        case "add":
          c ? d && r(n.get("length")) : (r(n.get(oi)), hi(e) && r(n.get(Vo)));
          break;
        case "delete":
          c || (r(n.get(oi)), hi(e) && r(n.get(Vo)));
          break;
        case "set":
          hi(e) && r(n.get(oi));
          break;
      }
  }
  Xo();
}
function kd(e, t) {
  const i = ka.get(e);
  return i && i.get(t);
}
function ci(e) {
  const t = /* @__PURE__ */ ue(e);
  return t === e ? t : (Ne(t, "iterate", Bi), /* @__PURE__ */ at(e) ? t : t.map(ht));
}
function Ja(e) {
  return Ne(e = /* @__PURE__ */ ue(e), "iterate", Bi), e;
}
function yt(e, t) {
  return /* @__PURE__ */ Ut(e) ? _i(/* @__PURE__ */ Rt(e) ? ht(t) : t) : ht(t);
}
const Id = {
  __proto__: null,
  [Symbol.iterator]() {
    return po(this, Symbol.iterator, (e) => yt(this, e));
  },
  concat(...e) {
    return ci(this).concat(
      ...e.map((t) => K(t) ? ci(t) : t)
    );
  },
  entries() {
    return po(this, "entries", (e) => (e[1] = yt(this, e[1]), e));
  },
  every(e, t) {
    return St(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return St(
      this,
      "filter",
      e,
      t,
      (i) => i.map((a) => yt(this, a)),
      arguments
    );
  },
  find(e, t) {
    return St(
      this,
      "find",
      e,
      t,
      (i) => yt(this, i),
      arguments
    );
  },
  findIndex(e, t) {
    return St(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return St(
      this,
      "findLast",
      e,
      t,
      (i) => yt(this, i),
      arguments
    );
  },
  findLastIndex(e, t) {
    return St(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return St(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return fo(this, "includes", e);
  },
  indexOf(...e) {
    return fo(this, "indexOf", e);
  },
  join(e) {
    return ci(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return fo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return St(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return xi(this, "pop");
  },
  push(...e) {
    return xi(this, "push", e);
  },
  reduce(e, ...t) {
    return xs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return xs(this, "reduceRight", e, t);
  },
  shift() {
    return xi(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return St(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return xi(this, "splice", e);
  },
  toReversed() {
    return ci(this).toReversed();
  },
  toSorted(e) {
    return ci(this).toSorted(e);
  },
  toSpliced(...e) {
    return ci(this).toSpliced(...e);
  },
  unshift(...e) {
    return xi(this, "unshift", e);
  },
  values() {
    return po(this, "values", (e) => yt(this, e));
  }
};
function po(e, t, i) {
  const a = Ja(e), o = a[t]();
  return a !== e && !/* @__PURE__ */ at(e) && (o._next = o.next, o.next = () => {
    const s = o._next();
    return s.done || (s.value = i(s.value)), s;
  }), o;
}
const Ad = Array.prototype;
function St(e, t, i, a, o, s) {
  const n = Ja(e), r = n !== e && !/* @__PURE__ */ at(e), c = n[t];
  if (c !== Ad[t]) {
    const f = c.apply(e, s);
    return r ? ht(f) : f;
  }
  let d = i;
  n !== e && (r ? d = function(f, p) {
    return i.call(this, yt(e, f), p, e);
  } : i.length > 2 && (d = function(f, p) {
    return i.call(this, f, p, e);
  }));
  const u = c.call(n, d, a);
  return r && o ? o(u) : u;
}
function xs(e, t, i, a) {
  const o = Ja(e), s = o !== e && !/* @__PURE__ */ at(e);
  let n = i, r = !1;
  o !== e && (s ? (r = a.length === 0, n = function(d, u, f) {
    return r && (r = !1, d = yt(e, d)), i.call(this, d, yt(e, u), f, e);
  }) : i.length > 3 && (n = function(d, u, f) {
    return i.call(this, d, u, f, e);
  }));
  const c = o[t](n, ...a);
  return r ? yt(e, c) : c;
}
function fo(e, t, i) {
  const a = /* @__PURE__ */ ue(e);
  Ne(a, "iterate", Bi);
  const o = a[t](...i);
  return (o === -1 || o === !1) && /* @__PURE__ */ Ba(i[0]) ? (i[0] = /* @__PURE__ */ ue(i[0]), a[t](...i)) : o;
}
function xi(e, t, i = []) {
  Tt(), Yo();
  const a = (/* @__PURE__ */ ue(e))[t].apply(e, i);
  return Xo(), xt(), a;
}
const Td = /* @__PURE__ */ Ko("__proto__,__v_isRef,__isVue"), cr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(dt)
);
function xd(e) {
  dt(e) || (e = String(e));
  const t = /* @__PURE__ */ ue(this);
  return Ne(t, "has", e), t.hasOwnProperty(e);
}
class dr {
  constructor(t = !1, i = !1) {
    this._isReadonly = t, this._isShallow = i;
  }
  get(t, i, a) {
    if (i === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, s = this._isShallow;
    if (i === "__v_isReactive")
      return !o;
    if (i === "__v_isReadonly")
      return o;
    if (i === "__v_isShallow")
      return s;
    if (i === "__v_raw")
      return a === (o ? s ? Ud : fr : s ? pr : lr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(a) ? t : void 0;
    const n = K(t);
    if (!o) {
      let c;
      if (n && (c = Id[i]))
        return c;
      if (i === "hasOwnProperty")
        return xd;
    }
    const r = Reflect.get(
      t,
      i,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ Pe(t) ? t : a
    );
    if ((dt(i) ? cr.has(i) : Td(i)) || (o || Ne(t, "get", i), s))
      return r;
    if (/* @__PURE__ */ Pe(r)) {
      const c = n && Ma(i) ? r : r.value;
      return o && ve(c) ? /* @__PURE__ */ Co(c) : c;
    }
    return ve(r) ? o ? /* @__PURE__ */ Co(r) : /* @__PURE__ */ Da(r) : r;
  }
}
class ur extends dr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, i, a, o) {
    let s = t[i];
    const n = K(t) && Ma(i);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Ut(s);
      if (!/* @__PURE__ */ at(a) && !/* @__PURE__ */ Ut(a) && (s = /* @__PURE__ */ ue(s), a = /* @__PURE__ */ ue(a)), !n && /* @__PURE__ */ Pe(s) && !/* @__PURE__ */ Pe(a))
        return d || (s.value = a), !0;
    }
    const r = n ? Number(i) < t.length : fe(t, i), c = Reflect.set(
      t,
      i,
      a,
      /* @__PURE__ */ Pe(t) ? t : o
    );
    return t === /* @__PURE__ */ ue(o) && c && (r ? kt(a, s) && Et(t, "set", i, a) : Et(t, "add", i, a)), c;
  }
  deleteProperty(t, i) {
    const a = fe(t, i);
    t[i];
    const o = Reflect.deleteProperty(t, i);
    return o && a && Et(t, "delete", i, void 0), o;
  }
  has(t, i) {
    const a = Reflect.has(t, i);
    return (!dt(i) || !cr.has(i)) && Ne(t, "has", i), a;
  }
  ownKeys(t) {
    return Ne(
      t,
      "iterate",
      K(t) ? "length" : oi
    ), Reflect.ownKeys(t);
  }
}
class Sd extends dr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, i) {
    return !0;
  }
  deleteProperty(t, i) {
    return !0;
  }
}
const Vd = /* @__PURE__ */ new ur(), jd = /* @__PURE__ */ new Sd(), Cd = /* @__PURE__ */ new ur(!0);
const jo = (e) => e, la = (e) => Reflect.getPrototypeOf(e);
function Ed(e, t, i) {
  return function(...a) {
    const o = this.__v_raw, s = /* @__PURE__ */ ue(o), n = hi(s), r = e === "entries" || e === Symbol.iterator && n, c = e === "keys" && n, d = o[e](...a), u = i ? jo : t ? _i : ht;
    return !t && Ne(
      s,
      "iterate",
      c ? Vo : oi
    ), Me(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: f, done: p } = d.next();
          return p ? { value: f, done: p } : {
            value: r ? [u(f[0]), u(f[1])] : u(f),
            done: p
          };
        }
      }
    );
  };
}
function pa(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Od(e, t) {
  const i = {
    get(o) {
      const s = this.__v_raw, n = /* @__PURE__ */ ue(s), r = /* @__PURE__ */ ue(o);
      e || (kt(o, r) && Ne(n, "get", o), Ne(n, "get", r));
      const { has: c } = la(n), d = t ? jo : e ? _i : ht;
      if (c.call(n, o))
        return d(s.get(o));
      if (c.call(n, r))
        return d(s.get(r));
      s !== n && s.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ne(/* @__PURE__ */ ue(o), "iterate", oi), o.size;
    },
    has(o) {
      const s = this.__v_raw, n = /* @__PURE__ */ ue(s), r = /* @__PURE__ */ ue(o);
      return e || (kt(o, r) && Ne(n, "has", o), Ne(n, "has", r)), o === r ? s.has(o) : s.has(o) || s.has(r);
    },
    forEach(o, s) {
      const n = this, r = n.__v_raw, c = /* @__PURE__ */ ue(r), d = t ? jo : e ? _i : ht;
      return !e && Ne(c, "iterate", oi), r.forEach((u, f) => o.call(s, d(u), d(f), n));
    }
  };
  return Me(
    i,
    e ? {
      add: pa("add"),
      set: pa("set"),
      delete: pa("delete"),
      clear: pa("clear")
    } : {
      add(o) {
        const s = /* @__PURE__ */ ue(this), n = la(s), r = /* @__PURE__ */ ue(o), c = !t && !/* @__PURE__ */ at(o) && !/* @__PURE__ */ Ut(o) ? r : o;
        return n.has.call(s, c) || kt(o, c) && n.has.call(s, o) || kt(r, c) && n.has.call(s, r) || (s.add(c), Et(s, "add", c, c)), this;
      },
      set(o, s) {
        !t && !/* @__PURE__ */ at(s) && !/* @__PURE__ */ Ut(s) && (s = /* @__PURE__ */ ue(s));
        const n = /* @__PURE__ */ ue(this), { has: r, get: c } = la(n);
        let d = r.call(n, o);
        d || (o = /* @__PURE__ */ ue(o), d = r.call(n, o));
        const u = c.call(n, o);
        return n.set(o, s), d ? kt(s, u) && Et(n, "set", o, s) : Et(n, "add", o, s), this;
      },
      delete(o) {
        const s = /* @__PURE__ */ ue(this), { has: n, get: r } = la(s);
        let c = n.call(s, o);
        c || (o = /* @__PURE__ */ ue(o), c = n.call(s, o)), r && r.call(s, o);
        const d = s.delete(o);
        return c && Et(s, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ ue(this), s = o.size !== 0, n = o.clear();
        return s && Et(
          o,
          "clear",
          void 0,
          void 0
        ), n;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    i[o] = Ed(o, e, t);
  }), i;
}
function ts(e, t) {
  const i = Od(e, t);
  return (a, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? a : Reflect.get(
    fe(i, o) && o in a ? i : a,
    o,
    s
  );
}
const $d = {
  get: /* @__PURE__ */ ts(!1, !1)
}, Pd = {
  get: /* @__PURE__ */ ts(!1, !0)
}, Rd = {
  get: /* @__PURE__ */ ts(!0, !1)
};
const lr = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakMap(), fr = /* @__PURE__ */ new WeakMap(), Ud = /* @__PURE__ */ new WeakMap();
function Zd(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Da(e) {
  return /* @__PURE__ */ Ut(e) ? e : is(
    e,
    !1,
    Vd,
    $d,
    lr
  );
}
// @__NO_SIDE_EFFECTS__
function qd(e) {
  return is(
    e,
    !1,
    Cd,
    Pd,
    pr
  );
}
// @__NO_SIDE_EFFECTS__
function Co(e) {
  return is(
    e,
    !0,
    jd,
    Rd,
    fr
  );
}
function is(e, t, i, a, o) {
  if (!ve(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const n = Zd(dd(e));
  if (n === 0)
    return e;
  const r = new Proxy(
    e,
    n === 2 ? a : i
  );
  return o.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
  return /* @__PURE__ */ Ut(e) ? /* @__PURE__ */ Rt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function at(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Ba(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ue(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ue(t) : e;
}
function Ki(e) {
  return !fe(e, "__v_skip") && Object.isExtensible(e) && Dn(e, "__v_skip", !0), e;
}
const ht = (e) => ve(e) ? /* @__PURE__ */ Da(e) : e, _i = (e) => ve(e) ? /* @__PURE__ */ Co(e) : e;
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  return br(e, !1);
}
// @__NO_SIDE_EFFECTS__
function zd(e) {
  return br(e, !0);
}
function br(e, t) {
  return /* @__PURE__ */ Pe(e) ? e : new Fd(e, t);
}
class Fd {
  constructor(t, i) {
    this.dep = new es(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = i ? t : /* @__PURE__ */ ue(t), this._value = i ? t : ht(t), this.__v_isShallow = i;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const i = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ at(t) || /* @__PURE__ */ Ut(t);
    t = a ? t : /* @__PURE__ */ ue(t), kt(t, i) && (this._rawValue = t, this._value = a ? t : ht(t), this.dep.trigger());
  }
}
function Ss(e) {
  e.dep && e.dep.trigger();
}
function A(e) {
  return /* @__PURE__ */ Pe(e) ? e.value : e;
}
const Md = {
  get: (e, t, i) => t === "__v_raw" ? e : A(Reflect.get(e, t, i)),
  set: (e, t, i, a) => {
    const o = e[t];
    return /* @__PURE__ */ Pe(o) && !/* @__PURE__ */ Pe(i) ? (o.value = i, !0) : Reflect.set(e, t, i, a);
  }
};
function hr(e) {
  return /* @__PURE__ */ Rt(e) ? e : new Proxy(e, Md);
}
// @__NO_SIDE_EFFECTS__
function Nd(e) {
  const t = K(e) ? new Array(e.length) : {};
  for (const i in e)
    t[i] = Hd(e, i);
  return t;
}
class Ld {
  constructor(t, i, a) {
    this._object = t, this._defaultValue = a, this.__v_isRef = !0, this._value = void 0, this._key = dt(i) ? i : String(i), this._raw = /* @__PURE__ */ ue(t);
    let o = !0, s = t;
    if (!K(t) || dt(this._key) || !Ma(this._key))
      do
        o = !/* @__PURE__ */ Ba(s) || /* @__PURE__ */ at(s);
      while (o && (s = s.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = A(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ Pe(this._raw[this._key])) {
      const i = this._object[this._key];
      if (/* @__PURE__ */ Pe(i)) {
        i.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return kd(this._raw, this._key);
  }
}
function Hd(e, t, i) {
  return new Ld(e, t, i);
}
class Jd {
  constructor(t, i, a) {
    this.fn = t, this.setter = i, this._value = void 0, this.dep = new es(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Di - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !i, this.isSSR = a;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    we !== this)
      return ir(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return sr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Dd(e, t, i = !1) {
  let a, o;
  return te(e) ? a = e : (a = e.get, o = e.set), new Jd(a, o, i);
}
const fa = {}, Ia = /* @__PURE__ */ new WeakMap();
let Qt;
function Bd(e, t = !1, i = Qt) {
  if (i) {
    let a = Ia.get(i);
    a || Ia.set(i, a = []), a.push(e);
  }
}
function Kd(e, t, i = ye) {
  const { immediate: a, deep: o, once: s, scheduler: n, augmentJob: r, call: c } = i, d = (j) => o ? j : /* @__PURE__ */ at(j) || o === !1 || o === 0 ? Ot(j, 1) : Ot(j);
  let u, f, p, b, E = !1, M = !1;
  if (/* @__PURE__ */ Pe(e) ? (f = () => e.value, E = /* @__PURE__ */ at(e)) : /* @__PURE__ */ Rt(e) ? (f = () => d(e), E = !0) : K(e) ? (M = !0, E = e.some((j) => /* @__PURE__ */ Rt(j) || /* @__PURE__ */ at(j)), f = () => e.map((j) => {
    if (/* @__PURE__ */ Pe(j))
      return j.value;
    if (/* @__PURE__ */ Rt(j))
      return d(j);
    if (te(j))
      return c ? c(j, 2) : j();
  })) : te(e) ? t ? f = c ? () => c(e, 2) : e : f = () => {
    if (p) {
      Tt();
      try {
        p();
      } finally {
        xt();
      }
    }
    const j = Qt;
    Qt = u;
    try {
      return c ? c(e, 3, [b]) : e(b);
    } finally {
      Qt = j;
    }
  } : f = It, t && o) {
    const j = f, L = o === !0 ? 1 / 0 : o;
    f = () => Ot(j(), L);
  }
  const J = Qn(), se = () => {
    u.stop(), J && J.active && Go(J.effects, u);
  };
  if (s && t) {
    const j = t;
    t = (...L) => {
      const je = j(...L);
      return se(), je;
    };
  }
  let X = M ? new Array(e.length).fill(fa) : fa;
  const W = (j) => {
    if (!(!(u.flags & 1) || !u.dirty && !j))
      if (t) {
        const L = u.run();
        if (j || o || E || (M ? L.some((je, ke) => kt(je, X[ke])) : kt(L, X))) {
          p && p();
          const je = Qt;
          Qt = u;
          try {
            const ke = [
              L,
              // pass undefined as the old value when it's changed for the first time
              X === fa ? void 0 : M && X[0] === fa ? [] : X,
              b
            ];
            X = L, c ? c(t, 3, ke) : (
              // @ts-expect-error
              t(...ke)
            );
          } finally {
            Qt = je;
          }
        }
      } else
        u.run();
  };
  return r && r(W), u = new er(f), u.scheduler = n ? () => n(W, !1) : W, b = (j) => Bd(j, !1, u), p = u.onStop = () => {
    const j = Ia.get(u);
    if (j) {
      if (c)
        c(j, 4);
      else
        for (const L of j) L();
      Ia.delete(u);
    }
  }, t ? a ? W(!0) : X = u.run() : n ? n(W.bind(null, !0), !0) : u.run(), se.pause = u.pause.bind(u), se.resume = u.resume.bind(u), se.stop = se, se;
}
function Ot(e, t = 1 / 0, i) {
  if (t <= 0 || !ve(e) || e.__v_skip || (i = i || /* @__PURE__ */ new Map(), (i.get(e) || 0) >= t))
    return e;
  if (i.set(e, t), t--, /* @__PURE__ */ Pe(e))
    Ot(e.value, t, i);
  else if (K(e))
    for (let a = 0; a < e.length; a++)
      Ot(e[a], t, i);
  else if (Fa(e) || hi(e))
    e.forEach((a) => {
      Ot(a, t, i);
    });
  else if (Hn(e)) {
    for (const a in e)
      Ot(e[a], t, i);
    for (const a of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, a) && Ot(e[a], t, i);
  }
  return e;
}
function aa(e, t, i, a) {
  try {
    return a ? e(...a) : e();
  } catch (o) {
    Ka(o, t, i);
  }
}
function mt(e, t, i, a) {
  if (te(e)) {
    const o = aa(e, t, i, a);
    return o && Nn(o) && o.catch((s) => {
      Ka(s, t, i);
    }), o;
  }
  if (K(e)) {
    const o = [];
    for (let s = 0; s < e.length; s++)
      o.push(mt(e[s], t, i, a));
    return o;
  }
}
function Ka(e, t, i, a = !0) {
  const o = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: n } = t && t.appContext.config || ye;
  if (t) {
    let r = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${i}`;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](e, c, d) === !1)
            return;
      }
      r = r.parent;
    }
    if (s) {
      Tt(), aa(s, null, 10, [
        e,
        c,
        d
      ]), xt();
      return;
    }
  }
  Gd(e, i, o, a, n);
}
function Gd(e, t, i, a = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const De = [];
let _t = -1;
const mi = [];
let Mt = null, li = 0;
const mr = /* @__PURE__ */ Promise.resolve();
let Aa = null;
function Ga(e) {
  const t = Aa || mr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Wd(e) {
  let t = _t + 1, i = De.length;
  for (; t < i; ) {
    const a = t + i >>> 1, o = De[a], s = Gi(o);
    s < e || s === e && o.flags & 2 ? t = a + 1 : i = a;
  }
  return t;
}
function as(e) {
  if (!(e.flags & 1)) {
    const t = Gi(e), i = De[De.length - 1];
    !i || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Gi(i) ? De.push(e) : De.splice(Wd(t), 0, e), e.flags |= 1, gr();
  }
}
function gr() {
  Aa || (Aa = mr.then(_r));
}
function Yd(e) {
  K(e) ? mi.push(...e) : Mt && e.id === -1 ? Mt.splice(li + 1, 0, e) : e.flags & 1 || (mi.push(e), e.flags |= 1), gr();
}
function Vs(e, t, i = _t + 1) {
  for (; i < De.length; i++) {
    const a = De[i];
    if (a && a.flags & 2) {
      if (e && a.id !== e.uid)
        continue;
      De.splice(i, 1), i--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function vr(e) {
  if (mi.length) {
    const t = [...new Set(mi)].sort(
      (i, a) => Gi(i) - Gi(a)
    );
    if (mi.length = 0, Mt) {
      Mt.push(...t);
      return;
    }
    for (Mt = t, li = 0; li < Mt.length; li++) {
      const i = Mt[li];
      i.flags & 4 && (i.flags &= -2), i.flags & 8 || i(), i.flags &= -2;
    }
    Mt = null, li = 0;
  }
}
const Gi = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _r(e) {
  try {
    for (_t = 0; _t < De.length; _t++) {
      const t = De[_t];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), aa(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; _t < De.length; _t++) {
      const t = De[_t];
      t && (t.flags &= -2);
    }
    _t = -1, De.length = 0, vr(), Aa = null, (De.length || mi.length) && _r();
  }
}
let ct = null, yr = null;
function Ta(e) {
  const t = ct;
  return ct = e, yr = e && e.type.__scopeId || null, t;
}
function Xd(e, t = ct, i) {
  if (!t || e._n)
    return e;
  const a = (...o) => {
    a._d && zs(-1);
    const s = Ta(t);
    let n;
    try {
      n = e(...o);
    } finally {
      Ta(s), a._d && zs(1);
    }
    return n;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function $t(e, t) {
  if (ct === null)
    return e;
  const i = Qa(ct), a = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [s, n, r, c = ye] = t[o];
    s && (te(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Ot(n), a.push({
      dir: s,
      instance: i,
      value: n,
      oldValue: void 0,
      arg: r,
      modifiers: c
    }));
  }
  return e;
}
function Yt(e, t, i, a) {
  const o = e.dirs, s = t && t.dirs;
  for (let n = 0; n < o.length; n++) {
    const r = o[n];
    s && (r.oldValue = s[n].value);
    let c = r.dir[a];
    c && (Tt(), mt(c, i, 8, [
      e.el,
      r,
      e,
      t
    ]), xt());
  }
}
function Qd(e, t) {
  if (Be) {
    let i = Be.provides;
    const a = Be.parent && Be.parent.provides;
    a === i && (i = Be.provides = Object.create(a)), i[e] = t;
  }
}
function qi(e, t, i = !1) {
  const a = Gr();
  if (a || si) {
    let o = si ? si._context.provides : a ? a.parent == null || a.ce ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return i && te(t) ? t.call(a && a.proxy) : t;
  }
}
function eu() {
  return !!(Gr() || si);
}
const tu = /* @__PURE__ */ Symbol.for("v-scx"), iu = () => qi(tu);
function zi(e, t, i) {
  return wr(e, t, i);
}
function wr(e, t, i = ye) {
  const { immediate: a, deep: o, flush: s, once: n } = i, r = Me({}, i), c = t && a || !t && s !== "post";
  let d;
  if (Yi) {
    if (s === "sync") {
      const b = iu();
      d = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!c) {
      const b = () => {
      };
      return b.stop = It, b.resume = It, b.pause = It, b;
    }
  }
  const u = Be;
  r.call = (b, E, M) => mt(b, u, E, M);
  let f = !1;
  s === "post" ? r.scheduler = (b) => {
    We(b, u && u.suspense);
  } : s !== "sync" && (f = !0, r.scheduler = (b, E) => {
    E ? b() : as(b);
  }), r.augmentJob = (b) => {
    t && (b.flags |= 4), f && (b.flags |= 2, u && (b.id = u.uid, b.i = u));
  };
  const p = Kd(e, t, r);
  return Yi && (d ? d.push(p) : c && p()), p;
}
function au(e, t, i) {
  const a = this.proxy, o = $e(e) ? e.includes(".") ? kr(a, e) : () => a[e] : e.bind(a, a);
  let s;
  te(t) ? s = t : (s = t.handler, i = t);
  const n = oa(this), r = wr(o, s.bind(a), i);
  return n(), r;
}
function kr(e, t) {
  const i = t.split(".");
  return () => {
    let a = e;
    for (let o = 0; o < i.length && a; o++)
      a = a[i[o]];
    return a;
  };
}
const ou = /* @__PURE__ */ Symbol("_vte"), su = (e) => e.__isTeleport, bo = /* @__PURE__ */ Symbol("_leaveCb");
function os(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, os(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function ss(e, t) {
  return te(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Me({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ir(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function js(e, t) {
  let i;
  return !!((i = Object.getOwnPropertyDescriptor(e, t)) && !i.configurable);
}
const xa = /* @__PURE__ */ new WeakMap();
function Fi(e, t, i, a, o = !1) {
  if (K(e)) {
    e.forEach(
      (M, J) => Fi(
        M,
        t && (K(t) ? t[J] : t),
        i,
        a,
        o
      )
    );
    return;
  }
  if (Mi(a) && !o) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && Fi(e, t, i, a.component.subTree);
    return;
  }
  const s = a.shapeFlag & 4 ? Qa(a.component) : a.el, n = o ? null : s, { i: r, r: c } = e, d = t && t.r, u = r.refs === ye ? r.refs = {} : r.refs, f = r.setupState, p = /* @__PURE__ */ ue(f), b = f === ye ? Mn : (M) => js(u, M) ? !1 : fe(p, M), E = (M, J) => !(J && js(u, J));
  if (d != null && d !== c) {
    if (Cs(t), $e(d))
      u[d] = null, b(d) && (f[d] = null);
    else if (/* @__PURE__ */ Pe(d)) {
      const M = t;
      E(d, M.k) && (d.value = null), M.k && (u[M.k] = null);
    }
  }
  if (te(c)) {
    Tt();
    try {
      aa(c, r, 12, [n, u]);
    } finally {
      xt();
    }
  } else {
    const M = $e(c), J = /* @__PURE__ */ Pe(c);
    if (M || J) {
      const se = () => {
        if (e.f) {
          const X = M ? b(c) ? f[c] : u[c] : E() || !e.k ? c.value : u[e.k];
          if (o)
            K(X) && Go(X, s);
          else if (K(X))
            X.includes(s) || X.push(s);
          else if (M)
            u[c] = [s], b(c) && (f[c] = u[c]);
          else {
            const W = [s];
            E(c, e.k) && (c.value = W), e.k && (u[e.k] = W);
          }
        } else M ? (u[c] = n, b(c) && (f[c] = n)) : J && (E(c, e.k) && (c.value = n), e.k && (u[e.k] = n));
      };
      if (n) {
        const X = () => {
          se(), xa.delete(e);
        };
        X.id = -1, xa.set(e, X), We(X, i);
      } else
        Cs(e), se();
    }
  }
}
function Cs(e) {
  const t = xa.get(e);
  t && (t.flags |= 8, xa.delete(e));
}
La().requestIdleCallback;
La().cancelIdleCallback;
const Mi = (e) => !!e.type.__asyncLoader, Ar = (e) => e.type.__isKeepAlive;
function nu(e, t) {
  Tr(e, "a", t);
}
function ru(e, t) {
  Tr(e, "da", t);
}
function Tr(e, t, i = Be) {
  const a = e.__wdc || (e.__wdc = () => {
    let o = i;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Wa(t, a, i), i) {
    let o = i.parent;
    for (; o && o.parent; )
      Ar(o.parent.vnode) && cu(a, t, i, o), o = o.parent;
  }
}
function cu(e, t, i, a) {
  const o = Wa(
    t,
    e,
    a,
    !0
    /* prepend */
  );
  Sr(() => {
    Go(a[t], o);
  }, i);
}
function Wa(e, t, i = Be, a = !1) {
  if (i) {
    const o = i[e] || (i[e] = []), s = t.__weh || (t.__weh = (...n) => {
      Tt();
      const r = oa(i), c = mt(t, i, e, n);
      return r(), xt(), c;
    });
    return a ? o.unshift(s) : o.push(s), s;
  }
}
const zt = (e) => (t, i = Be) => {
  (!Yi || e === "sp") && Wa(e, (...a) => t(...a), i);
}, du = zt("bm"), xr = zt("m"), uu = zt(
  "bu"
), lu = zt("u"), ns = zt(
  "bum"
), Sr = zt("um"), pu = zt(
  "sp"
), fu = zt("rtg"), bu = zt("rtc");
function hu(e, t = Be) {
  Wa("ec", e, t);
}
const mu = /* @__PURE__ */ Symbol.for("v-ndc");
function ze(e, t, i, a) {
  let o;
  const s = i, n = K(e);
  if (n || $e(e)) {
    const r = n && /* @__PURE__ */ Rt(e);
    let c = !1, d = !1;
    r && (c = !/* @__PURE__ */ at(e), d = /* @__PURE__ */ Ut(e), e = Ja(e)), o = new Array(e.length);
    for (let u = 0, f = e.length; u < f; u++)
      o[u] = t(
        c ? d ? _i(ht(e[u])) : ht(e[u]) : e[u],
        u,
        void 0,
        s
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let r = 0; r < e; r++)
      o[r] = t(r + 1, r, void 0, s);
  } else if (ve(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (r, c) => t(r, c, void 0, s)
      );
    else {
      const r = Object.keys(e);
      o = new Array(r.length);
      for (let c = 0, d = r.length; c < d; c++) {
        const u = r[c];
        o[c] = t(e[u], u, c, s);
      }
    }
  else
    o = [];
  return o;
}
const Eo = (e) => e ? Wr(e) ? Qa(e) : Eo(e.parent) : null, Ni = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Me(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Eo(e.parent),
    $root: (e) => Eo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => jr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      as(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Ga.bind(e.proxy)),
    $watch: (e) => au.bind(e)
  })
), ho = (e, t) => e !== ye && !e.__isScriptSetup && fe(e, t), gu = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: i, setupState: a, data: o, props: s, accessCache: n, type: r, appContext: c } = e;
    if (t[0] !== "$") {
      const p = n[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return a[t];
          case 2:
            return o[t];
          case 4:
            return i[t];
          case 3:
            return s[t];
        }
      else {
        if (ho(a, t))
          return n[t] = 1, a[t];
        if (o !== ye && fe(o, t))
          return n[t] = 2, o[t];
        if (fe(s, t))
          return n[t] = 3, s[t];
        if (i !== ye && fe(i, t))
          return n[t] = 4, i[t];
        Oo && (n[t] = 0);
      }
    }
    const d = Ni[t];
    let u, f;
    if (d)
      return t === "$attrs" && Ne(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (u = r.__cssModules) && (u = u[t])
    )
      return u;
    if (i !== ye && fe(i, t))
      return n[t] = 4, i[t];
    if (
      // global properties
      f = c.config.globalProperties, fe(f, t)
    )
      return f[t];
  },
  set({ _: e }, t, i) {
    const { data: a, setupState: o, ctx: s } = e;
    return ho(o, t) ? (o[t] = i, !0) : a !== ye && fe(a, t) ? (a[t] = i, !0) : fe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (s[t] = i, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: i, ctx: a, appContext: o, props: s, type: n }
  }, r) {
    let c;
    return !!(i[r] || e !== ye && r[0] !== "$" && fe(e, r) || ho(t, r) || fe(s, r) || fe(a, r) || fe(Ni, r) || fe(o.config.globalProperties, r) || (c = n.__cssModules) && c[r]);
  },
  defineProperty(e, t, i) {
    return i.get != null ? e._.accessCache[t] = 0 : fe(i, "value") && this.set(e, t, i.value, null), Reflect.defineProperty(e, t, i);
  }
};
function Es(e) {
  return K(e) ? e.reduce(
    (t, i) => (t[i] = null, t),
    {}
  ) : e;
}
let Oo = !0;
function vu(e) {
  const t = jr(e), i = e.proxy, a = e.ctx;
  Oo = !1, t.beforeCreate && Os(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: s,
    methods: n,
    watch: r,
    provide: c,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: f,
    mounted: p,
    beforeUpdate: b,
    updated: E,
    activated: M,
    deactivated: J,
    beforeDestroy: se,
    beforeUnmount: X,
    destroyed: W,
    unmounted: j,
    render: L,
    renderTracked: je,
    renderTriggered: ke,
    errorCaptured: Q,
    serverPrefetch: ie,
    // public API
    expose: _e,
    inheritAttrs: ae,
    // assets
    components: Ue,
    directives: Ge,
    filters: ot
  } = t;
  if (d && _u(d, a, null), n)
    for (const Y in n) {
      const re = n[Y];
      te(re) && (a[Y] = re.bind(i));
    }
  if (o) {
    const Y = o.call(i, i);
    ve(Y) && (e.data = /* @__PURE__ */ Da(Y));
  }
  if (Oo = !0, s)
    for (const Y in s) {
      const re = s[Y], C = te(re) ? re.bind(i, i) : te(re.get) ? re.get.bind(i, i) : It, H = !te(re) && te(re.set) ? re.set.bind(i) : It, v = Je({
        get: C,
        set: H
      });
      Object.defineProperty(a, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => v.value,
        set: (pe) => v.value = pe
      });
    }
  if (r)
    for (const Y in r)
      Vr(r[Y], a, i, Y);
  if (c) {
    const Y = te(c) ? c.call(i) : c;
    Reflect.ownKeys(Y).forEach((re) => {
      Qd(re, Y[re]);
    });
  }
  u && Os(u, e, "c");
  function le(Y, re) {
    K(re) ? re.forEach((C) => Y(C.bind(i))) : re && Y(re.bind(i));
  }
  if (le(du, f), le(xr, p), le(uu, b), le(lu, E), le(nu, M), le(ru, J), le(hu, Q), le(bu, je), le(fu, ke), le(ns, X), le(Sr, j), le(pu, ie), K(_e))
    if (_e.length) {
      const Y = e.exposed || (e.exposed = {});
      _e.forEach((re) => {
        Object.defineProperty(Y, re, {
          get: () => i[re],
          set: (C) => i[re] = C,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  L && e.render === It && (e.render = L), ae != null && (e.inheritAttrs = ae), Ue && (e.components = Ue), Ge && (e.directives = Ge), ie && Ir(e);
}
function _u(e, t, i = It) {
  K(e) && (e = $o(e));
  for (const a in e) {
    const o = e[a];
    let s;
    ve(o) ? "default" in o ? s = qi(
      o.from || a,
      o.default,
      !0
    ) : s = qi(o.from || a) : s = qi(o), /* @__PURE__ */ Pe(s) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (n) => s.value = n
    }) : t[a] = s;
  }
}
function Os(e, t, i) {
  mt(
    K(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy),
    t,
    i
  );
}
function Vr(e, t, i, a) {
  let o = a.includes(".") ? kr(i, a) : () => i[a];
  if ($e(e)) {
    const s = t[e];
    te(s) && zi(o, s);
  } else if (te(e))
    zi(o, e.bind(i));
  else if (ve(e))
    if (K(e))
      e.forEach((s) => Vr(s, t, i, a));
    else {
      const s = te(e.handler) ? e.handler.bind(i) : t[e.handler];
      te(s) && zi(o, s, e);
    }
}
function jr(e) {
  const t = e.type, { mixins: i, extends: a } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: n }
  } = e.appContext, r = s.get(t);
  let c;
  return r ? c = r : !o.length && !i && !a ? c = t : (c = {}, o.length && o.forEach(
    (d) => Sa(c, d, n, !0)
  ), Sa(c, t, n)), ve(t) && s.set(t, c), c;
}
function Sa(e, t, i, a = !1) {
  const { mixins: o, extends: s } = t;
  s && Sa(e, s, i, !0), o && o.forEach(
    (n) => Sa(e, n, i, !0)
  );
  for (const n in t)
    if (!(a && n === "expose")) {
      const r = yu[n] || i && i[n];
      e[n] = r ? r(e[n], t[n]) : t[n];
    }
  return e;
}
const yu = {
  data: $s,
  props: Ps,
  emits: Ps,
  // objects
  methods: Ci,
  computed: Ci,
  // lifecycle
  beforeCreate: Le,
  created: Le,
  beforeMount: Le,
  mounted: Le,
  beforeUpdate: Le,
  updated: Le,
  beforeDestroy: Le,
  beforeUnmount: Le,
  destroyed: Le,
  unmounted: Le,
  activated: Le,
  deactivated: Le,
  errorCaptured: Le,
  serverPrefetch: Le,
  // assets
  components: Ci,
  directives: Ci,
  // watch
  watch: ku,
  // provide / inject
  provide: $s,
  inject: wu
};
function $s(e, t) {
  return t ? e ? function() {
    return Me(
      te(e) ? e.call(this, this) : e,
      te(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wu(e, t) {
  return Ci($o(e), $o(t));
}
function $o(e) {
  if (K(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++)
      t[e[i]] = e[i];
    return t;
  }
  return e;
}
function Le(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ci(e, t) {
  return e ? Me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ps(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Me(
    /* @__PURE__ */ Object.create(null),
    Es(e),
    Es(t ?? {})
  ) : t;
}
function ku(e, t) {
  if (!e) return t;
  if (!t) return e;
  const i = Me(/* @__PURE__ */ Object.create(null), e);
  for (const a in t)
    i[a] = Le(e[a], t[a]);
  return i;
}
function Cr() {
  return {
    app: null,
    config: {
      isNativeTag: Mn,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Iu = 0;
function Au(e, t) {
  return function(a, o = null) {
    te(a) || (a = Me({}, a)), o != null && !ve(o) && (o = null);
    const s = Cr(), n = /* @__PURE__ */ new WeakSet(), r = [];
    let c = !1;
    const d = s.app = {
      _uid: Iu++,
      _component: a,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: tl,
      get config() {
        return s.config;
      },
      set config(u) {
      },
      use(u, ...f) {
        return n.has(u) || (u && te(u.install) ? (n.add(u), u.install(d, ...f)) : te(u) && (n.add(u), u(d, ...f))), d;
      },
      mixin(u) {
        return s.mixins.includes(u) || s.mixins.push(u), d;
      },
      component(u, f) {
        return f ? (s.components[u] = f, d) : s.components[u];
      },
      directive(u, f) {
        return f ? (s.directives[u] = f, d) : s.directives[u];
      },
      mount(u, f, p) {
        if (!c) {
          const b = d._ceVNode || At(a, o);
          return b.appContext = s, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(b, u, p), c = !0, d._container = u, u.__vue_app__ = d, Qa(b.component);
        }
      },
      onUnmount(u) {
        r.push(u);
      },
      unmount() {
        c && (mt(
          r,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(u, f) {
        return s.provides[u] = f, d;
      },
      runWithContext(u) {
        const f = si;
        si = d;
        try {
          return u();
        } finally {
          si = f;
        }
      }
    };
    return d;
  };
}
let si = null;
const Tu = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ft(t)}Modifiers`] || e[`${Jt(t)}Modifiers`];
function xu(e, t, ...i) {
  if (e.isUnmounted) return;
  const a = e.vnode.props || ye;
  let o = i;
  const s = t.startsWith("update:"), n = s && Tu(a, t.slice(7));
  n && (n.trim && (o = i.map((u) => $e(u) ? u.trim() : u)), n.number && (o = i.map(Wo)));
  let r, c = a[r = co(t)] || // also try camelCase event handler (#2249)
  a[r = co(ft(t))];
  !c && s && (c = a[r = co(Jt(t))]), c && mt(
    c,
    e,
    6,
    o
  );
  const d = a[r + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[r])
      return;
    e.emitted[r] = !0, mt(
      d,
      e,
      6,
      o
    );
  }
}
const Su = /* @__PURE__ */ new WeakMap();
function Er(e, t, i = !1) {
  const a = i ? Su : t.emitsCache, o = a.get(e);
  if (o !== void 0)
    return o;
  const s = e.emits;
  let n = {}, r = !1;
  if (!te(e)) {
    const c = (d) => {
      const u = Er(d, t, !0);
      u && (r = !0, Me(n, u));
    };
    !i && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !r ? (ve(e) && a.set(e, null), null) : (K(s) ? s.forEach((c) => n[c] = null) : Me(n, s), ve(e) && a.set(e, n), n);
}
function Ya(e, t) {
  return !e || !qa(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, Jt(t)) || fe(e, t));
}
function Rs(e) {
  const {
    type: t,
    vnode: i,
    proxy: a,
    withProxy: o,
    propsOptions: [s],
    slots: n,
    attrs: r,
    emit: c,
    render: d,
    renderCache: u,
    props: f,
    data: p,
    setupState: b,
    ctx: E,
    inheritAttrs: M
  } = e, J = Ta(e);
  let se, X;
  try {
    if (i.shapeFlag & 4) {
      const j = o || a, L = j;
      se = wt(
        d.call(
          L,
          j,
          u,
          f,
          b,
          p,
          E
        )
      ), X = r;
    } else {
      const j = t;
      se = wt(
        j.length > 1 ? j(
          f,
          { attrs: r, slots: n, emit: c }
        ) : j(
          f,
          null
        )
      ), X = t.props ? r : Vu(r);
    }
  } catch (j) {
    Li.length = 0, Ka(j, e, 1), se = At(Lt);
  }
  let W = se;
  if (X && M !== !1) {
    const j = Object.keys(X), { shapeFlag: L } = W;
    j.length && L & 7 && (s && j.some(za) && (X = ju(
      X,
      s
    )), W = yi(W, X, !1, !0));
  }
  return i.dirs && (W = yi(W, null, !1, !0), W.dirs = W.dirs ? W.dirs.concat(i.dirs) : i.dirs), i.transition && os(W, i.transition), se = W, Ta(J), se;
}
const Vu = (e) => {
  let t;
  for (const i in e)
    (i === "class" || i === "style" || qa(i)) && ((t || (t = {}))[i] = e[i]);
  return t;
}, ju = (e, t) => {
  const i = {};
  for (const a in e)
    (!za(a) || !(a.slice(9) in t)) && (i[a] = e[a]);
  return i;
};
function Cu(e, t, i) {
  const { props: a, children: o, component: s } = e, { props: n, children: r, patchFlag: c } = t, d = s.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (i && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return a ? Us(a, n, d) : !!n;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        if (Or(n, a, p) && !Ya(d, p))
          return !0;
      }
    }
  } else
    return (o || r) && (!r || !r.$stable) ? !0 : a === n ? !1 : a ? n ? Us(a, n, d) : !0 : !!n;
  return !1;
}
function Us(e, t, i) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < a.length; o++) {
    const s = a[o];
    if (Or(t, e, s) && !Ya(i, s))
      return !0;
  }
  return !1;
}
function Or(e, t, i) {
  const a = e[i], o = t[i];
  return i === "style" && ve(a) && ve(o) ? !ia(a, o) : a !== o;
}
function Eu({ vnode: e, parent: t, suspense: i }, a) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = a, e = o), o === e)
      (e = t.vnode).el = a, t = t.parent;
    else
      break;
  }
  i && i.activeBranch === e && (i.vnode.el = a);
}
const $r = {}, Pr = () => Object.create($r), Rr = (e) => Object.getPrototypeOf(e) === $r;
function Ou(e, t, i, a = !1) {
  const o = {}, s = Pr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ur(e, t, o, s);
  for (const n in e.propsOptions[0])
    n in o || (o[n] = void 0);
  i ? e.props = a ? o : /* @__PURE__ */ qd(o) : e.type.props ? e.props = o : e.props = s, e.attrs = s;
}
function $u(e, t, i, a) {
  const {
    props: o,
    attrs: s,
    vnode: { patchFlag: n }
  } = e, r = /* @__PURE__ */ ue(o), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (a || n > 0) && !(n & 16)
  ) {
    if (n & 8) {
      const u = e.vnode.dynamicProps;
      for (let f = 0; f < u.length; f++) {
        let p = u[f];
        if (Ya(e.emitsOptions, p))
          continue;
        const b = t[p];
        if (c)
          if (fe(s, p))
            b !== s[p] && (s[p] = b, d = !0);
          else {
            const E = ft(p);
            o[E] = Po(
              c,
              r,
              E,
              b,
              e,
              !1
            );
          }
        else
          b !== s[p] && (s[p] = b, d = !0);
      }
    }
  } else {
    Ur(e, t, o, s) && (d = !0);
    let u;
    for (const f in r)
      (!t || // for camelCase
      !fe(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Jt(f)) === f || !fe(t, u))) && (c ? i && // for camelCase
      (i[f] !== void 0 || // for kebab-case
      i[u] !== void 0) && (o[f] = Po(
        c,
        r,
        f,
        void 0,
        e,
        !0
      )) : delete o[f]);
    if (s !== r)
      for (const f in s)
        (!t || !fe(t, f)) && (delete s[f], d = !0);
  }
  d && Et(e.attrs, "set", "");
}
function Ur(e, t, i, a) {
  const [o, s] = e.propsOptions;
  let n = !1, r;
  if (t)
    for (let c in t) {
      if (Ri(c))
        continue;
      const d = t[c];
      let u;
      o && fe(o, u = ft(c)) ? !s || !s.includes(u) ? i[u] = d : (r || (r = {}))[u] = d : Ya(e.emitsOptions, c) || (!(c in a) || d !== a[c]) && (a[c] = d, n = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ ue(i), d = r || ye;
    for (let u = 0; u < s.length; u++) {
      const f = s[u];
      i[f] = Po(
        o,
        c,
        f,
        d[f],
        e,
        !fe(d, f)
      );
    }
  }
  return n;
}
function Po(e, t, i, a, o, s) {
  const n = e[i];
  if (n != null) {
    const r = fe(n, "default");
    if (r && a === void 0) {
      const c = n.default;
      if (n.type !== Function && !n.skipFactory && te(c)) {
        const { propsDefaults: d } = o;
        if (i in d)
          a = d[i];
        else {
          const u = oa(o);
          a = d[i] = c.call(
            null,
            t
          ), u();
        }
      } else
        a = c;
      o.ce && o.ce._setProp(i, a);
    }
    n[
      0
      /* shouldCast */
    ] && (s && !r ? a = !1 : n[
      1
      /* shouldCastTrue */
    ] && (a === "" || a === Jt(i)) && (a = !0));
  }
  return a;
}
const Pu = /* @__PURE__ */ new WeakMap();
function Zr(e, t, i = !1) {
  const a = i ? Pu : t.propsCache, o = a.get(e);
  if (o)
    return o;
  const s = e.props, n = {}, r = [];
  let c = !1;
  if (!te(e)) {
    const u = (f) => {
      c = !0;
      const [p, b] = Zr(f, t, !0);
      Me(n, p), b && r.push(...b);
    };
    !i && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!s && !c)
    return ve(e) && a.set(e, bi), bi;
  if (K(s))
    for (let u = 0; u < s.length; u++) {
      const f = ft(s[u]);
      Zs(f) && (n[f] = ye);
    }
  else if (s)
    for (const u in s) {
      const f = ft(u);
      if (Zs(f)) {
        const p = s[u], b = n[f] = K(p) || te(p) ? { type: p } : Me({}, p), E = b.type;
        let M = !1, J = !0;
        if (K(E))
          for (let se = 0; se < E.length; ++se) {
            const X = E[se], W = te(X) && X.name;
            if (W === "Boolean") {
              M = !0;
              break;
            } else W === "String" && (J = !1);
          }
        else
          M = te(E) && E.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = M, b[
          1
          /* shouldCastTrue */
        ] = J, (M || fe(b, "default")) && r.push(f);
      }
    }
  const d = [n, r];
  return ve(e) && a.set(e, d), d;
}
function Zs(e) {
  return e[0] !== "$" && !Ri(e);
}
const rs = (e) => e === "_" || e === "_ctx" || e === "$stable", cs = (e) => K(e) ? e.map(wt) : [wt(e)], Ru = (e, t, i) => {
  if (t._n)
    return t;
  const a = Xd((...o) => cs(t(...o)), i);
  return a._c = !1, a;
}, qr = (e, t, i) => {
  const a = e._ctx;
  for (const o in e) {
    if (rs(o)) continue;
    const s = e[o];
    if (te(s))
      t[o] = Ru(o, s, a);
    else if (s != null) {
      const n = cs(s);
      t[o] = () => n;
    }
  }
}, zr = (e, t) => {
  const i = cs(t);
  e.slots.default = () => i;
}, Fr = (e, t, i) => {
  for (const a in t)
    (i || !rs(a)) && (e[a] = t[a]);
}, Uu = (e, t, i) => {
  const a = e.slots = Pr();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Fr(a, t, i), i && Dn(a, "_", o, !0)) : qr(t, a);
  } else t && zr(e, t);
}, Zu = (e, t, i) => {
  const { vnode: a, slots: o } = e;
  let s = !0, n = ye;
  if (a.shapeFlag & 32) {
    const r = t._;
    r ? i && r === 1 ? s = !1 : Fr(o, t, i) : (s = !t.$stable, qr(t, o)), n = t;
  } else t && (zr(e, t), n = { default: 1 });
  if (s)
    for (const r in o)
      !rs(r) && n[r] == null && delete o[r];
}, We = Nu;
function qu(e) {
  return zu(e);
}
function zu(e, t) {
  const i = La();
  i.__VUE__ = !0;
  const {
    insert: a,
    remove: o,
    patchProp: s,
    createElement: n,
    createText: r,
    createComment: c,
    setText: d,
    setElementText: u,
    parentNode: f,
    nextSibling: p,
    setScopeId: b = It,
    insertStaticContent: E
  } = e, M = (l, m, _, T = null, I = null, w = null, O = void 0, V = null, S = !!m.dynamicChildren) => {
    if (l === m)
      return;
    l && !Si(l, m) && (T = Kt(l), pe(l, I, w, !0), l = null), m.patchFlag === -2 && (S = !1, m.dynamicChildren = null);
    const { type: k, ref: D, shapeFlag: R } = m;
    switch (k) {
      case Xa:
        J(l, m, _, T);
        break;
      case Lt:
        se(l, m, _, T);
        break;
      case go:
        l == null && X(m, _, T, O);
        break;
      case de:
        Ue(
          l,
          m,
          _,
          T,
          I,
          w,
          O,
          V,
          S
        );
        break;
      default:
        R & 1 ? L(
          l,
          m,
          _,
          T,
          I,
          w,
          O,
          V,
          S
        ) : R & 6 ? Ge(
          l,
          m,
          _,
          T,
          I,
          w,
          O,
          V,
          S
        ) : (R & 64 || R & 128) && k.process(
          l,
          m,
          _,
          T,
          I,
          w,
          O,
          V,
          S,
          Gt
        );
    }
    D != null && I ? Fi(D, l && l.ref, w, m || l, !m) : D == null && l && l.ref != null && Fi(l.ref, null, w, l, !0);
  }, J = (l, m, _, T) => {
    if (l == null)
      a(
        m.el = r(m.children),
        _,
        T
      );
    else {
      const I = m.el = l.el;
      m.children !== l.children && d(I, m.children);
    }
  }, se = (l, m, _, T) => {
    l == null ? a(
      m.el = c(m.children || ""),
      _,
      T
    ) : m.el = l.el;
  }, X = (l, m, _, T) => {
    [l.el, l.anchor] = E(
      l.children,
      m,
      _,
      T,
      l.el,
      l.anchor
    );
  }, W = ({ el: l, anchor: m }, _, T) => {
    let I;
    for (; l && l !== m; )
      I = p(l), a(l, _, T), l = I;
    a(m, _, T);
  }, j = ({ el: l, anchor: m }) => {
    let _;
    for (; l && l !== m; )
      _ = p(l), o(l), l = _;
    o(m);
  }, L = (l, m, _, T, I, w, O, V, S) => {
    if (m.type === "svg" ? O = "svg" : m.type === "math" && (O = "mathml"), l == null)
      je(
        m,
        _,
        T,
        I,
        w,
        O,
        V,
        S
      );
    else {
      const k = l.el && l.el._isVueCE ? l.el : null;
      try {
        k && k._beginPatch(), ie(
          l,
          m,
          I,
          w,
          O,
          V,
          S
        );
      } finally {
        k && k._endPatch();
      }
    }
  }, je = (l, m, _, T, I, w, O, V) => {
    let S, k;
    const { props: D, shapeFlag: R, transition: N, dirs: G } = l;
    if (S = l.el = n(
      l.type,
      w,
      D && D.is,
      D
    ), R & 8 ? u(S, l.children) : R & 16 && Q(
      l.children,
      S,
      null,
      T,
      I,
      mo(l, w),
      O,
      V
    ), G && Yt(l, null, T, "created"), ke(S, l, l.scopeId, O, T), D) {
      for (const be in D)
        be !== "value" && !Ri(be) && s(S, be, null, D[be], w, T);
      "value" in D && s(S, "value", null, D.value, w), (k = D.onVnodeBeforeMount) && vt(k, T, l);
    }
    G && Yt(l, null, T, "beforeMount");
    const ne = Fu(I, N);
    ne && N.beforeEnter(S), a(S, m, _), ((k = D && D.onVnodeMounted) || ne || G) && We(() => {
      k && vt(k, T, l), ne && N.enter(S), G && Yt(l, null, T, "mounted");
    }, I);
  }, ke = (l, m, _, T, I) => {
    if (_ && b(l, _), T)
      for (let w = 0; w < T.length; w++)
        b(l, T[w]);
    if (I) {
      let w = I.subTree;
      if (m === w || Hr(w.type) && (w.ssContent === m || w.ssFallback === m)) {
        const O = I.vnode;
        ke(
          l,
          O,
          O.scopeId,
          O.slotScopeIds,
          I.parent
        );
      }
    }
  }, Q = (l, m, _, T, I, w, O, V, S = 0) => {
    for (let k = S; k < l.length; k++) {
      const D = l[k] = V ? Ct(l[k]) : wt(l[k]);
      M(
        null,
        D,
        m,
        _,
        T,
        I,
        w,
        O,
        V
      );
    }
  }, ie = (l, m, _, T, I, w, O) => {
    const V = m.el = l.el;
    let { patchFlag: S, dynamicChildren: k, dirs: D } = m;
    S |= l.patchFlag & 16;
    const R = l.props || ye, N = m.props || ye;
    let G;
    if (_ && Xt(_, !1), (G = N.onVnodeBeforeUpdate) && vt(G, _, m, l), D && Yt(m, l, _, "beforeUpdate"), _ && Xt(_, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    k && (!l.dynamicChildren || l.dynamicChildren.length !== k.length) && (S = 0, O = !1, k = null), (R.innerHTML && N.innerHTML == null || R.textContent && N.textContent == null) && u(V, ""), k ? _e(
      l.dynamicChildren,
      k,
      V,
      _,
      T,
      mo(m, I),
      w
    ) : O || re(
      l,
      m,
      V,
      null,
      _,
      T,
      mo(m, I),
      w,
      !1
    ), S > 0) {
      if (S & 16)
        ae(V, R, N, _, I);
      else if (S & 2 && R.class !== N.class && s(V, "class", null, N.class, I), S & 4 && s(V, "style", R.style, N.style, I), S & 8) {
        const ne = m.dynamicProps;
        for (let be = 0; be < ne.length; be++) {
          const ce = ne[be], Ce = R[ce], Ze = N[ce];
          (Ze !== Ce || ce === "value") && s(V, ce, Ce, Ze, I, _);
        }
      }
      S & 1 && l.children !== m.children && u(V, m.children);
    } else !O && k == null && ae(V, R, N, _, I);
    ((G = N.onVnodeUpdated) || D) && We(() => {
      G && vt(G, _, m, l), D && Yt(m, l, _, "updated");
    }, T);
  }, _e = (l, m, _, T, I, w, O) => {
    for (let V = 0; V < m.length; V++) {
      const S = l[V], k = m[V], D = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Si(S, k) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? f(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          _
        )
      );
      M(
        S,
        k,
        D,
        null,
        T,
        I,
        w,
        O,
        !0
      );
    }
  }, ae = (l, m, _, T, I) => {
    if (m !== _) {
      if (m !== ye)
        for (const w in m)
          !Ri(w) && !(w in _) && s(
            l,
            w,
            m[w],
            null,
            I,
            T
          );
      for (const w in _) {
        if (Ri(w)) continue;
        const O = _[w], V = m[w];
        O !== V && w !== "value" && s(l, w, V, O, I, T);
      }
      "value" in _ && s(l, "value", m.value, _.value, I);
    }
  }, Ue = (l, m, _, T, I, w, O, V, S) => {
    const k = m.el = l ? l.el : r(""), D = m.anchor = l ? l.anchor : r("");
    let { patchFlag: R, dynamicChildren: N, slotScopeIds: G } = m;
    G && (V = V ? V.concat(G) : G), l == null ? (a(k, _, T), a(D, _, T), Q(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      _,
      D,
      I,
      w,
      O,
      V,
      S
    )) : R > 0 && R & 64 && N && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren && l.dynamicChildren.length === N.length ? (_e(
      l.dynamicChildren,
      N,
      _,
      I,
      w,
      O,
      V
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || I && m === I.subTree) && Mr(
      l,
      m,
      !0
      /* shallow */
    )) : re(
      l,
      m,
      _,
      D,
      I,
      w,
      O,
      V,
      S
    );
  }, Ge = (l, m, _, T, I, w, O, V, S) => {
    m.slotScopeIds = V, l == null ? m.shapeFlag & 512 ? I.ctx.activate(
      m,
      _,
      T,
      O,
      S
    ) : ot(
      m,
      _,
      T,
      I,
      w,
      O,
      S
    ) : gt(l, m, S);
  }, ot = (l, m, _, T, I, w, O) => {
    const V = l.component = Gu(
      l,
      T,
      I
    );
    if (Ar(l) && (V.ctx.renderer = Gt), Wu(V, !1, O), V.asyncDep) {
      if (I && I.registerDep(V, le, O), !l.el) {
        const S = V.subTree = At(Lt);
        se(null, S, m, _), l.placeholder = S.el;
      }
    } else
      le(
        V,
        l,
        m,
        _,
        I,
        w,
        O
      );
  }, gt = (l, m, _) => {
    const T = m.component = l.component;
    if (Cu(l, m, _))
      if (T.asyncDep && !T.asyncResolved) {
        Y(T, m, _);
        return;
      } else
        T.next = m, T.update();
    else
      m.el = l.el, T.vnode = m;
  }, le = (l, m, _, T, I, w, O) => {
    const V = () => {
      if (l.isMounted) {
        let { next: R, bu: N, u: G, parent: ne, vnode: be } = l;
        {
          const rt = Nr(l);
          if (rt) {
            R && (R.el = be.el, Y(l, R, O)), rt.asyncDep.then(() => {
              We(() => {
                l.isUnmounted || k();
              }, I);
            });
            return;
          }
        }
        let ce = R, Ce;
        Xt(l, !1), R ? (R.el = be.el, Y(l, R, O)) : R = be, N && ya(N), (Ce = R.props && R.props.onVnodeBeforeUpdate) && vt(Ce, ne, R, be), Xt(l, !0);
        const Ze = Rs(l), nt = l.subTree;
        l.subTree = Ze, M(
          nt,
          Ze,
          // parent may have changed if it's in a teleport
          f(nt.el),
          // anchor may have changed if it's in a fragment
          Kt(nt),
          l,
          I,
          w
        ), R.el = Ze.el, ce === null && Eu(l, Ze.el), G && We(G, I), (Ce = R.props && R.props.onVnodeUpdated) && We(
          () => vt(Ce, ne, R, be),
          I
        );
      } else {
        let R;
        const { el: N, props: G } = m, { bm: ne, m: be, parent: ce, root: Ce, type: Ze } = l, nt = Mi(m);
        Xt(l, !1), ne && ya(ne), !nt && (R = G && G.onVnodeBeforeMount) && vt(R, ce, m), Xt(l, !0);
        {
          Ce.ce && Ce.ce._hasShadowRoot() && Ce.ce._injectChildStyle(
            Ze,
            l.parent ? l.parent.type : void 0
          );
          const rt = l.subTree = Rs(l);
          M(
            null,
            rt,
            _,
            T,
            l,
            I,
            w
          ), m.el = rt.el;
        }
        if (be && We(be, I), !nt && (R = G && G.onVnodeMounted)) {
          const rt = m;
          We(
            () => vt(R, ce, rt),
            I
          );
        }
        (m.shapeFlag & 256 || ce && Mi(ce.vnode) && ce.vnode.shapeFlag & 256) && l.a && We(l.a, I), l.isMounted = !0, m = _ = T = null;
      }
    };
    l.scope.on();
    const S = l.effect = new er(V);
    l.scope.off();
    const k = l.update = S.run.bind(S), D = l.job = S.runIfDirty.bind(S);
    D.i = l, D.id = l.uid, S.scheduler = () => as(D), Xt(l, !0), k();
  }, Y = (l, m, _) => {
    m.component = l;
    const T = l.vnode.props;
    l.vnode = m, l.next = null, $u(l, m.props, T, _), Zu(l, m.children, _), Tt(), Vs(l), xt();
  }, re = (l, m, _, T, I, w, O, V, S = !1) => {
    const k = l && l.children, D = l ? l.shapeFlag : 0, R = m.children, { patchFlag: N, shapeFlag: G } = m;
    if (N > 0) {
      if (N & 128) {
        H(
          k,
          R,
          _,
          T,
          I,
          w,
          O,
          V,
          S
        );
        return;
      } else if (N & 256) {
        C(
          k,
          R,
          _,
          T,
          I,
          w,
          O,
          V,
          S
        );
        return;
      }
    }
    G & 8 ? (D & 16 && lt(k, I, w), R !== k && u(_, R)) : D & 16 ? G & 16 ? H(
      k,
      R,
      _,
      T,
      I,
      w,
      O,
      V,
      S
    ) : lt(k, I, w, !0) : (D & 8 && u(_, ""), G & 16 && Q(
      R,
      _,
      T,
      I,
      w,
      O,
      V,
      S
    ));
  }, C = (l, m, _, T, I, w, O, V, S) => {
    l = l || bi, m = m || bi;
    const k = l.length, D = m.length, R = Math.min(k, D);
    let N;
    for (N = 0; N < R; N++) {
      const G = m[N] = S ? Ct(m[N]) : wt(m[N]);
      M(
        l[N],
        G,
        _,
        null,
        I,
        w,
        O,
        V,
        S
      );
    }
    k > D ? lt(
      l,
      I,
      w,
      !0,
      !1,
      R
    ) : Q(
      m,
      _,
      T,
      I,
      w,
      O,
      V,
      S,
      R
    );
  }, H = (l, m, _, T, I, w, O, V, S) => {
    let k = 0;
    const D = m.length;
    let R = l.length - 1, N = D - 1;
    for (; k <= R && k <= N; ) {
      const G = l[k], ne = m[k] = S ? Ct(m[k]) : wt(m[k]);
      if (Si(G, ne))
        M(
          G,
          ne,
          _,
          null,
          I,
          w,
          O,
          V,
          S
        );
      else
        break;
      k++;
    }
    for (; k <= R && k <= N; ) {
      const G = l[R], ne = m[N] = S ? Ct(m[N]) : wt(m[N]);
      if (Si(G, ne))
        M(
          G,
          ne,
          _,
          null,
          I,
          w,
          O,
          V,
          S
        );
      else
        break;
      R--, N--;
    }
    if (k > R) {
      if (k <= N) {
        const G = N + 1, ne = G < D ? m[G].el : T;
        for (; k <= N; )
          M(
            null,
            m[k] = S ? Ct(m[k]) : wt(m[k]),
            _,
            ne,
            I,
            w,
            O,
            V,
            S
          ), k++;
      }
    } else if (k > N)
      for (; k <= R; )
        pe(l[k], I, w, !0), k++;
    else {
      const G = k, ne = k, be = /* @__PURE__ */ new Map();
      for (k = ne; k <= N; k++) {
        const oe = m[k] = S ? Ct(m[k]) : wt(m[k]);
        oe.key != null && be.set(oe.key, k);
      }
      let ce, Ce = 0;
      const Ze = N - ne + 1;
      let nt = !1, rt = 0;
      const x = new Array(Ze);
      for (k = 0; k < Ze; k++) x[k] = 0;
      for (k = G; k <= R; k++) {
        const oe = l[k];
        if (Ce >= Ze) {
          pe(oe, I, w, !0);
          continue;
        }
        let he;
        if (oe.key != null)
          he = be.get(oe.key);
        else
          for (ce = ne; ce <= N; ce++)
            if (x[ce - ne] === 0 && Si(oe, m[ce])) {
              he = ce;
              break;
            }
        he === void 0 ? pe(oe, I, w, !0) : (x[he - ne] = k + 1, he >= rt ? rt = he : nt = !0, M(
          oe,
          m[he],
          _,
          null,
          I,
          w,
          O,
          V,
          S
        ), Ce++);
      }
      const q = nt ? Mu(x) : bi;
      for (ce = q.length - 1, k = Ze - 1; k >= 0; k--) {
        const oe = ne + k, he = m[oe], Qe = m[oe + 1], Wt = oe + 1 < D ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Qe.el || Lr(Qe)
        ) : T;
        x[k] === 0 ? M(
          null,
          he,
          _,
          Wt,
          I,
          w,
          O,
          V,
          S
        ) : nt && (ce < 0 || k !== q[ce] ? v(he, _, Wt, 2) : ce--);
      }
    }
  }, v = (l, m, _, T, I = null) => {
    const { el: w, type: O, transition: V, children: S, shapeFlag: k } = l;
    if (k & 6) {
      v(l.component.subTree, m, _, T);
      return;
    }
    if (k & 128) {
      l.suspense.move(m, _, T);
      return;
    }
    if (k & 64) {
      O.move(l, m, _, Gt);
      return;
    }
    if (O === de) {
      a(w, m, _);
      for (let R = 0; R < S.length; R++)
        v(S[R], m, _, T);
      a(l.anchor, m, _);
      return;
    }
    if (O === go) {
      W(l, m, _);
      return;
    }
    if (T !== 2 && k & 1 && V)
      if (T === 0)
        V.persisted && !w[bo] ? a(w, m, _) : (V.beforeEnter(w), a(w, m, _), We(() => V.enter(w), I));
      else {
        const { leave: R, delayLeave: N, afterLeave: G } = V, ne = () => {
          l.ctx.isUnmounted ? o(w) : a(w, m, _);
        }, be = () => {
          const ce = w._isLeaving || !!w[bo];
          w._isLeaving && w[bo](
            !0
            /* cancelled */
          ), V.persisted && !ce ? ne() : R(w, () => {
            ne(), G && G();
          });
        };
        N ? N(w, ne, be) : be();
      }
    else
      a(w, m, _);
  }, pe = (l, m, _, T = !1, I = !1) => {
    const {
      type: w,
      props: O,
      ref: V,
      children: S,
      dynamicChildren: k,
      shapeFlag: D,
      patchFlag: R,
      dirs: N,
      cacheIndex: G,
      memo: ne
    } = l;
    if (R === -2 && (I = !1), V != null && (Tt(), Fi(V, null, _, l, !0), xt()), G != null && (m.renderCache[G] = void 0), D & 256) {
      m.ctx.deactivate(l);
      return;
    }
    const be = D & 1 && N, ce = !Mi(l);
    let Ce;
    if (ce && (Ce = O && O.onVnodeBeforeUnmount) && vt(Ce, m, l), D & 6)
      da(l.component, _, T);
    else {
      if (D & 128) {
        l.suspense.unmount(_, T);
        return;
      }
      be && Yt(l, null, m, "beforeUnmount"), D & 64 ? l.type.remove(
        l,
        m,
        _,
        Gt,
        T
      ) : k && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !k.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== de || R > 0 && R & 64) ? lt(
        k,
        m,
        _,
        !1,
        !0
      ) : (w === de && R & 384 || !I && D & 16) && lt(S, m, _), T && st(l);
    }
    const Ze = ne != null && G == null;
    (ce && (Ce = O && O.onVnodeUnmounted) || be || Ze) && We(() => {
      Ce && vt(Ce, m, l), be && Yt(l, null, m, "unmounted"), Ze && (l.el = null);
    }, _);
  }, st = (l) => {
    const { type: m, el: _, anchor: T, transition: I } = l;
    if (m === de) {
      ro(_, T);
      return;
    }
    if (m === go) {
      j(l);
      return;
    }
    const w = () => {
      o(_), I && !I.persisted && I.afterLeave && I.afterLeave();
    };
    if (l.shapeFlag & 1 && I && !I.persisted) {
      const { leave: O, delayLeave: V } = I, S = () => O(_, w);
      V ? V(l.el, w, S) : S();
    } else
      w();
  }, ro = (l, m) => {
    let _;
    for (; l !== m; )
      _ = p(l), o(l), l = _;
    o(m);
  }, da = (l, m, _) => {
    const { bum: T, scope: I, job: w, subTree: O, um: V, m: S, a: k } = l;
    qs(S), qs(k), T && ya(T), I.stop(), w && (w.flags |= 8, pe(O, l, m, _)), V && We(V, m), We(() => {
      l.isUnmounted = !0;
    }, m);
  }, lt = (l, m, _, T = !1, I = !1, w = 0) => {
    for (let O = w; O < l.length; O++)
      pe(l[O], m, _, T, I);
  }, Kt = (l) => {
    if (l.shapeFlag & 6)
      return Kt(l.component.subTree);
    if (l.shapeFlag & 128)
      return l.suspense.next();
    const m = p(l.anchor || l.el), _ = m && m[ou];
    return _ ? p(_) : m;
  };
  let Ti = !1;
  const ua = (l, m, _) => {
    let T;
    l == null ? m._vnode && (pe(m._vnode, null, null, !0), T = m._vnode.component) : M(
      m._vnode || null,
      l,
      m,
      null,
      null,
      null,
      _
    ), m._vnode = l, Ti || (Ti = !0, Vs(T), vr(), Ti = !1);
  }, Gt = {
    p: M,
    um: pe,
    m: v,
    r: st,
    mt: ot,
    mc: Q,
    pc: re,
    pbc: _e,
    n: Kt,
    o: e
  };
  return {
    render: ua,
    hydrate: void 0,
    createApp: Au(ua)
  };
}
function mo({ type: e, props: t }, i) {
  return i === "svg" && e === "foreignObject" || i === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : i;
}
function Xt({ effect: e, job: t }, i) {
  i ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Mr(e, t, i = !1) {
  const a = e.children, o = t.children;
  if (K(a) && K(o))
    for (let s = 0; s < a.length; s++) {
      const n = a[s];
      let r = o[s];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = o[s] = Ct(o[s]), r.el = n.el), !i && r.patchFlag !== -2 && Mr(n, r)), r.type === Xa && (r.patchFlag === -1 && (r = o[s] = Ct(r)), r.el = n.el), r.type === Lt && !r.el && (r.el = n.el);
    }
}
function Mu(e) {
  const t = e.slice(), i = [0];
  let a, o, s, n, r;
  const c = e.length;
  for (a = 0; a < c; a++) {
    const d = e[a];
    if (d !== 0) {
      if (o = i[i.length - 1], e[o] < d) {
        t[a] = o, i.push(a);
        continue;
      }
      for (s = 0, n = i.length - 1; s < n; )
        r = s + n >> 1, e[i[r]] < d ? s = r + 1 : n = r;
      d < e[i[s]] && (s > 0 && (t[a] = i[s - 1]), i[s] = a);
    }
  }
  for (s = i.length, n = i[s - 1]; s-- > 0; )
    i[s] = n, n = t[n];
  return i;
}
function Nr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Nr(t);
}
function qs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Lr(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Lr(t.subTree) : null;
}
const Hr = (e) => e.__isSuspense;
function Nu(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : Yd(e);
}
const de = /* @__PURE__ */ Symbol.for("v-fgt"), Xa = /* @__PURE__ */ Symbol.for("v-txt"), Lt = /* @__PURE__ */ Symbol.for("v-cmt"), go = /* @__PURE__ */ Symbol.for("v-stc"), Li = [];
let it = null;
function U(e = !1) {
  Li.push(it = e ? null : []);
}
function Lu() {
  Li.pop(), it = Li[Li.length - 1] || null;
}
let Wi = 1;
function zs(e, t = !1) {
  Wi += e, e < 0 && it && t && (it.hasOnce = !0);
}
function Jr(e) {
  return e.dynamicChildren = Wi > 0 ? it || bi : null, Lu(), Wi > 0 && it && it.push(e), e;
}
function Z(e, t, i, a, o, s) {
  return Jr(
    h(
      e,
      t,
      i,
      a,
      o,
      s,
      !0
    )
  );
}
function Dr(e, t, i, a, o) {
  return Jr(
    At(
      e,
      t,
      i,
      a,
      o,
      !0
    )
  );
}
function Br(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Si(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Kr = ({ key: e }) => e ?? null, wa = ({
  ref: e,
  ref_key: t,
  ref_for: i
}) => (typeof e == "number" && (e = "" + e), e != null ? $e(e) || /* @__PURE__ */ Pe(e) || te(e) ? { i: ct, r: e, k: t, f: !!i } : e : null);
function h(e, t = null, i = null, a = 0, o = null, s = e === de ? 0 : 1, n = !1, r = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Kr(t),
    ref: t && wa(t),
    scopeId: yr,
    slotScopeIds: null,
    children: i,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: a,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ct
  };
  return r ? (Va(c, i), s & 128 && e.normalize(c)) : i && (c.shapeFlag |= $e(i) ? 8 : 16), Wi > 0 && // avoid a block node from tracking itself
  !n && // has current parent block
  it && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && it.push(c), c;
}
const At = Hu;
function Hu(e, t = null, i = null, a = 0, o = null, s = !1) {
  if ((!e || e === mu) && (e = Lt), Br(e)) {
    const r = yi(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return i && Va(r, i), Wi > 0 && !s && it && (r.shapeFlag & 6 ? it[it.indexOf(e)] = r : it.push(r)), r.patchFlag = -2, r;
  }
  if (el(e) && (e = e.__vccOpts), t) {
    t = Ju(t);
    let { class: r, style: c } = t;
    r && !$e(r) && (t.class = pt(r)), ve(c) && (/* @__PURE__ */ Ba(c) && !K(c) && (c = Me({}, c)), t.style = Ha(c));
  }
  const n = $e(e) ? 1 : Hr(e) ? 128 : su(e) ? 64 : ve(e) ? 4 : te(e) ? 2 : 0;
  return h(
    e,
    t,
    i,
    a,
    o,
    n,
    s,
    !0
  );
}
function Ju(e) {
  return e ? /* @__PURE__ */ Ba(e) || Rr(e) ? Me({}, e) : e : null;
}
function yi(e, t, i = !1, a = !1) {
  const { props: o, ref: s, patchFlag: n, children: r, transition: c } = e, d = t ? Du(o || {}, t) : o, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Kr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      i && s ? K(s) ? s.concat(wa(t)) : [s, wa(t)] : wa(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? n === -1 ? 16 : n | 16 : n,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && yi(e.ssContent),
    ssFallback: e.ssFallback && yi(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && a && os(
    u,
    c.clone(u)
  ), u;
}
function Nt(e = " ", t = 0) {
  return At(Xa, null, e, t);
}
function et(e = "", t = !1) {
  return t ? (U(), Dr(Lt, null, e)) : At(Lt, null, e);
}
function wt(e) {
  return e == null || typeof e == "boolean" ? At(Lt) : K(e) ? At(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Br(e) ? Ct(e) : At(Xa, null, String(e));
}
function Ct(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : yi(e);
}
function Va(e, t) {
  let i = 0;
  const { shapeFlag: a } = e;
  if (t == null)
    t = null;
  else if (K(t))
    i = 16;
  else if (typeof t == "object")
    if (a & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Va(e, o()), o._c && (o._d = !0));
      return;
    } else {
      i = 32;
      const o = t._;
      !o && !Rr(t) ? t._ctx = ct : o === 3 && ct && (ct.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (te(t)) {
    if (a & 65) {
      Va(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ct }, i = 32;
  } else
    t = String(t), a & 64 ? (i = 16, t = [Nt(t)]) : i = 8;
  e.children = t, e.shapeFlag |= i;
}
function Du(...e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    for (const o in a)
      if (o === "class")
        t.class !== a.class && (t.class = pt([t.class, a.class]));
      else if (o === "style")
        t.style = Ha([t.style, a.style]);
      else if (qa(o)) {
        const s = t[o], n = a[o];
        n && s !== n && !(K(s) && s.includes(n)) ? t[o] = s ? [].concat(s, n) : n : n == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !za(o) && (t[o] = n);
      } else o !== "" && (t[o] = a[o]);
  }
  return t;
}
function vt(e, t, i, a = null) {
  mt(e, t, 7, [
    i,
    a
  ]);
}
const Bu = Cr();
let Ku = 0;
function Gu(e, t, i) {
  const a = e.type, o = (t ? t.appContext : e.appContext) || Bu, s = {
    uid: Ku++,
    vnode: e,
    type: a,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Yn(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Zr(a, o),
    emitsOptions: Er(a, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ye,
    // inheritAttrs
    inheritAttrs: a.inheritAttrs,
    // state
    ctx: ye,
    data: ye,
    props: ye,
    attrs: ye,
    slots: ye,
    refs: ye,
    setupState: ye,
    setupContext: null,
    // suspense related
    suspense: i,
    suspenseId: i ? i.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = xu.bind(null, s), e.ce && e.ce(s), s;
}
let Be = null;
const Gr = () => Be || ct;
let ja, Ro;
{
  const e = La(), t = (i, a) => {
    let o;
    return (o = e[i]) || (o = e[i] = []), o.push(a), (s) => {
      o.length > 1 ? o.forEach((n) => n(s)) : o[0](s);
    };
  };
  ja = t(
    "__VUE_INSTANCE_SETTERS__",
    (i) => Be = i
  ), Ro = t(
    "__VUE_SSR_SETTERS__",
    (i) => Yi = i
  );
}
const oa = (e) => {
  const t = Be;
  return ja(e), e.scope.on(), () => {
    e.scope.off(), ja(t);
  };
}, Fs = () => {
  Be && Be.scope.off(), ja(null);
};
function Wr(e) {
  return e.vnode.shapeFlag & 4;
}
let Yi = !1;
function Wu(e, t = !1, i = !1) {
  t && Ro(t);
  const { props: a, children: o } = e.vnode, s = Wr(e);
  Ou(e, a, s, t), Uu(e, o, i || t);
  const n = s ? Yu(e, t) : void 0;
  return t && Ro(!1), n;
}
function Yu(e, t) {
  const i = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, gu);
  const { setup: a } = i;
  if (a) {
    Tt();
    const o = e.setupContext = a.length > 1 ? Qu(e) : null, s = oa(e), n = aa(
      a,
      e,
      0,
      [
        e.props,
        o
      ]
    ), r = Nn(n);
    if (xt(), s(), (r || e.sp) && !Mi(e) && Ir(e), r) {
      if (n.then(Fs, Fs), t)
        return n.then((c) => {
          Ms(e, c);
        }).catch((c) => {
          Ka(c, e, 0);
        });
      e.asyncDep = n;
    } else
      Ms(e, n);
  } else
    Yr(e);
}
function Ms(e, t, i) {
  te(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ve(t) && (e.setupState = hr(t)), Yr(e);
}
function Yr(e, t, i) {
  const a = e.type;
  e.render || (e.render = a.render || It);
  {
    const o = oa(e);
    Tt();
    try {
      vu(e);
    } finally {
      xt(), o();
    }
  }
}
const Xu = {
  get(e, t) {
    return Ne(e, "get", ""), e[t];
  }
};
function Qu(e) {
  const t = (i) => {
    e.exposed = i || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Qa(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(hr(Ki(e.exposed)), {
    get(t, i) {
      if (i in t)
        return t[i];
      if (i in Ni)
        return Ni[i](e);
    },
    has(t, i) {
      return i in t || i in Ni;
    }
  })) : e.proxy;
}
function el(e) {
  return te(e) && "__vccOpts" in e;
}
const Je = (e, t) => /* @__PURE__ */ Dd(e, t, Yi), tl = "3.5.39";
let Uo;
const Ns = typeof window < "u" && window.trustedTypes;
if (Ns)
  try {
    Uo = /* @__PURE__ */ Ns.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Xr = Uo ? (e) => Uo.createHTML(e) : (e) => e, il = "http://www.w3.org/2000/svg", al = "http://www.w3.org/1998/Math/MathML", jt = typeof document < "u" ? document : null, Ls = jt && /* @__PURE__ */ jt.createElement("template"), ol = {
  insert: (e, t, i) => {
    t.insertBefore(e, i || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, i, a) => {
    const o = t === "svg" ? jt.createElementNS(il, e) : t === "mathml" ? jt.createElementNS(al, e) : i ? jt.createElement(e, { is: i }) : jt.createElement(e);
    return e === "select" && a && a.multiple != null && o.setAttribute("multiple", a.multiple), o;
  },
  createText: (e) => jt.createTextNode(e),
  createComment: (e) => jt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => jt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, i, a, o, s) {
    const n = i ? i.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), i), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      Ls.innerHTML = Xr(
        a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e
      );
      const r = Ls.content;
      if (a === "svg" || a === "mathml") {
        const c = r.firstChild;
        for (; c.firstChild; )
          r.appendChild(c.firstChild);
        r.removeChild(c);
      }
      t.insertBefore(r, i);
    }
    return [
      // first
      n ? n.nextSibling : t.firstChild,
      // last
      i ? i.previousSibling : t.lastChild
    ];
  }
}, sl = /* @__PURE__ */ Symbol("_vtc");
function nl(e, t, i) {
  const a = e[sl];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : i ? e.setAttribute("class", t) : e.className = t;
}
const Ca = /* @__PURE__ */ Symbol("_vod"), Qr = /* @__PURE__ */ Symbol("_vsh"), Vi = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: i }) {
    e[Ca] = e.style.display === "none" ? "" : e.style.display, i && t ? i.beforeEnter(e) : ji(e, t);
  },
  mounted(e, { value: t }, { transition: i }) {
    i && t && i.enter(e);
  },
  updated(e, { value: t, oldValue: i }, { transition: a }) {
    !t != !i && (a ? t ? (a.beforeEnter(e), ji(e, !0), a.enter(e)) : a.leave(e, () => {
      ji(e, !1);
    }) : ji(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ji(e, t);
  }
};
function ji(e, t) {
  e.style.display = t ? e[Ca] : "none", e[Qr] = !t;
}
const rl = /* @__PURE__ */ Symbol(""), cl = /(?:^|;)\s*display\s*:/;
function dl(e, t, i) {
  const a = e.style, o = $e(i);
  let s = !1;
  if (i && !o) {
    if (t)
      if ($e(t))
        for (const n of t.split(";")) {
          const r = n.slice(0, n.indexOf(":")).trim();
          i[r] == null && Ei(a, r, "");
        }
      else
        for (const n in t)
          i[n] == null && Ei(a, n, "");
    for (const n in i) {
      n === "display" && (s = !0);
      const r = i[n];
      r != null ? ll(
        e,
        n,
        !$e(t) && t ? t[n] : void 0,
        r
      ) || Ei(a, n, r) : Ei(a, n, "");
    }
  } else if (o) {
    if (t !== i) {
      const n = a[rl];
      n && (i += ";" + n), a.cssText = i, s = cl.test(i);
    }
  } else t && e.removeAttribute("style");
  Ca in e && (e[Ca] = s ? a.display : "", e[Qr] && (a.display = "none"));
}
const Hs = /\s*!important$/;
function Ei(e, t, i) {
  if (K(i))
    i.forEach((a) => Ei(e, t, a));
  else if (i == null && (i = ""), t.startsWith("--"))
    e.setProperty(t, i);
  else {
    const a = ul(e, t);
    Hs.test(i) ? e.setProperty(
      Jt(a),
      i.replace(Hs, ""),
      "important"
    ) : e[a] = i;
  }
}
const Js = ["Webkit", "Moz", "ms"], vo = {};
function ul(e, t) {
  const i = vo[t];
  if (i)
    return i;
  let a = ft(t);
  if (a !== "filter" && a in e)
    return vo[t] = a;
  a = Jn(a);
  for (let o = 0; o < Js.length; o++) {
    const s = Js[o] + a;
    if (s in e)
      return vo[t] = s;
  }
  return t;
}
function ll(e, t, i, a) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && $e(a) && i === a;
}
const Ds = "http://www.w3.org/1999/xlink";
function Bs(e, t, i, a, o, s = gd(t)) {
  a && t.startsWith("xlink:") ? i == null ? e.removeAttributeNS(Ds, t.slice(6, t.length)) : e.setAttributeNS(Ds, t, i) : i == null || s && !Bn(i) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : dt(i) ? String(i) : i
  );
}
function Ks(e, t, i, a, o) {
  if (t === "innerHTML" || t === "textContent") {
    i != null && (e[t] = t === "innerHTML" ? Xr(i) : i);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const r = s === "OPTION" ? e.getAttribute("value") || "" : e.value, c = i == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(i);
    (r !== c || !("_value" in e)) && (e.value = c), i == null && e.removeAttribute(t), e._value = i;
    return;
  }
  let n = !1;
  if (i === "" || i == null) {
    const r = typeof e[t];
    r === "boolean" ? i = Bn(i) : i == null && r === "string" ? (i = "", n = !0) : r === "number" && (i = 0, n = !0);
  }
  try {
    e[t] = i;
  } catch {
  }
  n && e.removeAttribute(o || t);
}
function ii(e, t, i, a) {
  e.addEventListener(t, i, a);
}
function pl(e, t, i, a) {
  e.removeEventListener(t, i, a);
}
const Gs = /* @__PURE__ */ Symbol("_vei");
function fl(e, t, i, a, o = null) {
  const s = e[Gs] || (e[Gs] = {}), n = s[t];
  if (a && n)
    n.value = a;
  else {
    const [r, c] = ml(t);
    if (a) {
      const d = s[t] = _l(
        a,
        o
      );
      ii(e, r, d, c);
    } else n && (pl(e, r, n, c), s[t] = void 0);
  }
}
const bl = /(Once|Passive|Capture)$/, hl = /^on:?(?:Once|Passive|Capture)$/;
function ml(e) {
  let t, i;
  for (; (i = e.match(bl)) && !hl.test(e); )
    t || (t = {}), e = e.slice(0, e.length - i[1].length), t[i[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Jt(e.slice(2)), t];
}
let _o = 0;
const gl = /* @__PURE__ */ Promise.resolve(), vl = () => _o || (gl.then(() => _o = 0), _o = Date.now());
function _l(e, t) {
  const i = (a) => {
    if (!a._vts)
      a._vts = Date.now();
    else if (a._vts <= i.attached)
      return;
    const o = i.value;
    if (K(o)) {
      const s = a.stopImmediatePropagation;
      a.stopImmediatePropagation = () => {
        s.call(a), a._stopped = !0;
      };
      const n = o.slice(), r = [a];
      for (let c = 0; c < n.length && !a._stopped; c++) {
        const d = n[c];
        d && mt(
          d,
          t,
          5,
          r
        );
      }
    } else
      mt(
        o,
        t,
        5,
        [a]
      );
  };
  return i.value = e, i.attached = vl(), i;
}
const Ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yl = (e, t, i, a, o, s) => {
  const n = o === "svg";
  t === "class" ? nl(e, a, n) : t === "style" ? dl(e, i, a) : qa(t) ? za(t) || fl(e, t, i, a, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wl(e, t, a, n)) ? (Ks(e, t, a), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Bs(e, t, a, n, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (kl(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !$e(a))) ? Ks(e, ft(t), a, s, t) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), Bs(e, t, a, n));
};
function wl(e, t, i, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ws(t) && te(i));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Ws(t) && $e(i) ? !1 : t in e;
}
function kl(e, t) {
  const i = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!i)
    return !1;
  const a = ft(t);
  return Array.isArray(i) ? i.some((o) => ft(o) === a) : Object.keys(i).some((o) => ft(o) === a);
}
const Ea = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return K(t) ? (i) => ya(t, i) : t;
};
function Il(e) {
  e.target.composing = !0;
}
function Ys(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const gi = /* @__PURE__ */ Symbol("_assign");
function Xs(e, t, i) {
  return t && (e = e.trim()), i && (e = Wo(e)), e;
}
const Qs = {
  created(e, { modifiers: { lazy: t, trim: i, number: a } }, o) {
    e[gi] = Ea(o);
    const s = a || o.props && o.props.type === "number";
    ii(e, t ? "change" : "input", (n) => {
      n.target.composing || e[gi](Xs(e.value, i, s));
    }), (i || s) && ii(e, "change", () => {
      e.value = Xs(e.value, i, s);
    }), t || (ii(e, "compositionstart", Il), ii(e, "compositionend", Ys), ii(e, "change", Ys));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: i, modifiers: { lazy: a, trim: o, number: s } }, n) {
    if (e[gi] = Ea(n), e.composing) return;
    const r = (s || e.type === "number") && !/^0\d/.test(e.value) ? Wo(e.value) : e.value, c = t ?? "";
    if (r === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (a && t === i || o && e.value.trim() === c) || (e.value = c);
  }
}, en = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, i) {
    e[gi] = Ea(i), ii(e, "change", () => {
      const a = e._modelValue, o = Al(e), s = e.checked, n = e[gi];
      if (K(a)) {
        const r = Kn(a, o), c = r !== -1;
        if (s && !c)
          n(a.concat(o));
        else if (!s && c) {
          const d = [...a];
          d.splice(r, 1), n(d);
        }
      } else if (Fa(a)) {
        const r = new Set(a);
        s ? r.add(o) : r.delete(o), n(r);
      } else
        n(ec(e, s));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: tn,
  beforeUpdate(e, t, i) {
    e[gi] = Ea(i), tn(e, t, i);
  }
};
function tn(e, { value: t, oldValue: i }, a) {
  e._modelValue = t;
  let o;
  if (K(t))
    o = Kn(t, a.props.value) > -1;
  else if (Fa(t))
    o = t.has(a.props.value);
  else {
    if (t === i) return;
    o = ia(t, ec(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
function Al(e) {
  return "_value" in e ? e._value : e.value;
}
function ec(e, t) {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}
const Tl = ["ctrl", "shift", "alt", "meta"], xl = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Tl.some((i) => e[`${i}Key`] && !t.includes(i))
}, Oa = (e, t) => {
  if (!e) return e;
  const i = e._withMods || (e._withMods = {}), a = t.join(".");
  return i[a] || (i[a] = ((o, ...s) => {
    for (let n = 0; n < t.length; n++) {
      const r = xl[t[n]];
      if (r && r(o, t)) return;
    }
    return e(o, ...s);
  }));
}, Sl = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, an = (e, t) => {
  const i = e._withKeys || (e._withKeys = {}), a = t.join(".");
  return i[a] || (i[a] = ((o) => {
    if (!("key" in o))
      return;
    const s = Jt(o.key);
    if (t.some(
      (n) => n === s || Sl[n] === s
    ))
      return e(o);
  }));
}, Vl = /* @__PURE__ */ Me({ patchProp: yl }, ol);
let on;
function jl() {
  return on || (on = qu(Vl));
}
const Cl = ((...e) => {
  const t = jl().createApp(...e), { mount: i } = t;
  return t.mount = (a) => {
    const o = Ol(a);
    if (!o) return;
    const s = t._component;
    !te(s) && !s.render && !s.template && (s.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const n = i(o, !1, El(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), n;
  }, t;
});
function El(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ol(e) {
  return $e(e) ? document.querySelector(e) : e;
}
let tc;
const eo = (e) => tc = e, ic = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Zo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Hi;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Hi || (Hi = {}));
function $l() {
  const e = Xn(!0), t = e.run(() => /* @__PURE__ */ Te({}));
  let i = [], a = [];
  const o = Ki({
    install(s) {
      eo(o), o._a = s, s.provide(ic, o), s.config.globalProperties.$pinia = o, a.forEach((n) => i.push(n)), a = [];
    },
    use(s) {
      return this._a ? i.push(s) : a.push(s), this;
    },
    _p: i,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return o;
}
const ac = () => {
};
function sn(e, t, i, a = ac) {
  e.add(t);
  const o = () => {
    e.delete(t) && a();
  };
  return !i && Qn() && _d(o), o;
}
function di(e, ...t) {
  e.forEach((i) => {
    i(...t);
  });
}
const Pl = (e) => e(), nn = /* @__PURE__ */ Symbol(), yo = /* @__PURE__ */ Symbol();
function qo(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((i, a) => e.set(a, i)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const i in t) {
    if (!t.hasOwnProperty(i))
      continue;
    const a = t[i], o = e[i];
    Zo(o) && Zo(a) && e.hasOwnProperty(i) && !/* @__PURE__ */ Pe(a) && !/* @__PURE__ */ Rt(a) ? e[i] = qo(o, a) : e[i] = a;
  }
  return e;
}
const Rl = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Ul(e) {
  return !Zo(e) || !Object.prototype.hasOwnProperty.call(e, Rl);
}
const { assign: Ft } = Object;
function Zl(e) {
  return !!(/* @__PURE__ */ Pe(e) && e.effect);
}
function ql(e, t, i, a) {
  const { state: o, actions: s, getters: n } = t, r = i.state.value[e];
  let c;
  function d() {
    r || (i.state.value[e] = o ? o() : {});
    const u = /* @__PURE__ */ Nd(i.state.value[e]);
    return Ft(u, s, Object.keys(n || {}).reduce((f, p) => (f[p] = Ki(Je(() => {
      eo(i);
      const b = i._s.get(e);
      return n[p].call(b, b);
    })), f), {}));
  }
  return c = oc(e, d, t, i, a, !0), c;
}
function oc(e, t, i = {}, a, o, s) {
  let n;
  const r = Ft({ actions: {} }, i), c = { deep: !0 };
  let d, u, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), b;
  const E = a.state.value[e];
  !s && !E && (a.state.value[e] = {});
  let M;
  function J(Q) {
    let ie;
    d = u = !1, typeof Q == "function" ? (Q(a.state.value[e]), ie = {
      type: Hi.patchFunction,
      storeId: e,
      events: b
    }) : (qo(a.state.value[e], Q), ie = {
      type: Hi.patchObject,
      payload: Q,
      storeId: e,
      events: b
    });
    const _e = M = /* @__PURE__ */ Symbol();
    Ga().then(() => {
      M === _e && (d = !0);
    }), u = !0, di(f, ie, a.state.value[e]);
  }
  const se = s ? function() {
    const { state: ie } = i, _e = ie ? ie() : {};
    this.$patch((ae) => {
      Ft(ae, _e);
    });
  } : (
    /* istanbul ignore next */
    ac
  );
  function X() {
    n.stop(), f.clear(), p.clear(), a._s.delete(e);
  }
  const W = (Q, ie = "") => {
    if (nn in Q)
      return Q[yo] = ie, Q;
    const _e = function() {
      eo(a);
      const ae = Array.from(arguments), Ue = /* @__PURE__ */ new Set(), Ge = /* @__PURE__ */ new Set();
      function ot(Y) {
        Ue.add(Y);
      }
      function gt(Y) {
        Ge.add(Y);
      }
      di(p, {
        args: ae,
        name: _e[yo],
        store: L,
        after: ot,
        onError: gt
      });
      let le;
      try {
        le = Q.apply(this && this.$id === e ? this : L, ae);
      } catch (Y) {
        throw di(Ge, Y), Y;
      }
      return le instanceof Promise ? le.then((Y) => (di(Ue, Y), Y)).catch((Y) => (di(Ge, Y), Promise.reject(Y))) : (di(Ue, le), le);
    };
    return _e[nn] = !0, _e[yo] = ie, _e;
  }, j = {
    _p: a,
    // _s: scope,
    $id: e,
    $onAction: sn.bind(null, p),
    $patch: J,
    $reset: se,
    $subscribe(Q, ie = {}) {
      const _e = sn(f, Q, ie.detached, () => ae()), ae = n.run(() => zi(() => a.state.value[e], (Ue) => {
        (ie.flush === "sync" ? u : d) && Q({
          storeId: e,
          type: Hi.direct,
          events: b
        }, Ue);
      }, Ft({}, c, ie)));
      return _e;
    },
    $dispose: X
  }, L = /* @__PURE__ */ Da(j);
  a._s.set(e, L);
  const ke = (a._a && a._a.runWithContext || Pl)(() => a._e.run(() => (n = Xn()).run(() => t({ action: W }))));
  for (const Q in ke) {
    const ie = ke[Q];
    if (/* @__PURE__ */ Pe(ie) && !Zl(ie) || /* @__PURE__ */ Rt(ie))
      s || (E && Ul(ie) && (/* @__PURE__ */ Pe(ie) ? ie.value = E[Q] : qo(ie, E[Q])), a.state.value[e][Q] = ie);
    else if (typeof ie == "function") {
      const _e = W(ie, Q);
      ke[Q] = _e, r.actions[Q] = ie;
    }
  }
  return Ft(L, ke), Ft(/* @__PURE__ */ ue(L), ke), Object.defineProperty(L, "$state", {
    get: () => a.state.value[e],
    set: (Q) => {
      J((ie) => {
        Ft(ie, Q);
      });
    }
  }), a._p.forEach((Q) => {
    Ft(L, n.run(() => Q({
      store: L,
      app: a._a,
      pinia: a,
      options: r
    })));
  }), E && s && i.hydrate && i.hydrate(L.$state, E), d = !0, u = !0, L;
}
// @__NO_SIDE_EFFECTS__
function zl(e, t, i) {
  let a;
  const o = typeof t == "function";
  a = o ? i : t;
  function s(n, r) {
    const c = eu();
    return n = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    n || (c ? qi(ic, null) : null), n && eo(n), n = tc, n._s.has(e) || (o ? oc(e, t, a, n) : ql(e, a, n)), n._s.get(e);
  }
  return s.$id = e, s;
}
const Fl = 1, Ml = "albina-galgame-card", Nl = "本包内的五首配乐均为 Kevin MacLeod 以 CC BY 4.0 发布的作品，不是 ProjectMoon 官方 OST。", Ll = [{ assetId: "file.audio.bgm.backstreets.rain.mp3", path: "audio/bgm/backstreets_rain.mp3", sha256: "97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414", cueAlias: "backstreets_rain", title: "SCP-x6x (Hopes)", creator: "Kevin MacLeod", isrc: "USUAN2000012", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.between.two.worlds.mp3", path: "audio/bgm/between_two_worlds.mp3", sha256: "25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184", cueAlias: "between_two_worlds", title: "Mesmerizing Galaxy", creator: "Kevin MacLeod", isrc: "USUAN2300011", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.boss.kromer.mp3", path: "audio/bgm/boss_kromer.mp3", sha256: "923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd", cueAlias: "boss_kromer", title: "Burnt Spirit", creator: "Kevin MacLeod", isrc: "USUAN1700053", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.main.menu.mp3", path: "audio/bgm/main_menu.mp3", sha256: "299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60", cueAlias: "main_menu", title: "Magistar", creator: "Kevin MacLeod", isrc: "USUAN1900003", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.title.theme.mp3", path: "audio/bgm/title_theme.mp3", sha256: "03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3", cueAlias: "title_theme", title: "Achilles", creator: "Kevin MacLeod", isrc: "USUAN1100463", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }], Hl = { publisher: "ProjectMoon", channel: "ProjectMoon Official", playlistTitle: "LCB OST", playlistTrackCount: 35, verifiedOn: "2026-07-15", bundled: !1, cached: !1, redistributionAllowed: !1, notice: "ProjectMoon 官方 OST 仅提供外部试听链接；本卡不下载、缓存或再分发这些音频。", rightsNotice: "官方播放列表可免费试听，但 ProjectMoon 服务条款未授予把游戏音乐复制进角色卡并再次分发的许可。", links: [{ label: "ProjectMoon 官方 OST 播放列表", url: "https://www.youtube.com/playlist?list=PL9-RBacZ4KMzFjhRY4zD7_GbwL1LgNWXD" }, { label: "Canto IX 官方曲目", url: "https://www.youtube.com/watch?v=n5GI6EkCXCo" }], termsUrl: "https://limbuscompany.com/terms-of-service/" }, Jl = {
  version: Fl,
  projectId: Ml,
  packagedNotice: Nl,
  tracks: Ll,
  officialSoundtrack: Hl
}, Dl = { class: "gameplay-panel__header" }, Bl = {
  key: 0,
  class: "gameplay-panel__error",
  role: "alert",
  "aria-live": "assertive"
}, Kl = {
  class: "gameplay-tabs",
  role: "tablist",
  "aria-label": "状态档案分页"
}, Gl = ["id", "aria-selected", "aria-controls", "tabindex", "data-testid", "onClick", "onKeydown"], Wl = { class: "gameplay-panel__content" }, Yl = {
  id: "gameplay-page-status",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-status",
  "data-testid": "gameplay-page-status"
}, Xl = { class: "gameplay-stat-grid" }, Ql = ["data-stat-key"], ep = { key: 0 }, tp = { key: 1 }, ip = { class: "gameplay-vector-list" }, ap = ["value", "min", "max"], op = { class: "gameplay-split-grid" }, sp = { class: "gameplay-definition-list" }, np = { class: "gameplay-definition-list" }, rp = {
  id: "gameplay-page-objectives",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-objectives",
  "data-testid": "gameplay-page-objectives"
}, cp = { class: "gameplay-split-grid" }, dp = { class: "gameplay-entry-list" }, up = ["data-quest-id"], lp = {
  key: 0,
  class: "gameplay-empty"
}, pp = { class: "gameplay-entry-list" }, fp = ["data-battle-id"], bp = {
  key: 0,
  class: "gameplay-empty"
}, hp = {
  id: "gameplay-page-loadout",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-loadout",
  "data-testid": "gameplay-page-loadout"
}, mp = { class: "gameplay-entry-grid" }, gp = ["data-item-id"], vp = {
  key: 0,
  class: "gameplay-empty"
}, _p = { class: "gameplay-split-grid gameplay-loadout-grid" }, yp = { class: "gameplay-entry-list" }, wp = ["data-equipment-id"], kp = ["disabled", "onClick"], Ip = { class: "gameplay-entry-list" }, Ap = ["data-outfit-id"], Tp = ["disabled", "onClick"], xp = {
  id: "gameplay-page-progression",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-progression",
  "data-testid": "gameplay-page-progression"
}, Sp = { class: "gameplay-split-grid" }, Vp = { class: "gameplay-entry-list" }, jp = ["data-profession-id"], Cp = ["disabled", "onClick"], Ep = { class: "gameplay-entry-list" }, Op = ["data-achievement-id"], $p = {
  id: "gameplay-page-codex",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-codex",
  "data-testid": "gameplay-page-codex"
}, Pp = { class: "gameplay-entry-list gameplay-codex-list" }, Rp = ["data-worldbook-id"], Up = { key: 0 }, Zp = { key: 1 }, qp = { key: 2 }, zp = /* @__PURE__ */ ss({
  __name: "GameplayPanel",
  props: {
    gameplay: {},
    save: {},
    effectiveValues: {},
    interactionError: {}
  },
  emits: ["close", "equip", "wearOutfit", "selectProfession"],
  setup(e, { emit: t }) {
    const i = e, a = t, o = [
      { id: "status", label: "状态" },
      { id: "objectives", label: "任务与冲突" },
      { id: "loadout", label: "背包与装配" },
      { id: "progression", label: "职业与成就" },
      { id: "codex", label: "资料库" }
    ], s = /* @__PURE__ */ Te(), n = /* @__PURE__ */ Te("status"), r = [
      { key: "affectionAlbina", label: "好感" },
      { key: "trust", label: "信任" },
      { key: "danger", label: "危险" },
      { key: "artResonance", label: "共鸣" }
    ], c = [
      { key: "composure", label: "镇定" },
      { key: "materials", label: "材料" },
      { key: "leverage", label: "筹码" },
      { key: "exposure", label: "暴露" }
    ], d = [
      { key: "blade", label: "刃术" },
      { key: "boundary", label: "边界" },
      { key: "analysis", label: "解析" },
      { key: "resonance", label: "共振" }
    ], u = {
      affectionAlbina: "好感",
      trust: "信任",
      danger: "危险",
      artResonance: "共鸣",
      composure: "镇定",
      materials: "材料",
      leverage: "筹码",
      exposure: "暴露"
    }, f = (C) => C === void 0 || C === i.save.route, p = Je(() => i.gameplay.quests.filter((C) => f(C.route))), b = Je(() => i.gameplay.battles.filter((C) => f(C.route))), E = Je(() => i.gameplay.items.filter((C) => f(C.route) && i.save.inventory.ownedIds.includes(C.id))), M = Je(() => i.gameplay.equipment.filter((C) => f(C.route))), J = Je(() => i.gameplay.outfits.filter((C) => f(C.route))), se = Je(() => i.gameplay.professions.filter((C) => f(C.route))), X = Je(() => i.gameplay.achievements.filter((C) => f(C.route)));
    xr(() => s.value?.focus());
    function W(C) {
      n.value = C;
    }
    function j(C, H) {
      let v = H;
      if (C.key === "ArrowRight") v = (H + 1) % o.length;
      else if (C.key === "ArrowLeft") v = (H - 1 + o.length) % o.length;
      else if (C.key === "Home") v = 0;
      else if (C.key === "End") v = o.length - 1;
      else return;
      C.preventDefault();
      const pe = o[v];
      pe && (n.value = pe.id, requestAnimationFrame(() => document.getElementById(`gameplay-tab-${pe.id}`)?.focus()));
    }
    function L(C) {
      const H = Array.from(s.value?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []).filter((st) => st.tabIndex >= 0 && st.getClientRects().length > 0), v = H[0], pe = H.at(-1);
      if (!v || !pe) {
        C.preventDefault();
        return;
      }
      C.shiftKey && document.activeElement === v ? (C.preventDefault(), pe.focus()) : !C.shiftKey && document.activeElement === pe && (C.preventDefault(), v.focus());
    }
    function je(C) {
      return `${C > 0 ? "+" : ""}${C}`;
    }
    function ke(C) {
      return i.effectiveValues[C] - i.save.values[C];
    }
    function Q(C) {
      return Object.entries(C).filter((v) => typeof v[1] == "number").map(([v, pe]) => `${u[v] ?? v} ${je(pe)}`).join(" / ") || "无数值修正";
    }
    function ie(C) {
      return i.save.quests.completedNodeIds.includes(C) ? "completed" : i.save.quests.activeNodeIds.includes(C) ? "active" : "locked";
    }
    function _e(C) {
      return { active: "进行中", completed: "已完成", locked: "未开始" }[ie(C)];
    }
    function ae(C) {
      return i.save.battles.outcomes[C] ?? "pending";
    }
    function Ue(C) {
      return { victory: "胜利", setback: "受挫", pending: "未解决" }[ae(C)];
    }
    function Ge(C) {
      return i.save.inventory.ownedIds.includes(C);
    }
    function ot(C) {
      return Object.values(i.save.inventory.equipped).includes(C);
    }
    function gt(C) {
      return i.save.professions.progress[C] ?? { xp: 0, level: 1 };
    }
    function le(C) {
      const H = i.gameplay.professions.find((pe) => pe.id === C), v = gt(C);
      return H?.xpThresholds[v.level];
    }
    function Y(C) {
      return i.save.worldbook.activeEntryIds.includes(C) ? "active" : i.save.worldbook.seenEntryIds.includes(C) ? "seen" : "locked";
    }
    function re(C) {
      return { active: "当前激活", seen: "已阅", locked: "未阅" }[Y(C)];
    }
    return (C, H) => (U(), Z("div", {
      class: "gameplay-panel-backdrop",
      onClick: H[2] || (H[2] = Oa((v) => a("close"), ["self"]))
    }, [
      h("section", {
        ref_key: "panel",
        ref: s,
        class: "gameplay-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gameplay-panel-title",
        tabindex: "-1",
        "data-testid": "gameplay-panel",
        onKeydown: [
          H[1] || (H[1] = an(Oa((v) => a("close"), ["stop"]), ["esc"])),
          an(L, ["tab"])
        ]
      }, [
        h("header", Dl, [
          H[3] || (H[3] = h("div", null, [
            h("p", null, "ALBINA ARCHIVE"),
            h("h2", { id: "gameplay-panel-title" }, "状态档案")
          ], -1)),
          h("button", {
            type: "button",
            "aria-label": "关闭状态档案",
            title: "关闭",
            onClick: H[0] || (H[0] = (v) => a("close"))
          }, "关闭")
        ]),
        e.interactionError ? (U(), Z("p", Bl, $(e.interactionError), 1)) : et("", !0),
        h("nav", Kl, [
          (U(), Z(de, null, ze(o, (v, pe) => h("button", {
            id: `gameplay-tab-${v.id}`,
            key: v.id,
            type: "button",
            role: "tab",
            "aria-selected": n.value === v.id,
            "aria-controls": `gameplay-page-${v.id}`,
            tabindex: n.value === v.id ? 0 : -1,
            "data-testid": `gameplay-tab-${v.id}`,
            onClick: (st) => W(v.id),
            onKeydown: (st) => j(st, pe)
          }, $(v.label), 41, Gl)), 64))
        ]),
        h("div", Wl, [
          $t(h("section", Yl, [
            H[6] || (H[6] = h("div", { class: "gameplay-section-heading" }, [
              h("h3", null, "权威数值")
            ], -1)),
            h("div", Xl, [
              (U(), Z(de, null, ze(r, (v) => h("article", {
                key: v.key
              }, [
                h("span", null, $(v.label), 1),
                h("strong", {
                  "data-stat-key": v.key
                }, $(e.effectiveValues[v.key]), 9, Ql),
                ke(v.key) ? (U(), Z("small", ep, "基础 " + $(e.save.values[v.key]) + " · 修正 " + $(je(ke(v.key))), 1)) : (U(), Z("small", tp, "基础值"))
              ])), 64))
            ]),
            H[7] || (H[7] = h("div", { class: "gameplay-section-heading" }, [
              h("h3", null, "关系向量")
            ], -1)),
            h("div", ip, [
              (U(!0), Z(de, null, ze(e.gameplay.relationshipTracks, (v) => (U(), Z("label", {
                key: v.id
              }, [
                h("span", null, $(v.label), 1),
                h("progress", {
                  value: e.save.values.relationshipVectors[v.id],
                  min: v.minimum,
                  max: v.maximum
                }, null, 8, ap),
                h("strong", null, $(e.save.values.relationshipVectors[v.id]), 1)
              ]))), 128))
            ]),
            h("div", op, [
              h("section", null, [
                H[4] || (H[4] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "路线资源")
                ], -1)),
                h("dl", sp, [
                  (U(), Z(de, null, ze(c, (v) => (U(), Z(de, {
                    key: v.key
                  }, [
                    h("dt", null, $(v.label), 1),
                    h("dd", null, $(e.save.values.routeEconomy[v.key]), 1)
                  ], 64))), 64))
                ])
              ]),
              h("section", null, [
                H[5] || (H[5] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "冲突专精")
                ], -1)),
                h("dl", np, [
                  (U(), Z(de, null, ze(d, (v) => (U(), Z(de, {
                    key: v.key
                  }, [
                    h("dt", null, $(v.label), 1),
                    h("dd", null, $(e.save.values.conflictMastery[v.key]), 1)
                  ], 64))), 64))
                ])
              ])
            ])
          ], 512), [
            [Vi, n.value === "status"]
          ]),
          $t(h("section", rp, [
            h("div", cp, [
              h("section", null, [
                H[8] || (H[8] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "路线任务")
                ], -1)),
                h("div", dp, [
                  (U(!0), Z(de, null, ze(p.value, (v) => (U(), Z("article", {
                    key: v.id,
                    class: pt(ie(v.id)),
                    "data-quest-id": v.id
                  }, [
                    h("header", null, [
                      h("strong", null, $(v.label), 1),
                      h("span", null, $(_e(v.id)), 1)
                    ]),
                    h("p", null, $(v.description), 1)
                  ], 10, up))), 128)),
                  p.value.length === 0 ? (U(), Z("p", lp, "当前尚未进入路线任务。")) : et("", !0)
                ])
              ]),
              h("section", null, [
                H[9] || (H[9] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "冲突记录")
                ], -1)),
                h("div", pp, [
                  (U(!0), Z(de, null, ze(b.value, (v) => (U(), Z("article", {
                    key: v.id,
                    class: pt(ae(v.id)),
                    "data-battle-id": v.id
                  }, [
                    h("header", null, [
                      h("strong", null, $(v.label), 1),
                      h("span", null, $(Ue(v.id)), 1)
                    ]),
                    h("p", null, $(v.description), 1),
                    h("small", null, "推荐专精：" + $(d.find((pe) => pe.key === v.recommendedMastery)?.label), 1)
                  ], 10, fp))), 128)),
                  b.value.length === 0 ? (U(), Z("p", bp, "当前尚无路线冲突。")) : et("", !0)
                ])
              ])
            ])
          ], 512), [
            [Vi, n.value === "objectives"]
          ]),
          $t(h("section", hp, [
            H[13] || (H[13] = h("div", { class: "gameplay-section-heading" }, [
              h("h3", null, "已持有物品")
            ], -1)),
            h("div", mp, [
              (U(!0), Z(de, null, ze(E.value, (v) => (U(), Z("article", {
                key: v.id,
                "data-item-id": v.id
              }, [
                h("header", null, [
                  h("strong", null, $(v.label), 1),
                  H[10] || (H[10] = h("span", null, "已持有", -1))
                ]),
                h("p", null, $(v.description), 1)
              ], 8, gp))), 128)),
              E.value.length === 0 ? (U(), Z("p", vp, "当前背包为空。")) : et("", !0)
            ]),
            h("div", _p, [
              h("section", null, [
                H[11] || (H[11] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "装备")
                ], -1)),
                h("div", yp, [
                  (U(!0), Z(de, null, ze(M.value, (v) => (U(), Z("article", {
                    key: v.id,
                    class: pt({ active: ot(v.id), locked: !Ge(v.itemId) }),
                    "data-equipment-id": v.id
                  }, [
                    h("header", null, [
                      h("strong", null, $(v.label), 1),
                      h("span", null, $(ot(v.id) ? "装备中" : Ge(v.itemId) ? v.slot : "未获得"), 1)
                    ]),
                    h("p", null, $(Q(v.modifiers)), 1),
                    h("button", {
                      type: "button",
                      disabled: !Ge(v.itemId) || ot(v.id),
                      onClick: (pe) => a("equip", v.id)
                    }, $(ot(v.id) ? "已装备" : "装备"), 9, kp)
                  ], 10, wp))), 128))
                ])
              ]),
              h("section", null, [
                H[12] || (H[12] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "衣装")
                ], -1)),
                h("div", Ip, [
                  (U(!0), Z(de, null, ze(J.value, (v) => (U(), Z("article", {
                    key: v.id,
                    class: pt({ active: e.save.inventory.activeOutfitId === v.id, locked: !e.save.inventory.outfitIds.includes(v.id) }),
                    "data-outfit-id": v.id
                  }, [
                    h("header", null, [
                      h("strong", null, $(v.label), 1),
                      h("span", null, $(e.save.inventory.activeOutfitId === v.id ? "穿着中" : e.save.inventory.outfitIds.includes(v.id) ? "已解锁" : "未解锁"), 1)
                    ]),
                    h("button", {
                      type: "button",
                      disabled: !e.save.inventory.outfitIds.includes(v.id) || e.save.inventory.activeOutfitId === v.id,
                      onClick: (pe) => a("wearOutfit", v.id)
                    }, $(e.save.inventory.activeOutfitId === v.id ? "穿着中" : "更换"), 9, Tp)
                  ], 10, Ap))), 128))
                ])
              ])
            ])
          ], 512), [
            [Vi, n.value === "loadout"]
          ]),
          $t(h("section", xp, [
            h("div", Sp, [
              h("section", null, [
                H[14] || (H[14] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "职业")
                ], -1)),
                h("div", Vp, [
                  (U(!0), Z(de, null, ze(se.value, (v) => (U(), Z("article", {
                    key: v.id,
                    class: pt({ active: e.save.professions.activeId === v.id }),
                    "data-profession-id": v.id
                  }, [
                    h("header", null, [
                      h("strong", null, $(v.label), 1),
                      h("span", null, "Lv." + $(gt(v.id).level), 1)
                    ]),
                    h("p", null, $(Q(v.modifiersPerLevel)) + " / 等级", 1),
                    h("small", null, [
                      Nt("XP " + $(gt(v.id).xp), 1),
                      le(v.id) !== void 0 ? (U(), Z(de, { key: 0 }, [
                        Nt(" / " + $(le(v.id)), 1)
                      ], 64)) : (U(), Z(de, { key: 1 }, [
                        Nt(" · MAX")
                      ], 64))
                    ]),
                    h("button", {
                      type: "button",
                      disabled: e.save.professions.activeId === v.id,
                      onClick: (pe) => a("selectProfession", v.id)
                    }, $(e.save.professions.activeId === v.id ? "当前职业" : "设为当前"), 9, Cp)
                  ], 10, jp))), 128))
                ])
              ]),
              h("section", null, [
                H[15] || (H[15] = h("div", { class: "gameplay-section-heading" }, [
                  h("h3", null, "成就")
                ], -1)),
                h("div", Ep, [
                  (U(!0), Z(de, null, ze(X.value, (v) => (U(), Z("article", {
                    key: v.id,
                    class: pt({ completed: e.save.achievements.unlockedIds.includes(v.id), locked: !e.save.achievements.unlockedIds.includes(v.id) }),
                    "data-achievement-id": v.id
                  }, [
                    h("header", null, [
                      h("strong", null, $(v.label), 1),
                      h("span", null, $(e.save.achievements.unlockedIds.includes(v.id) ? "已解锁" : "未解锁"), 1)
                    ]),
                    h("p", null, $(v.description), 1),
                    h("small", null, $(Q(v.reward.values ?? {})), 1)
                  ], 10, Op))), 128))
                ])
              ])
            ])
          ], 512), [
            [Vi, n.value === "progression"]
          ]),
          $t(h("section", $p, [
            H[16] || (H[16] = h("div", { class: "gameplay-section-heading" }, [
              h("h3", null, "世界书状态")
            ], -1)),
            h("div", Pp, [
              (U(!0), Z(de, null, ze(e.gameplay.worldbookEntries, (v) => (U(), Z("article", {
                key: v.id,
                class: pt(Y(v.id)),
                "data-worldbook-id": v.id
              }, [
                h("header", null, [
                  h("strong", null, $(v.id), 1),
                  h("span", null, $(re(v.id)), 1)
                ]),
                Y(v.id) !== "locked" ? (U(), Z("p", Up, $(v.content), 1)) : (U(), Z("p", Zp, "该条目尚未在当前存档中解锁。")),
                Y(v.id) !== "locked" ? (U(), Z("small", qp, $(v.constant ? "常驻" : v.selective ? "场景选择性激活" : "已记录"), 1)) : et("", !0)
              ], 10, Rp))), 128))
            ])
          ], 512), [
            [Vi, n.value === "codex"]
          ])
        ])
      ], 544)
    ]));
  }
}), Fp = {
  class: "portrait-stage",
  "aria-label": "角色立绘"
}, Mp = /* @__PURE__ */ ss({
  __name: "PortraitStage",
  props: {
    portraits: {},
    service: {}
  },
  setup(e) {
    const t = e, i = /* @__PURE__ */ new Map();
    function a(s, n) {
      n instanceof HTMLCanvasElement ? i.set(s, n) : i.delete(s);
    }
    async function o() {
      t.service.stopAll(), await Ga(), await Promise.all(t.portraits.map(async (s) => {
        const n = i.get(s.characterId);
        n && await t.service.play(s.portraitAssetId, n);
      }));
    }
    return zi(() => t.portraits, () => {
      o();
    }, { deep: !0, immediate: !0 }), ns(() => t.service.stopAll()), (s, n) => (U(), Z("div", Fp, [
      (U(!0), Z(de, null, ze(e.portraits, (r) => (U(), Z("canvas", {
        key: `${r.characterId}:${r.portraitAssetId}`,
        ref_for: !0,
        ref: (c) => a(r.characterId, c),
        class: pt(["portrait-stage__canvas", [`portrait-stage__canvas--${r.position}`, { "is-active": r.active }]]),
        width: "512",
        height: "768",
        style: Ha({ transform: `translateX(-50%) scale(${r.scale})` })
      }, null, 6))), 128))
    ]));
  }
});
var rn;
function y(e, t, i) {
  function a(r, c) {
    if (r._zod || Object.defineProperty(r, "_zod", {
      value: {
        def: c,
        constr: n,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), r._zod.traits.has(e))
      return;
    r._zod.traits.add(e), t(r, c);
    const d = n.prototype, u = Object.keys(d);
    for (let f = 0; f < u.length; f++) {
      const p = u[f];
      p in r || (r[p] = d[p].bind(r));
    }
  }
  const o = i?.Parent ?? Object;
  class s extends o {
  }
  Object.defineProperty(s, "name", { value: e });
  function n(r) {
    var c;
    const d = i?.Parent ? new s() : this;
    a(d, r), (c = d._zod).deferred ?? (c.deferred = []);
    for (const u of d._zod.deferred)
      u();
    return d;
  }
  return Object.defineProperty(n, "init", { value: a }), Object.defineProperty(n, Symbol.hasInstance, {
    value: (r) => i?.Parent && r instanceof i.Parent ? !0 : r?._zod?.traits?.has(e)
  }), Object.defineProperty(n, "name", { value: e }), n;
}
class vi extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class sc extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
(rn = globalThis).__zod_globalConfig ?? (rn.__zod_globalConfig = {});
const ds = globalThis.__zod_globalConfig;
function Zt(e) {
  return ds;
}
function nc(e) {
  const t = Object.values(e).filter((a) => typeof a == "number");
  return Object.entries(e).filter(([a, o]) => t.indexOf(+a) === -1).map(([a, o]) => o);
}
function zo(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function to(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function us(e) {
  return e == null;
}
function ls(e) {
  const t = e.startsWith("^") ? 1 : 0, i = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, i);
}
function Np(e, t) {
  const i = e / t, a = Math.round(i), o = Number.EPSILON * Math.max(Math.abs(i), 1);
  return Math.abs(i - a) < o ? 0 : i - a;
}
const cn = /* @__PURE__ */ Symbol("evaluating");
function me(e, t, i) {
  let a;
  Object.defineProperty(e, t, {
    get() {
      if (a !== cn)
        return a === void 0 && (a = cn, a = i()), a;
    },
    set(o) {
      Object.defineProperty(e, t, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function ni(e, t, i) {
  Object.defineProperty(e, t, {
    value: i,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Dt(...e) {
  const t = {};
  for (const i of e) {
    const a = Object.getOwnPropertyDescriptors(i);
    Object.assign(t, a);
  }
  return Object.defineProperties({}, t);
}
function dn(e) {
  return JSON.stringify(e);
}
function Lp(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const rc = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Xi(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Hp = /* @__PURE__ */ to(() => {
  if (ds.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function wi(e) {
  if (Xi(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const i = t.prototype;
  return !(Xi(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function cc(e) {
  return wi(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const Jp = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ki(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Bt(e, t, i) {
  const a = new e._zod.constr(t ?? e._zod.def);
  return (!t || i?.parent) && (a._zod.parent = e), a;
}
function F(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function Dp(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const Bp = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Kp(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const s = Dt(e._zod.def, {
    get shape() {
      const n = {};
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && (n[r] = i.shape[r]);
      }
      return ni(this, "shape", n), n;
    },
    checks: []
  });
  return Bt(e, s);
}
function Gp(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const s = Dt(e._zod.def, {
    get shape() {
      const n = { ...e._zod.def.shape };
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && delete n[r];
      }
      return ni(this, "shape", n), n;
    },
    checks: []
  });
  return Bt(e, s);
}
function Wp(e, t) {
  if (!wi(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const i = e._zod.def.checks;
  if (i && i.length > 0) {
    const s = e._zod.def.shape;
    for (const n in t)
      if (Object.getOwnPropertyDescriptor(s, n) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = Dt(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape, ...t };
      return ni(this, "shape", s), s;
    }
  });
  return Bt(e, o);
}
function Yp(e, t) {
  if (!wi(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const i = Dt(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t };
      return ni(this, "shape", a), a;
    }
  });
  return Bt(e, i);
}
function Xp(e, t) {
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const i = Dt(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t._zod.def.shape };
      return ni(this, "shape", a), a;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return Bt(e, i);
}
function Qp(e, t, i) {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const n = Dt(t._zod.def, {
    get shape() {
      const r = t._zod.def.shape, c = { ...r };
      if (i)
        for (const d in i) {
          if (!(d in r))
            throw new Error(`Unrecognized key: "${d}"`);
          i[d] && (c[d] = e ? new e({
            type: "optional",
            innerType: r[d]
          }) : r[d]);
        }
      else
        for (const d in r)
          c[d] = e ? new e({
            type: "optional",
            innerType: r[d]
          }) : r[d];
      return ni(this, "shape", c), c;
    },
    checks: []
  });
  return Bt(t, n);
}
function ef(e, t, i) {
  const a = Dt(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, s = { ...o };
      if (i)
        for (const n in i) {
          if (!(n in s))
            throw new Error(`Unrecognized key: "${n}"`);
          i[n] && (s[n] = new e({
            type: "nonoptional",
            innerType: o[n]
          }));
        }
      else
        for (const n in o)
          s[n] = new e({
            type: "nonoptional",
            innerType: o[n]
          });
      return ni(this, "shape", s), s;
    }
  });
  return Bt(t, a);
}
function pi(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue !== !0)
      return !0;
  return !1;
}
function tf(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue === !1)
      return !0;
  return !1;
}
function fi(e, t) {
  return t.map((i) => {
    var a;
    return (a = i).path ?? (a.path = []), i.path.unshift(e), i;
  });
}
function ba(e) {
  return typeof e == "string" ? e : e?.message;
}
function qt(e, t, i) {
  const a = e.message ? e.message : ba(e.inst?._zod.def?.error?.(e)) ?? ba(t?.error?.(e)) ?? ba(i.customError?.(e)) ?? ba(i.localeError?.(e)) ?? "Invalid input", { inst: o, continue: s, input: n, ...r } = e;
  return r.path ?? (r.path = []), r.message = a, t?.reportInput && (r.input = n), r;
}
function ps(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Qi(...e) {
  const [t, i, a] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: i,
    inst: a
  } : { ...t };
}
const dc = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, zo, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, uc = y("$ZodError", dc), lc = y("$ZodError", dc, { Parent: Error });
function af(e, t = (i) => i.message) {
  const i = {}, a = [];
  for (const o of e.issues)
    o.path.length > 0 ? (i[o.path[0]] = i[o.path[0]] || [], i[o.path[0]].push(t(o))) : a.push(t(o));
  return { formErrors: a, fieldErrors: i };
}
function of(e, t = (i) => i.message) {
  const i = { _errors: [] }, a = (o, s = []) => {
    for (const n of o.issues)
      if (n.code === "invalid_union" && n.errors.length)
        n.errors.map((r) => a({ issues: r }, [...s, ...n.path]));
      else if (n.code === "invalid_key")
        a({ issues: n.issues }, [...s, ...n.path]);
      else if (n.code === "invalid_element")
        a({ issues: n.issues }, [...s, ...n.path]);
      else {
        const r = [...s, ...n.path];
        if (r.length === 0)
          i._errors.push(t(n));
        else {
          let c = i, d = 0;
          for (; d < r.length; ) {
            const u = r[d];
            d === r.length - 1 ? (c[u] = c[u] || { _errors: [] }, c[u]._errors.push(t(n))) : c[u] = c[u] || { _errors: [] }, c = c[u], d++;
          }
        }
      }
  };
  return a(e), i;
}
const fs = (e) => (t, i, a, o) => {
  const s = a ? { ...a, async: !1 } : { async: !1 }, n = t._zod.run({ value: i, issues: [] }, s);
  if (n instanceof Promise)
    throw new vi();
  if (n.issues.length) {
    const r = new (o?.Err ?? e)(n.issues.map((c) => qt(c, s, Zt())));
    throw rc(r, o?.callee), r;
  }
  return n.value;
}, bs = (e) => async (t, i, a, o) => {
  const s = a ? { ...a, async: !0 } : { async: !0 };
  let n = t._zod.run({ value: i, issues: [] }, s);
  if (n instanceof Promise && (n = await n), n.issues.length) {
    const r = new (o?.Err ?? e)(n.issues.map((c) => qt(c, s, Zt())));
    throw rc(r, o?.callee), r;
  }
  return n.value;
}, io = (e) => (t, i, a) => {
  const o = a ? { ...a, async: !1 } : { async: !1 }, s = t._zod.run({ value: i, issues: [] }, o);
  if (s instanceof Promise)
    throw new vi();
  return s.issues.length ? {
    success: !1,
    error: new (e ?? uc)(s.issues.map((n) => qt(n, o, Zt())))
  } : { success: !0, data: s.value };
}, sf = /* @__PURE__ */ io(lc), ao = (e) => async (t, i, a) => {
  const o = a ? { ...a, async: !0 } : { async: !0 };
  let s = t._zod.run({ value: i, issues: [] }, o);
  return s instanceof Promise && (s = await s), s.issues.length ? {
    success: !1,
    error: new e(s.issues.map((n) => qt(n, o, Zt())))
  } : { success: !0, data: s.value };
}, nf = /* @__PURE__ */ ao(lc), rf = (e) => (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return fs(e)(t, i, o);
}, cf = (e) => (t, i, a) => fs(e)(t, i, a), df = (e) => async (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return bs(e)(t, i, o);
}, uf = (e) => async (t, i, a) => bs(e)(t, i, a), lf = (e) => (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return io(e)(t, i, o);
}, pf = (e) => (t, i, a) => io(e)(t, i, a), ff = (e) => async (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return ao(e)(t, i, o);
}, bf = (e) => async (t, i, a) => ao(e)(t, i, a), hf = /^[cC][0-9a-z]{6,}$/, mf = /^[0-9a-z]+$/, gf = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, vf = /^[0-9a-vA-V]{20}$/, _f = /^[A-Za-z0-9]{27}$/, yf = /^[a-zA-Z0-9_-]{21}$/, wf = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, kf = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, un = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, If = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Af = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Tf() {
  return new RegExp(Af, "u");
}
const xf = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Sf = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Vf = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, jf = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Cf = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, pc = /^[A-Za-z0-9_-]*$/, Ef = /^https?$/, Of = /^\+[1-9]\d{6,14}$/, fc = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", $f = /* @__PURE__ */ new RegExp(`^${fc}$`);
function bc(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Pf(e) {
  return new RegExp(`^${bc(e)}$`);
}
function Rf(e) {
  const t = bc({ precision: e.precision }), i = ["Z"];
  e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const a = `${t}(?:${i.join("|")})`;
  return new RegExp(`^${fc}T(?:${a})$`);
}
const Uf = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, Zf = /^-?\d+$/, hc = /^-?\d+(?:\.\d+)?$/, qf = /^(?:true|false)$/i, zf = /^[^A-Z]*$/, Ff = /^[^a-z]*$/, Ye = /* @__PURE__ */ y("$ZodCheck", (e, t) => {
  var i;
  e._zod ?? (e._zod = {}), e._zod.def = t, (i = e._zod).onattach ?? (i.onattach = []);
}), mc = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, gc = /* @__PURE__ */ y("$ZodCheckLessThan", (e, t) => {
  Ye.init(e, t);
  const i = mc[typeof t.value];
  e._zod.onattach.push((a) => {
    const o = a._zod.bag, s = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < s && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
  }), e._zod.check = (a) => {
    (t.inclusive ? a.value <= t.value : a.value < t.value) || a.issues.push({
      origin: i,
      code: "too_big",
      maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: a.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), vc = /* @__PURE__ */ y("$ZodCheckGreaterThan", (e, t) => {
  Ye.init(e, t);
  const i = mc[typeof t.value];
  e._zod.onattach.push((a) => {
    const o = a._zod.bag, s = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > s && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
  }), e._zod.check = (a) => {
    (t.inclusive ? a.value >= t.value : a.value > t.value) || a.issues.push({
      origin: i,
      code: "too_small",
      minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: a.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), Mf = /* @__PURE__ */ y("$ZodCheckMultipleOf", (e, t) => {
  Ye.init(e, t), e._zod.onattach.push((i) => {
    var a;
    (a = i._zod.bag).multipleOf ?? (a.multipleOf = t.value);
  }), e._zod.check = (i) => {
    if (typeof i.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : Np(i.value, t.value) === 0) || i.issues.push({
      origin: typeof i.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Nf = /* @__PURE__ */ y("$ZodCheckNumberFormat", (e, t) => {
  Ye.init(e, t), t.format = t.format || "float64";
  const i = t.format?.includes("int"), a = i ? "int" : "number", [o, s] = Bp[t.format];
  e._zod.onattach.push((n) => {
    const r = n._zod.bag;
    r.format = t.format, r.minimum = o, r.maximum = s, i && (r.pattern = Zf);
  }), e._zod.check = (n) => {
    const r = n.value;
    if (i) {
      if (!Number.isInteger(r)) {
        n.issues.push({
          expected: a,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: r,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(r)) {
        r > 0 ? n.issues.push({
          input: r,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: a,
          inclusive: !0,
          continue: !t.abort
        }) : n.issues.push({
          input: r,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: a,
          inclusive: !0,
          continue: !t.abort
        });
        return;
      }
    }
    r < o && n.issues.push({
      origin: "number",
      input: r,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), r > s && n.issues.push({
      origin: "number",
      input: r,
      code: "too_big",
      maximum: s,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), Lf = /* @__PURE__ */ y("$ZodCheckMaxLength", (e, t) => {
  var i;
  Ye.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const o = a.value;
    return !us(o) && o.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const o = a._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (a._zod.bag.maximum = t.maximum);
  }), e._zod.check = (a) => {
    const o = a.value;
    if (o.length <= t.maximum)
      return;
    const n = ps(o);
    a.issues.push({
      origin: n,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Hf = /* @__PURE__ */ y("$ZodCheckMinLength", (e, t) => {
  var i;
  Ye.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const o = a.value;
    return !us(o) && o.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const o = a._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (a._zod.bag.minimum = t.minimum);
  }), e._zod.check = (a) => {
    const o = a.value;
    if (o.length >= t.minimum)
      return;
    const n = ps(o);
    a.issues.push({
      origin: n,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Jf = /* @__PURE__ */ y("$ZodCheckLengthEquals", (e, t) => {
  var i;
  Ye.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const o = a.value;
    return !us(o) && o.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const o = a._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (a) => {
    const o = a.value, s = o.length;
    if (s === t.length)
      return;
    const n = ps(o), r = s > t.length;
    a.issues.push({
      origin: n,
      ...r ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: a.value,
      inst: e,
      continue: !t.abort
    });
  };
}), oo = /* @__PURE__ */ y("$ZodCheckStringFormat", (e, t) => {
  var i, a;
  Ye.init(e, t), e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.format = t.format, t.pattern && (s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(t.pattern));
  }), t.pattern ? (i = e._zod).check ?? (i.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (a = e._zod).check ?? (a.check = () => {
  });
}), Df = /* @__PURE__ */ y("$ZodCheckRegex", (e, t) => {
  oo.init(e, t), e._zod.check = (i) => {
    t.pattern.lastIndex = 0, !t.pattern.test(i.value) && i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: i.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), Bf = /* @__PURE__ */ y("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = zf), oo.init(e, t);
}), Kf = /* @__PURE__ */ y("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = Ff), oo.init(e, t);
}), Gf = /* @__PURE__ */ y("$ZodCheckIncludes", (e, t) => {
  Ye.init(e, t);
  const i = ki(t.includes), a = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${i}` : i);
  t.pattern = a, e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(a);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Wf = /* @__PURE__ */ y("$ZodCheckStartsWith", (e, t) => {
  Ye.init(e, t);
  const i = new RegExp(`^${ki(t.prefix)}.*`);
  t.pattern ?? (t.pattern = i), e._zod.onattach.push((a) => {
    const o = a._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(i);
  }), e._zod.check = (a) => {
    a.value.startsWith(t.prefix) || a.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: a.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Yf = /* @__PURE__ */ y("$ZodCheckEndsWith", (e, t) => {
  Ye.init(e, t);
  const i = new RegExp(`.*${ki(t.suffix)}$`);
  t.pattern ?? (t.pattern = i), e._zod.onattach.push((a) => {
    const o = a._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(i);
  }), e._zod.check = (a) => {
    a.value.endsWith(t.suffix) || a.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: a.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Xf = /* @__PURE__ */ y("$ZodCheckOverwrite", (e, t) => {
  Ye.init(e, t), e._zod.check = (i) => {
    i.value = t.tx(i.value);
  };
});
class Qf {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const a = t.split(`
`).filter((n) => n), o = Math.min(...a.map((n) => n.length - n.trimStart().length)), s = a.map((n) => n.slice(o)).map((n) => " ".repeat(this.indent * 2) + n);
    for (const n of s)
      this.content.push(n);
  }
  compile() {
    const t = Function, i = this?.args, o = [...(this?.content ?? [""]).map((s) => `  ${s}`)];
    return new t(...i, o.join(`
`));
  }
}
const eb = {
  major: 4,
  minor: 4,
  patch: 3
}, xe = /* @__PURE__ */ y("$ZodType", (e, t) => {
  var i;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = eb;
  const a = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && a.unshift(e);
  for (const o of a)
    for (const s of o._zod.onattach)
      s(e);
  if (a.length === 0)
    (i = e._zod).deferred ?? (i.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (n, r, c) => {
      let d = pi(n), u;
      for (const f of r) {
        if (f._zod.def.when) {
          if (tf(n) || !f._zod.def.when(n))
            continue;
        } else if (d)
          continue;
        const p = n.issues.length, b = f._zod.check(n);
        if (b instanceof Promise && c?.async === !1)
          throw new vi();
        if (u || b instanceof Promise)
          u = (u ?? Promise.resolve()).then(async () => {
            await b, n.issues.length !== p && (d || (d = pi(n, p)));
          });
        else {
          if (n.issues.length === p)
            continue;
          d || (d = pi(n, p));
        }
      }
      return u ? u.then(() => n) : n;
    }, s = (n, r, c) => {
      if (pi(n))
        return n.aborted = !0, n;
      const d = o(r, a, c);
      if (d instanceof Promise) {
        if (c.async === !1)
          throw new vi();
        return d.then((u) => e._zod.parse(u, c));
      }
      return e._zod.parse(d, c);
    };
    e._zod.run = (n, r) => {
      if (r.skipChecks)
        return e._zod.parse(n, r);
      if (r.direction === "backward") {
        const d = e._zod.parse({ value: n.value, issues: [] }, { ...r, skipChecks: !0 });
        return d instanceof Promise ? d.then((u) => s(u, n, r)) : s(d, n, r);
      }
      const c = e._zod.parse(n, r);
      if (c instanceof Promise) {
        if (r.async === !1)
          throw new vi();
        return c.then((d) => o(d, a, r));
      }
      return o(c, a, r);
    };
  }
  me(e, "~standard", () => ({
    validate: (o) => {
      try {
        const s = sf(e, o);
        return s.success ? { value: s.data } : { issues: s.error?.issues };
      } catch {
        return nf(e, o).then((n) => n.success ? { value: n.data } : { issues: n.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), hs = /* @__PURE__ */ y("$ZodString", (e, t) => {
  xe.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? Uf(e._zod.bag), e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = String(i.value);
      } catch {
      }
    return typeof i.value == "string" || i.issues.push({
      expected: "string",
      code: "invalid_type",
      input: i.value,
      inst: e
    }), i;
  };
}), Ae = /* @__PURE__ */ y("$ZodStringFormat", (e, t) => {
  oo.init(e, t), hs.init(e, t);
}), tb = /* @__PURE__ */ y("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = kf), Ae.init(e, t);
}), ib = /* @__PURE__ */ y("$ZodUUID", (e, t) => {
  if (t.version) {
    const a = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (a === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = un(a));
  } else
    t.pattern ?? (t.pattern = un());
  Ae.init(e, t);
}), ab = /* @__PURE__ */ y("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = If), Ae.init(e, t);
}), ob = /* @__PURE__ */ y("$ZodURL", (e, t) => {
  Ae.init(e, t), e._zod.check = (i) => {
    try {
      const a = i.value.trim();
      if (!t.normalize && t.protocol?.source === Ef.source && !/^https?:\/\//i.test(a)) {
        i.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: i.value,
          inst: e,
          continue: !t.abort
        });
        return;
      }
      const o = new URL(a);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || i.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: i.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || i.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: i.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? i.value = o.href : i.value = a;
      return;
    } catch {
      i.issues.push({
        code: "invalid_format",
        format: "url",
        input: i.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), sb = /* @__PURE__ */ y("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Tf()), Ae.init(e, t);
}), nb = /* @__PURE__ */ y("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = yf), Ae.init(e, t);
}), rb = /* @__PURE__ */ y("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = hf), Ae.init(e, t);
}), cb = /* @__PURE__ */ y("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = mf), Ae.init(e, t);
}), db = /* @__PURE__ */ y("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = gf), Ae.init(e, t);
}), ub = /* @__PURE__ */ y("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = vf), Ae.init(e, t);
}), lb = /* @__PURE__ */ y("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = _f), Ae.init(e, t);
}), pb = /* @__PURE__ */ y("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = Rf(t)), Ae.init(e, t);
}), fb = /* @__PURE__ */ y("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = $f), Ae.init(e, t);
}), bb = /* @__PURE__ */ y("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = Pf(t)), Ae.init(e, t);
}), hb = /* @__PURE__ */ y("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = wf), Ae.init(e, t);
}), mb = /* @__PURE__ */ y("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = xf), Ae.init(e, t), e._zod.bag.format = "ipv4";
}), gb = /* @__PURE__ */ y("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Sf), Ae.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (i) => {
    try {
      new URL(`http://[${i.value}]`);
    } catch {
      i.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: i.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), vb = /* @__PURE__ */ y("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = Vf), Ae.init(e, t);
}), _b = /* @__PURE__ */ y("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = jf), Ae.init(e, t), e._zod.check = (i) => {
    const a = i.value.split("/");
    try {
      if (a.length !== 2)
        throw new Error();
      const [o, s] = a;
      if (!s)
        throw new Error();
      const n = Number(s);
      if (`${n}` !== s)
        throw new Error();
      if (n < 0 || n > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      i.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: i.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function _c(e) {
  if (e === "")
    return !0;
  if (/\s/.test(e) || e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const yb = /* @__PURE__ */ y("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = Cf), Ae.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (i) => {
    _c(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function wb(e) {
  if (!pc.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (a) => a === "-" ? "+" : "/"), i = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return _c(i);
}
const kb = /* @__PURE__ */ y("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = pc), Ae.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (i) => {
    wb(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Ib = /* @__PURE__ */ y("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Of), Ae.init(e, t);
});
function Ab(e, t = null) {
  try {
    const i = e.split(".");
    if (i.length !== 3)
      return !1;
    const [a] = i;
    if (!a)
      return !1;
    const o = JSON.parse(atob(a));
    return !("typ" in o && o?.typ !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const Tb = /* @__PURE__ */ y("$ZodJWT", (e, t) => {
  Ae.init(e, t), e._zod.check = (i) => {
    Ab(i.value, t.alg) || i.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), yc = /* @__PURE__ */ y("$ZodNumber", (e, t) => {
  xe.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? hc, e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = Number(i.value);
      } catch {
      }
    const o = i.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return i;
    const s = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return i.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...s ? { received: s } : {}
    }), i;
  };
}), xb = /* @__PURE__ */ y("$ZodNumberFormat", (e, t) => {
  Nf.init(e, t), yc.init(e, t);
}), Sb = /* @__PURE__ */ y("$ZodBoolean", (e, t) => {
  xe.init(e, t), e._zod.pattern = qf, e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = !!i.value;
      } catch {
      }
    const o = i.value;
    return typeof o == "boolean" || i.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: e
    }), i;
  };
}), Vb = /* @__PURE__ */ y("$ZodUnknown", (e, t) => {
  xe.init(e, t), e._zod.parse = (i) => i;
}), jb = /* @__PURE__ */ y("$ZodNever", (e, t) => {
  xe.init(e, t), e._zod.parse = (i, a) => (i.issues.push({
    expected: "never",
    code: "invalid_type",
    input: i.value,
    inst: e
  }), i);
});
function ln(e, t, i) {
  e.issues.length && t.issues.push(...fi(i, e.issues)), t.value[i] = e.value;
}
const Cb = /* @__PURE__ */ y("$ZodArray", (e, t) => {
  xe.init(e, t), e._zod.parse = (i, a) => {
    const o = i.value;
    if (!Array.isArray(o))
      return i.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), i;
    i.value = Array(o.length);
    const s = [];
    for (let n = 0; n < o.length; n++) {
      const r = o[n], c = t.element._zod.run({
        value: r,
        issues: []
      }, a);
      c instanceof Promise ? s.push(c.then((d) => ln(d, i, n))) : ln(c, i, n);
    }
    return s.length ? Promise.all(s).then(() => i) : i;
  };
});
function $a(e, t, i, a, o, s) {
  const n = i in a;
  if (e.issues.length) {
    if (o && s && !n)
      return;
    t.issues.push(...fi(i, e.issues));
  }
  if (!n && !o) {
    e.issues.length || t.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: void 0,
      path: [i]
    });
    return;
  }
  e.value === void 0 ? n && (t.value[i] = void 0) : t.value[i] = e.value;
}
function wc(e) {
  const t = Object.keys(e.shape);
  for (const a of t)
    if (!e.shape?.[a]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const i = Dp(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(i)
  };
}
function kc(e, t, i, a, o, s) {
  const n = [], r = o.keySet, c = o.catchall._zod, d = c.def.type, u = c.optin === "optional", f = c.optout === "optional";
  for (const p in t) {
    if (p === "__proto__" || r.has(p))
      continue;
    if (d === "never") {
      n.push(p);
      continue;
    }
    const b = c.run({ value: t[p], issues: [] }, a);
    b instanceof Promise ? e.push(b.then((E) => $a(E, i, p, t, u, f))) : $a(b, i, p, t, u, f);
  }
  return n.length && i.issues.push({
    code: "unrecognized_keys",
    keys: n,
    input: t,
    inst: s
  }), e.length ? Promise.all(e).then(() => i) : i;
}
const Eb = /* @__PURE__ */ y("$ZodObject", (e, t) => {
  if (xe.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
    const r = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const c = { ...r };
        return Object.defineProperty(t, "shape", {
          value: c
        }), c;
      }
    });
  }
  const a = to(() => wc(t));
  me(e._zod, "propValues", () => {
    const r = t.shape, c = {};
    for (const d in r) {
      const u = r[d]._zod;
      if (u.values) {
        c[d] ?? (c[d] = /* @__PURE__ */ new Set());
        for (const f of u.values)
          c[d].add(f);
      }
    }
    return c;
  });
  const o = Xi, s = t.catchall;
  let n;
  e._zod.parse = (r, c) => {
    n ?? (n = a.value);
    const d = r.value;
    if (!o(d))
      return r.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: e
      }), r;
    r.value = {};
    const u = [], f = n.shape;
    for (const p of n.keys) {
      const b = f[p], E = b._zod.optin === "optional", M = b._zod.optout === "optional", J = b._zod.run({ value: d[p], issues: [] }, c);
      J instanceof Promise ? u.push(J.then((se) => $a(se, r, p, d, E, M))) : $a(J, r, p, d, E, M);
    }
    return s ? kc(u, d, r, c, a.value, e) : u.length ? Promise.all(u).then(() => r) : r;
  };
}), Ob = /* @__PURE__ */ y("$ZodObjectJIT", (e, t) => {
  Eb.init(e, t);
  const i = e._zod.parse, a = to(() => wc(t)), o = (p) => {
    const b = new Qf(["shape", "payload", "ctx"]), E = a.value, M = (W) => {
      const j = dn(W);
      return `shape[${j}]._zod.run({ value: input[${j}], issues: [] }, ctx)`;
    };
    b.write("const input = payload.value;");
    const J = /* @__PURE__ */ Object.create(null);
    let se = 0;
    for (const W of E.keys)
      J[W] = `key_${se++}`;
    b.write("const newResult = {};");
    for (const W of E.keys) {
      const j = J[W], L = dn(W), je = p[W], ke = je?._zod?.optin === "optional", Q = je?._zod?.optout === "optional";
      b.write(`const ${j} = ${M(W)};`), ke && Q ? b.write(`
        if (${j}.issues.length) {
          if (${L} in input) {
            payload.issues = payload.issues.concat(${j}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${L}, ...iss.path] : [${L}]
            })));
          }
        }

        if (${j}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${j}.value;
        }

      `) : ke ? b.write(`
        if (${j}.issues.length) {
          payload.issues = payload.issues.concat(${j}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }

        if (${j}.value === undefined) {
          if (${L} in input) {
            newResult[${L}] = undefined;
          }
        } else {
          newResult[${L}] = ${j}.value;
        }

      `) : b.write(`
        const ${j}_present = ${L} in input;
        if (${j}.issues.length) {
          payload.issues = payload.issues.concat(${j}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${L}, ...iss.path] : [${L}]
          })));
        }
        if (!${j}_present && !${j}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${L}]
          });
        }

        if (${j}_present) {
          if (${j}.value === undefined) {
            newResult[${L}] = undefined;
          } else {
            newResult[${L}] = ${j}.value;
          }
        }

      `);
    }
    b.write("payload.value = newResult;"), b.write("return payload;");
    const X = b.compile();
    return (W, j) => X(p, W, j);
  };
  let s;
  const n = Xi, r = !ds.jitless, d = r && Hp.value, u = t.catchall;
  let f;
  e._zod.parse = (p, b) => {
    f ?? (f = a.value);
    const E = p.value;
    return n(E) ? r && d && b?.async === !1 && b.jitless !== !0 ? (s || (s = o(t.shape)), p = s(p, b), u ? kc([], E, p, b, f, e) : p) : i(p, b) : (p.issues.push({
      expected: "object",
      code: "invalid_type",
      input: E,
      inst: e
    }), p);
  };
});
function pn(e, t, i, a) {
  for (const s of e)
    if (s.issues.length === 0)
      return t.value = s.value, t;
  const o = e.filter((s) => !pi(s));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: i,
    errors: e.map((s) => s.issues.map((n) => qt(n, a, Zt())))
  }), t);
}
const Ic = /* @__PURE__ */ y("$ZodUnion", (e, t) => {
  xe.init(e, t), me(e._zod, "optin", () => t.options.some((a) => a._zod.optin === "optional") ? "optional" : void 0), me(e._zod, "optout", () => t.options.some((a) => a._zod.optout === "optional") ? "optional" : void 0), me(e._zod, "values", () => {
    if (t.options.every((a) => a._zod.values))
      return new Set(t.options.flatMap((a) => Array.from(a._zod.values)));
  }), me(e._zod, "pattern", () => {
    if (t.options.every((a) => a._zod.pattern)) {
      const a = t.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${a.map((o) => ls(o.source)).join("|")})$`);
    }
  });
  const i = t.options.length === 1 ? t.options[0]._zod.run : null;
  e._zod.parse = (a, o) => {
    if (i)
      return i(a, o);
    let s = !1;
    const n = [];
    for (const r of t.options) {
      const c = r._zod.run({
        value: a.value,
        issues: []
      }, o);
      if (c instanceof Promise)
        n.push(c), s = !0;
      else {
        if (c.issues.length === 0)
          return c;
        n.push(c);
      }
    }
    return s ? Promise.all(n).then((r) => pn(r, a, e, o)) : pn(n, a, e, o);
  };
}), $b = /* @__PURE__ */ y("$ZodDiscriminatedUnion", (e, t) => {
  t.inclusive = !1, Ic.init(e, t);
  const i = e._zod.parse;
  me(e._zod, "propValues", () => {
    const o = {};
    for (const s of t.options) {
      const n = s._zod.propValues;
      if (!n || Object.keys(n).length === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(s)}"`);
      for (const [r, c] of Object.entries(n)) {
        o[r] || (o[r] = /* @__PURE__ */ new Set());
        for (const d of c)
          o[r].add(d);
      }
    }
    return o;
  });
  const a = to(() => {
    const o = t.options, s = /* @__PURE__ */ new Map();
    for (const n of o) {
      const r = n._zod.propValues?.[t.discriminator];
      if (!r || r.size === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
      for (const c of r) {
        if (s.has(c))
          throw new Error(`Duplicate discriminator value "${String(c)}"`);
        s.set(c, n);
      }
    }
    return s;
  });
  e._zod.parse = (o, s) => {
    const n = o.value;
    if (!Xi(n))
      return o.issues.push({
        code: "invalid_type",
        expected: "object",
        input: n,
        inst: e
      }), o;
    const r = a.value.get(n?.[t.discriminator]);
    return r ? r._zod.run(o, s) : t.unionFallback || s.direction === "backward" ? i(o, s) : (o.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: t.discriminator,
      options: Array.from(a.value.keys()),
      input: n,
      path: [t.discriminator],
      inst: e
    }), o);
  };
}), Pb = /* @__PURE__ */ y("$ZodIntersection", (e, t) => {
  xe.init(e, t), e._zod.parse = (i, a) => {
    const o = i.value, s = t.left._zod.run({ value: o, issues: [] }, a), n = t.right._zod.run({ value: o, issues: [] }, a);
    return s instanceof Promise || n instanceof Promise ? Promise.all([s, n]).then(([c, d]) => fn(i, c, d)) : fn(i, s, n);
  };
});
function Fo(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (wi(e) && wi(t)) {
    const i = Object.keys(t), a = Object.keys(e).filter((s) => i.indexOf(s) !== -1), o = { ...e, ...t };
    for (const s of a) {
      const n = Fo(e[s], t[s]);
      if (!n.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...n.mergeErrorPath]
        };
      o[s] = n.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const o = e[a], s = t[a], n = Fo(o, s);
      if (!n.valid)
        return {
          valid: !1,
          mergeErrorPath: [a, ...n.mergeErrorPath]
        };
      i.push(n.data);
    }
    return { valid: !0, data: i };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function fn(e, t, i) {
  const a = /* @__PURE__ */ new Map();
  let o;
  for (const r of t.issues)
    if (r.code === "unrecognized_keys") {
      o ?? (o = r);
      for (const c of r.keys)
        a.has(c) || a.set(c, {}), a.get(c).l = !0;
    } else
      e.issues.push(r);
  for (const r of i.issues)
    if (r.code === "unrecognized_keys")
      for (const c of r.keys)
        a.has(c) || a.set(c, {}), a.get(c).r = !0;
    else
      e.issues.push(r);
  const s = [...a].filter(([, r]) => r.l && r.r).map(([r]) => r);
  if (s.length && o && e.issues.push({ ...o, keys: s }), pi(e))
    return e;
  const n = Fo(t.value, i.value);
  if (!n.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(n.mergeErrorPath)}`);
  return e.value = n.data, e;
}
const Rb = /* @__PURE__ */ y("$ZodRecord", (e, t) => {
  xe.init(e, t), e._zod.parse = (i, a) => {
    const o = i.value;
    if (!wi(o))
      return i.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: e
      }), i;
    const s = [], n = t.keyType._zod.values;
    if (n) {
      i.value = {};
      const r = /* @__PURE__ */ new Set();
      for (const d of n)
        if (typeof d == "string" || typeof d == "number" || typeof d == "symbol") {
          r.add(typeof d == "number" ? d.toString() : d);
          const u = t.keyType._zod.run({ value: d, issues: [] }, a);
          if (u instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (u.issues.length) {
            i.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: u.issues.map((b) => qt(b, a, Zt())),
              input: d,
              path: [d],
              inst: e
            });
            continue;
          }
          const f = u.value, p = t.valueType._zod.run({ value: o[d], issues: [] }, a);
          p instanceof Promise ? s.push(p.then((b) => {
            b.issues.length && i.issues.push(...fi(d, b.issues)), i.value[f] = b.value;
          })) : (p.issues.length && i.issues.push(...fi(d, p.issues)), i.value[f] = p.value);
        }
      let c;
      for (const d in o)
        r.has(d) || (c = c ?? [], c.push(d));
      c && c.length > 0 && i.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: e,
        keys: c
      });
    } else {
      i.value = {};
      for (const r of Reflect.ownKeys(o)) {
        if (r === "__proto__" || !Object.prototype.propertyIsEnumerable.call(o, r))
          continue;
        let c = t.keyType._zod.run({ value: r, issues: [] }, a);
        if (c instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof r == "string" && hc.test(r) && c.issues.length) {
          const f = t.keyType._zod.run({ value: Number(r), issues: [] }, a);
          if (f instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          f.issues.length === 0 && (c = f);
        }
        if (c.issues.length) {
          t.mode === "loose" ? i.value[r] = o[r] : i.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((f) => qt(f, a, Zt())),
            input: r,
            path: [r],
            inst: e
          });
          continue;
        }
        const u = t.valueType._zod.run({ value: o[r], issues: [] }, a);
        u instanceof Promise ? s.push(u.then((f) => {
          f.issues.length && i.issues.push(...fi(r, f.issues)), i.value[c.value] = f.value;
        })) : (u.issues.length && i.issues.push(...fi(r, u.issues)), i.value[c.value] = u.value);
      }
    }
    return s.length ? Promise.all(s).then(() => i) : i;
  };
}), Ub = /* @__PURE__ */ y("$ZodEnum", (e, t) => {
  xe.init(e, t);
  const i = nc(t.entries), a = new Set(i);
  e._zod.values = a, e._zod.pattern = new RegExp(`^(${i.filter((o) => Jp.has(typeof o)).map((o) => typeof o == "string" ? ki(o) : o.toString()).join("|")})$`), e._zod.parse = (o, s) => {
    const n = o.value;
    return a.has(n) || o.issues.push({
      code: "invalid_value",
      values: i,
      input: n,
      inst: e
    }), o;
  };
}), Zb = /* @__PURE__ */ y("$ZodLiteral", (e, t) => {
  if (xe.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const i = new Set(t.values);
  e._zod.values = i, e._zod.pattern = new RegExp(`^(${t.values.map((a) => typeof a == "string" ? ki(a) : a ? ki(a.toString()) : String(a)).join("|")})$`), e._zod.parse = (a, o) => {
    const s = a.value;
    return i.has(s) || a.issues.push({
      code: "invalid_value",
      values: t.values,
      input: s,
      inst: e
    }), a;
  };
}), qb = /* @__PURE__ */ y("$ZodTransform", (e, t) => {
  xe.init(e, t), e._zod.optin = "optional", e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new sc(e.constructor.name);
    const o = t.transform(i.value, i);
    if (a.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((n) => (i.value = n, i.fallback = !0, i));
    if (o instanceof Promise)
      throw new vi();
    return i.value = o, i.fallback = !0, i;
  };
});
function bn(e, t) {
  return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
const Ac = /* @__PURE__ */ y("$ZodOptional", (e, t) => {
  xe.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", me(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), me(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${ls(i.source)})?$`) : void 0;
  }), e._zod.parse = (i, a) => {
    if (t.innerType._zod.optin === "optional") {
      const o = i.value, s = t.innerType._zod.run(i, a);
      return s instanceof Promise ? s.then((n) => bn(n, o)) : bn(s, o);
    }
    return i.value === void 0 ? i : t.innerType._zod.run(i, a);
  };
}), zb = /* @__PURE__ */ y("$ZodExactOptional", (e, t) => {
  Ac.init(e, t), me(e._zod, "values", () => t.innerType._zod.values), me(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (i, a) => t.innerType._zod.run(i, a);
}), Fb = /* @__PURE__ */ y("$ZodNullable", (e, t) => {
  xe.init(e, t), me(e._zod, "optin", () => t.innerType._zod.optin), me(e._zod, "optout", () => t.innerType._zod.optout), me(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${ls(i.source)}|null)$`) : void 0;
  }), me(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (i, a) => i.value === null ? i : t.innerType._zod.run(i, a);
}), Mb = /* @__PURE__ */ y("$ZodDefault", (e, t) => {
  xe.init(e, t), e._zod.optin = "optional", me(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    if (i.value === void 0)
      return i.value = t.defaultValue, i;
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then((s) => hn(s, t)) : hn(o, t);
  };
});
function hn(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Nb = /* @__PURE__ */ y("$ZodPrefault", (e, t) => {
  xe.init(e, t), e._zod.optin = "optional", me(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => (a.direction === "backward" || i.value === void 0 && (i.value = t.defaultValue), t.innerType._zod.run(i, a));
}), Lb = /* @__PURE__ */ y("$ZodNonOptional", (e, t) => {
  xe.init(e, t), me(e._zod, "values", () => {
    const i = t.innerType._zod.values;
    return i ? new Set([...i].filter((a) => a !== void 0)) : void 0;
  }), e._zod.parse = (i, a) => {
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then((s) => mn(s, e)) : mn(o, e);
  };
});
function mn(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const Hb = /* @__PURE__ */ y("$ZodCatch", (e, t) => {
  xe.init(e, t), e._zod.optin = "optional", me(e._zod, "optout", () => t.innerType._zod.optout), me(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then((s) => (i.value = s.value, s.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: s.issues.map((n) => qt(n, a, Zt()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i)) : (i.value = o.value, o.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: o.issues.map((s) => qt(s, a, Zt()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i);
  };
}), Jb = /* @__PURE__ */ y("$ZodPipe", (e, t) => {
  xe.init(e, t), me(e._zod, "values", () => t.in._zod.values), me(e._zod, "optin", () => t.in._zod.optin), me(e._zod, "optout", () => t.out._zod.optout), me(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (i, a) => {
    if (a.direction === "backward") {
      const s = t.out._zod.run(i, a);
      return s instanceof Promise ? s.then((n) => ha(n, t.in, a)) : ha(s, t.in, a);
    }
    const o = t.in._zod.run(i, a);
    return o instanceof Promise ? o.then((s) => ha(s, t.out, a)) : ha(o, t.out, a);
  };
});
function ha(e, t, i) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
const Db = /* @__PURE__ */ y("$ZodReadonly", (e, t) => {
  xe.init(e, t), me(e._zod, "propValues", () => t.innerType._zod.propValues), me(e._zod, "values", () => t.innerType._zod.values), me(e._zod, "optin", () => t.innerType?._zod?.optin), me(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then(gn) : gn(o);
  };
});
function gn(e) {
  return e.value = Object.freeze(e.value), e;
}
const Bb = /* @__PURE__ */ y("$ZodCustom", (e, t) => {
  Ye.init(e, t), xe.init(e, t), e._zod.parse = (i, a) => i, e._zod.check = (i) => {
    const a = i.value, o = t.fn(a);
    if (o instanceof Promise)
      return o.then((s) => vn(s, i, a, e));
    vn(o, i, a, e);
  };
});
function vn(e, t, i, a) {
  if (!e) {
    const o = {
      code: "custom",
      input: i,
      inst: a,
      // incorporates params.error into issue reporting
      path: [...a._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !a._zod.def.abort
      // params: inst._zod.def.params,
    };
    a._zod.def.params && (o.params = a._zod.def.params), t.issues.push(Qi(o));
  }
}
var _n;
class Kb {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...i) {
    const a = i[0];
    return this._map.set(t, a), a && typeof a == "object" && "id" in a && this._idmap.set(a.id, t), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const i = this._map.get(t);
    return i && typeof i == "object" && "id" in i && this._idmap.delete(i.id), this._map.delete(t), this;
  }
  get(t) {
    const i = t._zod.parent;
    if (i) {
      const a = { ...this.get(i) ?? {} };
      delete a.id;
      const o = { ...a, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Gb() {
  return new Kb();
}
(_n = globalThis).__zod_globalRegistry ?? (_n.__zod_globalRegistry = Gb());
const Oi = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Wb(e, t) {
  return new e({
    type: "string",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Yb(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function yn(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xb(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Qb(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function eh(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function th(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ih(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ah(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function oh(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function sh(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function nh(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function rh(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ch(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function dh(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function uh(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function lh(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ph(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function fh(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function bh(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function hh(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function mh(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function gh(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function vh(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function _h(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function yh(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function wh(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function kh(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ih(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ah(e, t) {
  return new e({
    type: "boolean",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Th(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function xh(e, t) {
  return new e({
    type: "never",
    ...F(t)
  });
}
// @__NO_SIDE_EFFECTS__
function wn(e, t) {
  return new gc({
    check: "less_than",
    ...F(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function wo(e, t) {
  return new gc({
    check: "less_than",
    ...F(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function kn(e, t) {
  return new vc({
    check: "greater_than",
    ...F(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function ko(e, t) {
  return new vc({
    check: "greater_than",
    ...F(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function In(e, t) {
  return new Mf({
    check: "multiple_of",
    ...F(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function Tc(e, t) {
  return new Lf({
    check: "max_length",
    ...F(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Pa(e, t) {
  return new Hf({
    check: "min_length",
    ...F(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function xc(e, t) {
  return new Jf({
    check: "length_equals",
    ...F(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function Sh(e, t) {
  return new Df({
    check: "string_format",
    format: "regex",
    ...F(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function Vh(e) {
  return new Bf({
    check: "string_format",
    format: "lowercase",
    ...F(e)
  });
}
// @__NO_SIDE_EFFECTS__
function jh(e) {
  return new Kf({
    check: "string_format",
    format: "uppercase",
    ...F(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Ch(e, t) {
  return new Gf({
    check: "string_format",
    format: "includes",
    ...F(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function Eh(e, t) {
  return new Wf({
    check: "string_format",
    format: "starts_with",
    ...F(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function Oh(e, t) {
  return new Yf({
    check: "string_format",
    format: "ends_with",
    ...F(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ai(e) {
  return new Xf({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function $h(e) {
  return /* @__PURE__ */ Ai((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Ph() {
  return /* @__PURE__ */ Ai((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Rh() {
  return /* @__PURE__ */ Ai((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Uh() {
  return /* @__PURE__ */ Ai((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Zh() {
  return /* @__PURE__ */ Ai((e) => Lp(e));
}
// @__NO_SIDE_EFFECTS__
function qh(e, t, i) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...F(i)
  });
}
// @__NO_SIDE_EFFECTS__
function zh(e, t, i) {
  const a = F(i);
  return a.abort ?? (a.abort = !0), new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...a
  });
}
// @__NO_SIDE_EFFECTS__
function Fh(e, t, i) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...F(i)
  });
}
// @__NO_SIDE_EFFECTS__
function Mh(e, t) {
  const i = /* @__PURE__ */ Nh((a) => (a.addIssue = (o) => {
    if (typeof o == "string")
      a.issues.push(Qi(o, a.value, i._zod.def));
    else {
      const s = o;
      s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = a.value), s.inst ?? (s.inst = i), s.continue ?? (s.continue = !i._zod.def.abort), a.issues.push(Qi(s));
    }
  }, e(a.value, a)), t);
  return i;
}
// @__NO_SIDE_EFFECTS__
function Nh(e, t) {
  const i = new Ye({
    check: "custom",
    ...F(t)
  });
  return i._zod.check = e, i;
}
function Sc(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? Oi,
    target: t,
    unrepresentable: e?.unrepresentable ?? "throw",
    override: e?.override ?? (() => {
    }),
    io: e?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: e?.cycles ?? "ref",
    reused: e?.reused ?? "inline",
    external: e?.external ?? void 0
  };
}
function Re(e, t, i = { path: [], schemaPath: [] }) {
  var a;
  const o = e._zod.def, s = t.seen.get(e);
  if (s)
    return s.count++, i.schemaPath.includes(e) && (s.cycle = i.path), s.schema;
  const n = { schema: {}, count: 1, cycle: void 0, path: i.path };
  t.seen.set(e, n);
  const r = e._zod.toJSONSchema?.();
  if (r)
    n.schema = r;
  else {
    const u = {
      ...i,
      schemaPath: [...i.schemaPath, e],
      path: i.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, n.schema, u);
    else {
      const p = n.schema, b = t.processors[o.type];
      if (!b)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      b(e, t, p, u);
    }
    const f = e._zod.parent;
    f && (n.ref || (n.ref = f), Re(f, t, u), t.seen.get(f).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(n.schema, c), t.io === "input" && He(e) && (delete n.schema.examples, delete n.schema.default), t.io === "input" && "_prefault" in n.schema && ((a = n.schema).default ?? (a.default = n.schema._prefault)), delete n.schema._prefault, t.seen.get(e).schema;
}
function Vc(e, t) {
  const i = e.seen.get(t);
  if (!i)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const a = /* @__PURE__ */ new Map();
  for (const n of e.seen.entries()) {
    const r = e.metadataRegistry.get(n[0])?.id;
    if (r) {
      const c = a.get(r);
      if (c && c !== n[0])
        throw new Error(`Duplicate schema id "${r}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      a.set(r, n[0]);
    }
  }
  const o = (n) => {
    const r = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const f = e.external.registry.get(n[0])?.id, p = e.external.uri ?? ((E) => E);
      if (f)
        return { ref: p(f) };
      const b = n[1].defId ?? n[1].schema.id ?? `schema${e.counter++}`;
      return n[1].defId = b, { defId: b, ref: `${p("__shared")}#/${r}/${b}` };
    }
    if (n[1] === i)
      return { ref: "#" };
    const d = `#/${r}/`, u = n[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: u, ref: d + u };
  }, s = (n) => {
    if (n[1].schema.$ref)
      return;
    const r = n[1], { ref: c, defId: d } = o(n);
    r.def = { ...r.schema }, d && (r.defId = d);
    const u = r.schema;
    for (const f in u)
      delete u[f];
    u.$ref = c;
  };
  if (e.cycles === "throw")
    for (const n of e.seen.entries()) {
      const r = n[1];
      if (r.cycle)
        throw new Error(`Cycle detected: #/${r.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const n of e.seen.entries()) {
    const r = n[1];
    if (t === n[0]) {
      s(n);
      continue;
    }
    if (e.external) {
      const d = e.external.registry.get(n[0])?.id;
      if (t !== n[0] && d) {
        s(n);
        continue;
      }
    }
    if (e.metadataRegistry.get(n[0])?.id) {
      s(n);
      continue;
    }
    if (r.cycle) {
      s(n);
      continue;
    }
    if (r.count > 1 && e.reused === "ref") {
      s(n);
      continue;
    }
  }
}
function jc(e, t) {
  const i = e.seen.get(t);
  if (!i)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const a = (r) => {
    const c = e.seen.get(r);
    if (c.ref === null)
      return;
    const d = c.def ?? c.schema, u = { ...d }, f = c.ref;
    if (c.ref = null, f) {
      a(f);
      const b = e.seen.get(f), E = b.schema;
      if (E.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (d.allOf = d.allOf ?? [], d.allOf.push(E)) : Object.assign(d, E), Object.assign(d, u), r._zod.parent === f)
        for (const J in d)
          J === "$ref" || J === "allOf" || J in u || delete d[J];
      if (E.$ref && b.def)
        for (const J in d)
          J === "$ref" || J === "allOf" || J in b.def && JSON.stringify(d[J]) === JSON.stringify(b.def[J]) && delete d[J];
    }
    const p = r._zod.parent;
    if (p && p !== f) {
      a(p);
      const b = e.seen.get(p);
      if (b?.schema.$ref && (d.$ref = b.schema.$ref, b.def))
        for (const E in d)
          E === "$ref" || E === "allOf" || E in b.def && JSON.stringify(d[E]) === JSON.stringify(b.def[E]) && delete d[E];
    }
    e.override({
      zodSchema: r,
      jsonSchema: d,
      path: c.path ?? []
    });
  };
  for (const r of [...e.seen.entries()].reverse())
    a(r[0]);
  const o = {};
  if (e.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
    const r = e.external.registry.get(t)?.id;
    if (!r)
      throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(r);
  }
  Object.assign(o, i.def ?? i.schema);
  const s = e.metadataRegistry.get(t)?.id;
  s !== void 0 && o.id === s && delete o.id;
  const n = e.external?.defs ?? {};
  for (const r of e.seen.entries()) {
    const c = r[1];
    c.def && c.defId && (c.def.id === c.defId && delete c.def.id, n[c.defId] = c.def);
  }
  e.external || Object.keys(n).length > 0 && (e.target === "draft-2020-12" ? o.$defs = n : o.definitions = n);
  try {
    const r = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(r, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: Ra(t, "input", e.processors),
          output: Ra(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), r;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function He(e, t) {
  const i = t ?? { seen: /* @__PURE__ */ new Set() };
  if (i.seen.has(e))
    return !1;
  i.seen.add(e);
  const a = e._zod.def;
  if (a.type === "transform")
    return !0;
  if (a.type === "array")
    return He(a.element, i);
  if (a.type === "set")
    return He(a.valueType, i);
  if (a.type === "lazy")
    return He(a.getter(), i);
  if (a.type === "promise" || a.type === "optional" || a.type === "nonoptional" || a.type === "nullable" || a.type === "readonly" || a.type === "default" || a.type === "prefault")
    return He(a.innerType, i);
  if (a.type === "intersection")
    return He(a.left, i) || He(a.right, i);
  if (a.type === "record" || a.type === "map")
    return He(a.keyType, i) || He(a.valueType, i);
  if (a.type === "pipe")
    return e._zod.traits.has("$ZodCodec") ? !0 : He(a.in, i) || He(a.out, i);
  if (a.type === "object") {
    for (const o in a.shape)
      if (He(a.shape[o], i))
        return !0;
    return !1;
  }
  if (a.type === "union") {
    for (const o of a.options)
      if (He(o, i))
        return !0;
    return !1;
  }
  if (a.type === "tuple") {
    for (const o of a.items)
      if (He(o, i))
        return !0;
    return !!(a.rest && He(a.rest, i));
  }
  return !1;
}
const Lh = (e, t = {}) => (i) => {
  const a = Sc({ ...i, processors: t });
  return Re(e, a), Vc(a, e), jc(a, e);
}, Ra = (e, t, i = {}) => (a) => {
  const { libraryOptions: o, target: s } = a ?? {}, n = Sc({ ...o ?? {}, target: s, io: t, processors: i });
  return Re(e, n), Vc(n, e), jc(n, e);
}, Hh = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Jh = (e, t, i, a) => {
  const o = i;
  o.type = "string";
  const { minimum: s, maximum: n, format: r, patterns: c, contentEncoding: d } = e._zod.bag;
  if (typeof s == "number" && (o.minLength = s), typeof n == "number" && (o.maxLength = n), r && (o.format = Hh[r] ?? r, o.format === "" && delete o.format, r === "time" && delete o.format), d && (o.contentEncoding = d), c && c.size > 0) {
    const u = [...c];
    u.length === 1 ? o.pattern = u[0].source : u.length > 1 && (o.allOf = [
      ...u.map((f) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: f.source
      }))
    ]);
  }
}, Dh = (e, t, i, a) => {
  const o = i, { minimum: s, maximum: n, format: r, multipleOf: c, exclusiveMaximum: d, exclusiveMinimum: u } = e._zod.bag;
  typeof r == "string" && r.includes("int") ? o.type = "integer" : o.type = "number";
  const f = typeof u == "number" && u >= (s ?? Number.NEGATIVE_INFINITY), p = typeof d == "number" && d <= (n ?? Number.POSITIVE_INFINITY), b = t.target === "draft-04" || t.target === "openapi-3.0";
  f ? b ? (o.minimum = u, o.exclusiveMinimum = !0) : o.exclusiveMinimum = u : typeof s == "number" && (o.minimum = s), p ? b ? (o.maximum = d, o.exclusiveMaximum = !0) : o.exclusiveMaximum = d : typeof n == "number" && (o.maximum = n), typeof c == "number" && (o.multipleOf = c);
}, Bh = (e, t, i, a) => {
  i.type = "boolean";
}, Kh = (e, t, i, a) => {
  i.not = {};
}, Gh = (e, t, i, a) => {
}, Wh = (e, t, i, a) => {
  const o = e._zod.def, s = nc(o.entries);
  s.every((n) => typeof n == "number") && (i.type = "number"), s.every((n) => typeof n == "string") && (i.type = "string"), i.enum = s;
}, Yh = (e, t, i, a) => {
  const o = e._zod.def, s = [];
  for (const n of o.values)
    if (n === void 0) {
      if (t.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof n == "bigint") {
      if (t.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      s.push(Number(n));
    } else
      s.push(n);
  if (s.length !== 0) if (s.length === 1) {
    const n = s[0];
    i.type = n === null ? "null" : typeof n, t.target === "draft-04" || t.target === "openapi-3.0" ? i.enum = [n] : i.const = n;
  } else
    s.every((n) => typeof n == "number") && (i.type = "number"), s.every((n) => typeof n == "string") && (i.type = "string"), s.every((n) => typeof n == "boolean") && (i.type = "boolean"), s.every((n) => n === null) && (i.type = "null"), i.enum = s;
}, Xh = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, Qh = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, em = (e, t, i, a) => {
  const o = i, s = e._zod.def, { minimum: n, maximum: r } = e._zod.bag;
  typeof n == "number" && (o.minItems = n), typeof r == "number" && (o.maxItems = r), o.type = "array", o.items = Re(s.element, t, {
    ...a,
    path: [...a.path, "items"]
  });
}, tm = (e, t, i, a) => {
  const o = i, s = e._zod.def;
  o.type = "object", o.properties = {};
  const n = s.shape;
  for (const d in n)
    o.properties[d] = Re(n[d], t, {
      ...a,
      path: [...a.path, "properties", d]
    });
  const r = new Set(Object.keys(n)), c = new Set([...r].filter((d) => {
    const u = s.shape[d]._zod;
    return t.io === "input" ? u.optin === void 0 : u.optout === void 0;
  }));
  c.size > 0 && (o.required = Array.from(c)), s.catchall?._zod.def.type === "never" ? o.additionalProperties = !1 : s.catchall ? s.catchall && (o.additionalProperties = Re(s.catchall, t, {
    ...a,
    path: [...a.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, im = (e, t, i, a) => {
  const o = e._zod.def, s = o.inclusive === !1, n = o.options.map((r, c) => Re(r, t, {
    ...a,
    path: [...a.path, s ? "oneOf" : "anyOf", c]
  }));
  s ? i.oneOf = n : i.anyOf = n;
}, am = (e, t, i, a) => {
  const o = e._zod.def, s = Re(o.left, t, {
    ...a,
    path: [...a.path, "allOf", 0]
  }), n = Re(o.right, t, {
    ...a,
    path: [...a.path, "allOf", 1]
  }), r = (d) => "allOf" in d && Object.keys(d).length === 1, c = [
    ...r(s) ? s.allOf : [s],
    ...r(n) ? n.allOf : [n]
  ];
  i.allOf = c;
}, om = (e, t, i, a) => {
  const o = i, s = e._zod.def;
  o.type = "object";
  const n = s.keyType, c = n._zod.bag?.patterns;
  if (s.mode === "loose" && c && c.size > 0) {
    const u = Re(s.valueType, t, {
      ...a,
      path: [...a.path, "patternProperties", "*"]
    });
    o.patternProperties = {};
    for (const f of c)
      o.patternProperties[f.source] = u;
  } else
    (t.target === "draft-07" || t.target === "draft-2020-12") && (o.propertyNames = Re(s.keyType, t, {
      ...a,
      path: [...a.path, "propertyNames"]
    })), o.additionalProperties = Re(s.valueType, t, {
      ...a,
      path: [...a.path, "additionalProperties"]
    });
  const d = n._zod.values;
  if (d) {
    const u = [...d].filter((f) => typeof f == "string" || typeof f == "number");
    u.length > 0 && (o.required = u);
  }
}, sm = (e, t, i, a) => {
  const o = e._zod.def, s = Re(o.innerType, t, a), n = t.seen.get(e);
  t.target === "openapi-3.0" ? (n.ref = o.innerType, i.nullable = !0) : i.anyOf = [s, { type: "null" }];
}, nm = (e, t, i, a) => {
  const o = e._zod.def;
  Re(o.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = o.innerType;
}, rm = (e, t, i, a) => {
  const o = e._zod.def;
  Re(o.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = o.innerType, i.default = JSON.parse(JSON.stringify(o.defaultValue));
}, cm = (e, t, i, a) => {
  const o = e._zod.def;
  Re(o.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = o.innerType, t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, dm = (e, t, i, a) => {
  const o = e._zod.def;
  Re(o.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = o.innerType;
  let n;
  try {
    n = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  i.default = n;
}, um = (e, t, i, a) => {
  const o = e._zod.def, s = o.in._zod.traits.has("$ZodTransform"), n = t.io === "input" ? s ? o.out : o.in : o.out;
  Re(n, t, a);
  const r = t.seen.get(e);
  r.ref = n;
}, lm = (e, t, i, a) => {
  const o = e._zod.def;
  Re(o.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = o.innerType, i.readOnly = !0;
}, Cc = (e, t, i, a) => {
  const o = e._zod.def;
  Re(o.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = o.innerType;
}, pm = /* @__PURE__ */ y("ZodISODateTime", (e, t) => {
  pb.init(e, t), Ve.init(e, t);
});
function fm(e) {
  return /* @__PURE__ */ vh(pm, e);
}
const bm = /* @__PURE__ */ y("ZodISODate", (e, t) => {
  fb.init(e, t), Ve.init(e, t);
});
function hm(e) {
  return /* @__PURE__ */ _h(bm, e);
}
const mm = /* @__PURE__ */ y("ZodISOTime", (e, t) => {
  bb.init(e, t), Ve.init(e, t);
});
function gm(e) {
  return /* @__PURE__ */ yh(mm, e);
}
const vm = /* @__PURE__ */ y("ZodISODuration", (e, t) => {
  hb.init(e, t), Ve.init(e, t);
});
function _m(e) {
  return /* @__PURE__ */ wh(vm, e);
}
const ym = (e, t) => {
  uc.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (i) => of(e, i)
      // enumerable: false,
    },
    flatten: {
      value: (i) => af(e, i)
      // enumerable: false,
    },
    addIssue: {
      value: (i) => {
        e.issues.push(i), e.message = JSON.stringify(e.issues, zo, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (i) => {
        e.issues.push(...i), e.message = JSON.stringify(e.issues, zo, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, ut = /* @__PURE__ */ y("ZodError", ym, {
  Parent: Error
}), wm = /* @__PURE__ */ fs(ut), km = /* @__PURE__ */ bs(ut), Im = /* @__PURE__ */ io(ut), Am = /* @__PURE__ */ ao(ut), Tm = /* @__PURE__ */ rf(ut), xm = /* @__PURE__ */ cf(ut), Sm = /* @__PURE__ */ df(ut), Vm = /* @__PURE__ */ uf(ut), jm = /* @__PURE__ */ lf(ut), Cm = /* @__PURE__ */ pf(ut), Em = /* @__PURE__ */ ff(ut), Om = /* @__PURE__ */ bf(ut), An = /* @__PURE__ */ new WeakMap();
function sa(e, t, i) {
  const a = Object.getPrototypeOf(e);
  let o = An.get(a);
  if (o || (o = /* @__PURE__ */ new Set(), An.set(a, o)), !o.has(t)) {
    o.add(t);
    for (const s in i) {
      const n = i[s];
      Object.defineProperty(a, s, {
        configurable: !0,
        enumerable: !1,
        get() {
          const r = n.bind(this);
          return Object.defineProperty(this, s, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: r
          }), r;
        },
        set(r) {
          Object.defineProperty(this, s, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: r
          });
        }
      });
    }
  }
}
const Se = /* @__PURE__ */ y("ZodType", (e, t) => (xe.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: Ra(e, "input"),
    output: Ra(e, "output")
  }
}), e.toJSONSchema = Lh(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (i, a) => wm(e, i, a, { callee: e.parse }), e.safeParse = (i, a) => Im(e, i, a), e.parseAsync = async (i, a) => km(e, i, a, { callee: e.parseAsync }), e.safeParseAsync = async (i, a) => Am(e, i, a), e.spa = e.safeParseAsync, e.encode = (i, a) => Tm(e, i, a), e.decode = (i, a) => xm(e, i, a), e.encodeAsync = async (i, a) => Sm(e, i, a), e.decodeAsync = async (i, a) => Vm(e, i, a), e.safeEncode = (i, a) => jm(e, i, a), e.safeDecode = (i, a) => Cm(e, i, a), e.safeEncodeAsync = async (i, a) => Em(e, i, a), e.safeDecodeAsync = async (i, a) => Om(e, i, a), sa(e, "ZodType", {
  check(...i) {
    const a = this.def;
    return this.clone(Dt(a, {
      checks: [
        ...a.checks ?? [],
        ...i.map((o) => typeof o == "function" ? { _zod: { check: o, def: { check: "custom" }, onattach: [] } } : o)
      ]
    }), { parent: !0 });
  },
  with(...i) {
    return this.check(...i);
  },
  clone(i, a) {
    return Bt(this, i, a);
  },
  brand() {
    return this;
  },
  register(i, a) {
    return i.add(this, a), this;
  },
  refine(i, a) {
    return this.check(T0(i, a));
  },
  superRefine(i, a) {
    return this.check(x0(i, a));
  },
  overwrite(i) {
    return this.check(/* @__PURE__ */ Ai(i));
  },
  optional() {
    return jn(this);
  },
  exactOptional() {
    return p0(this);
  },
  nullable() {
    return Cn(this);
  },
  nullish() {
    return jn(Cn(this));
  },
  nonoptional(i) {
    return v0(this, i);
  },
  array() {
    return z(this);
  },
  or(i) {
    return o0([this, i]);
  },
  and(i) {
    return r0(this, i);
  },
  transform(i) {
    return En(this, u0(i));
  },
  default(i) {
    return h0(this, i);
  },
  prefault(i) {
    return g0(this, i);
  },
  catch(i) {
    return y0(this, i);
  },
  pipe(i) {
    return En(this, i);
  },
  readonly() {
    return I0(this);
  },
  describe(i) {
    const a = this.clone();
    return Oi.add(a, { description: i }), a;
  },
  meta(...i) {
    if (i.length === 0)
      return Oi.get(this);
    const a = this.clone();
    return Oi.add(a, i[0]), a;
  },
  isOptional() {
    return this.safeParse(void 0).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(i) {
    return i(this);
  }
}), Object.defineProperty(e, "description", {
  get() {
    return Oi.get(e)?.description;
  },
  configurable: !0
}), e)), Ec = /* @__PURE__ */ y("_ZodString", (e, t) => {
  hs.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (a, o, s) => Jh(e, a, o);
  const i = e._zod.bag;
  e.format = i.format ?? null, e.minLength = i.minimum ?? null, e.maxLength = i.maximum ?? null, sa(e, "_ZodString", {
    regex(...a) {
      return this.check(/* @__PURE__ */ Sh(...a));
    },
    includes(...a) {
      return this.check(/* @__PURE__ */ Ch(...a));
    },
    startsWith(...a) {
      return this.check(/* @__PURE__ */ Eh(...a));
    },
    endsWith(...a) {
      return this.check(/* @__PURE__ */ Oh(...a));
    },
    min(...a) {
      return this.check(/* @__PURE__ */ Pa(...a));
    },
    max(...a) {
      return this.check(/* @__PURE__ */ Tc(...a));
    },
    length(...a) {
      return this.check(/* @__PURE__ */ xc(...a));
    },
    nonempty(...a) {
      return this.check(/* @__PURE__ */ Pa(1, ...a));
    },
    lowercase(a) {
      return this.check(/* @__PURE__ */ Vh(a));
    },
    uppercase(a) {
      return this.check(/* @__PURE__ */ jh(a));
    },
    trim() {
      return this.check(/* @__PURE__ */ Ph());
    },
    normalize(...a) {
      return this.check(/* @__PURE__ */ $h(...a));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ Rh());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ Uh());
    },
    slugify() {
      return this.check(/* @__PURE__ */ Zh());
    }
  });
}), $m = /* @__PURE__ */ y("ZodString", (e, t) => {
  hs.init(e, t), Ec.init(e, t), e.email = (i) => e.check(/* @__PURE__ */ Yb(Pm, i)), e.url = (i) => e.check(/* @__PURE__ */ ih(Rm, i)), e.jwt = (i) => e.check(/* @__PURE__ */ gh(Wm, i)), e.emoji = (i) => e.check(/* @__PURE__ */ ah(Um, i)), e.guid = (i) => e.check(/* @__PURE__ */ yn(Tn, i)), e.uuid = (i) => e.check(/* @__PURE__ */ Xb(ma, i)), e.uuidv4 = (i) => e.check(/* @__PURE__ */ Qb(ma, i)), e.uuidv6 = (i) => e.check(/* @__PURE__ */ eh(ma, i)), e.uuidv7 = (i) => e.check(/* @__PURE__ */ th(ma, i)), e.nanoid = (i) => e.check(/* @__PURE__ */ oh(Zm, i)), e.guid = (i) => e.check(/* @__PURE__ */ yn(Tn, i)), e.cuid = (i) => e.check(/* @__PURE__ */ sh(qm, i)), e.cuid2 = (i) => e.check(/* @__PURE__ */ nh(zm, i)), e.ulid = (i) => e.check(/* @__PURE__ */ rh(Fm, i)), e.base64 = (i) => e.check(/* @__PURE__ */ bh(Bm, i)), e.base64url = (i) => e.check(/* @__PURE__ */ hh(Km, i)), e.xid = (i) => e.check(/* @__PURE__ */ ch(Mm, i)), e.ksuid = (i) => e.check(/* @__PURE__ */ dh(Nm, i)), e.ipv4 = (i) => e.check(/* @__PURE__ */ uh(Lm, i)), e.ipv6 = (i) => e.check(/* @__PURE__ */ lh(Hm, i)), e.cidrv4 = (i) => e.check(/* @__PURE__ */ ph(Jm, i)), e.cidrv6 = (i) => e.check(/* @__PURE__ */ fh(Dm, i)), e.e164 = (i) => e.check(/* @__PURE__ */ mh(Gm, i)), e.datetime = (i) => e.check(fm(i)), e.date = (i) => e.check(hm(i)), e.time = (i) => e.check(gm(i)), e.duration = (i) => e.check(_m(i));
});
function g(e) {
  return /* @__PURE__ */ Wb($m, e);
}
const Ve = /* @__PURE__ */ y("ZodStringFormat", (e, t) => {
  Ae.init(e, t), Ec.init(e, t);
}), Pm = /* @__PURE__ */ y("ZodEmail", (e, t) => {
  ab.init(e, t), Ve.init(e, t);
}), Tn = /* @__PURE__ */ y("ZodGUID", (e, t) => {
  tb.init(e, t), Ve.init(e, t);
}), ma = /* @__PURE__ */ y("ZodUUID", (e, t) => {
  ib.init(e, t), Ve.init(e, t);
}), Rm = /* @__PURE__ */ y("ZodURL", (e, t) => {
  ob.init(e, t), Ve.init(e, t);
}), Um = /* @__PURE__ */ y("ZodEmoji", (e, t) => {
  sb.init(e, t), Ve.init(e, t);
}), Zm = /* @__PURE__ */ y("ZodNanoID", (e, t) => {
  nb.init(e, t), Ve.init(e, t);
}), qm = /* @__PURE__ */ y("ZodCUID", (e, t) => {
  rb.init(e, t), Ve.init(e, t);
}), zm = /* @__PURE__ */ y("ZodCUID2", (e, t) => {
  cb.init(e, t), Ve.init(e, t);
}), Fm = /* @__PURE__ */ y("ZodULID", (e, t) => {
  db.init(e, t), Ve.init(e, t);
}), Mm = /* @__PURE__ */ y("ZodXID", (e, t) => {
  ub.init(e, t), Ve.init(e, t);
}), Nm = /* @__PURE__ */ y("ZodKSUID", (e, t) => {
  lb.init(e, t), Ve.init(e, t);
}), Lm = /* @__PURE__ */ y("ZodIPv4", (e, t) => {
  mb.init(e, t), Ve.init(e, t);
}), Hm = /* @__PURE__ */ y("ZodIPv6", (e, t) => {
  gb.init(e, t), Ve.init(e, t);
}), Jm = /* @__PURE__ */ y("ZodCIDRv4", (e, t) => {
  vb.init(e, t), Ve.init(e, t);
}), Dm = /* @__PURE__ */ y("ZodCIDRv6", (e, t) => {
  _b.init(e, t), Ve.init(e, t);
}), Bm = /* @__PURE__ */ y("ZodBase64", (e, t) => {
  yb.init(e, t), Ve.init(e, t);
}), Km = /* @__PURE__ */ y("ZodBase64URL", (e, t) => {
  kb.init(e, t), Ve.init(e, t);
}), Gm = /* @__PURE__ */ y("ZodE164", (e, t) => {
  Ib.init(e, t), Ve.init(e, t);
}), Wm = /* @__PURE__ */ y("ZodJWT", (e, t) => {
  Tb.init(e, t), Ve.init(e, t);
}), Oc = /* @__PURE__ */ y("ZodNumber", (e, t) => {
  yc.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (a, o, s) => Dh(e, a, o), sa(e, "ZodNumber", {
    gt(a, o) {
      return this.check(/* @__PURE__ */ kn(a, o));
    },
    gte(a, o) {
      return this.check(/* @__PURE__ */ ko(a, o));
    },
    min(a, o) {
      return this.check(/* @__PURE__ */ ko(a, o));
    },
    lt(a, o) {
      return this.check(/* @__PURE__ */ wn(a, o));
    },
    lte(a, o) {
      return this.check(/* @__PURE__ */ wo(a, o));
    },
    max(a, o) {
      return this.check(/* @__PURE__ */ wo(a, o));
    },
    int(a) {
      return this.check(xn(a));
    },
    safe(a) {
      return this.check(xn(a));
    },
    positive(a) {
      return this.check(/* @__PURE__ */ kn(0, a));
    },
    nonnegative(a) {
      return this.check(/* @__PURE__ */ ko(0, a));
    },
    negative(a) {
      return this.check(/* @__PURE__ */ wn(0, a));
    },
    nonpositive(a) {
      return this.check(/* @__PURE__ */ wo(0, a));
    },
    multipleOf(a, o) {
      return this.check(/* @__PURE__ */ In(a, o));
    },
    step(a, o) {
      return this.check(/* @__PURE__ */ In(a, o));
    },
    finite() {
      return this;
    }
  });
  const i = e._zod.bag;
  e.minValue = Math.max(i.minimum ?? Number.NEGATIVE_INFINITY, i.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(i.maximum ?? Number.POSITIVE_INFINITY, i.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (i.format ?? "").includes("int") || Number.isSafeInteger(i.multipleOf ?? 0.5), e.isFinite = !0, e.format = i.format ?? null;
});
function B(e) {
  return /* @__PURE__ */ kh(Oc, e);
}
const Ym = /* @__PURE__ */ y("ZodNumberFormat", (e, t) => {
  xb.init(e, t), Oc.init(e, t);
});
function xn(e) {
  return /* @__PURE__ */ Ih(Ym, e);
}
const Xm = /* @__PURE__ */ y("ZodBoolean", (e, t) => {
  Sb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Bh(e, i, a);
});
function Ii(e) {
  return /* @__PURE__ */ Ah(Xm, e);
}
const Qm = /* @__PURE__ */ y("ZodUnknown", (e, t) => {
  Vb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Gh();
});
function Sn() {
  return /* @__PURE__ */ Th(Qm);
}
const e0 = /* @__PURE__ */ y("ZodNever", (e, t) => {
  jb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Kh(e, i, a);
});
function t0(e) {
  return /* @__PURE__ */ xh(e0, e);
}
const i0 = /* @__PURE__ */ y("ZodArray", (e, t) => {
  Cb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => em(e, i, a, o), e.element = t.element, sa(e, "ZodArray", {
    min(i, a) {
      return this.check(/* @__PURE__ */ Pa(i, a));
    },
    nonempty(i) {
      return this.check(/* @__PURE__ */ Pa(1, i));
    },
    max(i, a) {
      return this.check(/* @__PURE__ */ Tc(i, a));
    },
    length(i, a) {
      return this.check(/* @__PURE__ */ xc(i, a));
    },
    unwrap() {
      return this.element;
    }
  });
});
function z(e, t) {
  return /* @__PURE__ */ qh(i0, e, t);
}
const a0 = /* @__PURE__ */ y("ZodObject", (e, t) => {
  Ob.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => tm(e, i, a, o), me(e, "shape", () => t.shape), sa(e, "ZodObject", {
    keyof() {
      return ge(Object.keys(this._zod.def.shape));
    },
    catchall(i) {
      return this.clone({ ...this._zod.def, catchall: i });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: Sn() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: Sn() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: t0() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: void 0 });
    },
    extend(i) {
      return Wp(this, i);
    },
    safeExtend(i) {
      return Yp(this, i);
    },
    merge(i) {
      return Xp(this, i);
    },
    pick(i) {
      return Kp(this, i);
    },
    omit(i) {
      return Gp(this, i);
    },
    partial(...i) {
      return Qp(Rc, this, i[0]);
    },
    required(...i) {
      return ef(Uc, this, i[0]);
    }
  });
});
function P(e, t) {
  const i = {
    type: "object",
    shape: e ?? {},
    ...F(t)
  };
  return new a0(i);
}
const $c = /* @__PURE__ */ y("ZodUnion", (e, t) => {
  Ic.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => im(e, i, a, o), e.options = t.options;
});
function o0(e, t) {
  return new $c({
    type: "union",
    options: e,
    ...F(t)
  });
}
const s0 = /* @__PURE__ */ y("ZodDiscriminatedUnion", (e, t) => {
  $c.init(e, t), $b.init(e, t);
});
function Pc(e, t, i) {
  return new s0({
    type: "union",
    options: t,
    discriminator: e,
    ...F(i)
  });
}
const n0 = /* @__PURE__ */ y("ZodIntersection", (e, t) => {
  Pb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => am(e, i, a, o);
});
function r0(e, t) {
  return new n0({
    type: "intersection",
    left: e,
    right: t
  });
}
const Vn = /* @__PURE__ */ y("ZodRecord", (e, t) => {
  Rb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => om(e, i, a, o), e.keyType = t.keyType, e.valueType = t.valueType;
});
function na(e, t, i) {
  return !t || !t._zod ? new Vn({
    type: "record",
    keyType: g(),
    valueType: e,
    ...F(t)
  }) : new Vn({
    type: "record",
    keyType: e,
    valueType: t,
    ...F(i)
  });
}
const Mo = /* @__PURE__ */ y("ZodEnum", (e, t) => {
  Ub.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (a, o, s) => Wh(e, a, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const i = new Set(Object.keys(t.entries));
  e.extract = (a, o) => {
    const s = {};
    for (const n of a)
      if (i.has(n))
        s[n] = t.entries[n];
      else
        throw new Error(`Key ${n} not found in enum`);
    return new Mo({
      ...t,
      checks: [],
      ...F(o),
      entries: s
    });
  }, e.exclude = (a, o) => {
    const s = { ...t.entries };
    for (const n of a)
      if (i.has(n))
        delete s[n];
      else
        throw new Error(`Key ${n} not found in enum`);
    return new Mo({
      ...t,
      checks: [],
      ...F(o),
      entries: s
    });
  };
});
function ge(e, t) {
  const i = Array.isArray(e) ? Object.fromEntries(e.map((a) => [a, a])) : e;
  return new Mo({
    type: "enum",
    entries: i,
    ...F(t)
  });
}
const c0 = /* @__PURE__ */ y("ZodLiteral", (e, t) => {
  Zb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Yh(e, i, a), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function ee(e, t) {
  return new c0({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...F(t)
  });
}
const d0 = /* @__PURE__ */ y("ZodTransform", (e, t) => {
  qb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Qh(e, i), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new sc(e.constructor.name);
    i.addIssue = (s) => {
      if (typeof s == "string")
        i.issues.push(Qi(s, i.value, t));
      else {
        const n = s;
        n.fatal && (n.continue = !1), n.code ?? (n.code = "custom"), n.input ?? (n.input = i.value), n.inst ?? (n.inst = e), i.issues.push(Qi(n));
      }
    };
    const o = t.transform(i.value, i);
    return o instanceof Promise ? o.then((s) => (i.value = s, i.fallback = !0, i)) : (i.value = o, i.fallback = !0, i);
  };
});
function u0(e) {
  return new d0({
    type: "transform",
    transform: e
  });
}
const Rc = /* @__PURE__ */ y("ZodOptional", (e, t) => {
  Ac.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Cc(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function jn(e) {
  return new Rc({
    type: "optional",
    innerType: e
  });
}
const l0 = /* @__PURE__ */ y("ZodExactOptional", (e, t) => {
  zb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Cc(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function p0(e) {
  return new l0({
    type: "optional",
    innerType: e
  });
}
const f0 = /* @__PURE__ */ y("ZodNullable", (e, t) => {
  Fb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => sm(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function Cn(e) {
  return new f0({
    type: "nullable",
    innerType: e
  });
}
const b0 = /* @__PURE__ */ y("ZodDefault", (e, t) => {
  Mb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => rm(e, i, a, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function h0(e, t) {
  return new b0({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : cc(t);
    }
  });
}
const m0 = /* @__PURE__ */ y("ZodPrefault", (e, t) => {
  Nb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => cm(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function g0(e, t) {
  return new m0({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : cc(t);
    }
  });
}
const Uc = /* @__PURE__ */ y("ZodNonOptional", (e, t) => {
  Lb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => nm(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function v0(e, t) {
  return new Uc({
    type: "nonoptional",
    innerType: e,
    ...F(t)
  });
}
const _0 = /* @__PURE__ */ y("ZodCatch", (e, t) => {
  Hb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => dm(e, i, a, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function y0(e, t) {
  return new _0({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const w0 = /* @__PURE__ */ y("ZodPipe", (e, t) => {
  Jb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => um(e, i, a, o), e.in = t.in, e.out = t.out;
});
function En(e, t) {
  return new w0({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const k0 = /* @__PURE__ */ y("ZodReadonly", (e, t) => {
  Db.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => lm(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function I0(e) {
  return new k0({
    type: "readonly",
    innerType: e
  });
}
const Zc = /* @__PURE__ */ y("ZodCustom", (e, t) => {
  Bb.init(e, t), Se.init(e, t), e._zod.processJSONSchema = (i, a, o) => Xh(e, i);
});
function A0(e, t) {
  return /* @__PURE__ */ zh(Zc, e ?? (() => !0), t);
}
function T0(e, t = {}) {
  return /* @__PURE__ */ Fh(Zc, e, t);
}
function x0(e, t) {
  return /* @__PURE__ */ Mh(e, t);
}
const qc = ge([
  "canon_exact",
  "canon_paraphrase",
  "supported_inference",
  "AU_extension",
  "rejected"
]), S0 = ge([
  "terminology",
  "profile",
  "appearance",
  "personality",
  "story",
  "combat",
  "boundary",
  "production"
]), V0 = ge([
  "official-game",
  "community-transcript",
  "community-reference",
  "gameplay-recording",
  "project-artifact"
]), j0 = ge([
  "metadata-only",
  "no-reprint",
  "project-internal"
]), C0 = P({
  id: g().min(1),
  kind: V0,
  title: g().min(1),
  url: g().url().optional(),
  localPath: g().min(1).optional(),
  locator: g().min(1),
  language: g().min(1),
  checkedAt: g().regex(/^\d{4}-\d{2}-\d{2}$/u),
  revisionId: B().int().positive().optional(),
  revisionTimestamp: g().min(1).optional(),
  redistribution: j0,
  note: g().min(1).optional()
}).strict().refine((e) => !!e.url != !!e.localPath, {
  message: "Canon source must declare exactly one of url or localPath"
}), E0 = P({
  sourceId: g().min(1),
  locator: g().min(1)
}).strict(), O0 = P({
  id: g().min(1),
  classification: qc,
  scope: S0,
  statement: g().min(1),
  recapText: g().min(1).optional(),
  evidence: z(E0).min(1),
  reviewedAt: g().regex(/^\d{4}-\d{2}-\d{2}$/u),
  rationale: g().min(1).optional(),
  rejectionReason: g().min(1).optional()
}).strict().superRefine((e, t) => {
  e.classification === "rejected" && !e.rejectionReason && t.addIssue({ code: "custom", path: ["rejectionReason"], message: "Rejected claims require a rejection reason" }), e.classification !== "rejected" && e.rejectionReason && t.addIssue({ code: "custom", path: ["rejectionReason"], message: "Only rejected claims may declare a rejection reason" });
}), zc = P({
  classification: qc,
  scope: ge(["canon_recap", "AU_boundary", "route"]),
  claimIds: z(g().min(1)).min(1),
  sourceIds: z(g().min(1)).min(1),
  note: g().min(1)
}).strict().superRefine((e, t) => {
  e.classification === "rejected" && t.addIssue({ code: "custom", path: ["classification"], message: "Rejected content cannot enter a published scene" }), e.scope === "canon_recap" && e.classification !== "canon_paraphrase" && t.addIssue({ code: "custom", path: ["classification"], message: "Canon recap scenes must be canon_paraphrase" }), e.scope !== "canon_recap" && e.classification !== "AU_extension" && t.addIssue({ code: "custom", path: ["classification"], message: "AU boundary and route scenes must be AU_extension" });
}), $0 = P({
  sceneIds: z(g().min(1)).min(1),
  provenance: zc
}).strict(), P0 = P({
  claimId: g().min(1),
  sceneIds: z(g().min(1)),
  worldbookEntryIds: z(g().min(1)),
  cardFields: z(g().min(1)),
  disposition: ge(["published", "production-constraint", "rejected"]),
  note: g().min(1)
}).strict().superRefine((e, t) => {
  const i = e.sceneIds.length + e.worldbookEntryIds.length + e.cardFields.length;
  e.disposition !== "rejected" && i === 0 && t.addIssue({ code: "custom", path: ["sceneIds"], message: "Published claims require at least one consumer" }), e.disposition === "rejected" && i !== 0 && t.addIssue({ code: "custom", path: ["sceneIds"], message: "Rejected claims cannot have published consumers" });
});
function Fc(e, t, i) {
  const a = /* @__PURE__ */ new Set();
  t.forEach((o, s) => {
    a.has(o.id) && e.addIssue({ code: "custom", path: [i, s, "id"], message: `Duplicate id: ${o.id}` }), a.add(o.id);
  });
}
P({ version: ee(1), sources: z(C0).min(1) }).strict().superRefine((e, t) => Fc(t, e.sources, "sources"));
P({ version: ee(1), claims: z(O0).min(1) }).strict().superRefine((e, t) => Fc(t, e.claims, "claims"));
P({ version: ee(1), entries: z($0).min(1) }).strict().superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.entries.forEach((a, o) => a.sceneIds.forEach((s, n) => {
    i.has(s) && t.addIssue({ code: "custom", path: ["entries", o, "sceneIds", n], message: `Duplicate scene provenance: ${s}` }), i.add(s);
  }));
});
P({
  version: ee(1),
  scope: g().min(1),
  exclusions: z(P({ scope: g().min(1), reason: g().min(1) }).strict()),
  entries: z(P0).min(1)
}).strict().superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.entries.forEach((a, o) => {
    i.has(a.claimId) && t.addIssue({ code: "custom", path: ["entries", o, "claimId"], message: `Duplicate claim coverage: ${a.claimId}` }), i.add(a.claimId);
  });
});
const Xe = ge([
  "white_canvas",
  "golden_bough_rebuild",
  "ring_conspiracy"
]), Ie = g().min(1), R0 = ge([
  "affectionAlbina",
  "trust",
  "danger",
  "artResonance"
]), Mc = ge([
  "intimacy",
  "reliance",
  "obsession",
  "suspicion"
]), U0 = ge([
  "blade",
  "boundary",
  "analysis",
  "resonance"
]), so = P({
  affectionAlbina: B().finite().optional(),
  trust: B().finite().optional(),
  danger: B().finite().optional(),
  artResonance: B().finite().optional(),
  composure: B().finite().optional(),
  materials: B().finite().optional(),
  leverage: B().finite().optional(),
  exposure: B().finite().optional()
}).strict(), Nc = P({
  intimacy: B().finite().optional(),
  reliance: B().finite().optional(),
  obsession: B().finite().optional(),
  suspicion: B().finite().optional()
}).strict(), Z0 = P({
  blade: B().finite().optional(),
  boundary: B().finite().optional(),
  analysis: B().finite().optional(),
  resonance: B().finite().optional()
}).strict(), q0 = P({
  battleId: Ie,
  outcome: ge(["victory", "setback"])
}).strict(), On = {
  operator: ge(["gte", "lte", "eq"]),
  value: B().finite()
}, Lc = Pc("kind", [
  P({ kind: ee("value"), key: R0, ...On }).strict(),
  P({ kind: ee("relationship"), key: Mc, ...On }).strict(),
  P({ kind: ee("flag"), flag: Ie, equals: Ii() }).strict(),
  P({ kind: ee("quest"), questId: Ie, status: ge(["active", "completed"]) }).strict(),
  P({ kind: ee("battle"), battleId: Ie, outcome: ge(["victory", "setback"]).optional() }).strict(),
  P({ kind: ee("item"), itemId: Ie }).strict(),
  P({ kind: ee("equipment"), equipmentId: Ie }).strict(),
  P({ kind: ee("outfit"), outfitId: Ie }).strict(),
  P({ kind: ee("profession"), professionId: Ie, levelGte: B().int().positive() }).strict(),
  P({ kind: ee("worldbook"), entryId: Ie, status: ge(["active", "seen"]) }).strict()
]), z0 = P({
  id: Mc,
  label: g().min(1),
  minimum: B().finite(),
  maximum: B().finite()
}).strict().refine((e) => e.minimum < e.maximum, { message: "Relationship track minimum must be below maximum" }), F0 = P({
  id: Ie,
  route: Xe,
  label: g().min(1),
  description: g().min(1)
}).strict(), M0 = P({
  id: Ie,
  route: Xe,
  label: g().min(1),
  description: g().min(1),
  recommendedMastery: U0
}).strict(), N0 = P({
  id: Ie,
  route: Xe.optional(),
  label: g().min(1),
  description: g().min(1)
}).strict(), L0 = P({
  id: Ie,
  itemId: Ie,
  route: Xe.optional(),
  slot: ge(["weapon", "armor", "accessory", "tool"]),
  label: g().min(1),
  modifiers: so
}).strict(), H0 = P({
  id: Ie,
  route: Xe.optional(),
  label: g().min(1),
  portraitAssetId: Ie
}).strict(), J0 = P({
  id: Ie,
  route: Xe.optional(),
  label: g().min(1),
  xpThresholds: z(B().int().nonnegative()).min(1),
  modifiersPerLevel: so
}).strict().superRefine((e, t) => {
  e.xpThresholds[0] !== 0 && t.addIssue({ code: "custom", path: ["xpThresholds", 0], message: "The first profession threshold must be zero" }), e.xpThresholds.slice(1).forEach((i, a) => {
    i <= e.xpThresholds[a] && t.addIssue({ code: "custom", path: ["xpThresholds", a + 1], message: "Profession thresholds must increase" });
  });
}), D0 = P({
  values: so.optional(),
  relationshipVectors: Nc.optional(),
  professionXp: na(Ie, B().int().positive()).optional(),
  setFlags: z(Ie).optional(),
  grantItems: z(Ie).optional(),
  unlockOutfits: z(Ie).optional()
}).strict(), B0 = P({
  id: Ie,
  route: Xe.optional(),
  label: g().min(1),
  description: g().min(1),
  eligibility: z(Lc).min(1),
  reward: D0
}).strict(), K0 = P({
  id: Ie,
  claimIds: z(Ie),
  constant: Ii(),
  selective: Ii(),
  content: g().min(1)
}).strict(), G0 = P({
  relationshipTracks: z(z0),
  quests: z(F0),
  battles: z(M0),
  items: z(N0),
  equipment: z(L0),
  professions: z(J0),
  achievements: z(B0),
  outfits: z(H0),
  worldbookEntries: z(K0)
}).strict();
function W0(e, t, i) {
  const a = /* @__PURE__ */ new Set();
  e.forEach((o, s) => {
    a.has(o.id) && i.addIssue({ code: "custom", path: [t, s, "id"], message: `Duplicate ${t} id: ${o.id}` }), a.add(o.id);
  });
}
function Y0(e, t) {
  const i = new Set(e.items.map(({ id: a }) => a));
  e.equipment.forEach((a, o) => {
    i.has(a.itemId) || t.addIssue({ code: "custom", path: ["equipment", o, "itemId"], message: `Unknown item reference: ${a.itemId}` });
  });
}
const X0 = G0.superRefine((e, t) => {
  for (const i of ["relationshipTracks", "quests", "battles", "items", "equipment", "professions", "achievements", "outfits", "worldbookEntries"])
    W0(e[i], i, t);
  Y0(e, t);
}), ri = 2, Q0 = so, eg = P({
  route: Xe.optional(),
  values: Q0.optional(),
  relationshipVectors: Nc.optional(),
  conflictMastery: Z0.optional(),
  setFlags: z(g().min(1)).optional(),
  clearFlags: z(g().min(1)).optional(),
  unlockCg: z(g().min(1)).optional(),
  grantItems: z(g().min(1)).optional(),
  equipItems: z(g().min(1)).optional(),
  unlockOutfits: z(g().min(1)).optional(),
  activateOutfit: g().min(1).optional(),
  startQuests: z(g().min(1)).optional(),
  completeQuests: z(g().min(1)).optional(),
  resolveBattles: z(q0).optional(),
  professionXp: na(g().min(1), B().int().positive()).optional(),
  activateProfession: g().min(1).optional()
}).strict(), $n = Lc, Hc = P({
  allOf: z($n).min(1).optional(),
  anyOf: z($n).min(1).optional(),
  fallback: Ii().optional()
}).strict().refine((e) => e.allOf || e.anyOf || e.fallback === !0, {
  message: "Choice availability must declare predicates or a fallback"
}), tg = P({
  route: Xe,
  kind: ge(["true", "normal", "bad"]),
  eligibility: Hc
}).strict(), ig = P({
  id: g().min(1),
  text: g().min(1),
  nextSceneId: g().min(1),
  resultText: g().min(1).optional(),
  resultVoiceAssetId: g().min(1).optional(),
  availability: Hc.optional(),
  effects: eg
}).strict(), ag = P({
  characterId: g().min(1),
  portraitAssetId: g().min(1),
  position: ge(["far-left", "left", "center", "right", "far-right"]),
  active: Ii(),
  scale: B().positive().finite()
}).strict(), og = P({
  version: ee(ri),
  id: g().min(1),
  chapter: B().int().nonnegative(),
  route: Xe.nullable(),
  provenance: zc,
  locationId: g().min(1),
  backgroundAssetId: g().min(1),
  cgAssetId: g().min(1).optional(),
  videoAssetId: g().min(1).optional(),
  desktopVideoAssetId: g().min(1).optional(),
  tone: g().min(1),
  portraits: z(ag),
  speaker: g().min(1),
  text: g(),
  voiceAssetId: g().min(1).optional(),
  bgmAssetId: g().min(1).optional(),
  sfxAssetIds: z(g().min(1)).optional(),
  choices: z(ig),
  ending: tg.optional()
}).strict(), sg = og.superRefine((e, t) => {
  e.provenance.scope !== "route" && e.route !== null && t.addIssue({ code: "custom", path: ["route"], message: "Canon recap and AU boundary scenes must use a null route" }), e.provenance.scope === "route" && e.route === null && t.addIssue({ code: "custom", path: ["route"], message: "Only canon recap and AU boundary scenes may use a null route" });
});
function ng(e) {
  return e.startsWith("/") || e.endsWith("/") || e.includes("\\") || e.includes(":") ? !1 : e.split("/").every((t) => t.length > 0 && t !== "." && t !== "..");
}
const ra = g().min(1).refine(ng, {
  message: "Asset paths must be relative to the canonical asset root"
}), Jc = ge(["pie", "x666-openai-compatible"]), Dc = ge(["gpt-image-2", "seedance-1.5-pro", "speech-2.8-hd"]), ms = g().regex(/^[a-z0-9][a-z0-9._-]*$/iu), Bc = P({
  cueAlias: g().regex(/^[a-z0-9][a-z0-9_]*$/u),
  title: g().min(1),
  creator: g().min(1),
  isrc: g().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/u),
  sourceUrl: g().url(),
  licenseId: ee("CC-BY-4.0"),
  licenseUrl: ee("https://creativecommons.org/licenses/by/4.0/"),
  attribution: g().min(1)
}).strict(), rg = P({
  version: ee(1),
  projectId: ee("albina-galgame-card"),
  packagedNotice: g().min(1),
  tracks: z(Bc.extend({
    assetId: g().min(1),
    path: ra.refine((e) => e.startsWith("audio/bgm/"), {
      message: "Licensed music paths must be inside audio/bgm"
    }),
    sha256: g().regex(/^[a-f0-9]{64}$/u)
  }).strict()).length(5),
  officialSoundtrack: P({
    publisher: ee("ProjectMoon"),
    channel: ee("ProjectMoon Official"),
    playlistTitle: ee("LCB OST"),
    playlistTrackCount: ee(35),
    verifiedOn: ee("2026-07-15"),
    bundled: ee(!1),
    cached: ee(!1),
    redistributionAllowed: ee(!1),
    notice: g().min(1),
    rightsNotice: g().min(1),
    links: z(P({ label: g().min(1), url: g().url() }).strict()).length(2),
    termsUrl: ee("https://limbuscompany.com/terms-of-service/")
  }).strict()
}).strict().superRefine((e, t) => {
  e.tracks.forEach((i, a) => {
    i.creator !== "Kevin MacLeod" && t.addIssue({ code: "custom", path: ["tracks", a, "creator"], message: "Packaged BGM creator must be Kevin MacLeod" });
    const o = new URL(i.sourceUrl);
    (o.protocol !== "https:" || o.hostname !== "incompetech.com" || o.pathname !== "/music/royalty-free/index.html" || o.searchParams.get("isrc") !== i.isrc) && t.addIssue({ code: "custom", path: ["tracks", a, "sourceUrl"], message: "Track source must be its HTTPS Incompetech ISRC page" });
  });
}), cg = P({
  provider: Jc,
  model: Dc,
  upstreamPieVerified: ee(!1).optional(),
  promptVersion: ms,
  sourceJobHash: g().regex(/^[a-f0-9]{64}$/iu),
  review: P({
    status: ee("approved"),
    reviewer: g().min(1),
    reviewedAt: g().datetime()
  }).strict()
}).strict().superRefine((e, t) => {
  Kc(t, ["model"], e.provider, e.model), Gc(t, ["upstreamPieVerified"], e.provider, e.upstreamPieVerified);
}), dg = P({
  status: ge(["verified", "unverified"]),
  sourceType: ge(["model-output", "project-authored", "licensed-source", "third-party-source"]),
  redistribution: ge(["allowed", "restricted", "unverified"]),
  rightsBasis: g().min(1),
  holder: g().min(1).optional(),
  sourceUrl: g().url().optional()
}).strict().superRefine((e, t) => {
  e.status === "verified" && e.redistribution !== "allowed" && t.addIssue({ code: "custom", path: ["redistribution"], message: "Verified asset rights must allow redistribution" }), e.status === "verified" && !e.holder && t.addIssue({ code: "custom", path: ["holder"], message: "Verified asset rights require a holder" });
}), ug = P({
  assetId: g().min(1).optional(),
  sha256: g().regex(/^[a-f0-9]{64}$/iu),
  role: g().min(1)
}).strict(), lg = P({
  kind: ge(["original", "derivative", "transcode", "conversion"]),
  processVersion: ms,
  inputs: z(ug)
}).strict().superRefine((e, t) => {
  e.kind === "original" && e.inputs.length !== 0 && t.addIssue({ code: "custom", path: ["inputs"], message: "Original assets cannot declare parent inputs" }), e.kind !== "original" && e.inputs.length === 0 && t.addIssue({ code: "custom", path: ["inputs"], message: "Derived assets require at least one parent input" });
}), pg = P({
  id: g().min(1),
  kind: ge(["image", "video", "audio", "json"]),
  path: ra,
  mimeType: g().min(1).optional(),
  sha256: g().regex(/^[a-f0-9]{64}$/i).optional(),
  bytes: B().int().nonnegative().optional(),
  provenance: cg.optional(),
  rights: dg.optional(),
  lineage: lg.optional(),
  license: Bc.optional()
}).strict().superRefine((e, t) => {
  e.path.startsWith("audio/bgm/") && !e.license && t.addIssue({ code: "custom", path: ["license"], message: "Packaged BGM requires registered license metadata" }), e.license && e.kind !== "audio" && t.addIssue({ code: "custom", path: ["license"], message: "License metadata is only supported on audio assets" });
}), fg = Pc("kind", [
  P({ kind: ee("static") }).strict(),
  P({
    kind: ee("strip"),
    frameCount: ee(8),
    frameWidth: B().int().positive(),
    frameHeight: B().int().positive(),
    fps: B().positive().finite()
  }).strict()
]), bg = P({
  version: ee(ri),
  id: g().min(1),
  characterId: g().min(1),
  path: ra,
  animation: fg,
  fallbackAssetId: g().min(1).optional()
}).strict(), hg = P({
  version: ee(ri),
  id: g().min(1),
  assetId: g().min(1),
  kind: ge(["image", "image-edit", "video", "speech"]),
  provider: Jc,
  model: Dc,
  upstreamPieVerified: ee(!1).optional(),
  promptVersion: ms,
  status: ge(["pending", "running", "completed", "failed"]),
  contentHash: g().regex(/^[a-f0-9]{64}$/i),
  inputAssetIds: z(g().min(1)),
  outputPath: ra,
  attempts: B().int().nonnegative(),
  error: g().optional()
}).strict().superRefine((e, t) => {
  const i = e.kind === "image-edit" ? "image" : e.kind;
  Kc(t, ["model"], e.provider, e.model, i), Gc(t, ["upstreamPieVerified"], e.provider, e.upstreamPieVerified);
});
function Kc(e, t, i, a, o) {
  const s = i === "x666-openai-compatible" ? ["gpt-image-2"] : i === "pie" ? ["seedance-1.5-pro", "speech-2.8-hd"] : [], n = o === void 0 || { image: ["gpt-image-2"], video: ["seedance-1.5-pro"], speech: ["speech-2.8-hd"] }[o].includes(a);
  (!s.includes(a) || !n) && e.addIssue({ code: "custom", path: t, message: `Unsupported provider/model pair: ${i}/${a}` });
}
function Gc(e, t, i, a) {
  (i === "x666-openai-compatible" ? a === !1 : a === void 0) || e.addIssue({ code: "custom", path: t, message: `Invalid upstream Pie evidence for provider: ${i}` });
}
const mg = P({
  version: ee(ri),
  projectId: ee("albina-galgame-card"),
  basePath: ra,
  assets: z(pg),
  portraits: z(bg),
  mediaJobs: z(hg)
}).strict();
function ga(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
const Wc = mg.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.assets.forEach((a, o) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["assets", o, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id);
  }), e.assets.forEach((a, o) => {
    a.lineage?.inputs.forEach((s, n) => {
      if (!s.assetId) return;
      const r = e.assets.find((c) => c.id === s.assetId);
      r ? r.sha256 !== s.sha256 && t.addIssue({ code: "custom", path: ["assets", o, "lineage", "inputs", n, "sha256"], message: `Lineage hash mismatch for ${s.assetId}` }) : ga(t, ["assets", o, "lineage", "inputs", n, "assetId"], s.assetId);
    });
  }), e.portraits.forEach((a, o) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["portraits", o, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id), a.fallbackAssetId && !e.assets.some((s) => s.id === a.fallbackAssetId) && ga(t, ["portraits", o, "fallbackAssetId"], a.fallbackAssetId);
  }), e.mediaJobs.forEach((a, o) => {
    i.has(a.assetId) || ga(t, ["mediaJobs", o, "assetId"], a.assetId), a.inputAssetIds.forEach((s, n) => {
      i.has(s) || ga(t, ["mediaJobs", o, "inputAssetIds", n], s);
    });
  });
});
function gg(e) {
  return Wc.parse(e);
}
const vg = "2.0.0-rc.2", _g = ".";
function yg(e, t) {
  if (t)
    return e.assets.find((i) => i.id === t);
}
function gs(e, t, i = _g) {
  const a = yg(e, t);
  if (!a) return;
  const o = [e.basePath, ...a.path.split("/")].map((s) => encodeURIComponent(s)).join("/");
  return `${i.replace(/\/$/u, "")}/${o}`;
}
const wg = 2, kg = "albina-galgame-card", Ig = "assets", Ag = /* @__PURE__ */ JSON.parse('[{"id":"bg.backstreets_rain","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"bg.city_rooftop","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"bg.golden_bough","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"bg.lce_lab","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"bg.limbus_bus","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"bg.mirror_corridor","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"bg.nest_station","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"bg.outskirts_dawn","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"bg.rain_room","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"bg.ring_atelier","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"bg.spider_gallery","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"bg.white_canvas","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"cg.araya_rooftop","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"cg.art_resonance","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"cg.backstreet_pursuit","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"cg.combat_transition_01","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"cg.conspiracy_contract","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"cg.fascia_heartbeat","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"cg.golden_bough_ending","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"cg.golden_bough_rebuild","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"cg.hollow_torso_reveal","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"cg.lce_raid","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"cg.limbus_bus_night","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"cg.maestro_shadow","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"cg.opening_rain","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"cg.rain_confession","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"cg.rebuild_awakening","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"cg.ren_interruption","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"cg.ring_conspiracy_ending","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"cg.ring_invitation","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"cg.surgery_of_memory","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"cg.trust_threshold","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"cg.white_canvas_choice","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"cg.white_canvas_ending","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.audio.bgm.backstreets.rain.mp3","kind":"audio","path":"audio/bgm/backstreets_rain.mp3","mimeType":"audio/mpeg","sha256":"97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414","bytes":4192274,"license":{"cueAlias":"backstreets_rain","title":"SCP-x6x (Hopes)","creator":"Kevin MacLeod","isrc":"USUAN2000012","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.between.two.worlds.mp3","kind":"audio","path":"audio/bgm/between_two_worlds.mp3","mimeType":"audio/mpeg","sha256":"25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184","bytes":2979130,"license":{"cueAlias":"between_two_worlds","title":"Mesmerizing Galaxy","creator":"Kevin MacLeod","isrc":"USUAN2300011","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.boss.kromer.mp3","kind":"audio","path":"audio/bgm/boss_kromer.mp3","mimeType":"audio/mpeg","sha256":"923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd","bytes":3679463,"license":{"cueAlias":"boss_kromer","title":"Burnt Spirit","creator":"Kevin MacLeod","isrc":"USUAN1700053","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.main.menu.mp3","kind":"audio","path":"audio/bgm/main_menu.mp3","mimeType":"audio/mpeg","sha256":"299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60","bytes":7685141,"license":{"cueAlias":"main_menu","title":"Magistar","creator":"Kevin MacLeod","isrc":"USUAN1900003","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.title.theme.mp3","kind":"audio","path":"audio/bgm/title_theme.mp3","mimeType":"audio/mpeg","sha256":"03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3","bytes":2540613,"license":{"cueAlias":"title_theme","title":"Achilles","creator":"Kevin MacLeod","isrc":"USUAN1100463","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.credits.json","kind":"json","path":"audio/CREDITS.json","mimeType":"application/json","sha256":"6240eedcfc62fe286eaa2d3a99496efbe6aaf0fb6a6a1254f48ca144ac7c1ba9","bytes":4215},{"id":"file.audio.se.blood.splat.wav","kind":"audio","path":"audio/se/blood_splat.wav","mimeType":"audio/wav","sha256":"87c30bfd8c336786de618759015f3ee24eee2638d406d7541c7c3fc17201bc17","bytes":17684},{"id":"file.audio.se.glass.shatter.wav","kind":"audio","path":"audio/se/glass_shatter.wav","mimeType":"audio/wav","sha256":"7f066a84a711bcdcf48abc70b07e92ee21957e25cd06765d3637226c55bddda2","bytes":15920},{"id":"file.audio.se.slash.heavy.wav","kind":"audio","path":"audio/se/slash_heavy.wav","mimeType":"audio/wav","sha256":"c93d1adea430352fd38fd9ef315c54801f9fde63350a2fa62584ad20441c7f57","bytes":15920},{"id":"file.audio.se.typing.blip.wav","kind":"audio","path":"audio/se/typing_blip.wav","mimeType":"audio/wav","sha256":"0002e7621f5dd6510cc047dbcfaee2cc7ab958dc20b1d149809958a6f14b1668","bytes":4012},{"id":"file.audio.se.ui.back.wav","kind":"audio","path":"audio/se/ui_back.wav","mimeType":"audio/wav","sha256":"c80e3b1f405a1a2c3d35c5f7b0d94839aba09bce28136b76b94b17a72eaf7f65","bytes":10628},{"id":"file.audio.se.ui.click.wav","kind":"audio","path":"audio/se/ui_click.wav","mimeType":"audio/wav","sha256":"fb67965be3a2b903b7f06c19646df9943f5607bea683798718fe2e77a188e270","bytes":2248},{"id":"file.audio.se.ui.confirm.wav","kind":"audio","path":"audio/se/ui_confirm.wav","mimeType":"audio/wav","sha256":"7fc178ebe16e5de7b62514cca74b1fdcf800dc85156c2d450079279a2446904b","bytes":17684},{"id":"file.audio.voice.result.canon.recap.continue.9.18.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_18.mp3","mimeType":"audio/mpeg","sha256":"5e02d8a955ef36c182bd2293307fec531e24e153d58994cb34a2b68a8b34ae73","bytes":97907},{"id":"file.audio.voice.result.canon.recap.continue.9.37.battle.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"86a766b774def49b6ded10b24608646f954866fdefa589f72d99f7fe3d29d102","bytes":76595},{"id":"file.audio.voice.result.canon.recap.continue.9.37.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37.mp3","mimeType":"audio/mpeg","sha256":"ef041d6a2aaf372b440caad96e3f34bb2191ec52acef42d2e42186de67303304","bytes":102515},{"id":"file.audio.voice.result.canon.recap.continue.9.43.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_43.mp3","mimeType":"audio/mpeg","sha256":"a20ac9b480763a7e9ec332d7954e226947884f56bae8d39cd3409f77e66b234f","bytes":168179},{"id":"file.audio.voice.result.canon.recap.continue.albina.fascia.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"a329c02dcac7c7c700b02e8cd20ae50b7e9f5cf992542b9396c3773c169240c3","bytes":73715},{"id":"file.audio.voice.result.canon.recap.enter.au.mp3","kind":"audio","path":"audio/voice/result/canon_recap_enter_AU.mp3","mimeType":"audio/mpeg","sha256":"e5456be94fcf623863ffcd78173c6f9841ade86d30ce54aeec82966aabdae179","bytes":135347},{"id":"file.audio.voice.result.conspiracy.005.let.her.answer.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"c3eeb96169e86d6d32bd24fcc1716f1b4b6169c24241a4a3785ad6e35bd0499b","bytes":321395},{"id":"file.audio.voice.result.conspiracy.005.refuse.duo.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"2188bc6032b768b6711d3163bdb45adbe7deec31d451ce74cf2b6af85785d93c","bytes":334643},{"id":"file.audio.voice.result.conspiracy.006.block.view.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"a3b7b7a240d59c2516983757140ded9382f6f71e6c5f74b94af8d4ce8110502e","bytes":429107},{"id":"file.audio.voice.result.conspiracy.006.stand.with.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"d162f239d7d33996b43d4c9d2d517bff741e93b46293fcc55a00bfb778166ff9","bytes":444659},{"id":"file.audio.voice.result.conspiracy.007.break.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"1f3a9e8bd205a0e3fb7c9e3cac83e2f286036b393413ccf5fa9d9797e3e17b6e","bytes":346739},{"id":"file.audio.voice.result.conspiracy.007.seize.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"cdacc6deea4032e1a6b3889c6e989a772db86ca71a4343e45235bbd132cbbaf2","bytes":402035},{"id":"file.audio.voice.result.conspiracy.008.hand.pen.to.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"20aa52feaa8fdba93ea122e4264a5eb06266a253371186bcb28cd255427c0cdb","bytes":358835},{"id":"file.audio.voice.result.conspiracy.008.refuse.testimony.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"5e39100ad58ff26de7201dc277ecc8a8f050f8fe377f891cada6bc4eca38dcb4","bytes":339827},{"id":"file.audio.voice.result.conspiracy.009.choose.present.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"47fd587851224f61df1079bb5334dcccee2e87291913900762adea0939e83adb","bytes":426227},{"id":"file.audio.voice.result.conspiracy.009.refuse.choice.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"579736096170a0afb00017791b093021e59651844116fa3b46fcd527896ade75","bytes":453299},{"id":"file.audio.voice.result.conspiracy.010.keep.badge.unworn.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"451f67bf64c927ab02b685fd2eb24983cca5fa46d14a55371b211bc29b97d0fc","bytes":392243},{"id":"file.audio.voice.result.conspiracy.010.throw.badge.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"317363feb895846841f2512ebd4680be547ea512c07b7290ecc09f53bf2284d5","bytes":387635},{"id":"file.audio.voice.result.conspiracy.011.burn.film.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"a6264c49431dbde54ff1eaa4d8d3a7011fc931b07ff3d1fd020388c8ba4cb79c","bytes":361715},{"id":"file.audio.voice.result.conspiracy.011.rewrite.ending.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"af9b903ff26fae14e50a4640b1fe6d591b5003cb8a340756d3061aeea4e0ced0","bytes":355379},{"id":"file.audio.voice.result.conspiracy.012.end.tonight.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"baef1eca98936b80447bce403bebcc1cdc8793ee1204f36275c34f358c06fb6a","bytes":411251},{"id":"file.audio.voice.result.conspiracy.012.keep.blade.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"f7132cd47552bc59b54ad3c7b73d1640f3fb2f215e9f315ab3b4251afd77a7ff","bytes":404339},{"id":"file.audio.voice.result.conspiracy.013.hold.one.second.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"e6647cb10fc82ee28ff451331a5ba9a1dba9b63459c65c962e1cef19c1bc11d0","bytes":373811},{"id":"file.audio.voice.result.conspiracy.013.return.gently.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"0e850f0e57d302c364b6bfe21980b42dee124a283e4a66ef12bd1339b0f2682f","bytes":398003},{"id":"file.audio.voice.result.conspiracy.014.erase.from.catalog.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"0d32f303e7302bca81e8f9a74e3aec0cf46b23bf71427f7f0211deeb029afe37","bytes":420467},{"id":"file.audio.voice.result.conspiracy.014.keep.one.line.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"6c8bb01ee8faf99dca4cb097731a5c741735c223510416f7d98135c323d23f6f","bytes":429683},{"id":"file.audio.voice.result.conspiracy.accept.mp3","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"fca5933a9b7940e9e70ab2bc2d5f3bb2d5c1831e231e002d5e81d2d70187c8b9","bytes":358835},{"id":"file.audio.voice.result.conspiracy.break.pursuit.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"80b95c0329a2ffd9463183d39c56d1a3c0c1be97857807307076441da7d1355d","bytes":354227},{"id":"file.audio.voice.result.conspiracy.escape.to.backstreets.mp3","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"529885d362546fee041fb9daee874070b414eacfbaa0f0b0e202eec1f8848847","bytes":391667},{"id":"file.audio.voice.result.conspiracy.feed.false.signature.mp3","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"c8891dea18a2427f9c866fc45da8a392922ed1a4a29fb6adf9820661e38875f8","bytes":357107},{"id":"file.audio.voice.result.conspiracy.pressure.mp3","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"3af0fae827f9ab4202ed89aafca164c7bbd4f9cc3a3adea4a6c5df0fd15f9411","bytes":310451},{"id":"file.audio.voice.result.enter.conspiracy.mp3","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"24ced6cd96816578da6dfa13fcf83514876c5562cdb6f8e09b1c32b4bcb11c7b","bytes":204467},{"id":"file.audio.voice.result.enter.rebuild.mp3","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"bd654ac516dd06f38f235bdf52260e578ce0a7655ed1111525deaa6e58e44a82","bytes":207923},{"id":"file.audio.voice.result.enter.white.canvas.mp3","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"e8ab325da6c8a12608d75df2bda071b88bb6ff7acf5e1572d9071ea6d8038b8c","bytes":145715},{"id":"file.audio.voice.result.golden.bough.rebuild.bad.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"99044fbcd083fd583946b6883e5b9098fc9c681c04319fb140fdde443f8ed226","bytes":166451},{"id":"file.audio.voice.result.golden.bough.rebuild.normal.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"555ba1fc500a42fc45cddbb0faa5230b5368741bc1d5e78412c002eb1ba786d9","bytes":165299},{"id":"file.audio.voice.result.golden.bough.rebuild.true.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"2cefdaae2ccccd65e997733ccc076bab546212ccd50a7ceaab6b6e07f2bf4b24","bytes":154931},{"id":"file.audio.voice.result.golden.bough.route.complete.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"1833aef2d3549425edf9702212a3dc74c91a2cbda14cb736da529cece809b327","bytes":491315},{"id":"file.audio.voice.result.golden.bough.route.final.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ee88fbcd046d6a69a5fde950904bb78bb78ac8590de0464d4bd9759e19ae5fa6","bytes":208499},{"id":"file.audio.voice.result.rebuild.006.keep.silent.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"212f4fb4d012df83e4ed3b002061b0ac8a6eba70df48e94c1cd3d4c583045174","bytes":396851},{"id":"file.audio.voice.result.rebuild.006.read.aloud.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"94cbc15ffad0d60de661ad72f8f46068442a75679d48014e17805f34c0c7b975","bytes":398003},{"id":"file.audio.voice.result.rebuild.007.match.her.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"596b9c870c33cf5251c74a86de0b633a13fd58220e38d4e68f4e190e74fab424","bytes":438323},{"id":"file.audio.voice.result.rebuild.007.stay.own.rhythm.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"87aec6c173a73614256d9ff98e2598dbec41e0e0d850b9fbcc59efa75f35b4b4","bytes":450995},{"id":"file.audio.voice.result.rebuild.008.protect.current.self.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"304ca21879c6515cfe594282032b1811fb0957dc5803f21b63c001770df3fd5d","bytes":405491},{"id":"file.audio.voice.result.rebuild.008.trade.old.memory.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"9ddad23ff662681ba22e7e3c0a569ce229853bdf73c03cd752b4c697bd79ac21","bytes":401459},{"id":"file.audio.voice.result.rebuild.009.hand.question.back.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"9cbf99b9553ac93f17ffa5b3179f47bb3667ee0729cef49e411c1d3db2a1cd13","bytes":400307},{"id":"file.audio.voice.result.rebuild.009.refuse.perfect.copy.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"f73bf969c5b85ea064c9c6c43ee7780f6f83c579eae92674a94f5dde32232348","bytes":393971},{"id":"file.audio.voice.result.rebuild.010.ask.her.choice.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"c74066ee553419d3bf9ee597a4f851bd2fb5938b5a555af427292eecadf454f1","bytes":335795},{"id":"file.audio.voice.result.rebuild.010.veto.sealing.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"1832293d354bb2b22f61a4a66504f3114df3752012423cf14866e59929c6dc9b","bytes":343283},{"id":"file.audio.voice.result.rebuild.011.ask.next.revision.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"07d1e7d28a4ef027c305d085a2bb06525a63e8f66d563abbcc96faaaf06606c3","bytes":433715},{"id":"file.audio.voice.result.rebuild.011.sit.beside.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"7dc8a32f43d98ae9902fe48573d34552259baff4c692ffb65d2deea5df6dfb98","bytes":430259},{"id":"file.audio.voice.result.rebuild.012.break.contract.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"1c8c41c15241d865afd824a846acc0cf0ab205f26696e0e7c85be5299607b345","bytes":372083},{"id":"file.audio.voice.result.rebuild.012.negotiate.terms.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"12dd9f48b173bbf8fb3e92086a05bc9e9cb28099547345f88931e680e804b033","bytes":398579},{"id":"file.audio.voice.result.rebuild.013.offer.witness.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"e86589de87474e4a6f8d57062df9f43650fc3a154618f5778d52c5e9ffcf4dc4","bytes":374963},{"id":"file.audio.voice.result.rebuild.013.promise.name.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"1cfe997ea1a9204419bba1848681231d5351da60b5259246858533ba814d93ff","bytes":376115},{"id":"file.audio.voice.result.rebuild.014.ask.when.to.light.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"b81315d3ae6125ade7203449a21784899d0ccf28126b576feaf319dc80de2f69","bytes":423923},{"id":"file.audio.voice.result.rebuild.014.keep.unlit.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"fb826259dff130419016dbbe3720b59b7326c454fcbf7479dd9b8fc6a93fa2aa","bytes":433715},{"id":"file.audio.voice.result.rebuild.accept.missing.pieces.mp3","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"025ab49988979a6e3e8f9cb317f22442a0713b06c30db883126a0a3162e650a9","bytes":361715},{"id":"file.audio.voice.result.rebuild.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"65d32bf4c0b1141ea6ae80963cdf550162b5896279d98ac6e2cccd40bfaa63e1","bytes":236723},{"id":"file.audio.voice.result.rebuild.cut.false.completion.mp3","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"0b7ebcceeaa3fcd9939421b7aee1b5fb6d7c9d14a4ca98dd7435ef1f29205120","bytes":367475},{"id":"file.audio.voice.result.rebuild.guard.fascia.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"f11f541a1544a54ba6d13f6adb0d93344ab451bd099d2005a5ac8c3a8cfe6369","bytes":389363},{"id":"file.audio.voice.result.rebuild.push.into.raid.mp3","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"68acf768a66dd60d6ad996e4a06a57ef2755b9787f90f32d4f572b6d8c2426e0","bytes":406643},{"id":"file.audio.voice.result.rebuild.question.fascia.mp3","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"d49e2703fac28f03e412f0001ad711a642ae86bd88b37ca116d4c392f03099bb","bytes":228083},{"id":"file.audio.voice.result.rebuild.use.rooftop.signal.mp3","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"ab251367e6459f692c3477dcd584be69f0f3c43ea3912d22748e065d36987151","bytes":352499},{"id":"file.audio.voice.result.return.opening.from.rebuild.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"4fb14344c5e70dfd1bc4f6b3ef069c4ad64cf34f491992513f836ee3cc93ce90","bytes":289715},{"id":"file.audio.voice.result.return.opening.from.ring.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"9157a6a67aeac5fab63aab484d8a5fb2fe3a3352e3f50dc20b77351d1248eccb","bytes":278771},{"id":"file.audio.voice.result.return.opening.from.white.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"a0e41b784a562c97daa29e6174c6d10a22ff9161e15af5fb15b80ba1992b76eb","bytes":301811},{"id":"file.audio.voice.result.ring.conspiracy.bad.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"f613f8e6d2453ec2827bb0acd07911ea84e7ef59edca47f378b7d76c0ce2c240","bytes":151475},{"id":"file.audio.voice.result.ring.conspiracy.normal.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"33bfedb7ada3a4bb3134f0eea06241ff6ac26a45c289d0a7261ee66b7ab9bca6","bytes":187763},{"id":"file.audio.voice.result.ring.conspiracy.route.complete.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e13a967ca990933a69a93dcd78c122a5119f1c4d7d8f7e8c50ec15bae74d3b00","bytes":419891},{"id":"file.audio.voice.result.ring.conspiracy.route.final.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"472ea9d9842371171504444bf5341c93c318c1998d2e81ea34833e020a8ee208","bytes":232115},{"id":"file.audio.voice.result.ring.conspiracy.true.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"fec30778f7f3ce3c3d76b6bf7028e7aa6ff5529e421e33a4494f67acb10205ea","bytes":167027},{"id":"file.audio.voice.result.white.006.name.silence.mp3","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"052bdd2c9ad58dc357d4a8e2efa1c775e719bfa0df5cc6a5b7ac5b5f2af548f9","bytes":418739},{"id":"file.audio.voice.result.white.006.refuse.naming.mp3","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"ddd59afe994de4a252c61a3803bbd0c63997304b9e6df37447b59e9b965017ca","bytes":425075},{"id":"file.audio.voice.result.white.007.ask.fascia.term.mp3","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"6bf8213e512ae808e04046fa39600bed3a1b59e7ce91dcbb902bb0b1fb666992","bytes":426803},{"id":"file.audio.voice.result.white.007.keep.mirror.open.mp3","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"33a99a192d13ca70613e200a261e7b33659be9ae2b5d4efe34efa334d75d3e05","bytes":398579},{"id":"file.audio.voice.result.white.008.hold.fascia.mp3","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"41c2e3016510dd00c492632d8189788d79fc6e54b3383550412f1e057f071bfb","bytes":332339},{"id":"file.audio.voice.result.white.008.stay.witness.only.mp3","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"c6c37b0dae21ed498ef7c5c7671ed8429861fd5027ed8de840f27fa65c1d49b2","bytes":354803},{"id":"file.audio.voice.result.white.009.keep.half.step.mp3","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"eb273061a887f8ea4796b2804cde9e109aed783bc88853b2592e3f4ced0e241e","bytes":374387},{"id":"file.audio.voice.result.white.009.share.umbrella.edge.mp3","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"a4f1748e8858f3adf850f0b3c2c6b38e65fe9b23edd557966889b071f0b09c9b","bytes":323123},{"id":"file.audio.voice.result.white.010.acknowledge.leave.mp3","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"6eb65fdccaf7e057ad12905510492926701ea449996d3c5697d56729dd8e1705","bytes":358835},{"id":"file.audio.voice.result.white.010.offer.return.ticket.mp3","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"45594596a7c3fc007652bef42743925bb65a7615f873cad61d3429386b6eff4e","bytes":361139},{"id":"file.audio.voice.result.white.011.curtain.call.mp3","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"42179eea6ade8f967fd3ed425a108fe78172750b55804d3fdf6ed6a57ab1d5df","bytes":384179},{"id":"file.audio.voice.result.white.011.walk.beside.mp3","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"5364cd974fd319a09968ea5dd8d47bacb304bc918dc1a8180d9b905bfec6d4e3","bytes":391667},{"id":"file.audio.voice.result.white.012.let.her.decide.mp3","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"8d92faf82d8e23de74356dea4233451838b0cf1ee0a41ab884f8407fc2ecb97d","bytes":364019},{"id":"file.audio.voice.result.white.012.refuse.exhibit.mp3","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"f13e7e5ddde629cffe4e022558da710927c6a9ea98b21b938cfa47c06fda6b65","bytes":346163},{"id":"file.audio.voice.result.white.013.point.to.mirror.mp3","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"adf910758dc7147da909d2c11f12d49cb04fe05dc10095c915dabb83e4d5e490","bytes":417011},{"id":"file.audio.voice.result.white.013.refuse.to.choose.mp3","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"b3aa0c454052fd8f5dd1981af5510d3acd0aa9b23d1d3c82e0407b59b4fada8f","bytes":419891},{"id":"file.audio.voice.result.white.014.keep.base.color.mp3","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"e5abbde8433953db9427ab67392fc60bb77aabd16ed2f507d6c40d323701476f","bytes":403763},{"id":"file.audio.voice.result.white.014.offer.restart.mp3","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7b0a0fca1de3ae894ac6455f61354b0004fc7a4ae669990f3eb17c26c6cd6a5c","bytes":438899},{"id":"file.audio.voice.result.white.canvas.bad.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"c689384a6b62ca60bd84391fcecb3abf36158a295d70a0213079969f28f70def","bytes":164147},{"id":"file.audio.voice.result.white.canvas.normal.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"0ea2a3bb0d492de34026165ff824b572dde9aa0561ecb32ac1df0c3d037fa217","bytes":151475},{"id":"file.audio.voice.result.white.canvas.route.complete.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"94f66d44430484558772b9203ee1050accb21fa9f21110a8b3664cc8e0237896","bytes":430259},{"id":"file.audio.voice.result.white.canvas.route.final.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"8e5228040c26e7c73ad64f14c4193f27b6aa73dd95460494258f47ccfbb83aba","bytes":230387},{"id":"file.audio.voice.result.white.canvas.true.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"82c737637b2243b9be6ffb7dc45883f143773bae425420ec730e03c8510f32c4","bytes":150323},{"id":"file.audio.voice.result.white.follow.to.lab.mp3","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"40e6d43999da61bda9da83fd878956a088de4cb25b6cc0d99be4b8214810351f","bytes":401459},{"id":"file.audio.voice.result.white.interrupt.lab.terms.mp3","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"dc0db8f0f34333e77b1186156c828aa59e1d510caa95aa0e97610a5065add968","bytes":364595},{"id":"file.audio.voice.result.white.keep.empty.seat.mp3","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8a76f675d5ea394277777e38529d1862f21dd62a5b2685da635ed0527df7e052","bytes":395699},{"id":"file.audio.voice.result.white.share.rain.window.mp3","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"20335d2fc8cfaef91400201f56bd1be36b2d9ea44402037c73bf06dd31af4b3a","bytes":378419},{"id":"file.audio.voice.result.white.sign.witness.protocol.mp3","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"e7636aa5a1ef0e083f6b8d3ef998b1c370cf1c529a2f37d0e89594b37f956400","bytes":345011},{"id":"file.audio.voice.result.white.tease.back.mp3","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"1f65a84e40a1502a6fe8e2ee76133eaacd13e6673a4abd42b573750db8e155db","bytes":309875},{"id":"file.audio.voice.result.white.touch.boundary.mp3","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"367db6cdbaa418ed281c5d5e32d56c6fb59c82f8ac911913ecd1be2b6f7938ad","bytes":321971},{"id":"file.audio.voice.scene.canon.recap.9.14.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_14.mp3","mimeType":"audio/mpeg","sha256":"177b6bb8d06c753e852f15f15053ee009e752c2d6b6e60cf5b9529808378539e","bytes":563315},{"id":"file.audio.voice.scene.canon.recap.9.18.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_18.mp3","mimeType":"audio/mpeg","sha256":"92d1bdda2e7c3a93bf3b4e2a68a424bf85d10949df29e99f57f026710c83a10c","bytes":839219},{"id":"file.audio.voice.scene.canon.recap.9.37.battle.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"d136a8873f583ce3c5df44c57934c316402ebf899020e61c2ef21abf24ca18d3","bytes":675635},{"id":"file.audio.voice.scene.canon.recap.9.37.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_37.mp3","mimeType":"audio/mpeg","sha256":"63e76cd6291fbaa5d6f2dfe363b704e98c63ab0ade8eabb1bb96ff1ace9e39b0","bytes":916979},{"id":"file.audio.voice.scene.canon.recap.9.43.outcome.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_43_outcome.mp3","mimeType":"audio/mpeg","sha256":"29214a431ceda8a8917df7b47af4d31df69bb22b709c0d1ac6887579440310ab","bytes":1276403},{"id":"file.audio.voice.scene.canon.recap.albina.fascia.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"9f445dfa83c196e54ab760d5d10b1ca08a23199e1d7a3c117bfbe04d9c187fca","bytes":2609267},{"id":"file.audio.voice.scene.golden.bough.001.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"17b56b325e5051b43a27459152b094c53d12ac2edf65c03c0ec65533cb20a29c","bytes":203315},{"id":"file.audio.voice.scene.golden.bough.002.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"d6365c5d4894da5e57e88319d8c2fe264f25c4199b41031c8ed72ba40e09ee19","bytes":154355},{"id":"file.audio.voice.scene.golden.bough.003.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"1ad02d7568d0ae545c157a13989da73a7f7006aea805d0617a3d99ee3421ccfc","bytes":290867},{"id":"file.audio.voice.scene.golden.bough.004.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"a59f7ec4c382fbe7e9f54e6eca0c1c4a1d0c5fc3d8fb6b431831c69a8da8fc78","bytes":290867},{"id":"file.audio.voice.scene.golden.bough.005.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"507228ac0a027d9c8f3534301d01fff6b9cedcf322a4daca6ec6803288517688","bytes":255155},{"id":"file.audio.voice.scene.golden.bough.006.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"ba279ed3531dc0ed703444d8ef096802428ca7ab29fcbf4f3873588ceb4d786d","bytes":311027},{"id":"file.audio.voice.scene.golden.bough.007.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"e493295b8fc9a9777274dc6ea8bdf29f6fa36ffe186a9e8b705bc4f95e9dcf6a","bytes":326579},{"id":"file.audio.voice.scene.golden.bough.008.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"41eb3a1a3f955bdf78b8107b5f3aeb6e06a1c1446c0300f4de0f712a3b1a310e","bytes":308723},{"id":"file.audio.voice.scene.golden.bough.009.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"54d231c0a6980338b1b28ea6ce15ca5a284f11bb0631106e1e3cb393c8154f89","bytes":315059},{"id":"file.audio.voice.scene.golden.bough.010.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"5ea795c0fd6273b40f187838c3ab9129a255d1dca1f7e65f155ee7c2b56c2972","bytes":305843},{"id":"file.audio.voice.scene.golden.bough.011.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"99ca50db65946593f20b548272f662389b678e88a6241d83d4d068de15595509","bytes":249395},{"id":"file.audio.voice.scene.golden.bough.012.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"152da1cd4f137ebca0900f228e2ed76cf392114063f02c3e63d6193ac093abc4","bytes":308147},{"id":"file.audio.voice.scene.golden.bough.013.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"47e62c9d7dfb826b8fd9caf7a722a5bd0b4e1790632a24dd3f7a5acb5ec138b4","bytes":306419},{"id":"file.audio.voice.scene.golden.bough.014.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"aaeffda74a330c6f70513fad58a0bfb8ebd8aa5793806ac74075e9aa4f4224d7","bytes":256883},{"id":"file.audio.voice.scene.golden.bough.015.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"796624549e2d513c2f139e412cbb989e3d9fa9221c6d6cb9c5d0d18cb9e14b69","bytes":298355},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"cd354aeaef8a6692d7f672d11d0ee3cf0c6bedfb9bd350a5f889ea2160902518","bytes":301811},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7d0130d4db06b824850c69ce95c00de02af01fccaca56854c850e0284c9f29ae","bytes":207923},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"bd6aa132a1ac2f6c5fe62a3f328e5950cdb2b8ea54a3a92399bd7afed1f3e4fd","bytes":287987},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.true.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"43cbec46f0fd8d9debb60a95f16e0e3663775a057c40df9af5dfef8e921c42f5","bytes":328307},{"id":"file.audio.voice.scene.opening.001.mp3","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"0ab7a4a0b1a11486d6feaeac10e40b2b9aec2675f19dcce2ddb501c679238074","bytes":425651},{"id":"file.audio.voice.scene.ring.conspiracy.001.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"f4535e60e9ebfe3a9f50940530ec05a38ca9e7dd665e2f7064ad0d52811753c2","bytes":186611},{"id":"file.audio.voice.scene.ring.conspiracy.002.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"61c43123ae22fe7a5f07bd0d7b10070f527a4d8d9413b2c6e15b27c6566242f8","bytes":235571},{"id":"file.audio.voice.scene.ring.conspiracy.003.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"51c502de79a93bb2b1a26a98501944d677fb2c15a5a49e15a29bdd31e414a498","bytes":247667},{"id":"file.audio.voice.scene.ring.conspiracy.004.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"41d01bc36452401d3300d76fe34a239e8c75f8711c9a5a5448865c2ecb49897c","bytes":291443},{"id":"file.audio.voice.scene.ring.conspiracy.005.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"3e3011f9fdefa13e482f113f80ed4b977e27ad28d279150b8ab7044801ddfc01","bytes":280499},{"id":"file.audio.voice.scene.ring.conspiracy.006.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"39c5261f5ef3d79e728f8364259d03f4d6de58242dc63be4797fe92077cb74e6","bytes":256883},{"id":"file.audio.voice.scene.ring.conspiracy.007.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"bf7b82d130b47ba9f0efdf5a0590b87d41601bcf2d90f01c20debb7d931cfc8f","bytes":270131},{"id":"file.audio.voice.scene.ring.conspiracy.008.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"2709be5f3a41429a9bee00e2a8631e14884cf249fee14c9944001fc865dfeb4c","bytes":306419},{"id":"file.audio.voice.scene.ring.conspiracy.009.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"30ab38b0d89d5d55b3ee833f4446be0b572508195146ba4529670e9293e4bc60","bytes":239603},{"id":"file.audio.voice.scene.ring.conspiracy.010.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"7902ea7116a00c992000ba090b0b886fadfbef3b628c57141a43e473a6478edf","bytes":287987},{"id":"file.audio.voice.scene.ring.conspiracy.011.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"3ff28c1d82f871ea748100c320625f9f9d6ab0e53d8929b3e3dd0f09cec392c5","bytes":291443},{"id":"file.audio.voice.scene.ring.conspiracy.012.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"43419544d4b85735fc4c6f3e8d3239307c4b19b4ebeade5d1120ef815715d6f6","bytes":273587},{"id":"file.audio.voice.scene.ring.conspiracy.013.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"3065ed0dc9815078d8a5148a84ed2e29b7fb6cd9f7300cebe791ed20c59e0a53","bytes":306995},{"id":"file.audio.voice.scene.ring.conspiracy.014.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"dd44754be2c8d7146bc1593bb86525176f25e94c47f696498500a106ec5a58cd","bytes":254003},{"id":"file.audio.voice.scene.ring.conspiracy.015.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"97b9eaf4e55aa2b333cc755914da99c5aa967ba3696b762800ea3249a138d8db","bytes":366899},{"id":"file.audio.voice.scene.ring.conspiracy.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"9e16b3ccefac5a327e73e53fbd9dc45c88d12cb71b0b1129b696de7c1e957c05","bytes":319091},{"id":"file.audio.voice.scene.ring.conspiracy.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"b8b574bf431cc9bdbadfe73fc3a0622a16f7d27433c7d3d38cb1fdc0655b6682","bytes":216563},{"id":"file.audio.voice.scene.ring.conspiracy.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"9ddbee2b9dd93b149de53a5806a4fd9900a3bce05fd204c7f9a53c8140c295af","bytes":270707},{"id":"file.audio.voice.scene.ring.conspiracy.ending.true.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"55e5b7c7eb8118623d1b36aaa5e85d9b6ab4286c3e205c6e8d262be481691c37","bytes":347891},{"id":"file.audio.voice.scene.white.canvas.001.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"61917fda12f4f29461e9db4603781dfe6af6351b9c58e8ac89fd6e11176a3d91","bytes":149171},{"id":"file.audio.voice.scene.white.canvas.002.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"3fa78fe28acb401aa624e5dc0a149c430be3543587c707a460cc19238519b227","bytes":207923},{"id":"file.audio.voice.scene.white.canvas.003.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"30c100d35a1e686cb6108e478d3c4eebc698b2bcf7fb964fde186a6e96f4564a","bytes":236147},{"id":"file.audio.voice.scene.white.canvas.004.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"829183a0e33a583a8af9072cf4914baa183d24cdb28d9fc9685c2ef02f8d9458","bytes":273011},{"id":"file.audio.voice.scene.white.canvas.005.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"aac01f6f0bfb4130603e8ab330d08aa661878e5acaf94e9c1230a356456f16c4","bytes":264947},{"id":"file.audio.voice.scene.white.canvas.006.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"136978b119f80ca4655d4524f31808012d3c01076a055f2edf3a1a5a9c38f0eb","bytes":289715},{"id":"file.audio.voice.scene.white.canvas.007.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"3b2ae779f6a0764aa8055571ce7a8fe0418c76cc9a2a7da395925ac3c90e2e91","bytes":293747},{"id":"file.audio.voice.scene.white.canvas.008.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"4846c374ffcf1f93861daf210c752df86f4c00e1e3836d860d69522a116588ed","bytes":322547},{"id":"file.audio.voice.scene.white.canvas.009.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"fc92b8497ec1f4133deafffd4f0204dde06654db1aea65ee0f1573f20bbf8354","bytes":258035},{"id":"file.audio.voice.scene.white.canvas.010.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"82ce426cffeabb5431b3d08764ce3e7e42686b3f71f2e46736ecaa2a931d9135","bytes":216563},{"id":"file.audio.voice.scene.white.canvas.011.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"c70978714c71795b05c1eff9adc92713e956103e2d2a8ac8e8576f65b2b7a01a","bytes":287411},{"id":"file.audio.voice.scene.white.canvas.012.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"e6ccc5d30d1785af804799386b190334e375a77051545f1e49d211b5a2ce982c","bytes":254579},{"id":"file.audio.voice.scene.white.canvas.013.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"01d2f23ebdf72832e6a5b7480d5e4202e92f8b6a7445e614f6a00b324d5500c7","bytes":283379},{"id":"file.audio.voice.scene.white.canvas.014.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"1d2f602a2128a3d29d0953c583a78b495f75e55478cabfb5606e0a719c0db871","bytes":275891},{"id":"file.audio.voice.scene.white.canvas.015.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"5e4dff6e9f9d0f0373ceba2400c2044a6dacdc3dfd1b0a465cc4ce5dd8010619","bytes":306419},{"id":"file.audio.voice.scene.white.canvas.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"4a724974ac526d8bb95a3b999fc0a4d04dd8fe645433f89b677d8df29c3c5bd4","bytes":294899},{"id":"file.audio.voice.scene.white.canvas.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7b3659054aae442107a743730580dfee2084a7b9ef612e5de43300774412ed49","bytes":209075},{"id":"file.audio.voice.scene.white.canvas.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"7e098e1806cb221d667e4ade629f5b6696f19ac270afc3eef05b8847457ca140","bytes":260339},{"id":"file.audio.voice.scene.white.canvas.ending.true.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"8d2e7919504bf82ed1df05b648d9959d486caf9b9abffb9aaa9d883f517db401","bytes":288563},{"id":"file.bg.backstreets.rain.jpg","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"file.bg.city.rooftop.jpg","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"file.bg.golden.bough.jpg","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"file.bg.lce.lab.jpg","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"file.bg.limbus.bus.jpg","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"file.bg.mirror.corridor.jpg","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"file.bg.nest.station.jpg","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"file.bg.outskirts.dawn.jpg","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"file.bg.rain.room.jpg","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"file.bg.ring.atelier.jpg","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"file.bg.spider.gallery.jpg","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"file.bg.white.canvas.jpg","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"file.cg.araya.rooftop.jpg","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"file.cg.art.resonance.jpg","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"file.cg.backstreet.pursuit.jpg","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"file.cg.combat.transition.01.jpg","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"file.cg.conspiracy.contract.jpg","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"file.cg.fascia.heartbeat.jpg","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"file.cg.golden.bough.ending.jpg","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"file.cg.golden.bough.rebuild.jpg","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"file.cg.hollow.torso.reveal.jpg","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"file.cg.lce.raid.jpg","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"file.cg.limbus.bus.night.jpg","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"file.cg.maestro.shadow.jpg","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"file.cg.opening.rain.jpg","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"file.cg.rain.confession.jpg","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"file.cg.rebuild.awakening.jpg","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"file.cg.ren.interruption.jpg","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"file.cg.ring.conspiracy.ending.jpg","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"file.cg.ring.invitation.jpg","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"file.cg.surgery.of.memory.jpg","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"file.cg.trust.threshold.jpg","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"file.cg.white.canvas.choice.jpg","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"file.cg.white.canvas.ending.jpg","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.characters.albina.armored.png","kind":"image","path":"characters/albina/armored.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.combat.png","kind":"image","path":"characters/albina/combat.png","mimeType":"image/png","sha256":"d253d25b615b31dbdc14b9b85a6873732fbe7f5595624a6a1f67db8e1c373833","bytes":794440},{"id":"file.characters.albina.endgame.png","kind":"image","path":"characters/albina/endgame.png","mimeType":"image/png","sha256":"10ba1187d40b50910ff2183f83812dff890885b47d27d64d96fcd719b603e92a","bytes":886696},{"id":"file.characters.albina.fascia.open.png","kind":"image","path":"characters/albina/fascia-open.png","mimeType":"image/png","sha256":"794865a3149891f0562df93cf61e3671f6793283949a6cdeec60f299cf0a8c4a","bytes":226988},{"id":"file.characters.albina.furious.png","kind":"image","path":"characters/albina/furious.png","mimeType":"image/png","sha256":"6ad513b39c743c1c1d7230aa86f76d2cf1d5f2b0d5c0b9a75acacb9e03b2a7d3","bytes":430213},{"id":"file.characters.albina.golden.bough.png","kind":"image","path":"characters/albina/golden-bough.png","mimeType":"image/png","sha256":"7b96b2ec44022a3b8a86b2480e25bd01eb5ac32218e63382373e97c273baf831","bytes":731292},{"id":"file.characters.albina.maestro.png","kind":"image","path":"characters/albina/maestro.png","mimeType":"image/png","sha256":"b148b529b7fab01184fcfa54c8b80fa9a48fcc7723fc3498bd58e504015ea0ea","bytes":434686},{"id":"file.characters.albina.normal.png","kind":"image","path":"characters/albina/normal.png","mimeType":"image/png","sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","bytes":647858},{"id":"file.characters.albina.rain.png","kind":"image","path":"characters/albina/rain.png","mimeType":"image/png","sha256":"a2b3fd27325ace3c20e92c441900e338b027f7cdcdb603c12dc92924e0175f06","bytes":649497},{"id":"file.characters.albina.ring.conspiracy.png","kind":"image","path":"characters/albina/ring-conspiracy.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.shy.png","kind":"image","path":"characters/albina/shy.png","mimeType":"image/png","sha256":"928100cc984332c9b4f769cc38dba965425a91cc1aece23e9d384fc993509247","bytes":649383},{"id":"file.characters.albina.surgical.png","kind":"image","path":"characters/albina/surgical.png","mimeType":"image/png","sha256":"b01318b4e4677e4d6e4de6aad53149717364d36a0d66b56425100e31a6547897","bytes":360435},{"id":"file.characters.albina.white.canvas.png","kind":"image","path":"characters/albina/white-canvas.png","mimeType":"image/png","sha256":"cbf1f679143b6ed9ceee9a12ce5bab2ce571e09cbade31b9ae673d0e6479f3aa","bytes":360278},{"id":"file.characters.callisto.normal.png","kind":"image","path":"characters/callisto/normal.png","mimeType":"image/png","sha256":"7c9c806f2a9517c65648b085ec22d1b93d47effdab3d8be91d2f368c7e6039fd","bytes":377258},{"id":"file.characters.dante.normal.png","kind":"image","path":"characters/dante/normal.png","mimeType":"image/png","sha256":"1db98bd0ed89ce5d66c175a525907c6bee207fbe61a4bb118e41a141a2613603","bytes":788630},{"id":"file.characters.faust.normal.png","kind":"image","path":"characters/faust/normal.png","mimeType":"image/png","sha256":"9e5839384ac0d57d445d14301a38abdc357a28f33d8c345255c49b2f4fb9f5c7","bytes":919963},{"id":"file.characters.golden.apparition.normal.png","kind":"image","path":"characters/golden_apparition/normal.png","mimeType":"image/png","sha256":"fc90202b6b36e901fe0e75e9e2bcb9e07dc13ef32dc97083a01a4703c6ba9faf","bytes":633415},{"id":"file.characters.lce.doctor.normal.png","kind":"image","path":"characters/lce_doctor/normal.png","mimeType":"image/png","sha256":"938fdd640295fdd9c5d98e225696137f48667b140f2649961d6a504976b011f9","bytes":597985},{"id":"file.characters.protagonist.battle.png","kind":"image","path":"characters/protagonist/battle.png","mimeType":"image/png","sha256":"a436e968a646e580f9e6fca88ca9e82615f1a8a05cf68e1c494afe05a594d09f","bytes":656294},{"id":"file.characters.protagonist.resolve.png","kind":"image","path":"characters/protagonist/resolve.png","mimeType":"image/png","sha256":"f084da28bd5b55273519eab6c230bc580e069f7f302cff85d333f43f833684f3","bytes":765412},{"id":"file.characters.protagonist.serious.png","kind":"image","path":"characters/protagonist/serious.png","mimeType":"image/png","sha256":"d9fff4f95ed8513b464cd32be5735ec1a3d2b10e581c24a8232ab9a78f81a538","bytes":612296},{"id":"file.characters.protagonist.shadow.png","kind":"image","path":"characters/protagonist/shadow.png","mimeType":"image/png","sha256":"47579ad18953940ceaf00122676a79d3f8618a0057cc1f1f740535df4644a04e","bytes":679619},{"id":"file.characters.protagonist.tender.png","kind":"image","path":"characters/protagonist/tender.png","mimeType":"image/png","sha256":"1e99e5724db77e7fc536d433980519121cc43740bfc17b4f810444a2681fb214","bytes":693086},{"id":"file.characters.protagonist.wet.hair.png","kind":"image","path":"characters/protagonist/wet-hair.png","mimeType":"image/png","sha256":"ef02c60087130fba338bd9757c5ea9f045435e60d658450890c6ab5d50699dd5","bytes":702889},{"id":"file.characters.ren.normal.png","kind":"image","path":"characters/ren/normal.png","mimeType":"image/png","sha256":"0bd7caac7ae057da27bf86378d17b24ee43a48b958713ece4f8fbf6a79cba6b6","bytes":793467},{"id":"file.characters.ring.agent.normal.png","kind":"image","path":"characters/ring_agent/normal.png","mimeType":"image/png","sha256":"71536876e4949ff36037d647f05727bf39bb6bf843b186757aacfcc95bcfe07e","bytes":581593},{"id":"file.characters.vergilius.normal.png","kind":"image","path":"characters/vergilius/normal.png","mimeType":"image/png","sha256":"a952f7b8042794613c6fdfe7c6e58d7675d06c9c5653ac837247c94b3ab01135","bytes":886285},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"file.video.animated.desktop.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"file.video.animated.desktop.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"file.video.animated.desktop.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"file.video.animated.desktop.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"file.video.animated.desktop.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"file.video.animated.desktop.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"file.video.animated.desktop.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"file.video.animated.desktop.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"file.video.animated.desktop.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"file.video.animated.desktop.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"file.video.animated.desktop.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"file.video.animated.desktop.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"file.video.animated.desktop.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"file.video.animated.desktop.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"file.video.animated.desktop.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"file.video.animated.desktop.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"file.video.animated.runtime.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"file.video.animated.runtime.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"file.video.animated.runtime.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"file.video.animated.runtime.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"file.video.animated.runtime.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"file.video.animated.runtime.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"file.video.animated.runtime.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"file.video.animated.runtime.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"file.video.animated.runtime.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"file.video.animated.runtime.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"file.video.animated.runtime.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"file.video.animated.runtime.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"file.video.animated.runtime.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"file.video.animated.runtime.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"file.video.animated.runtime.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"file.video.animated.runtime.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"video.animated.desktop.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"video.animated.desktop.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"video.animated.desktop.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"video.animated.desktop.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"video.animated.desktop.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"video.animated.desktop.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"video.animated.desktop.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"video.animated.desktop.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"video.animated.desktop.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"video.animated.desktop.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"video.animated.desktop.ring_conspiracy_ending_true","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"video.animated.desktop.ring_conspiracy_scene_11","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"video.animated.desktop.ring_conspiracy_scene_15","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"video.animated.desktop.ring_conspiracy_scene_3","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"video.animated.desktop.ring_conspiracy_scene_5","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"video.animated.desktop.ring_conspiracy_scene_8","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"video.animated.desktop.white_canvas_ending_bad","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"video.animated.desktop.white_canvas_ending_normal","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"video.animated.desktop.white_canvas_ending_true","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"video.animated.desktop.white_canvas_scene_11","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"video.animated.desktop.white_canvas_scene_15","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"video.animated.desktop.white_canvas_scene_3","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"video.animated.desktop.white_canvas_scene_5","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"video.animated.desktop.white_canvas_scene_8","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"video.animated.runtime.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"video.animated.runtime.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"video.animated.runtime.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"video.animated.runtime.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"video.animated.runtime.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"video.animated.runtime.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"video.animated.runtime.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"video.animated.runtime.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"video.animated.runtime.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"video.animated.runtime.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"video.animated.runtime.ring_conspiracy_ending_true","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"video.animated.runtime.ring_conspiracy_scene_11","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"video.animated.runtime.ring_conspiracy_scene_15","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"video.animated.runtime.ring_conspiracy_scene_3","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"video.animated.runtime.ring_conspiracy_scene_5","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"video.animated.runtime.ring_conspiracy_scene_8","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"video.animated.runtime.white_canvas_ending_bad","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"video.animated.runtime.white_canvas_ending_normal","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"video.animated.runtime.white_canvas_ending_true","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"video.animated.runtime.white_canvas_scene_11","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"video.animated.runtime.white_canvas_scene_15","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"video.animated.runtime.white_canvas_scene_3","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"video.animated.runtime.white_canvas_scene_5","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"video.animated.runtime.white_canvas_scene_8","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"voice.result.canon_recap_continue_9_18","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_18.mp3","mimeType":"audio/mpeg","sha256":"5e02d8a955ef36c182bd2293307fec531e24e153d58994cb34a2b68a8b34ae73","bytes":97907,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"d59b2417793c3d7a75475909211b58f363efafec20c6d06a5c19c970e85df734","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:33.724Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5bd638fcbf28075b747c0e80876cce550b19ef0940e3e144cefe01c49906c817","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_37","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37.mp3","mimeType":"audio/mpeg","sha256":"ef041d6a2aaf372b440caad96e3f34bb2191ec52acef42d2e42186de67303304","bytes":102515,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"82b878dd3c284b1ebc599d775f1dbb074983d971551bdcca0d86efb3405569f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:38.907Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"bd8d5647773be2698ca9eb3fa5d82bc4015feb661597d8d7e1d75b7347f9edc6","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_37_battle","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"86a766b774def49b6ded10b24608646f954866fdefa589f72d99f7fe3d29d102","bytes":76595,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"37ea19fb902336b0c4d96a263f91162b7e686f4335f1a5a51f3d9b16a610df65","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:46.814Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"910f33bc6df9539dfceab2db2f8b0043eaf3482bbdd0ab2c83e7b3a3119397f8","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_43","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_43.mp3","mimeType":"audio/mpeg","sha256":"a20ac9b480763a7e9ec332d7954e226947884f56bae8d39cd3409f77e66b234f","bytes":168179,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"f857162cf38ec26f169c23afd11308521f23630e7db9557ea87fcea622929b34","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:52.681Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"af9ee1264b3937ef4f0c0f2de55c861177000138757bc2691db200f384360e5b","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_albina_fascia","kind":"audio","path":"audio/voice/result/canon_recap_continue_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"a329c02dcac7c7c700b02e8cd20ae50b7e9f5cf992542b9396c3773c169240c3","bytes":73715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"7b43dcd6f0d29fc39ee5a4f0f463eeb3ee4f237883dfa507b2e13ea09d6489f6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:55.359Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5be9c86a564959a6bdca015504f72c2b25563e747fa8748c9598f3cf29c9d6fb","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_enter_AU","kind":"audio","path":"audio/voice/result/canon_recap_enter_AU.mp3","mimeType":"audio/mpeg","sha256":"e5456be94fcf623863ffcd78173c6f9841ade86d30ce54aeec82966aabdae179","bytes":135347,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"a17833fd6252e9c3daefbe17a1e5fceadd861037d3c35df77c93481c062fed5e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:57:04.066Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a94d66af5e27fe3f7f9c39bb34f4695d68752d456dd1b53727ab6279b13edddb","role":"pie-speech-api-output"}]}},{"id":"voice.result.conspiracy_005_let_her_answer","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"c3eeb96169e86d6d32bd24fcc1716f1b4b6169c24241a4a3785ad6e35bd0499b","bytes":321395,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"05da30b1f408abe988a03c1b859ad87ed8697a9588dfd0a01063074bca08695a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:50.999Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_005_refuse_duo","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"2188bc6032b768b6711d3163bdb45adbe7deec31d451ce74cf2b6af85785d93c","bytes":334643,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9ff57569b4ca94c725c68e3f3802c12fcb574f39995ccd8f9227aff0e8184a1e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:51.496Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_006_block_view","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"a3b7b7a240d59c2516983757140ded9382f6f71e6c5f74b94af8d4ce8110502e","bytes":429107,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"72c9ee2ef2f9f918974957617c7356702c64152881d240a27c8bfa4f773bad5e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:52.095Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_006_stand_with_her","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"d162f239d7d33996b43d4c9d2d517bff741e93b46293fcc55a00bfb778166ff9","bytes":444659,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4fd14203fd6a19ea74f32228474c4b515167af36aeb9ee411a1bdeb863457a68","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:52.779Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_007_break_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"1f3a9e8bd205a0e3fb7c9e3cac83e2f286036b393413ccf5fa9d9797e3e17b6e","bytes":346739,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e2b9d6fa175494cd0597fa41dcf4c8c12fd4b2762594d715189dae3a87e4c4ae","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:53.286Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_007_seize_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"cdacc6deea4032e1a6b3889c6e989a772db86ca71a4343e45235bbd132cbbaf2","bytes":402035,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"27d3ea76a5cac57a2a7ef610e0a326f04d0648260ac16c641decab547a66ed27","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:53.806Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_008_hand_pen_to_her","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"20aa52feaa8fdba93ea122e4264a5eb06266a253371186bcb28cd255427c0cdb","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"825e743cb275a4dbdc3c5f6272a0f9d6dd61f53e6f869ca11597b2681e6e5bc0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:54.308Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_008_refuse_testimony","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"5e39100ad58ff26de7201dc277ecc8a8f050f8fe377f891cada6bc4eca38dcb4","bytes":339827,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"62706d3b23d90aa75b04522ae440512160303b762c7f1df9d0947dcdb9936c5c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:54.818Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_009_choose_present","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"47fd587851224f61df1079bb5334dcccee2e87291913900762adea0939e83adb","bytes":426227,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f7d48667da043b0728f1c32838adfb9ffcbed5b08b4ff6015bb55eea52a31dec","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:55.370Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_009_refuse_choice","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"579736096170a0afb00017791b093021e59651844116fa3b46fcd527896ade75","bytes":453299,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f2772e0340d7dbf631599fa8bdf3c1e44a73673edfa1e901eab38c85f4179aec","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:55.994Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_010_keep_badge_unworn","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"451f67bf64c927ab02b685fd2eb24983cca5fa46d14a55371b211bc29b97d0fc","bytes":392243,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b1a83261b9aafae8ed64a87fe4a51de94344c3fc2b7e12cdb232d7a69ee41931","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:56.646Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_010_throw_badge","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"317363feb895846841f2512ebd4680be547ea512c07b7290ecc09f53bf2284d5","bytes":387635,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d1965b3d47f884633db07e4d10267cd468a09b9dcd1d7f1c846250ae33714683","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:57.225Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_011_burn_film","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"a6264c49431dbde54ff1eaa4d8d3a7011fc931b07ff3d1fd020388c8ba4cb79c","bytes":361715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0a070e89dcb6d3d102a574758dcc8d2ad6cfcc5b96d1383b93b43c576e7cd317","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:57.812Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_011_rewrite_ending","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"af9b903ff26fae14e50a4640b1fe6d591b5003cb8a340756d3061aeea4e0ced0","bytes":355379,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1547b49938754c17b2d46be91f86df84b0dacaf88b8c3ddbd47f31485011468d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:58.435Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_012_end_tonight","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"baef1eca98936b80447bce403bebcc1cdc8793ee1204f36275c34f358c06fb6a","bytes":411251,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"867f8c62a64aec663f009434dc8708aa98604408ce59852969b4b3f67b0bd3c8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:59.215Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_012_keep_blade","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"f7132cd47552bc59b54ad3c7b73d1640f3fb2f215e9f315ab3b4251afd77a7ff","bytes":404339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"00c2934ce4763d5f84bddbce0a6c5d0601fb127879aa37090f53d8447cfd85c8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:59.820Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_013_hold_one_second","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"e6647cb10fc82ee28ff451331a5ba9a1dba9b63459c65c962e1cef19c1bc11d0","bytes":373811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"82140fe3165784405100186f61b737e15b739b2cb63a65881572420822d9c62b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:00.447Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_013_return_gently","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"0e850f0e57d302c364b6bfe21980b42dee124a283e4a66ef12bd1339b0f2682f","bytes":398003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b76eab4fd4792cf146e8af71b56af6548b30bcf3b3b124f1453d7b4b32491b51","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:01.069Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_014_erase_from_catalog","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"0d32f303e7302bca81e8f9a74e3aec0cf46b23bf71427f7f0211deeb029afe37","bytes":420467,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"96200e5440714325de131712dcd2a8b67817a351c84075825e484d61fac39cd3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:01.666Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_014_keep_one_line","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"6c8bb01ee8faf99dca4cb097731a5c741735c223510416f7d98135c323d23f6f","bytes":429683,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"079a55c5e09667c10c5fbc75e2fd64f7b734e6d09107afef232ed6da44a97d58","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:02.242Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_accept","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"fca5933a9b7940e9e70ab2bc2d5f3bb2d5c1831e231e002d5e81d2d70187c8b9","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3d95ecf44332541aa2bebf6ee24bbe3c54f7a4e6d658780d4c4159110ef01050","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:02.831Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_break_pursuit_frame","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"80b95c0329a2ffd9463183d39c56d1a3c0c1be97857807307076441da7d1355d","bytes":354227,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e0c2f51cc13d9011eede0dc2acb29c45e8e0defbe6307cdced0a530229d14950","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:03.457Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_escape_to_backstreets","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"529885d362546fee041fb9daee874070b414eacfbaa0f0b0e202eec1f8848847","bytes":391667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4c13cdc061b4c19834479e9d64b936cc6c01d8fac8b3e265888334a79e1eee68","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:03.994Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_feed_false_signature","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"c8891dea18a2427f9c866fc45da8a392922ed1a4a29fb6adf9820661e38875f8","bytes":357107,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d31b6abbee62b71cdc7342f0bd1f2abd593bda0942b455306b4a75fe910e5e31","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:04.505Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_pressure","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"3af0fae827f9ab4202ed89aafca164c7bbd4f9cc3a3adea4a6c5df0fd15f9411","bytes":310451,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"8cc9fbbf26dd9b7d764387336446b0c3d0e7d4f34df2f3478ad4402dd05d747a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:04.999Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","role":"validated-pie-speech-output"}]}},{"id":"voice.result.enter_conspiracy","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"24ced6cd96816578da6dfa13fcf83514876c5562cdb6f8e09b1c32b4bcb11c7b","bytes":204467,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"a340dbacf3ebc505642763e1b68390e9d8cb3084ebcdc313bf46b48df200ab99","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:58:06.991Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"48be24d76494d0f1512af6b595a8dc783f1182f594a9dc279b23e9572909cb8f","role":"pie-speech-api-output"}]}},{"id":"voice.result.enter_rebuild","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"bd654ac516dd06f38f235bdf52260e578ce0a7655ed1111525deaa6e58e44a82","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"9ad6080cfa7a57f7225fb36916051a03537f64bf893c0600ef4e9efa81b4390a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:19.502Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"cfa718729334a837890eaed97a4c1dd4b674fa38d598f6536696efcbc2d10f16","role":"pie-speech-api-output"}]}},{"id":"voice.result.enter_white_canvas","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"e8ab325da6c8a12608d75df2bda071b88bb6ff7acf5e1572d9071ea6d8038b8c","bytes":145715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"d51bf59551c599dda87f22f00b00d32761621e56162e145f68cc96a0853217f1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:29.227Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"78269a83ccda24be11ecb5c1ebd6092c570747da39d74a18622ecb38b46d4e1f","role":"pie-speech-api-output"}]}},{"id":"voice.result.golden_bough_rebuild.bad_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"99044fbcd083fd583946b6883e5b9098fc9c681c04319fb140fdde443f8ed226","bytes":166451,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3c9aa98199d38099d44cf7b204cae777e4bfe56b6f6c0f78cdf761b58d47a294","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:05.343Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_rebuild.normal_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"555ba1fc500a42fc45cddbb0faa5230b5368741bc1d5e78412c002eb1ba786d9","bytes":165299,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"494bbfc3f76d792377aa59c1ec126418bb7bd9aec2860192a6b6f9ca8b8336ee","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:05.668Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_rebuild.true_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"2cefdaae2ccccd65e997733ccc076bab546212ccd50a7ceaab6b6e07f2bf4b24","bytes":154931,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a4344581ecaf8271e2e7166934449e770aaa28663b5b4556e118f7c2af31bf9b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:06.008Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_route_complete","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"1833aef2d3549425edf9702212a3dc74c91a2cbda14cb736da529cece809b327","bytes":491315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"71c497ece200e168dc2b4757b25da3461a49deccde1ed3fcdd794cf1e513c5fb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:06.736Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_route_final","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ee88fbcd046d6a69a5fde950904bb78bb78ac8590de0464d4bd9759e19ae5fa6","bytes":208499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0ab0d6ce09012765ab6201775321628d03c2055884166a388220847a0b3c8d16","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:07.152Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_006_keep_silent_anchor","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"212f4fb4d012df83e4ed3b002061b0ac8a6eba70df48e94c1cd3d4c583045174","bytes":396851,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"50da4b0037a394dcf36cf29fe27fec8a10a5d72ceb2440fad7515054f1b6b062","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:07.749Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_006_read_aloud","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"94cbc15ffad0d60de661ad72f8f46068442a75679d48014e17805f34c0c7b975","bytes":398003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"397931ba98e29f075c25aa8e8d3f5650d6fa5aa0539de2fc442f588773878f4e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:08.406Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_007_match_her_pulse","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"596b9c870c33cf5251c74a86de0b633a13fd58220e38d4e68f4e190e74fab424","bytes":438323,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"70e182c15d2c985147b1c9c3e51b389ed210917c6f9c7f87e58484ba71f7d794","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:09.037Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_007_stay_own_rhythm","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"87aec6c173a73614256d9ff98e2598dbec41e0e0d850b9fbcc59efa75f35b4b4","bytes":450995,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9767aab6b5811639cebce5f63907934bac559b281fd23f0c3d36260d84160959","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:09.637Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_008_protect_current_self","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"304ca21879c6515cfe594282032b1811fb0957dc5803f21b63c001770df3fd5d","bytes":405491,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6d00c8d2fe0042d206fba9c0fc98f7a58121c1fc7d5e5b0a91dd8dbb7d3866e8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:10.193Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_008_trade_old_memory","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"9ddad23ff662681ba22e7e3c0a569ce229853bdf73c03cd752b4c697bd79ac21","bytes":401459,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f72de26d73c073ec876653b2b71c303cd15bfe9291f9f5b53f9d4c636a5f42fa","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:10.799Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_009_hand_question_back","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"9cbf99b9553ac93f17ffa5b3179f47bb3667ee0729cef49e411c1d3db2a1cd13","bytes":400307,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f63489749d5cee3c0d61a30418032a862072278ce96f759b2a235a461f49f395","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:11.464Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_009_refuse_perfect_copy","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"f73bf969c5b85ea064c9c6c43ee7780f6f83c579eae92674a94f5dde32232348","bytes":393971,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ff8b0c035efcf8dad519f587977f819742d56495e07a991c444f903b8a93a5cb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:12.110Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_010_ask_her_choice","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"c74066ee553419d3bf9ee597a4f851bd2fb5938b5a555af427292eecadf454f1","bytes":335795,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"facde4f43785a68c1460fea3aeca8e241e0329a95720b2d7c97459febe85f22d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:12.635Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_010_veto_sealing","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"1832293d354bb2b22f61a4a66504f3114df3752012423cf14866e59929c6dc9b","bytes":343283,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cf63f2426787002f21c670558c9b2f327c801780dc03c4326e8ba368f374448f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:13.233Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_011_ask_next_revision","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"07d1e7d28a4ef027c305d085a2bb06525a63e8f66d563abbcc96faaaf06606c3","bytes":433715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"91a2bbdf26623a3c3cd75924e88b06c6c5d4b49a3f57f5230e183bcaa3560768","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:13.977Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_011_sit_beside","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"7dc8a32f43d98ae9902fe48573d34552259baff4c692ffb65d2deea5df6dfb98","bytes":430259,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"daa3e652312f53da54b22655db9f00e2a7b17e35b01800e3582f0fb3e10121e2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:14.580Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_012_break_contract","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"1c8c41c15241d865afd824a846acc0cf0ab205f26696e0e7c85be5299607b345","bytes":372083,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"12715c5610a920b4abbce22fe8b5546db99b8e9246d17c67367950acbeace978","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:15.139Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_012_negotiate_terms","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"12dd9f48b173bbf8fb3e92086a05bc9e9cb28099547345f88931e680e804b033","bytes":398579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d9817bb3b5c88586e4816b62f8ac52da5376f5f00c005b0c90be74a48abf0691","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:15.758Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_013_offer_witness","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"e86589de87474e4a6f8d57062df9f43650fc3a154618f5778d52c5e9ffcf4dc4","bytes":374963,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"498eceb78b3761573b3f6146ec01bb72bf61995fe5a297e47ff6f923036b40b1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:16.395Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_013_promise_name","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"1cfe997ea1a9204419bba1848681231d5351da60b5259246858533ba814d93ff","bytes":376115,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e5497aedfeea4c9449acdcd2a7607ed693b1cffee17c6612adac07a2240de399","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:17.056Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_014_ask_when_to_light","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"b81315d3ae6125ade7203449a21784899d0ccf28126b576feaf319dc80de2f69","bytes":423923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"750be1494bb5d4967816db2a878deddf724cdb7b3ce5c91854443e886f363bd8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:17.681Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_014_keep_unlit","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"fb826259dff130419016dbbe3720b59b7326c454fcbf7479dd9b8fc6a93fa2aa","bytes":433715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"495d4b12faf4449bbf4fc5752b8c2f576e408b94b280c40c51f4dfedc3e54a61","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:18.336Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_accept_missing_pieces","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"025ab49988979a6e3e8f9cb317f22442a0713b06c30db883126a0a3162e650a9","bytes":361715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cadc67b7f9ec94fc33a12697447e4a829f1c7e1b749349da72eab3b988b4ca63","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:18.894Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_anchor","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"65d32bf4c0b1141ea6ae80963cdf550162b5896279d98ac6e2cccd40bfaa63e1","bytes":236723,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"5058370432d4db499974c23da71f77008581b73409c2fc95a6fce8c8ae4b3380","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:19.313Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_cut_false_completion","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"0b7ebcceeaa3fcd9939421b7aee1b5fb6d7c9d14a4ca98dd7435ef1f29205120","bytes":367475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a4ac6e57ada6b17838c9d177af1a6ed22f2b832724fd38ef3a1615f1165bfba1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:19.949Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_guard_fascia_pulse","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"f11f541a1544a54ba6d13f6adb0d93344ab451bd099d2005a5ac8c3a8cfe6369","bytes":389363,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"df42cb1ad7931603b5bd0cfe411166767c59fbeb3761fb3e019337fba982e582","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:20.649Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_push_into_raid","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"68acf768a66dd60d6ad996e4a06a57ef2755b9787f90f32d4f572b6d8c2426e0","bytes":406643,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9da0c2c2bc54f63d2895b36ba4b3f041398e90325452485da93ad3352b7c2fc6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:21.235Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_question_fascia","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"d49e2703fac28f03e412f0001ad711a642ae86bd88b37ca116d4c392f03099bb","bytes":228083,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"63811040ce2cbef8b394a6443438f8f48724ef785b0ae11d726f52822e447a20","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:21.618Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_use_rooftop_signal","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"ab251367e6459f692c3477dcd584be69f0f3c43ea3912d22748e065d36987151","bytes":352499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"8254bcb6688fe8c3ee6c6fef17ae80d3802c96a5c2f573d5ed6fafac87c181af","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:22.191Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","role":"validated-pie-speech-output"}]}},{"id":"voice.result.return_opening_from_rebuild","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"4fb14344c5e70dfd1bc4f6b3ef069c4ad64cf34f491992513f836ee3cc93ce90","bytes":289715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"0230514fc5139bc211ca3e76b7b50c139f6969ef163da749089053b9b7159dd2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:33.306Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a553b659381de186e0ee91bb10171e295ea20a9ab454dbc04eba57cdcbcfb393","role":"pie-speech-api-output"}]}},{"id":"voice.result.return_opening_from_ring","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"9157a6a67aeac5fab63aab484d8a5fb2fe3a3352e3f50dc20b77351d1248eccb","bytes":278771,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"0e2bd000725bf7cc7935f31338d8ccf3ad05b15f0fbcef1926129ba5c2995625","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:43.353Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"de7e51083a36599bb71f4ad08aed1a308ee241955f6b2bccf6216fc7b90c1e2b","role":"pie-speech-api-output"}]}},{"id":"voice.result.return_opening_from_white","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"a0e41b784a562c97daa29e6174c6d10a22ff9161e15af5fb15b80ba1992b76eb","bytes":301811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"5d5410b3caa80cc3470c29ec9d90e5a4f013506eb82f0728230e172bb36c1b36","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:52.028Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"577a06c85009625e4bdc3f90128661718291bd8287dc314ea9504b2bf7e17f91","role":"pie-speech-api-output"}]}},{"id":"voice.result.ring_conspiracy_route_complete","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e13a967ca990933a69a93dcd78c122a5119f1c4d7d8f7e8c50ec15bae74d3b00","bytes":419891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d4ba1bce5dae907010eada233ad372926eb7c6d2ad5d2bd2edc614d91f706e08","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:22.776Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy_route_final","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"472ea9d9842371171504444bf5341c93c318c1998d2e81ea34833e020a8ee208","bytes":232115,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e05417c6fb659f8dec8002d85afcf15870e4501761804f9f113b71f093de7587","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.204Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.bad_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"f613f8e6d2453ec2827bb0acd07911ea84e7ef59edca47f378b7d76c0ce2c240","bytes":151475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"326fb3303d302e2a519e9a4572f3cb6d513f9877f659fbb9bf9eae871252c2b6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.551Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.normal_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"33bfedb7ada3a4bb3134f0eea06241ff6ac26a45c289d0a7261ee66b7ab9bca6","bytes":187763,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c733ee6d849e46a1eb6d2c55ef0011dea61265a6234c638b3f407333e3a2cb53","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.967Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.true_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"fec30778f7f3ce3c3d76b6bf7028e7aa6ff5529e421e33a4494f67acb10205ea","bytes":167027,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0825fc284bda393fd1319d9f79da6dceb8ee14d1d4f9a15d10d246dd3ac24f85","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:24.376Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_006_name_silence","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"052bdd2c9ad58dc357d4a8e2efa1c775e719bfa0df5cc6a5b7ac5b5f2af548f9","bytes":418739,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ef8af18ff8b5fd3e7d0683394bf8720ad32da1f487b3de6580de8cc498759b23","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:25.026Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_006_refuse_naming","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"ddd59afe994de4a252c61a3803bbd0c63997304b9e6df37447b59e9b965017ca","bytes":425075,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c69a302c0ec4ce3efbc94185c65e98ad1936c3c5cdda227bd9d1efff5433bc96","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:25.676Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_007_ask_fascia_term","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"6bf8213e512ae808e04046fa39600bed3a1b59e7ce91dcbb902bb0b1fb666992","bytes":426803,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"60bbc7ecac62c5db72e483ff5657ef6cafbc2c8f71cee66c7322a07f80f702cc","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:26.316Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_007_keep_mirror_open","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"33a99a192d13ca70613e200a261e7b33659be9ae2b5d4efe34efa334d75d3e05","bytes":398579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"dbbef1a7f1cb9c49602bebfa8e535b523ba1406845611c2b22cd19eb151ffdb4","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:26.916Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_008_hold_fascia","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"41c2e3016510dd00c492632d8189788d79fc6e54b3383550412f1e057f071bfb","bytes":332339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0cc1384b75daebd7d68f11cee5974eb3f488ac250457c40e8353e553c94e0982","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:27.574Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_008_stay_witness_only","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"c6c37b0dae21ed498ef7c5c7671ed8429861fd5027ed8de840f27fa65c1d49b2","bytes":354803,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b9bc5d5844db20e8f622cf1d2dbedbbe00581c9dcf92859103c6d6d3e85866ff","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:28.206Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_009_keep_half_step","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"eb273061a887f8ea4796b2804cde9e109aed783bc88853b2592e3f4ced0e241e","bytes":374387,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"af68caf1ab696236f7c77808519845396728c3e02c58e7f634d8721132a757eb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:28.765Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_009_share_umbrella_edge","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"a4f1748e8858f3adf850f0b3c2c6b38e65fe9b23edd557966889b071f0b09c9b","bytes":323123,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c130f724c6383773363fe3e9247eaf8ffe274e7e114ec50ba6691eb4e698c3ae","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:29.304Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_010_acknowledge_leave","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"6eb65fdccaf7e057ad12905510492926701ea449996d3c5697d56729dd8e1705","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1ee9b18006f79a84152c275b47faeca493b046a58fa749c52f9e1188d0118796","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:29.879Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_010_offer_return_ticket","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"45594596a7c3fc007652bef42743925bb65a7615f873cad61d3429386b6eff4e","bytes":361139,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9b98c35ec50ef4f0b5e02ea2d948bef841309f5f2a2379c0c48afe500f0c173d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:30.431Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_011_curtain_call","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"42179eea6ade8f967fd3ed425a108fe78172750b55804d3fdf6ed6a57ab1d5df","bytes":384179,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3433690c28a888e3e3b11006ac79fb66bafb873cd36cf978dd26aa008e4cf772","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:31.001Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_011_walk_beside","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"5364cd974fd319a09968ea5dd8d47bacb304bc918dc1a8180d9b905bfec6d4e3","bytes":391667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"55cf6176bd61869a0ce31f9dcb73655f7f1f47a97ed93d883fb1d45c361a12bf","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:31.596Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_012_let_her_decide","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"8d92faf82d8e23de74356dea4233451838b0cf1ee0a41ab884f8407fc2ecb97d","bytes":364019,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d215db86e72780c1ff375940ffbd3791e787abe30ffbfc6740cff502a6d6114c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:32.188Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_012_refuse_exhibit","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"f13e7e5ddde629cffe4e022558da710927c6a9ea98b21b938cfa47c06fda6b65","bytes":346163,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"77b1970f13024e4466a24468ea9eaae71a5ff90b44ddd1a10a4f90deff1ca324","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:32.766Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_013_point_to_mirror","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"adf910758dc7147da909d2c11f12d49cb04fe05dc10095c915dabb83e4d5e490","bytes":417011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"7009f4717fc146ab389e923e75e2378a0d1441206bf2f444a393e84062dd7bc9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:33.429Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_013_refuse_to_choose","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"b3aa0c454052fd8f5dd1981af5510d3acd0aa9b23d1d3c82e0407b59b4fada8f","bytes":419891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"740ff09ab797313389f30e70ad9bdc482782fc34c2f04ef57216744a1885cb40","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:34.016Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_014_keep_base_color","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"e5abbde8433953db9427ab67392fc60bb77aabd16ed2f507d6c40d323701476f","bytes":403763,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1dda2c83c9b715dc7a36cf4d8a3e3531feb1ecc91690e81d72397c53a47334f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:34.684Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_014_offer_restart","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7b0a0fca1de3ae894ac6455f61354b0004fc7a4ae669990f3eb17c26c6cd6a5c","bytes":438899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"2e9b0b5b8c1813c9bd605a49d24f15dbc2bef3d34ee4bed91bcbfb9ab0e49655","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:35.418Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas_route_complete","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"94f66d44430484558772b9203ee1050accb21fa9f21110a8b3664cc8e0237896","bytes":430259,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"eee6217554ee15ceea2d7b0b4f00c00d9fa862a256ce786f9d9e7f4b47c65b8d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.027Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas_route_final","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"8e5228040c26e7c73ad64f14c4193f27b6aa73dd95460494258f47ccfbb83aba","bytes":230387,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"83b7ef1e9e08500f66d1576b4651775a4cbfa3265f494c1c18421a98ae352e74","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.425Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.bad_ending","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"c689384a6b62ca60bd84391fcecb3abf36158a295d70a0213079969f28f70def","bytes":164147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d5d529f590fd59f1b0f025fa9a886bbb44edea472fa60682ebbfb354dc7331df","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.766Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.normal_ending","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"0ea2a3bb0d492de34026165ff824b572dde9aa0561ecb32ac1df0c3d037fa217","bytes":151475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3e31b96fe817530da6ef09c6641fd9594613f0bf99fd0fb829c1e132af928e58","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:37.107Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.true_ending","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"82c737637b2243b9be6ffb7dc45883f143773bae425420ec730e03c8510f32c4","bytes":150323,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"08303dcac821691fe2c1d28f2ec84b4d1aa3ed6bf1462a24a3a7b558f692f31c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:37.440Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_follow_to_lab","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"40e6d43999da61bda9da83fd878956a088de4cb25b6cc0d99be4b8214810351f","bytes":401459,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"14458af56bd3123b9cd3f11669256d7a22cae7fdf162c02d20901619ccb34d4f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:38.013Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_interrupt_lab_terms","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"dc0db8f0f34333e77b1186156c828aa59e1d510caa95aa0e97610a5065add968","bytes":364595,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d27224267bd6803ee94d880ffc2a437c725fc3efcb2b3af5ee5d3e32d3ce7726","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:38.575Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_keep_empty_seat","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8a76f675d5ea394277777e38529d1862f21dd62a5b2685da635ed0527df7e052","bytes":395699,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d0ce8b649faa4958ec85553a4ce355f9331e839f822484a3eaa8e24f88e62042","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:39.217Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_share_rain_window","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"20335d2fc8cfaef91400201f56bd1be36b2d9ea44402037c73bf06dd31af4b3a","bytes":378419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"5ad3aa48216b7dc7925d75c51439d87a99ae61a7b46160513bc215405c4e5948","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:39.824Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_sign_witness_protocol","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"e7636aa5a1ef0e083f6b8d3ef998b1c370cf1c529a2f37d0e89594b37f956400","bytes":345011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"56142600de1c32a9afe3cba636e9ca50bdcca52e861f10c4add5ba8b89a61e1b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:40.447Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_tease_back","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"1f65a84e40a1502a6fe8e2ee76133eaacd13e6673a4abd42b573750db8e155db","bytes":309875,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d159a9603f7a7582e9762cbeec896c6754df1823085df0619048c83282313efa","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:40.993Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_touch_boundary","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"367db6cdbaa418ed281c5d5e32d56c6fb59c82f8ac911913ecd1be2b6f7938ad","bytes":321971,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"42065c9ccacea71646dccbdb21fa65e678b161de7f7bfa18d593f38aac9ae7bf","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:41.497Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.canon_recap_9_14","kind":"audio","path":"audio/voice/scene/canon_recap_9_14.mp3","mimeType":"audio/mpeg","sha256":"177b6bb8d06c753e852f15f15053ee009e752c2d6b6e60cf5b9529808378539e","bytes":563315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"69cb56049d6e879e2d412d9376a6e5030a8f9302d5be7c72b7d3c6070ebf7791","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:39.428Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"c76f1dcdb5de2c1fd622ca980a25cf14395bccf00d1a897ad19123389ecac100","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_18","kind":"audio","path":"audio/voice/scene/canon_recap_9_18.mp3","mimeType":"audio/mpeg","sha256":"92d1bdda2e7c3a93bf3b4e2a68a424bf85d10949df29e99f57f026710c83a10c","bytes":839219,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"b1206c85c6846079b1ce0c3b47a6d63984bb23c7a1480c04e7e42a22c3de8ca6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:47.186Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5fd4987e9c25727521f51e2bf27df5982d59de85277b74df9d97e9f724e51bd5","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_37","kind":"audio","path":"audio/voice/scene/canon_recap_9_37.mp3","mimeType":"audio/mpeg","sha256":"63e76cd6291fbaa5d6f2dfe363b704e98c63ab0ade8eabb1bb96ff1ace9e39b0","bytes":916979,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"153e6b5d4ceaeeec43ea54e3261e41ed8bf5577071d573f004263f6f33182c2e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:53.784Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"84ef50b77e565c6c4f0da84372fcf47dddd9c33fea2997fe355f944b2f8f52cf","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_37_battle","kind":"audio","path":"audio/voice/scene/canon_recap_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"d136a8873f583ce3c5df44c57934c316402ebf899020e61c2ef21abf24ca18d3","bytes":675635,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"6f790e60f0e468516ce76f3673407e888252679f94541de11918fb6fef28d6e8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:01.021Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a67bb8d10cd4e44cb2f670766bc1b45acc78219c61559d2ed37db46ad44109dd","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_43_outcome","kind":"audio","path":"audio/voice/scene/canon_recap_9_43_outcome.mp3","mimeType":"audio/mpeg","sha256":"29214a431ceda8a8917df7b47af4d31df69bb22b709c0d1ac6887579440310ab","bytes":1276403,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"17bf287e00059f90b094ff81d7fc9f6de97c05d812cf9d3651736a6c34d67dab","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:08.577Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"b479cae4cbf12cdfa1eae66d2f537dedb42c58f3d471b4c7bbc27e0185e566cd","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_albina_fascia","kind":"audio","path":"audio/voice/scene/canon_recap_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"9f445dfa83c196e54ab760d5d10b1ca08a23199e1d7a3c117bfbe04d9c187fca","bytes":2609267,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"c0ad6ef4f2be7d88905a614aa0aa0b6796beb374c95e402f43bcccc3f78371d3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:19.427Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"35d2bd219124272e9bae5662be97e4929a9b799cac54036d451e852c527fe98e","role":"pie-speech-api-output"}]}},{"id":"voice.scene.golden_bough_001","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"17b56b325e5051b43a27459152b094c53d12ac2edf65c03c0ec65533cb20a29c","bytes":203315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a270a72f45023d622be74677d1ea537ccd5888db0114194f6776f3af2ed26666","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:41.907Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_002","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"d6365c5d4894da5e57e88319d8c2fe264f25c4199b41031c8ed72ba40e09ee19","bytes":154355,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b4473ee31de5b1cc49c15a7eb1add28ce76df79b7592fe3c3116ed2307289b65","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:42.286Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_003","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"1ad02d7568d0ae545c157a13989da73a7f7006aea805d0617a3d99ee3421ccfc","bytes":290867,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6fa1c97925366a32b8c7f44feee038786b7dae38a72fc7e5fee148d25354a011","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:42.799Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_004","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"a59f7ec4c382fbe7e9f54e6eca0c1c4a1d0c5fc3d8fb6b431831c69a8da8fc78","bytes":290867,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"527efdf94fb22735f303d947db0332e07ffc4f0a29ed05accdd32e240d6fb14f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:43.311Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_005","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"507228ac0a027d9c8f3534301d01fff6b9cedcf322a4daca6ec6803288517688","bytes":255155,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6b8c415bdbc21a315e4c6216a87334af387a9ce99f3c4269225be66f6cabde9a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:43.744Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_006","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"ba279ed3531dc0ed703444d8ef096802428ca7ab29fcbf4f3873588ceb4d786d","bytes":311027,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1d44ba20698e0b69d89856ed539d4c3b8cdc34fceb61ee9594acba68f7b6763f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:44.224Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_007","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"e493295b8fc9a9777274dc6ea8bdf29f6fa36ffe186a9e8b705bc4f95e9dcf6a","bytes":326579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"38ba7e32fc54264d90c135ce2c62c7201a98abac7fc92aa1bc45956c8f0c9424","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:44.758Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_008","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"41eb3a1a3f955bdf78b8107b5f3aeb6e06a1c1446c0300f4de0f712a3b1a310e","bytes":308723,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"41607fa266621d6dd92c2d035287438b03daddc343ba89b1c32f54656ec8af83","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:45.298Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_009","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"54d231c0a6980338b1b28ea6ce15ca5a284f11bb0631106e1e3cb393c8154f89","bytes":315059,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c7495268f478f760ca778bdb657e96a65ce0fab47e7e397ddd2d8c9c22bca739","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:45.767Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_010","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"5ea795c0fd6273b40f187838c3ab9129a255d1dca1f7e65f155ee7c2b56c2972","bytes":305843,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f35d42e880288e82e6e6e49993b4c37bf4d626482e32d08f99a93309b735bc10","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:46.198Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_011","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"99ca50db65946593f20b548272f662389b678e88a6241d83d4d068de15595509","bytes":249395,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ff91a1208601ed2e190397c05caa3dc818008b1137e3b2e2b115b7562bbea94f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:46.580Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_012","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"152da1cd4f137ebca0900f228e2ed76cf392114063f02c3e63d6193ac093abc4","bytes":308147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"615135f1dfd10ca56a6d230fc5906ab5d301b861de1f439d736feaf8fd09b57e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.023Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_013","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"47e62c9d7dfb826b8fd9caf7a722a5bd0b4e1790632a24dd3f7a5acb5ec138b4","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f244b1df2919fe76299dcfa47accb58b15052e306ba75fc833307b7e2f66fffd","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.475Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_014","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"aaeffda74a330c6f70513fad58a0bfb8ebd8aa5793806ac74075e9aa4f4224d7","bytes":256883,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1d8cb187329c7b92f2a0989d4c4fefb3acd68041c1caff00180dd30e451d95c9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.882Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_015","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"796624549e2d513c2f139e412cbb989e3d9fa9221c6d6cb9c5d0d18cb9e14b69","bytes":298355,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d0eef28da4f736abe86833ad4bb2e36480e0da115882743f37a39b2eaacf1426","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:48.340Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_bad","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"cd354aeaef8a6692d7f672d11d0ee3cf0c6bedfb9bd350a5f889ea2160902518","bytes":301811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9eb71756df936d021bc7b0aa5e538751cb7f490ae585ad7e708b1fc89205708b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:48.783Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_gate","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7d0130d4db06b824850c69ce95c00de02af01fccaca56854c850e0284c9f29ae","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"298db686f42cc340c95f6304a5a9bb2268d197ac97f1344f48ea9bfee1332b28","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:49.160Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_normal","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"bd6aa132a1ac2f6c5fe62a3f328e5950cdb2b8ea54a3a92399bd7afed1f3e4fd","bytes":287987,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fba270f3981e547d43aca27f9f4bac748e04275f4a6868092e1e45e2c23045b9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:49.661Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_true","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"43cbec46f0fd8d9debb60a95f16e0e3663775a057c40df9af5dfef8e921c42f5","bytes":328307,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"178945dd1c479bc5fddff007809e856f1de647aff6225957a7e825332763d5f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.177Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.opening_001","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"0ab7a4a0b1a11486d6feaeac10e40b2b9aec2675f19dcce2ddb501c679238074","bytes":425651,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"5a883853966525713af6be3c5091cdc6b46e700dc878872927105bb5c3c036c2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:07:26.105Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"7dc61fc8a18a66c65b7e320819eaef21228cc823745cfff10ca43972828c2378","role":"pie-speech-api-output"}]}},{"id":"voice.scene.ring_conspiracy_001","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"f4535e60e9ebfe3a9f50940530ec05a38ca9e7dd665e2f7064ad0d52811753c2","bytes":186611,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"44469f1bbcc8fc18552a04bb1752643d7ed72aaa58d0b17bffd74b4d6754973f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.522Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_002","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"61c43123ae22fe7a5f07bd0d7b10070f527a4d8d9413b2c6e15b27c6566242f8","bytes":235571,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"539aaf46b5a96ce1385a02823718549789bf39958cb04c9eb20b6e806948804f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.904Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_003","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"51c502de79a93bb2b1a26a98501944d677fb2c15a5a49e15a29bdd31e414a498","bytes":247667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f0c1044b16daa54e36d41efd4047b45ef6a1849295f8c4d31fb259b6dbb38326","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:51.309Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_004","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"41d01bc36452401d3300d76fe34a239e8c75f8711c9a5a5448865c2ecb49897c","bytes":291443,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"51f43be9131abd8a2d96ece11d7ac2c9e8f589c241af4a8e1c28296d0cc08a2e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:51.860Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_005","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"3e3011f9fdefa13e482f113f80ed4b977e27ad28d279150b8ab7044801ddfc01","bytes":280499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"50ec0e3a3fcb8755657e0079da77177678124229cd1a1963a929f38bea643cbe","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:52.327Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_006","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"39c5261f5ef3d79e728f8364259d03f4d6de58242dc63be4797fe92077cb74e6","bytes":256883,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"39b617a8c8d1d95f3b7ea6e9622877b24f3f9e4e9062f4fcb2443ec0afe2d193","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:52.731Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_007","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"bf7b82d130b47ba9f0efdf5a0590b87d41601bcf2d90f01c20debb7d931cfc8f","bytes":270131,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"593b2d0525dc46a1ecf4e047fc4a6e37e20c4861e58f668d77e41dc37c24c8c5","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:53.205Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_008","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"2709be5f3a41429a9bee00e2a8631e14884cf249fee14c9944001fc865dfeb4c","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"88014d35432c1a5b4f56c82e44193c080743de1d149e39e8a3c676cfd64e25ad","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:53.727Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_009","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"30ab38b0d89d5d55b3ee833f4446be0b572508195146ba4529670e9293e4bc60","bytes":239603,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1173f17ee8a03a8b34c229aeac46e2477a515c504c9a2bc45e186fd94aa3586f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:54.145Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_010","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"7902ea7116a00c992000ba090b0b886fadfbef3b628c57141a43e473a6478edf","bytes":287987,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ebc023888ca1a431a1e8d89a231a62358726f7621b41d0b43ef98d74f72bbcf5","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:54.620Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_011","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"3ff28c1d82f871ea748100c320625f9f9d6ab0e53d8929b3e3dd0f09cec392c5","bytes":291443,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6771cb7b207941f1eccda0d4ea7ecf14bad9a68b2231765e0501a542b7d27008","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:55.166Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_012","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"43419544d4b85735fc4c6f3e8d3239307c4b19b4ebeade5d1120ef815715d6f6","bytes":273587,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9fe6a2c58a0f897b3dacefb0a80634c760b41caa2e73dd13ae277a0846abc005","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:55.665Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_013","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"3065ed0dc9815078d8a5148a84ed2e29b7fb6cd9f7300cebe791ed20c59e0a53","bytes":306995,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"53c76ffe817aad060aa05140d3ca5c5c79d66024da22268f82c5cb94719a37e3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:56.191Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_014","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"dd44754be2c8d7146bc1593bb86525176f25e94c47f696498500a106ec5a58cd","bytes":254003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"64afbee7d2aa1a0eac573557d880a43ad24f08b957e49e422d132ccb28749f29","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:56.617Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_015","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"97b9eaf4e55aa2b333cc755914da99c5aa967ba3696b762800ea3249a138d8db","bytes":366899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"11cde049eb61f8f0e33164486fa8ccd66a6a3b6155869f9bb6172a32940dbe12","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:57.148Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_bad","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"9e16b3ccefac5a327e73e53fbd9dc45c88d12cb71b0b1129b696de7c1e957c05","bytes":319091,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"abe2f0895a2e8088d3a498d8e9b4f6d0e336811a58bfdff3a09922a0815a8183","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:57.673Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_gate","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"b8b574bf431cc9bdbadfe73fc3a0622a16f7d27433c7d3d38cb1fdc0655b6682","bytes":216563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"2488b54c1291c1d8b9051bb44e3bf6e8c5c67bc4dda433eb28326551aee9cbd9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:58.104Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_normal","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"9ddbee2b9dd93b149de53a5806a4fd9900a3bce05fd204c7f9a53c8140c295af","bytes":270707,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fc8f9d8ff14512ee933b6e3446c34c70bc26b1d2a4a4e1240139d40248077e03","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:58.612Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_true","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"55e5b7c7eb8118623d1b36aaa5e85d9b6ab4286c3e205c6e8d262be481691c37","bytes":347891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4deb3a98534191a630873f96aca75d4f8241c87dcc69842a16c6029444c3865f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.123Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_001","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"61917fda12f4f29461e9db4603781dfe6af6351b9c58e8ac89fd6e11176a3d91","bytes":149171,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"26d8ff12d672a714ee5e53dca1c9563dc5047eb2ed9e76564759a81d3828da23","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:57.527Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a409609201b1e169482fe326c70c4c55c344f8f4a5bc886f20b51b725006f06a","role":"pie-speech-api-output"}]}},{"id":"voice.scene.white_canvas_002","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"3fa78fe28acb401aa624e5dc0a149c430be3543587c707a460cc19238519b227","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0124da8141371da5605346831d64565d23f57f9b9b691ad1480ba7e2c60fb39b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.477Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_003","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"30c100d35a1e686cb6108e478d3c4eebc698b2bcf7fb964fde186a6e96f4564a","bytes":236147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cc1eb1c9c159d886a5d042d7181b99f694a1ad9710ee4cd006047a87ddacbeea","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.861Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_004","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"829183a0e33a583a8af9072cf4914baa183d24cdb28d9fc9685c2ef02f8d9458","bytes":273011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cfa89732a1ce256c6ac295a6ff2ade985a5e5ed937e97c27a3331a24390702f9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:00.367Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_005","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"aac01f6f0bfb4130603e8ab330d08aa661878e5acaf94e9c1230a356456f16c4","bytes":264947,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"7406a6c3511ff311f87bc9b72aa4d9248c3a61c0f83e58e25ee6c716f6bd3d95","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:00.846Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_006","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"136978b119f80ca4655d4524f31808012d3c01076a055f2edf3a1a5a9c38f0eb","bytes":289715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"01267d877abd2d8e09f21ea84d60032ae810b9a1e930d401fe4cfb502e870304","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:01.320Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_007","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"3b2ae779f6a0764aa8055571ce7a8fe0418c76cc9a2a7da395925ac3c90e2e91","bytes":293747,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6d09653fe0a3c8e3a560b72001e7ce655230eeb3385e555db04b8a01e1616f3c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:01.782Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_008","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"4846c374ffcf1f93861daf210c752df86f4c00e1e3836d860d69522a116588ed","bytes":322547,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f085e5f0dc298d9db7b2ee977e05d49f29b225516ea173b075245edbd0c7da0b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:02.276Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_009","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"fc92b8497ec1f4133deafffd4f0204dde06654db1aea65ee0f1573f20bbf8354","bytes":258035,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3b6fd2a878196cb998b836cf4233115c763fda3ce7c2ac082093d46b8b061457","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:02.729Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_010","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"82ce426cffeabb5431b3d08764ce3e7e42686b3f71f2e46736ecaa2a931d9135","bytes":216563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c40d4d10ac11a99f14d34362b485eda2816e906704e73a15d51775ec547df18e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:03.137Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_011","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"c70978714c71795b05c1eff9adc92713e956103e2d2a8ac8e8576f65b2b7a01a","bytes":287411,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6b76978a1979c08464e0e7b77e5be845ff819540a1a170f76f405f8a33c9ab8e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:03.638Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_012","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"e6ccc5d30d1785af804799386b190334e375a77051545f1e49d211b5a2ce982c","bytes":254579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"97c5eccddfa71c7fe37663824311f3770b10a9207395255ef9760badfe880c88","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:04.110Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_013","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"01d2f23ebdf72832e6a5b7480d5e4202e92f8b6a7445e614f6a00b324d5500c7","bytes":283379,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"adbb449badce6d68613405f3ef0d5c9e7d92885dbcf4f144f00cca891c60e124","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:04.596Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_014","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"1d2f602a2128a3d29d0953c583a78b495f75e55478cabfb5606e0a719c0db871","bytes":275891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"bb36e0c7ec73882c04f9bec4c557da8f68fae57de6367a01d94850c9e26acfc0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:05.109Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_015","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"5e4dff6e9f9d0f0373ceba2400c2044a6dacdc3dfd1b0a465cc4ce5dd8010619","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fe20269d6ec62b29ce5aa3101426190fd5af9a820d475df3a4683bf9dd713d4d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:05.661Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_bad","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"4a724974ac526d8bb95a3b999fc0a4d04dd8fe645433f89b677d8df29c3c5bd4","bytes":294899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"67f5e512a7de5e1ed132ff7fa75d83af0532acf5b4169dc2b5506d160f6f1942","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.135Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_gate","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7b3659054aae442107a743730580dfee2084a7b9ef612e5de43300774412ed49","bytes":209075,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cc12ba29eabb3d82fb02190b2c2746e2cf2889ee8cfbb1eca2a9100c67f4d5ac","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.500Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_normal","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"7e098e1806cb221d667e4ade629f5b6696f19ac270afc3eef05b8847457ca140","bytes":260339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e5900c00a3e4cff6ea7599345393e785b035613eb5cf88f83fabbd5d525143df","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.931Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_true","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"8d2e7919504bf82ed1df05b648d9959d486caf9b9abffb9aaa9d883f517db401","bytes":288563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cd1ee1736af9da9b2939a44a6dbb7b8bbb96150aa96eb462dede7c337a285d6f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:07.384Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","role":"validated-pie-speech-output"}]}}]'), Tg = [{ version: 2, id: "portrait.albina.armored", characterId: "albina", path: "characters/albina/armored.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.combat", characterId: "albina", path: "characters/albina/combat.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.endgame", characterId: "albina", path: "characters/albina/endgame.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.fascia-open", characterId: "albina", path: "characters/albina/fascia-open.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.furious", characterId: "albina", path: "characters/albina/furious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.golden-bough", characterId: "albina", path: "characters/albina/golden-bough.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.maestro", characterId: "albina", path: "characters/albina/maestro.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.normal", characterId: "albina", path: "characters/albina/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.rain", characterId: "albina", path: "characters/albina/rain.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.ring-conspiracy", characterId: "albina", path: "characters/albina/ring-conspiracy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.shy", characterId: "albina", path: "characters/albina/shy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.surgical", characterId: "albina", path: "characters/albina/surgical.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.white-canvas", characterId: "albina", path: "characters/albina/white-canvas.png", animation: { kind: "static" } }, { version: 2, id: "portrait.callisto.normal", characterId: "callisto", path: "characters/callisto/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.dante.normal", characterId: "dante", path: "characters/dante/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.faust.normal", characterId: "faust", path: "characters/faust/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.golden_apparition.normal", characterId: "golden_apparition", path: "characters/golden_apparition/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.lce_doctor.normal", characterId: "lce_doctor", path: "characters/lce_doctor/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.battle", characterId: "protagonist", path: "characters/protagonist/battle.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.resolve", characterId: "protagonist", path: "characters/protagonist/resolve.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.serious", characterId: "protagonist", path: "characters/protagonist/serious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.shadow", characterId: "protagonist", path: "characters/protagonist/shadow.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.tender", characterId: "protagonist", path: "characters/protagonist/tender.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.wet-hair", characterId: "protagonist", path: "characters/protagonist/wet-hair.png", animation: { kind: "static" } }, { version: 2, id: "portrait.ren.normal", characterId: "ren", path: "characters/ren/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.ring_agent.normal", characterId: "ring_agent", path: "characters/ring_agent/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.vergilius.normal", characterId: "vergilius", path: "characters/vergilius/normal.png", animation: { kind: "static" } }], xg = [], Sg = {
  version: wg,
  projectId: kg,
  basePath: Ig,
  assets: Ag,
  portraits: Tg,
  mediaJobs: xg
}, Vg = 2, jg = "albina-galgame-card", Cg = "canon_recap_9_14", Eg = { white_canvas: "white_canvas_001", golden_bough_rebuild: "golden_bough_001", ring_conspiracy: "ring_conspiracy_001" }, Og = { relationshipTracks: [{ id: "intimacy", label: "亲密", minimum: 0, maximum: 100 }, { id: "reliance", label: "信赖", minimum: 0, maximum: 100 }, { id: "obsession", label: "执着", minimum: 0, maximum: 100 }, { id: "suspicion", label: "戒备", minimum: 0, maximum: 100 }], quests: [{ id: "quest.white.boundary_protocol", route: "white_canvas", label: "白色画布边界协议", description: "在见证、处置权和展出决定之间建立可撤回的边界。" }, { id: "quest.golden.memory_continuity", route: "golden_bough_rebuild", label: "金枝记忆连续性", description: "在重构过程中保住称谓、选择权与法西娅的心跳锚点。" }, { id: "quest.ring.counter_contract", route: "ring_conspiracy", label: "环指反制契约", description: "保留自身条件并把敌对委托改写为可追踪的反制条款。" }], battles: [{ id: "battle.white.gallery_pressure", route: "white_canvas", label: "画廊展出压力", description: "决定是否把阿尔比娜作为作品展出的制度性冲突。", recommendedMastery: "boundary" }, { id: "battle.golden.replacement_protocol", route: "golden_bough_rebuild", label: "替换协议冲突", description: "围绕记忆封存和替换协议发生的确定性规则冲突。", recommendedMastery: "analysis" }, { id: "battle.ring.authorship_frame", route: "ring_conspiracy", label: "署名权取景框", description: "在环指剧本、胶片和署名权之间争夺叙事控制。", recommendedMastery: "blade" }], items: [{ id: "item.rain_room_badge", label: "雨室观测徽记", description: "进入 AU/IF 后由前端保存的身份与见证锚点。" }, { id: "item.white.boundary_contract", route: "white_canvas", label: "边界契约钥", description: "证明处置权、撤回权和展出决定已写入权威状态。" }, { id: "item.golden.memory_anchor", route: "golden_bough_rebuild", label: "称谓锚定镜片", description: "用于稳定重构后的称谓和人格连续性。" }, { id: "item.ring.counter_signet", route: "ring_conspiracy", label: "反制环印", description: "记录玩家保留条件和反写条款的装备凭据。" }], equipment: [{ id: "equipment.rain_room_badge", itemId: "item.rain_room_badge", slot: "accessory", label: "雨室观测徽记", modifiers: { trust: 1, composure: 2 } }, { id: "equipment.white.boundary_charm", itemId: "item.white.boundary_contract", route: "white_canvas", slot: "accessory", label: "边界契约护符", modifiers: { trust: 3, danger: -2 } }, { id: "equipment.golden.memory_lens", itemId: "item.golden.memory_anchor", route: "golden_bough_rebuild", slot: "accessory", label: "称谓锚定镜片", modifiers: { trust: 2, artResonance: 4 } }, { id: "equipment.ring.counter_signet", itemId: "item.ring.counter_signet", route: "ring_conspiracy", slot: "accessory", label: "反制环印", modifiers: { danger: -3, leverage: 3 } }], professions: [{ id: "narrative_curator", label: "剧情索引师", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { artResonance: 1 } }, { id: "boundary_mediator", route: "white_canvas", label: "边界调停者", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { trust: 1, danger: -1 } }, { id: "memory_surgeon", route: "golden_bough_rebuild", label: "记忆修复师", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { artResonance: 2 } }, { id: "ring_counterforger", route: "ring_conspiracy", label: "契约反写者", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { trust: 1, danger: -1, leverage: 1 } }], achievements: [{ id: "ach_au_boundary_witness", label: "AU 边界见证", description: "完成正史复盘并确认本卡路线属于原创 AU/IF。", eligibility: [{ kind: "flag", flag: "AU_boundary_acknowledged", equals: !0 }, { kind: "worldbook", entryId: "albina_routes_endings_au_if", status: "seen" }], reward: { values: { artResonance: 1 }, professionXp: { narrative_curator: 2 }, setFlags: ["achievement_au_boundary_witness"] } }, { id: "ach_white_boundary_archivist", route: "white_canvas", label: "白厅边界档案", description: "完成边界任务并解决画廊展出压力。", eligibility: [{ kind: "quest", questId: "quest.white.boundary_protocol", status: "completed" }, { kind: "battle", battleId: "battle.white.gallery_pressure", outcome: "victory" }, { kind: "profession", professionId: "boundary_mediator", levelGte: 2 }], reward: { values: { trust: 2, danger: -2 }, professionXp: { boundary_mediator: 2 }, setFlags: ["achievement_white_boundary_archivist"] } }, { id: "ach_golden_memory_protocol", route: "golden_bough_rebuild", label: "重构称谓协议", description: "完成连续性任务并解决替换协议冲突。", eligibility: [{ kind: "quest", questId: "quest.golden.memory_continuity", status: "completed" }, { kind: "battle", battleId: "battle.golden.replacement_protocol", outcome: "victory" }, { kind: "profession", professionId: "memory_surgeon", levelGte: 2 }], reward: { values: { artResonance: 3 }, professionXp: { memory_surgeon: 2 }, setFlags: ["achievement_golden_memory_protocol"] } }, { id: "ach_ring_counter_clause", route: "ring_conspiracy", label: "反写条款生效", description: "完成反制任务并夺回署名权。", eligibility: [{ kind: "quest", questId: "quest.ring.counter_contract", status: "completed" }, { kind: "battle", battleId: "battle.ring.authorship_frame", outcome: "victory" }, { kind: "profession", professionId: "ring_counterforger", levelGte: 2 }], reward: { values: { trust: 2, danger: -2 }, professionXp: { ring_counterforger: 2 }, setFlags: ["achievement_ring_counter_clause"] } }], outfits: [{ id: "outfit.albina.rain", label: "雨室外套", portraitAssetId: "portrait.albina.rain" }, { id: "outfit.albina.white_canvas", route: "white_canvas", label: "白色画布装束", portraitAssetId: "portrait.albina.white-canvas" }, { id: "outfit.albina.golden_bough", route: "golden_bough_rebuild", label: "金枝重构装束", portraitAssetId: "portrait.albina.golden-bough" }, { id: "outfit.albina.ring_disguise", route: "ring_conspiracy", label: "环指潜入装束", portraitAssetId: "portrait.albina.ring-conspiracy" }], worldbookEntries: [{ id: "albina_canon_term_corporism", claimIds: ["canon.term.corporism"], constant: !1, selective: !0, content: "Corporism 是 Canto IX 9-14 与 9-37 明确使用的环指艺术流派名称。本卡保留英文术语，避免无来源扩写其教义。" }, { id: "albina_identity_status", claimIds: ["canon.profile.identity"], constant: !1, selective: !0, content: "阿尔比娜是女性环指 Corporism 学徒、House of Spiders 成员与卡利斯托的弟子，在 Canto IX 作为敌对角色登场；韩语配音为 Kim Do-hee，9-43 后的正史状态为死亡。" }, { id: "albina_prosthetic_appearance", claimIds: ["canon.appearance.prosthetic-body"], constant: !1, selective: !0, content: "阿尔比娜使用带金色点缀的白色全身义体；浅灰色人工高马尾近似线缆，脸与关节处有分界线，黑色机械和线路在颈胸与大腿处裸露，中央结构近似骨架。她右眼黑、左眼白，前臂可展开多种医疗与切割工具。" }, { id: "albina_armor_fascia_visual", claimIds: ["canon.appearance.armor-and-fascia"], constant: !1, selective: !0, content: "白、亮黄、金色的铁处女式装甲具有长裙、尖刺头环、垂链、尖刺裙甲和绘有金色锐眼的面具。Fascia 是同色系巨剑，侧板打开后可见暗色骨架、肋骨与内脏组织。" }, { id: "fascia_body_origin", claimIds: ["canon.story.pre-canto-fascia"], constant: !1, selective: !0, content: "阿尔比娜主动切分原本肉体并将其制作成 Fascia，之后以全身义体替换身体、主要保留脑；Fascia 则缺少脑。她也曾先用自己的手臂练习如何处理创作素材。" }, { id: "albina_fascia_attachment", claimIds: ["canon.personality.fascia-attachment"], constant: !1, selective: !0, content: "阿尔比娜会与 Fascia 交谈、用他人血肉喂养它，并在它可能受损时优先保护它；她甚至会为让 Fascia 继续行动而违背同伴要求。" }, { id: "albina_social_ambition", claimIds: ["canon.personality.social-and-ambition"], constant: !1, selective: !0, content: "阿尔比娜通常平静轻声，却难以理解他人情绪；她把朋友与可用于 Fascia 的素材联系起来，并说自己因把部分脑组织交给 Fascia 而不善说谎。她敬仰卡利斯托，也希望未来成为超越师父的 Maestro。" }, { id: "canto_ix_9_14_context", claimIds: ["canon.9-14.corporism-context"], constant: !1, selective: !0, content: "9-14 展示了环指加工的人体作品、Faust 对 Corporism 的辨认和 Nursefather 留给女儿的创作指示。阿尔比娜本人没有在这一节直接出场。" }, { id: "canto_ix_9_18_first_appearance", claimIds: ["canon.9-18.first-appearance"], constant: !1, selective: !0, content: "9-18 是阿尔比娜首次直接出场。她与 Ren 接替 Shiomi Yoru 阻挡 Dante、Ryōshū、Gregor、Meursault 与 Yi Sang，为 Yoru 带走嫁接的 Golden Boughs 争取时间。战斗中装甲与 Fascia 侧板打开；她坚持让 Fascia 继续行动，Ren 出手制止，争执使罪人得以继续追赶 Yoru。" }, { id: "canto_ix_9_37_encounter", claimIds: ["canon.9-37.encounter-and-method"], constant: !1, selective: !0, content: "Callisto 派阿尔比娜迎接抵达 Corridor of the Ring 的 Sinclair、Ishmael、Faust、Hohenheim 与 Alyssa。她谈到唤醒 Fascia、用自己手臂练习素材处理和交朋友的愿望；遭到 Sinclair 拒绝后开战，并自称是 Callisto 门下的 Corporism 学徒。" }, { id: "canto_ix_9_37_escalation", claimIds: ["canon.9-37.escalation"], constant: !1, selective: !0, content: "Callisto 加入后与阿尔比娜一同压制众人。9-37 最后是 Callisto 以骨肉尖桩制住除 Alyssa 外的成员、Alyssa 以 Ardor Blossom Star 全力反击；Fascia 被毁和师徒死亡不发生在这一节。" }, { id: "canto_ix_9_43_turn_and_outcome", claimIds: ["canon.9-43.sign-awakening", "canon.9-43.outcome"], constant: !0, selective: !1, content: "9-43 中 Hohenheim 突袭 Callisto 后，阿尔比娜阻止追击并谈到未来；Sinclair 完全觉醒 The Sign，显现未来版本。Faust 与 Ishmael 制造开口后，Future Sinclair 先摧毁 Fascia，再杀死阿尔比娜，并随后杀死 Callisto。" }, { id: "albina_combat_profile", claimIds: ["canon.combat.story-variants", "canon.combat.mechanics"], constant: !1, selective: !0, content: "主线敌人记录包含 9-18 装甲形态、9-37 的装甲转无装甲阶段和 9-43 无装甲形态。她是 65 级、Lust 倾向、以 Bleed 为核心的 Boss；Corpus Ingredient 会转为 Artwork - Fascia 并启用强力攻击。Mirror Dungeon 与 Refracted 记录属于玩法变体，不是主线事件。" }, { id: "albina_visual_reference_lock", claimIds: ["inference.visual-reference-lock"], constant: !0, selective: !1, content: "代表正史阿尔比娜的视觉必须保留白色全身义体、右黑左白双眼、白黄金铁处女式装甲和具有骨骼内脏结构的 Fascia。路线服装变化只能作为明确标注的 AU 视觉。" }, { id: "albina_routes_endings_au_if", claimIds: ["boundary.routes-and-player.are-AU"], constant: !0, selective: !1, content: "opening_001、white_canvas、golden_bough_rebuild、ring_conspiracy、九个结局以及 {{user}} 的身份、能力和关系全部是本卡原创 AU/IF。分歧点位于 9-43 正史结果之后，不能称为原作后续或隐藏结局。" }] }, $g = /* @__PURE__ */ JSON.parse('[{"version":2,"id":"canon_recap_9_14","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-14.corporism-context"],"sourceIds":["source.official.canto-ix.9-14","source.wiki.canto-ix-part-i.172275"],"note":"Short zh-CN event paraphrase; not a quotation or transcript replacement."},"locationId":"lce_research_hallway","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-14 背景】在 LCE 研究区走廊，众人遭遇环指加工的人体作品。Faust 根据骨骼、肌肉与运动方式将其辨认为 Corporism，并发现 Nursefather 留给女儿的创作指示。固定转录全文没有在 9-14 直接写到 Albina；本节只提供她所属艺术流派的背景。","voiceAssetId":"voice.scene.canon_recap_9_14","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_18","text":"继续复盘 Albina 的首次登场","nextSceneId":"canon_recap_9_18","resultText":"时间推进到 9-18 的 LCE 研究区实验室。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_18","effects":{"setFlags":["canon_recap_9_14_seen"]}}]},{"version":2,"id":"canon_recap_9_18","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-18.first-appearance"],"sourceIds":["source.official.canto-ix.9-18","source.wiki.canto-ix-part-i.172275","source.wiki.albina.173286"],"note":"Reviewed zh-CN first-appearance paraphrase covering the complete Albina-related 9-18 event sequence."},"locationId":"lce_research_lab","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-18 首次出场】Dante、Ryōshū、Gregor、Meursault 与 Yi Sang 在 LCE 研究区实验室追查 Golden Boughs。Albina 与 Ren 接替 Shiomi Yoru 阻挡他们，让 Yoru 接近并带走嫁接的金枝。战斗推进到两人受创后，Albina 的上半装甲与 Fascia 侧板打开，露出搏动组织；她坚持让 Fascia 继续行动，Ren 则要求服从各自师父的计划，并出手制止她。两人的争执也给了罪人继续追赶 Yoru 的机会。","voiceAssetId":"voice.scene.canon_recap_9_18","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37","text":"继续复盘 9-37","nextSceneId":"canon_recap_9_37","resultText":"时间推进到 Operation Spider Pyre 期间的 Ring Corridor。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_37","effects":{"setFlags":["canon_recap_9_18_seen"]}}]},{"version":2,"id":"canon_recap_9_37","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.encounter-and-method"],"sourceIds":["source.official.canto-ix.9-37","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286"],"note":"Reviewed zh-CN 9-37 arrival, method and friendship paraphrase; player boundary text is kept out of this canon scene."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 相遇】Operation Spider Pyre 期间，Sinclair、Ishmael、Faust、Hohenheim 与 Alyssa 抵达 Corridor of the Ring；Callisto 派 Albina 前来“迎接”他们。她因唤醒沉睡的 Fascia 而迟到，并说明自己仍不擅长在不损坏素材的情况下完成作品，所以先用自己的手臂练习。她礼貌地请求众人与自己成为朋友，却把了解彼此与挑选 Fascia 的素材混在一起；遭到 Sinclair 拒绝后，双方开战。Albina 随后自报姓名，并说明自己是 Callisto 门下的 Corporism 学徒。","voiceAssetId":"voice.scene.canon_recap_9_37","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_albina_fascia","text":"核对 Albina 与 Fascia","nextSceneId":"canon_recap_albina_fascia","resultText":"复盘转向两者的身份与身体关系。","resultVoiceAssetId":"voice.result.canon_recap_continue_albina_fascia","effects":{"setFlags":["canon_recap_9_37_seen"]}}]},{"version":2,"id":"canon_recap_albina_fascia","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.profile.identity","canon.appearance.prosthetic-body","canon.appearance.armor-and-fascia","canon.personality.fascia-attachment","canon.personality.social-and-ambition","canon.story.pre-canto-fascia"],"sourceIds":["source.official.canto-ix.9-18","source.official.canto-ix.9-37","source.official.canto-ix.9-43","source.wiki.albina-enemy.175660","source.wiki.albina.173286","source.wiki.callisto.177757","source.wiki.canto-ix-part-i.172275","source.wiki.canto-ix-part-iii.177602","source.wiki.house-of-spiders.177075"],"note":"Atomic profile, appearance, personality and pre-Canto facts rendered from the reviewed claim ledger; no source dialogue is reproduced."},"locationId":"ring_corridor","backgroundAssetId":"bg.ring_atelier","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"left","active":true,"scale":1}],"speaker":"正史复盘","text":"【身份】Albina（韩文 알비나，日文 アルビナ）是女性环指 Corporism 学徒、House of Spiders 成员与 Callisto 的弟子。她在 Canto IX 中作为敌对角色登场，韩语配音为 Kim Do-hee；9-43 之后的正史状态为死亡。\\n\\n【外观】她使用带金色点缀的白色全身义体：浅灰色人工质感高马尾近似线缆，脸与关节处有分界线，颈胸与大腿可见黑色机械和线路，躯干中央近似骨架。她右眼黑、左眼白，前臂还能展开剪刀、锯、手术刀、三爪与牵开器等工具。\\n\\n【装甲与武器】她的铁处女式全身装甲以白、亮黄与金色为主，具有长裙、尖刺头环、垂链、尖刺裙甲和绘有金色锐眼的面具。Fascia 是同色系巨剑，侧板打开后会露出暗色骨架、肋骨与内脏组织。\\n\\n【Fascia】Albina 对 Fascia 有强烈依恋，会与它交谈、用他人血肉喂养它，并在它可能受损时优先保护它；9-18 中她甚至为让 Fascia 继续行动而违背 Ren 对计划的要求。\\n\\n【人格与关系】她通常平静轻声、专注艺术，却难以理解他人的情绪；她将“朋友”与可用于 Fascia 的素材联系起来。她表示自己把部分脑组织交给 Fascia 后变得很不善说谎，同时敬仰 Callisto，并希望未来成为超越师父的 Maestro。\\n\\n【身体关系】Albina 主动切分原本肉体并将其制作成 Fascia，随后用全身义体替换身体、主要保留脑；Fascia 则缺少脑。她还曾先以自己的手臂练习如何处理创作素材。","voiceAssetId":"voice.scene.canon_recap_albina_fascia","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37_battle","text":"继续复盘 9-37 的战斗升级","nextSceneId":"canon_recap_9_37_battle","resultText":"复盘转向 Callisto 加入后的最后阶段。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_37_battle","effects":{"setFlags":["canon_recap_albina_fascia_seen"]}}]},{"version":2,"id":"canon_recap_9_37_battle","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.escalation"],"sourceIds":["source.official.canto-ix.9-37","source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602"],"note":"Reviewed 9-37 ending boundary contrasted with the later 9-43 outcome."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 战斗升级】Callisto 加入战斗后，与 Albina 一同逐步压制 Limbus Company 一行。该节最后，Callisto 以骨肉尖桩制住除 Alyssa 外的众人，Alyssa 则将 Ardor Blossom Star 调至最高同调并发动反击。9-37 到此结束；Fascia 被毁、Albina 与 Callisto 死亡都不属于这一节，而发生在后续 9-43《Hatching》。","voiceAssetId":"voice.scene.canon_recap_9_37_battle","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_43","text":"继续复盘 9-43《Hatching》","nextSceneId":"canon_recap_9_43_outcome","resultText":"时间推进到 9-43；接下来才是不能被路线文本改写为正史的既定结果。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_43","effects":{"setFlags":["canon_recap_9_37_battle_seen"]}}]},{"version":2,"id":"canon_recap_9_43_outcome","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-43.sign-awakening","canon.9-43.outcome"],"sourceIds":["source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286"],"note":"Reviewed 9-43 pressure, Sign awakening and outcome paraphrase; the AU boundary remains a separate scene."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap-outcome","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-43《Hatching》转折】Hohenheim 用 Diffraction 突袭 Callisto 后，Albina 阻止 Faust 与 Ishmael 乘机追击；师徒仍将严重受创的众人逼入绝境。她要求 Sinclair 留下成为自己与 Fascia 的朋友，并在旁观 Callisto 对 Hohenheim 下手时谈到未来超越师父的梦想。她提出“未来”后，Sinclair 完全觉醒 The Sign，并显现一个来自未来的自己。\\n\\n【正史中文意译·9-43 既定结果】Faust 与 Ishmael 的同步攻击制造开口后，Future Sinclair 首先摧毁 Fascia。Albina 因 Fascia 被毁而失措，随后也被 Future Sinclair 杀死；Callisto 在之后被杀。Albina 的正史直接出场链至此结束，顺序是 9-18、9-37、9-43。","voiceAssetId":"voice.scene.canon_recap_9_43_outcome","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_enter_AU","text":"确认边界并进入 AU/IF 分歧","nextSceneId":"opening_001","resultText":"正史复盘已结束。以下三条路线全部是本卡原创 AU/IF。","resultVoiceAssetId":"voice.result.canon_recap_enter_AU","effects":{"setFlags":["canon_recap_9_43_seen","canon_recap_complete","AU_boundary_acknowledged"],"professionXp":{"narrative_curator":2},"activateProfession":"narrative_curator"}}]},{"version":2,"id":"opening_001","chapter":1,"route":null,"provenance":{"classification":"AU_extension","scope":"AU_boundary","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Explicit continuity boundary shown before the player selects an author-created AU route."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.opening_rain","tone":"AU-boundary","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"AU/IF 分歧","text":"【本卡原创 AU/IF，不是原作后续】9-43《Hatching》的正史结局已经复盘完毕。从这一刻开始，Albina 的存活、玩家 {{user}} 的出现、三条路线与九个结局均为本卡原创，不代表原作事实或隐藏结局。","voiceAssetId":"voice.scene.opening_001","bgmAssetId":"file.audio.bgm.backstreets.rain.mp3","choices":[{"id":"enter_white_canvas","text":"进入 white_canvas AU","nextSceneId":"white_canvas_001","resultText":"【AU/IF】你进入以关系边界与自我选择为核心的 white_canvas 原创路线。","resultVoiceAssetId":"voice.result.enter_white_canvas","effects":{"route":"white_canvas","values":{"affectionAlbina":2,"trust":2,"artResonance":1},"relationshipVectors":{"intimacy":2,"reliance":2},"setFlags":["route_white_canvas_seen"],"unlockCg":["cg.opening_rain"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":4},"activateProfession":"boundary_mediator"}},{"id":"enter_rebuild","text":"进入 golden_bough_rebuild AU","nextSceneId":"golden_bough_001","resultText":"【AU/IF】这条路线假设 Albina 在 9-43 死亡后被重构；该前提与全部后续均非正史。","resultVoiceAssetId":"voice.result.enter_rebuild","effects":{"route":"golden_bough_rebuild","values":{"trust":3,"danger":1},"relationshipVectors":{"reliance":2,"suspicion":1},"setFlags":["route_rebuild_seen"],"unlockCg":["cg.golden_bough_rebuild"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":4},"activateProfession":"memory_surgeon"}},{"id":"enter_conspiracy","text":"进入 ring_conspiracy AU","nextSceneId":"ring_conspiracy_001","resultText":"【AU/IF】这条路线主动改写 9-43 后续因果；其中的委托、关系和结局均为本卡原创。","resultVoiceAssetId":"voice.result.enter_conspiracy","effects":{"route":"ring_conspiracy","values":{"danger":3,"artResonance":2},"relationshipVectors":{"reliance":1,"suspicion":2},"setFlags":["route_conspiracy_seen"],"unlockCg":["cg.ring_invitation"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":4},"activateProfession":"ring_counterforger"}}]},{"version":2,"id":"white_canvas_001","chapter":1,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.94},{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"right","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。","voiceAssetId":"voice.scene.white_canvas_001","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_touch_boundary","text":"告诉她：完整也是一种作品","nextSceneId":"white_canvas_002","resultText":"你选择“告诉她：完整也是一种作品”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_touch_boundary","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["albina_learns_wholeness"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_tease_back","text":"反问她是否害怕自己的画布","nextSceneId":"white_canvas_002","resultText":"你选择“反问她是否害怕自己的画布”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_tease_back","effects":{"values":{"affectionAlbina":2,"danger":1,"artResonance":3},"setFlags":["player_teases_artist"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_002","chapter":2,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","voiceAssetId":"voice.scene.white_canvas_002","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_follow_to_lab","text":"陪她把画布带进 LCE 临时手术室","nextSceneId":"white_canvas_003","resultText":"你选择“陪她把画布带进 LCE 临时手术室”。LCE 医师：灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","resultVoiceAssetId":"voice.result.white_follow_to_lab","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":2},"setFlags":["white_lab_boundary_seen"],"unlockCg":["cg.hollow_torso_reveal"]}},{"id":"return_opening_from_white","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_white","effects":{"values":{"trust":1},"setFlags":["white_canvas_looped"]}}]},{"version":2,"id":"white_canvas_003","chapter":3,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_3","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_3","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","voiceAssetId":"voice.scene.white_canvas_003","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_sign_witness_protocol","text":"只签见证，不签处置权","nextSceneId":"white_canvas_004","resultText":"你选择“只签见证，不签处置权”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_sign_witness_protocol","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":2},"relationshipVectors":{"intimacy":2,"reliance":3},"conflictMastery":{"boundary":1},"setFlags":["witness_not_ownership"],"unlockCg":["cg.lce_raid"],"grantItems":["item.white.boundary_contract"],"equipItems":["equipment.white.boundary_charm"],"unlockOutfits":["outfit.albina.white_canvas"],"activateOutfit":"outfit.albina.white_canvas","completeQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":6}}},{"id":"white_interrupt_lab_terms","text":"要求医师删去所有所有权措辞","nextSceneId":"white_canvas_004","resultText":"你选择“要求医师删去所有所有权措辞”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_interrupt_lab_terms","effects":{"values":{"trust":3,"danger":1,"artResonance":3},"relationshipVectors":{"reliance":4,"suspicion":-1},"conflictMastery":{"boundary":1},"setFlags":["lab_terms_rewritten"],"unlockCg":["cg.fascia_heartbeat"],"grantItems":["item.white.boundary_contract"],"equipItems":["equipment.white.boundary_charm"],"unlockOutfits":["outfit.albina.white_canvas"],"activateOutfit":"outfit.albina.white_canvas","completeQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":6}}}]},{"version":2,"id":"white_canvas_004","chapter":4,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","voiceAssetId":"voice.scene.white_canvas_004","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_keep_empty_seat","text":"替她保留那张无人审判的座位","nextSceneId":"white_canvas_005","resultText":"你选择“替她保留那张无人审判的座位”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_keep_empty_seat","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":1},"setFlags":["white_canvas_empty_seat"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_share_rain_window","text":"把雨夜倒影交给她自己命名","nextSceneId":"white_canvas_005","resultText":"你选择“把雨夜倒影交给她自己命名”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_share_rain_window","effects":{"values":{"affectionAlbina":3,"trust":2,"artResonance":3},"setFlags":["rain_reflection_named"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_005","chapter":5,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_5","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_5","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","voiceAssetId":"voice.scene.white_canvas_005","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_complete","text":"记录白色画布路线的暂定结局","nextSceneId":"white_canvas_006","resultText":"你选择“记录白色画布路线的暂定结局”。阿尔比娜：空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","resultVoiceAssetId":"voice.result.white_canvas_route_complete","effects":{"values":{"affectionAlbina":2,"trust":2,"danger":-1,"artResonance":2},"setFlags":["white_canvas_route_complete"]}}]},{"version":2,"id":"white_canvas_006","chapter":6,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","voiceAssetId":"voice.scene.white_canvas_006","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_006_name_silence","text":"替那条轮廓取一个不会被收藏的名字","nextSceneId":"white_canvas_007","resultText":"你选择“替那条轮廓取一个不会被收藏的名字”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_name_silence","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":3},"setFlags":["silhouette_named"],"unlockCg":["cg.art_resonance"]}},{"id":"white_006_refuse_naming","text":"让轮廓保持无名，由她决定","nextSceneId":"white_canvas_007","resultText":"你选择“让轮廓保持无名，由她决定”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_refuse_naming","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["naming_returned"],"unlockCg":["cg.trust_threshold"]}}]},{"version":2,"id":"white_canvas_007","chapter":7,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.fascia_heartbeat","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.9}],"speaker":"法西娅","text":"法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","voiceAssetId":"voice.scene.white_canvas_007","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_007_keep_mirror_open","text":"让镜子继续映照，不替她遮蔽","nextSceneId":"white_canvas_008","resultText":"你选择“让镜子继续映照，不替她遮蔽”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_keep_mirror_open","effects":{"values":{"trust":3,"danger":1,"artResonance":4},"setFlags":["mirror_kept_open"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_007_ask_fascia_term","text":"当着阿尔比娜问法西娅一个边界问题","nextSceneId":"white_canvas_008","resultText":"你选择“当着阿尔比娜问法西娅一个边界问题”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_ask_fascia_term","effects":{"values":{"affectionAlbina":1,"trust":2,"artResonance":3},"setFlags":["fascia_addressed_directly"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_008","chapter":8,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_8","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_8","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","voiceAssetId":"voice.scene.white_canvas_008","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_008_hold_fascia","text":"替她暂时照看法西娅","nextSceneId":"white_canvas_009","resultText":"你选择“替她暂时照看法西娅”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_hold_fascia","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":2},"setFlags":["fascia_held_by_player"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_008_stay_witness_only","text":"只站在她视野内，不接手","nextSceneId":"white_canvas_009","resultText":"你选择“只站在她视野内，不接手”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_stay_witness_only","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["witness_distance_kept"],"unlockCg":["cg.lce_raid"]}}]},{"version":2,"id":"white_canvas_009","chapter":9,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","voiceAssetId":"voice.scene.white_canvas_009","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_009_keep_half_step","text":"守住半步距离，不擅自靠近","nextSceneId":"white_canvas_010","resultText":"你选择“守住半步距离，不擅自靠近”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_keep_half_step","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["half_step_distance"],"unlockCg":["cg.rain_confession"]}},{"id":"white_009_share_umbrella_edge","text":"把伞沿偏向她那侧","nextSceneId":"white_canvas_010","resultText":"你选择“把伞沿偏向她那侧”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_share_umbrella_edge","effects":{"values":{"affectionAlbina":4,"trust":2,"artResonance":2},"setFlags":["umbrella_shared"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_010","chapter":10,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"但丁","text":"但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","voiceAssetId":"voice.scene.white_canvas_010","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_010_acknowledge_leave","text":"承认她随时可以离开这张画布","nextSceneId":"white_canvas_011","resultText":"你选择“承认她随时可以离开这张画布”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_acknowledge_leave","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["leaving_acknowledged"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"white_010_offer_return_ticket","text":"给她一张可以返回的车票，而不是绳索","nextSceneId":"white_canvas_011","resultText":"你选择“给她一张可以返回的车票，而不是绳索”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_offer_return_ticket","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":2},"setFlags":["return_ticket_given"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_011","chapter":11,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.art_resonance","videoAssetId":"video.animated.runtime.white_canvas_scene_11","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_11","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","voiceAssetId":"voice.scene.white_canvas_011","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_011_curtain_call","text":"答应替她谢幕，不替她登台","nextSceneId":"white_canvas_012","resultText":"你选择“答应替她谢幕，不替她登台”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_curtain_call","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["curtain_call_promised"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_011_walk_beside","text":"陪她走下月台，不离开也不催促","nextSceneId":"white_canvas_012","resultText":"你选择“陪她走下月台，不离开也不催促”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_walk_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["platform_walked_together"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_012","chapter":12,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","voiceAssetId":"voice.scene.white_canvas_012","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_012_refuse_exhibit","text":"当众拒绝展出她的缺陷","nextSceneId":"white_canvas_013","resultText":"你选择“当众拒绝展出她的缺陷”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_refuse_exhibit","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-1,"artResonance":3},"relationshipVectors":{"reliance":3},"conflictMastery":{"boundary":3},"setFlags":["defect_not_exhibited"],"unlockCg":["cg.trust_threshold"],"resolveBattles":[{"battleId":"battle.white.gallery_pressure","outcome":"victory"}],"professionXp":{"boundary_mediator":6}}},{"id":"white_012_let_her_decide","text":"把展与不展的决定权交还给她","nextSceneId":"white_canvas_013","resultText":"你选择“把展与不展的决定权交还给她”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_let_her_decide","effects":{"values":{"affectionAlbina":3,"trust":5,"danger":3,"artResonance":4},"relationshipVectors":{"suspicion":3},"conflictMastery":{"boundary":1},"setFlags":["exhibit_choice_returned"],"unlockCg":["cg.art_resonance"],"resolveBattles":[{"battleId":"battle.white.gallery_pressure","outcome":"setback"}],"professionXp":{"boundary_mediator":3}}}]},{"version":2,"id":"white_canvas_013","chapter":13,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.art_resonance","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","voiceAssetId":"voice.scene.white_canvas_013","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_013_point_to_mirror","text":"指向墙上那面映过法西娅的镜子","nextSceneId":"white_canvas_014","resultText":"你选择“指向墙上那面映过法西娅的镜子”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_point_to_mirror","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":5},"setFlags":["mirror_pointed_out"],"unlockCg":["cg.art_resonance"]}},{"id":"white_013_refuse_to_choose","text":"拒绝替她决定，让她自己下刀","nextSceneId":"white_canvas_014","resultText":"你选择“拒绝替她决定，让她自己下刀”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_refuse_to_choose","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":3},"setFlags":["knife_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_014","chapter":14,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.trust_threshold","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","voiceAssetId":"voice.scene.white_canvas_014","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_014_keep_base_color","text":"答应替她保留最后一层底色","nextSceneId":"white_canvas_015","resultText":"你选择“答应替她保留最后一层底色”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_keep_base_color","effects":{"values":{"affectionAlbina":4,"trust":4,"artResonance":3},"setFlags":["base_color_kept"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_014_offer_restart","text":"答应陪她从空白重新开始","nextSceneId":"white_canvas_015","resultText":"你选择“答应陪她从空白重新开始”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_offer_restart","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["restart_offered"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_015","chapter":15,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_15","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","voiceAssetId":"voice.scene.white_canvas_015","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_final","text":"为白色画布路线盖上最后一枚印章","nextSceneId":"white_canvas_ending_gate","resultText":"你选择“为白色画布路线盖上最后一枚印章”。白色画布路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.white_canvas_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["white_canvas_route_final"]}}]},{"version":2,"id":"white_canvas_ending_gate","chapter":16,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"白色画布的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.white_canvas_ending_gate","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"white_canvas_ending_true","resultText":"结局判定完成：白色画布·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.true_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5},{"kind":"quest","questId":"quest.white.boundary_protocol","status":"completed"},{"kind":"battle","battleId":"battle.white.gallery_pressure","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.white.boundary_charm"},{"kind":"outfit","outfitId":"outfit.albina.white_canvas"},{"kind":"profession","professionId":"boundary_mediator","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_white_canvas_true_qualified"]}},{"id":"white_canvas_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"white_canvas_ending_normal","resultText":"结局判定完成：白色画布·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_white_canvas_normal_qualified"]}},{"id":"white_canvas_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"white_canvas_ending_bad","resultText":"结局判定完成：白色画布·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]},"effects":{"setFlags":["ending_white_canvas_bad_qualified"]}}]},{"version":2,"id":"white_canvas_ending_true","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_true","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"晨光落在未署名的白画上。阿尔比娜没有把你画成作品，而是把并肩离开的两道影子留在画框之外：这一次，完整与亲密同时成立。","voiceAssetId":"voice.scene.white_canvas_ending_true","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]}}},{"version":2,"id":"white_canvas_ending_normal","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_normal","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"展厅按约熄灯。你们保留了尚未说尽的话，也保留了随时重画的权利。阿尔比娜把空白画布卷好，约定下一场雨后再见。","voiceAssetId":"voice.scene.white_canvas_ending_normal","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"white_canvas_ending_bad","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_bad","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白厅没有发生争吵，只剩一张过早完成的画。阿尔比娜礼貌地收回画笔与称呼；边界仍被守住，但你们没能把信任带到黎明。","voiceAssetId":"voice.scene.white_canvas_ending_bad","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]}}},{"version":2,"id":"golden_bough_001","chapter":1,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"left","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。","voiceAssetId":"voice.scene.golden_bough_001","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_anchor","text":"成为她的记忆锚点","nextSceneId":"golden_bough_002","resultText":"你选择“成为她的记忆锚点”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["player_memory_anchor"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_question_fascia","text":"先检查法西娅","nextSceneId":"golden_bough_002","resultText":"你选择“先检查法西娅”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_question_fascia","effects":{"values":{"trust":2,"danger":1,"artResonance":4},"setFlags":["fascia_checked_first"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_002","chapter":2,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.94}],"speaker":"旁白","text":"镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","voiceAssetId":"voice.scene.golden_bough_002","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_push_into_raid","text":"带着记忆锚点突入金枝异常现场","nextSceneId":"golden_bough_003","resultText":"你选择“带着记忆锚点突入金枝异常现场”。浮士德：金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","resultVoiceAssetId":"voice.result.rebuild_push_into_raid","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["rebuild_raid_committed"],"unlockCg":["cg.lce_raid"]}},{"id":"return_opening_from_rebuild","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_rebuild","effects":{"values":{"trust":1},"setFlags":["rebuild_looped"]}}]},{"version":2,"id":"golden_bough_003","chapter":3,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_3","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_3","tone":"threat","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"浮士德","text":"金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","voiceAssetId":"voice.scene.golden_bough_003","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_cut_false_completion","text":"切断“完成品”的错误定义","nextSceneId":"golden_bough_004","resultText":"你选择“切断“完成品”的错误定义”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_cut_false_completion","effects":{"values":{"trust":4,"danger":1,"artResonance":4},"relationshipVectors":{"intimacy":1,"reliance":4},"conflictMastery":{"analysis":1},"setFlags":["false_completion_cut"],"unlockCg":["cg.surgery_of_memory"],"grantItems":["item.golden.memory_anchor"],"equipItems":["equipment.golden.memory_lens"],"unlockOutfits":["outfit.albina.golden_bough"],"activateOutfit":"outfit.albina.golden_bough","completeQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":6}}},{"id":"rebuild_guard_fascia_pulse","text":"守住法西娅的心跳频率","nextSceneId":"golden_bough_004","resultText":"你选择“守住法西娅的心跳频率”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_guard_fascia_pulse","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"relationshipVectors":{"reliance":3,"obsession":1},"conflictMastery":{"resonance":1},"setFlags":["fascia_pulse_guarded"],"unlockCg":["cg.fascia_heartbeat"],"grantItems":["item.golden.memory_anchor"],"equipItems":["equipment.golden.memory_lens"],"unlockOutfits":["outfit.albina.golden_bough"],"activateOutfit":"outfit.albina.golden_bough","completeQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":6}}}]},{"version":2,"id":"golden_bough_004","chapter":4,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","voiceAssetId":"voice.scene.golden_bough_004","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_accept_missing_pieces","text":"承认缺口也是她的结构","nextSceneId":"golden_bough_005","resultText":"你选择“承认缺口也是她的结构”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_accept_missing_pieces","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["missing_pieces_accepted"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_use_rooftop_signal","text":"用楼顶信号重排记忆顺序","nextSceneId":"golden_bough_005","resultText":"你选择“用楼顶信号重排记忆顺序”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_use_rooftop_signal","effects":{"values":{"trust":3,"danger":-1,"artResonance":4},"setFlags":["rooftop_signal_reordered"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_005","chapter":5,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_5","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_5","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","voiceAssetId":"voice.scene.golden_bough_005","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_complete","text":"记录金枝重构路线的暂定结局","nextSceneId":"golden_bough_006","resultText":"你选择“记录金枝重构路线的暂定结局”。浮士德：记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","resultVoiceAssetId":"voice.result.golden_bough_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-1,"artResonance":3},"setFlags":["golden_bough_route_complete"]}}]},{"version":2,"id":"golden_bough_006","chapter":6,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.surgery_of_memory","tone":"golden","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"浮士德","text":"记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","voiceAssetId":"voice.scene.golden_bough_006","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_006_read_aloud","text":"把那段记忆当着她的面念出来","nextSceneId":"golden_bough_007","resultText":"你选择“把那段记忆当着她的面念出来”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_read_aloud","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["memory_read_aloud"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_006_keep_silent_anchor","text":"只做锚点，不替她出声","nextSceneId":"golden_bough_007","resultText":"你选择“只做锚点，不替她出声”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_keep_silent_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["silent_anchor_kept"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_007","chapter":7,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","voiceAssetId":"voice.scene.golden_bough_007","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_007_match_her_pulse","text":"按她的节拍调整呼吸","nextSceneId":"golden_bough_008","resultText":"你选择“按她的节拍调整呼吸”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_match_her_pulse","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pulse_matched"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"rebuild_007_stay_own_rhythm","text":"保留你自己的呼吸节奏，让她对齐","nextSceneId":"golden_bough_008","resultText":"你选择“保留你自己的呼吸节奏，让她对齐”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_stay_own_rhythm","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":4},"setFlags":["own_rhythm_kept"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_008","chapter":8,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_8","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_8","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","voiceAssetId":"voice.scene.golden_bough_008","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_008_protect_current_self","text":"保护此刻这个尚未完成的她","nextSceneId":"golden_bough_009","resultText":"你选择“保护此刻这个尚未完成的她”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_protect_current_self","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["current_self_protected"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_008_trade_old_memory","text":"用一段旧记忆换取撤退时间","nextSceneId":"golden_bough_009","resultText":"你选择“用一段旧记忆换取撤退时间”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_trade_old_memory","effects":{"values":{"trust":2,"danger":-2,"artResonance":4},"setFlags":["memory_traded"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_009","chapter":9,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"金色幻影","text":"镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","voiceAssetId":"voice.scene.golden_bough_009","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_009_refuse_perfect_copy","text":"替她拒绝那个完美复制品","nextSceneId":"golden_bough_010","resultText":"你选择“替她拒绝那个完美复制品”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_refuse_perfect_copy","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["perfect_copy_refused"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_009_hand_question_back","text":"把问题原样交还给她","nextSceneId":"golden_bough_010","resultText":"你选择“把问题原样交还给她”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_hand_question_back","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["question_returned"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_010","chapter":10,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","voiceAssetId":"voice.scene.golden_bough_010","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_010_veto_sealing","text":"当着医师反对封存记忆","nextSceneId":"golden_bough_011","resultText":"你选择“当着医师反对封存记忆”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_veto_sealing","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":2,"artResonance":3},"setFlags":["memory_seal_vetoed"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_010_ask_her_choice","text":"低声问她自己想怎么签","nextSceneId":"golden_bough_011","resultText":"你选择“低声问她自己想怎么签”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_ask_her_choice","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":2},"setFlags":["seal_choice_hers"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_011","chapter":11,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_11","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_11","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","voiceAssetId":"voice.scene.golden_bough_011","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_011_sit_beside","text":"坐到她旁边，不说话","nextSceneId":"golden_bough_012","resultText":"你选择“坐到她旁边，不说话”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_sit_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["silent_companionship"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"rebuild_011_ask_next_revision","text":"问她下一笔想修改哪里","nextSceneId":"golden_bough_012","resultText":"你选择“问她下一笔想修改哪里”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_ask_next_revision","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["next_revision_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_012","chapter":12,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","voiceAssetId":"voice.scene.golden_bough_012","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"rebuild_012_break_contract","text":"当面撕毁那份替换协议","nextSceneId":"golden_bough_013","resultText":"你选择“当面撕毁那份替换协议”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_break_contract","effects":{"values":{"trust":4,"danger":0,"artResonance":3},"relationshipVectors":{"reliance":3},"conflictMastery":{"analysis":3},"setFlags":["replacement_contract_torn"],"unlockCg":["cg.conspiracy_contract"],"resolveBattles":[{"battleId":"battle.golden.replacement_protocol","outcome":"victory"}],"professionXp":{"memory_surgeon":6}}},{"id":"rebuild_012_negotiate_terms","text":"替她重新谈判条件，不让她独自承担","nextSceneId":"golden_bough_013","resultText":"你选择“替她重新谈判条件，不让她独自承担”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_negotiate_terms","effects":{"values":{"affectionAlbina":2,"trust":-5,"danger":3,"artResonance":-4},"relationshipVectors":{"suspicion":3},"conflictMastery":{"analysis":1},"setFlags":["terms_renegotiated"],"unlockCg":["cg.surgery_of_memory"],"resolveBattles":[{"battleId":"battle.golden.replacement_protocol","outcome":"setback"}],"professionXp":{"memory_surgeon":3}}}]},{"version":2,"id":"golden_bough_013","chapter":13,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","voiceAssetId":"voice.scene.golden_bough_013","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_013_promise_name","text":"答应她即使失败也记得这个名字","nextSceneId":"golden_bough_014","resultText":"你选择“答应她即使失败也记得这个名字”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_promise_name","effects":{"values":{"affectionAlbina":4,"trust":5,"artResonance":3},"setFlags":["name_promise_given"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_013_offer_witness","text":"只承诺做见证，不承诺结果","nextSceneId":"golden_bough_014","resultText":"你选择“只承诺做见证，不承诺结果”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_offer_witness","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["witness_only_promise"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_014","chapter":14,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","voiceAssetId":"voice.scene.golden_bough_014","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_014_keep_unlit","text":"答应只保管，不替她点亮","nextSceneId":"golden_bough_015","resultText":"你选择“答应只保管，不替她点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_keep_unlit","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":3},"setFlags":["gilded_bough_kept_unlit"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_014_ask_when_to_light","text":"问她什么时刻才能点亮","nextSceneId":"golden_bough_015","resultText":"你选择“问她什么时刻才能点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_ask_when_to_light","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["lighting_condition_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_015","chapter":15,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_15","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_15","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","voiceAssetId":"voice.scene.golden_bough_015","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_final","text":"为金枝重构路线落最后一笔","nextSceneId":"golden_bough_rebuild_ending_gate","resultText":"你选择“为金枝重构路线落最后一笔”。金枝重构路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.golden_bough_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["golden_bough_route_final"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_gate","chapter":16,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"金枝重构的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_gate","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_rebuild_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"golden_bough_rebuild_ending_true","resultText":"结局判定完成：金枝重构·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.true_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8},{"kind":"quest","questId":"quest.golden.memory_continuity","status":"completed"},{"kind":"battle","battleId":"battle.golden.replacement_protocol","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.golden.memory_lens"},{"kind":"outfit","outfitId":"outfit.albina.golden_bough"},{"kind":"profession","professionId":"memory_surgeon","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_golden_bough_rebuild_true_qualified"]}},{"id":"golden_bough_rebuild_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"golden_bough_rebuild_ending_normal","resultText":"结局判定完成：金枝重构·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_golden_bough_rebuild_normal_qualified"]}},{"id":"golden_bough_rebuild_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"golden_bough_rebuild_ending_bad","resultText":"结局判定完成：金枝重构·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]},"effects":{"setFlags":["ending_golden_bough_rebuild_bad_qualified"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_true","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_true","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_true","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"金枝残响终于与法西娅的心跳重合。阿尔比娜记得每一次称呼、暂停和重新确认；她以新的身体醒来，也完整记得是谁陪她走过重构。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_true","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]}}},{"version":2,"id":"golden_bough_rebuild_ending_normal","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_normal","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_normal","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"重构在可控范围内结束。部分残响仍被封存在金色薄膜后，但阿尔比娜认得你，也认得自己。你们决定把余下修复交给时间。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_normal","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"golden_bough_rebuild_ending_bad","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_bad","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_bad","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"稳定槽保住了身体，却没能保住全部连续性。阿尔比娜醒来时仍然礼貌，只把你当作可靠的见证者；被遗漏的称呼沉在金枝深处。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_bad","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]}}},{"version":2,"id":"ring_conspiracy_001","chapter":1,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。","voiceAssetId":"voice.scene.ring_conspiracy_001","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_accept","text":"接下委托，但保留自己的条件","nextSceneId":"ring_conspiracy_002","resultText":"你选择“接下委托，但保留自己的条件”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_accept","effects":{"values":{"trust":2,"danger":3,"artResonance":3},"setFlags":["contract_with_boundary"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"conspiracy_pressure","text":"逼她说出真正目标","nextSceneId":"ring_conspiracy_002","resultText":"你选择“逼她说出真正目标”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_pressure","effects":{"values":{"affectionAlbina":1,"danger":4,"artResonance":2},"setFlags":["pressed_true_goal"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_002","chapter":2,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.95}],"speaker":"阿尔比娜","text":"她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","voiceAssetId":"voice.scene.ring_conspiracy_002","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_escape_to_backstreets","text":"带着未签名委托冲出画廊","nextSceneId":"ring_conspiracy_003","resultText":"你选择“带着未签名委托冲出画廊”。环指代理人：追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","resultVoiceAssetId":"voice.result.conspiracy_escape_to_backstreets","effects":{"values":{"trust":2,"danger":3,"artResonance":2},"setFlags":["ring_escape_committed"],"unlockCg":["cg.backstreet_pursuit"]}},{"id":"return_opening_from_ring","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_ring","effects":{"values":{"trust":1,"danger":-1},"setFlags":["conspiracy_looped"]}}]},{"version":2,"id":"ring_conspiracy_003","chapter":3,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_3","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_3","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","voiceAssetId":"voice.scene.ring_conspiracy_003","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_break_pursuit_frame","text":"打碎追兵布下的取景框","nextSceneId":"ring_conspiracy_004","resultText":"你选择“打碎追兵布下的取景框”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_break_pursuit_frame","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"relationshipVectors":{"intimacy":1,"reliance":4},"conflictMastery":{"blade":1},"setFlags":["pursuit_frame_broken"],"unlockCg":["cg.combat_transition_01"],"grantItems":["item.ring.counter_signet"],"equipItems":["equipment.ring.counter_signet"],"unlockOutfits":["outfit.albina.ring_disguise"],"activateOutfit":"outfit.albina.ring_disguise","completeQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":6}}},{"id":"conspiracy_feed_false_signature","text":"交出伪造签名引开视线","nextSceneId":"ring_conspiracy_004","resultText":"你选择“交出伪造签名引开视线”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_feed_false_signature","effects":{"values":{"trust":2,"danger":-1,"artResonance":4},"relationshipVectors":{"reliance":3,"suspicion":1},"conflictMastery":{"analysis":1},"setFlags":["false_signature_planted"],"unlockCg":["cg.ren_interruption"],"grantItems":["item.ring.counter_signet"],"equipItems":["equipment.ring.counter_signet"],"unlockOutfits":["outfit.albina.ring_disguise"],"activateOutfit":"outfit.albina.ring_disguise","completeQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":6}}}]},{"version":2,"id":"ring_conspiracy_004","chapter":4,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","voiceAssetId":"voice.scene.ring_conspiracy_004","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"ring_conspiracy_route_complete","text":"记录环指共谋路线的暂定结局","nextSceneId":"ring_conspiracy_005","resultText":"你选择“记录环指共谋路线的暂定结局”。卡利斯托：卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-2,"artResonance":3},"setFlags":["ring_conspiracy_route_complete"],"unlockCg":["cg.ring_conspiracy_ending"]}}]},{"version":2,"id":"ring_conspiracy_005","chapter":5,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_5","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_5","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","voiceAssetId":"voice.scene.ring_conspiracy_005","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_005_refuse_duo","text":"当众拒绝成为合作展品","nextSceneId":"ring_conspiracy_006","resultText":"你选择“当众拒绝成为合作展品”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_refuse_duo","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["duo_exhibit_refused"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_005_let_her_answer","text":"不替她回答，让阿尔比娜开口","nextSceneId":"ring_conspiracy_006","resultText":"你选择“不替她回答，让阿尔比娜开口”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_let_her_answer","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["albina_answered_herself"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_006","chapter":6,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","voiceAssetId":"voice.scene.ring_conspiracy_006","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_006_stand_with_her","text":"站到她身侧，分担凝视","nextSceneId":"ring_conspiracy_007","resultText":"你选择“站到她身侧，分担凝视”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_stand_with_her","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":1,"artResonance":3},"setFlags":["gaze_shared"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_006_block_view","text":"挡在她和委托人之间","nextSceneId":"ring_conspiracy_007","resultText":"你选择“挡在她和委托人之间”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_block_view","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":3,"artResonance":2},"setFlags":["view_blocked"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_007","chapter":7,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","voiceAssetId":"voice.scene.ring_conspiracy_007","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_007_break_frame","text":"冲破画框","nextSceneId":"ring_conspiracy_008","resultText":"你选择“冲破画框”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_break_frame","effects":{"values":{"trust":3,"danger":3,"artResonance":3},"setFlags":["street_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_007_seize_frame","text":"把画框抢过来，反过来框住他","nextSceneId":"ring_conspiracy_008","resultText":"你选择“把画框抢过来，反过来框住他”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_seize_frame","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["frame_seized"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_008","chapter":8,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_8","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_8","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","voiceAssetId":"voice.scene.ring_conspiracy_008","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_008_refuse_testimony","text":"当面拒绝用她换取证词","nextSceneId":"ring_conspiracy_009","resultText":"你选择“当面拒绝用她换取证词”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_refuse_testimony","effects":{"values":{"affectionAlbina":2,"trust":5,"danger":2,"artResonance":2},"setFlags":["testimony_refused"],"unlockCg":["cg.lce_raid"]}},{"id":"conspiracy_008_hand_pen_to_her","text":"把笔交还给她，由她自己决定","nextSceneId":"ring_conspiracy_009","resultText":"你选择“把笔交还给她，由她自己决定”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_hand_pen_to_her","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pen_returned_to_albina"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_009","chapter":9,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","voiceAssetId":"voice.scene.ring_conspiracy_009","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_009_choose_present","text":"选现在的她，不挑那个环指版","nextSceneId":"ring_conspiracy_010","resultText":"你选择“选现在的她，不挑那个环指版”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_choose_present","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["present_albina_chosen"],"unlockCg":["cg.art_resonance"]}},{"id":"conspiracy_009_refuse_choice","text":"拒绝回答，让她自己挑镜子","nextSceneId":"ring_conspiracy_010","resultText":"你选择“拒绝回答，让她自己挑镜子”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_refuse_choice","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["mirror_choice_returned"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_010","chapter":10,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"卡利斯托","text":"卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","voiceAssetId":"voice.scene.ring_conspiracy_010","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_010_throw_badge","text":"把徽章扔回卡利斯托脸上","nextSceneId":"ring_conspiracy_011","resultText":"你选择“把徽章扔回卡利斯托脸上”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_throw_badge","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":3,"artResonance":2},"setFlags":["badge_thrown"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_010_keep_badge_unworn","text":"收下徽章，但谁都不许戴","nextSceneId":"ring_conspiracy_011","resultText":"你选择“收下徽章，但谁都不许戴”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_keep_badge_unworn","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":1,"artResonance":4},"setFlags":["badge_kept_unworn"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_011","chapter":11,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_11","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_11","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","voiceAssetId":"voice.scene.ring_conspiracy_011","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_011_rewrite_ending","text":"当众改写结局，让他们措手不及","nextSceneId":"ring_conspiracy_012","resultText":"你选择“当众改写结局，让他们措手不及”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_rewrite_ending","effects":{"values":{"trust":4,"danger":0,"artResonance":4},"relationshipVectors":{"reliance":3},"conflictMastery":{"blade":3},"setFlags":["ending_rewritten"],"unlockCg":["cg.ring_conspiracy_ending"],"resolveBattles":[{"battleId":"battle.ring.authorship_frame","outcome":"victory"}],"professionXp":{"ring_counterforger":6}}},{"id":"conspiracy_011_burn_film","text":"直接烧掉胶片，让剧本作废","nextSceneId":"ring_conspiracy_012","resultText":"你选择“直接烧掉胶片，让剧本作废”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_burn_film","effects":{"values":{"trust":3,"danger":7,"artResonance":3},"relationshipVectors":{"suspicion":3},"conflictMastery":{"blade":1},"setFlags":["film_burned"],"unlockCg":["cg.combat_transition_01"],"resolveBattles":[{"battleId":"battle.ring.authorship_frame","outcome":"setback"}],"professionXp":{"ring_counterforger":3}}}]},{"version":2,"id":"ring_conspiracy_012","chapter":12,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","voiceAssetId":"voice.scene.ring_conspiracy_012","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_012_end_tonight","text":"选择结束今晚的共谋","nextSceneId":"ring_conspiracy_013","resultText":"你选择“选择结束今晚的共谋”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_end_tonight","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":-2,"artResonance":3},"setFlags":["night_ended"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_012_keep_blade","text":"收下画刀，留给未来必要时再用","nextSceneId":"ring_conspiracy_013","resultText":"你选择“收下画刀，留给未来必要时再用”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_keep_blade","effects":{"values":{"affectionAlbina":1,"trust":4,"danger":1,"artResonance":4},"setFlags":["blade_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_013","chapter":13,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","voiceAssetId":"voice.scene.ring_conspiracy_013","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"conspiracy_013_hold_one_second","text":"认真握住那一秒，不多不少","nextSceneId":"ring_conspiracy_014","resultText":"你选择“认真握住那一秒，不多不少”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_hold_one_second","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["one_second_held"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"conspiracy_013_return_gently","text":"提前把它轻轻送回，不占有","nextSceneId":"ring_conspiracy_014","resultText":"你选择“提前把它轻轻送回，不占有”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_return_gently","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":4},"setFlags":["heartbeat_returned_early"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"ring_conspiracy_014","chapter":14,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","voiceAssetId":"voice.scene.ring_conspiracy_014","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_014_erase_from_catalog","text":"选择从环指目录里彻底抹去","nextSceneId":"ring_conspiracy_015","resultText":"你选择“选择从环指目录里彻底抹去”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_erase_from_catalog","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-2,"artResonance":3},"setFlags":["catalog_erased"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_014_keep_one_line","text":"只保留一行不被署名的记录","nextSceneId":"ring_conspiracy_015","resultText":"你选择“只保留一行不被署名的记录”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_keep_one_line","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["anonymous_line_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_015","chapter":15,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_15","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","voiceAssetId":"voice.scene.ring_conspiracy_015","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_route_final","text":"为环指共谋路线合上最后一卷胶片","nextSceneId":"ring_conspiracy_ending_gate","resultText":"你选择“为环指共谋路线合上最后一卷胶片”。环指共谋路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["ring_conspiracy_route_final"]}}]},{"version":2,"id":"ring_conspiracy_ending_gate","chapter":16,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"环指共谋的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.ring_conspiracy_ending_gate","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"ring_conspiracy_ending_true","resultText":"结局判定完成：环指共谋·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.true_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15},{"kind":"quest","questId":"quest.ring.counter_contract","status":"completed"},{"kind":"battle","battleId":"battle.ring.authorship_frame","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.ring.counter_signet"},{"kind":"outfit","outfitId":"outfit.albina.ring_disguise"},{"kind":"profession","professionId":"ring_counterforger","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_ring_conspiracy_true_qualified"]}},{"id":"ring_conspiracy_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"ring_conspiracy_ending_normal","resultText":"结局判定完成：环指共谋·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_ring_conspiracy_normal_qualified"]}},{"id":"ring_conspiracy_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"ring_conspiracy_ending_bad","resultText":"结局判定完成：环指共谋·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]},"effects":{"setFlags":["ending_ring_conspiracy_bad_qualified"]}}]},{"version":2,"id":"ring_conspiracy_ending_true","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_true","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"环指的目录里只剩一页无法归档的空白。阿尔比娜以自己的名字向你发出下一次邀请；你们不再是展品或棋子，而是彼此承认的共谋者。","voiceAssetId":"voice.scene.ring_conspiracy_ending_true","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]}}},{"version":2,"id":"ring_conspiracy_ending_normal","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_normal","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"你们离开了画廊，也留下了一条匿名记录作为制衡。危险没有消失，但契约已被改写；阿尔比娜把下一次会面留给更安全的夜晚。","voiceAssetId":"voice.scene.ring_conspiracy_ending_normal","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"ring_conspiracy_ending_bad","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_bad","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"追击停止时，代价已经写进彼此的沉默。你们逃出了装裱，却没能保住共同节奏；阿尔比娜独自带走那柄无锋画刀，没有约定再见。","voiceAssetId":"voice.scene.ring_conspiracy_ending_bad","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]}}}]'), Pg = {
  version: Vg,
  projectId: jg,
  initialSceneId: Cg,
  routeEntrySceneIds: Eg,
  gameplay: Og,
  scenes: $g
}, Rg = P({
  white_canvas: g().min(1),
  golden_bough_rebuild: g().min(1),
  ring_conspiracy: g().min(1)
}).strict(), Ug = P({
  version: ee(ri),
  projectId: ee("albina-galgame-card"),
  initialSceneId: g().min(1),
  routeEntrySceneIds: Rg,
  gameplay: X0,
  scenes: z(sg).min(1)
}).strict();
function Io(e, t, i) {
  e.addIssue({
    code: "custom",
    path: t,
    message: `Unknown scene reference: ${i}`
  });
}
function Zg(e) {
  return {
    quests: new Set(e.quests.map(({ id: t }) => t)),
    battles: new Set(e.battles.map(({ id: t }) => t)),
    items: new Set(e.items.map(({ id: t }) => t)),
    equipment: new Set(e.equipment.map(({ id: t }) => t)),
    professions: new Set(e.professions.map(({ id: t }) => t)),
    outfits: new Set(e.outfits.map(({ id: t }) => t)),
    worldbook: new Set(e.worldbookEntries.map(({ id: t }) => t))
  };
}
function Pt(e, t, i, a) {
  e.addIssue({ code: "custom", path: t, message: `Unknown ${i} reference: ${a}` });
}
function $i(e, t, i, a) {
  const o = e.kind === "quest" ? ["quest", e.questId, t.quests] : e.kind === "battle" ? ["battle", e.battleId, t.battles] : e.kind === "item" ? ["item", e.itemId, t.items] : e.kind === "equipment" ? ["equipment", e.equipmentId, t.equipment] : e.kind === "outfit" ? ["outfit", e.outfitId, t.outfits] : e.kind === "profession" ? ["profession", e.professionId, t.professions] : e.kind === "worldbook" ? ["worldbook", e.entryId, t.worldbook] : void 0;
  o && !o[2].has(o[1]) && Pt(i, a, o[0], o[1]);
}
function qg(e, t, i, a) {
  [
    [e.startQuests, t.quests, "quest", "startQuests"],
    [e.completeQuests, t.quests, "quest", "completeQuests"],
    [e.grantItems, t.items, "item", "grantItems"],
    [e.equipItems, t.equipment, "equipment", "equipItems"],
    [e.unlockOutfits, t.outfits, "outfit", "unlockOutfits"]
  ].forEach(([s, n, r, c]) => s?.forEach((d, u) => {
    n.has(d) || Pt(i, [...a, c, u], r, d);
  })), e.resolveBattles?.forEach(({ battleId: s }, n) => {
    t.battles.has(s) || Pt(i, [...a, "resolveBattles", n, "battleId"], "battle", s);
  }), Object.keys(e.professionXp ?? {}).forEach((s) => {
    t.professions.has(s) || Pt(i, [...a, "professionXp", s], "profession", s);
  }), e.activateOutfit && !t.outfits.has(e.activateOutfit) && Pt(i, [...a, "activateOutfit"], "outfit", e.activateOutfit), e.activateProfession && !t.professions.has(e.activateProfession) && Pt(i, [...a, "activateProfession"], "profession", e.activateProfession);
}
function zg(e, t, i, a) {
  e.eligibility.forEach((o, s) => $i(o, t, i, [...a, "eligibility", s])), Object.keys(e.reward.professionXp ?? {}).forEach((o) => {
    t.professions.has(o) || Pt(i, [...a, "reward", "professionXp", o], "profession", o);
  }), e.reward.grantItems?.forEach((o, s) => {
    t.items.has(o) || Pt(i, [...a, "reward", "grantItems", s], "item", o);
  }), e.reward.unlockOutfits?.forEach((o, s) => {
    t.outfits.has(o) || Pt(i, [...a, "reward", "unlockOutfits", s], "outfit", o);
  });
}
function Fg(e, t) {
  const i = Zg(e.gameplay);
  e.scenes.forEach((a, o) => a.choices.forEach((s, n) => {
    const r = ["scenes", o, "choices", n];
    qg(s.effects, i, t, [...r, "effects"]), s.availability?.allOf?.forEach((c, d) => $i(c, i, t, [...r, "availability", "allOf", d])), s.availability?.anyOf?.forEach((c, d) => $i(c, i, t, [...r, "availability", "anyOf", d]));
  })), e.scenes.forEach((a, o) => {
    a.ending?.eligibility.allOf?.forEach((s, n) => $i(s, i, t, ["scenes", o, "ending", "eligibility", "allOf", n])), a.ending?.eligibility.anyOf?.forEach((s, n) => $i(s, i, t, ["scenes", o, "ending", "eligibility", "anyOf", n]));
  }), e.gameplay.achievements.forEach((a, o) => {
    zg(a, i, t, ["gameplay", "achievements", o]);
  });
}
const Yc = Ug.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = new Map(e.scenes.map((n) => [n.id, n]));
  e.scenes.forEach((n, r) => {
    i.has(n.id) && t.addIssue({ code: "custom", path: ["scenes", r, "id"], message: `Duplicate scene id: ${n.id}` }), i.add(n.id), n.choices.forEach((c, d) => {
      a.has(c.id) && t.addIssue({ code: "custom", path: ["scenes", r, "choices", d, "id"], message: `Duplicate choice id: ${c.id}` }), a.add(c.id);
    });
  }), i.has(e.initialSceneId) || Io(t, ["initialSceneId"], e.initialSceneId);
  const s = o.get(e.initialSceneId);
  s && s.provenance.scope !== "canon_recap" && t.addIssue({ code: "custom", path: ["initialSceneId"], message: "Initial scene must begin the canon recap" }), Object.entries(e.routeEntrySceneIds).forEach(([n, r]) => {
    i.has(r) || Io(t, ["routeEntrySceneIds", n], r);
    const c = o.get(r);
    c && (c.route !== n || c.provenance.classification !== "AU_extension") && t.addIssue({ code: "custom", path: ["routeEntrySceneIds", n], message: `Route entry must be AU_extension content for ${n}` });
  }), e.scenes.forEach((n, r) => {
    n.choices.forEach((c, d) => {
      i.has(c.nextSceneId) || Io(t, ["scenes", r, "choices", d, "nextSceneId"], c.nextSceneId);
    });
  }), Fg(e, t);
});
function Mg(e) {
  const t = Wc.parse(e), i = new Map(t.assets.map((o) => [o.id, o])), a = new Set(t.portraits.map((o) => o.id));
  return Yc.superRefine((o, s) => {
    o.scenes.forEach((n, r) => {
      [
        [n.backgroundAssetId, ["scenes", r, "backgroundAssetId"]],
        [n.cgAssetId, ["scenes", r, "cgAssetId"]]
      ].forEach(([f, p]) => f && ui(s, i, f, "image", p)), [
        [n.videoAssetId, ["scenes", r, "videoAssetId"]],
        [n.desktopVideoAssetId, ["scenes", r, "desktopVideoAssetId"]]
      ].forEach(([f, p]) => f && ui(s, i, f, "video", p)), [
        [n.voiceAssetId, ["scenes", r, "voiceAssetId"]],
        [n.bgmAssetId, ["scenes", r, "bgmAssetId"]]
      ].forEach(([f, p]) => f && ui(s, i, f, "audio", p)), n.sfxAssetIds?.forEach((f, p) => ui(s, i, f, "audio", ["scenes", r, "sfxAssetIds", p])), n.portraits.forEach((f, p) => {
        a.has(f.portraitAssetId) || No(s, ["scenes", r, "portraits", p, "portraitAssetId"], f.portraitAssetId);
      }), n.choices.forEach((f, p) => {
        f.resultVoiceAssetId && ui(s, i, f.resultVoiceAssetId, "audio", ["scenes", r, "choices", p, "resultVoiceAssetId"]), f.effects.unlockCg?.forEach((b, E) => ui(s, i, b, "image", ["scenes", r, "choices", p, "effects", "unlockCg", E]));
      });
    }), o.gameplay.outfits.forEach((n, r) => {
      a.has(n.portraitAssetId) || No(s, ["gameplay", "outfits", r, "portraitAssetId"], n.portraitAssetId);
    });
  });
}
function No(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
function ui(e, t, i, a, o) {
  const s = t.get(i);
  if (!s) {
    No(e, o, i);
    return;
  }
  s.kind !== a && e.addIssue({ code: "custom", path: o, message: `Asset ${i} must be ${a}, found ${s.kind}` });
}
function Ng(e, t) {
  return t === void 0 ? Yc.parse(e) : Mg(t).parse(e);
}
const Lg = P({ intimacy: B().finite(), reliance: B().finite(), obsession: B().finite(), suspicion: B().finite() }).strict(), Hg = P({ composure: B().finite(), materials: B().finite(), leverage: B().finite(), exposure: B().finite() }).strict(), Jg = P({ blade: B().finite(), boundary: B().finite(), analysis: B().finite(), resonance: B().finite() }).strict(), Dg = P({
  affectionAlbina: B().finite(),
  trust: B().finite(),
  danger: B().finite(),
  artResonance: B().finite(),
  relationshipVectors: Lg,
  routeEconomy: Hg,
  conflictMastery: Jg
}).strict(), Bg = P({
  name: g(),
  gender: g(),
  appearance: g(),
  background: g(),
  addressName: g(),
  boundaries: g(),
  routePreference: Xe
}).strict(), Kg = P({
  ownedIds: z(g().min(1)),
  equipped: P({
    weapon: g().min(1).optional(),
    armor: g().min(1).optional(),
    accessory: g().min(1).optional(),
    tool: g().min(1).optional()
  }).strict(),
  outfitIds: z(g().min(1)),
  activeOutfitId: g()
}).strict(), Gg = P({
  resolvedIds: z(g().min(1)),
  outcomes: na(g().min(1), ge(["victory", "setback"]))
}).strict(), Wg = P({
  xp: B().int().nonnegative(),
  level: B().int().positive()
}).strict(), Yg = P({
  activeId: g(),
  progress: na(g().min(1), Wg)
}).strict(), Xg = P({ unlockedIds: z(g().min(1)) }).strict(), Qg = P({
  activeEntryIds: z(g().min(1)),
  seenEntryIds: z(g().min(1))
}).strict();
function Lo(e, t) {
  if (e === null || typeof e == "string" || typeof e == "boolean") return !0;
  if (typeof e == "number") return Number.isFinite(e);
  if (typeof e != "object" || t.has(e)) return !1;
  t.add(e);
  const i = Array.isArray(e) ? e.every((a) => Lo(a, t)) : (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null) && Object.values(e).every((a) => Lo(a, t));
  return t.delete(e), i;
}
const e1 = A0((e) => e !== null && typeof e == "object" && !Array.isArray(e) && Lo(e, /* @__PURE__ */ new WeakSet()), { message: "Log entries must contain only finite JSON values" }), Ee = z(e1), t1 = P({
  history: Ee,
  timeline: Ee,
  routeActions: Ee,
  routeActivity: Ee,
  progressionUnlocks: Ee,
  consequences: Ee,
  routeEvents: Ee,
  replayAnchors: Ee,
  routeObjectives: Ee,
  watchSignals: Ee,
  narrativeIndex: Ee,
  openingDrafts: Ee,
  conflicts: Ee,
  exchanges: Ee,
  contacts: Ee,
  achievements: Ee,
  realityOverlays: Ee,
  sceneBranches: Ee,
  story: Ee,
  storySummaries: Ee,
  dynamicMemories: Ee
}).strict(), ca = P({
  version: ee(ri),
  projectId: ee("albina-galgame-card"),
  saveId: g().min(1),
  createdAt: g().min(1),
  updatedAt: g().min(1),
  playerProfile: Bg,
  route: Xe.nullable(),
  chapter: B().int().nonnegative(),
  sceneId: g().min(1),
  locationId: g(),
  values: Dg,
  flags: na(g().min(1), Ii()),
  inventory: Kg,
  quests: P({
    activeNodeIds: z(g().min(1)).default([]),
    completedNodeIds: z(g().min(1)),
    currentMapNodeId: g(),
    progressLog: Ee
  }).strict(),
  battles: Gg.default({ resolvedIds: [], outcomes: {} }),
  professions: Yg.default({ activeId: "", progress: {} }),
  achievements: Xg.default({ unlockedIds: [] }),
  worldbook: Qg.default({ activeEntryIds: [], seenEntryIds: [] }),
  unlockedCg: z(g().min(1)),
  logs: t1
}).strict(), Pn = "1970-01-01T00:00:00.000Z";
function i1() {
  return {
    history: [],
    timeline: [],
    routeActions: [],
    routeActivity: [],
    progressionUnlocks: [],
    consequences: [],
    routeEvents: [],
    replayAnchors: [],
    routeObjectives: [],
    watchSignals: [],
    narrativeIndex: [],
    openingDrafts: [],
    conflicts: [],
    exchanges: [],
    contacts: [],
    achievements: [],
    realityOverlays: [],
    sceneBranches: [],
    story: [],
    storySummaries: [],
    dynamicMemories: []
  };
}
function Ua() {
  return {
    version: ri,
    projectId: "albina-galgame-card",
    saveId: "albina-v2-recovered",
    createdAt: Pn,
    updatedAt: Pn,
    playerProfile: {
      name: "{{user}}",
      gender: "成年男性",
      appearance: "黑发，英俊，穿深色长外套，气质冷静而危险。",
      background: "暂未确认；可由玩家设定。",
      addressName: "{{user}}",
      boundaries: "成人自愿，亲密推进需要明确同意；允许黑暗都市暴力，但不允许强迫或失能式亲密。",
      routePreference: "white_canvas"
    },
    route: null,
    chapter: 0,
    sceneId: "canon_recap_9_14",
    locationId: "lce_research_hallway",
    values: {
      affectionAlbina: 0,
      trust: 0,
      danger: 0,
      artResonance: 0,
      relationshipVectors: { intimacy: 0, reliance: 0, obsession: 0, suspicion: 0 },
      routeEconomy: { composure: 60, materials: 3, leverage: 0, exposure: 0 },
      conflictMastery: { blade: 0, boundary: 0, analysis: 0, resonance: 0 }
    },
    flags: {},
    inventory: { ownedIds: [], equipped: {}, outfitIds: [], activeOutfitId: "" },
    quests: { activeNodeIds: [], completedNodeIds: [], currentMapNodeId: "", progressLog: [] },
    battles: { resolvedIds: [], outcomes: {} },
    professions: {
      activeId: "narrative_curator",
      progress: {
        narrative_curator: { xp: 0, level: 1 },
        boundary_mediator: { xp: 0, level: 1 },
        memory_surgeon: { xp: 0, level: 1 },
        ring_counterforger: { xp: 0, level: 1 }
      }
    },
    achievements: { unlockedIds: [] },
    worldbook: { activeEntryIds: [], seenEntryIds: [] },
    unlockedCg: [],
    logs: i1()
  };
}
function Ho(e) {
  return Array.isArray(e) ? e.map(Ho) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).sort(([t], [i]) => t < i ? -1 : t > i ? 1 : 0).map(([t, i]) => [t, Ho(i)])) : e;
}
function a1(e) {
  return JSON.stringify(Ho(ca.parse(e)), null, 2);
}
function Xc(e) {
  return ca.parse(e);
}
const vs = 10;
class ea extends Error {
  constructor(t, i, a) {
    super(i, a), this.code = t, this.name = "SaveRecoveryError";
  }
  code;
  recoverable = !0;
}
function Ke(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null ? e : void 0;
}
function ei(e, t, i) {
  const a = i === void 0 ? void 0 : { cause: i };
  return { ok: !1, error: new ea(e, t, a) };
}
function o1(e) {
  try {
    const t = Ke(e);
    return !t || t.schemaVersion !== vs ? !1 : t.projectId === void 0 || t.projectId === "albina-galgame-card";
  } catch {
    return !1;
  }
}
function Fe(e, t) {
  return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function tt(e, t) {
  return typeof e == "string" ? e : t;
}
function ai(e, t = []) {
  return Array.isArray(e) ? [...new Set(e.filter((i) => typeof i == "string" && i.length > 0))] : [...t];
}
function Jo(e, t) {
  if (e === null || typeof e == "string" || typeof e == "boolean") return e;
  if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
  if (Array.isArray(e)) return e.map((s) => Jo(s, t)).filter((s) => s !== void 0);
  const i = Ke(e);
  if (!i || t.has(i)) return;
  t.add(i);
  const a = Object.entries(i).sort(([s], [n]) => s.localeCompare(n)), o = {};
  for (const [s, n] of a) {
    const r = Jo(n, t);
    r !== void 0 && (o[s] = r);
  }
  return t.delete(i), o;
}
function s1(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
function Oe(e) {
  return Array.isArray(e) ? e.map((t) => Jo(t, /* @__PURE__ */ new WeakSet())).filter(s1) : [];
}
function n1(e, t) {
  const i = Xe.safeParse(e);
  return i.success ? i.data : typeof t == "string" && t.startsWith("golden_bough_") ? "golden_bough_rebuild" : typeof t == "string" && t.startsWith("ring_conspiracy_") ? "ring_conspiracy" : typeof t == "string" && t.startsWith("white_canvas_") ? "white_canvas" : null;
}
function r1(e, t, i) {
  const a = Ke(e.playerProfile) ?? {}, o = Xe.safeParse(a.routePreference);
  return {
    name: tt(a.name, i.name),
    gender: tt(a.gender, i.gender),
    appearance: tt(a.appearance, i.appearance),
    background: tt(a.background, i.background),
    addressName: tt(a.addressName, i.addressName),
    boundaries: tt(a.boundaries, i.boundaries),
    routePreference: o.success ? o.data : t ?? i.routePreference
  };
}
function c1(e, t) {
  const i = Ke(e.affection) ?? {}, a = Ke(e.relationshipVectors) ?? {}, o = Ke(e.routeEconomy) ?? {}, s = Ke(e.conflictMastery) ?? {};
  return {
    affectionAlbina: Fe(i.albina, t.affectionAlbina),
    trust: Fe(e.trust, t.trust),
    danger: Fe(e.danger, t.danger),
    artResonance: Fe(e.artResonance, t.artResonance),
    relationshipVectors: {
      intimacy: Fe(a.intimacy, t.relationshipVectors.intimacy),
      reliance: Fe(a.reliance, t.relationshipVectors.reliance),
      obsession: Fe(a.obsession, t.relationshipVectors.obsession),
      suspicion: Fe(a.suspicion, t.relationshipVectors.suspicion)
    },
    routeEconomy: {
      composure: Fe(o.composure, t.routeEconomy.composure),
      materials: Fe(o.materials, t.routeEconomy.materials),
      leverage: Fe(o.leverage, t.routeEconomy.leverage),
      exposure: Fe(o.exposure, t.routeEconomy.exposure)
    },
    conflictMastery: {
      blade: Fe(s.blade, t.conflictMastery.blade),
      boundary: Fe(s.boundary, t.conflictMastery.boundary),
      analysis: Fe(s.analysis, t.conflictMastery.analysis),
      resonance: Fe(s.resonance, t.conflictMastery.resonance)
    }
  };
}
function d1(e) {
  const t = Ke(e) ?? {}, i = {};
  for (const a of ["weapon", "armor", "accessory", "tool"])
    typeof t[a] == "string" && t[a].length > 0 && (i[a] = t[a]);
  return i;
}
function u1(e, t) {
  const i = Ke(e);
  return i ? Object.fromEntries(Object.entries(i).filter((a) => a[0].length > 0 && typeof a[1] == "boolean")) : { ...t };
}
function l1(e) {
  const t = ai(e.clearedConflictIds);
  return { resolvedIds: t, outcomes: Object.fromEntries(t.map((i) => [i, "victory"])) };
}
function p1(e, t) {
  const i = Ke(e) ?? {}, a = /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)]);
  return Object.fromEntries([...a].map((o) => {
    const s = Ke(i[o]) ?? {}, n = t[o] ?? { xp: 0, level: 1 };
    return [o, {
      xp: Math.max(0, Math.trunc(Fe(s.xp, n.xp))),
      level: Math.max(1, Math.trunc(Fe(s.level, n.level)))
    }];
  }));
}
function f1(e) {
  const t = Ke(e) ?? {};
  return Array.isArray(t.records) ? ai(t.records.map((i) => Ke(i)?.id)) : [];
}
function b1(e) {
  return {
    history: Oe(e.history),
    timeline: Oe(e.timeline),
    routeActions: Oe(e.routeActionLog),
    routeActivity: Oe(e.routeActivityLog),
    progressionUnlocks: Oe(e.progressionUnlockLog),
    consequences: Oe(e.consequences),
    routeEvents: Oe(e.routeEvents),
    replayAnchors: Oe(e.replayAnchors),
    routeObjectives: Oe(e.routeObjectives),
    watchSignals: Oe(e.watchSignals),
    narrativeIndex: Oe(e.narrativeIndex),
    openingDrafts: Oe(e.openingDrafts),
    conflicts: Oe(e.conflictResolutionLog),
    exchanges: Oe(e.exchangeLog),
    contacts: Oe(e.contactLog),
    achievements: Oe(e.achievementLog),
    realityOverlays: Oe(e.realityOverlayLog),
    sceneBranches: Oe(e.sceneBranchLog),
    story: Oe(e.storyLog),
    storySummaries: Oe(e.storyLogSummaries),
    dynamicMemories: Oe(e.dynamicMemories)
  };
}
function h1(e) {
  const t = Ua();
  if (typeof e.schemaVersion == "number" && e.schemaVersion > vs) return t;
  const i = n1(e.route, e.sceneId), a = typeof e.sceneId == "string" && e.sceneId.length > 0 ? e.sceneId : t.sceneId;
  return ca.parse({
    ...t,
    saveId: tt(e.saveId, t.saveId),
    createdAt: tt(e.createdAt, t.createdAt),
    updatedAt: tt(e.updatedAt, t.updatedAt),
    playerProfile: r1(e, i, t.playerProfile),
    route: i,
    chapter: typeof e.chapter == "number" && Number.isInteger(e.chapter) && e.chapter >= 0 ? e.chapter : t.chapter,
    sceneId: a,
    locationId: tt(e.locationId, t.locationId),
    values: c1(e, t.values),
    flags: u1(e.flags, t.flags),
    inventory: {
      ownedIds: ai(e.inventoryItemIds),
      equipped: d1(e.equippedItemIds),
      outfitIds: ai(e.wardrobeOutfitIds),
      activeOutfitId: tt(e.activeWardrobeOutfitId, "")
    },
    quests: {
      activeNodeIds: [],
      completedNodeIds: ai(e.completedQuestNodeIds),
      currentMapNodeId: tt(e.currentMapNodeId, ""),
      progressLog: Oe(e.questProgressLog)
    },
    battles: l1(e),
    professions: {
      activeId: tt(e.activeProfessionId, t.professions.activeId),
      progress: p1(e.professionProgress, t.professions.progress)
    },
    achievements: { unlockedIds: ai(e.unlockedAchievementIds) },
    worldbook: { activeEntryIds: [], seenEntryIds: f1(e.worldbookMemory) },
    unlockedCg: ai(e.unlockedCg, t.unlockedCg),
    logs: b1(e)
  });
}
function m1(e) {
  try {
    const t = ca.safeParse(e);
    if (t.success) return t.data;
    const i = Ke(e);
    return i ? h1(i) : Ua();
  } catch {
    return Ua();
  }
}
function no(e) {
  try {
    const t = ca.safeParse(e);
    if (t.success) return { ok: !0, save: t.data, source: "v2" };
    const i = Ke(e);
    return i ? typeof i.version == "number" && i.version > 2 ? ei("unsupported-version", `SaveV${i.version} is newer than this runtime.`) : typeof i.schemaVersion == "number" && i.schemaVersion > vs ? ei("unsupported-version", `Legacy schema ${i.schemaVersion} is newer than v1.0.44.`) : i.version === 2 ? ei("invalid-v2", "The SaveV2 payload is damaged or incomplete.") : o1(i) ? { ok: !0, save: m1(i), source: "v1.0.44" } : ei("unknown-format", "The value is neither SaveV2 nor a recognized v1.0.44 save.") : ei("unknown-format", "The value is not an Albina save object.");
  } catch (t) {
    return ei("corrupt-input", "The save payload could not be inspected safely.", t);
  }
}
function _s(e) {
  try {
    return no(JSON.parse(e));
  } catch (t) {
    return ei("invalid-json", "The imported save is not valid JSON.", t);
  }
}
const g1 = ["affectionAlbina", "trust", "danger", "artResonance"], v1 = ["composure", "materials", "leverage", "exposure"];
function Za(e, t = 0, i = 100) {
  return Math.max(t, Math.min(i, e));
}
function Ht(e, t) {
  t.forEach((i) => {
    e.includes(i) || e.push(i);
  });
}
function Qc(e, t) {
  t && (g1.forEach((i) => {
    const a = t[i];
    a !== void 0 && (e.values[i] = Za(e.values[i] + a));
  }), v1.forEach((i) => {
    const a = t[i];
    if (a === void 0) return;
    const o = i === "materials" ? 12 : 100;
    e.values.routeEconomy[i] = Za(e.values.routeEconomy[i] + a, 0, o);
  }));
}
function ed(e, t, i) {
  i && e.gameplay.relationshipTracks.forEach((a) => {
    const o = i[a.id];
    o !== void 0 && (t.values.relationshipVectors[a.id] = Za(t.values.relationshipVectors[a.id] + o, a.minimum, a.maximum));
  });
}
function _1(e, t) {
  if (t)
    for (const i of ["blade", "boundary", "analysis", "resonance"]) {
      const a = t[i];
      a !== void 0 && (e.values.conflictMastery[i] = Za(e.values.conflictMastery[i] + a, 0, 99));
    }
}
function y1(e, t) {
  t.setFlags?.forEach((i) => {
    e.flags[i] = !0;
  }), t.clearFlags?.forEach((i) => {
    e.flags[i] = !1;
  });
}
function w1(e, t, i) {
  t.forEach((a) => {
    e.quests.completedNodeIds.includes(a) || e.quests.activeNodeIds.includes(a) || (e.quests.activeNodeIds.push(a), e.quests.currentMapNodeId = a, e.quests.progressLog.push({ questId: a, status: "active", at: i }));
  });
}
function k1(e, t, i) {
  t.forEach((a) => {
    e.quests.activeNodeIds = e.quests.activeNodeIds.filter((o) => o !== a), e.quests.completedNodeIds.includes(a) || (e.quests.completedNodeIds.push(a), e.quests.progressLog.push({ questId: a, status: "completed", at: i })), e.quests.currentMapNodeId = a;
  });
}
function I1(e, t) {
  return e.reduce((i, a, o) => t >= a ? o + 1 : i, 1);
}
function td(e, t, i) {
  i && Object.entries(i).forEach(([a, o]) => {
    const s = e.gameplay.professions.find(({ id: c }) => c === a);
    if (!s) throw new Error(`Unknown profession: ${a}`);
    const n = t.professions.progress[a] ?? { xp: 0 }, r = Math.max(0, n.xp + o);
    t.professions.progress[a] = { xp: r, level: I1(s.xpThresholds, r) };
  });
}
function ys(e, t) {
  return t === void 0 || e.route === t;
}
function id(e, t, i, a) {
  const o = e.gameplay.equipment.find(({ id: s }) => s === i);
  if (!o) throw new Error(`Unknown equipment: ${i}`);
  if (!ys(t, o.route)) throw new Error(`Equipment is unavailable on route: ${i}`);
  if (!t.inventory.ownedIds.includes(o.itemId)) throw new Error(`Equipment item is not owned: ${o.itemId}`);
  t.inventory.equipped[o.slot] = o.id, t.logs.progressionUnlocks.push({ kind: "equipment", id: o.id, at: a });
}
function ad(e, t, i, a) {
  const o = e.gameplay.outfits.find(({ id: s }) => s === i);
  if (!o) throw new Error(`Unknown outfit: ${i}`);
  if (!ys(t, o.route)) throw new Error(`Outfit is unavailable on route: ${i}`);
  if (!t.inventory.outfitIds.includes(o.id)) throw new Error(`Outfit is not unlocked: ${i}`);
  t.inventory.activeOutfitId = o.id, t.logs.progressionUnlocks.push({ kind: "outfit-active", id: o.id, at: a });
}
function od(e, t, i, a) {
  const o = e.gameplay.professions.find(({ id: s }) => s === i);
  if (!o) throw new Error(`Unknown profession: ${i}`);
  if (!ys(t, o.route)) throw new Error(`Profession is unavailable on route: ${i}`);
  t.professions.activeId = o.id, t.professions.progress[o.id] ??= { xp: 0, level: 1 }, t.logs.progressionUnlocks.push({ kind: "profession-active", id: o.id, at: a });
}
function A1(e, t, i, a) {
  Ht(t.inventory.ownedIds, i.grantItems ?? []), Ht(t.inventory.outfitIds, i.unlockOutfits ?? []), i.equipItems?.forEach((o) => id(e, t, o, a)), i.activateOutfit && ad(e, t, i.activateOutfit, a);
}
function T1(e, t, i) {
  t.resolveBattles?.forEach(({ battleId: a, outcome: o }) => {
    Ht(e.battles.resolvedIds, [a]), e.battles.outcomes[a] = o, e.logs.conflicts.push({ battleId: a, outcome: o, at: i });
  });
}
function x1(e, t) {
  Ht(e.unlockedCg, t.unlockCg ?? []), Ht(e.inventory.ownedIds, t.grantItems ?? []);
}
function S1(e, t, i, a) {
  i.route && (t.route = i.route), Qc(t, i.values), ed(e, t, i.relationshipVectors), _1(t, i.conflictMastery), y1(t, i), x1(t, i), w1(t, i.startQuests ?? [], a), k1(t, i.completeQuests ?? [], a), td(e, t, i.professionXp), i.activateProfession && od(e, t, i.activateProfession, a), A1(e, t, i, a), T1(t, i, a);
}
function V1(e, t, i) {
  return Object.values(t.inventory.equipped).reduce((a, o) => {
    const s = e.gameplay.equipment.find(({ id: n }) => n === o);
    return a + (s?.modifiers[i] ?? 0);
  }, 0);
}
function j1(e, t, i) {
  const a = e.gameplay.professions.find(({ id: s }) => s === t.professions.activeId);
  if (!a) return 0;
  const o = t.professions.progress[a.id]?.level ?? 1;
  return (a.modifiersPerLevel[i] ?? 0) * o;
}
function Pi(e, t, i) {
  return t.values[i] + V1(e, t, i) + j1(e, t, i);
}
function Rn(e, t) {
  return t.operator === "gte" ? e >= t.value : t.operator === "lte" ? e <= t.value : e === t.value;
}
function Do(e, t, i) {
  return i.kind === "value" ? Rn(Pi(e, t, i.key), i) : i.kind === "relationship" ? Rn(t.values.relationshipVectors[i.key], i) : i.kind === "flag" ? (t.flags[i.flag] ?? !1) === i.equals : i.kind === "quest" ? (i.status === "active" ? t.quests.activeNodeIds : t.quests.completedNodeIds).includes(i.questId) : i.kind === "battle" ? t.battles.resolvedIds.includes(i.battleId) && (!i.outcome || t.battles.outcomes[i.battleId] === i.outcome) : i.kind === "item" ? t.inventory.ownedIds.includes(i.itemId) : i.kind === "equipment" ? Object.values(t.inventory.equipped).includes(i.equipmentId) : i.kind === "outfit" ? t.inventory.outfitIds.includes(i.outfitId) : i.kind === "profession" ? (t.professions.progress[i.professionId]?.level ?? 0) >= i.levelGte : (i.status === "active" ? t.worldbook.activeEntryIds : t.worldbook.seenEntryIds).includes(i.entryId);
}
function Ao(e, t, i) {
  const a = new Set(i.provenance.claimIds), o = e.gameplay.worldbookEntries.filter((s) => s.constant || s.claimIds.some((n) => a.has(n))).map(({ id: s }) => s);
  t.worldbook.activeEntryIds = o, Ht(t.worldbook.seenEntryIds, o);
}
function C1(e, t, i) {
  return i.route && t.route !== i.route ? !1 : i.eligibility.every((a) => Do(e, t, a));
}
function E1(e, t, i, a) {
  const o = i.reward;
  Qc(t, o.values), ed(e, t, o.relationshipVectors), td(e, t, o.professionXp), o.setFlags?.forEach((s) => {
    t.flags[s] = !0;
  }), Ht(t.inventory.ownedIds, o.grantItems ?? []), Ht(t.inventory.outfitIds, o.unlockOutfits ?? []), t.achievements.unlockedIds.push(i.id), t.logs.achievements.push({ achievementId: i.id, at: a });
}
function To(e, t, i) {
  for (const a of e.gameplay.achievements)
    t.achievements.unlockedIds.includes(a.id) || C1(e, t, a) && E1(e, t, a, i);
}
function O1(e, t) {
  if (t.inventory.outfitIds.includes(t.inventory.activeOutfitId))
    return e.gameplay.outfits.find(({ id: i }) => i === t.inventory.activeOutfitId)?.portraitAssetId;
}
function $1(e, t, i) {
  if (!e) return !0;
  const a = e.allOf?.every((s) => Do(i, t, s)) ?? !0, o = e.anyOf?.some((s) => Do(i, t, s)) ?? !0;
  return e.fallback === !0 || a && o;
}
class Un {
  constructor(t, i = {}) {
    if (this.script = t, this.sceneById = new Map(t.scenes.map((a) => [a.id, a])), this.now = i.now ?? (() => (/* @__PURE__ */ new Date()).toISOString()), this.save = structuredClone(i.save ?? Ua()), !i.save || !this.sceneById.has(this.save.sceneId)) {
      const a = this.sceneById.get(t.initialSceneId);
      if (!a) throw new Error(`Unknown initial scene: ${t.initialSceneId}`);
      this.save.sceneId = a.id, this.save.chapter = a.chapter, this.save.locationId = a.locationId, a.route !== null && (this.save.route = a.route);
    }
    Ao(this.script, this.save, this.scene), To(this.script, this.save, this.now());
  }
  script;
  sceneById;
  now;
  save;
  get scene() {
    const t = this.sceneById.get(this.save.sceneId);
    if (!t) throw new Error(`Unknown current scene: ${this.save.sceneId}`);
    return t;
  }
  get choices() {
    return this.scene.choices.filter((t) => $1(t.availability, this.save, this.script));
  }
  get effectiveValues() {
    return {
      affectionAlbina: Pi(this.script, this.save, "affectionAlbina"),
      trust: Pi(this.script, this.save, "trust"),
      danger: Pi(this.script, this.save, "danger"),
      artResonance: Pi(this.script, this.save, "artResonance")
    };
  }
  get outfitPortraitAssetId() {
    return O1(this.script, this.save);
  }
  replaceSave(t) {
    if (!this.sceneById.has(t.sceneId)) throw new Error(`Save references unknown scene: ${t.sceneId}`);
    this.save = structuredClone(t), Ao(this.script, this.save, this.scene), To(this.script, this.save, this.now());
  }
  choose(t) {
    const i = this.choices.find((s) => s.id === t);
    if (!i) throw new Error(`Choice is unavailable: ${t}`);
    const a = this.now();
    S1(this.script, this.save, i.effects, a);
    const o = this.sceneById.get(i.nextSceneId);
    if (!o) throw new Error(`Choice references unknown scene: ${i.nextSceneId}`);
    return this.save.sceneId = o.id, this.save.chapter = o.chapter, o.route !== null && (this.save.route = o.route), this.save.locationId = o.locationId, this.save.updatedAt = a, this.save.logs.sceneBranches.push({ choiceId: t, sceneId: o.id, at: this.save.updatedAt }), Ao(this.script, this.save, o), To(this.script, this.save, a), { choice: i, ...i.resultText ? { resultText: i.resultText } : {}, scene: o };
  }
  equip(t) {
    const i = this.now();
    id(this.script, this.save, t, i), this.save.updatedAt = i;
  }
  wearOutfit(t) {
    const i = this.now();
    ad(this.script, this.save, t, i), this.save.updatedAt = i;
  }
  selectProfession(t) {
    const i = this.now();
    od(this.script, this.save, t, i), this.save.updatedAt = i;
  }
  interpolate(t) {
    return t.replaceAll("{{user}}", this.save.playerProfile.name || "你");
  }
}
class P1 {
  constructor(t, i, a, o = (s, n) => fetch(s, n)) {
    this.manifest = t, this.storage = i, this.baseUrl = a, this.fetchAsset = o;
  }
  manifest;
  storage;
  baseUrl;
  fetchAsset;
  inflight = /* @__PURE__ */ new Map();
  remoteUrl(t) {
    return gs(this.manifest, t, this.baseUrl);
  }
  cache(t) {
    return this.singleFlight(`asset:${t}`, () => this.cacheAssetOnce(t));
  }
  async cacheAssetOnce(t) {
    const i = await this.storage.getAssetUrl(t);
    if (i) return i;
    const a = this.remoteUrl(t);
    if (a)
      try {
        const o = await this.fetchAsset(a, { credentials: "omit", mode: "cors" });
        return o.ok ? (await this.storage.cacheAsset(t, await o.blob()), await this.storage.getAssetUrl(t) ?? a) : a;
      } catch {
        return a;
      }
  }
  cachePortrait(t) {
    return this.singleFlight(`portrait:${t}`, () => this.cachePortraitOnce(t));
  }
  async cachePortraitOnce(t) {
    const i = this.manifest.portraits.find((s) => s.id === t);
    if (!i) return;
    const a = await this.storage.getAssetUrl(t);
    if (a) return a;
    const o = `${this.baseUrl.replace(/\/$/u, "")}/${this.manifest.basePath}/${i.path.split("/").map(encodeURIComponent).join("/")}`;
    try {
      const s = await this.fetchAsset(o, { credentials: "omit", mode: "cors" });
      return s.ok ? (await this.storage.cacheAsset(t, await s.blob()), await this.storage.getAssetUrl(t) ?? o) : o;
    } catch {
      return o;
    }
  }
  singleFlight(t, i) {
    const a = this.inflight.get(t);
    if (a) return a;
    const s = i().then(
      (n) => (this.inflight.get(t) === s && this.inflight.delete(t), n),
      (n) => {
        throw this.inflight.get(t) === s && this.inflight.delete(t), n;
      }
    );
    return this.inflight.set(t, s), s;
  }
  async prefetch(t) {
    const i = /* @__PURE__ */ new Map();
    for (const a of new Set(t)) {
      const o = await this.cache(a);
      o && i.set(a, o);
    }
    return i;
  }
}
const ws = "albina-v2-save", Bo = "albinaSaveV2", R1 = "albinaGalgameCardGameSaveV1";
function xo() {
  return typeof window > "u" ? void 0 : window.TavernHelper;
}
function U1(e) {
  return typeof e == "string" ? _s(e) : no(e);
}
function Z1() {
  try {
    const e = typeof localStorage > "u" ? null : localStorage.getItem(ws);
    return e === null ? {} : { result: _s(e) };
  } catch (e) {
    return { error: new ea("storage-read-failed", "Local save storage could not be read.", { cause: e }) };
  }
}
async function Zn(e, t) {
  try {
    await e?.setVariables?.({ [Bo]: t }, { type: "chat" });
  } catch (i) {
    console.warn("[albina-save] unable to persist migrated Tavern Helper save", i);
  }
  try {
    typeof localStorage < "u" && localStorage.setItem(ws, JSON.stringify(t));
  } catch (i) {
    console.warn("[albina-save] unable to persist migrated local save", i);
  }
}
function q1(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
}
function z1() {
  return {
    getChatId: () => xo()?.getChatId?.() ?? "standalone",
    async loadSave() {
      const e = xo(), t = [];
      if (e?.getVariables)
        try {
          const a = await e.getVariables({ type: "chat" });
          for (const o of [Bo, R1]) {
            const s = q1(a, o);
            if (s === void 0) continue;
            const n = U1(s);
            if (!n.ok) {
              t.push(n.error);
              continue;
            }
            return n.source === "v1.0.44" && await Zn(e, n.save), n.save;
          }
        } catch (a) {
          t.push(new ea("storage-read-failed", "Tavern Helper save variables could not be read.", { cause: a }));
        }
      const i = Z1();
      if (i.error && t.push(i.error), i.result?.ok)
        return await Zn(e, i.result.save), i.result.save;
      if (i.result && !i.result.ok && t.push(i.result.error), t.length > 0) throw t[0];
    },
    async saveSave(e) {
      const t = Xc(e), i = xo();
      i?.setVariables && await i.setVariables({ [Bo]: t }, { type: "chat" }), typeof localStorage < "u" && localStorage.setItem(ws, JSON.stringify(t));
    },
    subscribe(e, t) {
      if (typeof window > "u") return () => {
      };
      const i = `albina:${e}`;
      return window.addEventListener(i, t), () => window.removeEventListener(i, t);
    }
  };
}
function F1(e) {
  return new Audio(e);
}
function Vt(e) {
  e && (e.pause(), e.currentTime = 0, e.src = "");
}
class M1 {
  constructor(t = F1) {
    this.createAudio = t;
  }
  createAudio;
  bgm;
  voice;
  voiceEnded;
  voiceQueue = [];
  sfx = /* @__PURE__ */ new Set();
  activeVoiceJob;
  blocked;
  pendingBgmPrevious;
  fadingOut;
  fadeTimer;
  fadeFinish;
  lifecycleGeneration = 0;
  bgmGeneration = 0;
  async playBgm(t, i = 500) {
    this.cancelFade();
    const a = this.lifecycleGeneration, o = ++this.bgmGeneration, s = this.takePreviousBgm(), n = this.createAudio(t);
    n.src = t, n.loop = !0, n.volume = i > 0 ? 0 : this.bgmVolume(), this.bgm = n, this.pendingBgmPrevious = s;
    const r = () => this.isCurrentBgm(n, a, o);
    return await this.tryPlay(n, r) ? (this.pendingBgmPrevious = void 0, !s || i <= 0 ? (Vt(s), n.volume = this.bgmVolume(), !0) : (await this.crossfade(s, n, i), r())) : (r(), !1);
  }
  enqueueVoice(t) {
    const i = new Promise((a) => this.voiceQueue.push({ source: t, resolve: a }));
    return this.playNextVoice(), i;
  }
  async playSfx(t) {
    const i = this.createAudio(t);
    i.src = t, i.loop = !1;
    const a = () => {
      i.removeEventListener("ended", a), this.sfx.delete(i), Vt(i);
    };
    i.addEventListener("ended", a), this.sfx.add(i);
    try {
      return await i.play(), this.sfx.has(i);
    } catch {
      return a(), !1;
    }
  }
  async recoverAutoplay() {
    const t = this.blocked;
    if (!t) return !0;
    const i = this.lifecycleGeneration;
    try {
      return await t.play(), this.isCurrentBlocked(t, i) ? (this.blocked = void 0, t === this.bgm && this.pendingBgmPrevious && (Vt(this.pendingBgmPrevious), this.pendingBgmPrevious = void 0, t.volume = this.bgmVolume()), !0) : !1;
    } catch {
      return !1;
    }
  }
  stopAll() {
    this.lifecycleGeneration += 1, this.bgmGeneration += 1, this.cancelFade(), this.finishVoice(!1), this.voiceQueue.splice(0).forEach((i) => i.resolve(!1));
    const t = /* @__PURE__ */ new Set([this.bgm, this.blocked, this.pendingBgmPrevious, this.fadingOut]);
    this.sfx.forEach((i) => t.add(i)), t.forEach(Vt), this.sfx.clear(), this.bgm = void 0, this.blocked = void 0, this.pendingBgmPrevious = void 0, this.fadingOut = void 0;
  }
  dispose() {
    this.stopAll();
  }
  async tryPlay(t, i) {
    try {
      return await t.play(), i();
    } catch {
      return i() && (this.blocked = t), !1;
    }
  }
  bgmVolume() {
    return this.voice ? 0.25 : 1;
  }
  playNextVoice() {
    if (this.voice || this.voiceQueue.length === 0) return;
    const t = this.voiceQueue.shift(), i = this.createAudio(t.source);
    i.src = t.source, this.voice = i, this.activeVoiceJob = t, this.bgm && (this.bgm.volume = 0.25);
    const a = () => {
      this.finishVoice(!0), this.playNextVoice();
    };
    this.voiceEnded = a, i.addEventListener("ended", a);
    const o = this.lifecycleGeneration;
    this.tryPlay(i, () => this.lifecycleGeneration === o && this.voice === i);
  }
  finishVoice(t) {
    const i = this.voice;
    i && this.voiceEnded && i.removeEventListener("ended", this.voiceEnded), Vt(i), this.blocked === i && (this.blocked = void 0), this.voice = void 0, this.voiceEnded = void 0;
    const a = this.activeVoiceJob;
    this.activeVoiceJob = void 0, i && this.bgm && (this.bgm.volume = 1), a?.resolve(t);
  }
  crossfade(t, i, a) {
    const s = a / 10, n = t.volume;
    let r = 0;
    return new Promise((c) => {
      this.fadingOut = t, this.fadeFinish = c;
      const d = () => {
        r += 1, t.volume = Math.max(0, n * (1 - r / 10)), i.volume = this.bgmVolume() * Math.min(1, r / 10), r >= 10 ? (Vt(t), this.fadingOut = void 0, this.fadeTimer = void 0, this.fadeFinish = void 0, c()) : this.fadeTimer = setTimeout(d, s);
      };
      this.fadeTimer = setTimeout(d, s);
    });
  }
  cancelFade() {
    this.fadeTimer !== void 0 && clearTimeout(this.fadeTimer), this.fadeTimer = void 0, Vt(this.fadingOut), this.fadingOut = void 0, this.fadeFinish?.(), this.fadeFinish = void 0;
  }
  takePreviousBgm() {
    if (this.pendingBgmPrevious) {
      const t = this.pendingBgmPrevious;
      return this.pendingBgmPrevious = void 0, this.blocked === this.bgm && (this.blocked = void 0), Vt(this.bgm), t;
    }
    if (this.blocked === this.bgm) {
      this.blocked = void 0, Vt(this.bgm);
      return;
    }
    return this.bgm;
  }
  isCurrentBgm(t, i, a) {
    return this.lifecycleGeneration === i && this.bgmGeneration === a && this.bgm === t;
  }
  isCurrentBlocked(t, i) {
    const a = this.bgm === t || this.voice === t;
    return this.lifecycleGeneration === i && this.blocked === t && a;
  }
}
class N1 {
  constructor(t) {
    this.storage = t;
  }
  storage;
  async unlock(t, i) {
    return await this.storage.getValue("gallery", t) ? !1 : (await this.storage.setValue("gallery", t, !0), !0);
  }
  async isUnlocked(t, i) {
    return i?.unlockedCg.includes(t) ? !0 : await this.storage.getValue("gallery", t) === !0;
  }
  async list(t) {
    const i = new Set(t?.unlockedCg ?? []);
    for (const a of await this.storage.keys("gallery")) i.add(a);
    return [...i];
  }
}
function L1() {
  return {
    loadImage: (e) => new Promise((t, i) => {
      const a = new Image();
      a.onload = () => t(a), a.onerror = () => i(new Error(`Unable to load portrait: ${e}`)), a.src = e;
    }),
    requestFrame: (e) => requestAnimationFrame(e),
    cancelFrame: (e) => cancelAnimationFrame(e),
    reducedMotion: () => matchMedia("(prefers-reduced-motion: reduce)").matches
  };
}
class H1 {
  constructor(t, i, a = "") {
    this.manifest = t, this.baseUrl = a, this.environment = i ?? L1();
  }
  manifest;
  baseUrl;
  playbacks = /* @__PURE__ */ new Set();
  environment;
  canvasGenerations = /* @__PURE__ */ new WeakMap();
  lifecycleGeneration = 0;
  urlResolver;
  async play(t, i) {
    this.stop(i);
    const a = this.lifecycleGeneration, o = this.nextCanvasGeneration(i), s = this.findPortrait(t), n = i.getContext("2d");
    if (!n) throw new Error("Portrait canvas does not expose a 2D context");
    if (s.animation.kind === "static" || this.environment.reducedMotion()) {
      await this.drawStatic(s, n, i, a, o) && this.isCurrent(i, a, o) && this.playbacks.add({ canvas: i });
      return;
    }
    await this.playStrip(s, n, i, a, o);
  }
  setUrlResolver(t) {
    this.urlResolver = t;
  }
  stop(t) {
    this.nextCanvasGeneration(t);
    for (const i of this.playbacks)
      i.canvas === t && (this.releasePlayback(i), this.playbacks.delete(i));
  }
  stopAll() {
    this.lifecycleGeneration += 1;
    for (const t of this.playbacks) this.releasePlayback(t);
    this.playbacks.clear();
  }
  dispose() {
    this.stopAll();
  }
  findPortrait(t) {
    const i = this.manifest.portraits.find((a) => a.id === t);
    if (!i) throw new Error(`Unknown portrait asset: ${t}`);
    return i;
  }
  assetUrl(t) {
    return `${this.baseUrl ? `${this.baseUrl.replace(/\/$/u, "")}/` : ""}${this.manifest.basePath.replace(/\/$/, "")}/${t}`;
  }
  async drawStatic(t, i, a, o, s) {
    const n = t.fallbackAssetId ? this.manifest.assets.find((c) => c.id === t.fallbackAssetId) : void 0;
    let r;
    try {
      const c = await this.urlResolver?.(n?.id ?? t.id);
      r = await this.environment.loadImage(c ?? this.assetUrl(n?.path ?? t.path));
    } catch {
      return !1;
    }
    if (!this.isCurrent(a, o, s)) return !1;
    if (i.clearRect(0, 0, a.width, a.height), !n && t.animation.kind === "strip") {
      const c = t.animation;
      i.drawImage(r, 0, 0, c.frameWidth, c.frameHeight, 0, 0, a.width, a.height);
    } else i.drawImage(r, 0, 0, a.width, a.height);
    return !0;
  }
  async playStrip(t, i, a, o, s) {
    if (t.animation.kind !== "strip") return;
    const n = t.animation;
    let r;
    try {
      const f = await this.urlResolver?.(t.id);
      r = await this.environment.loadImage(f ?? this.assetUrl(t.path));
    } catch {
      if (!t.fallbackAssetId) return;
      await this.drawStatic(t, i, a, o, s) && this.isCurrent(a, o, s) && this.playbacks.add({ canvas: a });
      return;
    }
    if (!this.isCurrent(a, o, s)) return;
    const c = { canvas: a };
    this.playbacks.add(c);
    let d;
    const u = (f) => {
      if (!this.isCurrent(a, o, s)) return;
      d ??= f;
      const p = f - d, b = Math.floor(p / (1e3 / n.fps)) % n.frameCount;
      i.clearRect(0, 0, a.width, a.height), i.drawImage(r, b * n.frameWidth, 0, n.frameWidth, n.frameHeight, 0, 0, a.width, a.height), c.frameHandle = this.environment.requestFrame(u);
    };
    c.frameHandle = this.environment.requestFrame(u);
  }
  releasePlayback(t) {
    t.frameHandle !== void 0 && this.environment.cancelFrame(t.frameHandle), t.canvas.getContext("2d")?.clearRect(0, 0, t.canvas.width, t.canvas.height);
  }
  nextCanvasGeneration(t) {
    const i = (this.canvasGenerations.get(t) ?? 0) + 1;
    return this.canvasGenerations.set(t, i), i;
  }
  isCurrent(t, i, a) {
    return this.lifecycleGeneration === i && this.canvasGenerations.get(t) === a;
  }
}
const va = "queue";
class J1 {
  constructor(t) {
    this.storage = t;
  }
  storage;
  operationTail = Promise.resolve();
  async enqueue(t) {
    await this.runExclusive(async () => {
      const i = await this.readQueue();
      i.push(t), await this.storage.setValue("specialCg", va, i);
    });
  }
  async peek() {
    return this.runExclusive(async () => (await this.readQueue())[0]);
  }
  async dequeue() {
    return this.runExclusive(async () => {
      const t = await this.readQueue(), i = t.shift();
      return await this.storage.setValue("specialCg", va, t), i;
    });
  }
  async clear() {
    await this.runExclusive(() => this.storage.deleteValue("specialCg", va));
  }
  async readQueue() {
    return await this.storage.getValue("specialCg", va) ?? [];
  }
  runExclusive(t) {
    const i = this.operationTail.then(t, t);
    return this.operationTail = i.then(() => {
    }, () => {
    }), i;
  }
}
const D1 = ["assets", "gallery", "specialCg", "saves"];
class B1 {
  stores = /* @__PURE__ */ new Map();
  async get(t, i) {
    return this.stores.get(t)?.get(i);
  }
  async put(t, i, a) {
    const o = this.stores.get(t) ?? /* @__PURE__ */ new Map();
    o.set(i, a), this.stores.set(t, o);
  }
  async delete(t, i) {
    this.stores.get(t)?.delete(i);
  }
  async keys(t) {
    return [...this.stores.get(t)?.keys() ?? []];
  }
  close() {
    this.stores.clear();
  }
}
class K1 {
  constructor(t = new Y1(), i = new B1()) {
    this.primary = t, this.fallback = i;
  }
  primary;
  fallback;
  primaryFailed = !1;
  get(t, i) {
    return this.run((a) => a.get(t, i));
  }
  put(t, i, a) {
    return this.run((o) => o.put(t, i, a));
  }
  delete(t, i) {
    return this.run((a) => a.delete(t, i));
  }
  keys(t) {
    return this.run((i) => i.keys(t));
  }
  close() {
    this.primary.close(), this.fallback.close();
  }
  async run(t) {
    if (this.primaryFailed) return t(this.fallback);
    try {
      return await t(this.primary);
    } catch {
      return this.primaryFailed = !0, this.primary.close(), t(this.fallback);
    }
  }
}
function G1(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null ? e : void 0;
}
function W1() {
  return new Blob([], { type: "application/octet-stream" });
}
function _a(e) {
  return new Promise((t, i) => {
    e.onsuccess = () => t(e.result), e.onerror = () => i(e.error ?? new Error("IndexedDB request failed"));
  });
}
class Y1 {
  constructor(t = indexedDB, i = "albina-runtime-v2") {
    this.factory = t, this.databaseName = i;
  }
  factory;
  databaseName;
  database;
  async get(t, i) {
    const a = await this.open();
    return _a(a.transaction(t, "readonly").objectStore(t).get(i));
  }
  async put(t, i, a) {
    const o = await this.open();
    await _a(o.transaction(t, "readwrite").objectStore(t).put(a, i));
  }
  async delete(t, i) {
    const a = await this.open();
    await _a(a.transaction(t, "readwrite").objectStore(t).delete(i));
  }
  async keys(t) {
    const i = await this.open();
    return (await _a(i.transaction(t, "readonly").objectStore(t).getAllKeys())).map(String);
  }
  close() {
    this.database?.then((t) => t.close(), () => {
    }), this.database = void 0;
  }
  open() {
    return this.database ??= new Promise((t, i) => {
      const a = this.factory.open(this.databaseName, 1);
      a.onupgradeneeded = () => {
        for (const o of D1)
          a.result.objectStoreNames.contains(o) || a.result.createObjectStore(o);
      }, a.onsuccess = () => t(a.result), a.onerror = () => i(a.error ?? new Error("Unable to open IndexedDB"));
    }), this.database;
  }
}
function X1() {
  if (typeof URL.createObjectURL == "function")
    return { createObjectURL: (e) => URL.createObjectURL(e), revokeObjectURL: (e) => URL.revokeObjectURL(e) };
}
class Q1 {
  constructor(t = new K1(), i) {
    this.backend = t, this.urlApi = i ?? X1();
  }
  backend;
  objectUrls = /* @__PURE__ */ new Map();
  pendingObjectUrls = /* @__PURE__ */ new Map();
  urlApi;
  objectUrlGeneration = 0;
  async cacheAsset(t, i) {
    this.objectUrlGeneration += 1, this.pendingObjectUrls.clear(), this.releaseObjectUrl(t), await this.backend.put("assets", t, i);
  }
  async getCachedAsset(t) {
    return this.backend.get("assets", t);
  }
  async getAssetUrl(t) {
    const i = this.objectUrls.get(t);
    if (i) return i;
    const a = this.pendingObjectUrls.get(t);
    if (a) return a;
    const o = this.objectUrlGeneration, s = this.createAssetUrl(t, o);
    this.pendingObjectUrls.set(t, s);
    const n = () => {
      this.pendingObjectUrls.get(t) === s && this.pendingObjectUrls.delete(t);
    };
    return s.then(n, n), s;
  }
  async saveSnapshot(t, i) {
    const a = Xc(t);
    await this.backend.put("saves", a.saveId, { save: a, thumbnail: i });
  }
  async loadSnapshot(t) {
    const i = await this.backend.get("saves", t);
    if (i === void 0) return;
    const a = G1(i), o = a && Object.prototype.hasOwnProperty.call(a, "save"), s = o ? a.save : i, n = no(s);
    if (!n.ok) throw n.error;
    const r = o && a.thumbnail instanceof Blob ? a.thumbnail : W1();
    return (n.source === "v1.0.44" || !o || !(a.thumbnail instanceof Blob)) && await this.backend.put("saves", t, { save: n.save, thumbnail: r }), { save: n.save, thumbnail: r };
  }
  getValue(t, i) {
    return this.backend.get(t, i);
  }
  setValue(t, i, a) {
    return this.backend.put(t, i, a);
  }
  deleteValue(t, i) {
    return this.backend.delete(t, i);
  }
  keys(t) {
    return this.backend.keys(t);
  }
  releaseObjectUrls() {
    this.objectUrlGeneration += 1, this.pendingObjectUrls.clear();
    for (const t of [...this.objectUrls.keys()]) this.releaseObjectUrl(t);
  }
  dispose() {
    this.releaseObjectUrls(), this.backend.close();
  }
  releaseObjectUrl(t) {
    const i = this.objectUrls.get(t);
    i && (this.urlApi?.revokeObjectURL(i), this.objectUrls.delete(t));
  }
  async createAssetUrl(t, i) {
    const a = await this.getCachedAsset(t);
    if (!a || !this.urlApi || i !== this.objectUrlGeneration) return;
    const o = this.objectUrls.get(t);
    if (o) return o;
    const s = this.urlApi.createObjectURL(a);
    if (i !== this.objectUrlGeneration) {
      this.urlApi.revokeObjectURL(s);
      return;
    }
    return this.objectUrls.set(t, s), s;
  }
}
class e2 {
  active;
  write(t, i, a = 24) {
    return this.cancel(), t.length === 0 ? (i(""), Promise.resolve("")) : new Promise((o) => {
      let s = 0;
      const n = { text: t, sink: i, visible: "", resolve: o }, r = () => {
        n.visible = t.slice(0, s + 1), s += 1, i(n.visible), s >= t.length ? this.settle(n, t) : n.timer = setTimeout(r, Math.max(0, a));
      };
      this.active = n, n.timer = setTimeout(r, Math.max(0, a));
    });
  }
  cancel() {
    const t = this.active;
    t && this.settle(t, t.visible);
  }
  completeNow() {
    const t = this.active;
    t && (t.visible !== t.text && t.sink(t.text), this.settle(t, t.text));
  }
  dispose() {
    this.cancel();
  }
  settle(t, i) {
    this.active === t && (t.timer !== void 0 && clearTimeout(t.timer), this.active = void 0, t.resolve(i));
  }
}
class t2 {
  constructor(t) {
    this.bindings = t;
  }
  bindings;
  getChatId() {
    return this.bindings.getChatId();
  }
  async loadSave() {
    const t = await this.bindings.loadSave();
    if (t === void 0) return;
    const i = no(t);
    if (!i.ok) throw i.error;
    return i.save;
  }
  saveSave(t) {
    return this.bindings.saveSave(t);
  }
  subscribe(t, i) {
    return this.bindings.subscribe(t, i);
  }
}
class i2 {
  host;
  audio;
  portraits;
  gallery;
  storage;
  specialCg;
  typewriter = new e2();
  subscriptions = [];
  mounted = !1;
  constructor(t) {
    this.host = new t2(t.host), this.audio = new M1(t.audioFactory), this.storage = new Q1(t.storageBackend, t.objectUrls), this.portraits = new H1(t.manifest, t.portraits, t.assetBaseUrl), this.gallery = new N1(this.storage), this.specialCg = new J1(this.storage);
  }
  mount() {
    this.mounted || (this.mounted = !0, this.subscriptions = [
      this.host.subscribe("chatChanged", () => this.releaseTransientResources()),
      this.host.subscribe("load", () => this.releaseTransientResources()),
      this.host.subscribe("unmount", () => this.unmount())
    ]);
  }
  releaseTransientResources() {
    this.typewriter.cancel(), this.portraits.stopAll(), this.audio.stopAll(), this.storage.releaseObjectUrls();
  }
  unmount() {
    this.releaseTransientResources(), this.subscriptions.splice(0).forEach((t) => t()), this.storage.dispose(), this.mounted = !1;
  }
}
function a2(e) {
  return new i2(e);
}
function sd(e) {
  return new Promise((t) => {
    try {
      e.toBlob((i) => t(i ?? void 0), "image/jpeg", 0.82);
    } catch {
      t(void 0);
    }
  });
}
async function o2() {
  const e = document.createElement("canvas");
  e.width = 480, e.height = 270;
  const t = e.getContext("2d");
  if (!t) return new Blob(["thumbnail unavailable"], { type: "text/plain" });
  const i = t.createLinearGradient(0, 0, e.width, e.height);
  return i.addColorStop(0, "#050812"), i.addColorStop(1, "#3a2b13"), t.fillStyle = i, t.fillRect(0, 0, e.width, e.height), t.fillStyle = "#e2c46e", t.font = "28px serif", t.fillText("ALBINA", 28, 54), await sd(e) ?? new Blob(["thumbnail unavailable"], { type: "text/plain" });
}
async function qn(e = document) {
  const t = document.createElement("canvas");
  t.width = 480, t.height = 270;
  const i = t.getContext("2d");
  if (!i) return { blob: new Blob(["thumbnail unavailable"], { type: "text/plain" }), capturedMedia: !1 };
  const a = e.querySelector(".game-screen__video, .game-screen__cg, .game-screen__background");
  let o = !1;
  if (a)
    try {
      i.drawImage(a, 0, 0, t.width, t.height), o = !0;
    } catch {
      o = !1;
    }
  if (!o) {
    const n = i.createLinearGradient(0, 0, t.width, t.height);
    n.addColorStop(0, "#050812"), n.addColorStop(1, "#3a2b13"), i.fillStyle = n, i.fillRect(0, 0, t.width, t.height), i.fillStyle = "#e2c46e", i.font = "28px serif", i.fillText("ALBINA", 28, 54);
  }
  const s = await sd(t);
  return { blob: s ?? await o2(), capturedMedia: !!(s && o) };
}
function nd(e, t) {
  if (!(!t.videoEnabled || t.reducedMotion))
    return t.desktop && e.desktopVideoAssetId ? e.desktopVideoAssetId : e.videoAssetId;
}
function s2(e, t, i, a = (o) => gs(t, o, i.baseUrl)) {
  const o = e.cgAssetId ?? e.backgroundAssetId, s = a(o), n = a(e.backgroundAssetId), r = nd(e, i), c = r ? a(r) : void 0;
  return { ...n ? { backgroundUrl: n } : {}, ...s ? { fallbackUrl: s } : {}, ...c ? { videoUrl: c } : {} };
}
const ti = gg(Sg), Ji = Ng(Pg, ti), zn = new Map(Ji.scenes.map((e) => [e.id, e])), n2 = new Set(Ji.gameplay.outfits.map((e) => e.portraitAssetId)), r2 = /* @__PURE__ */ new Set(["portrait.albina.normal", ...n2]);
function c2() {
  return new URL(
    /* @vite-ignore */
    "../",
    import.meta.url
  ).href;
}
const d2 = /* @__PURE__ */ zl("albina-game", () => {
  const e = c2(), t = Ki(a2({ manifest: ti, host: z1(), assetBaseUrl: e })), i = Ki(new P1(ti, t.storage, e));
  t.portraits.setUrlResolver(async (x) => ti.portraits.some((q) => q.id === x) ? i.cachePortrait(x) : i.cache(x));
  const a = /* @__PURE__ */ zd(new Un(Ji)), o = /* @__PURE__ */ Te("title"), s = /* @__PURE__ */ Te(""), n = /* @__PURE__ */ Te(), r = /* @__PURE__ */ Te(!1), c = /* @__PURE__ */ Te(!1), d = /* @__PURE__ */ Te(!0), u = /* @__PURE__ */ Te(!1), f = /* @__PURE__ */ Te(!1), p = /* @__PURE__ */ Te([]), b = /* @__PURE__ */ Te({}), E = /* @__PURE__ */ Te({}), M = /* @__PURE__ */ Te([]), J = /* @__PURE__ */ Te(), se = /* @__PURE__ */ Te(), X = /* @__PURE__ */ new Set(), W = typeof matchMedia == "function" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0, j = /* @__PURE__ */ Te(W?.matches ?? !1), L = /* @__PURE__ */ Te(typeof innerWidth == "number" ? innerWidth > 800 : !0);
  let je, ke, Q;
  const ie = (x) => {
    j.value = x.matches, x.matches ? H(ae.value.cgAssetId ?? ae.value.backgroundAssetId) : st(ae.value);
  }, _e = () => {
    L.value = innerWidth > 800, st(ae.value);
  };
  W?.addEventListener("change", ie), typeof window < "u" && (window.addEventListener("resize", _e), window.addEventListener("orientationchange", _e));
  const ae = Je(() => {
    const x = a.value.scene, q = a.value.outfitPortraitAssetId;
    return q ? {
      ...x,
      portraits: x.portraits.map((oe) => oe.characterId === "albina" && r2.has(oe.portraitAssetId) ? { ...oe, portraitAssetId: q } : oe)
    } : x;
  }), Ue = Je(() => a.value.save), Ge = Je(() => a.value.effectiveValues), ot = Je(() => a.value.choices), gt = Je(() => s2(ae.value, ti, {
    baseUrl: e,
    desktop: L.value,
    reducedMotion: j.value,
    videoEnabled: d.value && !f.value
  }, (x) => x?.startsWith("video.") && !E.value[x] ? void 0 : C(x)));
  function le(x, q) {
    const oe = q instanceof ea;
    J.value = {
      code: oe ? q.code : "unexpected",
      message: `${x}: ${oe ? q.message : "The save operation could not be completed."}`,
      recoverable: !0
    };
  }
  function Y(x) {
    if (!zn.has(x.sceneId))
      throw new ea("unknown-scene", `The save references unavailable scene "${x.sceneId}".`);
    return x;
  }
  function re(x) {
    a.value = new Un(Ji, { save: Y(x) }), J.value = void 0;
  }
  function C(x) {
    if (x)
      return b.value[x] ?? gs(ti, x, e);
  }
  async function H(x) {
    if (!x) return;
    const q = await i.cache(x);
    q && (b.value = { ...b.value, [x]: q });
  }
  async function v(x) {
    const q = [
      x.backgroundAssetId,
      x.cgAssetId,
      x.voiceAssetId,
      x.bgmAssetId,
      ...x.sfxAssetIds ?? []
    ].filter((he) => !!he), oe = await i.prefetch(q);
    oe.size && (b.value = { ...b.value, ...Object.fromEntries(oe) });
    for (const he of x.portraits) await i.cachePortrait(he.portraitAssetId);
  }
  function pe() {
    return { baseUrl: e, desktop: L.value, reducedMotion: j.value, videoEnabled: d.value && !f.value };
  }
  async function st(x) {
    const q = nd(x, pe());
    if (!q || E.value[q]) return;
    const oe = await i.cache(q);
    oe && (b.value = { ...b.value, [q]: oe }, E.value = { ...E.value, [q]: !0 });
  }
  function ro() {
    const x = ae.value.choices.map((q) => zn.get(q.nextSceneId)).filter((q) => !!q);
    (async () => {
      for (const q of x) await v(q);
    })();
  }
  async function da() {
    if (!c.value) {
      if (ae.value.bgmAssetId && je !== ae.value.bgmAssetId) {
        je = ae.value.bgmAssetId;
        const x = C(je);
        x && (u.value = !await t.audio.playBgm(x));
      }
      for (const x of ae.value.sfxAssetIds ?? []) {
        const q = C(x);
        q && t.audio.playSfx(q);
      }
      if (ae.value.voiceAssetId) {
        const x = C(ae.value.voiceAssetId);
        x && t.audio.enqueueVoice(x);
      }
    }
  }
  async function lt() {
    f.value = !1, await v(ae.value), s.value = "";
    const x = a.value.interpolate(ae.value.text);
    t.typewriter.write(x, (q) => {
      s.value = q;
    }, j.value ? 0 : 18), da(), ae.value.cgAssetId && (await t.gallery.unlock(ae.value.cgAssetId, Ue.value), ke !== ae.value.id && (ke = ae.value.id, await t.specialCg.enqueue({ id: ae.value.id, assetId: ae.value.cgAssetId })), p.value = await t.gallery.list(Ue.value)), st(ae.value), ro();
  }
  async function Kt() {
    J.value = void 0, t.mount(), o.value = "game", await lt();
  }
  async function Ti() {
    let x;
    try {
      const q = await t.host.loadSave();
      if (q) return Y(q);
    } catch (q) {
      x = q;
    }
    try {
      const q = await t.storage.loadSnapshot("quick-save");
      if (q) return Y(q.save);
    } catch (q) {
      x ??= q;
    }
    if (x !== void 0) throw x;
  }
  async function ua() {
    r.value = !0, J.value = void 0;
    try {
      const x = await Ti();
      return x ? (re(x), await Kt(), !0) : !1;
    } catch (x) {
      return le("Unable to continue", x), !1;
    } finally {
      r.value = !1;
    }
  }
  async function Gt(x) {
    t.typewriter.completeNow();
    const q = a.value.choose(x);
    Ss(a), n.value = q.resultText ? a.value.interpolate(q.resultText) : void 0;
    const oe = q.choice.resultVoiceAssetId;
    await H(oe);
    const he = C(oe);
    !c.value && he && t.audio.enqueueVoice(he), n.value || await lt();
  }
  async function ks() {
    n.value = void 0, await lt();
  }
  async function l(x, q) {
    const oe = (/* @__PURE__ */ new Date()).toISOString(), he = { ...structuredClone(Ue.value), saveId: x, updatedAt: oe }, Qe = Q ?? (await qn()).blob;
    await t.storage.saveSnapshot(he, Qe), q && await t.host.saveSave(he), await T(), J.value = void 0;
  }
  async function m() {
    await l("quick-save", !0);
  }
  async function _(x) {
    await l(`slot-${x}`, !1);
  }
  async function T() {
    X.forEach((he) => URL.revokeObjectURL(he)), X.clear();
    const x = [];
    let q, oe;
    try {
      oe = await t.storage.keys("saves");
    } catch (he) {
      M.value = [], le("Save slots could not be listed", he);
      return;
    }
    for (const he of oe) {
      let Qe;
      try {
        Qe = await t.storage.loadSnapshot(he);
      } catch (rd) {
        q ??= rd;
        continue;
      }
      if (!Qe) continue;
      const Wt = Qe.thumbnail.type.startsWith("image/") ? URL.createObjectURL(Qe.thumbnail) : void 0;
      Wt && X.add(Wt), x.push({ id: he, sceneId: Qe.save.sceneId, updatedAt: Qe.save.updatedAt, ...Wt ? { thumbnailUrl: Wt } : {} });
    }
    M.value = x.sort((he, Qe) => Qe.updatedAt.localeCompare(he.updatedAt)), q !== void 0 ? le("Some save slots could not be read", q) : J.value = void 0;
  }
  async function I() {
    o.value === "game" && (Q = (await qn()).blob), await T(), o.value = "saves";
  }
  async function w(x) {
    try {
      const q = await t.storage.loadSnapshot(x);
      return q ? (re(q.save), o.value = "game", await lt(), !0) : !1;
    } catch (q) {
      return le(`Unable to load ${x}`, q), !1;
    }
  }
  async function O(x) {
    await t.storage.deleteValue("saves", x), await T();
  }
  function V() {
    return a1(Ue.value);
  }
  async function S(x) {
    const q = _s(x);
    if (!q.ok)
      return le("Unable to import save", q.error), !1;
    try {
      return re(q.save), o.value = "game", await lt(), !0;
    } catch (oe) {
      return le("Unable to import save", oe), !1;
    }
  }
  async function k() {
    p.value = await t.gallery.list(Ue.value), await Promise.all(p.value.map(H)), o.value = "gallery";
  }
  function D() {
    o.value = "game";
  }
  async function R() {
    u.value = !await t.audio.recoverAutoplay();
  }
  function N() {
    t.typewriter.completeNow();
  }
  function G() {
    f.value = !0;
  }
  function ne() {
    c.value = !c.value, c.value ? (t.audio.stopAll(), je = void 0) : da();
  }
  function be(x) {
    return x instanceof Error ? /not owned|not unlocked/iu.test(x.message) ? "尚未获得或解锁该项目。" : /unavailable on route/iu.test(x.message) ? "当前路线不能使用该项目。" : /unknown/iu.test(x.message) ? "该项目不存在于当前版本。" : "玩法状态无法更新。" : "玩法状态无法更新。";
  }
  function ce(x) {
    se.value = void 0;
    try {
      return x(), Ss(a), !0;
    } catch (q) {
      return se.value = be(q), !1;
    }
  }
  function Ce(x) {
    return ce(() => a.value.equip(x));
  }
  function Ze(x) {
    return ce(() => a.value.wearOutfit(x));
  }
  function nt(x) {
    return ce(() => a.value.selectProfession(x));
  }
  function rt() {
    W?.removeEventListener("change", ie), typeof window < "u" && (window.removeEventListener("resize", _e), window.removeEventListener("orientationchange", _e)), X.forEach((x) => URL.revokeObjectURL(x)), X.clear();
  }
  return {
    runtime: t,
    manifest: ti,
    gameplay: Ji.gameplay,
    screen: o,
    visibleText: s,
    resultText: n,
    loading: r,
    muted: c,
    videoEnabled: d,
    reducedMotion: j,
    autoplayBlocked: u,
    galleryIds: p,
    saveSlots: M,
    saveError: J,
    scene: ae,
    save: Ue,
    effectiveValues: Ge,
    choices: ot,
    media: gt,
    assetUrl: C,
    start: Kt,
    continueGame: ua,
    choose: Gt,
    dismissResult: ks,
    quickSave: m,
    saveSlot: _,
    openSaves: I,
    restoreSlot: w,
    deleteSlot: O,
    exportSave: V,
    importSave: S,
    openGallery: k,
    backToGame: D,
    recoverAutoplay: R,
    completeText: N,
    setVideoFailed: G,
    toggleMute: ne,
    equip: Ce,
    wearOutfit: Ze,
    selectProfession: nt,
    gameplayError: se,
    disposeUiListeners: rt
  };
}), u2 = ["data-screen"], l2 = {
  key: 0,
  class: "save-error",
  role: "alert",
  "data-testid": "save-error"
}, p2 = {
  key: 1,
  class: "title-screen",
  "data-testid": "title-screen"
}, f2 = { class: "title-screen__content" }, b2 = {
  class: "title-actions",
  "aria-label": "主菜单"
}, h2 = ["disabled"], m2 = { class: "build-state" }, g2 = {
  key: 2,
  class: "panel-screen",
  "data-testid": "saves-screen"
}, v2 = { class: "slot-actions" }, _2 = { class: "save-slot-grid" }, y2 = ["data-save-id"], w2 = ["src"], k2 = ["onClick"], I2 = ["onClick"], A2 = { key: 0 }, T2 = {
  key: 3,
  class: "panel-screen",
  "data-testid": "gallery-screen"
}, x2 = { class: "gallery-grid" }, S2 = ["src", "alt"], V2 = { key: 0 }, j2 = {
  key: 4,
  class: "panel-screen",
  "data-testid": "settings-screen"
}, C2 = ["checked"], E2 = {
  key: 5,
  class: "panel-screen credits-screen",
  "data-testid": "credits-screen"
}, O2 = { class: "credits-notice" }, $2 = {
  class: "credits-list",
  "aria-label": "包内配乐"
}, P2 = { "aria-label": "曲目版权链接" }, R2 = ["href"], U2 = ["href"], Z2 = {
  class: "official-listening",
  "aria-labelledby": "official-soundtrack-title"
}, q2 = { "aria-label": "官方 OST 外部试听" }, z2 = ["href"], F2 = ["href"], M2 = ["data-scene-id"], N2 = ["src"], L2 = ["src", "poster"], H2 = ["src"], J2 = { class: "game-hud" }, D2 = { class: "game-hud__values" }, B2 = {
  key: 0,
  class: "result-overlay",
  "data-testid": "choice-result"
}, K2 = {
  key: 1,
  class: "choice-list"
}, G2 = ["data-choice-id", "onClick"], W2 = {
  key: 0,
  class: "ending-mark"
}, Y2 = { class: "save-tools" }, X2 = /* @__PURE__ */ ss({
  __name: "App",
  setup(e) {
    const t = d2(), i = rg.parse(Jl), a = /* @__PURE__ */ Te(""), o = /* @__PURE__ */ Te(""), s = /* @__PURE__ */ Te(!1), n = /* @__PURE__ */ Te(), r = Je(() => t.galleryIds.map((f) => ({ id: f, url: t.assetUrl(f) })).filter((f) => f.url));
    function c() {
      o.value = t.exportSave();
    }
    async function d() {
      a.value.trim() && await t.importSave(a.value);
    }
    function u() {
      s.value = !1, Ga(() => n.value?.focus());
    }
    return ns(() => {
      t.disposeUiListeners(), t.runtime.unmount();
    }), (f, p) => (U(), Z("main", {
      class: "albina-app",
      "data-albina-application": "",
      "data-screen": A(t).screen
    }, [
      A(t).saveError ? (U(), Z("p", l2, $(A(t).saveError.message), 1)) : et("", !0),
      A(t).screen === "title" ? (U(), Z("section", p2, [
        p[32] || (p[32] = h("div", { class: "title-screen__veil" }, null, -1)),
        h("div", f2, [
          p[29] || (p[29] = h("p", { class: "eyebrow" }, "Canto IX · 独立前端卡", -1)),
          p[30] || (p[30] = h("h1", null, "ALBINA", -1)),
          p[31] || (p[31] = h("p", { class: "subtitle" }, "白色画布上的残响", -1)),
          h("nav", b2, [
            h("button", {
              "data-testid": "new-game",
              onClick: p[0] || (p[0] = //@ts-ignore
              (...b) => A(t).start && A(t).start(...b))
            }, "开始新篇"),
            h("button", {
              "data-testid": "continue-game",
              disabled: A(t).loading,
              onClick: p[1] || (p[1] = //@ts-ignore
              (...b) => A(t).continueGame && A(t).continueGame(...b))
            }, "继续", 8, h2),
            h("button", {
              "data-testid": "title-saves",
              onClick: p[2] || (p[2] = //@ts-ignore
              (...b) => A(t).openSaves && A(t).openSaves(...b))
            }, "存档"),
            h("button", {
              onClick: p[3] || (p[3] = //@ts-ignore
              (...b) => A(t).openGallery && A(t).openGallery(...b))
            }, "CG 图鉴"),
            h("button", {
              "data-testid": "title-settings",
              onClick: p[4] || (p[4] = (b) => A(t).screen = "settings")
            }, "设置"),
            h("button", {
              "data-testid": "title-credits",
              onClick: p[5] || (p[5] = (b) => A(t).screen = "credits")
            }, "版权与鸣谢")
          ]),
          h("p", m2, "v" + $(A(vg)) + " · 确定性主剧情 · 运行时零媒体 API", 1)
        ])
      ])) : A(t).screen === "saves" ? (U(), Z("section", g2, [
        h("header", null, [
          h("button", {
            onClick: p[6] || (p[6] = (b) => A(t).screen = "title")
          }, "返回"),
          p[33] || (p[33] = h("h2", null, "存档管理", -1))
        ]),
        h("div", v2, [
          h("button", {
            "data-testid": "save-slot-1",
            onClick: p[7] || (p[7] = (b) => A(t).saveSlot(1))
          }, "保存到槽位 1"),
          h("button", {
            onClick: p[8] || (p[8] = (b) => A(t).saveSlot(2))
          }, "保存到槽位 2"),
          h("button", {
            onClick: p[9] || (p[9] = (b) => A(t).saveSlot(3))
          }, "保存到槽位 3")
        ]),
        h("div", _2, [
          (U(!0), Z(de, null, ze(A(t).saveSlots, (b) => (U(), Z("article", {
            key: b.id,
            class: "save-slot",
            "data-save-id": b.id
          }, [
            b.thumbnailUrl ? (U(), Z("img", {
              key: 0,
              src: b.thumbnailUrl,
              alt: "存档缩略图"
            }, null, 8, w2)) : et("", !0),
            h("div", null, [
              h("strong", null, $(b.id), 1),
              h("p", null, $(b.sceneId), 1),
              h("time", null, $(b.updatedAt), 1)
            ]),
            h("button", {
              onClick: (E) => A(t).restoreSlot(b.id)
            }, "读取", 8, k2),
            h("button", {
              onClick: (E) => A(t).deleteSlot(b.id)
            }, "删除", 8, I2)
          ], 8, y2))), 128)),
          A(t).saveSlots.length === 0 ? (U(), Z("p", A2, "暂无普通存档。")) : et("", !0)
        ])
      ])) : A(t).screen === "gallery" ? (U(), Z("section", T2, [
        h("header", null, [
          h("button", {
            onClick: p[10] || (p[10] = //@ts-ignore
            (...b) => A(t).backToGame && A(t).backToGame(...b))
          }, "返回"),
          p[34] || (p[34] = h("h2", null, "CG 图鉴", -1))
        ]),
        h("div", x2, [
          (U(!0), Z(de, null, ze(r.value, (b) => (U(), Z("figure", {
            key: b.id
          }, [
            h("img", {
              src: b.url,
              alt: b.id,
              crossorigin: "anonymous"
            }, null, 8, S2),
            h("figcaption", null, $(b.id), 1)
          ]))), 128)),
          r.value.length === 0 ? (U(), Z("p", V2, "尚未解锁 CG。")) : et("", !0)
        ])
      ])) : A(t).screen === "settings" ? (U(), Z("section", j2, [
        h("header", null, [
          h("button", {
            onClick: p[11] || (p[11] = (b) => A(t).screen = "title")
          }, "返回"),
          p[35] || (p[35] = h("h2", null, "演出设置", -1))
        ]),
        h("label", null, [
          $t(h("input", {
            "onUpdate:modelValue": p[12] || (p[12] = (b) => A(t).videoEnabled = b),
            type: "checkbox"
          }, null, 512), [
            [en, A(t).videoEnabled]
          ]),
          p[36] || (p[36] = Nt(" 启用动画 CG（移动端可关闭）", -1))
        ]),
        h("label", null, [
          $t(h("input", {
            "onUpdate:modelValue": p[13] || (p[13] = (b) => A(t).reducedMotion = b),
            type: "checkbox"
          }, null, 512), [
            [en, A(t).reducedMotion]
          ]),
          p[37] || (p[37] = Nt(" 减少动态效果", -1))
        ]),
        h("label", null, [
          h("input", {
            checked: A(t).muted,
            type: "checkbox",
            onChange: p[14] || (p[14] = //@ts-ignore
            (...b) => A(t).toggleMute && A(t).toggleMute(...b))
          }, null, 40, C2),
          p[38] || (p[38] = Nt(" 静音", -1))
        ]),
        h("button", {
          "data-testid": "autoplay-recovery",
          onClick: p[15] || (p[15] = //@ts-ignore
          (...b) => A(t).recoverAutoplay && A(t).recoverAutoplay(...b))
        }, "恢复音频播放"),
        h("button", {
          "data-testid": "settings-credits",
          onClick: p[16] || (p[16] = (b) => A(t).screen = "credits")
        }, "查看版权与鸣谢"),
        p[39] || (p[39] = h("p", { class: "asset-status" }, "运行时不请求媒体生成接口。包内配乐均已登记来源、文件校验值与再分发许可。", -1))
      ])) : A(t).screen === "credits" ? (U(), Z("section", E2, [
        h("header", null, [
          h("button", {
            onClick: p[17] || (p[17] = (b) => A(t).screen = "title")
          }, "返回"),
          p[40] || (p[40] = h("h2", null, "版权与鸣谢", -1))
        ]),
        h("p", O2, $(A(i).packagedNotice), 1),
        h("ol", $2, [
          (U(!0), Z(de, null, ze(A(i).tracks, (b) => (U(), Z("li", {
            key: b.assetId
          }, [
            h("h3", null, $(b.title), 1),
            h("p", null, $(b.creator) + " · ISRC " + $(b.isrc) + " · cue: " + $(b.cueAlias), 1),
            h("p", null, $(b.attribution), 1),
            h("nav", P2, [
              h("a", {
                href: b.sourceUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "曲目来源", 8, R2),
              h("a", {
                href: b.licenseUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "CC BY 4.0 许可", 8, U2)
            ])
          ]))), 128))
        ]),
        h("section", Z2, [
          p[41] || (p[41] = h("h3", { id: "official-soundtrack-title" }, "ProjectMoon 官方 OST", -1)),
          h("p", null, [
            h("strong", null, $(A(i).officialSoundtrack.playlistTitle), 1),
            Nt(" · " + $(A(i).officialSoundtrack.channel) + " · " + $(A(i).officialSoundtrack.playlistTrackCount) + " 首", 1)
          ]),
          h("p", null, $(A(i).officialSoundtrack.notice), 1),
          h("p", null, $(A(i).officialSoundtrack.rightsNotice), 1),
          h("nav", q2, [
            (U(!0), Z(de, null, ze(A(i).officialSoundtrack.links, (b) => (U(), Z("a", {
              key: b.url,
              href: b.url,
              target: "_blank",
              rel: "noopener noreferrer"
            }, $(b.label), 9, z2))), 128)),
            h("a", {
              href: A(i).officialSoundtrack.termsUrl,
              target: "_blank",
              rel: "noopener noreferrer"
            }, "ProjectMoon 服务条款", 8, F2)
          ])
        ])
      ])) : (U(), Z("section", {
        key: 6,
        class: "game-screen",
        "data-testid": "game-screen",
        "data-scene-id": A(t).scene.id
      }, [
        A(t).media.backgroundUrl ? (U(), Z("img", {
          key: 0,
          class: "game-screen__background",
          src: A(t).media.backgroundUrl,
          alt: "",
          crossorigin: "anonymous"
        }, null, 8, N2)) : et("", !0),
        A(t).media.videoUrl ? (U(), Z("video", {
          key: 1,
          class: "game-screen__video",
          src: A(t).media.videoUrl,
          poster: A(t).media.fallbackUrl,
          autoplay: "",
          muted: "",
          loop: "",
          playsinline: "",
          crossorigin: "anonymous",
          "data-testid": "scene-video",
          onError: p[18] || (p[18] = //@ts-ignore
          (...b) => A(t).setVideoFailed && A(t).setVideoFailed(...b))
        }, null, 40, L2)) : A(t).media.fallbackUrl ? (U(), Z("img", {
          key: 2,
          class: "game-screen__cg",
          src: A(t).media.fallbackUrl,
          alt: "剧情 CG",
          "data-testid": "static-fallback",
          crossorigin: "anonymous"
        }, null, 8, H2)) : et("", !0),
        At(Mp, {
          portraits: A(t).scene.portraits,
          service: A(t).runtime.portraits
        }, null, 8, ["portraits", "service"]),
        h("header", J2, [
          h("span", null, "CH." + $(A(t).scene.chapter) + " · " + $(A(t).scene.locationId), 1),
          h("span", D2, "好感 " + $(A(t).effectiveValues.affectionAlbina) + " / 信任 " + $(A(t).effectiveValues.trust) + " / 危险 " + $(A(t).effectiveValues.danger) + " / 共鸣 " + $(A(t).effectiveValues.artResonance), 1),
          h("nav", null, [
            h("button", {
              ref_key: "gameplayButton",
              ref: n,
              "data-testid": "gameplay-open",
              onClick: p[19] || (p[19] = (b) => s.value = !0)
            }, "状态", 512),
            h("button", {
              onClick: p[20] || (p[20] = //@ts-ignore
              (...b) => A(t).quickSave && A(t).quickSave(...b))
            }, "快速存档"),
            h("button", {
              "data-testid": "game-saves",
              onClick: p[21] || (p[21] = //@ts-ignore
              (...b) => A(t).openSaves && A(t).openSaves(...b))
            }, "存档"),
            h("button", {
              onClick: p[22] || (p[22] = //@ts-ignore
              (...b) => A(t).openGallery && A(t).openGallery(...b))
            }, "图鉴"),
            h("button", {
              "data-testid": "game-settings",
              onClick: p[23] || (p[23] = (b) => A(t).screen = "settings")
            }, "设置"),
            h("button", {
              onClick: p[24] || (p[24] = //@ts-ignore
              (...b) => A(t).toggleMute && A(t).toggleMute(...b))
            }, $(A(t).muted ? "启音" : "静音"), 1)
          ])
        ]),
        s.value ? (U(), Dr(zp, {
          key: 3,
          gameplay: A(t).gameplay,
          save: A(t).save,
          "effective-values": A(t).effectiveValues,
          "interaction-error": A(t).gameplayError,
          onClose: u,
          onEquip: A(t).equip,
          onWearOutfit: A(t).wearOutfit,
          onSelectProfession: A(t).selectProfession
        }, null, 8, ["gameplay", "save", "effective-values", "interaction-error", "onEquip", "onWearOutfit", "onSelectProfession"])) : et("", !0),
        h("article", {
          class: "dialogue-box",
          "data-testid": "dialogue-box",
          onClick: p[26] || (p[26] = //@ts-ignore
          (...b) => A(t).completeText && A(t).completeText(...b))
        }, [
          h("h2", null, $(A(t).scene.speaker), 1),
          h("p", null, $(A(t).visibleText), 1),
          A(t).resultText ? (U(), Z("div", B2, [
            h("p", null, $(A(t).resultText), 1),
            h("button", {
              onClick: p[25] || (p[25] = Oa(
                //@ts-ignore
                (...b) => A(t).dismissResult && A(t).dismissResult(...b),
                ["stop"]
              ))
            }, "继续")
          ])) : (U(), Z("div", K2, [
            (U(!0), Z(de, null, ze(A(t).choices, (b) => (U(), Z("button", {
              key: b.id,
              "data-choice-id": b.id,
              onClick: Oa((E) => A(t).choose(b.id), ["stop"])
            }, $(b.text), 9, G2))), 128)),
            A(t).scene.ending ? (U(), Z("p", W2, $(A(t).scene.ending.route) + " · " + $(A(t).scene.ending.kind) + " END", 1)) : et("", !0)
          ]))
        ]),
        h("details", Y2, [
          p[42] || (p[42] = h("summary", null, "存档导入 / 导出", -1)),
          h("button", { onClick: c }, "导出当前存档"),
          $t(h("textarea", {
            "onUpdate:modelValue": p[27] || (p[27] = (b) => o.value = b),
            readonly: "",
            "aria-label": "导出存档"
          }, null, 512), [
            [Qs, o.value]
          ]),
          $t(h("textarea", {
            "onUpdate:modelValue": p[28] || (p[28] = (b) => a.value = b),
            "aria-label": "导入存档",
            placeholder: "粘贴 SaveV2 JSON"
          }, null, 512), [
            [Qs, a.value]
          ]),
          h("button", { onClick: d }, "导入")
        ])
      ], 8, M2))
    ], 8, u2));
  }
});
function Q2(e) {
  const t = Cl(X2);
  return t.use($l()), t.mount(e), t;
}
function ev() {
  if (typeof window > "u" || window.parent === window) return document;
  try {
    return window.parent.document;
  } catch {
    return document;
  }
}
function Fn() {
  if (typeof document > "u") return;
  const e = ev();
  if (e.querySelector("[data-albina-launcher]")) return;
  if (import.meta.url.endsWith("/albina-source.js") && !e.querySelector("link[data-albina-style]")) {
    const i = e.createElement("link");
    i.rel = "stylesheet", i.dataset.albinaStyle = "v2", i.href = new URL(
      /* @vite-ignore */
      "./albina-source.css",
      import.meta.url
    ).href, e.head.append(i);
  }
  const t = e.createElement("button");
  t.type = "button", t.dataset.albinaLauncher = "v2", t.textContent = "打开阿尔比娜前端", Object.assign(t.style, { position: "fixed", right: "18px", bottom: "18px", zIndex: "2147483646" }), t.addEventListener("click", () => {
    let i = e.querySelector("[data-albina-shell]");
    if (!i) {
      i = e.createElement("section"), i.dataset.albinaShell = "v2", Object.assign(i.style, { position: "fixed", inset: "0", zIndex: "2147483647", background: "#020308" });
      const a = e.createElement("button");
      a.type = "button", a.textContent = "关闭", Object.assign(a.style, { position: "absolute", right: "12px", top: "12px", zIndex: "4" });
      const o = e.createElement("div");
      o.id = "albina-v2-root", i.append(o, a), e.body.append(i);
      const s = Q2(o);
      a.addEventListener("click", () => {
        s.unmount(), i?.remove();
      });
    }
  }), e.body.append(t);
}
typeof window < "u" && !window.__ALBINA_DISABLE_AUTOINSTALL__ && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Fn, { once: !0 }) : Fn());
export {
  _g as ALBINA_CDN_BASE,
  vg as ALBINA_RELEASE_VERSION,
  Fn as installAlbinaOneClick,
  Q2 as mountAlbinaApplication
};
