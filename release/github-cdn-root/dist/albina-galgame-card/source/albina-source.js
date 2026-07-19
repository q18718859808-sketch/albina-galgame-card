// @__NO_SIDE_EFFECTS__
function ri(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const i of e.split(",")) t[i] = 1;
  return (i) => i in t;
}
const Ae = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, aa = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Xe = () => {
}, pu = () => !1, io = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), za = (e) => e.startsWith("onUpdate:"), He = Object.assign, Fs = (e, t) => {
  const i = e.indexOf(t);
  i > -1 && e.splice(i, 1);
}, xf = Object.prototype.hasOwnProperty, _e = (e, t) => xf.call(e, t), ie = Array.isArray, Pi = (e) => ao(e) === "[object Map]", ln = (e) => ao(e) === "[object Set]", Cr = (e) => ao(e) === "[object Date]", se = (e) => typeof e == "function", Ne = (e) => typeof e == "string", wt = (e) => typeof e == "symbol", ve = (e) => e !== null && typeof e == "object", Ms = (e) => (ve(e) || se(e)) && se(e.then) && se(e.catch), fu = Object.prototype.toString, ao = (e) => fu.call(e), zs = (e) => ao(e).slice(8, -1), hu = (e) => ao(e) === "[object Object]", pn = (e) => Ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Da = /* @__PURE__ */ ri(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Of = /* @__PURE__ */ ri(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), fn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((i) => t[i] || (t[i] = e(i)));
}, Vf = /-\w/g, pt = fn(
  (e) => e.replace(Vf, (t) => t.slice(1).toUpperCase())
), Cf = /\B([A-Z])/g, oi = fn(
  (e) => e.replace(Cf, "-$1").toLowerCase()
), hn = fn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ei = fn(
  (e) => e ? `on${hn(e)}` : ""
), zt = (e, t) => !Object.is(e, t), Yi = (e, ...t) => {
  for (let i = 0; i < e.length; i++)
    e[i](...t);
}, zo = (e, t, i, a = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: i
  });
}, Ls = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Nr;
const oo = () => Nr || (Nr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function bn(e) {
  if (ie(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const a = e[i], o = Ne(a) ? Rf(a) : bn(a);
      if (o)
        for (const n in o)
          t[n] = o[n];
    }
    return t;
  } else if (Ne(e) || ve(e))
    return e;
}
const Nf = /;(?![^(]*\))/g, Df = /:([^]+)/, Pf = /\/\*[^]*?\*\//g;
function Rf(e) {
  const t = {};
  return e.replace(Pf, "").split(Nf).forEach((i) => {
    if (i) {
      const a = i.split(Df);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function Ot(e) {
  let t = "";
  if (Ne(e))
    t = e;
  else if (ie(e))
    for (let i = 0; i < e.length; i++) {
      const a = Ot(e[i]);
      a && (t += a + " ");
    }
  else if (ve(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
const jf = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", $f = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Uf = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Ff = /* @__PURE__ */ ri(jf), Mf = /* @__PURE__ */ ri($f), zf = /* @__PURE__ */ ri(Uf), Lf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", qf = /* @__PURE__ */ ri(Lf);
function bu(e) {
  return !!e || e === "";
}
function Zf(e, t) {
  if (e.length !== t.length) return !1;
  let i = !0;
  for (let a = 0; i && a < e.length; a++)
    i = no(e[a], t[a]);
  return i;
}
function no(e, t) {
  if (e === t) return !0;
  let i = Cr(e), a = Cr(t);
  if (i || a)
    return i && a ? e.getTime() === t.getTime() : !1;
  if (i = wt(e), a = wt(t), i || a)
    return e === t;
  if (i = ie(e), a = ie(t), i || a)
    return i && a ? Zf(e, t) : !1;
  if (i = ve(e), a = ve(t), i || a) {
    if (!i || !a)
      return !1;
    const o = Object.keys(e).length, n = Object.keys(t).length;
    if (o !== n)
      return !1;
    for (const s in e) {
      const r = e.hasOwnProperty(s), c = t.hasOwnProperty(s);
      if (r && !c || !r && c || !no(e[s], t[s]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function mu(e, t) {
  return e.findIndex((i) => no(i, t));
}
const gu = (e) => !!(e && e.__v_isRef === !0), q = (e) => Ne(e) ? e : e == null ? "" : ie(e) || ve(e) && (e.toString === fu || !se(e.toString)) ? gu(e) ? q(e.value) : JSON.stringify(e, _u, 2) : String(e), _u = (e, t) => gu(t) ? _u(e, t.value) : Pi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (i, [a, o], n) => (i[jn(a, n) + " =>"] = o, i),
    {}
  )
} : ln(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((i) => jn(i))
} : wt(t) ? jn(t) : ve(t) && !ie(t) && !hu(t) ? String(t) : t, jn = (e, t = "") => {
  var i;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    wt(e) ? `Symbol(${(i = e.description) != null ? i : t})` : e
  );
};
function kt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ke;
class vu {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Ke && (Ke.active ? (this.parent = Ke, this.index = (Ke.scopes || (Ke.scopes = [])).push(
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
      const i = Ke;
      try {
        return Ke = this, t();
      } finally {
        Ke = i;
      }
    } else process.env.NODE_ENV !== "production" && this._warnOnRun && kt("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ke, Ke = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ke === this)
        Ke = this.prevScope;
      else {
        let t = Ke;
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
function yu(e) {
  return new vu(e);
}
function wu() {
  return Ke;
}
function Hf(e, t = !1) {
  Ke ? Ke.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && kt(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let Ie;
const $n = /* @__PURE__ */ new WeakSet();
class ku {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ke && (Ke.active ? Ke.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, $n.has(this) && ($n.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Au(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Dr(this), Eu(this);
    const t = Ie, i = Nt;
    Ie = this, Nt = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && Ie !== this && kt(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Tu(this), Ie = t, Nt = i, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Hs(t);
      this.deps = this.depsTail = void 0, Dr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? $n.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    os(this) && this.run();
  }
  get dirty() {
    return os(this);
  }
}
let Iu = 0, Pa, Ra;
function Au(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ra, Ra = e;
    return;
  }
  e.next = Pa, Pa = e;
}
function qs() {
  Iu++;
}
function Zs() {
  if (--Iu > 0)
    return;
  if (Ra) {
    let t = Ra;
    for (Ra = void 0; t; ) {
      const i = t.next;
      t.next = void 0, t.flags &= -9, t = i;
    }
  }
  let e;
  for (; Pa; ) {
    let t = Pa;
    for (Pa = void 0; t; ) {
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
function Eu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Tu(e) {
  let t, i = e.depsTail, a = i;
  for (; a; ) {
    const o = a.prevDep;
    a.version === -1 ? (a === i && (i = o), Hs(a), Bf(a)) : t = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = o;
  }
  e.deps = t, e.depsTail = i;
}
function os(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Su(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Su(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === La) || (e.globalVersion = La, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !os(e))))
    return;
  e.flags |= 2;
  const t = e.dep, i = Ie, a = Nt;
  Ie = e, Nt = !0;
  try {
    Eu(e);
    const o = e.fn(e._value);
    (t.version === 0 || zt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Ie = i, Nt = a, Tu(e), e.flags &= -3;
  }
}
function Hs(e, t = !1) {
  const { dep: i, prevSub: a, nextSub: o } = e;
  if (a && (a.nextSub = o, e.prevSub = void 0), o && (o.prevSub = a, e.nextSub = void 0), process.env.NODE_ENV !== "production" && i.subsHead === e && (i.subsHead = o), i.subs === e && (i.subs = a, !a && i.computed)) {
    i.computed.flags &= -5;
    for (let n = i.computed.deps; n; n = n.nextDep)
      Hs(n, !0);
  }
  !t && !--i.sc && i.map && i.map.delete(i.key);
}
function Bf(e) {
  const { prevDep: t, nextDep: i } = e;
  t && (t.nextDep = i, e.prevDep = void 0), i && (i.prevDep = t, e.nextDep = void 0);
}
let Nt = !0;
const xu = [];
function Et() {
  xu.push(Nt), Nt = !1;
}
function Tt() {
  const e = xu.pop();
  Nt = e === void 0 ? !0 : e;
}
function Dr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const i = Ie;
    Ie = void 0;
    try {
      t();
    } finally {
      Ie = i;
    }
  }
}
let La = 0;
class Jf {
  constructor(t, i) {
    this.sub = t, this.dep = i, this.version = i.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Bs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!Ie || !Nt || Ie === this.computed)
      return;
    let i = this.activeLink;
    if (i === void 0 || i.sub !== Ie)
      i = this.activeLink = new Jf(Ie, this), Ie.deps ? (i.prevDep = Ie.depsTail, Ie.depsTail.nextDep = i, Ie.depsTail = i) : Ie.deps = Ie.depsTail = i, Ou(i);
    else if (i.version === -1 && (i.version = this.version, i.nextDep)) {
      const a = i.nextDep;
      a.prevDep = i.prevDep, i.prevDep && (i.prevDep.nextDep = a), i.prevDep = Ie.depsTail, i.nextDep = void 0, Ie.depsTail.nextDep = i, Ie.depsTail = i, Ie.deps === i && (Ie.deps = a);
    }
    return process.env.NODE_ENV !== "production" && Ie.onTrack && Ie.onTrack(
      He(
        {
          effect: Ie
        },
        t
      )
    ), i;
  }
  trigger(t) {
    this.version++, La++, this.notify(t);
  }
  notify(t) {
    qs();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let i = this.subsHead; i; i = i.nextSub)
          i.sub.onTrigger && !(i.sub.flags & 8) && i.sub.onTrigger(
            He(
              {
                effect: i.sub
              },
              t
            )
          );
      for (let i = this.subs; i; i = i.prevSub)
        i.sub.notify() && i.sub.dep.notify();
    } finally {
      Zs();
    }
  }
}
function Ou(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let a = t.deps; a; a = a.nextDep)
        Ou(a);
    }
    const i = e.dep.subs;
    i !== e && (e.prevSub = i, i && (i.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Lo = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), ns = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), qa = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Ye(e, t, i) {
  if (Nt && Ie) {
    let a = Lo.get(e);
    a || Lo.set(e, a = /* @__PURE__ */ new Map());
    let o = a.get(i);
    o || (a.set(i, o = new Bs()), o.map = a, o.key = i), process.env.NODE_ENV !== "production" ? o.track({
      target: e,
      type: t,
      key: i
    }) : o.track();
  }
}
function Lt(e, t, i, a, o, n) {
  const s = Lo.get(e);
  if (!s) {
    La++;
    return;
  }
  const r = (c) => {
    c && (process.env.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: i,
      newValue: a,
      oldValue: o,
      oldTarget: n
    }) : c.trigger());
  };
  if (qs(), t === "clear")
    s.forEach(r);
  else {
    const c = ie(e), d = c && pn(i);
    if (c && i === "length") {
      const l = Number(a);
      s.forEach((u, p) => {
        (p === "length" || p === qa || !wt(p) && p >= l) && r(u);
      });
    } else
      switch ((i !== void 0 || s.has(void 0)) && r(s.get(i)), d && r(s.get(qa)), t) {
        case "add":
          c ? d && r(s.get("length")) : (r(s.get(Ri)), Pi(e) && r(s.get(ns)));
          break;
        case "delete":
          c || (r(s.get(Ri)), Pi(e) && r(s.get(ns)));
          break;
        case "set":
          Pi(e) && r(s.get(Ri));
          break;
      }
  }
  Zs();
}
function Kf(e, t) {
  const i = Lo.get(e);
  return i && i.get(t);
}
function Bi(e) {
  const t = /* @__PURE__ */ de(e);
  return t === e ? t : (Ye(t, "iterate", qa), /* @__PURE__ */ ot(e) ? t : t.map(Rt));
}
function mn(e) {
  return Ye(e = /* @__PURE__ */ de(e), "iterate", qa), e;
}
function Mt(e, t) {
  return /* @__PURE__ */ Pt(e) ? da(/* @__PURE__ */ Dt(e) ? Rt(t) : t) : Rt(t);
}
const Gf = {
  __proto__: null,
  [Symbol.iterator]() {
    return Un(this, Symbol.iterator, (e) => Mt(this, e));
  },
  concat(...e) {
    return Bi(this).concat(
      ...e.map((t) => ie(t) ? Bi(t) : t)
    );
  },
  entries() {
    return Un(this, "entries", (e) => (e[1] = Mt(this, e[1]), e));
  },
  every(e, t) {
    return Jt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Jt(
      this,
      "filter",
      e,
      t,
      (i) => i.map((a) => Mt(this, a)),
      arguments
    );
  },
  find(e, t) {
    return Jt(
      this,
      "find",
      e,
      t,
      (i) => Mt(this, i),
      arguments
    );
  },
  findIndex(e, t) {
    return Jt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Jt(
      this,
      "findLast",
      e,
      t,
      (i) => Mt(this, i),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Jt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Jt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Fn(this, "includes", e);
  },
  indexOf(...e) {
    return Fn(this, "indexOf", e);
  },
  join(e) {
    return Bi(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Fn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Jt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return wa(this, "pop");
  },
  push(...e) {
    return wa(this, "push", e);
  },
  reduce(e, ...t) {
    return Pr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Pr(this, "reduceRight", e, t);
  },
  shift() {
    return wa(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Jt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return wa(this, "splice", e);
  },
  toReversed() {
    return Bi(this).toReversed();
  },
  toSorted(e) {
    return Bi(this).toSorted(e);
  },
  toSpliced(...e) {
    return Bi(this).toSpliced(...e);
  },
  unshift(...e) {
    return wa(this, "unshift", e);
  },
  values() {
    return Un(this, "values", (e) => Mt(this, e));
  }
};
function Un(e, t, i) {
  const a = mn(e), o = a[t]();
  return a !== e && !/* @__PURE__ */ ot(e) && (o._next = o.next, o.next = () => {
    const n = o._next();
    return n.done || (n.value = i(n.value)), n;
  }), o;
}
const Wf = Array.prototype;
function Jt(e, t, i, a, o, n) {
  const s = mn(e), r = s !== e && !/* @__PURE__ */ ot(e), c = s[t];
  if (c !== Wf[t]) {
    const u = c.apply(e, n);
    return r ? Rt(u) : u;
  }
  let d = i;
  s !== e && (r ? d = function(u, p) {
    return i.call(this, Mt(e, u), p, e);
  } : i.length > 2 && (d = function(u, p) {
    return i.call(this, u, p, e);
  }));
  const l = c.call(s, d, a);
  return r && o ? o(l) : l;
}
function Pr(e, t, i, a) {
  const o = mn(e), n = o !== e && !/* @__PURE__ */ ot(e);
  let s = i, r = !1;
  o !== e && (n ? (r = a.length === 0, s = function(d, l, u) {
    return r && (r = !1, d = Mt(e, d)), i.call(this, d, Mt(e, l), u, e);
  }) : i.length > 3 && (s = function(d, l, u) {
    return i.call(this, d, l, u, e);
  }));
  const c = o[t](s, ...a);
  return r ? Mt(e, c) : c;
}
function Fn(e, t, i) {
  const a = /* @__PURE__ */ de(e);
  Ye(a, "iterate", qa);
  const o = a[t](...i);
  return (o === -1 || o === !1) && /* @__PURE__ */ ca(i[0]) ? (i[0] = /* @__PURE__ */ de(i[0]), a[t](...i)) : o;
}
function wa(e, t, i = []) {
  Et(), qs();
  const a = (/* @__PURE__ */ de(e))[t].apply(e, i);
  return Zs(), Tt(), a;
}
const Yf = /* @__PURE__ */ ri("__proto__,__v_isRef,__isVue"), Vu = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(wt)
);
function Xf(e) {
  wt(e) || (e = String(e));
  const t = /* @__PURE__ */ de(this);
  return Ye(t, "has", e), t.hasOwnProperty(e);
}
class Cu {
  constructor(t = !1, i = !1) {
    this._isReadonly = t, this._isShallow = i;
  }
  get(t, i, a) {
    if (i === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, n = this._isShallow;
    if (i === "__v_isReactive")
      return !o;
    if (i === "__v_isReadonly")
      return o;
    if (i === "__v_isShallow")
      return n;
    if (i === "__v_raw")
      return a === (o ? n ? $u : ju : n ? Ru : Pu).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(a) ? t : void 0;
    const s = ie(t);
    if (!o) {
      let c;
      if (s && (c = Gf[i]))
        return c;
      if (i === "hasOwnProperty")
        return Xf;
    }
    const r = Reflect.get(
      t,
      i,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ xe(t) ? t : a
    );
    if ((wt(i) ? Vu.has(i) : Yf(i)) || (o || Ye(t, "get", i), n))
      return r;
    if (/* @__PURE__ */ xe(r)) {
      const c = s && pn(i) ? r : r.value;
      return o && ve(c) ? /* @__PURE__ */ rs(c) : c;
    }
    return ve(r) ? o ? /* @__PURE__ */ rs(r) : /* @__PURE__ */ _n(r) : r;
  }
}
class Nu extends Cu {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, i, a, o) {
    let n = t[i];
    const s = ie(t) && pn(i);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Pt(n);
      if (!/* @__PURE__ */ ot(a) && !/* @__PURE__ */ Pt(a) && (n = /* @__PURE__ */ de(n), a = /* @__PURE__ */ de(a)), !s && /* @__PURE__ */ xe(n) && !/* @__PURE__ */ xe(a))
        return d ? (process.env.NODE_ENV !== "production" && kt(
          `Set operation on key "${String(i)}" failed: target is readonly.`,
          t[i]
        ), !0) : (n.value = a, !0);
    }
    const r = s ? Number(i) < t.length : _e(t, i), c = Reflect.set(
      t,
      i,
      a,
      /* @__PURE__ */ xe(t) ? t : o
    );
    return t === /* @__PURE__ */ de(o) && c && (r ? zt(a, n) && Lt(t, "set", i, a, n) : Lt(t, "add", i, a)), c;
  }
  deleteProperty(t, i) {
    const a = _e(t, i), o = t[i], n = Reflect.deleteProperty(t, i);
    return n && a && Lt(t, "delete", i, void 0, o), n;
  }
  has(t, i) {
    const a = Reflect.has(t, i);
    return (!wt(i) || !Vu.has(i)) && Ye(t, "has", i), a;
  }
  ownKeys(t) {
    return Ye(
      t,
      "iterate",
      ie(t) ? "length" : Ri
    ), Reflect.ownKeys(t);
  }
}
class Du extends Cu {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, i) {
    return process.env.NODE_ENV !== "production" && kt(
      `Set operation on key "${String(i)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, i) {
    return process.env.NODE_ENV !== "production" && kt(
      `Delete operation on key "${String(i)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Qf = /* @__PURE__ */ new Nu(), eh = /* @__PURE__ */ new Du(), th = /* @__PURE__ */ new Nu(!0), ih = /* @__PURE__ */ new Du(!0), ss = (e) => e, vo = (e) => Reflect.getPrototypeOf(e);
function ah(e, t, i) {
  return function(...a) {
    const o = this.__v_raw, n = /* @__PURE__ */ de(o), s = Pi(n), r = e === "entries" || e === Symbol.iterator && s, c = e === "keys" && s, d = o[e](...a), l = i ? ss : t ? da : Rt;
    return !t && Ye(
      n,
      "iterate",
      c ? ns : Ri
    ), He(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: u, done: p } = d.next();
          return p ? { value: u, done: p } : {
            value: r ? [l(u[0]), l(u[1])] : l(u),
            done: p
          };
        }
      }
    );
  };
}
function yo(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const i = t[0] ? `on key "${t[0]}" ` : "";
      kt(
        `${hn(e)} operation ${i}failed: target is readonly.`,
        /* @__PURE__ */ de(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function oh(e, t) {
  const i = {
    get(o) {
      const n = this.__v_raw, s = /* @__PURE__ */ de(n), r = /* @__PURE__ */ de(o);
      e || (zt(o, r) && Ye(s, "get", o), Ye(s, "get", r));
      const { has: c } = vo(s), d = t ? ss : e ? da : Rt;
      if (c.call(s, o))
        return d(n.get(o));
      if (c.call(s, r))
        return d(n.get(r));
      n !== s && n.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Ye(/* @__PURE__ */ de(o), "iterate", Ri), o.size;
    },
    has(o) {
      const n = this.__v_raw, s = /* @__PURE__ */ de(n), r = /* @__PURE__ */ de(o);
      return e || (zt(o, r) && Ye(s, "has", o), Ye(s, "has", r)), o === r ? n.has(o) : n.has(o) || n.has(r);
    },
    forEach(o, n) {
      const s = this, r = s.__v_raw, c = /* @__PURE__ */ de(r), d = t ? ss : e ? da : Rt;
      return !e && Ye(c, "iterate", Ri), r.forEach((l, u) => o.call(n, d(l), d(u), s));
    }
  };
  return He(
    i,
    e ? {
      add: yo("add"),
      set: yo("set"),
      delete: yo("delete"),
      clear: yo("clear")
    } : {
      add(o) {
        const n = /* @__PURE__ */ de(this), s = vo(n), r = /* @__PURE__ */ de(o), c = !t && !/* @__PURE__ */ ot(o) && !/* @__PURE__ */ Pt(o) ? r : o;
        return s.has.call(n, c) || zt(o, c) && s.has.call(n, o) || zt(r, c) && s.has.call(n, r) || (n.add(c), Lt(n, "add", c, c)), this;
      },
      set(o, n) {
        !t && !/* @__PURE__ */ ot(n) && !/* @__PURE__ */ Pt(n) && (n = /* @__PURE__ */ de(n));
        const s = /* @__PURE__ */ de(this), { has: r, get: c } = vo(s);
        let d = r.call(s, o);
        d ? process.env.NODE_ENV !== "production" && Rr(s, r, o) : (o = /* @__PURE__ */ de(o), d = r.call(s, o));
        const l = c.call(s, o);
        return s.set(o, n), d ? zt(n, l) && Lt(s, "set", o, n, l) : Lt(s, "add", o, n), this;
      },
      delete(o) {
        const n = /* @__PURE__ */ de(this), { has: s, get: r } = vo(n);
        let c = s.call(n, o);
        c ? process.env.NODE_ENV !== "production" && Rr(n, s, o) : (o = /* @__PURE__ */ de(o), c = s.call(n, o));
        const d = r ? r.call(n, o) : void 0, l = n.delete(o);
        return c && Lt(n, "delete", o, void 0, d), l;
      },
      clear() {
        const o = /* @__PURE__ */ de(this), n = o.size !== 0, s = process.env.NODE_ENV !== "production" ? Pi(o) ? new Map(o) : new Set(o) : void 0, r = o.clear();
        return n && Lt(
          o,
          "clear",
          void 0,
          void 0,
          s
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    i[o] = ah(o, e, t);
  }), i;
}
function gn(e, t) {
  const i = oh(e, t);
  return (a, o, n) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? a : Reflect.get(
    _e(i, o) && o in a ? i : a,
    o,
    n
  );
}
const nh = {
  get: /* @__PURE__ */ gn(!1, !1)
}, sh = {
  get: /* @__PURE__ */ gn(!1, !0)
}, rh = {
  get: /* @__PURE__ */ gn(!0, !1)
}, ch = {
  get: /* @__PURE__ */ gn(!0, !0)
};
function Rr(e, t, i) {
  const a = /* @__PURE__ */ de(i);
  if (a !== i && t.call(e, a)) {
    const o = zs(e);
    kt(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Pu = /* @__PURE__ */ new WeakMap(), Ru = /* @__PURE__ */ new WeakMap(), ju = /* @__PURE__ */ new WeakMap(), $u = /* @__PURE__ */ new WeakMap();
function dh(e) {
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
function _n(e) {
  return /* @__PURE__ */ Pt(e) ? e : vn(
    e,
    !1,
    Qf,
    nh,
    Pu
  );
}
// @__NO_SIDE_EFFECTS__
function uh(e) {
  return vn(
    e,
    !1,
    th,
    sh,
    Ru
  );
}
// @__NO_SIDE_EFFECTS__
function rs(e) {
  return vn(
    e,
    !0,
    eh,
    rh,
    ju
  );
}
// @__NO_SIDE_EFFECTS__
function qt(e) {
  return vn(
    e,
    !0,
    ih,
    ch,
    $u
  );
}
function vn(e, t, i, a, o) {
  if (!ve(e))
    return process.env.NODE_ENV !== "production" && kt(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const n = o.get(e);
  if (n)
    return n;
  const s = dh(zs(e));
  if (s === 0)
    return e;
  const r = new Proxy(
    e,
    s === 2 ? a : i
  );
  return o.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function Dt(e) {
  return /* @__PURE__ */ Pt(e) ? /* @__PURE__ */ Dt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Pt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ca(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function de(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ de(t) : e;
}
function Zt(e) {
  return !_e(e, "__v_skip") && Object.isExtensible(e) && zo(e, "__v_skip", !0), e;
}
const Rt = (e) => ve(e) ? /* @__PURE__ */ _n(e) : e, da = (e) => ve(e) ? /* @__PURE__ */ rs(e) : e;
// @__NO_SIDE_EFFECTS__
function xe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ve(e) {
  return Uu(e, !1);
}
// @__NO_SIDE_EFFECTS__
function lh(e) {
  return Uu(e, !0);
}
function Uu(e, t) {
  return /* @__PURE__ */ xe(e) ? e : new ph(e, t);
}
class ph {
  constructor(t, i) {
    this.dep = new Bs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = i ? t : /* @__PURE__ */ de(t), this._value = i ? t : Rt(t), this.__v_isShallow = i;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const i = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ ot(t) || /* @__PURE__ */ Pt(t);
    t = a ? t : /* @__PURE__ */ de(t), zt(t, i) && (this._rawValue = t, this._value = a ? t : Rt(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: i
    }) : this.dep.trigger());
  }
}
function jr(e) {
  e.dep && (process.env.NODE_ENV !== "production" ? e.dep.trigger({
    target: e,
    type: "set",
    key: "value",
    newValue: e._value
  }) : e.dep.trigger());
}
function O(e) {
  return /* @__PURE__ */ xe(e) ? e.value : e;
}
const fh = {
  get: (e, t, i) => t === "__v_raw" ? e : O(Reflect.get(e, t, i)),
  set: (e, t, i, a) => {
    const o = e[t];
    return /* @__PURE__ */ xe(o) && !/* @__PURE__ */ xe(i) ? (o.value = i, !0) : Reflect.set(e, t, i, a);
  }
};
function Fu(e) {
  return /* @__PURE__ */ Dt(e) ? e : new Proxy(e, fh);
}
// @__NO_SIDE_EFFECTS__
function $r(e) {
  process.env.NODE_ENV !== "production" && !/* @__PURE__ */ ca(e) && kt("toRefs() expects a reactive object but received a plain one.");
  const t = ie(e) ? new Array(e.length) : {};
  for (const i in e)
    t[i] = Mu(e, i);
  return t;
}
class hh {
  constructor(t, i, a) {
    this._object = t, this._defaultValue = a, this.__v_isRef = !0, this._value = void 0, this._key = wt(i) ? i : String(i), this._raw = /* @__PURE__ */ de(t);
    let o = !0, n = t;
    if (!ie(t) || wt(this._key) || !pn(this._key))
      do
        o = !/* @__PURE__ */ ca(n) || /* @__PURE__ */ ot(n);
      while (o && (n = n.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = O(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ xe(this._raw[this._key])) {
      const i = this._object[this._key];
      if (/* @__PURE__ */ xe(i)) {
        i.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Kf(this._raw, this._key);
  }
}
class bh {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Mn(e, t, i) {
  return /* @__PURE__ */ xe(e) ? e : se(e) ? new bh(e) : ve(e) && arguments.length > 1 ? Mu(e, t, i) : /* @__PURE__ */ Ve(e);
}
function Mu(e, t, i) {
  return new hh(e, t, i);
}
class mh {
  constructor(t, i, a) {
    this.fn = t, this.setter = i, this._value = void 0, this.dep = new Bs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = La - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !i, this.isSSR = a;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Ie !== this)
      return Au(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Su(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && kt("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function gh(e, t, i = !1) {
  let a, o;
  se(e) ? a = e : (a = e.get, o = e.set);
  const n = new mh(a, o, i);
  return process.env.NODE_ENV, n;
}
const wo = {}, qo = /* @__PURE__ */ new WeakMap();
let Ti;
function _h(e, t = !1, i = Ti) {
  if (i) {
    let a = qo.get(i);
    a || qo.set(i, a = []), a.push(e);
  } else process.env.NODE_ENV !== "production" && !t && kt(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function vh(e, t, i = Ae) {
  const { immediate: a, deep: o, once: n, scheduler: s, augmentJob: r, call: c } = i, d = (R) => {
    (i.onWarn || kt)(
      "Invalid watch source: ",
      R,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, l = (R) => o ? R : /* @__PURE__ */ ot(R) || o === !1 || o === 0 ? Qt(R, 1) : Qt(R);
  let u, p, f, g, I = !1, k = !1;
  if (/* @__PURE__ */ xe(e) ? (p = () => e.value, I = /* @__PURE__ */ ot(e)) : /* @__PURE__ */ Dt(e) ? (p = () => l(e), I = !0) : ie(e) ? (k = !0, I = e.some((R) => /* @__PURE__ */ Dt(R) || /* @__PURE__ */ ot(R)), p = () => e.map((R) => {
    if (/* @__PURE__ */ xe(R))
      return R.value;
    if (/* @__PURE__ */ Dt(R))
      return l(R);
    if (se(R))
      return c ? c(R, 2) : R();
    process.env.NODE_ENV !== "production" && d(R);
  })) : se(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (f) {
      Et();
      try {
        f();
      } finally {
        Tt();
      }
    }
    const R = Ti;
    Ti = u;
    try {
      return c ? c(e, 3, [g]) : e(g);
    } finally {
      Ti = R;
    }
  } : (p = Xe, process.env.NODE_ENV !== "production" && d(e)), t && o) {
    const R = p, ue = o === !0 ? 1 / 0 : o;
    p = () => Qt(R(), ue);
  }
  const N = wu(), H = () => {
    u.stop(), N && N.active && Fs(N.effects, u);
  };
  if (n && t) {
    const R = t;
    t = (...ue) => {
      const K = R(...ue);
      return H(), K;
    };
  }
  let F = k ? new Array(e.length).fill(wo) : wo;
  const X = (R) => {
    if (!(!(u.flags & 1) || !u.dirty && !R))
      if (t) {
        const ue = u.run();
        if (R || o || I || (k ? ue.some((K, ke) => zt(K, F[ke])) : zt(ue, F))) {
          f && f();
          const K = Ti;
          Ti = u;
          try {
            const ke = [
              ue,
              // pass undefined as the old value when it's changed for the first time
              F === wo ? void 0 : k && F[0] === wo ? [] : F,
              g
            ];
            F = ue, c ? c(t, 3, ke) : (
              // @ts-expect-error
              t(...ke)
            );
          } finally {
            Ti = K;
          }
        }
      } else
        u.run();
  };
  return r && r(X), u = new ku(p), u.scheduler = s ? () => s(X, !1) : X, g = (R) => _h(R, !1, u), f = u.onStop = () => {
    const R = qo.get(u);
    if (R) {
      if (c)
        c(R, 4);
      else
        for (const ue of R) ue();
      qo.delete(u);
    }
  }, process.env.NODE_ENV !== "production" && (u.onTrack = i.onTrack, u.onTrigger = i.onTrigger), t ? a ? X(!0) : F = u.run() : s ? s(X.bind(null, !0), !0) : u.run(), H.pause = u.pause.bind(u), H.resume = u.resume.bind(u), H.stop = H, H;
}
function Qt(e, t = 1 / 0, i) {
  if (t <= 0 || !ve(e) || e.__v_skip || (i = i || /* @__PURE__ */ new Map(), (i.get(e) || 0) >= t))
    return e;
  if (i.set(e, t), t--, /* @__PURE__ */ xe(e))
    Qt(e.value, t, i);
  else if (ie(e))
    for (let a = 0; a < e.length; a++)
      Qt(e[a], t, i);
  else if (ln(e) || Pi(e))
    e.forEach((a) => {
      Qt(a, t, i);
    });
  else if (hu(e)) {
    for (const a in e)
      Qt(e[a], t, i);
    for (const a of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, a) && Qt(e[a], t, i);
  }
  return e;
}
const ji = [];
function Oo(e) {
  ji.push(e);
}
function Vo() {
  ji.pop();
}
let zn = !1;
function j(e, ...t) {
  if (zn) return;
  zn = !0, Et();
  const i = ji.length ? ji[ji.length - 1].component : null, a = i && i.appContext.config.warnHandler, o = yh();
  if (a)
    ma(
      a,
      i,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((n) => {
          var s, r;
          return (r = (s = n.toString) == null ? void 0 : s.call(n)) != null ? r : JSON.stringify(n);
        }).join(""),
        i && i.proxy,
        o.map(
          ({ vnode: n }) => `at <${lo(i, n.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const n = [`[Vue warn]: ${e}`, ...t];
    o.length && n.push(`
`, ...wh(o)), console.warn(...n);
  }
  Tt(), zn = !1;
}
function yh() {
  let e = ji[ji.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const i = t[0];
    i && i.vnode === e ? i.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const a = e.component && e.component.parent;
    e = a && a.vnode;
  }
  return t;
}
function wh(e) {
  const t = [];
  return e.forEach((i, a) => {
    t.push(...a === 0 ? [] : [`
`], ...kh(i));
  }), t;
}
function kh({ vnode: e, recurseCount: t }) {
  const i = t > 0 ? `... (${t} recursive calls)` : "", a = e.component ? e.component.parent == null : !1, o = ` at <${lo(
    e.component,
    e.type,
    a
  )}`, n = ">" + i;
  return e.props ? [o, ...Ih(e.props), n] : [o + n];
}
function Ih(e) {
  const t = [], i = Object.keys(e);
  return i.slice(0, 3).forEach((a) => {
    t.push(...zu(a, e[a]));
  }), i.length > 3 && t.push(" ..."), t;
}
function zu(e, t, i) {
  return Ne(t) ? (t = JSON.stringify(t), i ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? i ? t : [`${e}=${t}`] : /* @__PURE__ */ xe(t) ? (t = zu(e, /* @__PURE__ */ de(t.value), !0), i ? t : [`${e}=Ref<`, t, ">"]) : se(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ de(t), i ? t : [`${e}=`, t]);
}
const Js = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function ma(e, t, i, a) {
  try {
    return a ? e(...a) : e();
  } catch (o) {
    so(o, t, i);
  }
}
function jt(e, t, i, a) {
  if (se(e)) {
    const o = ma(e, t, i, a);
    return o && Ms(o) && o.catch((n) => {
      so(n, t, i);
    }), o;
  }
  if (ie(e)) {
    const o = [];
    for (let n = 0; n < e.length; n++)
      o.push(jt(e[n], t, i, a));
    return o;
  } else process.env.NODE_ENV !== "production" && j(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function so(e, t, i, a = !0) {
  const o = t ? t.vnode : null, { errorHandler: n, throwUnhandledErrorInProduction: s } = t && t.appContext.config || Ae;
  if (t) {
    let r = t.parent;
    const c = t.proxy, d = process.env.NODE_ENV !== "production" ? Js[i] : `https://vuejs.org/error-reference/#runtime-${i}`;
    for (; r; ) {
      const l = r.ec;
      if (l) {
        for (let u = 0; u < l.length; u++)
          if (l[u](e, c, d) === !1)
            return;
      }
      r = r.parent;
    }
    if (n) {
      Et(), ma(n, null, 10, [
        e,
        c,
        d
      ]), Tt();
      return;
    }
  }
  Ah(e, i, o, a, s);
}
function Ah(e, t, i, a = !0, o = !1) {
  if (process.env.NODE_ENV !== "production") {
    const n = Js[t];
    if (i && Oo(i), j(`Unhandled error${n ? ` during execution of ${n}` : ""}`), i && Vo(), a)
      throw e;
    console.error(e);
  } else {
    if (o)
      throw e;
    console.error(e);
  }
}
const rt = [];
let Ft = -1;
const oa = [];
let pi = null, Xi = 0;
const Lu = /* @__PURE__ */ Promise.resolve();
let Zo = null;
const Eh = 100;
function Za(e) {
  const t = Zo || Lu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Th(e) {
  let t = Ft + 1, i = rt.length;
  for (; t < i; ) {
    const a = t + i >>> 1, o = rt[a], n = Ha(o);
    n < e || n === e && o.flags & 2 ? t = a + 1 : i = a;
  }
  return t;
}
function yn(e) {
  if (!(e.flags & 1)) {
    const t = Ha(e), i = rt[rt.length - 1];
    !i || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ha(i) ? rt.push(e) : rt.splice(Th(t), 0, e), e.flags |= 1, qu();
  }
}
function qu() {
  Zo || (Zo = Lu.then(Bu));
}
function Zu(e) {
  ie(e) ? oa.push(...e) : pi && e.id === -1 ? pi.splice(Xi + 1, 0, e) : e.flags & 1 || (oa.push(e), e.flags |= 1), qu();
}
function Ur(e, t, i = Ft + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); i < rt.length; i++) {
    const a = rt[i];
    if (a && a.flags & 2) {
      if (e && a.id !== e.uid || process.env.NODE_ENV !== "production" && Ks(t, a))
        continue;
      rt.splice(i, 1), i--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function Hu(e) {
  if (oa.length) {
    const t = [...new Set(oa)].sort(
      (i, a) => Ha(i) - Ha(a)
    );
    if (oa.length = 0, pi) {
      pi.push(...t);
      return;
    }
    for (pi = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Xi = 0; Xi < pi.length; Xi++) {
      const i = pi[Xi];
      process.env.NODE_ENV !== "production" && Ks(e, i) || (i.flags & 4 && (i.flags &= -2), i.flags & 8 || i(), i.flags &= -2);
    }
    pi = null, Xi = 0;
  }
}
const Ha = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Bu(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (i) => Ks(e, i) : Xe;
  try {
    for (Ft = 0; Ft < rt.length; Ft++) {
      const i = rt[Ft];
      if (i && !(i.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(i))
          continue;
        i.flags & 4 && (i.flags &= -2), ma(
          i,
          i.i,
          i.i ? 15 : 14
        ), i.flags & 4 || (i.flags &= -2);
      }
    }
  } finally {
    for (; Ft < rt.length; Ft++) {
      const i = rt[Ft];
      i && (i.flags &= -2);
    }
    Ft = -1, rt.length = 0, Hu(e), Zo = null, (rt.length || oa.length) && Bu(e);
  }
}
function Ks(e, t) {
  const i = e.get(t) || 0;
  if (i > Eh) {
    const a = t.i, o = a && Ol(a.type);
    return so(
      `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, i + 1), !1;
}
let _t = !1;
const Fr = (e) => {
  try {
    return _t;
  } finally {
    _t = e;
  }
}, Co = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (oo().__VUE_HMR_RUNTIME__ = {
  createRecord: Ln(Ju),
  rerender: Ln(Oh),
  reload: Ln(Vh)
});
const Mi = /* @__PURE__ */ new Map();
function Sh(e) {
  const t = e.type.__hmrId;
  let i = Mi.get(t);
  i || (Ju(t, e.type), i = Mi.get(t)), i.instances.add(e);
}
function xh(e) {
  Mi.get(e.type.__hmrId).instances.delete(e);
}
function Ju(e, t) {
  return Mi.has(e) ? !1 : (Mi.set(e, {
    initialDef: Ho(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Ho(e) {
  return Vl(e) ? e.__vccOpts : e;
}
function Oh(e, t) {
  const i = Mi.get(e);
  i && (i.initialDef.render = t, [...i.instances].forEach((a) => {
    t && (a.render = t, Ho(a.type).render = t), a.renderCache = [], _t = !0, a.job.flags & 8 || a.update(), _t = !1;
  }));
}
function Vh(e, t) {
  const i = Mi.get(e);
  if (!i) return;
  t = Ho(t), Mr(i.initialDef, t);
  const a = [...i.instances];
  for (let o = 0; o < a.length; o++) {
    const n = a[o], s = Ho(n.type);
    let r = Co.get(s);
    r || (s !== i.initialDef && Mr(s, t), Co.set(s, r = /* @__PURE__ */ new Set())), r.add(n), n.appContext.propsCache.delete(n.type), n.appContext.emitsCache.delete(n.type), n.appContext.optionsCache.delete(n.type), n.ceReload ? (r.add(n), n.ceReload(t.styles), r.delete(n)) : n.parent ? yn(() => {
      n.job.flags & 8 || (_t = !0, n.parent.update(), _t = !1, r.delete(n));
    }) : n.appContext.reload ? n.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), n.root.ce && n !== n.root && n.root.ce._removeChildStyle(s);
  }
  Zu(() => {
    Co.clear();
  });
}
function Mr(e, t) {
  He(e, t);
  for (const i in e)
    i !== "__file" && !(i in t) && delete e[i];
}
function Ln(e) {
  return (t, i) => {
    try {
      return e(t, i);
    } catch (a) {
      console.error(a), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let Ct, Ta = [], cs = !1;
function ro(e, ...t) {
  Ct ? Ct.emit(e, ...t) : cs || Ta.push({ event: e, args: t });
}
function Gs(e, t) {
  var i, a;
  Ct = e, Ct ? (Ct.enabled = !0, Ta.forEach(({ event: o, args: n }) => Ct.emit(o, ...n)), Ta = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((a = (i = window.navigator) == null ? void 0 : i.userAgent) != null && a.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((n) => {
    Gs(n, t);
  }), setTimeout(() => {
    Ct || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, cs = !0, Ta = []);
  }, 3e3)) : (cs = !0, Ta = []);
}
function Ch(e, t) {
  ro("app:init", e, t, {
    Fragment: we,
    Text: co,
    Comment: yt,
    Static: Do
  });
}
function Nh(e) {
  ro("app:unmount", e);
}
const Dh = /* @__PURE__ */ Ws(
  "component:added"
  /* COMPONENT_ADDED */
), Ku = /* @__PURE__ */ Ws(
  "component:updated"
  /* COMPONENT_UPDATED */
), Ph = /* @__PURE__ */ Ws(
  "component:removed"
  /* COMPONENT_REMOVED */
), Rh = (e) => {
  Ct && typeof Ct.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !Ct.cleanupBuffer(e) && Ph(e);
};
// @__NO_SIDE_EFFECTS__
function Ws(e) {
  return (t) => {
    ro(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const jh = /* @__PURE__ */ Gu(
  "perf:start"
  /* PERFORMANCE_START */
), $h = /* @__PURE__ */ Gu(
  "perf:end"
  /* PERFORMANCE_END */
);
function Gu(e) {
  return (t, i, a) => {
    ro(e, t.appContext.app, t.uid, t, i, a);
  };
}
function Uh(e, t, i) {
  ro(
    "component:emit",
    e.appContext.app,
    e,
    t,
    i
  );
}
let dt = null, Wu = null;
function Bo(e) {
  const t = dt;
  return dt = e, Wu = e && e.type.__scopeId || null, t;
}
function Fh(e, t = dt, i) {
  if (!t || e._n)
    return e;
  const a = (...o) => {
    a._d && tc(-1);
    const n = Bo(t);
    let s;
    try {
      s = e(...o);
    } finally {
      Bo(n), a._d && tc(1);
    }
    return process.env.NODE_ENV !== "production" && Ku(t), s;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function Yu(e) {
  Of(e) && j("Do not use built-in directive ids as custom directive id: " + e);
}
function ei(e, t) {
  if (dt === null)
    return process.env.NODE_ENV !== "production" && j("withDirectives can only be used inside render functions."), e;
  const i = En(dt), a = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [n, s, r, c = Ae] = t[o];
    n && (se(n) && (n = {
      mounted: n,
      updated: n
    }), n.deep && Qt(s), a.push({
      dir: n,
      instance: i,
      value: s,
      oldValue: void 0,
      arg: r,
      modifiers: c
    }));
  }
  return e;
}
function Ii(e, t, i, a) {
  const o = e.dirs, n = t && t.dirs;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    n && (r.oldValue = n[s].value);
    let c = r.dir[a];
    c && (Et(), jt(c, i, 8, [
      e.el,
      r,
      e,
      t
    ]), Tt());
  }
}
function Mh(e, t) {
  if (process.env.NODE_ENV !== "production" && (!We || We.isMounted) && j("provide() can only be used inside setup()."), We) {
    let i = We.provides;
    const a = We.parent && We.parent.provides;
    a === i && (i = We.provides = Object.create(a)), i[e] = t;
  }
}
function $i(e, t, i = !1) {
  const a = An();
  if (a || Fi) {
    let o = Fi ? Fi._context.provides : a ? a.parent == null || a.ce ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return i && se(t) ? t.call(a && a.proxy) : t;
    process.env.NODE_ENV !== "production" && j(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && j("inject() can only be used inside setup() or functional components.");
}
function ds() {
  return !!(An() || Fi);
}
const zh = /* @__PURE__ */ Symbol.for("v-scx"), Lh = () => {
  {
    const e = $i(zh);
    return e || process.env.NODE_ENV !== "production" && j(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function na(e, t, i) {
  return process.env.NODE_ENV !== "production" && !se(t) && j(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Xu(e, t, i);
}
function Xu(e, t, i = Ae) {
  const { immediate: a, deep: o, flush: n, once: s } = i;
  process.env.NODE_ENV !== "production" && !t && (a !== void 0 && j(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && j(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && j(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const r = He({}, i);
  process.env.NODE_ENV !== "production" && (r.onWarn = j);
  const c = t && a || !t && n !== "post";
  let d;
  if (Ja) {
    if (n === "sync") {
      const f = Lh();
      d = f.__watcherHandles || (f.__watcherHandles = []);
    } else if (!c) {
      const f = () => {
      };
      return f.stop = Xe, f.resume = Xe, f.pause = Xe, f;
    }
  }
  const l = We;
  r.call = (f, g, I) => jt(f, l, g, I);
  let u = !1;
  n === "post" ? r.scheduler = (f) => {
    lt(f, l && l.suspense);
  } : n !== "sync" && (u = !0, r.scheduler = (f, g) => {
    g ? f() : yn(f);
  }), r.augmentJob = (f) => {
    t && (f.flags |= 4), u && (f.flags |= 2, l && (f.id = l.uid, f.i = l));
  };
  const p = vh(e, t, r);
  return Ja && (d ? d.push(p) : c && p()), p;
}
function qh(e, t, i) {
  const a = this.proxy, o = Ne(e) ? e.includes(".") ? Qu(a, e) : () => a[e] : e.bind(a, a);
  let n;
  se(t) ? n = t : (n = t.handler, i = t);
  const s = uo(this), r = Xu(o, n.bind(a), i);
  return s(), r;
}
function Qu(e, t) {
  const i = t.split(".");
  return () => {
    let a = e;
    for (let o = 0; o < i.length && a; o++)
      a = a[i[o]];
    return a;
  };
}
const Zh = /* @__PURE__ */ Symbol("_vte"), Hh = (e) => e.__isTeleport, qn = /* @__PURE__ */ Symbol("_leaveCb");
function Ys(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Ys(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Xs(e, t) {
  return se(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    He({ name: e.name }, t, { setup: e })
  ) : e;
}
function el(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const zr = /* @__PURE__ */ new WeakSet();
function Lr(e, t) {
  let i;
  return !!((i = Object.getOwnPropertyDescriptor(e, t)) && !i.configurable);
}
const Jo = /* @__PURE__ */ new WeakMap();
function ja(e, t, i, a, o = !1) {
  if (ie(e)) {
    e.forEach(
      (I, k) => ja(
        I,
        t && (ie(t) ? t[k] : t),
        i,
        a,
        o
      )
    );
    return;
  }
  if ($a(a) && !o) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && ja(e, t, i, a.component.subTree);
    return;
  }
  const n = a.shapeFlag & 4 ? En(a.component) : a.el, s = o ? null : n, { i: r, r: c } = e;
  if (process.env.NODE_ENV !== "production" && !r) {
    j(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, l = r.refs === Ae ? r.refs = {} : r.refs, u = r.setupState, p = /* @__PURE__ */ de(u), f = u === Ae ? pu : (I) => process.env.NODE_ENV !== "production" && (_e(p, I) && !/* @__PURE__ */ xe(p[I]) && j(
    `Template ref "${I}" used on a non-ref value. It will not work in the production build.`
  ), zr.has(p[I])) || Lr(l, I) ? !1 : _e(p, I), g = (I, k) => !(process.env.NODE_ENV !== "production" && zr.has(I) || k && Lr(l, k));
  if (d != null && d !== c) {
    if (qr(t), Ne(d))
      l[d] = null, f(d) && (u[d] = null);
    else if (/* @__PURE__ */ xe(d)) {
      const I = t;
      g(d, I.k) && (d.value = null), I.k && (l[I.k] = null);
    }
  }
  if (se(c)) {
    Et();
    try {
      ma(c, r, 12, [s, l]);
    } finally {
      Tt();
    }
  } else {
    const I = Ne(c), k = /* @__PURE__ */ xe(c);
    if (I || k) {
      const N = () => {
        if (e.f) {
          const H = I ? f(c) ? u[c] : l[c] : g(c) || !e.k ? c.value : l[e.k];
          if (o)
            ie(H) && Fs(H, n);
          else if (ie(H))
            H.includes(n) || H.push(n);
          else if (I)
            l[c] = [n], f(c) && (u[c] = l[c]);
          else {
            const F = [n];
            g(c, e.k) && (c.value = F), e.k && (l[e.k] = F);
          }
        } else I ? (l[c] = s, f(c) && (u[c] = s)) : k ? (g(c, e.k) && (c.value = s), e.k && (l[e.k] = s)) : process.env.NODE_ENV !== "production" && j("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (s) {
        const H = () => {
          N(), Jo.delete(e);
        };
        H.id = -1, Jo.set(e, H), lt(H, i);
      } else
        qr(e), N();
    } else process.env.NODE_ENV !== "production" && j("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function qr(e) {
  const t = Jo.get(e);
  t && (t.flags |= 8, Jo.delete(e));
}
oo().requestIdleCallback;
oo().cancelIdleCallback;
const $a = (e) => !!e.type.__asyncLoader, Qs = (e) => e.type.__isKeepAlive;
function Bh(e, t) {
  tl(e, "a", t);
}
function Jh(e, t) {
  tl(e, "da", t);
}
function tl(e, t, i = We) {
  const a = e.__wdc || (e.__wdc = () => {
    let o = i;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (wn(t, a, i), i) {
    let o = i.parent;
    for (; o && o.parent; )
      Qs(o.parent.vnode) && Kh(a, t, i, o), o = o.parent;
  }
}
function Kh(e, t, i, a) {
  const o = wn(
    t,
    e,
    a,
    !0
    /* prepend */
  );
  al(() => {
    Fs(a[t], o);
  }, i);
}
function wn(e, t, i = We, a = !1) {
  if (i) {
    const o = i[e] || (i[e] = []), n = t.__weh || (t.__weh = (...s) => {
      Et();
      const r = uo(i), c = jt(t, i, e, s);
      return r(), Tt(), c;
    });
    return a ? o.unshift(n) : o.push(n), n;
  } else if (process.env.NODE_ENV !== "production") {
    const o = Ei(Js[e].replace(/ hook$/, ""));
    j(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const ci = (e) => (t, i = We) => {
  (!Ja || e === "sp") && wn(e, (...a) => t(...a), i);
}, Gh = ci("bm"), il = ci("m"), Wh = ci(
  "bu"
), Yh = ci("u"), er = ci(
  "bum"
), al = ci("um"), Xh = ci(
  "sp"
), Qh = ci("rtg"), eb = ci("rtc");
function tb(e, t = We) {
  wn("ec", e, t);
}
const ib = /* @__PURE__ */ Symbol.for("v-ndc");
function Ge(e, t, i, a) {
  let o;
  const n = i, s = ie(e);
  if (s || Ne(e)) {
    const r = s && /* @__PURE__ */ Dt(e);
    let c = !1, d = !1;
    r && (c = !/* @__PURE__ */ ot(e), d = /* @__PURE__ */ Pt(e), e = mn(e)), o = new Array(e.length);
    for (let l = 0, u = e.length; l < u; l++)
      o[l] = t(
        c ? d ? da(Rt(e[l])) : Rt(e[l]) : e[l],
        l,
        void 0,
        n
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      j(
        `The v-for range expects a positive integer value but got ${e}.`
      ), o = [];
    else {
      o = new Array(e);
      for (let r = 0; r < e; r++)
        o[r] = t(r + 1, r, void 0, n);
    }
  else if (ve(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (r, c) => t(r, c, void 0, n)
      );
    else {
      const r = Object.keys(e);
      o = new Array(r.length);
      for (let c = 0, d = r.length; c < d; c++) {
        const l = r[c];
        o[c] = t(e[l], l, c, n);
      }
    }
  else
    o = [];
  return o;
}
const us = (e) => e ? Sl(e) ? En(e) : us(e.parent) : null, Ui = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ He(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(e.refs) : e.refs,
    $parent: (e) => us(e.parent),
    $root: (e) => us(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => sl(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      yn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Za.bind(e.proxy)),
    $watch: (e) => qh.bind(e)
  })
), tr = (e) => e === "_" || e === "$", Zn = (e, t) => e !== Ae && !e.__isScriptSetup && _e(e, t), ol = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: i, setupState: a, data: o, props: n, accessCache: s, type: r, appContext: c } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const p = s[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return a[t];
          case 2:
            return o[t];
          case 4:
            return i[t];
          case 3:
            return n[t];
        }
      else {
        if (Zn(a, t))
          return s[t] = 1, a[t];
        if (o !== Ae && _e(o, t))
          return s[t] = 2, o[t];
        if (_e(n, t))
          return s[t] = 3, n[t];
        if (i !== Ae && _e(i, t))
          return s[t] = 4, i[t];
        ls && (s[t] = 0);
      }
    }
    const d = Ui[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (Ye(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Go()) : process.env.NODE_ENV !== "production" && t === "$slots" && Ye(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = r.__cssModules) && (l = l[t])
    )
      return l;
    if (i !== Ae && _e(i, t))
      return s[t] = 4, i[t];
    if (
      // global properties
      u = c.config.globalProperties, _e(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && dt && (!Ne(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== Ae && tr(t[0]) && _e(o, t) ? j(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === dt && j(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, i) {
    const { data: a, setupState: o, ctx: n } = e;
    return Zn(o, t) ? (o[t] = i, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && _e(o, t) ? (j(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : a !== Ae && _e(a, t) ? (a[t] = i, !0) : _e(e.props, t) ? (process.env.NODE_ENV !== "production" && j(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && j(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(n, t, {
      enumerable: !0,
      configurable: !0,
      value: i
    }) : n[t] = i, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: i, ctx: a, appContext: o, props: n, type: s }
  }, r) {
    let c;
    return !!(i[r] || e !== Ae && r[0] !== "$" && _e(e, r) || Zn(t, r) || _e(n, r) || _e(a, r) || _e(Ui, r) || _e(o.config.globalProperties, r) || (c = s.__cssModules) && c[r]);
  },
  defineProperty(e, t, i) {
    return i.get != null ? e._.accessCache[t] = 0 : _e(i, "value") && this.set(e, t, i.value, null), Reflect.defineProperty(e, t, i);
  }
};
process.env.NODE_ENV !== "production" && (ol.ownKeys = (e) => (j(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ab(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(Ui).forEach((i) => {
    Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !1,
      get: () => Ui[i](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Xe
    });
  }), t;
}
function ob(e) {
  const {
    ctx: t,
    propsOptions: [i]
  } = e;
  i && Object.keys(i).forEach((a) => {
    Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[a],
      set: Xe
    });
  });
}
function nb(e) {
  const { ctx: t, setupState: i } = e;
  Object.keys(/* @__PURE__ */ de(i)).forEach((a) => {
    if (!i.__isScriptSetup) {
      if (tr(a[0])) {
        j(
          `setup() return property ${JSON.stringify(
            a
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, a, {
        enumerable: !0,
        configurable: !0,
        get: () => i[a],
        set: Xe
      });
    }
  });
}
function Zr(e) {
  return ie(e) ? e.reduce(
    (t, i) => (t[i] = null, t),
    {}
  ) : e;
}
function sb() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, i) => {
    e[i] ? j(`${t} property "${i}" is already defined in ${e[i]}.`) : e[i] = t;
  };
}
let ls = !0;
function rb(e) {
  const t = sl(e), i = e.proxy, a = e.ctx;
  ls = !1, t.beforeCreate && Hr(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: n,
    methods: s,
    watch: r,
    provide: c,
    inject: d,
    // lifecycle
    created: l,
    beforeMount: u,
    mounted: p,
    beforeUpdate: f,
    updated: g,
    activated: I,
    deactivated: k,
    beforeDestroy: N,
    beforeUnmount: H,
    destroyed: F,
    unmounted: X,
    render: R,
    renderTracked: ue,
    renderTriggered: K,
    errorCaptured: ke,
    serverPrefetch: he,
    // public API
    expose: L,
    inheritAttrs: C,
    // assets
    components: re,
    directives: Ee,
    filters: Fe
  } = t, qe = process.env.NODE_ENV !== "production" ? sb() : null;
  if (process.env.NODE_ENV !== "production") {
    const [$] = e.propsOptions;
    if ($)
      for (const ae in $)
        qe("Props", ae);
  }
  if (d && cb(d, a, qe), s)
    for (const $ in s) {
      const ae = s[$];
      se(ae) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(a, $, {
        value: ae.bind(i),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : a[$] = ae.bind(i), process.env.NODE_ENV !== "production" && qe("Methods", $)) : process.env.NODE_ENV !== "production" && j(
        `Method "${$}" has type "${typeof ae}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (o) {
    process.env.NODE_ENV !== "production" && !se(o) && j(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const $ = o.call(i, i);
    if (process.env.NODE_ENV !== "production" && Ms($) && j(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !ve($))
      process.env.NODE_ENV !== "production" && j("data() should return an object.");
    else if (e.data = /* @__PURE__ */ _n($), process.env.NODE_ENV !== "production")
      for (const ae in $)
        qe("Data", ae), tr(ae[0]) || Object.defineProperty(a, ae, {
          configurable: !0,
          enumerable: !0,
          get: () => $[ae],
          set: Xe
        });
  }
  if (ls = !0, n)
    for (const $ in n) {
      const ae = n[$], T = se(ae) ? ae.bind(i, i) : se(ae.get) ? ae.get.bind(i, i) : Xe;
      process.env.NODE_ENV !== "production" && T === Xe && j(`Computed property "${$}" has no getter.`);
      const Q = !se(ae) && se(ae.set) ? ae.set.bind(i) : process.env.NODE_ENV !== "production" ? () => {
        j(
          `Write operation failed: computed property "${$}" is readonly.`
        );
      } : Xe, _ = at({
        get: T,
        set: Q
      });
      Object.defineProperty(a, $, {
        enumerable: !0,
        configurable: !0,
        get: () => _.value,
        set: (pe) => _.value = pe
      }), process.env.NODE_ENV !== "production" && qe("Computed", $);
    }
  if (r)
    for (const $ in r)
      nl(r[$], a, i, $);
  if (c) {
    const $ = se(c) ? c.call(i) : c;
    Reflect.ownKeys($).forEach((ae) => {
      Mh(ae, $[ae]);
    });
  }
  l && Hr(l, e, "c");
  function fe($, ae) {
    ie(ae) ? ae.forEach((T) => $(T.bind(i))) : ae && $(ae.bind(i));
  }
  if (fe(Gh, u), fe(il, p), fe(Wh, f), fe(Yh, g), fe(Bh, I), fe(Jh, k), fe(tb, ke), fe(eb, ue), fe(Qh, K), fe(er, H), fe(al, X), fe(Xh, he), ie(L))
    if (L.length) {
      const $ = e.exposed || (e.exposed = {});
      L.forEach((ae) => {
        Object.defineProperty($, ae, {
          get: () => i[ae],
          set: (T) => i[ae] = T,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  R && e.render === Xe && (e.render = R), C != null && (e.inheritAttrs = C), re && (e.components = re), Ee && (e.directives = Ee), he && el(e);
}
function cb(e, t, i = Xe) {
  ie(e) && (e = ps(e));
  for (const a in e) {
    const o = e[a];
    let n;
    ve(o) ? "default" in o ? n = $i(
      o.from || a,
      o.default,
      !0
    ) : n = $i(o.from || a) : n = $i(o), /* @__PURE__ */ xe(n) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => n.value,
      set: (s) => n.value = s
    }) : t[a] = n, process.env.NODE_ENV !== "production" && i("Inject", a);
  }
}
function Hr(e, t, i) {
  jt(
    ie(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy),
    t,
    i
  );
}
function nl(e, t, i, a) {
  let o = a.includes(".") ? Qu(i, a) : () => i[a];
  if (Ne(e)) {
    const n = t[e];
    se(n) ? na(o, n) : process.env.NODE_ENV !== "production" && j(`Invalid watch handler specified by key "${e}"`, n);
  } else if (se(e))
    na(o, e.bind(i));
  else if (ve(e))
    if (ie(e))
      e.forEach((n) => nl(n, t, i, a));
    else {
      const n = se(e.handler) ? e.handler.bind(i) : t[e.handler];
      se(n) ? na(o, n, e) : process.env.NODE_ENV !== "production" && j(`Invalid watch handler specified by key "${e.handler}"`, n);
    }
  else process.env.NODE_ENV !== "production" && j(`Invalid watch option: "${a}"`, e);
}
function sl(e) {
  const t = e.type, { mixins: i, extends: a } = t, {
    mixins: o,
    optionsCache: n,
    config: { optionMergeStrategies: s }
  } = e.appContext, r = n.get(t);
  let c;
  return r ? c = r : !o.length && !i && !a ? c = t : (c = {}, o.length && o.forEach(
    (d) => Ko(c, d, s, !0)
  ), Ko(c, t, s)), ve(t) && n.set(t, c), c;
}
function Ko(e, t, i, a = !1) {
  const { mixins: o, extends: n } = t;
  n && Ko(e, n, i, !0), o && o.forEach(
    (s) => Ko(e, s, i, !0)
  );
  for (const s in t)
    if (a && s === "expose")
      process.env.NODE_ENV !== "production" && j(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const r = db[s] || i && i[s];
      e[s] = r ? r(e[s], t[s]) : t[s];
    }
  return e;
}
const db = {
  data: Br,
  props: Jr,
  emits: Jr,
  // objects
  methods: Sa,
  computed: Sa,
  // lifecycle
  beforeCreate: nt,
  created: nt,
  beforeMount: nt,
  mounted: nt,
  beforeUpdate: nt,
  updated: nt,
  beforeDestroy: nt,
  beforeUnmount: nt,
  destroyed: nt,
  unmounted: nt,
  activated: nt,
  deactivated: nt,
  errorCaptured: nt,
  serverPrefetch: nt,
  // assets
  components: Sa,
  directives: Sa,
  // watch
  watch: lb,
  // provide / inject
  provide: Br,
  inject: ub
};
function Br(e, t) {
  return t ? e ? function() {
    return He(
      se(e) ? e.call(this, this) : e,
      se(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ub(e, t) {
  return Sa(ps(e), ps(t));
}
function ps(e) {
  if (ie(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++)
      t[e[i]] = e[i];
    return t;
  }
  return e;
}
function nt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Sa(e, t) {
  return e ? He(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Jr(e, t) {
  return e ? ie(e) && ie(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : He(
    /* @__PURE__ */ Object.create(null),
    Zr(e),
    Zr(t ?? {})
  ) : t;
}
function lb(e, t) {
  if (!e) return t;
  if (!t) return e;
  const i = He(/* @__PURE__ */ Object.create(null), e);
  for (const a in t)
    i[a] = nt(e[a], t[a]);
  return i;
}
function rl() {
  return {
    app: null,
    config: {
      isNativeTag: pu,
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
let pb = 0;
function fb(e, t) {
  return function(a, o = null) {
    se(a) || (a = He({}, a)), o != null && !ve(o) && (process.env.NODE_ENV !== "production" && j("root props passed to app.mount() must be an object."), o = null);
    const n = rl(), s = /* @__PURE__ */ new WeakSet(), r = [];
    let c = !1;
    const d = n.app = {
      _uid: pb++,
      _component: a,
      _props: o,
      _container: null,
      _context: n,
      _instance: null,
      version: nc,
      get config() {
        return n.config;
      },
      set config(l) {
        process.env.NODE_ENV !== "production" && j(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(l, ...u) {
        return s.has(l) ? process.env.NODE_ENV !== "production" && j("Plugin has already been applied to target app.") : l && se(l.install) ? (s.add(l), l.install(d, ...u)) : se(l) ? (s.add(l), l(d, ...u)) : process.env.NODE_ENV !== "production" && j(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(l) {
        return n.mixins.includes(l) ? process.env.NODE_ENV !== "production" && j(
          "Mixin has already been applied to target app" + (l.name ? `: ${l.name}` : "")
        ) : n.mixins.push(l), d;
      },
      component(l, u) {
        return process.env.NODE_ENV !== "production" && gs(l, n.config), u ? (process.env.NODE_ENV !== "production" && n.components[l] && j(`Component "${l}" has already been registered in target app.`), n.components[l] = u, d) : n.components[l];
      },
      directive(l, u) {
        return process.env.NODE_ENV !== "production" && Yu(l), u ? (process.env.NODE_ENV !== "production" && n.directives[l] && j(`Directive "${l}" has already been registered in target app.`), n.directives[l] = u, d) : n.directives[l];
      },
      mount(l, u, p) {
        if (c)
          process.env.NODE_ENV !== "production" && j(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && l.__vue_app__ && j(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const f = d._ceVNode || Ht(a, o);
          return f.appContext = n, p === !0 ? p = "svg" : p === !1 && (p = void 0), process.env.NODE_ENV !== "production" && (n.reload = () => {
            const g = bi(f);
            g.el = null, e(g, l, p);
          }), e(f, l, p), c = !0, d._container = l, l.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = f.component, Ch(d, nc)), En(f.component);
        }
      },
      onUnmount(l) {
        process.env.NODE_ENV !== "production" && typeof l != "function" && j(
          `Expected function as first argument to app.onUnmount(), but got ${typeof l}`
        ), r.push(l);
      },
      unmount() {
        c ? (jt(
          r,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Nh(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && j("Cannot unmount an app that is not mounted.");
      },
      provide(l, u) {
        return process.env.NODE_ENV !== "production" && l in n.provides && (_e(n.provides, l) ? j(
          `App already provides property with key "${String(l)}". It will be overwritten with the new value.`
        ) : j(
          `App already provides property with key "${String(l)}" inherited from its parent element. It will be overwritten with the new value.`
        )), n.provides[l] = u, d;
      },
      runWithContext(l) {
        const u = Fi;
        Fi = d;
        try {
          return l();
        } finally {
          Fi = u;
        }
      }
    };
    return d;
  };
}
let Fi = null;
const hb = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${pt(t)}Modifiers`] || e[`${oi(t)}Modifiers`];
function bb(e, t, ...i) {
  if (e.isUnmounted) return;
  const a = e.vnode.props || Ae;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: l,
      propsOptions: [u]
    } = e;
    if (l)
      if (!(t in l))
        (!u || !(Ei(pt(t)) in u)) && j(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Ei(pt(t))}" prop.`
        );
      else {
        const p = l[t];
        se(p) && (p(...i) || j(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let o = i;
  const n = t.startsWith("update:"), s = n && hb(a, t.slice(7));
  if (s && (s.trim && (o = i.map((l) => Ne(l) ? l.trim() : l)), s.number && (o = i.map(Ls))), process.env.NODE_ENV !== "production" && Uh(e, t, o), process.env.NODE_ENV !== "production") {
    const l = t.toLowerCase();
    l !== t && a[Ei(l)] && j(
      `Event "${l}" is emitted in component ${lo(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${oi(
        t
      )}" instead of "${t}".`
    );
  }
  let r, c = a[r = Ei(t)] || // also try camelCase event handler (#2249)
  a[r = Ei(pt(t))];
  !c && n && (c = a[r = Ei(oi(t))]), c && jt(
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
    e.emitted[r] = !0, jt(
      d,
      e,
      6,
      o
    );
  }
}
const mb = /* @__PURE__ */ new WeakMap();
function cl(e, t, i = !1) {
  const a = i ? mb : t.emitsCache, o = a.get(e);
  if (o !== void 0)
    return o;
  const n = e.emits;
  let s = {}, r = !1;
  if (!se(e)) {
    const c = (d) => {
      const l = cl(d, t, !0);
      l && (r = !0, He(s, l));
    };
    !i && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !n && !r ? (ve(e) && a.set(e, null), null) : (ie(n) ? n.forEach((c) => s[c] = null) : He(s, n), ve(e) && a.set(e, s), s);
}
function kn(e, t) {
  return !e || !io(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), _e(e, t[0].toLowerCase() + t.slice(1)) || _e(e, oi(t)) || _e(e, t));
}
let fs = !1;
function Go() {
  fs = !0;
}
function Kr(e) {
  const {
    type: t,
    vnode: i,
    proxy: a,
    withProxy: o,
    propsOptions: [n],
    slots: s,
    attrs: r,
    emit: c,
    render: d,
    renderCache: l,
    props: u,
    data: p,
    setupState: f,
    ctx: g,
    inheritAttrs: I
  } = e, k = Bo(e);
  let N, H;
  process.env.NODE_ENV !== "production" && (fs = !1);
  try {
    if (i.shapeFlag & 4) {
      const R = o || a, ue = process.env.NODE_ENV !== "production" && f.__isScriptSetup ? new Proxy(R, {
        get(K, ke, he) {
          return j(
            `Property '${String(
              ke
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(K, ke, he);
        }
      }) : R;
      N = Vt(
        d.call(
          ue,
          R,
          l,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(u) : u,
          f,
          p,
          g
        )
      ), H = r;
    } else {
      const R = t;
      process.env.NODE_ENV !== "production" && r === u && Go(), N = Vt(
        R.length > 1 ? R(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(u) : u,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return Go(), /* @__PURE__ */ qt(r);
            },
            slots: s,
            emit: c
          } : { attrs: r, slots: s, emit: c }
        ) : R(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(u) : u,
          null
        )
      ), H = t.props ? r : gb(r);
    }
  } catch (R) {
    Ua.length = 0, so(R, e, 1), N = Ht(yt);
  }
  let F = N, X;
  if (process.env.NODE_ENV !== "production" && N.patchFlag > 0 && N.patchFlag & 2048 && ([F, X] = dl(N)), H && I !== !1) {
    const R = Object.keys(H), { shapeFlag: ue } = F;
    if (R.length) {
      if (ue & 7)
        n && R.some(za) && (H = _b(
          H,
          n
        )), F = bi(F, H, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !fs && F.type !== yt) {
        const K = Object.keys(r), ke = [], he = [];
        for (let L = 0, C = K.length; L < C; L++) {
          const re = K[L];
          io(re) ? za(re) || ke.push(re[2].toLowerCase() + re.slice(3)) : he.push(re);
        }
        he.length && j(
          `Extraneous non-props attributes (${he.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), ke.length && j(
          `Extraneous non-emits event listeners (${ke.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return i.dirs && (process.env.NODE_ENV !== "production" && !Gr(F) && j(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), F = bi(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(i.dirs) : i.dirs), i.transition && (process.env.NODE_ENV !== "production" && !Gr(F) && j(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Ys(F, i.transition)), process.env.NODE_ENV !== "production" && X ? X(F) : N = F, Bo(k), N;
}
const dl = (e) => {
  const t = e.children, i = e.dynamicChildren, a = ir(t, !1);
  if (a) {
    if (process.env.NODE_ENV !== "production" && a.patchFlag > 0 && a.patchFlag & 2048)
      return dl(a);
  } else return [e, void 0];
  const o = t.indexOf(a), n = i ? i.indexOf(a) : -1, s = (r) => {
    t[o] = r, i && (n > -1 ? i[n] = r : r.patchFlag > 0 && (e.dynamicChildren = [...i, r]));
  };
  return [Vt(a), s];
};
function ir(e, t = !0) {
  let i;
  for (let a = 0; a < e.length; a++) {
    const o = e[a];
    if (In(o)) {
      if (o.type !== yt || o.children === "v-if") {
        if (i)
          return;
        if (i = o, process.env.NODE_ENV !== "production" && t && i.patchFlag > 0 && i.patchFlag & 2048)
          return ir(i.children);
      }
    } else
      return;
  }
  return i;
}
const gb = (e) => {
  let t;
  for (const i in e)
    (i === "class" || i === "style" || io(i)) && ((t || (t = {}))[i] = e[i]);
  return t;
}, _b = (e, t) => {
  const i = {};
  for (const a in e)
    (!za(a) || !(a.slice(9) in t)) && (i[a] = e[a]);
  return i;
}, Gr = (e) => e.shapeFlag & 7 || e.type === yt;
function vb(e, t, i) {
  const { props: a, children: o, component: n } = e, { props: s, children: r, patchFlag: c } = t, d = n.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (o || r) && _t || t.dirs || t.transition)
    return !0;
  if (i && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return a ? Wr(a, s, d) : !!s;
    if (c & 8) {
      const l = t.dynamicProps;
      for (let u = 0; u < l.length; u++) {
        const p = l[u];
        if (ul(s, a, p) && !kn(d, p))
          return !0;
      }
    }
  } else
    return (o || r) && (!r || !r.$stable) ? !0 : a === s ? !1 : a ? s ? Wr(a, s, d) : !0 : !!s;
  return !1;
}
function Wr(e, t, i) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < a.length; o++) {
    const n = a[o];
    if (ul(t, e, n) && !kn(i, n))
      return !0;
  }
  return !1;
}
function ul(e, t, i) {
  const a = e[i], o = t[i];
  return i === "style" && ve(a) && ve(o) ? !no(a, o) : a !== o;
}
function yb({ vnode: e, parent: t, suspense: i }, a) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.suspense.vnode.el = o.el = a, e = o), o === e)
      (e = t.vnode).el = a, t = t.parent;
    else
      break;
  }
  i && i.activeBranch === e && (i.vnode.el = a);
}
const ll = {}, pl = () => Object.create(ll), fl = (e) => Object.getPrototypeOf(e) === ll;
function wb(e, t, i, a = !1) {
  const o = {}, n = pl();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), hl(e, t, o, n);
  for (const s in e.propsOptions[0])
    s in o || (o[s] = void 0);
  process.env.NODE_ENV !== "production" && ml(t || {}, o, e), i ? e.props = a ? o : /* @__PURE__ */ uh(o) : e.type.props ? e.props = o : e.props = n, e.attrs = n;
}
function kb(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Ib(e, t, i, a) {
  const {
    props: o,
    attrs: n,
    vnode: { patchFlag: s }
  } = e, r = /* @__PURE__ */ de(o), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && kb(e)) && (a || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const l = e.vnode.dynamicProps;
      for (let u = 0; u < l.length; u++) {
        let p = l[u];
        if (kn(e.emitsOptions, p))
          continue;
        const f = t[p];
        if (c)
          if (_e(n, p))
            f !== n[p] && (n[p] = f, d = !0);
          else {
            const g = pt(p);
            o[g] = hs(
              c,
              r,
              g,
              f,
              e,
              !1
            );
          }
        else
          f !== n[p] && (n[p] = f, d = !0);
      }
    }
  } else {
    hl(e, t, o, n) && (d = !0);
    let l;
    for (const u in r)
      (!t || // for camelCase
      !_e(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((l = oi(u)) === u || !_e(t, l))) && (c ? i && // for camelCase
      (i[u] !== void 0 || // for kebab-case
      i[l] !== void 0) && (o[u] = hs(
        c,
        r,
        u,
        void 0,
        e,
        !0
      )) : delete o[u]);
    if (n !== r)
      for (const u in n)
        (!t || !_e(t, u)) && (delete n[u], d = !0);
  }
  d && Lt(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && ml(t || {}, o, e);
}
function hl(e, t, i, a) {
  const [o, n] = e.propsOptions;
  let s = !1, r;
  if (t)
    for (let c in t) {
      if (Da(c))
        continue;
      const d = t[c];
      let l;
      o && _e(o, l = pt(c)) ? !n || !n.includes(l) ? i[l] = d : (r || (r = {}))[l] = d : kn(e.emitsOptions, c) || (!(c in a) || d !== a[c]) && (a[c] = d, s = !0);
    }
  if (n) {
    const c = /* @__PURE__ */ de(i), d = r || Ae;
    for (let l = 0; l < n.length; l++) {
      const u = n[l];
      i[u] = hs(
        o,
        c,
        u,
        d[u],
        e,
        !_e(d, u)
      );
    }
  }
  return s;
}
function hs(e, t, i, a, o, n) {
  const s = e[i];
  if (s != null) {
    const r = _e(s, "default");
    if (r && a === void 0) {
      const c = s.default;
      if (s.type !== Function && !s.skipFactory && se(c)) {
        const { propsDefaults: d } = o;
        if (i in d)
          a = d[i];
        else {
          const l = uo(o);
          a = d[i] = c.call(
            null,
            t
          ), l();
        }
      } else
        a = c;
      o.ce && o.ce._setProp(i, a);
    }
    s[
      0
      /* shouldCast */
    ] && (n && !r ? a = !1 : s[
      1
      /* shouldCastTrue */
    ] && (a === "" || a === oi(i)) && (a = !0));
  }
  return a;
}
const Ab = /* @__PURE__ */ new WeakMap();
function bl(e, t, i = !1) {
  const a = i ? Ab : t.propsCache, o = a.get(e);
  if (o)
    return o;
  const n = e.props, s = {}, r = [];
  let c = !1;
  if (!se(e)) {
    const l = (u) => {
      c = !0;
      const [p, f] = bl(u, t, !0);
      He(s, p), f && r.push(...f);
    };
    !i && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  if (!n && !c)
    return ve(e) && a.set(e, aa), aa;
  if (ie(n))
    for (let l = 0; l < n.length; l++) {
      process.env.NODE_ENV !== "production" && !Ne(n[l]) && j("props must be strings when using array syntax.", n[l]);
      const u = pt(n[l]);
      Yr(u) && (s[u] = Ae);
    }
  else if (n) {
    process.env.NODE_ENV !== "production" && !ve(n) && j("invalid props options", n);
    for (const l in n) {
      const u = pt(l);
      if (Yr(u)) {
        const p = n[l], f = s[u] = ie(p) || se(p) ? { type: p } : He({}, p), g = f.type;
        let I = !1, k = !0;
        if (ie(g))
          for (let N = 0; N < g.length; ++N) {
            const H = g[N], F = se(H) && H.name;
            if (F === "Boolean") {
              I = !0;
              break;
            } else F === "String" && (k = !1);
          }
        else
          I = se(g) && g.name === "Boolean";
        f[
          0
          /* shouldCast */
        ] = I, f[
          1
          /* shouldCastTrue */
        ] = k, (I || _e(f, "default")) && r.push(u);
      }
    }
  }
  const d = [s, r];
  return ve(e) && a.set(e, d), d;
}
function Yr(e) {
  return e[0] !== "$" && !Da(e) ? !0 : (process.env.NODE_ENV !== "production" && j(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Eb(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function ml(e, t, i) {
  const a = /* @__PURE__ */ de(t), o = i.propsOptions[0], n = Object.keys(e).map((s) => pt(s));
  for (const s in o) {
    let r = o[s];
    r != null && Tb(
      s,
      a[s],
      r,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(a) : a,
      !n.includes(s)
    );
  }
}
function Tb(e, t, i, a, o) {
  const { type: n, required: s, validator: r, skipCheck: c } = i;
  if (s && o) {
    j('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !s)) {
    if (n != null && n !== !0 && !c) {
      let d = !1;
      const l = ie(n) ? n : [n], u = [];
      for (let p = 0; p < l.length && !d; p++) {
        const { valid: f, expectedType: g } = xb(t, l[p]);
        u.push(g || ""), d = f;
      }
      if (!d) {
        j(Ob(e, t, u));
        return;
      }
    }
    r && !r(t, a) && j('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Sb = /* @__PURE__ */ ri(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function xb(e, t) {
  let i;
  const a = Eb(t);
  if (a === "null")
    i = e === null;
  else if (Sb(a)) {
    const o = typeof e;
    i = o === a.toLowerCase(), !i && o === "object" && (i = e instanceof t);
  } else a === "Object" ? i = ve(e) : a === "Array" ? i = ie(e) : i = e instanceof t;
  return {
    valid: i,
    expectedType: a
  };
}
function Ob(e, t, i) {
  if (i.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let a = `Invalid prop: type check failed for prop "${e}". Expected ${i.map(hn).join(" | ")}`;
  const o = i[0], n = zs(t), s = Xr(t, o), r = Xr(t, n);
  return i.length === 1 && Qr(o) && Vb(o, n) && (a += ` with value ${s}`), a += `, got ${n} `, Qr(n) && (a += `with value ${r}.`), a;
}
function Xr(e, t) {
  return wt(e) ? e.toString() : t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Qr(e) {
  return ["string", "number", "boolean"].some((i) => e.toLowerCase() === i);
}
function Vb(...e) {
  return e.every((t) => {
    const i = t.toLowerCase();
    return i !== "boolean" && i !== "symbol";
  });
}
const ar = (e) => e === "_" || e === "_ctx" || e === "$stable", or = (e) => ie(e) ? e.map(Vt) : [Vt(e)], Cb = (e, t, i) => {
  if (t._n)
    return t;
  const a = Fh((...o) => (process.env.NODE_ENV !== "production" && We && !(i === null && dt) && !(i && i.root !== We.root) && j(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), or(t(...o))), i);
  return a._c = !1, a;
}, gl = (e, t, i) => {
  const a = e._ctx;
  for (const o in e) {
    if (ar(o)) continue;
    const n = e[o];
    if (se(n))
      t[o] = Cb(o, n, a);
    else if (n != null) {
      process.env.NODE_ENV !== "production" && j(
        `Non-function value encountered for slot "${o}". Prefer function slots for better performance.`
      );
      const s = or(n);
      t[o] = () => s;
    }
  }
}, _l = (e, t) => {
  process.env.NODE_ENV !== "production" && !Qs(e.vnode) && j(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const i = or(t);
  e.slots.default = () => i;
}, bs = (e, t, i) => {
  for (const a in t)
    (i || !ar(a)) && (e[a] = t[a]);
}, Nb = (e, t, i) => {
  const a = e.slots = pl();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (bs(a, t, i), i && zo(a, "_", o, !0)) : gl(t, a);
  } else t && _l(e, t);
}, Db = (e, t, i) => {
  const { vnode: a, slots: o } = e;
  let n = !0, s = Ae;
  if (a.shapeFlag & 32) {
    const r = t._;
    r ? process.env.NODE_ENV !== "production" && _t ? (bs(o, t, i), Lt(e, "set", "$slots")) : i && r === 1 ? n = !1 : bs(o, t, i) : (n = !t.$stable, gl(t, o)), s = t;
  } else t && (_l(e, t), s = { default: 1 });
  if (n)
    for (const r in o)
      !ar(r) && s[r] == null && delete o[r];
};
let ka, Yt;
function Ji(e, t) {
  e.appContext.config.performance && Wo() && Yt.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && jh(e, t, Wo() ? Yt.now() : Date.now());
}
function Ki(e, t) {
  if (e.appContext.config.performance && Wo()) {
    const i = `vue-${t}-${e.uid}`, a = i + ":end", o = `<${lo(e, e.type)}> ${t}`;
    Yt.mark(a), Yt.measure(o, i, a), Yt.clearMeasures(o), Yt.clearMarks(i), Yt.clearMarks(a);
  }
  process.env.NODE_ENV !== "production" && $h(e, t, Wo() ? Yt.now() : Date.now());
}
function Wo() {
  return ka !== void 0 || (typeof window < "u" && window.performance ? (ka = !0, Yt = window.performance) : ka = !1), ka;
}
function Pb() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const lt = Fb;
function Rb(e) {
  return jb(e);
}
function jb(e, t) {
  Pb();
  const i = oo();
  i.__VUE__ = !0, process.env.NODE_ENV !== "production" && Gs(i.__VUE_DEVTOOLS_GLOBAL_HOOK__, i);
  const {
    insert: a,
    remove: o,
    patchProp: n,
    createElement: s,
    createText: r,
    createComment: c,
    setText: d,
    setElementText: l,
    parentNode: u,
    nextSibling: p,
    setScopeId: f = Xe,
    insertStaticContent: g
  } = e, I = (h, b, y, V = null, E = null, A = null, U = void 0, P = null, D = process.env.NODE_ENV !== "production" && _t ? !1 : !!b.dynamicChildren) => {
    if (h === b)
      return;
    h && !Ia(h, b) && (V = Hi(h), De(h, E, A, !0), h = null), b.patchFlag === -2 && (D = !1, b.dynamicChildren = null);
    const { type: S, ref: oe, shapeFlag: z } = b;
    switch (S) {
      case co:
        k(h, b, y, V);
        break;
      case yt:
        N(h, b, y, V);
        break;
      case Do:
        h == null ? H(b, y, V, U) : process.env.NODE_ENV !== "production" && F(h, b, y, U);
        break;
      case we:
        Ee(
          h,
          b,
          y,
          V,
          E,
          A,
          U,
          P,
          D
        );
        break;
      default:
        z & 1 ? ue(
          h,
          b,
          y,
          V,
          E,
          A,
          U,
          P,
          D
        ) : z & 6 ? Fe(
          h,
          b,
          y,
          V,
          E,
          A,
          U,
          P,
          D
        ) : z & 64 || z & 128 ? S.process(
          h,
          b,
          y,
          V,
          E,
          A,
          U,
          P,
          D,
          wi
        ) : process.env.NODE_ENV !== "production" && j("Invalid VNode type:", S, `(${typeof S})`);
    }
    oe != null && E ? ja(oe, h && h.ref, A, b || h, !b) : oe == null && h && h.ref != null && ja(h.ref, null, A, h, !0);
  }, k = (h, b, y, V) => {
    if (h == null)
      a(
        b.el = r(b.children),
        y,
        V
      );
    else {
      const E = b.el = h.el;
      b.children !== h.children && d(E, b.children);
    }
  }, N = (h, b, y, V) => {
    h == null ? a(
      b.el = c(b.children || ""),
      y,
      V
    ) : b.el = h.el;
  }, H = (h, b, y, V) => {
    [h.el, h.anchor] = g(
      h.children,
      b,
      y,
      V,
      h.el,
      h.anchor
    );
  }, F = (h, b, y, V) => {
    if (b.children !== h.children) {
      const E = p(h.anchor);
      R(h), [b.el, b.anchor] = g(
        b.children,
        y,
        E,
        V
      );
    } else
      b.el = h.el, b.anchor = h.anchor;
  }, X = ({ el: h, anchor: b }, y, V) => {
    let E;
    for (; h && h !== b; )
      E = p(h), a(h, y, V), h = E;
    a(b, y, V);
  }, R = ({ el: h, anchor: b }) => {
    let y;
    for (; h && h !== b; )
      y = p(h), o(h), h = y;
    o(b);
  }, ue = (h, b, y, V, E, A, U, P, D) => {
    if (b.type === "svg" ? U = "svg" : b.type === "math" && (U = "mathml"), h == null)
      K(
        b,
        y,
        V,
        E,
        A,
        U,
        P,
        D
      );
    else {
      const S = h.el && h.el._isVueCE ? h.el : null;
      try {
        S && S._beginPatch(), L(
          h,
          b,
          E,
          A,
          U,
          P,
          D
        );
      } finally {
        S && S._endPatch();
      }
    }
  }, K = (h, b, y, V, E, A, U, P) => {
    let D, S;
    const { props: oe, shapeFlag: z, transition: te, dirs: ce } = h;
    if (D = h.el = s(
      h.type,
      A,
      oe && oe.is,
      oe
    ), z & 8 ? l(D, h.children) : z & 16 && he(
      h.children,
      D,
      null,
      V,
      E,
      Hn(h, A),
      U,
      P
    ), ce && Ii(h, null, V, "created"), ke(D, h, h.scopeId, U, V), oe) {
      for (const me in oe)
        me !== "value" && !Da(me) && n(D, me, null, oe[me], A, V);
      "value" in oe && n(D, "value", null, oe.value, A), (S = oe.onVnodeBeforeMount) && $t(S, V, h);
    }
    process.env.NODE_ENV !== "production" && (zo(D, "__vnode", h, !0), zo(D, "__vueParentComponent", V, !0)), ce && Ii(h, null, V, "beforeMount");
    const be = $b(E, te);
    if (be && te.beforeEnter(D), a(D, b, y), (S = oe && oe.onVnodeMounted) || be || ce) {
      const me = process.env.NODE_ENV !== "production" && _t;
      lt(() => {
        let ye;
        process.env.NODE_ENV !== "production" && (ye = Fr(me));
        try {
          S && $t(S, V, h), be && te.enter(D), ce && Ii(h, null, V, "mounted");
        } finally {
          process.env.NODE_ENV !== "production" && Fr(ye);
        }
      }, E);
    }
  }, ke = (h, b, y, V, E) => {
    if (y && f(h, y), V)
      for (let A = 0; A < V.length; A++)
        f(h, V[A]);
    if (E) {
      let A = E.subTree;
      if (process.env.NODE_ENV !== "production" && A.patchFlag > 0 && A.patchFlag & 2048 && (A = ir(A.children) || A), b === A || wl(A.type) && (A.ssContent === b || A.ssFallback === b)) {
        const U = E.vnode;
        ke(
          h,
          U,
          U.scopeId,
          U.slotScopeIds,
          E.parent
        );
      }
    }
  }, he = (h, b, y, V, E, A, U, P, D = 0) => {
    for (let S = D; S < h.length; S++) {
      const oe = h[S] = P ? Xt(h[S]) : Vt(h[S]);
      I(
        null,
        oe,
        b,
        y,
        V,
        E,
        A,
        U,
        P
      );
    }
  }, L = (h, b, y, V, E, A, U) => {
    const P = b.el = h.el;
    process.env.NODE_ENV !== "production" && (P.__vnode = b);
    let { patchFlag: D, dynamicChildren: S, dirs: oe } = b;
    D |= h.patchFlag & 16;
    const z = h.props || Ae, te = b.props || Ae;
    let ce;
    if (y && Ai(y, !1), (ce = te.onVnodeBeforeUpdate) && $t(ce, y, b, h), oe && Ii(b, h, y, "beforeUpdate"), y && Ai(y, !0), // HMR updated, force full diff
    (process.env.NODE_ENV !== "production" && _t || // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    S && (!h.dynamicChildren || h.dynamicChildren.length !== S.length)) && (D = 0, U = !1, S = null), (z.innerHTML && te.innerHTML == null || z.textContent && te.textContent == null) && l(P, ""), S ? (C(
      h.dynamicChildren,
      S,
      P,
      y,
      V,
      Hn(b, E),
      A
    ), process.env.NODE_ENV !== "production" && No(h, b)) : U || T(
      h,
      b,
      P,
      null,
      y,
      V,
      Hn(b, E),
      A,
      !1
    ), D > 0) {
      if (D & 16)
        re(P, z, te, y, E);
      else if (D & 2 && z.class !== te.class && n(P, "class", null, te.class, E), D & 4 && n(P, "style", z.style, te.style, E), D & 8) {
        const be = b.dynamicProps;
        for (let me = 0; me < be.length; me++) {
          const ye = be[me], Me = z[ye], Je = te[ye];
          (Je !== Me || ye === "value") && n(P, ye, Me, Je, E, y);
        }
      }
      D & 1 && h.children !== b.children && l(P, b.children);
    } else !U && S == null && re(P, z, te, y, E);
    ((ce = te.onVnodeUpdated) || oe) && lt(() => {
      ce && $t(ce, y, b, h), oe && Ii(b, h, y, "updated");
    }, V);
  }, C = (h, b, y, V, E, A, U) => {
    for (let P = 0; P < b.length; P++) {
      const D = h[P], S = b[P], oe = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (D.type === we || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ia(D, S) || // - In the case of a component, it could contain anything.
        D.shapeFlag & 198) ? u(D.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      I(
        D,
        S,
        oe,
        null,
        V,
        E,
        A,
        U,
        !0
      );
    }
  }, re = (h, b, y, V, E) => {
    if (b !== y) {
      if (b !== Ae)
        for (const A in b)
          !Da(A) && !(A in y) && n(
            h,
            A,
            b[A],
            null,
            E,
            V
          );
      for (const A in y) {
        if (Da(A)) continue;
        const U = y[A], P = b[A];
        U !== P && A !== "value" && n(h, A, P, U, E, V);
      }
      "value" in y && n(h, "value", b.value, y.value, E);
    }
  }, Ee = (h, b, y, V, E, A, U, P, D) => {
    const S = b.el = h ? h.el : r(""), oe = b.anchor = h ? h.anchor : r("");
    let { patchFlag: z, dynamicChildren: te, slotScopeIds: ce } = b;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (_t || z & 2048) && (z = 0, D = !1, te = null), ce && (P = P ? P.concat(ce) : ce), h == null ? (a(S, y, V), a(oe, y, V), he(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      b.children || [],
      y,
      oe,
      E,
      A,
      U,
      P,
      D
    )) : z > 0 && z & 64 && te && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    h.dynamicChildren && h.dynamicChildren.length === te.length ? (C(
      h.dynamicChildren,
      te,
      y,
      E,
      A,
      U,
      P
    ), process.env.NODE_ENV !== "production" ? No(h, b) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (b.key != null || E && b === E.subTree) && No(
        h,
        b,
        !0
        /* shallow */
      )
    )) : T(
      h,
      b,
      y,
      oe,
      E,
      A,
      U,
      P,
      D
    );
  }, Fe = (h, b, y, V, E, A, U, P, D) => {
    b.slotScopeIds = P, h == null ? b.shapeFlag & 512 ? E.ctx.activate(
      b,
      y,
      V,
      U,
      D
    ) : qe(
      b,
      y,
      V,
      E,
      A,
      U,
      D
    ) : fe(h, b, D);
  }, qe = (h, b, y, V, E, A, U) => {
    const P = h.component = Bb(
      h,
      V,
      E
    );
    if (process.env.NODE_ENV !== "production" && P.type.__hmrId && Sh(P), process.env.NODE_ENV !== "production" && (Oo(h), Ji(P, "mount")), Qs(h) && (P.ctx.renderer = wi), process.env.NODE_ENV !== "production" && Ji(P, "init"), Kb(P, !1, U), process.env.NODE_ENV !== "production" && Ki(P, "init"), process.env.NODE_ENV !== "production" && _t && (h.el = null), P.asyncDep) {
      if (E && E.registerDep(P, $, U), !h.el) {
        const D = P.subTree = Ht(yt);
        N(null, D, b, y), h.placeholder = D.el;
      }
    } else
      $(
        P,
        h,
        b,
        y,
        E,
        A,
        U
      );
    process.env.NODE_ENV !== "production" && (Vo(), Ki(P, "mount"));
  }, fe = (h, b, y) => {
    const V = b.component = h.component;
    if (vb(h, b, y))
      if (V.asyncDep && !V.asyncResolved) {
        process.env.NODE_ENV !== "production" && Oo(b), ae(V, b, y), process.env.NODE_ENV !== "production" && Vo();
        return;
      } else
        V.next = b, V.update();
    else
      b.el = h.el, V.vnode = b;
  }, $ = (h, b, y, V, E, A, U) => {
    const P = () => {
      if (h.isMounted) {
        let { next: z, bu: te, u: ce, parent: be, vnode: me } = h;
        {
          const x = vl(h);
          if (x) {
            z && (z.el = me.el, ae(h, z, U)), x.asyncDep.then(() => {
              lt(() => {
                h.isUnmounted || S();
              }, E);
            });
            return;
          }
        }
        let ye = z, Me;
        process.env.NODE_ENV !== "production" && Oo(z || h.vnode), Ai(h, !1), z ? (z.el = me.el, ae(h, z, U)) : z = me, te && Yi(te), (Me = z.props && z.props.onVnodeBeforeUpdate) && $t(Me, be, z, me), Ai(h, !0), process.env.NODE_ENV !== "production" && Ji(h, "render");
        const Je = Kr(h);
        process.env.NODE_ENV !== "production" && Ki(h, "render");
        const It = h.subTree;
        h.subTree = Je, process.env.NODE_ENV !== "production" && Ji(h, "patch"), I(
          It,
          Je,
          // parent may have changed if it's in a teleport
          u(It.el),
          // anchor may have changed if it's in a fragment
          Hi(It),
          h,
          E,
          A
        ), process.env.NODE_ENV !== "production" && Ki(h, "patch"), z.el = Je.el, ye === null && yb(h, Je.el), ce && lt(ce, E), (Me = z.props && z.props.onVnodeUpdated) && lt(
          () => $t(Me, be, z, me),
          E
        ), process.env.NODE_ENV !== "production" && Ku(h), process.env.NODE_ENV !== "production" && Vo();
      } else {
        let z;
        const { el: te, props: ce } = b, { bm: be, m: me, parent: ye, root: Me, type: Je } = h, It = $a(b);
        Ai(h, !1), be && Yi(be), !It && (z = ce && ce.onVnodeBeforeMount) && $t(z, ye, b), Ai(h, !0);
        {
          Me.ce && Me.ce._hasShadowRoot() && Me.ce._injectChildStyle(
            Je,
            h.parent ? h.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && Ji(h, "render");
          const x = h.subTree = Kr(h);
          process.env.NODE_ENV !== "production" && Ki(h, "render"), process.env.NODE_ENV !== "production" && Ji(h, "patch"), I(
            null,
            x,
            y,
            V,
            h,
            E,
            A
          ), process.env.NODE_ENV !== "production" && Ki(h, "patch"), b.el = x.el;
        }
        if (me && lt(me, E), !It && (z = ce && ce.onVnodeMounted)) {
          const x = b;
          lt(
            () => $t(z, ye, x),
            E
          );
        }
        (b.shapeFlag & 256 || ye && $a(ye.vnode) && ye.vnode.shapeFlag & 256) && h.a && lt(h.a, E), h.isMounted = !0, process.env.NODE_ENV !== "production" && Dh(h), b = y = V = null;
      }
    };
    h.scope.on();
    const D = h.effect = new ku(P);
    h.scope.off();
    const S = h.update = D.run.bind(D), oe = h.job = D.runIfDirty.bind(D);
    oe.i = h, oe.id = h.uid, D.scheduler = () => yn(oe), Ai(h, !0), process.env.NODE_ENV !== "production" && (D.onTrack = h.rtc ? (z) => Yi(h.rtc, z) : void 0, D.onTrigger = h.rtg ? (z) => Yi(h.rtg, z) : void 0), S();
  }, ae = (h, b, y) => {
    b.component = h;
    const V = h.vnode.props;
    h.vnode = b, h.next = null, Ib(h, b.props, V, y), Db(h, b.children, y), Et(), Ur(h), Tt();
  }, T = (h, b, y, V, E, A, U, P, D = !1) => {
    const S = h && h.children, oe = h ? h.shapeFlag : 0, z = b.children, { patchFlag: te, shapeFlag: ce } = b;
    if (te > 0) {
      if (te & 128) {
        _(
          S,
          z,
          y,
          V,
          E,
          A,
          U,
          P,
          D
        );
        return;
      } else if (te & 256) {
        Q(
          S,
          z,
          y,
          V,
          E,
          A,
          U,
          P,
          D
        );
        return;
      }
    }
    ce & 8 ? (oe & 16 && li(S, E, A), z !== S && l(y, z)) : oe & 16 ? ce & 16 ? _(
      S,
      z,
      y,
      V,
      E,
      A,
      U,
      P,
      D
    ) : li(S, E, A, !0) : (oe & 8 && l(y, ""), ce & 16 && he(
      z,
      y,
      V,
      E,
      A,
      U,
      P,
      D
    ));
  }, Q = (h, b, y, V, E, A, U, P, D) => {
    h = h || aa, b = b || aa;
    const S = h.length, oe = b.length, z = Math.min(S, oe);
    let te;
    for (te = 0; te < z; te++) {
      const ce = b[te] = D ? Xt(b[te]) : Vt(b[te]);
      I(
        h[te],
        ce,
        y,
        null,
        E,
        A,
        U,
        P,
        D
      );
    }
    S > oe ? li(
      h,
      E,
      A,
      !0,
      !1,
      z
    ) : he(
      b,
      y,
      V,
      E,
      A,
      U,
      P,
      D,
      z
    );
  }, _ = (h, b, y, V, E, A, U, P, D) => {
    let S = 0;
    const oe = b.length;
    let z = h.length - 1, te = oe - 1;
    for (; S <= z && S <= te; ) {
      const ce = h[S], be = b[S] = D ? Xt(b[S]) : Vt(b[S]);
      if (Ia(ce, be))
        I(
          ce,
          be,
          y,
          null,
          E,
          A,
          U,
          P,
          D
        );
      else
        break;
      S++;
    }
    for (; S <= z && S <= te; ) {
      const ce = h[z], be = b[te] = D ? Xt(b[te]) : Vt(b[te]);
      if (Ia(ce, be))
        I(
          ce,
          be,
          y,
          null,
          E,
          A,
          U,
          P,
          D
        );
      else
        break;
      z--, te--;
    }
    if (S > z) {
      if (S <= te) {
        const ce = te + 1, be = ce < oe ? b[ce].el : V;
        for (; S <= te; )
          I(
            null,
            b[S] = D ? Xt(b[S]) : Vt(b[S]),
            y,
            be,
            E,
            A,
            U,
            P,
            D
          ), S++;
      }
    } else if (S > te)
      for (; S <= z; )
        De(h[S], E, A, !0), S++;
    else {
      const ce = S, be = S, me = /* @__PURE__ */ new Map();
      for (S = be; S <= te; S++) {
        const ge = b[S] = D ? Xt(b[S]) : Vt(b[S]);
        ge.key != null && (process.env.NODE_ENV !== "production" && me.has(ge.key) && j(
          "Duplicate keys found during update:",
          JSON.stringify(ge.key),
          "Make sure keys are unique."
        ), me.set(ge.key, S));
      }
      let ye, Me = 0;
      const Je = te - be + 1;
      let It = !1, x = 0;
      const J = new Array(Je);
      for (S = 0; S < Je; S++) J[S] = 0;
      for (S = ce; S <= z; S++) {
        const ge = h[S];
        if (Me >= Je) {
          De(ge, E, A, !0);
          continue;
        }
        let Ze;
        if (ge.key != null)
          Ze = me.get(ge.key);
        else
          for (ye = be; ye <= te; ye++)
            if (J[ye - be] === 0 && Ia(ge, b[ye])) {
              Ze = ye;
              break;
            }
        Ze === void 0 ? De(ge, E, A, !0) : (J[Ze - be] = S + 1, Ze >= x ? x = Ze : It = !0, I(
          ge,
          b[Ze],
          y,
          null,
          E,
          A,
          U,
          P,
          D
        ), Me++);
      }
      const Oe = It ? Ub(J) : aa;
      for (ye = Oe.length - 1, S = Je - 1; S >= 0; S--) {
        const ge = be + S, Ze = b[ge], ki = b[ge + 1], _o = ge + 1 < oe ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ki.el || yl(ki)
        ) : V;
        J[S] === 0 ? I(
          null,
          Ze,
          y,
          _o,
          E,
          A,
          U,
          P,
          D
        ) : It && (ye < 0 || S !== Oe[ye] ? pe(Ze, y, _o, 2) : ye--);
      }
    }
  }, pe = (h, b, y, V, E = null) => {
    const { el: A, type: U, transition: P, children: D, shapeFlag: S } = h;
    if (S & 6) {
      pe(h.component.subTree, b, y, V);
      return;
    }
    if (S & 128) {
      h.suspense.move(b, y, V);
      return;
    }
    if (S & 64) {
      U.move(h, b, y, wi);
      return;
    }
    if (U === we) {
      a(A, b, y);
      for (let z = 0; z < D.length; z++)
        pe(D[z], b, y, V);
      a(h.anchor, b, y);
      return;
    }
    if (U === Do) {
      X(h, b, y);
      return;
    }
    if (V !== 2 && S & 1 && P)
      if (V === 0)
        P.persisted && !A[qn] ? a(A, b, y) : (P.beforeEnter(A), a(A, b, y), lt(() => P.enter(A), E));
      else {
        const { leave: z, delayLeave: te, afterLeave: ce } = P, be = () => {
          h.ctx.isUnmounted ? o(A) : a(A, b, y);
        }, me = () => {
          const ye = A._isLeaving || !!A[qn];
          A._isLeaving && A[qn](
            !0
            /* cancelled */
          ), P.persisted && !ye ? be() : z(A, () => {
            be(), ce && ce();
          });
        };
        te ? te(A, be, me) : me();
      }
    else
      a(A, b, y);
  }, De = (h, b, y, V = !1, E = !1) => {
    const {
      type: A,
      props: U,
      ref: P,
      children: D,
      dynamicChildren: S,
      shapeFlag: oe,
      patchFlag: z,
      dirs: te,
      cacheIndex: ce,
      memo: be
    } = h;
    if (z === -2 && (E = !1), P != null && (Et(), ja(P, null, y, h, !0), Tt()), ce != null && (b.renderCache[ce] = void 0), oe & 256) {
      b.ctx.deactivate(h);
      return;
    }
    const me = oe & 1 && te, ye = !$a(h);
    let Me;
    if (ye && (Me = U && U.onVnodeBeforeUnmount) && $t(Me, b, h), oe & 6)
      yi(h.component, y, V);
    else {
      if (oe & 128) {
        h.suspense.unmount(y, V);
        return;
      }
      me && Ii(h, null, b, "beforeUnmount"), oe & 64 ? h.type.remove(
        h,
        b,
        y,
        wi,
        V
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (A !== we || z > 0 && z & 64) ? li(
        S,
        b,
        y,
        !1,
        !0
      ) : (A === we && z & 384 || !E && oe & 16) && li(D, b, y), V && di(h);
    }
    const Je = be != null && ce == null;
    (ye && (Me = U && U.onVnodeUnmounted) || me || Je) && lt(() => {
      Me && $t(Me, b, h), me && Ii(h, null, b, "unmounted"), Je && (h.el = null);
    }, y);
  }, di = (h) => {
    const { type: b, el: y, anchor: V, transition: E } = h;
    if (b === we) {
      process.env.NODE_ENV !== "production" && h.patchFlag > 0 && h.patchFlag & 2048 && E && !E.persisted ? h.children.forEach((U) => {
        U.type === yt ? o(U.el) : di(U);
      }) : ui(y, V);
      return;
    }
    if (b === Do) {
      R(h);
      return;
    }
    const A = () => {
      o(y), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (h.shapeFlag & 1 && E && !E.persisted) {
      const { leave: U, delayLeave: P } = E, D = () => U(y, A);
      P ? P(h.el, A, D) : D();
    } else
      A();
  }, ui = (h, b) => {
    let y;
    for (; h !== b; )
      y = p(h), o(h), h = y;
    o(b);
  }, yi = (h, b, y) => {
    process.env.NODE_ENV !== "production" && h.type.__hmrId && xh(h);
    const { bum: V, scope: E, job: A, subTree: U, um: P, m: D, a: S } = h;
    ec(D), ec(S), V && Yi(V), E.stop(), A && (A.flags |= 8, De(U, h, b, y)), P && lt(P, b), lt(() => {
      h.isUnmounted = !0;
    }, b), process.env.NODE_ENV !== "production" && Rh(h);
  }, li = (h, b, y, V = !1, E = !1, A = 0) => {
    for (let U = A; U < h.length; U++)
      De(h[U], b, y, V, E);
  }, Hi = (h) => {
    if (h.shapeFlag & 6)
      return Hi(h.component.subTree);
    if (h.shapeFlag & 128)
      return h.suspense.next();
    const b = p(h.anchor || h.el), y = b && b[Zh];
    return y ? p(y) : b;
  };
  let ya = !1;
  const go = (h, b, y) => {
    let V;
    h == null ? b._vnode && (De(b._vnode, null, null, !0), V = b._vnode.component) : I(
      b._vnode || null,
      h,
      b,
      null,
      null,
      null,
      y
    ), b._vnode = h, ya || (ya = !0, Ur(V), Hu(), ya = !1);
  }, wi = {
    p: I,
    um: De,
    m: pe,
    r: di,
    mt: qe,
    mc: he,
    pc: T,
    pbc: C,
    n: Hi,
    o: e
  };
  return {
    render: go,
    hydrate: void 0,
    createApp: fb(go)
  };
}
function Hn({ type: e, props: t }, i) {
  return i === "svg" && e === "foreignObject" || i === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : i;
}
function Ai({ effect: e, job: t }, i) {
  i ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function $b(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function No(e, t, i = !1) {
  const a = e.children, o = t.children;
  if (ie(a) && ie(o))
    for (let n = 0; n < a.length; n++) {
      const s = a[n];
      let r = o[n];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = o[n] = Xt(o[n]), r.el = s.el), !i && r.patchFlag !== -2 && No(s, r)), r.type === co && (r.patchFlag === -1 && (r = o[n] = Xt(r)), r.el = s.el), r.type === yt && !r.el && (r.el = s.el), process.env.NODE_ENV !== "production" && r.el && (r.el.__vnode = r);
    }
}
function Ub(e) {
  const t = e.slice(), i = [0];
  let a, o, n, s, r;
  const c = e.length;
  for (a = 0; a < c; a++) {
    const d = e[a];
    if (d !== 0) {
      if (o = i[i.length - 1], e[o] < d) {
        t[a] = o, i.push(a);
        continue;
      }
      for (n = 0, s = i.length - 1; n < s; )
        r = n + s >> 1, e[i[r]] < d ? n = r + 1 : s = r;
      d < e[i[n]] && (n > 0 && (t[a] = i[n - 1]), i[n] = a);
    }
  }
  for (n = i.length, s = i[n - 1]; n-- > 0; )
    i[n] = s, s = t[s];
  return i;
}
function vl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : vl(t);
}
function ec(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function yl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? yl(t.subTree) : null;
}
const wl = (e) => e.__isSuspense;
function Fb(e, t) {
  t && t.pendingBranch ? ie(e) ? t.effects.push(...e) : t.effects.push(e) : Zu(e);
}
const we = /* @__PURE__ */ Symbol.for("v-fgt"), co = /* @__PURE__ */ Symbol.for("v-txt"), yt = /* @__PURE__ */ Symbol.for("v-cmt"), Do = /* @__PURE__ */ Symbol.for("v-stc"), Ua = [];
let vt = null;
function B(e = !1) {
  Ua.push(vt = e ? null : []);
}
function Mb() {
  Ua.pop(), vt = Ua[Ua.length - 1] || null;
}
let Ba = 1;
function tc(e, t = !1) {
  Ba += e, e < 0 && vt && t && (vt.hasOnce = !0);
}
function kl(e) {
  return e.dynamicChildren = Ba > 0 ? vt || aa : null, Mb(), Ba > 0 && vt && vt.push(e), e;
}
function G(e, t, i, a, o, n) {
  return kl(
    m(
      e,
      t,
      i,
      a,
      o,
      n,
      !0
    )
  );
}
function Il(e, t, i, a, o) {
  return kl(
    Ht(
      e,
      t,
      i,
      a,
      o,
      !0
    )
  );
}
function In(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ia(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const i = Co.get(t.type);
    if (i && i.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const zb = (...e) => El(
  ...e
), Al = ({ key: e }) => e ?? null, Po = ({
  ref: e,
  ref_key: t,
  ref_for: i
}) => (typeof e == "number" && (e = "" + e), e != null ? Ne(e) || /* @__PURE__ */ xe(e) || se(e) ? { i: dt, r: e, k: t, f: !!i } : e : null);
function m(e, t = null, i = null, a = 0, o = null, n = e === we ? 0 : 1, s = !1, r = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Al(t),
    ref: t && Po(t),
    scopeId: Wu,
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
    shapeFlag: n,
    patchFlag: a,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: dt
  };
  return r ? (Yo(c, i), n & 128 && e.normalize(c)) : i && (c.shapeFlag |= Ne(i) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && j("VNode created with invalid key (NaN). VNode type:", c.type), Ba > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  vt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || n & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && vt.push(c), c;
}
const Ht = process.env.NODE_ENV !== "production" ? zb : El;
function El(e, t = null, i = null, a = 0, o = null, n = !1) {
  if ((!e || e === ib) && (process.env.NODE_ENV !== "production" && !e && j(`Invalid vnode type when creating vnode: ${e}.`), e = yt), In(e)) {
    const r = bi(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return i && Yo(r, i), Ba > 0 && !n && vt && (r.shapeFlag & 6 ? vt[vt.indexOf(e)] = r : vt.push(r)), r.patchFlag = -2, r;
  }
  if (Vl(e) && (e = e.__vccOpts), t) {
    t = Lb(t);
    let { class: r, style: c } = t;
    r && !Ne(r) && (t.class = Ot(r)), ve(c) && (/* @__PURE__ */ ca(c) && !ie(c) && (c = He({}, c)), t.style = bn(c));
  }
  const s = Ne(e) ? 1 : wl(e) ? 128 : Hh(e) ? 64 : ve(e) ? 4 : se(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && s & 4 && /* @__PURE__ */ ca(e) && (e = /* @__PURE__ */ de(e), j(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), m(
    e,
    t,
    i,
    a,
    o,
    s,
    n,
    !0
  );
}
function Lb(e) {
  return e ? /* @__PURE__ */ ca(e) || fl(e) ? He({}, e) : e : null;
}
function bi(e, t, i = !1, a = !1) {
  const { props: o, ref: n, patchFlag: s, children: r, transition: c } = e, d = t ? qb(o || {}, t) : o, l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Al(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      i && n ? ie(n) ? n.concat(Po(t)) : [n, Po(t)] : Po(t)
    ) : n,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && ie(r) ? r.map(Tl) : r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== we ? s === -1 ? 16 : s | 16 : s,
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
    ssContent: e.ssContent && bi(e.ssContent),
    ssFallback: e.ssFallback && bi(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && a && Ys(
    l,
    c.clone(l)
  ), l;
}
function Tl(e) {
  const t = bi(e);
  return ie(e.children) && (t.children = e.children.map(Tl)), t;
}
function fi(e = " ", t = 0) {
  return Ht(co, null, e, t);
}
function mt(e = "", t = !1) {
  return t ? (B(), Il(yt, null, e)) : Ht(yt, null, e);
}
function Vt(e) {
  return e == null || typeof e == "boolean" ? Ht(yt) : ie(e) ? Ht(
    we,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : In(e) ? Xt(e) : Ht(co, null, String(e));
}
function Xt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : bi(e);
}
function Yo(e, t) {
  let i = 0;
  const { shapeFlag: a } = e;
  if (t == null)
    t = null;
  else if (ie(t))
    i = 16;
  else if (typeof t == "object")
    if (a & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Yo(e, o()), o._c && (o._d = !0));
      return;
    } else {
      i = 32;
      const o = t._;
      !o && !fl(t) ? t._ctx = dt : o === 3 && dt && (dt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (se(t)) {
    if (a & 65) {
      Yo(e, { default: t });
      return;
    }
    t = { default: t, _ctx: dt }, i = 32;
  } else
    t = String(t), a & 64 ? (i = 16, t = [fi(t)]) : i = 8;
  e.children = t, e.shapeFlag |= i;
}
function qb(...e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    for (const o in a)
      if (o === "class")
        t.class !== a.class && (t.class = Ot([t.class, a.class]));
      else if (o === "style")
        t.style = bn([t.style, a.style]);
      else if (io(o)) {
        const n = t[o], s = a[o];
        s && n !== s && !(ie(n) && n.includes(s)) ? t[o] = n ? [].concat(n, s) : s : s == null && n == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !za(o) && (t[o] = s);
      } else o !== "" && (t[o] = a[o]);
  }
  return t;
}
function $t(e, t, i, a = null) {
  jt(e, t, 7, [
    i,
    a
  ]);
}
const Zb = rl();
let Hb = 0;
function Bb(e, t, i) {
  const a = e.type, o = (t ? t.appContext : e.appContext) || Zb, n = {
    uid: Hb++,
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
    scope: new vu(
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
    propsOptions: bl(a, o),
    emitsOptions: cl(a, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ae,
    // inheritAttrs
    inheritAttrs: a.inheritAttrs,
    // state
    ctx: Ae,
    data: Ae,
    props: Ae,
    attrs: Ae,
    slots: Ae,
    refs: Ae,
    setupState: Ae,
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
  return process.env.NODE_ENV !== "production" ? n.ctx = ab(n) : n.ctx = { _: n }, n.root = t ? t.root : n, n.emit = bb.bind(null, n), e.ce && e.ce(n), n;
}
let We = null;
const An = () => We || dt;
let Xo, ms;
{
  const e = oo(), t = (i, a) => {
    let o;
    return (o = e[i]) || (o = e[i] = []), o.push(a), (n) => {
      o.length > 1 ? o.forEach((s) => s(n)) : o[0](n);
    };
  };
  Xo = t(
    "__VUE_INSTANCE_SETTERS__",
    (i) => We = i
  ), ms = t(
    "__VUE_SSR_SETTERS__",
    (i) => Ja = i
  );
}
const uo = (e) => {
  const t = We;
  return Xo(e), e.scope.on(), () => {
    e.scope.off(), Xo(t);
  };
}, ic = () => {
  We && We.scope.off(), Xo(null);
}, Jb = /* @__PURE__ */ ri("slot,component");
function gs(e, { isNativeTag: t }) {
  (Jb(e) || t(e)) && j(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Sl(e) {
  return e.vnode.shapeFlag & 4;
}
let Ja = !1;
function Kb(e, t = !1, i = !1) {
  t && ms(t);
  const { props: a, children: o } = e.vnode, n = Sl(e);
  wb(e, a, n, t), Nb(e, o, i || t);
  const s = n ? Gb(e, t) : void 0;
  return t && ms(!1), s;
}
function Gb(e, t) {
  const i = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (i.name && gs(i.name, e.appContext.config), i.components) {
      const o = Object.keys(i.components);
      for (let n = 0; n < o.length; n++)
        gs(o[n], e.appContext.config);
    }
    if (i.directives) {
      const o = Object.keys(i.directives);
      for (let n = 0; n < o.length; n++)
        Yu(o[n]);
    }
    i.compilerOptions && Wb() && j(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ol), process.env.NODE_ENV !== "production" && ob(e);
  const { setup: a } = i;
  if (a) {
    Et();
    const o = e.setupContext = a.length > 1 ? Xb(e) : null, n = uo(e), s = ma(
      a,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ qt(e.props) : e.props,
        o
      ]
    ), r = Ms(s);
    if (Tt(), n(), (r || e.sp) && !$a(e) && el(e), r) {
      if (s.then(ic, ic), t)
        return s.then((c) => {
          ac(e, c, t);
        }).catch((c) => {
          so(c, e, 0);
        });
      if (e.asyncDep = s, process.env.NODE_ENV !== "production" && !e.suspense) {
        const c = lo(e, i);
        j(
          `Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      ac(e, s, t);
  } else
    xl(e, t);
}
function ac(e, t, i) {
  se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ve(t) ? (process.env.NODE_ENV !== "production" && In(t) && j(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Fu(t), process.env.NODE_ENV !== "production" && nb(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && j(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), xl(e, i);
}
const Wb = () => !0;
function xl(e, t, i) {
  const a = e.type;
  e.render || (e.render = a.render || Xe);
  {
    const o = uo(e);
    Et();
    try {
      rb(e);
    } finally {
      Tt(), o();
    }
  }
  process.env.NODE_ENV !== "production" && !a.render && e.render === Xe && !t && (a.template ? j(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : j("Component is missing template or render function: ", a));
}
const oc = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return Go(), Ye(e, "get", ""), e[t];
  },
  set() {
    return j("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return j("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Ye(e, "get", ""), e[t];
  }
};
function Yb(e) {
  return new Proxy(e.slots, {
    get(t, i) {
      return Ye(e, "get", "$slots"), t[i];
    }
  });
}
function Xb(e) {
  const t = (i) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && j("expose() should be called only once per setup()."), i != null)) {
      let a = typeof i;
      a === "object" && (ie(i) ? a = "array" : /* @__PURE__ */ xe(i) && (a = "ref")), a !== "object" && j(
        `expose() should be passed a plain object, received ${a}.`
      );
    }
    e.exposed = i || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let i, a;
    return Object.freeze({
      get attrs() {
        return i || (i = new Proxy(e.attrs, oc));
      },
      get slots() {
        return a || (a = Yb(e));
      },
      get emit() {
        return (o, ...n) => e.emit(o, ...n);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, oc),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function En(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Fu(Zt(e.exposed)), {
    get(t, i) {
      if (i in t)
        return t[i];
      if (i in Ui)
        return Ui[i](e);
    },
    has(t, i) {
      return i in t || i in Ui;
    }
  })) : e.proxy;
}
const Qb = /(?:^|[-_])\w/g, em = (e) => e.replace(Qb, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ol(e, t = !0) {
  return se(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function lo(e, t, i = !1) {
  let a = Ol(t);
  if (!a && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (a = o[1]);
  }
  if (!a && e) {
    const o = (n) => {
      for (const s in n)
        if (n[s] === t)
          return s;
    };
    a = o(e.components) || e.parent && o(
      e.parent.type.components
    ) || o(e.appContext.components);
  }
  return a ? em(a) : i ? "App" : "Anonymous";
}
function Vl(e) {
  return se(e) && "__vccOpts" in e;
}
const at = (e, t) => {
  const i = /* @__PURE__ */ gh(e, t, Ja);
  if (process.env.NODE_ENV !== "production") {
    const a = An();
    a && a.appContext.config.warnRecursiveComputed && (i._warnRecursive = !0);
  }
  return i;
};
function tm() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, i = { style: "color:#f5222d" }, a = { style: "color:#eb2f96" }, o = {
    __vue_custom_formatter: !0,
    header(u) {
      if (!ve(u))
        return null;
      if (u.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ xe(u)) {
        Et();
        const p = u.value;
        return Tt(), [
          "div",
          {},
          ["span", e, l(u)],
          "<",
          r(p),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ Dt(u))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ ot(u) ? "ShallowReactive" : "Reactive"],
            "<",
            r(u),
            `>${/* @__PURE__ */ Pt(u) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ Pt(u))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ ot(u) ? "ShallowReadonly" : "Readonly"],
            "<",
            r(u),
            ">"
          ];
      }
      return null;
    },
    hasBody(u) {
      return u && u.__isVue;
    },
    body(u) {
      if (u && u.__isVue)
        return [
          "div",
          {},
          ...n(u.$)
        ];
    }
  };
  function n(u) {
    const p = [];
    u.type.props && u.props && p.push(s("props", /* @__PURE__ */ de(u.props))), u.setupState !== Ae && p.push(s("setup", u.setupState)), u.data !== Ae && p.push(s("data", /* @__PURE__ */ de(u.data)));
    const f = c(u, "computed");
    f && p.push(s("computed", f));
    const g = c(u, "inject");
    return g && p.push(s("injected", g)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: a.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: u }]
    ]), p;
  }
  function s(u, p) {
    return p = He({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        u
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((f) => [
          "div",
          {},
          ["span", a, f + ": "],
          r(p[f], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function r(u, p = !0) {
    return typeof u == "number" ? ["span", t, u] : typeof u == "string" ? ["span", i, JSON.stringify(u)] : typeof u == "boolean" ? ["span", a, u] : ve(u) ? ["object", { object: p ? /* @__PURE__ */ de(u) : u }] : ["span", i, String(u)];
  }
  function c(u, p) {
    const f = u.type;
    if (se(f))
      return;
    const g = {};
    for (const I in u.ctx)
      d(f, I, p) && (g[I] = u.ctx[I]);
    return g;
  }
  function d(u, p, f) {
    const g = u[f];
    if (ie(g) && g.includes(p) || ve(g) && p in g || u.extends && d(u.extends, p, f) || u.mixins && u.mixins.some((I) => d(I, p, f)))
      return !0;
  }
  function l(u) {
    return /* @__PURE__ */ ot(u) ? "ShallowRef" : u.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const nc = "3.5.39", ai = process.env.NODE_ENV !== "production" ? j : Xe;
process.env.NODE_ENV;
process.env.NODE_ENV;
let _s;
const sc = typeof window < "u" && window.trustedTypes;
if (sc)
  try {
    _s = /* @__PURE__ */ sc.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && ai(`Error creating trusted types policy: ${e}`);
  }
const Cl = _s ? (e) => _s.createHTML(e) : (e) => e, im = "http://www.w3.org/2000/svg", am = "http://www.w3.org/1998/Math/MathML", Wt = typeof document < "u" ? document : null, rc = Wt && /* @__PURE__ */ Wt.createElement("template"), om = {
  insert: (e, t, i) => {
    t.insertBefore(e, i || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, i, a) => {
    const o = t === "svg" ? Wt.createElementNS(im, e) : t === "mathml" ? Wt.createElementNS(am, e) : i ? Wt.createElement(e, { is: i }) : Wt.createElement(e);
    return e === "select" && a && a.multiple != null && o.setAttribute("multiple", a.multiple), o;
  },
  createText: (e) => Wt.createTextNode(e),
  createComment: (e) => Wt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Wt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, i, a, o, n) {
    const s = i ? i.previousSibling : t.lastChild;
    if (o && (o === n || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), i), !(o === n || !(o = o.nextSibling)); )
        ;
    else {
      rc.innerHTML = Cl(
        a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e
      );
      const r = rc.content;
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
      s ? s.nextSibling : t.firstChild,
      // last
      i ? i.previousSibling : t.lastChild
    ];
  }
}, nm = /* @__PURE__ */ Symbol("_vtc");
function sm(e, t, i) {
  const a = e[nm];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : i ? e.setAttribute("class", t) : e.className = t;
}
const Qo = /* @__PURE__ */ Symbol("_vod"), Nl = /* @__PURE__ */ Symbol("_vsh"), Aa = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: i }) {
    e[Qo] = e.style.display === "none" ? "" : e.style.display, i && t ? i.beforeEnter(e) : Ea(e, t);
  },
  mounted(e, { value: t }, { transition: i }) {
    i && t && i.enter(e);
  },
  updated(e, { value: t, oldValue: i }, { transition: a }) {
    !t != !i && (a ? t ? (a.beforeEnter(e), Ea(e, !0), a.enter(e)) : a.leave(e, () => {
      Ea(e, !1);
    }) : Ea(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ea(e, t);
  }
};
function Ea(e, t) {
  e.style.display = t ? e[Qo] : "none", e[Nl] = !t;
}
const rm = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), cm = /(?:^|;)\s*display\s*:/;
function dm(e, t, i) {
  const a = e.style, o = Ne(i);
  let n = !1;
  if (i && !o) {
    if (t)
      if (Ne(t))
        for (const s of t.split(";")) {
          const r = s.slice(0, s.indexOf(":")).trim();
          i[r] == null && xa(a, r, "");
        }
      else
        for (const s in t)
          i[s] == null && xa(a, s, "");
    for (const s in i) {
      s === "display" && (n = !0);
      const r = i[s];
      r != null ? pm(
        e,
        s,
        !Ne(t) && t ? t[s] : void 0,
        r
      ) || xa(a, s, r) : xa(a, s, "");
    }
  } else if (o) {
    if (t !== i) {
      const s = a[rm];
      s && (i += ";" + s), a.cssText = i, n = cm.test(i);
    }
  } else t && e.removeAttribute("style");
  Qo in e && (e[Qo] = n ? a.display : "", e[Nl] && (a.display = "none"));
}
const um = /[^\\];\s*$/, cc = /\s*!important$/;
function xa(e, t, i) {
  if (ie(i))
    i.forEach((a) => xa(e, t, a));
  else if (i == null && (i = ""), process.env.NODE_ENV !== "production" && um.test(i) && ai(
    `Unexpected semicolon at the end of '${t}' style value: '${i}'`
  ), t.startsWith("--"))
    e.setProperty(t, i);
  else {
    const a = lm(e, t);
    cc.test(i) ? e.setProperty(
      oi(a),
      i.replace(cc, ""),
      "important"
    ) : e[a] = i;
  }
}
const dc = ["Webkit", "Moz", "ms"], Bn = {};
function lm(e, t) {
  const i = Bn[t];
  if (i)
    return i;
  let a = pt(t);
  if (a !== "filter" && a in e)
    return Bn[t] = a;
  a = hn(a);
  for (let o = 0; o < dc.length; o++) {
    const n = dc[o] + a;
    if (n in e)
      return Bn[t] = n;
  }
  return t;
}
function pm(e, t, i, a) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Ne(a) && i === a;
}
const uc = "http://www.w3.org/1999/xlink";
function lc(e, t, i, a, o, n = qf(t)) {
  a && t.startsWith("xlink:") ? i == null ? e.removeAttributeNS(uc, t.slice(6, t.length)) : e.setAttributeNS(uc, t, i) : i == null || n && !bu(i) ? e.removeAttribute(t) : e.setAttribute(
    t,
    n ? "" : wt(i) ? String(i) : i
  );
}
function pc(e, t, i, a, o) {
  if (t === "innerHTML" || t === "textContent") {
    i != null && (e[t] = t === "innerHTML" ? Cl(i) : i);
    return;
  }
  const n = e.tagName;
  if (t === "value" && n !== "PROGRESS" && // custom elements may use _value internally
  !n.includes("-")) {
    const r = n === "OPTION" ? e.getAttribute("value") || "" : e.value, c = i == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(i);
    (r !== c || !("_value" in e)) && (e.value = c), i == null && e.removeAttribute(t), e._value = i;
    return;
  }
  let s = !1;
  if (i === "" || i == null) {
    const r = typeof e[t];
    r === "boolean" ? i = bu(i) : i == null && r === "string" ? (i = "", s = !0) : r === "number" && (i = 0, s = !0);
  }
  try {
    e[t] = i;
  } catch (r) {
    process.env.NODE_ENV !== "production" && !s && ai(
      `Failed setting prop "${t}" on <${n.toLowerCase()}>: value ${i} is invalid.`,
      r
    );
  }
  s && e.removeAttribute(o || t);
}
function Vi(e, t, i, a) {
  e.addEventListener(t, i, a);
}
function fm(e, t, i, a) {
  e.removeEventListener(t, i, a);
}
const fc = /* @__PURE__ */ Symbol("_vei");
function hm(e, t, i, a, o = null) {
  const n = e[fc] || (e[fc] = {}), s = n[t];
  if (a && s)
    s.value = process.env.NODE_ENV !== "production" ? hc(a, t) : a;
  else {
    const [r, c] = gm(t);
    if (a) {
      const d = n[t] = ym(
        process.env.NODE_ENV !== "production" ? hc(a, t) : a,
        o
      );
      Vi(e, r, d, c);
    } else s && (fm(e, r, s, c), n[t] = void 0);
  }
}
const bm = /(Once|Passive|Capture)$/, mm = /^on:?(?:Once|Passive|Capture)$/;
function gm(e) {
  let t, i;
  for (; (i = e.match(bm)) && !mm.test(e); )
    t || (t = {}), e = e.slice(0, e.length - i[1].length), t[i[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : oi(e.slice(2)), t];
}
let Jn = 0;
const _m = /* @__PURE__ */ Promise.resolve(), vm = () => Jn || (_m.then(() => Jn = 0), Jn = Date.now());
function ym(e, t) {
  const i = (a) => {
    if (!a._vts)
      a._vts = Date.now();
    else if (a._vts <= i.attached)
      return;
    const o = i.value;
    if (ie(o)) {
      const n = a.stopImmediatePropagation;
      a.stopImmediatePropagation = () => {
        n.call(a), a._stopped = !0;
      };
      const s = o.slice(), r = [a];
      for (let c = 0; c < s.length && !a._stopped; c++) {
        const d = s[c];
        d && jt(
          d,
          t,
          5,
          r
        );
      }
    } else
      jt(
        o,
        t,
        5,
        [a]
      );
  };
  return i.value = e, i.attached = vm(), i;
}
function hc(e, t) {
  return se(e) || ie(e) ? e : (ai(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Xe);
}
const bc = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, wm = (e, t, i, a, o, n) => {
  const s = o === "svg";
  t === "class" ? sm(e, a, s) : t === "style" ? dm(e, i, a) : io(t) ? za(t) || hm(e, t, i, a, n) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : km(e, t, a, s)) ? (pc(e, t, a), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && lc(e, t, a, s, n, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Im(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ne(a))) ? pc(e, pt(t), a, n, t) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), lc(e, t, a, s));
};
function km(e, t, i, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && bc(t) && se(i));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return bc(t) && Ne(i) ? !1 : t in e;
}
function Im(e, t) {
  const i = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!i)
    return !1;
  const a = pt(t);
  return Array.isArray(i) ? i.some((o) => pt(o) === a) : Object.keys(i).some((o) => pt(o) === a);
}
const en = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ie(t) ? (i) => Yi(t, i) : t;
};
function Am(e) {
  e.target.composing = !0;
}
function mc(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const sa = /* @__PURE__ */ Symbol("_assign");
function gc(e, t, i) {
  return t && (e = e.trim()), i && (e = Ls(e)), e;
}
const _c = {
  created(e, { modifiers: { lazy: t, trim: i, number: a } }, o) {
    e[sa] = en(o);
    const n = a || o.props && o.props.type === "number";
    Vi(e, t ? "change" : "input", (s) => {
      s.target.composing || e[sa](gc(e.value, i, n));
    }), (i || n) && Vi(e, "change", () => {
      e.value = gc(e.value, i, n);
    }), t || (Vi(e, "compositionstart", Am), Vi(e, "compositionend", mc), Vi(e, "change", mc));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: i, modifiers: { lazy: a, trim: o, number: n } }, s) {
    if (e[sa] = en(s), e.composing) return;
    const r = (n || e.type === "number") && !/^0\d/.test(e.value) ? Ls(e.value) : e.value, c = t ?? "";
    if (r === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (a && t === i || o && e.value.trim() === c) || (e.value = c);
  }
}, vc = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, i) {
    e[sa] = en(i), Vi(e, "change", () => {
      const a = e._modelValue, o = Em(e), n = e.checked, s = e[sa];
      if (ie(a)) {
        const r = mu(a, o), c = r !== -1;
        if (n && !c)
          s(a.concat(o));
        else if (!n && c) {
          const d = [...a];
          d.splice(r, 1), s(d);
        }
      } else if (ln(a)) {
        const r = new Set(a);
        n ? r.add(o) : r.delete(o), s(r);
      } else
        s(Dl(e, n));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: yc,
  beforeUpdate(e, t, i) {
    e[sa] = en(i), yc(e, t, i);
  }
};
function yc(e, { value: t, oldValue: i }, a) {
  e._modelValue = t;
  let o;
  if (ie(t))
    o = mu(t, a.props.value) > -1;
  else if (ln(t))
    o = t.has(a.props.value);
  else {
    if (t === i) return;
    o = no(t, Dl(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
function Em(e) {
  return "_value" in e ? e._value : e.value;
}
function Dl(e, t) {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}
const Tm = ["ctrl", "shift", "alt", "meta"], Sm = {
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
  exact: (e, t) => Tm.some((i) => e[`${i}Key`] && !t.includes(i))
}, tn = (e, t) => {
  if (!e) return e;
  const i = e._withMods || (e._withMods = {}), a = t.join(".");
  return i[a] || (i[a] = ((o, ...n) => {
    for (let s = 0; s < t.length; s++) {
      const r = Sm[t[s]];
      if (r && r(o, t)) return;
    }
    return e(o, ...n);
  }));
}, xm = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, wc = (e, t) => {
  const i = e._withKeys || (e._withKeys = {}), a = t.join(".");
  return i[a] || (i[a] = ((o) => {
    if (!("key" in o))
      return;
    const n = oi(o.key);
    if (t.some(
      (s) => s === n || xm[s] === n
    ))
      return e(o);
  }));
}, Om = /* @__PURE__ */ He({ patchProp: wm }, om);
let kc;
function Vm() {
  return kc || (kc = Rb(Om));
}
const Cm = ((...e) => {
  const t = Vm().createApp(...e);
  process.env.NODE_ENV !== "production" && (Dm(t), Pm(t));
  const { mount: i } = t;
  return t.mount = (a) => {
    const o = Rm(a);
    if (!o) return;
    const n = t._component;
    !se(n) && !n.render && !n.template && (n.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const s = i(o, !1, Nm(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), s;
  }, t;
});
function Nm(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Dm(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Ff(t) || Mf(t) || zf(t),
    writable: !1
  });
}
function Pm(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ai(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const i = e.config.compilerOptions, a = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ai(a), i;
      },
      set() {
        ai(a);
      }
    });
  }
}
function Rm(e) {
  if (Ne(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && ai(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ai(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
function jm() {
  tm();
}
process.env.NODE_ENV !== "production" && jm();
var $m = Object.create, Pl = Object.defineProperty, Um = Object.getOwnPropertyDescriptor, nr = Object.getOwnPropertyNames, Fm = Object.getPrototypeOf, Mm = Object.prototype.hasOwnProperty, zm = (e, t) => function() {
  return e && (t = (0, e[nr(e)[0]])(e = 0)), t;
}, Lm = (e, t) => function() {
  return t || (0, e[nr(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, qm = (e, t, i, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of nr(t))
      !Mm.call(e, o) && o !== i && Pl(e, o, { get: () => t[o], enumerable: !(a = Um(t, o)) || a.enumerable });
  return e;
}, Zm = (e, t, i) => (i = e != null ? $m(Fm(e)) : {}, qm(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Pl(i, "default", { value: e, enumerable: !0 }),
  e
)), po = zm({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), Hm = Lm({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    po(), t.exports = a;
    function i(n) {
      return n instanceof Buffer ? Buffer.from(n) : new n.constructor(n.buffer.slice(), n.byteOffset, n.length);
    }
    function a(n) {
      if (n = n || {}, n.circles) return o(n);
      const s = /* @__PURE__ */ new Map();
      if (s.set(Date, (u) => new Date(u)), s.set(Map, (u, p) => new Map(c(Array.from(u), p))), s.set(Set, (u, p) => new Set(c(Array.from(u), p))), n.constructorHandlers)
        for (const u of n.constructorHandlers)
          s.set(u[0], u[1]);
      let r = null;
      return n.proto ? l : d;
      function c(u, p) {
        const f = Object.keys(u), g = new Array(f.length);
        for (let I = 0; I < f.length; I++) {
          const k = f[I], N = u[k];
          typeof N != "object" || N === null ? g[k] = N : N.constructor !== Object && (r = s.get(N.constructor)) ? g[k] = r(N, p) : ArrayBuffer.isView(N) ? g[k] = i(N) : g[k] = p(N);
        }
        return g;
      }
      function d(u) {
        if (typeof u != "object" || u === null) return u;
        if (Array.isArray(u)) return c(u, d);
        if (u.constructor !== Object && (r = s.get(u.constructor)))
          return r(u, d);
        const p = {};
        for (const f in u) {
          if (Object.hasOwnProperty.call(u, f) === !1) continue;
          const g = u[f];
          typeof g != "object" || g === null ? p[f] = g : g.constructor !== Object && (r = s.get(g.constructor)) ? p[f] = r(g, d) : ArrayBuffer.isView(g) ? p[f] = i(g) : p[f] = d(g);
        }
        return p;
      }
      function l(u) {
        if (typeof u != "object" || u === null) return u;
        if (Array.isArray(u)) return c(u, l);
        if (u.constructor !== Object && (r = s.get(u.constructor)))
          return r(u, l);
        const p = {};
        for (const f in u) {
          const g = u[f];
          typeof g != "object" || g === null ? p[f] = g : g.constructor !== Object && (r = s.get(g.constructor)) ? p[f] = r(g, l) : ArrayBuffer.isView(g) ? p[f] = i(g) : p[f] = l(g);
        }
        return p;
      }
    }
    function o(n) {
      const s = [], r = [], c = /* @__PURE__ */ new Map();
      if (c.set(Date, (f) => new Date(f)), c.set(Map, (f, g) => new Map(l(Array.from(f), g))), c.set(Set, (f, g) => new Set(l(Array.from(f), g))), n.constructorHandlers)
        for (const f of n.constructorHandlers)
          c.set(f[0], f[1]);
      let d = null;
      return n.proto ? p : u;
      function l(f, g) {
        const I = Object.keys(f), k = new Array(I.length);
        for (let N = 0; N < I.length; N++) {
          const H = I[N], F = f[H];
          if (typeof F != "object" || F === null)
            k[H] = F;
          else if (F.constructor !== Object && (d = c.get(F.constructor)))
            k[H] = d(F, g);
          else if (ArrayBuffer.isView(F))
            k[H] = i(F);
          else {
            const X = s.indexOf(F);
            X !== -1 ? k[H] = r[X] : k[H] = g(F);
          }
        }
        return k;
      }
      function u(f) {
        if (typeof f != "object" || f === null) return f;
        if (Array.isArray(f)) return l(f, u);
        if (f.constructor !== Object && (d = c.get(f.constructor)))
          return d(f, u);
        const g = {};
        s.push(f), r.push(g);
        for (const I in f) {
          if (Object.hasOwnProperty.call(f, I) === !1) continue;
          const k = f[I];
          if (typeof k != "object" || k === null)
            g[I] = k;
          else if (k.constructor !== Object && (d = c.get(k.constructor)))
            g[I] = d(k, u);
          else if (ArrayBuffer.isView(k))
            g[I] = i(k);
          else {
            const N = s.indexOf(k);
            N !== -1 ? g[I] = r[N] : g[I] = u(k);
          }
        }
        return s.pop(), r.pop(), g;
      }
      function p(f) {
        if (typeof f != "object" || f === null) return f;
        if (Array.isArray(f)) return l(f, p);
        if (f.constructor !== Object && (d = c.get(f.constructor)))
          return d(f, p);
        const g = {};
        s.push(f), r.push(g);
        for (const I in f) {
          const k = f[I];
          if (typeof k != "object" || k === null)
            g[I] = k;
          else if (k.constructor !== Object && (d = c.get(k.constructor)))
            g[I] = d(k, p);
          else if (ArrayBuffer.isView(k))
            g[I] = i(k);
          else {
            const N = s.indexOf(k);
            N !== -1 ? g[I] = r[N] : g[I] = p(k);
          }
        }
        return s.pop(), r.pop(), g;
      }
    }
  }
});
po();
po();
po();
var Rl = typeof navigator < "u", W = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof W.chrome < "u" && W.chrome.devtools;
Rl && (W.self, W.top);
var Ic;
typeof navigator < "u" && ((Ic = navigator.userAgent) == null || Ic.toLowerCase().includes("electron"));
po();
var Bm = Zm(Hm()), Jm = /(?:^|[-_/])(\w)/g;
function Km(e, t) {
  return t ? t.toUpperCase() : "";
}
function Gm(e) {
  return e && `${e}`.replace(Jm, Km);
}
function Wm(e, t) {
  let i = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  i.endsWith(`index${t}`) && (i = i.replace(`/index${t}`, t));
  const a = i.lastIndexOf("/"), o = i.substring(a + 1);
  {
    const n = o.lastIndexOf(t);
    return o.substring(0, n);
  }
}
var Ac = (0, Bm.default)({ circles: !0 });
const Ym = {
  trailing: !0
};
function ua(e, t = 25, i = {}) {
  if (i = { ...Ym, ...i }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let a, o, n = [], s, r;
  const c = (d, l) => (s = Xm(e, d, l), s.finally(() => {
    if (s = null, i.trailing && r && !o) {
      const u = c(d, r);
      return r = null, u;
    }
  }), s);
  return function(...d) {
    return s ? (i.trailing && (r = d), s) : new Promise((l) => {
      const u = !o && i.leading;
      clearTimeout(o), o = setTimeout(() => {
        o = null;
        const p = i.leading ? a : c(this, d);
        for (const f of n)
          f(p);
        n = [];
      }, t), u ? (a = c(this, d), l(a)) : n.push(l);
    });
  };
}
async function Xm(e, t, i) {
  return await e.apply(t, i);
}
function vs(e, t = {}, i) {
  for (const a in e) {
    const o = e[a], n = i ? `${i}:${a}` : a;
    typeof o == "object" && o !== null ? vs(o, t, n) : typeof o == "function" && (t[n] = o);
  }
  return t;
}
const Qm = { run: (e) => e() }, e0 = () => Qm, jl = typeof console.createTask < "u" ? console.createTask : e0;
function t0(e, t) {
  const i = t.shift(), a = jl(i);
  return e.reduce(
    (o, n) => o.then(() => a.run(() => n(...t))),
    Promise.resolve()
  );
}
function i0(e, t) {
  const i = t.shift(), a = jl(i);
  return Promise.all(e.map((o) => a.run(() => o(...t))));
}
function Kn(e, t) {
  for (const i of [...e])
    i(t);
}
class a0 {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, i, a = {}) {
    if (!t || typeof i != "function")
      return () => {
      };
    const o = t;
    let n;
    for (; this._deprecatedHooks[t]; )
      n = this._deprecatedHooks[t], t = n.to;
    if (n && !a.allowDeprecated) {
      let s = n.message;
      s || (s = `${o} hook has been deprecated` + (n.to ? `, please use ${n.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(s) || (console.warn(s), this._deprecatedMessages.add(s));
    }
    if (!i.name)
      try {
        Object.defineProperty(i, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0
        });
      } catch {
      }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(i), () => {
      i && (this.removeHook(t, i), i = void 0);
    };
  }
  hookOnce(t, i) {
    let a, o = (...n) => (typeof a == "function" && a(), a = void 0, o = void 0, i(...n));
    return a = this.hook(t, o), a;
  }
  removeHook(t, i) {
    if (this._hooks[t]) {
      const a = this._hooks[t].indexOf(i);
      a !== -1 && this._hooks[t].splice(a, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, i) {
    this._deprecatedHooks[t] = typeof i == "string" ? { to: i } : i;
    const a = this._hooks[t] || [];
    delete this._hooks[t];
    for (const o of a)
      this.hook(t, o);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const i in t)
      this.deprecateHook(i, t[i]);
  }
  addHooks(t) {
    const i = vs(t), a = Object.keys(i).map(
      (o) => this.hook(o, i[o])
    );
    return () => {
      for (const o of a.splice(0, a.length))
        o();
    };
  }
  removeHooks(t) {
    const i = vs(t);
    for (const a in i)
      this.removeHook(a, i[a]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...i) {
    return i.unshift(t), this.callHookWith(t0, t, ...i);
  }
  callHookParallel(t, ...i) {
    return i.unshift(t), this.callHookWith(i0, t, ...i);
  }
  callHookWith(t, i, ...a) {
    const o = this._before || this._after ? { name: i, args: a, context: {} } : void 0;
    this._before && Kn(this._before, o);
    const n = t(
      i in this._hooks ? [...this._hooks[i]] : [],
      a
    );
    return n instanceof Promise ? n.finally(() => {
      this._after && o && Kn(this._after, o);
    }) : (this._after && o && Kn(this._after, o), n);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const i = this._before.indexOf(t);
        i !== -1 && this._before.splice(i, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const i = this._after.indexOf(t);
        i !== -1 && this._after.splice(i, 1);
      }
    };
  }
}
function $l() {
  return new a0();
}
var o0 = Object.create, Ul = Object.defineProperty, n0 = Object.getOwnPropertyDescriptor, sr = Object.getOwnPropertyNames, s0 = Object.getPrototypeOf, r0 = Object.prototype.hasOwnProperty, c0 = (e, t) => function() {
  return e && (t = (0, e[sr(e)[0]])(e = 0)), t;
}, Fl = (e, t) => function() {
  return t || (0, e[sr(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, d0 = (e, t, i, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of sr(t))
      !r0.call(e, o) && o !== i && Ul(e, o, { get: () => t[o], enumerable: !(a = n0(t, o)) || a.enumerable });
  return e;
}, u0 = (e, t, i) => (i = e != null ? o0(s0(e)) : {}, d0(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Ul(i, "default", { value: e, enumerable: !0 }),
  e
)), M = c0({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), l0 = Fl({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    M(), (function(i) {
      var a = {
        // latin
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "Ae",
        Å: "A",
        Æ: "AE",
        Ç: "C",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        Ð: "D",
        Ñ: "N",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "Oe",
        Ő: "O",
        Ø: "O",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "Ue",
        Ű: "U",
        Ý: "Y",
        Þ: "TH",
        ß: "ss",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "ae",
        å: "a",
        æ: "ae",
        ç: "c",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ð: "d",
        ñ: "n",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "oe",
        ő: "o",
        ø: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "ue",
        ű: "u",
        ý: "y",
        þ: "th",
        ÿ: "y",
        "ẞ": "SS",
        // language specific
        // Arabic
        ا: "a",
        أ: "a",
        إ: "i",
        آ: "aa",
        ؤ: "u",
        ئ: "e",
        ء: "a",
        ب: "b",
        ت: "t",
        ث: "th",
        ج: "j",
        ح: "h",
        خ: "kh",
        د: "d",
        ذ: "th",
        ر: "r",
        ز: "z",
        س: "s",
        ش: "sh",
        ص: "s",
        ض: "dh",
        ط: "t",
        ظ: "z",
        ع: "a",
        غ: "gh",
        ف: "f",
        ق: "q",
        ك: "k",
        ل: "l",
        م: "m",
        ن: "n",
        ه: "h",
        و: "w",
        ي: "y",
        ى: "a",
        ة: "h",
        ﻻ: "la",
        ﻷ: "laa",
        ﻹ: "lai",
        ﻵ: "laa",
        // Persian additional characters than Arabic
        گ: "g",
        چ: "ch",
        پ: "p",
        ژ: "zh",
        ک: "k",
        ی: "y",
        // Arabic diactrics
        "َ": "a",
        "ً": "an",
        "ِ": "e",
        "ٍ": "en",
        "ُ": "u",
        "ٌ": "on",
        "ْ": "",
        // Arabic numbers
        "٠": "0",
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        // Persian numbers
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        // Burmese consonants
        က: "k",
        ခ: "kh",
        ဂ: "g",
        ဃ: "ga",
        င: "ng",
        စ: "s",
        ဆ: "sa",
        ဇ: "z",
        "စျ": "za",
        ည: "ny",
        ဋ: "t",
        ဌ: "ta",
        ဍ: "d",
        ဎ: "da",
        ဏ: "na",
        တ: "t",
        ထ: "ta",
        ဒ: "d",
        ဓ: "da",
        န: "n",
        ပ: "p",
        ဖ: "pa",
        ဗ: "b",
        ဘ: "ba",
        မ: "m",
        ယ: "y",
        ရ: "ya",
        လ: "l",
        ဝ: "w",
        သ: "th",
        ဟ: "h",
        ဠ: "la",
        အ: "a",
        // consonant character combos
        "ြ": "y",
        "ျ": "ya",
        "ွ": "w",
        "ြွ": "yw",
        "ျွ": "ywa",
        "ှ": "h",
        // independent vowels
        ဧ: "e",
        "၏": "-e",
        ဣ: "i",
        ဤ: "-i",
        ဉ: "u",
        ဦ: "-u",
        ဩ: "aw",
        "သြော": "aw",
        ဪ: "aw",
        // numbers
        "၀": "0",
        "၁": "1",
        "၂": "2",
        "၃": "3",
        "၄": "4",
        "၅": "5",
        "၆": "6",
        "၇": "7",
        "၈": "8",
        "၉": "9",
        // virama and tone marks which are silent in transliteration
        "္": "",
        "့": "",
        "း": "",
        // Czech
        č: "c",
        ď: "d",
        ě: "e",
        ň: "n",
        ř: "r",
        š: "s",
        ť: "t",
        ů: "u",
        ž: "z",
        Č: "C",
        Ď: "D",
        Ě: "E",
        Ň: "N",
        Ř: "R",
        Š: "S",
        Ť: "T",
        Ů: "U",
        Ž: "Z",
        // Dhivehi
        ހ: "h",
        ށ: "sh",
        ނ: "n",
        ރ: "r",
        ބ: "b",
        ޅ: "lh",
        ކ: "k",
        އ: "a",
        ވ: "v",
        މ: "m",
        ފ: "f",
        ދ: "dh",
        ތ: "th",
        ލ: "l",
        ގ: "g",
        ޏ: "gn",
        ސ: "s",
        ޑ: "d",
        ޒ: "z",
        ޓ: "t",
        ޔ: "y",
        ޕ: "p",
        ޖ: "j",
        ޗ: "ch",
        ޘ: "tt",
        ޙ: "hh",
        ޚ: "kh",
        ޛ: "th",
        ޜ: "z",
        ޝ: "sh",
        ޞ: "s",
        ޟ: "d",
        ޠ: "t",
        ޡ: "z",
        ޢ: "a",
        ޣ: "gh",
        ޤ: "q",
        ޥ: "w",
        "ަ": "a",
        "ާ": "aa",
        "ި": "i",
        "ީ": "ee",
        "ު": "u",
        "ޫ": "oo",
        "ެ": "e",
        "ޭ": "ey",
        "ޮ": "o",
        "ޯ": "oa",
        "ް": "",
        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        ა: "a",
        ბ: "b",
        გ: "g",
        დ: "d",
        ე: "e",
        ვ: "v",
        ზ: "z",
        თ: "t",
        ი: "i",
        კ: "k",
        ლ: "l",
        მ: "m",
        ნ: "n",
        ო: "o",
        პ: "p",
        ჟ: "zh",
        რ: "r",
        ს: "s",
        ტ: "t",
        უ: "u",
        ფ: "p",
        ქ: "k",
        ღ: "gh",
        ყ: "q",
        შ: "sh",
        ჩ: "ch",
        ც: "ts",
        ძ: "dz",
        წ: "ts",
        ჭ: "ch",
        ხ: "kh",
        ჯ: "j",
        ჰ: "h",
        // Greek
        α: "a",
        β: "v",
        γ: "g",
        δ: "d",
        ε: "e",
        ζ: "z",
        η: "i",
        θ: "th",
        ι: "i",
        κ: "k",
        λ: "l",
        μ: "m",
        ν: "n",
        ξ: "ks",
        ο: "o",
        π: "p",
        ρ: "r",
        σ: "s",
        τ: "t",
        υ: "y",
        φ: "f",
        χ: "x",
        ψ: "ps",
        ω: "o",
        ά: "a",
        έ: "e",
        ί: "i",
        ό: "o",
        ύ: "y",
        ή: "i",
        ώ: "o",
        ς: "s",
        ϊ: "i",
        ΰ: "y",
        ϋ: "y",
        ΐ: "i",
        Α: "A",
        Β: "B",
        Γ: "G",
        Δ: "D",
        Ε: "E",
        Ζ: "Z",
        Η: "I",
        Θ: "TH",
        Ι: "I",
        Κ: "K",
        Λ: "L",
        Μ: "M",
        Ν: "N",
        Ξ: "KS",
        Ο: "O",
        Π: "P",
        Ρ: "R",
        Σ: "S",
        Τ: "T",
        Υ: "Y",
        Φ: "F",
        Χ: "X",
        Ψ: "PS",
        Ω: "O",
        Ά: "A",
        Έ: "E",
        Ί: "I",
        Ό: "O",
        Ύ: "Y",
        Ή: "I",
        Ώ: "O",
        Ϊ: "I",
        Ϋ: "Y",
        // Latvian
        ā: "a",
        // 'č': 'c', // duplicate
        ē: "e",
        ģ: "g",
        ī: "i",
        ķ: "k",
        ļ: "l",
        ņ: "n",
        // 'š': 's', // duplicate
        ū: "u",
        // 'ž': 'z', // duplicate
        Ā: "A",
        // 'Č': 'C', // duplicate
        Ē: "E",
        Ģ: "G",
        Ī: "I",
        Ķ: "k",
        Ļ: "L",
        Ņ: "N",
        // 'Š': 'S', // duplicate
        Ū: "U",
        // 'Ž': 'Z', // duplicate
        // Macedonian
        Ќ: "Kj",
        ќ: "kj",
        Љ: "Lj",
        љ: "lj",
        Њ: "Nj",
        њ: "nj",
        Тс: "Ts",
        тс: "ts",
        // Polish
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        // 'ó': 'o', // duplicate
        ś: "s",
        ź: "z",
        ż: "z",
        Ą: "A",
        Ć: "C",
        Ę: "E",
        Ł: "L",
        Ń: "N",
        Ś: "S",
        Ź: "Z",
        Ż: "Z",
        // Ukranian
        Є: "Ye",
        І: "I",
        Ї: "Yi",
        Ґ: "G",
        є: "ye",
        і: "i",
        ї: "yi",
        ґ: "g",
        // Romanian
        ă: "a",
        Ă: "A",
        ș: "s",
        Ș: "S",
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        ț: "t",
        Ț: "T",
        ţ: "t",
        Ţ: "T",
        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "i",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sh",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
        А: "A",
        Б: "B",
        В: "V",
        Г: "G",
        Д: "D",
        Е: "E",
        Ё: "Yo",
        Ж: "Zh",
        З: "Z",
        И: "I",
        Й: "I",
        К: "K",
        Л: "L",
        М: "M",
        Н: "N",
        О: "O",
        П: "P",
        Р: "R",
        С: "S",
        Т: "T",
        У: "U",
        Ф: "F",
        Х: "Kh",
        Ц: "C",
        Ч: "Ch",
        Ш: "Sh",
        Щ: "Sh",
        Ъ: "",
        Ы: "Y",
        Ь: "",
        Э: "E",
        Ю: "Yu",
        Я: "Ya",
        // Serbian
        ђ: "dj",
        ј: "j",
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        ћ: "c",
        џ: "dz",
        Ђ: "Dj",
        Ј: "j",
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        Ћ: "C",
        Џ: "Dz",
        // Slovak
        ľ: "l",
        ĺ: "l",
        ŕ: "r",
        Ľ: "L",
        Ĺ: "L",
        Ŕ: "R",
        // Turkish
        ş: "s",
        Ş: "S",
        ı: "i",
        İ: "I",
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        ğ: "g",
        Ğ: "G",
        // Vietnamese
        ả: "a",
        Ả: "A",
        ẳ: "a",
        Ẳ: "A",
        ẩ: "a",
        Ẩ: "A",
        đ: "d",
        Đ: "D",
        ẹ: "e",
        Ẹ: "E",
        ẽ: "e",
        Ẽ: "E",
        ẻ: "e",
        Ẻ: "E",
        ế: "e",
        Ế: "E",
        ề: "e",
        Ề: "E",
        ệ: "e",
        Ệ: "E",
        ễ: "e",
        Ễ: "E",
        ể: "e",
        Ể: "E",
        ỏ: "o",
        ọ: "o",
        Ọ: "o",
        ố: "o",
        Ố: "O",
        ồ: "o",
        Ồ: "O",
        ổ: "o",
        Ổ: "O",
        ộ: "o",
        Ộ: "O",
        ỗ: "o",
        Ỗ: "O",
        ơ: "o",
        Ơ: "O",
        ớ: "o",
        Ớ: "O",
        ờ: "o",
        Ờ: "O",
        ợ: "o",
        Ợ: "O",
        ỡ: "o",
        Ỡ: "O",
        Ở: "o",
        ở: "o",
        ị: "i",
        Ị: "I",
        ĩ: "i",
        Ĩ: "I",
        ỉ: "i",
        Ỉ: "i",
        ủ: "u",
        Ủ: "U",
        ụ: "u",
        Ụ: "U",
        ũ: "u",
        Ũ: "U",
        ư: "u",
        Ư: "U",
        ứ: "u",
        Ứ: "U",
        ừ: "u",
        Ừ: "U",
        ự: "u",
        Ự: "U",
        ữ: "u",
        Ữ: "U",
        ử: "u",
        Ử: "ư",
        ỷ: "y",
        Ỷ: "y",
        ỳ: "y",
        Ỳ: "Y",
        ỵ: "y",
        Ỵ: "Y",
        ỹ: "y",
        Ỹ: "Y",
        ạ: "a",
        Ạ: "A",
        ấ: "a",
        Ấ: "A",
        ầ: "a",
        Ầ: "A",
        ậ: "a",
        Ậ: "A",
        ẫ: "a",
        Ẫ: "A",
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        ắ: "a",
        Ắ: "A",
        ằ: "a",
        Ằ: "A",
        ặ: "a",
        Ặ: "A",
        ẵ: "a",
        Ẵ: "A",
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",
        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",
        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",
        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",
        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",
        // symbols
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "∂": "d",
        ƒ: "f",
        "™": "(TM)",
        "©": "(C)",
        œ: "oe",
        Œ: "OE",
        "®": "(R)",
        "†": "+",
        "℠": "(SM)",
        "…": "...",
        "˚": "o",
        º: "o",
        ª: "a",
        "•": "*",
        "၊": ",",
        "။": ".",
        // currency
        $: "USD",
        "€": "EUR",
        "₢": "BRN",
        "₣": "FRF",
        "£": "GBP",
        "₤": "ITL",
        "₦": "NGN",
        "₧": "ESP",
        "₩": "KRW",
        "₪": "ILS",
        "₫": "VND",
        "₭": "LAK",
        "₮": "MNT",
        "₯": "GRD",
        "₱": "ARS",
        "₲": "PYG",
        "₳": "ARA",
        "₴": "UAH",
        "₵": "GHS",
        "¢": "cent",
        "¥": "CNY",
        元: "CNY",
        円: "YEN",
        "﷼": "IRR",
        "₠": "EWE",
        "฿": "THB",
        "₨": "INR",
        "₹": "INR",
        "₰": "PF",
        "₺": "TRY",
        "؋": "AFN",
        "₼": "AZN",
        лв: "BGN",
        "៛": "KHR",
        "₡": "CRC",
        "₸": "KZT",
        ден: "MKD",
        zł: "PLN",
        "₽": "RUB",
        "₾": "GEL"
      }, o = [
        // burmese
        "်",
        // Dhivehi
        "ް"
      ], n = {
        // Burmese
        // dependent vowels
        "ာ": "a",
        "ါ": "a",
        "ေ": "e",
        "ဲ": "e",
        "ိ": "i",
        "ီ": "i",
        "ို": "o",
        "ု": "u",
        "ူ": "u",
        "ေါင်": "aung",
        "ော": "aw",
        "ော်": "aw",
        "ေါ": "aw",
        "ေါ်": "aw",
        "်": "်",
        // this is special case but the character will be converted to latin in the code
        "က်": "et",
        "ိုက်": "aik",
        "ောက်": "auk",
        "င်": "in",
        "ိုင်": "aing",
        "ောင်": "aung",
        "စ်": "it",
        "ည်": "i",
        "တ်": "at",
        "ိတ်": "eik",
        "ုတ်": "ok",
        "ွတ်": "ut",
        "ေတ်": "it",
        "ဒ်": "d",
        "ိုဒ်": "ok",
        "ုဒ်": "ait",
        "န်": "an",
        "ာန်": "an",
        "ိန်": "ein",
        "ုန်": "on",
        "ွန်": "un",
        "ပ်": "at",
        "ိပ်": "eik",
        "ုပ်": "ok",
        "ွပ်": "ut",
        "န်ုပ်": "nub",
        "မ်": "an",
        "ိမ်": "ein",
        "ုမ်": "on",
        "ွမ်": "un",
        "ယ်": "e",
        "ိုလ်": "ol",
        "ဉ်": "in",
        "ံ": "an",
        "ိံ": "ein",
        "ုံ": "on",
        // Dhivehi
        "ައް": "ah",
        "ަށް": "ah"
      }, s = {
        en: {},
        // default language
        az: {
          // Azerbaijani
          ç: "c",
          ə: "e",
          ğ: "g",
          ı: "i",
          ö: "o",
          ş: "s",
          ü: "u",
          Ç: "C",
          Ə: "E",
          Ğ: "G",
          İ: "I",
          Ö: "O",
          Ş: "S",
          Ü: "U"
        },
        cs: {
          // Czech
          č: "c",
          ď: "d",
          ě: "e",
          ň: "n",
          ř: "r",
          š: "s",
          ť: "t",
          ů: "u",
          ž: "z",
          Č: "C",
          Ď: "D",
          Ě: "E",
          Ň: "N",
          Ř: "R",
          Š: "S",
          Ť: "T",
          Ů: "U",
          Ž: "Z"
        },
        fi: {
          // Finnish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        hu: {
          // Hungarian
          ä: "a",
          // ok
          Ä: "A",
          // ok
          // 'á': 'a', duplicate see charMap/latin
          // 'Á': 'A', duplicate see charMap/latin
          ö: "o",
          // ok
          Ö: "O",
          // ok
          // 'ő': 'o', duplicate see charMap/latin
          // 'Ő': 'O', duplicate see charMap/latin
          ü: "u",
          Ü: "U",
          ű: "u",
          Ű: "U"
        },
        lt: {
          // Lithuanian
          ą: "a",
          č: "c",
          ę: "e",
          ė: "e",
          į: "i",
          š: "s",
          ų: "u",
          ū: "u",
          ž: "z",
          Ą: "A",
          Č: "C",
          Ę: "E",
          Ė: "E",
          Į: "I",
          Š: "S",
          Ų: "U",
          Ū: "U"
        },
        lv: {
          // Latvian
          ā: "a",
          č: "c",
          ē: "e",
          ģ: "g",
          ī: "i",
          ķ: "k",
          ļ: "l",
          ņ: "n",
          š: "s",
          ū: "u",
          ž: "z",
          Ā: "A",
          Č: "C",
          Ē: "E",
          Ģ: "G",
          Ī: "i",
          Ķ: "k",
          Ļ: "L",
          Ņ: "N",
          Š: "S",
          Ū: "u",
          Ž: "Z"
        },
        pl: {
          // Polish
          ą: "a",
          ć: "c",
          ę: "e",
          ł: "l",
          ń: "n",
          ó: "o",
          ś: "s",
          ź: "z",
          ż: "z",
          Ą: "A",
          Ć: "C",
          Ę: "e",
          Ł: "L",
          Ń: "N",
          Ó: "O",
          Ś: "S",
          Ź: "Z",
          Ż: "Z"
        },
        sv: {
          // Swedish
          // 'å': 'a', duplicate see charMap/latin
          // 'Å': 'A', duplicate see charMap/latin
          ä: "a",
          // ok
          Ä: "A",
          // ok
          ö: "o",
          // ok
          Ö: "O"
          // ok
        },
        sk: {
          // Slovak
          ä: "a",
          Ä: "A"
        },
        sr: {
          // Serbian
          љ: "lj",
          њ: "nj",
          Љ: "Lj",
          Њ: "Nj",
          đ: "dj",
          Đ: "Dj"
        },
        tr: {
          // Turkish
          Ü: "U",
          Ö: "O",
          ü: "u",
          ö: "o"
        }
      }, r = {
        ar: {
          "∆": "delta",
          "∞": "la-nihaya",
          "♥": "hob",
          "&": "wa",
          "|": "aw",
          "<": "aqal-men",
          ">": "akbar-men",
          "∑": "majmou",
          "¤": "omla"
        },
        az: {},
        ca: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "amor",
          "&": "i",
          "|": "o",
          "<": "menys que",
          ">": "mes que",
          "∑": "suma dels",
          "¤": "moneda"
        },
        cs: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "nebo",
          "<": "mensi nez",
          ">": "vetsi nez",
          "∑": "soucet",
          "¤": "mena"
        },
        de: {
          "∆": "delta",
          "∞": "unendlich",
          "♥": "Liebe",
          "&": "und",
          "|": "oder",
          "<": "kleiner als",
          ">": "groesser als",
          "∑": "Summe von",
          "¤": "Waehrung"
        },
        dv: {
          "∆": "delta",
          "∞": "kolunulaa",
          "♥": "loabi",
          "&": "aai",
          "|": "noonee",
          "<": "ah vure kuda",
          ">": "ah vure bodu",
          "∑": "jumula",
          "¤": "faisaa"
        },
        en: {
          "∆": "delta",
          "∞": "infinity",
          "♥": "love",
          "&": "and",
          "|": "or",
          "<": "less than",
          ">": "greater than",
          "∑": "sum",
          "¤": "currency"
        },
        es: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "y",
          "|": "u",
          "<": "menos que",
          ">": "mas que",
          "∑": "suma de los",
          "¤": "moneda"
        },
        fa: {
          "∆": "delta",
          "∞": "bi-nahayat",
          "♥": "eshgh",
          "&": "va",
          "|": "ya",
          "<": "kamtar-az",
          ">": "bishtar-az",
          "∑": "majmooe",
          "¤": "vahed"
        },
        fi: {
          "∆": "delta",
          "∞": "aarettomyys",
          "♥": "rakkaus",
          "&": "ja",
          "|": "tai",
          "<": "pienempi kuin",
          ">": "suurempi kuin",
          "∑": "summa",
          "¤": "valuutta"
        },
        fr: {
          "∆": "delta",
          "∞": "infiniment",
          "♥": "Amour",
          "&": "et",
          "|": "ou",
          "<": "moins que",
          ">": "superieure a",
          "∑": "somme des",
          "¤": "monnaie"
        },
        ge: {
          "∆": "delta",
          "∞": "usasruloba",
          "♥": "siqvaruli",
          "&": "da",
          "|": "an",
          "<": "naklebi",
          ">": "meti",
          "∑": "jami",
          "¤": "valuta"
        },
        gr: {},
        hu: {
          "∆": "delta",
          "∞": "vegtelen",
          "♥": "szerelem",
          "&": "es",
          "|": "vagy",
          "<": "kisebb mint",
          ">": "nagyobb mint",
          "∑": "szumma",
          "¤": "penznem"
        },
        it: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amore",
          "&": "e",
          "|": "o",
          "<": "minore di",
          ">": "maggiore di",
          "∑": "somma",
          "¤": "moneta"
        },
        lt: {
          "∆": "delta",
          "∞": "begalybe",
          "♥": "meile",
          "&": "ir",
          "|": "ar",
          "<": "maziau nei",
          ">": "daugiau nei",
          "∑": "suma",
          "¤": "valiuta"
        },
        lv: {
          "∆": "delta",
          "∞": "bezgaliba",
          "♥": "milestiba",
          "&": "un",
          "|": "vai",
          "<": "mazak neka",
          ">": "lielaks neka",
          "∑": "summa",
          "¤": "valuta"
        },
        my: {
          "∆": "kwahkhyaet",
          "∞": "asaonasme",
          "♥": "akhyait",
          "&": "nhin",
          "|": "tho",
          "<": "ngethaw",
          ">": "kyithaw",
          "∑": "paungld",
          "¤": "ngwekye"
        },
        mk: {},
        nl: {
          "∆": "delta",
          "∞": "oneindig",
          "♥": "liefde",
          "&": "en",
          "|": "of",
          "<": "kleiner dan",
          ">": "groter dan",
          "∑": "som",
          "¤": "valuta"
        },
        pl: {
          "∆": "delta",
          "∞": "nieskonczonosc",
          "♥": "milosc",
          "&": "i",
          "|": "lub",
          "<": "mniejsze niz",
          ">": "wieksze niz",
          "∑": "suma",
          "¤": "waluta"
        },
        pt: {
          "∆": "delta",
          "∞": "infinito",
          "♥": "amor",
          "&": "e",
          "|": "ou",
          "<": "menor que",
          ">": "maior que",
          "∑": "soma",
          "¤": "moeda"
        },
        ro: {
          "∆": "delta",
          "∞": "infinit",
          "♥": "dragoste",
          "&": "si",
          "|": "sau",
          "<": "mai mic ca",
          ">": "mai mare ca",
          "∑": "suma",
          "¤": "valuta"
        },
        ru: {
          "∆": "delta",
          "∞": "beskonechno",
          "♥": "lubov",
          "&": "i",
          "|": "ili",
          "<": "menshe",
          ">": "bolshe",
          "∑": "summa",
          "¤": "valjuta"
        },
        sk: {
          "∆": "delta",
          "∞": "nekonecno",
          "♥": "laska",
          "&": "a",
          "|": "alebo",
          "<": "menej ako",
          ">": "viac ako",
          "∑": "sucet",
          "¤": "mena"
        },
        sr: {},
        tr: {
          "∆": "delta",
          "∞": "sonsuzluk",
          "♥": "ask",
          "&": "ve",
          "|": "veya",
          "<": "kucuktur",
          ">": "buyuktur",
          "∑": "toplam",
          "¤": "para birimi"
        },
        uk: {
          "∆": "delta",
          "∞": "bezkinechnist",
          "♥": "lubov",
          "&": "i",
          "|": "abo",
          "<": "menshe",
          ">": "bilshe",
          "∑": "suma",
          "¤": "valjuta"
        },
        vn: {
          "∆": "delta",
          "∞": "vo cuc",
          "♥": "yeu",
          "&": "va",
          "|": "hoac",
          "<": "nho hon",
          ">": "lon hon",
          "∑": "tong",
          "¤": "tien te"
        }
      }, c = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), d = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), l = [".", "!", "~", "*", "'", "(", ")"].join(""), u = function(k, N) {
        var H = "-", F = "", X = "", R = !0, ue = {}, K, ke, he, L, C, re, Ee, Fe, qe, fe, $, ae, T, Q, _ = "";
        if (typeof k != "string")
          return "";
        if (typeof N == "string" && (H = N), Ee = r.en, Fe = s.en, typeof N == "object") {
          K = N.maintainCase || !1, ue = N.custom && typeof N.custom == "object" ? N.custom : ue, he = +N.truncate > 1 && N.truncate || !1, L = N.uric || !1, C = N.uricNoSlash || !1, re = N.mark || !1, R = !(N.symbols === !1 || N.lang === !1), H = N.separator || H, L && (_ += c), C && (_ += d), re && (_ += l), Ee = N.lang && r[N.lang] && R ? r[N.lang] : R ? r.en : {}, Fe = N.lang && s[N.lang] ? s[N.lang] : N.lang === !1 || N.lang === !0 ? {} : s.en, N.titleCase && typeof N.titleCase.length == "number" && Array.prototype.toString.call(N.titleCase) ? (N.titleCase.forEach(function(pe) {
            ue[pe + ""] = pe + "";
          }), ke = !0) : ke = !!N.titleCase, N.custom && typeof N.custom.length == "number" && Array.prototype.toString.call(N.custom) && N.custom.forEach(function(pe) {
            ue[pe + ""] = pe + "";
          }), Object.keys(ue).forEach(function(pe) {
            var De;
            pe.length > 1 ? De = new RegExp("\\b" + f(pe) + "\\b", "gi") : De = new RegExp(f(pe), "gi"), k = k.replace(De, ue[pe]);
          });
          for ($ in ue)
            _ += $;
        }
        for (_ += H, _ = f(_), k = k.replace(/(^\s+|\s+$)/g, ""), T = !1, Q = !1, fe = 0, ae = k.length; fe < ae; fe++)
          $ = k[fe], g($, ue) ? T = !1 : Fe[$] ? ($ = T && Fe[$].match(/[A-Za-z0-9]/) ? " " + Fe[$] : Fe[$], T = !1) : $ in a ? (fe + 1 < ae && o.indexOf(k[fe + 1]) >= 0 ? (X += $, $ = "") : Q === !0 ? ($ = n[X] + a[$], X = "") : $ = T && a[$].match(/[A-Za-z0-9]/) ? " " + a[$] : a[$], T = !1, Q = !1) : $ in n ? (X += $, $ = "", fe === ae - 1 && ($ = n[X]), Q = !0) : /* process symbol chars */ Ee[$] && !(L && c.indexOf($) !== -1) && !(C && d.indexOf($) !== -1) ? ($ = T || F.substr(-1).match(/[A-Za-z0-9]/) ? H + Ee[$] : Ee[$], $ += k[fe + 1] !== void 0 && k[fe + 1].match(/[A-Za-z0-9]/) ? H : "", T = !0) : (Q === !0 ? ($ = n[X] + $, X = "", Q = !1) : T && (/[A-Za-z0-9]/.test($) || F.substr(-1).match(/A-Za-z0-9]/)) && ($ = " " + $), T = !1), F += $.replace(new RegExp("[^\\w\\s" + _ + "_-]", "g"), H);
        return ke && (F = F.replace(/(\w)(\S*)/g, function(pe, De, di) {
          var ui = De.toUpperCase() + (di !== null ? di : "");
          return Object.keys(ue).indexOf(ui.toLowerCase()) < 0 ? ui : ui.toLowerCase();
        })), F = F.replace(/\s+/g, H).replace(new RegExp("\\" + H + "+", "g"), H).replace(new RegExp("(^\\" + H + "+|\\" + H + "+$)", "g"), ""), he && F.length > he && (qe = F.charAt(he) === H, F = F.slice(0, he), qe || (F = F.slice(0, F.lastIndexOf(H)))), !K && !ke && (F = F.toLowerCase()), F;
      }, p = function(k) {
        return function(H) {
          return u(H, k);
        };
      }, f = function(k) {
        return k.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, g = function(I, k) {
        for (var N in k)
          if (k[N] === I)
            return !0;
      };
      if (typeof t < "u" && t.exports)
        t.exports = u, t.exports.createSlug = p;
      else if (typeof define < "u" && define.amd)
        define([], function() {
          return u;
        });
      else
        try {
          if (i.getSlug || i.createSlug)
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          i.getSlug = u, i.createSlug = p;
        } catch {
        }
    })(e);
  }
}), p0 = Fl({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    M(), t.exports = l0();
  }
});
M();
M();
M();
M();
M();
M();
M();
M();
function f0(e) {
  var t;
  const i = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return i === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : i;
}
function h0(e) {
  const t = e.__file;
  if (t)
    return Gm(Wm(t, ".vue"));
}
function Ec(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function rr(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function Ml(e) {
  var t, i;
  const a = (t = e.subTree) == null ? void 0 : t.type, o = rr(e);
  return o ? ((i = o?.types) == null ? void 0 : i.Fragment) === a : !1;
}
function Tn(e) {
  var t, i, a;
  const o = f0(e?.type || {});
  if (o)
    return o;
  if (e?.root === e)
    return "Root";
  for (const s in (i = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : i.components)
    if (e.parent.type.components[s] === e?.type)
      return Ec(e, s);
  for (const s in (a = e.appContext) == null ? void 0 : a.components)
    if (e.appContext.components[s] === e?.type)
      return Ec(e, s);
  const n = h0(e?.type || {});
  return n || "Anonymous Component";
}
function b0(e) {
  var t, i, a;
  const o = (a = (i = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : i.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? a : 0, n = e === e?.root ? "root" : e.uid;
  return `${o}:${n}`;
}
function ys(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function m0() {
  const e = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    get width() {
      return e.right - e.left;
    },
    get height() {
      return e.bottom - e.top;
    }
  };
  return e;
}
var ko;
function g0(e) {
  return ko || (ko = document.createRange()), ko.selectNode(e), ko.getBoundingClientRect();
}
function _0(e) {
  const t = m0();
  if (!e.children)
    return t;
  for (let i = 0, a = e.children.length; i < a; i++) {
    const o = e.children[i];
    let n;
    if (o.component)
      n = zi(o.component);
    else if (o.el) {
      const s = o.el;
      s.nodeType === 1 || s.getBoundingClientRect ? n = s.getBoundingClientRect() : s.nodeType === 3 && s.data.trim() && (n = g0(s));
    }
    n && v0(t, n);
  }
  return t;
}
function v0(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var Tc = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function zi(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? Tc : Ml(e) ? _0(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? zi(e.subTree.component) : Tc;
}
M();
function cr(e) {
  return Ml(e) ? y0(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function y0(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((i) => {
    i.component ? t.push(...cr(i.component)) : i?.el && t.push(i.el);
  }), t;
}
var zl = "__vue-devtools-component-inspector__", Ll = "__vue-devtools-component-inspector__card__", ql = "__vue-devtools-component-inspector__name__", Zl = "__vue-devtools-component-inspector__indicator__", Hl = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, w0 = {
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "5px 8px",
  borderRadius: "4px",
  textAlign: "left",
  position: "absolute",
  left: 0,
  color: "#e9e9e9",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "24px",
  backgroundColor: "#42b883",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
}, k0 = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function ga() {
  return document.getElementById(zl);
}
function I0() {
  return document.getElementById(Ll);
}
function A0() {
  return document.getElementById(Zl);
}
function E0() {
  return document.getElementById(ql);
}
function dr(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function ur(e) {
  var t;
  const i = document.createElement("div");
  i.id = (t = e.elementId) != null ? t : zl, Object.assign(i.style, {
    ...Hl,
    ...dr(e.bounds),
    ...e.style
  });
  const a = document.createElement("span");
  a.id = Ll, Object.assign(a.style, {
    ...w0,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const o = document.createElement("span");
  o.id = ql, o.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const n = document.createElement("i");
  return n.id = Zl, n.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(n.style, k0), a.appendChild(o), a.appendChild(n), i.appendChild(a), document.body.appendChild(i), i;
}
function lr(e) {
  const t = ga(), i = I0(), a = E0(), o = A0();
  t && (Object.assign(t.style, {
    ...Hl,
    ...dr(e.bounds)
  }), Object.assign(i.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), a.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, o.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function T0(e) {
  const t = zi(e);
  if (!t.width && !t.height)
    return;
  const i = Tn(e);
  ga() ? lr({ bounds: t, name: i }) : ur({ bounds: t, name: i });
}
function Bl() {
  const e = ga();
  e && (e.style.display = "none");
}
var ws = null;
function ks(e) {
  const t = e.target;
  if (t) {
    const i = t.__vueParentComponent;
    if (i && (ws = i, i.vnode.el)) {
      const o = zi(i), n = Tn(i);
      ga() ? lr({ bounds: o, name: n }) : ur({ bounds: o, name: n });
    }
  }
}
function S0(e, t) {
  if (e.preventDefault(), e.stopPropagation(), ws) {
    const i = b0(ws);
    t(i);
  }
}
var an = null;
function x0() {
  Bl(), window.removeEventListener("mouseover", ks), window.removeEventListener("click", an, !0), an = null;
}
function O0() {
  return window.addEventListener("mouseover", ks), new Promise((e) => {
    function t(i) {
      i.preventDefault(), i.stopPropagation(), S0(i, (a) => {
        window.removeEventListener("click", t, !0), an = null, window.removeEventListener("mouseover", ks);
        const o = ga();
        o && (o.style.display = "none"), e(JSON.stringify({ id: a }));
      });
    }
    an = t, window.addEventListener("click", t, !0);
  });
}
function V0(e) {
  const t = ys(ct.value, e.id);
  if (t) {
    const [i] = cr(t);
    if (typeof i.scrollIntoView == "function")
      i.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const a = zi(t), o = document.createElement("div"), n = {
        ...dr(a),
        position: "absolute"
      };
      Object.assign(o.style, n), document.body.appendChild(o), o.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(o);
      }, 2e3);
    }
    setTimeout(() => {
      const a = zi(t);
      if (a.width || a.height) {
        const o = Tn(t), n = ga();
        n ? lr({ ...e, name: o, bounds: a }) : ur({ ...e, name: o, bounds: a }), setTimeout(() => {
          n && (n.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
M();
var Sc, xc;
(xc = (Sc = W).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (Sc.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function C0(e) {
  let t = 0;
  const i = setInterval(() => {
    W.__VUE_INSPECTOR__ && (clearInterval(i), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(i);
  }, 30);
}
function N0() {
  const e = W.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...i) => {
    e.disable(), t(...i);
  };
}
function D0() {
  return new Promise((e) => {
    function t() {
      N0(), e(W.__VUE_INSPECTOR__);
    }
    W.__VUE_INSPECTOR__ ? t() : C0(() => {
      t();
    });
  });
}
M();
M();
function P0(e) {
  return !!(e && e.__v_isReadonly);
}
function Jl(e) {
  return P0(e) ? Jl(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Gn(e) {
  return !!(e && e.__v_isRef === !0);
}
function Oa(e) {
  const t = e && e.__v_raw;
  return t ? Oa(t) : e;
}
var R0 = class {
  constructor() {
    this.refEditor = new j0();
  }
  set(e, t, i, a) {
    const o = Array.isArray(t) ? t : t.split(".");
    for (; o.length > 1; ) {
      const r = o.shift();
      e instanceof Map ? e = e.get(r) : e instanceof Set ? e = Array.from(e.values())[r] : e = e[r], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const n = o[0], s = this.refEditor.get(e)[n];
    a ? a(e, n, i) : this.refEditor.isRef(s) ? this.refEditor.set(s, i) : e[n] = i;
  }
  get(e, t) {
    const i = Array.isArray(t) ? t : t.split(".");
    for (let a = 0; a < i.length; a++)
      if (e instanceof Map ? e = e.get(i[a]) : e = e[i[a]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e)
        return;
    return e;
  }
  has(e, t, i = !1) {
    if (typeof e > "u")
      return !1;
    const a = Array.isArray(t) ? t.slice() : t.split("."), o = i ? 2 : 1;
    for (; e && a.length > o; ) {
      const n = a.shift();
      e = e[n], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, a[0]);
  }
  createDefaultSetCallback(e) {
    return (t, i, a) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(i, 1) : Oa(t) instanceof Map ? t.delete(i) : Oa(t) instanceof Set ? t.delete(Array.from(t.values())[i]) : Reflect.deleteProperty(t, i)), !e.remove) {
        const o = t[e.newKey || i];
        this.refEditor.isRef(o) ? this.refEditor.set(o, a) : Oa(t) instanceof Map ? t.set(e.newKey || i, a) : Oa(t) instanceof Set ? t.add(a) : t[e.newKey || i] = a;
      }
    };
  }
}, j0 = class {
  set(e, t) {
    if (Gn(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((o) => e.add(o));
        return;
      }
      const i = Object.keys(t);
      if (e instanceof Map) {
        const o = new Set(e.keys());
        i.forEach((n) => {
          e.set(n, Reflect.get(t, n)), o.delete(n);
        }), o.forEach((n) => e.delete(n));
        return;
      }
      const a = new Set(Object.keys(e));
      i.forEach((o) => {
        Reflect.set(e, o, Reflect.get(t, o)), a.delete(o);
      }), a.forEach((o) => Reflect.deleteProperty(e, o));
    }
  }
  get(e) {
    return Gn(e) ? e.value : e;
  }
  isRef(e) {
    return Gn(e) || Jl(e);
  }
};
M();
M();
M();
var $0 = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function U0() {
  if (typeof window > "u" || !Rl || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = typeof localStorage.getItem < "u" ? localStorage.getItem($0) : null;
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
M();
M();
M();
var Oc, Vc;
(Vc = (Oc = W).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (Oc.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var F0 = new Proxy(W.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
});
function M0(e, t) {
  Qe.timelineLayersState[t.id] = !1, F0.push({
    ...e,
    descriptorId: t.id,
    appRecord: rr(t.app)
  });
}
var Cc, Nc;
(Nc = (Cc = W).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (Cc.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var pr = new Proxy(W.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
}), Kl = ua(() => {
  _a.hooks.callHook("sendInspectorToClient", Gl());
});
function z0(e, t) {
  var i, a;
  pr.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (i = e.treeFilterPlaceholder) != null ? i : "Search tree...",
    stateFilterPlaceholder: (a = e.stateFilterPlaceholder) != null ? a : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: rr(t.app)
  }), Kl();
}
function Gl() {
  return pr.filter((e) => e.descriptor.app === ct.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
    var t;
    const i = e.descriptor, a = e.options;
    return {
      id: a.id,
      label: a.label,
      logo: i.logo,
      icon: `custom-ic-baseline-${(t = a?.icon) == null ? void 0 : t.replace(/_/g, "-")}`,
      packageName: i.packageName,
      homepage: i.homepage,
      pluginId: i.id
    };
  });
}
function Ro(e, t) {
  return pr.find((i) => i.options.id === e && (t ? i.descriptor.app === t : !0));
}
function L0() {
  const e = $l();
  e.hook("addInspector", ({ inspector: a, plugin: o }) => {
    z0(a, o.descriptor);
  });
  const t = ua(async ({ inspectorId: a, plugin: o }) => {
    var n;
    if (!a || !((n = o?.descriptor) != null && n.app) || Qe.highPerfModeEnabled)
      return;
    const s = Ro(a, o.descriptor.app), r = {
      app: o.descriptor.app,
      inspectorId: a,
      filter: s?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((c) => {
      e.callHookWith(
        async (d) => {
          await Promise.all(d.map((l) => l(r))), c();
        },
        "getInspectorTree"
        /* GET_INSPECTOR_TREE */
      );
    }), e.callHookWith(
      async (c) => {
        await Promise.all(c.map((d) => d({
          inspectorId: a,
          rootNodes: r.rootNodes
        })));
      },
      "sendInspectorTreeToClient"
      /* SEND_INSPECTOR_TREE_TO_CLIENT */
    );
  }, 120);
  e.hook("sendInspectorTree", t);
  const i = ua(async ({ inspectorId: a, plugin: o }) => {
    var n;
    if (!a || !((n = o?.descriptor) != null && n.app) || Qe.highPerfModeEnabled)
      return;
    const s = Ro(a, o.descriptor.app), r = {
      app: o.descriptor.app,
      inspectorId: a,
      nodeId: s?.selectedNodeId || "",
      state: null
    }, c = {
      currentTab: `custom-inspector:${a}`
    };
    r.nodeId && await new Promise((d) => {
      e.callHookWith(
        async (l) => {
          await Promise.all(l.map((u) => u(r, c))), d();
        },
        "getInspectorState"
        /* GET_INSPECTOR_STATE */
      );
    }), e.callHookWith(
      async (d) => {
        await Promise.all(d.map((l) => l({
          inspectorId: a,
          nodeId: r.nodeId,
          state: r.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  return e.hook("sendInspectorState", i), e.hook("customInspectorSelectNode", ({ inspectorId: a, nodeId: o, plugin: n }) => {
    const s = Ro(a, n.descriptor.app);
    s && (s.selectedNodeId = o);
  }), e.hook("timelineLayerAdded", ({ options: a, plugin: o }) => {
    M0(a, o.descriptor);
  }), e.hook("timelineEventAdded", ({ options: a, plugin: o }) => {
    var n;
    const s = ["performance", "component-event", "keyboard", "mouse"];
    Qe.highPerfModeEnabled || !((n = Qe.timelineLayersState) != null && n[o.descriptor.id]) && !s.includes(a.layerId) || e.callHookWith(
      async (r) => {
        await Promise.all(r.map((c) => c(a)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  }), e.hook("getComponentInstances", async ({ app: a }) => {
    const o = a.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!o)
      return null;
    const n = o.id.toString();
    return [...o.instanceMap].filter(([r]) => r.split(":")[0] === n).map(([, r]) => r);
  }), e.hook("getComponentBounds", async ({ instance: a }) => zi(a)), e.hook("getComponentName", ({ instance: a }) => Tn(a)), e.hook("componentHighlight", ({ uid: a }) => {
    const o = ct.value.instanceMap.get(a);
    o && T0(o);
  }), e.hook("componentUnhighlight", () => {
    Bl();
  }), e;
}
var Dc, Pc;
(Pc = (Dc = W).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (Dc.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var Rc, jc;
(jc = (Rc = W).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (Rc.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var $c, Uc;
(Uc = ($c = W).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || ($c.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var Fc, Mc;
(Mc = (Fc = W).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (Fc.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var zc, Lc;
(Lc = (zc = W).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (zc.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var Ni = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function q0() {
  return {
    connected: !1,
    clientConnected: !1,
    vitePluginDetected: !0,
    appRecords: [],
    activeAppRecordId: "",
    tabs: [],
    commands: [],
    highPerfModeEnabled: !0,
    devtoolsClientDetected: {},
    perfUniqueGroupId: 0,
    timelineLayersState: U0()
  };
}
var qc, Zc;
(Zc = (qc = W)[Ni]) != null || (qc[Ni] = q0());
var Z0 = ua((e) => {
  _a.hooks.callHook("devtoolsStateUpdated", { state: e });
});
ua((e, t) => {
  _a.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var Sn = new Proxy(W.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, i) {
    return t === "value" ? W.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : W.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), ct = new Proxy(W.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, i) {
    return t === "value" ? W.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? W.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : W.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function Wl() {
  Z0({
    ...W[Ni],
    appRecords: Sn.value,
    activeAppRecordId: ct.id,
    tabs: W.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: W.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function H0(e) {
  W.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, Wl();
}
function B0(e) {
  W.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, Wl();
}
var Qe = new Proxy(W[Ni], {
  get(e, t) {
    return t === "appRecords" ? Sn : t === "activeAppRecordId" ? ct.id : t === "tabs" ? W.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? W.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : W[Ni][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, i) {
    return { ...W[Ni] }, e[t] = i, W[Ni][t] = i, !0;
  }
});
function J0(e = {}) {
  var t, i, a;
  const { file: o, host: n, baseUrl: s = window.location.origin, line: r = 0, column: c = 0 } = e;
  if (o) {
    if (n === "chrome-extension") {
      const d = o.replace(/\\/g, "\\\\"), l = (i = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? i : "/";
      fetch(`${l}__open-in-editor?file=${encodeURI(o)}`).then((u) => {
        if (!u.ok) {
          const p = `Opening component ${d} failed`;
          console.log(`%c${p}`, "color:red");
        }
      });
    } else if (Qe.vitePluginDetected) {
      const d = (a = W.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? a : s;
      W.__VUE_INSPECTOR__.openInEditor(d, o, r, c);
    }
  }
}
M();
M();
M();
M();
M();
var Hc, Bc;
(Bc = (Hc = W).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (Hc.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var fr = new Proxy(W.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
});
function Is(e) {
  const t = {};
  return Object.keys(e).forEach((i) => {
    t[i] = e[i].defaultValue;
  }), t;
}
function hr(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function K0(e) {
  var t, i, a;
  const o = (i = (t = fr.find((n) => {
    var s;
    return n[0].id === e && !!((s = n[0]) != null && s.settings);
  })) == null ? void 0 : t[0]) != null ? i : null;
  return (a = o?.settings) != null ? a : null;
}
function Yl(e, t) {
  var i, a, o;
  const n = hr(e);
  if (n) {
    const s = localStorage.getItem(n);
    if (s)
      return JSON.parse(s);
  }
  if (e) {
    const s = (a = (i = fr.find((r) => r[0].id === e)) == null ? void 0 : i[0]) != null ? a : null;
    return Is((o = s?.settings) != null ? o : {});
  }
  return Is(t);
}
function G0(e, t) {
  const i = hr(e);
  localStorage.getItem(i) || localStorage.setItem(i, JSON.stringify(Is(t)));
}
function W0(e, t, i) {
  const a = hr(e), o = localStorage.getItem(a), n = JSON.parse(o || "{}"), s = {
    ...n,
    [t]: i
  };
  localStorage.setItem(a, JSON.stringify(s)), _a.hooks.callHookWith(
    (r) => {
      r.forEach((c) => c({
        pluginId: e,
        key: t,
        oldValue: n[t],
        newValue: i,
        settings: s
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
M();
var Jc, Kc, bt = (Kc = (Jc = W).__VUE_DEVTOOLS_HOOK) != null ? Kc : Jc.__VUE_DEVTOOLS_HOOK = $l(), Y0 = {
  vueAppInit(e) {
    bt.hook("app:init", e);
  },
  vueAppUnmount(e) {
    bt.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    bt.hook("app:connected", e);
  },
  componentAdded(e) {
    return bt.hook("component:added", e);
  },
  componentEmit(e) {
    return bt.hook("component:emit", e);
  },
  componentUpdated(e) {
    return bt.hook("component:updated", e);
  },
  componentRemoved(e) {
    return bt.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    bt.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return bt.hook("perf:start", e);
  },
  perfEnd(e) {
    return bt.hook("perf:end", e);
  }
}, Xl = {
  on: Y0,
  setupDevToolsPlugin(e, t) {
    return bt.callHook("devtools-plugin:setup", e, t);
  }
}, X0 = class {
  constructor({ plugin: e, ctx: t }) {
    this.hooks = t.hooks, this.plugin = e;
  }
  get on() {
    return {
      // component inspector
      visitComponentTree: (e) => {
        this.hooks.hook("visitComponentTree", e);
      },
      inspectComponent: (e) => {
        this.hooks.hook("inspectComponent", e);
      },
      editComponentState: (e) => {
        this.hooks.hook("editComponentState", e);
      },
      // custom inspector
      getInspectorTree: (e) => {
        this.hooks.hook("getInspectorTree", e);
      },
      getInspectorState: (e) => {
        this.hooks.hook("getInspectorState", e);
      },
      editInspectorState: (e) => {
        this.hooks.hook("editInspectorState", e);
      },
      // timeline
      inspectTimelineEvent: (e) => {
        this.hooks.hook("inspectTimelineEvent", e);
      },
      timelineCleared: (e) => {
        this.hooks.hook("timelineCleared", e);
      },
      // settings
      setPluginSettings: (e) => {
        this.hooks.hook("setPluginSettings", e);
      }
    };
  }
  // component inspector
  notifyComponentUpdate(e) {
    var t;
    if (Qe.highPerfModeEnabled)
      return;
    const i = Gl().find((a) => a.packageName === this.plugin.descriptor.packageName);
    if (i?.id) {
      if (e) {
        const a = [
          e.appContext.app,
          e.uid,
          (t = e.parent) == null ? void 0 : t.uid,
          e
        ];
        bt.callHook("component:updated", ...a);
      } else
        bt.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: i.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && G0(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    Qe.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    Qe.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return Qe.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    Qe.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return Yl(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
  }
  // utilities
  getComponentInstances(e) {
    return this.hooks.callHook("getComponentInstances", { app: e });
  }
  getComponentBounds(e) {
    return this.hooks.callHook("getComponentBounds", { instance: e });
  }
  getComponentName(e) {
    return this.hooks.callHook("getComponentName", { instance: e });
  }
  highlightElement(e) {
    const t = e.__VUE_DEVTOOLS_NEXT_UID__;
    return this.hooks.callHook("componentHighlight", { uid: t });
  }
  unhighlightElement() {
    return this.hooks.callHook(
      "componentUnhighlight"
      /* COMPONENT_UNHIGHLIGHT */
    );
  }
}, Q0 = X0;
M();
M();
M();
M();
var eg = "__vue_devtool_undefined__", tg = "__vue_devtool_infinity__", ig = "__vue_devtool_negative_infinity__", ag = "__vue_devtool_nan__";
M();
M();
var og = {
  [eg]: "undefined",
  [ag]: "NaN",
  [tg]: "Infinity",
  [ig]: "-Infinity"
};
Object.entries(og).reduce((e, [t, i]) => (e[i] = t, e), {});
M();
M();
M();
M();
M();
var Gc, Wc;
(Wc = (Gc = W).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (Gc.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function Ql(e, t) {
  return Xl.setupDevToolsPlugin(e, t);
}
function ng(e, t) {
  const [i, a] = e;
  if (i.app !== t)
    return;
  const o = new Q0({
    plugin: {
      setupFn: a,
      descriptor: i
    },
    ctx: _a
  });
  i.packageName === "vuex" && o.on.editInspectorState((n) => {
    o.sendInspectorState(n.inspectorId);
  }), a(o);
}
function ep(e, t) {
  W.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || Qe.highPerfModeEnabled && !t?.inspectingComponent || (W.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), fr.forEach((i) => {
    ng(i, e);
  }));
}
M();
M();
var Ka = "__VUE_DEVTOOLS_ROUTER__", la = "__VUE_DEVTOOLS_ROUTER_INFO__", Yc, Xc;
(Xc = (Yc = W)[la]) != null || (Yc[la] = {
  currentRoute: null,
  routes: []
});
var Qc, ed;
(ed = (Qc = W)[Ka]) != null || (Qc[Ka] = {});
new Proxy(W[la], {
  get(e, t) {
    return W[la][t];
  }
});
new Proxy(W[Ka], {
  get(e, t) {
    if (t === "value")
      return W[Ka];
  }
});
function sg(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((i) => !t.has(i.path) && t.set(i.path, 1));
}
function br(e) {
  return e.map((t) => {
    let { path: i, name: a, children: o, meta: n } = t;
    return o?.length && (o = br(o)), {
      path: i,
      name: a,
      children: o,
      meta: n
    };
  });
}
function rg(e) {
  if (e) {
    const { fullPath: t, hash: i, href: a, path: o, name: n, matched: s, params: r, query: c } = e;
    return {
      fullPath: t,
      hash: i,
      href: a,
      path: o,
      name: n,
      params: r,
      query: c,
      matched: br(s)
    };
  }
  return e;
}
function cg(e, t) {
  function i() {
    var a;
    const o = (a = e.app) == null ? void 0 : a.config.globalProperties.$router, n = rg(o?.currentRoute.value), s = br(sg(o)), r = console.warn;
    console.warn = () => {
    }, W[la] = {
      currentRoute: n ? Ac(n) : {},
      routes: Ac(s)
    }, W[Ka] = o, console.warn = r;
  }
  i(), Xl.on.componentUpdated(ua(() => {
    var a;
    ((a = t.value) == null ? void 0 : a.app) === e.app && (i(), !Qe.highPerfModeEnabled && _a.hooks.callHook("routerInfoUpdated", { state: W[la] }));
  }, 200));
}
function dg(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const i = {
        ...t,
        app: ct.value.app,
        rootNodes: []
      };
      return await new Promise((a) => {
        e.callHookWith(
          async (o) => {
            await Promise.all(o.map((n) => n(i))), a();
          },
          "getInspectorTree"
          /* GET_INSPECTOR_TREE */
        );
      }), i.rootNodes;
    },
    // get inspector state
    async getInspectorState(t) {
      const i = {
        ...t,
        app: ct.value.app,
        state: null
      }, a = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((o) => {
        e.callHookWith(
          async (n) => {
            await Promise.all(n.map((s) => s(i, a))), o();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), i.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const i = new R0(), a = {
        ...t,
        app: ct.value.app,
        set: (o, n = t.path, s = t.state.value, r) => {
          i.set(o, n, s, r || i.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (o) => {
          o.forEach((n) => n(a));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const i = Ro(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: i.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return O0();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return x0();
    },
    // get component render code
    getComponentRenderCode(t) {
      const i = ys(ct.value, t);
      if (i)
        return typeof i?.type != "function" ? i.render.toString() : i.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return V0({ id: t });
    },
    // open in editor
    openInEditor: J0,
    // get vue inspector
    getVueInspector: D0,
    // toggle app
    toggleApp(t, i) {
      const a = Sn.value.find((o) => o.id === t);
      a && (B0(t), H0(a), cg(a, ct), Kl(), ep(a.app, i));
    },
    // inspect dom
    inspectDOM(t) {
      const i = ys(ct.value, t);
      if (i) {
        const [a] = cr(i);
        a && (W.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = a);
      }
    },
    updatePluginSettings(t, i, a) {
      W0(t, i, a);
    },
    getPluginSettings(t) {
      return {
        options: K0(t),
        values: Yl(t)
      };
    }
  };
}
M();
var td, id;
(id = (td = W).__VUE_DEVTOOLS_ENV__) != null || (td.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var ad = L0(), od, nd;
(nd = (od = W).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (od.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: ad,
  get state() {
    return {
      ...Qe,
      activeAppRecordId: ct.id,
      activeAppRecord: ct.value,
      appRecords: Sn.value
    };
  },
  api: dg(ad)
});
var _a = W.__VUE_DEVTOOLS_KIT_CONTEXT__;
M();
u0(p0());
var sd, rd;
(rd = (sd = W).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (sd.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
M();
M();
function ug(e) {
  Qe.highPerfModeEnabled = e ?? !Qe.highPerfModeEnabled, !e && ct.value && ep(ct.value.app);
}
M();
M();
M();
function lg(e) {
  Qe.devtoolsClientDetected = {
    ...Qe.devtoolsClientDetected,
    ...e
  };
  const t = Object.values(Qe.devtoolsClientDetected).some(Boolean);
  ug(!t);
}
var cd, dd;
(dd = (cd = W).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (cd.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = lg);
M();
M();
M();
M();
M();
M();
var pg = class {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, t) {
    this.keyToValue.set(e, t), this.valueToKey.set(t, e);
  }
  getByKey(e) {
    return this.keyToValue.get(e);
  }
  getByValue(e) {
    return this.valueToKey.get(e);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}, tp = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new pg();
  }
  register(e, t) {
    this.kv.getByValue(e) || (t || (t = this.generateIdentifier(e)), this.kv.set(t, e));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(e) {
    return this.kv.getByValue(e);
  }
  getValue(e) {
    return this.kv.getByKey(e);
  }
}, fg = class extends tp {
  constructor() {
    super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(e, t) {
    typeof t == "object" ? (t.allowProps && this.classToAllowedProps.set(e, t.allowProps), super.register(e, t.identifier)) : super.register(e, t);
  }
  getAllowedProps(e) {
    return this.classToAllowedProps.get(e);
  }
};
M();
M();
function hg(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const i in e)
    e.hasOwnProperty(i) && t.push(e[i]);
  return t;
}
function bg(e, t) {
  const i = hg(e);
  if ("find" in i)
    return i.find(t);
  const a = i;
  for (let o = 0; o < a.length; o++) {
    const n = a[o];
    if (t(n))
      return n;
  }
}
function pa(e, t) {
  Object.entries(e).forEach(([i, a]) => t(a, i));
}
function jo(e, t) {
  return e.indexOf(t) !== -1;
}
function ud(e, t) {
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    if (t(a))
      return a;
  }
}
var mg = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return bg(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
M();
M();
var gg = (e) => Object.prototype.toString.call(e).slice(8, -1), ip = (e) => typeof e > "u", _g = (e) => e === null, Ga = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, As = (e) => Ga(e) && Object.keys(e).length === 0, mi = (e) => Array.isArray(e), vg = (e) => typeof e == "string", yg = (e) => typeof e == "number" && !isNaN(e), wg = (e) => typeof e == "boolean", kg = (e) => e instanceof RegExp, Wa = (e) => e instanceof Map, Ya = (e) => e instanceof Set, ap = (e) => gg(e) === "Symbol", Ig = (e) => e instanceof Date && !isNaN(e.valueOf()), Ag = (e) => e instanceof Error, ld = (e) => typeof e == "number" && isNaN(e), Eg = (e) => wg(e) || _g(e) || ip(e) || yg(e) || vg(e) || ap(e), Tg = (e) => typeof e == "bigint", Sg = (e) => e === 1 / 0 || e === -1 / 0, xg = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), Og = (e) => e instanceof URL;
M();
var op = (e) => e.replace(/\./g, "\\."), Wn = (e) => e.map(String).map(op).join("."), Fa = (e) => {
  const t = [];
  let i = "";
  for (let o = 0; o < e.length; o++) {
    let n = e.charAt(o);
    if (n === "\\" && e.charAt(o + 1) === ".") {
      i += ".", o++;
      continue;
    }
    if (n === ".") {
      t.push(i), i = "";
      continue;
    }
    i += n;
  }
  const a = i;
  return t.push(a), t;
};
M();
function Ut(e, t, i, a) {
  return {
    isApplicable: e,
    annotation: t,
    transform: i,
    untransform: a
  };
}
var np = [
  Ut(ip, "undefined", () => null, () => {
  }),
  Ut(Tg, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Ut(Ig, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Ut(Ag, "Error", (e, t) => {
    const i = {
      name: e.name,
      message: e.message
    };
    return t.allowedErrorProps.forEach((a) => {
      i[a] = e[a];
    }), i;
  }, (e, t) => {
    const i = new Error(e.message);
    return i.name = e.name, i.stack = e.stack, t.allowedErrorProps.forEach((a) => {
      i[a] = e[a];
    }), i;
  }),
  Ut(kg, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), i = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, i);
  }),
  Ut(
    Ya,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Ut(Wa, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Ut((e) => ld(e) || Sg(e), "number", (e) => ld(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Ut((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Ut(Og, "URL", (e) => e.toString(), (e) => new URL(e))
];
function xn(e, t, i, a) {
  return {
    isApplicable: e,
    annotation: t,
    transform: i,
    untransform: a
  };
}
var sp = xn((e, t) => ap(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, i) => {
  const a = i.symbolRegistry.getValue(t[1]);
  if (!a)
    throw new Error("Trying to deserialize unknown symbol");
  return a;
}), Vg = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), rp = xn(xg, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const i = Vg[t[1]];
  if (!i)
    throw new Error("Trying to deserialize unknown typed array");
  return new i(e);
});
function cp(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var dp = xn(cp, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const i = t.classRegistry.getAllowedProps(e.constructor);
  if (!i)
    return { ...e };
  const a = {};
  return i.forEach((o) => {
    a[o] = e[o];
  }), a;
}, (e, t, i) => {
  const a = i.classRegistry.getValue(t[1]);
  if (!a)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(a.prototype), e);
}), up = xn((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, i) => {
  const a = i.customTransformerRegistry.findByName(t[1]);
  if (!a)
    throw new Error("Trying to deserialize unknown custom value");
  return a.deserialize(e);
}), Cg = [dp, sp, up, rp], pd = (e, t) => {
  const i = ud(Cg, (o) => o.isApplicable(e, t));
  if (i)
    return {
      value: i.transform(e, t),
      type: i.annotation(e, t)
    };
  const a = ud(np, (o) => o.isApplicable(e, t));
  if (a)
    return {
      value: a.transform(e, t),
      type: a.annotation
    };
}, lp = {};
np.forEach((e) => {
  lp[e.annotation] = e;
});
var Ng = (e, t, i) => {
  if (mi(t))
    switch (t[0]) {
      case "symbol":
        return sp.untransform(e, t, i);
      case "class":
        return dp.untransform(e, t, i);
      case "custom":
        return up.untransform(e, t, i);
      case "typed-array":
        return rp.untransform(e, t, i);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const a = lp[t];
    if (!a)
      throw new Error("Unknown transformation: " + t);
    return a.untransform(e, i);
  }
};
M();
var Qi = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const i = e.keys();
  for (; t > 0; )
    i.next(), t--;
  return i.next().value;
};
function pp(e) {
  if (jo(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (jo(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (jo(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var Dg = (e, t) => {
  pp(t);
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (Ya(e))
      e = Qi(e, +a);
    else if (Wa(e)) {
      const o = +a, n = +t[++i] == 0 ? "key" : "value", s = Qi(e, o);
      switch (n) {
        case "key":
          e = s;
          break;
        case "value":
          e = e.get(s);
          break;
      }
    } else
      e = e[a];
  }
  return e;
}, Es = (e, t, i) => {
  if (pp(t), t.length === 0)
    return i(e);
  let a = e;
  for (let n = 0; n < t.length - 1; n++) {
    const s = t[n];
    if (mi(a)) {
      const r = +s;
      a = a[r];
    } else if (Ga(a))
      a = a[s];
    else if (Ya(a)) {
      const r = +s;
      a = Qi(a, r);
    } else if (Wa(a)) {
      if (n === t.length - 2)
        break;
      const c = +s, d = +t[++n] == 0 ? "key" : "value", l = Qi(a, c);
      switch (d) {
        case "key":
          a = l;
          break;
        case "value":
          a = a.get(l);
          break;
      }
    }
  }
  const o = t[t.length - 1];
  if (mi(a) ? a[+o] = i(a[+o]) : Ga(a) && (a[o] = i(a[o])), Ya(a)) {
    const n = Qi(a, +o), s = i(n);
    n !== s && (a.delete(n), a.add(s));
  }
  if (Wa(a)) {
    const n = +t[t.length - 2], s = Qi(a, n);
    switch (+o == 0 ? "key" : "value") {
      case "key": {
        const c = i(s);
        a.set(c, a.get(s)), c !== s && a.delete(s);
        break;
      }
      case "value": {
        a.set(s, i(a.get(s)));
        break;
      }
    }
  }
  return e;
};
function Ts(e, t, i = []) {
  if (!e)
    return;
  if (!mi(e)) {
    pa(e, (n, s) => Ts(n, t, [...i, ...Fa(s)]));
    return;
  }
  const [a, o] = e;
  o && pa(o, (n, s) => {
    Ts(n, t, [...i, ...Fa(s)]);
  }), t(a, i);
}
function Pg(e, t, i) {
  return Ts(t, (a, o) => {
    e = Es(e, o, (n) => Ng(n, a, i));
  }), e;
}
function Rg(e, t) {
  function i(a, o) {
    const n = Dg(e, Fa(o));
    a.map(Fa).forEach((s) => {
      e = Es(e, s, () => n);
    });
  }
  if (mi(t)) {
    const [a, o] = t;
    a.forEach((n) => {
      e = Es(e, Fa(n), () => e);
    }), o && pa(o, i);
  } else
    pa(t, i);
  return e;
}
var jg = (e, t) => Ga(e) || mi(e) || Wa(e) || Ya(e) || cp(e, t);
function $g(e, t, i) {
  const a = i.get(e);
  a ? a.push(t) : i.set(e, [t]);
}
function Ug(e, t) {
  const i = {};
  let a;
  return e.forEach((o) => {
    if (o.length <= 1)
      return;
    t || (o = o.map((r) => r.map(String)).sort((r, c) => r.length - c.length));
    const [n, ...s] = o;
    n.length === 0 ? a = s.map(Wn) : i[Wn(n)] = s.map(Wn);
  }), a ? As(i) ? [a] : [a, i] : As(i) ? void 0 : i;
}
var fp = (e, t, i, a, o = [], n = [], s = /* @__PURE__ */ new Map()) => {
  var r;
  const c = Eg(e);
  if (!c) {
    $g(e, o, t);
    const g = s.get(e);
    if (g)
      return a ? {
        transformedValue: null
      } : g;
  }
  if (!jg(e, i)) {
    const g = pd(e, i), I = g ? {
      transformedValue: g.value,
      annotations: [g.type]
    } : {
      transformedValue: e
    };
    return c || s.set(e, I), I;
  }
  if (jo(n, e))
    return {
      transformedValue: null
    };
  const d = pd(e, i), l = (r = d?.value) != null ? r : e, u = mi(l) ? [] : {}, p = {};
  pa(l, (g, I) => {
    if (I === "__proto__" || I === "constructor" || I === "prototype")
      throw new Error(`Detected property ${I}. This is a prototype pollution risk, please remove it from your object.`);
    const k = fp(g, t, i, a, [...o, I], [...n, e], s);
    u[I] = k.transformedValue, mi(k.annotations) ? p[I] = k.annotations : Ga(k.annotations) && pa(k.annotations, (N, H) => {
      p[op(I) + "." + H] = N;
    });
  });
  const f = As(p) ? {
    transformedValue: u,
    annotations: d ? [d.type] : void 0
  } : {
    transformedValue: u,
    annotations: d ? [d.type, p] : p
  };
  return c || s.set(e, f), f;
};
M();
M();
function hp(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function fd(e) {
  return hp(e) === "Array";
}
function Fg(e) {
  if (hp(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function Mg(e, t, i, a, o) {
  const n = {}.propertyIsEnumerable.call(a, t) ? "enumerable" : "nonenumerable";
  n === "enumerable" && (e[t] = i), o && n === "nonenumerable" && Object.defineProperty(e, t, {
    value: i,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function Ss(e, t = {}) {
  if (fd(e))
    return e.map((o) => Ss(o, t));
  if (!Fg(e))
    return e;
  const i = Object.getOwnPropertyNames(e), a = Object.getOwnPropertySymbols(e);
  return [...i, ...a].reduce((o, n) => {
    if (fd(t.props) && !t.props.includes(n))
      return o;
    const s = e[n], r = Ss(s, t);
    return Mg(o, n, r, e, t.nonenumerable), o;
  }, {});
}
var Ce = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new fg(), this.symbolRegistry = new tp((t) => {
      var i;
      return (i = t.description) != null ? i : "";
    }), this.customTransformerRegistry = new mg(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), i = fp(e, t, this, this.dedupe), a = {
      json: i.transformedValue
    };
    i.annotations && (a.meta = {
      ...a.meta,
      values: i.annotations
    });
    const o = Ug(t, this.dedupe);
    return o && (a.meta = {
      ...a.meta,
      referentialEqualities: o
    }), a;
  }
  deserialize(e) {
    const { json: t, meta: i } = e;
    let a = Ss(t);
    return i?.values && (a = Pg(a, i.values, this)), i?.referentialEqualities && (a = Rg(a, i.referentialEqualities)), a;
  }
  stringify(e) {
    return JSON.stringify(this.serialize(e));
  }
  parse(e) {
    return this.deserialize(JSON.parse(e));
  }
  registerClass(e, t) {
    this.classRegistry.register(e, t);
  }
  registerSymbol(e, t) {
    this.symbolRegistry.register(e, t);
  }
  registerCustom(e, t) {
    this.customTransformerRegistry.register({
      name: t,
      ...e
    });
  }
  allowErrorProps(...e) {
    this.allowedErrorProps.push(...e);
  }
};
Ce.defaultInstance = new Ce();
Ce.serialize = Ce.defaultInstance.serialize.bind(Ce.defaultInstance);
Ce.deserialize = Ce.defaultInstance.deserialize.bind(Ce.defaultInstance);
Ce.stringify = Ce.defaultInstance.stringify.bind(Ce.defaultInstance);
Ce.parse = Ce.defaultInstance.parse.bind(Ce.defaultInstance);
Ce.registerClass = Ce.defaultInstance.registerClass.bind(Ce.defaultInstance);
Ce.registerSymbol = Ce.defaultInstance.registerSymbol.bind(Ce.defaultInstance);
Ce.registerCustom = Ce.defaultInstance.registerCustom.bind(Ce.defaultInstance);
Ce.allowErrorProps = Ce.defaultInstance.allowErrorProps.bind(Ce.defaultInstance);
M();
M();
M();
M();
M();
M();
M();
M();
M();
M();
M();
M();
M();
M();
M();
var hd, bd;
(bd = (hd = W).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (hd.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var md, gd;
(gd = (md = W).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (md.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var _d, vd;
(vd = (_d = W).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (_d.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var yd, wd;
(wd = (yd = W).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (yd.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var kd, Id;
(Id = (kd = W).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (kd.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var Ad, Ed;
(Ed = (Ad = W).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (Ad.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
M();
M();
M();
M();
const ii = typeof window < "u";
let Di;
const Xa = (e) => Di = e;
process.env.NODE_ENV;
const on = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Li(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Bt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Bt || (Bt = {}));
const Td = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function zg(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function mr(e, t, i) {
  const a = new XMLHttpRequest();
  a.open("GET", e), a.responseType = "blob", a.onload = function() {
    gp(a.response, t, i);
  }, a.onerror = function() {
    console.error("could not download file");
  }, a.send();
}
function bp(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function $o(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const i = new MouseEvent("click", {
      bubbles: !0,
      cancelable: !0,
      view: window,
      detail: 0,
      screenX: 80,
      screenY: 20,
      clientX: 80,
      clientY: 20,
      ctrlKey: !1,
      altKey: !1,
      shiftKey: !1,
      metaKey: !1,
      button: 0,
      relatedTarget: null
    });
    e.dispatchEvent(i);
  }
}
const Uo = typeof navigator == "object" ? navigator : { userAgent: "" }, mp = /Macintosh/.test(Uo.userAgent) && /AppleWebKit/.test(Uo.userAgent) && !/Safari/.test(Uo.userAgent), gp = ii ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !mp ? Lg : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in Uo ? qg : (
      // Fallback to using FileReader and a popup
      Zg
    )
  )
) : () => {
};
function Lg(e, t = "download", i) {
  const a = document.createElement("a");
  a.download = t, a.rel = "noopener", typeof e == "string" ? (a.href = e, a.origin !== location.origin ? bp(a.href) ? mr(e, t, i) : (a.target = "_blank", $o(a)) : $o(a)) : (a.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 4e4), setTimeout(function() {
    $o(a);
  }, 0));
}
function qg(e, t = "download", i) {
  if (typeof e == "string")
    if (bp(e))
      mr(e, t, i);
    else {
      const a = document.createElement("a");
      a.href = e, a.target = "_blank", setTimeout(function() {
        $o(a);
      });
    }
  else
    navigator.msSaveOrOpenBlob(zg(e, i), t);
}
function Zg(e, t, i, a) {
  if (a = a || open("", "_blank"), a && (a.document.title = a.document.body.innerText = "downloading..."), typeof e == "string")
    return mr(e, t, i);
  const o = e.type === "application/octet-stream", n = /constructor/i.test(String(Td.HTMLElement)) || "safari" in Td, s = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((s || o && n || mp) && typeof FileReader < "u") {
    const r = new FileReader();
    r.onloadend = function() {
      let c = r.result;
      if (typeof c != "string")
        throw a = null, new Error("Wrong reader.result type");
      c = s ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), a ? a.location.href = c : location.assign(c), a = null;
    }, r.readAsDataURL(e);
  } else {
    const r = URL.createObjectURL(e);
    a ? a.location.assign(r) : location.href = r, a = null, setTimeout(function() {
      URL.revokeObjectURL(r);
    }, 4e4);
  }
}
function tt(e, t) {
  const i = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(i, t) : t === "error" ? console.error(i) : t === "warn" ? console.warn(i) : console.log(i);
}
function gr(e) {
  return "_a" in e && "install" in e;
}
function _p() {
  if (!("clipboard" in navigator))
    return tt("Your browser doesn't support the Clipboard API", "error"), !0;
}
function vp(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (tt('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Hg(e) {
  if (!_p())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), tt("Global state copied to clipboard.");
    } catch (t) {
      if (vp(t))
        return;
      tt("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Bg(e) {
  if (!_p())
    try {
      yp(e, JSON.parse(await navigator.clipboard.readText())), tt("Global state pasted from clipboard.");
    } catch (t) {
      if (vp(t))
        return;
      tt("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Jg(e) {
  try {
    gp(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    tt("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Kt;
function Kg() {
  Kt || (Kt = document.createElement("input"), Kt.type = "file", Kt.accept = ".json");
  function e() {
    return new Promise((t, i) => {
      Kt.onchange = async () => {
        const a = Kt.files;
        if (!a)
          return t(null);
        const o = a.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, Kt.oncancel = () => t(null), Kt.onerror = i, Kt.click();
    });
  }
  return e;
}
async function Gg(e) {
  try {
    const i = await Kg()();
    if (!i)
      return;
    const { text: a, file: o } = i;
    yp(e, JSON.parse(a)), tt(`Global state imported from "${o.name}".`);
  } catch (t) {
    tt("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function yp(e, t) {
  for (const i in t) {
    const a = e.state.value[i];
    a ? Object.assign(a, t[i]) : e.state.value[i] = t[i];
  }
}
function xt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const wp = "🍍 Pinia (root)", Fo = "_root";
function Wg(e) {
  return gr(e) ? {
    id: Fo,
    label: wp
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Yg(e) {
  if (gr(e)) {
    const i = Array.from(e._s.keys()), a = e._s;
    return {
      state: i.map((n) => ({
        editable: !0,
        key: n,
        value: e.state.value[n]
      })),
      getters: i.filter((n) => a.get(n)._getters).map((n) => {
        const s = a.get(n);
        return {
          editable: !1,
          key: n,
          value: s._getters.reduce((r, c) => (r[c] = s[c], r), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((i) => ({
      editable: !0,
      key: i,
      value: e.$state[i]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((i) => ({
    editable: !1,
    key: i,
    value: e[i]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((i) => ({
    editable: !0,
    key: i,
    value: e[i]
  }))), t;
}
function Xg(e) {
  return e ? Array.isArray(e) ? e.reduce((t, i) => (t.keys.push(i.key), t.operations.push(i.type), t.oldValue[i.key] = i.oldValue, t.newValue[i.key] = i.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: xt(e.type),
    key: xt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Qg(e) {
  switch (e) {
    case Bt.direct:
      return "mutation";
    case Bt.patchFunction:
      return "$patch";
    case Bt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let ea = !0;
const Mo = [], Si = "pinia:mutations", it = "pinia", { assign: e1 } = Object, nn = (e) => "🍍 " + e;
function t1(e, t) {
  Ql({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Mo,
    app: e
  }, (i) => {
    typeof i.now != "function" && tt("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), i.addTimelineLayer({
      id: Si,
      label: "Pinia 🍍",
      color: 15064968
    }), i.addInspector({
      id: it,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Hg(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Bg(t), i.sendInspectorTree(it), i.sendInspectorState(it);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Jg(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Gg(t), i.sendInspectorTree(it), i.sendInspectorState(it);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (a) => {
            const o = t._s.get(a);
            o ? typeof o.$reset != "function" ? tt(`Cannot reset "${a}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), tt(`Store "${a}" reset.`)) : tt(`Cannot reset "${a}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), i.on.inspectComponent((a) => {
      const o = a.componentInstance && a.componentInstance.proxy;
      if (o && o._pStores) {
        const n = a.componentInstance.proxy._pStores;
        Object.values(n).forEach((s) => {
          a.instanceData.state.push({
            type: nn(s.$id),
            key: "state",
            editable: !0,
            value: s._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ de(s.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => s.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(s.$state).reduce((r, c) => (r[c] = s.$state[c], r), {})
            )
          }), s._getters && s._getters.length && a.instanceData.state.push({
            type: nn(s.$id),
            key: "getters",
            editable: !1,
            value: s._getters.reduce((r, c) => {
              try {
                r[c] = s[c];
              } catch (d) {
                r[c] = d;
              }
              return r;
            }, {})
          });
        });
      }
    }), i.on.getInspectorTree((a) => {
      if (a.app === e && a.inspectorId === it) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), a.rootNodes = (a.filter ? o.filter((n) => "$id" in n ? n.$id.toLowerCase().includes(a.filter.toLowerCase()) : wp.toLowerCase().includes(a.filter.toLowerCase())) : o).map(Wg);
      }
    }), globalThis.$pinia = t, i.on.getInspectorState((a) => {
      if (a.app === e && a.inspectorId === it) {
        const o = a.nodeId === Fo ? t : t._s.get(a.nodeId);
        if (!o)
          return;
        o && (a.nodeId !== Fo && (globalThis.$store = /* @__PURE__ */ de(o)), a.state = Yg(o));
      }
    }), i.on.editInspectorState((a) => {
      if (a.app === e && a.inspectorId === it) {
        const o = a.nodeId === Fo ? t : t._s.get(a.nodeId);
        if (!o)
          return tt(`store "${a.nodeId}" not found`, "error");
        const { path: n } = a;
        gr(o) ? n.unshift("state") : (n.length !== 1 || !o._customProperties.has(n[0]) || n[0] in o.$state) && n.unshift("$state"), ea = !1, a.set(o, n, a.state.value), ea = !0;
      }
    }), i.on.editComponentState((a) => {
      if (a.type.startsWith("🍍")) {
        const o = a.type.replace(/^🍍\s*/, ""), n = t._s.get(o);
        if (!n)
          return tt(`store "${o}" not found`, "error");
        const { path: s } = a;
        if (s[0] !== "state")
          return tt(`Invalid path for store "${o}":
${s}
Only state can be modified.`);
        s[0] = "$state", ea = !1, a.set(n, s, a.state.value), ea = !0;
      }
    });
  });
}
function i1(e, t) {
  Mo.includes(nn(t.$id)) || Mo.push(nn(t.$id)), Ql({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: Mo,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (i) => {
    const a = typeof i.now == "function" ? i.now.bind(i) : Date.now;
    t.$onAction(({ after: s, onError: r, name: c, args: d }) => {
      const l = kp++;
      i.addTimelineEvent({
        layerId: Si,
        event: {
          time: a(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: xt(t.$id),
            action: xt(c),
            args: d
          },
          groupId: l
        }
      }), s((u) => {
        hi = void 0, i.addTimelineEvent({
          layerId: Si,
          event: {
            time: a(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: xt(t.$id),
              action: xt(c),
              args: d,
              result: u
            },
            groupId: l
          }
        });
      }), r((u) => {
        hi = void 0, i.addTimelineEvent({
          layerId: Si,
          event: {
            time: a(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: xt(t.$id),
              action: xt(c),
              args: d,
              error: u
            },
            groupId: l
          }
        });
      });
    }, !0), t._customProperties.forEach((s) => {
      na(() => O(t[s]), (r, c) => {
        i.notifyComponentUpdate(), i.sendInspectorState(it), ea && i.addTimelineEvent({
          layerId: Si,
          event: {
            time: a(),
            title: "Change",
            subtitle: s,
            data: {
              newValue: r,
              oldValue: c
            },
            groupId: hi
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: s, type: r }, c) => {
      if (i.notifyComponentUpdate(), i.sendInspectorState(it), !ea)
        return;
      const d = {
        time: a(),
        title: Qg(r),
        data: e1({ store: xt(t.$id) }, Xg(s)),
        groupId: hi
      };
      r === Bt.patchFunction ? d.subtitle = "⤵️" : r === Bt.patchObject ? d.subtitle = "🧩" : s && !Array.isArray(s) && (d.subtitle = s.type), s && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: s
        }
      }), i.addTimelineEvent({
        layerId: Si,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = Zt((s) => {
      o(s), i.addTimelineEvent({
        layerId: Si,
        event: {
          time: a(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: xt(t.$id),
            info: xt("HMR update")
          }
        }
      }), i.notifyComponentUpdate(), i.sendInspectorTree(it), i.sendInspectorState(it);
    });
    const { $dispose: n } = t;
    t.$dispose = () => {
      n(), i.notifyComponentUpdate(), i.sendInspectorTree(it), i.sendInspectorState(it), i.getSettings().logStoreChanges && tt(`Disposed "${t.$id}" store 🗑`);
    }, i.notifyComponentUpdate(), i.sendInspectorTree(it), i.sendInspectorState(it), i.getSettings().logStoreChanges && tt(`"${t.$id}" store installed 🆕`);
  });
}
let kp = 0, hi;
function Sd(e, t, i) {
  const a = t.reduce((o, n) => (o[n] = (/* @__PURE__ */ de(e))[n], o), {});
  for (const o in a)
    e[o] = function() {
      const n = kp, s = i ? new Proxy(e, {
        get(...c) {
          return hi = n, Reflect.get(...c);
        },
        set(...c) {
          return hi = n, Reflect.set(...c);
        }
      }) : e;
      hi = n;
      const r = a[o].apply(s, arguments);
      return hi = void 0, r;
    };
}
function a1({ app: e, store: t, options: i }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!i.state, !t._p._testing) {
      Sd(t, Object.keys(i.actions), t._isOptionsAPI);
      const a = t._hotUpdate;
      (/* @__PURE__ */ de(t))._hotUpdate = function(o) {
        a.apply(this, arguments), Sd(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    i1(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function o1() {
  const e = yu(!0), t = e.run(() => /* @__PURE__ */ Ve({}));
  let i = [], a = [];
  const o = Zt({
    install(n) {
      Xa(o), o._a = n, n.provide(on, o), n.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ii && t1(n, o), a.forEach((s) => i.push(s)), a = [];
    },
    use(n) {
      return this._a ? i.push(n) : a.push(n), this;
    },
    _p: i,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ii && typeof Proxy < "u" && o.use(a1), o;
}
function Ip(e, t) {
  for (const i in t) {
    const a = t[i];
    if (!(i in e))
      continue;
    const o = e[i];
    Li(o) && Li(a) && !/* @__PURE__ */ xe(a) && !/* @__PURE__ */ Dt(a) ? e[i] = Ip(o, a) : e[i] = a;
  }
  return e;
}
const Ap = () => {
};
function xd(e, t, i, a = Ap) {
  e.add(t);
  const o = () => {
    e.delete(t) && a();
  };
  return !i && wu() && Hf(o), o;
}
function Gi(e, ...t) {
  e.forEach((i) => {
    i(...t);
  });
}
const n1 = (e) => e(), Od = /* @__PURE__ */ Symbol(), Yn = /* @__PURE__ */ Symbol();
function xs(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((i, a) => e.set(a, i)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const i in t) {
    if (!t.hasOwnProperty(i))
      continue;
    const a = t[i], o = e[i];
    Li(o) && Li(a) && e.hasOwnProperty(i) && !/* @__PURE__ */ xe(a) && !/* @__PURE__ */ Dt(a) ? e[i] = xs(o, a) : e[i] = a;
  }
  return e;
}
const s1 = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function r1(e) {
  return !Li(e) || !Object.prototype.hasOwnProperty.call(e, s1);
}
const { assign: At } = Object;
function Vd(e) {
  return !!(/* @__PURE__ */ xe(e) && e.effect);
}
function Cd(e, t, i, a) {
  const { state: o, actions: n, getters: s } = t, r = i.state.value[e];
  let c;
  function d() {
    !r && (process.env.NODE_ENV === "production" || !a) && (i.state.value[e] = o ? o() : {});
    const l = process.env.NODE_ENV !== "production" && a ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      /* @__PURE__ */ $r((/* @__PURE__ */ Ve(o ? o() : {})).value)
    ) : /* @__PURE__ */ $r(i.state.value[e]);
    return At(l, n, Object.keys(s || {}).reduce((u, p) => (process.env.NODE_ENV !== "production" && p in l && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), u[p] = Zt(at(() => {
      Xa(i);
      const f = i._s.get(e);
      return s[p].call(f, f);
    })), u), {}));
  }
  return c = Os(e, d, t, i, a, !0), c;
}
function Os(e, t, i = {}, a, o, n) {
  let s;
  const r = At({ actions: {} }, i);
  if (process.env.NODE_ENV !== "production" && !a._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (L) => {
    d ? f = L : d == !1 && !K._hotUpdating && (Array.isArray(f) ? f.push(L) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, l, u = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), f;
  const g = a.state.value[e];
  !n && !g && (process.env.NODE_ENV === "production" || !o) && (a.state.value[e] = {});
  const I = /* @__PURE__ */ Ve({});
  let k;
  function N(L) {
    let C;
    d = l = !1, process.env.NODE_ENV !== "production" && (f = []), typeof L == "function" ? (L(a.state.value[e]), C = {
      type: Bt.patchFunction,
      storeId: e,
      events: f
    }) : (xs(a.state.value[e], L), C = {
      type: Bt.patchObject,
      payload: L,
      storeId: e,
      events: f
    });
    const re = k = /* @__PURE__ */ Symbol();
    Za().then(() => {
      k === re && (d = !0);
    }), l = !0, Gi(u, C, a.state.value[e]);
  }
  const H = n ? function() {
    const { state: C } = i, re = C ? C() : {};
    this.$patch((Ee) => {
      At(Ee, re);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Ap
  );
  function F() {
    s.stop(), u.clear(), p.clear(), a._s.delete(e);
  }
  const X = (L, C = "") => {
    if (Od in L)
      return L[Yn] = C, L;
    const re = function() {
      Xa(a);
      const Ee = Array.from(arguments), Fe = /* @__PURE__ */ new Set(), qe = /* @__PURE__ */ new Set();
      function fe(T) {
        Fe.add(T);
      }
      function $(T) {
        qe.add(T);
      }
      Gi(p, {
        args: Ee,
        name: re[Yn],
        store: K,
        after: fe,
        onError: $
      });
      let ae;
      try {
        ae = L.apply(this && this.$id === e ? this : K, Ee);
      } catch (T) {
        throw Gi(qe, T), T;
      }
      return ae instanceof Promise ? ae.then((T) => (Gi(Fe, T), T)).catch((T) => (Gi(qe, T), Promise.reject(T))) : (Gi(Fe, ae), ae);
    };
    return re[Od] = !0, re[Yn] = C, re;
  }, R = /* @__PURE__ */ Zt({
    actions: {},
    getters: {},
    state: [],
    hotState: I
  }), ue = {
    _p: a,
    // _s: scope,
    $id: e,
    $onAction: xd.bind(null, p),
    $patch: N,
    $reset: H,
    $subscribe(L, C = {}) {
      const re = xd(u, L, C.detached, () => Ee()), Ee = s.run(() => na(() => a.state.value[e], (Fe) => {
        (C.flush === "sync" ? l : d) && L({
          storeId: e,
          type: Bt.direct,
          events: f
        }, Fe);
      }, At({}, c, C)));
      return re;
    },
    $dispose: F
  }, K = /* @__PURE__ */ _n(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ii ? At(
    {
      _hmrPayload: R,
      _customProperties: Zt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ue
    // must be added later
    // setupStore
  ) : ue);
  a._s.set(e, K);
  const he = (a._a && a._a.runWithContext || n1)(() => a._e.run(() => (s = yu()).run(() => t({ action: X }))));
  for (const L in he) {
    const C = he[L];
    if (/* @__PURE__ */ xe(C) && !Vd(C) || /* @__PURE__ */ Dt(C))
      process.env.NODE_ENV !== "production" && o ? I.value[L] = /* @__PURE__ */ Mn(he, L) : n || (g && r1(C) && (/* @__PURE__ */ xe(C) ? C.value = g[L] : xs(C, g[L])), a.state.value[e][L] = C), process.env.NODE_ENV !== "production" && R.state.push(L);
    else if (typeof C == "function") {
      const re = process.env.NODE_ENV !== "production" && o ? C : X(C, L);
      he[L] = re, process.env.NODE_ENV !== "production" && (R.actions[L] = C), r.actions[L] = C;
    } else process.env.NODE_ENV !== "production" && Vd(C) && (R.getters[L] = n ? (
      // @ts-expect-error
      i.getters[L]
    ) : C, ii && (he._getters || // @ts-expect-error: same
    (he._getters = Zt([]))).push(L));
  }
  if (At(K, he), At(/* @__PURE__ */ de(K), he), Object.defineProperty(K, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? I.value : a.state.value[e],
    set: (L) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      N((C) => {
        At(C, L);
      });
    }
  }), process.env.NODE_ENV !== "production" && (K._hotUpdate = Zt((L) => {
    K._hotUpdating = !0, L._hmrPayload.state.forEach((C) => {
      if (C in K.$state) {
        const re = L.$state[C], Ee = K.$state[C];
        typeof re == "object" && Li(re) && Li(Ee) ? Ip(re, Ee) : L.$state[C] = Ee;
      }
      K[C] = /* @__PURE__ */ Mn(L.$state, C);
    }), Object.keys(K.$state).forEach((C) => {
      C in L.$state || delete K[C];
    }), d = !1, l = !1, a.state.value[e] = /* @__PURE__ */ Mn(L._hmrPayload, "hotState"), l = !0, Za().then(() => {
      d = !0;
    });
    for (const C in L._hmrPayload.actions) {
      const re = L[C];
      K[C] = //
      X(re, C);
    }
    for (const C in L._hmrPayload.getters) {
      const re = L._hmrPayload.getters[C], Ee = n ? (
        // special handling of options api
        at(() => (Xa(a), re.call(K, K)))
      ) : re;
      K[C] = //
      Ee;
    }
    Object.keys(K._hmrPayload.getters).forEach((C) => {
      C in L._hmrPayload.getters || delete K[C];
    }), Object.keys(K._hmrPayload.actions).forEach((C) => {
      C in L._hmrPayload.actions || delete K[C];
    }), K._hmrPayload = L._hmrPayload, K._getters = L._getters, K._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ii) {
    const L = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((C) => {
      Object.defineProperty(K, C, At({ value: K[C] }, L));
    });
  }
  return a._p.forEach((L) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ii) {
      const C = s.run(() => L({
        store: K,
        app: a._a,
        pinia: a,
        options: r
      }));
      Object.keys(C || {}).forEach((re) => K._customProperties.add(re)), At(K, C);
    } else
      At(K, s.run(() => L({
        store: K,
        app: a._a,
        pinia: a,
        options: r
      })));
  }), process.env.NODE_ENV !== "production" && K.$state && typeof K.$state == "object" && typeof K.$state.constructor == "function" && !K.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${K.$id}".`), g && n && i.hydrate && i.hydrate(K.$state, g), d = !0, l = !0, K;
}
// @__NO_SIDE_EFFECTS__
function c1(e, t, i) {
  let a;
  const o = typeof t == "function";
  a = o ? i : t;
  function n(s, r) {
    const c = ds();
    if (s = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Di && Di._testing ? null : s) || (c ? $i(on, null) : null), s && Xa(s), process.env.NODE_ENV !== "production" && !Di)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    s = Di, s._s.has(e) || (o ? Os(e, t, a, s) : Cd(e, a, s), process.env.NODE_ENV !== "production" && (n._pinia = s));
    const d = s._s.get(e);
    if (process.env.NODE_ENV !== "production" && r) {
      const l = "__hot:" + e, u = o ? Os(l, t, a, s, !0) : Cd(l, At({}, a), s, !0);
      r._hotUpdate(u), delete s.state.value[l], s._s.delete(l);
    }
    if (process.env.NODE_ENV !== "production" && ii) {
      const l = An();
      if (l && l.proxy && // avoid adding stores that are just built for hot module replacement
      !r) {
        const u = l.proxy, p = "_pStores" in u ? u._pStores : u._pStores = {};
        p[e] = d;
      }
    }
    return d;
  }
  return n.$id = e, n;
}
const d1 = 1, u1 = "albina-galgame-card", l1 = "本包内的五首配乐均为 Kevin MacLeod 以 CC BY 4.0 发布的作品，不是 ProjectMoon 官方 OST。", p1 = [{ assetId: "file.audio.bgm.backstreets.rain.mp3", path: "audio/bgm/backstreets_rain.mp3", sha256: "97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414", cueAlias: "backstreets_rain", title: "SCP-x6x (Hopes)", creator: "Kevin MacLeod", isrc: "USUAN2000012", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.between.two.worlds.mp3", path: "audio/bgm/between_two_worlds.mp3", sha256: "25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184", cueAlias: "between_two_worlds", title: "Mesmerizing Galaxy", creator: "Kevin MacLeod", isrc: "USUAN2300011", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.boss.kromer.mp3", path: "audio/bgm/boss_kromer.mp3", sha256: "923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd", cueAlias: "boss_kromer", title: "Burnt Spirit", creator: "Kevin MacLeod", isrc: "USUAN1700053", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.main.menu.mp3", path: "audio/bgm/main_menu.mp3", sha256: "299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60", cueAlias: "main_menu", title: "Magistar", creator: "Kevin MacLeod", isrc: "USUAN1900003", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.title.theme.mp3", path: "audio/bgm/title_theme.mp3", sha256: "03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3", cueAlias: "title_theme", title: "Achilles", creator: "Kevin MacLeod", isrc: "USUAN1100463", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }], f1 = { publisher: "ProjectMoon", channel: "ProjectMoon Official", playlistTitle: "LCB OST", playlistTrackCount: 35, verifiedOn: "2026-07-15", bundled: !1, cached: !1, redistributionAllowed: !1, notice: "ProjectMoon 官方 OST 仅提供外部试听链接；本卡不下载、缓存或再分发这些音频。", rightsNotice: "官方播放列表可免费试听，但 ProjectMoon 服务条款未授予把游戏音乐复制进角色卡并再次分发的许可。", links: [{ label: "ProjectMoon 官方 OST 播放列表", url: "https://www.youtube.com/playlist?list=PL9-RBacZ4KMzFjhRY4zD7_GbwL1LgNWXD" }, { label: "Canto IX 官方曲目", url: "https://www.youtube.com/watch?v=n5GI6EkCXCo" }], termsUrl: "https://limbuscompany.com/terms-of-service/" }, h1 = {
  version: d1,
  projectId: u1,
  packagedNotice: l1,
  tracks: p1,
  officialSoundtrack: f1
}, b1 = { class: "gameplay-panel__header" }, m1 = {
  key: 0,
  class: "gameplay-panel__error",
  role: "alert",
  "aria-live": "assertive"
}, g1 = {
  class: "gameplay-tabs",
  role: "tablist",
  "aria-label": "状态档案分页"
}, _1 = ["id", "aria-selected", "aria-controls", "tabindex", "data-testid", "onClick", "onKeydown"], v1 = { class: "gameplay-panel__content" }, y1 = {
  id: "gameplay-page-status",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-status",
  "data-testid": "gameplay-page-status"
}, w1 = { class: "gameplay-stat-grid" }, k1 = ["data-stat-key"], I1 = { key: 0 }, A1 = { key: 1 }, E1 = { class: "gameplay-vector-list" }, T1 = ["value", "min", "max"], S1 = { class: "gameplay-split-grid" }, x1 = { class: "gameplay-definition-list" }, O1 = { class: "gameplay-definition-list" }, V1 = {
  id: "gameplay-page-objectives",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-objectives",
  "data-testid": "gameplay-page-objectives"
}, C1 = { class: "gameplay-split-grid" }, N1 = { class: "gameplay-entry-list" }, D1 = ["data-quest-id"], P1 = {
  key: 0,
  class: "gameplay-empty"
}, R1 = { class: "gameplay-entry-list" }, j1 = ["data-battle-id"], $1 = {
  key: 0,
  class: "gameplay-empty"
}, U1 = {
  id: "gameplay-page-loadout",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-loadout",
  "data-testid": "gameplay-page-loadout"
}, F1 = { class: "gameplay-entry-grid" }, M1 = ["data-item-id"], z1 = {
  key: 0,
  class: "gameplay-empty"
}, L1 = { class: "gameplay-split-grid gameplay-loadout-grid" }, q1 = { class: "gameplay-entry-list" }, Z1 = ["data-equipment-id"], H1 = ["disabled", "onClick"], B1 = { class: "gameplay-entry-list" }, J1 = ["data-outfit-id"], K1 = ["disabled", "onClick"], G1 = {
  id: "gameplay-page-progression",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-progression",
  "data-testid": "gameplay-page-progression"
}, W1 = { class: "gameplay-split-grid" }, Y1 = { class: "gameplay-entry-list" }, X1 = ["data-profession-id"], Q1 = ["disabled", "onClick"], e_ = { class: "gameplay-entry-list" }, t_ = ["data-achievement-id"], i_ = {
  id: "gameplay-page-codex",
  role: "tabpanel",
  "aria-labelledby": "gameplay-tab-codex",
  "data-testid": "gameplay-page-codex"
}, a_ = { class: "gameplay-entry-list gameplay-codex-list" }, o_ = ["data-worldbook-id"], n_ = { key: 0 }, s_ = { key: 1 }, r_ = { key: 2 }, c_ = /* @__PURE__ */ Xs({
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
    ], n = /* @__PURE__ */ Ve(), s = /* @__PURE__ */ Ve("status"), r = [
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
    ], l = {
      affectionAlbina: "好感",
      trust: "信任",
      danger: "危险",
      artResonance: "共鸣",
      composure: "镇定",
      materials: "材料",
      leverage: "筹码",
      exposure: "暴露"
    }, u = (T) => T === void 0 || T === i.save.route, p = at(() => i.gameplay.quests.filter((T) => u(T.route))), f = at(() => i.gameplay.battles.filter((T) => u(T.route))), g = at(() => i.gameplay.items.filter((T) => u(T.route) && i.save.inventory.ownedIds.includes(T.id))), I = at(() => i.gameplay.equipment.filter((T) => u(T.route))), k = at(() => i.gameplay.outfits.filter((T) => u(T.route))), N = at(() => i.gameplay.professions.filter((T) => u(T.route))), H = at(() => i.gameplay.achievements.filter((T) => u(T.route)));
    il(() => n.value?.focus());
    function F(T) {
      s.value = T;
    }
    function X(T, Q) {
      let _ = Q;
      if (T.key === "ArrowRight") _ = (Q + 1) % o.length;
      else if (T.key === "ArrowLeft") _ = (Q - 1 + o.length) % o.length;
      else if (T.key === "Home") _ = 0;
      else if (T.key === "End") _ = o.length - 1;
      else return;
      T.preventDefault();
      const pe = o[_];
      pe && (s.value = pe.id, requestAnimationFrame(() => document.getElementById(`gameplay-tab-${pe.id}`)?.focus()));
    }
    function R(T) {
      const Q = Array.from(n.value?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []).filter((De) => De.tabIndex >= 0 && De.getClientRects().length > 0), _ = Q[0], pe = Q.at(-1);
      if (!_ || !pe) {
        T.preventDefault();
        return;
      }
      T.shiftKey && document.activeElement === _ ? (T.preventDefault(), pe.focus()) : !T.shiftKey && document.activeElement === pe && (T.preventDefault(), _.focus());
    }
    function ue(T) {
      return `${T > 0 ? "+" : ""}${T}`;
    }
    function K(T) {
      return i.effectiveValues[T] - i.save.values[T];
    }
    function ke(T) {
      return Object.entries(T).filter((_) => typeof _[1] == "number").map(([_, pe]) => `${l[_] ?? _} ${ue(pe)}`).join(" / ") || "无数值修正";
    }
    function he(T) {
      return i.save.quests.completedNodeIds.includes(T) ? "completed" : i.save.quests.activeNodeIds.includes(T) ? "active" : "locked";
    }
    function L(T) {
      return { active: "进行中", completed: "已完成", locked: "未开始" }[he(T)];
    }
    function C(T) {
      return i.save.battles.outcomes[T] ?? "pending";
    }
    function re(T) {
      return { victory: "胜利", setback: "受挫", pending: "未解决" }[C(T)];
    }
    function Ee(T) {
      return i.save.inventory.ownedIds.includes(T);
    }
    function Fe(T) {
      return Object.values(i.save.inventory.equipped).includes(T);
    }
    function qe(T) {
      return i.save.professions.progress[T] ?? { xp: 0, level: 1 };
    }
    function fe(T) {
      const Q = i.gameplay.professions.find((pe) => pe.id === T), _ = qe(T);
      return Q?.xpThresholds[_.level];
    }
    function $(T) {
      return i.save.worldbook.activeEntryIds.includes(T) ? "active" : i.save.worldbook.seenEntryIds.includes(T) ? "seen" : "locked";
    }
    function ae(T) {
      return { active: "当前激活", seen: "已阅", locked: "未阅" }[$(T)];
    }
    return (T, Q) => (B(), G("div", {
      class: "gameplay-panel-backdrop",
      onClick: Q[2] || (Q[2] = tn((_) => a("close"), ["self"]))
    }, [
      m("section", {
        ref_key: "panel",
        ref: n,
        class: "gameplay-panel",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gameplay-panel-title",
        tabindex: "-1",
        "data-testid": "gameplay-panel",
        onKeydown: [
          Q[1] || (Q[1] = wc(tn((_) => a("close"), ["stop"]), ["esc"])),
          wc(R, ["tab"])
        ]
      }, [
        m("header", b1, [
          Q[3] || (Q[3] = m("div", null, [
            m("p", null, "ALBINA ARCHIVE"),
            m("h2", { id: "gameplay-panel-title" }, "状态档案")
          ], -1)),
          m("button", {
            type: "button",
            "aria-label": "关闭状态档案",
            title: "关闭",
            onClick: Q[0] || (Q[0] = (_) => a("close"))
          }, "关闭")
        ]),
        e.interactionError ? (B(), G("p", m1, q(e.interactionError), 1)) : mt("", !0),
        m("nav", g1, [
          (B(), G(we, null, Ge(o, (_, pe) => m("button", {
            id: `gameplay-tab-${_.id}`,
            key: _.id,
            type: "button",
            role: "tab",
            "aria-selected": s.value === _.id,
            "aria-controls": `gameplay-page-${_.id}`,
            tabindex: s.value === _.id ? 0 : -1,
            "data-testid": `gameplay-tab-${_.id}`,
            onClick: (De) => F(_.id),
            onKeydown: (De) => X(De, pe)
          }, q(_.label), 41, _1)), 64))
        ]),
        m("div", v1, [
          ei(m("section", y1, [
            Q[6] || (Q[6] = m("div", { class: "gameplay-section-heading" }, [
              m("h3", null, "权威数值")
            ], -1)),
            m("div", w1, [
              (B(), G(we, null, Ge(r, (_) => m("article", {
                key: _.key
              }, [
                m("span", null, q(_.label), 1),
                m("strong", {
                  "data-stat-key": _.key
                }, q(e.effectiveValues[_.key]), 9, k1),
                K(_.key) ? (B(), G("small", I1, "基础 " + q(e.save.values[_.key]) + " · 修正 " + q(ue(K(_.key))), 1)) : (B(), G("small", A1, "基础值"))
              ])), 64))
            ]),
            Q[7] || (Q[7] = m("div", { class: "gameplay-section-heading" }, [
              m("h3", null, "关系向量")
            ], -1)),
            m("div", E1, [
              (B(!0), G(we, null, Ge(e.gameplay.relationshipTracks, (_) => (B(), G("label", {
                key: _.id
              }, [
                m("span", null, q(_.label), 1),
                m("progress", {
                  value: e.save.values.relationshipVectors[_.id],
                  min: _.minimum,
                  max: _.maximum
                }, null, 8, T1),
                m("strong", null, q(e.save.values.relationshipVectors[_.id]), 1)
              ]))), 128))
            ]),
            m("div", S1, [
              m("section", null, [
                Q[4] || (Q[4] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "路线资源")
                ], -1)),
                m("dl", x1, [
                  (B(), G(we, null, Ge(c, (_) => (B(), G(we, {
                    key: _.key
                  }, [
                    m("dt", null, q(_.label), 1),
                    m("dd", null, q(e.save.values.routeEconomy[_.key]), 1)
                  ], 64))), 64))
                ])
              ]),
              m("section", null, [
                Q[5] || (Q[5] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "冲突专精")
                ], -1)),
                m("dl", O1, [
                  (B(), G(we, null, Ge(d, (_) => (B(), G(we, {
                    key: _.key
                  }, [
                    m("dt", null, q(_.label), 1),
                    m("dd", null, q(e.save.values.conflictMastery[_.key]), 1)
                  ], 64))), 64))
                ])
              ])
            ])
          ], 512), [
            [Aa, s.value === "status"]
          ]),
          ei(m("section", V1, [
            m("div", C1, [
              m("section", null, [
                Q[8] || (Q[8] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "路线任务")
                ], -1)),
                m("div", N1, [
                  (B(!0), G(we, null, Ge(p.value, (_) => (B(), G("article", {
                    key: _.id,
                    class: Ot(he(_.id)),
                    "data-quest-id": _.id
                  }, [
                    m("header", null, [
                      m("strong", null, q(_.label), 1),
                      m("span", null, q(L(_.id)), 1)
                    ]),
                    m("p", null, q(_.description), 1)
                  ], 10, D1))), 128)),
                  p.value.length === 0 ? (B(), G("p", P1, "当前尚未进入路线任务。")) : mt("", !0)
                ])
              ]),
              m("section", null, [
                Q[9] || (Q[9] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "冲突记录")
                ], -1)),
                m("div", R1, [
                  (B(!0), G(we, null, Ge(f.value, (_) => (B(), G("article", {
                    key: _.id,
                    class: Ot(C(_.id)),
                    "data-battle-id": _.id
                  }, [
                    m("header", null, [
                      m("strong", null, q(_.label), 1),
                      m("span", null, q(re(_.id)), 1)
                    ]),
                    m("p", null, q(_.description), 1),
                    m("small", null, "推荐专精：" + q(d.find((pe) => pe.key === _.recommendedMastery)?.label), 1)
                  ], 10, j1))), 128)),
                  f.value.length === 0 ? (B(), G("p", $1, "当前尚无路线冲突。")) : mt("", !0)
                ])
              ])
            ])
          ], 512), [
            [Aa, s.value === "objectives"]
          ]),
          ei(m("section", U1, [
            Q[13] || (Q[13] = m("div", { class: "gameplay-section-heading" }, [
              m("h3", null, "已持有物品")
            ], -1)),
            m("div", F1, [
              (B(!0), G(we, null, Ge(g.value, (_) => (B(), G("article", {
                key: _.id,
                "data-item-id": _.id
              }, [
                m("header", null, [
                  m("strong", null, q(_.label), 1),
                  Q[10] || (Q[10] = m("span", null, "已持有", -1))
                ]),
                m("p", null, q(_.description), 1)
              ], 8, M1))), 128)),
              g.value.length === 0 ? (B(), G("p", z1, "当前背包为空。")) : mt("", !0)
            ]),
            m("div", L1, [
              m("section", null, [
                Q[11] || (Q[11] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "装备")
                ], -1)),
                m("div", q1, [
                  (B(!0), G(we, null, Ge(I.value, (_) => (B(), G("article", {
                    key: _.id,
                    class: Ot({ active: Fe(_.id), locked: !Ee(_.itemId) }),
                    "data-equipment-id": _.id
                  }, [
                    m("header", null, [
                      m("strong", null, q(_.label), 1),
                      m("span", null, q(Fe(_.id) ? "装备中" : Ee(_.itemId) ? _.slot : "未获得"), 1)
                    ]),
                    m("p", null, q(ke(_.modifiers)), 1),
                    m("button", {
                      type: "button",
                      disabled: !Ee(_.itemId) || Fe(_.id),
                      onClick: (pe) => a("equip", _.id)
                    }, q(Fe(_.id) ? "已装备" : "装备"), 9, H1)
                  ], 10, Z1))), 128))
                ])
              ]),
              m("section", null, [
                Q[12] || (Q[12] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "衣装")
                ], -1)),
                m("div", B1, [
                  (B(!0), G(we, null, Ge(k.value, (_) => (B(), G("article", {
                    key: _.id,
                    class: Ot({ active: e.save.inventory.activeOutfitId === _.id, locked: !e.save.inventory.outfitIds.includes(_.id) }),
                    "data-outfit-id": _.id
                  }, [
                    m("header", null, [
                      m("strong", null, q(_.label), 1),
                      m("span", null, q(e.save.inventory.activeOutfitId === _.id ? "穿着中" : e.save.inventory.outfitIds.includes(_.id) ? "已解锁" : "未解锁"), 1)
                    ]),
                    m("button", {
                      type: "button",
                      disabled: !e.save.inventory.outfitIds.includes(_.id) || e.save.inventory.activeOutfitId === _.id,
                      onClick: (pe) => a("wearOutfit", _.id)
                    }, q(e.save.inventory.activeOutfitId === _.id ? "穿着中" : "更换"), 9, K1)
                  ], 10, J1))), 128))
                ])
              ])
            ])
          ], 512), [
            [Aa, s.value === "loadout"]
          ]),
          ei(m("section", G1, [
            m("div", W1, [
              m("section", null, [
                Q[14] || (Q[14] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "职业")
                ], -1)),
                m("div", Y1, [
                  (B(!0), G(we, null, Ge(N.value, (_) => (B(), G("article", {
                    key: _.id,
                    class: Ot({ active: e.save.professions.activeId === _.id }),
                    "data-profession-id": _.id
                  }, [
                    m("header", null, [
                      m("strong", null, q(_.label), 1),
                      m("span", null, "Lv." + q(qe(_.id).level), 1)
                    ]),
                    m("p", null, q(ke(_.modifiersPerLevel)) + " / 等级", 1),
                    m("small", null, [
                      fi("XP " + q(qe(_.id).xp), 1),
                      fe(_.id) !== void 0 ? (B(), G(we, { key: 0 }, [
                        fi(" / " + q(fe(_.id)), 1)
                      ], 64)) : (B(), G(we, { key: 1 }, [
                        fi(" · MAX")
                      ], 64))
                    ]),
                    m("button", {
                      type: "button",
                      disabled: e.save.professions.activeId === _.id,
                      onClick: (pe) => a("selectProfession", _.id)
                    }, q(e.save.professions.activeId === _.id ? "当前职业" : "设为当前"), 9, Q1)
                  ], 10, X1))), 128))
                ])
              ]),
              m("section", null, [
                Q[15] || (Q[15] = m("div", { class: "gameplay-section-heading" }, [
                  m("h3", null, "成就")
                ], -1)),
                m("div", e_, [
                  (B(!0), G(we, null, Ge(H.value, (_) => (B(), G("article", {
                    key: _.id,
                    class: Ot({ completed: e.save.achievements.unlockedIds.includes(_.id), locked: !e.save.achievements.unlockedIds.includes(_.id) }),
                    "data-achievement-id": _.id
                  }, [
                    m("header", null, [
                      m("strong", null, q(_.label), 1),
                      m("span", null, q(e.save.achievements.unlockedIds.includes(_.id) ? "已解锁" : "未解锁"), 1)
                    ]),
                    m("p", null, q(_.description), 1),
                    m("small", null, q(ke(_.reward.values ?? {})), 1)
                  ], 10, t_))), 128))
                ])
              ])
            ])
          ], 512), [
            [Aa, s.value === "progression"]
          ]),
          ei(m("section", i_, [
            Q[16] || (Q[16] = m("div", { class: "gameplay-section-heading" }, [
              m("h3", null, "世界书状态")
            ], -1)),
            m("div", a_, [
              (B(!0), G(we, null, Ge(e.gameplay.worldbookEntries, (_) => (B(), G("article", {
                key: _.id,
                class: Ot($(_.id)),
                "data-worldbook-id": _.id
              }, [
                m("header", null, [
                  m("strong", null, q(_.id), 1),
                  m("span", null, q(ae(_.id)), 1)
                ]),
                $(_.id) !== "locked" ? (B(), G("p", n_, q(_.content), 1)) : (B(), G("p", s_, "该条目尚未在当前存档中解锁。")),
                $(_.id) !== "locked" ? (B(), G("small", r_, q(_.constant ? "常驻" : _.selective ? "场景选择性激活" : "已记录"), 1)) : mt("", !0)
              ], 10, o_))), 128))
            ])
          ], 512), [
            [Aa, s.value === "codex"]
          ])
        ])
      ], 544)
    ]));
  }
}), d_ = {
  class: "portrait-stage",
  "aria-label": "角色立绘"
}, u_ = /* @__PURE__ */ Xs({
  __name: "PortraitStage",
  props: {
    portraits: {},
    service: {}
  },
  setup(e) {
    const t = e, i = /* @__PURE__ */ new Map();
    function a(n, s) {
      s instanceof HTMLCanvasElement ? i.set(n, s) : i.delete(n);
    }
    async function o() {
      t.service.stopAll(), await Za(), await Promise.all(t.portraits.map(async (n) => {
        const s = i.get(n.characterId);
        s && await t.service.play(n.portraitAssetId, s);
      }));
    }
    return na(() => t.portraits, () => {
      o();
    }, { deep: !0, immediate: !0 }), er(() => t.service.stopAll()), (n, s) => (B(), G("div", d_, [
      (B(!0), G(we, null, Ge(e.portraits, (r) => (B(), G("canvas", {
        key: `${r.characterId}:${r.portraitAssetId}`,
        ref_for: !0,
        ref: (c) => a(r.characterId, c),
        class: Ot(["portrait-stage__canvas", [`portrait-stage__canvas--${r.position}`, { "is-active": r.active }]]),
        width: "512",
        height: "768",
        style: bn({ transform: `translateX(-50%) scale(${r.scale})` })
      }, null, 6))), 128))
    ]));
  }
});
var Nd;
function w(e, t, i) {
  function a(r, c) {
    if (r._zod || Object.defineProperty(r, "_zod", {
      value: {
        def: c,
        constr: s,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), r._zod.traits.has(e))
      return;
    r._zod.traits.add(e), t(r, c);
    const d = s.prototype, l = Object.keys(d);
    for (let u = 0; u < l.length; u++) {
      const p = l[u];
      p in r || (r[p] = d[p].bind(r));
    }
  }
  const o = i?.Parent ?? Object;
  class n extends o {
  }
  Object.defineProperty(n, "name", { value: e });
  function s(r) {
    var c;
    const d = i?.Parent ? new n() : this;
    a(d, r), (c = d._zod).deferred ?? (c.deferred = []);
    for (const l of d._zod.deferred)
      l();
    return d;
  }
  return Object.defineProperty(s, "init", { value: a }), Object.defineProperty(s, Symbol.hasInstance, {
    value: (r) => i?.Parent && r instanceof i.Parent ? !0 : r?._zod?.traits?.has(e)
  }), Object.defineProperty(s, "name", { value: e }), s;
}
class ra extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Ep extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
(Nd = globalThis).__zod_globalConfig ?? (Nd.__zod_globalConfig = {});
const _r = globalThis.__zod_globalConfig;
function ni(e) {
  return _r;
}
function Tp(e) {
  const t = Object.values(e).filter((a) => typeof a == "number");
  return Object.entries(e).filter(([a, o]) => t.indexOf(+a) === -1).map(([a, o]) => o);
}
function Vs(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function On(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function vr(e) {
  return e == null;
}
function yr(e) {
  const t = e.startsWith("^") ? 1 : 0, i = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, i);
}
function l_(e, t) {
  const i = e / t, a = Math.round(i), o = Number.EPSILON * Math.max(Math.abs(i), 1);
  return Math.abs(i - a) < o ? 0 : i - a;
}
const Dd = /* @__PURE__ */ Symbol("evaluating");
function Te(e, t, i) {
  let a;
  Object.defineProperty(e, t, {
    get() {
      if (a !== Dd)
        return a === void 0 && (a = Dd, a = i()), a;
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
function qi(e, t, i) {
  Object.defineProperty(e, t, {
    value: i,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function _i(...e) {
  const t = {};
  for (const i of e) {
    const a = Object.getOwnPropertyDescriptors(i);
    Object.assign(t, a);
  }
  return Object.defineProperties({}, t);
}
function Pd(e) {
  return JSON.stringify(e);
}
function p_(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Sp = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Qa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const f_ = /* @__PURE__ */ On(() => {
  if (_r.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function fa(e) {
  if (Qa(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const i = t.prototype;
  return !(Qa(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function xp(e) {
  return fa(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const h_ = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ha(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function vi(e, t, i) {
  const a = new e._zod.constr(t ?? e._zod.def);
  return (!t || i?.parent) && (a._zod.parent = e), a;
}
function ee(e) {
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
function b_(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const m_ = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function g_(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const n = _i(e._zod.def, {
    get shape() {
      const s = {};
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && (s[r] = i.shape[r]);
      }
      return qi(this, "shape", s), s;
    },
    checks: []
  });
  return vi(e, n);
}
function __(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const n = _i(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape };
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && delete s[r];
      }
      return qi(this, "shape", s), s;
    },
    checks: []
  });
  return vi(e, n);
}
function v_(e, t) {
  if (!fa(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const i = e._zod.def.checks;
  if (i && i.length > 0) {
    const n = e._zod.def.shape;
    for (const s in t)
      if (Object.getOwnPropertyDescriptor(n, s) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = _i(e._zod.def, {
    get shape() {
      const n = { ...e._zod.def.shape, ...t };
      return qi(this, "shape", n), n;
    }
  });
  return vi(e, o);
}
function y_(e, t) {
  if (!fa(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const i = _i(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t };
      return qi(this, "shape", a), a;
    }
  });
  return vi(e, i);
}
function w_(e, t) {
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const i = _i(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t._zod.def.shape };
      return qi(this, "shape", a), a;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return vi(e, i);
}
function k_(e, t, i) {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const s = _i(t._zod.def, {
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
      return qi(this, "shape", c), c;
    },
    checks: []
  });
  return vi(t, s);
}
function I_(e, t, i) {
  const a = _i(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, n = { ...o };
      if (i)
        for (const s in i) {
          if (!(s in n))
            throw new Error(`Unrecognized key: "${s}"`);
          i[s] && (n[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          }));
        }
      else
        for (const s in o)
          n[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          });
      return qi(this, "shape", n), n;
    }
  });
  return vi(t, a);
}
function ta(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue !== !0)
      return !0;
  return !1;
}
function A_(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue === !1)
      return !0;
  return !1;
}
function ia(e, t) {
  return t.map((i) => {
    var a;
    return (a = i).path ?? (a.path = []), i.path.unshift(e), i;
  });
}
function Io(e) {
  return typeof e == "string" ? e : e?.message;
}
function si(e, t, i) {
  const a = e.message ? e.message : Io(e.inst?._zod.def?.error?.(e)) ?? Io(t?.error?.(e)) ?? Io(i.customError?.(e)) ?? Io(i.localeError?.(e)) ?? "Invalid input", { inst: o, continue: n, input: s, ...r } = e;
  return r.path ?? (r.path = []), r.message = a, t?.reportInput && (r.input = s), r;
}
function wr(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function eo(...e) {
  const [t, i, a] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: i,
    inst: a
  } : { ...t };
}
const Op = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, Vs, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Vp = w("$ZodError", Op), Cp = w("$ZodError", Op, { Parent: Error });
function E_(e, t = (i) => i.message) {
  const i = {}, a = [];
  for (const o of e.issues)
    o.path.length > 0 ? (i[o.path[0]] = i[o.path[0]] || [], i[o.path[0]].push(t(o))) : a.push(t(o));
  return { formErrors: a, fieldErrors: i };
}
function T_(e, t = (i) => i.message) {
  const i = { _errors: [] }, a = (o, n = []) => {
    for (const s of o.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((r) => a({ issues: r }, [...n, ...s.path]));
      else if (s.code === "invalid_key")
        a({ issues: s.issues }, [...n, ...s.path]);
      else if (s.code === "invalid_element")
        a({ issues: s.issues }, [...n, ...s.path]);
      else {
        const r = [...n, ...s.path];
        if (r.length === 0)
          i._errors.push(t(s));
        else {
          let c = i, d = 0;
          for (; d < r.length; ) {
            const l = r[d];
            d === r.length - 1 ? (c[l] = c[l] || { _errors: [] }, c[l]._errors.push(t(s))) : c[l] = c[l] || { _errors: [] }, c = c[l], d++;
          }
        }
      }
  };
  return a(e), i;
}
const kr = (e) => (t, i, a, o) => {
  const n = a ? { ...a, async: !1 } : { async: !1 }, s = t._zod.run({ value: i, issues: [] }, n);
  if (s instanceof Promise)
    throw new ra();
  if (s.issues.length) {
    const r = new (o?.Err ?? e)(s.issues.map((c) => si(c, n, ni())));
    throw Sp(r, o?.callee), r;
  }
  return s.value;
}, Ir = (e) => async (t, i, a, o) => {
  const n = a ? { ...a, async: !0 } : { async: !0 };
  let s = t._zod.run({ value: i, issues: [] }, n);
  if (s instanceof Promise && (s = await s), s.issues.length) {
    const r = new (o?.Err ?? e)(s.issues.map((c) => si(c, n, ni())));
    throw Sp(r, o?.callee), r;
  }
  return s.value;
}, Vn = (e) => (t, i, a) => {
  const o = a ? { ...a, async: !1 } : { async: !1 }, n = t._zod.run({ value: i, issues: [] }, o);
  if (n instanceof Promise)
    throw new ra();
  return n.issues.length ? {
    success: !1,
    error: new (e ?? Vp)(n.issues.map((s) => si(s, o, ni())))
  } : { success: !0, data: n.value };
}, S_ = /* @__PURE__ */ Vn(Cp), Cn = (e) => async (t, i, a) => {
  const o = a ? { ...a, async: !0 } : { async: !0 };
  let n = t._zod.run({ value: i, issues: [] }, o);
  return n instanceof Promise && (n = await n), n.issues.length ? {
    success: !1,
    error: new e(n.issues.map((s) => si(s, o, ni())))
  } : { success: !0, data: n.value };
}, x_ = /* @__PURE__ */ Cn(Cp), O_ = (e) => (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return kr(e)(t, i, o);
}, V_ = (e) => (t, i, a) => kr(e)(t, i, a), C_ = (e) => async (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return Ir(e)(t, i, o);
}, N_ = (e) => async (t, i, a) => Ir(e)(t, i, a), D_ = (e) => (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return Vn(e)(t, i, o);
}, P_ = (e) => (t, i, a) => Vn(e)(t, i, a), R_ = (e) => async (t, i, a) => {
  const o = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return Cn(e)(t, i, o);
}, j_ = (e) => async (t, i, a) => Cn(e)(t, i, a), $_ = /^[cC][0-9a-z]{6,}$/, U_ = /^[0-9a-z]+$/, F_ = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, M_ = /^[0-9a-vA-V]{20}$/, z_ = /^[A-Za-z0-9]{27}$/, L_ = /^[a-zA-Z0-9_-]{21}$/, q_ = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Z_ = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Rd = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, H_ = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, B_ = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function J_() {
  return new RegExp(B_, "u");
}
const K_ = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, G_ = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, W_ = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Y_ = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, X_ = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Np = /^[A-Za-z0-9_-]*$/, Q_ = /^https?$/, ev = /^\+[1-9]\d{6,14}$/, Dp = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", tv = /* @__PURE__ */ new RegExp(`^${Dp}$`);
function Pp(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function iv(e) {
  return new RegExp(`^${Pp(e)}$`);
}
function av(e) {
  const t = Pp({ precision: e.precision }), i = ["Z"];
  e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const a = `${t}(?:${i.join("|")})`;
  return new RegExp(`^${Dp}T(?:${a})$`);
}
const ov = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, nv = /^-?\d+$/, Rp = /^-?\d+(?:\.\d+)?$/, sv = /^(?:true|false)$/i, rv = /^[^A-Z]*$/, cv = /^[^a-z]*$/, ft = /* @__PURE__ */ w("$ZodCheck", (e, t) => {
  var i;
  e._zod ?? (e._zod = {}), e._zod.def = t, (i = e._zod).onattach ?? (i.onattach = []);
}), jp = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, $p = /* @__PURE__ */ w("$ZodCheckLessThan", (e, t) => {
  ft.init(e, t);
  const i = jp[typeof t.value];
  e._zod.onattach.push((a) => {
    const o = a._zod.bag, n = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < n && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
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
}), Up = /* @__PURE__ */ w("$ZodCheckGreaterThan", (e, t) => {
  ft.init(e, t);
  const i = jp[typeof t.value];
  e._zod.onattach.push((a) => {
    const o = a._zod.bag, n = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > n && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
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
}), dv = /* @__PURE__ */ w("$ZodCheckMultipleOf", (e, t) => {
  ft.init(e, t), e._zod.onattach.push((i) => {
    var a;
    (a = i._zod.bag).multipleOf ?? (a.multipleOf = t.value);
  }), e._zod.check = (i) => {
    if (typeof i.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : l_(i.value, t.value) === 0) || i.issues.push({
      origin: typeof i.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), uv = /* @__PURE__ */ w("$ZodCheckNumberFormat", (e, t) => {
  ft.init(e, t), t.format = t.format || "float64";
  const i = t.format?.includes("int"), a = i ? "int" : "number", [o, n] = m_[t.format];
  e._zod.onattach.push((s) => {
    const r = s._zod.bag;
    r.format = t.format, r.minimum = o, r.maximum = n, i && (r.pattern = nv);
  }), e._zod.check = (s) => {
    const r = s.value;
    if (i) {
      if (!Number.isInteger(r)) {
        s.issues.push({
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
        r > 0 ? s.issues.push({
          input: r,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: a,
          inclusive: !0,
          continue: !t.abort
        }) : s.issues.push({
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
    r < o && s.issues.push({
      origin: "number",
      input: r,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), r > n && s.issues.push({
      origin: "number",
      input: r,
      code: "too_big",
      maximum: n,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), lv = /* @__PURE__ */ w("$ZodCheckMaxLength", (e, t) => {
  var i;
  ft.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const o = a.value;
    return !vr(o) && o.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const o = a._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (a._zod.bag.maximum = t.maximum);
  }), e._zod.check = (a) => {
    const o = a.value;
    if (o.length <= t.maximum)
      return;
    const s = wr(o);
    a.issues.push({
      origin: s,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), pv = /* @__PURE__ */ w("$ZodCheckMinLength", (e, t) => {
  var i;
  ft.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const o = a.value;
    return !vr(o) && o.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const o = a._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (a._zod.bag.minimum = t.minimum);
  }), e._zod.check = (a) => {
    const o = a.value;
    if (o.length >= t.minimum)
      return;
    const s = wr(o);
    a.issues.push({
      origin: s,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), fv = /* @__PURE__ */ w("$ZodCheckLengthEquals", (e, t) => {
  var i;
  ft.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const o = a.value;
    return !vr(o) && o.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const o = a._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (a) => {
    const o = a.value, n = o.length;
    if (n === t.length)
      return;
    const s = wr(o), r = n > t.length;
    a.issues.push({
      origin: s,
      ...r ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: a.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Nn = /* @__PURE__ */ w("$ZodCheckStringFormat", (e, t) => {
  var i, a;
  ft.init(e, t), e._zod.onattach.push((o) => {
    const n = o._zod.bag;
    n.format = t.format, t.pattern && (n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(t.pattern));
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
}), hv = /* @__PURE__ */ w("$ZodCheckRegex", (e, t) => {
  Nn.init(e, t), e._zod.check = (i) => {
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
}), bv = /* @__PURE__ */ w("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = rv), Nn.init(e, t);
}), mv = /* @__PURE__ */ w("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = cv), Nn.init(e, t);
}), gv = /* @__PURE__ */ w("$ZodCheckIncludes", (e, t) => {
  ft.init(e, t);
  const i = ha(t.includes), a = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${i}` : i);
  t.pattern = a, e._zod.onattach.push((o) => {
    const n = o._zod.bag;
    n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(a);
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
}), _v = /* @__PURE__ */ w("$ZodCheckStartsWith", (e, t) => {
  ft.init(e, t);
  const i = new RegExp(`^${ha(t.prefix)}.*`);
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
}), vv = /* @__PURE__ */ w("$ZodCheckEndsWith", (e, t) => {
  ft.init(e, t);
  const i = new RegExp(`.*${ha(t.suffix)}$`);
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
}), yv = /* @__PURE__ */ w("$ZodCheckOverwrite", (e, t) => {
  ft.init(e, t), e._zod.check = (i) => {
    i.value = t.tx(i.value);
  };
});
class wv {
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
`).filter((s) => s), o = Math.min(...a.map((s) => s.length - s.trimStart().length)), n = a.map((s) => s.slice(o)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of n)
      this.content.push(s);
  }
  compile() {
    const t = Function, i = this?.args, o = [...(this?.content ?? [""]).map((n) => `  ${n}`)];
    return new t(...i, o.join(`
`));
  }
}
const kv = {
  major: 4,
  minor: 4,
  patch: 3
}, je = /* @__PURE__ */ w("$ZodType", (e, t) => {
  var i;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = kv;
  const a = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && a.unshift(e);
  for (const o of a)
    for (const n of o._zod.onattach)
      n(e);
  if (a.length === 0)
    (i = e._zod).deferred ?? (i.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (s, r, c) => {
      let d = ta(s), l;
      for (const u of r) {
        if (u._zod.def.when) {
          if (A_(s) || !u._zod.def.when(s))
            continue;
        } else if (d)
          continue;
        const p = s.issues.length, f = u._zod.check(s);
        if (f instanceof Promise && c?.async === !1)
          throw new ra();
        if (l || f instanceof Promise)
          l = (l ?? Promise.resolve()).then(async () => {
            await f, s.issues.length !== p && (d || (d = ta(s, p)));
          });
        else {
          if (s.issues.length === p)
            continue;
          d || (d = ta(s, p));
        }
      }
      return l ? l.then(() => s) : s;
    }, n = (s, r, c) => {
      if (ta(s))
        return s.aborted = !0, s;
      const d = o(r, a, c);
      if (d instanceof Promise) {
        if (c.async === !1)
          throw new ra();
        return d.then((l) => e._zod.parse(l, c));
      }
      return e._zod.parse(d, c);
    };
    e._zod.run = (s, r) => {
      if (r.skipChecks)
        return e._zod.parse(s, r);
      if (r.direction === "backward") {
        const d = e._zod.parse({ value: s.value, issues: [] }, { ...r, skipChecks: !0 });
        return d instanceof Promise ? d.then((l) => n(l, s, r)) : n(d, s, r);
      }
      const c = e._zod.parse(s, r);
      if (c instanceof Promise) {
        if (r.async === !1)
          throw new ra();
        return c.then((d) => o(d, a, r));
      }
      return o(c, a, r);
    };
  }
  Te(e, "~standard", () => ({
    validate: (o) => {
      try {
        const n = S_(e, o);
        return n.success ? { value: n.data } : { issues: n.error?.issues };
      } catch {
        return x_(e, o).then((s) => s.success ? { value: s.data } : { issues: s.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Ar = /* @__PURE__ */ w("$ZodString", (e, t) => {
  je.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ov(e._zod.bag), e._zod.parse = (i, a) => {
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
}), Re = /* @__PURE__ */ w("$ZodStringFormat", (e, t) => {
  Nn.init(e, t), Ar.init(e, t);
}), Iv = /* @__PURE__ */ w("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Z_), Re.init(e, t);
}), Av = /* @__PURE__ */ w("$ZodUUID", (e, t) => {
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
    t.pattern ?? (t.pattern = Rd(a));
  } else
    t.pattern ?? (t.pattern = Rd());
  Re.init(e, t);
}), Ev = /* @__PURE__ */ w("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = H_), Re.init(e, t);
}), Tv = /* @__PURE__ */ w("$ZodURL", (e, t) => {
  Re.init(e, t), e._zod.check = (i) => {
    try {
      const a = i.value.trim();
      if (!t.normalize && t.protocol?.source === Q_.source && !/^https?:\/\//i.test(a)) {
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
}), Sv = /* @__PURE__ */ w("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = J_()), Re.init(e, t);
}), xv = /* @__PURE__ */ w("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = L_), Re.init(e, t);
}), Ov = /* @__PURE__ */ w("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = $_), Re.init(e, t);
}), Vv = /* @__PURE__ */ w("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = U_), Re.init(e, t);
}), Cv = /* @__PURE__ */ w("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = F_), Re.init(e, t);
}), Nv = /* @__PURE__ */ w("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = M_), Re.init(e, t);
}), Dv = /* @__PURE__ */ w("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = z_), Re.init(e, t);
}), Pv = /* @__PURE__ */ w("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = av(t)), Re.init(e, t);
}), Rv = /* @__PURE__ */ w("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = tv), Re.init(e, t);
}), jv = /* @__PURE__ */ w("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = iv(t)), Re.init(e, t);
}), $v = /* @__PURE__ */ w("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = q_), Re.init(e, t);
}), Uv = /* @__PURE__ */ w("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = K_), Re.init(e, t), e._zod.bag.format = "ipv4";
}), Fv = /* @__PURE__ */ w("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = G_), Re.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (i) => {
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
}), Mv = /* @__PURE__ */ w("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = W_), Re.init(e, t);
}), zv = /* @__PURE__ */ w("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Y_), Re.init(e, t), e._zod.check = (i) => {
    const a = i.value.split("/");
    try {
      if (a.length !== 2)
        throw new Error();
      const [o, n] = a;
      if (!n)
        throw new Error();
      const s = Number(n);
      if (`${s}` !== n)
        throw new Error();
      if (s < 0 || s > 128)
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
function Fp(e) {
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
const Lv = /* @__PURE__ */ w("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = X_), Re.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (i) => {
    Fp(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function qv(e) {
  if (!Np.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (a) => a === "-" ? "+" : "/"), i = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return Fp(i);
}
const Zv = /* @__PURE__ */ w("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = Np), Re.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (i) => {
    qv(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Hv = /* @__PURE__ */ w("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = ev), Re.init(e, t);
});
function Bv(e, t = null) {
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
const Jv = /* @__PURE__ */ w("$ZodJWT", (e, t) => {
  Re.init(e, t), e._zod.check = (i) => {
    Bv(i.value, t.alg) || i.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Mp = /* @__PURE__ */ w("$ZodNumber", (e, t) => {
  je.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Rp, e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = Number(i.value);
      } catch {
      }
    const o = i.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return i;
    const n = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return i.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...n ? { received: n } : {}
    }), i;
  };
}), Kv = /* @__PURE__ */ w("$ZodNumberFormat", (e, t) => {
  uv.init(e, t), Mp.init(e, t);
}), Gv = /* @__PURE__ */ w("$ZodBoolean", (e, t) => {
  je.init(e, t), e._zod.pattern = sv, e._zod.parse = (i, a) => {
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
}), Wv = /* @__PURE__ */ w("$ZodUnknown", (e, t) => {
  je.init(e, t), e._zod.parse = (i) => i;
}), Yv = /* @__PURE__ */ w("$ZodNever", (e, t) => {
  je.init(e, t), e._zod.parse = (i, a) => (i.issues.push({
    expected: "never",
    code: "invalid_type",
    input: i.value,
    inst: e
  }), i);
});
function jd(e, t, i) {
  e.issues.length && t.issues.push(...ia(i, e.issues)), t.value[i] = e.value;
}
const Xv = /* @__PURE__ */ w("$ZodArray", (e, t) => {
  je.init(e, t), e._zod.parse = (i, a) => {
    const o = i.value;
    if (!Array.isArray(o))
      return i.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), i;
    i.value = Array(o.length);
    const n = [];
    for (let s = 0; s < o.length; s++) {
      const r = o[s], c = t.element._zod.run({
        value: r,
        issues: []
      }, a);
      c instanceof Promise ? n.push(c.then((d) => jd(d, i, s))) : jd(c, i, s);
    }
    return n.length ? Promise.all(n).then(() => i) : i;
  };
});
function sn(e, t, i, a, o, n) {
  const s = i in a;
  if (e.issues.length) {
    if (o && n && !s)
      return;
    t.issues.push(...ia(i, e.issues));
  }
  if (!s && !o) {
    e.issues.length || t.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: void 0,
      path: [i]
    });
    return;
  }
  e.value === void 0 ? s && (t.value[i] = void 0) : t.value[i] = e.value;
}
function zp(e) {
  const t = Object.keys(e.shape);
  for (const a of t)
    if (!e.shape?.[a]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const i = b_(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(i)
  };
}
function Lp(e, t, i, a, o, n) {
  const s = [], r = o.keySet, c = o.catchall._zod, d = c.def.type, l = c.optin === "optional", u = c.optout === "optional";
  for (const p in t) {
    if (p === "__proto__" || r.has(p))
      continue;
    if (d === "never") {
      s.push(p);
      continue;
    }
    const f = c.run({ value: t[p], issues: [] }, a);
    f instanceof Promise ? e.push(f.then((g) => sn(g, i, p, t, l, u))) : sn(f, i, p, t, l, u);
  }
  return s.length && i.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: t,
    inst: n
  }), e.length ? Promise.all(e).then(() => i) : i;
}
const Qv = /* @__PURE__ */ w("$ZodObject", (e, t) => {
  if (je.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
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
  const a = On(() => zp(t));
  Te(e._zod, "propValues", () => {
    const r = t.shape, c = {};
    for (const d in r) {
      const l = r[d]._zod;
      if (l.values) {
        c[d] ?? (c[d] = /* @__PURE__ */ new Set());
        for (const u of l.values)
          c[d].add(u);
      }
    }
    return c;
  });
  const o = Qa, n = t.catchall;
  let s;
  e._zod.parse = (r, c) => {
    s ?? (s = a.value);
    const d = r.value;
    if (!o(d))
      return r.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: e
      }), r;
    r.value = {};
    const l = [], u = s.shape;
    for (const p of s.keys) {
      const f = u[p], g = f._zod.optin === "optional", I = f._zod.optout === "optional", k = f._zod.run({ value: d[p], issues: [] }, c);
      k instanceof Promise ? l.push(k.then((N) => sn(N, r, p, d, g, I))) : sn(k, r, p, d, g, I);
    }
    return n ? Lp(l, d, r, c, a.value, e) : l.length ? Promise.all(l).then(() => r) : r;
  };
}), e2 = /* @__PURE__ */ w("$ZodObjectJIT", (e, t) => {
  Qv.init(e, t);
  const i = e._zod.parse, a = On(() => zp(t)), o = (p) => {
    const f = new wv(["shape", "payload", "ctx"]), g = a.value, I = (F) => {
      const X = Pd(F);
      return `shape[${X}]._zod.run({ value: input[${X}], issues: [] }, ctx)`;
    };
    f.write("const input = payload.value;");
    const k = /* @__PURE__ */ Object.create(null);
    let N = 0;
    for (const F of g.keys)
      k[F] = `key_${N++}`;
    f.write("const newResult = {};");
    for (const F of g.keys) {
      const X = k[F], R = Pd(F), ue = p[F], K = ue?._zod?.optin === "optional", ke = ue?._zod?.optout === "optional";
      f.write(`const ${X} = ${I(F)};`), K && ke ? f.write(`
        if (${X}.issues.length) {
          if (${R} in input) {
            payload.issues = payload.issues.concat(${X}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${R}, ...iss.path] : [${R}]
            })));
          }
        }

        if (${X}.value === undefined) {
          if (${R} in input) {
            newResult[${R}] = undefined;
          }
        } else {
          newResult[${R}] = ${X}.value;
        }

      `) : K ? f.write(`
        if (${X}.issues.length) {
          payload.issues = payload.issues.concat(${X}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${R}, ...iss.path] : [${R}]
          })));
        }

        if (${X}.value === undefined) {
          if (${R} in input) {
            newResult[${R}] = undefined;
          }
        } else {
          newResult[${R}] = ${X}.value;
        }

      `) : f.write(`
        const ${X}_present = ${R} in input;
        if (${X}.issues.length) {
          payload.issues = payload.issues.concat(${X}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${R}, ...iss.path] : [${R}]
          })));
        }
        if (!${X}_present && !${X}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${R}]
          });
        }

        if (${X}_present) {
          if (${X}.value === undefined) {
            newResult[${R}] = undefined;
          } else {
            newResult[${R}] = ${X}.value;
          }
        }

      `);
    }
    f.write("payload.value = newResult;"), f.write("return payload;");
    const H = f.compile();
    return (F, X) => H(p, F, X);
  };
  let n;
  const s = Qa, r = !_r.jitless, d = r && f_.value, l = t.catchall;
  let u;
  e._zod.parse = (p, f) => {
    u ?? (u = a.value);
    const g = p.value;
    return s(g) ? r && d && f?.async === !1 && f.jitless !== !0 ? (n || (n = o(t.shape)), p = n(p, f), l ? Lp([], g, p, f, u, e) : p) : i(p, f) : (p.issues.push({
      expected: "object",
      code: "invalid_type",
      input: g,
      inst: e
    }), p);
  };
});
function $d(e, t, i, a) {
  for (const n of e)
    if (n.issues.length === 0)
      return t.value = n.value, t;
  const o = e.filter((n) => !ta(n));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: i,
    errors: e.map((n) => n.issues.map((s) => si(s, a, ni())))
  }), t);
}
const qp = /* @__PURE__ */ w("$ZodUnion", (e, t) => {
  je.init(e, t), Te(e._zod, "optin", () => t.options.some((a) => a._zod.optin === "optional") ? "optional" : void 0), Te(e._zod, "optout", () => t.options.some((a) => a._zod.optout === "optional") ? "optional" : void 0), Te(e._zod, "values", () => {
    if (t.options.every((a) => a._zod.values))
      return new Set(t.options.flatMap((a) => Array.from(a._zod.values)));
  }), Te(e._zod, "pattern", () => {
    if (t.options.every((a) => a._zod.pattern)) {
      const a = t.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${a.map((o) => yr(o.source)).join("|")})$`);
    }
  });
  const i = t.options.length === 1 ? t.options[0]._zod.run : null;
  e._zod.parse = (a, o) => {
    if (i)
      return i(a, o);
    let n = !1;
    const s = [];
    for (const r of t.options) {
      const c = r._zod.run({
        value: a.value,
        issues: []
      }, o);
      if (c instanceof Promise)
        s.push(c), n = !0;
      else {
        if (c.issues.length === 0)
          return c;
        s.push(c);
      }
    }
    return n ? Promise.all(s).then((r) => $d(r, a, e, o)) : $d(s, a, e, o);
  };
}), t2 = /* @__PURE__ */ w("$ZodDiscriminatedUnion", (e, t) => {
  t.inclusive = !1, qp.init(e, t);
  const i = e._zod.parse;
  Te(e._zod, "propValues", () => {
    const o = {};
    for (const n of t.options) {
      const s = n._zod.propValues;
      if (!s || Object.keys(s).length === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
      for (const [r, c] of Object.entries(s)) {
        o[r] || (o[r] = /* @__PURE__ */ new Set());
        for (const d of c)
          o[r].add(d);
      }
    }
    return o;
  });
  const a = On(() => {
    const o = t.options, n = /* @__PURE__ */ new Map();
    for (const s of o) {
      const r = s._zod.propValues?.[t.discriminator];
      if (!r || r.size === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(s)}"`);
      for (const c of r) {
        if (n.has(c))
          throw new Error(`Duplicate discriminator value "${String(c)}"`);
        n.set(c, s);
      }
    }
    return n;
  });
  e._zod.parse = (o, n) => {
    const s = o.value;
    if (!Qa(s))
      return o.issues.push({
        code: "invalid_type",
        expected: "object",
        input: s,
        inst: e
      }), o;
    const r = a.value.get(s?.[t.discriminator]);
    return r ? r._zod.run(o, n) : t.unionFallback || n.direction === "backward" ? i(o, n) : (o.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: t.discriminator,
      options: Array.from(a.value.keys()),
      input: s,
      path: [t.discriminator],
      inst: e
    }), o);
  };
}), i2 = /* @__PURE__ */ w("$ZodIntersection", (e, t) => {
  je.init(e, t), e._zod.parse = (i, a) => {
    const o = i.value, n = t.left._zod.run({ value: o, issues: [] }, a), s = t.right._zod.run({ value: o, issues: [] }, a);
    return n instanceof Promise || s instanceof Promise ? Promise.all([n, s]).then(([c, d]) => Ud(i, c, d)) : Ud(i, n, s);
  };
});
function Cs(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (fa(e) && fa(t)) {
    const i = Object.keys(t), a = Object.keys(e).filter((n) => i.indexOf(n) !== -1), o = { ...e, ...t };
    for (const n of a) {
      const s = Cs(e[n], t[n]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [n, ...s.mergeErrorPath]
        };
      o[n] = s.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const o = e[a], n = t[a], s = Cs(o, n);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [a, ...s.mergeErrorPath]
        };
      i.push(s.data);
    }
    return { valid: !0, data: i };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Ud(e, t, i) {
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
  const n = [...a].filter(([, r]) => r.l && r.r).map(([r]) => r);
  if (n.length && o && e.issues.push({ ...o, keys: n }), ta(e))
    return e;
  const s = Cs(t.value, i.value);
  if (!s.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);
  return e.value = s.data, e;
}
const a2 = /* @__PURE__ */ w("$ZodRecord", (e, t) => {
  je.init(e, t), e._zod.parse = (i, a) => {
    const o = i.value;
    if (!fa(o))
      return i.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: e
      }), i;
    const n = [], s = t.keyType._zod.values;
    if (s) {
      i.value = {};
      const r = /* @__PURE__ */ new Set();
      for (const d of s)
        if (typeof d == "string" || typeof d == "number" || typeof d == "symbol") {
          r.add(typeof d == "number" ? d.toString() : d);
          const l = t.keyType._zod.run({ value: d, issues: [] }, a);
          if (l instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (l.issues.length) {
            i.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: l.issues.map((f) => si(f, a, ni())),
              input: d,
              path: [d],
              inst: e
            });
            continue;
          }
          const u = l.value, p = t.valueType._zod.run({ value: o[d], issues: [] }, a);
          p instanceof Promise ? n.push(p.then((f) => {
            f.issues.length && i.issues.push(...ia(d, f.issues)), i.value[u] = f.value;
          })) : (p.issues.length && i.issues.push(...ia(d, p.issues)), i.value[u] = p.value);
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
        if (typeof r == "string" && Rp.test(r) && c.issues.length) {
          const u = t.keyType._zod.run({ value: Number(r), issues: [] }, a);
          if (u instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          u.issues.length === 0 && (c = u);
        }
        if (c.issues.length) {
          t.mode === "loose" ? i.value[r] = o[r] : i.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((u) => si(u, a, ni())),
            input: r,
            path: [r],
            inst: e
          });
          continue;
        }
        const l = t.valueType._zod.run({ value: o[r], issues: [] }, a);
        l instanceof Promise ? n.push(l.then((u) => {
          u.issues.length && i.issues.push(...ia(r, u.issues)), i.value[c.value] = u.value;
        })) : (l.issues.length && i.issues.push(...ia(r, l.issues)), i.value[c.value] = l.value);
      }
    }
    return n.length ? Promise.all(n).then(() => i) : i;
  };
}), o2 = /* @__PURE__ */ w("$ZodEnum", (e, t) => {
  je.init(e, t);
  const i = Tp(t.entries), a = new Set(i);
  e._zod.values = a, e._zod.pattern = new RegExp(`^(${i.filter((o) => h_.has(typeof o)).map((o) => typeof o == "string" ? ha(o) : o.toString()).join("|")})$`), e._zod.parse = (o, n) => {
    const s = o.value;
    return a.has(s) || o.issues.push({
      code: "invalid_value",
      values: i,
      input: s,
      inst: e
    }), o;
  };
}), n2 = /* @__PURE__ */ w("$ZodLiteral", (e, t) => {
  if (je.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const i = new Set(t.values);
  e._zod.values = i, e._zod.pattern = new RegExp(`^(${t.values.map((a) => typeof a == "string" ? ha(a) : a ? ha(a.toString()) : String(a)).join("|")})$`), e._zod.parse = (a, o) => {
    const n = a.value;
    return i.has(n) || a.issues.push({
      code: "invalid_value",
      values: t.values,
      input: n,
      inst: e
    }), a;
  };
}), s2 = /* @__PURE__ */ w("$ZodTransform", (e, t) => {
  je.init(e, t), e._zod.optin = "optional", e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new Ep(e.constructor.name);
    const o = t.transform(i.value, i);
    if (a.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((s) => (i.value = s, i.fallback = !0, i));
    if (o instanceof Promise)
      throw new ra();
    return i.value = o, i.fallback = !0, i;
  };
});
function Fd(e, t) {
  return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
const Zp = /* @__PURE__ */ w("$ZodOptional", (e, t) => {
  je.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", Te(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), Te(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${yr(i.source)})?$`) : void 0;
  }), e._zod.parse = (i, a) => {
    if (t.innerType._zod.optin === "optional") {
      const o = i.value, n = t.innerType._zod.run(i, a);
      return n instanceof Promise ? n.then((s) => Fd(s, o)) : Fd(n, o);
    }
    return i.value === void 0 ? i : t.innerType._zod.run(i, a);
  };
}), r2 = /* @__PURE__ */ w("$ZodExactOptional", (e, t) => {
  Zp.init(e, t), Te(e._zod, "values", () => t.innerType._zod.values), Te(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (i, a) => t.innerType._zod.run(i, a);
}), c2 = /* @__PURE__ */ w("$ZodNullable", (e, t) => {
  je.init(e, t), Te(e._zod, "optin", () => t.innerType._zod.optin), Te(e._zod, "optout", () => t.innerType._zod.optout), Te(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${yr(i.source)}|null)$`) : void 0;
  }), Te(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (i, a) => i.value === null ? i : t.innerType._zod.run(i, a);
}), d2 = /* @__PURE__ */ w("$ZodDefault", (e, t) => {
  je.init(e, t), e._zod.optin = "optional", Te(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    if (i.value === void 0)
      return i.value = t.defaultValue, i;
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then((n) => Md(n, t)) : Md(o, t);
  };
});
function Md(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const u2 = /* @__PURE__ */ w("$ZodPrefault", (e, t) => {
  je.init(e, t), e._zod.optin = "optional", Te(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => (a.direction === "backward" || i.value === void 0 && (i.value = t.defaultValue), t.innerType._zod.run(i, a));
}), l2 = /* @__PURE__ */ w("$ZodNonOptional", (e, t) => {
  je.init(e, t), Te(e._zod, "values", () => {
    const i = t.innerType._zod.values;
    return i ? new Set([...i].filter((a) => a !== void 0)) : void 0;
  }), e._zod.parse = (i, a) => {
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then((n) => zd(n, e)) : zd(o, e);
  };
});
function zd(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const p2 = /* @__PURE__ */ w("$ZodCatch", (e, t) => {
  je.init(e, t), e._zod.optin = "optional", Te(e._zod, "optout", () => t.innerType._zod.optout), Te(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then((n) => (i.value = n.value, n.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: n.issues.map((s) => si(s, a, ni()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i)) : (i.value = o.value, o.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: o.issues.map((n) => si(n, a, ni()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i);
  };
}), f2 = /* @__PURE__ */ w("$ZodPipe", (e, t) => {
  je.init(e, t), Te(e._zod, "values", () => t.in._zod.values), Te(e._zod, "optin", () => t.in._zod.optin), Te(e._zod, "optout", () => t.out._zod.optout), Te(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (i, a) => {
    if (a.direction === "backward") {
      const n = t.out._zod.run(i, a);
      return n instanceof Promise ? n.then((s) => Ao(s, t.in, a)) : Ao(n, t.in, a);
    }
    const o = t.in._zod.run(i, a);
    return o instanceof Promise ? o.then((n) => Ao(n, t.out, a)) : Ao(o, t.out, a);
  };
});
function Ao(e, t, i) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
const h2 = /* @__PURE__ */ w("$ZodReadonly", (e, t) => {
  je.init(e, t), Te(e._zod, "propValues", () => t.innerType._zod.propValues), Te(e._zod, "values", () => t.innerType._zod.values), Te(e._zod, "optin", () => t.innerType?._zod?.optin), Te(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const o = t.innerType._zod.run(i, a);
    return o instanceof Promise ? o.then(Ld) : Ld(o);
  };
});
function Ld(e) {
  return e.value = Object.freeze(e.value), e;
}
const b2 = /* @__PURE__ */ w("$ZodCustom", (e, t) => {
  ft.init(e, t), je.init(e, t), e._zod.parse = (i, a) => i, e._zod.check = (i) => {
    const a = i.value, o = t.fn(a);
    if (o instanceof Promise)
      return o.then((n) => qd(n, i, a, e));
    qd(o, i, a, e);
  };
});
function qd(e, t, i, a) {
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
    a._zod.def.params && (o.params = a._zod.def.params), t.issues.push(eo(o));
  }
}
var Zd;
class m2 {
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
function g2() {
  return new m2();
}
(Zd = globalThis).__zod_globalRegistry ?? (Zd.__zod_globalRegistry = g2());
const Va = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function _2(e, t) {
  return new e({
    type: "string",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function v2(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Hd(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function y2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function w2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function k2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function I2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function A2(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function E2(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function T2(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function S2(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function x2(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function O2(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function V2(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function C2(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function N2(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function D2(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function P2(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function R2(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function j2(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function $2(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function U2(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function F2(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function M2(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function z2(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function L2(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function q2(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Z2(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function H2(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function B2(e, t) {
  return new e({
    type: "boolean",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function J2(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function K2(e, t) {
  return new e({
    type: "never",
    ...ee(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Bd(e, t) {
  return new $p({
    check: "less_than",
    ...ee(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Xn(e, t) {
  return new $p({
    check: "less_than",
    ...ee(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Jd(e, t) {
  return new Up({
    check: "greater_than",
    ...ee(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Qn(e, t) {
  return new Up({
    check: "greater_than",
    ...ee(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Kd(e, t) {
  return new dv({
    check: "multiple_of",
    ...ee(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function Hp(e, t) {
  return new lv({
    check: "max_length",
    ...ee(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function rn(e, t) {
  return new pv({
    check: "min_length",
    ...ee(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Bp(e, t) {
  return new fv({
    check: "length_equals",
    ...ee(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function G2(e, t) {
  return new hv({
    check: "string_format",
    format: "regex",
    ...ee(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function W2(e) {
  return new bv({
    check: "string_format",
    format: "lowercase",
    ...ee(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Y2(e) {
  return new mv({
    check: "string_format",
    format: "uppercase",
    ...ee(e)
  });
}
// @__NO_SIDE_EFFECTS__
function X2(e, t) {
  return new gv({
    check: "string_format",
    format: "includes",
    ...ee(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function Q2(e, t) {
  return new _v({
    check: "string_format",
    format: "starts_with",
    ...ee(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function e3(e, t) {
  return new vv({
    check: "string_format",
    format: "ends_with",
    ...ee(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function va(e) {
  return new yv({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function t3(e) {
  return /* @__PURE__ */ va((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function i3() {
  return /* @__PURE__ */ va((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function a3() {
  return /* @__PURE__ */ va((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function o3() {
  return /* @__PURE__ */ va((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function n3() {
  return /* @__PURE__ */ va((e) => p_(e));
}
// @__NO_SIDE_EFFECTS__
function s3(e, t, i) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...ee(i)
  });
}
// @__NO_SIDE_EFFECTS__
function r3(e, t, i) {
  const a = ee(i);
  return a.abort ?? (a.abort = !0), new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...a
  });
}
// @__NO_SIDE_EFFECTS__
function c3(e, t, i) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...ee(i)
  });
}
// @__NO_SIDE_EFFECTS__
function d3(e, t) {
  const i = /* @__PURE__ */ u3((a) => (a.addIssue = (o) => {
    if (typeof o == "string")
      a.issues.push(eo(o, a.value, i._zod.def));
    else {
      const n = o;
      n.fatal && (n.continue = !1), n.code ?? (n.code = "custom"), n.input ?? (n.input = a.value), n.inst ?? (n.inst = i), n.continue ?? (n.continue = !i._zod.def.abort), a.issues.push(eo(n));
    }
  }, e(a.value, a)), t);
  return i;
}
// @__NO_SIDE_EFFECTS__
function u3(e, t) {
  const i = new ft({
    check: "custom",
    ...ee(t)
  });
  return i._zod.check = e, i;
}
function Jp(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? Va,
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
function Be(e, t, i = { path: [], schemaPath: [] }) {
  var a;
  const o = e._zod.def, n = t.seen.get(e);
  if (n)
    return n.count++, i.schemaPath.includes(e) && (n.cycle = i.path), n.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: i.path };
  t.seen.set(e, s);
  const r = e._zod.toJSONSchema?.();
  if (r)
    s.schema = r;
  else {
    const l = {
      ...i,
      schemaPath: [...i.schemaPath, e],
      path: i.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, s.schema, l);
    else {
      const p = s.schema, f = t.processors[o.type];
      if (!f)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      f(e, t, p, l);
    }
    const u = e._zod.parent;
    u && (s.ref || (s.ref = u), Be(u, t, l), t.seen.get(u).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(s.schema, c), t.io === "input" && st(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && "_prefault" in s.schema && ((a = s.schema).default ?? (a.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function Kp(e, t) {
  const i = e.seen.get(t);
  if (!i)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const a = /* @__PURE__ */ new Map();
  for (const s of e.seen.entries()) {
    const r = e.metadataRegistry.get(s[0])?.id;
    if (r) {
      const c = a.get(r);
      if (c && c !== s[0])
        throw new Error(`Duplicate schema id "${r}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      a.set(r, s[0]);
    }
  }
  const o = (s) => {
    const r = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const u = e.external.registry.get(s[0])?.id, p = e.external.uri ?? ((g) => g);
      if (u)
        return { ref: p(u) };
      const f = s[1].defId ?? s[1].schema.id ?? `schema${e.counter++}`;
      return s[1].defId = f, { defId: f, ref: `${p("__shared")}#/${r}/${f}` };
    }
    if (s[1] === i)
      return { ref: "#" };
    const d = `#/${r}/`, l = s[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: l, ref: d + l };
  }, n = (s) => {
    if (s[1].schema.$ref)
      return;
    const r = s[1], { ref: c, defId: d } = o(s);
    r.def = { ...r.schema }, d && (r.defId = d);
    const l = r.schema;
    for (const u in l)
      delete l[u];
    l.$ref = c;
  };
  if (e.cycles === "throw")
    for (const s of e.seen.entries()) {
      const r = s[1];
      if (r.cycle)
        throw new Error(`Cycle detected: #/${r.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const s of e.seen.entries()) {
    const r = s[1];
    if (t === s[0]) {
      n(s);
      continue;
    }
    if (e.external) {
      const d = e.external.registry.get(s[0])?.id;
      if (t !== s[0] && d) {
        n(s);
        continue;
      }
    }
    if (e.metadataRegistry.get(s[0])?.id) {
      n(s);
      continue;
    }
    if (r.cycle) {
      n(s);
      continue;
    }
    if (r.count > 1 && e.reused === "ref") {
      n(s);
      continue;
    }
  }
}
function Gp(e, t) {
  const i = e.seen.get(t);
  if (!i)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const a = (r) => {
    const c = e.seen.get(r);
    if (c.ref === null)
      return;
    const d = c.def ?? c.schema, l = { ...d }, u = c.ref;
    if (c.ref = null, u) {
      a(u);
      const f = e.seen.get(u), g = f.schema;
      if (g.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (d.allOf = d.allOf ?? [], d.allOf.push(g)) : Object.assign(d, g), Object.assign(d, l), r._zod.parent === u)
        for (const k in d)
          k === "$ref" || k === "allOf" || k in l || delete d[k];
      if (g.$ref && f.def)
        for (const k in d)
          k === "$ref" || k === "allOf" || k in f.def && JSON.stringify(d[k]) === JSON.stringify(f.def[k]) && delete d[k];
    }
    const p = r._zod.parent;
    if (p && p !== u) {
      a(p);
      const f = e.seen.get(p);
      if (f?.schema.$ref && (d.$ref = f.schema.$ref, f.def))
        for (const g in d)
          g === "$ref" || g === "allOf" || g in f.def && JSON.stringify(d[g]) === JSON.stringify(f.def[g]) && delete d[g];
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
  const n = e.metadataRegistry.get(t)?.id;
  n !== void 0 && o.id === n && delete o.id;
  const s = e.external?.defs ?? {};
  for (const r of e.seen.entries()) {
    const c = r[1];
    c.def && c.defId && (c.def.id === c.defId && delete c.def.id, s[c.defId] = c.def);
  }
  e.external || Object.keys(s).length > 0 && (e.target === "draft-2020-12" ? o.$defs = s : o.definitions = s);
  try {
    const r = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(r, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: cn(t, "input", e.processors),
          output: cn(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), r;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function st(e, t) {
  const i = t ?? { seen: /* @__PURE__ */ new Set() };
  if (i.seen.has(e))
    return !1;
  i.seen.add(e);
  const a = e._zod.def;
  if (a.type === "transform")
    return !0;
  if (a.type === "array")
    return st(a.element, i);
  if (a.type === "set")
    return st(a.valueType, i);
  if (a.type === "lazy")
    return st(a.getter(), i);
  if (a.type === "promise" || a.type === "optional" || a.type === "nonoptional" || a.type === "nullable" || a.type === "readonly" || a.type === "default" || a.type === "prefault")
    return st(a.innerType, i);
  if (a.type === "intersection")
    return st(a.left, i) || st(a.right, i);
  if (a.type === "record" || a.type === "map")
    return st(a.keyType, i) || st(a.valueType, i);
  if (a.type === "pipe")
    return e._zod.traits.has("$ZodCodec") ? !0 : st(a.in, i) || st(a.out, i);
  if (a.type === "object") {
    for (const o in a.shape)
      if (st(a.shape[o], i))
        return !0;
    return !1;
  }
  if (a.type === "union") {
    for (const o of a.options)
      if (st(o, i))
        return !0;
    return !1;
  }
  if (a.type === "tuple") {
    for (const o of a.items)
      if (st(o, i))
        return !0;
    return !!(a.rest && st(a.rest, i));
  }
  return !1;
}
const l3 = (e, t = {}) => (i) => {
  const a = Jp({ ...i, processors: t });
  return Be(e, a), Kp(a, e), Gp(a, e);
}, cn = (e, t, i = {}) => (a) => {
  const { libraryOptions: o, target: n } = a ?? {}, s = Jp({ ...o ?? {}, target: n, io: t, processors: i });
  return Be(e, s), Kp(s, e), Gp(s, e);
}, p3 = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, f3 = (e, t, i, a) => {
  const o = i;
  o.type = "string";
  const { minimum: n, maximum: s, format: r, patterns: c, contentEncoding: d } = e._zod.bag;
  if (typeof n == "number" && (o.minLength = n), typeof s == "number" && (o.maxLength = s), r && (o.format = p3[r] ?? r, o.format === "" && delete o.format, r === "time" && delete o.format), d && (o.contentEncoding = d), c && c.size > 0) {
    const l = [...c];
    l.length === 1 ? o.pattern = l[0].source : l.length > 1 && (o.allOf = [
      ...l.map((u) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: u.source
      }))
    ]);
  }
}, h3 = (e, t, i, a) => {
  const o = i, { minimum: n, maximum: s, format: r, multipleOf: c, exclusiveMaximum: d, exclusiveMinimum: l } = e._zod.bag;
  typeof r == "string" && r.includes("int") ? o.type = "integer" : o.type = "number";
  const u = typeof l == "number" && l >= (n ?? Number.NEGATIVE_INFINITY), p = typeof d == "number" && d <= (s ?? Number.POSITIVE_INFINITY), f = t.target === "draft-04" || t.target === "openapi-3.0";
  u ? f ? (o.minimum = l, o.exclusiveMinimum = !0) : o.exclusiveMinimum = l : typeof n == "number" && (o.minimum = n), p ? f ? (o.maximum = d, o.exclusiveMaximum = !0) : o.exclusiveMaximum = d : typeof s == "number" && (o.maximum = s), typeof c == "number" && (o.multipleOf = c);
}, b3 = (e, t, i, a) => {
  i.type = "boolean";
}, m3 = (e, t, i, a) => {
  i.not = {};
}, g3 = (e, t, i, a) => {
}, _3 = (e, t, i, a) => {
  const o = e._zod.def, n = Tp(o.entries);
  n.every((s) => typeof s == "number") && (i.type = "number"), n.every((s) => typeof s == "string") && (i.type = "string"), i.enum = n;
}, v3 = (e, t, i, a) => {
  const o = e._zod.def, n = [];
  for (const s of o.values)
    if (s === void 0) {
      if (t.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof s == "bigint") {
      if (t.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      n.push(Number(s));
    } else
      n.push(s);
  if (n.length !== 0) if (n.length === 1) {
    const s = n[0];
    i.type = s === null ? "null" : typeof s, t.target === "draft-04" || t.target === "openapi-3.0" ? i.enum = [s] : i.const = s;
  } else
    n.every((s) => typeof s == "number") && (i.type = "number"), n.every((s) => typeof s == "string") && (i.type = "string"), n.every((s) => typeof s == "boolean") && (i.type = "boolean"), n.every((s) => s === null) && (i.type = "null"), i.enum = n;
}, y3 = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, w3 = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, k3 = (e, t, i, a) => {
  const o = i, n = e._zod.def, { minimum: s, maximum: r } = e._zod.bag;
  typeof s == "number" && (o.minItems = s), typeof r == "number" && (o.maxItems = r), o.type = "array", o.items = Be(n.element, t, {
    ...a,
    path: [...a.path, "items"]
  });
}, I3 = (e, t, i, a) => {
  const o = i, n = e._zod.def;
  o.type = "object", o.properties = {};
  const s = n.shape;
  for (const d in s)
    o.properties[d] = Be(s[d], t, {
      ...a,
      path: [...a.path, "properties", d]
    });
  const r = new Set(Object.keys(s)), c = new Set([...r].filter((d) => {
    const l = n.shape[d]._zod;
    return t.io === "input" ? l.optin === void 0 : l.optout === void 0;
  }));
  c.size > 0 && (o.required = Array.from(c)), n.catchall?._zod.def.type === "never" ? o.additionalProperties = !1 : n.catchall ? n.catchall && (o.additionalProperties = Be(n.catchall, t, {
    ...a,
    path: [...a.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, A3 = (e, t, i, a) => {
  const o = e._zod.def, n = o.inclusive === !1, s = o.options.map((r, c) => Be(r, t, {
    ...a,
    path: [...a.path, n ? "oneOf" : "anyOf", c]
  }));
  n ? i.oneOf = s : i.anyOf = s;
}, E3 = (e, t, i, a) => {
  const o = e._zod.def, n = Be(o.left, t, {
    ...a,
    path: [...a.path, "allOf", 0]
  }), s = Be(o.right, t, {
    ...a,
    path: [...a.path, "allOf", 1]
  }), r = (d) => "allOf" in d && Object.keys(d).length === 1, c = [
    ...r(n) ? n.allOf : [n],
    ...r(s) ? s.allOf : [s]
  ];
  i.allOf = c;
}, T3 = (e, t, i, a) => {
  const o = i, n = e._zod.def;
  o.type = "object";
  const s = n.keyType, c = s._zod.bag?.patterns;
  if (n.mode === "loose" && c && c.size > 0) {
    const l = Be(n.valueType, t, {
      ...a,
      path: [...a.path, "patternProperties", "*"]
    });
    o.patternProperties = {};
    for (const u of c)
      o.patternProperties[u.source] = l;
  } else
    (t.target === "draft-07" || t.target === "draft-2020-12") && (o.propertyNames = Be(n.keyType, t, {
      ...a,
      path: [...a.path, "propertyNames"]
    })), o.additionalProperties = Be(n.valueType, t, {
      ...a,
      path: [...a.path, "additionalProperties"]
    });
  const d = s._zod.values;
  if (d) {
    const l = [...d].filter((u) => typeof u == "string" || typeof u == "number");
    l.length > 0 && (o.required = l);
  }
}, S3 = (e, t, i, a) => {
  const o = e._zod.def, n = Be(o.innerType, t, a), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = o.innerType, i.nullable = !0) : i.anyOf = [n, { type: "null" }];
}, x3 = (e, t, i, a) => {
  const o = e._zod.def;
  Be(o.innerType, t, a);
  const n = t.seen.get(e);
  n.ref = o.innerType;
}, O3 = (e, t, i, a) => {
  const o = e._zod.def;
  Be(o.innerType, t, a);
  const n = t.seen.get(e);
  n.ref = o.innerType, i.default = JSON.parse(JSON.stringify(o.defaultValue));
}, V3 = (e, t, i, a) => {
  const o = e._zod.def;
  Be(o.innerType, t, a);
  const n = t.seen.get(e);
  n.ref = o.innerType, t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, C3 = (e, t, i, a) => {
  const o = e._zod.def;
  Be(o.innerType, t, a);
  const n = t.seen.get(e);
  n.ref = o.innerType;
  let s;
  try {
    s = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  i.default = s;
}, N3 = (e, t, i, a) => {
  const o = e._zod.def, n = o.in._zod.traits.has("$ZodTransform"), s = t.io === "input" ? n ? o.out : o.in : o.out;
  Be(s, t, a);
  const r = t.seen.get(e);
  r.ref = s;
}, D3 = (e, t, i, a) => {
  const o = e._zod.def;
  Be(o.innerType, t, a);
  const n = t.seen.get(e);
  n.ref = o.innerType, i.readOnly = !0;
}, Wp = (e, t, i, a) => {
  const o = e._zod.def;
  Be(o.innerType, t, a);
  const n = t.seen.get(e);
  n.ref = o.innerType;
}, P3 = /* @__PURE__ */ w("ZodISODateTime", (e, t) => {
  Pv.init(e, t), Ue.init(e, t);
});
function R3(e) {
  return /* @__PURE__ */ M2(P3, e);
}
const j3 = /* @__PURE__ */ w("ZodISODate", (e, t) => {
  Rv.init(e, t), Ue.init(e, t);
});
function $3(e) {
  return /* @__PURE__ */ z2(j3, e);
}
const U3 = /* @__PURE__ */ w("ZodISOTime", (e, t) => {
  jv.init(e, t), Ue.init(e, t);
});
function F3(e) {
  return /* @__PURE__ */ L2(U3, e);
}
const M3 = /* @__PURE__ */ w("ZodISODuration", (e, t) => {
  $v.init(e, t), Ue.init(e, t);
});
function z3(e) {
  return /* @__PURE__ */ q2(M3, e);
}
const L3 = (e, t) => {
  Vp.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (i) => T_(e, i)
      // enumerable: false,
    },
    flatten: {
      value: (i) => E_(e, i)
      // enumerable: false,
    },
    addIssue: {
      value: (i) => {
        e.issues.push(i), e.message = JSON.stringify(e.issues, Vs, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (i) => {
        e.issues.push(...i), e.message = JSON.stringify(e.issues, Vs, 2);
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
}, St = /* @__PURE__ */ w("ZodError", L3, {
  Parent: Error
}), q3 = /* @__PURE__ */ kr(St), Z3 = /* @__PURE__ */ Ir(St), H3 = /* @__PURE__ */ Vn(St), B3 = /* @__PURE__ */ Cn(St), J3 = /* @__PURE__ */ O_(St), K3 = /* @__PURE__ */ V_(St), G3 = /* @__PURE__ */ C_(St), W3 = /* @__PURE__ */ N_(St), Y3 = /* @__PURE__ */ D_(St), X3 = /* @__PURE__ */ P_(St), Q3 = /* @__PURE__ */ R_(St), e5 = /* @__PURE__ */ j_(St), Gd = /* @__PURE__ */ new WeakMap();
function fo(e, t, i) {
  const a = Object.getPrototypeOf(e);
  let o = Gd.get(a);
  if (o || (o = /* @__PURE__ */ new Set(), Gd.set(a, o)), !o.has(t)) {
    o.add(t);
    for (const n in i) {
      const s = i[n];
      Object.defineProperty(a, n, {
        configurable: !0,
        enumerable: !1,
        get() {
          const r = s.bind(this);
          return Object.defineProperty(this, n, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: r
          }), r;
        },
        set(r) {
          Object.defineProperty(this, n, {
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
const $e = /* @__PURE__ */ w("ZodType", (e, t) => (je.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: cn(e, "input"),
    output: cn(e, "output")
  }
}), e.toJSONSchema = l3(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (i, a) => q3(e, i, a, { callee: e.parse }), e.safeParse = (i, a) => H3(e, i, a), e.parseAsync = async (i, a) => Z3(e, i, a, { callee: e.parseAsync }), e.safeParseAsync = async (i, a) => B3(e, i, a), e.spa = e.safeParseAsync, e.encode = (i, a) => J3(e, i, a), e.decode = (i, a) => K3(e, i, a), e.encodeAsync = async (i, a) => G3(e, i, a), e.decodeAsync = async (i, a) => W3(e, i, a), e.safeEncode = (i, a) => Y3(e, i, a), e.safeDecode = (i, a) => X3(e, i, a), e.safeEncodeAsync = async (i, a) => Q3(e, i, a), e.safeDecodeAsync = async (i, a) => e5(e, i, a), fo(e, "ZodType", {
  check(...i) {
    const a = this.def;
    return this.clone(_i(a, {
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
    return vi(this, i, a);
  },
  brand() {
    return this;
  },
  register(i, a) {
    return i.add(this, a), this;
  },
  refine(i, a) {
    return this.check(J5(i, a));
  },
  superRefine(i, a) {
    return this.check(K5(i, a));
  },
  overwrite(i) {
    return this.check(/* @__PURE__ */ va(i));
  },
  optional() {
    return eu(this);
  },
  exactOptional() {
    return P5(this);
  },
  nullable() {
    return tu(this);
  },
  nullish() {
    return eu(tu(this));
  },
  nonoptional(i) {
    return M5(this, i);
  },
  array() {
    return Y(this);
  },
  or(i) {
    return T5([this, i]);
  },
  and(i) {
    return O5(this, i);
  },
  transform(i) {
    return iu(this, N5(i));
  },
  default(i) {
    return $5(this, i);
  },
  prefault(i) {
    return F5(this, i);
  },
  catch(i) {
    return L5(this, i);
  },
  pipe(i) {
    return iu(this, i);
  },
  readonly() {
    return H5(this);
  },
  describe(i) {
    const a = this.clone();
    return Va.add(a, { description: i }), a;
  },
  meta(...i) {
    if (i.length === 0)
      return Va.get(this);
    const a = this.clone();
    return Va.add(a, i[0]), a;
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
    return Va.get(e)?.description;
  },
  configurable: !0
}), e)), Yp = /* @__PURE__ */ w("_ZodString", (e, t) => {
  Ar.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (a, o, n) => f3(e, a, o);
  const i = e._zod.bag;
  e.format = i.format ?? null, e.minLength = i.minimum ?? null, e.maxLength = i.maximum ?? null, fo(e, "_ZodString", {
    regex(...a) {
      return this.check(/* @__PURE__ */ G2(...a));
    },
    includes(...a) {
      return this.check(/* @__PURE__ */ X2(...a));
    },
    startsWith(...a) {
      return this.check(/* @__PURE__ */ Q2(...a));
    },
    endsWith(...a) {
      return this.check(/* @__PURE__ */ e3(...a));
    },
    min(...a) {
      return this.check(/* @__PURE__ */ rn(...a));
    },
    max(...a) {
      return this.check(/* @__PURE__ */ Hp(...a));
    },
    length(...a) {
      return this.check(/* @__PURE__ */ Bp(...a));
    },
    nonempty(...a) {
      return this.check(/* @__PURE__ */ rn(1, ...a));
    },
    lowercase(a) {
      return this.check(/* @__PURE__ */ W2(a));
    },
    uppercase(a) {
      return this.check(/* @__PURE__ */ Y2(a));
    },
    trim() {
      return this.check(/* @__PURE__ */ i3());
    },
    normalize(...a) {
      return this.check(/* @__PURE__ */ t3(...a));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ a3());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ o3());
    },
    slugify() {
      return this.check(/* @__PURE__ */ n3());
    }
  });
}), t5 = /* @__PURE__ */ w("ZodString", (e, t) => {
  Ar.init(e, t), Yp.init(e, t), e.email = (i) => e.check(/* @__PURE__ */ v2(i5, i)), e.url = (i) => e.check(/* @__PURE__ */ A2(a5, i)), e.jwt = (i) => e.check(/* @__PURE__ */ F2(_5, i)), e.emoji = (i) => e.check(/* @__PURE__ */ E2(o5, i)), e.guid = (i) => e.check(/* @__PURE__ */ Hd(Wd, i)), e.uuid = (i) => e.check(/* @__PURE__ */ y2(Eo, i)), e.uuidv4 = (i) => e.check(/* @__PURE__ */ w2(Eo, i)), e.uuidv6 = (i) => e.check(/* @__PURE__ */ k2(Eo, i)), e.uuidv7 = (i) => e.check(/* @__PURE__ */ I2(Eo, i)), e.nanoid = (i) => e.check(/* @__PURE__ */ T2(n5, i)), e.guid = (i) => e.check(/* @__PURE__ */ Hd(Wd, i)), e.cuid = (i) => e.check(/* @__PURE__ */ S2(s5, i)), e.cuid2 = (i) => e.check(/* @__PURE__ */ x2(r5, i)), e.ulid = (i) => e.check(/* @__PURE__ */ O2(c5, i)), e.base64 = (i) => e.check(/* @__PURE__ */ j2(b5, i)), e.base64url = (i) => e.check(/* @__PURE__ */ $2(m5, i)), e.xid = (i) => e.check(/* @__PURE__ */ V2(d5, i)), e.ksuid = (i) => e.check(/* @__PURE__ */ C2(u5, i)), e.ipv4 = (i) => e.check(/* @__PURE__ */ N2(l5, i)), e.ipv6 = (i) => e.check(/* @__PURE__ */ D2(p5, i)), e.cidrv4 = (i) => e.check(/* @__PURE__ */ P2(f5, i)), e.cidrv6 = (i) => e.check(/* @__PURE__ */ R2(h5, i)), e.e164 = (i) => e.check(/* @__PURE__ */ U2(g5, i)), e.datetime = (i) => e.check(R3(i)), e.date = (i) => e.check($3(i)), e.time = (i) => e.check(F3(i)), e.duration = (i) => e.check(z3(i));
});
function v(e) {
  return /* @__PURE__ */ _2(t5, e);
}
const Ue = /* @__PURE__ */ w("ZodStringFormat", (e, t) => {
  Re.init(e, t), Yp.init(e, t);
}), i5 = /* @__PURE__ */ w("ZodEmail", (e, t) => {
  Ev.init(e, t), Ue.init(e, t);
}), Wd = /* @__PURE__ */ w("ZodGUID", (e, t) => {
  Iv.init(e, t), Ue.init(e, t);
}), Eo = /* @__PURE__ */ w("ZodUUID", (e, t) => {
  Av.init(e, t), Ue.init(e, t);
}), a5 = /* @__PURE__ */ w("ZodURL", (e, t) => {
  Tv.init(e, t), Ue.init(e, t);
}), o5 = /* @__PURE__ */ w("ZodEmoji", (e, t) => {
  Sv.init(e, t), Ue.init(e, t);
}), n5 = /* @__PURE__ */ w("ZodNanoID", (e, t) => {
  xv.init(e, t), Ue.init(e, t);
}), s5 = /* @__PURE__ */ w("ZodCUID", (e, t) => {
  Ov.init(e, t), Ue.init(e, t);
}), r5 = /* @__PURE__ */ w("ZodCUID2", (e, t) => {
  Vv.init(e, t), Ue.init(e, t);
}), c5 = /* @__PURE__ */ w("ZodULID", (e, t) => {
  Cv.init(e, t), Ue.init(e, t);
}), d5 = /* @__PURE__ */ w("ZodXID", (e, t) => {
  Nv.init(e, t), Ue.init(e, t);
}), u5 = /* @__PURE__ */ w("ZodKSUID", (e, t) => {
  Dv.init(e, t), Ue.init(e, t);
}), l5 = /* @__PURE__ */ w("ZodIPv4", (e, t) => {
  Uv.init(e, t), Ue.init(e, t);
}), p5 = /* @__PURE__ */ w("ZodIPv6", (e, t) => {
  Fv.init(e, t), Ue.init(e, t);
}), f5 = /* @__PURE__ */ w("ZodCIDRv4", (e, t) => {
  Mv.init(e, t), Ue.init(e, t);
}), h5 = /* @__PURE__ */ w("ZodCIDRv6", (e, t) => {
  zv.init(e, t), Ue.init(e, t);
}), b5 = /* @__PURE__ */ w("ZodBase64", (e, t) => {
  Lv.init(e, t), Ue.init(e, t);
}), m5 = /* @__PURE__ */ w("ZodBase64URL", (e, t) => {
  Zv.init(e, t), Ue.init(e, t);
}), g5 = /* @__PURE__ */ w("ZodE164", (e, t) => {
  Hv.init(e, t), Ue.init(e, t);
}), _5 = /* @__PURE__ */ w("ZodJWT", (e, t) => {
  Jv.init(e, t), Ue.init(e, t);
}), Xp = /* @__PURE__ */ w("ZodNumber", (e, t) => {
  Mp.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (a, o, n) => h3(e, a, o), fo(e, "ZodNumber", {
    gt(a, o) {
      return this.check(/* @__PURE__ */ Jd(a, o));
    },
    gte(a, o) {
      return this.check(/* @__PURE__ */ Qn(a, o));
    },
    min(a, o) {
      return this.check(/* @__PURE__ */ Qn(a, o));
    },
    lt(a, o) {
      return this.check(/* @__PURE__ */ Bd(a, o));
    },
    lte(a, o) {
      return this.check(/* @__PURE__ */ Xn(a, o));
    },
    max(a, o) {
      return this.check(/* @__PURE__ */ Xn(a, o));
    },
    int(a) {
      return this.check(Yd(a));
    },
    safe(a) {
      return this.check(Yd(a));
    },
    positive(a) {
      return this.check(/* @__PURE__ */ Jd(0, a));
    },
    nonnegative(a) {
      return this.check(/* @__PURE__ */ Qn(0, a));
    },
    negative(a) {
      return this.check(/* @__PURE__ */ Bd(0, a));
    },
    nonpositive(a) {
      return this.check(/* @__PURE__ */ Xn(0, a));
    },
    multipleOf(a, o) {
      return this.check(/* @__PURE__ */ Kd(a, o));
    },
    step(a, o) {
      return this.check(/* @__PURE__ */ Kd(a, o));
    },
    finite() {
      return this;
    }
  });
  const i = e._zod.bag;
  e.minValue = Math.max(i.minimum ?? Number.NEGATIVE_INFINITY, i.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(i.maximum ?? Number.POSITIVE_INFINITY, i.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (i.format ?? "").includes("int") || Number.isSafeInteger(i.multipleOf ?? 0.5), e.isFinite = !0, e.format = i.format ?? null;
});
function ne(e) {
  return /* @__PURE__ */ Z2(Xp, e);
}
const v5 = /* @__PURE__ */ w("ZodNumberFormat", (e, t) => {
  Kv.init(e, t), Xp.init(e, t);
});
function Yd(e) {
  return /* @__PURE__ */ H2(v5, e);
}
const y5 = /* @__PURE__ */ w("ZodBoolean", (e, t) => {
  Gv.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => b3(e, i, a);
});
function ba(e) {
  return /* @__PURE__ */ B2(y5, e);
}
const w5 = /* @__PURE__ */ w("ZodUnknown", (e, t) => {
  Wv.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => g3();
});
function Xd() {
  return /* @__PURE__ */ J2(w5);
}
const k5 = /* @__PURE__ */ w("ZodNever", (e, t) => {
  Yv.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => m3(e, i, a);
});
function I5(e) {
  return /* @__PURE__ */ K2(k5, e);
}
const A5 = /* @__PURE__ */ w("ZodArray", (e, t) => {
  Xv.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => k3(e, i, a, o), e.element = t.element, fo(e, "ZodArray", {
    min(i, a) {
      return this.check(/* @__PURE__ */ rn(i, a));
    },
    nonempty(i) {
      return this.check(/* @__PURE__ */ rn(1, i));
    },
    max(i, a) {
      return this.check(/* @__PURE__ */ Hp(i, a));
    },
    length(i, a) {
      return this.check(/* @__PURE__ */ Bp(i, a));
    },
    unwrap() {
      return this.element;
    }
  });
});
function Y(e, t) {
  return /* @__PURE__ */ s3(A5, e, t);
}
const E5 = /* @__PURE__ */ w("ZodObject", (e, t) => {
  e2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => I3(e, i, a, o), Te(e, "shape", () => t.shape), fo(e, "ZodObject", {
    keyof() {
      return Se(Object.keys(this._zod.def.shape));
    },
    catchall(i) {
      return this.clone({ ...this._zod.def, catchall: i });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: Xd() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: Xd() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: I5() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: void 0 });
    },
    extend(i) {
      return v_(this, i);
    },
    safeExtend(i) {
      return y_(this, i);
    },
    merge(i) {
      return w_(this, i);
    },
    pick(i) {
      return g_(this, i);
    },
    omit(i) {
      return __(this, i);
    },
    partial(...i) {
      return k_(tf, this, i[0]);
    },
    required(...i) {
      return I_(af, this, i[0]);
    }
  });
});
function Z(e, t) {
  const i = {
    type: "object",
    shape: e ?? {},
    ...ee(t)
  };
  return new E5(i);
}
const Qp = /* @__PURE__ */ w("ZodUnion", (e, t) => {
  qp.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => A3(e, i, a, o), e.options = t.options;
});
function T5(e, t) {
  return new Qp({
    type: "union",
    options: e,
    ...ee(t)
  });
}
const S5 = /* @__PURE__ */ w("ZodDiscriminatedUnion", (e, t) => {
  Qp.init(e, t), t2.init(e, t);
});
function ef(e, t, i) {
  return new S5({
    type: "union",
    options: t,
    discriminator: e,
    ...ee(i)
  });
}
const x5 = /* @__PURE__ */ w("ZodIntersection", (e, t) => {
  i2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => E3(e, i, a, o);
});
function O5(e, t) {
  return new x5({
    type: "intersection",
    left: e,
    right: t
  });
}
const Qd = /* @__PURE__ */ w("ZodRecord", (e, t) => {
  a2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => T3(e, i, a, o), e.keyType = t.keyType, e.valueType = t.valueType;
});
function ho(e, t, i) {
  return !t || !t._zod ? new Qd({
    type: "record",
    keyType: v(),
    valueType: e,
    ...ee(t)
  }) : new Qd({
    type: "record",
    keyType: e,
    valueType: t,
    ...ee(i)
  });
}
const Ns = /* @__PURE__ */ w("ZodEnum", (e, t) => {
  o2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (a, o, n) => _3(e, a, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const i = new Set(Object.keys(t.entries));
  e.extract = (a, o) => {
    const n = {};
    for (const s of a)
      if (i.has(s))
        n[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new Ns({
      ...t,
      checks: [],
      ...ee(o),
      entries: n
    });
  }, e.exclude = (a, o) => {
    const n = { ...t.entries };
    for (const s of a)
      if (i.has(s))
        delete n[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new Ns({
      ...t,
      checks: [],
      ...ee(o),
      entries: n
    });
  };
});
function Se(e, t) {
  const i = Array.isArray(e) ? Object.fromEntries(e.map((a) => [a, a])) : e;
  return new Ns({
    type: "enum",
    entries: i,
    ...ee(t)
  });
}
const V5 = /* @__PURE__ */ w("ZodLiteral", (e, t) => {
  n2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => v3(e, i, a), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function le(e, t) {
  return new V5({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...ee(t)
  });
}
const C5 = /* @__PURE__ */ w("ZodTransform", (e, t) => {
  s2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => w3(e, i), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new Ep(e.constructor.name);
    i.addIssue = (n) => {
      if (typeof n == "string")
        i.issues.push(eo(n, i.value, t));
      else {
        const s = n;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = i.value), s.inst ?? (s.inst = e), i.issues.push(eo(s));
      }
    };
    const o = t.transform(i.value, i);
    return o instanceof Promise ? o.then((n) => (i.value = n, i.fallback = !0, i)) : (i.value = o, i.fallback = !0, i);
  };
});
function N5(e) {
  return new C5({
    type: "transform",
    transform: e
  });
}
const tf = /* @__PURE__ */ w("ZodOptional", (e, t) => {
  Zp.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => Wp(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function eu(e) {
  return new tf({
    type: "optional",
    innerType: e
  });
}
const D5 = /* @__PURE__ */ w("ZodExactOptional", (e, t) => {
  r2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => Wp(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function P5(e) {
  return new D5({
    type: "optional",
    innerType: e
  });
}
const R5 = /* @__PURE__ */ w("ZodNullable", (e, t) => {
  c2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => S3(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function tu(e) {
  return new R5({
    type: "nullable",
    innerType: e
  });
}
const j5 = /* @__PURE__ */ w("ZodDefault", (e, t) => {
  d2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => O3(e, i, a, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function $5(e, t) {
  return new j5({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : xp(t);
    }
  });
}
const U5 = /* @__PURE__ */ w("ZodPrefault", (e, t) => {
  u2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => V3(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function F5(e, t) {
  return new U5({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : xp(t);
    }
  });
}
const af = /* @__PURE__ */ w("ZodNonOptional", (e, t) => {
  l2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => x3(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function M5(e, t) {
  return new af({
    type: "nonoptional",
    innerType: e,
    ...ee(t)
  });
}
const z5 = /* @__PURE__ */ w("ZodCatch", (e, t) => {
  p2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => C3(e, i, a, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function L5(e, t) {
  return new z5({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const q5 = /* @__PURE__ */ w("ZodPipe", (e, t) => {
  f2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => N3(e, i, a, o), e.in = t.in, e.out = t.out;
});
function iu(e, t) {
  return new q5({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Z5 = /* @__PURE__ */ w("ZodReadonly", (e, t) => {
  h2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => D3(e, i, a, o), e.unwrap = () => e._zod.def.innerType;
});
function H5(e) {
  return new Z5({
    type: "readonly",
    innerType: e
  });
}
const of = /* @__PURE__ */ w("ZodCustom", (e, t) => {
  b2.init(e, t), $e.init(e, t), e._zod.processJSONSchema = (i, a, o) => y3(e, i);
});
function B5(e, t) {
  return /* @__PURE__ */ r3(of, e ?? (() => !0), t);
}
function J5(e, t = {}) {
  return /* @__PURE__ */ c3(of, e, t);
}
function K5(e, t) {
  return /* @__PURE__ */ d3(e, t);
}
const nf = Se([
  "canon_exact",
  "canon_paraphrase",
  "supported_inference",
  "AU_extension",
  "rejected"
]), G5 = Se([
  "terminology",
  "profile",
  "appearance",
  "personality",
  "story",
  "combat",
  "boundary",
  "production"
]), W5 = Se([
  "official-game",
  "community-transcript",
  "community-reference",
  "gameplay-recording",
  "project-artifact"
]), Y5 = Se([
  "metadata-only",
  "no-reprint",
  "project-internal"
]), X5 = Z({
  id: v().min(1),
  kind: W5,
  title: v().min(1),
  url: v().url().optional(),
  localPath: v().min(1).optional(),
  locator: v().min(1),
  language: v().min(1),
  checkedAt: v().regex(/^\d{4}-\d{2}-\d{2}$/u),
  revisionId: ne().int().positive().optional(),
  revisionTimestamp: v().min(1).optional(),
  redistribution: Y5,
  note: v().min(1).optional()
}).strict().refine((e) => !!e.url != !!e.localPath, {
  message: "Canon source must declare exactly one of url or localPath"
}), Q5 = Z({
  sourceId: v().min(1),
  locator: v().min(1)
}).strict(), e6 = Z({
  id: v().min(1),
  classification: nf,
  scope: G5,
  statement: v().min(1),
  recapText: v().min(1).optional(),
  evidence: Y(Q5).min(1),
  reviewedAt: v().regex(/^\d{4}-\d{2}-\d{2}$/u),
  rationale: v().min(1).optional(),
  rejectionReason: v().min(1).optional()
}).strict().superRefine((e, t) => {
  e.classification === "rejected" && !e.rejectionReason && t.addIssue({ code: "custom", path: ["rejectionReason"], message: "Rejected claims require a rejection reason" }), e.classification !== "rejected" && e.rejectionReason && t.addIssue({ code: "custom", path: ["rejectionReason"], message: "Only rejected claims may declare a rejection reason" });
}), sf = Z({
  classification: nf,
  scope: Se(["canon_recap", "AU_boundary", "route"]),
  claimIds: Y(v().min(1)).min(1),
  sourceIds: Y(v().min(1)).min(1),
  note: v().min(1)
}).strict().superRefine((e, t) => {
  e.classification === "rejected" && t.addIssue({ code: "custom", path: ["classification"], message: "Rejected content cannot enter a published scene" }), e.scope === "canon_recap" && e.classification !== "canon_paraphrase" && t.addIssue({ code: "custom", path: ["classification"], message: "Canon recap scenes must be canon_paraphrase" }), e.scope !== "canon_recap" && e.classification !== "AU_extension" && t.addIssue({ code: "custom", path: ["classification"], message: "AU boundary and route scenes must be AU_extension" });
}), t6 = Z({
  sceneIds: Y(v().min(1)).min(1),
  provenance: sf
}).strict(), i6 = Z({
  claimId: v().min(1),
  sceneIds: Y(v().min(1)),
  worldbookEntryIds: Y(v().min(1)),
  cardFields: Y(v().min(1)),
  disposition: Se(["published", "production-constraint", "rejected"]),
  note: v().min(1)
}).strict().superRefine((e, t) => {
  const i = e.sceneIds.length + e.worldbookEntryIds.length + e.cardFields.length;
  e.disposition !== "rejected" && i === 0 && t.addIssue({ code: "custom", path: ["sceneIds"], message: "Published claims require at least one consumer" }), e.disposition === "rejected" && i !== 0 && t.addIssue({ code: "custom", path: ["sceneIds"], message: "Rejected claims cannot have published consumers" });
});
function rf(e, t, i) {
  const a = /* @__PURE__ */ new Set();
  t.forEach((o, n) => {
    a.has(o.id) && e.addIssue({ code: "custom", path: [i, n, "id"], message: `Duplicate id: ${o.id}` }), a.add(o.id);
  });
}
Z({ version: le(1), sources: Y(X5).min(1) }).strict().superRefine((e, t) => rf(t, e.sources, "sources"));
Z({ version: le(1), claims: Y(e6).min(1) }).strict().superRefine((e, t) => rf(t, e.claims, "claims"));
Z({ version: le(1), entries: Y(t6).min(1) }).strict().superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.entries.forEach((a, o) => a.sceneIds.forEach((n, s) => {
    i.has(n) && t.addIssue({ code: "custom", path: ["entries", o, "sceneIds", s], message: `Duplicate scene provenance: ${n}` }), i.add(n);
  }));
});
Z({
  version: le(1),
  scope: v().min(1),
  exclusions: Y(Z({ scope: v().min(1), reason: v().min(1) }).strict()),
  entries: Y(i6).min(1)
}).strict().superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.entries.forEach((a, o) => {
    i.has(a.claimId) && t.addIssue({ code: "custom", path: ["entries", o, "claimId"], message: `Duplicate claim coverage: ${a.claimId}` }), i.add(a.claimId);
  });
});
const ht = Se([
  "white_canvas",
  "golden_bough_rebuild",
  "ring_conspiracy"
]), Pe = v().min(1), a6 = Se([
  "affectionAlbina",
  "trust",
  "danger",
  "artResonance"
]), cf = Se([
  "intimacy",
  "reliance",
  "obsession",
  "suspicion"
]), o6 = Se([
  "blade",
  "boundary",
  "analysis",
  "resonance"
]), Dn = Z({
  affectionAlbina: ne().finite().optional(),
  trust: ne().finite().optional(),
  danger: ne().finite().optional(),
  artResonance: ne().finite().optional(),
  composure: ne().finite().optional(),
  materials: ne().finite().optional(),
  leverage: ne().finite().optional(),
  exposure: ne().finite().optional()
}).strict(), df = Z({
  intimacy: ne().finite().optional(),
  reliance: ne().finite().optional(),
  obsession: ne().finite().optional(),
  suspicion: ne().finite().optional()
}).strict(), n6 = Z({
  blade: ne().finite().optional(),
  boundary: ne().finite().optional(),
  analysis: ne().finite().optional(),
  resonance: ne().finite().optional()
}).strict(), s6 = Z({
  battleId: Pe,
  outcome: Se(["victory", "setback"])
}).strict(), au = {
  operator: Se(["gte", "lte", "eq"]),
  value: ne().finite()
}, uf = ef("kind", [
  Z({ kind: le("value"), key: a6, ...au }).strict(),
  Z({ kind: le("relationship"), key: cf, ...au }).strict(),
  Z({ kind: le("flag"), flag: Pe, equals: ba() }).strict(),
  Z({ kind: le("quest"), questId: Pe, status: Se(["active", "completed"]) }).strict(),
  Z({ kind: le("battle"), battleId: Pe, outcome: Se(["victory", "setback"]).optional() }).strict(),
  Z({ kind: le("item"), itemId: Pe }).strict(),
  Z({ kind: le("equipment"), equipmentId: Pe }).strict(),
  Z({ kind: le("outfit"), outfitId: Pe }).strict(),
  Z({ kind: le("profession"), professionId: Pe, levelGte: ne().int().positive() }).strict(),
  Z({ kind: le("worldbook"), entryId: Pe, status: Se(["active", "seen"]) }).strict()
]), r6 = Z({
  id: cf,
  label: v().min(1),
  minimum: ne().finite(),
  maximum: ne().finite()
}).strict().refine((e) => e.minimum < e.maximum, { message: "Relationship track minimum must be below maximum" }), c6 = Z({
  id: Pe,
  route: ht,
  label: v().min(1),
  description: v().min(1)
}).strict(), d6 = Z({
  id: Pe,
  route: ht,
  label: v().min(1),
  description: v().min(1),
  recommendedMastery: o6
}).strict(), u6 = Z({
  id: Pe,
  route: ht.optional(),
  label: v().min(1),
  description: v().min(1)
}).strict(), l6 = Z({
  id: Pe,
  itemId: Pe,
  route: ht.optional(),
  slot: Se(["weapon", "armor", "accessory", "tool"]),
  label: v().min(1),
  modifiers: Dn
}).strict(), p6 = Z({
  id: Pe,
  route: ht.optional(),
  label: v().min(1),
  portraitAssetId: Pe
}).strict(), f6 = Z({
  id: Pe,
  route: ht.optional(),
  label: v().min(1),
  xpThresholds: Y(ne().int().nonnegative()).min(1),
  modifiersPerLevel: Dn
}).strict().superRefine((e, t) => {
  e.xpThresholds[0] !== 0 && t.addIssue({ code: "custom", path: ["xpThresholds", 0], message: "The first profession threshold must be zero" }), e.xpThresholds.slice(1).forEach((i, a) => {
    i <= e.xpThresholds[a] && t.addIssue({ code: "custom", path: ["xpThresholds", a + 1], message: "Profession thresholds must increase" });
  });
}), h6 = Z({
  values: Dn.optional(),
  relationshipVectors: df.optional(),
  professionXp: ho(Pe, ne().int().positive()).optional(),
  setFlags: Y(Pe).optional(),
  grantItems: Y(Pe).optional(),
  unlockOutfits: Y(Pe).optional()
}).strict(), b6 = Z({
  id: Pe,
  route: ht.optional(),
  label: v().min(1),
  description: v().min(1),
  eligibility: Y(uf).min(1),
  reward: h6
}).strict(), m6 = Z({
  id: Pe,
  claimIds: Y(Pe),
  constant: ba(),
  selective: ba(),
  content: v().min(1)
}).strict(), g6 = Z({
  relationshipTracks: Y(r6),
  quests: Y(c6),
  battles: Y(d6),
  items: Y(u6),
  equipment: Y(l6),
  professions: Y(f6),
  achievements: Y(b6),
  outfits: Y(p6),
  worldbookEntries: Y(m6)
}).strict();
function _6(e, t, i) {
  const a = /* @__PURE__ */ new Set();
  e.forEach((o, n) => {
    a.has(o.id) && i.addIssue({ code: "custom", path: [t, n, "id"], message: `Duplicate ${t} id: ${o.id}` }), a.add(o.id);
  });
}
function v6(e, t) {
  const i = new Set(e.items.map(({ id: a }) => a));
  e.equipment.forEach((a, o) => {
    i.has(a.itemId) || t.addIssue({ code: "custom", path: ["equipment", o, "itemId"], message: `Unknown item reference: ${a.itemId}` });
  });
}
const y6 = g6.superRefine((e, t) => {
  for (const i of ["relationshipTracks", "quests", "battles", "items", "equipment", "professions", "achievements", "outfits", "worldbookEntries"])
    _6(e[i], i, t);
  v6(e, t);
}), Zi = 2, w6 = Dn, k6 = Z({
  route: ht.optional(),
  values: w6.optional(),
  relationshipVectors: df.optional(),
  conflictMastery: n6.optional(),
  setFlags: Y(v().min(1)).optional(),
  clearFlags: Y(v().min(1)).optional(),
  unlockCg: Y(v().min(1)).optional(),
  grantItems: Y(v().min(1)).optional(),
  equipItems: Y(v().min(1)).optional(),
  unlockOutfits: Y(v().min(1)).optional(),
  activateOutfit: v().min(1).optional(),
  startQuests: Y(v().min(1)).optional(),
  completeQuests: Y(v().min(1)).optional(),
  resolveBattles: Y(s6).optional(),
  professionXp: ho(v().min(1), ne().int().positive()).optional(),
  activateProfession: v().min(1).optional()
}).strict(), ou = uf, lf = Z({
  allOf: Y(ou).min(1).optional(),
  anyOf: Y(ou).min(1).optional(),
  fallback: ba().optional()
}).strict().refine((e) => e.allOf || e.anyOf || e.fallback === !0, {
  message: "Choice availability must declare predicates or a fallback"
}), I6 = Z({
  route: ht,
  kind: Se(["true", "normal", "bad"]),
  eligibility: lf
}).strict(), A6 = Z({
  id: v().min(1),
  text: v().min(1),
  nextSceneId: v().min(1),
  resultText: v().min(1).optional(),
  resultVoiceAssetId: v().min(1).optional(),
  availability: lf.optional(),
  effects: k6
}).strict(), E6 = Z({
  characterId: v().min(1),
  portraitAssetId: v().min(1),
  position: Se(["far-left", "left", "center", "right", "far-right"]),
  active: ba(),
  scale: ne().positive().finite()
}).strict(), T6 = Z({
  version: le(Zi),
  id: v().min(1),
  chapter: ne().int().nonnegative(),
  route: ht.nullable(),
  provenance: sf,
  locationId: v().min(1),
  backgroundAssetId: v().min(1),
  cgAssetId: v().min(1).optional(),
  videoAssetId: v().min(1).optional(),
  desktopVideoAssetId: v().min(1).optional(),
  tone: v().min(1),
  portraits: Y(E6),
  speaker: v().min(1),
  text: v(),
  voiceAssetId: v().min(1).optional(),
  bgmAssetId: v().min(1).optional(),
  sfxAssetIds: Y(v().min(1)).optional(),
  choices: Y(A6),
  ending: I6.optional()
}).strict(), S6 = T6.superRefine((e, t) => {
  e.provenance.scope !== "route" && e.route !== null && t.addIssue({ code: "custom", path: ["route"], message: "Canon recap and AU boundary scenes must use a null route" }), e.provenance.scope === "route" && e.route === null && t.addIssue({ code: "custom", path: ["route"], message: "Only canon recap and AU boundary scenes may use a null route" });
});
function x6(e) {
  return e.startsWith("/") || e.endsWith("/") || e.includes("\\") || e.includes(":") ? !1 : e.split("/").every((t) => t.length > 0 && t !== "." && t !== "..");
}
const bo = v().min(1).refine(x6, {
  message: "Asset paths must be relative to the canonical asset root"
}), pf = Se(["pie", "x666-openai-compatible"]), ff = Se(["gpt-image-2", "seedance-1.5-pro", "speech-2.8-hd"]), Er = v().regex(/^[a-z0-9][a-z0-9._-]*$/iu), hf = Z({
  cueAlias: v().regex(/^[a-z0-9][a-z0-9_]*$/u),
  title: v().min(1),
  creator: v().min(1),
  isrc: v().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/u),
  sourceUrl: v().url(),
  licenseId: le("CC-BY-4.0"),
  licenseUrl: le("https://creativecommons.org/licenses/by/4.0/"),
  attribution: v().min(1)
}).strict(), O6 = Z({
  version: le(1),
  projectId: le("albina-galgame-card"),
  packagedNotice: v().min(1),
  tracks: Y(hf.extend({
    assetId: v().min(1),
    path: bo.refine((e) => e.startsWith("audio/bgm/"), {
      message: "Licensed music paths must be inside audio/bgm"
    }),
    sha256: v().regex(/^[a-f0-9]{64}$/u)
  }).strict()).length(5),
  officialSoundtrack: Z({
    publisher: le("ProjectMoon"),
    channel: le("ProjectMoon Official"),
    playlistTitle: le("LCB OST"),
    playlistTrackCount: le(35),
    verifiedOn: le("2026-07-15"),
    bundled: le(!1),
    cached: le(!1),
    redistributionAllowed: le(!1),
    notice: v().min(1),
    rightsNotice: v().min(1),
    links: Y(Z({ label: v().min(1), url: v().url() }).strict()).length(2),
    termsUrl: le("https://limbuscompany.com/terms-of-service/")
  }).strict()
}).strict().superRefine((e, t) => {
  e.tracks.forEach((i, a) => {
    i.creator !== "Kevin MacLeod" && t.addIssue({ code: "custom", path: ["tracks", a, "creator"], message: "Packaged BGM creator must be Kevin MacLeod" });
    const o = new URL(i.sourceUrl);
    (o.protocol !== "https:" || o.hostname !== "incompetech.com" || o.pathname !== "/music/royalty-free/index.html" || o.searchParams.get("isrc") !== i.isrc) && t.addIssue({ code: "custom", path: ["tracks", a, "sourceUrl"], message: "Track source must be its HTTPS Incompetech ISRC page" });
  });
}), V6 = Z({
  provider: pf,
  model: ff,
  upstreamPieVerified: le(!1).optional(),
  promptVersion: Er,
  sourceJobHash: v().regex(/^[a-f0-9]{64}$/iu),
  review: Z({
    status: le("approved"),
    reviewer: v().min(1),
    reviewedAt: v().datetime()
  }).strict()
}).strict().superRefine((e, t) => {
  bf(t, ["model"], e.provider, e.model), mf(t, ["upstreamPieVerified"], e.provider, e.upstreamPieVerified);
}), C6 = Z({
  status: Se(["verified", "unverified"]),
  sourceType: Se(["model-output", "project-authored", "licensed-source", "third-party-source"]),
  redistribution: Se(["allowed", "restricted", "unverified"]),
  rightsBasis: v().min(1),
  holder: v().min(1).optional(),
  sourceUrl: v().url().optional()
}).strict().superRefine((e, t) => {
  e.status === "verified" && e.redistribution !== "allowed" && t.addIssue({ code: "custom", path: ["redistribution"], message: "Verified asset rights must allow redistribution" }), e.status === "verified" && !e.holder && t.addIssue({ code: "custom", path: ["holder"], message: "Verified asset rights require a holder" });
}), N6 = Z({
  assetId: v().min(1).optional(),
  sha256: v().regex(/^[a-f0-9]{64}$/iu),
  role: v().min(1)
}).strict(), D6 = Z({
  kind: Se(["original", "derivative", "transcode", "conversion"]),
  processVersion: Er,
  inputs: Y(N6)
}).strict().superRefine((e, t) => {
  e.kind === "original" && e.inputs.length !== 0 && t.addIssue({ code: "custom", path: ["inputs"], message: "Original assets cannot declare parent inputs" }), e.kind !== "original" && e.inputs.length === 0 && t.addIssue({ code: "custom", path: ["inputs"], message: "Derived assets require at least one parent input" });
}), P6 = Z({
  id: v().min(1),
  kind: Se(["image", "video", "audio", "json"]),
  path: bo,
  mimeType: v().min(1).optional(),
  sha256: v().regex(/^[a-f0-9]{64}$/i).optional(),
  bytes: ne().int().nonnegative().optional(),
  provenance: V6.optional(),
  rights: C6.optional(),
  lineage: D6.optional(),
  license: hf.optional()
}).strict().superRefine((e, t) => {
  e.path.startsWith("audio/bgm/") && !e.license && t.addIssue({ code: "custom", path: ["license"], message: "Packaged BGM requires registered license metadata" }), e.license && e.kind !== "audio" && t.addIssue({ code: "custom", path: ["license"], message: "License metadata is only supported on audio assets" });
}), R6 = ef("kind", [
  Z({ kind: le("static") }).strict(),
  Z({
    kind: le("strip"),
    frameCount: le(8),
    frameWidth: ne().int().positive(),
    frameHeight: ne().int().positive(),
    fps: ne().positive().finite()
  }).strict()
]), j6 = Z({
  version: le(Zi),
  id: v().min(1),
  characterId: v().min(1),
  path: bo,
  animation: R6,
  fallbackAssetId: v().min(1).optional()
}).strict(), $6 = Z({
  version: le(Zi),
  id: v().min(1),
  assetId: v().min(1),
  kind: Se(["image", "image-edit", "video", "speech"]),
  provider: pf,
  model: ff,
  upstreamPieVerified: le(!1).optional(),
  promptVersion: Er,
  status: Se(["pending", "running", "completed", "failed"]),
  contentHash: v().regex(/^[a-f0-9]{64}$/i),
  inputAssetIds: Y(v().min(1)),
  outputPath: bo,
  attempts: ne().int().nonnegative(),
  error: v().optional()
}).strict().superRefine((e, t) => {
  const i = e.kind === "image-edit" ? "image" : e.kind;
  bf(t, ["model"], e.provider, e.model, i), mf(t, ["upstreamPieVerified"], e.provider, e.upstreamPieVerified);
});
function bf(e, t, i, a, o) {
  const n = i === "x666-openai-compatible" ? ["gpt-image-2"] : i === "pie" ? ["seedance-1.5-pro", "speech-2.8-hd"] : [], s = o === void 0 || { image: ["gpt-image-2"], video: ["seedance-1.5-pro"], speech: ["speech-2.8-hd"] }[o].includes(a);
  (!n.includes(a) || !s) && e.addIssue({ code: "custom", path: t, message: `Unsupported provider/model pair: ${i}/${a}` });
}
function mf(e, t, i, a) {
  (i === "x666-openai-compatible" ? a === !1 : a === void 0) || e.addIssue({ code: "custom", path: t, message: `Invalid upstream Pie evidence for provider: ${i}` });
}
const U6 = Z({
  version: le(Zi),
  projectId: le("albina-galgame-card"),
  basePath: bo,
  assets: Y(P6),
  portraits: Y(j6),
  mediaJobs: Y($6)
}).strict();
function To(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
const gf = U6.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.assets.forEach((a, o) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["assets", o, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id);
  }), e.assets.forEach((a, o) => {
    a.lineage?.inputs.forEach((n, s) => {
      if (!n.assetId) return;
      const r = e.assets.find((c) => c.id === n.assetId);
      r ? r.sha256 !== n.sha256 && t.addIssue({ code: "custom", path: ["assets", o, "lineage", "inputs", s, "sha256"], message: `Lineage hash mismatch for ${n.assetId}` }) : To(t, ["assets", o, "lineage", "inputs", s, "assetId"], n.assetId);
    });
  }), e.portraits.forEach((a, o) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["portraits", o, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id), a.fallbackAssetId && !e.assets.some((n) => n.id === a.fallbackAssetId) && To(t, ["portraits", o, "fallbackAssetId"], a.fallbackAssetId);
  }), e.mediaJobs.forEach((a, o) => {
    i.has(a.assetId) || To(t, ["mediaJobs", o, "assetId"], a.assetId), a.inputAssetIds.forEach((n, s) => {
      i.has(n) || To(t, ["mediaJobs", o, "inputAssetIds", s], n);
    });
  });
});
function F6(e) {
  return gf.parse(e);
}
const M6 = "2.0.0-rc.1", z6 = ".";
function L6(e, t) {
  if (t)
    return e.assets.find((i) => i.id === t);
}
function Tr(e, t, i = z6) {
  const a = L6(e, t);
  if (!a) return;
  const o = [e.basePath, ...a.path.split("/")].map((n) => encodeURIComponent(n)).join("/");
  return `${i.replace(/\/$/u, "")}/${o}`;
}
const q6 = 2, Z6 = "albina-galgame-card", H6 = "assets", B6 = /* @__PURE__ */ JSON.parse('[{"id":"bg.backstreets_rain","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"bg.city_rooftop","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"bg.golden_bough","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"bg.lce_lab","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"bg.limbus_bus","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"bg.mirror_corridor","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"bg.nest_station","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"bg.outskirts_dawn","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"bg.rain_room","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"bg.ring_atelier","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"bg.spider_gallery","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"bg.white_canvas","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"cg.araya_rooftop","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"cg.art_resonance","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"cg.backstreet_pursuit","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"cg.combat_transition_01","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"cg.conspiracy_contract","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"cg.fascia_heartbeat","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"cg.golden_bough_ending","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"cg.golden_bough_rebuild","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"cg.hollow_torso_reveal","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"cg.lce_raid","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"cg.limbus_bus_night","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"cg.maestro_shadow","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"cg.opening_rain","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"cg.rain_confession","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"cg.rebuild_awakening","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"cg.ren_interruption","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"cg.ring_conspiracy_ending","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"cg.ring_invitation","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"cg.surgery_of_memory","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"cg.trust_threshold","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"cg.white_canvas_choice","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"cg.white_canvas_ending","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.audio.bgm.backstreets.rain.mp3","kind":"audio","path":"audio/bgm/backstreets_rain.mp3","mimeType":"audio/mpeg","sha256":"97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414","bytes":4192274,"license":{"cueAlias":"backstreets_rain","title":"SCP-x6x (Hopes)","creator":"Kevin MacLeod","isrc":"USUAN2000012","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.between.two.worlds.mp3","kind":"audio","path":"audio/bgm/between_two_worlds.mp3","mimeType":"audio/mpeg","sha256":"25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184","bytes":2979130,"license":{"cueAlias":"between_two_worlds","title":"Mesmerizing Galaxy","creator":"Kevin MacLeod","isrc":"USUAN2300011","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.boss.kromer.mp3","kind":"audio","path":"audio/bgm/boss_kromer.mp3","mimeType":"audio/mpeg","sha256":"923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd","bytes":3679463,"license":{"cueAlias":"boss_kromer","title":"Burnt Spirit","creator":"Kevin MacLeod","isrc":"USUAN1700053","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.main.menu.mp3","kind":"audio","path":"audio/bgm/main_menu.mp3","mimeType":"audio/mpeg","sha256":"299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60","bytes":7685141,"license":{"cueAlias":"main_menu","title":"Magistar","creator":"Kevin MacLeod","isrc":"USUAN1900003","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.title.theme.mp3","kind":"audio","path":"audio/bgm/title_theme.mp3","mimeType":"audio/mpeg","sha256":"03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3","bytes":2540613,"license":{"cueAlias":"title_theme","title":"Achilles","creator":"Kevin MacLeod","isrc":"USUAN1100463","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.credits.json","kind":"json","path":"audio/CREDITS.json","mimeType":"application/json","sha256":"6240eedcfc62fe286eaa2d3a99496efbe6aaf0fb6a6a1254f48ca144ac7c1ba9","bytes":4215},{"id":"file.audio.se.blood.splat.wav","kind":"audio","path":"audio/se/blood_splat.wav","mimeType":"audio/wav","sha256":"87c30bfd8c336786de618759015f3ee24eee2638d406d7541c7c3fc17201bc17","bytes":17684},{"id":"file.audio.se.glass.shatter.wav","kind":"audio","path":"audio/se/glass_shatter.wav","mimeType":"audio/wav","sha256":"7f066a84a711bcdcf48abc70b07e92ee21957e25cd06765d3637226c55bddda2","bytes":15920},{"id":"file.audio.se.slash.heavy.wav","kind":"audio","path":"audio/se/slash_heavy.wav","mimeType":"audio/wav","sha256":"c93d1adea430352fd38fd9ef315c54801f9fde63350a2fa62584ad20441c7f57","bytes":15920},{"id":"file.audio.se.typing.blip.wav","kind":"audio","path":"audio/se/typing_blip.wav","mimeType":"audio/wav","sha256":"0002e7621f5dd6510cc047dbcfaee2cc7ab958dc20b1d149809958a6f14b1668","bytes":4012},{"id":"file.audio.se.ui.back.wav","kind":"audio","path":"audio/se/ui_back.wav","mimeType":"audio/wav","sha256":"c80e3b1f405a1a2c3d35c5f7b0d94839aba09bce28136b76b94b17a72eaf7f65","bytes":10628},{"id":"file.audio.se.ui.click.wav","kind":"audio","path":"audio/se/ui_click.wav","mimeType":"audio/wav","sha256":"fb67965be3a2b903b7f06c19646df9943f5607bea683798718fe2e77a188e270","bytes":2248},{"id":"file.audio.se.ui.confirm.wav","kind":"audio","path":"audio/se/ui_confirm.wav","mimeType":"audio/wav","sha256":"7fc178ebe16e5de7b62514cca74b1fdcf800dc85156c2d450079279a2446904b","bytes":17684},{"id":"file.audio.voice.result.canon.recap.continue.9.18.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_18.mp3","mimeType":"audio/mpeg","sha256":"5e02d8a955ef36c182bd2293307fec531e24e153d58994cb34a2b68a8b34ae73","bytes":97907},{"id":"file.audio.voice.result.canon.recap.continue.9.37.battle.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"86a766b774def49b6ded10b24608646f954866fdefa589f72d99f7fe3d29d102","bytes":76595},{"id":"file.audio.voice.result.canon.recap.continue.9.37.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37.mp3","mimeType":"audio/mpeg","sha256":"ef041d6a2aaf372b440caad96e3f34bb2191ec52acef42d2e42186de67303304","bytes":102515},{"id":"file.audio.voice.result.canon.recap.continue.9.43.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_43.mp3","mimeType":"audio/mpeg","sha256":"a20ac9b480763a7e9ec332d7954e226947884f56bae8d39cd3409f77e66b234f","bytes":168179},{"id":"file.audio.voice.result.canon.recap.continue.albina.fascia.mp3","kind":"audio","path":"audio/voice/result/canon_recap_continue_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"a329c02dcac7c7c700b02e8cd20ae50b7e9f5cf992542b9396c3773c169240c3","bytes":73715},{"id":"file.audio.voice.result.canon.recap.enter.au.mp3","kind":"audio","path":"audio/voice/result/canon_recap_enter_AU.mp3","mimeType":"audio/mpeg","sha256":"e5456be94fcf623863ffcd78173c6f9841ade86d30ce54aeec82966aabdae179","bytes":135347},{"id":"file.audio.voice.result.conspiracy.005.let.her.answer.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"c3eeb96169e86d6d32bd24fcc1716f1b4b6169c24241a4a3785ad6e35bd0499b","bytes":321395},{"id":"file.audio.voice.result.conspiracy.005.refuse.duo.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"2188bc6032b768b6711d3163bdb45adbe7deec31d451ce74cf2b6af85785d93c","bytes":334643},{"id":"file.audio.voice.result.conspiracy.006.block.view.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"a3b7b7a240d59c2516983757140ded9382f6f71e6c5f74b94af8d4ce8110502e","bytes":429107},{"id":"file.audio.voice.result.conspiracy.006.stand.with.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"d162f239d7d33996b43d4c9d2d517bff741e93b46293fcc55a00bfb778166ff9","bytes":444659},{"id":"file.audio.voice.result.conspiracy.007.break.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"1f3a9e8bd205a0e3fb7c9e3cac83e2f286036b393413ccf5fa9d9797e3e17b6e","bytes":346739},{"id":"file.audio.voice.result.conspiracy.007.seize.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"cdacc6deea4032e1a6b3889c6e989a772db86ca71a4343e45235bbd132cbbaf2","bytes":402035},{"id":"file.audio.voice.result.conspiracy.008.hand.pen.to.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"20aa52feaa8fdba93ea122e4264a5eb06266a253371186bcb28cd255427c0cdb","bytes":358835},{"id":"file.audio.voice.result.conspiracy.008.refuse.testimony.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"5e39100ad58ff26de7201dc277ecc8a8f050f8fe377f891cada6bc4eca38dcb4","bytes":339827},{"id":"file.audio.voice.result.conspiracy.009.choose.present.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"47fd587851224f61df1079bb5334dcccee2e87291913900762adea0939e83adb","bytes":426227},{"id":"file.audio.voice.result.conspiracy.009.refuse.choice.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"579736096170a0afb00017791b093021e59651844116fa3b46fcd527896ade75","bytes":453299},{"id":"file.audio.voice.result.conspiracy.010.keep.badge.unworn.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"451f67bf64c927ab02b685fd2eb24983cca5fa46d14a55371b211bc29b97d0fc","bytes":392243},{"id":"file.audio.voice.result.conspiracy.010.throw.badge.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"317363feb895846841f2512ebd4680be547ea512c07b7290ecc09f53bf2284d5","bytes":387635},{"id":"file.audio.voice.result.conspiracy.011.burn.film.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"a6264c49431dbde54ff1eaa4d8d3a7011fc931b07ff3d1fd020388c8ba4cb79c","bytes":361715},{"id":"file.audio.voice.result.conspiracy.011.rewrite.ending.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"af9b903ff26fae14e50a4640b1fe6d591b5003cb8a340756d3061aeea4e0ced0","bytes":355379},{"id":"file.audio.voice.result.conspiracy.012.end.tonight.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"baef1eca98936b80447bce403bebcc1cdc8793ee1204f36275c34f358c06fb6a","bytes":411251},{"id":"file.audio.voice.result.conspiracy.012.keep.blade.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"f7132cd47552bc59b54ad3c7b73d1640f3fb2f215e9f315ab3b4251afd77a7ff","bytes":404339},{"id":"file.audio.voice.result.conspiracy.013.hold.one.second.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"e6647cb10fc82ee28ff451331a5ba9a1dba9b63459c65c962e1cef19c1bc11d0","bytes":373811},{"id":"file.audio.voice.result.conspiracy.013.return.gently.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"0e850f0e57d302c364b6bfe21980b42dee124a283e4a66ef12bd1339b0f2682f","bytes":398003},{"id":"file.audio.voice.result.conspiracy.014.erase.from.catalog.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"0d32f303e7302bca81e8f9a74e3aec0cf46b23bf71427f7f0211deeb029afe37","bytes":420467},{"id":"file.audio.voice.result.conspiracy.014.keep.one.line.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"6c8bb01ee8faf99dca4cb097731a5c741735c223510416f7d98135c323d23f6f","bytes":429683},{"id":"file.audio.voice.result.conspiracy.accept.mp3","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"fca5933a9b7940e9e70ab2bc2d5f3bb2d5c1831e231e002d5e81d2d70187c8b9","bytes":358835},{"id":"file.audio.voice.result.conspiracy.break.pursuit.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"80b95c0329a2ffd9463183d39c56d1a3c0c1be97857807307076441da7d1355d","bytes":354227},{"id":"file.audio.voice.result.conspiracy.escape.to.backstreets.mp3","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"529885d362546fee041fb9daee874070b414eacfbaa0f0b0e202eec1f8848847","bytes":391667},{"id":"file.audio.voice.result.conspiracy.feed.false.signature.mp3","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"c8891dea18a2427f9c866fc45da8a392922ed1a4a29fb6adf9820661e38875f8","bytes":357107},{"id":"file.audio.voice.result.conspiracy.pressure.mp3","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"3af0fae827f9ab4202ed89aafca164c7bbd4f9cc3a3adea4a6c5df0fd15f9411","bytes":310451},{"id":"file.audio.voice.result.enter.conspiracy.mp3","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"24ced6cd96816578da6dfa13fcf83514876c5562cdb6f8e09b1c32b4bcb11c7b","bytes":204467},{"id":"file.audio.voice.result.enter.rebuild.mp3","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"bd654ac516dd06f38f235bdf52260e578ce0a7655ed1111525deaa6e58e44a82","bytes":207923},{"id":"file.audio.voice.result.enter.white.canvas.mp3","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"e8ab325da6c8a12608d75df2bda071b88bb6ff7acf5e1572d9071ea6d8038b8c","bytes":145715},{"id":"file.audio.voice.result.golden.bough.rebuild.bad.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"99044fbcd083fd583946b6883e5b9098fc9c681c04319fb140fdde443f8ed226","bytes":166451},{"id":"file.audio.voice.result.golden.bough.rebuild.normal.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"555ba1fc500a42fc45cddbb0faa5230b5368741bc1d5e78412c002eb1ba786d9","bytes":165299},{"id":"file.audio.voice.result.golden.bough.rebuild.true.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"2cefdaae2ccccd65e997733ccc076bab546212ccd50a7ceaab6b6e07f2bf4b24","bytes":154931},{"id":"file.audio.voice.result.golden.bough.route.complete.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"1833aef2d3549425edf9702212a3dc74c91a2cbda14cb736da529cece809b327","bytes":491315},{"id":"file.audio.voice.result.golden.bough.route.final.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ee88fbcd046d6a69a5fde950904bb78bb78ac8590de0464d4bd9759e19ae5fa6","bytes":208499},{"id":"file.audio.voice.result.rebuild.006.keep.silent.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"212f4fb4d012df83e4ed3b002061b0ac8a6eba70df48e94c1cd3d4c583045174","bytes":396851},{"id":"file.audio.voice.result.rebuild.006.read.aloud.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"94cbc15ffad0d60de661ad72f8f46068442a75679d48014e17805f34c0c7b975","bytes":398003},{"id":"file.audio.voice.result.rebuild.007.match.her.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"596b9c870c33cf5251c74a86de0b633a13fd58220e38d4e68f4e190e74fab424","bytes":438323},{"id":"file.audio.voice.result.rebuild.007.stay.own.rhythm.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"87aec6c173a73614256d9ff98e2598dbec41e0e0d850b9fbcc59efa75f35b4b4","bytes":450995},{"id":"file.audio.voice.result.rebuild.008.protect.current.self.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"304ca21879c6515cfe594282032b1811fb0957dc5803f21b63c001770df3fd5d","bytes":405491},{"id":"file.audio.voice.result.rebuild.008.trade.old.memory.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"9ddad23ff662681ba22e7e3c0a569ce229853bdf73c03cd752b4c697bd79ac21","bytes":401459},{"id":"file.audio.voice.result.rebuild.009.hand.question.back.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"9cbf99b9553ac93f17ffa5b3179f47bb3667ee0729cef49e411c1d3db2a1cd13","bytes":400307},{"id":"file.audio.voice.result.rebuild.009.refuse.perfect.copy.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"f73bf969c5b85ea064c9c6c43ee7780f6f83c579eae92674a94f5dde32232348","bytes":393971},{"id":"file.audio.voice.result.rebuild.010.ask.her.choice.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"c74066ee553419d3bf9ee597a4f851bd2fb5938b5a555af427292eecadf454f1","bytes":335795},{"id":"file.audio.voice.result.rebuild.010.veto.sealing.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"1832293d354bb2b22f61a4a66504f3114df3752012423cf14866e59929c6dc9b","bytes":343283},{"id":"file.audio.voice.result.rebuild.011.ask.next.revision.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"07d1e7d28a4ef027c305d085a2bb06525a63e8f66d563abbcc96faaaf06606c3","bytes":433715},{"id":"file.audio.voice.result.rebuild.011.sit.beside.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"7dc8a32f43d98ae9902fe48573d34552259baff4c692ffb65d2deea5df6dfb98","bytes":430259},{"id":"file.audio.voice.result.rebuild.012.break.contract.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"1c8c41c15241d865afd824a846acc0cf0ab205f26696e0e7c85be5299607b345","bytes":372083},{"id":"file.audio.voice.result.rebuild.012.negotiate.terms.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"12dd9f48b173bbf8fb3e92086a05bc9e9cb28099547345f88931e680e804b033","bytes":398579},{"id":"file.audio.voice.result.rebuild.013.offer.witness.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"e86589de87474e4a6f8d57062df9f43650fc3a154618f5778d52c5e9ffcf4dc4","bytes":374963},{"id":"file.audio.voice.result.rebuild.013.promise.name.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"1cfe997ea1a9204419bba1848681231d5351da60b5259246858533ba814d93ff","bytes":376115},{"id":"file.audio.voice.result.rebuild.014.ask.when.to.light.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"b81315d3ae6125ade7203449a21784899d0ccf28126b576feaf319dc80de2f69","bytes":423923},{"id":"file.audio.voice.result.rebuild.014.keep.unlit.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"fb826259dff130419016dbbe3720b59b7326c454fcbf7479dd9b8fc6a93fa2aa","bytes":433715},{"id":"file.audio.voice.result.rebuild.accept.missing.pieces.mp3","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"025ab49988979a6e3e8f9cb317f22442a0713b06c30db883126a0a3162e650a9","bytes":361715},{"id":"file.audio.voice.result.rebuild.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"65d32bf4c0b1141ea6ae80963cdf550162b5896279d98ac6e2cccd40bfaa63e1","bytes":236723},{"id":"file.audio.voice.result.rebuild.cut.false.completion.mp3","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"0b7ebcceeaa3fcd9939421b7aee1b5fb6d7c9d14a4ca98dd7435ef1f29205120","bytes":367475},{"id":"file.audio.voice.result.rebuild.guard.fascia.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"f11f541a1544a54ba6d13f6adb0d93344ab451bd099d2005a5ac8c3a8cfe6369","bytes":389363},{"id":"file.audio.voice.result.rebuild.push.into.raid.mp3","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"68acf768a66dd60d6ad996e4a06a57ef2755b9787f90f32d4f572b6d8c2426e0","bytes":406643},{"id":"file.audio.voice.result.rebuild.question.fascia.mp3","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"d49e2703fac28f03e412f0001ad711a642ae86bd88b37ca116d4c392f03099bb","bytes":228083},{"id":"file.audio.voice.result.rebuild.use.rooftop.signal.mp3","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"ab251367e6459f692c3477dcd584be69f0f3c43ea3912d22748e065d36987151","bytes":352499},{"id":"file.audio.voice.result.return.opening.from.rebuild.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"4fb14344c5e70dfd1bc4f6b3ef069c4ad64cf34f491992513f836ee3cc93ce90","bytes":289715},{"id":"file.audio.voice.result.return.opening.from.ring.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"9157a6a67aeac5fab63aab484d8a5fb2fe3a3352e3f50dc20b77351d1248eccb","bytes":278771},{"id":"file.audio.voice.result.return.opening.from.white.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"a0e41b784a562c97daa29e6174c6d10a22ff9161e15af5fb15b80ba1992b76eb","bytes":301811},{"id":"file.audio.voice.result.ring.conspiracy.bad.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"f613f8e6d2453ec2827bb0acd07911ea84e7ef59edca47f378b7d76c0ce2c240","bytes":151475},{"id":"file.audio.voice.result.ring.conspiracy.normal.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"33bfedb7ada3a4bb3134f0eea06241ff6ac26a45c289d0a7261ee66b7ab9bca6","bytes":187763},{"id":"file.audio.voice.result.ring.conspiracy.route.complete.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e13a967ca990933a69a93dcd78c122a5119f1c4d7d8f7e8c50ec15bae74d3b00","bytes":419891},{"id":"file.audio.voice.result.ring.conspiracy.route.final.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"472ea9d9842371171504444bf5341c93c318c1998d2e81ea34833e020a8ee208","bytes":232115},{"id":"file.audio.voice.result.ring.conspiracy.true.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"fec30778f7f3ce3c3d76b6bf7028e7aa6ff5529e421e33a4494f67acb10205ea","bytes":167027},{"id":"file.audio.voice.result.white.006.name.silence.mp3","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"052bdd2c9ad58dc357d4a8e2efa1c775e719bfa0df5cc6a5b7ac5b5f2af548f9","bytes":418739},{"id":"file.audio.voice.result.white.006.refuse.naming.mp3","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"ddd59afe994de4a252c61a3803bbd0c63997304b9e6df37447b59e9b965017ca","bytes":425075},{"id":"file.audio.voice.result.white.007.ask.fascia.term.mp3","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"6bf8213e512ae808e04046fa39600bed3a1b59e7ce91dcbb902bb0b1fb666992","bytes":426803},{"id":"file.audio.voice.result.white.007.keep.mirror.open.mp3","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"33a99a192d13ca70613e200a261e7b33659be9ae2b5d4efe34efa334d75d3e05","bytes":398579},{"id":"file.audio.voice.result.white.008.hold.fascia.mp3","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"41c2e3016510dd00c492632d8189788d79fc6e54b3383550412f1e057f071bfb","bytes":332339},{"id":"file.audio.voice.result.white.008.stay.witness.only.mp3","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"c6c37b0dae21ed498ef7c5c7671ed8429861fd5027ed8de840f27fa65c1d49b2","bytes":354803},{"id":"file.audio.voice.result.white.009.keep.half.step.mp3","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"eb273061a887f8ea4796b2804cde9e109aed783bc88853b2592e3f4ced0e241e","bytes":374387},{"id":"file.audio.voice.result.white.009.share.umbrella.edge.mp3","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"a4f1748e8858f3adf850f0b3c2c6b38e65fe9b23edd557966889b071f0b09c9b","bytes":323123},{"id":"file.audio.voice.result.white.010.acknowledge.leave.mp3","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"6eb65fdccaf7e057ad12905510492926701ea449996d3c5697d56729dd8e1705","bytes":358835},{"id":"file.audio.voice.result.white.010.offer.return.ticket.mp3","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"45594596a7c3fc007652bef42743925bb65a7615f873cad61d3429386b6eff4e","bytes":361139},{"id":"file.audio.voice.result.white.011.curtain.call.mp3","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"42179eea6ade8f967fd3ed425a108fe78172750b55804d3fdf6ed6a57ab1d5df","bytes":384179},{"id":"file.audio.voice.result.white.011.walk.beside.mp3","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"5364cd974fd319a09968ea5dd8d47bacb304bc918dc1a8180d9b905bfec6d4e3","bytes":391667},{"id":"file.audio.voice.result.white.012.let.her.decide.mp3","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"8d92faf82d8e23de74356dea4233451838b0cf1ee0a41ab884f8407fc2ecb97d","bytes":364019},{"id":"file.audio.voice.result.white.012.refuse.exhibit.mp3","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"f13e7e5ddde629cffe4e022558da710927c6a9ea98b21b938cfa47c06fda6b65","bytes":346163},{"id":"file.audio.voice.result.white.013.point.to.mirror.mp3","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"adf910758dc7147da909d2c11f12d49cb04fe05dc10095c915dabb83e4d5e490","bytes":417011},{"id":"file.audio.voice.result.white.013.refuse.to.choose.mp3","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"b3aa0c454052fd8f5dd1981af5510d3acd0aa9b23d1d3c82e0407b59b4fada8f","bytes":419891},{"id":"file.audio.voice.result.white.014.keep.base.color.mp3","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"e5abbde8433953db9427ab67392fc60bb77aabd16ed2f507d6c40d323701476f","bytes":403763},{"id":"file.audio.voice.result.white.014.offer.restart.mp3","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7b0a0fca1de3ae894ac6455f61354b0004fc7a4ae669990f3eb17c26c6cd6a5c","bytes":438899},{"id":"file.audio.voice.result.white.canvas.bad.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"c689384a6b62ca60bd84391fcecb3abf36158a295d70a0213079969f28f70def","bytes":164147},{"id":"file.audio.voice.result.white.canvas.normal.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"0ea2a3bb0d492de34026165ff824b572dde9aa0561ecb32ac1df0c3d037fa217","bytes":151475},{"id":"file.audio.voice.result.white.canvas.route.complete.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"94f66d44430484558772b9203ee1050accb21fa9f21110a8b3664cc8e0237896","bytes":430259},{"id":"file.audio.voice.result.white.canvas.route.final.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"8e5228040c26e7c73ad64f14c4193f27b6aa73dd95460494258f47ccfbb83aba","bytes":230387},{"id":"file.audio.voice.result.white.canvas.true.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"82c737637b2243b9be6ffb7dc45883f143773bae425420ec730e03c8510f32c4","bytes":150323},{"id":"file.audio.voice.result.white.follow.to.lab.mp3","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"40e6d43999da61bda9da83fd878956a088de4cb25b6cc0d99be4b8214810351f","bytes":401459},{"id":"file.audio.voice.result.white.interrupt.lab.terms.mp3","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"dc0db8f0f34333e77b1186156c828aa59e1d510caa95aa0e97610a5065add968","bytes":364595},{"id":"file.audio.voice.result.white.keep.empty.seat.mp3","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8a76f675d5ea394277777e38529d1862f21dd62a5b2685da635ed0527df7e052","bytes":395699},{"id":"file.audio.voice.result.white.share.rain.window.mp3","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"20335d2fc8cfaef91400201f56bd1be36b2d9ea44402037c73bf06dd31af4b3a","bytes":378419},{"id":"file.audio.voice.result.white.sign.witness.protocol.mp3","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"e7636aa5a1ef0e083f6b8d3ef998b1c370cf1c529a2f37d0e89594b37f956400","bytes":345011},{"id":"file.audio.voice.result.white.tease.back.mp3","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"1f65a84e40a1502a6fe8e2ee76133eaacd13e6673a4abd42b573750db8e155db","bytes":309875},{"id":"file.audio.voice.result.white.touch.boundary.mp3","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"367db6cdbaa418ed281c5d5e32d56c6fb59c82f8ac911913ecd1be2b6f7938ad","bytes":321971},{"id":"file.audio.voice.scene.canon.recap.9.14.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_14.mp3","mimeType":"audio/mpeg","sha256":"177b6bb8d06c753e852f15f15053ee009e752c2d6b6e60cf5b9529808378539e","bytes":563315},{"id":"file.audio.voice.scene.canon.recap.9.18.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_18.mp3","mimeType":"audio/mpeg","sha256":"92d1bdda2e7c3a93bf3b4e2a68a424bf85d10949df29e99f57f026710c83a10c","bytes":839219},{"id":"file.audio.voice.scene.canon.recap.9.37.battle.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"d136a8873f583ce3c5df44c57934c316402ebf899020e61c2ef21abf24ca18d3","bytes":675635},{"id":"file.audio.voice.scene.canon.recap.9.37.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_37.mp3","mimeType":"audio/mpeg","sha256":"63e76cd6291fbaa5d6f2dfe363b704e98c63ab0ade8eabb1bb96ff1ace9e39b0","bytes":916979},{"id":"file.audio.voice.scene.canon.recap.9.43.outcome.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_9_43_outcome.mp3","mimeType":"audio/mpeg","sha256":"29214a431ceda8a8917df7b47af4d31df69bb22b709c0d1ac6887579440310ab","bytes":1276403},{"id":"file.audio.voice.scene.canon.recap.albina.fascia.mp3","kind":"audio","path":"audio/voice/scene/canon_recap_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"9f445dfa83c196e54ab760d5d10b1ca08a23199e1d7a3c117bfbe04d9c187fca","bytes":2609267},{"id":"file.audio.voice.scene.golden.bough.001.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"17b56b325e5051b43a27459152b094c53d12ac2edf65c03c0ec65533cb20a29c","bytes":203315},{"id":"file.audio.voice.scene.golden.bough.002.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"d6365c5d4894da5e57e88319d8c2fe264f25c4199b41031c8ed72ba40e09ee19","bytes":154355},{"id":"file.audio.voice.scene.golden.bough.003.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"1ad02d7568d0ae545c157a13989da73a7f7006aea805d0617a3d99ee3421ccfc","bytes":290867},{"id":"file.audio.voice.scene.golden.bough.004.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"a59f7ec4c382fbe7e9f54e6eca0c1c4a1d0c5fc3d8fb6b431831c69a8da8fc78","bytes":290867},{"id":"file.audio.voice.scene.golden.bough.005.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"507228ac0a027d9c8f3534301d01fff6b9cedcf322a4daca6ec6803288517688","bytes":255155},{"id":"file.audio.voice.scene.golden.bough.006.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"ba279ed3531dc0ed703444d8ef096802428ca7ab29fcbf4f3873588ceb4d786d","bytes":311027},{"id":"file.audio.voice.scene.golden.bough.007.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"e493295b8fc9a9777274dc6ea8bdf29f6fa36ffe186a9e8b705bc4f95e9dcf6a","bytes":326579},{"id":"file.audio.voice.scene.golden.bough.008.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"41eb3a1a3f955bdf78b8107b5f3aeb6e06a1c1446c0300f4de0f712a3b1a310e","bytes":308723},{"id":"file.audio.voice.scene.golden.bough.009.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"54d231c0a6980338b1b28ea6ce15ca5a284f11bb0631106e1e3cb393c8154f89","bytes":315059},{"id":"file.audio.voice.scene.golden.bough.010.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"5ea795c0fd6273b40f187838c3ab9129a255d1dca1f7e65f155ee7c2b56c2972","bytes":305843},{"id":"file.audio.voice.scene.golden.bough.011.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"99ca50db65946593f20b548272f662389b678e88a6241d83d4d068de15595509","bytes":249395},{"id":"file.audio.voice.scene.golden.bough.012.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"152da1cd4f137ebca0900f228e2ed76cf392114063f02c3e63d6193ac093abc4","bytes":308147},{"id":"file.audio.voice.scene.golden.bough.013.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"47e62c9d7dfb826b8fd9caf7a722a5bd0b4e1790632a24dd3f7a5acb5ec138b4","bytes":306419},{"id":"file.audio.voice.scene.golden.bough.014.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"aaeffda74a330c6f70513fad58a0bfb8ebd8aa5793806ac74075e9aa4f4224d7","bytes":256883},{"id":"file.audio.voice.scene.golden.bough.015.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"796624549e2d513c2f139e412cbb989e3d9fa9221c6d6cb9c5d0d18cb9e14b69","bytes":298355},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"cd354aeaef8a6692d7f672d11d0ee3cf0c6bedfb9bd350a5f889ea2160902518","bytes":301811},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7d0130d4db06b824850c69ce95c00de02af01fccaca56854c850e0284c9f29ae","bytes":207923},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"bd6aa132a1ac2f6c5fe62a3f328e5950cdb2b8ea54a3a92399bd7afed1f3e4fd","bytes":287987},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.true.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"43cbec46f0fd8d9debb60a95f16e0e3663775a057c40df9af5dfef8e921c42f5","bytes":328307},{"id":"file.audio.voice.scene.opening.001.mp3","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"0ab7a4a0b1a11486d6feaeac10e40b2b9aec2675f19dcce2ddb501c679238074","bytes":425651},{"id":"file.audio.voice.scene.ring.conspiracy.001.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"f4535e60e9ebfe3a9f50940530ec05a38ca9e7dd665e2f7064ad0d52811753c2","bytes":186611},{"id":"file.audio.voice.scene.ring.conspiracy.002.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"61c43123ae22fe7a5f07bd0d7b10070f527a4d8d9413b2c6e15b27c6566242f8","bytes":235571},{"id":"file.audio.voice.scene.ring.conspiracy.003.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"51c502de79a93bb2b1a26a98501944d677fb2c15a5a49e15a29bdd31e414a498","bytes":247667},{"id":"file.audio.voice.scene.ring.conspiracy.004.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"41d01bc36452401d3300d76fe34a239e8c75f8711c9a5a5448865c2ecb49897c","bytes":291443},{"id":"file.audio.voice.scene.ring.conspiracy.005.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"3e3011f9fdefa13e482f113f80ed4b977e27ad28d279150b8ab7044801ddfc01","bytes":280499},{"id":"file.audio.voice.scene.ring.conspiracy.006.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"39c5261f5ef3d79e728f8364259d03f4d6de58242dc63be4797fe92077cb74e6","bytes":256883},{"id":"file.audio.voice.scene.ring.conspiracy.007.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"bf7b82d130b47ba9f0efdf5a0590b87d41601bcf2d90f01c20debb7d931cfc8f","bytes":270131},{"id":"file.audio.voice.scene.ring.conspiracy.008.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"2709be5f3a41429a9bee00e2a8631e14884cf249fee14c9944001fc865dfeb4c","bytes":306419},{"id":"file.audio.voice.scene.ring.conspiracy.009.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"30ab38b0d89d5d55b3ee833f4446be0b572508195146ba4529670e9293e4bc60","bytes":239603},{"id":"file.audio.voice.scene.ring.conspiracy.010.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"7902ea7116a00c992000ba090b0b886fadfbef3b628c57141a43e473a6478edf","bytes":287987},{"id":"file.audio.voice.scene.ring.conspiracy.011.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"3ff28c1d82f871ea748100c320625f9f9d6ab0e53d8929b3e3dd0f09cec392c5","bytes":291443},{"id":"file.audio.voice.scene.ring.conspiracy.012.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"43419544d4b85735fc4c6f3e8d3239307c4b19b4ebeade5d1120ef815715d6f6","bytes":273587},{"id":"file.audio.voice.scene.ring.conspiracy.013.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"3065ed0dc9815078d8a5148a84ed2e29b7fb6cd9f7300cebe791ed20c59e0a53","bytes":306995},{"id":"file.audio.voice.scene.ring.conspiracy.014.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"dd44754be2c8d7146bc1593bb86525176f25e94c47f696498500a106ec5a58cd","bytes":254003},{"id":"file.audio.voice.scene.ring.conspiracy.015.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"97b9eaf4e55aa2b333cc755914da99c5aa967ba3696b762800ea3249a138d8db","bytes":366899},{"id":"file.audio.voice.scene.ring.conspiracy.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"9e16b3ccefac5a327e73e53fbd9dc45c88d12cb71b0b1129b696de7c1e957c05","bytes":319091},{"id":"file.audio.voice.scene.ring.conspiracy.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"b8b574bf431cc9bdbadfe73fc3a0622a16f7d27433c7d3d38cb1fdc0655b6682","bytes":216563},{"id":"file.audio.voice.scene.ring.conspiracy.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"9ddbee2b9dd93b149de53a5806a4fd9900a3bce05fd204c7f9a53c8140c295af","bytes":270707},{"id":"file.audio.voice.scene.ring.conspiracy.ending.true.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"55e5b7c7eb8118623d1b36aaa5e85d9b6ab4286c3e205c6e8d262be481691c37","bytes":347891},{"id":"file.audio.voice.scene.white.canvas.001.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"61917fda12f4f29461e9db4603781dfe6af6351b9c58e8ac89fd6e11176a3d91","bytes":149171},{"id":"file.audio.voice.scene.white.canvas.002.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"3fa78fe28acb401aa624e5dc0a149c430be3543587c707a460cc19238519b227","bytes":207923},{"id":"file.audio.voice.scene.white.canvas.003.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"30c100d35a1e686cb6108e478d3c4eebc698b2bcf7fb964fde186a6e96f4564a","bytes":236147},{"id":"file.audio.voice.scene.white.canvas.004.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"829183a0e33a583a8af9072cf4914baa183d24cdb28d9fc9685c2ef02f8d9458","bytes":273011},{"id":"file.audio.voice.scene.white.canvas.005.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"aac01f6f0bfb4130603e8ab330d08aa661878e5acaf94e9c1230a356456f16c4","bytes":264947},{"id":"file.audio.voice.scene.white.canvas.006.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"136978b119f80ca4655d4524f31808012d3c01076a055f2edf3a1a5a9c38f0eb","bytes":289715},{"id":"file.audio.voice.scene.white.canvas.007.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"3b2ae779f6a0764aa8055571ce7a8fe0418c76cc9a2a7da395925ac3c90e2e91","bytes":293747},{"id":"file.audio.voice.scene.white.canvas.008.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"4846c374ffcf1f93861daf210c752df86f4c00e1e3836d860d69522a116588ed","bytes":322547},{"id":"file.audio.voice.scene.white.canvas.009.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"fc92b8497ec1f4133deafffd4f0204dde06654db1aea65ee0f1573f20bbf8354","bytes":258035},{"id":"file.audio.voice.scene.white.canvas.010.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"82ce426cffeabb5431b3d08764ce3e7e42686b3f71f2e46736ecaa2a931d9135","bytes":216563},{"id":"file.audio.voice.scene.white.canvas.011.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"c70978714c71795b05c1eff9adc92713e956103e2d2a8ac8e8576f65b2b7a01a","bytes":287411},{"id":"file.audio.voice.scene.white.canvas.012.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"e6ccc5d30d1785af804799386b190334e375a77051545f1e49d211b5a2ce982c","bytes":254579},{"id":"file.audio.voice.scene.white.canvas.013.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"01d2f23ebdf72832e6a5b7480d5e4202e92f8b6a7445e614f6a00b324d5500c7","bytes":283379},{"id":"file.audio.voice.scene.white.canvas.014.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"1d2f602a2128a3d29d0953c583a78b495f75e55478cabfb5606e0a719c0db871","bytes":275891},{"id":"file.audio.voice.scene.white.canvas.015.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"5e4dff6e9f9d0f0373ceba2400c2044a6dacdc3dfd1b0a465cc4ce5dd8010619","bytes":306419},{"id":"file.audio.voice.scene.white.canvas.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"4a724974ac526d8bb95a3b999fc0a4d04dd8fe645433f89b677d8df29c3c5bd4","bytes":294899},{"id":"file.audio.voice.scene.white.canvas.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7b3659054aae442107a743730580dfee2084a7b9ef612e5de43300774412ed49","bytes":209075},{"id":"file.audio.voice.scene.white.canvas.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"7e098e1806cb221d667e4ade629f5b6696f19ac270afc3eef05b8847457ca140","bytes":260339},{"id":"file.audio.voice.scene.white.canvas.ending.true.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"8d2e7919504bf82ed1df05b648d9959d486caf9b9abffb9aaa9d883f517db401","bytes":288563},{"id":"file.bg.backstreets.rain.jpg","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"file.bg.city.rooftop.jpg","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"file.bg.golden.bough.jpg","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"file.bg.lce.lab.jpg","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"file.bg.limbus.bus.jpg","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"file.bg.mirror.corridor.jpg","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"file.bg.nest.station.jpg","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"file.bg.outskirts.dawn.jpg","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"file.bg.rain.room.jpg","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"file.bg.ring.atelier.jpg","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"file.bg.spider.gallery.jpg","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"file.bg.white.canvas.jpg","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"file.cg.araya.rooftop.jpg","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"file.cg.art.resonance.jpg","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"file.cg.backstreet.pursuit.jpg","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"file.cg.combat.transition.01.jpg","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"file.cg.conspiracy.contract.jpg","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"file.cg.fascia.heartbeat.jpg","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"file.cg.golden.bough.ending.jpg","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"file.cg.golden.bough.rebuild.jpg","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"file.cg.hollow.torso.reveal.jpg","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"file.cg.lce.raid.jpg","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"file.cg.limbus.bus.night.jpg","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"file.cg.maestro.shadow.jpg","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"file.cg.opening.rain.jpg","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"file.cg.rain.confession.jpg","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"file.cg.rebuild.awakening.jpg","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"file.cg.ren.interruption.jpg","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"file.cg.ring.conspiracy.ending.jpg","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"file.cg.ring.invitation.jpg","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"file.cg.surgery.of.memory.jpg","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"file.cg.trust.threshold.jpg","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"file.cg.white.canvas.choice.jpg","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"file.cg.white.canvas.ending.jpg","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.characters.albina.armored.png","kind":"image","path":"characters/albina/armored.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.combat.png","kind":"image","path":"characters/albina/combat.png","mimeType":"image/png","sha256":"d253d25b615b31dbdc14b9b85a6873732fbe7f5595624a6a1f67db8e1c373833","bytes":794440},{"id":"file.characters.albina.endgame.png","kind":"image","path":"characters/albina/endgame.png","mimeType":"image/png","sha256":"10ba1187d40b50910ff2183f83812dff890885b47d27d64d96fcd719b603e92a","bytes":886696},{"id":"file.characters.albina.fascia.open.png","kind":"image","path":"characters/albina/fascia-open.png","mimeType":"image/png","sha256":"794865a3149891f0562df93cf61e3671f6793283949a6cdeec60f299cf0a8c4a","bytes":226988},{"id":"file.characters.albina.furious.png","kind":"image","path":"characters/albina/furious.png","mimeType":"image/png","sha256":"6ad513b39c743c1c1d7230aa86f76d2cf1d5f2b0d5c0b9a75acacb9e03b2a7d3","bytes":430213},{"id":"file.characters.albina.golden.bough.png","kind":"image","path":"characters/albina/golden-bough.png","mimeType":"image/png","sha256":"7b96b2ec44022a3b8a86b2480e25bd01eb5ac32218e63382373e97c273baf831","bytes":731292},{"id":"file.characters.albina.maestro.png","kind":"image","path":"characters/albina/maestro.png","mimeType":"image/png","sha256":"b148b529b7fab01184fcfa54c8b80fa9a48fcc7723fc3498bd58e504015ea0ea","bytes":434686},{"id":"file.characters.albina.normal.png","kind":"image","path":"characters/albina/normal.png","mimeType":"image/png","sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","bytes":647858},{"id":"file.characters.albina.rain.png","kind":"image","path":"characters/albina/rain.png","mimeType":"image/png","sha256":"a2b3fd27325ace3c20e92c441900e338b027f7cdcdb603c12dc92924e0175f06","bytes":649497},{"id":"file.characters.albina.ring.conspiracy.png","kind":"image","path":"characters/albina/ring-conspiracy.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.shy.png","kind":"image","path":"characters/albina/shy.png","mimeType":"image/png","sha256":"928100cc984332c9b4f769cc38dba965425a91cc1aece23e9d384fc993509247","bytes":649383},{"id":"file.characters.albina.surgical.png","kind":"image","path":"characters/albina/surgical.png","mimeType":"image/png","sha256":"b01318b4e4677e4d6e4de6aad53149717364d36a0d66b56425100e31a6547897","bytes":360435},{"id":"file.characters.albina.white.canvas.png","kind":"image","path":"characters/albina/white-canvas.png","mimeType":"image/png","sha256":"cbf1f679143b6ed9ceee9a12ce5bab2ce571e09cbade31b9ae673d0e6479f3aa","bytes":360278},{"id":"file.characters.callisto.normal.png","kind":"image","path":"characters/callisto/normal.png","mimeType":"image/png","sha256":"7c9c806f2a9517c65648b085ec22d1b93d47effdab3d8be91d2f368c7e6039fd","bytes":377258},{"id":"file.characters.dante.normal.png","kind":"image","path":"characters/dante/normal.png","mimeType":"image/png","sha256":"1db98bd0ed89ce5d66c175a525907c6bee207fbe61a4bb118e41a141a2613603","bytes":788630},{"id":"file.characters.faust.normal.png","kind":"image","path":"characters/faust/normal.png","mimeType":"image/png","sha256":"9e5839384ac0d57d445d14301a38abdc357a28f33d8c345255c49b2f4fb9f5c7","bytes":919963},{"id":"file.characters.golden.apparition.normal.png","kind":"image","path":"characters/golden_apparition/normal.png","mimeType":"image/png","sha256":"fc90202b6b36e901fe0e75e9e2bcb9e07dc13ef32dc97083a01a4703c6ba9faf","bytes":633415},{"id":"file.characters.lce.doctor.normal.png","kind":"image","path":"characters/lce_doctor/normal.png","mimeType":"image/png","sha256":"938fdd640295fdd9c5d98e225696137f48667b140f2649961d6a504976b011f9","bytes":597985},{"id":"file.characters.protagonist.battle.png","kind":"image","path":"characters/protagonist/battle.png","mimeType":"image/png","sha256":"a436e968a646e580f9e6fca88ca9e82615f1a8a05cf68e1c494afe05a594d09f","bytes":656294},{"id":"file.characters.protagonist.resolve.png","kind":"image","path":"characters/protagonist/resolve.png","mimeType":"image/png","sha256":"f084da28bd5b55273519eab6c230bc580e069f7f302cff85d333f43f833684f3","bytes":765412},{"id":"file.characters.protagonist.serious.png","kind":"image","path":"characters/protagonist/serious.png","mimeType":"image/png","sha256":"d9fff4f95ed8513b464cd32be5735ec1a3d2b10e581c24a8232ab9a78f81a538","bytes":612296},{"id":"file.characters.protagonist.shadow.png","kind":"image","path":"characters/protagonist/shadow.png","mimeType":"image/png","sha256":"47579ad18953940ceaf00122676a79d3f8618a0057cc1f1f740535df4644a04e","bytes":679619},{"id":"file.characters.protagonist.tender.png","kind":"image","path":"characters/protagonist/tender.png","mimeType":"image/png","sha256":"1e99e5724db77e7fc536d433980519121cc43740bfc17b4f810444a2681fb214","bytes":693086},{"id":"file.characters.protagonist.wet.hair.png","kind":"image","path":"characters/protagonist/wet-hair.png","mimeType":"image/png","sha256":"ef02c60087130fba338bd9757c5ea9f045435e60d658450890c6ab5d50699dd5","bytes":702889},{"id":"file.characters.ren.normal.png","kind":"image","path":"characters/ren/normal.png","mimeType":"image/png","sha256":"0bd7caac7ae057da27bf86378d17b24ee43a48b958713ece4f8fbf6a79cba6b6","bytes":793467},{"id":"file.characters.ring.agent.normal.png","kind":"image","path":"characters/ring_agent/normal.png","mimeType":"image/png","sha256":"71536876e4949ff36037d647f05727bf39bb6bf843b186757aacfcc95bcfe07e","bytes":581593},{"id":"file.characters.vergilius.normal.png","kind":"image","path":"characters/vergilius/normal.png","mimeType":"image/png","sha256":"a952f7b8042794613c6fdfe7c6e58d7675d06c9c5653ac837247c94b3ab01135","bytes":886285},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"file.video.animated.desktop.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"file.video.animated.desktop.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"file.video.animated.desktop.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"file.video.animated.desktop.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"file.video.animated.desktop.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"file.video.animated.desktop.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"file.video.animated.desktop.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"file.video.animated.desktop.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"file.video.animated.desktop.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"file.video.animated.desktop.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"file.video.animated.desktop.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"file.video.animated.desktop.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"file.video.animated.desktop.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"file.video.animated.desktop.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"file.video.animated.desktop.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"file.video.animated.desktop.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"file.video.animated.runtime.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"file.video.animated.runtime.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"file.video.animated.runtime.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"file.video.animated.runtime.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"file.video.animated.runtime.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"file.video.animated.runtime.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"file.video.animated.runtime.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"file.video.animated.runtime.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"file.video.animated.runtime.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"file.video.animated.runtime.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"file.video.animated.runtime.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"file.video.animated.runtime.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"file.video.animated.runtime.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"file.video.animated.runtime.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"file.video.animated.runtime.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"file.video.animated.runtime.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"video.animated.desktop.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"video.animated.desktop.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"video.animated.desktop.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"video.animated.desktop.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"video.animated.desktop.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"video.animated.desktop.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"video.animated.desktop.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"video.animated.desktop.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"video.animated.desktop.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"video.animated.desktop.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"video.animated.desktop.ring_conspiracy_ending_true","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"video.animated.desktop.ring_conspiracy_scene_11","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"video.animated.desktop.ring_conspiracy_scene_15","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"video.animated.desktop.ring_conspiracy_scene_3","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"video.animated.desktop.ring_conspiracy_scene_5","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"video.animated.desktop.ring_conspiracy_scene_8","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"video.animated.desktop.white_canvas_ending_bad","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"video.animated.desktop.white_canvas_ending_normal","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"video.animated.desktop.white_canvas_ending_true","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"video.animated.desktop.white_canvas_scene_11","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"video.animated.desktop.white_canvas_scene_15","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"video.animated.desktop.white_canvas_scene_3","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"video.animated.desktop.white_canvas_scene_5","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"video.animated.desktop.white_canvas_scene_8","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"video.animated.runtime.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"video.animated.runtime.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"video.animated.runtime.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"video.animated.runtime.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"video.animated.runtime.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"video.animated.runtime.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"video.animated.runtime.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"video.animated.runtime.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"video.animated.runtime.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"video.animated.runtime.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"video.animated.runtime.ring_conspiracy_ending_true","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"video.animated.runtime.ring_conspiracy_scene_11","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"video.animated.runtime.ring_conspiracy_scene_15","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"video.animated.runtime.ring_conspiracy_scene_3","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"video.animated.runtime.ring_conspiracy_scene_5","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"video.animated.runtime.ring_conspiracy_scene_8","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"video.animated.runtime.white_canvas_ending_bad","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"video.animated.runtime.white_canvas_ending_normal","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"video.animated.runtime.white_canvas_ending_true","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"video.animated.runtime.white_canvas_scene_11","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"video.animated.runtime.white_canvas_scene_15","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"video.animated.runtime.white_canvas_scene_3","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"video.animated.runtime.white_canvas_scene_5","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"video.animated.runtime.white_canvas_scene_8","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"voice.result.canon_recap_continue_9_18","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_18.mp3","mimeType":"audio/mpeg","sha256":"5e02d8a955ef36c182bd2293307fec531e24e153d58994cb34a2b68a8b34ae73","bytes":97907,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"d59b2417793c3d7a75475909211b58f363efafec20c6d06a5c19c970e85df734","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:33.724Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5bd638fcbf28075b747c0e80876cce550b19ef0940e3e144cefe01c49906c817","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_37","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37.mp3","mimeType":"audio/mpeg","sha256":"ef041d6a2aaf372b440caad96e3f34bb2191ec52acef42d2e42186de67303304","bytes":102515,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"82b878dd3c284b1ebc599d775f1dbb074983d971551bdcca0d86efb3405569f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:38.907Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"bd8d5647773be2698ca9eb3fa5d82bc4015feb661597d8d7e1d75b7347f9edc6","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_37_battle","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"86a766b774def49b6ded10b24608646f954866fdefa589f72d99f7fe3d29d102","bytes":76595,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"37ea19fb902336b0c4d96a263f91162b7e686f4335f1a5a51f3d9b16a610df65","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:46.814Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"910f33bc6df9539dfceab2db2f8b0043eaf3482bbdd0ab2c83e7b3a3119397f8","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_9_43","kind":"audio","path":"audio/voice/result/canon_recap_continue_9_43.mp3","mimeType":"audio/mpeg","sha256":"a20ac9b480763a7e9ec332d7954e226947884f56bae8d39cd3409f77e66b234f","bytes":168179,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"f857162cf38ec26f169c23afd11308521f23630e7db9557ea87fcea622929b34","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:52.681Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"af9ee1264b3937ef4f0c0f2de55c861177000138757bc2691db200f384360e5b","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_continue_albina_fascia","kind":"audio","path":"audio/voice/result/canon_recap_continue_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"a329c02dcac7c7c700b02e8cd20ae50b7e9f5cf992542b9396c3773c169240c3","bytes":73715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"7b43dcd6f0d29fc39ee5a4f0f463eeb3ee4f237883dfa507b2e13ea09d6489f6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:56:55.359Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5be9c86a564959a6bdca015504f72c2b25563e747fa8748c9598f3cf29c9d6fb","role":"pie-speech-api-output"}]}},{"id":"voice.result.canon_recap_enter_AU","kind":"audio","path":"audio/voice/result/canon_recap_enter_AU.mp3","mimeType":"audio/mpeg","sha256":"e5456be94fcf623863ffcd78173c6f9841ade86d30ce54aeec82966aabdae179","bytes":135347,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"a17833fd6252e9c3daefbe17a1e5fceadd861037d3c35df77c93481c062fed5e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:57:04.066Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a94d66af5e27fe3f7f9c39bb34f4695d68752d456dd1b53727ab6279b13edddb","role":"pie-speech-api-output"}]}},{"id":"voice.result.conspiracy_005_let_her_answer","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"c3eeb96169e86d6d32bd24fcc1716f1b4b6169c24241a4a3785ad6e35bd0499b","bytes":321395,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"05da30b1f408abe988a03c1b859ad87ed8697a9588dfd0a01063074bca08695a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:50.999Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_005_refuse_duo","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"2188bc6032b768b6711d3163bdb45adbe7deec31d451ce74cf2b6af85785d93c","bytes":334643,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9ff57569b4ca94c725c68e3f3802c12fcb574f39995ccd8f9227aff0e8184a1e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:51.496Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_006_block_view","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"a3b7b7a240d59c2516983757140ded9382f6f71e6c5f74b94af8d4ce8110502e","bytes":429107,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"72c9ee2ef2f9f918974957617c7356702c64152881d240a27c8bfa4f773bad5e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:52.095Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_006_stand_with_her","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"d162f239d7d33996b43d4c9d2d517bff741e93b46293fcc55a00bfb778166ff9","bytes":444659,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4fd14203fd6a19ea74f32228474c4b515167af36aeb9ee411a1bdeb863457a68","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:52.779Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_007_break_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"1f3a9e8bd205a0e3fb7c9e3cac83e2f286036b393413ccf5fa9d9797e3e17b6e","bytes":346739,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e2b9d6fa175494cd0597fa41dcf4c8c12fd4b2762594d715189dae3a87e4c4ae","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:53.286Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_007_seize_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"cdacc6deea4032e1a6b3889c6e989a772db86ca71a4343e45235bbd132cbbaf2","bytes":402035,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"27d3ea76a5cac57a2a7ef610e0a326f04d0648260ac16c641decab547a66ed27","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:53.806Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_008_hand_pen_to_her","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"20aa52feaa8fdba93ea122e4264a5eb06266a253371186bcb28cd255427c0cdb","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"825e743cb275a4dbdc3c5f6272a0f9d6dd61f53e6f869ca11597b2681e6e5bc0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:54.308Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_008_refuse_testimony","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"5e39100ad58ff26de7201dc277ecc8a8f050f8fe377f891cada6bc4eca38dcb4","bytes":339827,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"62706d3b23d90aa75b04522ae440512160303b762c7f1df9d0947dcdb9936c5c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:54.818Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_009_choose_present","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"47fd587851224f61df1079bb5334dcccee2e87291913900762adea0939e83adb","bytes":426227,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f7d48667da043b0728f1c32838adfb9ffcbed5b08b4ff6015bb55eea52a31dec","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:55.370Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_009_refuse_choice","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"579736096170a0afb00017791b093021e59651844116fa3b46fcd527896ade75","bytes":453299,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f2772e0340d7dbf631599fa8bdf3c1e44a73673edfa1e901eab38c85f4179aec","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:55.994Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_010_keep_badge_unworn","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"451f67bf64c927ab02b685fd2eb24983cca5fa46d14a55371b211bc29b97d0fc","bytes":392243,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b1a83261b9aafae8ed64a87fe4a51de94344c3fc2b7e12cdb232d7a69ee41931","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:56.646Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_010_throw_badge","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"317363feb895846841f2512ebd4680be547ea512c07b7290ecc09f53bf2284d5","bytes":387635,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d1965b3d47f884633db07e4d10267cd468a09b9dcd1d7f1c846250ae33714683","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:57.225Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_011_burn_film","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"a6264c49431dbde54ff1eaa4d8d3a7011fc931b07ff3d1fd020388c8ba4cb79c","bytes":361715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0a070e89dcb6d3d102a574758dcc8d2ad6cfcc5b96d1383b93b43c576e7cd317","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:57.812Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_011_rewrite_ending","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"af9b903ff26fae14e50a4640b1fe6d591b5003cb8a340756d3061aeea4e0ced0","bytes":355379,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1547b49938754c17b2d46be91f86df84b0dacaf88b8c3ddbd47f31485011468d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:58.435Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_012_end_tonight","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"baef1eca98936b80447bce403bebcc1cdc8793ee1204f36275c34f358c06fb6a","bytes":411251,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"867f8c62a64aec663f009434dc8708aa98604408ce59852969b4b3f67b0bd3c8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:59.215Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_012_keep_blade","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"f7132cd47552bc59b54ad3c7b73d1640f3fb2f215e9f315ab3b4251afd77a7ff","bytes":404339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"00c2934ce4763d5f84bddbce0a6c5d0601fb127879aa37090f53d8447cfd85c8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:51:59.820Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_013_hold_one_second","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"e6647cb10fc82ee28ff451331a5ba9a1dba9b63459c65c962e1cef19c1bc11d0","bytes":373811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"82140fe3165784405100186f61b737e15b739b2cb63a65881572420822d9c62b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:00.447Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_013_return_gently","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"0e850f0e57d302c364b6bfe21980b42dee124a283e4a66ef12bd1339b0f2682f","bytes":398003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b76eab4fd4792cf146e8af71b56af6548b30bcf3b3b124f1453d7b4b32491b51","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:01.069Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_014_erase_from_catalog","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"0d32f303e7302bca81e8f9a74e3aec0cf46b23bf71427f7f0211deeb029afe37","bytes":420467,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"96200e5440714325de131712dcd2a8b67817a351c84075825e484d61fac39cd3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:01.666Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_014_keep_one_line","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"6c8bb01ee8faf99dca4cb097731a5c741735c223510416f7d98135c323d23f6f","bytes":429683,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"079a55c5e09667c10c5fbc75e2fd64f7b734e6d09107afef232ed6da44a97d58","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:02.242Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_accept","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"fca5933a9b7940e9e70ab2bc2d5f3bb2d5c1831e231e002d5e81d2d70187c8b9","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3d95ecf44332541aa2bebf6ee24bbe3c54f7a4e6d658780d4c4159110ef01050","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:02.831Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_break_pursuit_frame","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"80b95c0329a2ffd9463183d39c56d1a3c0c1be97857807307076441da7d1355d","bytes":354227,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e0c2f51cc13d9011eede0dc2acb29c45e8e0defbe6307cdced0a530229d14950","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:03.457Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_escape_to_backstreets","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"529885d362546fee041fb9daee874070b414eacfbaa0f0b0e202eec1f8848847","bytes":391667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4c13cdc061b4c19834479e9d64b936cc6c01d8fac8b3e265888334a79e1eee68","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:03.994Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_feed_false_signature","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"c8891dea18a2427f9c866fc45da8a392922ed1a4a29fb6adf9820661e38875f8","bytes":357107,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d31b6abbee62b71cdc7342f0bd1f2abd593bda0942b455306b4a75fe910e5e31","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:04.505Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","role":"validated-pie-speech-output"}]}},{"id":"voice.result.conspiracy_pressure","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"3af0fae827f9ab4202ed89aafca164c7bbd4f9cc3a3adea4a6c5df0fd15f9411","bytes":310451,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"8cc9fbbf26dd9b7d764387336446b0c3d0e7d4f34df2f3478ad4402dd05d747a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:04.999Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","role":"validated-pie-speech-output"}]}},{"id":"voice.result.enter_conspiracy","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"24ced6cd96816578da6dfa13fcf83514876c5562cdb6f8e09b1c32b4bcb11c7b","bytes":204467,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"a340dbacf3ebc505642763e1b68390e9d8cb3084ebcdc313bf46b48df200ab99","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T17:58:06.991Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"48be24d76494d0f1512af6b595a8dc783f1182f594a9dc279b23e9572909cb8f","role":"pie-speech-api-output"}]}},{"id":"voice.result.enter_rebuild","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"bd654ac516dd06f38f235bdf52260e578ce0a7655ed1111525deaa6e58e44a82","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"9ad6080cfa7a57f7225fb36916051a03537f64bf893c0600ef4e9efa81b4390a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:19.502Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"cfa718729334a837890eaed97a4c1dd4b674fa38d598f6536696efcbc2d10f16","role":"pie-speech-api-output"}]}},{"id":"voice.result.enter_white_canvas","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"e8ab325da6c8a12608d75df2bda071b88bb6ff7acf5e1572d9071ea6d8038b8c","bytes":145715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"d51bf59551c599dda87f22f00b00d32761621e56162e145f68cc96a0853217f1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:29.227Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"78269a83ccda24be11ecb5c1ebd6092c570747da39d74a18622ecb38b46d4e1f","role":"pie-speech-api-output"}]}},{"id":"voice.result.golden_bough_rebuild.bad_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"99044fbcd083fd583946b6883e5b9098fc9c681c04319fb140fdde443f8ed226","bytes":166451,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3c9aa98199d38099d44cf7b204cae777e4bfe56b6f6c0f78cdf761b58d47a294","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:05.343Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_rebuild.normal_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"555ba1fc500a42fc45cddbb0faa5230b5368741bc1d5e78412c002eb1ba786d9","bytes":165299,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"494bbfc3f76d792377aa59c1ec126418bb7bd9aec2860192a6b6f9ca8b8336ee","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:05.668Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_rebuild.true_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"2cefdaae2ccccd65e997733ccc076bab546212ccd50a7ceaab6b6e07f2bf4b24","bytes":154931,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a4344581ecaf8271e2e7166934449e770aaa28663b5b4556e118f7c2af31bf9b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:06.008Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_route_complete","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"1833aef2d3549425edf9702212a3dc74c91a2cbda14cb736da529cece809b327","bytes":491315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"71c497ece200e168dc2b4757b25da3461a49deccde1ed3fcdd794cf1e513c5fb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:06.736Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.golden_bough_route_final","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ee88fbcd046d6a69a5fde950904bb78bb78ac8590de0464d4bd9759e19ae5fa6","bytes":208499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0ab0d6ce09012765ab6201775321628d03c2055884166a388220847a0b3c8d16","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:07.152Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_006_keep_silent_anchor","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"212f4fb4d012df83e4ed3b002061b0ac8a6eba70df48e94c1cd3d4c583045174","bytes":396851,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"50da4b0037a394dcf36cf29fe27fec8a10a5d72ceb2440fad7515054f1b6b062","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:07.749Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_006_read_aloud","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"94cbc15ffad0d60de661ad72f8f46068442a75679d48014e17805f34c0c7b975","bytes":398003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"397931ba98e29f075c25aa8e8d3f5650d6fa5aa0539de2fc442f588773878f4e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:08.406Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_007_match_her_pulse","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"596b9c870c33cf5251c74a86de0b633a13fd58220e38d4e68f4e190e74fab424","bytes":438323,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"70e182c15d2c985147b1c9c3e51b389ed210917c6f9c7f87e58484ba71f7d794","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:09.037Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_007_stay_own_rhythm","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"87aec6c173a73614256d9ff98e2598dbec41e0e0d850b9fbcc59efa75f35b4b4","bytes":450995,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9767aab6b5811639cebce5f63907934bac559b281fd23f0c3d36260d84160959","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:09.637Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_008_protect_current_self","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"304ca21879c6515cfe594282032b1811fb0957dc5803f21b63c001770df3fd5d","bytes":405491,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6d00c8d2fe0042d206fba9c0fc98f7a58121c1fc7d5e5b0a91dd8dbb7d3866e8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:10.193Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_008_trade_old_memory","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"9ddad23ff662681ba22e7e3c0a569ce229853bdf73c03cd752b4c697bd79ac21","bytes":401459,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f72de26d73c073ec876653b2b71c303cd15bfe9291f9f5b53f9d4c636a5f42fa","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:10.799Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_009_hand_question_back","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"9cbf99b9553ac93f17ffa5b3179f47bb3667ee0729cef49e411c1d3db2a1cd13","bytes":400307,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f63489749d5cee3c0d61a30418032a862072278ce96f759b2a235a461f49f395","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:11.464Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_009_refuse_perfect_copy","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"f73bf969c5b85ea064c9c6c43ee7780f6f83c579eae92674a94f5dde32232348","bytes":393971,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ff8b0c035efcf8dad519f587977f819742d56495e07a991c444f903b8a93a5cb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:12.110Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_010_ask_her_choice","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"c74066ee553419d3bf9ee597a4f851bd2fb5938b5a555af427292eecadf454f1","bytes":335795,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"facde4f43785a68c1460fea3aeca8e241e0329a95720b2d7c97459febe85f22d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:12.635Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_010_veto_sealing","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"1832293d354bb2b22f61a4a66504f3114df3752012423cf14866e59929c6dc9b","bytes":343283,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cf63f2426787002f21c670558c9b2f327c801780dc03c4326e8ba368f374448f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:13.233Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_011_ask_next_revision","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"07d1e7d28a4ef027c305d085a2bb06525a63e8f66d563abbcc96faaaf06606c3","bytes":433715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"91a2bbdf26623a3c3cd75924e88b06c6c5d4b49a3f57f5230e183bcaa3560768","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:13.977Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_011_sit_beside","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"7dc8a32f43d98ae9902fe48573d34552259baff4c692ffb65d2deea5df6dfb98","bytes":430259,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"daa3e652312f53da54b22655db9f00e2a7b17e35b01800e3582f0fb3e10121e2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:14.580Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_012_break_contract","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"1c8c41c15241d865afd824a846acc0cf0ab205f26696e0e7c85be5299607b345","bytes":372083,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"12715c5610a920b4abbce22fe8b5546db99b8e9246d17c67367950acbeace978","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:15.139Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_012_negotiate_terms","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"12dd9f48b173bbf8fb3e92086a05bc9e9cb28099547345f88931e680e804b033","bytes":398579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d9817bb3b5c88586e4816b62f8ac52da5376f5f00c005b0c90be74a48abf0691","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:15.758Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_013_offer_witness","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"e86589de87474e4a6f8d57062df9f43650fc3a154618f5778d52c5e9ffcf4dc4","bytes":374963,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"498eceb78b3761573b3f6146ec01bb72bf61995fe5a297e47ff6f923036b40b1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:16.395Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_013_promise_name","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"1cfe997ea1a9204419bba1848681231d5351da60b5259246858533ba814d93ff","bytes":376115,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e5497aedfeea4c9449acdcd2a7607ed693b1cffee17c6612adac07a2240de399","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:17.056Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_014_ask_when_to_light","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"b81315d3ae6125ade7203449a21784899d0ccf28126b576feaf319dc80de2f69","bytes":423923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"750be1494bb5d4967816db2a878deddf724cdb7b3ce5c91854443e886f363bd8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:17.681Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_014_keep_unlit","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"fb826259dff130419016dbbe3720b59b7326c454fcbf7479dd9b8fc6a93fa2aa","bytes":433715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"495d4b12faf4449bbf4fc5752b8c2f576e408b94b280c40c51f4dfedc3e54a61","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:18.336Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_accept_missing_pieces","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"025ab49988979a6e3e8f9cb317f22442a0713b06c30db883126a0a3162e650a9","bytes":361715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cadc67b7f9ec94fc33a12697447e4a829f1c7e1b749349da72eab3b988b4ca63","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:18.894Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_anchor","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"65d32bf4c0b1141ea6ae80963cdf550162b5896279d98ac6e2cccd40bfaa63e1","bytes":236723,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"5058370432d4db499974c23da71f77008581b73409c2fc95a6fce8c8ae4b3380","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:19.313Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_cut_false_completion","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"0b7ebcceeaa3fcd9939421b7aee1b5fb6d7c9d14a4ca98dd7435ef1f29205120","bytes":367475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a4ac6e57ada6b17838c9d177af1a6ed22f2b832724fd38ef3a1615f1165bfba1","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:19.949Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_guard_fascia_pulse","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"f11f541a1544a54ba6d13f6adb0d93344ab451bd099d2005a5ac8c3a8cfe6369","bytes":389363,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"df42cb1ad7931603b5bd0cfe411166767c59fbeb3761fb3e019337fba982e582","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:20.649Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_push_into_raid","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"68acf768a66dd60d6ad996e4a06a57ef2755b9787f90f32d4f572b6d8c2426e0","bytes":406643,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9da0c2c2bc54f63d2895b36ba4b3f041398e90325452485da93ad3352b7c2fc6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:21.235Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_question_fascia","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"d49e2703fac28f03e412f0001ad711a642ae86bd88b37ca116d4c392f03099bb","bytes":228083,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"63811040ce2cbef8b394a6443438f8f48724ef785b0ae11d726f52822e447a20","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:21.618Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","role":"validated-pie-speech-output"}]}},{"id":"voice.result.rebuild_use_rooftop_signal","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"ab251367e6459f692c3477dcd584be69f0f3c43ea3912d22748e065d36987151","bytes":352499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"8254bcb6688fe8c3ee6c6fef17ae80d3802c96a5c2f573d5ed6fafac87c181af","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:22.191Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","role":"validated-pie-speech-output"}]}},{"id":"voice.result.return_opening_from_rebuild","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"4fb14344c5e70dfd1bc4f6b3ef069c4ad64cf34f491992513f836ee3cc93ce90","bytes":289715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"0230514fc5139bc211ca3e76b7b50c139f6969ef163da749089053b9b7159dd2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:33.306Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a553b659381de186e0ee91bb10171e295ea20a9ab454dbc04eba57cdcbcfb393","role":"pie-speech-api-output"}]}},{"id":"voice.result.return_opening_from_ring","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"9157a6a67aeac5fab63aab484d8a5fb2fe3a3352e3f50dc20b77351d1248eccb","bytes":278771,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"0e2bd000725bf7cc7935f31338d8ccf3ad05b15f0fbcef1926129ba5c2995625","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:43.353Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"de7e51083a36599bb71f4ad08aed1a308ee241955f6b2bccf6216fc7b90c1e2b","role":"pie-speech-api-output"}]}},{"id":"voice.result.return_opening_from_white","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"a0e41b784a562c97daa29e6174c6d10a22ff9161e15af5fb15b80ba1992b76eb","bytes":301811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"5d5410b3caa80cc3470c29ec9d90e5a4f013506eb82f0728230e172bb36c1b36","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:52.028Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"577a06c85009625e4bdc3f90128661718291bd8287dc314ea9504b2bf7e17f91","role":"pie-speech-api-output"}]}},{"id":"voice.result.ring_conspiracy_route_complete","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e13a967ca990933a69a93dcd78c122a5119f1c4d7d8f7e8c50ec15bae74d3b00","bytes":419891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d4ba1bce5dae907010eada233ad372926eb7c6d2ad5d2bd2edc614d91f706e08","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:22.776Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy_route_final","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"472ea9d9842371171504444bf5341c93c318c1998d2e81ea34833e020a8ee208","bytes":232115,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e05417c6fb659f8dec8002d85afcf15870e4501761804f9f113b71f093de7587","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.204Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.bad_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"f613f8e6d2453ec2827bb0acd07911ea84e7ef59edca47f378b7d76c0ce2c240","bytes":151475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"326fb3303d302e2a519e9a4572f3cb6d513f9877f659fbb9bf9eae871252c2b6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.551Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.normal_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"33bfedb7ada3a4bb3134f0eea06241ff6ac26a45c289d0a7261ee66b7ab9bca6","bytes":187763,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c733ee6d849e46a1eb6d2c55ef0011dea61265a6234c638b3f407333e3a2cb53","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:23.967Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.ring_conspiracy.true_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"fec30778f7f3ce3c3d76b6bf7028e7aa6ff5529e421e33a4494f67acb10205ea","bytes":167027,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0825fc284bda393fd1319d9f79da6dceb8ee14d1d4f9a15d10d246dd3ac24f85","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:24.376Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_006_name_silence","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"052bdd2c9ad58dc357d4a8e2efa1c775e719bfa0df5cc6a5b7ac5b5f2af548f9","bytes":418739,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ef8af18ff8b5fd3e7d0683394bf8720ad32da1f487b3de6580de8cc498759b23","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:25.026Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_006_refuse_naming","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"ddd59afe994de4a252c61a3803bbd0c63997304b9e6df37447b59e9b965017ca","bytes":425075,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c69a302c0ec4ce3efbc94185c65e98ad1936c3c5cdda227bd9d1efff5433bc96","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:25.676Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_007_ask_fascia_term","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"6bf8213e512ae808e04046fa39600bed3a1b59e7ce91dcbb902bb0b1fb666992","bytes":426803,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"60bbc7ecac62c5db72e483ff5657ef6cafbc2c8f71cee66c7322a07f80f702cc","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:26.316Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_007_keep_mirror_open","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"33a99a192d13ca70613e200a261e7b33659be9ae2b5d4efe34efa334d75d3e05","bytes":398579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"dbbef1a7f1cb9c49602bebfa8e535b523ba1406845611c2b22cd19eb151ffdb4","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:26.916Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_008_hold_fascia","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"41c2e3016510dd00c492632d8189788d79fc6e54b3383550412f1e057f071bfb","bytes":332339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0cc1384b75daebd7d68f11cee5974eb3f488ac250457c40e8353e553c94e0982","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:27.574Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_008_stay_witness_only","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"c6c37b0dae21ed498ef7c5c7671ed8429861fd5027ed8de840f27fa65c1d49b2","bytes":354803,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b9bc5d5844db20e8f622cf1d2dbedbbe00581c9dcf92859103c6d6d3e85866ff","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:28.206Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_009_keep_half_step","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"eb273061a887f8ea4796b2804cde9e109aed783bc88853b2592e3f4ced0e241e","bytes":374387,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"af68caf1ab696236f7c77808519845396728c3e02c58e7f634d8721132a757eb","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:28.765Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_009_share_umbrella_edge","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"a4f1748e8858f3adf850f0b3c2c6b38e65fe9b23edd557966889b071f0b09c9b","bytes":323123,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c130f724c6383773363fe3e9247eaf8ffe274e7e114ec50ba6691eb4e698c3ae","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:29.304Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_010_acknowledge_leave","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"6eb65fdccaf7e057ad12905510492926701ea449996d3c5697d56729dd8e1705","bytes":358835,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1ee9b18006f79a84152c275b47faeca493b046a58fa749c52f9e1188d0118796","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:29.879Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_010_offer_return_ticket","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"45594596a7c3fc007652bef42743925bb65a7615f873cad61d3429386b6eff4e","bytes":361139,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9b98c35ec50ef4f0b5e02ea2d948bef841309f5f2a2379c0c48afe500f0c173d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:30.431Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_011_curtain_call","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"42179eea6ade8f967fd3ed425a108fe78172750b55804d3fdf6ed6a57ab1d5df","bytes":384179,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3433690c28a888e3e3b11006ac79fb66bafb873cd36cf978dd26aa008e4cf772","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:31.001Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_011_walk_beside","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"5364cd974fd319a09968ea5dd8d47bacb304bc918dc1a8180d9b905bfec6d4e3","bytes":391667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"55cf6176bd61869a0ce31f9dcb73655f7f1f47a97ed93d883fb1d45c361a12bf","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:31.596Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_012_let_her_decide","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"8d92faf82d8e23de74356dea4233451838b0cf1ee0a41ab884f8407fc2ecb97d","bytes":364019,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d215db86e72780c1ff375940ffbd3791e787abe30ffbfc6740cff502a6d6114c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:32.188Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_012_refuse_exhibit","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"f13e7e5ddde629cffe4e022558da710927c6a9ea98b21b938cfa47c06fda6b65","bytes":346163,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"77b1970f13024e4466a24468ea9eaae71a5ff90b44ddd1a10a4f90deff1ca324","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:32.766Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_013_point_to_mirror","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"adf910758dc7147da909d2c11f12d49cb04fe05dc10095c915dabb83e4d5e490","bytes":417011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"7009f4717fc146ab389e923e75e2378a0d1441206bf2f444a393e84062dd7bc9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:33.429Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_013_refuse_to_choose","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"b3aa0c454052fd8f5dd1981af5510d3acd0aa9b23d1d3c82e0407b59b4fada8f","bytes":419891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"740ff09ab797313389f30e70ad9bdc482782fc34c2f04ef57216744a1885cb40","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:34.016Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_014_keep_base_color","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"e5abbde8433953db9427ab67392fc60bb77aabd16ed2f507d6c40d323701476f","bytes":403763,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1dda2c83c9b715dc7a36cf4d8a3e3531feb1ecc91690e81d72397c53a47334f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:34.684Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_014_offer_restart","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7b0a0fca1de3ae894ac6455f61354b0004fc7a4ae669990f3eb17c26c6cd6a5c","bytes":438899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"2e9b0b5b8c1813c9bd605a49d24f15dbc2bef3d34ee4bed91bcbfb9ab0e49655","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:35.418Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas_route_complete","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"94f66d44430484558772b9203ee1050accb21fa9f21110a8b3664cc8e0237896","bytes":430259,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"eee6217554ee15ceea2d7b0b4f00c00d9fa862a256ce786f9d9e7f4b47c65b8d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.027Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas_route_final","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"8e5228040c26e7c73ad64f14c4193f27b6aa73dd95460494258f47ccfbb83aba","bytes":230387,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"83b7ef1e9e08500f66d1576b4651775a4cbfa3265f494c1c18421a98ae352e74","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.425Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.bad_ending","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"c689384a6b62ca60bd84391fcecb3abf36158a295d70a0213079969f28f70def","bytes":164147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d5d529f590fd59f1b0f025fa9a886bbb44edea472fa60682ebbfb354dc7331df","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:36.766Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.normal_ending","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"0ea2a3bb0d492de34026165ff824b572dde9aa0561ecb32ac1df0c3d037fa217","bytes":151475,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3e31b96fe817530da6ef09c6641fd9594613f0bf99fd0fb829c1e132af928e58","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:37.107Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_canvas.true_ending","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"82c737637b2243b9be6ffb7dc45883f143773bae425420ec730e03c8510f32c4","bytes":150323,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"08303dcac821691fe2c1d28f2ec84b4d1aa3ed6bf1462a24a3a7b558f692f31c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:37.440Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_follow_to_lab","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"40e6d43999da61bda9da83fd878956a088de4cb25b6cc0d99be4b8214810351f","bytes":401459,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"14458af56bd3123b9cd3f11669256d7a22cae7fdf162c02d20901619ccb34d4f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:38.013Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_interrupt_lab_terms","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"dc0db8f0f34333e77b1186156c828aa59e1d510caa95aa0e97610a5065add968","bytes":364595,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d27224267bd6803ee94d880ffc2a437c725fc3efcb2b3af5ee5d3e32d3ce7726","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:38.575Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_keep_empty_seat","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8a76f675d5ea394277777e38529d1862f21dd62a5b2685da635ed0527df7e052","bytes":395699,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d0ce8b649faa4958ec85553a4ce355f9331e839f822484a3eaa8e24f88e62042","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:39.217Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_share_rain_window","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"20335d2fc8cfaef91400201f56bd1be36b2d9ea44402037c73bf06dd31af4b3a","bytes":378419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"5ad3aa48216b7dc7925d75c51439d87a99ae61a7b46160513bc215405c4e5948","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:39.824Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_sign_witness_protocol","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"e7636aa5a1ef0e083f6b8d3ef998b1c370cf1c529a2f37d0e89594b37f956400","bytes":345011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"56142600de1c32a9afe3cba636e9ca50bdcca52e861f10c4add5ba8b89a61e1b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:40.447Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_tease_back","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"1f65a84e40a1502a6fe8e2ee76133eaacd13e6673a4abd42b573750db8e155db","bytes":309875,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d159a9603f7a7582e9762cbeec896c6754df1823085df0619048c83282313efa","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:40.993Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","role":"validated-pie-speech-output"}]}},{"id":"voice.result.white_touch_boundary","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"367db6cdbaa418ed281c5d5e32d56c6fb59c82f8ac911913ecd1be2b6f7938ad","bytes":321971,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"42065c9ccacea71646dccbdb21fa65e678b161de7f7bfa18d593f38aac9ae7bf","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:41.497Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.canon_recap_9_14","kind":"audio","path":"audio/voice/scene/canon_recap_9_14.mp3","mimeType":"audio/mpeg","sha256":"177b6bb8d06c753e852f15f15053ee009e752c2d6b6e60cf5b9529808378539e","bytes":563315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"69cb56049d6e879e2d412d9376a6e5030a8f9302d5be7c72b7d3c6070ebf7791","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:39.428Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"c76f1dcdb5de2c1fd622ca980a25cf14395bccf00d1a897ad19123389ecac100","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_18","kind":"audio","path":"audio/voice/scene/canon_recap_9_18.mp3","mimeType":"audio/mpeg","sha256":"92d1bdda2e7c3a93bf3b4e2a68a424bf85d10949df29e99f57f026710c83a10c","bytes":839219,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"b1206c85c6846079b1ce0c3b47a6d63984bb23c7a1480c04e7e42a22c3de8ca6","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:47.186Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"5fd4987e9c25727521f51e2bf27df5982d59de85277b74df9d97e9f724e51bd5","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_37","kind":"audio","path":"audio/voice/scene/canon_recap_9_37.mp3","mimeType":"audio/mpeg","sha256":"63e76cd6291fbaa5d6f2dfe363b704e98c63ab0ade8eabb1bb96ff1ace9e39b0","bytes":916979,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"153e6b5d4ceaeeec43ea54e3261e41ed8bf5577071d573f004263f6f33182c2e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:02:53.784Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"84ef50b77e565c6c4f0da84372fcf47dddd9c33fea2997fe355f944b2f8f52cf","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_37_battle","kind":"audio","path":"audio/voice/scene/canon_recap_9_37_battle.mp3","mimeType":"audio/mpeg","sha256":"d136a8873f583ce3c5df44c57934c316402ebf899020e61c2ef21abf24ca18d3","bytes":675635,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"6f790e60f0e468516ce76f3673407e888252679f94541de11918fb6fef28d6e8","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:01.021Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a67bb8d10cd4e44cb2f670766bc1b45acc78219c61559d2ed37db46ad44109dd","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_9_43_outcome","kind":"audio","path":"audio/voice/scene/canon_recap_9_43_outcome.mp3","mimeType":"audio/mpeg","sha256":"29214a431ceda8a8917df7b47af4d31df69bb22b709c0d1ac6887579440310ab","bytes":1276403,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"17bf287e00059f90b094ff81d7fc9f6de97c05d812cf9d3651736a6c34d67dab","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:08.577Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"b479cae4cbf12cdfa1eae66d2f537dedb42c58f3d471b4c7bbc27e0185e566cd","role":"pie-speech-api-output"}]}},{"id":"voice.scene.canon_recap_albina_fascia","kind":"audio","path":"audio/voice/scene/canon_recap_albina_fascia.mp3","mimeType":"audio/mpeg","sha256":"9f445dfa83c196e54ab760d5d10b1ca08a23199e1d7a3c117bfbe04d9c187fca","bytes":2609267,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"c0ad6ef4f2be7d88905a614aa0aa0b6796beb374c95e402f43bcccc3f78371d3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:03:19.427Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"35d2bd219124272e9bae5662be97e4929a9b799cac54036d451e852c527fe98e","role":"pie-speech-api-output"}]}},{"id":"voice.scene.golden_bough_001","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"17b56b325e5051b43a27459152b094c53d12ac2edf65c03c0ec65533cb20a29c","bytes":203315,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"a270a72f45023d622be74677d1ea537ccd5888db0114194f6776f3af2ed26666","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:41.907Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_002","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"d6365c5d4894da5e57e88319d8c2fe264f25c4199b41031c8ed72ba40e09ee19","bytes":154355,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"b4473ee31de5b1cc49c15a7eb1add28ce76df79b7592fe3c3116ed2307289b65","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:42.286Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_003","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"1ad02d7568d0ae545c157a13989da73a7f7006aea805d0617a3d99ee3421ccfc","bytes":290867,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6fa1c97925366a32b8c7f44feee038786b7dae38a72fc7e5fee148d25354a011","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:42.799Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_004","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"a59f7ec4c382fbe7e9f54e6eca0c1c4a1d0c5fc3d8fb6b431831c69a8da8fc78","bytes":290867,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"527efdf94fb22735f303d947db0332e07ffc4f0a29ed05accdd32e240d6fb14f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:43.311Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_005","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"507228ac0a027d9c8f3534301d01fff6b9cedcf322a4daca6ec6803288517688","bytes":255155,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6b8c415bdbc21a315e4c6216a87334af387a9ce99f3c4269225be66f6cabde9a","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:43.744Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_006","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"ba279ed3531dc0ed703444d8ef096802428ca7ab29fcbf4f3873588ceb4d786d","bytes":311027,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1d44ba20698e0b69d89856ed539d4c3b8cdc34fceb61ee9594acba68f7b6763f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:44.224Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_007","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"e493295b8fc9a9777274dc6ea8bdf29f6fa36ffe186a9e8b705bc4f95e9dcf6a","bytes":326579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"38ba7e32fc54264d90c135ce2c62c7201a98abac7fc92aa1bc45956c8f0c9424","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:44.758Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_008","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"41eb3a1a3f955bdf78b8107b5f3aeb6e06a1c1446c0300f4de0f712a3b1a310e","bytes":308723,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"41607fa266621d6dd92c2d035287438b03daddc343ba89b1c32f54656ec8af83","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:45.298Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_009","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"54d231c0a6980338b1b28ea6ce15ca5a284f11bb0631106e1e3cb393c8154f89","bytes":315059,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c7495268f478f760ca778bdb657e96a65ce0fab47e7e397ddd2d8c9c22bca739","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:45.767Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_010","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"5ea795c0fd6273b40f187838c3ab9129a255d1dca1f7e65f155ee7c2b56c2972","bytes":305843,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f35d42e880288e82e6e6e49993b4c37bf4d626482e32d08f99a93309b735bc10","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:46.198Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_011","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"99ca50db65946593f20b548272f662389b678e88a6241d83d4d068de15595509","bytes":249395,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ff91a1208601ed2e190397c05caa3dc818008b1137e3b2e2b115b7562bbea94f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:46.580Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_012","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"152da1cd4f137ebca0900f228e2ed76cf392114063f02c3e63d6193ac093abc4","bytes":308147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"615135f1dfd10ca56a6d230fc5906ab5d301b861de1f439d736feaf8fd09b57e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.023Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_013","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"47e62c9d7dfb826b8fd9caf7a722a5bd0b4e1790632a24dd3f7a5acb5ec138b4","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f244b1df2919fe76299dcfa47accb58b15052e306ba75fc833307b7e2f66fffd","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.475Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_014","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"aaeffda74a330c6f70513fad58a0bfb8ebd8aa5793806ac74075e9aa4f4224d7","bytes":256883,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1d8cb187329c7b92f2a0989d4c4fefb3acd68041c1caff00180dd30e451d95c9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:47.882Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_015","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"796624549e2d513c2f139e412cbb989e3d9fa9221c6d6cb9c5d0d18cb9e14b69","bytes":298355,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"d0eef28da4f736abe86833ad4bb2e36480e0da115882743f37a39b2eaacf1426","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:48.340Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_bad","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"cd354aeaef8a6692d7f672d11d0ee3cf0c6bedfb9bd350a5f889ea2160902518","bytes":301811,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9eb71756df936d021bc7b0aa5e538751cb7f490ae585ad7e708b1fc89205708b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:48.783Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_gate","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7d0130d4db06b824850c69ce95c00de02af01fccaca56854c850e0284c9f29ae","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"298db686f42cc340c95f6304a5a9bb2268d197ac97f1344f48ea9bfee1332b28","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:49.160Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_normal","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"bd6aa132a1ac2f6c5fe62a3f328e5950cdb2b8ea54a3a92399bd7afed1f3e4fd","bytes":287987,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fba270f3981e547d43aca27f9f4bac748e04275f4a6868092e1e45e2c23045b9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:49.661Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.golden_bough_rebuild_ending_true","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"43cbec46f0fd8d9debb60a95f16e0e3663775a057c40df9af5dfef8e921c42f5","bytes":328307,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"178945dd1c479bc5fddff007809e856f1de647aff6225957a7e825332763d5f0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.177Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.opening_001","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"0ab7a4a0b1a11486d6feaeac10e40b2b9aec2675f19dcce2ddb501c679238074","bytes":425651,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"5a883853966525713af6be3c5091cdc6b46e700dc878872927105bb5c3c036c2","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:07:26.105Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"7dc61fc8a18a66c65b7e320819eaef21228cc823745cfff10ca43972828c2378","role":"pie-speech-api-output"}]}},{"id":"voice.scene.ring_conspiracy_001","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"f4535e60e9ebfe3a9f50940530ec05a38ca9e7dd665e2f7064ad0d52811753c2","bytes":186611,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"44469f1bbcc8fc18552a04bb1752643d7ed72aaa58d0b17bffd74b4d6754973f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.522Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_002","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"61c43123ae22fe7a5f07bd0d7b10070f527a4d8d9413b2c6e15b27c6566242f8","bytes":235571,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"539aaf46b5a96ce1385a02823718549789bf39958cb04c9eb20b6e806948804f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:50.904Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_003","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"51c502de79a93bb2b1a26a98501944d677fb2c15a5a49e15a29bdd31e414a498","bytes":247667,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f0c1044b16daa54e36d41efd4047b45ef6a1849295f8c4d31fb259b6dbb38326","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:51.309Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_004","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"41d01bc36452401d3300d76fe34a239e8c75f8711c9a5a5448865c2ecb49897c","bytes":291443,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"51f43be9131abd8a2d96ece11d7ac2c9e8f589c241af4a8e1c28296d0cc08a2e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:51.860Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_005","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"3e3011f9fdefa13e482f113f80ed4b977e27ad28d279150b8ab7044801ddfc01","bytes":280499,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"50ec0e3a3fcb8755657e0079da77177678124229cd1a1963a929f38bea643cbe","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:52.327Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_006","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"39c5261f5ef3d79e728f8364259d03f4d6de58242dc63be4797fe92077cb74e6","bytes":256883,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"39b617a8c8d1d95f3b7ea6e9622877b24f3f9e4e9062f4fcb2443ec0afe2d193","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:52.731Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_007","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"bf7b82d130b47ba9f0efdf5a0590b87d41601bcf2d90f01c20debb7d931cfc8f","bytes":270131,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"593b2d0525dc46a1ecf4e047fc4a6e37e20c4861e58f668d77e41dc37c24c8c5","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:53.205Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_008","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"2709be5f3a41429a9bee00e2a8631e14884cf249fee14c9944001fc865dfeb4c","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"88014d35432c1a5b4f56c82e44193c080743de1d149e39e8a3c676cfd64e25ad","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:53.727Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_009","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"30ab38b0d89d5d55b3ee833f4446be0b572508195146ba4529670e9293e4bc60","bytes":239603,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"1173f17ee8a03a8b34c229aeac46e2477a515c504c9a2bc45e186fd94aa3586f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:54.145Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_010","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"7902ea7116a00c992000ba090b0b886fadfbef3b628c57141a43e473a6478edf","bytes":287987,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"ebc023888ca1a431a1e8d89a231a62358726f7621b41d0b43ef98d74f72bbcf5","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:54.620Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_011","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"3ff28c1d82f871ea748100c320625f9f9d6ab0e53d8929b3e3dd0f09cec392c5","bytes":291443,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6771cb7b207941f1eccda0d4ea7ecf14bad9a68b2231765e0501a542b7d27008","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:55.166Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_012","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"43419544d4b85735fc4c6f3e8d3239307c4b19b4ebeade5d1120ef815715d6f6","bytes":273587,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"9fe6a2c58a0f897b3dacefb0a80634c760b41caa2e73dd13ae277a0846abc005","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:55.665Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_013","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"3065ed0dc9815078d8a5148a84ed2e29b7fb6cd9f7300cebe791ed20c59e0a53","bytes":306995,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"53c76ffe817aad060aa05140d3ca5c5c79d66024da22268f82c5cb94719a37e3","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:56.191Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_014","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"dd44754be2c8d7146bc1593bb86525176f25e94c47f696498500a106ec5a58cd","bytes":254003,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"64afbee7d2aa1a0eac573557d880a43ad24f08b957e49e422d132ccb28749f29","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:56.617Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_015","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"97b9eaf4e55aa2b333cc755914da99c5aa967ba3696b762800ea3249a138d8db","bytes":366899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"11cde049eb61f8f0e33164486fa8ccd66a6a3b6155869f9bb6172a32940dbe12","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:57.148Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_bad","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"9e16b3ccefac5a327e73e53fbd9dc45c88d12cb71b0b1129b696de7c1e957c05","bytes":319091,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"abe2f0895a2e8088d3a498d8e9b4f6d0e336811a58bfdff3a09922a0815a8183","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:57.673Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_gate","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"b8b574bf431cc9bdbadfe73fc3a0622a16f7d27433c7d3d38cb1fdc0655b6682","bytes":216563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"2488b54c1291c1d8b9051bb44e3bf6e8c5c67bc4dda433eb28326551aee9cbd9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:58.104Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_normal","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"9ddbee2b9dd93b149de53a5806a4fd9900a3bce05fd204c7f9a53c8140c295af","bytes":270707,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fc8f9d8ff14512ee933b6e3446c34c70bc26b1d2a4a4e1240139d40248077e03","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:58.612Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.ring_conspiracy_ending_true","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"55e5b7c7eb8118623d1b36aaa5e85d9b6ab4286c3e205c6e8d262be481691c37","bytes":347891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"4deb3a98534191a630873f96aca75d4f8241c87dcc69842a16c6029444c3865f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.123Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_001","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"61917fda12f4f29461e9db4603781dfe6af6351b9c58e8ac89fd6e11176a3d91","bytes":149171,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-v2","sourceJobHash":"26d8ff12d672a714ee5e53dca1c9563dc5047eb2ed9e76564759a81d3828da23","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:45:57.527Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v2","inputs":[{"sha256":"a409609201b1e169482fe326c70c4c55c344f8f4a5bc886f20b51b725006f06a","role":"pie-speech-api-output"}]}},{"id":"voice.scene.white_canvas_002","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"3fa78fe28acb401aa624e5dc0a149c430be3543587c707a460cc19238519b227","bytes":207923,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"0124da8141371da5605346831d64565d23f57f9b9b691ad1480ba7e2c60fb39b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.477Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_003","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"30c100d35a1e686cb6108e478d3c4eebc698b2bcf7fb964fde186a6e96f4564a","bytes":236147,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cc1eb1c9c159d886a5d042d7181b99f694a1ad9710ee4cd006047a87ddacbeea","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:52:59.861Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_004","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"829183a0e33a583a8af9072cf4914baa183d24cdb28d9fc9685c2ef02f8d9458","bytes":273011,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cfa89732a1ce256c6ac295a6ff2ade985a5e5ed937e97c27a3331a24390702f9","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:00.367Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_005","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"aac01f6f0bfb4130603e8ab330d08aa661878e5acaf94e9c1230a356456f16c4","bytes":264947,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"7406a6c3511ff311f87bc9b72aa4d9248c3a61c0f83e58e25ee6c716f6bd3d95","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:00.846Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_006","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"136978b119f80ca4655d4524f31808012d3c01076a055f2edf3a1a5a9c38f0eb","bytes":289715,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"01267d877abd2d8e09f21ea84d60032ae810b9a1e930d401fe4cfb502e870304","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:01.320Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_007","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"3b2ae779f6a0764aa8055571ce7a8fe0418c76cc9a2a7da395925ac3c90e2e91","bytes":293747,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6d09653fe0a3c8e3a560b72001e7ce655230eeb3385e555db04b8a01e1616f3c","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:01.782Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_008","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"4846c374ffcf1f93861daf210c752df86f4c00e1e3836d860d69522a116588ed","bytes":322547,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"f085e5f0dc298d9db7b2ee977e05d49f29b225516ea173b075245edbd0c7da0b","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:02.276Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_009","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"fc92b8497ec1f4133deafffd4f0204dde06654db1aea65ee0f1573f20bbf8354","bytes":258035,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"3b6fd2a878196cb998b836cf4233115c763fda3ce7c2ac082093d46b8b061457","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:02.729Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_010","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"82ce426cffeabb5431b3d08764ce3e7e42686b3f71f2e46736ecaa2a931d9135","bytes":216563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"c40d4d10ac11a99f14d34362b485eda2816e906704e73a15d51775ec547df18e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:03.137Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_011","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"c70978714c71795b05c1eff9adc92713e956103e2d2a8ac8e8576f65b2b7a01a","bytes":287411,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"6b76978a1979c08464e0e7b77e5be845ff819540a1a170f76f405f8a33c9ab8e","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:03.638Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_012","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"e6ccc5d30d1785af804799386b190334e375a77051545f1e49d211b5a2ce982c","bytes":254579,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"97c5eccddfa71c7fe37663824311f3770b10a9207395255ef9760badfe880c88","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:04.110Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_013","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"01d2f23ebdf72832e6a5b7480d5e4202e92f8b6a7445e614f6a00b324d5500c7","bytes":283379,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"adbb449badce6d68613405f3ef0d5c9e7d92885dbcf4f144f00cca891c60e124","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:04.596Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_014","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"1d2f602a2128a3d29d0953c583a78b495f75e55478cabfb5606e0a719c0db871","bytes":275891,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"bb36e0c7ec73882c04f9bec4c557da8f68fae57de6367a01d94850c9e26acfc0","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:05.109Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_015","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"5e4dff6e9f9d0f0373ceba2400c2044a6dacdc3dfd1b0a465cc4ce5dd8010619","bytes":306419,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"fe20269d6ec62b29ce5aa3101426190fd5af9a820d475df3a4683bf9dd713d4d","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:05.661Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_bad","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"4a724974ac526d8bb95a3b999fc0a4d04dd8fe645433f89b677d8df29c3c5bd4","bytes":294899,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"67f5e512a7de5e1ed132ff7fa75d83af0532acf5b4169dc2b5506d160f6f1942","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.135Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_gate","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"7b3659054aae442107a743730580dfee2084a7b9ef612e5de43300774412ed49","bytes":209075,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cc12ba29eabb3d82fb02190b2c2746e2cf2889ee8cfbb1eca2a9100c67f4d5ac","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.500Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_normal","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"7e098e1806cb221d667e4ade629f5b6696f19ac270afc3eef05b8847457ca140","bytes":260339,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"e5900c00a3e4cff6ea7599345393e785b035613eb5cf88f83fabbd5d525143df","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:06.931Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","role":"validated-pie-speech-output"}]}},{"id":"voice.scene.white_canvas_ending_true","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"8d2e7919504bf82ed1df05b648d9959d486caf9b9abffb9aaa9d883f517db401","bytes":288563,"provenance":{"provider":"pie","model":"speech-2.8-hd","promptVersion":"albina-speech-legacy-v1","sourceJobHash":"cd1ee1736af9da9b2939a44a6dbb7b8bbb96150aa96eb462dede7c337a285d6f","review":{"status":"approved","reviewer":"automated-audio-qc","reviewedAt":"2026-07-15T18:53:07.384Z"}},"lineage":{"kind":"conversion","processVersion":"speech-loudnorm-v1","inputs":[{"sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","role":"validated-pie-speech-output"}]}}]'), J6 = [{ version: 2, id: "portrait.albina.armored", characterId: "albina", path: "characters/albina/armored.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.combat", characterId: "albina", path: "characters/albina/combat.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.endgame", characterId: "albina", path: "characters/albina/endgame.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.fascia-open", characterId: "albina", path: "characters/albina/fascia-open.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.furious", characterId: "albina", path: "characters/albina/furious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.golden-bough", characterId: "albina", path: "characters/albina/golden-bough.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.maestro", characterId: "albina", path: "characters/albina/maestro.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.normal", characterId: "albina", path: "characters/albina/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.rain", characterId: "albina", path: "characters/albina/rain.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.ring-conspiracy", characterId: "albina", path: "characters/albina/ring-conspiracy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.shy", characterId: "albina", path: "characters/albina/shy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.surgical", characterId: "albina", path: "characters/albina/surgical.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.white-canvas", characterId: "albina", path: "characters/albina/white-canvas.png", animation: { kind: "static" } }, { version: 2, id: "portrait.callisto.normal", characterId: "callisto", path: "characters/callisto/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.dante.normal", characterId: "dante", path: "characters/dante/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.faust.normal", characterId: "faust", path: "characters/faust/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.golden_apparition.normal", characterId: "golden_apparition", path: "characters/golden_apparition/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.lce_doctor.normal", characterId: "lce_doctor", path: "characters/lce_doctor/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.battle", characterId: "protagonist", path: "characters/protagonist/battle.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.resolve", characterId: "protagonist", path: "characters/protagonist/resolve.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.serious", characterId: "protagonist", path: "characters/protagonist/serious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.shadow", characterId: "protagonist", path: "characters/protagonist/shadow.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.tender", characterId: "protagonist", path: "characters/protagonist/tender.png", animation: { kind: "static" } }, { version: 2, id: "portrait.protagonist.wet-hair", characterId: "protagonist", path: "characters/protagonist/wet-hair.png", animation: { kind: "static" } }, { version: 2, id: "portrait.ren.normal", characterId: "ren", path: "characters/ren/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.ring_agent.normal", characterId: "ring_agent", path: "characters/ring_agent/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.vergilius.normal", characterId: "vergilius", path: "characters/vergilius/normal.png", animation: { kind: "static" } }], K6 = [], G6 = {
  version: q6,
  projectId: Z6,
  basePath: H6,
  assets: B6,
  portraits: J6,
  mediaJobs: K6
}, W6 = 2, Y6 = "albina-galgame-card", X6 = "canon_recap_9_14", Q6 = { white_canvas: "white_canvas_001", golden_bough_rebuild: "golden_bough_001", ring_conspiracy: "ring_conspiracy_001" }, e4 = { relationshipTracks: [{ id: "intimacy", label: "亲密", minimum: 0, maximum: 100 }, { id: "reliance", label: "信赖", minimum: 0, maximum: 100 }, { id: "obsession", label: "执着", minimum: 0, maximum: 100 }, { id: "suspicion", label: "戒备", minimum: 0, maximum: 100 }], quests: [{ id: "quest.white.boundary_protocol", route: "white_canvas", label: "白色画布边界协议", description: "在见证、处置权和展出决定之间建立可撤回的边界。" }, { id: "quest.golden.memory_continuity", route: "golden_bough_rebuild", label: "金枝记忆连续性", description: "在重构过程中保住称谓、选择权与法西娅的心跳锚点。" }, { id: "quest.ring.counter_contract", route: "ring_conspiracy", label: "环指反制契约", description: "保留自身条件并把敌对委托改写为可追踪的反制条款。" }], battles: [{ id: "battle.white.gallery_pressure", route: "white_canvas", label: "画廊展出压力", description: "决定是否把阿尔比娜作为作品展出的制度性冲突。", recommendedMastery: "boundary" }, { id: "battle.golden.replacement_protocol", route: "golden_bough_rebuild", label: "替换协议冲突", description: "围绕记忆封存和替换协议发生的确定性规则冲突。", recommendedMastery: "analysis" }, { id: "battle.ring.authorship_frame", route: "ring_conspiracy", label: "署名权取景框", description: "在环指剧本、胶片和署名权之间争夺叙事控制。", recommendedMastery: "blade" }], items: [{ id: "item.rain_room_badge", label: "雨室观测徽记", description: "进入 AU/IF 后由前端保存的身份与见证锚点。" }, { id: "item.white.boundary_contract", route: "white_canvas", label: "边界契约钥", description: "证明处置权、撤回权和展出决定已写入权威状态。" }, { id: "item.golden.memory_anchor", route: "golden_bough_rebuild", label: "称谓锚定镜片", description: "用于稳定重构后的称谓和人格连续性。" }, { id: "item.ring.counter_signet", route: "ring_conspiracy", label: "反制环印", description: "记录玩家保留条件和反写条款的装备凭据。" }], equipment: [{ id: "equipment.rain_room_badge", itemId: "item.rain_room_badge", slot: "accessory", label: "雨室观测徽记", modifiers: { trust: 1, composure: 2 } }, { id: "equipment.white.boundary_charm", itemId: "item.white.boundary_contract", route: "white_canvas", slot: "accessory", label: "边界契约护符", modifiers: { trust: 3, danger: -2 } }, { id: "equipment.golden.memory_lens", itemId: "item.golden.memory_anchor", route: "golden_bough_rebuild", slot: "accessory", label: "称谓锚定镜片", modifiers: { trust: 2, artResonance: 4 } }, { id: "equipment.ring.counter_signet", itemId: "item.ring.counter_signet", route: "ring_conspiracy", slot: "accessory", label: "反制环印", modifiers: { danger: -3, leverage: 3 } }], professions: [{ id: "narrative_curator", label: "剧情索引师", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { artResonance: 1 } }, { id: "boundary_mediator", route: "white_canvas", label: "边界调停者", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { trust: 1, danger: -1 } }, { id: "memory_surgeon", route: "golden_bough_rebuild", label: "记忆修复师", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { artResonance: 2 } }, { id: "ring_counterforger", route: "ring_conspiracy", label: "契约反写者", xpThresholds: [0, 8, 20, 36], modifiersPerLevel: { trust: 1, danger: -1, leverage: 1 } }], achievements: [{ id: "ach_au_boundary_witness", label: "AU 边界见证", description: "完成正史复盘并确认本卡路线属于原创 AU/IF。", eligibility: [{ kind: "flag", flag: "AU_boundary_acknowledged", equals: !0 }, { kind: "worldbook", entryId: "albina_routes_endings_au_if", status: "seen" }], reward: { values: { artResonance: 1 }, professionXp: { narrative_curator: 2 }, setFlags: ["achievement_au_boundary_witness"] } }, { id: "ach_white_boundary_archivist", route: "white_canvas", label: "白厅边界档案", description: "完成边界任务并解决画廊展出压力。", eligibility: [{ kind: "quest", questId: "quest.white.boundary_protocol", status: "completed" }, { kind: "battle", battleId: "battle.white.gallery_pressure", outcome: "victory" }, { kind: "profession", professionId: "boundary_mediator", levelGte: 2 }], reward: { values: { trust: 2, danger: -2 }, professionXp: { boundary_mediator: 2 }, setFlags: ["achievement_white_boundary_archivist"] } }, { id: "ach_golden_memory_protocol", route: "golden_bough_rebuild", label: "重构称谓协议", description: "完成连续性任务并解决替换协议冲突。", eligibility: [{ kind: "quest", questId: "quest.golden.memory_continuity", status: "completed" }, { kind: "battle", battleId: "battle.golden.replacement_protocol", outcome: "victory" }, { kind: "profession", professionId: "memory_surgeon", levelGte: 2 }], reward: { values: { artResonance: 3 }, professionXp: { memory_surgeon: 2 }, setFlags: ["achievement_golden_memory_protocol"] } }, { id: "ach_ring_counter_clause", route: "ring_conspiracy", label: "反写条款生效", description: "完成反制任务并夺回署名权。", eligibility: [{ kind: "quest", questId: "quest.ring.counter_contract", status: "completed" }, { kind: "battle", battleId: "battle.ring.authorship_frame", outcome: "victory" }, { kind: "profession", professionId: "ring_counterforger", levelGte: 2 }], reward: { values: { trust: 2, danger: -2 }, professionXp: { ring_counterforger: 2 }, setFlags: ["achievement_ring_counter_clause"] } }], outfits: [{ id: "outfit.albina.rain", label: "雨室外套", portraitAssetId: "portrait.albina.rain" }, { id: "outfit.albina.white_canvas", route: "white_canvas", label: "白色画布装束", portraitAssetId: "portrait.albina.white-canvas" }, { id: "outfit.albina.golden_bough", route: "golden_bough_rebuild", label: "金枝重构装束", portraitAssetId: "portrait.albina.golden-bough" }, { id: "outfit.albina.ring_disguise", route: "ring_conspiracy", label: "环指潜入装束", portraitAssetId: "portrait.albina.ring-conspiracy" }], worldbookEntries: [{ id: "albina_canon_term_corporism", claimIds: ["canon.term.corporism"], constant: !1, selective: !0, content: "Corporism 是 Canto IX 9-14 与 9-37 明确使用的环指艺术流派名称。本卡保留英文术语，避免无来源扩写其教义。" }, { id: "albina_identity_status", claimIds: ["canon.profile.identity"], constant: !1, selective: !0, content: "阿尔比娜是女性环指 Corporism 学徒、House of Spiders 成员与卡利斯托的弟子，在 Canto IX 作为敌对角色登场；韩语配音为 Kim Do-hee，9-43 后的正史状态为死亡。" }, { id: "albina_prosthetic_appearance", claimIds: ["canon.appearance.prosthetic-body"], constant: !1, selective: !0, content: "阿尔比娜使用带金色点缀的白色全身义体；浅灰色人工高马尾近似线缆，脸与关节处有分界线，黑色机械和线路在颈胸与大腿处裸露，中央结构近似骨架。她右眼黑、左眼白，前臂可展开多种医疗与切割工具。" }, { id: "albina_armor_fascia_visual", claimIds: ["canon.appearance.armor-and-fascia"], constant: !1, selective: !0, content: "白、亮黄、金色的铁处女式装甲具有长裙、尖刺头环、垂链、尖刺裙甲和绘有金色锐眼的面具。Fascia 是同色系巨剑，侧板打开后可见暗色骨架、肋骨与内脏组织。" }, { id: "fascia_body_origin", claimIds: ["canon.story.pre-canto-fascia"], constant: !1, selective: !0, content: "阿尔比娜主动切分原本肉体并将其制作成 Fascia，之后以全身义体替换身体、主要保留脑；Fascia 则缺少脑。她也曾先用自己的手臂练习如何处理创作素材。" }, { id: "albina_fascia_attachment", claimIds: ["canon.personality.fascia-attachment"], constant: !1, selective: !0, content: "阿尔比娜会与 Fascia 交谈、用他人血肉喂养它，并在它可能受损时优先保护它；她甚至会为让 Fascia 继续行动而违背同伴要求。" }, { id: "albina_social_ambition", claimIds: ["canon.personality.social-and-ambition"], constant: !1, selective: !0, content: "阿尔比娜通常平静轻声，却难以理解他人情绪；她把朋友与可用于 Fascia 的素材联系起来，并说自己因把部分脑组织交给 Fascia 而不善说谎。她敬仰卡利斯托，也希望未来成为超越师父的 Maestro。" }, { id: "canto_ix_9_14_context", claimIds: ["canon.9-14.corporism-context"], constant: !1, selective: !0, content: "9-14 展示了环指加工的人体作品、Faust 对 Corporism 的辨认和 Nursefather 留给女儿的创作指示。阿尔比娜本人没有在这一节直接出场。" }, { id: "canto_ix_9_18_first_appearance", claimIds: ["canon.9-18.first-appearance"], constant: !1, selective: !0, content: "9-18 是阿尔比娜首次直接出场。她与 Ren 接替 Shiomi Yoru 阻挡 Dante、Ryōshū、Gregor、Meursault 与 Yi Sang，为 Yoru 带走嫁接的 Golden Boughs 争取时间。战斗中装甲与 Fascia 侧板打开；她坚持让 Fascia 继续行动，Ren 出手制止，争执使罪人得以继续追赶 Yoru。" }, { id: "canto_ix_9_37_encounter", claimIds: ["canon.9-37.encounter-and-method"], constant: !1, selective: !0, content: "Callisto 派阿尔比娜迎接抵达 Corridor of the Ring 的 Sinclair、Ishmael、Faust、Hohenheim 与 Alyssa。她谈到唤醒 Fascia、用自己手臂练习素材处理和交朋友的愿望；遭到 Sinclair 拒绝后开战，并自称是 Callisto 门下的 Corporism 学徒。" }, { id: "canto_ix_9_37_escalation", claimIds: ["canon.9-37.escalation"], constant: !1, selective: !0, content: "Callisto 加入后与阿尔比娜一同压制众人。9-37 最后是 Callisto 以骨肉尖桩制住除 Alyssa 外的成员、Alyssa 以 Ardor Blossom Star 全力反击；Fascia 被毁和师徒死亡不发生在这一节。" }, { id: "canto_ix_9_43_turn_and_outcome", claimIds: ["canon.9-43.sign-awakening", "canon.9-43.outcome"], constant: !0, selective: !1, content: "9-43 中 Hohenheim 突袭 Callisto 后，阿尔比娜阻止追击并谈到未来；Sinclair 完全觉醒 The Sign，显现未来版本。Faust 与 Ishmael 制造开口后，Future Sinclair 先摧毁 Fascia，再杀死阿尔比娜，并随后杀死 Callisto。" }, { id: "albina_combat_profile", claimIds: ["canon.combat.story-variants", "canon.combat.mechanics"], constant: !1, selective: !0, content: "主线敌人记录包含 9-18 装甲形态、9-37 的装甲转无装甲阶段和 9-43 无装甲形态。她是 65 级、Lust 倾向、以 Bleed 为核心的 Boss；Corpus Ingredient 会转为 Artwork - Fascia 并启用强力攻击。Mirror Dungeon 与 Refracted 记录属于玩法变体，不是主线事件。" }, { id: "albina_visual_reference_lock", claimIds: ["inference.visual-reference-lock"], constant: !0, selective: !1, content: "代表正史阿尔比娜的视觉必须保留白色全身义体、右黑左白双眼、白黄金铁处女式装甲和具有骨骼内脏结构的 Fascia。路线服装变化只能作为明确标注的 AU 视觉。" }, { id: "albina_routes_endings_au_if", claimIds: ["boundary.routes-and-player.are-AU"], constant: !0, selective: !1, content: "opening_001、white_canvas、golden_bough_rebuild、ring_conspiracy、九个结局以及 {{user}} 的身份、能力和关系全部是本卡原创 AU/IF。分歧点位于 9-43 正史结果之后，不能称为原作后续或隐藏结局。" }] }, t4 = /* @__PURE__ */ JSON.parse('[{"version":2,"id":"canon_recap_9_14","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-14.corporism-context"],"sourceIds":["source.official.canto-ix.9-14","source.wiki.canto-ix-part-i.172275"],"note":"Short zh-CN event paraphrase; not a quotation or transcript replacement."},"locationId":"lce_research_hallway","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-14 背景】在 LCE 研究区走廊，众人遭遇环指加工的人体作品。Faust 根据骨骼、肌肉与运动方式将其辨认为 Corporism，并发现 Nursefather 留给女儿的创作指示。固定转录全文没有在 9-14 直接写到 Albina；本节只提供她所属艺术流派的背景。","voiceAssetId":"voice.scene.canon_recap_9_14","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_18","text":"继续复盘 Albina 的首次登场","nextSceneId":"canon_recap_9_18","resultText":"时间推进到 9-18 的 LCE 研究区实验室。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_18","effects":{"setFlags":["canon_recap_9_14_seen"]}}]},{"version":2,"id":"canon_recap_9_18","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-18.first-appearance"],"sourceIds":["source.official.canto-ix.9-18","source.wiki.canto-ix-part-i.172275","source.wiki.albina.173286"],"note":"Reviewed zh-CN first-appearance paraphrase covering the complete Albina-related 9-18 event sequence."},"locationId":"lce_research_lab","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-18 首次出场】Dante、Ryōshū、Gregor、Meursault 与 Yi Sang 在 LCE 研究区实验室追查 Golden Boughs。Albina 与 Ren 接替 Shiomi Yoru 阻挡他们，让 Yoru 接近并带走嫁接的金枝。战斗推进到两人受创后，Albina 的上半装甲与 Fascia 侧板打开，露出搏动组织；她坚持让 Fascia 继续行动，Ren 则要求服从各自师父的计划，并出手制止她。两人的争执也给了罪人继续追赶 Yoru 的机会。","voiceAssetId":"voice.scene.canon_recap_9_18","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37","text":"继续复盘 9-37","nextSceneId":"canon_recap_9_37","resultText":"时间推进到 Operation Spider Pyre 期间的 Ring Corridor。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_37","effects":{"setFlags":["canon_recap_9_18_seen"]}}]},{"version":2,"id":"canon_recap_9_37","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.encounter-and-method"],"sourceIds":["source.official.canto-ix.9-37","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286"],"note":"Reviewed zh-CN 9-37 arrival, method and friendship paraphrase; player boundary text is kept out of this canon scene."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 相遇】Operation Spider Pyre 期间，Sinclair、Ishmael、Faust、Hohenheim 与 Alyssa 抵达 Corridor of the Ring；Callisto 派 Albina 前来“迎接”他们。她因唤醒沉睡的 Fascia 而迟到，并说明自己仍不擅长在不损坏素材的情况下完成作品，所以先用自己的手臂练习。她礼貌地请求众人与自己成为朋友，却把了解彼此与挑选 Fascia 的素材混在一起；遭到 Sinclair 拒绝后，双方开战。Albina 随后自报姓名，并说明自己是 Callisto 门下的 Corporism 学徒。","voiceAssetId":"voice.scene.canon_recap_9_37","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_albina_fascia","text":"核对 Albina 与 Fascia","nextSceneId":"canon_recap_albina_fascia","resultText":"复盘转向两者的身份与身体关系。","resultVoiceAssetId":"voice.result.canon_recap_continue_albina_fascia","effects":{"setFlags":["canon_recap_9_37_seen"]}}]},{"version":2,"id":"canon_recap_albina_fascia","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.profile.identity","canon.appearance.prosthetic-body","canon.appearance.armor-and-fascia","canon.personality.fascia-attachment","canon.personality.social-and-ambition","canon.story.pre-canto-fascia"],"sourceIds":["source.official.canto-ix.9-18","source.official.canto-ix.9-37","source.official.canto-ix.9-43","source.wiki.albina-enemy.175660","source.wiki.albina.173286","source.wiki.callisto.177757","source.wiki.canto-ix-part-i.172275","source.wiki.canto-ix-part-iii.177602","source.wiki.house-of-spiders.177075"],"note":"Atomic profile, appearance, personality and pre-Canto facts rendered from the reviewed claim ledger; no source dialogue is reproduced."},"locationId":"ring_corridor","backgroundAssetId":"bg.ring_atelier","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"left","active":true,"scale":1}],"speaker":"正史复盘","text":"【身份】Albina（韩文 알비나，日文 アルビナ）是女性环指 Corporism 学徒、House of Spiders 成员与 Callisto 的弟子。她在 Canto IX 中作为敌对角色登场，韩语配音为 Kim Do-hee；9-43 之后的正史状态为死亡。\\n\\n【外观】她使用带金色点缀的白色全身义体：浅灰色人工质感高马尾近似线缆，脸与关节处有分界线，颈胸与大腿可见黑色机械和线路，躯干中央近似骨架。她右眼黑、左眼白，前臂还能展开剪刀、锯、手术刀、三爪与牵开器等工具。\\n\\n【装甲与武器】她的铁处女式全身装甲以白、亮黄与金色为主，具有长裙、尖刺头环、垂链、尖刺裙甲和绘有金色锐眼的面具。Fascia 是同色系巨剑，侧板打开后会露出暗色骨架、肋骨与内脏组织。\\n\\n【Fascia】Albina 对 Fascia 有强烈依恋，会与它交谈、用他人血肉喂养它，并在它可能受损时优先保护它；9-18 中她甚至为让 Fascia 继续行动而违背 Ren 对计划的要求。\\n\\n【人格与关系】她通常平静轻声、专注艺术，却难以理解他人的情绪；她将“朋友”与可用于 Fascia 的素材联系起来。她表示自己把部分脑组织交给 Fascia 后变得很不善说谎，同时敬仰 Callisto，并希望未来成为超越师父的 Maestro。\\n\\n【身体关系】Albina 主动切分原本肉体并将其制作成 Fascia，随后用全身义体替换身体、主要保留脑；Fascia 则缺少脑。她还曾先以自己的手臂练习如何处理创作素材。","voiceAssetId":"voice.scene.canon_recap_albina_fascia","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37_battle","text":"继续复盘 9-37 的战斗升级","nextSceneId":"canon_recap_9_37_battle","resultText":"复盘转向 Callisto 加入后的最后阶段。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_37_battle","effects":{"setFlags":["canon_recap_albina_fascia_seen"]}}]},{"version":2,"id":"canon_recap_9_37_battle","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.escalation"],"sourceIds":["source.official.canto-ix.9-37","source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602"],"note":"Reviewed 9-37 ending boundary contrasted with the later 9-43 outcome."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 战斗升级】Callisto 加入战斗后，与 Albina 一同逐步压制 Limbus Company 一行。该节最后，Callisto 以骨肉尖桩制住除 Alyssa 外的众人，Alyssa 则将 Ardor Blossom Star 调至最高同调并发动反击。9-37 到此结束；Fascia 被毁、Albina 与 Callisto 死亡都不属于这一节，而发生在后续 9-43《Hatching》。","voiceAssetId":"voice.scene.canon_recap_9_37_battle","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_43","text":"继续复盘 9-43《Hatching》","nextSceneId":"canon_recap_9_43_outcome","resultText":"时间推进到 9-43；接下来才是不能被路线文本改写为正史的既定结果。","resultVoiceAssetId":"voice.result.canon_recap_continue_9_43","effects":{"setFlags":["canon_recap_9_37_battle_seen"]}}]},{"version":2,"id":"canon_recap_9_43_outcome","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-43.sign-awakening","canon.9-43.outcome"],"sourceIds":["source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286"],"note":"Reviewed 9-43 pressure, Sign awakening and outcome paraphrase; the AU boundary remains a separate scene."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap-outcome","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-43《Hatching》转折】Hohenheim 用 Diffraction 突袭 Callisto 后，Albina 阻止 Faust 与 Ishmael 乘机追击；师徒仍将严重受创的众人逼入绝境。她要求 Sinclair 留下成为自己与 Fascia 的朋友，并在旁观 Callisto 对 Hohenheim 下手时谈到未来超越师父的梦想。她提出“未来”后，Sinclair 完全觉醒 The Sign，并显现一个来自未来的自己。\\n\\n【正史中文意译·9-43 既定结果】Faust 与 Ishmael 的同步攻击制造开口后，Future Sinclair 首先摧毁 Fascia。Albina 因 Fascia 被毁而失措，随后也被 Future Sinclair 杀死；Callisto 在之后被杀。Albina 的正史直接出场链至此结束，顺序是 9-18、9-37、9-43。","voiceAssetId":"voice.scene.canon_recap_9_43_outcome","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_enter_AU","text":"确认边界并进入 AU/IF 分歧","nextSceneId":"opening_001","resultText":"正史复盘已结束。以下三条路线全部是本卡原创 AU/IF。","resultVoiceAssetId":"voice.result.canon_recap_enter_AU","effects":{"setFlags":["canon_recap_9_43_seen","canon_recap_complete","AU_boundary_acknowledged"],"professionXp":{"narrative_curator":2},"activateProfession":"narrative_curator"}}]},{"version":2,"id":"opening_001","chapter":1,"route":null,"provenance":{"classification":"AU_extension","scope":"AU_boundary","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Explicit continuity boundary shown before the player selects an author-created AU route."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.opening_rain","tone":"AU-boundary","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"AU/IF 分歧","text":"【本卡原创 AU/IF，不是原作后续】9-43《Hatching》的正史结局已经复盘完毕。从这一刻开始，Albina 的存活、玩家 {{user}} 的出现、三条路线与九个结局均为本卡原创，不代表原作事实或隐藏结局。","voiceAssetId":"voice.scene.opening_001","bgmAssetId":"file.audio.bgm.backstreets.rain.mp3","choices":[{"id":"enter_white_canvas","text":"进入 white_canvas AU","nextSceneId":"white_canvas_001","resultText":"【AU/IF】你进入以关系边界与自我选择为核心的 white_canvas 原创路线。","resultVoiceAssetId":"voice.result.enter_white_canvas","effects":{"route":"white_canvas","values":{"affectionAlbina":2,"trust":2,"artResonance":1},"relationshipVectors":{"intimacy":2,"reliance":2},"setFlags":["route_white_canvas_seen"],"unlockCg":["cg.opening_rain"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":4},"activateProfession":"boundary_mediator"}},{"id":"enter_rebuild","text":"进入 golden_bough_rebuild AU","nextSceneId":"golden_bough_001","resultText":"【AU/IF】这条路线假设 Albina 在 9-43 死亡后被重构；该前提与全部后续均非正史。","resultVoiceAssetId":"voice.result.enter_rebuild","effects":{"route":"golden_bough_rebuild","values":{"trust":3,"danger":1},"relationshipVectors":{"reliance":2,"suspicion":1},"setFlags":["route_rebuild_seen"],"unlockCg":["cg.golden_bough_rebuild"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":4},"activateProfession":"memory_surgeon"}},{"id":"enter_conspiracy","text":"进入 ring_conspiracy AU","nextSceneId":"ring_conspiracy_001","resultText":"【AU/IF】这条路线主动改写 9-43 后续因果；其中的委托、关系和结局均为本卡原创。","resultVoiceAssetId":"voice.result.enter_conspiracy","effects":{"route":"ring_conspiracy","values":{"danger":3,"artResonance":2},"relationshipVectors":{"reliance":1,"suspicion":2},"setFlags":["route_conspiracy_seen"],"unlockCg":["cg.ring_invitation"],"grantItems":["item.rain_room_badge"],"equipItems":["equipment.rain_room_badge"],"unlockOutfits":["outfit.albina.rain"],"activateOutfit":"outfit.albina.rain","startQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":4},"activateProfession":"ring_counterforger"}}]},{"version":2,"id":"white_canvas_001","chapter":1,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.94},{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"right","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。","voiceAssetId":"voice.scene.white_canvas_001","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_touch_boundary","text":"告诉她：完整也是一种作品","nextSceneId":"white_canvas_002","resultText":"你选择“告诉她：完整也是一种作品”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_touch_boundary","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["albina_learns_wholeness"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_tease_back","text":"反问她是否害怕自己的画布","nextSceneId":"white_canvas_002","resultText":"你选择“反问她是否害怕自己的画布”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_tease_back","effects":{"values":{"affectionAlbina":2,"danger":1,"artResonance":3},"setFlags":["player_teases_artist"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_002","chapter":2,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","voiceAssetId":"voice.scene.white_canvas_002","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_follow_to_lab","text":"陪她把画布带进 LCE 临时手术室","nextSceneId":"white_canvas_003","resultText":"你选择“陪她把画布带进 LCE 临时手术室”。LCE 医师：灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","resultVoiceAssetId":"voice.result.white_follow_to_lab","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":2},"setFlags":["white_lab_boundary_seen"],"unlockCg":["cg.hollow_torso_reveal"]}},{"id":"return_opening_from_white","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_white","effects":{"values":{"trust":1},"setFlags":["white_canvas_looped"]}}]},{"version":2,"id":"white_canvas_003","chapter":3,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_3","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_3","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","voiceAssetId":"voice.scene.white_canvas_003","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_sign_witness_protocol","text":"只签见证，不签处置权","nextSceneId":"white_canvas_004","resultText":"你选择“只签见证，不签处置权”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_sign_witness_protocol","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":2},"relationshipVectors":{"intimacy":2,"reliance":3},"conflictMastery":{"boundary":1},"setFlags":["witness_not_ownership"],"unlockCg":["cg.lce_raid"],"grantItems":["item.white.boundary_contract"],"equipItems":["equipment.white.boundary_charm"],"unlockOutfits":["outfit.albina.white_canvas"],"activateOutfit":"outfit.albina.white_canvas","completeQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":6}}},{"id":"white_interrupt_lab_terms","text":"要求医师删去所有所有权措辞","nextSceneId":"white_canvas_004","resultText":"你选择“要求医师删去所有所有权措辞”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_interrupt_lab_terms","effects":{"values":{"trust":3,"danger":1,"artResonance":3},"relationshipVectors":{"reliance":4,"suspicion":-1},"conflictMastery":{"boundary":1},"setFlags":["lab_terms_rewritten"],"unlockCg":["cg.fascia_heartbeat"],"grantItems":["item.white.boundary_contract"],"equipItems":["equipment.white.boundary_charm"],"unlockOutfits":["outfit.albina.white_canvas"],"activateOutfit":"outfit.albina.white_canvas","completeQuests":["quest.white.boundary_protocol"],"professionXp":{"boundary_mediator":6}}}]},{"version":2,"id":"white_canvas_004","chapter":4,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","voiceAssetId":"voice.scene.white_canvas_004","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_keep_empty_seat","text":"替她保留那张无人审判的座位","nextSceneId":"white_canvas_005","resultText":"你选择“替她保留那张无人审判的座位”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_keep_empty_seat","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":1},"setFlags":["white_canvas_empty_seat"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_share_rain_window","text":"把雨夜倒影交给她自己命名","nextSceneId":"white_canvas_005","resultText":"你选择“把雨夜倒影交给她自己命名”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_share_rain_window","effects":{"values":{"affectionAlbina":3,"trust":2,"artResonance":3},"setFlags":["rain_reflection_named"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_005","chapter":5,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_5","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_5","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","voiceAssetId":"voice.scene.white_canvas_005","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_complete","text":"记录白色画布路线的暂定结局","nextSceneId":"white_canvas_006","resultText":"你选择“记录白色画布路线的暂定结局”。阿尔比娜：空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","resultVoiceAssetId":"voice.result.white_canvas_route_complete","effects":{"values":{"affectionAlbina":2,"trust":2,"danger":-1,"artResonance":2},"setFlags":["white_canvas_route_complete"]}}]},{"version":2,"id":"white_canvas_006","chapter":6,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","voiceAssetId":"voice.scene.white_canvas_006","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_006_name_silence","text":"替那条轮廓取一个不会被收藏的名字","nextSceneId":"white_canvas_007","resultText":"你选择“替那条轮廓取一个不会被收藏的名字”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_name_silence","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":3},"setFlags":["silhouette_named"],"unlockCg":["cg.art_resonance"]}},{"id":"white_006_refuse_naming","text":"让轮廓保持无名，由她决定","nextSceneId":"white_canvas_007","resultText":"你选择“让轮廓保持无名，由她决定”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_refuse_naming","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["naming_returned"],"unlockCg":["cg.trust_threshold"]}}]},{"version":2,"id":"white_canvas_007","chapter":7,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.fascia_heartbeat","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.9}],"speaker":"法西娅","text":"法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","voiceAssetId":"voice.scene.white_canvas_007","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_007_keep_mirror_open","text":"让镜子继续映照，不替她遮蔽","nextSceneId":"white_canvas_008","resultText":"你选择“让镜子继续映照，不替她遮蔽”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_keep_mirror_open","effects":{"values":{"trust":3,"danger":1,"artResonance":4},"setFlags":["mirror_kept_open"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_007_ask_fascia_term","text":"当着阿尔比娜问法西娅一个边界问题","nextSceneId":"white_canvas_008","resultText":"你选择“当着阿尔比娜问法西娅一个边界问题”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_ask_fascia_term","effects":{"values":{"affectionAlbina":1,"trust":2,"artResonance":3},"setFlags":["fascia_addressed_directly"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_008","chapter":8,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_8","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_8","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","voiceAssetId":"voice.scene.white_canvas_008","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_008_hold_fascia","text":"替她暂时照看法西娅","nextSceneId":"white_canvas_009","resultText":"你选择“替她暂时照看法西娅”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_hold_fascia","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":2},"setFlags":["fascia_held_by_player"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_008_stay_witness_only","text":"只站在她视野内，不接手","nextSceneId":"white_canvas_009","resultText":"你选择“只站在她视野内，不接手”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_stay_witness_only","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["witness_distance_kept"],"unlockCg":["cg.lce_raid"]}}]},{"version":2,"id":"white_canvas_009","chapter":9,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","voiceAssetId":"voice.scene.white_canvas_009","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_009_keep_half_step","text":"守住半步距离，不擅自靠近","nextSceneId":"white_canvas_010","resultText":"你选择“守住半步距离，不擅自靠近”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_keep_half_step","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["half_step_distance"],"unlockCg":["cg.rain_confession"]}},{"id":"white_009_share_umbrella_edge","text":"把伞沿偏向她那侧","nextSceneId":"white_canvas_010","resultText":"你选择“把伞沿偏向她那侧”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_share_umbrella_edge","effects":{"values":{"affectionAlbina":4,"trust":2,"artResonance":2},"setFlags":["umbrella_shared"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_010","chapter":10,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"但丁","text":"但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","voiceAssetId":"voice.scene.white_canvas_010","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_010_acknowledge_leave","text":"承认她随时可以离开这张画布","nextSceneId":"white_canvas_011","resultText":"你选择“承认她随时可以离开这张画布”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_acknowledge_leave","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["leaving_acknowledged"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"white_010_offer_return_ticket","text":"给她一张可以返回的车票，而不是绳索","nextSceneId":"white_canvas_011","resultText":"你选择“给她一张可以返回的车票，而不是绳索”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_offer_return_ticket","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":2},"setFlags":["return_ticket_given"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_011","chapter":11,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.art_resonance","videoAssetId":"video.animated.runtime.white_canvas_scene_11","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_11","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","voiceAssetId":"voice.scene.white_canvas_011","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_011_curtain_call","text":"答应替她谢幕，不替她登台","nextSceneId":"white_canvas_012","resultText":"你选择“答应替她谢幕，不替她登台”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_curtain_call","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["curtain_call_promised"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_011_walk_beside","text":"陪她走下月台，不离开也不催促","nextSceneId":"white_canvas_012","resultText":"你选择“陪她走下月台，不离开也不催促”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_walk_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["platform_walked_together"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_012","chapter":12,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","voiceAssetId":"voice.scene.white_canvas_012","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_012_refuse_exhibit","text":"当众拒绝展出她的缺陷","nextSceneId":"white_canvas_013","resultText":"你选择“当众拒绝展出她的缺陷”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_refuse_exhibit","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-1,"artResonance":3},"relationshipVectors":{"reliance":3},"conflictMastery":{"boundary":3},"setFlags":["defect_not_exhibited"],"unlockCg":["cg.trust_threshold"],"resolveBattles":[{"battleId":"battle.white.gallery_pressure","outcome":"victory"}],"professionXp":{"boundary_mediator":6}}},{"id":"white_012_let_her_decide","text":"把展与不展的决定权交还给她","nextSceneId":"white_canvas_013","resultText":"你选择“把展与不展的决定权交还给她”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_let_her_decide","effects":{"values":{"affectionAlbina":3,"trust":5,"danger":3,"artResonance":4},"relationshipVectors":{"suspicion":3},"conflictMastery":{"boundary":1},"setFlags":["exhibit_choice_returned"],"unlockCg":["cg.art_resonance"],"resolveBattles":[{"battleId":"battle.white.gallery_pressure","outcome":"setback"}],"professionXp":{"boundary_mediator":3}}}]},{"version":2,"id":"white_canvas_013","chapter":13,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.art_resonance","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","voiceAssetId":"voice.scene.white_canvas_013","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_013_point_to_mirror","text":"指向墙上那面映过法西娅的镜子","nextSceneId":"white_canvas_014","resultText":"你选择“指向墙上那面映过法西娅的镜子”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_point_to_mirror","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":5},"setFlags":["mirror_pointed_out"],"unlockCg":["cg.art_resonance"]}},{"id":"white_013_refuse_to_choose","text":"拒绝替她决定，让她自己下刀","nextSceneId":"white_canvas_014","resultText":"你选择“拒绝替她决定，让她自己下刀”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_refuse_to_choose","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":3},"setFlags":["knife_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_014","chapter":14,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.trust_threshold","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","voiceAssetId":"voice.scene.white_canvas_014","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_014_keep_base_color","text":"答应替她保留最后一层底色","nextSceneId":"white_canvas_015","resultText":"你选择“答应替她保留最后一层底色”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_keep_base_color","effects":{"values":{"affectionAlbina":4,"trust":4,"artResonance":3},"setFlags":["base_color_kept"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_014_offer_restart","text":"答应陪她从空白重新开始","nextSceneId":"white_canvas_015","resultText":"你选择“答应陪她从空白重新开始”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_offer_restart","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["restart_offered"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_015","chapter":15,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_15","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","voiceAssetId":"voice.scene.white_canvas_015","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_final","text":"为白色画布路线盖上最后一枚印章","nextSceneId":"white_canvas_ending_gate","resultText":"你选择“为白色画布路线盖上最后一枚印章”。白色画布路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.white_canvas_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["white_canvas_route_final"]}}]},{"version":2,"id":"white_canvas_ending_gate","chapter":16,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"白色画布的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.white_canvas_ending_gate","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"white_canvas_ending_true","resultText":"结局判定完成：白色画布·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.true_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5},{"kind":"quest","questId":"quest.white.boundary_protocol","status":"completed"},{"kind":"battle","battleId":"battle.white.gallery_pressure","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.white.boundary_charm"},{"kind":"outfit","outfitId":"outfit.albina.white_canvas"},{"kind":"profession","professionId":"boundary_mediator","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_white_canvas_true_qualified"]}},{"id":"white_canvas_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"white_canvas_ending_normal","resultText":"结局判定完成：白色画布·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_white_canvas_normal_qualified"]}},{"id":"white_canvas_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"white_canvas_ending_bad","resultText":"结局判定完成：白色画布·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]},"effects":{"setFlags":["ending_white_canvas_bad_qualified"]}}]},{"version":2,"id":"white_canvas_ending_true","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_true","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"晨光落在未署名的白画上。阿尔比娜没有把你画成作品，而是把并肩离开的两道影子留在画框之外：这一次，完整与亲密同时成立。","voiceAssetId":"voice.scene.white_canvas_ending_true","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]}}},{"version":2,"id":"white_canvas_ending_normal","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_normal","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"展厅按约熄灯。你们保留了尚未说尽的话，也保留了随时重画的权利。阿尔比娜把空白画布卷好，约定下一场雨后再见。","voiceAssetId":"voice.scene.white_canvas_ending_normal","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"white_canvas_ending_bad","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_bad","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白厅没有发生争吵，只剩一张过早完成的画。阿尔比娜礼貌地收回画笔与称呼；边界仍被守住，但你们没能把信任带到黎明。","voiceAssetId":"voice.scene.white_canvas_ending_bad","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]}}},{"version":2,"id":"golden_bough_001","chapter":1,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"left","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。","voiceAssetId":"voice.scene.golden_bough_001","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_anchor","text":"成为她的记忆锚点","nextSceneId":"golden_bough_002","resultText":"你选择“成为她的记忆锚点”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["player_memory_anchor"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_question_fascia","text":"先检查法西娅","nextSceneId":"golden_bough_002","resultText":"你选择“先检查法西娅”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_question_fascia","effects":{"values":{"trust":2,"danger":1,"artResonance":4},"setFlags":["fascia_checked_first"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_002","chapter":2,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.94}],"speaker":"旁白","text":"镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","voiceAssetId":"voice.scene.golden_bough_002","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_push_into_raid","text":"带着记忆锚点突入金枝异常现场","nextSceneId":"golden_bough_003","resultText":"你选择“带着记忆锚点突入金枝异常现场”。浮士德：金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","resultVoiceAssetId":"voice.result.rebuild_push_into_raid","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["rebuild_raid_committed"],"unlockCg":["cg.lce_raid"]}},{"id":"return_opening_from_rebuild","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_rebuild","effects":{"values":{"trust":1},"setFlags":["rebuild_looped"]}}]},{"version":2,"id":"golden_bough_003","chapter":3,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_3","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_3","tone":"threat","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"浮士德","text":"金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","voiceAssetId":"voice.scene.golden_bough_003","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_cut_false_completion","text":"切断“完成品”的错误定义","nextSceneId":"golden_bough_004","resultText":"你选择“切断“完成品”的错误定义”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_cut_false_completion","effects":{"values":{"trust":4,"danger":1,"artResonance":4},"relationshipVectors":{"intimacy":1,"reliance":4},"conflictMastery":{"analysis":1},"setFlags":["false_completion_cut"],"unlockCg":["cg.surgery_of_memory"],"grantItems":["item.golden.memory_anchor"],"equipItems":["equipment.golden.memory_lens"],"unlockOutfits":["outfit.albina.golden_bough"],"activateOutfit":"outfit.albina.golden_bough","completeQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":6}}},{"id":"rebuild_guard_fascia_pulse","text":"守住法西娅的心跳频率","nextSceneId":"golden_bough_004","resultText":"你选择“守住法西娅的心跳频率”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_guard_fascia_pulse","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"relationshipVectors":{"reliance":3,"obsession":1},"conflictMastery":{"resonance":1},"setFlags":["fascia_pulse_guarded"],"unlockCg":["cg.fascia_heartbeat"],"grantItems":["item.golden.memory_anchor"],"equipItems":["equipment.golden.memory_lens"],"unlockOutfits":["outfit.albina.golden_bough"],"activateOutfit":"outfit.albina.golden_bough","completeQuests":["quest.golden.memory_continuity"],"professionXp":{"memory_surgeon":6}}}]},{"version":2,"id":"golden_bough_004","chapter":4,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","voiceAssetId":"voice.scene.golden_bough_004","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_accept_missing_pieces","text":"承认缺口也是她的结构","nextSceneId":"golden_bough_005","resultText":"你选择“承认缺口也是她的结构”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_accept_missing_pieces","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["missing_pieces_accepted"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_use_rooftop_signal","text":"用楼顶信号重排记忆顺序","nextSceneId":"golden_bough_005","resultText":"你选择“用楼顶信号重排记忆顺序”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_use_rooftop_signal","effects":{"values":{"trust":3,"danger":-1,"artResonance":4},"setFlags":["rooftop_signal_reordered"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_005","chapter":5,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_5","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_5","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","voiceAssetId":"voice.scene.golden_bough_005","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_complete","text":"记录金枝重构路线的暂定结局","nextSceneId":"golden_bough_006","resultText":"你选择“记录金枝重构路线的暂定结局”。浮士德：记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","resultVoiceAssetId":"voice.result.golden_bough_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-1,"artResonance":3},"setFlags":["golden_bough_route_complete"]}}]},{"version":2,"id":"golden_bough_006","chapter":6,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.surgery_of_memory","tone":"golden","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"浮士德","text":"记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","voiceAssetId":"voice.scene.golden_bough_006","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_006_read_aloud","text":"把那段记忆当着她的面念出来","nextSceneId":"golden_bough_007","resultText":"你选择“把那段记忆当着她的面念出来”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_read_aloud","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["memory_read_aloud"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_006_keep_silent_anchor","text":"只做锚点，不替她出声","nextSceneId":"golden_bough_007","resultText":"你选择“只做锚点，不替她出声”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_keep_silent_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["silent_anchor_kept"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_007","chapter":7,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","voiceAssetId":"voice.scene.golden_bough_007","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_007_match_her_pulse","text":"按她的节拍调整呼吸","nextSceneId":"golden_bough_008","resultText":"你选择“按她的节拍调整呼吸”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_match_her_pulse","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pulse_matched"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"rebuild_007_stay_own_rhythm","text":"保留你自己的呼吸节奏，让她对齐","nextSceneId":"golden_bough_008","resultText":"你选择“保留你自己的呼吸节奏，让她对齐”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_stay_own_rhythm","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":4},"setFlags":["own_rhythm_kept"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_008","chapter":8,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_8","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_8","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","voiceAssetId":"voice.scene.golden_bough_008","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_008_protect_current_self","text":"保护此刻这个尚未完成的她","nextSceneId":"golden_bough_009","resultText":"你选择“保护此刻这个尚未完成的她”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_protect_current_self","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["current_self_protected"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_008_trade_old_memory","text":"用一段旧记忆换取撤退时间","nextSceneId":"golden_bough_009","resultText":"你选择“用一段旧记忆换取撤退时间”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_trade_old_memory","effects":{"values":{"trust":2,"danger":-2,"artResonance":4},"setFlags":["memory_traded"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_009","chapter":9,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"金色幻影","text":"镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","voiceAssetId":"voice.scene.golden_bough_009","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_009_refuse_perfect_copy","text":"替她拒绝那个完美复制品","nextSceneId":"golden_bough_010","resultText":"你选择“替她拒绝那个完美复制品”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_refuse_perfect_copy","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["perfect_copy_refused"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_009_hand_question_back","text":"把问题原样交还给她","nextSceneId":"golden_bough_010","resultText":"你选择“把问题原样交还给她”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_hand_question_back","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["question_returned"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_010","chapter":10,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","voiceAssetId":"voice.scene.golden_bough_010","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_010_veto_sealing","text":"当着医师反对封存记忆","nextSceneId":"golden_bough_011","resultText":"你选择“当着医师反对封存记忆”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_veto_sealing","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":2,"artResonance":3},"setFlags":["memory_seal_vetoed"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_010_ask_her_choice","text":"低声问她自己想怎么签","nextSceneId":"golden_bough_011","resultText":"你选择“低声问她自己想怎么签”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_ask_her_choice","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":2},"setFlags":["seal_choice_hers"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_011","chapter":11,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_11","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_11","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","voiceAssetId":"voice.scene.golden_bough_011","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_011_sit_beside","text":"坐到她旁边，不说话","nextSceneId":"golden_bough_012","resultText":"你选择“坐到她旁边，不说话”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_sit_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["silent_companionship"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"rebuild_011_ask_next_revision","text":"问她下一笔想修改哪里","nextSceneId":"golden_bough_012","resultText":"你选择“问她下一笔想修改哪里”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_ask_next_revision","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["next_revision_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_012","chapter":12,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","voiceAssetId":"voice.scene.golden_bough_012","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"rebuild_012_break_contract","text":"当面撕毁那份替换协议","nextSceneId":"golden_bough_013","resultText":"你选择“当面撕毁那份替换协议”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_break_contract","effects":{"values":{"trust":4,"danger":0,"artResonance":3},"relationshipVectors":{"reliance":3},"conflictMastery":{"analysis":3},"setFlags":["replacement_contract_torn"],"unlockCg":["cg.conspiracy_contract"],"resolveBattles":[{"battleId":"battle.golden.replacement_protocol","outcome":"victory"}],"professionXp":{"memory_surgeon":6}}},{"id":"rebuild_012_negotiate_terms","text":"替她重新谈判条件，不让她独自承担","nextSceneId":"golden_bough_013","resultText":"你选择“替她重新谈判条件，不让她独自承担”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_negotiate_terms","effects":{"values":{"affectionAlbina":2,"trust":-5,"danger":3,"artResonance":-4},"relationshipVectors":{"suspicion":3},"conflictMastery":{"analysis":1},"setFlags":["terms_renegotiated"],"unlockCg":["cg.surgery_of_memory"],"resolveBattles":[{"battleId":"battle.golden.replacement_protocol","outcome":"setback"}],"professionXp":{"memory_surgeon":3}}}]},{"version":2,"id":"golden_bough_013","chapter":13,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","voiceAssetId":"voice.scene.golden_bough_013","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_013_promise_name","text":"答应她即使失败也记得这个名字","nextSceneId":"golden_bough_014","resultText":"你选择“答应她即使失败也记得这个名字”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_promise_name","effects":{"values":{"affectionAlbina":4,"trust":5,"artResonance":3},"setFlags":["name_promise_given"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_013_offer_witness","text":"只承诺做见证，不承诺结果","nextSceneId":"golden_bough_014","resultText":"你选择“只承诺做见证，不承诺结果”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_offer_witness","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["witness_only_promise"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_014","chapter":14,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","voiceAssetId":"voice.scene.golden_bough_014","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_014_keep_unlit","text":"答应只保管，不替她点亮","nextSceneId":"golden_bough_015","resultText":"你选择“答应只保管，不替她点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_keep_unlit","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":3},"setFlags":["gilded_bough_kept_unlit"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_014_ask_when_to_light","text":"问她什么时刻才能点亮","nextSceneId":"golden_bough_015","resultText":"你选择“问她什么时刻才能点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_ask_when_to_light","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["lighting_condition_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_015","chapter":15,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_15","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_15","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","voiceAssetId":"voice.scene.golden_bough_015","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_final","text":"为金枝重构路线落最后一笔","nextSceneId":"golden_bough_rebuild_ending_gate","resultText":"你选择“为金枝重构路线落最后一笔”。金枝重构路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.golden_bough_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["golden_bough_route_final"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_gate","chapter":16,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"金枝重构的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_gate","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_rebuild_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"golden_bough_rebuild_ending_true","resultText":"结局判定完成：金枝重构·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.true_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8},{"kind":"quest","questId":"quest.golden.memory_continuity","status":"completed"},{"kind":"battle","battleId":"battle.golden.replacement_protocol","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.golden.memory_lens"},{"kind":"outfit","outfitId":"outfit.albina.golden_bough"},{"kind":"profession","professionId":"memory_surgeon","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_golden_bough_rebuild_true_qualified"]}},{"id":"golden_bough_rebuild_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"golden_bough_rebuild_ending_normal","resultText":"结局判定完成：金枝重构·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_golden_bough_rebuild_normal_qualified"]}},{"id":"golden_bough_rebuild_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"golden_bough_rebuild_ending_bad","resultText":"结局判定完成：金枝重构·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]},"effects":{"setFlags":["ending_golden_bough_rebuild_bad_qualified"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_true","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_true","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_true","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"金枝残响终于与法西娅的心跳重合。阿尔比娜记得每一次称呼、暂停和重新确认；她以新的身体醒来，也完整记得是谁陪她走过重构。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_true","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]}}},{"version":2,"id":"golden_bough_rebuild_ending_normal","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_normal","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_normal","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"重构在可控范围内结束。部分残响仍被封存在金色薄膜后，但阿尔比娜认得你，也认得自己。你们决定把余下修复交给时间。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_normal","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"golden_bough_rebuild_ending_bad","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_bad","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_bad","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"稳定槽保住了身体，却没能保住全部连续性。阿尔比娜醒来时仍然礼貌，只把你当作可靠的见证者；被遗漏的称呼沉在金枝深处。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_bad","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]}}},{"version":2,"id":"ring_conspiracy_001","chapter":1,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。","voiceAssetId":"voice.scene.ring_conspiracy_001","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_accept","text":"接下委托，但保留自己的条件","nextSceneId":"ring_conspiracy_002","resultText":"你选择“接下委托，但保留自己的条件”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_accept","effects":{"values":{"trust":2,"danger":3,"artResonance":3},"setFlags":["contract_with_boundary"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"conspiracy_pressure","text":"逼她说出真正目标","nextSceneId":"ring_conspiracy_002","resultText":"你选择“逼她说出真正目标”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_pressure","effects":{"values":{"affectionAlbina":1,"danger":4,"artResonance":2},"setFlags":["pressed_true_goal"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_002","chapter":2,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.95}],"speaker":"阿尔比娜","text":"她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","voiceAssetId":"voice.scene.ring_conspiracy_002","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_escape_to_backstreets","text":"带着未签名委托冲出画廊","nextSceneId":"ring_conspiracy_003","resultText":"你选择“带着未签名委托冲出画廊”。环指代理人：追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","resultVoiceAssetId":"voice.result.conspiracy_escape_to_backstreets","effects":{"values":{"trust":2,"danger":3,"artResonance":2},"setFlags":["ring_escape_committed"],"unlockCg":["cg.backstreet_pursuit"]}},{"id":"return_opening_from_ring","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_ring","effects":{"values":{"trust":1,"danger":-1},"setFlags":["conspiracy_looped"]}}]},{"version":2,"id":"ring_conspiracy_003","chapter":3,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_3","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_3","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","voiceAssetId":"voice.scene.ring_conspiracy_003","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_break_pursuit_frame","text":"打碎追兵布下的取景框","nextSceneId":"ring_conspiracy_004","resultText":"你选择“打碎追兵布下的取景框”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_break_pursuit_frame","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"relationshipVectors":{"intimacy":1,"reliance":4},"conflictMastery":{"blade":1},"setFlags":["pursuit_frame_broken"],"unlockCg":["cg.combat_transition_01"],"grantItems":["item.ring.counter_signet"],"equipItems":["equipment.ring.counter_signet"],"unlockOutfits":["outfit.albina.ring_disguise"],"activateOutfit":"outfit.albina.ring_disguise","completeQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":6}}},{"id":"conspiracy_feed_false_signature","text":"交出伪造签名引开视线","nextSceneId":"ring_conspiracy_004","resultText":"你选择“交出伪造签名引开视线”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_feed_false_signature","effects":{"values":{"trust":2,"danger":-1,"artResonance":4},"relationshipVectors":{"reliance":3,"suspicion":1},"conflictMastery":{"analysis":1},"setFlags":["false_signature_planted"],"unlockCg":["cg.ren_interruption"],"grantItems":["item.ring.counter_signet"],"equipItems":["equipment.ring.counter_signet"],"unlockOutfits":["outfit.albina.ring_disguise"],"activateOutfit":"outfit.albina.ring_disguise","completeQuests":["quest.ring.counter_contract"],"professionXp":{"ring_counterforger":6}}}]},{"version":2,"id":"ring_conspiracy_004","chapter":4,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","voiceAssetId":"voice.scene.ring_conspiracy_004","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"ring_conspiracy_route_complete","text":"记录环指共谋路线的暂定结局","nextSceneId":"ring_conspiracy_005","resultText":"你选择“记录环指共谋路线的暂定结局”。卡利斯托：卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-2,"artResonance":3},"setFlags":["ring_conspiracy_route_complete"],"unlockCg":["cg.ring_conspiracy_ending"]}}]},{"version":2,"id":"ring_conspiracy_005","chapter":5,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_5","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_5","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","voiceAssetId":"voice.scene.ring_conspiracy_005","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_005_refuse_duo","text":"当众拒绝成为合作展品","nextSceneId":"ring_conspiracy_006","resultText":"你选择“当众拒绝成为合作展品”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_refuse_duo","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["duo_exhibit_refused"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_005_let_her_answer","text":"不替她回答，让阿尔比娜开口","nextSceneId":"ring_conspiracy_006","resultText":"你选择“不替她回答，让阿尔比娜开口”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_let_her_answer","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["albina_answered_herself"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_006","chapter":6,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","voiceAssetId":"voice.scene.ring_conspiracy_006","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_006_stand_with_her","text":"站到她身侧，分担凝视","nextSceneId":"ring_conspiracy_007","resultText":"你选择“站到她身侧，分担凝视”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_stand_with_her","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":1,"artResonance":3},"setFlags":["gaze_shared"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_006_block_view","text":"挡在她和委托人之间","nextSceneId":"ring_conspiracy_007","resultText":"你选择“挡在她和委托人之间”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_block_view","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":3,"artResonance":2},"setFlags":["view_blocked"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_007","chapter":7,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","voiceAssetId":"voice.scene.ring_conspiracy_007","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_007_break_frame","text":"冲破画框","nextSceneId":"ring_conspiracy_008","resultText":"你选择“冲破画框”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_break_frame","effects":{"values":{"trust":3,"danger":3,"artResonance":3},"setFlags":["street_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_007_seize_frame","text":"把画框抢过来，反过来框住他","nextSceneId":"ring_conspiracy_008","resultText":"你选择“把画框抢过来，反过来框住他”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_seize_frame","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["frame_seized"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_008","chapter":8,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_8","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_8","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","voiceAssetId":"voice.scene.ring_conspiracy_008","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_008_refuse_testimony","text":"当面拒绝用她换取证词","nextSceneId":"ring_conspiracy_009","resultText":"你选择“当面拒绝用她换取证词”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_refuse_testimony","effects":{"values":{"affectionAlbina":2,"trust":5,"danger":2,"artResonance":2},"setFlags":["testimony_refused"],"unlockCg":["cg.lce_raid"]}},{"id":"conspiracy_008_hand_pen_to_her","text":"把笔交还给她，由她自己决定","nextSceneId":"ring_conspiracy_009","resultText":"你选择“把笔交还给她，由她自己决定”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_hand_pen_to_her","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pen_returned_to_albina"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_009","chapter":9,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","voiceAssetId":"voice.scene.ring_conspiracy_009","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_009_choose_present","text":"选现在的她，不挑那个环指版","nextSceneId":"ring_conspiracy_010","resultText":"你选择“选现在的她，不挑那个环指版”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_choose_present","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["present_albina_chosen"],"unlockCg":["cg.art_resonance"]}},{"id":"conspiracy_009_refuse_choice","text":"拒绝回答，让她自己挑镜子","nextSceneId":"ring_conspiracy_010","resultText":"你选择“拒绝回答，让她自己挑镜子”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_refuse_choice","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["mirror_choice_returned"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_010","chapter":10,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"卡利斯托","text":"卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","voiceAssetId":"voice.scene.ring_conspiracy_010","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_010_throw_badge","text":"把徽章扔回卡利斯托脸上","nextSceneId":"ring_conspiracy_011","resultText":"你选择“把徽章扔回卡利斯托脸上”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_throw_badge","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":3,"artResonance":2},"setFlags":["badge_thrown"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_010_keep_badge_unworn","text":"收下徽章，但谁都不许戴","nextSceneId":"ring_conspiracy_011","resultText":"你选择“收下徽章，但谁都不许戴”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_keep_badge_unworn","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":1,"artResonance":4},"setFlags":["badge_kept_unworn"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_011","chapter":11,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_11","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_11","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","voiceAssetId":"voice.scene.ring_conspiracy_011","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_011_rewrite_ending","text":"当众改写结局，让他们措手不及","nextSceneId":"ring_conspiracy_012","resultText":"你选择“当众改写结局，让他们措手不及”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_rewrite_ending","effects":{"values":{"trust":4,"danger":0,"artResonance":4},"relationshipVectors":{"reliance":3},"conflictMastery":{"blade":3},"setFlags":["ending_rewritten"],"unlockCg":["cg.ring_conspiracy_ending"],"resolveBattles":[{"battleId":"battle.ring.authorship_frame","outcome":"victory"}],"professionXp":{"ring_counterforger":6}}},{"id":"conspiracy_011_burn_film","text":"直接烧掉胶片，让剧本作废","nextSceneId":"ring_conspiracy_012","resultText":"你选择“直接烧掉胶片，让剧本作废”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_burn_film","effects":{"values":{"trust":3,"danger":7,"artResonance":3},"relationshipVectors":{"suspicion":3},"conflictMastery":{"blade":1},"setFlags":["film_burned"],"unlockCg":["cg.combat_transition_01"],"resolveBattles":[{"battleId":"battle.ring.authorship_frame","outcome":"setback"}],"professionXp":{"ring_counterforger":3}}}]},{"version":2,"id":"ring_conspiracy_012","chapter":12,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","voiceAssetId":"voice.scene.ring_conspiracy_012","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_012_end_tonight","text":"选择结束今晚的共谋","nextSceneId":"ring_conspiracy_013","resultText":"你选择“选择结束今晚的共谋”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_end_tonight","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":-2,"artResonance":3},"setFlags":["night_ended"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_012_keep_blade","text":"收下画刀，留给未来必要时再用","nextSceneId":"ring_conspiracy_013","resultText":"你选择“收下画刀，留给未来必要时再用”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_keep_blade","effects":{"values":{"affectionAlbina":1,"trust":4,"danger":1,"artResonance":4},"setFlags":["blade_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_013","chapter":13,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","voiceAssetId":"voice.scene.ring_conspiracy_013","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"conspiracy_013_hold_one_second","text":"认真握住那一秒，不多不少","nextSceneId":"ring_conspiracy_014","resultText":"你选择“认真握住那一秒，不多不少”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_hold_one_second","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["one_second_held"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"conspiracy_013_return_gently","text":"提前把它轻轻送回，不占有","nextSceneId":"ring_conspiracy_014","resultText":"你选择“提前把它轻轻送回，不占有”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_return_gently","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":4},"setFlags":["heartbeat_returned_early"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"ring_conspiracy_014","chapter":14,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","voiceAssetId":"voice.scene.ring_conspiracy_014","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_014_erase_from_catalog","text":"选择从环指目录里彻底抹去","nextSceneId":"ring_conspiracy_015","resultText":"你选择“选择从环指目录里彻底抹去”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_erase_from_catalog","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-2,"artResonance":3},"setFlags":["catalog_erased"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_014_keep_one_line","text":"只保留一行不被署名的记录","nextSceneId":"ring_conspiracy_015","resultText":"你选择“只保留一行不被署名的记录”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_keep_one_line","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["anonymous_line_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_015","chapter":15,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_15","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","voiceAssetId":"voice.scene.ring_conspiracy_015","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_route_final","text":"为环指共谋路线合上最后一卷胶片","nextSceneId":"ring_conspiracy_ending_gate","resultText":"你选择“为环指共谋路线合上最后一卷胶片”。环指共谋路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["ring_conspiracy_route_final"]}}]},{"version":2,"id":"ring_conspiracy_ending_gate","chapter":16,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"环指共谋的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.ring_conspiracy_ending_gate","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"ring_conspiracy_ending_true","resultText":"结局判定完成：环指共谋·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.true_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15},{"kind":"quest","questId":"quest.ring.counter_contract","status":"completed"},{"kind":"battle","battleId":"battle.ring.authorship_frame","outcome":"victory"},{"kind":"equipment","equipmentId":"equipment.ring.counter_signet"},{"kind":"outfit","outfitId":"outfit.albina.ring_disguise"},{"kind":"profession","professionId":"ring_counterforger","levelGte":2},{"kind":"relationship","key":"reliance","operator":"gte","value":7},{"kind":"worldbook","entryId":"albina_routes_endings_au_if","status":"seen"}]},"effects":{"setFlags":["ending_ring_conspiracy_true_qualified"]}},{"id":"ring_conspiracy_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"ring_conspiracy_ending_normal","resultText":"结局判定完成：环指共谋·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_ring_conspiracy_normal_qualified"]}},{"id":"ring_conspiracy_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"ring_conspiracy_ending_bad","resultText":"结局判定完成：环指共谋·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]},"effects":{"setFlags":["ending_ring_conspiracy_bad_qualified"]}}]},{"version":2,"id":"ring_conspiracy_ending_true","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_true","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"环指的目录里只剩一页无法归档的空白。阿尔比娜以自己的名字向你发出下一次邀请；你们不再是展品或棋子，而是彼此承认的共谋者。","voiceAssetId":"voice.scene.ring_conspiracy_ending_true","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]}}},{"version":2,"id":"ring_conspiracy_ending_normal","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_normal","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"你们离开了画廊，也留下了一条匿名记录作为制衡。危险没有消失，但契约已被改写；阿尔比娜把下一次会面留给更安全的夜晚。","voiceAssetId":"voice.scene.ring_conspiracy_ending_normal","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"ring_conspiracy_ending_bad","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-43 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_bad","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"追击停止时，代价已经写进彼此的沉默。你们逃出了装裱，却没能保住共同节奏；阿尔比娜独自带走那柄无锋画刀，没有约定再见。","voiceAssetId":"voice.scene.ring_conspiracy_ending_bad","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]}}}]'), i4 = {
  version: W6,
  projectId: Y6,
  initialSceneId: X6,
  routeEntrySceneIds: Q6,
  gameplay: e4,
  scenes: t4
}, a4 = Z({
  white_canvas: v().min(1),
  golden_bough_rebuild: v().min(1),
  ring_conspiracy: v().min(1)
}).strict(), o4 = Z({
  version: le(Zi),
  projectId: le("albina-galgame-card"),
  initialSceneId: v().min(1),
  routeEntrySceneIds: a4,
  gameplay: y6,
  scenes: Y(S6).min(1)
}).strict();
function es(e, t, i) {
  e.addIssue({
    code: "custom",
    path: t,
    message: `Unknown scene reference: ${i}`
  });
}
function n4(e) {
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
function ti(e, t, i, a) {
  e.addIssue({ code: "custom", path: t, message: `Unknown ${i} reference: ${a}` });
}
function Ca(e, t, i, a) {
  const o = e.kind === "quest" ? ["quest", e.questId, t.quests] : e.kind === "battle" ? ["battle", e.battleId, t.battles] : e.kind === "item" ? ["item", e.itemId, t.items] : e.kind === "equipment" ? ["equipment", e.equipmentId, t.equipment] : e.kind === "outfit" ? ["outfit", e.outfitId, t.outfits] : e.kind === "profession" ? ["profession", e.professionId, t.professions] : e.kind === "worldbook" ? ["worldbook", e.entryId, t.worldbook] : void 0;
  o && !o[2].has(o[1]) && ti(i, a, o[0], o[1]);
}
function s4(e, t, i, a) {
  [
    [e.startQuests, t.quests, "quest", "startQuests"],
    [e.completeQuests, t.quests, "quest", "completeQuests"],
    [e.grantItems, t.items, "item", "grantItems"],
    [e.equipItems, t.equipment, "equipment", "equipItems"],
    [e.unlockOutfits, t.outfits, "outfit", "unlockOutfits"]
  ].forEach(([n, s, r, c]) => n?.forEach((d, l) => {
    s.has(d) || ti(i, [...a, c, l], r, d);
  })), e.resolveBattles?.forEach(({ battleId: n }, s) => {
    t.battles.has(n) || ti(i, [...a, "resolveBattles", s, "battleId"], "battle", n);
  }), Object.keys(e.professionXp ?? {}).forEach((n) => {
    t.professions.has(n) || ti(i, [...a, "professionXp", n], "profession", n);
  }), e.activateOutfit && !t.outfits.has(e.activateOutfit) && ti(i, [...a, "activateOutfit"], "outfit", e.activateOutfit), e.activateProfession && !t.professions.has(e.activateProfession) && ti(i, [...a, "activateProfession"], "profession", e.activateProfession);
}
function r4(e, t, i, a) {
  e.eligibility.forEach((o, n) => Ca(o, t, i, [...a, "eligibility", n])), Object.keys(e.reward.professionXp ?? {}).forEach((o) => {
    t.professions.has(o) || ti(i, [...a, "reward", "professionXp", o], "profession", o);
  }), e.reward.grantItems?.forEach((o, n) => {
    t.items.has(o) || ti(i, [...a, "reward", "grantItems", n], "item", o);
  }), e.reward.unlockOutfits?.forEach((o, n) => {
    t.outfits.has(o) || ti(i, [...a, "reward", "unlockOutfits", n], "outfit", o);
  });
}
function c4(e, t) {
  const i = n4(e.gameplay);
  e.scenes.forEach((a, o) => a.choices.forEach((n, s) => {
    const r = ["scenes", o, "choices", s];
    s4(n.effects, i, t, [...r, "effects"]), n.availability?.allOf?.forEach((c, d) => Ca(c, i, t, [...r, "availability", "allOf", d])), n.availability?.anyOf?.forEach((c, d) => Ca(c, i, t, [...r, "availability", "anyOf", d]));
  })), e.scenes.forEach((a, o) => {
    a.ending?.eligibility.allOf?.forEach((n, s) => Ca(n, i, t, ["scenes", o, "ending", "eligibility", "allOf", s])), a.ending?.eligibility.anyOf?.forEach((n, s) => Ca(n, i, t, ["scenes", o, "ending", "eligibility", "anyOf", s]));
  }), e.gameplay.achievements.forEach((a, o) => {
    r4(a, i, t, ["gameplay", "achievements", o]);
  });
}
const _f = o4.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = new Map(e.scenes.map((s) => [s.id, s]));
  e.scenes.forEach((s, r) => {
    i.has(s.id) && t.addIssue({ code: "custom", path: ["scenes", r, "id"], message: `Duplicate scene id: ${s.id}` }), i.add(s.id), s.choices.forEach((c, d) => {
      a.has(c.id) && t.addIssue({ code: "custom", path: ["scenes", r, "choices", d, "id"], message: `Duplicate choice id: ${c.id}` }), a.add(c.id);
    });
  }), i.has(e.initialSceneId) || es(t, ["initialSceneId"], e.initialSceneId);
  const n = o.get(e.initialSceneId);
  n && n.provenance.scope !== "canon_recap" && t.addIssue({ code: "custom", path: ["initialSceneId"], message: "Initial scene must begin the canon recap" }), Object.entries(e.routeEntrySceneIds).forEach(([s, r]) => {
    i.has(r) || es(t, ["routeEntrySceneIds", s], r);
    const c = o.get(r);
    c && (c.route !== s || c.provenance.classification !== "AU_extension") && t.addIssue({ code: "custom", path: ["routeEntrySceneIds", s], message: `Route entry must be AU_extension content for ${s}` });
  }), e.scenes.forEach((s, r) => {
    s.choices.forEach((c, d) => {
      i.has(c.nextSceneId) || es(t, ["scenes", r, "choices", d, "nextSceneId"], c.nextSceneId);
    });
  }), c4(e, t);
});
function d4(e) {
  const t = gf.parse(e), i = new Map(t.assets.map((o) => [o.id, o])), a = new Set(t.portraits.map((o) => o.id));
  return _f.superRefine((o, n) => {
    o.scenes.forEach((s, r) => {
      [
        [s.backgroundAssetId, ["scenes", r, "backgroundAssetId"]],
        [s.cgAssetId, ["scenes", r, "cgAssetId"]]
      ].forEach(([u, p]) => u && Wi(n, i, u, "image", p)), [
        [s.videoAssetId, ["scenes", r, "videoAssetId"]],
        [s.desktopVideoAssetId, ["scenes", r, "desktopVideoAssetId"]]
      ].forEach(([u, p]) => u && Wi(n, i, u, "video", p)), [
        [s.voiceAssetId, ["scenes", r, "voiceAssetId"]],
        [s.bgmAssetId, ["scenes", r, "bgmAssetId"]]
      ].forEach(([u, p]) => u && Wi(n, i, u, "audio", p)), s.sfxAssetIds?.forEach((u, p) => Wi(n, i, u, "audio", ["scenes", r, "sfxAssetIds", p])), s.portraits.forEach((u, p) => {
        a.has(u.portraitAssetId) || Ds(n, ["scenes", r, "portraits", p, "portraitAssetId"], u.portraitAssetId);
      }), s.choices.forEach((u, p) => {
        u.resultVoiceAssetId && Wi(n, i, u.resultVoiceAssetId, "audio", ["scenes", r, "choices", p, "resultVoiceAssetId"]), u.effects.unlockCg?.forEach((f, g) => Wi(n, i, f, "image", ["scenes", r, "choices", p, "effects", "unlockCg", g]));
      });
    }), o.gameplay.outfits.forEach((s, r) => {
      a.has(s.portraitAssetId) || Ds(n, ["gameplay", "outfits", r, "portraitAssetId"], s.portraitAssetId);
    });
  });
}
function Ds(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
function Wi(e, t, i, a, o) {
  const n = t.get(i);
  if (!n) {
    Ds(e, o, i);
    return;
  }
  n.kind !== a && e.addIssue({ code: "custom", path: o, message: `Asset ${i} must be ${a}, found ${n.kind}` });
}
function u4(e, t) {
  return t === void 0 ? _f.parse(e) : d4(t).parse(e);
}
const l4 = Z({ intimacy: ne().finite(), reliance: ne().finite(), obsession: ne().finite(), suspicion: ne().finite() }).strict(), p4 = Z({ composure: ne().finite(), materials: ne().finite(), leverage: ne().finite(), exposure: ne().finite() }).strict(), f4 = Z({ blade: ne().finite(), boundary: ne().finite(), analysis: ne().finite(), resonance: ne().finite() }).strict(), h4 = Z({
  affectionAlbina: ne().finite(),
  trust: ne().finite(),
  danger: ne().finite(),
  artResonance: ne().finite(),
  relationshipVectors: l4,
  routeEconomy: p4,
  conflictMastery: f4
}).strict(), b4 = Z({
  name: v(),
  gender: v(),
  appearance: v(),
  background: v(),
  addressName: v(),
  boundaries: v(),
  routePreference: ht
}).strict(), m4 = Z({
  ownedIds: Y(v().min(1)),
  equipped: Z({
    weapon: v().min(1).optional(),
    armor: v().min(1).optional(),
    accessory: v().min(1).optional(),
    tool: v().min(1).optional()
  }).strict(),
  outfitIds: Y(v().min(1)),
  activeOutfitId: v()
}).strict(), g4 = Z({
  resolvedIds: Y(v().min(1)),
  outcomes: ho(v().min(1), Se(["victory", "setback"]))
}).strict(), _4 = Z({
  xp: ne().int().nonnegative(),
  level: ne().int().positive()
}).strict(), v4 = Z({
  activeId: v(),
  progress: ho(v().min(1), _4)
}).strict(), y4 = Z({ unlockedIds: Y(v().min(1)) }).strict(), w4 = Z({
  activeEntryIds: Y(v().min(1)),
  seenEntryIds: Y(v().min(1))
}).strict();
function Ps(e, t) {
  if (e === null || typeof e == "string" || typeof e == "boolean") return !0;
  if (typeof e == "number") return Number.isFinite(e);
  if (typeof e != "object" || t.has(e)) return !1;
  t.add(e);
  const i = Array.isArray(e) ? e.every((a) => Ps(a, t)) : (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null) && Object.values(e).every((a) => Ps(a, t));
  return t.delete(e), i;
}
const k4 = B5((e) => e !== null && typeof e == "object" && !Array.isArray(e) && Ps(e, /* @__PURE__ */ new WeakSet()), { message: "Log entries must contain only finite JSON values" }), ze = Y(k4), I4 = Z({
  history: ze,
  timeline: ze,
  routeActions: ze,
  routeActivity: ze,
  progressionUnlocks: ze,
  consequences: ze,
  routeEvents: ze,
  replayAnchors: ze,
  routeObjectives: ze,
  watchSignals: ze,
  narrativeIndex: ze,
  openingDrafts: ze,
  conflicts: ze,
  exchanges: ze,
  contacts: ze,
  achievements: ze,
  realityOverlays: ze,
  sceneBranches: ze,
  story: ze,
  storySummaries: ze,
  dynamicMemories: ze
}).strict(), mo = Z({
  version: le(Zi),
  projectId: le("albina-galgame-card"),
  saveId: v().min(1),
  createdAt: v().min(1),
  updatedAt: v().min(1),
  playerProfile: b4,
  route: ht.nullable(),
  chapter: ne().int().nonnegative(),
  sceneId: v().min(1),
  locationId: v(),
  values: h4,
  flags: ho(v().min(1), ba()),
  inventory: m4,
  quests: Z({
    activeNodeIds: Y(v().min(1)).default([]),
    completedNodeIds: Y(v().min(1)),
    currentMapNodeId: v(),
    progressLog: ze
  }).strict(),
  battles: g4.default({ resolvedIds: [], outcomes: {} }),
  professions: v4.default({ activeId: "", progress: {} }),
  achievements: y4.default({ unlockedIds: [] }),
  worldbook: w4.default({ activeEntryIds: [], seenEntryIds: [] }),
  unlockedCg: Y(v().min(1)),
  logs: I4
}).strict(), nu = "1970-01-01T00:00:00.000Z";
function A4() {
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
function dn() {
  return {
    version: Zi,
    projectId: "albina-galgame-card",
    saveId: "albina-v2-recovered",
    createdAt: nu,
    updatedAt: nu,
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
    logs: A4()
  };
}
function Rs(e) {
  return Array.isArray(e) ? e.map(Rs) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).sort(([t], [i]) => t < i ? -1 : t > i ? 1 : 0).map(([t, i]) => [t, Rs(i)])) : e;
}
function E4(e) {
  return JSON.stringify(Rs(mo.parse(e)), null, 2);
}
function vf(e) {
  return mo.parse(e);
}
const Sr = 10;
class to extends Error {
  constructor(t, i, a) {
    super(i, a), this.code = t, this.name = "SaveRecoveryError";
  }
  code;
  recoverable = !0;
}
function ut(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null ? e : void 0;
}
function xi(e, t, i) {
  const a = i === void 0 ? void 0 : { cause: i };
  return { ok: !1, error: new to(e, t, a) };
}
function T4(e) {
  try {
    const t = ut(e);
    return !t || t.schemaVersion !== Sr ? !1 : t.projectId === void 0 || t.projectId === "albina-galgame-card";
  } catch {
    return !1;
  }
}
function et(e, t) {
  return typeof e == "number" && Number.isFinite(e) ? e : t;
}
function gt(e, t) {
  return typeof e == "string" ? e : t;
}
function Ci(e, t = []) {
  return Array.isArray(e) ? [...new Set(e.filter((i) => typeof i == "string" && i.length > 0))] : [...t];
}
function js(e, t) {
  if (e === null || typeof e == "string" || typeof e == "boolean") return e;
  if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
  if (Array.isArray(e)) return e.map((n) => js(n, t)).filter((n) => n !== void 0);
  const i = ut(e);
  if (!i || t.has(i)) return;
  t.add(i);
  const a = Object.entries(i).sort(([n], [s]) => n.localeCompare(s)), o = {};
  for (const [n, s] of a) {
    const r = js(s, t);
    r !== void 0 && (o[n] = r);
  }
  return t.delete(i), o;
}
function S4(e) {
  return e != null && typeof e == "object" && !Array.isArray(e);
}
function Le(e) {
  return Array.isArray(e) ? e.map((t) => js(t, /* @__PURE__ */ new WeakSet())).filter(S4) : [];
}
function x4(e, t) {
  const i = ht.safeParse(e);
  return i.success ? i.data : typeof t == "string" && t.startsWith("golden_bough_") ? "golden_bough_rebuild" : typeof t == "string" && t.startsWith("ring_conspiracy_") ? "ring_conspiracy" : typeof t == "string" && t.startsWith("white_canvas_") ? "white_canvas" : null;
}
function O4(e, t, i) {
  const a = ut(e.playerProfile) ?? {}, o = ht.safeParse(a.routePreference);
  return {
    name: gt(a.name, i.name),
    gender: gt(a.gender, i.gender),
    appearance: gt(a.appearance, i.appearance),
    background: gt(a.background, i.background),
    addressName: gt(a.addressName, i.addressName),
    boundaries: gt(a.boundaries, i.boundaries),
    routePreference: o.success ? o.data : t ?? i.routePreference
  };
}
function V4(e, t) {
  const i = ut(e.affection) ?? {}, a = ut(e.relationshipVectors) ?? {}, o = ut(e.routeEconomy) ?? {}, n = ut(e.conflictMastery) ?? {};
  return {
    affectionAlbina: et(i.albina, t.affectionAlbina),
    trust: et(e.trust, t.trust),
    danger: et(e.danger, t.danger),
    artResonance: et(e.artResonance, t.artResonance),
    relationshipVectors: {
      intimacy: et(a.intimacy, t.relationshipVectors.intimacy),
      reliance: et(a.reliance, t.relationshipVectors.reliance),
      obsession: et(a.obsession, t.relationshipVectors.obsession),
      suspicion: et(a.suspicion, t.relationshipVectors.suspicion)
    },
    routeEconomy: {
      composure: et(o.composure, t.routeEconomy.composure),
      materials: et(o.materials, t.routeEconomy.materials),
      leverage: et(o.leverage, t.routeEconomy.leverage),
      exposure: et(o.exposure, t.routeEconomy.exposure)
    },
    conflictMastery: {
      blade: et(n.blade, t.conflictMastery.blade),
      boundary: et(n.boundary, t.conflictMastery.boundary),
      analysis: et(n.analysis, t.conflictMastery.analysis),
      resonance: et(n.resonance, t.conflictMastery.resonance)
    }
  };
}
function C4(e) {
  const t = ut(e) ?? {}, i = {};
  for (const a of ["weapon", "armor", "accessory", "tool"])
    typeof t[a] == "string" && t[a].length > 0 && (i[a] = t[a]);
  return i;
}
function N4(e, t) {
  const i = ut(e);
  return i ? Object.fromEntries(Object.entries(i).filter((a) => a[0].length > 0 && typeof a[1] == "boolean")) : { ...t };
}
function D4(e) {
  const t = Ci(e.clearedConflictIds);
  return { resolvedIds: t, outcomes: Object.fromEntries(t.map((i) => [i, "victory"])) };
}
function P4(e, t) {
  const i = ut(e) ?? {}, a = /* @__PURE__ */ new Set([...Object.keys(t), ...Object.keys(i)]);
  return Object.fromEntries([...a].map((o) => {
    const n = ut(i[o]) ?? {}, s = t[o] ?? { xp: 0, level: 1 };
    return [o, {
      xp: Math.max(0, Math.trunc(et(n.xp, s.xp))),
      level: Math.max(1, Math.trunc(et(n.level, s.level)))
    }];
  }));
}
function R4(e) {
  const t = ut(e) ?? {};
  return Array.isArray(t.records) ? Ci(t.records.map((i) => ut(i)?.id)) : [];
}
function j4(e) {
  return {
    history: Le(e.history),
    timeline: Le(e.timeline),
    routeActions: Le(e.routeActionLog),
    routeActivity: Le(e.routeActivityLog),
    progressionUnlocks: Le(e.progressionUnlockLog),
    consequences: Le(e.consequences),
    routeEvents: Le(e.routeEvents),
    replayAnchors: Le(e.replayAnchors),
    routeObjectives: Le(e.routeObjectives),
    watchSignals: Le(e.watchSignals),
    narrativeIndex: Le(e.narrativeIndex),
    openingDrafts: Le(e.openingDrafts),
    conflicts: Le(e.conflictResolutionLog),
    exchanges: Le(e.exchangeLog),
    contacts: Le(e.contactLog),
    achievements: Le(e.achievementLog),
    realityOverlays: Le(e.realityOverlayLog),
    sceneBranches: Le(e.sceneBranchLog),
    story: Le(e.storyLog),
    storySummaries: Le(e.storyLogSummaries),
    dynamicMemories: Le(e.dynamicMemories)
  };
}
function $4(e) {
  const t = dn();
  if (typeof e.schemaVersion == "number" && e.schemaVersion > Sr) return t;
  const i = x4(e.route, e.sceneId), a = typeof e.sceneId == "string" && e.sceneId.length > 0 ? e.sceneId : t.sceneId;
  return mo.parse({
    ...t,
    saveId: gt(e.saveId, t.saveId),
    createdAt: gt(e.createdAt, t.createdAt),
    updatedAt: gt(e.updatedAt, t.updatedAt),
    playerProfile: O4(e, i, t.playerProfile),
    route: i,
    chapter: typeof e.chapter == "number" && Number.isInteger(e.chapter) && e.chapter >= 0 ? e.chapter : t.chapter,
    sceneId: a,
    locationId: gt(e.locationId, t.locationId),
    values: V4(e, t.values),
    flags: N4(e.flags, t.flags),
    inventory: {
      ownedIds: Ci(e.inventoryItemIds),
      equipped: C4(e.equippedItemIds),
      outfitIds: Ci(e.wardrobeOutfitIds),
      activeOutfitId: gt(e.activeWardrobeOutfitId, "")
    },
    quests: {
      activeNodeIds: [],
      completedNodeIds: Ci(e.completedQuestNodeIds),
      currentMapNodeId: gt(e.currentMapNodeId, ""),
      progressLog: Le(e.questProgressLog)
    },
    battles: D4(e),
    professions: {
      activeId: gt(e.activeProfessionId, t.professions.activeId),
      progress: P4(e.professionProgress, t.professions.progress)
    },
    achievements: { unlockedIds: Ci(e.unlockedAchievementIds) },
    worldbook: { activeEntryIds: [], seenEntryIds: R4(e.worldbookMemory) },
    unlockedCg: Ci(e.unlockedCg, t.unlockedCg),
    logs: j4(e)
  });
}
function U4(e) {
  try {
    const t = mo.safeParse(e);
    if (t.success) return t.data;
    const i = ut(e);
    return i ? $4(i) : dn();
  } catch {
    return dn();
  }
}
function Pn(e) {
  try {
    const t = mo.safeParse(e);
    if (t.success) return { ok: !0, save: t.data, source: "v2" };
    const i = ut(e);
    return i ? typeof i.version == "number" && i.version > 2 ? xi("unsupported-version", `SaveV${i.version} is newer than this runtime.`) : typeof i.schemaVersion == "number" && i.schemaVersion > Sr ? xi("unsupported-version", `Legacy schema ${i.schemaVersion} is newer than v1.0.44.`) : i.version === 2 ? xi("invalid-v2", "The SaveV2 payload is damaged or incomplete.") : T4(i) ? { ok: !0, save: U4(i), source: "v1.0.44" } : xi("unknown-format", "The value is neither SaveV2 nor a recognized v1.0.44 save.") : xi("unknown-format", "The value is not an Albina save object.");
  } catch (t) {
    return xi("corrupt-input", "The save payload could not be inspected safely.", t);
  }
}
function xr(e) {
  try {
    return Pn(JSON.parse(e));
  } catch (t) {
    return xi("invalid-json", "The imported save is not valid JSON.", t);
  }
}
const F4 = ["affectionAlbina", "trust", "danger", "artResonance"], M4 = ["composure", "materials", "leverage", "exposure"];
function un(e, t = 0, i = 100) {
  return Math.max(t, Math.min(i, e));
}
function gi(e, t) {
  t.forEach((i) => {
    e.includes(i) || e.push(i);
  });
}
function yf(e, t) {
  t && (F4.forEach((i) => {
    const a = t[i];
    a !== void 0 && (e.values[i] = un(e.values[i] + a));
  }), M4.forEach((i) => {
    const a = t[i];
    if (a === void 0) return;
    const o = i === "materials" ? 12 : 100;
    e.values.routeEconomy[i] = un(e.values.routeEconomy[i] + a, 0, o);
  }));
}
function wf(e, t, i) {
  i && e.gameplay.relationshipTracks.forEach((a) => {
    const o = i[a.id];
    o !== void 0 && (t.values.relationshipVectors[a.id] = un(t.values.relationshipVectors[a.id] + o, a.minimum, a.maximum));
  });
}
function z4(e, t) {
  if (t)
    for (const i of ["blade", "boundary", "analysis", "resonance"]) {
      const a = t[i];
      a !== void 0 && (e.values.conflictMastery[i] = un(e.values.conflictMastery[i] + a, 0, 99));
    }
}
function L4(e, t) {
  t.setFlags?.forEach((i) => {
    e.flags[i] = !0;
  }), t.clearFlags?.forEach((i) => {
    e.flags[i] = !1;
  });
}
function q4(e, t, i) {
  t.forEach((a) => {
    e.quests.completedNodeIds.includes(a) || e.quests.activeNodeIds.includes(a) || (e.quests.activeNodeIds.push(a), e.quests.currentMapNodeId = a, e.quests.progressLog.push({ questId: a, status: "active", at: i }));
  });
}
function Z4(e, t, i) {
  t.forEach((a) => {
    e.quests.activeNodeIds = e.quests.activeNodeIds.filter((o) => o !== a), e.quests.completedNodeIds.includes(a) || (e.quests.completedNodeIds.push(a), e.quests.progressLog.push({ questId: a, status: "completed", at: i })), e.quests.currentMapNodeId = a;
  });
}
function H4(e, t) {
  return e.reduce((i, a, o) => t >= a ? o + 1 : i, 1);
}
function kf(e, t, i) {
  i && Object.entries(i).forEach(([a, o]) => {
    const n = e.gameplay.professions.find(({ id: c }) => c === a);
    if (!n) throw new Error(`Unknown profession: ${a}`);
    const s = t.professions.progress[a] ?? { xp: 0 }, r = Math.max(0, s.xp + o);
    t.professions.progress[a] = { xp: r, level: H4(n.xpThresholds, r) };
  });
}
function Or(e, t) {
  return t === void 0 || e.route === t;
}
function If(e, t, i, a) {
  const o = e.gameplay.equipment.find(({ id: n }) => n === i);
  if (!o) throw new Error(`Unknown equipment: ${i}`);
  if (!Or(t, o.route)) throw new Error(`Equipment is unavailable on route: ${i}`);
  if (!t.inventory.ownedIds.includes(o.itemId)) throw new Error(`Equipment item is not owned: ${o.itemId}`);
  t.inventory.equipped[o.slot] = o.id, t.logs.progressionUnlocks.push({ kind: "equipment", id: o.id, at: a });
}
function Af(e, t, i, a) {
  const o = e.gameplay.outfits.find(({ id: n }) => n === i);
  if (!o) throw new Error(`Unknown outfit: ${i}`);
  if (!Or(t, o.route)) throw new Error(`Outfit is unavailable on route: ${i}`);
  if (!t.inventory.outfitIds.includes(o.id)) throw new Error(`Outfit is not unlocked: ${i}`);
  t.inventory.activeOutfitId = o.id, t.logs.progressionUnlocks.push({ kind: "outfit-active", id: o.id, at: a });
}
function Ef(e, t, i, a) {
  const o = e.gameplay.professions.find(({ id: n }) => n === i);
  if (!o) throw new Error(`Unknown profession: ${i}`);
  if (!Or(t, o.route)) throw new Error(`Profession is unavailable on route: ${i}`);
  t.professions.activeId = o.id, t.professions.progress[o.id] ??= { xp: 0, level: 1 }, t.logs.progressionUnlocks.push({ kind: "profession-active", id: o.id, at: a });
}
function B4(e, t, i, a) {
  gi(t.inventory.ownedIds, i.grantItems ?? []), gi(t.inventory.outfitIds, i.unlockOutfits ?? []), i.equipItems?.forEach((o) => If(e, t, o, a)), i.activateOutfit && Af(e, t, i.activateOutfit, a);
}
function J4(e, t, i) {
  t.resolveBattles?.forEach(({ battleId: a, outcome: o }) => {
    gi(e.battles.resolvedIds, [a]), e.battles.outcomes[a] = o, e.logs.conflicts.push({ battleId: a, outcome: o, at: i });
  });
}
function K4(e, t) {
  gi(e.unlockedCg, t.unlockCg ?? []), gi(e.inventory.ownedIds, t.grantItems ?? []);
}
function G4(e, t, i, a) {
  i.route && (t.route = i.route), yf(t, i.values), wf(e, t, i.relationshipVectors), z4(t, i.conflictMastery), L4(t, i), K4(t, i), q4(t, i.startQuests ?? [], a), Z4(t, i.completeQuests ?? [], a), kf(e, t, i.professionXp), i.activateProfession && Ef(e, t, i.activateProfession, a), B4(e, t, i, a), J4(t, i, a);
}
function W4(e, t, i) {
  return Object.values(t.inventory.equipped).reduce((a, o) => {
    const n = e.gameplay.equipment.find(({ id: s }) => s === o);
    return a + (n?.modifiers[i] ?? 0);
  }, 0);
}
function Y4(e, t, i) {
  const a = e.gameplay.professions.find(({ id: n }) => n === t.professions.activeId);
  if (!a) return 0;
  const o = t.professions.progress[a.id]?.level ?? 1;
  return (a.modifiersPerLevel[i] ?? 0) * o;
}
function Na(e, t, i) {
  return t.values[i] + W4(e, t, i) + Y4(e, t, i);
}
function su(e, t) {
  return t.operator === "gte" ? e >= t.value : t.operator === "lte" ? e <= t.value : e === t.value;
}
function $s(e, t, i) {
  return i.kind === "value" ? su(Na(e, t, i.key), i) : i.kind === "relationship" ? su(t.values.relationshipVectors[i.key], i) : i.kind === "flag" ? (t.flags[i.flag] ?? !1) === i.equals : i.kind === "quest" ? (i.status === "active" ? t.quests.activeNodeIds : t.quests.completedNodeIds).includes(i.questId) : i.kind === "battle" ? t.battles.resolvedIds.includes(i.battleId) && (!i.outcome || t.battles.outcomes[i.battleId] === i.outcome) : i.kind === "item" ? t.inventory.ownedIds.includes(i.itemId) : i.kind === "equipment" ? Object.values(t.inventory.equipped).includes(i.equipmentId) : i.kind === "outfit" ? t.inventory.outfitIds.includes(i.outfitId) : i.kind === "profession" ? (t.professions.progress[i.professionId]?.level ?? 0) >= i.levelGte : (i.status === "active" ? t.worldbook.activeEntryIds : t.worldbook.seenEntryIds).includes(i.entryId);
}
function ts(e, t, i) {
  const a = new Set(i.provenance.claimIds), o = e.gameplay.worldbookEntries.filter((n) => n.constant || n.claimIds.some((s) => a.has(s))).map(({ id: n }) => n);
  t.worldbook.activeEntryIds = o, gi(t.worldbook.seenEntryIds, o);
}
function X4(e, t, i) {
  return i.route && t.route !== i.route ? !1 : i.eligibility.every((a) => $s(e, t, a));
}
function Q4(e, t, i, a) {
  const o = i.reward;
  yf(t, o.values), wf(e, t, o.relationshipVectors), kf(e, t, o.professionXp), o.setFlags?.forEach((n) => {
    t.flags[n] = !0;
  }), gi(t.inventory.ownedIds, o.grantItems ?? []), gi(t.inventory.outfitIds, o.unlockOutfits ?? []), t.achievements.unlockedIds.push(i.id), t.logs.achievements.push({ achievementId: i.id, at: a });
}
function is(e, t, i) {
  for (const a of e.gameplay.achievements)
    t.achievements.unlockedIds.includes(a.id) || X4(e, t, a) && Q4(e, t, a, i);
}
function e9(e, t) {
  if (t.inventory.outfitIds.includes(t.inventory.activeOutfitId))
    return e.gameplay.outfits.find(({ id: i }) => i === t.inventory.activeOutfitId)?.portraitAssetId;
}
function t9(e, t, i) {
  if (!e) return !0;
  const a = e.allOf?.every((n) => $s(i, t, n)) ?? !0, o = e.anyOf?.some((n) => $s(i, t, n)) ?? !0;
  return e.fallback === !0 || a && o;
}
class ru {
  constructor(t, i = {}) {
    if (this.script = t, this.sceneById = new Map(t.scenes.map((a) => [a.id, a])), this.now = i.now ?? (() => (/* @__PURE__ */ new Date()).toISOString()), this.save = structuredClone(i.save ?? dn()), !i.save || !this.sceneById.has(this.save.sceneId)) {
      const a = this.sceneById.get(t.initialSceneId);
      if (!a) throw new Error(`Unknown initial scene: ${t.initialSceneId}`);
      this.save.sceneId = a.id, this.save.chapter = a.chapter, this.save.locationId = a.locationId, a.route !== null && (this.save.route = a.route);
    }
    ts(this.script, this.save, this.scene), is(this.script, this.save, this.now());
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
    return this.scene.choices.filter((t) => t9(t.availability, this.save, this.script));
  }
  get effectiveValues() {
    return {
      affectionAlbina: Na(this.script, this.save, "affectionAlbina"),
      trust: Na(this.script, this.save, "trust"),
      danger: Na(this.script, this.save, "danger"),
      artResonance: Na(this.script, this.save, "artResonance")
    };
  }
  get outfitPortraitAssetId() {
    return e9(this.script, this.save);
  }
  replaceSave(t) {
    if (!this.sceneById.has(t.sceneId)) throw new Error(`Save references unknown scene: ${t.sceneId}`);
    this.save = structuredClone(t), ts(this.script, this.save, this.scene), is(this.script, this.save, this.now());
  }
  choose(t) {
    const i = this.choices.find((n) => n.id === t);
    if (!i) throw new Error(`Choice is unavailable: ${t}`);
    const a = this.now();
    G4(this.script, this.save, i.effects, a);
    const o = this.sceneById.get(i.nextSceneId);
    if (!o) throw new Error(`Choice references unknown scene: ${i.nextSceneId}`);
    return this.save.sceneId = o.id, this.save.chapter = o.chapter, o.route !== null && (this.save.route = o.route), this.save.locationId = o.locationId, this.save.updatedAt = a, this.save.logs.sceneBranches.push({ choiceId: t, sceneId: o.id, at: this.save.updatedAt }), ts(this.script, this.save, o), is(this.script, this.save, a), { choice: i, ...i.resultText ? { resultText: i.resultText } : {}, scene: o };
  }
  equip(t) {
    const i = this.now();
    If(this.script, this.save, t, i), this.save.updatedAt = i;
  }
  wearOutfit(t) {
    const i = this.now();
    Af(this.script, this.save, t, i), this.save.updatedAt = i;
  }
  selectProfession(t) {
    const i = this.now();
    Ef(this.script, this.save, t, i), this.save.updatedAt = i;
  }
  interpolate(t) {
    return t.replaceAll("{{user}}", this.save.playerProfile.name || "你");
  }
}
class i9 {
  constructor(t, i, a, o = (n, s) => fetch(n, s)) {
    this.manifest = t, this.storage = i, this.baseUrl = a, this.fetchAsset = o;
  }
  manifest;
  storage;
  baseUrl;
  fetchAsset;
  inflight = /* @__PURE__ */ new Map();
  remoteUrl(t) {
    return Tr(this.manifest, t, this.baseUrl);
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
    const i = this.manifest.portraits.find((n) => n.id === t);
    if (!i) return;
    const a = await this.storage.getAssetUrl(t);
    if (a) return a;
    const o = `${this.baseUrl.replace(/\/$/u, "")}/${this.manifest.basePath}/${i.path.split("/").map(encodeURIComponent).join("/")}`;
    try {
      const n = await this.fetchAsset(o, { credentials: "omit", mode: "cors" });
      return n.ok ? (await this.storage.cacheAsset(t, await n.blob()), await this.storage.getAssetUrl(t) ?? o) : o;
    } catch {
      return o;
    }
  }
  singleFlight(t, i) {
    const a = this.inflight.get(t);
    if (a) return a;
    const n = i().then(
      (s) => (this.inflight.get(t) === n && this.inflight.delete(t), s),
      (s) => {
        throw this.inflight.get(t) === n && this.inflight.delete(t), s;
      }
    );
    return this.inflight.set(t, n), n;
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
const Vr = "albina-v2-save", Us = "albinaSaveV2", a9 = "albinaGalgameCardGameSaveV1";
function as() {
  return typeof window > "u" ? void 0 : window.TavernHelper;
}
function o9(e) {
  return typeof e == "string" ? xr(e) : Pn(e);
}
function n9() {
  try {
    const e = typeof localStorage > "u" ? null : localStorage.getItem(Vr);
    return e === null ? {} : { result: xr(e) };
  } catch (e) {
    return { error: new to("storage-read-failed", "Local save storage could not be read.", { cause: e }) };
  }
}
async function cu(e, t) {
  try {
    await e?.setVariables?.({ [Us]: t }, { type: "chat" });
  } catch (i) {
    console.warn("[albina-save] unable to persist migrated Tavern Helper save", i);
  }
  try {
    typeof localStorage < "u" && localStorage.setItem(Vr, JSON.stringify(t));
  } catch (i) {
    console.warn("[albina-save] unable to persist migrated local save", i);
  }
}
function s9(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
}
function r9() {
  return {
    getChatId: () => as()?.getChatId?.() ?? "standalone",
    async loadSave() {
      const e = as(), t = [];
      if (e?.getVariables)
        try {
          const a = await e.getVariables({ type: "chat" });
          for (const o of [Us, a9]) {
            const n = s9(a, o);
            if (n === void 0) continue;
            const s = o9(n);
            if (!s.ok) {
              t.push(s.error);
              continue;
            }
            return s.source === "v1.0.44" && await cu(e, s.save), s.save;
          }
        } catch (a) {
          t.push(new to("storage-read-failed", "Tavern Helper save variables could not be read.", { cause: a }));
        }
      const i = n9();
      if (i.error && t.push(i.error), i.result?.ok)
        return await cu(e, i.result.save), i.result.save;
      if (i.result && !i.result.ok && t.push(i.result.error), t.length > 0) throw t[0];
    },
    async saveSave(e) {
      const t = vf(e), i = as();
      i?.setVariables && await i.setVariables({ [Us]: t }, { type: "chat" }), typeof localStorage < "u" && localStorage.setItem(Vr, JSON.stringify(t));
    },
    subscribe(e, t) {
      if (typeof window > "u") return () => {
      };
      const i = `albina:${e}`;
      return window.addEventListener(i, t), () => window.removeEventListener(i, t);
    }
  };
}
function c9(e) {
  return new Audio(e);
}
function Gt(e) {
  e && (e.pause(), e.currentTime = 0, e.src = "");
}
class d9 {
  constructor(t = c9) {
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
    const a = this.lifecycleGeneration, o = ++this.bgmGeneration, n = this.takePreviousBgm(), s = this.createAudio(t);
    s.src = t, s.loop = !0, s.volume = i > 0 ? 0 : this.bgmVolume(), this.bgm = s, this.pendingBgmPrevious = n;
    const r = () => this.isCurrentBgm(s, a, o);
    return await this.tryPlay(s, r) ? (this.pendingBgmPrevious = void 0, !n || i <= 0 ? (Gt(n), s.volume = this.bgmVolume(), !0) : (await this.crossfade(n, s, i), r())) : (r(), !1);
  }
  enqueueVoice(t) {
    const i = new Promise((a) => this.voiceQueue.push({ source: t, resolve: a }));
    return this.playNextVoice(), i;
  }
  async playSfx(t) {
    const i = this.createAudio(t);
    i.src = t, i.loop = !1;
    const a = () => {
      i.removeEventListener("ended", a), this.sfx.delete(i), Gt(i);
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
      return await t.play(), this.isCurrentBlocked(t, i) ? (this.blocked = void 0, t === this.bgm && this.pendingBgmPrevious && (Gt(this.pendingBgmPrevious), this.pendingBgmPrevious = void 0, t.volume = this.bgmVolume()), !0) : !1;
    } catch {
      return !1;
    }
  }
  stopAll() {
    this.lifecycleGeneration += 1, this.bgmGeneration += 1, this.cancelFade(), this.finishVoice(!1), this.voiceQueue.splice(0).forEach((i) => i.resolve(!1));
    const t = /* @__PURE__ */ new Set([this.bgm, this.blocked, this.pendingBgmPrevious, this.fadingOut]);
    this.sfx.forEach((i) => t.add(i)), t.forEach(Gt), this.sfx.clear(), this.bgm = void 0, this.blocked = void 0, this.pendingBgmPrevious = void 0, this.fadingOut = void 0;
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
    i && this.voiceEnded && i.removeEventListener("ended", this.voiceEnded), Gt(i), this.blocked === i && (this.blocked = void 0), this.voice = void 0, this.voiceEnded = void 0;
    const a = this.activeVoiceJob;
    this.activeVoiceJob = void 0, i && this.bgm && (this.bgm.volume = 1), a?.resolve(t);
  }
  crossfade(t, i, a) {
    const n = a / 10, s = t.volume;
    let r = 0;
    return new Promise((c) => {
      this.fadingOut = t, this.fadeFinish = c;
      const d = () => {
        r += 1, t.volume = Math.max(0, s * (1 - r / 10)), i.volume = this.bgmVolume() * Math.min(1, r / 10), r >= 10 ? (Gt(t), this.fadingOut = void 0, this.fadeTimer = void 0, this.fadeFinish = void 0, c()) : this.fadeTimer = setTimeout(d, n);
      };
      this.fadeTimer = setTimeout(d, n);
    });
  }
  cancelFade() {
    this.fadeTimer !== void 0 && clearTimeout(this.fadeTimer), this.fadeTimer = void 0, Gt(this.fadingOut), this.fadingOut = void 0, this.fadeFinish?.(), this.fadeFinish = void 0;
  }
  takePreviousBgm() {
    if (this.pendingBgmPrevious) {
      const t = this.pendingBgmPrevious;
      return this.pendingBgmPrevious = void 0, this.blocked === this.bgm && (this.blocked = void 0), Gt(this.bgm), t;
    }
    if (this.blocked === this.bgm) {
      this.blocked = void 0, Gt(this.bgm);
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
class u9 {
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
function l9() {
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
class p9 {
  constructor(t, i, a = "") {
    this.manifest = t, this.baseUrl = a, this.environment = i ?? l9();
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
    const a = this.lifecycleGeneration, o = this.nextCanvasGeneration(i), n = this.findPortrait(t), s = i.getContext("2d");
    if (!s) throw new Error("Portrait canvas does not expose a 2D context");
    if (n.animation.kind === "static" || this.environment.reducedMotion()) {
      await this.drawStatic(n, s, i, a, o) && this.isCurrent(i, a, o) && this.playbacks.add({ canvas: i });
      return;
    }
    await this.playStrip(n, s, i, a, o);
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
  async drawStatic(t, i, a, o, n) {
    const s = t.fallbackAssetId ? this.manifest.assets.find((c) => c.id === t.fallbackAssetId) : void 0;
    let r;
    try {
      const c = await this.urlResolver?.(s?.id ?? t.id);
      r = await this.environment.loadImage(c ?? this.assetUrl(s?.path ?? t.path));
    } catch {
      return !1;
    }
    if (!this.isCurrent(a, o, n)) return !1;
    if (i.clearRect(0, 0, a.width, a.height), !s && t.animation.kind === "strip") {
      const c = t.animation;
      i.drawImage(r, 0, 0, c.frameWidth, c.frameHeight, 0, 0, a.width, a.height);
    } else i.drawImage(r, 0, 0, a.width, a.height);
    return !0;
  }
  async playStrip(t, i, a, o, n) {
    if (t.animation.kind !== "strip") return;
    const s = t.animation;
    let r;
    try {
      const u = await this.urlResolver?.(t.id);
      r = await this.environment.loadImage(u ?? this.assetUrl(t.path));
    } catch {
      if (!t.fallbackAssetId) return;
      await this.drawStatic(t, i, a, o, n) && this.isCurrent(a, o, n) && this.playbacks.add({ canvas: a });
      return;
    }
    if (!this.isCurrent(a, o, n)) return;
    const c = { canvas: a };
    this.playbacks.add(c);
    let d;
    const l = (u) => {
      if (!this.isCurrent(a, o, n)) return;
      d ??= u;
      const p = u - d, f = Math.floor(p / (1e3 / s.fps)) % s.frameCount;
      i.clearRect(0, 0, a.width, a.height), i.drawImage(r, f * s.frameWidth, 0, s.frameWidth, s.frameHeight, 0, 0, a.width, a.height), c.frameHandle = this.environment.requestFrame(l);
    };
    c.frameHandle = this.environment.requestFrame(l);
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
const So = "queue";
class f9 {
  constructor(t) {
    this.storage = t;
  }
  storage;
  operationTail = Promise.resolve();
  async enqueue(t) {
    await this.runExclusive(async () => {
      const i = await this.readQueue();
      i.push(t), await this.storage.setValue("specialCg", So, i);
    });
  }
  async peek() {
    return this.runExclusive(async () => (await this.readQueue())[0]);
  }
  async dequeue() {
    return this.runExclusive(async () => {
      const t = await this.readQueue(), i = t.shift();
      return await this.storage.setValue("specialCg", So, t), i;
    });
  }
  async clear() {
    await this.runExclusive(() => this.storage.deleteValue("specialCg", So));
  }
  async readQueue() {
    return await this.storage.getValue("specialCg", So) ?? [];
  }
  runExclusive(t) {
    const i = this.operationTail.then(t, t);
    return this.operationTail = i.then(() => {
    }, () => {
    }), i;
  }
}
const h9 = ["assets", "gallery", "specialCg", "saves"];
class b9 {
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
class m9 {
  constructor(t = new v9(), i = new b9()) {
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
function g9(e) {
  if (e === null || typeof e != "object" || Array.isArray(e)) return;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null ? e : void 0;
}
function _9() {
  return new Blob([], { type: "application/octet-stream" });
}
function xo(e) {
  return new Promise((t, i) => {
    e.onsuccess = () => t(e.result), e.onerror = () => i(e.error ?? new Error("IndexedDB request failed"));
  });
}
class v9 {
  constructor(t = indexedDB, i = "albina-runtime-v2") {
    this.factory = t, this.databaseName = i;
  }
  factory;
  databaseName;
  database;
  async get(t, i) {
    const a = await this.open();
    return xo(a.transaction(t, "readonly").objectStore(t).get(i));
  }
  async put(t, i, a) {
    const o = await this.open();
    await xo(o.transaction(t, "readwrite").objectStore(t).put(a, i));
  }
  async delete(t, i) {
    const a = await this.open();
    await xo(a.transaction(t, "readwrite").objectStore(t).delete(i));
  }
  async keys(t) {
    const i = await this.open();
    return (await xo(i.transaction(t, "readonly").objectStore(t).getAllKeys())).map(String);
  }
  close() {
    this.database?.then((t) => t.close(), () => {
    }), this.database = void 0;
  }
  open() {
    return this.database ??= new Promise((t, i) => {
      const a = this.factory.open(this.databaseName, 1);
      a.onupgradeneeded = () => {
        for (const o of h9)
          a.result.objectStoreNames.contains(o) || a.result.createObjectStore(o);
      }, a.onsuccess = () => t(a.result), a.onerror = () => i(a.error ?? new Error("Unable to open IndexedDB"));
    }), this.database;
  }
}
function y9() {
  if (typeof URL.createObjectURL == "function")
    return { createObjectURL: (e) => URL.createObjectURL(e), revokeObjectURL: (e) => URL.revokeObjectURL(e) };
}
class w9 {
  constructor(t = new m9(), i) {
    this.backend = t, this.urlApi = i ?? y9();
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
    const o = this.objectUrlGeneration, n = this.createAssetUrl(t, o);
    this.pendingObjectUrls.set(t, n);
    const s = () => {
      this.pendingObjectUrls.get(t) === n && this.pendingObjectUrls.delete(t);
    };
    return n.then(s, s), n;
  }
  async saveSnapshot(t, i) {
    const a = vf(t);
    await this.backend.put("saves", a.saveId, { save: a, thumbnail: i });
  }
  async loadSnapshot(t) {
    const i = await this.backend.get("saves", t);
    if (i === void 0) return;
    const a = g9(i), o = a && Object.prototype.hasOwnProperty.call(a, "save"), n = o ? a.save : i, s = Pn(n);
    if (!s.ok) throw s.error;
    const r = o && a.thumbnail instanceof Blob ? a.thumbnail : _9();
    return (s.source === "v1.0.44" || !o || !(a.thumbnail instanceof Blob)) && await this.backend.put("saves", t, { save: s.save, thumbnail: r }), { save: s.save, thumbnail: r };
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
    const n = this.urlApi.createObjectURL(a);
    if (i !== this.objectUrlGeneration) {
      this.urlApi.revokeObjectURL(n);
      return;
    }
    return this.objectUrls.set(t, n), n;
  }
}
class k9 {
  active;
  write(t, i, a = 24) {
    return this.cancel(), t.length === 0 ? (i(""), Promise.resolve("")) : new Promise((o) => {
      let n = 0;
      const s = { text: t, sink: i, visible: "", resolve: o }, r = () => {
        s.visible = t.slice(0, n + 1), n += 1, i(s.visible), n >= t.length ? this.settle(s, t) : s.timer = setTimeout(r, Math.max(0, a));
      };
      this.active = s, s.timer = setTimeout(r, Math.max(0, a));
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
class I9 {
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
    const i = Pn(t);
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
class A9 {
  host;
  audio;
  portraits;
  gallery;
  storage;
  specialCg;
  typewriter = new k9();
  subscriptions = [];
  mounted = !1;
  constructor(t) {
    this.host = new I9(t.host), this.audio = new d9(t.audioFactory), this.storage = new w9(t.storageBackend, t.objectUrls), this.portraits = new p9(t.manifest, t.portraits, t.assetBaseUrl), this.gallery = new u9(this.storage), this.specialCg = new f9(this.storage);
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
function E9(e) {
  return new A9(e);
}
function Tf(e) {
  return new Promise((t) => {
    try {
      e.toBlob((i) => t(i ?? void 0), "image/jpeg", 0.82);
    } catch {
      t(void 0);
    }
  });
}
async function T9() {
  const e = document.createElement("canvas");
  e.width = 480, e.height = 270;
  const t = e.getContext("2d");
  if (!t) return new Blob(["thumbnail unavailable"], { type: "text/plain" });
  const i = t.createLinearGradient(0, 0, e.width, e.height);
  return i.addColorStop(0, "#050812"), i.addColorStop(1, "#3a2b13"), t.fillStyle = i, t.fillRect(0, 0, e.width, e.height), t.fillStyle = "#e2c46e", t.font = "28px serif", t.fillText("ALBINA", 28, 54), await Tf(e) ?? new Blob(["thumbnail unavailable"], { type: "text/plain" });
}
async function du(e = document) {
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
    const s = i.createLinearGradient(0, 0, t.width, t.height);
    s.addColorStop(0, "#050812"), s.addColorStop(1, "#3a2b13"), i.fillStyle = s, i.fillRect(0, 0, t.width, t.height), i.fillStyle = "#e2c46e", i.font = "28px serif", i.fillText("ALBINA", 28, 54);
  }
  const n = await Tf(t);
  return { blob: n ?? await T9(), capturedMedia: !!(n && o) };
}
function Sf(e, t) {
  if (!(!t.videoEnabled || t.reducedMotion))
    return t.desktop && e.desktopVideoAssetId ? e.desktopVideoAssetId : e.videoAssetId;
}
function S9(e, t, i, a = (o) => Tr(t, o, i.baseUrl)) {
  const o = e.cgAssetId ?? e.backgroundAssetId, n = a(o), s = a(e.backgroundAssetId), r = Sf(e, i), c = r ? a(r) : void 0;
  return { ...s ? { backgroundUrl: s } : {}, ...n ? { fallbackUrl: n } : {}, ...c ? { videoUrl: c } : {} };
}
const Oi = F6(G6), Ma = u4(i4, Oi), uu = new Map(Ma.scenes.map((e) => [e.id, e])), x9 = new Set(Ma.gameplay.outfits.map((e) => e.portraitAssetId)), O9 = /* @__PURE__ */ new Set(["portrait.albina.normal", ...x9]);
function V9() {
  return new URL(
    /* @vite-ignore */
    "../",
    import.meta.url
  ).href;
}
const C9 = /* @__PURE__ */ c1("albina-game", () => {
  const e = V9(), t = Zt(E9({ manifest: Oi, host: r9(), assetBaseUrl: e })), i = Zt(new i9(Oi, t.storage, e));
  t.portraits.setUrlResolver(async (x) => Oi.portraits.some((J) => J.id === x) ? i.cachePortrait(x) : i.cache(x));
  const a = /* @__PURE__ */ lh(new ru(Ma)), o = /* @__PURE__ */ Ve("title"), n = /* @__PURE__ */ Ve(""), s = /* @__PURE__ */ Ve(), r = /* @__PURE__ */ Ve(!1), c = /* @__PURE__ */ Ve(!1), d = /* @__PURE__ */ Ve(!0), l = /* @__PURE__ */ Ve(!1), u = /* @__PURE__ */ Ve(!1), p = /* @__PURE__ */ Ve([]), f = /* @__PURE__ */ Ve({}), g = /* @__PURE__ */ Ve({}), I = /* @__PURE__ */ Ve([]), k = /* @__PURE__ */ Ve(), N = /* @__PURE__ */ Ve(), H = /* @__PURE__ */ new Set(), F = typeof matchMedia == "function" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0, X = /* @__PURE__ */ Ve(F?.matches ?? !1), R = /* @__PURE__ */ Ve(typeof innerWidth == "number" ? innerWidth > 800 : !0);
  let ue, K, ke;
  const he = (x) => {
    X.value = x.matches, x.matches ? Q(C.value.cgAssetId ?? C.value.backgroundAssetId) : De(C.value);
  }, L = () => {
    R.value = innerWidth > 800, De(C.value);
  };
  F?.addEventListener("change", he), typeof window < "u" && (window.addEventListener("resize", L), window.addEventListener("orientationchange", L));
  const C = at(() => {
    const x = a.value.scene, J = a.value.outfitPortraitAssetId;
    return J ? {
      ...x,
      portraits: x.portraits.map((Oe) => Oe.characterId === "albina" && O9.has(Oe.portraitAssetId) ? { ...Oe, portraitAssetId: J } : Oe)
    } : x;
  }), re = at(() => a.value.save), Ee = at(() => a.value.effectiveValues), Fe = at(() => a.value.choices), qe = at(() => S9(C.value, Oi, {
    baseUrl: e,
    desktop: R.value,
    reducedMotion: X.value,
    videoEnabled: d.value && !u.value
  }, (x) => x?.startsWith("video.") && !g.value[x] ? void 0 : T(x)));
  function fe(x, J) {
    const Oe = J instanceof to;
    k.value = {
      code: Oe ? J.code : "unexpected",
      message: `${x}: ${Oe ? J.message : "The save operation could not be completed."}`,
      recoverable: !0
    };
  }
  function $(x) {
    if (!uu.has(x.sceneId))
      throw new to("unknown-scene", `The save references unavailable scene "${x.sceneId}".`);
    return x;
  }
  function ae(x) {
    a.value = new ru(Ma, { save: $(x) }), k.value = void 0;
  }
  function T(x) {
    if (x)
      return f.value[x] ?? Tr(Oi, x, e);
  }
  async function Q(x) {
    if (!x) return;
    const J = await i.cache(x);
    J && (f.value = { ...f.value, [x]: J });
  }
  async function _(x) {
    const J = [
      x.backgroundAssetId,
      x.cgAssetId,
      x.voiceAssetId,
      x.bgmAssetId,
      ...x.sfxAssetIds ?? []
    ].filter((ge) => !!ge), Oe = await i.prefetch(J);
    Oe.size && (f.value = { ...f.value, ...Object.fromEntries(Oe) });
    for (const ge of x.portraits) await i.cachePortrait(ge.portraitAssetId);
  }
  function pe() {
    return { baseUrl: e, desktop: R.value, reducedMotion: X.value, videoEnabled: d.value && !u.value };
  }
  async function De(x) {
    const J = Sf(x, pe());
    if (!J || g.value[J]) return;
    const Oe = await i.cache(J);
    Oe && (f.value = { ...f.value, [J]: Oe }, g.value = { ...g.value, [J]: !0 });
  }
  function di() {
    const x = C.value.choices.map((J) => uu.get(J.nextSceneId)).filter((J) => !!J);
    (async () => {
      for (const J of x) await _(J);
    })();
  }
  async function ui() {
    if (!c.value) {
      if (C.value.bgmAssetId && ue !== C.value.bgmAssetId) {
        ue = C.value.bgmAssetId;
        const x = T(ue);
        x && (l.value = !await t.audio.playBgm(x));
      }
      for (const x of C.value.sfxAssetIds ?? []) {
        const J = T(x);
        J && t.audio.playSfx(J);
      }
      if (C.value.voiceAssetId) {
        const x = T(C.value.voiceAssetId);
        x && t.audio.enqueueVoice(x);
      }
    }
  }
  async function yi() {
    u.value = !1, await _(C.value), n.value = "";
    const x = a.value.interpolate(C.value.text);
    t.typewriter.write(x, (J) => {
      n.value = J;
    }, X.value ? 0 : 18), ui(), C.value.cgAssetId && (await t.gallery.unlock(C.value.cgAssetId, re.value), K !== C.value.id && (K = C.value.id, await t.specialCg.enqueue({ id: C.value.id, assetId: C.value.cgAssetId })), p.value = await t.gallery.list(re.value)), De(C.value), di();
  }
  async function li() {
    k.value = void 0, t.mount(), o.value = "game", await yi();
  }
  async function Hi() {
    let x;
    try {
      const J = await t.host.loadSave();
      if (J) return $(J);
    } catch (J) {
      x = J;
    }
    try {
      const J = await t.storage.loadSnapshot("quick-save");
      if (J) return $(J.save);
    } catch (J) {
      x ??= J;
    }
    if (x !== void 0) throw x;
  }
  async function ya() {
    r.value = !0, k.value = void 0;
    try {
      const x = await Hi();
      return x ? (ae(x), await li(), !0) : !1;
    } catch (x) {
      return fe("Unable to continue", x), !1;
    } finally {
      r.value = !1;
    }
  }
  async function go(x) {
    t.typewriter.completeNow();
    const J = a.value.choose(x);
    jr(a), s.value = J.resultText ? a.value.interpolate(J.resultText) : void 0;
    const Oe = J.choice.resultVoiceAssetId;
    await Q(Oe);
    const ge = T(Oe);
    !c.value && ge && t.audio.enqueueVoice(ge), s.value || await yi();
  }
  async function wi() {
    s.value = void 0, await yi();
  }
  async function Rn(x, J) {
    const Oe = (/* @__PURE__ */ new Date()).toISOString(), ge = { ...structuredClone(re.value), saveId: x, updatedAt: Oe }, Ze = ke ?? (await du()).blob;
    await t.storage.saveSnapshot(ge, Ze), J && await t.host.saveSave(ge), await y(), k.value = void 0;
  }
  async function h() {
    await Rn("quick-save", !0);
  }
  async function b(x) {
    await Rn(`slot-${x}`, !1);
  }
  async function y() {
    H.forEach((ge) => URL.revokeObjectURL(ge)), H.clear();
    const x = [];
    let J, Oe;
    try {
      Oe = await t.storage.keys("saves");
    } catch (ge) {
      I.value = [], fe("Save slots could not be listed", ge);
      return;
    }
    for (const ge of Oe) {
      let Ze;
      try {
        Ze = await t.storage.loadSnapshot(ge);
      } catch (_o) {
        J ??= _o;
        continue;
      }
      if (!Ze) continue;
      const ki = Ze.thumbnail.type.startsWith("image/") ? URL.createObjectURL(Ze.thumbnail) : void 0;
      ki && H.add(ki), x.push({ id: ge, sceneId: Ze.save.sceneId, updatedAt: Ze.save.updatedAt, ...ki ? { thumbnailUrl: ki } : {} });
    }
    I.value = x.sort((ge, Ze) => Ze.updatedAt.localeCompare(ge.updatedAt)), J !== void 0 ? fe("Some save slots could not be read", J) : k.value = void 0;
  }
  async function V() {
    o.value === "game" && (ke = (await du()).blob), await y(), o.value = "saves";
  }
  async function E(x) {
    try {
      const J = await t.storage.loadSnapshot(x);
      return J ? (ae(J.save), o.value = "game", await yi(), !0) : !1;
    } catch (J) {
      return fe(`Unable to load ${x}`, J), !1;
    }
  }
  async function A(x) {
    await t.storage.deleteValue("saves", x), await y();
  }
  function U() {
    return E4(re.value);
  }
  async function P(x) {
    const J = xr(x);
    if (!J.ok)
      return fe("Unable to import save", J.error), !1;
    try {
      return ae(J.save), o.value = "game", await yi(), !0;
    } catch (Oe) {
      return fe("Unable to import save", Oe), !1;
    }
  }
  async function D() {
    p.value = await t.gallery.list(re.value), await Promise.all(p.value.map(Q)), o.value = "gallery";
  }
  function S() {
    o.value = "game";
  }
  async function oe() {
    l.value = !await t.audio.recoverAutoplay();
  }
  function z() {
    t.typewriter.completeNow();
  }
  function te() {
    u.value = !0;
  }
  function ce() {
    c.value = !c.value, c.value ? (t.audio.stopAll(), ue = void 0) : ui();
  }
  function be(x) {
    return x instanceof Error ? /not owned|not unlocked/iu.test(x.message) ? "尚未获得或解锁该项目。" : /unavailable on route/iu.test(x.message) ? "当前路线不能使用该项目。" : /unknown/iu.test(x.message) ? "该项目不存在于当前版本。" : "玩法状态无法更新。" : "玩法状态无法更新。";
  }
  function me(x) {
    N.value = void 0;
    try {
      return x(), jr(a), !0;
    } catch (J) {
      return N.value = be(J), !1;
    }
  }
  function ye(x) {
    return me(() => a.value.equip(x));
  }
  function Me(x) {
    return me(() => a.value.wearOutfit(x));
  }
  function Je(x) {
    return me(() => a.value.selectProfession(x));
  }
  function It() {
    F?.removeEventListener("change", he), typeof window < "u" && (window.removeEventListener("resize", L), window.removeEventListener("orientationchange", L)), H.forEach((x) => URL.revokeObjectURL(x)), H.clear();
  }
  return {
    runtime: t,
    manifest: Oi,
    gameplay: Ma.gameplay,
    screen: o,
    visibleText: n,
    resultText: s,
    loading: r,
    muted: c,
    videoEnabled: d,
    reducedMotion: X,
    autoplayBlocked: l,
    galleryIds: p,
    saveSlots: I,
    saveError: k,
    scene: C,
    save: re,
    effectiveValues: Ee,
    choices: Fe,
    media: qe,
    assetUrl: T,
    start: li,
    continueGame: ya,
    choose: go,
    dismissResult: wi,
    quickSave: h,
    saveSlot: b,
    openSaves: V,
    restoreSlot: E,
    deleteSlot: A,
    exportSave: U,
    importSave: P,
    openGallery: D,
    backToGame: S,
    recoverAutoplay: oe,
    completeText: z,
    setVideoFailed: te,
    toggleMute: ce,
    equip: ye,
    wearOutfit: Me,
    selectProfession: Je,
    gameplayError: N,
    disposeUiListeners: It
  };
}), N9 = ["data-screen"], D9 = {
  key: 0,
  class: "save-error",
  role: "alert",
  "data-testid": "save-error"
}, P9 = {
  key: 1,
  class: "title-screen",
  "data-testid": "title-screen"
}, R9 = { class: "title-screen__content" }, j9 = {
  class: "title-actions",
  "aria-label": "主菜单"
}, $9 = ["disabled"], U9 = { class: "build-state" }, F9 = {
  key: 2,
  class: "panel-screen",
  "data-testid": "saves-screen"
}, M9 = { class: "slot-actions" }, z9 = { class: "save-slot-grid" }, L9 = ["data-save-id"], q9 = ["src"], Z9 = ["onClick"], H9 = ["onClick"], B9 = { key: 0 }, J9 = {
  key: 3,
  class: "panel-screen",
  "data-testid": "gallery-screen"
}, K9 = { class: "gallery-grid" }, G9 = ["src", "alt"], W9 = { key: 0 }, Y9 = {
  key: 4,
  class: "panel-screen",
  "data-testid": "settings-screen"
}, X9 = ["checked"], Q9 = {
  key: 5,
  class: "panel-screen credits-screen",
  "data-testid": "credits-screen"
}, ey = { class: "credits-notice" }, ty = {
  class: "credits-list",
  "aria-label": "包内配乐"
}, iy = { "aria-label": "曲目版权链接" }, ay = ["href"], oy = ["href"], ny = {
  class: "official-listening",
  "aria-labelledby": "official-soundtrack-title"
}, sy = { "aria-label": "官方 OST 外部试听" }, ry = ["href"], cy = ["href"], dy = ["data-scene-id"], uy = ["src"], ly = ["src", "poster"], py = ["src"], fy = { class: "game-hud" }, hy = { class: "game-hud__values" }, by = {
  key: 0,
  class: "result-overlay",
  "data-testid": "choice-result"
}, my = {
  key: 1,
  class: "choice-list"
}, gy = ["data-choice-id", "onClick"], _y = {
  key: 0,
  class: "ending-mark"
}, vy = { class: "save-tools" }, yy = /* @__PURE__ */ Xs({
  __name: "App",
  setup(e) {
    const t = C9(), i = O6.parse(h1), a = /* @__PURE__ */ Ve(""), o = /* @__PURE__ */ Ve(""), n = /* @__PURE__ */ Ve(!1), s = /* @__PURE__ */ Ve(), r = at(() => t.galleryIds.map((u) => ({ id: u, url: t.assetUrl(u) })).filter((u) => u.url));
    function c() {
      o.value = t.exportSave();
    }
    async function d() {
      a.value.trim() && await t.importSave(a.value);
    }
    function l() {
      n.value = !1, Za(() => s.value?.focus());
    }
    return er(() => {
      t.disposeUiListeners(), t.runtime.unmount();
    }), (u, p) => (B(), G("main", {
      class: "albina-app",
      "data-albina-application": "",
      "data-screen": O(t).screen
    }, [
      O(t).saveError ? (B(), G("p", D9, q(O(t).saveError.message), 1)) : mt("", !0),
      O(t).screen === "title" ? (B(), G("section", P9, [
        p[32] || (p[32] = m("div", { class: "title-screen__veil" }, null, -1)),
        m("div", R9, [
          p[29] || (p[29] = m("p", { class: "eyebrow" }, "Canto IX · 独立前端卡", -1)),
          p[30] || (p[30] = m("h1", null, "ALBINA", -1)),
          p[31] || (p[31] = m("p", { class: "subtitle" }, "白色画布上的残响", -1)),
          m("nav", j9, [
            m("button", {
              "data-testid": "new-game",
              onClick: p[0] || (p[0] = //@ts-ignore
              (...f) => O(t).start && O(t).start(...f))
            }, "开始新篇"),
            m("button", {
              "data-testid": "continue-game",
              disabled: O(t).loading,
              onClick: p[1] || (p[1] = //@ts-ignore
              (...f) => O(t).continueGame && O(t).continueGame(...f))
            }, "继续", 8, $9),
            m("button", {
              "data-testid": "title-saves",
              onClick: p[2] || (p[2] = //@ts-ignore
              (...f) => O(t).openSaves && O(t).openSaves(...f))
            }, "存档"),
            m("button", {
              onClick: p[3] || (p[3] = //@ts-ignore
              (...f) => O(t).openGallery && O(t).openGallery(...f))
            }, "CG 图鉴"),
            m("button", {
              "data-testid": "title-settings",
              onClick: p[4] || (p[4] = (f) => O(t).screen = "settings")
            }, "设置"),
            m("button", {
              "data-testid": "title-credits",
              onClick: p[5] || (p[5] = (f) => O(t).screen = "credits")
            }, "版权与鸣谢")
          ]),
          m("p", U9, "v" + q(O(M6)) + " · 确定性主剧情 · 运行时零媒体 API", 1)
        ])
      ])) : O(t).screen === "saves" ? (B(), G("section", F9, [
        m("header", null, [
          m("button", {
            onClick: p[6] || (p[6] = (f) => O(t).screen = "title")
          }, "返回"),
          p[33] || (p[33] = m("h2", null, "存档管理", -1))
        ]),
        m("div", M9, [
          m("button", {
            "data-testid": "save-slot-1",
            onClick: p[7] || (p[7] = (f) => O(t).saveSlot(1))
          }, "保存到槽位 1"),
          m("button", {
            onClick: p[8] || (p[8] = (f) => O(t).saveSlot(2))
          }, "保存到槽位 2"),
          m("button", {
            onClick: p[9] || (p[9] = (f) => O(t).saveSlot(3))
          }, "保存到槽位 3")
        ]),
        m("div", z9, [
          (B(!0), G(we, null, Ge(O(t).saveSlots, (f) => (B(), G("article", {
            key: f.id,
            class: "save-slot",
            "data-save-id": f.id
          }, [
            f.thumbnailUrl ? (B(), G("img", {
              key: 0,
              src: f.thumbnailUrl,
              alt: "存档缩略图"
            }, null, 8, q9)) : mt("", !0),
            m("div", null, [
              m("strong", null, q(f.id), 1),
              m("p", null, q(f.sceneId), 1),
              m("time", null, q(f.updatedAt), 1)
            ]),
            m("button", {
              onClick: (g) => O(t).restoreSlot(f.id)
            }, "读取", 8, Z9),
            m("button", {
              onClick: (g) => O(t).deleteSlot(f.id)
            }, "删除", 8, H9)
          ], 8, L9))), 128)),
          O(t).saveSlots.length === 0 ? (B(), G("p", B9, "暂无普通存档。")) : mt("", !0)
        ])
      ])) : O(t).screen === "gallery" ? (B(), G("section", J9, [
        m("header", null, [
          m("button", {
            onClick: p[10] || (p[10] = //@ts-ignore
            (...f) => O(t).backToGame && O(t).backToGame(...f))
          }, "返回"),
          p[34] || (p[34] = m("h2", null, "CG 图鉴", -1))
        ]),
        m("div", K9, [
          (B(!0), G(we, null, Ge(r.value, (f) => (B(), G("figure", {
            key: f.id
          }, [
            m("img", {
              src: f.url,
              alt: f.id,
              crossorigin: "anonymous"
            }, null, 8, G9),
            m("figcaption", null, q(f.id), 1)
          ]))), 128)),
          r.value.length === 0 ? (B(), G("p", W9, "尚未解锁 CG。")) : mt("", !0)
        ])
      ])) : O(t).screen === "settings" ? (B(), G("section", Y9, [
        m("header", null, [
          m("button", {
            onClick: p[11] || (p[11] = (f) => O(t).screen = "title")
          }, "返回"),
          p[35] || (p[35] = m("h2", null, "演出设置", -1))
        ]),
        m("label", null, [
          ei(m("input", {
            "onUpdate:modelValue": p[12] || (p[12] = (f) => O(t).videoEnabled = f),
            type: "checkbox"
          }, null, 512), [
            [vc, O(t).videoEnabled]
          ]),
          p[36] || (p[36] = fi(" 启用动画 CG（移动端可关闭）", -1))
        ]),
        m("label", null, [
          ei(m("input", {
            "onUpdate:modelValue": p[13] || (p[13] = (f) => O(t).reducedMotion = f),
            type: "checkbox"
          }, null, 512), [
            [vc, O(t).reducedMotion]
          ]),
          p[37] || (p[37] = fi(" 减少动态效果", -1))
        ]),
        m("label", null, [
          m("input", {
            checked: O(t).muted,
            type: "checkbox",
            onChange: p[14] || (p[14] = //@ts-ignore
            (...f) => O(t).toggleMute && O(t).toggleMute(...f))
          }, null, 40, X9),
          p[38] || (p[38] = fi(" 静音", -1))
        ]),
        m("button", {
          "data-testid": "autoplay-recovery",
          onClick: p[15] || (p[15] = //@ts-ignore
          (...f) => O(t).recoverAutoplay && O(t).recoverAutoplay(...f))
        }, "恢复音频播放"),
        m("button", {
          "data-testid": "settings-credits",
          onClick: p[16] || (p[16] = (f) => O(t).screen = "credits")
        }, "查看版权与鸣谢"),
        p[39] || (p[39] = m("p", { class: "asset-status" }, "运行时不请求媒体生成接口。包内配乐均已登记来源、文件校验值与再分发许可。", -1))
      ])) : O(t).screen === "credits" ? (B(), G("section", Q9, [
        m("header", null, [
          m("button", {
            onClick: p[17] || (p[17] = (f) => O(t).screen = "title")
          }, "返回"),
          p[40] || (p[40] = m("h2", null, "版权与鸣谢", -1))
        ]),
        m("p", ey, q(O(i).packagedNotice), 1),
        m("ol", ty, [
          (B(!0), G(we, null, Ge(O(i).tracks, (f) => (B(), G("li", {
            key: f.assetId
          }, [
            m("h3", null, q(f.title), 1),
            m("p", null, q(f.creator) + " · ISRC " + q(f.isrc) + " · cue: " + q(f.cueAlias), 1),
            m("p", null, q(f.attribution), 1),
            m("nav", iy, [
              m("a", {
                href: f.sourceUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "曲目来源", 8, ay),
              m("a", {
                href: f.licenseUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "CC BY 4.0 许可", 8, oy)
            ])
          ]))), 128))
        ]),
        m("section", ny, [
          p[41] || (p[41] = m("h3", { id: "official-soundtrack-title" }, "ProjectMoon 官方 OST", -1)),
          m("p", null, [
            m("strong", null, q(O(i).officialSoundtrack.playlistTitle), 1),
            fi(" · " + q(O(i).officialSoundtrack.channel) + " · " + q(O(i).officialSoundtrack.playlistTrackCount) + " 首", 1)
          ]),
          m("p", null, q(O(i).officialSoundtrack.notice), 1),
          m("p", null, q(O(i).officialSoundtrack.rightsNotice), 1),
          m("nav", sy, [
            (B(!0), G(we, null, Ge(O(i).officialSoundtrack.links, (f) => (B(), G("a", {
              key: f.url,
              href: f.url,
              target: "_blank",
              rel: "noopener noreferrer"
            }, q(f.label), 9, ry))), 128)),
            m("a", {
              href: O(i).officialSoundtrack.termsUrl,
              target: "_blank",
              rel: "noopener noreferrer"
            }, "ProjectMoon 服务条款", 8, cy)
          ])
        ])
      ])) : (B(), G("section", {
        key: 6,
        class: "game-screen",
        "data-testid": "game-screen",
        "data-scene-id": O(t).scene.id
      }, [
        O(t).media.backgroundUrl ? (B(), G("img", {
          key: 0,
          class: "game-screen__background",
          src: O(t).media.backgroundUrl,
          alt: "",
          crossorigin: "anonymous"
        }, null, 8, uy)) : mt("", !0),
        O(t).media.videoUrl ? (B(), G("video", {
          key: 1,
          class: "game-screen__video",
          src: O(t).media.videoUrl,
          poster: O(t).media.fallbackUrl,
          autoplay: "",
          muted: "",
          loop: "",
          playsinline: "",
          crossorigin: "anonymous",
          "data-testid": "scene-video",
          onError: p[18] || (p[18] = //@ts-ignore
          (...f) => O(t).setVideoFailed && O(t).setVideoFailed(...f))
        }, null, 40, ly)) : O(t).media.fallbackUrl ? (B(), G("img", {
          key: 2,
          class: "game-screen__cg",
          src: O(t).media.fallbackUrl,
          alt: "剧情 CG",
          "data-testid": "static-fallback",
          crossorigin: "anonymous"
        }, null, 8, py)) : mt("", !0),
        Ht(u_, {
          portraits: O(t).scene.portraits,
          service: O(t).runtime.portraits
        }, null, 8, ["portraits", "service"]),
        m("header", fy, [
          m("span", null, "CH." + q(O(t).scene.chapter) + " · " + q(O(t).scene.locationId), 1),
          m("span", hy, "好感 " + q(O(t).effectiveValues.affectionAlbina) + " / 信任 " + q(O(t).effectiveValues.trust) + " / 危险 " + q(O(t).effectiveValues.danger) + " / 共鸣 " + q(O(t).effectiveValues.artResonance), 1),
          m("nav", null, [
            m("button", {
              ref_key: "gameplayButton",
              ref: s,
              "data-testid": "gameplay-open",
              onClick: p[19] || (p[19] = (f) => n.value = !0)
            }, "状态", 512),
            m("button", {
              onClick: p[20] || (p[20] = //@ts-ignore
              (...f) => O(t).quickSave && O(t).quickSave(...f))
            }, "快速存档"),
            m("button", {
              "data-testid": "game-saves",
              onClick: p[21] || (p[21] = //@ts-ignore
              (...f) => O(t).openSaves && O(t).openSaves(...f))
            }, "存档"),
            m("button", {
              onClick: p[22] || (p[22] = //@ts-ignore
              (...f) => O(t).openGallery && O(t).openGallery(...f))
            }, "图鉴"),
            m("button", {
              "data-testid": "game-settings",
              onClick: p[23] || (p[23] = (f) => O(t).screen = "settings")
            }, "设置"),
            m("button", {
              onClick: p[24] || (p[24] = //@ts-ignore
              (...f) => O(t).toggleMute && O(t).toggleMute(...f))
            }, q(O(t).muted ? "启音" : "静音"), 1)
          ])
        ]),
        n.value ? (B(), Il(c_, {
          key: 3,
          gameplay: O(t).gameplay,
          save: O(t).save,
          "effective-values": O(t).effectiveValues,
          "interaction-error": O(t).gameplayError,
          onClose: l,
          onEquip: O(t).equip,
          onWearOutfit: O(t).wearOutfit,
          onSelectProfession: O(t).selectProfession
        }, null, 8, ["gameplay", "save", "effective-values", "interaction-error", "onEquip", "onWearOutfit", "onSelectProfession"])) : mt("", !0),
        m("article", {
          class: "dialogue-box",
          "data-testid": "dialogue-box",
          onClick: p[26] || (p[26] = //@ts-ignore
          (...f) => O(t).completeText && O(t).completeText(...f))
        }, [
          m("h2", null, q(O(t).scene.speaker), 1),
          m("p", null, q(O(t).visibleText), 1),
          O(t).resultText ? (B(), G("div", by, [
            m("p", null, q(O(t).resultText), 1),
            m("button", {
              onClick: p[25] || (p[25] = tn(
                //@ts-ignore
                (...f) => O(t).dismissResult && O(t).dismissResult(...f),
                ["stop"]
              ))
            }, "继续")
          ])) : (B(), G("div", my, [
            (B(!0), G(we, null, Ge(O(t).choices, (f) => (B(), G("button", {
              key: f.id,
              "data-choice-id": f.id,
              onClick: tn((g) => O(t).choose(f.id), ["stop"])
            }, q(f.text), 9, gy))), 128)),
            O(t).scene.ending ? (B(), G("p", _y, q(O(t).scene.ending.route) + " · " + q(O(t).scene.ending.kind) + " END", 1)) : mt("", !0)
          ]))
        ]),
        m("details", vy, [
          p[42] || (p[42] = m("summary", null, "存档导入 / 导出", -1)),
          m("button", { onClick: c }, "导出当前存档"),
          ei(m("textarea", {
            "onUpdate:modelValue": p[27] || (p[27] = (f) => o.value = f),
            readonly: "",
            "aria-label": "导出存档"
          }, null, 512), [
            [_c, o.value]
          ]),
          ei(m("textarea", {
            "onUpdate:modelValue": p[28] || (p[28] = (f) => a.value = f),
            "aria-label": "导入存档",
            placeholder: "粘贴 SaveV2 JSON"
          }, null, 512), [
            [_c, a.value]
          ]),
          m("button", { onClick: d }, "导入")
        ])
      ], 8, dy))
    ], 8, N9));
  }
});
function wy(e) {
  const t = Cm(yy);
  return t.use(o1()), t.mount(e), t;
}
function lu() {
  if (typeof document > "u" || document.querySelector("[data-albina-launcher]")) return;
  if (import.meta.url.endsWith("/albina-source.js") && !document.querySelector("link[data-albina-style]")) {
    const t = document.createElement("link");
    t.rel = "stylesheet", t.dataset.albinaStyle = "v2", t.href = new URL(
      /* @vite-ignore */
      "./albina-source.css",
      import.meta.url
    ).href, document.head.append(t);
  }
  const e = document.createElement("button");
  e.type = "button", e.dataset.albinaLauncher = "v2", e.textContent = "打开阿尔比娜前端", Object.assign(e.style, { position: "fixed", right: "18px", bottom: "18px", zIndex: "2147483646" }), e.addEventListener("click", () => {
    let t = document.querySelector("[data-albina-shell]");
    if (!t) {
      t = document.createElement("section"), t.dataset.albinaShell = "v2", Object.assign(t.style, { position: "fixed", inset: "0", zIndex: "2147483647", background: "#020308" });
      const i = document.createElement("button");
      i.type = "button", i.textContent = "关闭", Object.assign(i.style, { position: "absolute", right: "12px", top: "12px", zIndex: "4" });
      const a = document.createElement("div");
      a.id = "albina-v2-root", t.append(a, i), document.body.append(t);
      const o = wy(a);
      i.addEventListener("click", () => {
        o.unmount(), t?.remove();
      });
    }
  }), document.body.append(e);
}
typeof window < "u" && !window.__ALBINA_DISABLE_AUTOINSTALL__ && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", lu, { once: !0 }) : lu());
export {
  z6 as ALBINA_CDN_BASE,
  M6 as ALBINA_RELEASE_VERSION,
  lu as installAlbinaOneClick,
  wy as mountAlbinaApplication
};
