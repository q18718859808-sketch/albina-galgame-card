// @__NO_SIDE_EFFECTS__
function Kt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const i of e.split(",")) t[i] = 1;
  return (i) => i in t;
}
const ue = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, zi = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Pe = () => {
}, Dd = () => !1, Da = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), va = (e) => e.startsWith("onUpdate:"), Ae = Object.assign, uo = (e, t) => {
  const i = e.indexOf(t);
  i > -1 && e.splice(i, 1);
}, Nf = Object.prototype.hasOwnProperty, ie = (e, t) => Nf.call(e, t), W = Array.isArray, bi = (e) => Va(e) === "[object Map]", Fn = (e) => Va(e) === "[object Set]", er = (e) => Va(e) === "[object Date]", G = (e) => typeof e == "function", _e = (e) => typeof e == "string", rt = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", lo = (e) => (ae(e) || G(e)) && G(e.then) && G(e.catch), Vd = Object.prototype.toString, Va = (e) => Vd.call(e), fo = (e) => Va(e).slice(8, -1), Rd = (e) => Va(e) === "[object Object]", zn = (e) => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, fa = /* @__PURE__ */ Kt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Cf = /* @__PURE__ */ Kt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Un = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((i) => t[i] || (t[i] = e(i)));
}, Df = /-\w/g, et = Un(
  (e) => e.replace(Df, (t) => t.slice(1).toUpperCase())
), Vf = /\B([A-Z])/g, ei = Un(
  (e) => e.replace(Vf, "-$1").toLowerCase()
), Ln = Un((e) => e.charAt(0).toUpperCase() + e.slice(1)), di = Un(
  (e) => e ? `on${Ln(e)}` : ""
), xt = (e, t) => !Object.is(e, t), Vi = (e, ...t) => {
  for (let i = 0; i < e.length; i++)
    e[i](...t);
}, hn = (e, t, i, a = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: i
  });
}, po = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let tr;
const Ra = () => tr || (tr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Mn(e) {
  if (W(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const a = e[i], n = _e(a) ? jf(a) : Mn(a);
      if (n)
        for (const s in n)
          t[s] = n[s];
    }
    return t;
  } else if (_e(e) || ae(e))
    return e;
}
const Rf = /;(?![^(]*\))/g, Pf = /:([^]+)/, $f = /\/\*[^]*?\*\//g;
function jf(e) {
  const t = {};
  return e.replace($f, "").split(Rf).forEach((i) => {
    if (i) {
      const a = i.split(Pf);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function Bn(e) {
  let t = "";
  if (_e(e))
    t = e;
  else if (W(e))
    for (let i = 0; i < e.length; i++) {
      const a = Bn(e[i]);
      a && (t += a + " ");
    }
  else if (ae(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
const Ff = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", zf = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Uf = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Lf = /* @__PURE__ */ Kt(Ff), Mf = /* @__PURE__ */ Kt(zf), Bf = /* @__PURE__ */ Kt(Uf), Zf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Hf = /* @__PURE__ */ Kt(Zf);
function Pd(e) {
  return !!e || e === "";
}
function Kf(e, t) {
  if (e.length !== t.length) return !1;
  let i = !0;
  for (let a = 0; i && a < e.length; a++)
    i = Pa(e[a], t[a]);
  return i;
}
function Pa(e, t) {
  if (e === t) return !0;
  let i = er(e), a = er(t);
  if (i || a)
    return i && a ? e.getTime() === t.getTime() : !1;
  if (i = rt(e), a = rt(t), i || a)
    return e === t;
  if (i = W(e), a = W(t), i || a)
    return i && a ? Kf(e, t) : !1;
  if (i = ae(e), a = ae(t), i || a) {
    if (!i || !a)
      return !1;
    const n = Object.keys(e).length, s = Object.keys(t).length;
    if (n !== s)
      return !1;
    for (const o in e) {
      const r = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (r && !c || !r && c || !Pa(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function $d(e, t) {
  return e.findIndex((i) => Pa(i, t));
}
const jd = (e) => !!(e && e.__v_isRef === !0), Fe = (e) => _e(e) ? e : e == null ? "" : W(e) || ae(e) && (e.toString === Vd || !G(e.toString)) ? jd(e) ? Fe(e.value) : JSON.stringify(e, Fd, 2) : String(e), Fd = (e, t) => jd(t) ? Fd(e, t.value) : bi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (i, [a, n], s) => (i[us(a, s) + " =>"] = n, i),
    {}
  )
} : Fn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((i) => us(i))
} : rt(t) ? us(t) : ae(t) && !W(t) && !Rd(t) ? String(t) : t, us = (e, t = "") => {
  var i;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    rt(e) ? `Symbol(${(i = e.description) != null ? i : t})` : e
  );
};
function ct(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let De;
class zd {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && De && (De.active ? (this.parent = De, this.index = (De.scopes || (De.scopes = [])).push(
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
      const i = De;
      try {
        return De = this, t();
      } finally {
        De = i;
      }
    } else process.env.NODE_ENV !== "production" && this._warnOnRun && ct("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = De, De = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (De === this)
        De = this.prevScope;
      else {
        let t = De;
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
        const n = this.parent.scopes.pop();
        n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ud(e) {
  return new zd(e);
}
function Ld() {
  return De;
}
function Wf(e, t = !1) {
  De ? De.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && ct(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let de;
const ls = /* @__PURE__ */ new WeakSet();
class Md {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, De && (De.active ? De.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ls.has(this) && (ls.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Zd(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ir(this), Hd(this);
    const t = de, i = bt;
    de = this, bt = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && de !== this && ct(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Kd(this), de = t, bt = i, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        bo(t);
      this.deps = this.depsTail = void 0, ir(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ls.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ds(this) && this.run();
  }
  get dirty() {
    return Ds(this);
  }
}
let Bd = 0, pa, ga;
function Zd(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ga, ga = e;
    return;
  }
  e.next = pa, pa = e;
}
function go() {
  Bd++;
}
function mo() {
  if (--Bd > 0)
    return;
  if (ga) {
    let t = ga;
    for (ga = void 0; t; ) {
      const i = t.next;
      t.next = void 0, t.flags &= -9, t = i;
    }
  }
  let e;
  for (; pa; ) {
    let t = pa;
    for (pa = void 0; t; ) {
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
function Hd(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Kd(e) {
  let t, i = e.depsTail, a = i;
  for (; a; ) {
    const n = a.prevDep;
    a.version === -1 ? (a === i && (i = n), bo(a), qf(a)) : t = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = n;
  }
  e.deps = t, e.depsTail = i;
}
function Ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Wd(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Wd(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ya) || (e.globalVersion = ya, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, i = de, a = bt;
  de = e, bt = !0;
  try {
    Hd(e);
    const n = e.fn(e._value);
    (t.version === 0 || xt(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    de = i, bt = a, Kd(e), e.flags &= -3;
  }
}
function bo(e, t = !1) {
  const { dep: i, prevSub: a, nextSub: n } = e;
  if (a && (a.nextSub = n, e.prevSub = void 0), n && (n.prevSub = a, e.nextSub = void 0), process.env.NODE_ENV !== "production" && i.subsHead === e && (i.subsHead = n), i.subs === e && (i.subs = a, !a && i.computed)) {
    i.computed.flags &= -5;
    for (let s = i.computed.deps; s; s = s.nextDep)
      bo(s, !0);
  }
  !t && !--i.sc && i.map && i.map.delete(i.key);
}
function qf(e) {
  const { prevDep: t, nextDep: i } = e;
  t && (t.nextDep = i, e.prevDep = void 0), i && (i.prevDep = t, e.nextDep = void 0);
}
let bt = !0;
const qd = [];
function ut() {
  qd.push(bt), bt = !1;
}
function lt() {
  const e = qd.pop();
  bt = e === void 0 ? !0 : e;
}
function ir(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const i = de;
    de = void 0;
    try {
      t();
    } finally {
      de = i;
    }
  }
}
let ya = 0;
class Gf {
  constructor(t, i) {
    this.sub = t, this.dep = i, this.version = i.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ho {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!de || !bt || de === this.computed)
      return;
    let i = this.activeLink;
    if (i === void 0 || i.sub !== de)
      i = this.activeLink = new Gf(de, this), de.deps ? (i.prevDep = de.depsTail, de.depsTail.nextDep = i, de.depsTail = i) : de.deps = de.depsTail = i, Gd(i);
    else if (i.version === -1 && (i.version = this.version, i.nextDep)) {
      const a = i.nextDep;
      a.prevDep = i.prevDep, i.prevDep && (i.prevDep.nextDep = a), i.prevDep = de.depsTail, i.nextDep = void 0, de.depsTail.nextDep = i, de.depsTail = i, de.deps === i && (de.deps = a);
    }
    return process.env.NODE_ENV !== "production" && de.onTrack && de.onTrack(
      Ae(
        {
          effect: de
        },
        t
      )
    ), i;
  }
  trigger(t) {
    this.version++, ya++, this.notify(t);
  }
  notify(t) {
    go();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let i = this.subsHead; i; i = i.nextSub)
          i.sub.onTrigger && !(i.sub.flags & 8) && i.sub.onTrigger(
            Ae(
              {
                effect: i.sub
              },
              t
            )
          );
      for (let i = this.subs; i; i = i.prevSub)
        i.sub.notify() && i.sub.dep.notify();
    } finally {
      mo();
    }
  }
}
function Gd(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let a = t.deps; a; a = a.nextDep)
        Gd(a);
    }
    const i = e.dep.subs;
    i !== e && (e.prevSub = i, i && (i.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const _n = /* @__PURE__ */ new WeakMap(), hi = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Vs = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), ka = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Re(e, t, i) {
  if (bt && de) {
    let a = _n.get(e);
    a || _n.set(e, a = /* @__PURE__ */ new Map());
    let n = a.get(i);
    n || (a.set(i, n = new ho()), n.map = a, n.key = i), process.env.NODE_ENV !== "production" ? n.track({
      target: e,
      type: t,
      key: i
    }) : n.track();
  }
}
function St(e, t, i, a, n, s) {
  const o = _n.get(e);
  if (!o) {
    ya++;
    return;
  }
  const r = (c) => {
    c && (process.env.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: i,
      newValue: a,
      oldValue: n,
      oldTarget: s
    }) : c.trigger());
  };
  if (go(), t === "clear")
    o.forEach(r);
  else {
    const c = W(e), d = c && zn(i);
    if (c && i === "length") {
      const l = Number(a);
      o.forEach((u, p) => {
        (p === "length" || p === ka || !rt(p) && p >= l) && r(u);
      });
    } else
      switch ((i !== void 0 || o.has(void 0)) && r(o.get(i)), d && r(o.get(ka)), t) {
        case "add":
          c ? d && r(o.get("length")) : (r(o.get(hi)), bi(e) && r(o.get(Vs)));
          break;
        case "delete":
          c || (r(o.get(hi)), bi(e) && r(o.get(Vs)));
          break;
        case "set":
          bi(e) && r(o.get(hi));
          break;
      }
  }
  mo();
}
function Jf(e, t) {
  const i = _n.get(e);
  return i && i.get(t);
}
function Oi(e) {
  const t = /* @__PURE__ */ X(e);
  return t === e ? t : (Re(t, "iterate", ka), /* @__PURE__ */ He(e) ? t : t.map(vt));
}
function Zn(e) {
  return Re(e = /* @__PURE__ */ X(e), "iterate", ka), e;
}
function Ot(e, t) {
  return /* @__PURE__ */ _t(e) ? Hi(/* @__PURE__ */ ht(e) ? vt(t) : t) : vt(t);
}
const Yf = {
  __proto__: null,
  [Symbol.iterator]() {
    return fs(this, Symbol.iterator, (e) => Ot(this, e));
  },
  concat(...e) {
    return Oi(this).concat(
      ...e.map((t) => W(t) ? Oi(t) : t)
    );
  },
  entries() {
    return fs(this, "entries", (e) => (e[1] = Ot(this, e[1]), e));
  },
  every(e, t) {
    return Pt(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Pt(
      this,
      "filter",
      e,
      t,
      (i) => i.map((a) => Ot(this, a)),
      arguments
    );
  },
  find(e, t) {
    return Pt(
      this,
      "find",
      e,
      t,
      (i) => Ot(this, i),
      arguments
    );
  },
  findIndex(e, t) {
    return Pt(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Pt(
      this,
      "findLast",
      e,
      t,
      (i) => Ot(this, i),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Pt(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Pt(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ps(this, "includes", e);
  },
  indexOf(...e) {
    return ps(this, "indexOf", e);
  },
  join(e) {
    return Oi(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ps(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Pt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return aa(this, "pop");
  },
  push(...e) {
    return aa(this, "push", e);
  },
  reduce(e, ...t) {
    return ar(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ar(this, "reduceRight", e, t);
  },
  shift() {
    return aa(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Pt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return aa(this, "splice", e);
  },
  toReversed() {
    return Oi(this).toReversed();
  },
  toSorted(e) {
    return Oi(this).toSorted(e);
  },
  toSpliced(...e) {
    return Oi(this).toSpliced(...e);
  },
  unshift(...e) {
    return aa(this, "unshift", e);
  },
  values() {
    return fs(this, "values", (e) => Ot(this, e));
  }
};
function fs(e, t, i) {
  const a = Zn(e), n = a[t]();
  return a !== e && !/* @__PURE__ */ He(e) && (n._next = n.next, n.next = () => {
    const s = n._next();
    return s.done || (s.value = i(s.value)), s;
  }), n;
}
const Xf = Array.prototype;
function Pt(e, t, i, a, n, s) {
  const o = Zn(e), r = o !== e && !/* @__PURE__ */ He(e), c = o[t];
  if (c !== Xf[t]) {
    const u = c.apply(e, s);
    return r ? vt(u) : u;
  }
  let d = i;
  o !== e && (r ? d = function(u, p) {
    return i.call(this, Ot(e, u), p, e);
  } : i.length > 2 && (d = function(u, p) {
    return i.call(this, u, p, e);
  }));
  const l = c.call(o, d, a);
  return r && n ? n(l) : l;
}
function ar(e, t, i, a) {
  const n = Zn(e), s = n !== e && !/* @__PURE__ */ He(e);
  let o = i, r = !1;
  n !== e && (s ? (r = a.length === 0, o = function(d, l, u) {
    return r && (r = !1, d = Ot(e, d)), i.call(this, d, Ot(e, l), u, e);
  }) : i.length > 3 && (o = function(d, l, u) {
    return i.call(this, d, l, u, e);
  }));
  const c = n[t](o, ...a);
  return r ? Ot(e, c) : c;
}
function ps(e, t, i) {
  const a = /* @__PURE__ */ X(e);
  Re(a, "iterate", ka);
  const n = a[t](...i);
  return (n === -1 || n === !1) && /* @__PURE__ */ Zi(i[0]) ? (i[0] = /* @__PURE__ */ X(i[0]), a[t](...i)) : n;
}
function aa(e, t, i = []) {
  ut(), go();
  const a = (/* @__PURE__ */ X(e))[t].apply(e, i);
  return mo(), lt(), a;
}
const Qf = /* @__PURE__ */ Kt("__proto__,__v_isRef,__isVue"), Jd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(rt)
);
function ep(e) {
  rt(e) || (e = String(e));
  const t = /* @__PURE__ */ X(this);
  return Re(t, "has", e), t.hasOwnProperty(e);
}
class Yd {
  constructor(t = !1, i = !1) {
    this._isReadonly = t, this._isShallow = i;
  }
  get(t, i, a) {
    if (i === "__v_skip") return t.__v_skip;
    const n = this._isReadonly, s = this._isShallow;
    if (i === "__v_isReactive")
      return !n;
    if (i === "__v_isReadonly")
      return n;
    if (i === "__v_isShallow")
      return s;
    if (i === "__v_raw")
      return a === (n ? s ? au : iu : s ? tu : eu).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(a) ? t : void 0;
    const o = W(t);
    if (!n) {
      let c;
      if (o && (c = Yf[i]))
        return c;
      if (i === "hasOwnProperty")
        return ep;
    }
    const r = Reflect.get(
      t,
      i,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ge(t) ? t : a
    );
    if ((rt(i) ? Jd.has(i) : Qf(i)) || (n || Re(t, "get", i), s))
      return r;
    if (/* @__PURE__ */ ge(r)) {
      const c = o && zn(i) ? r : r.value;
      return n && ae(c) ? /* @__PURE__ */ Ps(c) : c;
    }
    return ae(r) ? n ? /* @__PURE__ */ Ps(r) : /* @__PURE__ */ Kn(r) : r;
  }
}
class Xd extends Yd {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, i, a, n) {
    let s = t[i];
    const o = W(t) && zn(i);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ _t(s);
      if (!/* @__PURE__ */ He(a) && !/* @__PURE__ */ _t(a) && (s = /* @__PURE__ */ X(s), a = /* @__PURE__ */ X(a)), !o && /* @__PURE__ */ ge(s) && !/* @__PURE__ */ ge(a))
        return d ? (process.env.NODE_ENV !== "production" && ct(
          `Set operation on key "${String(i)}" failed: target is readonly.`,
          t[i]
        ), !0) : (s.value = a, !0);
    }
    const r = o ? Number(i) < t.length : ie(t, i), c = Reflect.set(
      t,
      i,
      a,
      /* @__PURE__ */ ge(t) ? t : n
    );
    return t === /* @__PURE__ */ X(n) && c && (r ? xt(a, s) && St(t, "set", i, a, s) : St(t, "add", i, a)), c;
  }
  deleteProperty(t, i) {
    const a = ie(t, i), n = t[i], s = Reflect.deleteProperty(t, i);
    return s && a && St(t, "delete", i, void 0, n), s;
  }
  has(t, i) {
    const a = Reflect.has(t, i);
    return (!rt(i) || !Jd.has(i)) && Re(t, "has", i), a;
  }
  ownKeys(t) {
    return Re(
      t,
      "iterate",
      W(t) ? "length" : hi
    ), Reflect.ownKeys(t);
  }
}
class Qd extends Yd {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, i) {
    return process.env.NODE_ENV !== "production" && ct(
      `Set operation on key "${String(i)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, i) {
    return process.env.NODE_ENV !== "production" && ct(
      `Delete operation on key "${String(i)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const tp = /* @__PURE__ */ new Xd(), ip = /* @__PURE__ */ new Qd(), ap = /* @__PURE__ */ new Xd(!0), np = /* @__PURE__ */ new Qd(!0), Rs = (e) => e, Ha = (e) => Reflect.getPrototypeOf(e);
function sp(e, t, i) {
  return function(...a) {
    const n = this.__v_raw, s = /* @__PURE__ */ X(n), o = bi(s), r = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = n[e](...a), l = i ? Rs : t ? Hi : vt;
    return !t && Re(
      s,
      "iterate",
      c ? Vs : hi
    ), Ae(
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
function Ka(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const i = t[0] ? `on key "${t[0]}" ` : "";
      ct(
        `${Ln(e)} operation ${i}failed: target is readonly.`,
        /* @__PURE__ */ X(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function op(e, t) {
  const i = {
    get(n) {
      const s = this.__v_raw, o = /* @__PURE__ */ X(s), r = /* @__PURE__ */ X(n);
      e || (xt(n, r) && Re(o, "get", n), Re(o, "get", r));
      const { has: c } = Ha(o), d = t ? Rs : e ? Hi : vt;
      if (c.call(o, n))
        return d(s.get(n));
      if (c.call(o, r))
        return d(s.get(r));
      s !== o && s.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && Re(/* @__PURE__ */ X(n), "iterate", hi), n.size;
    },
    has(n) {
      const s = this.__v_raw, o = /* @__PURE__ */ X(s), r = /* @__PURE__ */ X(n);
      return e || (xt(n, r) && Re(o, "has", n), Re(o, "has", r)), n === r ? s.has(n) : s.has(n) || s.has(r);
    },
    forEach(n, s) {
      const o = this, r = o.__v_raw, c = /* @__PURE__ */ X(r), d = t ? Rs : e ? Hi : vt;
      return !e && Re(c, "iterate", hi), r.forEach((l, u) => n.call(s, d(l), d(u), o));
    }
  };
  return Ae(
    i,
    e ? {
      add: Ka("add"),
      set: Ka("set"),
      delete: Ka("delete"),
      clear: Ka("clear")
    } : {
      add(n) {
        const s = /* @__PURE__ */ X(this), o = Ha(s), r = /* @__PURE__ */ X(n), c = !t && !/* @__PURE__ */ He(n) && !/* @__PURE__ */ _t(n) ? r : n;
        return o.has.call(s, c) || xt(n, c) && o.has.call(s, n) || xt(r, c) && o.has.call(s, r) || (s.add(c), St(s, "add", c, c)), this;
      },
      set(n, s) {
        !t && !/* @__PURE__ */ He(s) && !/* @__PURE__ */ _t(s) && (s = /* @__PURE__ */ X(s));
        const o = /* @__PURE__ */ X(this), { has: r, get: c } = Ha(o);
        let d = r.call(o, n);
        d ? process.env.NODE_ENV !== "production" && nr(o, r, n) : (n = /* @__PURE__ */ X(n), d = r.call(o, n));
        const l = c.call(o, n);
        return o.set(n, s), d ? xt(s, l) && St(o, "set", n, s, l) : St(o, "add", n, s), this;
      },
      delete(n) {
        const s = /* @__PURE__ */ X(this), { has: o, get: r } = Ha(s);
        let c = o.call(s, n);
        c ? process.env.NODE_ENV !== "production" && nr(s, o, n) : (n = /* @__PURE__ */ X(n), c = o.call(s, n));
        const d = r ? r.call(s, n) : void 0, l = s.delete(n);
        return c && St(s, "delete", n, void 0, d), l;
      },
      clear() {
        const n = /* @__PURE__ */ X(this), s = n.size !== 0, o = process.env.NODE_ENV !== "production" ? bi(n) ? new Map(n) : new Set(n) : void 0, r = n.clear();
        return s && St(
          n,
          "clear",
          void 0,
          void 0,
          o
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((n) => {
    i[n] = sp(n, e, t);
  }), i;
}
function Hn(e, t) {
  const i = op(e, t);
  return (a, n, s) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? a : Reflect.get(
    ie(i, n) && n in a ? i : a,
    n,
    s
  );
}
const rp = {
  get: /* @__PURE__ */ Hn(!1, !1)
}, cp = {
  get: /* @__PURE__ */ Hn(!1, !0)
}, dp = {
  get: /* @__PURE__ */ Hn(!0, !1)
}, up = {
  get: /* @__PURE__ */ Hn(!0, !0)
};
function nr(e, t, i) {
  const a = /* @__PURE__ */ X(i);
  if (a !== i && t.call(e, a)) {
    const n = fo(e);
    ct(
      `Reactive ${n} contains both the raw and reactive versions of the same object${n === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const eu = /* @__PURE__ */ new WeakMap(), tu = /* @__PURE__ */ new WeakMap(), iu = /* @__PURE__ */ new WeakMap(), au = /* @__PURE__ */ new WeakMap();
function lp(e) {
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
function Kn(e) {
  return /* @__PURE__ */ _t(e) ? e : Wn(
    e,
    !1,
    tp,
    rp,
    eu
  );
}
// @__NO_SIDE_EFFECTS__
function fp(e) {
  return Wn(
    e,
    !1,
    ap,
    cp,
    tu
  );
}
// @__NO_SIDE_EFFECTS__
function Ps(e) {
  return Wn(
    e,
    !0,
    ip,
    dp,
    iu
  );
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  return Wn(
    e,
    !0,
    np,
    up,
    au
  );
}
function Wn(e, t, i, a, n) {
  if (!ae(e))
    return process.env.NODE_ENV !== "production" && ct(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = n.get(e);
  if (s)
    return s;
  const o = lp(fo(e));
  if (o === 0)
    return e;
  const r = new Proxy(
    e,
    o === 2 ? a : i
  );
  return n.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function ht(e) {
  return /* @__PURE__ */ _t(e) ? /* @__PURE__ */ ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Zi(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function X(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ X(t) : e;
}
function Ct(e) {
  return !ie(e, "__v_skip") && Object.isExtensible(e) && hn(e, "__v_skip", !0), e;
}
const vt = (e) => ae(e) ? /* @__PURE__ */ Kn(e) : e, Hi = (e) => ae(e) ? /* @__PURE__ */ Ps(e) : e;
// @__NO_SIDE_EFFECTS__
function ge(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Se(e) {
  return nu(e, !1);
}
// @__NO_SIDE_EFFECTS__
function pp(e) {
  return nu(e, !0);
}
function nu(e, t) {
  return /* @__PURE__ */ ge(e) ? e : new gp(e, t);
}
class gp {
  constructor(t, i) {
    this.dep = new ho(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = i ? t : /* @__PURE__ */ X(t), this._value = i ? t : vt(t), this.__v_isShallow = i;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const i = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ He(t) || /* @__PURE__ */ _t(t);
    t = a ? t : /* @__PURE__ */ X(t), xt(t, i) && (this._rawValue = t, this._value = a ? t : vt(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: i
    }) : this.dep.trigger());
  }
}
function mp(e) {
  e.dep && (process.env.NODE_ENV !== "production" ? e.dep.trigger({
    target: e,
    type: "set",
    key: "value",
    newValue: e._value
  }) : e.dep.trigger());
}
function V(e) {
  return /* @__PURE__ */ ge(e) ? e.value : e;
}
const bp = {
  get: (e, t, i) => t === "__v_raw" ? e : V(Reflect.get(e, t, i)),
  set: (e, t, i, a) => {
    const n = e[t];
    return /* @__PURE__ */ ge(n) && !/* @__PURE__ */ ge(i) ? (n.value = i, !0) : Reflect.set(e, t, i, a);
  }
};
function su(e) {
  return /* @__PURE__ */ ht(e) ? e : new Proxy(e, bp);
}
// @__NO_SIDE_EFFECTS__
function sr(e) {
  process.env.NODE_ENV !== "production" && !/* @__PURE__ */ Zi(e) && ct("toRefs() expects a reactive object but received a plain one.");
  const t = W(e) ? new Array(e.length) : {};
  for (const i in e)
    t[i] = ou(e, i);
  return t;
}
class hp {
  constructor(t, i, a) {
    this._object = t, this._defaultValue = a, this.__v_isRef = !0, this._value = void 0, this._key = rt(i) ? i : String(i), this._raw = /* @__PURE__ */ X(t);
    let n = !0, s = t;
    if (!W(t) || rt(this._key) || !zn(this._key))
      do
        n = !/* @__PURE__ */ Zi(s) || /* @__PURE__ */ He(s);
      while (n && (s = s.__v_raw));
    this._shallow = n;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = V(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ ge(this._raw[this._key])) {
      const i = this._object[this._key];
      if (/* @__PURE__ */ ge(i)) {
        i.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return Jf(this._raw, this._key);
  }
}
class _p {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function gs(e, t, i) {
  return /* @__PURE__ */ ge(e) ? e : G(e) ? new _p(e) : ae(e) && arguments.length > 1 ? ou(e, t, i) : /* @__PURE__ */ Se(e);
}
function ou(e, t, i) {
  return new hp(e, t, i);
}
class vp {
  constructor(t, i, a) {
    this.fn = t, this.setter = i, this._value = void 0, this.dep = new ho(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ya - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !i, this.isSSR = a;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    de !== this)
      return Zd(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Wd(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && ct("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function yp(e, t, i = !1) {
  let a, n;
  G(e) ? a = e : (a = e.get, n = e.set);
  const s = new vp(a, n, i);
  return process.env.NODE_ENV, s;
}
const Wa = {}, vn = /* @__PURE__ */ new WeakMap();
let ui;
function kp(e, t = !1, i = ui) {
  if (i) {
    let a = vn.get(i);
    a || vn.set(i, a = []), a.push(e);
  } else process.env.NODE_ENV !== "production" && !t && ct(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function wp(e, t, i = ue) {
  const { immediate: a, deep: n, once: s, scheduler: o, augmentJob: r, call: c } = i, d = (N) => {
    (i.onWarn || ct)(
      "Invalid watch source: ",
      N,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, l = (N) => n ? N : /* @__PURE__ */ He(N) || n === !1 || n === 0 ? Lt(N, 1) : Lt(N);
  let u, p, g, b, w = !1, E = !1;
  if (/* @__PURE__ */ ge(e) ? (p = () => e.value, w = /* @__PURE__ */ He(e)) : /* @__PURE__ */ ht(e) ? (p = () => l(e), w = !0) : W(e) ? (E = !0, w = e.some((N) => /* @__PURE__ */ ht(N) || /* @__PURE__ */ He(N)), p = () => e.map((N) => {
    if (/* @__PURE__ */ ge(N))
      return N.value;
    if (/* @__PURE__ */ ht(N))
      return l(N);
    if (G(N))
      return c ? c(N, 2) : N();
    process.env.NODE_ENV !== "production" && d(N);
  })) : G(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (g) {
      ut();
      try {
        g();
      } finally {
        lt();
      }
    }
    const N = ui;
    ui = u;
    try {
      return c ? c(e, 3, [b]) : e(b);
    } finally {
      ui = N;
    }
  } : (p = Pe, process.env.NODE_ENV !== "production" && d(e)), t && n) {
    const N = p, ee = n === !0 ? 1 / 0 : n;
    p = () => Lt(N(), ee);
  }
  const A = Ld(), z = () => {
    u.stop(), A && A.active && uo(A.effects, u);
  };
  if (s && t) {
    const N = t;
    t = (...ee) => {
      const B = N(...ee);
      return z(), B;
    };
  }
  let R = E ? new Array(e.length).fill(Wa) : Wa;
  const H = (N) => {
    if (!(!(u.flags & 1) || !u.dirty && !N))
      if (t) {
        const ee = u.run();
        if (N || n || w || (E ? ee.some((B, le) => xt(B, R[le])) : xt(ee, R))) {
          g && g();
          const B = ui;
          ui = u;
          try {
            const le = [
              ee,
              // pass undefined as the old value when it's changed for the first time
              R === Wa ? void 0 : E && R[0] === Wa ? [] : R,
              b
            ];
            R = ee, c ? c(t, 3, le) : (
              // @ts-expect-error
              t(...le)
            );
          } finally {
            ui = B;
          }
        }
      } else
        u.run();
  };
  return r && r(H), u = new Md(p), u.scheduler = o ? () => o(H, !1) : H, b = (N) => kp(N, !1, u), g = u.onStop = () => {
    const N = vn.get(u);
    if (N) {
      if (c)
        c(N, 4);
      else
        for (const ee of N) ee();
      vn.delete(u);
    }
  }, process.env.NODE_ENV !== "production" && (u.onTrack = i.onTrack, u.onTrigger = i.onTrigger), t ? a ? H(!0) : R = u.run() : o ? o(H.bind(null, !0), !0) : u.run(), z.pause = u.pause.bind(u), z.resume = u.resume.bind(u), z.stop = z, z;
}
function Lt(e, t = 1 / 0, i) {
  if (t <= 0 || !ae(e) || e.__v_skip || (i = i || /* @__PURE__ */ new Map(), (i.get(e) || 0) >= t))
    return e;
  if (i.set(e, t), t--, /* @__PURE__ */ ge(e))
    Lt(e.value, t, i);
  else if (W(e))
    for (let a = 0; a < e.length; a++)
      Lt(e[a], t, i);
  else if (Fn(e) || bi(e))
    e.forEach((a) => {
      Lt(a, t, i);
    });
  else if (Rd(e)) {
    for (const a in e)
      Lt(e[a], t, i);
    for (const a of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, a) && Lt(e[a], t, i);
  }
  return e;
}
const _i = [];
function an(e) {
  _i.push(e);
}
function nn() {
  _i.pop();
}
let ms = !1;
function S(e, ...t) {
  if (ms) return;
  ms = !0, ut();
  const i = _i.length ? _i[_i.length - 1].component : null, a = i && i.appContext.config.warnHandler, n = Ep();
  if (a)
    Yi(
      a,
      i,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var o, r;
          return (r = (o = s.toString) == null ? void 0 : o.call(s)) != null ? r : JSON.stringify(s);
        }).join(""),
        i && i.proxy,
        n.map(
          ({ vnode: s }) => `at <${Ua(i, s.type)}>`
        ).join(`
`),
        n
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    n.length && s.push(`
`, ...Ip(n)), console.warn(...s);
  }
  lt(), ms = !1;
}
function Ep() {
  let e = _i[_i.length - 1];
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
function Ip(e) {
  const t = [];
  return e.forEach((i, a) => {
    t.push(...a === 0 ? [] : [`
`], ...Tp(i));
  }), t;
}
function Tp({ vnode: e, recurseCount: t }) {
  const i = t > 0 ? `... (${t} recursive calls)` : "", a = e.component ? e.component.parent == null : !1, n = ` at <${Ua(
    e.component,
    e.type,
    a
  )}`, s = ">" + i;
  return e.props ? [n, ...Ap(e.props), s] : [n + s];
}
function Ap(e) {
  const t = [], i = Object.keys(e);
  return i.slice(0, 3).forEach((a) => {
    t.push(...ru(a, e[a]));
  }), i.length > 3 && t.push(" ..."), t;
}
function ru(e, t, i) {
  return _e(t) ? (t = JSON.stringify(t), i ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? i ? t : [`${e}=${t}`] : /* @__PURE__ */ ge(t) ? (t = ru(e, /* @__PURE__ */ X(t.value), !0), i ? t : [`${e}=Ref<`, t, ">"]) : G(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ X(t), i ? t : [`${e}=`, t]);
}
const _o = {
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
function Yi(e, t, i, a) {
  try {
    return a ? e(...a) : e();
  } catch (n) {
    $a(n, t, i);
  }
}
function yt(e, t, i, a) {
  if (G(e)) {
    const n = Yi(e, t, i, a);
    return n && lo(n) && n.catch((s) => {
      $a(s, t, i);
    }), n;
  }
  if (W(e)) {
    const n = [];
    for (let s = 0; s < e.length; s++)
      n.push(yt(e[s], t, i, a));
    return n;
  } else process.env.NODE_ENV !== "production" && S(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function $a(e, t, i, a = !0) {
  const n = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ue;
  if (t) {
    let r = t.parent;
    const c = t.proxy, d = process.env.NODE_ENV !== "production" ? _o[i] : `https://vuejs.org/error-reference/#runtime-${i}`;
    for (; r; ) {
      const l = r.ec;
      if (l) {
        for (let u = 0; u < l.length; u++)
          if (l[u](e, c, d) === !1)
            return;
      }
      r = r.parent;
    }
    if (s) {
      ut(), Yi(s, null, 10, [
        e,
        c,
        d
      ]), lt();
      return;
    }
  }
  Op(e, i, n, a, o);
}
function Op(e, t, i, a = !0, n = !1) {
  if (process.env.NODE_ENV !== "production") {
    const s = _o[t];
    if (i && an(i), S(`Unhandled error${s ? ` during execution of ${s}` : ""}`), i && nn(), a)
      throw e;
    console.error(e);
  } else {
    if (n)
      throw e;
    console.error(e);
  }
}
const Ge = [];
let At = -1;
const Ui = [];
let Yt = null, Ri = 0;
const cu = /* @__PURE__ */ Promise.resolve();
let yn = null;
const xp = 100;
function kn(e) {
  const t = yn || cu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Sp(e) {
  let t = At + 1, i = Ge.length;
  for (; t < i; ) {
    const a = t + i >>> 1, n = Ge[a], s = wa(n);
    s < e || s === e && n.flags & 2 ? t = a + 1 : i = a;
  }
  return t;
}
function qn(e) {
  if (!(e.flags & 1)) {
    const t = wa(e), i = Ge[Ge.length - 1];
    !i || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= wa(i) ? Ge.push(e) : Ge.splice(Sp(t), 0, e), e.flags |= 1, du();
  }
}
function du() {
  yn || (yn = cu.then(fu));
}
function uu(e) {
  W(e) ? Ui.push(...e) : Yt && e.id === -1 ? Yt.splice(Ri + 1, 0, e) : e.flags & 1 || (Ui.push(e), e.flags |= 1), du();
}
function or(e, t, i = At + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); i < Ge.length; i++) {
    const a = Ge[i];
    if (a && a.flags & 2) {
      if (e && a.id !== e.uid || process.env.NODE_ENV !== "production" && vo(t, a))
        continue;
      Ge.splice(i, 1), i--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function lu(e) {
  if (Ui.length) {
    const t = [...new Set(Ui)].sort(
      (i, a) => wa(i) - wa(a)
    );
    if (Ui.length = 0, Yt) {
      Yt.push(...t);
      return;
    }
    for (Yt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ri = 0; Ri < Yt.length; Ri++) {
      const i = Yt[Ri];
      process.env.NODE_ENV !== "production" && vo(e, i) || (i.flags & 4 && (i.flags &= -2), i.flags & 8 || i(), i.flags &= -2);
    }
    Yt = null, Ri = 0;
  }
}
const wa = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function fu(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (i) => vo(e, i) : Pe;
  try {
    for (At = 0; At < Ge.length; At++) {
      const i = Ge[At];
      if (i && !(i.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(i))
          continue;
        i.flags & 4 && (i.flags &= -2), Yi(
          i,
          i.i,
          i.i ? 15 : 14
        ), i.flags & 4 || (i.flags &= -2);
      }
    }
  } finally {
    for (; At < Ge.length; At++) {
      const i = Ge[At];
      i && (i.flags &= -2);
    }
    At = -1, Ge.length = 0, lu(e), yn = null, (Ge.length || Ui.length) && fu(e);
  }
}
function vo(e, t) {
  const i = e.get(t) || 0;
  if (i > xp) {
    const a = t.i, n = a && qu(a.type);
    return $a(
      `Maximum recursive updates exceeded${n ? ` in component <${n}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, i + 1), !1;
}
let nt = !1;
const rr = (e) => {
  try {
    return nt;
  } finally {
    nt = e;
  }
}, sn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Ra().__VUE_HMR_RUNTIME__ = {
  createRecord: bs(pu),
  rerender: bs(Dp),
  reload: bs(Vp)
});
const wi = /* @__PURE__ */ new Map();
function Np(e) {
  const t = e.type.__hmrId;
  let i = wi.get(t);
  i || (pu(t, e.type), i = wi.get(t)), i.instances.add(e);
}
function Cp(e) {
  wi.get(e.type.__hmrId).instances.delete(e);
}
function pu(e, t) {
  return wi.has(e) ? !1 : (wi.set(e, {
    initialDef: wn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function wn(e) {
  return Gu(e) ? e.__vccOpts : e;
}
function Dp(e, t) {
  const i = wi.get(e);
  i && (i.initialDef.render = t, [...i.instances].forEach((a) => {
    t && (a.render = t, wn(a.type).render = t), a.renderCache = [], nt = !0, a.job.flags & 8 || a.update(), nt = !1;
  }));
}
function Vp(e, t) {
  const i = wi.get(e);
  if (!i) return;
  t = wn(t), cr(i.initialDef, t);
  const a = [...i.instances];
  for (let n = 0; n < a.length; n++) {
    const s = a[n], o = wn(s.type);
    let r = sn.get(o);
    r || (o !== i.initialDef && cr(o, t), sn.set(o, r = /* @__PURE__ */ new Set())), r.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (r.add(s), s.ceReload(t.styles), r.delete(s)) : s.parent ? qn(() => {
      s.job.flags & 8 || (nt = !0, s.parent.update(), nt = !1, r.delete(s));
    }) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), s.root.ce && s !== s.root && s.root.ce._removeChildStyle(o);
  }
  uu(() => {
    sn.clear();
  });
}
function cr(e, t) {
  Ae(e, t);
  for (const i in e)
    i !== "__file" && !(i in t) && delete e[i];
}
function bs(e) {
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
let mt, oa = [], $s = !1;
function ja(e, ...t) {
  mt ? mt.emit(e, ...t) : $s || oa.push({ event: e, args: t });
}
function yo(e, t) {
  var i, a;
  mt = e, mt ? (mt.enabled = !0, oa.forEach(({ event: n, args: s }) => mt.emit(n, ...s)), oa = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((a = (i = window.navigator) == null ? void 0 : i.userAgent) != null && a.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    yo(s, t);
  }), setTimeout(() => {
    mt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, $s = !0, oa = []);
  }, 3e3)) : ($s = !0, oa = []);
}
function Rp(e, t) {
  ja("app:init", e, t, {
    Fragment: Qe,
    Text: Fa,
    Comment: ot,
    Static: cn
  });
}
function Pp(e) {
  ja("app:unmount", e);
}
const $p = /* @__PURE__ */ ko(
  "component:added"
  /* COMPONENT_ADDED */
), gu = /* @__PURE__ */ ko(
  "component:updated"
  /* COMPONENT_UPDATED */
), jp = /* @__PURE__ */ ko(
  "component:removed"
  /* COMPONENT_REMOVED */
), Fp = (e) => {
  mt && typeof mt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !mt.cleanupBuffer(e) && jp(e);
};
// @__NO_SIDE_EFFECTS__
function ko(e) {
  return (t) => {
    ja(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const zp = /* @__PURE__ */ mu(
  "perf:start"
  /* PERFORMANCE_START */
), Up = /* @__PURE__ */ mu(
  "perf:end"
  /* PERFORMANCE_END */
);
function mu(e) {
  return (t, i, a) => {
    ja(e, t.appContext.app, t.uid, t, i, a);
  };
}
function Lp(e, t, i) {
  ja(
    "component:emit",
    e.appContext.app,
    e,
    t,
    i
  );
}
let Ye = null, bu = null;
function En(e) {
  const t = Ye;
  return Ye = e, bu = e && e.type.__scopeId || null, t;
}
function Mp(e, t = Ye, i) {
  if (!t || e._n)
    return e;
  const a = (...n) => {
    a._d && Er(-1);
    const s = En(t);
    let o;
    try {
      o = e(...n);
    } finally {
      En(s), a._d && Er(1);
    }
    return process.env.NODE_ENV !== "production" && gu(t), o;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function hu(e) {
  Cf(e) && S("Do not use built-in directive ids as custom directive id: " + e);
}
function qa(e, t) {
  if (Ye === null)
    return process.env.NODE_ENV !== "production" && S("withDirectives can only be used inside render functions."), e;
  const i = Qn(Ye), a = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [s, o, r, c = ue] = t[n];
    s && (G(s) && (s = {
      mounted: s,
      updated: s
    }), s.deep && Lt(o), a.push({
      dir: s,
      instance: i,
      value: o,
      oldValue: void 0,
      arg: r,
      modifiers: c
    }));
  }
  return e;
}
function ri(e, t, i, a) {
  const n = e.dirs, s = t && t.dirs;
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    s && (r.oldValue = s[o].value);
    let c = r.dir[a];
    c && (ut(), yt(c, i, 8, [
      e.el,
      r,
      e,
      t
    ]), lt());
  }
}
function Bp(e, t) {
  if (process.env.NODE_ENV !== "production" && (!Ve || Ve.isMounted) && S("provide() can only be used inside setup()."), Ve) {
    let i = Ve.provides;
    const a = Ve.parent && Ve.parent.provides;
    a === i && (i = Ve.provides = Object.create(a)), i[e] = t;
  }
}
function vi(e, t, i = !1) {
  const a = Xn();
  if (a || ki) {
    let n = ki ? ki._context.provides : a ? a.parent == null || a.ce ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (n && e in n)
      return n[e];
    if (arguments.length > 1)
      return i && G(t) ? t.call(a && a.proxy) : t;
    process.env.NODE_ENV !== "production" && S(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && S("inject() can only be used inside setup() or functional components.");
}
function js() {
  return !!(Xn() || ki);
}
const Zp = /* @__PURE__ */ Symbol.for("v-scx"), Hp = () => {
  {
    const e = vi(Zp);
    return e || process.env.NODE_ENV !== "production" && S(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Li(e, t, i) {
  return process.env.NODE_ENV !== "production" && !G(t) && S(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), _u(e, t, i);
}
function _u(e, t, i = ue) {
  const { immediate: a, deep: n, flush: s, once: o } = i;
  process.env.NODE_ENV !== "production" && !t && (a !== void 0 && S(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), n !== void 0 && S(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && S(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const r = Ae({}, i);
  process.env.NODE_ENV !== "production" && (r.onWarn = S);
  const c = t && a || !t && s !== "post";
  let d;
  if (Ia) {
    if (s === "sync") {
      const g = Hp();
      d = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!c) {
      const g = () => {
      };
      return g.stop = Pe, g.resume = Pe, g.pause = Pe, g;
    }
  }
  const l = Ve;
  r.call = (g, b, w) => yt(g, l, b, w);
  let u = !1;
  s === "post" ? r.scheduler = (g) => {
    Xe(g, l && l.suspense);
  } : s !== "sync" && (u = !0, r.scheduler = (g, b) => {
    b ? g() : qn(g);
  }), r.augmentJob = (g) => {
    t && (g.flags |= 4), u && (g.flags |= 2, l && (g.id = l.uid, g.i = l));
  };
  const p = wp(e, t, r);
  return Ia && (d ? d.push(p) : c && p()), p;
}
function Kp(e, t, i) {
  const a = this.proxy, n = _e(e) ? e.includes(".") ? vu(a, e) : () => a[e] : e.bind(a, a);
  let s;
  G(t) ? s = t : (s = t.handler, i = t);
  const o = za(this), r = _u(n, s.bind(a), i);
  return o(), r;
}
function vu(e, t) {
  const i = t.split(".");
  return () => {
    let a = e;
    for (let n = 0; n < i.length && a; n++)
      a = a[i[n]];
    return a;
  };
}
const Wp = /* @__PURE__ */ Symbol("_vte"), qp = (e) => e.__isTeleport, hs = /* @__PURE__ */ Symbol("_leaveCb");
function wo(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, wo(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function yu(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Ae({ name: e.name }, t, { setup: e })
  ) : e;
}
function ku(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const dr = /* @__PURE__ */ new WeakSet();
function ur(e, t) {
  let i;
  return !!((i = Object.getOwnPropertyDescriptor(e, t)) && !i.configurable);
}
const In = /* @__PURE__ */ new WeakMap();
function ma(e, t, i, a, n = !1) {
  if (W(e)) {
    e.forEach(
      (w, E) => ma(
        w,
        t && (W(t) ? t[E] : t),
        i,
        a,
        n
      )
    );
    return;
  }
  if (ba(a) && !n) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && ma(e, t, i, a.component.subTree);
    return;
  }
  const s = a.shapeFlag & 4 ? Qn(a.component) : a.el, o = n ? null : s, { i: r, r: c } = e;
  if (process.env.NODE_ENV !== "production" && !r) {
    S(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, l = r.refs === ue ? r.refs = {} : r.refs, u = r.setupState, p = /* @__PURE__ */ X(u), g = u === ue ? Dd : (w) => process.env.NODE_ENV !== "production" && (ie(p, w) && !/* @__PURE__ */ ge(p[w]) && S(
    `Template ref "${w}" used on a non-ref value. It will not work in the production build.`
  ), dr.has(p[w])) || ur(l, w) ? !1 : ie(p, w), b = (w, E) => !(process.env.NODE_ENV !== "production" && dr.has(w) || E && ur(l, E));
  if (d != null && d !== c) {
    if (lr(t), _e(d))
      l[d] = null, g(d) && (u[d] = null);
    else if (/* @__PURE__ */ ge(d)) {
      const w = t;
      b(d, w.k) && (d.value = null), w.k && (l[w.k] = null);
    }
  }
  if (G(c)) {
    ut();
    try {
      Yi(c, r, 12, [o, l]);
    } finally {
      lt();
    }
  } else {
    const w = _e(c), E = /* @__PURE__ */ ge(c);
    if (w || E) {
      const A = () => {
        if (e.f) {
          const z = w ? g(c) ? u[c] : l[c] : b(c) || !e.k ? c.value : l[e.k];
          if (n)
            W(z) && uo(z, s);
          else if (W(z))
            z.includes(s) || z.push(s);
          else if (w)
            l[c] = [s], g(c) && (u[c] = l[c]);
          else {
            const R = [s];
            b(c, e.k) && (c.value = R), e.k && (l[e.k] = R);
          }
        } else w ? (l[c] = o, g(c) && (u[c] = o)) : E ? (b(c, e.k) && (c.value = o), e.k && (l[e.k] = o)) : process.env.NODE_ENV !== "production" && S("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (o) {
        const z = () => {
          A(), In.delete(e);
        };
        z.id = -1, In.set(e, z), Xe(z, i);
      } else
        lr(e), A();
    } else process.env.NODE_ENV !== "production" && S("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function lr(e) {
  const t = In.get(e);
  t && (t.flags |= 8, In.delete(e));
}
Ra().requestIdleCallback;
Ra().cancelIdleCallback;
const ba = (e) => !!e.type.__asyncLoader, Eo = (e) => e.type.__isKeepAlive;
function Gp(e, t) {
  wu(e, "a", t);
}
function Jp(e, t) {
  wu(e, "da", t);
}
function wu(e, t, i = Ve) {
  const a = e.__wdc || (e.__wdc = () => {
    let n = i;
    for (; n; ) {
      if (n.isDeactivated)
        return;
      n = n.parent;
    }
    return e();
  });
  if (Gn(t, a, i), i) {
    let n = i.parent;
    for (; n && n.parent; )
      Eo(n.parent.vnode) && Yp(a, t, i, n), n = n.parent;
  }
}
function Yp(e, t, i, a) {
  const n = Gn(
    t,
    e,
    a,
    !0
    /* prepend */
  );
  Eu(() => {
    uo(a[t], n);
  }, i);
}
function Gn(e, t, i = Ve, a = !1) {
  if (i) {
    const n = i[e] || (i[e] = []), s = t.__weh || (t.__weh = (...o) => {
      ut();
      const r = za(i), c = yt(t, i, e, o);
      return r(), lt(), c;
    });
    return a ? n.unshift(s) : n.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const n = di(_o[e].replace(/ hook$/, ""));
    S(
      `${n} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const Wt = (e) => (t, i = Ve) => {
  (!Ia || e === "sp") && Gn(e, (...a) => t(...a), i);
}, Xp = Wt("bm"), Qp = Wt("m"), eg = Wt(
  "bu"
), tg = Wt("u"), Io = Wt(
  "bum"
), Eu = Wt("um"), ig = Wt(
  "sp"
), ag = Wt("rtg"), ng = Wt("rtc");
function sg(e, t = Ve) {
  Gn("ec", e, t);
}
const og = /* @__PURE__ */ Symbol.for("v-ndc");
function on(e, t, i, a) {
  let n;
  const s = i, o = W(e);
  if (o || _e(e)) {
    const r = o && /* @__PURE__ */ ht(e);
    let c = !1, d = !1;
    r && (c = !/* @__PURE__ */ He(e), d = /* @__PURE__ */ _t(e), e = Zn(e)), n = new Array(e.length);
    for (let l = 0, u = e.length; l < u; l++)
      n[l] = t(
        c ? d ? Hi(vt(e[l])) : vt(e[l]) : e[l],
        l,
        void 0,
        s
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      S(
        `The v-for range expects a positive integer value but got ${e}.`
      ), n = [];
    else {
      n = new Array(e);
      for (let r = 0; r < e; r++)
        n[r] = t(r + 1, r, void 0, s);
    }
  else if (ae(e))
    if (e[Symbol.iterator])
      n = Array.from(
        e,
        (r, c) => t(r, c, void 0, s)
      );
    else {
      const r = Object.keys(e);
      n = new Array(r.length);
      for (let c = 0, d = r.length; c < d; c++) {
        const l = r[c];
        n[c] = t(e[l], l, c, s);
      }
    }
  else
    n = [];
  return n;
}
const Fs = (e) => e ? Ku(e) ? Qn(e) : Fs(e.parent) : null, yi = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ae(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.refs) : e.refs,
    $parent: (e) => Fs(e.parent),
    $root: (e) => Fs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Au(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      qn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => Kp.bind(e)
  })
), To = (e) => e === "_" || e === "$", _s = (e, t) => e !== ue && !e.__isScriptSetup && ie(e, t), Iu = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: i, setupState: a, data: n, props: s, accessCache: o, type: r, appContext: c } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const p = o[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return a[t];
          case 2:
            return n[t];
          case 4:
            return i[t];
          case 3:
            return s[t];
        }
      else {
        if (_s(a, t))
          return o[t] = 1, a[t];
        if (n !== ue && ie(n, t))
          return o[t] = 2, n[t];
        if (ie(s, t))
          return o[t] = 3, s[t];
        if (i !== ue && ie(i, t))
          return o[t] = 4, i[t];
        zs && (o[t] = 0);
      }
    }
    const d = yi[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (Re(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && An()) : process.env.NODE_ENV !== "production" && t === "$slots" && Re(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = r.__cssModules) && (l = l[t])
    )
      return l;
    if (i !== ue && ie(i, t))
      return o[t] = 4, i[t];
    if (
      // global properties
      u = c.config.globalProperties, ie(u, t)
    )
      return u[t];
    process.env.NODE_ENV !== "production" && Ye && (!_e(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (n !== ue && To(t[0]) && ie(n, t) ? S(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Ye && S(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, i) {
    const { data: a, setupState: n, ctx: s } = e;
    return _s(n, t) ? (n[t] = i, !0) : process.env.NODE_ENV !== "production" && n.__isScriptSetup && ie(n, t) ? (S(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : a !== ue && ie(a, t) ? (a[t] = i, !0) : ie(e.props, t) ? (process.env.NODE_ENV !== "production" && S(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && S(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: i
    }) : s[t] = i, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: i, ctx: a, appContext: n, props: s, type: o }
  }, r) {
    let c;
    return !!(i[r] || e !== ue && r[0] !== "$" && ie(e, r) || _s(t, r) || ie(s, r) || ie(a, r) || ie(yi, r) || ie(n.config.globalProperties, r) || (c = o.__cssModules) && c[r]);
  },
  defineProperty(e, t, i) {
    return i.get != null ? e._.accessCache[t] = 0 : ie(i, "value") && this.set(e, t, i.value, null), Reflect.defineProperty(e, t, i);
  }
};
process.env.NODE_ENV !== "production" && (Iu.ownKeys = (e) => (S(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function rg(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(yi).forEach((i) => {
    Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !1,
      get: () => yi[i](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Pe
    });
  }), t;
}
function cg(e) {
  const {
    ctx: t,
    propsOptions: [i]
  } = e;
  i && Object.keys(i).forEach((a) => {
    Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[a],
      set: Pe
    });
  });
}
function dg(e) {
  const { ctx: t, setupState: i } = e;
  Object.keys(/* @__PURE__ */ X(i)).forEach((a) => {
    if (!i.__isScriptSetup) {
      if (To(a[0])) {
        S(
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
        set: Pe
      });
    }
  });
}
function fr(e) {
  return W(e) ? e.reduce(
    (t, i) => (t[i] = null, t),
    {}
  ) : e;
}
function ug() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, i) => {
    e[i] ? S(`${t} property "${i}" is already defined in ${e[i]}.`) : e[i] = t;
  };
}
let zs = !0;
function lg(e) {
  const t = Au(e), i = e.proxy, a = e.ctx;
  zs = !1, t.beforeCreate && pr(t.beforeCreate, e, "bc");
  const {
    // state
    data: n,
    computed: s,
    methods: o,
    watch: r,
    provide: c,
    inject: d,
    // lifecycle
    created: l,
    beforeMount: u,
    mounted: p,
    beforeUpdate: g,
    updated: b,
    activated: w,
    deactivated: E,
    beforeDestroy: A,
    beforeUnmount: z,
    destroyed: R,
    unmounted: H,
    render: N,
    renderTracked: ee,
    renderTriggered: B,
    errorCaptured: le,
    serverPrefetch: q,
    // public API
    expose: j,
    inheritAttrs: $,
    // assets
    components: Q,
    directives: re,
    filters: Ce
  } = t, je = process.env.NODE_ENV !== "production" ? ug() : null;
  if (process.env.NODE_ENV !== "production") {
    const [P] = e.propsOptions;
    if (P)
      for (const J in P)
        je("Props", J);
  }
  if (d && fg(d, a, je), o)
    for (const P in o) {
      const J = o[P];
      G(J) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(a, P, {
        value: J.bind(i),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : a[P] = J.bind(i), process.env.NODE_ENV !== "production" && je("Methods", P)) : process.env.NODE_ENV !== "production" && S(
        `Method "${P}" has type "${typeof J}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (n) {
    process.env.NODE_ENV !== "production" && !G(n) && S(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const P = n.call(i, i);
    if (process.env.NODE_ENV !== "production" && lo(P) && S(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !ae(P))
      process.env.NODE_ENV !== "production" && S("data() should return an object.");
    else if (e.data = /* @__PURE__ */ Kn(P), process.env.NODE_ENV !== "production")
      for (const J in P)
        je("Data", J), To(J[0]) || Object.defineProperty(a, J, {
          configurable: !0,
          enumerable: !0,
          get: () => P[J],
          set: Pe
        });
  }
  if (zs = !0, s)
    for (const P in s) {
      const J = s[P], te = G(J) ? J.bind(i, i) : G(J.get) ? J.get.bind(i, i) : Pe;
      process.env.NODE_ENV !== "production" && te === Pe && S(`Computed property "${P}" has no getter.`);
      const Me = !G(J) && G(J.set) ? J.set.bind(i) : process.env.NODE_ENV !== "production" ? () => {
        S(
          `Write operation failed: computed property "${P}" is readonly.`
        );
      } : Pe, Ue = Xt({
        get: te,
        set: Me
      });
      Object.defineProperty(a, P, {
        enumerable: !0,
        configurable: !0,
        get: () => Ue.value,
        set: (Oe) => Ue.value = Oe
      }), process.env.NODE_ENV !== "production" && je("Computed", P);
    }
  if (r)
    for (const P in r)
      Tu(r[P], a, i, P);
  if (c) {
    const P = G(c) ? c.call(i) : c;
    Reflect.ownKeys(P).forEach((J) => {
      Bp(J, P[J]);
    });
  }
  l && pr(l, e, "c");
  function pe(P, J) {
    W(J) ? J.forEach((te) => P(te.bind(i))) : J && P(J.bind(i));
  }
  if (pe(Xp, u), pe(Qp, p), pe(eg, g), pe(tg, b), pe(Gp, w), pe(Jp, E), pe(sg, le), pe(ng, ee), pe(ag, B), pe(Io, z), pe(Eu, H), pe(ig, q), W(j))
    if (j.length) {
      const P = e.exposed || (e.exposed = {});
      j.forEach((J) => {
        Object.defineProperty(P, J, {
          get: () => i[J],
          set: (te) => i[J] = te,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === Pe && (e.render = N), $ != null && (e.inheritAttrs = $), Q && (e.components = Q), re && (e.directives = re), q && ku(e);
}
function fg(e, t, i = Pe) {
  W(e) && (e = Us(e));
  for (const a in e) {
    const n = e[a];
    let s;
    ae(n) ? "default" in n ? s = vi(
      n.from || a,
      n.default,
      !0
    ) : s = vi(n.from || a) : s = vi(n), /* @__PURE__ */ ge(s) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (o) => s.value = o
    }) : t[a] = s, process.env.NODE_ENV !== "production" && i("Inject", a);
  }
}
function pr(e, t, i) {
  yt(
    W(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy),
    t,
    i
  );
}
function Tu(e, t, i, a) {
  let n = a.includes(".") ? vu(i, a) : () => i[a];
  if (_e(e)) {
    const s = t[e];
    G(s) ? Li(n, s) : process.env.NODE_ENV !== "production" && S(`Invalid watch handler specified by key "${e}"`, s);
  } else if (G(e))
    Li(n, e.bind(i));
  else if (ae(e))
    if (W(e))
      e.forEach((s) => Tu(s, t, i, a));
    else {
      const s = G(e.handler) ? e.handler.bind(i) : t[e.handler];
      G(s) ? Li(n, s, e) : process.env.NODE_ENV !== "production" && S(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else process.env.NODE_ENV !== "production" && S(`Invalid watch option: "${a}"`, e);
}
function Au(e) {
  const t = e.type, { mixins: i, extends: a } = t, {
    mixins: n,
    optionsCache: s,
    config: { optionMergeStrategies: o }
  } = e.appContext, r = s.get(t);
  let c;
  return r ? c = r : !n.length && !i && !a ? c = t : (c = {}, n.length && n.forEach(
    (d) => Tn(c, d, o, !0)
  ), Tn(c, t, o)), ae(t) && s.set(t, c), c;
}
function Tn(e, t, i, a = !1) {
  const { mixins: n, extends: s } = t;
  s && Tn(e, s, i, !0), n && n.forEach(
    (o) => Tn(e, o, i, !0)
  );
  for (const o in t)
    if (a && o === "expose")
      process.env.NODE_ENV !== "production" && S(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const r = pg[o] || i && i[o];
      e[o] = r ? r(e[o], t[o]) : t[o];
    }
  return e;
}
const pg = {
  data: gr,
  props: mr,
  emits: mr,
  // objects
  methods: ra,
  computed: ra,
  // lifecycle
  beforeCreate: We,
  created: We,
  beforeMount: We,
  mounted: We,
  beforeUpdate: We,
  updated: We,
  beforeDestroy: We,
  beforeUnmount: We,
  destroyed: We,
  unmounted: We,
  activated: We,
  deactivated: We,
  errorCaptured: We,
  serverPrefetch: We,
  // assets
  components: ra,
  directives: ra,
  // watch
  watch: mg,
  // provide / inject
  provide: gr,
  inject: gg
};
function gr(e, t) {
  return t ? e ? function() {
    return Ae(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function gg(e, t) {
  return ra(Us(e), Us(t));
}
function Us(e) {
  if (W(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++)
      t[e[i]] = e[i];
    return t;
  }
  return e;
}
function We(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ra(e, t) {
  return e ? Ae(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function mr(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Ae(
    /* @__PURE__ */ Object.create(null),
    fr(e),
    fr(t ?? {})
  ) : t;
}
function mg(e, t) {
  if (!e) return t;
  if (!t) return e;
  const i = Ae(/* @__PURE__ */ Object.create(null), e);
  for (const a in t)
    i[a] = We(e[a], t[a]);
  return i;
}
function Ou() {
  return {
    app: null,
    config: {
      isNativeTag: Dd,
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
let bg = 0;
function hg(e, t) {
  return function(a, n = null) {
    G(a) || (a = Ae({}, a)), n != null && !ae(n) && (process.env.NODE_ENV !== "production" && S("root props passed to app.mount() must be an object."), n = null);
    const s = Ou(), o = /* @__PURE__ */ new WeakSet(), r = [];
    let c = !1;
    const d = s.app = {
      _uid: bg++,
      _component: a,
      _props: n,
      _container: null,
      _context: s,
      _instance: null,
      version: Or,
      get config() {
        return s.config;
      },
      set config(l) {
        process.env.NODE_ENV !== "production" && S(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(l, ...u) {
        return o.has(l) ? process.env.NODE_ENV !== "production" && S("Plugin has already been applied to target app.") : l && G(l.install) ? (o.add(l), l.install(d, ...u)) : G(l) ? (o.add(l), l(d, ...u)) : process.env.NODE_ENV !== "production" && S(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(l) {
        return s.mixins.includes(l) ? process.env.NODE_ENV !== "production" && S(
          "Mixin has already been applied to target app" + (l.name ? `: ${l.name}` : "")
        ) : s.mixins.push(l), d;
      },
      component(l, u) {
        return process.env.NODE_ENV !== "production" && Hs(l, s.config), u ? (process.env.NODE_ENV !== "production" && s.components[l] && S(`Component "${l}" has already been registered in target app.`), s.components[l] = u, d) : s.components[l];
      },
      directive(l, u) {
        return process.env.NODE_ENV !== "production" && hu(l), u ? (process.env.NODE_ENV !== "production" && s.directives[l] && S(`Directive "${l}" has already been registered in target app.`), s.directives[l] = u, d) : s.directives[l];
      },
      mount(l, u, p) {
        if (c)
          process.env.NODE_ENV !== "production" && S(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && l.__vue_app__ && S(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const g = d._ceVNode || Dt(a, n);
          return g.appContext = s, p === !0 ? p = "svg" : p === !1 && (p = void 0), process.env.NODE_ENV !== "production" && (s.reload = () => {
            const b = ti(g);
            b.el = null, e(b, l, p);
          }), e(g, l, p), c = !0, d._container = l, l.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = g.component, Rp(d, Or)), Qn(g.component);
        }
      },
      onUnmount(l) {
        process.env.NODE_ENV !== "production" && typeof l != "function" && S(
          `Expected function as first argument to app.onUnmount(), but got ${typeof l}`
        ), r.push(l);
      },
      unmount() {
        c ? (yt(
          r,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Pp(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && S("Cannot unmount an app that is not mounted.");
      },
      provide(l, u) {
        return process.env.NODE_ENV !== "production" && l in s.provides && (ie(s.provides, l) ? S(
          `App already provides property with key "${String(l)}". It will be overwritten with the new value.`
        ) : S(
          `App already provides property with key "${String(l)}" inherited from its parent element. It will be overwritten with the new value.`
        )), s.provides[l] = u, d;
      },
      runWithContext(l) {
        const u = ki;
        ki = d;
        try {
          return l();
        } finally {
          ki = u;
        }
      }
    };
    return d;
  };
}
let ki = null;
const _g = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${et(t)}Modifiers`] || e[`${ei(t)}Modifiers`];
function vg(e, t, ...i) {
  if (e.isUnmounted) return;
  const a = e.vnode.props || ue;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: l,
      propsOptions: [u]
    } = e;
    if (l)
      if (!(t in l))
        (!u || !(di(et(t)) in u)) && S(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${di(et(t))}" prop.`
        );
      else {
        const p = l[t];
        G(p) && (p(...i) || S(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let n = i;
  const s = t.startsWith("update:"), o = s && _g(a, t.slice(7));
  if (o && (o.trim && (n = i.map((l) => _e(l) ? l.trim() : l)), o.number && (n = i.map(po))), process.env.NODE_ENV !== "production" && Lp(e, t, n), process.env.NODE_ENV !== "production") {
    const l = t.toLowerCase();
    l !== t && a[di(l)] && S(
      `Event "${l}" is emitted in component ${Ua(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ei(
        t
      )}" instead of "${t}".`
    );
  }
  let r, c = a[r = di(t)] || // also try camelCase event handler (#2249)
  a[r = di(et(t))];
  !c && s && (c = a[r = di(ei(t))]), c && yt(
    c,
    e,
    6,
    n
  );
  const d = a[r + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[r])
      return;
    e.emitted[r] = !0, yt(
      d,
      e,
      6,
      n
    );
  }
}
const yg = /* @__PURE__ */ new WeakMap();
function xu(e, t, i = !1) {
  const a = i ? yg : t.emitsCache, n = a.get(e);
  if (n !== void 0)
    return n;
  const s = e.emits;
  let o = {}, r = !1;
  if (!G(e)) {
    const c = (d) => {
      const l = xu(d, t, !0);
      l && (r = !0, Ae(o, l));
    };
    !i && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !s && !r ? (ae(e) && a.set(e, null), null) : (W(s) ? s.forEach((c) => o[c] = null) : Ae(o, s), ae(e) && a.set(e, o), o);
}
function Jn(e, t) {
  return !e || !Da(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ie(e, t[0].toLowerCase() + t.slice(1)) || ie(e, ei(t)) || ie(e, t));
}
let Ls = !1;
function An() {
  Ls = !0;
}
function br(e) {
  const {
    type: t,
    vnode: i,
    proxy: a,
    withProxy: n,
    propsOptions: [s],
    slots: o,
    attrs: r,
    emit: c,
    render: d,
    renderCache: l,
    props: u,
    data: p,
    setupState: g,
    ctx: b,
    inheritAttrs: w
  } = e, E = En(e);
  let A, z;
  process.env.NODE_ENV !== "production" && (Ls = !1);
  try {
    if (i.shapeFlag & 4) {
      const N = n || a, ee = process.env.NODE_ENV !== "production" && g.__isScriptSetup ? new Proxy(N, {
        get(B, le, q) {
          return S(
            `Property '${String(
              le
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(B, le, q);
        }
      }) : N;
      A = gt(
        d.call(
          ee,
          N,
          l,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(u) : u,
          g,
          p,
          b
        )
      ), z = r;
    } else {
      const N = t;
      process.env.NODE_ENV !== "production" && r === u && An(), A = gt(
        N.length > 1 ? N(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(u) : u,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return An(), /* @__PURE__ */ Nt(r);
            },
            slots: o,
            emit: c
          } : { attrs: r, slots: o, emit: c }
        ) : N(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(u) : u,
          null
        )
      ), z = t.props ? r : kg(r);
    }
  } catch (N) {
    ha.length = 0, $a(N, e, 1), A = Dt(ot);
  }
  let R = A, H;
  if (process.env.NODE_ENV !== "production" && A.patchFlag > 0 && A.patchFlag & 2048 && ([R, H] = Su(A)), z && w !== !1) {
    const N = Object.keys(z), { shapeFlag: ee } = R;
    if (N.length) {
      if (ee & 7)
        s && N.some(va) && (z = wg(
          z,
          s
        )), R = ti(R, z, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Ls && R.type !== ot) {
        const B = Object.keys(r), le = [], q = [];
        for (let j = 0, $ = B.length; j < $; j++) {
          const Q = B[j];
          Da(Q) ? va(Q) || le.push(Q[2].toLowerCase() + Q.slice(3)) : q.push(Q);
        }
        q.length && S(
          `Extraneous non-props attributes (${q.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), le.length && S(
          `Extraneous non-emits event listeners (${le.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return i.dirs && (process.env.NODE_ENV !== "production" && !hr(R) && S(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), R = ti(R, null, !1, !0), R.dirs = R.dirs ? R.dirs.concat(i.dirs) : i.dirs), i.transition && (process.env.NODE_ENV !== "production" && !hr(R) && S(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), wo(R, i.transition)), process.env.NODE_ENV !== "production" && H ? H(R) : A = R, En(E), A;
}
const Su = (e) => {
  const t = e.children, i = e.dynamicChildren, a = Ao(t, !1);
  if (a) {
    if (process.env.NODE_ENV !== "production" && a.patchFlag > 0 && a.patchFlag & 2048)
      return Su(a);
  } else return [e, void 0];
  const n = t.indexOf(a), s = i ? i.indexOf(a) : -1, o = (r) => {
    t[n] = r, i && (s > -1 ? i[s] = r : r.patchFlag > 0 && (e.dynamicChildren = [...i, r]));
  };
  return [gt(a), o];
};
function Ao(e, t = !0) {
  let i;
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    if (Yn(n)) {
      if (n.type !== ot || n.children === "v-if") {
        if (i)
          return;
        if (i = n, process.env.NODE_ENV !== "production" && t && i.patchFlag > 0 && i.patchFlag & 2048)
          return Ao(i.children);
      }
    } else
      return;
  }
  return i;
}
const kg = (e) => {
  let t;
  for (const i in e)
    (i === "class" || i === "style" || Da(i)) && ((t || (t = {}))[i] = e[i]);
  return t;
}, wg = (e, t) => {
  const i = {};
  for (const a in e)
    (!va(a) || !(a.slice(9) in t)) && (i[a] = e[a]);
  return i;
}, hr = (e) => e.shapeFlag & 7 || e.type === ot;
function Eg(e, t, i) {
  const { props: a, children: n, component: s } = e, { props: o, children: r, patchFlag: c } = t, d = s.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (n || r) && nt || t.dirs || t.transition)
    return !0;
  if (i && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return a ? _r(a, o, d) : !!o;
    if (c & 8) {
      const l = t.dynamicProps;
      for (let u = 0; u < l.length; u++) {
        const p = l[u];
        if (Nu(o, a, p) && !Jn(d, p))
          return !0;
      }
    }
  } else
    return (n || r) && (!r || !r.$stable) ? !0 : a === o ? !1 : a ? o ? _r(a, o, d) : !0 : !!o;
  return !1;
}
function _r(e, t, i) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length)
    return !0;
  for (let n = 0; n < a.length; n++) {
    const s = a[n];
    if (Nu(t, e, s) && !Jn(i, s))
      return !0;
  }
  return !1;
}
function Nu(e, t, i) {
  const a = e[i], n = t[i];
  return i === "style" && ae(a) && ae(n) ? !Pa(a, n) : a !== n;
}
function Ig({ vnode: e, parent: t, suspense: i }, a) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = a, e = n), n === e)
      (e = t.vnode).el = a, t = t.parent;
    else
      break;
  }
  i && i.activeBranch === e && (i.vnode.el = a);
}
const Cu = {}, Du = () => Object.create(Cu), Vu = (e) => Object.getPrototypeOf(e) === Cu;
function Tg(e, t, i, a = !1) {
  const n = {}, s = Du();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ru(e, t, n, s);
  for (const o in e.propsOptions[0])
    o in n || (n[o] = void 0);
  process.env.NODE_ENV !== "production" && $u(t || {}, n, e), i ? e.props = a ? n : /* @__PURE__ */ fp(n) : e.type.props ? e.props = n : e.props = s, e.attrs = s;
}
function Ag(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Og(e, t, i, a) {
  const {
    props: n,
    attrs: s,
    vnode: { patchFlag: o }
  } = e, r = /* @__PURE__ */ X(n), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && Ag(e)) && (a || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const l = e.vnode.dynamicProps;
      for (let u = 0; u < l.length; u++) {
        let p = l[u];
        if (Jn(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (c)
          if (ie(s, p))
            g !== s[p] && (s[p] = g, d = !0);
          else {
            const b = et(p);
            n[b] = Ms(
              c,
              r,
              b,
              g,
              e,
              !1
            );
          }
        else
          g !== s[p] && (s[p] = g, d = !0);
      }
    }
  } else {
    Ru(e, t, n, s) && (d = !0);
    let l;
    for (const u in r)
      (!t || // for camelCase
      !ie(t, u) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((l = ei(u)) === u || !ie(t, l))) && (c ? i && // for camelCase
      (i[u] !== void 0 || // for kebab-case
      i[l] !== void 0) && (n[u] = Ms(
        c,
        r,
        u,
        void 0,
        e,
        !0
      )) : delete n[u]);
    if (s !== r)
      for (const u in s)
        (!t || !ie(t, u)) && (delete s[u], d = !0);
  }
  d && St(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && $u(t || {}, n, e);
}
function Ru(e, t, i, a) {
  const [n, s] = e.propsOptions;
  let o = !1, r;
  if (t)
    for (let c in t) {
      if (fa(c))
        continue;
      const d = t[c];
      let l;
      n && ie(n, l = et(c)) ? !s || !s.includes(l) ? i[l] = d : (r || (r = {}))[l] = d : Jn(e.emitsOptions, c) || (!(c in a) || d !== a[c]) && (a[c] = d, o = !0);
    }
  if (s) {
    const c = /* @__PURE__ */ X(i), d = r || ue;
    for (let l = 0; l < s.length; l++) {
      const u = s[l];
      i[u] = Ms(
        n,
        c,
        u,
        d[u],
        e,
        !ie(d, u)
      );
    }
  }
  return o;
}
function Ms(e, t, i, a, n, s) {
  const o = e[i];
  if (o != null) {
    const r = ie(o, "default");
    if (r && a === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && G(c)) {
        const { propsDefaults: d } = n;
        if (i in d)
          a = d[i];
        else {
          const l = za(n);
          a = d[i] = c.call(
            null,
            t
          ), l();
        }
      } else
        a = c;
      n.ce && n.ce._setProp(i, a);
    }
    o[
      0
      /* shouldCast */
    ] && (s && !r ? a = !1 : o[
      1
      /* shouldCastTrue */
    ] && (a === "" || a === ei(i)) && (a = !0));
  }
  return a;
}
const xg = /* @__PURE__ */ new WeakMap();
function Pu(e, t, i = !1) {
  const a = i ? xg : t.propsCache, n = a.get(e);
  if (n)
    return n;
  const s = e.props, o = {}, r = [];
  let c = !1;
  if (!G(e)) {
    const l = (u) => {
      c = !0;
      const [p, g] = Pu(u, t, !0);
      Ae(o, p), g && r.push(...g);
    };
    !i && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  if (!s && !c)
    return ae(e) && a.set(e, zi), zi;
  if (W(s))
    for (let l = 0; l < s.length; l++) {
      process.env.NODE_ENV !== "production" && !_e(s[l]) && S("props must be strings when using array syntax.", s[l]);
      const u = et(s[l]);
      vr(u) && (o[u] = ue);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !ae(s) && S("invalid props options", s);
    for (const l in s) {
      const u = et(l);
      if (vr(u)) {
        const p = s[l], g = o[u] = W(p) || G(p) ? { type: p } : Ae({}, p), b = g.type;
        let w = !1, E = !0;
        if (W(b))
          for (let A = 0; A < b.length; ++A) {
            const z = b[A], R = G(z) && z.name;
            if (R === "Boolean") {
              w = !0;
              break;
            } else R === "String" && (E = !1);
          }
        else
          w = G(b) && b.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = w, g[
          1
          /* shouldCastTrue */
        ] = E, (w || ie(g, "default")) && r.push(u);
      }
    }
  }
  const d = [o, r];
  return ae(e) && a.set(e, d), d;
}
function vr(e) {
  return e[0] !== "$" && !fa(e) ? !0 : (process.env.NODE_ENV !== "production" && S(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Sg(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function $u(e, t, i) {
  const a = /* @__PURE__ */ X(t), n = i.propsOptions[0], s = Object.keys(e).map((o) => et(o));
  for (const o in n) {
    let r = n[o];
    r != null && Ng(
      o,
      a[o],
      r,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(a) : a,
      !s.includes(o)
    );
  }
}
function Ng(e, t, i, a, n) {
  const { type: s, required: o, validator: r, skipCheck: c } = i;
  if (o && n) {
    S('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !o)) {
    if (s != null && s !== !0 && !c) {
      let d = !1;
      const l = W(s) ? s : [s], u = [];
      for (let p = 0; p < l.length && !d; p++) {
        const { valid: g, expectedType: b } = Dg(t, l[p]);
        u.push(b || ""), d = g;
      }
      if (!d) {
        S(Vg(e, t, u));
        return;
      }
    }
    r && !r(t, a) && S('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Cg = /* @__PURE__ */ Kt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function Dg(e, t) {
  let i;
  const a = Sg(t);
  if (a === "null")
    i = e === null;
  else if (Cg(a)) {
    const n = typeof e;
    i = n === a.toLowerCase(), !i && n === "object" && (i = e instanceof t);
  } else a === "Object" ? i = ae(e) : a === "Array" ? i = W(e) : i = e instanceof t;
  return {
    valid: i,
    expectedType: a
  };
}
function Vg(e, t, i) {
  if (i.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let a = `Invalid prop: type check failed for prop "${e}". Expected ${i.map(Ln).join(" | ")}`;
  const n = i[0], s = fo(t), o = yr(t, n), r = yr(t, s);
  return i.length === 1 && kr(n) && Rg(n, s) && (a += ` with value ${o}`), a += `, got ${s} `, kr(s) && (a += `with value ${r}.`), a;
}
function yr(e, t) {
  return rt(e) ? e.toString() : t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function kr(e) {
  return ["string", "number", "boolean"].some((i) => e.toLowerCase() === i);
}
function Rg(...e) {
  return e.every((t) => {
    const i = t.toLowerCase();
    return i !== "boolean" && i !== "symbol";
  });
}
const Oo = (e) => e === "_" || e === "_ctx" || e === "$stable", xo = (e) => W(e) ? e.map(gt) : [gt(e)], Pg = (e, t, i) => {
  if (t._n)
    return t;
  const a = Mp((...n) => (process.env.NODE_ENV !== "production" && Ve && !(i === null && Ye) && !(i && i.root !== Ve.root) && S(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), xo(t(...n))), i);
  return a._c = !1, a;
}, ju = (e, t, i) => {
  const a = e._ctx;
  for (const n in e) {
    if (Oo(n)) continue;
    const s = e[n];
    if (G(s))
      t[n] = Pg(n, s, a);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && S(
        `Non-function value encountered for slot "${n}". Prefer function slots for better performance.`
      );
      const o = xo(s);
      t[n] = () => o;
    }
  }
}, Fu = (e, t) => {
  process.env.NODE_ENV !== "production" && !Eo(e.vnode) && S(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const i = xo(t);
  e.slots.default = () => i;
}, Bs = (e, t, i) => {
  for (const a in t)
    (i || !Oo(a)) && (e[a] = t[a]);
}, $g = (e, t, i) => {
  const a = e.slots = Du();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (Bs(a, t, i), i && hn(a, "_", n, !0)) : ju(t, a);
  } else t && Fu(e, t);
}, jg = (e, t, i) => {
  const { vnode: a, slots: n } = e;
  let s = !0, o = ue;
  if (a.shapeFlag & 32) {
    const r = t._;
    r ? process.env.NODE_ENV !== "production" && nt ? (Bs(n, t, i), St(e, "set", "$slots")) : i && r === 1 ? s = !1 : Bs(n, t, i) : (s = !t.$stable, ju(t, n)), o = t;
  } else t && (Fu(e, t), o = { default: 1 });
  if (s)
    for (const r in n)
      !Oo(r) && o[r] == null && delete n[r];
};
let na, zt;
function xi(e, t) {
  e.appContext.config.performance && On() && zt.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && zp(e, t, On() ? zt.now() : Date.now());
}
function Si(e, t) {
  if (e.appContext.config.performance && On()) {
    const i = `vue-${t}-${e.uid}`, a = i + ":end", n = `<${Ua(e, e.type)}> ${t}`;
    zt.mark(a), zt.measure(n, i, a), zt.clearMeasures(n), zt.clearMarks(i), zt.clearMarks(a);
  }
  process.env.NODE_ENV !== "production" && Up(e, t, On() ? zt.now() : Date.now());
}
function On() {
  return na !== void 0 || (typeof window < "u" && window.performance ? (na = !0, zt = window.performance) : na = !1), na;
}
function Fg() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Xe = Bg;
function zg(e) {
  return Ug(e);
}
function Ug(e, t) {
  Fg();
  const i = Ra();
  i.__VUE__ = !0, process.env.NODE_ENV !== "production" && yo(i.__VUE_DEVTOOLS_GLOBAL_HOOK__, i);
  const {
    insert: a,
    remove: n,
    patchProp: s,
    createElement: o,
    createText: r,
    createComment: c,
    setText: d,
    setElementText: l,
    parentNode: u,
    nextSibling: p,
    setScopeId: g = Pe,
    insertStaticContent: b
  } = e, w = (f, m, v, T = null, I = null, k = null, C = void 0, x = null, h = process.env.NODE_ENV !== "production" && nt ? !1 : !!m.dynamicChildren) => {
    if (f === m)
      return;
    f && !sa(f, m) && (T = Jt(f), Be(f, I, k, !0), f = null), m.patchFlag === -2 && (h = !1, m.dynamicChildren = null);
    const { type: _, ref: F, shapeFlag: O } = m;
    switch (_) {
      case Fa:
        E(f, m, v, T);
        break;
      case ot:
        A(f, m, v, T);
        break;
      case cn:
        f == null ? z(m, v, T, C) : process.env.NODE_ENV !== "production" && R(f, m, v, C);
        break;
      case Qe:
        re(
          f,
          m,
          v,
          T,
          I,
          k,
          C,
          x,
          h
        );
        break;
      default:
        O & 1 ? ee(
          f,
          m,
          v,
          T,
          I,
          k,
          C,
          x,
          h
        ) : O & 6 ? Ce(
          f,
          m,
          v,
          T,
          I,
          k,
          C,
          x,
          h
        ) : O & 64 || O & 128 ? _.process(
          f,
          m,
          v,
          T,
          I,
          k,
          C,
          x,
          h,
          oi
        ) : process.env.NODE_ENV !== "production" && S("Invalid VNode type:", _, `(${typeof _})`);
    }
    F != null && I ? ma(F, f && f.ref, k, m || f, !m) : F == null && f && f.ref != null && ma(f.ref, null, k, f, !0);
  }, E = (f, m, v, T) => {
    if (f == null)
      a(
        m.el = r(m.children),
        v,
        T
      );
    else {
      const I = m.el = f.el;
      m.children !== f.children && d(I, m.children);
    }
  }, A = (f, m, v, T) => {
    f == null ? a(
      m.el = c(m.children || ""),
      v,
      T
    ) : m.el = f.el;
  }, z = (f, m, v, T) => {
    [f.el, f.anchor] = b(
      f.children,
      m,
      v,
      T,
      f.el,
      f.anchor
    );
  }, R = (f, m, v, T) => {
    if (m.children !== f.children) {
      const I = p(f.anchor);
      N(f), [m.el, m.anchor] = b(
        m.children,
        v,
        I,
        T
      );
    } else
      m.el = f.el, m.anchor = f.anchor;
  }, H = ({ el: f, anchor: m }, v, T) => {
    let I;
    for (; f && f !== m; )
      I = p(f), a(f, v, T), f = I;
    a(m, v, T);
  }, N = ({ el: f, anchor: m }) => {
    let v;
    for (; f && f !== m; )
      v = p(f), n(f), f = v;
    n(m);
  }, ee = (f, m, v, T, I, k, C, x, h) => {
    if (m.type === "svg" ? C = "svg" : m.type === "math" && (C = "mathml"), f == null)
      B(
        m,
        v,
        T,
        I,
        k,
        C,
        x,
        h
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), j(
          f,
          m,
          I,
          k,
          C,
          x,
          h
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, B = (f, m, v, T, I, k, C, x) => {
    let h, _;
    const { props: F, shapeFlag: O, transition: K, dirs: Y } = f;
    if (h = f.el = o(
      f.type,
      k,
      F && F.is,
      F
    ), O & 8 ? l(h, f.children) : O & 16 && q(
      f.children,
      h,
      null,
      T,
      I,
      vs(f, k),
      C,
      x
    ), Y && ri(f, null, T, "created"), le(h, f, f.scopeId, C, T), F) {
      for (const ce in F)
        ce !== "value" && !fa(ce) && s(h, ce, null, F[ce], k, T);
      "value" in F && s(h, "value", null, F.value, k), (_ = F.onVnodeBeforeMount) && It(_, T, f);
    }
    process.env.NODE_ENV !== "production" && (hn(h, "__vnode", f, !0), hn(h, "__vueParentComponent", T, !0)), Y && ri(f, null, T, "beforeMount");
    const ne = Lg(I, K);
    if (ne && K.beforeEnter(h), a(h, m, v), (_ = F && F.onVnodeMounted) || ne || Y) {
      const ce = process.env.NODE_ENV !== "production" && nt;
      Xe(() => {
        let oe;
        process.env.NODE_ENV !== "production" && (oe = rr(ce));
        try {
          _ && It(_, T, f), ne && K.enter(h), Y && ri(f, null, T, "mounted");
        } finally {
          process.env.NODE_ENV !== "production" && rr(oe);
        }
      }, I);
    }
  }, le = (f, m, v, T, I) => {
    if (v && g(f, v), T)
      for (let k = 0; k < T.length; k++)
        g(f, T[k]);
    if (I) {
      let k = I.subTree;
      if (process.env.NODE_ENV !== "production" && k.patchFlag > 0 && k.patchFlag & 2048 && (k = Ao(k.children) || k), m === k || Lu(k.type) && (k.ssContent === m || k.ssFallback === m)) {
        const C = I.vnode;
        le(
          f,
          C,
          C.scopeId,
          C.slotScopeIds,
          I.parent
        );
      }
    }
  }, q = (f, m, v, T, I, k, C, x, h = 0) => {
    for (let _ = h; _ < f.length; _++) {
      const F = f[_] = x ? Ut(f[_]) : gt(f[_]);
      w(
        null,
        F,
        m,
        v,
        T,
        I,
        k,
        C,
        x
      );
    }
  }, j = (f, m, v, T, I, k, C) => {
    const x = m.el = f.el;
    process.env.NODE_ENV !== "production" && (x.__vnode = m);
    let { patchFlag: h, dynamicChildren: _, dirs: F } = m;
    h |= f.patchFlag & 16;
    const O = f.props || ue, K = m.props || ue;
    let Y;
    if (v && ci(v, !1), (Y = K.onVnodeBeforeUpdate) && It(Y, v, m, f), F && ri(m, f, v, "beforeUpdate"), v && ci(v, !0), // HMR updated, force full diff
    (process.env.NODE_ENV !== "production" && nt || // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length)) && (h = 0, C = !1, _ = null), (O.innerHTML && K.innerHTML == null || O.textContent && K.textContent == null) && l(x, ""), _ ? ($(
      f.dynamicChildren,
      _,
      x,
      v,
      T,
      vs(m, I),
      k
    ), process.env.NODE_ENV !== "production" && rn(f, m)) : C || te(
      f,
      m,
      x,
      null,
      v,
      T,
      vs(m, I),
      k,
      !1
    ), h > 0) {
      if (h & 16)
        Q(x, O, K, v, I);
      else if (h & 2 && O.class !== K.class && s(x, "class", null, K.class, I), h & 4 && s(x, "style", O.style, K.style, I), h & 8) {
        const ne = m.dynamicProps;
        for (let ce = 0; ce < ne.length; ce++) {
          const oe = ne[ce], xe = O[oe], Le = K[oe];
          (Le !== xe || oe === "value") && s(x, oe, xe, Le, I, v);
        }
      }
      h & 1 && f.children !== m.children && l(x, m.children);
    } else !C && _ == null && Q(x, O, K, v, I);
    ((Y = K.onVnodeUpdated) || F) && Xe(() => {
      Y && It(Y, v, m, f), F && ri(m, f, v, "updated");
    }, T);
  }, $ = (f, m, v, T, I, k, C) => {
    for (let x = 0; x < m.length; x++) {
      const h = f[x], _ = m[x], F = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        h.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (h.type === Qe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !sa(h, _) || // - In the case of a component, it could contain anything.
        h.shapeFlag & 198) ? u(h.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      w(
        h,
        _,
        F,
        null,
        T,
        I,
        k,
        C,
        !0
      );
    }
  }, Q = (f, m, v, T, I) => {
    if (m !== v) {
      if (m !== ue)
        for (const k in m)
          !fa(k) && !(k in v) && s(
            f,
            k,
            m[k],
            null,
            I,
            T
          );
      for (const k in v) {
        if (fa(k)) continue;
        const C = v[k], x = m[k];
        C !== x && k !== "value" && s(f, k, x, C, I, T);
      }
      "value" in v && s(f, "value", m.value, v.value, I);
    }
  }, re = (f, m, v, T, I, k, C, x, h) => {
    const _ = m.el = f ? f.el : r(""), F = m.anchor = f ? f.anchor : r("");
    let { patchFlag: O, dynamicChildren: K, slotScopeIds: Y } = m;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (nt || O & 2048) && (O = 0, h = !1, K = null), Y && (x = x ? x.concat(Y) : Y), f == null ? (a(_, v, T), a(F, v, T), q(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      v,
      F,
      I,
      k,
      C,
      x,
      h
    )) : O > 0 && O & 64 && K && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === K.length ? ($(
      f.dynamicChildren,
      K,
      v,
      I,
      k,
      C,
      x
    ), process.env.NODE_ENV !== "production" ? rn(f, m) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (m.key != null || I && m === I.subTree) && rn(
        f,
        m,
        !0
        /* shallow */
      )
    )) : te(
      f,
      m,
      v,
      F,
      I,
      k,
      C,
      x,
      h
    );
  }, Ce = (f, m, v, T, I, k, C, x, h) => {
    m.slotScopeIds = x, f == null ? m.shapeFlag & 512 ? I.ctx.activate(
      m,
      v,
      T,
      C,
      h
    ) : je(
      m,
      v,
      T,
      I,
      k,
      C,
      h
    ) : pe(f, m, h);
  }, je = (f, m, v, T, I, k, C) => {
    const x = f.component = Yg(
      f,
      T,
      I
    );
    if (process.env.NODE_ENV !== "production" && x.type.__hmrId && Np(x), process.env.NODE_ENV !== "production" && (an(f), xi(x, "mount")), Eo(f) && (x.ctx.renderer = oi), process.env.NODE_ENV !== "production" && xi(x, "init"), Qg(x, !1, C), process.env.NODE_ENV !== "production" && Si(x, "init"), process.env.NODE_ENV !== "production" && nt && (f.el = null), x.asyncDep) {
      if (I && I.registerDep(x, P, C), !f.el) {
        const h = x.subTree = Dt(ot);
        A(null, h, m, v), f.placeholder = h.el;
      }
    } else
      P(
        x,
        f,
        m,
        v,
        I,
        k,
        C
      );
    process.env.NODE_ENV !== "production" && (nn(), Si(x, "mount"));
  }, pe = (f, m, v) => {
    const T = m.component = f.component;
    if (Eg(f, m, v))
      if (T.asyncDep && !T.asyncResolved) {
        process.env.NODE_ENV !== "production" && an(m), J(T, m, v), process.env.NODE_ENV !== "production" && nn();
        return;
      } else
        T.next = m, T.update();
    else
      m.el = f.el, T.vnode = m;
  }, P = (f, m, v, T, I, k, C) => {
    const x = () => {
      if (f.isMounted) {
        let { next: O, bu: K, u: Y, parent: ne, vnode: ce } = f;
        {
          const wt = zu(f);
          if (wt) {
            O && (O.el = ce.el, J(f, O, C)), wt.asyncDep.then(() => {
              Xe(() => {
                f.isUnmounted || _();
              }, I);
            });
            return;
          }
        }
        let oe = O, xe;
        process.env.NODE_ENV !== "production" && an(O || f.vnode), ci(f, !1), O ? (O.el = ce.el, J(f, O, C)) : O = ce, K && Vi(K), (xe = O.props && O.props.onVnodeBeforeUpdate) && It(xe, ne, O, ce), ci(f, !0), process.env.NODE_ENV !== "production" && xi(f, "render");
        const Le = br(f);
        process.env.NODE_ENV !== "production" && Si(f, "render");
        const kt = f.subTree;
        f.subTree = Le, process.env.NODE_ENV !== "production" && xi(f, "patch"), w(
          kt,
          Le,
          // parent may have changed if it's in a teleport
          u(kt.el),
          // anchor may have changed if it's in a fragment
          Jt(kt),
          f,
          I,
          k
        ), process.env.NODE_ENV !== "production" && Si(f, "patch"), O.el = Le.el, oe === null && Ig(f, Le.el), Y && Xe(Y, I), (xe = O.props && O.props.onVnodeUpdated) && Xe(
          () => It(xe, ne, O, ce),
          I
        ), process.env.NODE_ENV !== "production" && gu(f), process.env.NODE_ENV !== "production" && nn();
      } else {
        let O;
        const { el: K, props: Y } = m, { bm: ne, m: ce, parent: oe, root: xe, type: Le } = f, kt = ba(m);
        ci(f, !1), ne && Vi(ne), !kt && (O = Y && Y.onVnodeBeforeMount) && It(O, oe, m), ci(f, !0);
        {
          xe.ce && xe.ce._hasShadowRoot() && xe.ce._injectChildStyle(
            Le,
            f.parent ? f.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && xi(f, "render");
          const wt = f.subTree = br(f);
          process.env.NODE_ENV !== "production" && Si(f, "render"), process.env.NODE_ENV !== "production" && xi(f, "patch"), w(
            null,
            wt,
            v,
            T,
            f,
            I,
            k
          ), process.env.NODE_ENV !== "production" && Si(f, "patch"), m.el = wt.el;
        }
        if (ce && Xe(ce, I), !kt && (O = Y && Y.onVnodeMounted)) {
          const wt = m;
          Xe(
            () => It(O, oe, wt),
            I
          );
        }
        (m.shapeFlag & 256 || oe && ba(oe.vnode) && oe.vnode.shapeFlag & 256) && f.a && Xe(f.a, I), f.isMounted = !0, process.env.NODE_ENV !== "production" && $p(f), m = v = T = null;
      }
    };
    f.scope.on();
    const h = f.effect = new Md(x);
    f.scope.off();
    const _ = f.update = h.run.bind(h), F = f.job = h.runIfDirty.bind(h);
    F.i = f, F.id = f.uid, h.scheduler = () => qn(F), ci(f, !0), process.env.NODE_ENV !== "production" && (h.onTrack = f.rtc ? (O) => Vi(f.rtc, O) : void 0, h.onTrigger = f.rtg ? (O) => Vi(f.rtg, O) : void 0), _();
  }, J = (f, m, v) => {
    m.component = f;
    const T = f.vnode.props;
    f.vnode = m, f.next = null, Og(f, m.props, T, v), jg(f, m.children, v), ut(), or(f), lt();
  }, te = (f, m, v, T, I, k, C, x, h = !1) => {
    const _ = f && f.children, F = f ? f.shapeFlag : 0, O = m.children, { patchFlag: K, shapeFlag: Y } = m;
    if (K > 0) {
      if (K & 128) {
        Ue(
          _,
          O,
          v,
          T,
          I,
          k,
          C,
          x,
          h
        );
        return;
      } else if (K & 256) {
        Me(
          _,
          O,
          v,
          T,
          I,
          k,
          C,
          x,
          h
        );
        return;
      }
    }
    Y & 8 ? (F & 16 && si(_, I, k), O !== _ && l(v, O)) : F & 16 ? Y & 16 ? Ue(
      _,
      O,
      v,
      T,
      I,
      k,
      C,
      x,
      h
    ) : si(_, I, k, !0) : (F & 8 && l(v, ""), Y & 16 && q(
      O,
      v,
      T,
      I,
      k,
      C,
      x,
      h
    ));
  }, Me = (f, m, v, T, I, k, C, x, h) => {
    f = f || zi, m = m || zi;
    const _ = f.length, F = m.length, O = Math.min(_, F);
    let K;
    for (K = 0; K < O; K++) {
      const Y = m[K] = h ? Ut(m[K]) : gt(m[K]);
      w(
        f[K],
        Y,
        v,
        null,
        I,
        k,
        C,
        x,
        h
      );
    }
    _ > F ? si(
      f,
      I,
      k,
      !0,
      !1,
      O
    ) : q(
      m,
      v,
      T,
      I,
      k,
      C,
      x,
      h,
      O
    );
  }, Ue = (f, m, v, T, I, k, C, x, h) => {
    let _ = 0;
    const F = m.length;
    let O = f.length - 1, K = F - 1;
    for (; _ <= O && _ <= K; ) {
      const Y = f[_], ne = m[_] = h ? Ut(m[_]) : gt(m[_]);
      if (sa(Y, ne))
        w(
          Y,
          ne,
          v,
          null,
          I,
          k,
          C,
          x,
          h
        );
      else
        break;
      _++;
    }
    for (; _ <= O && _ <= K; ) {
      const Y = f[O], ne = m[K] = h ? Ut(m[K]) : gt(m[K]);
      if (sa(Y, ne))
        w(
          Y,
          ne,
          v,
          null,
          I,
          k,
          C,
          x,
          h
        );
      else
        break;
      O--, K--;
    }
    if (_ > O) {
      if (_ <= K) {
        const Y = K + 1, ne = Y < F ? m[Y].el : T;
        for (; _ <= K; )
          w(
            null,
            m[_] = h ? Ut(m[_]) : gt(m[_]),
            v,
            ne,
            I,
            k,
            C,
            x,
            h
          ), _++;
      }
    } else if (_ > K)
      for (; _ <= O; )
        Be(f[_], I, k, !0), _++;
    else {
      const Y = _, ne = _, ce = /* @__PURE__ */ new Map();
      for (_ = ne; _ <= K; _++) {
        const Ke = m[_] = h ? Ut(m[_]) : gt(m[_]);
        Ke.key != null && (process.env.NODE_ENV !== "production" && ce.has(Ke.key) && S(
          "Duplicate keys found during update:",
          JSON.stringify(Ke.key),
          "Make sure keys are unique."
        ), ce.set(Ke.key, _));
      }
      let oe, xe = 0;
      const Le = K - ne + 1;
      let kt = !1, wt = 0;
      const ia = new Array(Le);
      for (_ = 0; _ < Le; _++) ia[_] = 0;
      for (_ = Y; _ <= O; _++) {
        const Ke = f[_];
        if (xe >= Le) {
          Be(Ke, I, k, !0);
          continue;
        }
        let Et;
        if (Ke.key != null)
          Et = ce.get(Ke.key);
        else
          for (oe = ne; oe <= K; oe++)
            if (ia[oe - ne] === 0 && sa(Ke, m[oe])) {
              Et = oe;
              break;
            }
        Et === void 0 ? Be(Ke, I, k, !0) : (ia[Et - ne] = _ + 1, Et >= wt ? wt = Et : kt = !0, w(
          Ke,
          m[Et],
          v,
          null,
          I,
          k,
          C,
          x,
          h
        ), xe++);
      }
      const Yo = kt ? Mg(ia) : zi;
      for (oe = Yo.length - 1, _ = Le - 1; _ >= 0; _--) {
        const Ke = ne + _, Et = m[Ke], Xo = m[Ke + 1], Qo = Ke + 1 < F ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Xo.el || Uu(Xo)
        ) : T;
        ia[_] === 0 ? w(
          null,
          Et,
          v,
          Qo,
          I,
          k,
          C,
          x,
          h
        ) : kt && (oe < 0 || _ !== Yo[oe] ? Oe(Et, v, Qo, 2) : oe--);
      }
    }
  }, Oe = (f, m, v, T, I = null) => {
    const { el: k, type: C, transition: x, children: h, shapeFlag: _ } = f;
    if (_ & 6) {
      Oe(f.component.subTree, m, v, T);
      return;
    }
    if (_ & 128) {
      f.suspense.move(m, v, T);
      return;
    }
    if (_ & 64) {
      C.move(f, m, v, oi);
      return;
    }
    if (C === Qe) {
      a(k, m, v);
      for (let O = 0; O < h.length; O++)
        Oe(h[O], m, v, T);
      a(f.anchor, m, v);
      return;
    }
    if (C === cn) {
      H(f, m, v);
      return;
    }
    if (T !== 2 && _ & 1 && x)
      if (T === 0)
        x.persisted && !k[hs] ? a(k, m, v) : (x.beforeEnter(k), a(k, m, v), Xe(() => x.enter(k), I));
      else {
        const { leave: O, delayLeave: K, afterLeave: Y } = x, ne = () => {
          f.ctx.isUnmounted ? n(k) : a(k, m, v);
        }, ce = () => {
          const oe = k._isLeaving || !!k[hs];
          k._isLeaving && k[hs](
            !0
            /* cancelled */
          ), x.persisted && !oe ? ne() : O(k, () => {
            ne(), Y && Y();
          });
        };
        K ? K(k, ne, ce) : ce();
      }
    else
      a(k, m, v);
  }, Be = (f, m, v, T = !1, I = !1) => {
    const {
      type: k,
      props: C,
      ref: x,
      children: h,
      dynamicChildren: _,
      shapeFlag: F,
      patchFlag: O,
      dirs: K,
      cacheIndex: Y,
      memo: ne
    } = f;
    if (O === -2 && (I = !1), x != null && (ut(), ma(x, null, v, f, !0), lt()), Y != null && (m.renderCache[Y] = void 0), F & 256) {
      m.ctx.deactivate(f);
      return;
    }
    const ce = F & 1 && K, oe = !ba(f);
    let xe;
    if (oe && (xe = C && C.onVnodeBeforeUnmount) && It(xe, m, f), F & 6)
      ds(f.component, v, T);
    else {
      if (F & 128) {
        f.suspense.unmount(v, T);
        return;
      }
      ce && ri(f, null, m, "beforeUnmount"), F & 64 ? f.type.remove(
        f,
        m,
        v,
        oi,
        T
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== Qe || O > 0 && O & 64) ? si(
        _,
        m,
        v,
        !1,
        !0
      ) : (k === Qe && O & 384 || !I && F & 16) && si(h, m, v), T && qt(f);
    }
    const Le = ne != null && Y == null;
    (oe && (xe = C && C.onVnodeUnmounted) || ce || Le) && Xe(() => {
      xe && It(xe, m, f), ce && ri(f, null, m, "unmounted"), Le && (f.el = null);
    }, v);
  }, qt = (f) => {
    const { type: m, el: v, anchor: T, transition: I } = f;
    if (m === Qe) {
      process.env.NODE_ENV !== "production" && f.patchFlag > 0 && f.patchFlag & 2048 && I && !I.persisted ? f.children.forEach((C) => {
        C.type === ot ? n(C.el) : qt(C);
      }) : Gt(v, T);
      return;
    }
    if (m === cn) {
      N(f);
      return;
    }
    const k = () => {
      n(v), I && !I.persisted && I.afterLeave && I.afterLeave();
    };
    if (f.shapeFlag & 1 && I && !I.persisted) {
      const { leave: C, delayLeave: x } = I, h = () => C(v, k);
      x ? x(f.el, k, h) : h();
    } else
      k();
  }, Gt = (f, m) => {
    let v;
    for (; f !== m; )
      v = p(f), n(f), f = v;
    n(m);
  }, ds = (f, m, v) => {
    process.env.NODE_ENV !== "production" && f.type.__hmrId && Cp(f);
    const { bum: T, scope: I, job: k, subTree: C, um: x, m: h, a: _ } = f;
    wr(h), wr(_), T && Vi(T), I.stop(), k && (k.flags |= 8, Be(C, f, m, v)), x && Xe(x, m), Xe(() => {
      f.isUnmounted = !0;
    }, m), process.env.NODE_ENV !== "production" && Fp(f);
  }, si = (f, m, v, T = !1, I = !1, k = 0) => {
    for (let C = k; C < f.length; C++)
      Be(f[C], m, v, T, I);
  }, Jt = (f) => {
    if (f.shapeFlag & 6)
      return Jt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const m = p(f.anchor || f.el), v = m && m[Wp];
    return v ? p(v) : m;
  };
  let ta = !1;
  const Za = (f, m, v) => {
    let T;
    f == null ? m._vnode && (Be(m._vnode, null, null, !0), T = m._vnode.component) : w(
      m._vnode || null,
      f,
      m,
      null,
      null,
      null,
      v
    ), m._vnode = f, ta || (ta = !0, or(T), lu(), ta = !1);
  }, oi = {
    p: w,
    um: Be,
    m: Oe,
    r: qt,
    mt: je,
    mc: q,
    pc: te,
    pbc: $,
    n: Jt,
    o: e
  };
  return {
    render: Za,
    hydrate: void 0,
    createApp: hg(Za)
  };
}
function vs({ type: e, props: t }, i) {
  return i === "svg" && e === "foreignObject" || i === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : i;
}
function ci({ effect: e, job: t }, i) {
  i ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Lg(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function rn(e, t, i = !1) {
  const a = e.children, n = t.children;
  if (W(a) && W(n))
    for (let s = 0; s < a.length; s++) {
      const o = a[s];
      let r = n[s];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = n[s] = Ut(n[s]), r.el = o.el), !i && r.patchFlag !== -2 && rn(o, r)), r.type === Fa && (r.patchFlag === -1 && (r = n[s] = Ut(r)), r.el = o.el), r.type === ot && !r.el && (r.el = o.el), process.env.NODE_ENV !== "production" && r.el && (r.el.__vnode = r);
    }
}
function Mg(e) {
  const t = e.slice(), i = [0];
  let a, n, s, o, r;
  const c = e.length;
  for (a = 0; a < c; a++) {
    const d = e[a];
    if (d !== 0) {
      if (n = i[i.length - 1], e[n] < d) {
        t[a] = n, i.push(a);
        continue;
      }
      for (s = 0, o = i.length - 1; s < o; )
        r = s + o >> 1, e[i[r]] < d ? s = r + 1 : o = r;
      d < e[i[s]] && (s > 0 && (t[a] = i[s - 1]), i[s] = a);
    }
  }
  for (s = i.length, o = i[s - 1]; s-- > 0; )
    i[s] = o, o = t[o];
  return i;
}
function zu(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : zu(t);
}
function wr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Uu(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Uu(t.subTree) : null;
}
const Lu = (e) => e.__isSuspense;
function Bg(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : uu(e);
}
const Qe = /* @__PURE__ */ Symbol.for("v-fgt"), Fa = /* @__PURE__ */ Symbol.for("v-txt"), ot = /* @__PURE__ */ Symbol.for("v-cmt"), cn = /* @__PURE__ */ Symbol.for("v-stc"), ha = [];
let st = null;
function he(e = !1) {
  ha.push(st = e ? null : []);
}
function Zg() {
  ha.pop(), st = ha[ha.length - 1] || null;
}
let Ea = 1;
function Er(e, t = !1) {
  Ea += e, e < 0 && st && t && (st.hasOnce = !0);
}
function Mu(e) {
  return e.dynamicChildren = Ea > 0 ? st || zi : null, Zg(), Ea > 0 && st && st.push(e), e;
}
function ve(e, t, i, a, n, s) {
  return Mu(
    L(
      e,
      t,
      i,
      a,
      n,
      s,
      !0
    )
  );
}
function Hg(e, t, i, a, n) {
  return Mu(
    Dt(
      e,
      t,
      i,
      a,
      n,
      !0
    )
  );
}
function Yn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function sa(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const i = sn.get(t.type);
    if (i && i.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Kg = (...e) => Zu(
  ...e
), Bu = ({ key: e }) => e ?? null, dn = ({
  ref: e,
  ref_key: t,
  ref_for: i
}) => (typeof e == "number" && (e = "" + e), e != null ? _e(e) || /* @__PURE__ */ ge(e) || G(e) ? { i: Ye, r: e, k: t, f: !!i } : e : null);
function L(e, t = null, i = null, a = 0, n = null, s = e === Qe ? 0 : 1, o = !1, r = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Bu(t),
    ref: t && dn(t),
    scopeId: bu,
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
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: Ye
  };
  return r ? (xn(c, i), s & 128 && e.normalize(c)) : i && (c.shapeFlag |= _e(i) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && S("VNode created with invalid key (NaN). VNode type:", c.type), Ea > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  st && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && st.push(c), c;
}
const Dt = process.env.NODE_ENV !== "production" ? Kg : Zu;
function Zu(e, t = null, i = null, a = 0, n = null, s = !1) {
  if ((!e || e === og) && (process.env.NODE_ENV !== "production" && !e && S(`Invalid vnode type when creating vnode: ${e}.`), e = ot), Yn(e)) {
    const r = ti(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return i && xn(r, i), Ea > 0 && !s && st && (r.shapeFlag & 6 ? st[st.indexOf(e)] = r : st.push(r)), r.patchFlag = -2, r;
  }
  if (Gu(e) && (e = e.__vccOpts), t) {
    t = Wg(t);
    let { class: r, style: c } = t;
    r && !_e(r) && (t.class = Bn(r)), ae(c) && (/* @__PURE__ */ Zi(c) && !W(c) && (c = Ae({}, c)), t.style = Mn(c));
  }
  const o = _e(e) ? 1 : Lu(e) ? 128 : qp(e) ? 64 : ae(e) ? 4 : G(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && /* @__PURE__ */ Zi(e) && (e = /* @__PURE__ */ X(e), S(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), L(
    e,
    t,
    i,
    a,
    n,
    o,
    s,
    !0
  );
}
function Wg(e) {
  return e ? /* @__PURE__ */ Zi(e) || Vu(e) ? Ae({}, e) : e : null;
}
function ti(e, t, i = !1, a = !1) {
  const { props: n, ref: s, patchFlag: o, children: r, transition: c } = e, d = t ? qg(n || {}, t) : n, l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Bu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      i && s ? W(s) ? s.concat(dn(t)) : [s, dn(t)] : dn(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && W(r) ? r.map(Hu) : r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Qe ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && ti(e.ssContent),
    ssFallback: e.ssFallback && ti(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && a && wo(
    l,
    c.clone(l)
  ), l;
}
function Hu(e) {
  const t = ti(e);
  return W(e.children) && (t.children = e.children.map(Hu)), t;
}
function un(e = " ", t = 0) {
  return Dt(Fa, null, e, t);
}
function Ni(e = "", t = !1) {
  return t ? (he(), Hg(ot, null, e)) : Dt(ot, null, e);
}
function gt(e) {
  return e == null || typeof e == "boolean" ? Dt(ot) : W(e) ? Dt(
    Qe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Yn(e) ? Ut(e) : Dt(Fa, null, String(e));
}
function Ut(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ti(e);
}
function xn(e, t) {
  let i = 0;
  const { shapeFlag: a } = e;
  if (t == null)
    t = null;
  else if (W(t))
    i = 16;
  else if (typeof t == "object")
    if (a & 65) {
      const n = t.default;
      n && (n._c && (n._d = !1), xn(e, n()), n._c && (n._d = !0));
      return;
    } else {
      i = 32;
      const n = t._;
      !n && !Vu(t) ? t._ctx = Ye : n === 3 && Ye && (Ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (a & 65) {
      xn(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ye }, i = 32;
  } else
    t = String(t), a & 64 ? (i = 16, t = [un(t)]) : i = 8;
  e.children = t, e.shapeFlag |= i;
}
function qg(...e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    for (const n in a)
      if (n === "class")
        t.class !== a.class && (t.class = Bn([t.class, a.class]));
      else if (n === "style")
        t.style = Mn([t.style, a.style]);
      else if (Da(n)) {
        const s = t[n], o = a[n];
        o && s !== o && !(W(s) && s.includes(o)) ? t[n] = s ? [].concat(s, o) : o : o == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !va(n) && (t[n] = o);
      } else n !== "" && (t[n] = a[n]);
  }
  return t;
}
function It(e, t, i, a = null) {
  yt(e, t, 7, [
    i,
    a
  ]);
}
const Gg = Ou();
let Jg = 0;
function Yg(e, t, i) {
  const a = e.type, n = (t ? t.appContext : e.appContext) || Gg, s = {
    uid: Jg++,
    vnode: e,
    type: a,
    parent: t,
    appContext: n,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new zd(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(n.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Pu(a, n),
    emitsOptions: xu(a, n),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ue,
    // inheritAttrs
    inheritAttrs: a.inheritAttrs,
    // state
    ctx: ue,
    data: ue,
    props: ue,
    attrs: ue,
    slots: ue,
    refs: ue,
    setupState: ue,
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
  return process.env.NODE_ENV !== "production" ? s.ctx = rg(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = vg.bind(null, s), e.ce && e.ce(s), s;
}
let Ve = null;
const Xn = () => Ve || Ye;
let Sn, Zs;
{
  const e = Ra(), t = (i, a) => {
    let n;
    return (n = e[i]) || (n = e[i] = []), n.push(a), (s) => {
      n.length > 1 ? n.forEach((o) => o(s)) : n[0](s);
    };
  };
  Sn = t(
    "__VUE_INSTANCE_SETTERS__",
    (i) => Ve = i
  ), Zs = t(
    "__VUE_SSR_SETTERS__",
    (i) => Ia = i
  );
}
const za = (e) => {
  const t = Ve;
  return Sn(e), e.scope.on(), () => {
    e.scope.off(), Sn(t);
  };
}, Ir = () => {
  Ve && Ve.scope.off(), Sn(null);
}, Xg = /* @__PURE__ */ Kt("slot,component");
function Hs(e, { isNativeTag: t }) {
  (Xg(e) || t(e)) && S(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Ku(e) {
  return e.vnode.shapeFlag & 4;
}
let Ia = !1;
function Qg(e, t = !1, i = !1) {
  t && Zs(t);
  const { props: a, children: n } = e.vnode, s = Ku(e);
  Tg(e, a, s, t), $g(e, n, i || t);
  const o = s ? em(e, t) : void 0;
  return t && Zs(!1), o;
}
function em(e, t) {
  const i = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (i.name && Hs(i.name, e.appContext.config), i.components) {
      const n = Object.keys(i.components);
      for (let s = 0; s < n.length; s++)
        Hs(n[s], e.appContext.config);
    }
    if (i.directives) {
      const n = Object.keys(i.directives);
      for (let s = 0; s < n.length; s++)
        hu(n[s]);
    }
    i.compilerOptions && tm() && S(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Iu), process.env.NODE_ENV !== "production" && cg(e);
  const { setup: a } = i;
  if (a) {
    ut();
    const n = e.setupContext = a.length > 1 ? am(e) : null, s = za(e), o = Yi(
      a,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.props) : e.props,
        n
      ]
    ), r = lo(o);
    if (lt(), s(), (r || e.sp) && !ba(e) && ku(e), r) {
      if (o.then(Ir, Ir), t)
        return o.then((c) => {
          Tr(e, c, t);
        }).catch((c) => {
          $a(c, e, 0);
        });
      if (e.asyncDep = o, process.env.NODE_ENV !== "production" && !e.suspense) {
        const c = Ua(e, i);
        S(
          `Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Tr(e, o, t);
  } else
    Wu(e, t);
}
function Tr(e, t, i) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) ? (process.env.NODE_ENV !== "production" && Yn(t) && S(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = su(t), process.env.NODE_ENV !== "production" && dg(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && S(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), Wu(e, i);
}
const tm = () => !0;
function Wu(e, t, i) {
  const a = e.type;
  e.render || (e.render = a.render || Pe);
  {
    const n = za(e);
    ut();
    try {
      lg(e);
    } finally {
      lt(), n();
    }
  }
  process.env.NODE_ENV !== "production" && !a.render && e.render === Pe && !t && (a.template ? S(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : S("Component is missing template or render function: ", a));
}
const Ar = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return An(), Re(e, "get", ""), e[t];
  },
  set() {
    return S("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return S("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Re(e, "get", ""), e[t];
  }
};
function im(e) {
  return new Proxy(e.slots, {
    get(t, i) {
      return Re(e, "get", "$slots"), t[i];
    }
  });
}
function am(e) {
  const t = (i) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && S("expose() should be called only once per setup()."), i != null)) {
      let a = typeof i;
      a === "object" && (W(i) ? a = "array" : /* @__PURE__ */ ge(i) && (a = "ref")), a !== "object" && S(
        `expose() should be passed a plain object, received ${a}.`
      );
    }
    e.exposed = i || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let i, a;
    return Object.freeze({
      get attrs() {
        return i || (i = new Proxy(e.attrs, Ar));
      },
      get slots() {
        return a || (a = im(e));
      },
      get emit() {
        return (n, ...s) => e.emit(n, ...s);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, Ar),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Qn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(su(Ct(e.exposed)), {
    get(t, i) {
      if (i in t)
        return t[i];
      if (i in yi)
        return yi[i](e);
    },
    has(t, i) {
      return i in t || i in yi;
    }
  })) : e.proxy;
}
const nm = /(?:^|[-_])\w/g, sm = (e) => e.replace(nm, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function qu(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ua(e, t, i = !1) {
  let a = qu(t);
  if (!a && t.__file) {
    const n = t.__file.match(/([^/\\]+)\.\w+$/);
    n && (a = n[1]);
  }
  if (!a && e) {
    const n = (s) => {
      for (const o in s)
        if (s[o] === t)
          return o;
    };
    a = n(e.components) || e.parent && n(
      e.parent.type.components
    ) || n(e.appContext.components);
  }
  return a ? sm(a) : i ? "App" : "Anonymous";
}
function Gu(e) {
  return G(e) && "__vccOpts" in e;
}
const Xt = (e, t) => {
  const i = /* @__PURE__ */ yp(e, t, Ia);
  if (process.env.NODE_ENV !== "production") {
    const a = Xn();
    a && a.appContext.config.warnRecursiveComputed && (i._warnRecursive = !0);
  }
  return i;
};
function om() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, i = { style: "color:#f5222d" }, a = { style: "color:#eb2f96" }, n = {
    __vue_custom_formatter: !0,
    header(u) {
      if (!ae(u))
        return null;
      if (u.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ ge(u)) {
        ut();
        const p = u.value;
        return lt(), [
          "div",
          {},
          ["span", e, l(u)],
          "<",
          r(p),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ ht(u))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ He(u) ? "ShallowReactive" : "Reactive"],
            "<",
            r(u),
            `>${/* @__PURE__ */ _t(u) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ _t(u))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ He(u) ? "ShallowReadonly" : "Readonly"],
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
          ...s(u.$)
        ];
    }
  };
  function s(u) {
    const p = [];
    u.type.props && u.props && p.push(o("props", /* @__PURE__ */ X(u.props))), u.setupState !== ue && p.push(o("setup", u.setupState)), u.data !== ue && p.push(o("data", /* @__PURE__ */ X(u.data)));
    const g = c(u, "computed");
    g && p.push(o("computed", g));
    const b = c(u, "inject");
    return b && p.push(o("injected", b)), p.push([
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
  function o(u, p) {
    return p = Ae({}, p), Object.keys(p).length ? [
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
        ...Object.keys(p).map((g) => [
          "div",
          {},
          ["span", a, g + ": "],
          r(p[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function r(u, p = !0) {
    return typeof u == "number" ? ["span", t, u] : typeof u == "string" ? ["span", i, JSON.stringify(u)] : typeof u == "boolean" ? ["span", a, u] : ae(u) ? ["object", { object: p ? /* @__PURE__ */ X(u) : u }] : ["span", i, String(u)];
  }
  function c(u, p) {
    const g = u.type;
    if (G(g))
      return;
    const b = {};
    for (const w in u.ctx)
      d(g, w, p) && (b[w] = u.ctx[w]);
    return b;
  }
  function d(u, p, g) {
    const b = u[g];
    if (W(b) && b.includes(p) || ae(b) && p in b || u.extends && d(u.extends, p, g) || u.mixins && u.mixins.some((w) => d(w, p, g)))
      return !0;
  }
  function l(u) {
    return /* @__PURE__ */ He(u) ? "ShallowRef" : u.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(n) : window.devtoolsFormatters = [n];
}
const Or = "3.5.39", Bt = process.env.NODE_ENV !== "production" ? S : Pe;
process.env.NODE_ENV;
process.env.NODE_ENV;
let Ks;
const xr = typeof window < "u" && window.trustedTypes;
if (xr)
  try {
    Ks = /* @__PURE__ */ xr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Bt(`Error creating trusted types policy: ${e}`);
  }
const Ju = Ks ? (e) => Ks.createHTML(e) : (e) => e, rm = "http://www.w3.org/2000/svg", cm = "http://www.w3.org/1998/Math/MathML", Ft = typeof document < "u" ? document : null, Sr = Ft && /* @__PURE__ */ Ft.createElement("template"), dm = {
  insert: (e, t, i) => {
    t.insertBefore(e, i || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, i, a) => {
    const n = t === "svg" ? Ft.createElementNS(rm, e) : t === "mathml" ? Ft.createElementNS(cm, e) : i ? Ft.createElement(e, { is: i }) : Ft.createElement(e);
    return e === "select" && a && a.multiple != null && n.setAttribute("multiple", a.multiple), n;
  },
  createText: (e) => Ft.createTextNode(e),
  createComment: (e) => Ft.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ft.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, i, a, n, s) {
    const o = i ? i.previousSibling : t.lastChild;
    if (n && (n === s || n.nextSibling))
      for (; t.insertBefore(n.cloneNode(!0), i), !(n === s || !(n = n.nextSibling)); )
        ;
    else {
      Sr.innerHTML = Ju(
        a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e
      );
      const r = Sr.content;
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
      o ? o.nextSibling : t.firstChild,
      // last
      i ? i.previousSibling : t.lastChild
    ];
  }
}, um = /* @__PURE__ */ Symbol("_vtc");
function lm(e, t, i) {
  const a = e[um];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : i ? e.setAttribute("class", t) : e.className = t;
}
const Nr = /* @__PURE__ */ Symbol("_vod"), fm = /* @__PURE__ */ Symbol("_vsh"), pm = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), gm = /(?:^|;)\s*display\s*:/;
function mm(e, t, i) {
  const a = e.style, n = _e(i);
  let s = !1;
  if (i && !n) {
    if (t)
      if (_e(t))
        for (const o of t.split(";")) {
          const r = o.slice(0, o.indexOf(":")).trim();
          i[r] == null && ca(a, r, "");
        }
      else
        for (const o in t)
          i[o] == null && ca(a, o, "");
    for (const o in i) {
      o === "display" && (s = !0);
      const r = i[o];
      r != null ? _m(
        e,
        o,
        !_e(t) && t ? t[o] : void 0,
        r
      ) || ca(a, o, r) : ca(a, o, "");
    }
  } else if (n) {
    if (t !== i) {
      const o = a[pm];
      o && (i += ";" + o), a.cssText = i, s = gm.test(i);
    }
  } else t && e.removeAttribute("style");
  Nr in e && (e[Nr] = s ? a.display : "", e[fm] && (a.display = "none"));
}
const bm = /[^\\];\s*$/, Cr = /\s*!important$/;
function ca(e, t, i) {
  if (W(i))
    i.forEach((a) => ca(e, t, a));
  else if (i == null && (i = ""), process.env.NODE_ENV !== "production" && bm.test(i) && Bt(
    `Unexpected semicolon at the end of '${t}' style value: '${i}'`
  ), t.startsWith("--"))
    e.setProperty(t, i);
  else {
    const a = hm(e, t);
    Cr.test(i) ? e.setProperty(
      ei(a),
      i.replace(Cr, ""),
      "important"
    ) : e[a] = i;
  }
}
const Dr = ["Webkit", "Moz", "ms"], ys = {};
function hm(e, t) {
  const i = ys[t];
  if (i)
    return i;
  let a = et(t);
  if (a !== "filter" && a in e)
    return ys[t] = a;
  a = Ln(a);
  for (let n = 0; n < Dr.length; n++) {
    const s = Dr[n] + a;
    if (s in e)
      return ys[t] = s;
  }
  return t;
}
function _m(e, t, i, a) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && _e(a) && i === a;
}
const Vr = "http://www.w3.org/1999/xlink";
function Rr(e, t, i, a, n, s = Hf(t)) {
  a && t.startsWith("xlink:") ? i == null ? e.removeAttributeNS(Vr, t.slice(6, t.length)) : e.setAttributeNS(Vr, t, i) : i == null || s && !Pd(i) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : rt(i) ? String(i) : i
  );
}
function Pr(e, t, i, a, n) {
  if (t === "innerHTML" || t === "textContent") {
    i != null && (e[t] = t === "innerHTML" ? Ju(i) : i);
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
  let o = !1;
  if (i === "" || i == null) {
    const r = typeof e[t];
    r === "boolean" ? i = Pd(i) : i == null && r === "string" ? (i = "", o = !0) : r === "number" && (i = 0, o = !0);
  }
  try {
    e[t] = i;
  } catch (r) {
    process.env.NODE_ENV !== "production" && !o && Bt(
      `Failed setting prop "${t}" on <${s.toLowerCase()}>: value ${i} is invalid.`,
      r
    );
  }
  o && e.removeAttribute(n || t);
}
function pi(e, t, i, a) {
  e.addEventListener(t, i, a);
}
function vm(e, t, i, a) {
  e.removeEventListener(t, i, a);
}
const $r = /* @__PURE__ */ Symbol("_vei");
function ym(e, t, i, a, n = null) {
  const s = e[$r] || (e[$r] = {}), o = s[t];
  if (a && o)
    o.value = process.env.NODE_ENV !== "production" ? jr(a, t) : a;
  else {
    const [r, c] = Em(t);
    if (a) {
      const d = s[t] = Am(
        process.env.NODE_ENV !== "production" ? jr(a, t) : a,
        n
      );
      pi(e, r, d, c);
    } else o && (vm(e, r, o, c), s[t] = void 0);
  }
}
const km = /(Once|Passive|Capture)$/, wm = /^on:?(?:Once|Passive|Capture)$/;
function Em(e) {
  let t, i;
  for (; (i = e.match(km)) && !wm.test(e); )
    t || (t = {}), e = e.slice(0, e.length - i[1].length), t[i[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : ei(e.slice(2)), t];
}
let ks = 0;
const Im = /* @__PURE__ */ Promise.resolve(), Tm = () => ks || (Im.then(() => ks = 0), ks = Date.now());
function Am(e, t) {
  const i = (a) => {
    if (!a._vts)
      a._vts = Date.now();
    else if (a._vts <= i.attached)
      return;
    const n = i.value;
    if (W(n)) {
      const s = a.stopImmediatePropagation;
      a.stopImmediatePropagation = () => {
        s.call(a), a._stopped = !0;
      };
      const o = n.slice(), r = [a];
      for (let c = 0; c < o.length && !a._stopped; c++) {
        const d = o[c];
        d && yt(
          d,
          t,
          5,
          r
        );
      }
    } else
      yt(
        n,
        t,
        5,
        [a]
      );
  };
  return i.value = e, i.attached = Tm(), i;
}
function jr(e, t) {
  return G(e) || W(e) ? e : (Bt(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), Pe);
}
const Fr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Om = (e, t, i, a, n, s) => {
  const o = n === "svg";
  t === "class" ? lm(e, a, o) : t === "style" ? mm(e, i, a) : Da(t) ? va(t) || ym(e, t, i, a, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : xm(e, t, a, o)) ? (Pr(e, t, a), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Rr(e, t, a, o, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (Sm(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !_e(a))) ? Pr(e, et(t), a, s, t) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), Rr(e, t, a, o));
};
function xm(e, t, i, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Fr(t) && G(i));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const n = e.tagName;
    if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE")
      return !1;
  }
  return Fr(t) && _e(i) ? !1 : t in e;
}
function Sm(e, t) {
  const i = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!i)
    return !1;
  const a = et(t);
  return Array.isArray(i) ? i.some((n) => et(n) === a) : Object.keys(i).some((n) => et(n) === a);
}
const Nn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (i) => Vi(t, i) : t;
};
function Nm(e) {
  e.target.composing = !0;
}
function zr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Mi = /* @__PURE__ */ Symbol("_assign");
function Ur(e, t, i) {
  return t && (e = e.trim()), i && (e = po(e)), e;
}
const Lr = {
  created(e, { modifiers: { lazy: t, trim: i, number: a } }, n) {
    e[Mi] = Nn(n);
    const s = a || n.props && n.props.type === "number";
    pi(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Mi](Ur(e.value, i, s));
    }), (i || s) && pi(e, "change", () => {
      e.value = Ur(e.value, i, s);
    }), t || (pi(e, "compositionstart", Nm), pi(e, "compositionend", zr), pi(e, "change", zr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: i, modifiers: { lazy: a, trim: n, number: s } }, o) {
    if (e[Mi] = Nn(o), e.composing) return;
    const r = (s || e.type === "number") && !/^0\d/.test(e.value) ? po(e.value) : e.value, c = t ?? "";
    if (r === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (a && t === i || n && e.value.trim() === c) || (e.value = c);
  }
}, Mr = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, i) {
    e[Mi] = Nn(i), pi(e, "change", () => {
      const a = e._modelValue, n = Cm(e), s = e.checked, o = e[Mi];
      if (W(a)) {
        const r = $d(a, n), c = r !== -1;
        if (s && !c)
          o(a.concat(n));
        else if (!s && c) {
          const d = [...a];
          d.splice(r, 1), o(d);
        }
      } else if (Fn(a)) {
        const r = new Set(a);
        s ? r.add(n) : r.delete(n), o(r);
      } else
        o(Yu(e, s));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Br,
  beforeUpdate(e, t, i) {
    e[Mi] = Nn(i), Br(e, t, i);
  }
};
function Br(e, { value: t, oldValue: i }, a) {
  e._modelValue = t;
  let n;
  if (W(t))
    n = $d(t, a.props.value) > -1;
  else if (Fn(t))
    n = t.has(a.props.value);
  else {
    if (t === i) return;
    n = Pa(t, Yu(e, !0));
  }
  e.checked !== n && (e.checked = n);
}
function Cm(e) {
  return "_value" in e ? e._value : e.value;
}
function Yu(e, t) {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}
const Dm = ["ctrl", "shift", "alt", "meta"], Vm = {
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
  exact: (e, t) => Dm.some((i) => e[`${i}Key`] && !t.includes(i))
}, Zr = (e, t) => {
  if (!e) return e;
  const i = e._withMods || (e._withMods = {}), a = t.join(".");
  return i[a] || (i[a] = ((n, ...s) => {
    for (let o = 0; o < t.length; o++) {
      const r = Vm[t[o]];
      if (r && r(n, t)) return;
    }
    return e(n, ...s);
  }));
}, Rm = /* @__PURE__ */ Ae({ patchProp: Om }, dm);
let Hr;
function Pm() {
  return Hr || (Hr = zg(Rm));
}
const $m = ((...e) => {
  const t = Pm().createApp(...e);
  process.env.NODE_ENV !== "production" && (Fm(t), zm(t));
  const { mount: i } = t;
  return t.mount = (a) => {
    const n = Um(a);
    if (!n) return;
    const s = t._component;
    !G(s) && !s.render && !s.template && (s.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
    const o = i(n, !1, jm(n));
    return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), o;
  }, t;
});
function jm(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Fm(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Lf(t) || Mf(t) || Bf(t),
    writable: !1
  });
}
function zm(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        Bt(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const i = e.config.compilerOptions, a = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return Bt(a), i;
      },
      set() {
        Bt(a);
      }
    });
  }
}
function Um(e) {
  if (_e(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Bt(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Bt(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
function Lm() {
  om();
}
process.env.NODE_ENV !== "production" && Lm();
var Mm = Object.create, Xu = Object.defineProperty, Bm = Object.getOwnPropertyDescriptor, So = Object.getOwnPropertyNames, Zm = Object.getPrototypeOf, Hm = Object.prototype.hasOwnProperty, Km = (e, t) => function() {
  return e && (t = (0, e[So(e)[0]])(e = 0)), t;
}, Wm = (e, t) => function() {
  return t || (0, e[So(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, qm = (e, t, i, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of So(t))
      !Hm.call(e, n) && n !== i && Xu(e, n, { get: () => t[n], enumerable: !(a = Bm(t, n)) || a.enumerable });
  return e;
}, Gm = (e, t, i) => (i = e != null ? Mm(Zm(e)) : {}, qm(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Xu(i, "default", { value: e, enumerable: !0 }),
  e
)), La = Km({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), Jm = Wm({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    La(), t.exports = a;
    function i(s) {
      return s instanceof Buffer ? Buffer.from(s) : new s.constructor(s.buffer.slice(), s.byteOffset, s.length);
    }
    function a(s) {
      if (s = s || {}, s.circles) return n(s);
      const o = /* @__PURE__ */ new Map();
      if (o.set(Date, (u) => new Date(u)), o.set(Map, (u, p) => new Map(c(Array.from(u), p))), o.set(Set, (u, p) => new Set(c(Array.from(u), p))), s.constructorHandlers)
        for (const u of s.constructorHandlers)
          o.set(u[0], u[1]);
      let r = null;
      return s.proto ? l : d;
      function c(u, p) {
        const g = Object.keys(u), b = new Array(g.length);
        for (let w = 0; w < g.length; w++) {
          const E = g[w], A = u[E];
          typeof A != "object" || A === null ? b[E] = A : A.constructor !== Object && (r = o.get(A.constructor)) ? b[E] = r(A, p) : ArrayBuffer.isView(A) ? b[E] = i(A) : b[E] = p(A);
        }
        return b;
      }
      function d(u) {
        if (typeof u != "object" || u === null) return u;
        if (Array.isArray(u)) return c(u, d);
        if (u.constructor !== Object && (r = o.get(u.constructor)))
          return r(u, d);
        const p = {};
        for (const g in u) {
          if (Object.hasOwnProperty.call(u, g) === !1) continue;
          const b = u[g];
          typeof b != "object" || b === null ? p[g] = b : b.constructor !== Object && (r = o.get(b.constructor)) ? p[g] = r(b, d) : ArrayBuffer.isView(b) ? p[g] = i(b) : p[g] = d(b);
        }
        return p;
      }
      function l(u) {
        if (typeof u != "object" || u === null) return u;
        if (Array.isArray(u)) return c(u, l);
        if (u.constructor !== Object && (r = o.get(u.constructor)))
          return r(u, l);
        const p = {};
        for (const g in u) {
          const b = u[g];
          typeof b != "object" || b === null ? p[g] = b : b.constructor !== Object && (r = o.get(b.constructor)) ? p[g] = r(b, l) : ArrayBuffer.isView(b) ? p[g] = i(b) : p[g] = l(b);
        }
        return p;
      }
    }
    function n(s) {
      const o = [], r = [], c = /* @__PURE__ */ new Map();
      if (c.set(Date, (g) => new Date(g)), c.set(Map, (g, b) => new Map(l(Array.from(g), b))), c.set(Set, (g, b) => new Set(l(Array.from(g), b))), s.constructorHandlers)
        for (const g of s.constructorHandlers)
          c.set(g[0], g[1]);
      let d = null;
      return s.proto ? p : u;
      function l(g, b) {
        const w = Object.keys(g), E = new Array(w.length);
        for (let A = 0; A < w.length; A++) {
          const z = w[A], R = g[z];
          if (typeof R != "object" || R === null)
            E[z] = R;
          else if (R.constructor !== Object && (d = c.get(R.constructor)))
            E[z] = d(R, b);
          else if (ArrayBuffer.isView(R))
            E[z] = i(R);
          else {
            const H = o.indexOf(R);
            H !== -1 ? E[z] = r[H] : E[z] = b(R);
          }
        }
        return E;
      }
      function u(g) {
        if (typeof g != "object" || g === null) return g;
        if (Array.isArray(g)) return l(g, u);
        if (g.constructor !== Object && (d = c.get(g.constructor)))
          return d(g, u);
        const b = {};
        o.push(g), r.push(b);
        for (const w in g) {
          if (Object.hasOwnProperty.call(g, w) === !1) continue;
          const E = g[w];
          if (typeof E != "object" || E === null)
            b[w] = E;
          else if (E.constructor !== Object && (d = c.get(E.constructor)))
            b[w] = d(E, u);
          else if (ArrayBuffer.isView(E))
            b[w] = i(E);
          else {
            const A = o.indexOf(E);
            A !== -1 ? b[w] = r[A] : b[w] = u(E);
          }
        }
        return o.pop(), r.pop(), b;
      }
      function p(g) {
        if (typeof g != "object" || g === null) return g;
        if (Array.isArray(g)) return l(g, p);
        if (g.constructor !== Object && (d = c.get(g.constructor)))
          return d(g, p);
        const b = {};
        o.push(g), r.push(b);
        for (const w in g) {
          const E = g[w];
          if (typeof E != "object" || E === null)
            b[w] = E;
          else if (E.constructor !== Object && (d = c.get(E.constructor)))
            b[w] = d(E, p);
          else if (ArrayBuffer.isView(E))
            b[w] = i(E);
          else {
            const A = o.indexOf(E);
            A !== -1 ? b[w] = r[A] : b[w] = p(E);
          }
        }
        return o.pop(), r.pop(), b;
      }
    }
  }
});
La();
La();
La();
var Qu = typeof navigator < "u", U = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof U.chrome < "u" && U.chrome.devtools;
Qu && (U.self, U.top);
var Kr;
typeof navigator < "u" && ((Kr = navigator.userAgent) == null || Kr.toLowerCase().includes("electron"));
La();
var Ym = Gm(Jm()), Xm = /(?:^|[-_/])(\w)/g;
function Qm(e, t) {
  return t ? t.toUpperCase() : "";
}
function eb(e) {
  return e && `${e}`.replace(Xm, Qm);
}
function tb(e, t) {
  let i = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  i.endsWith(`index${t}`) && (i = i.replace(`/index${t}`, t));
  const a = i.lastIndexOf("/"), n = i.substring(a + 1);
  {
    const s = n.lastIndexOf(t);
    return n.substring(0, s);
  }
}
var Wr = (0, Ym.default)({ circles: !0 });
const ib = {
  trailing: !0
};
function Ki(e, t = 25, i = {}) {
  if (i = { ...ib, ...i }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let a, n, s = [], o, r;
  const c = (d, l) => (o = ab(e, d, l), o.finally(() => {
    if (o = null, i.trailing && r && !n) {
      const u = c(d, r);
      return r = null, u;
    }
  }), o);
  return function(...d) {
    return o ? (i.trailing && (r = d), o) : new Promise((l) => {
      const u = !n && i.leading;
      clearTimeout(n), n = setTimeout(() => {
        n = null;
        const p = i.leading ? a : c(this, d);
        for (const g of s)
          g(p);
        s = [];
      }, t), u ? (a = c(this, d), l(a)) : s.push(l);
    });
  };
}
async function ab(e, t, i) {
  return await e.apply(t, i);
}
function Ws(e, t = {}, i) {
  for (const a in e) {
    const n = e[a], s = i ? `${i}:${a}` : a;
    typeof n == "object" && n !== null ? Ws(n, t, s) : typeof n == "function" && (t[s] = n);
  }
  return t;
}
const nb = { run: (e) => e() }, sb = () => nb, el = typeof console.createTask < "u" ? console.createTask : sb;
function ob(e, t) {
  const i = t.shift(), a = el(i);
  return e.reduce(
    (n, s) => n.then(() => a.run(() => s(...t))),
    Promise.resolve()
  );
}
function rb(e, t) {
  const i = t.shift(), a = el(i);
  return Promise.all(e.map((n) => a.run(() => n(...t))));
}
function ws(e, t) {
  for (const i of [...e])
    i(t);
}
class cb {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, i, a = {}) {
    if (!t || typeof i != "function")
      return () => {
      };
    const n = t;
    let s;
    for (; this._deprecatedHooks[t]; )
      s = this._deprecatedHooks[t], t = s.to;
    if (s && !a.allowDeprecated) {
      let o = s.message;
      o || (o = `${n} hook has been deprecated` + (s.to ? `, please use ${s.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(o) || (console.warn(o), this._deprecatedMessages.add(o));
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
    let a, n = (...s) => (typeof a == "function" && a(), a = void 0, n = void 0, i(...s));
    return a = this.hook(t, n), a;
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
    for (const n of a)
      this.hook(t, n);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const i in t)
      this.deprecateHook(i, t[i]);
  }
  addHooks(t) {
    const i = Ws(t), a = Object.keys(i).map(
      (n) => this.hook(n, i[n])
    );
    return () => {
      for (const n of a.splice(0, a.length))
        n();
    };
  }
  removeHooks(t) {
    const i = Ws(t);
    for (const a in i)
      this.removeHook(a, i[a]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...i) {
    return i.unshift(t), this.callHookWith(ob, t, ...i);
  }
  callHookParallel(t, ...i) {
    return i.unshift(t), this.callHookWith(rb, t, ...i);
  }
  callHookWith(t, i, ...a) {
    const n = this._before || this._after ? { name: i, args: a, context: {} } : void 0;
    this._before && ws(this._before, n);
    const s = t(
      i in this._hooks ? [...this._hooks[i]] : [],
      a
    );
    return s instanceof Promise ? s.finally(() => {
      this._after && n && ws(this._after, n);
    }) : (this._after && n && ws(this._after, n), s);
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
function tl() {
  return new cb();
}
var db = Object.create, il = Object.defineProperty, ub = Object.getOwnPropertyDescriptor, No = Object.getOwnPropertyNames, lb = Object.getPrototypeOf, fb = Object.prototype.hasOwnProperty, pb = (e, t) => function() {
  return e && (t = (0, e[No(e)[0]])(e = 0)), t;
}, al = (e, t) => function() {
  return t || (0, e[No(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, gb = (e, t, i, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of No(t))
      !fb.call(e, n) && n !== i && il(e, n, { get: () => t[n], enumerable: !(a = ub(t, n)) || a.enumerable });
  return e;
}, mb = (e, t, i) => (i = e != null ? db(lb(e)) : {}, gb(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  il(i, "default", { value: e, enumerable: !0 }),
  e
)), D = pb({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), bb = al({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    D(), (function(i) {
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
      }, n = [
        // burmese
        "်",
        // Dhivehi
        "ް"
      ], s = {
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
      }, o = {
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
      }, c = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), d = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), l = [".", "!", "~", "*", "'", "(", ")"].join(""), u = function(E, A) {
        var z = "-", R = "", H = "", N = !0, ee = {}, B, le, q, j, $, Q, re, Ce, je, pe, P, J, te, Me, Ue = "";
        if (typeof E != "string")
          return "";
        if (typeof A == "string" && (z = A), re = r.en, Ce = o.en, typeof A == "object") {
          B = A.maintainCase || !1, ee = A.custom && typeof A.custom == "object" ? A.custom : ee, q = +A.truncate > 1 && A.truncate || !1, j = A.uric || !1, $ = A.uricNoSlash || !1, Q = A.mark || !1, N = !(A.symbols === !1 || A.lang === !1), z = A.separator || z, j && (Ue += c), $ && (Ue += d), Q && (Ue += l), re = A.lang && r[A.lang] && N ? r[A.lang] : N ? r.en : {}, Ce = A.lang && o[A.lang] ? o[A.lang] : A.lang === !1 || A.lang === !0 ? {} : o.en, A.titleCase && typeof A.titleCase.length == "number" && Array.prototype.toString.call(A.titleCase) ? (A.titleCase.forEach(function(Oe) {
            ee[Oe + ""] = Oe + "";
          }), le = !0) : le = !!A.titleCase, A.custom && typeof A.custom.length == "number" && Array.prototype.toString.call(A.custom) && A.custom.forEach(function(Oe) {
            ee[Oe + ""] = Oe + "";
          }), Object.keys(ee).forEach(function(Oe) {
            var Be;
            Oe.length > 1 ? Be = new RegExp("\\b" + g(Oe) + "\\b", "gi") : Be = new RegExp(g(Oe), "gi"), E = E.replace(Be, ee[Oe]);
          });
          for (P in ee)
            Ue += P;
        }
        for (Ue += z, Ue = g(Ue), E = E.replace(/(^\s+|\s+$)/g, ""), te = !1, Me = !1, pe = 0, J = E.length; pe < J; pe++)
          P = E[pe], b(P, ee) ? te = !1 : Ce[P] ? (P = te && Ce[P].match(/[A-Za-z0-9]/) ? " " + Ce[P] : Ce[P], te = !1) : P in a ? (pe + 1 < J && n.indexOf(E[pe + 1]) >= 0 ? (H += P, P = "") : Me === !0 ? (P = s[H] + a[P], H = "") : P = te && a[P].match(/[A-Za-z0-9]/) ? " " + a[P] : a[P], te = !1, Me = !1) : P in s ? (H += P, P = "", pe === J - 1 && (P = s[H]), Me = !0) : /* process symbol chars */ re[P] && !(j && c.indexOf(P) !== -1) && !($ && d.indexOf(P) !== -1) ? (P = te || R.substr(-1).match(/[A-Za-z0-9]/) ? z + re[P] : re[P], P += E[pe + 1] !== void 0 && E[pe + 1].match(/[A-Za-z0-9]/) ? z : "", te = !0) : (Me === !0 ? (P = s[H] + P, H = "", Me = !1) : te && (/[A-Za-z0-9]/.test(P) || R.substr(-1).match(/A-Za-z0-9]/)) && (P = " " + P), te = !1), R += P.replace(new RegExp("[^\\w\\s" + Ue + "_-]", "g"), z);
        return le && (R = R.replace(/(\w)(\S*)/g, function(Oe, Be, qt) {
          var Gt = Be.toUpperCase() + (qt !== null ? qt : "");
          return Object.keys(ee).indexOf(Gt.toLowerCase()) < 0 ? Gt : Gt.toLowerCase();
        })), R = R.replace(/\s+/g, z).replace(new RegExp("\\" + z + "+", "g"), z).replace(new RegExp("(^\\" + z + "+|\\" + z + "+$)", "g"), ""), q && R.length > q && (je = R.charAt(q) === z, R = R.slice(0, q), je || (R = R.slice(0, R.lastIndexOf(z)))), !B && !le && (R = R.toLowerCase()), R;
      }, p = function(E) {
        return function(z) {
          return u(z, E);
        };
      }, g = function(E) {
        return E.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, b = function(w, E) {
        for (var A in E)
          if (E[A] === w)
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
}), hb = al({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    D(), t.exports = bb();
  }
});
D();
D();
D();
D();
D();
D();
D();
D();
function _b(e) {
  var t;
  const i = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return i === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : i;
}
function vb(e) {
  const t = e.__file;
  if (t)
    return eb(tb(t, ".vue"));
}
function qr(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function Co(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function nl(e) {
  var t, i;
  const a = (t = e.subTree) == null ? void 0 : t.type, n = Co(e);
  return n ? ((i = n?.types) == null ? void 0 : i.Fragment) === a : !1;
}
function es(e) {
  var t, i, a;
  const n = _b(e?.type || {});
  if (n)
    return n;
  if (e?.root === e)
    return "Root";
  for (const o in (i = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : i.components)
    if (e.parent.type.components[o] === e?.type)
      return qr(e, o);
  for (const o in (a = e.appContext) == null ? void 0 : a.components)
    if (e.appContext.components[o] === e?.type)
      return qr(e, o);
  const s = vb(e?.type || {});
  return s || "Anonymous Component";
}
function yb(e) {
  var t, i, a;
  const n = (a = (i = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : i.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? a : 0, s = e === e?.root ? "root" : e.uid;
  return `${n}:${s}`;
}
function qs(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function kb() {
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
var Ga;
function wb(e) {
  return Ga || (Ga = document.createRange()), Ga.selectNode(e), Ga.getBoundingClientRect();
}
function Eb(e) {
  const t = kb();
  if (!e.children)
    return t;
  for (let i = 0, a = e.children.length; i < a; i++) {
    const n = e.children[i];
    let s;
    if (n.component)
      s = Ei(n.component);
    else if (n.el) {
      const o = n.el;
      o.nodeType === 1 || o.getBoundingClientRect ? s = o.getBoundingClientRect() : o.nodeType === 3 && o.data.trim() && (s = wb(o));
    }
    s && Ib(t, s);
  }
  return t;
}
function Ib(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var Gr = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function Ei(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? Gr : nl(e) ? Eb(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? Ei(e.subTree.component) : Gr;
}
D();
function Do(e) {
  return nl(e) ? Tb(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function Tb(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((i) => {
    i.component ? t.push(...Do(i.component)) : i?.el && t.push(i.el);
  }), t;
}
var sl = "__vue-devtools-component-inspector__", ol = "__vue-devtools-component-inspector__card__", rl = "__vue-devtools-component-inspector__name__", cl = "__vue-devtools-component-inspector__indicator__", dl = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, Ab = {
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
}, Ob = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function Xi() {
  return document.getElementById(sl);
}
function xb() {
  return document.getElementById(ol);
}
function Sb() {
  return document.getElementById(cl);
}
function Nb() {
  return document.getElementById(rl);
}
function Vo(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function Ro(e) {
  var t;
  const i = document.createElement("div");
  i.id = (t = e.elementId) != null ? t : sl, Object.assign(i.style, {
    ...dl,
    ...Vo(e.bounds),
    ...e.style
  });
  const a = document.createElement("span");
  a.id = ol, Object.assign(a.style, {
    ...Ab,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const n = document.createElement("span");
  n.id = rl, n.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const s = document.createElement("i");
  return s.id = cl, s.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(s.style, Ob), a.appendChild(n), a.appendChild(s), i.appendChild(a), document.body.appendChild(i), i;
}
function Po(e) {
  const t = Xi(), i = xb(), a = Nb(), n = Sb();
  t && (Object.assign(t.style, {
    ...dl,
    ...Vo(e.bounds)
  }), Object.assign(i.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), a.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, n.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function Cb(e) {
  const t = Ei(e);
  if (!t.width && !t.height)
    return;
  const i = es(e);
  Xi() ? Po({ bounds: t, name: i }) : Ro({ bounds: t, name: i });
}
function ul() {
  const e = Xi();
  e && (e.style.display = "none");
}
var Gs = null;
function Js(e) {
  const t = e.target;
  if (t) {
    const i = t.__vueParentComponent;
    if (i && (Gs = i, i.vnode.el)) {
      const n = Ei(i), s = es(i);
      Xi() ? Po({ bounds: n, name: s }) : Ro({ bounds: n, name: s });
    }
  }
}
function Db(e, t) {
  if (e.preventDefault(), e.stopPropagation(), Gs) {
    const i = yb(Gs);
    t(i);
  }
}
var Cn = null;
function Vb() {
  ul(), window.removeEventListener("mouseover", Js), window.removeEventListener("click", Cn, !0), Cn = null;
}
function Rb() {
  return window.addEventListener("mouseover", Js), new Promise((e) => {
    function t(i) {
      i.preventDefault(), i.stopPropagation(), Db(i, (a) => {
        window.removeEventListener("click", t, !0), Cn = null, window.removeEventListener("mouseover", Js);
        const n = Xi();
        n && (n.style.display = "none"), e(JSON.stringify({ id: a }));
      });
    }
    Cn = t, window.addEventListener("click", t, !0);
  });
}
function Pb(e) {
  const t = qs(Je.value, e.id);
  if (t) {
    const [i] = Do(t);
    if (typeof i.scrollIntoView == "function")
      i.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const a = Ei(t), n = document.createElement("div"), s = {
        ...Vo(a),
        position: "absolute"
      };
      Object.assign(n.style, s), document.body.appendChild(n), n.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(n);
      }, 2e3);
    }
    setTimeout(() => {
      const a = Ei(t);
      if (a.width || a.height) {
        const n = es(t), s = Xi();
        s ? Po({ ...e, name: n, bounds: a }) : Ro({ ...e, name: n, bounds: a }), setTimeout(() => {
          s && (s.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
D();
var Jr, Yr;
(Yr = (Jr = U).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (Jr.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function $b(e) {
  let t = 0;
  const i = setInterval(() => {
    U.__VUE_INSPECTOR__ && (clearInterval(i), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(i);
  }, 30);
}
function jb() {
  const e = U.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...i) => {
    e.disable(), t(...i);
  };
}
function Fb() {
  return new Promise((e) => {
    function t() {
      jb(), e(U.__VUE_INSPECTOR__);
    }
    U.__VUE_INSPECTOR__ ? t() : $b(() => {
      t();
    });
  });
}
D();
D();
function zb(e) {
  return !!(e && e.__v_isReadonly);
}
function ll(e) {
  return zb(e) ? ll(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Es(e) {
  return !!(e && e.__v_isRef === !0);
}
function da(e) {
  const t = e && e.__v_raw;
  return t ? da(t) : e;
}
var Ub = class {
  constructor() {
    this.refEditor = new Lb();
  }
  set(e, t, i, a) {
    const n = Array.isArray(t) ? t : t.split(".");
    for (; n.length > 1; ) {
      const r = n.shift();
      e instanceof Map ? e = e.get(r) : e instanceof Set ? e = Array.from(e.values())[r] : e = e[r], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const s = n[0], o = this.refEditor.get(e)[s];
    a ? a(e, s, i) : this.refEditor.isRef(o) ? this.refEditor.set(o, i) : e[s] = i;
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
    const a = Array.isArray(t) ? t.slice() : t.split("."), n = i ? 2 : 1;
    for (; e && a.length > n; ) {
      const s = a.shift();
      e = e[s], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, a[0]);
  }
  createDefaultSetCallback(e) {
    return (t, i, a) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(i, 1) : da(t) instanceof Map ? t.delete(i) : da(t) instanceof Set ? t.delete(Array.from(t.values())[i]) : Reflect.deleteProperty(t, i)), !e.remove) {
        const n = t[e.newKey || i];
        this.refEditor.isRef(n) ? this.refEditor.set(n, a) : da(t) instanceof Map ? t.set(e.newKey || i, a) : da(t) instanceof Set ? t.add(a) : t[e.newKey || i] = a;
      }
    };
  }
}, Lb = class {
  set(e, t) {
    if (Es(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((n) => e.add(n));
        return;
      }
      const i = Object.keys(t);
      if (e instanceof Map) {
        const n = new Set(e.keys());
        i.forEach((s) => {
          e.set(s, Reflect.get(t, s)), n.delete(s);
        }), n.forEach((s) => e.delete(s));
        return;
      }
      const a = new Set(Object.keys(e));
      i.forEach((n) => {
        Reflect.set(e, n, Reflect.get(t, n)), a.delete(n);
      }), a.forEach((n) => Reflect.deleteProperty(e, n));
    }
  }
  get(e) {
    return Es(e) ? e.value : e;
  }
  isRef(e) {
    return Es(e) || ll(e);
  }
};
D();
D();
D();
var Mb = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function Bb() {
  if (typeof window > "u" || !Qu || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = typeof localStorage.getItem < "u" ? localStorage.getItem(Mb) : null;
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
D();
D();
D();
var Xr, Qr;
(Qr = (Xr = U).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (Xr.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Zb = new Proxy(U.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
});
function Hb(e, t) {
  $e.timelineLayersState[t.id] = !1, Zb.push({
    ...e,
    descriptorId: t.id,
    appRecord: Co(t.app)
  });
}
var ec, tc;
(tc = (ec = U).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (ec.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var $o = new Proxy(U.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
}), fl = Ki(() => {
  Qi.hooks.callHook("sendInspectorToClient", pl());
});
function Kb(e, t) {
  var i, a;
  $o.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (i = e.treeFilterPlaceholder) != null ? i : "Search tree...",
    stateFilterPlaceholder: (a = e.stateFilterPlaceholder) != null ? a : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: Co(t.app)
  }), fl();
}
function pl() {
  return $o.filter((e) => e.descriptor.app === Je.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
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
function ln(e, t) {
  return $o.find((i) => i.options.id === e && (t ? i.descriptor.app === t : !0));
}
function Wb() {
  const e = tl();
  e.hook("addInspector", ({ inspector: a, plugin: n }) => {
    Kb(a, n.descriptor);
  });
  const t = Ki(async ({ inspectorId: a, plugin: n }) => {
    var s;
    if (!a || !((s = n?.descriptor) != null && s.app) || $e.highPerfModeEnabled)
      return;
    const o = ln(a, n.descriptor.app), r = {
      app: n.descriptor.app,
      inspectorId: a,
      filter: o?.treeFilter || "",
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
  const i = Ki(async ({ inspectorId: a, plugin: n }) => {
    var s;
    if (!a || !((s = n?.descriptor) != null && s.app) || $e.highPerfModeEnabled)
      return;
    const o = ln(a, n.descriptor.app), r = {
      app: n.descriptor.app,
      inspectorId: a,
      nodeId: o?.selectedNodeId || "",
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
  return e.hook("sendInspectorState", i), e.hook("customInspectorSelectNode", ({ inspectorId: a, nodeId: n, plugin: s }) => {
    const o = ln(a, s.descriptor.app);
    o && (o.selectedNodeId = n);
  }), e.hook("timelineLayerAdded", ({ options: a, plugin: n }) => {
    Hb(a, n.descriptor);
  }), e.hook("timelineEventAdded", ({ options: a, plugin: n }) => {
    var s;
    const o = ["performance", "component-event", "keyboard", "mouse"];
    $e.highPerfModeEnabled || !((s = $e.timelineLayersState) != null && s[n.descriptor.id]) && !o.includes(a.layerId) || e.callHookWith(
      async (r) => {
        await Promise.all(r.map((c) => c(a)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  }), e.hook("getComponentInstances", async ({ app: a }) => {
    const n = a.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!n)
      return null;
    const s = n.id.toString();
    return [...n.instanceMap].filter(([r]) => r.split(":")[0] === s).map(([, r]) => r);
  }), e.hook("getComponentBounds", async ({ instance: a }) => Ei(a)), e.hook("getComponentName", ({ instance: a }) => es(a)), e.hook("componentHighlight", ({ uid: a }) => {
    const n = Je.value.instanceMap.get(a);
    n && Cb(n);
  }), e.hook("componentUnhighlight", () => {
    ul();
  }), e;
}
var ic, ac;
(ac = (ic = U).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (ic.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var nc, sc;
(sc = (nc = U).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (nc.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var oc, rc;
(rc = (oc = U).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (oc.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var cc, dc;
(dc = (cc = U).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (cc.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var uc, lc;
(lc = (uc = U).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (uc.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var gi = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function qb() {
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
    timelineLayersState: Bb()
  };
}
var fc, pc;
(pc = (fc = U)[gi]) != null || (fc[gi] = qb());
var Gb = Ki((e) => {
  Qi.hooks.callHook("devtoolsStateUpdated", { state: e });
});
Ki((e, t) => {
  Qi.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var ts = new Proxy(U.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, i) {
    return t === "value" ? U.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : U.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), Je = new Proxy(U.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, i) {
    return t === "value" ? U.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? U.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : U.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function gl() {
  Gb({
    ...U[gi],
    appRecords: ts.value,
    activeAppRecordId: Je.id,
    tabs: U.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: U.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function Jb(e) {
  U.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, gl();
}
function Yb(e) {
  U.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, gl();
}
var $e = new Proxy(U[gi], {
  get(e, t) {
    return t === "appRecords" ? ts : t === "activeAppRecordId" ? Je.id : t === "tabs" ? U.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? U.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : U[gi][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, i) {
    return { ...U[gi] }, e[t] = i, U[gi][t] = i, !0;
  }
});
function Xb(e = {}) {
  var t, i, a;
  const { file: n, host: s, baseUrl: o = window.location.origin, line: r = 0, column: c = 0 } = e;
  if (n) {
    if (s === "chrome-extension") {
      const d = n.replace(/\\/g, "\\\\"), l = (i = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? i : "/";
      fetch(`${l}__open-in-editor?file=${encodeURI(n)}`).then((u) => {
        if (!u.ok) {
          const p = `Opening component ${d} failed`;
          console.log(`%c${p}`, "color:red");
        }
      });
    } else if ($e.vitePluginDetected) {
      const d = (a = U.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? a : o;
      U.__VUE_INSPECTOR__.openInEditor(d, n, r, c);
    }
  }
}
D();
D();
D();
D();
D();
var gc, mc;
(mc = (gc = U).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (gc.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var jo = new Proxy(U.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
});
function Ys(e) {
  const t = {};
  return Object.keys(e).forEach((i) => {
    t[i] = e[i].defaultValue;
  }), t;
}
function Fo(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function Qb(e) {
  var t, i, a;
  const n = (i = (t = jo.find((s) => {
    var o;
    return s[0].id === e && !!((o = s[0]) != null && o.settings);
  })) == null ? void 0 : t[0]) != null ? i : null;
  return (a = n?.settings) != null ? a : null;
}
function ml(e, t) {
  var i, a, n;
  const s = Fo(e);
  if (s) {
    const o = localStorage.getItem(s);
    if (o)
      return JSON.parse(o);
  }
  if (e) {
    const o = (a = (i = jo.find((r) => r[0].id === e)) == null ? void 0 : i[0]) != null ? a : null;
    return Ys((n = o?.settings) != null ? n : {});
  }
  return Ys(t);
}
function eh(e, t) {
  const i = Fo(e);
  localStorage.getItem(i) || localStorage.setItem(i, JSON.stringify(Ys(t)));
}
function th(e, t, i) {
  const a = Fo(e), n = localStorage.getItem(a), s = JSON.parse(n || "{}"), o = {
    ...s,
    [t]: i
  };
  localStorage.setItem(a, JSON.stringify(o)), Qi.hooks.callHookWith(
    (r) => {
      r.forEach((c) => c({
        pluginId: e,
        key: t,
        oldValue: s[t],
        newValue: i,
        settings: o
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
D();
var bc, hc, at = (hc = (bc = U).__VUE_DEVTOOLS_HOOK) != null ? hc : bc.__VUE_DEVTOOLS_HOOK = tl(), ih = {
  vueAppInit(e) {
    at.hook("app:init", e);
  },
  vueAppUnmount(e) {
    at.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    at.hook("app:connected", e);
  },
  componentAdded(e) {
    return at.hook("component:added", e);
  },
  componentEmit(e) {
    return at.hook("component:emit", e);
  },
  componentUpdated(e) {
    return at.hook("component:updated", e);
  },
  componentRemoved(e) {
    return at.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    at.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return at.hook("perf:start", e);
  },
  perfEnd(e) {
    return at.hook("perf:end", e);
  }
}, bl = {
  on: ih,
  setupDevToolsPlugin(e, t) {
    return at.callHook("devtools-plugin:setup", e, t);
  }
}, ah = class {
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
    if ($e.highPerfModeEnabled)
      return;
    const i = pl().find((a) => a.packageName === this.plugin.descriptor.packageName);
    if (i?.id) {
      if (e) {
        const a = [
          e.appContext.app,
          e.uid,
          (t = e.parent) == null ? void 0 : t.uid,
          e
        ];
        at.callHook("component:updated", ...a);
      } else
        at.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: i.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && eh(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    $e.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    $e.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return $e.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    $e.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return ml(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
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
}, nh = ah;
D();
D();
D();
D();
var sh = "__vue_devtool_undefined__", oh = "__vue_devtool_infinity__", rh = "__vue_devtool_negative_infinity__", ch = "__vue_devtool_nan__";
D();
D();
var dh = {
  [sh]: "undefined",
  [ch]: "NaN",
  [oh]: "Infinity",
  [rh]: "-Infinity"
};
Object.entries(dh).reduce((e, [t, i]) => (e[i] = t, e), {});
D();
D();
D();
D();
D();
var _c, vc;
(vc = (_c = U).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (_c.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function hl(e, t) {
  return bl.setupDevToolsPlugin(e, t);
}
function uh(e, t) {
  const [i, a] = e;
  if (i.app !== t)
    return;
  const n = new nh({
    plugin: {
      setupFn: a,
      descriptor: i
    },
    ctx: Qi
  });
  i.packageName === "vuex" && n.on.editInspectorState((s) => {
    n.sendInspectorState(s.inspectorId);
  }), a(n);
}
function _l(e, t) {
  U.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || $e.highPerfModeEnabled && !t?.inspectingComponent || (U.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), jo.forEach((i) => {
    uh(i, e);
  }));
}
D();
D();
var Ta = "__VUE_DEVTOOLS_ROUTER__", Wi = "__VUE_DEVTOOLS_ROUTER_INFO__", yc, kc;
(kc = (yc = U)[Wi]) != null || (yc[Wi] = {
  currentRoute: null,
  routes: []
});
var wc, Ec;
(Ec = (wc = U)[Ta]) != null || (wc[Ta] = {});
new Proxy(U[Wi], {
  get(e, t) {
    return U[Wi][t];
  }
});
new Proxy(U[Ta], {
  get(e, t) {
    if (t === "value")
      return U[Ta];
  }
});
function lh(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((i) => !t.has(i.path) && t.set(i.path, 1));
}
function zo(e) {
  return e.map((t) => {
    let { path: i, name: a, children: n, meta: s } = t;
    return n?.length && (n = zo(n)), {
      path: i,
      name: a,
      children: n,
      meta: s
    };
  });
}
function fh(e) {
  if (e) {
    const { fullPath: t, hash: i, href: a, path: n, name: s, matched: o, params: r, query: c } = e;
    return {
      fullPath: t,
      hash: i,
      href: a,
      path: n,
      name: s,
      params: r,
      query: c,
      matched: zo(o)
    };
  }
  return e;
}
function ph(e, t) {
  function i() {
    var a;
    const n = (a = e.app) == null ? void 0 : a.config.globalProperties.$router, s = fh(n?.currentRoute.value), o = zo(lh(n)), r = console.warn;
    console.warn = () => {
    }, U[Wi] = {
      currentRoute: s ? Wr(s) : {},
      routes: Wr(o)
    }, U[Ta] = n, console.warn = r;
  }
  i(), bl.on.componentUpdated(Ki(() => {
    var a;
    ((a = t.value) == null ? void 0 : a.app) === e.app && (i(), !$e.highPerfModeEnabled && Qi.hooks.callHook("routerInfoUpdated", { state: U[Wi] }));
  }, 200));
}
function gh(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const i = {
        ...t,
        app: Je.value.app,
        rootNodes: []
      };
      return await new Promise((a) => {
        e.callHookWith(
          async (n) => {
            await Promise.all(n.map((s) => s(i))), a();
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
        app: Je.value.app,
        state: null
      }, a = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((n) => {
        e.callHookWith(
          async (s) => {
            await Promise.all(s.map((o) => o(i, a))), n();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), i.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const i = new Ub(), a = {
        ...t,
        app: Je.value.app,
        set: (n, s = t.path, o = t.state.value, r) => {
          i.set(n, s, o, r || i.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (n) => {
          n.forEach((s) => s(a));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const i = ln(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: i.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return Rb();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return Vb();
    },
    // get component render code
    getComponentRenderCode(t) {
      const i = qs(Je.value, t);
      if (i)
        return typeof i?.type != "function" ? i.render.toString() : i.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return Pb({ id: t });
    },
    // open in editor
    openInEditor: Xb,
    // get vue inspector
    getVueInspector: Fb,
    // toggle app
    toggleApp(t, i) {
      const a = ts.value.find((n) => n.id === t);
      a && (Yb(t), Jb(a), ph(a, Je), fl(), _l(a.app, i));
    },
    // inspect dom
    inspectDOM(t) {
      const i = qs(Je.value, t);
      if (i) {
        const [a] = Do(i);
        a && (U.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = a);
      }
    },
    updatePluginSettings(t, i, a) {
      th(t, i, a);
    },
    getPluginSettings(t) {
      return {
        options: Qb(t),
        values: ml(t)
      };
    }
  };
}
D();
var Ic, Tc;
(Tc = (Ic = U).__VUE_DEVTOOLS_ENV__) != null || (Ic.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var Ac = Wb(), Oc, xc;
(xc = (Oc = U).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (Oc.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: Ac,
  get state() {
    return {
      ...$e,
      activeAppRecordId: Je.id,
      activeAppRecord: Je.value,
      appRecords: ts.value
    };
  },
  api: gh(Ac)
});
var Qi = U.__VUE_DEVTOOLS_KIT_CONTEXT__;
D();
mb(hb());
var Sc, Nc;
(Nc = (Sc = U).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (Sc.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
D();
D();
function mh(e) {
  $e.highPerfModeEnabled = e ?? !$e.highPerfModeEnabled, !e && Je.value && _l(Je.value.app);
}
D();
D();
D();
function bh(e) {
  $e.devtoolsClientDetected = {
    ...$e.devtoolsClientDetected,
    ...e
  };
  const t = Object.values($e.devtoolsClientDetected).some(Boolean);
  mh(!t);
}
var Cc, Dc;
(Dc = (Cc = U).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (Cc.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = bh);
D();
D();
D();
D();
D();
D();
var hh = class {
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
}, vl = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new hh();
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
}, _h = class extends vl {
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
D();
D();
function vh(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const i in e)
    e.hasOwnProperty(i) && t.push(e[i]);
  return t;
}
function yh(e, t) {
  const i = vh(e);
  if ("find" in i)
    return i.find(t);
  const a = i;
  for (let n = 0; n < a.length; n++) {
    const s = a[n];
    if (t(s))
      return s;
  }
}
function qi(e, t) {
  Object.entries(e).forEach(([i, a]) => t(a, i));
}
function fn(e, t) {
  return e.indexOf(t) !== -1;
}
function Vc(e, t) {
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    if (t(a))
      return a;
  }
}
var kh = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return yh(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
D();
D();
var wh = (e) => Object.prototype.toString.call(e).slice(8, -1), yl = (e) => typeof e > "u", Eh = (e) => e === null, Aa = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, Xs = (e) => Aa(e) && Object.keys(e).length === 0, ii = (e) => Array.isArray(e), Ih = (e) => typeof e == "string", Th = (e) => typeof e == "number" && !isNaN(e), Ah = (e) => typeof e == "boolean", Oh = (e) => e instanceof RegExp, Oa = (e) => e instanceof Map, xa = (e) => e instanceof Set, kl = (e) => wh(e) === "Symbol", xh = (e) => e instanceof Date && !isNaN(e.valueOf()), Sh = (e) => e instanceof Error, Rc = (e) => typeof e == "number" && isNaN(e), Nh = (e) => Ah(e) || Eh(e) || yl(e) || Th(e) || Ih(e) || kl(e), Ch = (e) => typeof e == "bigint", Dh = (e) => e === 1 / 0 || e === -1 / 0, Vh = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), Rh = (e) => e instanceof URL;
D();
var wl = (e) => e.replace(/\./g, "\\."), Is = (e) => e.map(String).map(wl).join("."), _a = (e) => {
  const t = [];
  let i = "";
  for (let n = 0; n < e.length; n++) {
    let s = e.charAt(n);
    if (s === "\\" && e.charAt(n + 1) === ".") {
      i += ".", n++;
      continue;
    }
    if (s === ".") {
      t.push(i), i = "";
      continue;
    }
    i += s;
  }
  const a = i;
  return t.push(a), t;
};
D();
function Tt(e, t, i, a) {
  return {
    isApplicable: e,
    annotation: t,
    transform: i,
    untransform: a
  };
}
var El = [
  Tt(yl, "undefined", () => null, () => {
  }),
  Tt(Ch, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Tt(xh, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Tt(Sh, "Error", (e, t) => {
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
  Tt(Oh, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), i = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, i);
  }),
  Tt(
    xa,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Tt(Oa, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Tt((e) => Rc(e) || Dh(e), "number", (e) => Rc(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Tt((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Tt(Rh, "URL", (e) => e.toString(), (e) => new URL(e))
];
function is(e, t, i, a) {
  return {
    isApplicable: e,
    annotation: t,
    transform: i,
    untransform: a
  };
}
var Il = is((e, t) => kl(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, i) => {
  const a = i.symbolRegistry.getValue(t[1]);
  if (!a)
    throw new Error("Trying to deserialize unknown symbol");
  return a;
}), Ph = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), Tl = is(Vh, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const i = Ph[t[1]];
  if (!i)
    throw new Error("Trying to deserialize unknown typed array");
  return new i(e);
});
function Al(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var Ol = is(Al, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const i = t.classRegistry.getAllowedProps(e.constructor);
  if (!i)
    return { ...e };
  const a = {};
  return i.forEach((n) => {
    a[n] = e[n];
  }), a;
}, (e, t, i) => {
  const a = i.classRegistry.getValue(t[1]);
  if (!a)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(a.prototype), e);
}), xl = is((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, i) => {
  const a = i.customTransformerRegistry.findByName(t[1]);
  if (!a)
    throw new Error("Trying to deserialize unknown custom value");
  return a.deserialize(e);
}), $h = [Ol, Il, xl, Tl], Pc = (e, t) => {
  const i = Vc($h, (n) => n.isApplicable(e, t));
  if (i)
    return {
      value: i.transform(e, t),
      type: i.annotation(e, t)
    };
  const a = Vc(El, (n) => n.isApplicable(e, t));
  if (a)
    return {
      value: a.transform(e, t),
      type: a.annotation
    };
}, Sl = {};
El.forEach((e) => {
  Sl[e.annotation] = e;
});
var jh = (e, t, i) => {
  if (ii(t))
    switch (t[0]) {
      case "symbol":
        return Il.untransform(e, t, i);
      case "class":
        return Ol.untransform(e, t, i);
      case "custom":
        return xl.untransform(e, t, i);
      case "typed-array":
        return Tl.untransform(e, t, i);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const a = Sl[t];
    if (!a)
      throw new Error("Unknown transformation: " + t);
    return a.untransform(e, i);
  }
};
D();
var Pi = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const i = e.keys();
  for (; t > 0; )
    i.next(), t--;
  return i.next().value;
};
function Nl(e) {
  if (fn(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (fn(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (fn(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var Fh = (e, t) => {
  Nl(t);
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (xa(e))
      e = Pi(e, +a);
    else if (Oa(e)) {
      const n = +a, s = +t[++i] == 0 ? "key" : "value", o = Pi(e, n);
      switch (s) {
        case "key":
          e = o;
          break;
        case "value":
          e = e.get(o);
          break;
      }
    } else
      e = e[a];
  }
  return e;
}, Qs = (e, t, i) => {
  if (Nl(t), t.length === 0)
    return i(e);
  let a = e;
  for (let s = 0; s < t.length - 1; s++) {
    const o = t[s];
    if (ii(a)) {
      const r = +o;
      a = a[r];
    } else if (Aa(a))
      a = a[o];
    else if (xa(a)) {
      const r = +o;
      a = Pi(a, r);
    } else if (Oa(a)) {
      if (s === t.length - 2)
        break;
      const c = +o, d = +t[++s] == 0 ? "key" : "value", l = Pi(a, c);
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
  const n = t[t.length - 1];
  if (ii(a) ? a[+n] = i(a[+n]) : Aa(a) && (a[n] = i(a[n])), xa(a)) {
    const s = Pi(a, +n), o = i(s);
    s !== o && (a.delete(s), a.add(o));
  }
  if (Oa(a)) {
    const s = +t[t.length - 2], o = Pi(a, s);
    switch (+n == 0 ? "key" : "value") {
      case "key": {
        const c = i(o);
        a.set(c, a.get(o)), c !== o && a.delete(o);
        break;
      }
      case "value": {
        a.set(o, i(a.get(o)));
        break;
      }
    }
  }
  return e;
};
function eo(e, t, i = []) {
  if (!e)
    return;
  if (!ii(e)) {
    qi(e, (s, o) => eo(s, t, [...i, ..._a(o)]));
    return;
  }
  const [a, n] = e;
  n && qi(n, (s, o) => {
    eo(s, t, [...i, ..._a(o)]);
  }), t(a, i);
}
function zh(e, t, i) {
  return eo(t, (a, n) => {
    e = Qs(e, n, (s) => jh(s, a, i));
  }), e;
}
function Uh(e, t) {
  function i(a, n) {
    const s = Fh(e, _a(n));
    a.map(_a).forEach((o) => {
      e = Qs(e, o, () => s);
    });
  }
  if (ii(t)) {
    const [a, n] = t;
    a.forEach((s) => {
      e = Qs(e, _a(s), () => e);
    }), n && qi(n, i);
  } else
    qi(t, i);
  return e;
}
var Lh = (e, t) => Aa(e) || ii(e) || Oa(e) || xa(e) || Al(e, t);
function Mh(e, t, i) {
  const a = i.get(e);
  a ? a.push(t) : i.set(e, [t]);
}
function Bh(e, t) {
  const i = {};
  let a;
  return e.forEach((n) => {
    if (n.length <= 1)
      return;
    t || (n = n.map((r) => r.map(String)).sort((r, c) => r.length - c.length));
    const [s, ...o] = n;
    s.length === 0 ? a = o.map(Is) : i[Is(s)] = o.map(Is);
  }), a ? Xs(i) ? [a] : [a, i] : Xs(i) ? void 0 : i;
}
var Cl = (e, t, i, a, n = [], s = [], o = /* @__PURE__ */ new Map()) => {
  var r;
  const c = Nh(e);
  if (!c) {
    Mh(e, n, t);
    const b = o.get(e);
    if (b)
      return a ? {
        transformedValue: null
      } : b;
  }
  if (!Lh(e, i)) {
    const b = Pc(e, i), w = b ? {
      transformedValue: b.value,
      annotations: [b.type]
    } : {
      transformedValue: e
    };
    return c || o.set(e, w), w;
  }
  if (fn(s, e))
    return {
      transformedValue: null
    };
  const d = Pc(e, i), l = (r = d?.value) != null ? r : e, u = ii(l) ? [] : {}, p = {};
  qi(l, (b, w) => {
    if (w === "__proto__" || w === "constructor" || w === "prototype")
      throw new Error(`Detected property ${w}. This is a prototype pollution risk, please remove it from your object.`);
    const E = Cl(b, t, i, a, [...n, w], [...s, e], o);
    u[w] = E.transformedValue, ii(E.annotations) ? p[w] = E.annotations : Aa(E.annotations) && qi(E.annotations, (A, z) => {
      p[wl(w) + "." + z] = A;
    });
  });
  const g = Xs(p) ? {
    transformedValue: u,
    annotations: d ? [d.type] : void 0
  } : {
    transformedValue: u,
    annotations: d ? [d.type, p] : p
  };
  return c || o.set(e, g), g;
};
D();
D();
function Dl(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function $c(e) {
  return Dl(e) === "Array";
}
function Zh(e) {
  if (Dl(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function Hh(e, t, i, a, n) {
  const s = {}.propertyIsEnumerable.call(a, t) ? "enumerable" : "nonenumerable";
  s === "enumerable" && (e[t] = i), n && s === "nonenumerable" && Object.defineProperty(e, t, {
    value: i,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function to(e, t = {}) {
  if ($c(e))
    return e.map((n) => to(n, t));
  if (!Zh(e))
    return e;
  const i = Object.getOwnPropertyNames(e), a = Object.getOwnPropertySymbols(e);
  return [...i, ...a].reduce((n, s) => {
    if ($c(t.props) && !t.props.includes(s))
      return n;
    const o = e[s], r = to(o, t);
    return Hh(n, s, r, e, t.nonenumerable), n;
  }, {});
}
var be = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new _h(), this.symbolRegistry = new vl((t) => {
      var i;
      return (i = t.description) != null ? i : "";
    }), this.customTransformerRegistry = new kh(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), i = Cl(e, t, this, this.dedupe), a = {
      json: i.transformedValue
    };
    i.annotations && (a.meta = {
      ...a.meta,
      values: i.annotations
    });
    const n = Bh(t, this.dedupe);
    return n && (a.meta = {
      ...a.meta,
      referentialEqualities: n
    }), a;
  }
  deserialize(e) {
    const { json: t, meta: i } = e;
    let a = to(t);
    return i?.values && (a = zh(a, i.values, this)), i?.referentialEqualities && (a = Uh(a, i.referentialEqualities)), a;
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
be.defaultInstance = new be();
be.serialize = be.defaultInstance.serialize.bind(be.defaultInstance);
be.deserialize = be.defaultInstance.deserialize.bind(be.defaultInstance);
be.stringify = be.defaultInstance.stringify.bind(be.defaultInstance);
be.parse = be.defaultInstance.parse.bind(be.defaultInstance);
be.registerClass = be.defaultInstance.registerClass.bind(be.defaultInstance);
be.registerSymbol = be.defaultInstance.registerSymbol.bind(be.defaultInstance);
be.registerCustom = be.defaultInstance.registerCustom.bind(be.defaultInstance);
be.allowErrorProps = be.defaultInstance.allowErrorProps.bind(be.defaultInstance);
D();
D();
D();
D();
D();
D();
D();
D();
D();
D();
D();
D();
D();
D();
D();
var jc, Fc;
(Fc = (jc = U).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (jc.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var zc, Uc;
(Uc = (zc = U).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (zc.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var Lc, Mc;
(Mc = (Lc = U).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (Lc.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Bc, Zc;
(Zc = (Bc = U).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (Bc.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var Hc, Kc;
(Kc = (Hc = U).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (Hc.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var Wc, qc;
(qc = (Wc = U).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (Wc.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
D();
D();
D();
D();
const Mt = typeof window < "u";
let mi;
const Sa = (e) => mi = e;
process.env.NODE_ENV;
const Dn = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Ii(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Vt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Vt || (Vt = {}));
const Gc = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Kh(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Uo(e, t, i) {
  const a = new XMLHttpRequest();
  a.open("GET", e), a.responseType = "blob", a.onload = function() {
    Pl(a.response, t, i);
  }, a.onerror = function() {
    console.error("could not download file");
  }, a.send();
}
function Vl(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function pn(e) {
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
const gn = typeof navigator == "object" ? navigator : { userAgent: "" }, Rl = /Macintosh/.test(gn.userAgent) && /AppleWebKit/.test(gn.userAgent) && !/Safari/.test(gn.userAgent), Pl = Mt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !Rl ? Wh : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in gn ? qh : (
      // Fallback to using FileReader and a popup
      Gh
    )
  )
) : () => {
};
function Wh(e, t = "download", i) {
  const a = document.createElement("a");
  a.download = t, a.rel = "noopener", typeof e == "string" ? (a.href = e, a.origin !== location.origin ? Vl(a.href) ? Uo(e, t, i) : (a.target = "_blank", pn(a)) : pn(a)) : (a.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 4e4), setTimeout(function() {
    pn(a);
  }, 0));
}
function qh(e, t = "download", i) {
  if (typeof e == "string")
    if (Vl(e))
      Uo(e, t, i);
    else {
      const a = document.createElement("a");
      a.href = e, a.target = "_blank", setTimeout(function() {
        pn(a);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Kh(e, i), t);
}
function Gh(e, t, i, a) {
  if (a = a || open("", "_blank"), a && (a.document.title = a.document.body.innerText = "downloading..."), typeof e == "string")
    return Uo(e, t, i);
  const n = e.type === "application/octet-stream", s = /constructor/i.test(String(Gc.HTMLElement)) || "safari" in Gc, o = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((o || n && s || Rl) && typeof FileReader < "u") {
    const r = new FileReader();
    r.onloadend = function() {
      let c = r.result;
      if (typeof c != "string")
        throw a = null, new Error("Wrong reader.result type");
      c = o ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), a ? a.location.href = c : location.assign(c), a = null;
    }, r.readAsDataURL(e);
  } else {
    const r = URL.createObjectURL(e);
    a ? a.location.assign(r) : location.href = r, a = null, setTimeout(function() {
      URL.revokeObjectURL(r);
    }, 4e4);
  }
}
function ze(e, t) {
  const i = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(i, t) : t === "error" ? console.error(i) : t === "warn" ? console.warn(i) : console.log(i);
}
function Lo(e) {
  return "_a" in e && "install" in e;
}
function $l() {
  if (!("clipboard" in navigator))
    return ze("Your browser doesn't support the Clipboard API", "error"), !0;
}
function jl(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (ze('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Jh(e) {
  if (!$l())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), ze("Global state copied to clipboard.");
    } catch (t) {
      if (jl(t))
        return;
      ze("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function Yh(e) {
  if (!$l())
    try {
      Fl(e, JSON.parse(await navigator.clipboard.readText())), ze("Global state pasted from clipboard.");
    } catch (t) {
      if (jl(t))
        return;
      ze("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Xh(e) {
  try {
    Pl(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    ze("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let $t;
function Qh() {
  $t || ($t = document.createElement("input"), $t.type = "file", $t.accept = ".json");
  function e() {
    return new Promise((t, i) => {
      $t.onchange = async () => {
        const a = $t.files;
        if (!a)
          return t(null);
        const n = a.item(0);
        return t(n ? { text: await n.text(), file: n } : null);
      }, $t.oncancel = () => t(null), $t.onerror = i, $t.click();
    });
  }
  return e;
}
async function e_(e) {
  try {
    const i = await Qh()();
    if (!i)
      return;
    const { text: a, file: n } = i;
    Fl(e, JSON.parse(a)), ze(`Global state imported from "${n.name}".`);
  } catch (t) {
    ze("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Fl(e, t) {
  for (const i in t) {
    const a = e.state.value[i];
    a ? Object.assign(a, t[i]) : e.state.value[i] = t[i];
  }
}
function pt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const zl = "🍍 Pinia (root)", mn = "_root";
function t_(e) {
  return Lo(e) ? {
    id: mn,
    label: zl
  } : {
    id: e.$id,
    label: e.$id
  };
}
function i_(e) {
  if (Lo(e)) {
    const i = Array.from(e._s.keys()), a = e._s;
    return {
      state: i.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: i.filter((s) => a.get(s)._getters).map((s) => {
        const o = a.get(s);
        return {
          editable: !1,
          key: s,
          value: o._getters.reduce((r, c) => (r[c] = o[c], r), {})
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
function a_(e) {
  return e ? Array.isArray(e) ? e.reduce((t, i) => (t.keys.push(i.key), t.operations.push(i.type), t.oldValue[i.key] = i.oldValue, t.newValue[i.key] = i.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: pt(e.type),
    key: pt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function n_(e) {
  switch (e) {
    case Vt.direct:
      return "mutation";
    case Vt.patchFunction:
      return "$patch";
    case Vt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let $i = !0;
const bn = [], li = "pinia:mutations", Ze = "pinia", { assign: s_ } = Object, Vn = (e) => "🍍 " + e;
function o_(e, t) {
  hl({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: bn,
    app: e
  }, (i) => {
    typeof i.now != "function" && ze("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), i.addTimelineLayer({
      id: li,
      label: "Pinia 🍍",
      color: 15064968
    }), i.addInspector({
      id: Ze,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Jh(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await Yh(t), i.sendInspectorTree(Ze), i.sendInspectorState(Ze);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Xh(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await e_(t), i.sendInspectorTree(Ze), i.sendInspectorState(Ze);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (a) => {
            const n = t._s.get(a);
            n ? typeof n.$reset != "function" ? ze(`Cannot reset "${a}" store because it doesn't have a "$reset" method implemented.`, "warn") : (n.$reset(), ze(`Store "${a}" reset.`)) : ze(`Cannot reset "${a}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), i.on.inspectComponent((a) => {
      const n = a.componentInstance && a.componentInstance.proxy;
      if (n && n._pStores) {
        const s = a.componentInstance.proxy._pStores;
        Object.values(s).forEach((o) => {
          a.instanceData.state.push({
            type: Vn(o.$id),
            key: "state",
            editable: !0,
            value: o._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ X(o.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => o.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(o.$state).reduce((r, c) => (r[c] = o.$state[c], r), {})
            )
          }), o._getters && o._getters.length && a.instanceData.state.push({
            type: Vn(o.$id),
            key: "getters",
            editable: !1,
            value: o._getters.reduce((r, c) => {
              try {
                r[c] = o[c];
              } catch (d) {
                r[c] = d;
              }
              return r;
            }, {})
          });
        });
      }
    }), i.on.getInspectorTree((a) => {
      if (a.app === e && a.inspectorId === Ze) {
        let n = [t];
        n = n.concat(Array.from(t._s.values())), a.rootNodes = (a.filter ? n.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(a.filter.toLowerCase()) : zl.toLowerCase().includes(a.filter.toLowerCase())) : n).map(t_);
      }
    }), globalThis.$pinia = t, i.on.getInspectorState((a) => {
      if (a.app === e && a.inspectorId === Ze) {
        const n = a.nodeId === mn ? t : t._s.get(a.nodeId);
        if (!n)
          return;
        n && (a.nodeId !== mn && (globalThis.$store = /* @__PURE__ */ X(n)), a.state = i_(n));
      }
    }), i.on.editInspectorState((a) => {
      if (a.app === e && a.inspectorId === Ze) {
        const n = a.nodeId === mn ? t : t._s.get(a.nodeId);
        if (!n)
          return ze(`store "${a.nodeId}" not found`, "error");
        const { path: s } = a;
        Lo(n) ? s.unshift("state") : (s.length !== 1 || !n._customProperties.has(s[0]) || s[0] in n.$state) && s.unshift("$state"), $i = !1, a.set(n, s, a.state.value), $i = !0;
      }
    }), i.on.editComponentState((a) => {
      if (a.type.startsWith("🍍")) {
        const n = a.type.replace(/^🍍\s*/, ""), s = t._s.get(n);
        if (!s)
          return ze(`store "${n}" not found`, "error");
        const { path: o } = a;
        if (o[0] !== "state")
          return ze(`Invalid path for store "${n}":
${o}
Only state can be modified.`);
        o[0] = "$state", $i = !1, a.set(s, o, a.state.value), $i = !0;
      }
    });
  });
}
function r_(e, t) {
  bn.includes(Vn(t.$id)) || bn.push(Vn(t.$id)), hl({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: bn,
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
    t.$onAction(({ after: o, onError: r, name: c, args: d }) => {
      const l = Ul++;
      i.addTimelineEvent({
        layerId: li,
        event: {
          time: a(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: pt(t.$id),
            action: pt(c),
            args: d
          },
          groupId: l
        }
      }), o((u) => {
        Qt = void 0, i.addTimelineEvent({
          layerId: li,
          event: {
            time: a(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: pt(t.$id),
              action: pt(c),
              args: d,
              result: u
            },
            groupId: l
          }
        });
      }), r((u) => {
        Qt = void 0, i.addTimelineEvent({
          layerId: li,
          event: {
            time: a(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: pt(t.$id),
              action: pt(c),
              args: d,
              error: u
            },
            groupId: l
          }
        });
      });
    }, !0), t._customProperties.forEach((o) => {
      Li(() => V(t[o]), (r, c) => {
        i.notifyComponentUpdate(), i.sendInspectorState(Ze), $i && i.addTimelineEvent({
          layerId: li,
          event: {
            time: a(),
            title: "Change",
            subtitle: o,
            data: {
              newValue: r,
              oldValue: c
            },
            groupId: Qt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: o, type: r }, c) => {
      if (i.notifyComponentUpdate(), i.sendInspectorState(Ze), !$i)
        return;
      const d = {
        time: a(),
        title: n_(r),
        data: s_({ store: pt(t.$id) }, a_(o)),
        groupId: Qt
      };
      r === Vt.patchFunction ? d.subtitle = "⤵️" : r === Vt.patchObject ? d.subtitle = "🧩" : o && !Array.isArray(o) && (d.subtitle = o.type), o && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: o
        }
      }), i.addTimelineEvent({
        layerId: li,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const n = t._hotUpdate;
    t._hotUpdate = Ct((o) => {
      n(o), i.addTimelineEvent({
        layerId: li,
        event: {
          time: a(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: pt(t.$id),
            info: pt("HMR update")
          }
        }
      }), i.notifyComponentUpdate(), i.sendInspectorTree(Ze), i.sendInspectorState(Ze);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), i.notifyComponentUpdate(), i.sendInspectorTree(Ze), i.sendInspectorState(Ze), i.getSettings().logStoreChanges && ze(`Disposed "${t.$id}" store 🗑`);
    }, i.notifyComponentUpdate(), i.sendInspectorTree(Ze), i.sendInspectorState(Ze), i.getSettings().logStoreChanges && ze(`"${t.$id}" store installed 🆕`);
  });
}
let Ul = 0, Qt;
function Jc(e, t, i) {
  const a = t.reduce((n, s) => (n[s] = (/* @__PURE__ */ X(e))[s], n), {});
  for (const n in a)
    e[n] = function() {
      const s = Ul, o = i ? new Proxy(e, {
        get(...c) {
          return Qt = s, Reflect.get(...c);
        },
        set(...c) {
          return Qt = s, Reflect.set(...c);
        }
      }) : e;
      Qt = s;
      const r = a[n].apply(o, arguments);
      return Qt = void 0, r;
    };
}
function c_({ app: e, store: t, options: i }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!i.state, !t._p._testing) {
      Jc(t, Object.keys(i.actions), t._isOptionsAPI);
      const a = t._hotUpdate;
      (/* @__PURE__ */ X(t))._hotUpdate = function(n) {
        a.apply(this, arguments), Jc(t, Object.keys(n._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    r_(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function d_() {
  const e = Ud(!0), t = e.run(() => /* @__PURE__ */ Se({}));
  let i = [], a = [];
  const n = Ct({
    install(s) {
      Sa(n), n._a = s, s.provide(Dn, n), s.config.globalProperties.$pinia = n, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt && o_(s, n), a.forEach((o) => i.push(o)), a = [];
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
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt && typeof Proxy < "u" && n.use(c_), n;
}
function Ll(e, t) {
  for (const i in t) {
    const a = t[i];
    if (!(i in e))
      continue;
    const n = e[i];
    Ii(n) && Ii(a) && !/* @__PURE__ */ ge(a) && !/* @__PURE__ */ ht(a) ? e[i] = Ll(n, a) : e[i] = a;
  }
  return e;
}
const Ml = () => {
};
function Yc(e, t, i, a = Ml) {
  e.add(t);
  const n = () => {
    e.delete(t) && a();
  };
  return !i && Ld() && Wf(n), n;
}
function Ci(e, ...t) {
  e.forEach((i) => {
    i(...t);
  });
}
const u_ = (e) => e(), Xc = /* @__PURE__ */ Symbol(), Ts = /* @__PURE__ */ Symbol();
function io(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((i, a) => e.set(a, i)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const i in t) {
    if (!t.hasOwnProperty(i))
      continue;
    const a = t[i], n = e[i];
    Ii(n) && Ii(a) && e.hasOwnProperty(i) && !/* @__PURE__ */ ge(a) && !/* @__PURE__ */ ht(a) ? e[i] = io(n, a) : e[i] = a;
  }
  return e;
}
const l_ = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function f_(e) {
  return !Ii(e) || !Object.prototype.hasOwnProperty.call(e, l_);
}
const { assign: dt } = Object;
function Qc(e) {
  return !!(/* @__PURE__ */ ge(e) && e.effect);
}
function ed(e, t, i, a) {
  const { state: n, actions: s, getters: o } = t, r = i.state.value[e];
  let c;
  function d() {
    !r && (process.env.NODE_ENV === "production" || !a) && (i.state.value[e] = n ? n() : {});
    const l = process.env.NODE_ENV !== "production" && a ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      /* @__PURE__ */ sr((/* @__PURE__ */ Se(n ? n() : {})).value)
    ) : /* @__PURE__ */ sr(i.state.value[e]);
    return dt(l, s, Object.keys(o || {}).reduce((u, p) => (process.env.NODE_ENV !== "production" && p in l && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), u[p] = Ct(Xt(() => {
      Sa(i);
      const g = i._s.get(e);
      return o[p].call(g, g);
    })), u), {}));
  }
  return c = ao(e, d, t, i, a, !0), c;
}
function ao(e, t, i = {}, a, n, s) {
  let o;
  const r = dt({ actions: {} }, i);
  if (process.env.NODE_ENV !== "production" && !a._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (j) => {
    d ? g = j : d == !1 && !B._hotUpdating && (Array.isArray(g) ? g.push(j) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, l, u = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), g;
  const b = a.state.value[e];
  !s && !b && (process.env.NODE_ENV === "production" || !n) && (a.state.value[e] = {});
  const w = /* @__PURE__ */ Se({});
  let E;
  function A(j) {
    let $;
    d = l = !1, process.env.NODE_ENV !== "production" && (g = []), typeof j == "function" ? (j(a.state.value[e]), $ = {
      type: Vt.patchFunction,
      storeId: e,
      events: g
    }) : (io(a.state.value[e], j), $ = {
      type: Vt.patchObject,
      payload: j,
      storeId: e,
      events: g
    });
    const Q = E = /* @__PURE__ */ Symbol();
    kn().then(() => {
      E === Q && (d = !0);
    }), l = !0, Ci(u, $, a.state.value[e]);
  }
  const z = s ? function() {
    const { state: $ } = i, Q = $ ? $() : {};
    this.$patch((re) => {
      dt(re, Q);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Ml
  );
  function R() {
    o.stop(), u.clear(), p.clear(), a._s.delete(e);
  }
  const H = (j, $ = "") => {
    if (Xc in j)
      return j[Ts] = $, j;
    const Q = function() {
      Sa(a);
      const re = Array.from(arguments), Ce = /* @__PURE__ */ new Set(), je = /* @__PURE__ */ new Set();
      function pe(te) {
        Ce.add(te);
      }
      function P(te) {
        je.add(te);
      }
      Ci(p, {
        args: re,
        name: Q[Ts],
        store: B,
        after: pe,
        onError: P
      });
      let J;
      try {
        J = j.apply(this && this.$id === e ? this : B, re);
      } catch (te) {
        throw Ci(je, te), te;
      }
      return J instanceof Promise ? J.then((te) => (Ci(Ce, te), te)).catch((te) => (Ci(je, te), Promise.reject(te))) : (Ci(Ce, J), J);
    };
    return Q[Xc] = !0, Q[Ts] = $, Q;
  }, N = /* @__PURE__ */ Ct({
    actions: {},
    getters: {},
    state: [],
    hotState: w
  }), ee = {
    _p: a,
    // _s: scope,
    $id: e,
    $onAction: Yc.bind(null, p),
    $patch: A,
    $reset: z,
    $subscribe(j, $ = {}) {
      const Q = Yc(u, j, $.detached, () => re()), re = o.run(() => Li(() => a.state.value[e], (Ce) => {
        ($.flush === "sync" ? l : d) && j({
          storeId: e,
          type: Vt.direct,
          events: g
        }, Ce);
      }, dt({}, c, $)));
      return Q;
    },
    $dispose: R
  }, B = /* @__PURE__ */ Kn(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt ? dt(
    {
      _hmrPayload: N,
      _customProperties: Ct(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ee
    // must be added later
    // setupStore
  ) : ee);
  a._s.set(e, B);
  const q = (a._a && a._a.runWithContext || u_)(() => a._e.run(() => (o = Ud()).run(() => t({ action: H }))));
  for (const j in q) {
    const $ = q[j];
    if (/* @__PURE__ */ ge($) && !Qc($) || /* @__PURE__ */ ht($))
      process.env.NODE_ENV !== "production" && n ? w.value[j] = /* @__PURE__ */ gs(q, j) : s || (b && f_($) && (/* @__PURE__ */ ge($) ? $.value = b[j] : io($, b[j])), a.state.value[e][j] = $), process.env.NODE_ENV !== "production" && N.state.push(j);
    else if (typeof $ == "function") {
      const Q = process.env.NODE_ENV !== "production" && n ? $ : H($, j);
      q[j] = Q, process.env.NODE_ENV !== "production" && (N.actions[j] = $), r.actions[j] = $;
    } else process.env.NODE_ENV !== "production" && Qc($) && (N.getters[j] = s ? (
      // @ts-expect-error
      i.getters[j]
    ) : $, Mt && (q._getters || // @ts-expect-error: same
    (q._getters = Ct([]))).push(j));
  }
  if (dt(B, q), dt(/* @__PURE__ */ X(B), q), Object.defineProperty(B, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? w.value : a.state.value[e],
    set: (j) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      A(($) => {
        dt($, j);
      });
    }
  }), process.env.NODE_ENV !== "production" && (B._hotUpdate = Ct((j) => {
    B._hotUpdating = !0, j._hmrPayload.state.forEach(($) => {
      if ($ in B.$state) {
        const Q = j.$state[$], re = B.$state[$];
        typeof Q == "object" && Ii(Q) && Ii(re) ? Ll(Q, re) : j.$state[$] = re;
      }
      B[$] = /* @__PURE__ */ gs(j.$state, $);
    }), Object.keys(B.$state).forEach(($) => {
      $ in j.$state || delete B[$];
    }), d = !1, l = !1, a.state.value[e] = /* @__PURE__ */ gs(j._hmrPayload, "hotState"), l = !0, kn().then(() => {
      d = !0;
    });
    for (const $ in j._hmrPayload.actions) {
      const Q = j[$];
      B[$] = //
      H(Q, $);
    }
    for (const $ in j._hmrPayload.getters) {
      const Q = j._hmrPayload.getters[$], re = s ? (
        // special handling of options api
        Xt(() => (Sa(a), Q.call(B, B)))
      ) : Q;
      B[$] = //
      re;
    }
    Object.keys(B._hmrPayload.getters).forEach(($) => {
      $ in j._hmrPayload.getters || delete B[$];
    }), Object.keys(B._hmrPayload.actions).forEach(($) => {
      $ in j._hmrPayload.actions || delete B[$];
    }), B._hmrPayload = j._hmrPayload, B._getters = j._getters, B._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt) {
    const j = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach(($) => {
      Object.defineProperty(B, $, dt({ value: B[$] }, j));
    });
  }
  return a._p.forEach((j) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt) {
      const $ = o.run(() => j({
        store: B,
        app: a._a,
        pinia: a,
        options: r
      }));
      Object.keys($ || {}).forEach((Q) => B._customProperties.add(Q)), dt(B, $);
    } else
      dt(B, o.run(() => j({
        store: B,
        app: a._a,
        pinia: a,
        options: r
      })));
  }), process.env.NODE_ENV !== "production" && B.$state && typeof B.$state == "object" && typeof B.$state.constructor == "function" && !B.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${B.$id}".`), b && s && i.hydrate && i.hydrate(B.$state, b), d = !0, l = !0, B;
}
// @__NO_SIDE_EFFECTS__
function p_(e, t, i) {
  let a;
  const n = typeof t == "function";
  a = n ? i : t;
  function s(o, r) {
    const c = js();
    if (o = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && mi && mi._testing ? null : o) || (c ? vi(Dn, null) : null), o && Sa(o), process.env.NODE_ENV !== "production" && !mi)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    o = mi, o._s.has(e) || (n ? ao(e, t, a, o) : ed(e, a, o), process.env.NODE_ENV !== "production" && (s._pinia = o));
    const d = o._s.get(e);
    if (process.env.NODE_ENV !== "production" && r) {
      const l = "__hot:" + e, u = n ? ao(l, t, a, o, !0) : ed(l, dt({}, a), o, !0);
      r._hotUpdate(u), delete o.state.value[l], o._s.delete(l);
    }
    if (process.env.NODE_ENV !== "production" && Mt) {
      const l = Xn();
      if (l && l.proxy && // avoid adding stores that are just built for hot module replacement
      !r) {
        const u = l.proxy, p = "_pStores" in u ? u._pStores : u._pStores = {};
        p[e] = d;
      }
    }
    return d;
  }
  return s.$id = e, s;
}
const g_ = {
  class: "portrait-stage",
  "aria-label": "角色立绘"
}, m_ = /* @__PURE__ */ yu({
  __name: "PortraitStage",
  props: {
    portraits: {},
    service: {}
  },
  setup(e) {
    const t = e, i = /* @__PURE__ */ new Map();
    function a(s, o) {
      o instanceof HTMLCanvasElement ? i.set(s, o) : i.delete(s);
    }
    async function n() {
      t.service.stopAll(), await kn(), await Promise.all(t.portraits.map(async (s) => {
        const o = i.get(s.characterId);
        o && await t.service.play(s.portraitAssetId, o);
      }));
    }
    return Li(() => t.portraits, () => {
      n();
    }, { deep: !0, immediate: !0 }), Io(() => t.service.stopAll()), (s, o) => (he(), ve("div", g_, [
      (he(!0), ve(Qe, null, on(e.portraits, (r) => (he(), ve("canvas", {
        key: `${r.characterId}:${r.portraitAssetId}`,
        ref_for: !0,
        ref: (c) => a(r.characterId, c),
        class: Bn(["portrait-stage__canvas", [`portrait-stage__canvas--${r.position}`, { "is-active": r.active }]]),
        width: "512",
        height: "768",
        style: Mn({ transform: `translateX(-50%) scale(${r.scale})` })
      }, null, 6))), 128))
    ]));
  }
}), b_ = "2.0.0-preview", h_ = ".";
function __(e, t) {
  if (t)
    return e.assets.find((i) => i.id === t);
}
function Mo(e, t, i = h_) {
  const a = __(e, t);
  if (!a) return;
  const n = [e.basePath, ...a.path.split("/")].map((s) => encodeURIComponent(s)).join("/");
  return `${i.replace(/\/$/u, "")}/${n}`;
}
const v_ = 2, y_ = "albina-galgame-card", k_ = "assets", w_ = /* @__PURE__ */ JSON.parse('[{"id":"bg.backstreets_rain","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"bg.city_rooftop","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"bg.golden_bough","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"bg.lce_lab","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"bg.limbus_bus","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"bg.mirror_corridor","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"bg.nest_station","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"bg.outskirts_dawn","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"bg.rain_room","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"bg.ring_atelier","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"bg.spider_gallery","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"bg.white_canvas","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"cg.araya_rooftop","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"cg.art_resonance","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"cg.backstreet_pursuit","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"cg.combat_transition_01","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"cg.conspiracy_contract","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"cg.fascia_heartbeat","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"cg.golden_bough_ending","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"cg.golden_bough_rebuild","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"cg.hollow_torso_reveal","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"cg.lce_raid","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"cg.limbus_bus_night","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"cg.maestro_shadow","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"cg.mirror_broken","kind":"image","path":"cg/mirror_broken.png","mimeType":"image/png"},{"id":"cg.opening_rain","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"cg.rain_confession","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"cg.rain_reflection","kind":"image","path":"cg/rain_reflection.png","mimeType":"image/png"},{"id":"cg.rebuild_awakening","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"cg.ren_interruption","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"cg.ring_conspiracy_ending","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"cg.ring_invitation","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"cg.surgery_of_memory","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"cg.trust_threshold","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"cg.white_canvas_choice","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"cg.white_canvas_ending","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.audio.bgm.backstreets.rain.mp3","kind":"audio","path":"audio/bgm/backstreets_rain.mp3","mimeType":"audio/mpeg","sha256":"97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414","bytes":4192274},{"id":"file.audio.bgm.between.two.worlds.mp3","kind":"audio","path":"audio/bgm/between_two_worlds.mp3","mimeType":"audio/mpeg","sha256":"25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184","bytes":2979130},{"id":"file.audio.bgm.boss.kromer.mp3","kind":"audio","path":"audio/bgm/boss_kromer.mp3","mimeType":"audio/mpeg","sha256":"923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd","bytes":3679463},{"id":"file.audio.bgm.main.menu.mp3","kind":"audio","path":"audio/bgm/main_menu.mp3","mimeType":"audio/mpeg","sha256":"299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60","bytes":7685141},{"id":"file.audio.bgm.title.theme.mp3","kind":"audio","path":"audio/bgm/title_theme.mp3","mimeType":"audio/mpeg","sha256":"03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3","bytes":2540613},{"id":"file.audio.se.blood.splat.wav","kind":"audio","path":"audio/se/blood_splat.wav","mimeType":"audio/wav","sha256":"87c30bfd8c336786de618759015f3ee24eee2638d406d7541c7c3fc17201bc17","bytes":17684},{"id":"file.audio.se.glass.shatter.wav","kind":"audio","path":"audio/se/glass_shatter.wav","mimeType":"audio/wav","sha256":"7f066a84a711bcdcf48abc70b07e92ee21957e25cd06765d3637226c55bddda2","bytes":15920},{"id":"file.audio.se.slash.heavy.wav","kind":"audio","path":"audio/se/slash_heavy.wav","mimeType":"audio/wav","sha256":"c93d1adea430352fd38fd9ef315c54801f9fde63350a2fa62584ad20441c7f57","bytes":15920},{"id":"file.audio.se.typing.blip.wav","kind":"audio","path":"audio/se/typing_blip.wav","mimeType":"audio/wav","sha256":"0002e7621f5dd6510cc047dbcfaee2cc7ab958dc20b1d149809958a6f14b1668","bytes":4012},{"id":"file.audio.se.ui.back.wav","kind":"audio","path":"audio/se/ui_back.wav","mimeType":"audio/wav","sha256":"c80e3b1f405a1a2c3d35c5f7b0d94839aba09bce28136b76b94b17a72eaf7f65","bytes":10628},{"id":"file.audio.se.ui.click.wav","kind":"audio","path":"audio/se/ui_click.wav","mimeType":"audio/wav","sha256":"fb67965be3a2b903b7f06c19646df9943f5607bea683798718fe2e77a188e270","bytes":2248},{"id":"file.audio.se.ui.confirm.wav","kind":"audio","path":"audio/se/ui_confirm.wav","mimeType":"audio/wav","sha256":"7fc178ebe16e5de7b62514cca74b1fdcf800dc85156c2d450079279a2446904b","bytes":17684},{"id":"file.audio.voice.result.conspiracy.005.let.her.answer.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","bytes":218292},{"id":"file.audio.voice.result.conspiracy.005.refuse.duo.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","bytes":225780},{"id":"file.audio.voice.result.conspiracy.006.block.view.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","bytes":290292},{"id":"file.audio.voice.result.conspiracy.006.stand.with.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","bytes":300660},{"id":"file.audio.voice.result.conspiracy.007.break.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","bytes":233844},{"id":"file.audio.voice.result.conspiracy.007.seize.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","bytes":271284},{"id":"file.audio.voice.result.conspiracy.008.hand.pen.to.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","bytes":242484},{"id":"file.audio.voice.result.conspiracy.008.refuse.testimony.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","bytes":229812},{"id":"file.audio.voice.result.conspiracy.009.choose.present.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","bytes":287988},{"id":"file.audio.voice.result.conspiracy.009.refuse.choice.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","bytes":306420},{"id":"file.audio.voice.result.conspiracy.010.keep.badge.unworn.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","bytes":263796},{"id":"file.audio.voice.result.conspiracy.010.throw.badge.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","bytes":260916},{"id":"file.audio.voice.result.conspiracy.011.burn.film.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","bytes":243636},{"id":"file.audio.voice.result.conspiracy.011.rewrite.ending.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","bytes":238452},{"id":"file.audio.voice.result.conspiracy.012.end.tonight.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","bytes":277620},{"id":"file.audio.voice.result.conspiracy.012.keep.blade.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","bytes":273588},{"id":"file.audio.voice.result.conspiracy.013.hold.one.second.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","bytes":254004},{"id":"file.audio.voice.result.conspiracy.013.return.gently.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","bytes":269556},{"id":"file.audio.voice.result.conspiracy.014.erase.from.catalog.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","bytes":283956},{"id":"file.audio.voice.result.conspiracy.014.keep.one.line.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","bytes":289716},{"id":"file.audio.voice.result.conspiracy.accept.mp3","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","bytes":242484},{"id":"file.audio.voice.result.conspiracy.break.pursuit.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","bytes":237876},{"id":"file.audio.voice.result.conspiracy.escape.to.backstreets.mp3","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","bytes":263796},{"id":"file.audio.voice.result.conspiracy.feed.false.signature.mp3","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","bytes":240756},{"id":"file.audio.voice.result.conspiracy.pressure.mp3","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","bytes":210804},{"id":"file.audio.voice.result.enter.conspiracy.mp3","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"f8964fe276712a75e96af70eceb75f46845ab038422a529a4ca67d6ccc168e56","bytes":204468},{"id":"file.audio.voice.result.enter.rebuild.mp3","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"fa7f6c482fb449c3f7c61f2d556182e30a49d449d14fb8329213f97ba8dae9db","bytes":202740},{"id":"file.audio.voice.result.enter.white.canvas.mp3","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"5f238c579d61475995d082999f73a16d0c182f8db58a16ab8cd9d2a802277d97","bytes":164724},{"id":"file.audio.voice.result.golden.bough.rebuild.bad.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","bytes":115764},{"id":"file.audio.voice.result.golden.bough.rebuild.normal.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","bytes":112884},{"id":"file.audio.voice.result.golden.bough.rebuild.true.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","bytes":105972},{"id":"file.audio.voice.result.golden.bough.route.complete.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","bytes":331188},{"id":"file.audio.voice.result.golden.bough.route.final.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","bytes":143988},{"id":"file.audio.voice.result.rebuild.006.keep.silent.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","bytes":269556},{"id":"file.audio.voice.result.rebuild.006.read.aloud.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","bytes":270708},{"id":"file.audio.voice.result.rebuild.007.match.her.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","bytes":295476},{"id":"file.audio.voice.result.rebuild.007.stay.own.rhythm.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","bytes":305268},{"id":"file.audio.voice.result.rebuild.008.protect.current.self.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","bytes":274164},{"id":"file.audio.voice.result.rebuild.008.trade.old.memory.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","bytes":271860},{"id":"file.audio.voice.result.rebuild.009.hand.question.back.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","bytes":270132},{"id":"file.audio.voice.result.rebuild.009.refuse.perfect.copy.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","bytes":267252},{"id":"file.audio.voice.result.rebuild.010.ask.her.choice.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","bytes":226932},{"id":"file.audio.voice.result.rebuild.010.veto.sealing.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","bytes":232692},{"id":"file.audio.voice.result.rebuild.011.ask.next.revision.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","bytes":292020},{"id":"file.audio.voice.result.rebuild.011.sit.beside.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","bytes":290868},{"id":"file.audio.voice.result.rebuild.012.break.contract.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","bytes":251700},{"id":"file.audio.voice.result.rebuild.012.negotiate.terms.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","bytes":268980},{"id":"file.audio.voice.result.rebuild.013.offer.witness.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","bytes":254004},{"id":"file.audio.voice.result.rebuild.013.promise.name.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","bytes":255156},{"id":"file.audio.voice.result.rebuild.014.ask.when.to.light.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","bytes":286260},{"id":"file.audio.voice.result.rebuild.014.keep.unlit.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","bytes":292596},{"id":"file.audio.voice.result.rebuild.accept.missing.pieces.mp3","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","bytes":243636},{"id":"file.audio.voice.result.rebuild.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","bytes":162420},{"id":"file.audio.voice.result.rebuild.cut.false.completion.mp3","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","bytes":250548},{"id":"file.audio.voice.result.rebuild.guard.fascia.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","bytes":265524},{"id":"file.audio.voice.result.rebuild.push.into.raid.mp3","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","bytes":274164},{"id":"file.audio.voice.result.rebuild.question.fascia.mp3","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","bytes":156660},{"id":"file.audio.voice.result.rebuild.use.rooftop.signal.mp3","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","bytes":237300},{"id":"file.audio.voice.result.return.opening.from.rebuild.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"93831e44f51a1755332b620bab795b5a6501bd2310dfe860e65d1de97f796dde","bytes":191220},{"id":"file.audio.voice.result.return.opening.from.ring.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"07b6250f478559c01e05511edda03d37c45df65b9e1848f22cebc16447bdc421","bytes":195252},{"id":"file.audio.voice.result.return.opening.from.white.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"f909503358a31908b759dbb172165b49e77d3800c6b5e9beb5355bbecd675c37","bytes":202164},{"id":"file.audio.voice.result.ring.conspiracy.bad.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","bytes":104820},{"id":"file.audio.voice.result.ring.conspiracy.normal.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","bytes":127284},{"id":"file.audio.voice.result.ring.conspiracy.route.complete.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","bytes":283956},{"id":"file.audio.voice.result.ring.conspiracy.route.final.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","bytes":156660},{"id":"file.audio.voice.result.ring.conspiracy.true.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","bytes":112884},{"id":"file.audio.voice.result.white.006.name.silence.mp3","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","bytes":282804},{"id":"file.audio.voice.result.white.006.refuse.naming.mp3","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","bytes":286836},{"id":"file.audio.voice.result.white.007.ask.fascia.term.mp3","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","bytes":289716},{"id":"file.audio.voice.result.white.007.keep.mirror.open.mp3","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","bytes":270132},{"id":"file.audio.voice.result.white.008.hold.fascia.mp3","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","bytes":226356},{"id":"file.audio.voice.result.white.008.stay.witness.only.mp3","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","bytes":240756},{"id":"file.audio.voice.result.white.009.keep.half.step.mp3","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","bytes":252852},{"id":"file.audio.voice.result.white.009.share.umbrella.edge.mp3","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","bytes":218868},{"id":"file.audio.voice.result.white.010.acknowledge.leave.mp3","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","bytes":242484},{"id":"file.audio.voice.result.white.010.offer.return.ticket.mp3","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","bytes":245364},{"id":"file.audio.voice.result.white.011.curtain.call.mp3","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","bytes":259764},{"id":"file.audio.voice.result.white.011.walk.beside.mp3","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","bytes":265524},{"id":"file.audio.voice.result.white.012.let.her.decide.mp3","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","bytes":244788},{"id":"file.audio.voice.result.white.012.refuse.exhibit.mp3","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","bytes":233268},{"id":"file.audio.voice.result.white.013.point.to.mirror.mp3","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","bytes":281652},{"id":"file.audio.voice.result.white.013.refuse.to.choose.mp3","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","bytes":283956},{"id":"file.audio.voice.result.white.014.keep.base.color.mp3","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","bytes":273588},{"id":"file.audio.voice.result.white.014.offer.restart.mp3","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","bytes":296052},{"id":"file.audio.voice.result.white.canvas.bad.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","bytes":111732},{"id":"file.audio.voice.result.white.canvas.normal.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","bytes":104820},{"id":"file.audio.voice.result.white.canvas.route.complete.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","bytes":291444},{"id":"file.audio.voice.result.white.canvas.route.final.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","bytes":156660},{"id":"file.audio.voice.result.white.canvas.true.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","bytes":104244},{"id":"file.audio.voice.result.white.follow.to.lab.mp3","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","bytes":271284},{"id":"file.audio.voice.result.white.interrupt.lab.terms.mp3","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","bytes":247668},{"id":"file.audio.voice.result.white.keep.empty.seat.mp3","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","bytes":267828},{"id":"file.audio.voice.result.white.share.rain.window.mp3","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","bytes":256884},{"id":"file.audio.voice.result.white.sign.witness.protocol.mp3","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","bytes":233268},{"id":"file.audio.voice.result.white.tease.back.mp3","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","bytes":210804},{"id":"file.audio.voice.result.white.touch.boundary.mp3","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","bytes":218868},{"id":"file.audio.voice.scene.golden.bough.001.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","bytes":139380},{"id":"file.audio.voice.scene.golden.bough.002.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","bytes":107124},{"id":"file.audio.voice.scene.golden.bough.003.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","bytes":198132},{"id":"file.audio.voice.scene.golden.bough.004.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","bytes":197556},{"id":"file.audio.voice.scene.golden.bough.005.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","bytes":173364},{"id":"file.audio.voice.scene.golden.bough.006.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","bytes":212532},{"id":"file.audio.voice.scene.golden.bough.007.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","bytes":221748},{"id":"file.audio.voice.scene.golden.bough.008.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","bytes":210228},{"id":"file.audio.voice.scene.golden.bough.009.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","bytes":214836},{"id":"file.audio.voice.scene.golden.bough.010.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","bytes":206772},{"id":"file.audio.voice.scene.golden.bough.011.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","bytes":170484},{"id":"file.audio.voice.scene.golden.bough.012.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","bytes":207924},{"id":"file.audio.voice.scene.golden.bough.013.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","bytes":208500},{"id":"file.audio.voice.scene.golden.bough.014.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","bytes":174516},{"id":"file.audio.voice.scene.golden.bough.015.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","bytes":202740},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","bytes":204468},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","bytes":142260},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","bytes":195252},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.true.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","bytes":222900},{"id":"file.audio.voice.scene.opening.001.mp3","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"497c1b3cba838f47ce02c67ddb31ebdcc49e5cb8eaa5bbfa2027f6fef3a165a8","bytes":166452},{"id":"file.audio.voice.scene.ring.conspiracy.001.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","bytes":127284},{"id":"file.audio.voice.scene.ring.conspiracy.002.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","bytes":160692},{"id":"file.audio.voice.scene.ring.conspiracy.003.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","bytes":167604},{"id":"file.audio.voice.scene.ring.conspiracy.004.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","bytes":197556},{"id":"file.audio.voice.scene.ring.conspiracy.005.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","bytes":189492},{"id":"file.audio.voice.scene.ring.conspiracy.006.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","bytes":175092},{"id":"file.audio.voice.scene.ring.conspiracy.007.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","bytes":183156},{"id":"file.audio.voice.scene.ring.conspiracy.008.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","bytes":208500},{"id":"file.audio.voice.scene.ring.conspiracy.009.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","bytes":162996},{"id":"file.audio.voice.scene.ring.conspiracy.010.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","bytes":195828},{"id":"file.audio.voice.scene.ring.conspiracy.011.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","bytes":197556},{"id":"file.audio.voice.scene.ring.conspiracy.012.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","bytes":186036},{"id":"file.audio.voice.scene.ring.conspiracy.013.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","bytes":209076},{"id":"file.audio.voice.scene.ring.conspiracy.014.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","bytes":171636},{"id":"file.audio.voice.scene.ring.conspiracy.015.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","bytes":248244},{"id":"file.audio.voice.scene.ring.conspiracy.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","bytes":215412},{"id":"file.audio.voice.scene.ring.conspiracy.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","bytes":147444},{"id":"file.audio.voice.scene.ring.conspiracy.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","bytes":184884},{"id":"file.audio.voice.scene.ring.conspiracy.ending.true.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","bytes":235572},{"id":"file.audio.voice.scene.white.canvas.001.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"f9a92c1bc7670ad7639266c595dc0fa60b8d8304a848d946aad06f72ec7f07d7","bytes":110580},{"id":"file.audio.voice.scene.white.canvas.002.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","bytes":142260},{"id":"file.audio.voice.scene.white.canvas.003.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","bytes":160692},{"id":"file.audio.voice.scene.white.canvas.004.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","bytes":186036},{"id":"file.audio.voice.scene.white.canvas.005.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","bytes":181428},{"id":"file.audio.voice.scene.white.canvas.006.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","bytes":196980},{"id":"file.audio.voice.scene.white.canvas.007.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","bytes":199860},{"id":"file.audio.voice.scene.white.canvas.008.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","bytes":218868},{"id":"file.audio.voice.scene.white.canvas.009.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","bytes":175668},{"id":"file.audio.voice.scene.white.canvas.010.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","bytes":148596},{"id":"file.audio.voice.scene.white.canvas.011.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","bytes":196404},{"id":"file.audio.voice.scene.white.canvas.012.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","bytes":171636},{"id":"file.audio.voice.scene.white.canvas.013.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","bytes":193524},{"id":"file.audio.voice.scene.white.canvas.014.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","bytes":188340},{"id":"file.audio.voice.scene.white.canvas.015.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","bytes":207924},{"id":"file.audio.voice.scene.white.canvas.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","bytes":199860},{"id":"file.audio.voice.scene.white.canvas.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","bytes":142260},{"id":"file.audio.voice.scene.white.canvas.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","bytes":177396},{"id":"file.audio.voice.scene.white.canvas.ending.true.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","bytes":196980},{"id":"file.avatar.albina.avatar.png","kind":"image","path":"avatar/albina-avatar.png","mimeType":"image/png","sha256":"159e7304b4bb6e364754aa2ee960851b804d9f359f07b48ac5fc9812e988e58f","bytes":408911},{"id":"file.bg.backstreets.rain.jpg","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"file.bg.backstreets.rain.svg","kind":"image","path":"bg/backstreets_rain.svg","mimeType":"image/svg+xml","sha256":"2ca9364ada8709526e9d64a945422fb06f36da448e183295ab466a22d1cc995a","bytes":12706},{"id":"file.bg.city.rooftop.jpg","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"file.bg.city.rooftop.svg","kind":"image","path":"bg/city_rooftop.svg","mimeType":"image/svg+xml","sha256":"5eae2ee6b750ba1d93ef35eb4b7c67808e1895875d51a9e0075695a35e95a31e","bytes":12706},{"id":"file.bg.golden.bough.jpg","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"file.bg.golden.bough.svg","kind":"image","path":"bg/golden_bough.svg","mimeType":"image/svg+xml","sha256":"94f087ceec5a2a42d7cd56c60d3c880e72798facff376fe1ace1627420b5e54b","bytes":12720},{"id":"file.bg.lce.lab.jpg","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"file.bg.lce.lab.svg","kind":"image","path":"bg/lce_lab.svg","mimeType":"image/svg+xml","sha256":"0cf1998d6f245face41e86d83bfab30dc5b4d1fc8a63ae1d4da7d74b16814569","bytes":12708},{"id":"file.bg.limbus.bus.jpg","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"file.bg.limbus.bus.svg","kind":"image","path":"bg/limbus_bus.svg","mimeType":"image/svg+xml","sha256":"ac55a1801f59f4f6158a979f56e61edf5dea42c4ad59a9c00ca77f240fef9345","bytes":12716},{"id":"file.bg.mirror.corridor.jpg","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"file.bg.mirror.corridor.svg","kind":"image","path":"bg/mirror_corridor.svg","mimeType":"image/svg+xml","sha256":"f682139293def0b42bce1f99df089252290d1b056a66876eb5ecf868fb43bfad","bytes":12716},{"id":"file.bg.nest.station.jpg","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"file.bg.nest.station.svg","kind":"image","path":"bg/nest_station.svg","mimeType":"image/svg+xml","sha256":"f29c2177b49dd12d1a7b98c3f1b4fd0d04c425f2668532da61c51a2ae45720bf","bytes":12697},{"id":"file.bg.outskirts.dawn.jpg","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"file.bg.outskirts.dawn.svg","kind":"image","path":"bg/outskirts_dawn.svg","mimeType":"image/svg+xml","sha256":"5f64fe26325f8d446f5ed235a1bf4e293a1fbc2fe5802b43c73cfcd57939dac7","bytes":12725},{"id":"file.bg.rain.room.jpg","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"file.bg.rain.room.svg","kind":"image","path":"bg/rain_room.svg","mimeType":"image/svg+xml","sha256":"3329c56d45d54fbd27ebc7918a2287bbdb922b437815430a51d1b4c0f65a7f42","bytes":12705},{"id":"file.bg.ring.atelier.jpg","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"file.bg.ring.atelier.svg","kind":"image","path":"bg/ring_atelier.svg","mimeType":"image/svg+xml","sha256":"2352c7ca280b2b41a785eb0e28391cb5d69ab18b7087b985a653d28309cabdb9","bytes":12700},{"id":"file.bg.spider.gallery.jpg","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"file.bg.spider.gallery.svg","kind":"image","path":"bg/spider_gallery.svg","mimeType":"image/svg+xml","sha256":"8a0cf1a4a74e8031b34ff92efc6cd4285206a1ebf30b94f4b37d3ece83952adf","bytes":12710},{"id":"file.bg.white.canvas.jpg","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"file.bg.white.canvas.svg","kind":"image","path":"bg/white_canvas.svg","mimeType":"image/svg+xml","sha256":"cf0d8b2dfc155f8189eb37648a9ab478914bdb1055cae1aaf15ccb9bfdc812ff","bytes":12718},{"id":"file.cg.albina.key.visual.jpg","kind":"image","path":"cg/albina_key_visual.jpg","mimeType":"image/jpeg","sha256":"3cc08f61408a8e1b964dc5ca9b4d2b19d6cd30a8536d154d4fc35bed22fdcfca","bytes":779782},{"id":"file.cg.araya.rooftop.jpg","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"file.cg.araya.rooftop.svg","kind":"image","path":"cg/araya_rooftop.svg","mimeType":"image/svg+xml","sha256":"43e4ba9ab056357d81d759009ccc8a52cd4435dceda13a2201581cf845f1ed3b","bytes":4598},{"id":"file.cg.art.resonance.jpg","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"file.cg.art.resonance.svg","kind":"image","path":"cg/art_resonance.svg","mimeType":"image/svg+xml","sha256":"b5a5ce4b049a732f48fa745803585ab1fead1c96dcd2cc94c583a4bb79f051fc","bytes":4593},{"id":"file.cg.backstreet.pursuit.jpg","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"file.cg.backstreet.pursuit.svg","kind":"image","path":"cg/backstreet_pursuit.svg","mimeType":"image/svg+xml","sha256":"e07b123e0dd8010b0ccb5fb36d97a85f89373e6403b62e2f1750b2ca6a07fbae","bytes":4592},{"id":"file.cg.combat.transition.01.jpg","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"file.cg.combat.transition.02.jpg","kind":"image","path":"cg/combat_transition_02.jpg","mimeType":"image/jpeg","sha256":"15da031ead573ecff24ecb8c7f5ac0d64b966f8e4c40c4290a18a6dd658fcbf8","bytes":231222},{"id":"file.cg.combat.transition.03.jpg","kind":"image","path":"cg/combat_transition_03.jpg","mimeType":"image/jpeg","sha256":"4c9ba8fa3d28ba90724bcb8b73a43d8978e445db277b66e35a4547e0b80ae476","bytes":220810},{"id":"file.cg.combat.transition.04.jpg","kind":"image","path":"cg/combat_transition_04.jpg","mimeType":"image/jpeg","sha256":"ef89995f67a6c3ca3f101d05019aaf4f79824462c0d76ccb2da30a1beae8e9f8","bytes":187028},{"id":"file.cg.combat.transition.05.jpg","kind":"image","path":"cg/combat_transition_05.jpg","mimeType":"image/jpeg","sha256":"e51393ad94223802f49b78be139d181d1dc89d8bf98fdf76beb195a91eb9098e","bytes":254728},{"id":"file.cg.combat.transition.06.jpg","kind":"image","path":"cg/combat_transition_06.jpg","mimeType":"image/jpeg","sha256":"7038c8301aa5b607bd7050e7c5347a0d659c8599187161d42d942ed7c3a21c44","bytes":208052},{"id":"file.cg.conspiracy.contract.jpg","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"file.cg.conspiracy.contract.svg","kind":"image","path":"cg/conspiracy_contract.svg","mimeType":"image/svg+xml","sha256":"65b88a00b4226ce0ddcb924ca7c118e5408911a933c635df30fd603363888327","bytes":4605},{"id":"file.cg.danger.threshold.jpg","kind":"image","path":"cg/danger_threshold.jpg","mimeType":"image/jpeg","sha256":"f5b5356ad2ff469f4dc77d49b54511b9cde21dfc99c52b91f54610e4545ea140","bytes":242967},{"id":"file.cg.danger.threshold.svg","kind":"image","path":"cg/danger_threshold.svg","mimeType":"image/svg+xml","sha256":"132fddc83900e0a6095e42cc22b0a6c62be3e6fa5b30248ed78bc59aa27bb19c","bytes":4596},{"id":"file.cg.fascia.heartbeat.jpg","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"file.cg.fascia.heartbeat.svg","kind":"image","path":"cg/fascia_heartbeat.svg","mimeType":"image/svg+xml","sha256":"f3e00df4100539e897eeb62c251c9276722b6b4fb1c989ab7bd7889e407728c9","bytes":4594},{"id":"file.cg.first.gallery.jpg","kind":"image","path":"cg/first_gallery.jpg","mimeType":"image/jpeg","sha256":"da6961a762bd452191d1f4c0fd78b3ad0aa008a550fc873bbbd82761c498ead4","bytes":237789},{"id":"file.cg.first.gallery.svg","kind":"image","path":"cg/first_gallery.svg","mimeType":"image/svg+xml","sha256":"60840a171afe923653c08bb9e7d7d744ed27d09cc4ec8cb7d575ef3fe6322425","bytes":4594},{"id":"file.cg.golden.bough.ending.jpg","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"file.cg.golden.bough.ending.svg","kind":"image","path":"cg/golden_bough_ending.svg","mimeType":"image/svg+xml","sha256":"9a28d702a7845c7f109b75e62f074614b12eb15c2a0ef939d2a372dd448e7eea","bytes":4597},{"id":"file.cg.golden.bough.rebuild.jpg","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"file.cg.golden.bough.rebuild.svg","kind":"image","path":"cg/golden_bough_rebuild.svg","mimeType":"image/svg+xml","sha256":"1ee378cb16da5bc913f6269f0a47bb5fe4087f9f75e0b324108c7f3e056887ab","bytes":4600},{"id":"file.cg.hollow.torso.reveal.jpg","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"file.cg.hollow.torso.reveal.svg","kind":"image","path":"cg/hollow_torso_reveal.svg","mimeType":"image/svg+xml","sha256":"7b6159f5848060278c6b5d61f998ef7b946ceb70a321bcca08bc8c1d3aec0c9a","bytes":4599},{"id":"file.cg.lce.raid.jpg","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"file.cg.lce.raid.svg","kind":"image","path":"cg/lce_raid.svg","mimeType":"image/svg+xml","sha256":"dcc9fa8598f9d638f78fc4dc44fe83b281817f2f685dd30c953d8ba57260f0c6","bytes":4591},{"id":"file.cg.limbus.bus.night.jpg","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"file.cg.limbus.bus.night.svg","kind":"image","path":"cg/limbus_bus_night.svg","mimeType":"image/svg+xml","sha256":"8fed7ceb727391ca5dd5876a7a04bc0d08d347152719b4429c41ada34a64d257","bytes":4599},{"id":"file.cg.maestro.shadow.jpg","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"file.cg.maestro.shadow.svg","kind":"image","path":"cg/maestro_shadow.svg","mimeType":"image/svg+xml","sha256":"d136ee2ad277d4c29e285f42e2d97ccc04ddc30606b0798a5b6eebabb680708c","bytes":4597},{"id":"file.cg.opening.rain.jpg","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"file.cg.opening.rain.svg","kind":"image","path":"cg/opening_rain.svg","mimeType":"image/svg+xml","sha256":"660b6694c5a692daf70deb6ed839e04091d824c5b223b531cb176fd3b9d81bb3","bytes":4596},{"id":"file.cg.rain.confession.jpg","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"file.cg.rain.confession.svg","kind":"image","path":"cg/rain_confession.svg","mimeType":"image/svg+xml","sha256":"fdf4e4c642b2b1e50a5de5bf198a32c19749a4863cf5463f00107e0eede39b9c","bytes":4598},{"id":"file.cg.rebuild.awakening.jpg","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"file.cg.rebuild.awakening.svg","kind":"image","path":"cg/rebuild_awakening.svg","mimeType":"image/svg+xml","sha256":"258465af59037896eee5a5a760e921ed5eb846c72e18cb52c1e393d5b4389db5","bytes":4596},{"id":"file.cg.ren.interruption.jpg","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"file.cg.ren.interruption.svg","kind":"image","path":"cg/ren_interruption.svg","mimeType":"image/svg+xml","sha256":"719824c4c8223e4ea153e211007caa31f07a959c07e97bb9c72890e06d3da814","bytes":4597},{"id":"file.cg.ring.conspiracy.ending.jpg","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"file.cg.ring.conspiracy.ending.svg","kind":"image","path":"cg/ring_conspiracy_ending.svg","mimeType":"image/svg+xml","sha256":"bc17d94853829bb360d530c7074f7cebc92b05a08997eaf28f0ae51532c3780e","bytes":4600},{"id":"file.cg.ring.invitation.jpg","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"file.cg.ring.invitation.svg","kind":"image","path":"cg/ring_invitation.svg","mimeType":"image/svg+xml","sha256":"4015dd820a43df8884c0e2e8a4b1a220524836933570e7cacf22c5cb02f20b22","bytes":4601},{"id":"file.cg.sinclair.flash.jpg","kind":"image","path":"cg/sinclair_flash.jpg","mimeType":"image/jpeg","sha256":"d434d887564b5ada77b2deb3ddf2b81c9d32427f55ba281ce96447dcc4f62d1e","bytes":221337},{"id":"file.cg.sinclair.flash.svg","kind":"image","path":"cg/sinclair_flash.svg","mimeType":"image/svg+xml","sha256":"a06692b7c81aa54996b2ccf9e08fe9dd98deb7094f2e82fe5495e45192d5040f","bytes":4589},{"id":"file.cg.surgery.of.memory.jpg","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"file.cg.surgery.of.memory.svg","kind":"image","path":"cg/surgery_of_memory.svg","mimeType":"image/svg+xml","sha256":"7b640a9324dbed3cfab52d953a3c231c620d3b205939b8726b6bf178515bfae2","bytes":4598},{"id":"file.cg.trust.threshold.jpg","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"file.cg.trust.threshold.svg","kind":"image","path":"cg/trust_threshold.svg","mimeType":"image/svg+xml","sha256":"4ed32ef158df4c7ebbf7d2afede80277866b6d964ecbc8395f21c3a9e21ef3ec","bytes":4600},{"id":"file.cg.white.canvas.choice.jpg","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"file.cg.white.canvas.choice.svg","kind":"image","path":"cg/white_canvas_choice.svg","mimeType":"image/svg+xml","sha256":"9cffaefd8f010f1c0af094ede03e209dc496af0ed874cd98e5211edd41bb1c2d","bytes":4599},{"id":"file.cg.white.canvas.ending.jpg","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.cg.white.canvas.ending.svg","kind":"image","path":"cg/white_canvas_ending.svg","mimeType":"image/svg+xml","sha256":"c4bc0030a9ed0538c6f8feec6c0585c9bc4723dca8f9d12bb4a6867f5966de60","bytes":4602},{"id":"file.characters.albina.amused.png","kind":"image","path":"characters/albina/amused.png","mimeType":"image/png","sha256":"a0156c8d34a69b500b2882307bbe55ed77db8d049a07039f75195e864eb8c2e1","bytes":648683},{"id":"file.characters.albina.amused.svg","kind":"image","path":"characters/albina/amused.svg","mimeType":"image/svg+xml","sha256":"d944a9f1d9c6655865944af0d0ba2ae94ea761f61aae7ee0f53061e6eadaa4e1","bytes":3248},{"id":"file.characters.albina.armored.png","kind":"image","path":"characters/albina/armored.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.armored.svg","kind":"image","path":"characters/albina/armored.svg","mimeType":"image/svg+xml","sha256":"eb6d0341f181d58c37b0fe88aae31e993b4c88aa77906bf3645f879eab0b5de4","bytes":3249},{"id":"file.characters.albina.combat.png","kind":"image","path":"characters/albina/combat.png","mimeType":"image/png","sha256":"d253d25b615b31dbdc14b9b85a6873732fbe7f5595624a6a1f67db8e1c373833","bytes":794440},{"id":"file.characters.albina.combat.svg","kind":"image","path":"characters/albina/combat.svg","mimeType":"image/svg+xml","sha256":"e1adc354d6e1fc2a7fa2a6ae2aac4cc53c273b9bb2c6266aefd5e2f1b77c47ea","bytes":3248},{"id":"file.characters.albina.endgame.png","kind":"image","path":"characters/albina/endgame.png","mimeType":"image/png","sha256":"10ba1187d40b50910ff2183f83812dff890885b47d27d64d96fcd719b603e92a","bytes":886696},{"id":"file.characters.albina.endgame.svg","kind":"image","path":"characters/albina/endgame.svg","mimeType":"image/svg+xml","sha256":"ff345247b32c32910e63e133e2f9bdb9ab693a070633196799d00c4c49932ea2","bytes":3249},{"id":"file.characters.albina.fascia.open.png","kind":"image","path":"characters/albina/fascia-open.png","mimeType":"image/png","sha256":"794865a3149891f0562df93cf61e3671f6793283949a6cdeec60f299cf0a8c4a","bytes":226988},{"id":"file.characters.albina.fascia.open.svg","kind":"image","path":"characters/albina/fascia-open.svg","mimeType":"image/svg+xml","sha256":"68051cff6817febc6c852e576dfe2be9ef119989ddbcfa3cb9b7d81826e0d30d","bytes":3253},{"id":"file.characters.albina.focused.png","kind":"image","path":"characters/albina/focused.png","mimeType":"image/png","sha256":"1049d898e1ee6dc266385bf528c6d321fbe6ad298c5d6b9e58ac9d46fdb32c3a","bytes":752133},{"id":"file.characters.albina.focused.svg","kind":"image","path":"characters/albina/focused.svg","mimeType":"image/svg+xml","sha256":"e0f0aec562ce528c0f05d4f171cf3b139e6d06a1730fe3388896d4d5c7807c25","bytes":3249},{"id":"file.characters.albina.furious.png","kind":"image","path":"characters/albina/furious.png","mimeType":"image/png","sha256":"7df3a04ea9c87534d5d0746e98ae84adb1921d268e58f1c388c1f090b7ecfda1","bytes":157756},{"id":"file.characters.albina.furious.svg","kind":"image","path":"characters/albina/furious.svg","mimeType":"image/svg+xml","sha256":"ffbc84b7a8f991385884e1b52bc73774e908aad1482f276feb863815f169cb9e","bytes":3249},{"id":"file.characters.albina.golden.bough.png","kind":"image","path":"characters/albina/golden-bough.png","mimeType":"image/png","sha256":"7b96b2ec44022a3b8a86b2480e25bd01eb5ac32218e63382373e97c273baf831","bytes":731292},{"id":"file.characters.albina.golden.bough.svg","kind":"image","path":"characters/albina/golden-bough.svg","mimeType":"image/svg+xml","sha256":"270131e1276bf547097e47be0e18589bfa0345e8a257543bb38888052b4bd8e8","bytes":3254},{"id":"file.characters.albina.maestro.png","kind":"image","path":"characters/albina/maestro.png","mimeType":"image/png","sha256":"b148b529b7fab01184fcfa54c8b80fa9a48fcc7723fc3498bd58e504015ea0ea","bytes":434686},{"id":"file.characters.albina.maestro.svg","kind":"image","path":"characters/albina/maestro.svg","mimeType":"image/svg+xml","sha256":"63b1b5064275f5d5d4c6aeafbcafa1dfd721732e1d20b0d4460ff9a447867cb1","bytes":3249},{"id":"file.characters.albina.normal.png","kind":"image","path":"characters/albina/normal.png","mimeType":"image/png","sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","bytes":647858},{"id":"file.characters.albina.normal.svg","kind":"image","path":"characters/albina/normal.svg","mimeType":"image/svg+xml","sha256":"906300d14804a6265b2f0189460958a3681e546d430b789952bb80e228f95fc6","bytes":3248},{"id":"file.characters.albina.rain.png","kind":"image","path":"characters/albina/rain.png","mimeType":"image/png","sha256":"a2b3fd27325ace3c20e92c441900e338b027f7cdcdb603c12dc92924e0175f06","bytes":649497},{"id":"file.characters.albina.rain.svg","kind":"image","path":"characters/albina/rain.svg","mimeType":"image/svg+xml","sha256":"2cea8476fd8a8d8b00756b2cbf391147f40e2267a9dd1ae6b9cfa80bc3050e34","bytes":3246},{"id":"file.characters.albina.ring.conspiracy.png","kind":"image","path":"characters/albina/ring-conspiracy.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.ring.conspiracy.svg","kind":"image","path":"characters/albina/ring-conspiracy.svg","mimeType":"image/svg+xml","sha256":"cc72d233e523b3b73dceac5c9630139967f4429eb56876dcdea50f260403d9c7","bytes":3257},{"id":"file.characters.albina.shy.png","kind":"image","path":"characters/albina/shy.png","mimeType":"image/png","sha256":"928100cc984332c9b4f769cc38dba965425a91cc1aece23e9d384fc993509247","bytes":649383},{"id":"file.characters.albina.shy.svg","kind":"image","path":"characters/albina/shy.svg","mimeType":"image/svg+xml","sha256":"7daf3a0563615f07a420b5e80dc56475ea591f47b542ba654d9a72ee21bd86cf","bytes":3245},{"id":"file.characters.albina.smile.png","kind":"image","path":"characters/albina/smile.png","mimeType":"image/png","sha256":"c35bc3e8aae3870801f75205d5b1cff67d5fe5c48876824ed14a0820414e7659","bytes":648264},{"id":"file.characters.albina.smile.svg","kind":"image","path":"characters/albina/smile.svg","mimeType":"image/svg+xml","sha256":"bbcc931251f2505b5126c3ab176fcc7f857ae4c48aab5d2750d61c06d81db20b","bytes":3247},{"id":"file.characters.albina.surgical.png","kind":"image","path":"characters/albina/surgical.png","mimeType":"image/png","sha256":"b01318b4e4677e4d6e4de6aad53149717364d36a0d66b56425100e31a6547897","bytes":360435},{"id":"file.characters.albina.surgical.svg","kind":"image","path":"characters/albina/surgical.svg","mimeType":"image/svg+xml","sha256":"1d25fd6fbbceb25c593a225db28a567cafd34710d010b5d900c78e3bbde244e0","bytes":3250},{"id":"file.characters.albina.unarmored.png","kind":"image","path":"characters/albina/unarmored.png","mimeType":"image/png","sha256":"b0a7cb32e6c114ec975d0e4dbf2ab8a756de2b86688e9bbff390e32c0dba8a34","bytes":225675},{"id":"file.characters.albina.unarmored.svg","kind":"image","path":"characters/albina/unarmored.svg","mimeType":"image/svg+xml","sha256":"57bb64084a2c1785e74f4e4df9767a903a5063f91b56f239de72ef4d0865eada","bytes":3251},{"id":"file.characters.albina.white.canvas.png","kind":"image","path":"characters/albina/white-canvas.png","mimeType":"image/png","sha256":"cbf1f679143b6ed9ceee9a12ce5bab2ce571e09cbade31b9ae673d0e6479f3aa","bytes":360278},{"id":"file.characters.albina.white.canvas.svg","kind":"image","path":"characters/albina/white-canvas.svg","mimeType":"image/svg+xml","sha256":"2ace4fd2654d28e4a37b9ca5327632b9ec1c3e2e2c45538323c89a34a5f31d48","bytes":3254},{"id":"file.characters.albina.wounded.png","kind":"image","path":"characters/albina/wounded.png","mimeType":"image/png","sha256":"6d3e49d8dc54796ab3c2fc5f114b98881f0c8ca2d12a1a81ef8f6dbcea97fe01","bytes":360844},{"id":"file.characters.albina.wounded.svg","kind":"image","path":"characters/albina/wounded.svg","mimeType":"image/svg+xml","sha256":"33af83cc546db12d0b154a16db04df73773fa8a9ff8cf8b899b798098604ef95","bytes":3249},{"id":"file.characters.araya.normal.svg","kind":"image","path":"characters/araya/normal.svg","mimeType":"image/svg+xml","sha256":"8581b9680f7eaa0ee12cdb681e03792e154b25323bc7c466541fa69914a9e668","bytes":2913},{"id":"file.characters.callisto.normal.png","kind":"image","path":"characters/callisto/normal.png","mimeType":"image/png","sha256":"7c9c806f2a9517c65648b085ec22d1b93d47effdab3d8be91d2f368c7e6039fd","bytes":377258},{"id":"file.characters.callisto.normal.svg","kind":"image","path":"characters/callisto/normal.svg","mimeType":"image/svg+xml","sha256":"9d2814ddff972ccfd9089c1c4c997b553375fa52496111719d879e176c00f8aa","bytes":2916},{"id":"file.characters.charon.normal.png","kind":"image","path":"characters/charon/normal.png","mimeType":"image/png","sha256":"7c66384703968377258e10af0e17f5cb7ebd238d13b205b832e9c389244ac819","bytes":415773},{"id":"file.characters.dante.normal.png","kind":"image","path":"characters/dante/normal.png","mimeType":"image/png","sha256":"1db98bd0ed89ce5d66c175a525907c6bee207fbe61a4bb118e41a141a2613603","bytes":788630},{"id":"file.characters.dante.normal.svg","kind":"image","path":"characters/dante/normal.svg","mimeType":"image/svg+xml","sha256":"9359c9496cea38dc4a0e9bf5ac2ad0491e3641ded1db4d15280fbe1d7a7c73e7","bytes":2913},{"id":"file.characters.faust.normal.png","kind":"image","path":"characters/faust/normal.png","mimeType":"image/png","sha256":"9e5839384ac0d57d445d14301a38abdc357a28f33d8c345255c49b2f4fb9f5c7","bytes":919963},{"id":"file.characters.fixer.informant.normal.png","kind":"image","path":"characters/fixer_informant/normal.png","mimeType":"image/png","sha256":"c276eb35ccbd7ef8dc813d5db74b9e146131f909a55c1fff3f04cf8af95db82c","bytes":485462},{"id":"file.characters.golden.apparition.normal.png","kind":"image","path":"characters/golden_apparition/normal.png","mimeType":"image/png","sha256":"fc90202b6b36e901fe0e75e9e2bcb9e07dc13ef32dc97083a01a4703c6ba9faf","bytes":633415},{"id":"file.characters.kira.normal.svg","kind":"image","path":"characters/kira/normal.svg","mimeType":"image/svg+xml","sha256":"db4e29ed314e57c624f53c7c2917166ccdc80efcbcab02b211013e7f1aaf90f8","bytes":2912},{"id":"file.characters.lcd.captain.normal.png","kind":"image","path":"characters/lcd_captain/normal.png","mimeType":"image/png","sha256":"30b6ff5afb4d0d754a52546bbc4ae467d517cbb09baf5f4633b0f2cbe5e5a959","bytes":410856},{"id":"file.characters.lce.doctor.normal.png","kind":"image","path":"characters/lce_doctor/normal.png","mimeType":"image/png","sha256":"938fdd640295fdd9c5d98e225696137f48667b140f2649961d6a504976b011f9","bytes":597985},{"id":"file.characters.lucio.normal.svg","kind":"image","path":"characters/lucio/normal.svg","mimeType":"image/svg+xml","sha256":"39f61ef72e599cef8d5e70dbcab010eba95bcc126ea60828b32cfb2dca4ee0ce","bytes":2913},{"id":"file.characters.protagonist.battle.png","kind":"image","path":"characters/protagonist/battle.png","mimeType":"image/png","sha256":"a436e968a646e580f9e6fca88ca9e82615f1a8a05cf68e1c494afe05a594d09f","bytes":656294},{"id":"file.characters.protagonist.battle.svg","kind":"image","path":"characters/protagonist/battle.svg","mimeType":"image/svg+xml","sha256":"2714036a2a99cb87401a0eddf7793708b8b6666149ed2a5b68d43c7e48feec5c","bytes":2916},{"id":"file.characters.protagonist.coat.png","kind":"image","path":"characters/protagonist/coat.png","mimeType":"image/png","sha256":"d0cdfe6a196d9454452818d2383f9b33ce8ef106ae509e532694ef3914f97e2c","bytes":701207},{"id":"file.characters.protagonist.coat.svg","kind":"image","path":"characters/protagonist/coat.svg","mimeType":"image/svg+xml","sha256":"325c15acfe95486379b88ef972deacbda05c36bf81776d5446ca8fb5d74ba07a","bytes":2914},{"id":"file.characters.protagonist.formal.png","kind":"image","path":"characters/protagonist/formal.png","mimeType":"image/png","sha256":"efebe731bf08143f2c8eec7f5ebe82b85c1fb803abe2a51f607ebe7d5da3ab69","bytes":682957},{"id":"file.characters.protagonist.formal.svg","kind":"image","path":"characters/protagonist/formal.svg","mimeType":"image/svg+xml","sha256":"ca1d3e79cebcbda034005fa85a351828355f58e68f40e41d14fe111d6ac19dd2","bytes":2916},{"id":"file.characters.protagonist.injured.png","kind":"image","path":"characters/protagonist/injured.png","mimeType":"image/png","sha256":"a1c76d3d01d85a5fb59d130d0cb6978492a39381d92ccbd050e3fa79b147877f","bytes":633632},{"id":"file.characters.protagonist.injured.svg","kind":"image","path":"characters/protagonist/injured.svg","mimeType":"image/svg+xml","sha256":"0eae48dde7a3858af53f50333970724334f258cf95b2520f3aa4b65066d1d82a","bytes":2917},{"id":"file.characters.protagonist.normal.png","kind":"image","path":"characters/protagonist/normal.png","mimeType":"image/png","sha256":"ef345aaf8817f9d42edee91b15c7593454a8aeacba015d956eb570567d93c42c","bytes":617841},{"id":"file.characters.protagonist.normal.svg","kind":"image","path":"characters/protagonist/normal.svg","mimeType":"image/svg+xml","sha256":"d3e9d5f6683d341ac85b449edc86e31ea8e4b65e809894e1f626917b866ad4f1","bytes":2916},{"id":"file.characters.protagonist.profile.png","kind":"image","path":"characters/protagonist/profile.png","mimeType":"image/png","sha256":"7bebf79d688e6c6beddff75ce5ebb0be542f1b24faf0af2dec4c889fc2f4ea6e","bytes":608664},{"id":"file.characters.protagonist.profile.svg","kind":"image","path":"characters/protagonist/profile.svg","mimeType":"image/svg+xml","sha256":"5de466e68995311d479e51333fc7cbe91a20adf52e9ca096f1e9bb2d9a2bcffc","bytes":2917},{"id":"file.characters.protagonist.resolve.png","kind":"image","path":"characters/protagonist/resolve.png","mimeType":"image/png","sha256":"f084da28bd5b55273519eab6c230bc580e069f7f302cff85d333f43f833684f3","bytes":765412},{"id":"file.characters.protagonist.resolve.svg","kind":"image","path":"characters/protagonist/resolve.svg","mimeType":"image/svg+xml","sha256":"bbd02ce4a997e9ee5beab2ded88f9dffc8306fe51041d006a7306da98affcbf1","bytes":2917},{"id":"file.characters.protagonist.serious.png","kind":"image","path":"characters/protagonist/serious.png","mimeType":"image/png","sha256":"d9fff4f95ed8513b464cd32be5735ec1a3d2b10e581c24a8232ab9a78f81a538","bytes":612296},{"id":"file.characters.protagonist.serious.svg","kind":"image","path":"characters/protagonist/serious.svg","mimeType":"image/svg+xml","sha256":"f1ef84f3803614dccaa639097dca33e17dd3a36dcb59e0d9dd658166ec5d4564","bytes":2917},{"id":"file.characters.protagonist.shadow.png","kind":"image","path":"characters/protagonist/shadow.png","mimeType":"image/png","sha256":"47579ad18953940ceaf00122676a79d3f8618a0057cc1f1f740535df4644a04e","bytes":679619},{"id":"file.characters.protagonist.shadow.svg","kind":"image","path":"characters/protagonist/shadow.svg","mimeType":"image/svg+xml","sha256":"ac87cb2d8726e88b77ae25299ac8759bf167df93e44cd429ef93916d04381e90","bytes":2916},{"id":"file.characters.protagonist.smile.png","kind":"image","path":"characters/protagonist/smile.png","mimeType":"image/png","sha256":"c040495b425c09c2044e86ee2951527dce6145ffb7d41e2c28ae390d39feef24","bytes":681742},{"id":"file.characters.protagonist.smile.svg","kind":"image","path":"characters/protagonist/smile.svg","mimeType":"image/svg+xml","sha256":"8b0900e469b604123c1aa72b0be47464908f5418013720cf5da8801ad7048b69","bytes":2915},{"id":"file.characters.protagonist.tender.png","kind":"image","path":"characters/protagonist/tender.png","mimeType":"image/png","sha256":"1e99e5724db77e7fc536d433980519121cc43740bfc17b4f810444a2681fb214","bytes":693086},{"id":"file.characters.protagonist.tender.svg","kind":"image","path":"characters/protagonist/tender.svg","mimeType":"image/svg+xml","sha256":"23737b94add6d8044d0df61bcbba15f70f3a9d996792e161a6488816c44750d7","bytes":2916},{"id":"file.characters.protagonist.wet.hair.png","kind":"image","path":"characters/protagonist/wet-hair.png","mimeType":"image/png","sha256":"ef02c60087130fba338bd9757c5ea9f045435e60d658450890c6ab5d50699dd5","bytes":702889},{"id":"file.characters.protagonist.wet.hair.svg","kind":"image","path":"characters/protagonist/wet-hair.svg","mimeType":"image/svg+xml","sha256":"b11284a46a2b5211ef413377f08ec31b80edfb80b854046f68066a0dfd369c23","bytes":2918},{"id":"file.characters.ren.normal.png","kind":"image","path":"characters/ren/normal.png","mimeType":"image/png","sha256":"0bd7caac7ae057da27bf86378d17b24ee43a48b958713ece4f8fbf6a79cba6b6","bytes":793467},{"id":"file.characters.ren.normal.svg","kind":"image","path":"characters/ren/normal.svg","mimeType":"image/svg+xml","sha256":"5b6eeb0a73be55028f1c6f349160e9d541cee9e93425d9c150a3bd2f7b791698","bytes":2911},{"id":"file.characters.ring.agent.normal.png","kind":"image","path":"characters/ring_agent/normal.png","mimeType":"image/png","sha256":"71536876e4949ff36037d647f05727bf39bb6bf843b186757aacfcc95bcfe07e","bytes":581593},{"id":"file.characters.ryoshu.normal.svg","kind":"image","path":"characters/ryoshu/normal.svg","mimeType":"image/svg+xml","sha256":"2018187b67ef8f2dfe4d3a97929c2dacc8bc8755efe2e77916cc697e9346fc93","bytes":2914},{"id":"file.characters.sinclair.normal.svg","kind":"image","path":"characters/sinclair/normal.svg","mimeType":"image/svg+xml","sha256":"b507dc70e66ddfee18a0c0fdcfe2722215c23cbbbac048bb4b774718169f5352","bytes":2916},{"id":"file.characters.sora.normal.svg","kind":"image","path":"characters/sora/normal.svg","mimeType":"image/svg+xml","sha256":"939a4d464cd7bee2a0764528981df14b9c9e948ac2673ce659d0c326f04236ad","bytes":2912},{"id":"file.characters.vergilius.normal.png","kind":"image","path":"characters/vergilius/normal.png","mimeType":"image/png","sha256":"a952f7b8042794613c6fdfe7c6e58d7675d06c9c5653ac837247c94b3ab01135","bytes":886285},{"id":"file.characters.vergilius.normal.svg","kind":"image","path":"characters/vergilius/normal.svg","mimeType":"image/svg+xml","sha256":"0c0714c38d9c295f3e8c84aecbb91c757869471fd288093b543ad4ee85da213c","bytes":2917},{"id":"file.characters.yi.sang.normal.png","kind":"image","path":"characters/yi_sang/normal.png","mimeType":"image/png","sha256":"9d18999b8e7b82e957fddd582b9605a5d46deca6bddcb45eb4930d9daaa2393d","bytes":814771},{"id":"file.generated.alpha.sheets.albina.01.png","kind":"image","path":"generated/alpha-sheets/albina_01.png","mimeType":"image/png","sha256":"2290adb83dd7e3bfb2d8cfc1cca5d0603a5d439d93a7bb2c954a190dd5e50b44","bytes":1467607},{"id":"file.generated.alpha.sheets.albina.02.png","kind":"image","path":"generated/alpha-sheets/albina_02.png","mimeType":"image/png","sha256":"687cb237c5231f3d9168196b89e0648d45ab3e57452c029ce091cd13b4ad9ff0","bytes":1494916},{"id":"file.generated.alpha.sheets.albina.03.png","kind":"image","path":"generated/alpha-sheets/albina_03.png","mimeType":"image/png","sha256":"b4959f69bb6d4ce6f45b22075c884f1a954c1b4df1754cf7e3e00b1e00924d4c","bytes":1397534},{"id":"file.generated.alpha.sheets.protagonist.01.png","kind":"image","path":"generated/alpha-sheets/protagonist_01.png","mimeType":"image/png","sha256":"439b657c685a9b21dc5eb98277f76040bda7be8b76049f79dab6852d3e6eb26e","bytes":1037169},{"id":"file.generated.alpha.sheets.protagonist.02.png","kind":"image","path":"generated/alpha-sheets/protagonist_02.png","mimeType":"image/png","sha256":"b5d417f293782cf228f2bf19b324977deda5547109401c5171ea908bfc2e9d62","bytes":1093806},{"id":"file.generated.alpha.sheets.supporting.png","kind":"image","path":"generated/alpha-sheets/supporting.png","mimeType":"image/png","sha256":"39a3570a99611e67490bc4161c97711bf0270c725aba640fffcf8df059176079","bytes":1301881},{"id":"file.original.albina.sprites.battle.png","kind":"image","path":"original_albina_sprites/battle.png","mimeType":"image/png","sha256":"b2bcaad7d5ddd3779102080b0d2081dec9941512a1afb677f5eb2392764c9bee","bytes":1793581},{"id":"file.original.albina.sprites.normal.png","kind":"image","path":"original_albina_sprites/normal.png","mimeType":"image/png","sha256":"6ee2ad5749e0a459680f14ae97e18e774e9c4b9d1aca5a353a49f2d0239270e3","bytes":2017896},{"id":"file.original.albina.sprites.sad.png","kind":"image","path":"original_albina_sprites/sad.png","mimeType":"image/png","sha256":"13edd79c92ba4230f00e8a008a565fbce60b06687bb3ed8101d2c4e63cb23240","bytes":1795574},{"id":"file.original.albina.sprites.smile.png","kind":"image","path":"original_albina_sprites/smile.png","mimeType":"image/png","sha256":"825bc4d615e5906d190b698a47e2fafad8ab51396696af5b965c66e3e098e0d2","bytes":2236822},{"id":"file.original.bg.story.library.interior.png","kind":"image","path":"original_bg_story/library_interior.png","mimeType":"image/png","sha256":"7ccd48b32fc88df3ec38ba66bf70fa490cd3c4931261a3ff13a51198c584e275","bytes":2217028},{"id":"file.original.cg.albina.debut.png","kind":"image","path":"original_cg/albina_debut.png","mimeType":"image/png","sha256":"cd69fc4291142ffac6e2609441ac32155c806431f7e5ef7c9602dafa5bd26d2b","bytes":1913934},{"id":"file.original.cg.battle.climax.png","kind":"image","path":"original_cg/battle_climax.png","mimeType":"image/png","sha256":"8f5cd613a620380fb091b2fc3cdfc645fd4e3e81864cbdf08b4e4a70a042ece6","bytes":2049868},{"id":"file.original.cg.canto.ix.opening.png","kind":"image","path":"original_cg/canto_ix_opening.png","mimeType":"image/png","sha256":"e28454287967229bfaed69c43e626330e14694d6383cfc643c6554beb7053ae2","bytes":2376570},{"id":"file.original.cg.hell.gate.png","kind":"image","path":"original_cg/hell_gate.png","mimeType":"image/png","sha256":"e2d9846c0e9a031328e92bd4532544b5f272c889fc7a7ce71675bfebb06edb3e","bytes":2306012},{"id":"file.original.cg.rain.confession.png","kind":"image","path":"original_cg/rain_confession.png","mimeType":"image/png","sha256":"b5615295563c2e30c4aea259e4a2b5bbf2a617355934902f810daf16a39d869b","bytes":2041140},{"id":"file.original.cg.ring.conspiracy.png","kind":"image","path":"original_cg/ring_conspiracy.png","mimeType":"image/png","sha256":"0df61afec53eafdf9b0abafacbedee5805f55a9664702b958abd2477be90e0ea","bytes":2074900},{"id":"file.sprite.atlas.albina.amused.strip.png","kind":"image","path":"sprite-atlas/albina/amused_strip.png","mimeType":"image/png","sha256":"598feb3ab51f6f0e7826c337e66b3f3cad71897061152e22a9096a6d00373d13","bytes":3783351},{"id":"file.sprite.atlas.albina.armored.strip.png","kind":"image","path":"sprite-atlas/albina/armored_strip.png","mimeType":"image/png","sha256":"e7556db93ffd2c4774a08cb55fd8cd37ade36f5d0a2c67122abb28958f065c0e","bytes":3502098},{"id":"file.sprite.atlas.albina.combat.strip.png","kind":"image","path":"sprite-atlas/albina/combat_strip.png","mimeType":"image/png","sha256":"34b4a9cb3ff6f77eaa187f1d884961f23d8f9e228da56165a160d9d45ac669b8","bytes":3685070},{"id":"file.sprite.atlas.albina.endgame.strip.png","kind":"image","path":"sprite-atlas/albina/endgame_strip.png","mimeType":"image/png","sha256":"9183824dde93f21acbcffd5d42ccaf5a34341612926a3d866038a7fcdcd2aa95","bytes":4114092},{"id":"file.sprite.atlas.albina.fascia.open.strip.png","kind":"image","path":"sprite-atlas/albina/fascia-open_strip.png","mimeType":"image/png","sha256":"83202a591278a6beabe854df464af772e58c2fa6d1a4d1072dba62082bcf5525","bytes":3359680},{"id":"file.sprite.atlas.albina.focused.strip.png","kind":"image","path":"sprite-atlas/albina/focused_strip.png","mimeType":"image/png","sha256":"ccf851bf3e230333846ceb4fd3cbee2e0554ebb729550026acf3ab4b08249b60","bytes":4001551},{"id":"file.sprite.atlas.albina.furious.strip.png","kind":"image","path":"sprite-atlas/albina/furious_strip.png","mimeType":"image/png","sha256":"92e05e4c2b6c45072203edce970ad083d1f98877a5aecd8eb3f4bc3871f2ddbe","bytes":3225121},{"id":"file.sprite.atlas.albina.golden.bough.strip.png","kind":"image","path":"sprite-atlas/albina/golden-bough_strip.png","mimeType":"image/png","sha256":"37acb5099f4b78fa4b43cdbf7374de92898c5fa8277a25b73187e510cb672b3f","bytes":3829701},{"id":"file.sprite.atlas.albina.maestro.strip.png","kind":"image","path":"sprite-atlas/albina/maestro_strip.png","mimeType":"image/png","sha256":"448278bd52df48c90421900511a5d3a4362c0af5890284422a665431632f0e2a","bytes":3245882},{"id":"file.sprite.atlas.albina.normal.strip.png","kind":"image","path":"sprite-atlas/albina/normal_strip.png","mimeType":"image/png","sha256":"9dd6396a5a4bb5ed031e5e6af329a7e23d43f52468b9a743fa3ccb87b96dc68f","bytes":3297901},{"id":"file.sprite.atlas.albina.rain.strip.png","kind":"image","path":"sprite-atlas/albina/rain_strip.png","mimeType":"image/png","sha256":"1dfd20241c048a6bdbf257d726242b74e3faa291aee37f19d956a3a4427b5b75","bytes":3777733},{"id":"file.sprite.atlas.albina.ring.conspiracy.strip.png","kind":"image","path":"sprite-atlas/albina/ring-conspiracy_strip.png","mimeType":"image/png","sha256":"791a8e97afe98ef66e8ff98ec4030e20e6e218178ca24525ef7c16a91e11286f","bytes":3542405},{"id":"file.sprite.atlas.albina.shy.strip.png","kind":"image","path":"sprite-atlas/albina/shy_strip.png","mimeType":"image/png","sha256":"b4fce99a14a9e49de682712c71a3420cbe98bed8cb671b08f3b39e0a6eed7efa","bytes":3529806},{"id":"file.sprite.atlas.albina.smile.strip.png","kind":"image","path":"sprite-atlas/albina/smile_strip.png","mimeType":"image/png","sha256":"edeea2c2e1176f1c84a82ed101601fcdf30b8531732a217867711c9f0beaf537","bytes":3520893},{"id":"file.sprite.atlas.albina.surgical.strip.png","kind":"image","path":"sprite-atlas/albina/surgical_strip.png","mimeType":"image/png","sha256":"fe3f8cae7d405baf2d4cdcddc7f2d1dd18826c5a0f10f835749722b41d3545df","bytes":3268222},{"id":"file.sprite.atlas.albina.unarmored.strip.png","kind":"image","path":"sprite-atlas/albina/unarmored_strip.png","mimeType":"image/png","sha256":"86d9ba8388fa7e6523b37911e3514e5746ddf19e3d61d463488df27d69032e16","bytes":3599579},{"id":"file.sprite.atlas.albina.white.canvas.strip.png","kind":"image","path":"sprite-atlas/albina/white-canvas_strip.png","mimeType":"image/png","sha256":"2ecd8aaa89e60e6a4c23463298cb0a17d39911d900064a62b933920a3ef23c16","bytes":3419321},{"id":"file.sprite.atlas.albina.wounded.strip.png","kind":"image","path":"sprite-atlas/albina/wounded_strip.png","mimeType":"image/png","sha256":"62e276c181e626f0dec0f0df427840bcd73d467948850a556e113c8718c95dae","bytes":3510714},{"id":"file.sprite.atlas.callisto.normal.strip.png","kind":"image","path":"sprite-atlas/callisto/normal_strip.png","mimeType":"image/png","sha256":"d45214594fe8048be693b4f4ef3b6dd2ff485996d260e89b82c468ef85bb66fa","bytes":3570340},{"id":"file.sprite.atlas.charon.normal.strip.png","kind":"image","path":"sprite-atlas/charon/normal_strip.png","mimeType":"image/png","sha256":"bc8875c1e57ba504ecd61f6b0952f11440829c13607290c397cc94bf0a90efc9","bytes":3129094},{"id":"file.sprite.atlas.dante.normal.strip.png","kind":"image","path":"sprite-atlas/dante/normal_strip.png","mimeType":"image/png","sha256":"1a588b00eec5b542f30e91c9b1f1be1bac50f8f79fd2ebc7ff2a9fa20e558bac","bytes":3287194},{"id":"file.sprite.atlas.faust.normal.strip.png","kind":"image","path":"sprite-atlas/faust/normal_strip.png","mimeType":"image/png","sha256":"712b5327d431689157584249798faf2cbd1dbfc42a245b0b1390207ce28a0a77","bytes":3718801},{"id":"file.sprite.atlas.fixer.informant.normal.strip.png","kind":"image","path":"sprite-atlas/fixer_informant/normal_strip.png","mimeType":"image/png","sha256":"eb32b3dffd3d4cc2bbec142662e0965ec5bde6334476b66f72be4fde65b42cc9","bytes":3222195},{"id":"file.sprite.atlas.golden.apparition.normal.strip.png","kind":"image","path":"sprite-atlas/golden_apparition/normal_strip.png","mimeType":"image/png","sha256":"fbcafb3363f6ab9d06f3f95c1337a3675737d2e0123295f87a5c8705154dee33","bytes":3927065},{"id":"file.sprite.atlas.lcd.captain.normal.strip.png","kind":"image","path":"sprite-atlas/lcd_captain/normal_strip.png","mimeType":"image/png","sha256":"38e07bfb12f420430f7240d715c7f61de84ea815576701719c8f2facd3b02166","bytes":3264020},{"id":"file.sprite.atlas.lce.doctor.normal.strip.png","kind":"image","path":"sprite-atlas/lce_doctor/normal_strip.png","mimeType":"image/png","sha256":"f05fbdcbead14511b2e34cc712715b5582504bf2af17e2e86dbbdb8d146868d1","bytes":3297944},{"id":"file.sprite.atlas.original.cg.albina.debut.strip.png","kind":"image","path":"sprite-atlas/original_cg/albina_debut_strip.png","mimeType":"image/png","sha256":"2ee88c382d413f62803f01a1a80a5743b9bf21061426cc3a16ea77a717506669","bytes":2925431},{"id":"file.sprite.atlas.original.cg.battle.climax.strip.png","kind":"image","path":"sprite-atlas/original_cg/battle_climax_strip.png","mimeType":"image/png","sha256":"db536e31152fa857e4958cc748e645eefbee8f45576ba1183a5f8ffcb43b1264","bytes":2864495},{"id":"file.sprite.atlas.protagonist.battle.strip.png","kind":"image","path":"sprite-atlas/protagonist/battle_strip.png","mimeType":"image/png","sha256":"d3286aaeff322a1267719016000ed283ea1b42badf2878f962ae136b6f8b7fb8","bytes":3165211},{"id":"file.sprite.atlas.protagonist.coat.strip.png","kind":"image","path":"sprite-atlas/protagonist/coat_strip.png","mimeType":"image/png","sha256":"b5806c2fd33ddd2335b8ecf79fe638e1c595c680cb6ad7373b82c0196f2aedbb","bytes":3023731},{"id":"file.sprite.atlas.protagonist.formal.strip.png","kind":"image","path":"sprite-atlas/protagonist/formal_strip.png","mimeType":"image/png","sha256":"89c9540a0dfe2d93dbc9e6d2cadb8bb93411e30957199488307ec9a1128677aa","bytes":2945421},{"id":"file.sprite.atlas.protagonist.injured.strip.png","kind":"image","path":"sprite-atlas/protagonist/injured_strip.png","mimeType":"image/png","sha256":"d5bcb863366b807ef4011c7f781c50c89e41aa47065464c1bcea7361c023ded3","bytes":3274205},{"id":"file.sprite.atlas.protagonist.normal.strip.png","kind":"image","path":"sprite-atlas/protagonist/normal_strip.png","mimeType":"image/png","sha256":"55484d8acc4f36587a84e4448aa8040923c8126107f5a9f8db335d1eeffe3b7f","bytes":3086501},{"id":"file.sprite.atlas.protagonist.profile.strip.png","kind":"image","path":"sprite-atlas/protagonist/profile_strip.png","mimeType":"image/png","sha256":"0620c7a13ae03657aaad952fd67d34376b52807ca50a2445fa7faecd2c34c813","bytes":3391031},{"id":"file.sprite.atlas.protagonist.resolve.strip.png","kind":"image","path":"sprite-atlas/protagonist/resolve_strip.png","mimeType":"image/png","sha256":"905698655d09de75c11fd7266298c5d9c358a7f5ef1439208ab16486765c3afc","bytes":3079167},{"id":"file.sprite.atlas.protagonist.serious.strip.png","kind":"image","path":"sprite-atlas/protagonist/serious_strip.png","mimeType":"image/png","sha256":"2fdbf141f0eeaf5770e51eccd572ccb7656d61286f11d79bd01cc5aa584d1311","bytes":2877761},{"id":"file.sprite.atlas.protagonist.shadow.strip.png","kind":"image","path":"sprite-atlas/protagonist/shadow_strip.png","mimeType":"image/png","sha256":"84afdc243de21b187237e3a2b8886f1c83b84d90bbcc913f623e32d6dc75a3a8","bytes":2881745},{"id":"file.sprite.atlas.protagonist.smile.strip.png","kind":"image","path":"sprite-atlas/protagonist/smile_strip.png","mimeType":"image/png","sha256":"ca025ac7f5d9b087296f431077c6526e578f594511ff98dc6f1b49ca67fc00b3","bytes":3054297},{"id":"file.sprite.atlas.protagonist.tender.strip.png","kind":"image","path":"sprite-atlas/protagonist/tender_strip.png","mimeType":"image/png","sha256":"cfc900db01d60e931b55c5c0921cc9dfdaf7d1f91af529ee4d96e964c4dab6b7","bytes":2946077},{"id":"file.sprite.atlas.protagonist.wet.hair.strip.png","kind":"image","path":"sprite-atlas/protagonist/wet-hair_strip.png","mimeType":"image/png","sha256":"ad2cdd374474a8fb05dc74bd47c0602b890b3e0f8ed6f42af5a6c6e9e72e55b1","bytes":3018208},{"id":"file.sprite.atlas.ren.normal.strip.png","kind":"image","path":"sprite-atlas/ren/normal_strip.png","mimeType":"image/png","sha256":"b1ab709df36557c1c92d5f7f74103050302bf274be9872bc3e53a67d811c6f20","bytes":3325824},{"id":"file.sprite.atlas.ring.agent.normal.strip.png","kind":"image","path":"sprite-atlas/ring_agent/normal_strip.png","mimeType":"image/png","sha256":"1433fcc31f67fb58731739cfec7738b3686f770b4c8f7219975003b8f0ad9280","bytes":3142702},{"id":"file.sprite.atlas.vergilius.normal.strip.png","kind":"image","path":"sprite-atlas/vergilius/normal_strip.png","mimeType":"image/png","sha256":"bc94c7bf3b146bc9171ff07633468b49c9ebeb58ca013d9e37b0ff3bec93e0f2","bytes":3721980},{"id":"file.sprite.atlas.yi.sang.normal.strip.png","kind":"image","path":"sprite-atlas/yi_sang/normal_strip.png","mimeType":"image/png","sha256":"cb35289ae216903f3c9b8727c01a37054eb8bd661edada48fe3e51e50be2edee","bytes":3081862},{"id":"file.ui.choice.button.svg","kind":"image","path":"ui/choice_button.svg","mimeType":"image/svg+xml","sha256":"6301a268c0d874185842cecba0acee7c99f4c29e8caba5203cd1ceb6e3b0cea5","bytes":1645},{"id":"file.ui.gallery.frame.svg","kind":"image","path":"ui/gallery_frame.svg","mimeType":"image/svg+xml","sha256":"19bf13a6c6a24a90a7372e98e422b5911a5eb63b870e2bd546f07d80439fc854","bytes":1646},{"id":"file.ui.menu.plate.svg","kind":"image","path":"ui/menu_plate.svg","mimeType":"image/svg+xml","sha256":"d8c0d45b6abdff52651712ec4dbb30736d61939563ccf920995d330475925d7d","bytes":1643},{"id":"file.ui.scanline.mask.svg","kind":"image","path":"ui/scanline_mask.svg","mimeType":"image/svg+xml","sha256":"8ca0f95223f6e523626d09a5e09dbca55f90687728e6fc23f15b28c3f6fdc4af","bytes":1645},{"id":"file.ui.status.panel.svg","kind":"image","path":"ui/status_panel.svg","mimeType":"image/svg+xml","sha256":"93e422a5c871f4bb7b8ec4965e04d3b5501da1117d81942f034479dd8a5dbd36","bytes":1645},{"id":"file.ui.textbox.svg","kind":"image","path":"ui/textbox.svg","mimeType":"image/svg+xml","sha256":"87eca356e01c43e6b571db16ec84b33fabe92697d62c251ffb9a0c5b33858b39","bytes":1655},{"id":"file.video.animated.desktop.ed.golden.bough.rebuild.mp4","kind":"video","path":"video/animated/desktop/ed_golden_bough_rebuild.mp4","mimeType":"video/mp4","sha256":"2fea23d2d53819f84638318e5a7c3b00da51c38703f452f946b13315faf96b00","bytes":7264295},{"id":"file.video.animated.desktop.ed.ring.conspiracy.mp4","kind":"video","path":"video/animated/desktop/ed_ring_conspiracy.mp4","mimeType":"video/mp4","sha256":"a5ccf17d2ba26bc1248b383ab669662a792a91b1776c637799cffa2b003cdac3","bytes":6393945},{"id":"file.video.animated.desktop.ed.white.canvas.mp4","kind":"video","path":"video/animated/desktop/ed_white_canvas.mp4","mimeType":"video/mp4","sha256":"be466f619c7773a06dfa5e6123e971d102a79c0df98ce9673cbd14ce332b21d2","bytes":5539601},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"file.video.animated.desktop.op.mp4","kind":"video","path":"video/animated/desktop/op.mp4","mimeType":"video/mp4","sha256":"92774f55e85ae2933f162080916993d95fb6234a0dade047ab4a1471d846c811","bytes":5222191},{"id":"file.video.animated.desktop.prologue.mp4","kind":"video","path":"video/animated/desktop/prologue.mp4","mimeType":"video/mp4","sha256":"18768d90579f3c08b3194ef9d88c32ec77eeade557740a8c76b4596b38da42cb","bytes":4568125},{"id":"file.video.animated.desktop.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"file.video.animated.desktop.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"file.video.animated.desktop.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"file.video.animated.desktop.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"file.video.animated.desktop.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"file.video.animated.desktop.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"file.video.animated.desktop.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"file.video.animated.desktop.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"file.video.animated.desktop.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"file.video.animated.desktop.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"file.video.animated.desktop.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"file.video.animated.desktop.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"file.video.animated.desktop.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"file.video.animated.desktop.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"file.video.animated.desktop.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"file.video.animated.desktop.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"file.video.animated.runtime.ed.golden.bough.rebuild.mp4","kind":"video","path":"video/animated/runtime/ed_golden_bough_rebuild.mp4","mimeType":"video/mp4","sha256":"346cfd4275cf79b01a8d4fb3d4df2f79c1df433af5222debb5cdbb6369c16128","bytes":4185642},{"id":"file.video.animated.runtime.ed.ring.conspiracy.mp4","kind":"video","path":"video/animated/runtime/ed_ring_conspiracy.mp4","mimeType":"video/mp4","sha256":"3d7c1e7612c1bc376de009d85fae9159e104275678b0982296e47c10f2b89115","bytes":3545978},{"id":"file.video.animated.runtime.ed.white.canvas.mp4","kind":"video","path":"video/animated/runtime/ed_white_canvas.mp4","mimeType":"video/mp4","sha256":"c4aa0f491be3053c4b5c76e1310cf409bbe41ad0ba4d4bd22394a6af7a74e48e","bytes":3071385},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"file.video.animated.runtime.op.mp4","kind":"video","path":"video/animated/runtime/op.mp4","mimeType":"video/mp4","sha256":"3b0025fb8d6afce1bc68a740afdab317fd95d41144fcc48c58b85b8ea2cdab99","bytes":2777954},{"id":"file.video.animated.runtime.prologue.mp4","kind":"video","path":"video/animated/runtime/prologue.mp4","mimeType":"video/mp4","sha256":"fe51ae3b788556551e5960d1e82bacb84a7484ff3edff273872ac5ed8eec8ad0","bytes":2583756},{"id":"file.video.animated.runtime.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"file.video.animated.runtime.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"file.video.animated.runtime.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"file.video.animated.runtime.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"file.video.animated.runtime.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"file.video.animated.runtime.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"file.video.animated.runtime.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"file.video.animated.runtime.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"file.video.animated.runtime.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"file.video.animated.runtime.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"file.video.animated.runtime.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"file.video.animated.runtime.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"file.video.animated.runtime.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"file.video.animated.runtime.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"file.video.animated.runtime.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"file.video.animated.runtime.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"file.videos.ed.mp4","kind":"video","path":"videos/ed.mp4","mimeType":"video/mp4","sha256":"01ac39c322816e6b98df0bc2fc57c952e610c19062578d4197c8685a6ba59761","bytes":13428432},{"id":"file.videos.op.mp4","kind":"video","path":"videos/op.mp4","mimeType":"video/mp4","sha256":"7d47fd8dec2fc4ac70c80c436412b084683ca2367825626a455e57ad87ed8b2b","bytes":15563758},{"id":"strip.original.albina.sprites.battle","kind":"image","path":"sprite-atlas/original_albina_sprites/battle_strip.png","mimeType":"image/png"},{"id":"strip.original.albina.sprites.normal","kind":"image","path":"sprite-atlas/original_albina_sprites/normal_strip.png","mimeType":"image/png"},{"id":"strip.original.albina.sprites.sad","kind":"image","path":"sprite-atlas/original_albina_sprites/sad_strip.png","mimeType":"image/png"},{"id":"strip.original.albina.sprites.smile","kind":"image","path":"sprite-atlas/original_albina_sprites/smile_strip.png","mimeType":"image/png"},{"id":"strip.original.cg.canto.ix.opening","kind":"image","path":"sprite-atlas/original_cg/canto_ix_opening_strip.png","mimeType":"image/png"},{"id":"strip.original.cg.hell.gate","kind":"image","path":"sprite-atlas/original_cg/hell_gate_strip.png","mimeType":"image/png"},{"id":"strip.original.cg.rain.confession","kind":"image","path":"sprite-atlas/original_cg/rain_confession_strip.png","mimeType":"image/png"},{"id":"strip.original.cg.ring.conspiracy","kind":"image","path":"sprite-atlas/original_cg/ring_conspiracy_strip.png","mimeType":"image/png"},{"id":"video.animated.desktop.ed_golden_bough_rebuild","kind":"video","path":"video/animated/desktop/ed_golden_bough_rebuild.mp4","mimeType":"video/mp4","sha256":"2fea23d2d53819f84638318e5a7c3b00da51c38703f452f946b13315faf96b00","bytes":7264295},{"id":"video.animated.desktop.ed_ring_conspiracy","kind":"video","path":"video/animated/desktop/ed_ring_conspiracy.mp4","mimeType":"video/mp4","sha256":"a5ccf17d2ba26bc1248b383ab669662a792a91b1776c637799cffa2b003cdac3","bytes":6393945},{"id":"video.animated.desktop.ed_white_canvas","kind":"video","path":"video/animated/desktop/ed_white_canvas.mp4","mimeType":"video/mp4","sha256":"be466f619c7773a06dfa5e6123e971d102a79c0df98ce9673cbd14ce332b21d2","bytes":5539601},{"id":"video.animated.desktop.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"video.animated.desktop.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"video.animated.desktop.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"video.animated.desktop.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"video.animated.desktop.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"video.animated.desktop.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"video.animated.desktop.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"video.animated.desktop.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"video.animated.desktop.op","kind":"video","path":"video/animated/desktop/op.mp4","mimeType":"video/mp4","sha256":"92774f55e85ae2933f162080916993d95fb6234a0dade047ab4a1471d846c811","bytes":5222191},{"id":"video.animated.desktop.prologue","kind":"video","path":"video/animated/desktop/prologue.mp4","mimeType":"video/mp4","sha256":"18768d90579f3c08b3194ef9d88c32ec77eeade557740a8c76b4596b38da42cb","bytes":4568125},{"id":"video.animated.desktop.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"video.animated.desktop.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"video.animated.desktop.ring_conspiracy_ending_true","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"video.animated.desktop.ring_conspiracy_scene_11","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"video.animated.desktop.ring_conspiracy_scene_15","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"video.animated.desktop.ring_conspiracy_scene_3","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"video.animated.desktop.ring_conspiracy_scene_5","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"video.animated.desktop.ring_conspiracy_scene_8","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"video.animated.desktop.white_canvas_ending_bad","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"video.animated.desktop.white_canvas_ending_normal","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"video.animated.desktop.white_canvas_ending_true","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"video.animated.desktop.white_canvas_scene_11","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"video.animated.desktop.white_canvas_scene_15","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"video.animated.desktop.white_canvas_scene_3","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"video.animated.desktop.white_canvas_scene_5","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"video.animated.desktop.white_canvas_scene_8","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"video.animated.runtime.ed_golden_bough_rebuild","kind":"video","path":"video/animated/runtime/ed_golden_bough_rebuild.mp4","mimeType":"video/mp4","sha256":"346cfd4275cf79b01a8d4fb3d4df2f79c1df433af5222debb5cdbb6369c16128","bytes":4185642},{"id":"video.animated.runtime.ed_ring_conspiracy","kind":"video","path":"video/animated/runtime/ed_ring_conspiracy.mp4","mimeType":"video/mp4","sha256":"3d7c1e7612c1bc376de009d85fae9159e104275678b0982296e47c10f2b89115","bytes":3545978},{"id":"video.animated.runtime.ed_white_canvas","kind":"video","path":"video/animated/runtime/ed_white_canvas.mp4","mimeType":"video/mp4","sha256":"c4aa0f491be3053c4b5c76e1310cf409bbe41ad0ba4d4bd22394a6af7a74e48e","bytes":3071385},{"id":"video.animated.runtime.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"video.animated.runtime.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"video.animated.runtime.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"video.animated.runtime.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"video.animated.runtime.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"video.animated.runtime.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"video.animated.runtime.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"video.animated.runtime.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"video.animated.runtime.op","kind":"video","path":"video/animated/runtime/op.mp4","mimeType":"video/mp4","sha256":"3b0025fb8d6afce1bc68a740afdab317fd95d41144fcc48c58b85b8ea2cdab99","bytes":2777954},{"id":"video.animated.runtime.prologue","kind":"video","path":"video/animated/runtime/prologue.mp4","mimeType":"video/mp4","sha256":"fe51ae3b788556551e5960d1e82bacb84a7484ff3edff273872ac5ed8eec8ad0","bytes":2583756},{"id":"video.animated.runtime.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"video.animated.runtime.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"video.animated.runtime.ring_conspiracy_ending_true","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"video.animated.runtime.ring_conspiracy_scene_11","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"video.animated.runtime.ring_conspiracy_scene_15","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"video.animated.runtime.ring_conspiracy_scene_3","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"video.animated.runtime.ring_conspiracy_scene_5","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"video.animated.runtime.ring_conspiracy_scene_8","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"video.animated.runtime.white_canvas_ending_bad","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"video.animated.runtime.white_canvas_ending_normal","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"video.animated.runtime.white_canvas_ending_true","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"video.animated.runtime.white_canvas_scene_11","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"video.animated.runtime.white_canvas_scene_15","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"video.animated.runtime.white_canvas_scene_3","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"video.animated.runtime.white_canvas_scene_5","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"video.animated.runtime.white_canvas_scene_8","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"voice.result.conspiracy_005_let_her_answer","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","bytes":218292},{"id":"voice.result.conspiracy_005_refuse_duo","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","bytes":225780},{"id":"voice.result.conspiracy_006_block_view","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","bytes":290292},{"id":"voice.result.conspiracy_006_stand_with_her","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","bytes":300660},{"id":"voice.result.conspiracy_007_break_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","bytes":233844},{"id":"voice.result.conspiracy_007_seize_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","bytes":271284},{"id":"voice.result.conspiracy_008_hand_pen_to_her","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","bytes":242484},{"id":"voice.result.conspiracy_008_refuse_testimony","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","bytes":229812},{"id":"voice.result.conspiracy_009_choose_present","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","bytes":287988},{"id":"voice.result.conspiracy_009_refuse_choice","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","bytes":306420},{"id":"voice.result.conspiracy_010_keep_badge_unworn","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","bytes":263796},{"id":"voice.result.conspiracy_010_throw_badge","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","bytes":260916},{"id":"voice.result.conspiracy_011_burn_film","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","bytes":243636},{"id":"voice.result.conspiracy_011_rewrite_ending","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","bytes":238452},{"id":"voice.result.conspiracy_012_end_tonight","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","bytes":277620},{"id":"voice.result.conspiracy_012_keep_blade","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","bytes":273588},{"id":"voice.result.conspiracy_013_hold_one_second","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","bytes":254004},{"id":"voice.result.conspiracy_013_return_gently","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","bytes":269556},{"id":"voice.result.conspiracy_014_erase_from_catalog","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","bytes":283956},{"id":"voice.result.conspiracy_014_keep_one_line","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","bytes":289716},{"id":"voice.result.conspiracy_accept","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","bytes":242484},{"id":"voice.result.conspiracy_break_pursuit_frame","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","bytes":237876},{"id":"voice.result.conspiracy_escape_to_backstreets","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","bytes":263796},{"id":"voice.result.conspiracy_feed_false_signature","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","bytes":240756},{"id":"voice.result.conspiracy_pressure","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","bytes":210804},{"id":"voice.result.enter_conspiracy","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"f8964fe276712a75e96af70eceb75f46845ab038422a529a4ca67d6ccc168e56","bytes":204468},{"id":"voice.result.enter_rebuild","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"fa7f6c482fb449c3f7c61f2d556182e30a49d449d14fb8329213f97ba8dae9db","bytes":202740},{"id":"voice.result.enter_white_canvas","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"5f238c579d61475995d082999f73a16d0c182f8db58a16ab8cd9d2a802277d97","bytes":164724},{"id":"voice.result.golden_bough_rebuild.bad_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","bytes":115764},{"id":"voice.result.golden_bough_rebuild.normal_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","bytes":112884},{"id":"voice.result.golden_bough_rebuild.true_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","bytes":105972},{"id":"voice.result.golden_bough_route_complete","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","bytes":331188},{"id":"voice.result.golden_bough_route_final","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","bytes":143988},{"id":"voice.result.rebuild_006_keep_silent_anchor","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","bytes":269556},{"id":"voice.result.rebuild_006_read_aloud","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","bytes":270708},{"id":"voice.result.rebuild_007_match_her_pulse","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","bytes":295476},{"id":"voice.result.rebuild_007_stay_own_rhythm","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","bytes":305268},{"id":"voice.result.rebuild_008_protect_current_self","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","bytes":274164},{"id":"voice.result.rebuild_008_trade_old_memory","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","bytes":271860},{"id":"voice.result.rebuild_009_hand_question_back","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","bytes":270132},{"id":"voice.result.rebuild_009_refuse_perfect_copy","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","bytes":267252},{"id":"voice.result.rebuild_010_ask_her_choice","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","bytes":226932},{"id":"voice.result.rebuild_010_veto_sealing","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","bytes":232692},{"id":"voice.result.rebuild_011_ask_next_revision","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","bytes":292020},{"id":"voice.result.rebuild_011_sit_beside","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","bytes":290868},{"id":"voice.result.rebuild_012_break_contract","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","bytes":251700},{"id":"voice.result.rebuild_012_negotiate_terms","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","bytes":268980},{"id":"voice.result.rebuild_013_offer_witness","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","bytes":254004},{"id":"voice.result.rebuild_013_promise_name","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","bytes":255156},{"id":"voice.result.rebuild_014_ask_when_to_light","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","bytes":286260},{"id":"voice.result.rebuild_014_keep_unlit","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","bytes":292596},{"id":"voice.result.rebuild_accept_missing_pieces","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","bytes":243636},{"id":"voice.result.rebuild_anchor","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","bytes":162420},{"id":"voice.result.rebuild_cut_false_completion","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","bytes":250548},{"id":"voice.result.rebuild_guard_fascia_pulse","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","bytes":265524},{"id":"voice.result.rebuild_push_into_raid","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","bytes":274164},{"id":"voice.result.rebuild_question_fascia","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","bytes":156660},{"id":"voice.result.rebuild_use_rooftop_signal","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","bytes":237300},{"id":"voice.result.return_opening_from_rebuild","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"93831e44f51a1755332b620bab795b5a6501bd2310dfe860e65d1de97f796dde","bytes":191220},{"id":"voice.result.return_opening_from_ring","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"07b6250f478559c01e05511edda03d37c45df65b9e1848f22cebc16447bdc421","bytes":195252},{"id":"voice.result.return_opening_from_white","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"f909503358a31908b759dbb172165b49e77d3800c6b5e9beb5355bbecd675c37","bytes":202164},{"id":"voice.result.ring_conspiracy_route_complete","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","bytes":283956},{"id":"voice.result.ring_conspiracy_route_final","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","bytes":156660},{"id":"voice.result.ring_conspiracy.bad_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","bytes":104820},{"id":"voice.result.ring_conspiracy.normal_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","bytes":127284},{"id":"voice.result.ring_conspiracy.true_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","bytes":112884},{"id":"voice.result.white_006_name_silence","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","bytes":282804},{"id":"voice.result.white_006_refuse_naming","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","bytes":286836},{"id":"voice.result.white_007_ask_fascia_term","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","bytes":289716},{"id":"voice.result.white_007_keep_mirror_open","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","bytes":270132},{"id":"voice.result.white_008_hold_fascia","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","bytes":226356},{"id":"voice.result.white_008_stay_witness_only","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","bytes":240756},{"id":"voice.result.white_009_keep_half_step","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","bytes":252852},{"id":"voice.result.white_009_share_umbrella_edge","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","bytes":218868},{"id":"voice.result.white_010_acknowledge_leave","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","bytes":242484},{"id":"voice.result.white_010_offer_return_ticket","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","bytes":245364},{"id":"voice.result.white_011_curtain_call","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","bytes":259764},{"id":"voice.result.white_011_walk_beside","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","bytes":265524},{"id":"voice.result.white_012_let_her_decide","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","bytes":244788},{"id":"voice.result.white_012_refuse_exhibit","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","bytes":233268},{"id":"voice.result.white_013_point_to_mirror","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","bytes":281652},{"id":"voice.result.white_013_refuse_to_choose","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","bytes":283956},{"id":"voice.result.white_014_keep_base_color","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","bytes":273588},{"id":"voice.result.white_014_offer_restart","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","bytes":296052},{"id":"voice.result.white_canvas_route_complete","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","bytes":291444},{"id":"voice.result.white_canvas_route_final","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","bytes":156660},{"id":"voice.result.white_canvas.bad_ending","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","bytes":111732},{"id":"voice.result.white_canvas.normal_ending","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","bytes":104820},{"id":"voice.result.white_canvas.true_ending","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","bytes":104244},{"id":"voice.result.white_follow_to_lab","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","bytes":271284},{"id":"voice.result.white_interrupt_lab_terms","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","bytes":247668},{"id":"voice.result.white_keep_empty_seat","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","bytes":267828},{"id":"voice.result.white_share_rain_window","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","bytes":256884},{"id":"voice.result.white_sign_witness_protocol","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","bytes":233268},{"id":"voice.result.white_tease_back","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","bytes":210804},{"id":"voice.result.white_touch_boundary","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","bytes":218868},{"id":"voice.scene.golden_bough_001","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","bytes":139380},{"id":"voice.scene.golden_bough_002","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","bytes":107124},{"id":"voice.scene.golden_bough_003","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","bytes":198132},{"id":"voice.scene.golden_bough_004","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","bytes":197556},{"id":"voice.scene.golden_bough_005","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","bytes":173364},{"id":"voice.scene.golden_bough_006","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","bytes":212532},{"id":"voice.scene.golden_bough_007","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","bytes":221748},{"id":"voice.scene.golden_bough_008","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","bytes":210228},{"id":"voice.scene.golden_bough_009","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","bytes":214836},{"id":"voice.scene.golden_bough_010","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","bytes":206772},{"id":"voice.scene.golden_bough_011","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","bytes":170484},{"id":"voice.scene.golden_bough_012","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","bytes":207924},{"id":"voice.scene.golden_bough_013","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","bytes":208500},{"id":"voice.scene.golden_bough_014","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","bytes":174516},{"id":"voice.scene.golden_bough_015","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","bytes":202740},{"id":"voice.scene.golden_bough_rebuild_ending_bad","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","bytes":204468},{"id":"voice.scene.golden_bough_rebuild_ending_gate","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","bytes":142260},{"id":"voice.scene.golden_bough_rebuild_ending_normal","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","bytes":195252},{"id":"voice.scene.golden_bough_rebuild_ending_true","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","bytes":222900},{"id":"voice.scene.opening_001","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"497c1b3cba838f47ce02c67ddb31ebdcc49e5cb8eaa5bbfa2027f6fef3a165a8","bytes":166452},{"id":"voice.scene.ring_conspiracy_001","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","bytes":127284},{"id":"voice.scene.ring_conspiracy_002","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","bytes":160692},{"id":"voice.scene.ring_conspiracy_003","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","bytes":167604},{"id":"voice.scene.ring_conspiracy_004","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","bytes":197556},{"id":"voice.scene.ring_conspiracy_005","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","bytes":189492},{"id":"voice.scene.ring_conspiracy_006","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","bytes":175092},{"id":"voice.scene.ring_conspiracy_007","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","bytes":183156},{"id":"voice.scene.ring_conspiracy_008","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","bytes":208500},{"id":"voice.scene.ring_conspiracy_009","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","bytes":162996},{"id":"voice.scene.ring_conspiracy_010","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","bytes":195828},{"id":"voice.scene.ring_conspiracy_011","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","bytes":197556},{"id":"voice.scene.ring_conspiracy_012","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","bytes":186036},{"id":"voice.scene.ring_conspiracy_013","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","bytes":209076},{"id":"voice.scene.ring_conspiracy_014","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","bytes":171636},{"id":"voice.scene.ring_conspiracy_015","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","bytes":248244},{"id":"voice.scene.ring_conspiracy_ending_bad","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","bytes":215412},{"id":"voice.scene.ring_conspiracy_ending_gate","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","bytes":147444},{"id":"voice.scene.ring_conspiracy_ending_normal","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","bytes":184884},{"id":"voice.scene.ring_conspiracy_ending_true","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","bytes":235572},{"id":"voice.scene.white_canvas_001","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"f9a92c1bc7670ad7639266c595dc0fa60b8d8304a848d946aad06f72ec7f07d7","bytes":110580},{"id":"voice.scene.white_canvas_002","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","bytes":142260},{"id":"voice.scene.white_canvas_003","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","bytes":160692},{"id":"voice.scene.white_canvas_004","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","bytes":186036},{"id":"voice.scene.white_canvas_005","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","bytes":181428},{"id":"voice.scene.white_canvas_006","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","bytes":196980},{"id":"voice.scene.white_canvas_007","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","bytes":199860},{"id":"voice.scene.white_canvas_008","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","bytes":218868},{"id":"voice.scene.white_canvas_009","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","bytes":175668},{"id":"voice.scene.white_canvas_010","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","bytes":148596},{"id":"voice.scene.white_canvas_011","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","bytes":196404},{"id":"voice.scene.white_canvas_012","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","bytes":171636},{"id":"voice.scene.white_canvas_013","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","bytes":193524},{"id":"voice.scene.white_canvas_014","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","bytes":188340},{"id":"voice.scene.white_canvas_015","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","bytes":207924},{"id":"voice.scene.white_canvas_ending_bad","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","bytes":199860},{"id":"voice.scene.white_canvas_ending_gate","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","bytes":142260},{"id":"voice.scene.white_canvas_ending_normal","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","bytes":177396},{"id":"voice.scene.white_canvas_ending_true","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","bytes":196980}]'), E_ = /* @__PURE__ */ JSON.parse('[{"version":2,"id":"portrait.albina.amused","characterId":"albina","path":"sprite-atlas/albina/amused_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.amused.png"},{"version":2,"id":"portrait.albina.armored","characterId":"albina","path":"sprite-atlas/albina/armored_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.armored.png"},{"version":2,"id":"portrait.albina.combat","characterId":"albina","path":"sprite-atlas/albina/combat_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.combat.png"},{"version":2,"id":"portrait.albina.endgame","characterId":"albina","path":"sprite-atlas/albina/endgame_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.endgame.png"},{"version":2,"id":"portrait.albina.fascia-open","characterId":"albina","path":"sprite-atlas/albina/fascia-open_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.fascia.open.png"},{"version":2,"id":"portrait.albina.focused","characterId":"albina","path":"sprite-atlas/albina/focused_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.focused.png"},{"version":2,"id":"portrait.albina.furious","characterId":"albina","path":"sprite-atlas/albina/furious_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.furious.png"},{"version":2,"id":"portrait.albina.golden-bough","characterId":"albina","path":"sprite-atlas/albina/golden-bough_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.golden.bough.png"},{"version":2,"id":"portrait.albina.maestro","characterId":"albina","path":"sprite-atlas/albina/maestro_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.maestro.png"},{"version":2,"id":"portrait.albina.normal","characterId":"albina","path":"sprite-atlas/albina/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.normal.png"},{"version":2,"id":"portrait.albina.rain","characterId":"albina","path":"sprite-atlas/albina/rain_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.rain.png"},{"version":2,"id":"portrait.albina.ring-conspiracy","characterId":"albina","path":"sprite-atlas/albina/ring-conspiracy_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.ring.conspiracy.png"},{"version":2,"id":"portrait.albina.shy","characterId":"albina","path":"sprite-atlas/albina/shy_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.shy.png"},{"version":2,"id":"portrait.albina.smile","characterId":"albina","path":"sprite-atlas/albina/smile_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.smile.png"},{"version":2,"id":"portrait.albina.surgical","characterId":"albina","path":"sprite-atlas/albina/surgical_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.surgical.png"},{"version":2,"id":"portrait.albina.unarmored","characterId":"albina","path":"sprite-atlas/albina/unarmored_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.unarmored.png"},{"version":2,"id":"portrait.albina.white-canvas","characterId":"albina","path":"sprite-atlas/albina/white-canvas_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.white.canvas.png"},{"version":2,"id":"portrait.albina.wounded","characterId":"albina","path":"sprite-atlas/albina/wounded_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.albina.wounded.png"},{"version":2,"id":"portrait.callisto.normal","characterId":"callisto","path":"sprite-atlas/callisto/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.callisto.normal.png"},{"version":2,"id":"portrait.charon.normal","characterId":"charon","path":"sprite-atlas/charon/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.charon.normal.png"},{"version":2,"id":"portrait.dante.normal","characterId":"dante","path":"sprite-atlas/dante/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.dante.normal.png"},{"version":2,"id":"portrait.fascia.normal","characterId":"fascia","path":"characters/albina/fascia-open.png","animation":{"kind":"static"}},{"version":2,"id":"portrait.faust.normal","characterId":"faust","path":"sprite-atlas/faust/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.faust.normal.png"},{"version":2,"id":"portrait.fixer_informant.normal","characterId":"fixer_informant","path":"sprite-atlas/fixer_informant/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.fixer.informant.normal.png"},{"version":2,"id":"portrait.golden_apparition.normal","characterId":"golden_apparition","path":"sprite-atlas/golden_apparition/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.golden.apparition.normal.png"},{"version":2,"id":"portrait.lcd_captain.normal","characterId":"lcd_captain","path":"sprite-atlas/lcd_captain/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.lcd.captain.normal.png"},{"version":2,"id":"portrait.lce_doctor.normal","characterId":"lce_doctor","path":"sprite-atlas/lce_doctor/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.lce.doctor.normal.png"},{"version":2,"id":"portrait.original_cg.albina_debut","characterId":"original_cg","path":"sprite-atlas/original_cg/albina_debut_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.original.cg.albina.debut.png"},{"version":2,"id":"portrait.original_cg.battle_climax","characterId":"original_cg","path":"sprite-atlas/original_cg/battle_climax_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.original.cg.battle.climax.png"},{"version":2,"id":"portrait.protagonist.battle","characterId":"protagonist","path":"sprite-atlas/protagonist/battle_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.battle.png"},{"version":2,"id":"portrait.protagonist.coat","characterId":"protagonist","path":"sprite-atlas/protagonist/coat_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.coat.png"},{"version":2,"id":"portrait.protagonist.formal","characterId":"protagonist","path":"sprite-atlas/protagonist/formal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.formal.png"},{"version":2,"id":"portrait.protagonist.injured","characterId":"protagonist","path":"sprite-atlas/protagonist/injured_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.injured.png"},{"version":2,"id":"portrait.protagonist.normal","characterId":"protagonist","path":"sprite-atlas/protagonist/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.normal.png"},{"version":2,"id":"portrait.protagonist.profile","characterId":"protagonist","path":"sprite-atlas/protagonist/profile_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.profile.png"},{"version":2,"id":"portrait.protagonist.resolve","characterId":"protagonist","path":"sprite-atlas/protagonist/resolve_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.resolve.png"},{"version":2,"id":"portrait.protagonist.serious","characterId":"protagonist","path":"sprite-atlas/protagonist/serious_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.serious.png"},{"version":2,"id":"portrait.protagonist.shadow","characterId":"protagonist","path":"sprite-atlas/protagonist/shadow_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.shadow.png"},{"version":2,"id":"portrait.protagonist.smile","characterId":"protagonist","path":"sprite-atlas/protagonist/smile_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.smile.png"},{"version":2,"id":"portrait.protagonist.tender","characterId":"protagonist","path":"sprite-atlas/protagonist/tender_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.tender.png"},{"version":2,"id":"portrait.protagonist.wet-hair","characterId":"protagonist","path":"sprite-atlas/protagonist/wet-hair_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.protagonist.wet.hair.png"},{"version":2,"id":"portrait.ren.normal","characterId":"ren","path":"sprite-atlas/ren/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.ren.normal.png"},{"version":2,"id":"portrait.ring_agent.normal","characterId":"ring_agent","path":"sprite-atlas/ring_agent/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.ring.agent.normal.png"},{"version":2,"id":"portrait.vergilius.normal","characterId":"vergilius","path":"sprite-atlas/vergilius/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.vergilius.normal.png"},{"version":2,"id":"portrait.yi_sang.normal","characterId":"yi_sang","path":"sprite-atlas/yi_sang/normal_strip.png","animation":{"kind":"strip","frameCount":8,"frameWidth":192,"frameHeight":1024,"fps":8},"fallbackAssetId":"file.characters.yi.sang.normal.png"}]'), I_ = [{ version: 2, id: "job.cg.mirror_broken", assetId: "cg.mirror_broken", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "e5712718c58921a33f66f79120485926682a183d7445286abe8547624784b77e", inputAssetIds: ["cg.art_resonance"], outputPath: "cg/mirror_broken.png", attempts: 0 }, { version: 2, id: "job.cg.rain_reflection", assetId: "cg.rain_reflection", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "7a9867eab82e7242ee694cb446d18864759bcc0558b1e80a60b4428ee13b2a94", inputAssetIds: ["cg.rain_confession"], outputPath: "cg/rain_reflection.png", attempts: 0 }, { version: 2, id: "job.strip.original.albina.sprites.battle", assetId: "strip.original.albina.sprites.battle", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "1f2bfd5f7b505c355c3a4aa849bfd46d667d0fe75af2ea71235cba4ea56ea1f1", inputAssetIds: ["file.original.albina.sprites.battle.png"], outputPath: "sprite-atlas/original_albina_sprites/battle_strip.png", attempts: 3, error: 'HTTP 403: {"error":{"message":"预扣费额度失败, 用户剩余额度: ＄0.050000, 需要预扣费额度: ＄0.100000 (request id: 202607091842143082986988268d9d66TROf2Up)","type":"new_api_error","param":"","code":"insufficient_user_quota"}}' }, { version: 2, id: "job.strip.original.albina.sprites.normal", assetId: "strip.original.albina.sprites.normal", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "b92d284a2e50aaf02ebd8b3996a50749f93a057d19bc2a7afcc7ee065306dfcb", inputAssetIds: ["file.original.albina.sprites.normal.png"], outputPath: "sprite-atlas/original_albina_sprites/normal_strip.png", attempts: 3, error: 'HTTP 403: {"error":{"message":"预扣费额度失败, 用户剩余额度: ＄0.050000, 需要预扣费额度: ＄0.100000 (request id: 202607091842477024722458268d9d6mw1xzwxB)","type":"new_api_error","param":"","code":"insufficient_user_quota"}}' }, { version: 2, id: "job.strip.original.albina.sprites.sad", assetId: "strip.original.albina.sprites.sad", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "ca5a1122df15a71bb788355d8ac5af627564cb97d12bdf483499fd35eee2fc97", inputAssetIds: ["file.original.albina.sprites.sad.png"], outputPath: "sprite-atlas/original_albina_sprites/sad_strip.png", attempts: 0 }, { version: 2, id: "job.strip.original.albina.sprites.smile", assetId: "strip.original.albina.sprites.smile", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "c1dce303e33582f94413e268abb26f0eb2ee106a84e74b63697ccba2300fb9f0", inputAssetIds: ["file.original.albina.sprites.smile.png"], outputPath: "sprite-atlas/original_albina_sprites/smile_strip.png", attempts: 0 }, { version: 2, id: "job.strip.original.cg.canto.ix.opening", assetId: "strip.original.cg.canto.ix.opening", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "032993f9e4c1981393e364a8b5272ca690f9dda11951a01cd83b13390ae3aab0", inputAssetIds: ["file.original.cg.canto.ix.opening.png"], outputPath: "sprite-atlas/original_cg/canto_ix_opening_strip.png", attempts: 3, error: 'HTTP 403: {"error":{"message":"预扣费额度失败, 用户剩余额度: ＄0.050000, 需要预扣费额度: ＄0.100000 (request id: 202607091839498508537008268d9d67gwnpnxM)","type":"new_api_error","param":"","code":"insufficient_user_quota"}}' }, { version: 2, id: "job.strip.original.cg.hell.gate", assetId: "strip.original.cg.hell.gate", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "ce3a392e94477edff91c0b734e0316700eae6e6814223106e12d8f14417f12ed", inputAssetIds: ["file.original.cg.hell.gate.png"], outputPath: "sprite-atlas/original_cg/hell_gate_strip.png", attempts: 3, error: 'HTTP 403: {"error":{"message":"预扣费额度失败, 用户剩余额度: ＄0.050000, 需要预扣费额度: ＄0.100000 (request id: 202607091840249061893478268d9d6ka0wLtJk)","type":"new_api_error","param":"","code":"insufficient_user_quota"}}' }, { version: 2, id: "job.strip.original.cg.rain.confession", assetId: "strip.original.cg.rain.confession", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "3df4e7b9df7a4ae8e9f7b2819bbf45ee8ef76d8a7af908a5ead09bf89602b073", inputAssetIds: ["file.original.cg.rain.confession.png"], outputPath: "sprite-atlas/original_cg/rain_confession_strip.png", attempts: 3, error: 'HTTP 403: {"error":{"message":"预扣费额度失败, 用户剩余额度: ＄0.050000, 需要预扣费额度: ＄0.100000 (request id: 202607091840546398154378268d9d6BnzkAOYB)","type":"new_api_error","param":"","code":"insufficient_user_quota"}}' }, { version: 2, id: "job.strip.original.cg.ring.conspiracy", assetId: "strip.original.cg.ring.conspiracy", kind: "image-edit", model: "gpt-image-2", status: "pending", contentHash: "572873181a31313d7b15266c864ca85d28e269394d3ae3b5101c71e279b83a91", inputAssetIds: ["file.original.cg.ring.conspiracy.png"], outputPath: "sprite-atlas/original_cg/ring_conspiracy_strip.png", attempts: 3, error: 'HTTP 403: {"error":{"message":"预扣费额度失败, 用户剩余额度: ＄0.050000, 需要预扣费额度: ＄0.100000 (request id: 202607091841379559462728268d9d67jCFuMAr)","type":"new_api_error","param":"","code":"insufficient_user_quota"}}' }], T_ = {
  version: v_,
  projectId: y_,
  basePath: k_,
  assets: w_,
  portraits: E_,
  mediaJobs: I_
}, A_ = 2, O_ = "albina-galgame-card", x_ = "opening_001", S_ = { white_canvas: "white_canvas_001", golden_bough_rebuild: "golden_bough_001", ring_conspiracy: "ring_conspiracy_001" }, N_ = /* @__PURE__ */ JSON.parse('[{"version":2,"id":"opening_001","chapter":1,"route":"white_canvas","locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.opening_rain","videoAssetId":"video.animated.runtime.prologue","desktopVideoAssetId":"video.animated.desktop.prologue","tone":"rain","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.normal","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","voiceAssetId":"voice.scene.opening_001","bgmAssetId":"file.audio.bgm.backstreets.rain.mp3","choices":[{"id":"enter_white_canvas","text":"留在她的白色画布前","nextSceneId":"white_canvas_001","resultText":"你选择“留在她的白色画布前”。阿尔比娜：白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。","resultVoiceAssetId":"voice.result.enter_white_canvas","effects":{"route":"white_canvas","values":{"affectionAlbina":2,"trust":2,"artResonance":1},"setFlags":["route_white_canvas_seen"],"unlockCg":["cg.opening_rain"]}},{"id":"enter_rebuild","text":"询问金枝重构的痕迹","nextSceneId":"golden_bough_001","resultText":"你选择“询问金枝重构的痕迹”。阿尔比娜：金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。","resultVoiceAssetId":"voice.result.enter_rebuild","effects":{"route":"golden_bough_rebuild","values":{"trust":3,"danger":1},"setFlags":["route_rebuild_seen"],"unlockCg":["cg.golden_bough_rebuild"]}},{"id":"enter_conspiracy","text":"接受环指的危险邀请","nextSceneId":"ring_conspiracy_001","resultText":"你选择“接受环指的危险邀请”。阿尔比娜：蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。","resultVoiceAssetId":"voice.result.enter_conspiracy","effects":{"route":"ring_conspiracy","values":{"danger":3,"artResonance":2},"setFlags":["route_conspiracy_seen"],"unlockCg":["cg.ring_invitation"]}}]},{"version":2,"id":"white_canvas_001","chapter":1,"route":"white_canvas","locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.94},{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"right","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。","voiceAssetId":"voice.scene.white_canvas_001","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_touch_boundary","text":"告诉她：完整也是一种作品","nextSceneId":"white_canvas_002","resultText":"你选择“告诉她：完整也是一种作品”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_touch_boundary","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["albina_learns_wholeness"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_tease_back","text":"反问她是否害怕自己的画布","nextSceneId":"white_canvas_002","resultText":"你选择“反问她是否害怕自己的画布”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_tease_back","effects":{"values":{"affectionAlbina":2,"danger":1,"artResonance":3},"setFlags":["player_teases_artist"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_002","chapter":2,"route":"white_canvas","locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","voiceAssetId":"voice.scene.white_canvas_002","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_follow_to_lab","text":"陪她把画布带进 LCE 临时手术室","nextSceneId":"white_canvas_003","resultText":"你选择“陪她把画布带进 LCE 临时手术室”。LCE 医师：灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","resultVoiceAssetId":"voice.result.white_follow_to_lab","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":2},"setFlags":["white_lab_boundary_seen"],"unlockCg":["cg.hollow_torso_reveal"]}},{"id":"return_opening_from_white","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_white","effects":{"values":{"trust":1},"setFlags":["white_canvas_looped"]}}]},{"version":2,"id":"white_canvas_003","chapter":3,"route":"white_canvas","locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_3","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_3","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","voiceAssetId":"voice.scene.white_canvas_003","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_sign_witness_protocol","text":"只签见证，不签处置权","nextSceneId":"white_canvas_004","resultText":"你选择“只签见证，不签处置权”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_sign_witness_protocol","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":2},"setFlags":["witness_not_ownership"],"unlockCg":["cg.lce_raid"]}},{"id":"white_interrupt_lab_terms","text":"要求医师删去所有所有权措辞","nextSceneId":"white_canvas_004","resultText":"你选择“要求医师删去所有所有权措辞”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_interrupt_lab_terms","effects":{"values":{"trust":3,"danger":1,"artResonance":3},"setFlags":["lab_terms_rewritten"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"white_canvas_004","chapter":4,"route":"white_canvas","locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","voiceAssetId":"voice.scene.white_canvas_004","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_keep_empty_seat","text":"替她保留那张无人审判的座位","nextSceneId":"white_canvas_005","resultText":"你选择“替她保留那张无人审判的座位”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_keep_empty_seat","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":1},"setFlags":["white_canvas_empty_seat"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_share_rain_window","text":"把雨夜倒影交给她自己命名","nextSceneId":"white_canvas_005","resultText":"你选择“把雨夜倒影交给她自己命名”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_share_rain_window","effects":{"values":{"affectionAlbina":3,"trust":2,"artResonance":3},"setFlags":["rain_reflection_named"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_005","chapter":5,"route":"white_canvas","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_5","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_5","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","voiceAssetId":"voice.scene.white_canvas_005","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_complete","text":"记录白色画布路线的暂定结局","nextSceneId":"white_canvas_006","resultText":"你选择“记录白色画布路线的暂定结局”。阿尔比娜：空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","resultVoiceAssetId":"voice.result.white_canvas_route_complete","effects":{"values":{"affectionAlbina":2,"trust":2,"danger":-1,"artResonance":2},"setFlags":["white_canvas_route_complete"]}}]},{"version":2,"id":"white_canvas_006","chapter":6,"route":"white_canvas","locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","voiceAssetId":"voice.scene.white_canvas_006","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_006_name_silence","text":"替那条轮廓取一个不会被收藏的名字","nextSceneId":"white_canvas_007","resultText":"你选择“替那条轮廓取一个不会被收藏的名字”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_name_silence","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":3},"setFlags":["silhouette_named"],"unlockCg":["cg.art_resonance"]}},{"id":"white_006_refuse_naming","text":"让轮廓保持无名，由她决定","nextSceneId":"white_canvas_007","resultText":"你选择“让轮廓保持无名，由她决定”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_refuse_naming","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["naming_returned"],"unlockCg":["cg.trust_threshold"]}}]},{"version":2,"id":"white_canvas_007","chapter":7,"route":"white_canvas","locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.fascia_heartbeat","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"right","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"center","active":false,"scale":0.86},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.9}],"speaker":"法西娅","text":"法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","voiceAssetId":"voice.scene.white_canvas_007","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_007_keep_mirror_open","text":"让镜子继续映照，不替她遮蔽","nextSceneId":"white_canvas_008","resultText":"你选择“让镜子继续映照，不替她遮蔽”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_keep_mirror_open","effects":{"values":{"trust":3,"danger":1,"artResonance":4},"setFlags":["mirror_kept_open"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_007_ask_fascia_term","text":"当着阿尔比娜问法西娅一个边界问题","nextSceneId":"white_canvas_008","resultText":"你选择“当着阿尔比娜问法西娅一个边界问题”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_ask_fascia_term","effects":{"values":{"affectionAlbina":1,"trust":2,"artResonance":3},"setFlags":["fascia_addressed_directly"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_008","chapter":8,"route":"white_canvas","locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_8","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_8","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","voiceAssetId":"voice.scene.white_canvas_008","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_008_hold_fascia","text":"替她暂时照看法西娅","nextSceneId":"white_canvas_009","resultText":"你选择“替她暂时照看法西娅”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_hold_fascia","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":2},"setFlags":["fascia_held_by_player"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_008_stay_witness_only","text":"只站在她视野内，不接手","nextSceneId":"white_canvas_009","resultText":"你选择“只站在她视野内，不接手”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_stay_witness_only","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["witness_distance_kept"],"unlockCg":["cg.lce_raid"]}}]},{"version":2,"id":"white_canvas_009","chapter":9,"route":"white_canvas","locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","voiceAssetId":"voice.scene.white_canvas_009","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_009_keep_half_step","text":"守住半步距离，不擅自靠近","nextSceneId":"white_canvas_010","resultText":"你选择“守住半步距离，不擅自靠近”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_keep_half_step","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["half_step_distance"],"unlockCg":["cg.rain_confession"]}},{"id":"white_009_share_umbrella_edge","text":"把伞沿偏向她那侧","nextSceneId":"white_canvas_010","resultText":"你选择“把伞沿偏向她那侧”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_share_umbrella_edge","effects":{"values":{"affectionAlbina":4,"trust":2,"artResonance":2},"setFlags":["umbrella_shared"],"unlockCg":["cg.rain_reflection"]}}]},{"version":2,"id":"white_canvas_010","chapter":10,"route":"white_canvas","locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"但丁","text":"但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","voiceAssetId":"voice.scene.white_canvas_010","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_010_acknowledge_leave","text":"承认她随时可以离开这张画布","nextSceneId":"white_canvas_011","resultText":"你选择“承认她随时可以离开这张画布”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_acknowledge_leave","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["leaving_acknowledged"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"white_010_offer_return_ticket","text":"给她一张可以返回的车票，而不是绳索","nextSceneId":"white_canvas_011","resultText":"你选择“给她一张可以返回的车票，而不是绳索”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_offer_return_ticket","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":2},"setFlags":["return_ticket_given"],"unlockCg":["cg.rain_reflection"]}}]},{"version":2,"id":"white_canvas_011","chapter":11,"route":"white_canvas","locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.art_resonance","videoAssetId":"video.animated.runtime.white_canvas_scene_11","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_11","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","voiceAssetId":"voice.scene.white_canvas_011","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_011_curtain_call","text":"答应替她谢幕，不替她登台","nextSceneId":"white_canvas_012","resultText":"你选择“答应替她谢幕，不替她登台”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_curtain_call","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["curtain_call_promised"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_011_walk_beside","text":"陪她走下月台，不离开也不催促","nextSceneId":"white_canvas_012","resultText":"你选择“陪她走下月台，不离开也不催促”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_walk_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["platform_walked_together"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_012","chapter":12,"route":"white_canvas","locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","voiceAssetId":"voice.scene.white_canvas_012","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_012_refuse_exhibit","text":"当众拒绝展出她的缺陷","nextSceneId":"white_canvas_013","resultText":"你选择“当众拒绝展出她的缺陷”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_refuse_exhibit","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["defect_not_exhibited"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_012_let_her_decide","text":"把展与不展的决定权交还给她","nextSceneId":"white_canvas_013","resultText":"你选择“把展与不展的决定权交还给她”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_let_her_decide","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["exhibit_choice_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_013","chapter":13,"route":"white_canvas","locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.art_resonance","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","voiceAssetId":"voice.scene.white_canvas_013","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_013_point_to_mirror","text":"指向墙上那面映过法西娅的镜子","nextSceneId":"white_canvas_014","resultText":"你选择“指向墙上那面映过法西娅的镜子”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_point_to_mirror","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":5},"setFlags":["mirror_pointed_out"],"unlockCg":["cg.mirror_broken"]}},{"id":"white_013_refuse_to_choose","text":"拒绝替她决定，让她自己下刀","nextSceneId":"white_canvas_014","resultText":"你选择“拒绝替她决定，让她自己下刀”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_refuse_to_choose","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":3},"setFlags":["knife_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_014","chapter":14,"route":"white_canvas","locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.trust_threshold","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","voiceAssetId":"voice.scene.white_canvas_014","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_014_keep_base_color","text":"答应替她保留最后一层底色","nextSceneId":"white_canvas_015","resultText":"你选择“答应替她保留最后一层底色”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_keep_base_color","effects":{"values":{"affectionAlbina":4,"trust":4,"artResonance":3},"setFlags":["base_color_kept"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_014_offer_restart","text":"答应陪她从空白重新开始","nextSceneId":"white_canvas_015","resultText":"你选择“答应陪她从空白重新开始”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_offer_restart","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["restart_offered"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_015","chapter":15,"route":"white_canvas","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_15","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","voiceAssetId":"voice.scene.white_canvas_015","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_final","text":"为白色画布路线盖上最后一枚印章","nextSceneId":"white_canvas_ending_gate","resultText":"你选择“为白色画布路线盖上最后一枚印章”。白色画布路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.white_canvas_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["white_canvas_route_final"]}}]},{"version":2,"id":"white_canvas_ending_gate","chapter":16,"route":"white_canvas","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"right","active":false,"scale":0.84}],"speaker":"叙事记录","text":"白色画布的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.white_canvas_ending_gate","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"white_canvas_ending_true","resultText":"结局判定完成：白色画布·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.true_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]},"effects":{"setFlags":["ending_white_canvas_true_qualified"]}},{"id":"white_canvas_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"white_canvas_ending_normal","resultText":"结局判定完成：白色画布·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_white_canvas_normal_qualified"]}},{"id":"white_canvas_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"white_canvas_ending_bad","resultText":"结局判定完成：白色画布·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]},"effects":{"setFlags":["ending_white_canvas_bad_qualified"]}}]},{"version":2,"id":"white_canvas_ending_true","chapter":17,"route":"white_canvas","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_true","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"晨光落在未署名的白画上。阿尔比娜没有把你画成作品，而是把并肩离开的两道影子留在画框之外：这一次，完整与亲密同时成立。","voiceAssetId":"voice.scene.white_canvas_ending_true","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]}}},{"version":2,"id":"white_canvas_ending_normal","chapter":17,"route":"white_canvas","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_normal","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"展厅按约熄灯。你们保留了尚未说尽的话，也保留了随时重画的权利。阿尔比娜把空白画布卷好，约定下一场雨后再见。","voiceAssetId":"voice.scene.white_canvas_ending_normal","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"white_canvas_ending_bad","chapter":17,"route":"white_canvas","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_bad","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"白厅没有发生争吵，只剩一张过早完成的画。阿尔比娜礼貌地收回画笔与称呼；边界仍被守住，但你们没能把信任带到黎明。","voiceAssetId":"voice.scene.white_canvas_ending_bad","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]}}},{"version":2,"id":"golden_bough_001","chapter":1,"route":"golden_bough_rebuild","locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"left","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。","voiceAssetId":"voice.scene.golden_bough_001","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_anchor","text":"成为她的记忆锚点","nextSceneId":"golden_bough_002","resultText":"你选择“成为她的记忆锚点”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["player_memory_anchor"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_question_fascia","text":"先检查法西娅","nextSceneId":"golden_bough_002","resultText":"你选择“先检查法西娅”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_question_fascia","effects":{"values":{"trust":2,"danger":1,"artResonance":4},"setFlags":["fascia_checked_first"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_002","chapter":2,"route":"golden_bough_rebuild","locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.94}],"speaker":"旁白","text":"镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","voiceAssetId":"voice.scene.golden_bough_002","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_push_into_raid","text":"带着记忆锚点突入金枝异常现场","nextSceneId":"golden_bough_003","resultText":"你选择“带着记忆锚点突入金枝异常现场”。浮士德：金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","resultVoiceAssetId":"voice.result.rebuild_push_into_raid","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["rebuild_raid_committed"],"unlockCg":["cg.lce_raid"]}},{"id":"return_opening_from_rebuild","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_rebuild","effects":{"values":{"trust":1},"setFlags":["rebuild_looped"]}}]},{"version":2,"id":"golden_bough_003","chapter":3,"route":"golden_bough_rebuild","locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_3","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_3","tone":"threat","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"浮士德","text":"金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","voiceAssetId":"voice.scene.golden_bough_003","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_cut_false_completion","text":"切断“完成品”的错误定义","nextSceneId":"golden_bough_004","resultText":"你选择“切断“完成品”的错误定义”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_cut_false_completion","effects":{"values":{"trust":4,"danger":1,"artResonance":4},"setFlags":["false_completion_cut"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_guard_fascia_pulse","text":"守住法西娅的心跳频率","nextSceneId":"golden_bough_004","resultText":"你选择“守住法西娅的心跳频率”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_guard_fascia_pulse","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["fascia_pulse_guarded"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_004","chapter":4,"route":"golden_bough_rebuild","locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","voiceAssetId":"voice.scene.golden_bough_004","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_accept_missing_pieces","text":"承认缺口也是她的结构","nextSceneId":"golden_bough_005","resultText":"你选择“承认缺口也是她的结构”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_accept_missing_pieces","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["missing_pieces_accepted"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_use_rooftop_signal","text":"用楼顶信号重排记忆顺序","nextSceneId":"golden_bough_005","resultText":"你选择“用楼顶信号重排记忆顺序”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_use_rooftop_signal","effects":{"values":{"trust":3,"danger":-1,"artResonance":4},"setFlags":["rooftop_signal_reordered"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_005","chapter":5,"route":"golden_bough_rebuild","locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_5","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_5","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","voiceAssetId":"voice.scene.golden_bough_005","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_complete","text":"记录金枝重构路线的暂定结局","nextSceneId":"golden_bough_006","resultText":"你选择“记录金枝重构路线的暂定结局”。浮士德：记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","resultVoiceAssetId":"voice.result.golden_bough_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-1,"artResonance":3},"setFlags":["golden_bough_route_complete"]}}]},{"version":2,"id":"golden_bough_006","chapter":6,"route":"golden_bough_rebuild","locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.surgery_of_memory","tone":"golden","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"浮士德","text":"记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","voiceAssetId":"voice.scene.golden_bough_006","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_006_read_aloud","text":"把那段记忆当着她的面念出来","nextSceneId":"golden_bough_007","resultText":"你选择“把那段记忆当着她的面念出来”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_read_aloud","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["memory_read_aloud"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_006_keep_silent_anchor","text":"只做锚点，不替她出声","nextSceneId":"golden_bough_007","resultText":"你选择“只做锚点，不替她出声”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_keep_silent_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["silent_anchor_kept"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_007","chapter":7,"route":"golden_bough_rebuild","locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","voiceAssetId":"voice.scene.golden_bough_007","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_007_match_her_pulse","text":"按她的节拍调整呼吸","nextSceneId":"golden_bough_008","resultText":"你选择“按她的节拍调整呼吸”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_match_her_pulse","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pulse_matched"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"rebuild_007_stay_own_rhythm","text":"保留你自己的呼吸节奏，让她对齐","nextSceneId":"golden_bough_008","resultText":"你选择“保留你自己的呼吸节奏，让她对齐”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_stay_own_rhythm","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":4},"setFlags":["own_rhythm_kept"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_008","chapter":8,"route":"golden_bough_rebuild","locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_8","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_8","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","voiceAssetId":"voice.scene.golden_bough_008","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_008_protect_current_self","text":"保护此刻这个尚未完成的她","nextSceneId":"golden_bough_009","resultText":"你选择“保护此刻这个尚未完成的她”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_protect_current_self","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["current_self_protected"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_008_trade_old_memory","text":"用一段旧记忆换取撤退时间","nextSceneId":"golden_bough_009","resultText":"你选择“用一段旧记忆换取撤退时间”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_trade_old_memory","effects":{"values":{"trust":2,"danger":-2,"artResonance":4},"setFlags":["memory_traded"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_009","chapter":9,"route":"golden_bough_rebuild","locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"金色幻影","text":"镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","voiceAssetId":"voice.scene.golden_bough_009","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_009_refuse_perfect_copy","text":"替她拒绝那个完美复制品","nextSceneId":"golden_bough_010","resultText":"你选择“替她拒绝那个完美复制品”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_refuse_perfect_copy","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["perfect_copy_refused"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_009_hand_question_back","text":"把问题原样交还给她","nextSceneId":"golden_bough_010","resultText":"你选择“把问题原样交还给她”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_hand_question_back","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["question_returned"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_010","chapter":10,"route":"golden_bough_rebuild","locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","voiceAssetId":"voice.scene.golden_bough_010","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_010_veto_sealing","text":"当着医师反对封存记忆","nextSceneId":"golden_bough_011","resultText":"你选择“当着医师反对封存记忆”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_veto_sealing","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":2,"artResonance":3},"setFlags":["memory_seal_vetoed"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_010_ask_her_choice","text":"低声问她自己想怎么签","nextSceneId":"golden_bough_011","resultText":"你选择“低声问她自己想怎么签”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_ask_her_choice","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":2},"setFlags":["seal_choice_hers"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_011","chapter":11,"route":"golden_bough_rebuild","locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_11","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_11","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","voiceAssetId":"voice.scene.golden_bough_011","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_011_sit_beside","text":"坐到她旁边，不说话","nextSceneId":"golden_bough_012","resultText":"你选择“坐到她旁边，不说话”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_sit_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["silent_companionship"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"rebuild_011_ask_next_revision","text":"问她下一笔想修改哪里","nextSceneId":"golden_bough_012","resultText":"你选择“问她下一笔想修改哪里”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_ask_next_revision","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["next_revision_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_012","chapter":12,"route":"golden_bough_rebuild","locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","voiceAssetId":"voice.scene.golden_bough_012","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"rebuild_012_break_contract","text":"当面撕毁那份替换协议","nextSceneId":"golden_bough_013","resultText":"你选择“当面撕毁那份替换协议”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_break_contract","effects":{"values":{"trust":4,"danger":2,"artResonance":3},"setFlags":["replacement_contract_torn"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"rebuild_012_negotiate_terms","text":"替她重新谈判条件，不让她独自承担","nextSceneId":"golden_bough_013","resultText":"你选择“替她重新谈判条件，不让她独自承担”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_negotiate_terms","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":4},"setFlags":["terms_renegotiated"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_013","chapter":13,"route":"golden_bough_rebuild","locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"fascia","portraitAssetId":"portrait.fascia.normal","position":"right","active":false,"scale":0.84},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","voiceAssetId":"voice.scene.golden_bough_013","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_013_promise_name","text":"答应她即使失败也记得这个名字","nextSceneId":"golden_bough_014","resultText":"你选择“答应她即使失败也记得这个名字”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_promise_name","effects":{"values":{"affectionAlbina":4,"trust":5,"artResonance":3},"setFlags":["name_promise_given"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_013_offer_witness","text":"只承诺做见证，不承诺结果","nextSceneId":"golden_bough_014","resultText":"你选择“只承诺做见证，不承诺结果”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_offer_witness","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["witness_only_promise"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_014","chapter":14,"route":"golden_bough_rebuild","locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","voiceAssetId":"voice.scene.golden_bough_014","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_014_keep_unlit","text":"答应只保管，不替她点亮","nextSceneId":"golden_bough_015","resultText":"你选择“答应只保管，不替她点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_keep_unlit","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":3},"setFlags":["gilded_bough_kept_unlit"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_014_ask_when_to_light","text":"问她什么时刻才能点亮","nextSceneId":"golden_bough_015","resultText":"你选择“问她什么时刻才能点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_ask_when_to_light","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["lighting_condition_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_015","chapter":15,"route":"golden_bough_rebuild","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_15","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_15","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","voiceAssetId":"voice.scene.golden_bough_015","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_final","text":"为金枝重构路线落最后一笔","nextSceneId":"golden_bough_rebuild_ending_gate","resultText":"你选择“为金枝重构路线落最后一笔”。金枝重构路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.golden_bough_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["golden_bough_route_final"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_gate","chapter":16,"route":"golden_bough_rebuild","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"金枝重构的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_gate","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_rebuild_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"golden_bough_rebuild_ending_true","resultText":"结局判定完成：金枝重构·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.true_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]},"effects":{"setFlags":["ending_golden_bough_rebuild_true_qualified"]}},{"id":"golden_bough_rebuild_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"golden_bough_rebuild_ending_normal","resultText":"结局判定完成：金枝重构·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_golden_bough_rebuild_normal_qualified"]}},{"id":"golden_bough_rebuild_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"golden_bough_rebuild_ending_bad","resultText":"结局判定完成：金枝重构·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]},"effects":{"setFlags":["ending_golden_bough_rebuild_bad_qualified"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_true","chapter":17,"route":"golden_bough_rebuild","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_true","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_true","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"金枝残响终于与法西娅的心跳重合。阿尔比娜记得每一次称呼、暂停和重新确认；她以新的身体醒来，也完整记得是谁陪她走过重构。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_true","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]}}},{"version":2,"id":"golden_bough_rebuild_ending_normal","chapter":17,"route":"golden_bough_rebuild","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_normal","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_normal","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"重构在可控范围内结束。部分残响仍被封存在金色薄膜后，但阿尔比娜认得你，也认得自己。你们决定把余下修复交给时间。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_normal","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"golden_bough_rebuild_ending_bad","chapter":17,"route":"golden_bough_rebuild","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_bad","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_bad","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"稳定槽保住了身体，却没能保住全部连续性。阿尔比娜醒来时仍然礼貌，只把你当作可靠的见证者；被遗漏的称呼沉在金枝深处。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_bad","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]}}},{"version":2,"id":"ring_conspiracy_001","chapter":1,"route":"ring_conspiracy","locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。","voiceAssetId":"voice.scene.ring_conspiracy_001","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_accept","text":"接下委托，但保留自己的条件","nextSceneId":"ring_conspiracy_002","resultText":"你选择“接下委托，但保留自己的条件”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_accept","effects":{"values":{"trust":2,"danger":3,"artResonance":3},"setFlags":["contract_with_boundary"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"conspiracy_pressure","text":"逼她说出真正目标","nextSceneId":"ring_conspiracy_002","resultText":"你选择“逼她说出真正目标”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_pressure","effects":{"values":{"affectionAlbina":1,"danger":4,"artResonance":2},"setFlags":["pressed_true_goal"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_002","chapter":2,"route":"ring_conspiracy","locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.95}],"speaker":"阿尔比娜","text":"她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","voiceAssetId":"voice.scene.ring_conspiracy_002","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_escape_to_backstreets","text":"带着未签名委托冲出画廊","nextSceneId":"ring_conspiracy_003","resultText":"你选择“带着未签名委托冲出画廊”。环指代理人：追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","resultVoiceAssetId":"voice.result.conspiracy_escape_to_backstreets","effects":{"values":{"trust":2,"danger":3,"artResonance":2},"setFlags":["ring_escape_committed"],"unlockCg":["cg.backstreet_pursuit"]}},{"id":"return_opening_from_ring","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_ring","effects":{"values":{"trust":1,"danger":-1},"setFlags":["conspiracy_looped"]}}]},{"version":2,"id":"ring_conspiracy_003","chapter":3,"route":"ring_conspiracy","locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_3","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_3","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","voiceAssetId":"voice.scene.ring_conspiracy_003","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_break_pursuit_frame","text":"打碎追兵布下的取景框","nextSceneId":"ring_conspiracy_004","resultText":"你选择“打碎追兵布下的取景框”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_break_pursuit_frame","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["pursuit_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_feed_false_signature","text":"交出伪造签名引开视线","nextSceneId":"ring_conspiracy_004","resultText":"你选择“交出伪造签名引开视线”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_feed_false_signature","effects":{"values":{"trust":2,"danger":-1,"artResonance":4},"setFlags":["false_signature_planted"],"unlockCg":["cg.ren_interruption"]}}]},{"version":2,"id":"ring_conspiracy_004","chapter":4,"route":"ring_conspiracy","locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","voiceAssetId":"voice.scene.ring_conspiracy_004","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"ring_conspiracy_route_complete","text":"记录环指共谋路线的暂定结局","nextSceneId":"ring_conspiracy_005","resultText":"你选择“记录环指共谋路线的暂定结局”。卡利斯托：卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-2,"artResonance":3},"setFlags":["ring_conspiracy_route_complete"],"unlockCg":["cg.ring_conspiracy_ending"]}}]},{"version":2,"id":"ring_conspiracy_005","chapter":5,"route":"ring_conspiracy","locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_5","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_5","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","voiceAssetId":"voice.scene.ring_conspiracy_005","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_005_refuse_duo","text":"当众拒绝成为合作展品","nextSceneId":"ring_conspiracy_006","resultText":"你选择“当众拒绝成为合作展品”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_refuse_duo","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["duo_exhibit_refused"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_005_let_her_answer","text":"不替她回答，让阿尔比娜开口","nextSceneId":"ring_conspiracy_006","resultText":"你选择“不替她回答，让阿尔比娜开口”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_let_her_answer","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["albina_answered_herself"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_006","chapter":6,"route":"ring_conspiracy","locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","voiceAssetId":"voice.scene.ring_conspiracy_006","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_006_stand_with_her","text":"站到她身侧，分担凝视","nextSceneId":"ring_conspiracy_007","resultText":"你选择“站到她身侧，分担凝视”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_stand_with_her","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":1,"artResonance":3},"setFlags":["gaze_shared"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_006_block_view","text":"挡在她和委托人之间","nextSceneId":"ring_conspiracy_007","resultText":"你选择“挡在她和委托人之间”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_block_view","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":3,"artResonance":2},"setFlags":["view_blocked"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_007","chapter":7,"route":"ring_conspiracy","locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","voiceAssetId":"voice.scene.ring_conspiracy_007","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_007_break_frame","text":"冲破画框","nextSceneId":"ring_conspiracy_008","resultText":"你选择“冲破画框”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_break_frame","effects":{"values":{"trust":3,"danger":3,"artResonance":3},"setFlags":["street_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_007_seize_frame","text":"把画框抢过来，反过来框住他","nextSceneId":"ring_conspiracy_008","resultText":"你选择“把画框抢过来，反过来框住他”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_seize_frame","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["frame_seized"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_008","chapter":8,"route":"ring_conspiracy","locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_8","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_8","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","voiceAssetId":"voice.scene.ring_conspiracy_008","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_008_refuse_testimony","text":"当面拒绝用她换取证词","nextSceneId":"ring_conspiracy_009","resultText":"你选择“当面拒绝用她换取证词”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_refuse_testimony","effects":{"values":{"affectionAlbina":2,"trust":5,"danger":2,"artResonance":2},"setFlags":["testimony_refused"],"unlockCg":["cg.lce_raid"]}},{"id":"conspiracy_008_hand_pen_to_her","text":"把笔交还给她，由她自己决定","nextSceneId":"ring_conspiracy_009","resultText":"你选择“把笔交还给她，由她自己决定”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_hand_pen_to_her","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pen_returned_to_albina"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_009","chapter":9,"route":"ring_conspiracy","locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","voiceAssetId":"voice.scene.ring_conspiracy_009","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_009_choose_present","text":"选现在的她，不挑那个环指版","nextSceneId":"ring_conspiracy_010","resultText":"你选择“选现在的她，不挑那个环指版”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_choose_present","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["present_albina_chosen"],"unlockCg":["cg.art_resonance"]}},{"id":"conspiracy_009_refuse_choice","text":"拒绝回答，让她自己挑镜子","nextSceneId":"ring_conspiracy_010","resultText":"你选择“拒绝回答，让她自己挑镜子”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_refuse_choice","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["mirror_choice_returned"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_010","chapter":10,"route":"ring_conspiracy","locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"卡利斯托","text":"卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","voiceAssetId":"voice.scene.ring_conspiracy_010","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_010_throw_badge","text":"把徽章扔回卡利斯托脸上","nextSceneId":"ring_conspiracy_011","resultText":"你选择“把徽章扔回卡利斯托脸上”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_throw_badge","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":3,"artResonance":2},"setFlags":["badge_thrown"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_010_keep_badge_unworn","text":"收下徽章，但谁都不许戴","nextSceneId":"ring_conspiracy_011","resultText":"你选择“收下徽章，但谁都不许戴”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_keep_badge_unworn","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":1,"artResonance":4},"setFlags":["badge_kept_unworn"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_011","chapter":11,"route":"ring_conspiracy","locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_11","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_11","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","voiceAssetId":"voice.scene.ring_conspiracy_011","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_011_rewrite_ending","text":"当众改写结局，让他们措手不及","nextSceneId":"ring_conspiracy_012","resultText":"你选择“当众改写结局，让他们措手不及”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_rewrite_ending","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["ending_rewritten"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_011_burn_film","text":"直接烧掉胶片，让剧本作废","nextSceneId":"ring_conspiracy_012","resultText":"你选择“直接烧掉胶片，让剧本作废”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_burn_film","effects":{"values":{"trust":3,"danger":4,"artResonance":3},"setFlags":["film_burned"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_012","chapter":12,"route":"ring_conspiracy","locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","voiceAssetId":"voice.scene.ring_conspiracy_012","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_012_end_tonight","text":"选择结束今晚的共谋","nextSceneId":"ring_conspiracy_013","resultText":"你选择“选择结束今晚的共谋”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_end_tonight","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":-2,"artResonance":3},"setFlags":["night_ended"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_012_keep_blade","text":"收下画刀，留给未来必要时再用","nextSceneId":"ring_conspiracy_013","resultText":"你选择“收下画刀，留给未来必要时再用”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_keep_blade","effects":{"values":{"affectionAlbina":1,"trust":4,"danger":1,"artResonance":4},"setFlags":["blade_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_013","chapter":13,"route":"ring_conspiracy","locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","voiceAssetId":"voice.scene.ring_conspiracy_013","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"conspiracy_013_hold_one_second","text":"认真握住那一秒，不多不少","nextSceneId":"ring_conspiracy_014","resultText":"你选择“认真握住那一秒，不多不少”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_hold_one_second","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["one_second_held"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"conspiracy_013_return_gently","text":"提前把它轻轻送回，不占有","nextSceneId":"ring_conspiracy_014","resultText":"你选择“提前把它轻轻送回，不占有”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_return_gently","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":4},"setFlags":["heartbeat_returned_early"],"unlockCg":["cg.rain_reflection"]}}]},{"version":2,"id":"ring_conspiracy_014","chapter":14,"route":"ring_conspiracy","locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","voiceAssetId":"voice.scene.ring_conspiracy_014","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_014_erase_from_catalog","text":"选择从环指目录里彻底抹去","nextSceneId":"ring_conspiracy_015","resultText":"你选择“选择从环指目录里彻底抹去”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_erase_from_catalog","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-2,"artResonance":3},"setFlags":["catalog_erased"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_014_keep_one_line","text":"只保留一行不被署名的记录","nextSceneId":"ring_conspiracy_015","resultText":"你选择“只保留一行不被署名的记录”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_keep_one_line","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["anonymous_line_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_015","chapter":15,"route":"ring_conspiracy","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_15","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","voiceAssetId":"voice.scene.ring_conspiracy_015","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_route_final","text":"为环指共谋路线合上最后一卷胶片","nextSceneId":"ring_conspiracy_ending_gate","resultText":"你选择“为环指共谋路线合上最后一卷胶片”。环指共谋路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["ring_conspiracy_route_final"]}}]},{"version":2,"id":"ring_conspiracy_ending_gate","chapter":16,"route":"ring_conspiracy","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"环指共谋的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.ring_conspiracy_ending_gate","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"ring_conspiracy_ending_true","resultText":"结局判定完成：环指共谋·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.true_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]},"effects":{"setFlags":["ending_ring_conspiracy_true_qualified"]}},{"id":"ring_conspiracy_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"ring_conspiracy_ending_normal","resultText":"结局判定完成：环指共谋·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_ring_conspiracy_normal_qualified"]}},{"id":"ring_conspiracy_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"ring_conspiracy_ending_bad","resultText":"结局判定完成：环指共谋·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]},"effects":{"setFlags":["ending_ring_conspiracy_bad_qualified"]}}]},{"version":2,"id":"ring_conspiracy_ending_true","chapter":17,"route":"ring_conspiracy","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_true","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"环指的目录里只剩一页无法归档的空白。阿尔比娜以自己的名字向你发出下一次邀请；你们不再是展品或棋子，而是彼此承认的共谋者。","voiceAssetId":"voice.scene.ring_conspiracy_ending_true","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]}}},{"version":2,"id":"ring_conspiracy_ending_normal","chapter":17,"route":"ring_conspiracy","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_normal","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"你们离开了画廊，也留下了一条匿名记录作为制衡。危险没有消失，但契约已被改写；阿尔比娜把下一次会面留给更安全的夜晚。","voiceAssetId":"voice.scene.ring_conspiracy_ending_normal","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"ring_conspiracy_ending_bad","chapter":17,"route":"ring_conspiracy","locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_bad","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"追击停止时，代价已经写进彼此的沉默。你们逃出了装裱，却没能保住共同节奏；阿尔比娜独自带走那柄无锋画刀，没有约定再见。","voiceAssetId":"voice.scene.ring_conspiracy_ending_bad","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]}}}]'), C_ = {
  version: A_,
  projectId: O_,
  initialSceneId: x_,
  routeEntrySceneIds: S_,
  scenes: N_
};
var td;
function y(e, t, i) {
  function a(r, c) {
    if (r._zod || Object.defineProperty(r, "_zod", {
      value: {
        def: c,
        constr: o,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), r._zod.traits.has(e))
      return;
    r._zod.traits.add(e), t(r, c);
    const d = o.prototype, l = Object.keys(d);
    for (let u = 0; u < l.length; u++) {
      const p = l[u];
      p in r || (r[p] = d[p].bind(r));
    }
  }
  const n = i?.Parent ?? Object;
  class s extends n {
  }
  Object.defineProperty(s, "name", { value: e });
  function o(r) {
    var c;
    const d = i?.Parent ? new s() : this;
    a(d, r), (c = d._zod).deferred ?? (c.deferred = []);
    for (const l of d._zod.deferred)
      l();
    return d;
  }
  return Object.defineProperty(o, "init", { value: a }), Object.defineProperty(o, Symbol.hasInstance, {
    value: (r) => i?.Parent && r instanceof i.Parent ? !0 : r?._zod?.traits?.has(e)
  }), Object.defineProperty(o, "name", { value: e }), o;
}
class Bi extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Bl extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
(td = globalThis).__zod_globalConfig ?? (td.__zod_globalConfig = {});
const Bo = globalThis.__zod_globalConfig;
function Zt(e) {
  return Bo;
}
function Zl(e) {
  const t = Object.values(e).filter((a) => typeof a == "number");
  return Object.entries(e).filter(([a, n]) => t.indexOf(+a) === -1).map(([a, n]) => n);
}
function no(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function as(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Zo(e) {
  return e == null;
}
function Ho(e) {
  const t = e.startsWith("^") ? 1 : 0, i = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, i);
}
function D_(e, t) {
  const i = e / t, a = Math.round(i), n = Number.EPSILON * Math.max(Math.abs(i), 1);
  return Math.abs(i - a) < n ? 0 : i - a;
}
const id = /* @__PURE__ */ Symbol("evaluating");
function fe(e, t, i) {
  let a;
  Object.defineProperty(e, t, {
    get() {
      if (a !== id)
        return a === void 0 && (a = id, a = i()), a;
    },
    set(n) {
      Object.defineProperty(e, t, {
        value: n
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Ti(e, t, i) {
  Object.defineProperty(e, t, {
    value: i,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function ai(...e) {
  const t = {};
  for (const i of e) {
    const a = Object.getOwnPropertyDescriptors(i);
    Object.assign(t, a);
  }
  return Object.defineProperties({}, t);
}
function ad(e) {
  return JSON.stringify(e);
}
function V_(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Hl = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Na(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const R_ = /* @__PURE__ */ as(() => {
  if (Bo.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function Gi(e) {
  if (Na(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const i = t.prototype;
  return !(Na(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function Kl(e) {
  return Gi(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const P_ = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function Ji(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ni(e, t, i) {
  const a = new e._zod.constr(t ?? e._zod.def);
  return (!t || i?.parent) && (a._zod.parent = e), a;
}
function Z(e) {
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
function $_(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const j_ = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function F_(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const s = ai(e._zod.def, {
    get shape() {
      const o = {};
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && (o[r] = i.shape[r]);
      }
      return Ti(this, "shape", o), o;
    },
    checks: []
  });
  return ni(e, s);
}
function z_(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const s = ai(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape };
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && delete o[r];
      }
      return Ti(this, "shape", o), o;
    },
    checks: []
  });
  return ni(e, s);
}
function U_(e, t) {
  if (!Gi(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const i = e._zod.def.checks;
  if (i && i.length > 0) {
    const s = e._zod.def.shape;
    for (const o in t)
      if (Object.getOwnPropertyDescriptor(s, o) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const n = ai(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape, ...t };
      return Ti(this, "shape", s), s;
    }
  });
  return ni(e, n);
}
function L_(e, t) {
  if (!Gi(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const i = ai(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t };
      return Ti(this, "shape", a), a;
    }
  });
  return ni(e, i);
}
function M_(e, t) {
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const i = ai(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t._zod.def.shape };
      return Ti(this, "shape", a), a;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return ni(e, i);
}
function B_(e, t, i) {
  const n = t._zod.def.checks;
  if (n && n.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const o = ai(t._zod.def, {
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
      return Ti(this, "shape", c), c;
    },
    checks: []
  });
  return ni(t, o);
}
function Z_(e, t, i) {
  const a = ai(t._zod.def, {
    get shape() {
      const n = t._zod.def.shape, s = { ...n };
      if (i)
        for (const o in i) {
          if (!(o in s))
            throw new Error(`Unrecognized key: "${o}"`);
          i[o] && (s[o] = new e({
            type: "nonoptional",
            innerType: n[o]
          }));
        }
      else
        for (const o in n)
          s[o] = new e({
            type: "nonoptional",
            innerType: n[o]
          });
      return Ti(this, "shape", s), s;
    }
  });
  return ni(t, a);
}
function ji(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue !== !0)
      return !0;
  return !1;
}
function H_(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue === !1)
      return !0;
  return !1;
}
function Fi(e, t) {
  return t.map((i) => {
    var a;
    return (a = i).path ?? (a.path = []), i.path.unshift(e), i;
  });
}
function Ja(e) {
  return typeof e == "string" ? e : e?.message;
}
function Ht(e, t, i) {
  const a = e.message ? e.message : Ja(e.inst?._zod.def?.error?.(e)) ?? Ja(t?.error?.(e)) ?? Ja(i.customError?.(e)) ?? Ja(i.localeError?.(e)) ?? "Invalid input", { inst: n, continue: s, input: o, ...r } = e;
  return r.path ?? (r.path = []), r.message = a, t?.reportInput && (r.input = o), r;
}
function Ko(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Ca(...e) {
  const [t, i, a] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: i,
    inst: a
  } : { ...t };
}
const Wl = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, no, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, ql = y("$ZodError", Wl), Gl = y("$ZodError", Wl, { Parent: Error });
function K_(e, t = (i) => i.message) {
  const i = {}, a = [];
  for (const n of e.issues)
    n.path.length > 0 ? (i[n.path[0]] = i[n.path[0]] || [], i[n.path[0]].push(t(n))) : a.push(t(n));
  return { formErrors: a, fieldErrors: i };
}
function W_(e, t = (i) => i.message) {
  const i = { _errors: [] }, a = (n, s = []) => {
    for (const o of n.issues)
      if (o.code === "invalid_union" && o.errors.length)
        o.errors.map((r) => a({ issues: r }, [...s, ...o.path]));
      else if (o.code === "invalid_key")
        a({ issues: o.issues }, [...s, ...o.path]);
      else if (o.code === "invalid_element")
        a({ issues: o.issues }, [...s, ...o.path]);
      else {
        const r = [...s, ...o.path];
        if (r.length === 0)
          i._errors.push(t(o));
        else {
          let c = i, d = 0;
          for (; d < r.length; ) {
            const l = r[d];
            d === r.length - 1 ? (c[l] = c[l] || { _errors: [] }, c[l]._errors.push(t(o))) : c[l] = c[l] || { _errors: [] }, c = c[l], d++;
          }
        }
      }
  };
  return a(e), i;
}
const Wo = (e) => (t, i, a, n) => {
  const s = a ? { ...a, async: !1 } : { async: !1 }, o = t._zod.run({ value: i, issues: [] }, s);
  if (o instanceof Promise)
    throw new Bi();
  if (o.issues.length) {
    const r = new (n?.Err ?? e)(o.issues.map((c) => Ht(c, s, Zt())));
    throw Hl(r, n?.callee), r;
  }
  return o.value;
}, qo = (e) => async (t, i, a, n) => {
  const s = a ? { ...a, async: !0 } : { async: !0 };
  let o = t._zod.run({ value: i, issues: [] }, s);
  if (o instanceof Promise && (o = await o), o.issues.length) {
    const r = new (n?.Err ?? e)(o.issues.map((c) => Ht(c, s, Zt())));
    throw Hl(r, n?.callee), r;
  }
  return o.value;
}, ns = (e) => (t, i, a) => {
  const n = a ? { ...a, async: !1 } : { async: !1 }, s = t._zod.run({ value: i, issues: [] }, n);
  if (s instanceof Promise)
    throw new Bi();
  return s.issues.length ? {
    success: !1,
    error: new (e ?? ql)(s.issues.map((o) => Ht(o, n, Zt())))
  } : { success: !0, data: s.value };
}, q_ = /* @__PURE__ */ ns(Gl), ss = (e) => async (t, i, a) => {
  const n = a ? { ...a, async: !0 } : { async: !0 };
  let s = t._zod.run({ value: i, issues: [] }, n);
  return s instanceof Promise && (s = await s), s.issues.length ? {
    success: !1,
    error: new e(s.issues.map((o) => Ht(o, n, Zt())))
  } : { success: !0, data: s.value };
}, G_ = /* @__PURE__ */ ss(Gl), J_ = (e) => (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return Wo(e)(t, i, n);
}, Y_ = (e) => (t, i, a) => Wo(e)(t, i, a), X_ = (e) => async (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return qo(e)(t, i, n);
}, Q_ = (e) => async (t, i, a) => qo(e)(t, i, a), e0 = (e) => (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return ns(e)(t, i, n);
}, t0 = (e) => (t, i, a) => ns(e)(t, i, a), i0 = (e) => async (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return ss(e)(t, i, n);
}, a0 = (e) => async (t, i, a) => ss(e)(t, i, a), n0 = /^[cC][0-9a-z]{6,}$/, s0 = /^[0-9a-z]+$/, o0 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, r0 = /^[0-9a-vA-V]{20}$/, c0 = /^[A-Za-z0-9]{27}$/, d0 = /^[a-zA-Z0-9_-]{21}$/, u0 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, l0 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, nd = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, f0 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, p0 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function g0() {
  return new RegExp(p0, "u");
}
const m0 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, b0 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, h0 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, _0 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, v0 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Jl = /^[A-Za-z0-9_-]*$/, y0 = /^https?$/, k0 = /^\+[1-9]\d{6,14}$/, Yl = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", w0 = /* @__PURE__ */ new RegExp(`^${Yl}$`);
function Xl(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function E0(e) {
  return new RegExp(`^${Xl(e)}$`);
}
function I0(e) {
  const t = Xl({ precision: e.precision }), i = ["Z"];
  e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const a = `${t}(?:${i.join("|")})`;
  return new RegExp(`^${Yl}T(?:${a})$`);
}
const T0 = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, A0 = /^-?\d+$/, Ql = /^-?\d+(?:\.\d+)?$/, O0 = /^(?:true|false)$/i, x0 = /^[^A-Z]*$/, S0 = /^[^a-z]*$/, it = /* @__PURE__ */ y("$ZodCheck", (e, t) => {
  var i;
  e._zod ?? (e._zod = {}), e._zod.def = t, (i = e._zod).onattach ?? (i.onattach = []);
}), ef = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, tf = /* @__PURE__ */ y("$ZodCheckLessThan", (e, t) => {
  it.init(e, t);
  const i = ef[typeof t.value];
  e._zod.onattach.push((a) => {
    const n = a._zod.bag, s = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < s && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
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
}), af = /* @__PURE__ */ y("$ZodCheckGreaterThan", (e, t) => {
  it.init(e, t);
  const i = ef[typeof t.value];
  e._zod.onattach.push((a) => {
    const n = a._zod.bag, s = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > s && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
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
}), N0 = /* @__PURE__ */ y("$ZodCheckMultipleOf", (e, t) => {
  it.init(e, t), e._zod.onattach.push((i) => {
    var a;
    (a = i._zod.bag).multipleOf ?? (a.multipleOf = t.value);
  }), e._zod.check = (i) => {
    if (typeof i.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : D_(i.value, t.value) === 0) || i.issues.push({
      origin: typeof i.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), C0 = /* @__PURE__ */ y("$ZodCheckNumberFormat", (e, t) => {
  it.init(e, t), t.format = t.format || "float64";
  const i = t.format?.includes("int"), a = i ? "int" : "number", [n, s] = j_[t.format];
  e._zod.onattach.push((o) => {
    const r = o._zod.bag;
    r.format = t.format, r.minimum = n, r.maximum = s, i && (r.pattern = A0);
  }), e._zod.check = (o) => {
    const r = o.value;
    if (i) {
      if (!Number.isInteger(r)) {
        o.issues.push({
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
        r > 0 ? o.issues.push({
          input: r,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: a,
          inclusive: !0,
          continue: !t.abort
        }) : o.issues.push({
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
    r < n && o.issues.push({
      origin: "number",
      input: r,
      code: "too_small",
      minimum: n,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), r > s && o.issues.push({
      origin: "number",
      input: r,
      code: "too_big",
      maximum: s,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), D0 = /* @__PURE__ */ y("$ZodCheckMaxLength", (e, t) => {
  var i;
  it.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const n = a.value;
    return !Zo(n) && n.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const n = a._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < n && (a._zod.bag.maximum = t.maximum);
  }), e._zod.check = (a) => {
    const n = a.value;
    if (n.length <= t.maximum)
      return;
    const o = Ko(n);
    a.issues.push({
      origin: o,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: n,
      inst: e,
      continue: !t.abort
    });
  };
}), V0 = /* @__PURE__ */ y("$ZodCheckMinLength", (e, t) => {
  var i;
  it.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const n = a.value;
    return !Zo(n) && n.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const n = a._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > n && (a._zod.bag.minimum = t.minimum);
  }), e._zod.check = (a) => {
    const n = a.value;
    if (n.length >= t.minimum)
      return;
    const o = Ko(n);
    a.issues.push({
      origin: o,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: n,
      inst: e,
      continue: !t.abort
    });
  };
}), R0 = /* @__PURE__ */ y("$ZodCheckLengthEquals", (e, t) => {
  var i;
  it.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const n = a.value;
    return !Zo(n) && n.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const n = a._zod.bag;
    n.minimum = t.length, n.maximum = t.length, n.length = t.length;
  }), e._zod.check = (a) => {
    const n = a.value, s = n.length;
    if (s === t.length)
      return;
    const o = Ko(n), r = s > t.length;
    a.issues.push({
      origin: o,
      ...r ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: a.value,
      inst: e,
      continue: !t.abort
    });
  };
}), os = /* @__PURE__ */ y("$ZodCheckStringFormat", (e, t) => {
  var i, a;
  it.init(e, t), e._zod.onattach.push((n) => {
    const s = n._zod.bag;
    s.format = t.format, t.pattern && (s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(t.pattern));
  }), t.pattern ? (i = e._zod).check ?? (i.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: n.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (a = e._zod).check ?? (a.check = () => {
  });
}), P0 = /* @__PURE__ */ y("$ZodCheckRegex", (e, t) => {
  os.init(e, t), e._zod.check = (i) => {
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
}), $0 = /* @__PURE__ */ y("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = x0), os.init(e, t);
}), j0 = /* @__PURE__ */ y("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = S0), os.init(e, t);
}), F0 = /* @__PURE__ */ y("$ZodCheckIncludes", (e, t) => {
  it.init(e, t);
  const i = Ji(t.includes), a = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${i}` : i);
  t.pattern = a, e._zod.onattach.push((n) => {
    const s = n._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(a);
  }), e._zod.check = (n) => {
    n.value.includes(t.includes, t.position) || n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), z0 = /* @__PURE__ */ y("$ZodCheckStartsWith", (e, t) => {
  it.init(e, t);
  const i = new RegExp(`^${Ji(t.prefix)}.*`);
  t.pattern ?? (t.pattern = i), e._zod.onattach.push((a) => {
    const n = a._zod.bag;
    n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(i);
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
}), U0 = /* @__PURE__ */ y("$ZodCheckEndsWith", (e, t) => {
  it.init(e, t);
  const i = new RegExp(`.*${Ji(t.suffix)}$`);
  t.pattern ?? (t.pattern = i), e._zod.onattach.push((a) => {
    const n = a._zod.bag;
    n.patterns ?? (n.patterns = /* @__PURE__ */ new Set()), n.patterns.add(i);
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
}), L0 = /* @__PURE__ */ y("$ZodCheckOverwrite", (e, t) => {
  it.init(e, t), e._zod.check = (i) => {
    i.value = t.tx(i.value);
  };
});
class M0 {
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
`).filter((o) => o), n = Math.min(...a.map((o) => o.length - o.trimStart().length)), s = a.map((o) => o.slice(n)).map((o) => " ".repeat(this.indent * 2) + o);
    for (const o of s)
      this.content.push(o);
  }
  compile() {
    const t = Function, i = this?.args, n = [...(this?.content ?? [""]).map((s) => `  ${s}`)];
    return new t(...i, n.join(`
`));
  }
}
const B0 = {
  major: 4,
  minor: 4,
  patch: 3
}, ke = /* @__PURE__ */ y("$ZodType", (e, t) => {
  var i;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B0;
  const a = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && a.unshift(e);
  for (const n of a)
    for (const s of n._zod.onattach)
      s(e);
  if (a.length === 0)
    (i = e._zod).deferred ?? (i.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const n = (o, r, c) => {
      let d = ji(o), l;
      for (const u of r) {
        if (u._zod.def.when) {
          if (H_(o) || !u._zod.def.when(o))
            continue;
        } else if (d)
          continue;
        const p = o.issues.length, g = u._zod.check(o);
        if (g instanceof Promise && c?.async === !1)
          throw new Bi();
        if (l || g instanceof Promise)
          l = (l ?? Promise.resolve()).then(async () => {
            await g, o.issues.length !== p && (d || (d = ji(o, p)));
          });
        else {
          if (o.issues.length === p)
            continue;
          d || (d = ji(o, p));
        }
      }
      return l ? l.then(() => o) : o;
    }, s = (o, r, c) => {
      if (ji(o))
        return o.aborted = !0, o;
      const d = n(r, a, c);
      if (d instanceof Promise) {
        if (c.async === !1)
          throw new Bi();
        return d.then((l) => e._zod.parse(l, c));
      }
      return e._zod.parse(d, c);
    };
    e._zod.run = (o, r) => {
      if (r.skipChecks)
        return e._zod.parse(o, r);
      if (r.direction === "backward") {
        const d = e._zod.parse({ value: o.value, issues: [] }, { ...r, skipChecks: !0 });
        return d instanceof Promise ? d.then((l) => s(l, o, r)) : s(d, o, r);
      }
      const c = e._zod.parse(o, r);
      if (c instanceof Promise) {
        if (r.async === !1)
          throw new Bi();
        return c.then((d) => n(d, a, r));
      }
      return n(c, a, r);
    };
  }
  fe(e, "~standard", () => ({
    validate: (n) => {
      try {
        const s = q_(e, n);
        return s.success ? { value: s.data } : { issues: s.error?.issues };
      } catch {
        return G_(e, n).then((o) => o.success ? { value: o.data } : { issues: o.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Go = /* @__PURE__ */ y("$ZodString", (e, t) => {
  ke.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? T0(e._zod.bag), e._zod.parse = (i, a) => {
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
}), ye = /* @__PURE__ */ y("$ZodStringFormat", (e, t) => {
  os.init(e, t), Go.init(e, t);
}), Z0 = /* @__PURE__ */ y("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = l0), ye.init(e, t);
}), H0 = /* @__PURE__ */ y("$ZodUUID", (e, t) => {
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
    t.pattern ?? (t.pattern = nd(a));
  } else
    t.pattern ?? (t.pattern = nd());
  ye.init(e, t);
}), K0 = /* @__PURE__ */ y("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = f0), ye.init(e, t);
}), W0 = /* @__PURE__ */ y("$ZodURL", (e, t) => {
  ye.init(e, t), e._zod.check = (i) => {
    try {
      const a = i.value.trim();
      if (!t.normalize && t.protocol?.source === y0.source && !/^https?:\/\//i.test(a)) {
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
      const n = new URL(a);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(n.hostname) || i.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: i.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(n.protocol.endsWith(":") ? n.protocol.slice(0, -1) : n.protocol) || i.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: i.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? i.value = n.href : i.value = a;
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
}), q0 = /* @__PURE__ */ y("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = g0()), ye.init(e, t);
}), G0 = /* @__PURE__ */ y("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = d0), ye.init(e, t);
}), J0 = /* @__PURE__ */ y("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = n0), ye.init(e, t);
}), Y0 = /* @__PURE__ */ y("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = s0), ye.init(e, t);
}), X0 = /* @__PURE__ */ y("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = o0), ye.init(e, t);
}), Q0 = /* @__PURE__ */ y("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = r0), ye.init(e, t);
}), e2 = /* @__PURE__ */ y("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = c0), ye.init(e, t);
}), t2 = /* @__PURE__ */ y("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = I0(t)), ye.init(e, t);
}), i2 = /* @__PURE__ */ y("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = w0), ye.init(e, t);
}), a2 = /* @__PURE__ */ y("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = E0(t)), ye.init(e, t);
}), n2 = /* @__PURE__ */ y("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = u0), ye.init(e, t);
}), s2 = /* @__PURE__ */ y("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = m0), ye.init(e, t), e._zod.bag.format = "ipv4";
}), o2 = /* @__PURE__ */ y("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = b0), ye.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (i) => {
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
}), r2 = /* @__PURE__ */ y("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = h0), ye.init(e, t);
}), c2 = /* @__PURE__ */ y("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = _0), ye.init(e, t), e._zod.check = (i) => {
    const a = i.value.split("/");
    try {
      if (a.length !== 2)
        throw new Error();
      const [n, s] = a;
      if (!s)
        throw new Error();
      const o = Number(s);
      if (`${o}` !== s)
        throw new Error();
      if (o < 0 || o > 128)
        throw new Error();
      new URL(`http://[${n}]`);
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
function nf(e) {
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
const d2 = /* @__PURE__ */ y("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = v0), ye.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (i) => {
    nf(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function u2(e) {
  if (!Jl.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (a) => a === "-" ? "+" : "/"), i = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return nf(i);
}
const l2 = /* @__PURE__ */ y("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = Jl), ye.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (i) => {
    u2(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), f2 = /* @__PURE__ */ y("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = k0), ye.init(e, t);
});
function p2(e, t = null) {
  try {
    const i = e.split(".");
    if (i.length !== 3)
      return !1;
    const [a] = i;
    if (!a)
      return !1;
    const n = JSON.parse(atob(a));
    return !("typ" in n && n?.typ !== "JWT" || !n.alg || t && (!("alg" in n) || n.alg !== t));
  } catch {
    return !1;
  }
}
const g2 = /* @__PURE__ */ y("$ZodJWT", (e, t) => {
  ye.init(e, t), e._zod.check = (i) => {
    p2(i.value, t.alg) || i.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), sf = /* @__PURE__ */ y("$ZodNumber", (e, t) => {
  ke.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Ql, e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = Number(i.value);
      } catch {
      }
    const n = i.value;
    if (typeof n == "number" && !Number.isNaN(n) && Number.isFinite(n))
      return i;
    const s = typeof n == "number" ? Number.isNaN(n) ? "NaN" : Number.isFinite(n) ? void 0 : "Infinity" : void 0;
    return i.issues.push({
      expected: "number",
      code: "invalid_type",
      input: n,
      inst: e,
      ...s ? { received: s } : {}
    }), i;
  };
}), m2 = /* @__PURE__ */ y("$ZodNumberFormat", (e, t) => {
  C0.init(e, t), sf.init(e, t);
}), b2 = /* @__PURE__ */ y("$ZodBoolean", (e, t) => {
  ke.init(e, t), e._zod.pattern = O0, e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = !!i.value;
      } catch {
      }
    const n = i.value;
    return typeof n == "boolean" || i.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: n,
      inst: e
    }), i;
  };
}), h2 = /* @__PURE__ */ y("$ZodUnknown", (e, t) => {
  ke.init(e, t), e._zod.parse = (i) => i;
}), _2 = /* @__PURE__ */ y("$ZodNever", (e, t) => {
  ke.init(e, t), e._zod.parse = (i, a) => (i.issues.push({
    expected: "never",
    code: "invalid_type",
    input: i.value,
    inst: e
  }), i);
});
function sd(e, t, i) {
  e.issues.length && t.issues.push(...Fi(i, e.issues)), t.value[i] = e.value;
}
const v2 = /* @__PURE__ */ y("$ZodArray", (e, t) => {
  ke.init(e, t), e._zod.parse = (i, a) => {
    const n = i.value;
    if (!Array.isArray(n))
      return i.issues.push({
        expected: "array",
        code: "invalid_type",
        input: n,
        inst: e
      }), i;
    i.value = Array(n.length);
    const s = [];
    for (let o = 0; o < n.length; o++) {
      const r = n[o], c = t.element._zod.run({
        value: r,
        issues: []
      }, a);
      c instanceof Promise ? s.push(c.then((d) => sd(d, i, o))) : sd(c, i, o);
    }
    return s.length ? Promise.all(s).then(() => i) : i;
  };
});
function Rn(e, t, i, a, n, s) {
  const o = i in a;
  if (e.issues.length) {
    if (n && s && !o)
      return;
    t.issues.push(...Fi(i, e.issues));
  }
  if (!o && !n) {
    e.issues.length || t.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: void 0,
      path: [i]
    });
    return;
  }
  e.value === void 0 ? o && (t.value[i] = void 0) : t.value[i] = e.value;
}
function of(e) {
  const t = Object.keys(e.shape);
  for (const a of t)
    if (!e.shape?.[a]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const i = $_(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(i)
  };
}
function rf(e, t, i, a, n, s) {
  const o = [], r = n.keySet, c = n.catchall._zod, d = c.def.type, l = c.optin === "optional", u = c.optout === "optional";
  for (const p in t) {
    if (p === "__proto__" || r.has(p))
      continue;
    if (d === "never") {
      o.push(p);
      continue;
    }
    const g = c.run({ value: t[p], issues: [] }, a);
    g instanceof Promise ? e.push(g.then((b) => Rn(b, i, p, t, l, u))) : Rn(g, i, p, t, l, u);
  }
  return o.length && i.issues.push({
    code: "unrecognized_keys",
    keys: o,
    input: t,
    inst: s
  }), e.length ? Promise.all(e).then(() => i) : i;
}
const y2 = /* @__PURE__ */ y("$ZodObject", (e, t) => {
  if (ke.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
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
  const a = as(() => of(t));
  fe(e._zod, "propValues", () => {
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
  const n = Na, s = t.catchall;
  let o;
  e._zod.parse = (r, c) => {
    o ?? (o = a.value);
    const d = r.value;
    if (!n(d))
      return r.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: e
      }), r;
    r.value = {};
    const l = [], u = o.shape;
    for (const p of o.keys) {
      const g = u[p], b = g._zod.optin === "optional", w = g._zod.optout === "optional", E = g._zod.run({ value: d[p], issues: [] }, c);
      E instanceof Promise ? l.push(E.then((A) => Rn(A, r, p, d, b, w))) : Rn(E, r, p, d, b, w);
    }
    return s ? rf(l, d, r, c, a.value, e) : l.length ? Promise.all(l).then(() => r) : r;
  };
}), k2 = /* @__PURE__ */ y("$ZodObjectJIT", (e, t) => {
  y2.init(e, t);
  const i = e._zod.parse, a = as(() => of(t)), n = (p) => {
    const g = new M0(["shape", "payload", "ctx"]), b = a.value, w = (R) => {
      const H = ad(R);
      return `shape[${H}]._zod.run({ value: input[${H}], issues: [] }, ctx)`;
    };
    g.write("const input = payload.value;");
    const E = /* @__PURE__ */ Object.create(null);
    let A = 0;
    for (const R of b.keys)
      E[R] = `key_${A++}`;
    g.write("const newResult = {};");
    for (const R of b.keys) {
      const H = E[R], N = ad(R), ee = p[R], B = ee?._zod?.optin === "optional", le = ee?._zod?.optout === "optional";
      g.write(`const ${H} = ${w(R)};`), B && le ? g.write(`
        if (${H}.issues.length) {
          if (${N} in input) {
            payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${N}, ...iss.path] : [${N}]
            })));
          }
        }

        if (${H}.value === undefined) {
          if (${N} in input) {
            newResult[${N}] = undefined;
          }
        } else {
          newResult[${N}] = ${H}.value;
        }

      `) : B ? g.write(`
        if (${H}.issues.length) {
          payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${N}, ...iss.path] : [${N}]
          })));
        }

        if (${H}.value === undefined) {
          if (${N} in input) {
            newResult[${N}] = undefined;
          }
        } else {
          newResult[${N}] = ${H}.value;
        }

      `) : g.write(`
        const ${H}_present = ${N} in input;
        if (${H}.issues.length) {
          payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${N}, ...iss.path] : [${N}]
          })));
        }
        if (!${H}_present && !${H}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${N}]
          });
        }

        if (${H}_present) {
          if (${H}.value === undefined) {
            newResult[${N}] = undefined;
          } else {
            newResult[${N}] = ${H}.value;
          }
        }

      `);
    }
    g.write("payload.value = newResult;"), g.write("return payload;");
    const z = g.compile();
    return (R, H) => z(p, R, H);
  };
  let s;
  const o = Na, r = !Bo.jitless, d = r && R_.value, l = t.catchall;
  let u;
  e._zod.parse = (p, g) => {
    u ?? (u = a.value);
    const b = p.value;
    return o(b) ? r && d && g?.async === !1 && g.jitless !== !0 ? (s || (s = n(t.shape)), p = s(p, g), l ? rf([], b, p, g, u, e) : p) : i(p, g) : (p.issues.push({
      expected: "object",
      code: "invalid_type",
      input: b,
      inst: e
    }), p);
  };
});
function od(e, t, i, a) {
  for (const s of e)
    if (s.issues.length === 0)
      return t.value = s.value, t;
  const n = e.filter((s) => !ji(s));
  return n.length === 1 ? (t.value = n[0].value, n[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: i,
    errors: e.map((s) => s.issues.map((o) => Ht(o, a, Zt())))
  }), t);
}
const cf = /* @__PURE__ */ y("$ZodUnion", (e, t) => {
  ke.init(e, t), fe(e._zod, "optin", () => t.options.some((a) => a._zod.optin === "optional") ? "optional" : void 0), fe(e._zod, "optout", () => t.options.some((a) => a._zod.optout === "optional") ? "optional" : void 0), fe(e._zod, "values", () => {
    if (t.options.every((a) => a._zod.values))
      return new Set(t.options.flatMap((a) => Array.from(a._zod.values)));
  }), fe(e._zod, "pattern", () => {
    if (t.options.every((a) => a._zod.pattern)) {
      const a = t.options.map((n) => n._zod.pattern);
      return new RegExp(`^(${a.map((n) => Ho(n.source)).join("|")})$`);
    }
  });
  const i = t.options.length === 1 ? t.options[0]._zod.run : null;
  e._zod.parse = (a, n) => {
    if (i)
      return i(a, n);
    let s = !1;
    const o = [];
    for (const r of t.options) {
      const c = r._zod.run({
        value: a.value,
        issues: []
      }, n);
      if (c instanceof Promise)
        o.push(c), s = !0;
      else {
        if (c.issues.length === 0)
          return c;
        o.push(c);
      }
    }
    return s ? Promise.all(o).then((r) => od(r, a, e, n)) : od(o, a, e, n);
  };
}), w2 = /* @__PURE__ */ y("$ZodDiscriminatedUnion", (e, t) => {
  t.inclusive = !1, cf.init(e, t);
  const i = e._zod.parse;
  fe(e._zod, "propValues", () => {
    const n = {};
    for (const s of t.options) {
      const o = s._zod.propValues;
      if (!o || Object.keys(o).length === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(s)}"`);
      for (const [r, c] of Object.entries(o)) {
        n[r] || (n[r] = /* @__PURE__ */ new Set());
        for (const d of c)
          n[r].add(d);
      }
    }
    return n;
  });
  const a = as(() => {
    const n = t.options, s = /* @__PURE__ */ new Map();
    for (const o of n) {
      const r = o._zod.propValues?.[t.discriminator];
      if (!r || r.size === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(o)}"`);
      for (const c of r) {
        if (s.has(c))
          throw new Error(`Duplicate discriminator value "${String(c)}"`);
        s.set(c, o);
      }
    }
    return s;
  });
  e._zod.parse = (n, s) => {
    const o = n.value;
    if (!Na(o))
      return n.issues.push({
        code: "invalid_type",
        expected: "object",
        input: o,
        inst: e
      }), n;
    const r = a.value.get(o?.[t.discriminator]);
    return r ? r._zod.run(n, s) : t.unionFallback || s.direction === "backward" ? i(n, s) : (n.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: t.discriminator,
      options: Array.from(a.value.keys()),
      input: o,
      path: [t.discriminator],
      inst: e
    }), n);
  };
}), E2 = /* @__PURE__ */ y("$ZodIntersection", (e, t) => {
  ke.init(e, t), e._zod.parse = (i, a) => {
    const n = i.value, s = t.left._zod.run({ value: n, issues: [] }, a), o = t.right._zod.run({ value: n, issues: [] }, a);
    return s instanceof Promise || o instanceof Promise ? Promise.all([s, o]).then(([c, d]) => rd(i, c, d)) : rd(i, s, o);
  };
});
function so(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (Gi(e) && Gi(t)) {
    const i = Object.keys(t), a = Object.keys(e).filter((s) => i.indexOf(s) !== -1), n = { ...e, ...t };
    for (const s of a) {
      const o = so(e[s], t[s]);
      if (!o.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...o.mergeErrorPath]
        };
      n[s] = o.data;
    }
    return { valid: !0, data: n };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const n = e[a], s = t[a], o = so(n, s);
      if (!o.valid)
        return {
          valid: !1,
          mergeErrorPath: [a, ...o.mergeErrorPath]
        };
      i.push(o.data);
    }
    return { valid: !0, data: i };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function rd(e, t, i) {
  const a = /* @__PURE__ */ new Map();
  let n;
  for (const r of t.issues)
    if (r.code === "unrecognized_keys") {
      n ?? (n = r);
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
  if (s.length && n && e.issues.push({ ...n, keys: s }), ji(e))
    return e;
  const o = so(t.value, i.value);
  if (!o.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
  return e.value = o.data, e;
}
const I2 = /* @__PURE__ */ y("$ZodRecord", (e, t) => {
  ke.init(e, t), e._zod.parse = (i, a) => {
    const n = i.value;
    if (!Gi(n))
      return i.issues.push({
        expected: "record",
        code: "invalid_type",
        input: n,
        inst: e
      }), i;
    const s = [], o = t.keyType._zod.values;
    if (o) {
      i.value = {};
      const r = /* @__PURE__ */ new Set();
      for (const d of o)
        if (typeof d == "string" || typeof d == "number" || typeof d == "symbol") {
          r.add(typeof d == "number" ? d.toString() : d);
          const l = t.keyType._zod.run({ value: d, issues: [] }, a);
          if (l instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (l.issues.length) {
            i.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: l.issues.map((g) => Ht(g, a, Zt())),
              input: d,
              path: [d],
              inst: e
            });
            continue;
          }
          const u = l.value, p = t.valueType._zod.run({ value: n[d], issues: [] }, a);
          p instanceof Promise ? s.push(p.then((g) => {
            g.issues.length && i.issues.push(...Fi(d, g.issues)), i.value[u] = g.value;
          })) : (p.issues.length && i.issues.push(...Fi(d, p.issues)), i.value[u] = p.value);
        }
      let c;
      for (const d in n)
        r.has(d) || (c = c ?? [], c.push(d));
      c && c.length > 0 && i.issues.push({
        code: "unrecognized_keys",
        input: n,
        inst: e,
        keys: c
      });
    } else {
      i.value = {};
      for (const r of Reflect.ownKeys(n)) {
        if (r === "__proto__" || !Object.prototype.propertyIsEnumerable.call(n, r))
          continue;
        let c = t.keyType._zod.run({ value: r, issues: [] }, a);
        if (c instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof r == "string" && Ql.test(r) && c.issues.length) {
          const u = t.keyType._zod.run({ value: Number(r), issues: [] }, a);
          if (u instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          u.issues.length === 0 && (c = u);
        }
        if (c.issues.length) {
          t.mode === "loose" ? i.value[r] = n[r] : i.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((u) => Ht(u, a, Zt())),
            input: r,
            path: [r],
            inst: e
          });
          continue;
        }
        const l = t.valueType._zod.run({ value: n[r], issues: [] }, a);
        l instanceof Promise ? s.push(l.then((u) => {
          u.issues.length && i.issues.push(...Fi(r, u.issues)), i.value[c.value] = u.value;
        })) : (l.issues.length && i.issues.push(...Fi(r, l.issues)), i.value[c.value] = l.value);
      }
    }
    return s.length ? Promise.all(s).then(() => i) : i;
  };
}), T2 = /* @__PURE__ */ y("$ZodEnum", (e, t) => {
  ke.init(e, t);
  const i = Zl(t.entries), a = new Set(i);
  e._zod.values = a, e._zod.pattern = new RegExp(`^(${i.filter((n) => P_.has(typeof n)).map((n) => typeof n == "string" ? Ji(n) : n.toString()).join("|")})$`), e._zod.parse = (n, s) => {
    const o = n.value;
    return a.has(o) || n.issues.push({
      code: "invalid_value",
      values: i,
      input: o,
      inst: e
    }), n;
  };
}), A2 = /* @__PURE__ */ y("$ZodLiteral", (e, t) => {
  if (ke.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const i = new Set(t.values);
  e._zod.values = i, e._zod.pattern = new RegExp(`^(${t.values.map((a) => typeof a == "string" ? Ji(a) : a ? Ji(a.toString()) : String(a)).join("|")})$`), e._zod.parse = (a, n) => {
    const s = a.value;
    return i.has(s) || a.issues.push({
      code: "invalid_value",
      values: t.values,
      input: s,
      inst: e
    }), a;
  };
}), O2 = /* @__PURE__ */ y("$ZodTransform", (e, t) => {
  ke.init(e, t), e._zod.optin = "optional", e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new Bl(e.constructor.name);
    const n = t.transform(i.value, i);
    if (a.async)
      return (n instanceof Promise ? n : Promise.resolve(n)).then((o) => (i.value = o, i.fallback = !0, i));
    if (n instanceof Promise)
      throw new Bi();
    return i.value = n, i.fallback = !0, i;
  };
});
function cd(e, t) {
  return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
const df = /* @__PURE__ */ y("$ZodOptional", (e, t) => {
  ke.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", fe(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), fe(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${Ho(i.source)})?$`) : void 0;
  }), e._zod.parse = (i, a) => {
    if (t.innerType._zod.optin === "optional") {
      const n = i.value, s = t.innerType._zod.run(i, a);
      return s instanceof Promise ? s.then((o) => cd(o, n)) : cd(s, n);
    }
    return i.value === void 0 ? i : t.innerType._zod.run(i, a);
  };
}), x2 = /* @__PURE__ */ y("$ZodExactOptional", (e, t) => {
  df.init(e, t), fe(e._zod, "values", () => t.innerType._zod.values), fe(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (i, a) => t.innerType._zod.run(i, a);
}), S2 = /* @__PURE__ */ y("$ZodNullable", (e, t) => {
  ke.init(e, t), fe(e._zod, "optin", () => t.innerType._zod.optin), fe(e._zod, "optout", () => t.innerType._zod.optout), fe(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${Ho(i.source)}|null)$`) : void 0;
  }), fe(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (i, a) => i.value === null ? i : t.innerType._zod.run(i, a);
}), N2 = /* @__PURE__ */ y("$ZodDefault", (e, t) => {
  ke.init(e, t), e._zod.optin = "optional", fe(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    if (i.value === void 0)
      return i.value = t.defaultValue, i;
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then((s) => dd(s, t)) : dd(n, t);
  };
});
function dd(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const C2 = /* @__PURE__ */ y("$ZodPrefault", (e, t) => {
  ke.init(e, t), e._zod.optin = "optional", fe(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => (a.direction === "backward" || i.value === void 0 && (i.value = t.defaultValue), t.innerType._zod.run(i, a));
}), D2 = /* @__PURE__ */ y("$ZodNonOptional", (e, t) => {
  ke.init(e, t), fe(e._zod, "values", () => {
    const i = t.innerType._zod.values;
    return i ? new Set([...i].filter((a) => a !== void 0)) : void 0;
  }), e._zod.parse = (i, a) => {
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then((s) => ud(s, e)) : ud(n, e);
  };
});
function ud(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const V2 = /* @__PURE__ */ y("$ZodCatch", (e, t) => {
  ke.init(e, t), e._zod.optin = "optional", fe(e._zod, "optout", () => t.innerType._zod.optout), fe(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then((s) => (i.value = s.value, s.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: s.issues.map((o) => Ht(o, a, Zt()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i)) : (i.value = n.value, n.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: n.issues.map((s) => Ht(s, a, Zt()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i);
  };
}), R2 = /* @__PURE__ */ y("$ZodPipe", (e, t) => {
  ke.init(e, t), fe(e._zod, "values", () => t.in._zod.values), fe(e._zod, "optin", () => t.in._zod.optin), fe(e._zod, "optout", () => t.out._zod.optout), fe(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (i, a) => {
    if (a.direction === "backward") {
      const s = t.out._zod.run(i, a);
      return s instanceof Promise ? s.then((o) => Ya(o, t.in, a)) : Ya(s, t.in, a);
    }
    const n = t.in._zod.run(i, a);
    return n instanceof Promise ? n.then((s) => Ya(s, t.out, a)) : Ya(n, t.out, a);
  };
});
function Ya(e, t, i) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
const P2 = /* @__PURE__ */ y("$ZodReadonly", (e, t) => {
  ke.init(e, t), fe(e._zod, "propValues", () => t.innerType._zod.propValues), fe(e._zod, "values", () => t.innerType._zod.values), fe(e._zod, "optin", () => t.innerType?._zod?.optin), fe(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then(ld) : ld(n);
  };
});
function ld(e) {
  return e.value = Object.freeze(e.value), e;
}
const $2 = /* @__PURE__ */ y("$ZodCustom", (e, t) => {
  it.init(e, t), ke.init(e, t), e._zod.parse = (i, a) => i, e._zod.check = (i) => {
    const a = i.value, n = t.fn(a);
    if (n instanceof Promise)
      return n.then((s) => fd(s, i, a, e));
    fd(n, i, a, e);
  };
});
function fd(e, t, i, a) {
  if (!e) {
    const n = {
      code: "custom",
      input: i,
      inst: a,
      // incorporates params.error into issue reporting
      path: [...a._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !a._zod.def.abort
      // params: inst._zod.def.params,
    };
    a._zod.def.params && (n.params = a._zod.def.params), t.issues.push(Ca(n));
  }
}
var pd;
class j2 {
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
      const n = { ...a, ...this._map.get(t) };
      return Object.keys(n).length ? n : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function F2() {
  return new j2();
}
(pd = globalThis).__zod_globalRegistry ?? (pd.__zod_globalRegistry = F2());
const ua = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function z2(e, t) {
  return new e({
    type: "string",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function U2(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function gd(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function L2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function M2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function B2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Z2(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function H2(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function K2(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function W2(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function q2(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function G2(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function J2(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Y2(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function X2(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Q2(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function e1(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function t1(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function i1(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function a1(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function n1(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function s1(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function o1(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function r1(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function c1(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function d1(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function u1(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function l1(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function f1(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function p1(e, t) {
  return new e({
    type: "boolean",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function g1(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function m1(e, t) {
  return new e({
    type: "never",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function md(e, t) {
  return new tf({
    check: "less_than",
    ...Z(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function As(e, t) {
  return new tf({
    check: "less_than",
    ...Z(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function bd(e, t) {
  return new af({
    check: "greater_than",
    ...Z(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Os(e, t) {
  return new af({
    check: "greater_than",
    ...Z(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function hd(e, t) {
  return new N0({
    check: "multiple_of",
    ...Z(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function uf(e, t) {
  return new D0({
    check: "max_length",
    ...Z(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Pn(e, t) {
  return new V0({
    check: "min_length",
    ...Z(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function lf(e, t) {
  return new R0({
    check: "length_equals",
    ...Z(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function b1(e, t) {
  return new P0({
    check: "string_format",
    format: "regex",
    ...Z(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function h1(e) {
  return new $0({
    check: "string_format",
    format: "lowercase",
    ...Z(e)
  });
}
// @__NO_SIDE_EFFECTS__
function _1(e) {
  return new j0({
    check: "string_format",
    format: "uppercase",
    ...Z(e)
  });
}
// @__NO_SIDE_EFFECTS__
function v1(e, t) {
  return new F0({
    check: "string_format",
    format: "includes",
    ...Z(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function y1(e, t) {
  return new z0({
    check: "string_format",
    format: "starts_with",
    ...Z(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function k1(e, t) {
  return new U0({
    check: "string_format",
    format: "ends_with",
    ...Z(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function ea(e) {
  return new L0({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function w1(e) {
  return /* @__PURE__ */ ea((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function E1() {
  return /* @__PURE__ */ ea((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function I1() {
  return /* @__PURE__ */ ea((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function T1() {
  return /* @__PURE__ */ ea((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function A1() {
  return /* @__PURE__ */ ea((e) => V_(e));
}
// @__NO_SIDE_EFFECTS__
function O1(e, t, i) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...Z(i)
  });
}
// @__NO_SIDE_EFFECTS__
function x1(e, t, i) {
  const a = Z(i);
  return a.abort ?? (a.abort = !0), new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...a
  });
}
// @__NO_SIDE_EFFECTS__
function S1(e, t, i) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...Z(i)
  });
}
// @__NO_SIDE_EFFECTS__
function N1(e, t) {
  const i = /* @__PURE__ */ C1((a) => (a.addIssue = (n) => {
    if (typeof n == "string")
      a.issues.push(Ca(n, a.value, i._zod.def));
    else {
      const s = n;
      s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = a.value), s.inst ?? (s.inst = i), s.continue ?? (s.continue = !i._zod.def.abort), a.issues.push(Ca(s));
    }
  }, e(a.value, a)), t);
  return i;
}
// @__NO_SIDE_EFFECTS__
function C1(e, t) {
  const i = new it({
    check: "custom",
    ...Z(t)
  });
  return i._zod.check = e, i;
}
function ff(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? ua,
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
function Ne(e, t, i = { path: [], schemaPath: [] }) {
  var a;
  const n = e._zod.def, s = t.seen.get(e);
  if (s)
    return s.count++, i.schemaPath.includes(e) && (s.cycle = i.path), s.schema;
  const o = { schema: {}, count: 1, cycle: void 0, path: i.path };
  t.seen.set(e, o);
  const r = e._zod.toJSONSchema?.();
  if (r)
    o.schema = r;
  else {
    const l = {
      ...i,
      schemaPath: [...i.schemaPath, e],
      path: i.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, o.schema, l);
    else {
      const p = o.schema, g = t.processors[n.type];
      if (!g)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${n.type}`);
      g(e, t, p, l);
    }
    const u = e._zod.parent;
    u && (o.ref || (o.ref = u), Ne(u, t, l), t.seen.get(u).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(o.schema, c), t.io === "input" && qe(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((a = o.schema).default ?? (a.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function pf(e, t) {
  const i = e.seen.get(t);
  if (!i)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const a = /* @__PURE__ */ new Map();
  for (const o of e.seen.entries()) {
    const r = e.metadataRegistry.get(o[0])?.id;
    if (r) {
      const c = a.get(r);
      if (c && c !== o[0])
        throw new Error(`Duplicate schema id "${r}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      a.set(r, o[0]);
    }
  }
  const n = (o) => {
    const r = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const u = e.external.registry.get(o[0])?.id, p = e.external.uri ?? ((b) => b);
      if (u)
        return { ref: p(u) };
      const g = o[1].defId ?? o[1].schema.id ?? `schema${e.counter++}`;
      return o[1].defId = g, { defId: g, ref: `${p("__shared")}#/${r}/${g}` };
    }
    if (o[1] === i)
      return { ref: "#" };
    const d = `#/${r}/`, l = o[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: l, ref: d + l };
  }, s = (o) => {
    if (o[1].schema.$ref)
      return;
    const r = o[1], { ref: c, defId: d } = n(o);
    r.def = { ...r.schema }, d && (r.defId = d);
    const l = r.schema;
    for (const u in l)
      delete l[u];
    l.$ref = c;
  };
  if (e.cycles === "throw")
    for (const o of e.seen.entries()) {
      const r = o[1];
      if (r.cycle)
        throw new Error(`Cycle detected: #/${r.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const o of e.seen.entries()) {
    const r = o[1];
    if (t === o[0]) {
      s(o);
      continue;
    }
    if (e.external) {
      const d = e.external.registry.get(o[0])?.id;
      if (t !== o[0] && d) {
        s(o);
        continue;
      }
    }
    if (e.metadataRegistry.get(o[0])?.id) {
      s(o);
      continue;
    }
    if (r.cycle) {
      s(o);
      continue;
    }
    if (r.count > 1 && e.reused === "ref") {
      s(o);
      continue;
    }
  }
}
function gf(e, t) {
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
      const g = e.seen.get(u), b = g.schema;
      if (b.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (d.allOf = d.allOf ?? [], d.allOf.push(b)) : Object.assign(d, b), Object.assign(d, l), r._zod.parent === u)
        for (const E in d)
          E === "$ref" || E === "allOf" || E in l || delete d[E];
      if (b.$ref && g.def)
        for (const E in d)
          E === "$ref" || E === "allOf" || E in g.def && JSON.stringify(d[E]) === JSON.stringify(g.def[E]) && delete d[E];
    }
    const p = r._zod.parent;
    if (p && p !== u) {
      a(p);
      const g = e.seen.get(p);
      if (g?.schema.$ref && (d.$ref = g.schema.$ref, g.def))
        for (const b in d)
          b === "$ref" || b === "allOf" || b in g.def && JSON.stringify(d[b]) === JSON.stringify(g.def[b]) && delete d[b];
    }
    e.override({
      zodSchema: r,
      jsonSchema: d,
      path: c.path ?? []
    });
  };
  for (const r of [...e.seen.entries()].reverse())
    a(r[0]);
  const n = {};
  if (e.target === "draft-2020-12" ? n.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? n.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? n.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
    const r = e.external.registry.get(t)?.id;
    if (!r)
      throw new Error("Schema is missing an `id` property");
    n.$id = e.external.uri(r);
  }
  Object.assign(n, i.def ?? i.schema);
  const s = e.metadataRegistry.get(t)?.id;
  s !== void 0 && n.id === s && delete n.id;
  const o = e.external?.defs ?? {};
  for (const r of e.seen.entries()) {
    const c = r[1];
    c.def && c.defId && (c.def.id === c.defId && delete c.def.id, o[c.defId] = c.def);
  }
  e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? n.$defs = o : n.definitions = o);
  try {
    const r = JSON.parse(JSON.stringify(n));
    return Object.defineProperty(r, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: $n(t, "input", e.processors),
          output: $n(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), r;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function qe(e, t) {
  const i = t ?? { seen: /* @__PURE__ */ new Set() };
  if (i.seen.has(e))
    return !1;
  i.seen.add(e);
  const a = e._zod.def;
  if (a.type === "transform")
    return !0;
  if (a.type === "array")
    return qe(a.element, i);
  if (a.type === "set")
    return qe(a.valueType, i);
  if (a.type === "lazy")
    return qe(a.getter(), i);
  if (a.type === "promise" || a.type === "optional" || a.type === "nonoptional" || a.type === "nullable" || a.type === "readonly" || a.type === "default" || a.type === "prefault")
    return qe(a.innerType, i);
  if (a.type === "intersection")
    return qe(a.left, i) || qe(a.right, i);
  if (a.type === "record" || a.type === "map")
    return qe(a.keyType, i) || qe(a.valueType, i);
  if (a.type === "pipe")
    return e._zod.traits.has("$ZodCodec") ? !0 : qe(a.in, i) || qe(a.out, i);
  if (a.type === "object") {
    for (const n in a.shape)
      if (qe(a.shape[n], i))
        return !0;
    return !1;
  }
  if (a.type === "union") {
    for (const n of a.options)
      if (qe(n, i))
        return !0;
    return !1;
  }
  if (a.type === "tuple") {
    for (const n of a.items)
      if (qe(n, i))
        return !0;
    return !!(a.rest && qe(a.rest, i));
  }
  return !1;
}
const D1 = (e, t = {}) => (i) => {
  const a = ff({ ...i, processors: t });
  return Ne(e, a), pf(a, e), gf(a, e);
}, $n = (e, t, i = {}) => (a) => {
  const { libraryOptions: n, target: s } = a ?? {}, o = ff({ ...n ?? {}, target: s, io: t, processors: i });
  return Ne(e, o), pf(o, e), gf(o, e);
}, V1 = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, R1 = (e, t, i, a) => {
  const n = i;
  n.type = "string";
  const { minimum: s, maximum: o, format: r, patterns: c, contentEncoding: d } = e._zod.bag;
  if (typeof s == "number" && (n.minLength = s), typeof o == "number" && (n.maxLength = o), r && (n.format = V1[r] ?? r, n.format === "" && delete n.format, r === "time" && delete n.format), d && (n.contentEncoding = d), c && c.size > 0) {
    const l = [...c];
    l.length === 1 ? n.pattern = l[0].source : l.length > 1 && (n.allOf = [
      ...l.map((u) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: u.source
      }))
    ]);
  }
}, P1 = (e, t, i, a) => {
  const n = i, { minimum: s, maximum: o, format: r, multipleOf: c, exclusiveMaximum: d, exclusiveMinimum: l } = e._zod.bag;
  typeof r == "string" && r.includes("int") ? n.type = "integer" : n.type = "number";
  const u = typeof l == "number" && l >= (s ?? Number.NEGATIVE_INFINITY), p = typeof d == "number" && d <= (o ?? Number.POSITIVE_INFINITY), g = t.target === "draft-04" || t.target === "openapi-3.0";
  u ? g ? (n.minimum = l, n.exclusiveMinimum = !0) : n.exclusiveMinimum = l : typeof s == "number" && (n.minimum = s), p ? g ? (n.maximum = d, n.exclusiveMaximum = !0) : n.exclusiveMaximum = d : typeof o == "number" && (n.maximum = o), typeof c == "number" && (n.multipleOf = c);
}, $1 = (e, t, i, a) => {
  i.type = "boolean";
}, j1 = (e, t, i, a) => {
  i.not = {};
}, F1 = (e, t, i, a) => {
}, z1 = (e, t, i, a) => {
  const n = e._zod.def, s = Zl(n.entries);
  s.every((o) => typeof o == "number") && (i.type = "number"), s.every((o) => typeof o == "string") && (i.type = "string"), i.enum = s;
}, U1 = (e, t, i, a) => {
  const n = e._zod.def, s = [];
  for (const o of n.values)
    if (o === void 0) {
      if (t.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof o == "bigint") {
      if (t.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      s.push(Number(o));
    } else
      s.push(o);
  if (s.length !== 0) if (s.length === 1) {
    const o = s[0];
    i.type = o === null ? "null" : typeof o, t.target === "draft-04" || t.target === "openapi-3.0" ? i.enum = [o] : i.const = o;
  } else
    s.every((o) => typeof o == "number") && (i.type = "number"), s.every((o) => typeof o == "string") && (i.type = "string"), s.every((o) => typeof o == "boolean") && (i.type = "boolean"), s.every((o) => o === null) && (i.type = "null"), i.enum = s;
}, L1 = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, M1 = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, B1 = (e, t, i, a) => {
  const n = i, s = e._zod.def, { minimum: o, maximum: r } = e._zod.bag;
  typeof o == "number" && (n.minItems = o), typeof r == "number" && (n.maxItems = r), n.type = "array", n.items = Ne(s.element, t, {
    ...a,
    path: [...a.path, "items"]
  });
}, Z1 = (e, t, i, a) => {
  const n = i, s = e._zod.def;
  n.type = "object", n.properties = {};
  const o = s.shape;
  for (const d in o)
    n.properties[d] = Ne(o[d], t, {
      ...a,
      path: [...a.path, "properties", d]
    });
  const r = new Set(Object.keys(o)), c = new Set([...r].filter((d) => {
    const l = s.shape[d]._zod;
    return t.io === "input" ? l.optin === void 0 : l.optout === void 0;
  }));
  c.size > 0 && (n.required = Array.from(c)), s.catchall?._zod.def.type === "never" ? n.additionalProperties = !1 : s.catchall ? s.catchall && (n.additionalProperties = Ne(s.catchall, t, {
    ...a,
    path: [...a.path, "additionalProperties"]
  })) : t.io === "output" && (n.additionalProperties = !1);
}, H1 = (e, t, i, a) => {
  const n = e._zod.def, s = n.inclusive === !1, o = n.options.map((r, c) => Ne(r, t, {
    ...a,
    path: [...a.path, s ? "oneOf" : "anyOf", c]
  }));
  s ? i.oneOf = o : i.anyOf = o;
}, K1 = (e, t, i, a) => {
  const n = e._zod.def, s = Ne(n.left, t, {
    ...a,
    path: [...a.path, "allOf", 0]
  }), o = Ne(n.right, t, {
    ...a,
    path: [...a.path, "allOf", 1]
  }), r = (d) => "allOf" in d && Object.keys(d).length === 1, c = [
    ...r(s) ? s.allOf : [s],
    ...r(o) ? o.allOf : [o]
  ];
  i.allOf = c;
}, W1 = (e, t, i, a) => {
  const n = i, s = e._zod.def;
  n.type = "object";
  const o = s.keyType, c = o._zod.bag?.patterns;
  if (s.mode === "loose" && c && c.size > 0) {
    const l = Ne(s.valueType, t, {
      ...a,
      path: [...a.path, "patternProperties", "*"]
    });
    n.patternProperties = {};
    for (const u of c)
      n.patternProperties[u.source] = l;
  } else
    (t.target === "draft-07" || t.target === "draft-2020-12") && (n.propertyNames = Ne(s.keyType, t, {
      ...a,
      path: [...a.path, "propertyNames"]
    })), n.additionalProperties = Ne(s.valueType, t, {
      ...a,
      path: [...a.path, "additionalProperties"]
    });
  const d = o._zod.values;
  if (d) {
    const l = [...d].filter((u) => typeof u == "string" || typeof u == "number");
    l.length > 0 && (n.required = l);
  }
}, q1 = (e, t, i, a) => {
  const n = e._zod.def, s = Ne(n.innerType, t, a), o = t.seen.get(e);
  t.target === "openapi-3.0" ? (o.ref = n.innerType, i.nullable = !0) : i.anyOf = [s, { type: "null" }];
}, G1 = (e, t, i, a) => {
  const n = e._zod.def;
  Ne(n.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = n.innerType;
}, J1 = (e, t, i, a) => {
  const n = e._zod.def;
  Ne(n.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = n.innerType, i.default = JSON.parse(JSON.stringify(n.defaultValue));
}, Y1 = (e, t, i, a) => {
  const n = e._zod.def;
  Ne(n.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = n.innerType, t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(n.defaultValue)));
}, X1 = (e, t, i, a) => {
  const n = e._zod.def;
  Ne(n.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = n.innerType;
  let o;
  try {
    o = n.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  i.default = o;
}, Q1 = (e, t, i, a) => {
  const n = e._zod.def, s = n.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? s ? n.out : n.in : n.out;
  Ne(o, t, a);
  const r = t.seen.get(e);
  r.ref = o;
}, ev = (e, t, i, a) => {
  const n = e._zod.def;
  Ne(n.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = n.innerType, i.readOnly = !0;
}, mf = (e, t, i, a) => {
  const n = e._zod.def;
  Ne(n.innerType, t, a);
  const s = t.seen.get(e);
  s.ref = n.innerType;
}, tv = /* @__PURE__ */ y("ZodISODateTime", (e, t) => {
  t2.init(e, t), Ee.init(e, t);
});
function iv(e) {
  return /* @__PURE__ */ r1(tv, e);
}
const av = /* @__PURE__ */ y("ZodISODate", (e, t) => {
  i2.init(e, t), Ee.init(e, t);
});
function nv(e) {
  return /* @__PURE__ */ c1(av, e);
}
const sv = /* @__PURE__ */ y("ZodISOTime", (e, t) => {
  a2.init(e, t), Ee.init(e, t);
});
function ov(e) {
  return /* @__PURE__ */ d1(sv, e);
}
const rv = /* @__PURE__ */ y("ZodISODuration", (e, t) => {
  n2.init(e, t), Ee.init(e, t);
});
function cv(e) {
  return /* @__PURE__ */ u1(rv, e);
}
const dv = (e, t) => {
  ql.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (i) => W_(e, i)
      // enumerable: false,
    },
    flatten: {
      value: (i) => K_(e, i)
      // enumerable: false,
    },
    addIssue: {
      value: (i) => {
        e.issues.push(i), e.message = JSON.stringify(e.issues, no, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (i) => {
        e.issues.push(...i), e.message = JSON.stringify(e.issues, no, 2);
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
}, ft = /* @__PURE__ */ y("ZodError", dv, {
  Parent: Error
}), uv = /* @__PURE__ */ Wo(ft), lv = /* @__PURE__ */ qo(ft), fv = /* @__PURE__ */ ns(ft), pv = /* @__PURE__ */ ss(ft), gv = /* @__PURE__ */ J_(ft), mv = /* @__PURE__ */ Y_(ft), bv = /* @__PURE__ */ X_(ft), hv = /* @__PURE__ */ Q_(ft), _v = /* @__PURE__ */ e0(ft), vv = /* @__PURE__ */ t0(ft), yv = /* @__PURE__ */ i0(ft), kv = /* @__PURE__ */ a0(ft), _d = /* @__PURE__ */ new WeakMap();
function Ma(e, t, i) {
  const a = Object.getPrototypeOf(e);
  let n = _d.get(a);
  if (n || (n = /* @__PURE__ */ new Set(), _d.set(a, n)), !n.has(t)) {
    n.add(t);
    for (const s in i) {
      const o = i[s];
      Object.defineProperty(a, s, {
        configurable: !0,
        enumerable: !1,
        get() {
          const r = o.bind(this);
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
const we = /* @__PURE__ */ y("ZodType", (e, t) => (ke.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: $n(e, "input"),
    output: $n(e, "output")
  }
}), e.toJSONSchema = D1(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (i, a) => uv(e, i, a, { callee: e.parse }), e.safeParse = (i, a) => fv(e, i, a), e.parseAsync = async (i, a) => lv(e, i, a, { callee: e.parseAsync }), e.safeParseAsync = async (i, a) => pv(e, i, a), e.spa = e.safeParseAsync, e.encode = (i, a) => gv(e, i, a), e.decode = (i, a) => mv(e, i, a), e.encodeAsync = async (i, a) => bv(e, i, a), e.decodeAsync = async (i, a) => hv(e, i, a), e.safeEncode = (i, a) => _v(e, i, a), e.safeDecode = (i, a) => vv(e, i, a), e.safeEncodeAsync = async (i, a) => yv(e, i, a), e.safeDecodeAsync = async (i, a) => kv(e, i, a), Ma(e, "ZodType", {
  check(...i) {
    const a = this.def;
    return this.clone(ai(a, {
      checks: [
        ...a.checks ?? [],
        ...i.map((n) => typeof n == "function" ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } } : n)
      ]
    }), { parent: !0 });
  },
  with(...i) {
    return this.check(...i);
  },
  clone(i, a) {
    return ni(this, i, a);
  },
  brand() {
    return this;
  },
  register(i, a) {
    return i.add(this, a), this;
  },
  refine(i, a) {
    return this.check(m6(i, a));
  },
  superRefine(i, a) {
    return this.check(b6(i, a));
  },
  overwrite(i) {
    return this.check(/* @__PURE__ */ ea(i));
  },
  optional() {
    return Ed(this);
  },
  exactOptional() {
    return i6(this);
  },
  nullable() {
    return Id(this);
  },
  nullish() {
    return Ed(Id(this));
  },
  nonoptional(i) {
    return c6(this, i);
  },
  array() {
    return Te(this);
  },
  or(i) {
    return Wv([this, i]);
  },
  and(i) {
    return Jv(this, i);
  },
  transform(i) {
    return Td(this, e6(i));
  },
  default(i) {
    return s6(this, i);
  },
  prefault(i) {
    return r6(this, i);
  },
  catch(i) {
    return u6(this, i);
  },
  pipe(i) {
    return Td(this, i);
  },
  readonly() {
    return p6(this);
  },
  describe(i) {
    const a = this.clone();
    return ua.add(a, { description: i }), a;
  },
  meta(...i) {
    if (i.length === 0)
      return ua.get(this);
    const a = this.clone();
    return ua.add(a, i[0]), a;
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
    return ua.get(e)?.description;
  },
  configurable: !0
}), e)), bf = /* @__PURE__ */ y("_ZodString", (e, t) => {
  Go.init(e, t), we.init(e, t), e._zod.processJSONSchema = (a, n, s) => R1(e, a, n);
  const i = e._zod.bag;
  e.format = i.format ?? null, e.minLength = i.minimum ?? null, e.maxLength = i.maximum ?? null, Ma(e, "_ZodString", {
    regex(...a) {
      return this.check(/* @__PURE__ */ b1(...a));
    },
    includes(...a) {
      return this.check(/* @__PURE__ */ v1(...a));
    },
    startsWith(...a) {
      return this.check(/* @__PURE__ */ y1(...a));
    },
    endsWith(...a) {
      return this.check(/* @__PURE__ */ k1(...a));
    },
    min(...a) {
      return this.check(/* @__PURE__ */ Pn(...a));
    },
    max(...a) {
      return this.check(/* @__PURE__ */ uf(...a));
    },
    length(...a) {
      return this.check(/* @__PURE__ */ lf(...a));
    },
    nonempty(...a) {
      return this.check(/* @__PURE__ */ Pn(1, ...a));
    },
    lowercase(a) {
      return this.check(/* @__PURE__ */ h1(a));
    },
    uppercase(a) {
      return this.check(/* @__PURE__ */ _1(a));
    },
    trim() {
      return this.check(/* @__PURE__ */ E1());
    },
    normalize(...a) {
      return this.check(/* @__PURE__ */ w1(...a));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ I1());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ T1());
    },
    slugify() {
      return this.check(/* @__PURE__ */ A1());
    }
  });
}), wv = /* @__PURE__ */ y("ZodString", (e, t) => {
  Go.init(e, t), bf.init(e, t), e.email = (i) => e.check(/* @__PURE__ */ U2(Ev, i)), e.url = (i) => e.check(/* @__PURE__ */ H2(Iv, i)), e.jwt = (i) => e.check(/* @__PURE__ */ o1(zv, i)), e.emoji = (i) => e.check(/* @__PURE__ */ K2(Tv, i)), e.guid = (i) => e.check(/* @__PURE__ */ gd(vd, i)), e.uuid = (i) => e.check(/* @__PURE__ */ L2(Xa, i)), e.uuidv4 = (i) => e.check(/* @__PURE__ */ M2(Xa, i)), e.uuidv6 = (i) => e.check(/* @__PURE__ */ B2(Xa, i)), e.uuidv7 = (i) => e.check(/* @__PURE__ */ Z2(Xa, i)), e.nanoid = (i) => e.check(/* @__PURE__ */ W2(Av, i)), e.guid = (i) => e.check(/* @__PURE__ */ gd(vd, i)), e.cuid = (i) => e.check(/* @__PURE__ */ q2(Ov, i)), e.cuid2 = (i) => e.check(/* @__PURE__ */ G2(xv, i)), e.ulid = (i) => e.check(/* @__PURE__ */ J2(Sv, i)), e.base64 = (i) => e.check(/* @__PURE__ */ a1($v, i)), e.base64url = (i) => e.check(/* @__PURE__ */ n1(jv, i)), e.xid = (i) => e.check(/* @__PURE__ */ Y2(Nv, i)), e.ksuid = (i) => e.check(/* @__PURE__ */ X2(Cv, i)), e.ipv4 = (i) => e.check(/* @__PURE__ */ Q2(Dv, i)), e.ipv6 = (i) => e.check(/* @__PURE__ */ e1(Vv, i)), e.cidrv4 = (i) => e.check(/* @__PURE__ */ t1(Rv, i)), e.cidrv6 = (i) => e.check(/* @__PURE__ */ i1(Pv, i)), e.e164 = (i) => e.check(/* @__PURE__ */ s1(Fv, i)), e.datetime = (i) => e.check(iv(i)), e.date = (i) => e.check(nv(i)), e.time = (i) => e.check(ov(i)), e.duration = (i) => e.check(cv(i));
});
function M(e) {
  return /* @__PURE__ */ z2(wv, e);
}
const Ee = /* @__PURE__ */ y("ZodStringFormat", (e, t) => {
  ye.init(e, t), bf.init(e, t);
}), Ev = /* @__PURE__ */ y("ZodEmail", (e, t) => {
  K0.init(e, t), Ee.init(e, t);
}), vd = /* @__PURE__ */ y("ZodGUID", (e, t) => {
  Z0.init(e, t), Ee.init(e, t);
}), Xa = /* @__PURE__ */ y("ZodUUID", (e, t) => {
  H0.init(e, t), Ee.init(e, t);
}), Iv = /* @__PURE__ */ y("ZodURL", (e, t) => {
  W0.init(e, t), Ee.init(e, t);
}), Tv = /* @__PURE__ */ y("ZodEmoji", (e, t) => {
  q0.init(e, t), Ee.init(e, t);
}), Av = /* @__PURE__ */ y("ZodNanoID", (e, t) => {
  G0.init(e, t), Ee.init(e, t);
}), Ov = /* @__PURE__ */ y("ZodCUID", (e, t) => {
  J0.init(e, t), Ee.init(e, t);
}), xv = /* @__PURE__ */ y("ZodCUID2", (e, t) => {
  Y0.init(e, t), Ee.init(e, t);
}), Sv = /* @__PURE__ */ y("ZodULID", (e, t) => {
  X0.init(e, t), Ee.init(e, t);
}), Nv = /* @__PURE__ */ y("ZodXID", (e, t) => {
  Q0.init(e, t), Ee.init(e, t);
}), Cv = /* @__PURE__ */ y("ZodKSUID", (e, t) => {
  e2.init(e, t), Ee.init(e, t);
}), Dv = /* @__PURE__ */ y("ZodIPv4", (e, t) => {
  s2.init(e, t), Ee.init(e, t);
}), Vv = /* @__PURE__ */ y("ZodIPv6", (e, t) => {
  o2.init(e, t), Ee.init(e, t);
}), Rv = /* @__PURE__ */ y("ZodCIDRv4", (e, t) => {
  r2.init(e, t), Ee.init(e, t);
}), Pv = /* @__PURE__ */ y("ZodCIDRv6", (e, t) => {
  c2.init(e, t), Ee.init(e, t);
}), $v = /* @__PURE__ */ y("ZodBase64", (e, t) => {
  d2.init(e, t), Ee.init(e, t);
}), jv = /* @__PURE__ */ y("ZodBase64URL", (e, t) => {
  l2.init(e, t), Ee.init(e, t);
}), Fv = /* @__PURE__ */ y("ZodE164", (e, t) => {
  f2.init(e, t), Ee.init(e, t);
}), zv = /* @__PURE__ */ y("ZodJWT", (e, t) => {
  g2.init(e, t), Ee.init(e, t);
}), hf = /* @__PURE__ */ y("ZodNumber", (e, t) => {
  sf.init(e, t), we.init(e, t), e._zod.processJSONSchema = (a, n, s) => P1(e, a, n), Ma(e, "ZodNumber", {
    gt(a, n) {
      return this.check(/* @__PURE__ */ bd(a, n));
    },
    gte(a, n) {
      return this.check(/* @__PURE__ */ Os(a, n));
    },
    min(a, n) {
      return this.check(/* @__PURE__ */ Os(a, n));
    },
    lt(a, n) {
      return this.check(/* @__PURE__ */ md(a, n));
    },
    lte(a, n) {
      return this.check(/* @__PURE__ */ As(a, n));
    },
    max(a, n) {
      return this.check(/* @__PURE__ */ As(a, n));
    },
    int(a) {
      return this.check(yd(a));
    },
    safe(a) {
      return this.check(yd(a));
    },
    positive(a) {
      return this.check(/* @__PURE__ */ bd(0, a));
    },
    nonnegative(a) {
      return this.check(/* @__PURE__ */ Os(0, a));
    },
    negative(a) {
      return this.check(/* @__PURE__ */ md(0, a));
    },
    nonpositive(a) {
      return this.check(/* @__PURE__ */ As(0, a));
    },
    multipleOf(a, n) {
      return this.check(/* @__PURE__ */ hd(a, n));
    },
    step(a, n) {
      return this.check(/* @__PURE__ */ hd(a, n));
    },
    finite() {
      return this;
    }
  });
  const i = e._zod.bag;
  e.minValue = Math.max(i.minimum ?? Number.NEGATIVE_INFINITY, i.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(i.maximum ?? Number.POSITIVE_INFINITY, i.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (i.format ?? "").includes("int") || Number.isSafeInteger(i.multipleOf ?? 0.5), e.isFinite = !0, e.format = i.format ?? null;
});
function se(e) {
  return /* @__PURE__ */ l1(hf, e);
}
const Uv = /* @__PURE__ */ y("ZodNumberFormat", (e, t) => {
  m2.init(e, t), hf.init(e, t);
});
function yd(e) {
  return /* @__PURE__ */ f1(Uv, e);
}
const Lv = /* @__PURE__ */ y("ZodBoolean", (e, t) => {
  b2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => $1(e, i, a);
});
function rs(e) {
  return /* @__PURE__ */ p1(Lv, e);
}
const Mv = /* @__PURE__ */ y("ZodUnknown", (e, t) => {
  h2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => F1();
});
function kd() {
  return /* @__PURE__ */ g1(Mv);
}
const Bv = /* @__PURE__ */ y("ZodNever", (e, t) => {
  _2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => j1(e, i, a);
});
function Zv(e) {
  return /* @__PURE__ */ m1(Bv, e);
}
const Hv = /* @__PURE__ */ y("ZodArray", (e, t) => {
  v2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => B1(e, i, a, n), e.element = t.element, Ma(e, "ZodArray", {
    min(i, a) {
      return this.check(/* @__PURE__ */ Pn(i, a));
    },
    nonempty(i) {
      return this.check(/* @__PURE__ */ Pn(1, i));
    },
    max(i, a) {
      return this.check(/* @__PURE__ */ uf(i, a));
    },
    length(i, a) {
      return this.check(/* @__PURE__ */ lf(i, a));
    },
    unwrap() {
      return this.element;
    }
  });
});
function Te(e, t) {
  return /* @__PURE__ */ O1(Hv, e, t);
}
const Kv = /* @__PURE__ */ y("ZodObject", (e, t) => {
  k2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => Z1(e, i, a, n), fe(e, "shape", () => t.shape), Ma(e, "ZodObject", {
    keyof() {
      return Rt(Object.keys(this._zod.def.shape));
    },
    catchall(i) {
      return this.clone({ ...this._zod.def, catchall: i });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: kd() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: kd() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: Zv() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: void 0 });
    },
    extend(i) {
      return U_(this, i);
    },
    safeExtend(i) {
      return L_(this, i);
    },
    merge(i) {
      return M_(this, i);
    },
    pick(i) {
      return F_(this, i);
    },
    omit(i) {
      return z_(this, i);
    },
    partial(...i) {
      return B_(yf, this, i[0]);
    },
    required(...i) {
      return Z_(kf, this, i[0]);
    }
  });
});
function me(e, t) {
  const i = {
    type: "object",
    shape: e ?? {},
    ...Z(t)
  };
  return new Kv(i);
}
const _f = /* @__PURE__ */ y("ZodUnion", (e, t) => {
  cf.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => H1(e, i, a, n), e.options = t.options;
});
function Wv(e, t) {
  return new _f({
    type: "union",
    options: e,
    ...Z(t)
  });
}
const qv = /* @__PURE__ */ y("ZodDiscriminatedUnion", (e, t) => {
  _f.init(e, t), w2.init(e, t);
});
function vf(e, t, i) {
  return new qv({
    type: "union",
    options: t,
    discriminator: e,
    ...Z(i)
  });
}
const Gv = /* @__PURE__ */ y("ZodIntersection", (e, t) => {
  E2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => K1(e, i, a, n);
});
function Jv(e, t) {
  return new Gv({
    type: "intersection",
    left: e,
    right: t
  });
}
const wd = /* @__PURE__ */ y("ZodRecord", (e, t) => {
  I2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => W1(e, i, a, n), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Yv(e, t, i) {
  return !t || !t._zod ? new wd({
    type: "record",
    keyType: M(),
    valueType: e,
    ...Z(t)
  }) : new wd({
    type: "record",
    keyType: e,
    valueType: t,
    ...Z(i)
  });
}
const oo = /* @__PURE__ */ y("ZodEnum", (e, t) => {
  T2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (a, n, s) => z1(e, a, n), e.enum = t.entries, e.options = Object.values(t.entries);
  const i = new Set(Object.keys(t.entries));
  e.extract = (a, n) => {
    const s = {};
    for (const o of a)
      if (i.has(o))
        s[o] = t.entries[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new oo({
      ...t,
      checks: [],
      ...Z(n),
      entries: s
    });
  }, e.exclude = (a, n) => {
    const s = { ...t.entries };
    for (const o of a)
      if (i.has(o))
        delete s[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new oo({
      ...t,
      checks: [],
      ...Z(n),
      entries: s
    });
  };
});
function Rt(e, t) {
  const i = Array.isArray(e) ? Object.fromEntries(e.map((a) => [a, a])) : e;
  return new oo({
    type: "enum",
    entries: i,
    ...Z(t)
  });
}
const Xv = /* @__PURE__ */ y("ZodLiteral", (e, t) => {
  A2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => U1(e, i, a), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function tt(e, t) {
  return new Xv({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...Z(t)
  });
}
const Qv = /* @__PURE__ */ y("ZodTransform", (e, t) => {
  O2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => M1(e, i), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new Bl(e.constructor.name);
    i.addIssue = (s) => {
      if (typeof s == "string")
        i.issues.push(Ca(s, i.value, t));
      else {
        const o = s;
        o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = i.value), o.inst ?? (o.inst = e), i.issues.push(Ca(o));
      }
    };
    const n = t.transform(i.value, i);
    return n instanceof Promise ? n.then((s) => (i.value = s, i.fallback = !0, i)) : (i.value = n, i.fallback = !0, i);
  };
});
function e6(e) {
  return new Qv({
    type: "transform",
    transform: e
  });
}
const yf = /* @__PURE__ */ y("ZodOptional", (e, t) => {
  df.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => mf(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function Ed(e) {
  return new yf({
    type: "optional",
    innerType: e
  });
}
const t6 = /* @__PURE__ */ y("ZodExactOptional", (e, t) => {
  x2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => mf(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function i6(e) {
  return new t6({
    type: "optional",
    innerType: e
  });
}
const a6 = /* @__PURE__ */ y("ZodNullable", (e, t) => {
  S2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => q1(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function Id(e) {
  return new a6({
    type: "nullable",
    innerType: e
  });
}
const n6 = /* @__PURE__ */ y("ZodDefault", (e, t) => {
  N2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => J1(e, i, a, n), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function s6(e, t) {
  return new n6({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Kl(t);
    }
  });
}
const o6 = /* @__PURE__ */ y("ZodPrefault", (e, t) => {
  C2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => Y1(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function r6(e, t) {
  return new o6({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Kl(t);
    }
  });
}
const kf = /* @__PURE__ */ y("ZodNonOptional", (e, t) => {
  D2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => G1(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function c6(e, t) {
  return new kf({
    type: "nonoptional",
    innerType: e,
    ...Z(t)
  });
}
const d6 = /* @__PURE__ */ y("ZodCatch", (e, t) => {
  V2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => X1(e, i, a, n), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function u6(e, t) {
  return new d6({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const l6 = /* @__PURE__ */ y("ZodPipe", (e, t) => {
  R2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => Q1(e, i, a, n), e.in = t.in, e.out = t.out;
});
function Td(e, t) {
  return new l6({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const f6 = /* @__PURE__ */ y("ZodReadonly", (e, t) => {
  P2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => ev(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function p6(e) {
  return new f6({
    type: "readonly",
    innerType: e
  });
}
const wf = /* @__PURE__ */ y("ZodCustom", (e, t) => {
  $2.init(e, t), we.init(e, t), e._zod.processJSONSchema = (i, a, n) => L1(e, i);
});
function g6(e, t) {
  return /* @__PURE__ */ x1(wf, e ?? (() => !0), t);
}
function m6(e, t = {}) {
  return /* @__PURE__ */ S1(wf, e, t);
}
function b6(e, t) {
  return /* @__PURE__ */ N1(e, t);
}
const Ai = 2, Ba = Rt([
  "white_canvas",
  "golden_bough_rebuild",
  "ring_conspiracy"
]), h6 = me({
  affectionAlbina: se().finite().optional(),
  trust: se().finite().optional(),
  danger: se().finite().optional(),
  artResonance: se().finite().optional(),
  composure: se().finite().optional(),
  materials: se().finite().optional(),
  leverage: se().finite().optional(),
  exposure: se().finite().optional()
}).strict(), _6 = me({
  route: Ba.optional(),
  values: h6.optional(),
  setFlags: Te(M().min(1)).optional(),
  clearFlags: Te(M().min(1)).optional(),
  unlockCg: Te(M().min(1)).optional(),
  grantItems: Te(M().min(1)).optional(),
  completeQuests: Te(M().min(1)).optional()
}).strict(), v6 = Rt([
  "affectionAlbina",
  "trust",
  "danger",
  "artResonance"
]), Ad = vf("kind", [
  me({
    kind: tt("value"),
    key: v6,
    operator: Rt(["gte", "lte", "eq"]),
    value: se().finite()
  }).strict(),
  me({
    kind: tt("flag"),
    flag: M().min(1),
    equals: rs()
  }).strict()
]), Ef = me({
  allOf: Te(Ad).min(1).optional(),
  anyOf: Te(Ad).min(1).optional(),
  fallback: rs().optional()
}).strict().refine((e) => e.allOf || e.anyOf || e.fallback === !0, {
  message: "Choice availability must declare predicates or a fallback"
}), y6 = me({
  route: Ba,
  kind: Rt(["true", "normal", "bad"]),
  eligibility: Ef
}).strict(), k6 = me({
  id: M().min(1),
  text: M().min(1),
  nextSceneId: M().min(1),
  resultText: M().min(1).optional(),
  resultVoiceAssetId: M().min(1).optional(),
  availability: Ef.optional(),
  effects: _6
}).strict(), w6 = me({
  characterId: M().min(1),
  portraitAssetId: M().min(1),
  position: Rt(["far-left", "left", "center", "right", "far-right"]),
  active: rs(),
  scale: se().positive().finite()
}).strict(), E6 = me({
  version: tt(Ai),
  id: M().min(1),
  chapter: se().int().nonnegative(),
  route: Ba,
  locationId: M().min(1),
  backgroundAssetId: M().min(1),
  cgAssetId: M().min(1).optional(),
  videoAssetId: M().min(1).optional(),
  desktopVideoAssetId: M().min(1).optional(),
  tone: M().min(1),
  portraits: Te(w6),
  speaker: M().min(1),
  text: M(),
  voiceAssetId: M().min(1).optional(),
  bgmAssetId: M().min(1).optional(),
  sfxAssetIds: Te(M().min(1)).optional(),
  choices: Te(k6),
  ending: y6.optional()
}).strict();
function I6(e) {
  return e.startsWith("/") || e.endsWith("/") || e.includes("\\") || e.includes(":") ? !1 : e.split("/").every((t) => t.length > 0 && t !== "." && t !== "..");
}
const cs = M().min(1).refine(I6, {
  message: "Asset paths must be relative to the canonical asset root"
}), T6 = me({
  id: M().min(1),
  kind: Rt(["image", "video", "audio", "json"]),
  path: cs,
  mimeType: M().min(1).optional(),
  sha256: M().regex(/^[a-f0-9]{64}$/i).optional(),
  bytes: se().int().nonnegative().optional()
}).strict(), A6 = vf("kind", [
  me({ kind: tt("static") }).strict(),
  me({
    kind: tt("strip"),
    frameCount: tt(8),
    frameWidth: se().int().positive(),
    frameHeight: se().int().positive(),
    fps: se().positive().finite()
  }).strict()
]), O6 = me({
  version: tt(Ai),
  id: M().min(1),
  characterId: M().min(1),
  path: cs,
  animation: A6,
  fallbackAssetId: M().min(1).optional()
}).strict(), x6 = me({
  version: tt(Ai),
  id: M().min(1),
  assetId: M().min(1),
  kind: Rt(["image", "image-edit", "video", "speech", "music"]),
  model: Rt(["gpt-image-2", "seedance-1.5-pro", "speech-2.8-hd", "music-2.6"]),
  status: Rt(["pending", "running", "completed", "failed"]),
  contentHash: M().regex(/^[a-f0-9]{64}$/i),
  inputAssetIds: Te(M().min(1)),
  outputPath: cs,
  attempts: se().int().nonnegative(),
  error: M().optional()
}).strict(), S6 = me({
  version: tt(Ai),
  projectId: tt("albina-galgame-card"),
  basePath: cs,
  assets: Te(T6),
  portraits: Te(O6),
  mediaJobs: Te(x6)
}).strict();
function xs(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
const If = S6.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.assets.forEach((a, n) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["assets", n, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id);
  }), e.portraits.forEach((a, n) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["portraits", n, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id), a.fallbackAssetId && !e.assets.some((s) => s.id === a.fallbackAssetId) && xs(t, ["portraits", n, "fallbackAssetId"], a.fallbackAssetId);
  }), e.mediaJobs.forEach((a, n) => {
    i.has(a.assetId) || xs(t, ["mediaJobs", n, "assetId"], a.assetId), a.inputAssetIds.forEach((s, o) => {
      i.has(s) || xs(t, ["mediaJobs", n, "inputAssetIds", o], s);
    });
  });
});
function N6(e) {
  return If.parse(e);
}
const C6 = me({
  white_canvas: M().min(1),
  golden_bough_rebuild: M().min(1),
  ring_conspiracy: M().min(1)
}).strict(), D6 = me({
  version: tt(Ai),
  projectId: tt("albina-galgame-card"),
  initialSceneId: M().min(1),
  routeEntrySceneIds: C6,
  scenes: Te(E6).min(1)
}).strict();
function Ss(e, t, i) {
  e.addIssue({
    code: "custom",
    path: t,
    message: `Unknown scene reference: ${i}`
  });
}
const Tf = D6.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  e.scenes.forEach((n, s) => {
    i.has(n.id) && t.addIssue({ code: "custom", path: ["scenes", s, "id"], message: `Duplicate scene id: ${n.id}` }), i.add(n.id), n.choices.forEach((o, r) => {
      a.has(o.id) && t.addIssue({ code: "custom", path: ["scenes", s, "choices", r, "id"], message: `Duplicate choice id: ${o.id}` }), a.add(o.id);
    });
  }), i.has(e.initialSceneId) || Ss(t, ["initialSceneId"], e.initialSceneId), Object.entries(e.routeEntrySceneIds).forEach(([n, s]) => {
    i.has(s) || Ss(t, ["routeEntrySceneIds", n], s);
  }), e.scenes.forEach((n, s) => {
    n.choices.forEach((o, r) => {
      i.has(o.nextSceneId) || Ss(t, ["scenes", s, "choices", r, "nextSceneId"], o.nextSceneId);
    });
  });
});
function V6(e) {
  const t = If.parse(e), i = new Map(t.assets.map((n) => [n.id, n])), a = new Set(t.portraits.map((n) => n.id));
  return Tf.superRefine((n, s) => {
    n.scenes.forEach((o, r) => {
      [
        [o.backgroundAssetId, ["scenes", r, "backgroundAssetId"]],
        [o.cgAssetId, ["scenes", r, "cgAssetId"]]
      ].forEach(([u, p]) => u && Di(s, i, u, "image", p)), [
        [o.videoAssetId, ["scenes", r, "videoAssetId"]],
        [o.desktopVideoAssetId, ["scenes", r, "desktopVideoAssetId"]]
      ].forEach(([u, p]) => u && Di(s, i, u, "video", p)), [
        [o.voiceAssetId, ["scenes", r, "voiceAssetId"]],
        [o.bgmAssetId, ["scenes", r, "bgmAssetId"]]
      ].forEach(([u, p]) => u && Di(s, i, u, "audio", p)), o.sfxAssetIds?.forEach((u, p) => Di(s, i, u, "audio", ["scenes", r, "sfxAssetIds", p])), o.portraits.forEach((u, p) => {
        a.has(u.portraitAssetId) || Af(s, ["scenes", r, "portraits", p, "portraitAssetId"], u.portraitAssetId);
      }), o.choices.forEach((u, p) => {
        u.resultVoiceAssetId && Di(s, i, u.resultVoiceAssetId, "audio", ["scenes", r, "choices", p, "resultVoiceAssetId"]), u.effects.unlockCg?.forEach((g, b) => Di(s, i, g, "image", ["scenes", r, "choices", p, "effects", "unlockCg", b]));
      });
    });
  });
}
function Af(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
function Di(e, t, i, a, n) {
  const s = t.get(i);
  if (!s) {
    Af(e, n, i);
    return;
  }
  s.kind !== a && e.addIssue({ code: "custom", path: n, message: `Asset ${i} must be ${a}, found ${s.kind}` });
}
function R6(e, t) {
  return t === void 0 ? Tf.parse(e) : V6(t).parse(e);
}
const P6 = me({ intimacy: se().finite(), reliance: se().finite(), obsession: se().finite(), suspicion: se().finite() }).strict(), $6 = me({ composure: se().finite(), materials: se().finite(), leverage: se().finite(), exposure: se().finite() }).strict(), j6 = me({ blade: se().finite(), boundary: se().finite(), analysis: se().finite(), resonance: se().finite() }).strict(), F6 = me({
  affectionAlbina: se().finite(),
  trust: se().finite(),
  danger: se().finite(),
  artResonance: se().finite(),
  relationshipVectors: P6,
  routeEconomy: $6,
  conflictMastery: j6
}).strict(), z6 = me({
  name: M(),
  gender: M(),
  appearance: M(),
  background: M(),
  addressName: M(),
  boundaries: M(),
  routePreference: Ba
}).strict(), U6 = me({
  ownedIds: Te(M().min(1)),
  equipped: me({
    weapon: M().min(1).optional(),
    armor: M().min(1).optional(),
    accessory: M().min(1).optional(),
    tool: M().min(1).optional()
  }).strict(),
  outfitIds: Te(M().min(1)),
  activeOutfitId: M()
}).strict();
function ro(e, t) {
  if (e === null || typeof e == "string" || typeof e == "boolean") return !0;
  if (typeof e == "number") return Number.isFinite(e);
  if (typeof e != "object" || t.has(e)) return !1;
  t.add(e);
  const i = Array.isArray(e) ? e.every((a) => ro(a, t)) : (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null) && Object.values(e).every((a) => ro(a, t));
  return t.delete(e), i;
}
const L6 = g6((e) => e !== null && typeof e == "object" && !Array.isArray(e) && ro(e, /* @__PURE__ */ new WeakSet()), { message: "Log entries must contain only finite JSON values" }), Ie = Te(L6), M6 = me({
  history: Ie,
  timeline: Ie,
  routeActions: Ie,
  routeActivity: Ie,
  progressionUnlocks: Ie,
  consequences: Ie,
  routeEvents: Ie,
  replayAnchors: Ie,
  routeObjectives: Ie,
  watchSignals: Ie,
  narrativeIndex: Ie,
  openingDrafts: Ie,
  conflicts: Ie,
  exchanges: Ie,
  contacts: Ie,
  achievements: Ie,
  realityOverlays: Ie,
  sceneBranches: Ie,
  story: Ie,
  storySummaries: Ie,
  dynamicMemories: Ie
}).strict(), Of = me({
  version: tt(Ai),
  projectId: tt("albina-galgame-card"),
  saveId: M().min(1),
  createdAt: M().min(1),
  updatedAt: M().min(1),
  playerProfile: z6,
  route: Ba,
  chapter: se().int().nonnegative(),
  sceneId: M().min(1),
  locationId: M(),
  values: F6,
  flags: Yv(M().min(1), rs()),
  inventory: U6,
  quests: me({
    completedNodeIds: Te(M().min(1)),
    currentMapNodeId: M(),
    progressLog: Ie
  }).strict(),
  unlockedCg: Te(M().min(1)),
  logs: M6
}).strict(), Od = "1970-01-01T00:00:00.000Z";
function B6() {
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
function Z6() {
  return {
    version: Ai,
    projectId: "albina-galgame-card",
    saveId: "albina-v2-recovered",
    createdAt: Od,
    updatedAt: Od,
    playerProfile: {
      name: "{{user}}",
      gender: "成年男性",
      appearance: "黑发，英俊，穿深色长外套，气质冷静而危险。",
      background: "暂未确认；可由玩家设定。",
      addressName: "{{user}}",
      boundaries: "成人自愿，亲密推进需要明确同意；允许黑暗都市暴力，但不允许强迫或失能式亲密。",
      routePreference: "white_canvas"
    },
    route: "white_canvas",
    chapter: 1,
    sceneId: "opening_001",
    locationId: "backstreets_rain",
    values: {
      affectionAlbina: 0,
      trust: 0,
      danger: 0,
      artResonance: 0,
      relationshipVectors: { intimacy: 0, reliance: 0, obsession: 0, suspicion: 0 },
      routeEconomy: { composure: 60, materials: 3, leverage: 0, exposure: 0 },
      conflictMastery: { blade: 0, boundary: 0, analysis: 0, resonance: 0 }
    },
    flags: { met_albina: !0 },
    inventory: { ownedIds: [], equipped: {}, outfitIds: [], activeOutfitId: "" },
    quests: { completedNodeIds: [], currentMapNodeId: "", progressLog: [] },
    unlockedCg: ["opening_rain"],
    logs: B6()
  };
}
function co(e) {
  return Array.isArray(e) ? e.map(co) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).sort(([t], [i]) => t < i ? -1 : t > i ? 1 : 0).map(([t, i]) => [t, co(i)])) : e;
}
function H6(e) {
  return JSON.stringify(co(Of.parse(e)), null, 2);
}
function jn(e) {
  return Of.parse(e);
}
function xd(e, t) {
  if (e.kind === "flag") return (t.flags[e.flag] ?? !1) === e.equals;
  const i = t.values[e.key];
  return e.operator === "gte" ? i >= e.value : e.operator === "lte" ? i <= e.value : i === e.value;
}
function K6(e, t) {
  if (!e) return !0;
  const i = e.allOf?.every((n) => xd(n, t)) ?? !0, a = e.anyOf?.some((n) => xd(n, t)) ?? !0;
  return e.fallback === !0 || i && a;
}
class Qa {
  constructor(t, i = {}) {
    this.script = t, this.sceneById = new Map(t.scenes.map((a) => [a.id, a])), this.now = i.now ?? (() => (/* @__PURE__ */ new Date()).toISOString()), this.save = structuredClone(i.save ?? Z6()), this.sceneById.has(this.save.sceneId) || (this.save.sceneId = t.initialSceneId);
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
    return this.scene.choices.filter((t) => K6(t.availability, this.save));
  }
  replaceSave(t) {
    if (!this.sceneById.has(t.sceneId)) throw new Error(`Save references unknown scene: ${t.sceneId}`);
    this.save = structuredClone(t);
  }
  choose(t) {
    const i = this.choices.find((s) => s.id === t);
    if (!i) throw new Error(`Choice is unavailable: ${t}`);
    const a = i.effects;
    a.route && (this.save.route = a.route);
    for (const [s, o] of Object.entries(a.values ?? {}))
      if (o !== void 0)
        if (s in this.save.values) {
          const r = s;
          this.save.values[r] += o;
        } else {
          const r = s;
          this.save.values.routeEconomy[r] += o;
        }
    a.setFlags?.forEach((s) => {
      this.save.flags[s] = !0;
    }), a.clearFlags?.forEach((s) => {
      this.save.flags[s] = !1;
    }), a.unlockCg?.forEach((s) => {
      this.save.unlockedCg.includes(s) || this.save.unlockedCg.push(s);
    }), a.grantItems?.forEach((s) => {
      this.save.inventory.ownedIds.includes(s) || this.save.inventory.ownedIds.push(s);
    }), a.completeQuests?.forEach((s) => {
      this.save.quests.completedNodeIds.includes(s) || this.save.quests.completedNodeIds.push(s);
    });
    const n = this.sceneById.get(i.nextSceneId);
    if (!n) throw new Error(`Choice references unknown scene: ${i.nextSceneId}`);
    return this.save.sceneId = n.id, this.save.chapter = n.chapter, this.save.route = n.route, this.save.locationId = n.locationId, this.save.updatedAt = this.now(), this.save.logs.sceneBranches.push({ choiceId: t, sceneId: n.id, at: this.save.updatedAt }), { choice: i, ...i.resultText ? { resultText: i.resultText } : {}, scene: n };
  }
  interpolate(t) {
    return t.replaceAll("{{user}}", this.save.playerProfile.name || "你");
  }
}
class W6 {
  constructor(t, i, a, n = (s, o) => fetch(s, o)) {
    this.manifest = t, this.storage = i, this.baseUrl = a, this.fetchAsset = n;
  }
  manifest;
  storage;
  baseUrl;
  fetchAsset;
  inflight = /* @__PURE__ */ new Map();
  remoteUrl(t) {
    return Mo(this.manifest, t, this.baseUrl);
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
        const n = await this.fetchAsset(a, { credentials: "omit", mode: "cors" });
        return n.ok ? (await this.storage.cacheAsset(t, await n.blob()), await this.storage.getAssetUrl(t) ?? a) : a;
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
    const n = `${this.baseUrl.replace(/\/$/u, "")}/${this.manifest.basePath}/${i.path.split("/").map(encodeURIComponent).join("/")}`;
    try {
      const s = await this.fetchAsset(n, { credentials: "omit", mode: "cors" });
      return s.ok ? (await this.storage.cacheAsset(t, await s.blob()), await this.storage.getAssetUrl(t) ?? n) : n;
    } catch {
      return n;
    }
  }
  singleFlight(t, i) {
    const a = this.inflight.get(t);
    if (a) return a;
    const s = i().then(
      (o) => (this.inflight.get(t) === s && this.inflight.delete(t), o),
      (o) => {
        throw this.inflight.get(t) === s && this.inflight.delete(t), o;
      }
    );
    return this.inflight.set(t, s), s;
  }
  async prefetch(t) {
    const i = /* @__PURE__ */ new Map();
    for (const a of new Set(t)) {
      const n = await this.cache(a);
      n && i.set(a, n);
    }
    return i;
  }
}
const Sd = "albina-v2-save", Ns = "albinaSaveV2";
function Cs() {
  return typeof window > "u" ? void 0 : window.TavernHelper;
}
function q6() {
  return {
    getChatId: () => Cs()?.getChatId?.() ?? "standalone",
    async loadSave() {
      const e = Cs();
      if (e?.getVariables) {
        const i = await e.getVariables({ type: "chat" });
        if (i[Ns]) return jn(i[Ns]);
      }
      const t = typeof localStorage > "u" ? null : localStorage.getItem(Sd);
      return t ? jn(JSON.parse(t)) : void 0;
    },
    async saveSave(e) {
      const t = Cs();
      t?.setVariables && await t.setVariables({ [Ns]: e }, { type: "chat" }), typeof localStorage < "u" && localStorage.setItem(Sd, JSON.stringify(e));
    },
    subscribe(e, t) {
      if (typeof window > "u") return () => {
      };
      const i = `albina:${e}`;
      return window.addEventListener(i, t), () => window.removeEventListener(i, t);
    }
  };
}
function G6(e) {
  return new Audio(e);
}
function jt(e) {
  e && (e.pause(), e.currentTime = 0, e.src = "");
}
class J6 {
  constructor(t = G6) {
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
    const a = this.lifecycleGeneration, n = ++this.bgmGeneration, s = this.takePreviousBgm(), o = this.createAudio(t);
    o.src = t, o.loop = !0, o.volume = i > 0 ? 0 : this.bgmVolume(), this.bgm = o, this.pendingBgmPrevious = s;
    const r = () => this.isCurrentBgm(o, a, n);
    return await this.tryPlay(o, r) ? (this.pendingBgmPrevious = void 0, !s || i <= 0 ? (jt(s), o.volume = this.bgmVolume(), !0) : (await this.crossfade(s, o, i), r())) : (r(), !1);
  }
  enqueueVoice(t) {
    const i = new Promise((a) => this.voiceQueue.push({ source: t, resolve: a }));
    return this.playNextVoice(), i;
  }
  async playSfx(t) {
    const i = this.createAudio(t);
    i.src = t, i.loop = !1;
    const a = () => {
      i.removeEventListener("ended", a), this.sfx.delete(i), jt(i);
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
      return await t.play(), this.isCurrentBlocked(t, i) ? (this.blocked = void 0, t === this.bgm && this.pendingBgmPrevious && (jt(this.pendingBgmPrevious), this.pendingBgmPrevious = void 0, t.volume = this.bgmVolume()), !0) : !1;
    } catch {
      return !1;
    }
  }
  stopAll() {
    this.lifecycleGeneration += 1, this.bgmGeneration += 1, this.cancelFade(), this.finishVoice(!1), this.voiceQueue.splice(0).forEach((i) => i.resolve(!1));
    const t = /* @__PURE__ */ new Set([this.bgm, this.blocked, this.pendingBgmPrevious, this.fadingOut]);
    this.sfx.forEach((i) => t.add(i)), t.forEach(jt), this.sfx.clear(), this.bgm = void 0, this.blocked = void 0, this.pendingBgmPrevious = void 0, this.fadingOut = void 0;
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
    const n = this.lifecycleGeneration;
    this.tryPlay(i, () => this.lifecycleGeneration === n && this.voice === i);
  }
  finishVoice(t) {
    const i = this.voice;
    i && this.voiceEnded && i.removeEventListener("ended", this.voiceEnded), jt(i), this.blocked === i && (this.blocked = void 0), this.voice = void 0, this.voiceEnded = void 0;
    const a = this.activeVoiceJob;
    this.activeVoiceJob = void 0, i && this.bgm && (this.bgm.volume = 1), a?.resolve(t);
  }
  crossfade(t, i, a) {
    const s = a / 10, o = t.volume;
    let r = 0;
    return new Promise((c) => {
      this.fadingOut = t, this.fadeFinish = c;
      const d = () => {
        r += 1, t.volume = Math.max(0, o * (1 - r / 10)), i.volume = this.bgmVolume() * Math.min(1, r / 10), r >= 10 ? (jt(t), this.fadingOut = void 0, this.fadeTimer = void 0, this.fadeFinish = void 0, c()) : this.fadeTimer = setTimeout(d, s);
      };
      this.fadeTimer = setTimeout(d, s);
    });
  }
  cancelFade() {
    this.fadeTimer !== void 0 && clearTimeout(this.fadeTimer), this.fadeTimer = void 0, jt(this.fadingOut), this.fadingOut = void 0, this.fadeFinish?.(), this.fadeFinish = void 0;
  }
  takePreviousBgm() {
    if (this.pendingBgmPrevious) {
      const t = this.pendingBgmPrevious;
      return this.pendingBgmPrevious = void 0, this.blocked === this.bgm && (this.blocked = void 0), jt(this.bgm), t;
    }
    if (this.blocked === this.bgm) {
      this.blocked = void 0, jt(this.bgm);
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
class Y6 {
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
function X6() {
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
class Q6 {
  constructor(t, i, a = "") {
    this.manifest = t, this.baseUrl = a, this.environment = i ?? X6();
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
    const a = this.lifecycleGeneration, n = this.nextCanvasGeneration(i), s = this.findPortrait(t), o = i.getContext("2d");
    if (!o) throw new Error("Portrait canvas does not expose a 2D context");
    if (s.animation.kind === "static" || this.environment.reducedMotion()) {
      await this.drawStatic(s, o, i, a, n) && this.isCurrent(i, a, n) && this.playbacks.add({ canvas: i });
      return;
    }
    await this.playStrip(s, o, i, a, n);
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
  async drawStatic(t, i, a, n, s) {
    const o = t.fallbackAssetId ? this.manifest.assets.find((c) => c.id === t.fallbackAssetId) : void 0;
    let r;
    try {
      const c = await this.urlResolver?.(o?.id ?? t.id);
      r = await this.environment.loadImage(c ?? this.assetUrl(o?.path ?? t.path));
    } catch {
      return !1;
    }
    if (!this.isCurrent(a, n, s)) return !1;
    if (i.clearRect(0, 0, a.width, a.height), !o && t.animation.kind === "strip") {
      const c = t.animation;
      i.drawImage(r, 0, 0, c.frameWidth, c.frameHeight, 0, 0, a.width, a.height);
    } else i.drawImage(r, 0, 0, a.width, a.height);
    return !0;
  }
  async playStrip(t, i, a, n, s) {
    if (t.animation.kind !== "strip") return;
    const o = t.animation;
    let r;
    try {
      const u = await this.urlResolver?.(t.id);
      r = await this.environment.loadImage(u ?? this.assetUrl(t.path));
    } catch {
      if (!t.fallbackAssetId) return;
      await this.drawStatic(t, i, a, n, s) && this.isCurrent(a, n, s) && this.playbacks.add({ canvas: a });
      return;
    }
    if (!this.isCurrent(a, n, s)) return;
    const c = { canvas: a };
    this.playbacks.add(c);
    let d;
    const l = (u) => {
      if (!this.isCurrent(a, n, s)) return;
      d ??= u;
      const p = u - d, g = Math.floor(p / (1e3 / o.fps)) % o.frameCount;
      i.clearRect(0, 0, a.width, a.height), i.drawImage(r, g * o.frameWidth, 0, o.frameWidth, o.frameHeight, 0, 0, a.width, a.height), c.frameHandle = this.environment.requestFrame(l);
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
const en = "queue";
class e5 {
  constructor(t) {
    this.storage = t;
  }
  storage;
  operationTail = Promise.resolve();
  async enqueue(t) {
    await this.runExclusive(async () => {
      const i = await this.readQueue();
      i.push(t), await this.storage.setValue("specialCg", en, i);
    });
  }
  async peek() {
    return this.runExclusive(async () => (await this.readQueue())[0]);
  }
  async dequeue() {
    return this.runExclusive(async () => {
      const t = await this.readQueue(), i = t.shift();
      return await this.storage.setValue("specialCg", en, t), i;
    });
  }
  async clear() {
    await this.runExclusive(() => this.storage.deleteValue("specialCg", en));
  }
  async readQueue() {
    return await this.storage.getValue("specialCg", en) ?? [];
  }
  runExclusive(t) {
    const i = this.operationTail.then(t, t);
    return this.operationTail = i.then(() => {
    }, () => {
    }), i;
  }
}
const t5 = ["assets", "gallery", "specialCg", "saves"];
function tn(e) {
  return new Promise((t, i) => {
    e.onsuccess = () => t(e.result), e.onerror = () => i(e.error ?? new Error("IndexedDB request failed"));
  });
}
class i5 {
  constructor(t = indexedDB, i = "albina-runtime-v2") {
    this.factory = t, this.databaseName = i;
  }
  factory;
  databaseName;
  database;
  async get(t, i) {
    const a = await this.open();
    return tn(a.transaction(t, "readonly").objectStore(t).get(i));
  }
  async put(t, i, a) {
    const n = await this.open();
    await tn(n.transaction(t, "readwrite").objectStore(t).put(a, i));
  }
  async delete(t, i) {
    const a = await this.open();
    await tn(a.transaction(t, "readwrite").objectStore(t).delete(i));
  }
  async keys(t) {
    const i = await this.open();
    return (await tn(i.transaction(t, "readonly").objectStore(t).getAllKeys())).map(String);
  }
  close() {
    this.database?.then((t) => t.close()), this.database = void 0;
  }
  open() {
    return this.database ??= new Promise((t, i) => {
      const a = this.factory.open(this.databaseName, 1);
      a.onupgradeneeded = () => {
        for (const n of t5)
          a.result.objectStoreNames.contains(n) || a.result.createObjectStore(n);
      }, a.onsuccess = () => t(a.result), a.onerror = () => i(a.error ?? new Error("Unable to open IndexedDB"));
    }), this.database;
  }
}
function a5() {
  if (typeof URL.createObjectURL == "function")
    return { createObjectURL: (e) => URL.createObjectURL(e), revokeObjectURL: (e) => URL.revokeObjectURL(e) };
}
class n5 {
  constructor(t = new i5(), i) {
    this.backend = t, this.urlApi = i ?? a5();
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
    const n = this.objectUrlGeneration, s = this.createAssetUrl(t, n);
    this.pendingObjectUrls.set(t, s);
    const o = () => {
      this.pendingObjectUrls.get(t) === s && this.pendingObjectUrls.delete(t);
    };
    return s.then(o, o), s;
  }
  async saveSnapshot(t, i) {
    await this.backend.put("saves", t.saveId, { save: t, thumbnail: i });
  }
  async loadSnapshot(t) {
    return this.backend.get("saves", t);
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
    const n = this.objectUrls.get(t);
    if (n) return n;
    const s = this.urlApi.createObjectURL(a);
    if (i !== this.objectUrlGeneration) {
      this.urlApi.revokeObjectURL(s);
      return;
    }
    return this.objectUrls.set(t, s), s;
  }
}
class s5 {
  active;
  write(t, i, a = 24) {
    return this.cancel(), t.length === 0 ? (i(""), Promise.resolve("")) : new Promise((n) => {
      let s = 0;
      const o = { text: t, sink: i, visible: "", resolve: n }, r = () => {
        o.visible = t.slice(0, s + 1), s += 1, i(o.visible), s >= t.length ? this.settle(o, t) : o.timer = setTimeout(r, Math.max(0, a));
      };
      this.active = o, o.timer = setTimeout(r, Math.max(0, a));
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
class o5 {
  constructor(t) {
    this.bindings = t;
  }
  bindings;
  getChatId() {
    return this.bindings.getChatId();
  }
  loadSave() {
    return this.bindings.loadSave();
  }
  saveSave(t) {
    return this.bindings.saveSave(t);
  }
  subscribe(t, i) {
    return this.bindings.subscribe(t, i);
  }
}
class r5 {
  host;
  audio;
  portraits;
  gallery;
  storage;
  specialCg;
  typewriter = new s5();
  subscriptions = [];
  mounted = !1;
  constructor(t) {
    this.host = new o5(t.host), this.audio = new J6(t.audioFactory), this.storage = new n5(t.storageBackend, t.objectUrls), this.portraits = new Q6(t.manifest, t.portraits, t.assetBaseUrl), this.gallery = new Y6(this.storage), this.specialCg = new e5(this.storage);
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
function c5(e) {
  return new r5(e);
}
function xf(e) {
  return new Promise((t) => {
    try {
      e.toBlob((i) => t(i ?? void 0), "image/jpeg", 0.82);
    } catch {
      t(void 0);
    }
  });
}
async function d5() {
  const e = document.createElement("canvas");
  e.width = 480, e.height = 270;
  const t = e.getContext("2d");
  if (!t) return new Blob(["thumbnail unavailable"], { type: "text/plain" });
  const i = t.createLinearGradient(0, 0, e.width, e.height);
  return i.addColorStop(0, "#050812"), i.addColorStop(1, "#3a2b13"), t.fillStyle = i, t.fillRect(0, 0, e.width, e.height), t.fillStyle = "#e2c46e", t.font = "28px serif", t.fillText("ALBINA", 28, 54), await xf(e) ?? new Blob(["thumbnail unavailable"], { type: "text/plain" });
}
async function Nd(e = document) {
  const t = document.createElement("canvas");
  t.width = 480, t.height = 270;
  const i = t.getContext("2d");
  if (!i) return { blob: new Blob(["thumbnail unavailable"], { type: "text/plain" }), capturedMedia: !1 };
  const a = e.querySelector(".game-screen__video, .game-screen__cg, .game-screen__background");
  let n = !1;
  if (a)
    try {
      i.drawImage(a, 0, 0, t.width, t.height), n = !0;
    } catch {
      n = !1;
    }
  if (!n) {
    const o = i.createLinearGradient(0, 0, t.width, t.height);
    o.addColorStop(0, "#050812"), o.addColorStop(1, "#3a2b13"), i.fillStyle = o, i.fillRect(0, 0, t.width, t.height), i.fillStyle = "#e2c46e", i.font = "28px serif", i.fillText("ALBINA", 28, 54);
  }
  const s = await xf(t);
  return { blob: s ?? await d5(), capturedMedia: !!(s && n) };
}
function Sf(e, t) {
  if (!(!t.videoEnabled || t.reducedMotion))
    return t.desktop && e.desktopVideoAssetId ? e.desktopVideoAssetId : e.videoAssetId;
}
function u5(e, t, i, a = (n) => Mo(t, n, i.baseUrl)) {
  const n = e.cgAssetId ?? e.backgroundAssetId, s = a(n), o = a(e.backgroundAssetId), r = Sf(e, i), c = r ? a(r) : void 0;
  return { ...o ? { backgroundUrl: o } : {}, ...s ? { fallbackUrl: s } : {}, ...c ? { videoUrl: c } : {} };
}
const fi = N6(T_), la = R6(C_, fi), l5 = new Map(la.scenes.map((e) => [e.id, e]));
function f5() {
  return new URL(
    /* @vite-ignore */
    "../",
    import.meta.url
  ).href;
}
const p5 = /* @__PURE__ */ p_("albina-game", () => {
  const e = f5(), t = Ct(c5({ manifest: fi, host: q6(), assetBaseUrl: e })), i = Ct(new W6(fi, t.storage, e));
  t.portraits.setUrlResolver(async (h) => fi.portraits.some((_) => _.id === h) ? i.cachePortrait(h) : i.cache(h));
  const a = /* @__PURE__ */ pp(new Qa(la)), n = /* @__PURE__ */ Se("title"), s = /* @__PURE__ */ Se(""), o = /* @__PURE__ */ Se(), r = /* @__PURE__ */ Se(!1), c = /* @__PURE__ */ Se(!1), d = /* @__PURE__ */ Se(!0), l = /* @__PURE__ */ Se(!1), u = /* @__PURE__ */ Se(!1), p = /* @__PURE__ */ Se([]), g = /* @__PURE__ */ Se({}), b = /* @__PURE__ */ Se({}), w = /* @__PURE__ */ Se([]), E = /* @__PURE__ */ new Set(), A = typeof matchMedia == "function" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0, z = /* @__PURE__ */ Se(A?.matches ?? !1), R = /* @__PURE__ */ Se(typeof innerWidth == "number" ? innerWidth > 800 : !0);
  let H, N, ee;
  const B = (h) => {
    z.value = h.matches, h.matches ? Ce(q.value.cgAssetId ?? q.value.backgroundAssetId) : P(q.value);
  }, le = () => {
    R.value = innerWidth > 800, P(q.value);
  };
  A?.addEventListener("change", B), typeof window < "u" && (window.addEventListener("resize", le), window.addEventListener("orientationchange", le));
  const q = Xt(() => a.value.scene), j = Xt(() => a.value.save), $ = Xt(() => a.value.choices), Q = Xt(() => u5(q.value, fi, {
    baseUrl: e,
    desktop: R.value,
    reducedMotion: z.value,
    videoEnabled: d.value && !u.value
  }, (h) => h?.startsWith("video.") && !b.value[h] ? void 0 : re(h)));
  function re(h) {
    if (h)
      return g.value[h] ?? Mo(fi, h, e);
  }
  async function Ce(h) {
    if (!h) return;
    const _ = await i.cache(h);
    _ && (g.value = { ...g.value, [h]: _ });
  }
  async function je(h) {
    const _ = [
      h.backgroundAssetId,
      h.cgAssetId,
      h.voiceAssetId,
      h.bgmAssetId,
      ...h.sfxAssetIds ?? []
    ].filter((O) => !!O), F = await i.prefetch(_);
    F.size && (g.value = { ...g.value, ...Object.fromEntries(F) });
    for (const O of h.portraits) await i.cachePortrait(O.portraitAssetId);
  }
  function pe() {
    return { baseUrl: e, desktop: R.value, reducedMotion: z.value, videoEnabled: d.value && !u.value };
  }
  async function P(h) {
    const _ = Sf(h, pe());
    if (!_ || b.value[_]) return;
    const F = await i.cache(_);
    F && (g.value = { ...g.value, [_]: F }, b.value = { ...b.value, [_]: !0 });
  }
  function J() {
    const h = q.value.choices.map((_) => l5.get(_.nextSceneId)).filter((_) => !!_);
    (async () => {
      for (const _ of h) await je(_);
    })();
  }
  async function te() {
    if (!c.value) {
      if (q.value.bgmAssetId && H !== q.value.bgmAssetId) {
        H = q.value.bgmAssetId;
        const h = re(H);
        h && (l.value = !await t.audio.playBgm(h));
      }
      for (const h of q.value.sfxAssetIds ?? []) {
        const _ = re(h);
        _ && t.audio.playSfx(_);
      }
      if (q.value.voiceAssetId) {
        const h = re(q.value.voiceAssetId);
        h && t.audio.enqueueVoice(h);
      }
    }
  }
  async function Me() {
    u.value = !1, await je(q.value), s.value = "";
    const h = a.value.interpolate(q.value.text);
    t.typewriter.write(h, (_) => {
      s.value = _;
    }, z.value ? 0 : 18), te(), q.value.cgAssetId && (await t.gallery.unlock(q.value.cgAssetId, j.value), N !== q.value.id && (N = q.value.id, await t.specialCg.enqueue({ id: q.value.id, assetId: q.value.cgAssetId })), p.value = await t.gallery.list(j.value)), P(q.value), J();
  }
  async function Ue() {
    t.mount(), n.value = "game", await Me();
  }
  async function Oe() {
    r.value = !0;
    try {
      const h = await t.host.loadSave();
      return h ? (a.value = new Qa(la, { save: h }), await Ue(), !0) : !1;
    } finally {
      r.value = !1;
    }
  }
  async function Be(h) {
    t.typewriter.completeNow();
    const _ = a.value.choose(h);
    mp(a), o.value = _.resultText ? a.value.interpolate(_.resultText) : void 0;
    const F = _.choice.resultVoiceAssetId;
    await Ce(F);
    const O = re(F);
    !c.value && O && t.audio.enqueueVoice(O), o.value || await Me();
  }
  async function qt() {
    o.value = void 0, await Me();
  }
  async function Gt(h, _) {
    const F = (/* @__PURE__ */ new Date()).toISOString(), O = { ...structuredClone(j.value), saveId: h, updatedAt: F }, K = ee ?? (await Nd()).blob;
    await t.storage.saveSnapshot(O, K), _ && await t.host.saveSave(O), await Jt();
  }
  async function ds() {
    await Gt("quick-save", !0);
  }
  async function si(h) {
    await Gt(`slot-${h}`, !1);
  }
  async function Jt() {
    E.forEach((_) => URL.revokeObjectURL(_)), E.clear();
    const h = [];
    for (const _ of await t.storage.keys("saves")) {
      const F = await t.storage.loadSnapshot(_);
      if (!F) continue;
      const O = F.thumbnail.type.startsWith("image/") ? URL.createObjectURL(F.thumbnail) : void 0;
      O && E.add(O), h.push({ id: _, sceneId: F.save.sceneId, updatedAt: F.save.updatedAt, ...O ? { thumbnailUrl: O } : {} });
    }
    w.value = h.sort((_, F) => F.updatedAt.localeCompare(_.updatedAt));
  }
  async function ta() {
    n.value === "game" && (ee = (await Nd()).blob), await Jt(), n.value = "saves";
  }
  async function Za(h) {
    const _ = await t.storage.loadSnapshot(h);
    _ && (a.value = new Qa(la, { save: jn(_.save) }), n.value = "game", await Me());
  }
  async function oi(h) {
    await t.storage.deleteValue("saves", h), await Jt();
  }
  function Jo() {
    return H6(j.value);
  }
  async function f(h) {
    a.value = new Qa(la, { save: jn(JSON.parse(h)) }), n.value = "game", await Me();
  }
  async function m() {
    p.value = await t.gallery.list(j.value), await Promise.all(p.value.map(Ce)), n.value = "gallery";
  }
  function v() {
    n.value = "game";
  }
  async function T() {
    l.value = !await t.audio.recoverAutoplay();
  }
  function I() {
    t.typewriter.completeNow();
  }
  function k() {
    u.value = !0;
  }
  function C() {
    c.value = !c.value, c.value ? (t.audio.stopAll(), H = void 0) : te();
  }
  function x() {
    A?.removeEventListener("change", B), typeof window < "u" && (window.removeEventListener("resize", le), window.removeEventListener("orientationchange", le)), E.forEach((h) => URL.revokeObjectURL(h)), E.clear();
  }
  return {
    runtime: t,
    manifest: fi,
    screen: n,
    visibleText: s,
    resultText: o,
    loading: r,
    muted: c,
    videoEnabled: d,
    reducedMotion: z,
    autoplayBlocked: l,
    galleryIds: p,
    saveSlots: w,
    scene: q,
    save: j,
    choices: $,
    media: Q,
    assetUrl: re,
    start: Ue,
    continueGame: Oe,
    choose: Be,
    dismissResult: qt,
    quickSave: ds,
    saveSlot: si,
    openSaves: ta,
    restoreSlot: Za,
    deleteSlot: oi,
    exportSave: Jo,
    importSave: f,
    openGallery: m,
    backToGame: v,
    recoverAutoplay: T,
    completeText: I,
    setVideoFailed: k,
    toggleMute: C,
    disposeUiListeners: x
  };
}), g5 = ["data-screen"], m5 = {
  key: 0,
  class: "title-screen",
  "data-testid": "title-screen"
}, b5 = { class: "title-screen__content" }, h5 = {
  class: "title-actions",
  "aria-label": "主菜单"
}, _5 = ["disabled"], v5 = { class: "build-state" }, y5 = {
  key: 1,
  class: "panel-screen",
  "data-testid": "saves-screen"
}, k5 = { class: "slot-actions" }, w5 = { class: "save-slot-grid" }, E5 = ["data-save-id"], I5 = ["src"], T5 = ["onClick"], A5 = ["onClick"], O5 = { key: 0 }, x5 = {
  key: 2,
  class: "panel-screen",
  "data-testid": "gallery-screen"
}, S5 = { class: "gallery-grid" }, N5 = ["src", "alt"], C5 = { key: 0 }, D5 = {
  key: 3,
  class: "panel-screen",
  "data-testid": "settings-screen"
}, V5 = ["checked"], R5 = ["data-scene-id"], P5 = ["src"], $5 = ["src", "poster"], j5 = ["src"], F5 = { class: "game-hud" }, z5 = {
  key: 0,
  class: "result-overlay",
  "data-testid": "choice-result"
}, U5 = {
  key: 1,
  class: "choice-list"
}, L5 = ["data-choice-id", "onClick"], M5 = {
  key: 0,
  class: "ending-mark"
}, B5 = { class: "save-tools" }, Z5 = /* @__PURE__ */ yu({
  __name: "App",
  setup(e) {
    const t = p5(), i = /* @__PURE__ */ Se(""), a = /* @__PURE__ */ Se(""), n = Xt(() => t.galleryIds.map((r) => ({ id: r, url: t.assetUrl(r) })).filter((r) => r.url));
    function s() {
      a.value = t.exportSave();
    }
    async function o() {
      i.value.trim() && await t.importSave(i.value);
    }
    return Io(() => {
      t.disposeUiListeners(), t.runtime.unmount();
    }), (r, c) => (he(), ve("main", {
      class: "albina-app",
      "data-albina-application": "",
      "data-screen": V(t).screen
    }, [
      V(t).screen === "title" ? (he(), ve("section", m5, [
        c[28] || (c[28] = L("div", { class: "title-screen__veil" }, null, -1)),
        L("div", b5, [
          c[25] || (c[25] = L("p", { class: "eyebrow" }, "Canto IX · 独立前端卡", -1)),
          c[26] || (c[26] = L("h1", null, "ALBINA", -1)),
          c[27] || (c[27] = L("p", { class: "subtitle" }, "白色画布上的残响", -1)),
          L("nav", h5, [
            L("button", {
              "data-testid": "new-game",
              onClick: c[0] || (c[0] = //@ts-ignore
              (...d) => V(t).start && V(t).start(...d))
            }, "开始新篇"),
            L("button", {
              "data-testid": "continue-game",
              disabled: V(t).loading,
              onClick: c[1] || (c[1] = //@ts-ignore
              (...d) => V(t).continueGame && V(t).continueGame(...d))
            }, "继续", 8, _5),
            L("button", {
              "data-testid": "title-saves",
              onClick: c[2] || (c[2] = //@ts-ignore
              (...d) => V(t).openSaves && V(t).openSaves(...d))
            }, "存档"),
            L("button", {
              onClick: c[3] || (c[3] = //@ts-ignore
              (...d) => V(t).openGallery && V(t).openGallery(...d))
            }, "CG 图鉴"),
            L("button", {
              "data-testid": "title-settings",
              onClick: c[4] || (c[4] = (d) => V(t).screen = "settings")
            }, "设置")
          ]),
          L("p", v5, "v" + Fe(V(b_)) + " · 确定性主剧情 · 运行时零媒体 API", 1)
        ])
      ])) : V(t).screen === "saves" ? (he(), ve("section", y5, [
        L("header", null, [
          L("button", {
            onClick: c[5] || (c[5] = (d) => V(t).screen = "title")
          }, "返回"),
          c[29] || (c[29] = L("h2", null, "存档管理", -1))
        ]),
        L("div", k5, [
          L("button", {
            "data-testid": "save-slot-1",
            onClick: c[6] || (c[6] = (d) => V(t).saveSlot(1))
          }, "保存到槽位 1"),
          L("button", {
            onClick: c[7] || (c[7] = (d) => V(t).saveSlot(2))
          }, "保存到槽位 2"),
          L("button", {
            onClick: c[8] || (c[8] = (d) => V(t).saveSlot(3))
          }, "保存到槽位 3")
        ]),
        L("div", w5, [
          (he(!0), ve(Qe, null, on(V(t).saveSlots, (d) => (he(), ve("article", {
            key: d.id,
            class: "save-slot",
            "data-save-id": d.id
          }, [
            d.thumbnailUrl ? (he(), ve("img", {
              key: 0,
              src: d.thumbnailUrl,
              alt: "存档缩略图"
            }, null, 8, I5)) : Ni("", !0),
            L("div", null, [
              L("strong", null, Fe(d.id), 1),
              L("p", null, Fe(d.sceneId), 1),
              L("time", null, Fe(d.updatedAt), 1)
            ]),
            L("button", {
              onClick: (l) => V(t).restoreSlot(d.id)
            }, "读取", 8, T5),
            L("button", {
              onClick: (l) => V(t).deleteSlot(d.id)
            }, "删除", 8, A5)
          ], 8, E5))), 128)),
          V(t).saveSlots.length === 0 ? (he(), ve("p", O5, "暂无普通存档。")) : Ni("", !0)
        ])
      ])) : V(t).screen === "gallery" ? (he(), ve("section", x5, [
        L("header", null, [
          L("button", {
            onClick: c[9] || (c[9] = //@ts-ignore
            (...d) => V(t).backToGame && V(t).backToGame(...d))
          }, "返回"),
          c[30] || (c[30] = L("h2", null, "CG 图鉴", -1))
        ]),
        L("div", S5, [
          (he(!0), ve(Qe, null, on(n.value, (d) => (he(), ve("figure", {
            key: d.id
          }, [
            L("img", {
              src: d.url,
              alt: d.id,
              crossorigin: "anonymous"
            }, null, 8, N5),
            L("figcaption", null, Fe(d.id), 1)
          ]))), 128)),
          n.value.length === 0 ? (he(), ve("p", C5, "尚未解锁 CG。")) : Ni("", !0)
        ])
      ])) : V(t).screen === "settings" ? (he(), ve("section", D5, [
        L("header", null, [
          L("button", {
            onClick: c[10] || (c[10] = (d) => V(t).screen = "title")
          }, "返回"),
          c[31] || (c[31] = L("h2", null, "演出设置", -1))
        ]),
        L("label", null, [
          qa(L("input", {
            "onUpdate:modelValue": c[11] || (c[11] = (d) => V(t).videoEnabled = d),
            type: "checkbox"
          }, null, 512), [
            [Mr, V(t).videoEnabled]
          ]),
          c[32] || (c[32] = un(" 启用动画 CG（移动端可关闭）", -1))
        ]),
        L("label", null, [
          qa(L("input", {
            "onUpdate:modelValue": c[12] || (c[12] = (d) => V(t).reducedMotion = d),
            type: "checkbox"
          }, null, 512), [
            [Mr, V(t).reducedMotion]
          ]),
          c[33] || (c[33] = un(" 减少动态效果", -1))
        ]),
        L("label", null, [
          L("input", {
            checked: V(t).muted,
            type: "checkbox",
            onChange: c[13] || (c[13] = //@ts-ignore
            (...d) => V(t).toggleMute && V(t).toggleMute(...d))
          }, null, 40, V5),
          c[34] || (c[34] = un(" 静音", -1))
        ]),
        L("button", {
          "data-testid": "autoplay-recovery",
          onClick: c[14] || (c[14] = //@ts-ignore
          (...d) => V(t).recoverAutoplay && V(t).recoverAutoplay(...d))
        }, "恢复音频播放"),
        c[35] || (c[35] = L("p", { class: "asset-status" }, "图像条带仍有 8 项等待 Pie 恢复；Music 2.6 已观察到两次 504，批量生产因稳定性门槛暂停。本预览版不会在游玩时请求生成接口，也不宣称 Complete Edition 已完成。", -1))
      ])) : (he(), ve("section", {
        key: 4,
        class: "game-screen",
        "data-testid": "game-screen",
        "data-scene-id": V(t).scene.id
      }, [
        V(t).media.backgroundUrl ? (he(), ve("img", {
          key: 0,
          class: "game-screen__background",
          src: V(t).media.backgroundUrl,
          alt: "",
          crossorigin: "anonymous"
        }, null, 8, P5)) : Ni("", !0),
        V(t).media.videoUrl ? (he(), ve("video", {
          key: 1,
          class: "game-screen__video",
          src: V(t).media.videoUrl,
          poster: V(t).media.fallbackUrl,
          autoplay: "",
          muted: "",
          loop: "",
          playsinline: "",
          crossorigin: "anonymous",
          "data-testid": "scene-video",
          onError: c[15] || (c[15] = //@ts-ignore
          (...d) => V(t).setVideoFailed && V(t).setVideoFailed(...d))
        }, null, 40, $5)) : V(t).media.fallbackUrl ? (he(), ve("img", {
          key: 2,
          class: "game-screen__cg",
          src: V(t).media.fallbackUrl,
          alt: "剧情 CG",
          "data-testid": "static-fallback",
          crossorigin: "anonymous"
        }, null, 8, j5)) : Ni("", !0),
        Dt(m_, {
          portraits: V(t).scene.portraits,
          service: V(t).runtime.portraits
        }, null, 8, ["portraits", "service"]),
        L("header", F5, [
          L("span", null, "CH." + Fe(V(t).scene.chapter) + " · " + Fe(V(t).scene.locationId), 1),
          L("span", null, "信任 " + Fe(V(t).save.values.trust) + " / 危险 " + Fe(V(t).save.values.danger) + " / 共鸣 " + Fe(V(t).save.values.artResonance), 1),
          L("nav", null, [
            L("button", {
              onClick: c[16] || (c[16] = //@ts-ignore
              (...d) => V(t).quickSave && V(t).quickSave(...d))
            }, "快速存档"),
            L("button", {
              "data-testid": "game-saves",
              onClick: c[17] || (c[17] = //@ts-ignore
              (...d) => V(t).openSaves && V(t).openSaves(...d))
            }, "存档"),
            L("button", {
              onClick: c[18] || (c[18] = //@ts-ignore
              (...d) => V(t).openGallery && V(t).openGallery(...d))
            }, "图鉴"),
            L("button", {
              "data-testid": "game-settings",
              onClick: c[19] || (c[19] = (d) => V(t).screen = "settings")
            }, "设置"),
            L("button", {
              onClick: c[20] || (c[20] = //@ts-ignore
              (...d) => V(t).toggleMute && V(t).toggleMute(...d))
            }, Fe(V(t).muted ? "启音" : "静音"), 1)
          ])
        ]),
        L("article", {
          class: "dialogue-box",
          "data-testid": "dialogue-box",
          onClick: c[22] || (c[22] = //@ts-ignore
          (...d) => V(t).completeText && V(t).completeText(...d))
        }, [
          L("h2", null, Fe(V(t).scene.speaker), 1),
          L("p", null, Fe(V(t).visibleText), 1),
          V(t).resultText ? (he(), ve("div", z5, [
            L("p", null, Fe(V(t).resultText), 1),
            L("button", {
              onClick: c[21] || (c[21] = Zr(
                //@ts-ignore
                (...d) => V(t).dismissResult && V(t).dismissResult(...d),
                ["stop"]
              ))
            }, "继续")
          ])) : (he(), ve("div", U5, [
            (he(!0), ve(Qe, null, on(V(t).choices, (d) => (he(), ve("button", {
              key: d.id,
              "data-choice-id": d.id,
              onClick: Zr((l) => V(t).choose(d.id), ["stop"])
            }, Fe(d.text), 9, L5))), 128)),
            V(t).scene.ending ? (he(), ve("p", M5, Fe(V(t).scene.ending.route) + " · " + Fe(V(t).scene.ending.kind) + " END", 1)) : Ni("", !0)
          ]))
        ]),
        L("details", B5, [
          c[36] || (c[36] = L("summary", null, "存档导入 / 导出", -1)),
          L("button", { onClick: s }, "导出当前存档"),
          qa(L("textarea", {
            "onUpdate:modelValue": c[23] || (c[23] = (d) => a.value = d),
            readonly: "",
            "aria-label": "导出存档"
          }, null, 512), [
            [Lr, a.value]
          ]),
          qa(L("textarea", {
            "onUpdate:modelValue": c[24] || (c[24] = (d) => i.value = d),
            "aria-label": "导入存档",
            placeholder: "粘贴 SaveV2 JSON"
          }, null, 512), [
            [Lr, i.value]
          ]),
          L("button", { onClick: o }, "导入")
        ])
      ], 8, R5))
    ], 8, g5));
  }
});
function H5(e) {
  const t = $m(Z5);
  return t.use(d_()), t.mount(e), t;
}
function Cd() {
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
      const n = H5(a);
      i.addEventListener("click", () => {
        n.unmount(), t?.remove();
      });
    }
  }), document.body.append(e);
}
typeof window < "u" && !window.__ALBINA_DISABLE_AUTOINSTALL__ && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Cd, { once: !0 }) : Cd());
export {
  h_ as ALBINA_CDN_BASE,
  b_ as ALBINA_RELEASE_VERSION,
  Cd as installAlbinaOneClick,
  H5 as mountAlbinaApplication
};
