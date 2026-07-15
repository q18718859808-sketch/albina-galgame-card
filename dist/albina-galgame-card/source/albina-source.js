// @__NO_SIDE_EFFECTS__
function Kt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const i of e.split(",")) t[i] = 1;
  return (i) => i in t;
}
const fe = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, zi = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], $e = () => {
}, Dd = () => !1, Va = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ya = (e) => e.startsWith("onUpdate:"), Se = Object.assign, us = (e, t) => {
  const i = e.indexOf(t);
  i > -1 && e.splice(i, 1);
}, Uf = Object.prototype.hasOwnProperty, ae = (e, t) => Uf.call(e, t), q = Array.isArray, hi = (e) => ja(e) === "[object Map]", Fn = (e) => ja(e) === "[object Set]", er = (e) => ja(e) === "[object Date]", G = (e) => typeof e == "function", we = (e) => typeof e == "string", ct = (e) => typeof e == "symbol", oe = (e) => e !== null && typeof e == "object", ls = (e) => (oe(e) || G(e)) && G(e.then) && G(e.catch), Vd = Object.prototype.toString, ja = (e) => Vd.call(e), fs = (e) => ja(e).slice(8, -1), jd = (e) => ja(e) === "[object Object]", zn = (e) => we(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, pa = /* @__PURE__ */ Kt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ff = /* @__PURE__ */ Kt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), Ln = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((i) => t[i] || (t[i] = e(i)));
}, zf = /-\w/g, tt = Ln(
  (e) => e.replace(zf, (t) => t.slice(1).toUpperCase())
), Lf = /\B([A-Z])/g, ei = Ln(
  (e) => e.replace(Lf, "-$1").toLowerCase()
), Mn = Ln((e) => e.charAt(0).toUpperCase() + e.slice(1)), di = Ln(
  (e) => e ? `on${Mn(e)}` : ""
), Ot = (e, t) => !Object.is(e, t), Vi = (e, ...t) => {
  for (let i = 0; i < e.length; i++)
    e[i](...t);
}, _n = (e, t, i, a = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: i
  });
}, ps = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let tr;
const Pa = () => tr || (tr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Bn(e) {
  if (q(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const a = e[i], n = we(a) ? Hf(a) : Bn(a);
      if (n)
        for (const o in n)
          t[o] = n[o];
    }
    return t;
  } else if (we(e) || oe(e))
    return e;
}
const Mf = /;(?![^(]*\))/g, Bf = /:([^]+)/, Zf = /\/\*[^]*?\*\//g;
function Hf(e) {
  const t = {};
  return e.replace(Zf, "").split(Mf).forEach((i) => {
    if (i) {
      const a = i.split(Bf);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function Zn(e) {
  let t = "";
  if (we(e))
    t = e;
  else if (q(e))
    for (let i = 0; i < e.length; i++) {
      const a = Zn(e[i]);
      a && (t += a + " ");
    }
  else if (oe(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
const Kf = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", qf = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Wf = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", Gf = /* @__PURE__ */ Kt(Kf), Jf = /* @__PURE__ */ Kt(qf), Yf = /* @__PURE__ */ Kt(Wf), Xf = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qf = /* @__PURE__ */ Kt(Xf);
function Pd(e) {
  return !!e || e === "";
}
function ep(e, t) {
  if (e.length !== t.length) return !1;
  let i = !0;
  for (let a = 0; i && a < e.length; a++)
    i = Ra(e[a], t[a]);
  return i;
}
function Ra(e, t) {
  if (e === t) return !0;
  let i = er(e), a = er(t);
  if (i || a)
    return i && a ? e.getTime() === t.getTime() : !1;
  if (i = ct(e), a = ct(t), i || a)
    return e === t;
  if (i = q(e), a = q(t), i || a)
    return i && a ? ep(e, t) : !1;
  if (i = oe(e), a = oe(t), i || a) {
    if (!i || !a)
      return !1;
    const n = Object.keys(e).length, o = Object.keys(t).length;
    if (n !== o)
      return !1;
    for (const s in e) {
      const r = e.hasOwnProperty(s), c = t.hasOwnProperty(s);
      if (r && !c || !r && c || !Ra(e[s], t[s]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Rd(e, t) {
  return e.findIndex((i) => Ra(i, t));
}
const $d = (e) => !!(e && e.__v_isRef === !0), ye = (e) => we(e) ? e : e == null ? "" : q(e) || oe(e) && (e.toString === Vd || !G(e.toString)) ? $d(e) ? ye(e.value) : JSON.stringify(e, Ud, 2) : String(e), Ud = (e, t) => $d(t) ? Ud(e, t.value) : hi(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (i, [a, n], o) => (i[lo(a, o) + " =>"] = n, i),
    {}
  )
} : Fn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((i) => lo(i))
} : ct(t) ? lo(t) : oe(t) && !q(t) && !jd(t) ? String(t) : t, lo = (e, t = "") => {
  var i;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ct(e) ? `Symbol(${(i = e.description) != null ? i : t})` : e
  );
};
function dt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let je;
class Fd {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && je && (je.active ? (this.parent = je, this.index = (je.scopes || (je.scopes = [])).push(
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
      const i = je;
      try {
        return je = this, t();
      } finally {
        je = i;
      }
    } else process.env.NODE_ENV !== "production" && this._warnOnRun && dt("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = je, je = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (je === this)
        je = this.prevScope;
      else {
        let t = je;
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
function zd(e) {
  return new Fd(e);
}
function Ld() {
  return je;
}
function tp(e, t = !1) {
  je ? je.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && dt(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let le;
const fo = /* @__PURE__ */ new WeakSet();
class Md {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, je && (je.active ? je.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, fo.has(this) && (fo.delete(this), this.trigger()));
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
    const t = le, i = bt;
    le = this, bt = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && le !== this && dt(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Kd(this), le = t, bt = i, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        hs(t);
      this.deps = this.depsTail = void 0, ir(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? fo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Vo(this) && this.run();
  }
  get dirty() {
    return Vo(this);
  }
}
let Bd = 0, ma, ga;
function Zd(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ga, ga = e;
    return;
  }
  e.next = ma, ma = e;
}
function ms() {
  Bd++;
}
function gs() {
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
  for (; ma; ) {
    let t = ma;
    for (ma = void 0; t; ) {
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
    a.version === -1 ? (a === i && (i = n), hs(a), ip(a)) : t = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = n;
  }
  e.deps = t, e.depsTail = i;
}
function Vo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (qd(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function qd(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ka) || (e.globalVersion = ka, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Vo(e))))
    return;
  e.flags |= 2;
  const t = e.dep, i = le, a = bt;
  le = e, bt = !0;
  try {
    Hd(e);
    const n = e.fn(e._value);
    (t.version === 0 || Ot(n, e._value)) && (e.flags |= 128, e._value = n, t.version++);
  } catch (n) {
    throw t.version++, n;
  } finally {
    le = i, bt = a, Kd(e), e.flags &= -3;
  }
}
function hs(e, t = !1) {
  const { dep: i, prevSub: a, nextSub: n } = e;
  if (a && (a.nextSub = n, e.prevSub = void 0), n && (n.prevSub = a, e.nextSub = void 0), process.env.NODE_ENV !== "production" && i.subsHead === e && (i.subsHead = n), i.subs === e && (i.subs = a, !a && i.computed)) {
    i.computed.flags &= -5;
    for (let o = i.computed.deps; o; o = o.nextDep)
      hs(o, !0);
  }
  !t && !--i.sc && i.map && i.map.delete(i.key);
}
function ip(e) {
  const { prevDep: t, nextDep: i } = e;
  t && (t.nextDep = i, e.prevDep = void 0), i && (i.prevDep = t, e.nextDep = void 0);
}
let bt = !0;
const Wd = [];
function lt() {
  Wd.push(bt), bt = !1;
}
function ft() {
  const e = Wd.pop();
  bt = e === void 0 ? !0 : e;
}
function ir(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const i = le;
    le = void 0;
    try {
      t();
    } finally {
      le = i;
    }
  }
}
let ka = 0;
class ap {
  constructor(t, i) {
    this.sub = t, this.dep = i, this.version = i.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class bs {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!le || !bt || le === this.computed)
      return;
    let i = this.activeLink;
    if (i === void 0 || i.sub !== le)
      i = this.activeLink = new ap(le, this), le.deps ? (i.prevDep = le.depsTail, le.depsTail.nextDep = i, le.depsTail = i) : le.deps = le.depsTail = i, Gd(i);
    else if (i.version === -1 && (i.version = this.version, i.nextDep)) {
      const a = i.nextDep;
      a.prevDep = i.prevDep, i.prevDep && (i.prevDep.nextDep = a), i.prevDep = le.depsTail, i.nextDep = void 0, le.depsTail.nextDep = i, le.depsTail = i, le.deps === i && (le.deps = a);
    }
    return process.env.NODE_ENV !== "production" && le.onTrack && le.onTrack(
      Se(
        {
          effect: le
        },
        t
      )
    ), i;
  }
  trigger(t) {
    this.version++, ka++, this.notify(t);
  }
  notify(t) {
    ms();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let i = this.subsHead; i; i = i.nextSub)
          i.sub.onTrigger && !(i.sub.flags & 8) && i.sub.onTrigger(
            Se(
              {
                effect: i.sub
              },
              t
            )
          );
      for (let i = this.subs; i; i = i.prevSub)
        i.sub.notify() && i.sub.dep.notify();
    } finally {
      gs();
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
const vn = /* @__PURE__ */ new WeakMap(), bi = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), jo = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), wa = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Re(e, t, i) {
  if (bt && le) {
    let a = vn.get(e);
    a || vn.set(e, a = /* @__PURE__ */ new Map());
    let n = a.get(i);
    n || (a.set(i, n = new bs()), n.map = a, n.key = i), process.env.NODE_ENV !== "production" ? n.track({
      target: e,
      type: t,
      key: i
    }) : n.track();
  }
}
function Ct(e, t, i, a, n, o) {
  const s = vn.get(e);
  if (!s) {
    ka++;
    return;
  }
  const r = (c) => {
    c && (process.env.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: i,
      newValue: a,
      oldValue: n,
      oldTarget: o
    }) : c.trigger());
  };
  if (ms(), t === "clear")
    s.forEach(r);
  else {
    const c = q(e), d = c && zn(i);
    if (c && i === "length") {
      const u = Number(a);
      s.forEach((l, p) => {
        (p === "length" || p === wa || !ct(p) && p >= u) && r(l);
      });
    } else
      switch ((i !== void 0 || s.has(void 0)) && r(s.get(i)), d && r(s.get(wa)), t) {
        case "add":
          c ? d && r(s.get("length")) : (r(s.get(bi)), hi(e) && r(s.get(jo)));
          break;
        case "delete":
          c || (r(s.get(bi)), hi(e) && r(s.get(jo)));
          break;
        case "set":
          hi(e) && r(s.get(bi));
          break;
      }
  }
  gs();
}
function np(e, t) {
  const i = vn.get(e);
  return i && i.get(t);
}
function xi(e) {
  const t = /* @__PURE__ */ X(e);
  return t === e ? t : (Re(t, "iterate", wa), /* @__PURE__ */ qe(e) ? t : t.map(yt));
}
function Hn(e) {
  return Re(e = /* @__PURE__ */ X(e), "iterate", wa), e;
}
function St(e, t) {
  return /* @__PURE__ */ vt(e) ? Ki(/* @__PURE__ */ _t(e) ? yt(t) : t) : yt(t);
}
const op = {
  __proto__: null,
  [Symbol.iterator]() {
    return po(this, Symbol.iterator, (e) => St(this, e));
  },
  concat(...e) {
    return xi(this).concat(
      ...e.map((t) => q(t) ? xi(t) : t)
    );
  },
  entries() {
    return po(this, "entries", (e) => (e[1] = St(this, e[1]), e));
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
      (i) => i.map((a) => St(this, a)),
      arguments
    );
  },
  find(e, t) {
    return Pt(
      this,
      "find",
      e,
      t,
      (i) => St(this, i),
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
      (i) => St(this, i),
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
    return mo(this, "includes", e);
  },
  indexOf(...e) {
    return mo(this, "indexOf", e);
  },
  join(e) {
    return xi(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return mo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Pt(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return na(this, "pop");
  },
  push(...e) {
    return na(this, "push", e);
  },
  reduce(e, ...t) {
    return ar(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ar(this, "reduceRight", e, t);
  },
  shift() {
    return na(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Pt(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return na(this, "splice", e);
  },
  toReversed() {
    return xi(this).toReversed();
  },
  toSorted(e) {
    return xi(this).toSorted(e);
  },
  toSpliced(...e) {
    return xi(this).toSpliced(...e);
  },
  unshift(...e) {
    return na(this, "unshift", e);
  },
  values() {
    return po(this, "values", (e) => St(this, e));
  }
};
function po(e, t, i) {
  const a = Hn(e), n = a[t]();
  return a !== e && !/* @__PURE__ */ qe(e) && (n._next = n.next, n.next = () => {
    const o = n._next();
    return o.done || (o.value = i(o.value)), o;
  }), n;
}
const sp = Array.prototype;
function Pt(e, t, i, a, n, o) {
  const s = Hn(e), r = s !== e && !/* @__PURE__ */ qe(e), c = s[t];
  if (c !== sp[t]) {
    const l = c.apply(e, o);
    return r ? yt(l) : l;
  }
  let d = i;
  s !== e && (r ? d = function(l, p) {
    return i.call(this, St(e, l), p, e);
  } : i.length > 2 && (d = function(l, p) {
    return i.call(this, l, p, e);
  }));
  const u = c.call(s, d, a);
  return r && n ? n(u) : u;
}
function ar(e, t, i, a) {
  const n = Hn(e), o = n !== e && !/* @__PURE__ */ qe(e);
  let s = i, r = !1;
  n !== e && (o ? (r = a.length === 0, s = function(d, u, l) {
    return r && (r = !1, d = St(e, d)), i.call(this, d, St(e, u), l, e);
  }) : i.length > 3 && (s = function(d, u, l) {
    return i.call(this, d, u, l, e);
  }));
  const c = n[t](s, ...a);
  return r ? St(e, c) : c;
}
function mo(e, t, i) {
  const a = /* @__PURE__ */ X(e);
  Re(a, "iterate", wa);
  const n = a[t](...i);
  return (n === -1 || n === !1) && /* @__PURE__ */ Hi(i[0]) ? (i[0] = /* @__PURE__ */ X(i[0]), a[t](...i)) : n;
}
function na(e, t, i = []) {
  lt(), ms();
  const a = (/* @__PURE__ */ X(e))[t].apply(e, i);
  return gs(), ft(), a;
}
const rp = /* @__PURE__ */ Kt("__proto__,__v_isRef,__isVue"), Jd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ct)
);
function cp(e) {
  ct(e) || (e = String(e));
  const t = /* @__PURE__ */ X(this);
  return Re(t, "has", e), t.hasOwnProperty(e);
}
class Yd {
  constructor(t = !1, i = !1) {
    this._isReadonly = t, this._isShallow = i;
  }
  get(t, i, a) {
    if (i === "__v_skip") return t.__v_skip;
    const n = this._isReadonly, o = this._isShallow;
    if (i === "__v_isReactive")
      return !n;
    if (i === "__v_isReadonly")
      return n;
    if (i === "__v_isShallow")
      return o;
    if (i === "__v_raw")
      return a === (n ? o ? au : iu : o ? tu : eu).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(a) ? t : void 0;
    const s = q(t);
    if (!n) {
      let c;
      if (s && (c = op[i]))
        return c;
      if (i === "hasOwnProperty")
        return cp;
    }
    const r = Reflect.get(
      t,
      i,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ _e(t) ? t : a
    );
    if ((ct(i) ? Jd.has(i) : rp(i)) || (n || Re(t, "get", i), o))
      return r;
    if (/* @__PURE__ */ _e(r)) {
      const c = s && zn(i) ? r : r.value;
      return n && oe(c) ? /* @__PURE__ */ Ro(c) : c;
    }
    return oe(r) ? n ? /* @__PURE__ */ Ro(r) : /* @__PURE__ */ qn(r) : r;
  }
}
class Xd extends Yd {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, i, a, n) {
    let o = t[i];
    const s = q(t) && zn(i);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ vt(o);
      if (!/* @__PURE__ */ qe(a) && !/* @__PURE__ */ vt(a) && (o = /* @__PURE__ */ X(o), a = /* @__PURE__ */ X(a)), !s && /* @__PURE__ */ _e(o) && !/* @__PURE__ */ _e(a))
        return d ? (process.env.NODE_ENV !== "production" && dt(
          `Set operation on key "${String(i)}" failed: target is readonly.`,
          t[i]
        ), !0) : (o.value = a, !0);
    }
    const r = s ? Number(i) < t.length : ae(t, i), c = Reflect.set(
      t,
      i,
      a,
      /* @__PURE__ */ _e(t) ? t : n
    );
    return t === /* @__PURE__ */ X(n) && c && (r ? Ot(a, o) && Ct(t, "set", i, a, o) : Ct(t, "add", i, a)), c;
  }
  deleteProperty(t, i) {
    const a = ae(t, i), n = t[i], o = Reflect.deleteProperty(t, i);
    return o && a && Ct(t, "delete", i, void 0, n), o;
  }
  has(t, i) {
    const a = Reflect.has(t, i);
    return (!ct(i) || !Jd.has(i)) && Re(t, "has", i), a;
  }
  ownKeys(t) {
    return Re(
      t,
      "iterate",
      q(t) ? "length" : bi
    ), Reflect.ownKeys(t);
  }
}
class Qd extends Yd {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, i) {
    return process.env.NODE_ENV !== "production" && dt(
      `Set operation on key "${String(i)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, i) {
    return process.env.NODE_ENV !== "production" && dt(
      `Delete operation on key "${String(i)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const dp = /* @__PURE__ */ new Xd(), up = /* @__PURE__ */ new Qd(), lp = /* @__PURE__ */ new Xd(!0), fp = /* @__PURE__ */ new Qd(!0), Po = (e) => e, qa = (e) => Reflect.getPrototypeOf(e);
function pp(e, t, i) {
  return function(...a) {
    const n = this.__v_raw, o = /* @__PURE__ */ X(n), s = hi(o), r = e === "entries" || e === Symbol.iterator && s, c = e === "keys" && s, d = n[e](...a), u = i ? Po : t ? Ki : yt;
    return !t && Re(
      o,
      "iterate",
      c ? jo : bi
    ), Se(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: l, done: p } = d.next();
          return p ? { value: l, done: p } : {
            value: r ? [u(l[0]), u(l[1])] : u(l),
            done: p
          };
        }
      }
    );
  };
}
function Wa(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const i = t[0] ? `on key "${t[0]}" ` : "";
      dt(
        `${Mn(e)} operation ${i}failed: target is readonly.`,
        /* @__PURE__ */ X(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function mp(e, t) {
  const i = {
    get(n) {
      const o = this.__v_raw, s = /* @__PURE__ */ X(o), r = /* @__PURE__ */ X(n);
      e || (Ot(n, r) && Re(s, "get", n), Re(s, "get", r));
      const { has: c } = qa(s), d = t ? Po : e ? Ki : yt;
      if (c.call(s, n))
        return d(o.get(n));
      if (c.call(s, r))
        return d(o.get(r));
      o !== s && o.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && Re(/* @__PURE__ */ X(n), "iterate", bi), n.size;
    },
    has(n) {
      const o = this.__v_raw, s = /* @__PURE__ */ X(o), r = /* @__PURE__ */ X(n);
      return e || (Ot(n, r) && Re(s, "has", n), Re(s, "has", r)), n === r ? o.has(n) : o.has(n) || o.has(r);
    },
    forEach(n, o) {
      const s = this, r = s.__v_raw, c = /* @__PURE__ */ X(r), d = t ? Po : e ? Ki : yt;
      return !e && Re(c, "iterate", bi), r.forEach((u, l) => n.call(o, d(u), d(l), s));
    }
  };
  return Se(
    i,
    e ? {
      add: Wa("add"),
      set: Wa("set"),
      delete: Wa("delete"),
      clear: Wa("clear")
    } : {
      add(n) {
        const o = /* @__PURE__ */ X(this), s = qa(o), r = /* @__PURE__ */ X(n), c = !t && !/* @__PURE__ */ qe(n) && !/* @__PURE__ */ vt(n) ? r : n;
        return s.has.call(o, c) || Ot(n, c) && s.has.call(o, n) || Ot(r, c) && s.has.call(o, r) || (o.add(c), Ct(o, "add", c, c)), this;
      },
      set(n, o) {
        !t && !/* @__PURE__ */ qe(o) && !/* @__PURE__ */ vt(o) && (o = /* @__PURE__ */ X(o));
        const s = /* @__PURE__ */ X(this), { has: r, get: c } = qa(s);
        let d = r.call(s, n);
        d ? process.env.NODE_ENV !== "production" && nr(s, r, n) : (n = /* @__PURE__ */ X(n), d = r.call(s, n));
        const u = c.call(s, n);
        return s.set(n, o), d ? Ot(o, u) && Ct(s, "set", n, o, u) : Ct(s, "add", n, o), this;
      },
      delete(n) {
        const o = /* @__PURE__ */ X(this), { has: s, get: r } = qa(o);
        let c = s.call(o, n);
        c ? process.env.NODE_ENV !== "production" && nr(o, s, n) : (n = /* @__PURE__ */ X(n), c = s.call(o, n));
        const d = r ? r.call(o, n) : void 0, u = o.delete(n);
        return c && Ct(o, "delete", n, void 0, d), u;
      },
      clear() {
        const n = /* @__PURE__ */ X(this), o = n.size !== 0, s = process.env.NODE_ENV !== "production" ? hi(n) ? new Map(n) : new Set(n) : void 0, r = n.clear();
        return o && Ct(
          n,
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
  ].forEach((n) => {
    i[n] = pp(n, e, t);
  }), i;
}
function Kn(e, t) {
  const i = mp(e, t);
  return (a, n, o) => n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? a : Reflect.get(
    ae(i, n) && n in a ? i : a,
    n,
    o
  );
}
const gp = {
  get: /* @__PURE__ */ Kn(!1, !1)
}, hp = {
  get: /* @__PURE__ */ Kn(!1, !0)
}, bp = {
  get: /* @__PURE__ */ Kn(!0, !1)
}, _p = {
  get: /* @__PURE__ */ Kn(!0, !0)
};
function nr(e, t, i) {
  const a = /* @__PURE__ */ X(i);
  if (a !== i && t.call(e, a)) {
    const n = fs(e);
    dt(
      `Reactive ${n} contains both the raw and reactive versions of the same object${n === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const eu = /* @__PURE__ */ new WeakMap(), tu = /* @__PURE__ */ new WeakMap(), iu = /* @__PURE__ */ new WeakMap(), au = /* @__PURE__ */ new WeakMap();
function vp(e) {
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
function qn(e) {
  return /* @__PURE__ */ vt(e) ? e : Wn(
    e,
    !1,
    dp,
    gp,
    eu
  );
}
// @__NO_SIDE_EFFECTS__
function yp(e) {
  return Wn(
    e,
    !1,
    lp,
    hp,
    tu
  );
}
// @__NO_SIDE_EFFECTS__
function Ro(e) {
  return Wn(
    e,
    !0,
    up,
    bp,
    iu
  );
}
// @__NO_SIDE_EFFECTS__
function Nt(e) {
  return Wn(
    e,
    !0,
    fp,
    _p,
    au
  );
}
function Wn(e, t, i, a, n) {
  if (!oe(e))
    return process.env.NODE_ENV !== "production" && dt(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const o = n.get(e);
  if (o)
    return o;
  const s = vp(fs(e));
  if (s === 0)
    return e;
  const r = new Proxy(
    e,
    s === 2 ? a : i
  );
  return n.set(e, r), r;
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
  return /* @__PURE__ */ vt(e) ? /* @__PURE__ */ _t(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function vt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function qe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Hi(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function X(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ X(t) : e;
}
function Dt(e) {
  return !ae(e, "__v_skip") && Object.isExtensible(e) && _n(e, "__v_skip", !0), e;
}
const yt = (e) => oe(e) ? /* @__PURE__ */ qn(e) : e, Ki = (e) => oe(e) ? /* @__PURE__ */ Ro(e) : e;
// @__NO_SIDE_EFFECTS__
function _e(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Ne(e) {
  return nu(e, !1);
}
// @__NO_SIDE_EFFECTS__
function kp(e) {
  return nu(e, !0);
}
function nu(e, t) {
  return /* @__PURE__ */ _e(e) ? e : new wp(e, t);
}
class wp {
  constructor(t, i) {
    this.dep = new bs(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = i ? t : /* @__PURE__ */ X(t), this._value = i ? t : yt(t), this.__v_isShallow = i;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const i = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ qe(t) || /* @__PURE__ */ vt(t);
    t = a ? t : /* @__PURE__ */ X(t), Ot(t, i) && (this._rawValue = t, this._value = a ? t : yt(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: i
    }) : this.dep.trigger());
  }
}
function Ip(e) {
  e.dep && (process.env.NODE_ENV !== "production" ? e.dep.trigger({
    target: e,
    type: "set",
    key: "value",
    newValue: e._value
  }) : e.dep.trigger());
}
function C(e) {
  return /* @__PURE__ */ _e(e) ? e.value : e;
}
const Ep = {
  get: (e, t, i) => t === "__v_raw" ? e : C(Reflect.get(e, t, i)),
  set: (e, t, i, a) => {
    const n = e[t];
    return /* @__PURE__ */ _e(n) && !/* @__PURE__ */ _e(i) ? (n.value = i, !0) : Reflect.set(e, t, i, a);
  }
};
function ou(e) {
  return /* @__PURE__ */ _t(e) ? e : new Proxy(e, Ep);
}
// @__NO_SIDE_EFFECTS__
function or(e) {
  process.env.NODE_ENV !== "production" && !/* @__PURE__ */ Hi(e) && dt("toRefs() expects a reactive object but received a plain one.");
  const t = q(e) ? new Array(e.length) : {};
  for (const i in e)
    t[i] = su(e, i);
  return t;
}
class Ap {
  constructor(t, i, a) {
    this._object = t, this._defaultValue = a, this.__v_isRef = !0, this._value = void 0, this._key = ct(i) ? i : String(i), this._raw = /* @__PURE__ */ X(t);
    let n = !0, o = t;
    if (!q(t) || ct(this._key) || !zn(this._key))
      do
        n = !/* @__PURE__ */ Hi(o) || /* @__PURE__ */ qe(o);
      while (n && (o = o.__v_raw));
    this._shallow = n;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = C(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ _e(this._raw[this._key])) {
      const i = this._object[this._key];
      if (/* @__PURE__ */ _e(i)) {
        i.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return np(this._raw, this._key);
  }
}
class Tp {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function go(e, t, i) {
  return /* @__PURE__ */ _e(e) ? e : G(e) ? new Tp(e) : oe(e) && arguments.length > 1 ? su(e, t, i) : /* @__PURE__ */ Ne(e);
}
function su(e, t, i) {
  return new Ap(e, t, i);
}
class xp {
  constructor(t, i, a) {
    this.fn = t, this.setter = i, this._value = void 0, this.dep = new bs(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ka - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !i, this.isSSR = a;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    le !== this)
      return Zd(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return qd(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && dt("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function Sp(e, t, i = !1) {
  let a, n;
  G(e) ? a = e : (a = e.get, n = e.set);
  const o = new xp(a, n, i);
  return process.env.NODE_ENV, o;
}
const Ga = {}, yn = /* @__PURE__ */ new WeakMap();
let ui;
function Op(e, t = !1, i = ui) {
  if (i) {
    let a = yn.get(i);
    a || yn.set(i, a = []), a.push(e);
  } else process.env.NODE_ENV !== "production" && !t && dt(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Cp(e, t, i = fe) {
  const { immediate: a, deep: n, once: o, scheduler: s, augmentJob: r, call: c } = i, d = (V) => {
    (i.onWarn || dt)(
      "Invalid watch source: ",
      V,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = (V) => n ? V : /* @__PURE__ */ qe(V) || n === !1 || n === 0 ? Lt(V, 1) : Lt(V);
  let l, p, m, h, w = !1, I = !1;
  if (/* @__PURE__ */ _e(e) ? (p = () => e.value, w = /* @__PURE__ */ qe(e)) : /* @__PURE__ */ _t(e) ? (p = () => u(e), w = !0) : q(e) ? (I = !0, w = e.some((V) => /* @__PURE__ */ _t(V) || /* @__PURE__ */ qe(V)), p = () => e.map((V) => {
    if (/* @__PURE__ */ _e(V))
      return V.value;
    if (/* @__PURE__ */ _t(V))
      return u(V);
    if (G(V))
      return c ? c(V, 2) : V();
    process.env.NODE_ENV !== "production" && d(V);
  })) : G(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (m) {
      lt();
      try {
        m();
      } finally {
        ft();
      }
    }
    const V = ui;
    ui = l;
    try {
      return c ? c(e, 3, [h]) : e(h);
    } finally {
      ui = V;
    }
  } : (p = $e, process.env.NODE_ENV !== "production" && d(e)), t && n) {
    const V = p, te = n === !0 ? 1 / 0 : n;
    p = () => Lt(V(), te);
  }
  const x = Ld(), L = () => {
    l.stop(), x && x.active && us(x.effects, l);
  };
  if (o && t) {
    const V = t;
    t = (...te) => {
      const B = V(...te);
      return L(), B;
    };
  }
  let R = I ? new Array(e.length).fill(Ga) : Ga;
  const H = (V) => {
    if (!(!(l.flags & 1) || !l.dirty && !V))
      if (t) {
        const te = l.run();
        if (V || n || w || (I ? te.some((B, me) => Ot(B, R[me])) : Ot(te, R))) {
          m && m();
          const B = ui;
          ui = l;
          try {
            const me = [
              te,
              // pass undefined as the old value when it's changed for the first time
              R === Ga ? void 0 : I && R[0] === Ga ? [] : R,
              h
            ];
            R = te, c ? c(t, 3, me) : (
              // @ts-expect-error
              t(...me)
            );
          } finally {
            ui = B;
          }
        }
      } else
        l.run();
  };
  return r && r(H), l = new Md(p), l.scheduler = s ? () => s(H, !1) : H, h = (V) => Op(V, !1, l), m = l.onStop = () => {
    const V = yn.get(l);
    if (V) {
      if (c)
        c(V, 4);
      else
        for (const te of V) te();
      yn.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = i.onTrack, l.onTrigger = i.onTrigger), t ? a ? H(!0) : R = l.run() : s ? s(H.bind(null, !0), !0) : l.run(), L.pause = l.pause.bind(l), L.resume = l.resume.bind(l), L.stop = L, L;
}
function Lt(e, t = 1 / 0, i) {
  if (t <= 0 || !oe(e) || e.__v_skip || (i = i || /* @__PURE__ */ new Map(), (i.get(e) || 0) >= t))
    return e;
  if (i.set(e, t), t--, /* @__PURE__ */ _e(e))
    Lt(e.value, t, i);
  else if (q(e))
    for (let a = 0; a < e.length; a++)
      Lt(e[a], t, i);
  else if (Fn(e) || hi(e))
    e.forEach((a) => {
      Lt(a, t, i);
    });
  else if (jd(e)) {
    for (const a in e)
      Lt(e[a], t, i);
    for (const a of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, a) && Lt(e[a], t, i);
  }
  return e;
}
const _i = [];
function on(e) {
  _i.push(e);
}
function sn() {
  _i.pop();
}
let ho = !1;
function N(e, ...t) {
  if (ho) return;
  ho = !0, lt();
  const i = _i.length ? _i[_i.length - 1].component : null, a = i && i.appContext.config.warnHandler, n = Np();
  if (a)
    Xi(
      a,
      i,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var s, r;
          return (r = (s = o.toString) == null ? void 0 : s.call(o)) != null ? r : JSON.stringify(o);
        }).join(""),
        i && i.proxy,
        n.map(
          ({ vnode: o }) => `at <${La(i, o.type)}>`
        ).join(`
`),
        n
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    n.length && o.push(`
`, ...Dp(n)), console.warn(...o);
  }
  ft(), ho = !1;
}
function Np() {
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
function Dp(e) {
  const t = [];
  return e.forEach((i, a) => {
    t.push(...a === 0 ? [] : [`
`], ...Vp(i));
  }), t;
}
function Vp({ vnode: e, recurseCount: t }) {
  const i = t > 0 ? `... (${t} recursive calls)` : "", a = e.component ? e.component.parent == null : !1, n = ` at <${La(
    e.component,
    e.type,
    a
  )}`, o = ">" + i;
  return e.props ? [n, ...jp(e.props), o] : [n + o];
}
function jp(e) {
  const t = [], i = Object.keys(e);
  return i.slice(0, 3).forEach((a) => {
    t.push(...ru(a, e[a]));
  }), i.length > 3 && t.push(" ..."), t;
}
function ru(e, t, i) {
  return we(t) ? (t = JSON.stringify(t), i ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? i ? t : [`${e}=${t}`] : /* @__PURE__ */ _e(t) ? (t = ru(e, /* @__PURE__ */ X(t.value), !0), i ? t : [`${e}=Ref<`, t, ">"]) : G(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ X(t), i ? t : [`${e}=`, t]);
}
const _s = {
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
function Xi(e, t, i, a) {
  try {
    return a ? e(...a) : e();
  } catch (n) {
    $a(n, t, i);
  }
}
function kt(e, t, i, a) {
  if (G(e)) {
    const n = Xi(e, t, i, a);
    return n && ls(n) && n.catch((o) => {
      $a(o, t, i);
    }), n;
  }
  if (q(e)) {
    const n = [];
    for (let o = 0; o < e.length; o++)
      n.push(kt(e[o], t, i, a));
    return n;
  } else process.env.NODE_ENV !== "production" && N(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function $a(e, t, i, a = !0) {
  const n = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: s } = t && t.appContext.config || fe;
  if (t) {
    let r = t.parent;
    const c = t.proxy, d = process.env.NODE_ENV !== "production" ? _s[i] : `https://vuejs.org/error-reference/#runtime-${i}`;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let l = 0; l < u.length; l++)
          if (u[l](e, c, d) === !1)
            return;
      }
      r = r.parent;
    }
    if (o) {
      lt(), Xi(o, null, 10, [
        e,
        c,
        d
      ]), ft();
      return;
    }
  }
  Pp(e, i, n, a, s);
}
function Pp(e, t, i, a = !0, n = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = _s[t];
    if (i && on(i), N(`Unhandled error${o ? ` during execution of ${o}` : ""}`), i && sn(), a)
      throw e;
    console.error(e);
  } else {
    if (n)
      throw e;
    console.error(e);
  }
}
const Ye = [];
let xt = -1;
const Li = [];
let Yt = null, ji = 0;
const cu = /* @__PURE__ */ Promise.resolve();
let kn = null;
const Rp = 100;
function wn(e) {
  const t = kn || cu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $p(e) {
  let t = xt + 1, i = Ye.length;
  for (; t < i; ) {
    const a = t + i >>> 1, n = Ye[a], o = Ia(n);
    o < e || o === e && n.flags & 2 ? t = a + 1 : i = a;
  }
  return t;
}
function Gn(e) {
  if (!(e.flags & 1)) {
    const t = Ia(e), i = Ye[Ye.length - 1];
    !i || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ia(i) ? Ye.push(e) : Ye.splice($p(t), 0, e), e.flags |= 1, du();
  }
}
function du() {
  kn || (kn = cu.then(fu));
}
function uu(e) {
  q(e) ? Li.push(...e) : Yt && e.id === -1 ? Yt.splice(ji + 1, 0, e) : e.flags & 1 || (Li.push(e), e.flags |= 1), du();
}
function sr(e, t, i = xt + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); i < Ye.length; i++) {
    const a = Ye[i];
    if (a && a.flags & 2) {
      if (e && a.id !== e.uid || process.env.NODE_ENV !== "production" && vs(t, a))
        continue;
      Ye.splice(i, 1), i--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function lu(e) {
  if (Li.length) {
    const t = [...new Set(Li)].sort(
      (i, a) => Ia(i) - Ia(a)
    );
    if (Li.length = 0, Yt) {
      Yt.push(...t);
      return;
    }
    for (Yt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ji = 0; ji < Yt.length; ji++) {
      const i = Yt[ji];
      process.env.NODE_ENV !== "production" && vs(e, i) || (i.flags & 4 && (i.flags &= -2), i.flags & 8 || i(), i.flags &= -2);
    }
    Yt = null, ji = 0;
  }
}
const Ia = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function fu(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (i) => vs(e, i) : $e;
  try {
    for (xt = 0; xt < Ye.length; xt++) {
      const i = Ye[xt];
      if (i && !(i.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(i))
          continue;
        i.flags & 4 && (i.flags &= -2), Xi(
          i,
          i.i,
          i.i ? 15 : 14
        ), i.flags & 4 || (i.flags &= -2);
      }
    }
  } finally {
    for (; xt < Ye.length; xt++) {
      const i = Ye[xt];
      i && (i.flags &= -2);
    }
    xt = -1, Ye.length = 0, lu(e), kn = null, (Ye.length || Li.length) && fu(e);
  }
}
function vs(e, t) {
  const i = e.get(t) || 0;
  if (i > Rp) {
    const a = t.i, n = a && Wu(a.type);
    return $a(
      `Maximum recursive updates exceeded${n ? ` in component <${n}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, i + 1), !1;
}
let ot = !1;
const rr = (e) => {
  try {
    return ot;
  } finally {
    ot = e;
  }
}, rn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Pa().__VUE_HMR_RUNTIME__ = {
  createRecord: bo(pu),
  rerender: bo(zp),
  reload: bo(Lp)
});
const wi = /* @__PURE__ */ new Map();
function Up(e) {
  const t = e.type.__hmrId;
  let i = wi.get(t);
  i || (pu(t, e.type), i = wi.get(t)), i.instances.add(e);
}
function Fp(e) {
  wi.get(e.type.__hmrId).instances.delete(e);
}
function pu(e, t) {
  return wi.has(e) ? !1 : (wi.set(e, {
    initialDef: In(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function In(e) {
  return Gu(e) ? e.__vccOpts : e;
}
function zp(e, t) {
  const i = wi.get(e);
  i && (i.initialDef.render = t, [...i.instances].forEach((a) => {
    t && (a.render = t, In(a.type).render = t), a.renderCache = [], ot = !0, a.job.flags & 8 || a.update(), ot = !1;
  }));
}
function Lp(e, t) {
  const i = wi.get(e);
  if (!i) return;
  t = In(t), cr(i.initialDef, t);
  const a = [...i.instances];
  for (let n = 0; n < a.length; n++) {
    const o = a[n], s = In(o.type);
    let r = rn.get(s);
    r || (s !== i.initialDef && cr(s, t), rn.set(s, r = /* @__PURE__ */ new Set())), r.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (r.add(o), o.ceReload(t.styles), r.delete(o)) : o.parent ? Gn(() => {
      o.job.flags & 8 || (ot = !0, o.parent.update(), ot = !1, r.delete(o));
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(s);
  }
  uu(() => {
    rn.clear();
  });
}
function cr(e, t) {
  Se(e, t);
  for (const i in e)
    i !== "__file" && !(i in t) && delete e[i];
}
function bo(e) {
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
let ht, ra = [], $o = !1;
function Ua(e, ...t) {
  ht ? ht.emit(e, ...t) : $o || ra.push({ event: e, args: t });
}
function ys(e, t) {
  var i, a;
  ht = e, ht ? (ht.enabled = !0, ra.forEach(({ event: n, args: o }) => ht.emit(n, ...o)), ra = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((a = (i = window.navigator) == null ? void 0 : i.userAgent) != null && a.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    ys(o, t);
  }), setTimeout(() => {
    ht || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, $o = !0, ra = []);
  }, 3e3)) : ($o = !0, ra = []);
}
function Mp(e, t) {
  Ua("app:init", e, t, {
    Fragment: Ke,
    Text: Fa,
    Comment: rt,
    Static: dn
  });
}
function Bp(e) {
  Ua("app:unmount", e);
}
const Zp = /* @__PURE__ */ ks(
  "component:added"
  /* COMPONENT_ADDED */
), mu = /* @__PURE__ */ ks(
  "component:updated"
  /* COMPONENT_UPDATED */
), Hp = /* @__PURE__ */ ks(
  "component:removed"
  /* COMPONENT_REMOVED */
), Kp = (e) => {
  ht && typeof ht.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ht.cleanupBuffer(e) && Hp(e);
};
// @__NO_SIDE_EFFECTS__
function ks(e) {
  return (t) => {
    Ua(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const qp = /* @__PURE__ */ gu(
  "perf:start"
  /* PERFORMANCE_START */
), Wp = /* @__PURE__ */ gu(
  "perf:end"
  /* PERFORMANCE_END */
);
function gu(e) {
  return (t, i, a) => {
    Ua(e, t.appContext.app, t.uid, t, i, a);
  };
}
function Gp(e, t, i) {
  Ua(
    "component:emit",
    e.appContext.app,
    e,
    t,
    i
  );
}
let Qe = null, hu = null;
function En(e) {
  const t = Qe;
  return Qe = e, hu = e && e.type.__scopeId || null, t;
}
function Jp(e, t = Qe, i) {
  if (!t || e._n)
    return e;
  const a = (...n) => {
    a._d && Ir(-1);
    const o = En(t);
    let s;
    try {
      s = e(...n);
    } finally {
      En(o), a._d && Ir(1);
    }
    return process.env.NODE_ENV !== "production" && mu(t), s;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function bu(e) {
  Ff(e) && N("Do not use built-in directive ids as custom directive id: " + e);
}
function Ja(e, t) {
  if (Qe === null)
    return process.env.NODE_ENV !== "production" && N("withDirectives can only be used inside render functions."), e;
  const i = eo(Qe), a = e.dirs || (e.dirs = []);
  for (let n = 0; n < t.length; n++) {
    let [o, s, r, c = fe] = t[n];
    o && (G(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Lt(s), a.push({
      dir: o,
      instance: i,
      value: s,
      oldValue: void 0,
      arg: r,
      modifiers: c
    }));
  }
  return e;
}
function ri(e, t, i, a) {
  const n = e.dirs, o = t && t.dirs;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    o && (r.oldValue = o[s].value);
    let c = r.dir[a];
    c && (lt(), kt(c, i, 8, [
      e.el,
      r,
      e,
      t
    ]), ft());
  }
}
function Yp(e, t) {
  if (process.env.NODE_ENV !== "production" && (!Pe || Pe.isMounted) && N("provide() can only be used inside setup()."), Pe) {
    let i = Pe.provides;
    const a = Pe.parent && Pe.parent.provides;
    a === i && (i = Pe.provides = Object.create(a)), i[e] = t;
  }
}
function vi(e, t, i = !1) {
  const a = Qn();
  if (a || ki) {
    let n = ki ? ki._context.provides : a ? a.parent == null || a.ce ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (n && e in n)
      return n[e];
    if (arguments.length > 1)
      return i && G(t) ? t.call(a && a.proxy) : t;
    process.env.NODE_ENV !== "production" && N(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && N("inject() can only be used inside setup() or functional components.");
}
function Uo() {
  return !!(Qn() || ki);
}
const Xp = /* @__PURE__ */ Symbol.for("v-scx"), Qp = () => {
  {
    const e = vi(Xp);
    return e || process.env.NODE_ENV !== "production" && N(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Mi(e, t, i) {
  return process.env.NODE_ENV !== "production" && !G(t) && N(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), _u(e, t, i);
}
function _u(e, t, i = fe) {
  const { immediate: a, deep: n, flush: o, once: s } = i;
  process.env.NODE_ENV !== "production" && !t && (a !== void 0 && N(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), n !== void 0 && N(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && N(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const r = Se({}, i);
  process.env.NODE_ENV !== "production" && (r.onWarn = N);
  const c = t && a || !t && o !== "post";
  let d;
  if (Aa) {
    if (o === "sync") {
      const m = Qp();
      d = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {
      };
      return m.stop = $e, m.resume = $e, m.pause = $e, m;
    }
  }
  const u = Pe;
  r.call = (m, h, w) => kt(m, u, h, w);
  let l = !1;
  o === "post" ? r.scheduler = (m) => {
    et(m, u && u.suspense);
  } : o !== "sync" && (l = !0, r.scheduler = (m, h) => {
    h ? m() : Gn(m);
  }), r.augmentJob = (m) => {
    t && (m.flags |= 4), l && (m.flags |= 2, u && (m.id = u.uid, m.i = u));
  };
  const p = Cp(e, t, r);
  return Aa && (d ? d.push(p) : c && p()), p;
}
function em(e, t, i) {
  const a = this.proxy, n = we(e) ? e.includes(".") ? vu(a, e) : () => a[e] : e.bind(a, a);
  let o;
  G(t) ? o = t : (o = t.handler, i = t);
  const s = za(this), r = _u(n, o.bind(a), i);
  return s(), r;
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
const tm = /* @__PURE__ */ Symbol("_vte"), im = (e) => e.__isTeleport, _o = /* @__PURE__ */ Symbol("_leaveCb");
function ws(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ws(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function yu(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Se({ name: e.name }, t, { setup: e })
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
const An = /* @__PURE__ */ new WeakMap();
function ha(e, t, i, a, n = !1) {
  if (q(e)) {
    e.forEach(
      (w, I) => ha(
        w,
        t && (q(t) ? t[I] : t),
        i,
        a,
        n
      )
    );
    return;
  }
  if (ba(a) && !n) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && ha(e, t, i, a.component.subTree);
    return;
  }
  const o = a.shapeFlag & 4 ? eo(a.component) : a.el, s = n ? null : o, { i: r, r: c } = e;
  if (process.env.NODE_ENV !== "production" && !r) {
    N(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const d = t && t.r, u = r.refs === fe ? r.refs = {} : r.refs, l = r.setupState, p = /* @__PURE__ */ X(l), m = l === fe ? Dd : (w) => process.env.NODE_ENV !== "production" && (ae(p, w) && !/* @__PURE__ */ _e(p[w]) && N(
    `Template ref "${w}" used on a non-ref value. It will not work in the production build.`
  ), dr.has(p[w])) || ur(u, w) ? !1 : ae(p, w), h = (w, I) => !(process.env.NODE_ENV !== "production" && dr.has(w) || I && ur(u, I));
  if (d != null && d !== c) {
    if (lr(t), we(d))
      u[d] = null, m(d) && (l[d] = null);
    else if (/* @__PURE__ */ _e(d)) {
      const w = t;
      h(d, w.k) && (d.value = null), w.k && (u[w.k] = null);
    }
  }
  if (G(c)) {
    lt();
    try {
      Xi(c, r, 12, [s, u]);
    } finally {
      ft();
    }
  } else {
    const w = we(c), I = /* @__PURE__ */ _e(c);
    if (w || I) {
      const x = () => {
        if (e.f) {
          const L = w ? m(c) ? l[c] : u[c] : h(c) || !e.k ? c.value : u[e.k];
          if (n)
            q(L) && us(L, o);
          else if (q(L))
            L.includes(o) || L.push(o);
          else if (w)
            u[c] = [o], m(c) && (l[c] = u[c]);
          else {
            const R = [o];
            h(c, e.k) && (c.value = R), e.k && (u[e.k] = R);
          }
        } else w ? (u[c] = s, m(c) && (l[c] = s)) : I ? (h(c, e.k) && (c.value = s), e.k && (u[e.k] = s)) : process.env.NODE_ENV !== "production" && N("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (s) {
        const L = () => {
          x(), An.delete(e);
        };
        L.id = -1, An.set(e, L), et(L, i);
      } else
        lr(e), x();
    } else process.env.NODE_ENV !== "production" && N("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function lr(e) {
  const t = An.get(e);
  t && (t.flags |= 8, An.delete(e));
}
Pa().requestIdleCallback;
Pa().cancelIdleCallback;
const ba = (e) => !!e.type.__asyncLoader, Is = (e) => e.type.__isKeepAlive;
function am(e, t) {
  wu(e, "a", t);
}
function nm(e, t) {
  wu(e, "da", t);
}
function wu(e, t, i = Pe) {
  const a = e.__wdc || (e.__wdc = () => {
    let n = i;
    for (; n; ) {
      if (n.isDeactivated)
        return;
      n = n.parent;
    }
    return e();
  });
  if (Jn(t, a, i), i) {
    let n = i.parent;
    for (; n && n.parent; )
      Is(n.parent.vnode) && om(a, t, i, n), n = n.parent;
  }
}
function om(e, t, i, a) {
  const n = Jn(
    t,
    e,
    a,
    !0
    /* prepend */
  );
  Iu(() => {
    us(a[t], n);
  }, i);
}
function Jn(e, t, i = Pe, a = !1) {
  if (i) {
    const n = i[e] || (i[e] = []), o = t.__weh || (t.__weh = (...s) => {
      lt();
      const r = za(i), c = kt(t, i, e, s);
      return r(), ft(), c;
    });
    return a ? n.unshift(o) : n.push(o), o;
  } else if (process.env.NODE_ENV !== "production") {
    const n = di(_s[e].replace(/ hook$/, ""));
    N(
      `${n} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const qt = (e) => (t, i = Pe) => {
  (!Aa || e === "sp") && Jn(e, (...a) => t(...a), i);
}, sm = qt("bm"), rm = qt("m"), cm = qt(
  "bu"
), dm = qt("u"), Es = qt(
  "bum"
), Iu = qt("um"), um = qt(
  "sp"
), lm = qt("rtg"), fm = qt("rtc");
function pm(e, t = Pe) {
  Jn("ec", e, t);
}
const mm = /* @__PURE__ */ Symbol.for("v-ndc");
function Pi(e, t, i, a) {
  let n;
  const o = i, s = q(e);
  if (s || we(e)) {
    const r = s && /* @__PURE__ */ _t(e);
    let c = !1, d = !1;
    r && (c = !/* @__PURE__ */ qe(e), d = /* @__PURE__ */ vt(e), e = Hn(e)), n = new Array(e.length);
    for (let u = 0, l = e.length; u < l; u++)
      n[u] = t(
        c ? d ? Ki(yt(e[u])) : yt(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number")
    if (process.env.NODE_ENV !== "production" && (!Number.isInteger(e) || e < 0))
      N(
        `The v-for range expects a positive integer value but got ${e}.`
      ), n = [];
    else {
      n = new Array(e);
      for (let r = 0; r < e; r++)
        n[r] = t(r + 1, r, void 0, o);
    }
  else if (oe(e))
    if (e[Symbol.iterator])
      n = Array.from(
        e,
        (r, c) => t(r, c, void 0, o)
      );
    else {
      const r = Object.keys(e);
      n = new Array(r.length);
      for (let c = 0, d = r.length; c < d; c++) {
        const u = r[c];
        n[c] = t(e[u], u, c, o);
      }
    }
  else
    n = [];
  return n;
}
const Fo = (e) => e ? Ku(e) ? eo(e) : Fo(e.parent) : null, yi = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Se(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.refs) : e.refs,
    $parent: (e) => Fo(e.parent),
    $root: (e) => Fo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Tu(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Gn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = wn.bind(e.proxy)),
    $watch: (e) => em.bind(e)
  })
), As = (e) => e === "_" || e === "$", vo = (e, t) => e !== fe && !e.__isScriptSetup && ae(e, t), Eu = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: i, setupState: a, data: n, props: o, accessCache: s, type: r, appContext: c } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const p = s[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return a[t];
          case 2:
            return n[t];
          case 4:
            return i[t];
          case 3:
            return o[t];
        }
      else {
        if (vo(a, t))
          return s[t] = 1, a[t];
        if (n !== fe && ae(n, t))
          return s[t] = 2, n[t];
        if (ae(o, t))
          return s[t] = 3, o[t];
        if (i !== fe && ae(i, t))
          return s[t] = 4, i[t];
        zo && (s[t] = 0);
      }
    }
    const d = yi[t];
    let u, l;
    if (d)
      return t === "$attrs" ? (Re(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && xn()) : process.env.NODE_ENV !== "production" && t === "$slots" && Re(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (u = r.__cssModules) && (u = u[t])
    )
      return u;
    if (i !== fe && ae(i, t))
      return s[t] = 4, i[t];
    if (
      // global properties
      l = c.config.globalProperties, ae(l, t)
    )
      return l[t];
    process.env.NODE_ENV !== "production" && Qe && (!we(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (n !== fe && As(t[0]) && ae(n, t) ? N(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === Qe && N(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, i) {
    const { data: a, setupState: n, ctx: o } = e;
    return vo(n, t) ? (n[t] = i, !0) : process.env.NODE_ENV !== "production" && n.__isScriptSetup && ae(n, t) ? (N(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : a !== fe && ae(a, t) ? (a[t] = i, !0) : ae(e.props, t) ? (process.env.NODE_ENV !== "production" && N(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && N(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: i
    }) : o[t] = i, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: i, ctx: a, appContext: n, props: o, type: s }
  }, r) {
    let c;
    return !!(i[r] || e !== fe && r[0] !== "$" && ae(e, r) || vo(t, r) || ae(o, r) || ae(a, r) || ae(yi, r) || ae(n.config.globalProperties, r) || (c = s.__cssModules) && c[r]);
  },
  defineProperty(e, t, i) {
    return i.get != null ? e._.accessCache[t] = 0 : ae(i, "value") && this.set(e, t, i.value, null), Reflect.defineProperty(e, t, i);
  }
};
process.env.NODE_ENV !== "production" && (Eu.ownKeys = (e) => (N(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function gm(e) {
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
      set: $e
    });
  }), t;
}
function hm(e) {
  const {
    ctx: t,
    propsOptions: [i]
  } = e;
  i && Object.keys(i).forEach((a) => {
    Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[a],
      set: $e
    });
  });
}
function bm(e) {
  const { ctx: t, setupState: i } = e;
  Object.keys(/* @__PURE__ */ X(i)).forEach((a) => {
    if (!i.__isScriptSetup) {
      if (As(a[0])) {
        N(
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
        set: $e
      });
    }
  });
}
function fr(e) {
  return q(e) ? e.reduce(
    (t, i) => (t[i] = null, t),
    {}
  ) : e;
}
function _m() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, i) => {
    e[i] ? N(`${t} property "${i}" is already defined in ${e[i]}.`) : e[i] = t;
  };
}
let zo = !0;
function vm(e) {
  const t = Tu(e), i = e.proxy, a = e.ctx;
  zo = !1, t.beforeCreate && pr(t.beforeCreate, e, "bc");
  const {
    // state
    data: n,
    computed: o,
    methods: s,
    watch: r,
    provide: c,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: l,
    mounted: p,
    beforeUpdate: m,
    updated: h,
    activated: w,
    deactivated: I,
    beforeDestroy: x,
    beforeUnmount: L,
    destroyed: R,
    unmounted: H,
    render: V,
    renderTracked: te,
    renderTriggered: B,
    errorCaptured: me,
    serverPrefetch: W,
    // public API
    expose: F,
    inheritAttrs: U,
    // assets
    components: Q,
    directives: ce,
    filters: Ve
  } = t, Fe = process.env.NODE_ENV !== "production" ? _m() : null;
  if (process.env.NODE_ENV !== "production") {
    const [$] = e.propsOptions;
    if ($)
      for (const J in $)
        Fe("Props", J);
  }
  if (d && ym(d, a, Fe), s)
    for (const $ in s) {
      const J = s[$];
      G(J) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(a, $, {
        value: J.bind(i),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : a[$] = J.bind(i), process.env.NODE_ENV !== "production" && Fe("Methods", $)) : process.env.NODE_ENV !== "production" && N(
        `Method "${$}" has type "${typeof J}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (n) {
    process.env.NODE_ENV !== "production" && !G(n) && N(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const $ = n.call(i, i);
    if (process.env.NODE_ENV !== "production" && ls($) && N(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !oe($))
      process.env.NODE_ENV !== "production" && N("data() should return an object.");
    else if (e.data = /* @__PURE__ */ qn($), process.env.NODE_ENV !== "production")
      for (const J in $)
        Fe("Data", J), As(J[0]) || Object.defineProperty(a, J, {
          configurable: !0,
          enumerable: !0,
          get: () => $[J],
          set: $e
        });
  }
  if (zo = !0, o)
    for (const $ in o) {
      const J = o[$], ie = G(J) ? J.bind(i, i) : G(J.get) ? J.get.bind(i, i) : $e;
      process.env.NODE_ENV !== "production" && ie === $e && N(`Computed property "${$}" has no getter.`);
      const Be = !G(J) && G(J.set) ? J.set.bind(i) : process.env.NODE_ENV !== "production" ? () => {
        N(
          `Write operation failed: computed property "${$}" is readonly.`
        );
      } : $e, Le = Xt({
        get: ie,
        set: Be
      });
      Object.defineProperty(a, $, {
        enumerable: !0,
        configurable: !0,
        get: () => Le.value,
        set: (Oe) => Le.value = Oe
      }), process.env.NODE_ENV !== "production" && Fe("Computed", $);
    }
  if (r)
    for (const $ in r)
      Au(r[$], a, i, $);
  if (c) {
    const $ = G(c) ? c.call(i) : c;
    Reflect.ownKeys($).forEach((J) => {
      Yp(J, $[J]);
    });
  }
  u && pr(u, e, "c");
  function be($, J) {
    q(J) ? J.forEach((ie) => $(ie.bind(i))) : J && $(J.bind(i));
  }
  if (be(sm, l), be(rm, p), be(cm, m), be(dm, h), be(am, w), be(nm, I), be(pm, me), be(fm, te), be(lm, B), be(Es, L), be(Iu, H), be(um, W), q(F))
    if (F.length) {
      const $ = e.exposed || (e.exposed = {});
      F.forEach((J) => {
        Object.defineProperty($, J, {
          get: () => i[J],
          set: (ie) => i[J] = ie,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  V && e.render === $e && (e.render = V), U != null && (e.inheritAttrs = U), Q && (e.components = Q), ce && (e.directives = ce), W && ku(e);
}
function ym(e, t, i = $e) {
  q(e) && (e = Lo(e));
  for (const a in e) {
    const n = e[a];
    let o;
    oe(n) ? "default" in n ? o = vi(
      n.from || a,
      n.default,
      !0
    ) : o = vi(n.from || a) : o = vi(n), /* @__PURE__ */ _e(o) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (s) => o.value = s
    }) : t[a] = o, process.env.NODE_ENV !== "production" && i("Inject", a);
  }
}
function pr(e, t, i) {
  kt(
    q(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy),
    t,
    i
  );
}
function Au(e, t, i, a) {
  let n = a.includes(".") ? vu(i, a) : () => i[a];
  if (we(e)) {
    const o = t[e];
    G(o) ? Mi(n, o) : process.env.NODE_ENV !== "production" && N(`Invalid watch handler specified by key "${e}"`, o);
  } else if (G(e))
    Mi(n, e.bind(i));
  else if (oe(e))
    if (q(e))
      e.forEach((o) => Au(o, t, i, a));
    else {
      const o = G(e.handler) ? e.handler.bind(i) : t[e.handler];
      G(o) ? Mi(n, o, e) : process.env.NODE_ENV !== "production" && N(`Invalid watch handler specified by key "${e.handler}"`, o);
    }
  else process.env.NODE_ENV !== "production" && N(`Invalid watch option: "${a}"`, e);
}
function Tu(e) {
  const t = e.type, { mixins: i, extends: a } = t, {
    mixins: n,
    optionsCache: o,
    config: { optionMergeStrategies: s }
  } = e.appContext, r = o.get(t);
  let c;
  return r ? c = r : !n.length && !i && !a ? c = t : (c = {}, n.length && n.forEach(
    (d) => Tn(c, d, s, !0)
  ), Tn(c, t, s)), oe(t) && o.set(t, c), c;
}
function Tn(e, t, i, a = !1) {
  const { mixins: n, extends: o } = t;
  o && Tn(e, o, i, !0), n && n.forEach(
    (s) => Tn(e, s, i, !0)
  );
  for (const s in t)
    if (a && s === "expose")
      process.env.NODE_ENV !== "production" && N(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const r = km[s] || i && i[s];
      e[s] = r ? r(e[s], t[s]) : t[s];
    }
  return e;
}
const km = {
  data: mr,
  props: gr,
  emits: gr,
  // objects
  methods: ca,
  computed: ca,
  // lifecycle
  beforeCreate: Ge,
  created: Ge,
  beforeMount: Ge,
  mounted: Ge,
  beforeUpdate: Ge,
  updated: Ge,
  beforeDestroy: Ge,
  beforeUnmount: Ge,
  destroyed: Ge,
  unmounted: Ge,
  activated: Ge,
  deactivated: Ge,
  errorCaptured: Ge,
  serverPrefetch: Ge,
  // assets
  components: ca,
  directives: ca,
  // watch
  watch: Im,
  // provide / inject
  provide: mr,
  inject: wm
};
function mr(e, t) {
  return t ? e ? function() {
    return Se(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function wm(e, t) {
  return ca(Lo(e), Lo(t));
}
function Lo(e) {
  if (q(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++)
      t[e[i]] = e[i];
    return t;
  }
  return e;
}
function Ge(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ca(e, t) {
  return e ? Se(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function gr(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Se(
    /* @__PURE__ */ Object.create(null),
    fr(e),
    fr(t ?? {})
  ) : t;
}
function Im(e, t) {
  if (!e) return t;
  if (!t) return e;
  const i = Se(/* @__PURE__ */ Object.create(null), e);
  for (const a in t)
    i[a] = Ge(e[a], t[a]);
  return i;
}
function xu() {
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
let Em = 0;
function Am(e, t) {
  return function(a, n = null) {
    G(a) || (a = Se({}, a)), n != null && !oe(n) && (process.env.NODE_ENV !== "production" && N("root props passed to app.mount() must be an object."), n = null);
    const o = xu(), s = /* @__PURE__ */ new WeakSet(), r = [];
    let c = !1;
    const d = o.app = {
      _uid: Em++,
      _component: a,
      _props: n,
      _container: null,
      _context: o,
      _instance: null,
      version: xr,
      get config() {
        return o.config;
      },
      set config(u) {
        process.env.NODE_ENV !== "production" && N(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(u, ...l) {
        return s.has(u) ? process.env.NODE_ENV !== "production" && N("Plugin has already been applied to target app.") : u && G(u.install) ? (s.add(u), u.install(d, ...l)) : G(u) ? (s.add(u), u(d, ...l)) : process.env.NODE_ENV !== "production" && N(
          'A plugin must either be a function or an object with an "install" function.'
        ), d;
      },
      mixin(u) {
        return o.mixins.includes(u) ? process.env.NODE_ENV !== "production" && N(
          "Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")
        ) : o.mixins.push(u), d;
      },
      component(u, l) {
        return process.env.NODE_ENV !== "production" && Ko(u, o.config), l ? (process.env.NODE_ENV !== "production" && o.components[u] && N(`Component "${u}" has already been registered in target app.`), o.components[u] = l, d) : o.components[u];
      },
      directive(u, l) {
        return process.env.NODE_ENV !== "production" && bu(u), l ? (process.env.NODE_ENV !== "production" && o.directives[u] && N(`Directive "${u}" has already been registered in target app.`), o.directives[u] = l, d) : o.directives[u];
      },
      mount(u, l, p) {
        if (c)
          process.env.NODE_ENV !== "production" && N(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && u.__vue_app__ && N(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const m = d._ceVNode || Vt(a, n);
          return m.appContext = o, p === !0 ? p = "svg" : p === !1 && (p = void 0), process.env.NODE_ENV !== "production" && (o.reload = () => {
            const h = ti(m);
            h.el = null, e(h, u, p);
          }), e(m, u, p), c = !0, d._container = u, u.__vue_app__ = d, process.env.NODE_ENV !== "production" && (d._instance = m.component, Mp(d, xr)), eo(m.component);
        }
      },
      onUnmount(u) {
        process.env.NODE_ENV !== "production" && typeof u != "function" && N(
          `Expected function as first argument to app.onUnmount(), but got ${typeof u}`
        ), r.push(u);
      },
      unmount() {
        c ? (kt(
          r,
          d._instance,
          16
        ), e(null, d._container), process.env.NODE_ENV !== "production" && (d._instance = null, Bp(d)), delete d._container.__vue_app__) : process.env.NODE_ENV !== "production" && N("Cannot unmount an app that is not mounted.");
      },
      provide(u, l) {
        return process.env.NODE_ENV !== "production" && u in o.provides && (ae(o.provides, u) ? N(
          `App already provides property with key "${String(u)}". It will be overwritten with the new value.`
        ) : N(
          `App already provides property with key "${String(u)}" inherited from its parent element. It will be overwritten with the new value.`
        )), o.provides[u] = l, d;
      },
      runWithContext(u) {
        const l = ki;
        ki = d;
        try {
          return u();
        } finally {
          ki = l;
        }
      }
    };
    return d;
  };
}
let ki = null;
const Tm = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${tt(t)}Modifiers`] || e[`${ei(t)}Modifiers`];
function xm(e, t, ...i) {
  if (e.isUnmounted) return;
  const a = e.vnode.props || fe;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: u,
      propsOptions: [l]
    } = e;
    if (u)
      if (!(t in u))
        (!l || !(di(tt(t)) in l)) && N(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${di(tt(t))}" prop.`
        );
      else {
        const p = u[t];
        G(p) && (p(...i) || N(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let n = i;
  const o = t.startsWith("update:"), s = o && Tm(a, t.slice(7));
  if (s && (s.trim && (n = i.map((u) => we(u) ? u.trim() : u)), s.number && (n = i.map(ps))), process.env.NODE_ENV !== "production" && Gp(e, t, n), process.env.NODE_ENV !== "production") {
    const u = t.toLowerCase();
    u !== t && a[di(u)] && N(
      `Event "${u}" is emitted in component ${La(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${ei(
        t
      )}" instead of "${t}".`
    );
  }
  let r, c = a[r = di(t)] || // also try camelCase event handler (#2249)
  a[r = di(tt(t))];
  !c && o && (c = a[r = di(ei(t))]), c && kt(
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
    e.emitted[r] = !0, kt(
      d,
      e,
      6,
      n
    );
  }
}
const Sm = /* @__PURE__ */ new WeakMap();
function Su(e, t, i = !1) {
  const a = i ? Sm : t.emitsCache, n = a.get(e);
  if (n !== void 0)
    return n;
  const o = e.emits;
  let s = {}, r = !1;
  if (!G(e)) {
    const c = (d) => {
      const u = Su(d, t, !0);
      u && (r = !0, Se(s, u));
    };
    !i && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !r ? (oe(e) && a.set(e, null), null) : (q(o) ? o.forEach((c) => s[c] = null) : Se(s, o), oe(e) && a.set(e, s), s);
}
function Yn(e, t) {
  return !e || !Va(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), ae(e, t[0].toLowerCase() + t.slice(1)) || ae(e, ei(t)) || ae(e, t));
}
let Mo = !1;
function xn() {
  Mo = !0;
}
function hr(e) {
  const {
    type: t,
    vnode: i,
    proxy: a,
    withProxy: n,
    propsOptions: [o],
    slots: s,
    attrs: r,
    emit: c,
    render: d,
    renderCache: u,
    props: l,
    data: p,
    setupState: m,
    ctx: h,
    inheritAttrs: w
  } = e, I = En(e);
  let x, L;
  process.env.NODE_ENV !== "production" && (Mo = !1);
  try {
    if (i.shapeFlag & 4) {
      const V = n || a, te = process.env.NODE_ENV !== "production" && m.__isScriptSetup ? new Proxy(V, {
        get(B, me, W) {
          return N(
            `Property '${String(
              me
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(B, me, W);
        }
      }) : V;
      x = gt(
        d.call(
          te,
          V,
          u,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(l) : l,
          m,
          p,
          h
        )
      ), L = r;
    } else {
      const V = t;
      process.env.NODE_ENV !== "production" && r === l && xn(), x = gt(
        V.length > 1 ? V(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(l) : l,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return xn(), /* @__PURE__ */ Nt(r);
            },
            slots: s,
            emit: c
          } : { attrs: r, slots: s, emit: c }
        ) : V(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(l) : l,
          null
        )
      ), L = t.props ? r : Om(r);
    }
  } catch (V) {
    _a.length = 0, $a(V, e, 1), x = Vt(rt);
  }
  let R = x, H;
  if (process.env.NODE_ENV !== "production" && x.patchFlag > 0 && x.patchFlag & 2048 && ([R, H] = Ou(x)), L && w !== !1) {
    const V = Object.keys(L), { shapeFlag: te } = R;
    if (V.length) {
      if (te & 7)
        o && V.some(ya) && (L = Cm(
          L,
          o
        )), R = ti(R, L, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !Mo && R.type !== rt) {
        const B = Object.keys(r), me = [], W = [];
        for (let F = 0, U = B.length; F < U; F++) {
          const Q = B[F];
          Va(Q) ? ya(Q) || me.push(Q[2].toLowerCase() + Q.slice(3)) : W.push(Q);
        }
        W.length && N(
          `Extraneous non-props attributes (${W.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), me.length && N(
          `Extraneous non-emits event listeners (${me.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return i.dirs && (process.env.NODE_ENV !== "production" && !br(R) && N(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), R = ti(R, null, !1, !0), R.dirs = R.dirs ? R.dirs.concat(i.dirs) : i.dirs), i.transition && (process.env.NODE_ENV !== "production" && !br(R) && N(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), ws(R, i.transition)), process.env.NODE_ENV !== "production" && H ? H(R) : x = R, En(I), x;
}
const Ou = (e) => {
  const t = e.children, i = e.dynamicChildren, a = Ts(t, !1);
  if (a) {
    if (process.env.NODE_ENV !== "production" && a.patchFlag > 0 && a.patchFlag & 2048)
      return Ou(a);
  } else return [e, void 0];
  const n = t.indexOf(a), o = i ? i.indexOf(a) : -1, s = (r) => {
    t[n] = r, i && (o > -1 ? i[o] = r : r.patchFlag > 0 && (e.dynamicChildren = [...i, r]));
  };
  return [gt(a), s];
};
function Ts(e, t = !0) {
  let i;
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    if (Xn(n)) {
      if (n.type !== rt || n.children === "v-if") {
        if (i)
          return;
        if (i = n, process.env.NODE_ENV !== "production" && t && i.patchFlag > 0 && i.patchFlag & 2048)
          return Ts(i.children);
      }
    } else
      return;
  }
  return i;
}
const Om = (e) => {
  let t;
  for (const i in e)
    (i === "class" || i === "style" || Va(i)) && ((t || (t = {}))[i] = e[i]);
  return t;
}, Cm = (e, t) => {
  const i = {};
  for (const a in e)
    (!ya(a) || !(a.slice(9) in t)) && (i[a] = e[a]);
  return i;
}, br = (e) => e.shapeFlag & 7 || e.type === rt;
function Nm(e, t, i) {
  const { props: a, children: n, component: o } = e, { props: s, children: r, patchFlag: c } = t, d = o.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (n || r) && ot || t.dirs || t.transition)
    return !0;
  if (i && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return a ? _r(a, s, d) : !!s;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let l = 0; l < u.length; l++) {
        const p = u[l];
        if (Cu(s, a, p) && !Yn(d, p))
          return !0;
      }
    }
  } else
    return (n || r) && (!r || !r.$stable) ? !0 : a === s ? !1 : a ? s ? _r(a, s, d) : !0 : !!s;
  return !1;
}
function _r(e, t, i) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length)
    return !0;
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (Cu(t, e, o) && !Yn(i, o))
      return !0;
  }
  return !1;
}
function Cu(e, t, i) {
  const a = e[i], n = t[i];
  return i === "style" && oe(a) && oe(n) ? !Ra(a, n) : a !== n;
}
function Dm({ vnode: e, parent: t, suspense: i }, a) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.suspense.vnode.el = n.el = a, e = n), n === e)
      (e = t.vnode).el = a, t = t.parent;
    else
      break;
  }
  i && i.activeBranch === e && (i.vnode.el = a);
}
const Nu = {}, Du = () => Object.create(Nu), Vu = (e) => Object.getPrototypeOf(e) === Nu;
function Vm(e, t, i, a = !1) {
  const n = {}, o = Du();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), ju(e, t, n, o);
  for (const s in e.propsOptions[0])
    s in n || (n[s] = void 0);
  process.env.NODE_ENV !== "production" && Ru(t || {}, n, e), i ? e.props = a ? n : /* @__PURE__ */ yp(n) : e.type.props ? e.props = n : e.props = o, e.attrs = o;
}
function jm(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function Pm(e, t, i, a) {
  const {
    props: n,
    attrs: o,
    vnode: { patchFlag: s }
  } = e, r = /* @__PURE__ */ X(n), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && jm(e)) && (a || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const u = e.vnode.dynamicProps;
      for (let l = 0; l < u.length; l++) {
        let p = u[l];
        if (Yn(e.emitsOptions, p))
          continue;
        const m = t[p];
        if (c)
          if (ae(o, p))
            m !== o[p] && (o[p] = m, d = !0);
          else {
            const h = tt(p);
            n[h] = Bo(
              c,
              r,
              h,
              m,
              e,
              !1
            );
          }
        else
          m !== o[p] && (o[p] = m, d = !0);
      }
    }
  } else {
    ju(e, t, n, o) && (d = !0);
    let u;
    for (const l in r)
      (!t || // for camelCase
      !ae(t, l) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = ei(l)) === l || !ae(t, u))) && (c ? i && // for camelCase
      (i[l] !== void 0 || // for kebab-case
      i[u] !== void 0) && (n[l] = Bo(
        c,
        r,
        l,
        void 0,
        e,
        !0
      )) : delete n[l]);
    if (o !== r)
      for (const l in o)
        (!t || !ae(t, l)) && (delete o[l], d = !0);
  }
  d && Ct(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Ru(t || {}, n, e);
}
function ju(e, t, i, a) {
  const [n, o] = e.propsOptions;
  let s = !1, r;
  if (t)
    for (let c in t) {
      if (pa(c))
        continue;
      const d = t[c];
      let u;
      n && ae(n, u = tt(c)) ? !o || !o.includes(u) ? i[u] = d : (r || (r = {}))[u] = d : Yn(e.emitsOptions, c) || (!(c in a) || d !== a[c]) && (a[c] = d, s = !0);
    }
  if (o) {
    const c = /* @__PURE__ */ X(i), d = r || fe;
    for (let u = 0; u < o.length; u++) {
      const l = o[u];
      i[l] = Bo(
        n,
        c,
        l,
        d[l],
        e,
        !ae(d, l)
      );
    }
  }
  return s;
}
function Bo(e, t, i, a, n, o) {
  const s = e[i];
  if (s != null) {
    const r = ae(s, "default");
    if (r && a === void 0) {
      const c = s.default;
      if (s.type !== Function && !s.skipFactory && G(c)) {
        const { propsDefaults: d } = n;
        if (i in d)
          a = d[i];
        else {
          const u = za(n);
          a = d[i] = c.call(
            null,
            t
          ), u();
        }
      } else
        a = c;
      n.ce && n.ce._setProp(i, a);
    }
    s[
      0
      /* shouldCast */
    ] && (o && !r ? a = !1 : s[
      1
      /* shouldCastTrue */
    ] && (a === "" || a === ei(i)) && (a = !0));
  }
  return a;
}
const Rm = /* @__PURE__ */ new WeakMap();
function Pu(e, t, i = !1) {
  const a = i ? Rm : t.propsCache, n = a.get(e);
  if (n)
    return n;
  const o = e.props, s = {}, r = [];
  let c = !1;
  if (!G(e)) {
    const u = (l) => {
      c = !0;
      const [p, m] = Pu(l, t, !0);
      Se(s, p), m && r.push(...m);
    };
    !i && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !c)
    return oe(e) && a.set(e, zi), zi;
  if (q(o))
    for (let u = 0; u < o.length; u++) {
      process.env.NODE_ENV !== "production" && !we(o[u]) && N("props must be strings when using array syntax.", o[u]);
      const l = tt(o[u]);
      vr(l) && (s[l] = fe);
    }
  else if (o) {
    process.env.NODE_ENV !== "production" && !oe(o) && N("invalid props options", o);
    for (const u in o) {
      const l = tt(u);
      if (vr(l)) {
        const p = o[u], m = s[l] = q(p) || G(p) ? { type: p } : Se({}, p), h = m.type;
        let w = !1, I = !0;
        if (q(h))
          for (let x = 0; x < h.length; ++x) {
            const L = h[x], R = G(L) && L.name;
            if (R === "Boolean") {
              w = !0;
              break;
            } else R === "String" && (I = !1);
          }
        else
          w = G(h) && h.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = w, m[
          1
          /* shouldCastTrue */
        ] = I, (w || ae(m, "default")) && r.push(l);
      }
    }
  }
  const d = [s, r];
  return oe(e) && a.set(e, d), d;
}
function vr(e) {
  return e[0] !== "$" && !pa(e) ? !0 : (process.env.NODE_ENV !== "production" && N(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function $m(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Ru(e, t, i) {
  const a = /* @__PURE__ */ X(t), n = i.propsOptions[0], o = Object.keys(e).map((s) => tt(s));
  for (const s in n) {
    let r = n[s];
    r != null && Um(
      s,
      a[s],
      r,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(a) : a,
      !o.includes(s)
    );
  }
}
function Um(e, t, i, a, n) {
  const { type: o, required: s, validator: r, skipCheck: c } = i;
  if (s && n) {
    N('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !s)) {
    if (o != null && o !== !0 && !c) {
      let d = !1;
      const u = q(o) ? o : [o], l = [];
      for (let p = 0; p < u.length && !d; p++) {
        const { valid: m, expectedType: h } = zm(t, u[p]);
        l.push(h || ""), d = m;
      }
      if (!d) {
        N(Lm(e, t, l));
        return;
      }
    }
    r && !r(t, a) && N('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Fm = /* @__PURE__ */ Kt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function zm(e, t) {
  let i;
  const a = $m(t);
  if (a === "null")
    i = e === null;
  else if (Fm(a)) {
    const n = typeof e;
    i = n === a.toLowerCase(), !i && n === "object" && (i = e instanceof t);
  } else a === "Object" ? i = oe(e) : a === "Array" ? i = q(e) : i = e instanceof t;
  return {
    valid: i,
    expectedType: a
  };
}
function Lm(e, t, i) {
  if (i.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let a = `Invalid prop: type check failed for prop "${e}". Expected ${i.map(Mn).join(" | ")}`;
  const n = i[0], o = fs(t), s = yr(t, n), r = yr(t, o);
  return i.length === 1 && kr(n) && Mm(n, o) && (a += ` with value ${s}`), a += `, got ${o} `, kr(o) && (a += `with value ${r}.`), a;
}
function yr(e, t) {
  return ct(e) ? e.toString() : t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function kr(e) {
  return ["string", "number", "boolean"].some((i) => e.toLowerCase() === i);
}
function Mm(...e) {
  return e.every((t) => {
    const i = t.toLowerCase();
    return i !== "boolean" && i !== "symbol";
  });
}
const xs = (e) => e === "_" || e === "_ctx" || e === "$stable", Ss = (e) => q(e) ? e.map(gt) : [gt(e)], Bm = (e, t, i) => {
  if (t._n)
    return t;
  const a = Jp((...n) => (process.env.NODE_ENV !== "production" && Pe && !(i === null && Qe) && !(i && i.root !== Pe.root) && N(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), Ss(t(...n))), i);
  return a._c = !1, a;
}, $u = (e, t, i) => {
  const a = e._ctx;
  for (const n in e) {
    if (xs(n)) continue;
    const o = e[n];
    if (G(o))
      t[n] = Bm(n, o, a);
    else if (o != null) {
      process.env.NODE_ENV !== "production" && N(
        `Non-function value encountered for slot "${n}". Prefer function slots for better performance.`
      );
      const s = Ss(o);
      t[n] = () => s;
    }
  }
}, Uu = (e, t) => {
  process.env.NODE_ENV !== "production" && !Is(e.vnode) && N(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const i = Ss(t);
  e.slots.default = () => i;
}, Zo = (e, t, i) => {
  for (const a in t)
    (i || !xs(a)) && (e[a] = t[a]);
}, Zm = (e, t, i) => {
  const a = e.slots = Du();
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (Zo(a, t, i), i && _n(a, "_", n, !0)) : $u(t, a);
  } else t && Uu(e, t);
}, Hm = (e, t, i) => {
  const { vnode: a, slots: n } = e;
  let o = !0, s = fe;
  if (a.shapeFlag & 32) {
    const r = t._;
    r ? process.env.NODE_ENV !== "production" && ot ? (Zo(n, t, i), Ct(e, "set", "$slots")) : i && r === 1 ? o = !1 : Zo(n, t, i) : (o = !t.$stable, $u(t, n)), s = t;
  } else t && (Uu(e, t), s = { default: 1 });
  if (o)
    for (const r in n)
      !xs(r) && s[r] == null && delete n[r];
};
let oa, Ft;
function Si(e, t) {
  e.appContext.config.performance && Sn() && Ft.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && qp(e, t, Sn() ? Ft.now() : Date.now());
}
function Oi(e, t) {
  if (e.appContext.config.performance && Sn()) {
    const i = `vue-${t}-${e.uid}`, a = i + ":end", n = `<${La(e, e.type)}> ${t}`;
    Ft.mark(a), Ft.measure(n, i, a), Ft.clearMeasures(n), Ft.clearMarks(i), Ft.clearMarks(a);
  }
  process.env.NODE_ENV !== "production" && Wp(e, t, Sn() ? Ft.now() : Date.now());
}
function Sn() {
  return oa !== void 0 || (typeof window < "u" && window.performance ? (oa = !0, Ft = window.performance) : oa = !1), oa;
}
function Km() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const et = Ym;
function qm(e) {
  return Wm(e);
}
function Wm(e, t) {
  Km();
  const i = Pa();
  i.__VUE__ = !0, process.env.NODE_ENV !== "production" && ys(i.__VUE_DEVTOOLS_GLOBAL_HOOK__, i);
  const {
    insert: a,
    remove: n,
    patchProp: o,
    createElement: s,
    createText: r,
    createComment: c,
    setText: d,
    setElementText: u,
    parentNode: l,
    nextSibling: p,
    setScopeId: m = $e,
    insertStaticContent: h
  } = e, w = (f, g, v, A = null, E = null, k = null, j = void 0, O = null, b = process.env.NODE_ENV !== "production" && ot ? !1 : !!g.dynamicChildren) => {
    if (f === g)
      return;
    f && !sa(f, g) && (A = Jt(f), Ze(f, E, k, !0), f = null), g.patchFlag === -2 && (b = !1, g.dynamicChildren = null);
    const { type: _, ref: z, shapeFlag: S } = g;
    switch (_) {
      case Fa:
        I(f, g, v, A);
        break;
      case rt:
        x(f, g, v, A);
        break;
      case dn:
        f == null ? L(g, v, A, j) : process.env.NODE_ENV !== "production" && R(f, g, v, j);
        break;
      case Ke:
        ce(
          f,
          g,
          v,
          A,
          E,
          k,
          j,
          O,
          b
        );
        break;
      default:
        S & 1 ? te(
          f,
          g,
          v,
          A,
          E,
          k,
          j,
          O,
          b
        ) : S & 6 ? Ve(
          f,
          g,
          v,
          A,
          E,
          k,
          j,
          O,
          b
        ) : S & 64 || S & 128 ? _.process(
          f,
          g,
          v,
          A,
          E,
          k,
          j,
          O,
          b,
          si
        ) : process.env.NODE_ENV !== "production" && N("Invalid VNode type:", _, `(${typeof _})`);
    }
    z != null && E ? ha(z, f && f.ref, k, g || f, !g) : z == null && f && f.ref != null && ha(f.ref, null, k, f, !0);
  }, I = (f, g, v, A) => {
    if (f == null)
      a(
        g.el = r(g.children),
        v,
        A
      );
    else {
      const E = g.el = f.el;
      g.children !== f.children && d(E, g.children);
    }
  }, x = (f, g, v, A) => {
    f == null ? a(
      g.el = c(g.children || ""),
      v,
      A
    ) : g.el = f.el;
  }, L = (f, g, v, A) => {
    [f.el, f.anchor] = h(
      f.children,
      g,
      v,
      A,
      f.el,
      f.anchor
    );
  }, R = (f, g, v, A) => {
    if (g.children !== f.children) {
      const E = p(f.anchor);
      V(f), [g.el, g.anchor] = h(
        g.children,
        v,
        E,
        A
      );
    } else
      g.el = f.el, g.anchor = f.anchor;
  }, H = ({ el: f, anchor: g }, v, A) => {
    let E;
    for (; f && f !== g; )
      E = p(f), a(f, v, A), f = E;
    a(g, v, A);
  }, V = ({ el: f, anchor: g }) => {
    let v;
    for (; f && f !== g; )
      v = p(f), n(f), f = v;
    n(g);
  }, te = (f, g, v, A, E, k, j, O, b) => {
    if (g.type === "svg" ? j = "svg" : g.type === "math" && (j = "mathml"), f == null)
      B(
        g,
        v,
        A,
        E,
        k,
        j,
        O,
        b
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), F(
          f,
          g,
          E,
          k,
          j,
          O,
          b
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, B = (f, g, v, A, E, k, j, O) => {
    let b, _;
    const { props: z, shapeFlag: S, transition: K, dirs: Y } = f;
    if (b = f.el = s(
      f.type,
      k,
      z && z.is,
      z
    ), S & 8 ? u(b, f.children) : S & 16 && W(
      f.children,
      b,
      null,
      A,
      E,
      yo(f, k),
      j,
      O
    ), Y && ri(f, null, A, "created"), me(b, f, f.scopeId, j, A), z) {
      for (const de in z)
        de !== "value" && !pa(de) && o(b, de, null, z[de], k, A);
      "value" in z && o(b, "value", null, z.value, k), (_ = z.onVnodeBeforeMount) && At(_, A, f);
    }
    process.env.NODE_ENV !== "production" && (_n(b, "__vnode", f, !0), _n(b, "__vueParentComponent", A, !0)), Y && ri(f, null, A, "beforeMount");
    const se = Gm(E, K);
    if (se && K.beforeEnter(b), a(b, g, v), (_ = z && z.onVnodeMounted) || se || Y) {
      const de = process.env.NODE_ENV !== "production" && ot;
      et(() => {
        let re;
        process.env.NODE_ENV !== "production" && (re = rr(de));
        try {
          _ && At(_, A, f), se && K.enter(b), Y && ri(f, null, A, "mounted");
        } finally {
          process.env.NODE_ENV !== "production" && rr(re);
        }
      }, E);
    }
  }, me = (f, g, v, A, E) => {
    if (v && m(f, v), A)
      for (let k = 0; k < A.length; k++)
        m(f, A[k]);
    if (E) {
      let k = E.subTree;
      if (process.env.NODE_ENV !== "production" && k.patchFlag > 0 && k.patchFlag & 2048 && (k = Ts(k.children) || k), g === k || Lu(k.type) && (k.ssContent === g || k.ssFallback === g)) {
        const j = E.vnode;
        me(
          f,
          j,
          j.scopeId,
          j.slotScopeIds,
          E.parent
        );
      }
    }
  }, W = (f, g, v, A, E, k, j, O, b = 0) => {
    for (let _ = b; _ < f.length; _++) {
      const z = f[_] = O ? zt(f[_]) : gt(f[_]);
      w(
        null,
        z,
        g,
        v,
        A,
        E,
        k,
        j,
        O
      );
    }
  }, F = (f, g, v, A, E, k, j) => {
    const O = g.el = f.el;
    process.env.NODE_ENV !== "production" && (O.__vnode = g);
    let { patchFlag: b, dynamicChildren: _, dirs: z } = g;
    b |= f.patchFlag & 16;
    const S = f.props || fe, K = g.props || fe;
    let Y;
    if (v && ci(v, !1), (Y = K.onVnodeBeforeUpdate) && At(Y, v, g, f), z && ri(g, f, v, "beforeUpdate"), v && ci(v, !0), // HMR updated, force full diff
    (process.env.NODE_ENV !== "production" && ot || // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!f.dynamicChildren || f.dynamicChildren.length !== _.length)) && (b = 0, j = !1, _ = null), (S.innerHTML && K.innerHTML == null || S.textContent && K.textContent == null) && u(O, ""), _ ? (U(
      f.dynamicChildren,
      _,
      O,
      v,
      A,
      yo(g, E),
      k
    ), process.env.NODE_ENV !== "production" && cn(f, g)) : j || ie(
      f,
      g,
      O,
      null,
      v,
      A,
      yo(g, E),
      k,
      !1
    ), b > 0) {
      if (b & 16)
        Q(O, S, K, v, E);
      else if (b & 2 && S.class !== K.class && o(O, "class", null, K.class, E), b & 4 && o(O, "style", S.style, K.style, E), b & 8) {
        const se = g.dynamicProps;
        for (let de = 0; de < se.length; de++) {
          const re = se[de], Ce = S[re], Me = K[re];
          (Me !== Ce || re === "value") && o(O, re, Ce, Me, E, v);
        }
      }
      b & 1 && f.children !== g.children && u(O, g.children);
    } else !j && _ == null && Q(O, S, K, v, E);
    ((Y = K.onVnodeUpdated) || z) && et(() => {
      Y && At(Y, v, g, f), z && ri(g, f, v, "updated");
    }, A);
  }, U = (f, g, v, A, E, k, j) => {
    for (let O = 0; O < g.length; O++) {
      const b = f[O], _ = g[O], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        b.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (b.type === Ke || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !sa(b, _) || // - In the case of a component, it could contain anything.
        b.shapeFlag & 198) ? l(b.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      w(
        b,
        _,
        z,
        null,
        A,
        E,
        k,
        j,
        !0
      );
    }
  }, Q = (f, g, v, A, E) => {
    if (g !== v) {
      if (g !== fe)
        for (const k in g)
          !pa(k) && !(k in v) && o(
            f,
            k,
            g[k],
            null,
            E,
            A
          );
      for (const k in v) {
        if (pa(k)) continue;
        const j = v[k], O = g[k];
        j !== O && k !== "value" && o(f, k, O, j, E, A);
      }
      "value" in v && o(f, "value", g.value, v.value, E);
    }
  }, ce = (f, g, v, A, E, k, j, O, b) => {
    const _ = g.el = f ? f.el : r(""), z = g.anchor = f ? f.anchor : r("");
    let { patchFlag: S, dynamicChildren: K, slotScopeIds: Y } = g;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (ot || S & 2048) && (S = 0, b = !1, K = null), Y && (O = O ? O.concat(Y) : Y), f == null ? (a(_, v, A), a(z, v, A), W(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      v,
      z,
      E,
      k,
      j,
      O,
      b
    )) : S > 0 && S & 64 && K && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === K.length ? (U(
      f.dynamicChildren,
      K,
      v,
      E,
      k,
      j,
      O
    ), process.env.NODE_ENV !== "production" ? cn(f, g) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (g.key != null || E && g === E.subTree) && cn(
        f,
        g,
        !0
        /* shallow */
      )
    )) : ie(
      f,
      g,
      v,
      z,
      E,
      k,
      j,
      O,
      b
    );
  }, Ve = (f, g, v, A, E, k, j, O, b) => {
    g.slotScopeIds = O, f == null ? g.shapeFlag & 512 ? E.ctx.activate(
      g,
      v,
      A,
      j,
      b
    ) : Fe(
      g,
      v,
      A,
      E,
      k,
      j,
      b
    ) : be(f, g, b);
  }, Fe = (f, g, v, A, E, k, j) => {
    const O = f.component = og(
      f,
      A,
      E
    );
    if (process.env.NODE_ENV !== "production" && O.type.__hmrId && Up(O), process.env.NODE_ENV !== "production" && (on(f), Si(O, "mount")), Is(f) && (O.ctx.renderer = si), process.env.NODE_ENV !== "production" && Si(O, "init"), rg(O, !1, j), process.env.NODE_ENV !== "production" && Oi(O, "init"), process.env.NODE_ENV !== "production" && ot && (f.el = null), O.asyncDep) {
      if (E && E.registerDep(O, $, j), !f.el) {
        const b = O.subTree = Vt(rt);
        x(null, b, g, v), f.placeholder = b.el;
      }
    } else
      $(
        O,
        f,
        g,
        v,
        E,
        k,
        j
      );
    process.env.NODE_ENV !== "production" && (sn(), Oi(O, "mount"));
  }, be = (f, g, v) => {
    const A = g.component = f.component;
    if (Nm(f, g, v))
      if (A.asyncDep && !A.asyncResolved) {
        process.env.NODE_ENV !== "production" && on(g), J(A, g, v), process.env.NODE_ENV !== "production" && sn();
        return;
      } else
        A.next = g, A.update();
    else
      g.el = f.el, A.vnode = g;
  }, $ = (f, g, v, A, E, k, j) => {
    const O = () => {
      if (f.isMounted) {
        let { next: S, bu: K, u: Y, parent: se, vnode: de } = f;
        {
          const It = Fu(f);
          if (It) {
            S && (S.el = de.el, J(f, S, j)), It.asyncDep.then(() => {
              et(() => {
                f.isUnmounted || _();
              }, E);
            });
            return;
          }
        }
        let re = S, Ce;
        process.env.NODE_ENV !== "production" && on(S || f.vnode), ci(f, !1), S ? (S.el = de.el, J(f, S, j)) : S = de, K && Vi(K), (Ce = S.props && S.props.onVnodeBeforeUpdate) && At(Ce, se, S, de), ci(f, !0), process.env.NODE_ENV !== "production" && Si(f, "render");
        const Me = hr(f);
        process.env.NODE_ENV !== "production" && Oi(f, "render");
        const wt = f.subTree;
        f.subTree = Me, process.env.NODE_ENV !== "production" && Si(f, "patch"), w(
          wt,
          Me,
          // parent may have changed if it's in a teleport
          l(wt.el),
          // anchor may have changed if it's in a fragment
          Jt(wt),
          f,
          E,
          k
        ), process.env.NODE_ENV !== "production" && Oi(f, "patch"), S.el = Me.el, re === null && Dm(f, Me.el), Y && et(Y, E), (Ce = S.props && S.props.onVnodeUpdated) && et(
          () => At(Ce, se, S, de),
          E
        ), process.env.NODE_ENV !== "production" && mu(f), process.env.NODE_ENV !== "production" && sn();
      } else {
        let S;
        const { el: K, props: Y } = g, { bm: se, m: de, parent: re, root: Ce, type: Me } = f, wt = ba(g);
        ci(f, !1), se && Vi(se), !wt && (S = Y && Y.onVnodeBeforeMount) && At(S, re, g), ci(f, !0);
        {
          Ce.ce && Ce.ce._hasShadowRoot() && Ce.ce._injectChildStyle(
            Me,
            f.parent ? f.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && Si(f, "render");
          const It = f.subTree = hr(f);
          process.env.NODE_ENV !== "production" && Oi(f, "render"), process.env.NODE_ENV !== "production" && Si(f, "patch"), w(
            null,
            It,
            v,
            A,
            f,
            E,
            k
          ), process.env.NODE_ENV !== "production" && Oi(f, "patch"), g.el = It.el;
        }
        if (de && et(de, E), !wt && (S = Y && Y.onVnodeMounted)) {
          const It = g;
          et(
            () => At(S, re, It),
            E
          );
        }
        (g.shapeFlag & 256 || re && ba(re.vnode) && re.vnode.shapeFlag & 256) && f.a && et(f.a, E), f.isMounted = !0, process.env.NODE_ENV !== "production" && Zp(f), g = v = A = null;
      }
    };
    f.scope.on();
    const b = f.effect = new Md(O);
    f.scope.off();
    const _ = f.update = b.run.bind(b), z = f.job = b.runIfDirty.bind(b);
    z.i = f, z.id = f.uid, b.scheduler = () => Gn(z), ci(f, !0), process.env.NODE_ENV !== "production" && (b.onTrack = f.rtc ? (S) => Vi(f.rtc, S) : void 0, b.onTrigger = f.rtg ? (S) => Vi(f.rtg, S) : void 0), _();
  }, J = (f, g, v) => {
    g.component = f;
    const A = f.vnode.props;
    f.vnode = g, f.next = null, Pm(f, g.props, A, v), Hm(f, g.children, v), lt(), sr(f), ft();
  }, ie = (f, g, v, A, E, k, j, O, b = !1) => {
    const _ = f && f.children, z = f ? f.shapeFlag : 0, S = g.children, { patchFlag: K, shapeFlag: Y } = g;
    if (K > 0) {
      if (K & 128) {
        Le(
          _,
          S,
          v,
          A,
          E,
          k,
          j,
          O,
          b
        );
        return;
      } else if (K & 256) {
        Be(
          _,
          S,
          v,
          A,
          E,
          k,
          j,
          O,
          b
        );
        return;
      }
    }
    Y & 8 ? (z & 16 && oi(_, E, k), S !== _ && u(v, S)) : z & 16 ? Y & 16 ? Le(
      _,
      S,
      v,
      A,
      E,
      k,
      j,
      O,
      b
    ) : oi(_, E, k, !0) : (z & 8 && u(v, ""), Y & 16 && W(
      S,
      v,
      A,
      E,
      k,
      j,
      O,
      b
    ));
  }, Be = (f, g, v, A, E, k, j, O, b) => {
    f = f || zi, g = g || zi;
    const _ = f.length, z = g.length, S = Math.min(_, z);
    let K;
    for (K = 0; K < S; K++) {
      const Y = g[K] = b ? zt(g[K]) : gt(g[K]);
      w(
        f[K],
        Y,
        v,
        null,
        E,
        k,
        j,
        O,
        b
      );
    }
    _ > z ? oi(
      f,
      E,
      k,
      !0,
      !1,
      S
    ) : W(
      g,
      v,
      A,
      E,
      k,
      j,
      O,
      b,
      S
    );
  }, Le = (f, g, v, A, E, k, j, O, b) => {
    let _ = 0;
    const z = g.length;
    let S = f.length - 1, K = z - 1;
    for (; _ <= S && _ <= K; ) {
      const Y = f[_], se = g[_] = b ? zt(g[_]) : gt(g[_]);
      if (sa(Y, se))
        w(
          Y,
          se,
          v,
          null,
          E,
          k,
          j,
          O,
          b
        );
      else
        break;
      _++;
    }
    for (; _ <= S && _ <= K; ) {
      const Y = f[S], se = g[K] = b ? zt(g[K]) : gt(g[K]);
      if (sa(Y, se))
        w(
          Y,
          se,
          v,
          null,
          E,
          k,
          j,
          O,
          b
        );
      else
        break;
      S--, K--;
    }
    if (_ > S) {
      if (_ <= K) {
        const Y = K + 1, se = Y < z ? g[Y].el : A;
        for (; _ <= K; )
          w(
            null,
            g[_] = b ? zt(g[_]) : gt(g[_]),
            v,
            se,
            E,
            k,
            j,
            O,
            b
          ), _++;
      }
    } else if (_ > K)
      for (; _ <= S; )
        Ze(f[_], E, k, !0), _++;
    else {
      const Y = _, se = _, de = /* @__PURE__ */ new Map();
      for (_ = se; _ <= K; _++) {
        const We = g[_] = b ? zt(g[_]) : gt(g[_]);
        We.key != null && (process.env.NODE_ENV !== "production" && de.has(We.key) && N(
          "Duplicate keys found during update:",
          JSON.stringify(We.key),
          "Make sure keys are unique."
        ), de.set(We.key, _));
      }
      let re, Ce = 0;
      const Me = K - se + 1;
      let wt = !1, It = 0;
      const aa = new Array(Me);
      for (_ = 0; _ < Me; _++) aa[_] = 0;
      for (_ = Y; _ <= S; _++) {
        const We = f[_];
        if (Ce >= Me) {
          Ze(We, E, k, !0);
          continue;
        }
        let Et;
        if (We.key != null)
          Et = de.get(We.key);
        else
          for (re = se; re <= K; re++)
            if (aa[re - se] === 0 && sa(We, g[re])) {
              Et = re;
              break;
            }
        Et === void 0 ? Ze(We, E, k, !0) : (aa[Et - se] = _ + 1, Et >= It ? It = Et : wt = !0, w(
          We,
          g[Et],
          v,
          null,
          E,
          k,
          j,
          O,
          b
        ), Ce++);
      }
      const Ys = wt ? Jm(aa) : zi;
      for (re = Ys.length - 1, _ = Me - 1; _ >= 0; _--) {
        const We = se + _, Et = g[We], Xs = g[We + 1], Qs = We + 1 < z ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Xs.el || zu(Xs)
        ) : A;
        aa[_] === 0 ? w(
          null,
          Et,
          v,
          Qs,
          E,
          k,
          j,
          O,
          b
        ) : wt && (re < 0 || _ !== Ys[re] ? Oe(Et, v, Qs, 2) : re--);
      }
    }
  }, Oe = (f, g, v, A, E = null) => {
    const { el: k, type: j, transition: O, children: b, shapeFlag: _ } = f;
    if (_ & 6) {
      Oe(f.component.subTree, g, v, A);
      return;
    }
    if (_ & 128) {
      f.suspense.move(g, v, A);
      return;
    }
    if (_ & 64) {
      j.move(f, g, v, si);
      return;
    }
    if (j === Ke) {
      a(k, g, v);
      for (let S = 0; S < b.length; S++)
        Oe(b[S], g, v, A);
      a(f.anchor, g, v);
      return;
    }
    if (j === dn) {
      H(f, g, v);
      return;
    }
    if (A !== 2 && _ & 1 && O)
      if (A === 0)
        O.persisted && !k[_o] ? a(k, g, v) : (O.beforeEnter(k), a(k, g, v), et(() => O.enter(k), E));
      else {
        const { leave: S, delayLeave: K, afterLeave: Y } = O, se = () => {
          f.ctx.isUnmounted ? n(k) : a(k, g, v);
        }, de = () => {
          const re = k._isLeaving || !!k[_o];
          k._isLeaving && k[_o](
            !0
            /* cancelled */
          ), O.persisted && !re ? se() : S(k, () => {
            se(), Y && Y();
          });
        };
        K ? K(k, se, de) : de();
      }
    else
      a(k, g, v);
  }, Ze = (f, g, v, A = !1, E = !1) => {
    const {
      type: k,
      props: j,
      ref: O,
      children: b,
      dynamicChildren: _,
      shapeFlag: z,
      patchFlag: S,
      dirs: K,
      cacheIndex: Y,
      memo: se
    } = f;
    if (S === -2 && (E = !1), O != null && (lt(), ha(O, null, v, f, !0), ft()), Y != null && (g.renderCache[Y] = void 0), z & 256) {
      g.ctx.deactivate(f);
      return;
    }
    const de = z & 1 && K, re = !ba(f);
    let Ce;
    if (re && (Ce = j && j.onVnodeBeforeUnmount) && At(Ce, g, f), z & 6)
      uo(f.component, v, A);
    else {
      if (z & 128) {
        f.suspense.unmount(v, A);
        return;
      }
      de && ri(f, null, g, "beforeUnmount"), z & 64 ? f.type.remove(
        f,
        g,
        v,
        si,
        A
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (k !== Ke || S > 0 && S & 64) ? oi(
        _,
        g,
        v,
        !1,
        !0
      ) : (k === Ke && S & 384 || !E && z & 16) && oi(b, g, v), A && Wt(f);
    }
    const Me = se != null && Y == null;
    (re && (Ce = j && j.onVnodeUnmounted) || de || Me) && et(() => {
      Ce && At(Ce, g, f), de && ri(f, null, g, "unmounted"), Me && (f.el = null);
    }, v);
  }, Wt = (f) => {
    const { type: g, el: v, anchor: A, transition: E } = f;
    if (g === Ke) {
      process.env.NODE_ENV !== "production" && f.patchFlag > 0 && f.patchFlag & 2048 && E && !E.persisted ? f.children.forEach((j) => {
        j.type === rt ? n(j.el) : Wt(j);
      }) : Gt(v, A);
      return;
    }
    if (g === dn) {
      V(f);
      return;
    }
    const k = () => {
      n(v), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (f.shapeFlag & 1 && E && !E.persisted) {
      const { leave: j, delayLeave: O } = E, b = () => j(v, k);
      O ? O(f.el, k, b) : b();
    } else
      k();
  }, Gt = (f, g) => {
    let v;
    for (; f !== g; )
      v = p(f), n(f), f = v;
    n(g);
  }, uo = (f, g, v) => {
    process.env.NODE_ENV !== "production" && f.type.__hmrId && Fp(f);
    const { bum: A, scope: E, job: k, subTree: j, um: O, m: b, a: _ } = f;
    wr(b), wr(_), A && Vi(A), E.stop(), k && (k.flags |= 8, Ze(j, f, g, v)), O && et(O, g), et(() => {
      f.isUnmounted = !0;
    }, g), process.env.NODE_ENV !== "production" && Kp(f);
  }, oi = (f, g, v, A = !1, E = !1, k = 0) => {
    for (let j = k; j < f.length; j++)
      Ze(f[j], g, v, A, E);
  }, Jt = (f) => {
    if (f.shapeFlag & 6)
      return Jt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const g = p(f.anchor || f.el), v = g && g[tm];
    return v ? p(v) : g;
  };
  let ia = !1;
  const Ka = (f, g, v) => {
    let A;
    f == null ? g._vnode && (Ze(g._vnode, null, null, !0), A = g._vnode.component) : w(
      g._vnode || null,
      f,
      g,
      null,
      null,
      null,
      v
    ), g._vnode = f, ia || (ia = !0, sr(A), lu(), ia = !1);
  }, si = {
    p: w,
    um: Ze,
    m: Oe,
    r: Wt,
    mt: Fe,
    mc: W,
    pc: ie,
    pbc: U,
    n: Jt,
    o: e
  };
  return {
    render: Ka,
    hydrate: void 0,
    createApp: Am(Ka)
  };
}
function yo({ type: e, props: t }, i) {
  return i === "svg" && e === "foreignObject" || i === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : i;
}
function ci({ effect: e, job: t }, i) {
  i ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Gm(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function cn(e, t, i = !1) {
  const a = e.children, n = t.children;
  if (q(a) && q(n))
    for (let o = 0; o < a.length; o++) {
      const s = a[o];
      let r = n[o];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = n[o] = zt(n[o]), r.el = s.el), !i && r.patchFlag !== -2 && cn(s, r)), r.type === Fa && (r.patchFlag === -1 && (r = n[o] = zt(r)), r.el = s.el), r.type === rt && !r.el && (r.el = s.el), process.env.NODE_ENV !== "production" && r.el && (r.el.__vnode = r);
    }
}
function Jm(e) {
  const t = e.slice(), i = [0];
  let a, n, o, s, r;
  const c = e.length;
  for (a = 0; a < c; a++) {
    const d = e[a];
    if (d !== 0) {
      if (n = i[i.length - 1], e[n] < d) {
        t[a] = n, i.push(a);
        continue;
      }
      for (o = 0, s = i.length - 1; o < s; )
        r = o + s >> 1, e[i[r]] < d ? o = r + 1 : s = r;
      d < e[i[o]] && (o > 0 && (t[a] = i[o - 1]), i[o] = a);
    }
  }
  for (o = i.length, s = i[o - 1]; o-- > 0; )
    i[o] = s, s = t[s];
  return i;
}
function Fu(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Fu(t);
}
function wr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function zu(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? zu(t.subTree) : null;
}
const Lu = (e) => e.__isSuspense;
function Ym(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : uu(e);
}
const Ke = /* @__PURE__ */ Symbol.for("v-fgt"), Fa = /* @__PURE__ */ Symbol.for("v-txt"), rt = /* @__PURE__ */ Symbol.for("v-cmt"), dn = /* @__PURE__ */ Symbol.for("v-stc"), _a = [];
let st = null;
function ue(e = !1) {
  _a.push(st = e ? null : []);
}
function Xm() {
  _a.pop(), st = _a[_a.length - 1] || null;
}
let Ea = 1;
function Ir(e, t = !1) {
  Ea += e, e < 0 && st && t && (st.hasOnce = !0);
}
function Mu(e) {
  return e.dynamicChildren = Ea > 0 ? st || zi : null, Xm(), Ea > 0 && st && st.push(e), e;
}
function ge(e, t, i, a, n, o) {
  return Mu(
    D(
      e,
      t,
      i,
      a,
      n,
      o,
      !0
    )
  );
}
function Qm(e, t, i, a, n) {
  return Mu(
    Vt(
      e,
      t,
      i,
      a,
      n,
      !0
    )
  );
}
function Xn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function sa(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const i = rn.get(t.type);
    if (i && i.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const eg = (...e) => Zu(
  ...e
), Bu = ({ key: e }) => e ?? null, un = ({
  ref: e,
  ref_key: t,
  ref_for: i
}) => (typeof e == "number" && (e = "" + e), e != null ? we(e) || /* @__PURE__ */ _e(e) || G(e) ? { i: Qe, r: e, k: t, f: !!i } : e : null);
function D(e, t = null, i = null, a = 0, n = null, o = e === Ke ? 0 : 1, s = !1, r = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Bu(t),
    ref: t && un(t),
    scopeId: hu,
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
    shapeFlag: o,
    patchFlag: a,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: Qe
  };
  return r ? (On(c, i), o & 128 && e.normalize(c)) : i && (c.shapeFlag |= we(i) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && N("VNode created with invalid key (NaN). VNode type:", c.type), Ea > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  st && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && st.push(c), c;
}
const Vt = process.env.NODE_ENV !== "production" ? eg : Zu;
function Zu(e, t = null, i = null, a = 0, n = null, o = !1) {
  if ((!e || e === mm) && (process.env.NODE_ENV !== "production" && !e && N(`Invalid vnode type when creating vnode: ${e}.`), e = rt), Xn(e)) {
    const r = ti(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return i && On(r, i), Ea > 0 && !o && st && (r.shapeFlag & 6 ? st[st.indexOf(e)] = r : st.push(r)), r.patchFlag = -2, r;
  }
  if (Gu(e) && (e = e.__vccOpts), t) {
    t = tg(t);
    let { class: r, style: c } = t;
    r && !we(r) && (t.class = Zn(r)), oe(c) && (/* @__PURE__ */ Hi(c) && !q(c) && (c = Se({}, c)), t.style = Bn(c));
  }
  const s = we(e) ? 1 : Lu(e) ? 128 : im(e) ? 64 : oe(e) ? 4 : G(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && s & 4 && /* @__PURE__ */ Hi(e) && (e = /* @__PURE__ */ X(e), N(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), D(
    e,
    t,
    i,
    a,
    n,
    s,
    o,
    !0
  );
}
function tg(e) {
  return e ? /* @__PURE__ */ Hi(e) || Vu(e) ? Se({}, e) : e : null;
}
function ti(e, t, i = !1, a = !1) {
  const { props: n, ref: o, patchFlag: s, children: r, transition: c } = e, d = t ? ig(n || {}, t) : n, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Bu(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      i && o ? q(o) ? o.concat(un(t)) : [o, un(t)] : un(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && q(r) ? r.map(Hu) : r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ke ? s === -1 ? 16 : s | 16 : s,
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
  return c && a && ws(
    u,
    c.clone(u)
  ), u;
}
function Hu(e) {
  const t = ti(e);
  return q(e.children) && (t.children = e.children.map(Hu)), t;
}
function ln(e = " ", t = 0) {
  return Vt(Fa, null, e, t);
}
function Ci(e = "", t = !1) {
  return t ? (ue(), Qm(rt, null, e)) : Vt(rt, null, e);
}
function gt(e) {
  return e == null || typeof e == "boolean" ? Vt(rt) : q(e) ? Vt(
    Ke,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Xn(e) ? zt(e) : Vt(Fa, null, String(e));
}
function zt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ti(e);
}
function On(e, t) {
  let i = 0;
  const { shapeFlag: a } = e;
  if (t == null)
    t = null;
  else if (q(t))
    i = 16;
  else if (typeof t == "object")
    if (a & 65) {
      const n = t.default;
      n && (n._c && (n._d = !1), On(e, n()), n._c && (n._d = !0));
      return;
    } else {
      i = 32;
      const n = t._;
      !n && !Vu(t) ? t._ctx = Qe : n === 3 && Qe && (Qe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (G(t)) {
    if (a & 65) {
      On(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Qe }, i = 32;
  } else
    t = String(t), a & 64 ? (i = 16, t = [ln(t)]) : i = 8;
  e.children = t, e.shapeFlag |= i;
}
function ig(...e) {
  const t = {};
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    for (const n in a)
      if (n === "class")
        t.class !== a.class && (t.class = Zn([t.class, a.class]));
      else if (n === "style")
        t.style = Bn([t.style, a.style]);
      else if (Va(n)) {
        const o = t[n], s = a[n];
        s && o !== s && !(q(o) && o.includes(s)) ? t[n] = o ? [].concat(o, s) : s : s == null && o == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !ya(n) && (t[n] = s);
      } else n !== "" && (t[n] = a[n]);
  }
  return t;
}
function At(e, t, i, a = null) {
  kt(e, t, 7, [
    i,
    a
  ]);
}
const ag = xu();
let ng = 0;
function og(e, t, i) {
  const a = e.type, n = (t ? t.appContext : e.appContext) || ag, o = {
    uid: ng++,
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
    scope: new Fd(
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
    emitsOptions: Su(a, n),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: fe,
    // inheritAttrs
    inheritAttrs: a.inheritAttrs,
    // state
    ctx: fe,
    data: fe,
    props: fe,
    attrs: fe,
    slots: fe,
    refs: fe,
    setupState: fe,
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
  return process.env.NODE_ENV !== "production" ? o.ctx = gm(o) : o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = xm.bind(null, o), e.ce && e.ce(o), o;
}
let Pe = null;
const Qn = () => Pe || Qe;
let Cn, Ho;
{
  const e = Pa(), t = (i, a) => {
    let n;
    return (n = e[i]) || (n = e[i] = []), n.push(a), (o) => {
      n.length > 1 ? n.forEach((s) => s(o)) : n[0](o);
    };
  };
  Cn = t(
    "__VUE_INSTANCE_SETTERS__",
    (i) => Pe = i
  ), Ho = t(
    "__VUE_SSR_SETTERS__",
    (i) => Aa = i
  );
}
const za = (e) => {
  const t = Pe;
  return Cn(e), e.scope.on(), () => {
    e.scope.off(), Cn(t);
  };
}, Er = () => {
  Pe && Pe.scope.off(), Cn(null);
}, sg = /* @__PURE__ */ Kt("slot,component");
function Ko(e, { isNativeTag: t }) {
  (sg(e) || t(e)) && N(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function Ku(e) {
  return e.vnode.shapeFlag & 4;
}
let Aa = !1;
function rg(e, t = !1, i = !1) {
  t && Ho(t);
  const { props: a, children: n } = e.vnode, o = Ku(e);
  Vm(e, a, o, t), Zm(e, n, i || t);
  const s = o ? cg(e, t) : void 0;
  return t && Ho(!1), s;
}
function cg(e, t) {
  const i = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (i.name && Ko(i.name, e.appContext.config), i.components) {
      const n = Object.keys(i.components);
      for (let o = 0; o < n.length; o++)
        Ko(n[o], e.appContext.config);
    }
    if (i.directives) {
      const n = Object.keys(i.directives);
      for (let o = 0; o < n.length; o++)
        bu(n[o]);
    }
    i.compilerOptions && dg() && N(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Eu), process.env.NODE_ENV !== "production" && hm(e);
  const { setup: a } = i;
  if (a) {
    lt();
    const n = e.setupContext = a.length > 1 ? lg(e) : null, o = za(e), s = Xi(
      a,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Nt(e.props) : e.props,
        n
      ]
    ), r = ls(s);
    if (ft(), o(), (r || e.sp) && !ba(e) && ku(e), r) {
      if (s.then(Er, Er), t)
        return s.then((c) => {
          Ar(e, c, t);
        }).catch((c) => {
          $a(c, e, 0);
        });
      if (e.asyncDep = s, process.env.NODE_ENV !== "production" && !e.suspense) {
        const c = La(e, i);
        N(
          `Component <${c}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Ar(e, s, t);
  } else
    qu(e, t);
}
function Ar(e, t, i) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : oe(t) ? (process.env.NODE_ENV !== "production" && Xn(t) && N(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = ou(t), process.env.NODE_ENV !== "production" && bm(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && N(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), qu(e, i);
}
const dg = () => !0;
function qu(e, t, i) {
  const a = e.type;
  e.render || (e.render = a.render || $e);
  {
    const n = za(e);
    lt();
    try {
      vm(e);
    } finally {
      ft(), n();
    }
  }
  process.env.NODE_ENV !== "production" && !a.render && e.render === $e && !t && (a.template ? N(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : N("Component is missing template or render function: ", a));
}
const Tr = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return xn(), Re(e, "get", ""), e[t];
  },
  set() {
    return N("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return N("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Re(e, "get", ""), e[t];
  }
};
function ug(e) {
  return new Proxy(e.slots, {
    get(t, i) {
      return Re(e, "get", "$slots"), t[i];
    }
  });
}
function lg(e) {
  const t = (i) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && N("expose() should be called only once per setup()."), i != null)) {
      let a = typeof i;
      a === "object" && (q(i) ? a = "array" : /* @__PURE__ */ _e(i) && (a = "ref")), a !== "object" && N(
        `expose() should be passed a plain object, received ${a}.`
      );
    }
    e.exposed = i || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let i, a;
    return Object.freeze({
      get attrs() {
        return i || (i = new Proxy(e.attrs, Tr));
      },
      get slots() {
        return a || (a = ug(e));
      },
      get emit() {
        return (n, ...o) => e.emit(n, ...o);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, Tr),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function eo(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ou(Dt(e.exposed)), {
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
const fg = /(?:^|[-_])\w/g, pg = (e) => e.replace(fg, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Wu(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function La(e, t, i = !1) {
  let a = Wu(t);
  if (!a && t.__file) {
    const n = t.__file.match(/([^/\\]+)\.\w+$/);
    n && (a = n[1]);
  }
  if (!a && e) {
    const n = (o) => {
      for (const s in o)
        if (o[s] === t)
          return s;
    };
    a = n(e.components) || e.parent && n(
      e.parent.type.components
    ) || n(e.appContext.components);
  }
  return a ? pg(a) : i ? "App" : "Anonymous";
}
function Gu(e) {
  return G(e) && "__vccOpts" in e;
}
const Xt = (e, t) => {
  const i = /* @__PURE__ */ Sp(e, t, Aa);
  if (process.env.NODE_ENV !== "production") {
    const a = Qn();
    a && a.appContext.config.warnRecursiveComputed && (i._warnRecursive = !0);
  }
  return i;
};
function mg() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, i = { style: "color:#f5222d" }, a = { style: "color:#eb2f96" }, n = {
    __vue_custom_formatter: !0,
    header(l) {
      if (!oe(l))
        return null;
      if (l.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ _e(l)) {
        lt();
        const p = l.value;
        return ft(), [
          "div",
          {},
          ["span", e, u(l)],
          "<",
          r(p),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ _t(l))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ qe(l) ? "ShallowReactive" : "Reactive"],
            "<",
            r(l),
            `>${/* @__PURE__ */ vt(l) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ vt(l))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ qe(l) ? "ShallowReadonly" : "Readonly"],
            "<",
            r(l),
            ">"
          ];
      }
      return null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const p = [];
    l.type.props && l.props && p.push(s("props", /* @__PURE__ */ X(l.props))), l.setupState !== fe && p.push(s("setup", l.setupState)), l.data !== fe && p.push(s("data", /* @__PURE__ */ X(l.data)));
    const m = c(l, "computed");
    m && p.push(s("computed", m));
    const h = c(l, "inject");
    return h && p.push(s("injected", h)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: a.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), p;
  }
  function s(l, p) {
    return p = Se({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((m) => [
          "div",
          {},
          ["span", a, m + ": "],
          r(p[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function r(l, p = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", i, JSON.stringify(l)] : typeof l == "boolean" ? ["span", a, l] : oe(l) ? ["object", { object: p ? /* @__PURE__ */ X(l) : l }] : ["span", i, String(l)];
  }
  function c(l, p) {
    const m = l.type;
    if (G(m))
      return;
    const h = {};
    for (const w in l.ctx)
      d(m, w, p) && (h[w] = l.ctx[w]);
    return h;
  }
  function d(l, p, m) {
    const h = l[m];
    if (q(h) && h.includes(p) || oe(h) && p in h || l.extends && d(l.extends, p, m) || l.mixins && l.mixins.some((w) => d(w, p, m)))
      return !0;
  }
  function u(l) {
    return /* @__PURE__ */ qe(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(n) : window.devtoolsFormatters = [n];
}
const xr = "3.5.39", Bt = process.env.NODE_ENV !== "production" ? N : $e;
process.env.NODE_ENV;
process.env.NODE_ENV;
let qo;
const Sr = typeof window < "u" && window.trustedTypes;
if (Sr)
  try {
    qo = /* @__PURE__ */ Sr.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && Bt(`Error creating trusted types policy: ${e}`);
  }
const Ju = qo ? (e) => qo.createHTML(e) : (e) => e, gg = "http://www.w3.org/2000/svg", hg = "http://www.w3.org/1998/Math/MathML", Ut = typeof document < "u" ? document : null, Or = Ut && /* @__PURE__ */ Ut.createElement("template"), bg = {
  insert: (e, t, i) => {
    t.insertBefore(e, i || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, i, a) => {
    const n = t === "svg" ? Ut.createElementNS(gg, e) : t === "mathml" ? Ut.createElementNS(hg, e) : i ? Ut.createElement(e, { is: i }) : Ut.createElement(e);
    return e === "select" && a && a.multiple != null && n.setAttribute("multiple", a.multiple), n;
  },
  createText: (e) => Ut.createTextNode(e),
  createComment: (e) => Ut.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ut.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, i, a, n, o) {
    const s = i ? i.previousSibling : t.lastChild;
    if (n && (n === o || n.nextSibling))
      for (; t.insertBefore(n.cloneNode(!0), i), !(n === o || !(n = n.nextSibling)); )
        ;
    else {
      Or.innerHTML = Ju(
        a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e
      );
      const r = Or.content;
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
}, _g = /* @__PURE__ */ Symbol("_vtc");
function vg(e, t, i) {
  const a = e[_g];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : i ? e.setAttribute("class", t) : e.className = t;
}
const Cr = /* @__PURE__ */ Symbol("_vod"), yg = /* @__PURE__ */ Symbol("_vsh"), kg = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), wg = /(?:^|;)\s*display\s*:/;
function Ig(e, t, i) {
  const a = e.style, n = we(i);
  let o = !1;
  if (i && !n) {
    if (t)
      if (we(t))
        for (const s of t.split(";")) {
          const r = s.slice(0, s.indexOf(":")).trim();
          i[r] == null && da(a, r, "");
        }
      else
        for (const s in t)
          i[s] == null && da(a, s, "");
    for (const s in i) {
      s === "display" && (o = !0);
      const r = i[s];
      r != null ? Tg(
        e,
        s,
        !we(t) && t ? t[s] : void 0,
        r
      ) || da(a, s, r) : da(a, s, "");
    }
  } else if (n) {
    if (t !== i) {
      const s = a[kg];
      s && (i += ";" + s), a.cssText = i, o = wg.test(i);
    }
  } else t && e.removeAttribute("style");
  Cr in e && (e[Cr] = o ? a.display : "", e[yg] && (a.display = "none"));
}
const Eg = /[^\\];\s*$/, Nr = /\s*!important$/;
function da(e, t, i) {
  if (q(i))
    i.forEach((a) => da(e, t, a));
  else if (i == null && (i = ""), process.env.NODE_ENV !== "production" && Eg.test(i) && Bt(
    `Unexpected semicolon at the end of '${t}' style value: '${i}'`
  ), t.startsWith("--"))
    e.setProperty(t, i);
  else {
    const a = Ag(e, t);
    Nr.test(i) ? e.setProperty(
      ei(a),
      i.replace(Nr, ""),
      "important"
    ) : e[a] = i;
  }
}
const Dr = ["Webkit", "Moz", "ms"], ko = {};
function Ag(e, t) {
  const i = ko[t];
  if (i)
    return i;
  let a = tt(t);
  if (a !== "filter" && a in e)
    return ko[t] = a;
  a = Mn(a);
  for (let n = 0; n < Dr.length; n++) {
    const o = Dr[n] + a;
    if (o in e)
      return ko[t] = o;
  }
  return t;
}
function Tg(e, t, i, a) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && we(a) && i === a;
}
const Vr = "http://www.w3.org/1999/xlink";
function jr(e, t, i, a, n, o = Qf(t)) {
  a && t.startsWith("xlink:") ? i == null ? e.removeAttributeNS(Vr, t.slice(6, t.length)) : e.setAttributeNS(Vr, t, i) : i == null || o && !Pd(i) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : ct(i) ? String(i) : i
  );
}
function Pr(e, t, i, a, n) {
  if (t === "innerHTML" || t === "textContent") {
    i != null && (e[t] = t === "innerHTML" ? Ju(i) : i);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const r = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = i == null ? (
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
    r === "boolean" ? i = Pd(i) : i == null && r === "string" ? (i = "", s = !0) : r === "number" && (i = 0, s = !0);
  }
  try {
    e[t] = i;
  } catch (r) {
    process.env.NODE_ENV !== "production" && !s && Bt(
      `Failed setting prop "${t}" on <${o.toLowerCase()}>: value ${i} is invalid.`,
      r
    );
  }
  s && e.removeAttribute(n || t);
}
function pi(e, t, i, a) {
  e.addEventListener(t, i, a);
}
function xg(e, t, i, a) {
  e.removeEventListener(t, i, a);
}
const Rr = /* @__PURE__ */ Symbol("_vei");
function Sg(e, t, i, a, n = null) {
  const o = e[Rr] || (e[Rr] = {}), s = o[t];
  if (a && s)
    s.value = process.env.NODE_ENV !== "production" ? $r(a, t) : a;
  else {
    const [r, c] = Ng(t);
    if (a) {
      const d = o[t] = jg(
        process.env.NODE_ENV !== "production" ? $r(a, t) : a,
        n
      );
      pi(e, r, d, c);
    } else s && (xg(e, r, s, c), o[t] = void 0);
  }
}
const Og = /(Once|Passive|Capture)$/, Cg = /^on:?(?:Once|Passive|Capture)$/;
function Ng(e) {
  let t, i;
  for (; (i = e.match(Og)) && !Cg.test(e); )
    t || (t = {}), e = e.slice(0, e.length - i[1].length), t[i[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : ei(e.slice(2)), t];
}
let wo = 0;
const Dg = /* @__PURE__ */ Promise.resolve(), Vg = () => wo || (Dg.then(() => wo = 0), wo = Date.now());
function jg(e, t) {
  const i = (a) => {
    if (!a._vts)
      a._vts = Date.now();
    else if (a._vts <= i.attached)
      return;
    const n = i.value;
    if (q(n)) {
      const o = a.stopImmediatePropagation;
      a.stopImmediatePropagation = () => {
        o.call(a), a._stopped = !0;
      };
      const s = n.slice(), r = [a];
      for (let c = 0; c < s.length && !a._stopped; c++) {
        const d = s[c];
        d && kt(
          d,
          t,
          5,
          r
        );
      }
    } else
      kt(
        n,
        t,
        5,
        [a]
      );
  };
  return i.value = e, i.attached = Vg(), i;
}
function $r(e, t) {
  return G(e) || q(e) ? e : (Bt(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), $e);
}
const Ur = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Pg = (e, t, i, a, n, o) => {
  const s = n === "svg";
  t === "class" ? vg(e, a, s) : t === "style" ? Ig(e, i, a) : Va(t) ? ya(t) || Sg(e, t, i, a, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Rg(e, t, a, s)) ? (Pr(e, t, a), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && jr(e, t, a, s, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  ($g(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !we(a))) ? Pr(e, tt(t), a, o, t) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), jr(e, t, a, s));
};
function Rg(e, t, i, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Ur(t) && G(i));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const n = e.tagName;
    if (n === "IMG" || n === "VIDEO" || n === "CANVAS" || n === "SOURCE")
      return !1;
  }
  return Ur(t) && we(i) ? !1 : t in e;
}
function $g(e, t) {
  const i = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!i)
    return !1;
  const a = tt(t);
  return Array.isArray(i) ? i.some((n) => tt(n) === a) : Object.keys(i).some((n) => tt(n) === a);
}
const Nn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (i) => Vi(t, i) : t;
};
function Ug(e) {
  e.target.composing = !0;
}
function Fr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Bi = /* @__PURE__ */ Symbol("_assign");
function zr(e, t, i) {
  return t && (e = e.trim()), i && (e = ps(e)), e;
}
const Lr = {
  created(e, { modifiers: { lazy: t, trim: i, number: a } }, n) {
    e[Bi] = Nn(n);
    const o = a || n.props && n.props.type === "number";
    pi(e, t ? "change" : "input", (s) => {
      s.target.composing || e[Bi](zr(e.value, i, o));
    }), (i || o) && pi(e, "change", () => {
      e.value = zr(e.value, i, o);
    }), t || (pi(e, "compositionstart", Ug), pi(e, "compositionend", Fr), pi(e, "change", Fr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: i, modifiers: { lazy: a, trim: n, number: o } }, s) {
    if (e[Bi] = Nn(s), e.composing) return;
    const r = (o || e.type === "number") && !/^0\d/.test(e.value) ? ps(e.value) : e.value, c = t ?? "";
    if (r === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (a && t === i || n && e.value.trim() === c) || (e.value = c);
  }
}, Mr = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, i) {
    e[Bi] = Nn(i), pi(e, "change", () => {
      const a = e._modelValue, n = Fg(e), o = e.checked, s = e[Bi];
      if (q(a)) {
        const r = Rd(a, n), c = r !== -1;
        if (o && !c)
          s(a.concat(n));
        else if (!o && c) {
          const d = [...a];
          d.splice(r, 1), s(d);
        }
      } else if (Fn(a)) {
        const r = new Set(a);
        o ? r.add(n) : r.delete(n), s(r);
      } else
        s(Yu(e, o));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Br,
  beforeUpdate(e, t, i) {
    e[Bi] = Nn(i), Br(e, t, i);
  }
};
function Br(e, { value: t, oldValue: i }, a) {
  e._modelValue = t;
  let n;
  if (q(t))
    n = Rd(t, a.props.value) > -1;
  else if (Fn(t))
    n = t.has(a.props.value);
  else {
    if (t === i) return;
    n = Ra(t, Yu(e, !0));
  }
  e.checked !== n && (e.checked = n);
}
function Fg(e) {
  return "_value" in e ? e._value : e.value;
}
function Yu(e, t) {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}
const zg = ["ctrl", "shift", "alt", "meta"], Lg = {
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
  exact: (e, t) => zg.some((i) => e[`${i}Key`] && !t.includes(i))
}, Zr = (e, t) => {
  if (!e) return e;
  const i = e._withMods || (e._withMods = {}), a = t.join(".");
  return i[a] || (i[a] = ((n, ...o) => {
    for (let s = 0; s < t.length; s++) {
      const r = Lg[t[s]];
      if (r && r(n, t)) return;
    }
    return e(n, ...o);
  }));
}, Mg = /* @__PURE__ */ Se({ patchProp: Pg }, bg);
let Hr;
function Bg() {
  return Hr || (Hr = qm(Mg));
}
const Zg = ((...e) => {
  const t = Bg().createApp(...e);
  process.env.NODE_ENV !== "production" && (Kg(t), qg(t));
  const { mount: i } = t;
  return t.mount = (a) => {
    const n = Wg(a);
    if (!n) return;
    const o = t._component;
    !G(o) && !o.render && !o.template && (o.template = n.innerHTML), n.nodeType === 1 && (n.textContent = "");
    const s = i(n, !1, Hg(n));
    return n instanceof Element && (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")), s;
  }, t;
});
function Hg(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Kg(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Gf(t) || Jf(t) || Yf(t),
    writable: !1
  });
}
function qg(e) {
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
function Wg(e) {
  if (we(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && Bt(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && Bt(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
function Gg() {
  mg();
}
process.env.NODE_ENV !== "production" && Gg();
var Jg = Object.create, Xu = Object.defineProperty, Yg = Object.getOwnPropertyDescriptor, Os = Object.getOwnPropertyNames, Xg = Object.getPrototypeOf, Qg = Object.prototype.hasOwnProperty, eh = (e, t) => function() {
  return e && (t = (0, e[Os(e)[0]])(e = 0)), t;
}, th = (e, t) => function() {
  return t || (0, e[Os(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, ih = (e, t, i, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of Os(t))
      !Qg.call(e, n) && n !== i && Xu(e, n, { get: () => t[n], enumerable: !(a = Yg(t, n)) || a.enumerable });
  return e;
}, ah = (e, t, i) => (i = e != null ? Jg(Xg(e)) : {}, ih(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  Xu(i, "default", { value: e, enumerable: !0 }),
  e
)), Ma = eh({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), nh = th({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    Ma(), t.exports = a;
    function i(o) {
      return o instanceof Buffer ? Buffer.from(o) : new o.constructor(o.buffer.slice(), o.byteOffset, o.length);
    }
    function a(o) {
      if (o = o || {}, o.circles) return n(o);
      const s = /* @__PURE__ */ new Map();
      if (s.set(Date, (l) => new Date(l)), s.set(Map, (l, p) => new Map(c(Array.from(l), p))), s.set(Set, (l, p) => new Set(c(Array.from(l), p))), o.constructorHandlers)
        for (const l of o.constructorHandlers)
          s.set(l[0], l[1]);
      let r = null;
      return o.proto ? u : d;
      function c(l, p) {
        const m = Object.keys(l), h = new Array(m.length);
        for (let w = 0; w < m.length; w++) {
          const I = m[w], x = l[I];
          typeof x != "object" || x === null ? h[I] = x : x.constructor !== Object && (r = s.get(x.constructor)) ? h[I] = r(x, p) : ArrayBuffer.isView(x) ? h[I] = i(x) : h[I] = p(x);
        }
        return h;
      }
      function d(l) {
        if (typeof l != "object" || l === null) return l;
        if (Array.isArray(l)) return c(l, d);
        if (l.constructor !== Object && (r = s.get(l.constructor)))
          return r(l, d);
        const p = {};
        for (const m in l) {
          if (Object.hasOwnProperty.call(l, m) === !1) continue;
          const h = l[m];
          typeof h != "object" || h === null ? p[m] = h : h.constructor !== Object && (r = s.get(h.constructor)) ? p[m] = r(h, d) : ArrayBuffer.isView(h) ? p[m] = i(h) : p[m] = d(h);
        }
        return p;
      }
      function u(l) {
        if (typeof l != "object" || l === null) return l;
        if (Array.isArray(l)) return c(l, u);
        if (l.constructor !== Object && (r = s.get(l.constructor)))
          return r(l, u);
        const p = {};
        for (const m in l) {
          const h = l[m];
          typeof h != "object" || h === null ? p[m] = h : h.constructor !== Object && (r = s.get(h.constructor)) ? p[m] = r(h, u) : ArrayBuffer.isView(h) ? p[m] = i(h) : p[m] = u(h);
        }
        return p;
      }
    }
    function n(o) {
      const s = [], r = [], c = /* @__PURE__ */ new Map();
      if (c.set(Date, (m) => new Date(m)), c.set(Map, (m, h) => new Map(u(Array.from(m), h))), c.set(Set, (m, h) => new Set(u(Array.from(m), h))), o.constructorHandlers)
        for (const m of o.constructorHandlers)
          c.set(m[0], m[1]);
      let d = null;
      return o.proto ? p : l;
      function u(m, h) {
        const w = Object.keys(m), I = new Array(w.length);
        for (let x = 0; x < w.length; x++) {
          const L = w[x], R = m[L];
          if (typeof R != "object" || R === null)
            I[L] = R;
          else if (R.constructor !== Object && (d = c.get(R.constructor)))
            I[L] = d(R, h);
          else if (ArrayBuffer.isView(R))
            I[L] = i(R);
          else {
            const H = s.indexOf(R);
            H !== -1 ? I[L] = r[H] : I[L] = h(R);
          }
        }
        return I;
      }
      function l(m) {
        if (typeof m != "object" || m === null) return m;
        if (Array.isArray(m)) return u(m, l);
        if (m.constructor !== Object && (d = c.get(m.constructor)))
          return d(m, l);
        const h = {};
        s.push(m), r.push(h);
        for (const w in m) {
          if (Object.hasOwnProperty.call(m, w) === !1) continue;
          const I = m[w];
          if (typeof I != "object" || I === null)
            h[w] = I;
          else if (I.constructor !== Object && (d = c.get(I.constructor)))
            h[w] = d(I, l);
          else if (ArrayBuffer.isView(I))
            h[w] = i(I);
          else {
            const x = s.indexOf(I);
            x !== -1 ? h[w] = r[x] : h[w] = l(I);
          }
        }
        return s.pop(), r.pop(), h;
      }
      function p(m) {
        if (typeof m != "object" || m === null) return m;
        if (Array.isArray(m)) return u(m, p);
        if (m.constructor !== Object && (d = c.get(m.constructor)))
          return d(m, p);
        const h = {};
        s.push(m), r.push(h);
        for (const w in m) {
          const I = m[w];
          if (typeof I != "object" || I === null)
            h[w] = I;
          else if (I.constructor !== Object && (d = c.get(I.constructor)))
            h[w] = d(I, p);
          else if (ArrayBuffer.isView(I))
            h[w] = i(I);
          else {
            const x = s.indexOf(I);
            x !== -1 ? h[w] = r[x] : h[w] = p(I);
          }
        }
        return s.pop(), r.pop(), h;
      }
    }
  }
});
Ma();
Ma();
Ma();
var Qu = typeof navigator < "u", M = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof M.chrome < "u" && M.chrome.devtools;
Qu && (M.self, M.top);
var Kr;
typeof navigator < "u" && ((Kr = navigator.userAgent) == null || Kr.toLowerCase().includes("electron"));
Ma();
var oh = ah(nh()), sh = /(?:^|[-_/])(\w)/g;
function rh(e, t) {
  return t ? t.toUpperCase() : "";
}
function ch(e) {
  return e && `${e}`.replace(sh, rh);
}
function dh(e, t) {
  let i = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  i.endsWith(`index${t}`) && (i = i.replace(`/index${t}`, t));
  const a = i.lastIndexOf("/"), n = i.substring(a + 1);
  {
    const o = n.lastIndexOf(t);
    return n.substring(0, o);
  }
}
var qr = (0, oh.default)({ circles: !0 });
const uh = {
  trailing: !0
};
function qi(e, t = 25, i = {}) {
  if (i = { ...uh, ...i }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let a, n, o = [], s, r;
  const c = (d, u) => (s = lh(e, d, u), s.finally(() => {
    if (s = null, i.trailing && r && !n) {
      const l = c(d, r);
      return r = null, l;
    }
  }), s);
  return function(...d) {
    return s ? (i.trailing && (r = d), s) : new Promise((u) => {
      const l = !n && i.leading;
      clearTimeout(n), n = setTimeout(() => {
        n = null;
        const p = i.leading ? a : c(this, d);
        for (const m of o)
          m(p);
        o = [];
      }, t), l ? (a = c(this, d), u(a)) : o.push(u);
    });
  };
}
async function lh(e, t, i) {
  return await e.apply(t, i);
}
function Wo(e, t = {}, i) {
  for (const a in e) {
    const n = e[a], o = i ? `${i}:${a}` : a;
    typeof n == "object" && n !== null ? Wo(n, t, o) : typeof n == "function" && (t[o] = n);
  }
  return t;
}
const fh = { run: (e) => e() }, ph = () => fh, el = typeof console.createTask < "u" ? console.createTask : ph;
function mh(e, t) {
  const i = t.shift(), a = el(i);
  return e.reduce(
    (n, o) => n.then(() => a.run(() => o(...t))),
    Promise.resolve()
  );
}
function gh(e, t) {
  const i = t.shift(), a = el(i);
  return Promise.all(e.map((n) => a.run(() => n(...t))));
}
function Io(e, t) {
  for (const i of [...e])
    i(t);
}
class hh {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, i, a = {}) {
    if (!t || typeof i != "function")
      return () => {
      };
    const n = t;
    let o;
    for (; this._deprecatedHooks[t]; )
      o = this._deprecatedHooks[t], t = o.to;
    if (o && !a.allowDeprecated) {
      let s = o.message;
      s || (s = `${n} hook has been deprecated` + (o.to ? `, please use ${o.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(s) || (console.warn(s), this._deprecatedMessages.add(s));
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
    let a, n = (...o) => (typeof a == "function" && a(), a = void 0, n = void 0, i(...o));
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
    const i = Wo(t), a = Object.keys(i).map(
      (n) => this.hook(n, i[n])
    );
    return () => {
      for (const n of a.splice(0, a.length))
        n();
    };
  }
  removeHooks(t) {
    const i = Wo(t);
    for (const a in i)
      this.removeHook(a, i[a]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...i) {
    return i.unshift(t), this.callHookWith(mh, t, ...i);
  }
  callHookParallel(t, ...i) {
    return i.unshift(t), this.callHookWith(gh, t, ...i);
  }
  callHookWith(t, i, ...a) {
    const n = this._before || this._after ? { name: i, args: a, context: {} } : void 0;
    this._before && Io(this._before, n);
    const o = t(
      i in this._hooks ? [...this._hooks[i]] : [],
      a
    );
    return o instanceof Promise ? o.finally(() => {
      this._after && n && Io(this._after, n);
    }) : (this._after && n && Io(this._after, n), o);
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
  return new hh();
}
var bh = Object.create, il = Object.defineProperty, _h = Object.getOwnPropertyDescriptor, Cs = Object.getOwnPropertyNames, vh = Object.getPrototypeOf, yh = Object.prototype.hasOwnProperty, kh = (e, t) => function() {
  return e && (t = (0, e[Cs(e)[0]])(e = 0)), t;
}, al = (e, t) => function() {
  return t || (0, e[Cs(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, wh = (e, t, i, a) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of Cs(t))
      !yh.call(e, n) && n !== i && il(e, n, { get: () => t[n], enumerable: !(a = _h(t, n)) || a.enumerable });
  return e;
}, Ih = (e, t, i) => (i = e != null ? bh(vh(e)) : {}, wh(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  il(i, "default", { value: e, enumerable: !0 }),
  e
)), P = kh({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), Eh = al({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    P(), (function(i) {
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
      ], o = {
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
      }, c = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), d = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), u = [".", "!", "~", "*", "'", "(", ")"].join(""), l = function(I, x) {
        var L = "-", R = "", H = "", V = !0, te = {}, B, me, W, F, U, Q, ce, Ve, Fe, be, $, J, ie, Be, Le = "";
        if (typeof I != "string")
          return "";
        if (typeof x == "string" && (L = x), ce = r.en, Ve = s.en, typeof x == "object") {
          B = x.maintainCase || !1, te = x.custom && typeof x.custom == "object" ? x.custom : te, W = +x.truncate > 1 && x.truncate || !1, F = x.uric || !1, U = x.uricNoSlash || !1, Q = x.mark || !1, V = !(x.symbols === !1 || x.lang === !1), L = x.separator || L, F && (Le += c), U && (Le += d), Q && (Le += u), ce = x.lang && r[x.lang] && V ? r[x.lang] : V ? r.en : {}, Ve = x.lang && s[x.lang] ? s[x.lang] : x.lang === !1 || x.lang === !0 ? {} : s.en, x.titleCase && typeof x.titleCase.length == "number" && Array.prototype.toString.call(x.titleCase) ? (x.titleCase.forEach(function(Oe) {
            te[Oe + ""] = Oe + "";
          }), me = !0) : me = !!x.titleCase, x.custom && typeof x.custom.length == "number" && Array.prototype.toString.call(x.custom) && x.custom.forEach(function(Oe) {
            te[Oe + ""] = Oe + "";
          }), Object.keys(te).forEach(function(Oe) {
            var Ze;
            Oe.length > 1 ? Ze = new RegExp("\\b" + m(Oe) + "\\b", "gi") : Ze = new RegExp(m(Oe), "gi"), I = I.replace(Ze, te[Oe]);
          });
          for ($ in te)
            Le += $;
        }
        for (Le += L, Le = m(Le), I = I.replace(/(^\s+|\s+$)/g, ""), ie = !1, Be = !1, be = 0, J = I.length; be < J; be++)
          $ = I[be], h($, te) ? ie = !1 : Ve[$] ? ($ = ie && Ve[$].match(/[A-Za-z0-9]/) ? " " + Ve[$] : Ve[$], ie = !1) : $ in a ? (be + 1 < J && n.indexOf(I[be + 1]) >= 0 ? (H += $, $ = "") : Be === !0 ? ($ = o[H] + a[$], H = "") : $ = ie && a[$].match(/[A-Za-z0-9]/) ? " " + a[$] : a[$], ie = !1, Be = !1) : $ in o ? (H += $, $ = "", be === J - 1 && ($ = o[H]), Be = !0) : /* process symbol chars */ ce[$] && !(F && c.indexOf($) !== -1) && !(U && d.indexOf($) !== -1) ? ($ = ie || R.substr(-1).match(/[A-Za-z0-9]/) ? L + ce[$] : ce[$], $ += I[be + 1] !== void 0 && I[be + 1].match(/[A-Za-z0-9]/) ? L : "", ie = !0) : (Be === !0 ? ($ = o[H] + $, H = "", Be = !1) : ie && (/[A-Za-z0-9]/.test($) || R.substr(-1).match(/A-Za-z0-9]/)) && ($ = " " + $), ie = !1), R += $.replace(new RegExp("[^\\w\\s" + Le + "_-]", "g"), L);
        return me && (R = R.replace(/(\w)(\S*)/g, function(Oe, Ze, Wt) {
          var Gt = Ze.toUpperCase() + (Wt !== null ? Wt : "");
          return Object.keys(te).indexOf(Gt.toLowerCase()) < 0 ? Gt : Gt.toLowerCase();
        })), R = R.replace(/\s+/g, L).replace(new RegExp("\\" + L + "+", "g"), L).replace(new RegExp("(^\\" + L + "+|\\" + L + "+$)", "g"), ""), W && R.length > W && (Fe = R.charAt(W) === L, R = R.slice(0, W), Fe || (R = R.slice(0, R.lastIndexOf(L)))), !B && !me && (R = R.toLowerCase()), R;
      }, p = function(I) {
        return function(L) {
          return l(L, I);
        };
      }, m = function(I) {
        return I.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, h = function(w, I) {
        for (var x in I)
          if (I[x] === w)
            return !0;
      };
      if (typeof t < "u" && t.exports)
        t.exports = l, t.exports.createSlug = p;
      else if (typeof define < "u" && define.amd)
        define([], function() {
          return l;
        });
      else
        try {
          if (i.getSlug || i.createSlug)
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          i.getSlug = l, i.createSlug = p;
        } catch {
        }
    })(e);
  }
}), Ah = al({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    P(), t.exports = Eh();
  }
});
P();
P();
P();
P();
P();
P();
P();
P();
function Th(e) {
  var t;
  const i = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return i === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : i;
}
function xh(e) {
  const t = e.__file;
  if (t)
    return ch(dh(t, ".vue"));
}
function Wr(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function Ns(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function nl(e) {
  var t, i;
  const a = (t = e.subTree) == null ? void 0 : t.type, n = Ns(e);
  return n ? ((i = n?.types) == null ? void 0 : i.Fragment) === a : !1;
}
function to(e) {
  var t, i, a;
  const n = Th(e?.type || {});
  if (n)
    return n;
  if (e?.root === e)
    return "Root";
  for (const s in (i = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : i.components)
    if (e.parent.type.components[s] === e?.type)
      return Wr(e, s);
  for (const s in (a = e.appContext) == null ? void 0 : a.components)
    if (e.appContext.components[s] === e?.type)
      return Wr(e, s);
  const o = xh(e?.type || {});
  return o || "Anonymous Component";
}
function Sh(e) {
  var t, i, a;
  const n = (a = (i = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : i.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? a : 0, o = e === e?.root ? "root" : e.uid;
  return `${n}:${o}`;
}
function Go(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function Oh() {
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
var Ya;
function Ch(e) {
  return Ya || (Ya = document.createRange()), Ya.selectNode(e), Ya.getBoundingClientRect();
}
function Nh(e) {
  const t = Oh();
  if (!e.children)
    return t;
  for (let i = 0, a = e.children.length; i < a; i++) {
    const n = e.children[i];
    let o;
    if (n.component)
      o = Ii(n.component);
    else if (n.el) {
      const s = n.el;
      s.nodeType === 1 || s.getBoundingClientRect ? o = s.getBoundingClientRect() : s.nodeType === 3 && s.data.trim() && (o = Ch(s));
    }
    o && Dh(t, o);
  }
  return t;
}
function Dh(e, t) {
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
function Ii(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? Gr : nl(e) ? Nh(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? Ii(e.subTree.component) : Gr;
}
P();
function Ds(e) {
  return nl(e) ? Vh(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function Vh(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((i) => {
    i.component ? t.push(...Ds(i.component)) : i?.el && t.push(i.el);
  }), t;
}
var ol = "__vue-devtools-component-inspector__", sl = "__vue-devtools-component-inspector__card__", rl = "__vue-devtools-component-inspector__name__", cl = "__vue-devtools-component-inspector__indicator__", dl = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, jh = {
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
}, Ph = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function Qi() {
  return document.getElementById(ol);
}
function Rh() {
  return document.getElementById(sl);
}
function $h() {
  return document.getElementById(cl);
}
function Uh() {
  return document.getElementById(rl);
}
function Vs(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function js(e) {
  var t;
  const i = document.createElement("div");
  i.id = (t = e.elementId) != null ? t : ol, Object.assign(i.style, {
    ...dl,
    ...Vs(e.bounds),
    ...e.style
  });
  const a = document.createElement("span");
  a.id = sl, Object.assign(a.style, {
    ...jh,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const n = document.createElement("span");
  n.id = rl, n.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const o = document.createElement("i");
  return o.id = cl, o.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(o.style, Ph), a.appendChild(n), a.appendChild(o), i.appendChild(a), document.body.appendChild(i), i;
}
function Ps(e) {
  const t = Qi(), i = Rh(), a = Uh(), n = $h();
  t && (Object.assign(t.style, {
    ...dl,
    ...Vs(e.bounds)
  }), Object.assign(i.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), a.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, n.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function Fh(e) {
  const t = Ii(e);
  if (!t.width && !t.height)
    return;
  const i = to(e);
  Qi() ? Ps({ bounds: t, name: i }) : js({ bounds: t, name: i });
}
function ul() {
  const e = Qi();
  e && (e.style.display = "none");
}
var Jo = null;
function Yo(e) {
  const t = e.target;
  if (t) {
    const i = t.__vueParentComponent;
    if (i && (Jo = i, i.vnode.el)) {
      const n = Ii(i), o = to(i);
      Qi() ? Ps({ bounds: n, name: o }) : js({ bounds: n, name: o });
    }
  }
}
function zh(e, t) {
  if (e.preventDefault(), e.stopPropagation(), Jo) {
    const i = Sh(Jo);
    t(i);
  }
}
var Dn = null;
function Lh() {
  ul(), window.removeEventListener("mouseover", Yo), window.removeEventListener("click", Dn, !0), Dn = null;
}
function Mh() {
  return window.addEventListener("mouseover", Yo), new Promise((e) => {
    function t(i) {
      i.preventDefault(), i.stopPropagation(), zh(i, (a) => {
        window.removeEventListener("click", t, !0), Dn = null, window.removeEventListener("mouseover", Yo);
        const n = Qi();
        n && (n.style.display = "none"), e(JSON.stringify({ id: a }));
      });
    }
    Dn = t, window.addEventListener("click", t, !0);
  });
}
function Bh(e) {
  const t = Go(Xe.value, e.id);
  if (t) {
    const [i] = Ds(t);
    if (typeof i.scrollIntoView == "function")
      i.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const a = Ii(t), n = document.createElement("div"), o = {
        ...Vs(a),
        position: "absolute"
      };
      Object.assign(n.style, o), document.body.appendChild(n), n.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(n);
      }, 2e3);
    }
    setTimeout(() => {
      const a = Ii(t);
      if (a.width || a.height) {
        const n = to(t), o = Qi();
        o ? Ps({ ...e, name: n, bounds: a }) : js({ ...e, name: n, bounds: a }), setTimeout(() => {
          o && (o.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
P();
var Jr, Yr;
(Yr = (Jr = M).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (Jr.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function Zh(e) {
  let t = 0;
  const i = setInterval(() => {
    M.__VUE_INSPECTOR__ && (clearInterval(i), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(i);
  }, 30);
}
function Hh() {
  const e = M.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...i) => {
    e.disable(), t(...i);
  };
}
function Kh() {
  return new Promise((e) => {
    function t() {
      Hh(), e(M.__VUE_INSPECTOR__);
    }
    M.__VUE_INSPECTOR__ ? t() : Zh(() => {
      t();
    });
  });
}
P();
P();
function qh(e) {
  return !!(e && e.__v_isReadonly);
}
function ll(e) {
  return qh(e) ? ll(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Eo(e) {
  return !!(e && e.__v_isRef === !0);
}
function ua(e) {
  const t = e && e.__v_raw;
  return t ? ua(t) : e;
}
var Wh = class {
  constructor() {
    this.refEditor = new Gh();
  }
  set(e, t, i, a) {
    const n = Array.isArray(t) ? t : t.split(".");
    for (; n.length > 1; ) {
      const r = n.shift();
      e instanceof Map ? e = e.get(r) : e instanceof Set ? e = Array.from(e.values())[r] : e = e[r], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const o = n[0], s = this.refEditor.get(e)[o];
    a ? a(e, o, i) : this.refEditor.isRef(s) ? this.refEditor.set(s, i) : e[o] = i;
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
      const o = a.shift();
      e = e[o], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, a[0]);
  }
  createDefaultSetCallback(e) {
    return (t, i, a) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(i, 1) : ua(t) instanceof Map ? t.delete(i) : ua(t) instanceof Set ? t.delete(Array.from(t.values())[i]) : Reflect.deleteProperty(t, i)), !e.remove) {
        const n = t[e.newKey || i];
        this.refEditor.isRef(n) ? this.refEditor.set(n, a) : ua(t) instanceof Map ? t.set(e.newKey || i, a) : ua(t) instanceof Set ? t.add(a) : t[e.newKey || i] = a;
      }
    };
  }
}, Gh = class {
  set(e, t) {
    if (Eo(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((n) => e.add(n));
        return;
      }
      const i = Object.keys(t);
      if (e instanceof Map) {
        const n = new Set(e.keys());
        i.forEach((o) => {
          e.set(o, Reflect.get(t, o)), n.delete(o);
        }), n.forEach((o) => e.delete(o));
        return;
      }
      const a = new Set(Object.keys(e));
      i.forEach((n) => {
        Reflect.set(e, n, Reflect.get(t, n)), a.delete(n);
      }), a.forEach((n) => Reflect.deleteProperty(e, n));
    }
  }
  get(e) {
    return Eo(e) ? e.value : e;
  }
  isRef(e) {
    return Eo(e) || ll(e);
  }
};
P();
P();
P();
var Jh = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function Yh() {
  if (typeof window > "u" || !Qu || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = typeof localStorage.getItem < "u" ? localStorage.getItem(Jh) : null;
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
P();
P();
P();
var Xr, Qr;
(Qr = (Xr = M).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (Xr.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Xh = new Proxy(M.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
});
function Qh(e, t) {
  Ue.timelineLayersState[t.id] = !1, Xh.push({
    ...e,
    descriptorId: t.id,
    appRecord: Ns(t.app)
  });
}
var ec, tc;
(tc = (ec = M).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (ec.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var Rs = new Proxy(M.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
}), fl = qi(() => {
  ea.hooks.callHook("sendInspectorToClient", pl());
});
function eb(e, t) {
  var i, a;
  Rs.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (i = e.treeFilterPlaceholder) != null ? i : "Search tree...",
    stateFilterPlaceholder: (a = e.stateFilterPlaceholder) != null ? a : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: Ns(t.app)
  }), fl();
}
function pl() {
  return Rs.filter((e) => e.descriptor.app === Xe.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
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
function fn(e, t) {
  return Rs.find((i) => i.options.id === e && (t ? i.descriptor.app === t : !0));
}
function tb() {
  const e = tl();
  e.hook("addInspector", ({ inspector: a, plugin: n }) => {
    eb(a, n.descriptor);
  });
  const t = qi(async ({ inspectorId: a, plugin: n }) => {
    var o;
    if (!a || !((o = n?.descriptor) != null && o.app) || Ue.highPerfModeEnabled)
      return;
    const s = fn(a, n.descriptor.app), r = {
      app: n.descriptor.app,
      inspectorId: a,
      filter: s?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((c) => {
      e.callHookWith(
        async (d) => {
          await Promise.all(d.map((u) => u(r))), c();
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
  const i = qi(async ({ inspectorId: a, plugin: n }) => {
    var o;
    if (!a || !((o = n?.descriptor) != null && o.app) || Ue.highPerfModeEnabled)
      return;
    const s = fn(a, n.descriptor.app), r = {
      app: n.descriptor.app,
      inspectorId: a,
      nodeId: s?.selectedNodeId || "",
      state: null
    }, c = {
      currentTab: `custom-inspector:${a}`
    };
    r.nodeId && await new Promise((d) => {
      e.callHookWith(
        async (u) => {
          await Promise.all(u.map((l) => l(r, c))), d();
        },
        "getInspectorState"
        /* GET_INSPECTOR_STATE */
      );
    }), e.callHookWith(
      async (d) => {
        await Promise.all(d.map((u) => u({
          inspectorId: a,
          nodeId: r.nodeId,
          state: r.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  return e.hook("sendInspectorState", i), e.hook("customInspectorSelectNode", ({ inspectorId: a, nodeId: n, plugin: o }) => {
    const s = fn(a, o.descriptor.app);
    s && (s.selectedNodeId = n);
  }), e.hook("timelineLayerAdded", ({ options: a, plugin: n }) => {
    Qh(a, n.descriptor);
  }), e.hook("timelineEventAdded", ({ options: a, plugin: n }) => {
    var o;
    const s = ["performance", "component-event", "keyboard", "mouse"];
    Ue.highPerfModeEnabled || !((o = Ue.timelineLayersState) != null && o[n.descriptor.id]) && !s.includes(a.layerId) || e.callHookWith(
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
    const o = n.id.toString();
    return [...n.instanceMap].filter(([r]) => r.split(":")[0] === o).map(([, r]) => r);
  }), e.hook("getComponentBounds", async ({ instance: a }) => Ii(a)), e.hook("getComponentName", ({ instance: a }) => to(a)), e.hook("componentHighlight", ({ uid: a }) => {
    const n = Xe.value.instanceMap.get(a);
    n && Fh(n);
  }), e.hook("componentUnhighlight", () => {
    ul();
  }), e;
}
var ic, ac;
(ac = (ic = M).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (ic.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var nc, oc;
(oc = (nc = M).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (nc.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var sc, rc;
(rc = (sc = M).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (sc.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var cc, dc;
(dc = (cc = M).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (cc.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var uc, lc;
(lc = (uc = M).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (uc.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var mi = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function ib() {
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
    timelineLayersState: Yh()
  };
}
var fc, pc;
(pc = (fc = M)[mi]) != null || (fc[mi] = ib());
var ab = qi((e) => {
  ea.hooks.callHook("devtoolsStateUpdated", { state: e });
});
qi((e, t) => {
  ea.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var io = new Proxy(M.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, i) {
    return t === "value" ? M.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : M.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), Xe = new Proxy(M.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, i) {
    return t === "value" ? M.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? M.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : M.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function ml() {
  ab({
    ...M[mi],
    appRecords: io.value,
    activeAppRecordId: Xe.id,
    tabs: M.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: M.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function nb(e) {
  M.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, ml();
}
function ob(e) {
  M.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, ml();
}
var Ue = new Proxy(M[mi], {
  get(e, t) {
    return t === "appRecords" ? io : t === "activeAppRecordId" ? Xe.id : t === "tabs" ? M.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? M.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : M[mi][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, i) {
    return { ...M[mi] }, e[t] = i, M[mi][t] = i, !0;
  }
});
function sb(e = {}) {
  var t, i, a;
  const { file: n, host: o, baseUrl: s = window.location.origin, line: r = 0, column: c = 0 } = e;
  if (n) {
    if (o === "chrome-extension") {
      const d = n.replace(/\\/g, "\\\\"), u = (i = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? i : "/";
      fetch(`${u}__open-in-editor?file=${encodeURI(n)}`).then((l) => {
        if (!l.ok) {
          const p = `Opening component ${d} failed`;
          console.log(`%c${p}`, "color:red");
        }
      });
    } else if (Ue.vitePluginDetected) {
      const d = (a = M.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? a : s;
      M.__VUE_INSPECTOR__.openInEditor(d, n, r, c);
    }
  }
}
P();
P();
P();
P();
P();
var mc, gc;
(gc = (mc = M).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (mc.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var $s = new Proxy(M.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, i) {
    return Reflect.get(e, t, i);
  }
});
function Xo(e) {
  const t = {};
  return Object.keys(e).forEach((i) => {
    t[i] = e[i].defaultValue;
  }), t;
}
function Us(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function rb(e) {
  var t, i, a;
  const n = (i = (t = $s.find((o) => {
    var s;
    return o[0].id === e && !!((s = o[0]) != null && s.settings);
  })) == null ? void 0 : t[0]) != null ? i : null;
  return (a = n?.settings) != null ? a : null;
}
function gl(e, t) {
  var i, a, n;
  const o = Us(e);
  if (o) {
    const s = localStorage.getItem(o);
    if (s)
      return JSON.parse(s);
  }
  if (e) {
    const s = (a = (i = $s.find((r) => r[0].id === e)) == null ? void 0 : i[0]) != null ? a : null;
    return Xo((n = s?.settings) != null ? n : {});
  }
  return Xo(t);
}
function cb(e, t) {
  const i = Us(e);
  localStorage.getItem(i) || localStorage.setItem(i, JSON.stringify(Xo(t)));
}
function db(e, t, i) {
  const a = Us(e), n = localStorage.getItem(a), o = JSON.parse(n || "{}"), s = {
    ...o,
    [t]: i
  };
  localStorage.setItem(a, JSON.stringify(s)), ea.hooks.callHookWith(
    (r) => {
      r.forEach((c) => c({
        pluginId: e,
        key: t,
        oldValue: o[t],
        newValue: i,
        settings: s
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
P();
var hc, bc, nt = (bc = (hc = M).__VUE_DEVTOOLS_HOOK) != null ? bc : hc.__VUE_DEVTOOLS_HOOK = tl(), ub = {
  vueAppInit(e) {
    nt.hook("app:init", e);
  },
  vueAppUnmount(e) {
    nt.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    nt.hook("app:connected", e);
  },
  componentAdded(e) {
    return nt.hook("component:added", e);
  },
  componentEmit(e) {
    return nt.hook("component:emit", e);
  },
  componentUpdated(e) {
    return nt.hook("component:updated", e);
  },
  componentRemoved(e) {
    return nt.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    nt.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return nt.hook("perf:start", e);
  },
  perfEnd(e) {
    return nt.hook("perf:end", e);
  }
}, hl = {
  on: ub,
  setupDevToolsPlugin(e, t) {
    return nt.callHook("devtools-plugin:setup", e, t);
  }
}, lb = class {
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
    if (Ue.highPerfModeEnabled)
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
        nt.callHook("component:updated", ...a);
      } else
        nt.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: i.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && cb(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    Ue.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    Ue.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return Ue.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    Ue.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return gl(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
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
}, fb = lb;
P();
P();
P();
P();
var pb = "__vue_devtool_undefined__", mb = "__vue_devtool_infinity__", gb = "__vue_devtool_negative_infinity__", hb = "__vue_devtool_nan__";
P();
P();
var bb = {
  [pb]: "undefined",
  [hb]: "NaN",
  [mb]: "Infinity",
  [gb]: "-Infinity"
};
Object.entries(bb).reduce((e, [t, i]) => (e[i] = t, e), {});
P();
P();
P();
P();
P();
var _c, vc;
(vc = (_c = M).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (_c.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function bl(e, t) {
  return hl.setupDevToolsPlugin(e, t);
}
function _b(e, t) {
  const [i, a] = e;
  if (i.app !== t)
    return;
  const n = new fb({
    plugin: {
      setupFn: a,
      descriptor: i
    },
    ctx: ea
  });
  i.packageName === "vuex" && n.on.editInspectorState((o) => {
    n.sendInspectorState(o.inspectorId);
  }), a(n);
}
function _l(e, t) {
  M.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || Ue.highPerfModeEnabled && !t?.inspectingComponent || (M.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), $s.forEach((i) => {
    _b(i, e);
  }));
}
P();
P();
var Ta = "__VUE_DEVTOOLS_ROUTER__", Wi = "__VUE_DEVTOOLS_ROUTER_INFO__", yc, kc;
(kc = (yc = M)[Wi]) != null || (yc[Wi] = {
  currentRoute: null,
  routes: []
});
var wc, Ic;
(Ic = (wc = M)[Ta]) != null || (wc[Ta] = {});
new Proxy(M[Wi], {
  get(e, t) {
    return M[Wi][t];
  }
});
new Proxy(M[Ta], {
  get(e, t) {
    if (t === "value")
      return M[Ta];
  }
});
function vb(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((i) => !t.has(i.path) && t.set(i.path, 1));
}
function Fs(e) {
  return e.map((t) => {
    let { path: i, name: a, children: n, meta: o } = t;
    return n?.length && (n = Fs(n)), {
      path: i,
      name: a,
      children: n,
      meta: o
    };
  });
}
function yb(e) {
  if (e) {
    const { fullPath: t, hash: i, href: a, path: n, name: o, matched: s, params: r, query: c } = e;
    return {
      fullPath: t,
      hash: i,
      href: a,
      path: n,
      name: o,
      params: r,
      query: c,
      matched: Fs(s)
    };
  }
  return e;
}
function kb(e, t) {
  function i() {
    var a;
    const n = (a = e.app) == null ? void 0 : a.config.globalProperties.$router, o = yb(n?.currentRoute.value), s = Fs(vb(n)), r = console.warn;
    console.warn = () => {
    }, M[Wi] = {
      currentRoute: o ? qr(o) : {},
      routes: qr(s)
    }, M[Ta] = n, console.warn = r;
  }
  i(), hl.on.componentUpdated(qi(() => {
    var a;
    ((a = t.value) == null ? void 0 : a.app) === e.app && (i(), !Ue.highPerfModeEnabled && ea.hooks.callHook("routerInfoUpdated", { state: M[Wi] }));
  }, 200));
}
function wb(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const i = {
        ...t,
        app: Xe.value.app,
        rootNodes: []
      };
      return await new Promise((a) => {
        e.callHookWith(
          async (n) => {
            await Promise.all(n.map((o) => o(i))), a();
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
        app: Xe.value.app,
        state: null
      }, a = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((n) => {
        e.callHookWith(
          async (o) => {
            await Promise.all(o.map((s) => s(i, a))), n();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), i.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const i = new Wh(), a = {
        ...t,
        app: Xe.value.app,
        set: (n, o = t.path, s = t.state.value, r) => {
          i.set(n, o, s, r || i.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (n) => {
          n.forEach((o) => o(a));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const i = fn(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: i.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return Mh();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return Lh();
    },
    // get component render code
    getComponentRenderCode(t) {
      const i = Go(Xe.value, t);
      if (i)
        return typeof i?.type != "function" ? i.render.toString() : i.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return Bh({ id: t });
    },
    // open in editor
    openInEditor: sb,
    // get vue inspector
    getVueInspector: Kh,
    // toggle app
    toggleApp(t, i) {
      const a = io.value.find((n) => n.id === t);
      a && (ob(t), nb(a), kb(a, Xe), fl(), _l(a.app, i));
    },
    // inspect dom
    inspectDOM(t) {
      const i = Go(Xe.value, t);
      if (i) {
        const [a] = Ds(i);
        a && (M.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = a);
      }
    },
    updatePluginSettings(t, i, a) {
      db(t, i, a);
    },
    getPluginSettings(t) {
      return {
        options: rb(t),
        values: gl(t)
      };
    }
  };
}
P();
var Ec, Ac;
(Ac = (Ec = M).__VUE_DEVTOOLS_ENV__) != null || (Ec.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var Tc = tb(), xc, Sc;
(Sc = (xc = M).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (xc.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: Tc,
  get state() {
    return {
      ...Ue,
      activeAppRecordId: Xe.id,
      activeAppRecord: Xe.value,
      appRecords: io.value
    };
  },
  api: wb(Tc)
});
var ea = M.__VUE_DEVTOOLS_KIT_CONTEXT__;
P();
Ih(Ah());
var Oc, Cc;
(Cc = (Oc = M).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (Oc.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
P();
P();
function Ib(e) {
  Ue.highPerfModeEnabled = e ?? !Ue.highPerfModeEnabled, !e && Xe.value && _l(Xe.value.app);
}
P();
P();
P();
function Eb(e) {
  Ue.devtoolsClientDetected = {
    ...Ue.devtoolsClientDetected,
    ...e
  };
  const t = Object.values(Ue.devtoolsClientDetected).some(Boolean);
  Ib(!t);
}
var Nc, Dc;
(Dc = (Nc = M).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (Nc.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = Eb);
P();
P();
P();
P();
P();
P();
var Ab = class {
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
    this.generateIdentifier = e, this.kv = new Ab();
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
}, Tb = class extends vl {
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
P();
P();
function xb(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const i in e)
    e.hasOwnProperty(i) && t.push(e[i]);
  return t;
}
function Sb(e, t) {
  const i = xb(e);
  if ("find" in i)
    return i.find(t);
  const a = i;
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (t(o))
      return o;
  }
}
function Gi(e, t) {
  Object.entries(e).forEach(([i, a]) => t(a, i));
}
function pn(e, t) {
  return e.indexOf(t) !== -1;
}
function Vc(e, t) {
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    if (t(a))
      return a;
  }
}
var Ob = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return Sb(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
P();
P();
var Cb = (e) => Object.prototype.toString.call(e).slice(8, -1), yl = (e) => typeof e > "u", Nb = (e) => e === null, xa = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, Qo = (e) => xa(e) && Object.keys(e).length === 0, ii = (e) => Array.isArray(e), Db = (e) => typeof e == "string", Vb = (e) => typeof e == "number" && !isNaN(e), jb = (e) => typeof e == "boolean", Pb = (e) => e instanceof RegExp, Sa = (e) => e instanceof Map, Oa = (e) => e instanceof Set, kl = (e) => Cb(e) === "Symbol", Rb = (e) => e instanceof Date && !isNaN(e.valueOf()), $b = (e) => e instanceof Error, jc = (e) => typeof e == "number" && isNaN(e), Ub = (e) => jb(e) || Nb(e) || yl(e) || Vb(e) || Db(e) || kl(e), Fb = (e) => typeof e == "bigint", zb = (e) => e === 1 / 0 || e === -1 / 0, Lb = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), Mb = (e) => e instanceof URL;
P();
var wl = (e) => e.replace(/\./g, "\\."), Ao = (e) => e.map(String).map(wl).join("."), va = (e) => {
  const t = [];
  let i = "";
  for (let n = 0; n < e.length; n++) {
    let o = e.charAt(n);
    if (o === "\\" && e.charAt(n + 1) === ".") {
      i += ".", n++;
      continue;
    }
    if (o === ".") {
      t.push(i), i = "";
      continue;
    }
    i += o;
  }
  const a = i;
  return t.push(a), t;
};
P();
function Tt(e, t, i, a) {
  return {
    isApplicable: e,
    annotation: t,
    transform: i,
    untransform: a
  };
}
var Il = [
  Tt(yl, "undefined", () => null, () => {
  }),
  Tt(Fb, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Tt(Rb, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Tt($b, "Error", (e, t) => {
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
  Tt(Pb, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), i = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, i);
  }),
  Tt(
    Oa,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Tt(Sa, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Tt((e) => jc(e) || zb(e), "number", (e) => jc(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Tt((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Tt(Mb, "URL", (e) => e.toString(), (e) => new URL(e))
];
function ao(e, t, i, a) {
  return {
    isApplicable: e,
    annotation: t,
    transform: i,
    untransform: a
  };
}
var El = ao((e, t) => kl(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, i) => {
  const a = i.symbolRegistry.getValue(t[1]);
  if (!a)
    throw new Error("Trying to deserialize unknown symbol");
  return a;
}), Bb = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), Al = ao(Lb, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const i = Bb[t[1]];
  if (!i)
    throw new Error("Trying to deserialize unknown typed array");
  return new i(e);
});
function Tl(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var xl = ao(Tl, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
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
}), Sl = ao((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, i) => {
  const a = i.customTransformerRegistry.findByName(t[1]);
  if (!a)
    throw new Error("Trying to deserialize unknown custom value");
  return a.deserialize(e);
}), Zb = [xl, El, Sl, Al], Pc = (e, t) => {
  const i = Vc(Zb, (n) => n.isApplicable(e, t));
  if (i)
    return {
      value: i.transform(e, t),
      type: i.annotation(e, t)
    };
  const a = Vc(Il, (n) => n.isApplicable(e, t));
  if (a)
    return {
      value: a.transform(e, t),
      type: a.annotation
    };
}, Ol = {};
Il.forEach((e) => {
  Ol[e.annotation] = e;
});
var Hb = (e, t, i) => {
  if (ii(t))
    switch (t[0]) {
      case "symbol":
        return El.untransform(e, t, i);
      case "class":
        return xl.untransform(e, t, i);
      case "custom":
        return Sl.untransform(e, t, i);
      case "typed-array":
        return Al.untransform(e, t, i);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const a = Ol[t];
    if (!a)
      throw new Error("Unknown transformation: " + t);
    return a.untransform(e, i);
  }
};
P();
var Ri = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const i = e.keys();
  for (; t > 0; )
    i.next(), t--;
  return i.next().value;
};
function Cl(e) {
  if (pn(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (pn(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (pn(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var Kb = (e, t) => {
  Cl(t);
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    if (Oa(e))
      e = Ri(e, +a);
    else if (Sa(e)) {
      const n = +a, o = +t[++i] == 0 ? "key" : "value", s = Ri(e, n);
      switch (o) {
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
}, es = (e, t, i) => {
  if (Cl(t), t.length === 0)
    return i(e);
  let a = e;
  for (let o = 0; o < t.length - 1; o++) {
    const s = t[o];
    if (ii(a)) {
      const r = +s;
      a = a[r];
    } else if (xa(a))
      a = a[s];
    else if (Oa(a)) {
      const r = +s;
      a = Ri(a, r);
    } else if (Sa(a)) {
      if (o === t.length - 2)
        break;
      const c = +s, d = +t[++o] == 0 ? "key" : "value", u = Ri(a, c);
      switch (d) {
        case "key":
          a = u;
          break;
        case "value":
          a = a.get(u);
          break;
      }
    }
  }
  const n = t[t.length - 1];
  if (ii(a) ? a[+n] = i(a[+n]) : xa(a) && (a[n] = i(a[n])), Oa(a)) {
    const o = Ri(a, +n), s = i(o);
    o !== s && (a.delete(o), a.add(s));
  }
  if (Sa(a)) {
    const o = +t[t.length - 2], s = Ri(a, o);
    switch (+n == 0 ? "key" : "value") {
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
function ts(e, t, i = []) {
  if (!e)
    return;
  if (!ii(e)) {
    Gi(e, (o, s) => ts(o, t, [...i, ...va(s)]));
    return;
  }
  const [a, n] = e;
  n && Gi(n, (o, s) => {
    ts(o, t, [...i, ...va(s)]);
  }), t(a, i);
}
function qb(e, t, i) {
  return ts(t, (a, n) => {
    e = es(e, n, (o) => Hb(o, a, i));
  }), e;
}
function Wb(e, t) {
  function i(a, n) {
    const o = Kb(e, va(n));
    a.map(va).forEach((s) => {
      e = es(e, s, () => o);
    });
  }
  if (ii(t)) {
    const [a, n] = t;
    a.forEach((o) => {
      e = es(e, va(o), () => e);
    }), n && Gi(n, i);
  } else
    Gi(t, i);
  return e;
}
var Gb = (e, t) => xa(e) || ii(e) || Sa(e) || Oa(e) || Tl(e, t);
function Jb(e, t, i) {
  const a = i.get(e);
  a ? a.push(t) : i.set(e, [t]);
}
function Yb(e, t) {
  const i = {};
  let a;
  return e.forEach((n) => {
    if (n.length <= 1)
      return;
    t || (n = n.map((r) => r.map(String)).sort((r, c) => r.length - c.length));
    const [o, ...s] = n;
    o.length === 0 ? a = s.map(Ao) : i[Ao(o)] = s.map(Ao);
  }), a ? Qo(i) ? [a] : [a, i] : Qo(i) ? void 0 : i;
}
var Nl = (e, t, i, a, n = [], o = [], s = /* @__PURE__ */ new Map()) => {
  var r;
  const c = Ub(e);
  if (!c) {
    Jb(e, n, t);
    const h = s.get(e);
    if (h)
      return a ? {
        transformedValue: null
      } : h;
  }
  if (!Gb(e, i)) {
    const h = Pc(e, i), w = h ? {
      transformedValue: h.value,
      annotations: [h.type]
    } : {
      transformedValue: e
    };
    return c || s.set(e, w), w;
  }
  if (pn(o, e))
    return {
      transformedValue: null
    };
  const d = Pc(e, i), u = (r = d?.value) != null ? r : e, l = ii(u) ? [] : {}, p = {};
  Gi(u, (h, w) => {
    if (w === "__proto__" || w === "constructor" || w === "prototype")
      throw new Error(`Detected property ${w}. This is a prototype pollution risk, please remove it from your object.`);
    const I = Nl(h, t, i, a, [...n, w], [...o, e], s);
    l[w] = I.transformedValue, ii(I.annotations) ? p[w] = I.annotations : xa(I.annotations) && Gi(I.annotations, (x, L) => {
      p[wl(w) + "." + L] = x;
    });
  });
  const m = Qo(p) ? {
    transformedValue: l,
    annotations: d ? [d.type] : void 0
  } : {
    transformedValue: l,
    annotations: d ? [d.type, p] : p
  };
  return c || s.set(e, m), m;
};
P();
P();
function Dl(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function Rc(e) {
  return Dl(e) === "Array";
}
function Xb(e) {
  if (Dl(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function Qb(e, t, i, a, n) {
  const o = {}.propertyIsEnumerable.call(a, t) ? "enumerable" : "nonenumerable";
  o === "enumerable" && (e[t] = i), n && o === "nonenumerable" && Object.defineProperty(e, t, {
    value: i,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function is(e, t = {}) {
  if (Rc(e))
    return e.map((n) => is(n, t));
  if (!Xb(e))
    return e;
  const i = Object.getOwnPropertyNames(e), a = Object.getOwnPropertySymbols(e);
  return [...i, ...a].reduce((n, o) => {
    if (Rc(t.props) && !t.props.includes(o))
      return n;
    const s = e[o], r = is(s, t);
    return Qb(n, o, r, e, t.nonenumerable), n;
  }, {});
}
var ke = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new Tb(), this.symbolRegistry = new vl((t) => {
      var i;
      return (i = t.description) != null ? i : "";
    }), this.customTransformerRegistry = new Ob(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), i = Nl(e, t, this, this.dedupe), a = {
      json: i.transformedValue
    };
    i.annotations && (a.meta = {
      ...a.meta,
      values: i.annotations
    });
    const n = Yb(t, this.dedupe);
    return n && (a.meta = {
      ...a.meta,
      referentialEqualities: n
    }), a;
  }
  deserialize(e) {
    const { json: t, meta: i } = e;
    let a = is(t);
    return i?.values && (a = qb(a, i.values, this)), i?.referentialEqualities && (a = Wb(a, i.referentialEqualities)), a;
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
ke.defaultInstance = new ke();
ke.serialize = ke.defaultInstance.serialize.bind(ke.defaultInstance);
ke.deserialize = ke.defaultInstance.deserialize.bind(ke.defaultInstance);
ke.stringify = ke.defaultInstance.stringify.bind(ke.defaultInstance);
ke.parse = ke.defaultInstance.parse.bind(ke.defaultInstance);
ke.registerClass = ke.defaultInstance.registerClass.bind(ke.defaultInstance);
ke.registerSymbol = ke.defaultInstance.registerSymbol.bind(ke.defaultInstance);
ke.registerCustom = ke.defaultInstance.registerCustom.bind(ke.defaultInstance);
ke.allowErrorProps = ke.defaultInstance.allowErrorProps.bind(ke.defaultInstance);
P();
P();
P();
P();
P();
P();
P();
P();
P();
P();
P();
P();
P();
P();
P();
var $c, Uc;
(Uc = ($c = M).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || ($c.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var Fc, zc;
(zc = (Fc = M).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (Fc.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var Lc, Mc;
(Mc = (Lc = M).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (Lc.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Bc, Zc;
(Zc = (Bc = M).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (Bc.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var Hc, Kc;
(Kc = (Hc = M).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (Hc.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var qc, Wc;
(Wc = (qc = M).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (qc.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
P();
P();
P();
P();
const Mt = typeof window < "u";
let gi;
const Ca = (e) => gi = e;
process.env.NODE_ENV;
const Vn = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function Ei(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var jt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(jt || (jt = {}));
const Gc = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function e_(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function zs(e, t, i) {
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
function mn(e) {
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
const gn = typeof navigator == "object" ? navigator : { userAgent: "" }, jl = /Macintosh/.test(gn.userAgent) && /AppleWebKit/.test(gn.userAgent) && !/Safari/.test(gn.userAgent), Pl = Mt ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !jl ? t_ : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in gn ? i_ : (
      // Fallback to using FileReader and a popup
      a_
    )
  )
) : () => {
};
function t_(e, t = "download", i) {
  const a = document.createElement("a");
  a.download = t, a.rel = "noopener", typeof e == "string" ? (a.href = e, a.origin !== location.origin ? Vl(a.href) ? zs(e, t, i) : (a.target = "_blank", mn(a)) : mn(a)) : (a.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 4e4), setTimeout(function() {
    mn(a);
  }, 0));
}
function i_(e, t = "download", i) {
  if (typeof e == "string")
    if (Vl(e))
      zs(e, t, i);
    else {
      const a = document.createElement("a");
      a.href = e, a.target = "_blank", setTimeout(function() {
        mn(a);
      });
    }
  else
    navigator.msSaveOrOpenBlob(e_(e, i), t);
}
function a_(e, t, i, a) {
  if (a = a || open("", "_blank"), a && (a.document.title = a.document.body.innerText = "downloading..."), typeof e == "string")
    return zs(e, t, i);
  const n = e.type === "application/octet-stream", o = /constructor/i.test(String(Gc.HTMLElement)) || "safari" in Gc, s = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((s || n && o || jl) && typeof FileReader < "u") {
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
function ze(e, t) {
  const i = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(i, t) : t === "error" ? console.error(i) : t === "warn" ? console.warn(i) : console.log(i);
}
function Ls(e) {
  return "_a" in e && "install" in e;
}
function Rl() {
  if (!("clipboard" in navigator))
    return ze("Your browser doesn't support the Clipboard API", "error"), !0;
}
function $l(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (ze('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function n_(e) {
  if (!Rl())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), ze("Global state copied to clipboard.");
    } catch (t) {
      if ($l(t))
        return;
      ze("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function o_(e) {
  if (!Rl())
    try {
      Ul(e, JSON.parse(await navigator.clipboard.readText())), ze("Global state pasted from clipboard.");
    } catch (t) {
      if ($l(t))
        return;
      ze("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function s_(e) {
  try {
    Pl(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    ze("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let Rt;
function r_() {
  Rt || (Rt = document.createElement("input"), Rt.type = "file", Rt.accept = ".json");
  function e() {
    return new Promise((t, i) => {
      Rt.onchange = async () => {
        const a = Rt.files;
        if (!a)
          return t(null);
        const n = a.item(0);
        return t(n ? { text: await n.text(), file: n } : null);
      }, Rt.oncancel = () => t(null), Rt.onerror = i, Rt.click();
    });
  }
  return e;
}
async function c_(e) {
  try {
    const i = await r_()();
    if (!i)
      return;
    const { text: a, file: n } = i;
    Ul(e, JSON.parse(a)), ze(`Global state imported from "${n.name}".`);
  } catch (t) {
    ze("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Ul(e, t) {
  for (const i in t) {
    const a = e.state.value[i];
    a ? Object.assign(a, t[i]) : e.state.value[i] = t[i];
  }
}
function mt(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Fl = "🍍 Pinia (root)", hn = "_root";
function d_(e) {
  return Ls(e) ? {
    id: hn,
    label: Fl
  } : {
    id: e.$id,
    label: e.$id
  };
}
function u_(e) {
  if (Ls(e)) {
    const i = Array.from(e._s.keys()), a = e._s;
    return {
      state: i.map((o) => ({
        editable: !0,
        key: o,
        value: e.state.value[o]
      })),
      getters: i.filter((o) => a.get(o)._getters).map((o) => {
        const s = a.get(o);
        return {
          editable: !1,
          key: o,
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
function l_(e) {
  return e ? Array.isArray(e) ? e.reduce((t, i) => (t.keys.push(i.key), t.operations.push(i.type), t.oldValue[i.key] = i.oldValue, t.newValue[i.key] = i.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: mt(e.type),
    key: mt(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function f_(e) {
  switch (e) {
    case jt.direct:
      return "mutation";
    case jt.patchFunction:
      return "$patch";
    case jt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let $i = !0;
const bn = [], li = "pinia:mutations", He = "pinia", { assign: p_ } = Object, jn = (e) => "🍍 " + e;
function m_(e, t) {
  bl({
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
      id: He,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            n_(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await o_(t), i.sendInspectorTree(He), i.sendInspectorState(He);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            s_(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await c_(t), i.sendInspectorTree(He), i.sendInspectorState(He);
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
        const o = a.componentInstance.proxy._pStores;
        Object.values(o).forEach((s) => {
          a.instanceData.state.push({
            type: jn(s.$id),
            key: "state",
            editable: !0,
            value: s._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ X(s.$state),
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
            type: jn(s.$id),
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
      if (a.app === e && a.inspectorId === He) {
        let n = [t];
        n = n.concat(Array.from(t._s.values())), a.rootNodes = (a.filter ? n.filter((o) => "$id" in o ? o.$id.toLowerCase().includes(a.filter.toLowerCase()) : Fl.toLowerCase().includes(a.filter.toLowerCase())) : n).map(d_);
      }
    }), globalThis.$pinia = t, i.on.getInspectorState((a) => {
      if (a.app === e && a.inspectorId === He) {
        const n = a.nodeId === hn ? t : t._s.get(a.nodeId);
        if (!n)
          return;
        n && (a.nodeId !== hn && (globalThis.$store = /* @__PURE__ */ X(n)), a.state = u_(n));
      }
    }), i.on.editInspectorState((a) => {
      if (a.app === e && a.inspectorId === He) {
        const n = a.nodeId === hn ? t : t._s.get(a.nodeId);
        if (!n)
          return ze(`store "${a.nodeId}" not found`, "error");
        const { path: o } = a;
        Ls(n) ? o.unshift("state") : (o.length !== 1 || !n._customProperties.has(o[0]) || o[0] in n.$state) && o.unshift("$state"), $i = !1, a.set(n, o, a.state.value), $i = !0;
      }
    }), i.on.editComponentState((a) => {
      if (a.type.startsWith("🍍")) {
        const n = a.type.replace(/^🍍\s*/, ""), o = t._s.get(n);
        if (!o)
          return ze(`store "${n}" not found`, "error");
        const { path: s } = a;
        if (s[0] !== "state")
          return ze(`Invalid path for store "${n}":
${s}
Only state can be modified.`);
        s[0] = "$state", $i = !1, a.set(o, s, a.state.value), $i = !0;
      }
    });
  });
}
function g_(e, t) {
  bn.includes(jn(t.$id)) || bn.push(jn(t.$id)), bl({
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
    t.$onAction(({ after: s, onError: r, name: c, args: d }) => {
      const u = zl++;
      i.addTimelineEvent({
        layerId: li,
        event: {
          time: a(),
          title: "🛫 " + c,
          subtitle: "start",
          data: {
            store: mt(t.$id),
            action: mt(c),
            args: d
          },
          groupId: u
        }
      }), s((l) => {
        Qt = void 0, i.addTimelineEvent({
          layerId: li,
          event: {
            time: a(),
            title: "🛬 " + c,
            subtitle: "end",
            data: {
              store: mt(t.$id),
              action: mt(c),
              args: d,
              result: l
            },
            groupId: u
          }
        });
      }), r((l) => {
        Qt = void 0, i.addTimelineEvent({
          layerId: li,
          event: {
            time: a(),
            logType: "error",
            title: "💥 " + c,
            subtitle: "end",
            data: {
              store: mt(t.$id),
              action: mt(c),
              args: d,
              error: l
            },
            groupId: u
          }
        });
      });
    }, !0), t._customProperties.forEach((s) => {
      Mi(() => C(t[s]), (r, c) => {
        i.notifyComponentUpdate(), i.sendInspectorState(He), $i && i.addTimelineEvent({
          layerId: li,
          event: {
            time: a(),
            title: "Change",
            subtitle: s,
            data: {
              newValue: r,
              oldValue: c
            },
            groupId: Qt
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: s, type: r }, c) => {
      if (i.notifyComponentUpdate(), i.sendInspectorState(He), !$i)
        return;
      const d = {
        time: a(),
        title: f_(r),
        data: p_({ store: mt(t.$id) }, l_(s)),
        groupId: Qt
      };
      r === jt.patchFunction ? d.subtitle = "⤵️" : r === jt.patchObject ? d.subtitle = "🧩" : s && !Array.isArray(s) && (d.subtitle = s.type), s && (d.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: s
        }
      }), i.addTimelineEvent({
        layerId: li,
        event: d
      });
    }, { detached: !0, flush: "sync" });
    const n = t._hotUpdate;
    t._hotUpdate = Dt((s) => {
      n(s), i.addTimelineEvent({
        layerId: li,
        event: {
          time: a(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: mt(t.$id),
            info: mt("HMR update")
          }
        }
      }), i.notifyComponentUpdate(), i.sendInspectorTree(He), i.sendInspectorState(He);
    });
    const { $dispose: o } = t;
    t.$dispose = () => {
      o(), i.notifyComponentUpdate(), i.sendInspectorTree(He), i.sendInspectorState(He), i.getSettings().logStoreChanges && ze(`Disposed "${t.$id}" store 🗑`);
    }, i.notifyComponentUpdate(), i.sendInspectorTree(He), i.sendInspectorState(He), i.getSettings().logStoreChanges && ze(`"${t.$id}" store installed 🆕`);
  });
}
let zl = 0, Qt;
function Jc(e, t, i) {
  const a = t.reduce((n, o) => (n[o] = (/* @__PURE__ */ X(e))[o], n), {});
  for (const n in a)
    e[n] = function() {
      const o = zl, s = i ? new Proxy(e, {
        get(...c) {
          return Qt = o, Reflect.get(...c);
        },
        set(...c) {
          return Qt = o, Reflect.set(...c);
        }
      }) : e;
      Qt = o;
      const r = a[n].apply(s, arguments);
      return Qt = void 0, r;
    };
}
function h_({ app: e, store: t, options: i }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!i.state, !t._p._testing) {
      Jc(t, Object.keys(i.actions), t._isOptionsAPI);
      const a = t._hotUpdate;
      (/* @__PURE__ */ X(t))._hotUpdate = function(n) {
        a.apply(this, arguments), Jc(t, Object.keys(n._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    g_(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function b_() {
  const e = zd(!0), t = e.run(() => /* @__PURE__ */ Ne({}));
  let i = [], a = [];
  const n = Dt({
    install(o) {
      Ca(n), n._a = o, o.provide(Vn, n), o.config.globalProperties.$pinia = n, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt && m_(o, n), a.forEach((s) => i.push(s)), a = [];
    },
    use(o) {
      return this._a ? i.push(o) : a.push(o), this;
    },
    _p: i,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt && typeof Proxy < "u" && n.use(h_), n;
}
function Ll(e, t) {
  for (const i in t) {
    const a = t[i];
    if (!(i in e))
      continue;
    const n = e[i];
    Ei(n) && Ei(a) && !/* @__PURE__ */ _e(a) && !/* @__PURE__ */ _t(a) ? e[i] = Ll(n, a) : e[i] = a;
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
  return !i && Ld() && tp(n), n;
}
function Ni(e, ...t) {
  e.forEach((i) => {
    i(...t);
  });
}
const __ = (e) => e(), Xc = /* @__PURE__ */ Symbol(), To = /* @__PURE__ */ Symbol();
function as(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((i, a) => e.set(a, i)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const i in t) {
    if (!t.hasOwnProperty(i))
      continue;
    const a = t[i], n = e[i];
    Ei(n) && Ei(a) && e.hasOwnProperty(i) && !/* @__PURE__ */ _e(a) && !/* @__PURE__ */ _t(a) ? e[i] = as(n, a) : e[i] = a;
  }
  return e;
}
const v_ = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
function y_(e) {
  return !Ei(e) || !Object.prototype.hasOwnProperty.call(e, v_);
}
const { assign: ut } = Object;
function Qc(e) {
  return !!(/* @__PURE__ */ _e(e) && e.effect);
}
function ed(e, t, i, a) {
  const { state: n, actions: o, getters: s } = t, r = i.state.value[e];
  let c;
  function d() {
    !r && (process.env.NODE_ENV === "production" || !a) && (i.state.value[e] = n ? n() : {});
    const u = process.env.NODE_ENV !== "production" && a ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      /* @__PURE__ */ or((/* @__PURE__ */ Ne(n ? n() : {})).value)
    ) : /* @__PURE__ */ or(i.state.value[e]);
    return ut(u, o, Object.keys(s || {}).reduce((l, p) => (process.env.NODE_ENV !== "production" && p in u && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${p}" in store "${e}".`), l[p] = Dt(Xt(() => {
      Ca(i);
      const m = i._s.get(e);
      return s[p].call(m, m);
    })), l), {}));
  }
  return c = ns(e, d, t, i, a, !0), c;
}
function ns(e, t, i = {}, a, n, o) {
  let s;
  const r = ut({ actions: {} }, i);
  if (process.env.NODE_ENV !== "production" && !a._e.active)
    throw new Error("Pinia destroyed");
  const c = { deep: !0 };
  process.env.NODE_ENV !== "production" && (c.onTrigger = (F) => {
    d ? m = F : d == !1 && !B._hotUpdating && (Array.isArray(m) ? m.push(F) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let d, u, l = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m;
  const h = a.state.value[e];
  !o && !h && (process.env.NODE_ENV === "production" || !n) && (a.state.value[e] = {});
  const w = /* @__PURE__ */ Ne({});
  let I;
  function x(F) {
    let U;
    d = u = !1, process.env.NODE_ENV !== "production" && (m = []), typeof F == "function" ? (F(a.state.value[e]), U = {
      type: jt.patchFunction,
      storeId: e,
      events: m
    }) : (as(a.state.value[e], F), U = {
      type: jt.patchObject,
      payload: F,
      storeId: e,
      events: m
    });
    const Q = I = /* @__PURE__ */ Symbol();
    wn().then(() => {
      I === Q && (d = !0);
    }), u = !0, Ni(l, U, a.state.value[e]);
  }
  const L = o ? function() {
    const { state: U } = i, Q = U ? U() : {};
    this.$patch((ce) => {
      ut(ce, Q);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Ml
  );
  function R() {
    s.stop(), l.clear(), p.clear(), a._s.delete(e);
  }
  const H = (F, U = "") => {
    if (Xc in F)
      return F[To] = U, F;
    const Q = function() {
      Ca(a);
      const ce = Array.from(arguments), Ve = /* @__PURE__ */ new Set(), Fe = /* @__PURE__ */ new Set();
      function be(ie) {
        Ve.add(ie);
      }
      function $(ie) {
        Fe.add(ie);
      }
      Ni(p, {
        args: ce,
        name: Q[To],
        store: B,
        after: be,
        onError: $
      });
      let J;
      try {
        J = F.apply(this && this.$id === e ? this : B, ce);
      } catch (ie) {
        throw Ni(Fe, ie), ie;
      }
      return J instanceof Promise ? J.then((ie) => (Ni(Ve, ie), ie)).catch((ie) => (Ni(Fe, ie), Promise.reject(ie))) : (Ni(Ve, J), J);
    };
    return Q[Xc] = !0, Q[To] = U, Q;
  }, V = /* @__PURE__ */ Dt({
    actions: {},
    getters: {},
    state: [],
    hotState: w
  }), te = {
    _p: a,
    // _s: scope,
    $id: e,
    $onAction: Yc.bind(null, p),
    $patch: x,
    $reset: L,
    $subscribe(F, U = {}) {
      const Q = Yc(l, F, U.detached, () => ce()), ce = s.run(() => Mi(() => a.state.value[e], (Ve) => {
        (U.flush === "sync" ? u : d) && F({
          storeId: e,
          type: jt.direct,
          events: m
        }, Ve);
      }, ut({}, c, U)));
      return Q;
    },
    $dispose: R
  }, B = /* @__PURE__ */ qn(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt ? ut(
    {
      _hmrPayload: V,
      _customProperties: Dt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    te
    // must be added later
    // setupStore
  ) : te);
  a._s.set(e, B);
  const W = (a._a && a._a.runWithContext || __)(() => a._e.run(() => (s = zd()).run(() => t({ action: H }))));
  for (const F in W) {
    const U = W[F];
    if (/* @__PURE__ */ _e(U) && !Qc(U) || /* @__PURE__ */ _t(U))
      process.env.NODE_ENV !== "production" && n ? w.value[F] = /* @__PURE__ */ go(W, F) : o || (h && y_(U) && (/* @__PURE__ */ _e(U) ? U.value = h[F] : as(U, h[F])), a.state.value[e][F] = U), process.env.NODE_ENV !== "production" && V.state.push(F);
    else if (typeof U == "function") {
      const Q = process.env.NODE_ENV !== "production" && n ? U : H(U, F);
      W[F] = Q, process.env.NODE_ENV !== "production" && (V.actions[F] = U), r.actions[F] = U;
    } else process.env.NODE_ENV !== "production" && Qc(U) && (V.getters[F] = o ? (
      // @ts-expect-error
      i.getters[F]
    ) : U, Mt && (W._getters || // @ts-expect-error: same
    (W._getters = Dt([]))).push(F));
  }
  if (ut(B, W), ut(/* @__PURE__ */ X(B), W), Object.defineProperty(B, "$state", {
    get: () => process.env.NODE_ENV !== "production" && n ? w.value : a.state.value[e],
    set: (F) => {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error("cannot set hotState");
      x((U) => {
        ut(U, F);
      });
    }
  }), process.env.NODE_ENV !== "production" && (B._hotUpdate = Dt((F) => {
    B._hotUpdating = !0, F._hmrPayload.state.forEach((U) => {
      if (U in B.$state) {
        const Q = F.$state[U], ce = B.$state[U];
        typeof Q == "object" && Ei(Q) && Ei(ce) ? Ll(Q, ce) : F.$state[U] = ce;
      }
      B[U] = /* @__PURE__ */ go(F.$state, U);
    }), Object.keys(B.$state).forEach((U) => {
      U in F.$state || delete B[U];
    }), d = !1, u = !1, a.state.value[e] = /* @__PURE__ */ go(F._hmrPayload, "hotState"), u = !0, wn().then(() => {
      d = !0;
    });
    for (const U in F._hmrPayload.actions) {
      const Q = F[U];
      B[U] = //
      H(Q, U);
    }
    for (const U in F._hmrPayload.getters) {
      const Q = F._hmrPayload.getters[U], ce = o ? (
        // special handling of options api
        Xt(() => (Ca(a), Q.call(B, B)))
      ) : Q;
      B[U] = //
      ce;
    }
    Object.keys(B._hmrPayload.getters).forEach((U) => {
      U in F._hmrPayload.getters || delete B[U];
    }), Object.keys(B._hmrPayload.actions).forEach((U) => {
      U in F._hmrPayload.actions || delete B[U];
    }), B._hmrPayload = F._hmrPayload, B._getters = F._getters, B._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt) {
    const F = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((U) => {
      Object.defineProperty(B, U, ut({ value: B[U] }, F));
    });
  }
  return a._p.forEach((F) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Mt) {
      const U = s.run(() => F({
        store: B,
        app: a._a,
        pinia: a,
        options: r
      }));
      Object.keys(U || {}).forEach((Q) => B._customProperties.add(Q)), ut(B, U);
    } else
      ut(B, s.run(() => F({
        store: B,
        app: a._a,
        pinia: a,
        options: r
      })));
  }), process.env.NODE_ENV !== "production" && B.$state && typeof B.$state == "object" && typeof B.$state.constructor == "function" && !B.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${B.$id}".`), h && o && i.hydrate && i.hydrate(B.$state, h), d = !0, u = !0, B;
}
// @__NO_SIDE_EFFECTS__
function k_(e, t, i) {
  let a;
  const n = typeof t == "function";
  a = n ? i : t;
  function o(s, r) {
    const c = Uo();
    if (s = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && gi && gi._testing ? null : s) || (c ? vi(Vn, null) : null), s && Ca(s), process.env.NODE_ENV !== "production" && !gi)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    s = gi, s._s.has(e) || (n ? ns(e, t, a, s) : ed(e, a, s), process.env.NODE_ENV !== "production" && (o._pinia = s));
    const d = s._s.get(e);
    if (process.env.NODE_ENV !== "production" && r) {
      const u = "__hot:" + e, l = n ? ns(u, t, a, s, !0) : ed(u, ut({}, a), s, !0);
      r._hotUpdate(l), delete s.state.value[u], s._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && Mt) {
      const u = Qn();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !r) {
        const l = u.proxy, p = "_pStores" in l ? l._pStores : l._pStores = {};
        p[e] = d;
      }
    }
    return d;
  }
  return o.$id = e, o;
}
const w_ = 1, I_ = "albina-galgame-card", E_ = "本包内的五首配乐均为 Kevin MacLeod 以 CC BY 4.0 发布的作品，不是 ProjectMoon 官方 OST。", A_ = [{ assetId: "file.audio.bgm.backstreets.rain.mp3", path: "audio/bgm/backstreets_rain.mp3", sha256: "97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414", cueAlias: "backstreets_rain", title: "SCP-x6x (Hopes)", creator: "Kevin MacLeod", isrc: "USUAN2000012", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.between.two.worlds.mp3", path: "audio/bgm/between_two_worlds.mp3", sha256: "25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184", cueAlias: "between_two_worlds", title: "Mesmerizing Galaxy", creator: "Kevin MacLeod", isrc: "USUAN2300011", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.boss.kromer.mp3", path: "audio/bgm/boss_kromer.mp3", sha256: "923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd", cueAlias: "boss_kromer", title: "Burnt Spirit", creator: "Kevin MacLeod", isrc: "USUAN1700053", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.main.menu.mp3", path: "audio/bgm/main_menu.mp3", sha256: "299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60", cueAlias: "main_menu", title: "Magistar", creator: "Kevin MacLeod", isrc: "USUAN1900003", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }, { assetId: "file.audio.bgm.title.theme.mp3", path: "audio/bgm/title_theme.mp3", sha256: "03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3", cueAlias: "title_theme", title: "Achilles", creator: "Kevin MacLeod", isrc: "USUAN1100463", sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463", licenseId: "CC-BY-4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", attribution: "Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0." }], T_ = { publisher: "ProjectMoon", bundled: !1, cached: !1, notice: "ProjectMoon 官方 OST 仅提供外部试听链接；本卡不下载、缓存或再分发这些音频。", links: [{ label: "ProjectMoon 官方 OST 播放列表", url: "https://www.youtube.com/playlist?list=PL9-RBacZ4KMzFjhRY4zD7_GbwL1LgNWXD" }, { label: "Canto IX 官方曲目", url: "https://www.youtube.com/watch?v=n5GI6EkCXCo" }], termsUrl: "https://limbuscompany.com/terms-of-service/" }, x_ = {
  version: w_,
  projectId: I_,
  packagedNotice: E_,
  tracks: A_,
  officialSoundtrack: T_
}, S_ = {
  class: "portrait-stage",
  "aria-label": "角色立绘"
}, O_ = /* @__PURE__ */ yu({
  __name: "PortraitStage",
  props: {
    portraits: {},
    service: {}
  },
  setup(e) {
    const t = e, i = /* @__PURE__ */ new Map();
    function a(o, s) {
      s instanceof HTMLCanvasElement ? i.set(o, s) : i.delete(o);
    }
    async function n() {
      t.service.stopAll(), await wn(), await Promise.all(t.portraits.map(async (o) => {
        const s = i.get(o.characterId);
        s && await t.service.play(o.portraitAssetId, s);
      }));
    }
    return Mi(() => t.portraits, () => {
      n();
    }, { deep: !0, immediate: !0 }), Es(() => t.service.stopAll()), (o, s) => (ue(), ge("div", S_, [
      (ue(!0), ge(Ke, null, Pi(e.portraits, (r) => (ue(), ge("canvas", {
        key: `${r.characterId}:${r.portraitAssetId}`,
        ref_for: !0,
        ref: (c) => a(r.characterId, c),
        class: Zn(["portrait-stage__canvas", [`portrait-stage__canvas--${r.position}`, { "is-active": r.active }]]),
        width: "512",
        height: "768",
        style: Bn({ transform: `translateX(-50%) scale(${r.scale})` })
      }, null, 6))), 128))
    ]));
  }
});
var td;
function y(e, t, i) {
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
    const d = s.prototype, u = Object.keys(d);
    for (let l = 0; l < u.length; l++) {
      const p = u[l];
      p in r || (r[p] = d[p].bind(r));
    }
  }
  const n = i?.Parent ?? Object;
  class o extends n {
  }
  Object.defineProperty(o, "name", { value: e });
  function s(r) {
    var c;
    const d = i?.Parent ? new o() : this;
    a(d, r), (c = d._zod).deferred ?? (c.deferred = []);
    for (const u of d._zod.deferred)
      u();
    return d;
  }
  return Object.defineProperty(s, "init", { value: a }), Object.defineProperty(s, Symbol.hasInstance, {
    value: (r) => i?.Parent && r instanceof i.Parent ? !0 : r?._zod?.traits?.has(e)
  }), Object.defineProperty(s, "name", { value: e }), s;
}
class Zi extends Error {
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
const Ms = globalThis.__zod_globalConfig;
function Zt(e) {
  return Ms;
}
function Zl(e) {
  const t = Object.values(e).filter((a) => typeof a == "number");
  return Object.entries(e).filter(([a, n]) => t.indexOf(+a) === -1).map(([a, n]) => n);
}
function os(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function no(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Bs(e) {
  return e == null;
}
function Zs(e) {
  const t = e.startsWith("^") ? 1 : 0, i = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, i);
}
function C_(e, t) {
  const i = e / t, a = Math.round(i), n = Number.EPSILON * Math.max(Math.abs(i), 1);
  return Math.abs(i - a) < n ? 0 : i - a;
}
const id = /* @__PURE__ */ Symbol("evaluating");
function he(e, t, i) {
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
function Ai(e, t, i) {
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
function N_(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Hl = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Na(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const D_ = /* @__PURE__ */ no(() => {
  if (Ms.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function Ji(e) {
  if (Na(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const i = t.prototype;
  return !(Na(i) === !1 || Object.prototype.hasOwnProperty.call(i, "isPrototypeOf") === !1);
}
function Kl(e) {
  return Ji(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
const V_ = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function Yi(e) {
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
function j_(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const P_ = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function R_(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const o = ai(e._zod.def, {
    get shape() {
      const s = {};
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && (s[r] = i.shape[r]);
      }
      return Ai(this, "shape", s), s;
    },
    checks: []
  });
  return ni(e, o);
}
function $_(e, t) {
  const i = e._zod.def, a = i.checks;
  if (a && a.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const o = ai(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape };
      for (const r in t) {
        if (!(r in i.shape))
          throw new Error(`Unrecognized key: "${r}"`);
        t[r] && delete s[r];
      }
      return Ai(this, "shape", s), s;
    },
    checks: []
  });
  return ni(e, o);
}
function U_(e, t) {
  if (!Ji(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const i = e._zod.def.checks;
  if (i && i.length > 0) {
    const o = e._zod.def.shape;
    for (const s in t)
      if (Object.getOwnPropertyDescriptor(o, s) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const n = ai(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape, ...t };
      return Ai(this, "shape", o), o;
    }
  });
  return ni(e, n);
}
function F_(e, t) {
  if (!Ji(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const i = ai(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t };
      return Ai(this, "shape", a), a;
    }
  });
  return ni(e, i);
}
function z_(e, t) {
  if (e._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const i = ai(e._zod.def, {
    get shape() {
      const a = { ...e._zod.def.shape, ...t._zod.def.shape };
      return Ai(this, "shape", a), a;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: t._zod.def.checks ?? []
  });
  return ni(e, i);
}
function L_(e, t, i) {
  const n = t._zod.def.checks;
  if (n && n.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const s = ai(t._zod.def, {
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
      return Ai(this, "shape", c), c;
    },
    checks: []
  });
  return ni(t, s);
}
function M_(e, t, i) {
  const a = ai(t._zod.def, {
    get shape() {
      const n = t._zod.def.shape, o = { ...n };
      if (i)
        for (const s in i) {
          if (!(s in o))
            throw new Error(`Unrecognized key: "${s}"`);
          i[s] && (o[s] = new e({
            type: "nonoptional",
            innerType: n[s]
          }));
        }
      else
        for (const s in n)
          o[s] = new e({
            type: "nonoptional",
            innerType: n[s]
          });
      return Ai(this, "shape", o), o;
    }
  });
  return ni(t, a);
}
function Ui(e, t = 0) {
  if (e.aborted === !0)
    return !0;
  for (let i = t; i < e.issues.length; i++)
    if (e.issues[i]?.continue !== !0)
      return !0;
  return !1;
}
function B_(e, t = 0) {
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
function Xa(e) {
  return typeof e == "string" ? e : e?.message;
}
function Ht(e, t, i) {
  const a = e.message ? e.message : Xa(e.inst?._zod.def?.error?.(e)) ?? Xa(t?.error?.(e)) ?? Xa(i.customError?.(e)) ?? Xa(i.localeError?.(e)) ?? "Invalid input", { inst: n, continue: o, input: s, ...r } = e;
  return r.path ?? (r.path = []), r.message = a, t?.reportInput && (r.input = s), r;
}
function Hs(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Da(...e) {
  const [t, i, a] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: i,
    inst: a
  } : { ...t };
}
const ql = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, os, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Wl = y("$ZodError", ql), Gl = y("$ZodError", ql, { Parent: Error });
function Z_(e, t = (i) => i.message) {
  const i = {}, a = [];
  for (const n of e.issues)
    n.path.length > 0 ? (i[n.path[0]] = i[n.path[0]] || [], i[n.path[0]].push(t(n))) : a.push(t(n));
  return { formErrors: a, fieldErrors: i };
}
function H_(e, t = (i) => i.message) {
  const i = { _errors: [] }, a = (n, o = []) => {
    for (const s of n.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((r) => a({ issues: r }, [...o, ...s.path]));
      else if (s.code === "invalid_key")
        a({ issues: s.issues }, [...o, ...s.path]);
      else if (s.code === "invalid_element")
        a({ issues: s.issues }, [...o, ...s.path]);
      else {
        const r = [...o, ...s.path];
        if (r.length === 0)
          i._errors.push(t(s));
        else {
          let c = i, d = 0;
          for (; d < r.length; ) {
            const u = r[d];
            d === r.length - 1 ? (c[u] = c[u] || { _errors: [] }, c[u]._errors.push(t(s))) : c[u] = c[u] || { _errors: [] }, c = c[u], d++;
          }
        }
      }
  };
  return a(e), i;
}
const Ks = (e) => (t, i, a, n) => {
  const o = a ? { ...a, async: !1 } : { async: !1 }, s = t._zod.run({ value: i, issues: [] }, o);
  if (s instanceof Promise)
    throw new Zi();
  if (s.issues.length) {
    const r = new (n?.Err ?? e)(s.issues.map((c) => Ht(c, o, Zt())));
    throw Hl(r, n?.callee), r;
  }
  return s.value;
}, qs = (e) => async (t, i, a, n) => {
  const o = a ? { ...a, async: !0 } : { async: !0 };
  let s = t._zod.run({ value: i, issues: [] }, o);
  if (s instanceof Promise && (s = await s), s.issues.length) {
    const r = new (n?.Err ?? e)(s.issues.map((c) => Ht(c, o, Zt())));
    throw Hl(r, n?.callee), r;
  }
  return s.value;
}, oo = (e) => (t, i, a) => {
  const n = a ? { ...a, async: !1 } : { async: !1 }, o = t._zod.run({ value: i, issues: [] }, n);
  if (o instanceof Promise)
    throw new Zi();
  return o.issues.length ? {
    success: !1,
    error: new (e ?? Wl)(o.issues.map((s) => Ht(s, n, Zt())))
  } : { success: !0, data: o.value };
}, K_ = /* @__PURE__ */ oo(Gl), so = (e) => async (t, i, a) => {
  const n = a ? { ...a, async: !0 } : { async: !0 };
  let o = t._zod.run({ value: i, issues: [] }, n);
  return o instanceof Promise && (o = await o), o.issues.length ? {
    success: !1,
    error: new e(o.issues.map((s) => Ht(s, n, Zt())))
  } : { success: !0, data: o.value };
}, q_ = /* @__PURE__ */ so(Gl), W_ = (e) => (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return Ks(e)(t, i, n);
}, G_ = (e) => (t, i, a) => Ks(e)(t, i, a), J_ = (e) => async (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return qs(e)(t, i, n);
}, Y_ = (e) => async (t, i, a) => qs(e)(t, i, a), X_ = (e) => (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return oo(e)(t, i, n);
}, Q_ = (e) => (t, i, a) => oo(e)(t, i, a), e0 = (e) => async (t, i, a) => {
  const n = a ? { ...a, direction: "backward" } : { direction: "backward" };
  return so(e)(t, i, n);
}, t0 = (e) => async (t, i, a) => so(e)(t, i, a), i0 = /^[cC][0-9a-z]{6,}$/, a0 = /^[0-9a-z]+$/, n0 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, o0 = /^[0-9a-vA-V]{20}$/, s0 = /^[A-Za-z0-9]{27}$/, r0 = /^[a-zA-Z0-9_-]{21}$/, c0 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, d0 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, nd = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, u0 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, l0 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function f0() {
  return new RegExp(l0, "u");
}
const p0 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, m0 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, g0 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, h0 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, b0 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Jl = /^[A-Za-z0-9_-]*$/, _0 = /^https?$/, v0 = /^\+[1-9]\d{6,14}$/, Yl = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", y0 = /* @__PURE__ */ new RegExp(`^${Yl}$`);
function Xl(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function k0(e) {
  return new RegExp(`^${Xl(e)}$`);
}
function w0(e) {
  const t = Xl({ precision: e.precision }), i = ["Z"];
  e.local && i.push(""), e.offset && i.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const a = `${t}(?:${i.join("|")})`;
  return new RegExp(`^${Yl}T(?:${a})$`);
}
const I0 = (e) => {
  const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, E0 = /^-?\d+$/, Ql = /^-?\d+(?:\.\d+)?$/, A0 = /^(?:true|false)$/i, T0 = /^[^A-Z]*$/, x0 = /^[^a-z]*$/, at = /* @__PURE__ */ y("$ZodCheck", (e, t) => {
  var i;
  e._zod ?? (e._zod = {}), e._zod.def = t, (i = e._zod).onattach ?? (i.onattach = []);
}), ef = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, tf = /* @__PURE__ */ y("$ZodCheckLessThan", (e, t) => {
  at.init(e, t);
  const i = ef[typeof t.value];
  e._zod.onattach.push((a) => {
    const n = a._zod.bag, o = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < o && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
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
  at.init(e, t);
  const i = ef[typeof t.value];
  e._zod.onattach.push((a) => {
    const n = a._zod.bag, o = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > o && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
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
}), S0 = /* @__PURE__ */ y("$ZodCheckMultipleOf", (e, t) => {
  at.init(e, t), e._zod.onattach.push((i) => {
    var a;
    (a = i._zod.bag).multipleOf ?? (a.multipleOf = t.value);
  }), e._zod.check = (i) => {
    if (typeof i.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof i.value == "bigint" ? i.value % t.value === BigInt(0) : C_(i.value, t.value) === 0) || i.issues.push({
      origin: typeof i.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), O0 = /* @__PURE__ */ y("$ZodCheckNumberFormat", (e, t) => {
  at.init(e, t), t.format = t.format || "float64";
  const i = t.format?.includes("int"), a = i ? "int" : "number", [n, o] = P_[t.format];
  e._zod.onattach.push((s) => {
    const r = s._zod.bag;
    r.format = t.format, r.minimum = n, r.maximum = o, i && (r.pattern = E0);
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
    r < n && s.issues.push({
      origin: "number",
      input: r,
      code: "too_small",
      minimum: n,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), r > o && s.issues.push({
      origin: "number",
      input: r,
      code: "too_big",
      maximum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), C0 = /* @__PURE__ */ y("$ZodCheckMaxLength", (e, t) => {
  var i;
  at.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const n = a.value;
    return !Bs(n) && n.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const n = a._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < n && (a._zod.bag.maximum = t.maximum);
  }), e._zod.check = (a) => {
    const n = a.value;
    if (n.length <= t.maximum)
      return;
    const s = Hs(n);
    a.issues.push({
      origin: s,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: n,
      inst: e,
      continue: !t.abort
    });
  };
}), N0 = /* @__PURE__ */ y("$ZodCheckMinLength", (e, t) => {
  var i;
  at.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const n = a.value;
    return !Bs(n) && n.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const n = a._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > n && (a._zod.bag.minimum = t.minimum);
  }), e._zod.check = (a) => {
    const n = a.value;
    if (n.length >= t.minimum)
      return;
    const s = Hs(n);
    a.issues.push({
      origin: s,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: n,
      inst: e,
      continue: !t.abort
    });
  };
}), D0 = /* @__PURE__ */ y("$ZodCheckLengthEquals", (e, t) => {
  var i;
  at.init(e, t), (i = e._zod.def).when ?? (i.when = (a) => {
    const n = a.value;
    return !Bs(n) && n.length !== void 0;
  }), e._zod.onattach.push((a) => {
    const n = a._zod.bag;
    n.minimum = t.length, n.maximum = t.length, n.length = t.length;
  }), e._zod.check = (a) => {
    const n = a.value, o = n.length;
    if (o === t.length)
      return;
    const s = Hs(n), r = o > t.length;
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
}), ro = /* @__PURE__ */ y("$ZodCheckStringFormat", (e, t) => {
  var i, a;
  at.init(e, t), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.format = t.format, t.pattern && (o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(t.pattern));
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
}), V0 = /* @__PURE__ */ y("$ZodCheckRegex", (e, t) => {
  ro.init(e, t), e._zod.check = (i) => {
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
}), j0 = /* @__PURE__ */ y("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = T0), ro.init(e, t);
}), P0 = /* @__PURE__ */ y("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = x0), ro.init(e, t);
}), R0 = /* @__PURE__ */ y("$ZodCheckIncludes", (e, t) => {
  at.init(e, t);
  const i = Yi(t.includes), a = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${i}` : i);
  t.pattern = a, e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(a);
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
}), $0 = /* @__PURE__ */ y("$ZodCheckStartsWith", (e, t) => {
  at.init(e, t);
  const i = new RegExp(`^${Yi(t.prefix)}.*`);
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
  at.init(e, t);
  const i = new RegExp(`.*${Yi(t.suffix)}$`);
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
}), F0 = /* @__PURE__ */ y("$ZodCheckOverwrite", (e, t) => {
  at.init(e, t), e._zod.check = (i) => {
    i.value = t.tx(i.value);
  };
});
class z0 {
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
`).filter((s) => s), n = Math.min(...a.map((s) => s.length - s.trimStart().length)), o = a.map((s) => s.slice(n)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of o)
      this.content.push(s);
  }
  compile() {
    const t = Function, i = this?.args, n = [...(this?.content ?? [""]).map((o) => `  ${o}`)];
    return new t(...i, n.join(`
`));
  }
}
const L0 = {
  major: 4,
  minor: 4,
  patch: 3
}, Ee = /* @__PURE__ */ y("$ZodType", (e, t) => {
  var i;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = L0;
  const a = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && a.unshift(e);
  for (const n of a)
    for (const o of n._zod.onattach)
      o(e);
  if (a.length === 0)
    (i = e._zod).deferred ?? (i.deferred = []), e._zod.deferred?.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const n = (s, r, c) => {
      let d = Ui(s), u;
      for (const l of r) {
        if (l._zod.def.when) {
          if (B_(s) || !l._zod.def.when(s))
            continue;
        } else if (d)
          continue;
        const p = s.issues.length, m = l._zod.check(s);
        if (m instanceof Promise && c?.async === !1)
          throw new Zi();
        if (u || m instanceof Promise)
          u = (u ?? Promise.resolve()).then(async () => {
            await m, s.issues.length !== p && (d || (d = Ui(s, p)));
          });
        else {
          if (s.issues.length === p)
            continue;
          d || (d = Ui(s, p));
        }
      }
      return u ? u.then(() => s) : s;
    }, o = (s, r, c) => {
      if (Ui(s))
        return s.aborted = !0, s;
      const d = n(r, a, c);
      if (d instanceof Promise) {
        if (c.async === !1)
          throw new Zi();
        return d.then((u) => e._zod.parse(u, c));
      }
      return e._zod.parse(d, c);
    };
    e._zod.run = (s, r) => {
      if (r.skipChecks)
        return e._zod.parse(s, r);
      if (r.direction === "backward") {
        const d = e._zod.parse({ value: s.value, issues: [] }, { ...r, skipChecks: !0 });
        return d instanceof Promise ? d.then((u) => o(u, s, r)) : o(d, s, r);
      }
      const c = e._zod.parse(s, r);
      if (c instanceof Promise) {
        if (r.async === !1)
          throw new Zi();
        return c.then((d) => n(d, a, r));
      }
      return n(c, a, r);
    };
  }
  he(e, "~standard", () => ({
    validate: (n) => {
      try {
        const o = K_(e, n);
        return o.success ? { value: o.data } : { issues: o.error?.issues };
      } catch {
        return q_(e, n).then((s) => s.success ? { value: s.data } : { issues: s.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Ws = /* @__PURE__ */ y("$ZodString", (e, t) => {
  Ee.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? I0(e._zod.bag), e._zod.parse = (i, a) => {
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
}), Ie = /* @__PURE__ */ y("$ZodStringFormat", (e, t) => {
  ro.init(e, t), Ws.init(e, t);
}), M0 = /* @__PURE__ */ y("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = d0), Ie.init(e, t);
}), B0 = /* @__PURE__ */ y("$ZodUUID", (e, t) => {
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
  Ie.init(e, t);
}), Z0 = /* @__PURE__ */ y("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = u0), Ie.init(e, t);
}), H0 = /* @__PURE__ */ y("$ZodURL", (e, t) => {
  Ie.init(e, t), e._zod.check = (i) => {
    try {
      const a = i.value.trim();
      if (!t.normalize && t.protocol?.source === _0.source && !/^https?:\/\//i.test(a)) {
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
}), K0 = /* @__PURE__ */ y("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = f0()), Ie.init(e, t);
}), q0 = /* @__PURE__ */ y("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = r0), Ie.init(e, t);
}), W0 = /* @__PURE__ */ y("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = i0), Ie.init(e, t);
}), G0 = /* @__PURE__ */ y("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = a0), Ie.init(e, t);
}), J0 = /* @__PURE__ */ y("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = n0), Ie.init(e, t);
}), Y0 = /* @__PURE__ */ y("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = o0), Ie.init(e, t);
}), X0 = /* @__PURE__ */ y("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = s0), Ie.init(e, t);
}), Q0 = /* @__PURE__ */ y("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = w0(t)), Ie.init(e, t);
}), e1 = /* @__PURE__ */ y("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = y0), Ie.init(e, t);
}), t1 = /* @__PURE__ */ y("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = k0(t)), Ie.init(e, t);
}), i1 = /* @__PURE__ */ y("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = c0), Ie.init(e, t);
}), a1 = /* @__PURE__ */ y("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = p0), Ie.init(e, t), e._zod.bag.format = "ipv4";
}), n1 = /* @__PURE__ */ y("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = m0), Ie.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (i) => {
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
}), o1 = /* @__PURE__ */ y("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = g0), Ie.init(e, t);
}), s1 = /* @__PURE__ */ y("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = h0), Ie.init(e, t), e._zod.check = (i) => {
    const a = i.value.split("/");
    try {
      if (a.length !== 2)
        throw new Error();
      const [n, o] = a;
      if (!o)
        throw new Error();
      const s = Number(o);
      if (`${s}` !== o)
        throw new Error();
      if (s < 0 || s > 128)
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
const r1 = /* @__PURE__ */ y("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = b0), Ie.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (i) => {
    nf(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function c1(e) {
  if (!Jl.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (a) => a === "-" ? "+" : "/"), i = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return nf(i);
}
const d1 = /* @__PURE__ */ y("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = Jl), Ie.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (i) => {
    c1(i.value) || i.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), u1 = /* @__PURE__ */ y("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = v0), Ie.init(e, t);
});
function l1(e, t = null) {
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
const f1 = /* @__PURE__ */ y("$ZodJWT", (e, t) => {
  Ie.init(e, t), e._zod.check = (i) => {
    l1(i.value, t.alg) || i.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: i.value,
      inst: e,
      continue: !t.abort
    });
  };
}), of = /* @__PURE__ */ y("$ZodNumber", (e, t) => {
  Ee.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Ql, e._zod.parse = (i, a) => {
    if (t.coerce)
      try {
        i.value = Number(i.value);
      } catch {
      }
    const n = i.value;
    if (typeof n == "number" && !Number.isNaN(n) && Number.isFinite(n))
      return i;
    const o = typeof n == "number" ? Number.isNaN(n) ? "NaN" : Number.isFinite(n) ? void 0 : "Infinity" : void 0;
    return i.issues.push({
      expected: "number",
      code: "invalid_type",
      input: n,
      inst: e,
      ...o ? { received: o } : {}
    }), i;
  };
}), p1 = /* @__PURE__ */ y("$ZodNumberFormat", (e, t) => {
  O0.init(e, t), of.init(e, t);
}), m1 = /* @__PURE__ */ y("$ZodBoolean", (e, t) => {
  Ee.init(e, t), e._zod.pattern = A0, e._zod.parse = (i, a) => {
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
}), g1 = /* @__PURE__ */ y("$ZodUnknown", (e, t) => {
  Ee.init(e, t), e._zod.parse = (i) => i;
}), h1 = /* @__PURE__ */ y("$ZodNever", (e, t) => {
  Ee.init(e, t), e._zod.parse = (i, a) => (i.issues.push({
    expected: "never",
    code: "invalid_type",
    input: i.value,
    inst: e
  }), i);
});
function od(e, t, i) {
  e.issues.length && t.issues.push(...Fi(i, e.issues)), t.value[i] = e.value;
}
const b1 = /* @__PURE__ */ y("$ZodArray", (e, t) => {
  Ee.init(e, t), e._zod.parse = (i, a) => {
    const n = i.value;
    if (!Array.isArray(n))
      return i.issues.push({
        expected: "array",
        code: "invalid_type",
        input: n,
        inst: e
      }), i;
    i.value = Array(n.length);
    const o = [];
    for (let s = 0; s < n.length; s++) {
      const r = n[s], c = t.element._zod.run({
        value: r,
        issues: []
      }, a);
      c instanceof Promise ? o.push(c.then((d) => od(d, i, s))) : od(c, i, s);
    }
    return o.length ? Promise.all(o).then(() => i) : i;
  };
});
function Pn(e, t, i, a, n, o) {
  const s = i in a;
  if (e.issues.length) {
    if (n && o && !s)
      return;
    t.issues.push(...Fi(i, e.issues));
  }
  if (!s && !n) {
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
function sf(e) {
  const t = Object.keys(e.shape);
  for (const a of t)
    if (!e.shape?.[a]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const i = j_(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(i)
  };
}
function rf(e, t, i, a, n, o) {
  const s = [], r = n.keySet, c = n.catchall._zod, d = c.def.type, u = c.optin === "optional", l = c.optout === "optional";
  for (const p in t) {
    if (p === "__proto__" || r.has(p))
      continue;
    if (d === "never") {
      s.push(p);
      continue;
    }
    const m = c.run({ value: t[p], issues: [] }, a);
    m instanceof Promise ? e.push(m.then((h) => Pn(h, i, p, t, u, l))) : Pn(m, i, p, t, u, l);
  }
  return s.length && i.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: t,
    inst: o
  }), e.length ? Promise.all(e).then(() => i) : i;
}
const _1 = /* @__PURE__ */ y("$ZodObject", (e, t) => {
  if (Ee.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
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
  const a = no(() => sf(t));
  he(e._zod, "propValues", () => {
    const r = t.shape, c = {};
    for (const d in r) {
      const u = r[d]._zod;
      if (u.values) {
        c[d] ?? (c[d] = /* @__PURE__ */ new Set());
        for (const l of u.values)
          c[d].add(l);
      }
    }
    return c;
  });
  const n = Na, o = t.catchall;
  let s;
  e._zod.parse = (r, c) => {
    s ?? (s = a.value);
    const d = r.value;
    if (!n(d))
      return r.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: e
      }), r;
    r.value = {};
    const u = [], l = s.shape;
    for (const p of s.keys) {
      const m = l[p], h = m._zod.optin === "optional", w = m._zod.optout === "optional", I = m._zod.run({ value: d[p], issues: [] }, c);
      I instanceof Promise ? u.push(I.then((x) => Pn(x, r, p, d, h, w))) : Pn(I, r, p, d, h, w);
    }
    return o ? rf(u, d, r, c, a.value, e) : u.length ? Promise.all(u).then(() => r) : r;
  };
}), v1 = /* @__PURE__ */ y("$ZodObjectJIT", (e, t) => {
  _1.init(e, t);
  const i = e._zod.parse, a = no(() => sf(t)), n = (p) => {
    const m = new z0(["shape", "payload", "ctx"]), h = a.value, w = (R) => {
      const H = ad(R);
      return `shape[${H}]._zod.run({ value: input[${H}], issues: [] }, ctx)`;
    };
    m.write("const input = payload.value;");
    const I = /* @__PURE__ */ Object.create(null);
    let x = 0;
    for (const R of h.keys)
      I[R] = `key_${x++}`;
    m.write("const newResult = {};");
    for (const R of h.keys) {
      const H = I[R], V = ad(R), te = p[R], B = te?._zod?.optin === "optional", me = te?._zod?.optout === "optional";
      m.write(`const ${H} = ${w(R)};`), B && me ? m.write(`
        if (${H}.issues.length) {
          if (${V} in input) {
            payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${V}, ...iss.path] : [${V}]
            })));
          }
        }

        if (${H}.value === undefined) {
          if (${V} in input) {
            newResult[${V}] = undefined;
          }
        } else {
          newResult[${V}] = ${H}.value;
        }

      `) : B ? m.write(`
        if (${H}.issues.length) {
          payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${V}, ...iss.path] : [${V}]
          })));
        }

        if (${H}.value === undefined) {
          if (${V} in input) {
            newResult[${V}] = undefined;
          }
        } else {
          newResult[${V}] = ${H}.value;
        }

      `) : m.write(`
        const ${H}_present = ${V} in input;
        if (${H}.issues.length) {
          payload.issues = payload.issues.concat(${H}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${V}, ...iss.path] : [${V}]
          })));
        }
        if (!${H}_present && !${H}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${V}]
          });
        }

        if (${H}_present) {
          if (${H}.value === undefined) {
            newResult[${V}] = undefined;
          } else {
            newResult[${V}] = ${H}.value;
          }
        }

      `);
    }
    m.write("payload.value = newResult;"), m.write("return payload;");
    const L = m.compile();
    return (R, H) => L(p, R, H);
  };
  let o;
  const s = Na, r = !Ms.jitless, d = r && D_.value, u = t.catchall;
  let l;
  e._zod.parse = (p, m) => {
    l ?? (l = a.value);
    const h = p.value;
    return s(h) ? r && d && m?.async === !1 && m.jitless !== !0 ? (o || (o = n(t.shape)), p = o(p, m), u ? rf([], h, p, m, l, e) : p) : i(p, m) : (p.issues.push({
      expected: "object",
      code: "invalid_type",
      input: h,
      inst: e
    }), p);
  };
});
function sd(e, t, i, a) {
  for (const o of e)
    if (o.issues.length === 0)
      return t.value = o.value, t;
  const n = e.filter((o) => !Ui(o));
  return n.length === 1 ? (t.value = n[0].value, n[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: i,
    errors: e.map((o) => o.issues.map((s) => Ht(s, a, Zt())))
  }), t);
}
const cf = /* @__PURE__ */ y("$ZodUnion", (e, t) => {
  Ee.init(e, t), he(e._zod, "optin", () => t.options.some((a) => a._zod.optin === "optional") ? "optional" : void 0), he(e._zod, "optout", () => t.options.some((a) => a._zod.optout === "optional") ? "optional" : void 0), he(e._zod, "values", () => {
    if (t.options.every((a) => a._zod.values))
      return new Set(t.options.flatMap((a) => Array.from(a._zod.values)));
  }), he(e._zod, "pattern", () => {
    if (t.options.every((a) => a._zod.pattern)) {
      const a = t.options.map((n) => n._zod.pattern);
      return new RegExp(`^(${a.map((n) => Zs(n.source)).join("|")})$`);
    }
  });
  const i = t.options.length === 1 ? t.options[0]._zod.run : null;
  e._zod.parse = (a, n) => {
    if (i)
      return i(a, n);
    let o = !1;
    const s = [];
    for (const r of t.options) {
      const c = r._zod.run({
        value: a.value,
        issues: []
      }, n);
      if (c instanceof Promise)
        s.push(c), o = !0;
      else {
        if (c.issues.length === 0)
          return c;
        s.push(c);
      }
    }
    return o ? Promise.all(s).then((r) => sd(r, a, e, n)) : sd(s, a, e, n);
  };
}), y1 = /* @__PURE__ */ y("$ZodDiscriminatedUnion", (e, t) => {
  t.inclusive = !1, cf.init(e, t);
  const i = e._zod.parse;
  he(e._zod, "propValues", () => {
    const n = {};
    for (const o of t.options) {
      const s = o._zod.propValues;
      if (!s || Object.keys(s).length === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(o)}"`);
      for (const [r, c] of Object.entries(s)) {
        n[r] || (n[r] = /* @__PURE__ */ new Set());
        for (const d of c)
          n[r].add(d);
      }
    }
    return n;
  });
  const a = no(() => {
    const n = t.options, o = /* @__PURE__ */ new Map();
    for (const s of n) {
      const r = s._zod.propValues?.[t.discriminator];
      if (!r || r.size === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(s)}"`);
      for (const c of r) {
        if (o.has(c))
          throw new Error(`Duplicate discriminator value "${String(c)}"`);
        o.set(c, s);
      }
    }
    return o;
  });
  e._zod.parse = (n, o) => {
    const s = n.value;
    if (!Na(s))
      return n.issues.push({
        code: "invalid_type",
        expected: "object",
        input: s,
        inst: e
      }), n;
    const r = a.value.get(s?.[t.discriminator]);
    return r ? r._zod.run(n, o) : t.unionFallback || o.direction === "backward" ? i(n, o) : (n.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: t.discriminator,
      options: Array.from(a.value.keys()),
      input: s,
      path: [t.discriminator],
      inst: e
    }), n);
  };
}), k1 = /* @__PURE__ */ y("$ZodIntersection", (e, t) => {
  Ee.init(e, t), e._zod.parse = (i, a) => {
    const n = i.value, o = t.left._zod.run({ value: n, issues: [] }, a), s = t.right._zod.run({ value: n, issues: [] }, a);
    return o instanceof Promise || s instanceof Promise ? Promise.all([o, s]).then(([c, d]) => rd(i, c, d)) : rd(i, o, s);
  };
});
function ss(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (Ji(e) && Ji(t)) {
    const i = Object.keys(t), a = Object.keys(e).filter((o) => i.indexOf(o) !== -1), n = { ...e, ...t };
    for (const o of a) {
      const s = ss(e[o], t[o]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [o, ...s.mergeErrorPath]
        };
      n[o] = s.data;
    }
    return { valid: !0, data: n };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const n = e[a], o = t[a], s = ss(n, o);
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
  const o = [...a].filter(([, r]) => r.l && r.r).map(([r]) => r);
  if (o.length && n && e.issues.push({ ...n, keys: o }), Ui(e))
    return e;
  const s = ss(t.value, i.value);
  if (!s.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);
  return e.value = s.data, e;
}
const w1 = /* @__PURE__ */ y("$ZodRecord", (e, t) => {
  Ee.init(e, t), e._zod.parse = (i, a) => {
    const n = i.value;
    if (!Ji(n))
      return i.issues.push({
        expected: "record",
        code: "invalid_type",
        input: n,
        inst: e
      }), i;
    const o = [], s = t.keyType._zod.values;
    if (s) {
      i.value = {};
      const r = /* @__PURE__ */ new Set();
      for (const d of s)
        if (typeof d == "string" || typeof d == "number" || typeof d == "symbol") {
          r.add(typeof d == "number" ? d.toString() : d);
          const u = t.keyType._zod.run({ value: d, issues: [] }, a);
          if (u instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          if (u.issues.length) {
            i.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: u.issues.map((m) => Ht(m, a, Zt())),
              input: d,
              path: [d],
              inst: e
            });
            continue;
          }
          const l = u.value, p = t.valueType._zod.run({ value: n[d], issues: [] }, a);
          p instanceof Promise ? o.push(p.then((m) => {
            m.issues.length && i.issues.push(...Fi(d, m.issues)), i.value[l] = m.value;
          })) : (p.issues.length && i.issues.push(...Fi(d, p.issues)), i.value[l] = p.value);
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
          const l = t.keyType._zod.run({ value: Number(r), issues: [] }, a);
          if (l instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          l.issues.length === 0 && (c = l);
        }
        if (c.issues.length) {
          t.mode === "loose" ? i.value[r] = n[r] : i.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((l) => Ht(l, a, Zt())),
            input: r,
            path: [r],
            inst: e
          });
          continue;
        }
        const u = t.valueType._zod.run({ value: n[r], issues: [] }, a);
        u instanceof Promise ? o.push(u.then((l) => {
          l.issues.length && i.issues.push(...Fi(r, l.issues)), i.value[c.value] = l.value;
        })) : (u.issues.length && i.issues.push(...Fi(r, u.issues)), i.value[c.value] = u.value);
      }
    }
    return o.length ? Promise.all(o).then(() => i) : i;
  };
}), I1 = /* @__PURE__ */ y("$ZodEnum", (e, t) => {
  Ee.init(e, t);
  const i = Zl(t.entries), a = new Set(i);
  e._zod.values = a, e._zod.pattern = new RegExp(`^(${i.filter((n) => V_.has(typeof n)).map((n) => typeof n == "string" ? Yi(n) : n.toString()).join("|")})$`), e._zod.parse = (n, o) => {
    const s = n.value;
    return a.has(s) || n.issues.push({
      code: "invalid_value",
      values: i,
      input: s,
      inst: e
    }), n;
  };
}), E1 = /* @__PURE__ */ y("$ZodLiteral", (e, t) => {
  if (Ee.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const i = new Set(t.values);
  e._zod.values = i, e._zod.pattern = new RegExp(`^(${t.values.map((a) => typeof a == "string" ? Yi(a) : a ? Yi(a.toString()) : String(a)).join("|")})$`), e._zod.parse = (a, n) => {
    const o = a.value;
    return i.has(o) || a.issues.push({
      code: "invalid_value",
      values: t.values,
      input: o,
      inst: e
    }), a;
  };
}), A1 = /* @__PURE__ */ y("$ZodTransform", (e, t) => {
  Ee.init(e, t), e._zod.optin = "optional", e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new Bl(e.constructor.name);
    const n = t.transform(i.value, i);
    if (a.async)
      return (n instanceof Promise ? n : Promise.resolve(n)).then((s) => (i.value = s, i.fallback = !0, i));
    if (n instanceof Promise)
      throw new Zi();
    return i.value = n, i.fallback = !0, i;
  };
});
function cd(e, t) {
  return t === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
const df = /* @__PURE__ */ y("$ZodOptional", (e, t) => {
  Ee.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", he(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), he(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${Zs(i.source)})?$`) : void 0;
  }), e._zod.parse = (i, a) => {
    if (t.innerType._zod.optin === "optional") {
      const n = i.value, o = t.innerType._zod.run(i, a);
      return o instanceof Promise ? o.then((s) => cd(s, n)) : cd(o, n);
    }
    return i.value === void 0 ? i : t.innerType._zod.run(i, a);
  };
}), T1 = /* @__PURE__ */ y("$ZodExactOptional", (e, t) => {
  df.init(e, t), he(e._zod, "values", () => t.innerType._zod.values), he(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (i, a) => t.innerType._zod.run(i, a);
}), x1 = /* @__PURE__ */ y("$ZodNullable", (e, t) => {
  Ee.init(e, t), he(e._zod, "optin", () => t.innerType._zod.optin), he(e._zod, "optout", () => t.innerType._zod.optout), he(e._zod, "pattern", () => {
    const i = t.innerType._zod.pattern;
    return i ? new RegExp(`^(${Zs(i.source)}|null)$`) : void 0;
  }), he(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (i, a) => i.value === null ? i : t.innerType._zod.run(i, a);
}), S1 = /* @__PURE__ */ y("$ZodDefault", (e, t) => {
  Ee.init(e, t), e._zod.optin = "optional", he(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    if (i.value === void 0)
      return i.value = t.defaultValue, i;
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then((o) => dd(o, t)) : dd(n, t);
  };
});
function dd(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const O1 = /* @__PURE__ */ y("$ZodPrefault", (e, t) => {
  Ee.init(e, t), e._zod.optin = "optional", he(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => (a.direction === "backward" || i.value === void 0 && (i.value = t.defaultValue), t.innerType._zod.run(i, a));
}), C1 = /* @__PURE__ */ y("$ZodNonOptional", (e, t) => {
  Ee.init(e, t), he(e._zod, "values", () => {
    const i = t.innerType._zod.values;
    return i ? new Set([...i].filter((a) => a !== void 0)) : void 0;
  }), e._zod.parse = (i, a) => {
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then((o) => ud(o, e)) : ud(n, e);
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
const N1 = /* @__PURE__ */ y("$ZodCatch", (e, t) => {
  Ee.init(e, t), e._zod.optin = "optional", he(e._zod, "optout", () => t.innerType._zod.optout), he(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then((o) => (i.value = o.value, o.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: o.issues.map((s) => Ht(s, a, Zt()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i)) : (i.value = n.value, n.issues.length && (i.value = t.catchValue({
      ...i,
      error: {
        issues: n.issues.map((o) => Ht(o, a, Zt()))
      },
      input: i.value
    }), i.issues = [], i.fallback = !0), i);
  };
}), D1 = /* @__PURE__ */ y("$ZodPipe", (e, t) => {
  Ee.init(e, t), he(e._zod, "values", () => t.in._zod.values), he(e._zod, "optin", () => t.in._zod.optin), he(e._zod, "optout", () => t.out._zod.optout), he(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (i, a) => {
    if (a.direction === "backward") {
      const o = t.out._zod.run(i, a);
      return o instanceof Promise ? o.then((s) => Qa(s, t.in, a)) : Qa(o, t.in, a);
    }
    const n = t.in._zod.run(i, a);
    return n instanceof Promise ? n.then((o) => Qa(o, t.out, a)) : Qa(n, t.out, a);
  };
});
function Qa(e, t, i) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, i);
}
const V1 = /* @__PURE__ */ y("$ZodReadonly", (e, t) => {
  Ee.init(e, t), he(e._zod, "propValues", () => t.innerType._zod.propValues), he(e._zod, "values", () => t.innerType._zod.values), he(e._zod, "optin", () => t.innerType?._zod?.optin), he(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      return t.innerType._zod.run(i, a);
    const n = t.innerType._zod.run(i, a);
    return n instanceof Promise ? n.then(ld) : ld(n);
  };
});
function ld(e) {
  return e.value = Object.freeze(e.value), e;
}
const j1 = /* @__PURE__ */ y("$ZodCustom", (e, t) => {
  at.init(e, t), Ee.init(e, t), e._zod.parse = (i, a) => i, e._zod.check = (i) => {
    const a = i.value, n = t.fn(a);
    if (n instanceof Promise)
      return n.then((o) => fd(o, i, a, e));
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
    a._zod.def.params && (n.params = a._zod.def.params), t.issues.push(Da(n));
  }
}
var pd;
class P1 {
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
function R1() {
  return new P1();
}
(pd = globalThis).__zod_globalRegistry ?? (pd.__zod_globalRegistry = R1());
const la = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function $1(e, t) {
  return new e({
    type: "string",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function U1(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function md(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function F1(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function z1(e, t) {
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
function L1(e, t) {
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
function M1(e, t) {
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
function B1(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Z1(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function H1(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function K1(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function q1(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function W1(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function G1(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function J1(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Y1(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function X1(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Q1(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function e2(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function t2(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function i2(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function a2(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function n2(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function o2(e, t) {
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
function s2(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function r2(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function c2(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function d2(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function u2(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function l2(e, t) {
  return new e({
    type: "boolean",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function f2(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function p2(e, t) {
  return new e({
    type: "never",
    ...Z(t)
  });
}
// @__NO_SIDE_EFFECTS__
function gd(e, t) {
  return new tf({
    check: "less_than",
    ...Z(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function xo(e, t) {
  return new tf({
    check: "less_than",
    ...Z(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function hd(e, t) {
  return new af({
    check: "greater_than",
    ...Z(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function So(e, t) {
  return new af({
    check: "greater_than",
    ...Z(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function bd(e, t) {
  return new S0({
    check: "multiple_of",
    ...Z(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function uf(e, t) {
  return new C0({
    check: "max_length",
    ...Z(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Rn(e, t) {
  return new N0({
    check: "min_length",
    ...Z(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function lf(e, t) {
  return new D0({
    check: "length_equals",
    ...Z(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function m2(e, t) {
  return new V0({
    check: "string_format",
    format: "regex",
    ...Z(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function g2(e) {
  return new j0({
    check: "string_format",
    format: "lowercase",
    ...Z(e)
  });
}
// @__NO_SIDE_EFFECTS__
function h2(e) {
  return new P0({
    check: "string_format",
    format: "uppercase",
    ...Z(e)
  });
}
// @__NO_SIDE_EFFECTS__
function b2(e, t) {
  return new R0({
    check: "string_format",
    format: "includes",
    ...Z(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function _2(e, t) {
  return new $0({
    check: "string_format",
    format: "starts_with",
    ...Z(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function v2(e, t) {
  return new U0({
    check: "string_format",
    format: "ends_with",
    ...Z(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function ta(e) {
  return new F0({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function y2(e) {
  return /* @__PURE__ */ ta((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function k2() {
  return /* @__PURE__ */ ta((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function w2() {
  return /* @__PURE__ */ ta((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function I2() {
  return /* @__PURE__ */ ta((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function E2() {
  return /* @__PURE__ */ ta((e) => N_(e));
}
// @__NO_SIDE_EFFECTS__
function A2(e, t, i) {
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
function T2(e, t, i) {
  const a = Z(i);
  return a.abort ?? (a.abort = !0), new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...a
  });
}
// @__NO_SIDE_EFFECTS__
function x2(e, t, i) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...Z(i)
  });
}
// @__NO_SIDE_EFFECTS__
function S2(e, t) {
  const i = /* @__PURE__ */ O2((a) => (a.addIssue = (n) => {
    if (typeof n == "string")
      a.issues.push(Da(n, a.value, i._zod.def));
    else {
      const o = n;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = a.value), o.inst ?? (o.inst = i), o.continue ?? (o.continue = !i._zod.def.abort), a.issues.push(Da(o));
    }
  }, e(a.value, a)), t);
  return i;
}
// @__NO_SIDE_EFFECTS__
function O2(e, t) {
  const i = new at({
    check: "custom",
    ...Z(t)
  });
  return i._zod.check = e, i;
}
function ff(e) {
  let t = e?.target ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: e?.metadata ?? la,
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
function De(e, t, i = { path: [], schemaPath: [] }) {
  var a;
  const n = e._zod.def, o = t.seen.get(e);
  if (o)
    return o.count++, i.schemaPath.includes(e) && (o.cycle = i.path), o.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: i.path };
  t.seen.set(e, s);
  const r = e._zod.toJSONSchema?.();
  if (r)
    s.schema = r;
  else {
    const u = {
      ...i,
      schemaPath: [...i.schemaPath, e],
      path: i.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, s.schema, u);
    else {
      const p = s.schema, m = t.processors[n.type];
      if (!m)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${n.type}`);
      m(e, t, p, u);
    }
    const l = e._zod.parent;
    l && (s.ref || (s.ref = l), De(l, t, u), t.seen.get(l).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(s.schema, c), t.io === "input" && Je(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && "_prefault" in s.schema && ((a = s.schema).default ?? (a.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function pf(e, t) {
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
  const n = (s) => {
    const r = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const l = e.external.registry.get(s[0])?.id, p = e.external.uri ?? ((h) => h);
      if (l)
        return { ref: p(l) };
      const m = s[1].defId ?? s[1].schema.id ?? `schema${e.counter++}`;
      return s[1].defId = m, { defId: m, ref: `${p("__shared")}#/${r}/${m}` };
    }
    if (s[1] === i)
      return { ref: "#" };
    const d = `#/${r}/`, u = s[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: u, ref: d + u };
  }, o = (s) => {
    if (s[1].schema.$ref)
      return;
    const r = s[1], { ref: c, defId: d } = n(s);
    r.def = { ...r.schema }, d && (r.defId = d);
    const u = r.schema;
    for (const l in u)
      delete u[l];
    u.$ref = c;
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
      o(s);
      continue;
    }
    if (e.external) {
      const d = e.external.registry.get(s[0])?.id;
      if (t !== s[0] && d) {
        o(s);
        continue;
      }
    }
    if (e.metadataRegistry.get(s[0])?.id) {
      o(s);
      continue;
    }
    if (r.cycle) {
      o(s);
      continue;
    }
    if (r.count > 1 && e.reused === "ref") {
      o(s);
      continue;
    }
  }
}
function mf(e, t) {
  const i = e.seen.get(t);
  if (!i)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const a = (r) => {
    const c = e.seen.get(r);
    if (c.ref === null)
      return;
    const d = c.def ?? c.schema, u = { ...d }, l = c.ref;
    if (c.ref = null, l) {
      a(l);
      const m = e.seen.get(l), h = m.schema;
      if (h.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (d.allOf = d.allOf ?? [], d.allOf.push(h)) : Object.assign(d, h), Object.assign(d, u), r._zod.parent === l)
        for (const I in d)
          I === "$ref" || I === "allOf" || I in u || delete d[I];
      if (h.$ref && m.def)
        for (const I in d)
          I === "$ref" || I === "allOf" || I in m.def && JSON.stringify(d[I]) === JSON.stringify(m.def[I]) && delete d[I];
    }
    const p = r._zod.parent;
    if (p && p !== l) {
      a(p);
      const m = e.seen.get(p);
      if (m?.schema.$ref && (d.$ref = m.schema.$ref, m.def))
        for (const h in d)
          h === "$ref" || h === "allOf" || h in m.def && JSON.stringify(d[h]) === JSON.stringify(m.def[h]) && delete d[h];
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
  const o = e.metadataRegistry.get(t)?.id;
  o !== void 0 && n.id === o && delete n.id;
  const s = e.external?.defs ?? {};
  for (const r of e.seen.entries()) {
    const c = r[1];
    c.def && c.defId && (c.def.id === c.defId && delete c.def.id, s[c.defId] = c.def);
  }
  e.external || Object.keys(s).length > 0 && (e.target === "draft-2020-12" ? n.$defs = s : n.definitions = s);
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
function Je(e, t) {
  const i = t ?? { seen: /* @__PURE__ */ new Set() };
  if (i.seen.has(e))
    return !1;
  i.seen.add(e);
  const a = e._zod.def;
  if (a.type === "transform")
    return !0;
  if (a.type === "array")
    return Je(a.element, i);
  if (a.type === "set")
    return Je(a.valueType, i);
  if (a.type === "lazy")
    return Je(a.getter(), i);
  if (a.type === "promise" || a.type === "optional" || a.type === "nonoptional" || a.type === "nullable" || a.type === "readonly" || a.type === "default" || a.type === "prefault")
    return Je(a.innerType, i);
  if (a.type === "intersection")
    return Je(a.left, i) || Je(a.right, i);
  if (a.type === "record" || a.type === "map")
    return Je(a.keyType, i) || Je(a.valueType, i);
  if (a.type === "pipe")
    return e._zod.traits.has("$ZodCodec") ? !0 : Je(a.in, i) || Je(a.out, i);
  if (a.type === "object") {
    for (const n in a.shape)
      if (Je(a.shape[n], i))
        return !0;
    return !1;
  }
  if (a.type === "union") {
    for (const n of a.options)
      if (Je(n, i))
        return !0;
    return !1;
  }
  if (a.type === "tuple") {
    for (const n of a.items)
      if (Je(n, i))
        return !0;
    return !!(a.rest && Je(a.rest, i));
  }
  return !1;
}
const C2 = (e, t = {}) => (i) => {
  const a = ff({ ...i, processors: t });
  return De(e, a), pf(a, e), mf(a, e);
}, $n = (e, t, i = {}) => (a) => {
  const { libraryOptions: n, target: o } = a ?? {}, s = ff({ ...n ?? {}, target: o, io: t, processors: i });
  return De(e, s), pf(s, e), mf(s, e);
}, N2 = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, D2 = (e, t, i, a) => {
  const n = i;
  n.type = "string";
  const { minimum: o, maximum: s, format: r, patterns: c, contentEncoding: d } = e._zod.bag;
  if (typeof o == "number" && (n.minLength = o), typeof s == "number" && (n.maxLength = s), r && (n.format = N2[r] ?? r, n.format === "" && delete n.format, r === "time" && delete n.format), d && (n.contentEncoding = d), c && c.size > 0) {
    const u = [...c];
    u.length === 1 ? n.pattern = u[0].source : u.length > 1 && (n.allOf = [
      ...u.map((l) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: l.source
      }))
    ]);
  }
}, V2 = (e, t, i, a) => {
  const n = i, { minimum: o, maximum: s, format: r, multipleOf: c, exclusiveMaximum: d, exclusiveMinimum: u } = e._zod.bag;
  typeof r == "string" && r.includes("int") ? n.type = "integer" : n.type = "number";
  const l = typeof u == "number" && u >= (o ?? Number.NEGATIVE_INFINITY), p = typeof d == "number" && d <= (s ?? Number.POSITIVE_INFINITY), m = t.target === "draft-04" || t.target === "openapi-3.0";
  l ? m ? (n.minimum = u, n.exclusiveMinimum = !0) : n.exclusiveMinimum = u : typeof o == "number" && (n.minimum = o), p ? m ? (n.maximum = d, n.exclusiveMaximum = !0) : n.exclusiveMaximum = d : typeof s == "number" && (n.maximum = s), typeof c == "number" && (n.multipleOf = c);
}, j2 = (e, t, i, a) => {
  i.type = "boolean";
}, P2 = (e, t, i, a) => {
  i.not = {};
}, R2 = (e, t, i, a) => {
}, $2 = (e, t, i, a) => {
  const n = e._zod.def, o = Zl(n.entries);
  o.every((s) => typeof s == "number") && (i.type = "number"), o.every((s) => typeof s == "string") && (i.type = "string"), i.enum = o;
}, U2 = (e, t, i, a) => {
  const n = e._zod.def, o = [];
  for (const s of n.values)
    if (s === void 0) {
      if (t.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof s == "bigint") {
      if (t.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      o.push(Number(s));
    } else
      o.push(s);
  if (o.length !== 0) if (o.length === 1) {
    const s = o[0];
    i.type = s === null ? "null" : typeof s, t.target === "draft-04" || t.target === "openapi-3.0" ? i.enum = [s] : i.const = s;
  } else
    o.every((s) => typeof s == "number") && (i.type = "number"), o.every((s) => typeof s == "string") && (i.type = "string"), o.every((s) => typeof s == "boolean") && (i.type = "boolean"), o.every((s) => s === null) && (i.type = "null"), i.enum = o;
}, F2 = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, z2 = (e, t, i, a) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, L2 = (e, t, i, a) => {
  const n = i, o = e._zod.def, { minimum: s, maximum: r } = e._zod.bag;
  typeof s == "number" && (n.minItems = s), typeof r == "number" && (n.maxItems = r), n.type = "array", n.items = De(o.element, t, {
    ...a,
    path: [...a.path, "items"]
  });
}, M2 = (e, t, i, a) => {
  const n = i, o = e._zod.def;
  n.type = "object", n.properties = {};
  const s = o.shape;
  for (const d in s)
    n.properties[d] = De(s[d], t, {
      ...a,
      path: [...a.path, "properties", d]
    });
  const r = new Set(Object.keys(s)), c = new Set([...r].filter((d) => {
    const u = o.shape[d]._zod;
    return t.io === "input" ? u.optin === void 0 : u.optout === void 0;
  }));
  c.size > 0 && (n.required = Array.from(c)), o.catchall?._zod.def.type === "never" ? n.additionalProperties = !1 : o.catchall ? o.catchall && (n.additionalProperties = De(o.catchall, t, {
    ...a,
    path: [...a.path, "additionalProperties"]
  })) : t.io === "output" && (n.additionalProperties = !1);
}, B2 = (e, t, i, a) => {
  const n = e._zod.def, o = n.inclusive === !1, s = n.options.map((r, c) => De(r, t, {
    ...a,
    path: [...a.path, o ? "oneOf" : "anyOf", c]
  }));
  o ? i.oneOf = s : i.anyOf = s;
}, Z2 = (e, t, i, a) => {
  const n = e._zod.def, o = De(n.left, t, {
    ...a,
    path: [...a.path, "allOf", 0]
  }), s = De(n.right, t, {
    ...a,
    path: [...a.path, "allOf", 1]
  }), r = (d) => "allOf" in d && Object.keys(d).length === 1, c = [
    ...r(o) ? o.allOf : [o],
    ...r(s) ? s.allOf : [s]
  ];
  i.allOf = c;
}, H2 = (e, t, i, a) => {
  const n = i, o = e._zod.def;
  n.type = "object";
  const s = o.keyType, c = s._zod.bag?.patterns;
  if (o.mode === "loose" && c && c.size > 0) {
    const u = De(o.valueType, t, {
      ...a,
      path: [...a.path, "patternProperties", "*"]
    });
    n.patternProperties = {};
    for (const l of c)
      n.patternProperties[l.source] = u;
  } else
    (t.target === "draft-07" || t.target === "draft-2020-12") && (n.propertyNames = De(o.keyType, t, {
      ...a,
      path: [...a.path, "propertyNames"]
    })), n.additionalProperties = De(o.valueType, t, {
      ...a,
      path: [...a.path, "additionalProperties"]
    });
  const d = s._zod.values;
  if (d) {
    const u = [...d].filter((l) => typeof l == "string" || typeof l == "number");
    u.length > 0 && (n.required = u);
  }
}, K2 = (e, t, i, a) => {
  const n = e._zod.def, o = De(n.innerType, t, a), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = n.innerType, i.nullable = !0) : i.anyOf = [o, { type: "null" }];
}, q2 = (e, t, i, a) => {
  const n = e._zod.def;
  De(n.innerType, t, a);
  const o = t.seen.get(e);
  o.ref = n.innerType;
}, W2 = (e, t, i, a) => {
  const n = e._zod.def;
  De(n.innerType, t, a);
  const o = t.seen.get(e);
  o.ref = n.innerType, i.default = JSON.parse(JSON.stringify(n.defaultValue));
}, G2 = (e, t, i, a) => {
  const n = e._zod.def;
  De(n.innerType, t, a);
  const o = t.seen.get(e);
  o.ref = n.innerType, t.io === "input" && (i._prefault = JSON.parse(JSON.stringify(n.defaultValue)));
}, J2 = (e, t, i, a) => {
  const n = e._zod.def;
  De(n.innerType, t, a);
  const o = t.seen.get(e);
  o.ref = n.innerType;
  let s;
  try {
    s = n.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  i.default = s;
}, Y2 = (e, t, i, a) => {
  const n = e._zod.def, o = n.in._zod.traits.has("$ZodTransform"), s = t.io === "input" ? o ? n.out : n.in : n.out;
  De(s, t, a);
  const r = t.seen.get(e);
  r.ref = s;
}, X2 = (e, t, i, a) => {
  const n = e._zod.def;
  De(n.innerType, t, a);
  const o = t.seen.get(e);
  o.ref = n.innerType, i.readOnly = !0;
}, gf = (e, t, i, a) => {
  const n = e._zod.def;
  De(n.innerType, t, a);
  const o = t.seen.get(e);
  o.ref = n.innerType;
}, Q2 = /* @__PURE__ */ y("ZodISODateTime", (e, t) => {
  Q0.init(e, t), Te.init(e, t);
});
function ev(e) {
  return /* @__PURE__ */ o2(Q2, e);
}
const tv = /* @__PURE__ */ y("ZodISODate", (e, t) => {
  e1.init(e, t), Te.init(e, t);
});
function iv(e) {
  return /* @__PURE__ */ s2(tv, e);
}
const av = /* @__PURE__ */ y("ZodISOTime", (e, t) => {
  t1.init(e, t), Te.init(e, t);
});
function nv(e) {
  return /* @__PURE__ */ r2(av, e);
}
const ov = /* @__PURE__ */ y("ZodISODuration", (e, t) => {
  i1.init(e, t), Te.init(e, t);
});
function sv(e) {
  return /* @__PURE__ */ c2(ov, e);
}
const rv = (e, t) => {
  Wl.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (i) => H_(e, i)
      // enumerable: false,
    },
    flatten: {
      value: (i) => Z_(e, i)
      // enumerable: false,
    },
    addIssue: {
      value: (i) => {
        e.issues.push(i), e.message = JSON.stringify(e.issues, os, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (i) => {
        e.issues.push(...i), e.message = JSON.stringify(e.issues, os, 2);
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
}, pt = /* @__PURE__ */ y("ZodError", rv, {
  Parent: Error
}), cv = /* @__PURE__ */ Ks(pt), dv = /* @__PURE__ */ qs(pt), uv = /* @__PURE__ */ oo(pt), lv = /* @__PURE__ */ so(pt), fv = /* @__PURE__ */ W_(pt), pv = /* @__PURE__ */ G_(pt), mv = /* @__PURE__ */ J_(pt), gv = /* @__PURE__ */ Y_(pt), hv = /* @__PURE__ */ X_(pt), bv = /* @__PURE__ */ Q_(pt), _v = /* @__PURE__ */ e0(pt), vv = /* @__PURE__ */ t0(pt), _d = /* @__PURE__ */ new WeakMap();
function Ba(e, t, i) {
  const a = Object.getPrototypeOf(e);
  let n = _d.get(a);
  if (n || (n = /* @__PURE__ */ new Set(), _d.set(a, n)), !n.has(t)) {
    n.add(t);
    for (const o in i) {
      const s = i[o];
      Object.defineProperty(a, o, {
        configurable: !0,
        enumerable: !1,
        get() {
          const r = s.bind(this);
          return Object.defineProperty(this, o, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: r
          }), r;
        },
        set(r) {
          Object.defineProperty(this, o, {
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
const Ae = /* @__PURE__ */ y("ZodType", (e, t) => (Ee.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: $n(e, "input"),
    output: $n(e, "output")
  }
}), e.toJSONSchema = C2(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.parse = (i, a) => cv(e, i, a, { callee: e.parse }), e.safeParse = (i, a) => uv(e, i, a), e.parseAsync = async (i, a) => dv(e, i, a, { callee: e.parseAsync }), e.safeParseAsync = async (i, a) => lv(e, i, a), e.spa = e.safeParseAsync, e.encode = (i, a) => fv(e, i, a), e.decode = (i, a) => pv(e, i, a), e.encodeAsync = async (i, a) => mv(e, i, a), e.decodeAsync = async (i, a) => gv(e, i, a), e.safeEncode = (i, a) => hv(e, i, a), e.safeDecode = (i, a) => bv(e, i, a), e.safeEncodeAsync = async (i, a) => _v(e, i, a), e.safeDecodeAsync = async (i, a) => vv(e, i, a), Ba(e, "ZodType", {
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
    return this.check(p6(i, a));
  },
  superRefine(i, a) {
    return this.check(m6(i, a));
  },
  overwrite(i) {
    return this.check(/* @__PURE__ */ ta(i));
  },
  optional() {
    return Id(this);
  },
  exactOptional() {
    return e6(this);
  },
  nullable() {
    return Ed(this);
  },
  nullish() {
    return Id(Ed(this));
  },
  nonoptional(i) {
    return s6(this, i);
  },
  array() {
    return pe(this);
  },
  or(i) {
    return Hv([this, i]);
  },
  and(i) {
    return Wv(this, i);
  },
  transform(i) {
    return Ad(this, Xv(i));
  },
  default(i) {
    return a6(this, i);
  },
  prefault(i) {
    return o6(this, i);
  },
  catch(i) {
    return c6(this, i);
  },
  pipe(i) {
    return Ad(this, i);
  },
  readonly() {
    return l6(this);
  },
  describe(i) {
    const a = this.clone();
    return la.add(a, { description: i }), a;
  },
  meta(...i) {
    if (i.length === 0)
      return la.get(this);
    const a = this.clone();
    return la.add(a, i[0]), a;
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
    return la.get(e)?.description;
  },
  configurable: !0
}), e)), hf = /* @__PURE__ */ y("_ZodString", (e, t) => {
  Ws.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (a, n, o) => D2(e, a, n);
  const i = e._zod.bag;
  e.format = i.format ?? null, e.minLength = i.minimum ?? null, e.maxLength = i.maximum ?? null, Ba(e, "_ZodString", {
    regex(...a) {
      return this.check(/* @__PURE__ */ m2(...a));
    },
    includes(...a) {
      return this.check(/* @__PURE__ */ b2(...a));
    },
    startsWith(...a) {
      return this.check(/* @__PURE__ */ _2(...a));
    },
    endsWith(...a) {
      return this.check(/* @__PURE__ */ v2(...a));
    },
    min(...a) {
      return this.check(/* @__PURE__ */ Rn(...a));
    },
    max(...a) {
      return this.check(/* @__PURE__ */ uf(...a));
    },
    length(...a) {
      return this.check(/* @__PURE__ */ lf(...a));
    },
    nonempty(...a) {
      return this.check(/* @__PURE__ */ Rn(1, ...a));
    },
    lowercase(a) {
      return this.check(/* @__PURE__ */ g2(a));
    },
    uppercase(a) {
      return this.check(/* @__PURE__ */ h2(a));
    },
    trim() {
      return this.check(/* @__PURE__ */ k2());
    },
    normalize(...a) {
      return this.check(/* @__PURE__ */ y2(...a));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ w2());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ I2());
    },
    slugify() {
      return this.check(/* @__PURE__ */ E2());
    }
  });
}), yv = /* @__PURE__ */ y("ZodString", (e, t) => {
  Ws.init(e, t), hf.init(e, t), e.email = (i) => e.check(/* @__PURE__ */ U1(kv, i)), e.url = (i) => e.check(/* @__PURE__ */ B1(wv, i)), e.jwt = (i) => e.check(/* @__PURE__ */ n2($v, i)), e.emoji = (i) => e.check(/* @__PURE__ */ Z1(Iv, i)), e.guid = (i) => e.check(/* @__PURE__ */ md(vd, i)), e.uuid = (i) => e.check(/* @__PURE__ */ F1(en, i)), e.uuidv4 = (i) => e.check(/* @__PURE__ */ z1(en, i)), e.uuidv6 = (i) => e.check(/* @__PURE__ */ L1(en, i)), e.uuidv7 = (i) => e.check(/* @__PURE__ */ M1(en, i)), e.nanoid = (i) => e.check(/* @__PURE__ */ H1(Ev, i)), e.guid = (i) => e.check(/* @__PURE__ */ md(vd, i)), e.cuid = (i) => e.check(/* @__PURE__ */ K1(Av, i)), e.cuid2 = (i) => e.check(/* @__PURE__ */ q1(Tv, i)), e.ulid = (i) => e.check(/* @__PURE__ */ W1(xv, i)), e.base64 = (i) => e.check(/* @__PURE__ */ t2(jv, i)), e.base64url = (i) => e.check(/* @__PURE__ */ i2(Pv, i)), e.xid = (i) => e.check(/* @__PURE__ */ G1(Sv, i)), e.ksuid = (i) => e.check(/* @__PURE__ */ J1(Ov, i)), e.ipv4 = (i) => e.check(/* @__PURE__ */ Y1(Cv, i)), e.ipv6 = (i) => e.check(/* @__PURE__ */ X1(Nv, i)), e.cidrv4 = (i) => e.check(/* @__PURE__ */ Q1(Dv, i)), e.cidrv6 = (i) => e.check(/* @__PURE__ */ e2(Vv, i)), e.e164 = (i) => e.check(/* @__PURE__ */ a2(Rv, i)), e.datetime = (i) => e.check(ev(i)), e.date = (i) => e.check(iv(i)), e.time = (i) => e.check(nv(i)), e.duration = (i) => e.check(sv(i));
});
function T(e) {
  return /* @__PURE__ */ $1(yv, e);
}
const Te = /* @__PURE__ */ y("ZodStringFormat", (e, t) => {
  Ie.init(e, t), hf.init(e, t);
}), kv = /* @__PURE__ */ y("ZodEmail", (e, t) => {
  Z0.init(e, t), Te.init(e, t);
}), vd = /* @__PURE__ */ y("ZodGUID", (e, t) => {
  M0.init(e, t), Te.init(e, t);
}), en = /* @__PURE__ */ y("ZodUUID", (e, t) => {
  B0.init(e, t), Te.init(e, t);
}), wv = /* @__PURE__ */ y("ZodURL", (e, t) => {
  H0.init(e, t), Te.init(e, t);
}), Iv = /* @__PURE__ */ y("ZodEmoji", (e, t) => {
  K0.init(e, t), Te.init(e, t);
}), Ev = /* @__PURE__ */ y("ZodNanoID", (e, t) => {
  q0.init(e, t), Te.init(e, t);
}), Av = /* @__PURE__ */ y("ZodCUID", (e, t) => {
  W0.init(e, t), Te.init(e, t);
}), Tv = /* @__PURE__ */ y("ZodCUID2", (e, t) => {
  G0.init(e, t), Te.init(e, t);
}), xv = /* @__PURE__ */ y("ZodULID", (e, t) => {
  J0.init(e, t), Te.init(e, t);
}), Sv = /* @__PURE__ */ y("ZodXID", (e, t) => {
  Y0.init(e, t), Te.init(e, t);
}), Ov = /* @__PURE__ */ y("ZodKSUID", (e, t) => {
  X0.init(e, t), Te.init(e, t);
}), Cv = /* @__PURE__ */ y("ZodIPv4", (e, t) => {
  a1.init(e, t), Te.init(e, t);
}), Nv = /* @__PURE__ */ y("ZodIPv6", (e, t) => {
  n1.init(e, t), Te.init(e, t);
}), Dv = /* @__PURE__ */ y("ZodCIDRv4", (e, t) => {
  o1.init(e, t), Te.init(e, t);
}), Vv = /* @__PURE__ */ y("ZodCIDRv6", (e, t) => {
  s1.init(e, t), Te.init(e, t);
}), jv = /* @__PURE__ */ y("ZodBase64", (e, t) => {
  r1.init(e, t), Te.init(e, t);
}), Pv = /* @__PURE__ */ y("ZodBase64URL", (e, t) => {
  d1.init(e, t), Te.init(e, t);
}), Rv = /* @__PURE__ */ y("ZodE164", (e, t) => {
  u1.init(e, t), Te.init(e, t);
}), $v = /* @__PURE__ */ y("ZodJWT", (e, t) => {
  f1.init(e, t), Te.init(e, t);
}), bf = /* @__PURE__ */ y("ZodNumber", (e, t) => {
  of.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (a, n, o) => V2(e, a, n), Ba(e, "ZodNumber", {
    gt(a, n) {
      return this.check(/* @__PURE__ */ hd(a, n));
    },
    gte(a, n) {
      return this.check(/* @__PURE__ */ So(a, n));
    },
    min(a, n) {
      return this.check(/* @__PURE__ */ So(a, n));
    },
    lt(a, n) {
      return this.check(/* @__PURE__ */ gd(a, n));
    },
    lte(a, n) {
      return this.check(/* @__PURE__ */ xo(a, n));
    },
    max(a, n) {
      return this.check(/* @__PURE__ */ xo(a, n));
    },
    int(a) {
      return this.check(yd(a));
    },
    safe(a) {
      return this.check(yd(a));
    },
    positive(a) {
      return this.check(/* @__PURE__ */ hd(0, a));
    },
    nonnegative(a) {
      return this.check(/* @__PURE__ */ So(0, a));
    },
    negative(a) {
      return this.check(/* @__PURE__ */ gd(0, a));
    },
    nonpositive(a) {
      return this.check(/* @__PURE__ */ xo(0, a));
    },
    multipleOf(a, n) {
      return this.check(/* @__PURE__ */ bd(a, n));
    },
    step(a, n) {
      return this.check(/* @__PURE__ */ bd(a, n));
    },
    finite() {
      return this;
    }
  });
  const i = e._zod.bag;
  e.minValue = Math.max(i.minimum ?? Number.NEGATIVE_INFINITY, i.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(i.maximum ?? Number.POSITIVE_INFINITY, i.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (i.format ?? "").includes("int") || Number.isSafeInteger(i.multipleOf ?? 0.5), e.isFinite = !0, e.format = i.format ?? null;
});
function ne(e) {
  return /* @__PURE__ */ d2(bf, e);
}
const Uv = /* @__PURE__ */ y("ZodNumberFormat", (e, t) => {
  p1.init(e, t), bf.init(e, t);
});
function yd(e) {
  return /* @__PURE__ */ u2(Uv, e);
}
const Fv = /* @__PURE__ */ y("ZodBoolean", (e, t) => {
  m1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => j2(e, i, a);
});
function co(e) {
  return /* @__PURE__ */ l2(Fv, e);
}
const zv = /* @__PURE__ */ y("ZodUnknown", (e, t) => {
  g1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => R2();
});
function kd() {
  return /* @__PURE__ */ f2(zv);
}
const Lv = /* @__PURE__ */ y("ZodNever", (e, t) => {
  h1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => P2(e, i, a);
});
function Mv(e) {
  return /* @__PURE__ */ p2(Lv, e);
}
const Bv = /* @__PURE__ */ y("ZodArray", (e, t) => {
  b1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => L2(e, i, a, n), e.element = t.element, Ba(e, "ZodArray", {
    min(i, a) {
      return this.check(/* @__PURE__ */ Rn(i, a));
    },
    nonempty(i) {
      return this.check(/* @__PURE__ */ Rn(1, i));
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
function pe(e, t) {
  return /* @__PURE__ */ A2(Bv, e, t);
}
const Zv = /* @__PURE__ */ y("ZodObject", (e, t) => {
  v1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => M2(e, i, a, n), he(e, "shape", () => t.shape), Ba(e, "ZodObject", {
    keyof() {
      return it(Object.keys(this._zod.def.shape));
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
      return this.clone({ ...this._zod.def, catchall: Mv() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: void 0 });
    },
    extend(i) {
      return U_(this, i);
    },
    safeExtend(i) {
      return F_(this, i);
    },
    merge(i) {
      return z_(this, i);
    },
    pick(i) {
      return R_(this, i);
    },
    omit(i) {
      return $_(this, i);
    },
    partial(...i) {
      return L_(yf, this, i[0]);
    },
    required(...i) {
      return M_(kf, this, i[0]);
    }
  });
});
function ee(e, t) {
  const i = {
    type: "object",
    shape: e ?? {},
    ...Z(t)
  };
  return new Zv(i);
}
const _f = /* @__PURE__ */ y("ZodUnion", (e, t) => {
  cf.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => B2(e, i, a, n), e.options = t.options;
});
function Hv(e, t) {
  return new _f({
    type: "union",
    options: e,
    ...Z(t)
  });
}
const Kv = /* @__PURE__ */ y("ZodDiscriminatedUnion", (e, t) => {
  _f.init(e, t), y1.init(e, t);
});
function vf(e, t, i) {
  return new Kv({
    type: "union",
    options: t,
    discriminator: e,
    ...Z(i)
  });
}
const qv = /* @__PURE__ */ y("ZodIntersection", (e, t) => {
  k1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => Z2(e, i, a, n);
});
function Wv(e, t) {
  return new qv({
    type: "intersection",
    left: e,
    right: t
  });
}
const wd = /* @__PURE__ */ y("ZodRecord", (e, t) => {
  w1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => H2(e, i, a, n), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Gv(e, t, i) {
  return !t || !t._zod ? new wd({
    type: "record",
    keyType: T(),
    valueType: e,
    ...Z(t)
  }) : new wd({
    type: "record",
    keyType: e,
    valueType: t,
    ...Z(i)
  });
}
const rs = /* @__PURE__ */ y("ZodEnum", (e, t) => {
  I1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (a, n, o) => $2(e, a, n), e.enum = t.entries, e.options = Object.values(t.entries);
  const i = new Set(Object.keys(t.entries));
  e.extract = (a, n) => {
    const o = {};
    for (const s of a)
      if (i.has(s))
        o[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new rs({
      ...t,
      checks: [],
      ...Z(n),
      entries: o
    });
  }, e.exclude = (a, n) => {
    const o = { ...t.entries };
    for (const s of a)
      if (i.has(s))
        delete o[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new rs({
      ...t,
      checks: [],
      ...Z(n),
      entries: o
    });
  };
});
function it(e, t) {
  const i = Array.isArray(e) ? Object.fromEntries(e.map((a) => [a, a])) : e;
  return new rs({
    type: "enum",
    entries: i,
    ...Z(t)
  });
}
const Jv = /* @__PURE__ */ y("ZodLiteral", (e, t) => {
  E1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => U2(e, i, a), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function ve(e, t) {
  return new Jv({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...Z(t)
  });
}
const Yv = /* @__PURE__ */ y("ZodTransform", (e, t) => {
  A1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => z2(e, i), e._zod.parse = (i, a) => {
    if (a.direction === "backward")
      throw new Bl(e.constructor.name);
    i.addIssue = (o) => {
      if (typeof o == "string")
        i.issues.push(Da(o, i.value, t));
      else {
        const s = o;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = i.value), s.inst ?? (s.inst = e), i.issues.push(Da(s));
      }
    };
    const n = t.transform(i.value, i);
    return n instanceof Promise ? n.then((o) => (i.value = o, i.fallback = !0, i)) : (i.value = n, i.fallback = !0, i);
  };
});
function Xv(e) {
  return new Yv({
    type: "transform",
    transform: e
  });
}
const yf = /* @__PURE__ */ y("ZodOptional", (e, t) => {
  df.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => gf(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function Id(e) {
  return new yf({
    type: "optional",
    innerType: e
  });
}
const Qv = /* @__PURE__ */ y("ZodExactOptional", (e, t) => {
  T1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => gf(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function e6(e) {
  return new Qv({
    type: "optional",
    innerType: e
  });
}
const t6 = /* @__PURE__ */ y("ZodNullable", (e, t) => {
  x1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => K2(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function Ed(e) {
  return new t6({
    type: "nullable",
    innerType: e
  });
}
const i6 = /* @__PURE__ */ y("ZodDefault", (e, t) => {
  S1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => W2(e, i, a, n), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function a6(e, t) {
  return new i6({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Kl(t);
    }
  });
}
const n6 = /* @__PURE__ */ y("ZodPrefault", (e, t) => {
  O1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => G2(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function o6(e, t) {
  return new n6({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Kl(t);
    }
  });
}
const kf = /* @__PURE__ */ y("ZodNonOptional", (e, t) => {
  C1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => q2(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function s6(e, t) {
  return new kf({
    type: "nonoptional",
    innerType: e,
    ...Z(t)
  });
}
const r6 = /* @__PURE__ */ y("ZodCatch", (e, t) => {
  N1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => J2(e, i, a, n), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function c6(e, t) {
  return new r6({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const d6 = /* @__PURE__ */ y("ZodPipe", (e, t) => {
  D1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => Y2(e, i, a, n), e.in = t.in, e.out = t.out;
});
function Ad(e, t) {
  return new d6({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const u6 = /* @__PURE__ */ y("ZodReadonly", (e, t) => {
  V1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => X2(e, i, a, n), e.unwrap = () => e._zod.def.innerType;
});
function l6(e) {
  return new u6({
    type: "readonly",
    innerType: e
  });
}
const wf = /* @__PURE__ */ y("ZodCustom", (e, t) => {
  j1.init(e, t), Ae.init(e, t), e._zod.processJSONSchema = (i, a, n) => F2(e, i);
});
function f6(e, t) {
  return /* @__PURE__ */ T2(wf, e ?? (() => !0), t);
}
function p6(e, t = {}) {
  return /* @__PURE__ */ x2(wf, e, t);
}
function m6(e, t) {
  return /* @__PURE__ */ S2(e, t);
}
const If = it([
  "canon_exact",
  "canon_paraphrase",
  "supported_inference",
  "AU_extension",
  "rejected"
]), g6 = it([
  "official-game",
  "community-transcript",
  "community-reference",
  "gameplay-recording",
  "project-artifact"
]), h6 = it([
  "metadata-only",
  "no-reprint",
  "project-internal"
]), b6 = ee({
  id: T().min(1),
  kind: g6,
  title: T().min(1),
  url: T().url().optional(),
  localPath: T().min(1).optional(),
  locator: T().min(1),
  language: T().min(1),
  checkedAt: T().regex(/^\d{4}-\d{2}-\d{2}$/u),
  revisionId: ne().int().positive().optional(),
  revisionTimestamp: T().min(1).optional(),
  redistribution: h6,
  note: T().min(1).optional()
}).strict().refine((e) => !!e.url != !!e.localPath, {
  message: "Canon source must declare exactly one of url or localPath"
}), _6 = ee({
  sourceId: T().min(1),
  locator: T().min(1)
}).strict(), v6 = ee({
  id: T().min(1),
  classification: If,
  statement: T().min(1),
  evidence: pe(_6).min(1),
  rationale: T().min(1).optional(),
  rejectionReason: T().min(1).optional()
}).strict().superRefine((e, t) => {
  e.classification === "rejected" && !e.rejectionReason && t.addIssue({ code: "custom", path: ["rejectionReason"], message: "Rejected claims require a rejection reason" }), e.classification !== "rejected" && e.rejectionReason && t.addIssue({ code: "custom", path: ["rejectionReason"], message: "Only rejected claims may declare a rejection reason" });
}), Ef = ee({
  classification: If,
  scope: it(["canon_recap", "AU_boundary", "route"]),
  claimIds: pe(T().min(1)).min(1),
  sourceIds: pe(T().min(1)).min(1),
  note: T().min(1)
}).strict().superRefine((e, t) => {
  e.classification === "rejected" && t.addIssue({ code: "custom", path: ["classification"], message: "Rejected content cannot enter a published scene" }), e.scope === "canon_recap" && e.classification !== "canon_paraphrase" && t.addIssue({ code: "custom", path: ["classification"], message: "Canon recap scenes must be canon_paraphrase" }), e.scope !== "canon_recap" && e.classification !== "AU_extension" && t.addIssue({ code: "custom", path: ["classification"], message: "AU boundary and route scenes must be AU_extension" });
}), y6 = ee({
  sceneIds: pe(T().min(1)).min(1),
  provenance: Ef
}).strict();
function Af(e, t, i) {
  const a = /* @__PURE__ */ new Set();
  t.forEach((n, o) => {
    a.has(n.id) && e.addIssue({ code: "custom", path: [i, o, "id"], message: `Duplicate id: ${n.id}` }), a.add(n.id);
  });
}
ee({ version: ve(1), sources: pe(b6).min(1) }).strict().superRefine((e, t) => Af(t, e.sources, "sources"));
ee({ version: ve(1), claims: pe(v6).min(1) }).strict().superRefine((e, t) => Af(t, e.claims, "claims"));
ee({ version: ve(1), entries: pe(y6).min(1) }).strict().superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.entries.forEach((a, n) => a.sceneIds.forEach((o, s) => {
    i.has(o) && t.addIssue({ code: "custom", path: ["entries", n, "sceneIds", s], message: `Duplicate scene provenance: ${o}` }), i.add(o);
  }));
});
const Ti = 2, Za = it([
  "white_canvas",
  "golden_bough_rebuild",
  "ring_conspiracy"
]), k6 = ee({
  affectionAlbina: ne().finite().optional(),
  trust: ne().finite().optional(),
  danger: ne().finite().optional(),
  artResonance: ne().finite().optional(),
  composure: ne().finite().optional(),
  materials: ne().finite().optional(),
  leverage: ne().finite().optional(),
  exposure: ne().finite().optional()
}).strict(), w6 = ee({
  route: Za.optional(),
  values: k6.optional(),
  setFlags: pe(T().min(1)).optional(),
  clearFlags: pe(T().min(1)).optional(),
  unlockCg: pe(T().min(1)).optional(),
  grantItems: pe(T().min(1)).optional(),
  completeQuests: pe(T().min(1)).optional()
}).strict(), I6 = it([
  "affectionAlbina",
  "trust",
  "danger",
  "artResonance"
]), Td = vf("kind", [
  ee({
    kind: ve("value"),
    key: I6,
    operator: it(["gte", "lte", "eq"]),
    value: ne().finite()
  }).strict(),
  ee({
    kind: ve("flag"),
    flag: T().min(1),
    equals: co()
  }).strict()
]), Tf = ee({
  allOf: pe(Td).min(1).optional(),
  anyOf: pe(Td).min(1).optional(),
  fallback: co().optional()
}).strict().refine((e) => e.allOf || e.anyOf || e.fallback === !0, {
  message: "Choice availability must declare predicates or a fallback"
}), E6 = ee({
  route: Za,
  kind: it(["true", "normal", "bad"]),
  eligibility: Tf
}).strict(), A6 = ee({
  id: T().min(1),
  text: T().min(1),
  nextSceneId: T().min(1),
  resultText: T().min(1).optional(),
  resultVoiceAssetId: T().min(1).optional(),
  availability: Tf.optional(),
  effects: w6
}).strict(), T6 = ee({
  characterId: T().min(1),
  portraitAssetId: T().min(1),
  position: it(["far-left", "left", "center", "right", "far-right"]),
  active: co(),
  scale: ne().positive().finite()
}).strict(), x6 = ee({
  version: ve(Ti),
  id: T().min(1),
  chapter: ne().int().nonnegative(),
  route: Za.nullable(),
  provenance: Ef,
  locationId: T().min(1),
  backgroundAssetId: T().min(1),
  cgAssetId: T().min(1).optional(),
  videoAssetId: T().min(1).optional(),
  desktopVideoAssetId: T().min(1).optional(),
  tone: T().min(1),
  portraits: pe(T6),
  speaker: T().min(1),
  text: T(),
  voiceAssetId: T().min(1).optional(),
  bgmAssetId: T().min(1).optional(),
  sfxAssetIds: pe(T().min(1)).optional(),
  choices: pe(A6),
  ending: E6.optional()
}).strict(), S6 = x6.superRefine((e, t) => {
  e.provenance.scope !== "route" && e.route !== null && t.addIssue({ code: "custom", path: ["route"], message: "Canon recap and AU boundary scenes must use a null route" }), e.provenance.scope === "route" && e.route === null && t.addIssue({ code: "custom", path: ["route"], message: "Only canon recap and AU boundary scenes may use a null route" });
});
function O6(e) {
  return e.startsWith("/") || e.endsWith("/") || e.includes("\\") || e.includes(":") ? !1 : e.split("/").every((t) => t.length > 0 && t !== "." && t !== "..");
}
const Ha = T().min(1).refine(O6, {
  message: "Asset paths must be relative to the canonical asset root"
}), xf = ve("pie"), Sf = it(["gpt-image-2", "seedance-1.5-pro", "speech-2.8-hd"]), Of = T().regex(/^[a-z0-9][a-z0-9._-]*$/iu), Cf = ee({
  cueAlias: T().regex(/^[a-z0-9][a-z0-9_]*$/u),
  title: T().min(1),
  creator: T().min(1),
  isrc: T().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/u),
  sourceUrl: T().url(),
  licenseId: ve("CC-BY-4.0"),
  licenseUrl: ve("https://creativecommons.org/licenses/by/4.0/"),
  attribution: T().min(1)
}).strict(), C6 = ee({
  version: ve(1),
  projectId: ve("albina-galgame-card"),
  packagedNotice: T().min(1),
  tracks: pe(Cf.extend({
    assetId: T().min(1),
    path: Ha.refine((e) => e.startsWith("audio/bgm/"), {
      message: "Licensed music paths must be inside audio/bgm"
    }),
    sha256: T().regex(/^[a-f0-9]{64}$/u)
  }).strict()).length(5),
  officialSoundtrack: ee({
    publisher: ve("ProjectMoon"),
    bundled: ve(!1),
    cached: ve(!1),
    notice: T().min(1),
    links: pe(ee({ label: T().min(1), url: T().url() }).strict()).length(2),
    termsUrl: ve("https://limbuscompany.com/terms-of-service/")
  }).strict()
}).strict().superRefine((e, t) => {
  e.tracks.forEach((i, a) => {
    i.creator !== "Kevin MacLeod" && t.addIssue({ code: "custom", path: ["tracks", a, "creator"], message: "Packaged BGM creator must be Kevin MacLeod" });
    const n = new URL(i.sourceUrl);
    (n.protocol !== "https:" || n.hostname !== "incompetech.com" || n.pathname !== "/music/royalty-free/index.html" || n.searchParams.get("isrc") !== i.isrc) && t.addIssue({ code: "custom", path: ["tracks", a, "sourceUrl"], message: "Track source must be its HTTPS Incompetech ISRC page" });
  });
}), N6 = ee({
  provider: xf,
  model: Sf,
  promptVersion: Of,
  sourceJobHash: T().regex(/^[a-f0-9]{64}$/iu),
  review: ee({
    status: ve("approved"),
    reviewer: T().min(1),
    reviewedAt: T().datetime()
  }).strict()
}).strict().superRefine((e, t) => Nf(t, [], e.provider, e.model)), D6 = ee({
  id: T().min(1),
  kind: it(["image", "video", "audio", "json"]),
  path: Ha,
  mimeType: T().min(1).optional(),
  sha256: T().regex(/^[a-f0-9]{64}$/i).optional(),
  bytes: ne().int().nonnegative().optional(),
  provenance: N6.optional(),
  license: Cf.optional()
}).strict().superRefine((e, t) => {
  e.path.startsWith("audio/bgm/") && !e.license && t.addIssue({ code: "custom", path: ["license"], message: "Packaged BGM requires registered license metadata" }), e.license && e.kind !== "audio" && t.addIssue({ code: "custom", path: ["license"], message: "License metadata is only supported on audio assets" });
}), V6 = vf("kind", [
  ee({ kind: ve("static") }).strict(),
  ee({
    kind: ve("strip"),
    frameCount: ve(8),
    frameWidth: ne().int().positive(),
    frameHeight: ne().int().positive(),
    fps: ne().positive().finite()
  }).strict()
]), j6 = ee({
  version: ve(Ti),
  id: T().min(1),
  characterId: T().min(1),
  path: Ha,
  animation: V6,
  fallbackAssetId: T().min(1).optional()
}).strict(), P6 = ee({
  version: ve(Ti),
  id: T().min(1),
  assetId: T().min(1),
  kind: it(["image", "image-edit", "video", "speech"]),
  provider: xf,
  model: Sf,
  promptVersion: Of,
  status: it(["pending", "running", "completed", "failed"]),
  contentHash: T().regex(/^[a-f0-9]{64}$/i),
  inputAssetIds: pe(T().min(1)),
  outputPath: Ha,
  attempts: ne().int().nonnegative(),
  error: T().optional()
}).strict().superRefine((e, t) => {
  const i = e.kind === "image-edit" ? "image" : e.kind;
  Nf(t, ["model"], e.provider, e.model, i);
});
function Nf(e, t, i, a, n) {
  const o = ["gpt-image-2", "seedance-1.5-pro", "speech-2.8-hd"], s = n === void 0 || { image: ["gpt-image-2"], video: ["seedance-1.5-pro"], speech: ["speech-2.8-hd"] }[n].includes(a);
  (i !== "pie" || !o.includes(a) || !s) && e.addIssue({ code: "custom", path: t, message: `Unsupported provider/model pair: ${i}/${a}` });
}
const R6 = ee({
  version: ve(Ti),
  projectId: ve("albina-galgame-card"),
  basePath: Ha,
  assets: pe(D6),
  portraits: pe(j6),
  mediaJobs: pe(P6)
}).strict();
function Oo(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
const Df = R6.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set();
  e.assets.forEach((a, n) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["assets", n, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id);
  }), e.portraits.forEach((a, n) => {
    i.has(a.id) && t.addIssue({ code: "custom", path: ["portraits", n, "id"], message: `Duplicate asset id: ${a.id}` }), i.add(a.id), a.fallbackAssetId && !e.assets.some((o) => o.id === a.fallbackAssetId) && Oo(t, ["portraits", n, "fallbackAssetId"], a.fallbackAssetId);
  }), e.mediaJobs.forEach((a, n) => {
    i.has(a.assetId) || Oo(t, ["mediaJobs", n, "assetId"], a.assetId), a.inputAssetIds.forEach((o, s) => {
      i.has(o) || Oo(t, ["mediaJobs", n, "inputAssetIds", s], o);
    });
  });
});
function $6(e) {
  return Df.parse(e);
}
const U6 = "2.0.0-rc.1", F6 = ".";
function z6(e, t) {
  if (t)
    return e.assets.find((i) => i.id === t);
}
function Gs(e, t, i = F6) {
  const a = z6(e, t);
  if (!a) return;
  const n = [e.basePath, ...a.path.split("/")].map((o) => encodeURIComponent(o)).join("/");
  return `${i.replace(/\/$/u, "")}/${n}`;
}
const L6 = 2, M6 = "albina-galgame-card", B6 = "assets", Z6 = /* @__PURE__ */ JSON.parse('[{"id":"bg.backstreets_rain","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"bg.city_rooftop","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"bg.golden_bough","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"bg.lce_lab","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"bg.limbus_bus","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"bg.mirror_corridor","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"bg.nest_station","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"bg.outskirts_dawn","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"bg.rain_room","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"bg.ring_atelier","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"bg.spider_gallery","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"bg.white_canvas","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"cg.araya_rooftop","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"cg.art_resonance","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"cg.backstreet_pursuit","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"cg.combat_transition_01","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"cg.conspiracy_contract","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"cg.fascia_heartbeat","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"cg.golden_bough_ending","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"cg.golden_bough_rebuild","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"cg.hollow_torso_reveal","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"cg.lce_raid","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"cg.limbus_bus_night","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"cg.maestro_shadow","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"cg.opening_rain","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"cg.rain_confession","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"cg.rebuild_awakening","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"cg.ren_interruption","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"cg.ring_conspiracy_ending","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"cg.ring_invitation","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"cg.surgery_of_memory","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"cg.trust_threshold","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"cg.white_canvas_choice","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"cg.white_canvas_ending","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.audio.bgm.backstreets.rain.mp3","kind":"audio","path":"audio/bgm/backstreets_rain.mp3","mimeType":"audio/mpeg","sha256":"97b5969e9379853e1cc14028fbb908d8607f71ebea87f371ad0499ef94a0a414","bytes":4192274,"license":{"cueAlias":"backstreets_rain","title":"SCP-x6x (Hopes)","creator":"Kevin MacLeod","isrc":"USUAN2000012","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2000012","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"SCP-x6x (Hopes) by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.between.two.worlds.mp3","kind":"audio","path":"audio/bgm/between_two_worlds.mp3","mimeType":"audio/mpeg","sha256":"25470853676263801b044d22761e579a750db722aefbf1d8d48676f49f626184","bytes":2979130,"license":{"cueAlias":"between_two_worlds","title":"Mesmerizing Galaxy","creator":"Kevin MacLeod","isrc":"USUAN2300011","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN2300011","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Mesmerizing Galaxy by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.boss.kromer.mp3","kind":"audio","path":"audio/bgm/boss_kromer.mp3","mimeType":"audio/mpeg","sha256":"923955f3d2091d427d9e345dd6bf9d143a5c3b37631f9ada77a7bca625aa97dd","bytes":3679463,"license":{"cueAlias":"boss_kromer","title":"Burnt Spirit","creator":"Kevin MacLeod","isrc":"USUAN1700053","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700053","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Burnt Spirit by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.main.menu.mp3","kind":"audio","path":"audio/bgm/main_menu.mp3","mimeType":"audio/mpeg","sha256":"299a5619829dbb95604531d310fd89dd190009589bdcdc2ef7881f878b1f7a60","bytes":7685141,"license":{"cueAlias":"main_menu","title":"Magistar","creator":"Kevin MacLeod","isrc":"USUAN1900003","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1900003","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Magistar by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.bgm.title.theme.mp3","kind":"audio","path":"audio/bgm/title_theme.mp3","mimeType":"audio/mpeg","sha256":"03917669cba8086f921712e0db8c59d32e02d63e3be443d8d4458a9d2786ded3","bytes":2540613,"license":{"cueAlias":"title_theme","title":"Achilles","creator":"Kevin MacLeod","isrc":"USUAN1100463","sourceUrl":"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463","licenseId":"CC-BY-4.0","licenseUrl":"https://creativecommons.org/licenses/by/4.0/","attribution":"Achilles by Kevin MacLeod (incompetech.com), licensed under CC BY 4.0."}},{"id":"file.audio.credits.json","kind":"json","path":"audio/CREDITS.json","mimeType":"application/json","sha256":"9ece421fb01008b3b62563f2e74e0a8108b95893cddaae04584bfafb24b004ef","bytes":3889},{"id":"file.audio.se.blood.splat.wav","kind":"audio","path":"audio/se/blood_splat.wav","mimeType":"audio/wav","sha256":"87c30bfd8c336786de618759015f3ee24eee2638d406d7541c7c3fc17201bc17","bytes":17684},{"id":"file.audio.se.glass.shatter.wav","kind":"audio","path":"audio/se/glass_shatter.wav","mimeType":"audio/wav","sha256":"7f066a84a711bcdcf48abc70b07e92ee21957e25cd06765d3637226c55bddda2","bytes":15920},{"id":"file.audio.se.slash.heavy.wav","kind":"audio","path":"audio/se/slash_heavy.wav","mimeType":"audio/wav","sha256":"c93d1adea430352fd38fd9ef315c54801f9fde63350a2fa62584ad20441c7f57","bytes":15920},{"id":"file.audio.se.typing.blip.wav","kind":"audio","path":"audio/se/typing_blip.wav","mimeType":"audio/wav","sha256":"0002e7621f5dd6510cc047dbcfaee2cc7ab958dc20b1d149809958a6f14b1668","bytes":4012},{"id":"file.audio.se.ui.back.wav","kind":"audio","path":"audio/se/ui_back.wav","mimeType":"audio/wav","sha256":"c80e3b1f405a1a2c3d35c5f7b0d94839aba09bce28136b76b94b17a72eaf7f65","bytes":10628},{"id":"file.audio.se.ui.click.wav","kind":"audio","path":"audio/se/ui_click.wav","mimeType":"audio/wav","sha256":"fb67965be3a2b903b7f06c19646df9943f5607bea683798718fe2e77a188e270","bytes":2248},{"id":"file.audio.se.ui.confirm.wav","kind":"audio","path":"audio/se/ui_confirm.wav","mimeType":"audio/wav","sha256":"7fc178ebe16e5de7b62514cca74b1fdcf800dc85156c2d450079279a2446904b","bytes":17684},{"id":"file.audio.voice.result.conspiracy.005.let.her.answer.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","bytes":218292},{"id":"file.audio.voice.result.conspiracy.005.refuse.duo.mp3","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","bytes":225780},{"id":"file.audio.voice.result.conspiracy.006.block.view.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","bytes":290292},{"id":"file.audio.voice.result.conspiracy.006.stand.with.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","bytes":300660},{"id":"file.audio.voice.result.conspiracy.007.break.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","bytes":233844},{"id":"file.audio.voice.result.conspiracy.007.seize.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","bytes":271284},{"id":"file.audio.voice.result.conspiracy.008.hand.pen.to.her.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","bytes":242484},{"id":"file.audio.voice.result.conspiracy.008.refuse.testimony.mp3","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","bytes":229812},{"id":"file.audio.voice.result.conspiracy.009.choose.present.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","bytes":287988},{"id":"file.audio.voice.result.conspiracy.009.refuse.choice.mp3","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","bytes":306420},{"id":"file.audio.voice.result.conspiracy.010.keep.badge.unworn.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","bytes":263796},{"id":"file.audio.voice.result.conspiracy.010.throw.badge.mp3","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","bytes":260916},{"id":"file.audio.voice.result.conspiracy.011.burn.film.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","bytes":243636},{"id":"file.audio.voice.result.conspiracy.011.rewrite.ending.mp3","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","bytes":238452},{"id":"file.audio.voice.result.conspiracy.012.end.tonight.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","bytes":277620},{"id":"file.audio.voice.result.conspiracy.012.keep.blade.mp3","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","bytes":273588},{"id":"file.audio.voice.result.conspiracy.013.hold.one.second.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","bytes":254004},{"id":"file.audio.voice.result.conspiracy.013.return.gently.mp3","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","bytes":269556},{"id":"file.audio.voice.result.conspiracy.014.erase.from.catalog.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","bytes":283956},{"id":"file.audio.voice.result.conspiracy.014.keep.one.line.mp3","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","bytes":289716},{"id":"file.audio.voice.result.conspiracy.accept.mp3","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","bytes":242484},{"id":"file.audio.voice.result.conspiracy.break.pursuit.frame.mp3","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","bytes":237876},{"id":"file.audio.voice.result.conspiracy.escape.to.backstreets.mp3","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","bytes":263796},{"id":"file.audio.voice.result.conspiracy.feed.false.signature.mp3","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","bytes":240756},{"id":"file.audio.voice.result.conspiracy.pressure.mp3","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","bytes":210804},{"id":"file.audio.voice.result.enter.conspiracy.mp3","kind":"audio","path":"audio/voice/result/enter_conspiracy.mp3","mimeType":"audio/mpeg","sha256":"f8964fe276712a75e96af70eceb75f46845ab038422a529a4ca67d6ccc168e56","bytes":204468},{"id":"file.audio.voice.result.enter.rebuild.mp3","kind":"audio","path":"audio/voice/result/enter_rebuild.mp3","mimeType":"audio/mpeg","sha256":"fa7f6c482fb449c3f7c61f2d556182e30a49d449d14fb8329213f97ba8dae9db","bytes":202740},{"id":"file.audio.voice.result.enter.white.canvas.mp3","kind":"audio","path":"audio/voice/result/enter_white_canvas.mp3","mimeType":"audio/mpeg","sha256":"5f238c579d61475995d082999f73a16d0c182f8db58a16ab8cd9d2a802277d97","bytes":164724},{"id":"file.audio.voice.result.golden.bough.rebuild.bad.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","bytes":115764},{"id":"file.audio.voice.result.golden.bough.rebuild.normal.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","bytes":112884},{"id":"file.audio.voice.result.golden.bough.rebuild.true.ending.mp3","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","bytes":105972},{"id":"file.audio.voice.result.golden.bough.route.complete.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","bytes":331188},{"id":"file.audio.voice.result.golden.bough.route.final.mp3","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","bytes":143988},{"id":"file.audio.voice.result.rebuild.006.keep.silent.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","bytes":269556},{"id":"file.audio.voice.result.rebuild.006.read.aloud.mp3","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","bytes":270708},{"id":"file.audio.voice.result.rebuild.007.match.her.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","bytes":295476},{"id":"file.audio.voice.result.rebuild.007.stay.own.rhythm.mp3","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","bytes":305268},{"id":"file.audio.voice.result.rebuild.008.protect.current.self.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","bytes":274164},{"id":"file.audio.voice.result.rebuild.008.trade.old.memory.mp3","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","bytes":271860},{"id":"file.audio.voice.result.rebuild.009.hand.question.back.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","bytes":270132},{"id":"file.audio.voice.result.rebuild.009.refuse.perfect.copy.mp3","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","bytes":267252},{"id":"file.audio.voice.result.rebuild.010.ask.her.choice.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","bytes":226932},{"id":"file.audio.voice.result.rebuild.010.veto.sealing.mp3","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","bytes":232692},{"id":"file.audio.voice.result.rebuild.011.ask.next.revision.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","bytes":292020},{"id":"file.audio.voice.result.rebuild.011.sit.beside.mp3","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","bytes":290868},{"id":"file.audio.voice.result.rebuild.012.break.contract.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","bytes":251700},{"id":"file.audio.voice.result.rebuild.012.negotiate.terms.mp3","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","bytes":268980},{"id":"file.audio.voice.result.rebuild.013.offer.witness.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","bytes":254004},{"id":"file.audio.voice.result.rebuild.013.promise.name.mp3","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","bytes":255156},{"id":"file.audio.voice.result.rebuild.014.ask.when.to.light.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","bytes":286260},{"id":"file.audio.voice.result.rebuild.014.keep.unlit.mp3","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","bytes":292596},{"id":"file.audio.voice.result.rebuild.accept.missing.pieces.mp3","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","bytes":243636},{"id":"file.audio.voice.result.rebuild.anchor.mp3","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","bytes":162420},{"id":"file.audio.voice.result.rebuild.cut.false.completion.mp3","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","bytes":250548},{"id":"file.audio.voice.result.rebuild.guard.fascia.pulse.mp3","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","bytes":265524},{"id":"file.audio.voice.result.rebuild.push.into.raid.mp3","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","bytes":274164},{"id":"file.audio.voice.result.rebuild.question.fascia.mp3","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","bytes":156660},{"id":"file.audio.voice.result.rebuild.use.rooftop.signal.mp3","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","bytes":237300},{"id":"file.audio.voice.result.return.opening.from.rebuild.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"93831e44f51a1755332b620bab795b5a6501bd2310dfe860e65d1de97f796dde","bytes":191220},{"id":"file.audio.voice.result.return.opening.from.ring.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"07b6250f478559c01e05511edda03d37c45df65b9e1848f22cebc16447bdc421","bytes":195252},{"id":"file.audio.voice.result.return.opening.from.white.mp3","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"f909503358a31908b759dbb172165b49e77d3800c6b5e9beb5355bbecd675c37","bytes":202164},{"id":"file.audio.voice.result.ring.conspiracy.bad.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","bytes":104820},{"id":"file.audio.voice.result.ring.conspiracy.normal.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","bytes":127284},{"id":"file.audio.voice.result.ring.conspiracy.route.complete.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","bytes":283956},{"id":"file.audio.voice.result.ring.conspiracy.route.final.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","bytes":156660},{"id":"file.audio.voice.result.ring.conspiracy.true.ending.mp3","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","bytes":112884},{"id":"file.audio.voice.result.white.006.name.silence.mp3","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","bytes":282804},{"id":"file.audio.voice.result.white.006.refuse.naming.mp3","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","bytes":286836},{"id":"file.audio.voice.result.white.007.ask.fascia.term.mp3","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","bytes":289716},{"id":"file.audio.voice.result.white.007.keep.mirror.open.mp3","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","bytes":270132},{"id":"file.audio.voice.result.white.008.hold.fascia.mp3","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","bytes":226356},{"id":"file.audio.voice.result.white.008.stay.witness.only.mp3","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","bytes":240756},{"id":"file.audio.voice.result.white.009.keep.half.step.mp3","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","bytes":252852},{"id":"file.audio.voice.result.white.009.share.umbrella.edge.mp3","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","bytes":218868},{"id":"file.audio.voice.result.white.010.acknowledge.leave.mp3","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","bytes":242484},{"id":"file.audio.voice.result.white.010.offer.return.ticket.mp3","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","bytes":245364},{"id":"file.audio.voice.result.white.011.curtain.call.mp3","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","bytes":259764},{"id":"file.audio.voice.result.white.011.walk.beside.mp3","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","bytes":265524},{"id":"file.audio.voice.result.white.012.let.her.decide.mp3","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","bytes":244788},{"id":"file.audio.voice.result.white.012.refuse.exhibit.mp3","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","bytes":233268},{"id":"file.audio.voice.result.white.013.point.to.mirror.mp3","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","bytes":281652},{"id":"file.audio.voice.result.white.013.refuse.to.choose.mp3","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","bytes":283956},{"id":"file.audio.voice.result.white.014.keep.base.color.mp3","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","bytes":273588},{"id":"file.audio.voice.result.white.014.offer.restart.mp3","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","bytes":296052},{"id":"file.audio.voice.result.white.canvas.bad.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","bytes":111732},{"id":"file.audio.voice.result.white.canvas.normal.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","bytes":104820},{"id":"file.audio.voice.result.white.canvas.route.complete.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","bytes":291444},{"id":"file.audio.voice.result.white.canvas.route.final.mp3","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","bytes":156660},{"id":"file.audio.voice.result.white.canvas.true.ending.mp3","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","bytes":104244},{"id":"file.audio.voice.result.white.follow.to.lab.mp3","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","bytes":271284},{"id":"file.audio.voice.result.white.interrupt.lab.terms.mp3","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","bytes":247668},{"id":"file.audio.voice.result.white.keep.empty.seat.mp3","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","bytes":267828},{"id":"file.audio.voice.result.white.share.rain.window.mp3","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","bytes":256884},{"id":"file.audio.voice.result.white.sign.witness.protocol.mp3","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","bytes":233268},{"id":"file.audio.voice.result.white.tease.back.mp3","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","bytes":210804},{"id":"file.audio.voice.result.white.touch.boundary.mp3","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","bytes":218868},{"id":"file.audio.voice.scene.golden.bough.001.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","bytes":139380},{"id":"file.audio.voice.scene.golden.bough.002.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","bytes":107124},{"id":"file.audio.voice.scene.golden.bough.003.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","bytes":198132},{"id":"file.audio.voice.scene.golden.bough.004.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","bytes":197556},{"id":"file.audio.voice.scene.golden.bough.005.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","bytes":173364},{"id":"file.audio.voice.scene.golden.bough.006.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","bytes":212532},{"id":"file.audio.voice.scene.golden.bough.007.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","bytes":221748},{"id":"file.audio.voice.scene.golden.bough.008.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","bytes":210228},{"id":"file.audio.voice.scene.golden.bough.009.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","bytes":214836},{"id":"file.audio.voice.scene.golden.bough.010.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","bytes":206772},{"id":"file.audio.voice.scene.golden.bough.011.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","bytes":170484},{"id":"file.audio.voice.scene.golden.bough.012.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","bytes":207924},{"id":"file.audio.voice.scene.golden.bough.013.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","bytes":208500},{"id":"file.audio.voice.scene.golden.bough.014.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","bytes":174516},{"id":"file.audio.voice.scene.golden.bough.015.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","bytes":202740},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","bytes":204468},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","bytes":142260},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","bytes":195252},{"id":"file.audio.voice.scene.golden.bough.rebuild.ending.true.mp3","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","bytes":222900},{"id":"file.audio.voice.scene.opening.001.mp3","kind":"audio","path":"audio/voice/scene/opening_001.mp3","mimeType":"audio/mpeg","sha256":"497c1b3cba838f47ce02c67ddb31ebdcc49e5cb8eaa5bbfa2027f6fef3a165a8","bytes":166452},{"id":"file.audio.voice.scene.ring.conspiracy.001.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","bytes":127284},{"id":"file.audio.voice.scene.ring.conspiracy.002.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","bytes":160692},{"id":"file.audio.voice.scene.ring.conspiracy.003.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","bytes":167604},{"id":"file.audio.voice.scene.ring.conspiracy.004.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","bytes":197556},{"id":"file.audio.voice.scene.ring.conspiracy.005.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","bytes":189492},{"id":"file.audio.voice.scene.ring.conspiracy.006.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","bytes":175092},{"id":"file.audio.voice.scene.ring.conspiracy.007.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","bytes":183156},{"id":"file.audio.voice.scene.ring.conspiracy.008.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","bytes":208500},{"id":"file.audio.voice.scene.ring.conspiracy.009.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","bytes":162996},{"id":"file.audio.voice.scene.ring.conspiracy.010.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","bytes":195828},{"id":"file.audio.voice.scene.ring.conspiracy.011.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","bytes":197556},{"id":"file.audio.voice.scene.ring.conspiracy.012.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","bytes":186036},{"id":"file.audio.voice.scene.ring.conspiracy.013.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","bytes":209076},{"id":"file.audio.voice.scene.ring.conspiracy.014.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","bytes":171636},{"id":"file.audio.voice.scene.ring.conspiracy.015.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","bytes":248244},{"id":"file.audio.voice.scene.ring.conspiracy.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","bytes":215412},{"id":"file.audio.voice.scene.ring.conspiracy.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","bytes":147444},{"id":"file.audio.voice.scene.ring.conspiracy.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","bytes":184884},{"id":"file.audio.voice.scene.ring.conspiracy.ending.true.mp3","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","bytes":235572},{"id":"file.audio.voice.scene.white.canvas.001.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"f9a92c1bc7670ad7639266c595dc0fa60b8d8304a848d946aad06f72ec7f07d7","bytes":110580},{"id":"file.audio.voice.scene.white.canvas.002.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","bytes":142260},{"id":"file.audio.voice.scene.white.canvas.003.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","bytes":160692},{"id":"file.audio.voice.scene.white.canvas.004.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","bytes":186036},{"id":"file.audio.voice.scene.white.canvas.005.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","bytes":181428},{"id":"file.audio.voice.scene.white.canvas.006.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","bytes":196980},{"id":"file.audio.voice.scene.white.canvas.007.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","bytes":199860},{"id":"file.audio.voice.scene.white.canvas.008.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","bytes":218868},{"id":"file.audio.voice.scene.white.canvas.009.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","bytes":175668},{"id":"file.audio.voice.scene.white.canvas.010.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","bytes":148596},{"id":"file.audio.voice.scene.white.canvas.011.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","bytes":196404},{"id":"file.audio.voice.scene.white.canvas.012.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","bytes":171636},{"id":"file.audio.voice.scene.white.canvas.013.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","bytes":193524},{"id":"file.audio.voice.scene.white.canvas.014.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","bytes":188340},{"id":"file.audio.voice.scene.white.canvas.015.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","bytes":207924},{"id":"file.audio.voice.scene.white.canvas.ending.bad.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","bytes":199860},{"id":"file.audio.voice.scene.white.canvas.ending.gate.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","bytes":142260},{"id":"file.audio.voice.scene.white.canvas.ending.normal.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","bytes":177396},{"id":"file.audio.voice.scene.white.canvas.ending.true.mp3","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","bytes":196980},{"id":"file.avatar.albina.avatar.png","kind":"image","path":"avatar/albina-avatar.png","mimeType":"image/png","sha256":"159e7304b4bb6e364754aa2ee960851b804d9f359f07b48ac5fc9812e988e58f","bytes":408911},{"id":"file.bg.backstreets.rain.jpg","kind":"image","path":"bg/backstreets_rain.jpg","mimeType":"image/jpeg","sha256":"7a897b01c41634b0ab05b8411f487e60712909f153aed6b866c6e724f7a05ec7","bytes":195160},{"id":"file.bg.backstreets.rain.svg","kind":"image","path":"bg/backstreets_rain.svg","mimeType":"image/svg+xml","sha256":"2ca9364ada8709526e9d64a945422fb06f36da448e183295ab466a22d1cc995a","bytes":12706},{"id":"file.bg.city.rooftop.jpg","kind":"image","path":"bg/city_rooftop.jpg","mimeType":"image/jpeg","sha256":"4428f1f905a752eab7e4f6119f236f12767778db7f4768d2463a03ee6dcc4697","bytes":207867},{"id":"file.bg.city.rooftop.svg","kind":"image","path":"bg/city_rooftop.svg","mimeType":"image/svg+xml","sha256":"5eae2ee6b750ba1d93ef35eb4b7c67808e1895875d51a9e0075695a35e95a31e","bytes":12706},{"id":"file.bg.golden.bough.jpg","kind":"image","path":"bg/golden_bough.jpg","mimeType":"image/jpeg","sha256":"5e6a552b04b4333ca30c001a3020168908d7867926982ca4097145fa735ee207","bytes":222682},{"id":"file.bg.golden.bough.svg","kind":"image","path":"bg/golden_bough.svg","mimeType":"image/svg+xml","sha256":"94f087ceec5a2a42d7cd56c60d3c880e72798facff376fe1ace1627420b5e54b","bytes":12720},{"id":"file.bg.lce.lab.jpg","kind":"image","path":"bg/lce_lab.jpg","mimeType":"image/jpeg","sha256":"b982f39f13eb87cdb59d1540ff4f7688c4b319600a7174a758288f3c4efe672d","bytes":202605},{"id":"file.bg.lce.lab.svg","kind":"image","path":"bg/lce_lab.svg","mimeType":"image/svg+xml","sha256":"0cf1998d6f245face41e86d83bfab30dc5b4d1fc8a63ae1d4da7d74b16814569","bytes":12708},{"id":"file.bg.limbus.bus.jpg","kind":"image","path":"bg/limbus_bus.jpg","mimeType":"image/jpeg","sha256":"c684aba165f3d0a195d6e5b438be4bc9b2a070a4ac3364e91bef93716aab9c60","bytes":194697},{"id":"file.bg.limbus.bus.svg","kind":"image","path":"bg/limbus_bus.svg","mimeType":"image/svg+xml","sha256":"ac55a1801f59f4f6158a979f56e61edf5dea42c4ad59a9c00ca77f240fef9345","bytes":12716},{"id":"file.bg.mirror.corridor.jpg","kind":"image","path":"bg/mirror_corridor.jpg","mimeType":"image/jpeg","sha256":"aac5cfac5624763538d533b63914c845c266dc17845789d9c3f7d5bb408603f9","bytes":193914},{"id":"file.bg.mirror.corridor.svg","kind":"image","path":"bg/mirror_corridor.svg","mimeType":"image/svg+xml","sha256":"f682139293def0b42bce1f99df089252290d1b056a66876eb5ecf868fb43bfad","bytes":12716},{"id":"file.bg.nest.station.jpg","kind":"image","path":"bg/nest_station.jpg","mimeType":"image/jpeg","sha256":"732fa0c67c071560b01c536d5ed76944c60d1a0d9a5034087ca79bf5ffff9ad2","bytes":196705},{"id":"file.bg.nest.station.svg","kind":"image","path":"bg/nest_station.svg","mimeType":"image/svg+xml","sha256":"f29c2177b49dd12d1a7b98c3f1b4fd0d04c425f2668532da61c51a2ae45720bf","bytes":12697},{"id":"file.bg.outskirts.dawn.jpg","kind":"image","path":"bg/outskirts_dawn.jpg","mimeType":"image/jpeg","sha256":"4ccbdbab6a95b5d79ae476a96f8b453ed07241e599014002fdc83475f8bd092a","bytes":182100},{"id":"file.bg.outskirts.dawn.svg","kind":"image","path":"bg/outskirts_dawn.svg","mimeType":"image/svg+xml","sha256":"5f64fe26325f8d446f5ed235a1bf4e293a1fbc2fe5802b43c73cfcd57939dac7","bytes":12725},{"id":"file.bg.rain.room.jpg","kind":"image","path":"bg/rain_room.jpg","mimeType":"image/jpeg","sha256":"0a4b24f02a4f9274d6691594cbfd8c1f2512c1fe4559083a22c6cf2891cb198e","bytes":198604},{"id":"file.bg.rain.room.svg","kind":"image","path":"bg/rain_room.svg","mimeType":"image/svg+xml","sha256":"3329c56d45d54fbd27ebc7918a2287bbdb922b437815430a51d1b4c0f65a7f42","bytes":12705},{"id":"file.bg.ring.atelier.jpg","kind":"image","path":"bg/ring_atelier.jpg","mimeType":"image/jpeg","sha256":"aed9195327ca4feef20a611b2bd0f0ed4a8fba22f12fdf685bafc5b3ed13eb10","bytes":197708},{"id":"file.bg.ring.atelier.svg","kind":"image","path":"bg/ring_atelier.svg","mimeType":"image/svg+xml","sha256":"2352c7ca280b2b41a785eb0e28391cb5d69ab18b7087b985a653d28309cabdb9","bytes":12700},{"id":"file.bg.spider.gallery.jpg","kind":"image","path":"bg/spider_gallery.jpg","mimeType":"image/jpeg","sha256":"78a4336f0aa42c3ecf10667aeeb40dcdd42b271548872255c66aee716abcf024","bytes":223415},{"id":"file.bg.spider.gallery.svg","kind":"image","path":"bg/spider_gallery.svg","mimeType":"image/svg+xml","sha256":"8a0cf1a4a74e8031b34ff92efc6cd4285206a1ebf30b94f4b37d3ece83952adf","bytes":12710},{"id":"file.bg.white.canvas.jpg","kind":"image","path":"bg/white_canvas.jpg","mimeType":"image/jpeg","sha256":"6551848df5f6a312cbd769356b512643b33f2b9e68c9b8da21ad98ab9ef80605","bytes":193895},{"id":"file.bg.white.canvas.svg","kind":"image","path":"bg/white_canvas.svg","mimeType":"image/svg+xml","sha256":"cf0d8b2dfc155f8189eb37648a9ab478914bdb1055cae1aaf15ccb9bfdc812ff","bytes":12718},{"id":"file.cg.albina.key.visual.jpg","kind":"image","path":"cg/albina_key_visual.jpg","mimeType":"image/jpeg","sha256":"3cc08f61408a8e1b964dc5ca9b4d2b19d6cd30a8536d154d4fc35bed22fdcfca","bytes":779782},{"id":"file.cg.araya.rooftop.jpg","kind":"image","path":"cg/araya_rooftop.jpg","mimeType":"image/jpeg","sha256":"1ecd4ffa5f53471b66b5aecbfa37a8289c603c2a5ce2212538da01cbd5d5d8e4","bytes":226727},{"id":"file.cg.araya.rooftop.svg","kind":"image","path":"cg/araya_rooftop.svg","mimeType":"image/svg+xml","sha256":"43e4ba9ab056357d81d759009ccc8a52cd4435dceda13a2201581cf845f1ed3b","bytes":4598},{"id":"file.cg.art.resonance.jpg","kind":"image","path":"cg/art_resonance.jpg","mimeType":"image/jpeg","sha256":"da4000d606059e545bbf427451a999ea99e9fd730b71033cf61ed0e5c7ebeb1a","bytes":221527},{"id":"file.cg.art.resonance.svg","kind":"image","path":"cg/art_resonance.svg","mimeType":"image/svg+xml","sha256":"b5a5ce4b049a732f48fa745803585ab1fead1c96dcd2cc94c583a4bb79f051fc","bytes":4593},{"id":"file.cg.backstreet.pursuit.jpg","kind":"image","path":"cg/backstreet_pursuit.jpg","mimeType":"image/jpeg","sha256":"ff18127cd0ae95ad91c3e85ceec047def159a58bfec852708271a65d4f53b774","bytes":208589},{"id":"file.cg.backstreet.pursuit.svg","kind":"image","path":"cg/backstreet_pursuit.svg","mimeType":"image/svg+xml","sha256":"e07b123e0dd8010b0ccb5fb36d97a85f89373e6403b62e2f1750b2ca6a07fbae","bytes":4592},{"id":"file.cg.combat.transition.01.jpg","kind":"image","path":"cg/combat_transition_01.jpg","mimeType":"image/jpeg","sha256":"1636765ed07b103ccc5696e5c3cf4152d300c64b147f2a3b2722dd2151275209","bytes":238482},{"id":"file.cg.combat.transition.02.jpg","kind":"image","path":"cg/combat_transition_02.jpg","mimeType":"image/jpeg","sha256":"15da031ead573ecff24ecb8c7f5ac0d64b966f8e4c40c4290a18a6dd658fcbf8","bytes":231222},{"id":"file.cg.combat.transition.03.jpg","kind":"image","path":"cg/combat_transition_03.jpg","mimeType":"image/jpeg","sha256":"4c9ba8fa3d28ba90724bcb8b73a43d8978e445db277b66e35a4547e0b80ae476","bytes":220810},{"id":"file.cg.combat.transition.04.jpg","kind":"image","path":"cg/combat_transition_04.jpg","mimeType":"image/jpeg","sha256":"ef89995f67a6c3ca3f101d05019aaf4f79824462c0d76ccb2da30a1beae8e9f8","bytes":187028},{"id":"file.cg.combat.transition.05.jpg","kind":"image","path":"cg/combat_transition_05.jpg","mimeType":"image/jpeg","sha256":"e51393ad94223802f49b78be139d181d1dc89d8bf98fdf76beb195a91eb9098e","bytes":254728},{"id":"file.cg.combat.transition.06.jpg","kind":"image","path":"cg/combat_transition_06.jpg","mimeType":"image/jpeg","sha256":"7038c8301aa5b607bd7050e7c5347a0d659c8599187161d42d942ed7c3a21c44","bytes":208052},{"id":"file.cg.conspiracy.contract.jpg","kind":"image","path":"cg/conspiracy_contract.jpg","mimeType":"image/jpeg","sha256":"72922d9f7aac148fcfe1e6d7bed34fa8fd7bfc7323641b67feb5279fbe87dad1","bytes":215416},{"id":"file.cg.conspiracy.contract.svg","kind":"image","path":"cg/conspiracy_contract.svg","mimeType":"image/svg+xml","sha256":"65b88a00b4226ce0ddcb924ca7c118e5408911a933c635df30fd603363888327","bytes":4605},{"id":"file.cg.danger.threshold.jpg","kind":"image","path":"cg/danger_threshold.jpg","mimeType":"image/jpeg","sha256":"f5b5356ad2ff469f4dc77d49b54511b9cde21dfc99c52b91f54610e4545ea140","bytes":242967},{"id":"file.cg.danger.threshold.svg","kind":"image","path":"cg/danger_threshold.svg","mimeType":"image/svg+xml","sha256":"132fddc83900e0a6095e42cc22b0a6c62be3e6fa5b30248ed78bc59aa27bb19c","bytes":4596},{"id":"file.cg.fascia.heartbeat.jpg","kind":"image","path":"cg/fascia_heartbeat.jpg","mimeType":"image/jpeg","sha256":"2640a75be54575dce6bdc1b9023b06934899cbf4b5492cf012ef1e9c7d2f71e6","bytes":204579},{"id":"file.cg.fascia.heartbeat.svg","kind":"image","path":"cg/fascia_heartbeat.svg","mimeType":"image/svg+xml","sha256":"f3e00df4100539e897eeb62c251c9276722b6b4fb1c989ab7bd7889e407728c9","bytes":4594},{"id":"file.cg.first.gallery.jpg","kind":"image","path":"cg/first_gallery.jpg","mimeType":"image/jpeg","sha256":"da6961a762bd452191d1f4c0fd78b3ad0aa008a550fc873bbbd82761c498ead4","bytes":237789},{"id":"file.cg.first.gallery.svg","kind":"image","path":"cg/first_gallery.svg","mimeType":"image/svg+xml","sha256":"60840a171afe923653c08bb9e7d7d744ed27d09cc4ec8cb7d575ef3fe6322425","bytes":4594},{"id":"file.cg.golden.bough.ending.jpg","kind":"image","path":"cg/golden_bough_ending.jpg","mimeType":"image/jpeg","sha256":"4700e8485eb57b194cf6878741509ddc1e323d486878114259b9405051045491","bytes":217599},{"id":"file.cg.golden.bough.ending.svg","kind":"image","path":"cg/golden_bough_ending.svg","mimeType":"image/svg+xml","sha256":"9a28d702a7845c7f109b75e62f074614b12eb15c2a0ef939d2a372dd448e7eea","bytes":4597},{"id":"file.cg.golden.bough.rebuild.jpg","kind":"image","path":"cg/golden_bough_rebuild.jpg","mimeType":"image/jpeg","sha256":"0c8c941f77ea39f704563e02e1ed22e8619d8c335ada4215e179a8c6a1caef55","bytes":226407},{"id":"file.cg.golden.bough.rebuild.svg","kind":"image","path":"cg/golden_bough_rebuild.svg","mimeType":"image/svg+xml","sha256":"1ee378cb16da5bc913f6269f0a47bb5fe4087f9f75e0b324108c7f3e056887ab","bytes":4600},{"id":"file.cg.hollow.torso.reveal.jpg","kind":"image","path":"cg/hollow_torso_reveal.jpg","mimeType":"image/jpeg","sha256":"46e83edaabd17b1316bd705daf1a14614c0a7ae8b6164281b9770a2e020fe3e5","bytes":212406},{"id":"file.cg.hollow.torso.reveal.svg","kind":"image","path":"cg/hollow_torso_reveal.svg","mimeType":"image/svg+xml","sha256":"7b6159f5848060278c6b5d61f998ef7b946ceb70a321bcca08bc8c1d3aec0c9a","bytes":4599},{"id":"file.cg.lce.raid.jpg","kind":"image","path":"cg/lce_raid.jpg","mimeType":"image/jpeg","sha256":"037414f5985f5d972656d297f771e4553d3c01d1d700185bea68f40723892284","bytes":191396},{"id":"file.cg.lce.raid.svg","kind":"image","path":"cg/lce_raid.svg","mimeType":"image/svg+xml","sha256":"dcc9fa8598f9d638f78fc4dc44fe83b281817f2f685dd30c953d8ba57260f0c6","bytes":4591},{"id":"file.cg.limbus.bus.night.jpg","kind":"image","path":"cg/limbus_bus_night.jpg","mimeType":"image/jpeg","sha256":"0b1054ef8e4b8cd99b8f234ae2abd5c5e160813b73d1e564dba47c67f8a7cd8a","bytes":202828},{"id":"file.cg.limbus.bus.night.svg","kind":"image","path":"cg/limbus_bus_night.svg","mimeType":"image/svg+xml","sha256":"8fed7ceb727391ca5dd5876a7a04bc0d08d347152719b4429c41ada34a64d257","bytes":4599},{"id":"file.cg.maestro.shadow.jpg","kind":"image","path":"cg/maestro_shadow.jpg","mimeType":"image/jpeg","sha256":"ff93dcfc2b02faf7920d1426ebdfadf86d58aa5744117a6d692d2f5f370fa5c6","bytes":223021},{"id":"file.cg.maestro.shadow.svg","kind":"image","path":"cg/maestro_shadow.svg","mimeType":"image/svg+xml","sha256":"d136ee2ad277d4c29e285f42e2d97ccc04ddc30606b0798a5b6eebabb680708c","bytes":4597},{"id":"file.cg.opening.rain.jpg","kind":"image","path":"cg/opening_rain.jpg","mimeType":"image/jpeg","sha256":"557521106b516bf35aa9b55473c6f977a80bdf8ed6f7fe3f8ecf47de6c961931","bytes":190464},{"id":"file.cg.opening.rain.svg","kind":"image","path":"cg/opening_rain.svg","mimeType":"image/svg+xml","sha256":"660b6694c5a692daf70deb6ed839e04091d824c5b223b531cb176fd3b9d81bb3","bytes":4596},{"id":"file.cg.rain.confession.jpg","kind":"image","path":"cg/rain_confession.jpg","mimeType":"image/jpeg","sha256":"2312880e97be851f6f2688efb07f8d1475e7e4ea1ff3de2dde2db622bee41884","bytes":233325},{"id":"file.cg.rain.confession.svg","kind":"image","path":"cg/rain_confession.svg","mimeType":"image/svg+xml","sha256":"fdf4e4c642b2b1e50a5de5bf198a32c19749a4863cf5463f00107e0eede39b9c","bytes":4598},{"id":"file.cg.rebuild.awakening.jpg","kind":"image","path":"cg/rebuild_awakening.jpg","mimeType":"image/jpeg","sha256":"21c280bc65cf08f4d34b983a9731e3e231bd154a724cec0ee32dc11fc3698648","bytes":182730},{"id":"file.cg.rebuild.awakening.svg","kind":"image","path":"cg/rebuild_awakening.svg","mimeType":"image/svg+xml","sha256":"258465af59037896eee5a5a760e921ed5eb846c72e18cb52c1e393d5b4389db5","bytes":4596},{"id":"file.cg.ren.interruption.jpg","kind":"image","path":"cg/ren_interruption.jpg","mimeType":"image/jpeg","sha256":"1f69370dc412adddb7367be1f751bd720db2a1b4ab7105bc091a1f3754799083","bytes":229446},{"id":"file.cg.ren.interruption.svg","kind":"image","path":"cg/ren_interruption.svg","mimeType":"image/svg+xml","sha256":"719824c4c8223e4ea153e211007caa31f07a959c07e97bb9c72890e06d3da814","bytes":4597},{"id":"file.cg.ring.conspiracy.ending.jpg","kind":"image","path":"cg/ring_conspiracy_ending.jpg","mimeType":"image/jpeg","sha256":"dd57358bb86e03d8619a820ff3b0773dea49d24a760ea09593c5594652876ea3","bytes":219860},{"id":"file.cg.ring.conspiracy.ending.svg","kind":"image","path":"cg/ring_conspiracy_ending.svg","mimeType":"image/svg+xml","sha256":"bc17d94853829bb360d530c7074f7cebc92b05a08997eaf28f0ae51532c3780e","bytes":4600},{"id":"file.cg.ring.invitation.jpg","kind":"image","path":"cg/ring_invitation.jpg","mimeType":"image/jpeg","sha256":"ad02a44c0f89ce0a9e3a173a82bad62c6cfe94121c2e994bc91a487cdd13e5c1","bytes":206839},{"id":"file.cg.ring.invitation.svg","kind":"image","path":"cg/ring_invitation.svg","mimeType":"image/svg+xml","sha256":"4015dd820a43df8884c0e2e8a4b1a220524836933570e7cacf22c5cb02f20b22","bytes":4601},{"id":"file.cg.sinclair.flash.jpg","kind":"image","path":"cg/sinclair_flash.jpg","mimeType":"image/jpeg","sha256":"d434d887564b5ada77b2deb3ddf2b81c9d32427f55ba281ce96447dcc4f62d1e","bytes":221337},{"id":"file.cg.sinclair.flash.svg","kind":"image","path":"cg/sinclair_flash.svg","mimeType":"image/svg+xml","sha256":"a06692b7c81aa54996b2ccf9e08fe9dd98deb7094f2e82fe5495e45192d5040f","bytes":4589},{"id":"file.cg.surgery.of.memory.jpg","kind":"image","path":"cg/surgery_of_memory.jpg","mimeType":"image/jpeg","sha256":"3856e752a99b3c8c4d83ae3cd2ae259ce8911b63439c3925d92d8bafc2231b68","bytes":241224},{"id":"file.cg.surgery.of.memory.svg","kind":"image","path":"cg/surgery_of_memory.svg","mimeType":"image/svg+xml","sha256":"7b640a9324dbed3cfab52d953a3c231c620d3b205939b8726b6bf178515bfae2","bytes":4598},{"id":"file.cg.trust.threshold.jpg","kind":"image","path":"cg/trust_threshold.jpg","mimeType":"image/jpeg","sha256":"ee433f58ec08d7311b0dccee6f184d5b6235e398bbc62698455276e33db673fc","bytes":183900},{"id":"file.cg.trust.threshold.svg","kind":"image","path":"cg/trust_threshold.svg","mimeType":"image/svg+xml","sha256":"4ed32ef158df4c7ebbf7d2afede80277866b6d964ecbc8395f21c3a9e21ef3ec","bytes":4600},{"id":"file.cg.white.canvas.choice.jpg","kind":"image","path":"cg/white_canvas_choice.jpg","mimeType":"image/jpeg","sha256":"ed4e27e3e480ec1bb7c3e1f400274fe8ca6277c9bd114a9edca1bcd3ad93a0d9","bytes":200807},{"id":"file.cg.white.canvas.choice.svg","kind":"image","path":"cg/white_canvas_choice.svg","mimeType":"image/svg+xml","sha256":"9cffaefd8f010f1c0af094ede03e209dc496af0ed874cd98e5211edd41bb1c2d","bytes":4599},{"id":"file.cg.white.canvas.ending.jpg","kind":"image","path":"cg/white_canvas_ending.jpg","mimeType":"image/jpeg","sha256":"c9c999a7eed0a02dc31fe84736e7ef8af39ecd47e288c3d99d19b9bc56b5145c","bytes":232672},{"id":"file.cg.white.canvas.ending.svg","kind":"image","path":"cg/white_canvas_ending.svg","mimeType":"image/svg+xml","sha256":"c4bc0030a9ed0538c6f8feec6c0585c9bc4723dca8f9d12bb4a6867f5966de60","bytes":4602},{"id":"file.characters.albina.amused.png","kind":"image","path":"characters/albina/amused.png","mimeType":"image/png","sha256":"a0156c8d34a69b500b2882307bbe55ed77db8d049a07039f75195e864eb8c2e1","bytes":648683},{"id":"file.characters.albina.amused.svg","kind":"image","path":"characters/albina/amused.svg","mimeType":"image/svg+xml","sha256":"d944a9f1d9c6655865944af0d0ba2ae94ea761f61aae7ee0f53061e6eadaa4e1","bytes":3248},{"id":"file.characters.albina.armored.png","kind":"image","path":"characters/albina/armored.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.armored.svg","kind":"image","path":"characters/albina/armored.svg","mimeType":"image/svg+xml","sha256":"eb6d0341f181d58c37b0fe88aae31e993b4c88aa77906bf3645f879eab0b5de4","bytes":3249},{"id":"file.characters.albina.combat.png","kind":"image","path":"characters/albina/combat.png","mimeType":"image/png","sha256":"d253d25b615b31dbdc14b9b85a6873732fbe7f5595624a6a1f67db8e1c373833","bytes":794440},{"id":"file.characters.albina.combat.svg","kind":"image","path":"characters/albina/combat.svg","mimeType":"image/svg+xml","sha256":"e1adc354d6e1fc2a7fa2a6ae2aac4cc53c273b9bb2c6266aefd5e2f1b77c47ea","bytes":3248},{"id":"file.characters.albina.endgame.png","kind":"image","path":"characters/albina/endgame.png","mimeType":"image/png","sha256":"10ba1187d40b50910ff2183f83812dff890885b47d27d64d96fcd719b603e92a","bytes":886696},{"id":"file.characters.albina.endgame.svg","kind":"image","path":"characters/albina/endgame.svg","mimeType":"image/svg+xml","sha256":"ff345247b32c32910e63e133e2f9bdb9ab693a070633196799d00c4c49932ea2","bytes":3249},{"id":"file.characters.albina.fascia.open.png","kind":"image","path":"characters/albina/fascia-open.png","mimeType":"image/png","sha256":"794865a3149891f0562df93cf61e3671f6793283949a6cdeec60f299cf0a8c4a","bytes":226988},{"id":"file.characters.albina.fascia.open.svg","kind":"image","path":"characters/albina/fascia-open.svg","mimeType":"image/svg+xml","sha256":"68051cff6817febc6c852e576dfe2be9ef119989ddbcfa3cb9b7d81826e0d30d","bytes":3253},{"id":"file.characters.albina.focused.png","kind":"image","path":"characters/albina/focused.png","mimeType":"image/png","sha256":"1049d898e1ee6dc266385bf528c6d321fbe6ad298c5d6b9e58ac9d46fdb32c3a","bytes":752133},{"id":"file.characters.albina.focused.svg","kind":"image","path":"characters/albina/focused.svg","mimeType":"image/svg+xml","sha256":"e0f0aec562ce528c0f05d4f171cf3b139e6d06a1730fe3388896d4d5c7807c25","bytes":3249},{"id":"file.characters.albina.furious.png","kind":"image","path":"characters/albina/furious.png","mimeType":"image/png","sha256":"7df3a04ea9c87534d5d0746e98ae84adb1921d268e58f1c388c1f090b7ecfda1","bytes":157756},{"id":"file.characters.albina.furious.svg","kind":"image","path":"characters/albina/furious.svg","mimeType":"image/svg+xml","sha256":"ffbc84b7a8f991385884e1b52bc73774e908aad1482f276feb863815f169cb9e","bytes":3249},{"id":"file.characters.albina.golden.bough.png","kind":"image","path":"characters/albina/golden-bough.png","mimeType":"image/png","sha256":"7b96b2ec44022a3b8a86b2480e25bd01eb5ac32218e63382373e97c273baf831","bytes":731292},{"id":"file.characters.albina.golden.bough.svg","kind":"image","path":"characters/albina/golden-bough.svg","mimeType":"image/svg+xml","sha256":"270131e1276bf547097e47be0e18589bfa0345e8a257543bb38888052b4bd8e8","bytes":3254},{"id":"file.characters.albina.maestro.png","kind":"image","path":"characters/albina/maestro.png","mimeType":"image/png","sha256":"b148b529b7fab01184fcfa54c8b80fa9a48fcc7723fc3498bd58e504015ea0ea","bytes":434686},{"id":"file.characters.albina.maestro.svg","kind":"image","path":"characters/albina/maestro.svg","mimeType":"image/svg+xml","sha256":"63b1b5064275f5d5d4c6aeafbcafa1dfd721732e1d20b0d4460ff9a447867cb1","bytes":3249},{"id":"file.characters.albina.normal.png","kind":"image","path":"characters/albina/normal.png","mimeType":"image/png","sha256":"e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55","bytes":647858},{"id":"file.characters.albina.normal.svg","kind":"image","path":"characters/albina/normal.svg","mimeType":"image/svg+xml","sha256":"906300d14804a6265b2f0189460958a3681e546d430b789952bb80e228f95fc6","bytes":3248},{"id":"file.characters.albina.rain.png","kind":"image","path":"characters/albina/rain.png","mimeType":"image/png","sha256":"a2b3fd27325ace3c20e92c441900e338b027f7cdcdb603c12dc92924e0175f06","bytes":649497},{"id":"file.characters.albina.rain.svg","kind":"image","path":"characters/albina/rain.svg","mimeType":"image/svg+xml","sha256":"2cea8476fd8a8d8b00756b2cbf391147f40e2267a9dd1ae6b9cfa80bc3050e34","bytes":3246},{"id":"file.characters.albina.ring.conspiracy.png","kind":"image","path":"characters/albina/ring-conspiracy.png","mimeType":"image/png","sha256":"a0192ec0071b3d2af4f3d7e38ab29e7ed4cd140b084ebc10ff47e8a42e2a36e5","bytes":1043427},{"id":"file.characters.albina.ring.conspiracy.svg","kind":"image","path":"characters/albina/ring-conspiracy.svg","mimeType":"image/svg+xml","sha256":"cc72d233e523b3b73dceac5c9630139967f4429eb56876dcdea50f260403d9c7","bytes":3257},{"id":"file.characters.albina.shy.png","kind":"image","path":"characters/albina/shy.png","mimeType":"image/png","sha256":"928100cc984332c9b4f769cc38dba965425a91cc1aece23e9d384fc993509247","bytes":649383},{"id":"file.characters.albina.shy.svg","kind":"image","path":"characters/albina/shy.svg","mimeType":"image/svg+xml","sha256":"7daf3a0563615f07a420b5e80dc56475ea591f47b542ba654d9a72ee21bd86cf","bytes":3245},{"id":"file.characters.albina.smile.png","kind":"image","path":"characters/albina/smile.png","mimeType":"image/png","sha256":"c35bc3e8aae3870801f75205d5b1cff67d5fe5c48876824ed14a0820414e7659","bytes":648264},{"id":"file.characters.albina.smile.svg","kind":"image","path":"characters/albina/smile.svg","mimeType":"image/svg+xml","sha256":"bbcc931251f2505b5126c3ab176fcc7f857ae4c48aab5d2750d61c06d81db20b","bytes":3247},{"id":"file.characters.albina.surgical.png","kind":"image","path":"characters/albina/surgical.png","mimeType":"image/png","sha256":"b01318b4e4677e4d6e4de6aad53149717364d36a0d66b56425100e31a6547897","bytes":360435},{"id":"file.characters.albina.surgical.svg","kind":"image","path":"characters/albina/surgical.svg","mimeType":"image/svg+xml","sha256":"1d25fd6fbbceb25c593a225db28a567cafd34710d010b5d900c78e3bbde244e0","bytes":3250},{"id":"file.characters.albina.unarmored.png","kind":"image","path":"characters/albina/unarmored.png","mimeType":"image/png","sha256":"b0a7cb32e6c114ec975d0e4dbf2ab8a756de2b86688e9bbff390e32c0dba8a34","bytes":225675},{"id":"file.characters.albina.unarmored.svg","kind":"image","path":"characters/albina/unarmored.svg","mimeType":"image/svg+xml","sha256":"57bb64084a2c1785e74f4e4df9767a903a5063f91b56f239de72ef4d0865eada","bytes":3251},{"id":"file.characters.albina.white.canvas.png","kind":"image","path":"characters/albina/white-canvas.png","mimeType":"image/png","sha256":"cbf1f679143b6ed9ceee9a12ce5bab2ce571e09cbade31b9ae673d0e6479f3aa","bytes":360278},{"id":"file.characters.albina.white.canvas.svg","kind":"image","path":"characters/albina/white-canvas.svg","mimeType":"image/svg+xml","sha256":"2ace4fd2654d28e4a37b9ca5327632b9ec1c3e2e2c45538323c89a34a5f31d48","bytes":3254},{"id":"file.characters.albina.wounded.png","kind":"image","path":"characters/albina/wounded.png","mimeType":"image/png","sha256":"6d3e49d8dc54796ab3c2fc5f114b98881f0c8ca2d12a1a81ef8f6dbcea97fe01","bytes":360844},{"id":"file.characters.albina.wounded.svg","kind":"image","path":"characters/albina/wounded.svg","mimeType":"image/svg+xml","sha256":"33af83cc546db12d0b154a16db04df73773fa8a9ff8cf8b899b798098604ef95","bytes":3249},{"id":"file.characters.araya.normal.svg","kind":"image","path":"characters/araya/normal.svg","mimeType":"image/svg+xml","sha256":"8581b9680f7eaa0ee12cdb681e03792e154b25323bc7c466541fa69914a9e668","bytes":2913},{"id":"file.characters.callisto.normal.png","kind":"image","path":"characters/callisto/normal.png","mimeType":"image/png","sha256":"7c9c806f2a9517c65648b085ec22d1b93d47effdab3d8be91d2f368c7e6039fd","bytes":377258},{"id":"file.characters.callisto.normal.svg","kind":"image","path":"characters/callisto/normal.svg","mimeType":"image/svg+xml","sha256":"9d2814ddff972ccfd9089c1c4c997b553375fa52496111719d879e176c00f8aa","bytes":2916},{"id":"file.characters.charon.normal.png","kind":"image","path":"characters/charon/normal.png","mimeType":"image/png","sha256":"7c66384703968377258e10af0e17f5cb7ebd238d13b205b832e9c389244ac819","bytes":415773},{"id":"file.characters.dante.normal.png","kind":"image","path":"characters/dante/normal.png","mimeType":"image/png","sha256":"1db98bd0ed89ce5d66c175a525907c6bee207fbe61a4bb118e41a141a2613603","bytes":788630},{"id":"file.characters.dante.normal.svg","kind":"image","path":"characters/dante/normal.svg","mimeType":"image/svg+xml","sha256":"9359c9496cea38dc4a0e9bf5ac2ad0491e3641ded1db4d15280fbe1d7a7c73e7","bytes":2913},{"id":"file.characters.faust.normal.png","kind":"image","path":"characters/faust/normal.png","mimeType":"image/png","sha256":"9e5839384ac0d57d445d14301a38abdc357a28f33d8c345255c49b2f4fb9f5c7","bytes":919963},{"id":"file.characters.fixer.informant.normal.png","kind":"image","path":"characters/fixer_informant/normal.png","mimeType":"image/png","sha256":"c276eb35ccbd7ef8dc813d5db74b9e146131f909a55c1fff3f04cf8af95db82c","bytes":485462},{"id":"file.characters.golden.apparition.normal.png","kind":"image","path":"characters/golden_apparition/normal.png","mimeType":"image/png","sha256":"fc90202b6b36e901fe0e75e9e2bcb9e07dc13ef32dc97083a01a4703c6ba9faf","bytes":633415},{"id":"file.characters.kira.normal.svg","kind":"image","path":"characters/kira/normal.svg","mimeType":"image/svg+xml","sha256":"db4e29ed314e57c624f53c7c2917166ccdc80efcbcab02b211013e7f1aaf90f8","bytes":2912},{"id":"file.characters.lcd.captain.normal.png","kind":"image","path":"characters/lcd_captain/normal.png","mimeType":"image/png","sha256":"30b6ff5afb4d0d754a52546bbc4ae467d517cbb09baf5f4633b0f2cbe5e5a959","bytes":410856},{"id":"file.characters.lce.doctor.normal.png","kind":"image","path":"characters/lce_doctor/normal.png","mimeType":"image/png","sha256":"938fdd640295fdd9c5d98e225696137f48667b140f2649961d6a504976b011f9","bytes":597985},{"id":"file.characters.lucio.normal.svg","kind":"image","path":"characters/lucio/normal.svg","mimeType":"image/svg+xml","sha256":"39f61ef72e599cef8d5e70dbcab010eba95bcc126ea60828b32cfb2dca4ee0ce","bytes":2913},{"id":"file.characters.protagonist.battle.png","kind":"image","path":"characters/protagonist/battle.png","mimeType":"image/png","sha256":"a436e968a646e580f9e6fca88ca9e82615f1a8a05cf68e1c494afe05a594d09f","bytes":656294},{"id":"file.characters.protagonist.battle.svg","kind":"image","path":"characters/protagonist/battle.svg","mimeType":"image/svg+xml","sha256":"2714036a2a99cb87401a0eddf7793708b8b6666149ed2a5b68d43c7e48feec5c","bytes":2916},{"id":"file.characters.protagonist.coat.png","kind":"image","path":"characters/protagonist/coat.png","mimeType":"image/png","sha256":"d0cdfe6a196d9454452818d2383f9b33ce8ef106ae509e532694ef3914f97e2c","bytes":701207},{"id":"file.characters.protagonist.coat.svg","kind":"image","path":"characters/protagonist/coat.svg","mimeType":"image/svg+xml","sha256":"325c15acfe95486379b88ef972deacbda05c36bf81776d5446ca8fb5d74ba07a","bytes":2914},{"id":"file.characters.protagonist.formal.png","kind":"image","path":"characters/protagonist/formal.png","mimeType":"image/png","sha256":"efebe731bf08143f2c8eec7f5ebe82b85c1fb803abe2a51f607ebe7d5da3ab69","bytes":682957},{"id":"file.characters.protagonist.formal.svg","kind":"image","path":"characters/protagonist/formal.svg","mimeType":"image/svg+xml","sha256":"ca1d3e79cebcbda034005fa85a351828355f58e68f40e41d14fe111d6ac19dd2","bytes":2916},{"id":"file.characters.protagonist.injured.png","kind":"image","path":"characters/protagonist/injured.png","mimeType":"image/png","sha256":"a1c76d3d01d85a5fb59d130d0cb6978492a39381d92ccbd050e3fa79b147877f","bytes":633632},{"id":"file.characters.protagonist.injured.svg","kind":"image","path":"characters/protagonist/injured.svg","mimeType":"image/svg+xml","sha256":"0eae48dde7a3858af53f50333970724334f258cf95b2520f3aa4b65066d1d82a","bytes":2917},{"id":"file.characters.protagonist.normal.png","kind":"image","path":"characters/protagonist/normal.png","mimeType":"image/png","sha256":"ef345aaf8817f9d42edee91b15c7593454a8aeacba015d956eb570567d93c42c","bytes":617841},{"id":"file.characters.protagonist.normal.svg","kind":"image","path":"characters/protagonist/normal.svg","mimeType":"image/svg+xml","sha256":"d3e9d5f6683d341ac85b449edc86e31ea8e4b65e809894e1f626917b866ad4f1","bytes":2916},{"id":"file.characters.protagonist.profile.png","kind":"image","path":"characters/protagonist/profile.png","mimeType":"image/png","sha256":"7bebf79d688e6c6beddff75ce5ebb0be542f1b24faf0af2dec4c889fc2f4ea6e","bytes":608664},{"id":"file.characters.protagonist.profile.svg","kind":"image","path":"characters/protagonist/profile.svg","mimeType":"image/svg+xml","sha256":"5de466e68995311d479e51333fc7cbe91a20adf52e9ca096f1e9bb2d9a2bcffc","bytes":2917},{"id":"file.characters.protagonist.resolve.png","kind":"image","path":"characters/protagonist/resolve.png","mimeType":"image/png","sha256":"f084da28bd5b55273519eab6c230bc580e069f7f302cff85d333f43f833684f3","bytes":765412},{"id":"file.characters.protagonist.resolve.svg","kind":"image","path":"characters/protagonist/resolve.svg","mimeType":"image/svg+xml","sha256":"bbd02ce4a997e9ee5beab2ded88f9dffc8306fe51041d006a7306da98affcbf1","bytes":2917},{"id":"file.characters.protagonist.serious.png","kind":"image","path":"characters/protagonist/serious.png","mimeType":"image/png","sha256":"d9fff4f95ed8513b464cd32be5735ec1a3d2b10e581c24a8232ab9a78f81a538","bytes":612296},{"id":"file.characters.protagonist.serious.svg","kind":"image","path":"characters/protagonist/serious.svg","mimeType":"image/svg+xml","sha256":"f1ef84f3803614dccaa639097dca33e17dd3a36dcb59e0d9dd658166ec5d4564","bytes":2917},{"id":"file.characters.protagonist.shadow.png","kind":"image","path":"characters/protagonist/shadow.png","mimeType":"image/png","sha256":"47579ad18953940ceaf00122676a79d3f8618a0057cc1f1f740535df4644a04e","bytes":679619},{"id":"file.characters.protagonist.shadow.svg","kind":"image","path":"characters/protagonist/shadow.svg","mimeType":"image/svg+xml","sha256":"ac87cb2d8726e88b77ae25299ac8759bf167df93e44cd429ef93916d04381e90","bytes":2916},{"id":"file.characters.protagonist.smile.png","kind":"image","path":"characters/protagonist/smile.png","mimeType":"image/png","sha256":"c040495b425c09c2044e86ee2951527dce6145ffb7d41e2c28ae390d39feef24","bytes":681742},{"id":"file.characters.protagonist.smile.svg","kind":"image","path":"characters/protagonist/smile.svg","mimeType":"image/svg+xml","sha256":"8b0900e469b604123c1aa72b0be47464908f5418013720cf5da8801ad7048b69","bytes":2915},{"id":"file.characters.protagonist.tender.png","kind":"image","path":"characters/protagonist/tender.png","mimeType":"image/png","sha256":"1e99e5724db77e7fc536d433980519121cc43740bfc17b4f810444a2681fb214","bytes":693086},{"id":"file.characters.protagonist.tender.svg","kind":"image","path":"characters/protagonist/tender.svg","mimeType":"image/svg+xml","sha256":"23737b94add6d8044d0df61bcbba15f70f3a9d996792e161a6488816c44750d7","bytes":2916},{"id":"file.characters.protagonist.wet.hair.png","kind":"image","path":"characters/protagonist/wet-hair.png","mimeType":"image/png","sha256":"ef02c60087130fba338bd9757c5ea9f045435e60d658450890c6ab5d50699dd5","bytes":702889},{"id":"file.characters.protagonist.wet.hair.svg","kind":"image","path":"characters/protagonist/wet-hair.svg","mimeType":"image/svg+xml","sha256":"b11284a46a2b5211ef413377f08ec31b80edfb80b854046f68066a0dfd369c23","bytes":2918},{"id":"file.characters.ren.normal.png","kind":"image","path":"characters/ren/normal.png","mimeType":"image/png","sha256":"0bd7caac7ae057da27bf86378d17b24ee43a48b958713ece4f8fbf6a79cba6b6","bytes":793467},{"id":"file.characters.ren.normal.svg","kind":"image","path":"characters/ren/normal.svg","mimeType":"image/svg+xml","sha256":"5b6eeb0a73be55028f1c6f349160e9d541cee9e93425d9c150a3bd2f7b791698","bytes":2911},{"id":"file.characters.ring.agent.normal.png","kind":"image","path":"characters/ring_agent/normal.png","mimeType":"image/png","sha256":"71536876e4949ff36037d647f05727bf39bb6bf843b186757aacfcc95bcfe07e","bytes":581593},{"id":"file.characters.ryoshu.normal.svg","kind":"image","path":"characters/ryoshu/normal.svg","mimeType":"image/svg+xml","sha256":"2018187b67ef8f2dfe4d3a97929c2dacc8bc8755efe2e77916cc697e9346fc93","bytes":2914},{"id":"file.characters.sinclair.normal.svg","kind":"image","path":"characters/sinclair/normal.svg","mimeType":"image/svg+xml","sha256":"b507dc70e66ddfee18a0c0fdcfe2722215c23cbbbac048bb4b774718169f5352","bytes":2916},{"id":"file.characters.sora.normal.svg","kind":"image","path":"characters/sora/normal.svg","mimeType":"image/svg+xml","sha256":"939a4d464cd7bee2a0764528981df14b9c9e948ac2673ce659d0c326f04236ad","bytes":2912},{"id":"file.characters.vergilius.normal.png","kind":"image","path":"characters/vergilius/normal.png","mimeType":"image/png","sha256":"a952f7b8042794613c6fdfe7c6e58d7675d06c9c5653ac837247c94b3ab01135","bytes":886285},{"id":"file.characters.vergilius.normal.svg","kind":"image","path":"characters/vergilius/normal.svg","mimeType":"image/svg+xml","sha256":"0c0714c38d9c295f3e8c84aecbb91c757869471fd288093b543ad4ee85da213c","bytes":2917},{"id":"file.characters.yi.sang.normal.png","kind":"image","path":"characters/yi_sang/normal.png","mimeType":"image/png","sha256":"9d18999b8e7b82e957fddd582b9605a5d46deca6bddcb45eb4930d9daaa2393d","bytes":814771},{"id":"file.generated.alpha.sheets.albina.01.png","kind":"image","path":"generated/alpha-sheets/albina_01.png","mimeType":"image/png","sha256":"2290adb83dd7e3bfb2d8cfc1cca5d0603a5d439d93a7bb2c954a190dd5e50b44","bytes":1467607},{"id":"file.generated.alpha.sheets.albina.02.png","kind":"image","path":"generated/alpha-sheets/albina_02.png","mimeType":"image/png","sha256":"687cb237c5231f3d9168196b89e0648d45ab3e57452c029ce091cd13b4ad9ff0","bytes":1494916},{"id":"file.generated.alpha.sheets.albina.03.png","kind":"image","path":"generated/alpha-sheets/albina_03.png","mimeType":"image/png","sha256":"b4959f69bb6d4ce6f45b22075c884f1a954c1b4df1754cf7e3e00b1e00924d4c","bytes":1397534},{"id":"file.generated.alpha.sheets.protagonist.01.png","kind":"image","path":"generated/alpha-sheets/protagonist_01.png","mimeType":"image/png","sha256":"439b657c685a9b21dc5eb98277f76040bda7be8b76049f79dab6852d3e6eb26e","bytes":1037169},{"id":"file.generated.alpha.sheets.protagonist.02.png","kind":"image","path":"generated/alpha-sheets/protagonist_02.png","mimeType":"image/png","sha256":"b5d417f293782cf228f2bf19b324977deda5547109401c5171ea908bfc2e9d62","bytes":1093806},{"id":"file.generated.alpha.sheets.supporting.png","kind":"image","path":"generated/alpha-sheets/supporting.png","mimeType":"image/png","sha256":"39a3570a99611e67490bc4161c97711bf0270c725aba640fffcf8df059176079","bytes":1301881},{"id":"file.sprite.atlas.callisto.normal.strip.png","kind":"image","path":"sprite-atlas/callisto/normal_strip.png","mimeType":"image/png","sha256":"d45214594fe8048be693b4f4ef3b6dd2ff485996d260e89b82c468ef85bb66fa","bytes":3570340},{"id":"file.sprite.atlas.charon.normal.strip.png","kind":"image","path":"sprite-atlas/charon/normal_strip.png","mimeType":"image/png","sha256":"bc8875c1e57ba504ecd61f6b0952f11440829c13607290c397cc94bf0a90efc9","bytes":3129094},{"id":"file.sprite.atlas.dante.normal.strip.png","kind":"image","path":"sprite-atlas/dante/normal_strip.png","mimeType":"image/png","sha256":"1a588b00eec5b542f30e91c9b1f1be1bac50f8f79fd2ebc7ff2a9fa20e558bac","bytes":3287194},{"id":"file.sprite.atlas.faust.normal.strip.png","kind":"image","path":"sprite-atlas/faust/normal_strip.png","mimeType":"image/png","sha256":"712b5327d431689157584249798faf2cbd1dbfc42a245b0b1390207ce28a0a77","bytes":3718801},{"id":"file.sprite.atlas.fixer.informant.normal.strip.png","kind":"image","path":"sprite-atlas/fixer_informant/normal_strip.png","mimeType":"image/png","sha256":"eb32b3dffd3d4cc2bbec142662e0965ec5bde6334476b66f72be4fde65b42cc9","bytes":3222195},{"id":"file.sprite.atlas.golden.apparition.normal.strip.png","kind":"image","path":"sprite-atlas/golden_apparition/normal_strip.png","mimeType":"image/png","sha256":"fbcafb3363f6ab9d06f3f95c1337a3675737d2e0123295f87a5c8705154dee33","bytes":3927065},{"id":"file.sprite.atlas.lcd.captain.normal.strip.png","kind":"image","path":"sprite-atlas/lcd_captain/normal_strip.png","mimeType":"image/png","sha256":"38e07bfb12f420430f7240d715c7f61de84ea815576701719c8f2facd3b02166","bytes":3264020},{"id":"file.sprite.atlas.lce.doctor.normal.strip.png","kind":"image","path":"sprite-atlas/lce_doctor/normal_strip.png","mimeType":"image/png","sha256":"f05fbdcbead14511b2e34cc712715b5582504bf2af17e2e86dbbdb8d146868d1","bytes":3297944},{"id":"file.sprite.atlas.protagonist.battle.strip.png","kind":"image","path":"sprite-atlas/protagonist/battle_strip.png","mimeType":"image/png","sha256":"d3286aaeff322a1267719016000ed283ea1b42badf2878f962ae136b6f8b7fb8","bytes":3165211},{"id":"file.sprite.atlas.protagonist.coat.strip.png","kind":"image","path":"sprite-atlas/protagonist/coat_strip.png","mimeType":"image/png","sha256":"b5806c2fd33ddd2335b8ecf79fe638e1c595c680cb6ad7373b82c0196f2aedbb","bytes":3023731},{"id":"file.sprite.atlas.protagonist.formal.strip.png","kind":"image","path":"sprite-atlas/protagonist/formal_strip.png","mimeType":"image/png","sha256":"89c9540a0dfe2d93dbc9e6d2cadb8bb93411e30957199488307ec9a1128677aa","bytes":2945421},{"id":"file.sprite.atlas.protagonist.injured.strip.png","kind":"image","path":"sprite-atlas/protagonist/injured_strip.png","mimeType":"image/png","sha256":"d5bcb863366b807ef4011c7f781c50c89e41aa47065464c1bcea7361c023ded3","bytes":3274205},{"id":"file.sprite.atlas.protagonist.normal.strip.png","kind":"image","path":"sprite-atlas/protagonist/normal_strip.png","mimeType":"image/png","sha256":"55484d8acc4f36587a84e4448aa8040923c8126107f5a9f8db335d1eeffe3b7f","bytes":3086501},{"id":"file.sprite.atlas.protagonist.profile.strip.png","kind":"image","path":"sprite-atlas/protagonist/profile_strip.png","mimeType":"image/png","sha256":"0620c7a13ae03657aaad952fd67d34376b52807ca50a2445fa7faecd2c34c813","bytes":3391031},{"id":"file.sprite.atlas.protagonist.resolve.strip.png","kind":"image","path":"sprite-atlas/protagonist/resolve_strip.png","mimeType":"image/png","sha256":"905698655d09de75c11fd7266298c5d9c358a7f5ef1439208ab16486765c3afc","bytes":3079167},{"id":"file.sprite.atlas.protagonist.serious.strip.png","kind":"image","path":"sprite-atlas/protagonist/serious_strip.png","mimeType":"image/png","sha256":"2fdbf141f0eeaf5770e51eccd572ccb7656d61286f11d79bd01cc5aa584d1311","bytes":2877761},{"id":"file.sprite.atlas.protagonist.shadow.strip.png","kind":"image","path":"sprite-atlas/protagonist/shadow_strip.png","mimeType":"image/png","sha256":"84afdc243de21b187237e3a2b8886f1c83b84d90bbcc913f623e32d6dc75a3a8","bytes":2881745},{"id":"file.sprite.atlas.protagonist.smile.strip.png","kind":"image","path":"sprite-atlas/protagonist/smile_strip.png","mimeType":"image/png","sha256":"ca025ac7f5d9b087296f431077c6526e578f594511ff98dc6f1b49ca67fc00b3","bytes":3054297},{"id":"file.sprite.atlas.protagonist.tender.strip.png","kind":"image","path":"sprite-atlas/protagonist/tender_strip.png","mimeType":"image/png","sha256":"cfc900db01d60e931b55c5c0921cc9dfdaf7d1f91af529ee4d96e964c4dab6b7","bytes":2946077},{"id":"file.sprite.atlas.protagonist.wet.hair.strip.png","kind":"image","path":"sprite-atlas/protagonist/wet-hair_strip.png","mimeType":"image/png","sha256":"ad2cdd374474a8fb05dc74bd47c0602b890b3e0f8ed6f42af5a6c6e9e72e55b1","bytes":3018208},{"id":"file.sprite.atlas.ren.normal.strip.png","kind":"image","path":"sprite-atlas/ren/normal_strip.png","mimeType":"image/png","sha256":"b1ab709df36557c1c92d5f7f74103050302bf274be9872bc3e53a67d811c6f20","bytes":3325824},{"id":"file.sprite.atlas.ring.agent.normal.strip.png","kind":"image","path":"sprite-atlas/ring_agent/normal_strip.png","mimeType":"image/png","sha256":"1433fcc31f67fb58731739cfec7738b3686f770b4c8f7219975003b8f0ad9280","bytes":3142702},{"id":"file.sprite.atlas.vergilius.normal.strip.png","kind":"image","path":"sprite-atlas/vergilius/normal_strip.png","mimeType":"image/png","sha256":"bc94c7bf3b146bc9171ff07633468b49c9ebeb58ca013d9e37b0ff3bec93e0f2","bytes":3721980},{"id":"file.sprite.atlas.yi.sang.normal.strip.png","kind":"image","path":"sprite-atlas/yi_sang/normal_strip.png","mimeType":"image/png","sha256":"cb35289ae216903f3c9b8727c01a37054eb8bd661edada48fe3e51e50be2edee","bytes":3081862},{"id":"file.ui.choice.button.svg","kind":"image","path":"ui/choice_button.svg","mimeType":"image/svg+xml","sha256":"6301a268c0d874185842cecba0acee7c99f4c29e8caba5203cd1ceb6e3b0cea5","bytes":1645},{"id":"file.ui.gallery.frame.svg","kind":"image","path":"ui/gallery_frame.svg","mimeType":"image/svg+xml","sha256":"19bf13a6c6a24a90a7372e98e422b5911a5eb63b870e2bd546f07d80439fc854","bytes":1646},{"id":"file.ui.menu.plate.svg","kind":"image","path":"ui/menu_plate.svg","mimeType":"image/svg+xml","sha256":"d8c0d45b6abdff52651712ec4dbb30736d61939563ccf920995d330475925d7d","bytes":1643},{"id":"file.ui.scanline.mask.svg","kind":"image","path":"ui/scanline_mask.svg","mimeType":"image/svg+xml","sha256":"8ca0f95223f6e523626d09a5e09dbca55f90687728e6fc23f15b28c3f6fdc4af","bytes":1645},{"id":"file.ui.status.panel.svg","kind":"image","path":"ui/status_panel.svg","mimeType":"image/svg+xml","sha256":"93e422a5c871f4bb7b8ec4965e04d3b5501da1117d81942f034479dd8a5dbd36","bytes":1645},{"id":"file.ui.textbox.svg","kind":"image","path":"ui/textbox.svg","mimeType":"image/svg+xml","sha256":"87eca356e01c43e6b571db16ec84b33fabe92697d62c251ffb9a0c5b33858b39","bytes":1655},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"file.video.animated.desktop.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"file.video.animated.desktop.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"file.video.animated.desktop.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"file.video.animated.desktop.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"file.video.animated.desktop.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"file.video.animated.desktop.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"file.video.animated.desktop.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"file.video.animated.desktop.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"file.video.animated.desktop.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"file.video.animated.desktop.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"file.video.animated.desktop.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"file.video.animated.desktop.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"file.video.animated.desktop.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"file.video.animated.desktop.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"file.video.animated.desktop.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"file.video.animated.desktop.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"file.video.animated.desktop.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"file.video.animated.desktop.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.bad.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.normal.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"file.video.animated.runtime.golden.bough.rebuild.ending.true.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.11.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.15.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.3.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.5.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"file.video.animated.runtime.golden.bough.rebuild.scene.8.mp4","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"file.video.animated.runtime.ring.conspiracy.ending.bad.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"file.video.animated.runtime.ring.conspiracy.ending.normal.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"file.video.animated.runtime.ring.conspiracy.ending.true.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"file.video.animated.runtime.ring.conspiracy.scene.11.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"file.video.animated.runtime.ring.conspiracy.scene.15.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"file.video.animated.runtime.ring.conspiracy.scene.3.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"file.video.animated.runtime.ring.conspiracy.scene.5.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"file.video.animated.runtime.ring.conspiracy.scene.8.mp4","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"file.video.animated.runtime.white.canvas.ending.bad.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"file.video.animated.runtime.white.canvas.ending.normal.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"file.video.animated.runtime.white.canvas.ending.true.mp4","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"file.video.animated.runtime.white.canvas.scene.11.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"file.video.animated.runtime.white.canvas.scene.15.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"file.video.animated.runtime.white.canvas.scene.3.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"file.video.animated.runtime.white.canvas.scene.5.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"file.video.animated.runtime.white.canvas.scene.8.mp4","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"video.animated.desktop.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"665342bfcf45187bc05fead1ed445b2e7f3e1fb37154aefb507009f7c9423207","bytes":5733582},{"id":"video.animated.desktop.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"9ec5e0bd56b9b033b793f0b13f52c728ea195b162fe23159c9f2acb5c87e6ffe","bytes":5654162},{"id":"video.animated.desktop.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"af8899f54f80600b8bd0ba02c30627ed2c10783a2e2a9a7aa59f82328f3fe3a2","bytes":6441698},{"id":"video.animated.desktop.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"a98d68c9ee81056f22437cf0e66c78ad4cc4d6004a5365ca51110d9067ec976f","bytes":4268715},{"id":"video.animated.desktop.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"510afcd7f1c27b0a4f9abc44e82bae92bd9b3436c73b261de985887a1585ee5a","bytes":4216527},{"id":"video.animated.desktop.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"cb5c7a63f0e068b4d1c0b4047763f46b13b30b48f9808523c8fb67e7f6415b53","bytes":4336441},{"id":"video.animated.desktop.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"f5069cb9aebe21b4bc41545e74b2f4a1c6e5aeb27f9b7f5e08b2c5fc5274cfd4","bytes":5039163},{"id":"video.animated.desktop.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/desktop/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"56176731dc6ccc9892bfc7e7163bb736f5f662226910235a38d28117eaa817bd","bytes":5167077},{"id":"video.animated.desktop.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"bfec2285572943ba48b8802de82715c34e734d3d7d6c8e6884a625f9f4c92778","bytes":6094767},{"id":"video.animated.desktop.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"566ceca8679dd52192a9799090e9f886daa3bace30e412194a108a27fd3fe853","bytes":6301387},{"id":"video.animated.desktop.ring_conspiracy_ending_true","kind":"video","path":"video/animated/desktop/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"c945fb3562fbec8ba6bfba6ef10a73093c23dd530a551da7e2b1cd98bbe1093f","bytes":6156384},{"id":"video.animated.desktop.ring_conspiracy_scene_11","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"b5740b4216b387d9b6727ec3b03b74c2946c6ad1bbd0d2775693f0b73ae97177","bytes":4316911},{"id":"video.animated.desktop.ring_conspiracy_scene_15","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"9574f17e8508b66848012e1b88e25a933cea64721d2605c806db3b59c11862ef","bytes":4755598},{"id":"video.animated.desktop.ring_conspiracy_scene_3","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"42ec46e059405f1be4ea1b274cd521eb5f1f1c41b520314fca44bfc951b1823d","bytes":5108387},{"id":"video.animated.desktop.ring_conspiracy_scene_5","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"3b819372d1fd9c752159286998407a266f0aafdc95195cab7eb4cd7e182fb86c","bytes":5735950},{"id":"video.animated.desktop.ring_conspiracy_scene_8","kind":"video","path":"video/animated/desktop/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"732fdcda28570fb7d481767b46d4cf751e771dddab1597baeb7cb659fdaedf83","bytes":5699635},{"id":"video.animated.desktop.white_canvas_ending_bad","kind":"video","path":"video/animated/desktop/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"93cd772af7a5e2b378b4dc0772d84a53feed7ef450c97082b431ab8802b61b80","bytes":6060788},{"id":"video.animated.desktop.white_canvas_ending_normal","kind":"video","path":"video/animated/desktop/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"4e5f5ebd2cf3799429539538971be9fbc6936e5163271e3779dbd1383076621b","bytes":5326928},{"id":"video.animated.desktop.white_canvas_ending_true","kind":"video","path":"video/animated/desktop/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"a4422751cdf6be2191b39e7ea0d3a85e6edc215e7348d050e4f1ab63c2d5677d","bytes":7228337},{"id":"video.animated.desktop.white_canvas_scene_11","kind":"video","path":"video/animated/desktop/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a2619096252787ec30101ba5feeaf0dda06d7f318bcdac080ab4ba0aa9568e12","bytes":5294302},{"id":"video.animated.desktop.white_canvas_scene_15","kind":"video","path":"video/animated/desktop/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"5ec29acf9df1f18494609471eddf5de221f2411acc986c6168bb9369494ad5ae","bytes":4505329},{"id":"video.animated.desktop.white_canvas_scene_3","kind":"video","path":"video/animated/desktop/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"50a48863359fff18e8f7fff87dfd808ae025d91179321688bc0353743887f1fd","bytes":5346356},{"id":"video.animated.desktop.white_canvas_scene_5","kind":"video","path":"video/animated/desktop/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"61555b7011baa029652d9304d86b7b712bab75d6f0b26b2860db578587f0a343","bytes":5230805},{"id":"video.animated.desktop.white_canvas_scene_8","kind":"video","path":"video/animated/desktop/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"8786be555709f223064e4e4853e175b1b33c8b9eb2012f0081897f59d36798df","bytes":4854170},{"id":"video.animated.runtime.golden_bough_rebuild_ending_bad","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_bad.mp4","mimeType":"video/mp4","sha256":"2af1ba03d1a26ef0e96260cec4474578bfc692c79d8a125fc4524ae22d3d8688","bytes":3012453},{"id":"video.animated.runtime.golden_bough_rebuild_ending_normal","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_normal.mp4","mimeType":"video/mp4","sha256":"c7b76d353c27b8b61d5b08fffbdeb96f08502f321f9f00975cb3cefc289c54a2","bytes":3238393},{"id":"video.animated.runtime.golden_bough_rebuild_ending_true","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_ending_true.mp4","mimeType":"video/mp4","sha256":"04e46ecdbb3d51e881115671f0fe742e62268a7fced794974f15731fff8eb8f9","bytes":3603061},{"id":"video.animated.runtime.golden_bough_rebuild_scene_11","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_11.mp4","mimeType":"video/mp4","sha256":"e90196bc46e73f0a120aa895c548dc2b107f604ad300eba8c6109c287bb0f67d","bytes":2528370},{"id":"video.animated.runtime.golden_bough_rebuild_scene_15","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_15.mp4","mimeType":"video/mp4","sha256":"e08b3d96a184c441975dbf1bac7566d10e720ea82eb517c090aee948fc601dfa","bytes":2353207},{"id":"video.animated.runtime.golden_bough_rebuild_scene_3","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_3.mp4","mimeType":"video/mp4","sha256":"fc7361fdf237dd21e876149aea4950496f28f918747b0aba62713113543b3a07","bytes":2477070},{"id":"video.animated.runtime.golden_bough_rebuild_scene_5","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_5.mp4","mimeType":"video/mp4","sha256":"d901739424d56709c632bfb61b395d0874c0b279f20578e0485c1ce5697f5b95","bytes":2926949},{"id":"video.animated.runtime.golden_bough_rebuild_scene_8","kind":"video","path":"video/animated/runtime/golden_bough_rebuild_scene_8.mp4","mimeType":"video/mp4","sha256":"dc3b1cce4d43093e240e390a2f3209228ffa73a2041e89ae292e0790d66118ed","bytes":2797722},{"id":"video.animated.runtime.ring_conspiracy_ending_bad","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_bad.mp4","mimeType":"video/mp4","sha256":"0cf0ac007c3e1ebd37862e02146d137117838c9530fead20611ec4b179a2d079","bytes":3519338},{"id":"video.animated.runtime.ring_conspiracy_ending_normal","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_normal.mp4","mimeType":"video/mp4","sha256":"78b95f376a8fe4851309af86231c18fac0d870baa6294fbc14126face05095b3","bytes":3401115},{"id":"video.animated.runtime.ring_conspiracy_ending_true","kind":"video","path":"video/animated/runtime/ring_conspiracy_ending_true.mp4","mimeType":"video/mp4","sha256":"986917f0fe50af48c6f7a150561e48c226f992e2429c789fc6ce4ea6e1e3f346","bytes":3567238},{"id":"video.animated.runtime.ring_conspiracy_scene_11","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_11.mp4","mimeType":"video/mp4","sha256":"7a4911e99e2bea1509d9cc44836a2fd1d855d0b3f0ff14713265efd5bcfcec9f","bytes":2400055},{"id":"video.animated.runtime.ring_conspiracy_scene_15","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_15.mp4","mimeType":"video/mp4","sha256":"115b2505bc82d8e98b236556e5b709b468346c4c197fdcbb51dd1887db9f6f69","bytes":2591243},{"id":"video.animated.runtime.ring_conspiracy_scene_3","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_3.mp4","mimeType":"video/mp4","sha256":"a7481f6b1a6811072cc09b1bbd5ac639f6faa11e9041531d50b220ed1442a6e8","bytes":2674192},{"id":"video.animated.runtime.ring_conspiracy_scene_5","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_5.mp4","mimeType":"video/mp4","sha256":"65db5a7e97fab0ccfcc26e4ae078b86f2016ad16eef0ade738f005a49969f4aa","bytes":3100461},{"id":"video.animated.runtime.ring_conspiracy_scene_8","kind":"video","path":"video/animated/runtime/ring_conspiracy_scene_8.mp4","mimeType":"video/mp4","sha256":"6fc2c2c0155ff68915d0ffc2a97f68d5a66b84857745826967ff64c3fbe384ac","bytes":3009439},{"id":"video.animated.runtime.white_canvas_ending_bad","kind":"video","path":"video/animated/runtime/white_canvas_ending_bad.mp4","mimeType":"video/mp4","sha256":"b3b101dde3f85be5b68657b66ecfc1b02d0d6c42cf70ba30e516ef1ff010473c","bytes":3336544},{"id":"video.animated.runtime.white_canvas_ending_normal","kind":"video","path":"video/animated/runtime/white_canvas_ending_normal.mp4","mimeType":"video/mp4","sha256":"c62b1344da7cb5a4b3fc2b3c144d815970eab741f818771bbc750f4248852f08","bytes":2756449},{"id":"video.animated.runtime.white_canvas_ending_true","kind":"video","path":"video/animated/runtime/white_canvas_ending_true.mp4","mimeType":"video/mp4","sha256":"454767d2595ad285ada75c920eeb5974626471930549e840669ffd2d856e9d37","bytes":3932490},{"id":"video.animated.runtime.white_canvas_scene_11","kind":"video","path":"video/animated/runtime/white_canvas_scene_11.mp4","mimeType":"video/mp4","sha256":"a25ef4770934afd8cc6fc6bab08167a4aa1594fdb301edd1914411438eb01b93","bytes":2890842},{"id":"video.animated.runtime.white_canvas_scene_15","kind":"video","path":"video/animated/runtime/white_canvas_scene_15.mp4","mimeType":"video/mp4","sha256":"f5226beecc7be5275123f7cc6a91a1b58f74e831d020a788ac52a1015c9c6c2e","bytes":2537450},{"id":"video.animated.runtime.white_canvas_scene_3","kind":"video","path":"video/animated/runtime/white_canvas_scene_3.mp4","mimeType":"video/mp4","sha256":"e7d8746ec4825f0f496c2106e5c1d7862b8a00246e3109574946ccbef5be5ac7","bytes":3030226},{"id":"video.animated.runtime.white_canvas_scene_5","kind":"video","path":"video/animated/runtime/white_canvas_scene_5.mp4","mimeType":"video/mp4","sha256":"8d154e505624dde023f61510cd6cc25337ef23f43190728e72034d85806a3569","bytes":2971914},{"id":"video.animated.runtime.white_canvas_scene_8","kind":"video","path":"video/animated/runtime/white_canvas_scene_8.mp4","mimeType":"video/mp4","sha256":"ba894e5efb361a9bf52c1d5b45ec2b04ed552b4024f3e8c1fd3cf54830c8f899","bytes":2685560},{"id":"voice.result.conspiracy_005_let_her_answer","kind":"audio","path":"audio/voice/result/conspiracy_005_let_her_answer.mp3","mimeType":"audio/mpeg","sha256":"548667e2e8d97d86d68959d8c7ee94e2d81570f13ba597501c7ffeb569832526","bytes":218292},{"id":"voice.result.conspiracy_005_refuse_duo","kind":"audio","path":"audio/voice/result/conspiracy_005_refuse_duo.mp3","mimeType":"audio/mpeg","sha256":"f03cd8e5cf332108df089065f72c50b9184de7a5724dac60ee57595047802769","bytes":225780},{"id":"voice.result.conspiracy_006_block_view","kind":"audio","path":"audio/voice/result/conspiracy_006_block_view.mp3","mimeType":"audio/mpeg","sha256":"8b1422137db20ab49eabed7bd28bc2849dfe37ea073dd5ee6f212ff0e20a70ac","bytes":290292},{"id":"voice.result.conspiracy_006_stand_with_her","kind":"audio","path":"audio/voice/result/conspiracy_006_stand_with_her.mp3","mimeType":"audio/mpeg","sha256":"20e2c48a0ce12a926636936548d42fbf11727ef7a000a1595eeff797a6c09f8b","bytes":300660},{"id":"voice.result.conspiracy_007_break_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_break_frame.mp3","mimeType":"audio/mpeg","sha256":"871e78d300f8278a232ba010d7b427867a64467fb8e27d365e7d4e62edfd926e","bytes":233844},{"id":"voice.result.conspiracy_007_seize_frame","kind":"audio","path":"audio/voice/result/conspiracy_007_seize_frame.mp3","mimeType":"audio/mpeg","sha256":"d08785dfa3e8c3517977a6d6bf9c1512e010a58cf5b35eecc2eb821cc81dc33e","bytes":271284},{"id":"voice.result.conspiracy_008_hand_pen_to_her","kind":"audio","path":"audio/voice/result/conspiracy_008_hand_pen_to_her.mp3","mimeType":"audio/mpeg","sha256":"d8e813e7ebdbeb0f6110e70a2bb7a5a52bce8da57e5f8d09f2ff372d0c30d418","bytes":242484},{"id":"voice.result.conspiracy_008_refuse_testimony","kind":"audio","path":"audio/voice/result/conspiracy_008_refuse_testimony.mp3","mimeType":"audio/mpeg","sha256":"d5ca8cee4ee30db158d885deb2604fa78bb33c832d7743a030fbc2133d63efb7","bytes":229812},{"id":"voice.result.conspiracy_009_choose_present","kind":"audio","path":"audio/voice/result/conspiracy_009_choose_present.mp3","mimeType":"audio/mpeg","sha256":"d255a37065cb040862cbb36fd595af444fd8506e6c351a9b0fddce3e3843caa5","bytes":287988},{"id":"voice.result.conspiracy_009_refuse_choice","kind":"audio","path":"audio/voice/result/conspiracy_009_refuse_choice.mp3","mimeType":"audio/mpeg","sha256":"d84f22e0be4599542ae4608dbd3d6d570a23c37fbc05ec358baf82bd5866147e","bytes":306420},{"id":"voice.result.conspiracy_010_keep_badge_unworn","kind":"audio","path":"audio/voice/result/conspiracy_010_keep_badge_unworn.mp3","mimeType":"audio/mpeg","sha256":"2ba5efee14ce0ffd8bddacac3a707d23e20f2bd2fcab2103cd3890cc11cfc33c","bytes":263796},{"id":"voice.result.conspiracy_010_throw_badge","kind":"audio","path":"audio/voice/result/conspiracy_010_throw_badge.mp3","mimeType":"audio/mpeg","sha256":"6a78bf8c769c7296815b0eb02fb01769e0d15aa7754ed0ea72096041c683153b","bytes":260916},{"id":"voice.result.conspiracy_011_burn_film","kind":"audio","path":"audio/voice/result/conspiracy_011_burn_film.mp3","mimeType":"audio/mpeg","sha256":"785b0204dfb11fe1882f188366acaf80f6cdd88836e81bb162d4c19c09b750b6","bytes":243636},{"id":"voice.result.conspiracy_011_rewrite_ending","kind":"audio","path":"audio/voice/result/conspiracy_011_rewrite_ending.mp3","mimeType":"audio/mpeg","sha256":"8b9f5b34fc073979f154a9a87293de86ebaaeba56f89e568eded54a61d3ea343","bytes":238452},{"id":"voice.result.conspiracy_012_end_tonight","kind":"audio","path":"audio/voice/result/conspiracy_012_end_tonight.mp3","mimeType":"audio/mpeg","sha256":"ce0871f2f82b8d758e989219d1951c4cd0edf1036e8fe7bca19d3ea3abcbcd86","bytes":277620},{"id":"voice.result.conspiracy_012_keep_blade","kind":"audio","path":"audio/voice/result/conspiracy_012_keep_blade.mp3","mimeType":"audio/mpeg","sha256":"57c8336c5692d6725fa5fe110f82307674ff12f413e167b5ac3281bb0c22c554","bytes":273588},{"id":"voice.result.conspiracy_013_hold_one_second","kind":"audio","path":"audio/voice/result/conspiracy_013_hold_one_second.mp3","mimeType":"audio/mpeg","sha256":"97ad5295330dd4e4c20f60e667c94efa825b06a06ecb6e577ac621080a5a16d9","bytes":254004},{"id":"voice.result.conspiracy_013_return_gently","kind":"audio","path":"audio/voice/result/conspiracy_013_return_gently.mp3","mimeType":"audio/mpeg","sha256":"b0c4e5d6af73a4728f850b33cb5cb9db51e06598642b52410b2f4e2faf90d076","bytes":269556},{"id":"voice.result.conspiracy_014_erase_from_catalog","kind":"audio","path":"audio/voice/result/conspiracy_014_erase_from_catalog.mp3","mimeType":"audio/mpeg","sha256":"f4a479901d65888eea4634ae1ea8a156024e84b705595187a28a32e4d8a008b4","bytes":283956},{"id":"voice.result.conspiracy_014_keep_one_line","kind":"audio","path":"audio/voice/result/conspiracy_014_keep_one_line.mp3","mimeType":"audio/mpeg","sha256":"4734a1cc33e33ff06799ee86d66763782127c8ea2acaff03a12b59e86e6b0a60","bytes":289716},{"id":"voice.result.conspiracy_accept","kind":"audio","path":"audio/voice/result/conspiracy_accept.mp3","mimeType":"audio/mpeg","sha256":"4b76303e8e34898103631f630d182d820b1c5b4f08cc19105df3778e8adfcc8f","bytes":242484},{"id":"voice.result.conspiracy_break_pursuit_frame","kind":"audio","path":"audio/voice/result/conspiracy_break_pursuit_frame.mp3","mimeType":"audio/mpeg","sha256":"3597acb7210a208c020fb28c0fb1c7c63e595fac7b419da1355556960e70570a","bytes":237876},{"id":"voice.result.conspiracy_escape_to_backstreets","kind":"audio","path":"audio/voice/result/conspiracy_escape_to_backstreets.mp3","mimeType":"audio/mpeg","sha256":"0fd19a0ac7085d583a8178d38c071804d60a9be3c1363b26f62e31ef34a5b15e","bytes":263796},{"id":"voice.result.conspiracy_feed_false_signature","kind":"audio","path":"audio/voice/result/conspiracy_feed_false_signature.mp3","mimeType":"audio/mpeg","sha256":"a10423e4201744e3f64d594cb8948c4f2fca578cb88fcaa2f865839235035525","bytes":240756},{"id":"voice.result.conspiracy_pressure","kind":"audio","path":"audio/voice/result/conspiracy_pressure.mp3","mimeType":"audio/mpeg","sha256":"0e165916d831f3aab506621939c657e90f4fa282a6fb212061143a82e6ccfebe","bytes":210804},{"id":"voice.result.golden_bough_rebuild.bad_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"401c2bf97a19b9d9cc0a68bd7c9f9d1e85ce99d5a378d8b5f21449266fdc1417","bytes":115764},{"id":"voice.result.golden_bough_rebuild.normal_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"d1161b5a7e0cbff976cc5e32b470d3439b738c3acf20fd59eeff3086f84bbc2d","bytes":112884},{"id":"voice.result.golden_bough_rebuild.true_ending","kind":"audio","path":"audio/voice/result/golden_bough_rebuild/true_ending.mp3","mimeType":"audio/mpeg","sha256":"148ae12e5af697470bf05597480564d896ee6084c08442ee66e368a783d965f6","bytes":105972},{"id":"voice.result.golden_bough_route_complete","kind":"audio","path":"audio/voice/result/golden_bough_route_complete.mp3","mimeType":"audio/mpeg","sha256":"e457029e4b26e12174ecf9c30212c573f3d7693c0d73f686506bde427ba00de7","bytes":331188},{"id":"voice.result.golden_bough_route_final","kind":"audio","path":"audio/voice/result/golden_bough_route_final.mp3","mimeType":"audio/mpeg","sha256":"ff10f8673bd0fe23c51936ce4bf55414ab4544224ca0f2d244709ae15cda54b0","bytes":143988},{"id":"voice.result.rebuild_006_keep_silent_anchor","kind":"audio","path":"audio/voice/result/rebuild_006_keep_silent_anchor.mp3","mimeType":"audio/mpeg","sha256":"ea553da520b4f2af20f6ef09f831f0115fb3c299bca2acb125cbbba3825e6a65","bytes":269556},{"id":"voice.result.rebuild_006_read_aloud","kind":"audio","path":"audio/voice/result/rebuild_006_read_aloud.mp3","mimeType":"audio/mpeg","sha256":"1ba8b1e99c835f51e83566218b0831472cae6f8b9bed544379008edfb98ed56e","bytes":270708},{"id":"voice.result.rebuild_007_match_her_pulse","kind":"audio","path":"audio/voice/result/rebuild_007_match_her_pulse.mp3","mimeType":"audio/mpeg","sha256":"e6454ff8fee875b9f2634d84ab7ebce1be09e030812ccdd916aa291b8a9e69d6","bytes":295476},{"id":"voice.result.rebuild_007_stay_own_rhythm","kind":"audio","path":"audio/voice/result/rebuild_007_stay_own_rhythm.mp3","mimeType":"audio/mpeg","sha256":"03ff1752e22f90ffd73af641d1d182688d3a349c9778079c5fb9217eee4a86d3","bytes":305268},{"id":"voice.result.rebuild_008_protect_current_self","kind":"audio","path":"audio/voice/result/rebuild_008_protect_current_self.mp3","mimeType":"audio/mpeg","sha256":"87637a730ba4bcfaf94708a85f427bd8225fb3f123b2674df47fc6b14de306ac","bytes":274164},{"id":"voice.result.rebuild_008_trade_old_memory","kind":"audio","path":"audio/voice/result/rebuild_008_trade_old_memory.mp3","mimeType":"audio/mpeg","sha256":"d94505f65341fd2877cdbf6ddcd0067ed716314330df879113e4d306ee5b76fd","bytes":271860},{"id":"voice.result.rebuild_009_hand_question_back","kind":"audio","path":"audio/voice/result/rebuild_009_hand_question_back.mp3","mimeType":"audio/mpeg","sha256":"8b29cf1086c02e716ed0cff07536f363d83101916d10fa4ca5e627b649b9527b","bytes":270132},{"id":"voice.result.rebuild_009_refuse_perfect_copy","kind":"audio","path":"audio/voice/result/rebuild_009_refuse_perfect_copy.mp3","mimeType":"audio/mpeg","sha256":"a70c9a8ad345295ae5d861bbe5dfba1f6467cc8fa60194e0bac35848edabbd97","bytes":267252},{"id":"voice.result.rebuild_010_ask_her_choice","kind":"audio","path":"audio/voice/result/rebuild_010_ask_her_choice.mp3","mimeType":"audio/mpeg","sha256":"5cecd7509b4d42b4e7c3e7ba0309b53b302c9ee88bf2255bc793be78a802a182","bytes":226932},{"id":"voice.result.rebuild_010_veto_sealing","kind":"audio","path":"audio/voice/result/rebuild_010_veto_sealing.mp3","mimeType":"audio/mpeg","sha256":"5f46716f6a5efc4287c341a0d2b8f02c311a8c1109bf19a519f3e391069a6eb2","bytes":232692},{"id":"voice.result.rebuild_011_ask_next_revision","kind":"audio","path":"audio/voice/result/rebuild_011_ask_next_revision.mp3","mimeType":"audio/mpeg","sha256":"eae27a33c8bc3fe8decead1165d83cb94521f45594f102bf4e5574da3b6f09ec","bytes":292020},{"id":"voice.result.rebuild_011_sit_beside","kind":"audio","path":"audio/voice/result/rebuild_011_sit_beside.mp3","mimeType":"audio/mpeg","sha256":"ee92eac2d9efee09aa05e29d4ff482d9631ccce9526f11a92cb55f4e6ebe155e","bytes":290868},{"id":"voice.result.rebuild_012_break_contract","kind":"audio","path":"audio/voice/result/rebuild_012_break_contract.mp3","mimeType":"audio/mpeg","sha256":"2cb0663dd3c9d2d7b5413424443f2a9bd48002e251075355d36762b9371e3409","bytes":251700},{"id":"voice.result.rebuild_012_negotiate_terms","kind":"audio","path":"audio/voice/result/rebuild_012_negotiate_terms.mp3","mimeType":"audio/mpeg","sha256":"ab0f098d13994e6c429414e506450988dbd84476294cbd3c3749cd7b64fd4ed3","bytes":268980},{"id":"voice.result.rebuild_013_offer_witness","kind":"audio","path":"audio/voice/result/rebuild_013_offer_witness.mp3","mimeType":"audio/mpeg","sha256":"8d44e5907f85e91235c1eed2e9ee6ceacc12dd90599663ebe4bdec64f9fb6dfd","bytes":254004},{"id":"voice.result.rebuild_013_promise_name","kind":"audio","path":"audio/voice/result/rebuild_013_promise_name.mp3","mimeType":"audio/mpeg","sha256":"ad4b896e8b63255b97863d25448f39d4578377b9948343a3b031f492095e3fe3","bytes":255156},{"id":"voice.result.rebuild_014_ask_when_to_light","kind":"audio","path":"audio/voice/result/rebuild_014_ask_when_to_light.mp3","mimeType":"audio/mpeg","sha256":"1b73267ccef887754b17298559c75c4ba9df218ed3b0a3adeac6da618b622c6a","bytes":286260},{"id":"voice.result.rebuild_014_keep_unlit","kind":"audio","path":"audio/voice/result/rebuild_014_keep_unlit.mp3","mimeType":"audio/mpeg","sha256":"22cea221f68bea9a01b9d7c8a7ea493c244207b3124736403c748cad98190ac2","bytes":292596},{"id":"voice.result.rebuild_accept_missing_pieces","kind":"audio","path":"audio/voice/result/rebuild_accept_missing_pieces.mp3","mimeType":"audio/mpeg","sha256":"e03509c235adbf1a35a69fa967081effe4a8cb7b07a4106de677cec1454a3028","bytes":243636},{"id":"voice.result.rebuild_anchor","kind":"audio","path":"audio/voice/result/rebuild_anchor.mp3","mimeType":"audio/mpeg","sha256":"77023f3ec1210d3f0394848656ed18629a5922d124437b97bc97733e55e6c2f7","bytes":162420},{"id":"voice.result.rebuild_cut_false_completion","kind":"audio","path":"audio/voice/result/rebuild_cut_false_completion.mp3","mimeType":"audio/mpeg","sha256":"455fed571cb5502968a46e4404e566db5821199fb9b3140c33c1066d155144a1","bytes":250548},{"id":"voice.result.rebuild_guard_fascia_pulse","kind":"audio","path":"audio/voice/result/rebuild_guard_fascia_pulse.mp3","mimeType":"audio/mpeg","sha256":"5d3946116f8d9d848ea408b9a1f7ef1323642158fb0f94e9a5d10c56312627e7","bytes":265524},{"id":"voice.result.rebuild_push_into_raid","kind":"audio","path":"audio/voice/result/rebuild_push_into_raid.mp3","mimeType":"audio/mpeg","sha256":"10bb250cf7e3efa4c99fde65bf46d3ea7d6c6b9d037b1c2f6652cbbb94acd8ce","bytes":274164},{"id":"voice.result.rebuild_question_fascia","kind":"audio","path":"audio/voice/result/rebuild_question_fascia.mp3","mimeType":"audio/mpeg","sha256":"f5e64cd027912ac0ca2b77f53770bd645c962c850f453fe35d0c5f7d6aaa9e5c","bytes":156660},{"id":"voice.result.rebuild_use_rooftop_signal","kind":"audio","path":"audio/voice/result/rebuild_use_rooftop_signal.mp3","mimeType":"audio/mpeg","sha256":"2d30e89069b6559c1809749d8547b5e773d5af9fc86771b004fa82ff96ae8aea","bytes":237300},{"id":"voice.result.return_opening_from_rebuild","kind":"audio","path":"audio/voice/result/return_opening_from_rebuild.mp3","mimeType":"audio/mpeg","sha256":"93831e44f51a1755332b620bab795b5a6501bd2310dfe860e65d1de97f796dde","bytes":191220},{"id":"voice.result.return_opening_from_ring","kind":"audio","path":"audio/voice/result/return_opening_from_ring.mp3","mimeType":"audio/mpeg","sha256":"07b6250f478559c01e05511edda03d37c45df65b9e1848f22cebc16447bdc421","bytes":195252},{"id":"voice.result.return_opening_from_white","kind":"audio","path":"audio/voice/result/return_opening_from_white.mp3","mimeType":"audio/mpeg","sha256":"f909503358a31908b759dbb172165b49e77d3800c6b5e9beb5355bbecd675c37","bytes":202164},{"id":"voice.result.ring_conspiracy_route_complete","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_complete.mp3","mimeType":"audio/mpeg","sha256":"a99d59529f481835f600f61c3114fe5cebde2048f8e411be418998a0a3787f75","bytes":283956},{"id":"voice.result.ring_conspiracy_route_final","kind":"audio","path":"audio/voice/result/ring_conspiracy_route_final.mp3","mimeType":"audio/mpeg","sha256":"c05b719a61ea2e4fd6ce58109fc2fdb2f48f6bb14415dc64df970630a3162ac0","bytes":156660},{"id":"voice.result.ring_conspiracy.bad_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"07d729c94f10eff159215f464fcf8f4f7fa136caeab4696bc08649018756fb90","bytes":104820},{"id":"voice.result.ring_conspiracy.normal_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"38d39f3de6f911a09b947cd966e164cd61cbc8a40835bf4b9e94292efdd721e9","bytes":127284},{"id":"voice.result.ring_conspiracy.true_ending","kind":"audio","path":"audio/voice/result/ring_conspiracy/true_ending.mp3","mimeType":"audio/mpeg","sha256":"de2fab869c900b3cadd4c282f7639c70b8e4ca137d77ec8f7edbd815e58f7257","bytes":112884},{"id":"voice.result.white_006_name_silence","kind":"audio","path":"audio/voice/result/white_006_name_silence.mp3","mimeType":"audio/mpeg","sha256":"60f67a987b75e4212e1dc7f7c3d26cabaf7d85be1701495c9ac196717031ec70","bytes":282804},{"id":"voice.result.white_006_refuse_naming","kind":"audio","path":"audio/voice/result/white_006_refuse_naming.mp3","mimeType":"audio/mpeg","sha256":"3b1c115c0521def49f44bd8749fcc28bb23dd6a991c51395f5eb56a01ff95510","bytes":286836},{"id":"voice.result.white_007_ask_fascia_term","kind":"audio","path":"audio/voice/result/white_007_ask_fascia_term.mp3","mimeType":"audio/mpeg","sha256":"a0820e12083e03fd2655fe43f94addc8188a51407e91916405a7596ebb69e55e","bytes":289716},{"id":"voice.result.white_007_keep_mirror_open","kind":"audio","path":"audio/voice/result/white_007_keep_mirror_open.mp3","mimeType":"audio/mpeg","sha256":"60711ca2e8a0be22f5c442c2abb3bdb0587f492199a6ce827fc3d8965926f79e","bytes":270132},{"id":"voice.result.white_008_hold_fascia","kind":"audio","path":"audio/voice/result/white_008_hold_fascia.mp3","mimeType":"audio/mpeg","sha256":"36e24cb6f169556be6c28e403077d4e8fbde1e3dc93cfb98eb2087cce985aab9","bytes":226356},{"id":"voice.result.white_008_stay_witness_only","kind":"audio","path":"audio/voice/result/white_008_stay_witness_only.mp3","mimeType":"audio/mpeg","sha256":"905d28a8268ee2379eac22f120361379b9951fb5ff172ba6d913558bb2f0278b","bytes":240756},{"id":"voice.result.white_009_keep_half_step","kind":"audio","path":"audio/voice/result/white_009_keep_half_step.mp3","mimeType":"audio/mpeg","sha256":"b7bba180567c5f6a4417e364d5ab1379a2325e359bb495b1dcb4d2fe4c06e1ef","bytes":252852},{"id":"voice.result.white_009_share_umbrella_edge","kind":"audio","path":"audio/voice/result/white_009_share_umbrella_edge.mp3","mimeType":"audio/mpeg","sha256":"23c3d9fe23330249c668a11e7d6bb19ca87ef9def6e0d53dcad0e618d01f03b4","bytes":218868},{"id":"voice.result.white_010_acknowledge_leave","kind":"audio","path":"audio/voice/result/white_010_acknowledge_leave.mp3","mimeType":"audio/mpeg","sha256":"b862835afff73e64f682fd0ce83bf20689fe6e471bfce2c6551e51a6c461d537","bytes":242484},{"id":"voice.result.white_010_offer_return_ticket","kind":"audio","path":"audio/voice/result/white_010_offer_return_ticket.mp3","mimeType":"audio/mpeg","sha256":"dd8f7ed0594e7f26d7dc6cf31b6e17a37528ad86dd8ebf032b5d4c6f93f846e8","bytes":245364},{"id":"voice.result.white_011_curtain_call","kind":"audio","path":"audio/voice/result/white_011_curtain_call.mp3","mimeType":"audio/mpeg","sha256":"c9fdc11ebf7eed86a13aa197101432236b2f907f8b5f7ecdfaefcff31c4fec9d","bytes":259764},{"id":"voice.result.white_011_walk_beside","kind":"audio","path":"audio/voice/result/white_011_walk_beside.mp3","mimeType":"audio/mpeg","sha256":"8f82753798f57a08b67ef3de620e76950ee7ca7d7186ac899243edc1f851d2dc","bytes":265524},{"id":"voice.result.white_012_let_her_decide","kind":"audio","path":"audio/voice/result/white_012_let_her_decide.mp3","mimeType":"audio/mpeg","sha256":"81e36190ab884dfed8f11e605ec441b8edc88bd6c192a57f364a88f18a24781f","bytes":244788},{"id":"voice.result.white_012_refuse_exhibit","kind":"audio","path":"audio/voice/result/white_012_refuse_exhibit.mp3","mimeType":"audio/mpeg","sha256":"0d7c983a7a112e463541d935a321e47ef95e7aa5639c4d3aeac6ef7dc7134c2b","bytes":233268},{"id":"voice.result.white_013_point_to_mirror","kind":"audio","path":"audio/voice/result/white_013_point_to_mirror.mp3","mimeType":"audio/mpeg","sha256":"31aa7569564b6f1e2e0aded51296ba9b85e8fa6c914ffd633d9f59cdd15cd4ad","bytes":281652},{"id":"voice.result.white_013_refuse_to_choose","kind":"audio","path":"audio/voice/result/white_013_refuse_to_choose.mp3","mimeType":"audio/mpeg","sha256":"7b3f72b69d3a1a1254a2e1c1d840040fbe3bcc319183eda77565155a97934248","bytes":283956},{"id":"voice.result.white_014_keep_base_color","kind":"audio","path":"audio/voice/result/white_014_keep_base_color.mp3","mimeType":"audio/mpeg","sha256":"1cf0cd1f80908e5971fd27c9b52ddcbe76409e8ae583b5283a719cdbe67d7d3f","bytes":273588},{"id":"voice.result.white_014_offer_restart","kind":"audio","path":"audio/voice/result/white_014_offer_restart.mp3","mimeType":"audio/mpeg","sha256":"7c761d521905ef96a1fe2f299ccb1521f8f3654e6888a060218734de91028944","bytes":296052},{"id":"voice.result.white_canvas_route_complete","kind":"audio","path":"audio/voice/result/white_canvas_route_complete.mp3","mimeType":"audio/mpeg","sha256":"acd2f7fbf6091e563293abfcb367af4a0a263be201f0929dba79b382523514ec","bytes":291444},{"id":"voice.result.white_canvas_route_final","kind":"audio","path":"audio/voice/result/white_canvas_route_final.mp3","mimeType":"audio/mpeg","sha256":"337e21c026117013a657c1a6e014e9f212a5be661c6adce3ffb4eb87f83a1227","bytes":156660},{"id":"voice.result.white_canvas.bad_ending","kind":"audio","path":"audio/voice/result/white_canvas/bad_ending.mp3","mimeType":"audio/mpeg","sha256":"29e1de7d0ccf9bcc7b6748e099c65338e931d083381660263ea4b987bb062866","bytes":111732},{"id":"voice.result.white_canvas.normal_ending","kind":"audio","path":"audio/voice/result/white_canvas/normal_ending.mp3","mimeType":"audio/mpeg","sha256":"c54d975a7b6e0f7b689a87ecdfbbe9021980cc7fd350b3abe1cc88ea7bf661c7","bytes":104820},{"id":"voice.result.white_canvas.true_ending","kind":"audio","path":"audio/voice/result/white_canvas/true_ending.mp3","mimeType":"audio/mpeg","sha256":"743a641dbf799023987750b0743e032d99369f988bd08194115474b6b3cfb110","bytes":104244},{"id":"voice.result.white_follow_to_lab","kind":"audio","path":"audio/voice/result/white_follow_to_lab.mp3","mimeType":"audio/mpeg","sha256":"8c58cf1aa1f3bc661de6f87077e5a04faf045253d75978a683a31bdbb59e7d9e","bytes":271284},{"id":"voice.result.white_interrupt_lab_terms","kind":"audio","path":"audio/voice/result/white_interrupt_lab_terms.mp3","mimeType":"audio/mpeg","sha256":"2bfc8261224c3685ca59d5b9f766c972402109fb3defb7ee87cb33033d3d6c2f","bytes":247668},{"id":"voice.result.white_keep_empty_seat","kind":"audio","path":"audio/voice/result/white_keep_empty_seat.mp3","mimeType":"audio/mpeg","sha256":"8262c3e938479238aceddb6c75ee1a68b4cb2d1d2e6435dcfbf735d80a3aca45","bytes":267828},{"id":"voice.result.white_share_rain_window","kind":"audio","path":"audio/voice/result/white_share_rain_window.mp3","mimeType":"audio/mpeg","sha256":"326bafdfac66b086162069e09f1dffa9835dab37096e7f52bf0e080e9a7c18de","bytes":256884},{"id":"voice.result.white_sign_witness_protocol","kind":"audio","path":"audio/voice/result/white_sign_witness_protocol.mp3","mimeType":"audio/mpeg","sha256":"00ab30a358041b686c878fef65bcf30d5eadba999ffa66e4d85b89260a3cfecb","bytes":233268},{"id":"voice.result.white_tease_back","kind":"audio","path":"audio/voice/result/white_tease_back.mp3","mimeType":"audio/mpeg","sha256":"51ead297b822c76c8670d84c74cde7ede1fbfa8d8ed9bfb52970de910d428faf","bytes":210804},{"id":"voice.result.white_touch_boundary","kind":"audio","path":"audio/voice/result/white_touch_boundary.mp3","mimeType":"audio/mpeg","sha256":"7b994d5fbc048ce1697bcf4d4f7245957b8ec8adce10897d9b8e314b83bf08d6","bytes":218868},{"id":"voice.scene.golden_bough_001","kind":"audio","path":"audio/voice/scene/golden_bough_001.mp3","mimeType":"audio/mpeg","sha256":"4d225ee5c362970412e23aa4578ab08729c0a884916a1161c62be91254dba4ec","bytes":139380},{"id":"voice.scene.golden_bough_002","kind":"audio","path":"audio/voice/scene/golden_bough_002.mp3","mimeType":"audio/mpeg","sha256":"07fd0776ae465d32f870d0ab6b13353199e11984b528d26602f7bfa5e6986b40","bytes":107124},{"id":"voice.scene.golden_bough_003","kind":"audio","path":"audio/voice/scene/golden_bough_003.mp3","mimeType":"audio/mpeg","sha256":"3cdd14382faf1dce80cf0fca944feafe415c9bcdb2cbf4a8d9c81db1a52ff67a","bytes":198132},{"id":"voice.scene.golden_bough_004","kind":"audio","path":"audio/voice/scene/golden_bough_004.mp3","mimeType":"audio/mpeg","sha256":"ce1f05be6843684bcf809c89b8789fe3806ae1a8ed70bef05502c328497ebc0c","bytes":197556},{"id":"voice.scene.golden_bough_005","kind":"audio","path":"audio/voice/scene/golden_bough_005.mp3","mimeType":"audio/mpeg","sha256":"d65ae80a9f99d79de45b1c6de9458680c4189bdba3abedc175a4fef250adde9d","bytes":173364},{"id":"voice.scene.golden_bough_006","kind":"audio","path":"audio/voice/scene/golden_bough_006.mp3","mimeType":"audio/mpeg","sha256":"6f250d84ff213da11a83ddeac743d1b4c820e703dd2572b60dc2b1962a500e1d","bytes":212532},{"id":"voice.scene.golden_bough_007","kind":"audio","path":"audio/voice/scene/golden_bough_007.mp3","mimeType":"audio/mpeg","sha256":"d9e4264cf286a2be33cc37d6e3668827c835b96500919c377b52d6d2aad1a07f","bytes":221748},{"id":"voice.scene.golden_bough_008","kind":"audio","path":"audio/voice/scene/golden_bough_008.mp3","mimeType":"audio/mpeg","sha256":"8718fc7b7301174eb00808a61f8078bed073756fec5d89fdbd3f8750ff4a8333","bytes":210228},{"id":"voice.scene.golden_bough_009","kind":"audio","path":"audio/voice/scene/golden_bough_009.mp3","mimeType":"audio/mpeg","sha256":"160bc0f6bb3041118aa01646f34f9071ca35f69843b7d0cb7d6ef181832722a3","bytes":214836},{"id":"voice.scene.golden_bough_010","kind":"audio","path":"audio/voice/scene/golden_bough_010.mp3","mimeType":"audio/mpeg","sha256":"6dc4896687ce4abe0bf1f9c0b815743f862faf64619b9323515b9296291efc89","bytes":206772},{"id":"voice.scene.golden_bough_011","kind":"audio","path":"audio/voice/scene/golden_bough_011.mp3","mimeType":"audio/mpeg","sha256":"775db235acbe1c59ac8e435805367931d7138bb73a16ae2c6dbabe175ca26720","bytes":170484},{"id":"voice.scene.golden_bough_012","kind":"audio","path":"audio/voice/scene/golden_bough_012.mp3","mimeType":"audio/mpeg","sha256":"dc1367cb35cd050e16413e99bc2732717a4dbbcb7fe2356164ec9b1e04dac5eb","bytes":207924},{"id":"voice.scene.golden_bough_013","kind":"audio","path":"audio/voice/scene/golden_bough_013.mp3","mimeType":"audio/mpeg","sha256":"6bedf33a85fb30e81dbe986709a284b956fbb8bcba73839ff4e385662c9b5f60","bytes":208500},{"id":"voice.scene.golden_bough_014","kind":"audio","path":"audio/voice/scene/golden_bough_014.mp3","mimeType":"audio/mpeg","sha256":"8511bbc11f6ede3c1f6d9432189f2045d07c2d6bfdb09d50f4465cf923d0de54","bytes":174516},{"id":"voice.scene.golden_bough_015","kind":"audio","path":"audio/voice/scene/golden_bough_015.mp3","mimeType":"audio/mpeg","sha256":"a905db1c23a75a0236b09c32d89dfdfc73dd8820d98941e1ec33fdb320ab9f79","bytes":202740},{"id":"voice.scene.golden_bough_rebuild_ending_bad","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"d95b9a5dd47f83849cf4dcd5c2f30e6d701a4dbabb982f094f6e8174dd4b96f1","bytes":204468},{"id":"voice.scene.golden_bough_rebuild_ending_gate","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"043d26099df61ec1393a1a38c75a8b0b4d2f3eb66189eff11332567640f609c0","bytes":142260},{"id":"voice.scene.golden_bough_rebuild_ending_normal","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"be11b02627a114e3d27ddd8441000dab2e9ddd6d22615a94468dd01c7e2c10bd","bytes":195252},{"id":"voice.scene.golden_bough_rebuild_ending_true","kind":"audio","path":"audio/voice/scene/golden_bough_rebuild_ending_true.mp3","mimeType":"audio/mpeg","sha256":"6603055d536774f9450b28a2bec4b00b405b49f90cc78b4b3c767e867f02a988","bytes":222900},{"id":"voice.scene.ring_conspiracy_001","kind":"audio","path":"audio/voice/scene/ring_conspiracy_001.mp3","mimeType":"audio/mpeg","sha256":"b7df0f5afaafc467cf345fc67dcf3f3f29e409feb9e93799731400125f6df064","bytes":127284},{"id":"voice.scene.ring_conspiracy_002","kind":"audio","path":"audio/voice/scene/ring_conspiracy_002.mp3","mimeType":"audio/mpeg","sha256":"b9f1b96bed0eb609f2ec689e98ae131816c8c22b8fe811e86bb995b94d9aa597","bytes":160692},{"id":"voice.scene.ring_conspiracy_003","kind":"audio","path":"audio/voice/scene/ring_conspiracy_003.mp3","mimeType":"audio/mpeg","sha256":"26e2b98b4ada6eb51d0e0eb30b3890081d2531fb81d9e62a86744ff5aaebe35d","bytes":167604},{"id":"voice.scene.ring_conspiracy_004","kind":"audio","path":"audio/voice/scene/ring_conspiracy_004.mp3","mimeType":"audio/mpeg","sha256":"53ff6d65342584d4a8af3fdea7b7645397f3e150770d1560eb3a3eea945580ce","bytes":197556},{"id":"voice.scene.ring_conspiracy_005","kind":"audio","path":"audio/voice/scene/ring_conspiracy_005.mp3","mimeType":"audio/mpeg","sha256":"fb9ba2613075784df0d47f9bcdfbaf75332e2a29879c9345a7c50509c3599600","bytes":189492},{"id":"voice.scene.ring_conspiracy_006","kind":"audio","path":"audio/voice/scene/ring_conspiracy_006.mp3","mimeType":"audio/mpeg","sha256":"b81a93e166ea9c8c614816c041ea7716c3852fda61254125ef2c1eeac0c7ec62","bytes":175092},{"id":"voice.scene.ring_conspiracy_007","kind":"audio","path":"audio/voice/scene/ring_conspiracy_007.mp3","mimeType":"audio/mpeg","sha256":"d96c395eb83104c3ba7af0690d2a8f50d6fb32c33371993716e0f5e2a5f57d98","bytes":183156},{"id":"voice.scene.ring_conspiracy_008","kind":"audio","path":"audio/voice/scene/ring_conspiracy_008.mp3","mimeType":"audio/mpeg","sha256":"1697ae28055253cdc42ab315aeed973a88d6f7fc81b29cc78af58aa7f3b45c90","bytes":208500},{"id":"voice.scene.ring_conspiracy_009","kind":"audio","path":"audio/voice/scene/ring_conspiracy_009.mp3","mimeType":"audio/mpeg","sha256":"95393977d9fd590fbf1e0e4a60e7c7cd20f3a8d127e9e093af735df0ad6ba164","bytes":162996},{"id":"voice.scene.ring_conspiracy_010","kind":"audio","path":"audio/voice/scene/ring_conspiracy_010.mp3","mimeType":"audio/mpeg","sha256":"42fe6d31eab316f4115365b2a88d54ab3b738dc38ccbb5f66397d092020ca4ab","bytes":195828},{"id":"voice.scene.ring_conspiracy_011","kind":"audio","path":"audio/voice/scene/ring_conspiracy_011.mp3","mimeType":"audio/mpeg","sha256":"30cdb3d7ab8be3a15f66a2e4c1a7f35f2985f792f0df7d5be26ed022bfb52096","bytes":197556},{"id":"voice.scene.ring_conspiracy_012","kind":"audio","path":"audio/voice/scene/ring_conspiracy_012.mp3","mimeType":"audio/mpeg","sha256":"62bb96a11b5d5a9398e317a7075d632b6a45633931fb0504222ef8c1925364e7","bytes":186036},{"id":"voice.scene.ring_conspiracy_013","kind":"audio","path":"audio/voice/scene/ring_conspiracy_013.mp3","mimeType":"audio/mpeg","sha256":"9a5bec85dac0e6238ac0a8b8d5ab52073ddb5d9068f4c73c34b717606654021c","bytes":209076},{"id":"voice.scene.ring_conspiracy_014","kind":"audio","path":"audio/voice/scene/ring_conspiracy_014.mp3","mimeType":"audio/mpeg","sha256":"6af4fe0687540489e464f2b41f864d305b9d832455985359eb393ec1a3b67488","bytes":171636},{"id":"voice.scene.ring_conspiracy_015","kind":"audio","path":"audio/voice/scene/ring_conspiracy_015.mp3","mimeType":"audio/mpeg","sha256":"9c5628b50d962e68b4fea11798a244552372ea92b688326d7f196828dd602537","bytes":248244},{"id":"voice.scene.ring_conspiracy_ending_bad","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"1d3033f84966c7524e526861732e591393cd63fc839ac19c8b61493e1562b24a","bytes":215412},{"id":"voice.scene.ring_conspiracy_ending_gate","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"d5ccbc97c59692526810076f6f75481c50dcdb3e6aff43e7919c3ca73a1e819f","bytes":147444},{"id":"voice.scene.ring_conspiracy_ending_normal","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"5d5d5c31eb143ae854d84f06e209e3777e84feeb910a223e3c24597f89a1f36f","bytes":184884},{"id":"voice.scene.ring_conspiracy_ending_true","kind":"audio","path":"audio/voice/scene/ring_conspiracy_ending_true.mp3","mimeType":"audio/mpeg","sha256":"d3aa6807508e9c64c33ff1a0126ea9ddd6fdadb8ea95c1bc3ec7a79260c4d417","bytes":235572},{"id":"voice.scene.white_canvas_001","kind":"audio","path":"audio/voice/scene/white_canvas_001.mp3","mimeType":"audio/mpeg","sha256":"f9a92c1bc7670ad7639266c595dc0fa60b8d8304a848d946aad06f72ec7f07d7","bytes":110580},{"id":"voice.scene.white_canvas_002","kind":"audio","path":"audio/voice/scene/white_canvas_002.mp3","mimeType":"audio/mpeg","sha256":"b42bb03e8c449bd0c7c33e2e3c103e8fe9e2bd4685b2f0166fda2e65768f3d2a","bytes":142260},{"id":"voice.scene.white_canvas_003","kind":"audio","path":"audio/voice/scene/white_canvas_003.mp3","mimeType":"audio/mpeg","sha256":"447d145ae4bfeebb0d1286275ebd3125e617bf24f5e47794f72a75af3d80110a","bytes":160692},{"id":"voice.scene.white_canvas_004","kind":"audio","path":"audio/voice/scene/white_canvas_004.mp3","mimeType":"audio/mpeg","sha256":"632de5164bcb1666b292b1fa7c3d31a06592f95bcc6021c85fbb0ce46026b9f5","bytes":186036},{"id":"voice.scene.white_canvas_005","kind":"audio","path":"audio/voice/scene/white_canvas_005.mp3","mimeType":"audio/mpeg","sha256":"9f29d8f0966e0a85ae8926a0fe7e5edf21404a41ca0dc7655c8700a478cba08c","bytes":181428},{"id":"voice.scene.white_canvas_006","kind":"audio","path":"audio/voice/scene/white_canvas_006.mp3","mimeType":"audio/mpeg","sha256":"47ba7ff6a7381d865a526506acda5c892ab06c64170d0ba95720d1319dac9c05","bytes":196980},{"id":"voice.scene.white_canvas_007","kind":"audio","path":"audio/voice/scene/white_canvas_007.mp3","mimeType":"audio/mpeg","sha256":"c8c518fe83f8e7d328add0b53d003cb70db7aaa832f18e4a268ee85d070d7f0f","bytes":199860},{"id":"voice.scene.white_canvas_008","kind":"audio","path":"audio/voice/scene/white_canvas_008.mp3","mimeType":"audio/mpeg","sha256":"6067a7080d3720615e322e6f8d7a4870737ac5d544a6b24c556aeba0e734e586","bytes":218868},{"id":"voice.scene.white_canvas_009","kind":"audio","path":"audio/voice/scene/white_canvas_009.mp3","mimeType":"audio/mpeg","sha256":"89794514111d1654ecdf806956448a0da5ab8da75f2ce8234746ee7550ca23c0","bytes":175668},{"id":"voice.scene.white_canvas_010","kind":"audio","path":"audio/voice/scene/white_canvas_010.mp3","mimeType":"audio/mpeg","sha256":"4725f404be2f81e4345da50938b9bcff83cb133c642e69806a66d400168b9b49","bytes":148596},{"id":"voice.scene.white_canvas_011","kind":"audio","path":"audio/voice/scene/white_canvas_011.mp3","mimeType":"audio/mpeg","sha256":"b246e6d83f530b4d0f4ce4860ebf37937b3a0c3dded2571d9331305fd722d185","bytes":196404},{"id":"voice.scene.white_canvas_012","kind":"audio","path":"audio/voice/scene/white_canvas_012.mp3","mimeType":"audio/mpeg","sha256":"58fae554a047a57e6f17d0b1e8c2bd820b7707ab2c067bdc4633fff7d2f2e74d","bytes":171636},{"id":"voice.scene.white_canvas_013","kind":"audio","path":"audio/voice/scene/white_canvas_013.mp3","mimeType":"audio/mpeg","sha256":"4ed3f251b94446c07a6d173441bb7e310659f80f492902f554290243489f8839","bytes":193524},{"id":"voice.scene.white_canvas_014","kind":"audio","path":"audio/voice/scene/white_canvas_014.mp3","mimeType":"audio/mpeg","sha256":"8df96e708d31c6b756257d9dded40c61c383cb83cff1816a284b0bbab1a79739","bytes":188340},{"id":"voice.scene.white_canvas_015","kind":"audio","path":"audio/voice/scene/white_canvas_015.mp3","mimeType":"audio/mpeg","sha256":"e5060d68571a05be9b5b02ee944d1e85c6e2efe670112b7d5812d5580991a42d","bytes":207924},{"id":"voice.scene.white_canvas_ending_bad","kind":"audio","path":"audio/voice/scene/white_canvas_ending_bad.mp3","mimeType":"audio/mpeg","sha256":"f20eb38432b8005c77c929f9d11aceaddb6feaad402bf0950ce7b42f18551a82","bytes":199860},{"id":"voice.scene.white_canvas_ending_gate","kind":"audio","path":"audio/voice/scene/white_canvas_ending_gate.mp3","mimeType":"audio/mpeg","sha256":"1b84c1c3872c4b3ed8f8f4d4ad5fea2c3ef20a434e912b114af1ba86b52bb45d","bytes":142260},{"id":"voice.scene.white_canvas_ending_normal","kind":"audio","path":"audio/voice/scene/white_canvas_ending_normal.mp3","mimeType":"audio/mpeg","sha256":"2011fd5566f387c0b56128ded70b64a3a81cd8f03ad03e3798077266750d5694","bytes":177396},{"id":"voice.scene.white_canvas_ending_true","kind":"audio","path":"audio/voice/scene/white_canvas_ending_true.mp3","mimeType":"audio/mpeg","sha256":"5a6106bd0b3d225bf87ba0a08b95178d0c8c0877305ac73bc8c391e2ce358296","bytes":196980}]'), H6 = [{ version: 2, id: "portrait.albina.amused", characterId: "albina", path: "characters/albina/amused.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.armored", characterId: "albina", path: "characters/albina/armored.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.combat", characterId: "albina", path: "characters/albina/combat.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.endgame", characterId: "albina", path: "characters/albina/endgame.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.fascia-open", characterId: "albina", path: "characters/albina/fascia-open.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.focused", characterId: "albina", path: "characters/albina/focused.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.furious", characterId: "albina", path: "characters/albina/furious.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.golden-bough", characterId: "albina", path: "characters/albina/golden-bough.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.maestro", characterId: "albina", path: "characters/albina/maestro.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.normal", characterId: "albina", path: "characters/albina/normal.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.rain", characterId: "albina", path: "characters/albina/rain.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.ring-conspiracy", characterId: "albina", path: "characters/albina/ring-conspiracy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.shy", characterId: "albina", path: "characters/albina/shy.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.smile", characterId: "albina", path: "characters/albina/smile.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.surgical", characterId: "albina", path: "characters/albina/surgical.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.unarmored", characterId: "albina", path: "characters/albina/unarmored.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.white-canvas", characterId: "albina", path: "characters/albina/white-canvas.png", animation: { kind: "static" } }, { version: 2, id: "portrait.albina.wounded", characterId: "albina", path: "characters/albina/wounded.png", animation: { kind: "static" } }, { version: 2, id: "portrait.callisto.normal", characterId: "callisto", path: "sprite-atlas/callisto/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.callisto.normal.png" }, { version: 2, id: "portrait.charon.normal", characterId: "charon", path: "sprite-atlas/charon/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.charon.normal.png" }, { version: 2, id: "portrait.dante.normal", characterId: "dante", path: "sprite-atlas/dante/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.dante.normal.png" }, { version: 2, id: "portrait.faust.normal", characterId: "faust", path: "sprite-atlas/faust/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.faust.normal.png" }, { version: 2, id: "portrait.fixer_informant.normal", characterId: "fixer_informant", path: "sprite-atlas/fixer_informant/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.fixer.informant.normal.png" }, { version: 2, id: "portrait.golden_apparition.normal", characterId: "golden_apparition", path: "sprite-atlas/golden_apparition/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.golden.apparition.normal.png" }, { version: 2, id: "portrait.lcd_captain.normal", characterId: "lcd_captain", path: "sprite-atlas/lcd_captain/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.lcd.captain.normal.png" }, { version: 2, id: "portrait.lce_doctor.normal", characterId: "lce_doctor", path: "sprite-atlas/lce_doctor/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.lce.doctor.normal.png" }, { version: 2, id: "portrait.protagonist.battle", characterId: "protagonist", path: "sprite-atlas/protagonist/battle_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.battle.png" }, { version: 2, id: "portrait.protagonist.coat", characterId: "protagonist", path: "sprite-atlas/protagonist/coat_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.coat.png" }, { version: 2, id: "portrait.protagonist.formal", characterId: "protagonist", path: "sprite-atlas/protagonist/formal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.formal.png" }, { version: 2, id: "portrait.protagonist.injured", characterId: "protagonist", path: "sprite-atlas/protagonist/injured_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.injured.png" }, { version: 2, id: "portrait.protagonist.normal", characterId: "protagonist", path: "sprite-atlas/protagonist/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.normal.png" }, { version: 2, id: "portrait.protagonist.profile", characterId: "protagonist", path: "sprite-atlas/protagonist/profile_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.profile.png" }, { version: 2, id: "portrait.protagonist.resolve", characterId: "protagonist", path: "sprite-atlas/protagonist/resolve_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.resolve.png" }, { version: 2, id: "portrait.protagonist.serious", characterId: "protagonist", path: "sprite-atlas/protagonist/serious_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.serious.png" }, { version: 2, id: "portrait.protagonist.shadow", characterId: "protagonist", path: "sprite-atlas/protagonist/shadow_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.shadow.png" }, { version: 2, id: "portrait.protagonist.smile", characterId: "protagonist", path: "sprite-atlas/protagonist/smile_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.smile.png" }, { version: 2, id: "portrait.protagonist.tender", characterId: "protagonist", path: "sprite-atlas/protagonist/tender_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.tender.png" }, { version: 2, id: "portrait.protagonist.wet-hair", characterId: "protagonist", path: "sprite-atlas/protagonist/wet-hair_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.protagonist.wet.hair.png" }, { version: 2, id: "portrait.ren.normal", characterId: "ren", path: "sprite-atlas/ren/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.ren.normal.png" }, { version: 2, id: "portrait.ring_agent.normal", characterId: "ring_agent", path: "sprite-atlas/ring_agent/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.ring.agent.normal.png" }, { version: 2, id: "portrait.vergilius.normal", characterId: "vergilius", path: "sprite-atlas/vergilius/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.vergilius.normal.png" }, { version: 2, id: "portrait.yi_sang.normal", characterId: "yi_sang", path: "sprite-atlas/yi_sang/normal_strip.png", animation: { kind: "strip", frameCount: 8, frameWidth: 192, frameHeight: 1024, fps: 8 }, fallbackAssetId: "file.characters.yi.sang.normal.png" }], K6 = [], q6 = {
  version: L6,
  projectId: M6,
  basePath: B6,
  assets: Z6,
  portraits: H6,
  mediaJobs: K6
}, W6 = 2, G6 = "albina-galgame-card", J6 = "canon_recap_9_14", Y6 = { white_canvas: "white_canvas_001", golden_bough_rebuild: "golden_bough_001", ring_conspiracy: "ring_conspiracy_001" }, X6 = /* @__PURE__ */ JSON.parse('[{"version":2,"id":"canon_recap_9_14","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-14.corporism-context"],"sourceIds":["source.official.canto-ix.9-14","source.wiki.canto-ix-part-i.172275"],"note":"Short zh-CN event paraphrase; not a quotation or transcript replacement."},"locationId":"lce_research_hallway","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-14】在 LCE 研究区走廊，众人遭遇被环指加工的人体作品。浮士德从骨骼、肌肉及其运动方式辨认出 Corporism；现场还留有环指 Nursefather 写给女儿的创作指示。此处只概括事件，不是原作台词转录。","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_18","text":"继续复盘 Albina 的首次登场","nextSceneId":"canon_recap_9_18","resultText":"时间推进到 9-18 的 LCE 研究区实验室。","effects":{"setFlags":["canon_recap_9_14_seen"]}}]},{"version":2,"id":"canon_recap_9_18","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-18.albina-first-appearance"],"sourceIds":["source.official.canto-ix.9-18","source.wiki.canto-ix-part-i.172275"],"note":"Short zh-CN first-appearance paraphrase from the pinned 9-18 pre/post-battle sequence."},"locationId":"lce_research_lab","backgroundAssetId":"bg.lce_lab","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-18】Albina 首次实质登场时，与 Ren 接替 Shiomi Yoru 阻挡罪人，为后者接近并带走金枝争取时间。战斗中，她的上半装甲与 Fascia 侧板打开，露出活体组织；Albina 想让 Fascia 继续行动，Ren 则以不得偏离计划为由制止并攻击她。","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37","text":"继续复盘 9-37","nextSceneId":"canon_recap_9_37","resultText":"时间推进到 Operation Spider Pyre 期间的 Ring Corridor。","effects":{"setFlags":["canon_recap_9_18_seen"]}}]},{"version":2,"id":"canon_recap_9_37","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.encounter"],"sourceIds":["source.official.canto-ix.9-37","source.wiki.canto-ix-part-iii.177602","source.bilibili.BV1rsi8B5ED2.p37"],"note":"Short zh-CN encounter paraphrase cross-checked against the source-game scene order."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37】Operation Spider Pyre 期间，辛克莱、以实玛利、浮士德、Hohenheim 与 Alyssa 在 Ring Corridor 遭遇 Albina。Albina 解释自己为唤醒 Fascia 而迟到，并自称是 Callisto 门下的 Corporism 学徒。玩家 {{user}} 不在这段正史事件中。","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_albina_fascia","text":"核对 Albina 与 Fascia","nextSceneId":"canon_recap_albina_fascia","resultText":"复盘转向两者的身份与身体关系。","effects":{"setFlags":["canon_recap_9_37_seen"]}}]},{"version":2,"id":"canon_recap_albina_fascia","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.albina.identity-and-disposition","canon.albina.appearance","canon.albina-fascia.anatomy-and-friends"],"sourceIds":["source.official.canto-ix.9-37","source.wiki.canto-ix-part-iii.177602","source.wiki.albina.173286","source.bilibili.BV1rsi8B5ED2.p37","source.bilibili.BV1brvbBDE84.p33-p34"],"note":"Short zh-CN character and anatomy paraphrase; no source dialogue is reproduced."},"locationId":"ring_corridor","backgroundAssetId":"bg.ring_atelier","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"left","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·Albina / Fascia】Albina 是 Callisto 门下的 Corporism 学徒，也是 House of Spiders 的成员。她使用白色全身义体与白、黄、金配色的铁处女式装甲。Fascia 是以她原本肉体构成的活体巨剑：Albina 主要保留脑，Fascia 则缺少脑。她语气温和、过度诚实，却把“成为朋友”与成为唤醒或补全 Fascia 的材料联系在一起。","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_37_battle","text":"继续复盘 9-37 的战斗升级","nextSceneId":"canon_recap_9_37_battle","resultText":"复盘转向 Callisto 加入后的最后阶段。","effects":{"setFlags":["canon_recap_albina_fascia_seen"]}}]},{"version":2,"id":"canon_recap_9_37_battle","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-37.escalation"],"sourceIds":["source.official.canto-ix.9-37","source.wiki.canto-ix-part-iii.177602"],"note":"Short zh-CN battle escalation paraphrase; no source dialogue is reproduced."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.armored","position":"center","active":true,"scale":1}],"speaker":"正史复盘","text":"【正史中文意译·9-37 战斗升级】Callisto 加入后，师徒二人逐步压制 Sinclair 一行；Alyssa 随后反击。9-37 并未在此结束 Albina、Fascia 与 Callisto 的正史链，其最终结果发生在后续 9-43《Hatching》。","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_continue_9_43","text":"继续复盘 9-43《Hatching》","nextSceneId":"canon_recap_9_43_outcome","resultText":"时间推进到 9-43；接下来才是不能被路线文本改写为正史的既定结果。","effects":{"setFlags":["canon_recap_9_37_battle_seen"]}}]},{"version":2,"id":"canon_recap_9_43_outcome","chapter":0,"route":null,"provenance":{"classification":"canon_paraphrase","scope":"canon_recap","claimIds":["canon.9-43.outcome"],"sourceIds":["source.official.canto-ix.9-43","source.wiki.canto-ix-part-iii.177602","source.bilibili.BV1rsi8B5ED2.p43"],"note":"Short zh-CN 9-43 outcome paraphrase followed by an explicit canon/AU boundary."},"locationId":"ring_corridor","backgroundAssetId":"bg.mirror_corridor","tone":"canon-recap-outcome","portraits":[],"speaker":"正史复盘","text":"【正史中文意译·9-43《Hatching》既定结果】Future Sinclair 先摧毁 Fascia，再杀死 Albina，并在之后杀死 Callisto。正史复盘到此结束；后续任何让 Albina 存活、与玩家相遇或进入九个结局的内容，都只能是本卡原创 AU。","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"canon_recap_enter_AU","text":"确认边界并进入 AU/IF 分歧","nextSceneId":"opening_001","resultText":"正史复盘已结束。以下三条路线全部是本卡原创 AU/IF。","effects":{"setFlags":["canon_recap_9_43_seen","canon_recap_complete","AU_boundary_acknowledged"]}}]},{"version":2,"id":"opening_001","chapter":1,"route":null,"provenance":{"classification":"AU_extension","scope":"AU_boundary","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Explicit continuity boundary shown before the player selects an author-created AU route."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.opening_rain","tone":"AU-boundary","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.normal","position":"center","active":true,"scale":1}],"speaker":"AU/IF 分歧","text":"【本卡原创 AU/IF，不是原作后续】9-43《Hatching》的正史结局已经复盘完毕。从这一刻开始，Albina 的存活、玩家 {{user}} 的出现、三条路线与九个结局均为本卡原创，不代表原作事实或隐藏结局。","bgmAssetId":"file.audio.bgm.backstreets.rain.mp3","choices":[{"id":"enter_white_canvas","text":"进入 white_canvas AU","nextSceneId":"white_canvas_001","resultText":"【AU/IF】你进入以关系边界与自我选择为核心的 white_canvas 原创路线。","effects":{"route":"white_canvas","values":{"affectionAlbina":2,"trust":2,"artResonance":1},"setFlags":["route_white_canvas_seen"],"unlockCg":["cg.opening_rain"]}},{"id":"enter_rebuild","text":"进入 golden_bough_rebuild AU","nextSceneId":"golden_bough_001","resultText":"【AU/IF】这条路线假设 Albina 在 9-43 死亡后被重构；该前提与全部后续均非正史。","effects":{"route":"golden_bough_rebuild","values":{"trust":3,"danger":1},"setFlags":["route_rebuild_seen"],"unlockCg":["cg.golden_bough_rebuild"]}},{"id":"enter_conspiracy","text":"进入 ring_conspiracy AU","nextSceneId":"ring_conspiracy_001","resultText":"【AU/IF】这条路线主动改写 9-43 后续因果；其中的委托、关系和结局均为本卡原创。","effects":{"route":"ring_conspiracy","values":{"danger":3,"artResonance":2},"setFlags":["route_conspiracy_seen"],"unlockCg":["cg.ring_invitation"]}}]},{"version":2,"id":"white_canvas_001","chapter":1,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.94},{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"right","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白色并不代表干净。它只是暂时还没有被决定。你也是这样，{{user}}。","voiceAssetId":"voice.scene.white_canvas_001","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_touch_boundary","text":"告诉她：完整也是一种作品","nextSceneId":"white_canvas_002","resultText":"你选择“告诉她：完整也是一种作品”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_touch_boundary","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["albina_learns_wholeness"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_tease_back","text":"反问她是否害怕自己的画布","nextSceneId":"white_canvas_002","resultText":"你选择“反问她是否害怕自己的画布”。阿尔比娜：她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","resultVoiceAssetId":"voice.result.white_tease_back","effects":{"values":{"affectionAlbina":2,"danger":1,"artResonance":3},"setFlags":["player_teases_artist"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_002","chapter":2,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"她把黑色手掌停在离你心口一寸的位置，没有继续向前。法西娅安静得像也在等待你的许可。","voiceAssetId":"voice.scene.white_canvas_002","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_follow_to_lab","text":"陪她把画布带进 LCE 临时手术室","nextSceneId":"white_canvas_003","resultText":"你选择“陪她把画布带进 LCE 临时手术室”。LCE 医师：灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","resultVoiceAssetId":"voice.result.white_follow_to_lab","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":2},"setFlags":["white_lab_boundary_seen"],"unlockCg":["cg.hollow_torso_reveal"]}},{"id":"return_opening_from_white","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_white","effects":{"values":{"trust":1},"setFlags":["white_canvas_looped"]}}]},{"version":2,"id":"white_canvas_003","chapter":3,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_3","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_3","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"灯光没有温度。记录员要求你签下旁观协议，阿尔比娜却先把笔推给自己：这一次，谁也不能替她同意被拆解。","voiceAssetId":"voice.scene.white_canvas_003","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_sign_witness_protocol","text":"只签见证，不签处置权","nextSceneId":"white_canvas_004","resultText":"你选择“只签见证，不签处置权”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_sign_witness_protocol","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":2},"setFlags":["witness_not_ownership"],"unlockCg":["cg.lce_raid"]}},{"id":"white_interrupt_lab_terms","text":"要求医师删去所有所有权措辞","nextSceneId":"white_canvas_004","resultText":"你选择“要求医师删去所有所有权措辞”。阿尔比娜：巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","resultVoiceAssetId":"voice.result.white_interrupt_lab_terms","effects":{"values":{"trust":3,"danger":1,"artResonance":3},"setFlags":["lab_terms_rewritten"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"white_canvas_004","chapter":4,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"巴士窗上映出她的白色义体，也映出你故意留下的空座。她说完整不是没有裂缝，而是裂缝终于有了不被展览的权利。","voiceAssetId":"voice.scene.white_canvas_004","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_keep_empty_seat","text":"替她保留那张无人审判的座位","nextSceneId":"white_canvas_005","resultText":"你选择“替她保留那张无人审判的座位”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_keep_empty_seat","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":1},"setFlags":["white_canvas_empty_seat"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_share_rain_window","text":"把雨夜倒影交给她自己命名","nextSceneId":"white_canvas_005","resultText":"你选择“把雨夜倒影交给她自己命名”。阿尔比娜：黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","resultVoiceAssetId":"voice.result.white_share_rain_window","effects":{"values":{"affectionAlbina":3,"trust":2,"artResonance":3},"setFlags":["rain_reflection_named"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_005","chapter":5,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_5","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_5","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明像一层还没有落款的底色。她把法西娅插在你们之间，不是阻隔，而是提醒：任何亲密都必须能被双方随时收回。","voiceAssetId":"voice.scene.white_canvas_005","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_complete","text":"记录白色画布路线的暂定结局","nextSceneId":"white_canvas_006","resultText":"你选择“记录白色画布路线的暂定结局”。阿尔比娜：空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","resultVoiceAssetId":"voice.result.white_canvas_route_complete","effects":{"values":{"affectionAlbina":2,"trust":2,"danger":-1,"artResonance":2},"setFlags":["white_canvas_route_complete"]}}]},{"version":2,"id":"white_canvas_006","chapter":6,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"white_canvas_room","backgroundAssetId":"bg.white_canvas","cgAssetId":"cg.white_canvas_choice","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"空展厅的回声比任何观众都诚实。她拿起一支没有颜料的画笔，在你面前比划出一条看不见的轮廓：这是你今晚没有说出口的那句话。","voiceAssetId":"voice.scene.white_canvas_006","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_006_name_silence","text":"替那条轮廓取一个不会被收藏的名字","nextSceneId":"white_canvas_007","resultText":"你选择“替那条轮廓取一个不会被收藏的名字”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_name_silence","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":3},"setFlags":["silhouette_named"],"unlockCg":["cg.art_resonance"]}},{"id":"white_006_refuse_naming","text":"让轮廓保持无名，由她决定","nextSceneId":"white_canvas_007","resultText":"你选择“让轮廓保持无名，由她决定”。法西娅：法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","resultVoiceAssetId":"voice.result.white_006_refuse_naming","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["naming_returned"],"unlockCg":["cg.trust_threshold"]}}]},{"version":2,"id":"white_canvas_007","chapter":7,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.fascia_heartbeat","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.shy","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"left","active":false,"scale":0.9}],"speaker":"法西娅","text":"法西娅的低语从镜面里渗出来：你正在画的并不是她，是一个被允许随时擦掉的你。阿尔比娜没有反驳，只是把那面镜子轻轻转开半寸。","voiceAssetId":"voice.scene.white_canvas_007","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_007_keep_mirror_open","text":"让镜子继续映照，不替她遮蔽","nextSceneId":"white_canvas_008","resultText":"你选择“让镜子继续映照，不替她遮蔽”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_keep_mirror_open","effects":{"values":{"trust":3,"danger":1,"artResonance":4},"setFlags":["mirror_kept_open"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_007_ask_fascia_term","text":"当着阿尔比娜问法西娅一个边界问题","nextSceneId":"white_canvas_008","resultText":"你选择“当着阿尔比娜问法西娅一个边界问题”。阿尔比娜：义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","resultVoiceAssetId":"voice.result.white_007_ask_fascia_term","effects":{"values":{"affectionAlbina":1,"trust":2,"artResonance":3},"setFlags":["fascia_addressed_directly"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_008","chapter":8,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.hollow_torso_reveal","videoAssetId":"video.animated.runtime.white_canvas_scene_8","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_8","tone":"quiet","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"义体维护槽的白光下，她把法西娅从胸口取出来，放在你和她之间的托盘上。她说：完整不是把它装回去，是承认它有权利短暂离开我。","voiceAssetId":"voice.scene.white_canvas_008","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_008_hold_fascia","text":"替她暂时照看法西娅","nextSceneId":"white_canvas_009","resultText":"你选择“替她暂时照看法西娅”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_hold_fascia","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":2},"setFlags":["fascia_held_by_player"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"white_008_stay_witness_only","text":"只站在她视野内，不接手","nextSceneId":"white_canvas_009","resultText":"你选择“只站在她视野内，不接手”。阿尔比娜：雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","resultVoiceAssetId":"voice.result.white_008_stay_witness_only","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["witness_distance_kept"],"unlockCg":["cg.lce_raid"]}}]},{"version":2,"id":"white_canvas_009","chapter":9,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"rain_room","backgroundAssetId":"bg.rain_room","cgAssetId":"cg.rain_confession","tone":"rain","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"雨室的水线像无数根未被签名的画框。她让你站在她身后半步，说那个距离刚好能让两人都不必替对方回答。","voiceAssetId":"voice.scene.white_canvas_009","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_009_keep_half_step","text":"守住半步距离，不擅自靠近","nextSceneId":"white_canvas_010","resultText":"你选择“守住半步距离，不擅自靠近”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_keep_half_step","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":2},"setFlags":["half_step_distance"],"unlockCg":["cg.rain_confession"]}},{"id":"white_009_share_umbrella_edge","text":"把伞沿偏向她那侧","nextSceneId":"white_canvas_010","resultText":"你选择“把伞沿偏向她那侧”。但丁：但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","resultVoiceAssetId":"voice.result.white_009_share_umbrella_edge","effects":{"values":{"affectionAlbina":4,"trust":2,"artResonance":2},"setFlags":["umbrella_shared"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_010","chapter":10,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"rain","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"但丁","text":"但丁没有抬头，只低声提醒：她在试着把自己画成一个可以离开的人，你最好别急着把她画成离不开你的人。","voiceAssetId":"voice.scene.white_canvas_010","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_010_acknowledge_leave","text":"承认她随时可以离开这张画布","nextSceneId":"white_canvas_011","resultText":"你选择“承认她随时可以离开这张画布”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_acknowledge_leave","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["leaving_acknowledged"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"white_010_offer_return_ticket","text":"给她一张可以返回的车票，而不是绳索","nextSceneId":"white_canvas_011","resultText":"你选择“给她一张可以返回的车票，而不是绳索”。阿尔比娜：巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","resultVoiceAssetId":"voice.result.white_010_offer_return_ticket","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":2},"setFlags":["return_ticket_given"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_011","chapter":11,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.art_resonance","videoAssetId":"video.animated.runtime.white_canvas_scene_11","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_11","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.white-canvas","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"巢穴车站的灯光白得发硬。她站在月台边缘，没有回头，只问：如果一个艺术家拒绝被展览，你愿意做那个替她谢幕的人吗？","voiceAssetId":"voice.scene.white_canvas_011","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_011_curtain_call","text":"答应替她谢幕，不替她登台","nextSceneId":"white_canvas_012","resultText":"你选择“答应替她谢幕，不替她登台”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_curtain_call","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["curtain_call_promised"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_011_walk_beside","text":"陪她走下月台，不离开也不催促","nextSceneId":"white_canvas_012","resultText":"你选择“陪她走下月台，不离开也不催促”。卡利斯托：蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","resultVoiceAssetId":"voice.result.white_011_walk_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["platform_walked_together"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"white_canvas_012","chapter":12,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"蜘蛛画廊借给白画布一个临时展位。卡利斯托微笑着提议：把她最有缺陷的那一面挂出来，观众会替你们完成剩下的故事。","voiceAssetId":"voice.scene.white_canvas_012","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_012_refuse_exhibit","text":"当众拒绝展出她的缺陷","nextSceneId":"white_canvas_013","resultText":"你选择“当众拒绝展出她的缺陷”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_refuse_exhibit","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["defect_not_exhibited"],"unlockCg":["cg.trust_threshold"]}},{"id":"white_012_let_her_decide","text":"把展与不展的决定权交还给她","nextSceneId":"white_canvas_013","resultText":"你选择“把展与不展的决定权交还给她”。阿尔比娜：环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","resultVoiceAssetId":"voice.result.white_012_let_her_decide","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["exhibit_choice_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_013","chapter":13,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.art_resonance","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"环指工坊的颜料气味里混着血。她握着一柄画刀，对你说：今天我可能要毁掉一件作品，请你告诉我哪一件是她真正想毁掉的。","voiceAssetId":"voice.scene.white_canvas_013","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"white_013_point_to_mirror","text":"指向墙上那面映过法西娅的镜子","nextSceneId":"white_canvas_014","resultText":"你选择“指向墙上那面映过法西娅的镜子”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_point_to_mirror","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":5},"setFlags":["mirror_pointed_out"],"unlockCg":["cg.art_resonance"]}},{"id":"white_013_refuse_to_choose","text":"拒绝替她决定，让她自己下刀","nextSceneId":"white_canvas_014","resultText":"你选择“拒绝替她决定，让她自己下刀”。阿尔比娜：楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","resultVoiceAssetId":"voice.result.white_013_refuse_to_choose","effects":{"values":{"affectionAlbina":1,"trust":4,"artResonance":3},"setFlags":["knife_returned"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_014","chapter":14,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.trust_threshold","tone":"quiet","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"楼顶的风把她的话吹得很轻。她说：如果有一天我想把自己重新画成空白，你会替我保留这最后一层底色，还是替我重新开始？","voiceAssetId":"voice.scene.white_canvas_014","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_014_keep_base_color","text":"答应替她保留最后一层底色","nextSceneId":"white_canvas_015","resultText":"你选择“答应替她保留最后一层底色”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_keep_base_color","effects":{"values":{"affectionAlbina":4,"trust":4,"artResonance":3},"setFlags":["base_color_kept"],"unlockCg":["cg.white_canvas_ending"]}},{"id":"white_014_offer_restart","text":"答应陪她从空白重新开始","nextSceneId":"white_canvas_015","resultText":"你选择“答应陪她从空白重新开始”。阿尔比娜：城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","resultVoiceAssetId":"voice.result.white_014_offer_restart","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":4},"setFlags":["restart_offered"],"unlockCg":["cg.art_resonance"]}}]},{"version":2,"id":"white_canvas_015","chapter":15,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_scene_15","desktopVideoAssetId":"video.animated.desktop.white_canvas_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊的黎明像一张终于干透的画布。她把法西娅重新放回胸口，又把画笔交到你手里：这张画布已经记住了你，但它仍然属于我。","voiceAssetId":"voice.scene.white_canvas_015","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_route_final","text":"为白色画布路线盖上最后一枚印章","nextSceneId":"white_canvas_ending_gate","resultText":"你选择“为白色画布路线盖上最后一枚印章”。白色画布路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.white_canvas_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["white_canvas_route_final"]}}]},{"version":2,"id":"white_canvas_ending_gate","chapter":16,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"白色画布的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.white_canvas_ending_gate","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[{"id":"white_canvas_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"white_canvas_ending_true","resultText":"结局判定完成：白色画布·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.true_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]},"effects":{"setFlags":["ending_white_canvas_true_qualified"]}},{"id":"white_canvas_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"white_canvas_ending_normal","resultText":"结局判定完成：白色画布·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_white_canvas_normal_qualified"]}},{"id":"white_canvas_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"white_canvas_ending_bad","resultText":"结局判定完成：白色画布·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.white_canvas.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]},"effects":{"setFlags":["ending_white_canvas_bad_qualified"]}}]},{"version":2,"id":"white_canvas_ending_true","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_true","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"晨光落在未署名的白画上。阿尔比娜没有把你画成作品，而是把并肩离开的两道影子留在画框之外：这一次，完整与亲密同时成立。","voiceAssetId":"voice.scene.white_canvas_ending_true","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":52},{"kind":"value","key":"artResonance","operator":"gte","value":44},{"kind":"value","key":"danger","operator":"lte","value":5}]}}},{"version":2,"id":"white_canvas_ending_normal","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_normal","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"展厅按约熄灯。你们保留了尚未说尽的话，也保留了随时重画的权利。阿尔比娜把空白画布卷好，约定下一场雨后再见。","voiceAssetId":"voice.scene.white_canvas_ending_normal","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"white_canvas_ending_bad","chapter":17,"route":"white_canvas","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.white_canvas_ending","videoAssetId":"video.animated.runtime.white_canvas_ending_bad","desktopVideoAssetId":"video.animated.desktop.white_canvas_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"白厅没有发生争吵，只剩一张过早完成的画。阿尔比娜礼貌地收回画笔与称呼；边界仍被守住，但你们没能把信任带到黎明。","voiceAssetId":"voice.scene.white_canvas_ending_bad","bgmAssetId":"file.audio.bgm.between.two.worlds.mp3","choices":[],"ending":{"route":"white_canvas","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"white_canvas_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"artResonance","operator":"lte","value":38}]}}},{"version":2,"id":"golden_bough_001","chapter":1,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"left","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"金色光尘沿着她的义体裂缝回流。她先确认的不是自己，而是法西娅是否还在呼吸。","voiceAssetId":"voice.scene.golden_bough_001","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_anchor","text":"成为她的记忆锚点","nextSceneId":"golden_bough_002","resultText":"你选择“成为她的记忆锚点”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["player_memory_anchor"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_question_fascia","text":"先检查法西娅","nextSceneId":"golden_bough_002","resultText":"你选择“先检查法西娅”。旁白：镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","resultVoiceAssetId":"voice.result.rebuild_question_fascia","effects":{"values":{"trust":2,"danger":1,"artResonance":4},"setFlags":["fascia_checked_first"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_002","chapter":2,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.94}],"speaker":"旁白","text":"镜面里的阿尔比娜有无数个切口，但每一道切口都避开了你替她守住的名字。","voiceAssetId":"voice.scene.golden_bough_002","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_push_into_raid","text":"带着记忆锚点突入金枝异常现场","nextSceneId":"golden_bough_003","resultText":"你选择“带着记忆锚点突入金枝异常现场”。浮士德：金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","resultVoiceAssetId":"voice.result.rebuild_push_into_raid","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["rebuild_raid_committed"],"unlockCg":["cg.lce_raid"]}},{"id":"return_opening_from_rebuild","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_rebuild","effects":{"values":{"trust":1},"setFlags":["rebuild_looped"]}}]},{"version":2,"id":"golden_bough_003","chapter":3,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_3","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_3","tone":"threat","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"浮士德","text":"金枝残响把病床、画架和战场叠成一张薄膜。浮士德只给出结论：如果锚点断裂，阿尔比娜会把自己误认为一件已经完成的作品。","voiceAssetId":"voice.scene.golden_bough_003","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_cut_false_completion","text":"切断“完成品”的错误定义","nextSceneId":"golden_bough_004","resultText":"你选择“切断“完成品”的错误定义”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_cut_false_completion","effects":{"values":{"trust":4,"danger":1,"artResonance":4},"setFlags":["false_completion_cut"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_guard_fascia_pulse","text":"守住法西娅的心跳频率","nextSceneId":"golden_bough_004","resultText":"你选择“守住法西娅的心跳频率”。维吉利乌斯：楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","resultVoiceAssetId":"voice.result.rebuild_guard_fascia_pulse","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":3},"setFlags":["fascia_pulse_guarded"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_004","chapter":4,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶的风把金色光尘吹成刀刃。维吉利乌斯没有劝阻，只提醒你：重构不是修好她，而是承认她有权决定哪些缺口继续存在。","voiceAssetId":"voice.scene.golden_bough_004","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_accept_missing_pieces","text":"承认缺口也是她的结构","nextSceneId":"golden_bough_005","resultText":"你选择“承认缺口也是她的结构”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_accept_missing_pieces","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":2},"setFlags":["missing_pieces_accepted"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_use_rooftop_signal","text":"用楼顶信号重排记忆顺序","nextSceneId":"golden_bough_005","resultText":"你选择“用楼顶信号重排记忆顺序”。阿尔比娜：最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","resultVoiceAssetId":"voice.result.rebuild_use_rooftop_signal","effects":{"values":{"trust":3,"danger":-1,"artResonance":4},"setFlags":["rooftop_signal_reordered"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_005","chapter":5,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_5","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_5","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"最后一面镜子没有给她完整倒影，只给出一条可以返回的路。她握住你的手腕，确认那不是束缚，而是一次被允许的回航。","voiceAssetId":"voice.scene.golden_bough_005","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_complete","text":"记录金枝重构路线的暂定结局","nextSceneId":"golden_bough_006","resultText":"你选择“记录金枝重构路线的暂定结局”。浮士德：记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","resultVoiceAssetId":"voice.result.golden_bough_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-1,"artResonance":3},"setFlags":["golden_bough_route_complete"]}}]},{"version":2,"id":"golden_bough_006","chapter":6,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.surgery_of_memory","tone":"golden","portraits":[{"characterId":"faust","portraitAssetId":"portrait.faust.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.fascia-open","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"浮士德","text":"记忆手术台上，金色光尘在义体接缝里像旧伤口一样反复渗出。浮士德递过一把刻度尺：她说她想重构的不是身体，是你替她记下却没敢念出来的那段。","voiceAssetId":"voice.scene.golden_bough_006","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_006_read_aloud","text":"把那段记忆当着她的面念出来","nextSceneId":"golden_bough_007","resultText":"你选择“把那段记忆当着她的面念出来”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_read_aloud","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["memory_read_aloud"],"unlockCg":["cg.surgery_of_memory"]}},{"id":"rebuild_006_keep_silent_anchor","text":"只做锚点，不替她出声","nextSceneId":"golden_bough_007","resultText":"你选择“只做锚点，不替她出声”。阿尔比娜：金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","resultVoiceAssetId":"voice.result.rebuild_006_keep_silent_anchor","effects":{"values":{"affectionAlbina":1,"trust":5,"artResonance":2},"setFlags":["silent_anchor_kept"],"unlockCg":["cg.fascia_heartbeat"]}}]},{"version":2,"id":"golden_bough_007","chapter":7,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.rebuild_awakening","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"金枝裂隙里的回声全是她过去没说完的句子。她让法西娅在你和她之间选择一个频率，说这次她要先听见自己的节拍，再决定要不要跟上。","voiceAssetId":"voice.scene.golden_bough_007","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_007_match_her_pulse","text":"按她的节拍调整呼吸","nextSceneId":"golden_bough_008","resultText":"你选择“按她的节拍调整呼吸”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_match_her_pulse","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pulse_matched"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"rebuild_007_stay_own_rhythm","text":"保留你自己的呼吸节奏，让她对齐","nextSceneId":"golden_bough_008","resultText":"你选择“保留你自己的呼吸节奏，让她对齐”。维吉利乌斯：LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","resultVoiceAssetId":"voice.result.rebuild_007_stay_own_rhythm","effects":{"values":{"affectionAlbina":1,"trust":3,"artResonance":4},"setFlags":["own_rhythm_kept"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_008","chapter":8,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_8","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_8","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"LCE 的搜捕光柱扫过楼顶。维吉利乌斯扔下一句话：你救不回完整的她，但你能决定让她以哪个版本继续存在。阿尔比娜握紧法西娅，等你下判断。","voiceAssetId":"voice.scene.golden_bough_008","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_008_protect_current_self","text":"保护此刻这个尚未完成的她","nextSceneId":"golden_bough_009","resultText":"你选择“保护此刻这个尚未完成的她”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_protect_current_self","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":1,"artResonance":3},"setFlags":["current_self_protected"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_008_trade_old_memory","text":"用一段旧记忆换取撤退时间","nextSceneId":"golden_bough_009","resultText":"你选择“用一段旧记忆换取撤退时间”。金色幻影：镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","resultVoiceAssetId":"voice.result.rebuild_008_trade_old_memory","effects":{"values":{"trust":2,"danger":-2,"artResonance":4},"setFlags":["memory_traded"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_009","chapter":9,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"金色幻影","text":"镜廊深处的金色幻影模仿着她的旧姿态，问她：要不要把我装回去，省得你再做一个有缺口的自己？她抬头看你，等你回答那个不属于她的问题。","voiceAssetId":"voice.scene.golden_bough_009","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_009_refuse_perfect_copy","text":"替她拒绝那个完美复制品","nextSceneId":"golden_bough_010","resultText":"你选择“替她拒绝那个完美复制品”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_refuse_perfect_copy","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":3},"setFlags":["perfect_copy_refused"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_009_hand_question_back","text":"把问题原样交还给她","nextSceneId":"golden_bough_010","resultText":"你选择“把问题原样交还给她”。LCE 医师：医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","resultVoiceAssetId":"voice.result.rebuild_009_hand_question_back","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["question_returned"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_010","chapter":10,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"医师递来一份重构协议：只要她愿意封存一段记忆，LCE 就允许她保留现在的外形。她把笔尖停在协议上，没有签字，先看你的反应。","voiceAssetId":"voice.scene.golden_bough_010","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"rebuild_010_veto_sealing","text":"当着医师反对封存记忆","nextSceneId":"golden_bough_011","resultText":"你选择“当着医师反对封存记忆”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_veto_sealing","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":2,"artResonance":3},"setFlags":["memory_seal_vetoed"],"unlockCg":["cg.lce_raid"]}},{"id":"rebuild_010_ask_her_choice","text":"低声问她自己想怎么签","nextSceneId":"golden_bough_011","resultText":"你选择“低声问她自己想怎么签”。阿尔比娜：夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","resultVoiceAssetId":"voice.result.rebuild_010_ask_her_choice","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":2},"setFlags":["seal_choice_hers"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_011","chapter":11,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_11","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_11","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.tender","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士上，她把额头轻轻抵在窗玻璃上。她说：你今天替我守住的，不是金枝，是一个允许我继续修改自己的我。","voiceAssetId":"voice.scene.golden_bough_011","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_011_sit_beside","text":"坐到她旁边，不说话","nextSceneId":"golden_bough_012","resultText":"你选择“坐到她旁边，不说话”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_sit_beside","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":2},"setFlags":["silent_companionship"],"unlockCg":["cg.limbus_bus_night"]}},{"id":"rebuild_011_ask_next_revision","text":"问她下一笔想修改哪里","nextSceneId":"golden_bough_012","resultText":"你选择“问她下一笔想修改哪里”。环指代理人：环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","resultVoiceAssetId":"voice.result.rebuild_011_ask_next_revision","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":3},"setFlags":["next_revision_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_012","chapter":12,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"环指工坊里有人拿出一枚金枝仿品，提议替她换掉所有\\"未完成\\"的接口。她握紧法西娅，等你判断这是救济，还是又一次把她写成完成品的尝试。","voiceAssetId":"voice.scene.golden_bough_012","bgmAssetId":"file.audio.bgm.title.theme.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"rebuild_012_break_contract","text":"当面撕毁那份替换协议","nextSceneId":"golden_bough_013","resultText":"你选择“当面撕毁那份替换协议”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_break_contract","effects":{"values":{"trust":4,"danger":2,"artResonance":3},"setFlags":["replacement_contract_torn"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"rebuild_012_negotiate_terms","text":"替她重新谈判条件，不让她独自承担","nextSceneId":"golden_bough_013","resultText":"你选择“替她重新谈判条件，不让她独自承担”。阿尔比娜：回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","resultVoiceAssetId":"voice.result.rebuild_012_negotiate_terms","effects":{"values":{"affectionAlbina":2,"trust":3,"artResonance":4},"setFlags":["terms_renegotiated"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_013","chapter":13,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"golden_bough_fault","backgroundAssetId":"bg.golden_bough","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.golden-bough","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"回到金枝裂隙，她终于允许自己颤抖。她说：你不肯替我决定形状，那我能不能请求你，在我下一次重构失败时，仍然叫出我现在的名字？","voiceAssetId":"voice.scene.golden_bough_013","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_013_promise_name","text":"答应她即使失败也记得这个名字","nextSceneId":"golden_bough_014","resultText":"你选择“答应她即使失败也记得这个名字”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_promise_name","effects":{"values":{"affectionAlbina":4,"trust":5,"artResonance":3},"setFlags":["name_promise_given"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_013_offer_witness","text":"只承诺做见证，不承诺结果","nextSceneId":"golden_bough_014","resultText":"你选择“只承诺做见证，不承诺结果”。阿尔比娜：镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","resultVoiceAssetId":"voice.result.rebuild_013_offer_witness","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["witness_only_promise"],"unlockCg":["cg.surgery_of_memory"]}}]},{"version":2,"id":"golden_bough_014","chapter":14,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.araya_rooftop","tone":"golden","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"镜廊最后一面镜子没有给倒影，只映出一枚未熄的金枝。她把镜子推向你：请你替我保管它，但不要替我点亮它。","voiceAssetId":"voice.scene.golden_bough_014","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"rebuild_014_keep_unlit","text":"答应只保管，不替她点亮","nextSceneId":"golden_bough_015","resultText":"你选择“答应只保管，不替她点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_keep_unlit","effects":{"values":{"affectionAlbina":3,"trust":5,"artResonance":3},"setFlags":["gilded_bough_kept_unlit"],"unlockCg":["cg.golden_bough_ending"]}},{"id":"rebuild_014_ask_when_to_light","text":"问她什么时刻才能点亮","nextSceneId":"golden_bough_015","resultText":"你选择“问她什么时刻才能点亮”。阿尔比娜：黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","resultVoiceAssetId":"voice.result.rebuild_014_ask_when_to_light","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["lighting_condition_asked"],"unlockCg":["cg.araya_rooftop"]}}]},{"version":2,"id":"golden_bough_015","chapter":15,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_scene_15","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_scene_15","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"黎明把金枝的光尘压成一层很薄的金属。她抬头看你，第一次没有问该不该重构自己，而是说：谢谢你愿意陪我等到这一层颜色冷却。","voiceAssetId":"voice.scene.golden_bough_015","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_route_final","text":"为金枝重构路线落最后一笔","nextSceneId":"golden_bough_rebuild_ending_gate","resultText":"你选择“为金枝重构路线落最后一笔”。金枝重构路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.golden_bough_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["golden_bough_route_final"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_gate","chapter":16,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"金枝重构的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_gate","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[{"id":"golden_bough_rebuild_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"golden_bough_rebuild_ending_true","resultText":"结局判定完成：金枝重构·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.true_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]},"effects":{"setFlags":["ending_golden_bough_rebuild_true_qualified"]}},{"id":"golden_bough_rebuild_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"golden_bough_rebuild_ending_normal","resultText":"结局判定完成：金枝重构·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_golden_bough_rebuild_normal_qualified"]}},{"id":"golden_bough_rebuild_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"golden_bough_rebuild_ending_bad","resultText":"结局判定完成：金枝重构·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.golden_bough_rebuild.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]},"effects":{"setFlags":["ending_golden_bough_rebuild_bad_qualified"]}}]},{"version":2,"id":"golden_bough_rebuild_ending_true","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_true","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_true","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"金枝残响终于与法西娅的心跳重合。阿尔比娜记得每一次称呼、暂停和重新确认；她以新的身体醒来，也完整记得是谁陪她走过重构。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_true","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":56},{"kind":"value","key":"artResonance","operator":"gte","value":50},{"kind":"value","key":"danger","operator":"lte","value":8}]}}},{"version":2,"id":"golden_bough_rebuild_ending_normal","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_normal","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_normal","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"重构在可控范围内结束。部分残响仍被封存在金色薄膜后，但阿尔比娜认得你，也认得自己。你们决定把余下修复交给时间。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_normal","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"golden_bough_rebuild_ending_bad","chapter":17,"route":"golden_bough_rebuild","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.golden_bough_ending","videoAssetId":"video.animated.runtime.golden_bough_rebuild_ending_bad","desktopVideoAssetId":"video.animated.desktop.golden_bough_rebuild_ending_bad","tone":"golden","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"稳定槽保住了身体，却没能保住全部连续性。阿尔比娜醒来时仍然礼貌，只把你当作可靠的见证者；被遗漏的称呼沉在金枝深处。","voiceAssetId":"voice.scene.golden_bough_rebuild_ending_bad","bgmAssetId":"file.audio.bgm.title.theme.mp3","choices":[],"ending":{"route":"golden_bough_rebuild","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"golden_bough_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":49},{"kind":"value","key":"artResonance","operator":"lte","value":44}]}}},{"version":2,"id":"ring_conspiracy_001","chapter":1,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.ring-conspiracy","position":"center","active":true,"scale":1},{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"right","active":false,"scale":0.84}],"speaker":"阿尔比娜","text":"蜘蛛巢的灯光像手术刀一样落下。她向你递来一份没有署名的委托，笑得礼貌又危险。","voiceAssetId":"voice.scene.ring_conspiracy_001","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_accept","text":"接下委托，但保留自己的条件","nextSceneId":"ring_conspiracy_002","resultText":"你选择“接下委托，但保留自己的条件”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_accept","effects":{"values":{"trust":2,"danger":3,"artResonance":3},"setFlags":["contract_with_boundary"],"unlockCg":["cg.conspiracy_contract"]}},{"id":"conspiracy_pressure","text":"逼她说出真正目标","nextSceneId":"ring_conspiracy_002","resultText":"你选择“逼她说出真正目标”。阿尔比娜：她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","resultVoiceAssetId":"voice.result.conspiracy_pressure","effects":{"values":{"affectionAlbina":1,"danger":4,"artResonance":2},"setFlags":["pressed_true_goal"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_002","chapter":2,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"right","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"left","active":false,"scale":0.95}],"speaker":"阿尔比娜","text":"她第一次没有把怒意伪装成礼貌。那不是要毁掉你的眼神，更像是不允许任何人替她决定你的用途。","voiceAssetId":"voice.scene.ring_conspiracy_002","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_escape_to_backstreets","text":"带着未签名委托冲出画廊","nextSceneId":"ring_conspiracy_003","resultText":"你选择“带着未签名委托冲出画廊”。环指代理人：追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","resultVoiceAssetId":"voice.result.conspiracy_escape_to_backstreets","effects":{"values":{"trust":2,"danger":3,"artResonance":2},"setFlags":["ring_escape_committed"],"unlockCg":["cg.backstreet_pursuit"]}},{"id":"return_opening_from_ring","text":"回到路线选择","nextSceneId":"opening_001","resultText":"你选择“回到路线选择”。阿尔比娜：晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。","resultVoiceAssetId":"voice.result.return_opening_from_ring","effects":{"values":{"trust":1,"danger":-1},"setFlags":["conspiracy_looped"]}}]},{"version":2,"id":"ring_conspiracy_003","chapter":3,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_3","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_3","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"追兵把雨巷切成一个个展格，仿佛你们已经是可出售的连环画。阿尔比娜没有回头，只把法西娅横在你和委托书之间。","voiceAssetId":"voice.scene.ring_conspiracy_003","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_break_pursuit_frame","text":"打碎追兵布下的取景框","nextSceneId":"ring_conspiracy_004","resultText":"你选择“打碎追兵布下的取景框”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_break_pursuit_frame","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["pursuit_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_feed_false_signature","text":"交出伪造签名引开视线","nextSceneId":"ring_conspiracy_004","resultText":"你选择“交出伪造签名引开视线”。阿尔比娜：回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","resultVoiceAssetId":"voice.result.conspiracy_feed_false_signature","effects":{"values":{"trust":2,"danger":-1,"artResonance":4},"setFlags":["false_signature_planted"],"unlockCg":["cg.ren_interruption"]}}]},{"version":2,"id":"ring_conspiracy_004","chapter":4,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"回到蜘蛛画廊时，所有灯都向她弯下去。她把那份委托钉在空框里，语气平静：如果他们要收藏背叛，就先学会被背叛凝视。","voiceAssetId":"voice.scene.ring_conspiracy_004","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"ring_conspiracy_route_complete","text":"记录环指共谋路线的暂定结局","nextSceneId":"ring_conspiracy_005","resultText":"你选择“记录环指共谋路线的暂定结局”。卡利斯托：卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_complete","effects":{"values":{"affectionAlbina":1,"trust":2,"danger":-2,"artResonance":3},"setFlags":["ring_conspiracy_route_complete"],"unlockCg":["cg.ring_conspiracy_ending"]}}]},{"version":2,"id":"ring_conspiracy_005","chapter":5,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_5","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_5","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.86},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"卡利斯托把另一份署了名的委托推到你们中间，笑得像在挑礼物：既然上次没有展出你的缺陷，这次不如让你们两个一起成为一件合作作品。","voiceAssetId":"voice.scene.ring_conspiracy_005","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_005_refuse_duo","text":"当众拒绝成为合作展品","nextSceneId":"ring_conspiracy_006","resultText":"你选择“当众拒绝成为合作展品”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_refuse_duo","effects":{"values":{"trust":3,"danger":2,"artResonance":3},"setFlags":["duo_exhibit_refused"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_005_let_her_answer","text":"不替她回答，让阿尔比娜开口","nextSceneId":"ring_conspiracy_006","resultText":"你选择“不替她回答，让阿尔比娜开口”。阿尔比娜：蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","resultVoiceAssetId":"voice.result.conspiracy_005_let_her_answer","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["albina_answered_herself"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_006","chapter":6,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.conspiracy_contract","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"阿尔比娜","text":"蜘蛛画廊的灯突然转向她。她把法西娅插进墙上一幅空框，声音很冷：你们想收藏我，那就先学会被我凝视。","voiceAssetId":"voice.scene.ring_conspiracy_006","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_006_stand_with_her","text":"站到她身侧，分担凝视","nextSceneId":"ring_conspiracy_007","resultText":"你选择“站到她身侧，分担凝视”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_stand_with_her","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":1,"artResonance":3},"setFlags":["gaze_shared"],"unlockCg":["cg.maestro_shadow"]}},{"id":"conspiracy_006_block_view","text":"挡在她和委托人之间","nextSceneId":"ring_conspiracy_007","resultText":"你选择“挡在她和委托人之间”。环指代理人：雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","resultVoiceAssetId":"voice.result.conspiracy_006_block_view","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":3,"artResonance":2},"setFlags":["view_blocked"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_007","chapter":7,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"backstreets_rain","backgroundAssetId":"bg.backstreets_rain","cgAssetId":"cg.backstreet_pursuit","tone":"threat","portraits":[{"characterId":"ring_agent","portraitAssetId":"portrait.ring_agent.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"雨巷的尽头被代理人堵住。他不拔武器，只是举起一面空画框，要把你们框进环指的目录。阿尔比娜低声让你选：是冲破画框，还是把它抢过来。","voiceAssetId":"voice.scene.ring_conspiracy_007","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_007_break_frame","text":"冲破画框","nextSceneId":"ring_conspiracy_008","resultText":"你选择“冲破画框”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_break_frame","effects":{"values":{"trust":3,"danger":3,"artResonance":3},"setFlags":["street_frame_broken"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_007_seize_frame","text":"把画框抢过来，反过来框住他","nextSceneId":"ring_conspiracy_008","resultText":"你选择“把画框抢过来，反过来框住他”。LCE 医师：LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","resultVoiceAssetId":"voice.result.conspiracy_007_seize_frame","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["frame_seized"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_008","chapter":8,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"lce_lab","backgroundAssetId":"bg.lce_lab","cgAssetId":"cg.lce_raid","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_8","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_8","tone":"threat","portraits":[{"characterId":"lce_doctor","portraitAssetId":"portrait.lce_doctor.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.surgical","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.serious","position":"right","active":false,"scale":0.9}],"speaker":"LCE 医师","text":"LCE 把你们暂扣在手术间。医师递来一份中立证词表，说只要她肯指认环指，就帮她换掉被环指标注过的接口。她没有看表，先看你。","voiceAssetId":"voice.scene.ring_conspiracy_008","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_008_refuse_testimony","text":"当面拒绝用她换取证词","nextSceneId":"ring_conspiracy_009","resultText":"你选择“当面拒绝用她换取证词”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_refuse_testimony","effects":{"values":{"affectionAlbina":2,"trust":5,"danger":2,"artResonance":2},"setFlags":["testimony_refused"],"unlockCg":["cg.lce_raid"]}},{"id":"conspiracy_008_hand_pen_to_her","text":"把笔交还给她，由她自己决定","nextSceneId":"ring_conspiracy_009","resultText":"你选择“把笔交还给她，由她自己决定”。阿尔比娜：镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","resultVoiceAssetId":"voice.result.conspiracy_008_hand_pen_to_her","effects":{"values":{"affectionAlbina":3,"trust":4,"artResonance":3},"setFlags":["pen_returned_to_albina"],"unlockCg":["cg.conspiracy_contract"]}}]},{"version":2,"id":"ring_conspiracy_009","chapter":9,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"mirror_corridor","backgroundAssetId":"bg.mirror_corridor","cgAssetId":"cg.maestro_shadow","tone":"gallery","portraits":[{"characterId":"golden_apparition","portraitAssetId":"portrait.golden_apparition.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"镜廊里同时映出\\"环指版的她\\"和\\"现在的她\\"。她让法西娅在两面镜子之间选一面，然后问你：你愿意被哪一个版本记得？","voiceAssetId":"voice.scene.ring_conspiracy_009","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_009_choose_present","text":"选现在的她，不挑那个环指版","nextSceneId":"ring_conspiracy_010","resultText":"你选择“选现在的她，不挑那个环指版”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_choose_present","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["present_albina_chosen"],"unlockCg":["cg.art_resonance"]}},{"id":"conspiracy_009_refuse_choice","text":"拒绝回答，让她自己挑镜子","nextSceneId":"ring_conspiracy_010","resultText":"你选择“拒绝回答，让她自己挑镜子”。卡利斯托：卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","resultVoiceAssetId":"voice.result.conspiracy_009_refuse_choice","effects":{"values":{"affectionAlbina":2,"trust":4,"artResonance":4},"setFlags":["mirror_choice_returned"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_010","chapter":10,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"ring_atelier","backgroundAssetId":"bg.ring_atelier","cgAssetId":"cg.conspiracy_contract","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.furious","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"卡利斯托","text":"卡利斯托拿出一枚\\"合作者徽章\\"，说只要她肯戴上，环指就放过你。阿尔比娜笑了一下，把徽章塞进你掌心：你来替我决定，要不要让我用它换你。","voiceAssetId":"voice.scene.ring_conspiracy_010","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_010_throw_badge","text":"把徽章扔回卡利斯托脸上","nextSceneId":"ring_conspiracy_011","resultText":"你选择“把徽章扔回卡利斯托脸上”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_throw_badge","effects":{"values":{"affectionAlbina":3,"trust":4,"danger":3,"artResonance":2},"setFlags":["badge_thrown"],"unlockCg":["cg.combat_transition_01"]}},{"id":"conspiracy_010_keep_badge_unworn","text":"收下徽章，但谁都不许戴","nextSceneId":"ring_conspiracy_011","resultText":"你选择“收下徽章，但谁都不许戴”。环指代理人：代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","resultVoiceAssetId":"voice.result.conspiracy_010_keep_badge_unworn","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":1,"artResonance":4},"setFlags":["badge_kept_unworn"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_011","chapter":11,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"spider_gallery","backgroundAssetId":"bg.spider_gallery","cgAssetId":"cg.maestro_shadow","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_11","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_11","tone":"threat","portraits":[{"characterId":"ren","portraitAssetId":"portrait.ren.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.combat","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.battle","position":"right","active":false,"scale":0.92}],"speaker":"环指代理人","text":"代理人撕下礼貌，举出一卷写好剧本的胶片：今晚的故事已经定稿，结局是你们两个都被装裱。阿尔比娜握紧法西娅，低声让你替她改写最后一格分镜。","voiceAssetId":"voice.scene.ring_conspiracy_011","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_011_rewrite_ending","text":"当众改写结局，让他们措手不及","nextSceneId":"ring_conspiracy_012","resultText":"你选择“当众改写结局，让他们措手不及”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_rewrite_ending","effects":{"values":{"trust":4,"danger":2,"artResonance":4},"setFlags":["ending_rewritten"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_011_burn_film","text":"直接烧掉胶片，让剧本作废","nextSceneId":"ring_conspiracy_012","resultText":"你选择“直接烧掉胶片，让剧本作废”。维吉利乌斯：楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","resultVoiceAssetId":"voice.result.conspiracy_011_burn_film","effects":{"values":{"trust":3,"danger":4,"artResonance":3},"setFlags":["film_burned"],"unlockCg":["cg.combat_transition_01"]}}]},{"version":2,"id":"ring_conspiracy_012","chapter":12,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"city_rooftop","backgroundAssetId":"bg.city_rooftop","cgAssetId":"cg.araya_rooftop","tone":"threat","portraits":[{"characterId":"vergilius","portraitAssetId":"portrait.vergilius.normal","position":"left","active":false,"scale":0.84},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"right","active":false,"scale":0.92}],"speaker":"维吉利乌斯","text":"楼顶上，维吉利乌斯把一柄已经卸下锋刃的环指画刀扔在你们脚边：用这个结束今晚，或者用它开始下一次共谋，你们自己挑。","voiceAssetId":"voice.scene.ring_conspiracy_012","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.slash.heavy.wav"],"choices":[{"id":"conspiracy_012_end_tonight","text":"选择结束今晚的共谋","nextSceneId":"ring_conspiracy_013","resultText":"你选择“选择结束今晚的共谋”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_end_tonight","effects":{"values":{"affectionAlbina":2,"trust":3,"danger":-2,"artResonance":3},"setFlags":["night_ended"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_012_keep_blade","text":"收下画刀，留给未来必要时再用","nextSceneId":"ring_conspiracy_013","resultText":"你选择“收下画刀，留给未来必要时再用”。阿尔比娜：夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","resultVoiceAssetId":"voice.result.conspiracy_012_keep_blade","effects":{"values":{"affectionAlbina":1,"trust":4,"danger":1,"artResonance":4},"setFlags":["blade_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_013","chapter":13,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"limbus_bus","backgroundAssetId":"bg.limbus_bus","cgAssetId":"cg.limbus_bus_night","tone":"quiet","portraits":[{"characterId":"dante","portraitAssetId":"portrait.dante.normal","position":"left","active":false,"scale":0.8},{"characterId":"albina","portraitAssetId":"portrait.albina.rain","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.wet-hair","position":"right","active":false,"scale":0.9}],"speaker":"阿尔比娜","text":"夜班巴士把你们带离环指的视线。她靠在窗边，把法西娅从胸口取出来放在你掌心一秒：今晚我借你这一秒心跳，作为不签名的合作凭证。","voiceAssetId":"voice.scene.ring_conspiracy_013","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"conspiracy_013_hold_one_second","text":"认真握住那一秒，不多不少","nextSceneId":"ring_conspiracy_014","resultText":"你选择“认真握住那一秒，不多不少”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_hold_one_second","effects":{"values":{"affectionAlbina":4,"trust":3,"artResonance":3},"setFlags":["one_second_held"],"unlockCg":["cg.fascia_heartbeat"]}},{"id":"conspiracy_013_return_gently","text":"提前把它轻轻送回，不占有","nextSceneId":"ring_conspiracy_014","resultText":"你选择“提前把它轻轻送回，不占有”。卡利斯托：巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","resultVoiceAssetId":"voice.result.conspiracy_013_return_gently","effects":{"values":{"affectionAlbina":2,"trust":5,"artResonance":4},"setFlags":["heartbeat_returned_early"],"unlockCg":["cg.rain_confession"]}}]},{"version":2,"id":"ring_conspiracy_014","chapter":14,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"nest_station","backgroundAssetId":"bg.nest_station","cgAssetId":"cg.ring_conspiracy_ending","tone":"gallery","portraits":[{"characterId":"callisto","portraitAssetId":"portrait.callisto.normal","position":"left","active":false,"scale":0.82},{"characterId":"albina","portraitAssetId":"portrait.albina.maestro","position":"center","active":true,"scale":1},{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.shadow","position":"right","active":false,"scale":0.9}],"speaker":"卡利斯托","text":"巢穴车站最后一盏灯下，卡利斯托最后一次出现，递来一张空白入场券：你愿意把今晚写进环指的目录，还是彻底从目录里抹去？","voiceAssetId":"voice.scene.ring_conspiracy_014","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","sfxAssetIds":["file.audio.se.glass.shatter.wav"],"choices":[{"id":"conspiracy_014_erase_from_catalog","text":"选择从环指目录里彻底抹去","nextSceneId":"ring_conspiracy_015","resultText":"你选择“选择从环指目录里彻底抹去”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_erase_from_catalog","effects":{"values":{"affectionAlbina":2,"trust":4,"danger":-2,"artResonance":3},"setFlags":["catalog_erased"],"unlockCg":["cg.ring_conspiracy_ending"]}},{"id":"conspiracy_014_keep_one_line","text":"只保留一行不被署名的记录","nextSceneId":"ring_conspiracy_015","resultText":"你选择“只保留一行不被署名的记录”。阿尔比娜：城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","resultVoiceAssetId":"voice.result.conspiracy_014_keep_one_line","effects":{"values":{"affectionAlbina":3,"trust":3,"artResonance":4},"setFlags":["anonymous_line_kept"],"unlockCg":["cg.maestro_shadow"]}}]},{"version":2,"id":"ring_conspiracy_015","chapter":15,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_scene_15","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_scene_15","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"城郊黎明把环指的灯火远远压在身后。她停下脚步，把那柄卸下锋刃的画刀插进土里：今晚的共谋到此为止，下一次见面，我会以自己的名义邀请你。","voiceAssetId":"voice.scene.ring_conspiracy_015","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_route_final","text":"为环指共谋路线合上最后一卷胶片","nextSceneId":"ring_conspiracy_ending_gate","resultText":"你选择“为环指共谋路线合上最后一卷胶片”。环指共谋路线终章已封存，进入固定结局资格判定。","resultVoiceAssetId":"voice.result.ring_conspiracy_route_final","effects":{"values":{"affectionAlbina":3,"trust":3,"danger":-2,"artResonance":4},"setFlags":["ring_conspiracy_route_final"]}}]},{"version":2,"id":"ring_conspiracy_ending_gate","chapter":16,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"叙事记录","text":"环指共谋的全部选择已封存。系统将只依据持久状态判定结局，不请求任何运行时生成。","voiceAssetId":"voice.scene.ring_conspiracy_ending_gate","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[{"id":"ring_conspiracy_choose_true_ending","text":"确认彼此共同抵达的真结局","nextSceneId":"ring_conspiracy_ending_true","resultText":"结局判定完成：环指共谋·TRUE。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.true_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]},"effects":{"setFlags":["ending_ring_conspiracy_true_qualified"]}},{"id":"ring_conspiracy_choose_normal_ending","text":"接受仍留有余白的普通结局","nextSceneId":"ring_conspiracy_ending_normal","resultText":"结局判定完成：环指共谋·NORMAL。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.normal_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true},"effects":{"setFlags":["ending_ring_conspiracy_normal_qualified"]}},{"id":"ring_conspiracy_choose_bad_ending","text":"承认这次未能跨过的坏结局","nextSceneId":"ring_conspiracy_ending_bad","resultText":"结局判定完成：环指共谋·BAD。资格规则与选择记录已固定写入。","resultVoiceAssetId":"voice.result.ring_conspiracy.bad_ending","availability":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]},"effects":{"setFlags":["ending_ring_conspiracy_bad_qualified"]}}]},{"version":2,"id":"ring_conspiracy_ending_true","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_true","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_true","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"环指的目录里只剩一页无法归档的空白。阿尔比娜以自己的名字向你发出下一次邀请；你们不再是展品或棋子，而是彼此承认的共谋者。","voiceAssetId":"voice.scene.ring_conspiracy_ending_true","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"true","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true},{"kind":"value","key":"trust","operator":"gte","value":49},{"kind":"value","key":"artResonance","operator":"gte","value":49},{"kind":"value","key":"danger","operator":"lte","value":15}]}}},{"version":2,"id":"ring_conspiracy_ending_normal","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_normal","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_normal","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"你们离开了画廊，也留下了一条匿名记录作为制衡。危险没有消失，但契约已被改写；阿尔比娜把下一次会面留给更安全的夜晚。","voiceAssetId":"voice.scene.ring_conspiracy_ending_normal","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"normal","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"fallback":true}}},{"version":2,"id":"ring_conspiracy_ending_bad","chapter":17,"route":"ring_conspiracy","provenance":{"classification":"AU_extension","scope":"route","claimIds":["boundary.routes-and-player.are-AU"],"sourceIds":["source.official.canto-ix.9-43","source.project.legacy-v1.0.44"],"note":"Project-authored route content after the explicit 9-37 divergence; never source-game canon."},"locationId":"outskirts_dawn","backgroundAssetId":"bg.outskirts_dawn","cgAssetId":"cg.ring_conspiracy_ending","videoAssetId":"video.animated.runtime.ring_conspiracy_ending_bad","desktopVideoAssetId":"video.animated.desktop.ring_conspiracy_ending_bad","tone":"quiet","portraits":[{"characterId":"protagonist","portraitAssetId":"portrait.protagonist.resolve","position":"left","active":false,"scale":0.92},{"characterId":"albina","portraitAssetId":"portrait.albina.endgame","position":"center","active":true,"scale":1}],"speaker":"阿尔比娜","text":"追击停止时，代价已经写进彼此的沉默。你们逃出了装裱，却没能保住共同节奏；阿尔比娜独自带走那柄无锋画刀，没有约定再见。","voiceAssetId":"voice.scene.ring_conspiracy_ending_bad","bgmAssetId":"file.audio.bgm.boss.kromer.mp3","choices":[],"ending":{"route":"ring_conspiracy","kind":"bad","eligibility":{"allOf":[{"kind":"flag","flag":"ring_conspiracy_route_final","equals":true}],"anyOf":[{"kind":"value","key":"trust","operator":"lte","value":44},{"kind":"value","key":"danger","operator":"gte","value":18}]}}}]'), Q6 = {
  version: W6,
  projectId: G6,
  initialSceneId: J6,
  routeEntrySceneIds: Y6,
  scenes: X6
}, e3 = ee({
  white_canvas: T().min(1),
  golden_bough_rebuild: T().min(1),
  ring_conspiracy: T().min(1)
}).strict(), t3 = ee({
  version: ve(Ti),
  projectId: ve("albina-galgame-card"),
  initialSceneId: T().min(1),
  routeEntrySceneIds: e3,
  scenes: pe(S6).min(1)
}).strict();
function Co(e, t, i) {
  e.addIssue({
    code: "custom",
    path: t,
    message: `Unknown scene reference: ${i}`
  });
}
const Vf = t3.superRefine((e, t) => {
  const i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), n = new Map(e.scenes.map((s) => [s.id, s]));
  e.scenes.forEach((s, r) => {
    i.has(s.id) && t.addIssue({ code: "custom", path: ["scenes", r, "id"], message: `Duplicate scene id: ${s.id}` }), i.add(s.id), s.choices.forEach((c, d) => {
      a.has(c.id) && t.addIssue({ code: "custom", path: ["scenes", r, "choices", d, "id"], message: `Duplicate choice id: ${c.id}` }), a.add(c.id);
    });
  }), i.has(e.initialSceneId) || Co(t, ["initialSceneId"], e.initialSceneId);
  const o = n.get(e.initialSceneId);
  o && o.provenance.scope !== "canon_recap" && t.addIssue({ code: "custom", path: ["initialSceneId"], message: "Initial scene must begin the canon recap" }), Object.entries(e.routeEntrySceneIds).forEach(([s, r]) => {
    i.has(r) || Co(t, ["routeEntrySceneIds", s], r);
    const c = n.get(r);
    c && (c.route !== s || c.provenance.classification !== "AU_extension") && t.addIssue({ code: "custom", path: ["routeEntrySceneIds", s], message: `Route entry must be AU_extension content for ${s}` });
  }), e.scenes.forEach((s, r) => {
    s.choices.forEach((c, d) => {
      i.has(c.nextSceneId) || Co(t, ["scenes", r, "choices", d, "nextSceneId"], c.nextSceneId);
    });
  });
});
function i3(e) {
  const t = Df.parse(e), i = new Map(t.assets.map((n) => [n.id, n])), a = new Set(t.portraits.map((n) => n.id));
  return Vf.superRefine((n, o) => {
    n.scenes.forEach((s, r) => {
      [
        [s.backgroundAssetId, ["scenes", r, "backgroundAssetId"]],
        [s.cgAssetId, ["scenes", r, "cgAssetId"]]
      ].forEach(([l, p]) => l && Di(o, i, l, "image", p)), [
        [s.videoAssetId, ["scenes", r, "videoAssetId"]],
        [s.desktopVideoAssetId, ["scenes", r, "desktopVideoAssetId"]]
      ].forEach(([l, p]) => l && Di(o, i, l, "video", p)), [
        [s.voiceAssetId, ["scenes", r, "voiceAssetId"]],
        [s.bgmAssetId, ["scenes", r, "bgmAssetId"]]
      ].forEach(([l, p]) => l && Di(o, i, l, "audio", p)), s.sfxAssetIds?.forEach((l, p) => Di(o, i, l, "audio", ["scenes", r, "sfxAssetIds", p])), s.portraits.forEach((l, p) => {
        a.has(l.portraitAssetId) || jf(o, ["scenes", r, "portraits", p, "portraitAssetId"], l.portraitAssetId);
      }), s.choices.forEach((l, p) => {
        l.resultVoiceAssetId && Di(o, i, l.resultVoiceAssetId, "audio", ["scenes", r, "choices", p, "resultVoiceAssetId"]), l.effects.unlockCg?.forEach((m, h) => Di(o, i, m, "image", ["scenes", r, "choices", p, "effects", "unlockCg", h]));
      });
    });
  });
}
function jf(e, t, i) {
  e.addIssue({ code: "custom", path: t, message: `Unknown asset reference: ${i}` });
}
function Di(e, t, i, a, n) {
  const o = t.get(i);
  if (!o) {
    jf(e, n, i);
    return;
  }
  o.kind !== a && e.addIssue({ code: "custom", path: n, message: `Asset ${i} must be ${a}, found ${o.kind}` });
}
function a3(e, t) {
  return t === void 0 ? Vf.parse(e) : i3(t).parse(e);
}
const n3 = ee({ intimacy: ne().finite(), reliance: ne().finite(), obsession: ne().finite(), suspicion: ne().finite() }).strict(), o3 = ee({ composure: ne().finite(), materials: ne().finite(), leverage: ne().finite(), exposure: ne().finite() }).strict(), s3 = ee({ blade: ne().finite(), boundary: ne().finite(), analysis: ne().finite(), resonance: ne().finite() }).strict(), r3 = ee({
  affectionAlbina: ne().finite(),
  trust: ne().finite(),
  danger: ne().finite(),
  artResonance: ne().finite(),
  relationshipVectors: n3,
  routeEconomy: o3,
  conflictMastery: s3
}).strict(), c3 = ee({
  name: T(),
  gender: T(),
  appearance: T(),
  background: T(),
  addressName: T(),
  boundaries: T(),
  routePreference: Za
}).strict(), d3 = ee({
  ownedIds: pe(T().min(1)),
  equipped: ee({
    weapon: T().min(1).optional(),
    armor: T().min(1).optional(),
    accessory: T().min(1).optional(),
    tool: T().min(1).optional()
  }).strict(),
  outfitIds: pe(T().min(1)),
  activeOutfitId: T()
}).strict();
function cs(e, t) {
  if (e === null || typeof e == "string" || typeof e == "boolean") return !0;
  if (typeof e == "number") return Number.isFinite(e);
  if (typeof e != "object" || t.has(e)) return !1;
  t.add(e);
  const i = Array.isArray(e) ? e.every((a) => cs(a, t)) : (Object.getPrototypeOf(e) === Object.prototype || Object.getPrototypeOf(e) === null) && Object.values(e).every((a) => cs(a, t));
  return t.delete(e), i;
}
const u3 = f6((e) => e !== null && typeof e == "object" && !Array.isArray(e) && cs(e, /* @__PURE__ */ new WeakSet()), { message: "Log entries must contain only finite JSON values" }), xe = pe(u3), l3 = ee({
  history: xe,
  timeline: xe,
  routeActions: xe,
  routeActivity: xe,
  progressionUnlocks: xe,
  consequences: xe,
  routeEvents: xe,
  replayAnchors: xe,
  routeObjectives: xe,
  watchSignals: xe,
  narrativeIndex: xe,
  openingDrafts: xe,
  conflicts: xe,
  exchanges: xe,
  contacts: xe,
  achievements: xe,
  realityOverlays: xe,
  sceneBranches: xe,
  story: xe,
  storySummaries: xe,
  dynamicMemories: xe
}).strict(), Pf = ee({
  version: ve(Ti),
  projectId: ve("albina-galgame-card"),
  saveId: T().min(1),
  createdAt: T().min(1),
  updatedAt: T().min(1),
  playerProfile: c3,
  route: Za.nullable(),
  chapter: ne().int().nonnegative(),
  sceneId: T().min(1),
  locationId: T(),
  values: r3,
  flags: Gv(T().min(1), co()),
  inventory: d3,
  quests: ee({
    completedNodeIds: pe(T().min(1)),
    currentMapNodeId: T(),
    progressLog: xe
  }).strict(),
  unlockedCg: pe(T().min(1)),
  logs: l3
}).strict(), xd = "1970-01-01T00:00:00.000Z";
function f3() {
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
function p3() {
  return {
    version: Ti,
    projectId: "albina-galgame-card",
    saveId: "albina-v2-recovered",
    createdAt: xd,
    updatedAt: xd,
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
    quests: { completedNodeIds: [], currentMapNodeId: "", progressLog: [] },
    unlockedCg: [],
    logs: f3()
  };
}
function ds(e) {
  return Array.isArray(e) ? e.map(ds) : e && typeof e == "object" ? Object.fromEntries(Object.entries(e).sort(([t], [i]) => t < i ? -1 : t > i ? 1 : 0).map(([t, i]) => [t, ds(i)])) : e;
}
function m3(e) {
  return JSON.stringify(ds(Pf.parse(e)), null, 2);
}
function Un(e) {
  return Pf.parse(e);
}
function Sd(e, t) {
  if (e.kind === "flag") return (t.flags[e.flag] ?? !1) === e.equals;
  const i = t.values[e.key];
  return e.operator === "gte" ? i >= e.value : e.operator === "lte" ? i <= e.value : i === e.value;
}
function g3(e, t) {
  if (!e) return !0;
  const i = e.allOf?.every((n) => Sd(n, t)) ?? !0, a = e.anyOf?.some((n) => Sd(n, t)) ?? !0;
  return e.fallback === !0 || i && a;
}
class tn {
  constructor(t, i = {}) {
    if (this.script = t, this.sceneById = new Map(t.scenes.map((a) => [a.id, a])), this.now = i.now ?? (() => (/* @__PURE__ */ new Date()).toISOString()), this.save = structuredClone(i.save ?? p3()), !i.save || !this.sceneById.has(this.save.sceneId)) {
      const a = this.sceneById.get(t.initialSceneId);
      if (!a) throw new Error(`Unknown initial scene: ${t.initialSceneId}`);
      this.save.sceneId = a.id, this.save.chapter = a.chapter, this.save.locationId = a.locationId, a.route !== null && (this.save.route = a.route);
    }
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
    return this.scene.choices.filter((t) => g3(t.availability, this.save));
  }
  replaceSave(t) {
    if (!this.sceneById.has(t.sceneId)) throw new Error(`Save references unknown scene: ${t.sceneId}`);
    this.save = structuredClone(t);
  }
  choose(t) {
    const i = this.choices.find((o) => o.id === t);
    if (!i) throw new Error(`Choice is unavailable: ${t}`);
    const a = i.effects;
    a.route && (this.save.route = a.route);
    for (const [o, s] of Object.entries(a.values ?? {}))
      if (s !== void 0)
        if (o in this.save.values) {
          const r = o;
          this.save.values[r] += s;
        } else {
          const r = o;
          this.save.values.routeEconomy[r] += s;
        }
    a.setFlags?.forEach((o) => {
      this.save.flags[o] = !0;
    }), a.clearFlags?.forEach((o) => {
      this.save.flags[o] = !1;
    }), a.unlockCg?.forEach((o) => {
      this.save.unlockedCg.includes(o) || this.save.unlockedCg.push(o);
    }), a.grantItems?.forEach((o) => {
      this.save.inventory.ownedIds.includes(o) || this.save.inventory.ownedIds.push(o);
    }), a.completeQuests?.forEach((o) => {
      this.save.quests.completedNodeIds.includes(o) || this.save.quests.completedNodeIds.push(o);
    });
    const n = this.sceneById.get(i.nextSceneId);
    if (!n) throw new Error(`Choice references unknown scene: ${i.nextSceneId}`);
    return this.save.sceneId = n.id, this.save.chapter = n.chapter, n.route !== null && (this.save.route = n.route), this.save.locationId = n.locationId, this.save.updatedAt = this.now(), this.save.logs.sceneBranches.push({ choiceId: t, sceneId: n.id, at: this.save.updatedAt }), { choice: i, ...i.resultText ? { resultText: i.resultText } : {}, scene: n };
  }
  interpolate(t) {
    return t.replaceAll("{{user}}", this.save.playerProfile.name || "你");
  }
}
class h3 {
  constructor(t, i, a, n = (o, s) => fetch(o, s)) {
    this.manifest = t, this.storage = i, this.baseUrl = a, this.fetchAsset = n;
  }
  manifest;
  storage;
  baseUrl;
  fetchAsset;
  inflight = /* @__PURE__ */ new Map();
  remoteUrl(t) {
    return Gs(this.manifest, t, this.baseUrl);
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
    const i = this.manifest.portraits.find((o) => o.id === t);
    if (!i) return;
    const a = await this.storage.getAssetUrl(t);
    if (a) return a;
    const n = `${this.baseUrl.replace(/\/$/u, "")}/${this.manifest.basePath}/${i.path.split("/").map(encodeURIComponent).join("/")}`;
    try {
      const o = await this.fetchAsset(n, { credentials: "omit", mode: "cors" });
      return o.ok ? (await this.storage.cacheAsset(t, await o.blob()), await this.storage.getAssetUrl(t) ?? n) : n;
    } catch {
      return n;
    }
  }
  singleFlight(t, i) {
    const a = this.inflight.get(t);
    if (a) return a;
    const o = i().then(
      (s) => (this.inflight.get(t) === o && this.inflight.delete(t), s),
      (s) => {
        throw this.inflight.get(t) === o && this.inflight.delete(t), s;
      }
    );
    return this.inflight.set(t, o), o;
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
const Od = "albina-v2-save", No = "albinaSaveV2";
function Do() {
  return typeof window > "u" ? void 0 : window.TavernHelper;
}
function b3() {
  return {
    getChatId: () => Do()?.getChatId?.() ?? "standalone",
    async loadSave() {
      const e = Do();
      if (e?.getVariables) {
        const i = await e.getVariables({ type: "chat" });
        if (i[No]) return Un(i[No]);
      }
      const t = typeof localStorage > "u" ? null : localStorage.getItem(Od);
      return t ? Un(JSON.parse(t)) : void 0;
    },
    async saveSave(e) {
      const t = Do();
      t?.setVariables && await t.setVariables({ [No]: e }, { type: "chat" }), typeof localStorage < "u" && localStorage.setItem(Od, JSON.stringify(e));
    },
    subscribe(e, t) {
      if (typeof window > "u") return () => {
      };
      const i = `albina:${e}`;
      return window.addEventListener(i, t), () => window.removeEventListener(i, t);
    }
  };
}
function _3(e) {
  return new Audio(e);
}
function $t(e) {
  e && (e.pause(), e.currentTime = 0, e.src = "");
}
class v3 {
  constructor(t = _3) {
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
    const a = this.lifecycleGeneration, n = ++this.bgmGeneration, o = this.takePreviousBgm(), s = this.createAudio(t);
    s.src = t, s.loop = !0, s.volume = i > 0 ? 0 : this.bgmVolume(), this.bgm = s, this.pendingBgmPrevious = o;
    const r = () => this.isCurrentBgm(s, a, n);
    return await this.tryPlay(s, r) ? (this.pendingBgmPrevious = void 0, !o || i <= 0 ? ($t(o), s.volume = this.bgmVolume(), !0) : (await this.crossfade(o, s, i), r())) : (r(), !1);
  }
  enqueueVoice(t) {
    const i = new Promise((a) => this.voiceQueue.push({ source: t, resolve: a }));
    return this.playNextVoice(), i;
  }
  async playSfx(t) {
    const i = this.createAudio(t);
    i.src = t, i.loop = !1;
    const a = () => {
      i.removeEventListener("ended", a), this.sfx.delete(i), $t(i);
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
      return await t.play(), this.isCurrentBlocked(t, i) ? (this.blocked = void 0, t === this.bgm && this.pendingBgmPrevious && ($t(this.pendingBgmPrevious), this.pendingBgmPrevious = void 0, t.volume = this.bgmVolume()), !0) : !1;
    } catch {
      return !1;
    }
  }
  stopAll() {
    this.lifecycleGeneration += 1, this.bgmGeneration += 1, this.cancelFade(), this.finishVoice(!1), this.voiceQueue.splice(0).forEach((i) => i.resolve(!1));
    const t = /* @__PURE__ */ new Set([this.bgm, this.blocked, this.pendingBgmPrevious, this.fadingOut]);
    this.sfx.forEach((i) => t.add(i)), t.forEach($t), this.sfx.clear(), this.bgm = void 0, this.blocked = void 0, this.pendingBgmPrevious = void 0, this.fadingOut = void 0;
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
    i && this.voiceEnded && i.removeEventListener("ended", this.voiceEnded), $t(i), this.blocked === i && (this.blocked = void 0), this.voice = void 0, this.voiceEnded = void 0;
    const a = this.activeVoiceJob;
    this.activeVoiceJob = void 0, i && this.bgm && (this.bgm.volume = 1), a?.resolve(t);
  }
  crossfade(t, i, a) {
    const o = a / 10, s = t.volume;
    let r = 0;
    return new Promise((c) => {
      this.fadingOut = t, this.fadeFinish = c;
      const d = () => {
        r += 1, t.volume = Math.max(0, s * (1 - r / 10)), i.volume = this.bgmVolume() * Math.min(1, r / 10), r >= 10 ? ($t(t), this.fadingOut = void 0, this.fadeTimer = void 0, this.fadeFinish = void 0, c()) : this.fadeTimer = setTimeout(d, o);
      };
      this.fadeTimer = setTimeout(d, o);
    });
  }
  cancelFade() {
    this.fadeTimer !== void 0 && clearTimeout(this.fadeTimer), this.fadeTimer = void 0, $t(this.fadingOut), this.fadingOut = void 0, this.fadeFinish?.(), this.fadeFinish = void 0;
  }
  takePreviousBgm() {
    if (this.pendingBgmPrevious) {
      const t = this.pendingBgmPrevious;
      return this.pendingBgmPrevious = void 0, this.blocked === this.bgm && (this.blocked = void 0), $t(this.bgm), t;
    }
    if (this.blocked === this.bgm) {
      this.blocked = void 0, $t(this.bgm);
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
class y3 {
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
function k3() {
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
class w3 {
  constructor(t, i, a = "") {
    this.manifest = t, this.baseUrl = a, this.environment = i ?? k3();
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
    const a = this.lifecycleGeneration, n = this.nextCanvasGeneration(i), o = this.findPortrait(t), s = i.getContext("2d");
    if (!s) throw new Error("Portrait canvas does not expose a 2D context");
    if (o.animation.kind === "static" || this.environment.reducedMotion()) {
      await this.drawStatic(o, s, i, a, n) && this.isCurrent(i, a, n) && this.playbacks.add({ canvas: i });
      return;
    }
    await this.playStrip(o, s, i, a, n);
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
  async drawStatic(t, i, a, n, o) {
    const s = t.fallbackAssetId ? this.manifest.assets.find((c) => c.id === t.fallbackAssetId) : void 0;
    let r;
    try {
      const c = await this.urlResolver?.(s?.id ?? t.id);
      r = await this.environment.loadImage(c ?? this.assetUrl(s?.path ?? t.path));
    } catch {
      return !1;
    }
    if (!this.isCurrent(a, n, o)) return !1;
    if (i.clearRect(0, 0, a.width, a.height), !s && t.animation.kind === "strip") {
      const c = t.animation;
      i.drawImage(r, 0, 0, c.frameWidth, c.frameHeight, 0, 0, a.width, a.height);
    } else i.drawImage(r, 0, 0, a.width, a.height);
    return !0;
  }
  async playStrip(t, i, a, n, o) {
    if (t.animation.kind !== "strip") return;
    const s = t.animation;
    let r;
    try {
      const l = await this.urlResolver?.(t.id);
      r = await this.environment.loadImage(l ?? this.assetUrl(t.path));
    } catch {
      if (!t.fallbackAssetId) return;
      await this.drawStatic(t, i, a, n, o) && this.isCurrent(a, n, o) && this.playbacks.add({ canvas: a });
      return;
    }
    if (!this.isCurrent(a, n, o)) return;
    const c = { canvas: a };
    this.playbacks.add(c);
    let d;
    const u = (l) => {
      if (!this.isCurrent(a, n, o)) return;
      d ??= l;
      const p = l - d, m = Math.floor(p / (1e3 / s.fps)) % s.frameCount;
      i.clearRect(0, 0, a.width, a.height), i.drawImage(r, m * s.frameWidth, 0, s.frameWidth, s.frameHeight, 0, 0, a.width, a.height), c.frameHandle = this.environment.requestFrame(u);
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
const an = "queue";
class I3 {
  constructor(t) {
    this.storage = t;
  }
  storage;
  operationTail = Promise.resolve();
  async enqueue(t) {
    await this.runExclusive(async () => {
      const i = await this.readQueue();
      i.push(t), await this.storage.setValue("specialCg", an, i);
    });
  }
  async peek() {
    return this.runExclusive(async () => (await this.readQueue())[0]);
  }
  async dequeue() {
    return this.runExclusive(async () => {
      const t = await this.readQueue(), i = t.shift();
      return await this.storage.setValue("specialCg", an, t), i;
    });
  }
  async clear() {
    await this.runExclusive(() => this.storage.deleteValue("specialCg", an));
  }
  async readQueue() {
    return await this.storage.getValue("specialCg", an) ?? [];
  }
  runExclusive(t) {
    const i = this.operationTail.then(t, t);
    return this.operationTail = i.then(() => {
    }, () => {
    }), i;
  }
}
const E3 = ["assets", "gallery", "specialCg", "saves"];
function nn(e) {
  return new Promise((t, i) => {
    e.onsuccess = () => t(e.result), e.onerror = () => i(e.error ?? new Error("IndexedDB request failed"));
  });
}
class A3 {
  constructor(t = indexedDB, i = "albina-runtime-v2") {
    this.factory = t, this.databaseName = i;
  }
  factory;
  databaseName;
  database;
  async get(t, i) {
    const a = await this.open();
    return nn(a.transaction(t, "readonly").objectStore(t).get(i));
  }
  async put(t, i, a) {
    const n = await this.open();
    await nn(n.transaction(t, "readwrite").objectStore(t).put(a, i));
  }
  async delete(t, i) {
    const a = await this.open();
    await nn(a.transaction(t, "readwrite").objectStore(t).delete(i));
  }
  async keys(t) {
    const i = await this.open();
    return (await nn(i.transaction(t, "readonly").objectStore(t).getAllKeys())).map(String);
  }
  close() {
    this.database?.then((t) => t.close()), this.database = void 0;
  }
  open() {
    return this.database ??= new Promise((t, i) => {
      const a = this.factory.open(this.databaseName, 1);
      a.onupgradeneeded = () => {
        for (const n of E3)
          a.result.objectStoreNames.contains(n) || a.result.createObjectStore(n);
      }, a.onsuccess = () => t(a.result), a.onerror = () => i(a.error ?? new Error("Unable to open IndexedDB"));
    }), this.database;
  }
}
function T3() {
  if (typeof URL.createObjectURL == "function")
    return { createObjectURL: (e) => URL.createObjectURL(e), revokeObjectURL: (e) => URL.revokeObjectURL(e) };
}
class x3 {
  constructor(t = new A3(), i) {
    this.backend = t, this.urlApi = i ?? T3();
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
    const n = this.objectUrlGeneration, o = this.createAssetUrl(t, n);
    this.pendingObjectUrls.set(t, o);
    const s = () => {
      this.pendingObjectUrls.get(t) === o && this.pendingObjectUrls.delete(t);
    };
    return o.then(s, s), o;
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
    const o = this.urlApi.createObjectURL(a);
    if (i !== this.objectUrlGeneration) {
      this.urlApi.revokeObjectURL(o);
      return;
    }
    return this.objectUrls.set(t, o), o;
  }
}
class S3 {
  active;
  write(t, i, a = 24) {
    return this.cancel(), t.length === 0 ? (i(""), Promise.resolve("")) : new Promise((n) => {
      let o = 0;
      const s = { text: t, sink: i, visible: "", resolve: n }, r = () => {
        s.visible = t.slice(0, o + 1), o += 1, i(s.visible), o >= t.length ? this.settle(s, t) : s.timer = setTimeout(r, Math.max(0, a));
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
class O3 {
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
class C3 {
  host;
  audio;
  portraits;
  gallery;
  storage;
  specialCg;
  typewriter = new S3();
  subscriptions = [];
  mounted = !1;
  constructor(t) {
    this.host = new O3(t.host), this.audio = new v3(t.audioFactory), this.storage = new x3(t.storageBackend, t.objectUrls), this.portraits = new w3(t.manifest, t.portraits, t.assetBaseUrl), this.gallery = new y3(this.storage), this.specialCg = new I3(this.storage);
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
function N3(e) {
  return new C3(e);
}
function Rf(e) {
  return new Promise((t) => {
    try {
      e.toBlob((i) => t(i ?? void 0), "image/jpeg", 0.82);
    } catch {
      t(void 0);
    }
  });
}
async function D3() {
  const e = document.createElement("canvas");
  e.width = 480, e.height = 270;
  const t = e.getContext("2d");
  if (!t) return new Blob(["thumbnail unavailable"], { type: "text/plain" });
  const i = t.createLinearGradient(0, 0, e.width, e.height);
  return i.addColorStop(0, "#050812"), i.addColorStop(1, "#3a2b13"), t.fillStyle = i, t.fillRect(0, 0, e.width, e.height), t.fillStyle = "#e2c46e", t.font = "28px serif", t.fillText("ALBINA", 28, 54), await Rf(e) ?? new Blob(["thumbnail unavailable"], { type: "text/plain" });
}
async function Cd(e = document) {
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
    const s = i.createLinearGradient(0, 0, t.width, t.height);
    s.addColorStop(0, "#050812"), s.addColorStop(1, "#3a2b13"), i.fillStyle = s, i.fillRect(0, 0, t.width, t.height), i.fillStyle = "#e2c46e", i.font = "28px serif", i.fillText("ALBINA", 28, 54);
  }
  const o = await Rf(t);
  return { blob: o ?? await D3(), capturedMedia: !!(o && n) };
}
function $f(e, t) {
  if (!(!t.videoEnabled || t.reducedMotion))
    return t.desktop && e.desktopVideoAssetId ? e.desktopVideoAssetId : e.videoAssetId;
}
function V3(e, t, i, a = (n) => Gs(t, n, i.baseUrl)) {
  const n = e.cgAssetId ?? e.backgroundAssetId, o = a(n), s = a(e.backgroundAssetId), r = $f(e, i), c = r ? a(r) : void 0;
  return { ...s ? { backgroundUrl: s } : {}, ...o ? { fallbackUrl: o } : {}, ...c ? { videoUrl: c } : {} };
}
const fi = $6(q6), fa = a3(Q6, fi), j3 = new Map(fa.scenes.map((e) => [e.id, e]));
function P3() {
  return new URL(
    /* @vite-ignore */
    "../",
    import.meta.url
  ).href;
}
const R3 = /* @__PURE__ */ k_("albina-game", () => {
  const e = P3(), t = Dt(N3({ manifest: fi, host: b3(), assetBaseUrl: e })), i = Dt(new h3(fi, t.storage, e));
  t.portraits.setUrlResolver(async (b) => fi.portraits.some((_) => _.id === b) ? i.cachePortrait(b) : i.cache(b));
  const a = /* @__PURE__ */ kp(new tn(fa)), n = /* @__PURE__ */ Ne("title"), o = /* @__PURE__ */ Ne(""), s = /* @__PURE__ */ Ne(), r = /* @__PURE__ */ Ne(!1), c = /* @__PURE__ */ Ne(!1), d = /* @__PURE__ */ Ne(!0), u = /* @__PURE__ */ Ne(!1), l = /* @__PURE__ */ Ne(!1), p = /* @__PURE__ */ Ne([]), m = /* @__PURE__ */ Ne({}), h = /* @__PURE__ */ Ne({}), w = /* @__PURE__ */ Ne([]), I = /* @__PURE__ */ new Set(), x = typeof matchMedia == "function" ? matchMedia("(prefers-reduced-motion: reduce)") : void 0, L = /* @__PURE__ */ Ne(x?.matches ?? !1), R = /* @__PURE__ */ Ne(typeof innerWidth == "number" ? innerWidth > 800 : !0);
  let H, V, te;
  const B = (b) => {
    L.value = b.matches, b.matches ? Ve(W.value.cgAssetId ?? W.value.backgroundAssetId) : $(W.value);
  }, me = () => {
    R.value = innerWidth > 800, $(W.value);
  };
  x?.addEventListener("change", B), typeof window < "u" && (window.addEventListener("resize", me), window.addEventListener("orientationchange", me));
  const W = Xt(() => a.value.scene), F = Xt(() => a.value.save), U = Xt(() => a.value.choices), Q = Xt(() => V3(W.value, fi, {
    baseUrl: e,
    desktop: R.value,
    reducedMotion: L.value,
    videoEnabled: d.value && !l.value
  }, (b) => b?.startsWith("video.") && !h.value[b] ? void 0 : ce(b)));
  function ce(b) {
    if (b)
      return m.value[b] ?? Gs(fi, b, e);
  }
  async function Ve(b) {
    if (!b) return;
    const _ = await i.cache(b);
    _ && (m.value = { ...m.value, [b]: _ });
  }
  async function Fe(b) {
    const _ = [
      b.backgroundAssetId,
      b.cgAssetId,
      b.voiceAssetId,
      b.bgmAssetId,
      ...b.sfxAssetIds ?? []
    ].filter((S) => !!S), z = await i.prefetch(_);
    z.size && (m.value = { ...m.value, ...Object.fromEntries(z) });
    for (const S of b.portraits) await i.cachePortrait(S.portraitAssetId);
  }
  function be() {
    return { baseUrl: e, desktop: R.value, reducedMotion: L.value, videoEnabled: d.value && !l.value };
  }
  async function $(b) {
    const _ = $f(b, be());
    if (!_ || h.value[_]) return;
    const z = await i.cache(_);
    z && (m.value = { ...m.value, [_]: z }, h.value = { ...h.value, [_]: !0 });
  }
  function J() {
    const b = W.value.choices.map((_) => j3.get(_.nextSceneId)).filter((_) => !!_);
    (async () => {
      for (const _ of b) await Fe(_);
    })();
  }
  async function ie() {
    if (!c.value) {
      if (W.value.bgmAssetId && H !== W.value.bgmAssetId) {
        H = W.value.bgmAssetId;
        const b = ce(H);
        b && (u.value = !await t.audio.playBgm(b));
      }
      for (const b of W.value.sfxAssetIds ?? []) {
        const _ = ce(b);
        _ && t.audio.playSfx(_);
      }
      if (W.value.voiceAssetId) {
        const b = ce(W.value.voiceAssetId);
        b && t.audio.enqueueVoice(b);
      }
    }
  }
  async function Be() {
    l.value = !1, await Fe(W.value), o.value = "";
    const b = a.value.interpolate(W.value.text);
    t.typewriter.write(b, (_) => {
      o.value = _;
    }, L.value ? 0 : 18), ie(), W.value.cgAssetId && (await t.gallery.unlock(W.value.cgAssetId, F.value), V !== W.value.id && (V = W.value.id, await t.specialCg.enqueue({ id: W.value.id, assetId: W.value.cgAssetId })), p.value = await t.gallery.list(F.value)), $(W.value), J();
  }
  async function Le() {
    t.mount(), n.value = "game", await Be();
  }
  async function Oe() {
    r.value = !0;
    try {
      const b = await t.host.loadSave();
      return b ? (a.value = new tn(fa, { save: b }), await Le(), !0) : !1;
    } finally {
      r.value = !1;
    }
  }
  async function Ze(b) {
    t.typewriter.completeNow();
    const _ = a.value.choose(b);
    Ip(a), s.value = _.resultText ? a.value.interpolate(_.resultText) : void 0;
    const z = _.choice.resultVoiceAssetId;
    await Ve(z);
    const S = ce(z);
    !c.value && S && t.audio.enqueueVoice(S), s.value || await Be();
  }
  async function Wt() {
    s.value = void 0, await Be();
  }
  async function Gt(b, _) {
    const z = (/* @__PURE__ */ new Date()).toISOString(), S = { ...structuredClone(F.value), saveId: b, updatedAt: z }, K = te ?? (await Cd()).blob;
    await t.storage.saveSnapshot(S, K), _ && await t.host.saveSave(S), await Jt();
  }
  async function uo() {
    await Gt("quick-save", !0);
  }
  async function oi(b) {
    await Gt(`slot-${b}`, !1);
  }
  async function Jt() {
    I.forEach((_) => URL.revokeObjectURL(_)), I.clear();
    const b = [];
    for (const _ of await t.storage.keys("saves")) {
      const z = await t.storage.loadSnapshot(_);
      if (!z) continue;
      const S = z.thumbnail.type.startsWith("image/") ? URL.createObjectURL(z.thumbnail) : void 0;
      S && I.add(S), b.push({ id: _, sceneId: z.save.sceneId, updatedAt: z.save.updatedAt, ...S ? { thumbnailUrl: S } : {} });
    }
    w.value = b.sort((_, z) => z.updatedAt.localeCompare(_.updatedAt));
  }
  async function ia() {
    n.value === "game" && (te = (await Cd()).blob), await Jt(), n.value = "saves";
  }
  async function Ka(b) {
    const _ = await t.storage.loadSnapshot(b);
    _ && (a.value = new tn(fa, { save: Un(_.save) }), n.value = "game", await Be());
  }
  async function si(b) {
    await t.storage.deleteValue("saves", b), await Jt();
  }
  function Js() {
    return m3(F.value);
  }
  async function f(b) {
    a.value = new tn(fa, { save: Un(JSON.parse(b)) }), n.value = "game", await Be();
  }
  async function g() {
    p.value = await t.gallery.list(F.value), await Promise.all(p.value.map(Ve)), n.value = "gallery";
  }
  function v() {
    n.value = "game";
  }
  async function A() {
    u.value = !await t.audio.recoverAutoplay();
  }
  function E() {
    t.typewriter.completeNow();
  }
  function k() {
    l.value = !0;
  }
  function j() {
    c.value = !c.value, c.value ? (t.audio.stopAll(), H = void 0) : ie();
  }
  function O() {
    x?.removeEventListener("change", B), typeof window < "u" && (window.removeEventListener("resize", me), window.removeEventListener("orientationchange", me)), I.forEach((b) => URL.revokeObjectURL(b)), I.clear();
  }
  return {
    runtime: t,
    manifest: fi,
    screen: n,
    visibleText: o,
    resultText: s,
    loading: r,
    muted: c,
    videoEnabled: d,
    reducedMotion: L,
    autoplayBlocked: u,
    galleryIds: p,
    saveSlots: w,
    scene: W,
    save: F,
    choices: U,
    media: Q,
    assetUrl: ce,
    start: Le,
    continueGame: Oe,
    choose: Ze,
    dismissResult: Wt,
    quickSave: uo,
    saveSlot: oi,
    openSaves: ia,
    restoreSlot: Ka,
    deleteSlot: si,
    exportSave: Js,
    importSave: f,
    openGallery: g,
    backToGame: v,
    recoverAutoplay: A,
    completeText: E,
    setVideoFailed: k,
    toggleMute: j,
    disposeUiListeners: O
  };
}), $3 = ["data-screen"], U3 = {
  key: 0,
  class: "title-screen",
  "data-testid": "title-screen"
}, F3 = { class: "title-screen__content" }, z3 = {
  class: "title-actions",
  "aria-label": "主菜单"
}, L3 = ["disabled"], M3 = { class: "build-state" }, B3 = {
  key: 1,
  class: "panel-screen",
  "data-testid": "saves-screen"
}, Z3 = { class: "slot-actions" }, H3 = { class: "save-slot-grid" }, K3 = ["data-save-id"], q3 = ["src"], W3 = ["onClick"], G3 = ["onClick"], J3 = { key: 0 }, Y3 = {
  key: 2,
  class: "panel-screen",
  "data-testid": "gallery-screen"
}, X3 = { class: "gallery-grid" }, Q3 = ["src", "alt"], e4 = { key: 0 }, t4 = {
  key: 3,
  class: "panel-screen",
  "data-testid": "settings-screen"
}, i4 = ["checked"], a4 = {
  key: 4,
  class: "panel-screen credits-screen",
  "data-testid": "credits-screen"
}, n4 = { class: "credits-notice" }, o4 = {
  class: "credits-list",
  "aria-label": "包内配乐"
}, s4 = { "aria-label": "曲目版权链接" }, r4 = ["href"], c4 = ["href"], d4 = {
  class: "official-listening",
  "aria-labelledby": "official-soundtrack-title"
}, u4 = { "aria-label": "官方 OST 外部试听" }, l4 = ["href"], f4 = ["href"], p4 = ["data-scene-id"], m4 = ["src"], g4 = ["src", "poster"], h4 = ["src"], b4 = { class: "game-hud" }, _4 = {
  key: 0,
  class: "result-overlay",
  "data-testid": "choice-result"
}, v4 = {
  key: 1,
  class: "choice-list"
}, y4 = ["data-choice-id", "onClick"], k4 = {
  key: 0,
  class: "ending-mark"
}, w4 = { class: "save-tools" }, I4 = /* @__PURE__ */ yu({
  __name: "App",
  setup(e) {
    const t = R3(), i = C6.parse(x_), a = /* @__PURE__ */ Ne(""), n = /* @__PURE__ */ Ne(""), o = Xt(() => t.galleryIds.map((c) => ({ id: c, url: t.assetUrl(c) })).filter((c) => c.url));
    function s() {
      n.value = t.exportSave();
    }
    async function r() {
      a.value.trim() && await t.importSave(a.value);
    }
    return Es(() => {
      t.disposeUiListeners(), t.runtime.unmount();
    }), (c, d) => (ue(), ge("main", {
      class: "albina-app",
      "data-albina-application": "",
      "data-screen": C(t).screen
    }, [
      C(t).screen === "title" ? (ue(), ge("section", U3, [
        d[31] || (d[31] = D("div", { class: "title-screen__veil" }, null, -1)),
        D("div", F3, [
          d[28] || (d[28] = D("p", { class: "eyebrow" }, "Canto IX · 独立前端卡", -1)),
          d[29] || (d[29] = D("h1", null, "ALBINA", -1)),
          d[30] || (d[30] = D("p", { class: "subtitle" }, "白色画布上的残响", -1)),
          D("nav", z3, [
            D("button", {
              "data-testid": "new-game",
              onClick: d[0] || (d[0] = //@ts-ignore
              (...u) => C(t).start && C(t).start(...u))
            }, "开始新篇"),
            D("button", {
              "data-testid": "continue-game",
              disabled: C(t).loading,
              onClick: d[1] || (d[1] = //@ts-ignore
              (...u) => C(t).continueGame && C(t).continueGame(...u))
            }, "继续", 8, L3),
            D("button", {
              "data-testid": "title-saves",
              onClick: d[2] || (d[2] = //@ts-ignore
              (...u) => C(t).openSaves && C(t).openSaves(...u))
            }, "存档"),
            D("button", {
              onClick: d[3] || (d[3] = //@ts-ignore
              (...u) => C(t).openGallery && C(t).openGallery(...u))
            }, "CG 图鉴"),
            D("button", {
              "data-testid": "title-settings",
              onClick: d[4] || (d[4] = (u) => C(t).screen = "settings")
            }, "设置"),
            D("button", {
              "data-testid": "title-credits",
              onClick: d[5] || (d[5] = (u) => C(t).screen = "credits")
            }, "版权与鸣谢")
          ]),
          D("p", M3, "v" + ye(C(U6)) + " · 确定性主剧情 · 运行时零媒体 API", 1)
        ])
      ])) : C(t).screen === "saves" ? (ue(), ge("section", B3, [
        D("header", null, [
          D("button", {
            onClick: d[6] || (d[6] = (u) => C(t).screen = "title")
          }, "返回"),
          d[32] || (d[32] = D("h2", null, "存档管理", -1))
        ]),
        D("div", Z3, [
          D("button", {
            "data-testid": "save-slot-1",
            onClick: d[7] || (d[7] = (u) => C(t).saveSlot(1))
          }, "保存到槽位 1"),
          D("button", {
            onClick: d[8] || (d[8] = (u) => C(t).saveSlot(2))
          }, "保存到槽位 2"),
          D("button", {
            onClick: d[9] || (d[9] = (u) => C(t).saveSlot(3))
          }, "保存到槽位 3")
        ]),
        D("div", H3, [
          (ue(!0), ge(Ke, null, Pi(C(t).saveSlots, (u) => (ue(), ge("article", {
            key: u.id,
            class: "save-slot",
            "data-save-id": u.id
          }, [
            u.thumbnailUrl ? (ue(), ge("img", {
              key: 0,
              src: u.thumbnailUrl,
              alt: "存档缩略图"
            }, null, 8, q3)) : Ci("", !0),
            D("div", null, [
              D("strong", null, ye(u.id), 1),
              D("p", null, ye(u.sceneId), 1),
              D("time", null, ye(u.updatedAt), 1)
            ]),
            D("button", {
              onClick: (l) => C(t).restoreSlot(u.id)
            }, "读取", 8, W3),
            D("button", {
              onClick: (l) => C(t).deleteSlot(u.id)
            }, "删除", 8, G3)
          ], 8, K3))), 128)),
          C(t).saveSlots.length === 0 ? (ue(), ge("p", J3, "暂无普通存档。")) : Ci("", !0)
        ])
      ])) : C(t).screen === "gallery" ? (ue(), ge("section", Y3, [
        D("header", null, [
          D("button", {
            onClick: d[10] || (d[10] = //@ts-ignore
            (...u) => C(t).backToGame && C(t).backToGame(...u))
          }, "返回"),
          d[33] || (d[33] = D("h2", null, "CG 图鉴", -1))
        ]),
        D("div", X3, [
          (ue(!0), ge(Ke, null, Pi(o.value, (u) => (ue(), ge("figure", {
            key: u.id
          }, [
            D("img", {
              src: u.url,
              alt: u.id,
              crossorigin: "anonymous"
            }, null, 8, Q3),
            D("figcaption", null, ye(u.id), 1)
          ]))), 128)),
          o.value.length === 0 ? (ue(), ge("p", e4, "尚未解锁 CG。")) : Ci("", !0)
        ])
      ])) : C(t).screen === "settings" ? (ue(), ge("section", t4, [
        D("header", null, [
          D("button", {
            onClick: d[11] || (d[11] = (u) => C(t).screen = "title")
          }, "返回"),
          d[34] || (d[34] = D("h2", null, "演出设置", -1))
        ]),
        D("label", null, [
          Ja(D("input", {
            "onUpdate:modelValue": d[12] || (d[12] = (u) => C(t).videoEnabled = u),
            type: "checkbox"
          }, null, 512), [
            [Mr, C(t).videoEnabled]
          ]),
          d[35] || (d[35] = ln(" 启用动画 CG（移动端可关闭）", -1))
        ]),
        D("label", null, [
          Ja(D("input", {
            "onUpdate:modelValue": d[13] || (d[13] = (u) => C(t).reducedMotion = u),
            type: "checkbox"
          }, null, 512), [
            [Mr, C(t).reducedMotion]
          ]),
          d[36] || (d[36] = ln(" 减少动态效果", -1))
        ]),
        D("label", null, [
          D("input", {
            checked: C(t).muted,
            type: "checkbox",
            onChange: d[14] || (d[14] = //@ts-ignore
            (...u) => C(t).toggleMute && C(t).toggleMute(...u))
          }, null, 40, i4),
          d[37] || (d[37] = ln(" 静音", -1))
        ]),
        D("button", {
          "data-testid": "autoplay-recovery",
          onClick: d[15] || (d[15] = //@ts-ignore
          (...u) => C(t).recoverAutoplay && C(t).recoverAutoplay(...u))
        }, "恢复音频播放"),
        D("button", {
          "data-testid": "settings-credits",
          onClick: d[16] || (d[16] = (u) => C(t).screen = "credits")
        }, "查看版权与鸣谢"),
        d[38] || (d[38] = D("p", { class: "asset-status" }, "运行时不请求媒体生成接口。包内配乐均已登记来源、文件校验值与再分发许可。", -1))
      ])) : C(t).screen === "credits" ? (ue(), ge("section", a4, [
        D("header", null, [
          D("button", {
            onClick: d[17] || (d[17] = (u) => C(t).screen = "title")
          }, "返回"),
          d[39] || (d[39] = D("h2", null, "版权与鸣谢", -1))
        ]),
        D("p", n4, ye(C(i).packagedNotice), 1),
        D("ol", o4, [
          (ue(!0), ge(Ke, null, Pi(C(i).tracks, (u) => (ue(), ge("li", {
            key: u.assetId
          }, [
            D("h3", null, ye(u.title), 1),
            D("p", null, ye(u.creator) + " · ISRC " + ye(u.isrc) + " · cue: " + ye(u.cueAlias), 1),
            D("p", null, ye(u.attribution), 1),
            D("nav", s4, [
              D("a", {
                href: u.sourceUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "曲目来源", 8, r4),
              D("a", {
                href: u.licenseUrl,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "CC BY 4.0 许可", 8, c4)
            ])
          ]))), 128))
        ]),
        D("section", d4, [
          d[40] || (d[40] = D("h3", { id: "official-soundtrack-title" }, "ProjectMoon 官方 OST", -1)),
          D("p", null, ye(C(i).officialSoundtrack.notice), 1),
          D("nav", u4, [
            (ue(!0), ge(Ke, null, Pi(C(i).officialSoundtrack.links, (u) => (ue(), ge("a", {
              key: u.url,
              href: u.url,
              target: "_blank",
              rel: "noopener noreferrer"
            }, ye(u.label), 9, l4))), 128)),
            D("a", {
              href: C(i).officialSoundtrack.termsUrl,
              target: "_blank",
              rel: "noopener noreferrer"
            }, "ProjectMoon 服务条款", 8, f4)
          ])
        ])
      ])) : (ue(), ge("section", {
        key: 5,
        class: "game-screen",
        "data-testid": "game-screen",
        "data-scene-id": C(t).scene.id
      }, [
        C(t).media.backgroundUrl ? (ue(), ge("img", {
          key: 0,
          class: "game-screen__background",
          src: C(t).media.backgroundUrl,
          alt: "",
          crossorigin: "anonymous"
        }, null, 8, m4)) : Ci("", !0),
        C(t).media.videoUrl ? (ue(), ge("video", {
          key: 1,
          class: "game-screen__video",
          src: C(t).media.videoUrl,
          poster: C(t).media.fallbackUrl,
          autoplay: "",
          muted: "",
          loop: "",
          playsinline: "",
          crossorigin: "anonymous",
          "data-testid": "scene-video",
          onError: d[18] || (d[18] = //@ts-ignore
          (...u) => C(t).setVideoFailed && C(t).setVideoFailed(...u))
        }, null, 40, g4)) : C(t).media.fallbackUrl ? (ue(), ge("img", {
          key: 2,
          class: "game-screen__cg",
          src: C(t).media.fallbackUrl,
          alt: "剧情 CG",
          "data-testid": "static-fallback",
          crossorigin: "anonymous"
        }, null, 8, h4)) : Ci("", !0),
        Vt(O_, {
          portraits: C(t).scene.portraits,
          service: C(t).runtime.portraits
        }, null, 8, ["portraits", "service"]),
        D("header", b4, [
          D("span", null, "CH." + ye(C(t).scene.chapter) + " · " + ye(C(t).scene.locationId), 1),
          D("span", null, "信任 " + ye(C(t).save.values.trust) + " / 危险 " + ye(C(t).save.values.danger) + " / 共鸣 " + ye(C(t).save.values.artResonance), 1),
          D("nav", null, [
            D("button", {
              onClick: d[19] || (d[19] = //@ts-ignore
              (...u) => C(t).quickSave && C(t).quickSave(...u))
            }, "快速存档"),
            D("button", {
              "data-testid": "game-saves",
              onClick: d[20] || (d[20] = //@ts-ignore
              (...u) => C(t).openSaves && C(t).openSaves(...u))
            }, "存档"),
            D("button", {
              onClick: d[21] || (d[21] = //@ts-ignore
              (...u) => C(t).openGallery && C(t).openGallery(...u))
            }, "图鉴"),
            D("button", {
              "data-testid": "game-settings",
              onClick: d[22] || (d[22] = (u) => C(t).screen = "settings")
            }, "设置"),
            D("button", {
              onClick: d[23] || (d[23] = //@ts-ignore
              (...u) => C(t).toggleMute && C(t).toggleMute(...u))
            }, ye(C(t).muted ? "启音" : "静音"), 1)
          ])
        ]),
        D("article", {
          class: "dialogue-box",
          "data-testid": "dialogue-box",
          onClick: d[25] || (d[25] = //@ts-ignore
          (...u) => C(t).completeText && C(t).completeText(...u))
        }, [
          D("h2", null, ye(C(t).scene.speaker), 1),
          D("p", null, ye(C(t).visibleText), 1),
          C(t).resultText ? (ue(), ge("div", _4, [
            D("p", null, ye(C(t).resultText), 1),
            D("button", {
              onClick: d[24] || (d[24] = Zr(
                //@ts-ignore
                (...u) => C(t).dismissResult && C(t).dismissResult(...u),
                ["stop"]
              ))
            }, "继续")
          ])) : (ue(), ge("div", v4, [
            (ue(!0), ge(Ke, null, Pi(C(t).choices, (u) => (ue(), ge("button", {
              key: u.id,
              "data-choice-id": u.id,
              onClick: Zr((l) => C(t).choose(u.id), ["stop"])
            }, ye(u.text), 9, y4))), 128)),
            C(t).scene.ending ? (ue(), ge("p", k4, ye(C(t).scene.ending.route) + " · " + ye(C(t).scene.ending.kind) + " END", 1)) : Ci("", !0)
          ]))
        ]),
        D("details", w4, [
          d[41] || (d[41] = D("summary", null, "存档导入 / 导出", -1)),
          D("button", { onClick: s }, "导出当前存档"),
          Ja(D("textarea", {
            "onUpdate:modelValue": d[26] || (d[26] = (u) => n.value = u),
            readonly: "",
            "aria-label": "导出存档"
          }, null, 512), [
            [Lr, n.value]
          ]),
          Ja(D("textarea", {
            "onUpdate:modelValue": d[27] || (d[27] = (u) => a.value = u),
            "aria-label": "导入存档",
            placeholder: "粘贴 SaveV2 JSON"
          }, null, 512), [
            [Lr, a.value]
          ]),
          D("button", { onClick: r }, "导入")
        ])
      ], 8, p4))
    ], 8, $3));
  }
});
function E4(e) {
  const t = Zg(I4);
  return t.use(b_()), t.mount(e), t;
}
function Nd() {
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
      const n = E4(a);
      i.addEventListener("click", () => {
        n.unmount(), t?.remove();
      });
    }
  }), document.body.append(e);
}
typeof window < "u" && !window.__ALBINA_DISABLE_AUTOINSTALL__ && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Nd, { once: !0 }) : Nd());
export {
  F6 as ALBINA_CDN_BASE,
  U6 as ALBINA_RELEASE_VERSION,
  Nd as installAlbinaOneClick,
  E4 as mountAlbinaApplication
};
