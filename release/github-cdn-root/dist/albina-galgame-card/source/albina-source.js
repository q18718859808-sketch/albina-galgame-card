// @__NO_SIDE_EFFECTS__
function sc(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const a of t.split(",")) e[a] = 1;
  return (a) => a in e;
}
const qe = {}, Qi = [], Aa = () => {
}, au = () => !1, wr = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), kr = (t) => t.startsWith("onUpdate:"), yt = Object.assign, cc = (t, e) => {
  const a = t.indexOf(e);
  a > -1 && t.splice(a, 1);
}, Ch = Object.prototype.hasOwnProperty, Oe = (t, e) => Ch.call(t, e), he = Array.isArray, eo = (t) => vn(t) === "[object Map]", _o = (t) => vn(t) === "[object Set]", ad = (t) => vn(t) === "[object Date]", _e = (t) => typeof t == "function", ot = (t) => typeof t == "string", na = (t) => typeof t == "symbol", ze = (t) => t !== null && typeof t == "object", iu = (t) => (ze(t) || _e(t)) && _e(t.then) && _e(t.catch), ou = Object.prototype.toString, vn = (t) => ou.call(t), Ph = (t) => vn(t).slice(8, -1), nu = (t) => vn(t) === "[object Object]", Ir = (t) => ot(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Uo = /* @__PURE__ */ sc(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ar = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return ((a) => e[a] || (e[a] = t(a)));
}, Rh = /-\w/g, ca = Ar(
  (t) => t.replace(Rh, (e) => e.slice(1).toUpperCase())
), Vh = /\B([A-Z])/g, hi = Ar(
  (t) => t.replace(Vh, "-$1").toLowerCase()
), ru = Ar((t) => t.charAt(0).toUpperCase() + t.slice(1)), Kr = Ar(
  (t) => t ? `on${ru(t)}` : ""
), ya = (t, e) => !Object.is(t, e), Bn = (t, ...e) => {
  for (let a = 0; a < t.length; a++)
    t[a](...e);
}, su = (t, e, a, i = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: i,
    value: a
  });
}, xr = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let id;
const Tr = () => id || (id = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ua(t) {
  if (he(t)) {
    const e = {};
    for (let a = 0; a < t.length; a++) {
      const i = t[a], o = ot(i) ? $h(i) : Ua(i);
      if (o)
        for (const n in o)
          e[n] = o[n];
    }
    return e;
  } else if (ot(t) || ze(t))
    return t;
}
const Eh = /;(?![^(]*\))/g, Oh = /:([^]+)/, Mh = /\/\*[^]*?\*\//g;
function $h(t) {
  const e = {};
  return t.replace(Mh, "").split(Eh).forEach((a) => {
    if (a) {
      const i = a.split(Oh);
      i.length > 1 && (e[i[0].trim()] = i[1].trim());
    }
  }), e;
}
function we(t) {
  let e = "";
  if (ot(t))
    e = t;
  else if (he(t))
    for (let a = 0; a < t.length; a++) {
      const i = we(t[a]);
      i && (e += i + " ");
    }
  else if (ze(t))
    for (const a in t)
      t[a] && (e += a + " ");
  return e.trim();
}
const jh = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", zh = /* @__PURE__ */ sc(jh);
function cu(t) {
  return !!t || t === "";
}
function Uh(t, e) {
  if (t.length !== e.length) return !1;
  let a = !0;
  for (let i = 0; a && i < t.length; i++)
    a = yo(t[i], e[i]);
  return a;
}
function yo(t, e) {
  if (t === e) return !0;
  let a = ad(t), i = ad(e);
  if (a || i)
    return a && i ? t.getTime() === e.getTime() : !1;
  if (a = na(t), i = na(e), a || i)
    return t === e;
  if (a = he(t), i = he(e), a || i)
    return a && i ? Uh(t, e) : !1;
  if (a = ze(t), i = ze(e), a || i) {
    if (!a || !i)
      return !1;
    const o = Object.keys(t).length, n = Object.keys(e).length;
    if (o !== n)
      return !1;
    for (const r in t) {
      const s = t.hasOwnProperty(r), c = e.hasOwnProperty(r);
      if (s && !c || !s && c || !yo(t[r], e[r]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function dc(t, e) {
  return t.findIndex((a) => yo(a, e));
}
const du = (t) => !!(t && t.__v_isRef === !0), $ = (t) => ot(t) ? t : t == null ? "" : he(t) || ze(t) && (t.toString === ou || !_e(t.toString)) ? du(t) ? $(t.value) : JSON.stringify(t, lu, 2) : String(t), lu = (t, e) => du(e) ? lu(t, e.value) : eo(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (a, [i, o], n) => (a[Yr(i, n) + " =>"] = o, a),
    {}
  )
} : _o(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((a) => Yr(a))
} : na(e) ? Yr(e) : ze(e) && !he(e) && !nu(e) ? String(e) : e, Yr = (t, e = "") => {
  var a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    na(t) ? `Symbol(${(a = t.description) != null ? a : e})` : t
  );
};
let ht;
class uu {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && ht && (ht.active ? (this.parent = ht, this.index = (ht.scopes || (ht.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, a;
      if (this.scopes)
        for (e = 0, a = this.scopes.length; e < a; e++)
          this.scopes[e].pause();
      for (e = 0, a = this.effects.length; e < a; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, a;
      if (this.scopes)
        for (e = 0, a = this.scopes.length; e < a; e++)
          this.scopes[e].resume();
      for (e = 0, a = this.effects.length; e < a; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const a = ht;
      try {
        return ht = this, e();
      } finally {
        ht = a;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ht, ht = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ht === this)
        ht = this.prevScope;
      else {
        let e = ht;
        for (; e; ) {
          if (e.prevScope === this) {
            e.prevScope = this.prevScope;
            break;
          }
          e = e.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let a, i;
      for (a = 0, i = this.effects.length; a < i; a++)
        this.effects[a].stop();
      for (this.effects.length = 0, a = 0, i = this.cleanups.length; a < i; a++)
        this.cleanups[a]();
      if (this.cleanups.length = 0, this.scopes) {
        for (a = 0, i = this.scopes.length; a < i; a++)
          this.scopes[a].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function fu(t) {
  return new uu(t);
}
function pu() {
  return ht;
}
function Fh(t, e = !1) {
  ht && ht.cleanups.push(t);
}
let Ze;
const Xr = /* @__PURE__ */ new WeakSet();
class hu {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ht && (ht.active ? ht.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Xr.has(this) && (Xr.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || mu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, od(this), vu(this);
    const e = Ze, a = da;
    Ze = this, da = !0;
    try {
      return this.fn();
    } finally {
      gu(this), Ze = e, da = a, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        fc(e);
      this.deps = this.depsTail = void 0, od(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Xr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Is(this) && this.run();
  }
  get dirty() {
    return Is(this);
  }
}
let bu = 0, Fo, qo;
function mu(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = qo, qo = t;
    return;
  }
  t.next = Fo, Fo = t;
}
function lc() {
  bu++;
}
function uc() {
  if (--bu > 0)
    return;
  if (qo) {
    let e = qo;
    for (qo = void 0; e; ) {
      const a = e.next;
      e.next = void 0, e.flags &= -9, e = a;
    }
  }
  let t;
  for (; Fo; ) {
    let e = Fo;
    for (Fo = void 0; e; ) {
      const a = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (i) {
          t || (t = i);
        }
      e = a;
    }
  }
  if (t) throw t;
}
function vu(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function gu(t) {
  let e, a = t.depsTail, i = a;
  for (; i; ) {
    const o = i.prevDep;
    i.version === -1 ? (i === a && (a = o), fc(i), qh(i)) : e = i, i.dep.activeLink = i.prevActiveLink, i.prevActiveLink = void 0, i = o;
  }
  t.deps = e, t.depsTail = a;
}
function Is(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (_u(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function _u(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Yo) || (t.globalVersion = Yo, !t.isSSR && t.flags & 128 && (!t.deps && !t._dirty || !Is(t))))
    return;
  t.flags |= 2;
  const e = t.dep, a = Ze, i = da;
  Ze = t, da = !0;
  try {
    vu(t);
    const o = t.fn(t._value);
    (e.version === 0 || ya(o, t._value)) && (t.flags |= 128, t._value = o, e.version++);
  } catch (o) {
    throw e.version++, o;
  } finally {
    Ze = a, da = i, gu(t), t.flags &= -3;
  }
}
function fc(t, e = !1) {
  const { dep: a, prevSub: i, nextSub: o } = t;
  if (i && (i.nextSub = o, t.prevSub = void 0), o && (o.prevSub = i, t.nextSub = void 0), a.subs === t && (a.subs = i, !i && a.computed)) {
    a.computed.flags &= -5;
    for (let n = a.computed.deps; n; n = n.nextDep)
      fc(n, !0);
  }
  !e && !--a.sc && a.map && a.map.delete(a.key);
}
function qh(t) {
  const { prevDep: e, nextDep: a } = t;
  e && (e.nextDep = a, t.prevDep = void 0), a && (a.prevDep = e, t.nextDep = void 0);
}
let da = !0;
const yu = [];
function Ta() {
  yu.push(da), da = !1;
}
function Sa() {
  const t = yu.pop();
  da = t === void 0 ? !0 : t;
}
function od(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const a = Ze;
    Ze = void 0;
    try {
      e();
    } finally {
      Ze = a;
    }
  }
}
let Yo = 0;
class Zh {
  constructor(e, a) {
    this.sub = e, this.dep = a, this.version = a.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class pc {
  // TODO isolatedDeclarations "__v_skip"
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!Ze || !da || Ze === this.computed)
      return;
    let a = this.activeLink;
    if (a === void 0 || a.sub !== Ze)
      a = this.activeLink = new Zh(Ze, this), Ze.deps ? (a.prevDep = Ze.depsTail, Ze.depsTail.nextDep = a, Ze.depsTail = a) : Ze.deps = Ze.depsTail = a, wu(a);
    else if (a.version === -1 && (a.version = this.version, a.nextDep)) {
      const i = a.nextDep;
      i.prevDep = a.prevDep, a.prevDep && (a.prevDep.nextDep = i), a.prevDep = Ze.depsTail, a.nextDep = void 0, Ze.depsTail.nextDep = a, Ze.depsTail = a, Ze.deps === a && (Ze.deps = i);
    }
    return a;
  }
  trigger(e) {
    this.version++, Yo++, this.notify(e);
  }
  notify(e) {
    lc();
    try {
      for (let a = this.subs; a; a = a.prevSub)
        a.sub.notify() && a.sub.dep.notify();
    } finally {
      uc();
    }
  }
}
function wu(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let i = e.deps; i; i = i.nextDep)
        wu(i);
    }
    const a = t.dep.subs;
    a !== t && (t.prevSub = a, a && (a.nextSub = t)), t.dep.subs = t;
  }
}
const er = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ Symbol(
  ""
), As = /* @__PURE__ */ Symbol(
  ""
), Xo = /* @__PURE__ */ Symbol(
  ""
);
function kt(t, e, a) {
  if (da && Ze) {
    let i = er.get(t);
    i || er.set(t, i = /* @__PURE__ */ new Map());
    let o = i.get(a);
    o || (i.set(a, o = new pc()), o.map = i, o.key = a), o.track();
  }
}
function ja(t, e, a, i, o, n) {
  const r = er.get(t);
  if (!r) {
    Yo++;
    return;
  }
  const s = (c) => {
    c && c.trigger();
  };
  if (lc(), e === "clear")
    r.forEach(s);
  else {
    const c = he(t), d = c && Ir(a);
    if (c && a === "length") {
      const l = Number(i);
      r.forEach((u, f) => {
        (f === "length" || f === Xo || !na(f) && f >= l) && s(u);
      });
    } else
      switch ((a !== void 0 || r.has(void 0)) && s(r.get(a)), d && s(r.get(Xo)), e) {
        case "add":
          c ? d && s(r.get("length")) : (s(r.get(Ri)), eo(t) && s(r.get(As)));
          break;
        case "delete":
          c || (s(r.get(Ri)), eo(t) && s(r.get(As)));
          break;
        case "set":
          eo(t) && s(r.get(Ri));
          break;
      }
  }
  uc();
}
function Lh(t, e) {
  const a = er.get(t);
  return a && a.get(e);
}
function Di(t) {
  const e = /* @__PURE__ */ Ve(t);
  return e === t ? e : (kt(e, "iterate", Xo), /* @__PURE__ */ Wt(t) ? e : e.map(la));
}
function Sr(t) {
  return kt(t = /* @__PURE__ */ Ve(t), "iterate", Xo), t;
}
function va(t, e) {
  return /* @__PURE__ */ Za(t) ? ro(/* @__PURE__ */ Fa(t) ? la(e) : e) : la(e);
}
const Nh = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qr(this, Symbol.iterator, (t) => va(this, t));
  },
  concat(...t) {
    return Di(this).concat(
      ...t.map((e) => he(e) ? Di(e) : e)
    );
  },
  entries() {
    return Qr(this, "entries", (t) => (t[1] = va(this, t[1]), t));
  },
  every(t, e) {
    return Ra(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Ra(
      this,
      "filter",
      t,
      e,
      (a) => a.map((i) => va(this, i)),
      arguments
    );
  },
  find(t, e) {
    return Ra(
      this,
      "find",
      t,
      e,
      (a) => va(this, a),
      arguments
    );
  },
  findIndex(t, e) {
    return Ra(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Ra(
      this,
      "findLast",
      t,
      e,
      (a) => va(this, a),
      arguments
    );
  },
  findLastIndex(t, e) {
    return Ra(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Ra(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return es(this, "includes", t);
  },
  indexOf(...t) {
    return es(this, "indexOf", t);
  },
  join(t) {
    return Di(this).join(t);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...t) {
    return es(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Ra(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Ao(this, "pop");
  },
  push(...t) {
    return Ao(this, "push", t);
  },
  reduce(t, ...e) {
    return nd(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return nd(this, "reduceRight", t, e);
  },
  shift() {
    return Ao(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Ra(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Ao(this, "splice", t);
  },
  toReversed() {
    return Di(this).toReversed();
  },
  toSorted(t) {
    return Di(this).toSorted(t);
  },
  toSpliced(...t) {
    return Di(this).toSpliced(...t);
  },
  unshift(...t) {
    return Ao(this, "unshift", t);
  },
  values() {
    return Qr(this, "values", (t) => va(this, t));
  }
};
function Qr(t, e, a) {
  const i = Sr(t), o = i[e]();
  return i !== t && !/* @__PURE__ */ Wt(t) && (o._next = o.next, o.next = () => {
    const n = o._next();
    return n.done || (n.value = a(n.value)), n;
  }), o;
}
const Dh = Array.prototype;
function Ra(t, e, a, i, o, n) {
  const r = Sr(t), s = r !== t && !/* @__PURE__ */ Wt(t), c = r[e];
  if (c !== Dh[e]) {
    const u = c.apply(t, n);
    return s ? la(u) : u;
  }
  let d = a;
  r !== t && (s ? d = function(u, f) {
    return a.call(this, va(t, u), f, t);
  } : a.length > 2 && (d = function(u, f) {
    return a.call(this, u, f, t);
  }));
  const l = c.call(r, d, i);
  return s && o ? o(l) : l;
}
function nd(t, e, a, i) {
  const o = Sr(t), n = o !== t && !/* @__PURE__ */ Wt(t);
  let r = a, s = !1;
  o !== t && (n ? (s = i.length === 0, r = function(d, l, u) {
    return s && (s = !1, d = va(t, d)), a.call(this, d, va(t, l), u, t);
  }) : a.length > 3 && (r = function(d, l, u) {
    return a.call(this, d, l, u, t);
  }));
  const c = o[e](r, ...i);
  return s ? va(t, c) : c;
}
function es(t, e, a) {
  const i = /* @__PURE__ */ Ve(t);
  kt(i, "iterate", Xo);
  const o = i[e](...a);
  return (o === -1 || o === !1) && /* @__PURE__ */ Pr(a[0]) ? (a[0] = /* @__PURE__ */ Ve(a[0]), i[e](...a)) : o;
}
function Ao(t, e, a = []) {
  Ta(), lc();
  const i = (/* @__PURE__ */ Ve(t))[e].apply(t, a);
  return uc(), Sa(), i;
}
const Bh = /* @__PURE__ */ sc("__proto__,__v_isRef,__isVue"), ku = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(na)
);
function Hh(t) {
  na(t) || (t = String(t));
  const e = /* @__PURE__ */ Ve(this);
  return kt(e, "has", t), e.hasOwnProperty(t);
}
class Iu {
  constructor(e = !1, a = !1) {
    this._isReadonly = e, this._isShallow = a;
  }
  get(e, a, i) {
    if (a === "__v_skip") return e.__v_skip;
    const o = this._isReadonly, n = this._isShallow;
    if (a === "__v_isReactive")
      return !o;
    if (a === "__v_isReadonly")
      return o;
    if (a === "__v_isShallow")
      return n;
    if (a === "__v_raw")
      return i === (o ? n ? ab : Su : n ? Tu : xu).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(i) ? e : void 0;
    const r = he(e);
    if (!o) {
      let c;
      if (r && (c = Nh[a]))
        return c;
      if (a === "hasOwnProperty")
        return Hh;
    }
    const s = Reflect.get(
      e,
      a,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ nt(e) ? e : i
    );
    if ((na(a) ? ku.has(a) : Bh(a)) || (o || kt(e, "get", a), n))
      return s;
    if (/* @__PURE__ */ nt(s)) {
      const c = r && Ir(a) ? s : s.value;
      return o && ze(c) ? /* @__PURE__ */ Ts(c) : c;
    }
    return ze(s) ? o ? /* @__PURE__ */ Ts(s) : /* @__PURE__ */ Cr(s) : s;
  }
}
class Au extends Iu {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, a, i, o) {
    let n = e[a];
    const r = he(e) && Ir(a);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Za(n);
      if (!/* @__PURE__ */ Wt(i) && !/* @__PURE__ */ Za(i) && (n = /* @__PURE__ */ Ve(n), i = /* @__PURE__ */ Ve(i)), !r && /* @__PURE__ */ nt(n) && !/* @__PURE__ */ nt(i))
        return d || (n.value = i), !0;
    }
    const s = r ? Number(a) < e.length : Oe(e, a), c = Reflect.set(
      e,
      a,
      i,
      /* @__PURE__ */ nt(e) ? e : o
    );
    return e === /* @__PURE__ */ Ve(o) && c && (s ? ya(i, n) && ja(e, "set", a, i) : ja(e, "add", a, i)), c;
  }
  deleteProperty(e, a) {
    const i = Oe(e, a);
    e[a];
    const o = Reflect.deleteProperty(e, a);
    return o && i && ja(e, "delete", a, void 0), o;
  }
  has(e, a) {
    const i = Reflect.has(e, a);
    return (!na(a) || !ku.has(a)) && kt(e, "has", a), i;
  }
  ownKeys(e) {
    return kt(
      e,
      "iterate",
      he(e) ? "length" : Ri
    ), Reflect.ownKeys(e);
  }
}
class Jh extends Iu {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, a) {
    return !0;
  }
  deleteProperty(e, a) {
    return !0;
  }
}
const Gh = /* @__PURE__ */ new Au(), Wh = /* @__PURE__ */ new Jh(), Kh = /* @__PURE__ */ new Au(!0);
const xs = (t) => t, Vn = (t) => Reflect.getPrototypeOf(t);
function Yh(t, e, a) {
  return function(...i) {
    const o = this.__v_raw, n = /* @__PURE__ */ Ve(o), r = eo(n), s = t === "entries" || t === Symbol.iterator && r, c = t === "keys" && r, d = o[t](...i), l = a ? xs : e ? ro : la;
    return !e && kt(
      n,
      "iterate",
      c ? As : Ri
    ), yt(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: u, done: f } = d.next();
          return f ? { value: u, done: f } : {
            value: s ? [l(u[0]), l(u[1])] : l(u),
            done: f
          };
        }
      }
    );
  };
}
function En(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Xh(t, e) {
  const a = {
    get(o) {
      const n = this.__v_raw, r = /* @__PURE__ */ Ve(n), s = /* @__PURE__ */ Ve(o);
      t || (ya(o, s) && kt(r, "get", o), kt(r, "get", s));
      const { has: c } = Vn(r), d = e ? xs : t ? ro : la;
      if (c.call(r, o))
        return d(n.get(o));
      if (c.call(r, s))
        return d(n.get(s));
      n !== r && n.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !t && kt(/* @__PURE__ */ Ve(o), "iterate", Ri), o.size;
    },
    has(o) {
      const n = this.__v_raw, r = /* @__PURE__ */ Ve(n), s = /* @__PURE__ */ Ve(o);
      return t || (ya(o, s) && kt(r, "has", o), kt(r, "has", s)), o === s ? n.has(o) : n.has(o) || n.has(s);
    },
    forEach(o, n) {
      const r = this, s = r.__v_raw, c = /* @__PURE__ */ Ve(s), d = e ? xs : t ? ro : la;
      return !t && kt(c, "iterate", Ri), s.forEach((l, u) => o.call(n, d(l), d(u), r));
    }
  };
  return yt(
    a,
    t ? {
      add: En("add"),
      set: En("set"),
      delete: En("delete"),
      clear: En("clear")
    } : {
      add(o) {
        const n = /* @__PURE__ */ Ve(this), r = Vn(n), s = /* @__PURE__ */ Ve(o), c = !e && !/* @__PURE__ */ Wt(o) && !/* @__PURE__ */ Za(o) ? s : o;
        return r.has.call(n, c) || ya(o, c) && r.has.call(n, o) || ya(s, c) && r.has.call(n, s) || (n.add(c), ja(n, "add", c, c)), this;
      },
      set(o, n) {
        !e && !/* @__PURE__ */ Wt(n) && !/* @__PURE__ */ Za(n) && (n = /* @__PURE__ */ Ve(n));
        const r = /* @__PURE__ */ Ve(this), { has: s, get: c } = Vn(r);
        let d = s.call(r, o);
        d || (o = /* @__PURE__ */ Ve(o), d = s.call(r, o));
        const l = c.call(r, o);
        return r.set(o, n), d ? ya(n, l) && ja(r, "set", o, n) : ja(r, "add", o, n), this;
      },
      delete(o) {
        const n = /* @__PURE__ */ Ve(this), { has: r, get: s } = Vn(n);
        let c = r.call(n, o);
        c || (o = /* @__PURE__ */ Ve(o), c = r.call(n, o)), s && s.call(n, o);
        const d = n.delete(o);
        return c && ja(n, "delete", o, void 0), d;
      },
      clear() {
        const o = /* @__PURE__ */ Ve(this), n = o.size !== 0, r = o.clear();
        return n && ja(
          o,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    a[o] = Yh(o, t, e);
  }), a;
}
function hc(t, e) {
  const a = Xh(t, e);
  return (i, o, n) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? i : Reflect.get(
    Oe(a, o) && o in i ? a : i,
    o,
    n
  );
}
const Qh = {
  get: /* @__PURE__ */ hc(!1, !1)
}, eb = {
  get: /* @__PURE__ */ hc(!1, !0)
}, tb = {
  get: /* @__PURE__ */ hc(!0, !1)
};
const xu = /* @__PURE__ */ new WeakMap(), Tu = /* @__PURE__ */ new WeakMap(), Su = /* @__PURE__ */ new WeakMap(), ab = /* @__PURE__ */ new WeakMap();
function ib(t) {
  switch (t) {
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
function Cr(t) {
  return /* @__PURE__ */ Za(t) ? t : bc(
    t,
    !1,
    Gh,
    Qh,
    xu
  );
}
// @__NO_SIDE_EFFECTS__
function ob(t) {
  return bc(
    t,
    !1,
    Kh,
    eb,
    Tu
  );
}
// @__NO_SIDE_EFFECTS__
function Ts(t) {
  return bc(
    t,
    !0,
    Wh,
    tb,
    Su
  );
}
function bc(t, e, a, i, o) {
  if (!ze(t) || t.__v_raw && !(e && t.__v_isReactive) || t.__v_skip || !Object.isExtensible(t))
    return t;
  const n = o.get(t);
  if (n)
    return n;
  const r = ib(Ph(t));
  if (r === 0)
    return t;
  const s = new Proxy(
    t,
    r === 2 ? i : a
  );
  return o.set(t, s), s;
}
// @__NO_SIDE_EFFECTS__
function Fa(t) {
  return /* @__PURE__ */ Za(t) ? /* @__PURE__ */ Fa(t.__v_raw) : !!(t && t.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Za(t) {
  return !!(t && t.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Wt(t) {
  return !!(t && t.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Pr(t) {
  return t ? !!t.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Ve(t) {
  const e = t && t.__v_raw;
  return e ? /* @__PURE__ */ Ve(e) : t;
}
function Qo(t) {
  return !Oe(t, "__v_skip") && Object.isExtensible(t) && su(t, "__v_skip", !0), t;
}
const la = (t) => ze(t) ? /* @__PURE__ */ Cr(t) : t, ro = (t) => ze(t) ? /* @__PURE__ */ Ts(t) : t;
// @__NO_SIDE_EFFECTS__
function nt(t) {
  return t ? t.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function ne(t) {
  return Cu(t, !1);
}
// @__NO_SIDE_EFFECTS__
function nb(t) {
  return Cu(t, !0);
}
function Cu(t, e) {
  return /* @__PURE__ */ nt(t) ? t : new rb(t, e);
}
class rb {
  constructor(e, a) {
    this.dep = new pc(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = a ? e : /* @__PURE__ */ Ve(e), this._value = a ? e : la(e), this.__v_isShallow = a;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const a = this._rawValue, i = this.__v_isShallow || /* @__PURE__ */ Wt(e) || /* @__PURE__ */ Za(e);
    e = i ? e : /* @__PURE__ */ Ve(e), ya(e, a) && (this._rawValue = e, this._value = i ? e : la(e), this.dep.trigger());
  }
}
function xo(t) {
  t.dep && t.dep.trigger();
}
function M(t) {
  return /* @__PURE__ */ nt(t) ? t.value : t;
}
const sb = {
  get: (t, e, a) => e === "__v_raw" ? t : M(Reflect.get(t, e, a)),
  set: (t, e, a, i) => {
    const o = t[e];
    return /* @__PURE__ */ nt(o) && !/* @__PURE__ */ nt(a) ? (o.value = a, !0) : Reflect.set(t, e, a, i);
  }
};
function Pu(t) {
  return /* @__PURE__ */ Fa(t) ? t : new Proxy(t, sb);
}
// @__NO_SIDE_EFFECTS__
function cb(t) {
  const e = he(t) ? new Array(t.length) : {};
  for (const a in t)
    e[a] = lb(t, a);
  return e;
}
class db {
  constructor(e, a, i) {
    this._object = e, this._defaultValue = i, this.__v_isRef = !0, this._value = void 0, this._key = na(a) ? a : String(a), this._raw = /* @__PURE__ */ Ve(e);
    let o = !0, n = e;
    if (!he(e) || na(this._key) || !Ir(this._key))
      do
        o = !/* @__PURE__ */ Pr(n) || /* @__PURE__ */ Wt(n);
      while (o && (n = n.__v_raw));
    this._shallow = o;
  }
  get value() {
    let e = this._object[this._key];
    return this._shallow && (e = M(e)), this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    if (this._shallow && /* @__PURE__ */ nt(this._raw[this._key])) {
      const a = this._object[this._key];
      if (/* @__PURE__ */ nt(a)) {
        a.value = e;
        return;
      }
    }
    this._object[this._key] = e;
  }
  get dep() {
    return Lh(this._raw, this._key);
  }
}
function lb(t, e, a) {
  return new db(t, e, a);
}
class ub {
  constructor(e, a, i) {
    this.fn = e, this.setter = a, this._value = void 0, this.dep = new pc(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Yo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !a, this.isSSR = i;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ze !== this)
      return mu(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return _u(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
// @__NO_SIDE_EFFECTS__
function fb(t, e, a = !1) {
  let i, o;
  return _e(t) ? i = t : (i = t.get, o = t.set), new ub(i, o, a);
}
const On = {}, tr = /* @__PURE__ */ new WeakMap();
let Ai;
function pb(t, e = !1, a = Ai) {
  if (a) {
    let i = tr.get(a);
    i || tr.set(a, i = []), i.push(t);
  }
}
function hb(t, e, a = qe) {
  const { immediate: i, deep: o, once: n, scheduler: r, augmentJob: s, call: c } = a, d = (T) => o ? T : /* @__PURE__ */ Wt(T) || o === !1 || o === 0 ? za(T, 1) : za(T);
  let l, u, f, b, y = !1, v = !1;
  if (/* @__PURE__ */ nt(t) ? (u = () => t.value, y = /* @__PURE__ */ Wt(t)) : /* @__PURE__ */ Fa(t) ? (u = () => d(t), y = !0) : he(t) ? (v = !0, y = t.some((T) => /* @__PURE__ */ Fa(T) || /* @__PURE__ */ Wt(T)), u = () => t.map((T) => {
    if (/* @__PURE__ */ nt(T))
      return T.value;
    if (/* @__PURE__ */ Fa(T))
      return d(T);
    if (_e(T))
      return c ? c(T, 2) : T();
  })) : _e(t) ? e ? u = c ? () => c(t, 2) : t : u = () => {
    if (f) {
      Ta();
      try {
        f();
      } finally {
        Sa();
      }
    }
    const T = Ai;
    Ai = l;
    try {
      return c ? c(t, 3, [b]) : t(b);
    } finally {
      Ai = T;
    }
  } : u = Aa, e && o) {
    const T = u, x = o === !0 ? 1 / 0 : o;
    u = () => za(T(), x);
  }
  const g = pu(), k = () => {
    l.stop(), g && g.active && cc(g.effects, l);
  };
  if (n && e) {
    const T = e;
    e = (...x) => {
      const D = T(...x);
      return k(), D;
    };
  }
  let I = v ? new Array(t.length).fill(On) : On;
  const S = (T) => {
    if (!(!(l.flags & 1) || !l.dirty && !T))
      if (e) {
        const x = l.run();
        if (T || o || y || (v ? x.some((D, V) => ya(D, I[V])) : ya(x, I))) {
          f && f();
          const D = Ai;
          Ai = l;
          try {
            const V = [
              x,
              // pass undefined as the old value when it's changed for the first time
              I === On ? void 0 : v && I[0] === On ? [] : I,
              b
            ];
            I = x, c ? c(e, 3, V) : (
              // @ts-expect-error
              e(...V)
            );
          } finally {
            Ai = D;
          }
        }
      } else
        l.run();
  };
  return s && s(S), l = new hu(u), l.scheduler = r ? () => r(S, !1) : S, b = (T) => pb(T, !1, l), f = l.onStop = () => {
    const T = tr.get(l);
    if (T) {
      if (c)
        c(T, 4);
      else
        for (const x of T) x();
      tr.delete(l);
    }
  }, e ? i ? S(!0) : I = l.run() : r ? r(S.bind(null, !0), !0) : l.run(), k.pause = l.pause.bind(l), k.resume = l.resume.bind(l), k.stop = k, k;
}
function za(t, e = 1 / 0, a) {
  if (e <= 0 || !ze(t) || t.__v_skip || (a = a || /* @__PURE__ */ new Map(), (a.get(t) || 0) >= e))
    return t;
  if (a.set(t, e), e--, /* @__PURE__ */ nt(t))
    za(t.value, e, a);
  else if (he(t))
    for (let i = 0; i < t.length; i++)
      za(t[i], e, a);
  else if (_o(t) || eo(t))
    t.forEach((i) => {
      za(i, e, a);
    });
  else if (nu(t)) {
    for (const i in t)
      za(t[i], e, a);
    for (const i of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, i) && za(t[i], e, a);
  }
  return t;
}
function gn(t, e, a, i) {
  try {
    return i ? t(...i) : t();
  } catch (o) {
    Rr(o, e, a);
  }
}
function ua(t, e, a, i) {
  if (_e(t)) {
    const o = gn(t, e, a, i);
    return o && iu(o) && o.catch((n) => {
      Rr(n, e, a);
    }), o;
  }
  if (he(t)) {
    const o = [];
    for (let n = 0; n < t.length; n++)
      o.push(ua(t[n], e, a, i));
    return o;
  }
}
function Rr(t, e, a, i = !0) {
  const o = e ? e.vnode : null, { errorHandler: n, throwUnhandledErrorInProduction: r } = e && e.appContext.config || qe;
  if (e) {
    let s = e.parent;
    const c = e.proxy, d = `https://vuejs.org/error-reference/#runtime-${a}`;
    for (; s; ) {
      const l = s.ec;
      if (l) {
        for (let u = 0; u < l.length; u++)
          if (l[u](t, c, d) === !1)
            return;
      }
      s = s.parent;
    }
    if (n) {
      Ta(), gn(n, null, 10, [
        t,
        c,
        d
      ]), Sa();
      return;
    }
  }
  bb(t, a, o, i, r);
}
function bb(t, e, a, i = !0, o = !1) {
  if (o)
    throw t;
  console.error(t);
}
const Rt = [];
let ba = -1;
const to = [];
let Ya = null, Gi = 0;
const Ru = /* @__PURE__ */ Promise.resolve();
let ar = null;
function Ne(t) {
  const e = ar || Ru;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function mb(t) {
  let e = ba + 1, a = Rt.length;
  for (; e < a; ) {
    const i = e + a >>> 1, o = Rt[i], n = en(o);
    n < t || n === t && o.flags & 2 ? e = i + 1 : a = i;
  }
  return e;
}
function mc(t) {
  if (!(t.flags & 1)) {
    const e = en(t), a = Rt[Rt.length - 1];
    !a || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= en(a) ? Rt.push(t) : Rt.splice(mb(e), 0, t), t.flags |= 1, Vu();
  }
}
function Vu() {
  ar || (ar = Ru.then(Ou));
}
function vb(t) {
  he(t) ? to.push(...t) : Ya && t.id === -1 ? Ya.splice(Gi + 1, 0, t) : t.flags & 1 || (to.push(t), t.flags |= 1), Vu();
}
function rd(t, e, a = ba + 1) {
  for (; a < Rt.length; a++) {
    const i = Rt[a];
    if (i && i.flags & 2) {
      if (t && i.id !== t.uid)
        continue;
      Rt.splice(a, 1), a--, i.flags & 4 && (i.flags &= -2), i(), i.flags & 4 || (i.flags &= -2);
    }
  }
}
function Eu(t) {
  if (to.length) {
    const e = [...new Set(to)].sort(
      (a, i) => en(a) - en(i)
    );
    if (to.length = 0, Ya) {
      Ya.push(...e);
      return;
    }
    for (Ya = e, Gi = 0; Gi < Ya.length; Gi++) {
      const a = Ya[Gi];
      a.flags & 4 && (a.flags &= -2), a.flags & 8 || a(), a.flags &= -2;
    }
    Ya = null, Gi = 0;
  }
}
const en = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function Ou(t) {
  try {
    for (ba = 0; ba < Rt.length; ba++) {
      const e = Rt[ba];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), gn(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; ba < Rt.length; ba++) {
      const e = Rt[ba];
      e && (e.flags &= -2);
    }
    ba = -1, Rt.length = 0, Eu(), ar = null, (Rt.length || to.length) && Ou();
  }
}
let aa = null, Mu = null;
function ir(t) {
  const e = aa;
  return aa = t, Mu = t && t.type.__scopeId || null, e;
}
function gb(t, e = aa, a) {
  if (!e || t._n)
    return t;
  const i = (...o) => {
    i._d && vd(-1);
    const n = ir(e);
    let r;
    try {
      r = t(...o);
    } finally {
      ir(n), i._d && vd(1);
    }
    return r;
  };
  return i._n = !0, i._c = !0, i._d = !0, i;
}
function at(t, e) {
  if (aa === null)
    return t;
  const a = Mr(aa), i = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [n, r, s, c = qe] = e[o];
    n && (_e(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && za(r), i.push({
      dir: n,
      instance: a,
      value: r,
      oldValue: void 0,
      arg: s,
      modifiers: c
    }));
  }
  return t;
}
function yi(t, e, a, i) {
  const o = t.dirs, n = e && e.dirs;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    n && (s.oldValue = n[r].value);
    let c = s.dir[i];
    c && (Ta(), ua(c, a, 8, [
      t.el,
      s,
      t,
      e
    ]), Sa());
  }
}
function _b(t, e) {
  if (Vt) {
    let a = Vt.provides;
    const i = Vt.parent && Vt.parent.provides;
    i === a && (a = Vt.provides = Object.create(i)), a[t] = e;
  }
}
function Zo(t, e, a = !1) {
  const i = cf();
  if (i || Vi) {
    let o = Vi ? Vi._context.provides : i ? i.parent == null || i.ce ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides : void 0;
    if (o && t in o)
      return o[t];
    if (arguments.length > 1)
      return a && _e(e) ? e.call(i && i.proxy) : e;
  }
}
function yb() {
  return !!(cf() || Vi);
}
const wb = /* @__PURE__ */ Symbol.for("v-scx"), kb = () => Zo(wb);
function ut(t, e, a) {
  return $u(t, e, a);
}
function $u(t, e, a = qe) {
  const { immediate: i, deep: o, flush: n, once: r } = a, s = yt({}, a), c = e && i || !e && n !== "post";
  let d;
  if (an) {
    if (n === "sync") {
      const b = kb();
      d = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!c) {
      const b = () => {
      };
      return b.stop = Aa, b.resume = Aa, b.pause = Aa, b;
    }
  }
  const l = Vt;
  s.call = (b, y, v) => ua(b, l, y, v);
  let u = !1;
  n === "post" ? s.scheduler = (b) => {
    $t(b, l && l.suspense);
  } : n !== "sync" && (u = !0, s.scheduler = (b, y) => {
    y ? b() : mc(b);
  }), s.augmentJob = (b) => {
    e && (b.flags |= 4), u && (b.flags |= 2, l && (b.id = l.uid, b.i = l));
  };
  const f = hb(t, e, s);
  return an && (d ? d.push(f) : c && f()), f;
}
function Ib(t, e, a) {
  const i = this.proxy, o = ot(t) ? t.includes(".") ? ju(i, t) : () => i[t] : t.bind(i, i);
  let n;
  _e(e) ? n = e : (n = e.handler, a = e);
  const r = wn(this), s = $u(o, n.bind(i), a);
  return r(), s;
}
function ju(t, e) {
  const a = e.split(".");
  return () => {
    let i = t;
    for (let o = 0; o < a.length && i; o++)
      i = i[a[o]];
    return i;
  };
}
const Ab = /* @__PURE__ */ Symbol("_vte"), xb = (t) => t.__isTeleport, ts = /* @__PURE__ */ Symbol("_leaveCb");
function vc(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, vc(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
// @__NO_SIDE_EFFECTS__
function _n(t, e) {
  return _e(t) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    yt({ name: t.name }, e, { setup: t })
  ) : t;
}
function zu(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function sd(t, e) {
  let a;
  return !!((a = Object.getOwnPropertyDescriptor(t, e)) && !a.configurable);
}
const or = /* @__PURE__ */ new WeakMap();
function Lo(t, e, a, i, o = !1) {
  if (he(t)) {
    t.forEach(
      (v, g) => Lo(
        v,
        e && (he(e) ? e[g] : e),
        a,
        i,
        o
      )
    );
    return;
  }
  if (No(i) && !o) {
    i.shapeFlag & 512 && i.type.__asyncResolved && i.component.subTree.component && Lo(t, e, a, i.component.subTree);
    return;
  }
  const n = i.shapeFlag & 4 ? Mr(i.component) : i.el, r = o ? null : n, { i: s, r: c } = t, d = e && e.r, l = s.refs === qe ? s.refs = {} : s.refs, u = s.setupState, f = /* @__PURE__ */ Ve(u), b = u === qe ? au : (v) => sd(l, v) ? !1 : Oe(f, v), y = (v, g) => !(g && sd(l, g));
  if (d != null && d !== c) {
    if (cd(e), ot(d))
      l[d] = null, b(d) && (u[d] = null);
    else if (/* @__PURE__ */ nt(d)) {
      const v = e;
      y(d, v.k) && (d.value = null), v.k && (l[v.k] = null);
    }
  }
  if (_e(c)) {
    Ta();
    try {
      gn(c, s, 12, [r, l]);
    } finally {
      Sa();
    }
  } else {
    const v = ot(c), g = /* @__PURE__ */ nt(c);
    if (v || g) {
      const k = () => {
        if (t.f) {
          const I = v ? b(c) ? u[c] : l[c] : y() || !t.k ? c.value : l[t.k];
          if (o)
            he(I) && cc(I, n);
          else if (he(I))
            I.includes(n) || I.push(n);
          else if (v)
            l[c] = [n], b(c) && (u[c] = l[c]);
          else {
            const S = [n];
            y(c, t.k) && (c.value = S), t.k && (l[t.k] = S);
          }
        } else v ? (l[c] = r, b(c) && (u[c] = r)) : g && (y(c, t.k) && (c.value = r), t.k && (l[t.k] = r));
      };
      if (r) {
        const I = () => {
          k(), or.delete(t);
        };
        I.id = -1, or.set(t, I), $t(I, a);
      } else
        cd(t), k();
    }
  }
}
function cd(t) {
  const e = or.get(t);
  e && (e.flags |= 8, or.delete(t));
}
Tr().requestIdleCallback;
Tr().cancelIdleCallback;
const No = (t) => !!t.type.__asyncLoader, Uu = (t) => t.type.__isKeepAlive;
function Tb(t, e) {
  Fu(t, "a", e);
}
function Sb(t, e) {
  Fu(t, "da", e);
}
function Fu(t, e, a = Vt) {
  const i = t.__wdc || (t.__wdc = () => {
    let o = a;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return t();
  });
  if (Vr(e, i, a), a) {
    let o = a.parent;
    for (; o && o.parent; )
      Uu(o.parent.vnode) && Cb(i, e, a, o), o = o.parent;
  }
}
function Cb(t, e, a, i) {
  const o = Vr(
    e,
    t,
    i,
    !0
    /* prepend */
  );
  qu(() => {
    cc(i[e], o);
  }, a);
}
function Vr(t, e, a = Vt, i = !1) {
  if (a) {
    const o = a[t] || (a[t] = []), n = e.__weh || (e.__weh = (...r) => {
      Ta();
      const s = wn(a), c = ua(e, a, t, r);
      return s(), Sa(), c;
    });
    return i ? o.unshift(n) : o.push(n), n;
  }
}
const Ha = (t) => (e, a = Vt) => {
  (!an || t === "sp") && Vr(t, (...i) => e(...i), a);
}, Pb = Ha("bm"), yn = Ha("m"), Rb = Ha(
  "bu"
), Vb = Ha("u"), wo = Ha(
  "bum"
), qu = Ha("um"), Eb = Ha(
  "sp"
), Ob = Ha("rtg"), Mb = Ha("rtc");
function $b(t, e = Vt) {
  Vr("ec", t, e);
}
const jb = /* @__PURE__ */ Symbol.for("v-ndc");
function Ee(t, e, a, i) {
  let o;
  const n = a, r = he(t);
  if (r || ot(t)) {
    const s = r && /* @__PURE__ */ Fa(t);
    let c = !1, d = !1;
    s && (c = !/* @__PURE__ */ Wt(t), d = /* @__PURE__ */ Za(t), t = Sr(t)), o = new Array(t.length);
    for (let l = 0, u = t.length; l < u; l++)
      o[l] = e(
        c ? d ? ro(la(t[l])) : la(t[l]) : t[l],
        l,
        void 0,
        n
      );
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let s = 0; s < t; s++)
      o[s] = e(s + 1, s, void 0, n);
  } else if (ze(t))
    if (t[Symbol.iterator])
      o = Array.from(
        t,
        (s, c) => e(s, c, void 0, n)
      );
    else {
      const s = Object.keys(t);
      o = new Array(s.length);
      for (let c = 0, d = s.length; c < d; c++) {
        const l = s[c];
        o[c] = e(t[l], l, c, n);
      }
    }
  else
    o = [];
  return o;
}
const Ss = (t) => t ? df(t) ? Mr(t) : Ss(t.parent) : null, Do = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ yt(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => Ss(t.parent),
    $root: (t) => Ss(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => Lu(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      mc(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = Ne.bind(t.proxy)),
    $watch: (t) => Ib.bind(t)
  })
), as = (t, e) => t !== qe && !t.__isScriptSetup && Oe(t, e), zb = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: a, setupState: i, data: o, props: n, accessCache: r, type: s, appContext: c } = t;
    if (e[0] !== "$") {
      const f = r[e];
      if (f !== void 0)
        switch (f) {
          case 1:
            return i[e];
          case 2:
            return o[e];
          case 4:
            return a[e];
          case 3:
            return n[e];
        }
      else {
        if (as(i, e))
          return r[e] = 1, i[e];
        if (o !== qe && Oe(o, e))
          return r[e] = 2, o[e];
        if (Oe(n, e))
          return r[e] = 3, n[e];
        if (a !== qe && Oe(a, e))
          return r[e] = 4, a[e];
        Cs && (r[e] = 0);
      }
    }
    const d = Do[e];
    let l, u;
    if (d)
      return e === "$attrs" && kt(t.attrs, "get", ""), d(t);
    if (
      // css module (injected by vue-loader)
      (l = s.__cssModules) && (l = l[e])
    )
      return l;
    if (a !== qe && Oe(a, e))
      return r[e] = 4, a[e];
    if (
      // global properties
      u = c.config.globalProperties, Oe(u, e)
    )
      return u[e];
  },
  set({ _: t }, e, a) {
    const { data: i, setupState: o, ctx: n } = t;
    return as(o, e) ? (o[e] = a, !0) : i !== qe && Oe(i, e) ? (i[e] = a, !0) : Oe(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (n[e] = a, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: a, ctx: i, appContext: o, props: n, type: r }
  }, s) {
    let c;
    return !!(a[s] || t !== qe && s[0] !== "$" && Oe(t, s) || as(e, s) || Oe(n, s) || Oe(i, s) || Oe(Do, s) || Oe(o.config.globalProperties, s) || (c = r.__cssModules) && c[s]);
  },
  defineProperty(t, e, a) {
    return a.get != null ? t._.accessCache[e] = 0 : Oe(a, "value") && this.set(t, e, a.value, null), Reflect.defineProperty(t, e, a);
  }
};
function dd(t) {
  return he(t) ? t.reduce(
    (e, a) => (e[a] = null, e),
    {}
  ) : t;
}
let Cs = !0;
function Ub(t) {
  const e = Lu(t), a = t.proxy, i = t.ctx;
  Cs = !1, e.beforeCreate && ld(e.beforeCreate, t, "bc");
  const {
    // state
    data: o,
    computed: n,
    methods: r,
    watch: s,
    provide: c,
    inject: d,
    // lifecycle
    created: l,
    beforeMount: u,
    mounted: f,
    beforeUpdate: b,
    updated: y,
    activated: v,
    deactivated: g,
    beforeDestroy: k,
    beforeUnmount: I,
    destroyed: S,
    unmounted: T,
    render: x,
    renderTracked: D,
    renderTriggered: V,
    errorCaptured: P,
    serverPrefetch: R,
    // public API
    expose: j,
    inheritAttrs: Q,
    // assets
    components: B,
    directives: re,
    filters: de
  } = e;
  if (d && Fb(d, i, null), r)
    for (const Z in r) {
      const K = r[Z];
      _e(K) && (i[Z] = K.bind(a));
    }
  if (o) {
    const Z = o.call(a, a);
    ze(Z) && (t.data = /* @__PURE__ */ Cr(Z));
  }
  if (Cs = !0, n)
    for (const Z in n) {
      const K = n[Z], ue = _e(K) ? K.bind(a, a) : _e(K.get) ? K.get.bind(a, a) : Aa, Te = !_e(K) && _e(K.set) ? K.set.bind(a) : Aa, Se = ve({
        get: ue,
        set: Te
      });
      Object.defineProperty(i, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (Ae) => Se.value = Ae
      });
    }
  if (s)
    for (const Z in s)
      Zu(s[Z], i, a, Z);
  if (c) {
    const Z = _e(c) ? c.call(a) : c;
    Reflect.ownKeys(Z).forEach((K) => {
      _b(K, Z[K]);
    });
  }
  l && ld(l, t, "c");
  function te(Z, K) {
    he(K) ? K.forEach((ue) => Z(ue.bind(a))) : K && Z(K.bind(a));
  }
  if (te(Pb, u), te(yn, f), te(Rb, b), te(Vb, y), te(Tb, v), te(Sb, g), te($b, P), te(Mb, D), te(Ob, V), te(wo, I), te(qu, T), te(Eb, R), he(j))
    if (j.length) {
      const Z = t.exposed || (t.exposed = {});
      j.forEach((K) => {
        Object.defineProperty(Z, K, {
          get: () => a[K],
          set: (ue) => a[K] = ue,
          enumerable: !0
        });
      });
    } else t.exposed || (t.exposed = {});
  x && t.render === Aa && (t.render = x), Q != null && (t.inheritAttrs = Q), B && (t.components = B), re && (t.directives = re), R && zu(t);
}
function Fb(t, e, a = Aa) {
  he(t) && (t = Ps(t));
  for (const i in t) {
    const o = t[i];
    let n;
    ze(o) ? "default" in o ? n = Zo(
      o.from || i,
      o.default,
      !0
    ) : n = Zo(o.from || i) : n = Zo(o), /* @__PURE__ */ nt(n) ? Object.defineProperty(e, i, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (r) => n.value = r
    }) : e[i] = n;
  }
}
function ld(t, e, a) {
  ua(
    he(t) ? t.map((i) => i.bind(e.proxy)) : t.bind(e.proxy),
    e,
    a
  );
}
function Zu(t, e, a, i) {
  let o = i.includes(".") ? ju(a, i) : () => a[i];
  if (ot(t)) {
    const n = e[t];
    _e(n) && ut(o, n);
  } else if (_e(t))
    ut(o, t.bind(a));
  else if (ze(t))
    if (he(t))
      t.forEach((n) => Zu(n, e, a, i));
    else {
      const n = _e(t.handler) ? t.handler.bind(a) : e[t.handler];
      _e(n) && ut(o, n, t);
    }
}
function Lu(t) {
  const e = t.type, { mixins: a, extends: i } = e, {
    mixins: o,
    optionsCache: n,
    config: { optionMergeStrategies: r }
  } = t.appContext, s = n.get(e);
  let c;
  return s ? c = s : !o.length && !a && !i ? c = e : (c = {}, o.length && o.forEach(
    (d) => nr(c, d, r, !0)
  ), nr(c, e, r)), ze(e) && n.set(e, c), c;
}
function nr(t, e, a, i = !1) {
  const { mixins: o, extends: n } = e;
  n && nr(t, n, a, !0), o && o.forEach(
    (r) => nr(t, r, a, !0)
  );
  for (const r in e)
    if (!(i && r === "expose")) {
      const s = qb[r] || a && a[r];
      t[r] = s ? s(t[r], e[r]) : e[r];
    }
  return t;
}
const qb = {
  data: ud,
  props: fd,
  emits: fd,
  // objects
  methods: Ro,
  computed: Ro,
  // lifecycle
  beforeCreate: St,
  created: St,
  beforeMount: St,
  mounted: St,
  beforeUpdate: St,
  updated: St,
  beforeDestroy: St,
  beforeUnmount: St,
  destroyed: St,
  unmounted: St,
  activated: St,
  deactivated: St,
  errorCaptured: St,
  serverPrefetch: St,
  // assets
  components: Ro,
  directives: Ro,
  // watch
  watch: Lb,
  // provide / inject
  provide: ud,
  inject: Zb
};
function ud(t, e) {
  return e ? t ? function() {
    return yt(
      _e(t) ? t.call(this, this) : t,
      _e(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Zb(t, e) {
  return Ro(Ps(t), Ps(e));
}
function Ps(t) {
  if (he(t)) {
    const e = {};
    for (let a = 0; a < t.length; a++)
      e[t[a]] = t[a];
    return e;
  }
  return t;
}
function St(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Ro(t, e) {
  return t ? yt(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function fd(t, e) {
  return t ? he(t) && he(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : yt(
    /* @__PURE__ */ Object.create(null),
    dd(t),
    dd(e ?? {})
  ) : e;
}
function Lb(t, e) {
  if (!t) return e;
  if (!e) return t;
  const a = yt(/* @__PURE__ */ Object.create(null), t);
  for (const i in e)
    a[i] = St(t[i], e[i]);
  return a;
}
function Nu() {
  return {
    app: null,
    config: {
      isNativeTag: au,
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
let Nb = 0;
function Db(t, e) {
  return function(i, o = null) {
    _e(i) || (i = yt({}, i)), o != null && !ze(o) && (o = null);
    const n = Nu(), r = /* @__PURE__ */ new WeakSet(), s = [];
    let c = !1;
    const d = n.app = {
      _uid: Nb++,
      _component: i,
      _props: o,
      _container: null,
      _context: n,
      _instance: null,
      version: km,
      get config() {
        return n.config;
      },
      set config(l) {
      },
      use(l, ...u) {
        return r.has(l) || (l && _e(l.install) ? (r.add(l), l.install(d, ...u)) : _e(l) && (r.add(l), l(d, ...u))), d;
      },
      mixin(l) {
        return n.mixins.includes(l) || n.mixins.push(l), d;
      },
      component(l, u) {
        return u ? (n.components[l] = u, d) : n.components[l];
      },
      directive(l, u) {
        return u ? (n.directives[l] = u, d) : n.directives[l];
      },
      mount(l, u, f) {
        if (!c) {
          const b = d._ceVNode || zt(i, o);
          return b.appContext = n, f === !0 ? f = "svg" : f === !1 && (f = void 0), t(b, l, f), c = !0, d._container = l, l.__vue_app__ = d, Mr(b.component);
        }
      },
      onUnmount(l) {
        s.push(l);
      },
      unmount() {
        c && (ua(
          s,
          d._instance,
          16
        ), t(null, d._container), delete d._container.__vue_app__);
      },
      provide(l, u) {
        return n.provides[l] = u, d;
      },
      runWithContext(l) {
        const u = Vi;
        Vi = d;
        try {
          return l();
        } finally {
          Vi = u;
        }
      }
    };
    return d;
  };
}
let Vi = null;
const Bb = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${ca(e)}Modifiers`] || t[`${hi(e)}Modifiers`];
function Hb(t, e, ...a) {
  if (t.isUnmounted) return;
  const i = t.vnode.props || qe;
  let o = a;
  const n = e.startsWith("update:"), r = n && Bb(i, e.slice(7));
  r && (r.trim && (o = a.map((l) => ot(l) ? l.trim() : l)), r.number && (o = a.map(xr)));
  let s, c = i[s = Kr(e)] || // also try camelCase event handler (#2249)
  i[s = Kr(ca(e))];
  !c && n && (c = i[s = Kr(hi(e))]), c && ua(
    c,
    t,
    6,
    o
  );
  const d = i[s + "Once"];
  if (d) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[s])
      return;
    t.emitted[s] = !0, ua(
      d,
      t,
      6,
      o
    );
  }
}
const Jb = /* @__PURE__ */ new WeakMap();
function Du(t, e, a = !1) {
  const i = a ? Jb : e.emitsCache, o = i.get(t);
  if (o !== void 0)
    return o;
  const n = t.emits;
  let r = {}, s = !1;
  if (!_e(t)) {
    const c = (d) => {
      const l = Du(d, e, !0);
      l && (s = !0, yt(r, l));
    };
    !a && e.mixins.length && e.mixins.forEach(c), t.extends && c(t.extends), t.mixins && t.mixins.forEach(c);
  }
  return !n && !s ? (ze(t) && i.set(t, null), null) : (he(n) ? n.forEach((c) => r[c] = null) : yt(r, n), ze(t) && i.set(t, r), r);
}
function Er(t, e) {
  return !t || !wr(e) ? !1 : (e = e.slice(2), e = e === "Once" ? e : e.replace(/Once$/, ""), Oe(t, e[0].toLowerCase() + e.slice(1)) || Oe(t, hi(e)) || Oe(t, e));
}
function pd(t) {
  const {
    type: e,
    vnode: a,
    proxy: i,
    withProxy: o,
    propsOptions: [n],
    slots: r,
    attrs: s,
    emit: c,
    render: d,
    renderCache: l,
    props: u,
    data: f,
    setupState: b,
    ctx: y,
    inheritAttrs: v
  } = t, g = ir(t);
  let k, I;
  try {
    if (a.shapeFlag & 4) {
      const T = o || i, x = T;
      k = ga(
        d.call(
          x,
          T,
          l,
          u,
          b,
          f,
          y
        )
      ), I = s;
    } else {
      const T = e;
      k = ga(
        T.length > 1 ? T(
          u,
          { attrs: s, slots: r, emit: c }
        ) : T(
          u,
          null
        )
      ), I = e.props ? s : Gb(s);
    }
  } catch (T) {
    Bo.length = 0, Rr(T, t, 1), k = zt(ci);
  }
  let S = k;
  if (I && v !== !1) {
    const T = Object.keys(I), { shapeFlag: x } = S;
    T.length && x & 7 && (n && T.some(kr) && (I = Wb(
      I,
      n
    )), S = so(S, I, !1, !0));
  }
  return a.dirs && (S = so(S, null, !1, !0), S.dirs = S.dirs ? S.dirs.concat(a.dirs) : a.dirs), a.transition && vc(S, a.transition), k = S, ir(g), k;
}
const Gb = (t) => {
  let e;
  for (const a in t)
    (a === "class" || a === "style" || wr(a)) && ((e || (e = {}))[a] = t[a]);
  return e;
}, Wb = (t, e) => {
  const a = {};
  for (const i in t)
    (!kr(i) || !(i.slice(9) in e)) && (a[i] = t[i]);
  return a;
};
function Kb(t, e, a) {
  const { props: i, children: o, component: n } = t, { props: r, children: s, patchFlag: c } = e, d = n.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (a && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return i ? hd(i, r, d) : !!r;
    if (c & 8) {
      const l = e.dynamicProps;
      for (let u = 0; u < l.length; u++) {
        const f = l[u];
        if (Bu(r, i, f) && !Er(d, f))
          return !0;
      }
    }
  } else
    return (o || s) && (!s || !s.$stable) ? !0 : i === r ? !1 : i ? r ? hd(i, r, d) : !0 : !!r;
  return !1;
}
function hd(t, e, a) {
  const i = Object.keys(e);
  if (i.length !== Object.keys(t).length)
    return !0;
  for (let o = 0; o < i.length; o++) {
    const n = i[o];
    if (Bu(e, t, n) && !Er(a, n))
      return !0;
  }
  return !1;
}
function Bu(t, e, a) {
  const i = t[a], o = e[a];
  return a === "style" && ze(i) && ze(o) ? !yo(i, o) : i !== o;
}
function Yb({ vnode: t, parent: e, suspense: a }, i) {
  for (; e; ) {
    const o = e.subTree;
    if (o.suspense && o.suspense.activeBranch === t && (o.suspense.vnode.el = o.el = i, t = o), o === t)
      (t = e.vnode).el = i, e = e.parent;
    else
      break;
  }
  a && a.activeBranch === t && (a.vnode.el = i);
}
const Hu = {}, Ju = () => Object.create(Hu), Gu = (t) => Object.getPrototypeOf(t) === Hu;
function Xb(t, e, a, i = !1) {
  const o = {}, n = Ju();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Wu(t, e, o, n);
  for (const r in t.propsOptions[0])
    r in o || (o[r] = void 0);
  a ? t.props = i ? o : /* @__PURE__ */ ob(o) : t.type.props ? t.props = o : t.props = n, t.attrs = n;
}
function Qb(t, e, a, i) {
  const {
    props: o,
    attrs: n,
    vnode: { patchFlag: r }
  } = t, s = /* @__PURE__ */ Ve(o), [c] = t.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (i || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const l = t.vnode.dynamicProps;
      for (let u = 0; u < l.length; u++) {
        let f = l[u];
        if (Er(t.emitsOptions, f))
          continue;
        const b = e[f];
        if (c)
          if (Oe(n, f))
            b !== n[f] && (n[f] = b, d = !0);
          else {
            const y = ca(f);
            o[y] = Rs(
              c,
              s,
              y,
              b,
              t,
              !1
            );
          }
        else
          b !== n[f] && (n[f] = b, d = !0);
      }
    }
  } else {
    Wu(t, e, o, n) && (d = !0);
    let l;
    for (const u in s)
      (!e || // for camelCase
      !Oe(e, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((l = hi(u)) === u || !Oe(e, l))) && (c ? a && // for camelCase
      (a[u] !== void 0 || // for kebab-case
      a[l] !== void 0) && (o[u] = Rs(
        c,
        s,
        u,
        void 0,
        t,
        !0
      )) : delete o[u]);
    if (n !== s)
      for (const u in n)
        (!e || !Oe(e, u)) && (delete n[u], d = !0);
  }
  d && ja(t.attrs, "set", "");
}
function Wu(t, e, a, i) {
  const [o, n] = t.propsOptions;
  let r = !1, s;
  if (e)
    for (let c in e) {
      if (Uo(c))
        continue;
      const d = e[c];
      let l;
      o && Oe(o, l = ca(c)) ? !n || !n.includes(l) ? a[l] = d : (s || (s = {}))[l] = d : Er(t.emitsOptions, c) || (!(c in i) || d !== i[c]) && (i[c] = d, r = !0);
    }
  if (n) {
    const c = /* @__PURE__ */ Ve(a), d = s || qe;
    for (let l = 0; l < n.length; l++) {
      const u = n[l];
      a[u] = Rs(
        o,
        c,
        u,
        d[u],
        t,
        !Oe(d, u)
      );
    }
  }
  return r;
}
function Rs(t, e, a, i, o, n) {
  const r = t[a];
  if (r != null) {
    const s = Oe(r, "default");
    if (s && i === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && _e(c)) {
        const { propsDefaults: d } = o;
        if (a in d)
          i = d[a];
        else {
          const l = wn(o);
          i = d[a] = c.call(
            null,
            e
          ), l();
        }
      } else
        i = c;
      o.ce && o.ce._setProp(a, i);
    }
    r[
      0
      /* shouldCast */
    ] && (n && !s ? i = !1 : r[
      1
      /* shouldCastTrue */
    ] && (i === "" || i === hi(a)) && (i = !0));
  }
  return i;
}
const em = /* @__PURE__ */ new WeakMap();
function Ku(t, e, a = !1) {
  const i = a ? em : e.propsCache, o = i.get(t);
  if (o)
    return o;
  const n = t.props, r = {}, s = [];
  let c = !1;
  if (!_e(t)) {
    const l = (u) => {
      c = !0;
      const [f, b] = Ku(u, e, !0);
      yt(r, f), b && s.push(...b);
    };
    !a && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l);
  }
  if (!n && !c)
    return ze(t) && i.set(t, Qi), Qi;
  if (he(n))
    for (let l = 0; l < n.length; l++) {
      const u = ca(n[l]);
      bd(u) && (r[u] = qe);
    }
  else if (n)
    for (const l in n) {
      const u = ca(l);
      if (bd(u)) {
        const f = n[l], b = r[u] = he(f) || _e(f) ? { type: f } : yt({}, f), y = b.type;
        let v = !1, g = !0;
        if (he(y))
          for (let k = 0; k < y.length; ++k) {
            const I = y[k], S = _e(I) && I.name;
            if (S === "Boolean") {
              v = !0;
              break;
            } else S === "String" && (g = !1);
          }
        else
          v = _e(y) && y.name === "Boolean";
        b[
          0
          /* shouldCast */
        ] = v, b[
          1
          /* shouldCastTrue */
        ] = g, (v || Oe(b, "default")) && s.push(u);
      }
    }
  const d = [r, s];
  return ze(t) && i.set(t, d), d;
}
function bd(t) {
  return t[0] !== "$" && !Uo(t);
}
const gc = (t) => t === "_" || t === "_ctx" || t === "$stable", _c = (t) => he(t) ? t.map(ga) : [ga(t)], tm = (t, e, a) => {
  if (e._n)
    return e;
  const i = gb((...o) => _c(e(...o)), a);
  return i._c = !1, i;
}, Yu = (t, e, a) => {
  const i = t._ctx;
  for (const o in t) {
    if (gc(o)) continue;
    const n = t[o];
    if (_e(n))
      e[o] = tm(o, n, i);
    else if (n != null) {
      const r = _c(n);
      e[o] = () => r;
    }
  }
}, Xu = (t, e) => {
  const a = _c(e);
  t.slots.default = () => a;
}, Qu = (t, e, a) => {
  for (const i in e)
    (a || !gc(i)) && (t[i] = e[i]);
}, am = (t, e, a) => {
  const i = t.slots = Ju();
  if (t.vnode.shapeFlag & 32) {
    const o = e._;
    o ? (Qu(i, e, a), a && su(i, "_", o, !0)) : Yu(e, i);
  } else e && Xu(t, e);
}, im = (t, e, a) => {
  const { vnode: i, slots: o } = t;
  let n = !0, r = qe;
  if (i.shapeFlag & 32) {
    const s = e._;
    s ? a && s === 1 ? n = !1 : Qu(o, e, a) : (n = !e.$stable, Yu(e, o)), r = e;
  } else e && (Xu(t, e), r = { default: 1 });
  if (n)
    for (const s in o)
      !gc(s) && r[s] == null && delete o[s];
}, $t = cm;
function om(t) {
  return nm(t);
}
function nm(t, e) {
  const a = Tr();
  a.__VUE__ = !0;
  const {
    insert: i,
    remove: o,
    patchProp: n,
    createElement: r,
    createText: s,
    createComment: c,
    setText: d,
    setElementText: l,
    parentNode: u,
    nextSibling: f,
    setScopeId: b = Aa,
    insertStaticContent: y
  } = t, v = (_, A, z, G = null, N = null, J = null, ae = void 0, C = null, O = !!A.dynamicChildren) => {
    if (_ === A)
      return;
    _ && !To(_, A) && (G = Tt(_), Ae(_, N, J, !0), _ = null), A.patchFlag === -2 && (O = !1, A.dynamicChildren = null);
    const { type: m, ref: ee, shapeFlag: ie } = A;
    switch (m) {
      case Or:
        g(_, A, z, G);
        break;
      case ci:
        k(_, A, z, G);
        break;
      case Hn:
        _ == null && I(A, z, G, ae);
        break;
      case me:
        B(
          _,
          A,
          z,
          G,
          N,
          J,
          ae,
          C,
          O
        );
        break;
      default:
        ie & 1 ? x(
          _,
          A,
          z,
          G,
          N,
          J,
          ae,
          C,
          O
        ) : ie & 6 ? re(
          _,
          A,
          z,
          G,
          N,
          J,
          ae,
          C,
          O
        ) : (ie & 64 || ie & 128) && m.process(
          _,
          A,
          z,
          G,
          N,
          J,
          ae,
          C,
          O,
          dt
        );
    }
    ee != null && N ? Lo(ee, _ && _.ref, J, A || _, !A) : ee == null && _ && _.ref != null && Lo(_.ref, null, J, _, !0);
  }, g = (_, A, z, G) => {
    if (_ == null)
      i(
        A.el = s(A.children),
        z,
        G
      );
    else {
      const N = A.el = _.el;
      A.children !== _.children && d(N, A.children);
    }
  }, k = (_, A, z, G) => {
    _ == null ? i(
      A.el = c(A.children || ""),
      z,
      G
    ) : A.el = _.el;
  }, I = (_, A, z, G) => {
    [_.el, _.anchor] = y(
      _.children,
      A,
      z,
      G,
      _.el,
      _.anchor
    );
  }, S = ({ el: _, anchor: A }, z, G) => {
    let N;
    for (; _ && _ !== A; )
      N = f(_), i(_, z, G), _ = N;
    i(A, z, G);
  }, T = ({ el: _, anchor: A }) => {
    let z;
    for (; _ && _ !== A; )
      z = f(_), o(_), _ = z;
    o(A);
  }, x = (_, A, z, G, N, J, ae, C, O) => {
    if (A.type === "svg" ? ae = "svg" : A.type === "math" && (ae = "mathml"), _ == null)
      D(
        A,
        z,
        G,
        N,
        J,
        ae,
        C,
        O
      );
    else {
      const m = _.el && _.el._isVueCE ? _.el : null;
      try {
        m && m._beginPatch(), R(
          _,
          A,
          N,
          J,
          ae,
          C,
          O
        );
      } finally {
        m && m._endPatch();
      }
    }
  }, D = (_, A, z, G, N, J, ae, C) => {
    let O, m;
    const { props: ee, shapeFlag: ie, transition: H, dirs: Y } = _;
    if (O = _.el = r(
      _.type,
      J,
      ee && ee.is,
      ee
    ), ie & 8 ? l(O, _.children) : ie & 16 && P(
      _.children,
      O,
      null,
      G,
      N,
      is(_, J),
      ae,
      C
    ), Y && yi(_, null, G, "created"), V(O, _, _.scopeId, ae, G), ee) {
      for (const ye in ee)
        ye !== "value" && !Uo(ye) && n(O, ye, null, ee[ye], J, G);
      "value" in ee && n(O, "value", null, ee.value, J), (m = ee.onVnodeBeforeMount) && fa(m, G, _);
    }
    Y && yi(_, null, G, "beforeMount");
    const ce = rm(N, H);
    ce && H.beforeEnter(O), i(O, A, z), ((m = ee && ee.onVnodeMounted) || ce || Y) && $t(() => {
      m && fa(m, G, _), ce && H.enter(O), Y && yi(_, null, G, "mounted");
    }, N);
  }, V = (_, A, z, G, N) => {
    if (z && b(_, z), G)
      for (let J = 0; J < G.length; J++)
        b(_, G[J]);
    if (N) {
      let J = N.subTree;
      if (A === J || of(J.type) && (J.ssContent === A || J.ssFallback === A)) {
        const ae = N.vnode;
        V(
          _,
          ae,
          ae.scopeId,
          ae.slotScopeIds,
          N.parent
        );
      }
    }
  }, P = (_, A, z, G, N, J, ae, C, O = 0) => {
    for (let m = O; m < _.length; m++) {
      const ee = _[m] = C ? Ma(_[m]) : ga(_[m]);
      v(
        null,
        ee,
        A,
        z,
        G,
        N,
        J,
        ae,
        C
      );
    }
  }, R = (_, A, z, G, N, J, ae) => {
    const C = A.el = _.el;
    let { patchFlag: O, dynamicChildren: m, dirs: ee } = A;
    O |= _.patchFlag & 16;
    const ie = _.props || qe, H = A.props || qe;
    let Y;
    if (z && wi(z, !1), (Y = H.onVnodeBeforeUpdate) && fa(Y, z, A, _), ee && yi(A, _, z, "beforeUpdate"), z && wi(z, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    m && (!_.dynamicChildren || _.dynamicChildren.length !== m.length) && (O = 0, ae = !1, m = null), (ie.innerHTML && H.innerHTML == null || ie.textContent && H.textContent == null) && l(C, ""), m ? j(
      _.dynamicChildren,
      m,
      C,
      z,
      G,
      is(A, N),
      J
    ) : ae || K(
      _,
      A,
      C,
      null,
      z,
      G,
      is(A, N),
      J,
      !1
    ), O > 0) {
      if (O & 16)
        Q(C, ie, H, z, N);
      else if (O & 2 && ie.class !== H.class && n(C, "class", null, H.class, N), O & 4 && n(C, "style", ie.style, H.style, N), O & 8) {
        const ce = A.dynamicProps;
        for (let ye = 0; ye < ce.length; ye++) {
          const Re = ce[ye], Le = ie[Re], Ge = H[Re];
          (Ge !== Le || Re === "value") && n(C, Re, Le, Ge, N, z);
        }
      }
      O & 1 && _.children !== A.children && l(C, A.children);
    } else !ae && m == null && Q(C, ie, H, z, N);
    ((Y = H.onVnodeUpdated) || ee) && $t(() => {
      Y && fa(Y, z, A, _), ee && yi(A, _, z, "updated");
    }, G);
  }, j = (_, A, z, G, N, J, ae) => {
    for (let C = 0; C < A.length; C++) {
      const O = _[C], m = A[C], ee = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === me || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !To(O, m) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 198) ? u(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          z
        )
      );
      v(
        O,
        m,
        ee,
        null,
        G,
        N,
        J,
        ae,
        !0
      );
    }
  }, Q = (_, A, z, G, N) => {
    if (A !== z) {
      if (A !== qe)
        for (const J in A)
          !Uo(J) && !(J in z) && n(
            _,
            J,
            A[J],
            null,
            N,
            G
          );
      for (const J in z) {
        if (Uo(J)) continue;
        const ae = z[J], C = A[J];
        ae !== C && J !== "value" && n(_, J, C, ae, N, G);
      }
      "value" in z && n(_, "value", A.value, z.value, N);
    }
  }, B = (_, A, z, G, N, J, ae, C, O) => {
    const m = A.el = _ ? _.el : s(""), ee = A.anchor = _ ? _.anchor : s("");
    let { patchFlag: ie, dynamicChildren: H, slotScopeIds: Y } = A;
    Y && (C = C ? C.concat(Y) : Y), _ == null ? (i(m, z, G), i(ee, z, G), P(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      A.children || [],
      z,
      ee,
      N,
      J,
      ae,
      C,
      O
    )) : ie > 0 && ie & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    _.dynamicChildren && _.dynamicChildren.length === H.length ? (j(
      _.dynamicChildren,
      H,
      z,
      N,
      J,
      ae,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (A.key != null || N && A === N.subTree) && ef(
      _,
      A,
      !0
      /* shallow */
    )) : K(
      _,
      A,
      z,
      ee,
      N,
      J,
      ae,
      C,
      O
    );
  }, re = (_, A, z, G, N, J, ae, C, O) => {
    A.slotScopeIds = C, _ == null ? A.shapeFlag & 512 ? N.ctx.activate(
      A,
      z,
      G,
      ae,
      O
    ) : de(
      A,
      z,
      G,
      N,
      J,
      ae,
      O
    ) : se(_, A, O);
  }, de = (_, A, z, G, N, J, ae) => {
    const C = _.component = mm(
      _,
      G,
      N
    );
    if (Uu(_) && (C.ctx.renderer = dt), vm(C, !1, ae), C.asyncDep) {
      if (N && N.registerDep(C, te, ae), !_.el) {
        const O = C.subTree = zt(ci);
        k(null, O, A, z), _.placeholder = O.el;
      }
    } else
      te(
        C,
        _,
        A,
        z,
        N,
        J,
        ae
      );
  }, se = (_, A, z) => {
    const G = A.component = _.component;
    if (Kb(_, A, z))
      if (G.asyncDep && !G.asyncResolved) {
        Z(G, A, z);
        return;
      } else
        G.next = A, G.update();
    else
      A.el = _.el, G.vnode = A;
  }, te = (_, A, z, G, N, J, ae) => {
    const C = () => {
      if (_.isMounted) {
        let { next: ie, bu: H, u: Y, parent: ce, vnode: ye } = _;
        {
          const vt = tf(_);
          if (vt) {
            ie && (ie.el = ye.el, Z(_, ie, ae)), vt.asyncDep.then(() => {
              $t(() => {
                _.isUnmounted || m();
              }, N);
            });
            return;
          }
        }
        let Re = ie, Le;
        wi(_, !1), ie ? (ie.el = ye.el, Z(_, ie, ae)) : ie = ye, H && Bn(H), (Le = ie.props && ie.props.onVnodeBeforeUpdate) && fa(Le, ce, ie, ye), wi(_, !0);
        const Ge = pd(_), Ot = _.subTree;
        _.subTree = Ge, v(
          Ot,
          Ge,
          // parent may have changed if it's in a teleport
          u(Ot.el),
          // anchor may have changed if it's in a fragment
          Tt(Ot),
          _,
          N,
          J
        ), ie.el = Ge.el, Re === null && Yb(_, Ge.el), Y && $t(Y, N), (Le = ie.props && ie.props.onVnodeUpdated) && $t(
          () => fa(Le, ce, ie, ye),
          N
        );
      } else {
        let ie;
        const { el: H, props: Y } = A, { bm: ce, m: ye, parent: Re, root: Le, type: Ge } = _, Ot = No(A);
        wi(_, !1), ce && Bn(ce), !Ot && (ie = Y && Y.onVnodeBeforeMount) && fa(ie, Re, A), wi(_, !0);
        {
          Le.ce && Le.ce._hasShadowRoot() && Le.ce._injectChildStyle(
            Ge,
            _.parent ? _.parent.type : void 0
          );
          const vt = _.subTree = pd(_);
          v(
            null,
            vt,
            z,
            G,
            _,
            N,
            J
          ), A.el = vt.el;
        }
        if (ye && $t(ye, N), !Ot && (ie = Y && Y.onVnodeMounted)) {
          const vt = A;
          $t(
            () => fa(ie, Re, vt),
            N
          );
        }
        (A.shapeFlag & 256 || Re && No(Re.vnode) && Re.vnode.shapeFlag & 256) && _.a && $t(_.a, N), _.isMounted = !0, A = z = G = null;
      }
    };
    _.scope.on();
    const O = _.effect = new hu(C);
    _.scope.off();
    const m = _.update = O.run.bind(O), ee = _.job = O.runIfDirty.bind(O);
    ee.i = _, ee.id = _.uid, O.scheduler = () => mc(ee), wi(_, !0), m();
  }, Z = (_, A, z) => {
    A.component = _;
    const G = _.vnode.props;
    _.vnode = A, _.next = null, Qb(_, A.props, G, z), im(_, A.children, z), Ta(), rd(_), Sa();
  }, K = (_, A, z, G, N, J, ae, C, O = !1) => {
    const m = _ && _.children, ee = _ ? _.shapeFlag : 0, ie = A.children, { patchFlag: H, shapeFlag: Y } = A;
    if (H > 0) {
      if (H & 128) {
        Te(
          m,
          ie,
          z,
          G,
          N,
          J,
          ae,
          C,
          O
        );
        return;
      } else if (H & 256) {
        ue(
          m,
          ie,
          z,
          G,
          N,
          J,
          ae,
          C,
          O
        );
        return;
      }
    }
    Y & 8 ? (ee & 16 && $e(m, N, J), ie !== m && l(z, ie)) : ee & 16 ? Y & 16 ? Te(
      m,
      ie,
      z,
      G,
      N,
      J,
      ae,
      C,
      O
    ) : $e(m, N, J, !0) : (ee & 8 && l(z, ""), Y & 16 && P(
      ie,
      z,
      G,
      N,
      J,
      ae,
      C,
      O
    ));
  }, ue = (_, A, z, G, N, J, ae, C, O) => {
    _ = _ || Qi, A = A || Qi;
    const m = _.length, ee = A.length, ie = Math.min(m, ee);
    let H;
    for (H = 0; H < ie; H++) {
      const Y = A[H] = O ? Ma(A[H]) : ga(A[H]);
      v(
        _[H],
        Y,
        z,
        null,
        N,
        J,
        ae,
        C,
        O
      );
    }
    m > ee ? $e(
      _,
      N,
      J,
      !0,
      !1,
      ie
    ) : P(
      A,
      z,
      G,
      N,
      J,
      ae,
      C,
      O,
      ie
    );
  }, Te = (_, A, z, G, N, J, ae, C, O) => {
    let m = 0;
    const ee = A.length;
    let ie = _.length - 1, H = ee - 1;
    for (; m <= ie && m <= H; ) {
      const Y = _[m], ce = A[m] = O ? Ma(A[m]) : ga(A[m]);
      if (To(Y, ce))
        v(
          Y,
          ce,
          z,
          null,
          N,
          J,
          ae,
          C,
          O
        );
      else
        break;
      m++;
    }
    for (; m <= ie && m <= H; ) {
      const Y = _[ie], ce = A[H] = O ? Ma(A[H]) : ga(A[H]);
      if (To(Y, ce))
        v(
          Y,
          ce,
          z,
          null,
          N,
          J,
          ae,
          C,
          O
        );
      else
        break;
      ie--, H--;
    }
    if (m > ie) {
      if (m <= H) {
        const Y = H + 1, ce = Y < ee ? A[Y].el : G;
        for (; m <= H; )
          v(
            null,
            A[m] = O ? Ma(A[m]) : ga(A[m]),
            z,
            ce,
            N,
            J,
            ae,
            C,
            O
          ), m++;
      }
    } else if (m > H)
      for (; m <= ie; )
        Ae(_[m], N, J, !0), m++;
    else {
      const Y = m, ce = m, ye = /* @__PURE__ */ new Map();
      for (m = ce; m <= H; m++) {
        const pt = A[m] = O ? Ma(A[m]) : ga(A[m]);
        pt.key != null && ye.set(pt.key, m);
      }
      let Re, Le = 0;
      const Ge = H - ce + 1;
      let Ot = !1, vt = 0;
      const sa = new Array(Ge);
      for (m = 0; m < Ge; m++) sa[m] = 0;
      for (m = Y; m <= ie; m++) {
        const pt = _[m];
        if (Le >= Ge) {
          Ae(pt, N, J, !0);
          continue;
        }
        let Mt;
        if (pt.key != null)
          Mt = ye.get(pt.key);
        else
          for (Re = ce; Re <= H; Re++)
            if (sa[Re - ce] === 0 && To(pt, A[Re])) {
              Mt = Re;
              break;
            }
        Mt === void 0 ? Ae(pt, N, J, !0) : (sa[Mt - ce] = m + 1, Mt >= vt ? vt = Mt : Ot = !0, v(
          pt,
          A[Mt],
          z,
          null,
          N,
          J,
          ae,
          C,
          O
        ), Le++);
      }
      const Li = Ot ? sm(sa) : Qi;
      for (Re = Li.length - 1, m = Ge - 1; m >= 0; m--) {
        const pt = ce + m, Mt = A[pt], Ni = A[pt + 1], _i = pt + 1 < ee ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ni.el || af(Ni)
        ) : G;
        sa[m] === 0 ? v(
          null,
          Mt,
          z,
          _i,
          N,
          J,
          ae,
          C,
          O
        ) : Ot && (Re < 0 || m !== Li[Re] ? Se(Mt, z, _i, 2) : Re--);
      }
    }
  }, Se = (_, A, z, G, N = null) => {
    const { el: J, type: ae, transition: C, children: O, shapeFlag: m } = _;
    if (m & 6) {
      Se(_.component.subTree, A, z, G);
      return;
    }
    if (m & 128) {
      _.suspense.move(A, z, G);
      return;
    }
    if (m & 64) {
      ae.move(_, A, z, dt);
      return;
    }
    if (ae === me) {
      i(J, A, z);
      for (let ie = 0; ie < O.length; ie++)
        Se(O[ie], A, z, G);
      i(_.anchor, A, z);
      return;
    }
    if (ae === Hn) {
      S(_, A, z);
      return;
    }
    if (G !== 2 && m & 1 && C)
      if (G === 0)
        C.persisted && !J[ts] ? i(J, A, z) : (C.beforeEnter(J), i(J, A, z), $t(() => C.enter(J), N));
      else {
        const { leave: ie, delayLeave: H, afterLeave: Y } = C, ce = () => {
          _.ctx.isUnmounted ? o(J) : i(J, A, z);
        }, ye = () => {
          const Re = J._isLeaving || !!J[ts];
          J._isLeaving && J[ts](
            !0
            /* cancelled */
          ), C.persisted && !Re ? ce() : ie(J, () => {
            ce(), Y && Y();
          });
        };
        H ? H(J, ce, ye) : ye();
      }
    else
      i(J, A, z);
  }, Ae = (_, A, z, G = !1, N = !1) => {
    const {
      type: J,
      props: ae,
      ref: C,
      children: O,
      dynamicChildren: m,
      shapeFlag: ee,
      patchFlag: ie,
      dirs: H,
      cacheIndex: Y,
      memo: ce
    } = _;
    if (ie === -2 && (N = !1), C != null && (Ta(), Lo(C, null, z, _, !0), Sa()), Y != null && (A.renderCache[Y] = void 0), ee & 256) {
      A.ctx.deactivate(_);
      return;
    }
    const ye = ee & 1 && H, Re = !No(_);
    let Le;
    if (Re && (Le = ae && ae.onVnodeBeforeUnmount) && fa(Le, A, _), ee & 6)
      st(_.component, z, G);
    else {
      if (ee & 128) {
        _.suspense.unmount(z, G);
        return;
      }
      ye && yi(_, null, A, "beforeUnmount"), ee & 64 ? _.type.remove(
        _,
        A,
        z,
        dt,
        G
      ) : m && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !m.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (J !== me || ie > 0 && ie & 64) ? $e(
        m,
        A,
        z,
        !1,
        !0
      ) : (J === me && ie & 384 || !N && ee & 16) && $e(O, A, z), G && Me(_);
    }
    const Ge = ce != null && Y == null;
    (Re && (Le = ae && ae.onVnodeUnmounted) || ye || Ge) && $t(() => {
      Le && fa(Le, A, _), ye && yi(_, null, A, "unmounted"), Ge && (_.el = null);
    }, z);
  }, Me = (_) => {
    const { type: A, el: z, anchor: G, transition: N } = _;
    if (A === me) {
      ke(z, G);
      return;
    }
    if (A === Hn) {
      T(_);
      return;
    }
    const J = () => {
      o(z), N && !N.persisted && N.afterLeave && N.afterLeave();
    };
    if (_.shapeFlag & 1 && N && !N.persisted) {
      const { leave: ae, delayLeave: C } = N, O = () => ae(z, J);
      C ? C(_.el, J, O) : O();
    } else
      J();
  }, ke = (_, A) => {
    let z;
    for (; _ !== A; )
      z = f(_), o(_), _ = z;
    o(A);
  }, st = (_, A, z) => {
    const { bum: G, scope: N, job: J, subTree: ae, um: C, m: O, a: m } = _;
    md(O), md(m), G && Bn(G), N.stop(), J && (J.flags |= 8, Ae(ae, _, A, z)), C && $t(C, A), $t(() => {
      _.isUnmounted = !0;
    }, A);
  }, $e = (_, A, z, G = !1, N = !1, J = 0) => {
    for (let ae = J; ae < _.length; ae++)
      Ae(_[ae], A, z, G, N);
  }, Tt = (_) => {
    if (_.shapeFlag & 6)
      return Tt(_.component.subTree);
    if (_.shapeFlag & 128)
      return _.suspense.next();
    const A = f(_.anchor || _.el), z = A && A[Ab];
    return z ? f(z) : A;
  };
  let ct = !1;
  const wt = (_, A, z) => {
    let G;
    _ == null ? A._vnode && (Ae(A._vnode, null, null, !0), G = A._vnode.component) : v(
      A._vnode || null,
      _,
      A,
      null,
      null,
      null,
      z
    ), A._vnode = _, ct || (ct = !0, rd(G), Eu(), ct = !1);
  }, dt = {
    p: v,
    um: Ae,
    m: Se,
    r: Me,
    mt: de,
    mc: P,
    pc: K,
    pbc: j,
    n: Tt,
    o: t
  };
  return {
    render: wt,
    hydrate: void 0,
    createApp: Db(wt)
  };
}
function is({ type: t, props: e }, a) {
  return a === "svg" && t === "foreignObject" || a === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : a;
}
function wi({ effect: t, job: e }, a) {
  a ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function rm(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function ef(t, e, a = !1) {
  const i = t.children, o = e.children;
  if (he(i) && he(o))
    for (let n = 0; n < i.length; n++) {
      const r = i[n];
      let s = o[n];
      s.shapeFlag & 1 && !s.dynamicChildren && ((s.patchFlag <= 0 || s.patchFlag === 32) && (s = o[n] = Ma(o[n]), s.el = r.el), !a && s.patchFlag !== -2 && ef(r, s)), s.type === Or && (s.patchFlag === -1 && (s = o[n] = Ma(s)), s.el = r.el), s.type === ci && !s.el && (s.el = r.el);
    }
}
function sm(t) {
  const e = t.slice(), a = [0];
  let i, o, n, r, s;
  const c = t.length;
  for (i = 0; i < c; i++) {
    const d = t[i];
    if (d !== 0) {
      if (o = a[a.length - 1], t[o] < d) {
        e[i] = o, a.push(i);
        continue;
      }
      for (n = 0, r = a.length - 1; n < r; )
        s = n + r >> 1, t[a[s]] < d ? n = s + 1 : r = s;
      d < t[a[n]] && (n > 0 && (e[i] = a[n - 1]), a[n] = i);
    }
  }
  for (n = a.length, r = a[n - 1]; n-- > 0; )
    a[n] = r, r = e[r];
  return a;
}
function tf(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : tf(e);
}
function md(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
function af(t) {
  if (t.placeholder)
    return t.placeholder;
  const e = t.component;
  return e ? af(e.subTree) : null;
}
const of = (t) => t.__isSuspense;
function cm(t, e) {
  e && e.pendingBranch ? he(t) ? e.effects.push(...t) : e.effects.push(t) : vb(t);
}
const me = /* @__PURE__ */ Symbol.for("v-fgt"), Or = /* @__PURE__ */ Symbol.for("v-txt"), ci = /* @__PURE__ */ Symbol.for("v-cmt"), Hn = /* @__PURE__ */ Symbol.for("v-stc"), Bo = [];
let Ht = null;
function U(t = !1) {
  Bo.push(Ht = t ? null : []);
}
function dm() {
  Bo.pop(), Ht = Bo[Bo.length - 1] || null;
}
let tn = 1;
function vd(t, e = !1) {
  tn += t, t < 0 && Ht && e && (Ht.hasOnce = !0);
}
function nf(t) {
  return t.dynamicChildren = tn > 0 ? Ht || Qi : null, dm(), tn > 0 && Ht && Ht.push(t), t;
}
function F(t, e, a, i, o, n) {
  return nf(
    p(
      t,
      e,
      a,
      i,
      o,
      n,
      !0
    )
  );
}
function lm(t, e, a, i, o) {
  return nf(
    zt(
      t,
      e,
      a,
      i,
      o,
      !0
    )
  );
}
function rf(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function To(t, e) {
  return t.type === e.type && t.key === e.key;
}
const sf = ({ key: t }) => t ?? null, Jn = ({
  ref: t,
  ref_key: e,
  ref_for: a
}) => (typeof t == "number" && (t = "" + t), t != null ? ot(t) || /* @__PURE__ */ nt(t) || _e(t) ? { i: aa, r: t, k: e, f: !!a } : t : null);
function p(t, e = null, a = null, i = 0, o = null, n = t === me ? 0 : 1, r = !1, s = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && sf(e),
    ref: e && Jn(e),
    scopeId: Mu,
    slotScopeIds: null,
    children: a,
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
    shapeFlag: n,
    patchFlag: i,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: aa
  };
  return s ? (rr(c, a), n & 128 && t.normalize(c)) : a && (c.shapeFlag |= ot(a) ? 8 : 16), tn > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Ht && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ht.push(c), c;
}
const zt = um;
function um(t, e = null, a = null, i = 0, o = null, n = !1) {
  if ((!t || t === jb) && (t = ci), rf(t)) {
    const s = so(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return a && rr(s, a), tn > 0 && !n && Ht && (s.shapeFlag & 6 ? Ht[Ht.indexOf(t)] = s : Ht.push(s)), s.patchFlag = -2, s;
  }
  if (wm(t) && (t = t.__vccOpts), e) {
    e = fm(e);
    let { class: s, style: c } = e;
    s && !ot(s) && (e.class = we(s)), ze(c) && (/* @__PURE__ */ Pr(c) && !he(c) && (c = yt({}, c)), e.style = Ua(c));
  }
  const r = ot(t) ? 1 : of(t) ? 128 : xb(t) ? 64 : ze(t) ? 4 : _e(t) ? 2 : 0;
  return p(
    t,
    e,
    a,
    i,
    o,
    r,
    n,
    !0
  );
}
function fm(t) {
  return t ? /* @__PURE__ */ Pr(t) || Gu(t) ? yt({}, t) : t : null;
}
function so(t, e, a = !1, i = !1) {
  const { props: o, ref: n, patchFlag: r, children: s, transition: c } = t, d = e ? pm(o || {}, e) : o, l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: d,
    key: d && sf(d),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      a && n ? he(n) ? n.concat(Jn(e)) : [n, Jn(e)] : Jn(e)
    ) : n,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: s,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== me ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && so(t.ssContent),
    ssFallback: t.ssFallback && so(t.ssFallback),
    placeholder: t.placeholder,
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return c && i && vc(
    l,
    c.clone(l)
  ), l;
}
function ta(t = " ", e = 0) {
  return zt(Or, null, t, e);
}
function Gn(t, e) {
  const a = zt(Hn, null, t);
  return a.staticCount = e, a;
}
function ge(t = "", e = !1) {
  return e ? (U(), lm(ci, null, t)) : zt(ci, null, t);
}
function ga(t) {
  return t == null || typeof t == "boolean" ? zt(ci) : he(t) ? zt(
    me,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : rf(t) ? Ma(t) : zt(Or, null, String(t));
}
function Ma(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : so(t);
}
function rr(t, e) {
  let a = 0;
  const { shapeFlag: i } = t;
  if (e == null)
    e = null;
  else if (he(e))
    a = 16;
  else if (typeof e == "object")
    if (i & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), rr(t, o()), o._c && (o._d = !0));
      return;
    } else {
      a = 32;
      const o = e._;
      !o && !Gu(e) ? e._ctx = aa : o === 3 && aa && (aa.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else if (_e(e)) {
    if (i & 65) {
      rr(t, { default: e });
      return;
    }
    e = { default: e, _ctx: aa }, a = 32;
  } else
    e = String(e), i & 64 ? (a = 16, e = [ta(e)]) : a = 8;
  t.children = e, t.shapeFlag |= a;
}
function pm(...t) {
  const e = {};
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    for (const o in i)
      if (o === "class")
        e.class !== i.class && (e.class = we([e.class, i.class]));
      else if (o === "style")
        e.style = Ua([e.style, i.style]);
      else if (wr(o)) {
        const n = e[o], r = i[o];
        r && n !== r && !(he(n) && n.includes(r)) ? e[o] = n ? [].concat(n, r) : r : r == null && n == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !kr(o) && (e[o] = r);
      } else o !== "" && (e[o] = i[o]);
  }
  return e;
}
function fa(t, e, a, i = null) {
  ua(t, e, 7, [
    a,
    i
  ]);
}
const hm = Nu();
let bm = 0;
function mm(t, e, a) {
  const i = t.type, o = (e ? e.appContext : t.appContext) || hm, n = {
    uid: bm++,
    vnode: t,
    type: i,
    parent: e,
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
    scope: new uu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(o.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ku(i, o),
    emitsOptions: Du(i, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: qe,
    // inheritAttrs
    inheritAttrs: i.inheritAttrs,
    // state
    ctx: qe,
    data: qe,
    props: qe,
    attrs: qe,
    slots: qe,
    refs: qe,
    setupState: qe,
    setupContext: null,
    // suspense related
    suspense: a,
    suspenseId: a ? a.pendingId : 0,
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
  return n.ctx = { _: n }, n.root = e ? e.root : n, n.emit = Hb.bind(null, n), t.ce && t.ce(n), n;
}
let Vt = null;
const cf = () => Vt || aa;
let sr, Vs;
{
  const t = Tr(), e = (a, i) => {
    let o;
    return (o = t[a]) || (o = t[a] = []), o.push(i), (n) => {
      o.length > 1 ? o.forEach((r) => r(n)) : o[0](n);
    };
  };
  sr = e(
    "__VUE_INSTANCE_SETTERS__",
    (a) => Vt = a
  ), Vs = e(
    "__VUE_SSR_SETTERS__",
    (a) => an = a
  );
}
const wn = (t) => {
  const e = Vt;
  return sr(t), t.scope.on(), () => {
    t.scope.off(), sr(e);
  };
}, gd = () => {
  Vt && Vt.scope.off(), sr(null);
};
function df(t) {
  return t.vnode.shapeFlag & 4;
}
let an = !1;
function vm(t, e = !1, a = !1) {
  e && Vs(e);
  const { props: i, children: o } = t.vnode, n = df(t);
  Xb(t, i, n, e), am(t, o, a || e);
  const r = n ? gm(t, e) : void 0;
  return e && Vs(!1), r;
}
function gm(t, e) {
  const a = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, zb);
  const { setup: i } = a;
  if (i) {
    Ta();
    const o = t.setupContext = i.length > 1 ? ym(t) : null, n = wn(t), r = gn(
      i,
      t,
      0,
      [
        t.props,
        o
      ]
    ), s = iu(r);
    if (Sa(), n(), (s || t.sp) && !No(t) && zu(t), s) {
      if (r.then(gd, gd), e)
        return r.then((c) => {
          _d(t, c);
        }).catch((c) => {
          Rr(c, t, 0);
        });
      t.asyncDep = r;
    } else
      _d(t, r);
  } else
    lf(t);
}
function _d(t, e, a) {
  _e(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : ze(e) && (t.setupState = Pu(e)), lf(t);
}
function lf(t, e, a) {
  const i = t.type;
  t.render || (t.render = i.render || Aa);
  {
    const o = wn(t);
    Ta();
    try {
      Ub(t);
    } finally {
      Sa(), o();
    }
  }
}
const _m = {
  get(t, e) {
    return kt(t, "get", ""), t[e];
  }
};
function ym(t) {
  const e = (a) => {
    t.exposed = a || {};
  };
  return {
    attrs: new Proxy(t.attrs, _m),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function Mr(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Pu(Qo(t.exposed)), {
    get(e, a) {
      if (a in e)
        return e[a];
      if (a in Do)
        return Do[a](t);
    },
    has(e, a) {
      return a in e || a in Do;
    }
  })) : t.proxy;
}
function wm(t) {
  return _e(t) && "__vccOpts" in t;
}
const ve = (t, e) => /* @__PURE__ */ fb(t, e, an), km = "3.5.39";
let Es;
const yd = typeof window < "u" && window.trustedTypes;
if (yd)
  try {
    Es = /* @__PURE__ */ yd.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const uf = Es ? (t) => Es.createHTML(t) : (t) => t, Im = "http://www.w3.org/2000/svg", Am = "http://www.w3.org/1998/Math/MathML", Ea = typeof document < "u" ? document : null, wd = Ea && /* @__PURE__ */ Ea.createElement("template"), xm = {
  insert: (t, e, a) => {
    e.insertBefore(t, a || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, a, i) => {
    const o = e === "svg" ? Ea.createElementNS(Im, t) : e === "mathml" ? Ea.createElementNS(Am, t) : a ? Ea.createElement(t, { is: a }) : Ea.createElement(t);
    return t === "select" && i && i.multiple != null && o.setAttribute("multiple", i.multiple), o;
  },
  createText: (t) => Ea.createTextNode(t),
  createComment: (t) => Ea.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Ea.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, a, i, o, n) {
    const r = a ? a.previousSibling : e.lastChild;
    if (o && (o === n || o.nextSibling))
      for (; e.insertBefore(o.cloneNode(!0), a), !(o === n || !(o = o.nextSibling)); )
        ;
    else {
      wd.innerHTML = uf(
        i === "svg" ? `<svg>${t}</svg>` : i === "mathml" ? `<math>${t}</math>` : t
      );
      const s = wd.content;
      if (i === "svg" || i === "mathml") {
        const c = s.firstChild;
        for (; c.firstChild; )
          s.appendChild(c.firstChild);
        s.removeChild(c);
      }
      e.insertBefore(s, a);
    }
    return [
      // first
      r ? r.nextSibling : e.firstChild,
      // last
      a ? a.previousSibling : e.lastChild
    ];
  }
}, Tm = /* @__PURE__ */ Symbol("_vtc");
function Sm(t, e, a) {
  const i = t[Tm];
  i && (e = (e ? [e, ...i] : [...i]).join(" ")), e == null ? t.removeAttribute("class") : a ? t.setAttribute("class", e) : t.className = e;
}
const cr = /* @__PURE__ */ Symbol("_vod"), ff = /* @__PURE__ */ Symbol("_vsh"), Ga = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(t, { value: e }, { transition: a }) {
    t[cr] = t.style.display === "none" ? "" : t.style.display, a && e ? a.beforeEnter(t) : So(t, e);
  },
  mounted(t, { value: e }, { transition: a }) {
    a && e && a.enter(t);
  },
  updated(t, { value: e, oldValue: a }, { transition: i }) {
    !e != !a && (i ? e ? (i.beforeEnter(t), So(t, !0), i.enter(t)) : i.leave(t, () => {
      So(t, !1);
    }) : So(t, e));
  },
  beforeUnmount(t, { value: e }) {
    So(t, e);
  }
};
function So(t, e) {
  t.style.display = e ? t[cr] : "none", t[ff] = !e;
}
const Cm = /* @__PURE__ */ Symbol(""), Pm = /(?:^|;)\s*display\s*:/;
function Rm(t, e, a) {
  const i = t.style, o = ot(a);
  let n = !1;
  if (a && !o) {
    if (e)
      if (ot(e))
        for (const r of e.split(";")) {
          const s = r.slice(0, r.indexOf(":")).trim();
          a[s] == null && Vo(i, s, "");
        }
      else
        for (const r in e)
          a[r] == null && Vo(i, r, "");
    for (const r in a) {
      r === "display" && (n = !0);
      const s = a[r];
      s != null ? Em(
        t,
        r,
        !ot(e) && e ? e[r] : void 0,
        s
      ) || Vo(i, r, s) : Vo(i, r, "");
    }
  } else if (o) {
    if (e !== a) {
      const r = i[Cm];
      r && (a += ";" + r), i.cssText = a, n = Pm.test(a);
    }
  } else e && t.removeAttribute("style");
  cr in t && (t[cr] = n ? i.display : "", t[ff] && (i.display = "none"));
}
const kd = /\s*!important$/;
function Vo(t, e, a) {
  if (he(a))
    a.forEach((i) => Vo(t, e, i));
  else if (a == null && (a = ""), e.startsWith("--"))
    t.setProperty(e, a);
  else {
    const i = Vm(t, e);
    kd.test(a) ? t.setProperty(
      hi(i),
      a.replace(kd, ""),
      "important"
    ) : t[i] = a;
  }
}
const Id = ["Webkit", "Moz", "ms"], os = {};
function Vm(t, e) {
  const a = os[e];
  if (a)
    return a;
  let i = ca(e);
  if (i !== "filter" && i in t)
    return os[e] = i;
  i = ru(i);
  for (let o = 0; o < Id.length; o++) {
    const n = Id[o] + i;
    if (n in t)
      return os[e] = n;
  }
  return e;
}
function Em(t, e, a, i) {
  return t.tagName === "TEXTAREA" && (e === "width" || e === "height") && ot(i) && a === i;
}
const Ad = "http://www.w3.org/1999/xlink";
function xd(t, e, a, i, o, n = zh(e)) {
  i && e.startsWith("xlink:") ? a == null ? t.removeAttributeNS(Ad, e.slice(6, e.length)) : t.setAttributeNS(Ad, e, a) : a == null || n && !cu(a) ? t.removeAttribute(e) : t.setAttribute(
    e,
    n ? "" : na(a) ? String(a) : a
  );
}
function Td(t, e, a, i, o) {
  if (e === "innerHTML" || e === "textContent") {
    a != null && (t[e] = e === "innerHTML" ? uf(a) : a);
    return;
  }
  const n = t.tagName;
  if (e === "value" && n !== "PROGRESS" && // custom elements may use _value internally
  !n.includes("-")) {
    const s = n === "OPTION" ? t.getAttribute("value") || "" : t.value, c = a == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(a);
    (s !== c || !("_value" in t)) && (t.value = c), a == null && t.removeAttribute(e), t._value = a;
    return;
  }
  let r = !1;
  if (a === "" || a == null) {
    const s = typeof t[e];
    s === "boolean" ? a = cu(a) : a == null && s === "string" ? (a = "", r = !0) : s === "number" && (a = 0, r = !0);
  }
  try {
    t[e] = a;
  } catch {
  }
  r && t.removeAttribute(o || e);
}
function Qa(t, e, a, i) {
  t.addEventListener(e, a, i);
}
function Om(t, e, a, i) {
  t.removeEventListener(e, a, i);
}
const Sd = /* @__PURE__ */ Symbol("_vei");
function Mm(t, e, a, i, o = null) {
  const n = t[Sd] || (t[Sd] = {}), r = n[e];
  if (i && r)
    r.value = i;
  else {
    const [s, c] = zm(e);
    if (i) {
      const d = n[e] = qm(
        i,
        o
      );
      Qa(t, s, d, c);
    } else r && (Om(t, s, r, c), n[e] = void 0);
  }
}
const $m = /(Once|Passive|Capture)$/, jm = /^on:?(?:Once|Passive|Capture)$/;
function zm(t) {
  let e, a;
  for (; (a = t.match($m)) && !jm.test(t); )
    e || (e = {}), t = t.slice(0, t.length - a[1].length), e[a[1].toLowerCase()] = !0;
  return [t[2] === ":" ? t.slice(3) : hi(t.slice(2)), e];
}
let ns = 0;
const Um = /* @__PURE__ */ Promise.resolve(), Fm = () => ns || (Um.then(() => ns = 0), ns = Date.now());
function qm(t, e) {
  const a = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= a.attached)
      return;
    const o = a.value;
    if (he(o)) {
      const n = i.stopImmediatePropagation;
      i.stopImmediatePropagation = () => {
        n.call(i), i._stopped = !0;
      };
      const r = o.slice(), s = [i];
      for (let c = 0; c < r.length && !i._stopped; c++) {
        const d = r[c];
        d && ua(
          d,
          e,
          5,
          s
        );
      }
    } else
      ua(
        o,
        e,
        5,
        [i]
      );
  };
  return a.value = t, a.attached = Fm(), a;
}
const Cd = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Zm = (t, e, a, i, o, n) => {
  const r = o === "svg";
  e === "class" ? Sm(t, i, r) : e === "style" ? Rm(t, a, i) : wr(e) ? kr(e) || Mm(t, e, a, i, n) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Lm(t, e, i, r)) ? (Td(t, e, i), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && xd(t, e, i, r, n, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Nm(t, e) || // @ts-expect-error _def is private
  t._def.__asyncLoader && (/[A-Z]/.test(e) || !ot(i))) ? Td(t, ca(e), i, n, e) : (e === "true-value" ? t._trueValue = i : e === "false-value" && (t._falseValue = i), xd(t, e, i, r));
};
function Lm(t, e, a, i) {
  if (i)
    return !!(e === "innerHTML" || e === "textContent" || e in t && Cd(e) && _e(a));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Cd(e) && ot(a) ? !1 : e in t;
}
function Nm(t, e) {
  const a = (
    // @ts-expect-error _def is private
    t._def.props
  );
  if (!a)
    return !1;
  const i = ca(e);
  return Array.isArray(a) ? a.some((o) => ca(o) === i) : Object.keys(a).some((o) => ca(o) === i);
}
const co = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return he(e) ? (a) => Bn(e, a) : e;
};
function Dm(t) {
  t.target.composing = !0;
}
function Pd(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const qa = /* @__PURE__ */ Symbol("_assign");
function Rd(t, e, a) {
  return e && (t = t.trim()), a && (t = xr(t)), t;
}
const pa = {
  created(t, { modifiers: { lazy: e, trim: a, number: i } }, o) {
    t[qa] = co(o);
    const n = i || o.props && o.props.type === "number";
    Qa(t, e ? "change" : "input", (r) => {
      r.target.composing || t[qa](Rd(t.value, a, n));
    }), (a || n) && Qa(t, "change", () => {
      t.value = Rd(t.value, a, n);
    }), e || (Qa(t, "compositionstart", Dm), Qa(t, "compositionend", Pd), Qa(t, "change", Pd));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: a, modifiers: { lazy: i, trim: o, number: n } }, r) {
    if (t[qa] = co(r), t.composing) return;
    const s = (n || t.type === "number") && !/^0\d/.test(t.value) ? xr(t.value) : t.value, c = e ?? "";
    if (s === c)
      return;
    const d = t.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === t && t.type !== "range" && (i && e === a || o && t.value.trim() === c) || (t.value = c);
  }
}, pf = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(t, e, a) {
    t[qa] = co(a), Qa(t, "change", () => {
      const i = t._modelValue, o = on(t), n = t.checked, r = t[qa];
      if (he(i)) {
        const s = dc(i, o), c = s !== -1;
        if (n && !c)
          r(i.concat(o));
        else if (!n && c) {
          const d = [...i];
          d.splice(s, 1), r(d);
        }
      } else if (_o(i)) {
        const s = new Set(i);
        n ? s.add(o) : s.delete(o), r(s);
      } else
        r(hf(t, n));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Vd,
  beforeUpdate(t, e, a) {
    t[qa] = co(a), Vd(t, e, a);
  }
};
function Vd(t, { value: e, oldValue: a }, i) {
  t._modelValue = e;
  let o;
  if (he(e))
    o = dc(e, i.props.value) > -1;
  else if (_o(e))
    o = e.has(i.props.value);
  else {
    if (e === a) return;
    o = yo(e, hf(t, !0));
  }
  t.checked !== o && (t.checked = o);
}
const Ed = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(t, { value: e, modifiers: { number: a } }, i) {
    const o = _o(e);
    Qa(t, "change", () => {
      const n = Array.prototype.filter.call(t.options, (r) => r.selected).map(
        (r) => a ? xr(on(r)) : on(r)
      );
      t[qa](
        t.multiple ? o ? new Set(n) : n : n[0]
      ), t._assigning = !0, Ne(() => {
        t._assigning = !1;
      });
    }), t[qa] = co(i);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(t, { value: e }) {
    Od(t, e);
  },
  beforeUpdate(t, e, a) {
    t[qa] = co(a);
  },
  updated(t, { value: e }) {
    t._assigning || Od(t, e);
  }
};
function Od(t, e) {
  const a = t.multiple, i = he(e);
  if (!(a && !i && !_o(e))) {
    for (let o = 0, n = t.options.length; o < n; o++) {
      const r = t.options[o], s = on(r);
      if (a)
        if (i) {
          const c = typeof s;
          c === "string" || c === "number" ? r.selected = e.some((d) => String(d) === String(s)) : r.selected = dc(e, s) > -1;
        } else
          r.selected = e.has(s);
      else if (yo(on(r), e)) {
        t.selectedIndex !== o && (t.selectedIndex = o);
        return;
      }
    }
    !a && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function on(t) {
  return "_value" in t ? t._value : t.value;
}
function hf(t, e) {
  const a = e ? "_trueValue" : "_falseValue";
  return a in t ? t[a] : e;
}
const Bm = ["ctrl", "shift", "alt", "meta"], Hm = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => Bm.some((a) => t[`${a}Key`] && !e.includes(a))
}, Xa = (t, e) => {
  if (!t) return t;
  const a = t._withMods || (t._withMods = {}), i = e.join(".");
  return a[i] || (a[i] = ((o, ...n) => {
    for (let r = 0; r < e.length; r++) {
      const s = Hm[e[r]];
      if (s && s(o, e)) return;
    }
    return t(o, ...n);
  }));
}, Jm = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Md = (t, e) => {
  const a = t._withKeys || (t._withKeys = {}), i = e.join(".");
  return a[i] || (a[i] = ((o) => {
    if (!("key" in o))
      return;
    const n = hi(o.key);
    if (e.some(
      (r) => r === n || Jm[r] === n
    ))
      return t(o);
  }));
}, Gm = /* @__PURE__ */ yt({ patchProp: Zm }, xm);
let $d;
function Wm() {
  return $d || ($d = om(Gm));
}
const Km = ((...t) => {
  const e = Wm().createApp(...t), { mount: a } = e;
  return e.mount = (i) => {
    const o = Xm(i);
    if (!o) return;
    const n = e._component;
    !_e(n) && !n.render && !n.template && (n.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = a(o, !1, Ym(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, e;
});
function Ym(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function Xm(t) {
  return ot(t) ? document.querySelector(t) : t;
}
let bf;
const $r = (t) => bf = t, mf = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Os(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var Ho;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Ho || (Ho = {}));
function Qm() {
  const t = fu(!0), e = t.run(() => /* @__PURE__ */ ne({}));
  let a = [], i = [];
  const o = Qo({
    install(n) {
      $r(o), o._a = n, n.provide(mf, o), n.config.globalProperties.$pinia = o, i.forEach((r) => a.push(r)), i = [];
    },
    use(n) {
      return this._a ? a.push(n) : i.push(n), this;
    },
    _p: a,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: e
  });
  return o;
}
const vf = () => {
};
function jd(t, e, a, i = vf) {
  t.add(e);
  const o = () => {
    t.delete(e) && i();
  };
  return !a && pu() && Fh(o), o;
}
function Bi(t, ...e) {
  t.forEach((a) => {
    a(...e);
  });
}
const e0 = (t) => t(), zd = /* @__PURE__ */ Symbol(), rs = /* @__PURE__ */ Symbol();
function Ms(t, e) {
  t instanceof Map && e instanceof Map ? e.forEach((a, i) => t.set(i, a)) : t instanceof Set && e instanceof Set && e.forEach(t.add, t);
  for (const a in e) {
    if (!e.hasOwnProperty(a))
      continue;
    const i = e[a], o = t[a];
    Os(o) && Os(i) && t.hasOwnProperty(a) && !/* @__PURE__ */ nt(i) && !/* @__PURE__ */ Fa(i) ? t[a] = Ms(o, i) : t[a] = i;
  }
  return t;
}
const t0 = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function a0(t) {
  return !Os(t) || !Object.prototype.hasOwnProperty.call(t, t0);
}
const { assign: Wa } = Object;
function i0(t) {
  return !!(/* @__PURE__ */ nt(t) && t.effect);
}
function o0(t, e, a, i) {
  const { state: o, actions: n, getters: r } = e, s = a.state.value[t];
  let c;
  function d() {
    s || (a.state.value[t] = o ? o() : {});
    const l = /* @__PURE__ */ cb(a.state.value[t]);
    return Wa(l, n, Object.keys(r || {}).reduce((u, f) => (u[f] = Qo(ve(() => {
      $r(a);
      const b = a._s.get(t);
      return r[f].call(b, b);
    })), u), {}));
  }
  return c = gf(t, d, e, a, i, !0), c;
}
function gf(t, e, a = {}, i, o, n) {
  let r;
  const s = Wa({ actions: {} }, a), c = { deep: !0 };
  let d, l, u = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Set(), b;
  const y = i.state.value[t];
  !n && !y && (i.state.value[t] = {});
  let v;
  function g(P) {
    let R;
    d = l = !1, typeof P == "function" ? (P(i.state.value[t]), R = {
      type: Ho.patchFunction,
      storeId: t,
      events: b
    }) : (Ms(i.state.value[t], P), R = {
      type: Ho.patchObject,
      payload: P,
      storeId: t,
      events: b
    });
    const j = v = /* @__PURE__ */ Symbol();
    Ne().then(() => {
      v === j && (d = !0);
    }), l = !0, Bi(u, R, i.state.value[t]);
  }
  const k = n ? function() {
    const { state: R } = a, j = R ? R() : {};
    this.$patch((Q) => {
      Wa(Q, j);
    });
  } : (
    /* istanbul ignore next */
    vf
  );
  function I() {
    r.stop(), u.clear(), f.clear(), i._s.delete(t);
  }
  const S = (P, R = "") => {
    if (zd in P)
      return P[rs] = R, P;
    const j = function() {
      $r(i);
      const Q = Array.from(arguments), B = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set();
      function de(Z) {
        B.add(Z);
      }
      function se(Z) {
        re.add(Z);
      }
      Bi(f, {
        args: Q,
        name: j[rs],
        store: x,
        after: de,
        onError: se
      });
      let te;
      try {
        te = P.apply(this && this.$id === t ? this : x, Q);
      } catch (Z) {
        throw Bi(re, Z), Z;
      }
      return te instanceof Promise ? te.then((Z) => (Bi(B, Z), Z)).catch((Z) => (Bi(re, Z), Promise.reject(Z))) : (Bi(B, te), te);
    };
    return j[zd] = !0, j[rs] = R, j;
  }, T = {
    _p: i,
    // _s: scope,
    $id: t,
    $onAction: jd.bind(null, f),
    $patch: g,
    $reset: k,
    $subscribe(P, R = {}) {
      const j = jd(u, P, R.detached, () => Q()), Q = r.run(() => ut(() => i.state.value[t], (B) => {
        (R.flush === "sync" ? l : d) && P({
          storeId: t,
          type: Ho.direct,
          events: b
        }, B);
      }, Wa({}, c, R)));
      return j;
    },
    $dispose: I
  }, x = /* @__PURE__ */ Cr(T);
  i._s.set(t, x);
  const V = (i._a && i._a.runWithContext || e0)(() => i._e.run(() => (r = fu()).run(() => e({ action: S }))));
  for (const P in V) {
    const R = V[P];
    if (/* @__PURE__ */ nt(R) && !i0(R) || /* @__PURE__ */ Fa(R))
      n || (y && a0(R) && (/* @__PURE__ */ nt(R) ? R.value = y[P] : Ms(R, y[P])), i.state.value[t][P] = R);
    else if (typeof R == "function") {
      const j = S(R, P);
      V[P] = j, s.actions[P] = R;
    }
  }
  return Wa(x, V), Wa(/* @__PURE__ */ Ve(x), V), Object.defineProperty(x, "$state", {
    get: () => i.state.value[t],
    set: (P) => {
      g((R) => {
        Wa(R, P);
      });
    }
  }), i._p.forEach((P) => {
    Wa(x, r.run(() => P({
      store: x,
      app: i._a,
      pinia: i,
      options: s
    })));
  }), y && n && a.hydrate && a.hydrate(x.$state, y), d = !0, l = !0, x;
}
// @__NO_SIDE_EFFECTS__
function n0(t, e, a) {
  let i;
  const o = typeof e == "function";
  i = o ? a : e;
  function n(r, s) {
    const c = yb();
    return r = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    r || (c ? Zo(mf, null) : null), r && $r(r), r = bf, r._s.has(t) || (o ? gf(t, e, i, r) : o0(t, i, r)), r._s.get(t);
  }
  return n.$id = t, n;
}
const r0 = 1, s0 = "albina-galgame-card", c0 = "本包内的五首配乐均为 Kevin MacLeod 以 CC BY 4.0 发布的作品，不是 ProjectMoon 官方 OST。", d0 = [{ assetId: "file.audio.bgm.backstreets.rain.mp3", path: "audio/bgm/backstreets_rain.mp3", sha256: "97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414", cueAlias: "backstreets_rain", title: "SCP-x6x (Hopes)", creator: "Kevin MacLeod", isrc: "USUAN2000012", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.between.two.worlds.mp3", path: "audio/bgm/between_two_worlds.mp3", sha256: "25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184", cueAlias: "between_two_worlds", title: "Mesmerizing Galaxy", creator: "Kevin MacLeod", isrc: "USUAN2300011", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.boss.kromer.mp3", path: "audio/bgm/boss_kromer.mp3", sha256: "923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd", cueAlias: "boss_kromer", title: "Burnt Spirit", creator: "Kevin MacLeod", isrc: "USUAN1700053", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.main.menu.mp3", path: "audio/bgm/main_menu.mp3", sha256: "299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60", cueAlias: "main_menu", title: "Magistar", creator: "Kevin MacLeod", isrc: "USUAN1900003", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.title.theme.mp3", path: "audio/bgm/title_theme.mp3", sha256: "03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3", cueAlias: "title_theme", title: "Achilles", creator: "Kevin MacLeod", isrc: "USUAN1100463", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }], l0 = { publisher: "ProjectMoon", channel: "ProjectMoon Official", playlistTitle: "LCB OST", playlistTrackCount: 35, verifiedOn: "2026-07-15", bundled: !1, cached: !1, redistributionAllowed: !1, notice: "ProjectMoon 官方 OST 仅提供外部试听链接；本卡不下载、缓存或再分发这些音频。", rightsNotice: "官方播放列表可免费试听，但 ProjectMoon 服务条款未授予把游戏音乐复制进角色卡并再次分发的许可。", links: [{ label: "ProjectMoon 官方 OST 播放列表", url: "https://www.youtube.com/playlist?list=PL9-RBacZ4KMzFjhRY4zD7_GbwL1LgNWXD" }, { label: "Canto IX 官方曲目", url: "https://www.youtube.com/watch?v=n5GI6EkCXCo" }], termsUrl: "https://limbuscompany.com/terms-of-service/" }, u0 = {
  version: r0,
  projectId: s0,
  packagedNotice: c0,
  tracks: d0,
  officialSoundtrack: l0
};
function Oa(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function _f(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
}
var Kt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, nn = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, yc, _t, Be, ia = 1e8, Fe = 1 / ia, $s = Math.PI * 2, f0 = $s / 4, p0 = 0, yf = Math.sqrt, h0 = Math.cos, b0 = Math.sin, mt = function(e) {
  return typeof e == "string";
}, it = function(e) {
  return typeof e == "function";
}, La = function(e) {
  return typeof e == "number";
}, wc = function(e) {
  return typeof e > "u";
}, Ca = function(e) {
  return typeof e == "object";
}, Ut = function(e) {
  return e !== !1;
}, kc = function() {
  return typeof window < "u";
}, Mn = function(e) {
  return it(e) || mt(e);
}, wf = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, xt = Array.isArray, m0 = /random\([^)]+\)/g, v0 = /,\s*/g, Ud = /(?:-?\.?\d|\.)+/gi, kf = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Ki = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, ss = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, If = /[+-]=-?[.\d]+/, g0 = /[^,'"\[\]\s]+/gi, _0 = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Ye, ma, js, Ic, Yt = {}, dr = {}, Af, xf = function(e) {
  return (dr = lo(e, Yt)) && Lt;
}, Ac = function(e, a) {
  return console.warn("Invalid property", e, "set to", a, "Missing plugin? gsap.registerPlugin()");
}, rn = function(e, a) {
  return !a && console.warn(e);
}, Tf = function(e, a) {
  return e && (Yt[e] = a) && dr && (dr[e] = a) || Yt;
}, sn = function() {
  return 0;
}, y0 = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Wn = {
  suppressEvents: !0,
  kill: !1
}, w0 = {
  suppressEvents: !0
}, xc = {}, ni = [], zs = {}, Sf, Dt = {}, cs = {}, Fd = 30, Kn = [], Tc = "", Sc = function(e) {
  var a = e[0], i, o;
  if (Ca(a) || it(a) || (e = [e]), !(i = (a._gsap || {}).harness)) {
    for (o = Kn.length; o-- && !Kn[o].targetTest(a); )
      ;
    i = Kn[o];
  }
  for (o = e.length; o--; )
    e[o] && (e[o]._gsap || (e[o]._gsap = new Wf(e[o], i))) || e.splice(o, 1);
  return e;
}, Ei = function(e) {
  return e._gsap || Sc(oa(e))[0]._gsap;
}, Cf = function(e, a, i) {
  return (i = e[a]) && it(i) ? e[a]() : wc(i) && e.getAttribute && e.getAttribute(a) || i;
}, Ft = function(e, a) {
  return (e = e.split(",")).forEach(a) || e;
}, lt = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ke = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, ao = function(e, a) {
  var i = a.charAt(0), o = parseFloat(a.substr(2));
  return e = parseFloat(e), i === "+" ? e + o : i === "-" ? e - o : i === "*" ? e * o : e / o;
}, k0 = function(e, a) {
  for (var i = a.length, o = 0; e.indexOf(a[o]) < 0 && ++o < i; )
    ;
  return o < i;
}, lr = function() {
  var e = ni.length, a = ni.slice(0), i, o;
  for (zs = {}, ni.length = 0, i = 0; i < e; i++)
    o = a[i], o && o._lazy && (o.render(o._lazy[0], o._lazy[1], !0)._lazy = 0);
}, Cc = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, Pf = function(e, a, i, o) {
  ni.length && !_t && lr(), e.render(a, i, !!(_t && a < 0 && Cc(e))), ni.length && !_t && lr();
}, Rf = function(e) {
  var a = parseFloat(e);
  return (a || a === 0) && (e + "").match(g0).length < 2 ? a : mt(e) ? e.trim() : e;
}, Vf = function(e) {
  return e;
}, Xt = function(e, a) {
  for (var i in a)
    i in e || (e[i] = a[i]);
  return e;
}, I0 = function(e) {
  return function(a, i) {
    for (var o in i)
      o in a || o === "duration" && e || o === "ease" || (a[o] = i[o]);
  };
}, lo = function(e, a) {
  for (var i in a)
    e[i] = a[i];
  return e;
}, qd = function t(e, a) {
  for (var i in a)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = Ca(a[i]) ? t(e[i] || (e[i] = {}), a[i]) : a[i]);
  return e;
}, ur = function(e, a) {
  var i = {}, o;
  for (o in e)
    o in a || (i[o] = e[o]);
  return i;
}, Jo = function(e) {
  var a = e.parent || Ye, i = e.keyframes ? I0(xt(e.keyframes)) : Xt;
  if (Ut(e.inherit))
    for (; a; )
      i(e, a.vars.defaults), a = a.parent || a._dp;
  return e;
}, A0 = function(e, a) {
  for (var i = e.length, o = i === a.length; o && i-- && e[i] === a[i]; )
    ;
  return i < 0;
}, Ef = function(e, a, i, o, n) {
  var r = e[o], s;
  if (n)
    for (s = a[n]; r && r[n] > s; )
      r = r._prev;
  return r ? (a._next = r._next, r._next = a) : (a._next = e[i], e[i] = a), a._next ? a._next._prev = a : e[o] = a, a._prev = r, a.parent = a._dp = e, a;
}, jr = function(e, a, i, o) {
  i === void 0 && (i = "_first"), o === void 0 && (o = "_last");
  var n = a._prev, r = a._next;
  n ? n._next = r : e[i] === a && (e[i] = r), r ? r._prev = n : e[o] === a && (e[o] = n), a._next = a._prev = a.parent = null;
}, di = function(e, a) {
  e.parent && (!a || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Oi = function(e, a) {
  if (e && (!a || a._end > e._dur || a._start < 0))
    for (var i = e; i; )
      i._dirty = 1, i = i.parent;
  return e;
}, x0 = function(e) {
  for (var a = e.parent; a && a.parent; )
    a._dirty = 1, a.totalDuration(), a = a.parent;
  return e;
}, Us = function(e, a, i, o) {
  return e._startAt && (_t ? e._startAt.revert(Wn) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(a, !0, o));
}, T0 = function t(e) {
  return !e || e._ts && t(e.parent);
}, Zd = function(e) {
  return e._repeat ? uo(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, uo = function(e, a) {
  var i = Math.floor(e = Ke(e / a));
  return e && i === e ? i - 1 : i;
}, fr = function(e, a) {
  return (e - a._start) * a._ts + (a._ts >= 0 ? 0 : a._dirty ? a.totalDuration() : a._tDur);
}, zr = function(e) {
  return e._end = Ke(e._start + (e._tDur / Math.abs(e._ts || e._rts || Fe) || 0));
}, Ur = function(e, a) {
  var i = e._dp;
  return i && i.smoothChildTiming && e._ts && (e._start = Ke(i._time - (e._ts > 0 ? a / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - a) / -e._ts)), zr(e), i._dirty || Oi(i, e)), e;
}, Of = function(e, a) {
  var i;
  if ((a._time || !a._dur && a._initted || a._start < e._time && (a._dur || !a.add)) && (i = fr(e.rawTime(), a), (!a._dur || kn(0, a.totalDuration(), i) - a._tTime > Fe) && a.render(i, !0)), Oi(e, a)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (i = e; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    e._zTime = -Fe;
  }
}, wa = function(e, a, i, o) {
  return a.parent && di(a), a._start = Ke((La(i) ? i : i || e !== Ye ? ea(e, i, a) : e._time) + a._delay), a._end = Ke(a._start + (a.totalDuration() / Math.abs(a.timeScale()) || 0)), Ef(e, a, "_first", "_last", e._sort ? "_start" : 0), Fs(a) || (e._recent = a), o || Of(e, a), e._ts < 0 && Ur(e, e._tTime), e;
}, Mf = function(e, a) {
  return (Yt.ScrollTrigger || Ac("scrollTrigger", a)) && Yt.ScrollTrigger.create(a, e);
}, $f = function(e, a, i, o, n) {
  if (Rc(e, a, n), !e._initted)
    return 1;
  if (!i && e._pt && !_t && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Sf !== Bt.frame)
    return ni.push(e), e._lazy = [n, o], 1;
}, S0 = function t(e) {
  var a = e.parent;
  return a && a._ts && a._initted && !a._lock && (a.rawTime() < 0 || t(a));
}, Fs = function(e) {
  var a = e.data;
  return a === "isFromStart" || a === "isStart";
}, C0 = function(e, a, i, o) {
  var n = e.ratio, r = a < 0 || !a && (!e._start && S0(e) && !(!e._initted && Fs(e)) || (e._ts < 0 || e._dp._ts < 0) && !Fs(e)) ? 0 : 1, s = e._rDelay, c = 0, d, l, u;
  if (s && e._repeat && (c = kn(0, e._tDur, a), l = uo(c, s), e._yoyo && l & 1 && (r = 1 - r), l !== uo(e._tTime, s) && (n = 1 - r, e.vars.repeatRefresh && e._initted && e.invalidate())), r !== n || _t || o || e._zTime === Fe || !a && e._zTime) {
    if (!e._initted && $f(e, a, o, i, c))
      return;
    for (u = e._zTime, e._zTime = a || (i ? Fe : 0), i || (i = a && !u), e.ratio = r, e._from && (r = 1 - r), e._time = 0, e._tTime = c, d = e._pt; d; )
      d.r(r, d.d), d = d._next;
    a < 0 && Us(e, a, i, !0), e._onUpdate && !i && Jt(e, "onUpdate"), c && e._repeat && !i && e.parent && Jt(e, "onRepeat"), (a >= e._tDur || a < 0) && e.ratio === r && (r && di(e, 1), !i && !_t && (Jt(e, r ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = a);
}, P0 = function(e, a, i) {
  var o;
  if (i > a)
    for (o = e._first; o && o._start <= i; ) {
      if (o.data === "isPause" && o._start > a)
        return o;
      o = o._next;
    }
  else
    for (o = e._last; o && o._start >= i; ) {
      if (o.data === "isPause" && o._start < a)
        return o;
      o = o._prev;
    }
}, fo = function(e, a, i, o) {
  var n = e._repeat, r = Ke(a) || 0, s = e._tTime / e._tDur;
  return s && !o && (e._time *= r / e._dur), e._dur = r, e._tDur = n ? n < 0 ? 1e10 : Ke(r * (n + 1) + e._rDelay * n) : r, s > 0 && !o && Ur(e, e._tTime = e._tDur * s), e.parent && zr(e), i || Oi(e.parent, e), e;
}, Ld = function(e) {
  return e instanceof jt ? Oi(e) : fo(e, e._dur);
}, R0 = {
  _start: 0,
  endTime: sn,
  totalDuration: sn
}, ea = function t(e, a, i) {
  var o = e.labels, n = e._recent || R0, r = e.duration() >= ia ? n.endTime(!1) : e._dur, s, c, d;
  return mt(a) && (isNaN(a) || a in o) ? (c = a.charAt(0), d = a.substr(-1) === "%", s = a.indexOf("="), c === "<" || c === ">" ? (s >= 0 && (a = a.replace(/=/, "")), (c === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(a.substr(1)) || 0) * (d ? (s < 0 ? n : i).totalDuration() / 100 : 1)) : s < 0 ? (a in o || (o[a] = r), o[a]) : (c = parseFloat(a.charAt(s - 1) + a.substr(s + 1)), d && i && (c = c / 100 * (xt(i) ? i[0] : i).totalDuration()), s > 1 ? t(e, a.substr(0, s - 1), i) + c : r + c)) : a == null ? r : +a;
}, Go = function(e, a, i) {
  var o = La(a[1]), n = (o ? 2 : 1) + (e < 2 ? 0 : 1), r = a[n], s, c;
  if (o && (r.duration = a[1]), r.parent = i, e) {
    for (s = r, c = i; c && !("immediateRender" in s); )
      s = c.vars.defaults || {}, c = Ut(c.vars.inherit) && c.parent;
    r.immediateRender = Ut(s.immediateRender), e < 2 ? r.runBackwards = 1 : r.startAt = a[n - 1];
  }
  return new ft(a[0], r, a[n + 1]);
}, bi = function(e, a) {
  return e || e === 0 ? a(e) : a;
}, kn = function(e, a, i) {
  return i < e ? e : i > a ? a : i;
}, It = function(e, a) {
  return !mt(e) || !(a = _0.exec(e)) ? "" : a[1];
}, V0 = function(e, a, i) {
  return bi(i, function(o) {
    return kn(e, a, o);
  });
}, qs = [].slice, jf = function(e, a) {
  return e && Ca(e) && "length" in e && (!a && !e.length || e.length - 1 in e && Ca(e[0])) && !e.nodeType && e !== ma;
}, E0 = function(e, a, i) {
  return i === void 0 && (i = []), e.forEach(function(o) {
    var n;
    return mt(o) && !a || jf(o, 1) ? (n = i).push.apply(n, oa(o)) : i.push(o);
  }) || i;
}, oa = function(e, a, i) {
  return Be && !a && Be.selector ? Be.selector(e) : mt(e) && !i && (js || !po()) ? qs.call((a || Ic).querySelectorAll(e), 0) : xt(e) ? E0(e, i) : jf(e) ? qs.call(e, 0) : e ? [e] : [];
}, Zs = function(e) {
  return e = oa(e)[0] || rn("Invalid scope") || {}, function(a) {
    var i = e.current || e.nativeElement || e;
    return oa(a, i.querySelectorAll ? i : i === e ? rn("Invalid scope") || Ic.createElement("div") : e);
  };
}, zf = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, Uf = function(e) {
  if (it(e))
    return e;
  var a = Ca(e) ? e : {
    each: e
  }, i = Mi(a.ease), o = a.from || 0, n = parseFloat(a.base) || 0, r = {}, s = o > 0 && o < 1, c = isNaN(o) || s, d = a.axis, l = o, u = o;
  return mt(o) ? l = u = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[o] || 0 : !s && c && (l = o[0], u = o[1]), function(f, b, y) {
    var v = (y || a).length, g = r[v], k, I, S, T, x, D, V, P, R;
    if (!g) {
      if (R = a.grid === "auto" ? 0 : (a.grid || [1, ia])[1], !R) {
        for (V = -ia; V < (V = y[R++].getBoundingClientRect().left) && R < v; )
          ;
        R < v && R--;
      }
      for (g = r[v] = [], k = c ? Math.min(R, v) * l - 0.5 : o % R, I = R === ia ? 0 : c ? v * u / R - 0.5 : o / R | 0, V = 0, P = ia, D = 0; D < v; D++)
        S = D % R - k, T = I - (D / R | 0), g[D] = x = d ? Math.abs(d === "y" ? T : S) : yf(S * S + T * T), x > V && (V = x), x < P && (P = x);
      o === "random" && zf(g), g.max = V - P, g.min = P, g.v = v = (parseFloat(a.amount) || parseFloat(a.each) * (R > v ? v - 1 : d ? d === "y" ? v / R : R : Math.max(R, v / R)) || 0) * (o === "edges" ? -1 : 1), g.b = v < 0 ? n - v : n, g.u = It(a.amount || a.each) || 0, i = i && v < 0 ? B0(i) : i;
    }
    return v = (g[f] - g.min) / g.max || 0, Ke(g.b + (i ? i(v) : v) * g.v) + g.u;
  };
}, Ls = function(e) {
  var a = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(i) {
    var o = Ke(Math.round(parseFloat(i) / e) * e * a);
    return (o - o % 1) / a + (La(i) ? 0 : It(i));
  };
}, Ff = function(e, a) {
  var i = xt(e), o, n;
  return !i && Ca(e) && (o = i = e.radius || ia, e.values ? (e = oa(e.values), (n = !La(e[0])) && (o *= o)) : e = Ls(e.increment)), bi(a, i ? it(e) ? function(r) {
    return n = e(r), Math.abs(n - r) <= o ? n : r;
  } : function(r) {
    for (var s = parseFloat(n ? r.x : r), c = parseFloat(n ? r.y : 0), d = ia, l = 0, u = e.length, f, b; u--; )
      n ? (f = e[u].x - s, b = e[u].y - c, f = f * f + b * b) : f = Math.abs(e[u] - s), f < d && (d = f, l = u);
    return l = !o || d <= o ? e[l] : r, n || l === r || La(r) ? l : l + It(r);
  } : Ls(e));
}, qf = function(e, a, i, o) {
  return bi(xt(e) ? !a : i === !0 ? !!(i = 0) : !o, function() {
    return xt(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (o = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (a - e + i * 0.99)) / i) * i * o) / o;
  });
}, O0 = function() {
  for (var e = arguments.length, a = new Array(e), i = 0; i < e; i++)
    a[i] = arguments[i];
  return function(o) {
    return a.reduce(function(n, r) {
      return r(n);
    }, o);
  };
}, M0 = function(e, a) {
  return function(i) {
    return e(parseFloat(i)) + (a || It(i));
  };
}, $0 = function(e, a, i) {
  return Lf(e, a, 0, 1, i);
}, Zf = function(e, a, i) {
  return bi(i, function(o) {
    return e[~~a(o)];
  });
}, j0 = function t(e, a, i) {
  var o = a - e;
  return xt(e) ? Zf(e, t(0, e.length), a) : bi(i, function(n) {
    return (o + (n - e) % o) % o + e;
  });
}, z0 = function t(e, a, i) {
  var o = a - e, n = o * 2;
  return xt(e) ? Zf(e, t(0, e.length - 1), a) : bi(i, function(r) {
    return r = (n + (r - e) % n) % n || 0, e + (r > o ? n - r : r);
  });
}, cn = function(e) {
  return e.replace(m0, function(a) {
    var i = a.indexOf("[") + 1, o = a.substring(i || 7, i ? a.indexOf("]") : a.length - 1).split(v0);
    return qf(i ? o : +o[0], i ? 0 : +o[1], +o[2] || 1e-5);
  });
}, Lf = function(e, a, i, o, n) {
  var r = a - e, s = o - i;
  return bi(n, function(c) {
    return i + ((c - e) / r * s || 0);
  });
}, U0 = function t(e, a, i, o) {
  var n = isNaN(e + a) ? 0 : function(b) {
    return (1 - b) * e + b * a;
  };
  if (!n) {
    var r = mt(e), s = {}, c, d, l, u, f;
    if (i === !0 && (o = 1) && (i = null), r)
      e = {
        p: e
      }, a = {
        p: a
      };
    else if (xt(e) && !xt(a)) {
      for (l = [], u = e.length, f = u - 2, d = 1; d < u; d++)
        l.push(t(e[d - 1], e[d]));
      u--, n = function(y) {
        y *= u;
        var v = Math.min(f, ~~y);
        return l[v](y - v);
      }, i = a;
    } else o || (e = lo(xt(e) ? [] : {}, e));
    if (!l) {
      for (c in a)
        Pc.call(s, e, c, "get", a[c]);
      n = function(y) {
        return Oc(y, s) || (r ? e.p : e);
      };
    }
  }
  return bi(i, n);
}, Nd = function(e, a, i) {
  var o = e.labels, n = ia, r, s, c;
  for (r in o)
    s = o[r] - a, s < 0 == !!i && s && n > (s = Math.abs(s)) && (c = r, n = s);
  return c;
}, Jt = function(e, a, i) {
  var o = e.vars, n = o[a], r = Be, s = e._ctx, c, d, l;
  if (n)
    return c = o[a + "Params"], d = o.callbackScope || e, i && ni.length && lr(), s && (Be = s), l = c ? n.apply(d, c) : n.call(d), Be = r, l;
}, Eo = function(e) {
  return di(e), e.scrollTrigger && e.scrollTrigger.kill(!!_t), e.progress() < 1 && Jt(e, "onInterrupt"), e;
}, Yi, Nf = [], Df = function(e) {
  if (e)
    if (e = !e.name && e.default || e, kc() || e.headless) {
      var a = e.name, i = it(e), o = a && !i && e.init ? function() {
        this._props = [];
      } : e, n = {
        init: sn,
        render: Oc,
        add: Pc,
        kill: tv,
        modifier: ev,
        rawVars: 0
      }, r = {
        targetTest: 0,
        get: 0,
        getSetter: Ec,
        aliases: {},
        register: 0
      };
      if (po(), e !== o) {
        if (Dt[a])
          return;
        Xt(o, Xt(ur(e, n), r)), lo(o.prototype, lo(n, ur(e, r))), Dt[o.prop = a] = o, e.targetTest && (Kn.push(o), xc[a] = 1), a = (a === "css" ? "CSS" : a.charAt(0).toUpperCase() + a.substr(1)) + "Plugin";
      }
      Tf(a, o), e.register && e.register(Lt, o, qt);
    } else
      Nf.push(e);
}, Ue = 255, Oo = {
  aqua: [0, Ue, Ue],
  lime: [0, Ue, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Ue],
  navy: [0, 0, 128],
  white: [Ue, Ue, Ue],
  olive: [128, 128, 0],
  yellow: [Ue, Ue, 0],
  orange: [Ue, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Ue, 0, 0],
  pink: [Ue, 192, 203],
  cyan: [0, Ue, Ue],
  transparent: [Ue, Ue, Ue, 0]
}, ds = function(e, a, i) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? a + (i - a) * e * 6 : e < 0.5 ? i : e * 3 < 2 ? a + (i - a) * (2 / 3 - e) * 6 : a) * Ue + 0.5 | 0;
}, Bf = function(e, a, i) {
  var o = e ? La(e) ? [e >> 16, e >> 8 & Ue, e & Ue] : 0 : Oo.black, n, r, s, c, d, l, u, f, b, y;
  if (!o) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Oo[e])
      o = Oo[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (n = e.charAt(1), r = e.charAt(2), s = e.charAt(3), e = "#" + n + n + r + r + s + s + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return o = parseInt(e.substr(1, 6), 16), [o >> 16, o >> 8 & Ue, o & Ue, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), o = [e >> 16, e >> 8 & Ue, e & Ue];
    } else if (e.substr(0, 3) === "hsl") {
      if (o = y = e.match(Ud), !a)
        c = +o[0] % 360 / 360, d = +o[1] / 100, l = +o[2] / 100, r = l <= 0.5 ? l * (d + 1) : l + d - l * d, n = l * 2 - r, o.length > 3 && (o[3] *= 1), o[0] = ds(c + 1 / 3, n, r), o[1] = ds(c, n, r), o[2] = ds(c - 1 / 3, n, r);
      else if (~e.indexOf("="))
        return o = e.match(kf), i && o.length < 4 && (o[3] = 1), o;
    } else
      o = e.match(Ud) || Oo.transparent;
    o = o.map(Number);
  }
  return a && !y && (n = o[0] / Ue, r = o[1] / Ue, s = o[2] / Ue, u = Math.max(n, r, s), f = Math.min(n, r, s), l = (u + f) / 2, u === f ? c = d = 0 : (b = u - f, d = l > 0.5 ? b / (2 - u - f) : b / (u + f), c = u === n ? (r - s) / b + (r < s ? 6 : 0) : u === r ? (s - n) / b + 2 : (n - r) / b + 4, c *= 60), o[0] = ~~(c + 0.5), o[1] = ~~(d * 100 + 0.5), o[2] = ~~(l * 100 + 0.5)), i && o.length < 4 && (o[3] = 1), o;
}, Hf = function(e) {
  var a = [], i = [], o = -1;
  return e.split(ri).forEach(function(n) {
    var r = n.match(Ki) || [];
    a.push.apply(a, r), i.push(o += r.length + 1);
  }), a.c = i, a;
}, Dd = function(e, a, i) {
  var o = "", n = (e + o).match(ri), r = a ? "hsla(" : "rgba(", s = 0, c, d, l, u;
  if (!n)
    return e;
  if (n = n.map(function(f) {
    return (f = Bf(f, a, 1)) && r + (a ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), i && (l = Hf(e), c = i.c, c.join(o) !== l.c.join(o)))
    for (d = e.replace(ri, "1").split(Ki), u = d.length - 1; s < u; s++)
      o += d[s] + (~c.indexOf(s) ? n.shift() || r + "0,0,0,0)" : (l.length ? l : n.length ? n : i).shift());
  if (!d)
    for (d = e.split(ri), u = d.length - 1; s < u; s++)
      o += d[s] + n[s];
  return o + d[u];
}, ri = (function() {
  var t = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Oo)
    t += "|" + e + "\\b";
  return new RegExp(t + ")", "gi");
})(), F0 = /hsl[a]?\(/, Jf = function(e) {
  var a = e.join(" "), i;
  if (ri.lastIndex = 0, ri.test(a))
    return i = F0.test(a), e[1] = Dd(e[1], i), e[0] = Dd(e[0], i, Hf(e[1])), !0;
}, dn, Bt = (function() {
  var t = Date.now, e = 500, a = 33, i = t(), o = i, n = 1e3 / 240, r = n, s = [], c, d, l, u, f, b, y = function v(g) {
    var k = t() - o, I = g === !0, S, T, x, D;
    if ((k > e || k < 0) && (i += k - a), o += k, x = o - i, S = x - r, (S > 0 || I) && (D = ++u.frame, f = x - u.time * 1e3, u.time = x = x / 1e3, r += S + (S >= n ? 4 : n - S), T = 1), I || (c = d(v)), T)
      for (b = 0; b < s.length; b++)
        s[b](x, f, D, g);
  };
  return u = {
    time: 0,
    frame: 0,
    tick: function() {
      y(!0);
    },
    deltaRatio: function(g) {
      return f / (1e3 / (g || 60));
    },
    wake: function() {
      Af && (!js && kc() && (ma = js = window, Ic = ma.document || {}, Yt.gsap = Lt, (ma.gsapVersions || (ma.gsapVersions = [])).push(Lt.version), xf(dr || ma.GreenSockGlobals || !ma.gsap && ma || {}), Nf.forEach(Df)), l = typeof requestAnimationFrame < "u" && requestAnimationFrame, c && u.sleep(), d = l || function(g) {
        return setTimeout(g, r - u.time * 1e3 + 1 | 0);
      }, dn = 1, y(2));
    },
    sleep: function() {
      (l ? cancelAnimationFrame : clearTimeout)(c), dn = 0, d = sn;
    },
    lagSmoothing: function(g, k) {
      e = g || 1 / 0, a = Math.min(k || 33, e);
    },
    fps: function(g) {
      n = 1e3 / (g || 240), r = u.time * 1e3 + n;
    },
    add: function(g, k, I) {
      var S = k ? function(T, x, D, V) {
        g(T, x, D, V), u.remove(S);
      } : g;
      return u.remove(g), s[I ? "unshift" : "push"](S), po(), S;
    },
    remove: function(g, k) {
      ~(k = s.indexOf(g)) && s.splice(k, 1) && b >= k && b--;
    },
    _listeners: s
  }, u;
})(), po = function() {
  return !dn && Bt.wake();
}, Pe = {}, q0 = /^[\d.\-M][\d.\-,\s]/, Z0 = /["']/g, L0 = function(e) {
  for (var a = {}, i = e.substr(1, e.length - 3).split(":"), o = i[0], n = 1, r = i.length, s, c, d; n < r; n++)
    c = i[n], s = n !== r - 1 ? c.lastIndexOf(",") : c.length, d = c.substr(0, s), a[o] = isNaN(d) ? d.replace(Z0, "").trim() : +d, o = c.substr(s + 1).trim();
  return a;
}, N0 = function(e) {
  var a = e.indexOf("(") + 1, i = e.indexOf(")"), o = e.indexOf("(", a);
  return e.substring(a, ~o && o < i ? e.indexOf(")", i + 1) : i);
}, D0 = function(e) {
  var a = (e + "").split("("), i = Pe[a[0]];
  return i && a.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [L0(a[1])] : N0(e).split(",").map(Rf)) : Pe._CE && q0.test(e) ? Pe._CE("", e) : i;
}, B0 = function(e) {
  return function(a) {
    return 1 - e(1 - a);
  };
}, Mi = function(e, a) {
  return e && (it(e) ? e : Pe[e] || D0(e)) || a;
}, Ui = function(e, a, i, o) {
  i === void 0 && (i = function(c) {
    return 1 - a(1 - c);
  }), o === void 0 && (o = function(c) {
    return c < 0.5 ? a(c * 2) / 2 : 1 - a((1 - c) * 2) / 2;
  });
  var n = {
    easeIn: a,
    easeOut: i,
    easeInOut: o
  }, r;
  return Ft(e, function(s) {
    Pe[s] = Yt[s] = n, Pe[r = s.toLowerCase()] = i;
    for (var c in n)
      Pe[r + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = Pe[s + "." + c] = n[c];
  }), n;
}, Gf = function(e) {
  return function(a) {
    return a < 0.5 ? (1 - e(1 - a * 2)) / 2 : 0.5 + e((a - 0.5) * 2) / 2;
  };
}, ls = function t(e, a, i) {
  var o = a >= 1 ? a : 1, n = (i || (e ? 0.3 : 0.45)) / (a < 1 ? a : 1), r = n / $s * (Math.asin(1 / o) || 0), s = function(l) {
    return l === 1 ? 1 : o * Math.pow(2, -10 * l) * b0((l - r) * n) + 1;
  }, c = e === "out" ? s : e === "in" ? function(d) {
    return 1 - s(1 - d);
  } : Gf(s);
  return n = $s / n, c.config = function(d, l) {
    return t(e, d, l);
  }, c;
}, us = function t(e, a) {
  a === void 0 && (a = 1.70158);
  var i = function(r) {
    return r ? --r * r * ((a + 1) * r + a) + 1 : 0;
  }, o = e === "out" ? i : e === "in" ? function(n) {
    return 1 - i(1 - n);
  } : Gf(i);
  return o.config = function(n) {
    return t(e, n);
  }, o;
};
Ft("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
  var a = e < 5 ? e + 1 : e;
  Ui(t + ",Power" + (a - 1), e ? function(i) {
    return Math.pow(i, a);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, a);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, a) / 2 : 1 - Math.pow((1 - i) * 2, a) / 2;
  });
});
Pe.Linear.easeNone = Pe.none = Pe.Linear.easeIn;
Ui("Elastic", ls("in"), ls("out"), ls());
(function(t, e) {
  var a = 1 / e, i = 2 * a, o = 2.5 * a, n = function(s) {
    return s < a ? t * s * s : s < i ? t * Math.pow(s - 1.5 / e, 2) + 0.75 : s < o ? t * (s -= 2.25 / e) * s + 0.9375 : t * Math.pow(s - 2.625 / e, 2) + 0.984375;
  };
  Ui("Bounce", function(r) {
    return 1 - n(1 - r);
  }, n);
})(7.5625, 2.75);
Ui("Expo", function(t) {
  return Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t);
});
Ui("Circ", function(t) {
  return -(yf(1 - t * t) - 1);
});
Ui("Sine", function(t) {
  return t === 1 ? 1 : -h0(t * f0) + 1;
});
Ui("Back", us("in"), us("out"), us());
Pe.SteppedEase = Pe.steps = Yt.SteppedEase = {
  config: function(e, a) {
    e === void 0 && (e = 1);
    var i = 1 / e, o = e + (a ? 0 : 1), n = a ? 1 : 0, r = 1 - Fe;
    return function(s) {
      return ((o * kn(0, r, s) | 0) + n) * i;
    };
  }
};
nn.ease = Pe["quad.out"];
Ft("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
  return Tc += t + "," + t + "Params,";
});
var Wf = function(e, a) {
  this.id = p0++, e._gsap = this, this.target = e, this.harness = a, this.get = a ? a.get : Cf, this.set = a ? a.getSetter : Ec;
}, ln = /* @__PURE__ */ (function() {
  function t(a) {
    this.vars = a, this._delay = +a.delay || 0, (this._repeat = a.repeat === 1 / 0 ? -2 : a.repeat || 0) && (this._rDelay = a.repeatDelay || 0, this._yoyo = !!a.yoyo || !!a.yoyoEase), this._ts = 1, fo(this, +a.duration, 1, 1), this.data = a.data, Be && (this._ctx = Be, Be.data.push(this)), dn || Bt.wake();
  }
  var e = t.prototype;
  return e.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, e.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, fo(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(i, o) {
    if (po(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (Ur(this, i), !n._dp || n.parent || Of(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && wa(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !o || this._initted && Math.abs(this._zTime) === Fe || !this._initted && this._dur && i || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Pf(this, i, o)), this;
  }, e.time = function(i, o) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Zd(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), o) : this._time;
  }, e.totalProgress = function(i, o) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, o) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(i, o) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Zd(this), o) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(i, o) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, o) : this._repeat ? uo(this._tTime, n) + 1 : 1;
  }, e.timeScale = function(i, o) {
    if (!arguments.length)
      return this._rts === -Fe ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? fr(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -Fe ? 0 : this._rts, this.totalTime(kn(-Math.abs(this._delay), this.totalDuration(), n), o !== !1), zr(this), x0(this);
  }, e.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (po(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== Fe && (this._tTime -= Fe)))), this) : this._ps;
  }, e.startTime = function(i) {
    if (arguments.length) {
      this._start = Ke(i);
      var o = this.parent || this._dp;
      return o && (o._sort || !this.parent) && wa(o, this, this._start - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(i) {
    return this._start + (Ut(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(i) {
    var o = this.parent || this._dp;
    return o ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? fr(o.rawTime(i), this) : this._tTime : this._tTime;
  }, e.revert = function(i) {
    i === void 0 && (i = w0);
    var o = _t;
    return _t = i, Cc(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), _t = o, this;
  }, e.globalTime = function(i) {
    for (var o = this, n = arguments.length ? i : o.rawTime(); o; )
      n = o._start + n / (Math.abs(o._ts) || 1), o = o._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, e.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, Ld(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(i) {
    if (arguments.length) {
      var o = this._time;
      return this._rDelay = i, Ld(this), o ? this.time(o) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, e.seek = function(i, o) {
    return this.totalTime(ea(this, i), Ut(o));
  }, e.restart = function(i, o) {
    return this.play().totalTime(i ? -this._delay : 0, Ut(o)), this._dur || (this._zTime = -Fe), this;
  }, e.play = function(i, o) {
    return i != null && this.seek(i, o), this.reversed(!1).paused(!1);
  }, e.reverse = function(i, o) {
    return i != null && this.seek(i || this.totalDuration(), o), this.reversed(!0).paused(!1);
  }, e.pause = function(i, o) {
    return i != null && this.seek(i, o), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -Fe : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -Fe, this;
  }, e.isActive = function() {
    var i = this.parent || this._dp, o = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= o && n < this.endTime(!0) - Fe);
  }, e.eventCallback = function(i, o, n) {
    var r = this.vars;
    return arguments.length > 1 ? (o ? (r[i] = o, n && (r[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = o)) : delete r[i], this) : r[i];
  }, e.then = function(i) {
    var o = this, n = o._prom;
    return new Promise(function(r) {
      var s = it(i) ? i : Vf, c = function() {
        var l = o.then;
        o.then = null, n && n(), it(s) && (s = s(o)) && (s.then || s === o) && (o.then = l), r(s), o.then = l;
      };
      o._initted && o.totalProgress() === 1 && o._ts >= 0 || !o._tTime && o._ts < 0 ? c() : o._prom = c;
    });
  }, e.kill = function() {
    Eo(this);
  }, t;
})();
Xt(ln.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -Fe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var jt = /* @__PURE__ */ (function(t) {
  _f(e, t);
  function e(i, o) {
    var n;
    return i === void 0 && (i = {}), n = t.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = Ut(i.sortChildren), Ye && wa(i.parent || Ye, Oa(n), o), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && Mf(Oa(n), i.scrollTrigger), n;
  }
  var a = e.prototype;
  return a.to = function(o, n, r) {
    return Go(0, arguments, this), this;
  }, a.from = function(o, n, r) {
    return Go(1, arguments, this), this;
  }, a.fromTo = function(o, n, r, s) {
    return Go(2, arguments, this), this;
  }, a.set = function(o, n, r) {
    return n.duration = 0, n.parent = this, Jo(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new ft(o, n, ea(this, r), 1), this;
  }, a.call = function(o, n, r) {
    return wa(this, ft.delayedCall(0, o, n), r);
  }, a.staggerTo = function(o, n, r, s, c, d, l) {
    return r.duration = n, r.stagger = r.stagger || s, r.onComplete = d, r.onCompleteParams = l, r.parent = this, new ft(o, r, ea(this, c)), this;
  }, a.staggerFrom = function(o, n, r, s, c, d, l) {
    return r.runBackwards = 1, Jo(r).immediateRender = Ut(r.immediateRender), this.staggerTo(o, n, r, s, c, d, l);
  }, a.staggerFromTo = function(o, n, r, s, c, d, l, u) {
    return s.startAt = r, Jo(s).immediateRender = Ut(s.immediateRender), this.staggerTo(o, n, s, c, d, l, u);
  }, a.render = function(o, n, r) {
    var s = this._time, c = this._dirty ? this.totalDuration() : this._tDur, d = this._dur, l = o <= 0 ? 0 : Ke(o), u = this._zTime < 0 != o < 0 && (this._initted || !d), f, b, y, v, g, k, I, S, T, x, D, V;
    if (this !== Ye && l > c && o >= 0 && (l = c), l !== this._tTime || r || u) {
      if (s !== this._time && d && (l += this._time - s, o += this._time - s), f = l, T = this._start, S = this._ts, k = !S, u && (d || (s = this._zTime), (o || !n) && (this._zTime = o)), this._repeat) {
        if (D = this._yoyo, g = d + this._rDelay, this._repeat < -1 && o < 0)
          return this.totalTime(g * 100 + o, n, r);
        if (f = Ke(l % g), l === c ? (v = this._repeat, f = d) : (x = Ke(l / g), v = ~~x, v && v === x && (f = d, v--), f > d && (f = d)), x = uo(this._tTime, g), !s && this._tTime && x !== v && this._tTime - x * g - this._dur <= 0 && (x = v), D && v & 1 && (f = d - f, V = 1), v !== x && !this._lock) {
          var P = D && x & 1, R = P === (D && v & 1);
          if (v < x && (P = !P), s = P ? 0 : l % d ? d : l, this._lock = 1, this.render(s || (V ? 0 : Ke(v * g)), n, !d)._lock = 0, this._tTime = l, !n && this.parent && Jt(this, "onRepeat"), this.vars.repeatRefresh && !V && (this.invalidate()._lock = 1, x = v), s && s !== this._time || k !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (d = this._dur, c = this._tDur, R && (this._lock = 2, s = P ? d : -1e-4, this.render(s, !0), this.vars.repeatRefresh && !V && this.invalidate()), this._lock = 0, !this._ts && !k)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (I = P0(this, Ke(s), Ke(f)), I && (l -= f - (f = I._start))), this._tTime = l, this._time = f, this._act = !!S, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = o, s = 0), !s && l && d && !n && !x && (Jt(this, "onStart"), this._tTime !== l))
        return this;
      if (f >= s && o >= 0)
        for (b = this._first; b; ) {
          if (y = b._next, (b._act || f >= b._start) && b._ts && I !== b) {
            if (b.parent !== this)
              return this.render(o, n, r);
            if (b.render(b._ts > 0 ? (f - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (f - b._start) * b._ts, n, r), f !== this._time || !this._ts && !k) {
              I = 0, y && (l += this._zTime = -Fe);
              break;
            }
          }
          b = y;
        }
      else {
        b = this._last;
        for (var j = o < 0 ? o : f; b; ) {
          if (y = b._prev, (b._act || j <= b._end) && b._ts && I !== b) {
            if (b.parent !== this)
              return this.render(o, n, r);
            if (b.render(b._ts > 0 ? (j - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (j - b._start) * b._ts, n, r || _t && Cc(b)), f !== this._time || !this._ts && !k) {
              I = 0, y && (l += this._zTime = j ? -Fe : Fe);
              break;
            }
          }
          b = y;
        }
      }
      if (I && !n && (this.pause(), I.render(f >= s ? 0 : -Fe)._zTime = f >= s ? 1 : -1, this._ts))
        return this._start = T, zr(this), this.render(o, n, r);
      this._onUpdate && !n && Jt(this, "onUpdate", !0), (l === c && this._tTime >= this.totalDuration() || !l && s) && (T === this._start || Math.abs(S) !== Math.abs(this._ts)) && (this._lock || ((o || !d) && (l === c && this._ts > 0 || !l && this._ts < 0) && di(this, 1), !n && !(o < 0 && !s) && (l || s || !c) && (Jt(this, l === c && o >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(l < c && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, a.add = function(o, n) {
    var r = this;
    if (La(n) || (n = ea(this, n, o)), !(o instanceof ln)) {
      if (xt(o))
        return o.forEach(function(s) {
          return r.add(s, n);
        }), this;
      if (mt(o))
        return this.addLabel(o, n);
      if (it(o))
        o = ft.delayedCall(0, o);
      else
        return this;
    }
    return this !== o ? wa(this, o, n) : this;
  }, a.getChildren = function(o, n, r, s) {
    o === void 0 && (o = !0), n === void 0 && (n = !0), r === void 0 && (r = !0), s === void 0 && (s = -ia);
    for (var c = [], d = this._first; d; )
      d._start >= s && (d instanceof ft ? n && c.push(d) : (r && c.push(d), o && c.push.apply(c, d.getChildren(!0, n, r)))), d = d._next;
    return c;
  }, a.getById = function(o) {
    for (var n = this.getChildren(1, 1, 1), r = n.length; r--; )
      if (n[r].vars.id === o)
        return n[r];
  }, a.remove = function(o) {
    return mt(o) ? this.removeLabel(o) : it(o) ? this.killTweensOf(o) : (o.parent === this && jr(this, o), o === this._recent && (this._recent = this._last), Oi(this));
  }, a.totalTime = function(o, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Ke(Bt.time - (this._ts > 0 ? o / this._ts : (this.totalDuration() - o) / -this._ts))), t.prototype.totalTime.call(this, o, n), this._forcing = 0, this) : this._tTime;
  }, a.addLabel = function(o, n) {
    return this.labels[o] = ea(this, n), this;
  }, a.removeLabel = function(o) {
    return delete this.labels[o], this;
  }, a.addPause = function(o, n, r) {
    var s = ft.delayedCall(0, n || sn, r);
    return s.data = "isPause", this._hasPause = 1, wa(this, s, ea(this, o));
  }, a.removePause = function(o) {
    var n = this._first;
    for (o = ea(this, o); n; )
      n._start === o && n.data === "isPause" && di(n), n = n._next;
  }, a.killTweensOf = function(o, n, r) {
    for (var s = this.getTweensOf(o, r), c = s.length; c--; )
      ti !== s[c] && s[c].kill(o, n);
    return this;
  }, a.getTweensOf = function(o, n) {
    for (var r = [], s = oa(o), c = this._first, d = La(n), l; c; )
      c instanceof ft ? k0(c._targets, s) && (d ? (!ti || c._initted && c._ts) && c.globalTime(0) <= n && c.globalTime(c.totalDuration()) > n : !n || c.isActive()) && r.push(c) : (l = c.getTweensOf(s, n)).length && r.push.apply(r, l), c = c._next;
    return r;
  }, a.tweenTo = function(o, n) {
    n = n || {};
    var r = this, s = ea(r, o), c = n, d = c.startAt, l = c.onStart, u = c.onStartParams, f = c.immediateRender, b, y = ft.to(r, Xt({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: s,
      overwrite: "auto",
      duration: n.duration || Math.abs((s - (d && "time" in d ? d.time : r._time)) / r.timeScale()) || Fe,
      onStart: function() {
        if (r.pause(), !b) {
          var g = n.duration || Math.abs((s - (d && "time" in d ? d.time : r._time)) / r.timeScale());
          y._dur !== g && fo(y, g, 0, 1).render(y._time, !0, !0), b = 1;
        }
        l && l.apply(y, u || []);
      }
    }, n));
    return f ? y.render(0) : y;
  }, a.tweenFromTo = function(o, n, r) {
    return this.tweenTo(n, Xt({
      startAt: {
        time: ea(this, o)
      }
    }, r));
  }, a.recent = function() {
    return this._recent;
  }, a.nextLabel = function(o) {
    return o === void 0 && (o = this._time), Nd(this, ea(this, o));
  }, a.previousLabel = function(o) {
    return o === void 0 && (o = this._time), Nd(this, ea(this, o), 1);
  }, a.currentLabel = function(o) {
    return arguments.length ? this.seek(o, !0) : this.previousLabel(this._time + Fe);
  }, a.shiftChildren = function(o, n, r) {
    r === void 0 && (r = 0);
    var s = this._first, c = this.labels, d;
    for (o = Ke(o); s; )
      s._start >= r && (s._start += o, s._end += o), s = s._next;
    if (n)
      for (d in c)
        c[d] >= r && (c[d] += o);
    return Oi(this);
  }, a.invalidate = function(o) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(o), n = n._next;
    return t.prototype.invalidate.call(this, o);
  }, a.clear = function(o) {
    o === void 0 && (o = !0);
    for (var n = this._first, r; n; )
      r = n._next, this.remove(n), n = r;
    return this._dp && (this._time = this._tTime = this._pTime = 0), o && (this.labels = {}), Oi(this);
  }, a.totalDuration = function(o) {
    var n = 0, r = this, s = r._last, c = ia, d, l, u;
    if (arguments.length)
      return r.timeScale((r._repeat < 0 ? r.duration() : r.totalDuration()) / (r.reversed() ? -o : o));
    if (r._dirty) {
      for (u = r.parent; s; )
        d = s._prev, s._dirty && s.totalDuration(), l = s._start, l > c && r._sort && s._ts && !r._lock ? (r._lock = 1, wa(r, s, l - s._delay, 1)._lock = 0) : c = l, l < 0 && s._ts && (n -= l, (!u && !r._dp || u && u.smoothChildTiming) && (r._start += Ke(l / r._ts), r._time -= l, r._tTime -= l), r.shiftChildren(-l, !1, -1 / 0), c = 0), s._end > n && s._ts && (n = s._end), s = d;
      fo(r, r === Ye && r._time > n ? r._time : n, 1, 1), r._dirty = 0;
    }
    return r._tDur;
  }, e.updateRoot = function(o) {
    if (Ye._ts && (Pf(Ye, fr(o, Ye)), Sf = Bt.frame), Bt.frame >= Fd) {
      Fd += Kt.autoSleep || 120;
      var n = Ye._first;
      if ((!n || !n._ts) && Kt.autoSleep && Bt._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || Bt.sleep();
      }
    }
  }, e;
})(ln);
Xt(jt.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var H0 = function(e, a, i, o, n, r, s) {
  var c = new qt(this._pt, e, a, 0, 1, tp, null, n), d = 0, l = 0, u, f, b, y, v, g, k, I;
  for (c.b = i, c.e = o, i += "", o += "", (k = ~o.indexOf("random(")) && (o = cn(o)), r && (I = [i, o], r(I, e, a), i = I[0], o = I[1]), f = i.match(ss) || []; u = ss.exec(o); )
    y = u[0], v = o.substring(d, u.index), b ? b = (b + 1) % 5 : v.substr(-5) === "rgba(" && (b = 1), y !== f[l++] && (g = parseFloat(f[l - 1]) || 0, c._pt = {
      _next: c._pt,
      p: v || l === 1 ? v : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: g,
      c: y.charAt(1) === "=" ? ao(g, y) - g : parseFloat(y) - g,
      m: b && b < 4 ? Math.round : 0
    }, d = ss.lastIndex);
  return c.c = d < o.length ? o.substring(d, o.length) : "", c.fp = s, (If.test(o) || k) && (c.e = 0), this._pt = c, c;
}, Pc = function(e, a, i, o, n, r, s, c, d, l) {
  it(o) && (o = o(n || 0, e, r));
  var u = e[a], f = i !== "get" ? i : it(u) ? d ? e[a.indexOf("set") || !it(e["get" + a.substr(3)]) ? a : "get" + a.substr(3)](d) : e[a]() : u, b = it(u) ? d ? Y0 : Qf : Vc, y;
  if (mt(o) && (~o.indexOf("random(") && (o = cn(o)), o.charAt(1) === "=" && (y = ao(f, o) + (It(f) || 0), (y || y === 0) && (o = y))), !l || f !== o || Ns)
    return !isNaN(f * o) && o !== "" ? (y = new qt(this._pt, e, a, +f || 0, o - (f || 0), typeof u == "boolean" ? Q0 : ep, 0, b), d && (y.fp = d), s && y.modifier(s, this, e), this._pt = y) : (!u && !(a in e) && Ac(a, o), H0.call(this, e, a, f, o, b, c || Kt.stringFilter, d));
}, J0 = function(e, a, i, o, n) {
  if (it(e) && (e = Wo(e, n, a, i, o)), !Ca(e) || e.style && e.nodeType || xt(e) || wf(e))
    return mt(e) ? Wo(e, n, a, i, o) : e;
  var r = {}, s;
  for (s in e)
    r[s] = Wo(e[s], n, a, i, o);
  return r;
}, Kf = function(e, a, i, o, n, r) {
  var s, c, d, l;
  if (Dt[e] && (s = new Dt[e]()).init(n, s.rawVars ? a[e] : J0(a[e], o, n, r, i), i, o, r) !== !1 && (i._pt = c = new qt(i._pt, n, e, 0, 1, s.render, s, 0, s.priority), i !== Yi))
    for (d = i._ptLookup[i._targets.indexOf(n)], l = s._props.length; l--; )
      d[s._props[l]] = c;
  return s;
}, ti, Ns, Rc = function t(e, a, i) {
  var o = e.vars, n = o.ease, r = o.startAt, s = o.immediateRender, c = o.lazy, d = o.onUpdate, l = o.runBackwards, u = o.yoyoEase, f = o.keyframes, b = o.autoRevert, y = e._dur, v = e._startAt, g = e._targets, k = e.parent, I = k && k.data === "nested" ? k.vars.targets : g, S = e._overwrite === "auto" && !yc, T = e.timeline, x = o.easeReverse || u, D, V, P, R, j, Q, B, re, de, se, te, Z, K;
  if (T && (!f || !n) && (n = "none"), e._ease = Mi(n, nn.ease), e._rEase = x && (Mi(x) || e._ease), e._from = !T && !!o.runBackwards, e._from && (e.ratio = 1), !T || f && !o.stagger) {
    if (re = g[0] ? Ei(g[0]).harness : 0, Z = re && o[re.prop], D = ur(o, xc), v && (v._zTime < 0 && v.progress(1), a < 0 && l && s && !b ? v.render(-1, !0) : v.revert(l && y ? Wn : y0), v._lazy = 0), r) {
      if (di(e._startAt = ft.set(g, Xt({
        data: "isStart",
        overwrite: !1,
        parent: k,
        immediateRender: !0,
        lazy: !v && Ut(c),
        startAt: null,
        delay: 0,
        onUpdate: d && function() {
          return Jt(e, "onUpdate");
        },
        stagger: 0
      }, r))), e._startAt._dp = 0, e._startAt._sat = e, a < 0 && (_t || !s && !b) && e._startAt.revert(Wn), s && y && a <= 0 && i <= 0) {
        a && (e._zTime = a);
        return;
      }
    } else if (l && y && !v) {
      if (a && (s = !1), P = Xt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: s && !v && Ut(c),
        immediateRender: s,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: k
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, D), Z && (P[re.prop] = Z), di(e._startAt = ft.set(g, P)), e._startAt._dp = 0, e._startAt._sat = e, a < 0 && (_t ? e._startAt.revert(Wn) : e._startAt.render(-1, !0)), e._zTime = a, !s)
        t(e._startAt, Fe, Fe);
      else if (!a)
        return;
    }
    for (e._pt = e._ptCache = 0, c = y && Ut(c) || c && !y, V = 0; V < g.length; V++) {
      if (j = g[V], B = j._gsap || Sc(g)[V]._gsap, e._ptLookup[V] = se = {}, zs[B.id] && ni.length && lr(), te = I === g ? V : I.indexOf(j), re && (de = new re()).init(j, Z || D, e, te, I) !== !1 && (e._pt = R = new qt(e._pt, j, de.name, 0, 1, de.render, de, 0, de.priority), de._props.forEach(function(ue) {
        se[ue] = R;
      }), de.priority && (Q = 1)), !re || Z)
        for (P in D)
          Dt[P] && (de = Kf(P, D, e, te, j, I)) ? de.priority && (Q = 1) : se[P] = R = Pc.call(e, j, P, "get", D[P], te, I, 0, o.stringFilter);
      e._op && e._op[V] && e.kill(j, e._op[V]), S && e._pt && (ti = e, Ye.killTweensOf(j, se, e.globalTime(a)), K = !e.parent, ti = 0), e._pt && c && (zs[B.id] = 1);
    }
    Q && ap(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = d, e._initted = (!e._op || e._pt) && !K, f && a <= 0 && T.render(ia, !0, !0);
}, G0 = function(e, a, i, o, n, r, s, c) {
  var d = (e._pt && e._ptCache || (e._ptCache = {}))[a], l, u, f, b;
  if (!d)
    for (d = e._ptCache[a] = [], f = e._ptLookup, b = e._targets.length; b--; ) {
      if (l = f[b][a], l && l.d && l.d._pt)
        for (l = l.d._pt; l && l.p !== a && l.fp !== a; )
          l = l._next;
      if (!l)
        return Ns = 1, e.vars[a] = "+=0", Rc(e, s), Ns = 0, c ? rn(a + " not eligible for reset. Try splitting into individual properties") : 1;
      d.push(l);
    }
  for (b = d.length; b--; )
    u = d[b], l = u._pt || u, l.s = (o || o === 0) && !n ? o : l.s + (o || 0) + r * l.c, l.c = i - l.s, u.e && (u.e = lt(i) + It(u.e)), u.b && (u.b = l.s + It(u.b));
}, W0 = function(e, a) {
  var i = e[0] ? Ei(e[0]).harness : 0, o = i && i.aliases, n, r, s, c;
  if (!o)
    return a;
  n = lo({}, a);
  for (r in o)
    if (r in n)
      for (c = o[r].split(","), s = c.length; s--; )
        n[c[s]] = n[r];
  return n;
}, K0 = function(e, a, i, o) {
  var n = a.ease || o || "power1.inOut", r, s;
  if (xt(a))
    s = i[e] || (i[e] = []), a.forEach(function(c, d) {
      return s.push({
        t: d / (a.length - 1) * 100,
        v: c,
        e: n
      });
    });
  else
    for (r in a)
      s = i[r] || (i[r] = []), r === "ease" || s.push({
        t: parseFloat(e),
        v: a[r],
        e: n
      });
}, Wo = function(e, a, i, o, n) {
  return it(e) ? e.call(a, i, o, n) : mt(e) && ~e.indexOf("random(") ? cn(e) : e;
}, Yf = Tc + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", Xf = {};
Ft(Yf + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
  return Xf[t] = 1;
});
var ft = /* @__PURE__ */ (function(t) {
  _f(e, t);
  function e(i, o, n, r) {
    var s;
    typeof o == "number" && (n.duration = o, o = n, n = null), s = t.call(this, r ? o : Jo(o)) || this;
    var c = s.vars, d = c.duration, l = c.delay, u = c.immediateRender, f = c.stagger, b = c.overwrite, y = c.keyframes, v = c.defaults, g = c.scrollTrigger, k = o.parent || Ye, I = (xt(i) || wf(i) ? La(i[0]) : "length" in o) ? [i] : oa(i), S, T, x, D, V, P, R, j;
    if (s._targets = I.length ? Sc(I) : rn("GSAP target " + i + " not found. https://gsap.com", !Kt.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = b, y || f || Mn(d) || Mn(l)) {
      o = s.vars;
      var Q = o.easeReverse || o.yoyoEase;
      if (S = s.timeline = new jt({
        data: "nested",
        defaults: v || {},
        targets: k && k.data === "nested" ? k.vars.targets : I
      }), S.kill(), S.parent = S._dp = Oa(s), S._start = 0, f || Mn(d) || Mn(l)) {
        if (D = I.length, R = f && Uf(f), Ca(f))
          for (V in f)
            ~Yf.indexOf(V) && (j || (j = {}), j[V] = f[V]);
        for (T = 0; T < D; T++)
          x = ur(o, Xf), x.stagger = 0, Q && (x.easeReverse = Q), j && lo(x, j), P = I[T], x.duration = +Wo(d, Oa(s), T, P, I), x.delay = (+Wo(l, Oa(s), T, P, I) || 0) - s._delay, !f && D === 1 && x.delay && (s._delay = l = x.delay, s._start += l, x.delay = 0), S.to(P, x, R ? R(T, P, I) : 0), S._ease = Pe.none;
        S.duration() ? d = l = 0 : s.timeline = 0;
      } else if (y) {
        Jo(Xt(S.vars.defaults, {
          ease: "none"
        })), S._ease = Mi(y.ease || o.ease || "none");
        var B = 0, re, de, se;
        if (xt(y))
          y.forEach(function(te) {
            return S.to(I, te, ">");
          }), S.duration();
        else {
          x = {};
          for (V in y)
            V === "ease" || V === "easeEach" || K0(V, y[V], x, y.easeEach);
          for (V in x)
            for (re = x[V].sort(function(te, Z) {
              return te.t - Z.t;
            }), B = 0, T = 0; T < re.length; T++)
              de = re[T], se = {
                ease: de.e,
                duration: (de.t - (T ? re[T - 1].t : 0)) / 100 * d
              }, se[V] = de.v, S.to(I, se, B), B += se.duration;
          S.duration() < d && S.to({}, {
            duration: d - S.duration()
          });
        }
      }
      d || s.duration(d = S.duration());
    } else
      s.timeline = 0;
    return b === !0 && !yc && (ti = Oa(s), Ye.killTweensOf(I), ti = 0), wa(k, Oa(s), n), o.reversed && s.reverse(), o.paused && s.paused(!0), (u || !d && !y && s._start === Ke(k._time) && Ut(u) && T0(Oa(s)) && k.data !== "nested") && (s._tTime = -Fe, s.render(Math.max(0, -l) || 0)), g && Mf(Oa(s), g), s;
  }
  var a = e.prototype;
  return a.render = function(o, n, r) {
    var s = this._time, c = this._tDur, d = this._dur, l = o < 0, u = o > c - Fe && !l ? c : o < Fe ? 0 : o, f, b, y, v, g, k, I, S;
    if (!d)
      C0(this, o, n, r);
    else if (u !== this._tTime || !o || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== l || this._lazy) {
      if (f = u, S = this.timeline, this._repeat) {
        if (v = d + this._rDelay, this._repeat < -1 && l)
          return this.totalTime(v * 100 + o, n, r);
        if (f = Ke(u % v), u === c ? (y = this._repeat, f = d) : (g = Ke(u / v), y = ~~g, y && y === g ? (f = d, y--) : f > d && (f = d)), k = this._yoyo && y & 1, k && (f = d - f), g = uo(this._tTime, v), f === s && !r && this._initted && y === g)
          return this._tTime = u, this;
        y !== g && this.vars.repeatRefresh && !k && !this._lock && f !== v && this._initted && (this._lock = r = 1, this.render(Ke(v * y), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if ($f(this, l ? o : f, r, n, u))
          return this._tTime = 0, this;
        if (s !== this._time && !(r && this.vars.repeatRefresh && y !== g))
          return this;
        if (d !== this._dur)
          return this.render(o, n, r);
      }
      if (this._rEase) {
        var T = f < s;
        if (T !== this._inv) {
          var x = T ? s : d - s;
          this._inv = T, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = s, this._invRecip = x ? (T ? -1 : 1) / x : 0, this._invScale = T ? -this.ratio : 1 - this.ratio, this._invEase = T ? this._rEase : this._ease;
        }
        this.ratio = I = this._invRatio + this._invScale * this._invEase((f - this._invTime) * this._invRecip);
      } else
        this.ratio = I = this._ease(f / d);
      if (this._from && (this.ratio = I = 1 - I), this._tTime = u, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), !s && u && !n && !g && (Jt(this, "onStart"), this._tTime !== u))
        return this;
      for (b = this._pt; b; )
        b.r(I, b.d), b = b._next;
      S && S.render(o < 0 ? o : S._dur * S._ease(f / this._dur), n, r) || this._startAt && (this._zTime = o), this._onUpdate && !n && (l && Us(this, o, n, r), Jt(this, "onUpdate")), this._repeat && y !== g && this.vars.onRepeat && !n && this.parent && Jt(this, "onRepeat"), (u === this._tDur || !u) && this._tTime === u && (l && !this._onUpdate && Us(this, o, !0, !0), (o || !d) && (u === this._tDur && this._ts > 0 || !u && this._ts < 0) && di(this, 1), !n && !(l && !s) && (u || s || k) && (Jt(this, u === c ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < c && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, a.targets = function() {
    return this._targets;
  }, a.invalidate = function(o) {
    return (!o || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(o), t.prototype.invalidate.call(this, o);
  }, a.resetTo = function(o, n, r, s, c) {
    dn || Bt.wake(), this._ts || this.play();
    var d = Math.min(this._dur, (this._dp._time - this._start) * this._ts), l;
    return this._initted || Rc(this, d), l = this._ease(d / this._dur), G0(this, o, n, r, s, l, d, c) ? this.resetTo(o, n, r, s, 1) : (Ur(this, 0), this.parent || Ef(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, a.kill = function(o, n) {
    if (n === void 0 && (n = "all"), !o && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Eo(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_t), this;
    if (this.timeline) {
      var r = this.timeline.totalDuration();
      return this.timeline.killTweensOf(o, n, ti && ti.vars.overwrite !== !0)._first || Eo(this), this.parent && r !== this.timeline.totalDuration() && fo(this, this._dur * this.timeline._tDur / r, 0, 1), this;
    }
    var s = this._targets, c = o ? oa(o) : s, d = this._ptLookup, l = this._pt, u, f, b, y, v, g, k;
    if ((!n || n === "all") && A0(s, c))
      return n === "all" && (this._pt = 0), Eo(this);
    for (u = this._op = this._op || [], n !== "all" && (mt(n) && (v = {}, Ft(n, function(I) {
      return v[I] = 1;
    }), n = v), n = W0(s, n)), k = s.length; k--; )
      if (~c.indexOf(s[k])) {
        f = d[k], n === "all" ? (u[k] = n, y = f, b = {}) : (b = u[k] = u[k] || {}, y = n);
        for (v in y)
          g = f && f[v], g && ((!("kill" in g.d) || g.d.kill(v) === !0) && jr(this, g, "_pt"), delete f[v]), b !== "all" && (b[v] = 1);
      }
    return this._initted && !this._pt && l && Eo(this), this;
  }, e.to = function(o, n) {
    return new e(o, n, arguments[2]);
  }, e.from = function(o, n) {
    return Go(1, arguments);
  }, e.delayedCall = function(o, n, r, s) {
    return new e(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: o,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: r,
      onReverseCompleteParams: r,
      callbackScope: s
    });
  }, e.fromTo = function(o, n, r) {
    return Go(2, arguments);
  }, e.set = function(o, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new e(o, n);
  }, e.killTweensOf = function(o, n, r) {
    return Ye.killTweensOf(o, n, r);
  }, e;
})(ln);
Xt(ft.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Ft("staggerTo,staggerFrom,staggerFromTo", function(t) {
  ft[t] = function() {
    var e = new jt(), a = qs.call(arguments, 0);
    return a.splice(t === "staggerFromTo" ? 5 : 4, 0, 0), e[t].apply(e, a);
  };
});
var Vc = function(e, a, i) {
  return e[a] = i;
}, Qf = function(e, a, i) {
  return e[a](i);
}, Y0 = function(e, a, i, o) {
  return e[a](o.fp, i);
}, X0 = function(e, a, i) {
  return e.setAttribute(a, i);
}, Ec = function(e, a) {
  return it(e[a]) ? Qf : wc(e[a]) && e.setAttribute ? X0 : Vc;
}, ep = function(e, a) {
  return a.set(a.t, a.p, Math.round((a.s + a.c * e) * 1e6) / 1e6, a);
}, Q0 = function(e, a) {
  return a.set(a.t, a.p, !!(a.s + a.c * e), a);
}, tp = function(e, a) {
  var i = a._pt, o = "";
  if (!e && a.b)
    o = a.b;
  else if (e === 1 && a.e)
    o = a.e;
  else {
    for (; i; )
      o = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + o, i = i._next;
    o += a.c;
  }
  a.set(a.t, a.p, o, a);
}, Oc = function(e, a) {
  for (var i = a._pt; i; )
    i.r(e, i.d), i = i._next;
}, ev = function(e, a, i, o) {
  for (var n = this._pt, r; n; )
    r = n._next, n.p === o && n.modifier(e, a, i), n = r;
}, tv = function(e) {
  for (var a = this._pt, i, o; a; )
    o = a._next, a.p === e && !a.op || a.op === e ? jr(this, a, "_pt") : a.dep || (i = 1), a = o;
  return !i;
}, av = function(e, a, i, o) {
  o.mSet(e, a, o.m.call(o.tween, i, o.mt), o);
}, ap = function(e) {
  for (var a = e._pt, i, o, n, r; a; ) {
    for (i = a._next, o = n; o && o.pr > a.pr; )
      o = o._next;
    (a._prev = o ? o._prev : r) ? a._prev._next = a : n = a, (a._next = o) ? o._prev = a : r = a, a = i;
  }
  e._pt = n;
}, qt = /* @__PURE__ */ (function() {
  function t(a, i, o, n, r, s, c, d, l) {
    this.t = i, this.s = n, this.c = r, this.p = o, this.r = s || ep, this.d = c || this, this.set = d || Vc, this.pr = l || 0, this._next = a, a && (a._prev = this);
  }
  var e = t.prototype;
  return e.modifier = function(i, o, n) {
    this.mSet = this.mSet || this.set, this.set = av, this.m = i, this.mt = n, this.tween = o;
  }, t;
})();
Ft(Tc + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(t) {
  return xc[t] = 1;
});
Yt.TweenMax = Yt.TweenLite = ft;
Yt.TimelineLite = Yt.TimelineMax = jt;
Ye = new jt({
  sortChildren: !1,
  defaults: nn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Kt.stringFilter = Jf;
var $i = [], Yn = {}, iv = [], Bd = 0, ov = 0, fs = function(e) {
  return (Yn[e] || iv).map(function(a) {
    return a();
  });
}, Ds = function() {
  var e = Date.now(), a = [];
  e - Bd > 2 && (fs("matchMediaInit"), $i.forEach(function(i) {
    var o = i.queries, n = i.conditions, r, s, c, d;
    for (s in o)
      r = ma.matchMedia(o[s]).matches, r && (c = 1), r !== n[s] && (n[s] = r, d = 1);
    d && (i.revert(), c && a.push(i));
  }), fs("matchMediaRevert"), a.forEach(function(i) {
    return i.onMatch(i, function(o) {
      return i.add(null, o);
    });
  }), Bd = e, fs("matchMedia"));
}, ip = /* @__PURE__ */ (function() {
  function t(a, i) {
    this.selector = i && Zs(i), this.data = [], this._r = [], this.isReverted = !1, this.id = ov++, a && this.add(a);
  }
  var e = t.prototype;
  return e.add = function(i, o, n) {
    it(i) && (n = o, o = i, i = it);
    var r = this, s = function() {
      var d = Be, l = r.selector, u;
      return d && d !== r && d.data.push(r), n && (r.selector = Zs(n)), Be = r, u = o.apply(r, arguments), it(u) && r._r.push(u), Be = d, r.selector = l, r.isReverted = !1, u;
    };
    return r.last = s, i === it ? s(r, function(c) {
      return r.add(null, c);
    }) : i ? r[i] = s : s;
  }, e.ignore = function(i) {
    var o = Be;
    Be = null, i(this), Be = o;
  }, e.getTweens = function() {
    var i = [];
    return this.data.forEach(function(o) {
      return o instanceof t ? i.push.apply(i, o.getTweens()) : o instanceof ft && !(o.parent && o.parent.data === "nested") && i.push(o);
    }), i;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(i, o) {
    var n = this;
    if (i ? (function() {
      for (var s = n.getTweens(), c = n.data.length, d; c--; )
        d = n.data[c], d.data === "isFlip" && (d.revert(), d.getChildren(!0, !0, !1).forEach(function(l) {
          return s.splice(s.indexOf(l), 1);
        }));
      for (s.map(function(l) {
        return {
          g: l._dur || l._delay || l._sat && !l._sat.vars.immediateRender ? l.globalTime(0) : -1 / 0,
          t: l
        };
      }).sort(function(l, u) {
        return u.g - l.g || -1 / 0;
      }).forEach(function(l) {
        return l.t.revert(i);
      }), c = n.data.length; c--; )
        d = n.data[c], d instanceof jt ? d.data !== "nested" && (d.scrollTrigger && d.scrollTrigger.revert(), d.kill()) : !(d instanceof ft) && d.revert && d.revert(i);
      n._r.forEach(function(l) {
        return l(i, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(s) {
      return s.kill && s.kill();
    }), this.clear(), o)
      for (var r = $i.length; r--; )
        $i[r].id === this.id && $i.splice(r, 1);
  }, e.revert = function(i) {
    this.kill(i || {});
  }, t;
})(), nv = /* @__PURE__ */ (function() {
  function t(a) {
    this.contexts = [], this.scope = a, Be && Be.data.push(this);
  }
  var e = t.prototype;
  return e.add = function(i, o, n) {
    Ca(i) || (i = {
      matches: i
    });
    var r = new ip(0, n || this.scope), s = r.conditions = {}, c, d, l;
    Be && !r.selector && (r.selector = Be.selector), this.contexts.push(r), o = r.add("onMatch", o), r.queries = i;
    for (d in i)
      d === "all" ? l = 1 : (c = ma.matchMedia(i[d]), c && ($i.indexOf(r) < 0 && $i.push(r), (s[d] = c.matches) && (l = 1), c.addListener ? c.addListener(Ds) : c.addEventListener("change", Ds)));
    return l && o(r, function(u) {
      return r.add(null, u);
    }), this;
  }, e.revert = function(i) {
    this.kill(i || {});
  }, e.kill = function(i) {
    this.contexts.forEach(function(o) {
      return o.kill(i, !0);
    });
  }, t;
})(), pr = {
  registerPlugin: function() {
    for (var e = arguments.length, a = new Array(e), i = 0; i < e; i++)
      a[i] = arguments[i];
    a.forEach(function(o) {
      return Df(o);
    });
  },
  timeline: function(e) {
    return new jt(e);
  },
  getTweensOf: function(e, a) {
    return Ye.getTweensOf(e, a);
  },
  getProperty: function(e, a, i, o) {
    mt(e) && (e = oa(e)[0]);
    var n = Ei(e || {}).get, r = i ? Vf : Rf;
    return i === "native" && (i = ""), e && (a ? r((Dt[a] && Dt[a].get || n)(e, a, i, o)) : function(s, c, d) {
      return r((Dt[s] && Dt[s].get || n)(e, s, c, d));
    });
  },
  quickSetter: function(e, a, i) {
    if (e = oa(e), e.length > 1) {
      var o = e.map(function(l) {
        return Lt.quickSetter(l, a, i);
      }), n = o.length;
      return function(l) {
        for (var u = n; u--; )
          o[u](l);
      };
    }
    e = e[0] || {};
    var r = Dt[a], s = Ei(e), c = s.harness && (s.harness.aliases || {})[a] || a, d = r ? function(l) {
      var u = new r();
      Yi._pt = 0, u.init(e, i ? l + i : l, Yi, 0, [e]), u.render(1, u), Yi._pt && Oc(1, Yi);
    } : s.set(e, c);
    return r ? d : function(l) {
      return d(e, c, i ? l + i : l, s, 1);
    };
  },
  quickTo: function(e, a, i) {
    var o, n = Lt.to(e, Xt((o = {}, o[a] = "+=0.1", o.paused = !0, o.stagger = 0, o), i || {})), r = function(c, d, l) {
      return n.resetTo(a, c, d, l);
    };
    return r.tween = n, r;
  },
  isTweening: function(e) {
    return Ye.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Mi(e.ease, nn.ease)), qd(nn, e || {});
  },
  config: function(e) {
    return qd(Kt, e || {});
  },
  registerEffect: function(e) {
    var a = e.name, i = e.effect, o = e.plugins, n = e.defaults, r = e.extendTimeline;
    (o || "").split(",").forEach(function(s) {
      return s && !Dt[s] && !Yt[s] && rn(a + " effect requires " + s + " plugin.");
    }), cs[a] = function(s, c, d) {
      return i(oa(s), Xt(c || {}, n), d);
    }, r && (jt.prototype[a] = function(s, c, d) {
      return this.add(cs[a](s, Ca(c) ? c : (d = c) && {}, this), d);
    });
  },
  registerEase: function(e, a) {
    Pe[e] = Mi(a);
  },
  parseEase: function(e, a) {
    return arguments.length ? Mi(e, a) : Pe;
  },
  getById: function(e) {
    return Ye.getById(e);
  },
  exportRoot: function(e, a) {
    e === void 0 && (e = {});
    var i = new jt(e), o, n;
    for (i.smoothChildTiming = Ut(e.smoothChildTiming), Ye.remove(i), i._dp = 0, i._time = i._tTime = Ye._time, o = Ye._first; o; )
      n = o._next, (a || !(!o._dur && o instanceof ft && o.vars.onComplete === o._targets[0])) && wa(i, o, o._start - o._delay), o = n;
    return wa(Ye, i, 0), i;
  },
  context: function(e, a) {
    return e ? new ip(e, a) : Be;
  },
  matchMedia: function(e) {
    return new nv(e);
  },
  matchMediaRefresh: function() {
    return $i.forEach(function(e) {
      var a = e.conditions, i, o;
      for (o in a)
        a[o] && (a[o] = !1, i = 1);
      i && e.revert();
    }) || Ds();
  },
  addEventListener: function(e, a) {
    var i = Yn[e] || (Yn[e] = []);
    ~i.indexOf(a) || i.push(a);
  },
  removeEventListener: function(e, a) {
    var i = Yn[e], o = i && i.indexOf(a);
    o >= 0 && i.splice(o, 1);
  },
  utils: {
    wrap: j0,
    wrapYoyo: z0,
    distribute: Uf,
    random: qf,
    snap: Ff,
    normalize: $0,
    getUnit: It,
    clamp: V0,
    splitColor: Bf,
    toArray: oa,
    selector: Zs,
    mapRange: Lf,
    pipe: O0,
    unitize: M0,
    interpolate: U0,
    shuffle: zf
  },
  install: xf,
  effects: cs,
  ticker: Bt,
  updateRoot: jt.updateRoot,
  plugins: Dt,
  globalTimeline: Ye,
  core: {
    PropTween: qt,
    globals: Tf,
    Tween: ft,
    Timeline: jt,
    Animation: ln,
    getCache: Ei,
    _removeLinkedListItem: jr,
    reverting: function() {
      return _t;
    },
    context: function(e) {
      return e && Be && (Be.data.push(e), e._ctx = Be), Be;
    },
    suppressOverwrites: function(e) {
      return yc = e;
    }
  }
};
Ft("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
  return pr[t] = ft[t];
});
Bt.add(jt.updateRoot);
Yi = pr.to({}, {
  duration: 0
});
var rv = function(e, a) {
  for (var i = e._pt; i && i.p !== a && i.op !== a && i.fp !== a; )
    i = i._next;
  return i;
}, sv = function(e, a) {
  var i = e._targets, o, n, r;
  for (o in a)
    for (n = i.length; n--; )
      r = e._ptLookup[n][o], r && (r = r.d) && (r._pt && (r = rv(r, o)), r && r.modifier && r.modifier(a[o], e, i[n], o));
}, ps = function(e, a) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(o, n, r) {
      r._onInit = function(s) {
        var c, d;
        if (mt(n) && (c = {}, Ft(n, function(l) {
          return c[l] = 1;
        }), n = c), a) {
          c = {};
          for (d in n)
            c[d] = a(n[d]);
          n = c;
        }
        sv(s, n);
      };
    }
  };
}, Lt = pr.registerPlugin({
  name: "attr",
  init: function(e, a, i, o, n) {
    var r, s, c;
    this.tween = i;
    for (r in a)
      c = e.getAttribute(r) || "", s = this.add(e, "setAttribute", (c || 0) + "", a[r], o, n, 0, 0, r), s.op = r, s.b = c, this._props.push(r);
  },
  render: function(e, a) {
    for (var i = a._pt; i; )
      _t ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, a) {
    for (var i = a.length; i--; )
      this.add(e, i, e[i] || 0, a[i], 0, 0, 0, 0, 0, 1);
  }
}, ps("roundProps", Ls), ps("modifiers"), ps("snap", Ff)) || pr;
ft.version = jt.version = Lt.version = "3.15.0";
Af = 1;
kc() && po();
Pe.Power0;
Pe.Power1;
Pe.Power2;
Pe.Power3;
Pe.Power4;
Pe.Linear;
Pe.Quad;
Pe.Cubic;
Pe.Quart;
Pe.Quint;
Pe.Strong;
Pe.Elastic;
Pe.Back;
Pe.SteppedEase;
Pe.Bounce;
Pe.Sine;
Pe.Expo;
Pe.Circ;
var Hd, ai, io, Mc, Pi, Jd, $c, cv = function() {
  return typeof window < "u";
}, Na = {}, xi = 180 / Math.PI, oo = Math.PI / 180, Hi = Math.atan2, Gd = 1e8, jc = /([A-Z])/g, dv = /(left|right|width|margin|padding|x)/i, lv = /[\s,\(]\S/, Ia = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Bs = function(e, a) {
  return a.set(a.t, a.p, Math.round((a.s + a.c * e) * 1e4) / 1e4 + a.u, a);
}, uv = function(e, a) {
  return a.set(a.t, a.p, e === 1 ? a.e : Math.round((a.s + a.c * e) * 1e4) / 1e4 + a.u, a);
}, fv = function(e, a) {
  return a.set(a.t, a.p, e ? Math.round((a.s + a.c * e) * 1e4) / 1e4 + a.u : a.b, a);
}, pv = function(e, a) {
  return a.set(a.t, a.p, e === 1 ? a.e : e ? Math.round((a.s + a.c * e) * 1e4) / 1e4 + a.u : a.b, a);
}, hv = function(e, a) {
  var i = a.s + a.c * e;
  a.set(a.t, a.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + a.u, a);
}, op = function(e, a) {
  return a.set(a.t, a.p, e ? a.e : a.b, a);
}, np = function(e, a) {
  return a.set(a.t, a.p, e !== 1 ? a.b : a.e, a);
}, bv = function(e, a, i) {
  return e.style[a] = i;
}, mv = function(e, a, i) {
  return e.style.setProperty(a, i);
}, vv = function(e, a, i) {
  return e._gsap[a] = i;
}, gv = function(e, a, i) {
  return e._gsap.scaleX = e._gsap.scaleY = i;
}, _v = function(e, a, i, o, n) {
  var r = e._gsap;
  r.scaleX = r.scaleY = i, r.renderTransform(n, r);
}, yv = function(e, a, i, o, n) {
  var r = e._gsap;
  r[a] = i, r.renderTransform(n, r);
}, Xe = "transform", Zt = Xe + "Origin", wv = function t(e, a) {
  var i = this, o = this.target, n = o.style, r = o._gsap;
  if (e in Na && n) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Ia[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(s) {
        return i.tfm[s] = $a(o, s);
      }) : this.tfm[e] = r.x ? r[e] : $a(o, e), e === Zt && (this.tfm.zOrigin = r.zOrigin);
    else
      return Ia.transform.split(",").forEach(function(s) {
        return t.call(i, s, a);
      });
    if (this.props.indexOf(Xe) >= 0)
      return;
    r.svg && (this.svgo = o.getAttribute("data-svg-origin"), this.props.push(Zt, a, "")), e = Xe;
  }
  (n || a) && this.props.push(e, a, n[e]);
}, rp = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, kv = function() {
  var e = this.props, a = this.target, i = a.style, o = a._gsap, n, r;
  for (n = 0; n < e.length; n += 3)
    e[n + 1] ? e[n + 1] === 2 ? a[e[n]](e[n + 2]) : a[e[n]] = e[n + 2] : e[n + 2] ? i[e[n]] = e[n + 2] : i.removeProperty(e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(jc, "-$1").toLowerCase());
  if (this.tfm) {
    for (r in this.tfm)
      o[r] = this.tfm[r];
    o.svg && (o.renderTransform(), a.setAttribute("data-svg-origin", this.svgo || "")), n = $c(), (!n || !n.isStart) && !i[Xe] && (rp(i), o.zOrigin && i[Zt] && (i[Zt] += " " + o.zOrigin + "px", o.zOrigin = 0, o.renderTransform()), o.uncache = 1);
  }
}, sp = function(e, a) {
  var i = {
    target: e,
    props: [],
    revert: kv,
    save: wv
  };
  return e._gsap || Lt.core.getCache(e), a && e.style && e.nodeType && a.split(",").forEach(function(o) {
    return i.save(o);
  }), i;
}, cp, Hs = function(e, a) {
  var i = ai.createElementNS ? ai.createElementNS((a || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : ai.createElement(e);
  return i && i.style ? i : ai.createElement(e);
}, Gt = function t(e, a, i) {
  var o = getComputedStyle(e);
  return o[a] || o.getPropertyValue(a.replace(jc, "-$1").toLowerCase()) || o.getPropertyValue(a) || !i && t(e, ho(a) || a, 1) || "";
}, Wd = "O,Moz,ms,Ms,Webkit".split(","), ho = function(e, a, i) {
  var o = a || Pi, n = o.style, r = 5;
  if (e in n && !i)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); r-- && !(Wd[r] + e in n); )
    ;
  return r < 0 ? null : (r === 3 ? "ms" : r >= 0 ? Wd[r] : "") + e;
}, Js = function() {
  cv() && window.document && (Hd = window, ai = Hd.document, io = ai.documentElement, Pi = Hs("div") || {
    style: {}
  }, Hs("div"), Xe = ho(Xe), Zt = Xe + "Origin", Pi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", cp = !!ho("perspective"), $c = Lt.core.reverting, Mc = 1);
}, Kd = function(e) {
  var a = e.ownerSVGElement, i = Hs("svg", a && a.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), o = e.cloneNode(!0), n;
  o.style.display = "block", i.appendChild(o), io.appendChild(i);
  try {
    n = o.getBBox();
  } catch {
  }
  return i.removeChild(o), io.removeChild(i), n;
}, Yd = function(e, a) {
  for (var i = a.length; i--; )
    if (e.hasAttribute(a[i]))
      return e.getAttribute(a[i]);
}, dp = function(e) {
  var a, i;
  try {
    a = e.getBBox();
  } catch {
    a = Kd(e), i = 1;
  }
  return a && (a.width || a.height) || i || (a = Kd(e)), a && !a.width && !a.x && !a.y ? {
    x: +Yd(e, ["x", "cx", "x1"]) || 0,
    y: +Yd(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : a;
}, lp = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && dp(e));
}, li = function(e, a) {
  if (a) {
    var i = e.style, o;
    a in Na && a !== Zt && (a = Xe), i.removeProperty ? (o = a.substr(0, 2), (o === "ms" || a.substr(0, 6) === "webkit") && (a = "-" + a), i.removeProperty(o === "--" ? a : a.replace(jc, "-$1").toLowerCase())) : i.removeAttribute(a);
  }
}, ii = function(e, a, i, o, n, r) {
  var s = new qt(e._pt, a, i, 0, 1, r ? np : op);
  return e._pt = s, s.b = o, s.e = n, e._props.push(i), s;
}, Xd = {
  deg: 1,
  rad: 1,
  turn: 1
}, Iv = {
  grid: 1,
  flex: 1
}, ui = function t(e, a, i, o) {
  var n = parseFloat(i) || 0, r = (i + "").trim().substr((n + "").length) || "px", s = Pi.style, c = dv.test(a), d = e.tagName.toLowerCase() === "svg", l = (d ? "client" : "offset") + (c ? "Width" : "Height"), u = 100, f = o === "px", b = o === "%", y, v, g, k;
  if (o === r || !n || Xd[o] || Xd[r])
    return n;
  if (r !== "px" && !f && (n = t(e, a, i, "px")), k = e.getCTM && lp(e), (b || r === "%") && (Na[a] || ~a.indexOf("adius")))
    return y = k ? e.getBBox()[c ? "width" : "height"] : e[l], lt(b ? n / y * u : n / 100 * y);
  if (s[c ? "width" : "height"] = u + (f ? r : o), v = o !== "rem" && ~a.indexOf("adius") || o === "em" && e.appendChild && !d ? e : e.parentNode, k && (v = (e.ownerSVGElement || {}).parentNode), (!v || v === ai || !v.appendChild) && (v = ai.body), g = v._gsap, g && b && g.width && c && g.time === Bt.time && !g.uncache)
    return lt(n / g.width * u);
  if (b && (a === "height" || a === "width")) {
    var I = e.style[a];
    e.style[a] = u + o, y = e[l], I ? e.style[a] = I : li(e, a);
  } else
    (b || r === "%") && !Iv[Gt(v, "display")] && (s.position = Gt(e, "position")), v === e && (s.position = "static"), v.appendChild(Pi), y = Pi[l], v.removeChild(Pi), s.position = "absolute";
  return c && b && (g = Ei(v), g.time = Bt.time, g.width = v[l]), lt(f ? y * n / u : y && n ? u / y * n : 0);
}, $a = function(e, a, i, o) {
  var n;
  return Mc || Js(), a in Ia && a !== "transform" && (a = Ia[a], ~a.indexOf(",") && (a = a.split(",")[0])), Na[a] && a !== "transform" ? (n = fn(e, o), n = a !== "transformOrigin" ? n[a] : n.svg ? n.origin : br(Gt(e, Zt)) + " " + n.zOrigin + "px") : (n = e.style[a], (!n || n === "auto" || o || ~(n + "").indexOf("calc(")) && (n = hr[a] && hr[a](e, a, i) || Gt(e, a) || Cf(e, a) || (a === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? ui(e, a, n, i) + i : n;
}, Av = function(e, a, i, o) {
  if (!i || i === "none") {
    var n = ho(a, e, 1), r = n && Gt(e, n, 1);
    r && r !== i ? (a = n, i = r) : a === "borderColor" && (i = Gt(e, "borderTopColor"));
  }
  var s = new qt(this._pt, e.style, a, 0, 1, tp), c = 0, d = 0, l, u, f, b, y, v, g, k, I, S, T, x;
  if (s.b = i, s.e = o, i += "", o += "", o.substring(0, 6) === "var(--" && (o = Gt(e, o.substring(4, o.indexOf(")")))), o === "auto" && (v = e.style[a], e.style[a] = o, o = Gt(e, a) || o, v ? e.style[a] = v : li(e, a)), l = [i, o], Jf(l), i = l[0], o = l[1], f = i.match(Ki) || [], x = o.match(Ki) || [], x.length) {
    for (; u = Ki.exec(o); )
      g = u[0], I = o.substring(c, u.index), y ? y = (y + 1) % 5 : (I.substr(-5) === "rgba(" || I.substr(-5) === "hsla(") && (y = 1), g !== (v = f[d++] || "") && (b = parseFloat(v) || 0, T = v.substr((b + "").length), g.charAt(1) === "=" && (g = ao(b, g) + T), k = parseFloat(g), S = g.substr((k + "").length), c = Ki.lastIndex - S.length, S || (S = S || Kt.units[a] || T, c === o.length && (o += S, s.e += S)), T !== S && (b = ui(e, a, v, S) || 0), s._pt = {
        _next: s._pt,
        p: I || d === 1 ? I : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: b,
        c: k - b,
        m: y && y < 4 || a === "zIndex" ? Math.round : 0
      });
    s.c = c < o.length ? o.substring(c, o.length) : "";
  } else
    s.r = a === "display" && o === "none" ? np : op;
  return If.test(o) && (s.e = 0), this._pt = s, s;
}, Qd = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, xv = function(e) {
  var a = e.split(" "), i = a[0], o = a[1] || "50%";
  return (i === "top" || i === "bottom" || o === "left" || o === "right") && (e = i, i = o, o = e), a[0] = Qd[i] || i, a[1] = Qd[o] || o, a.join(" ");
}, Tv = function(e, a) {
  if (a.tween && a.tween._time === a.tween._dur) {
    var i = a.t, o = i.style, n = a.u, r = i._gsap, s, c, d;
    if (n === "all" || n === !0)
      o.cssText = "", c = 1;
    else
      for (n = n.split(","), d = n.length; --d > -1; )
        s = n[d], Na[s] && (c = 1, s = s === "transformOrigin" ? Zt : Xe), li(i, s);
    c && (li(i, Xe), r && (r.svg && i.removeAttribute("transform"), o.scale = o.rotate = o.translate = "none", fn(i, 1), r.uncache = 1, rp(o)));
  }
}, hr = {
  clearProps: function(e, a, i, o, n) {
    if (n.data !== "isFromStart") {
      var r = e._pt = new qt(e._pt, a, i, 0, 0, Tv);
      return r.u = o, r.pr = -10, r.tween = n, e._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, un = [1, 0, 0, 1, 0, 0], up = {}, fp = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, el = function(e) {
  var a = Gt(e, Xe);
  return fp(a) ? un : a.substr(7).match(kf).map(lt);
}, zc = function(e, a) {
  var i = e._gsap || Ei(e), o = e.style, n = el(e), r, s, c, d;
  return i.svg && e.getAttribute("transform") ? (c = e.transform.baseVal.consolidate().matrix, n = [c.a, c.b, c.c, c.d, c.e, c.f], n.join(",") === "1,0,0,1,0,0" ? un : n) : (n === un && !e.offsetParent && e !== io && !i.svg && (c = o.display, o.display = "block", r = e.parentNode, (!r || !e.offsetParent && !e.getBoundingClientRect().width) && (d = 1, s = e.nextElementSibling, io.appendChild(e)), n = el(e), c ? o.display = c : li(e, "display"), d && (s ? r.insertBefore(e, s) : r ? r.appendChild(e) : io.removeChild(e))), a && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Gs = function(e, a, i, o, n, r) {
  var s = e._gsap, c = n || zc(e, !0), d = s.xOrigin || 0, l = s.yOrigin || 0, u = s.xOffset || 0, f = s.yOffset || 0, b = c[0], y = c[1], v = c[2], g = c[3], k = c[4], I = c[5], S = a.split(" "), T = parseFloat(S[0]) || 0, x = parseFloat(S[1]) || 0, D, V, P, R;
  i ? c !== un && (V = b * g - y * v) && (P = T * (g / V) + x * (-v / V) + (v * I - g * k) / V, R = T * (-y / V) + x * (b / V) - (b * I - y * k) / V, T = P, x = R) : (D = dp(e), T = D.x + (~S[0].indexOf("%") ? T / 100 * D.width : T), x = D.y + (~(S[1] || S[0]).indexOf("%") ? x / 100 * D.height : x)), o || o !== !1 && s.smooth ? (k = T - d, I = x - l, s.xOffset = u + (k * b + I * v) - k, s.yOffset = f + (k * y + I * g) - I) : s.xOffset = s.yOffset = 0, s.xOrigin = T, s.yOrigin = x, s.smooth = !!o, s.origin = a, s.originIsAbsolute = !!i, e.style[Zt] = "0px 0px", r && (ii(r, s, "xOrigin", d, T), ii(r, s, "yOrigin", l, x), ii(r, s, "xOffset", u, s.xOffset), ii(r, s, "yOffset", f, s.yOffset)), e.setAttribute("data-svg-origin", T + " " + x);
}, fn = function(e, a) {
  var i = e._gsap || new Wf(e);
  if ("x" in i && !a && !i.uncache)
    return i;
  var o = e.style, n = i.scaleX < 0, r = "px", s = "deg", c = getComputedStyle(e), d = Gt(e, Zt) || "0", l, u, f, b, y, v, g, k, I, S, T, x, D, V, P, R, j, Q, B, re, de, se, te, Z, K, ue, Te, Se, Ae, Me, ke, st;
  return l = u = f = v = g = k = I = S = T = 0, b = y = 1, i.svg = !!(e.getCTM && lp(e)), c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (o[Xe] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[Xe] !== "none" ? c[Xe] : "")), o.scale = o.rotate = o.translate = "none"), V = zc(e, i.svg), i.svg && (i.uncache ? (K = e.getBBox(), d = i.xOrigin - K.x + "px " + (i.yOrigin - K.y) + "px", Z = "") : Z = !a && e.getAttribute("data-svg-origin"), Gs(e, Z || d, !!Z || i.originIsAbsolute, i.smooth !== !1, V)), x = i.xOrigin || 0, D = i.yOrigin || 0, V !== un && (Q = V[0], B = V[1], re = V[2], de = V[3], l = se = V[4], u = te = V[5], V.length === 6 ? (b = Math.sqrt(Q * Q + B * B), y = Math.sqrt(de * de + re * re), v = Q || B ? Hi(B, Q) * xi : 0, I = re || de ? Hi(re, de) * xi + v : 0, I && (y *= Math.abs(Math.cos(I * oo))), i.svg && (l -= x - (x * Q + D * re), u -= D - (x * B + D * de))) : (st = V[6], Me = V[7], Te = V[8], Se = V[9], Ae = V[10], ke = V[11], l = V[12], u = V[13], f = V[14], P = Hi(st, Ae), g = P * xi, P && (R = Math.cos(-P), j = Math.sin(-P), Z = se * R + Te * j, K = te * R + Se * j, ue = st * R + Ae * j, Te = se * -j + Te * R, Se = te * -j + Se * R, Ae = st * -j + Ae * R, ke = Me * -j + ke * R, se = Z, te = K, st = ue), P = Hi(-re, Ae), k = P * xi, P && (R = Math.cos(-P), j = Math.sin(-P), Z = Q * R - Te * j, K = B * R - Se * j, ue = re * R - Ae * j, ke = de * j + ke * R, Q = Z, B = K, re = ue), P = Hi(B, Q), v = P * xi, P && (R = Math.cos(P), j = Math.sin(P), Z = Q * R + B * j, K = se * R + te * j, B = B * R - Q * j, te = te * R - se * j, Q = Z, se = K), g && Math.abs(g) + Math.abs(v) > 359.9 && (g = v = 0, k = 180 - k), b = lt(Math.sqrt(Q * Q + B * B + re * re)), y = lt(Math.sqrt(te * te + st * st)), P = Hi(se, te), I = Math.abs(P) > 2e-4 ? P * xi : 0, T = ke ? 1 / (ke < 0 ? -ke : ke) : 0), i.svg && (Z = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !fp(Gt(e, Xe)), Z && e.setAttribute("transform", Z))), Math.abs(I) > 90 && Math.abs(I) < 270 && (n ? (b *= -1, I += v <= 0 ? 180 : -180, v += v <= 0 ? 180 : -180) : (y *= -1, I += I <= 0 ? 180 : -180)), a = a || i.uncache, i.x = l - ((i.xPercent = l && (!a && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-l) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + r, i.y = u - ((i.yPercent = u && (!a && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + r, i.z = f + r, i.scaleX = lt(b), i.scaleY = lt(y), i.rotation = lt(v) + s, i.rotationX = lt(g) + s, i.rotationY = lt(k) + s, i.skewX = I + s, i.skewY = S + s, i.transformPerspective = T + r, (i.zOrigin = parseFloat(d.split(" ")[2]) || !a && i.zOrigin || 0) && (o[Zt] = br(d)), i.xOffset = i.yOffset = 0, i.force3D = Kt.force3D, i.renderTransform = i.svg ? Cv : cp ? pp : Sv, i.uncache = 0, i;
}, br = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, hs = function(e, a, i) {
  var o = It(a);
  return lt(parseFloat(a) + parseFloat(ui(e, "x", i + "px", o))) + o;
}, Sv = function(e, a) {
  a.z = "0px", a.rotationY = a.rotationX = "0deg", a.force3D = 0, pp(e, a);
}, ki = "0deg", Co = "0px", Ii = ") ", pp = function(e, a) {
  var i = a || this, o = i.xPercent, n = i.yPercent, r = i.x, s = i.y, c = i.z, d = i.rotation, l = i.rotationY, u = i.rotationX, f = i.skewX, b = i.skewY, y = i.scaleX, v = i.scaleY, g = i.transformPerspective, k = i.force3D, I = i.target, S = i.zOrigin, T = "", x = k === "auto" && e && e !== 1 || k === !0;
  if (S && (u !== ki || l !== ki)) {
    var D = parseFloat(l) * oo, V = Math.sin(D), P = Math.cos(D), R;
    D = parseFloat(u) * oo, R = Math.cos(D), r = hs(I, r, V * R * -S), s = hs(I, s, -Math.sin(D) * -S), c = hs(I, c, P * R * -S + S);
  }
  g !== Co && (T += "perspective(" + g + Ii), (o || n) && (T += "translate(" + o + "%, " + n + "%) "), (x || r !== Co || s !== Co || c !== Co) && (T += c !== Co || x ? "translate3d(" + r + ", " + s + ", " + c + ") " : "translate(" + r + ", " + s + Ii), d !== ki && (T += "rotate(" + d + Ii), l !== ki && (T += "rotateY(" + l + Ii), u !== ki && (T += "rotateX(" + u + Ii), (f !== ki || b !== ki) && (T += "skew(" + f + ", " + b + Ii), (y !== 1 || v !== 1) && (T += "scale(" + y + ", " + v + Ii), I.style[Xe] = T || "translate(0, 0)";
}, Cv = function(e, a) {
  var i = a || this, o = i.xPercent, n = i.yPercent, r = i.x, s = i.y, c = i.rotation, d = i.skewX, l = i.skewY, u = i.scaleX, f = i.scaleY, b = i.target, y = i.xOrigin, v = i.yOrigin, g = i.xOffset, k = i.yOffset, I = i.forceCSS, S = parseFloat(r), T = parseFloat(s), x, D, V, P, R;
  c = parseFloat(c), d = parseFloat(d), l = parseFloat(l), l && (l = parseFloat(l), d += l, c += l), c || d ? (c *= oo, d *= oo, x = Math.cos(c) * u, D = Math.sin(c) * u, V = Math.sin(c - d) * -f, P = Math.cos(c - d) * f, d && (l *= oo, R = Math.tan(d - l), R = Math.sqrt(1 + R * R), V *= R, P *= R, l && (R = Math.tan(l), R = Math.sqrt(1 + R * R), x *= R, D *= R)), x = lt(x), D = lt(D), V = lt(V), P = lt(P)) : (x = u, P = f, D = V = 0), (S && !~(r + "").indexOf("px") || T && !~(s + "").indexOf("px")) && (S = ui(b, "x", r, "px"), T = ui(b, "y", s, "px")), (y || v || g || k) && (S = lt(S + y - (y * x + v * V) + g), T = lt(T + v - (y * D + v * P) + k)), (o || n) && (R = b.getBBox(), S = lt(S + o / 100 * R.width), T = lt(T + n / 100 * R.height)), R = "matrix(" + x + "," + D + "," + V + "," + P + "," + S + "," + T + ")", b.setAttribute("transform", R), I && (b.style[Xe] = R);
}, Pv = function(e, a, i, o, n) {
  var r = 360, s = mt(n), c = parseFloat(n) * (s && ~n.indexOf("rad") ? xi : 1), d = c - o, l = o + d + "deg", u, f;
  return s && (u = n.split("_")[1], u === "short" && (d %= r, d !== d % (r / 2) && (d += d < 0 ? r : -r)), u === "cw" && d < 0 ? d = (d + r * Gd) % r - ~~(d / r) * r : u === "ccw" && d > 0 && (d = (d - r * Gd) % r - ~~(d / r) * r)), e._pt = f = new qt(e._pt, a, i, o, d, uv), f.e = l, f.u = "deg", e._props.push(i), f;
}, tl = function(e, a) {
  for (var i in a)
    e[i] = a[i];
  return e;
}, Rv = function(e, a, i) {
  var o = tl({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", r = i.style, s, c, d, l, u, f, b, y;
  o.svg ? (d = i.getAttribute("transform"), i.setAttribute("transform", ""), r[Xe] = a, s = fn(i, 1), li(i, Xe), i.setAttribute("transform", d)) : (d = getComputedStyle(i)[Xe], r[Xe] = a, s = fn(i, 1), r[Xe] = d);
  for (c in Na)
    d = o[c], l = s[c], d !== l && n.indexOf(c) < 0 && (b = It(d), y = It(l), u = b !== y ? ui(i, c, d, y) : parseFloat(d), f = parseFloat(l), e._pt = new qt(e._pt, s, c, u, f - u, Bs), e._pt.u = y || 0, e._props.push(c));
  tl(s, o);
};
Ft("padding,margin,Width,Radius", function(t, e) {
  var a = "Top", i = "Right", o = "Bottom", n = "Left", r = (e < 3 ? [a, i, o, n] : [a + n, a + i, o + i, o + n]).map(function(s) {
    return e < 2 ? t + s : "border" + s + t;
  });
  hr[e > 1 ? "border" + t : t] = function(s, c, d, l, u) {
    var f, b;
    if (arguments.length < 4)
      return f = r.map(function(y) {
        return $a(s, y, d);
      }), b = f.join(" "), b.split(f[0]).length === 5 ? f[0] : b;
    f = (l + "").split(" "), b = {}, r.forEach(function(y, v) {
      return b[y] = f[v] = f[v] || f[(v - 1) / 2 | 0];
    }), s.init(c, b, u);
  };
});
var hp = {
  name: "css",
  register: Js,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, a, i, o, n) {
    var r = this._props, s = e.style, c = i.vars.startAt, d, l, u, f, b, y, v, g, k, I, S, T, x, D, V, P, R;
    Mc || Js(), this.styles = this.styles || sp(e), P = this.styles.props, this.tween = i;
    for (v in a)
      if (v !== "autoRound" && (l = a[v], !(Dt[v] && Kf(v, a, i, o, e, n)))) {
        if (b = typeof l, y = hr[v], b === "function" && (l = l.call(i, o, e, n), b = typeof l), b === "string" && ~l.indexOf("random(") && (l = cn(l)), y)
          y(this, e, v, l, i) && (V = 1);
        else if (v.substr(0, 2) === "--")
          d = (getComputedStyle(e).getPropertyValue(v) + "").trim(), l += "", ri.lastIndex = 0, ri.test(d) || (g = It(d), k = It(l), k ? g !== k && (d = ui(e, v, d, k) + k) : g && (l += g)), this.add(s, "setProperty", d, l, o, n, 0, 0, v), r.push(v), P.push(v, 0, s[v]);
        else if (b !== "undefined") {
          if (c && v in c ? (d = typeof c[v] == "function" ? c[v].call(i, o, e, n) : c[v], mt(d) && ~d.indexOf("random(") && (d = cn(d)), It(d + "") || d === "auto" || (d += Kt.units[v] || It($a(e, v)) || ""), (d + "").charAt(1) === "=" && (d = $a(e, v))) : d = $a(e, v), f = parseFloat(d), I = b === "string" && l.charAt(1) === "=" && l.substr(0, 2), I && (l = l.substr(2)), u = parseFloat(l), v in Ia && (v === "autoAlpha" && (f === 1 && $a(e, "visibility") === "hidden" && u && (f = 0), P.push("visibility", 0, s.visibility), ii(this, s, "visibility", f ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), v !== "scale" && v !== "transform" && (v = Ia[v], ~v.indexOf(",") && (v = v.split(",")[0]))), S = v in Na, S) {
            if (this.styles.save(v), R = l, b === "string" && l.substring(0, 6) === "var(--") {
              if (l = Gt(e, l.substring(4, l.indexOf(")"))), l.substring(0, 5) === "calc(") {
                var j = e.style.perspective;
                e.style.perspective = l, l = Gt(e, "perspective"), j ? e.style.perspective = j : li(e, "perspective");
              }
              u = parseFloat(l);
            }
            if (T || (x = e._gsap, x.renderTransform && !a.parseTransform || fn(e, a.parseTransform), D = a.smoothOrigin !== !1 && x.smooth, T = this._pt = new qt(this._pt, s, Xe, 0, 1, x.renderTransform, x, 0, -1), T.dep = 1), v === "scale")
              this._pt = new qt(this._pt, x, "scaleY", x.scaleY, (I ? ao(x.scaleY, I + u) : u) - x.scaleY || 0, Bs), this._pt.u = 0, r.push("scaleY", v), v += "X";
            else if (v === "transformOrigin") {
              P.push(Zt, 0, s[Zt]), l = xv(l), x.svg ? Gs(e, l, 0, D, 0, this) : (k = parseFloat(l.split(" ")[2]) || 0, k !== x.zOrigin && ii(this, x, "zOrigin", x.zOrigin, k), ii(this, s, v, br(d), br(l)));
              continue;
            } else if (v === "svgOrigin") {
              Gs(e, l, 1, D, 0, this);
              continue;
            } else if (v in up) {
              Pv(this, x, v, f, I ? ao(f, I + l) : l);
              continue;
            } else if (v === "smoothOrigin") {
              ii(this, x, "smooth", x.smooth, l);
              continue;
            } else if (v === "force3D") {
              x[v] = l;
              continue;
            } else if (v === "transform") {
              Rv(this, l, e);
              continue;
            }
          } else v in s || (v = ho(v) || v);
          if (S || (u || u === 0) && (f || f === 0) && !lv.test(l) && v in s)
            g = (d + "").substr((f + "").length), u || (u = 0), k = It(l) || (v in Kt.units ? Kt.units[v] : g), g !== k && (f = ui(e, v, d, k)), this._pt = new qt(this._pt, S ? x : s, v, f, (I ? ao(f, I + u) : u) - f, !S && (k === "px" || v === "zIndex") && a.autoRound !== !1 ? hv : Bs), this._pt.u = k || 0, S && R !== l ? (this._pt.b = d, this._pt.e = R, this._pt.r = pv) : g !== k && k !== "%" && (this._pt.b = d, this._pt.r = fv);
          else if (v in s)
            Av.call(this, e, v, d, I ? I + l : l);
          else if (v in e)
            this.add(e, v, d || e[v], I ? I + l : l, o, n);
          else if (v !== "parseTransform") {
            Ac(v, l);
            continue;
          }
          S || (v in s ? P.push(v, 0, s[v]) : typeof e[v] == "function" ? P.push(v, 2, e[v]()) : P.push(v, 1, d || e[v])), r.push(v);
        }
      }
    V && ap(this);
  },
  render: function(e, a) {
    if (a.tween._time || !$c())
      for (var i = a._pt; i; )
        i.r(e, i.d), i = i._next;
    else
      a.styles.revert();
  },
  get: $a,
  aliases: Ia,
  getSetter: function(e, a, i) {
    var o = Ia[a];
    return o && o.indexOf(",") < 0 && (a = o), a in Na && a !== Zt && (e._gsap.x || $a(e, "x")) ? i && Jd === i ? a === "scale" ? gv : vv : (Jd = i || {}) && (a === "scale" ? _v : yv) : e.style && !wc(e.style[a]) ? bv : ~a.indexOf("-") ? mv : Ec(e, a);
  },
  core: {
    _removeProperty: li,
    _getMatrix: zc
  }
};
Lt.utils.checkPrefix = ho;
Lt.core.getStyleSaver = sp;
(function(t, e, a, i) {
  var o = Ft(t + "," + e + "," + a, function(n) {
    Na[n] = 1;
  });
  Ft(e, function(n) {
    Kt.units[n] = "deg", up[n] = 1;
  }), Ia[o[13]] = t + "," + e, Ft(i, function(n) {
    var r = n.split(":");
    Ia[r[1]] = o[r[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Ft("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
  Kt.units[t] = "px";
});
Lt.registerPlugin(hp);
var xe = Lt.registerPlugin(hp) || Lt;
xe.core.Tween;
const Vv = 1, Ev = "albina-layered-worldbooks-v1", Ov = ["content/worldbook/limbus-world-audit-v1.json", "research/legacy-worldbooks/inventory-v1.json"], Mv = { auditedUniqueEntries: 2481, substantiveCandidates: 599, sourceIndexBridges: 1882, fullPackagesAreUidDisjoint: !0, sourceIndexInjectsByDefault: !1, quarantineInjectsByDefault: !1, l0IsStandaloneAndExcludedFromFullSetCounts: !0 }, $v = { unit: "UTF-16 content characters", defaultEnabledConstantCharacterLimit: 12e3, defaultEnabledInventoryCharacterLimit: 12e4, note: "Keyword-triggered inventory is not simultaneous prompt cost. Disabled packages and entries count as zero runtime budget." }, jv = { minimal: ["l0-minimal-card-anchors"], canonicalCore: ["l1-albina-core", "l2-canto-ix-and-main-cast", "plot-full-timeline"], canonicalExpanded: ["l1-albina-core", "l2-canto-ix-and-main-cast", "plot-full-timeline", "l3-world-expansion"], mechanicsOptIn: ["l4-mechanics"], identityOptIn: ["l5-reviewed-identities"], auOptIn: ["au-if"], neverRuntime: ["source-index", "quarantine-unverified-rp"] }, zv = { id: "l0-minimal-card-anchors", file: "content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json", defaultEnabled: !0, entryCount: 16, enabledEntryCount: 16, contentCharacters: 2610, constantCharacters: 1319, sha256: "0e3cba0ff1fbd57a49671c56a548bdea8810aeec225bcb06794b4178f2abd596" }, Uv = [{ id: "l1-albina-core", file: "content/worldbook/albina-worldbook-l1-albina-core-v1.json", defaultEnabled: !0, entryCount: 7, enabledEntryCount: 7, contentCharacters: 1716, constantCharacters: 0, sha256: "48b7452f27c66ee1e5ba8edd85839001a562bdd85ffaa71fdc9beaaf600cf442" }, { id: "l2-canto-ix-and-main-cast", file: "content/worldbook/albina-worldbook-l2-canto-ix-main-cast-v1.json", defaultEnabled: !0, entryCount: 33, enabledEntryCount: 33, contentCharacters: 5134, constantCharacters: 0, sha256: "ed8195155b0a32b55444981b3183a3d9ed1df0e50f13850ba6ebb0f9cbdbfa52" }, { id: "l3-world-expansion", file: "content/worldbook/albina-worldbook-l3-world-expansion-v1.json", defaultEnabled: !1, entryCount: 80, enabledEntryCount: 0, contentCharacters: 17936, constantCharacters: 0, sha256: "f05dd9a95240b27153141c264447c111f37c4546ae92349cd9f1437d63d056d6" }, { id: "plot-full-timeline", file: "content/worldbook/albina-worldbook-plot-full-timeline-v1.json", defaultEnabled: !0, entryCount: 22, enabledEntryCount: 22, contentCharacters: 6728, constantCharacters: 0, sha256: "279b3b3dc84435cda7e16dffa28946f9e1bc51068f8cba09fac91dc877f65342" }, { id: "l4-mechanics", file: "content/worldbook/albina-worldbook-l4-mechanics-v1.json", defaultEnabled: !1, entryCount: 37, enabledEntryCount: 0, contentCharacters: 7745, constantCharacters: 0, sha256: "0adf5c88bbc7b03b850818f54df899cc62ac2b783c19cc6777c36dd8e5f5dab5" }, { id: "l5-reviewed-identities", file: "content/worldbook/albina-worldbook-l5-reviewed-identities-v1.json", defaultEnabled: !1, entryCount: 156, enabledEntryCount: 0, contentCharacters: 87805, constantCharacters: 0, sha256: "f540745fc0f23d8544b926e4ae40fed34d66f376eecfcb74d5b4388c8ac78277" }, { id: "au-if", file: "content/worldbook/albina-worldbook-au-if-v1.json", defaultEnabled: !1, entryCount: 6, enabledEntryCount: 0, contentCharacters: 3611, constantCharacters: 0, sha256: "e154e1c11510eda3e074260867ef9e4a37a2356ade1c92d26a6a1177ef19efaa" }, { id: "quarantine-unverified-rp", file: "content/worldbook/albina-worldbook-quarantine-unverified-rp-v1.json", defaultEnabled: !1, entryCount: 258, enabledEntryCount: 0, contentCharacters: 117035, constantCharacters: 0, sha256: "26e901e791cff2cd84f249ba63c6592c0d580dac7c6c95a6189a31cf4dec5036" }, { id: "source-index", file: "content/worldbook/albina-worldbook-source-index-disabled-v1.json", defaultEnabled: !1, entryCount: 1882, enabledEntryCount: 0, contentCharacters: 2100253, constantCharacters: 0, sha256: "9f4309b9b8e962c5bfc24194dedbb5eccbf2fb5171a4e23290b12e4821ed052f" }], Fv = { substantiveCandidates: 599, sourceIndexBridges: 1882, defaultEnabledInventoryCharacters: 13578, defaultEnabledConstantCharacters: 0 }, qv = {
  schemaVersion: Vv,
  id: Ev,
  generatedFrom: Ov,
  invariants: Mv,
  budgetPolicy: $v,
  presets: jv,
  l0: zv,
  packages: Uv,
  totals: Fv
};
var al;
function L(t, e, a) {
  function i(s, c) {
    if (s._zod || Object.defineProperty(s, "_zod", {
      value: {
        def: c,
        constr: r,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), s._zod.traits.has(t))
      return;
    s._zod.traits.add(t), e(s, c);
    const d = r.prototype, l = Object.keys(d);
    for (let u = 0; u < l.length; u++) {
      const f = l[u];
      f in s || (s[f] = d[f].bind(s));
    }
  }
  const o = a?.Parent ?? Object;
  class n extends o {
  }
  Object.defineProperty(n, "name", { value: t });
  function r(s) {
    var c;
    const d = a?.Parent ? new n() : this;
    i(d, s), (c = d._zod).deferred ?? (c.deferred = []);
    for (const l of d._zod.deferred)
      l();
    return d;
  }
  return Object.defineProperty(r, "init", { value: i }), Object.defineProperty(r, Symbol.hasInstance, {
    value: (s) => a?.Parent && s instanceof a.Parent ? !0 : s?._zod?.traits?.has(t)
  }), Object.defineProperty(r, "name", { value: t }), r;
}
class no extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class bp extends Error {
  constructor(e) {
    super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
  }
}
(al = globalThis).__zod_globalConfig ?? (al.__zod_globalConfig = {});
const Uc = globalThis.__zod_globalConfig;
function Da(t) {
  return Uc;
}
function mp(t) {
  const e = Object.values(t).filter((i) => typeof i == "number");
  return Object.entries(t).filter(([i, o]) => e.indexOf(+i) === -1).map(([i, o]) => o);
}
function Ws(t, e) {
  return typeof e == "bigint" ? e.toString() : e;
}
function Fr(t) {
  return {
    get value() {
      {
        const e = t();
        return Object.defineProperty(this, "value", { value: e }), e;
      }
    }
  };
}
function Fc(t) {
  return t == null;
}
function qc(t) {
  const e = t.startsWith("^") ? 1 : 0, a = t.endsWith("$") ? t.length - 1 : t.length;
  return t.slice(e, a);
}
function Zv(t, e) {
  const a = t / e, i = Math.round(a), o = Number.EPSILON * Math.max(Math.abs(a), 1);
  return Math.abs(a - i) < o ? 0 : a - i;
}
const il = /* @__PURE__ */ Symbol("evaluating");
function je(t, e, a) {
  let i;
  Object.defineProperty(t, e, {
    get() {
      if (i !== il)
        return i === void 0 && (i = il, i = a()), i;
    },
    set(o) {
      Object.defineProperty(t, e, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Fi(t, e, a) {
  Object.defineProperty(t, e, {
    value: a,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function mi(...t) {
  const e = {};
  for (const a of t) {
    const i = Object.getOwnPropertyDescriptors(a);
    Object.assign(e, i);
  }
  return Object.defineProperties({}, e);
}
function ol(t) {
  return JSON.stringify(t);
}
function Lv(t) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const vp = "captureStackTrace" in Error ? Error.captureStackTrace : (...t) => {
};
function pn(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
const Nv = /* @__PURE__ */ Fr(() => {
  if (Uc.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function bo(t) {
  if (pn(t) === !1)
    return !1;
  const e = t.constructor;
  if (e === void 0 || typeof e != "function")
    return !0;
  const a = e.prototype;
  return !(pn(a) === !1 || Object.prototype.hasOwnProperty.call(a, "isPrototypeOf") === !1);
}
function gp(t) {
  return bo(t) ? { ...t } : Array.isArray(t) ? [...t] : t instanceof Map ? new Map(t) : t instanceof Set ? new Set(t) : t;
}
const Dv = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function mo(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function vi(t, e, a) {
  const i = new t._zod.constr(e ?? t._zod.def);
  return (!e || a?.parent) && (i._zod.parent = t), i;
}
function le(t) {
  const e = t;
  if (!e)
    return {};
  if (typeof e == "string")
    return { error: () => e };
  if (e?.message !== void 0) {
    if (e?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    e.error = e.message;
  }
  return delete e.message, typeof e.error == "string" ? { ...e, error: () => e.error } : e;
}
function Bv(t) {
  return Object.keys(t).filter((e) => t[e]._zod.optin === "optional" && t[e]._zod.optout === "optional");
}
const Hv = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Jv(t, e) {
  const a = t._zod.def, i = a.checks;
  if (i && i.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const n = mi(t._zod.def, {
    get shape() {
      const r = {};
      for (const s in e) {
        if (!(s in a.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        e[s] && (r[s] = a.shape[s]);
      }
      return Fi(this, "shape", r), r;
    },
    checks: []
  });
  return vi(t, n);
}
function Gv(t, e) {
  const a = t._zod.def, i = a.checks;
  if (i && i.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const n = mi(t._zod.def, {
    get shape() {
      const r = { ...t._zod.def.shape };
      for (const s in e) {
        if (!(s in a.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        e[s] && delete r[s];
      }
      return Fi(this, "shape", r), r;
    },
    checks: []
  });
  return vi(t, n);
}
function Wv(t, e) {
  if (!bo(e))
    throw new Error("Invalid input to extend: expected a plain object");
  const a = t._zod.def.checks;
  if (a && a.length > 0) {
    const n = t._zod.def.shape;
    for (const r in e)
      if (Object.getOwnPropertyDescriptor(n, r) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = mi(t._zod.def, {
    get shape() {
      const n = { ...t._zod.def.shape, ...e };
      return Fi(this, "shape", n), n;
    }
  });
  return vi(t, o);
}
function Kv(t, e) {
  if (!bo(e))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const a = mi(t._zod.def, {
    get shape() {
      const i = { ...t._zod.def.shape, ...e };
      return Fi(this, "shape", i), i;
    }
  });
  return vi(t, a);
}
function Yv(t, e) {
  if (t._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const a = mi(t._zod.def, {
    get shape() {
      const i = { ...t._zod.def.shape, ...e._zod.def.shape };
      return Fi(this, "shape", i), i;
    },
    get catchall() {
      return e._zod.def.catchall;
    },
    checks: e._zod.def.checks ?? []
  });
  return vi(t, a);
}
function Xv(t, e, a) {
  const o = e._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const r = mi(e._zod.def, {
    get shape() {
      const s = e._zod.def.shape, c = { ...s };
      if (a)
        for (const d in a) {
          if (!(d in s))
            throw new Error(`Unrecognized key: "${d}"`);
          a[d] && (c[d] = t ? new t({
            type: "optional",
            innerType: s[d]
          }) : s[d]);
        }
      else
        for (const d in s)
          c[d] = t ? new t({
            type: "optional",
            innerType: s[d]
          }) : s[d];
      return Fi(this, "shape", c), c;
    },
    checks: []
  });
  return vi(e, r);
}
function Qv(t, e, a) {
  const i = mi(e._zod.def, {
    get shape() {
      const o = e._zod.def.shape, n = { ...o };
      if (a)
        for (const r in a) {
          if (!(r in n))
            throw new Error(`Unrecognized key: "${r}"`);
          a[r] && (n[r] = new t({
            type: "nonoptional",
            innerType: o[r]
          }));
        }
      else
        for (const r in o)
          n[r] = new t({
            type: "nonoptional",
            innerType: o[r]
          });
      return Fi(this, "shape", n), n;
    }
  });
  return vi(e, i);
}
function Xi(t, e = 0) {
  if (t.aborted === !0)
    return !0;
  for (let a = e; a < t.issues.length; a++)
    if (t.issues[a]?.continue !== !0)
      return !0;
  return !1;
}
function eg(t, e = 0) {
  if (t.aborted === !0)
    return !0;
  for (let a = e; a < t.issues.length; a++)
    if (t.issues[a]?.continue === !1)
      return !0;
  return !1;
}
function oi(t, e) {
  return e.map((a) => {
    var i;
    return (i = a).path ?? (i.path = []), a.path.unshift(t), a;
  });
}
function $n(t) {
  return typeof t == "string" ? t : t?.message;
}
function Ba(t, e, a) {
  const i = t.message ? t.message : $n(t.inst?._zod.def?.error?.(t)) ?? $n(e?.error?.(t)) ?? $n(a.customError?.(t)) ?? $n(a.localeError?.(t)) ?? "Invalid input", { inst: o, continue: n, input: r, ...s } = t;
  return s.path ?? (s.path = []), s.message = i, e?.reportInput && (s.input = r), s;
}
function Zc(t) {
  return Array.isArray(t) ? "array" : typeof t == "string" ? "string" : "unknown";
}
function hn(...t) {
  const [e, a, i] = t;
  return typeof e == "string" ? {
    message: e,
    code: "custom",
    input: a,
    inst: i
  } : { ...e };
}
const _p = (t, e) => {
  t.name = "$ZodError", Object.defineProperty(t, "_zod", {
    value: t._zod,
    enumerable: !1
  }), Object.defineProperty(t, "issues", {
    value: e,
    enumerable: !1
  }), t.message = JSON.stringify(e, Ws, 2), Object.defineProperty(t, "toString", {
    value: () => t.message,
    enumerable: !1
  });
}, yp = L("$ZodError", _p), wp = L("$ZodError", _p, { Parent: Error });
function tg(t, e = (a) => a.message) {
  const a = {}, i = [];
  for (const o of t.issues)
    o.path.length > 0 ? (a[o.path[0]] = a[o.path[0]] || [], a[o.path[0]].push(e(o))) : i.push(e(o));
  return { formErrors: i, fieldErrors: a };
}
function ag(t, e = (a) => a.message) {
  const a = { _errors: [] }, i = (o, n = []) => {
    for (const r of o.issues)
      if (r.code === "invalid_union" && r.errors.length)
        r.errors.map((s) => i({ issues: s }, [...n, ...r.path]));
      else if (r.code === "invalid_key")
        i({ issues: r.issues }, [...n, ...r.path]);
      else if (r.code === "invalid_element")
        i({ issues: r.issues }, [...n, ...r.path]);
      else {
        const s = [...n, ...r.path];
        if (s.length === 0)
          a._errors.push(e(r));
        else {
          let c = a, d = 0;
          for (; d < s.length; ) {
            const l = s[d];
            d === s.length - 1 ? (c[l] = c[l] || { _errors: [] }, c[l]._errors.push(e(r))) : c[l] = c[l] || { _errors: [] }, c = c[l], d++;
          }
        }
      }
  };
  return i(t), a;
}
const Lc = (t) => (e, a, i, o) => {
  const n = i ? { ...i, async: !1 } : { async: !1 }, r = e._zod.run({ value: a, issues: [] }, n);
  if (r instanceof Promise)
    throw new no();
  if (r.issues.length) {
    const s = new (o?.Err ?? t)(r.issues.map((c) => Ba(c, n, Da())));
    throw vp(s, o?.callee), s;
  }
  return r.value;
}, Nc = (t) => async (e, a, i, o) => {
  const n = i ? { ...i, async: !0 } : { async: !0 };
  let r = e._zod.run({ value: a, issues: [] }, n);
  if (r instanceof Promise && (r = await r), r.issues.length) {
    const s = new (o?.Err ?? t)(r.issues.map((c) => Ba(c, n, Da())));
    throw vp(s, o?.callee), s;
  }
  return r.value;
}, qr = (t) => (e, a, i) => {
  const o = i ? { ...i, async: !1 } : { async: !1 }, n = e._zod.run({ value: a, issues: [] }, o);
  if (n instanceof Promise)
    throw new no();
  return n.issues.length ? {
    success: !1,
    error: new (t ?? yp)(n.issues.map((r) => Ba(r, o, Da())))
  } : { success: !0, data: n.value };
}, ig = /* @__PURE__ */ qr(wp), Zr = (t) => async (e, a, i) => {
  const o = i ? { ...i, async: !0 } : { async: !0 };
  let n = e._zod.run({ value: a, issues: [] }, o);
  return n instanceof Promise && (n = await n), n.issues.length ? {
    success: !1,
    error: new t(n.issues.map((r) => Ba(r, o, Da())))
  } : { success: !0, data: n.value };
}, og = /* @__PURE__ */ Zr(wp), ng = (t) => (e, a, i) => {
  const o = i ? { ...i, direction: "backward" } : { direction: "backward" };
  return Lc(t)(e, a, o);
}, rg = (t) => (e, a, i) => Lc(t)(e, a, i), sg = (t) => async (e, a, i) => {
  const o = i ? { ...i, direction: "backward" } : { direction: "backward" };
  return Nc(t)(e, a, o);
}, cg = (t) => async (e, a, i) => Nc(t)(e, a, i), dg = (t) => (e, a, i) => {
  const o = i ? { ...i, direction: "backward" } : { direction: "backward" };
  return qr(t)(e, a, o);
}, lg = (t) => (e, a, i) => qr(t)(e, a, i), ug = (t) => async (e, a, i) => {
  const o = i ? { ...i, direction: "backward" } : { direction: "backward" };
  return Zr(t)(e, a, o);
}, fg = (t) => async (e, a, i) => Zr(t)(e, a, i), pg = /^[cC][0-9a-z]{6,}$/, hg = /^[0-9a-z]+$/, bg = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, mg = /^[0-9a-vA-V]{20}$/, vg = /^[A-Za-z0-9]{27}$/, gg = /^[a-zA-Z0-9_-]{21}$/, _g = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, yg = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, nl = (t) => t ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${t}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, wg = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, kg = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Ig() {
  return new RegExp(kg, "u");
}
const Ag = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, xg = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Tg = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Sg = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Cg = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, kp = /^[A-Za-z0-9_-]*$/, Pg = /^https?$/, Rg = /^\+[1-9]\d{6,14}$/, Ip = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Vg = /* @__PURE__ */ new RegExp(`^${Ip}$`);
function Ap(t) {
  const e = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof t.precision == "number" ? t.precision === -1 ? `${e}` : t.precision === 0 ? `${e}:[0-5]\\d` : `${e}:[0-5]\\d\\.\\d{${t.precision}}` : `${e}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Eg(t) {
  return new RegExp(`^${Ap(t)}$`);
}
function Og(t) {
  const e = Ap({ precision: t.precision }), a = ["Z"];
  t.local && a.push(""), t.offset && a.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const i = `${e}(?:${a.join("|")})`;
  return new RegExp(`^${Ip}T(?:${i})$`);
}
const Mg = (t) => {
  const e = t ? `[\\s\\S]{${t?.minimum ?? 0},${t?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${e}$`);
}, $g = /^-?\d+$/, xp = /^-?\d+(?:\.\d+)?$/, jg = /^(?:true|false)$/i, zg = /^[^A-Z]*$/, Ug = /^[^a-z]*$/, Nt = /* @__PURE__ */ L("$ZodCheck", (t, e) => {
  var a;
  t._zod ?? (t._zod = {}), t._zod.def = e, (a = t._zod).onattach ?? (a.onattach = []);
}), Tp = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Sp = /* @__PURE__ */ L("$ZodCheckLessThan", (t, e) => {
  Nt.init(t, e);
  const a = Tp[typeof e.value];
  t._zod.onattach.push((i) => {
    const o = i._zod.bag, n = (e.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    e.value < n && (e.inclusive ? o.maximum = e.value : o.exclusiveMaximum = e.value);
  }), t._zod.check = (i) => {
    (e.inclusive ? i.value <= e.value : i.value < e.value) || i.issues.push({
      origin: a,
      code: "too_big",
      maximum: typeof e.value == "object" ? e.value.getTime() : e.value,
      input: i.value,
      inclusive: e.inclusive,
      inst: t,
      continue: !e.abort
    });
  };
}), Cp = /* @__PURE__ */ L("$ZodCheckGreaterThan", (t, e) => {
  Nt.init(t, e);
  const a = Tp[typeof e.value];
  t._zod.onattach.push((i) => {
    const o = i._zod.bag, n = (e.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    e.value > n && (e.inclusive ? o.minimum = e.value : o.exclusiveMinimum = e.value);
  }), t._zod.check = (i) => {
    (e.inclusive ? i.value >= e.value : i.value > e.value) || i.issues.push({
      origin: a,
      code: "too_small",
      minimum: typeof e.value == "object" ? e.value.getTime() : e.value,
      input: i.value,
      inclusive: e.inclusive,
      inst: t,
      continue: !e.abort
    });
  };
}), Fg = /* @__PURE__ */ L("$ZodCheckMultipleOf", (t, e) => {
  Nt.init(t, e), t._zod.onattach.push((a) => {
    var i;
    (i = a._zod.bag).multipleOf ?? (i.multipleOf = e.value);
  }), t._zod.check = (a) => {
    if (typeof a.value != typeof e.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof a.value == "bigint" ? a.value % e.value === BigInt(0) : Zv(a.value, e.value) === 0) || a.issues.push({
      origin: typeof a.value,
      code: "not_multiple_of",
      divisor: e.value,
      input: a.value,
      inst: t,
      continue: !e.abort
    });
  };
}), qg = /* @__PURE__ */ L("$ZodCheckNumberFormat", (t, e) => {
  Nt.init(t, e), e.format = e.format || "float64";
  const a = e.format?.includes("int"), i = a ? "int" : "number", [o, n] = Hv[e.format];
  t._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.format = e.format, s.minimum = o, s.maximum = n, a && (s.pattern = $g);
  }), t._zod.check = (r) => {
    const s = r.value;
    if (a) {
      if (!Number.isInteger(s)) {
        r.issues.push({
          expected: i,
          format: e.format,
          code: "invalid_type",
          continue: !1,
          input: s,
          inst: t
        });
        return;
      }
      if (!Number.isSafeInteger(s)) {
        s > 0 ? r.issues.push({
          input: s,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: t,
          origin: i,
          inclusive: !0,
          continue: !e.abort
        }) : r.issues.push({
          input: s,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: t,
          origin: i,
          inclusive: !0,
          continue: !e.abort
        });
        return;
      }
    }
    s < o && r.issues.push({
      origin: "number",
      input: s,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: t,
      continue: !e.abort
    }), s > n && r.issues.push({
      origin: "number",
      input: s,
      code: "too_big",
      maximum: n,
      inclusive: !0,
      inst: t,
      continue: !e.abort
    });
  };
}), Zg = /* @__PURE__ */ L("$ZodCheckMaxLength", (t, e) => {
  var a;
  Nt.init(t, e), (a = t._zod.def).when ?? (a.when = (i) => {
    const o = i.value;
    return !Fc(o) && o.length !== void 0;
  }), t._zod.onattach.push((i) => {
    const o = i._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    e.maximum < o && (i._zod.bag.maximum = e.maximum);
  }), t._zod.check = (i) => {
    const o = i.value;
    if (o.length <= e.maximum)
      return;
    const r = Zc(o);
    i.issues.push({
      origin: r,
      code: "too_big",
      maximum: e.maximum,
      inclusive: !0,
      input: o,
      inst: t,
      continue: !e.abort
    });
  };
}), Lg = /* @__PURE__ */ L("$ZodCheckMinLength", (t, e) => {
  var a;
  Nt.init(t, e), (a = t._zod.def).when ?? (a.when = (i) => {
    const o = i.value;
    return !Fc(o) && o.length !== void 0;
  }), t._zod.onattach.push((i) => {
    const o = i._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    e.minimum > o && (i._zod.bag.minimum = e.minimum);
  }), t._zod.check = (i) => {
    const o = i.value;
    if (o.length >= e.minimum)
      return;
    const r = Zc(o);
    i.issues.push({
      origin: r,
      code: "too_small",
      minimum: e.minimum,
      inclusive: !0,
      input: o,
      inst: t,
      continue: !e.abort
    });
  };
}), Ng = /* @__PURE__ */ L("$ZodCheckLengthEquals", (t, e) => {
  var a;
  Nt.init(t, e), (a = t._zod.def).when ?? (a.when = (i) => {
    const o = i.value;
    return !Fc(o) && o.length !== void 0;
  }), t._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.minimum = e.length, o.maximum = e.length, o.length = e.length;
  }), t._zod.check = (i) => {
    const o = i.value, n = o.length;
    if (n === e.length)
      return;
    const r = Zc(o), s = n > e.length;
    i.issues.push({
      origin: r,
      ...s ? { code: "too_big", maximum: e.length } : { code: "too_small", minimum: e.length },
      inclusive: !0,
      exact: !0,
      input: i.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Lr = /* @__PURE__ */ L("$ZodCheckStringFormat", (t, e) => {
  var a, i;
  Nt.init(t, e), t._zod.onattach.push((o) => {
    const n = o._zod.bag;
    n.format = e.format, e.pattern && (n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(e.pattern));
  }), e.pattern ? (a = t._zod).check ?? (a.check = (o) => {
    e.pattern.lastIndex = 0, !e.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: e.format,
      input: o.value,
      ...e.pattern ? { pattern: e.pattern.toString() } : {},
      inst: t,
      continue: !e.abort
    });
  }) : (i = t._zod).check ?? (i.check = () => {
  });
}), Dg = /* @__PURE__ */ L("$ZodCheckRegex", (t, e) => {
  Lr.init(t, e), t._zod.check = (a) => {
    e.pattern.lastIndex = 0, !e.pattern.test(a.value) && a.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: a.value,
      pattern: e.pattern.toString(),
      inst: t,
      continue: !e.abort
    });
  };
}), Bg = /* @__PURE__ */ L("$ZodCheckLowerCase", (t, e) => {
  e.pattern ?? (e.pattern = zg), Lr.init(t, e);
}), Hg = /* @__PURE__ */ L("$ZodCheckUpperCase", (t, e) => {
  e.pattern ?? (e.pattern = Ug), Lr.init(t, e);
}), Jg = /* @__PURE__ */ L("$ZodCheckIncludes", (t, e) => {
  Nt.init(t, e);
  const a = mo(e.includes), i = new RegExp(typeof e.position == "number" ? `^.{${e.position}}${a}` : a);
  e.pattern = i, t._zod.onattach.push((o) => {
    const n = o._zod.bag;
    n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(i);
  }), t._zod.check = (o) => {
    o.value.includes(e.includes, e.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: e.includes,
      input: o.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Gg = /* @__PURE__ */ L("$ZodCheckStartsWith", (t, e) => {
  Nt.init(t, e);
  const a = new RegExp(`^${mo(e.prefix)}.*`);
  e.pattern ?? (e.pattern = a), t._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(a);
  }), t._zod.check = (i) => {
    i.value.startsWith(e.prefix) || i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: e.prefix,
      input: i.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Wg = /* @__PURE__ */ L("$ZodCheckEndsWith", (t, e) => {
  Nt.init(t, e);
  const a = new RegExp(`.*${mo(e.suffix)}$`);
  e.pattern ?? (e.pattern = a), t._zod.onattach.push((i) => {
    const o = i._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(a);
  }), t._zod.check = (i) => {
    i.value.endsWith(e.suffix) || i.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: e.suffix,
      input: i.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Kg = /* @__PURE__ */ L("$ZodCheckOverwrite", (t, e) => {
  Nt.init(t, e), t._zod.check = (a) => {
    a.value = e.tx(a.value);
  };
});
class Yg {
  constructor(e = []) {
    this.content = [], this.indent = 0, this && (this.args = e);
  }
  indented(e) {
    this.indent += 1, e(this), this.indent -= 1;
  }
  write(e) {
    if (typeof e == "function") {
      e(this, { execution: "sync" }), e(this, { execution: "async" });
      return;
    }
    const i = e.split(`
`).filter((r) => r), o = Math.min(...i.map((r) => r.length - r.trimStart().length)), n = i.map((r) => r.slice(o)).map((r) => " ".repeat(this.indent * 2) + r);
    for (const r of n)
      this.content.push(r);
  }
  compile() {
    const e = Function, a = this?.args, o = [...(this?.content ?? [""]).map((n) => `  ${n}`)];
    return new e(...a, o.join(`
`));
  }
}
const Xg = {
  major: 4,
  minor: 4,
  patch: 3
}, De = /* @__PURE__ */ L("$ZodType", (t, e) => {
  var a;
  t ?? (t = {}), t._zod.def = e, t._zod.bag = t._zod.bag || {}, t._zod.version = Xg;
  const i = [...t._zod.def.checks ?? []];
  t._zod.traits.has("$ZodCheck") && i.unshift(t);
  for (const o of i)
    for (const n of o._zod.onattach)
      n(t);
  if (i.length === 0)
    (a = t._zod).deferred ?? (a.deferred = []), t._zod.deferred?.push(() => {
      t._zod.run = t._zod.parse;
    });
  else {
    const o = (r, s, c) => {
      let d = Xi(r), l;
      for (const u of s) {
        if (u._zod.def.when) {
          if (eg(r) || !u._zod.def.when(r))
            continue;
        } else if (d)
          continue;
        const f = r.issues.length, b = u._zod.check(r);
        if (b instanceof Promise && c?.async === !1)
          throw new no();
        if (l || b instanceof Promise)
          l = (l ?? Promise.resolve()).then(async () => {
            await b, r.issues.length !== f && (d || (d = Xi(r, f)));
          });
        else {
          if (r.issues.length === f)
            continue;
          d || (d = Xi(r, f));
        }
      }
      return l ? l.then(() => r) : r;
    }, n = (r, s, c) => {
      if (Xi(r))
        return r.aborted = !0, r;
      const d = o(s, i, c);
      if (d instanceof Promise) {
        if (c.async === !1)
          throw new no();
        return d.then((l) => t._zod.parse(l, c));
      }
      return t._zod.parse(d, c);
    };
    t._zod.run = (r, s) => {
      if (s.skipChecks)
        return t._zod.parse(r, s);
      if (s.direction === "backward") {
        const d = t._zod.parse({ value: r.value, issues: [] }, { ...s, skipChecks: !0 });
        return d instanceof Promise ? d.then((l) => n(l, r, s)) : n(d, r, s);
      }
      const c = t._zod.parse(r, s);
      if (c instanceof Promise) {
        if (s.async === !1)
          throw new no();
        return c.then((d) => o(d, i, s));
      }
      return o(c, i, s);
    };
  }
  je(t, "~standard", () => ({
    validate: (o) => {
      try {
        const n = ig(t, o);
        return n.success ? { value: n.data } : { issues: n.error?.issues };
      } catch {
        return og(t, o).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Dc = /* @__PURE__ */ L("$ZodString", (t, e) => {
  De.init(t, e), t._zod.pattern = [...t?._zod.bag?.patterns ?? []].pop() ?? Mg(t._zod.bag), t._zod.parse = (a, i) => {
    if (e.coerce)
      try {
        a.value = String(a.value);
      } catch {
      }
    return typeof a.value == "string" || a.issues.push({
      expected: "string",
      code: "invalid_type",
      input: a.value,
      inst: t
    }), a;
  };
}), He = /* @__PURE__ */ L("$ZodStringFormat", (t, e) => {
  Lr.init(t, e), Dc.init(t, e);
}), Qg = /* @__PURE__ */ L("$ZodGUID", (t, e) => {
  e.pattern ?? (e.pattern = yg), He.init(t, e);
}), e1 = /* @__PURE__ */ L("$ZodUUID", (t, e) => {
  if (e.version) {
    const i = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[e.version];
    if (i === void 0)
      throw new Error(`Invalid UUID version: "${e.version}"`);
    e.pattern ?? (e.pattern = nl(i));
  } else
    e.pattern ?? (e.pattern = nl());
  He.init(t, e);
}), t1 = /* @__PURE__ */ L("$ZodEmail", (t, e) => {
  e.pattern ?? (e.pattern = wg), He.init(t, e);
}), a1 = /* @__PURE__ */ L("$ZodURL", (t, e) => {
  He.init(t, e), t._zod.check = (a) => {
    try {
      const i = a.value.trim();
      if (!e.normalize && e.protocol?.source === Pg.source && !/^https?:\/\//i.test(i)) {
        a.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: a.value,
          inst: t,
          continue: !e.abort
        });
        return;
      }
      const o = new URL(i);
      e.hostname && (e.hostname.lastIndex = 0, e.hostname.test(o.hostname) || a.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: e.hostname.source,
        input: a.value,
        inst: t,
        continue: !e.abort
      })), e.protocol && (e.protocol.lastIndex = 0, e.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || a.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: e.protocol.source,
        input: a.value,
        inst: t,
        continue: !e.abort
      })), e.normalize ? a.value = o.href : a.value = i;
      return;
    } catch {
      a.issues.push({
        code: "invalid_format",
        format: "url",
        input: a.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
}), i1 = /* @__PURE__ */ L("$ZodEmoji", (t, e) => {
  e.pattern ?? (e.pattern = Ig()), He.init(t, e);
}), o1 = /* @__PURE__ */ L("$ZodNanoID", (t, e) => {
  e.pattern ?? (e.pattern = gg), He.init(t, e);
}), n1 = /* @__PURE__ */ L("$ZodCUID", (t, e) => {
  e.pattern ?? (e.pattern = pg), He.init(t, e);
}), r1 = /* @__PURE__ */ L("$ZodCUID2", (t, e) => {
  e.pattern ?? (e.pattern = hg), He.init(t, e);
}), s1 = /* @__PURE__ */ L("$ZodULID", (t, e) => {
  e.pattern ?? (e.pattern = bg), He.init(t, e);
}), c1 = /* @__PURE__ */ L("$ZodXID", (t, e) => {
  e.pattern ?? (e.pattern = mg), He.init(t, e);
}), d1 = /* @__PURE__ */ L("$ZodKSUID", (t, e) => {
  e.pattern ?? (e.pattern = vg), He.init(t, e);
}), l1 = /* @__PURE__ */ L("$ZodISODateTime", (t, e) => {
  e.pattern ?? (e.pattern = Og(e)), He.init(t, e);
}), u1 = /* @__PURE__ */ L("$ZodISODate", (t, e) => {
  e.pattern ?? (e.pattern = Vg), He.init(t, e);
}), f1 = /* @__PURE__ */ L("$ZodISOTime", (t, e) => {
  e.pattern ?? (e.pattern = Eg(e)), He.init(t, e);
}), p1 = /* @__PURE__ */ L("$ZodISODuration", (t, e) => {
  e.pattern ?? (e.pattern = _g), He.init(t, e);
}), h1 = /* @__PURE__ */ L("$ZodIPv4", (t, e) => {
  e.pattern ?? (e.pattern = Ag), He.init(t, e), t._zod.bag.format = "ipv4";
}), b1 = /* @__PURE__ */ L("$ZodIPv6", (t, e) => {
  e.pattern ?? (e.pattern = xg), He.init(t, e), t._zod.bag.format = "ipv6", t._zod.check = (a) => {
    try {
      new URL(`http://[${a.value}]`);
    } catch {
      a.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: a.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
}), m1 = /* @__PURE__ */ L("$ZodCIDRv4", (t, e) => {
  e.pattern ?? (e.pattern = Tg), He.init(t, e);
}), v1 = /* @__PURE__ */ L("$ZodCIDRv6", (t, e) => {
  e.pattern ?? (e.pattern = Sg), He.init(t, e), t._zod.check = (a) => {
    const i = a.value.split("/");
    try {
      if (i.length !== 2)
        throw new Error();
      const [o, n] = i;
      if (!n)
        throw new Error();
      const r = Number(n);
      if (`${r}` !== n)
        throw new Error();
      if (r < 0 || r > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      a.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: a.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
});
function Pp(t) {
  if (t === "")
    return !0;
  if (/\s/.test(t) || t.length % 4 !== 0)
    return !1;
  try {
    return atob(t), !0;
  } catch {
    return !1;
  }
}
const g1 = /* @__PURE__ */ L("$ZodBase64", (t, e) => {
  e.pattern ?? (e.pattern = Cg), He.init(t, e), t._zod.bag.contentEncoding = "base64", t._zod.check = (a) => {
    Pp(a.value) || a.issues.push({
      code: "invalid_format",
      format: "base64",
      input: a.value,
      inst: t,
      continue: !e.abort
    });
  };
});
function _1(t) {
  if (!kp.test(t))
    return !1;
  const e = t.replace(/[-_]/g, (i) => i === "-" ? "+" : "/"), a = e.padEnd(Math.ceil(e.length / 4) * 4, "=");
  return Pp(a);
}
const y1 = /* @__PURE__ */ L("$ZodBase64URL", (t, e) => {
  e.pattern ?? (e.pattern = kp), He.init(t, e), t._zod.bag.contentEncoding = "base64url", t._zod.check = (a) => {
    _1(a.value) || a.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: a.value,
      inst: t,
      continue: !e.abort
    });
  };
}), w1 = /* @__PURE__ */ L("$ZodE164", (t, e) => {
  e.pattern ?? (e.pattern = Rg), He.init(t, e);
});
function k1(t, e = null) {
  try {
    const a = t.split(".");
    if (a.length !== 3)
      return !1;
    const [i] = a;
    if (!i)
      return !1;
    const o = JSON.parse(atob(i));
    return !("typ" in o && o?.typ !== "JWT" || !o.alg || e && (!("alg" in o) || o.alg !== e));
  } catch {
    return !1;
  }
}
const I1 = /* @__PURE__ */ L("$ZodJWT", (t, e) => {
  He.init(t, e), t._zod.check = (a) => {
    k1(a.value, e.alg) || a.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: a.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Rp = /* @__PURE__ */ L("$ZodNumber", (t, e) => {
  De.init(t, e), t._zod.pattern = t._zod.bag.pattern ?? xp, t._zod.parse = (a, i) => {
    if (e.coerce)
      try {
        a.value = Number(a.value);
      } catch {
      }
    const o = a.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return a;
    const n = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return a.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: t,
      ...n ? { received: n } : {}
    }), a;
  };
}), A1 = /* @__PURE__ */ L("$ZodNumberFormat", (t, e) => {
  qg.init(t, e), Rp.init(t, e);
}), x1 = /* @__PURE__ */ L("$ZodBoolean", (t, e) => {
  De.init(t, e), t._zod.pattern = jg, t._zod.parse = (a, i) => {
    if (e.coerce)
      try {
        a.value = !!a.value;
      } catch {
      }
    const o = a.value;
    return typeof o == "boolean" || a.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: t
    }), a;
  };
}), T1 = /* @__PURE__ */ L("$ZodUnknown", (t, e) => {
  De.init(t, e), t._zod.parse = (a) => a;
}), S1 = /* @__PURE__ */ L("$ZodNever", (t, e) => {
  De.init(t, e), t._zod.parse = (a, i) => (a.issues.push({
    expected: "never",
    code: "invalid_type",
    input: a.value,
    inst: t
  }), a);
});
function rl(t, e, a) {
  t.issues.length && e.issues.push(...oi(a, t.issues)), e.value[a] = t.value;
}
const C1 = /* @__PURE__ */ L("$ZodArray", (t, e) => {
  De.init(t, e), t._zod.parse = (a, i) => {
    const o = a.value;
    if (!Array.isArray(o))
      return a.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: t
      }), a;
    a.value = Array(o.length);
    const n = [];
    for (let r = 0; r < o.length; r++) {
      const s = o[r], c = e.element._zod.run({
        value: s,
        issues: []
      }, i);
      c instanceof Promise ? n.push(c.then((d) => rl(d, a, r))) : rl(c, a, r);
    }
    return n.length ? Promise.all(n).then(() => a) : a;
  };
});
function mr(t, e, a, i, o, n) {
  const r = a in i;
  if (t.issues.length) {
    if (o && n && !r)
      return;
    e.issues.push(...oi(a, t.issues));
  }
  if (!r && !o) {
    t.issues.length || e.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: void 0,
      path: [a]
    });
    return;
  }
  t.value === void 0 ? r && (e.value[a] = void 0) : e.value[a] = t.value;
}
function Vp(t) {
  const e = Object.keys(t.shape);
  for (const i of e)
    if (!t.shape?.[i]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${i}": expected a Zod schema`);
  const a = Bv(t.shape);
  return {
    ...t,
    keys: e,
    keySet: new Set(e),
    numKeys: e.length,
    optionalKeys: new Set(a)
  };
}
function Ep(t, e, a, i, o, n) {
  const r = [], s = o.keySet, c = o.catchall._zod, d = c.def.type, l = c.optin === "optional", u = c.optout === "optional";
  for (const f in e) {
    if (f === "__proto__" || s.has(f))
      continue;
    if (d === "never") {
      r.push(f);
      continue;
    }
    const b = c.run({ value: e[f], issues: [] }, i);
    b instanceof Promise ? t.push(b.then((y) => mr(y, a, f, e, l, u))) : mr(b, a, f, e, l, u);
  }
  return r.length && a.issues.push({
    code: "unrecognized_keys",
    keys: r,
    input: e,
    inst: n
  }), t.length ? Promise.all(t).then(() => a) : a;
}
const P1 = /* @__PURE__ */ L("$ZodObject", (t, e) => {
  if (De.init(t, e), !Object.getOwnPropertyDescriptor(e, "shape")?.get) {
    const s = e.shape;
    Object.defineProperty(e, "shape", {
      get: () => {
        const c = { ...s };
        return Object.defineProperty(e, "shape", {
          value: c
        }), c;
      }
    });
  }
  const i = Fr(() => Vp(e));
  je(t._zod, "propValues", () => {
    const s = e.shape, c = {};
    for (const d in s) {
      const l = s[d]._zod;
      if (l.values) {
        c[d] ?? (c[d] = /* @__PURE__ */ new Set());
        for (const u of l.values)
          c[d].add(u);
      }
    }
    return c;
  });
  const o = pn, n = e.catchall;
  let r;
  t._zod.parse = (s, c) => {
    r ?? (r = i.value);
    const d = s.value;
    if (!o(d))
      return s.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: t
      }), s;
    s.value = {};
    const l = [], u = r.shape;
    for (const f of r.keys) {
      const b = u[f], y = b._zod.optin === "optional", v = b._zod.optout === "optional", g = b._zod.run({ value: d[f], issues: [] }, c);
      g instanceof Promise ? l.push(g.then((k) => mr(k, s, f, d, y, v))) : mr(g, s, f, d, y, v);
    }
    return n ? Ep(l, d, s, c, i.value, t) : l.length ? Promise.all(l).then(() => s) : s;
  };
}), R1 = /* @__PURE__ */ L("$ZodObjectJIT", (t, e) => {
  P1.init(t, e);
  const a = t._zod.parse, i = Fr(() => Vp(e)), o = (f) => {
    const b = new Yg(["shape", "payload", "ctx"]), y = i.value, v = (S) => {
      const T = ol(S);
      return `shape[${T}]._zod.run({ value: input[${T}], issues: [] }, ctx)`;
    };
    b.write("const input = payload.value;");
    const g = /* @__PURE__ */ Object.create(null);
    let k = 0;
    for (const S of y.keys)
      g[S] = `key_${k++}`;
    b.write("const newResult = {};");
    for (const S of y.keys) {
      const T = g[S], x = ol(S), D = f[S], V = D?._zod?.optin === "optional", P = D?._zod?.optout === "optional";
      b.write(`const ${T} = ${v(S)};`), V && P ? b.write(`
        if (${T}.issues.length) {
          if (${x} in input) {
            payload.issues = payload.issues.concat(${T}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${x}, ...iss.path] : [${x}]
            })));
          }
        }

        if (${T}.value === undefined) {
          if (${x} in input) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${T}.value;
        }

      `) : V ? b.write(`
        if (${T}.issues.length) {
          payload.issues = payload.issues.concat(${T}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${x}, ...iss.path] : [${x}]
          })));
        }

        if (${T}.value === undefined) {
          if (${x} in input) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${T}.value;
        }

      `) : b.write(`
        const ${T}_present = ${x} in input;
        if (${T}.issues.length) {
          payload.issues = payload.issues.concat(${T}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${x}, ...iss.path] : [${x}]
          })));
        }
        if (!${T}_present && !${T}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${x}]
          });
        }

        if (${T}_present) {
          if (${T}.value === undefined) {
            newResult[${x}] = undefined;
          } else {
            newResult[${x}] = ${T}.value;
          }
        }

      `);
    }
    b.write("payload.value = newResult;"), b.write("return payload;");
    const I = b.compile();
    return (S, T) => I(f, S, T);
  };
  let n;
  const r = pn, s = !Uc.jitless, d = s && Nv.value, l = e.catchall;
  let u;
  t._zod.parse = (f, b) => {
    u ?? (u = i.value);
    const y = f.value;
    return r(y) ? s && d && b?.async === !1 && b.jitless !== !0 ? (n || (n = o(e.shape)), f = n(f, b), l ? Ep([], y, f, b, u, t) : f) : a(f, b) : (f.issues.push({
      expected: "object",
      code: "invalid_type",
      input: y,
      inst: t
    }), f);
  };
});
function sl(t, e, a, i) {
  for (const n of t)
    if (n.issues.length === 0)
      return e.value = n.value, e;
  const o = t.filter((n) => !Xi(n));
  return o.length === 1 ? (e.value = o[0].value, o[0]) : (e.issues.push({
    code: "invalid_union",
    input: e.value,
    inst: a,
    errors: t.map((n) => n.issues.map((r) => Ba(r, i, Da())))
  }), e);
}
const Op = /* @__PURE__ */ L("$ZodUnion", (t, e) => {
  De.init(t, e), je(t._zod, "optin", () => e.options.some((i) => i._zod.optin === "optional") ? "optional" : void 0), je(t._zod, "optout", () => e.options.some((i) => i._zod.optout === "optional") ? "optional" : void 0), je(t._zod, "values", () => {
    if (e.options.every((i) => i._zod.values))
      return new Set(e.options.flatMap((i) => Array.from(i._zod.values)));
  }), je(t._zod, "pattern", () => {
    if (e.options.every((i) => i._zod.pattern)) {
      const i = e.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${i.map((o) => qc(o.source)).join("|")})$`);
    }
  });
  const a = e.options.length === 1 ? e.options[0]._zod.run : null;
  t._zod.parse = (i, o) => {
    if (a)
      return a(i, o);
    let n = !1;
    const r = [];
    for (const s of e.options) {
      const c = s._zod.run({
        value: i.value,
        issues: []
      }, o);
      if (c instanceof Promise)
        r.push(c), n = !0;
      else {
        if (c.issues.length === 0)
          return c;
        r.push(c);
      }
    }
    return n ? Promise.all(r).then((s) => sl(s, i, t, o)) : sl(r, i, t, o);
  };
}), V1 = /* @__PURE__ */ L("$ZodDiscriminatedUnion", (t, e) => {
  e.inclusive = !1, Op.init(t, e);
  const a = t._zod.parse;
  je(t._zod, "propValues", () => {
    const o = {};
    for (const n of e.options) {
      const r = n._zod.propValues;
      if (!r || Object.keys(r).length === 0)
        throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(n)}"`);
      for (const [s, c] of Object.entries(r)) {
        o[s] || (o[s] = /* @__PURE__ */ new Set());
        for (const d of c)
          o[s].add(d);
      }
    }
    return o;
  });
  const i = Fr(() => {
    const o = e.options, n = /* @__PURE__ */ new Map();
    for (const r of o) {
      const s = r._zod.propValues?.[e.discriminator];
      if (!s || s.size === 0)
        throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(r)}"`);
      for (const c of s) {
        if (n.has(c))
          throw new Error(`Duplicate discriminator value "${String(c)}"`);
        n.set(c, r);
      }
    }
    return n;
  });
  t._zod.parse = (o, n) => {
    const r = o.value;
    if (!pn(r))
      return o.issues.push({
        code: "invalid_type",
        expected: "object",
        input: r,
        inst: t
      }), o;
    const s = i.value.get(r?.[e.discriminator]);
    return s ? s._zod.run(o, n) : e.unionFallback || n.direction === "backward" ? a(o, n) : (o.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: e.discriminator,
      options: Array.from(i.value.keys()),
      input: r,
      path: [e.discriminator],
      inst: t
    }), o);
  };
}), E1 = /* @__PURE__ */ L("$ZodIntersection", (t, e) => {
  De.init(t, e), t._zod.parse = (a, i) => {
    const o = a.value, n = e.left._zod.run({ value: o, issues: [] }, i), r = e.right._zod.run({ value: o, issues: [] }, i);
    return n instanceof Promise || r instanceof Promise ? Promise.all([n, r]).then(([c, d]) => cl(a, c, d)) : cl(a, n, r);
  };
});
function Ks(t, e) {
  if (t === e)
    return { valid: !0, data: t };
  if (t instanceof Date && e instanceof Date && +t == +e)
    return { valid: !0, data: t };
  if (bo(t) && bo(e)) {
    const a = Object.keys(e), i = Object.keys(t).filter((n) => a.indexOf(n) !== -1), o = { ...t, ...e };
    for (const n of i) {
      const r = Ks(t[n], e[n]);
      if (!r.valid)
        return {
          valid: !1,
          mergeErrorPath: [n, ...r.mergeErrorPath]
        };
      o[n] = r.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length)
      return { valid: !1, mergeErrorPath: [] };
    const a = [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], n = e[i], r = Ks(o, n);
      if (!r.valid)
        return {
          valid: !1,
          mergeErrorPath: [i, ...r.mergeErrorPath]
        };
      a.push(r.data);
    }
    return { valid: !0, data: a };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function cl(t, e, a) {
  const i = /* @__PURE__ */ new Map();
  let o;
  for (const s of e.issues)
    if (s.code === "unrecognized_keys") {
      o ?? (o = s);
      for (const c of s.keys)
        i.has(c) || i.set(c, {}), i.get(c).l = !0;
    } else
      t.issues.push(s);
  for (const s of a.issues)
    if (s.code === "unrecognized_keys")
      for (const c of s.keys)
        i.has(c) || i.set(c, {}), i.get(c).r = !0;
    else
      t.issues.push(s);
  const n = [...i].filter(([, s]) => s.l && s.r).map(([s]) => s);
  if (n.length && o && t.issues.push({ ...o, keys: n }), Xi(t))
    return t;
  const r = Ks(e.value, a.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return t.value = r.data, t;
}
const O1 = /* @__PURE__ */ L("$ZodTuple", (t, e) => {
  De.init(t, e);
  const a = e.items;
  t._zod.parse = (i, o) => {
    const n = i.value;
    if (!Array.isArray(n))
      return i.issues.push({
        input: n,
        inst: t,
        expected: "tuple",
        code: "invalid_type"
      }), i;
    i.value = [];
    const r = [], s = dl(a, "optin"), c = dl(a, "optout");
    if (!e.rest) {
      if (n.length < s)
        return i.issues.push({
          code: "too_small",
          minimum: s,
          inclusive: !0,
          input: n,
          inst: t,
          origin: "array"
        }), i;
      n.length > a.length && i.issues.push({
        code: "too_big",
        maximum: a.length,
        inclusive: !0,
        input: n,
        inst: t,
        origin: "array"
      });
    }
    const d = new Array(a.length);
    for (let l = 0; l < a.length; l++) {
      const u = a[l]._zod.run({ value: n[l], issues: [] }, o);
      u instanceof Promise ? r.push(u.then((f) => {
        d[l] = f;
      })) : d[l] = u;
    }
    if (e.rest) {
      let l = a.length - 1;
      const u = n.slice(a.length);
      for (const f of u) {
        l++;
        const b = e.rest._zod.run({ value: f, issues: [] }, o);
        b instanceof Promise ? r.push(b.then((y) => ll(y, i, l))) : ll(b, i, l);
      }
    }
    return r.length ? Promise.all(r).then(() => ul(d, i, a, n, c)) : ul(d, i, a, n, c);
  };
});
function dl(t, e) {
  for (let a = t.length - 1; a >= 0; a--)
    if (t[a]._zod[e] !== "optional")
      return a + 1;
  return 0;
}
function ll(t, e, a) {
  t.issues.length && e.issues.push(...oi(a, t.issues)), e.value[a] = t.value;
}
function ul(t, e, a, i, o) {
  for (let n = 0; n < a.length; n++) {
    const r = t[n], s = n < i.length;
    if (r.issues.length) {
      if (!s && n >= o) {
        e.value.length = n;
        break;
      }
      e.issues.push(...oi(n, r.issues));
    }
    e.value[n] = r.value;
  }
  for (let n = e.value.length - 1; n >= i.length && (a[n]._zod.optout === "optional" && e.value[n] === void 0); n--)
    e.value.length = n;
  return e;
}
const M1 = /* @__PURE__ */ L("$ZodRecord", (t, e) => {
  De.init(t, e), t._zod.parse = (a, i) => {
    const o = a.value;
    if (!bo(o))
      return a.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: t
      }), a;
    const n = [], r = e.keyType._zod.values;
    if (r) {
      a.value = {};
      const s = /* @__PURE__ */ new Set();
      for (const d of r)
        if (typeof d == "string" || typeof d == "number" || typeof d == "symbol") {
          s.add(typeof d == "number" ? d.toString() : d);
          const l = e.keyType._zod.run({ value: d, issues: [] }, i);
          if (l instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (l.issues.length) {
            a.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: l.issues.map((b) => Ba(b, i, Da())),
              input: d,
              path: [d],
              inst: t
            });
            continue;
          }
          const u = l.value, f = e.valueType._zod.run({ value: o[d], issues: [] }, i);
          f instanceof Promise ? n.push(f.then((b) => {
            b.issues.length && a.issues.push(...oi(d, b.issues)), a.value[u] = b.value;
          })) : (f.issues.length && a.issues.push(...oi(d, f.issues)), a.value[u] = f.value);
        }
      let c;
      for (const d in o)
        s.has(d) || (c = c ?? [], c.push(d));
      c && c.length > 0 && a.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: t,
        keys: c
      });
    } else {
      a.value = {};
      for (const s of Reflect.ownKeys(o)) {
        if (s === "__proto__" || !Object.prototype.propertyIsEnumerable.call(o, s))
          continue;
        let c = e.keyType._zod.run({ value: s, issues: [] }, i);
        if (c instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof s == "string" && xp.test(s) && c.issues.length) {
          const u = e.keyType._zod.run({ value: Number(s), issues: [] }, i);
          if (u instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          u.issues.length === 0 && (c = u);
        }
        if (c.issues.length) {
          e.mode === "loose" ? a.value[s] = o[s] : a.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((u) => Ba(u, i, Da())),
            input: s,
            path: [s],
            inst: t
          });
          continue;
        }
        const l = e.valueType._zod.run({ value: o[s], issues: [] }, i);
        l instanceof Promise ? n.push(l.then((u) => {
          u.issues.length && a.issues.push(...oi(s, u.issues)), a.value[c.value] = u.value;
        })) : (l.issues.length && a.issues.push(...oi(s, l.issues)), a.value[c.value] = l.value);
      }
    }
    return n.length ? Promise.all(n).then(() => a) : a;
  };
}), $1 = /* @__PURE__ */ L("$ZodEnum", (t, e) => {
  De.init(t, e);
  const a = mp(e.entries), i = new Set(a);
  t._zod.values = i, t._zod.pattern = new RegExp(`^(${a.filter((o) => Dv.has(typeof o)).map((o) => typeof o == "string" ? mo(o) : o.toString()).join("|")})$`), t._zod.parse = (o, n) => {
    const r = o.value;
    return i.has(r) || o.issues.push({
      code: "invalid_value",
      values: a,
      input: r,
      inst: t
    }), o;
  };
}), j1 = /* @__PURE__ */ L("$ZodLiteral", (t, e) => {
  if (De.init(t, e), e.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const a = new Set(e.values);
  t._zod.values = a, t._zod.pattern = new RegExp(`^(${e.values.map((i) => typeof i == "string" ? mo(i) : i ? mo(i.toString()) : String(i)).join("|")})$`), t._zod.parse = (i, o) => {
    const n = i.value;
    return a.has(n) || i.issues.push({
      code: "invalid_value",
      values: e.values,
      input: n,
      inst: t
    }), i;
  };
}), z1 = /* @__PURE__ */ L("$ZodTransform", (t, e) => {
  De.init(t, e), t._zod.optin = "optional", t._zod.parse = (a, i) => {
    if (i.direction === "backward")
      throw new bp(t.constructor.name);
    const o = e.transform(a.value, a);
    if (i.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((r) => (a.value = r, a.fallback = !0, a));
    if (o instanceof Promise)
      throw new no();
    return a.value = o, a.fallback = !0, a;
  };
});
function fl(t, e) {
  return e === void 0 && (t.issues.length || t.fallback) ? { issues: [], value: void 0 } : t;
}
const Mp = /* @__PURE__ */ L("$ZodOptional", (t, e) => {
  De.init(t, e), t._zod.optin = "optional", t._zod.optout = "optional", je(t._zod, "values", () => e.innerType._zod.values ? /* @__PURE__ */ new Set([...e.innerType._zod.values, void 0]) : void 0), je(t._zod, "pattern", () => {
    const a = e.innerType._zod.pattern;
    return a ? new RegExp(`^(${qc(a.source)})?$`) : void 0;
  }), t._zod.parse = (a, i) => {
    if (e.innerType._zod.optin === "optional") {
      const o = a.value, n = e.innerType._zod.run(a, i);
      return n instanceof Promise ? n.then((r) => fl(r, o)) : fl(n, o);
    }
    return a.value === void 0 ? a : e.innerType._zod.run(a, i);
  };
}), U1 = /* @__PURE__ */ L("$ZodExactOptional", (t, e) => {
  Mp.init(t, e), je(t._zod, "values", () => e.innerType._zod.values), je(t._zod, "pattern", () => e.innerType._zod.pattern), t._zod.parse = (a, i) => e.innerType._zod.run(a, i);
}), F1 = /* @__PURE__ */ L("$ZodNullable", (t, e) => {
  De.init(t, e), je(t._zod, "optin", () => e.innerType._zod.optin), je(t._zod, "optout", () => e.innerType._zod.optout), je(t._zod, "pattern", () => {
    const a = e.innerType._zod.pattern;
    return a ? new RegExp(`^(${qc(a.source)}|null)$`) : void 0;
  }), je(t._zod, "values", () => e.innerType._zod.values ? /* @__PURE__ */ new Set([...e.innerType._zod.values, null]) : void 0), t._zod.parse = (a, i) => a.value === null ? a : e.innerType._zod.run(a, i);
}), q1 = /* @__PURE__ */ L("$ZodDefault", (t, e) => {
  De.init(t, e), t._zod.optin = "optional", je(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (a, i) => {
    if (i.direction === "backward")
      return e.innerType._zod.run(a, i);
    if (a.value === void 0)
      return a.value = e.defaultValue, a;
    const o = e.innerType._zod.run(a, i);
    return o instanceof Promise ? o.then((n) => pl(n, e)) : pl(o, e);
  };
});
function pl(t, e) {
  return t.value === void 0 && (t.value = e.defaultValue), t;
}
const Z1 = /* @__PURE__ */ L("$ZodPrefault", (t, e) => {
  De.init(t, e), t._zod.optin = "optional", je(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (a, i) => (i.direction === "backward" || a.value === void 0 && (a.value = e.defaultValue), e.innerType._zod.run(a, i));
}), L1 = /* @__PURE__ */ L("$ZodNonOptional", (t, e) => {
  De.init(t, e), je(t._zod, "values", () => {
    const a = e.innerType._zod.values;
    return a ? new Set([...a].filter((i) => i !== void 0)) : void 0;
  }), t._zod.parse = (a, i) => {
    const o = e.innerType._zod.run(a, i);
    return o instanceof Promise ? o.then((n) => hl(n, t)) : hl(o, t);
  };
});
function hl(t, e) {
  return !t.issues.length && t.value === void 0 && t.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: t.value,
    inst: e
  }), t;
}
const N1 = /* @__PURE__ */ L("$ZodCatch", (t, e) => {
  De.init(t, e), t._zod.optin = "optional", je(t._zod, "optout", () => e.innerType._zod.optout), je(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (a, i) => {
    if (i.direction === "backward")
      return e.innerType._zod.run(a, i);
    const o = e.innerType._zod.run(a, i);
    return o instanceof Promise ? o.then((n) => (a.value = n.value, n.issues.length && (a.value = e.catchValue({
      ...a,
      error: {
        issues: n.issues.map((r) => Ba(r, i, Da()))
      },
      input: a.value
    }), a.issues = [], a.fallback = !0), a)) : (a.value = o.value, o.issues.length && (a.value = e.catchValue({
      ...a,
      error: {
        issues: o.issues.map((n) => Ba(n, i, Da()))
      },
      input: a.value
    }), a.issues = [], a.fallback = !0), a);
  };
}), D1 = /* @__PURE__ */ L("$ZodPipe", (t, e) => {
  De.init(t, e), je(t._zod, "values", () => e.in._zod.values), je(t._zod, "optin", () => e.in._zod.optin), je(t._zod, "optout", () => e.out._zod.optout), je(t._zod, "propValues", () => e.in._zod.propValues), t._zod.parse = (a, i) => {
    if (i.direction === "backward") {
      const n = e.out._zod.run(a, i);
      return n instanceof Promise ? n.then((r) => jn(r, e.in, i)) : jn(n, e.in, i);
    }
    const o = e.in._zod.run(a, i);
    return o instanceof Promise ? o.then((n) => jn(n, e.out, i)) : jn(o, e.out, i);
  };
});
function jn(t, e, a) {
  return t.issues.length ? (t.aborted = !0, t) : e._zod.run({ value: t.value, issues: t.issues, fallback: t.fallback }, a);
}
const B1 = /* @__PURE__ */ L("$ZodReadonly", (t, e) => {
  De.init(t, e), je(t._zod, "propValues", () => e.innerType._zod.propValues), je(t._zod, "values", () => e.innerType._zod.values), je(t._zod, "optin", () => e.innerType?._zod?.optin), je(t._zod, "optout", () => e.innerType?._zod?.optout), t._zod.parse = (a, i) => {
    if (i.direction === "backward")
      return e.innerType._zod.run(a, i);
    const o = e.innerType._zod.run(a, i);
    return o instanceof Promise ? o.then(bl) : bl(o);
  };
});
function bl(t) {
  return t.value = Object.freeze(t.value), t;
}
const H1 = /* @__PURE__ */ L("$ZodCustom", (t, e) => {
  Nt.init(t, e), De.init(t, e), t._zod.parse = (a, i) => a, t._zod.check = (a) => {
    const i = a.value, o = e.fn(i);
    if (o instanceof Promise)
      return o.then((n) => ml(n, a, i, t));
    ml(o, a, i, t);
  };
});
function ml(t, e, a, i) {
  if (!t) {
    const o = {
      code: "custom",
      input: a,
      inst: i,
      // incorporates params.error into issue reporting
      path: [...i._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !i._zod.def.abort
      // params: inst._zod.def.params,
    };
    i._zod.def.params && (o.params = i._zod.def.params), e.issues.push(hn(o));
  }
}
var vl;
class J1 {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(e, ...a) {
    const i = a[0];
    return this._map.set(e, i), i && typeof i == "object" && "id" in i && this._idmap.set(i.id, e), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(e) {
    const a = this._map.get(e);
    return a && typeof a == "object" && "id" in a && this._idmap.delete(a.id), this._map.delete(e), this;
  }
  get(e) {
    const a = e._zod.parent;
    if (a) {
      const i = { ...this.get(a) ?? {} };
      delete i.id;
      const o = { ...i, ...this._map.get(e) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(e);
  }
  has(e) {
    return this._map.has(e);
  }
}
function G1() {
  return new J1();
}
(vl = globalThis).__zod_globalRegistry ?? (vl.__zod_globalRegistry = G1());
const Mo = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function W1(t, e) {
  return new t({
    type: "string",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function K1(t, e) {
  return new t({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function gl(t, e) {
  return new t({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Y1(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function X1(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Q1(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function e2(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function t2(t, e) {
  return new t({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function a2(t, e) {
  return new t({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function i2(t, e) {
  return new t({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function o2(t, e) {
  return new t({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function n2(t, e) {
  return new t({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function r2(t, e) {
  return new t({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function s2(t, e) {
  return new t({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function c2(t, e) {
  return new t({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function d2(t, e) {
  return new t({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function l2(t, e) {
  return new t({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function u2(t, e) {
  return new t({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function f2(t, e) {
  return new t({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function p2(t, e) {
  return new t({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function h2(t, e) {
  return new t({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function b2(t, e) {
  return new t({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function m2(t, e) {
  return new t({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function v2(t, e) {
  return new t({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function g2(t, e) {
  return new t({
    type: "string",
    format: "date",
    check: "string_format",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function _2(t, e) {
  return new t({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function y2(t, e) {
  return new t({
    type: "string",
    format: "duration",
    check: "string_format",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function w2(t, e) {
  return new t({
    type: "number",
    checks: [],
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function k2(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function I2(t, e) {
  return new t({
    type: "boolean",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function A2(t) {
  return new t({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function x2(t, e) {
  return new t({
    type: "never",
    ...le(e)
  });
}
// @__NO_SIDE_EFFECTS__
function _l(t, e) {
  return new Sp({
    check: "less_than",
    ...le(e),
    value: t,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function bs(t, e) {
  return new Sp({
    check: "less_than",
    ...le(e),
    value: t,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function yl(t, e) {
  return new Cp({
    check: "greater_than",
    ...le(e),
    value: t,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function ms(t, e) {
  return new Cp({
    check: "greater_than",
    ...le(e),
    value: t,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function wl(t, e) {
  return new Fg({
    check: "multiple_of",
    ...le(e),
    value: t
  });
}
// @__NO_SIDE_EFFECTS__
function $p(t, e) {
  return new Zg({
    check: "max_length",
    ...le(e),
    maximum: t
  });
}
// @__NO_SIDE_EFFECTS__
function vr(t, e) {
  return new Lg({
    check: "min_length",
    ...le(e),
    minimum: t
  });
}
// @__NO_SIDE_EFFECTS__
function jp(t, e) {
  return new Ng({
    check: "length_equals",
    ...le(e),
    length: t
  });
}
// @__NO_SIDE_EFFECTS__
function T2(t, e) {
  return new Dg({
    check: "string_format",
    format: "regex",
    ...le(e),
    pattern: t
  });
}
// @__NO_SIDE_EFFECTS__
function S2(t) {
  return new Bg({
    check: "string_format",
    format: "lowercase",
    ...le(t)
  });
}
// @__NO_SIDE_EFFECTS__
function C2(t) {
  return new Hg({
    check: "string_format",
    format: "uppercase",
    ...le(t)
  });
}
// @__NO_SIDE_EFFECTS__
function P2(t, e) {
  return new Jg({
    check: "string_format",
    format: "includes",
    ...le(e),
    includes: t
  });
}
// @__NO_SIDE_EFFECTS__
function R2(t, e) {
  return new Gg({
    check: "string_format",
    format: "starts_with",
    ...le(e),
    prefix: t
  });
}
// @__NO_SIDE_EFFECTS__
function V2(t, e) {
  return new Wg({
    check: "string_format",
    format: "ends_with",
    ...le(e),
    suffix: t
  });
}
// @__NO_SIDE_EFFECTS__
function ko(t) {
  return new Kg({
    check: "overwrite",
    tx: t
  });
}
// @__NO_SIDE_EFFECTS__
function E2(t) {
  return /* @__PURE__ */ ko((e) => e.normalize(t));
}
// @__NO_SIDE_EFFECTS__
function O2() {
  return /* @__PURE__ */ ko((t) => t.trim());
}
// @__NO_SIDE_EFFECTS__
function M2() {
  return /* @__PURE__ */ ko((t) => t.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function $2() {
  return /* @__PURE__ */ ko((t) => t.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function j2() {
  return /* @__PURE__ */ ko((t) => Lv(t));
}
// @__NO_SIDE_EFFECTS__
function z2(t, e, a) {
  return new t({
    type: "array",
    element: e,
    // get element() {
    //   return element;
    // },
    ...le(a)
  });
}
// @__NO_SIDE_EFFECTS__
function U2(t, e, a) {
  const i = le(a);
  return i.abort ?? (i.abort = !0), new t({
    type: "custom",
    check: "custom",
    fn: e,
    ...i
  });
}
// @__NO_SIDE_EFFECTS__
function F2(t, e, a) {
  return new t({
    type: "custom",
    check: "custom",
    fn: e,
    ...le(a)
  });
}
// @__NO_SIDE_EFFECTS__
function q2(t, e) {
  const a = /* @__PURE__ */ Z2((i) => (i.addIssue = (o) => {
    if (typeof o == "string")
      i.issues.push(hn(o, i.value, a._zod.def));
    else {
      const n = o;
      n.fatal && (n.continue = !1), n.code ?? (n.code = "custom"), n.input ?? (n.input = i.value), n.inst ?? (n.inst = a), n.continue ?? (n.continue = !a._zod.def.abort), i.issues.push(hn(n));
    }
  }, t(i.value, i)), e);
  return a;
}
// @__NO_SIDE_EFFECTS__
function Z2(t, e) {
  const a = new Nt({
    check: "custom",
    ...le(e)
  });
  return a._zod.check = t, a;
}
function zp(t) {
  let e = t?.target ?? "draft-2020-12";
  return e === "draft-4" && (e = "draft-04"), e === "draft-7" && (e = "draft-07"), {
    processors: t.processors ?? {},
    metadataRegistry: t?.metadata ?? Mo,
    target: e,
    unrepresentable: t?.unrepresentable ?? "throw",
    override: t?.override ?? (() => {
    }),
    io: t?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: t?.cycles ?? "ref",
    reused: t?.reused ?? "inline",
    external: t?.external ?? void 0
  };
}
function rt(t, e, a = { path: [], schemaPath: [] }) {
  var i;
  const o = t._zod.def, n = e.seen.get(t);
  if (n)
    return n.count++, a.schemaPath.includes(t) && (n.cycle = a.path), n.schema;
  const r = { schema: {}, count: 1, cycle: void 0, path: a.path };
  e.seen.set(t, r);
  const s = t._zod.toJSONSchema?.();
  if (s)
    r.schema = s;
  else {
    const l = {
      ...a,
      schemaPath: [...a.schemaPath, t],
      path: a.path
    };
    if (t._zod.processJSONSchema)
      t._zod.processJSONSchema(e, r.schema, l);
    else {
      const f = r.schema, b = e.processors[o.type];
      if (!b)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      b(t, e, f, l);
    }
    const u = t._zod.parent;
    u && (r.ref || (r.ref = u), rt(u, e, l), e.seen.get(u).isParent = !0);
  }
  const c = e.metadataRegistry.get(t);
  return c && Object.assign(r.schema, c), e.io === "input" && Ct(t) && (delete r.schema.examples, delete r.schema.default), e.io === "input" && "_prefault" in r.schema && ((i = r.schema).default ?? (i.default = r.schema._prefault)), delete r.schema._prefault, e.seen.get(t).schema;
}
function Up(t, e) {
  const a = t.seen.get(e);
  if (!a)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const i = /* @__PURE__ */ new Map();
  for (const r of t.seen.entries()) {
    const s = t.metadataRegistry.get(r[0])?.id;
    if (s) {
      const c = i.get(s);
      if (c && c !== r[0])
        throw new Error(`Duplicate schema id "${s}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      i.set(s, r[0]);
    }
  }
  const o = (r) => {
    const s = t.target === "draft-2020-12" ? "$defs" : "definitions";
    if (t.external) {
      const u = t.external.registry.get(r[0])?.id, f = t.external.uri ?? ((y) => y);
      if (u)
        return { ref: f(u) };
      const b = r[1].defId ?? r[1].schema.id ?? `schema${t.counter++}`;
      return r[1].defId = b, { defId: b, ref: `${f("__shared")}#/${s}/${b}` };
    }
    if (r[1] === a)
      return { ref: "#" };
    const d = `#/${s}/`, l = r[1].schema.id ?? `__schema${t.counter++}`;
    return { defId: l, ref: d + l };
  }, n = (r) => {
    if (r[1].schema.$ref)
      return;
    const s = r[1], { ref: c, defId: d } = o(r);
    s.def = { ...s.schema }, d && (s.defId = d);
    const l = s.schema;
    for (const u in l)
      delete l[u];
    l.$ref = c;
  };
  if (t.cycles === "throw")
    for (const r of t.seen.entries()) {
      const s = r[1];
      if (s.cycle)
        throw new Error(`Cycle detected: #/${s.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const r of t.seen.entries()) {
    const s = r[1];
    if (e === r[0]) {
      n(r);
      continue;
    }
    if (t.external) {
      const d = t.external.registry.get(r[0])?.id;
      if (e !== r[0] && d) {
        n(r);
        continue;
      }
    }
    if (t.metadataRegistry.get(r[0])?.id) {
      n(r);
      continue;
    }
    if (s.cycle) {
      n(r);
      continue;
    }
    if (s.count > 1 && t.reused === "ref") {
      n(r);
      continue;
    }
  }
}
function Fp(t, e) {
  const a = t.seen.get(e);
  if (!a)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const i = (s) => {
    const c = t.seen.get(s);
    if (c.ref === null)
      return;
    const d = c.def ?? c.schema, l = { ...d }, u = c.ref;
    if (c.ref = null, u) {
      i(u);
      const b = t.seen.get(u), y = b.schema;
      if (y.$ref && (t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0") ? (d.allOf = d.allOf ?? [], d.allOf.push(y)) : Object.assign(d, y), Object.assign(d, l), s._zod.parent === u)
        for (const g in d)
          g === "$ref" || g === "allOf" || g in l || delete d[g];
      if (y.$ref && b.def)
        for (const g in d)
          g === "$ref" || g === "allOf" || g in b.def && JSON.stringify(d[g]) === JSON.stringify(b.def[g]) && delete d[g];
    }
    const f = s._zod.parent;
    if (f && f !== u) {
      i(f);
      const b = t.seen.get(f);
      if (b?.schema.$ref && (d.$ref = b.schema.$ref, b.def))
        for (const y in d)
          y === "$ref" || y === "allOf" || y in b.def && JSON.stringify(d[y]) === JSON.stringify(b.def[y]) && delete d[y];
    }
    t.override({
      zodSchema: s,
      jsonSchema: d,
      path: c.path ?? []
    });
  };
  for (const s of [...t.seen.entries()].reverse())
    i(s[0]);
  const o = {};
  if (t.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : t.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : t.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : t.target, t.external?.uri) {
    const s = t.external.registry.get(e)?.id;
    if (!s)
      throw new Error("Schema is missing an `id` property");
    o.$id = t.external.uri(s);
  }
  Object.assign(o, a.def ?? a.schema);
  const n = t.metadataRegistry.get(e)?.id;
  n !== void 0 && o.id === n && delete o.id;
  const r = t.external?.defs ?? {};
  for (const s of t.seen.entries()) {
    const c = s[1];
    c.def && c.defId && (c.def.id === c.defId && delete c.def.id, r[c.defId] = c.def);
  }
  t.external || Object.keys(r).length > 0 && (t.target === "draft-2020-12" ? o.$defs = r : o.definitions = r);
  try {
    const s = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(s, "~standard", {
      value: {
        ...e["~standard"],
        jsonSchema: {
          input: gr(e, "input", t.processors),
          output: gr(e, "output", t.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), s;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Ct(t, e) {
  const a = e ?? { seen: /* @__PURE__ */ new Set() };
  if (a.seen.has(t))
    return !1;
  a.seen.add(t);
  const i = t._zod.def;
  if (i.type === "transform")
    return !0;
  if (i.type === "array")
    return Ct(i.element, a);
  if (i.type === "set")
    return Ct(i.valueType, a);
  if (i.type === "lazy")
    return Ct(i.getter(), a);
  if (i.type === "promise" || i.type === "optional" || i.type === "nonoptional" || i.type === "nullable" || i.type === "readonly" || i.type === "default" || i.type === "prefault")
    return Ct(i.innerType, a);
  if (i.type === "intersection")
    return Ct(i.left, a) || Ct(i.right, a);
  if (i.type === "record" || i.type === "map")
    return Ct(i.keyType, a) || Ct(i.valueType, a);
  if (i.type === "pipe")
    return t._zod.traits.has("$ZodCodec") ? !0 : Ct(i.in, a) || Ct(i.out, a);
  if (i.type === "object") {
    for (const o in i.shape)
      if (Ct(i.shape[o], a))
        return !0;
    return !1;
  }
  if (i.type === "union") {
    for (const o of i.options)
      if (Ct(o, a))
        return !0;
    return !1;
  }
  if (i.type === "tuple") {
    for (const o of i.items)
      if (Ct(o, a))
        return !0;
    return !!(i.rest && Ct(i.rest, a));
  }
  return !1;
}
const L2 = (t, e = {}) => (a) => {
  const i = zp({ ...a, processors: e });
  return rt(t, i), Up(i, t), Fp(i, t);
}, gr = (t, e, a = {}) => (i) => {
  const { libraryOptions: o, target: n } = i ?? {}, r = zp({ ...o ?? {}, target: n, io: e, processors: a });
  return rt(t, r), Up(r, t), Fp(r, t);
}, N2 = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, D2 = (t, e, a, i) => {
  const o = a;
  o.type = "string";
  const { minimum: n, maximum: r, format: s, patterns: c, contentEncoding: d } = t._zod.bag;
  if (typeof n == "number" && (o.minLength = n), typeof r == "number" && (o.maxLength = r), s && (o.format = N2[s] ?? s, o.format === "" && delete o.format, s === "time" && delete o.format), d && (o.contentEncoding = d), c && c.size > 0) {
    const l = [...c];
    l.length === 1 ? o.pattern = l[0].source : l.length > 1 && (o.allOf = [
      ...l.map((u) => ({
        ...e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: u.source
      }))
    ]);
  }
}, B2 = (t, e, a, i) => {
  const o = a, { minimum: n, maximum: r, format: s, multipleOf: c, exclusiveMaximum: d, exclusiveMinimum: l } = t._zod.bag;
  typeof s == "string" && s.includes("int") ? o.type = "integer" : o.type = "number";
  const u = typeof l == "number" && l >= (n ?? Number.NEGATIVE_INFINITY), f = typeof d == "number" && d <= (r ?? Number.POSITIVE_INFINITY), b = e.target === "draft-04" || e.target === "openapi-3.0";
  u ? b ? (o.minimum = l, o.exclusiveMinimum = !0) : o.exclusiveMinimum = l : typeof n == "number" && (o.minimum = n), f ? b ? (o.maximum = d, o.exclusiveMaximum = !0) : o.exclusiveMaximum = d : typeof r == "number" && (o.maximum = r), typeof c == "number" && (o.multipleOf = c);
}, H2 = (t, e, a, i) => {
  a.type = "boolean";
}, J2 = (t, e, a, i) => {
  a.not = {};
}, G2 = (t, e, a, i) => {
}, W2 = (t, e, a, i) => {
  const o = t._zod.def, n = mp(o.entries);
  n.every((r) => typeof r == "number") && (a.type = "number"), n.every((r) => typeof r == "string") && (a.type = "string"), a.enum = n;
}, K2 = (t, e, a, i) => {
  const o = t._zod.def, n = [];
  for (const r of o.values)
    if (r === void 0) {
      if (e.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof r == "bigint") {
      if (e.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      n.push(Number(r));
    } else
      n.push(r);
  if (n.length !== 0) if (n.length === 1) {
    const r = n[0];
    a.type = r === null ? "null" : typeof r, e.target === "draft-04" || e.target === "openapi-3.0" ? a.enum = [r] : a.const = r;
  } else
    n.every((r) => typeof r == "number") && (a.type = "number"), n.every((r) => typeof r == "string") && (a.type = "string"), n.every((r) => typeof r == "boolean") && (a.type = "boolean"), n.every((r) => r === null) && (a.type = "null"), a.enum = n;
}, Y2 = (t, e, a, i) => {
  if (e.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, X2 = (t, e, a, i) => {
  if (e.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, Q2 = (t, e, a, i) => {
  const o = a, n = t._zod.def, { minimum: r, maximum: s } = t._zod.bag;
  typeof r == "number" && (o.minItems = r), typeof s == "number" && (o.maxItems = s), o.type = "array", o.items = rt(n.element, e, {
    ...i,
    path: [...i.path, "items"]
  });
}, e_ = (t, e, a, i) => {
  const o = a, n = t._zod.def;
  o.type = "object", o.properties = {};
  const r = n.shape;
  for (const d in r)
    o.properties[d] = rt(r[d], e, {
      ...i,
      path: [...i.path, "properties", d]
    });
  const s = new Set(Object.keys(r)), c = new Set([...s].filter((d) => {
    const l = n.shape[d]._zod;
    return e.io === "input" ? l.optin === void 0 : l.optout === void 0;
  }));
  c.size > 0 && (o.required = Array.from(c)), n.catchall?._zod.def.type === "never" ? o.additionalProperties = !1 : n.catchall ? n.catchall && (o.additionalProperties = rt(n.catchall, e, {
    ...i,
    path: [...i.path, "additionalProperties"]
  })) : e.io === "output" && (o.additionalProperties = !1);
}, t_ = (t, e, a, i) => {
  const o = t._zod.def, n = o.inclusive === !1, r = o.options.map((s, c) => rt(s, e, {
    ...i,
    path: [...i.path, n ? "oneOf" : "anyOf", c]
  }));
  n ? a.oneOf = r : a.anyOf = r;
}, a_ = (t, e, a, i) => {
  const o = t._zod.def, n = rt(o.left, e, {
    ...i,
    path: [...i.path, "allOf", 0]
  }), r = rt(o.right, e, {
    ...i,
    path: [...i.path, "allOf", 1]
  }), s = (d) => "allOf" in d && Object.keys(d).length === 1, c = [
    ...s(n) ? n.allOf : [n],
    ...s(r) ? r.allOf : [r]
  ];
  a.allOf = c;
}, i_ = (t, e, a, i) => {
  const o = a, n = t._zod.def;
  o.type = "array";
  const r = e.target === "draft-2020-12" ? "prefixItems" : "items", s = e.target === "draft-2020-12" || e.target === "openapi-3.0" ? "items" : "additionalItems", c = n.items.map((f, b) => rt(f, e, {
    ...i,
    path: [...i.path, r, b]
  })), d = n.rest ? rt(n.rest, e, {
    ...i,
    path: [...i.path, s, ...e.target === "openapi-3.0" ? [n.items.length] : []]
  }) : null;
  e.target === "draft-2020-12" ? (o.prefixItems = c, d && (o.items = d)) : e.target === "openapi-3.0" ? (o.items = {
    anyOf: c
  }, d && o.items.anyOf.push(d), o.minItems = c.length, d || (o.maxItems = c.length)) : (o.items = c, d && (o.additionalItems = d));
  const { minimum: l, maximum: u } = t._zod.bag;
  typeof l == "number" && (o.minItems = l), typeof u == "number" && (o.maxItems = u);
}, o_ = (t, e, a, i) => {
  const o = a, n = t._zod.def;
  o.type = "object";
  const r = n.keyType, c = r._zod.bag?.patterns;
  if (n.mode === "loose" && c && c.size > 0) {
    const l = rt(n.valueType, e, {
      ...i,
      path: [...i.path, "patternProperties", "*"]
    });
    o.patternProperties = {};
    for (const u of c)
      o.patternProperties[u.source] = l;
  } else
    (e.target === "draft-07" || e.target === "draft-2020-12") && (o.propertyNames = rt(n.keyType, e, {
      ...i,
      path: [...i.path, "propertyNames"]
    })), o.additionalProperties = rt(n.valueType, e, {
      ...i,
      path: [...i.path, "additionalProperties"]
    });
  const d = r._zod.values;
  if (d) {
    const l = [...d].filter((u) => typeof u == "string" || typeof u == "number");
    l.length > 0 && (o.required = l);
  }
}, n_ = (t, e, a, i) => {
  const o = t._zod.def, n = rt(o.innerType, e, i), r = e.seen.get(t);
  e.target === "openapi-3.0" ? (r.ref = o.innerType, a.nullable = !0) : a.anyOf = [n, { type: "null" }];
}, r_ = (t, e, a, i) => {
  const o = t._zod.def;
  rt(o.innerType, e, i);
  const n = e.seen.get(t);
  n.ref = o.innerType;
}, s_ = (t, e, a, i) => {
  const o = t._zod.def;
  rt(o.innerType, e, i);
  const n = e.seen.get(t);
  n.ref = o.innerType, a.default = JSON.parse(JSON.stringify(o.defaultValue));
}, c_ = (t, e, a, i) => {
  const o = t._zod.def;
  rt(o.innerType, e, i);
  const n = e.seen.get(t);
  n.ref = o.innerType, e.io === "input" && (a._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, d_ = (t, e, a, i) => {
  const o = t._zod.def;
  rt(o.innerType, e, i);
  const n = e.seen.get(t);
  n.ref = o.innerType;
  let r;
  try {
    r = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  a.default = r;
}, l_ = (t, e, a, i) => {
  const o = t._zod.def, n = o.in._zod.traits.has("$ZodTransform"), r = e.io === "input" ? n ? o.out : o.in : o.out;
  rt(r, e, i);
  const s = e.seen.get(t);
  s.ref = r;
}, u_ = (t, e, a, i) => {
  const o = t._zod.def;
  rt(o.innerType, e, i);
  const n = e.seen.get(t);
  n.ref = o.innerType, a.readOnly = !0;
}, qp = (t, e, a, i) => {
  const o = t._zod.def;
  rt(o.innerType, e, i);
  const n = e.seen.get(t);
  n.ref = o.innerType;
}, f_ = /* @__PURE__ */ L("ZodISODateTime", (t, e) => {
  l1.init(t, e), Qe.init(t, e);
});
function p_(t) {
  return /* @__PURE__ */ v2(f_, t);
}
const h_ = /* @__PURE__ */ L("ZodISODate", (t, e) => {
  u1.init(t, e), Qe.init(t, e);
});
function b_(t) {
  return /* @__PURE__ */ g2(h_, t);
}
const m_ = /* @__PURE__ */ L("ZodISOTime", (t, e) => {
  f1.init(t, e), Qe.init(t, e);
});
function v_(t) {
  return /* @__PURE__ */ _2(m_, t);
}
const g_ = /* @__PURE__ */ L("ZodISODuration", (t, e) => {
  p1.init(t, e), Qe.init(t, e);
});
function __(t) {
  return /* @__PURE__ */ y2(g_, t);
}
const y_ = (t, e) => {
  yp.init(t, e), t.name = "ZodError", Object.defineProperties(t, {
    format: {
      value: (a) => ag(t, a)
      // enumerable: false,
    },
    flatten: {
      value: (a) => tg(t, a)
      // enumerable: false,
    },
    addIssue: {
      value: (a) => {
        t.issues.push(a), t.message = JSON.stringify(t.issues, Ws, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (a) => {
        t.issues.push(...a), t.message = JSON.stringify(t.issues, Ws, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return t.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, ra = /* @__PURE__ */ L("ZodError", y_, {
  Parent: Error
}), w_ = /* @__PURE__ */ Lc(ra), k_ = /* @__PURE__ */ Nc(ra), I_ = /* @__PURE__ */ qr(ra), A_ = /* @__PURE__ */ Zr(ra), x_ = /* @__PURE__ */ ng(ra), T_ = /* @__PURE__ */ rg(ra), S_ = /* @__PURE__ */ sg(ra), C_ = /* @__PURE__ */ cg(ra), P_ = /* @__PURE__ */ dg(ra), R_ = /* @__PURE__ */ lg(ra), V_ = /* @__PURE__ */ ug(ra), E_ = /* @__PURE__ */ fg(ra), kl = /* @__PURE__ */ new WeakMap();
function In(t, e, a) {
  const i = Object.getPrototypeOf(t);
  let o = kl.get(i);
  if (o || (o = /* @__PURE__ */ new Set(), kl.set(i, o)), !o.has(e)) {
    o.add(e);
    for (const n in a) {
      const r = a[n];
      Object.defineProperty(i, n, {
        configurable: !0,
        enumerable: !1,
        get() {
          const s = r.bind(this);
          return Object.defineProperty(this, n, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: s
          }), s;
        },
        set(s) {
          Object.defineProperty(this, n, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: s
          });
        }
      });
    }
  }
}
const Je = /* @__PURE__ */ L("ZodType", (t, e) => (De.init(t, e), Object.assign(t["~standard"], {
  jsonSchema: {
    input: gr(t, "input"),
    output: gr(t, "output")
  }
}), t.toJSONSchema = L2(t, {}), t.def = e, t.type = e.type, Object.defineProperty(t, "_def", { value: e }), t.parse = (a, i) => w_(t, a, i, { callee: t.parse }), t.safeParse = (a, i) => I_(t, a, i), t.parseAsync = async (a, i) => k_(t, a, i, { callee: t.parseAsync }), t.safeParseAsync = async (a, i) => A_(t, a, i), t.spa = t.safeParseAsync, t.encode = (a, i) => x_(t, a, i), t.decode = (a, i) => T_(t, a, i), t.encodeAsync = async (a, i) => S_(t, a, i), t.decodeAsync = async (a, i) => C_(t, a, i), t.safeEncode = (a, i) => P_(t, a, i), t.safeDecode = (a, i) => R_(t, a, i), t.safeEncodeAsync = async (a, i) => V_(t, a, i), t.safeDecodeAsync = async (a, i) => E_(t, a, i), In(t, "ZodType", {
  check(...a) {
    const i = this.def;
    return this.clone(mi(i, {
      checks: [
        ...i.checks ?? [],
        ...a.map((o) => typeof o == "function" ? { _zod: { check: o, def: { check: "custom" }, onattach: [] } } : o)
      ]
    }), { parent: !0 });
  },
  with(...a) {
    return this.check(...a);
  },
  clone(a, i) {
    return vi(this, a, i);
  },
  brand() {
    return this;
  },
  register(a, i) {
    return a.add(this, i), this;
  },
  refine(a, i) {
    return this.check(T5(a, i));
  },
  superRefine(a, i) {
    return this.check(S5(a, i));
  },
  overwrite(a) {
    return this.check(/* @__PURE__ */ ko(a));
  },
  optional() {
    return Sl(this);
  },
  exactOptional() {
    return p5(this);
  },
  nullable() {
    return Cl(this);
  },
  nullish() {
    return Sl(Cl(this));
  },
  nonoptional(a) {
    return _5(this, a);
  },
  array() {
    return oe(this);
  },
  or(a) {
    return o5([this, a]);
  },
  and(a) {
    return s5(this, a);
  },
  transform(a) {
    return Pl(this, u5(a));
  },
  default(a) {
    return m5(this, a);
  },
  prefault(a) {
    return g5(this, a);
  },
  catch(a) {
    return w5(this, a);
  },
  pipe(a) {
    return Pl(this, a);
  },
  readonly() {
    return A5(this);
  },
  describe(a) {
    const i = this.clone();
    return Mo.add(i, { description: a }), i;
  },
  meta(...a) {
    if (a.length === 0)
      return Mo.get(this);
    const i = this.clone();
    return Mo.add(i, a[0]), i;
  },
  isOptional() {
    return this.safeParse(void 0).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(a) {
    return a(this);
  }
}), Object.defineProperty(t, "description", {
  get() {
    return Mo.get(t)?.description;
  },
  configurable: !0
}), t)), Zp = /* @__PURE__ */ L("_ZodString", (t, e) => {
  Dc.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (i, o, n) => D2(t, i, o);
  const a = t._zod.bag;
  t.format = a.format ?? null, t.minLength = a.minimum ?? null, t.maxLength = a.maximum ?? null, In(t, "_ZodString", {
    regex(...i) {
      return this.check(/* @__PURE__ */ T2(...i));
    },
    includes(...i) {
      return this.check(/* @__PURE__ */ P2(...i));
    },
    startsWith(...i) {
      return this.check(/* @__PURE__ */ R2(...i));
    },
    endsWith(...i) {
      return this.check(/* @__PURE__ */ V2(...i));
    },
    min(...i) {
      return this.check(/* @__PURE__ */ vr(...i));
    },
    max(...i) {
      return this.check(/* @__PURE__ */ $p(...i));
    },
    length(...i) {
      return this.check(/* @__PURE__ */ jp(...i));
    },
    nonempty(...i) {
      return this.check(/* @__PURE__ */ vr(1, ...i));
    },
    lowercase(i) {
      return this.check(/* @__PURE__ */ S2(i));
    },
    uppercase(i) {
      return this.check(/* @__PURE__ */ C2(i));
    },
    trim() {
      return this.check(/* @__PURE__ */ O2());
    },
    normalize(...i) {
      return this.check(/* @__PURE__ */ E2(...i));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ M2());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ $2());
    },
    slugify() {
      return this.check(/* @__PURE__ */ j2());
    }
  });
}), O_ = /* @__PURE__ */ L("ZodString", (t, e) => {
  Dc.init(t, e), Zp.init(t, e), t.email = (a) => t.check(/* @__PURE__ */ K1(M_, a)), t.url = (a) => t.check(/* @__PURE__ */ t2($_, a)), t.jwt = (a) => t.check(/* @__PURE__ */ m2(K_, a)), t.emoji = (a) => t.check(/* @__PURE__ */ a2(j_, a)), t.guid = (a) => t.check(/* @__PURE__ */ gl(Il, a)), t.uuid = (a) => t.check(/* @__PURE__ */ Y1(zn, a)), t.uuidv4 = (a) => t.check(/* @__PURE__ */ X1(zn, a)), t.uuidv6 = (a) => t.check(/* @__PURE__ */ Q1(zn, a)), t.uuidv7 = (a) => t.check(/* @__PURE__ */ e2(zn, a)), t.nanoid = (a) => t.check(/* @__PURE__ */ i2(z_, a)), t.guid = (a) => t.check(/* @__PURE__ */ gl(Il, a)), t.cuid = (a) => t.check(/* @__PURE__ */ o2(U_, a)), t.cuid2 = (a) => t.check(/* @__PURE__ */ n2(F_, a)), t.ulid = (a) => t.check(/* @__PURE__ */ r2(q_, a)), t.base64 = (a) => t.check(/* @__PURE__ */ p2(J_, a)), t.base64url = (a) => t.check(/* @__PURE__ */ h2(G_, a)), t.xid = (a) => t.check(/* @__PURE__ */ s2(Z_, a)), t.ksuid = (a) => t.check(/* @__PURE__ */ c2(L_, a)), t.ipv4 = (a) => t.check(/* @__PURE__ */ d2(N_, a)), t.ipv6 = (a) => t.check(/* @__PURE__ */ l2(D_, a)), t.cidrv4 = (a) => t.check(/* @__PURE__ */ u2(B_, a)), t.cidrv6 = (a) => t.check(/* @__PURE__ */ f2(H_, a)), t.e164 = (a) => t.check(/* @__PURE__ */ b2(W_, a)), t.datetime = (a) => t.check(p_(a)), t.date = (a) => t.check(b_(a)), t.time = (a) => t.check(v_(a)), t.duration = (a) => t.check(__(a));
});
function E(t) {
  return /* @__PURE__ */ W1(O_, t);
}
const Qe = /* @__PURE__ */ L("ZodStringFormat", (t, e) => {
  He.init(t, e), Zp.init(t, e);
}), M_ = /* @__PURE__ */ L("ZodEmail", (t, e) => {
  t1.init(t, e), Qe.init(t, e);
}), Il = /* @__PURE__ */ L("ZodGUID", (t, e) => {
  Qg.init(t, e), Qe.init(t, e);
}), zn = /* @__PURE__ */ L("ZodUUID", (t, e) => {
  e1.init(t, e), Qe.init(t, e);
}), $_ = /* @__PURE__ */ L("ZodURL", (t, e) => {
  a1.init(t, e), Qe.init(t, e);
}), j_ = /* @__PURE__ */ L("ZodEmoji", (t, e) => {
  i1.init(t, e), Qe.init(t, e);
}), z_ = /* @__PURE__ */ L("ZodNanoID", (t, e) => {
  o1.init(t, e), Qe.init(t, e);
}), U_ = /* @__PURE__ */ L("ZodCUID", (t, e) => {
  n1.init(t, e), Qe.init(t, e);
}), F_ = /* @__PURE__ */ L("ZodCUID2", (t, e) => {
  r1.init(t, e), Qe.init(t, e);
}), q_ = /* @__PURE__ */ L("ZodULID", (t, e) => {
  s1.init(t, e), Qe.init(t, e);
}), Z_ = /* @__PURE__ */ L("ZodXID", (t, e) => {
  c1.init(t, e), Qe.init(t, e);
}), L_ = /* @__PURE__ */ L("ZodKSUID", (t, e) => {
  d1.init(t, e), Qe.init(t, e);
}), N_ = /* @__PURE__ */ L("ZodIPv4", (t, e) => {
  h1.init(t, e), Qe.init(t, e);
}), D_ = /* @__PURE__ */ L("ZodIPv6", (t, e) => {
  b1.init(t, e), Qe.init(t, e);
}), B_ = /* @__PURE__ */ L("ZodCIDRv4", (t, e) => {
  m1.init(t, e), Qe.init(t, e);
}), H_ = /* @__PURE__ */ L("ZodCIDRv6", (t, e) => {
  v1.init(t, e), Qe.init(t, e);
}), J_ = /* @__PURE__ */ L("ZodBase64", (t, e) => {
  g1.init(t, e), Qe.init(t, e);
}), G_ = /* @__PURE__ */ L("ZodBase64URL", (t, e) => {
  y1.init(t, e), Qe.init(t, e);
}), W_ = /* @__PURE__ */ L("ZodE164", (t, e) => {
  w1.init(t, e), Qe.init(t, e);
}), K_ = /* @__PURE__ */ L("ZodJWT", (t, e) => {
  I1.init(t, e), Qe.init(t, e);
}), Lp = /* @__PURE__ */ L("ZodNumber", (t, e) => {
  Rp.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (i, o, n) => B2(t, i, o), In(t, "ZodNumber", {
    gt(i, o) {
      return this.check(/* @__PURE__ */ yl(i, o));
    },
    gte(i, o) {
      return this.check(/* @__PURE__ */ ms(i, o));
    },
    min(i, o) {
      return this.check(/* @__PURE__ */ ms(i, o));
    },
    lt(i, o) {
      return this.check(/* @__PURE__ */ _l(i, o));
    },
    lte(i, o) {
      return this.check(/* @__PURE__ */ bs(i, o));
    },
    max(i, o) {
      return this.check(/* @__PURE__ */ bs(i, o));
    },
    int(i) {
      return this.check(Al(i));
    },
    safe(i) {
      return this.check(Al(i));
    },
    positive(i) {
      return this.check(/* @__PURE__ */ yl(0, i));
    },
    nonnegative(i) {
      return this.check(/* @__PURE__ */ ms(0, i));
    },
    negative(i) {
      return this.check(/* @__PURE__ */ _l(0, i));
    },
    nonpositive(i) {
      return this.check(/* @__PURE__ */ bs(0, i));
    },
    multipleOf(i, o) {
      return this.check(/* @__PURE__ */ wl(i, o));
    },
    step(i, o) {
      return this.check(/* @__PURE__ */ wl(i, o));
    },
    finite() {
      return this;
    }
  });
  const a = t._zod.bag;
  t.minValue = Math.max(a.minimum ?? Number.NEGATIVE_INFINITY, a.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, t.maxValue = Math.min(a.maximum ?? Number.POSITIVE_INFINITY, a.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, t.isInt = (a.format ?? "").includes("int") || Number.isSafeInteger(a.multipleOf ?? 0.5), t.isFinite = !0, t.format = a.format ?? null;
});
function X(t) {
  return /* @__PURE__ */ w2(Lp, t);
}
const Y_ = /* @__PURE__ */ L("ZodNumberFormat", (t, e) => {
  A1.init(t, e), Lp.init(t, e);
});
function Al(t) {
  return /* @__PURE__ */ k2(Y_, t);
}
const X_ = /* @__PURE__ */ L("ZodBoolean", (t, e) => {
  x1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => H2(t, a, i);
});
function At(t) {
  return /* @__PURE__ */ I2(X_, t);
}
const Q_ = /* @__PURE__ */ L("ZodUnknown", (t, e) => {
  T1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => G2();
});
function xl() {
  return /* @__PURE__ */ A2(Q_);
}
const e5 = /* @__PURE__ */ L("ZodNever", (t, e) => {
  S1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => J2(t, a, i);
});
function t5(t) {
  return /* @__PURE__ */ x2(e5, t);
}
const a5 = /* @__PURE__ */ L("ZodArray", (t, e) => {
  C1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => Q2(t, a, i, o), t.element = e.element, In(t, "ZodArray", {
    min(a, i) {
      return this.check(/* @__PURE__ */ vr(a, i));
    },
    nonempty(a) {
      return this.check(/* @__PURE__ */ vr(1, a));
    },
    max(a, i) {
      return this.check(/* @__PURE__ */ $p(a, i));
    },
    length(a, i) {
      return this.check(/* @__PURE__ */ jp(a, i));
    },
    unwrap() {
      return this.element;
    }
  });
});
function oe(t, e) {
  return /* @__PURE__ */ z2(a5, t, e);
}
const i5 = /* @__PURE__ */ L("ZodObject", (t, e) => {
  R1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => e_(t, a, i, o), je(t, "shape", () => e.shape), In(t, "ZodObject", {
    keyof() {
      return Ie(Object.keys(this._zod.def.shape));
    },
    catchall(a) {
      return this.clone({ ...this._zod.def, catchall: a });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: xl() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: xl() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: t5() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: void 0 });
    },
    extend(a) {
      return Wv(this, a);
    },
    safeExtend(a) {
      return Kv(this, a);
    },
    merge(a) {
      return Yv(this, a);
    },
    pick(a) {
      return Jv(this, a);
    },
    omit(a) {
      return Gv(this, a);
    },
    partial(...a) {
      return Xv(Dp, this, a[0]);
    },
    required(...a) {
      return Qv(Bp, this, a[0]);
    }
  });
});
function W(t, e) {
  const a = {
    type: "object",
    shape: t ?? {},
    ...le(e)
  };
  return new i5(a);
}
const Np = /* @__PURE__ */ L("ZodUnion", (t, e) => {
  Op.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => t_(t, a, i, o), t.options = e.options;
});
function o5(t, e) {
  return new Np({
    type: "union",
    options: t,
    ...le(e)
  });
}
const n5 = /* @__PURE__ */ L("ZodDiscriminatedUnion", (t, e) => {
  Np.init(t, e), V1.init(t, e);
});
function Nr(t, e, a) {
  return new n5({
    type: "union",
    options: e,
    discriminator: t,
    ...le(a)
  });
}
const r5 = /* @__PURE__ */ L("ZodIntersection", (t, e) => {
  E1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => a_(t, a, i, o);
});
function s5(t, e) {
  return new r5({
    type: "intersection",
    left: t,
    right: e
  });
}
const c5 = /* @__PURE__ */ L("ZodTuple", (t, e) => {
  O1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => i_(t, a, i, o), t.rest = (a) => t.clone({
    ...t._zod.def,
    rest: a
  });
});
function fi(t, e, a) {
  const i = e instanceof De, o = i ? a : e, n = i ? e : null;
  return new c5({
    type: "tuple",
    items: t,
    rest: n,
    ...le(o)
  });
}
const Tl = /* @__PURE__ */ L("ZodRecord", (t, e) => {
  M1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => o_(t, a, i, o), t.keyType = e.keyType, t.valueType = e.valueType;
});
function gi(t, e, a) {
  return !e || !e._zod ? new Tl({
    type: "record",
    keyType: E(),
    valueType: t,
    ...le(e)
  }) : new Tl({
    type: "record",
    keyType: t,
    valueType: e,
    ...le(a)
  });
}
const Ys = /* @__PURE__ */ L("ZodEnum", (t, e) => {
  $1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (i, o, n) => W2(t, i, o), t.enum = e.entries, t.options = Object.values(e.entries);
  const a = new Set(Object.keys(e.entries));
  t.extract = (i, o) => {
    const n = {};
    for (const r of i)
      if (a.has(r))
        n[r] = e.entries[r];
      else
        throw new Error(`Key ${r} not found in enum`);
    return new Ys({
      ...e,
      checks: [],
      ...le(o),
      entries: n
    });
  }, t.exclude = (i, o) => {
    const n = { ...e.entries };
    for (const r of i)
      if (a.has(r))
        delete n[r];
      else
        throw new Error(`Key ${r} not found in enum`);
    return new Ys({
      ...e,
      checks: [],
      ...le(o),
      entries: n
    });
  };
});
function Ie(t, e) {
  const a = Array.isArray(t) ? Object.fromEntries(t.map((i) => [i, i])) : t;
  return new Ys({
    type: "enum",
    entries: a,
    ...le(e)
  });
}
const d5 = /* @__PURE__ */ L("ZodLiteral", (t, e) => {
  j1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => K2(t, a, i), t.values = new Set(e.values), Object.defineProperty(t, "value", {
    get() {
      if (e.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return e.values[0];
    }
  });
});
function pe(t, e) {
  return new d5({
    type: "literal",
    values: Array.isArray(t) ? t : [t],
    ...le(e)
  });
}
const l5 = /* @__PURE__ */ L("ZodTransform", (t, e) => {
  z1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => X2(t, a), t._zod.parse = (a, i) => {
    if (i.direction === "backward")
      throw new bp(t.constructor.name);
    a.addIssue = (n) => {
      if (typeof n == "string")
        a.issues.push(hn(n, a.value, e));
      else {
        const r = n;
        r.fatal && (r.continue = !1), r.code ?? (r.code = "custom"), r.input ?? (r.input = a.value), r.inst ?? (r.inst = t), a.issues.push(hn(r));
      }
    };
    const o = e.transform(a.value, a);
    return o instanceof Promise ? o.then((n) => (a.value = n, a.fallback = !0, a)) : (a.value = o, a.fallback = !0, a);
  };
});
function u5(t) {
  return new l5({
    type: "transform",
    transform: t
  });
}
const Dp = /* @__PURE__ */ L("ZodOptional", (t, e) => {
  Mp.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => qp(t, a, i, o), t.unwrap = () => t._zod.def.innerType;
});
function Sl(t) {
  return new Dp({
    type: "optional",
    innerType: t
  });
}
const f5 = /* @__PURE__ */ L("ZodExactOptional", (t, e) => {
  U1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => qp(t, a, i, o), t.unwrap = () => t._zod.def.innerType;
});
function p5(t) {
  return new f5({
    type: "optional",
    innerType: t
  });
}
const h5 = /* @__PURE__ */ L("ZodNullable", (t, e) => {
  F1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => n_(t, a, i, o), t.unwrap = () => t._zod.def.innerType;
});
function Cl(t) {
  return new h5({
    type: "nullable",
    innerType: t
  });
}
const b5 = /* @__PURE__ */ L("ZodDefault", (t, e) => {
  q1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => s_(t, a, i, o), t.unwrap = () => t._zod.def.innerType, t.removeDefault = t.unwrap;
});
function m5(t, e) {
  return new b5({
    type: "default",
    innerType: t,
    get defaultValue() {
      return typeof e == "function" ? e() : gp(e);
    }
  });
}
const v5 = /* @__PURE__ */ L("ZodPrefault", (t, e) => {
  Z1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => c_(t, a, i, o), t.unwrap = () => t._zod.def.innerType;
});
function g5(t, e) {
  return new v5({
    type: "prefault",
    innerType: t,
    get defaultValue() {
      return typeof e == "function" ? e() : gp(e);
    }
  });
}
const Bp = /* @__PURE__ */ L("ZodNonOptional", (t, e) => {
  L1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => r_(t, a, i, o), t.unwrap = () => t._zod.def.innerType;
});
function _5(t, e) {
  return new Bp({
    type: "nonoptional",
    innerType: t,
    ...le(e)
  });
}
const y5 = /* @__PURE__ */ L("ZodCatch", (t, e) => {
  N1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => d_(t, a, i, o), t.unwrap = () => t._zod.def.innerType, t.removeCatch = t.unwrap;
});
function w5(t, e) {
  return new y5({
    type: "catch",
    innerType: t,
    catchValue: typeof e == "function" ? e : () => e
  });
}
const k5 = /* @__PURE__ */ L("ZodPipe", (t, e) => {
  D1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => l_(t, a, i, o), t.in = e.in, t.out = e.out;
});
function Pl(t, e) {
  return new k5({
    type: "pipe",
    in: t,
    out: e
    // ...util.normalizeParams(params),
  });
}
const I5 = /* @__PURE__ */ L("ZodReadonly", (t, e) => {
  B1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => u_(t, a, i, o), t.unwrap = () => t._zod.def.innerType;
});
function A5(t) {
  return new I5({
    type: "readonly",
    innerType: t
  });
}
const Hp = /* @__PURE__ */ L("ZodCustom", (t, e) => {
  H1.init(t, e), Je.init(t, e), t._zod.processJSONSchema = (a, i, o) => Y2(t, a);
});
function x5(t, e) {
  return /* @__PURE__ */ U2(Hp, t ?? (() => !0), e);
}
function T5(t, e = {}) {
  return /* @__PURE__ */ F2(Hp, t, e);
}
function S5(t, e) {
  return /* @__PURE__ */ q2(t, e);
}
const Jp = {
  custom: "custom"
}, C5 = [
  "minimal",
  "canonicalCore",
  "canonicalExpanded",
  "mechanicsOptIn",
  "identityOptIn",
  "auOptIn",
  "neverRuntime"
], P5 = W({
  id: E().min(1),
  file: E().min(1),
  defaultEnabled: At(),
  entryCount: X().int().nonnegative(),
  enabledEntryCount: X().int().nonnegative(),
  contentCharacters: X().int().nonnegative(),
  constantCharacters: X().int().nonnegative(),
  sha256: E().regex(/^[a-f0-9]{64}$/u)
}).strict(), R5 = W({
  schemaVersion: pe(1),
  id: pe("albina-layered-worldbooks-v1"),
  presets: gi(E(), oe(E().min(1))),
  l0: W({ id: E(), file: E(), entryCount: X(), sha256: E() }).passthrough(),
  packages: oe(P5)
}).passthrough(), vo = R5.parse(qv), Bc = Ie(C5), Rl = {
  minimal: "Embedded L0 fallback",
  canonicalCore: "Canon core",
  canonicalExpanded: "Canon expanded",
  mechanicsOptIn: "Mechanics add-on",
  identityOptIn: "Identity add-on",
  auOptIn: "AU / IF add-on",
  neverRuntime: "Never import"
}, V5 = "canonicalCore";
function E5(t) {
  const e = t.replaceAll("\\", "/").split("/").at(-1);
  if (!e || e === "." || e === "..") throw new Error(`Invalid worldbook package filename: ${t}`);
  return e;
}
function An(t) {
  return vo.packages.some((e) => e.id === t) && !vo.presets.neverRuntime?.includes(t);
}
function Gp(t) {
  const e = new Map(vo.packages.map((a) => [a.id, a]));
  return (vo.presets[t] ?? []).map((a) => e.get(a)).filter((a) => a !== void 0);
}
function O5(t) {
  return Gp(t).filter((e) => An(e.id)).map((e) => e.id);
}
const Hc = W({
  presetId: Bc,
  packageIds: oe(E().min(1).refine(An, "Worldbook package is not runtime-installable."))
}).strict().superRefine((t, e) => {
  t.presetId === "neverRuntime" && e.addIssue({ code: Jp.custom, path: ["presetId"], message: "The neverRuntime preset cannot be persisted as an active selection." });
}).transform((t) => Gc(t.presetId, t.packageIds));
function Jc(t) {
  return { presetId: t, packageIds: O5(t) };
}
function Gc(t, e) {
  const a = e === void 0 ? Jc(t).packageIds : [...new Set(e)].filter(An);
  return { presetId: t, packageIds: a };
}
function Wp() {
  return Jc(V5);
}
function M5(t = import.meta.url) {
  const e = (i) => ({
    ...i,
    downloadUrl: new URL(`../worldbooks/${E5(i.file)}`, t).href,
    installable: An(i.id)
  }), a = Object.keys(Rl).map((i) => {
    const o = i, n = Gp(o).map(e);
    return { id: o, label: Rl[i] ?? i, packages: n, installable: n.length > 0 && n.every((r) => r.installable) };
  });
  return {
    l0: { id: vo.l0.id, entryCount: vo.l0.entryCount, note: "The 16 L0 anchors are embedded in the card. Use L0 alone, or import a layered preset; do not combine them." },
    presets: a,
    installInstructions: [
      "Select a preset and download every listed JSON package.",
      "In SillyTavern, import the downloaded worldbooks through its normal worldbook UI, then enable only the selected package set.",
      "Do not import audit/index packages. The optional LorebookToolCall workbench is not required for this flow."
    ]
  };
}
const $5 = { class: "gameplay-panel__header" }, j5 = {
  key: 0,
  class: "gameplay-panel__error",
  role: "alert",
  "aria-live": "assertive"
}, z5 = ["data-active-tab"], U5 = ["id", "aria-selected", "aria-controls", "tabindex", "data-testid", "onClick", "onKeydown"], F5 = { class: "gameplay-panel__content" }, q5 = {
  id: "gameplay-page-status",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-status",
  "data-testid": "gameplay-page-status"
}, Z5 = { class: "gameplay-stat-grid" }, L5 = ["data-stat-key"], N5 = { key: 0 }, D5 = { key: 1 }, B5 = { class: "gameplay-vector-list" }, H5 = ["value", "min", "max"], J5 = { class: "gameplay-split-grid" }, G5 = { class: "gameplay-definition-list" }, W5 = { class: "gameplay-definition-list" }, K5 = {
  id: "gameplay-page-objectives",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-objectives",
  "data-testid": "gameplay-page-objectives"
}, Y5 = {
  class: "gameplay-objective-summary",
  "data-objective-summary": ""
}, X5 = { class: "gameplay-split-grid" }, Q5 = { class: "gameplay-entry-list" }, e6 = ["data-quest-id", "data-objective-state", "data-quest-state"], t6 = ["aria-label"], a6 = {
  key: 0,
  class: "gameplay-empty"
}, i6 = { class: "gameplay-entry-list" }, o6 = ["data-battle-id", "data-objective-state", "data-battle-state"], n6 = ["aria-label"], r6 = {
  key: 0,
  class: "gameplay-empty"
}, s6 = {
  id: "gameplay-page-challenges",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-challenges",
  "data-testid": "gameplay-page-challenges"
}, c6 = { class: "gameplay-entry-list gameplay-minigame-list" }, d6 = ["data-minigame-id", "data-minigame-outcome"], l6 = { class: "gameplay-state-badge" }, u6 = { key: 0 }, f6 = { key: 1 }, p6 = { key: 2 }, h6 = {
  key: 0,
  class: "gameplay-empty"
}, b6 = {
  id: "gameplay-page-loadout",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-loadout",
  "data-testid": "gameplay-page-loadout"
}, m6 = { class: "gameplay-entry-grid" }, v6 = ["data-item-id"], g6 = {
  key: 0,
  class: "gameplay-empty"
}, _6 = { class: "gameplay-split-grid gameplay-loadout-grid" }, y6 = { class: "gameplay-entry-list" }, w6 = ["data-equipment-id"], k6 = ["disabled", "onClick"], I6 = { class: "gameplay-entry-list" }, A6 = ["data-outfit-id"], x6 = ["disabled", "onClick"], T6 = {
  id: "gameplay-page-progression",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-progression",
  "data-testid": "gameplay-page-progression"
}, S6 = ["data-professions-total", "data-professions-advanced", "data-profession-levels", "data-achievements-unlocked", "data-achievements-total"], C6 = { class: "gameplay-split-grid" }, P6 = { class: "gameplay-entry-list" }, R6 = ["data-profession-id"], V6 = ["value", "max", "data-xp-level"], E6 = ["disabled", "onClick"], O6 = { class: "gameplay-entry-list" }, M6 = ["data-achievement-id"], $6 = {
  id: "gameplay-page-codex",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-codex",
  "data-testid": "gameplay-page-codex"
}, j6 = ["data-codex-total", "data-codex-active", "data-codex-seen", "data-codex-locked", "data-codex-discovered"], z6 = { class: "gameplay-entry-list gameplay-codex-list" }, U6 = ["data-worldbook-id"], F6 = { key: 0 }, q6 = { key: 1 }, Z6 = { key: 2 }, L6 = {
  id: "gameplay-page-worldbook-packages",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-worldbook-packages",
  "data-testid": "worldbook-packages-page"
}, N6 = { class: "gameplay-worldbook-note" }, D6 = { class: "gameplay-worldbook-steps" }, B6 = {
  class: "gameplay-worldbook-presets",
  role: "radiogroup",
  "aria-label": "Worldbook package presets"
}, H6 = ["data-worldbook-preset"], J6 = { key: 0 }, G6 = { key: 1 }, W6 = { key: 2 }, K6 = ["aria-checked", "onClick"], Y6 = { class: "gameplay-entry-list gameplay-worldbook-downloads" }, X6 = ["data-worldbook-package"], Q6 = ["href", "download"], e3 = { key: 1 }, t3 = /* @__PURE__ */ _n({
  __name: "GameplayPanel",
  props: {
    gameplay: {},
    save: {},
    effectiveValues: {},
    interactionError: {},
    reducedMotion: { type: Boolean }
  },
  emits: ["close", "equip", "wearOutfit", "selectProfession", "selectWorldbookPreset"],
  setup(t, { emit: e }) {
    const a = t, i = e, o = [
      { id: "worldbook-packages", label: "世界书包" },
      { id: "status", label: "状态" },
      { id: "objectives", label: "任务与冲突" },
      { id: "challenges", label: "叙事挑战" },
      { id: "loadout", label: "背包与装配" },
      { id: "progression", label: "职业与成就" },
      { id: "codex", label: "资料库" }
    ], n = /* @__PURE__ */ ne(), r = /* @__PURE__ */ ne(), s = /* @__PURE__ */ ne();
    let c, d, l;
    const u = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ ne("status");
    function b(C, O) {
      const m = r.value, ee = s.value;
      if (!m || !ee) return;
      const ie = m.querySelector(`#gameplay-tab-${C}`);
      if (!ie) return;
      const { offsetLeft: H, offsetWidth: Y } = ie;
      if (l?.kill(), !O || a.reducedMotion) {
        xe.set(ee, { left: H, width: Y });
        return;
      }
      l = xe.to(ee, { left: H, width: Y, duration: 0.3, ease: "power2.inOut" });
    }
    const y = M5(), v = ve(() => a.save.worldbook.presetId), g = ve(() => new Set(a.save.worldbook.packageIds)), k = [
      { key: "affectionAlbina", label: "好感" },
      { key: "trust", label: "信任" },
      { key: "danger", label: "危险" },
      { key: "artResonance", label: "共鸣" }
    ], I = [
      { key: "composure", label: "镇定" },
      { key: "materials", label: "材料" },
      { key: "leverage", label: "筹码" },
      { key: "exposure", label: "暴露" }
    ], S = [
      { key: "blade", label: "刃术" },
      { key: "boundary", label: "边界" },
      { key: "analysis", label: "解析" },
      { key: "resonance", label: "共振" }
    ], T = {
      affectionAlbina: "好感",
      trust: "信任",
      danger: "危险",
      artResonance: "共鸣",
      composure: "镇定",
      materials: "材料",
      leverage: "筹码",
      exposure: "暴露"
    }, x = (C) => C === void 0 || C === a.save.route, D = ve(() => a.gameplay.quests.filter((C) => x(C.route))), V = ve(() => a.gameplay.battles.filter((C) => x(C.route))), P = ve(() => ({
      questsDone: D.value.filter((C) => ke(C.id) === "completed").length,
      questsTotal: D.value.length,
      victories: V.value.filter((C) => $e(C.id) === "victory").length,
      battlesTotal: V.value.length,
      challengesDone: R.value.filter((C) => ct(C.id) !== "pending").length,
      challengesTotal: R.value.length
    })), R = ve(() => a.gameplay.minigames.filter((C) => x(C.route))), j = ve(() => a.gameplay.items.filter((C) => x(C.route) && a.save.inventory.ownedIds.includes(C.id))), Q = ve(() => a.gameplay.equipment.filter((C) => x(C.route))), B = ve(() => a.gameplay.outfits.filter((C) => x(C.route))), re = ve(() => a.gameplay.professions.filter((C) => x(C.route))), de = ve(() => a.gameplay.achievements.filter((C) => x(C.route))), se = ve(() => {
      const C = new Set(a.save.achievements.unlockedIds);
      return {
        activeProfessionLabel: re.value.find((O) => O.id === a.save.professions.activeId)?.label ?? "未选择",
        professionsTotal: re.value.length,
        professionsAdvanced: re.value.filter((O) => z(O.id).level > 1).length,
        professionLevels: re.value.reduce((O, m) => O + z(m.id).level, 0),
        achievementsUnlocked: de.value.filter((O) => C.has(O.id)).length,
        achievementsTotal: de.value.length
      };
    });
    yn(() => {
      const C = n.value;
      if (!C || (C.focus(), Ne(() => b(f.value, !1)), a.reducedMotion)) return;
      const O = C.closest(".gameplay-panel-backdrop") ?? C;
      c = xe.context(() => {
        xe.timeline({ defaults: { ease: "power3.out" } }).fromTo(O, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }).fromTo(C, { y: 28, scale: 0.975, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.5 }, 0).fromTo(".gameplay-panel__header, .gameplay-tabs", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.07 }, 0.18);
      }, C);
    });
    function te(C, O) {
      const m = n.value;
      if (!m || !O) return;
      const ee = m.querySelector(`[data-stat-key="${C}"]`);
      ee && (ee.dataset.statChanged = "true", !a.reducedMotion && (u.forEach((ie) => ie.kill()), u.clear(), u.add(xe.fromTo(ee, { scale: 1, filter: "brightness(1)" }, {
        scale: 1.1,
        filter: "brightness(1.45)",
        duration: 0.3,
        ease: "power2.out",
        yoyo: !0,
        repeat: 1,
        onComplete: () => {
          ee.dataset.statChanged = "false";
        }
      }))));
    }
    let Z = { ...a.effectiveValues };
    ut(() => a.effectiveValues, async (C) => {
      const O = Z;
      Z = { ...C }, await Ne();
      for (const m of k)
        te(m.key, C[m.key] !== O[m.key]);
    }, { deep: !0 }), ut(() => a.reducedMotion, (C) => {
      C && (u.forEach((O) => O.kill()), u.clear(), n.value?.querySelectorAll("[data-stat-key]").forEach((O) => {
        O.dataset.statChanged = "false";
      }));
    }), wo(() => {
      d?.kill(), l?.kill(), u.forEach((C) => C.kill()), u.clear(), c?.revert();
    });
    function K(C) {
      f.value = C, Ne(() => {
        if (b(C, !0), !n.value || a.reducedMotion) return;
        d?.kill();
        const O = n.value.querySelector(`#gameplay-page-${C}`), m = n.value.querySelector(`#gameplay-tab-${C}`);
        d = xe.timeline({ defaults: { ease: "power3.out" } }).fromTo(m, { y: -2, filter: "brightness(.88)" }, { y: 0, filter: "brightness(1.15)", duration: 0.24 }).fromTo(O?.children ?? [], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.34, stagger: 0.045 }, 0);
      });
    }
    function ue(C, O) {
      let m = O;
      if (C.key === "ArrowRight") m = (O + 1) % o.length;
      else if (C.key === "ArrowLeft") m = (O - 1 + o.length) % o.length;
      else if (C.key === "Home") m = 0;
      else if (C.key === "End") m = o.length - 1;
      else return;
      C.preventDefault();
      const ee = o[m];
      ee && (K(ee.id), requestAnimationFrame(() => document.getElementById(`gameplay-tab-${ee.id}`)?.focus()));
    }
    function Te(C) {
      const O = Array.from(n.value?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []).filter((ie) => ie.tabIndex >= 0 && ie.getClientRects().length > 0), m = O[0], ee = O.at(-1);
      if (!m || !ee) {
        C.preventDefault();
        return;
      }
      C.shiftKey && document.activeElement === m ? (C.preventDefault(), ee.focus()) : !C.shiftKey && document.activeElement === ee && (C.preventDefault(), m.focus());
    }
    function Se(C) {
      return `${C > 0 ? "+" : ""}${C}`;
    }
    function Ae(C) {
      return a.effectiveValues[C] - a.save.values[C];
    }
    function Me(C) {
      return Object.entries(C).filter((m) => typeof m[1] == "number").map(([m, ee]) => `${T[m] ?? m} ${Se(ee)}`).join(" / ") || "无数值修正";
    }
    function ke(C) {
      return a.save.quests.completedNodeIds.includes(C) ? "completed" : a.save.quests.activeNodeIds.includes(C) ? "active" : "locked";
    }
    function st(C) {
      return { active: "进行中", completed: "已完成", locked: "未开始" }[ke(C)];
    }
    function $e(C) {
      return a.save.battles.outcomes[C] ?? "pending";
    }
    function Tt(C) {
      return { victory: "胜利", setback: "受挫", pending: "未解决" }[$e(C)];
    }
    function ct(C) {
      const O = a.save.minigames.records[C];
      return !O?.resolved || !O.lastOutcome ? "pending" : O.lastOutcome === "perfect" ? "completed" : O.lastOutcome;
    }
    function wt(C) {
      return { completed: "完美介入", assisted: "辅助完成", setback: "介入受挫", skipped: "已跳过", pending: "未触发" }[ct(C)];
    }
    function dt(C) {
      return a.save.minigames.records[C];
    }
    function Qt(C) {
      const O = [...a.save.logs.story].reverse().find((m) => m.kind === "minigame" && m.minigameId === C);
      return typeof O?.sceneId == "string" ? O.sceneId : void 0;
    }
    function _(C) {
      return a.save.inventory.ownedIds.includes(C);
    }
    function A(C) {
      return Object.values(a.save.inventory.equipped).includes(C);
    }
    function z(C) {
      return a.save.professions.progress[C] ?? { xp: 0, level: 1 };
    }
    function G(C) {
      const O = a.gameplay.professions.find((ee) => ee.id === C), m = z(C);
      return O?.xpThresholds[m.level];
    }
    function N(C) {
      return a.save.worldbook.activeEntryIds.includes(C) ? "active" : a.save.worldbook.seenEntryIds.includes(C) ? "seen" : "locked";
    }
    function J(C) {
      return { active: "当前激活", seen: "已阅", locked: "未阅" }[N(C)];
    }
    const ae = ve(() => {
      const C = a.gameplay.worldbookEntries, O = C.map((m) => N(m.id));
      return {
        total: C.length,
        active: O.filter((m) => m === "active").length,
        seen: O.filter((m) => m === "seen").length,
        locked: O.filter((m) => m === "locked").length
      };
    });
    return (C, O) => (U(), F("div", {
      class: "gameplay-panel-backdrop",
      onClick: O[2] || (O[2] = Xa((m) => i("close"), ["self"]))
    }, [
      p("section", {
        ref_key: "panel",
        ref: n,
        class: "gameplay-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gameplay-panel-title",
        tabindex: "-1",
        "data-testid": "gameplay-panel",
        onKeydown: [
          O[1] || (O[1] = Md(Xa((m) => i("close"), ["stop"]), ["esc"])),
          Md(Te, ["tab"])
        ]
      }, [
        p("header", $5, [
          O[3] || (O[3] = p("div", null, [
            p("p", null, "ALBINA ARCHIVE"),
            p("h2", { id: "gameplay-panel-title" }, "状态档案")
          ], -1)),
          p("button", {
            type: "button",
            "aria-label": "关闭状态档案",
            title: "关闭",
            onClick: O[0] || (O[0] = (m) => i("close"))
          }, "关闭")
        ]),
        t.interactionError ? (U(), F("p", j5, $(t.interactionError), 1)) : ge("", !0),
        p("nav", {
          ref_key: "tabsNav",
          ref: r,
          class: "gameplay-tabs",
          role: "tablist",
          "aria-label": "状态档案分页",
          "data-active-tab": f.value
        }, [
          (U(), F(me, null, Ee(o, (m, ee) => p("button", {
            id: `gameplay-tab-${m.id}`,
            key: m.id,
            type: "button",
            role: "tab",
            "aria-selected": f.value === m.id,
            "aria-controls": `gameplay-page-${m.id}`,
            tabindex: f.value === m.id ? 0 : -1,
            "data-testid": `gameplay-tab-${m.id}`,
            onClick: (ie) => K(m.id),
            onKeydown: (ie) => ue(ie, ee)
          }, $(m.label), 41, U5)), 64)),
          p("span", {
            ref_key: "tabIndicator",
            ref: s,
            class: "gameplay-tabs__indicator",
            "aria-hidden": "true"
          }, null, 512)
        ], 8, z5),
        p("div", F5, [
          at(p("section", q5, [
            O[6] || (O[6] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "权威数值")
            ], -1)),
            p("div", Z5, [
              (U(), F(me, null, Ee(k, (m) => p("article", {
                key: m.key
              }, [
                p("span", null, $(m.label), 1),
                p("strong", {
                  "data-stat-key": m.key
                }, $(t.effectiveValues[m.key]), 9, L5),
                Ae(m.key) ? (U(), F("small", N5, "基础 " + $(t.save.values[m.key]) + " · 修正 " + $(Se(Ae(m.key))), 1)) : (U(), F("small", D5, "基础值"))
              ])), 64))
            ]),
            O[7] || (O[7] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "关系向量")
            ], -1)),
            p("div", B5, [
              (U(!0), F(me, null, Ee(t.gameplay.relationshipTracks, (m) => (U(), F("label", {
                key: m.id
              }, [
                p("span", null, $(m.label), 1),
                p("progress", {
                  value: t.save.values.relationshipVectors[m.id],
                  min: m.minimum,
                  max: m.maximum
                }, null, 8, H5),
                p("strong", null, $(t.save.values.relationshipVectors[m.id]), 1)
              ]))), 128))
            ]),
            p("div", J5, [
              p("section", null, [
                O[4] || (O[4] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "路线资源")
                ], -1)),
                p("dl", G5, [
                  (U(), F(me, null, Ee(I, (m) => (U(), F(me, {
                    key: m.key
                  }, [
                    p("dt", null, $(m.label), 1),
                    p("dd", null, $(t.save.values.routeEconomy[m.key]), 1)
                  ], 64))), 64))
                ])
              ]),
              p("section", null, [
                O[5] || (O[5] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "冲突专精")
                ], -1)),
                p("dl", W5, [
                  (U(), F(me, null, Ee(S, (m) => (U(), F(me, {
                    key: m.key
                  }, [
                    p("dt", null, $(m.label), 1),
                    p("dd", null, $(t.save.values.conflictMastery[m.key]), 1)
                  ], 64))), 64))
                ])
              ])
            ])
          ], 512), [
            [Ga, f.value === "status"]
          ]),
          at(p("section", K5, [
            p("div", Y5, [
              p("span", null, "任务 " + $(P.value.questsDone) + " / " + $(P.value.questsTotal), 1),
              p("span", null, "冲突胜利 " + $(P.value.victories) + " / " + $(P.value.battlesTotal), 1),
              p("span", null, "挑战完成 " + $(P.value.challengesDone) + " / " + $(P.value.challengesTotal), 1)
            ]),
            p("div", X5, [
              p("section", null, [
                O[8] || (O[8] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "路线任务")
                ], -1)),
                p("div", Q5, [
                  (U(!0), F(me, null, Ee(D.value, (m) => (U(), F("article", {
                    key: m.id,
                    class: we(ke(m.id)),
                    "data-quest-id": m.id,
                    "data-objective-kind": "quest",
                    "data-objective-state": ke(m.id),
                    "data-quest-state": ke(m.id)
                  }, [
                    p("header", null, [
                      p("strong", null, $(m.label), 1),
                      p("span", {
                        class: "gameplay-state-badge",
                        "aria-label": `任务状态：${st(m.id)}`
                      }, $(st(m.id)), 9, t6)
                    ]),
                    p("p", null, $(m.description), 1)
                  ], 10, e6))), 128)),
                  D.value.length === 0 ? (U(), F("p", a6, "当前尚未进入路线任务。")) : ge("", !0)
                ])
              ]),
              p("section", null, [
                O[9] || (O[9] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "冲突记录")
                ], -1)),
                p("div", i6, [
                  (U(!0), F(me, null, Ee(V.value, (m) => (U(), F("article", {
                    key: m.id,
                    class: we($e(m.id)),
                    "data-battle-id": m.id,
                    "data-objective-kind": "battle",
                    "data-objective-state": $e(m.id),
                    "data-battle-state": $e(m.id)
                  }, [
                    p("header", null, [
                      p("strong", null, $(m.label), 1),
                      p("span", {
                        class: "gameplay-state-badge",
                        "aria-label": `冲突状态：${Tt(m.id)}`
                      }, $(Tt(m.id)), 9, n6)
                    ]),
                    p("p", null, $(m.description), 1),
                    p("small", null, "推荐专精：" + $(S.find((ee) => ee.key === m.recommendedMastery)?.label), 1)
                  ], 10, o6))), 128)),
                  V.value.length === 0 ? (U(), F("p", r6, "当前尚无路线冲突。")) : ge("", !0)
                ])
              ])
            ])
          ], 512), [
            [Ga, f.value === "objectives"]
          ]),
          at(p("section", s6, [
            O[10] || (O[10] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "叙事挑战记录"),
              p("p", null, "完成、辅助、受挫和跳过均会写入当前 SaveV2。")
            ], -1)),
            p("div", c6, [
              (U(!0), F(me, null, Ee(R.value, (m) => (U(), F("article", {
                key: m.id,
                class: we(ct(m.id)),
                "data-minigame-id": m.id,
                "data-minigame-outcome": dt(m.id)?.lastOutcome ?? "pending"
              }, [
                p("header", null, [
                  p("strong", null, $(m.label), 1),
                  p("span", l6, $(wt(m.id)), 1)
                ]),
                p("p", null, $(m.description), 1),
                dt(m.id) ? (U(), F("small", u6, "尝试 " + $(dt(m.id)?.attempts) + " 次 · 最佳 " + $(dt(m.id)?.bestScore) + " 分 · " + $(dt(m.id)?.assisted ? "已使用辅助" : "未使用辅助"), 1)) : ge("", !0),
                Qt(m.id) ? (U(), F("small", f6, "剧情来源：" + $(Qt(m.id)), 1)) : ge("", !0),
                dt(m.id) ? ge("", !0) : (U(), F("small", p6, "尚未在当前存档中进入对应剧情场景。"))
              ], 10, d6))), 128)),
              R.value.length === 0 ? (U(), F("p", h6, "当前路线尚未配置叙事挑战。")) : ge("", !0)
            ])
          ], 512), [
            [Ga, f.value === "challenges"]
          ]),
          at(p("section", b6, [
            O[14] || (O[14] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "已持有物品")
            ], -1)),
            p("div", m6, [
              (U(!0), F(me, null, Ee(j.value, (m) => (U(), F("article", {
                key: m.id,
                "data-item-id": m.id
              }, [
                p("header", null, [
                  p("strong", null, $(m.label), 1),
                  O[11] || (O[11] = p("span", null, "已持有", -1))
                ]),
                p("p", null, $(m.description), 1)
              ], 8, v6))), 128)),
              j.value.length === 0 ? (U(), F("p", g6, "当前背包为空。")) : ge("", !0)
            ]),
            p("div", _6, [
              p("section", null, [
                O[12] || (O[12] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "装备")
                ], -1)),
                p("div", y6, [
                  (U(!0), F(me, null, Ee(Q.value, (m) => (U(), F("article", {
                    key: m.id,
                    class: we({ active: A(m.id), locked: !_(m.itemId) }),
                    "data-equipment-id": m.id
                  }, [
                    p("header", null, [
                      p("strong", null, $(m.label), 1),
                      p("span", null, $(A(m.id) ? "装备中" : _(m.itemId) ? m.slot : "未获得"), 1)
                    ]),
                    p("p", null, $(Me(m.modifiers)), 1),
                    p("button", {
                      type: "button",
                      disabled: !_(m.itemId) || A(m.id),
                      onClick: (ee) => i("equip", m.id)
                    }, $(A(m.id) ? "已装备" : "装备"), 9, k6)
                  ], 10, w6))), 128))
                ])
              ]),
              p("section", null, [
                O[13] || (O[13] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "衣装")
                ], -1)),
                p("div", I6, [
                  (U(!0), F(me, null, Ee(B.value, (m) => (U(), F("article", {
                    key: m.id,
                    class: we({ active: t.save.inventory.activeOutfitId === m.id, locked: !t.save.inventory.outfitIds.includes(m.id) }),
                    "data-outfit-id": m.id
                  }, [
                    p("header", null, [
                      p("strong", null, $(m.label), 1),
                      p("span", null, $(t.save.inventory.activeOutfitId === m.id ? "穿着中" : t.save.inventory.outfitIds.includes(m.id) ? "已解锁" : "未解锁"), 1)
                    ]),
                    p("button", {
                      type: "button",
                      disabled: !t.save.inventory.outfitIds.includes(m.id) || t.save.inventory.activeOutfitId === m.id,
                      onClick: (ee) => i("wearOutfit", m.id)
                    }, $(t.save.inventory.activeOutfitId === m.id ? "穿着中" : "更换"), 9, x6)
                  ], 10, A6))), 128))
                ])
              ])
            ])
          ], 512), [
            [Ga, f.value === "loadout"]
          ]),
          at(p("section", T6, [
            p("div", {
              class: "gameplay-objective-summary gameplay-progression-summary",
              "data-testid": "progression-summary",
              "data-progression-summary": "",
              "data-professions-total": se.value.professionsTotal,
              "data-professions-advanced": se.value.professionsAdvanced,
              "data-profession-levels": se.value.professionLevels,
              "data-achievements-unlocked": se.value.achievementsUnlocked,
              "data-achievements-total": se.value.achievementsTotal
            }, [
              p("span", null, "当前职业 " + $(se.value.activeProfessionLabel), 1),
              p("span", null, "已进阶 " + $(se.value.professionsAdvanced) + " / " + $(se.value.professionsTotal), 1),
              p("span", null, "职业等级合计 " + $(se.value.professionLevels), 1),
              p("span", null, "成就 " + $(se.value.achievementsUnlocked) + " / " + $(se.value.achievementsTotal), 1)
            ], 8, S6),
            p("div", C6, [
              p("section", null, [
                O[15] || (O[15] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "职业")
                ], -1)),
                p("div", P6, [
                  (U(!0), F(me, null, Ee(re.value, (m) => (U(), F("article", {
                    key: m.id,
                    class: we({ active: t.save.professions.activeId === m.id }),
                    "data-profession-id": m.id
                  }, [
                    p("header", null, [
                      p("strong", null, $(m.label), 1),
                      p("span", null, "Lv." + $(z(m.id).level), 1)
                    ]),
                    p("p", null, $(Me(m.modifiersPerLevel)) + " / 等级", 1),
                    G(m.id) !== void 0 ? (U(), F("progress", {
                      key: 0,
                      class: "gameplay-xp-progress",
                      value: z(m.id).xp,
                      max: G(m.id) ?? 0,
                      "data-xp-level": z(m.id).level
                    }, null, 8, V6)) : ge("", !0),
                    p("small", null, [
                      ta("XP " + $(z(m.id).xp), 1),
                      G(m.id) !== void 0 ? (U(), F(me, { key: 0 }, [
                        ta(" / " + $(G(m.id)), 1)
                      ], 64)) : (U(), F(me, { key: 1 }, [
                        ta(" · MAX")
                      ], 64))
                    ]),
                    p("button", {
                      type: "button",
                      disabled: t.save.professions.activeId === m.id,
                      onClick: (ee) => i("selectProfession", m.id)
                    }, $(t.save.professions.activeId === m.id ? "当前职业" : "设为当前"), 9, E6)
                  ], 10, R6))), 128))
                ])
              ]),
              p("section", null, [
                O[16] || (O[16] = p("div", { class: "gameplay-section-heading" }, [
                  p("h3", null, "成就")
                ], -1)),
                p("div", O6, [
                  (U(!0), F(me, null, Ee(de.value, (m) => (U(), F("article", {
                    key: m.id,
                    class: we({ completed: t.save.achievements.unlockedIds.includes(m.id), locked: !t.save.achievements.unlockedIds.includes(m.id) }),
                    "data-achievement-id": m.id
                  }, [
                    p("header", null, [
                      p("strong", null, $(m.label), 1),
                      p("span", null, $(t.save.achievements.unlockedIds.includes(m.id) ? "已解锁" : "未解锁"), 1)
                    ]),
                    p("p", null, $(m.description), 1),
                    p("small", null, $(Me(m.reward.values ?? {})), 1)
                  ], 10, M6))), 128))
                ])
              ])
            ])
          ], 512), [
            [Ga, f.value === "progression"]
          ]),
          at(p("section", $6, [
            p("div", {
              class: "gameplay-objective-summary gameplay-codex-summary",
              "data-testid": "codex-summary",
              "data-codex-summary": "",
              "data-codex-total": ae.value.total,
              "data-codex-active": ae.value.active,
              "data-codex-seen": ae.value.seen,
              "data-codex-locked": ae.value.locked,
              "data-codex-discovered": ae.value.active + ae.value.seen
            }, [
              p("span", null, "已发现 " + $(ae.value.active + ae.value.seen) + " / " + $(ae.value.total), 1),
              p("span", null, "当前激活 " + $(ae.value.active), 1),
              p("span", null, "已阅 " + $(ae.value.seen), 1),
              p("span", null, "未阅 " + $(ae.value.locked), 1)
            ], 8, j6),
            O[17] || (O[17] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "世界书状态")
            ], -1)),
            p("div", z6, [
              (U(!0), F(me, null, Ee(t.gameplay.worldbookEntries, (m) => (U(), F("article", {
                key: m.id,
                class: we(N(m.id)),
                "data-worldbook-id": m.id
              }, [
                p("header", null, [
                  p("strong", null, $(m.id), 1),
                  p("span", null, $(J(m.id)), 1)
                ]),
                N(m.id) !== "locked" ? (U(), F("p", F6, $(m.content), 1)) : (U(), F("p", q6, "该条目尚未在当前存档中解锁。")),
                N(m.id) !== "locked" ? (U(), F("small", Z6, $(m.constant ? "常驻" : m.selective ? "场景选择性激活" : "已记录"), 1)) : ge("", !0)
              ], 10, U6))), 128))
            ])
          ], 512), [
            [Ga, f.value === "codex"]
          ]),
          at(p("section", L6, [
            O[18] || (O[18] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "Layered worldbook packages"),
              p("p", null, "Download and import through the normal SillyTavern UI.")
            ], -1)),
            p("p", N6, $(M(y).l0.note), 1),
            p("ol", D6, [
              (U(!0), F(me, null, Ee(M(y).installInstructions, (m) => (U(), F("li", { key: m }, $(m), 1))), 128))
            ]),
            p("div", B6, [
              (U(!0), F(me, null, Ee(M(y).presets, (m) => (U(), F("article", {
                key: m.id,
                class: we({ active: v.value === m.id, locked: !m.installable }),
                "data-worldbook-preset": m.id
              }, [
                p("header", null, [
                  p("strong", null, $(m.label), 1),
                  p("span", null, $(m.installable ? `${m.packages.length} package(s)` : "excluded"), 1)
                ]),
                m.id === "minimal" ? (U(), F("p", J6, $(M(y).l0.entryCount) + " embedded card entries; no JSON import is needed.", 1)) : m.installable ? (U(), F("p", G6, $(m.packages.map((ee) => ee.entryCount).reduce((ee, ie) => ee + ie, 0)) + " entries across the selected package set.", 1)) : (U(), F("p", W6, "Audit-only material: never import or enable it at runtime.")),
                m.installable && m.packages.length ? (U(), F("button", {
                  key: 3,
                  type: "button",
                  role: "radio",
                  "aria-checked": v.value === m.id,
                  onClick: (ee) => i("selectWorldbookPreset", m.id)
                }, $(v.value === m.id ? "Selected" : "Select preset"), 9, K6)) : ge("", !0)
              ], 10, H6))), 128))
            ]),
            O[19] || (O[19] = p("div", { class: "gameplay-section-heading" }, [
              p("h3", null, "Selected downloads"),
              p("p", null, "Checksums remain visible for package verification.")
            ], -1)),
            p("div", Y6, [
              (U(!0), F(me, null, Ee(M(y).presets, (m) => at((U(), F("article", {
                key: m.id
              }, [
                m.packages.length ? (U(!0), F(me, { key: 0 }, Ee(m.packages, (ee) => (U(), F("div", {
                  key: ee.id,
                  "data-worldbook-package": ee.id,
                  class: we({ active: g.value.has(ee.id) })
                }, [
                  p("header", null, [
                    p("strong", null, $(ee.id), 1),
                    p("span", null, $(ee.entryCount) + " entries", 1)
                  ]),
                  p("p", null, $(ee.contentCharacters.toLocaleString()) + " UTF-16 content characters", 1),
                  p("small", null, "SHA-256 " + $(ee.sha256), 1),
                  p("a", {
                    href: ee.downloadUrl,
                    download: ee.downloadUrl.split("/").at(-1),
                    "data-testid": "worldbook-package-download"
                  }, "Download JSON", 8, Q6)
                ], 10, X6))), 128)) : (U(), F("p", e3, "No download: this preset uses the embedded L0 card anchors only."))
              ])), [
                [Ga, v.value === m.id]
              ])), 128))
            ])
          ], 512), [
            [Ga, f.value === "worldbook-packages"]
          ])
        ])
      ], 544)
    ]));
  }
}), Et = Ie([
  "white_canvas",
  "golden_bough_rebuild",
  "ring_conspiracy"
]), a3 = W({
  affectionAlbina: X().finite().optional(),
  trust: X().finite().optional(),
  danger: X().finite().optional(),
  artResonance: X().finite().optional(),
  composure: X().finite().optional(),
  materials: X().finite().optional(),
  leverage: X().finite().optional(),
  exposure: X().finite().optional()
}).strict(), i3 = W({
  intimacy: X().finite().optional(),
  reliance: X().finite().optional(),
  obsession: X().finite().optional(),
  suspicion: X().finite().optional()
}).strict(), o3 = W({
  blade: X().finite().optional(),
  boundary: X().finite().optional(),
  analysis: X().finite().optional(),
  resonance: X().finite().optional()
}).strict(), Un = W({
  values: a3.optional(),
  relationshipVectors: i3.optional(),
  conflictMastery: o3.optional(),
  setFlags: oe(E().min(1)).optional(),
  clearFlags: oe(E().min(1)).optional(),
  unlockCg: oe(E().min(1)).optional(),
  grantItems: oe(E().min(1)).optional(),
  equipItems: oe(E().min(1)).optional(),
  unlockOutfits: oe(E().min(1)).optional(),
  activateOutfit: E().min(1).optional(),
  startQuests: oe(E().min(1)).optional(),
  completeQuests: oe(E().min(1)).optional(),
  resolveBattles: oe(W({ battleId: E().min(1), outcome: Ie(["victory", "setback"]) }).strict()).optional(),
  professionXp: gi(E().min(1), X().int().positive()).optional(),
  activateProfession: E().min(1).optional()
}).strict(), Wc = E().min(1), xa = E().min(1);
Ie([
  "mirror_thread",
  "testimony_cipher",
  "boundary_resonance"
]);
const Vl = Ie([
  "perfect",
  "assisted",
  "setback",
  "skipped"
]), n3 = W({
  attempts: X().int().nonnegative(),
  resolved: At(),
  completed: At(),
  rewardClaimed: At(),
  bestOutcome: Vl.optional(),
  lastOutcome: Vl.optional(),
  bestScore: X().int().min(0).max(100),
  assisted: At(),
  seed: E().min(1).optional(),
  resolvedAt: E().min(1).optional()
}).strict(), r3 = W({
  records: gi(Wc, n3)
}).strict(), s3 = W({
  id: xa,
  label: E().min(1),
  description: E().min(1)
}).strict(), c3 = W({
  kind: pe("mirror_thread"),
  anchors: oe(s3).min(2),
  correctPair: fi([xa, xa])
}).strict().superRefine((t, e) => {
  const a = new Set(t.anchors.map(({ id: i }) => i));
  t.correctPair[0] === t.correctPair[1] && e.addIssue({ code: "custom", path: ["correctPair"], message: "Mirror thread targets must be distinct." }), t.correctPair.forEach((i, o) => {
    a.has(i) || e.addIssue({ code: "custom", path: ["correctPair", o], message: `Unknown mirror anchor: ${i}` });
  });
}), d3 = W({
  id: xa,
  text: E().min(1)
}).strict(), l3 = W({
  kind: pe("testimony_cipher"),
  fragments: oe(d3).min(2),
  solutionOrder: oe(xa).min(2)
}).strict().superRefine((t, e) => {
  const a = new Set(t.fragments.map(({ id: i }) => i));
  new Set(t.solutionOrder).size !== t.solutionOrder.length && e.addIssue({ code: "custom", path: ["solutionOrder"], message: "Cipher solution order may not repeat fragments." }), t.solutionOrder.forEach((i, o) => {
    a.has(i) || e.addIssue({ code: "custom", path: ["solutionOrder", o], message: `Unknown testimony fragment: ${i}` });
  });
}), u3 = W({
  id: xa,
  label: E().min(1)
}).strict(), f3 = W({
  kind: pe("boundary_resonance"),
  nodes: oe(u3).min(2),
  targetActiveIds: oe(xa).min(1)
}).strict().superRefine((t, e) => {
  const a = new Set(t.nodes.map(({ id: i }) => i));
  new Set(t.targetActiveIds).size !== t.targetActiveIds.length && e.addIssue({ code: "custom", path: ["targetActiveIds"], message: "Resonance targets may not repeat nodes." }), t.targetActiveIds.forEach((i, o) => {
    a.has(i) || e.addIssue({ code: "custom", path: ["targetActiveIds", o], message: `Unknown resonance node: ${i}` });
  });
}), p3 = Nr("kind", [
  c3,
  l3,
  f3
]), h3 = W({
  perfect: Un,
  assisted: Un,
  setback: Un,
  skipped: Un
}).strict(), b3 = W({
  id: Wc,
  route: Et.optional(),
  label: E().min(1),
  description: E().min(1),
  puzzle: p3,
  outcomes: h3
}).strict(), m3 = W({
  minigameId: Wc,
  seed: E().min(1),
  prompt: E().min(1),
  assistLabel: E().min(1),
  allowSkip: At()
}).strict(), v3 = Nr("kind", [
  W({ kind: pe("mirror_thread"), selectedAnchorIds: oe(xa).length(2), assisted: At() }).strict(),
  W({ kind: pe("testimony_cipher"), orderedFragmentIds: oe(xa).min(1), assisted: At() }).strict(),
  W({ kind: pe("boundary_resonance"), activeNodeIds: oe(xa), assisted: At() }).strict(),
  W({ kind: pe("skip"), assisted: pe(!0) }).strict()
]), El = {
  skipped: 0,
  setback: 1,
  assisted: 2,
  perfect: 3
};
function g3(t, e) {
  return e === void 0 || El[t] > El[e];
}
function Ol(t, e) {
  return t.length === e.length && t.every((a) => e.includes(a));
}
function _3(t, e) {
  return t.length === e.length && t.every((a, i) => e[i] === a);
}
function y3(t, e, a) {
  const i = v3.parse(a);
  if (i.kind === "skip") {
    if (!e.allowSkip) throw new Error(`Skipping is unavailable for minigame: ${t.id}`);
    return { outcome: "skipped", score: 0, assisted: !0 };
  }
  if (i.kind !== t.puzzle.kind)
    throw new Error(`Attempt kind does not match minigame: ${t.id}`);
  let o = !1;
  return t.puzzle.kind === "mirror_thread" && i.kind === "mirror_thread" ? o = Ol(i.selectedAnchorIds, t.puzzle.correctPair) : t.puzzle.kind === "testimony_cipher" && i.kind === "testimony_cipher" ? o = _3(i.orderedFragmentIds, t.puzzle.solutionOrder) : t.puzzle.kind === "boundary_resonance" && i.kind === "boundary_resonance" && (o = Ol(i.activeNodeIds, t.puzzle.targetActiveIds)), o ? i.assisted ? { outcome: "assisted", score: 60, assisted: !0 } : { outcome: "perfect", score: 100, assisted: !1 } : { outcome: "setback", score: 0, assisted: i.assisted };
}
function vs(t, e) {
  let a = 2166136261;
  for (const n of e)
    a ^= n.charCodeAt(0), a = Math.imul(a, 16777619);
  const i = () => {
    a += 1831565813;
    let n = a;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  }, o = [...t];
  for (let n = o.length - 1; n > 0; n -= 1) {
    const r = Math.floor(i() * (n + 1)), s = o[n];
    o[n] = o[r], o[r] = s;
  }
  return o;
}
const w3 = ["data-minigame-id", "data-minigame-kind", "data-assisted", "data-can-submit"], k3 = { class: "minigame-panel__header" }, I3 = { id: "minigame-title" }, A3 = ["disabled"], x3 = { class: "minigame-panel__description" }, T3 = {
  key: 0,
  class: "minigame-mirror",
  "aria-label": "镜面连线选择"
}, S3 = ["data-anchor-id", "aria-pressed", "data-assist", "disabled", "onClick"], C3 = {
  key: 0,
  class: "minigame-hint-tag"
}, P3 = {
  class: "minigame-panel__hint",
  "aria-live": "polite"
}, R3 = {
  key: 1,
  class: "minigame-cipher"
}, V3 = {
  class: "minigame-cipher__pool",
  "aria-label": "待排序证词"
}, E3 = ["data-fragment-id", "aria-pressed", "data-assist-rank", "disabled", "onClick"], O3 = {
  key: 0,
  class: "minigame-hint-tag"
}, M3 = {
  class: "minigame-cipher__sequence",
  "aria-label": "证词顺序"
}, $3 = ["disabled", "onClick"], j3 = ["disabled", "onClick"], z3 = {
  key: 0,
  class: "minigame-cipher__placeholder"
}, U3 = {
  key: 2,
  class: "minigame-resonance",
  "aria-label": "反制条款共振"
}, F3 = ["data-node-id", "aria-pressed", "data-assist", "disabled", "onClick"], q3 = {
  key: 0,
  class: "minigame-hint-tag"
}, Z3 = { class: "minigame-panel__assist" }, L3 = ["disabled"], N3 = { class: "minigame-panel__actions" }, D3 = {
  key: 0,
  class: "minigame-panel__blocked",
  "aria-live": "polite",
  "data-testid": "minigame-blocked"
}, B3 = ["disabled"], H3 = ["disabled"], J3 = /* @__PURE__ */ _n({
  __name: "NarrativeMinigame",
  props: {
    definition: {},
    challenge: {},
    reducedMotion: { type: Boolean },
    busy: { type: Boolean }
  },
  emits: ["close", "resolve"],
  setup(t, { emit: e }) {
    const a = t, i = e, o = /* @__PURE__ */ ne(!1), n = /* @__PURE__ */ ne([]), r = /* @__PURE__ */ ne([]), s = /* @__PURE__ */ ne([]), c = /* @__PURE__ */ new Set();
    function d(j) {
      const Q = j?.currentTarget;
      if (!(Q instanceof HTMLButtonElement) || a.reducedMotion || a.busy) return;
      let B;
      B = xe.fromTo(Q, { scale: 1 }, {
        scale: 1.035,
        duration: 0.12,
        yoyo: !0,
        repeat: 1,
        ease: "power2.out",
        onComplete: () => {
          c.delete(B);
        }
      }), c.add(B);
    }
    wo(() => {
      c.forEach((j) => j.kill()), c.clear();
    });
    const l = ve(() => a.definition.puzzle.kind === "mirror_thread" ? vs(a.definition.puzzle.anchors, a.challenge.seed) : []), u = ve(() => a.definition.puzzle.kind === "testimony_cipher" ? vs(a.definition.puzzle.fragments, a.challenge.seed) : []), f = ve(() => a.definition.puzzle.kind === "boundary_resonance" ? vs(a.definition.puzzle.nodes, a.challenge.seed) : []);
    function b(j, Q, B) {
      if (j.value.includes(Q)) {
        j.value = j.value.filter((re) => re !== Q);
        return;
      }
      j.value = B && j.value.length >= B ? [...j.value.slice(1), Q] : [...j.value, Q];
    }
    function y(j, Q) {
      b(n, j, 2), d(Q);
    }
    function v(j, Q) {
      b(s, j), d(Q);
    }
    function g(j, Q) {
      b(r, j), d(Q);
    }
    function k(j, Q) {
      const B = r.value.indexOf(j), re = B + Q;
      if (B < 0 || re < 0 || re >= r.value.length) return;
      const de = [...r.value];
      [de[B], de[re]] = [de[re], de[B]], r.value = de;
    }
    function I(j) {
      if (!(!o.value || a.definition.puzzle.kind !== "mirror_thread"))
        return a.definition.puzzle.correctPair.includes(j) ? "keep" : "drop";
    }
    function S(j) {
      if (!o.value || a.definition.puzzle.kind !== "testimony_cipher") return;
      const Q = a.definition.puzzle.solutionOrder.indexOf(j);
      return Q < 0 ? void 0 : Q + 1;
    }
    function T(j) {
      if (!(!o.value || a.definition.puzzle.kind !== "boundary_resonance"))
        return a.definition.puzzle.targetActiveIds.includes(j) ? "keep" : "drop";
    }
    const x = ve(() => a.definition.puzzle.kind === "testimony_cipher" ? a.definition.puzzle.solutionOrder.length : 0), D = ve(() => {
      if (a.definition.puzzle.kind === "mirror_thread")
        return n.value.length === 2 ? void 0 : "请选择两个锚点后再提交。";
      if (a.definition.puzzle.kind === "testimony_cipher") {
        const j = x.value - r.value.length;
        return j === 0 ? void 0 : `还需要排入 ${j} 段证词。`;
      }
      return s.value.length === 0 ? "请至少点亮一个条款节点。" : void 0;
    });
    function V() {
      if (!(a.busy || D.value)) {
        if (a.definition.puzzle.kind === "mirror_thread") {
          i("resolve", { kind: "mirror_thread", selectedAnchorIds: n.value, assisted: o.value });
          return;
        }
        if (a.definition.puzzle.kind === "testimony_cipher") {
          i("resolve", { kind: "testimony_cipher", orderedFragmentIds: r.value, assisted: o.value });
          return;
        }
        i("resolve", { kind: "boundary_resonance", activeNodeIds: s.value, assisted: o.value });
      }
    }
    const P = ve(() => !a.busy && D.value === void 0);
    function R() {
      i("resolve", { kind: "skip", assisted: !0 });
    }
    return (j, Q) => (U(), F("section", {
      class: we(["minigame-panel", `minigame-panel--${t.definition.puzzle.kind}`]),
      "data-minigame-id": t.definition.id,
      "data-minigame-kind": t.definition.puzzle.kind,
      "data-assisted": o.value,
      "data-can-submit": P.value ? "true" : "false",
      "aria-labelledby": "minigame-title"
    }, [
      p("header", k3, [
        p("div", null, [
          Q[2] || (Q[2] = p("p", null, "叙事介入 · 可跳过", -1)),
          p("h3", I3, $(t.definition.label), 1)
        ]),
        p("span", null, $(t.busy ? "结算中" : "剧情挑战"), 1),
        p("button", {
          type: "button",
          class: "minigame-panel__close",
          "aria-label": "关闭挑战",
          disabled: t.busy,
          onClick: Q[0] || (Q[0] = (B) => i("close"))
        }, "关闭", 8, A3)
      ]),
      p("p", x3, $(t.challenge.prompt), 1),
      t.definition.puzzle.kind === "mirror_thread" ? (U(), F("div", T3, [
        (U(!0), F(me, null, Ee(l.value, (B) => (U(), F("button", {
          key: B.id,
          type: "button",
          class: we(["minigame-mirror__anchor", { "is-selected": n.value.includes(B.id) }]),
          "data-anchor-id": B.id,
          "aria-pressed": n.value.includes(B.id),
          "data-assist": I(B.id),
          disabled: t.busy,
          onClick: (re) => y(B.id, re)
        }, [
          p("strong", null, $(B.label), 1),
          p("span", null, $(B.description), 1),
          I(B.id) ? (U(), F("em", C3, $(I(B.id) === "keep" ? "应当保留" : "不应连入"), 1)) : ge("", !0)
        ], 10, S3))), 128)),
        p("p", P3, "已选择 " + $(n.value.length) + " / 2 个锚点。", 1)
      ])) : t.definition.puzzle.kind === "testimony_cipher" ? (U(), F("div", R3, [
        p("div", V3, [
          (U(!0), F(me, null, Ee(u.value, (B) => (U(), F("button", {
            key: B.id,
            type: "button",
            "data-fragment-id": B.id,
            class: we({ "is-selected": r.value.includes(B.id) }),
            "aria-pressed": r.value.includes(B.id),
            "data-assist-rank": S(B.id),
            disabled: t.busy,
            onClick: (re) => g(B.id, re)
          }, [
            ta($(B.text) + " ", 1),
            S(B.id) ? (U(), F("em", O3, "建议第 " + $(S(B.id)) + " 位", 1)) : ge("", !0)
          ], 10, E3))), 128))
        ]),
        p("ol", M3, [
          (U(!0), F(me, null, Ee(r.value, (B, re) => (U(), F("li", { key: B }, [
            p("span", null, $(re + 1), 1),
            p("strong", null, $(t.definition.puzzle.fragments.find((de) => de.id === B)?.text), 1),
            p("button", {
              type: "button",
              "aria-label": "上移",
              disabled: t.busy || re === 0,
              onClick: (de) => k(B, -1)
            }, "↑", 8, $3),
            p("button", {
              type: "button",
              "aria-label": "下移",
              disabled: t.busy || re === r.value.length - 1,
              onClick: (de) => k(B, 1)
            }, "↓", 8, j3)
          ]))), 128)),
          r.value.length === 0 ? (U(), F("li", z3, "从左侧选择证词，按顺序排入这一栏。")) : ge("", !0)
        ])
      ])) : (U(), F("div", U3, [
        (U(!0), F(me, null, Ee(f.value, (B) => (U(), F("button", {
          key: B.id,
          type: "button",
          "data-node-id": B.id,
          class: we({ "is-active": s.value.includes(B.id) }),
          "aria-pressed": s.value.includes(B.id),
          "data-assist": T(B.id),
          disabled: t.busy,
          onClick: (re) => v(B.id, re)
        }, [
          Q[3] || (Q[3] = p("span", { "aria-hidden": "true" }, null, -1)),
          ta($(B.label) + " ", 1),
          T(B.id) ? (U(), F("em", q3, $(T(B.id) === "keep" ? "应点亮" : "应关闭"), 1)) : ge("", !0)
        ], 10, F3))), 128))
      ])),
      p("label", Z3, [
        at(p("input", {
          "onUpdate:modelValue": Q[1] || (Q[1] = (B) => o.value = B),
          type: "checkbox",
          disabled: t.busy
        }, null, 8, L3), [
          [pf, o.value]
        ]),
        p("span", null, $(t.challenge.assistLabel) + "。可完成挑战，但不会获得完美结算。", 1)
      ]),
      p("footer", N3, [
        D.value ? (U(), F("p", D3, $(D.value), 1)) : ge("", !0),
        p("button", {
          type: "button",
          "data-testid": "minigame-submit",
          class: we({ "is-ready": P.value }),
          disabled: t.busy || !!D.value,
          onClick: V
        }, "提交介入", 10, B3),
        t.challenge.allowSkip ? (U(), F("button", {
          key: 1,
          type: "button",
          class: "minigame-panel__skip",
          "data-testid": "minigame-skip",
          disabled: t.busy,
          onClick: R
        }, "跳过并继续剧情", 8, H3)) : ge("", !0)
      ])
    ], 10, w3));
  }
}), G3 = ["data-reduced-motion", "data-visual-profile", "data-speaker", "data-speaker-transfer"], W3 = ["data-slot"], K3 = ["data-reduced-motion", "data-speaking", "data-speaking-glow", "data-focus", "data-character-id"], Y3 = {
  key: 1,
  class: "portrait-slot__empty",
  "aria-hidden": "true"
}, X3 = ["data-slot"], Q3 = ["data-reduced-motion", "data-character-id"], e4 = /* @__PURE__ */ _n({
  __name: "PortraitStage",
  props: {
    portraits: {},
    service: {},
    reducedMotion: { type: Boolean },
    focus: {},
    visualProfile: {},
    speaker: {}
  },
  setup(t) {
    const e = t, a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ ne();
    let o, n, r, s;
    const c = /* @__PURE__ */ ne(0), d = ["left", "center", "right"], l = /* @__PURE__ */ ne([]), u = /* @__PURE__ */ new Set();
    let f = [];
    function b(V) {
      return `${V.characterId}:${V.position}`;
    }
    const y = ve(() => e.speaker ?? e.portraits.find((V) => V.active)?.characterId), v = ve(() => d.map((V) => e.portraits.find((P) => P.position === V || V === "left" && P.position === "far-left" || V === "right" && P.position === "far-right")));
    function g(V, P) {
      P instanceof HTMLCanvasElement ? a.set(V, P) : a.delete(V);
    }
    async function k() {
      e.service.stopAll(), await Ne(), await Promise.all(e.portraits.map(async (V) => {
        const P = a.get(b(V));
        P && await e.service.play(V.portraitAssetId, P);
      }));
    }
    function I(V) {
      a.delete(`${b(V)}:exiting`), l.value = l.value.filter((P) => b(P) !== b(V));
    }
    async function S(V) {
      V.length && (l.value.push(...V), await Ne(), await Promise.all(V.map((P) => new Promise((R) => {
        if (e.reducedMotion) {
          I(P), R();
          return;
        }
        const j = a.get(`${b(P)}:exiting`);
        if (!j) {
          I(P), R();
          return;
        }
        const Q = xe.to(j, {
          y: 26,
          autoAlpha: 0,
          duration: 0.42,
          ease: "power2.in",
          onComplete: () => {
            u.delete(Q), I(P), R();
          }
        });
        u.add(Q);
      }))));
    }
    function T() {
      u.forEach((V) => V.kill()), u.clear(), l.value.forEach((V) => a.delete(`${b(V)}:exiting`)), l.value = [];
    }
    function x() {
      if (r?.kill(), r = void 0, e.reducedMotion || !i.value) return;
      const V = i.value.querySelector(".portrait-stage__canvas.is-speaking");
      V && (r = xe.fromTo(V, { boxShadow: "0 0 0 rgba(230, 190, 96, 0)" }, {
        boxShadow: "0 0 44px rgba(230, 190, 96, .4)",
        duration: 1.7,
        yoyo: !0,
        repeat: -1,
        ease: "sine.inOut"
      }));
    }
    async function D() {
      if (c.value += 1, s?.kill(), s = void 0, e.reducedMotion || !i.value || (await Ne(), !i.value)) return;
      const V = i.value.querySelectorAll(".portrait-stage__canvas.is-speaking"), P = i.value.querySelectorAll(".portrait-stage__canvas.is-active:not(.is-speaking)");
      s = xe.timeline({ defaults: { ease: "power2.out" } }), P.length && s.to(P, { filter: "brightness(1) saturate(1)", duration: 0.22, clearProps: "filter" }, 0), V.length && s.fromTo(V, { filter: "brightness(1.08) saturate(1.06)" }, {
        filter: "brightness(1.18) saturate(1.12)",
        duration: 0.34,
        ease: "power3.out",
        yoyo: !0,
        repeat: 1,
        clearProps: "filter"
      }, 0.06);
    }
    return ut(() => e.reducedMotion, (V) => {
      e.service.setReducedMotionOverride(V), V && (T(), x()), k();
    }, { immediate: !0 }), ut(() => e.portraits, async (V) => {
      const P = new Set(V.map(b)), R = f.filter((Q) => !P.has(b(Q)));
      if (f = [...V], R.length && S(R), await k(), await Ne(), x(), e.reducedMotion || !i.value) return;
      n?.kill();
      const j = xe.utils.selector(i.value);
      n = xe.timeline({ defaults: { ease: "power3.out" } }).fromTo(j(".portrait-stage__canvas.is-speaking"), { y: 24, autoAlpha: 0, scale: 0.97 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.5 }).fromTo(j(".portrait-stage__canvas.is-active:not(.is-speaking)"), { y: 20, autoAlpha: 0, scale: 0.98 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.56, stagger: 0.09 }, 0.1).fromTo(j(".portrait-stage__canvas.is-supporting"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 0.46, duration: 0.44, stagger: 0.055 }, 0.22);
    }, { deep: !0, immediate: !0 }), ut(() => y.value, () => {
      x(), D();
    }, { flush: "post" }), yn(() => {
      !i.value || e.reducedMotion || (o = xe.context(() => {
        xe.fromTo(".portrait-stage__canvas", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" });
      }, i.value));
    }), wo(() => {
      n?.kill(), r?.kill(), s?.kill(), u.forEach((V) => V.kill()), u.clear(), o?.revert(), e.service.stopAll();
    }), (V, P) => (U(), F("div", {
      ref_key: "stage",
      ref: i,
      class: "portrait-stage",
      role: "region",
      "aria-label": "角色立绘",
      "data-reduced-motion": t.reducedMotion ? "true" : "false",
      "data-visual-profile": t.visualProfile ?? "canvas",
      "data-speaker": t.speaker ?? "",
      "data-speaker-transfer": c.value,
      style: Ua({ "--scene-focus-x": `${(t.focus?.[0] ?? 0.5) * 100}%` })
    }, [
      (U(!0), F(me, null, Ee(v.value, (R, j) => (U(), F("div", {
        key: d[j],
        class: we(["portrait-slot", `portrait-slot--${d[j]}`]),
        "data-slot": d[j]
      }, [
        R ? (U(), F("canvas", {
          key: `${R.characterId}:${R.portraitAssetId}`,
          ref_for: !0,
          ref: (Q) => g(b(R), Q),
          class: we(["portrait-stage__canvas", [`portrait-stage__canvas--${R.position}`, { "is-active": R.active, "is-speaking": R.active && R.characterId === y.value, "is-supporting": !R.active }]]),
          "data-reduced-motion": t.reducedMotion ? "true" : "false",
          "data-state": "present",
          "data-speaking": R.characterId === y.value ? "true" : "false",
          "data-speaking-glow": R.active && R.characterId === y.value ? "true" : "false",
          "data-focus": R.active ? "primary" : "supporting",
          "data-character-id": R.characterId,
          width: "512",
          height: "768",
          style: Ua({ transform: `translateX(-50%) translateX(${R.active ? 0 : (t.focus?.[0] ?? 0.5) < 0.5 ? "0.45rem" : "-0.45rem"}) scale(${R.scale})` })
        }, null, 14, K3)) : (U(), F("span", Y3))
      ], 10, W3))), 128)),
      (U(!0), F(me, null, Ee(l.value, (R) => (U(), F("div", {
        key: `exiting:${b(R)}`,
        class: "portrait-slot portrait-slot--exiting",
        "data-slot": R.position
      }, [
        p("canvas", {
          ref_for: !0,
          ref: (j) => g(`${b(R)}:exiting`, j),
          class: we(["portrait-stage__canvas", [`portrait-stage__canvas--${R.position}`, "is-exiting"]]),
          "data-reduced-motion": t.reducedMotion ? "true" : "false",
          "data-state": "exiting",
          "data-speaking": "false",
          "data-focus": "supporting",
          "data-character-id": R.characterId,
          width: "512",
          height: "768",
          style: Ua({ transform: `translateX(-50%) scale(${R.scale})` })
        }, null, 14, Q3)
      ], 8, X3))), 128))
    ], 12, G3));
  }
}), Kp = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [i, o] of e)
    a[i] = o;
  return a;
}, t4 = /* @__PURE__ */ Kp(e4, [["__scopeId", "data-v-226ec7ae"]]), a4 = [{ sceneIds: ["canon_recap_9_14"], provenance: { classification: "canon_paraphrase", scope: "canon_recap", claimIds: ["canon.9-14.corporism-context"], sourceIds: ["source.official.canto-ix.9-14", "source.wiki.canto-ix-part-i.172275"], note: "Short zh-CN event paraphrase; not a quotation or transcript replacement." } }, { sceneIds: ["canon_recap_9_18"], provenance: { classification: "canon_paraphrase", scope: "canon_recap", claimIds: ["canon.9-18.first-appearance"], sourceIds: ["source.official.canto-ix.9-18", "source.wiki.canto-ix-part-i.172275", "source.wiki.albina.173286"], note: "Reviewed zh-CN first-appearance paraphrase covering the complete Albina-related 9-18 event sequence." } }, { sceneIds: ["canon_recap_9_37"], provenance: { classification: "canon_paraphrase", scope: "canon_recap", claimIds: ["canon.9-37.encounter-and-method"], sourceIds: ["source.official.canto-ix.9-37", "source.wiki.canto-ix-part-iii.177602", "source.wiki.albina.173286"], note: "Reviewed zh-CN 9-37 arrival, method and friendship paraphrase; player boundary text is kept out of this canon scene." } }, { sceneIds: ["canon_recap_albina_fascia"], provenance: { classification: "canon_paraphrase", scope: "canon_recap", claimIds: ["canon.profile.identity", "canon.appearance.prosthetic-body", "canon.appearance.armor-and-fascia", "canon.personality.fascia-attachment", "canon.personality.social-and-ambition", "canon.story.pre-canto-fascia"], sourceIds: ["source.official.canto-ix.9-18", "source.official.canto-ix.9-37", "source.official.canto-ix.9-43", "source.wiki.albina-enemy.175660", "source.wiki.albina.173286", "source.wiki.callisto.177757", "source.wiki.canto-ix-part-i.172275", "source.wiki.canto-ix-part-iii.177602", "source.wiki.house-of-spiders.177075"], note: "Atomic profile, appearance, personality and pre-Canto facts rendered from the reviewed claim ledger; no source dialogue is reproduced." } }, { sceneIds: ["canon_recap_9_37_battle"], provenance: { classification: "canon_paraphrase", scope: "canon_recap", claimIds: ["canon.9-37.escalation"], sourceIds: ["source.official.canto-ix.9-37", "source.official.canto-ix.9-43", "source.wiki.canto-ix-part-iii.177602"], note: "Reviewed 9-37 ending boundary contrasted with the later 9-43 outcome." } }, { sceneIds: ["canon_recap_9_43_outcome"], provenance: { classification: "canon_paraphrase", scope: "canon_recap", claimIds: ["canon.9-43.sign-awakening", "canon.9-43.outcome"], sourceIds: ["source.official.canto-ix.9-43", "source.wiki.canto-ix-part-iii.177602", "source.wiki.albina.173286"], note: "Reviewed 9-43 pressure, Sign awakening and outcome paraphrase; the AU boundary remains a separate scene." } }, { sceneIds: ["opening_001"], provenance: { classification: "AU_extension", scope: "AU_boundary", claimIds: ["boundary.routes-and-player.are-AU"], sourceIds: ["source.official.canto-ix.9-43", "source.project.legacy-v1.0.44"], note: "Explicit continuity boundary shown before the player selects an author-created AU route." } }, { sceneIds: ["white_canvas_001", "white_canvas_002", "white_canvas_003", "white_canvas_004", "white_canvas_005", "white_canvas_006", "white_canvas_007", "white_canvas_008", "white_canvas_009", "white_canvas_010", "white_canvas_011", "white_canvas_012", "white_canvas_013", "white_canvas_014", "white_canvas_015", "white_canvas_ending_gate", "white_canvas_ending_true", "white_canvas_ending_normal", "white_canvas_ending_bad", "golden_bough_001", "golden_bough_002", "golden_bough_003", "golden_bough_004", "golden_bough_005", "golden_bough_006", "golden_bough_007", "golden_bough_008", "golden_bough_009", "golden_bough_010", "golden_bough_011", "golden_bough_012", "golden_bough_013", "golden_bough_014", "golden_bough_015", "golden_bough_rebuild_ending_gate", "golden_bough_rebuild_ending_true", "golden_bough_rebuild_ending_normal", "golden_bough_rebuild_ending_bad", "ring_conspiracy_001", "ring_conspiracy_002", "ring_conspiracy_003", "ring_conspiracy_004", "ring_conspiracy_005", "ring_conspiracy_006", "ring_conspiracy_007", "ring_conspiracy_008", "ring_conspiracy_009", "ring_conspiracy_010", "ring_conspiracy_011", "ring_conspiracy_012", "ring_conspiracy_013", "ring_conspiracy_014", "ring_conspiracy_015", "ring_conspiracy_ending_gate", "ring_conspiracy_ending_true", "ring_conspiracy_ending_normal", "ring_conspiracy_ending_bad"], provenance: { classification: "AU_extension", scope: "route", claimIds: ["boundary.routes-and-player.are-AU"], sourceIds: ["source.official.canto-ix.9-43", "source.project.legacy-v1.0.44"], note: "Project-authored route content after the explicit 9-43 divergence; never source-game canon." } }], i4 = {
  entries: a4
}, o4 = i4, n4 = new Map(
  o4.entries.flatMap((t) => t.sceneIds.map((e) => [e, t.provenance]))
);
function r4(t) {
  return n4.get(t);
}
function s4(t) {
  const e = r4(t);
  return e ? e.scope === "canon_recap" ? "canon" : e.scope === "AU_boundary" ? "au-boundary" : "au-route" : t.startsWith("canon_") || t.startsWith("canon-") ? "canon" : t.startsWith("opening_") ? "au-boundary" : "au-route";
}
Ie(["enter", "establish", "dialogue", "choice", "exit"]);
const Yp = W({
  characterId: E().min(1),
  position: Ie(["far-left", "left", "center", "right", "far-right"]),
  point: fi([X().min(0).max(1), X().min(0).max(1)]),
  active: At()
}).strict(), Xp = W({
  sourceCharacterId: E().min(1),
  targetCharacterId: E().min(1),
  source: fi([X().min(0).max(1), X().min(0).max(1)]),
  target: fi([X().min(0).max(1), X().min(0).max(1)]),
  strength: X().min(0).max(1)
}).strict(), c4 = W({
  sceneId: E().min(1),
  route: E().min(1),
  tone: E().min(1),
  focusCharacterId: E().min(1).optional(),
  portraitAnchors: oe(Yp),
  relationshipRibbon: Xp.optional(),
  focus: fi([X().min(0).max(1), X().min(0).max(1)]),
  camera: W({
    mode: Ie(["establish", "focus", "drift", "impact", "ending"]),
    offset: fi([X().min(-0.18).max(0.18), X().min(-0.18).max(0.18)]),
    zoom: X().min(0.9).max(1.2),
    damping: X().min(0.01).max(1),
    shake: X().min(0).max(1)
  }).strict(),
  timing: W({
    enterMs: X().int().positive().max(4e3),
    establishMs: X().int().positive().max(4e3),
    dialogueMs: X().int().positive().max(4e3),
    choiceMs: X().int().positive().max(4e3),
    exitMs: X().int().positive().max(4e3)
  }).strict(),
  palette: W({
    primary: E().regex(/^#[0-9a-f]{6}$/iu),
    shadow: E().regex(/^#[0-9a-f]{6}$/iu)
  }).strict(),
  /**
   * Route and tone resolve to a compact director-facing style preset. The
   * renderer consumes this as ordinary uniforms: Vue never participates in a
   * frame-by-frame animation loop.
   */
  visual: W({
    profile: Ie(["canvas", "rain", "golden", "threat", "gallery", "ending"]),
    parallax: X().min(0).max(1),
    grain: X().min(0).max(1),
    bloom: X().min(0).max(1),
    motifDensity: X().min(0).max(1)
  }).strict()
}).strict(), Qp = {
  "far-left": [0.22, 0.43],
  left: [0.34, 0.43],
  center: [0.5, 0.42],
  right: [0.66, 0.43],
  "far-right": [0.78, 0.43]
};
function d4(t) {
  return t.map((e) => Yp.parse({
    characterId: e.characterId,
    position: e.position,
    point: Qp[e.position],
    active: e.active
  }));
}
function l4(t, e) {
  const a = t.find((n) => n.characterId === e && n.active), i = t.find((n) => n.characterId !== a?.characterId);
  if (!a || !i) return;
  const o = Math.abs(a.point[0] - i.point[0]);
  return Xp.parse({
    sourceCharacterId: i.characterId,
    targetCharacterId: a.characterId,
    source: i.point,
    target: a.point,
    strength: Number(Math.min(1, 0.44 + o * 0.72).toFixed(3))
  });
}
const Ml = {
  white_canvas: { primary: "#d9eef7", shadow: "#12222c" },
  golden_bough_rebuild: { primary: "#f2c95f", shadow: "#382611" },
  ring_conspiracy: { primary: "#d85f67", shadow: "#341116" }
};
function u4(t, e) {
  return e ? "ending" : t === "threat" ? "impact" : t === "quiet" ? "focus" : t === "rain" || t === "gallery" ? "drift" : "establish";
}
function f4(t, e, a) {
  return a ? { profile: "ending", parallax: 0.22, grain: 0.04, bloom: 0.76, motifDensity: 0.88 } : e === "threat" ? { profile: "threat", parallax: 0.58, grain: 0.42, bloom: 0.67, motifDensity: 0.74 } : e === "gallery" ? { profile: "gallery", parallax: 0.44, grain: 0.16, bloom: 0.72, motifDensity: 0.62 } : e === "rain" ? { profile: "rain", parallax: 0.68, grain: 0.28, bloom: 0.38, motifDensity: 0.86 } : t === "golden_bough_rebuild" ? { profile: "golden", parallax: 0.52, grain: 0.22, bloom: 0.64, motifDensity: 0.74 } : { profile: "canvas", parallax: 0.4, grain: 0.19, bloom: 0.46, motifDensity: 0.54 };
}
function eh(t) {
  const e = t.portraits.find((l) => l.active), a = d4(t.portraits), i = e ? Qp[e.position] : [0.5, 0.42], o = l4(a, e?.characterId), n = t.route ?? "white_canvas", r = t.tone.toLowerCase(), s = u4(r, !!t.ending), c = s === "impact" ? 1.055 : s === "focus" ? 1.035 : s === "ending" ? 1.02 : 1, d = [Number(((i[0] - 0.5) * -0.12).toFixed(4)), Number(((i[1] - 0.42) * -0.08).toFixed(4))];
  return c4.parse({
    sceneId: t.id,
    route: n,
    tone: t.tone,
    ...e ? { focusCharacterId: e.characterId } : {},
    portraitAnchors: a,
    ...o ? { relationshipRibbon: o } : {},
    focus: i,
    camera: {
      mode: s,
      offset: d,
      zoom: c,
      damping: s === "impact" ? 0.16 : s === "ending" ? 0.08 : 0.12,
      shake: s === "impact" ? 0.28 : s === "ending" ? 0.04 : 0
    },
    timing: {
      enterMs: s === "impact" ? 320 : 520,
      establishMs: s === "drift" ? 1450 : 1050,
      dialogueMs: 360,
      choiceMs: 520,
      exitMs: s === "ending" ? 1500 : 520
    },
    palette: Ml[n] ?? Ml.white_canvas,
    visual: f4(n, r, !!t.ending)
  });
}
const p4 = Ie([
  "atmosphere",
  "dialogue-emphasis",
  "choice-confirm",
  "route-transition",
  "chapter-transition",
  "cg-reveal",
  "impact",
  "ending"
]);
W({
  route: E().min(1),
  sceneId: E().min(1),
  chapter: X().int().nonnegative().optional(),
  tone: E().min(1).optional(),
  focus: fi([X().min(0).max(1), X().min(0).max(1)]).optional()
}).strict();
const h4 = W({
  kind: p4,
  intensity: X().min(0).max(1).optional(),
  durationMs: X().int().positive().max(4e3).optional(),
  focus: fi([X().min(0).max(1), X().min(0).max(1)]).optional()
}).strict(), b4 = {
  rain: "atmosphere",
  quiet: "dialogue-emphasis",
  gallery: "cg-reveal",
  golden: "chapter-transition",
  threat: "impact"
};
function Xs(t) {
  const e = t ? b4[t.toLowerCase()] : void 0;
  return e ? { kind: e } : void 0;
}
function th(t) {
  return {
    atmosphere: { intensity: 0.35, durationMs: 900, focus: [0.5, 0.44] },
    "dialogue-emphasis": { intensity: 0.42, durationMs: 360, focus: [0.5, 0.44] },
    "choice-confirm": { intensity: 0.72, durationMs: 520, focus: [0.5, 0.58] },
    "route-transition": { intensity: 0.92, durationMs: 1250, focus: [0.5, 0.44] },
    "chapter-transition": { intensity: 0.9, durationMs: 1100, focus: [0.5, 0.44] },
    "cg-reveal": { intensity: 0.78, durationMs: 1e3, focus: [0.5, 0.44] },
    impact: { intensity: 0.95, durationMs: 420, focus: [0.5, 0.48] },
    ending: { intensity: 0.86, durationMs: 1500, focus: [0.5, 0.44] }
  }[t];
}
function Wi(t, e, a) {
  return Math.min(a, Math.max(e, t));
}
function m4(t, e) {
  return t < e.timing.enterMs ? "enter" : t < e.timing.enterMs + e.timing.establishMs ? "establish" : "dialogue";
}
function v4(t, e = 1.3) {
  const a = e + 1, i = t - 1;
  return 1 + a * i * i * i + e * i * i;
}
function g4(t) {
  return Wi(560 - t * 2600, 90, 600);
}
function _4(t) {
  let e = t, a = 0, i = 0, o = 0, n = 0, r, s = 0, c = [...t.focus], d = [...t.focus], l = {
    phase: "enter",
    progress: 0,
    offset: [0, 0],
    zoom: 1,
    shake: 0,
    focus: [...d]
  };
  const u = (f) => {
    const b = r && a < s ? r : m4(a, e), y = Wi(a / e.timing.enterMs, 0, 1), v = v4(y), g = a < i ? n * (1 - (a - o) / Math.max(1, i - o)) : 0, k = b === "enter" ? 1 + (e.camera.zoom - 1) * v : e.camera.zoom, I = b === "establish" ? Math.sin(a * 17e-4) * 6e-3 : 0;
    if (f > 0) {
      const S = g4(e.camera.damping), T = 1 - Math.exp(-Math.min(f, 250) / S);
      d = [
        d[0] + (c[0] - d[0]) * T,
        d[1] + (c[1] - d[1]) * T
      ];
    }
    return l = {
      phase: b,
      progress: Wi(a / (e.timing.enterMs + e.timing.establishMs), 0, 1),
      offset: [e.camera.offset[0] + I, e.camera.offset[1]],
      zoom: k + g * 0.012,
      shake: Math.max(e.camera.shake * g, g * 0.025),
      focus: [...d]
    }, l;
  };
  return {
    setScene(f) {
      e = f, a = 0, i = 0, o = 0, n = 0, r = void 0, s = 0, c = [...f.focus], u(0);
    },
    setFocus(f) {
      c = [Wi(f[0], 0, 1), Wi(f[1], 0, 1)], u(0);
    },
    trigger(f, b, y) {
      const v = f === "choice-confirm" ? "choice" : f === "route-transition" || f === "chapter-transition" || f === "cg-reveal" || f === "ending" ? "exit" : l.phase;
      (v === "choice" || v === "exit") && (r = v, s = Math.max(s, a + y)), o = a, n = Math.max(n, Wi(b, 0, 1)), i = Math.max(i, a + y), u(0);
    },
    advance(f) {
      return a += Math.max(0, Math.min(f, 250)), u(f);
    },
    snapshot() {
      return l;
    }
  };
}
const ah = {
  atmosphere: 1,
  "dialogue-emphasis": 2,
  "choice-confirm": 3,
  impact: 4,
  "chapter-transition": 5,
  "route-transition": 6,
  "cg-reveal": 6,
  ending: 7
};
function y4(t, e) {
  const a = t === "golden_bough_rebuild" || t === "ring_conspiracy" ? t : "white_canvas", i = s4(e);
  return { band: i, branch: i === "canon" ? "canon" : "au-if", selected: a, reached: i === "canon" ? "canon" : i === "au-boundary" ? "junction" : a, canonReached: !0, junctionReached: i !== "canon" };
}
function w4(t) {
  return {
    uTime: { value: 0 },
    uPulse: { value: 0 },
    uResolution: { value: new t.Vector2(1, 1) },
    uFocus: { value: new t.Vector2(0.5, 0.44) },
    uCameraOffset: { value: new t.Vector2(0, 0) },
    uCameraZoom: { value: 1 },
    uCameraShake: { value: 0 },
    uSceneProgress: { value: 0 },
    uParallax: { value: 0.4 },
    uGrain: { value: 0.19 },
    uBloom: { value: 0.46 },
    uMotifDensity: { value: 0.54 },
    uProfile: { value: 0 },
    uRibbonSource: { value: new t.Vector2(0.34, 0.43) },
    uRibbonTarget: { value: new t.Vector2(0.66, 0.43) },
    uRibbonStrength: { value: 0 },
    uRipple: { value: 0 },
    uAberration: { value: 0 },
    uPaletteFrom: { value: new t.Color(0.95, 0.73, 0.24) },
    uPaletteTo: { value: new t.Color(0.95, 0.73, 0.24) },
    uPaletteMix: { value: 0 }
  };
}
function qi(t, e) {
  return { ...t, ...e };
}
const _a = {
  golden_bough_rebuild: [0.95, 0.73, 0.24, 0.38, 0.15, 0.06],
  white_canvas: [0.82, 0.9, 0.95, 0.18, 0.31, 0.38],
  ring_conspiracy: [0.78, 0.12, 0.16, 0.22, 0.03, 0.05]
}, k4 = {
  canvas: 0,
  rain: 1,
  golden: 2,
  threat: 3,
  gallery: 4,
  ending: 5
};
function $l(t, e) {
  const a = e.visual, i = e.relationshipRibbon;
  t.uParallax.value = a.parallax, t.uGrain.value = a.grain, t.uBloom.value = a.bloom, t.uMotifDensity.value = a.motifDensity, t.uProfile.value = k4[a.profile], t.uRibbonStrength.value = i?.strength ?? 0, i && (t.uRibbonSource.value.set(i.source[0], i.source[1]), t.uRibbonTarget.value.set(i.target[0], i.target[1]));
}
const I4 = {
  static: { particles: 0, branches: 0, motifs: 0, pixelRatio: 1, refraction: 0 },
  low: { particles: 180, branches: 22, motifs: 28, pixelRatio: 1.15, refraction: 0.42 },
  medium: { particles: 320, branches: 36, motifs: 52, pixelRatio: 1.4, refraction: 0.7 },
  high: { particles: 520, branches: 56, motifs: 84, pixelRatio: 1.75, refraction: 1 }
};
function A4(t = "auto", e = !1) {
  return e ? "static" : t === "auto" ? "high" : t;
}
function x4(t = {}) {
  return t.saveData || t.deviceMemory !== void 0 && t.deviceMemory <= 2 || t.coarsePointer ? "low" : (t.hardwareConcurrency ?? 8) <= 4 || t.deviceMemory !== void 0 && t.deviceMemory <= 4 ? "medium" : "high";
}
function T4(t, e) {
  return ah[e.kind] >= t;
}
function S4(t) {
  return {
    atmosphere: 0,
    "dialogue-emphasis": 0,
    "choice-confirm": 1,
    impact: 2,
    "chapter-transition": 3,
    "route-transition": 3,
    "cg-reveal": 4,
    ending: 5
  }[t];
}
function jl(t, e) {
  if (!T4(t, e)) return;
  const a = th(e.kind);
  return {
    kind: e.kind,
    priority: ah[e.kind],
    intensity: e.intensity ?? a.intensity,
    durationMs: e.durationMs ?? a.durationMs,
    focus: e.focus ?? a.focus
  };
}
function C4(t) {
  return I4[t];
}
function P4(t) {
  const a = (typeof globalThis.matchMedia == "function" ? globalThis.matchMedia("(prefers-reduced-motion: reduce)") : void 0)?.matches ?? !1;
  if (t !== void 0 && t !== "auto") return A4(t, a);
  if (a) return "static";
  const i = typeof navigator < "u" ? navigator : void 0, o = typeof globalThis.matchMedia == "function" && globalThis.matchMedia("(pointer: coarse)").matches;
  return x4({
    coarsePointer: o,
    deviceMemory: i?.deviceMemory,
    hardwareConcurrency: i?.hardwareConcurrency,
    saveData: i?.connection?.saveData
  });
}
function ih(t, e) {
  const a = e.canvas ?? document.createElement("canvas");
  a.style.display = "block", a.style.width = "100%", a.style.height = "100%", a.dataset.vfxQuality = "static", a.dataset.vfxQualityLevel = "static", a.dataset.vfxAdaptive = "idle", a.dataset.vfxEffect = "static-svg-fallback", a.dataset.vfxRoute = e.route, a.dataset.vfxSceneId = e.sceneId, a.dataset.vfxPaused = "true", a.dataset.vfxTransition = "idle", a.dataset.vfxTransitionPhase = "idle", a.dataset.vfxCameraPhase = "static", a.dataset.vfxCameraZoom = "1", a.dataset.vfxCameraShake = "0", a.dataset.vfxVisualProfile = "canvas", a.setAttribute("aria-hidden", "true");
  let i, o, n, r = [0.5, 0.44], s = 0.6, c, d;
  const l = (g = e.route) => {
    const k = Math.max(1, t.clientWidth || 1e3), I = Math.max(1, t.clientHeight || 600);
    a.width = k, a.height = I;
    const S = a.getContext("2d");
    if (!S) return;
    S.clearRect(0, 0, k, I);
    const [T, x, D, V, P, R] = _a[g] ?? _a.white_canvas, j = i ?? { profile: "canvas", bloom: 0.46, motifDensity: 0.54 }, Q = (Z) => Math.round(Math.min(1, Math.max(0, Z)) * 255), B = (Z) => `rgba(${Q(T)}, ${Q(x)}, ${Q(D)}, ${Z})`, re = (Z) => `rgba(${Q(V)}, ${Q(P)}, ${Q(R)}, ${Z})`, de = S.createRadialGradient(k * 0.5, I * 0.44, 0, k * 0.5, I * 0.44, Math.max(k, I) * 0.52);
    de.addColorStop(0, B(0.27)), de.addColorStop(0.65, re(0.14)), de.addColorStop(1, "rgba(2, 3, 8, 0)"), S.fillStyle = de, S.fillRect(0, 0, k, I), S.strokeStyle = B(0.4), S.lineWidth = Math.max(1, k / 900), S.beginPath(), S.ellipse(k * 0.5, I * 0.44, k * 0.22, I * 0.28, 0, 0, Math.PI * 2), S.stroke();
    const se = [k * 0.5, I * 0.44], te = Math.round(8 + j.motifDensity * 18);
    if (S.save(), S.globalCompositeOperation = "screen", S.lineWidth = Math.max(1, k / 1500), S.strokeStyle = B(0.13 + j.bloom * 0.18), j.profile === "rain")
      for (let Z = 0; Z < te; Z += 1) {
        const K = Z * 97 % k + k * 0.02, ue = Z * 151 % Math.max(1, I * 0.72) - I * 0.1;
        S.beginPath(), S.moveTo(K, ue), S.lineTo(K - k * 0.045, ue + I * (0.13 + Z % 4 * 0.018)), S.stroke();
      }
    else if (j.profile === "golden" || j.profile === "ending")
      for (let Z = 0; Z < te; Z += 1) {
        const K = Z / te * Math.PI * 2, ue = Math.min(k, I) * (0.19 + Z % 3 * 0.045);
        S.beginPath(), S.arc(se[0], se[1], ue, K, K + 0.32), S.stroke();
      }
    else
      for (let Z = 0; Z < te; Z += 1) {
        const K = Z * 131 % k + k * 0.01, ue = Z * 71 % Math.max(1, I * 0.8) + I * 0.04, Te = Math.max(1, k * (14e-4 + Z % 4 * 5e-4));
        S.fillStyle = B(0.08 + j.bloom * 0.16), S.fillRect(K, ue, Te, Te);
      }
    if (o) {
      const Z = [o.source[0] * k, o.source[1] * I], K = [o.target[0] * k, o.target[1] * I], ue = (Z[0] + K[0]) * 0.5, Te = Math.min(Z[1], K[1]) - I * (0.1 + o.strength * 0.13);
      S.lineWidth = Math.max(1, k / 1100) * (0.7 + o.strength), S.strokeStyle = B(0.16 + j.bloom * 0.18), S.beginPath(), S.moveTo(Z[0], Z[1]), S.quadraticCurveTo(ue, Te, K[0], K[1]), S.stroke();
    }
    if (n) {
      const Z = [r[0] * k, r[1] * I], K = n === "impact";
      K && (S.strokeStyle = re(0.26), S.lineWidth = Math.max(1, k / 1200), S.beginPath(), S.ellipse(Z[0] - k * 0.012 * s, Z[1], k * 0.12 * s, I * 0.16 * s, 0, 0, Math.PI * 2), S.stroke()), S.strokeStyle = K ? "rgba(245, 112, 88, .38)" : B(0.28), S.lineWidth = Math.max(1, k / 1300), S.beginPath(), S.ellipse(Z[0], Z[1], k * 0.12 * s, I * 0.16 * s, 0, 0, Math.PI * 2), S.stroke();
    }
    S.restore();
  };
  a.parentNode || t.append(a);
  let u = e.route, f = !1;
  const b = (g = u) => {
    if (!f)
      try {
        l(g);
      } catch (k) {
        console.error("Albina static VFX fallback failed to paint", k);
      }
  }, y = typeof ResizeObserver < "u" ? new ResizeObserver(() => b()) : void 0;
  y?.observe(t), b();
  const v = (g) => {
    g ? a.dataset.vfxTone = g : delete a.dataset.vfxTone;
    const k = Xs(g);
    k && (a.dataset.vfxCue = k.kind);
  };
  return v(e.tone), {
    canvas: a,
    quality: "static",
    setSceneState(g) {
      if (f) return;
      const k = u !== g.route, I = u;
      u = g.route, a.dataset.vfxSceneId = g.sceneId, a.dataset.vfxRoute = g.route, a.dataset.vfxCameraPhase = "static", a.dataset.vfxCameraZoom = "1", a.dataset.vfxCameraShake = "0", g.focus && (r = g.focus, a.dataset.vfxCameraFocus = `${g.focus[0]},${g.focus[1]}`), v(g.tone), k && (c = _a[I]?.slice(0, 3) ?? _a.white_canvas.slice(0, 3), d = _a[g.route]?.slice(0, 3) ?? _a.white_canvas.slice(0, 3), a.dataset.vfxPaletteFrom = c.join(","), a.dataset.vfxPaletteTo = d.join(","), a.dataset.vfxPaletteMix = "1", a.dataset.vfxTransition = "static"), b(g.route);
    },
    setPresentation(g) {
      f || (i = g.visual, o = g.relationshipRibbon, r = g.focus, a.dataset.vfxVisualProfile = g.visual.profile, a.dataset.vfxRibbon = o ? "active" : "idle", o ? (a.dataset.vfxRibbonSource = o.sourceCharacterId, a.dataset.vfxRibbonTarget = o.targetCharacterId) : (delete a.dataset.vfxRibbonSource, delete a.dataset.vfxRibbonTarget), a.dataset.vfxCameraPhase = "static", a.dataset.vfxCameraMode = g.camera.mode, a.dataset.vfxCameraZoom = String(g.camera.zoom), a.dataset.vfxCameraShake = String(g.camera.shake), a.dataset.vfxCameraFocus = `${g.focus[0]},${g.focus[1]}`, b(u));
    },
    emit(g) {
      f || (n = g.kind === "impact" || g.kind === "choice-confirm" || g.kind === "cg-reveal" ? g.kind : void 0, s = g.intensity ?? th(g.kind).intensity, a.dataset.vfxCue = g.kind, a.dataset.vfxRipple = n ? "static" : "idle", a.dataset.vfxRippleIntensity = s.toFixed(3), a.dataset.vfxAberration = g.kind === "impact" || g.kind === "cg-reveal" ? "static" : "idle", a.dataset.vfxTransition = g.kind === "route-transition" || g.kind === "chapter-transition" || g.kind === "cg-reveal" || g.kind === "ending" ? "static" : "idle", a.dataset.vfxTransitionPhase = "idle", b());
    },
    setState(g, k) {
      f || (u = g, a.dataset.vfxRoute = g, a.dataset.vfxSceneId = k, b(g));
    },
    // Vue owns the canvas node when the static fallback is rendered by the
    // component. Disposal only clears its drawing surface; unmount removes it.
    dispose() {
      f || (f = !0, y?.disconnect(), a.getContext("2d")?.clearRect(0, 0, a.width, a.height), a.dataset.vfxContext = "disposed");
    }
  };
}
function R4(t, e) {
  const a = new t.PlaneGeometry(2, 2), i = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    depthTest: !1,
    blending: t.AdditiveBlending,
    uniforms: qi(e, {
      uPrimary: { value: new t.Color() },
      uSecondary: { value: new t.Color() }
    }),
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
    // A back-stage layer inspired by the scroll demo's camera journey: the
    // authored scene progress creates depth drift while the focus preserves a
    // quiet readable pocket for the character portrait and dialogue.
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uSceneProgress; uniform float uParallax; uniform float uBloom; uniform float uProfile;
      uniform vec2 uResolution; uniform vec2 uFocus; uniform vec3 uPrimary; uniform vec3 uSecondary;
      float hash(vec2 p){return fract(sin(dot(p,vec2(27.17,91.73)))*43758.5453);}
      float grid(vec2 p, float scale, float width){vec2 q=abs(fract(p*scale)-.5);return 1.0-smoothstep(width,width+.012,min(q.x,q.y));}
      void main(){
        vec2 aspect=vec2(uResolution.x/max(1.0,uResolution.y),1.0);
        vec2 uv=vUv;
        vec2 p=(uv-.5)*aspect;
        vec2 focal=(uv-uFocus)*aspect;
        float distanceToFocus=length(focal);
        float progress=uSceneProgress*uParallax;
        float horizon=smoothstep(.64,.12,uv.y);
        float arc=1.0-smoothstep(.003,.018,abs(length(p+vec2(progress*.08,0.12))-0.42));
        float gridLines=grid(uv+vec2(progress*.035,-progress*.02),mix(7.0,17.0,uParallax),.015);
        float stars=step(.986,hash(floor((uv+progress*.03)*vec2(118.0,74.0))))*(.45+.55*sin(uTime*1.3+hash(floor(uv*67.0))*6.28));
        float gallery=step(.5,uProfile)*step(uProfile,4.5)*(1.0-smoothstep(.04,.32,abs(fract(uv.x*8.0+progress)-.5)));
        float protected=smoothstep(.12,.48,distanceToFocus);
        float alpha=(horizon*.055+arc*.13+gridLines*.025+stars*.11+gallery*.035)*(0.3+uBloom*.7)*protected;
        vec3 color=mix(uSecondary,uPrimary,clamp(horizon+arc+stars,0.0,1.0));
        gl_FragColor=vec4(color,alpha);
      }`
  }), o = new t.Mesh(a, i);
  return o.frustumCulled = !1, o.renderOrder = -2, { mesh: o, geometry: a, material: i };
}
function V4(t, e, a) {
  const i = new t.BufferGeometry(), o = new Float32Array(e * 3), n = new Float32Array(e);
  for (let c = 0; c < e; c += 1)
    o[c * 3] = Math.random() * 2 - 1, o[c * 3 + 1] = Math.random() * 2 - 1, o[c * 3 + 2] = 0.25 + Math.random() * 0.5, n[c] = Math.random();
  i.setAttribute("position", new t.BufferAttribute(o, 3)), i.setAttribute("aSeed", new t.BufferAttribute(n, 1));
  const r = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    blending: t.AdditiveBlending,
    uniforms: qi(a, { uPrimary: { value: new t.Color() }, uSecondary: { value: new t.Color() } }),
    vertexShader: `
      attribute float aSeed; varying float vSeed; varying float vAlpha;
      uniform float uTime; uniform float uPulse; uniform float uSceneProgress; uniform float uMotifDensity; uniform float uParallax; uniform vec2 uFocus;
      void main(){
        vec3 p=position;
        float drift=(uTime*.035+uSceneProgress*.1)*(0.35+uParallax);
        p.x+=sin(uTime*.23+aSeed*43.0)*(.028+uParallax*.045);
        p.y+=cos(uTime*.18+aSeed*29.0)*(.018+uParallax*.032);
        p.y=mod(p.y+drift,2.18)-1.09;
        float focusFade=smoothstep(.06,.34,length(p.xy-uFocus*2.0+1.0));
        vSeed=aSeed;
        vAlpha=(.06+aSeed*.22+uPulse*.35)*uMotifDensity*focusFade;
        gl_Position=vec4(p.xy,p.z*.16,1.0);
        gl_PointSize=(2.0+aSeed*7.0+uPulse*13.0)*(0.45+uMotifDensity*.8);
      }`,
    fragmentShader: `
      uniform vec3 uPrimary; uniform vec3 uSecondary; uniform float uProfile; varying float vSeed; varying float vAlpha;
      void main(){
        vec2 p=gl_PointCoord-.5;
        float d=length(p);
        float petal=abs(p.x)*.7+abs(p.y*1.35);
        float disc=1.0-smoothstep(.12,.5,d);
        float shard=1.0-smoothstep(.13,.52,petal);
        float rain=mix(disc,shard,step(.45,uProfile));
        vec3 color=mix(uSecondary,uPrimary,fract(vSeed*7.13));
        gl_FragColor=vec4(color,rain*vAlpha);
      }`
  }), s = new t.Points(i, r);
  return s.frustumCulled = !1, s.renderOrder = 1, { points: s, geometry: i, material: r };
}
function E4(t, e) {
  const a = new t.PlaneGeometry(2, 2), i = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    depthTest: !1,
    blending: t.AdditiveBlending,
    uniforms: qi(e, {
      uPrimary: { value: new t.Color() },
      uSecondary: { value: new t.Color() }
    }),
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
    // Screen-space only: the line has narrative meaning (staged counterpart to
    // speaker), but does not claim a 3D character rig or gameplay targeting.
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uPulse; uniform float uRibbonStrength; uniform float uProfile; uniform vec2 uResolution; uniform vec2 uRibbonSource; uniform vec2 uRibbonTarget; uniform vec3 uPrimary; uniform vec3 uSecondary;
      float segment(vec2 point, vec2 start, vec2 end){vec2 pa=point-start, ba=end-start;float h=clamp(dot(pa,ba)/max(dot(ba,ba),.0001),0.0,1.0);return length(pa-ba*h);}
      void main(){
        vec2 aspect=vec2(uResolution.x/max(uResolution.y,1.0),1.0);
        vec2 source=(uRibbonSource-.5)*aspect;
        vec2 target=(uRibbonTarget-.5)*aspect;
        vec2 point=(vUv-.5)*aspect;
        vec2 middle=(source+target)*.5;
        vec2 direction=target-source;
        vec2 normal=normalize(vec2(-direction.y,direction.x)+.00001);
        float arc=(.055+uRibbonStrength*.1)*(0.72+.28*sin(uTime*.7));
        vec2 bowed=point-normal*arc*(1.0-clamp(abs(dot(point-middle,normalize(direction)+.00001))/max(length(direction)*.5,.001),0.0,1.0));
        float distanceToRibbon=segment(bowed,source,target);
        float width=.0018+uRibbonStrength*.004+uPulse*.002;
        float core=1.0-smoothstep(width,width+.0035,distanceToRibbon);
        float halo=1.0-smoothstep(width,width+.019,distanceToRibbon);
        float profileGlow=.72+.28*step(2.5,uProfile);
        vec3 color=mix(uSecondary,uPrimary,.72);
        gl_FragColor=vec4(color,(core*.7+halo*.16)*uRibbonStrength*profileGlow);
      }`
  }), o = new t.Mesh(a, i);
  return o.frustumCulled = !1, o.renderOrder = 2, { mesh: o, geometry: a, material: i };
}
function O4(t, e) {
  const a = new t.PlaneGeometry(2, 2), i = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    depthTest: !1,
    blending: t.AdditiveBlending,
    uniforms: qi(e, { uPrimary: { value: new t.Color() }, uRippleMode: { value: 0 } }),
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uRipple; uniform float uRippleMode; uniform vec2 uResolution; uniform vec2 uFocus; uniform vec3 uPrimary;
      void main(){
        vec2 aspect=vec2(uResolution.x/max(uResolution.y,1.0),1.0);
        float distanceToFocus=length((vUv-uFocus)*aspect);
        float radius=mix(.035,.62,1.0-uRipple);
        float band=1.0-smoothstep(.004,.024,abs(distanceToFocus-radius));
        float inner=1.0-smoothstep(.02,.32,distanceToFocus)*(1.0-uRipple)*.14;
        vec3 color=mix(uPrimary,vec3(.96,.28,.2),step(1.5,uRippleMode));
        gl_FragColor=vec4(color,(band*.64+inner)*uRipple);
      }`
  }), o = new t.Mesh(a, i);
  return o.frustumCulled = !1, o.renderOrder = 4, { mesh: o, geometry: a, material: i };
}
function M4(t, e, a) {
  const i = new t.PlaneGeometry(2, 2), o = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    depthTest: !1,
    uniforms: qi(e, {
      uPrimary: { value: new t.Color() },
      uSecondary: { value: new t.Color() },
      uRoute: { value: 0 },
      uRefraction: { value: a }
    }),
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime; uniform float uPulse; uniform float uRoute; uniform float uRefraction; uniform float uAberration;
      uniform float uCameraZoom; uniform float uCameraShake;
      uniform vec2 uResolution; uniform vec2 uFocus; uniform vec2 uCameraOffset; uniform vec3 uPrimary; uniform vec3 uSecondary;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
      void main(){
      vec2 uv=(vUv-.5)/max(uCameraZoom,.001)+.5+uCameraOffset;
      vec2 p=(uv-.5)*vec2(uResolution.x/max(uResolution.y,1.0),1.0);
      vec2 focusDelta=(uv-uFocus)*vec2(uResolution.x/max(uResolution.y,1.0),1.0);
        float focusDistance=length(focusDelta);
        float focusProtection=smoothstep(.16,.42,focusDistance);
        // Impact aberration splits the atmospheric layers per RGB channel with
        // a decaying shock envelope; it stays zero for ordinary scenes so the
        // channel samples collapse to the single authored composition.
        float aberr=uAberration*.016;
        vec2 pr=uv+vec2(aberr,0.0);
        vec2 pb=uv-vec2(aberr,0.0);
        float mistR=noise(pr*3.2+vec2(uTime*.025,-uTime*.04))*noise(pr*6.0-vec2(uTime*.03,0.0));
        float mistG=noise(uv*3.2+vec2(uTime*.025,-uTime*.04))*noise(uv*6.0-vec2(uTime*.03,0.0));
        float mistB=noise(pb*3.2+vec2(uTime*.025,-uTime*.04))*noise(pb*6.0-vec2(uTime*.03,0.0));
        vec2 rainCell=vec2(floor(uv.x*94.0),floor((uv.y-uTime*.36)*7.0));
        float rainSeed=hash(rainCell);
        float rain=pow(max(0.0,1.0-abs(fract((uv.x+uv.y*.12)*94.0-uTime*1.7+rainSeed)-.5)*18.0),5.0);
        rain*=1.0-smoothstep(.1,.68,fract(uv.y*2.3-uTime*1.1+hash(vec2(floor(uv.x*94.0),0.0))));
        rain*=mix(.16,1.0,focusProtection);
        float mirrorBand=exp(-abs(uv.y-.72)*18.0);
        float mirrorR=mirrorBand*(noise(vec2(pr.x*18.0,uTime*.12))*.55+.2);
        float mirrorG=mirrorBand*(noise(vec2(uv.x*18.0,uTime*.12))*.55+.2);
        float mirrorB=mirrorBand*(noise(vec2(pb.x*18.0,uTime*.12))*.55+.2);
        float ripplePhase=focusDistance*34.0-uTime*1.35;
        float refractedRipple=(.5+.5*sin(ripplePhase))*exp(-focusDistance*3.8);
        refractedRipple*=smoothstep(.12,.3,focusDistance)*uRefraction;
        float rainPrism=rain*uRefraction*(.32+.68*mirrorBand);
        float ring=abs(length(p)-(.22+sin(uTime*.3)*.012)); ring=(1.0-smoothstep(0.0,.018,ring))*(uRoute>.65?1.0:.18);
        float canvasGrid=(1.0-smoothstep(0.0,.018,abs(fract(uv.x*12.0)-.5)))*(uRoute>.2&&uRoute<.65?.13:.025);
        float boughLens=(1.0-smoothstep(.0,.025,abs(fract(ripplePhase*.14)-.5)))*(1.0-smoothstep(.02,.28,uRoute));
        boughLens*=refractedRipple*focusProtection;
        float energy=mistG*.28+rain*.2+mirrorG*.24+ring*.38+canvasGrid+boughLens*.34;
        vec3 color=vec3(
          mix(uSecondary.r,uPrimary.r,clamp(mistR+mirrorR+ring,0.0,1.0)),
          mix(uSecondary.g,uPrimary.g,clamp(mistG+mirrorG+ring,0.0,1.0)),
          mix(uSecondary.b,uPrimary.b,clamp(mistB+mirrorB+ring,0.0,1.0))
        );
        color+=vec3(rainPrism*.11,rainPrism*.04,rainPrism*.16);
        color+=mix(uPrimary,vec3(1.0,.82,.36),.44)*boughLens;
        color+=uPrimary*uPulse*.55*(1.0-length(p)*.65);
        float vignette=1.0-smoothstep(.28,.82,length(p));
        float portraitClarity=mix(.38,1.0,focusProtection);
        gl_FragColor=vec4(color,energy*vignette*portraitClarity+uPulse*.11*focusProtection);
      }`
  }), n = new t.Mesh(i, o);
  return n.frustumCulled = !1, { mesh: n, geometry: i, material: o };
}
function $4(t, e) {
  const a = new t.PlaneGeometry(2, 2), i = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    depthTest: !1,
    uniforms: qi(e, {
      uTransition: { value: 0 },
      uTransitionMode: { value: 0 },
      uPrimary: { value: new t.Color() }
    }),
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}",
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float uTransition; uniform float uTransitionMode; uniform float uPulse; uniform float uCameraZoom; uniform vec2 uCameraOffset; uniform vec2 uFocus; uniform vec3 uPrimary;
      uniform vec3 uPaletteFrom; uniform vec3 uPaletteTo; uniform float uPaletteMix;
      float lineMask(float value, float width){return 1.0-smoothstep(0.0,width,abs(fract(value)-.5));}
      void main(){
      vec2 delta=(vUv-.5)/max(uCameraZoom,.001)+.5+uCameraOffset-uFocus;
      float distanceFromFocus=length(delta*vec2(1.25,1.0));
        float edge=smoothstep(.18,.86,distanceFromFocus);
        float scan=0.72+0.28*sin((vUv.y+vUv.x*.08)*48.0);
        float radial=1.0-smoothstep(.06,.78,distanceFromFocus);
        float choice=lineMask(vUv.x*9.0+vUv.y*2.0, .055)*(.32+.68*edge);
        float impact=lineMask(vUv.x*18.0-vUv.y*7.0, .035)*smoothstep(.72,.05,distanceFromFocus);
        float chapter=lineMask(distanceFromFocus*7.0, .045)*(.2+.8*edge);
        float reveal=smoothstep(.12,.72,distanceFromFocus)*scan;
        float ending=pow(max(0.0,1.0-distanceFromFocus),2.2)+chapter*.4;
        float pattern=scan;
        if (uTransitionMode > .5 && uTransitionMode < 1.5) pattern=choice;
        else if (uTransitionMode > 1.5 && uTransitionMode < 2.5) pattern=impact;
        else if (uTransitionMode > 2.5 && uTransitionMode < 3.5) pattern=chapter;
        else if (uTransitionMode > 3.5 && uTransitionMode < 4.5) pattern=reveal;
        else if (uTransitionMode > 4.5) pattern=ending;
        float alpha=uTransition*(.12+.29*edge)*pattern;
        alpha+=uTransition*radial*(uTransitionMode > 4.5 ? .30 : 0.0);
        alpha+=uPulse*.035*(1.0-smoothstep(.0,.9,distanceFromFocus));
        // Route transitions cross-fade the veil tint from the previous route's
        // palette to the incoming one, so a route change reads as continuous
        // colour travel instead of an abrupt palette swap.
        vec3 paletteColor=mix(uPaletteFrom,uPaletteTo,uPaletteMix);
        vec3 color=mix(paletteColor,vec3(.02,.025,.04),.32);
        if (uTransitionMode > 1.5 && uTransitionMode < 2.5) color=mix(color,vec3(.96,.32,.22),.42);
        if (uTransitionMode > 3.5 && uTransitionMode < 4.5) color=mix(color,vec3(.92,.97,1.0),.46);
        gl_FragColor=vec4(color,alpha);
      }`
  }), o = new t.Mesh(a, i);
  return o.frustumCulled = !1, { mesh: o, geometry: a, material: i };
}
function j4(t, e, a) {
  const i = new t.BufferGeometry(), o = new Float32Array(e * 3), n = new Float32Array(e);
  for (let c = 0; c < e; c += 1)
    o[c * 3] = Math.random() * 2 - 1, o[c * 3 + 1] = Math.random() * 2 - 1, o[c * 3 + 2] = Math.random(), n[c] = Math.random();
  i.setAttribute("position", new t.BufferAttribute(o, 3)), i.setAttribute("aSeed", new t.BufferAttribute(n, 1));
  const r = new t.ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    blending: t.AdditiveBlending,
    uniforms: qi(a, { uPrimary: { value: new t.Color() } }),
    vertexShader: `
      attribute float aSeed; uniform float uTime; uniform float uPulse; varying float vAlpha;
      void main(){vec3 p=position;p.y=mod(p.y+uTime*(.018+aSeed*.035)+1.0,2.0)-1.0;p.x+=sin(uTime*.17+aSeed*31.0)*.045;vAlpha=.18+aSeed*.42+uPulse*.3;gl_Position=vec4(p.xy,p.z*.2,1.0);gl_PointSize=(1.2+aSeed*2.7)*(1.0+uPulse*.45);}`,
    fragmentShader: "uniform vec3 uPrimary; varying float vAlpha; void main(){vec2 p=gl_PointCoord-.5;float d=length(p);float a=(1.0-smoothstep(.03,.5,d))*vAlpha;gl_FragColor=vec4(uPrimary,a);}"
  }), s = new t.Points(i, r);
  return s.frustumCulled = !1, { points: s, geometry: i, material: r };
}
function z4(t, e) {
  const a = new Float32Array(e * 6);
  for (let r = 0; r < e; r += 1) {
    const s = Math.random() * 2 - 1, c = Math.random() * 2 - 1;
    a.set([s, c, 0, s + (Math.random() - 0.5) * 0.34, c + Math.random() * 0.42, 0], r * 6);
  }
  const i = new t.BufferGeometry();
  i.setAttribute("position", new t.BufferAttribute(a, 3));
  const o = new t.LineBasicMaterial({ color: 14068538, transparent: !0, opacity: 0.18, blending: t.AdditiveBlending });
  return { lines: new t.LineSegments(i, o), geometry: i, material: o };
}
function zl(t, e, a) {
  const i = _a[e] ?? _a.white_canvas, o = new t.Color(i[0], i[1], i[2]), n = new t.Color(i[3], i[4], i[5]);
  for (const r of a)
    "uniforms" in r ? (r.uniforms.uPrimary?.value.copy(o), r.uniforms.uSecondary?.value.copy(n), r.uniforms.uRoute && (r.uniforms.uRoute.value = e === "ring_conspiracy" ? 1 : e === "white_canvas" ? 0.45 : 0)) : r.color.copy(o);
}
function gs(t, e) {
  const a = _a[e] ?? _a.white_canvas;
  return new t.Color(a[0], a[1], a[2]);
}
function U4(t, e, a) {
  let i = 0, o = 0, n;
  return {
    tick(r) {
      if (o === 0) {
        o = r;
        return;
      }
      i += 1;
      const s = r - o;
      if (s < 1e3) return;
      const c = i * 1e3 / s;
      i = 0, o = r, c < t ? n === void 0 ? n = r : r - n >= e && (n = r, a()) : n = void 0;
    }
  };
}
const F4 = 42, q4 = 3e3, Z4 = { high: 1.75, medium: 1.4, low: 1.15, static: 1 };
function Ul(t) {
  return t === "golden_bough_rebuild";
}
function L4(t, e, a) {
  const i = P4(a.quality);
  if (i === "static")
    return ih(e, a);
  const o = C4(i), n = typeof globalThis.location < "u" && new URLSearchParams(globalThis.location.search).has("vfx-proof"), r = new t.WebGLRenderer({
    alpha: !0,
    antialias: i === "high",
    powerPreference: "high-performance",
    preserveDrawingBuffer: n
  }), s = new t.Scene(), c = new t.OrthographicCamera(-1, 1, 1, -1, 0, 2), d = new t.Clock(), l = w4(t), u = R4(t, l), f = M4(t, l, o.refraction), b = j4(t, o.particles, l), y = V4(t, o.motifs, l), v = z4(t, o.branches), g = E4(t, l), k = O4(t, l), I = $4(t, l), S = k.material.uniforms.uRippleMode;
  if (!S) throw new Error("Focus ripple mode uniform was not created.");
  const T = I.material.uniforms.uTransition, x = I.material.uniforms.uTransitionMode;
  if (!T) throw new Error("Transition veil uniform was not created.");
  if (!x) throw new Error("Transition veil mode uniform was not created.");
  let D = 1, V = !1, P = !1, R, j = 0, Q = 1, B = 0, re = !1, de = a.route, se = a.sceneId, te = a.chapter, Z = a.presentation ?? eh({ id: se, route: de, tone: a.tone ?? "quiet", portraits: [], ending: void 0 });
  const K = _4(Z);
  let ue = i, Te, Se;
  const Ae = I.material.uniforms.uPaletteFrom, Me = I.material.uniforms.uPaletteTo, ke = I.material.uniforms.uPaletteMix;
  if (!Ae || !Me || !ke) throw new Error("Transition veil palette uniforms were not created.");
  const st = U4(F4, q4, () => {
    if (ue === "high") ue = "medium";
    else if (ue === "medium") ue = "low";
    else return;
    r.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, Z4[ue])), $e(), r.domElement.dataset.vfxAdaptive = "active", r.domElement.dataset.vfxQualityLevel = ue, a.onQualityDownshift?.(ue);
  });
  c.position.z = 1, s.add(
    u.mesh,
    f.mesh,
    b.points,
    v.lines,
    y.points,
    g.mesh,
    k.mesh,
    I.mesh
  ), g.mesh.visible = l.uRibbonStrength.value > 0, k.mesh.visible = !1, I.mesh.renderOrder = 3, I.mesh.visible = !1, v.lines.visible = Ul(a.route), r.setClearColor(0, 0), r.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, o.pixelRatio)), r.domElement.dataset.vfxQuality = i, r.domElement.dataset.vfxQualityLevel = i, r.domElement.dataset.vfxAdaptive = "idle", r.domElement.dataset.vfxEffect = "mirror-rain-bough-refraction", r.domElement.dataset.vfxSceneId = se, r.domElement.dataset.vfxRoute = de, r.domElement.dataset.vfxPaused = "true", r.domElement.dataset.vfxCameraPhase = "enter", r.domElement.dataset.vfxCameraProgress = "0", r.domElement.dataset.vfxCameraZoom = "1", r.domElement.dataset.vfxCameraShake = "0", r.domElement.dataset.vfxVisualProfile = Z.visual.profile, r.domElement.dataset.vfxLayerStack = "stage,atmosphere,particles,motifs,ribbon,ripple,transition", r.domElement.dataset.vfxRibbon = Z.relationshipRibbon ? "active" : "idle", r.domElement.dataset.vfxRipple = "idle", Z.relationshipRibbon && (r.domElement.dataset.vfxRibbonSource = Z.relationshipRibbon.sourceCharacterId, r.domElement.dataset.vfxRibbonTarget = Z.relationshipRibbon.targetCharacterId), r.domElement.setAttribute("aria-hidden", "true"), l.uFocus.value.set(Z.focus[0], Z.focus[1]), $l(l, Z), r.domElement.dataset.vfxCameraFocus = `${Z.focus[0]},${Z.focus[1]}`, r.domElement.dataset.vfxCameraMode = Z.camera.mode, e.append(r.domElement), zl(t, a.route, [u.material, f.material, b.material, y.material, v.material, g.material, k.material, I.material]);
  const $e = () => {
    const H = Math.max(e.clientWidth, 1), Y = Math.max(e.clientHeight, 1);
    r.setSize(H, Y, !1), l.uResolution.value.set(H * r.getPixelRatio(), Y * r.getPixelRatio());
  }, Tt = typeof ResizeObserver < "u" ? new ResizeObserver($e) : void 0;
  Tt?.observe(e), $e();
  const ct = (H) => {
    H.preventDefault(), re = !0, r.domElement.dataset.vfxContext = "lost", C(), a.onContextLost();
  };
  r.domElement.addEventListener("webglcontextlost", ct);
  let wt = !0, dt;
  const Qt = () => {
    const H = typeof document < "u" && document.hidden, Y = wt && !H;
    r.domElement.dataset.vfxViewport = Y ? "visible" : "hidden", Y ? ae() : C();
  };
  typeof IntersectionObserver < "u" && (dt = new IntersectionObserver((H) => {
    wt = H.some((Y) => Y.isIntersecting), Qt();
  }, { threshold: 0.02 }), dt.observe(e));
  const _ = () => {
    R !== void 0 && globalThis.clearTimeout(R), R = void 0, B = 0;
  }, A = (H, Y, ce) => {
    I.mesh.visible && Y < B || (_(), B = Y, j = d.getElapsedTime(), Q = Math.max(1, H), I.mesh.visible = !0, T.value = 0, x.value = S4(ce), r.domElement.dataset.vfxTransition = "active", r.domElement.dataset.vfxTransitionKind = ce, r.domElement.dataset.vfxTransitionPhase = "enter", R = globalThis.setTimeout(() => {
      R = void 0, V || (r.domElement.dataset.vfxTransition = "idle", r.domElement.dataset.vfxTransitionPhase = "idle", I.mesh.visible = !1, T.value = 0);
    }, H));
  }, z = () => typeof globalThis.performance < "u" && typeof globalThis.performance.now == "function" ? globalThis.performance.now() : Date.now(), G = {}, N = (H, Y) => {
    G[H] !== Y && (G[H] = Y, r.domElement.dataset[H] = Y);
  }, J = () => {
    if (V) return;
    const H = Math.min(d.getDelta(), 0.25), Y = d.getElapsedTime(), ce = K.advance(H * 1e3);
    if (D = Math.max(0, D - 0.018), l.uTime.value = Y, l.uPulse.value = Math.max(D, ce.shake), l.uCameraOffset.value.set(ce.offset[0], ce.offset[1]), l.uCameraZoom.value = ce.zoom, l.uCameraShake.value = ce.shake, l.uSceneProgress.value = ce.progress, l.uFocus.value.set(ce.focus[0], ce.focus[1]), l.uAberration.value = l.uAberration.value < 4e-3 ? 0 : l.uAberration.value * Math.exp(-H / 0.09), l.uRipple.value = Math.max(0, D - 0.08) * (k.mesh.visible ? 1 : 0), l.uRipple.value < 0.015 && (k.mesh.visible = !1, r.domElement.dataset.vfxRipple = "idle"), N("vfxCameraPhase", ce.phase), N("vfxCameraProgress", ce.progress.toFixed(3)), N("vfxCameraZoom", ce.zoom.toFixed(4)), N("vfxCameraShake", ce.shake.toFixed(4)), N("vfxCameraFocus", `${ce.focus[0].toFixed(4)},${ce.focus[1].toFixed(4)}`), I.mesh.visible) {
      const ye = Math.min(1, Math.max(0, (Y - j) * 1e3 / Q)), Re = Math.sin(Math.PI * ye);
      T.value = Re, Te && Se ? (Ae.value.copy(Te), Me.value.copy(Se), ke.value = Math.min(1, ye * 2)) : ke.value = 0, N("vfxTransitionPhase", ye < 0.24 ? "enter" : ye < 0.72 ? "hold" : "exit");
    }
    v.lines.rotation.z = Math.sin(Y * 0.07) * 0.018, st.tick(z()), r.render(s, c);
  }, ae = () => {
    V || re || typeof document < "u" && document.hidden || P || (P = !0, d.start(), r.setAnimationLoop(J), r.domElement.dataset.vfxPaused = "false");
  }, C = () => {
    P && (P = !1, d.stop(), r.setAnimationLoop(null), r.domElement.dataset.vfxPaused = "true");
  }, O = () => {
    Qt();
  };
  typeof document < "u" && document.addEventListener("visibilitychange", O);
  const m = (H) => {
    const Y = I.mesh.visible ? jl(B, H) : jl(0, H);
    if (!Y) return;
    K.setFocus(Y.focus), l.uAberration.value = Y.kind === "impact" ? Y.intensity * 0.85 : Y.kind === "cg-reveal" ? Y.intensity * 0.4 : 0;
    const ce = Y.kind === "impact" || Y.kind === "choice-confirm" || Y.kind === "cg-reveal";
    k.mesh.visible = ce, l.uRipple.value = ce ? Y.intensity : 0, S.value = Y.kind === "impact" ? 2 : Y.kind === "cg-reveal" ? 1 : 0, r.domElement.dataset.vfxRipple = ce ? "active" : "idle", K.trigger(Y.kind, Y.intensity, Y.durationMs), D = Math.max(D, Y.intensity), r.domElement.dataset.vfxCue = Y.kind, A(Y.durationMs, Y.priority, Y.kind);
  }, ee = (H) => {
    Z = H, K.setScene(H), $l(l, H), g.mesh.visible = l.uRibbonStrength.value > 0, r.domElement.dataset.vfxVisualProfile = H.visual.profile, r.domElement.dataset.vfxRibbon = H.relationshipRibbon ? "active" : "idle", H.relationshipRibbon ? (r.domElement.dataset.vfxRibbonSource = H.relationshipRibbon.sourceCharacterId, r.domElement.dataset.vfxRibbonTarget = H.relationshipRibbon.targetCharacterId) : (delete r.domElement.dataset.vfxRibbonSource, delete r.domElement.dataset.vfxRibbonTarget), r.domElement.dataset.vfxCameraFocus = `${H.focus[0]},${H.focus[1]}`, r.domElement.dataset.vfxCameraMode = H.camera.mode;
  }, ie = (H) => {
    const Y = de;
    if (zl(t, H.route, [u.material, f.material, b.material, y.material, v.material, g.material, k.material, I.material]), v.lines.visible = Ul(H.route), de = H.route, se = H.sceneId, te = H.chapter, Y !== H.route)
      Te = gs(t, Y), Se = gs(t, H.route), ke.value = 0;
    else {
      Te = void 0, Se = void 0, ke.value = 0;
      const ce = gs(t, H.route);
      Ae.value.copy(ce), Me.value.copy(ce);
    }
    if (r.domElement.dataset.vfxSceneId = se, r.domElement.dataset.vfxRoute = de, H.tone) {
      r.domElement.dataset.vfxTone = H.tone;
      const ce = Xs(H.tone);
      ce && m(ce);
    } else delete r.domElement.dataset.vfxTone;
  };
  if (a.tone) {
    const H = Xs(a.tone);
    H && m(H);
  }
  return Qt(), {
    canvas: r.domElement,
    quality: i,
    setSceneState: ie,
    setPresentation: ee,
    emit: m,
    setState(H, Y) {
      ie({ route: H, sceneId: Y, ...te !== void 0 ? { chapter: te } : {} });
    },
    dispose() {
      V || (V = !0, _(), Tt?.disconnect(), dt?.disconnect(), typeof document < "u" && document.removeEventListener("visibilitychange", O), C(), r.domElement.removeEventListener("webglcontextlost", ct), r.domElement.dataset.vfxContext = "disposed", u.geometry.dispose(), u.material.dispose(), f.geometry.dispose(), f.material.dispose(), I.geometry.dispose(), I.material.dispose(), b.geometry.dispose(), b.material.dispose(), y.geometry.dispose(), y.material.dispose(), g.geometry.dispose(), g.material.dispose(), k.geometry.dispose(), k.material.dispose(), v.geometry.dispose(), v.material.dispose(), r.dispose(), r.forceContextLoss(), r.domElement.remove());
    }
  };
}
const N4 = /* @__PURE__ */ new Set(["atmosphere", "dialogue-emphasis", "choice-confirm"]), D4 = 180;
function B4(t, e = () => typeof performance < "u" ? performance.now() : Date.now()) {
  let a = !1;
  const i = /* @__PURE__ */ new Map(), o = (n) => {
    if (a) return;
    const r = h4.safeParse(n);
    if (!r.success) return;
    const s = e();
    if (N4.has(r.data.kind)) {
      const c = i.get(r.data.kind);
      if (c !== void 0 && s - c < D4) return;
      i.set(r.data.kind, s);
    }
    t(r.data);
  };
  return {
    emit: o,
    commitScene(n) {
      if (a) return;
      const r = n.previousRoute !== void 0 && n.previousRoute !== n.route, s = n.previousSceneId !== void 0 && n.previousSceneId !== n.sceneId, c = n.previousChapter !== void 0 && n.chapter !== void 0 && n.previousChapter !== n.chapter;
      n.tone === "threat" ? o({ kind: "impact" }) : n.tone === "gallery" ? o({ kind: "cg-reveal" }) : n.tone === "golden" || r ? o({ kind: r ? "route-transition" : "chapter-transition" }) : s || c ? o({ kind: "chapter-transition" }) : n.tone === "quiet" && o({ kind: "dialogue-emphasis" });
    },
    dispose() {
      a = !0, i.clear();
    }
  };
}
function oh(t) {
  return t?.type === "pagehide" && "persisted" in t && t.persisted === !0;
}
function xn(t) {
  if (t.parent === t) return t;
  try {
    return t.parent.document?.body ? t.parent : t;
  } catch {
    return t;
  }
}
const H4 = ["data-vfx-mode", "data-vfx-adaptive", "data-vfx-quality-level", "data-vfx-transition", "data-semantic-cue", "data-cue-nonce", "data-scene-id", "data-continuity-band", "data-route-reached", "data-active-route", "data-scene-tone", "data-visual-profile"], J4 = ["data-visual-profile"], G4 = ["data-route-scene"], W4 = { id: "route-map-description" }, K4 = {
  class: "scene-atmosphere__route-status",
  "data-testid": "route-status",
  "data-route-status": ""
}, Y4 = ["data-route"], X4 = ["data-band"], Q4 = ["data-junction"], e9 = ["data-vfx-status"], t9 = /* @__PURE__ */ _n({
  __name: "SceneAtmosphere",
  props: {
    reducedMotion: { type: Boolean },
    route: {},
    routePreference: {},
    sceneId: {},
    chapter: {},
    tone: {},
    quality: {},
    presentation: {}
  },
  setup(t, { expose: e }) {
    const a = t, i = ve(() => a.route ?? a.routePreference), o = /* @__PURE__ */ ne(), n = /* @__PURE__ */ ne(), r = /* @__PURE__ */ ne(!1), s = /* @__PURE__ */ ne("idle"), c = /* @__PURE__ */ ne("auto"), d = ve(() => a.reducedMotion ? "reduced-motion" : a.quality === "static" ? "static-quality" : "webgl-unavailable"), l = ve(() => a.reducedMotion || a.quality === "static" || !r.value), u = ve(() => ({
      white_canvas: "White Canvas",
      golden_bough_rebuild: "Golden Bough Rebuild",
      ring_conspiracy: "Ring Conspiracy"
    })[i.value] ?? "White Canvas"), f = ve(() => y4(i.value, a.sceneId)), b = /* @__PURE__ */ ne(!1), y = /* @__PURE__ */ ne("atmosphere"), v = /* @__PURE__ */ ne(0);
    let g, k;
    function I() {
      if (a.reducedMotion) {
        b.value = !1, g && clearTimeout(g), g = void 0;
        return;
      }
      b.value = !0, g && clearTimeout(g), g = setTimeout(() => {
        b.value = !1;
      }, 420);
    }
    function S() {
      k && clearTimeout(k), k = void 0, y.value = "atmosphere";
    }
    function T(se) {
      k && clearTimeout(k), y.value = se.kind, v.value += 1, k = setTimeout(S, Math.max(240, se.durationMs ?? 900));
    }
    let x, D = 0, V;
    function P() {
      D += 1, r.value = !1, x?.dispose(), x = void 0;
    }
    function R() {
      !o.value || x || D < 1 || B();
    }
    function j() {
      return !(a.reducedMotion || !o.value || typeof WebGLRenderingContext > "u");
    }
    function Q(se) {
      x = ih(se, { route: i.value, sceneId: a.sceneId, canvas: n.value }), x.setSceneState({ route: i.value, sceneId: a.sceneId, ...a.chapter !== void 0 ? { chapter: a.chapter } : {}, ...a.tone ? { tone: a.tone } : {}, focus: a.presentation.focus }), x.setPresentation(a.presentation), r.value = !1, s.value = "idle", c.value = "static";
    }
    async function B() {
      const se = ++D;
      x?.dispose(), x = void 0, r.value = !1;
      const te = o.value;
      if (te) {
        if (a.quality === "static" || !j()) {
          Q(te);
          return;
        }
        await Ne();
        try {
          const Z = await import("./three.module-BWYgh0Id.js");
          if (se !== D || !j() || !o.value) return;
          let K;
          if (K = L4(Z, te, {
            route: i.value,
            sceneId: a.sceneId,
            ...a.chapter !== void 0 ? { chapter: a.chapter } : {},
            ...a.quality ? { quality: a.quality } : {},
            ...a.tone ? { tone: a.tone } : {},
            presentation: a.presentation,
            onContextLost: () => {
              se !== D || !o.value || (K?.dispose(), x === K && (x = void 0, Q(te)));
            },
            onQualityDownshift: (ue) => {
              se === D && (s.value = "active", c.value = ue);
            }
          }), se !== D || !j()) {
            K.dispose();
            return;
          }
          x = K, r.value = !0, s.value = "idle", c.value = K.quality;
        } catch {
          se === D && o.value && Q(o.value);
        }
      }
    }
    function re(se) {
      if (T(se), a.reducedMotion || a.quality === "static" || !r.value) {
        b.value = !1, x?.emit(se);
        return;
      }
      I(), x?.emit(se);
    }
    const de = B4(re);
    return yn(() => {
      V = xn(window), V.addEventListener("pagehide", P), V.addEventListener("pageshow", R), B(), !a.reducedMotion && a.quality !== "static" && (window.requestIdleCallback ?? ((Z) => window.setTimeout(Z, 1200)))(() => {
        import("./three.module-BWYgh0Id.js").catch(() => {
        });
      });
    }), ut(() => [a.reducedMotion, a.quality], ([se]) => {
      se && (b.value = !1, g && clearTimeout(g), g = void 0), B();
    }), ut(() => [i.value, a.sceneId, a.chapter, a.tone], ([se, te, Z, K], [ue, Te, Se]) => {
      if (a.reducedMotion && (b.value = !1, g && clearTimeout(g), g = void 0), x?.setSceneState({ route: se, sceneId: te, ...Z !== void 0 ? { chapter: Z } : {}, ...K ? { tone: K } : {}, focus: a.presentation.focus }), x?.setPresentation(a.presentation), de.commitScene({
        route: se,
        sceneId: te,
        ...Z !== void 0 ? { chapter: Z } : {},
        ...K ? { tone: K } : {},
        previousRoute: ue,
        previousSceneId: Te,
        ...Se !== void 0 ? { previousChapter: Se } : {}
      }), a.reducedMotion || a.quality === "static" || !r.value) {
        b.value = !1;
        return;
      }
      I();
    }), wo(() => {
      D += 1, r.value = !1, V?.removeEventListener("pagehide", P), V?.removeEventListener("pageshow", R), V = void 0, g && clearTimeout(g), k && clearTimeout(k), x?.dispose(), de.dispose();
    }), e({ emitCue: re }), (se, te) => (U(), F("aside", {
      class: "scene-atmosphere",
      "aria-label": "Route atmosphere and progress",
      "data-vfx-mode": r.value ? "webgl" : d.value,
      "data-vfx-adaptive": s.value,
      "data-vfx-quality-level": c.value,
      "data-vfx-transition": b.value ? "active" : "idle",
      "data-semantic-cue": y.value,
      "data-cue-nonce": v.value,
      "data-scene-id": t.sceneId,
      "data-continuity-band": f.value.band,
      "data-route-reached": f.value.reached,
      "data-active-route": i.value,
      "data-scene-tone": t.tone ?? "",
      "data-visual-profile": t.presentation.visual.profile
    }, [
      p("div", {
        ref_key: "host",
        ref: o,
        class: "scene-atmosphere__webgl",
        "aria-hidden": "true",
        "data-testid": "scene-webgl"
      }, [
        p("canvas", {
          ref_key: "staticCanvas",
          ref: n,
          class: "scene-atmosphere__static-canvas",
          "aria-hidden": "true",
          style: Ua({ display: r.value ? "none" : "block" })
        }, null, 4)
      ], 512),
      p("div", {
        class: we(["scene-atmosphere__rain", { "is-static": l.value }]),
        "aria-hidden": "true"
      }, null, 2),
      (U(), F("svg", {
        class: "scene-atmosphere__static-refraction",
        viewBox: "0 0 1000 600",
        preserveAspectRatio: "none",
        "aria-hidden": "true",
        "data-testid": "static-refraction",
        "data-visual-profile": t.presentation.visual.profile,
        style: Ua({ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none", opacity: r.value ? "0.16" : "0.5" })
      }, [...te[0] || (te[0] = [
        Gn('<defs data-v-574411d8><radialGradient id="bough-focus" cx="50%" cy="44%" r="48%" data-v-574411d8><stop offset="0" stop-color="#f5d879" stop-opacity="0" data-v-574411d8></stop><stop offset="0.38" stop-color="var(--atmo-core)" stop-opacity="0.08" data-v-574411d8></stop><stop offset="0.72" stop-color="var(--atmo-rim)" stop-opacity="0.34" data-v-574411d8></stop><stop offset="1" stop-color="#111722" stop-opacity="0" data-v-574411d8></stop></radialGradient><linearGradient id="rain-mirror" x1="0" y1="0" x2="0" y2="1" data-v-574411d8><stop offset="0.58" stop-color="#cce6f4" stop-opacity="0" data-v-574411d8></stop><stop offset="0.76" stop-color="var(--atmo-mirror)" stop-opacity="0.22" data-v-574411d8></stop><stop offset="1" stop-color="#40292a" stop-opacity="0" data-v-574411d8></stop></linearGradient></defs><ellipse cx="500" cy="264" rx="286" ry="230" fill="url(#bough-focus)" data-v-574411d8></ellipse><path d="M0 350 Q250 324 500 354 T1000 350 V600 H0Z" fill="url(#rain-mirror)" data-v-574411d8></path><g class="scene-atmosphere__static-motif" fill="none" stroke="var(--atmo-line)" stroke-opacity="0.22" data-v-574411d8><ellipse cx="500" cy="264" rx="205" ry="166" data-v-574411d8></ellipse><ellipse cx="500" cy="264" rx="258" ry="205" stroke-opacity="0.12" data-v-574411d8></ellipse></g>', 4)
      ])], 12, J4)),
      (U(), F("svg", {
        key: v.value,
        class: "scene-atmosphere__semantic-cue",
        viewBox: "0 0 1000 600",
        preserveAspectRatio: "none",
        "aria-hidden": "true",
        "data-testid": "semantic-cue"
      }, [...te[1] || (te[1] = [
        Gn('<g class="scene-atmosphere__cue-choice" data-v-574411d8><path d="M348 428h92M560 428h92M386 390l46 0M568 390l46 0" data-v-574411d8></path><path d="M404 452l28-18M596 452l-28-18" data-v-574411d8></path></g><g class="scene-atmosphere__cue-impact" data-v-574411d8><path d="M500 246v86M456 290h88M468 258l64 64M532 258l-64 64" data-v-574411d8></path><path d="M500 212v-24M500 364v24M422 290h-24M578 290h24" data-v-574411d8></path></g><g class="scene-atmosphere__cue-reveal" data-v-574411d8><rect x="318" y="126" width="364" height="328" rx="8" data-v-574411d8></rect><path d="M350 158h92M558 158h92M350 422h92M558 422h92" data-v-574411d8></path></g><g class="scene-atmosphere__cue-transition" data-v-574411d8><ellipse cx="500" cy="264" rx="186" ry="148" data-v-574411d8></ellipse><ellipse cx="500" cy="264" rx="238" ry="192" data-v-574411d8></ellipse></g>', 4)
      ])])),
      (U(), F("svg", {
        class: "scene-atmosphere__route",
        viewBox: "0 0 320 84",
        role: "img",
        "aria-labelledby": "route-map-title route-map-description",
        "data-testid": "route-map",
        "data-route-scene": t.sceneId
      }, [
        te[2] || (te[2] = p("title", { id: "route-map-title" }, "Route map", -1)),
        p("desc", W4, "The selected player route is " + $(u.value) + ". Current progress: " + $(t.sceneId) + ".", 1),
        te[3] || (te[3] = p("path", {
          d: "M20 42H120",
          class: "scene-atmosphere__route-line scene-atmosphere__route-leg is-traversed"
        }, null, -1)),
        p("path", {
          d: "M120 42L218 16",
          class: we(["scene-atmosphere__route-line", "scene-atmosphere__route-leg", { "is-traversed": f.value.reached === "golden_bough_rebuild" }])
        }, null, 2),
        p("path", {
          d: "M120 42L218 42",
          class: we(["scene-atmosphere__route-line", "scene-atmosphere__route-leg", { "is-traversed": f.value.reached === "white_canvas" }])
        }, null, 2),
        p("path", {
          d: "M120 42L218 68",
          class: we(["scene-atmosphere__route-line", "scene-atmosphere__route-leg", { "is-traversed": f.value.reached === "ring_conspiracy" }])
        }, null, 2),
        p("circle", {
          cx: "20",
          cy: "42",
          r: "5",
          class: we(["scene-atmosphere__route-node", { "is-reached": f.value.canonReached }])
        }, null, 2),
        p("circle", {
          cx: "20",
          cy: "42",
          r: "2.1",
          class: we(["scene-atmosphere__route-core", { "is-reached": f.value.canonReached }])
        }, null, 2),
        p("circle", {
          cx: "120",
          cy: "42",
          r: "5",
          class: we(["scene-atmosphere__route-node", { "is-reached": f.value.junctionReached }])
        }, null, 2),
        p("circle", {
          cx: "120",
          cy: "42",
          r: "2.1",
          class: we(["scene-atmosphere__route-core", { "is-reached": f.value.junctionReached }])
        }, null, 2),
        p("circle", {
          cx: "218",
          cy: "16",
          r: "5",
          class: we(["scene-atmosphere__route-node", { "is-selected": f.value.selected === "golden_bough_rebuild", "is-reached": f.value.reached === "golden_bough_rebuild" }])
        }, null, 2),
        p("circle", {
          cx: "218",
          cy: "16",
          r: "2.1",
          class: we(["scene-atmosphere__route-core", { "is-reached": f.value.reached === "golden_bough_rebuild" }])
        }, null, 2),
        p("circle", {
          cx: "218",
          cy: "42",
          r: "5",
          class: we(["scene-atmosphere__route-node", { "is-selected": f.value.selected === "white_canvas", "is-reached": f.value.reached === "white_canvas" }])
        }, null, 2),
        p("circle", {
          cx: "218",
          cy: "42",
          r: "2.1",
          class: we(["scene-atmosphere__route-core", { "is-reached": f.value.reached === "white_canvas" }])
        }, null, 2),
        p("circle", {
          cx: "218",
          cy: "68",
          r: "5",
          class: we(["scene-atmosphere__route-node", { "is-selected": f.value.selected === "ring_conspiracy", "is-reached": f.value.reached === "ring_conspiracy" }])
        }, null, 2),
        p("circle", {
          cx: "218",
          cy: "68",
          r: "2.1",
          class: we(["scene-atmosphere__route-core", { "is-reached": f.value.reached === "ring_conspiracy" }])
        }, null, 2),
        te[4] || (te[4] = Gn('<text x="8" y="72" data-v-574411d8>Canon</text><text x="104" y="72" data-v-574411d8>AU/IF</text><text x="230" y="20" data-v-574411d8>Rebuild</text><text x="230" y="46" data-v-574411d8>Canvas</text><text x="230" y="72" data-v-574411d8>Ring</text>', 5))
      ], 8, G4)),
      p("p", K4, [
        p("span", {
          class: "scene-atmosphere__status-chip scene-atmosphere__status-chip--route",
          "data-route": i.value
        }, $(u.value), 9, Y4),
        p("span", {
          class: "scene-atmosphere__status-chip scene-atmosphere__status-chip--band",
          "data-band": f.value.band
        }, $(f.value.branch === "canon" ? "Canon recap" : "AU / IF route"), 9, X4),
        p("span", {
          class: "scene-atmosphere__status-chip scene-atmosphere__status-chip--junction",
          "data-junction": f.value.junctionReached ? "reached" : "pending"
        }, $(f.value.junctionReached ? "junction reached" : "junction pending"), 9, Q4)
      ]),
      p("span", {
        class: "scene-atmosphere__mode",
        "data-testid": "scene-atmosphere-mode",
        role: "status",
        "aria-live": "polite",
        "data-vfx-status": b.value ? "transitioning" : r.value ? "live" : "static"
      }, $(b.value ? "Scene transition" : r.value ? "VFX live" : "Static composition"), 9, e9)
    ], 8, H4));
  }
}), a9 = /* @__PURE__ */ Kp(t9, [["__scopeId", "data-v-574411d8"]]), nh = Ie([
  "canon_exact",
  "canon_paraphrase",
  "supported_inference",
  "AU_extension",
  "rejected"
]), i9 = Ie([
  "terminology",
  "profile",
  "appearance",
  "personality",
  "story",
  "combat",
  "boundary",
  "production"
]), o9 = Ie([
  "official-game",
  "community-transcript",
  "community-reference",
  "gameplay-recording",
  "project-artifact"
]), n9 = Ie([
  "metadata-only",
  "no-reprint",
  "project-internal"
]), r9 = W({
  id: E().min(1),
  kind: o9,
  title: E().min(1),
  url: E().url().optional(),
  localPath: E().min(1).optional(),
  locator: E().min(1),
  language: E().min(1),
  checkedAt: E().regex(/^\d{4}-\d{2}-\d{2}$/u),
  revisionId: X().int().positive().optional(),
  revisionTimestamp: E().min(1).optional(),
  redistribution: n9,
  note: E().min(1).optional()
}).strict().refine((t) => !!t.url != !!t.localPath, {
  message: "Canon source must declare exactly one of url or localPath"
}), s9 = W({
  sourceId: E().min(1),
  locator: E().min(1)
}).strict(), c9 = W({
  id: E().min(1),
  classification: nh,
  scope: i9,
  statement: E().min(1),
  recapText: E().min(1).optional(),
  evidence: oe(s9).min(1),
  reviewedAt: E().regex(/^\d{4}-\d{2}-\d{2}$/u),
  rationale: E().min(1).optional(),
  rejectionReason: E().min(1).optional()
}).strict().superRefine((t, e) => {
  t.classification === "rejected" && !t.rejectionReason && e.addIssue({ code: "custom", path: ["rejectionReason"], message: "Rejected claims require a rejection reason" }), t.classification !== "rejected" && t.rejectionReason && e.addIssue({ code: "custom", path: ["rejectionReason"], message: "Only rejected claims may declare a rejection reason" });
}), rh = W({
  classification: nh,
  scope: Ie(["canon_recap", "AU_boundary", "route"]),
  claimIds: oe(E().min(1)).min(1),
  sourceIds: oe(E().min(1)).min(1),
  note: E().min(1)
}).strict().superRefine((t, e) => {
  t.classification === "rejected" && e.addIssue({ code: "custom", path: ["classification"], message: "Rejected content cannot enter a published scene" }), t.scope === "canon_recap" && t.classification !== "canon_paraphrase" && e.addIssue({ code: "custom", path: ["classification"], message: "Canon recap scenes must be canon_paraphrase" }), t.scope !== "canon_recap" && t.classification !== "AU_extension" && e.addIssue({ code: "custom", path: ["classification"], message: "AU boundary and route scenes must be AU_extension" });
}), d9 = W({
  sceneIds: oe(E().min(1)).min(1),
  provenance: rh
}).strict(), l9 = W({
  claimId: E().min(1),
  sceneIds: oe(E().min(1)),
  worldbookEntryIds: oe(E().min(1)),
  cardFields: oe(E().min(1)),
  disposition: Ie(["published", "production-constraint", "rejected"]),
  note: E().min(1)
}).strict().superRefine((t, e) => {
  const a = t.sceneIds.length + t.worldbookEntryIds.length + t.cardFields.length;
  t.disposition !== "rejected" && a === 0 && e.addIssue({ code: "custom", path: ["sceneIds"], message: "Published claims require at least one consumer" }), t.disposition === "rejected" && a !== 0 && e.addIssue({ code: "custom", path: ["sceneIds"], message: "Rejected claims cannot have published consumers" });
});
function sh(t, e, a) {
  const i = /* @__PURE__ */ new Set();
  e.forEach((o, n) => {
    i.has(o.id) && t.addIssue({ code: "custom", path: [a, n, "id"], message: `Duplicate id: ${o.id}` }), i.add(o.id);
  });
}
W({ version: pe(1), sources: oe(r9).min(1) }).strict().superRefine((t, e) => sh(e, t.sources, "sources"));
W({ version: pe(1), claims: oe(c9).min(1) }).strict().superRefine((t, e) => sh(e, t.claims, "claims"));
W({ version: pe(1), entries: oe(d9).min(1) }).strict().superRefine((t, e) => {
  const a = /* @__PURE__ */ new Set();
  t.entries.forEach((i, o) => i.sceneIds.forEach((n, r) => {
    a.has(n) && e.addIssue({ code: "custom", path: ["entries", o, "sceneIds", r], message: `Duplicate scene provenance: ${n}` }), a.add(n);
  }));
});
W({
  version: pe(1),
  scope: E().min(1),
  exclusions: oe(W({ scope: E().min(1), reason: E().min(1) }).strict()),
  entries: oe(l9).min(1)
}).strict().superRefine((t, e) => {
  const a = /* @__PURE__ */ new Set();
  t.entries.forEach((i, o) => {
    a.has(i.claimId) && e.addIssue({ code: "custom", path: ["entries", o, "claimId"], message: `Duplicate claim coverage: ${i.claimId}` }), a.add(i.claimId);
  });
});
const Ce = E().min(1), u9 = Ie([
  "affectionAlbina",
  "trust",
  "danger",
  "artResonance"
]), ch = Ie([
  "intimacy",
  "reliance",
  "obsession",
  "suspicion"
]), f9 = Ie([
  "blade",
  "boundary",
  "analysis",
  "resonance"
]), Dr = W({
  affectionAlbina: X().finite().optional(),
  trust: X().finite().optional(),
  danger: X().finite().optional(),
  artResonance: X().finite().optional(),
  composure: X().finite().optional(),
  materials: X().finite().optional(),
  leverage: X().finite().optional(),
  exposure: X().finite().optional()
}).strict(), dh = W({
  intimacy: X().finite().optional(),
  reliance: X().finite().optional(),
  obsession: X().finite().optional(),
  suspicion: X().finite().optional()
}).strict(), p9 = W({
  blade: X().finite().optional(),
  boundary: X().finite().optional(),
  analysis: X().finite().optional(),
  resonance: X().finite().optional()
}).strict(), h9 = W({
  battleId: Ce,
  outcome: Ie(["victory", "setback"])
}).strict(), Fl = {
  operator: Ie(["gte", "lte", "eq"]),
  value: X().finite()
}, b9 = W({
  values: Dr.optional(),
  relationshipVectors: dh.optional(),
  conflictMastery: p9.optional(),
  setFlags: oe(Ce).optional(),
  clearFlags: oe(Ce).optional(),
  unlockCg: oe(Ce).optional(),
  grantItems: oe(Ce).optional(),
  equipItems: oe(Ce).optional(),
  unlockOutfits: oe(Ce).optional(),
  activateOutfit: Ce.optional(),
  startQuests: oe(Ce).optional(),
  completeQuests: oe(Ce).optional(),
  resolveBattles: oe(h9).optional(),
  professionXp: gi(Ce, X().int().positive()).optional(),
  activateProfession: Ce.optional()
}).strict(), lh = Nr("kind", [
  W({ kind: pe("value"), key: u9, ...Fl }).strict(),
  W({ kind: pe("relationship"), key: ch, ...Fl }).strict(),
  W({ kind: pe("flag"), flag: Ce, equals: At() }).strict(),
  W({ kind: pe("quest"), questId: Ce, status: Ie(["active", "completed"]) }).strict(),
  W({ kind: pe("battle"), battleId: Ce, outcome: Ie(["victory", "setback"]).optional() }).strict(),
  W({ kind: pe("item"), itemId: Ce }).strict(),
  W({ kind: pe("equipment"), equipmentId: Ce }).strict(),
  W({ kind: pe("outfit"), outfitId: Ce }).strict(),
  W({ kind: pe("profession"), professionId: Ce, levelGte: X().int().positive() }).strict(),
  W({ kind: pe("worldbook"), entryId: Ce, status: Ie(["active", "seen"]) }).strict()
]), m9 = W({
  id: ch,
  label: E().min(1),
  minimum: X().finite(),
  maximum: X().finite()
}).strict().refine((t) => t.minimum < t.maximum, { message: "Relationship track minimum must be below maximum" }), v9 = W({
  id: Ce,
  route: Et,
  label: E().min(1),
  description: E().min(1)
}).strict(), g9 = W({
  id: Ce,
  route: Et,
  label: E().min(1),
  description: E().min(1),
  recommendedMastery: f9
}).strict(), _9 = W({
  id: Ce,
  route: Et.optional(),
  label: E().min(1),
  description: E().min(1)
}).strict(), y9 = W({
  id: Ce,
  itemId: Ce,
  route: Et.optional(),
  slot: Ie(["weapon", "armor", "accessory", "tool"]),
  label: E().min(1),
  modifiers: Dr
}).strict(), w9 = W({
  id: Ce,
  route: Et.optional(),
  label: E().min(1),
  portraitAssetId: Ce
}).strict(), k9 = W({
  id: Ce,
  route: Et.optional(),
  label: E().min(1),
  xpThresholds: oe(X().int().nonnegative()).min(1),
  modifiersPerLevel: Dr
}).strict().superRefine((t, e) => {
  t.xpThresholds[0] !== 0 && e.addIssue({ code: "custom", path: ["xpThresholds", 0], message: "The first profession threshold must be zero" }), t.xpThresholds.slice(1).forEach((a, i) => {
    a <= t.xpThresholds[i] && e.addIssue({ code: "custom", path: ["xpThresholds", i + 1], message: "Profession thresholds must increase" });
  });
}), I9 = W({
  values: Dr.optional(),
  relationshipVectors: dh.optional(),
  professionXp: gi(Ce, X().int().positive()).optional(),
  setFlags: oe(Ce).optional(),
  grantItems: oe(Ce).optional(),
  unlockOutfits: oe(Ce).optional()
}).strict(), A9 = W({
  id: Ce,
  route: Et.optional(),
  label: E().min(1),
  description: E().min(1),
  eligibility: oe(lh).min(1),
  reward: I9
}).strict(), x9 = W({
  id: Ce,
  claimIds: oe(Ce),
  constant: At(),
  selective: At(),
  content: E().min(1)
}).strict(), T9 = W({
  relationshipTracks: oe(m9),
  quests: oe(v9),
  battles: oe(g9),
  minigames: oe(b3).default([]),
  items: oe(_9),
  equipment: oe(y9),
  professions: oe(k9),
  achievements: oe(A9),
  outfits: oe(w9),
  worldbookEntries: oe(x9)
}).strict();
function S9(t, e, a) {
  const i = /* @__PURE__ */ new Set();
  t.forEach((o, n) => {
    i.has(o.id) && a.addIssue({ code: "custom", path: [e, n, "id"], message: `Duplicate ${e} id: ${o.id}` }), i.add(o.id);
  });
}
function C9(t, e) {
  const a = new Set(t.items.map(({ id: i }) => i));
  t.equipment.forEach((i, o) => {
    a.has(i.itemId) || e.addIssue({ code: "custom", path: ["equipment", o, "itemId"], message: `Unknown item reference: ${i.itemId}` });
  });
}
const P9 = T9.superRefine((t, e) => {
  for (const a of ["relationshipTracks", "quests", "battles", "minigames", "items", "equipment", "professions", "achievements", "outfits", "worldbookEntries"])
    S9(t[a], a, e);
  C9(t, e);
}), Zi = 2, R9 = b9.extend({
  route: Et.optional()
}).strict(), ql = lh, uh = W({
  allOf: oe(ql).min(1).optional(),
  anyOf: oe(ql).min(1).optional(),
  fallback: At().optional()
}).strict().refine((t) => t.allOf || t.anyOf || t.fallback === !0, {
  message: "Choice availability must declare predicates or a fallback"
}), V9 = W({
  route: Et,
  kind: Ie(["true", "normal", "bad"]),
  eligibility: uh
}).strict(), E9 = W({
  id: E().min(1),
  text: E().min(1),
  nextSceneId: E().min(1),
  resultText: E().min(1).optional(),
  resultVoiceAssetId: E().min(1).optional(),
  availability: uh.optional(),
  effects: R9
}).strict(), O9 = W({
  characterId: E().min(1),
  portraitAssetId: E().min(1),
  position: Ie(["far-left", "left", "center", "right", "far-right"]),
  active: At(),
  scale: X().positive().finite()
}).strict(), M9 = W({
  version: pe(Zi),
  id: E().min(1),
  chapter: X().int().nonnegative(),
  route: Et.nullable(),
  provenance: rh,
  locationId: E().min(1),
  backgroundAssetId: E().min(1),
  cgAssetId: E().min(1).optional(),
  videoAssetId: E().min(1).optional(),
  desktopVideoAssetId: E().min(1).optional(),
  tone: E().min(1),
  portraits: oe(O9),
  speaker: E().min(1),
  text: E(),
  voiceAssetId: E().min(1).optional(),
  bgmAssetId: E().min(1).optional(),
  sfxAssetIds: oe(E().min(1)).optional(),
  choices: oe(E9),
  minigame: m3.optional(),
  ending: V9.optional()
}).strict(), $9 = M9.superRefine((t, e) => {
  t.provenance.scope !== "route" && t.route !== null && e.addIssue({ code: "custom", path: ["route"], message: "Canon recap and AU boundary scenes must use a null route" }), t.provenance.scope === "route" && t.route === null && e.addIssue({ code: "custom", path: ["route"], message: "Only canon recap and AU boundary scenes may use a null route" });
});
function j9(t) {
  return t.startsWith("/") || t.endsWith("/") || t.includes("\\") || t.includes(":") ? !1 : t.split("/").every((e) => e.length > 0 && e !== "." && e !== "..");
}
const zi = E().min(1).refine(j9, {
  message: "Asset paths must be relative to the canonical asset root"
}), fh = Ie(["pie", "wisart-openai-compatible", "comfyui-local-krea2"]), ph = Ie(["gpt-image-2", "redcraft23FP8_30Krea2.safetensors", "seedance-1.5-pro", "speech-2.8-hd"]), Kc = E().regex(/^[a-z0-9][a-z0-9._-]*$/iu), hh = W({
  cueAlias: E().regex(/^[a-z0-9][a-z0-9_]*$/u),
  title: E().min(1),
  creator: E().min(1),
  isrc: E().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/u),
  sourceUrl: E().url(),
  licenseId: pe("CC-BY-4.0"),
  licenseUrl: pe("https://creativecommons.org/licenses/by/4.0/"),
  attribution: E().min(1)
}).strict(), z9 = W({
  version: pe(1),
  projectId: pe("albina-galgame-card"),
  packagedNotice: E().min(1),
  tracks: oe(hh.extend({
    assetId: E().min(1),
    path: zi.refine((t) => t.startsWith("audio/bgm/"), {
      message: "Licensed music paths must be inside audio/bgm"
    }),
    sha256: E().regex(/^[a-f0-9]{64}$/u)
  }).strict()).length(5),
  officialSoundtrack: W({
    publisher: pe("ProjectMoon"),
    channel: pe("ProjectMoon Official"),
    playlistTitle: pe("LCB OST"),
    playlistTrackCount: pe(35),
    verifiedOn: pe("2026-07-15"),
    bundled: pe(!1),
    cached: pe(!1),
    redistributionAllowed: pe(!1),
    notice: E().min(1),
    rightsNotice: E().min(1),
    links: oe(W({ label: E().min(1), url: E().url() }).strict()).length(2),
    termsUrl: pe("https://limbuscompany.com/terms-of-service/")
  }).strict()
}).strict().superRefine((t, e) => {
  t.tracks.forEach((a, i) => {
    a.creator !== "Kevin MacLeod" && e.addIssue({ code: "custom", path: ["tracks", i, "creator"], message: "Packaged BGM creator must be Kevin MacLeod" });
    const o = new URL(a.sourceUrl);
    (o.protocol !== "https:" || o.hostname !== "incompetech.com" || o.pathname !== "/music/royalty-free/index.html" || o.searchParams.get("isrc") !== a.isrc) && e.addIssue({ code: "custom", path: ["tracks", i, "sourceUrl"], message: "Track source must be its HTTPS Incompetech ISRC page" });
  });
}), U9 = W({
  workflowPath: zi,
  workflowSha256: E().regex(/^[a-f0-9]{64}$/iu),
  evidencePath: zi,
  evidenceSha256: E().regex(/^[a-f0-9]{64}$/iu),
  topologySha256: E().regex(/^[a-f0-9]{64}$/iu)
}).strict(), F9 = W({
  provider: fh,
  model: ph,
  promptVersion: Kc,
  sourceJobHash: E().regex(/^[a-f0-9]{64}$/iu),
  baseline: U9.optional(),
  review: W({
    status: pe("approved"),
    reviewer: E().min(1),
    reviewedAt: E().datetime()
  }).strict()
}).strict().superRefine((t, e) => {
  bh(e, ["model"], t.provider, t.model);
}), q9 = W({
  status: Ie(["verified", "unverified"]),
  sourceType: Ie(["model-output", "project-authored", "licensed-source", "third-party-source"]),
  redistribution: Ie(["allowed", "restricted", "unverified"]),
  rightsBasis: E().min(1),
  holder: E().min(1).optional(),
  sourceUrl: E().url().optional()
}).strict().superRefine((t, e) => {
  t.status === "verified" && t.redistribution !== "allowed" && e.addIssue({ code: "custom", path: ["redistribution"], message: "Verified asset rights must allow redistribution" }), t.status === "verified" && !t.holder && e.addIssue({ code: "custom", path: ["holder"], message: "Verified asset rights require a holder" });
}), Z9 = W({
  assetId: E().min(1).optional(),
  sha256: E().regex(/^[a-f0-9]{64}$/iu),
  role: E().min(1)
}).strict(), L9 = W({
  kind: Ie(["original", "derivative", "transcode", "conversion"]),
  processVersion: Kc,
  inputs: oe(Z9)
}).strict().superRefine((t, e) => {
  t.kind === "original" && t.inputs.length !== 0 && e.addIssue({ code: "custom", path: ["inputs"], message: "Original assets cannot declare parent inputs" }), t.kind !== "original" && t.inputs.length === 0 && e.addIssue({ code: "custom", path: ["inputs"], message: "Derived assets require at least one parent input" });
}), N9 = W({
  id: E().min(1),
  kind: Ie(["image", "video", "audio", "json"]),
  path: zi,
  mimeType: E().min(1).optional(),
  sha256: E().regex(/^[a-f0-9]{64}$/i).optional(),
  bytes: X().int().nonnegative().optional(),
  provenance: F9.optional(),
  rights: q9.optional(),
  lineage: L9.optional(),
  license: hh.optional()
}).strict().superRefine((t, e) => {
  t.path.startsWith("audio/bgm/") && !t.license && e.addIssue({ code: "custom", path: ["license"], message: "Packaged BGM requires registered license metadata" }), t.license && t.kind !== "audio" && e.addIssue({ code: "custom", path: ["license"], message: "License metadata is only supported on audio assets" });
}), D9 = Nr("kind", [
  W({ kind: pe("static") }).strict(),
  W({
    kind: pe("strip"),
    frameCount: pe(8),
    frameWidth: X().int().positive(),
    frameHeight: X().int().positive(),
    fps: X().positive().finite()
  }).strict()
]), B9 = W({
  version: pe(Zi),
  id: E().min(1),
  characterId: E().min(1),
  path: zi,
  animation: D9,
  fallbackAssetId: E().min(1).optional()
}).strict(), H9 = W({
  version: pe(Zi),
  id: E().min(1),
  assetId: E().min(1),
  kind: Ie(["image", "image-edit", "video", "speech"]),
  provider: fh,
  model: ph,
  promptVersion: Kc,
  status: Ie(["pending", "running", "completed", "failed"]),
  contentHash: E().regex(/^[a-f0-9]{64}$/i),
  inputAssetIds: oe(E().min(1)),
  outputPath: zi,
  attempts: X().int().nonnegative(),
  error: E().optional()
}).strict().superRefine((t, e) => {
  const a = t.kind === "image-edit" ? "image" : t.kind;
  bh(e, ["model"], t.provider, t.model, a);
});
function bh(t, e, a, i, o) {
  const n = a === "wisart-openai-compatible" ? ["gpt-image-2"] : a === "comfyui-local-krea2" ? ["redcraft23FP8_30Krea2.safetensors"] : a === "pie" ? ["seedance-1.5-pro", "speech-2.8-hd"] : [], r = o === void 0 || { image: ["gpt-image-2", "redcraft23FP8_30Krea2.safetensors"], video: ["seedance-1.5-pro"], speech: ["speech-2.8-hd"] }[o].includes(i);
  (!n.includes(i) || !r) && t.addIssue({ code: "custom", path: e, message: `Unsupported provider/model pair: ${a}/${i}` });
}
const J9 = W({
  version: pe(Zi),
  projectId: pe("albina-galgame-card"),
  basePath: zi,
  assets: oe(N9),
  portraits: oe(B9),
  mediaJobs: oe(H9)
}).strict();
function Fn(t, e, a) {
  t.addIssue({ code: "custom", path: e, message: `Unknown asset reference: ${a}` });
}
const mh = J9.superRefine((t, e) => {
  const a = /* @__PURE__ */ new Set();
  t.assets.forEach((i, o) => {
    a.has(i.id) && e.addIssue({ code: "custom", path: ["assets", o, "id"], message: `Duplicate asset id: ${i.id}` }), a.add(i.id);
  }), t.assets.forEach((i, o) => {
    i.lineage?.inputs.forEach((n, r) => {
      if (!n.assetId) return;
      const s = t.assets.find((c) => c.id === n.assetId);
      s ? s.sha256 !== n.sha256 && e.addIssue({ code: "custom", path: ["assets", o, "lineage", "inputs", r, "sha256"], message: `Lineage hash mismatch for ${n.assetId}` }) : Fn(e, ["assets", o, "lineage", "inputs", r, "assetId"], n.assetId);
    });
  }), t.portraits.forEach((i, o) => {
    a.has(i.id) && e.addIssue({ code: "custom", path: ["portraits", o, "id"], message: `Duplicate asset id: ${i.id}` }), a.add(i.id), i.fallbackAssetId && !t.assets.some((n) => n.id === i.fallbackAssetId) && Fn(e, ["portraits", o, "fallbackAssetId"], i.fallbackAssetId);
  }), t.mediaJobs.forEach((i, o) => {
    a.has(i.assetId) || Fn(e, ["mediaJobs", o, "assetId"], i.assetId), i.inputAssetIds.forEach((n, r) => {
      a.has(n) || Fn(e, ["mediaJobs", o, "inputAssetIds", r], n);
    });
  });
});
function G9(t) {
  return mh.parse(t);
}
const Zl = "2.0.0-rc.3", W9 = ".";
function K9(t, e) {
  if (e)
    return t.assets.find((a) => a.id === e);
}
function Yc(t, e, a = W9) {
  const i = K9(t, e);
  if (!i) return;
  const o = [t.basePath, ...i.path.split("/")].map((n) => encodeURIComponent(n)).join("/");
  return `${a.replace(/\/$/u, "")}/${o}`;
}
const Y9 = {
  backstreets_rain: "雨幕后街",
  city_rooftop: "城市天台",
  golden_bough_fault: "金枝断层",
  lce_lab: "LCE 实验室",
  lce_research_hallway: "LCE 研究走廊",
  lce_research_lab: "LCE 研究实验室",
  limbus_bus: "巴士车厢",
  mirror_corridor: "镜之回廊",
  nest_station: "巢站",
  outskirts_dawn: "郊外黎明",
  rain_room: "雨室",
  ring_atelier: "环指工坊",
  ring_corridor: "环指回廊",
  spider_gallery: "蛛画廊",
  white_canvas_room: "白画布之屋"
}, X9 = {
  "AU-boundary": "世界线边界",
  "canon-recap": "正史复盘",
  "canon-recap-outcome": "复盘结果",
  gallery: "画廊",
  golden: "金色时刻",
  quiet: "静谧",
  rain: "雨夜",
  threat: "威胁"
};
function Ll(t) {
  return Y9[t] ?? t;
}
function Nl(t) {
  return X9[t];
}
function Q9(t) {
  const e = new Date(t);
  if (Number.isNaN(e.getTime())) return t;
  const a = (i) => String(i).padStart(2, "0");
  return `${a(e.getMonth() + 1)}-${a(e.getDate())} ${a(e.getHours())}:${a(e.getMinutes())}`;
}
function e8(t) {
  const e = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  if (t < 10) return e[t] ?? String(t);
  if (t < 20) return t === 10 ? "十" : `十${e[t - 10]}`;
  if (t < 100) {
    const a = Math.floor(t / 10), i = t % 10;
    return `${e[a]}十${i === 0 ? "" : e[i]}`;
  }
  return String(t);
}
function Dl(t) {
  return t === 0 ? "序章" : t !== void 0 && Number.isInteger(t) && t > 0 ? `第${e8(t)}章` : t === void 0 ? "CH.?" : `CH.${t}`;
}
const Ka = "power3.out";
function ha(t, e) {
  e.dataset.motionState = "settled", e.dataset.motionKind = t, xe.set(e, { autoAlpha: 1, clearProps: "transform,filter" });
}
function Bl(t, e) {
  const a = xe.timeline({ defaults: { ease: Ka } }), i = xe.utils.selector(e);
  return e.dataset.motionState = "entering", e.dataset.motionKind = t, a.set(e, { autoAlpha: 1 }), t === "title" ? a.fromTo(i(".title-screen__veil"), { scaleX: 1.15, transformOrigin: "left center" }, { scaleX: 1, duration: 1.05 }).fromTo(i(".eyebrow"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 }, 0.16).fromTo(i("h1"), { yPercent: 18, autoAlpha: 0, scale: 1.035 }, { yPercent: 0, autoAlpha: 1, scale: 1, duration: 1.05 }, 0.24).fromTo(i(".subtitle"), { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.62 }, 0.68).fromTo(i(".title-actions button"), { x: -26, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.42, stagger: 0.075 }, 0.78).fromTo(i(".build-state"), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 1.16) : t === "game" ? a.fromTo(i(".game-hud"), { yPercent: -110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.68 }).fromTo(i(".portrait-stage"), { scale: 1.035, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.9 }, 0.08).fromTo(i(".dialogue-box"), { y: 36, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.7 }, 0.3).fromTo(i(".dialogue-box h2"), { x: -16, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.36 }, 0.54).fromTo(i(".dialogue-box p"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.6).fromTo(i(".choice-list button"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.36, stagger: 0.075 }, 0.72) : t === "dialogue" ? a.fromTo(i("h2"), { x: -12, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.32 }).fromTo(i("p"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.38 }, 0.1).fromTo(i(".choice-list button, .result-overlay button"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.07 }, 0.2) : t === "gameplay-panel" || t === "modal" ? a.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 }).fromTo(i(".gameplay-panel, .gallery-viewer, .minigame-panel"), { y: 28, scale: 0.975, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.5 }, 0).fromTo(i(".gameplay-panel__header, .gallery-viewer > *, .minigame-panel > *"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.055 }, 0.2) : a.fromTo(i("header"), { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.46 }).fromTo(i("form, .slot-actions, .save-slot, .gallery-item, .panel-empty, .credits-notice, .credits-list, .official-listening, label, .asset-status"), { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, stagger: 0.055 }, 0.12), a.eventCallback("onComplete", () => {
    e.dataset.motionState = "settled";
  });
}
function t8(t) {
  const e = /* @__PURE__ */ new Set(), a = () => {
    e.forEach((n) => n.kill()), e.clear();
  }, i = (n) => (e.add(n), n), o = () => a();
  return {
    reveal(n, r) {
      if (o(), t.value) return ha(n, r);
      i(Bl(n, r));
    },
    enterScreen(n, r, s) {
      if (o(), t.value) {
        ha(n, r), s();
        return;
      }
      const c = Bl(n, r);
      i(c), c.eventCallback("onComplete", s);
    },
    leaveScreen(n, r) {
      if (o(), t.value) {
        r();
        return;
      }
      n.dataset.motionState = "leaving", i(xe.timeline({ defaults: { ease: "power2.inOut" }, onComplete: r }).to(n, { autoAlpha: 0, scale: 0.992, filter: "brightness(.72) saturate(.82)", duration: 0.3 }).set(n, { clearProps: "transform,filter" }));
    },
    revealDialogue(n) {
      if (t.value) return ha("dialogue", n);
      const r = xe.utils.selector(n);
      i(xe.timeline({ defaults: { ease: Ka } }).fromTo(r("h2"), { x: -12, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.32 }).fromTo(r("p"), { y: 10, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.38 }, 0.1).fromTo(r(".choice-list button, .result-overlay button"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.07 }, 0.2));
    },
    transitionScene(n) {
      if (t.value) return ha("scene", n);
      n.dataset.motionState = "transitioning", i(xe.timeline({ defaults: { ease: Ka } }).to(n, { scale: 0.992, filter: "brightness(.78) saturate(.88)", duration: 0.14 }).to(n, { scale: 1.008, filter: "brightness(1.12) saturate(1.06)", duration: 0.2 }).to(n, { scale: 1, filter: "brightness(1) saturate(1)", duration: 0.38, ease: "power2.out" }).eventCallback("onComplete", () => {
        n.dataset.motionState = "settled";
      }));
    },
    pulseDialogue(n) {
      t.value || i(xe.timeline({ defaults: { ease: "power2.out" } }).to(n, { y: -2, scale: 1.004, duration: 0.1 }).to(n, { y: 0, scale: 1, duration: 0.32 }));
    },
    switchSpeaker(n) {
      if (t.value) return ha("dialogue", n);
      const r = xe.utils.selector(n);
      i(xe.timeline({ defaults: { ease: Ka } }).fromTo(r("h2"), { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.22 }));
    },
    revealSceneLabel(n) {
      if (t.value) return ha("dialogue", n);
      i(xe.timeline({ defaults: { ease: Ka } }).fromTo(n, { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3 }));
    },
    wipeScene(n) {
      if (t.value) return ha("scene", n);
      i(xe.timeline({ defaults: { ease: "power3.inOut" } }).set(n, { autoAlpha: 0.9, clipPath: "inset(0 0 0 0)" }).to(n, { clipPath: "inset(0 0 0 100%)", autoAlpha: 0, duration: 0.58 }));
    },
    pulseChoice(n) {
      t.value || i(xe.timeline({ defaults: { ease: "power2.out" } }).to(n, { scale: 0.975, duration: 0.09 }).to(n, { scale: 1.025, filter: "brightness(1.22)", duration: 0.18 }).to(n, { scale: 1, filter: "brightness(1)", duration: 0.26 }));
    },
    pulseHud(n) {
      t.value || i(xe.fromTo(n, { scale: 1 }, { scale: 1.08, duration: 0.16, yoyo: !0, repeat: 1, ease: "power2.out" }));
    },
    pulseStatus(n, r = "golden") {
      if (t.value) return;
      const s = r === "danger" ? "#ec765f" : r === "cool" ? "#a7d7ef" : "#efd27c";
      i(xe.timeline({ defaults: { ease: "power2.out" } }).to(n, { scale: 1.08, color: s, duration: 0.16 }).to(n, { scale: 1, color: "", duration: 0.46 }));
    },
    pulseHudValue(n, r = "golden") {
      if (t.value) return;
      const s = r === "danger" ? "#ec765f" : "#efd27c";
      i(xe.timeline({ defaults: { ease: "power2.out" } }).to(n, { scale: 1.1, color: s, duration: 0.18 }).to(n, { scale: 1, color: "", duration: 0.5 }));
    },
    revealResult(n) {
      if (t.value) return ha("dialogue", n);
      i(xe.timeline({ defaults: { ease: Ka } }).fromTo(n, { y: 12, autoAlpha: 0, filter: "blur(5px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.4 }).fromTo(n.querySelectorAll("p, button"), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.28 }, 0.12));
    },
    revealMinigameResult(n, r = "perfect") {
      if (t.value) return ha("modal", n);
      const s = r === "assisted" ? "#9fd6ea" : r === "setback" ? "#e39aa0" : r === "skipped" ? "#b6c1cb" : "#f1d782";
      i(xe.timeline({ defaults: { ease: Ka } }).fromTo(n, { y: 24, scale: 0.96, autoAlpha: 0, filter: "blur(6px) brightness(1.3)" }, { y: 0, scale: 1, autoAlpha: 1, filter: "blur(0px) brightness(1)", duration: 0.42 }).fromTo(n.querySelectorAll("h3"), { color: "#8b98a6" }, { color: s, duration: 0.38 }, 0.1).fromTo(n.querySelectorAll("p, small, button"), { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.3 }, 0.16));
    },
    dismissMinigameResult(n, r) {
      if (t.value) {
        r();
        return;
      }
      i(xe.timeline({ defaults: { ease: "power2.inOut" }, onComplete: r }).to(n, { y: 18, scale: 0.98, autoAlpha: 0, filter: "blur(4px)", duration: 0.22 }));
    },
    switchPanelTab(n) {
      if (t.value) return ha("panel", n);
      const r = xe.utils.selector(n);
      i(xe.fromTo(r('[role="tabpanel"]:not([style*="display: none"]) > *'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.34, stagger: 0.045, ease: Ka }));
    },
    dismissModal(n, r) {
      if (t.value) {
        r();
        return;
      }
      i(xe.timeline({ defaults: { ease: "power2.inOut" }, onComplete: r }).to(n.querySelector(".gameplay-panel, .gallery-viewer, .minigame-panel") ?? n, { y: 18, scale: 0.985, autoAlpha: 0, filter: "blur(6px)", duration: 0.24 }).to(n, { autoAlpha: 0, duration: 0.16 }, 0));
    },
    dispose: a
  };
}
const a8 = 2, i8 = "albina-galgame-card", o8 = "assets", n8 = /* @__PURE__ */ JSON.parse('[{"id":"bg.backstreets_rain","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"2028722421626040d012db610e38f80c0707b4a708468473b7031f387600907f","bytes":172971,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"8105250ae84b264ce80cc823cf9b5aecf4fc3e9f3c8d7e1ad5d39988ccbf0d67","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:21.546Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.city_rooftop","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"aa3311072a00a7d4afda5d1d834299d87591916921801d3270cc9ff6cd966b87","bytes":146087,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"839f800235a0bfa5d0d98fc84bd9e1427a0dc85b5274ecf7ccbf95b505dd44f7","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:21.679Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.golden_bough","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"6edf1f90d2b561048fd5d45bae15cbe3d6a2eafec6f3855dd3eeb1b5b060a0cb","bytes":208926,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"c196bca1ee562a98ecc900b20396f5b507e7cb84485462af1788fdf388f8e4fa","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:21.798Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.lce_lab","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b779c2834a255687728fa67129ff7929a98809b6805d1a31703a8afdf8030107","bytes":203123,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"5888ba5833bf9c849e70fea28c114a7cba8da57503d719d465602bfd4125c8c7","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:21.922Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.limbus_bus","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"b0d64d366ad3f92ab2b251ef374c6bb1898cf9079837b0aa910c0b00e145bc09","bytes":232135,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"c4edeb016dfce10bddd1dd2762ee16af92e2d671ec2d4e5248be678862ed48ed","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.045Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.mirror_corridor","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"17277aad2a77db022d07482af12541b3a5380aef4b7093757907aa8949e5e590","bytes":167392,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"085147a43b50b78041de17a6e67bc99c5cb9a4d722e4f6fd555d816870b51fab","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.176Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.nest_station","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"91208785c1bc204ea79f0db217fb8fcebebbf606829590e857765f197b9e12bb","bytes":210265,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"7ec16c6ea744f913914b894793c3db8bdb4a99b65922922e94500b51e6354318","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.297Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.outskirts_dawn","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"44509077697bcad88c44498d157ac05515804b2ef65fcb1bdca8b8fc1ef37e6a","bytes":242337,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"d9bda03bffaf20df06f50b702794d22ee990e6f1900a162fd8a77585e2e8f9d9","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.418Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.rain_room","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"e997abedea4542c4b4776bf3492b28f5852a623194b379613c32bbb39ce22922","bytes":257137,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"ef12bfa4bda41642820fe014898f94f9aba10bcb2dad8cd7e5de4dfe16c781fc","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.539Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.ring_atelier","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"42931f287f934dacdbfdfe27cab2be02022233fda83e440d314779f43b950410","bytes":245753,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"411522003299c9a279713158e5b1e8f6e2a56812c7221706d9d7f589c514ab80","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.668Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.spider_gallery","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"df109ef2411bb7cf3c373360c67ed67dc714ec30b56ee8e9932ec567ab27ca1d","bytes":216657,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"7a523a301c5f07ef8c4bd1242c32bc9144080f1ec182d3869bc4de3417a214c9","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.791Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"bg.white_canvas","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"dc29a4ee28e61a32631abc2b1f3de090bcffd9637e1c088ffd35f59fd960fcb8","bytes":95655,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"de3732943920bcded67540fe9dfacf70f4b1d03305a4aec9e04d06117b78c559","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:55:22.913Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.araya_rooftop","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"505bec4c1bdaa6968f8f59352849c233cac1874c2c7c72964c9841e7dfbee89a","bytes":224801,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"2ae93db7fce25b9dd137d66946ca56c056f2fcd33110a356203944a0ad508bf2","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.576Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"assetId":"file.characters.vergilius.normal.png","sha256":"9cd72b8261583cd4922fe2203c1f2e0e8354fc3c49642ec12a83edd1475777b6","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.art_resonance","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"cb9f8de75f6d3524dba019be70cfd04a0974fe4734709ede92f982fa785ff6df","bytes":156110,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"0966dde17c1d580e5c3269ef8c2a01d0631f24cce5137a8b540d858e33a58d31","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:08.945Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.tender.png","sha256":"1654accf7c7cbdd16b6af3c3fa51d06fa0547b411451c1325d46bf02b71bd2d1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.backstreet_pursuit","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"b3ed4aa5bcfca9c56b48f47c19305d7073efaf254bdf11edcedf0aa9bb23fa5b","bytes":251161,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"dfc14508dd9a0391c6866150b0adb141e1bcd30c3d52b7801848a60f5eb97911","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.084Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.combat.png","sha256":"3447b8cb8df4edec6325ab5262892a35bff6854cd7f0fa44aaab268a97182f62","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.battle.png","sha256":"5b40787a69bd7dc73c2b36570bf7c58c73e52a612ca6fbbc401f52ead494a400","role":"approved-generated-reference"},{"assetId":"file.characters.ring.agent.normal.png","sha256":"4192a5a189f8e96279a856a89e2bac08997b06d5e3584c645d9c30492e76f97b","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.combat_transition_01","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"aba7ee4262fa8c75343f1dcd91a89c4c2f541d8184b98fd0b2e328f26e1a64f6","bytes":306008,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"0ca9b5e684be12b8f800be22ce038d9f6830fb428b7deed0982e123ed0b98e99","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.213Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.combat.png","sha256":"3447b8cb8df4edec6325ab5262892a35bff6854cd7f0fa44aaab268a97182f62","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.battle.png","sha256":"5b40787a69bd7dc73c2b36570bf7c58c73e52a612ca6fbbc401f52ead494a400","role":"approved-generated-reference"},{"assetId":"file.characters.ring.agent.normal.png","sha256":"4192a5a189f8e96279a856a89e2bac08997b06d5e3584c645d9c30492e76f97b","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.conspiracy_contract","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"b9c40c214efe4e81523100a7e0ee963ec6aba7438c2628e16fdc86431ab604f9","bytes":240901,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"655c0ca53653f1a58233dba1dec046e80632ee983bee985adf3b4b83f6cf0784","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.345Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.ring.conspiracy.png","sha256":"60fd0b62d59b71179b7d5a2b498424968515f569052cd7e1754261eb275654eb","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"assetId":"file.characters.callisto.normal.png","sha256":"e6158578e0fb0316c60224b86336bfe582a6515539f7ff22e2a7f2be4683c663","role":"approved-generated-reference"},{"assetId":"file.characters.ren.normal.png","sha256":"5cfd6e712b8790c8a4bcb5d015b086ec2e7827d573cffcf2914446a24c6e9607","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.fascia_heartbeat","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"f81c3dd3ffbdb042090546b3fec43d736a97096179c0fdb002947458df570db2","bytes":175916,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"19a2403e37d3710bfec5dd087aaed2515ab79861643dc045a22aaaf5de1bce11","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.456Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.fascia.open.png","sha256":"3c02947a0b3aa6b3c98012c580be7fedc92d2471d220f1440ac1a9d382d16428","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.tender.png","sha256":"1654accf7c7cbdd16b6af3c3fa51d06fa0547b411451c1325d46bf02b71bd2d1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.golden_bough_ending","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"27fb1ad1df4250ca823aa74f23fb61805889a2ab33e6a09e4b8c7c6ad6b0dfae","bytes":221408,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"1e1554518a556452f1997bdc39614431e3d93fccec7d8a1d258e6f5439a3dd47","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.573Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.endgame.png","sha256":"df6bfc313afb7a707cc580ed806efdbfb79e959f48c80f4a2674bf0318a7e51c","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.resolve.png","sha256":"20380c053a2b118a7cf85d7675501c0ae6837639e5a961f2b67ab48db6fcdce1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.golden_bough_rebuild","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"99ab6dcb6b7e643fc942a1199829fd6063007caf6a4413494a697911bf93ee52","bytes":241426,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"e9d8a47d55958c073fd8aebfd10f1892ba7af9cb80c4ec34f4dbe978b9234f52","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.646Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.hollow_torso_reveal","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"a5c942e39e9967ec713349e5646ab781d7a8294aa876f8894c5ee076093e2197","bytes":154697,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"9a02cecac76e0855424a25f9cadece1f117d7b7de2e70e691d1e47fa02229c17","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.687Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.surgical.png","sha256":"d6ef29a4e507767be8df6f69701d9b5cf03614172c554540ab6634bfce7a736a","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"assetId":"file.characters.lce.doctor.normal.png","sha256":"228c79b933fc9d28574fc044c56cce21de9037d4e3a0abd0e8c12d80463f8577","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.lce_raid","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"91fbaf6b6b67db5902bd23af21cc2af3db5ef62460748121307234b2592754a7","bytes":251262,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"b0244042e15c2408d8fe2e90e13f39c4e0f222a112b45c09cdb2e7ab62cf51c7","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.775Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.combat.png","sha256":"3447b8cb8df4edec6325ab5262892a35bff6854cd7f0fa44aaab268a97182f62","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.battle.png","sha256":"5b40787a69bd7dc73c2b36570bf7c58c73e52a612ca6fbbc401f52ead494a400","role":"approved-generated-reference"},{"assetId":"file.characters.lce.doctor.normal.png","sha256":"228c79b933fc9d28574fc044c56cce21de9037d4e3a0abd0e8c12d80463f8577","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.limbus_bus_night","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"49357dc9a7fa859bc5cb1db2dbb2f7b5fb3e6ca19abef0ea04f811841a8c716d","bytes":212824,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"a72f62648095b8cfca16b0c578b1d5a61030bda8943a577c378b570669ec5393","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:09.907Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.rain.png","sha256":"e49132402829886bcdc6b847b02810e8849cd0932c882ed4c666565c6a0ddf6e","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.tender.png","sha256":"1654accf7c7cbdd16b6af3c3fa51d06fa0547b411451c1325d46bf02b71bd2d1","role":"approved-generated-reference"},{"assetId":"file.characters.dante.normal.png","sha256":"40487edd1ddf95c2448e6dd1b6a74bdc25ed32001aa3bbf7282d436ba48be80d","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.maestro_shadow","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"72e8e55923e1717f52b8a30049746dc258df7f01f7ea91af3493bc974766b762","bytes":166862,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"f4866738a1ee211da3df79a327317564753e1d60569e68378909a5346c53b0b9","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.225Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.maestro.png","sha256":"2f3d893f3d46d6539cdb100b8fc160feeec7e115d4dc114cb62e0872a41ce666","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.shadow.png","sha256":"e041ba0b65c736c8b1c7c88d9e168160762f4f00075a54e8516af2d5d8094676","role":"approved-generated-reference"},{"assetId":"file.characters.callisto.normal.png","sha256":"e6158578e0fb0316c60224b86336bfe582a6515539f7ff22e2a7f2be4683c663","role":"approved-generated-reference"},{"assetId":"file.characters.ren.normal.png","sha256":"5cfd6e712b8790c8a4bcb5d015b086ec2e7827d573cffcf2914446a24c6e9607","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.opening_rain","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"457696a02349c6b9745c8dc7a5f048d1d067b852a4f24b271d4bb6d284bf48be","bytes":180039,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"2b9ecfb065418278a19ce170c37a02b7383181cebac0a17c15f02f87e8ae0d2e","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.320Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.rain_confession","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"4a5f80d17032543993bcb490c1f8f6eff6bec52de4416245f80dc2c008f33c6b","bytes":249164,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"96edf2ee24d96a19058a542d90ab68659e6f9b7a74a235ef14d00d349533e4de","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.442Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.rain.png","sha256":"e49132402829886bcdc6b847b02810e8849cd0932c882ed4c666565c6a0ddf6e","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.wet.hair.png","sha256":"a3bac76af24bc52b1c1e26867aad87f8d83ba9cf118afcfbbebcc329bf7de163","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.rebuild_awakening","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"2e404e9eeaa8bcb46bc63486a219ccd96d9376d701110decd19aaa0f3c999469","bytes":191955,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"27c10de3118c4184f90f1439cd6381f9cc594f10d507b7b1121508e502188c00","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.784Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.golden.bough.png","sha256":"c241ed5f31cf2c34cf0f9d3fd00968d93a8bb81d23b8a52e460614dd5643bfa8","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.ren_interruption","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"68fa377d1ed5e6aabd5fe46e6ce16ea4f19560c118484f5ce61ea8a34fd91c02","bytes":215359,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"49be6333c69659d1f5e285839ecb3eb3721fb2ddff9913790fdf3b6277fc3b4a","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.580Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.combat.png","sha256":"3447b8cb8df4edec6325ab5262892a35bff6854cd7f0fa44aaab268a97182f62","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.battle.png","sha256":"5b40787a69bd7dc73c2b36570bf7c58c73e52a612ca6fbbc401f52ead494a400","role":"approved-generated-reference"},{"assetId":"file.characters.ren.normal.png","sha256":"5cfd6e712b8790c8a4bcb5d015b086ec2e7827d573cffcf2914446a24c6e9607","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.ring_conspiracy_ending","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"de385c9a8213f57fe02f4f82c92e75fea02053b3e7746d27ec9d159957eba23a","bytes":171259,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"6fe805a75e878651b998874997669ff959875aa8bc3a563b467994563faa40f8","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.684Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.endgame.png","sha256":"df6bfc313afb7a707cc580ed806efdbfb79e959f48c80f4a2674bf0318a7e51c","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.resolve.png","sha256":"20380c053a2b118a7cf85d7675501c0ae6837639e5a961f2b67ab48db6fcdce1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.ring_invitation","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"c81d595770ba53e1563b6a3e33b3eb2e1877e0f6bb0f9e576bb9d4f14d29967a","bytes":218535,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"57a5eb5e7ffd9915650cba7d4a2553b8e27409e939781e2c0a73e6d49de9c14a","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.790Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.ring.conspiracy.png","sha256":"60fd0b62d59b71179b7d5a2b498424968515f569052cd7e1754261eb275654eb","role":"approved-generated-reference"},{"assetId":"file.characters.callisto.normal.png","sha256":"e6158578e0fb0316c60224b86336bfe582a6515539f7ff22e2a7f2be4683c663","role":"approved-generated-reference"},{"assetId":"file.characters.ren.normal.png","sha256":"5cfd6e712b8790c8a4bcb5d015b086ec2e7827d573cffcf2914446a24c6e9607","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.surgery_of_memory","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"6b711204cbf9f6d56d67b9e8a81a36b915cb54ad08ce168410f6b5f73efe8ebc","bytes":234073,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"031326ca8937efa6d79c3f653fa65e9b7ccaf1ee6ff43b509096bd0179f951f8","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.894Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.surgical.png","sha256":"d6ef29a4e507767be8df6f69701d9b5cf03614172c554540ab6634bfce7a736a","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"assetId":"file.characters.faust.normal.png","sha256":"181d1804a348d2acb99e1c5023eac471b732651b50b5aaeacbcfd329127d8eae","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.trust_threshold","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ff181cf1e246356b2159059b095eccc1cfdf7015acb442c978a393d001961e1f","bytes":218518,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"84d2cab29389d7b00a851004a38601c06af75f244c268e966b4e2a7609ee0a9b","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.895Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.endgame.png","sha256":"df6bfc313afb7a707cc580ed806efdbfb79e959f48c80f4a2674bf0318a7e51c","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.tender.png","sha256":"1654accf7c7cbdd16b6af3c3fa51d06fa0547b411451c1325d46bf02b71bd2d1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.white_canvas_choice","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"f29ba0d9d48ae0059dc4320c93acd5fc221e7cb29749c05375473fd20529c356","bytes":153144,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"13f22afc3c017ce1f5eb41d9e2611f55bca1367d9e485fc23a42c0e2106891eb","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:19.999Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.white.canvas.png","sha256":"3987479196fbdab2a2f5d2d4f33694eb6941590bfbb0ad47b69fc55b7848d215","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.tender.png","sha256":"1654accf7c7cbdd16b6af3c3fa51d06fa0547b411451c1325d46bf02b71bd2d1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"cg.white_canvas_ending","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"1c6c05ff9b4243e65851045bd4afbfed7d37c032dc95def7bbcbf74baacc1d9f","bytes":206831,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"e56ce443d674e7d6b43c42d88d56c6b769558a63d3120baf5cdd06899591e42c","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:36:20.110Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.endgame.png","sha256":"df6bfc313afb7a707cc580ed806efdbfb79e959f48c80f4a2674bf0318a7e51c","role":"approved-generated-reference"},{"assetId":"file.characters.protagonist.resolve.png","sha256":"20380c053a2b118a7cf85d7675501c0ae6837639e5a961f2b67ab48db6fcdce1","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.audio.bgm.backstreets.rain.mp3","kind":"audio","path":"audio/bgm/backstreets_rain.mp3","mimeType":"audio/mpeg","sha256":"97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414","bytes":4192274,"license":{"cueAlias":"backstreets_rain","title":"SCP-x6x (Hopes)","creator":"Kevin MacLeod","isrc":"USUAN2000012","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.between.two.worlds.mp3","kind":"audio","path":"audio/bgm/between_two_worlds.mp3","mimeType":"audio/mpeg","sha256":"25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184","bytes":2979130,"license":{"cueAlias":"between_two_worlds","title":"Mesmerizing Galaxy","creator":"Kevin MacLeod","isrc":"USUAN2300011","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.boss.kromer.mp3","kind":"audio","path":"audio/bgm/boss_kromer.mp3","mimeType":"audio/mpeg","sha256":"923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd","bytes":3679463,"license":{"cueAlias":"boss_kromer","title":"Burnt Spirit","creator":"Kevin MacLeod","isrc":"USUAN1700053","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.main.menu.mp3","kind":"audio","path":"audio/bgm/main_menu.mp3","mimeType":"audio/mpeg","sha256":"299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60","bytes":7685141,"license":{"cueAlias":"main_menu","title":"Magistar","creator":"Kevin MacLeod","isrc":"USUAN1900003","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.title.theme.mp3","kind":"audio","path":"audio/bgm/title_theme.mp3","mimeType":"audio/mpeg","sha256":"03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3","bytes":2540613,"license":{"cueAlias":"title_theme","title":"Achilles","creator":"Kevin MacLeod","isrc":"USUAN1100463","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.credits.json","kind":"json","path":"audio/CREDITS.json","mimeType":"application/json","sha256":"6240eedcfc62fe286eaa2d3a99496efbe6aaf0fb6a6a1254f48ca144ac7c1ba9","bytes":4215},{"id":"file.audio.se.blood.splat.wav","kind":"audio","path":"audio/se/blood_splat.wav","mimeType":"audio/wav","sha256":"87c30bfd8c336786de618759015f3ee24eee2638d406d7541c7c3fc17201bc17","bytes":17684},{"id":"file.audio.se.glass.shatter.wav","kind":"audio","path":"audio/se/glass_shatter.wav","mimeType":"audio/wav","sha256":"7f066a84a711bcdcf48abc70b07e92ee21957e25cd06765d3637226c55bddda2","bytes":15920},{"id":"file.audio.se.slash.heavy.wav","kind":"audio","path":"audio/se/slash_heavy.wav","mimeType":"audio/wav","sha256":"c93d1adea430352fd38fd9ef315c54801f9fde63350a2fa62584ad20441c7f57","bytes":15920},{"id":"file.audio.se.typing.blip.wav","kind":"audio","path":"audio/se/typing_blip.wav","mimeType":"audio/wav","sha256":"0002e7621f5dd6510cc047dbcfaee2cc7ab958dc20b1d149809958a6f14b1668","bytes":4012},{"id":"file.audio.se.ui.back.wav","kind":"audio","path":"audio/se/ui_back.wav","mimeType":"audio/wav","sha256":"c80e3b1f405a1a2c3d35c5f7b0d94839aba09bce28136b76b94b17a72eaf7f65","bytes":10628},{"id":"file.audio.se.ui.click.wav","kind":"audio","path":"audio/se/ui_click.wav","mimeType":"audio/wav","sha256":"fb67965be3a2b903b7f06c19646df9943f5607bea683798718fe2e77a188e270","bytes":2248},{"id":"file.audio.se.ui.confirm.wav","kind":"audio","path":"audio/se/ui_confirm.wav","mimeType":"audio/wav","sha256":"7fc178ebe16e5de7b62514cca74b1fdcf800dc85156c2d450079279a2446904b","bytes":17684},{"id":"file.audio.voice.result.canon.recap.continue.9.18.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_18.mp3","mimeType":"audio/mpeg","sha256":"5e02d8a955ef36c182bd2293307fec531e24e153d58994cb34a2b68a8b34ae73","bytes":97907},{"id":"file.audio.voice.result.canon.recap.continue.9.37.battle.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"86a766b774def49b6ded10b24608646f954866fdefa589f72d99f7fe3d29d102","bytes":76595},{"id":"file.audio.voice.result.canon.recap.continue.9.37.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37.mp3","mimeType":"audio/mpeg","sha256":"ef041d6a2aaf372b440caad96e3f34bb2191ec52acef42d2e42186de67303304","bytes":102515},{"id":"file.audio.voice.result.canon.recap.continue.9.43.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_43.mp3","mimeType":"audio/mpeg","sha256":"a20ac9b480763a7e9ec332d7954e226947884f56bae8d39cd3409f77e66b234f","bytes":168179},{"id":"file.audio.voice.result.canon.recap.continue.albina.fascia.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"a329c02dcac7c7c700b02e8cd20ae50b7e9f5cf992542b9396c3773c169240c3","bytes":73715},{"id":"file.audio.voice.result.canon.recap.enter.au.mp3","kind":"audio","path":"audio/voice/result/canon_recap_enter_AU.mp3","mimeType":"audio/mpeg","sha256":"e5456be94fcf623863ffcd78173c6f9841ade86d30ce54aeec82966aabdae179","bytes":135347},{"id":"file.audio.voice.result.conspiracy.005.let.her.answer.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"c3eeb96169e86d6d32bd24fcc1716f1b4b6169c24241a4a3785ad6e35bd0499b","bytes":321395},{"id":"file.audio.voice.result.conspiracy.005.refuse.duo.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"2188bc6032b768b6711d3163bdb45adbe7deec31d451ce74cf2b6af85785d93c","bytes":334643},{"id":"file.audio.voice.result.conspiracy.006.block.view.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"a3b7b7a240d59c2516983757140ded9382f6f71e6c5f74b94af8d4ce8110502e","bytes":429107},{"id":"file.audio.voice.result.conspiracy.006.stand.with.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"d162f239d7d33996b43d4c9d2d517bff741e93b46293fcc55a00bfb778166ff9","bytes":444659},{"id":"file.audio.voice.result.conspiracy.007.break.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"1f3a9e8bd205a0e3fb7c9e3cac83e2f286036b393413ccf5fa9d9797e3e17b6e","bytes":346739},{"id":"file.audio.voice.result.conspiracy.007.seize.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"cdacc6deea4032e1a6b3889c6e989a772db86ca71a4343e45235bbd132cbbaf2","bytes":402035},{"id":"file.audio.voice.result.conspiracy.008.hand.pen.to.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"20aa52feaa8fdba93ea122e4264a5eb06266a253371186bcb28cd255427c0cdb","bytes":358835},{"id":"file.audio.voice.result.conspiracy.008.refuse.testimony.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"5e39100ad58ff26de7201dc277ecc8a8f050f8fe377f891cada6bc4eca38dcb4","bytes":339827},{"id":"file.audio.voice.result.conspiracy.009.choose.present.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"47fd587851224f61df1079bb5334dcccee2e87291913900762adea0939e83adb","bytes":426227},{"id":"file.audio.voice.result.conspiracy.009.refuse.choice.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"579736096170a0afb00017791b093021e59651844116fa3b46fcd527896ade75","bytes":453299},{"id":"file.audio.voice.result.conspiracy.010.keep.badge.unworn.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"451f67bf64c927ab02b685fd2eb24983cca5fa46d14a55371b211bc29b97d0fc","bytes":392243},{"id":"file.audio.voice.result.conspiracy.010.throw.badge.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"317363feb895846841f2512ebd4680be547ea512c07b7290ecc09f53bf2284d5","bytes":387635},{"id":"file.audio.voice.result.conspiracy.011.burn.film.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"a6264c49431dbde54ff1eaa4d8d3a7011fc931b07ff3d1fd020388c8ba4cb79c","bytes":361715},{"id":"file.audio.voice.result.conspiracy.011.rewrite.ending.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"af9b903ff26fae14e50a4640b1fe6d591b5003cb8a340756d3061aeea4e0ced0","bytes":355379},{"id":"file.audio.voice.result.conspiracy.012.end.tonight.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"baef1eca98936b80447bce403bebcc1cdc8793ee1204f36275c34f358c06fb6a","bytes":411251},{"id":"file.audio.voice.result.conspiracy.012.keep.blade.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"f7132cd47552bc59b54ad3c7b73d1640f3fb2f215e9f315ab3b4251afd77a7ff","bytes":404339},{"id":"file.audio.voice.result.conspiracy.013.hold.one.second.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"e6647cb10fc82ee28ff451331a5ba9a1dba9b63459c65c962e1cef19c1bc11d0","bytes":373811},{"id":"file.audio.voice.result.conspiracy.013.return.gently.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"0e850f0e57d302c364b6bfe21980b42dee124a283e4a66ef12bd1339b0f2682f","bytes":398003},{"id":"file.audio.voice.result.conspiracy.014.erase.from.catalog.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"0d32f303e7302bca81e8f9a74e3aec0cf46b23bf71427f7f0211deeb029afe37","bytes":420467},{"id":"file.audio.voice.result.conspiracy.014.keep.one.line.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"6c8bb01ee8faf99dca4cb097731a5c741735c223510416f7d98135c323d23f6f","bytes":429683},{"id":"file.audio.voice.result.conspiracy.accept.mp3","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"fca5933a9b7940e9e70ab2bc2d5f3bb2d5c1831e231e002d5e81d2d70187c8b9","bytes":358835},{"id":"file.audio.voice.result.conspiracy.break.pursuit.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"80b95c0329a2ffd9463183d39c56d1a3c0c1be97857807307076441da7d1355d","bytes":354227},{"id":"file.audio.voice.result.conspiracy.escape.to.backstreets.mp3","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"529885d362546fee041fb9daee874070b414eacfbaa0f0b0e202eec1f8848847","bytes":391667},{"id":"file.audio.voice.result.conspiracy.feed.false.signature.mp3","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"c8891dea18a2427f9c866fc45da8a392922ed1a4a29fb6adf9820661e38875f8","bytes":357107},{"id":"file.audio.voice.result.conspiracy.pressure.mp3","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"3af0fae827f9ab4202ed89aafca164c7bbd4f9cc3a3adea4a6c5df0fd15f9411","bytes":310451},{"id":"file.audio.voice.result.enter.conspiracy.mp3","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"24ced6cd96816578da6dfa13fcf83514876c5562cdb6f8e09b1c32b4bcb11c7b","bytes":204467},{"id":"file.audio.voice.result.enter.rebuild.mp3","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"bd654ac516dd06f38f235bdf52260e578ce0a7655ed1111525deaa6e58e44a82","bytes":207923},{"id":"file.audio.voice.result.enter.white.canvas.mp3","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"e8ab325da6c8a12608d75df2bda071b88bb6ff7acf5e1572d9071ea6d8038b8c","bytes":145715},{"id":"file.audio.voice.result.golden.bough.rebuild.bad.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"99044fbcd083fd583946b6883e5b9098fc9c681c04319fb140fdde443f8ed226","bytes":166451},{"id":"file.audio.voice.result.golden.bough.rebuild.normal.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"555ba1fc500a42fc45cddbb0faa5230b5368741bc1d5e78412c002eb1ba786d9","bytes":165299},{"id":"file.audio.voice.result.golden.bough.rebuild.true.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"2cefdaae2ccccd65e997733ccc076bab546212ccd50a7ceaab6b6e07f2bf4b24","bytes":154931},{"id":"file.audio.voice.result.golden.bough.route.complete.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"1833aef2d3549425edf9702212a3dc74c91a2cbda14cb736da529cece809b327","bytes":491315},{"id":"file.audio.voice.result.golden.bough.route.final.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ee88fbcd046d6a69a5fde950904bb78bb78ac8590de0464d4bd9759e19ae5fa6","bytes":208499},{"id":"file.audio.voice.result.rebuild.006.keep.silent.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"212f4fb4d012df83e4ed3b002061b0ac8a6eba70df48e94c1cd3d4c583045174","bytes":396851},{"id":"file.audio.voice.result.rebuild.006.read.aloud.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"94cbc15ffad0d60de661ad72f8f46068442a75679d48014e17805f34c0c7b975","bytes":398003},{"id":"file.audio.voice.result.rebuild.007.match.her.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"596b9c870c33cf5251c74a86de0b633a13fd58220e38d4e68f4e190e74fab424","bytes":438323},{"id":"file.audio.voice.result.rebuild.007.stay.own.rhythm.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"87aec6c173a73614256d9ff98e2598dbec41e0e0d850b9fbcc59efa75f35b4b4","bytes":450995},{"id":"file.audio.voice.result.rebuild.008.protect.current.self.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"304ca21879c6515cfe594282032b1811fb0957dc5803f21b63c001770df3fd5d","bytes":405491},{"id":"file.audio.voice.result.rebuild.008.trade.old.memory.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"9ddad23ff662681ba22e7e3c0a569ce229853bdf73c03cd752b4c697bd79ac21","bytes":401459},{"id":"file.audio.voice.result.rebuild.009.hand.question.back.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"9cbf99b9553ac93f17ffa5b3179f47bb3667ee0729cef49e411c1d3db2a1cd13","bytes":400307},{"id":"file.audio.voice.result.rebuild.009.refuse.perfect.copy.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"f73bf969c5b85ea064c9c6c43ee7780f6f83c579eae92674a94f5dde32232348","bytes":393971},{"id":"file.audio.voice.result.rebuild.010.ask.her.choice.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"c74066ee553419d3bf9ee597a4f851bd2fb5938b5a555af427292eecadf454f1","bytes":335795},{"id":"file.audio.voice.result.rebuild.010.veto.sealing.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"1832293d354bb2b22f61a4a66504f3114df3752012423cf14866e59929c6dc9b","bytes":343283},{"id":"file.audio.voice.result.rebuild.011.ask.next.revision.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"07d1e7d28a4ef027c305d085a2bb06525a63e8f66d563abbcc96faaaf06606c3","bytes":433715},{"id":"file.audio.voice.result.rebuild.011.sit.beside.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"7dc8a32f43d98ae9902fe48573d34552259baff4c692ffb65d2deea5df6dfb98","bytes":430259},{"id":"file.audio.voice.result.rebuild.012.break.contract.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"1c8c41c15241d865afd824a846acc0cf0ab205f26696e0e7c85be5299607b345","bytes":372083},{"id":"file.audio.voice.result.rebuild.012.negotiate.terms.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"12dd9f48b173bbf8fb3e92086a05bc9e9cb28099547345f88931e680e804b033","bytes":398579},{"id":"file.audio.voice.result.rebuild.013.offer.witness.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"e86589de87474e4a6f8d57062df9f43650fc3a154618f5778d52c5e9ffcf4dc4","bytes":374963},{"id":"file.audio.voice.result.rebuild.013.promise.name.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"1cfe997ea1a9204419bba1848681231d5351da60b5259246858533ba814d93ff","bytes":376115},{"id":"file.audio.voice.result.rebuild.014.ask.when.to.light.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"b81315d3ae6125ade7203449a21784899d0ccf28126b576feaf319dc80de2f69","bytes":423923},{"id":"file.audio.voice.result.rebuild.014.keep.unlit.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"fb826259dff130419016dbbe3720b59b7326c454fcbf7479dd9b8fc6a93fa2aa","bytes":433715},{"id":"file.audio.voice.result.rebuild.accept.missing.pieces.mp3","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"025ab49988979a6e3e8f9cb317f22442a0713b06c30db883126a0a3162e650a9","bytes":361715},{"id":"file.audio.voice.result.rebuild.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"65d32bf4c0b1141ea6ae80963cdf550162b5896279d98ac6e2cccd40bfaa63e1","bytes":236723},{"id":"file.audio.voice.result.rebuild.cut.false.completion.mp3","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"0b7ebcceeaa3fcd9939421b7aee1b5fb6d7c9d14a4ca98dd7435ef1f29205120","bytes":367475},{"id":"file.audio.voice.result.rebuild.guard.fascia.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"f11f541a1544a54ba6d13f6adb0d93344ab451bd099d2005a5ac8c3a8cfe6369","bytes":389363},{"id":"file.audio.voice.result.rebuild.push.into.raid.mp3","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"68acf768a66dd60d6ad996e4a06a57ef2755b9787f90f32d4f572b6d8c2426e0","bytes":406643},{"id":"file.audio.voice.result.rebuild.question.fascia.mp3","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"d49e2703fac28f03e412f0001ad711a642ae86bd88b37ca116d4c392f03099bb","bytes":228083},{"id":"file.audio.voice.result.rebuild.use.rooftop.signal.mp3","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"ab251367e6459f692c3477dcd584be69f0f3c43ea3912d22748e065d36987151","bytes":352499},{"id":"file.audio.voice.result.return.opening.from.rebuild.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"4fb14344c5e70dfd1bc4f6b3ef069c4ad64cf34f491992513f836ee3cc93ce90","bytes":289715},{"id":"file.audio.voice.result.return.opening.from.ring.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"9157a6a67aeac5fab63aab484d8a5fb2fe3a3352e3f50dc20b77351d1248eccb","bytes":278771},{"id":"file.audio.voice.result.return.opening.from.white.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"a0e41b784a562c97daa29e6174c6d10a22ff9161e15af5fb15b80ba1992b76eb","bytes":301811},{"id":"file.audio.voice.result.ring.conspiracy.bad.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"f613f8e6d2453ec2827bb0acd07911ea84e7ef59edca47f378b7d76c0ce2c240","bytes":151475},{"id":"file.audio.voice.result.ring.conspiracy.normal.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"33bfedb7ada3a4bb3134f0eea06241ff6ac26a45c289d0a7261ee66b7ab9bca6","bytes":187763},{"id":"file.audio.voice.result.ring.conspiracy.route.complete.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e13a967ca990933a69a93dcd78c122a5119f1c4d7d8f7e8c50ec15bae74d3b00","bytes":419891},{"id":"file.audio.voice.result.ring.conspiracy.route.final.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"472ea9d9842371171504444bf5341c93c318c1998d2e81ea34833e020a8ee208","bytes":232115},{"id":"file.audio.voice.result.ring.conspiracy.true.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"fec30778f7f3ce3c3d76b6bf7028e7aa6ff5529e421e33a4494f67acb10205ea","bytes":167027},{"id":"file.audio.voice.result.white.006.name.silence.mp3","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"052bdd2c9ad58dc357d4a8e2efa1c775e719bfa0df5cc6a5b7ac5b5f2af548f9","bytes":418739},{"id":"file.audio.voice.result.white.006.refuse.naming.mp3","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"ddd59afe994de4a252c61a3803bbd0c63997304b9e6df37447b59e9b965017ca","bytes":425075},{"id":"file.audio.voice.result.white.007.ask.fascia.term.mp3","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"6bf8213e512ae808e04046fa39600bed3a1b59e7ce91dcbb902bb0b1fb666992","bytes":426803},{"id":"file.audio.voice.result.white.007.keep.mirror.open.mp3","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"33a99a192d13ca70613e200a261e7b33659be9ae2b5d4efe34efa334d75d3e05","bytes":398579},{"id":"file.audio.voice.result.white.008.hold.fascia.mp3","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"41c2e3016510dd00c492632d8189788d79fc6e54b3383550412f1e057f071bfb","bytes":332339},{"id":"file.audio.voice.result.white.008.stay.witness.only.mp3","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"c6c37b0dae21ed498ef7c5c7671ed8429861fd5027ed8de840f27fa65c1d49b2","bytes":354803},{"id":"file.audio.voice.result.white.009.keep.half.step.mp3","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"eb273061a887f8ea4796b2804cde9e109aed783bc88853b2592e3f4ced0e241e","bytes":374387},{"id":"file.audio.voice.result.white.009.share.umbrella.edge.mp3","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"a4f1748e8858f3adf850f0b3c2c6b38e65fe9b23edd557966889b071f0b09c9b","bytes":323123},{"id":"file.audio.voice.result.white.010.acknowledge.leave.mp3","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"6eb65fdccaf7e057ad12905510492926701ea449996d3c5697d56729dd8e1705","bytes":358835},{"id":"file.audio.voice.result.white.010.offer.return.ticket.mp3","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"45594596a7c3fc007652bef42743925bb65a7615f873cad61d3429386b6eff4e","bytes":361139},{"id":"file.audio.voice.result.white.011.curtain.call.mp3","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"42179eea6ade8f967fd3ed425a108fe78172750b55804d3fdf6ed6a57ab1d5df","bytes":384179},{"id":"file.audio.voice.result.white.011.walk.beside.mp3","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"5364cd974fd319a09968ea5dd8d47bacb304bc918dc1a8180d9b905bfec6d4e3","bytes":391667},{"id":"file.audio.voice.result.white.012.let.her.decide.mp3","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"8d92faf82d8e23de74356dea4233451838b0cf1ee0a41ab884f8407fc2ecb97d","bytes":364019},{"id":"file.audio.voice.result.white.012.refuse.exhibit.mp3","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"f13e7e5ddde629cffe4e022558da710927c6a9ea98b21b938cfa47c06fda6b65","bytes":346163},{"id":"file.audio.voice.result.white.013.point.to.mirror.mp3","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"adf910758dc7147da909d2c11f12d49cb04fe05dc10095c915dabb83e4d5e490","bytes":417011},{"id":"file.audio.voice.result.white.013.refuse.to.choose.mp3","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"b3aa0c454052fd8f5dd1981af5510d3acd0aa9b23d1d3c82e0407b59b4fada8f","bytes":419891},{"id":"file.audio.voice.result.white.014.keep.base.color.mp3","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"e5abbde8433953db9427ab67392fc60bb77aabd16ed2f507d6c40d323701476f","bytes":403763},{"id":"file.audio.voice.result.white.014.offer.restart.mp3","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7b0a0fca1de3ae894ac6455f61354b0004fc7a4ae669990f3eb17c26c6cd6a5c","bytes":438899},{"id":"file.audio.voice.result.white.canvas.bad.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"c689384a6b62ca60bd84391fcecb3abf36158a295d70a0213079969f28f70def","bytes":164147},{"id":"file.audio.voice.result.white.canvas.normal.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"0ea2a3bb0d492de34026165ff824b572dde9aa0561ecb32ac1df0c3d037fa217","bytes":151475},{"id":"file.audio.voice.result.white.canvas.route.complete.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"94f66d44430484558772b9203ee1050accb21fa9f21110a8b3664cc8e0237896","bytes":430259},{"id":"file.audio.voice.result.white.canvas.route.final.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"8e5228040c26e7c73ad64f14c4193f27b6aa73dd95460494258f47ccfbb83aba","bytes":230387},{"id":"file.audio.voice.result.white.canvas.true.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"82c737637b2243b9be6ffb7dc45883f143773bae425420ec730e03c8510f32c4","bytes":150323},{"id":"file.audio.voice.result.white.follow.to.lab.mp3","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"40e6d43999da61bda9da83fd878956a088de4cb25b6cc0d99be4b8214810351f","bytes":401459},{"id":"file.audio.voice.result.white.interrupt.lab.terms.mp3","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"dc0db8f0f34333e77b1186156c828aa59e1d510caa95aa0e97610a5065add968","bytes":364595},{"id":"file.audio.voice.result.white.keep.empty.seat.mp3","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8a76f675d5ea394277777e38529d1862f21dd62a5b2685da635ed0527df7e052","bytes":395699},{"id":"file.audio.voice.result.white.share.rain.window.mp3","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"20335d2fc8cfaef91400201f56bd1be36b2d9ea44402037c73bf06dd31af4b3a","bytes":378419},{"id":"file.audio.voice.result.white.sign.witness.protocol.mp3","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"e7636aa5a1ef0e083f6b8d3ef998b1c370cf1c529a2f37d0e89594b37f956400","bytes":345011},{"id":"file.audio.voice.result.white.tease.back.mp3","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"1f65a84e40a1502a6fe8e2ee76133eaacd13e6673a4abd42b573750db8e155db","bytes":309875},{"id":"file.audio.voice.result.white.touch.boundary.mp3","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"367db6cdbaa418ed281c5d5e32d56c6fb59c82f8ac911913ecd1be2b6f7938ad","bytes":321971},{"id":"file.audio.voice.scene.canon.recap.9.14.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_14.mp3","mimeType":"audio/mpeg","sha256":"177b6bb8d06c753e852f15f15053ee009e752c2d6b6e60cf5b9529808378539e","bytes":563315},{"id":"file.audio.voice.scene.canon.recap.9.18.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_18.mp3","mimeType":"audio/mpeg","sha256":"92d1bdda2e7c3a93bf3b4e2a68a424bf85d10949df29e99f57f026710c83a10c","bytes":839219},{"id":"file.audio.voice.scene.canon.recap.9.37.battle.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"d136a8873f583ce3c5df44c57934c316402ebf899020e61c2ef21abf24ca18d3","bytes":675635},{"id":"file.audio.voice.scene.canon.recap.9.37.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_37.mp3","mimeType":"audio/mpeg","sha256":"63e76cd6291fbaa5d6f2dfe363b704e98c63ab0ade8eabb1bb96ff1ace9e39b0","bytes":916979},{"id":"file.audio.voice.scene.canon.recap.9.43.outcome.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_43_outcome.mp3","mimeType":"audio/mpeg","sha256":"29214a431ceda8a8917df7b47af4d31df69bb22b709c0d1ac6887579440310ab","bytes":1276403},{"id":"file.audio.voice.scene.canon.recap.albina.fascia.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"9f445dfa83c196e54ab760d5d10b1ca08a23199e1d7a3c117bfbe04d9c187fca","bytes":2609267},{"id":"file.audio.voice.scene.golden.bough.001.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"17b56b325e5051b43a27459152b094c53d12ac2edf65c03c0ec65533cb20a29c","bytes":203315},{"id":"file.audio.voice.scene.golden.bough.002.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"d6365c5d4894da5e57e88319d8c2fe264f25c4199b41031c8ed72ba40e09ee19","bytes":154355},{"id":"file.audio.voice.scene.golden.bough.003.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"1ad02d7568d0ae545c157a13989da73a7f7006aea805d0617a3d99ee3421ccfc","bytes":290867},{"id":"file.audio.voice.scene.golden.bough.004.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"a59f7ec4c382fbe7e9f54e6eca0c1c4a1d0c5fc3d8fb6b431831c69a8da8fc78","bytes":290867},{"id":"file.audio.voice.scene.golden.bough.005.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"507228ac0a027d9c8f3534301d01fff6b9cedcf322a4daca6ec6803288517688","bytes":255155},{"id":"file.audio.voice.scene.golden.bough.006.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"ba279ed3531dc0ed703444d8ef096802428ca7ab29fcbf4f3873588ceb4d786d","bytes":311027},{"id":"file.audio.voice.scene.golden.bough.007.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"e493295b8fc9a9777274dc6ea8bdf29f6fa36ffe186a9e8b705bc4f95e9dcf6a","bytes":326579},{"id":"file.audio.voice.scene.golden.bough.008.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"41eb3a1a3f955bdf78b8107b5f3aeb6e06a1c1446c0300f4de0f712a3b1a310e","bytes":308723},{"id":"file.audio.voice.scene.golden.bough.009.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"54d231c0a6980338b1b28ea6ce15ca5a284f11bb0631106e1e3cb393c8154f89","bytes":315059},{"id":"file.audio.voice.scene.golden.bough.010.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"5ea795c0fd6273b40f187838c3ab9129a255d1dca1f7e65f155ee7c2b56c2972","bytes":305843},{"id":"file.audio.voice.scene.golden.bough.011.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"99ca50db65946593f20b548272f662389b678e88a6241d83d4d068de15595509","bytes":249395},{"id":"file.audio.voice.scene.golden.bough.012.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"152da1cd4f137ebca0900f228e2ed76cf392114063f02c3e63d6193ac093abc4","bytes":308147},{"id":"file.audio.voice.scene.golden.bough.013.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"47e62c9d7dfb826b8fd9caf7a722a5bd0b4e1790632a24dd3f7a5acb5ec138b4","bytes":306419},{"id":"file.audio.voice.scene.golden.bough.014.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"aaeffda74a330c6f70513fad58a0bfb8ebd8aa5793806ac74075e9aa4f4224d7","bytes":256883},{"id":"file.audio.voice.scene.golden.bough.015.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"796624549e2d513c2f139e412cbb989e3d9fa9221c6d6cb9c5d0d18cb9e14b69","bytes":298355},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"cd354aeaef8a6692d7f672d11d0ee3cf0c6bedfb9bd350a5f889ea2160902518","bytes":301811},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7d0130d4db06b824850c69ce95c00de02af01fccaca56854c850e0284c9f29ae","bytes":207923},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"bd6aa132a1ac2f6c5fe62a3f328e5950cdb2b8ea54a3a92399bd7afed1f3e4fd","bytes":287987},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.true.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"43cbec46f0fd8d9debb60a95f16e0e3663775a057c40df9af5dfef8e921c42f5","bytes":328307},{"id":"file.audio.voice.scene.opening.001.mp3","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"0ab7a4a0b1a11486d6feaeac10e40b2b9aec2675f19dcce2ddb501c679238074","bytes":425651},{"id":"file.audio.voice.scene.ring.conspiracy.001.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"f4535e60e9ebfe3a9f50940530ec05a38ca9e7dd665e2f7064ad0d52811753c2","bytes":186611},{"id":"file.audio.voice.scene.ring.conspiracy.002.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"61c43123ae22fe7a5f07bd0d7b10070f527a4d8d9413b2c6e15b27c6566242f8","bytes":235571},{"id":"file.audio.voice.scene.ring.conspiracy.003.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"51c502de79a93bb2b1a26a98501944d677fb2c15a5a49e15a29bdd31e414a498","bytes":247667},{"id":"file.audio.voice.scene.ring.conspiracy.004.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"41d01bc36452401d3300d76fe34a239e8c75f8711c9a5a5448865c2ecb49897c","bytes":291443},{"id":"file.audio.voice.scene.ring.conspiracy.005.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"3e3011f9fdefa13e482f113f80ed4b977e27ad28d279150b8ab7044801ddfc01","bytes":280499},{"id":"file.audio.voice.scene.ring.conspiracy.006.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"39c5261f5ef3d79e728f8364259d03f4d6de58242dc63be4797fe92077cb74e6","bytes":256883},{"id":"file.audio.voice.scene.ring.conspiracy.007.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"bf7b82d130b47ba9f0efdf5a0590b87d41601bcf2d90f01c20debb7d931cfc8f","bytes":270131},{"id":"file.audio.voice.scene.ring.conspiracy.008.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"2709be5f3a41429a9bee00e2a8631e14884cf249fee14c9944001fc865dfeb4c","bytes":306419},{"id":"file.audio.voice.scene.ring.conspiracy.009.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"30ab38b0d89d5d55b3ee833f4446be0b572508195146ba4529670e9293e4bc60","bytes":239603},{"id":"file.audio.voice.scene.ring.conspiracy.010.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"7902ea7116a00c992000ba090b0b886fadfbef3b628c57141a43e473a6478edf","bytes":287987},{"id":"file.audio.voice.scene.ring.conspiracy.011.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"3ff28c1d82f871ea748100c320625f9f9d6ab0e53d8929b3e3dd0f09cec392c5","bytes":291443},{"id":"file.audio.voice.scene.ring.conspiracy.012.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"43419544d4b85735fc4c6f3e8d3239307c4b19b4ebeade5d1120ef815715d6f6","bytes":273587},{"id":"file.audio.voice.scene.ring.conspiracy.013.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"3065ed0dc9815078d8a5148a84ed2e29b7fb6cd9f7300cebe791ed20c59e0a53","bytes":306995},{"id":"file.audio.voice.scene.ring.conspiracy.014.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"dd44754be2c8d7146bc1593bb86525176f25e94c47f696498500a106ec5a58cd","bytes":254003},{"id":"file.audio.voice.scene.ring.conspiracy.015.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"97b9eaf4e55aa2b333cc755914da99c5aa967ba3696b762800ea3249a138d8db","bytes":366899},{"id":"file.audio.voice.scene.ring.conspiracy.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"9e16b3ccefac5a327e73e53fbd9dc45c88d12cb71b0b1129b696de7c1e957c05","bytes":319091},{"id":"file.audio.voice.scene.ring.conspiracy.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"b8b574bf431cc9bdbadfe73fc3a0622a16f7d27433c7d3d38cb1fdc0655b6682","bytes":216563},{"id":"file.audio.voice.scene.ring.conspiracy.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"9ddbee2b9dd93b149de53a5806a4fd9900a3bce05fd204c7f9a53c8140c295af","bytes":270707},{"id":"file.audio.voice.scene.ring.conspiracy.ending.true.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"55e5b7c7eb8118623d1b36aaa5e85d9b6ab4286c3e205c6e8d262be481691c37","bytes":347891},{"id":"file.audio.voice.scene.white.canvas.001.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"61917fda12f4f29461e9db4603781dfe6af6351b9c58e8ac89fd6e11176a3d91","bytes":149171},{"id":"file.audio.voice.scene.white.canvas.002.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"3fa78fe28acb401aa624e5dc0a149c430be3543587c707a460cc19238519b227","bytes":207923},{"id":"file.audio.voice.scene.white.canvas.003.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"30c100d35a1e686cb6108e478d3c4eebc698b2bcf7fb964fde186a6e96f4564a","bytes":236147},{"id":"file.audio.voice.scene.white.canvas.004.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"829183a0e33a583a8af9072cf4914baa183d24cdb28d9fc9685c2ef02f8d9458","bytes":273011},{"id":"file.audio.voice.scene.white.canvas.005.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"aac01f6f0bfb4130603e8ab330d08aa661878e5acaf94e9c1230a356456f16c4","bytes":264947},{"id":"file.audio.voice.scene.white.canvas.006.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"136978b119f80ca4655d4524f31808012d3c01076a055f2edf3a1a5a9c38f0eb","bytes":289715},{"id":"file.audio.voice.scene.white.canvas.007.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"3b2ae779f6a0764aa8055571ce7a8fe0418c76cc9a2a7da395925ac3c90e2e91","bytes":293747},{"id":"file.audio.voice.scene.white.canvas.008.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"4846c374ffcf1f93861daf210c752df86f4c00e1e3836d860d69522a116588ed","bytes":322547},{"id":"file.audio.voice.scene.white.canvas.009.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"fc92b8497ec1f4133deafffd4f0204dde06654db1aea65ee0f1573f20bbf8354","bytes":258035},{"id":"file.audio.voice.scene.white.canvas.010.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"82ce426cffeabb5431b3d08764ce3e7e42686b3f71f2e46736ecaa2a931d9135","bytes":216563},{"id":"file.audio.voice.scene.white.canvas.011.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"c70978714c71795b05c1eff9adc92713e956103e2d2a8ac8e8576f65b2b7a01a","bytes":287411},{"id":"file.audio.voice.scene.white.canvas.012.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"e6ccc5d30d1785af804799386b190334e375a77051545f1e49d211b5a2ce982c","bytes":254579},{"id":"file.audio.voice.scene.white.canvas.013.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"01d2f23ebdf72832e6a5b7480d5e4202e92f8b6a7445e614f6a00b324d5500c7","bytes":283379},{"id":"file.audio.voice.scene.white.canvas.014.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"1d2f602a2128a3d29d0953c583a78b495f75e55478cabfb5606e0a719c0db871","bytes":275891},{"id":"file.audio.voice.scene.white.canvas.015.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"5e4dff6e9f9d0f0373ceba2400c2044a6dacdc3dfd1b0a465cc4ce5dd8010619","bytes":306419},{"id":"file.audio.voice.scene.white.canvas.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"4a724974ac526d8bb95a3b999fc0a4d04dd8fe645433f89b677d8df29c3c5bd4","bytes":294899},{"id":"file.audio.voice.scene.white.canvas.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7b3659054aae442107a743730580dfee2084a7b9ef612e5de43300774412ed49","bytes":209075},{"id":"file.audio.voice.scene.white.canvas.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"7e098e1806cb221d667e4ade629f5b6696f19ac270afc3eef05b8847457ca140","bytes":260339},{"id":"file.audio.voice.scene.white.canvas.ending.true.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"8d2e7919504bf82ed1df05b648d9959d486caf9b9abffb9aaa9d883f517db401","bytes":288563},{"id":"file.bg.backstreets.rain.jpg","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"2028722421626040d012db610e38f80c0707b4a708468473b7031f387600907f","bytes":172971},{"id":"file.bg.city.rooftop.jpg","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"aa3311072a00a7d4afda5d1d834299d87591916921801d3270cc9ff6cd966b87","bytes":146087},{"id":"file.bg.golden.bough.jpg","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"6edf1f90d2b561048fd5d45bae15cbe3d6a2eafec6f3855dd3eeb1b5b060a0cb","bytes":208926},{"id":"file.bg.lce.lab.jpg","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b779c2834a255687728fa67129ff7929a98809b6805d1a31703a8afdf8030107","bytes":203123},{"id":"file.bg.limbus.bus.jpg","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"b0d64d366ad3f92ab2b251ef374c6bb1898cf9079837b0aa910c0b00e145bc09","bytes":232135},{"id":"file.bg.mirror.corridor.jpg","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"17277aad2a77db022d07482af12541b3a5380aef4b7093757907aa8949e5e590","bytes":167392},{"id":"file.bg.nest.station.jpg","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"91208785c1bc204ea79f0db217fb8fcebebbf606829590e857765f197b9e12bb","bytes":210265},{"id":"file.bg.outskirts.dawn.jpg","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"44509077697bcad88c44498d157ac05515804b2ef65fcb1bdca8b8fc1ef37e6a","bytes":242337},{"id":"file.bg.rain.room.jpg","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"e997abedea4542c4b4776bf3492b28f5852a623194b379613c32bbb39ce22922","bytes":257137},{"id":"file.bg.ring.atelier.jpg","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"42931f287f934dacdbfdfe27cab2be02022233fda83e440d314779f43b950410","bytes":245753},{"id":"file.bg.spider.gallery.jpg","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"df109ef2411bb7cf3c373360c67ed67dc714ec30b56ee8e9932ec567ab27ca1d","bytes":216657},{"id":"file.bg.white.canvas.jpg","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"dc29a4ee28e61a32631abc2b1f3de090bcffd9637e1c088ffd35f59fd960fcb8","bytes":95655},{"id":"file.cg.araya.rooftop.jpg","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"505bec4c1bdaa6968f8f59352849c233cac1874c2c7c72964c9841e7dfbee89a","bytes":224801},{"id":"file.cg.art.resonance.jpg","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"cb9f8de75f6d3524dba019be70cfd04a0974fe4734709ede92f982fa785ff6df","bytes":156110},{"id":"file.cg.backstreet.pursuit.jpg","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"b3ed4aa5bcfca9c56b48f47c19305d7073efaf254bdf11edcedf0aa9bb23fa5b","bytes":251161},{"id":"file.cg.canon.recap.9.18.jpg","kind":"image","path":"cg/canon_recap_9_18.jpg","mimeType":"image/jpeg","sha256":"d3340cb2fa8a99916f6862cde95f54f7a7943ead2fcf19fda3aca08d95acb5fe","bytes":229444,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"a134d135c3bfd83d59f40ea7740984b419d9b0cbd96943d03c8a21f0f546879a","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:40.936Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"a68cb560ded868c79da5f6682539f5aeb2eef6ccf6e98d73f4e26b86575a0d3f","role":"canon-visual-reference"},{"sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","role":"canon-visual-reference"},{"sha256":"efe8cde8732d1a5a25062155b4d111dbf6185c3ba85e5612d5b67ccd465ec5bb","role":"canon-visual-reference"},{"sha256":"9159aa76d13f54965f607398df7f032f66bc921470e4b8c94462e63f56f40263","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.cg.canon.recap.9.37.battle.jpg","kind":"image","path":"cg/canon_recap_9_37_battle.jpg","mimeType":"image/jpeg","sha256":"d0fe0f6571b9cc6ddba19d0af0441d0cc2f6ef2477480fe4ce838ccc123bc918","bytes":205395,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"131422b7acd3331ca30f14edd05d1e103cd53cb3d3c05664e530580a315dd506","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.058Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"a14e568cb94fb6049b2bd0ddc37567d062067f0d6a74cc8cc7f839f30a22ee11","role":"canon-visual-reference"},{"sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","role":"canon-visual-reference"},{"sha256":"ec23a9bd281921be8cd3ece2fc2c81a8815c79c79b553bf1924cac65be174275","role":"canon-visual-reference"},{"sha256":"3409d80b72c96e5568a2b9153c533877680f1fb6a69bfc6516789c7336ffb9a7","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.cg.canon.recap.9.37.jpg","kind":"image","path":"cg/canon_recap_9_37.jpg","mimeType":"image/jpeg","sha256":"4245c3f9646ceac452f45a5cd1072a31efc715c289b24833071ff28ce0201c75","bytes":170894,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"733f8917cd994057193db18890b011cff29cbeb30596f93b2c5d03879561938d","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:40.997Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"a14e568cb94fb6049b2bd0ddc37567d062067f0d6a74cc8cc7f839f30a22ee11","role":"canon-visual-reference"},{"sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","role":"canon-visual-reference"},{"sha256":"a0033f3a9da006a862cd26eaf93ff9a86856f18a5a1ef7f2490461b84ef5e0d8","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.cg.canon.recap.9.43.outcome.jpg","kind":"image","path":"cg/canon_recap_9_43_outcome.jpg","mimeType":"image/jpeg","sha256":"f1920022af7457b94bb23fb6b033e6dee294f5a58d6c7ed9a638fc81834e218d","bytes":159644,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"8052752c071d224a8c4b62a4e2dfe55091c8bacd05b1e4a4807dd5b04129035d","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.117Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"a14e568cb94fb6049b2bd0ddc37567d062067f0d6a74cc8cc7f839f30a22ee11","role":"canon-visual-reference"},{"sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","role":"canon-visual-reference"},{"sha256":"ec23a9bd281921be8cd3ece2fc2c81a8815c79c79b553bf1924cac65be174275","role":"canon-visual-reference"},{"sha256":"47fb0ab9dc1c493323f3f1acd5bbbd389e7de075426d9ef02d9afe732afc8f70","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.cg.canon.recap.albina.fascia.jpg","kind":"image","path":"cg/canon_recap_albina_fascia.jpg","mimeType":"image/jpeg","sha256":"4c3a3146a1dc8091a5b39a9a367ae0cf62df013ba469cd5a91a7820a1365af75","bytes":211756,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"771075e731034189ba8daa09b17565fa00332d6464503eb02b777bc12abd734b","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.175Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","role":"canon-visual-reference"},{"sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.cg.combat.transition.01.jpg","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"aba7ee4262fa8c75343f1dcd91a89c4c2f541d8184b98fd0b2e328f26e1a64f6","bytes":306008},{"id":"file.cg.conspiracy.contract.jpg","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"b9c40c214efe4e81523100a7e0ee963ec6aba7438c2628e16fdc86431ab604f9","bytes":240901},{"id":"file.cg.fascia.heartbeat.jpg","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"f81c3dd3ffbdb042090546b3fec43d736a97096179c0fdb002947458df570db2","bytes":175916},{"id":"file.cg.golden.bough.ending.jpg","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"27fb1ad1df4250ca823aa74f23fb61805889a2ab33e6a09e4b8c7c6ad6b0dfae","bytes":221408},{"id":"file.cg.golden.bough.rebuild.jpg","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"99ab6dcb6b7e643fc942a1199829fd6063007caf6a4413494a697911bf93ee52","bytes":241426},{"id":"file.cg.hollow.torso.reveal.jpg","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"a5c942e39e9967ec713349e5646ab781d7a8294aa876f8894c5ee076093e2197","bytes":154697},{"id":"file.cg.lce.raid.jpg","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"91fbaf6b6b67db5902bd23af21cc2af3db5ef62460748121307234b2592754a7","bytes":251262},{"id":"file.cg.limbus.bus.night.jpg","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"49357dc9a7fa859bc5cb1db2dbb2f7b5fb3e6ca19abef0ea04f811841a8c716d","bytes":212824},{"id":"file.cg.maestro.shadow.jpg","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"72e8e55923e1717f52b8a30049746dc258df7f01f7ea91af3493bc974766b762","bytes":166862},{"id":"file.cg.opening.rain.jpg","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"457696a02349c6b9745c8dc7a5f048d1d067b852a4f24b271d4bb6d284bf48be","bytes":180039},{"id":"file.cg.rain.confession.jpg","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"4a5f80d17032543993bcb490c1f8f6eff6bec52de4416245f80dc2c008f33c6b","bytes":249164},{"id":"file.cg.rebuild.awakening.jpg","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"2e404e9eeaa8bcb46bc63486a219ccd96d9376d701110decd19aaa0f3c999469","bytes":191955},{"id":"file.cg.ren.interruption.jpg","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"68fa377d1ed5e6aabd5fe46e6ce16ea4f19560c118484f5ce61ea8a34fd91c02","bytes":215359},{"id":"file.cg.ring.conspiracy.ending.jpg","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"de385c9a8213f57fe02f4f82c92e75fea02053b3e7746d27ec9d159957eba23a","bytes":171259},{"id":"file.cg.ring.invitation.jpg","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"c81d595770ba53e1563b6a3e33b3eb2e1877e0f6bb0f9e576bb9d4f14d29967a","bytes":218535},{"id":"file.cg.surgery.of.memory.jpg","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"6b711204cbf9f6d56d67b9e8a81a36b915cb54ad08ce168410f6b5f73efe8ebc","bytes":234073},{"id":"file.cg.trust.threshold.jpg","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ff181cf1e246356b2159059b095eccc1cfdf7015acb442c978a393d001961e1f","bytes":218518},{"id":"file.cg.white.canvas.choice.jpg","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"f29ba0d9d48ae0059dc4320c93acd5fc221e7cb29749c05375473fd20529c356","bytes":153144},{"id":"file.cg.white.canvas.ending.jpg","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"1c6c05ff9b4243e65851045bd4afbfed7d37c032dc95def7bbcbf74baacc1d9f","bytes":206831},{"id":"file.characters.albina.armored.png","kind":"image","path":"characters/albina/armored.png","mimeType":"image/png","sha256":"1289dc40db0804e8007af624efc1a13e7c014d6079a5dda47ecb0c62b8006504","bytes":2172236,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"dd6f523188ab8a24692466693c42989909123e7b57ceca00d412aa3a2ec01c12","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.236Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","role":"canon-visual-reference"},{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.combat.png","kind":"image","path":"characters/albina/combat.png","mimeType":"image/png","sha256":"3447b8cb8df4edec6325ab5262892a35bff6854cd7f0fa44aaab268a97182f62","bytes":1986358,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"073f993158e939e58ee94768ce4b33660dae1cfeaf11e5d92776b52cac4c6272","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.320Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.endgame.png","kind":"image","path":"characters/albina/endgame.png","mimeType":"image/png","sha256":"df6bfc313afb7a707cc580ed806efdbfb79e959f48c80f4a2674bf0318a7e51c","bytes":2160675,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"2eb3dcc1460b62f6868e3fc5ae0e4d193cf140517efb6cfbd76a3db3a0cb750c","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.426Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.fascia.open.png","kind":"image","path":"characters/albina/fascia-open.png","mimeType":"image/png","sha256":"3c02947a0b3aa6b3c98012c580be7fedc92d2471d220f1440ac1a9d382d16428","bytes":1962970,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"0d210bd931e873db23605c9055aa9b88f4e602cb89b3d6013dcbacca50e26761","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.514Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.furious.png","kind":"image","path":"characters/albina/furious.png","mimeType":"image/png","sha256":"b8a323f784eaebfc647ae89e77dc4e4b91dccd395e7907401d28dee9c62c7ab4","bytes":1998913,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"1e337c9de61aa0e09ce890a897efb8ed0d1c27c61a8254617d9dce06434d2af4","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.597Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.golden.bough.png","kind":"image","path":"characters/albina/golden-bough.png","mimeType":"image/png","sha256":"c241ed5f31cf2c34cf0f9d3fd00968d93a8bb81d23b8a52e460614dd5643bfa8","bytes":2212827,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"630da67520f439af142ac03c6aef6d8718d28b9ffe7ac51761665a77d2e6225f","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.678Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.maestro.png","kind":"image","path":"characters/albina/maestro.png","mimeType":"image/png","sha256":"2f3d893f3d46d6539cdb100b8fc160feeec7e115d4dc114cb62e0872a41ce666","bytes":2172368,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"0edd7904fe047258df3c793d5c760e176e8b8a7f4a2f188478e3dad5aee280a8","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.110Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.normal.png","kind":"image","path":"characters/albina/normal.png","mimeType":"image/png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","bytes":1963407,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"d276251520f32cb9831f16e3ab87dcaa8a492ef64a8b01f7b32302cb201e2e62","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.239Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.rain.png","kind":"image","path":"characters/albina/rain.png","mimeType":"image/png","sha256":"e49132402829886bcdc6b847b02810e8849cd0932c882ed4c666565c6a0ddf6e","bytes":2067569,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"9d34fe57a2df51400283e9fd4d0e3d2fc70fb5514e4d4e99539b5be2faa4743b","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.180Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.ring.conspiracy.png","kind":"image","path":"characters/albina/ring-conspiracy.png","mimeType":"image/png","sha256":"60fd0b62d59b71179b7d5a2b498424968515f569052cd7e1754261eb275654eb","bytes":2100795,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"cdf177db14088fc00945e1ad763d984d4f71a1ac8f880180aae51add824a92e2","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.229Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.shy.png","kind":"image","path":"characters/albina/shy.png","mimeType":"image/png","sha256":"1ad926e1f3e1c6300e55849c1c224ca0fba722df1f89fb88c905867c68e5d52c","bytes":1903598,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"51ea8be2005a421e16ad8f11f17d489e0a103c34059846a2c2040a7cbae14d8b","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.316Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.surgical.png","kind":"image","path":"characters/albina/surgical.png","mimeType":"image/png","sha256":"d6ef29a4e507767be8df6f69701d9b5cf03614172c554540ab6634bfce7a736a","bytes":2146240,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"f6699c4a8f6e884560e7609aa0fcdd473fb0573f6f24b219922811ba8d9f574a","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.387Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.albina.white.canvas.png","kind":"image","path":"characters/albina/white-canvas.png","mimeType":"image/png","sha256":"3987479196fbdab2a2f5d2d4f33694eb6941590bfbb0ad47b69fc55b7848d215","bytes":2294606,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"189d8435920b1866dbd8fe8d161ae41df8bd34cef1c70c7c601f9ad13c487726","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.440Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.albina.normal.png","sha256":"adae648a47c2a5285181cbbeb4d4066792b34f129cac40e48ab8974f3b9cc2ca","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.callisto.normal.png","kind":"image","path":"characters/callisto/normal.png","mimeType":"image/png","sha256":"e6158578e0fb0316c60224b86336bfe582a6515539f7ff22e2a7f2be4683c663","bytes":1731827,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"80417b5a4067aebc356d894691b168ae6cd2aca695a06d9de27c83d0589a6843","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.312Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"ec23a9bd281921be8cd3ece2fc2c81a8815c79c79b553bf1924cac65be174275","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.dante.normal.png","kind":"image","path":"characters/dante/normal.png","mimeType":"image/png","sha256":"40487edd1ddf95c2448e6dd1b6a74bdc25ed32001aa3bbf7282d436ba48be80d","bytes":1553315,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"fd2fb775497fa7b8a2731134510ef684fb4cd98c2ae8bda5a24bda6895eb3e3f","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.386Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"9159aa76d13f54965f607398df7f032f66bc921470e4b8c94462e63f56f40263","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.faust.normal.png","kind":"image","path":"characters/faust/normal.png","mimeType":"image/png","sha256":"181d1804a348d2acb99e1c5023eac471b732651b50b5aaeacbcfd329127d8eae","bytes":1006098,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"ff67e1d2166f56511280152f749a52fae2a120c7f2fd75277e0a5e197cd2097b","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.443Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"a0033f3a9da006a862cd26eaf93ff9a86856f18a5a1ef7f2490461b84ef5e0d8","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.golden.apparition.normal.png","kind":"image","path":"characters/golden_apparition/normal.png","mimeType":"image/png","sha256":"132c72858792800b8bcbb81e3aa28f32d3bb8f4fafff50ecb98daf7a2a228564","bytes":2267971,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"47df9bca817ad36a8cd2829115bd7a197c6de36e367ad2920e05aae387dfc437","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:41.507Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.lce.doctor.normal.png","kind":"image","path":"characters/lce_doctor/normal.png","mimeType":"image/png","sha256":"228c79b933fc9d28574fc044c56cce21de9037d4e3a0abd0e8c12d80463f8577","bytes":2026329,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"162ce3ef8272dc80f6345bb7796e91bcfce335d69ebfb7e8e95058abacd08f30","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:42.935Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.protagonist.battle.png","kind":"image","path":"characters/protagonist/battle.png","mimeType":"image/png","sha256":"5b40787a69bd7dc73c2b36570bf7c58c73e52a612ca6fbbc401f52ead494a400","bytes":1958821,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"fd9f2798509997f21363ad8bb169c933703226f7e2d59fca2be71ca064efa838","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.521Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.protagonist.resolve.png","kind":"image","path":"characters/protagonist/resolve.png","mimeType":"image/png","sha256":"20380c053a2b118a7cf85d7675501c0ae6837639e5a961f2b67ab48db6fcdce1","bytes":1927800,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"4104f970ff2d21540b2373d8a7edc090faec99c451192ae229b98453142cf17d","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:07.592Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.protagonist.serious.png","kind":"image","path":"characters/protagonist/serious.png","mimeType":"image/png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","bytes":1955781,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"c56177800036a4f30448e6b30ae3d7cfa3b9a8e6dc44e6e713a29641d2e38b3e","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:42.998Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.protagonist.shadow.png","kind":"image","path":"characters/protagonist/shadow.png","mimeType":"image/png","sha256":"e041ba0b65c736c8b1c7c88d9e168160762f4f00075a54e8516af2d5d8094676","bytes":1970183,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"38dbfc1830daac6b2cdc86f4f1f30033f5346e7ce0f3258a97221b6e8f553706","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.344Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.protagonist.tender.png","kind":"image","path":"characters/protagonist/tender.png","mimeType":"image/png","sha256":"1654accf7c7cbdd16b6af3c3fa51d06fa0547b411451c1325d46bf02b71bd2d1","bytes":1240890,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"b975d8eaec44855c9dc886480298198d07c2effdc2799315c2c67c3491f5a3c1","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.412Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.protagonist.wet.hair.png","kind":"image","path":"characters/protagonist/wet-hair.png","mimeType":"image/png","sha256":"a3bac76af24bc52b1c1e26867aad87f8d83ba9cf118afcfbbebcc329bf7de163","bytes":1945877,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"464eac2d5316a6a77592189c23644659ac27ac54c00a6a12a8466c713fe0a234","review":{"status":"approved","reviewer":"workbuddy-convergence-agent","reviewedAt":"2026-09-06T08:39:09.479Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"assetId":"file.characters.protagonist.serious.png","sha256":"461927edeaab75615f232e57131fb9294fca75ef00b794d7a4a2955c66aeb18a","role":"approved-generated-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.ren.normal.png","kind":"image","path":"characters/ren/normal.png","mimeType":"image/png","sha256":"5cfd6e712b8790c8a4bcb5d015b086ec2e7827d573cffcf2914446a24c6e9607","bytes":1272491,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"d6b5e000c8b9bd04c1d9cb92d7c86bc6db5c48ac0052fef13fa920318242fc70","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.087Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"efe8cde8732d1a5a25062155b4d111dbf6185c3ba85e5612d5b67ccd465ec5bb","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.ring.agent.normal.png","kind":"image","path":"characters/ring_agent/normal.png","mimeType":"image/png","sha256":"4192a5a189f8e96279a856a89e2bac08997b06d5e3584c645d9c30492e76f97b","bytes":2018621,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"dee40308176e259adc996d601f5d881e0e765db079d1bd8624eaf13255539e60","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-06T07:16:43.156Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"file.characters.vergilius.normal.png","kind":"image","path":"characters/vergilius/normal.png","mimeType":"image/png","sha256":"9cd72b8261583cd4922fe2203c1f2e0e8354fc3c49642ec12a83edd1475777b6","bytes":1733949,"provenance":{"provider":"wisart-openai-compatible","model":"gpt-image-2","promptVersion":"albina-visual-migration-v1","sourceJobHash":"1df26e3b29404e50f734791ad7f08d34a3ef8fa9e83490228135fdb0a0605394","review":{"status":"approved","reviewer":"workbuddy-agent","reviewedAt":"2026-09-03T20:36:17.504Z"}},"rights":{"status":"unverified","sourceType":"model-output","redistribution":"unverified","rightsBasis":"Redistribution rights for this model output have not been independently verified."},"lineage":{"kind":"derivative","processVersion":"albina-visual-promotion-v1","inputs":[{"sha256":"fed2e3f31cfe12d58ab4c5674ea777ec18272ea6e0fb66bbdaead603a4f20c80","role":"canon-visual-reference"},{"sha256":"aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142","role":"canon-visual-reference"}]}},{"id":"voice.result.canon_recap_continue_9_18","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_18.mp3","mimeType":"audio/mpeg","sha256":"5e02d8a955ef36c182bd2293307fec531e24e153d58994cb34a2b68a8b34ae73","bytes":97907,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"d59b2417793c3d7a75475909211b58f363efafec20c6d06a5c19c970e85df734","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:33.724Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5bd638fcbf28075b747c0e80876cce550b19ef0940e3e144cefe01c49906c817","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_37","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37.mp3","mimeType":"audio/mpeg","sha256":"ef041d6a2aaf372b440caad96e3f34bb2191ec52acef42d2e42186de67303304","bytes":102515,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"82b878dd3c284b1ebc599d775f1dbb074983d971551bdcca0d86efb3405569f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:38.907Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"bd8d5647773be2698ca9eb3fa5d82bc4015feb661597d8d7e1d75b7347f9edc6","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_37_battle","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"86a766b774def49b6ded10b24608646f954866fdefa589f72d99f7fe3d29d102","bytes":76595,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"37ea19fb902336b0c4d96a263f91162b7e686f4335f1a5a51f3d9b16a610df65","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:46.814Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"910f33bc6df9539dfceab2db2f8b0043eaf3482bbdd0ab2c83e7b3a3119397f8","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_43","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_43.mp3","mimeType":"audio/mpeg","sha256":"a20ac9b480763a7e9ec332d7954e226947884f56bae8d39cd3409f77e66b234f","bytes":168179,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"f857162cf38ec26f169c23afd11308521f23630e7db9557ea87fcea622929b34","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:52.681Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"af9ee1264b3937ef4f0c0f2de55c861177000138757bc2691db200f384360e5b","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_albina_fascia","kind":"audio","path":"audio/voice/result/canon_recap_continue_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"a329c02dcac7c7c700b02e8cd20ae50b7e9f5cf992542b9396c3773c169240c3","bytes":73715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"7b43dcd6f0d29fc39ee5a4f0f463eeb3ee4f237883dfa507b2e13ea09d6489f6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:55.359Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5be9c86a564959a6bdca015504f72c2b25563e747fa8748c9598f3cf29c9d6fb","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_enter_AU","kind":"audio","path":"audio/voice/result/canon_recap_enter_AU.mp3","mimeType":"audio/mpeg","sha256":"e5456be94fcf623863ffcd78173c6f9841ade86d30ce54aeec82966aabdae179","bytes":135347,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"a17833fd6252e9c3daefbe17a1e5fceadd861037d3c35df77c93481c062fed5e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:57:04.066Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a94d66af5e27fe3f7f9c39bb34f4695d68752d456dd1b53727ab6279b13edddb","role":"pie-speech-api-output"}]}},{"id":"voice.result.conspiracy_005_let_her_answer","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"c3eeb96169e86d6d32bd24fcc1716f1b4b6169c24241a4a3785ad6e35bd0499b","bytes":321395,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"05da30b1f408abe988a03c1b859ad87ed8697a9588dfd0a01063074bca08695a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:50.999Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_005_refuse_duo","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"2188bc6032b768b6711d3163bdb45adbe7deec31d451ce74cf2b6af85785d93c","bytes":334643,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9ff57569b4ca94c725c68e3f3802c12fcb574f39995ccd8f9227aff0e8184a1e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:51.496Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_006_block_view","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"a3b7b7a240d59c2516983757140ded9382f6f71e6c5f74b94af8d4ce8110502e","bytes":429107,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"72c9ee2ef2f9f918974957617c7356702c64152881d240a27c8bfa4f773bad5e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:52.095Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_006_stand_with_her","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"d162f239d7d33996b43d4c9d2d517bff741e93b46293fcc55a00bfb778166ff9","bytes":444659,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4fd14203fd6a19ea74f32228474c4b515167af36aeb9ee411a1bdeb863457a68","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:52.779Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_007_break_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"1f3a9e8bd205a0e3fb7c9e3cac83e2f286036b393413ccf5fa9d9797e3e17b6e","bytes":346739,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e2b9d6fa175494cd0597fa41dcf4c8c12fd4b2762594d715189dae3a87e4c4ae","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:53.286Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_007_seize_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"cdacc6deea4032e1a6b3889c6e989a772db86ca71a4343e45235bbd132cbbaf2","bytes":402035,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"27d3ea76a5cac57a2a7ef610e0a326f04d0648260ac16c641decab547a66ed27","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:53.806Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_008_hand_pen_to_her","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"20aa52feaa8fdba93ea122e4264a5eb06266a253371186bcb28cd255427c0cdb","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"825e743cb275a4dbdc3c5f6272a0f9d6dd61f53e6f869ca11597b2681e6e5bc0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:54.308Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_008_refuse_testimony","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"5e39100ad58ff26de7201dc277ecc8a8f050f8fe377f891cada6bc4eca38dcb4","bytes":339827,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"62706d3b23d90aa75b04522ae440512160303b762c7f1df9d0947dcdb9936c5c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:54.818Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_009_choose_present","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"47fd587851224f61df1079bb5334dcccee2e87291913900762adea0939e83adb","bytes":426227,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f7d48667da043b0728f1c32838adfb9ffcbed5b08b4ff6015bb55eea52a31dec","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:55.370Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_009_refuse_choice","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"579736096170a0afb00017791b093021e59651844116fa3b46fcd527896ade75","bytes":453299,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f2772e0340d7dbf631599fa8bdf3c1e44a73673edfa1e901eab38c85f4179aec","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:55.994Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_010_keep_badge_unworn","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"451f67bf64c927ab02b685fd2eb24983cca5fa46d14a55371b211bc29b97d0fc","bytes":392243,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b1a83261b9aafae8ed64a87fe4a51de94344c3fc2b7e12cdb232d7a69ee41931","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:56.646Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_010_throw_badge","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"317363feb895846841f2512ebd4680be547ea512c07b7290ecc09f53bf2284d5","bytes":387635,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d1965b3d47f884633db07e4d10267cd468a09b9dcd1d7f1c846250ae33714683","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:57.225Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_011_burn_film","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"a6264c49431dbde54ff1eaa4d8d3a7011fc931b07ff3d1fd020388c8ba4cb79c","bytes":361715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0a070e89dcb6d3d102a574758dcc8d2ad6cfcc5b96d1383b93b43c576e7cd317","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:57.812Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_011_rewrite_ending","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"af9b903ff26fae14e50a4640b1fe6d591b5003cb8a340756d3061aeea4e0ced0","bytes":355379,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1547b49938754c17b2d46be91f86df84b0dacaf88b8c3ddbd47f31485011468d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:58.435Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_012_end_tonight","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"baef1eca98936b80447bce403bebcc1cdc8793ee1204f36275c34f358c06fb6a","bytes":411251,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"867f8c62a64aec663f009434dc8708aa98604408ce59852969b4b3f67b0bd3c8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:59.215Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_012_keep_blade","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"f7132cd47552bc59b54ad3c7b73d1640f3fb2f215e9f315ab3b4251afd77a7ff","bytes":404339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"00c2934ce4763d5f84bddbce0a6c5d0601fb127879aa37090f53d8447cfd85c8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:59.820Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_013_hold_one_second","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"e6647cb10fc82ee28ff451331a5ba9a1dba9b63459c65c962e1cef19c1bc11d0","bytes":373811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"82140fe3165784405100186f61b737e15b739b2cb63a65881572420822d9c62b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:00.447Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_013_return_gently","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"0e850f0e57d302c364b6bfe21980b42dee124a283e4a66ef12bd1339b0f2682f","bytes":398003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b76eab4fd4792cf146e8af71b56af6548b30bcf3b3b124f1453d7b4b32491b51","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:01.069Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_014_erase_from_catalog","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"0d32f303e7302bca81e8f9a74e3aec0cf46b23bf71427f7f0211deeb029afe37","bytes":420467,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"96200e5440714325de131712dcd2a8b67817a351c84075825e484d61fac39cd3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:01.666Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_014_keep_one_line","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"6c8bb01ee8faf99dca4cb097731a5c741735c223510416f7d98135c323d23f6f","bytes":429683,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"079a55c5e09667c10c5fbc75e2fd64f7b734e6d09107afef232ed6da44a97d58","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:02.242Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_accept","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"fca5933a9b7940e9e70ab2bc2d5f3bb2d5c1831e231e002d5e81d2d70187c8b9","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3d95ecf44332541aa2bebf6ee24bbe3c54f7a4e6d658780d4c4159110ef01050","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:02.831Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_break_pursuit_frame","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"80b95c0329a2ffd9463183d39c56d1a3c0c1be97857807307076441da7d1355d","bytes":354227,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e0c2f51cc13d9011eede0dc2acb29c45e8e0defbe6307cdced0a530229d14950","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:03.457Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_escape_to_backstreets","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"529885d362546fee041fb9daee874070b414eacfbaa0f0b0e202eec1f8848847","bytes":391667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4c13cdc061b4c19834479e9d64b936cc6c01d8fac8b3e265888334a79e1eee68","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:03.994Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_feed_false_signature","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"c8891dea18a2427f9c866fc45da8a392922ed1a4a29fb6adf9820661e38875f8","bytes":357107,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d31b6abbee62b71cdc7342f0bd1f2abd593bda0942b455306b4a75fe910e5e31","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:04.505Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_pressure","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"3af0fae827f9ab4202ed89aafca164c7bbd4f9cc3a3adea4a6c5df0fd15f9411","bytes":310451,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"8cc9fbbf26dd9b7d764387336446b0c3d0e7d4f34df2f3478ad4402dd05d747a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:04.999Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","role":"validated-pie-speech-output"}]}},{"id":"voice.result.enter_conspiracy","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"24ced6cd96816578da6dfa13fcf83514876c5562cdb6f8e09b1c32b4bcb11c7b","bytes":204467,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"a340dbacf3ebc505642763e1b68390e9d8cb3084ebcdc313bf46b48df200ab99","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:58:06.991Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"48be24d76494d0f1512af6b595a8dc783f1182f594a9dc279b23e9572909cb8f","role":"pie-speech-api-output"}]}},{"id":"voice.result.enter_rebuild","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"bd654ac516dd06f38f235bdf52260e578ce0a7655ed1111525deaa6e58e44a82","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"9ad6080cfa7a57f7225fb36916051a03537f64bf893c0600ef4e9efa81b4390a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:19.502Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"cfa718729334a837890eaed97a4c1dd4b674fa38d598f6536696efcbc2d10f16","role":"pie-speech-api-output"}]}},{"id":"voice.result.enter_white_canvas","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"e8ab325da6c8a12608d75df2bda071b88bb6ff7acf5e1572d9071ea6d8038b8c","bytes":145715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"d51bf59551c599dda87f22f00b00d32761621e56162e145f68cc96a0853217f1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:29.227Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"78269a83ccda24be11ecb5c1ebd6092c570747da39d74a18622ecb38b46d4e1f","role":"pie-speech-api-output"}]}},{"id":"voice.result.golden_bough_rebuild.bad_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"99044fbcd083fd583946b6883e5b9098fc9c681c04319fb140fdde443f8ed226","bytes":166451,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3c9aa98199d38099d44cf7b204cae777e4bfe56b6f6c0f78cdf761b58d47a294","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:05.343Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_rebuild.normal_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"555ba1fc500a42fc45cddbb0faa5230b5368741bc1d5e78412c002eb1ba786d9","bytes":165299,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"494bbfc3f76d792377aa59c1ec126418bb7bd9aec2860192a6b6f9ca8b8336ee","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:05.668Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_rebuild.true_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"2cefdaae2ccccd65e997733ccc076bab546212ccd50a7ceaab6b6e07f2bf4b24","bytes":154931,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a4344581ecaf8271e2e7166934449e770aaa28663b5b4556e118f7c2af31bf9b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:06.008Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_route_complete","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"1833aef2d3549425edf9702212a3dc74c91a2cbda14cb736da529cece809b327","bytes":491315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"71c497ece200e168dc2b4757b25da3461a49deccde1ed3fcdd794cf1e513c5fb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:06.736Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_route_final","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ee88fbcd046d6a69a5fde950904bb78bb78ac8590de0464d4bd9759e19ae5fa6","bytes":208499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0ab0d6ce09012765ab6201775321628d03c2055884166a388220847a0b3c8d16","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:07.152Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_006_keep_silent_anchor","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"212f4fb4d012df83e4ed3b002061b0ac8a6eba70df48e94c1cd3d4c583045174","bytes":396851,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"50da4b0037a394dcf36cf29fe27fec8a10a5d72ceb2440fad7515054f1b6b062","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:07.749Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_006_read_aloud","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"94cbc15ffad0d60de661ad72f8f46068442a75679d48014e17805f34c0c7b975","bytes":398003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"397931ba98e29f075c25aa8e8d3f5650d6fa5aa0539de2fc442f588773878f4e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:08.406Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_007_match_her_pulse","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"596b9c870c33cf5251c74a86de0b633a13fd58220e38d4e68f4e190e74fab424","bytes":438323,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"70e182c15d2c985147b1c9c3e51b389ed210917c6f9c7f87e58484ba71f7d794","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:09.037Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_007_stay_own_rhythm","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"87aec6c173a73614256d9ff98e2598dbec41e0e0d850b9fbcc59efa75f35b4b4","bytes":450995,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9767aab6b5811639cebce5f63907934bac559b281fd23f0c3d36260d84160959","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:09.637Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_008_protect_current_self","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"304ca21879c6515cfe594282032b1811fb0957dc5803f21b63c001770df3fd5d","bytes":405491,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6d00c8d2fe0042d206fba9c0fc98f7a58121c1fc7d5e5b0a91dd8dbb7d3866e8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:10.193Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_008_trade_old_memory","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"9ddad23ff662681ba22e7e3c0a569ce229853bdf73c03cd752b4c697bd79ac21","bytes":401459,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f72de26d73c073ec876653b2b71c303cd15bfe9291f9f5b53f9d4c636a5f42fa","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:10.799Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_009_hand_question_back","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"9cbf99b9553ac93f17ffa5b3179f47bb3667ee0729cef49e411c1d3db2a1cd13","bytes":400307,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f63489749d5cee3c0d61a30418032a862072278ce96f759b2a235a461f49f395","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:11.464Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_009_refuse_perfect_copy","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"f73bf969c5b85ea064c9c6c43ee7780f6f83c579eae92674a94f5dde32232348","bytes":393971,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ff8b0c035efcf8dad519f587977f819742d56495e07a991c444f903b8a93a5cb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:12.110Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_010_ask_her_choice","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"c74066ee553419d3bf9ee597a4f851bd2fb5938b5a555af427292eecadf454f1","bytes":335795,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"facde4f43785a68c1460fea3aeca8e241e0329a95720b2d7c97459febe85f22d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:12.635Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_010_veto_sealing","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"1832293d354bb2b22f61a4a66504f3114df3752012423cf14866e59929c6dc9b","bytes":343283,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cf63f2426787002f21c670558c9b2f327c801780dc03c4326e8ba368f374448f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:13.233Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_011_ask_next_revision","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"07d1e7d28a4ef027c305d085a2bb06525a63e8f66d563abbcc96faaaf06606c3","bytes":433715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"91a2bbdf26623a3c3cd75924e88b06c6c5d4b49a3f57f5230e183bcaa3560768","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:13.977Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_011_sit_beside","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"7dc8a32f43d98ae9902fe48573d34552259baff4c692ffb65d2deea5df6dfb98","bytes":430259,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"daa3e652312f53da54b22655db9f00e2a7b17e35b01800e3582f0fb3e10121e2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:14.580Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_012_break_contract","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"1c8c41c15241d865afd824a846acc0cf0ab205f26696e0e7c85be5299607b345","bytes":372083,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"12715c5610a920b4abbce22fe8b5546db99b8e9246d17c67367950acbeace978","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:15.139Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_012_negotiate_terms","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"12dd9f48b173bbf8fb3e92086a05bc9e9cb28099547345f88931e680e804b033","bytes":398579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d9817bb3b5c88586e4816b62f8ac52da5376f5f00c005b0c90be74a48abf0691","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:15.758Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_013_offer_witness","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"e86589de87474e4a6f8d57062df9f43650fc3a154618f5778d52c5e9ffcf4dc4","bytes":374963,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"498eceb78b3761573b3f6146ec01bb72bf61995fe5a297e47ff6f923036b40b1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:16.395Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_013_promise_name","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"1cfe997ea1a9204419bba1848681231d5351da60b5259246858533ba814d93ff","bytes":376115,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e5497aedfeea4c9449acdcd2a7607ed693b1cffee17c6612adac07a2240de399","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:17.056Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_014_ask_when_to_light","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"b81315d3ae6125ade7203449a21784899d0ccf28126b576feaf319dc80de2f69","bytes":423923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"750be1494bb5d4967816db2a878deddf724cdb7b3ce5c91854443e886f363bd8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:17.681Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_014_keep_unlit","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"fb826259dff130419016dbbe3720b59b7326c454fcbf7479dd9b8fc6a93fa2aa","bytes":433715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"495d4b12faf4449bbf4fc5752b8c2f576e408b94b280c40c51f4dfedc3e54a61","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:18.336Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_accept_missing_pieces","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"025ab49988979a6e3e8f9cb317f22442a0713b06c30db883126a0a3162e650a9","bytes":361715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cadc67b7f9ec94fc33a12697447e4a829f1c7e1b749349da72eab3b988b4ca63","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:18.894Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_anchor","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"65d32bf4c0b1141ea6ae80963cdf550162b5896279d98ac6e2cccd40bfaa63e1","bytes":236723,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"5058370432d4db499974c23da71f77008581b73409c2fc95a6fce8c8ae4b3380","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:19.313Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_cut_false_completion","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"0b7ebcceeaa3fcd9939421b7aee1b5fb6d7c9d14a4ca98dd7435ef1f29205120","bytes":367475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a4ac6e57ada6b17838c9d177af1a6ed22f2b832724fd38ef3a1615f1165bfba1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:19.949Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_guard_fascia_pulse","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"f11f541a1544a54ba6d13f6adb0d93344ab451bd099d2005a5ac8c3a8cfe6369","bytes":389363,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"df42cb1ad7931603b5bd0cfe411166767c59fbeb3761fb3e019337fba982e582","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:20.649Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_push_into_raid","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"68acf768a66dd60d6ad996e4a06a57ef2755b9787f90f32d4f572b6d8c2426e0","bytes":406643,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9da0c2c2bc54f63d2895b36ba4b3f041398e90325452485da93ad3352b7c2fc6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:21.235Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_question_fascia","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"d49e2703fac28f03e412f0001ad711a642ae86bd88b37ca116d4c392f03099bb","bytes":228083,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"63811040ce2cbef8b394a6443438f8f48724ef785b0ae11d726f52822e447a20","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:21.618Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_use_rooftop_signal","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"ab251367e6459f692c3477dcd584be69f0f3c43ea3912d22748e065d36987151","bytes":352499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"8254bcb6688fe8c3ee6c6fef17ae80d3802c96a5c2f573d5ed6fafac87c181af","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:22.191Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","role":"validated-pie-speech-output"}]}},{"id":"voice.result.return_opening_from_rebuild","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"4fb14344c5e70dfd1bc4f6b3ef069c4ad64cf34f491992513f836ee3cc93ce90","bytes":289715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"0230514fc5139bc211ca3e76b7b50c139f6969ef163da749089053b9b7159dd2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:33.306Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a553b659381de186e0ee91bb10171e295ea20a9ab454dbc04eba57cdcbcfb393","role":"pie-speech-api-output"}]}},{"id":"voice.result.return_opening_from_ring","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"9157a6a67aeac5fab63aab484d8a5fb2fe3a3352e3f50dc20b77351d1248eccb","bytes":278771,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"0e2bd000725bf7cc7935f31338d8ccf3ad05b15f0fbcef1926129ba5c2995625","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:43.353Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"de7e51083a36599bb71f4ad08aed1a308ee241955f6b2bccf6216fc7b90c1e2b","role":"pie-speech-api-output"}]}},{"id":"voice.result.return_opening_from_white","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"a0e41b784a562c97daa29e6174c6d10a22ff9161e15af5fb15b80ba1992b76eb","bytes":301811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"5d5410b3caa80cc3470c29ec9d90e5a4f013506eb82f0728230e172bb36c1b36","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:52.028Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"577a06c85009625e4bdc3f90128661718291bd8287dc314ea9504b2bf7e17f91","role":"pie-speech-api-output"}]}},{"id":"voice.result.ring_conspiracy_route_complete","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e13a967ca990933a69a93dcd78c122a5119f1c4d7d8f7e8c50ec15bae74d3b00","bytes":419891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d4ba1bce5dae907010eada233ad372926eb7c6d2ad5d2bd2edc614d91f706e08","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:22.776Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy_route_final","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"472ea9d9842371171504444bf5341c93c318c1998d2e81ea34833e020a8ee208","bytes":232115,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e05417c6fb659f8dec8002d85afcf15870e4501761804f9f113b71f093de7587","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.204Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.bad_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"f613f8e6d2453ec2827bb0acd07911ea84e7ef59edca47f378b7d76c0ce2c240","bytes":151475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"326fb3303d302e2a519e9a4572f3cb6d513f9877f659fbb9bf9eae871252c2b6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.551Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.normal_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"33bfedb7ada3a4bb3134f0eea06241ff6ac26a45c289d0a7261ee66b7ab9bca6","bytes":187763,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c733ee6d849e46a1eb6d2c55ef0011dea61265a6234c638b3f407333e3a2cb53","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.967Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.true_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"fec30778f7f3ce3c3d76b6bf7028e7aa6ff5529e421e33a4494f67acb10205ea","bytes":167027,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0825fc284bda393fd1319d9f79da6dceb8ee14d1d4f9a15d10d246dd3ac24f85","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:24.376Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_006_name_silence","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"052bdd2c9ad58dc357d4a8e2efa1c775e719bfa0df5cc6a5b7ac5b5f2af548f9","bytes":418739,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ef8af18ff8b5fd3e7d0683394bf8720ad32da1f487b3de6580de8cc498759b23","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:25.026Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_006_refuse_naming","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"ddd59afe994de4a252c61a3803bbd0c63997304b9e6df37447b59e9b965017ca","bytes":425075,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c69a302c0ec4ce3efbc94185c65e98ad1936c3c5cdda227bd9d1efff5433bc96","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:25.676Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_007_ask_fascia_term","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"6bf8213e512ae808e04046fa39600bed3a1b59e7ce91dcbb902bb0b1fb666992","bytes":426803,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"60bbc7ecac62c5db72e483ff5657ef6cafbc2c8f71cee66c7322a07f80f702cc","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:26.316Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_007_keep_mirror_open","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"33a99a192d13ca70613e200a261e7b33659be9ae2b5d4efe34efa334d75d3e05","bytes":398579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"dbbef1a7f1cb9c49602bebfa8e535b523ba1406845611c2b22cd19eb151ffdb4","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:26.916Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_008_hold_fascia","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"41c2e3016510dd00c492632d8189788d79fc6e54b3383550412f1e057f071bfb","bytes":332339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0cc1384b75daebd7d68f11cee5974eb3f488ac250457c40e8353e553c94e0982","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:27.574Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_008_stay_witness_only","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"c6c37b0dae21ed498ef7c5c7671ed8429861fd5027ed8de840f27fa65c1d49b2","bytes":354803,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b9bc5d5844db20e8f622cf1d2dbedbbe00581c9dcf92859103c6d6d3e85866ff","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:28.206Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_009_keep_half_step","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"eb273061a887f8ea4796b2804cde9e109aed783bc88853b2592e3f4ced0e241e","bytes":374387,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"af68caf1ab696236f7c77808519845396728c3e02c58e7f634d8721132a757eb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:28.765Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_009_share_umbrella_edge","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"a4f1748e8858f3adf850f0b3c2c6b38e65fe9b23edd557966889b071f0b09c9b","bytes":323123,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c130f724c6383773363fe3e9247eaf8ffe274e7e114ec50ba6691eb4e698c3ae","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:29.304Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_010_acknowledge_leave","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"6eb65fdccaf7e057ad12905510492926701ea449996d3c5697d56729dd8e1705","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1ee9b18006f79a84152c275b47faeca493b046a58fa749c52f9e1188d0118796","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:29.879Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_010_offer_return_ticket","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"45594596a7c3fc007652bef42743925bb65a7615f873cad61d3429386b6eff4e","bytes":361139,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9b98c35ec50ef4f0b5e02ea2d948bef841309f5f2a2379c0c48afe500f0c173d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:30.431Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_011_curtain_call","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"42179eea6ade8f967fd3ed425a108fe78172750b55804d3fdf6ed6a57ab1d5df","bytes":384179,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3433690c28a888e3e3b11006ac79fb66bafb873cd36cf978dd26aa008e4cf772","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:31.001Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_011_walk_beside","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"5364cd974fd319a09968ea5dd8d47bacb304bc918dc1a8180d9b905bfec6d4e3","bytes":391667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"55cf6176bd61869a0ce31f9dcb73655f7f1f47a97ed93d883fb1d45c361a12bf","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:31.596Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_012_let_her_decide","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"8d92faf82d8e23de74356dea4233451838b0cf1ee0a41ab884f8407fc2ecb97d","bytes":364019,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d215db86e72780c1ff375940ffbd3791e787abe30ffbfc6740cff502a6d6114c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:32.188Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_012_refuse_exhibit","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"f13e7e5ddde629cffe4e022558da710927c6a9ea98b21b938cfa47c06fda6b65","bytes":346163,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"77b1970f13024e4466a24468ea9eaae71a5ff90b44ddd1a10a4f90deff1ca324","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:32.766Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_013_point_to_mirror","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"adf910758dc7147da909d2c11f12d49cb04fe05dc10095c915dabb83e4d5e490","bytes":417011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"7009f4717fc146ab389e923e75e2378a0d1441206bf2f444a393e84062dd7bc9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:33.429Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_013_refuse_to_choose","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"b3aa0c454052fd8f5dd1981af5510d3acd0aa9b23d1d3c82e0407b59b4fada8f","bytes":419891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"740ff09ab797313389f30e70ad9bdc482782fc34c2f04ef57216744a1885cb40","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:34.016Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_014_keep_base_color","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"e5abbde8433953db9427ab67392fc60bb77aabd16ed2f507d6c40d323701476f","bytes":403763,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1dda2c83c9b715dc7a36cf4d8a3e3531feb1ecc91690e81d72397c53a47334f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:34.684Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_014_offer_restart","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7b0a0fca1de3ae894ac6455f61354b0004fc7a4ae669990f3eb17c26c6cd6a5c","bytes":438899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"2e9b0b5b8c1813c9bd605a49d24f15dbc2bef3d34ee4bed91bcbfb9ab0e49655","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:35.418Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas_route_complete","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"94f66d44430484558772b9203ee1050accb21fa9f21110a8b3664cc8e0237896","bytes":430259,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"eee6217554ee15ceea2d7b0b4f00c00d9fa862a256ce786f9d9e7f4b47c65b8d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.027Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas_route_final","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"8e5228040c26e7c73ad64f14c4193f27b6aa73dd95460494258f47ccfbb83aba","bytes":230387,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"83b7ef1e9e08500f66d1576b4651775a4cbfa3265f494c1c18421a98ae352e74","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.425Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.bad_ending","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"c689384a6b62ca60bd84391fcecb3abf36158a295d70a0213079969f28f70def","bytes":164147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d5d529f590fd59f1b0f025fa9a886bbb44edea472fa60682ebbfb354dc7331df","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.766Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.normal_ending","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"0ea2a3bb0d492de34026165ff824b572dde9aa0561ecb32ac1df0c3d037fa217","bytes":151475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3e31b96fe817530da6ef09c6641fd9594613f0bf99fd0fb829c1e132af928e58","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:37.107Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.true_ending","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"82c737637b2243b9be6ffb7dc45883f143773bae425420ec730e03c8510f32c4","bytes":150323,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"08303dcac821691fe2c1d28f2ec84b4d1aa3ed6bf1462a24a3a7b558f692f31c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:37.440Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_follow_to_lab","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"40e6d43999da61bda9da83fd878956a088de4cb25b6cc0d99be4b8214810351f","bytes":401459,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"14458af56bd3123b9cd3f11669256d7a22cae7fdf162c02d20901619ccb34d4f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:38.013Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_interrupt_lab_terms","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"dc0db8f0f34333e77b1186156c828aa59e1d510caa95aa0e97610a5065add968","bytes":364595,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d27224267bd6803ee94d880ffc2a437c725fc3efcb2b3af5ee5d3e32d3ce7726","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:38.575Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_keep_empty_seat","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8a76f675d5ea394277777e38529d1862f21dd62a5b2685da635ed0527df7e052","bytes":395699,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d0ce8b649faa4958ec85553a4ce355f9331e839f822484a3eaa8e24f88e62042","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:39.217Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_share_rain_window","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"20335d2fc8cfaef91400201f56bd1be36b2d9ea44402037c73bf06dd31af4b3a","bytes":378419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"5ad3aa48216b7dc7925d75c51439d87a99ae61a7b46160513bc215405c4e5948","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:39.824Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_sign_witness_protocol","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"e7636aa5a1ef0e083f6b8d3ef998b1c370cf1c529a2f37d0e89594b37f956400","bytes":345011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"56142600de1c32a9afe3cba636e9ca50bdcca52e861f10c4add5ba8b89a61e1b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:40.447Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_tease_back","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"1f65a84e40a1502a6fe8e2ee76133eaacd13e6673a4abd42b573750db8e155db","bytes":309875,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d159a9603f7a7582e9762cbeec896c6754df1823085df0619048c83282313efa","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:40.993Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_touch_boundary","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"367db6cdbaa418ed281c5d5e32d56c6fb59c82f8ac911913ecd1be2b6f7938ad","bytes":321971,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"42065c9ccacea71646dccbdb21fa65e678b161de7f7bfa18d593f38aac9ae7bf","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:41.497Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.canon_recap_9_14","kind":"audio","path":"audio/voice/scene/canon_recap_9_14.mp3","mimeType":"audio/mpeg","sha256":"177b6bb8d06c753e852f15f15053ee009e752c2d6b6e60cf5b9529808378539e","bytes":563315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"69cb56049d6e879e2d412d9376a6e5030a8f9302d5be7c72b7d3c6070ebf7791","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:39.428Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"c76f1dcdb5de2c1fd622ca980a25cf14395bccf00d1a897ad19123389ecac100","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_18","kind":"audio","path":"audio/voice/scene/canon_recap_9_18.mp3","mimeType":"audio/mpeg","sha256":"92d1bdda2e7c3a93bf3b4e2a68a424bf85d10949df29e99f57f026710c83a10c","bytes":839219,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"b1206c85c6846079b1ce0c3b47a6d63984bb23c7a1480c04e7e42a22c3de8ca6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:47.186Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5fd4987e9c25727521f51e2bf27df5982d59de85277b74df9d97e9f724e51bd5","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_37","kind":"audio","path":"audio/voice/scene/canon_recap_9_37.mp3","mimeType":"audio/mpeg","sha256":"63e76cd6291fbaa5d6f2dfe363b704e98c63ab0ade8eabb1bb96ff1ace9e39b0","bytes":916979,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"153e6b5d4ceaeeec43ea54e3261e41ed8bf5577071d573f004263f6f33182c2e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:53.784Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"84ef50b77e565c6c4f0da84372fcf47dddd9c33fea2997fe355f944b2f8f52cf","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_37_battle","kind":"audio","path":"audio/voice/scene/canon_recap_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"d136a8873f583ce3c5df44c57934c316402ebf899020e61c2ef21abf24ca18d3","bytes":675635,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"6f790e60f0e468516ce76f3673407e888252679f94541de11918fb6fef28d6e8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:01.021Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a67bb8d10cd4e44cb2f670766bc1b45acc78219c61559d2ed37db46ad44109dd","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_43_outcome","kind":"audio","path":"audio/voice/scene/canon_recap_9_43_outcome.mp3","mimeType":"audio/mpeg","sha256":"29214a431ceda8a8917df7b47af4d31df69bb22b709c0d1ac6887579440310ab","bytes":1276403,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"17bf287e00059f90b094ff81d7fc9f6de97c05d812cf9d3651736a6c34d67dab","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:08.577Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"b479cae4cbf12cdfa1eae66d2f537dedb42c58f3d471b4c7bbc27e0185e566cd","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_albina_fascia","kind":"audio","path":"audio/voice/scene/canon_recap_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"9f445dfa83c196e54ab760d5d10b1ca08a23199e1d7a3c117bfbe04d9c187fca","bytes":2609267,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"c0ad6ef4f2be7d88905a614aa0aa0b6796beb374c95e402f43bcccc3f78371d3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:19.427Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"35d2bd219124272e9bae5662be97e4929a9b799cac54036d451e852c527fe98e","role":"pie-speech-api-output"}]}},{"id":"voice.scene.golden_bough_001","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"17b56b325e5051b43a27459152b094c53d12ac2edf65c03c0ec65533cb20a29c","bytes":203315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a270a72f45023d622be74677d1ea537ccd5888db0114194f6776f3af2ed26666","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:41.907Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_002","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"d6365c5d4894da5e57e88319d8c2fe264f25c4199b41031c8ed72ba40e09ee19","bytes":154355,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b4473ee31de5b1cc49c15a7eb1add28ce76df79b7592fe3c3116ed2307289b65","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:42.286Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_003","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"1ad02d7568d0ae545c157a13989da73a7f7006aea805d0617a3d99ee3421ccfc","bytes":290867,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6fa1c97925366a32b8c7f44feee038786b7dae38a72fc7e5fee148d25354a011","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:42.799Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_004","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"a59f7ec4c382fbe7e9f54e6eca0c1c4a1d0c5fc3d8fb6b431831c69a8da8fc78","bytes":290867,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"527efdf94fb22735f303d947db0332e07ffc4f0a29ed05accdd32e240d6fb14f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:43.311Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_005","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"507228ac0a027d9c8f3534301d01fff6b9cedcf322a4daca6ec6803288517688","bytes":255155,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6b8c415bdbc21a315e4c6216a87334af387a9ce99f3c4269225be66f6cabde9a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:43.744Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_006","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"ba279ed3531dc0ed703444d8ef096802428ca7ab29fcbf4f3873588ceb4d786d","bytes":311027,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1d44ba20698e0b69d89856ed539d4c3b8cdc34fceb61ee9594acba68f7b6763f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:44.224Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_007","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"e493295b8fc9a9777274dc6ea8bdf29f6fa36ffe186a9e8b705bc4f95e9dcf6a","bytes":326579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"38ba7e32fc54264d90c135ce2c62c7201a98abac7fc92aa1bc45956c8f0c9424","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:44.758Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_008","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"41eb3a1a3f955bdf78b8107b5f3aeb6e06a1c1446c0300f4de0f712a3b1a310e","bytes":308723,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"41607fa266621d6dd92c2d035287438b03daddc343ba89b1c32f54656ec8af83","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:45.298Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_009","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"54d231c0a6980338b1b28ea6ce15ca5a284f11bb0631106e1e3cb393c8154f89","bytes":315059,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c7495268f478f760ca778bdb657e96a65ce0fab47e7e397ddd2d8c9c22bca739","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:45.767Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_010","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"5ea795c0fd6273b40f187838c3ab9129a255d1dca1f7e65f155ee7c2b56c2972","bytes":305843,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f35d42e880288e82e6e6e49993b4c37bf4d626482e32d08f99a93309b735bc10","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:46.198Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_011","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"99ca50db65946593f20b548272f662389b678e88a6241d83d4d068de15595509","bytes":249395,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ff91a1208601ed2e190397c05caa3dc818008b1137e3b2e2b115b7562bbea94f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:46.580Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_012","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"152da1cd4f137ebca0900f228e2ed76cf392114063f02c3e63d6193ac093abc4","bytes":308147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"615135f1dfd10ca56a6d230fc5906ab5d301b861de1f439d736feaf8fd09b57e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.023Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_013","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"47e62c9d7dfb826b8fd9caf7a722a5bd0b4e1790632a24dd3f7a5acb5ec138b4","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f244b1df2919fe76299dcfa47accb58b15052e306ba75fc833307b7e2f66fffd","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.475Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_014","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"aaeffda74a330c6f70513fad58a0bfb8ebd8aa5793806ac74075e9aa4f4224d7","bytes":256883,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1d8cb187329c7b92f2a0989d4c4fefb3acd68041c1caff00180dd30e451d95c9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.882Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_015","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"796624549e2d513c2f139e412cbb989e3d9fa9221c6d6cb9c5d0d18cb9e14b69","bytes":298355,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d0eef28da4f736abe86833ad4bb2e36480e0da115882743f37a39b2eaacf1426","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:48.340Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_bad","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"cd354aeaef8a6692d7f672d11d0ee3cf0c6bedfb9bd350a5f889ea2160902518","bytes":301811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9eb71756df936d021bc7b0aa5e538751cb7f490ae585ad7e708b1fc89205708b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:48.783Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_gate","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7d0130d4db06b824850c69ce95c00de02af01fccaca56854c850e0284c9f29ae","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"298db686f42cc340c95f6304a5a9bb2268d197ac97f1344f48ea9bfee1332b28","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:49.160Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_normal","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"bd6aa132a1ac2f6c5fe62a3f328e5950cdb2b8ea54a3a92399bd7afed1f3e4fd","bytes":287987,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fba270f3981e547d43aca27f9f4bac748e04275f4a6868092e1e45e2c23045b9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:49.661Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_true","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"43cbec46f0fd8d9debb60a95f16e0e3663775a057c40df9af5dfef8e921c42f5","bytes":328307,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"178945dd1c479bc5fddff007809e856f1de647aff6225957a7e825332763d5f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.177Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.opening_001","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"0ab7a4a0b1a11486d6feaeac10e40b2b9aec2675f19dcce2ddb501c679238074","bytes":425651,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"5a883853966525713af6be3c5091cdc6b46e700dc878872927105bb5c3c036c2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:07:26.105Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"7dc61fc8a18a66c65b7e320819eaef21228cc823745cfff10ca43972828c2378","role":"pie-speech-api-output"}]}},{"id":"voice.scene.ring_conspiracy_001","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"f4535e60e9ebfe3a9f50940530ec05a38ca9e7dd665e2f7064ad0d52811753c2","bytes":186611,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"44469f1bbcc8fc18552a04bb1752643d7ed72aaa58d0b17bffd74b4d6754973f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.522Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_002","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"61c43123ae22fe7a5f07bd0d7b10070f527a4d8d9413b2c6e15b27c6566242f8","bytes":235571,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"539aaf46b5a96ce1385a02823718549789bf39958cb04c9eb20b6e806948804f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.904Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_003","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"51c502de79a93bb2b1a26a98501944d677fb2c15a5a49e15a29bdd31e414a498","bytes":247667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f0c1044b16daa54e36d41efd4047b45ef6a1849295f8c4d31fb259b6dbb38326","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:51.309Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_004","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"41d01bc36452401d3300d76fe34a239e8c75f8711c9a5a5448865c2ecb49897c","bytes":291443,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"51f43be9131abd8a2d96ece11d7ac2c9e8f589c241af4a8e1c28296d0cc08a2e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:51.860Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_005","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"3e3011f9fdefa13e482f113f80ed4b977e27ad28d279150b8ab7044801ddfc01","bytes":280499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"50ec0e3a3fcb8755657e0079da77177678124229cd1a1963a929f38bea643cbe","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:52.327Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_006","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"39c5261f5ef3d79e728f8364259d03f4d6de58242dc63be4797fe92077cb74e6","bytes":256883,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"39b617a8c8d1d95f3b7ea6e9622877b24f3f9e4e9062f4fcb2443ec0afe2d193","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:52.731Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_007","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"bf7b82d130b47ba9f0efdf5a0590b87d41601bcf2d90f01c20debb7d931cfc8f","bytes":270131,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"593b2d0525dc46a1ecf4e047fc4a6e37e20c4861e58f668d77e41dc37c24c8c5","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:53.205Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_008","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"2709be5f3a41429a9bee00e2a8631e14884cf249fee14c9944001fc865dfeb4c","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"88014d35432c1a5b4f56c82e44193c080743de1d149e39e8a3c676cfd64e25ad","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:53.727Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_009","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"30ab38b0d89d5d55b3ee833f4446be0b572508195146ba4529670e9293e4bc60","bytes":239603,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1173f17ee8a03a8b34c229aeac46e2477a515c504c9a2bc45e186fd94aa3586f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:54.145Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_010","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"7902ea7116a00c992000ba090b0b886fadfbef3b628c57141a43e473a6478edf","bytes":287987,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ebc023888ca1a431a1e8d89a231a62358726f7621b41d0b43ef98d74f72bbcf5","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:54.620Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_011","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"3ff28c1d82f871ea748100c320625f9f9d6ab0e53d8929b3e3dd0f09cec392c5","bytes":291443,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6771cb7b207941f1eccda0d4ea7ecf14bad9a68b2231765e0501a542b7d27008","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:55.166Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_012","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"43419544d4b85735fc4c6f3e8d3239307c4b19b4ebeade5d1120ef815715d6f6","bytes":273587,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9fe6a2c58a0f897b3dacefb0a80634c760b41caa2e73dd13ae277a0846abc005","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:55.665Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_013","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"3065ed0dc9815078d8a5148a84ed2e29b7fb6cd9f7300cebe791ed20c59e0a53","bytes":306995,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"53c76ffe817aad060aa05140d3ca5c5c79d66024da22268f82c5cb94719a37e3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:56.191Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_014","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"dd44754be2c8d7146bc1593bb86525176f25e94c47f696498500a106ec5a58cd","bytes":254003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"64afbee7d2aa1a0eac573557d880a43ad24f08b957e49e422d132ccb28749f29","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:56.617Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_015","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"97b9eaf4e55aa2b333cc755914da99c5aa967ba3696b762800ea3249a138d8db","bytes":366899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"11cde049eb61f8f0e33164486fa8ccd66a6a3b6155869f9bb6172a32940dbe12","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:57.148Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_bad","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"9e16b3ccefac5a327e73e53fbd9dc45c88d12cb71b0b1129b696de7c1e957c05","bytes":319091,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"abe2f0895a2e8088d3a498d8e9b4f6d0e336811a58bfdff3a09922a0815a8183","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:57.673Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_gate","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"b8b574bf431cc9bdbadfe73fc3a0622a16f7d27433c7d3d38cb1fdc0655b6682","bytes":216563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"2488b54c1291c1d8b9051bb44e3bf6e8c5c67bc4dda433eb28326551aee9cbd9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:58.104Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_normal","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"9ddbee2b9dd93b149de53a5806a4fd9900a3bce05fd204c7f9a53c8140c295af","bytes":270707,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fc8f9d8ff14512ee933b6e3446c34c70bc26b1d2a4a4e1240139d40248077e03","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:58.612Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_true","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"55e5b7c7eb8118623d1b36aaa5e85d9b6ab4286c3e205c6e8d262be481691c37","bytes":347891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4deb3a98534191a630873f96aca75d4f8241c87dcc69842a16c6029444c3865f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.123Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_001","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"61917fda12f4f29461e9db4603781dfe6af6351b9c58e8ac89fd6e11176a3d91","bytes":149171,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"26d8ff12d672a714ee5e53dca1c9563dc5047eb2ed9e76564759a81d3828da23","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:57.527Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a409609201b1e169482fe326c70c4c55c344f8f4a5bc886f20b51b725006f06a","role":"pie-speech-api-output"}]}},{"id":"voice.scene.white_canvas_002","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"3fa78fe28acb401aa624e5dc0a149c430be3543587c707a460cc19238519b227","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0124da8141371da5605346831d64565d23f57f9b9b691ad1480ba7e2c60fb39b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.477Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_003","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"30c100d35a1e686cb6108e478d3c4eebc698b2bcf7fb964fde186a6e96f4564a","bytes":236147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cc1eb1c9c159d886a5d042d7181b99f694a1ad9710ee4cd006047a87ddacbeea","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.861Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_004","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"829183a0e33a583a8af9072cf4914baa183d24cdb28d9fc9685c2ef02f8d9458","bytes":273011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cfa89732a1ce256c6ac295a6ff2ade985a5e5ed937e97c27a3331a24390702f9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:00.367Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_005","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"aac01f6f0bfb4130603e8ab330d08aa661878e5acaf94e9c1230a356456f16c4","bytes":264947,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"7406a6c3511ff311f87bc9b72aa4d9248c3a61c0f83e58e25ee6c716f6bd3d95","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:00.846Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_006","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"136978b119f80ca4655d4524f31808012d3c01076a055f2edf3a1a5a9c38f0eb","bytes":289715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"01267d877abd2d8e09f21ea84d60032ae810b9a1e930d401fe4cfb502e870304","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:01.320Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_007","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"3b2ae779f6a0764aa8055571ce7a8fe0418c76cc9a2a7da395925ac3c90e2e91","bytes":293747,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6d09653fe0a3c8e3a560b72001e7ce655230eeb3385e555db04b8a01e1616f3c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:01.782Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_008","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"4846c374ffcf1f93861daf210c752df86f4c00e1e3836d860d69522a116588ed","bytes":322547,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f085e5f0dc298d9db7b2ee977e05d49f29b225516ea173b075245edbd0c7da0b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:02.276Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_009","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"fc92b8497ec1f4133deafffd4f0204dde06654db1aea65ee0f1573f20bbf8354","bytes":258035,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3b6fd2a878196cb998b836cf4233115c763fda3ce7c2ac082093d46b8b061457","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:02.729Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_010","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"82ce426cffeabb5431b3d08764ce3e7e42686b3f71f2e46736ecaa2a931d9135","bytes":216563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c40d4d10ac11a99f14d34362b485eda2816e906704e73a15d51775ec547df18e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:03.137Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_011","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"c70978714c71795b05c1eff9adc92713e956103e2d2a8ac8e8576f65b2b7a01a","bytes":287411,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6b76978a1979c08464e0e7b77e5be845ff819540a1a170f76f405f8a33c9ab8e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:03.638Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_012","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"e6ccc5d30d1785af804799386b190334e375a77051545f1e49d211b5a2ce982c","bytes":254579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"97c5eccddfa71c7fe37663824311f3770b10a9207395255ef9760badfe880c88","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:04.110Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_013","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"01d2f23ebdf72832e6a5b7480d5e4202e92f8b6a7445e614f6a00b324d5500c7","bytes":283379,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"adbb449badce6d68613405f3ef0d5c9e7d92885dbcf4f144f00cca891c60e124","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:04.596Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_014","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"1d2f602a2128a3d29d0953c583a78b495f75e55478cabfb5606e0a719c0db871","bytes":275891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"bb36e0c7ec73882c04f9bec4c557da8f68fae57de6367a01d94850c9e26acfc0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:05.109Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_015","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"5e4dff6e9f9d0f0373ceba2400c2044a6dacdc3dfd1b0a465cc4ce5dd8010619","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fe20269d6ec62b29ce5aa3101426190fd5af9a820d475df3a4683bf9dd713d4d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:05.661Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_bad","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"4a724974ac526d8bb95a3b999fc0a4d04dd8fe645433f89b677d8df29c3c5bd4","bytes":294899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"67f5e512a7de5e1ed132ff7fa75d83af0532acf5b4169dc2b5506d160f6f1942","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.135Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_gate","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7b3659054aae442107a743730580dfee2084a7b9ef612e5de43300774412ed49","bytes":209075,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cc12ba29eabb3d82fb02190b2c2746e2cf2889ee8cfbb1eca2a9100c67f4d5ac","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.500Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_normal","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"7e098e1806cb221d667e4ade629f5b6696f19ac270afc3eef05b8847457ca140","bytes":260339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e5900c00a3e4cff6ea7599345393e785b035613eb5cf88f83fabbd5d525143df","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.931Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_true","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"8d2e7919504bf82ed1df05b648d9959d486caf9b9abffb9aaa9d883f517db401","bytes":288563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cd1ee1736af9da9b2939a44a6dbb7b8bbb96150aa96eb462dede7c337a285d6f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:07.384Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","role":"validated-pie-speech-output"}]}}]'), r8 = [{ version: 2, id: "portrait.albina.armored", characterId: "albina", path: "characters/albina/armored.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.combat", characterId: "albina", path: "characters/albina/combat.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.endgame", characterId: "albina", path: "characters/albina/endgame.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.fascia-open", characterId: "albina", path: "characters/albina/fascia-open.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.furious", characterId: "albina", path: "characters/albina/furious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.golden-bough", characterId: "albina", path: "characters/albina/golden-bough.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.maestro", characterId: "albina", path: "characters/albina/maestro.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.normal", characterId: "albina", path: "characters/albina/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.rain", characterId: "albina", path: "characters/albina/rain.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.ring-conspiracy", characterId: "albina", path: "characters/albina/ring-conspiracy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.shy", characterId: "albina", path: "characters/albina/shy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.surgical", characterId: "albina", path: "characters/albina/surgical.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.white-canvas", characterId: "albina", path: "characters/albina/white-canvas.png", animation: { kind: "static" } }, { version: 2, id: "portrait.callisto.normal", characterId: "callisto", path: "characters/callisto/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.dante.normal", characterId: "dante", path: "characters/dante/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.faust.normal", characterId: "faust", path: "characters/faust/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.golden_apparition.normal", characterId: "golden_apparition", path: "characters/golden_apparition/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.lce_doctor.normal", characterId: "lce_doctor", path: "characters/lce_doctor/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.battle", characterId: "protagonist", path: "characters/protagonist/battle.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.resolve", characterId: "protagonist", path: "characters/protagonist/resolve.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.serious", characterId: "protagonist", path: "characters/protagonist/serious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.shadow", characterId: "protagonist", path: "characters/protagonist/shadow.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.tender", characterId: "protagonist", path: "characters/protagonist/tender.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.wet-hair", characterId: "protagonist", path: "characters/protagonist/wet-hair.png", animation: { kind: "static" } }, { version: 2, id: "portrait.ren.normal", characterId: "ren", path: "characters/ren/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.ring_agent.normal", characterId: "ring_agent", path: "characters/ring_agent/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.vergilius.normal", characterId: "vergilius", path: "characters/vergilius/normal.png", animation: { kind: "static" } }], s8 = [], c8 = {
  version: a8,
  projectId: i8,
  basePath: o8,
  assets: n8,
  portraits: r8,
  mediaJobs: s8
}, d8 = 2, l8 = "albina-galgame-card", u8 = "canon_recap_9_14", f8 = { white_canvas: "white_canvas_001", golden_bough_rebuild: "golden_bough_001", ring_conspiracy: "ring_conspiracy_001" }, p8 = /* @__PURE__ */ JSON.parse('{"relationshipTracks":[{"id":"intimacy","label":"亲密","minimum":0,"maximum":100},{"id":"reliance","label":"信赖","minimum":0,"maximum":100},{"id":"obsession","label":"执着","minimum":0,"maximum":100},{"id":"suspicion","label":"戒备","minimum":0,"maximum":100}],"quests":[{"id":"quest.white.boundary_protocol","route":"white_canvas","label":"白色画布边界协议","description":"在见证、处置权和展出决定之间建立可撤回的边界。"},{"id":"quest.golden.memory_continuity","route":"golden_bough_rebuild","label":"金枝记忆连续性","description":"在重构过程中保住称谓、选择权与法西娅的心跳锚点。"},{"id":"quest.ring.counter_contract","route":"ring_conspiracy","label":"环指反制契约","description":"保留自身条件并把敌对委托改写为可追踪的反制条款。"}],"battles":[{"id":"battle.white.gallery_pressure","route":"white_canvas","label":"画廊展出压力","description":"决定是否把阿尔比娜作为作品展出的制度性冲突。","recommendedMastery":"boundary"},{"id":"battle.golden.replacement_protocol","route":"golden_bough_rebuild","label":"替换协议冲突","description":"围绕记忆封存和替换协议发生的确定性规则冲突。","recommendedMastery":"analysis"},{"id":"battle.ring.authorship_frame","route":"ring_conspiracy","label":"署名权取景框","description":"在环指剧本、胶片和署名权之间争夺叙事控制。","recommendedMastery":"blade"}],"minigames":[{"id":"minigame.white.mirror_thread","route":"white_canvas","label":"镜面连线","description":"辨认见证、撤回与处置之间应被保留的边界连线。","puzzle":{"kind":"mirror_thread","anchors":[{"id":"witness","label":"见证","description":"在场、记录，但不替任何人作决定。"},{"id":"consent","label":"撤回权","description":"任何亲密或处置都可被当事人随时收回。"},{"id":"ownership","label":"所有权","description":"LCE 希望写进协议的占有性措辞。"}],"correctPair":["witness","consent"]},"outcomes":{"perfect":{"values":{"trust":3,"danger":-2},"relationshipVectors":{"reliance":2},"conflictMastery":{"boundary":2},"setFlags":["minigame_white_boundary_perfect"],"professionXp":{"boundary_mediator":3}},"assisted":{"values":{"trust":1,"danger":-1},"relationshipVectors":{"reliance":1},"conflictMastery":{"boundary":1},"setFlags":["minigame_white_boundary_assisted"],"professionXp":{"boundary_mediator":1}},"setback":{"values":{"danger":1},"setFlags":["minigame_white_boundary_setback"]},"skipped":{"setFlags":["minigame_white_boundary_skipped"]}}},{"id":"minigame.golden.testimony_cipher","route":"golden_bough_rebuild","label":"称谓证词解码","description":"把记忆碎片按“本人意愿优先”的顺序归还，而非替她拼成完成品。","puzzle":{"kind":"testimony_cipher","fragments":[{"id":"name","text":"先叫出她现在选择的名字。"},{"id":"consent","text":"确认由她决定哪些记忆可以留下。"},{"id":"copy","text":"拒绝把旧版本当作唯一正确答案。"}],"solutionOrder":["name","consent","copy"]},"outcomes":{"perfect":{"values":{"trust":3,"danger":-1,"artResonance":4},"relationshipVectors":{"reliance":2},"conflictMastery":{"analysis":2,"resonance":1},"setFlags":["minigame_golden_memory_perfect"],"professionXp":{"memory_surgeon":3}},"assisted":{"values":{"trust":1,"artResonance":2},"conflictMastery":{"analysis":1},"setFlags":["minigame_golden_memory_assisted"],"professionXp":{"memory_surgeon":1}},"setback":{"values":{"danger":1},"setFlags":["minigame_golden_memory_setback"]},"skipped":{"setFlags":["minigame_golden_memory_skipped"]}}},{"id":"minigame.ring.boundary_resonance","route":"ring_conspiracy","label":"反制条款共振","description":"只激活能够保留双方署名、撤回和追踪权的条款节点。","puzzle":{"kind":"boundary_resonance","nodes":[{"id":"authorship","label":"署名权"},{"id":"revocation","label":"撤回权"},{"id":"trace","label":"追踪条款"},{"id":"possession","label":"占有条款"}],"targetActiveIds":["authorship","revocation","trace"]},"outcomes":{"perfect":{"values":{"trust":2,"danger":-2,"artResonance":2,"leverage":3},"relationshipVectors":{"reliance":2},"conflictMastery":{"blade":1,"analysis":2},"setFlags":["minigame_ring_counter_clause_perfect"],"professionXp":{"ring_counterforger":3}},"assisted":{"values":{"trust":1,"danger":-1,"leverage":1},"conflictMastery":{"analysis":1},"setFlags":["minigame_ring_counter_clause_assisted"],"professionXp":{"ring_counterforger":1}},"setback":{"values":{"danger":1,"exposure":1},"setFlags":["minigame_ring_counter_clause_setback"]},"skipped":{"setFlags":["minigame_ring_counter_clause_skipped"]}}}],"items":[{"id":"item.rain_room_badge","label":"雨室观测徽记","description":"进入 AU/IF 后由前端保存的身份与见证锚点。"},{"id":"item.white.boundary_contract","route":"white_canvas","label":"边界契约钥","description":"证明处置权、撤回权和展出决定已写入权威状态。"},{"id":"item.golden.memory_anchor","route":"golden_bough_rebuild","label":"称谓锚定镜片","description":"用于稳定重构后的称谓和人格连续性。"},{"id":"item.ring.counter_signet","route":"ring_conspiracy","label":"反制环印","description":"记录玩家保留条件和反写条款的装备凭据。"}],"equipment":[{"id":"equipment.rain_room_badge","itemId":"item.rain_room_badge","slot":"accessory","label":"雨室观测徽记","modifiers":{"trust":1,"composure":2}},{"id":"equipment.white.boundary_charm","itemId":"item.white.boundary_contract","route":"white_canvas","slot":"accessory","label":"边界契约护符","modifiers":{"trust":3,"danger":-2}},{"id":"equipment.golden.memory_lens","itemId":"item.golden.memory_anchor","route":"golden_bough_rebuild","slot":"accessory","label":"称谓锚定镜片","modifiers":{"trust":2,"artResonance":4}},{"id":"equipment.ring.counter_signet","itemId":"item.ring.counter_signet","route":"ring_conspiracy","slot":"accessory","label":"反制环印","modifiers":{"danger":-3,"leverage":3}}],"professions":[{"id":"narrative_curator","label":"剧情索引师","xpThresholds":[0,8,20,36],"modifiersPerLevel":{"artResonance":1}},{"id":"boundary_mediator","route":"white_canvas","label":"边界调停者","xpThresholds":[0,8,20,36],"modifiersPerLevel":{"trust":1,"danger":-1}},{"id":"memory_surgeon","route":"golden_bough_rebuild","label":"记忆修复师","xpThresholds":[0,8,20,36],"modifiersPerLevel":{"artResonance":2}},{"id":"ring_counterforger","route":"ring_conspiracy","label":"契约反写者","xpThresholds":[0,8,20,36],"modifiersPerLevel":{"trust":1,"danger":-1,"leverage":1}}],"achievements":[{"id":"ach_au_boundary_witness","label":"AU 边界见证","description":"完成正史复盘并确认本卡路线属于原创 AU/IF。","eligibility":[{"kind":"flag","flag":"AU_boundary_acknowledged","equals":true},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}],"reward":{"values":{"artResonance":1},"professionXp":{"narrative_curator":2},"setFlags":["achievement_au_boundary_witness"]}},{"id":"ach_white_boundary_archivist","route":"white_canvas","label":"白厅边界档案","description":"完成边界任务并解决画廊展出压力。","eligibility":[{"kind":"quest","questId":"quest.white.boundary_protocol","status":"completed"},{"kind":"battle","battleId":"battle.white.gallery_pressure","outcome":"victory"},{"kind":"profession","professionId":"boundary_mediator","levelGte":2}],"reward":{"values":{"trust":2,"danger":-2},"professionXp":{"boundary_mediator":2},"setFlags":["achievement_white_boundary_archivist"]}},{"id":"ach_golden_memory_protocol","route":"golden_bough_rebuild","label":"重构称谓协议","description":"完成连续性任务并解决替换协议冲突。","eligibility":[{"kind":"quest","questId":"quest.golden.memory_continuity","status":"completed"},{"kind":"battle","battleId":"battle.golden.replacement_protocol","outcome":"victory"},{"kind":"profession","professionId":"memory_surgeon","levelGte":2}],"reward":{"values":{"artResonance":3},"professionXp":{"memory_surgeon":2},"setFlags":["achievement_golden_memory_protocol"]}},{"id":"ach_ring_counter_clause","route":"ring_conspiracy","label":"反写条款生效","description":"完成反制任务并夺回署名权。","eligibility":[{"kind":"quest","questId":"quest.ring.counter_contract","status":"completed"},{"kind":"battle","battleId":"battle.ring.authorship_frame","outcome":"victory"},{"kind":"profession","professionId":"ring_counterforger","levelGte":2}],"reward":{"values":{"trust":2,"danger":-2},"professionXp":{"ring_counterforger":2},"setFlags":["achievement_ring_counter_clause"]}}],"outfits":[{"id":"outfit.albina.rain","label":"雨室外套","portraitAssetId":"portrait.albina.rain"},{"id":"outfit.albina.white_canvas","route":"white_canvas","label":"白色画布装束","portraitAssetId":"portrait.albina.white-canvas"},{"id":"outfit.albina.golden_bough","route":"golden_bough_rebuild","label":"金枝重构装束","portraitAssetId":"portrait.albina.golden-bough"},{"id":"outfit.albina.ring_disguise","route":"ring_conspiracy","label":"环指潜入装束","portraitAssetId":"portrait.albina.ring-conspiracy"}],"worldbookEntries":[{"id":"albina_canon_term_corporism","claimIds":["canon.term.corporism"],"constant":false,"selective":true,"content":"Corporism 是 Canto IX 9-14 与 9-37 明确使用的环指艺术流派名称。本卡保留英文术语，避免无来源扩写其教义。"},{"id":"albina_identity_status","claimIds":["canon.profile.identity"],"constant":false,"selective":true,"content":"阿尔比娜是女性环指 Corporism 学徒、House of Spiders 成员与卡利斯托的弟子，在 Canto IX 作为敌对角色登场；韩语配音为 Kim Do-hee，9-43 后的正史状态为死亡。"},{"id":"albina_prosthetic_appearance","claimIds":["canon.appearance.prosthetic-body"],"constant":false,"selective":true,"content":"阿尔比娜使用带金色点缀的白色全身义体；浅灰色人工高马尾近似线缆，脸与关节处有分界线，黑色机械和线路在颈胸与大腿处裸露，中央结构近似骨架。她右眼黑、左眼白，前臂可展开多种医疗与切割工具。"},{"id":"albina_armor_fascia_visual","claimIds":["canon.appearance.armor-and-fascia"],"constant":false,"selective":true,"content":"白、亮黄、金色的铁处女式装甲具有长裙、尖刺头环、垂链、尖刺裙甲和绘有金色锐眼的面具。Fascia 是同色系巨剑，侧板打开后可见暗色骨架、肋骨与内脏组织。"},{"id":"fascia_body_origin","claimIds":["canon.story.pre-canto-fascia"],"constant":false,"selective":true,"content":"阿尔比娜主动切分原本肉体并将其制作成 Fascia，之后以全身义体替换身体、主要保留脑；Fascia 则缺少脑。她也曾先用自己的手臂练习如何处理创作素材。"},{"id":"albina_fascia_attachment","claimIds":["canon.personality.fascia-attachment"],"constant":false,"selective":true,"content":"阿尔比娜会与 Fascia 交谈、用他人血肉喂养它，并在它可能受损时优先保护它；她甚至会为让 Fascia 继续行动而违背同伴要求。"},{"id":"albina_social_ambition","claimIds":["canon.personality.social-and-ambition"],"constant":false,"selective":true,"content":"阿尔比娜通常平静轻声，却难以理解他人情绪；她把朋友与可用于 Fascia 的素材联系起来，并说自己因把部分脑组织交给 Fascia 而不善说谎。她敬仰卡利斯托，也希望未来成为超越师父的 Maestro。"},{"id":"canto_ix_9_14_context","claimIds":["canon.9-14.corporism-context"],"constant":false,"selective":true,"content":"9-14 展示了环指加工的人体作品、Faust 对 Corporism 的辨认和 Nursefather 留给女儿的创作指示。阿尔比娜本人没有在这一节直接出场。"},{"id":"canto_ix_9_18_first_appearance","claimIds":["canon.9-18.first-appearance"],"constant":false,"selective":true,"content":"9-18 是阿尔比娜首次直接出场。她与 Ren 接替 Shiomi Yoru 阻挡 Dante、Ryōshū、Gregor、Meursault 与 Yi Sang，为 Yoru 带走嫁接的 Golden Boughs 争取时间。战斗中装甲与 Fascia 侧板打开；她坚持让 Fascia 继续行动，Ren 出手制止，争执使罪人得以继续追赶 Yoru。"},{"id":"canto_ix_9_37_encounter","claimIds":["canon.9-37.encounter-and-method"],"constant":false,"selective":true,"content":"Callisto 派阿尔比娜迎接抵达 Corridor of the Ring 的 Sinclair、Ishmael、Faust、Hohenheim 与 Alyssa。她谈到唤醒 Fascia、用自己手臂练习素材处理和交朋友的愿望；遭到 Sinclair 拒绝后开战，并自称是 Callisto 门下的 Corporism 学徒。"},{"id":"canto_ix_9_37_escalation","claimIds":["canon.9-37.escalation"],"constant":false,"selective":true,"content":"Callisto 加入后与阿尔比娜一同压制众人。9-37 最后是 Callisto 以骨肉尖桩制住除 Alyssa 外的成员、Alyssa 以 Ardor Blossom Star 全力反击；Fascia 被毁和师徒死亡不发生在这一节。"},{"id":"canto_ix_9_43_turn_and_outcome","claimIds":["canon.9-43.sign-awakening","canon.9-43.outcome"],"constant":true,"selective":false,"content":"9-43 中 Hohenheim 突袭 Callisto 后，阿尔比娜阻止追击并谈到未来；Sinclair 完全觉醒 The Sign，显现未来版本。Faust 与 Ishmael 制造开口后，Future Sinclair 先摧毁 Fascia，再杀死阿尔比娜，并随后杀死 Callisto。"},{"id":"albina_combat_profile","claimIds":["canon.combat.story-variants","canon.combat.mechanics"],"constant":false,"selective":true,"content":"主线敌人记录包含 9-18 装甲形态、9-37 的装甲转无装甲阶段和 9-43 无装甲形态。她是 65 级、Lust 倾向、以 Bleed 为核心的 Boss；Corpus Ingredient 会转为 Artwork - Fascia 并启用强力攻击。Mirror Dungeon 与 Refracted 记录属于玩法变体，不是主线事件。"},{"id":"albina_visual_reference_lock","claimIds":["inference.visual-reference-lock"],"constant":true,"selective":false,"content":"代表正史阿尔比娜的视觉必须保留白色全身义体、右黑左白双眼、白黄金铁处女式装甲和具有骨骼内脏结构的 Fascia。路线服装变化只能作为明确标注的 AU 视觉。"},{"id":"albina_routes_endings_au_if","claimIds":["boundary.routes-and-player.are-AU"],"constant":true,"selective":false,"content":"opening_001、white_canvas、golden_bough_rebuild、ring_conspiracy、九个结局以及 {{user}} 的身份、能力和关系全部是本卡原创 AU/IF。分歧点位于 9-43 正史结果之后，不能称为原作后续或隐藏结局。"}]}'), h8 = /* @__PURE__ */ JSON.parse('[{"version":2,"id":"canon_recap_9_14","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-14.corporism-context"],"sourceIds":["source.official.canto-ix.9-14","source.wiki.canto-ix-part-i.172275"],"note":"Short zh-CN event paraphrase; not a quotation or transcript replacement."},"locationId":"lce_research_hallway","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-14 背景】在 LCE 研究区走廊，众人遭遇环指加工的人体作品。Faust 根据骨骼、肌肉与运动方式将其辨认为 Corporism，并发现 Nursefather 留给女儿的创作指示。固定转录全文没有在 9-14 直接写到 Albina；本节只提供她所属艺术流派的背景。","voiceAssetId":"voice.scene.canon_recap_9_14","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_18","text":"继续复盘 Albina 的首次登场","nextSceneId":"canon_recap_9_18","resultText":"时间推进到 9-18 的 LCE 研究区实验室。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_18","effects":{"setFlags":["canon_recap_9_14_seen"]}}]},{"version":2,"id":"canon_recap_9_18","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-18.first-appearance"],"sourceIds":["source.official.canto-ix.9-18","source.wiki.canto-ix-part-i.172275","source.wiki.albina.173286"],"note":"Reviewed zh-CN first-appearance paraphrase covering the complete Albina-related 9-18 event sequence."},"locationId":"lce_research_lab","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-18 首次出场】Dante、Ryōshū、Gregor、Meursault 与 Yi Sang 在 LCE 研究区实验室追查 Golden Boughs。Albina 与 Ren 接替 Shiomi Yoru 阻挡他们，让 Yoru 接近并带走嫁接的金枝。战斗推进到两人受创后，Albina 的上半装甲与 Fascia 侧板打开，露出搏动组织；她坚持让 Fascia 继续行动，Ren 则要求服从各自师父的计划，并出手制止她。两人的争执也给了罪人继续追赶 Yoru 的机会。","voiceAssetId":"voice.scene.canon_recap_9_18","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37","text":"继续复盘 9-37","nextSceneId":"canon_recap_9_37","resultText":"时间推进到 Operation Spider Pyre 期间的 Ring Corridor。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_37","effects":{"setFlags":["canon_recap_9_18_seen"]}}]},{"version":2,"id":"canon_recap_9_37","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.encounter-and-method"],"sourceIds":["source.official.canto-ix.9-37","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286"],"note":"Reviewed zh-CN 9-37 arrival, method and friendship paraphrase; player boundary text is kept out of this canon scene."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 相遇】Operation Spider Pyre 期间，Sinclair、Ishmael、Faust、Hohenheim 与 Alyssa 抵达 Corridor of the Ring；Callisto 派 Albina 前来“迎接”他们。她因唤醒沉睡的 Fascia 而迟到，并说明自己仍不擅长在不损坏素材的情况下完成作品，所以先用自己的手臂练习。她礼貌地请求众人与自己成为朋友，却把了解彼此与挑选 Fascia 的素材混在一起；遭到 Sinclair 拒绝后，双方开战。Albina 随后自报姓名，并说明自己是 Callisto 门下的 Corporism 学徒。","voiceAssetId":"voice.scene.canon_recap_9_37","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_albina_fascia","text":"核对 Albina 与 Fascia","nextSceneId":"canon_recap_albina_fascia","resultText":"复盘转向两者的身份与身体关系。","resultVoiceAssetId":"voice.result.canon_recap_continue_albina_fascia","effects":{"setFlags":["canon_recap_9_37_seen"]}}]},{"version":2,"id":"canon_recap_albina_fascia","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.profile.identity","canon.appearance.prosthetic-body","canon.appearance.armor-and-fascia","canon.personality.fascia-attachment","canon.personality.social-and-ambition","canon.story.pre-canto-fascia"],"sourceIds":["source.official.canto-ix.9-18","source.official.canto-ix.9-37","source.official.canto-ix.9-43","source.wiki.albina-enemy.175660","source.wiki.albina.173286","source.wiki.callisto.177757","source.wiki.canto-ix-part-i.172275","source.wiki.canto-ix-part-iii.177602","source.wiki.house-of-spiders.177075"],"note":"Atomic profile, appearance, personality and pre-Canto facts rendered from the reviewed claim ledger; no source dialogue is reproduced."},"locationId":"ring_corridor","backgroundAssetId":"bg.ring_atelier","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"left","active":true,"scale":1}],"speaker":"正史复盘","text":"【身份】Albina（韩文 알비나，日文 アルビナ）是女性环指 Corporism 学徒、House of Spiders 成员与 Callisto 的弟子。她在 Canto IX 中作为敌对角色登场，韩语配音为 Kim Do-hee；9-43 之后的正史状态为死亡。\\n\\n【外观】她使用带金色点缀的白色全身义体：浅灰色人工质感高马尾近似线缆，脸与关节处有分界线，颈胸与大腿可见黑色机械和线路，躯干中央近似骨架。她右眼黑、左眼白，前臂还能展开剪刀、锯、手术刀、三爪与牵开器等工具。\\n\\n【装甲与武器】她的铁处女式全身装甲以白、亮黄与金色为主，具有长裙、尖刺头环、垂链、尖刺裙甲和绘有金色锐眼的面具。Fascia 是同色系巨剑，侧板打开后会露出暗色骨架、肋骨与内脏组织。\\n\\n【Fascia】Albina 对 Fascia 有强烈依恋，会与它交谈、用他人血肉喂养它，并在它可能受损时优先保护它；9-18 中她甚至为让 Fascia 继续行动而违背 Ren 对计划的要求。\\n\\n【人格与关系】她通常平静轻声、专注艺术，却难以理解他人的情绪；她将“朋友”与可用于 Fascia 的素材联系起来。她表示自己把部分脑组织交给 Fascia 后变得很不善说谎，同时敬仰 Callisto，并希望未来成为超越师父的 Maestro。\\n\\n【身体关系】Albina 主动切分原本肉体并将其制作成 Fascia，随后用全身义体替换身体、主要保留脑；Fascia 则缺少脑。她还曾先以自己的手臂练习如何处理创作素材。","voiceAssetId":"voice.scene.canon_recap_albina_fascia","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37_battle","text":"继续复盘 9-37 的战斗升级","nextSceneId":"canon_recap_9_37_battle","resultText":"复盘转向 Callisto 加入后的最后阶段。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_37_battle","effects":{"setFlags":["canon_recap_albina_fascia_seen"]}}]},{"version":2,"id":"canon_recap_9_37_battle","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.escalation"],"sourceIds":["source.official.canto-ix.9-37","source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602"],"note":"Reviewed 9-37 ending boundary contrasted with the later 9-43 outcome."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 战斗升级】Callisto 加入战斗后，与 Albina 一同逐步压制 Limbus Company 一行。该节最后，Callisto 以骨肉尖桩制住除 Alyssa 外的众人，Alyssa 则将 Ardor Blossom Star 调至最高同调并发动反击。9-37 到此结束；Fascia 被毁、Albina 与 Callisto 死亡都不属于这一节，而发生在后续 9-43《Hatching》。","voiceAssetId":"voice.scene.canon_recap_9_37_battle","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_43","text":"继续复盘 9-43《Hatching》","nextSceneId":"canon_recap_9_43_outcome","resultText":"时间推进到 9-43；接下来才是不能被路线文本改写为正史的既定结果。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_43","effects":{"setFlags":["canon_recap_9_37_battle_seen"]}}]},{"version":2,"id":"canon_recap_9_43_outcome","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-43.sign-awakening","canon.9-43.outcome"],"sourceIds":["source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286"],"note":"Reviewed 9-43 pressure, Sign awakening and outcome paraphrase; the AU boundary remains a separate scene."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap-outcome","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-43《Hatching》转折】Hohenheim 用 Diffraction 突袭 Callisto 后，Albina 阻止 Faust 与 Ishmael 乘机追击；师徒仍将严重受创的众人逼入绝境。她要求 Sinclair 留下成为自己与 Fascia 的朋友，并在旁观 Callisto 对 Hohenheim 下手时谈到未来超越师父的梦想。她提出“未来”后，Sinclair 完全觉醒 The Sign，并显现一个来自未来的自己。\\n\\n【正史中文意译·9-43 既定结果】Faust 与 Ishmael 的同步攻击制造开口后，Future Sinclair 首先摧毁 Fascia。Albina 因 Fascia 被毁而失措，随后也被 Future Sinclair 杀死；Callisto 在之后被杀。Albina 的正史直接出场链至此结束，顺序是 9-18、9-37、9-43。","voiceAssetId":"voice.scene.canon_recap_9_43_outcome","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_enter_AU","text":"确认边界并进入 AU/IF 分歧","nextSceneId":"opening_001","resultText":"正史复盘已结束。以下三条路线全部是本卡原创 AU/IF。","resultVoiceAssetId":"voice.result.canon_recap_enter_AU","effects":{"setFlags":["canon_recap_9_43_seen","canon_recap_complete","AU_boundary_acknowledged"],"professionXp":{"narrative_curator":2},"activateProfession":"narrative_curator"}}]},{"version":2,"id":"opening_001","chapter":1,"route":null,"provenance":{"classification":"AU_extension","scope":"AU_boundary","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Explicit continuity boundary shown before the player selects an author-created AU route."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.opening_rain","tone":"AU-boundary","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"AU/IF 分歧","text":"【本卡原创 AU/IF，不是原作后续】9-43《Hatching》的正史结局已经复盘完毕。从这一刻开始，Albina 的存活、玩家 {{user}} 的出现、三条路线与九个结局均为本卡原创，不代表原作事实或隐藏结局。","voiceAssetId":"voice.scene.opening_001","bgmAssetId":"file.audio.bgm.backstreets.rain.mp3","choices":[{"id":"enter_white_canvas","text":"进入 white_canvas AU","nextSceneId":"white_canvas_001","resultText":"【AU/IF】你进入以关系边界与自我选择为核心的 white_canvas 原创路线。","resultVoiceAssetId":"voice.result.enter_white_canvas","effects":{"values":{"affectionAlbina":2,"trust":2,"artResonance":1},"relationshipVectors":{"intimacy":2,"reliance":2},"setFlags":["route_white_canvas_seen"],"unlockCg":["cg.opening_rain"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":4},"activateProfession":"boundary_mediator","route":"white_canvas"}},{"id":"enter_rebuild","text":"进入 golden_bough_rebuild AU","nextSceneId":"golden_bough_001","resultText":"【AU/IF】这条路线假设 Albina 在 9-43 死亡后被重构；该前提与全部后续均非正史。","resultVoiceAssetId":"voice.result.enter_rebuild","effects":{"values":{"trust":3,"danger":1},"relationshipVectors":{"reliance":2,"suspicion":1},"setFlags":["route_rebuild_seen"],"unlockCg":["cg.golden_bough_rebuild"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":4},"activateProfession":"memory_surgeon","route":"golden_bough_rebuild"}},{"id":"enter_conspiracy","text":"进入 ring_conspiracy AU","nextSceneId":"ring_conspiracy_001","resultText":"【AU/IF】这条路线主动改写 9-43 后续因果；其中的委托、关系和结局均为本卡原创。","resultVoiceAssetId":"voice.result.enter_conspiracy","effects":{"values":{"danger":3,"artResonance":2},"relationshipVectors":{"reliance":1,"suspicion":2},"setFlags":["route_conspiracy_seen"],"unlockCg":["cg.ring_invitation"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":4},"activateProfession":"ring_counterforger","route":"ring_conspiracy"}}]},{"version":2,"id":"white_canvas_001","chapter":1,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.94},{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"right","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。","voiceAssetId":"voice.scene.white_canvas_001","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_touch_boundary","text":"告诉她：完整也是一种作品","nextSceneId":"white_canvas_002","resultText":"你选择“告诉她：完整也是一种作品”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_touch_boundary","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["albina_learns_wholeness"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_tease_back","text":"反问她是否害怕自己的画布","nextSceneId":"white_canvas_002","resultText":"你选择“反问她是否害怕自己的画布”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_tease_back","effects":{"values":{"affectionAlbina":2,"danger":1,"artResonance":3},"setFlags":["player_teases_artist"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_002","chapter":2,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","voiceAssetId":"voice.scene.white_canvas_002","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_follow_to_lab","text":"陪她把画布带进 LCE 临时手术室","nextSceneId":"white_canvas_003","resultText":"你选择“陪她把画布带进 LCE 临时手术室”。LCE 医师：灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","resultVoiceAssetId":"voice.result.white_follow_to_lab","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":2},"setFlags":["white_lab_boundary_seen"],"unlockCg":["cg.hollow_torso_reveal"]}},{"id":"return_opening_from_white","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_white","effects":{"values":{"trust":1},"setFlags":["white_canvas_looped"]}}]},{"version":2,"id":"white_canvas_003","chapter":3,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","voiceAssetId":"voice.scene.white_canvas_003","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_sign_witness_protocol","text":"只签见证，不签处置权","nextSceneId":"white_canvas_004","resultText":"你选择“只签见证，不签处置权”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_sign_witness_protocol","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":2},"relationshipVectors":{"intimacy":2,"reliance":3},"conflictMastery":{"boundary":1},"setFlags":["witness_not_ownership"],"unlockCg":["cg.lce_raid"],"grantItems":["item.white.boundary_contract"],"equipItems":["equipment.white.boundary_charm"],"unlockOutfits":["outfit.albina.white_canvas"],"activateOutfit":"outfit.albina.white_canvas","completeQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":6}}},{"id":"white_interrupt_lab_terms","text":"要求医师删去所有所有权措辞","nextSceneId":"white_canvas_004","resultText":"你选择“要求医师删去所有所有权措辞”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_interrupt_lab_terms","effects":{"values":{"trust":3,"danger":1,"artResonance":3},"relationshipVectors":{"reliance":4,"suspicion":-1},"conflictMastery":{"boundary":1},"setFlags":["lab_terms_rewritten"],"unlockCg":["cg.fascia_heartbeat"],"grantItems":["item.white.boundary_contract"],"equipItems":["equipment.white.boundary_charm"],"unlockOutfits":["outfit.albina.white_canvas"],"activateOutfit":"outfit.albina.white_canvas","completeQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":6}}}],"minigame":{"minigameId":"minigame.white.mirror_thread","seed":"white-canvas-lce-witness-v1","prompt":"在签字前，连起能让阿尔比娜保留决定权的两项原则。","assistLabel":"显示边界提示","allowSkip":true}},{"version":2,"id":"white_canvas_004","chapter":4,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","voiceAssetId":"voice.scene.white_canvas_004","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_keep_empty_seat","text":"替她保留那张无人审判的座位","nextSceneId":"white_canvas_005","resultText":"你选择“替她保留那张无人审判的座位”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_keep_empty_seat","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":1},"setFlags":["white_canvas_empty_seat"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_share_rain_window","text":"把雨夜倒影交给她自己命名","nextSceneId":"white_canvas_005","resultText":"你选择“把雨夜倒影交给她自己命名”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_share_rain_window","effects":{"values":{"affectionAlbina":3,"trust":2,"artResonance":3},"setFlags":["rain_reflection_named"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_005","chapter":5,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","voiceAssetId":"voice.scene.white_canvas_005","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_complete","text":"记录白色画布路线的暂定结局","nextSceneId":"white_canvas_006","resultText":"你选择“记录白色画布路线的暂定结局”。阿尔比娜：空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","resultVoiceAssetId":"voice.result.white_canvas_route_complete","effects":{"values":{"affectionAlbina":2,"trust":2,"danger":-1,"artResonance":2},"setFlags":["white_canvas_route_complete"]}}]},{"version":2,"id":"white_canvas_006","chapter":6,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","voiceAssetId":"voice.scene.white_canvas_006","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_006_name_silence","text":"替那条轮廓取一个不会被收藏的名字","nextSceneId":"white_canvas_007","resultText":"你选择“替那条轮廓取一个不会被收藏的名字”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_name_silence","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":3},"setFlags":["silhouette_named"],"unlockCg":["cg.art_resonance"]}},{"id":"white_006_refuse_naming","text":"让轮廓保持无名，由她决定","nextSceneId":"white_canvas_007","resultText":"你选择“让轮廓保持无名，由她决定”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_refuse_naming","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["naming_returned"],"unlockCg":["cg.trust_threshold"]}}]},{"version":2,"id":"white_canvas_007","chapter":7,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.fascia_heartbeat","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.9}],"speaker":"法西娅","text":"法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","voiceAssetId":"voice.scene.white_canvas_007","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_007_keep_mirror_open","text":"让镜子继续映照，不替她遮蔽","nextSceneId":"white_canvas_008","resultText":"你选择“让镜子继续映照，不替她遮蔽”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_keep_mirror_open","effects":{"values":{"trust":3,"danger":1,"artResonance":4},"setFlags":["mirror_kept_open"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_007_ask_fascia_term","text":"当着阿尔比娜问法西娅一个边界问题","nextSceneId":"white_canvas_008","resultText":"你选择“当着阿尔比娜问法西娅一个边界问题”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_ask_fascia_term","effects":{"values":{"affectionAlbina":1,"trust":2,"artResonance":3},"setFlags":["fascia_addressed_directly"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_008","chapter":8,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","voiceAssetId":"voice.scene.white_canvas_008","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_008_hold_fascia","text":"替她暂时照看法西娅","nextSceneId":"white_canvas_009","resultText":"你选择“替她暂时照看法西娅”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_hold_fascia","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":2},"setFlags":["fascia_held_by_player"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_008_stay_witness_only","text":"只站在她视野内，不接手","nextSceneId":"white_canvas_009","resultText":"你选择“只站在她视野内，不接手”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_stay_witness_only","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["witness_distance_kept"],"unlockCg":["cg.lce_raid"]}}]},{"version":2,"id":"white_canvas_009","chapter":9,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","voiceAssetId":"voice.scene.white_canvas_009","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_009_keep_half_step","text":"守住半步距离，不擅自靠近","nextSceneId":"white_canvas_010","resultText":"你选择“守住半步距离，不擅自靠近”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_keep_half_step","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["half_step_distance"],"unlockCg":["cg.rain_confession"]}},{"id":"white_009_share_umbrella_edge","text":"把伞沿偏向她那侧","nextSceneId":"white_canvas_010","resultText":"你选择“把伞沿偏向她那侧”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_share_umbrella_edge","effects":{"values":{"affectionAlbina":4,"trust":2,"artResonance":2},"setFlags":["umbrella_shared"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_010","chapter":10,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"但丁","text":"但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","voiceAssetId":"voice.scene.white_canvas_010","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_010_acknowledge_leave","text":"承认她随时可以离开这张画布","nextSceneId":"white_canvas_011","resultText":"你选择“承认她随时可以离开这张画布”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_acknowledge_leave","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["leaving_acknowledged"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"white_010_offer_return_ticket","text":"给她一张可以返回的车票，而不是绳索","nextSceneId":"white_canvas_011","resultText":"你选择“给她一张可以返回的车票，而不是绳索”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_offer_return_ticket","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":2},"setFlags":["return_ticket_given"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_011","chapter":11,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.art_resonance","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","voiceAssetId":"voice.scene.white_canvas_011","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_011_curtain_call","text":"答应替她谢幕，不替她登台","nextSceneId":"white_canvas_012","resultText":"你选择“答应替她谢幕，不替她登台”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_curtain_call","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["curtain_call_promised"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_011_walk_beside","text":"陪她走下月台，不离开也不催促","nextSceneId":"white_canvas_012","resultText":"你选择“陪她走下月台，不离开也不催促”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_walk_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["platform_walked_together"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_012","chapter":12,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","voiceAssetId":"voice.scene.white_canvas_012","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_012_refuse_exhibit","text":"当众拒绝展出她的缺陷","nextSceneId":"white_canvas_013","resultText":"你选择“当众拒绝展出她的缺陷”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_refuse_exhibit","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-1,"artResonance":3},"relationshipVectors":{"reliance":3},"conflictMastery":{"boundary":3},"setFlags":["defect_not_exhibited"],"unlockCg":["cg.trust_threshold"],"resolveBattles":[{"battleId":"battle.white.gallery_pressure","outcome":"victory"}],"professionXp":{"boundary_mediator":6}}},{"id":"white_012_let_her_decide","text":"把展与不展的决定权交还给她","nextSceneId":"white_canvas_013","resultText":"你选择“把展与不展的决定权交还给她”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_let_her_decide","effects":{"values":{"affectionAlbina":3,"trust":5,"danger":3,"artResonance":4},"relationshipVectors":{"suspicion":3},"conflictMastery":{"boundary":1},"setFlags":["exhibit_choice_returned"],"unlockCg":["cg.art_resonance"],"resolveBattles":[{"battleId":"battle.white.gallery_pressure","outcome":"setback"}],"professionXp":{"boundary_mediator":3}}}]},{"version":2,"id":"white_canvas_013","chapter":13,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.art_resonance","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","voiceAssetId":"voice.scene.white_canvas_013","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_013_point_to_mirror","text":"指向墙上那面映过法西娅的镜子","nextSceneId":"white_canvas_014","resultText":"你选择“指向墙上那面映过法西娅的镜子”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_point_to_mirror","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":5},"setFlags":["mirror_pointed_out"],"unlockCg":["cg.art_resonance"]}},{"id":"white_013_refuse_to_choose","text":"拒绝替她决定，让她自己下刀","nextSceneId":"white_canvas_014","resultText":"你选择“拒绝替她决定，让她自己下刀”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_refuse_to_choose","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":3},"setFlags":["knife_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_014","chapter":14,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.trust_threshold","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","voiceAssetId":"voice.scene.white_canvas_014","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_014_keep_base_color","text":"答应替她保留最后一层底色","nextSceneId":"white_canvas_015","resultText":"你选择“答应替她保留最后一层底色”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_keep_base_color","effects":{"values":{"affectionAlbina":4,"trust":4,"artResonance":3},"setFlags":["base_color_kept"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_014_offer_restart","text":"答应陪她从空白重新开始","nextSceneId":"white_canvas_015","resultText":"你选择“答应陪她从空白重新开始”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_offer_restart","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["restart_offered"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_015","chapter":15,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","voiceAssetId":"voice.scene.white_canvas_015","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_final","text":"为白色画布路线盖上最后一枚印章","nextSceneId":"white_canvas_ending_gate","resultText":"你选择“为白色画布路线盖上最后一枚印章”。白色画布路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.white_canvas_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["white_canvas_route_final"]}}]},{"version":2,"id":"white_canvas_ending_gate","chapter":16,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"白色画布的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.white_canvas_ending_gate","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"white_canvas_ending_true","resultText":"结局判定完成：白色画布·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.true_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5},{"kind":"quest","questId":"quest.white.boundary_protocol","status":"completed"},{"kind":"battle","battleId":"battle.white.gallery_pressure","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.white.boundary_charm"},{"kind":"outfit","outfitId":"outfit.albina.white_canvas"},{"kind":"profession","professionId":"boundary_mediator","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_white_canvas_true_qualified"]}},{"id":"white_canvas_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"white_canvas_ending_normal","resultText":"结局判定完成：白色画布·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_white_canvas_normal_qualified"]}},{"id":"white_canvas_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"white_canvas_ending_bad","resultText":"结局判定完成：白色画布·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]},"effects":{"setFlags":["ending_white_canvas_bad_qualified"]}}]},{"version":2,"id":"white_canvas_ending_true","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"晨光落在未署名的白画上。阿尔比娜没有把你画成作品，而是把并肩离开的两道影子留在画框之外：这一次，完整与亲密同时成立。","voiceAssetId":"voice.scene.white_canvas_ending_true","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]}}},{"version":2,"id":"white_canvas_ending_normal","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"展厅按约熄灯。你们保留了尚未说尽的话，也保留了随时重画的权利。阿尔比娜把空白画布卷好，约定下一场雨后再见。","voiceAssetId":"voice.scene.white_canvas_ending_normal","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"white_canvas_ending_bad","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白厅没有发生争吵，只剩一张过早完成的画。阿尔比娜礼貌地收回画笔与称呼；边界仍被守住，但你们没能把信任带到黎明。","voiceAssetId":"voice.scene.white_canvas_ending_bad","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]}}},{"version":2,"id":"golden_bough_001","chapter":1,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"left","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。","voiceAssetId":"voice.scene.golden_bough_001","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_anchor","text":"成为她的记忆锚点","nextSceneId":"golden_bough_002","resultText":"你选择“成为她的记忆锚点”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["player_memory_anchor"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_question_fascia","text":"先检查法西娅","nextSceneId":"golden_bough_002","resultText":"你选择“先检查法西娅”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_question_fascia","effects":{"values":{"trust":2,"danger":1,"artResonance":4},"setFlags":["fascia_checked_first"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_002","chapter":2,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.94}],"speaker":"旁白","text":"镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","voiceAssetId":"voice.scene.golden_bough_002","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_push_into_raid","text":"带着记忆锚点突入金枝异常现场","nextSceneId":"golden_bough_003","resultText":"你选择“带着记忆锚点突入金枝异常现场”。浮士德：金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","resultVoiceAssetId":"voice.result.rebuild_push_into_raid","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["rebuild_raid_committed"],"unlockCg":["cg.lce_raid"]}},{"id":"return_opening_from_rebuild","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_rebuild","effects":{"values":{"trust":1},"setFlags":["rebuild_looped"]}}]},{"version":2,"id":"golden_bough_003","chapter":3,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"浮士德","text":"金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","voiceAssetId":"voice.scene.golden_bough_003","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_cut_false_completion","text":"切断“完成品”的错误定义","nextSceneId":"golden_bough_004","resultText":"你选择“切断“完成品”的错误定义”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_cut_false_completion","effects":{"values":{"trust":4,"danger":1,"artResonance":4},"relationshipVectors":{"intimacy":1,"reliance":4},"conflictMastery":{"analysis":1},"setFlags":["false_completion_cut"],"unlockCg":["cg.surgery_of_memory"],"grantItems":["item.golden.memory_anchor"],"equipItems":["equipment.golden.memory_lens"],"unlockOutfits":["outfit.albina.golden_bough"],"activateOutfit":"outfit.albina.golden_bough","completeQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":6}}},{"id":"rebuild_guard_fascia_pulse","text":"守住法西娅的心跳频率","nextSceneId":"golden_bough_004","resultText":"你选择“守住法西娅的心跳频率”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_guard_fascia_pulse","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"relationshipVectors":{"reliance":3,"obsession":1},"conflictMastery":{"resonance":1},"setFlags":["fascia_pulse_guarded"],"unlockCg":["cg.fascia_heartbeat"],"grantItems":["item.golden.memory_anchor"],"equipItems":["equipment.golden.memory_lens"],"unlockOutfits":["outfit.albina.golden_bough"],"activateOutfit":"outfit.albina.golden_bough","completeQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":6}}}]},{"version":2,"id":"golden_bough_004","chapter":4,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","voiceAssetId":"voice.scene.golden_bough_004","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_accept_missing_pieces","text":"承认缺口也是她的结构","nextSceneId":"golden_bough_005","resultText":"你选择“承认缺口也是她的结构”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_accept_missing_pieces","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["missing_pieces_accepted"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_use_rooftop_signal","text":"用楼顶信号重排记忆顺序","nextSceneId":"golden_bough_005","resultText":"你选择“用楼顶信号重排记忆顺序”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_use_rooftop_signal","effects":{"values":{"trust":3,"danger":-1,"artResonance":4},"setFlags":["rooftop_signal_reordered"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_005","chapter":5,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","voiceAssetId":"voice.scene.golden_bough_005","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_complete","text":"记录金枝重构路线的暂定结局","nextSceneId":"golden_bough_006","resultText":"你选择“记录金枝重构路线的暂定结局”。浮士德：记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","resultVoiceAssetId":"voice.result.golden_bough_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-1,"artResonance":3},"setFlags":["golden_bough_route_complete"]}}]},{"version":2,"id":"golden_bough_006","chapter":6,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.surgery_of_memory","tone":"golden","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"浮士德","text":"记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","voiceAssetId":"voice.scene.golden_bough_006","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_006_read_aloud","text":"把那段记忆当着她的面念出来","nextSceneId":"golden_bough_007","resultText":"你选择“把那段记忆当着她的面念出来”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_read_aloud","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["memory_read_aloud"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_006_keep_silent_anchor","text":"只做锚点，不替她出声","nextSceneId":"golden_bough_007","resultText":"你选择“只做锚点，不替她出声”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_keep_silent_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["silent_anchor_kept"],"unlockCg":["cg.fascia_heartbeat"]}}],"minigame":{"minigameId":"minigame.golden.testimony_cipher","seed":"golden-bough-name-continuity-v1","prompt":"把三段证词排成先尊重本人、再修复记忆的顺序。","assistLabel":"显示证词顺序提示","allowSkip":true}},{"version":2,"id":"golden_bough_007","chapter":7,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","voiceAssetId":"voice.scene.golden_bough_007","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_007_match_her_pulse","text":"按她的节拍调整呼吸","nextSceneId":"golden_bough_008","resultText":"你选择“按她的节拍调整呼吸”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_match_her_pulse","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pulse_matched"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"rebuild_007_stay_own_rhythm","text":"保留你自己的呼吸节奏，让她对齐","nextSceneId":"golden_bough_008","resultText":"你选择“保留你自己的呼吸节奏，让她对齐”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_stay_own_rhythm","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":4},"setFlags":["own_rhythm_kept"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_008","chapter":8,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","voiceAssetId":"voice.scene.golden_bough_008","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_008_protect_current_self","text":"保护此刻这个尚未完成的她","nextSceneId":"golden_bough_009","resultText":"你选择“保护此刻这个尚未完成的她”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_protect_current_self","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["current_self_protected"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_008_trade_old_memory","text":"用一段旧记忆换取撤退时间","nextSceneId":"golden_bough_009","resultText":"你选择“用一段旧记忆换取撤退时间”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_trade_old_memory","effects":{"values":{"trust":2,"danger":-2,"artResonance":4},"setFlags":["memory_traded"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_009","chapter":9,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"金色幻影","text":"镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","voiceAssetId":"voice.scene.golden_bough_009","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_009_refuse_perfect_copy","text":"替她拒绝那个完美复制品","nextSceneId":"golden_bough_010","resultText":"你选择“替她拒绝那个完美复制品”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_refuse_perfect_copy","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["perfect_copy_refused"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_009_hand_question_back","text":"把问题原样交还给她","nextSceneId":"golden_bough_010","resultText":"你选择“把问题原样交还给她”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_hand_question_back","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["question_returned"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_010","chapter":10,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","voiceAssetId":"voice.scene.golden_bough_010","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_010_veto_sealing","text":"当着医师反对封存记忆","nextSceneId":"golden_bough_011","resultText":"你选择“当着医师反对封存记忆”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_veto_sealing","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":2,"artResonance":3},"setFlags":["memory_seal_vetoed"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_010_ask_her_choice","text":"低声问她自己想怎么签","nextSceneId":"golden_bough_011","resultText":"你选择“低声问她自己想怎么签”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_ask_her_choice","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":2},"setFlags":["seal_choice_hers"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_011","chapter":11,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","voiceAssetId":"voice.scene.golden_bough_011","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_011_sit_beside","text":"坐到她旁边，不说话","nextSceneId":"golden_bough_012","resultText":"你选择“坐到她旁边，不说话”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_sit_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["silent_companionship"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"rebuild_011_ask_next_revision","text":"问她下一笔想修改哪里","nextSceneId":"golden_bough_012","resultText":"你选择“问她下一笔想修改哪里”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_ask_next_revision","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["next_revision_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_012","chapter":12,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","voiceAssetId":"voice.scene.golden_bough_012","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"rebuild_012_break_contract","text":"当面撕毁那份替换协议","nextSceneId":"golden_bough_013","resultText":"你选择“当面撕毁那份替换协议”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_break_contract","effects":{"values":{"trust":4,"danger":0,"artResonance":3},"relationshipVectors":{"reliance":3},"conflictMastery":{"analysis":3},"setFlags":["replacement_contract_torn"],"unlockCg":["cg.conspiracy_contract"],"resolveBattles":[{"battleId":"battle.golden.replacement_protocol","outcome":"victory"}],"professionXp":{"memory_surgeon":6}}},{"id":"rebuild_012_negotiate_terms","text":"替她重新谈判条件，不让她独自承担","nextSceneId":"golden_bough_013","resultText":"你选择“替她重新谈判条件，不让她独自承担”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_negotiate_terms","effects":{"values":{"affectionAlbina":2,"trust":-5,"danger":3,"artResonance":-4},"relationshipVectors":{"suspicion":3},"conflictMastery":{"analysis":1},"setFlags":["terms_renegotiated"],"unlockCg":["cg.surgery_of_memory"],"resolveBattles":[{"battleId":"battle.golden.replacement_protocol","outcome":"setback"}],"professionXp":{"memory_surgeon":3}}}]},{"version":2,"id":"golden_bough_013","chapter":13,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","voiceAssetId":"voice.scene.golden_bough_013","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_013_promise_name","text":"答应她即使失败也记得这个名字","nextSceneId":"golden_bough_014","resultText":"你选择“答应她即使失败也记得这个名字”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_promise_name","effects":{"values":{"affectionAlbina":4,"trust":5,"artResonance":3},"setFlags":["name_promise_given"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_013_offer_witness","text":"只承诺做见证，不承诺结果","nextSceneId":"golden_bough_014","resultText":"你选择“只承诺做见证，不承诺结果”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_offer_witness","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["witness_only_promise"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_014","chapter":14,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","voiceAssetId":"voice.scene.golden_bough_014","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_014_keep_unlit","text":"答应只保管，不替她点亮","nextSceneId":"golden_bough_015","resultText":"你选择“答应只保管，不替她点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_keep_unlit","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":3},"setFlags":["gilded_bough_kept_unlit"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_014_ask_when_to_light","text":"问她什么时刻才能点亮","nextSceneId":"golden_bough_015","resultText":"你选择“问她什么时刻才能点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_ask_when_to_light","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["lighting_condition_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_015","chapter":15,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","voiceAssetId":"voice.scene.golden_bough_015","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_final","text":"为金枝重构路线落最后一笔","nextSceneId":"golden_bough_rebuild_ending_gate","resultText":"你选择“为金枝重构路线落最后一笔”。金枝重构路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.golden_bough_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["golden_bough_route_final"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_gate","chapter":16,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"金枝重构的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_gate","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_rebuild_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"golden_bough_rebuild_ending_true","resultText":"结局判定完成：金枝重构·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.true_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8},{"kind":"quest","questId":"quest.golden.memory_continuity","status":"completed"},{"kind":"battle","battleId":"battle.golden.replacement_protocol","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.golden.memory_lens"},{"kind":"outfit","outfitId":"outfit.albina.golden_bough"},{"kind":"profession","professionId":"memory_surgeon","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_golden_bough_rebuild_true_qualified"]}},{"id":"golden_bough_rebuild_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"golden_bough_rebuild_ending_normal","resultText":"结局判定完成：金枝重构·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_golden_bough_rebuild_normal_qualified"]}},{"id":"golden_bough_rebuild_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"golden_bough_rebuild_ending_bad","resultText":"结局判定完成：金枝重构·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]},"effects":{"setFlags":["ending_golden_bough_rebuild_bad_qualified"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_true","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"金枝残响终于与法西娅的心跳重合。阿尔比娜记得每一次称呼、暂停和重新确认；她以新的身体醒来，也完整记得是谁陪她走过重构。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_true","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]}}},{"version":2,"id":"golden_bough_rebuild_ending_normal","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"重构在可控范围内结束。部分残响仍被封存在金色薄膜后，但阿尔比娜认得你，也认得自己。你们决定把余下修复交给时间。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_normal","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"golden_bough_rebuild_ending_bad","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"稳定槽保住了身体，却没能保住全部连续性。阿尔比娜醒来时仍然礼貌，只把你当作可靠的见证者；被遗漏的称呼沉在金枝深处。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_bad","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]}}},{"version":2,"id":"ring_conspiracy_001","chapter":1,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。","voiceAssetId":"voice.scene.ring_conspiracy_001","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_accept","text":"接下委托，但保留自己的条件","nextSceneId":"ring_conspiracy_002","resultText":"你选择“接下委托，但保留自己的条件”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_accept","effects":{"values":{"trust":2,"danger":3,"artResonance":3},"setFlags":["contract_with_boundary"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"conspiracy_pressure","text":"逼她说出真正目标","nextSceneId":"ring_conspiracy_002","resultText":"你选择“逼她说出真正目标”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_pressure","effects":{"values":{"affectionAlbina":1,"danger":4,"artResonance":2},"setFlags":["pressed_true_goal"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_002","chapter":2,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.95}],"speaker":"阿尔比娜","text":"她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","voiceAssetId":"voice.scene.ring_conspiracy_002","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_escape_to_backstreets","text":"带着未签名委托冲出画廊","nextSceneId":"ring_conspiracy_003","resultText":"你选择“带着未签名委托冲出画廊”。环指代理人：追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","resultVoiceAssetId":"voice.result.conspiracy_escape_to_backstreets","effects":{"values":{"trust":2,"danger":3,"artResonance":2},"setFlags":["ring_escape_committed"],"unlockCg":["cg.backstreet_pursuit"]}},{"id":"return_opening_from_ring","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_ring","effects":{"values":{"trust":1,"danger":-1},"setFlags":["conspiracy_looped"]}}]},{"version":2,"id":"ring_conspiracy_003","chapter":3,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","voiceAssetId":"voice.scene.ring_conspiracy_003","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_break_pursuit_frame","text":"打碎追兵布下的取景框","nextSceneId":"ring_conspiracy_004","resultText":"你选择“打碎追兵布下的取景框”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_break_pursuit_frame","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"relationshipVectors":{"intimacy":1,"reliance":4},"conflictMastery":{"blade":1},"setFlags":["pursuit_frame_broken"],"unlockCg":["cg.combat_transition_01"],"grantItems":["item.ring.counter_signet"],"equipItems":["equipment.ring.counter_signet"],"unlockOutfits":["outfit.albina.ring_disguise"],"activateOutfit":"outfit.albina.ring_disguise","completeQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":6}}},{"id":"conspiracy_feed_false_signature","text":"交出伪造签名引开视线","nextSceneId":"ring_conspiracy_004","resultText":"你选择“交出伪造签名引开视线”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_feed_false_signature","effects":{"values":{"trust":2,"danger":-1,"artResonance":4},"relationshipVectors":{"reliance":3,"suspicion":1},"conflictMastery":{"analysis":1},"setFlags":["false_signature_planted"],"unlockCg":["cg.ren_interruption"],"grantItems":["item.ring.counter_signet"],"equipItems":["equipment.ring.counter_signet"],"unlockOutfits":["outfit.albina.ring_disguise"],"activateOutfit":"outfit.albina.ring_disguise","completeQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":6}}}]},{"version":2,"id":"ring_conspiracy_004","chapter":4,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","voiceAssetId":"voice.scene.ring_conspiracy_004","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"ring_conspiracy_route_complete","text":"记录环指共谋路线的暂定结局","nextSceneId":"ring_conspiracy_005","resultText":"你选择“记录环指共谋路线的暂定结局”。卡利斯托：卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-2,"artResonance":3},"setFlags":["ring_conspiracy_route_complete"],"unlockCg":["cg.ring_conspiracy_ending"]}}]},{"version":2,"id":"ring_conspiracy_005","chapter":5,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","voiceAssetId":"voice.scene.ring_conspiracy_005","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_005_refuse_duo","text":"当众拒绝成为合作展品","nextSceneId":"ring_conspiracy_006","resultText":"你选择“当众拒绝成为合作展品”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_refuse_duo","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["duo_exhibit_refused"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_005_let_her_answer","text":"不替她回答，让阿尔比娜开口","nextSceneId":"ring_conspiracy_006","resultText":"你选择“不替她回答，让阿尔比娜开口”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_let_her_answer","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["albina_answered_herself"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_006","chapter":6,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","voiceAssetId":"voice.scene.ring_conspiracy_006","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_006_stand_with_her","text":"站到她身侧，分担凝视","nextSceneId":"ring_conspiracy_007","resultText":"你选择“站到她身侧，分担凝视”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_stand_with_her","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":1,"artResonance":3},"setFlags":["gaze_shared"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_006_block_view","text":"挡在她和委托人之间","nextSceneId":"ring_conspiracy_007","resultText":"你选择“挡在她和委托人之间”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_block_view","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":3,"artResonance":2},"setFlags":["view_blocked"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_007","chapter":7,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","voiceAssetId":"voice.scene.ring_conspiracy_007","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_007_break_frame","text":"冲破画框","nextSceneId":"ring_conspiracy_008","resultText":"你选择“冲破画框”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_break_frame","effects":{"values":{"trust":3,"danger":3,"artResonance":3},"setFlags":["street_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_007_seize_frame","text":"把画框抢过来，反过来框住他","nextSceneId":"ring_conspiracy_008","resultText":"你选择“把画框抢过来，反过来框住他”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_seize_frame","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["frame_seized"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_008","chapter":8,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","voiceAssetId":"voice.scene.ring_conspiracy_008","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_008_refuse_testimony","text":"当面拒绝用她换取证词","nextSceneId":"ring_conspiracy_009","resultText":"你选择“当面拒绝用她换取证词”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_refuse_testimony","effects":{"values":{"affectionAlbina":2,"trust":5,"danger":2,"artResonance":2},"setFlags":["testimony_refused"],"unlockCg":["cg.lce_raid"]}},{"id":"conspiracy_008_hand_pen_to_her","text":"把笔交还给她，由她自己决定","nextSceneId":"ring_conspiracy_009","resultText":"你选择“把笔交还给她，由她自己决定”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_hand_pen_to_her","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pen_returned_to_albina"],"unlockCg":["cg.conspiracy_contract"]}}],"minigame":{"minigameId":"minigame.ring.boundary_resonance","seed":"ring-counter-contract-v1","prompt":"只点亮能把这份委托改写为反制契约的条款节点。","assistLabel":"标记不可接受的占有条款","allowSkip":true}},{"version":2,"id":"ring_conspiracy_009","chapter":9,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","voiceAssetId":"voice.scene.ring_conspiracy_009","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_009_choose_present","text":"选现在的她，不挑那个环指版","nextSceneId":"ring_conspiracy_010","resultText":"你选择“选现在的她，不挑那个环指版”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_choose_present","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["present_albina_chosen"],"unlockCg":["cg.art_resonance"]}},{"id":"conspiracy_009_refuse_choice","text":"拒绝回答，让她自己挑镜子","nextSceneId":"ring_conspiracy_010","resultText":"你选择“拒绝回答，让她自己挑镜子”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_refuse_choice","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["mirror_choice_returned"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_010","chapter":10,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"卡利斯托","text":"卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","voiceAssetId":"voice.scene.ring_conspiracy_010","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_010_throw_badge","text":"把徽章扔回卡利斯托脸上","nextSceneId":"ring_conspiracy_011","resultText":"你选择“把徽章扔回卡利斯托脸上”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_throw_badge","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":3,"artResonance":2},"setFlags":["badge_thrown"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_010_keep_badge_unworn","text":"收下徽章，但谁都不许戴","nextSceneId":"ring_conspiracy_011","resultText":"你选择“收下徽章，但谁都不许戴”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_keep_badge_unworn","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":1,"artResonance":4},"setFlags":["badge_kept_unworn"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_011","chapter":11,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","voiceAssetId":"voice.scene.ring_conspiracy_011","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_011_rewrite_ending","text":"当众改写结局，让他们措手不及","nextSceneId":"ring_conspiracy_012","resultText":"你选择“当众改写结局，让他们措手不及”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_rewrite_ending","effects":{"values":{"trust":4,"danger":0,"artResonance":4},"relationshipVectors":{"reliance":3},"conflictMastery":{"blade":3},"setFlags":["ending_rewritten"],"unlockCg":["cg.ring_conspiracy_ending"],"resolveBattles":[{"battleId":"battle.ring.authorship_frame","outcome":"victory"}],"professionXp":{"ring_counterforger":6}}},{"id":"conspiracy_011_burn_film","text":"直接烧掉胶片，让剧本作废","nextSceneId":"ring_conspiracy_012","resultText":"你选择“直接烧掉胶片，让剧本作废”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_burn_film","effects":{"values":{"trust":3,"danger":7,"artResonance":3},"relationshipVectors":{"suspicion":3},"conflictMastery":{"blade":1},"setFlags":["film_burned"],"unlockCg":["cg.combat_transition_01"],"resolveBattles":[{"battleId":"battle.ring.authorship_frame","outcome":"setback"}],"professionXp":{"ring_counterforger":3}}}]},{"version":2,"id":"ring_conspiracy_012","chapter":12,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","voiceAssetId":"voice.scene.ring_conspiracy_012","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_012_end_tonight","text":"选择结束今晚的共谋","nextSceneId":"ring_conspiracy_013","resultText":"你选择“选择结束今晚的共谋”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_end_tonight","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":-2,"artResonance":3},"setFlags":["night_ended"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_012_keep_blade","text":"收下画刀，留给未来必要时再用","nextSceneId":"ring_conspiracy_013","resultText":"你选择“收下画刀，留给未来必要时再用”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_keep_blade","effects":{"values":{"affectionAlbina":1,"trust":4,"danger":1,"artResonance":4},"setFlags":["blade_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_013","chapter":13,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","voiceAssetId":"voice.scene.ring_conspiracy_013","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"conspiracy_013_hold_one_second","text":"认真握住那一秒，不多不少","nextSceneId":"ring_conspiracy_014","resultText":"你选择“认真握住那一秒，不多不少”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_hold_one_second","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["one_second_held"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"conspiracy_013_return_gently","text":"提前把它轻轻送回，不占有","nextSceneId":"ring_conspiracy_014","resultText":"你选择“提前把它轻轻送回，不占有”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_return_gently","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":4},"setFlags":["heartbeat_returned_early"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"ring_conspiracy_014","chapter":14,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","voiceAssetId":"voice.scene.ring_conspiracy_014","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_014_erase_from_catalog","text":"选择从环指目录里彻底抹去","nextSceneId":"ring_conspiracy_015","resultText":"你选择“选择从环指目录里彻底抹去”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_erase_from_catalog","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-2,"artResonance":3},"setFlags":["catalog_erased"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_014_keep_one_line","text":"只保留一行不被署名的记录","nextSceneId":"ring_conspiracy_015","resultText":"你选择“只保留一行不被署名的记录”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_keep_one_line","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["anonymous_line_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_015","chapter":15,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","voiceAssetId":"voice.scene.ring_conspiracy_015","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_route_final","text":"为环指共谋路线合上最后一卷胶片","nextSceneId":"ring_conspiracy_ending_gate","resultText":"你选择“为环指共谋路线合上最后一卷胶片”。环指共谋路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["ring_conspiracy_route_final"]}}]},{"version":2,"id":"ring_conspiracy_ending_gate","chapter":16,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"环指共谋的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.ring_conspiracy_ending_gate","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"ring_conspiracy_ending_true","resultText":"结局判定完成：环指共谋·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.true_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15},{"kind":"quest","questId":"quest.ring.counter_contract","status":"completed"},{"kind":"battle","battleId":"battle.ring.authorship_frame","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.ring.counter_signet"},{"kind":"outfit","outfitId":"outfit.albina.ring_disguise"},{"kind":"profession","professionId":"ring_counterforger","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_ring_conspiracy_true_qualified"]}},{"id":"ring_conspiracy_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"ring_conspiracy_ending_normal","resultText":"结局判定完成：环指共谋·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_ring_conspiracy_normal_qualified"]}},{"id":"ring_conspiracy_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"ring_conspiracy_ending_bad","resultText":"结局判定完成：环指共谋·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]},"effects":{"setFlags":["ending_ring_conspiracy_bad_qualified"]}}]},{"version":2,"id":"ring_conspiracy_ending_true","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"环指的目录里只剩一页无法归档的空白。阿尔比娜以自己的名字向你发出下一次邀请；你们不再是展品或棋子，而是彼此承认的共谋者。","voiceAssetId":"voice.scene.ring_conspiracy_ending_true","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]}}},{"version":2,"id":"ring_conspiracy_ending_normal","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"你们离开了画廊，也留下了一条匿名记录作为制衡。危险没有消失，但契约已被改写；阿尔比娜把下一次会面留给更安全的夜晚。","voiceAssetId":"voice.scene.ring_conspiracy_ending_normal","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"ring_conspiracy_ending_bad","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"追击停止时，代价已经写进彼此的沉默。你们逃出了装裱，却没能保住共同节奏；阿尔比娜独自带走那柄无锋画刀，没有约定再见。","voiceAssetId":"voice.scene.ring_conspiracy_ending_bad","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]}}}]'), b8 = {
  version: d8,
  projectId: l8,
  initialSceneId: u8,
  routeEntrySceneIds: f8,
  gameplay: p8,
  scenes: h8
}, m8 = W({
  white_canvas: E().min(1),
  golden_bough_rebuild: E().min(1),
  ring_conspiracy: E().min(1)
}).strict(), v8 = W({
  version: pe(Zi),
  projectId: pe("albina-galgame-card"),
  initialSceneId: E().min(1),
  routeEntrySceneIds: m8,
  gameplay: P9,
  scenes: oe($9).min(1)
}).strict();
function _s(t, e, a) {
  t.addIssue({
    code: "custom",
    path: e,
    message: `Unknown scene reference: ${a}`
  });
}
function g8(t) {
  return {
    quests: new Set(t.quests.map(({ id: e }) => e)),
    battles: new Set(t.battles.map(({ id: e }) => e)),
    items: new Set(t.items.map(({ id: e }) => e)),
    equipment: new Set(t.equipment.map(({ id: e }) => e)),
    professions: new Set(t.professions.map(({ id: e }) => e)),
    outfits: new Set(t.outfits.map(({ id: e }) => e)),
    minigames: new Set(t.minigames.map(({ id: e }) => e)),
    worldbook: new Set(t.worldbookEntries.map(({ id: e }) => e))
  };
}
function ka(t, e, a, i) {
  t.addIssue({ code: "custom", path: e, message: `Unknown ${a} reference: ${i}` });
}
function $o(t, e, a, i) {
  const o = t.kind === "quest" ? ["quest", t.questId, e.quests] : t.kind === "battle" ? ["battle", t.battleId, e.battles] : t.kind === "item" ? ["item", t.itemId, e.items] : t.kind === "equipment" ? ["equipment", t.equipmentId, e.equipment] : t.kind === "outfit" ? ["outfit", t.outfitId, e.outfits] : t.kind === "profession" ? ["profession", t.professionId, e.professions] : t.kind === "worldbook" ? ["worldbook", t.entryId, e.worldbook] : void 0;
  o && !o[2].has(o[1]) && ka(a, i, o[0], o[1]);
}
function _8(t, e, a, i) {
  [
    [t.startQuests, e.quests, "quest", "startQuests"],
    [t.completeQuests, e.quests, "quest", "completeQuests"],
    [t.grantItems, e.items, "item", "grantItems"],
    [t.equipItems, e.equipment, "equipment", "equipItems"],
    [t.unlockOutfits, e.outfits, "outfit", "unlockOutfits"]
  ].forEach(([n, r, s, c]) => n?.forEach((d, l) => {
    r.has(d) || ka(a, [...i, c, l], s, d);
  })), t.resolveBattles?.forEach(({ battleId: n }, r) => {
    e.battles.has(n) || ka(a, [...i, "resolveBattles", r, "battleId"], "battle", n);
  }), Object.keys(t.professionXp ?? {}).forEach((n) => {
    e.professions.has(n) || ka(a, [...i, "professionXp", n], "profession", n);
  }), t.activateOutfit && !e.outfits.has(t.activateOutfit) && ka(a, [...i, "activateOutfit"], "outfit", t.activateOutfit), t.activateProfession && !e.professions.has(t.activateProfession) && ka(a, [...i, "activateProfession"], "profession", t.activateProfession);
}
function y8(t, e, a, i) {
  t.eligibility.forEach((o, n) => $o(o, e, a, [...i, "eligibility", n])), Object.keys(t.reward.professionXp ?? {}).forEach((o) => {
    e.professions.has(o) || ka(a, [...i, "reward", "professionXp", o], "profession", o);
  }), t.reward.grantItems?.forEach((o, n) => {
    e.items.has(o) || ka(a, [...i, "reward", "grantItems", n], "item", o);
  }), t.reward.unlockOutfits?.forEach((o, n) => {
    e.outfits.has(o) || ka(a, [...i, "reward", "unlockOutfits", n], "outfit", o);
  });
}
function w8(t, e, a, i) {
  t && !e.minigames.has(t.minigameId) && ka(a, [...i, "minigameId"], "minigame", t.minigameId);
}
function k8(t, e) {
  const a = g8(t.gameplay);
  t.scenes.forEach((i, o) => i.choices.forEach((n, r) => {
    const s = ["scenes", o, "choices", r];
    _8(n.effects, a, e, [...s, "effects"]), n.availability?.allOf?.forEach((c, d) => $o(c, a, e, [...s, "availability", "allOf", d])), n.availability?.anyOf?.forEach((c, d) => $o(c, a, e, [...s, "availability", "anyOf", d]));
  })), t.scenes.forEach((i, o) => {
    w8(i.minigame, a, e, ["scenes", o, "minigame"]), i.ending?.eligibility.allOf?.forEach((n, r) => $o(n, a, e, ["scenes", o, "ending", "eligibility", "allOf", r])), i.ending?.eligibility.anyOf?.forEach((n, r) => $o(n, a, e, ["scenes", o, "ending", "eligibility", "anyOf", r]));
  }), t.gameplay.achievements.forEach((i, o) => {
    y8(i, a, e, ["gameplay", "achievements", o]);
  });
}
const vh = v8.superRefine((t, e) => {
  const a = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = new Map(t.scenes.map((r) => [r.id, r]));
  t.scenes.forEach((r, s) => {
    a.has(r.id) && e.addIssue({ code: "custom", path: ["scenes", s, "id"], message: `Duplicate scene id: ${r.id}` }), a.add(r.id), r.choices.forEach((c, d) => {
      i.has(c.id) && e.addIssue({ code: "custom", path: ["scenes", s, "choices", d, "id"], message: `Duplicate choice id: ${c.id}` }), i.add(c.id);
    });
  }), a.has(t.initialSceneId) || _s(e, ["initialSceneId"], t.initialSceneId);
  const n = o.get(t.initialSceneId);
  n && n.provenance.scope !== "canon_recap" && e.addIssue({ code: "custom", path: ["initialSceneId"], message: "Initial scene must begin the canon recap" }), Object.entries(t.routeEntrySceneIds).forEach(([r, s]) => {
    a.has(s) || _s(e, ["routeEntrySceneIds", r], s);
    const c = o.get(s);
    c && (c.route !== r || c.provenance.classification !== "AU_extension") && e.addIssue({ code: "custom", path: ["routeEntrySceneIds", r], message: `Route entry must be AU_extension content for ${r}` });
  }), t.scenes.forEach((r, s) => {
    r.choices.forEach((c, d) => {
      a.has(c.nextSceneId) || _s(e, ["scenes", s, "choices", d, "nextSceneId"], c.nextSceneId);
    });
  }), k8(t, e);
});
function I8(t) {
  const e = mh.parse(t), a = new Map(e.assets.map((o) => [o.id, o])), i = new Set(e.portraits.map((o) => o.id));
  return vh.superRefine((o, n) => {
    o.scenes.forEach((r, s) => {
      [
        [r.backgroundAssetId, ["scenes", s, "backgroundAssetId"]],
        [r.cgAssetId, ["scenes", s, "cgAssetId"]]
      ].forEach(([u, f]) => u && Ji(n, a, u, "image", f)), [
        [r.videoAssetId, ["scenes", s, "videoAssetId"]],
        [r.desktopVideoAssetId, ["scenes", s, "desktopVideoAssetId"]]
      ].forEach(([u, f]) => u && Ji(n, a, u, "video", f)), [
        [r.voiceAssetId, ["scenes", s, "voiceAssetId"]],
        [r.bgmAssetId, ["scenes", s, "bgmAssetId"]]
      ].forEach(([u, f]) => u && Ji(n, a, u, "audio", f)), r.sfxAssetIds?.forEach((u, f) => Ji(n, a, u, "audio", ["scenes", s, "sfxAssetIds", f])), r.portraits.forEach((u, f) => {
        i.has(u.portraitAssetId) || Qs(n, ["scenes", s, "portraits", f, "portraitAssetId"], u.portraitAssetId);
      }), r.choices.forEach((u, f) => {
        u.resultVoiceAssetId && Ji(n, a, u.resultVoiceAssetId, "audio", ["scenes", s, "choices", f, "resultVoiceAssetId"]), u.effects.unlockCg?.forEach((b, y) => Ji(n, a, b, "image", ["scenes", s, "choices", f, "effects", "unlockCg", y]));
      });
    }), o.gameplay.outfits.forEach((r, s) => {
      i.has(r.portraitAssetId) || Qs(n, ["gameplay", "outfits", s, "portraitAssetId"], r.portraitAssetId);
    });
  });
}
function Qs(t, e, a) {
  t.addIssue({ code: "custom", path: e, message: `Unknown asset reference: ${a}` });
}
function Ji(t, e, a, i, o) {
  const n = e.get(a);
  if (!n) {
    Qs(t, o, a);
    return;
  }
  n.kind !== i && t.addIssue({ code: "custom", path: o, message: `Asset ${a} must be ${i}, found ${n.kind}` });
}
function A8(t, e) {
  return e === void 0 ? vh.parse(t) : I8(e).parse(t);
}
const Br = W({
  name: E().min(1).max(80),
  addressName: E().min(1).max(80),
  gender: E().min(1).max(80),
  appearance: E().max(800),
  background: E().max(800),
  ability: E().max(400),
  initialRelationship: E().max(400),
  boundaries: E().max(800),
  routePreference: Et
}).strict();
function x8() {
  return {
    name: "{{user}}",
    gender: "成年男性",
    appearance: "修长的实战体态，短黑发，灰褐色眼睛，左耳佩戴简洁金属通讯耳扣。穿深 charcoal 长外套、冷白内层、旧金色窄识别带、黑色长裤和耐磨靴。",
    background: "暂未确认；可由玩家设定。",
    ability: "观察、记录与在危险中保持克制。",
    addressName: "{{user}}",
    initialRelationship: "谨慎观察：不预设亲密、敌意或服从，由故事中的明确行动逐步建立关系。",
    boundaries: "成人自愿，亲密推进需要明确同意；允许黑暗都市暴力，但不允许强迫或失能式亲密。",
    routePreference: "white_canvas"
  };
}
const T8 = W({ intimacy: X().finite(), reliance: X().finite(), obsession: X().finite(), suspicion: X().finite() }).strict(), S8 = W({ composure: X().finite(), materials: X().finite(), leverage: X().finite(), exposure: X().finite() }).strict(), C8 = W({ blade: X().finite(), boundary: X().finite(), analysis: X().finite(), resonance: X().finite() }).strict(), P8 = W({
  affectionAlbina: X().finite(),
  trust: X().finite(),
  danger: X().finite(),
  artResonance: X().finite(),
  relationshipVectors: T8,
  routeEconomy: S8,
  conflictMastery: C8
}).strict(), R8 = W({
  ownedIds: oe(E().min(1)),
  equipped: W({
    weapon: E().min(1).optional(),
    armor: E().min(1).optional(),
    accessory: E().min(1).optional(),
    tool: E().min(1).optional()
  }).strict(),
  outfitIds: oe(E().min(1)),
  activeOutfitId: E()
}).strict(), V8 = W({
  resolvedIds: oe(E().min(1)),
  outcomes: gi(E().min(1), Ie(["victory", "setback"]))
}).strict(), E8 = W({
  xp: X().int().nonnegative(),
  level: X().int().positive()
}).strict(), O8 = W({
  activeId: E(),
  progress: gi(E().min(1), E8)
}).strict(), M8 = W({ unlockedIds: oe(E().min(1)) }).strict(), bn = Wp(), $8 = W({
  activeEntryIds: oe(E().min(1)),
  seenEntryIds: oe(E().min(1)),
  presetId: Bc.default(bn.presetId),
  packageIds: oe(E().min(1).refine(An, "Worldbook package is not runtime-installable.")).optional()
}).strict().superRefine((t, e) => {
  t.presetId === "neverRuntime" && e.addIssue({ code: Jp.custom, path: ["presetId"], message: "The neverRuntime preset cannot be persisted as an active selection." });
}).transform((t) => ({
  ...t,
  ...Gc(t.presetId, t.packageIds)
}));
function ec(t, e) {
  if (t === null || typeof t == "string" || typeof t == "boolean") return !0;
  if (typeof t == "number") return Number.isFinite(t);
  if (typeof t != "object" || e.has(t)) return !1;
  e.add(t);
  const a = Array.isArray(t) ? t.every((i) => ec(i, e)) : (Object.getPrototypeOf(t) === Object.prototype || Object.getPrototypeOf(t) === null) && Object.values(t).every((i) => ec(i, e));
  return e.delete(t), a;
}
const j8 = x5((t) => t !== null && typeof t == "object" && !Array.isArray(t) && ec(t, /* @__PURE__ */ new WeakSet()), { message: "Log entries must contain only finite JSON values" }), et = oe(j8), z8 = W({
  history: et,
  timeline: et,
  routeActions: et,
  routeActivity: et,
  progressionUnlocks: et,
  consequences: et,
  routeEvents: et,
  replayAnchors: et,
  routeObjectives: et,
  watchSignals: et,
  narrativeIndex: et,
  openingDrafts: et,
  conflicts: et,
  exchanges: et,
  contacts: et,
  achievements: et,
  realityOverlays: et,
  sceneBranches: et,
  story: et,
  storySummaries: et,
  dynamicMemories: et
}).strict(), Tn = W({
  version: pe(Zi),
  projectId: pe("albina-galgame-card"),
  saveId: E().min(1),
  createdAt: E().min(1),
  updatedAt: E().min(1),
  playerProfile: Br,
  route: Et.nullable(),
  chapter: X().int().nonnegative(),
  sceneId: E().min(1),
  locationId: E(),
  values: P8,
  flags: gi(E().min(1), At()),
  inventory: R8,
  quests: W({
    activeNodeIds: oe(E().min(1)).default([]),
    completedNodeIds: oe(E().min(1)),
    currentMapNodeId: E(),
    progressLog: et
  }).strict(),
  battles: V8.default({ resolvedIds: [], outcomes: {} }),
  minigames: r3.default({ records: {} }),
  professions: O8.default({ activeId: "", progress: {} }),
  achievements: M8.default({ unlockedIds: [] }),
  worldbook: $8.default({
    activeEntryIds: [],
    seenEntryIds: [],
    presetId: bn.presetId,
    packageIds: bn.packageIds
  }),
  unlockedCg: oe(E().min(1)),
  logs: z8
}).strict(), Hl = "1970-01-01T00:00:00.000Z";
function U8() {
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
function mn() {
  return {
    version: Zi,
    projectId: "albina-galgame-card",
    saveId: "albina-v2-recovered",
    createdAt: Hl,
    updatedAt: Hl,
    playerProfile: x8(),
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
    minigames: { records: {} },
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
    worldbook: {
      activeEntryIds: [],
      seenEntryIds: [],
      presetId: bn.presetId,
      packageIds: [...bn.packageIds]
    },
    unlockedCg: [],
    logs: U8()
  };
}
function tc(t) {
  return Array.isArray(t) ? t.map(tc) : t && typeof t == "object" ? Object.fromEntries(Object.entries(t).sort(([e], [a]) => e < a ? -1 : e > a ? 1 : 0).map(([e, a]) => [e, tc(a)])) : t;
}
function F8(t) {
  return JSON.stringify(tc(Tn.parse(t)), null, 2);
}
function Xc(t) {
  return Tn.parse(t);
}
const Qc = 10;
class si extends Error {
  constructor(e, a, i) {
    super(a, i), this.code = e, this.name = "SaveRecoveryError";
  }
  code;
  recoverable = !0;
}
function gt(t) {
  if (t === null || typeof t != "object" || Array.isArray(t)) return;
  const e = Object.getPrototypeOf(t);
  return e === Object.prototype || e === null ? t : void 0;
}
function Ti(t, e, a) {
  const i = a === void 0 ? void 0 : { cause: a };
  return { ok: !1, error: new si(t, e, i) };
}
function q8(t) {
  try {
    const e = gt(t);
    return !e || e.schemaVersion !== Qc ? !1 : e.projectId === void 0 || e.projectId === "albina-galgame-card";
  } catch {
    return !1;
  }
}
function bt(t, e) {
  return typeof t == "number" && Number.isFinite(t) ? t : e;
}
function Pt(t, e) {
  return typeof t == "string" ? t : e;
}
function ei(t, e = []) {
  return Array.isArray(t) ? [...new Set(t.filter((a) => typeof a == "string" && a.length > 0))] : [...e];
}
function ac(t, e) {
  if (t === null || typeof t == "string" || typeof t == "boolean") return t;
  if (typeof t == "number") return Number.isFinite(t) ? t : void 0;
  if (Array.isArray(t)) return t.map((n) => ac(n, e)).filter((n) => n !== void 0);
  const a = gt(t);
  if (!a || e.has(a)) return;
  e.add(a);
  const i = Object.entries(a).sort(([n], [r]) => n.localeCompare(r)), o = {};
  for (const [n, r] of i) {
    const s = ac(r, e);
    s !== void 0 && (o[n] = s);
  }
  return e.delete(a), o;
}
function Z8(t) {
  return t != null && typeof t == "object" && !Array.isArray(t);
}
function tt(t) {
  return Array.isArray(t) ? t.map((e) => ac(e, /* @__PURE__ */ new WeakSet())).filter(Z8) : [];
}
function L8(t, e) {
  const a = Et.safeParse(t);
  return a.success ? a.data : typeof e == "string" && e.startsWith("golden_bough_") ? "golden_bough_rebuild" : typeof e == "string" && e.startsWith("ring_conspiracy_") ? "ring_conspiracy" : typeof e == "string" && e.startsWith("white_canvas_") ? "white_canvas" : null;
}
function N8(t, e, a) {
  const i = gt(t.playerProfile) ?? {}, o = Et.safeParse(i.routePreference);
  return {
    name: Pt(i.name, a.name),
    gender: Pt(i.gender, a.gender),
    appearance: Pt(i.appearance, a.appearance),
    background: Pt(i.background, a.background),
    ability: Pt(i.ability, a.ability),
    addressName: Pt(i.addressName, a.addressName),
    initialRelationship: Pt(i.initialRelationship, a.initialRelationship),
    boundaries: Pt(i.boundaries, a.boundaries),
    routePreference: o.success ? o.data : e ?? a.routePreference
  };
}
function D8(t, e) {
  const a = gt(t.affection) ?? {}, i = gt(t.relationshipVectors) ?? {}, o = gt(t.routeEconomy) ?? {}, n = gt(t.conflictMastery) ?? {};
  return {
    affectionAlbina: bt(a.albina, e.affectionAlbina),
    trust: bt(t.trust, e.trust),
    danger: bt(t.danger, e.danger),
    artResonance: bt(t.artResonance, e.artResonance),
    relationshipVectors: {
      intimacy: bt(i.intimacy, e.relationshipVectors.intimacy),
      reliance: bt(i.reliance, e.relationshipVectors.reliance),
      obsession: bt(i.obsession, e.relationshipVectors.obsession),
      suspicion: bt(i.suspicion, e.relationshipVectors.suspicion)
    },
    routeEconomy: {
      composure: bt(o.composure, e.routeEconomy.composure),
      materials: bt(o.materials, e.routeEconomy.materials),
      leverage: bt(o.leverage, e.routeEconomy.leverage),
      exposure: bt(o.exposure, e.routeEconomy.exposure)
    },
    conflictMastery: {
      blade: bt(n.blade, e.conflictMastery.blade),
      boundary: bt(n.boundary, e.conflictMastery.boundary),
      analysis: bt(n.analysis, e.conflictMastery.analysis),
      resonance: bt(n.resonance, e.conflictMastery.resonance)
    }
  };
}
function B8(t) {
  const e = gt(t) ?? {}, a = {};
  for (const i of ["weapon", "armor", "accessory", "tool"])
    typeof e[i] == "string" && e[i].length > 0 && (a[i] = e[i]);
  return a;
}
function H8(t, e) {
  const a = gt(t);
  return a ? Object.fromEntries(Object.entries(a).filter((i) => i[0].length > 0 && typeof i[1] == "boolean")) : { ...e };
}
function J8(t) {
  const e = ei(t.clearedConflictIds);
  return { resolvedIds: e, outcomes: Object.fromEntries(e.map((a) => [a, "victory"])) };
}
function G8(t, e) {
  const a = gt(t) ?? {}, i = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(a)]);
  return Object.fromEntries([...i].map((o) => {
    const n = gt(a[o]) ?? {}, r = e[o] ?? { xp: 0, level: 1 };
    return [o, {
      xp: Math.max(0, Math.trunc(bt(n.xp, r.xp))),
      level: Math.max(1, Math.trunc(bt(n.level, r.level)))
    }];
  }));
}
function W8(t) {
  const e = gt(t) ?? {};
  return Array.isArray(e.records) ? ei(e.records.map((a) => gt(a)?.id)) : [];
}
function K8(t) {
  const e = Wp(), a = gt(t.worldbook) ?? gt(t.worldbookSelection) ?? {}, i = Bc.safeParse(a.presetId ?? t.worldbookPreset), o = i.success && i.data !== "neverRuntime" ? i.data : e.presetId, n = a.packageIds ?? t.worldbookPackageIds;
  return Gc(o, Array.isArray(n) ? ei(n) : void 0);
}
function Y8(t) {
  return {
    history: tt(t.history),
    timeline: tt(t.timeline),
    routeActions: tt(t.routeActionLog),
    routeActivity: tt(t.routeActivityLog),
    progressionUnlocks: tt(t.progressionUnlockLog),
    consequences: tt(t.consequences),
    routeEvents: tt(t.routeEvents),
    replayAnchors: tt(t.replayAnchors),
    routeObjectives: tt(t.routeObjectives),
    watchSignals: tt(t.watchSignals),
    narrativeIndex: tt(t.narrativeIndex),
    openingDrafts: tt(t.openingDrafts),
    conflicts: tt(t.conflictResolutionLog),
    exchanges: tt(t.exchangeLog),
    contacts: tt(t.contactLog),
    achievements: tt(t.achievementLog),
    realityOverlays: tt(t.realityOverlayLog),
    sceneBranches: tt(t.sceneBranchLog),
    story: tt(t.storyLog),
    storySummaries: tt(t.storyLogSummaries),
    dynamicMemories: tt(t.dynamicMemories)
  };
}
function X8(t) {
  const e = mn();
  if (typeof t.schemaVersion == "number" && t.schemaVersion > Qc) return e;
  const a = L8(t.route, t.sceneId), i = K8(t), o = typeof t.sceneId == "string" && t.sceneId.length > 0 ? t.sceneId : e.sceneId;
  return Tn.parse({
    ...e,
    saveId: Pt(t.saveId, e.saveId),
    createdAt: Pt(t.createdAt, e.createdAt),
    updatedAt: Pt(t.updatedAt, e.updatedAt),
    playerProfile: N8(t, a, e.playerProfile),
    route: a,
    chapter: typeof t.chapter == "number" && Number.isInteger(t.chapter) && t.chapter >= 0 ? t.chapter : e.chapter,
    sceneId: o,
    locationId: Pt(t.locationId, e.locationId),
    values: D8(t, e.values),
    flags: H8(t.flags, e.flags),
    inventory: {
      ownedIds: ei(t.inventoryItemIds),
      equipped: B8(t.equippedItemIds),
      outfitIds: ei(t.wardrobeOutfitIds),
      activeOutfitId: Pt(t.activeWardrobeOutfitId, "")
    },
    quests: {
      activeNodeIds: [],
      completedNodeIds: ei(t.completedQuestNodeIds),
      currentMapNodeId: Pt(t.currentMapNodeId, ""),
      progressLog: tt(t.questProgressLog)
    },
    battles: J8(t),
    professions: {
      activeId: Pt(t.activeProfessionId, e.professions.activeId),
      progress: G8(t.professionProgress, e.professions.progress)
    },
    achievements: { unlockedIds: ei(t.unlockedAchievementIds) },
    worldbook: {
      activeEntryIds: [],
      seenEntryIds: W8(t.worldbookMemory),
      ...i
    },
    unlockedCg: ei(t.unlockedCg, e.unlockedCg),
    logs: Y8(t)
  });
}
function Q8(t) {
  try {
    const e = Tn.safeParse(t);
    if (e.success) return e.data;
    const a = gt(t);
    return a ? X8(a) : mn();
  } catch {
    return mn();
  }
}
function Hr(t) {
  try {
    const e = Tn.safeParse(t);
    if (e.success) return { ok: !0, save: e.data, source: "v2" };
    const a = gt(t);
    return a ? typeof a.version == "number" && a.version > 2 ? Ti("unsupported-version", `SaveV${a.version} is newer than this runtime.`) : typeof a.schemaVersion == "number" && a.schemaVersion > Qc ? Ti("unsupported-version", `Legacy schema ${a.schemaVersion} is newer than v1.0.44.`) : a.version === 2 ? Ti("invalid-v2", "The SaveV2 payload is damaged or incomplete.") : q8(a) ? { ok: !0, save: Q8(a), source: "v1.0.44" } : Ti("unknown-format", "The value is neither SaveV2 nor a recognized v1.0.44 save.") : Ti("unknown-format", "The value is not an Albina save object.");
  } catch (e) {
    return Ti("corrupt-input", "The save payload could not be inspected safely.", e);
  }
}
function ed(t) {
  try {
    return Hr(JSON.parse(t));
  } catch (e) {
    return Ti("invalid-json", "The imported save is not valid JSON.", e);
  }
}
const ey = ["affectionAlbina", "trust", "danger", "artResonance"], ty = ["composure", "materials", "leverage", "exposure"];
function _r(t, e = 0, a = 100) {
  return Math.max(e, Math.min(a, t));
}
function pi(t, e) {
  e.forEach((a) => {
    t.includes(a) || t.push(a);
  });
}
function gh(t, e) {
  e && (ey.forEach((a) => {
    const i = e[a];
    i !== void 0 && (t.values[a] = _r(t.values[a] + i));
  }), ty.forEach((a) => {
    const i = e[a];
    if (i === void 0) return;
    const o = a === "materials" ? 12 : 100;
    t.values.routeEconomy[a] = _r(t.values.routeEconomy[a] + i, 0, o);
  }));
}
function _h(t, e, a) {
  a && t.gameplay.relationshipTracks.forEach((i) => {
    const o = a[i.id];
    o !== void 0 && (e.values.relationshipVectors[i.id] = _r(e.values.relationshipVectors[i.id] + o, i.minimum, i.maximum));
  });
}
function ay(t, e) {
  if (e)
    for (const a of ["blade", "boundary", "analysis", "resonance"]) {
      const i = e[a];
      i !== void 0 && (t.values.conflictMastery[a] = _r(t.values.conflictMastery[a] + i, 0, 99));
    }
}
function iy(t, e) {
  e.setFlags?.forEach((a) => {
    t.flags[a] = !0;
  }), e.clearFlags?.forEach((a) => {
    t.flags[a] = !1;
  });
}
function oy(t, e, a) {
  e.forEach((i) => {
    t.quests.completedNodeIds.includes(i) || t.quests.activeNodeIds.includes(i) || (t.quests.activeNodeIds.push(i), t.quests.currentMapNodeId = i, t.quests.progressLog.push({ questId: i, status: "active", at: a }));
  });
}
function ny(t, e, a) {
  e.forEach((i) => {
    t.quests.activeNodeIds = t.quests.activeNodeIds.filter((o) => o !== i), t.quests.completedNodeIds.includes(i) || (t.quests.completedNodeIds.push(i), t.quests.progressLog.push({ questId: i, status: "completed", at: a })), t.quests.currentMapNodeId = i;
  });
}
function ry(t, e) {
  return t.reduce((a, i, o) => e >= i ? o + 1 : a, 1);
}
function yh(t, e, a) {
  a && Object.entries(a).forEach(([i, o]) => {
    const n = t.gameplay.professions.find(({ id: c }) => c === i);
    if (!n) throw new Error(`Unknown profession: ${i}`);
    const r = e.professions.progress[i] ?? { xp: 0 }, s = Math.max(0, r.xp + o);
    e.professions.progress[i] = { xp: s, level: ry(n.xpThresholds, s) };
  });
}
function td(t, e) {
  return e === void 0 || t.route === e;
}
function wh(t, e, a, i) {
  const o = t.gameplay.equipment.find(({ id: n }) => n === a);
  if (!o) throw new Error(`Unknown equipment: ${a}`);
  if (!td(e, o.route)) throw new Error(`Equipment is unavailable on route: ${a}`);
  if (!e.inventory.ownedIds.includes(o.itemId)) throw new Error(`Equipment item is not owned: ${o.itemId}`);
  e.inventory.equipped[o.slot] = o.id, e.logs.progressionUnlocks.push({ kind: "equipment", id: o.id, at: i });
}
function kh(t, e, a, i) {
  const o = t.gameplay.outfits.find(({ id: n }) => n === a);
  if (!o) throw new Error(`Unknown outfit: ${a}`);
  if (!td(e, o.route)) throw new Error(`Outfit is unavailable on route: ${a}`);
  if (!e.inventory.outfitIds.includes(o.id)) throw new Error(`Outfit is not unlocked: ${a}`);
  e.inventory.activeOutfitId = o.id, e.logs.progressionUnlocks.push({ kind: "outfit-active", id: o.id, at: i });
}
function Ih(t, e, a, i) {
  const o = t.gameplay.professions.find(({ id: n }) => n === a);
  if (!o) throw new Error(`Unknown profession: ${a}`);
  if (!td(e, o.route)) throw new Error(`Profession is unavailable on route: ${a}`);
  e.professions.activeId = o.id, e.professions.progress[o.id] ??= { xp: 0, level: 1 }, e.logs.progressionUnlocks.push({ kind: "profession-active", id: o.id, at: i });
}
function sy(t, e, a, i) {
  pi(e.inventory.ownedIds, a.grantItems ?? []), pi(e.inventory.outfitIds, a.unlockOutfits ?? []), a.equipItems?.forEach((o) => wh(t, e, o, i)), a.activateOutfit && kh(t, e, a.activateOutfit, i);
}
function cy(t, e, a) {
  e.resolveBattles?.forEach(({ battleId: i, outcome: o }) => {
    pi(t.battles.resolvedIds, [i]), t.battles.outcomes[i] = o, t.logs.conflicts.push({ battleId: i, outcome: o, at: a });
  });
}
function dy(t, e) {
  pi(t.unlockedCg, e.unlockCg ?? []), pi(t.inventory.ownedIds, e.grantItems ?? []);
}
function Ah(t, e, a, i) {
  gh(e, a.values), _h(t, e, a.relationshipVectors), ay(e, a.conflictMastery), iy(e, a), dy(e, a), oy(e, a.startQuests ?? [], i), ny(e, a.completeQuests ?? [], i), yh(t, e, a.professionXp), a.activateProfession && Ih(t, e, a.activateProfession, i), sy(t, e, a, i), cy(e, a, i);
}
function ly(t, e, a, i) {
  a.route && (e.route = a.route), Ah(t, e, a, i);
}
function uy(t, e, a) {
  return Object.values(e.inventory.equipped).reduce((i, o) => {
    const n = t.gameplay.equipment.find(({ id: r }) => r === o);
    return i + (n?.modifiers[a] ?? 0);
  }, 0);
}
function fy(t, e, a) {
  const i = t.gameplay.professions.find(({ id: n }) => n === e.professions.activeId);
  if (!i) return 0;
  const o = e.professions.progress[i.id]?.level ?? 1;
  return (i.modifiersPerLevel[a] ?? 0) * o;
}
function jo(t, e, a) {
  return e.values[a] + uy(t, e, a) + fy(t, e, a);
}
function Jl(t, e) {
  return e.operator === "gte" ? t >= e.value : e.operator === "lte" ? t <= e.value : t === e.value;
}
function ic(t, e, a) {
  return a.kind === "value" ? Jl(jo(t, e, a.key), a) : a.kind === "relationship" ? Jl(e.values.relationshipVectors[a.key], a) : a.kind === "flag" ? (e.flags[a.flag] ?? !1) === a.equals : a.kind === "quest" ? (a.status === "active" ? e.quests.activeNodeIds : e.quests.completedNodeIds).includes(a.questId) : a.kind === "battle" ? e.battles.resolvedIds.includes(a.battleId) && (!a.outcome || e.battles.outcomes[a.battleId] === a.outcome) : a.kind === "item" ? e.inventory.ownedIds.includes(a.itemId) : a.kind === "equipment" ? Object.values(e.inventory.equipped).includes(a.equipmentId) : a.kind === "outfit" ? e.inventory.outfitIds.includes(a.outfitId) : a.kind === "profession" ? (e.professions.progress[a.professionId]?.level ?? 0) >= a.levelGte : (a.status === "active" ? e.worldbook.activeEntryIds : e.worldbook.seenEntryIds).includes(a.entryId);
}
function ys(t, e, a) {
  const i = new Set(a.provenance.claimIds), o = t.gameplay.worldbookEntries.filter((n) => n.constant || n.claimIds.some((r) => i.has(r))).map(({ id: n }) => n);
  e.worldbook.activeEntryIds = o, pi(e.worldbook.seenEntryIds, o);
}
function py(t, e, a) {
  return a.route && e.route !== a.route ? !1 : a.eligibility.every((i) => ic(t, e, i));
}
function hy(t, e, a, i) {
  const o = a.reward;
  gh(e, o.values), _h(t, e, o.relationshipVectors), yh(t, e, o.professionXp), o.setFlags?.forEach((n) => {
    e.flags[n] = !0;
  }), pi(e.inventory.ownedIds, o.grantItems ?? []), pi(e.inventory.outfitIds, o.unlockOutfits ?? []), e.achievements.unlockedIds.push(a.id), e.logs.achievements.push({ achievementId: a.id, at: i });
}
function qn(t, e, a) {
  for (const i of t.gameplay.achievements)
    e.achievements.unlockedIds.includes(i.id) || py(t, e, i) && hy(t, e, i, a);
}
function by(t, e) {
  if (e.inventory.outfitIds.includes(e.inventory.activeOutfitId))
    return t.gameplay.outfits.find(({ id: a }) => a === e.inventory.activeOutfitId)?.portraitAssetId;
}
function my(t, e, a) {
  if (!t) return !0;
  const i = t.allOf?.every((n) => ic(a, e, n)) ?? !0, o = t.anyOf?.some((n) => ic(a, e, n)) ?? !0;
  return t.fallback === !0 || i && o;
}
class Gl {
  constructor(e, a = {}) {
    if (this.script = e, this.sceneById = new Map(e.scenes.map((i) => [i.id, i])), this.now = a.now ?? (() => (/* @__PURE__ */ new Date()).toISOString()), this.save = structuredClone(a.save ?? mn()), !a.save || !this.sceneById.has(this.save.sceneId)) {
      const i = this.sceneById.get(e.initialSceneId);
      if (!i) throw new Error(`Unknown initial scene: ${e.initialSceneId}`);
      this.save.sceneId = i.id, this.save.chapter = i.chapter, this.save.locationId = i.locationId, i.route !== null && (this.save.route = i.route);
    }
    ys(this.script, this.save, this.scene), qn(this.script, this.save, this.now());
  }
  script;
  sceneById;
  now;
  save;
  get scene() {
    const e = this.sceneById.get(this.save.sceneId);
    if (!e) throw new Error(`Unknown current scene: ${this.save.sceneId}`);
    return e;
  }
  get choices() {
    return this.scene.choices.filter((e) => my(e.availability, this.save, this.script));
  }
  get effectiveValues() {
    return {
      affectionAlbina: jo(this.script, this.save, "affectionAlbina"),
      trust: jo(this.script, this.save, "trust"),
      danger: jo(this.script, this.save, "danger"),
      artResonance: jo(this.script, this.save, "artResonance")
    };
  }
  get outfitPortraitAssetId() {
    return by(this.script, this.save);
  }
  get currentMinigame() {
    const e = this.scene.minigame;
    if (!e) return;
    const a = this.script.gameplay.minigames.find(({ id: i }) => i === e.minigameId);
    if (!a) throw new Error(`Unknown minigame: ${e.minigameId}`);
    if (a.route !== void 0 && a.route !== this.save.route)
      throw new Error(`Minigame is unavailable on route: ${a.id}`);
    return {
      definition: a,
      challenge: e,
      record: this.save.minigames.records[a.id]
    };
  }
  get activeMinigame() {
    const e = this.currentMinigame;
    if (!(!e || e.record?.resolved))
      return { definition: e.definition, challenge: e.challenge };
  }
  resolveMinigame(e) {
    const a = this.currentMinigame;
    if (!a) throw new Error("No minigame is active in the current scene.");
    const i = a.record;
    if (i?.resolved) throw new Error(`Minigame is already resolved: ${a.definition.id}`);
    const o = { definition: a.definition, challenge: a.challenge }, n = y3(o.definition, o.challenge, e), r = this.now(), s = o.definition.outcomes[n.outcome];
    return Ah(this.script, this.save, s, r), this.save.minigames.records[o.definition.id] = {
      attempts: (i?.attempts ?? 0) + 1,
      resolved: !0,
      completed: n.outcome === "perfect" || n.outcome === "assisted",
      rewardClaimed: !0,
      ...g3(n.outcome, i?.bestOutcome) ? { bestOutcome: n.outcome } : i?.bestOutcome ? { bestOutcome: i.bestOutcome } : {},
      lastOutcome: n.outcome,
      bestScore: Math.max(i?.bestScore ?? 0, n.score),
      assisted: n.assisted,
      seed: o.challenge.seed,
      resolvedAt: r
    }, this.save.updatedAt = r, this.save.logs.story.push({
      kind: "minigame",
      minigameId: o.definition.id,
      sceneId: this.scene.id,
      outcome: n.outcome,
      score: n.score,
      assisted: n.assisted,
      at: r
    }), qn(this.script, this.save, r), n;
  }
  replaceSave(e) {
    if (!this.sceneById.has(e.sceneId)) throw new Error(`Save references unknown scene: ${e.sceneId}`);
    this.save = structuredClone(e), ys(this.script, this.save, this.scene), qn(this.script, this.save, this.now());
  }
  choose(e) {
    const a = this.choices.find((n) => n.id === e);
    if (!a) throw new Error(`Choice is unavailable: ${e}`);
    const i = this.now();
    ly(this.script, this.save, a.effects, i);
    const o = this.sceneById.get(a.nextSceneId);
    if (!o) throw new Error(`Choice references unknown scene: ${a.nextSceneId}`);
    return this.save.sceneId = o.id, this.save.chapter = o.chapter, o.route !== null && (this.save.route = o.route), this.save.locationId = o.locationId, this.save.updatedAt = i, this.save.logs.sceneBranches.push({ choiceId: e, sceneId: o.id, at: this.save.updatedAt }), ys(this.script, this.save, o), qn(this.script, this.save, i), { choice: a, ...a.resultText ? { resultText: a.resultText } : {}, scene: o };
  }
  equip(e) {
    const a = this.now();
    wh(this.script, this.save, e, a), this.save.updatedAt = a;
  }
  wearOutfit(e) {
    const a = this.now();
    kh(this.script, this.save, e, a), this.save.updatedAt = a;
  }
  selectProfession(e) {
    const a = this.now();
    Ih(this.script, this.save, e, a), this.save.updatedAt = a;
  }
  interpolate(e) {
    return e.replaceAll("{{user}}", this.save.playerProfile.name || "你");
  }
}
class vy {
  constructor(e, a, i, o = (n, r) => fetch(n, r)) {
    this.manifest = e, this.storage = a, this.baseUrl = i, this.fetchAsset = o;
  }
  manifest;
  storage;
  baseUrl;
  fetchAsset;
  inflight = /* @__PURE__ */ new Map();
  remoteUrl(e) {
    return Yc(this.manifest, e, this.baseUrl);
  }
  cache(e) {
    return this.singleFlight(`asset:${e}`, () => this.cacheAssetOnce(e));
  }
  async cacheAssetOnce(e) {
    const a = await this.storage.getAssetUrl(e);
    if (a) return a;
    const i = this.remoteUrl(e);
    if (i)
      try {
        const o = await this.fetchAsset(i, { credentials: "omit", mode: "cors" });
        return o.ok ? (await this.storage.cacheAsset(e, await o.blob()), await this.storage.getAssetUrl(e) ?? i) : i;
      } catch {
        return i;
      }
  }
  cachePortrait(e) {
    return this.singleFlight(`portrait:${e}`, () => this.cachePortraitOnce(e));
  }
  async cachePortraitOnce(e) {
    const a = this.manifest.portraits.find((n) => n.id === e);
    if (!a) return;
    const i = await this.storage.getAssetUrl(e);
    if (i) return i;
    const o = `${this.baseUrl.replace(/\/$/u, "")}/${this.manifest.basePath}/${a.path.split("/").map(encodeURIComponent).join("/")}`;
    try {
      const n = await this.fetchAsset(o, { credentials: "omit", mode: "cors" });
      return n.ok ? (await this.storage.cacheAsset(e, await n.blob()), await this.storage.getAssetUrl(e) ?? o) : o;
    } catch {
      return o;
    }
  }
  singleFlight(e, a) {
    const i = this.inflight.get(e);
    if (i) return i;
    const n = a().then(
      (r) => (this.inflight.get(e) === n && this.inflight.delete(e), r),
      (r) => {
        throw this.inflight.get(e) === n && this.inflight.delete(e), r;
      }
    );
    return this.inflight.set(e, n), n;
  }
  async prefetch(e) {
    const a = /* @__PURE__ */ new Map(), i = await Promise.all([...new Set(e)].map(async (o) => [o, await this.cache(o)]));
    for (const [o, n] of i) n && a.set(o, n);
    return a;
  }
}
const yr = "albina-v2-save", oc = "albina-player-profile-v1";
function Jr(t, e) {
  return !e || e === "standalone" ? t : `${t}:${encodeURIComponent(e)}`;
}
const nc = "albinaSaveV2", gy = "albinaGalgameCardGameSaveV1", Wl = "albinaPlayerProfileV1", zo = "albinaWorldbookSelectionV1";
class ji extends Error {
  code = "chat-write-unavailable";
  fallbackStored;
  constructor(e = !1) {
    super("Tavern chat variables could not be written; the local fallback was saved instead."), this.name = "ChatVariableWriteError", this.fallbackStored = e;
  }
}
function Sn() {
  return typeof window > "u" ? void 0 : window.TavernHelper;
}
function go() {
  return typeof globalThis > "u" ? {} : globalThis;
}
function _y(t, e) {
  const i = go().eventOn ?? Sn()?.eventOn;
  if (i)
    try {
      const o = i(t, e);
      if (typeof o == "function") return o;
      if (o?.stop) return () => o.stop?.();
    } catch (o) {
      console.warn(`[albina-host] unable to subscribe to ${t}`, o);
    }
}
function Kl() {
  return go().getVariables ?? Sn()?.getVariables;
}
function yy() {
  return go().insertOrAssignVariables ?? Sn()?.setVariables;
}
async function Xn(t) {
  const e = yy();
  if (!e) throw new ji();
  await e(t, { type: "chat" });
}
function Si(t, e, a) {
  typeof localStorage < "u" && localStorage.setItem(Jr(t, a), JSON.stringify(e));
}
function Po() {
  return go().getChatId?.() ?? Sn()?.getChatId?.() ?? "standalone";
}
function wy(t) {
  try {
    const e = typeof localStorage > "u" ? null : localStorage.getItem(Jr(oc, t));
    if (e === null) return {};
    const a = Br.safeParse(JSON.parse(e));
    return a.success ? { profile: a.data } : { error: new si("corrupt-input", "The local player profile is invalid.") };
  } catch (e) {
    return { error: new si("storage-read-failed", "Local player profile storage could not be read.", { cause: e }) };
  }
}
function Qn(t) {
  const e = (a, i, o = 600) => a.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, "").replace(/[<>]/gu, "").trim().slice(0, o) || i;
  return {
    ...t,
    name: e(t.name, "{{user}}", 80),
    gender: e(t.gender, "成年男性", 80),
    appearance: e(t.appearance, "固定男主形象", 800),
    background: e(t.background, "暂未确认", 800),
    ability: e(t.ability, "观察与克制", 400),
    addressName: e(t.addressName, t.name, 80),
    initialRelationship: e(t.initialRelationship, "谨慎观察，由明确行动逐步建立关系", 400),
    boundaries: e(t.boundaries, "尊重明确同意与退出意愿", 800)
  };
}
function ky(t) {
  return typeof t == "string" ? ed(t) : Hr(t);
}
function Iy(t) {
  try {
    const e = typeof localStorage > "u" ? null : localStorage.getItem(Jr(yr, t));
    return e === null ? {} : { result: ed(e) };
  } catch (e) {
    return { error: new si("storage-read-failed", "Local save storage could not be read.", { cause: e }) };
  }
}
function xh(t) {
  const e = typeof t == "string" ? (() => {
    try {
      return JSON.parse(t);
    } catch {
      return;
    }
  })() : t, a = Hc.safeParse(e);
  return a.success ? a.data : void 0;
}
function Ay(t) {
  if (!(typeof localStorage > "u"))
    return xh(localStorage.getItem(Jr(zo, t)));
}
function rc(t) {
  if (typeof t == "string")
    try {
      return rc(JSON.parse(t));
    } catch {
      return;
    }
  return t !== null && typeof t == "object" && !Array.isArray(t) ? t : void 0;
}
function Yl(t) {
  const e = rc(rc(t)?.worldbook);
  return e?.presetId !== void 0 && e.packageIds !== void 0;
}
function Xl(t, e) {
  return Xc({ ...t, worldbook: { ...t.worldbook, ...e } });
}
async function Ql(t, e) {
  try {
    await Xn({ [nc]: t });
  } catch (a) {
    console.warn("[albina-save] unable to persist migrated Tavern Helper save", a);
  }
  try {
    Si(yr, t, e);
  } catch (a) {
    console.warn("[albina-save] unable to persist migrated local save", a);
  }
}
function ws(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
}
function xy() {
  return {
    getChatId: Po,
    async loadSave() {
      const t = Po(), e = Kl(), a = [];
      let i;
      if (e)
        try {
          const n = await e({ type: "chat" });
          i = xh(ws(n, zo));
          for (const r of [nc, gy]) {
            const s = ws(n, r);
            if (s === void 0) continue;
            const c = ky(s);
            if (!c.ok) {
              a.push(c.error);
              continue;
            }
            const d = !Yl(s) && !!i, l = d && i ? Xl(c.save, i) : c.save;
            return (d || c.source === "v1.0.44") && await Ql(l, t), l;
          }
        } catch (n) {
          a.push(new si("storage-read-failed", "Tavern Helper save variables could not be read.", { cause: n }));
        }
      const o = Iy(t);
      if (o.error && a.push(o.error), o.result?.ok) {
        const n = i ?? Ay(t), r = !Yl(o.result.save) && n ? Xl(o.result.save, n) : o.result.save;
        return await Ql(r, t), r;
      }
      if (o.result && !o.result.ok && a.push(o.result.error), a.length > 0) throw a[0];
    },
    async loadPlayerProfile() {
      const t = go().getChatId?.() ?? Sn()?.getChatId?.() ?? "standalone", e = Kl();
      if (e)
        try {
          const i = await e({ type: "chat" }), o = ws(i, Wl);
          if (o !== void 0) {
            const n = Br.safeParse(o);
            if (n.success) return Qn(n.data);
          }
        } catch (i) {
          console.warn("[albina-profile] unable to read Tavern Helper player profile", i);
        }
      const a = wy(t);
      return a.profile ? Qn(a.profile) : void 0;
    },
    async saveSave(t) {
      const e = Xc(t), a = Po();
      try {
        await Xn({ [nc]: e });
      } catch (i) {
        throw Si(yr, e, a), i instanceof ji && (i.fallbackStored = !0), i;
      }
      Si(yr, e, a);
    },
    async savePlayerProfile(t) {
      const e = Qn(t), a = Po();
      try {
        await Xn({ [Wl]: e });
      } catch (i) {
        throw Si(oc, e, a), i instanceof ji && (i.fallbackStored = !0), i;
      }
      Si(oc, e, a);
    },
    async saveWorldbookSelection(t) {
      const e = Hc.parse(t), a = Po();
      try {
        await Xn({ [zo]: e });
      } catch (i) {
        throw Si(zo, e, a), i instanceof ji && (i.fallbackStored = !0), i;
      }
      Si(zo, e, a);
    },
    subscribe(t, e) {
      if (typeof window > "u") return () => {
      };
      const a = go(), i = t === "chatChanged" ? a.tavern_events?.CHAT_CHANGED : void 0, o = i ? _y(i, e) : void 0, n = `albina:${t}`;
      if (!o && t !== "unmount" && window.addEventListener(n, e), t === "unmount") {
        const r = xn(window), s = r === window ? [window] : [window, r], c = (d) => {
          e(d);
        };
        return s.forEach((d) => d.addEventListener(n, e)), r.addEventListener("pagehide", c), () => {
          o?.(), s.forEach((d) => d.removeEventListener(n, e)), r.removeEventListener("pagehide", c);
        };
      }
      return () => {
        o?.(), o || window.removeEventListener(n, e);
      };
    }
  };
}
function Ty(t) {
  return new Audio(t);
}
function Va(t) {
  t && (t.pause(), t.currentTime = 0, t.src = "");
}
class Sy {
  constructor(e = Ty) {
    this.createAudio = e;
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
  async playBgm(e, a = 500) {
    this.cancelFade();
    const i = this.lifecycleGeneration, o = ++this.bgmGeneration, n = this.takePreviousBgm(), r = this.createAudio(e);
    r.src = e, r.loop = !0, r.volume = a > 0 ? 0 : this.bgmVolume(), this.bgm = r, this.pendingBgmPrevious = n;
    const s = () => this.isCurrentBgm(r, i, o);
    return await this.tryPlay(r, s) ? (this.pendingBgmPrevious = void 0, !n || a <= 0 ? (Va(n), r.volume = this.bgmVolume(), !0) : (await this.crossfade(n, r, a), s())) : (s(), !1);
  }
  enqueueVoice(e) {
    const a = new Promise((i) => this.voiceQueue.push({ source: e, resolve: i }));
    return this.playNextVoice(), a;
  }
  async playSfx(e) {
    const a = this.createAudio(e);
    a.src = e, a.loop = !1;
    const i = () => {
      a.removeEventListener("ended", i), this.sfx.delete(a), Va(a);
    };
    a.addEventListener("ended", i), this.sfx.add(a);
    try {
      return await a.play(), this.sfx.has(a);
    } catch {
      return i(), !1;
    }
  }
  async recoverAutoplay() {
    const e = this.blocked;
    if (!e) return !0;
    const a = this.lifecycleGeneration;
    try {
      return await e.play(), this.isCurrentBlocked(e, a) ? (this.blocked = void 0, e === this.bgm && this.pendingBgmPrevious && (Va(this.pendingBgmPrevious), this.pendingBgmPrevious = void 0, e.volume = this.bgmVolume()), !0) : !1;
    } catch {
      return !1;
    }
  }
  stopAll() {
    this.lifecycleGeneration += 1, this.bgmGeneration += 1, this.cancelFade(), this.finishVoice(!1), this.voiceQueue.splice(0).forEach((a) => a.resolve(!1));
    const e = /* @__PURE__ */ new Set([this.bgm, this.blocked, this.pendingBgmPrevious, this.fadingOut]);
    this.sfx.forEach((a) => e.add(a)), e.forEach(Va), this.sfx.clear(), this.bgm = void 0, this.blocked = void 0, this.pendingBgmPrevious = void 0, this.fadingOut = void 0;
  }
  dispose() {
    this.stopAll();
  }
  async tryPlay(e, a) {
    try {
      return await e.play(), a();
    } catch {
      return a() && (this.blocked = e), !1;
    }
  }
  bgmVolume() {
    return this.voice ? 0.25 : 1;
  }
  playNextVoice() {
    if (this.voice || this.voiceQueue.length === 0) return;
    const e = this.voiceQueue.shift(), a = this.createAudio(e.source);
    a.src = e.source, this.voice = a, this.activeVoiceJob = e, this.bgm && (this.bgm.volume = 0.25);
    const i = () => {
      this.finishVoice(!0), this.playNextVoice();
    };
    this.voiceEnded = i, a.addEventListener("ended", i);
    const o = this.lifecycleGeneration;
    this.tryPlay(a, () => this.lifecycleGeneration === o && this.voice === a);
  }
  finishVoice(e) {
    const a = this.voice;
    a && this.voiceEnded && a.removeEventListener("ended", this.voiceEnded), Va(a), this.blocked === a && (this.blocked = void 0), this.voice = void 0, this.voiceEnded = void 0;
    const i = this.activeVoiceJob;
    this.activeVoiceJob = void 0, a && this.bgm && (this.bgm.volume = 1), i?.resolve(e);
  }
  crossfade(e, a, i) {
    const n = i / 10, r = e.volume;
    let s = 0;
    return new Promise((c) => {
      this.fadingOut = e, this.fadeFinish = c;
      const d = () => {
        s += 1, e.volume = Math.max(0, r * (1 - s / 10)), a.volume = this.bgmVolume() * Math.min(1, s / 10), s >= 10 ? (Va(e), this.fadingOut = void 0, this.fadeTimer = void 0, this.fadeFinish = void 0, c()) : this.fadeTimer = setTimeout(d, n);
      };
      this.fadeTimer = setTimeout(d, n);
    });
  }
  cancelFade() {
    this.fadeTimer !== void 0 && clearTimeout(this.fadeTimer), this.fadeTimer = void 0, Va(this.fadingOut), this.fadingOut = void 0, this.fadeFinish?.(), this.fadeFinish = void 0;
  }
  takePreviousBgm() {
    if (this.pendingBgmPrevious) {
      const e = this.pendingBgmPrevious;
      return this.pendingBgmPrevious = void 0, this.blocked === this.bgm && (this.blocked = void 0), Va(this.bgm), e;
    }
    if (this.blocked === this.bgm) {
      this.blocked = void 0, Va(this.bgm);
      return;
    }
    return this.bgm;
  }
  isCurrentBgm(e, a, i) {
    return this.lifecycleGeneration === a && this.bgmGeneration === i && this.bgm === e;
  }
  isCurrentBlocked(e, a) {
    const i = this.bgm === e || this.voice === e;
    return this.lifecycleGeneration === a && this.blocked === e && i;
  }
}
class Cy {
  constructor(e) {
    this.storage = e;
  }
  storage;
  async unlock(e, a) {
    return await this.storage.getValue("gallery", e) ? !1 : (await this.storage.setValue("gallery", e, !0), !0);
  }
  async isUnlocked(e, a) {
    return a?.unlockedCg.includes(e) ? !0 : await this.storage.getValue("gallery", e) === !0;
  }
  async list(e) {
    const a = new Set(e?.unlockedCg ?? []);
    for (const i of await this.storage.keys("gallery")) a.add(i);
    return [...a];
  }
}
function Py() {
  return {
    loadImage: (t) => new Promise((e, a) => {
      const i = new Image();
      i.onload = () => e(i), i.onerror = () => a(new Error(`Unable to load portrait: ${t}`)), i.src = t;
    }),
    requestFrame: (t) => requestAnimationFrame(t),
    cancelFrame: (t) => cancelAnimationFrame(t),
    reducedMotion: () => matchMedia("(prefers-reduced-motion: reduce)").matches
  };
}
class Ry {
  constructor(e, a, i = "") {
    this.manifest = e, this.baseUrl = i, this.environment = a ?? Py();
  }
  manifest;
  baseUrl;
  playbacks = /* @__PURE__ */ new Set();
  environment;
  canvasGenerations = /* @__PURE__ */ new WeakMap();
  lifecycleGeneration = 0;
  urlResolver;
  reducedMotionOverride;
  async play(e, a) {
    this.stop(a);
    const i = this.lifecycleGeneration, o = this.nextCanvasGeneration(a), n = this.findPortrait(e), r = a.getContext("2d");
    if (!r) throw new Error("Portrait canvas does not expose a 2D context");
    if (n.animation.kind === "static" || this.prefersReducedMotion()) {
      await this.drawStatic(n, r, a, i, o) && this.isCurrent(a, i, o) && this.playbacks.add({ canvas: a });
      return;
    }
    await this.playStrip(n, r, a, i, o);
  }
  setUrlResolver(e) {
    this.urlResolver = e;
  }
  /**
   * Host-level reduced-motion decision. When set it wins over the internal
   * media query so an in-app accessibility toggle actually stops portrait
   * animation; pass `undefined` to fall back to the environment query.
   */
  setReducedMotionOverride(e) {
    this.reducedMotionOverride = e;
  }
  prefersReducedMotion() {
    return this.reducedMotionOverride ?? this.environment.reducedMotion();
  }
  stop(e) {
    this.nextCanvasGeneration(e);
    for (const a of this.playbacks)
      a.canvas === e && (this.releasePlayback(a), this.playbacks.delete(a));
  }
  stopAll() {
    this.lifecycleGeneration += 1;
    for (const e of this.playbacks) this.releasePlayback(e);
    this.playbacks.clear();
  }
  dispose() {
    this.stopAll();
  }
  findPortrait(e) {
    const a = this.manifest.portraits.find((i) => i.id === e);
    if (!a) throw new Error(`Unknown portrait asset: ${e}`);
    return a;
  }
  assetUrl(e) {
    return `${this.baseUrl ? `${this.baseUrl.replace(/\/$/u, "")}/` : ""}${this.manifest.basePath.replace(/\/$/, "")}/${e}`;
  }
  async drawStatic(e, a, i, o, n) {
    const r = e.fallbackAssetId ? this.manifest.assets.find((c) => c.id === e.fallbackAssetId) : void 0;
    let s;
    try {
      const c = await this.urlResolver?.(r?.id ?? e.id);
      s = await this.environment.loadImage(c ?? this.assetUrl(r?.path ?? e.path));
    } catch {
      return !1;
    }
    if (!this.isCurrent(i, o, n)) return !1;
    if (a.clearRect(0, 0, i.width, i.height), !r && e.animation.kind === "strip") {
      const c = e.animation;
      a.drawImage(s, 0, 0, c.frameWidth, c.frameHeight, 0, 0, i.width, i.height);
    } else a.drawImage(s, 0, 0, i.width, i.height);
    return !0;
  }
  async playStrip(e, a, i, o, n) {
    if (e.animation.kind !== "strip") return;
    const r = e.animation;
    let s;
    try {
      const u = await this.urlResolver?.(e.id);
      s = await this.environment.loadImage(u ?? this.assetUrl(e.path));
    } catch {
      if (!e.fallbackAssetId) return;
      await this.drawStatic(e, a, i, o, n) && this.isCurrent(i, o, n) && this.playbacks.add({ canvas: i });
      return;
    }
    if (!this.isCurrent(i, o, n)) return;
    const c = { canvas: i };
    this.playbacks.add(c);
    let d;
    const l = (u) => {
      if (!this.isCurrent(i, o, n)) return;
      d ??= u;
      const f = u - d, b = Math.floor(f / (1e3 / r.fps)) % r.frameCount;
      a.clearRect(0, 0, i.width, i.height), a.drawImage(s, b * r.frameWidth, 0, r.frameWidth, r.frameHeight, 0, 0, i.width, i.height), c.frameHandle = this.environment.requestFrame(l);
    };
    c.frameHandle = this.environment.requestFrame(l);
  }
  releasePlayback(e) {
    e.frameHandle !== void 0 && this.environment.cancelFrame(e.frameHandle), e.canvas.getContext("2d")?.clearRect(0, 0, e.canvas.width, e.canvas.height);
  }
  nextCanvasGeneration(e) {
    const a = (this.canvasGenerations.get(e) ?? 0) + 1;
    return this.canvasGenerations.set(e, a), a;
  }
  isCurrent(e, a, i) {
    return this.lifecycleGeneration === a && this.canvasGenerations.get(e) === i;
  }
}
const Zn = "queue";
class Vy {
  constructor(e) {
    this.storage = e;
  }
  storage;
  operationTail = Promise.resolve();
  listeners = /* @__PURE__ */ new Set();
  /**
   * Subscribes to queue mutations. Returns an unsubscribe function; calling it
   * twice is harmless. Observers are notified synchronously after the mutation
   * has been persisted, so the reported queueLength is always authoritative.
   */
  subscribe(e) {
    return this.listeners.add(e), () => {
      this.listeners.delete(e);
    };
  }
  /** Read-only FIFO snapshot of the pending queue for UI rendering. */
  async snapshot() {
    return this.runExclusive(async () => Object.freeze([...await this.readQueue()]));
  }
  /** Number of pending special-CG requests. */
  async length() {
    return this.runExclusive(async () => (await this.readQueue()).length);
  }
  async enqueue(e) {
    await this.runExclusive(async () => {
      const a = await this.readQueue();
      a.push(e), await this.storage.setValue("specialCg", Zn, a), this.notify({ type: "enqueued", request: e, queueLength: a.length });
    });
  }
  async peek() {
    return this.runExclusive(async () => (await this.readQueue())[0]);
  }
  async dequeue() {
    return this.runExclusive(async () => {
      const e = await this.readQueue(), a = e.shift();
      return await this.storage.setValue("specialCg", Zn, e), a && this.notify({ type: "dequeued", request: a, queueLength: e.length }), a;
    });
  }
  async clear() {
    await this.runExclusive(async () => {
      await this.storage.deleteValue("specialCg", Zn), this.notify({ type: "cleared", queueLength: 0 });
    });
  }
  async readQueue() {
    return await this.storage.getValue("specialCg", Zn) ?? [];
  }
  notify(e) {
    for (const a of this.listeners)
      try {
        a(e);
      } catch {
      }
  }
  runExclusive(e) {
    const a = this.operationTail.then(e, e);
    return this.operationTail = a.then(() => {
    }, () => {
    }), a;
  }
}
const Ey = ["assets", "gallery", "specialCg", "saves"];
class Oy {
  stores = /* @__PURE__ */ new Map();
  async get(e, a) {
    return this.stores.get(e)?.get(a);
  }
  async put(e, a, i) {
    const o = this.stores.get(e) ?? /* @__PURE__ */ new Map();
    o.set(a, i), this.stores.set(e, o);
  }
  async delete(e, a) {
    this.stores.get(e)?.delete(a);
  }
  async keys(e) {
    return [...this.stores.get(e)?.keys() ?? []];
  }
  close() {
    this.stores.clear();
  }
}
class My {
  constructor(e = new zy(), a = new Oy()) {
    this.primary = e, this.fallback = a;
  }
  primary;
  fallback;
  primaryFailed = !1;
  get(e, a) {
    return this.run((i) => i.get(e, a));
  }
  put(e, a, i) {
    return this.run((o) => o.put(e, a, i));
  }
  delete(e, a) {
    return this.run((i) => i.delete(e, a));
  }
  keys(e) {
    return this.run((a) => a.keys(e));
  }
  close() {
    this.primary.close(), this.fallback.close();
  }
  async run(e) {
    if (this.primaryFailed) return e(this.fallback);
    try {
      return await e(this.primary);
    } catch {
      return this.primaryFailed = !0, this.primary.close(), e(this.fallback);
    }
  }
}
function $y(t) {
  if (t === null || typeof t != "object" || Array.isArray(t)) return;
  const e = Object.getPrototypeOf(t);
  return e === Object.prototype || e === null ? t : void 0;
}
function jy() {
  return new Blob([], { type: "application/octet-stream" });
}
function Ln(t) {
  return new Promise((e, a) => {
    t.onsuccess = () => e(t.result), t.onerror = () => a(t.error ?? new Error("IndexedDB request failed"));
  });
}
class zy {
  constructor(e = indexedDB, a = "albina-runtime-v2") {
    this.factory = e, this.databaseName = a;
  }
  factory;
  databaseName;
  database;
  async get(e, a) {
    const i = await this.open();
    return Ln(i.transaction(e, "readonly").objectStore(e).get(a));
  }
  async put(e, a, i) {
    const o = await this.open();
    await Ln(o.transaction(e, "readwrite").objectStore(e).put(i, a));
  }
  async delete(e, a) {
    const i = await this.open();
    await Ln(i.transaction(e, "readwrite").objectStore(e).delete(a));
  }
  async keys(e) {
    const a = await this.open();
    return (await Ln(a.transaction(e, "readonly").objectStore(e).getAllKeys())).map(String);
  }
  close() {
    this.database?.then((e) => e.close(), () => {
    }), this.database = void 0;
  }
  open() {
    return this.database ??= new Promise((e, a) => {
      const i = this.factory.open(this.databaseName, 1);
      i.onupgradeneeded = () => {
        for (const o of Ey)
          i.result.objectStoreNames.contains(o) || i.result.createObjectStore(o);
      }, i.onsuccess = () => e(i.result), i.onerror = () => a(i.error ?? new Error("Unable to open IndexedDB"));
    }), this.database;
  }
}
function Uy() {
  if (typeof URL.createObjectURL == "function")
    return { createObjectURL: (t) => URL.createObjectURL(t), revokeObjectURL: (t) => URL.revokeObjectURL(t) };
}
class Fy {
  constructor(e = new My(), a) {
    this.backend = e, this.urlApi = a ?? Uy();
  }
  backend;
  objectUrls = /* @__PURE__ */ new Map();
  pendingObjectUrls = /* @__PURE__ */ new Map();
  urlApi;
  objectUrlGeneration = 0;
  async cacheAsset(e, a) {
    this.objectUrlGeneration += 1, this.pendingObjectUrls.clear(), this.releaseObjectUrl(e), await this.backend.put("assets", e, a);
  }
  async getCachedAsset(e) {
    return this.backend.get("assets", e);
  }
  async getAssetUrl(e) {
    const a = this.objectUrls.get(e);
    if (a) return a;
    const i = this.pendingObjectUrls.get(e);
    if (i) return i;
    const o = this.objectUrlGeneration, n = this.createAssetUrl(e, o);
    this.pendingObjectUrls.set(e, n);
    const r = () => {
      this.pendingObjectUrls.get(e) === n && this.pendingObjectUrls.delete(e);
    };
    return n.then(r, r), n;
  }
  async saveSnapshot(e, a) {
    const i = Xc(e);
    await this.backend.put("saves", i.saveId, { save: i, thumbnail: a });
  }
  async loadSnapshot(e) {
    const a = await this.backend.get("saves", e);
    if (a === void 0) return;
    const i = $y(a), o = i && Object.prototype.hasOwnProperty.call(i, "save"), n = o ? i.save : a, r = Hr(n);
    if (!r.ok) throw r.error;
    const s = o && i.thumbnail instanceof Blob ? i.thumbnail : jy();
    return (r.source === "v1.0.44" || !o || !(i.thumbnail instanceof Blob)) && await this.backend.put("saves", e, { save: r.save, thumbnail: s }), { save: r.save, thumbnail: s };
  }
  getValue(e, a) {
    return this.backend.get(e, a);
  }
  setValue(e, a, i) {
    return this.backend.put(e, a, i);
  }
  deleteValue(e, a) {
    return this.backend.delete(e, a);
  }
  keys(e) {
    return this.backend.keys(e);
  }
  releaseObjectUrls() {
    this.objectUrlGeneration += 1, this.pendingObjectUrls.clear();
    for (const e of [...this.objectUrls.keys()]) this.releaseObjectUrl(e);
  }
  dispose() {
    this.releaseObjectUrls(), this.backend.close();
  }
  releaseObjectUrl(e) {
    const a = this.objectUrls.get(e);
    a && (this.urlApi?.revokeObjectURL(a), this.objectUrls.delete(e));
  }
  async createAssetUrl(e, a) {
    const i = await this.getCachedAsset(e);
    if (!i || !this.urlApi || a !== this.objectUrlGeneration) return;
    const o = this.objectUrls.get(e);
    if (o) return o;
    const n = this.urlApi.createObjectURL(i);
    if (a !== this.objectUrlGeneration) {
      this.urlApi.revokeObjectURL(n);
      return;
    }
    return this.objectUrls.set(e, n), n;
  }
}
function qy(t, e) {
  return e <= 0 ? 0 : ".。！？…!?".includes(t) ? e * 6 : ",，、；:;".includes(t) ? e * 2.5 : e;
}
class Zy {
  active;
  stateListeners = /* @__PURE__ */ new Set();
  /**
   * Subscribes to typing/idle transitions. Returns an unsubscribe function.
   * State events fire around every write: 'typing' once a write starts,
   * 'idle' when it settles (naturally, via cancel, or via completeNow).
   * Empty writes never transition away from 'idle'.
   */
  subscribe(e) {
    return this.stateListeners.add(e), () => {
      this.stateListeners.delete(e);
    };
  }
  write(e, a, i = 24) {
    return this.cancel(), e.length === 0 ? (a(""), this.notifyState("idle"), Promise.resolve("")) : (this.notifyState("typing"), new Promise((o) => {
      let n = 0;
      const r = { text: e, sink: a, visible: "", resolve: o }, s = () => {
        r.visible = e.slice(0, n + 1);
        const c = e[n] ?? "";
        n += 1, a(r.visible), n >= e.length ? this.settle(r, e) : r.timer = setTimeout(s, qy(c, i));
      };
      this.active = r, r.timer = setTimeout(s, Math.max(0, i));
    }));
  }
  cancel() {
    const e = this.active;
    e && this.settle(e, e.visible);
  }
  completeNow() {
    const e = this.active;
    e && (e.visible !== e.text && e.sink(e.text), this.settle(e, e.text));
  }
  dispose() {
    this.cancel(), this.stateListeners.clear();
  }
  settle(e, a) {
    this.active === e && (e.timer !== void 0 && clearTimeout(e.timer), this.active = void 0, e.resolve(a), this.notifyState("idle"));
  }
  notifyState(e) {
    for (const a of this.stateListeners)
      try {
        a(e);
      } catch {
      }
  }
}
const Nn = "b8eb5703ee945c40c29bdb6f6c9502224b9d6143", Dn = [
  "Glob",
  "Grep",
  "Read",
  "Write",
  "Edit",
  "Delete",
  "CreateLorebook",
  "GetAttribute",
  "SetAttribute"
];
function Ly() {
  if (!(typeof window > "u"))
    return window.SillyTavern;
}
function Ny(t) {
  try {
    return t?.isToolCallingSupported?.() === !0 && t.canPerformToolCalls?.("function") === !0;
  } catch {
    return !1;
  }
}
function Dy(t = {}, e = Ly()) {
  const a = Ny(e);
  return t.enabled !== !0 ? {
    availability: "disabled",
    enabled: !1,
    hostSupportsFunctionTools: a,
    extensionInstallation: "not-probed",
    researchCommit: Nn,
    tools: Dn,
    message: "Lorebook workbench is disabled. Albina is running with its normal TavernHelper/localStorage persistence path."
  } : e ? a ? {
    availability: "ready",
    enabled: !0,
    hostSupportsFunctionTools: !0,
    extensionInstallation: "not-probed",
    researchCommit: Nn,
    tools: Dn,
    message: "Function tools are supported. Install and authorize LorebookToolCall separately; Albina never imports or invokes it."
  } : {
    availability: "unsupported",
    enabled: !0,
    hostSupportsFunctionTools: !1,
    extensionInstallation: "not-probed",
    researchCommit: Nn,
    tools: Dn,
    message: "This SillyTavern host does not currently support function tools; the optional workbench is unavailable."
  } : {
    availability: "unavailable",
    enabled: !0,
    hostSupportsFunctionTools: !1,
    extensionInstallation: "not-probed",
    researchCommit: Nn,
    tools: Dn,
    message: "No SillyTavern function-tool host was found; the optional workbench is unavailable."
  };
}
class By {
  constructor(e) {
    this.bindings = e;
  }
  bindings;
  getChatId() {
    return this.bindings.getChatId();
  }
  async loadSave() {
    const e = await this.bindings.loadSave();
    if (e === void 0) return;
    const a = Hr(e);
    if (!a.ok) throw a.error;
    return a.save;
  }
  async loadPlayerProfile() {
    const e = await this.bindings.loadPlayerProfile();
    if (e !== void 0)
      return Br.parse(e);
  }
  saveSave(e) {
    return this.bindings.saveSave(e);
  }
  savePlayerProfile(e) {
    return this.bindings.savePlayerProfile(e);
  }
  saveWorldbookSelection(e) {
    const a = Hc.parse(e);
    return this.bindings.saveWorldbookSelection?.(a) ?? Promise.resolve();
  }
  subscribe(e, a) {
    return this.bindings.subscribe(e, a);
  }
}
class Hy {
  host;
  audio;
  portraits;
  gallery;
  storage;
  specialCg;
  typewriter = new Zy();
  lorebookToolCall;
  subscriptions = [];
  mounted = !1;
  onLifecycle;
  disposed = !1;
  constructor(e) {
    this.onLifecycle = e.onLifecycle, this.host = new By(e.host), this.audio = new Sy(e.audioFactory), this.storage = new Fy(e.storageBackend, e.objectUrls), this.portraits = new Ry(e.manifest, e.portraits, e.assetBaseUrl), this.gallery = new Cy(this.storage), this.specialCg = new Vy(this.storage), this.lorebookToolCall = Dy(e.lorebookToolCall);
  }
  mount() {
    if (this.disposed) throw new Error("AlbinaRuntime cannot be mounted after disposal.");
    if (this.mounted) return;
    const e = [];
    try {
      e.push(this.host.subscribe("chatChanged", () => this.handleLifecycle("chatChanged"))), e.push(this.host.subscribe("load", () => this.handleLifecycle("load"))), e.push(this.host.subscribe("unmount", (a) => {
        oh(a) || this.unmount();
      })), this.subscriptions = e, this.mounted = !0;
    } catch (a) {
      throw e.splice(0).forEach((i) => i()), a;
    }
  }
  handleLifecycle(e) {
    this.releaseTransientResources(), this.onLifecycle && Promise.resolve(this.onLifecycle(e)).catch((a) => {
      console.warn(`[albina-runtime] lifecycle handler failed for ${e}`, a);
    });
  }
  releaseTransientResources() {
    this.typewriter.cancel(), this.portraits.stopAll(), this.audio.stopAll(), this.storage.releaseObjectUrls();
  }
  unmount() {
    this.disposed || (this.disposed = !0, this.mounted = !1, this.releaseTransientResources(), this.subscriptions.splice(0).forEach((e) => e()), this.storage.dispose());
  }
}
function Jy(t) {
  return new Hy(t);
}
function Th(t) {
  return new Promise((e) => {
    try {
      t.toBlob((a) => e(a ?? void 0), "image/jpeg", 0.82);
    } catch {
      e(void 0);
    }
  });
}
async function Gy() {
  const t = document.createElement("canvas");
  t.width = 480, t.height = 270;
  const e = t.getContext("2d");
  if (!e) return new Blob(["thumbnail unavailable"], { type: "text/plain" });
  const a = e.createLinearGradient(0, 0, t.width, t.height);
  return a.addColorStop(0, "#050812"), a.addColorStop(1, "#3a2b13"), e.fillStyle = a, e.fillRect(0, 0, t.width, t.height), e.fillStyle = "#e2c46e", e.font = "28px serif", e.fillText("ALBINA", 28, 54), await Th(t) ?? new Blob(["thumbnail unavailable"], { type: "text/plain" });
}
async function eu(t = document) {
  const e = document.createElement("canvas");
  e.width = 480, e.height = 270;
  const a = e.getContext("2d");
  if (!a) return { blob: new Blob(["thumbnail unavailable"], { type: "text/plain" }), capturedMedia: !1 };
  const i = t.querySelector(".game-screen__video, .game-screen__cg, .game-screen__background");
  let o = !1;
  if (i)
    try {
      a.drawImage(i, 0, 0, e.width, e.height), o = !0;
    } catch {
      o = !1;
    }
  if (!o) {
    const r = a.createLinearGradient(0, 0, e.width, e.height);
    r.addColorStop(0, "#050812"), r.addColorStop(1, "#3a2b13"), a.fillStyle = r, a.fillRect(0, 0, e.width, e.height), a.fillStyle = "#e2c46e", a.font = "28px serif", a.fillText("ALBINA", 28, 54);
  }
  const n = await Th(e);
  return { blob: n ?? await Gy(), capturedMedia: !!(n && o) };
}
function Wy(t, e, a = (i) => Yc(e, i)) {
  const i = t.cgAssetId ?? t.backgroundAssetId, o = a(i), n = a(t.backgroundAssetId);
  return { ...n ? { backgroundUrl: n } : {}, ...o ? { fallbackUrl: o } : {} };
}
const Ci = G9(c8), Ko = A8(b8, Ci), ks = new Map(Ko.scenes.map((t) => [t.id, t])), Ky = new Set(Ko.gameplay.outfits.map((t) => t.portraitAssetId)), Yy = /* @__PURE__ */ new Set(["portrait.albina.normal", ...Ky]);
function Xy() {
  const t = globalThis.__ALBINA_LOCAL_ASSET_BASE__;
  return typeof t == "string" && /^\.\/(?:[a-z0-9._-]+\/)*$/iu.test(t) && typeof location < "u" ? new URL(t, location.href).href : new URL(
    /* @vite-ignore */
    "../",
    import.meta.url
  ).href;
}
const Qy = /* @__PURE__ */ n0("albina-game", () => {
  const t = Xy(), e = Qo(Jy({
    manifest: Ci,
    host: xy(),
    assetBaseUrl: t,
    onLifecycle: (h) => {
      if (h === "chatChanged" || h === "load") return Tt(h);
    }
  })), a = Qo(new vy(Ci, e.storage, t));
  e.portraits.setUrlResolver(async (h) => Ci.portraits.some((w) => w.id === h) ? a.cachePortrait(h) : a.cache(h));
  const i = /* @__PURE__ */ nb(new Gl(Ko)), o = /* @__PURE__ */ ne("title"), n = /* @__PURE__ */ ne(structuredClone(i.value.save.playerProfile)), r = /* @__PURE__ */ ne(""), s = /* @__PURE__ */ ne(0), c = /* @__PURE__ */ ne(1), d = /* @__PURE__ */ ne("idle");
  e.typewriter.subscribe((h) => {
    d.value = h;
  });
  const l = /* @__PURE__ */ ne(), u = /* @__PURE__ */ ne(!1), f = /* @__PURE__ */ ne(!1), b = /* @__PURE__ */ ne(!1), y = /* @__PURE__ */ ne([]), v = /* @__PURE__ */ ne({}), g = /* @__PURE__ */ ne([]), k = /* @__PURE__ */ ne(), I = /* @__PURE__ */ ne(!1), S = /* @__PURE__ */ ne("idle"), T = /* @__PURE__ */ ne(), x = /* @__PURE__ */ ne(), D = /* @__PURE__ */ ne(), V = /* @__PURE__ */ ne(!1), P = /* @__PURE__ */ new Set(), R = typeof matchMedia == "function" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0, j = /* @__PURE__ */ ne(R?.matches ?? !1);
  let Q, B, re, de = 0;
  const se = (h) => {
    j.value = h.matches, h.matches && wt(te.value.cgAssetId ?? te.value.backgroundAssetId);
  };
  R?.addEventListener("change", se);
  const te = ve(() => {
    const h = i.value.scene, w = i.value.outfitPortraitAssetId;
    return w ? {
      ...h,
      portraits: h.portraits.map((fe) => fe.characterId === "albina" && Yy.has(fe.portraitAssetId) ? { ...fe, portraitAssetId: w } : fe)
    } : h;
  }), Z = ve(() => eh(te.value)), K = ve(() => i.value.save), ue = ve(() => i.value.choices), Te = ve(() => i.value.effectiveValues), Se = ve(() => i.value.currentMinigame), Ae = ve(() => i.value.activeMinigame), Me = ve(() => Wy(te.value, Ci, ct));
  function ke(h, w) {
    const fe = w instanceof si;
    k.value = {
      code: fe ? w.code : "unexpected",
      message: `${h}: ${fe ? w.message : "The save operation could not be completed."}`,
      recoverable: !0
    };
  }
  function st(h) {
    if (!ks.has(h.sceneId))
      throw new si("unknown-scene", `The save references unavailable scene "${h.sceneId}".`);
    return h;
  }
  function $e(h) {
    i.value = new Gl(Ko, { save: st(h) }), n.value = structuredClone(h.playerProfile), k.value = void 0;
  }
  async function Tt(h) {
    const w = ++de;
    u.value = !0, l.value = void 0, x.value = void 0, D.value = void 0, V.value = !1, o.value = "title", Q = void 0, v.value = {};
    const fe = mn();
    try {
      const [be, We] = await Promise.all([
        e.host.loadSave().catch((Ja) => {
          if (Ja instanceof si && Ja.code === "invalid-json") throw Ja;
        }),
        e.host.loadPlayerProfile().catch(() => {
        })
      ]);
      if (w !== de) return;
      const Pa = be ?? fe;
      $e(We ? { ...Pa, playerProfile: We } : Pa), await ye();
    } catch (be) {
      if (w !== de) return;
      $e(fe), ke(`Unable to reload after ${h}`, be);
    } finally {
      w === de && (u.value = !1);
    }
  }
  function ct(h) {
    if (h)
      return v.value[h] ?? Yc(Ci, h, t);
  }
  async function wt(h) {
    if (!h) return;
    const w = await a.cache(h);
    w && (v.value = { ...v.value, [h]: w });
  }
  async function dt(h) {
    S.value = "loading", T.value = h.id;
    const w = [
      h.backgroundAssetId,
      h.cgAssetId,
      h.voiceAssetId,
      h.bgmAssetId,
      ...h.sfxAssetIds ?? []
    ].filter((be) => !!be), fe = await a.prefetch(w);
    fe.size && (v.value = { ...v.value, ...Object.fromEntries(fe) }), await Promise.all(h.portraits.map((be) => a.cachePortrait(be.portraitAssetId))), T.value === h.id && (S.value = "ready");
  }
  function Qt() {
    const h = te.value.choices.map((w) => ks.get(w.nextSceneId)).filter((w) => !!w);
    (async () => {
      for (const w of h) await dt(w);
    })();
  }
  async function _() {
    if (!f.value) {
      if (te.value.bgmAssetId && Q !== te.value.bgmAssetId) {
        Q = te.value.bgmAssetId;
        const h = ct(Q);
        h && (b.value = !await e.audio.playBgm(h));
      }
      for (const h of te.value.sfxAssetIds ?? []) {
        const w = ct(h);
        w && e.audio.playSfx(w);
      }
      if (te.value.voiceAssetId) {
        const h = ct(te.value.voiceAssetId);
        h && e.audio.enqueueVoice(h);
      }
    }
  }
  async function A() {
    await dt(te.value), r.value = "";
    const h = i.value.interpolate(te.value.text);
    s.value = h.length, c.value = h.length === 0 ? 1 : 0, e.typewriter.write(h, (w) => {
      r.value = w, c.value = h.length === 0 ? 1 : w.length / h.length;
    }, j.value ? 0 : 18), _(), te.value.cgAssetId && (await e.gallery.unlock(te.value.cgAssetId, K.value), B !== te.value.id && (B = te.value.id, await e.specialCg.enqueue({ id: te.value.id, assetId: te.value.cgAssetId })), y.value = await e.gallery.list(K.value)), Qt();
  }
  async function z() {
    k.value = void 0, e.mount(), o.value = "game", await A();
  }
  async function G(h) {
    const w = Qn(h), fe = { ...structuredClone(i.value.save), playerProfile: w };
    $e(fe), n.value = structuredClone(w);
    try {
      await e.host.savePlayerProfile(w);
    } catch (be) {
      if (!(be instanceof ji) || !be.fallbackStored) throw be;
    }
    try {
      await e.host.saveSave(fe);
    } catch (be) {
      if (!(be instanceof ji) || !be.fallbackStored) throw be;
    }
  }
  async function N(h) {
    await G(h), await z();
  }
  async function J() {
    try {
      const h = await e.host.loadPlayerProfile();
      h && (n.value = structuredClone(h));
    } catch (h) {
      ke("Unable to load player profile", h);
    }
  }
  async function ae() {
    let h;
    try {
      const w = await e.host.loadSave();
      if (w) return st(w);
    } catch (w) {
      h = w;
    }
    try {
      const w = await e.storage.loadSnapshot("quick-save");
      if (w) return st(w.save);
    } catch (w) {
      h ??= w;
    }
    if (h !== void 0) throw h;
  }
  async function C() {
    u.value = !0, k.value = void 0;
    try {
      const h = await ae();
      return h ? ($e(h), await z(), !0) : !1;
    } catch (h) {
      return ke("Unable to continue", h), !1;
    } finally {
      u.value = !1;
    }
  }
  async function O(h) {
    e.typewriter.completeNow(), D.value = void 0;
    const w = i.value.choose(h);
    xo(i), l.value = w.resultText ? i.value.interpolate(w.resultText) : void 0;
    const fe = w.choice.resultVoiceAssetId;
    await wt(fe);
    const be = ct(fe);
    !f.value && be && e.audio.enqueueVoice(be), l.value || await A();
  }
  async function m() {
    l.value = void 0, await A();
  }
  function ee() {
    D.value = void 0;
  }
  function ie(h) {
    if (V.value) return !1;
    V.value = !0, x.value = void 0;
    try {
      return D.value = i.value.resolveMinigame(h), xo(i), !0;
    } catch (w) {
      return x.value = Gr(w), !1;
    } finally {
      V.value = !1;
    }
  }
  async function H(h, w) {
    I.value = !0;
    try {
      const fe = (/* @__PURE__ */ new Date()).toISOString(), be = { ...structuredClone(K.value), saveId: h, updatedAt: fe }, We = re ?? (await eu()).blob;
      await e.storage.saveSnapshot(be, We), w && await e.host.saveSave(be), await ye(), k.value = void 0;
    } finally {
      I.value = !1;
    }
  }
  async function Y() {
    await H("quick-save", !0);
  }
  async function ce(h) {
    await H(`slot-${h}`, !1);
  }
  async function ye() {
    P.forEach((be) => URL.revokeObjectURL(be)), P.clear();
    const h = [];
    let w, fe;
    try {
      fe = await e.storage.keys("saves");
    } catch (be) {
      g.value = [], ke("Save slots could not be listed", be);
      return;
    }
    for (const be of fe) {
      let We;
      try {
        We = await e.storage.loadSnapshot(be);
      } catch (Sh) {
        w ??= Sh;
        continue;
      }
      if (!We) continue;
      const Pa = We.thumbnail.type.startsWith("image/") ? URL.createObjectURL(We.thumbnail) : void 0;
      Pa && P.add(Pa);
      const Ja = ks.get(We.save.sceneId);
      h.push({
        id: be,
        sceneId: We.save.sceneId,
        updatedAt: We.save.updatedAt,
        ...Pa ? { thumbnailUrl: Pa } : {},
        ...Ja ? { chapter: Ja.chapter, locationId: Ja.locationId, tone: Ja.tone } : {}
      });
    }
    g.value = h.sort((be, We) => We.updatedAt.localeCompare(be.updatedAt)), w !== void 0 ? ke("Some save slots could not be read", w) : k.value = void 0;
  }
  async function Re() {
    o.value === "game" && (re = (await eu()).blob), await ye(), o.value = "saves";
  }
  async function Le(h) {
    try {
      const w = await e.storage.loadSnapshot(h);
      return w ? ($e(w.save), o.value = "game", await A(), !0) : !1;
    } catch (w) {
      return ke(`Unable to load ${h}`, w), !1;
    }
  }
  async function Ge(h) {
    await e.storage.deleteValue("saves", h), await ye();
  }
  function Ot() {
    return F8(K.value);
  }
  async function vt(h) {
    const w = ed(h);
    if (!w.ok)
      return ke("Unable to import save", w.error), !1;
    try {
      return $e(w.save), o.value = "game", await A(), !0;
    } catch (fe) {
      return ke("Unable to import save", fe), !1;
    }
  }
  async function sa() {
    y.value = await e.gallery.list(K.value), await Promise.all(y.value.map(wt)), o.value = "gallery";
  }
  function Li() {
    o.value = "game";
  }
  async function pt() {
    b.value = !await e.audio.recoverAutoplay();
  }
  function Mt() {
    e.typewriter.completeNow();
  }
  function Ni() {
    f.value = !f.value, f.value ? (e.audio.stopAll(), Q = void 0) : _();
  }
  function _i(h) {
    return h instanceof Error ? /not owned|not unlocked/iu.test(h.message) ? "尚未获得或解锁该项目。" : /unavailable on route/iu.test(h.message) ? "当前路线不能使用该项目。" : /unknown/iu.test(h.message) ? "该项目不存在于当前版本。" : "玩法状态无法更新。" : "玩法状态无法更新。";
  }
  function Gr(h) {
    return h instanceof Error ? /already resolved/iu.test(h.message) ? "这场挑战已经结算过了。" : /no minigame is active/iu.test(h.message) ? "当前场景没有可进行的挑战。" : /skipping is unavailable/iu.test(h.message) ? "这场挑战不能跳过。" : /does not match/iu.test(h.message) ? "提交的答案与当前挑战类型不符。" : /unavailable on route/iu.test(h.message) ? "当前路线不能进行这场挑战。" : "这次介入没有生效，请再试一次。" : "这次介入没有生效，请再试一次。";
  }
  function Io(h) {
    x.value = void 0;
    try {
      return h(), xo(i), !0;
    } catch (w) {
      return x.value = _i(w), !1;
    }
  }
  function Cn(h) {
    return Io(() => i.value.equip(h));
  }
  function Wr(h) {
    return Io(() => i.value.wearOutfit(h));
  }
  function Pn(h) {
    return Io(() => i.value.selectProfession(h));
  }
  async function Rn(h) {
    const w = structuredClone(K.value), fe = Jc(h), be = structuredClone(K.value);
    be.worldbook = { ...be.worldbook, ...fe }, be.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), i.value.replaceSave(be), xo(i);
    try {
      await e.host.saveSave(i.value.save), await e.host.saveWorldbookSelection(fe);
    } catch (We) {
      if (We instanceof ji && We.fallbackStored) return;
      i.value.replaceSave(w), xo(i), ke("Unable to persist worldbook preset", We);
    }
  }
  function q() {
    R?.removeEventListener("change", se), P.forEach((h) => URL.revokeObjectURL(h)), P.clear();
  }
  return {
    runtime: e,
    manifest: Ci,
    gameplay: Ko.gameplay,
    screen: o,
    visibleText: r,
    dialogueLength: s,
    dialogueProgress: c,
    typewriterState: d,
    resultText: l,
    loading: u,
    muted: f,
    reducedMotion: j,
    preloadState: S,
    preloadSceneId: T,
    currentMinigame: Se,
    activeMinigame: Ae,
    minigameResolution: D,
    minigameBusy: V,
    profileDraft: n,
    prepareProfile: J,
    beginWithProfile: N,
    autoplayBlocked: b,
    galleryIds: y,
    saveSlots: g,
    saveError: k,
    saving: I,
    scene: te,
    save: K,
    effectiveValues: Te,
    choices: ue,
    media: Me,
    assetUrl: ct,
    start: z,
    continueGame: C,
    choose: O,
    dismissResult: m,
    resolveMinigame: ie,
    clearMinigameResolution: ee,
    quickSave: Y,
    saveSlot: ce,
    openSaves: Re,
    restoreSlot: Le,
    deleteSlot: Ge,
    exportSave: Ot,
    importSave: vt,
    openGallery: sa,
    backToGame: Li,
    recoverAutoplay: pt,
    completeText: Mt,
    toggleMute: Ni,
    equip: Cn,
    wearOutfit: Wr,
    presentation: Z,
    selectProfession: Pn,
    gameplayError: x,
    disposeUiListeners: q,
    selectWorldbookPreset: Rn
  };
}), e7 = ["data-screen", "data-requested-screen", "data-motion-ready"], t7 = {
  key: 0,
  class: "save-error",
  role: "alert",
  "data-testid": "save-error"
}, a7 = {
  key: 1,
  class: "title-screen",
  "data-testid": "title-screen",
  "data-motion-screen": ""
}, i7 = { class: "title-screen__content" }, o7 = {
  class: "title-actions",
  "aria-label": "主菜单"
}, n7 = ["disabled"], r7 = ["data-build-version"], s7 = {
  key: 2,
  class: "profile-screen",
  "data-testid": "profile-screen",
  "data-motion-screen": ""
}, c7 = { class: "profile-screen__header" }, d7 = { class: "profile-form__actions" }, l7 = ["disabled"], u7 = {
  key: 3,
  class: "panel-screen",
  "data-testid": "saves-screen",
  "data-motion-screen": ""
}, f7 = { class: "slot-actions" }, p7 = { class: "save-slot-grid" }, h7 = ["data-save-id", "data-slot-active", "data-slot-has-thumbnail", "data-slot-scene"], b7 = { class: "save-slot__thumbnail" }, m7 = ["src"], v7 = {
  key: 1,
  class: "save-slot__thumbnail-empty",
  "aria-hidden": "true"
}, g7 = { class: "save-slot__meta" }, _7 = {
  key: 0,
  class: "save-slot__active-badge",
  "data-testid": "slot-active-badge"
}, y7 = ["data-slot-chapter"], w7 = ["data-slot-tone"], k7 = ["datetime"], I7 = ["onClick"], A7 = ["onClick", "data-confirming"], x7 = { key: 0 }, T7 = {
  key: 4,
  class: "panel-screen",
  "data-testid": "gallery-screen",
  "data-motion-screen": ""
}, S7 = {
  class: "panel-status",
  "aria-live": "polite"
}, C7 = ["data-gallery-failed-count"], P7 = {
  key: 0,
  class: "gallery-grid",
  "data-testid": "gallery-grid"
}, R7 = ["data-gallery-item", "data-gallery-state", "aria-busy"], V7 = ["aria-label", "onClick"], E7 = ["data-gallery-loading"], O7 = ["src", "alt", "onLoad", "onError"], M7 = ["data-gallery-failed"], $7 = ["disabled", "data-gallery-retrying", "onClick"], j7 = {
  key: 1,
  class: "panel-empty",
  "data-testid": "gallery-empty"
}, z7 = {
  class: "gallery-viewer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "CG 预览"
}, U7 = ["src", "alt"], F7 = ["data-gallery-preview-failed"], q7 = ["disabled", "data-gallery-retrying"], Z7 = ["data-gallery-index", "data-gallery-total"], L7 = { class: "gallery-viewer__counter" }, N7 = {
  key: 5,
  class: "panel-screen",
  "data-testid": "settings-screen",
  "data-motion-screen": ""
}, D7 = { class: "settings-group" }, B7 = { class: "settings-group" }, H7 = ["checked"], J7 = {
  key: 6,
  class: "panel-screen credits-screen",
  "data-testid": "credits-screen",
  "data-motion-screen": ""
}, G7 = { class: "credits-notice" }, W7 = {
  class: "credits-list",
  "aria-label": "包内配乐"
}, K7 = { "aria-label": "曲目版权链接" }, Y7 = ["href"], X7 = ["href"], Q7 = {
  class: "official-listening",
  "aria-labelledby": "official-soundtrack-title"
}, ew = { "aria-label": "官方 OST 外部试听" }, tw = ["href"], aw = ["href"], iw = ["data-scene-id"], ow = ["src"], nw = ["src"], rw = { class: "game-hud" }, sw = ["data-saving"], cw = ["data-preload-state"], dw = ["data-scene-label", "data-scene-tone"], lw = ["data-scene-tone"], uw = { key: 0 }, fw = ["data-hud-value-key", "data-hud-critical", "title"], pw = ["data-minigame-id", "data-minigame-outcome"], hw = ["data-result-outcome"], bw = {
  key: 4,
  "data-motion-modal": ""
}, mw = ["data-typing", "data-speaker", "data-scene-tone"], vw = ["data-narration"], gw = ["aria-valuenow", "data-dialogue-progress"], _w = {
  key: 2,
  class: "choice-list"
}, yw = {
  key: 0,
  class: "choice-list__wait",
  "data-testid": "choice-wait"
}, ww = ["data-choice-id", "onClick"], kw = ["data-ending-route", "data-ending-kind"], Iw = {
  key: 3,
  class: "dialogue-box__advance",
  "aria-hidden": "true",
  "data-testid": "dialogue-advance"
}, Aw = {
  class: "save-tools",
  "data-testid": "save-tools"
}, xw = { class: "save-tools__export" }, Tw = { class: "save-tools__export-actions" }, Sw = ["disabled", "data-copied"], Cw = { class: "save-tools__import" }, Pw = ["data-import-state"], Rw = {
  key: 0,
  class: "save-tools__import-error",
  role: "alert",
  "data-testid": "import-error"
}, Vw = {
  key: 1,
  class: "save-tools__import-ok",
  "data-testid": "import-ok",
  "aria-live": "polite"
}, Ew = ["disabled"], Ow = /* @__PURE__ */ _n({
  __name: "App",
  setup(t) {
    const e = Qy(), a = /* @__PURE__ */ ne(), i = /* @__PURE__ */ ne(), o = /* @__PURE__ */ ne(), n = /* @__PURE__ */ ne(), r = /* @__PURE__ */ ne();
    let s;
    const c = z9.parse(u0), d = /* @__PURE__ */ ne(""), l = /* @__PURE__ */ ne(""), u = /* @__PURE__ */ ne(), f = /* @__PURE__ */ ne(!1);
    let b;
    const y = /* @__PURE__ */ ne(!1);
    let v;
    const g = /* @__PURE__ */ ne(!1), k = /* @__PURE__ */ ne(!1), I = /* @__PURE__ */ ne(), S = /* @__PURE__ */ ne(), T = /* @__PURE__ */ ne(), x = /* @__PURE__ */ ne(), D = /* @__PURE__ */ ne(), V = /* @__PURE__ */ ne("title");
    let P, R = !1;
    const j = /* @__PURE__ */ ne(), Q = /* @__PURE__ */ ne(), B = /* @__PURE__ */ ne(), re = /* @__PURE__ */ ne(), de = /* @__PURE__ */ ne({ ...e.effectiveValues }), se = [
      { key: "affectionAlbina", label: "好感" },
      { key: "trust", label: "信任" },
      { key: "danger", label: "危险" },
      { key: "artResonance", label: "共鸣" }
    ], te = /* @__PURE__ */ ne(), Z = /* @__PURE__ */ ne("auto"), K = /* @__PURE__ */ ne({ ...e.profileDraft }), ue = /* @__PURE__ */ ne(), Te = ve(() => e.galleryIds.map((q) => ({ id: q, url: e.assetUrl(q) })).filter((q) => typeof q.url == "string" && q.url.length > 0)), Se = /* @__PURE__ */ ne(/* @__PURE__ */ new Set()), Ae = /* @__PURE__ */ ne(/* @__PURE__ */ new Set()), Me = /* @__PURE__ */ ne(/* @__PURE__ */ new Set()), ke = /* @__PURE__ */ ne({});
    function st(q, h) {
      const w = ke.value[q];
      return w ? `${h}${h.includes("?") ? "&" : "?"}retry=${w}` : h;
    }
    function $e(q) {
      return Se.value.has(q) ? "failed" : Ae.value.has(q) ? "loaded" : "loading";
    }
    function Tt(q) {
      const h = new Set(Me.value);
      if (h.delete(q), Me.value = h, !Se.value.has(q) && (Se.value = new Set(Se.value).add(q), Ae.value.has(q))) {
        const w = new Set(Ae.value);
        w.delete(q), Ae.value = w;
      }
    }
    function ct(q) {
      if (Me.value.has(q)) return;
      Me.value = new Set(Me.value).add(q);
      const h = new Set(Se.value);
      h.delete(q), Se.value = h;
      const w = new Set(Ae.value);
      w.delete(q), Ae.value = w, ke.value = { ...ke.value, [q]: (ke.value[q] ?? 0) + 1 };
    }
    const wt = ve(() => Te.value.filter((q) => Se.value.has(q.id)).map((q) => q.id));
    function dt() {
      for (const q of wt.value) ct(q);
    }
    function Qt(q) {
      const h = new Set(Me.value);
      h.delete(q), Me.value = h, !(Se.value.has(q) || Ae.value.has(q)) && (Ae.value = new Set(Ae.value).add(q));
    }
    function _() {
      l.value = e.exportSave();
    }
    async function A() {
      const q = l.value;
      if (q)
        try {
          if (navigator.clipboard?.writeText)
            await navigator.clipboard.writeText(q);
          else {
            const h = u.value;
            h && (h.select(), document.execCommand("copy"), h.setSelectionRange(0, 0));
          }
          f.value = !0, window.clearTimeout(b), b = setTimeout(() => {
            f.value = !1;
          }, 2e3);
        } catch {
        }
    }
    async function z() {
      const q = d.value.trim();
      q && await e.importSave(q) && (d.value = "", y.value = !0, window.clearTimeout(v), v = setTimeout(() => {
        y.value = !1;
      }, 2e3));
    }
    const G = ve(() => {
      const q = d.value.trim();
      if (!q) return { state: "empty", error: void 0 };
      try {
        return JSON.parse(q), { state: "valid", error: void 0 };
      } catch (h) {
        return { state: "invalid", error: h instanceof Error ? h.message : "JSON 格式错误" };
      }
    }), N = ve(() => G.value.state), J = ve(() => G.value.error);
    async function ae() {
      e.screen = "profile", await e.prepareProfile(), K.value = { ...e.profileDraft };
    }
    async function C() {
      await e.beginWithProfile({ ...K.value });
    }
    function O(q, h) {
      r.value = h instanceof HTMLButtonElement ? h : void 0, ue.value = q;
    }
    function m(q) {
      te.value?.emitCue(q);
    }
    function ee(q) {
      return `${q > 0 ? "+" : ""}${q}`;
    }
    function ie(q) {
      return q.locationId !== void 0 ? `${Dl(q.chapter)} · ${Ll(q.locationId)}` : q.sceneId;
    }
    const H = ve(() => e.scene.tone ? Nl(e.scene.tone) : void 0), Y = /* @__PURE__ */ ne(null);
    let ce;
    function ye() {
      ce !== void 0 && (clearTimeout(ce), ce = void 0);
    }
    function Re(q) {
      if (Y.value === q) {
        ye(), Y.value = null, e.deleteSlot(q);
        return;
      }
      Y.value = q, ye(), ce = setTimeout(() => {
        Y.value = null;
      }, 3e3);
    }
    function Le() {
      ue.value = void 0, Ne(() => r.value?.focus());
    }
    function Ge() {
      const q = o.value;
      q && s && !e.reducedMotion ? s.dismissModal(q, Le) : Le();
    }
    function Ot(q) {
      if (q.key === "Escape") {
        q.preventDefault(), Ge();
        return;
      }
      if (q.key === "ArrowRight" || q.key === "ArrowLeft") {
        q.preventDefault(), sa(q.key === "ArrowRight" ? 1 : -1);
        return;
      }
      if (q.key === "Tab") {
        q.preventDefault();
        const h = [...o.value?.querySelectorAll("button:not([disabled])") ?? []];
        if (h.length === 0) return;
        const w = h.indexOf(document.activeElement), fe = q.shiftKey ? -1 : 1, be = w === -1 ? 0 : (w + fe + h.length) % h.length;
        h[be]?.focus();
      }
    }
    const vt = ve(() => ue.value === void 0 ? -1 : Te.value.findIndex((q) => q.id === ue.value));
    function sa(q) {
      const h = Te.value;
      if (h.length < 2 || vt.value === -1) return;
      const w = h[(vt.value + q + h.length) % h.length];
      w && (ue.value = w.id);
    }
    function Li() {
      const q = a.value?.querySelector("[data-motion-modal]"), h = () => {
        g.value = !1, Ne(() => D.value?.focus());
      };
      q && s && !e.reducedMotion ? s.dismissModal(q, h) : h();
    }
    function pt() {
      const q = I.value, h = () => {
        k.value = !1, Ne(() => S.value?.focus());
      };
      q && s && !e.reducedMotion ? s.dismissModal(q, h) : h();
    }
    function Mt() {
      e.activeMinigame && (T.value = void 0, e.clearMinigameResolution(), k.value = !0, Ne(() => {
        I.value && s?.reveal("modal", I.value);
      }));
    }
    function Ni() {
      const q = re.value, h = () => {
        T.value = void 0, e.clearMinigameResolution();
      };
      q && s && !e.reducedMotion ? s.dismissMinigameResult(q, h) : h();
    }
    function _i(q) {
      return { perfect: "完美介入", assisted: "辅助完成", setback: "介入受挫", skipped: "已跳过" }[q];
    }
    function Gr(q) {
      if (!e.resolveMinigame(q) || !e.minigameResolution) return;
      const h = e.minigameResolution;
      T.value = { ...h }, m({ kind: h.outcome === "perfect" ? "cg-reveal" : h.outcome === "setback" ? "impact" : "choice-confirm" }), pt();
    }
    async function Io(q, h) {
      const w = h?.currentTarget instanceof HTMLButtonElement ? h.currentTarget : void 0;
      w && s?.pulseChoice(w), m({ kind: "choice-confirm" }), await e.choose(q);
    }
    function Cn() {
      if (e.typewriterState !== "typing") return;
      e.completeText(), m({ kind: "dialogue-emphasis", intensity: 0.28, durationMs: 220 });
      const q = a.value?.querySelector(".dialogue-box");
      q && s?.pulseDialogue(q);
    }
    function Wr(q) {
      const h = q.target;
      if (!(h instanceof Element)) return;
      const w = h.closest("button:not([disabled])");
      w && !w.closest(".choice-list") && s?.pulseHud(w);
    }
    function Pn(q) {
      return q === "title" ? "title" : q === "profile" ? "profile" : q === "game" ? "game" : "panel";
    }
    async function Rn(q) {
      if (R) {
        P = q;
        return;
      }
      if (q === V.value) return;
      R = !0;
      const h = a.value?.querySelector("[data-motion-screen]"), w = async () => {
        V.value = q, await Ne();
        const be = a.value?.querySelector("[data-motion-screen]");
        be ? s?.enterScreen(Pn(q), be, fe) : fe();
      }, fe = () => {
        R = !1;
        const be = P;
        P = void 0, be && be !== V.value && Rn(be);
      };
      h && s ? s.leaveScreen(h, () => {
        w();
      }) : await w();
    }
    return ut(() => e.screen, (q) => {
      Rn(q);
    }, { flush: "post" }), ut(() => e.saving, async (q) => {
      await Ne(), j.value && s?.pulseStatus(j.value, q ? "cool" : "golden");
    }), ut(() => e.effectiveValues, async (q) => {
      const h = de.value;
      if (de.value = { ...q }, Object.keys(q).every((fe) => q[fe] === h[fe])) return;
      await Ne();
      const w = q.danger > h.danger;
      Q.value && s?.pulseStatus(Q.value, w ? "danger" : "golden");
      for (const fe of se) {
        const be = fe.key, We = Q.value?.querySelector(`[data-hud-value-key="${be}"]`);
        if (!We || q[be] === h[be]) continue;
        We.dataset.hudChanged = "true", s?.pulseHudValue(We, be === "danger" && q.danger > h.danger ? "danger" : "golden");
        const Pa = () => {
          We.dataset.hudChanged = "false";
        };
        window.setTimeout(Pa, 420);
      }
    }, { deep: !0 }), ut(() => e.resultText, async (q) => {
      q && (await Ne(), B.value && s?.revealResult(B.value));
    }), ut(() => e.scene.id, () => {
      k.value = !1, T.value = void 0, e.clearMinigameResolution(), Ne(() => {
        a.value && s?.transitionScene(a.value);
        const q = a.value?.querySelector(".dialogue-box");
        q && s?.revealDialogue(q);
        const h = a.value?.querySelector('[data-testid="scene-label"]');
        h && s?.revealSceneLabel(h), i.value && !e.reducedMotion && s?.wipeScene(i.value), e.scene.cgAssetId && m({ kind: "cg-reveal" }), e.scene.ending && m({ kind: "ending" });
      });
    }), ut(() => e.scene.speaker, async () => {
      await Ne();
      const q = a.value?.querySelector(".dialogue-box");
      q && s?.switchSpeaker(q);
    }, { flush: "post" }), ut(() => T.value, async (q) => {
      if (!q) return;
      await Ne();
      const h = a.value?.querySelector(".minigame-result");
      x.value?.focus(), h && s?.revealMinigameResult(h, q.outcome);
    }), ut(() => g.value, async () => {
      await Ne();
    }), ut(() => ue.value, async (q, h) => {
      await Ne(), q && h === void 0 && o.value && (s?.reveal("modal", o.value), n.value?.focus());
    }), yn(() => {
      s = t8(ve(() => e.reducedMotion)), Ne(() => {
        const q = a.value?.querySelector("[data-motion-screen]");
        q && s?.reveal(Pn(V.value), q);
      });
    }), wo(() => {
      ye(), clearTimeout(b), clearTimeout(v), s?.dispose(), e.disposeUiListeners(), e.runtime.unmount();
    }), (q, h) => (U(), F("main", {
      ref_key: "appRoot",
      ref: a,
      class: "albina-app",
      "data-albina-application": "",
      "data-screen": V.value,
      "data-requested-screen": M(e).screen,
      "data-motion-ready": M(s) ? "true" : "false",
      onClickCapture: Wr
    }, [
      M(e).saveError ? (U(), F("p", t7, $(M(e).saveError.message), 1)) : ge("", !0),
      V.value === "title" ? (U(), F("section", a7, [
        h[45] || (h[45] = p("div", { class: "title-screen__veil" }, null, -1)),
        p("div", i7, [
          h[42] || (h[42] = p("p", { class: "eyebrow" }, "Canto IX · 独立前端卡", -1)),
          h[43] || (h[43] = p("h1", null, "ALBINA", -1)),
          h[44] || (h[44] = p("p", { class: "subtitle" }, "白色画布上的残响", -1)),
          p("nav", o7, [
            p("button", {
              "data-testid": "new-game",
              onClick: ae
            }, "开始新篇"),
            p("button", {
              "data-testid": "continue-game",
              disabled: M(e).loading,
              onClick: h[0] || (h[0] = //@ts-ignore
              (...w) => M(e).continueGame && M(e).continueGame(...w))
            }, "继续", 8, n7),
            p("button", {
              "data-testid": "title-saves",
              onClick: h[1] || (h[1] = //@ts-ignore
              (...w) => M(e).openSaves && M(e).openSaves(...w))
            }, "存档"),
            p("button", {
              onClick: h[2] || (h[2] = //@ts-ignore
              (...w) => M(e).openGallery && M(e).openGallery(...w))
            }, "CG 图鉴"),
            p("button", {
              "data-testid": "title-settings",
              onClick: h[3] || (h[3] = (w) => M(e).screen = "settings")
            }, "设置"),
            p("button", {
              "data-testid": "title-credits",
              onClick: h[4] || (h[4] = (w) => M(e).screen = "credits")
            }, "版权与鸣谢")
          ]),
          p("p", {
            class: "build-state",
            "data-testid": "build-state",
            "data-build-version": M(Zl)
          }, "v" + $(M(Zl)) + " · 确定性主剧情 · 运行时零媒体 API", 9, r7)
        ])
      ])) : V.value === "profile" ? (U(), F("section", s7, [
        p("header", c7, [
          p("button", {
            "data-testid": "profile-back",
            onClick: h[5] || (h[5] = (w) => M(e).screen = "title")
          }, "返回"),
          h[46] || (h[46] = p("div", null, [
            p("p", { class: "eyebrow" }, "PLAYER PROFILE"),
            p("h2", null, "开始新篇")
          ], -1)),
          h[47] || (h[47] = p("span", { class: "profile-screen__fixed" }, "Fixed protagonist portrait", -1))
        ]),
        p("form", {
          class: "profile-form",
          onSubmit: Xa(C, ["prevent"])
        }, [
          h[58] || (h[58] = p("p", { class: "profile-form__notice" }, "The adult male protagonist keeps a fixed visual design. These fields guide narrative and the chat-scoped profile record.", -1)),
          p("label", null, [
            h[48] || (h[48] = p("span", null, "姓名", -1)),
            at(p("input", {
              "onUpdate:modelValue": h[6] || (h[6] = (w) => K.value.name = w),
              "data-testid": "profile-name",
              maxlength: "80",
              required: ""
            }, null, 512), [
              [pa, K.value.name]
            ])
          ]),
          p("label", null, [
            h[49] || (h[49] = p("span", null, "称呼", -1)),
            at(p("input", {
              "onUpdate:modelValue": h[7] || (h[7] = (w) => K.value.addressName = w),
              "data-testid": "profile-address",
              maxlength: "80",
              required: ""
            }, null, 512), [
              [pa, K.value.addressName]
            ])
          ]),
          p("label", null, [
            h[50] || (h[50] = p("span", null, "性别表达", -1)),
            at(p("input", {
              "onUpdate:modelValue": h[8] || (h[8] = (w) => K.value.gender = w),
              maxlength: "80",
              required: ""
            }, null, 512), [
              [pa, K.value.gender]
            ])
          ]),
          p("label", null, [
            h[51] || (h[51] = p("span", null, "外观描述", -1)),
            at(p("textarea", {
              "onUpdate:modelValue": h[9] || (h[9] = (w) => K.value.appearance = w),
              maxlength: "800",
              rows: "3"
            }, null, 512), [
              [pa, K.value.appearance]
            ])
          ]),
          p("label", null, [
            h[52] || (h[52] = p("span", null, "背景", -1)),
            at(p("textarea", {
              "onUpdate:modelValue": h[10] || (h[10] = (w) => K.value.background = w),
              maxlength: "800",
              rows: "3"
            }, null, 512), [
              [pa, K.value.background]
            ])
          ]),
          p("label", null, [
            h[53] || (h[53] = p("span", null, "职业或能力倾向", -1)),
            at(p("textarea", {
              "onUpdate:modelValue": h[11] || (h[11] = (w) => K.value.ability = w),
              maxlength: "400",
              rows: "2"
            }, null, 512), [
              [pa, K.value.ability]
            ])
          ]),
          p("label", null, [
            h[54] || (h[54] = p("span", null, "与阿尔比娜的初始关系倾向", -1)),
            at(p("textarea", {
              "onUpdate:modelValue": h[12] || (h[12] = (w) => K.value.initialRelationship = w),
              "data-testid": "profile-relationship",
              maxlength: "400",
              rows: "2"
            }, null, 512), [
              [pa, K.value.initialRelationship]
            ])
          ]),
          p("label", null, [
            h[55] || (h[55] = p("span", null, "内容边界", -1)),
            at(p("textarea", {
              "onUpdate:modelValue": h[13] || (h[13] = (w) => K.value.boundaries = w),
              maxlength: "800",
              rows: "3"
            }, null, 512), [
              [pa, K.value.boundaries]
            ])
          ]),
          p("label", null, [
            h[57] || (h[57] = p("span", null, "路线偏好", -1)),
            at(p("select", {
              "onUpdate:modelValue": h[14] || (h[14] = (w) => K.value.routePreference = w),
              "data-testid": "profile-route"
            }, [...h[56] || (h[56] = [
              p("option", { value: "white_canvas" }, "White Canvas", -1),
              p("option", { value: "golden_bough_rebuild" }, "Golden Bough Rebuild", -1),
              p("option", { value: "ring_conspiracy" }, "Ring Conspiracy", -1)
            ])], 512), [
              [Ed, K.value.routePreference]
            ])
          ]),
          p("footer", d7, [
            p("button", {
              type: "button",
              onClick: h[15] || (h[15] = (w) => M(e).screen = "title")
            }, "取消"),
            p("button", {
              type: "submit",
              "data-testid": "profile-begin",
              disabled: M(e).preloadState === "loading"
            }, $(M(e).preloadState === "loading" ? "准备媒体…" : "确认档案并开始"), 9, l7)
          ])
        ], 32)
      ])) : V.value === "saves" ? (U(), F("section", u7, [
        p("header", null, [
          p("button", {
            onClick: h[16] || (h[16] = (w) => M(e).screen = "title")
          }, "返回"),
          h[59] || (h[59] = p("h2", null, "存档管理", -1))
        ]),
        p("div", f7, [
          p("button", {
            "data-testid": "save-slot-1",
            onClick: h[17] || (h[17] = (w) => M(e).saveSlot(1))
          }, "保存到槽位 1"),
          p("button", {
            onClick: h[18] || (h[18] = (w) => M(e).saveSlot(2))
          }, "保存到槽位 2"),
          p("button", {
            onClick: h[19] || (h[19] = (w) => M(e).saveSlot(3))
          }, "保存到槽位 3")
        ]),
        p("div", p7, [
          (U(!0), F(me, null, Ee(M(e).saveSlots, (w) => (U(), F("article", {
            key: w.id,
            class: we(["save-slot", { "is-active": w.id === M(e).save.saveId }]),
            "data-save-id": w.id,
            "data-slot-active": w.id === M(e).save.saveId ? "true" : "false",
            "data-slot-has-thumbnail": w.thumbnailUrl ? "true" : "false",
            "data-slot-scene": w.sceneId
          }, [
            p("div", b7, [
              w.thumbnailUrl ? (U(), F("img", {
                key: 0,
                src: w.thumbnailUrl,
                alt: "存档缩略图"
              }, null, 8, m7)) : (U(), F("span", v7, "·"))
            ]),
            p("div", g7, [
              p("strong", null, $(w.id), 1),
              w.id === M(e).save.saveId ? (U(), F("span", _7, "当前")) : ge("", !0),
              p("p", {
                class: "save-slot__scene",
                "data-slot-chapter": w.chapter ?? null
              }, $(ie(w)), 9, y7),
              w.tone ? (U(), F("span", {
                key: 1,
                class: "save-slot__tone",
                "data-slot-tone": w.tone
              }, $(M(Nl)(w.tone)), 9, w7)) : ge("", !0),
              p("time", {
                datetime: w.updatedAt
              }, $(M(Q9)(w.updatedAt)), 9, k7)
            ]),
            p("button", {
              onClick: (fe) => M(e).restoreSlot(w.id)
            }, "读取", 8, I7),
            p("button", {
              onClick: (fe) => Re(w.id),
              class: we({ "is-confirming": Y.value === w.id }),
              "data-confirming": Y.value === w.id ? "true" : "false"
            }, $(Y.value === w.id ? "确认删除?" : "删除"), 11, A7)
          ], 10, h7))), 128)),
          M(e).saveSlots.length === 0 ? (U(), F("p", x7, "暂无普通存档。")) : ge("", !0)
        ])
      ])) : V.value === "gallery" ? (U(), F("section", T7, [
        p("header", null, [
          p("button", {
            onClick: h[20] || (h[20] = //@ts-ignore
            (...w) => M(e).backToGame && M(e).backToGame(...w))
          }, "返回"),
          h[60] || (h[60] = p("h2", null, "CG 图鉴", -1)),
          p("span", S7, $(Te.value.length) + " unlocked", 1),
          wt.value.length ? (U(), F("button", {
            key: 0,
            type: "button",
            class: "gallery-retry-all",
            "data-testid": "gallery-retry-all",
            "data-gallery-failed-count": wt.value.length,
            onClick: dt
          }, "重试全部失败封面（" + $(wt.value.length) + "）", 9, C7)) : ge("", !0)
        ]),
        Te.value.length ? (U(), F("div", P7, [
          (U(!0), F(me, null, Ee(Te.value, (w) => (U(), F("article", {
            key: w.id,
            class: "gallery-item",
            "data-gallery-item": w.id,
            "data-gallery-state": $e(w.id),
            "aria-busy": $e(w.id) === "loading" ? "true" : "false"
          }, [
            p("button", {
              class: "gallery-item__open",
              type: "button",
              "aria-label": `查看 ${w.id}`,
              onClick: (fe) => O(w.id, fe.currentTarget)
            }, [
              $e(w.id) === "loading" ? (U(), F("span", {
                key: 0,
                class: "gallery-item__skeleton",
                "aria-hidden": "true",
                "data-gallery-loading": w.id
              }, null, 8, E7)) : ge("", !0),
              $e(w.id) !== "failed" ? (U(), F("img", {
                key: 1,
                src: st(w.id, w.url),
                alt: w.id,
                crossorigin: "anonymous",
                class: we({ "is-loaded": $e(w.id) === "loaded" }),
                onLoad: (fe) => Qt(w.id),
                onError: (fe) => Tt(w.id)
              }, null, 42, O7)) : (U(), F("span", {
                key: 2,
                class: "gallery-item__placeholder",
                "data-gallery-failed": w.id
              }, "封面缺失", 8, M7)),
              p("span", null, $(w.id), 1)
            ], 8, V7),
            $e(w.id) === "failed" ? (U(), F("button", {
              key: 0,
              type: "button",
              class: "gallery-item__retry",
              disabled: Me.value.has(w.id),
              "data-gallery-retrying": Me.value.has(w.id) ? "true" : "false",
              onClick: (fe) => ct(w.id)
            }, $(Me.value.has(w.id) ? "加载中" : "重试加载"), 9, $7)) : ge("", !0)
          ], 8, R7))), 128))
        ])) : (U(), F("p", j7, "尚未解锁 CG。")),
        ue.value ? (U(), F("div", {
          key: 2,
          ref_key: "galleryViewerRoot",
          ref: o,
          class: "gallery-viewer-backdrop",
          "data-testid": "gallery-viewer",
          "data-motion-modal": "",
          onClick: Xa(Ge, ["self"]),
          onKeydown: Ot
        }, [
          p("figure", z7, [
            p("button", {
              ref_key: "galleryViewerCloseButton",
              ref: n,
              type: "button",
              "aria-label": "关闭 CG 预览",
              onClick: Ge
            }, "关闭", 512),
            Se.value.has(ue.value) ? (U(), F("span", {
              key: 1,
              class: "gallery-viewer__placeholder",
              role: "status",
              "aria-live": "polite",
              "data-gallery-preview-failed": ue.value
            }, [
              h[61] || (h[61] = ta("预览图不可用", -1)),
              p("button", {
                type: "button",
                disabled: Me.value.has(ue.value),
                "data-gallery-retrying": Me.value.has(ue.value) ? "true" : "false",
                onClick: h[23] || (h[23] = (w) => ct(ue.value))
              }, $(Me.value.has(ue.value) ? "加载中" : "重试加载"), 9, q7)
            ], 8, F7)) : (U(), F("img", {
              key: 0,
              src: st(ue.value, M(e).assetUrl(ue.value) ?? ""),
              alt: ue.value,
              crossorigin: "anonymous",
              onLoad: h[21] || (h[21] = (w) => Qt(ue.value)),
              onError: h[22] || (h[22] = (w) => Tt(ue.value))
            }, null, 40, U7)),
            p("figcaption", null, [
              p("span", null, $(ue.value), 1),
              Te.value.length > 1 ? (U(), F("nav", {
                key: 0,
                class: "gallery-viewer__nav",
                "data-gallery-index": vt.value + 1,
                "data-gallery-total": Te.value.length
              }, [
                p("button", {
                  type: "button",
                  "aria-label": "上一张 CG",
                  onClick: h[24] || (h[24] = (w) => sa(-1))
                }, "‹"),
                p("span", L7, $(vt.value + 1) + " / " + $(Te.value.length), 1),
                p("button", {
                  type: "button",
                  "aria-label": "下一张 CG",
                  onClick: h[25] || (h[25] = (w) => sa(1))
                }, "›")
              ], 8, Z7)) : ge("", !0)
            ])
          ])
        ], 544)) : ge("", !0)
      ])) : V.value === "settings" ? (U(), F("section", N7, [
        p("header", null, [
          p("button", {
            onClick: h[26] || (h[26] = (w) => M(e).screen = "title")
          }, "返回"),
          h[62] || (h[62] = p("h2", null, "演出设置", -1))
        ]),
        p("fieldset", D7, [
          h[66] || (h[66] = p("legend", null, "演出", -1)),
          p("label", null, [
            at(p("input", {
              "onUpdate:modelValue": h[27] || (h[27] = (w) => M(e).reducedMotion = w),
              type: "checkbox"
            }, null, 512), [
              [pf, M(e).reducedMotion]
            ]),
            h[63] || (h[63] = ta(" 减少动态效果", -1))
          ]),
          p("label", null, [
            h[65] || (h[65] = ta("VFX quality ", -1)),
            at(p("select", {
              "onUpdate:modelValue": h[28] || (h[28] = (w) => Z.value = w),
              "data-testid": "vfx-quality"
            }, [...h[64] || (h[64] = [
              Gn('<option value="auto">Auto (authored high)</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option><option value="static">Static</option>', 5)
            ])], 512), [
              [Ed, Z.value]
            ])
          ])
        ]),
        p("fieldset", B7, [
          h[68] || (h[68] = p("legend", null, "音频", -1)),
          p("label", null, [
            p("input", {
              checked: M(e).muted,
              type: "checkbox",
              onChange: h[29] || (h[29] = //@ts-ignore
              (...w) => M(e).toggleMute && M(e).toggleMute(...w))
            }, null, 40, H7),
            h[67] || (h[67] = ta(" 静音", -1))
          ]),
          p("button", {
            "data-testid": "autoplay-recovery",
            onClick: h[30] || (h[30] = //@ts-ignore
            (...w) => M(e).recoverAutoplay && M(e).recoverAutoplay(...w))
          }, "恢复音频播放")
        ]),
        p("button", {
          "data-testid": "settings-credits",
          onClick: h[31] || (h[31] = (w) => M(e).screen = "credits")
        }, "查看版权与鸣谢"),
        h[69] || (h[69] = p("p", { class: "asset-status" }, "运行时不请求媒体生成接口。包内配乐均已登记来源、文件校验值与再分发许可。", -1))
      ])) : V.value === "credits" ? (U(), F("section", J7, [
        p("header", null, [
          p("button", {
            onClick: h[32] || (h[32] = (w) => M(e).screen = "title")
          }, "返回"),
          h[70] || (h[70] = p("h2", null, "版权与鸣谢", -1))
        ]),
        p("p", G7, $(M(c).packagedNotice), 1),
        p("ol", W7, [
          (U(!0), F(me, null, Ee(M(c).tracks, (w) => (U(), F("li", {
            key: w.assetId
          }, [
            p("h3", null, $(w.title), 1),
            p("p", null, $(w.creator) + " · ISRC " + $(w.isrc) + " · cue: " + $(w.cueAlias), 1),
            p("p", null, $(w.attribution), 1),
            p("nav", K7, [
              p("a", {
                href: w.sourceUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "曲目来源", 8, Y7),
              p("a", {
                href: w.licenseUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "CC BY 4.0 许可", 8, X7)
            ])
          ]))), 128))
        ]),
        p("section", Q7, [
          h[71] || (h[71] = p("h3", { id: "official-soundtrack-title" }, "ProjectMoon 官方 OST", -1)),
          p("p", null, [
            p("strong", null, $(M(c).officialSoundtrack.playlistTitle), 1),
            ta(" · " + $(M(c).officialSoundtrack.channel) + " · " + $(M(c).officialSoundtrack.playlistTrackCount) + " 首", 1)
          ]),
          p("p", null, $(M(c).officialSoundtrack.notice), 1),
          p("p", null, $(M(c).officialSoundtrack.rightsNotice), 1),
          p("nav", ew, [
            (U(!0), F(me, null, Ee(M(c).officialSoundtrack.links, (w) => (U(), F("a", {
              key: w.url,
              href: w.url,
              target: "_blank",
              rel: "noopener noreferrer"
            }, $(w.label), 9, tw))), 128)),
            p("a", {
              href: M(c).officialSoundtrack.termsUrl,
              target: "_blank",
              rel: "noopener noreferrer"
            }, "ProjectMoon 服务条款", 8, aw)
          ])
        ])
      ])) : V.value === "game" ? (U(), F("section", {
        key: 7,
        class: "game-screen",
        "data-testid": "game-screen",
        "data-scene-id": M(e).scene.id,
        "data-motion-screen": ""
      }, [
        p("div", {
          class: we(["game-screen__transition-veil", { "is-active": !M(e).reducedMotion }]),
          ref_key: "transitionVeil",
          ref: i,
          "aria-hidden": "true"
        }, null, 2),
        M(e).media.backgroundUrl ? (U(), F("img", {
          key: 0,
          class: "game-screen__background",
          src: M(e).media.backgroundUrl,
          alt: "",
          crossorigin: "anonymous"
        }, null, 8, ow)) : ge("", !0),
        M(e).media.fallbackUrl ? (U(), F("img", {
          key: 1,
          class: "game-screen__cg",
          src: M(e).media.fallbackUrl,
          alt: "剧情 CG",
          "data-testid": "static-fallback",
          crossorigin: "anonymous"
        }, null, 8, nw)) : ge("", !0),
        zt(a9, {
          ref_key: "sceneAtmosphere",
          ref: te,
          "reduced-motion": M(e).reducedMotion,
          route: M(e).save.route,
          "route-preference": M(e).save.playerProfile.routePreference,
          "scene-id": M(e).scene.id,
          chapter: M(e).scene.chapter,
          tone: M(e).scene.tone,
          quality: Z.value,
          presentation: M(e).presentation
        }, null, 8, ["reduced-motion", "route", "route-preference", "scene-id", "chapter", "tone", "quality", "presentation"]),
        zt(t4, {
          portraits: M(e).scene.portraits,
          service: M(e).runtime.portraits,
          "reduced-motion": M(e).reducedMotion,
          focus: M(e).presentation.focus,
          "visual-profile": M(e).presentation.visual.profile,
          speaker: M(e).scene.speaker
        }, null, 8, ["portraits", "service", "reduced-motion", "focus", "visual-profile", "speaker"]),
        p("header", rw, [
          p("span", {
            ref_key: "saveStatus",
            ref: j,
            class: "game-hud__save-status",
            "data-testid": "save-status",
            "data-saving": M(e).saving,
            "aria-live": "polite"
          }, $(M(e).saving ? "saving" : "saved"), 9, sw),
          p("span", {
            class: "preload-status",
            "data-testid": "preload-status",
            "data-preload-state": M(e).preloadState,
            "aria-live": "polite"
          }, $(M(e).preloadState === "loading" ? "preloading" : M(e).preloadState === "ready" ? "media ready" : "media idle"), 9, cw),
          p("span", {
            class: "game-hud__scene-label",
            "data-testid": "scene-label",
            "data-scene-label": M(e).scene.id,
            "data-scene-tone": M(e).scene.tone
          }, [
            ta($(M(Dl)(M(e).scene.chapter)) + " · " + $(M(Ll)(M(e).scene.locationId)), 1),
            H.value ? (U(), F("em", {
              key: 0,
              class: "game-hud__scene-tone",
              "data-scene-tone": M(e).scene.tone
            }, $(H.value), 9, lw)) : ge("", !0)
          ], 8, dw),
          p("span", {
            ref_key: "valueStatus",
            ref: Q,
            class: "game-hud__values",
            "aria-label": "剧情数值",
            "data-testid": "hud-values"
          }, [
            (U(), F(me, null, Ee(se, (w, fe) => (U(), F(me, {
              key: w.key
            }, [
              fe > 0 ? (U(), F("span", uw, " / ")) : ge("", !0),
              p("span", {
                class: "game-hud__value",
                "data-hud-value-key": w.key,
                "data-hud-changed": "false",
                "data-hud-critical": w.key === "danger" && M(e).effectiveValues.danger > 0 ? "true" : "false",
                title: `基础 ${M(e).save.values[w.key]} · 修正 ${ee(M(e).effectiveValues[w.key] - M(e).save.values[w.key])}`
              }, $(w.label) + " " + $(M(e).effectiveValues[w.key]), 9, fw)
            ], 64))), 64))
          ], 512),
          M(e).currentMinigame ? (U(), F("span", {
            key: 0,
            class: we(["game-hud__challenge", { "is-resolved": M(e).currentMinigame.record?.resolved }]),
            "data-minigame-id": M(e).currentMinigame.definition.id,
            "data-minigame-outcome": M(e).currentMinigame.record?.lastOutcome ?? "pending"
          }, $(M(e).currentMinigame.record?.resolved ? `挑战已结算 · ${_i(M(e).currentMinigame.record.lastOutcome)}` : "挑战待处理"), 11, pw)) : ge("", !0),
          p("nav", null, [
            p("button", {
              ref_key: "gameplayButton",
              ref: D,
              "data-testid": "gameplay-open",
              onClick: h[33] || (h[33] = (w) => g.value = !0)
            }, "状态", 512),
            M(e).activeMinigame ? (U(), F("button", {
              key: 0,
              ref_key: "minigameButton",
              ref: S,
              "data-testid": "minigame-open",
              onClick: Mt
            }, $(M(e).activeMinigame.definition.label), 513)) : ge("", !0),
            p("button", {
              onClick: h[34] || (h[34] = //@ts-ignore
              (...w) => M(e).quickSave && M(e).quickSave(...w))
            }, "快速存档"),
            p("button", {
              "data-testid": "game-saves",
              onClick: h[35] || (h[35] = //@ts-ignore
              (...w) => M(e).openSaves && M(e).openSaves(...w))
            }, "存档"),
            p("button", {
              onClick: h[36] || (h[36] = //@ts-ignore
              (...w) => M(e).openGallery && M(e).openGallery(...w))
            }, "图鉴"),
            p("button", {
              "data-testid": "game-settings",
              onClick: h[37] || (h[37] = (w) => M(e).screen = "settings")
            }, "设置"),
            p("button", {
              onClick: h[38] || (h[38] = //@ts-ignore
              (...w) => M(e).toggleMute && M(e).toggleMute(...w))
            }, $(M(e).muted ? "启音" : "静音"), 1)
          ])
        ]),
        k.value && M(e).activeMinigame ? (U(), F("div", {
          key: 2,
          ref_key: "minigameBackdrop",
          ref: I,
          class: "minigame-backdrop",
          "data-testid": "minigame-modal",
          "data-motion-modal": "",
          onClick: Xa(pt, ["self"])
        }, [
          zt(J3, {
            definition: M(e).activeMinigame.definition,
            challenge: M(e).activeMinigame.challenge,
            "reduced-motion": M(e).reducedMotion,
            busy: M(e).minigameBusy,
            onClose: pt,
            onResolve: Gr
          }, null, 8, ["definition", "challenge", "reduced-motion", "busy"])
        ], 512)) : ge("", !0),
        T.value ? (U(), F("section", {
          key: 3,
          ref_key: "resultRoot",
          ref: re,
          class: we(["minigame-result", `minigame-result--${T.value.outcome}`]),
          "data-result-outcome": T.value.outcome,
          role: "status",
          "aria-live": "polite",
          "data-testid": "minigame-result"
        }, [
          h[72] || (h[72] = p("p", null, "叙事挑战结算", -1)),
          p("h3", null, $(_i(T.value.outcome)), 1),
          p("p", null, $(T.value.outcome === "perfect" ? "你保住了此刻的主动权，完整奖励已写入角色成长记录。" : T.value.outcome === "assisted" ? "提示协助你完成了介入，低阶奖励已写入成长记录。" : T.value.outcome === "setback" ? "你的判断留下了代价；主线仍可继续，后果已写入存档。" : "你选择暂缓介入；主线继续，跳过记录已写入存档。"), 1),
          p("small", null, "评分 " + $(T.value.score) + " · " + $(T.value.assisted ? "已使用辅助" : "未使用辅助"), 1),
          p("button", {
            ref_key: "minigameResultButton",
            ref: x,
            type: "button",
            onClick: Ni
          }, "确认并继续", 512)
        ], 10, hw)) : ge("", !0),
        g.value ? (U(), F("div", bw, [
          zt(t3, {
            gameplay: M(e).gameplay,
            save: M(e).save,
            "effective-values": M(e).effectiveValues,
            "interaction-error": M(e).gameplayError,
            "reduced-motion": M(e).reducedMotion,
            onClose: Li,
            onEquip: M(e).equip,
            onWearOutfit: M(e).wearOutfit,
            onSelectProfession: M(e).selectProfession,
            onSelectWorldbookPreset: M(e).selectWorldbookPreset
          }, null, 8, ["gameplay", "save", "effective-values", "interaction-error", "reduced-motion", "onEquip", "onWearOutfit", "onSelectProfession", "onSelectWorldbookPreset"])
        ])) : ge("", !0),
        p("article", {
          class: "dialogue-box",
          "data-testid": "dialogue-box",
          "data-typing": M(e).typewriterState,
          "data-speaker": M(e).scene.speaker,
          "data-scene-tone": M(e).scene.tone,
          onClick: Cn
        }, [
          p("h2", {
            "data-narration": M(e).scene.speaker ? "false" : "true"
          }, $(M(e).scene.speaker || "旁白"), 9, vw),
          M(e).typewriterState === "typing" ? (U(), F("button", {
            key: 0,
            type: "button",
            class: "dialogue-box__skip",
            "data-testid": "dialogue-skip",
            onClick: Xa(Cn, ["stop"])
          }, "跳过打字")) : ge("", !0),
          p("div", {
            class: "dialogue-box__progress",
            role: "progressbar",
            "aria-label": "当前对话阅读进度",
            "aria-valuenow": Math.round(M(e).dialogueProgress * 100),
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "data-dialogue-progress": Math.round(M(e).dialogueProgress * 100)
          }, [
            p("span", {
              style: Ua({ transform: `scaleX(${M(e).dialogueProgress})` })
            }, null, 4)
          ], 8, gw),
          p("p", null, $(M(e).visibleText), 1),
          M(e).resultText ? (U(), F("div", {
            key: 1,
            ref_key: "resultOverlay",
            ref: B,
            class: "result-overlay",
            "data-testid": "choice-result",
            role: "status",
            "aria-live": "polite"
          }, [
            p("p", null, $(M(e).resultText), 1),
            p("button", {
              onClick: h[39] || (h[39] = Xa(
                //@ts-ignore
                (...w) => M(e).dismissResult && M(e).dismissResult(...w),
                ["stop"]
              ))
            }, "继续")
          ], 512)) : (U(), F("div", _w, [
            M(e).choices.length ? (U(), F("p", yw, "你的选择将决定走向")) : ge("", !0),
            (U(!0), F(me, null, Ee(M(e).choices, (w) => (U(), F("button", {
              key: w.id,
              "data-choice-id": w.id,
              onClick: Xa((fe) => Io(w.id, fe), ["stop"])
            }, $(w.text), 9, ww))), 128)),
            M(e).scene.ending ? (U(), F("p", {
              key: 1,
              class: "ending-mark",
              "data-ending-route": M(e).scene.ending.route,
              "data-ending-kind": M(e).scene.ending.kind
            }, $(M(e).scene.ending.route) + " · " + $(M(e).scene.ending.kind) + " END", 9, kw)) : ge("", !0)
          ])),
          !M(e).resultText && M(e).choices.length === 0 && M(e).typewriterState === "idle" ? (U(), F("span", Iw, "▼")) : ge("", !0)
        ], 8, mw),
        p("details", Aw, [
          h[73] || (h[73] = p("summary", null, "存档导入 / 导出", -1)),
          p("div", xw, [
            p("div", Tw, [
              p("button", { onClick: _ }, "导出当前存档"),
              p("button", {
                type: "button",
                class: "save-tools__copy",
                onClick: A,
                disabled: !l.value,
                "data-copied": f.value ? "true" : "false"
              }, $(f.value ? "已复制" : "复制"), 9, Sw)
            ]),
            at(p("textarea", {
              ref_key: "exportTextarea",
              ref: u,
              "onUpdate:modelValue": h[40] || (h[40] = (w) => l.value = w),
              readonly: "",
              "aria-label": "导出存档"
            }, null, 512), [
              [pa, l.value]
            ])
          ]),
          p("div", Cw, [
            at(p("textarea", {
              "onUpdate:modelValue": h[41] || (h[41] = (w) => d.value = w),
              "aria-label": "导入存档",
              placeholder: "粘贴 SaveV2 JSON",
              "data-import-state": N.value
            }, null, 8, Pw), [
              [pa, d.value]
            ]),
            J.value ? (U(), F("p", Rw, $(J.value), 1)) : ge("", !0),
            y.value ? (U(), F("p", Vw, "已导入")) : ge("", !0),
            p("button", {
              onClick: z,
              disabled: N.value !== "valid"
            }, "导入", 8, Ew)
          ])
        ])
      ], 8, iw)) : ge("", !0)
    ], 40, e7));
  }
});
function Mw(t) {
  const e = Km(Ow);
  return e.use(Qm()), e.mount(t), e;
}
function jw(t = window) {
  return xn(t).document;
}
function $w(t, e) {
  return e === t ? t : e;
}
function tu(t = {}) {
  if (typeof document > "u" || typeof window > "u") return;
  const e = xn(window), a = e.document;
  if (e.__ALBINA_INSTALLATION__) return e.__ALBINA_INSTALLATION__;
  let i = "loading", o = !1, n, r, s;
  const c = t.sourceUrl ?? import.meta.url, d = t.mount ?? Mw, l = a.createElement("button");
  l.type = "button", l.dataset.albinaLauncher = "v2", l.setAttribute("aria-live", "polite"), Object.assign(l.style, { position: "fixed", right: "18px", bottom: "18px", zIndex: "2147483646" });
  const u = (P, R) => {
    i = P, l.dataset.albinaState = P, l.disabled = P === "loading", l.textContent = R ?? (P === "loading" ? "Albina frontend loading..." : P === "error" ? "Albina frontend failed to load" : P === "open" ? "Albina frontend open" : "Open Albina frontend"), l.title = R ?? "";
  }, f = () => {
    r?.unmount(), r = void 0, n?.remove(), n = void 0, o || u("closed");
  }, b = (P) => {
    const R = window;
    for (const j of ["TavernHelper", "eventOn", "eventEmit", "eventOnce", "eventOff", "tavern_events", "getScriptId", "getIframeName", "triggerSlash", "replaceScriptButtons", "getButtonEvent"]) {
      const Q = R[j];
      if (Q !== void 0)
        try {
          P[j] = Q;
        } catch {
        }
    }
  }, y = () => {
    if (!(o || !n?.contentDocument?.body))
      try {
        const P = n.contentDocument, R = P.createElement("div");
        R.id = "albina-v2-root", P.body.append(R);
        const j = P.createElement("style");
        j.textContent = "html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#020308}#albina-v2-root{width:100%;height:100%}", P.head.append(j);
        const Q = a.querySelector("link[data-albina-style]")?.getAttribute("href");
        if (Q) {
          const B = P.createElement("link");
          B.rel = "stylesheet", B.href = Q, P.head.append(B);
        }
        n.contentWindow && b(n.contentWindow), r = d(R), u("open");
      } catch (P) {
        r?.unmount(), r = void 0, n?.remove(), n = void 0;
        const R = P instanceof Error ? P.message : String(P);
        u("error", `Albina frontend startup failed: ${R}`), console.error("[Albina] application mount failed.", P);
      }
  }, v = () => {
    if (!(o || i === "error")) {
      if (n?.isConnected) {
        f();
        return;
      }
      try {
        n = a.createElement("iframe"), n.title = "Albina frontend", n.dataset.albinaShell = "v2", Object.assign(n.style, {
          position: "fixed",
          inset: "0",
          width: "100vw",
          height: "100dvh",
          zIndex: "2147483647",
          border: "none",
          background: "#020308"
        }), n.addEventListener("load", y, { once: !0 }), a.body.append(n), n.contentDocument?.body && y();
      } catch (P) {
        r?.unmount(), r = void 0, n?.remove(), n = void 0;
        const R = P instanceof Error ? P.message : String(P);
        u("error", `Albina frontend startup failed: ${R}`), console.error("[Albina] application mount failed.", P);
      }
    }
  }, g = () => {
    !o && i === "loading" && u("ready");
  }, k = () => {
    o || u("error", "Albina stylesheet failed to load. Check the CDN or network.");
  }, I = [], S = (P, R, j) => {
    P.addEventListener(R, j), I.push([P, R, j]);
  }, T = () => {
    if (i === "open" && n?.isConnected) {
      f();
      return;
    }
    v();
  };
  let x;
  const D = () => {
    o || (o = !0, f(), I.splice(0).forEach(([P, R, j]) => P.removeEventListener(R, j)), l.removeEventListener("click", T), l.remove(), s?.removeEventListener("load", g), s?.removeEventListener("error", k), s?.remove(), s = void 0, e.__ALBINA_INSTALLATION__ === x && delete e.__ALBINA_INSTALLATION__);
  };
  x = {
    document: a,
    launcher: l,
    get state() {
      return i;
    },
    open: v,
    close: f,
    uninstall: D
  }, e.__ALBINA_INSTALLATION__ = x, l.addEventListener("click", T), u("loading"), a.body.append(l), c.endsWith("/albina-source.js") && !a.querySelector("link[data-albina-style]") ? (s = a.createElement("link"), s.rel = "stylesheet", s.dataset.albinaStyle = "v2", s.href = new URL(
    /* @vite-ignore */
    "./albina-source.css",
    c
  ).href, s.addEventListener("load", g, { once: !0 }), s.addEventListener("error", k, { once: !0 }), a.head.append(s)) : u("ready"), v();
  const V = (P) => {
    oh(P) || D();
  };
  return S(window, "albina:unmount", V), S($w(window, e), "pagehide", V), e !== window && S(e, "albina:unmount", V), x;
}
function zw() {
  if (typeof window > "u") return;
  xn(window).__ALBINA_INSTALLATION__?.uninstall();
}
typeof window < "u" && !window.__ALBINA_DISABLE_AUTOINSTALL__ && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  tu();
}, { once: !0 }) : tu());
export {
  W9 as ALBINA_CDN_BASE,
  Zl as ALBINA_RELEASE_VERSION,
  tu as installAlbinaOneClick,
  Mw as mountAlbinaApplication,
  jw as resolveAlbinaHostDocument,
  $w as resolveAlbinaPagehideWindow,
  zw as uninstallAlbinaOneClick
};
