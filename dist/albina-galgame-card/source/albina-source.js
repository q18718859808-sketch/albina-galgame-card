// @__NO_SIDE_EFFECTS__
function pt(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Y = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Kt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ce = () => {
}, Qi = () => !1, Vn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), yn = (e) => e.startsWith("onUpdate:"), oe = Object.assign, vr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, rc = Object.prototype.hasOwnProperty, H = (e, t) => rc.call(e, t), $ = Array.isArray, Ct = (e) => In(e) === "[object Map]", eu = (e) => In(e) === "[object Set]", ls = (e) => In(e) === "[object Date]", M = (e) => typeof e == "function", ee = (e) => typeof e == "string", Be = (e) => typeof e == "symbol", W = (e) => e !== null && typeof e == "object", yr = (e) => (W(e) || M(e)) && M(e.then) && M(e.catch), tu = Object.prototype.toString, In = (e) => tu.call(e), br = (e) => In(e).slice(8, -1), nu = (e) => In(e) === "[object Object]", Or = (e) => ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, dn = /* @__PURE__ */ pt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), sc = /* @__PURE__ */ pt(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), bo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ic = /-\w/g, Se = bo(
  (e) => e.replace(ic, (t) => t.slice(1).toUpperCase())
), uc = /\B([A-Z])/g, mt = bo(
  (e) => e.replace(uc, "-$1").toLowerCase()
), Oo = bo((e) => e.charAt(0).toUpperCase() + e.slice(1)), Nt = bo(
  (e) => e ? `on${Oo(e)}` : ""
), tt = (e, t) => !Object.is(e, t), on = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, so = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, lc = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let cs;
const Pn = () => cs || (cs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Nr(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = ee(o) ? dc(o) : Nr(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else if (ee(e) || W(e))
    return e;
}
const cc = /;(?![^(]*\))/g, ac = /:([^]+)/, fc = /\/\*[^]*?\*\//g;
function dc(e) {
  const t = {};
  return e.replace(fc, "").split(cc).forEach((n) => {
    if (n) {
      const o = n.split(ac);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function Dr(e) {
  let t = "";
  if (ee(e))
    t = e;
  else if ($(e))
    for (let n = 0; n < e.length; n++) {
      const o = Dr(e[n]);
      o && (t += o + " ");
    }
  else if (W(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const pc = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", hc = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", _c = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", gc = /* @__PURE__ */ pt(pc), Ec = /* @__PURE__ */ pt(hc), mc = /* @__PURE__ */ pt(_c), vc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", yc = /* @__PURE__ */ pt(vc);
function ou(e) {
  return !!e || e === "";
}
function bc(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = Sr(e[o], t[o]);
  return n;
}
function Sr(e, t) {
  if (e === t) return !0;
  let n = ls(e), o = ls(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = Be(e), o = Be(t), n || o)
    return e === t;
  if (n = $(e), o = $(t), n || o)
    return n && o ? bc(e, t) : !1;
  if (n = W(e), o = W(t), n || o) {
    if (!n || !o)
      return !1;
    const r = Object.keys(e).length, s = Object.keys(t).length;
    if (r !== s)
      return !1;
    for (const i in e) {
      const u = e.hasOwnProperty(i), l = t.hasOwnProperty(i);
      if (u && !l || !u && l || !Sr(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const ru = (e) => !!(e && e.__v_isRef === !0), Wn = (e) => ee(e) ? e : e == null ? "" : $(e) || W(e) && (e.toString === tu || !M(e.toString)) ? ru(e) ? Wn(e.value) : JSON.stringify(e, su, 2) : String(e), su = (e, t) => ru(t) ? su(e, t.value) : Ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, r], s) => (n[Po(o, s) + " =>"] = r, n),
    {}
  )
} : eu(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Po(n))
} : Be(t) ? Po(t) : W(t) && !$(t) && !nu(t) ? String(t) : t, Po = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Be(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
function je(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let _e;
class iu {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && _e && (_e.active ? (this.parent = _e, this.index = (_e.scopes || (_e.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = _e;
      try {
        return _e = this, t();
      } finally {
        _e = n;
      }
    } else process.env.NODE_ENV !== "production" && this._warnOnRun && je("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = _e, _e = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (_e === this)
        _e = this.prevScope;
      else {
        let t = _e;
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
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Oc(e) {
  return new iu(e);
}
function Nc() {
  return _e;
}
let q;
const Ro = /* @__PURE__ */ new WeakSet();
class uu {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e && (_e.active ? _e.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ro.has(this) && (Ro.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || cu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, as(this), au(this);
    const t = q, n = Me;
    q = this, Me = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && q !== this && je(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), fu(this), q = t, Me = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        wr(t);
      this.deps = this.depsTail = void 0, as(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ro.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Go(this) && this.run();
  }
  get dirty() {
    return Go(this);
  }
}
let lu = 0, pn, hn;
function cu(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = hn, hn = e;
    return;
  }
  e.next = pn, pn = e;
}
function Ar() {
  lu++;
}
function Cr() {
  if (--lu > 0)
    return;
  if (hn) {
    let t = hn;
    for (hn = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; pn; ) {
    let t = pn;
    for (pn = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function au(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fu(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const r = o.prevDep;
    o.version === -1 ? (o === n && (n = r), wr(o), Dc(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = r;
  }
  e.deps = t, e.depsTail = n;
}
function Go(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (du(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function du(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === bn) || (e.globalVersion = bn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Go(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = q, o = Me;
  q = e, Me = !0;
  try {
    au(e);
    const r = e.fn(e._value);
    (t.version === 0 || tt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    q = n, Me = o, fu(e), e.flags &= -3;
  }
}
function wr(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: r } = e;
  if (o && (o.nextSub = r, e.prevSub = void 0), r && (r.prevSub = o, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let s = n.computed.deps; s; s = s.nextDep)
      wr(s, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Dc(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Me = !0;
const pu = [];
function Pe() {
  pu.push(Me), Me = !1;
}
function Re() {
  const e = pu.pop();
  Me = e === void 0 ? !0 : e;
}
function as(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = q;
    q = void 0;
    try {
      t();
    } finally {
      q = n;
    }
  }
}
let bn = 0;
class Sc {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Tr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!q || !Me || q === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== q)
      n = this.activeLink = new Sc(q, this), q.deps ? (n.prevDep = q.depsTail, q.depsTail.nextDep = n, q.depsTail = n) : q.deps = q.depsTail = n, hu(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = q.depsTail, n.nextDep = void 0, q.depsTail.nextDep = n, q.depsTail = n, q.deps === n && (q.deps = o);
    }
    return process.env.NODE_ENV !== "production" && q.onTrack && q.onTrack(
      oe(
        {
          effect: q
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, bn++, this.notify(t);
  }
  notify(t) {
    Ar();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            oe(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Cr();
    }
  }
}
function hu(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        hu(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const qo = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Yo = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), On = /* @__PURE__ */ Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function le(e, t, n) {
  if (Me && q) {
    let o = qo.get(e);
    o || qo.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || (o.set(n, r = new Tr()), r.map = o, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function nt(e, t, n, o, r, s) {
  const i = qo.get(e);
  if (!i) {
    bn++;
    return;
  }
  const u = (l) => {
    l && (process.env.NODE_ENV !== "production" ? l.trigger({
      target: e,
      type: t,
      key: n,
      newValue: o,
      oldValue: r,
      oldTarget: s
    }) : l.trigger());
  };
  if (Ar(), t === "clear")
    i.forEach(u);
  else {
    const l = $(e), p = l && Or(n);
    if (l && n === "length") {
      const f = Number(o);
      i.forEach((a, h) => {
        (h === "length" || h === On || !Be(h) && h >= f) && u(a);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && u(i.get(n)), p && u(i.get(On)), t) {
        case "add":
          l ? p && u(i.get("length")) : (u(i.get(wt)), Ct(e) && u(i.get(Yo)));
          break;
        case "delete":
          l || (u(i.get(wt)), Ct(e) && u(i.get(Yo)));
          break;
        case "set":
          Ct(e) && u(i.get(wt));
          break;
      }
  }
  Cr();
}
function $t(e) {
  const t = /* @__PURE__ */ B(e);
  return t === e ? t : (le(t, "iterate", On), /* @__PURE__ */ Ae(e) ? t : t.map(dt));
}
function xr(e) {
  return le(e = /* @__PURE__ */ B(e), "iterate", On), e;
}
function Qe(e, t) {
  return /* @__PURE__ */ rt(e) ? Nn(/* @__PURE__ */ Tt(e) ? dt(t) : t) : dt(t);
}
const Ac = {
  __proto__: null,
  [Symbol.iterator]() {
    return ko(this, Symbol.iterator, (e) => Qe(this, e));
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => $(t) ? $t(t) : t)
    );
  },
  entries() {
    return ko(this, "entries", (e) => (e[1] = Qe(this, e[1]), e));
  },
  every(e, t) {
    return it(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return it(
      this,
      "filter",
      e,
      t,
      (n) => n.map((o) => Qe(this, o)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (n) => Qe(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return it(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return it(
      this,
      "findLast",
      e,
      t,
      (n) => Qe(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return it(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return it(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Fo(this, "includes", e);
  },
  indexOf(...e) {
    return Fo(this, "indexOf", e);
  },
  join(e) {
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Fo(this, "lastIndexOf", e);
  },
  map(e, t) {
    return it(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return rn(this, "pop");
  },
  push(...e) {
    return rn(this, "push", e);
  },
  reduce(e, ...t) {
    return fs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return fs(this, "reduceRight", e, t);
  },
  shift() {
    return rn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return it(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return rn(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return rn(this, "unshift", e);
  },
  values() {
    return ko(this, "values", (e) => Qe(this, e));
  }
};
function ko(e, t, n) {
  const o = xr(e), r = o[t]();
  return o !== e && !/* @__PURE__ */ Ae(e) && (r._next = r.next, r.next = () => {
    const s = r._next();
    return s.done || (s.value = n(s.value)), s;
  }), r;
}
const Cc = Array.prototype;
function it(e, t, n, o, r, s) {
  const i = xr(e), u = i !== e && !/* @__PURE__ */ Ae(e), l = i[t];
  if (l !== Cc[t]) {
    const a = l.apply(e, s);
    return u ? dt(a) : a;
  }
  let p = n;
  i !== e && (u ? p = function(a, h) {
    return n.call(this, Qe(e, a), h, e);
  } : n.length > 2 && (p = function(a, h) {
    return n.call(this, a, h, e);
  }));
  const f = l.call(i, p, o);
  return u && r ? r(f) : f;
}
function fs(e, t, n, o) {
  const r = xr(e), s = r !== e && !/* @__PURE__ */ Ae(e);
  let i = n, u = !1;
  r !== e && (s ? (u = o.length === 0, i = function(p, f, a) {
    return u && (u = !1, p = Qe(e, p)), n.call(this, p, Qe(e, f), a, e);
  }) : n.length > 3 && (i = function(p, f, a) {
    return n.call(this, p, f, a, e);
  }));
  const l = r[t](i, ...o);
  return u ? Qe(e, l) : l;
}
function Fo(e, t, n) {
  const o = /* @__PURE__ */ B(e);
  le(o, "iterate", On);
  const r = o[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ io(n[0]) ? (n[0] = /* @__PURE__ */ B(n[0]), o[t](...n)) : r;
}
function rn(e, t, n = []) {
  Pe(), Ar();
  const o = (/* @__PURE__ */ B(e))[t].apply(e, n);
  return Cr(), Re(), o;
}
const wc = /* @__PURE__ */ pt("__proto__,__v_isRef,__isVue"), _u = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Be)
);
function Tc(e) {
  Be(e) || (e = String(e));
  const t = /* @__PURE__ */ B(this);
  return le(t, "has", e), t.hasOwnProperty(e);
}
class gu {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, s = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return s;
    if (n === "__v_raw")
      return o === (r ? s ? Ou : bu : s ? yu : vu).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const i = $(t);
    if (!r) {
      let l;
      if (i && (l = Ac[n]))
        return l;
      if (n === "hasOwnProperty")
        return Tc;
    }
    const u = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ie(t) ? t : o
    );
    if ((Be(n) ? _u.has(n) : wc(n)) || (r || le(t, "get", n), s))
      return u;
    if (/* @__PURE__ */ ie(u)) {
      const l = i && Or(n) ? u : u.value;
      return r && W(l) ? /* @__PURE__ */ Xo(l) : l;
    }
    return W(u) ? r ? /* @__PURE__ */ Xo(u) : /* @__PURE__ */ Vr(u) : u;
  }
}
class Eu extends gu {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, r) {
    let s = t[n];
    const i = $(t) && Or(n);
    if (!this._isShallow) {
      const p = /* @__PURE__ */ rt(s);
      if (!/* @__PURE__ */ Ae(o) && !/* @__PURE__ */ rt(o) && (s = /* @__PURE__ */ B(s), o = /* @__PURE__ */ B(o)), !i && /* @__PURE__ */ ie(s) && !/* @__PURE__ */ ie(o))
        return p ? (process.env.NODE_ENV !== "production" && je(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (s.value = o, !0);
    }
    const u = i ? Number(n) < t.length : H(t, n), l = Reflect.set(
      t,
      n,
      o,
      /* @__PURE__ */ ie(t) ? t : r
    );
    return t === /* @__PURE__ */ B(r) && l && (u ? tt(o, s) && nt(t, "set", n, o, s) : nt(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = H(t, n), r = t[n], s = Reflect.deleteProperty(t, n);
    return s && o && nt(t, "delete", n, void 0, r), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Be(n) || !_u.has(n)) && le(t, "has", n), o;
  }
  ownKeys(t) {
    return le(
      t,
      "iterate",
      $(t) ? "length" : wt
    ), Reflect.ownKeys(t);
  }
}
class mu extends gu {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && je(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && je(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const xc = /* @__PURE__ */ new Eu(), Vc = /* @__PURE__ */ new mu(), Ic = /* @__PURE__ */ new Eu(!0), Pc = /* @__PURE__ */ new mu(!0), Jo = (e) => e, Bn = (e) => Reflect.getPrototypeOf(e);
function Rc(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = /* @__PURE__ */ B(r), i = Ct(s), u = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, p = r[e](...o), f = n ? Jo : t ? Nn : dt;
    return !t && le(
      s,
      "iterate",
      l ? Yo : wt
    ), oe(
      // inheriting all iterator properties
      Object.create(p),
      {
        // iterator protocol
        next() {
          const { value: a, done: h } = p.next();
          return h ? { value: a, done: h } : {
            value: u ? [f(a[0]), f(a[1])] : f(a),
            done: h
          };
        }
      }
    );
  };
}
function jn(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      je(
        `${Oo(e)} operation ${n}failed: target is readonly.`,
        /* @__PURE__ */ B(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function kc(e, t) {
  const n = {
    get(r) {
      const s = this.__v_raw, i = /* @__PURE__ */ B(s), u = /* @__PURE__ */ B(r);
      e || (tt(r, u) && le(i, "get", r), le(i, "get", u));
      const { has: l } = Bn(i), p = t ? Jo : e ? Nn : dt;
      if (l.call(i, r))
        return p(s.get(r));
      if (l.call(i, u))
        return p(s.get(u));
      s !== i && s.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && le(/* @__PURE__ */ B(r), "iterate", wt), r.size;
    },
    has(r) {
      const s = this.__v_raw, i = /* @__PURE__ */ B(s), u = /* @__PURE__ */ B(r);
      return e || (tt(r, u) && le(i, "has", r), le(i, "has", u)), r === u ? s.has(r) : s.has(r) || s.has(u);
    },
    forEach(r, s) {
      const i = this, u = i.__v_raw, l = /* @__PURE__ */ B(u), p = t ? Jo : e ? Nn : dt;
      return !e && le(l, "iterate", wt), u.forEach((f, a) => r.call(s, p(f), p(a), i));
    }
  };
  return oe(
    n,
    e ? {
      add: jn("add"),
      set: jn("set"),
      delete: jn("delete"),
      clear: jn("clear")
    } : {
      add(r) {
        const s = /* @__PURE__ */ B(this), i = Bn(s), u = /* @__PURE__ */ B(r), l = !t && !/* @__PURE__ */ Ae(r) && !/* @__PURE__ */ rt(r) ? u : r;
        return i.has.call(s, l) || tt(r, l) && i.has.call(s, r) || tt(u, l) && i.has.call(s, u) || (s.add(l), nt(s, "add", l, l)), this;
      },
      set(r, s) {
        !t && !/* @__PURE__ */ Ae(s) && !/* @__PURE__ */ rt(s) && (s = /* @__PURE__ */ B(s));
        const i = /* @__PURE__ */ B(this), { has: u, get: l } = Bn(i);
        let p = u.call(i, r);
        p ? process.env.NODE_ENV !== "production" && ds(i, u, r) : (r = /* @__PURE__ */ B(r), p = u.call(i, r));
        const f = l.call(i, r);
        return i.set(r, s), p ? tt(s, f) && nt(i, "set", r, s, f) : nt(i, "add", r, s), this;
      },
      delete(r) {
        const s = /* @__PURE__ */ B(this), { has: i, get: u } = Bn(s);
        let l = i.call(s, r);
        l ? process.env.NODE_ENV !== "production" && ds(s, i, r) : (r = /* @__PURE__ */ B(r), l = i.call(s, r));
        const p = u ? u.call(s, r) : void 0, f = s.delete(r);
        return l && nt(s, "delete", r, void 0, p), f;
      },
      clear() {
        const r = /* @__PURE__ */ B(this), s = r.size !== 0, i = process.env.NODE_ENV !== "production" ? Ct(r) ? new Map(r) : new Set(r) : void 0, u = r.clear();
        return s && nt(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), u;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Rc(r, e, t);
  }), n;
}
function No(e, t) {
  const n = kc(e, t);
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(
    H(n, r) && r in o ? n : o,
    r,
    s
  );
}
const Fc = {
  get: /* @__PURE__ */ No(!1, !1)
}, Lc = {
  get: /* @__PURE__ */ No(!1, !0)
}, $c = {
  get: /* @__PURE__ */ No(!0, !1)
}, Mc = {
  get: /* @__PURE__ */ No(!0, !0)
};
function ds(e, t, n) {
  const o = /* @__PURE__ */ B(n);
  if (o !== n && t.call(e, o)) {
    const r = br(e);
    je(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const vu = /* @__PURE__ */ new WeakMap(), yu = /* @__PURE__ */ new WeakMap(), bu = /* @__PURE__ */ new WeakMap(), Ou = /* @__PURE__ */ new WeakMap();
function Uc(e) {
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
function Vr(e) {
  return /* @__PURE__ */ rt(e) ? e : Do(
    e,
    !1,
    xc,
    Fc,
    vu
  );
}
// @__NO_SIDE_EFFECTS__
function Bc(e) {
  return Do(
    e,
    !1,
    Ic,
    Lc,
    yu
  );
}
// @__NO_SIDE_EFFECTS__
function Xo(e) {
  return Do(
    e,
    !0,
    Vc,
    $c,
    bu
  );
}
// @__NO_SIDE_EFFECTS__
function ot(e) {
  return Do(
    e,
    !0,
    Pc,
    Mc,
    Ou
  );
}
function Do(e, t, n, o, r) {
  if (!W(e))
    return process.env.NODE_ENV !== "production" && je(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = Uc(br(e));
  if (i === 0)
    return e;
  const u = new Proxy(
    e,
    i === 2 ? o : n
  );
  return r.set(e, u), u;
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return /* @__PURE__ */ rt(e) ? /* @__PURE__ */ Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function rt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function io(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function B(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ B(t) : e;
}
function Ir(e) {
  return !H(e, "__v_skip") && Object.isExtensible(e) && so(e, "__v_skip", !0), e;
}
const dt = (e) => W(e) ? /* @__PURE__ */ Vr(e) : e, Nn = (e) => W(e) ? /* @__PURE__ */ Xo(e) : e;
// @__NO_SIDE_EFFECTS__
function ie(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function jc(e) {
  return Hc(e, !1);
}
function Hc(e, t) {
  return /* @__PURE__ */ ie(e) ? e : new Kc(e, t);
}
class Kc {
  constructor(t, n) {
    this.dep = new Tr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ B(t), this._value = n ? t : dt(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || /* @__PURE__ */ Ae(t) || /* @__PURE__ */ rt(t);
    t = o ? t : /* @__PURE__ */ B(t), tt(t, n) && (this._rawValue = t, this._value = o ? t : dt(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function _n(e) {
  return /* @__PURE__ */ ie(e) ? e.value : e;
}
const Wc = {
  get: (e, t, n) => t === "__v_raw" ? e : _n(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return /* @__PURE__ */ ie(r) && !/* @__PURE__ */ ie(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Nu(e) {
  return /* @__PURE__ */ Tt(e) ? e : new Proxy(e, Wc);
}
class zc {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Tr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = bn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    q !== this)
      return cu(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return du(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && je("Write operation failed: computed value is readonly");
  }
}
// @__NO_SIDE_EFFECTS__
function Gc(e, t, n = !1) {
  let o, r;
  M(e) ? o = e : (o = e.get, r = e.set);
  const s = new zc(o, r, n);
  return process.env.NODE_ENV, s;
}
const Hn = {}, uo = /* @__PURE__ */ new WeakMap();
let Dt;
function qc(e, t = !1, n = Dt) {
  if (n) {
    let o = uo.get(n);
    o || uo.set(n, o = []), o.push(e);
  } else process.env.NODE_ENV !== "production" && !t && je(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Yc(e, t, n = Y) {
  const { immediate: o, deep: r, once: s, scheduler: i, augmentJob: u, call: l } = n, p = (k) => {
    (n.onWarn || je)(
      "Invalid watch source: ",
      k,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = (k) => r ? k : /* @__PURE__ */ Ae(k) || r === !1 || r === 0 ? gt(k, 1) : gt(k);
  let a, h, _, m, O = !1, C = !1;
  if (/* @__PURE__ */ ie(e) ? (h = () => e.value, O = /* @__PURE__ */ Ae(e)) : /* @__PURE__ */ Tt(e) ? (h = () => f(e), O = !0) : $(e) ? (C = !0, O = e.some((k) => /* @__PURE__ */ Tt(k) || /* @__PURE__ */ Ae(k)), h = () => e.map((k) => {
    if (/* @__PURE__ */ ie(k))
      return k.value;
    if (/* @__PURE__ */ Tt(k))
      return f(k);
    if (M(k))
      return l ? l(k, 2) : k();
    process.env.NODE_ENV !== "production" && p(k);
  })) : M(e) ? t ? h = l ? () => l(e, 2) : e : h = () => {
    if (_) {
      Pe();
      try {
        _();
      } finally {
        Re();
      }
    }
    const k = Dt;
    Dt = a;
    try {
      return l ? l(e, 3, [m]) : e(m);
    } finally {
      Dt = k;
    }
  } : (h = ce, process.env.NODE_ENV !== "production" && p(e)), t && r) {
    const k = h, J = r === !0 ? 1 / 0 : r;
    h = () => gt(k(), J);
  }
  const S = Nc(), R = () => {
    a.stop(), S && S.active && vr(S.effects, a);
  };
  if (s && t) {
    const k = t;
    t = (...J) => {
      const pe = k(...J);
      return R(), pe;
    };
  }
  let P = C ? new Array(e.length).fill(Hn) : Hn;
  const Z = (k) => {
    if (!(!(a.flags & 1) || !a.dirty && !k))
      if (t) {
        const J = a.run();
        if (k || r || O || (C ? J.some((pe, te) => tt(pe, P[te])) : tt(J, P))) {
          _ && _();
          const pe = Dt;
          Dt = a;
          try {
            const te = [
              J,
              // pass undefined as the old value when it's changed for the first time
              P === Hn ? void 0 : C && P[0] === Hn ? [] : P,
              m
            ];
            P = J, l ? l(t, 3, te) : (
              // @ts-expect-error
              t(...te)
            );
          } finally {
            Dt = pe;
          }
        }
      } else
        a.run();
  };
  return u && u(Z), a = new uu(h), a.scheduler = i ? () => i(Z, !1) : Z, m = (k) => qc(k, !1, a), _ = a.onStop = () => {
    const k = uo.get(a);
    if (k) {
      if (l)
        l(k, 4);
      else
        for (const J of k) J();
      uo.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? o ? Z(!0) : P = a.run() : i ? i(Z.bind(null, !0), !0) : a.run(), R.pause = a.pause.bind(a), R.resume = a.resume.bind(a), R.stop = R, R;
}
function gt(e, t = 1 / 0, n) {
  if (t <= 0 || !W(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ie(e))
    gt(e.value, t, n);
  else if ($(e))
    for (let o = 0; o < e.length; o++)
      gt(e[o], t, n);
  else if (eu(e) || Ct(e))
    e.forEach((o) => {
      gt(o, t, n);
    });
  else if (nu(e)) {
    for (const o in e)
      gt(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && gt(e[o], t, n);
  }
  return e;
}
const xt = [];
function zn(e) {
  xt.push(e);
}
function Gn() {
  xt.pop();
}
let Lo = !1;
function A(e, ...t) {
  if (Lo) return;
  Lo = !0, Pe();
  const n = xt.length ? xt[xt.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Jc();
  if (o)
    Jt(
      o,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((s) => {
          var i, u;
          return (u = (i = s.toString) == null ? void 0 : i.call(s)) != null ? u : JSON.stringify(s);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: s }) => `at <${$n(n, s.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...Xc(r)), console.warn(...s);
  }
  Re(), Lo = !1;
}
function Jc() {
  let e = xt[xt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function Xc(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Zc(n));
  }), t;
}
function Zc({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${$n(
    e.component,
    e.type,
    o
  )}`, s = ">" + n;
  return e.props ? [r, ...Qc(e.props), s] : [r + s];
}
function Qc(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Du(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Du(e, t, n) {
  return ee(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : /* @__PURE__ */ ie(t) ? (t = Du(e, /* @__PURE__ */ B(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : M(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = /* @__PURE__ */ B(t), n ? t : [`${e}=`, t]);
}
const Pr = {
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
function Jt(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (r) {
    Rn(r, t, n);
  }
}
function He(e, t, n, o) {
  if (M(e)) {
    const r = Jt(e, t, n, o);
    return r && yr(r) && r.catch((s) => {
      Rn(s, t, n);
    }), r;
  }
  if ($(e)) {
    const r = [];
    for (let s = 0; s < e.length; s++)
      r.push(He(e[s], t, n, o));
    return r;
  } else process.env.NODE_ENV !== "production" && A(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function Rn(e, t, n, o = !0) {
  const r = t ? t.vnode : null, { errorHandler: s, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Y;
  if (t) {
    let u = t.parent;
    const l = t.proxy, p = process.env.NODE_ENV !== "production" ? Pr[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; u; ) {
      const f = u.ec;
      if (f) {
        for (let a = 0; a < f.length; a++)
          if (f[a](e, l, p) === !1)
            return;
      }
      u = u.parent;
    }
    if (s) {
      Pe(), Jt(s, null, 10, [
        e,
        l,
        p
      ]), Re();
      return;
    }
  }
  ea(e, n, r, o, i);
}
function ea(e, t, n, o = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const s = Pr[t];
    if (n && zn(n), A(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && Gn(), o)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const ve = [];
let Xe = -1;
const Wt = [];
let _t = null, Bt = 0;
const Su = /* @__PURE__ */ Promise.resolve();
let lo = null;
const ta = 100;
function na(e) {
  const t = lo || Su;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function oa(e) {
  let t = Xe + 1, n = ve.length;
  for (; t < n; ) {
    const o = t + n >>> 1, r = ve[o], s = Dn(r);
    s < e || s === e && r.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function So(e) {
  if (!(e.flags & 1)) {
    const t = Dn(e), n = ve[ve.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Dn(n) ? ve.push(e) : ve.splice(oa(t), 0, e), e.flags |= 1, Au();
  }
}
function Au() {
  lo || (lo = Su.then(Tu));
}
function Cu(e) {
  $(e) ? Wt.push(...e) : _t && e.id === -1 ? _t.splice(Bt + 1, 0, e) : e.flags & 1 || (Wt.push(e), e.flags |= 1), Au();
}
function ps(e, t, n = Xe + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < ve.length; n++) {
    const o = ve[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid || process.env.NODE_ENV !== "production" && Rr(t, o))
        continue;
      ve.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function wu(e) {
  if (Wt.length) {
    const t = [...new Set(Wt)].sort(
      (n, o) => Dn(n) - Dn(o)
    );
    if (Wt.length = 0, _t) {
      _t.push(...t);
      return;
    }
    for (_t = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Bt = 0; Bt < _t.length; Bt++) {
      const n = _t[Bt];
      process.env.NODE_ENV !== "production" && Rr(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    _t = null, Bt = 0;
  }
}
const Dn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Tu(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Rr(e, n) : ce;
  try {
    for (Xe = 0; Xe < ve.length; Xe++) {
      const n = ve[Xe];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Jt(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Xe < ve.length; Xe++) {
      const n = ve[Xe];
      n && (n.flags &= -2);
    }
    Xe = -1, ve.length = 0, wu(e), lo = null, (ve.length || Wt.length) && Tu(e);
  }
}
function Rr(e, t) {
  const n = e.get(t) || 0;
  if (n > ta) {
    const o = t.i, r = o && cl(o.type);
    return Rn(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let Te = !1;
const hs = (e) => {
  try {
    return Te;
  } finally {
    Te = e;
  }
}, qn = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Pn().__VUE_HMR_RUNTIME__ = {
  createRecord: $o(xu),
  rerender: $o(ia),
  reload: $o(ua)
});
const kt = /* @__PURE__ */ new Map();
function ra(e) {
  const t = e.type.__hmrId;
  let n = kt.get(t);
  n || (xu(t, e.type), n = kt.get(t)), n.instances.add(e);
}
function sa(e) {
  kt.get(e.type.__hmrId).instances.delete(e);
}
function xu(e, t) {
  return kt.has(e) ? !1 : (kt.set(e, {
    initialDef: co(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function co(e) {
  return al(e) ? e.__vccOpts : e;
}
function ia(e, t) {
  const n = kt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, co(o.type).render = t), o.renderCache = [], Te = !0, o.job.flags & 8 || o.update(), Te = !1;
  }));
}
function ua(e, t) {
  const n = kt.get(e);
  if (!n) return;
  t = co(t), _s(n.initialDef, t);
  const o = [...n.instances];
  for (let r = 0; r < o.length; r++) {
    const s = o[r], i = co(s.type);
    let u = qn.get(i);
    u || (i !== n.initialDef && _s(i, t), qn.set(i, u = /* @__PURE__ */ new Set())), u.add(s), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (u.add(s), s.ceReload(t.styles), u.delete(s)) : s.parent ? So(() => {
      s.job.flags & 8 || (Te = !0, s.parent.update(), Te = !1, u.delete(s));
    }) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), s.root.ce && s !== s.root && s.root.ce._removeChildStyle(i);
  }
  Cu(() => {
    qn.clear();
  });
}
function _s(e, t) {
  oe(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function $o(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let $e, ln = [], Zo = !1;
function kn(e, ...t) {
  $e ? $e.emit(e, ...t) : Zo || ln.push({ event: e, args: t });
}
function kr(e, t) {
  var n, o;
  $e = e, $e ? ($e.enabled = !0, ln.forEach(({ event: r, args: s }) => $e.emit(r, ...s)), ln = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((o = (n = window.navigator) == null ? void 0 : n.userAgent) != null && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    kr(s, t);
  }), setTimeout(() => {
    $e || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Zo = !0, ln = []);
  }, 3e3)) : (Zo = !0, ln = []);
}
function la(e, t) {
  kn("app:init", e, t, {
    Fragment: et,
    Text: Fn,
    Comment: Ue,
    Static: Xn
  });
}
function ca(e) {
  kn("app:unmount", e);
}
const aa = /* @__PURE__ */ Fr(
  "component:added"
  /* COMPONENT_ADDED */
), Vu = /* @__PURE__ */ Fr(
  "component:updated"
  /* COMPONENT_UPDATED */
), fa = /* @__PURE__ */ Fr(
  "component:removed"
  /* COMPONENT_REMOVED */
), da = (e) => {
  $e && typeof $e.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !$e.cleanupBuffer(e) && fa(e);
};
// @__NO_SIDE_EFFECTS__
function Fr(e) {
  return (t) => {
    kn(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const pa = /* @__PURE__ */ Iu(
  "perf:start"
  /* PERFORMANCE_START */
), ha = /* @__PURE__ */ Iu(
  "perf:end"
  /* PERFORMANCE_END */
);
function Iu(e) {
  return (t, n, o) => {
    kn(e, t.appContext.app, t.uid, t, n, o);
  };
}
function _a(e, t, n) {
  kn(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let xe = null, Pu = null;
function ao(e) {
  const t = xe;
  return xe = e, Pu = e && e.type.__scopeId || null, t;
}
function ga(e, t = xe, n) {
  if (!t || e._n)
    return e;
  const o = (...r) => {
    o._d && Vs(-1);
    const s = ao(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ao(s), o._d && Vs(1);
    }
    return process.env.NODE_ENV !== "production" && Vu(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Ru(e) {
  sc(e) && A("Do not use built-in directive ids as custom directive id: " + e);
}
function bt(e, t, n, o) {
  const r = e.dirs, s = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const u = r[i];
    s && (u.oldValue = s[i].value);
    let l = u.dir[o];
    l && (Pe(), He(l, n, 8, [
      e.el,
      u,
      e,
      t
    ]), Re());
  }
}
function Ea(e, t) {
  if (process.env.NODE_ENV !== "production" && (!ue || ue.isMounted) && A("provide() can only be used inside setup()."), ue) {
    let n = ue.provides;
    const o = ue.parent && ue.parent.provides;
    o === n && (n = ue.provides = Object.create(o)), n[e] = t;
  }
}
function zt(e, t, n = !1) {
  const o = Hr();
  if (o || It) {
    let r = It ? It._context.provides : o ? o.parent == null || o.ce ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && M(t) ? t.call(o && o.proxy) : t;
    process.env.NODE_ENV !== "production" && A(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && A("inject() can only be used inside setup() or functional components.");
}
function gs() {
  return !!(Hr() || It);
}
const ma = /* @__PURE__ */ Symbol.for("v-scx"), va = () => {
  {
    const e = zt(ma);
    return e || process.env.NODE_ENV !== "production" && A(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Yn(e, t, n) {
  return process.env.NODE_ENV !== "production" && !M(t) && A(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), ku(e, t, n);
}
function ku(e, t, n = Y) {
  const { immediate: o, deep: r, flush: s, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (o !== void 0 && A(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && A(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && A(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const u = oe({}, n);
  process.env.NODE_ENV !== "production" && (u.onWarn = A);
  const l = t && o || !t && s !== "post";
  let p;
  if (An) {
    if (s === "sync") {
      const _ = va();
      p = _.__watcherHandles || (_.__watcherHandles = []);
    } else if (!l) {
      const _ = () => {
      };
      return _.stop = ce, _.resume = ce, _.pause = ce, _;
    }
  }
  const f = ue;
  u.call = (_, m, O) => He(_, f, m, O);
  let a = !1;
  s === "post" ? u.scheduler = (_) => {
    De(_, f && f.suspense);
  } : s !== "sync" && (a = !0, u.scheduler = (_, m) => {
    m ? _() : So(_);
  }), u.augmentJob = (_) => {
    t && (_.flags |= 4), a && (_.flags |= 2, f && (_.id = f.uid, _.i = f));
  };
  const h = Yc(e, t, u);
  return An && (p ? p.push(h) : l && h()), h;
}
function ya(e, t, n) {
  const o = this.proxy, r = ee(e) ? e.includes(".") ? Fu(o, e) : () => o[e] : e.bind(o, o);
  let s;
  M(t) ? s = t : (s = t.handler, n = t);
  const i = Ln(this), u = ku(r, s.bind(o), n);
  return i(), u;
}
function Fu(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
const ba = /* @__PURE__ */ Symbol("_vte"), Oa = (e) => e.__isTeleport, Mo = /* @__PURE__ */ Symbol("_leaveCb");
function Lr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Lr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Na(e, t) {
  return M(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    oe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Lu(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Es = /* @__PURE__ */ new WeakSet();
function ms(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const fo = /* @__PURE__ */ new WeakMap();
function gn(e, t, n, o, r = !1) {
  if ($(e)) {
    e.forEach(
      (O, C) => gn(
        O,
        t && ($(t) ? t[C] : t),
        n,
        o,
        r
      )
    );
    return;
  }
  if (En(o) && !r) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && gn(e, t, n, o.component.subTree);
    return;
  }
  const s = o.shapeFlag & 4 ? Kr(o.component) : o.el, i = r ? null : s, { i: u, r: l } = e;
  if (process.env.NODE_ENV !== "production" && !u) {
    A(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const p = t && t.r, f = u.refs === Y ? u.refs = {} : u.refs, a = u.setupState, h = /* @__PURE__ */ B(a), _ = a === Y ? Qi : (O) => process.env.NODE_ENV !== "production" && (H(h, O) && !/* @__PURE__ */ ie(h[O]) && A(
    `Template ref "${O}" used on a non-ref value. It will not work in the production build.`
  ), Es.has(h[O])) || ms(f, O) ? !1 : H(h, O), m = (O, C) => !(process.env.NODE_ENV !== "production" && Es.has(O) || C && ms(f, C));
  if (p != null && p !== l) {
    if (vs(t), ee(p))
      f[p] = null, _(p) && (a[p] = null);
    else if (/* @__PURE__ */ ie(p)) {
      const O = t;
      m(p, O.k) && (p.value = null), O.k && (f[O.k] = null);
    }
  }
  if (M(l)) {
    Pe();
    try {
      Jt(l, u, 12, [i, f]);
    } finally {
      Re();
    }
  } else {
    const O = ee(l), C = /* @__PURE__ */ ie(l);
    if (O || C) {
      const S = () => {
        if (e.f) {
          const R = O ? _(l) ? a[l] : f[l] : m(l) || !e.k ? l.value : f[e.k];
          if (r)
            $(R) && vr(R, s);
          else if ($(R))
            R.includes(s) || R.push(s);
          else if (O)
            f[l] = [s], _(l) && (a[l] = f[l]);
          else {
            const P = [s];
            m(l, e.k) && (l.value = P), e.k && (f[e.k] = P);
          }
        } else O ? (f[l] = i, _(l) && (a[l] = i)) : C ? (m(l, e.k) && (l.value = i), e.k && (f[e.k] = i)) : process.env.NODE_ENV !== "production" && A("Invalid template ref type:", l, `(${typeof l})`);
      };
      if (i) {
        const R = () => {
          S(), fo.delete(e);
        };
        R.id = -1, fo.set(e, R), De(R, n);
      } else
        vs(e), S();
    } else process.env.NODE_ENV !== "production" && A("Invalid template ref type:", l, `(${typeof l})`);
  }
}
function vs(e) {
  const t = fo.get(e);
  t && (t.flags |= 8, fo.delete(e));
}
Pn().requestIdleCallback;
Pn().cancelIdleCallback;
const En = (e) => !!e.type.__asyncLoader, $r = (e) => e.type.__isKeepAlive;
function Da(e, t) {
  $u(e, "a", t);
}
function Sa(e, t) {
  $u(e, "da", t);
}
function $u(e, t, n = ue) {
  const o = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Ao(t, o, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      $r(r.parent.vnode) && Aa(o, t, n, r), r = r.parent;
  }
}
function Aa(e, t, n, o) {
  const r = Ao(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Mu(() => {
    vr(o[t], r);
  }, n);
}
function Ao(e, t, n = ue, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      Pe();
      const u = Ln(n), l = He(t, n, e, i);
      return u(), Re(), l;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const r = Nt(Pr[e].replace(/ hook$/, ""));
    A(
      `${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const ht = (e) => (t, n = ue) => {
  (!An || e === "sp") && Ao(e, (...o) => t(...o), n);
}, Ca = ht("bm"), wa = ht("m"), Ta = ht(
  "bu"
), xa = ht("u"), Va = ht(
  "bum"
), Mu = ht("um"), Ia = ht(
  "sp"
), Pa = ht("rtg"), Ra = ht("rtc");
function ka(e, t = ue) {
  Ao("ec", e, t);
}
const Fa = /* @__PURE__ */ Symbol.for("v-ndc"), Qo = (e) => e ? ul(e) ? Kr(e) : Qo(e.parent) : null, Vt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ oe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(e.refs) : e.refs,
    $parent: (e) => Qo(e.parent),
    $root: (e) => Qo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ju(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      So(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = na.bind(e.proxy)),
    $watch: (e) => ya.bind(e)
  })
), Mr = (e) => e === "_" || e === "$", Uo = (e, t) => e !== Y && !e.__isScriptSetup && H(e, t), Uu = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: u, appContext: l } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    if (t[0] !== "$") {
      const h = i[t];
      if (h !== void 0)
        switch (h) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Uo(o, t))
          return i[t] = 1, o[t];
        if (r !== Y && H(r, t))
          return i[t] = 2, r[t];
        if (H(s, t))
          return i[t] = 3, s[t];
        if (n !== Y && H(n, t))
          return i[t] = 4, n[t];
        er && (i[t] = 0);
      }
    }
    const p = Vt[t];
    let f, a;
    if (p)
      return t === "$attrs" ? (le(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && ho()) : process.env.NODE_ENV !== "production" && t === "$slots" && le(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (f = u.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Y && H(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      a = l.config.globalProperties, H(a, t)
    )
      return a[t];
    process.env.NODE_ENV !== "production" && xe && (!ee(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== Y && Mr(t[0]) && H(r, t) ? A(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === xe && A(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Uo(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && H(r, t) ? (A(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== Y && H(o, t) ? (o[t] = n, !0) : H(e.props, t) ? (process.env.NODE_ENV !== "production" && A(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && A(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, props: s, type: i }
  }, u) {
    let l;
    return !!(n[u] || e !== Y && u[0] !== "$" && H(e, u) || Uo(t, u) || H(s, u) || H(o, u) || H(Vt, u) || H(r.config.globalProperties, u) || (l = i.__cssModules) && l[u]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : H(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Uu.ownKeys = (e) => (A(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function La(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(Vt).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => Vt[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: ce
    });
  }), t;
}
function $a(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: ce
    });
  });
}
function Ma(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(/* @__PURE__ */ B(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Mr(o[0])) {
        A(
          `setup() return property ${JSON.stringify(
            o
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: ce
      });
    }
  });
}
function ys(e) {
  return $(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Ua() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? A(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let er = !0;
function Ba(e) {
  const t = ju(e), n = e.proxy, o = e.ctx;
  er = !1, t.beforeCreate && bs(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: s,
    methods: i,
    watch: u,
    provide: l,
    inject: p,
    // lifecycle
    created: f,
    beforeMount: a,
    mounted: h,
    beforeUpdate: _,
    updated: m,
    activated: O,
    deactivated: C,
    beforeDestroy: S,
    beforeUnmount: R,
    destroyed: P,
    unmounted: Z,
    render: k,
    renderTracked: J,
    renderTriggered: pe,
    errorCaptured: te,
    serverPrefetch: re,
    // public API
    expose: Ce,
    inheritAttrs: Ie,
    // assets
    components: be,
    directives: Ke,
    filters: st
  } = t, ke = process.env.NODE_ENV !== "production" ? Ua() : null;
  if (process.env.NODE_ENV !== "production") {
    const [V] = e.propsOptions;
    if (V)
      for (const j in V)
        ke("Props", j);
  }
  if (p && ja(p, o, ke), i)
    for (const V in i) {
      const j = i[V];
      M(j) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, V, {
        value: j.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[V] = j.bind(n), process.env.NODE_ENV !== "production" && ke("Methods", V)) : process.env.NODE_ENV !== "production" && A(
        `Method "${V}" has type "${typeof j}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (r) {
    process.env.NODE_ENV !== "production" && !M(r) && A(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const V = r.call(n, n);
    if (process.env.NODE_ENV !== "production" && yr(V) && A(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !W(V))
      process.env.NODE_ENV !== "production" && A("data() should return an object.");
    else if (e.data = /* @__PURE__ */ Vr(V), process.env.NODE_ENV !== "production")
      for (const j in V)
        ke("Data", j), Mr(j[0]) || Object.defineProperty(o, j, {
          configurable: !0,
          enumerable: !0,
          get: () => V[j],
          set: ce
        });
  }
  if (er = !0, s)
    for (const V in s) {
      const j = s[V], ne = M(j) ? j.bind(n, n) : M(j.get) ? j.get.bind(n, n) : ce;
      process.env.NODE_ENV !== "production" && ne === ce && A(`Computed property "${V}" has no getter.`);
      const We = !M(j) && M(j.set) ? j.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        A(
          `Write operation failed: computed property "${V}" is readonly.`
        );
      } : ce, Oe = Uf({
        get: ne,
        set: We
      });
      Object.defineProperty(o, V, {
        enumerable: !0,
        configurable: !0,
        get: () => Oe.value,
        set: (fe) => Oe.value = fe
      }), process.env.NODE_ENV !== "production" && ke("Computed", V);
    }
  if (u)
    for (const V in u)
      Bu(u[V], o, n, V);
  if (l) {
    const V = M(l) ? l.call(n) : l;
    Reflect.ownKeys(V).forEach((j) => {
      Ea(j, V[j]);
    });
  }
  f && bs(f, e, "c");
  function Q(V, j) {
    $(j) ? j.forEach((ne) => V(ne.bind(n))) : j && V(j.bind(n));
  }
  if (Q(Ca, a), Q(wa, h), Q(Ta, _), Q(xa, m), Q(Da, O), Q(Sa, C), Q(ka, te), Q(Ra, J), Q(Pa, pe), Q(Va, R), Q(Mu, Z), Q(Ia, re), $(Ce))
    if (Ce.length) {
      const V = e.exposed || (e.exposed = {});
      Ce.forEach((j) => {
        Object.defineProperty(V, j, {
          get: () => n[j],
          set: (ne) => n[j] = ne,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === ce && (e.render = k), Ie != null && (e.inheritAttrs = Ie), be && (e.components = be), Ke && (e.directives = Ke), re && Lu(e);
}
function ja(e, t, n = ce) {
  $(e) && (e = tr(e));
  for (const o in e) {
    const r = e[o];
    let s;
    W(r) ? "default" in r ? s = zt(
      r.from || o,
      r.default,
      !0
    ) : s = zt(r.from || o) : s = zt(r), /* @__PURE__ */ ie(s) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => s.value,
      set: (i) => s.value = i
    }) : t[o] = s, process.env.NODE_ENV !== "production" && n("Inject", o);
  }
}
function bs(e, t, n) {
  He(
    $(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Bu(e, t, n, o) {
  let r = o.includes(".") ? Fu(n, o) : () => n[o];
  if (ee(e)) {
    const s = t[e];
    M(s) ? Yn(r, s) : process.env.NODE_ENV !== "production" && A(`Invalid watch handler specified by key "${e}"`, s);
  } else if (M(e))
    Yn(r, e.bind(n));
  else if (W(e))
    if ($(e))
      e.forEach((s) => Bu(s, t, n, o));
    else {
      const s = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(s) ? Yn(r, s, e) : process.env.NODE_ENV !== "production" && A(`Invalid watch handler specified by key "${e.handler}"`, s);
    }
  else process.env.NODE_ENV !== "production" && A(`Invalid watch option: "${o}"`, e);
}
function ju(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: r,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, u = s.get(t);
  let l;
  return u ? l = u : !r.length && !n && !o ? l = t : (l = {}, r.length && r.forEach(
    (p) => po(l, p, i, !0)
  ), po(l, t, i)), W(t) && s.set(t, l), l;
}
function po(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && po(e, s, n, !0), r && r.forEach(
    (i) => po(e, i, n, !0)
  );
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && A(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const u = Ha[i] || n && n[i];
      e[i] = u ? u(e[i], t[i]) : t[i];
    }
  return e;
}
const Ha = {
  data: Os,
  props: Ns,
  emits: Ns,
  // objects
  methods: cn,
  computed: cn,
  // lifecycle
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  // assets
  components: cn,
  directives: cn,
  // watch
  watch: Wa,
  // provide / inject
  provide: Os,
  inject: Ka
};
function Os(e, t) {
  return t ? e ? function() {
    return oe(
      M(e) ? e.call(this, this) : e,
      M(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ka(e, t) {
  return cn(tr(e), tr(t));
}
function tr(e) {
  if ($(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function me(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function cn(e, t) {
  return e ? oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ns(e, t) {
  return e ? $(e) && $(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : oe(
    /* @__PURE__ */ Object.create(null),
    ys(e),
    ys(t ?? {})
  ) : t;
}
function Wa(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = oe(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = me(e[o], t[o]);
  return n;
}
function Hu() {
  return {
    app: null,
    config: {
      isNativeTag: Qi,
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
let za = 0;
function Ga(e, t) {
  return function(o, r = null) {
    M(o) || (o = oe({}, o)), r != null && !W(r) && (process.env.NODE_ENV !== "production" && A("root props passed to app.mount() must be an object."), r = null);
    const s = Hu(), i = /* @__PURE__ */ new WeakSet(), u = [];
    let l = !1;
    const p = s.app = {
      _uid: za++,
      _component: o,
      _props: r,
      _container: null,
      _context: s,
      _instance: null,
      version: ks,
      get config() {
        return s.config;
      },
      set config(f) {
        process.env.NODE_ENV !== "production" && A(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...a) {
        return i.has(f) ? process.env.NODE_ENV !== "production" && A("Plugin has already been applied to target app.") : f && M(f.install) ? (i.add(f), f.install(p, ...a)) : M(f) ? (i.add(f), f(p, ...a)) : process.env.NODE_ENV !== "production" && A(
          'A plugin must either be a function or an object with an "install" function.'
        ), p;
      },
      mixin(f) {
        return s.mixins.includes(f) ? process.env.NODE_ENV !== "production" && A(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : s.mixins.push(f), p;
      },
      component(f, a) {
        return process.env.NODE_ENV !== "production" && ir(f, s.config), a ? (process.env.NODE_ENV !== "production" && s.components[f] && A(`Component "${f}" has already been registered in target app.`), s.components[f] = a, p) : s.components[f];
      },
      directive(f, a) {
        return process.env.NODE_ENV !== "production" && Ru(f), a ? (process.env.NODE_ENV !== "production" && s.directives[f] && A(`Directive "${f}" has already been registered in target app.`), s.directives[f] = a, p) : s.directives[f];
      },
      mount(f, a, h) {
        if (l)
          process.env.NODE_ENV !== "production" && A(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && f.__vue_app__ && A(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const _ = p._ceVNode || Pt(o, r);
          return _.appContext = s, h === !0 ? h = "svg" : h === !1 && (h = void 0), process.env.NODE_ENV !== "production" && (s.reload = () => {
            const m = vt(_);
            m.el = null, e(m, f, h);
          }), e(_, f, h), l = !0, p._container = f, f.__vue_app__ = p, process.env.NODE_ENV !== "production" && (p._instance = _.component, la(p, ks)), Kr(_.component);
        }
      },
      onUnmount(f) {
        process.env.NODE_ENV !== "production" && typeof f != "function" && A(
          `Expected function as first argument to app.onUnmount(), but got ${typeof f}`
        ), u.push(f);
      },
      unmount() {
        l ? (He(
          u,
          p._instance,
          16
        ), e(null, p._container), process.env.NODE_ENV !== "production" && (p._instance = null, ca(p)), delete p._container.__vue_app__) : process.env.NODE_ENV !== "production" && A("Cannot unmount an app that is not mounted.");
      },
      provide(f, a) {
        return process.env.NODE_ENV !== "production" && f in s.provides && (H(s.provides, f) ? A(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ) : A(
          `App already provides property with key "${String(f)}" inherited from its parent element. It will be overwritten with the new value.`
        )), s.provides[f] = a, p;
      },
      runWithContext(f) {
        const a = It;
        It = p;
        try {
          return f();
        } finally {
          It = a;
        }
      }
    };
    return p;
  };
}
let It = null;
const qa = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Se(t)}Modifiers`] || e[`${mt(t)}Modifiers`];
function Ya(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || Y;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [a]
    } = e;
    if (f)
      if (!(t in f))
        (!a || !(Nt(Se(t)) in a)) && A(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Nt(Se(t))}" prop.`
        );
      else {
        const h = f[t];
        M(h) && (h(...n) || A(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let r = n;
  const s = t.startsWith("update:"), i = s && qa(o, t.slice(7));
  if (i && (i.trim && (r = n.map((f) => ee(f) ? f.trim() : f)), i.number && (r = n.map(lc))), process.env.NODE_ENV !== "production" && _a(e, t, r), process.env.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && o[Nt(f)] && A(
      `Event "${f}" is emitted in component ${$n(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${mt(
        t
      )}" instead of "${t}".`
    );
  }
  let u, l = o[u = Nt(t)] || // also try camelCase event handler (#2249)
  o[u = Nt(Se(t))];
  !l && s && (l = o[u = Nt(mt(t))]), l && He(
    l,
    e,
    6,
    r
  );
  const p = o[u + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, He(
      p,
      e,
      6,
      r
    );
  }
}
const Ja = /* @__PURE__ */ new WeakMap();
function Ku(e, t, n = !1) {
  const o = n ? Ja : t.emitsCache, r = o.get(e);
  if (r !== void 0)
    return r;
  const s = e.emits;
  let i = {}, u = !1;
  if (!M(e)) {
    const l = (p) => {
      const f = Ku(p, t, !0);
      f && (u = !0, oe(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !s && !u ? (W(e) && o.set(e, null), null) : ($(s) ? s.forEach((l) => i[l] = null) : oe(i, s), W(e) && o.set(e, i), i);
}
function Co(e, t) {
  return !e || !Vn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), H(e, t[0].toLowerCase() + t.slice(1)) || H(e, mt(t)) || H(e, t));
}
let nr = !1;
function ho() {
  nr = !0;
}
function Ds(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: r,
    propsOptions: [s],
    slots: i,
    attrs: u,
    emit: l,
    render: p,
    renderCache: f,
    props: a,
    data: h,
    setupState: _,
    ctx: m,
    inheritAttrs: O
  } = e, C = ao(e);
  let S, R;
  process.env.NODE_ENV !== "production" && (nr = !1);
  try {
    if (n.shapeFlag & 4) {
      const k = r || o, J = process.env.NODE_ENV !== "production" && _.__isScriptSetup ? new Proxy(k, {
        get(pe, te, re) {
          return A(
            `Property '${String(
              te
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(pe, te, re);
        }
      }) : k;
      S = Le(
        p.call(
          J,
          k,
          f,
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(a) : a,
          _,
          h,
          m
        )
      ), R = u;
    } else {
      const k = t;
      process.env.NODE_ENV !== "production" && u === a && ho(), S = Le(
        k.length > 1 ? k(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return ho(), /* @__PURE__ */ ot(u);
            },
            slots: i,
            emit: l
          } : { attrs: u, slots: i, emit: l }
        ) : k(
          process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(a) : a,
          null
        )
      ), R = t.props ? u : Xa(u);
    }
  } catch (k) {
    mn.length = 0, Rn(k, e, 1), S = Pt(Ue);
  }
  let P = S, Z;
  if (process.env.NODE_ENV !== "production" && S.patchFlag > 0 && S.patchFlag & 2048 && ([P, Z] = Wu(S)), R && O !== !1) {
    const k = Object.keys(R), { shapeFlag: J } = P;
    if (k.length) {
      if (J & 7)
        s && k.some(yn) && (R = Za(
          R,
          s
        )), P = vt(P, R, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !nr && P.type !== Ue) {
        const pe = Object.keys(u), te = [], re = [];
        for (let Ce = 0, Ie = pe.length; Ce < Ie; Ce++) {
          const be = pe[Ce];
          Vn(be) ? yn(be) || te.push(be[2].toLowerCase() + be.slice(3)) : re.push(be);
        }
        re.length && A(
          `Extraneous non-props attributes (${re.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), te.length && A(
          `Extraneous non-emits event listeners (${te.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !Ss(P) && A(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), P = vt(P, null, !1, !0), P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !Ss(P) && A(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Lr(P, n.transition)), process.env.NODE_ENV !== "production" && Z ? Z(P) : S = P, ao(C), S;
}
const Wu = (e) => {
  const t = e.children, n = e.dynamicChildren, o = Ur(t, !1);
  if (o) {
    if (process.env.NODE_ENV !== "production" && o.patchFlag > 0 && o.patchFlag & 2048)
      return Wu(o);
  } else return [e, void 0];
  const r = t.indexOf(o), s = n ? n.indexOf(o) : -1, i = (u) => {
    t[r] = u, n && (s > -1 ? n[s] = u : u.patchFlag > 0 && (e.dynamicChildren = [...n, u]));
  };
  return [Le(o), i];
};
function Ur(e, t = !0) {
  let n;
  for (let o = 0; o < e.length; o++) {
    const r = e[o];
    if (wo(r)) {
      if (r.type !== Ue || r.children === "v-if") {
        if (n)
          return;
        if (n = r, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return Ur(n.children);
      }
    } else
      return;
  }
  return n;
}
const Xa = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Vn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Za = (e, t) => {
  const n = {};
  for (const o in e)
    (!yn(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, Ss = (e) => e.shapeFlag & 7 || e.type === Ue;
function Qa(e, t, n) {
  const { props: o, children: r, component: s } = e, { props: i, children: u, patchFlag: l } = t, p = s.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (r || u) && Te || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return o ? As(o, i, p) : !!i;
    if (l & 8) {
      const f = t.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        const h = f[a];
        if (zu(i, o, h) && !Co(p, h))
          return !0;
      }
    }
  } else
    return (r || u) && (!u || !u.$stable) ? !0 : o === i ? !1 : o ? i ? As(o, i, p) : !0 : !!i;
  return !1;
}
function As(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (zu(t, e, s) && !Co(n, s))
      return !0;
  }
  return !1;
}
function zu(e, t, n) {
  const o = e[n], r = t[n];
  return n === "style" && W(o) && W(r) ? !Sr(o, r) : o !== r;
}
function ef({ vnode: e, parent: t, suspense: n }, o) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = o, e = r), r === e)
      (e = t.vnode).el = o, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = o);
}
const Gu = {}, qu = () => Object.create(Gu), Yu = (e) => Object.getPrototypeOf(e) === Gu;
function tf(e, t, n, o = !1) {
  const r = {}, s = qu();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ju(e, t, r, s);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  process.env.NODE_ENV !== "production" && Zu(t || {}, r, e), n ? e.props = o ? r : /* @__PURE__ */ Bc(r) : e.type.props ? e.props = r : e.props = s, e.attrs = s;
}
function nf(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function of(e, t, n, o) {
  const {
    props: r,
    attrs: s,
    vnode: { patchFlag: i }
  } = e, u = /* @__PURE__ */ B(r), [l] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && nf(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        let h = f[a];
        if (Co(e.emitsOptions, h))
          continue;
        const _ = t[h];
        if (l)
          if (H(s, h))
            _ !== s[h] && (s[h] = _, p = !0);
          else {
            const m = Se(h);
            r[m] = or(
              l,
              u,
              m,
              _,
              e,
              !1
            );
          }
        else
          _ !== s[h] && (s[h] = _, p = !0);
      }
    }
  } else {
    Ju(e, t, r, s) && (p = !0);
    let f;
    for (const a in u)
      (!t || // for camelCase
      !H(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = mt(a)) === a || !H(t, f))) && (l ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[f] !== void 0) && (r[a] = or(
        l,
        u,
        a,
        void 0,
        e,
        !0
      )) : delete r[a]);
    if (s !== u)
      for (const a in s)
        (!t || !H(t, a)) && (delete s[a], p = !0);
  }
  p && nt(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Zu(t || {}, r, e);
}
function Ju(e, t, n, o) {
  const [r, s] = e.propsOptions;
  let i = !1, u;
  if (t)
    for (let l in t) {
      if (dn(l))
        continue;
      const p = t[l];
      let f;
      r && H(r, f = Se(l)) ? !s || !s.includes(f) ? n[f] = p : (u || (u = {}))[f] = p : Co(e.emitsOptions, l) || (!(l in o) || p !== o[l]) && (o[l] = p, i = !0);
    }
  if (s) {
    const l = /* @__PURE__ */ B(n), p = u || Y;
    for (let f = 0; f < s.length; f++) {
      const a = s[f];
      n[a] = or(
        r,
        l,
        a,
        p[a],
        e,
        !H(p, a)
      );
    }
  }
  return i;
}
function or(e, t, n, o, r, s) {
  const i = e[n];
  if (i != null) {
    const u = H(i, "default");
    if (u && o === void 0) {
      const l = i.default;
      if (i.type !== Function && !i.skipFactory && M(l)) {
        const { propsDefaults: p } = r;
        if (n in p)
          o = p[n];
        else {
          const f = Ln(r);
          o = p[n] = l.call(
            null,
            t
          ), f();
        }
      } else
        o = l;
      r.ce && r.ce._setProp(n, o);
    }
    i[
      0
      /* shouldCast */
    ] && (s && !u ? o = !1 : i[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === mt(n)) && (o = !0));
  }
  return o;
}
const rf = /* @__PURE__ */ new WeakMap();
function Xu(e, t, n = !1) {
  const o = n ? rf : t.propsCache, r = o.get(e);
  if (r)
    return r;
  const s = e.props, i = {}, u = [];
  let l = !1;
  if (!M(e)) {
    const f = (a) => {
      l = !0;
      const [h, _] = Xu(a, t, !0);
      oe(i, h), _ && u.push(..._);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!s && !l)
    return W(e) && o.set(e, Kt), Kt;
  if ($(s))
    for (let f = 0; f < s.length; f++) {
      process.env.NODE_ENV !== "production" && !ee(s[f]) && A("props must be strings when using array syntax.", s[f]);
      const a = Se(s[f]);
      Cs(a) && (i[a] = Y);
    }
  else if (s) {
    process.env.NODE_ENV !== "production" && !W(s) && A("invalid props options", s);
    for (const f in s) {
      const a = Se(f);
      if (Cs(a)) {
        const h = s[f], _ = i[a] = $(h) || M(h) ? { type: h } : oe({}, h), m = _.type;
        let O = !1, C = !0;
        if ($(m))
          for (let S = 0; S < m.length; ++S) {
            const R = m[S], P = M(R) && R.name;
            if (P === "Boolean") {
              O = !0;
              break;
            } else P === "String" && (C = !1);
          }
        else
          O = M(m) && m.name === "Boolean";
        _[
          0
          /* shouldCast */
        ] = O, _[
          1
          /* shouldCastTrue */
        ] = C, (O || H(_, "default")) && u.push(a);
      }
    }
  }
  const p = [i, u];
  return W(e) && o.set(e, p), p;
}
function Cs(e) {
  return e[0] !== "$" && !dn(e) ? !0 : (process.env.NODE_ENV !== "production" && A(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function sf(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Zu(e, t, n) {
  const o = /* @__PURE__ */ B(t), r = n.propsOptions[0], s = Object.keys(e).map((i) => Se(i));
  for (const i in r) {
    let u = r[i];
    u != null && uf(
      i,
      o[i],
      u,
      process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(o) : o,
      !s.includes(i)
    );
  }
}
function uf(e, t, n, o, r) {
  const { type: s, required: i, validator: u, skipCheck: l } = n;
  if (i && r) {
    A('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !i)) {
    if (s != null && s !== !0 && !l) {
      let p = !1;
      const f = $(s) ? s : [s], a = [];
      for (let h = 0; h < f.length && !p; h++) {
        const { valid: _, expectedType: m } = cf(t, f[h]);
        a.push(m || ""), p = _;
      }
      if (!p) {
        A(af(e, t, a));
        return;
      }
    }
    u && !u(t, o) && A('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const lf = /* @__PURE__ */ pt(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function cf(e, t) {
  let n;
  const o = sf(t);
  if (o === "null")
    n = e === null;
  else if (lf(o)) {
    const r = typeof e;
    n = r === o.toLowerCase(), !n && r === "object" && (n = e instanceof t);
  } else o === "Object" ? n = W(e) : o === "Array" ? n = $(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function af(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(Oo).join(" | ")}`;
  const r = n[0], s = br(t), i = ws(t, r), u = ws(t, s);
  return n.length === 1 && Ts(r) && ff(r, s) && (o += ` with value ${i}`), o += `, got ${s} `, Ts(s) && (o += `with value ${u}.`), o;
}
function ws(e, t) {
  return Be(e) ? e.toString() : t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Ts(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function ff(...e) {
  return e.every((t) => {
    const n = t.toLowerCase();
    return n !== "boolean" && n !== "symbol";
  });
}
const Br = (e) => e === "_" || e === "_ctx" || e === "$stable", jr = (e) => $(e) ? e.map(Le) : [Le(e)], df = (e, t, n) => {
  if (t._n)
    return t;
  const o = ga((...r) => (process.env.NODE_ENV !== "production" && ue && !(n === null && xe) && !(n && n.root !== ue.root) && A(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), jr(t(...r))), n);
  return o._c = !1, o;
}, Qu = (e, t, n) => {
  const o = e._ctx;
  for (const r in e) {
    if (Br(r)) continue;
    const s = e[r];
    if (M(s))
      t[r] = df(r, s, o);
    else if (s != null) {
      process.env.NODE_ENV !== "production" && A(
        `Non-function value encountered for slot "${r}". Prefer function slots for better performance.`
      );
      const i = jr(s);
      t[r] = () => i;
    }
  }
}, el = (e, t) => {
  process.env.NODE_ENV !== "production" && !$r(e.vnode) && A(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = jr(t);
  e.slots.default = () => n;
}, rr = (e, t, n) => {
  for (const o in t)
    (n || !Br(o)) && (e[o] = t[o]);
}, pf = (e, t, n) => {
  const o = e.slots = qu();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (rr(o, t, n), n && so(o, "_", r, !0)) : Qu(t, o);
  } else t && el(e, t);
}, hf = (e, t, n) => {
  const { vnode: o, slots: r } = e;
  let s = !0, i = Y;
  if (o.shapeFlag & 32) {
    const u = t._;
    u ? process.env.NODE_ENV !== "production" && Te ? (rr(r, t, n), nt(e, "set", "$slots")) : n && u === 1 ? s = !1 : rr(r, t, n) : (s = !t.$stable, Qu(t, r)), i = t;
  } else t && (el(e, t), i = { default: 1 });
  if (s)
    for (const u in r)
      !Br(u) && i[u] == null && delete r[u];
};
let sn, ct;
function Mt(e, t) {
  e.appContext.config.performance && _o() && ct.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && pa(e, t, _o() ? ct.now() : Date.now());
}
function Ut(e, t) {
  if (e.appContext.config.performance && _o()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end", r = `<${$n(e, e.type)}> ${t}`;
    ct.mark(o), ct.measure(r, n, o), ct.clearMeasures(r), ct.clearMarks(n), ct.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && ha(e, t, _o() ? ct.now() : Date.now());
}
function _o() {
  return sn !== void 0 || (typeof window < "u" && window.performance ? (sn = !0, ct = window.performance) : sn = !1), sn;
}
function _f() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const De = yf;
function gf(e) {
  return Ef(e);
}
function Ef(e, t) {
  _f();
  const n = Pn();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && kr(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: o,
    remove: r,
    patchProp: s,
    createElement: i,
    createText: u,
    createComment: l,
    setText: p,
    setElementText: f,
    parentNode: a,
    nextSibling: h,
    setScopeId: _ = ce,
    insertStaticContent: m
  } = e, O = (c, d, g, b = null, v = null, E = null, T = void 0, D = null, N = process.env.NODE_ENV !== "production" && Te ? !1 : !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !un(c, d) && (b = Un(c), Ne(c, v, E, !0), c = null), d.patchFlag === -2 && (N = !1, d.dynamicChildren = null);
    const { type: y, ref: L, shapeFlag: x } = d;
    switch (y) {
      case Fn:
        C(c, d, g, b);
        break;
      case Ue:
        S(c, d, g, b);
        break;
      case Xn:
        c == null ? R(d, g, b, T) : process.env.NODE_ENV !== "production" && P(c, d, g, T);
        break;
      case et:
        Ke(
          c,
          d,
          g,
          b,
          v,
          E,
          T,
          D,
          N
        );
        break;
      default:
        x & 1 ? J(
          c,
          d,
          g,
          b,
          v,
          E,
          T,
          D,
          N
        ) : x & 6 ? st(
          c,
          d,
          g,
          b,
          v,
          E,
          T,
          D,
          N
        ) : x & 64 || x & 128 ? y.process(
          c,
          d,
          g,
          b,
          v,
          E,
          T,
          D,
          N,
          tn
        ) : process.env.NODE_ENV !== "production" && A("Invalid VNode type:", y, `(${typeof y})`);
    }
    L != null && v ? gn(L, c && c.ref, E, d || c, !d) : L == null && c && c.ref != null && gn(c.ref, null, E, c, !0);
  }, C = (c, d, g, b) => {
    if (c == null)
      o(
        d.el = u(d.children),
        g,
        b
      );
    else {
      const v = d.el = c.el;
      d.children !== c.children && p(v, d.children);
    }
  }, S = (c, d, g, b) => {
    c == null ? o(
      d.el = l(d.children || ""),
      g,
      b
    ) : d.el = c.el;
  }, R = (c, d, g, b) => {
    [c.el, c.anchor] = m(
      c.children,
      d,
      g,
      b,
      c.el,
      c.anchor
    );
  }, P = (c, d, g, b) => {
    if (d.children !== c.children) {
      const v = h(c.anchor);
      k(c), [d.el, d.anchor] = m(
        d.children,
        g,
        v,
        b
      );
    } else
      d.el = c.el, d.anchor = c.anchor;
  }, Z = ({ el: c, anchor: d }, g, b) => {
    let v;
    for (; c && c !== d; )
      v = h(c), o(c, g, b), c = v;
    o(d, g, b);
  }, k = ({ el: c, anchor: d }) => {
    let g;
    for (; c && c !== d; )
      g = h(c), r(c), c = g;
    r(d);
  }, J = (c, d, g, b, v, E, T, D, N) => {
    if (d.type === "svg" ? T = "svg" : d.type === "math" && (T = "mathml"), c == null)
      pe(
        d,
        g,
        b,
        v,
        E,
        T,
        D,
        N
      );
    else {
      const y = c.el && c.el._isVueCE ? c.el : null;
      try {
        y && y._beginPatch(), Ce(
          c,
          d,
          v,
          E,
          T,
          D,
          N
        );
      } finally {
        y && y._endPatch();
      }
    }
  }, pe = (c, d, g, b, v, E, T, D) => {
    let N, y;
    const { props: L, shapeFlag: x, transition: F, dirs: U } = c;
    if (N = c.el = i(
      c.type,
      E,
      L && L.is,
      L
    ), x & 8 ? f(N, c.children) : x & 16 && re(
      c.children,
      N,
      null,
      b,
      v,
      Bo(c, E),
      T,
      D
    ), U && bt(c, null, b, "created"), te(N, c, c.scopeId, T, b), L) {
      for (const G in L)
        G !== "value" && !dn(G) && s(N, G, null, L[G], E, b);
      "value" in L && s(N, "value", null, L.value, E), (y = L.onVnodeBeforeMount) && Ye(y, b, c);
    }
    process.env.NODE_ENV !== "production" && (so(N, "__vnode", c, !0), so(N, "__vueParentComponent", b, !0)), U && bt(c, null, b, "beforeMount");
    const K = mf(v, F);
    if (K && F.beforeEnter(N), o(N, d, g), (y = L && L.onVnodeMounted) || K || U) {
      const G = process.env.NODE_ENV !== "production" && Te;
      De(() => {
        let z;
        process.env.NODE_ENV !== "production" && (z = hs(G));
        try {
          y && Ye(y, b, c), K && F.enter(N), U && bt(c, null, b, "mounted");
        } finally {
          process.env.NODE_ENV !== "production" && hs(z);
        }
      }, v);
    }
  }, te = (c, d, g, b, v) => {
    if (g && _(c, g), b)
      for (let E = 0; E < b.length; E++)
        _(c, b[E]);
    if (v) {
      let E = v.subTree;
      if (process.env.NODE_ENV !== "production" && E.patchFlag > 0 && E.patchFlag & 2048 && (E = Ur(E.children) || E), d === E || ol(E.type) && (E.ssContent === d || E.ssFallback === d)) {
        const T = v.vnode;
        te(
          c,
          T,
          T.scopeId,
          T.slotScopeIds,
          v.parent
        );
      }
    }
  }, re = (c, d, g, b, v, E, T, D, N = 0) => {
    for (let y = N; y < c.length; y++) {
      const L = c[y] = D ? at(c[y]) : Le(c[y]);
      O(
        null,
        L,
        d,
        g,
        b,
        v,
        E,
        T,
        D
      );
    }
  }, Ce = (c, d, g, b, v, E, T) => {
    const D = d.el = c.el;
    process.env.NODE_ENV !== "production" && (D.__vnode = d);
    let { patchFlag: N, dynamicChildren: y, dirs: L } = d;
    N |= c.patchFlag & 16;
    const x = c.props || Y, F = d.props || Y;
    let U;
    if (g && Ot(g, !1), (U = F.onVnodeBeforeUpdate) && Ye(U, g, d, c), L && bt(d, c, g, "beforeUpdate"), g && Ot(g, !0), // HMR updated, force full diff
    (process.env.NODE_ENV !== "production" && Te || // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    y && (!c.dynamicChildren || c.dynamicChildren.length !== y.length)) && (N = 0, T = !1, y = null), (x.innerHTML && F.innerHTML == null || x.textContent && F.textContent == null) && f(D, ""), y ? (Ie(
      c.dynamicChildren,
      y,
      D,
      g,
      b,
      Bo(d, v),
      E
    ), process.env.NODE_ENV !== "production" && Jn(c, d)) : T || ne(
      c,
      d,
      D,
      null,
      g,
      b,
      Bo(d, v),
      E,
      !1
    ), N > 0) {
      if (N & 16)
        be(D, x, F, g, v);
      else if (N & 2 && x.class !== F.class && s(D, "class", null, F.class, v), N & 4 && s(D, "style", x.style, F.style, v), N & 8) {
        const K = d.dynamicProps;
        for (let G = 0; G < K.length; G++) {
          const z = K[G], se = x[z], he = F[z];
          (he !== se || z === "value") && s(D, z, se, he, v, g);
        }
      }
      N & 1 && c.children !== d.children && f(D, d.children);
    } else !T && y == null && be(D, x, F, g, v);
    ((U = F.onVnodeUpdated) || L) && De(() => {
      U && Ye(U, g, d, c), L && bt(d, c, g, "updated");
    }, b);
  }, Ie = (c, d, g, b, v, E, T) => {
    for (let D = 0; D < d.length; D++) {
      const N = c[D], y = d[D], L = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        N.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (N.type === et || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !un(N, y) || // - In the case of a component, it could contain anything.
        N.shapeFlag & 198) ? a(N.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      O(
        N,
        y,
        L,
        null,
        b,
        v,
        E,
        T,
        !0
      );
    }
  }, be = (c, d, g, b, v) => {
    if (d !== g) {
      if (d !== Y)
        for (const E in d)
          !dn(E) && !(E in g) && s(
            c,
            E,
            d[E],
            null,
            v,
            b
          );
      for (const E in g) {
        if (dn(E)) continue;
        const T = g[E], D = d[E];
        T !== D && E !== "value" && s(c, E, D, T, v, b);
      }
      "value" in g && s(c, "value", d.value, g.value, v);
    }
  }, Ke = (c, d, g, b, v, E, T, D, N) => {
    const y = d.el = c ? c.el : u(""), L = d.anchor = c ? c.anchor : u("");
    let { patchFlag: x, dynamicChildren: F, slotScopeIds: U } = d;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (Te || x & 2048) && (x = 0, N = !1, F = null), U && (D = D ? D.concat(U) : U), c == null ? (o(y, g, b), o(L, g, b), re(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      g,
      L,
      v,
      E,
      T,
      D,
      N
    )) : x > 0 && x & 64 && F && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === F.length ? (Ie(
      c.dynamicChildren,
      F,
      g,
      v,
      E,
      T,
      D
    ), process.env.NODE_ENV !== "production" ? Jn(c, d) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (d.key != null || v && d === v.subTree) && Jn(
        c,
        d,
        !0
        /* shallow */
      )
    )) : ne(
      c,
      d,
      g,
      L,
      v,
      E,
      T,
      D,
      N
    );
  }, st = (c, d, g, b, v, E, T, D, N) => {
    d.slotScopeIds = D, c == null ? d.shapeFlag & 512 ? v.ctx.activate(
      d,
      g,
      b,
      T,
      N
    ) : ke(
      d,
      g,
      b,
      v,
      E,
      T,
      N
    ) : Q(c, d, N);
  }, ke = (c, d, g, b, v, E, T) => {
    const D = c.component = Vf(
      c,
      b,
      v
    );
    if (process.env.NODE_ENV !== "production" && D.type.__hmrId && ra(D), process.env.NODE_ENV !== "production" && (zn(c), Mt(D, "mount")), $r(c) && (D.ctx.renderer = tn), process.env.NODE_ENV !== "production" && Mt(D, "init"), Pf(D, !1, T), process.env.NODE_ENV !== "production" && Ut(D, "init"), process.env.NODE_ENV !== "production" && Te && (c.el = null), D.asyncDep) {
      if (v && v.registerDep(D, V, T), !c.el) {
        const N = D.subTree = Pt(Ue);
        S(null, N, d, g), c.placeholder = N.el;
      }
    } else
      V(
        D,
        c,
        d,
        g,
        v,
        E,
        T
      );
    process.env.NODE_ENV !== "production" && (Gn(), Ut(D, "mount"));
  }, Q = (c, d, g) => {
    const b = d.component = c.component;
    if (Qa(c, d, g))
      if (b.asyncDep && !b.asyncResolved) {
        process.env.NODE_ENV !== "production" && zn(d), j(b, d, g), process.env.NODE_ENV !== "production" && Gn();
        return;
      } else
        b.next = d, b.update();
    else
      d.el = c.el, b.vnode = d;
  }, V = (c, d, g, b, v, E, T) => {
    const D = () => {
      if (c.isMounted) {
        let { next: x, bu: F, u: U, parent: K, vnode: G } = c;
        {
          const Ge = tl(c);
          if (Ge) {
            x && (x.el = G.el, j(c, x, T)), Ge.asyncDep.then(() => {
              De(() => {
                c.isUnmounted || y();
              }, v);
            });
            return;
          }
        }
        let z = x, se;
        process.env.NODE_ENV !== "production" && zn(x || c.vnode), Ot(c, !1), x ? (x.el = G.el, j(c, x, T)) : x = G, F && on(F), (se = x.props && x.props.onVnodeBeforeUpdate) && Ye(se, K, x, G), Ot(c, !0), process.env.NODE_ENV !== "production" && Mt(c, "render");
        const he = Ds(c);
        process.env.NODE_ENV !== "production" && Ut(c, "render");
        const ze = c.subTree;
        c.subTree = he, process.env.NODE_ENV !== "production" && Mt(c, "patch"), O(
          ze,
          he,
          // parent may have changed if it's in a teleport
          a(ze.el),
          // anchor may have changed if it's in a fragment
          Un(ze),
          c,
          v,
          E
        ), process.env.NODE_ENV !== "production" && Ut(c, "patch"), x.el = he.el, z === null && ef(c, he.el), U && De(U, v), (se = x.props && x.props.onVnodeUpdated) && De(
          () => Ye(se, K, x, G),
          v
        ), process.env.NODE_ENV !== "production" && Vu(c), process.env.NODE_ENV !== "production" && Gn();
      } else {
        let x;
        const { el: F, props: U } = d, { bm: K, m: G, parent: z, root: se, type: he } = c, ze = En(d);
        Ot(c, !1), K && on(K), !ze && (x = U && U.onVnodeBeforeMount) && Ye(x, z, d), Ot(c, !0);
        {
          se.ce && se.ce._hasShadowRoot() && se.ce._injectChildStyle(
            he,
            c.parent ? c.parent.type : void 0
          ), process.env.NODE_ENV !== "production" && Mt(c, "render");
          const Ge = c.subTree = Ds(c);
          process.env.NODE_ENV !== "production" && Ut(c, "render"), process.env.NODE_ENV !== "production" && Mt(c, "patch"), O(
            null,
            Ge,
            g,
            b,
            c,
            v,
            E
          ), process.env.NODE_ENV !== "production" && Ut(c, "patch"), d.el = Ge.el;
        }
        if (G && De(G, v), !ze && (x = U && U.onVnodeMounted)) {
          const Ge = d;
          De(
            () => Ye(x, z, Ge),
            v
          );
        }
        (d.shapeFlag & 256 || z && En(z.vnode) && z.vnode.shapeFlag & 256) && c.a && De(c.a, v), c.isMounted = !0, process.env.NODE_ENV !== "production" && aa(c), d = g = b = null;
      }
    };
    c.scope.on();
    const N = c.effect = new uu(D);
    c.scope.off();
    const y = c.update = N.run.bind(N), L = c.job = N.runIfDirty.bind(N);
    L.i = c, L.id = c.uid, N.scheduler = () => So(L), Ot(c, !0), process.env.NODE_ENV !== "production" && (N.onTrack = c.rtc ? (x) => on(c.rtc, x) : void 0, N.onTrigger = c.rtg ? (x) => on(c.rtg, x) : void 0), y();
  }, j = (c, d, g) => {
    d.component = c;
    const b = c.vnode.props;
    c.vnode = d, c.next = null, of(c, d.props, b, g), hf(c, d.children, g), Pe(), ps(c), Re();
  }, ne = (c, d, g, b, v, E, T, D, N = !1) => {
    const y = c && c.children, L = c ? c.shapeFlag : 0, x = d.children, { patchFlag: F, shapeFlag: U } = d;
    if (F > 0) {
      if (F & 128) {
        Oe(
          y,
          x,
          g,
          b,
          v,
          E,
          T,
          D,
          N
        );
        return;
      } else if (F & 256) {
        We(
          y,
          x,
          g,
          b,
          v,
          E,
          T,
          D,
          N
        );
        return;
      }
    }
    U & 8 ? (L & 16 && en(y, v, E), x !== y && f(g, x)) : L & 16 ? U & 16 ? Oe(
      y,
      x,
      g,
      b,
      v,
      E,
      T,
      D,
      N
    ) : en(y, v, E, !0) : (L & 8 && f(g, ""), U & 16 && re(
      x,
      g,
      b,
      v,
      E,
      T,
      D,
      N
    ));
  }, We = (c, d, g, b, v, E, T, D, N) => {
    c = c || Kt, d = d || Kt;
    const y = c.length, L = d.length, x = Math.min(y, L);
    let F;
    for (F = 0; F < x; F++) {
      const U = d[F] = N ? at(d[F]) : Le(d[F]);
      O(
        c[F],
        U,
        g,
        null,
        v,
        E,
        T,
        D,
        N
      );
    }
    y > L ? en(
      c,
      v,
      E,
      !0,
      !1,
      x
    ) : re(
      d,
      g,
      b,
      v,
      E,
      T,
      D,
      N,
      x
    );
  }, Oe = (c, d, g, b, v, E, T, D, N) => {
    let y = 0;
    const L = d.length;
    let x = c.length - 1, F = L - 1;
    for (; y <= x && y <= F; ) {
      const U = c[y], K = d[y] = N ? at(d[y]) : Le(d[y]);
      if (un(U, K))
        O(
          U,
          K,
          g,
          null,
          v,
          E,
          T,
          D,
          N
        );
      else
        break;
      y++;
    }
    for (; y <= x && y <= F; ) {
      const U = c[x], K = d[F] = N ? at(d[F]) : Le(d[F]);
      if (un(U, K))
        O(
          U,
          K,
          g,
          null,
          v,
          E,
          T,
          D,
          N
        );
      else
        break;
      x--, F--;
    }
    if (y > x) {
      if (y <= F) {
        const U = F + 1, K = U < L ? d[U].el : b;
        for (; y <= F; )
          O(
            null,
            d[y] = N ? at(d[y]) : Le(d[y]),
            g,
            K,
            v,
            E,
            T,
            D,
            N
          ), y++;
      }
    } else if (y > F)
      for (; y <= x; )
        Ne(c[y], v, E, !0), y++;
    else {
      const U = y, K = y, G = /* @__PURE__ */ new Map();
      for (y = K; y <= F; y++) {
        const Ee = d[y] = N ? at(d[y]) : Le(d[y]);
        Ee.key != null && (process.env.NODE_ENV !== "production" && G.has(Ee.key) && A(
          "Duplicate keys found during update:",
          JSON.stringify(Ee.key),
          "Make sure keys are unique."
        ), G.set(Ee.key, y));
      }
      let z, se = 0;
      const he = F - K + 1;
      let ze = !1, Ge = 0;
      const nn = new Array(he);
      for (y = 0; y < he; y++) nn[y] = 0;
      for (y = U; y <= x; y++) {
        const Ee = c[y];
        if (se >= he) {
          Ne(Ee, v, E, !0);
          continue;
        }
        let qe;
        if (Ee.key != null)
          qe = G.get(Ee.key);
        else
          for (z = K; z <= F; z++)
            if (nn[z - K] === 0 && un(Ee, d[z])) {
              qe = z;
              break;
            }
        qe === void 0 ? Ne(Ee, v, E, !0) : (nn[qe - K] = y + 1, qe >= Ge ? Ge = qe : ze = !0, O(
          Ee,
          d[qe],
          g,
          null,
          v,
          E,
          T,
          D,
          N
        ), se++);
      }
      const ss = ze ? vf(nn) : Kt;
      for (z = ss.length - 1, y = he - 1; y >= 0; y--) {
        const Ee = K + y, qe = d[Ee], is = d[Ee + 1], us = Ee + 1 < L ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          is.el || nl(is)
        ) : b;
        nn[y] === 0 ? O(
          null,
          qe,
          g,
          us,
          v,
          E,
          T,
          D,
          N
        ) : ze && (z < 0 || y !== ss[z] ? fe(qe, g, us, 2) : z--);
      }
    }
  }, fe = (c, d, g, b, v = null) => {
    const { el: E, type: T, transition: D, children: N, shapeFlag: y } = c;
    if (y & 6) {
      fe(c.component.subTree, d, g, b);
      return;
    }
    if (y & 128) {
      c.suspense.move(d, g, b);
      return;
    }
    if (y & 64) {
      T.move(c, d, g, tn);
      return;
    }
    if (T === et) {
      o(E, d, g);
      for (let x = 0; x < N.length; x++)
        fe(N[x], d, g, b);
      o(c.anchor, d, g);
      return;
    }
    if (T === Xn) {
      Z(c, d, g);
      return;
    }
    if (b !== 2 && y & 1 && D)
      if (b === 0)
        D.persisted && !E[Mo] ? o(E, d, g) : (D.beforeEnter(E), o(E, d, g), De(() => D.enter(E), v));
      else {
        const { leave: x, delayLeave: F, afterLeave: U } = D, K = () => {
          c.ctx.isUnmounted ? r(E) : o(E, d, g);
        }, G = () => {
          const z = E._isLeaving || !!E[Mo];
          E._isLeaving && E[Mo](
            !0
            /* cancelled */
          ), D.persisted && !z ? K() : x(E, () => {
            K(), U && U();
          });
        };
        F ? F(E, K, G) : G();
      }
    else
      o(E, d, g);
  }, Ne = (c, d, g, b = !1, v = !1) => {
    const {
      type: E,
      props: T,
      ref: D,
      children: N,
      dynamicChildren: y,
      shapeFlag: L,
      patchFlag: x,
      dirs: F,
      cacheIndex: U,
      memo: K
    } = c;
    if (x === -2 && (v = !1), D != null && (Pe(), gn(D, null, g, c, !0), Re()), U != null && (d.renderCache[U] = void 0), L & 256) {
      d.ctx.deactivate(c);
      return;
    }
    const G = L & 1 && F, z = !En(c);
    let se;
    if (z && (se = T && T.onVnodeBeforeUnmount) && Ye(se, d, c), L & 6)
      oc(c.component, g, b);
    else {
      if (L & 128) {
        c.suspense.unmount(g, b);
        return;
      }
      G && bt(c, null, d, "beforeUnmount"), L & 64 ? c.type.remove(
        c,
        d,
        g,
        tn,
        b
      ) : y && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !y.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== et || x > 0 && x & 64) ? en(
        y,
        d,
        g,
        !1,
        !0
      ) : (E === et && x & 384 || !v && L & 16) && en(N, d, g), b && Lt(c);
    }
    const he = K != null && U == null;
    (z && (se = T && T.onVnodeUnmounted) || G || he) && De(() => {
      se && Ye(se, d, c), G && bt(c, null, d, "unmounted"), he && (c.el = null);
    }, g);
  }, Lt = (c) => {
    const { type: d, el: g, anchor: b, transition: v } = c;
    if (d === et) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && v && !v.persisted ? c.children.forEach((T) => {
        T.type === Ue ? r(T.el) : Lt(T);
      }) : Qt(g, b);
      return;
    }
    if (d === Xn) {
      k(c);
      return;
    }
    const E = () => {
      r(g), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (c.shapeFlag & 1 && v && !v.persisted) {
      const { leave: T, delayLeave: D } = v, N = () => T(g, E);
      D ? D(c.el, E, N) : N();
    } else
      E();
  }, Qt = (c, d) => {
    let g;
    for (; c !== d; )
      g = h(c), r(c), c = g;
    r(d);
  }, oc = (c, d, g) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && sa(c);
    const { bum: b, scope: v, job: E, subTree: T, um: D, m: N, a: y } = c;
    xs(N), xs(y), b && on(b), v.stop(), E && (E.flags |= 8, Ne(T, c, d, g)), D && De(D, d), De(() => {
      c.isUnmounted = !0;
    }, d), process.env.NODE_ENV !== "production" && da(c);
  }, en = (c, d, g, b = !1, v = !1, E = 0) => {
    for (let T = E; T < c.length; T++)
      Ne(c[T], d, g, b, v);
  }, Un = (c) => {
    if (c.shapeFlag & 6)
      return Un(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = h(c.anchor || c.el), g = d && d[ba];
    return g ? h(g) : d;
  };
  let Io = !1;
  const rs = (c, d, g) => {
    let b;
    c == null ? d._vnode && (Ne(d._vnode, null, null, !0), b = d._vnode.component) : O(
      d._vnode || null,
      c,
      d,
      null,
      null,
      null,
      g
    ), d._vnode = c, Io || (Io = !0, ps(b), wu(), Io = !1);
  }, tn = {
    p: O,
    um: Ne,
    m: fe,
    r: Lt,
    mt: ke,
    mc: re,
    pc: ne,
    pbc: Ie,
    n: Un,
    o: e
  };
  return {
    render: rs,
    hydrate: void 0,
    createApp: Ga(rs)
  };
}
function Bo({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ot({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function mf(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Jn(e, t, n = !1) {
  const o = e.children, r = t.children;
  if ($(o) && $(r))
    for (let s = 0; s < o.length; s++) {
      const i = o[s];
      let u = r[s];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = r[s] = at(r[s]), u.el = i.el), !n && u.patchFlag !== -2 && Jn(i, u)), u.type === Fn && (u.patchFlag === -1 && (u = r[s] = at(u)), u.el = i.el), u.type === Ue && !u.el && (u.el = i.el), process.env.NODE_ENV !== "production" && u.el && (u.el.__vnode = u);
    }
}
function vf(e) {
  const t = e.slice(), n = [0];
  let o, r, s, i, u;
  const l = e.length;
  for (o = 0; o < l; o++) {
    const p = e[o];
    if (p !== 0) {
      if (r = n[n.length - 1], e[r] < p) {
        t[o] = r, n.push(o);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        u = s + i >> 1, e[n[u]] < p ? s = u + 1 : i = u;
      p < e[n[s]] && (s > 0 && (t[o] = n[s - 1]), n[s] = o);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function tl(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : tl(t);
}
function xs(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function nl(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? nl(t.subTree) : null;
}
const ol = (e) => e.__isSuspense;
function yf(e, t) {
  t && t.pendingBranch ? $(e) ? t.effects.push(...e) : t.effects.push(e) : Cu(e);
}
const et = /* @__PURE__ */ Symbol.for("v-fgt"), Fn = /* @__PURE__ */ Symbol.for("v-txt"), Ue = /* @__PURE__ */ Symbol.for("v-cmt"), Xn = /* @__PURE__ */ Symbol.for("v-stc"), mn = [];
let Ve = null;
function bf(e = !1) {
  mn.push(Ve = e ? null : []);
}
function Of() {
  mn.pop(), Ve = mn[mn.length - 1] || null;
}
let Sn = 1;
function Vs(e, t = !1) {
  Sn += e, e < 0 && Ve && t && (Ve.hasOnce = !0);
}
function Nf(e) {
  return e.dynamicChildren = Sn > 0 ? Ve || Kt : null, Of(), Sn > 0 && Ve && Ve.push(e), e;
}
function Df(e, t, n, o, r, s) {
  return Nf(
    Ze(
      e,
      t,
      n,
      o,
      r,
      s,
      !0
    )
  );
}
function wo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function un(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = qn.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
const Sf = (...e) => sl(
  ...e
), rl = ({ key: e }) => e ?? null, Zn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ee(e) || /* @__PURE__ */ ie(e) || M(e) ? { i: xe, r: e, k: t, f: !!n } : e : null);
function Ze(e, t = null, n = null, o = 0, r = null, s = e === et ? 0 : 1, i = !1, u = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && rl(t),
    ref: t && Zn(t),
    scopeId: Pu,
    slotScopeIds: null,
    children: n,
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
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return u ? (go(l, n), s & 128 && e.normalize(l)) : n && (l.shapeFlag |= ee(n) ? 8 : 16), process.env.NODE_ENV !== "production" && l.key !== l.key && A("VNode created with invalid key (NaN). VNode type:", l.type), Sn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ve && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && Ve.push(l), l;
}
const Pt = process.env.NODE_ENV !== "production" ? Sf : sl;
function sl(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === Fa) && (process.env.NODE_ENV !== "production" && !e && A(`Invalid vnode type when creating vnode: ${e}.`), e = Ue), wo(e)) {
    const u = vt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && go(u, n), Sn > 0 && !s && Ve && (u.shapeFlag & 6 ? Ve[Ve.indexOf(e)] = u : Ve.push(u)), u.patchFlag = -2, u;
  }
  if (al(e) && (e = e.__vccOpts), t) {
    t = Af(t);
    let { class: u, style: l } = t;
    u && !ee(u) && (t.class = Dr(u)), W(l) && (/* @__PURE__ */ io(l) && !$(l) && (l = oe({}, l)), t.style = Nr(l));
  }
  const i = ee(e) ? 1 : ol(e) ? 128 : Oa(e) ? 64 : W(e) ? 4 : M(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && /* @__PURE__ */ io(e) && (e = /* @__PURE__ */ B(e), A(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ze(
    e,
    t,
    n,
    o,
    r,
    i,
    s,
    !0
  );
}
function Af(e) {
  return e ? /* @__PURE__ */ io(e) || Yu(e) ? oe({}, e) : e : null;
}
function vt(e, t, n = !1, o = !1) {
  const { props: r, ref: s, patchFlag: i, children: u, transition: l } = e, p = t ? wf(r || {}, t) : r, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && rl(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? $(s) ? s.concat(Zn(t)) : [s, Zn(t)] : Zn(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && $(u) ? u.map(il) : u,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== et ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: l,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && vt(e.ssContent),
    ssFallback: e.ssFallback && vt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return l && o && Lr(
    f,
    l.clone(f)
  ), f;
}
function il(e) {
  const t = vt(e);
  return $(e.children) && (t.children = e.children.map(il)), t;
}
function Cf(e = " ", t = 0) {
  return Pt(Fn, null, e, t);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? Pt(Ue) : $(e) ? Pt(
    et,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : wo(e) ? at(e) : Pt(Fn, null, String(e));
}
function at(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : vt(e);
}
function go(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if ($(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), go(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Yu(t) ? t._ctx = xe : r === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (M(t)) {
    if (o & 65) {
      go(e, { default: t });
      return;
    }
    t = { default: t, _ctx: xe }, n = 32;
  } else
    t = String(t), o & 64 ? (n = 16, t = [Cf(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function wf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = Dr([t.class, o.class]));
      else if (r === "style")
        t.style = Nr([t.style, o.style]);
      else if (Vn(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !($(s) && s.includes(i)) ? t[r] = s ? [].concat(s, i) : i : i == null && s == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !yn(r) && (t[r] = i);
      } else r !== "" && (t[r] = o[r]);
  }
  return t;
}
function Ye(e, t, n, o = null) {
  He(e, t, 7, [
    n,
    o
  ]);
}
const Tf = Hu();
let xf = 0;
function Vf(e, t, n) {
  const o = e.type, r = (t ? t.appContext : e.appContext) || Tf, s = {
    uid: xf++,
    vnode: e,
    type: o,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new iu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Xu(o, r),
    emitsOptions: Ku(o, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Y,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: Y,
    data: Y,
    props: Y,
    attrs: Y,
    slots: Y,
    refs: Y,
    setupState: Y,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
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
  return process.env.NODE_ENV !== "production" ? s.ctx = La(s) : s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Ya.bind(null, s), e.ce && e.ce(s), s;
}
let ue = null;
const Hr = () => ue || xe;
let Eo, sr;
{
  const e = Pn(), t = (n, o) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(o), (s) => {
      r.length > 1 ? r.forEach((i) => i(s)) : r[0](s);
    };
  };
  Eo = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ue = n
  ), sr = t(
    "__VUE_SSR_SETTERS__",
    (n) => An = n
  );
}
const Ln = (e) => {
  const t = ue;
  return Eo(e), e.scope.on(), () => {
    e.scope.off(), Eo(t);
  };
}, Is = () => {
  ue && ue.scope.off(), Eo(null);
}, If = /* @__PURE__ */ pt("slot,component");
function ir(e, { isNativeTag: t }) {
  (If(e) || t(e)) && A(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function ul(e) {
  return e.vnode.shapeFlag & 4;
}
let An = !1;
function Pf(e, t = !1, n = !1) {
  t && sr(t);
  const { props: o, children: r } = e.vnode, s = ul(e);
  tf(e, o, s, t), pf(e, r, n || t);
  const i = s ? Rf(e, t) : void 0;
  return t && sr(!1), i;
}
function Rf(e, t) {
  const n = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (n.name && ir(n.name, e.appContext.config), n.components) {
      const r = Object.keys(n.components);
      for (let s = 0; s < r.length; s++)
        ir(r[s], e.appContext.config);
    }
    if (n.directives) {
      const r = Object.keys(n.directives);
      for (let s = 0; s < r.length; s++)
        Ru(r[s]);
    }
    n.compilerOptions && kf() && A(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Uu), process.env.NODE_ENV !== "production" && $a(e);
  const { setup: o } = n;
  if (o) {
    Pe();
    const r = e.setupContext = o.length > 1 ? Lf(e) : null, s = Ln(e), i = Jt(
      o,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? /* @__PURE__ */ ot(e.props) : e.props,
        r
      ]
    ), u = yr(i);
    if (Re(), s(), (u || e.sp) && !En(e) && Lu(e), u) {
      if (i.then(Is, Is), t)
        return i.then((l) => {
          Ps(e, l, t);
        }).catch((l) => {
          Rn(l, e, 0);
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const l = $n(e, n);
        A(
          `Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      Ps(e, i, t);
  } else
    ll(e, t);
}
function Ps(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : W(t) ? (process.env.NODE_ENV !== "production" && wo(t) && A(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = Nu(t), process.env.NODE_ENV !== "production" && Ma(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && A(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), ll(e, n);
}
const kf = () => !0;
function ll(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || ce);
  {
    const r = Ln(e);
    Pe();
    try {
      Ba(e);
    } finally {
      Re(), r();
    }
  }
  process.env.NODE_ENV !== "production" && !o.render && e.render === ce && !t && (o.template ? A(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : A("Component is missing template or render function: ", o));
}
const Rs = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return ho(), le(e, "get", ""), e[t];
  },
  set() {
    return A("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return A("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return le(e, "get", ""), e[t];
  }
};
function Ff(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return le(e, "get", "$slots"), t[n];
    }
  });
}
function Lf(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && A("expose() should be called only once per setup()."), n != null)) {
      let o = typeof n;
      o === "object" && ($(n) ? o = "array" : /* @__PURE__ */ ie(n) && (o = "ref")), o !== "object" && A(
        `expose() should be passed a plain object, received ${o}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, o;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, Rs));
      },
      get slots() {
        return o || (o = Ff(e));
      },
      get emit() {
        return (r, ...s) => e.emit(r, ...s);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, Rs),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Kr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Nu(Ir(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Vt)
        return Vt[n](e);
    },
    has(t, n) {
      return n in t || n in Vt;
    }
  })) : e.proxy;
}
const $f = /(?:^|[-_])\w/g, Mf = (e) => e.replace($f, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function cl(e, t = !0) {
  return M(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function $n(e, t, n = !1) {
  let o = cl(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(e.components) || e.parent && r(
      e.parent.type.components
    ) || r(e.appContext.components);
  }
  return o ? Mf(o) : n ? "App" : "Anonymous";
}
function al(e) {
  return M(e) && "__vccOpts" in e;
}
const Uf = (e, t) => {
  const n = /* @__PURE__ */ Gc(e, t, An);
  if (process.env.NODE_ENV !== "production") {
    const o = Hr();
    o && o.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Bf() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, o = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!W(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (/* @__PURE__ */ ie(a)) {
        Pe();
        const h = a.value;
        return Re(), [
          "div",
          {},
          ["span", e, f(a)],
          "<",
          u(h),
          ">"
        ];
      } else {
        if (/* @__PURE__ */ Tt(a))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ Ae(a) ? "ShallowReactive" : "Reactive"],
            "<",
            u(a),
            `>${/* @__PURE__ */ rt(a) ? " (readonly)" : ""}`
          ];
        if (/* @__PURE__ */ rt(a))
          return [
            "div",
            {},
            ["span", e, /* @__PURE__ */ Ae(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            u(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...s(a.$)
        ];
    }
  };
  function s(a) {
    const h = [];
    a.type.props && a.props && h.push(i("props", /* @__PURE__ */ B(a.props))), a.setupState !== Y && h.push(i("setup", a.setupState)), a.data !== Y && h.push(i("data", /* @__PURE__ */ B(a.data)));
    const _ = l(a, "computed");
    _ && h.push(i("computed", _));
    const m = l(a, "inject");
    return m && h.push(i("injected", m)), h.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), h;
  }
  function i(a, h) {
    return h = oe({}, h), Object.keys(h).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(h).map((_) => [
          "div",
          {},
          ["span", o, _ + ": "],
          u(h[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function u(a, h = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", o, a] : W(a) ? ["object", { object: h ? /* @__PURE__ */ B(a) : a }] : ["span", n, String(a)];
  }
  function l(a, h) {
    const _ = a.type;
    if (M(_))
      return;
    const m = {};
    for (const O in a.ctx)
      p(_, O, h) && (m[O] = a.ctx[O]);
    return m;
  }
  function p(a, h, _) {
    const m = a[_];
    if ($(m) && m.includes(h) || W(m) && h in m || a.extends && p(a.extends, h, _) || a.mixins && a.mixins.some((O) => p(O, h, _)))
      return !0;
  }
  function f(a) {
    return /* @__PURE__ */ Ae(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
const ks = "3.5.39", ft = process.env.NODE_ENV !== "production" ? A : ce;
process.env.NODE_ENV;
process.env.NODE_ENV;
let ur;
const Fs = typeof window < "u" && window.trustedTypes;
if (Fs)
  try {
    ur = /* @__PURE__ */ Fs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && ft(`Error creating trusted types policy: ${e}`);
  }
const fl = ur ? (e) => ur.createHTML(e) : (e) => e, jf = "http://www.w3.org/2000/svg", Hf = "http://www.w3.org/1998/Math/MathML", lt = typeof document < "u" ? document : null, Ls = lt && /* @__PURE__ */ lt.createElement("template"), Kf = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const r = t === "svg" ? lt.createElementNS(jf, e) : t === "mathml" ? lt.createElementNS(Hf, e) : n ? lt.createElement(e, { is: n }) : lt.createElement(e);
    return e === "select" && o && o.multiple != null && r.setAttribute("multiple", o.multiple), r;
  },
  createText: (e) => lt.createTextNode(e),
  createComment: (e) => lt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => lt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, r, s) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === s || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === s || !(r = r.nextSibling)); )
        ;
    else {
      Ls.innerHTML = fl(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const u = Ls.content;
      if (o === "svg" || o === "mathml") {
        const l = u.firstChild;
        for (; l.firstChild; )
          u.appendChild(l.firstChild);
        u.removeChild(l);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Wf = /* @__PURE__ */ Symbol("_vtc");
function zf(e, t, n) {
  const o = e[Wf];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const $s = /* @__PURE__ */ Symbol("_vod"), Gf = /* @__PURE__ */ Symbol("_vsh"), qf = /* @__PURE__ */ Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : ""), Yf = /(?:^|;)\s*display\s*:/;
function Jf(e, t, n) {
  const o = e.style, r = ee(n);
  let s = !1;
  if (n && !r) {
    if (t)
      if (ee(t))
        for (const i of t.split(";")) {
          const u = i.slice(0, i.indexOf(":")).trim();
          n[u] == null && an(o, u, "");
        }
      else
        for (const i in t)
          n[i] == null && an(o, i, "");
    for (const i in n) {
      i === "display" && (s = !0);
      const u = n[i];
      u != null ? Qf(
        e,
        i,
        !ee(t) && t ? t[i] : void 0,
        u
      ) || an(o, i, u) : an(o, i, "");
    }
  } else if (r) {
    if (t !== n) {
      const i = o[qf];
      i && (n += ";" + i), o.cssText = n, s = Yf.test(n);
    }
  } else t && e.removeAttribute("style");
  $s in e && (e[$s] = s ? o.display : "", e[Gf] && (o.display = "none"));
}
const Xf = /[^\\];\s*$/, Ms = /\s*!important$/;
function an(e, t, n) {
  if ($(n))
    n.forEach((o) => an(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && Xf.test(n) && ft(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Zf(e, t);
    Ms.test(n) ? e.setProperty(
      mt(o),
      n.replace(Ms, ""),
      "important"
    ) : e[o] = n;
  }
}
const Us = ["Webkit", "Moz", "ms"], jo = {};
function Zf(e, t) {
  const n = jo[t];
  if (n)
    return n;
  let o = Se(t);
  if (o !== "filter" && o in e)
    return jo[t] = o;
  o = Oo(o);
  for (let r = 0; r < Us.length; r++) {
    const s = Us[r] + o;
    if (s in e)
      return jo[t] = s;
  }
  return t;
}
function Qf(e, t, n, o) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ee(o) && n === o;
}
const Bs = "http://www.w3.org/1999/xlink";
function js(e, t, n, o, r, s = yc(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Bs, t.slice(6, t.length)) : e.setAttributeNS(Bs, t, n) : n == null || s && !ou(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    s ? "" : Be(n) ? String(n) : n
  );
}
function Hs(e, t, n, o, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? fl(n) : n);
    return;
  }
  const s = e.tagName;
  if (t === "value" && s !== "PROGRESS" && // custom elements may use _value internally
  !s.includes("-")) {
    const u = s === "OPTION" ? e.getAttribute("value") || "" : e.value, l = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (u !== l || !("_value" in e)) && (e.value = l), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const u = typeof e[t];
    u === "boolean" ? n = ou(n) : n == null && u === "string" ? (n = "", i = !0) : u === "number" && (n = 0, i = !0);
  }
  try {
    e[t] = n;
  } catch (u) {
    process.env.NODE_ENV !== "production" && !i && ft(
      `Failed setting prop "${t}" on <${s.toLowerCase()}>: value ${n} is invalid.`,
      u
    );
  }
  i && e.removeAttribute(r || t);
}
function ed(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function td(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const Ks = /* @__PURE__ */ Symbol("_vei");
function nd(e, t, n, o, r = null) {
  const s = e[Ks] || (e[Ks] = {}), i = s[t];
  if (o && i)
    i.value = process.env.NODE_ENV !== "production" ? Ws(o, t) : o;
  else {
    const [u, l] = sd(t);
    if (o) {
      const p = s[t] = ld(
        process.env.NODE_ENV !== "production" ? Ws(o, t) : o,
        r
      );
      ed(e, u, p, l);
    } else i && (td(e, u, i, l), s[t] = void 0);
  }
}
const od = /(Once|Passive|Capture)$/, rd = /^on:?(?:Once|Passive|Capture)$/;
function sd(e) {
  let t, n;
  for (; (n = e.match(od)) && !rd.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : mt(e.slice(2)), t];
}
let Ho = 0;
const id = /* @__PURE__ */ Promise.resolve(), ud = () => Ho || (id.then(() => Ho = 0), Ho = Date.now());
function ld(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    const r = n.value;
    if ($(r)) {
      const s = o.stopImmediatePropagation;
      o.stopImmediatePropagation = () => {
        s.call(o), o._stopped = !0;
      };
      const i = r.slice(), u = [o];
      for (let l = 0; l < i.length && !o._stopped; l++) {
        const p = i[l];
        p && He(
          p,
          t,
          5,
          u
        );
      }
    } else
      He(
        r,
        t,
        5,
        [o]
      );
  };
  return n.value = e, n.attached = ud(), n;
}
function Ws(e, t) {
  return M(e) || $(e) ? e : (ft(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), ce);
}
const zs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, cd = (e, t, n, o, r, s) => {
  const i = r === "svg";
  t === "class" ? zf(e, o, i) : t === "style" ? Jf(e, n, o) : Vn(t) ? yn(t) || nd(e, t, n, o, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ad(e, t, o, i)) ? (Hs(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && js(e, t, o, i, s, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (fd(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ee(o))) ? Hs(e, Se(t), o, s, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), js(e, t, o, i));
};
function ad(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && zs(t) && M(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return zs(t) && ee(n) ? !1 : t in e;
}
function fd(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const o = Se(t);
  return Array.isArray(n) ? n.some((r) => Se(r) === o) : Object.keys(n).some((r) => Se(r) === o);
}
const dd = /* @__PURE__ */ oe({ patchProp: cd }, Kf);
let Gs;
function pd() {
  return Gs || (Gs = gf(dd));
}
const hd = ((...e) => {
  const t = pd().createApp(...e);
  process.env.NODE_ENV !== "production" && (gd(t), Ed(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const r = md(o);
    if (!r) return;
    const s = t._component;
    !M(s) && !s.render && !s.template && (s.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = n(r, !1, _d(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function _d(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function gd(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => gc(t) || Ec(t) || mc(t),
    writable: !1
  });
}
function Ed(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ft(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ft(o), n;
      },
      set() {
        ft(o);
      }
    });
  }
}
function md(e) {
  if (ee(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && ft(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ft(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
function vd() {
  Bf();
}
process.env.NODE_ENV !== "production" && vd();
var yd = Object.create, dl = Object.defineProperty, bd = Object.getOwnPropertyDescriptor, Wr = Object.getOwnPropertyNames, Od = Object.getPrototypeOf, Nd = Object.prototype.hasOwnProperty, Dd = (e, t) => function() {
  return e && (t = (0, e[Wr(e)[0]])(e = 0)), t;
}, Sd = (e, t) => function() {
  return t || (0, e[Wr(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Ad = (e, t, n, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of Wr(t))
      !Nd.call(e, r) && r !== n && dl(e, r, { get: () => t[r], enumerable: !(o = bd(t, r)) || o.enumerable });
  return e;
}, Cd = (e, t, n) => (n = e != null ? yd(Od(e)) : {}, Ad(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  dl(n, "default", { value: e, enumerable: !0 }),
  e
)), Mn = Dd({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), wd = Sd({
  "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(e, t) {
    Mn(), t.exports = o;
    function n(s) {
      return s instanceof Buffer ? Buffer.from(s) : new s.constructor(s.buffer.slice(), s.byteOffset, s.length);
    }
    function o(s) {
      if (s = s || {}, s.circles) return r(s);
      const i = /* @__PURE__ */ new Map();
      if (i.set(Date, (a) => new Date(a)), i.set(Map, (a, h) => new Map(l(Array.from(a), h))), i.set(Set, (a, h) => new Set(l(Array.from(a), h))), s.constructorHandlers)
        for (const a of s.constructorHandlers)
          i.set(a[0], a[1]);
      let u = null;
      return s.proto ? f : p;
      function l(a, h) {
        const _ = Object.keys(a), m = new Array(_.length);
        for (let O = 0; O < _.length; O++) {
          const C = _[O], S = a[C];
          typeof S != "object" || S === null ? m[C] = S : S.constructor !== Object && (u = i.get(S.constructor)) ? m[C] = u(S, h) : ArrayBuffer.isView(S) ? m[C] = n(S) : m[C] = h(S);
        }
        return m;
      }
      function p(a) {
        if (typeof a != "object" || a === null) return a;
        if (Array.isArray(a)) return l(a, p);
        if (a.constructor !== Object && (u = i.get(a.constructor)))
          return u(a, p);
        const h = {};
        for (const _ in a) {
          if (Object.hasOwnProperty.call(a, _) === !1) continue;
          const m = a[_];
          typeof m != "object" || m === null ? h[_] = m : m.constructor !== Object && (u = i.get(m.constructor)) ? h[_] = u(m, p) : ArrayBuffer.isView(m) ? h[_] = n(m) : h[_] = p(m);
        }
        return h;
      }
      function f(a) {
        if (typeof a != "object" || a === null) return a;
        if (Array.isArray(a)) return l(a, f);
        if (a.constructor !== Object && (u = i.get(a.constructor)))
          return u(a, f);
        const h = {};
        for (const _ in a) {
          const m = a[_];
          typeof m != "object" || m === null ? h[_] = m : m.constructor !== Object && (u = i.get(m.constructor)) ? h[_] = u(m, f) : ArrayBuffer.isView(m) ? h[_] = n(m) : h[_] = f(m);
        }
        return h;
      }
    }
    function r(s) {
      const i = [], u = [], l = /* @__PURE__ */ new Map();
      if (l.set(Date, (_) => new Date(_)), l.set(Map, (_, m) => new Map(f(Array.from(_), m))), l.set(Set, (_, m) => new Set(f(Array.from(_), m))), s.constructorHandlers)
        for (const _ of s.constructorHandlers)
          l.set(_[0], _[1]);
      let p = null;
      return s.proto ? h : a;
      function f(_, m) {
        const O = Object.keys(_), C = new Array(O.length);
        for (let S = 0; S < O.length; S++) {
          const R = O[S], P = _[R];
          if (typeof P != "object" || P === null)
            C[R] = P;
          else if (P.constructor !== Object && (p = l.get(P.constructor)))
            C[R] = p(P, m);
          else if (ArrayBuffer.isView(P))
            C[R] = n(P);
          else {
            const Z = i.indexOf(P);
            Z !== -1 ? C[R] = u[Z] : C[R] = m(P);
          }
        }
        return C;
      }
      function a(_) {
        if (typeof _ != "object" || _ === null) return _;
        if (Array.isArray(_)) return f(_, a);
        if (_.constructor !== Object && (p = l.get(_.constructor)))
          return p(_, a);
        const m = {};
        i.push(_), u.push(m);
        for (const O in _) {
          if (Object.hasOwnProperty.call(_, O) === !1) continue;
          const C = _[O];
          if (typeof C != "object" || C === null)
            m[O] = C;
          else if (C.constructor !== Object && (p = l.get(C.constructor)))
            m[O] = p(C, a);
          else if (ArrayBuffer.isView(C))
            m[O] = n(C);
          else {
            const S = i.indexOf(C);
            S !== -1 ? m[O] = u[S] : m[O] = a(C);
          }
        }
        return i.pop(), u.pop(), m;
      }
      function h(_) {
        if (typeof _ != "object" || _ === null) return _;
        if (Array.isArray(_)) return f(_, h);
        if (_.constructor !== Object && (p = l.get(_.constructor)))
          return p(_, h);
        const m = {};
        i.push(_), u.push(m);
        for (const O in _) {
          const C = _[O];
          if (typeof C != "object" || C === null)
            m[O] = C;
          else if (C.constructor !== Object && (p = l.get(C.constructor)))
            m[O] = p(C, h);
          else if (ArrayBuffer.isView(C))
            m[O] = n(C);
          else {
            const S = i.indexOf(C);
            S !== -1 ? m[O] = u[S] : m[O] = h(C);
          }
        }
        return i.pop(), u.pop(), m;
      }
    }
  }
});
Mn();
Mn();
Mn();
var pl = typeof navigator < "u", I = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : {};
typeof I.chrome < "u" && I.chrome.devtools;
pl && (I.self, I.top);
var qs;
typeof navigator < "u" && ((qs = navigator.userAgent) == null || qs.toLowerCase().includes("electron"));
Mn();
var Td = Cd(wd()), xd = /(?:^|[-_/])(\w)/g;
function Vd(e, t) {
  return t ? t.toUpperCase() : "";
}
function Id(e) {
  return e && `${e}`.replace(xd, Vd);
}
function Pd(e, t) {
  let n = e.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
  n.endsWith(`index${t}`) && (n = n.replace(`/index${t}`, t));
  const o = n.lastIndexOf("/"), r = n.substring(o + 1);
  {
    const s = r.lastIndexOf(t);
    return r.substring(0, s);
  }
}
var Ys = (0, Td.default)({ circles: !0 });
const Rd = {
  trailing: !0
};
function Gt(e, t = 25, n = {}) {
  if (n = { ...Rd, ...n }, !Number.isFinite(t))
    throw new TypeError("Expected `wait` to be a finite number");
  let o, r, s = [], i, u;
  const l = (p, f) => (i = kd(e, p, f), i.finally(() => {
    if (i = null, n.trailing && u && !r) {
      const a = l(p, u);
      return u = null, a;
    }
  }), i);
  return function(...p) {
    return i ? (n.trailing && (u = p), i) : new Promise((f) => {
      const a = !r && n.leading;
      clearTimeout(r), r = setTimeout(() => {
        r = null;
        const h = n.leading ? o : l(this, p);
        for (const _ of s)
          _(h);
        s = [];
      }, t), a ? (o = l(this, p), f(o)) : s.push(f);
    });
  };
}
async function kd(e, t, n) {
  return await e.apply(t, n);
}
function lr(e, t = {}, n) {
  for (const o in e) {
    const r = e[o], s = n ? `${n}:${o}` : o;
    typeof r == "object" && r !== null ? lr(r, t, s) : typeof r == "function" && (t[s] = r);
  }
  return t;
}
const Fd = { run: (e) => e() }, Ld = () => Fd, hl = typeof console.createTask < "u" ? console.createTask : Ld;
function $d(e, t) {
  const n = t.shift(), o = hl(n);
  return e.reduce(
    (r, s) => r.then(() => o.run(() => s(...t))),
    Promise.resolve()
  );
}
function Md(e, t) {
  const n = t.shift(), o = hl(n);
  return Promise.all(e.map((r) => o.run(() => r(...t))));
}
function Ko(e, t) {
  for (const n of [...e])
    n(t);
}
class Ud {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(t, n, o = {}) {
    if (!t || typeof n != "function")
      return () => {
      };
    const r = t;
    let s;
    for (; this._deprecatedHooks[t]; )
      s = this._deprecatedHooks[t], t = s.to;
    if (s && !o.allowDeprecated) {
      let i = s.message;
      i || (i = `${r} hook has been deprecated` + (s.to ? `, please use ${s.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(i) || (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, "name", {
          get: () => "_" + t.replace(/\W+/g, "_") + "_hook_cb",
          configurable: !0
        });
      } catch {
      }
    return this._hooks[t] = this._hooks[t] || [], this._hooks[t].push(n), () => {
      n && (this.removeHook(t, n), n = void 0);
    };
  }
  hookOnce(t, n) {
    let o, r = (...s) => (typeof o == "function" && o(), o = void 0, r = void 0, n(...s));
    return o = this.hook(t, r), o;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const o = this._hooks[t].indexOf(n);
      o !== -1 && this._hooks[t].splice(o, 1), this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == "string" ? { to: n } : n;
    const o = this._hooks[t] || [];
    delete this._hooks[t];
    for (const r of o)
      this.hook(t, r);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t)
      this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = lr(t), o = Object.keys(n).map(
      (r) => this.hook(r, n[r])
    );
    return () => {
      for (const r of o.splice(0, o.length))
        r();
    };
  }
  removeHooks(t) {
    const n = lr(t);
    for (const o in n)
      this.removeHook(o, n[o]);
  }
  removeAllHooks() {
    for (const t in this._hooks)
      delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith($d, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(Md, t, ...n);
  }
  callHookWith(t, n, ...o) {
    const r = this._before || this._after ? { name: n, args: o, context: {} } : void 0;
    this._before && Ko(this._before, r);
    const s = t(
      n in this._hooks ? [...this._hooks[n]] : [],
      o
    );
    return s instanceof Promise ? s.finally(() => {
      this._after && r && Ko(this._after, r);
    }) : (this._after && r && Ko(this._after, r), s);
  }
  beforeEach(t) {
    return this._before = this._before || [], this._before.push(t), () => {
      if (this._before !== void 0) {
        const n = this._before.indexOf(t);
        n !== -1 && this._before.splice(n, 1);
      }
    };
  }
  afterEach(t) {
    return this._after = this._after || [], this._after.push(t), () => {
      if (this._after !== void 0) {
        const n = this._after.indexOf(t);
        n !== -1 && this._after.splice(n, 1);
      }
    };
  }
}
function _l() {
  return new Ud();
}
var Bd = Object.create, gl = Object.defineProperty, jd = Object.getOwnPropertyDescriptor, zr = Object.getOwnPropertyNames, Hd = Object.getPrototypeOf, Kd = Object.prototype.hasOwnProperty, Wd = (e, t) => function() {
  return e && (t = (0, e[zr(e)[0]])(e = 0)), t;
}, El = (e, t) => function() {
  return t || (0, e[zr(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, zd = (e, t, n, o) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let r of zr(t))
      !Kd.call(e, r) && r !== n && gl(e, r, { get: () => t[r], enumerable: !(o = jd(t, r)) || o.enumerable });
  return e;
}, Gd = (e, t, n) => (n = e != null ? Bd(Hd(e)) : {}, zd(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  gl(n, "default", { value: e, enumerable: !0 }),
  e
)), w = Wd({
  "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {
  }
}), qd = El({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(e, t) {
    w(), (function(n) {
      var o = {
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
      }, r = [
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
      }, i = {
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
      }, u = {
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
      }, l = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join(""), p = [";", "?", ":", "@", "&", "=", "+", "$", ","].join(""), f = [".", "!", "~", "*", "'", "(", ")"].join(""), a = function(C, S) {
        var R = "-", P = "", Z = "", k = !0, J = {}, pe, te, re, Ce, Ie, be, Ke, st, ke, Q, V, j, ne, We, Oe = "";
        if (typeof C != "string")
          return "";
        if (typeof S == "string" && (R = S), Ke = u.en, st = i.en, typeof S == "object") {
          pe = S.maintainCase || !1, J = S.custom && typeof S.custom == "object" ? S.custom : J, re = +S.truncate > 1 && S.truncate || !1, Ce = S.uric || !1, Ie = S.uricNoSlash || !1, be = S.mark || !1, k = !(S.symbols === !1 || S.lang === !1), R = S.separator || R, Ce && (Oe += l), Ie && (Oe += p), be && (Oe += f), Ke = S.lang && u[S.lang] && k ? u[S.lang] : k ? u.en : {}, st = S.lang && i[S.lang] ? i[S.lang] : S.lang === !1 || S.lang === !0 ? {} : i.en, S.titleCase && typeof S.titleCase.length == "number" && Array.prototype.toString.call(S.titleCase) ? (S.titleCase.forEach(function(fe) {
            J[fe + ""] = fe + "";
          }), te = !0) : te = !!S.titleCase, S.custom && typeof S.custom.length == "number" && Array.prototype.toString.call(S.custom) && S.custom.forEach(function(fe) {
            J[fe + ""] = fe + "";
          }), Object.keys(J).forEach(function(fe) {
            var Ne;
            fe.length > 1 ? Ne = new RegExp("\\b" + _(fe) + "\\b", "gi") : Ne = new RegExp(_(fe), "gi"), C = C.replace(Ne, J[fe]);
          });
          for (V in J)
            Oe += V;
        }
        for (Oe += R, Oe = _(Oe), C = C.replace(/(^\s+|\s+$)/g, ""), ne = !1, We = !1, Q = 0, j = C.length; Q < j; Q++)
          V = C[Q], m(V, J) ? ne = !1 : st[V] ? (V = ne && st[V].match(/[A-Za-z0-9]/) ? " " + st[V] : st[V], ne = !1) : V in o ? (Q + 1 < j && r.indexOf(C[Q + 1]) >= 0 ? (Z += V, V = "") : We === !0 ? (V = s[Z] + o[V], Z = "") : V = ne && o[V].match(/[A-Za-z0-9]/) ? " " + o[V] : o[V], ne = !1, We = !1) : V in s ? (Z += V, V = "", Q === j - 1 && (V = s[Z]), We = !0) : /* process symbol chars */ Ke[V] && !(Ce && l.indexOf(V) !== -1) && !(Ie && p.indexOf(V) !== -1) ? (V = ne || P.substr(-1).match(/[A-Za-z0-9]/) ? R + Ke[V] : Ke[V], V += C[Q + 1] !== void 0 && C[Q + 1].match(/[A-Za-z0-9]/) ? R : "", ne = !0) : (We === !0 ? (V = s[Z] + V, Z = "", We = !1) : ne && (/[A-Za-z0-9]/.test(V) || P.substr(-1).match(/A-Za-z0-9]/)) && (V = " " + V), ne = !1), P += V.replace(new RegExp("[^\\w\\s" + Oe + "_-]", "g"), R);
        return te && (P = P.replace(/(\w)(\S*)/g, function(fe, Ne, Lt) {
          var Qt = Ne.toUpperCase() + (Lt !== null ? Lt : "");
          return Object.keys(J).indexOf(Qt.toLowerCase()) < 0 ? Qt : Qt.toLowerCase();
        })), P = P.replace(/\s+/g, R).replace(new RegExp("\\" + R + "+", "g"), R).replace(new RegExp("(^\\" + R + "+|\\" + R + "+$)", "g"), ""), re && P.length > re && (ke = P.charAt(re) === R, P = P.slice(0, re), ke || (P = P.slice(0, P.lastIndexOf(R)))), !pe && !te && (P = P.toLowerCase()), P;
      }, h = function(C) {
        return function(R) {
          return a(R, C);
        };
      }, _ = function(C) {
        return C.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
      }, m = function(O, C) {
        for (var S in C)
          if (C[S] === O)
            return !0;
      };
      if (typeof t < "u" && t.exports)
        t.exports = a, t.exports.createSlug = h;
      else if (typeof define < "u" && define.amd)
        define([], function() {
          return a;
        });
      else
        try {
          if (n.getSlug || n.createSlug)
            throw "speakingurl: globals exists /(getSlug|createSlug)/";
          n.getSlug = a, n.createSlug = h;
        } catch {
        }
    })(e);
  }
}), Yd = El({
  "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(e, t) {
    w(), t.exports = qd();
  }
});
w();
w();
w();
w();
w();
w();
w();
w();
function Jd(e) {
  var t;
  const n = e.name || e._componentTag || e.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || e.__name;
  return n === "index" && ((t = e.__file) != null && t.endsWith("index.vue")) ? "" : n;
}
function Xd(e) {
  const t = e.__file;
  if (t)
    return Id(Pd(t, ".vue"));
}
function Js(e, t) {
  return e.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = t, t;
}
function Gr(e) {
  if (e.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
    return e.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  if (e.root)
    return e.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function ml(e) {
  var t, n;
  const o = (t = e.subTree) == null ? void 0 : t.type, r = Gr(e);
  return r ? ((n = r?.types) == null ? void 0 : n.Fragment) === o : !1;
}
function To(e) {
  var t, n, o;
  const r = Jd(e?.type || {});
  if (r)
    return r;
  if (e?.root === e)
    return "Root";
  for (const i in (n = (t = e.parent) == null ? void 0 : t.type) == null ? void 0 : n.components)
    if (e.parent.type.components[i] === e?.type)
      return Js(e, i);
  for (const i in (o = e.appContext) == null ? void 0 : o.components)
    if (e.appContext.components[i] === e?.type)
      return Js(e, i);
  const s = Xd(e?.type || {});
  return s || "Anonymous Component";
}
function Zd(e) {
  var t, n, o;
  const r = (o = (n = (t = e?.appContext) == null ? void 0 : t.app) == null ? void 0 : n.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? o : 0, s = e === e?.root ? "root" : e.uid;
  return `${r}:${s}`;
}
function cr(e, t) {
  return t = t || `${e.id}:root`, e.instanceMap.get(t) || e.instanceMap.get(":root");
}
function Qd() {
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
var Kn;
function ep(e) {
  return Kn || (Kn = document.createRange()), Kn.selectNode(e), Kn.getBoundingClientRect();
}
function tp(e) {
  const t = Qd();
  if (!e.children)
    return t;
  for (let n = 0, o = e.children.length; n < o; n++) {
    const r = e.children[n];
    let s;
    if (r.component)
      s = Ft(r.component);
    else if (r.el) {
      const i = r.el;
      i.nodeType === 1 || i.getBoundingClientRect ? s = i.getBoundingClientRect() : i.nodeType === 3 && i.data.trim() && (s = ep(i));
    }
    s && np(t, s);
  }
  return t;
}
function np(e, t) {
  return (!e.top || t.top < e.top) && (e.top = t.top), (!e.bottom || t.bottom > e.bottom) && (e.bottom = t.bottom), (!e.left || t.left < e.left) && (e.left = t.left), (!e.right || t.right > e.right) && (e.right = t.right), e;
}
var Xs = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function Ft(e) {
  const t = e.subTree.el;
  return typeof window > "u" ? Xs : ml(e) ? tp(e.subTree) : t?.nodeType === 1 ? t?.getBoundingClientRect() : e.subTree.component ? Ft(e.subTree.component) : Xs;
}
w();
function qr(e) {
  return ml(e) ? op(e.subTree) : e.subTree ? [e.subTree.el] : [];
}
function op(e) {
  if (!e.children)
    return [];
  const t = [];
  return e.children.forEach((n) => {
    n.component ? t.push(...qr(n.component)) : n?.el && t.push(n.el);
  }), t;
}
var vl = "__vue-devtools-component-inspector__", yl = "__vue-devtools-component-inspector__card__", bl = "__vue-devtools-component-inspector__name__", Ol = "__vue-devtools-component-inspector__indicator__", Nl = {
  display: "block",
  zIndex: 2147483640,
  position: "fixed",
  backgroundColor: "#42b88325",
  border: "1px solid #42b88350",
  borderRadius: "5px",
  transition: "all 0.1s ease-in",
  pointerEvents: "none"
}, rp = {
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
}, sp = {
  display: "inline-block",
  fontWeight: 400,
  fontStyle: "normal",
  fontSize: "12px",
  opacity: 0.7
};
function Xt() {
  return document.getElementById(vl);
}
function ip() {
  return document.getElementById(yl);
}
function up() {
  return document.getElementById(Ol);
}
function lp() {
  return document.getElementById(bl);
}
function Yr(e) {
  return {
    left: `${Math.round(e.left * 100) / 100}px`,
    top: `${Math.round(e.top * 100) / 100}px`,
    width: `${Math.round(e.width * 100) / 100}px`,
    height: `${Math.round(e.height * 100) / 100}px`
  };
}
function Jr(e) {
  var t;
  const n = document.createElement("div");
  n.id = (t = e.elementId) != null ? t : vl, Object.assign(n.style, {
    ...Nl,
    ...Yr(e.bounds),
    ...e.style
  });
  const o = document.createElement("span");
  o.id = yl, Object.assign(o.style, {
    ...rp,
    top: e.bounds.top < 35 ? 0 : "-35px"
  });
  const r = document.createElement("span");
  r.id = bl, r.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`;
  const s = document.createElement("i");
  return s.id = Ol, s.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`, Object.assign(s.style, sp), o.appendChild(r), o.appendChild(s), n.appendChild(o), document.body.appendChild(n), n;
}
function Xr(e) {
  const t = Xt(), n = ip(), o = lp(), r = up();
  t && (Object.assign(t.style, {
    ...Nl,
    ...Yr(e.bounds)
  }), Object.assign(n.style, {
    top: e.bounds.top < 35 ? 0 : "-35px"
  }), o.innerHTML = `&lt;${e.name}&gt;&nbsp;&nbsp;`, r.innerHTML = `${Math.round(e.bounds.width * 100) / 100} x ${Math.round(e.bounds.height * 100) / 100}`);
}
function cp(e) {
  const t = Ft(e);
  if (!t.width && !t.height)
    return;
  const n = To(e);
  Xt() ? Xr({ bounds: t, name: n }) : Jr({ bounds: t, name: n });
}
function Dl() {
  const e = Xt();
  e && (e.style.display = "none");
}
var ar = null;
function fr(e) {
  const t = e.target;
  if (t) {
    const n = t.__vueParentComponent;
    if (n && (ar = n, n.vnode.el)) {
      const r = Ft(n), s = To(n);
      Xt() ? Xr({ bounds: r, name: s }) : Jr({ bounds: r, name: s });
    }
  }
}
function ap(e, t) {
  if (e.preventDefault(), e.stopPropagation(), ar) {
    const n = Zd(ar);
    t(n);
  }
}
var mo = null;
function fp() {
  Dl(), window.removeEventListener("mouseover", fr), window.removeEventListener("click", mo, !0), mo = null;
}
function dp() {
  return window.addEventListener("mouseover", fr), new Promise((e) => {
    function t(n) {
      n.preventDefault(), n.stopPropagation(), ap(n, (o) => {
        window.removeEventListener("click", t, !0), mo = null, window.removeEventListener("mouseover", fr);
        const r = Xt();
        r && (r.style.display = "none"), e(JSON.stringify({ id: o }));
      });
    }
    mo = t, window.addEventListener("click", t, !0);
  });
}
function pp(e) {
  const t = cr(ye.value, e.id);
  if (t) {
    const [n] = qr(t);
    if (typeof n.scrollIntoView == "function")
      n.scrollIntoView({
        behavior: "smooth"
      });
    else {
      const o = Ft(t), r = document.createElement("div"), s = {
        ...Yr(o),
        position: "absolute"
      };
      Object.assign(r.style, s), document.body.appendChild(r), r.scrollIntoView({
        behavior: "smooth"
      }), setTimeout(() => {
        document.body.removeChild(r);
      }, 2e3);
    }
    setTimeout(() => {
      const o = Ft(t);
      if (o.width || o.height) {
        const r = To(t), s = Xt();
        s ? Xr({ ...e, name: r, bounds: o }) : Jr({ ...e, name: r, bounds: o }), setTimeout(() => {
          s && (s.style.display = "none");
        }, 1500);
      }
    }, 1200);
  }
}
w();
var Zs, Qs;
(Qs = (Zs = I).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (Zs.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = !0);
function hp(e) {
  let t = 0;
  const n = setInterval(() => {
    I.__VUE_INSPECTOR__ && (clearInterval(n), t += 30, e()), t >= /* 5s */
    5e3 && clearInterval(n);
  }, 30);
}
function _p() {
  const e = I.__VUE_INSPECTOR__, t = e.openInEditor;
  e.openInEditor = async (...n) => {
    e.disable(), t(...n);
  };
}
function gp() {
  return new Promise((e) => {
    function t() {
      _p(), e(I.__VUE_INSPECTOR__);
    }
    I.__VUE_INSPECTOR__ ? t() : hp(() => {
      t();
    });
  });
}
w();
w();
function Ep(e) {
  return !!(e && e.__v_isReadonly);
}
function Sl(e) {
  return Ep(e) ? Sl(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Wo(e) {
  return !!(e && e.__v_isRef === !0);
}
function fn(e) {
  const t = e && e.__v_raw;
  return t ? fn(t) : e;
}
var mp = class {
  constructor() {
    this.refEditor = new vp();
  }
  set(e, t, n, o) {
    const r = Array.isArray(t) ? t : t.split(".");
    for (; r.length > 1; ) {
      const u = r.shift();
      e instanceof Map ? e = e.get(u) : e instanceof Set ? e = Array.from(e.values())[u] : e = e[u], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    const s = r[0], i = this.refEditor.get(e)[s];
    o ? o(e, s, n) : this.refEditor.isRef(i) ? this.refEditor.set(i, n) : e[s] = n;
  }
  get(e, t) {
    const n = Array.isArray(t) ? t : t.split(".");
    for (let o = 0; o < n.length; o++)
      if (e instanceof Map ? e = e.get(n[o]) : e = e[n[o]], this.refEditor.isRef(e) && (e = this.refEditor.get(e)), !e)
        return;
    return e;
  }
  has(e, t, n = !1) {
    if (typeof e > "u")
      return !1;
    const o = Array.isArray(t) ? t.slice() : t.split("."), r = n ? 2 : 1;
    for (; e && o.length > r; ) {
      const s = o.shift();
      e = e[s], this.refEditor.isRef(e) && (e = this.refEditor.get(e));
    }
    return e != null && Object.prototype.hasOwnProperty.call(e, o[0]);
  }
  createDefaultSetCallback(e) {
    return (t, n, o) => {
      if ((e.remove || e.newKey) && (Array.isArray(t) ? t.splice(n, 1) : fn(t) instanceof Map ? t.delete(n) : fn(t) instanceof Set ? t.delete(Array.from(t.values())[n]) : Reflect.deleteProperty(t, n)), !e.remove) {
        const r = t[e.newKey || n];
        this.refEditor.isRef(r) ? this.refEditor.set(r, o) : fn(t) instanceof Map ? t.set(e.newKey || n, o) : fn(t) instanceof Set ? t.add(o) : t[e.newKey || n] = o;
      }
    };
  }
}, vp = class {
  set(e, t) {
    if (Wo(e))
      e.value = t;
    else {
      if (e instanceof Set && Array.isArray(t)) {
        e.clear(), t.forEach((r) => e.add(r));
        return;
      }
      const n = Object.keys(t);
      if (e instanceof Map) {
        const r = new Set(e.keys());
        n.forEach((s) => {
          e.set(s, Reflect.get(t, s)), r.delete(s);
        }), r.forEach((s) => e.delete(s));
        return;
      }
      const o = new Set(Object.keys(e));
      n.forEach((r) => {
        Reflect.set(e, r, Reflect.get(t, r)), o.delete(r);
      }), o.forEach((r) => Reflect.deleteProperty(e, r));
    }
  }
  get(e) {
    return Wo(e) ? e.value : e;
  }
  isRef(e) {
    return Wo(e) || Sl(e);
  }
};
w();
w();
w();
var yp = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function bp() {
  if (typeof window > "u" || !pl || typeof localStorage > "u" || localStorage === null)
    return {
      recordingState: !1,
      mouseEventEnabled: !1,
      keyboardEventEnabled: !1,
      componentEventEnabled: !1,
      performanceEventEnabled: !1,
      selected: ""
    };
  const e = typeof localStorage.getItem < "u" ? localStorage.getItem(yp) : null;
  return e ? JSON.parse(e) : {
    recordingState: !1,
    mouseEventEnabled: !1,
    keyboardEventEnabled: !1,
    componentEventEnabled: !1,
    performanceEventEnabled: !1,
    selected: ""
  };
}
w();
w();
w();
var ei, ti;
(ti = (ei = I).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (ei.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
var Op = new Proxy(I.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function Np(e, t) {
  ae.timelineLayersState[t.id] = !1, Op.push({
    ...e,
    descriptorId: t.id,
    appRecord: Gr(t.app)
  });
}
var ni, oi;
(oi = (ni = I).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (ni.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
var Zr = new Proxy(I.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
}), Al = Gt(() => {
  Zt.hooks.callHook("sendInspectorToClient", Cl());
});
function Dp(e, t) {
  var n, o;
  Zr.push({
    options: e,
    descriptor: t,
    treeFilterPlaceholder: (n = e.treeFilterPlaceholder) != null ? n : "Search tree...",
    stateFilterPlaceholder: (o = e.stateFilterPlaceholder) != null ? o : "Search state...",
    treeFilter: "",
    selectedNodeId: "",
    appRecord: Gr(t.app)
  }), Al();
}
function Cl() {
  return Zr.filter((e) => e.descriptor.app === ye.value.app).filter((e) => e.descriptor.id !== "components").map((e) => {
    var t;
    const n = e.descriptor, o = e.options;
    return {
      id: o.id,
      label: o.label,
      logo: n.logo,
      icon: `custom-ic-baseline-${(t = o?.icon) == null ? void 0 : t.replace(/_/g, "-")}`,
      packageName: n.packageName,
      homepage: n.homepage,
      pluginId: n.id
    };
  });
}
function Qn(e, t) {
  return Zr.find((n) => n.options.id === e && (t ? n.descriptor.app === t : !0));
}
function Sp() {
  const e = _l();
  e.hook("addInspector", ({ inspector: o, plugin: r }) => {
    Dp(o, r.descriptor);
  });
  const t = Gt(async ({ inspectorId: o, plugin: r }) => {
    var s;
    if (!o || !((s = r?.descriptor) != null && s.app) || ae.highPerfModeEnabled)
      return;
    const i = Qn(o, r.descriptor.app), u = {
      app: r.descriptor.app,
      inspectorId: o,
      filter: i?.treeFilter || "",
      rootNodes: []
    };
    await new Promise((l) => {
      e.callHookWith(
        async (p) => {
          await Promise.all(p.map((f) => f(u))), l();
        },
        "getInspectorTree"
        /* GET_INSPECTOR_TREE */
      );
    }), e.callHookWith(
      async (l) => {
        await Promise.all(l.map((p) => p({
          inspectorId: o,
          rootNodes: u.rootNodes
        })));
      },
      "sendInspectorTreeToClient"
      /* SEND_INSPECTOR_TREE_TO_CLIENT */
    );
  }, 120);
  e.hook("sendInspectorTree", t);
  const n = Gt(async ({ inspectorId: o, plugin: r }) => {
    var s;
    if (!o || !((s = r?.descriptor) != null && s.app) || ae.highPerfModeEnabled)
      return;
    const i = Qn(o, r.descriptor.app), u = {
      app: r.descriptor.app,
      inspectorId: o,
      nodeId: i?.selectedNodeId || "",
      state: null
    }, l = {
      currentTab: `custom-inspector:${o}`
    };
    u.nodeId && await new Promise((p) => {
      e.callHookWith(
        async (f) => {
          await Promise.all(f.map((a) => a(u, l))), p();
        },
        "getInspectorState"
        /* GET_INSPECTOR_STATE */
      );
    }), e.callHookWith(
      async (p) => {
        await Promise.all(p.map((f) => f({
          inspectorId: o,
          nodeId: u.nodeId,
          state: u.state
        })));
      },
      "sendInspectorStateToClient"
      /* SEND_INSPECTOR_STATE_TO_CLIENT */
    );
  }, 120);
  return e.hook("sendInspectorState", n), e.hook("customInspectorSelectNode", ({ inspectorId: o, nodeId: r, plugin: s }) => {
    const i = Qn(o, s.descriptor.app);
    i && (i.selectedNodeId = r);
  }), e.hook("timelineLayerAdded", ({ options: o, plugin: r }) => {
    Np(o, r.descriptor);
  }), e.hook("timelineEventAdded", ({ options: o, plugin: r }) => {
    var s;
    const i = ["performance", "component-event", "keyboard", "mouse"];
    ae.highPerfModeEnabled || !((s = ae.timelineLayersState) != null && s[r.descriptor.id]) && !i.includes(o.layerId) || e.callHookWith(
      async (u) => {
        await Promise.all(u.map((l) => l(o)));
      },
      "sendTimelineEventToClient"
      /* SEND_TIMELINE_EVENT_TO_CLIENT */
    );
  }), e.hook("getComponentInstances", async ({ app: o }) => {
    const r = o.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    if (!r)
      return null;
    const s = r.id.toString();
    return [...r.instanceMap].filter(([u]) => u.split(":")[0] === s).map(([, u]) => u);
  }), e.hook("getComponentBounds", async ({ instance: o }) => Ft(o)), e.hook("getComponentName", ({ instance: o }) => To(o)), e.hook("componentHighlight", ({ uid: o }) => {
    const r = ye.value.instanceMap.get(o);
    r && cp(r);
  }), e.hook("componentUnhighlight", () => {
    Dl();
  }), e;
}
var ri, si;
(si = (ri = I).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (ri.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
var ii, ui;
(ui = (ii = I).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (ii.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
var li, ci;
(ci = (li = I).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (li.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
var ai, fi;
(fi = (ai = I).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (ai.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
var di, pi;
(pi = (di = I).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (di.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
var At = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function Ap() {
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
    timelineLayersState: bp()
  };
}
var hi, _i;
(_i = (hi = I)[At]) != null || (hi[At] = Ap());
var Cp = Gt((e) => {
  Zt.hooks.callHook("devtoolsStateUpdated", { state: e });
});
Gt((e, t) => {
  Zt.hooks.callHook("devtoolsConnectedUpdated", { state: e, oldState: t });
});
var xo = new Proxy(I.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
  get(e, t, n) {
    return t === "value" ? I.__VUE_DEVTOOLS_KIT_APP_RECORDS__ : I.__VUE_DEVTOOLS_KIT_APP_RECORDS__[t];
  }
}), ye = new Proxy(I.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
  get(e, t, n) {
    return t === "value" ? I.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ : t === "id" ? I.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ : I.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[t];
  }
});
function wl() {
  Cp({
    ...I[At],
    appRecords: xo.value,
    activeAppRecordId: ye.id,
    tabs: I.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
    commands: I.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
  });
}
function wp(e) {
  I.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = e, wl();
}
function Tp(e) {
  I.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = e, wl();
}
var ae = new Proxy(I[At], {
  get(e, t) {
    return t === "appRecords" ? xo : t === "activeAppRecordId" ? ye.id : t === "tabs" ? I.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ : t === "commands" ? I.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ : I[At][t];
  },
  deleteProperty(e, t) {
    return delete e[t], !0;
  },
  set(e, t, n) {
    return { ...I[At] }, e[t] = n, I[At][t] = n, !0;
  }
});
function xp(e = {}) {
  var t, n, o;
  const { file: r, host: s, baseUrl: i = window.location.origin, line: u = 0, column: l = 0 } = e;
  if (r) {
    if (s === "chrome-extension") {
      const p = r.replace(/\\/g, "\\\\"), f = (n = (t = window.VUE_DEVTOOLS_CONFIG) == null ? void 0 : t.openInEditorHost) != null ? n : "/";
      fetch(`${f}__open-in-editor?file=${encodeURI(r)}`).then((a) => {
        if (!a.ok) {
          const h = `Opening component ${p} failed`;
          console.log(`%c${h}`, "color:red");
        }
      });
    } else if (ae.vitePluginDetected) {
      const p = (o = I.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? o : i;
      I.__VUE_INSPECTOR__.openInEditor(p, r, u, l);
    }
  }
}
w();
w();
w();
w();
w();
var gi, Ei;
(Ei = (gi = I).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (gi.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
var Qr = new Proxy(I.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
  get(e, t, n) {
    return Reflect.get(e, t, n);
  }
});
function dr(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = e[n].defaultValue;
  }), t;
}
function es(e) {
  return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${e}__`;
}
function Vp(e) {
  var t, n, o;
  const r = (n = (t = Qr.find((s) => {
    var i;
    return s[0].id === e && !!((i = s[0]) != null && i.settings);
  })) == null ? void 0 : t[0]) != null ? n : null;
  return (o = r?.settings) != null ? o : null;
}
function Tl(e, t) {
  var n, o, r;
  const s = es(e);
  if (s) {
    const i = localStorage.getItem(s);
    if (i)
      return JSON.parse(i);
  }
  if (e) {
    const i = (o = (n = Qr.find((u) => u[0].id === e)) == null ? void 0 : n[0]) != null ? o : null;
    return dr((r = i?.settings) != null ? r : {});
  }
  return dr(t);
}
function Ip(e, t) {
  const n = es(e);
  localStorage.getItem(n) || localStorage.setItem(n, JSON.stringify(dr(t)));
}
function Pp(e, t, n) {
  const o = es(e), r = localStorage.getItem(o), s = JSON.parse(r || "{}"), i = {
    ...s,
    [t]: n
  };
  localStorage.setItem(o, JSON.stringify(i)), Zt.hooks.callHookWith(
    (u) => {
      u.forEach((l) => l({
        pluginId: e,
        key: t,
        oldValue: s[t],
        newValue: n,
        settings: i
      }));
    },
    "setPluginSettings"
    /* SET_PLUGIN_SETTINGS */
  );
}
w();
var mi, vi, we = (vi = (mi = I).__VUE_DEVTOOLS_HOOK) != null ? vi : mi.__VUE_DEVTOOLS_HOOK = _l(), Rp = {
  vueAppInit(e) {
    we.hook("app:init", e);
  },
  vueAppUnmount(e) {
    we.hook("app:unmount", e);
  },
  vueAppConnected(e) {
    we.hook("app:connected", e);
  },
  componentAdded(e) {
    return we.hook("component:added", e);
  },
  componentEmit(e) {
    return we.hook("component:emit", e);
  },
  componentUpdated(e) {
    return we.hook("component:updated", e);
  },
  componentRemoved(e) {
    return we.hook("component:removed", e);
  },
  setupDevtoolsPlugin(e) {
    we.hook("devtools-plugin:setup", e);
  },
  perfStart(e) {
    return we.hook("perf:start", e);
  },
  perfEnd(e) {
    return we.hook("perf:end", e);
  }
}, xl = {
  on: Rp,
  setupDevToolsPlugin(e, t) {
    return we.callHook("devtools-plugin:setup", e, t);
  }
}, kp = class {
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
    if (ae.highPerfModeEnabled)
      return;
    const n = Cl().find((o) => o.packageName === this.plugin.descriptor.packageName);
    if (n?.id) {
      if (e) {
        const o = [
          e.appContext.app,
          e.uid,
          (t = e.parent) == null ? void 0 : t.uid,
          e
        ];
        we.callHook("component:updated", ...o);
      } else
        we.callHook(
          "component:updated"
          /* COMPONENT_UPDATED */
        );
      this.hooks.callHook("sendInspectorState", { inspectorId: n.id, plugin: this.plugin });
    }
  }
  // custom inspector
  addInspector(e) {
    this.hooks.callHook("addInspector", { inspector: e, plugin: this.plugin }), this.plugin.descriptor.settings && Ip(e.id, this.plugin.descriptor.settings);
  }
  sendInspectorTree(e) {
    ae.highPerfModeEnabled || this.hooks.callHook("sendInspectorTree", { inspectorId: e, plugin: this.plugin });
  }
  sendInspectorState(e) {
    ae.highPerfModeEnabled || this.hooks.callHook("sendInspectorState", { inspectorId: e, plugin: this.plugin });
  }
  selectInspectorNode(e, t) {
    this.hooks.callHook("customInspectorSelectNode", { inspectorId: e, nodeId: t, plugin: this.plugin });
  }
  visitComponentTree(e) {
    return this.hooks.callHook("visitComponentTree", e);
  }
  // timeline
  now() {
    return ae.highPerfModeEnabled ? 0 : Date.now();
  }
  addTimelineLayer(e) {
    this.hooks.callHook("timelineLayerAdded", { options: e, plugin: this.plugin });
  }
  addTimelineEvent(e) {
    ae.highPerfModeEnabled || this.hooks.callHook("timelineEventAdded", { options: e, plugin: this.plugin });
  }
  // settings
  getSettings(e) {
    return Tl(e ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
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
}, Fp = kp;
w();
w();
w();
w();
var Lp = "__vue_devtool_undefined__", $p = "__vue_devtool_infinity__", Mp = "__vue_devtool_negative_infinity__", Up = "__vue_devtool_nan__";
w();
w();
var Bp = {
  [Lp]: "undefined",
  [Up]: "NaN",
  [$p]: "Infinity",
  [Mp]: "-Infinity"
};
Object.entries(Bp).reduce((e, [t, n]) => (e[n] = t, e), {});
w();
w();
w();
w();
w();
var yi, bi;
(bi = (yi = I).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (yi.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set());
function Vl(e, t) {
  return xl.setupDevToolsPlugin(e, t);
}
function jp(e, t) {
  const [n, o] = e;
  if (n.app !== t)
    return;
  const r = new Fp({
    plugin: {
      setupFn: o,
      descriptor: n
    },
    ctx: Zt
  });
  n.packageName === "vuex" && r.on.editInspectorState((s) => {
    r.sendInspectorState(s.inspectorId);
  }), o(r);
}
function Il(e, t) {
  I.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(e) || ae.highPerfModeEnabled && !t?.inspectingComponent || (I.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(e), Qr.forEach((n) => {
    jp(n, e);
  }));
}
w();
w();
var Cn = "__VUE_DEVTOOLS_ROUTER__", qt = "__VUE_DEVTOOLS_ROUTER_INFO__", Oi, Ni;
(Ni = (Oi = I)[qt]) != null || (Oi[qt] = {
  currentRoute: null,
  routes: []
});
var Di, Si;
(Si = (Di = I)[Cn]) != null || (Di[Cn] = {});
new Proxy(I[qt], {
  get(e, t) {
    return I[qt][t];
  }
});
new Proxy(I[Cn], {
  get(e, t) {
    if (t === "value")
      return I[Cn];
  }
});
function Hp(e) {
  const t = /* @__PURE__ */ new Map();
  return (e?.getRoutes() || []).filter((n) => !t.has(n.path) && t.set(n.path, 1));
}
function ts(e) {
  return e.map((t) => {
    let { path: n, name: o, children: r, meta: s } = t;
    return r?.length && (r = ts(r)), {
      path: n,
      name: o,
      children: r,
      meta: s
    };
  });
}
function Kp(e) {
  if (e) {
    const { fullPath: t, hash: n, href: o, path: r, name: s, matched: i, params: u, query: l } = e;
    return {
      fullPath: t,
      hash: n,
      href: o,
      path: r,
      name: s,
      params: u,
      query: l,
      matched: ts(i)
    };
  }
  return e;
}
function Wp(e, t) {
  function n() {
    var o;
    const r = (o = e.app) == null ? void 0 : o.config.globalProperties.$router, s = Kp(r?.currentRoute.value), i = ts(Hp(r)), u = console.warn;
    console.warn = () => {
    }, I[qt] = {
      currentRoute: s ? Ys(s) : {},
      routes: Ys(i)
    }, I[Cn] = r, console.warn = u;
  }
  n(), xl.on.componentUpdated(Gt(() => {
    var o;
    ((o = t.value) == null ? void 0 : o.app) === e.app && (n(), !ae.highPerfModeEnabled && Zt.hooks.callHook("routerInfoUpdated", { state: I[qt] }));
  }, 200));
}
function zp(e) {
  return {
    // get inspector tree
    async getInspectorTree(t) {
      const n = {
        ...t,
        app: ye.value.app,
        rootNodes: []
      };
      return await new Promise((o) => {
        e.callHookWith(
          async (r) => {
            await Promise.all(r.map((s) => s(n))), o();
          },
          "getInspectorTree"
          /* GET_INSPECTOR_TREE */
        );
      }), n.rootNodes;
    },
    // get inspector state
    async getInspectorState(t) {
      const n = {
        ...t,
        app: ye.value.app,
        state: null
      }, o = {
        currentTab: `custom-inspector:${t.inspectorId}`
      };
      return await new Promise((r) => {
        e.callHookWith(
          async (s) => {
            await Promise.all(s.map((i) => i(n, o))), r();
          },
          "getInspectorState"
          /* GET_INSPECTOR_STATE */
        );
      }), n.state;
    },
    // edit inspector state
    editInspectorState(t) {
      const n = new mp(), o = {
        ...t,
        app: ye.value.app,
        set: (r, s = t.path, i = t.state.value, u) => {
          n.set(r, s, i, u || n.createDefaultSetCallback(t.state));
        }
      };
      e.callHookWith(
        (r) => {
          r.forEach((s) => s(o));
        },
        "editInspectorState"
        /* EDIT_INSPECTOR_STATE */
      );
    },
    // send inspector state
    sendInspectorState(t) {
      const n = Qn(t);
      e.callHook("sendInspectorState", { inspectorId: t, plugin: {
        descriptor: n.descriptor,
        setupFn: () => ({})
      } });
    },
    // inspect component inspector
    inspectComponentInspector() {
      return dp();
    },
    // cancel inspect component inspector
    cancelInspectComponentInspector() {
      return fp();
    },
    // get component render code
    getComponentRenderCode(t) {
      const n = cr(ye.value, t);
      if (n)
        return typeof n?.type != "function" ? n.render.toString() : n.type.toString();
    },
    // scroll to component
    scrollToComponent(t) {
      return pp({ id: t });
    },
    // open in editor
    openInEditor: xp,
    // get vue inspector
    getVueInspector: gp,
    // toggle app
    toggleApp(t, n) {
      const o = xo.value.find((r) => r.id === t);
      o && (Tp(t), wp(o), Wp(o, ye), Al(), Il(o.app, n));
    },
    // inspect dom
    inspectDOM(t) {
      const n = cr(ye.value, t);
      if (n) {
        const [o] = qr(n);
        o && (I.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = o);
      }
    },
    updatePluginSettings(t, n, o) {
      Pp(t, n, o);
    },
    getPluginSettings(t) {
      return {
        options: Vp(t),
        values: Tl(t)
      };
    }
  };
}
w();
var Ai, Ci;
(Ci = (Ai = I).__VUE_DEVTOOLS_ENV__) != null || (Ai.__VUE_DEVTOOLS_ENV__ = {
  vitePluginDetected: !1
});
var wi = Sp(), Ti, xi;
(xi = (Ti = I).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (Ti.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
  hooks: wi,
  get state() {
    return {
      ...ae,
      activeAppRecordId: ye.id,
      activeAppRecord: ye.value,
      appRecords: xo.value
    };
  },
  api: zp(wi)
});
var Zt = I.__VUE_DEVTOOLS_KIT_CONTEXT__;
w();
Gd(Yd());
var Vi, Ii;
(Ii = (Vi = I).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null || (Vi.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
  id: 0,
  appIds: /* @__PURE__ */ new Set()
});
w();
w();
function Gp(e) {
  ae.highPerfModeEnabled = e ?? !ae.highPerfModeEnabled, !e && ye.value && Il(ye.value.app);
}
w();
w();
w();
function qp(e) {
  ae.devtoolsClientDetected = {
    ...ae.devtoolsClientDetected,
    ...e
  };
  const t = Object.values(ae.devtoolsClientDetected).some(Boolean);
  Gp(!t);
}
var Pi, Ri;
(Ri = (Pi = I).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (Pi.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = qp);
w();
w();
w();
w();
w();
w();
var Yp = class {
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
}, Pl = class {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new Yp();
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
}, Jp = class extends Pl {
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
w();
w();
function Xp(e) {
  if ("values" in Object)
    return Object.values(e);
  const t = [];
  for (const n in e)
    e.hasOwnProperty(n) && t.push(e[n]);
  return t;
}
function Zp(e, t) {
  const n = Xp(e);
  if ("find" in n)
    return n.find(t);
  const o = n;
  for (let r = 0; r < o.length; r++) {
    const s = o[r];
    if (t(s))
      return s;
  }
}
function Yt(e, t) {
  Object.entries(e).forEach(([n, o]) => t(o, n));
}
function eo(e, t) {
  return e.indexOf(t) !== -1;
}
function ki(e, t) {
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (t(o))
      return o;
  }
}
var Qp = class {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return Zp(this.transfomers, (t) => t.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
};
w();
w();
var eh = (e) => Object.prototype.toString.call(e).slice(8, -1), Rl = (e) => typeof e > "u", th = (e) => e === null, wn = (e) => typeof e != "object" || e === null || e === Object.prototype ? !1 : Object.getPrototypeOf(e) === null ? !0 : Object.getPrototypeOf(e) === Object.prototype, pr = (e) => wn(e) && Object.keys(e).length === 0, yt = (e) => Array.isArray(e), nh = (e) => typeof e == "string", oh = (e) => typeof e == "number" && !isNaN(e), rh = (e) => typeof e == "boolean", sh = (e) => e instanceof RegExp, Tn = (e) => e instanceof Map, xn = (e) => e instanceof Set, kl = (e) => eh(e) === "Symbol", ih = (e) => e instanceof Date && !isNaN(e.valueOf()), uh = (e) => e instanceof Error, Fi = (e) => typeof e == "number" && isNaN(e), lh = (e) => rh(e) || th(e) || Rl(e) || oh(e) || nh(e) || kl(e), ch = (e) => typeof e == "bigint", ah = (e) => e === 1 / 0 || e === -1 / 0, fh = (e) => ArrayBuffer.isView(e) && !(e instanceof DataView), dh = (e) => e instanceof URL;
w();
var Fl = (e) => e.replace(/\./g, "\\."), zo = (e) => e.map(String).map(Fl).join("."), vn = (e) => {
  const t = [];
  let n = "";
  for (let r = 0; r < e.length; r++) {
    let s = e.charAt(r);
    if (s === "\\" && e.charAt(r + 1) === ".") {
      n += ".", r++;
      continue;
    }
    if (s === ".") {
      t.push(n), n = "";
      continue;
    }
    n += s;
  }
  const o = n;
  return t.push(o), t;
};
w();
function Je(e, t, n, o) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: o
  };
}
var Ll = [
  Je(Rl, "undefined", () => null, () => {
  }),
  Je(ch, "bigint", (e) => e.toString(), (e) => typeof BigInt < "u" ? BigInt(e) : (console.error("Please add a BigInt polyfill."), e)),
  Je(ih, "Date", (e) => e.toISOString(), (e) => new Date(e)),
  Je(uh, "Error", (e, t) => {
    const n = {
      name: e.name,
      message: e.message
    };
    return t.allowedErrorProps.forEach((o) => {
      n[o] = e[o];
    }), n;
  }, (e, t) => {
    const n = new Error(e.message);
    return n.name = e.name, n.stack = e.stack, t.allowedErrorProps.forEach((o) => {
      n[o] = e[o];
    }), n;
  }),
  Je(sh, "regexp", (e) => "" + e, (e) => {
    const t = e.slice(1, e.lastIndexOf("/")), n = e.slice(e.lastIndexOf("/") + 1);
    return new RegExp(t, n);
  }),
  Je(
    xn,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (e) => [...e.values()],
    (e) => new Set(e)
  ),
  Je(Tn, "map", (e) => [...e.entries()], (e) => new Map(e)),
  Je((e) => Fi(e) || ah(e), "number", (e) => Fi(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity", Number),
  Je((e) => e === 0 && 1 / e === -1 / 0, "number", () => "-0", Number),
  Je(dh, "URL", (e) => e.toString(), (e) => new URL(e))
];
function Vo(e, t, n, o) {
  return {
    isApplicable: e,
    annotation: t,
    transform: n,
    untransform: o
  };
}
var $l = Vo((e, t) => kl(e) ? !!t.symbolRegistry.getIdentifier(e) : !1, (e, t) => ["symbol", t.symbolRegistry.getIdentifier(e)], (e) => e.description, (e, t, n) => {
  const o = n.symbolRegistry.getValue(t[1]);
  if (!o)
    throw new Error("Trying to deserialize unknown symbol");
  return o;
}), ph = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((e, t) => (e[t.name] = t, e), {}), Ml = Vo(fh, (e) => ["typed-array", e.constructor.name], (e) => [...e], (e, t) => {
  const n = ph[t[1]];
  if (!n)
    throw new Error("Trying to deserialize unknown typed array");
  return new n(e);
});
function Ul(e, t) {
  return e?.constructor ? !!t.classRegistry.getIdentifier(e.constructor) : !1;
}
var Bl = Vo(Ul, (e, t) => ["class", t.classRegistry.getIdentifier(e.constructor)], (e, t) => {
  const n = t.classRegistry.getAllowedProps(e.constructor);
  if (!n)
    return { ...e };
  const o = {};
  return n.forEach((r) => {
    o[r] = e[r];
  }), o;
}, (e, t, n) => {
  const o = n.classRegistry.getValue(t[1]);
  if (!o)
    throw new Error(`Trying to deserialize unknown class '${t[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(o.prototype), e);
}), jl = Vo((e, t) => !!t.customTransformerRegistry.findApplicable(e), (e, t) => ["custom", t.customTransformerRegistry.findApplicable(e).name], (e, t) => t.customTransformerRegistry.findApplicable(e).serialize(e), (e, t, n) => {
  const o = n.customTransformerRegistry.findByName(t[1]);
  if (!o)
    throw new Error("Trying to deserialize unknown custom value");
  return o.deserialize(e);
}), hh = [Bl, $l, jl, Ml], Li = (e, t) => {
  const n = ki(hh, (r) => r.isApplicable(e, t));
  if (n)
    return {
      value: n.transform(e, t),
      type: n.annotation(e, t)
    };
  const o = ki(Ll, (r) => r.isApplicable(e, t));
  if (o)
    return {
      value: o.transform(e, t),
      type: o.annotation
    };
}, Hl = {};
Ll.forEach((e) => {
  Hl[e.annotation] = e;
});
var _h = (e, t, n) => {
  if (yt(t))
    switch (t[0]) {
      case "symbol":
        return $l.untransform(e, t, n);
      case "class":
        return Bl.untransform(e, t, n);
      case "custom":
        return jl.untransform(e, t, n);
      case "typed-array":
        return Ml.untransform(e, t, n);
      default:
        throw new Error("Unknown transformation: " + t);
    }
  else {
    const o = Hl[t];
    if (!o)
      throw new Error("Unknown transformation: " + t);
    return o.untransform(e, n);
  }
};
w();
var jt = (e, t) => {
  if (t > e.size)
    throw new Error("index out of bounds");
  const n = e.keys();
  for (; t > 0; )
    n.next(), t--;
  return n.next().value;
};
function Kl(e) {
  if (eo(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (eo(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (eo(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var gh = (e, t) => {
  Kl(t);
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    if (xn(e))
      e = jt(e, +o);
    else if (Tn(e)) {
      const r = +o, s = +t[++n] == 0 ? "key" : "value", i = jt(e, r);
      switch (s) {
        case "key":
          e = i;
          break;
        case "value":
          e = e.get(i);
          break;
      }
    } else
      e = e[o];
  }
  return e;
}, hr = (e, t, n) => {
  if (Kl(t), t.length === 0)
    return n(e);
  let o = e;
  for (let s = 0; s < t.length - 1; s++) {
    const i = t[s];
    if (yt(o)) {
      const u = +i;
      o = o[u];
    } else if (wn(o))
      o = o[i];
    else if (xn(o)) {
      const u = +i;
      o = jt(o, u);
    } else if (Tn(o)) {
      if (s === t.length - 2)
        break;
      const l = +i, p = +t[++s] == 0 ? "key" : "value", f = jt(o, l);
      switch (p) {
        case "key":
          o = f;
          break;
        case "value":
          o = o.get(f);
          break;
      }
    }
  }
  const r = t[t.length - 1];
  if (yt(o) ? o[+r] = n(o[+r]) : wn(o) && (o[r] = n(o[r])), xn(o)) {
    const s = jt(o, +r), i = n(s);
    s !== i && (o.delete(s), o.add(i));
  }
  if (Tn(o)) {
    const s = +t[t.length - 2], i = jt(o, s);
    switch (+r == 0 ? "key" : "value") {
      case "key": {
        const l = n(i);
        o.set(l, o.get(i)), l !== i && o.delete(i);
        break;
      }
      case "value": {
        o.set(i, n(o.get(i)));
        break;
      }
    }
  }
  return e;
};
function _r(e, t, n = []) {
  if (!e)
    return;
  if (!yt(e)) {
    Yt(e, (s, i) => _r(s, t, [...n, ...vn(i)]));
    return;
  }
  const [o, r] = e;
  r && Yt(r, (s, i) => {
    _r(s, t, [...n, ...vn(i)]);
  }), t(o, n);
}
function Eh(e, t, n) {
  return _r(t, (o, r) => {
    e = hr(e, r, (s) => _h(s, o, n));
  }), e;
}
function mh(e, t) {
  function n(o, r) {
    const s = gh(e, vn(r));
    o.map(vn).forEach((i) => {
      e = hr(e, i, () => s);
    });
  }
  if (yt(t)) {
    const [o, r] = t;
    o.forEach((s) => {
      e = hr(e, vn(s), () => e);
    }), r && Yt(r, n);
  } else
    Yt(t, n);
  return e;
}
var vh = (e, t) => wn(e) || yt(e) || Tn(e) || xn(e) || Ul(e, t);
function yh(e, t, n) {
  const o = n.get(e);
  o ? o.push(t) : n.set(e, [t]);
}
function bh(e, t) {
  const n = {};
  let o;
  return e.forEach((r) => {
    if (r.length <= 1)
      return;
    t || (r = r.map((u) => u.map(String)).sort((u, l) => u.length - l.length));
    const [s, ...i] = r;
    s.length === 0 ? o = i.map(zo) : n[zo(s)] = i.map(zo);
  }), o ? pr(n) ? [o] : [o, n] : pr(n) ? void 0 : n;
}
var Wl = (e, t, n, o, r = [], s = [], i = /* @__PURE__ */ new Map()) => {
  var u;
  const l = lh(e);
  if (!l) {
    yh(e, r, t);
    const m = i.get(e);
    if (m)
      return o ? {
        transformedValue: null
      } : m;
  }
  if (!vh(e, n)) {
    const m = Li(e, n), O = m ? {
      transformedValue: m.value,
      annotations: [m.type]
    } : {
      transformedValue: e
    };
    return l || i.set(e, O), O;
  }
  if (eo(s, e))
    return {
      transformedValue: null
    };
  const p = Li(e, n), f = (u = p?.value) != null ? u : e, a = yt(f) ? [] : {}, h = {};
  Yt(f, (m, O) => {
    if (O === "__proto__" || O === "constructor" || O === "prototype")
      throw new Error(`Detected property ${O}. This is a prototype pollution risk, please remove it from your object.`);
    const C = Wl(m, t, n, o, [...r, O], [...s, e], i);
    a[O] = C.transformedValue, yt(C.annotations) ? h[O] = C.annotations : wn(C.annotations) && Yt(C.annotations, (S, R) => {
      h[Fl(O) + "." + R] = S;
    });
  });
  const _ = pr(h) ? {
    transformedValue: a,
    annotations: p ? [p.type] : void 0
  } : {
    transformedValue: a,
    annotations: p ? [p.type, h] : h
  };
  return l || i.set(e, _), _;
};
w();
w();
function zl(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function $i(e) {
  return zl(e) === "Array";
}
function Oh(e) {
  if (zl(e) !== "Object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function Nh(e, t, n, o, r) {
  const s = {}.propertyIsEnumerable.call(o, t) ? "enumerable" : "nonenumerable";
  s === "enumerable" && (e[t] = n), r && s === "nonenumerable" && Object.defineProperty(e, t, {
    value: n,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function gr(e, t = {}) {
  if ($i(e))
    return e.map((r) => gr(r, t));
  if (!Oh(e))
    return e;
  const n = Object.getOwnPropertyNames(e), o = Object.getOwnPropertySymbols(e);
  return [...n, ...o].reduce((r, s) => {
    if ($i(t.props) && !t.props.includes(s))
      return r;
    const i = e[s], u = gr(i, t);
    return Nh(r, s, u, e, t.nonenumerable), r;
  }, {});
}
var X = class {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new Jp(), this.symbolRegistry = new Pl((t) => {
      var n;
      return (n = t.description) != null ? n : "";
    }), this.customTransformerRegistry = new Qp(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const t = /* @__PURE__ */ new Map(), n = Wl(e, t, this, this.dedupe), o = {
      json: n.transformedValue
    };
    n.annotations && (o.meta = {
      ...o.meta,
      values: n.annotations
    });
    const r = bh(t, this.dedupe);
    return r && (o.meta = {
      ...o.meta,
      referentialEqualities: r
    }), o;
  }
  deserialize(e) {
    const { json: t, meta: n } = e;
    let o = gr(t);
    return n?.values && (o = Eh(o, n.values, this)), n?.referentialEqualities && (o = mh(o, n.referentialEqualities)), o;
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
X.defaultInstance = new X();
X.serialize = X.defaultInstance.serialize.bind(X.defaultInstance);
X.deserialize = X.defaultInstance.deserialize.bind(X.defaultInstance);
X.stringify = X.defaultInstance.stringify.bind(X.defaultInstance);
X.parse = X.defaultInstance.parse.bind(X.defaultInstance);
X.registerClass = X.defaultInstance.registerClass.bind(X.defaultInstance);
X.registerSymbol = X.defaultInstance.registerSymbol.bind(X.defaultInstance);
X.registerCustom = X.defaultInstance.registerCustom.bind(X.defaultInstance);
X.allowErrorProps = X.defaultInstance.allowErrorProps.bind(X.defaultInstance);
w();
w();
w();
w();
w();
w();
w();
w();
w();
w();
w();
w();
w();
w();
w();
var Mi, Ui;
(Ui = (Mi = I).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (Mi.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
var Bi, ji;
(ji = (Bi = I).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (Bi.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
var Hi, Ki;
(Ki = (Hi = I).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (Hi.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
var Wi, zi;
(zi = (Wi = I).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (Wi.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
var Gi, qi;
(qi = (Gi = I).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (Gi.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
var Yi, Ji;
(Ji = (Yi = I).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (Yi.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
w();
w();
w();
w();
const vo = typeof window < "u";
let Er;
const Dh = (e) => Er = e;
process.env.NODE_ENV;
const mr = process.env.NODE_ENV !== "production" ? /* @__PURE__ */ Symbol("pinia") : (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var Rt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Rt || (Rt = {}));
const Xi = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function Sh(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function ns(e, t, n) {
  const o = new XMLHttpRequest();
  o.open("GET", e), o.responseType = "blob", o.onload = function() {
    Yl(o.response, t, n);
  }, o.onerror = function() {
    console.error("could not download file");
  }, o.send();
}
function Gl(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function to(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = new MouseEvent("click", {
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
    e.dispatchEvent(n);
  }
}
const no = typeof navigator == "object" ? navigator : { userAgent: "" }, ql = /Macintosh/.test(no.userAgent) && /AppleWebKit/.test(no.userAgent) && !/Safari/.test(no.userAgent), Yl = vo ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !ql ? Ah : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in no ? Ch : (
      // Fallback to using FileReader and a popup
      wh
    )
  )
) : () => {
};
function Ah(e, t = "download", n) {
  const o = document.createElement("a");
  o.download = t, o.rel = "noopener", typeof e == "string" ? (o.href = e, o.origin !== location.origin ? Gl(o.href) ? ns(e, t, n) : (o.target = "_blank", to(o)) : to(o)) : (o.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(o.href);
  }, 4e4), setTimeout(function() {
    to(o);
  }, 0));
}
function Ch(e, t = "download", n) {
  if (typeof e == "string")
    if (Gl(e))
      ns(e, t, n);
    else {
      const o = document.createElement("a");
      o.href = e, o.target = "_blank", setTimeout(function() {
        to(o);
      });
    }
  else
    navigator.msSaveOrOpenBlob(Sh(e, n), t);
}
function wh(e, t, n, o) {
  if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), typeof e == "string")
    return ns(e, t, n);
  const r = e.type === "application/octet-stream", s = /constructor/i.test(String(Xi.HTMLElement)) || "safari" in Xi, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || r && s || ql) && typeof FileReader < "u") {
    const u = new FileReader();
    u.onloadend = function() {
      let l = u.result;
      if (typeof l != "string")
        throw o = null, new Error("Wrong reader.result type");
      l = i ? l : l.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = l : location.assign(l), o = null;
    }, u.readAsDataURL(e);
  } else {
    const u = URL.createObjectURL(e);
    o ? o.location.assign(u) : location.href = u, o = null, setTimeout(function() {
      URL.revokeObjectURL(u);
    }, 4e4);
  }
}
function de(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function os(e) {
  return "_a" in e && "install" in e;
}
function Jl() {
  if (!("clipboard" in navigator))
    return de("Your browser doesn't support the Clipboard API", "error"), !0;
}
function Xl(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (de('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function Th(e) {
  if (!Jl())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), de("Global state copied to clipboard.");
    } catch (t) {
      if (Xl(t))
        return;
      de("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function xh(e) {
  if (!Jl())
    try {
      Zl(e, JSON.parse(await navigator.clipboard.readText())), de("Global state pasted from clipboard.");
    } catch (t) {
      if (Xl(t))
        return;
      de("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function Vh(e) {
  try {
    Yl(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    de("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let ut;
function Ih() {
  ut || (ut = document.createElement("input"), ut.type = "file", ut.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      ut.onchange = async () => {
        const o = ut.files;
        if (!o)
          return t(null);
        const r = o.item(0);
        return t(r ? { text: await r.text(), file: r } : null);
      }, ut.oncancel = () => t(null), ut.onerror = n, ut.click();
    });
  }
  return e;
}
async function Ph(e) {
  try {
    const n = await Ih()();
    if (!n)
      return;
    const { text: o, file: r } = n;
    Zl(e, JSON.parse(o)), de(`Global state imported from "${r.name}".`);
  } catch (t) {
    de("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function Zl(e, t) {
  for (const n in t) {
    const o = e.state.value[n];
    o ? Object.assign(o, t[n]) : e.state.value[n] = t[n];
  }
}
function Fe(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Ql = "🍍 Pinia (root)", oo = "_root";
function Rh(e) {
  return os(e) ? {
    id: oo,
    label: Ql
  } : {
    id: e.$id,
    label: e.$id
  };
}
function kh(e) {
  if (os(e)) {
    const n = Array.from(e._s.keys()), o = e._s;
    return {
      state: n.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: n.filter((s) => o.get(s)._getters).map((s) => {
        const i = o.get(s);
        return {
          editable: !1,
          key: s,
          value: i._getters.reduce((u, l) => (u[l] = i[l], u), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function Fh(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Fe(e.type),
    key: Fe(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Lh(e) {
  switch (e) {
    case Rt.direct:
      return "mutation";
    case Rt.patchFunction:
      return "$patch";
    case Rt.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let Ht = !0;
const ro = [], St = "pinia:mutations", ge = "pinia", { assign: $h } = Object, yo = (e) => "🍍 " + e;
function Mh(e, t) {
  Vl({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ro,
    app: e
  }, (n) => {
    typeof n.now != "function" && de("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: St,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: ge,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            Th(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await xh(t), n.sendInspectorTree(ge), n.sendInspectorState(ge);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            Vh(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Ph(t), n.sendInspectorTree(ge), n.sendInspectorState(ge);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (o) => {
            const r = t._s.get(o);
            r ? typeof r.$reset != "function" ? de(`Cannot reset "${o}" store because it doesn't have a "$reset" method implemented.`, "warn") : (r.$reset(), de(`Store "${o}" reset.`)) : de(`Cannot reset "${o}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((o) => {
      const r = o.componentInstance && o.componentInstance.proxy;
      if (r && r._pStores) {
        const s = o.componentInstance.proxy._pStores;
        Object.values(s).forEach((i) => {
          o.instanceData.state.push({
            type: yo(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: /* @__PURE__ */ B(i.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => i.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(i.$state).reduce((u, l) => (u[l] = i.$state[l], u), {})
            )
          }), i._getters && i._getters.length && o.instanceData.state.push({
            type: yo(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((u, l) => {
              try {
                u[l] = i[l];
              } catch (p) {
                u[l] = p;
              }
              return u;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((o) => {
      if (o.app === e && o.inspectorId === ge) {
        let r = [t];
        r = r.concat(Array.from(t._s.values())), o.rootNodes = (o.filter ? r.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(o.filter.toLowerCase()) : Ql.toLowerCase().includes(o.filter.toLowerCase())) : r).map(Rh);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((o) => {
      if (o.app === e && o.inspectorId === ge) {
        const r = o.nodeId === oo ? t : t._s.get(o.nodeId);
        if (!r)
          return;
        r && (o.nodeId !== oo && (globalThis.$store = /* @__PURE__ */ B(r)), o.state = kh(r));
      }
    }), n.on.editInspectorState((o) => {
      if (o.app === e && o.inspectorId === ge) {
        const r = o.nodeId === oo ? t : t._s.get(o.nodeId);
        if (!r)
          return de(`store "${o.nodeId}" not found`, "error");
        const { path: s } = o;
        os(r) ? s.unshift("state") : (s.length !== 1 || !r._customProperties.has(s[0]) || s[0] in r.$state) && s.unshift("$state"), Ht = !1, o.set(r, s, o.state.value), Ht = !0;
      }
    }), n.on.editComponentState((o) => {
      if (o.type.startsWith("🍍")) {
        const r = o.type.replace(/^🍍\s*/, ""), s = t._s.get(r);
        if (!s)
          return de(`store "${r}" not found`, "error");
        const { path: i } = o;
        if (i[0] !== "state")
          return de(`Invalid path for store "${r}":
${i}
Only state can be modified.`);
        i[0] = "$state", Ht = !1, o.set(s, i, o.state.value), Ht = !0;
      }
    });
  });
}
function Uh(e, t) {
  ro.includes(yo(t.$id)) || ro.push(yo(t.$id)), Vl({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ro,
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
  }, (n) => {
    const o = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: i, onError: u, name: l, args: p }) => {
      const f = ec++;
      n.addTimelineEvent({
        layerId: St,
        event: {
          time: o(),
          title: "🛫 " + l,
          subtitle: "start",
          data: {
            store: Fe(t.$id),
            action: Fe(l),
            args: p
          },
          groupId: f
        }
      }), i((a) => {
        Et = void 0, n.addTimelineEvent({
          layerId: St,
          event: {
            time: o(),
            title: "🛬 " + l,
            subtitle: "end",
            data: {
              store: Fe(t.$id),
              action: Fe(l),
              args: p,
              result: a
            },
            groupId: f
          }
        });
      }), u((a) => {
        Et = void 0, n.addTimelineEvent({
          layerId: St,
          event: {
            time: o(),
            logType: "error",
            title: "💥 " + l,
            subtitle: "end",
            data: {
              store: Fe(t.$id),
              action: Fe(l),
              args: p,
              error: a
            },
            groupId: f
          }
        });
      });
    }, !0), t._customProperties.forEach((i) => {
      Yn(() => _n(t[i]), (u, l) => {
        n.notifyComponentUpdate(), n.sendInspectorState(ge), Ht && n.addTimelineEvent({
          layerId: St,
          event: {
            time: o(),
            title: "Change",
            subtitle: i,
            data: {
              newValue: u,
              oldValue: l
            },
            groupId: Et
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: i, type: u }, l) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(ge), !Ht)
        return;
      const p = {
        time: o(),
        title: Lh(u),
        data: $h({ store: Fe(t.$id) }, Fh(i)),
        groupId: Et
      };
      u === Rt.patchFunction ? p.subtitle = "⤵️" : u === Rt.patchObject ? p.subtitle = "🧩" : i && !Array.isArray(i) && (p.subtitle = i.type), i && (p.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: i
        }
      }), n.addTimelineEvent({
        layerId: St,
        event: p
      });
    }, { detached: !0, flush: "sync" });
    const r = t._hotUpdate;
    t._hotUpdate = Ir((i) => {
      r(i), n.addTimelineEvent({
        layerId: St,
        event: {
          time: o(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Fe(t.$id),
            info: Fe("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(ge), n.sendInspectorState(ge);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(ge), n.sendInspectorState(ge), n.getSettings().logStoreChanges && de(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(ge), n.sendInspectorState(ge), n.getSettings().logStoreChanges && de(`"${t.$id}" store installed 🆕`);
  });
}
let ec = 0, Et;
function Zi(e, t, n) {
  const o = t.reduce((r, s) => (r[s] = (/* @__PURE__ */ B(e))[s], r), {});
  for (const r in o)
    e[r] = function() {
      const s = ec, i = n ? new Proxy(e, {
        get(...l) {
          return Et = s, Reflect.get(...l);
        },
        set(...l) {
          return Et = s, Reflect.set(...l);
        }
      }) : e;
      Et = s;
      const u = o[r].apply(i, arguments);
      return Et = void 0, u;
    };
}
function Bh({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      Zi(t, Object.keys(n.actions), t._isOptionsAPI);
      const o = t._hotUpdate;
      (/* @__PURE__ */ B(t))._hotUpdate = function(r) {
        o.apply(this, arguments), Zi(t, Object.keys(r._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    Uh(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function jh() {
  const e = Oc(!0), t = e.run(() => /* @__PURE__ */ jc({}));
  let n = [], o = [];
  const r = Ir({
    install(s) {
      Dh(r), r._a = s, s.provide(mr, r), s.config.globalProperties.$pinia = r, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && vo && Mh(s, r), o.forEach((i) => n.push(i)), o = [];
    },
    use(s) {
      return this._a ? n.push(s) : o.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && vo && typeof Proxy < "u" && r.use(Bh), r;
}
process.env.NODE_ENV;
const tc = "1.0.44", Hh = "dist/albina-galgame-card/console/index.js", nc = `https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v${tc}/dist/albina-galgame-card`;
function Gh(e) {
  if (!e) return "";
  if (/^https?:\/\//u.test(e)) return e;
  const t = e.replace(/^\//u, "").split("/").map((n) => encodeURIComponent(n)).join("/");
  return `${nc}/assets/${t}`;
}
const Kh = {
  class: "source-baseline",
  "data-albina-application": ""
}, Wh = /* @__PURE__ */ Na({
  __name: "App",
  setup(e) {
    return (t, n) => (bf(), Df("main", Kh, [
      n[2] || (n[2] = Ze("p", { class: "source-baseline__eyebrow" }, "Albina Galgame Card", -1)),
      n[3] || (n[3] = Ze("h1", null, "Source recovery baseline", -1)),
      Ze("p", null, " The recovered Vue application is ready while the v" + Wn(_n(tc)) + " console remains the compatibility oracle. ", 1),
      Ze("dl", null, [
        n[0] || (n[0] = Ze("dt", null, "Legacy bundle", -1)),
        Ze("dd", null, Wn(_n(Hh)), 1),
        n[1] || (n[1] = Ze("dt", null, "Canonical CDN", -1)),
        Ze("dd", null, Wn(_n(nc)), 1)
      ])
    ]));
  }
});
function qh(e) {
  const t = hd(Wh);
  return t.use(jh()), t.mount(e), t;
}
export {
  nc as CANONICAL_CDN_BASE,
  Hh as LEGACY_BUNDLE_PATH,
  tc as LEGACY_BUNDLE_VERSION,
  qh as mountAlbinaApplication,
  Gh as resolveCanonicalCdnAsset
};
